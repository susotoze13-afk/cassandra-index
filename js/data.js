// data.js — чтение снапшотов из window.CI_DATA (заполненного script-тегами, без fetch),
// указатель latest, схема validate. Битый/отсутствующий снапшот → «Model unavailable»
// в данных + событие ci:datastate, не падение.

// Статический перечень 46 критериев — для проверки id в coverageCriteria.uncovered
// (ADR 0045). Импорт сайтовый (criteria.js без зависимостей), calc/ не читается.
import { CRITERIA_LIST } from './criteria.js';

const CRITERIA_IDS = new Set(CRITERIA_LIST.map((c) => c.id));

export const DATA_STATES = ['published', 'updating', 'delayed', 'insufficient', 'unavailable'];

// Наборы регионов по версии таксономии (ADR 0028). Порядок id — канонический
// (совпадает с порядком регионов в data/regions/reference.json и в js/region.js;
// пин-тест фиксирует тройное равенство). '1.0' — легаси-шестёрка, '2.0' — текущая
// двенадцатка.
export const REGION_TAXONOMIES = {
  '1.0': ['europe', 'east-asia', 'middle-east', 'north-america', 'south-asia', 'africa'],
  '2.0': [
    'russia-belarus', 'ukraine-moldova', 'baltic', 'balkans', 'eu-north-europe',
    'south-caucasus', 'central-asia', 'east-asia', 'middle-east', 'north-america',
    'south-asia', 'africa',
  ],
};

// Резолвер набора id по версии снапшота; отсутствие/неизвестная версия = '1.0'
// (старые недели поля не несут).
export function regionIdsFor(taxonomy = '1.0') {
  return REGION_TAXONOMIES[taxonomy] ?? REGION_TAXONOMIES['1.0'];
}

// Версия текущего набора и дата переключения (неделя пилота). REGION_IDS —
// псевдоним текущего набора (CURRENT_TAXONOMY, двенадцать id) для обратной
// совместимости: контракт и расчёт недели ходят через regionIdsFor(версию
// недели), а дефолт движка (engine.validate/regionalSignals) — текущий набор.
export const CURRENT_TAXONOMY = '2.0';
export const TAXONOMY_V2_FROM = '2026-10-18';
export const REGION_IDS = REGION_TAXONOMIES[CURRENT_TAXONOMY];

// Число подгрупп Д9 (§4.3.8) — единственный источник числа на сайте: отсюда
// его берут контракт снапшота (validateQuality ниже), секция precursor
// (js/sections/precursor.js) и подпись «из N» (i18n-ключ precursor.signals
// получает его плейсхолдером {total}). Сайт не читает calc/, поэтому зеркало
// движка (calc/engine.js D9_SUBGROUPS.length) — паритет пинит
// tests/precursor-ui.test.js: смена числа в движке даёт красный тест,
// а не тихую ложь в подписи.
export const PRECURSOR_SUBGROUPS = 8;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const LEVELS = ['high', 'medium', 'low'];

function ciData() {
  const root = typeof window !== 'undefined' ? window : globalThis;
  return root.CI_DATA ?? null;
}

function emit(state, detail) {
  if (typeof document === 'undefined' || typeof CustomEvent === 'undefined') return;
  if (typeof document.dispatchEvent !== 'function') return;
  document.dispatchEvent(new CustomEvent('ci:datastate', { detail: { state, ...detail } }));
}

function unavailable(date, errors) {
  emit('unavailable', { date, errors });
  return {
    date: date ?? null,
    dataState: 'unavailable',
    unavailable: true,
    errors,
    global: null,
    regions: {},
    trend: [],
    drivers: [],
    sources: [],
  };
}

export function latest() {
  return ciData()?.latest ?? null;
}

export function listWeeks() {
  const d = ciData();
  if (!d || !d.snapshots) return [];
  return Object.keys(d.snapshots).sort();
}

