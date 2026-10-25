// country-layer.js — владелец странового слоя индекса (ADR 0067): оверлей
// атрибуции calc/input/countries/<неделя>.json (критерий → страны ISO2 с
// факт-основанием и ссылками на источники недели) → валидация → слияние с
// копией критериев → сигналы и индекс страны той же формулой §7, что регионы
// (engine.attributedSignals/attributedIndex, размерностно-нейтральное ядро).
// Гейт: слой пишется только для недель ≥ PARAMS.countryLayerFrom и не влияет
// на глобальный индекс и регионы; история не бэкфиллится.
// prevIndex страны (первая неделя слоя): прошлая неделя страны → иначе индекс
// её региона → иначе prevGlobal (наследование региона по аналогии с ADR 0038).
// Чистые швы без диска/сети — валидация/слияние/строки/рендер; диск — только
// loadCountryOverlay и справочники (reference.json, data/geo/countries.js, vm,
// кэш в памяти процесса).

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

import { PARAMS } from './params.js';
import { CRITERIA, attributedSignals, attributedIndex } from './engine.js';
import { taxonomyForWeek } from './week-step.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);

// --- Справочники (дисковые швы с кэшем; чтение как loadSnapshotPart — vm) ---
let refCache = null;
let geoCountriesCache = null;

export function loadRegionRef() {
  if (!refCache) {
    refCache = JSON.parse(readFileSync(path.join(ROOT, 'data', 'regions', 'reference.json'), 'utf8'));
  }
  return refCache;
}

export function loadGeoCountries() {
  if (!geoCountriesCache) {
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(readFileSync(path.join(ROOT, 'data', 'geo', 'countries.js'), 'utf8'), sandbox);
    geoCountriesCache = sandbox.window.CI_GEO_COUNTRIES || {};
  }
  return geoCountriesCache;
}

// ISO2-страны версии таксономии — union countries её регионов (reference.json).
export function countryIdsFor(taxonomy, ref) {
  const r = ref || loadRegionRef();
  const t = r && r.taxonomies ? r.taxonomies[taxonomy] : null;
  if (!t || !Array.isArray(t.regions)) return [];
  const out = [];
  for (const region of t.regions) {
    for (const iso of region.countries || []) {
      if (!out.includes(iso)) out.push(iso);
    }
  }
  return out;
}

// Регион версии, в который входит страна (первое вхождение в union).
export function regionOfCountry(iso, taxonomy, ref) {
  const r = ref || loadRegionRef();
  const t = r && r.taxonomies ? r.taxonomies[taxonomy] : null;
  if (!t || !Array.isArray(t.regions)) return null;
  for (const region of t.regions) {
    if ((region.countries || []).includes(iso)) return region.id;
  }
  return null;
}

// --- Дисковый шов: оверлей атрибуции недели ---
// calc/input/countries/<неделя>.json → объект оверлея; null, если файла нет
// (недели без слоя — прежнее поведение).
export function loadCountryOverlay(week) {
  const f = path.join(HERE, 'input', 'countries', `${week}.json`);
  if (!existsSync(f)) return null;
  return JSON.parse(readFileSync(f, 'utf8'));
}

// --- Валидация оверлея ---
// overlay: calc/input/countries/<неделя>.json; weekInput: вход недели
// (calc/input/<неделя>.json); ref: data/regions/reference.json.
// → массив ошибок с путями ([] = валиден). Отклоняет: несовпадение недели;
// неизвестный критерий; слепой критерий входа (covered !== true); дубль id
// внутри countries[]; ISO2 вне whitelist версии недели; пустой basis; url
// источника вне источников недели (вход критерия или top-level sources).
export function validateCountryOverlay(overlay, weekInput, ref) {
  const errors = [];
  const input = weekInput || {};
  if (!overlay || typeof overlay !== 'object' || Array.isArray(overlay)) {
    return ['overlay: ожидается объект { week, criteria }'];
  }
  if (overlay.week !== input.week) {
    errors.push(`overlay.week: ${overlay.week} ≠ неделе входа ${input.week}`);
  }
  const criteria = overlay.criteria;
  if (!criteria || typeof criteria !== 'object' || Array.isArray(criteria)) {
    errors.push('overlay.criteria: ожидается объект { <criterionId>: { countries, basis, sources } }');
    return errors;
  }
  const taxonomy = taxonomyForWeek(input.week);
  const whitelist = countryIdsFor(taxonomy, ref);
  // Url источников недели: записи входа критерия + top-level sources.
  const weekUrls = new Set();
  for (const entry of Object.values(input.criteria || {})) {
    for (const s of (entry && entry.sources) || []) {
      if (s && typeof s.url === 'string') weekUrls.add(s.url);
    }
  }
  for (const s of input.sources || []) {
    if (s && typeof s.url === 'string') weekUrls.add(s.url);
  }
  for (const [id, entry] of Object.entries(criteria)) {
    const where = `overlay.criteria.${id}`;
    if (!CRITERIA[id]) {
      errors.push(`${where}: неизвестный критерий`);
      continue;
    }
    const inputEntry = (input.criteria || {})[id];
    if (!inputEntry || inputEntry.covered !== true) {
      errors.push(`${where}: критерий слепой во входе недели (covered !== true)`);
      continue;
    }
    if (!entry || typeof entry !== 'object') {
      errors.push(`${where}: ожидается объект { countries, basis, sources }`);
      continue;
    }
    const countries = entry.countries;
    if (!Array.isArray(countries) || countries.length === 0) {
      errors.push(`${where}.countries: ожидается непустой массив ISO2`);
    } else {
      const seen = new Set();
      for (const iso of countries) {
        if (typeof iso !== 'string' || !/^[A-Z]{2}$/.test(iso)) {
          errors.push(`${where}.countries: '${iso}' не ISO2`);
        } else if (seen.has(iso)) {
          errors.push(`${where}.countries: дубль '${iso}'`);
        } else {
          seen.add(iso);
          if (!whitelist.includes(iso)) {
            errors.push(`${where}.countries: '${iso}' вне whitelist версии ${taxonomy}`);
          }
        }
      }
    }
    if (typeof entry.basis !== 'string' || entry.basis.trim() === '') {
      errors.push(`${where}.basis: ожидается непустая строка-основание`);
    }
    if (!Array.isArray(entry.sources) || entry.sources.length === 0) {
      errors.push(`${where}.sources: ожидается непустой массив url`);
    } else {
      for (const url of entry.sources) {
        if (typeof url !== 'string' || !weekUrls.has(url)) {
          errors.push(`${where}.sources: '${url}' не источник недели`);
        }
      }
    }
  }
  return errors;
}