// week(date?) — снапшот по дате (или latest); валидирует и отдаёт с date-меткой.
// Битый файл → синтетический снапшот { dataState: 'unavailable', unavailable: true, errors }.
export function week(date) {
  const d = ciData();
  const key = date ?? d?.latest ?? null;
  if (!key || !d?.snapshots?.[key]) {
    return unavailable(key, key ? [`snapshot not found: ${key}`] : ['no CI_DATA']);
  }
  const v = validate(d.snapshots[key]);
  if (!v.ok) return unavailable(key, v.errors);
  return { ...d.snapshots[key], date: key };
}

function isIndex(v) {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 100;
}

function isDelta(v) {
  return typeof v === 'number' && Number.isFinite(v);
}

function isLocalized(v) {
  return !!v && typeof v === 'object' && typeof v.ru === 'string' && typeof v.en === 'string';
}

function isSource(s) {
  if (!s || typeof s !== 'object') return false;
  if (!isLocalized(s.title) || typeof s.url !== 'string' || typeof s.domain !== 'string') {
    return false;
  }
  // quotes (R05i) — опциональное поле: список {criterion, text} с непустыми
  // строками. Отсутствие — норма (недели без цитат); битая форма — ошибка.
  if (s.quotes !== undefined && !isQuotes(s.quotes)) return false;
  // Легаси-схема демо-недель: скалярная дата публикации.
  if (typeof s.date === 'string') return true;
  // Полная схема ingestion (R55): обязательные поля новой записи.
  return (
    typeof s.id === 'string' &&
    typeof s.publication_date === 'string' &&
    typeof s.accessed_date === 'string' &&
    ['primary', 'secondary', 'OSINT'].includes(s.source_type) &&
    typeof s.cluster_id === 'string' &&
    typeof s.state_affiliated === 'boolean'
  );
}

function isQuotes(v) {
  if (!Array.isArray(v)) return false;
  return v.every(
    (q) =>
      !!q && typeof q === 'object' && !Array.isArray(q) &&
      typeof q.criterion === 'string' && q.criterion.trim() !== '' &&
      typeof q.text === 'string' && q.text.trim() !== ''
  );
}

// validate(snapshot) → { ok, errors[] }. Схема — контракт данных из interfaces.md.
export function validate(snapshot) {
  const errors = [];
  if (!snapshot || typeof snapshot !== 'object') {
    return { ok: false, errors: ['snapshot is not an object'] };
  }
  if (typeof snapshot.published !== 'string' || !DATE_RE.test(snapshot.published)) {
    errors.push('published: required YYYY-MM-DD');
  }
  if (typeof snapshot.through !== 'string' || !DATE_RE.test(snapshot.through)) {
    errors.push('through: required YYYY-MM-DD');
  }
  if (typeof snapshot.methodology !== 'string' || !snapshot.methodology) {
    errors.push('methodology: required non-empty string');
  }
  if (!DATA_STATES.includes(snapshot.dataState)) {
    errors.push(`dataState: must be one of ${DATA_STATES.join(', ')}`);
  }
  // global: null допускается только при insufficient/unavailable; неделя
  // insufficient обязана иметь global:null (публикация запрещена, R11–R13).
  const nullGlobalAllowed = snapshot.dataState === 'insufficient' || snapshot.dataState === 'unavailable';
  if (snapshot.global === null || snapshot.global === undefined) {
    if (!nullGlobalAllowed) {
      errors.push('global: null allowed only when dataState is insufficient or unavailable');
    }
  } else if (!isIndex(snapshot.global.index) || !isDelta(snapshot.global.delta)) {
    errors.push('global: { index: 0..100, delta: number } required');
  }
  if (!snapshot.regions || typeof snapshot.regions !== 'object') {
    errors.push('regions: object required');
  } else {
    // Набор регионов — по версии снапшота: поле regions_taxonomy опционально
    // (старые недели его не несут = '1.0'); если есть — '1.0'|'2.0'.
    const taxonomy = snapshot.regions_taxonomy ?? '1.0';
    if (!Object.prototype.hasOwnProperty.call(REGION_TAXONOMIES, taxonomy)) {
      errors.push("regions_taxonomy: must be one of 1.0, 2.0 (or absent = '1.0')");
    }
    for (const id of regionIdsFor(taxonomy)) {
      const r = snapshot.regions[id];
      if (!r || !isIndex(r.index) || !isDelta(r.delta)) {
        errors.push(`regions.${id}: { index: 0..100, delta: number } required`);
        continue;
      }
      // Фоновый регион (нет региональных данных, индекс = глобальный фон):
      // опционально, отсутствие = false (обратная совместимость со старыми
      // снапшотами); сайт при true не подаёт дельту как региональную.
      if (r.background !== undefined && typeof r.background !== 'boolean') {
        errors.push(`regions.${id}.background: boolean`);
      }
    }
  }
  if (!Array.isArray(snapshot.trend) || snapshot.trend.length !== 12) {
    errors.push('trend: exactly 12 weekly points required');
  } else {
    snapshot.trend.forEach((p, i) => {
      if (!p || !DATE_RE.test(p.date ?? '')) {
        errors.push(`trend[${i}]: { date: YYYY-MM-DD, value: 0..100 } required`);
        return;
      }
      // Точка может нести methodology (версия снапшота недели точки);
      // value:null — только с methodology: неделя не опубликована.
      if (p.methodology !== undefined && typeof p.methodology !== 'string') {
        errors.push(`trend[${i}]: methodology must be a string`);
      }
      const nullPoint = p.value === null && typeof p.methodology === 'string' && p.methodology !== '';
      if (!isIndex(p.value) && !nullPoint) {
        errors.push(`trend[${i}]: { date: YYYY-MM-DD, value: 0..100 } required (value:null only with methodology)`);
      }
    });
  }
  if (!Array.isArray(snapshot.drivers) || snapshot.drivers.length !== 3) {
    errors.push('drivers: exactly 3 required');
  } else {
    snapshot.drivers.forEach((drv, i) => {
      const pfx = `drivers[${i}]`;
      if (!isLocalized(drv.observation)) errors.push(`${pfx}.observation: { ru, en } required`);
      if (!isLocalized(drv.why)) errors.push(`${pfx}.why: { ru, en } required`);
      if (!LEVELS.includes(drv.contribution)) errors.push(`${pfx}.contribution: high|medium|low`);
      if (!LEVELS.includes(drv.confidence)) errors.push(`${pfx}.confidence: high|medium|low`);
      if (drv.confidence === 'low' || drv.confidence === 'medium') {
        if (drv.confidenceNote !== undefined && !isLocalized(drv.confidenceNote)) {
          errors.push(`${pfx}.confidenceNote: { ru, en }`);
        }
      }
      if (!Array.isArray(drv.sources) || drv.sources.length < 2 || drv.sources.length > 5) {
        errors.push(`${pfx}.sources: 2..5 required`);
      } else if (!drv.sources.every(isSource)) {
        errors.push(`${pfx}.sources[]: { title:{ru,en}, url, domain, date }`);
      }
    });
  }
  if (!Array.isArray(snapshot.sources) || !snapshot.sources.every(isSource)) {
    errors.push('sources: array of { title:{ru,en}, url, domain, date }');
  }
  const vc = validateCountries(snapshot);
  errors.push(...vc.errors);
  validateQuality(snapshot, errors);
  return { ok: errors.length === 0, errors };
}