// --- Слияние атрибуции с копией критериев ---
// → копия weekInput, у покрытых критериев оверлея добавлено поле countries
// (служебные поля оверлея — basis/sources — в критерий не попадают).
// Исходный weekInput не мутируется.
export function mergeCountryAttribution(weekInput, overlay) {
  const input = weekInput || {};
  const criteria = { ...(input.criteria || {}) };
  for (const [id, entry] of Object.entries((overlay && overlay.criteria) || {})) {
    const src = criteria[id];
    if (!src || src.covered !== true || !entry || !Array.isArray(entry.countries)) continue;
    criteria[id] = { ...src, countries: [...entry.countries] };
  }
  return { ...input, criteria };
}

// --- Сигналы и индекс страны — формула §7 через размерностно-нейтральное ядро ---
export function countrySignals(mergedCriteria, countryIds, params, week) {
  return attributedSignals(mergedCriteria, countryIds, params, week, 'countries');
}

export function countryIndex(globalOut, unit, params) {
  return attributedIndex(globalOut, unit, params);
}

// --- Построение строк стран недели ---
// week: дата недели; globalOut: {index, internal, delta} расчёта недели;
// weekInput: вход недели; overlay: валидированный оверлей (null → все страны
// слепые); prevSnapshot: опубликованный комбинированный снапшот прошлой недели
// (или null у первой недели слоя); ref: reference.json; params: снапшот чисел.
// → { total, published, rows }: total — число стран версии недели; published —
// страны с ≥1 сигналом (background:false); rows.<ISO2> =
// { index, delta, background, region, signals, name: { ru, en } }.
// prevIndex страны: опубликованный индекс страны прошлой недели, иначе индекс
// её региона прошлой недели, иначе prevGlobal (ADR 0067).
export function buildCountryRows(week, globalOut, weekInput, overlay, prevSnapshot, ref, params) {
  const p = params || PARAMS;
  const taxonomy = taxonomyForWeek(week);
  const ids = countryIdsFor(taxonomy, ref);
  const merged = mergeCountryAttribution(weekInput, overlay);
  const signals = countrySignals(merged.criteria, ids, p, week);
  const prevCountries = prevSnapshot && prevSnapshot.countries && prevSnapshot.countries.rows
    ? prevSnapshot.countries.rows : {};
  const prevRegions = prevSnapshot && prevSnapshot.regions ? prevSnapshot.regions : {};
  const prevGlobal = prevSnapshot && prevSnapshot.global && typeof prevSnapshot.global.index === 'number'
    ? prevSnapshot.global.index : null;
  const geo = loadGeoCountries();
  const rows = {};
  let published = 0;
  for (const iso of ids) {
    const region = regionOfCountry(iso, taxonomy, ref);
    const sig = signals[iso];
    const prevCountryIndex = prevCountries[iso] && typeof prevCountries[iso].index === 'number'
      ? prevCountries[iso].index : null;
    const prevRegionIndex = region && prevRegions[region] && typeof prevRegions[region].index === 'number'
      ? prevRegions[region].index : null;
    const prevIndex = prevCountryIndex != null ? prevCountryIndex
      : (prevRegionIndex != null ? prevRegionIndex : prevGlobal);
    const r = countryIndex(
      { index: globalOut.index, internal: globalOut.internal, delta: globalOut.delta },
      { ...(sig || { nReg: 0 }), prevIndex, prevGlobal },
      p,
    );
    if (!r.background) published += 1;
    const name = geo[iso] && geo[iso].name ? { ru: geo[iso].name.ru, en: geo[iso].name.en }
      : { ru: iso, en: iso };
    rows[iso] = {
      index: r.index,
      delta: r.delta,
      background: r.background,
      region,
      signals: sig ? sig.nReg : 0,
      name,
    };
  }
  return { total: ids.length, published, rows };
}

// --- Рендер части countries.js (форма генератора снапшотов) ---
export function renderCountryPart(week, rows) {
  const header = 'window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };\n'
    + '(function () {\n'
    + `  var s = window.CI_DATA.snapshots[${JSON.stringify(week)}] = window.CI_DATA.snapshots[${JSON.stringify(week)}] || {};\n`;
  const footer = '})();\n';
  return `${header}  s.countries = ${JSON.stringify(rows, null, 2)};\n${footer}`;
}