// Страновой слой (ADR 0067): опциональный блок countries недель
// ≥ PARAMS.countryLayerFrom. Отсутствие — валидно (вся история до гейта);
// битая форма — ошибка контракта с путями. Блок: { total, published, rows },
// rows — объект с ключами /^[A-Z]{2}$/; строка: index 0..100, delta число,
// background boolean, region — id региона версии снапшота, signals int ≥ 0,
// name { ru, en }; published ≤ total.
export function validateCountries(snapshot) {
  const errors = [];
  const c = snapshot ? snapshot.countries : undefined;
  if (c === undefined) return { ok: true, errors };
  if (!c || typeof c !== 'object' || Array.isArray(c)) {
    return { ok: false, errors: ['countries: { total: int > 0, published: 0..total, rows } required'] };
  }
  if (!Number.isInteger(c.total) || c.total <= 0) errors.push('countries.total: int > 0');
  if (!Number.isInteger(c.published) || c.published < 0
    || (Number.isInteger(c.total) && c.published > c.total)) {
    errors.push('countries.published: int 0..total');
  }
  if (!c.rows || typeof c.rows !== 'object' || Array.isArray(c.rows)) {
    errors.push('countries.rows: object { <ISO2>: row } required');
    return { ok: false, errors };
  }
  const taxonomy = snapshot.regions_taxonomy ?? '1.0';
  const regionIds = new Set(regionIdsFor(taxonomy));
  for (const [iso, row] of Object.entries(c.rows)) {
    if (!/^[A-Z]{2}$/.test(iso)) {
      errors.push(`countries.rows.${iso}: key must be ISO2 (^[A-Z]{2}$)`);
      continue;
    }
    if (!row || typeof row !== 'object' || Array.isArray(row)) {
      errors.push(`countries.rows.${iso}: row object required`);
      continue;
    }
    if (!isIndex(row.index)) errors.push(`countries.rows.${iso}.index: 0..100`);
    if (!isDelta(row.delta)) errors.push(`countries.rows.${iso}.delta: number`);
    if (typeof row.background !== 'boolean') errors.push(`countries.rows.${iso}.background: boolean`);
    if (typeof row.region !== 'string' || !regionIds.has(row.region)) {
      errors.push(`countries.rows.${iso}.region: id региона версии ${taxonomy}`);
    }
    if (!Number.isInteger(row.signals) || row.signals < 0) {
      errors.push(`countries.rows.${iso}.signals: int >= 0`);
    }
    if (!isLocalized(row.name)) errors.push(`countries.rows.${iso}.name: { ru, en }`);
  }
  return { ok: errors.length === 0, errors };
}

// Опциональные поля качества публикации (таск 05): q, nullWeight, confidence,
// coverage, preview, recalc, incompleteCoverage; sensitivity (таск 02, R02) —
// метрика чувствительности недели в п.п. Старые снапшоты без них —
// валидны. Неделя insufficient обязана нести полное описание непубликации.
const CONFIDENCES = ['full', 'reduced', 'none'];

function isUnitInterval(v) {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1;
}

function validateQuality(snapshot, errors) {
  if (snapshot.q !== undefined && !isUnitInterval(snapshot.q)) {
    errors.push('q: number 0..1');
  }
  if (snapshot.nullWeight !== undefined && !isUnitInterval(snapshot.nullWeight)) {
    errors.push('nullWeight: number 0..1');
  }
  if (snapshot.confidence !== undefined && !CONFIDENCES.includes(snapshot.confidence)) {
    errors.push(`confidence: must be one of ${CONFIDENCES.join(', ')}`);
  }
  if (snapshot.coverage !== undefined) {
    const c = snapshot.coverage;
    const ok =
      !!c && typeof c === 'object' &&
      Number.isInteger(c.coveredDrivers) && c.coveredDrivers >= 0 &&
      Number.isInteger(c.totalDrivers) && c.totalDrivers > 0;
    if (!ok) errors.push('coverage: { coveredDrivers: int >= 0, totalDrivers: int > 0 }');
  }
  // Покрытие критериев недели (R05/R06/R18, ADR 0045): { covered: int >= 0,
  // total: int > 0, covered <= total, uncovered?: string[] }. Поле опционально —
  // недели, записанные до правки, валидны. uncovered, если есть, перечисляет
  // ровно total − covered известных id без дублей.
  if (snapshot.coverageCriteria !== undefined) {
    const cc = snapshot.coverageCriteria;
    let ok =
      !!cc && typeof cc === 'object' && !Array.isArray(cc) &&
      Number.isInteger(cc.covered) && cc.covered >= 0 &&
      Number.isInteger(cc.total) && cc.total > 0 &&
      cc.covered <= cc.total;
    if (ok && cc.uncovered !== undefined) {
      ok =
        Array.isArray(cc.uncovered) &&
        cc.uncovered.every((id) => typeof id === 'string' && CRITERIA_IDS.has(id)) &&
        new Set(cc.uncovered).size === cc.uncovered.length &&
        cc.uncovered.length === cc.total - cc.covered;
    }
    if (!ok) {
      errors.push('coverageCriteria: { covered: int >= 0, total: int > 0, covered <= total, uncovered?: string[] }');
    }
  }
  if (snapshot.preview !== undefined) {
    const p = snapshot.preview;
    if (!p || !isIndex(p.index) || !isDelta(p.internal)) {
      errors.push('preview: { index: 0..100, internal: number }');
    }
  }
  if (snapshot.recalc !== undefined) {
    const r = snapshot.recalc;
    const ok =
      !!r && typeof r === 'object' &&
      typeof r.at === 'string' && !Number.isNaN(Date.parse(r.at)) &&
      typeof r.reason === 'string' && r.reason !== '' &&
      (r.previous === null || isIndex(r.previous)) &&
      typeof r.methodologyBefore === 'string' && r.methodologyBefore !== '' &&
      typeof r.methodologyAfter === 'string' && r.methodologyAfter !== '' &&
      typeof r.approvedBy === 'string' && r.approvedBy !== '';
    if (!ok) errors.push('recalc: { at: ISO datetime, reason, previous: 0..100|null, methodologyBefore, methodologyAfter, approvedBy }');
  }
  if (snapshot.incompleteCoverage !== undefined && typeof snapshot.incompleteCoverage !== 'boolean') {
    errors.push('incompleteCoverage: boolean');
  }
  // Метрика чувствительности недели (R02): max|ΔI| leave-one-out в п.п.
  // (одно десятичное, ≥ 0); поле опционально — недели до внедрения его не несут.
  if (
    snapshot.sensitivity !== undefined &&
    (typeof snapshot.sensitivity !== 'number' || !Number.isFinite(snapshot.sensitivity) ||
      snapshot.sensitivity < 0 || snapshot.sensitivity > 100)
  ) {
    errors.push('sensitivity: number 0..100 (percentage points)');
  }

  // Публичный слой Д9 (§4.3.6, R07/R12): { value: int 0..100,
  // signalingSubgroups: int 0..PRECURSOR_SUBGROUPS }. Поле опционально — недели
  // до внедрения и непересчитанная история 08-30…10-18 валидны без него; лишние
  // ключи игнорируются, битая форма — ошибка контракта. Верхняя граница — из
  // единственного источника PRECURSOR_SUBGROUPS (паритет с движком в тесте).
  if (snapshot.precursor !== undefined) {
    const p = snapshot.precursor;
    const ok =
      !!p && typeof p === 'object' && !Array.isArray(p) &&
      Number.isInteger(p.value) && p.value >= 0 && p.value <= 100 &&
      Number.isInteger(p.signalingSubgroups) && p.signalingSubgroups >= 0 &&
      p.signalingSubgroups <= PRECURSOR_SUBGROUPS;
    if (!ok) {
      errors.push(
        `precursor: { value: int 0..100, signalingSubgroups: int 0..${PRECURSOR_SUBGROUPS} }`,
      );
    }
  }

  // Рубрика «Разбор недели» (ADR 0037): выпуск как отдельная часть набора недели,
  // НЕ входит в week.js — главная его не грузит (отсутствие валидно, forward-only).
  // Полный контракт и ворота (лексика/числа/источники) — js/article.js; здесь только
  // лёгкая проверка формы, чтобы битый article.js не рисовался как валидный.
  if (snapshot.article !== undefined) {
    const a = snapshot.article;
    const ok =
      !!a && typeof a === 'object' && !Array.isArray(a) &&
      typeof a.week === 'string' && a.week !== '' &&
      typeof a.title === 'string' && a.title !== '' &&
      Array.isArray(a.blocks);
    if (!ok) errors.push('article: { week: string, title: string, blocks: array } required');
  }

  if (snapshot.dataState === 'insufficient') {
    if (snapshot.global !== null) {
      errors.push('insufficient: global must be null (publication blocked)');
    }
    if (!isUnitInterval(snapshot.q)) errors.push('insufficient: q (0..1) required');
    if (!isUnitInterval(snapshot.nullWeight)) errors.push('insufficient: nullWeight (0..1) required');
    if (snapshot.confidence !== 'none') errors.push("insufficient: confidence must be 'none'");
    if (snapshot.coverage === undefined) errors.push('insufficient: coverage required');
    if (snapshot.preview === undefined) errors.push('insufficient: preview { index, internal } required');
  }
}
