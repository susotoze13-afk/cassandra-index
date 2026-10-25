// calc.js — запуск расчёта недели: вход calc/input/<неделя>.json → engine →
// печать результата; с --write обновляет числовые файлы снапшота в data/.
// Перед записью: ворота ссылок-источников (linkcheck.checkSources, R03) —
// при любом битом URL запись отклоняется, диск не трогается.
// CLI — тонкая обвязка: вся математика в engine.js, шаг недели — в общем
// чистом модуле week-step.js (маппинг → драйверы → агрегация → регионы →
// классификация), не дублируется здесь.
//
// Использование:
//   node calc/calc.js [неделя …]          — прогон цепочки, только печать
//   node calc/calc.js --write [неделя …]  — прогон + запись числовых файлов
// Неделя без аргументов = вся пересчитываемая цепочка RECALC_WEEKS.
// Цепочка: инерция (prevInternal) и опубликованное prevPublished текут от
// недели к неделе внутри прогона; старт цепочки — опубликованный снапшот
// PREV_WEEK (демо-история не пересчитывается). Региональная атрибуция критериев
// (regions[], §4.1.9) — задел для будущих недель (R03): регион с сигналами
// считается по ним (nReg > 0, background:false), без них — «слепой» (nReg = 0,
// background:true): значение сохраняет последнее региональное отклонение от
// глобального фона, а не схлопывается в I_global (§7).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { PARAMS } from './params.js';
import { validate, CRITERIA, detectFlashTriggers } from './engine.js';
import {
  computeWeek,
  classifyPublication,
  nextChainState,
  loadSnapshotPart,
  taxonomyForWeek,
} from './week-step.js';
import { sensitivityScore } from './sensitivity.js';
import { precursorOf } from './precursor.js';
import { validateQuotes, verifyQuotes } from './quotes.js';
import { validate as validateSnapshot, regionIdsFor } from '../js/data.js';
import { checkSources } from './linkcheck.js';
import { weekDebt, validateRejected, validateBlindReasons, weeksGenitive } from './history-debt.js';
import * as audit from './audit.js';

// Швы шага недели реэкспортируются для обратной совместимости: тесты и
// check-sources.js исторически импортируют их из calc.js.
export { classifyPublication, nextChainState, loadSnapshotPart, taxonomyForWeek, computeWeek };

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);
export const RECALC_WEEKS = ['2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20', '2026-09-27', '2026-10-04', '2026-10-11', '2026-10-18', '2026-10-25'];
export const PREV_WEEK = '2026-08-23'; // опубликованная демо-неделя перед цепочкой
const RECALC_SET = new Set(RECALC_WEEKS);

// --- R01.2: атрибуция regions[], которую региональная агрегация игнорирует ---
// По ADR 0022 сигналы Д2, Д4 и Д9 (кроме Д9.3) в региональную агрегацию
// (engine.regionalSignals) не входят: их эффект на регион идёт через
// экспозицию (eStruct/eDyn), а не через дублирование сигнала. Молчаливого
// игнора быть не должно — возвращаем id покрытых критериев входа с непустой
// regions[], которые агрегация проигнорирует; печатается в отчёте недели.
export function ignoredRegionalAttribution(criteria) {
  const map = criteria && typeof criteria === 'object' && !Array.isArray(criteria) ? criteria : {};
  const out = [];
  for (const [id, entry] of Object.entries(map)) {
    if (!entry || entry.covered !== true || !Array.isArray(entry.regions) || entry.regions.length === 0) continue;
    const m = CRITERIA[id];
    if (!m) continue;
    if (m.driver === 'D2' || m.driver === 'D4' || (m.driver === 'D9' && id !== 'D9.3')) out.push(id);
  }
  return out.sort();
}

// --- §4.1.5 (ADR 0046): критерии с пересечением — в отчёт прогона ---
// Критерий входа с `intersection: true` — вторичный учёт события, уже
// посчитанного под главным критерием. Движок его видит (покрытие не падает),
// но не считает; отчёт называет id, чтобы флаг не был молчаливым.
export function collectIntersections(criteria) {
  const map = criteria && typeof criteria === 'object' && !Array.isArray(criteria) ? criteria : {};
  return Object.entries(map)
    .filter(([, entry]) => entry && entry.intersection === true)
    .map(([id]) => id)
    .sort();
}

// --- Покрытие критериев недели (ADR 0033/0045) ---
// Считается по `covered === true`, независимо от `intersection`: порог
// достаточности данных — про собранные наблюдения, а не про их вклад в скор
// (§4.1.5, ADR 0046). Критерий с пересечением покрыт и в uncovered не попадает.
export function coverageOf(criteria) {
  const map = criteria && typeof criteria === 'object' && !Array.isArray(criteria) ? criteria : {};
  return {
    criteria: Object.values(map).filter((c) => c && c.covered === true).length,
    totalCriteria: Object.keys(CRITERIA).length,
    uncovered: Object.keys(CRITERIA).filter((id) => !(map[id] && map[id].covered === true)),
  };
}

// --- Строгая валидация top-level sources входа (R55) ---
// Полная схема: id/title{ru,en}/domain/url/publication_date/accessed_date/
// source_type(primary|secondary|OSINT)/cluster_id (whitelist)/state_affiliated
// + опциональные author/archive_url/archive_date/confidence/notes и quotes
// (форма {criterion, text} — calc/quotes.js), origin (ADR 0040:
// collected-in-week|editorial-backfill).
// Ошибка — запись недели не производится.
const SOURCE_OPTIONALS = ['author', 'archive_url', 'archive_date', 'confidence', 'notes', 'origin'];

export function validateInputSources(sources, params = PARAMS) {
  if (!Array.isArray(sources)) return ['sources: must be an array'];
  const clusters = new Set(params.clusters || []);
  const errors = [];
  sources.forEach((s, i) => {
    const pfx = `sources[${i}]`;
    if (!s || typeof s !== 'object') { errors.push(`${pfx}: object required`); return; }
    for (const f of ['id', 'domain', 'url', 'publication_date', 'accessed_date', 'cluster_id']) {
      if (typeof s[f] !== 'string' || s[f] === '') errors.push(`${pfx}.${f}: non-empty string required`);
    }
    if (!s.title || typeof s.title !== 'object' || typeof s.title.ru !== 'string' || typeof s.title.en !== 'string') {
      errors.push(`${pfx}.title: { ru, en } required`);
    }
    if (!['primary', 'secondary', 'OSINT'].includes(s.source_type)) {
      errors.push(`${pfx}.source_type: primary|secondary|OSINT`);
    }
    if (typeof s.cluster_id === 'string' && s.cluster_id !== '' && !clusters.has(s.cluster_id)) {
      errors.push(`${pfx}.cluster_id: outside whitelist (${[...clusters].join(', ')})`);
    }
    if (typeof s.state_affiliated !== 'boolean') errors.push(`${pfx}.state_affiliated: boolean required`);
    for (const f of SOURCE_OPTIONALS) {
      if (s[f] !== undefined && typeof s[f] !== 'string') errors.push(`${pfx}.${f}: string`);
    }
  });
  // Цитаты источника (R01): форма {criterion, text}, criterion из 46, лимиты.
  // Отсутствие поля quotes — валидно (десять недель из двенадцати без него).
  errors.push(...validateQuotes(sources, Object.keys(CRITERIA)));
  return errors;
}

// --- Ворота независимости источников покрытых критериев (R01, §4.1.2) ---
// Чистый шов: каждый покрытый критерий входа обязан опираться на источники
// из ≥2 разных кластеров whitelist params.clusters ИЛИ иметь ≥1 источник
// типа primary|OSINT (Provisional Primary). Проверка применяется только к
// неделям ≥ params.independenceGateFrom (forward-only, A2: опубликованная
// цепочка 08-30…10-04 поведение не меняет); недели раньше даты — []
// безусловно. state_affiliated primary допустим (пометка — таск 04).
// Ошибка входа → неделя не считается (loadInput, раньше linkcheck).
export function validateSourceIndependence(input, params = PARAMS) {
  const from = params.independenceGateFrom;
  if (typeof from !== 'string' || from === '') return [];
  if (!input || typeof input.week !== 'string' || input.week < from) return [];
  const errors = [];
  for (const [id, entry] of Object.entries(input.criteria || {})) {
    if (!entry || typeof entry !== 'object' || entry.covered !== true) continue;
    const sources = Array.isArray(entry.sources) ? entry.sources : [];
    const clusters = new Set(
      sources.map((s) => s && s.cluster).filter((c) => typeof c === 'string' && c !== ''),
    );
    const hasPrimary = sources.some((s) => s && (s.type === 'primary' || s.type === 'OSINT'));
    if (clusters.size < 2 && !hasPrimary) {
      errors.push(
        `criteria.${id}: независимость источников — покрытие на ${clusters.size} ` +
        `кластере без primary/OSINT; нужно ≥2 кластеров whitelist или ≥1 primary|OSINT (§4.1.2)`,
      );
    }
  }
  return errors;
}

// --- Ядро источников недели (R03, ADR 0020) ---
// Чистый шов: пересечение доменов источников входа (критериальные по url +
// top-level sources по полю domain|url) с PARAMS.coreSources. Возвращает
// { present, missing, count } — count уникальных доменов ядра в неделе.
// Ниже params.coreMinDomains — warning в отчёте расчёта (не ворота).
export function checkCoreSources(input, params = PARAMS) {
  const core = (params.coreSources && typeof params.coreSources === 'object') ? params.coreSources : {};
  const domains = new Set();
  const addSource = (s) => {
    if (!s || typeof s !== 'object') return;
    let d = typeof s.domain === 'string' ? s.domain : '';
    if (!d && typeof s.url === 'string') {
      try { d = new URL(s.url).hostname; } catch { d = ''; }
    }
    d = d.toLowerCase().replace(/^www\./, '');
    if (d !== '') domains.add(d);
  };
  for (const entry of Object.values(input && input.criteria ? input.criteria : {})) {
    if (Array.isArray(entry && entry.sources)) entry.sources.forEach(addSource);
  }
  if (Array.isArray(input && input.sources)) input.sources.forEach(addSource);
  const present = Object.keys(core).filter((d) => domains.has(d.toLowerCase()));
  return {
    present,
    missing: Object.keys(core).filter((d) => !domains.has(d.toLowerCase())),
    count: present.length,
  };
}

// --- Сбор URL источников собранного снапшота (R03) ---
// items { url, where } для linkcheck.checkSources: top-level sources,
// drivers[].sources[] и региональные drivers[].sources[]. where — неделя +
// путь записи, читаемый в сообщении об ошибке. Дубликаты URL схлопываются
// (одна проверка на URL, первая where сохраняется).
export function collectSourceItems(snap, week) {
  const items = [];
  const seen = new Set();
  const push = (list, whereFn) => {
    if (!Array.isArray(list)) return;
    list.forEach((s, i) => {
      if (!s || typeof s.url !== 'string' || s.url === '' || seen.has(s.url)) return;
      seen.add(s.url);
      items.push({ url: s.url, where: whereFn(i) });
    });
  };
  const pushDrivers = (list, whereFn) => {
    if (!Array.isArray(list)) return;
    list.forEach((d, i) => push(d && d.sources, (k) => whereFn(i, k)));
  };
  push(snap.sources, (i) => `${week} sources[${i}]`);
  pushDrivers(snap.drivers, (i, k) => `${week} drivers[${i}].sources[${k}]`);
  if (snap.regions && typeof snap.regions === 'object') {
    for (const [id, r] of Object.entries(snap.regions)) {
      pushDrivers(r && r.drivers, (i, k) => `${week} regions.${id}.drivers[${i}].sources[${k}]`);
    }
  }
  return items;
}

// --- Форматирование результата ворот ссылок (R03) ---
const statusLabel = (status) => (status === null ? 'нет ответа' : `статус ${status}`);

// Перечень битых URL для отказа записи: where, url, статус.
function formatLinkGateFailure(report) {
  const lines = [
    `  ЗАПИСЬ ОТКЛОНЕНА проверкой ссылок: битых ${report.broken.length} из ${report.checked} ` +
    `(ок ${report.ok}, заблокировано ${report.blocked.length}):`,
  ];
  for (const b of report.broken) lines.push(`    [${b.where}] ${b.url} — ${statusLabel(b.status)}`);
  return lines;
}

// blocked (403) — предупреждение, публикацию не останавливает (D01).
function formatLinkBlockedWarning(report) {
  const lines = [`  предупреждение: ${report.blocked.length} ссылок заблокированы (403, не битые — публикация продолжается):`];
  for (const b of report.blocked) lines.push(`    [${b.where}] ${b.url}`);
  return lines;
}

// --- Детали flash-триггеров для audit-записи (R16–R19) ---
// Решение о срабатывании — engine.detectFlashTriggers; здесь только перечень
// сработавших критериев и их источники для журнала.
function flashDetails(criteria, params = PARAMS) {
  const ft = params.flashTriggers;
  const map = criteria && typeof criteria === 'object' ? criteria : {};
  const triggered = [];
  for (const id of ft.criteria) {
    const entry = map[id];
    if (entry && entry.covered === true && Array.isArray(entry.events) && entry.events.includes(ft.severity)) {
      triggered.push({ criterion: id, sources: (entry.sources || []).map((s) => s.url).filter(Boolean) });
    }
  }
  const d7 = map['D7.3'];
  if (d7 && d7.covered === true && d7.value === ft.d7Value) {
    triggered.push({ criterion: 'D7.3', sources: (d7.sources || []).map((s) => s.url).filter(Boolean) });
  }
  return triggered;
}

// --- Шаблоны записи — байт-совместимы с генератором data/ ---
function header(week) {
  return (
    'window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };\n' +
    '(function () {\n' +
    `  var s = window.CI_DATA.snapshots["${week}"] = window.CI_DATA.snapshots["${week}"] || {};\n`
  );
}
const FOOTER = '})();\n';
const j = (v) => JSON.stringify(v, null, 2);

// Части недели по версии таксономии (R26). Порядок как у загрузчика
// data/latest.js: regions стоит до region-*, т.к. тела region-*.js присваивают
// в s.regions[id] и предполагают созданный объект.
export function weekPartFiles(taxonomy) {
  return [
    'global', 'regions',
    ...regionIdsFor(taxonomy).map((id) => `region-${id}`),
    'trend', 'drivers', 'sources',
  ];
}

// Обратная совместимость: v1-набор частей (11) — как исторически; сайт и
// v1-парити ходят сюда. Не менять: пин tests/week-combined.test.js.
export const WEEK_PART_FILES = weekPartFiles('1.0');

// Версия таксономии недели по её global-части: поле regions_taxonomy,
// отсутствие = '1.0' (старые недели). Неизвестная версия — ошибка, а не
// молчаливое приведение к v1.
function taxonomyOfParts(parts) {
  const g = parts && typeof parts === 'object' ? parts.global : undefined;
  if (typeof g !== 'string') {
    throw new Error('renderWeekCombined: нет части global — regions_taxonomy недели неизвестна');
  }
  const m = /regions_taxonomy\s*=\s*("(?:[^"\\]|\\.)*")/.exec(g);
  if (!m) return '1.0';
  let v;
  try { v = JSON.parse(m[1]); } catch { v = null; }
  if (v !== '1.0' && v !== '2.0') {
    throw new Error(`renderWeekCombined: неизвестная regions_taxonomy ${JSON.stringify(v)}`);
  }
  return v;
}

// Набор частей для сборки недели: версия берётся из global-части, а не из
// наличия v2-эксклюзивных region-* (R27). Набор и версия обязаны совпадать —
// расхождение (лишняя/недостающая часть) даёт явную ошибку, не даунгрейд.
function partOrder(parts) {
  const taxonomy = taxonomyOfParts(parts);
  const expected = weekPartFiles(taxonomy);
  const keys = parts && typeof parts === 'object' ? Object.keys(parts) : [];
  const miss = expected.filter((f) => !keys.includes(f));
  const extra = keys.filter((k) => !expected.includes(k));
  if (miss.length || extra.length) {
    throw new Error(
      `renderWeekCombined: набор частей не соответствует regions_taxonomy ${taxonomy}`
      + (miss.length ? `; нет: ${miss.join(', ')}` : '')
      + (extra.length ? `; лишние: ${extra.join(', ')}` : ''),
    );
  }
  return expected;
}


// --- Комбинированный файл недели (week.js) ---
// Единый IIFE, регистрирующий в window.CI_DATA.snapshots[week] те же поля,
// что 11 отдельных частей: тела частей (без их обвязки) конкатенируются
// в одну обёртку. Контракт window.CI_DATA не меняется — сайт не замечает.
// parts: {global: '<текст global.js>', ...} — полные тексты частей (строки).
export function renderWeekCombined(week, parts) {
  const bodies = partOrder(parts).map((f) => {
    const content = parts ? parts[f] : undefined;
    if (typeof content !== 'string') throw new Error(`week.js ${week}: нет части ${f}`);
    const lines = content.split('\n');
    if (lines[lines.length - 1] === '') lines.pop(); // хвостовой \n файла
    const shapeOk =
      lines.length >= 5 &&
      lines[0] === 'window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };' &&
      lines[1] === '(function () {' &&
      lines[2].startsWith('  var s = ') &&
      lines[lines.length - 1] === '})();';
    if (!shapeOk) throw new Error(`week.js ${week}: часть ${f} не в шаблоне генератора`);
    return lines.slice(3, -1).join('\n');
  });
  return header(week) + bodies.join('\n') + '\n' + FOOTER;
}

// Чтение частей недели с диска (для week.js после --write и миграции).
// Сначала читается global.js — из него узнаётся regions_taxonomy недели, —
// затем части своего набора (weekPartFiles). Возвращает {global: '<текст>', …}
// по набору; null, если недели или какой-то части на диске нет.
export function loadWeekParts(week) {
  const dir = path.join(ROOT, 'data', week);
  if (!existsSync(dir)) return null;
  const globalSnap = loadSnapshotPart(week, 'global');
  if (!globalSnap) return null;
  const taxonomy = typeof globalSnap.regions_taxonomy === 'string' ? globalSnap.regions_taxonomy : '1.0';
  const parts = {};
  for (const f of weekPartFiles(taxonomy)) {
    const p = path.join(dir, `${f}.js`);
    if (!existsSync(p)) return null;
    parts[f] = readFileSync(p, 'utf8');
  }
  return parts;
}

// Числовая часть global.js: global (null при insufficient), q/nullWeight/
// coverage/confidence/preview/recalc — из классификации; published — как было
// (защищённое поле из прежнего снапшота); methodology — из PARAMS.methodology
// (версия перевыпуска; ADR 0021). through — дата самой недели: окно анализа
// W−7…W включительно, дата покрытия = день публикации (R02).
export function renderGlobal(week, snap, globalOut, meta) {
  const lines = [
    `  s.global = ${j(globalOut)};`,
    `  s.published = ${JSON.stringify(snap.published)};`,
    `  s.through = ${JSON.stringify(week)};`,
    `  s.methodology = ${JSON.stringify(PARAMS.methodology)};`,
    `  s.regions_taxonomy = ${JSON.stringify(taxonomyForWeek(week))};`,
    `  s.dataState = ${JSON.stringify(meta.dataState)};`,
    `  s.q = ${j(meta.q)};`,
    `  s.nullWeight = ${j(meta.nullWeight)};`,
    `  s.coverage = ${j(meta.coverage)};`,
    `  s.confidence = ${JSON.stringify(meta.confidence)};`,
  ];
  if (meta.preview) lines.push(`  s.preview = ${j(meta.preview)};`);
  if (meta.incompleteCoverage) lines.push('  s.incompleteCoverage = true;');
  if (typeof meta.sensitivity === 'number') lines.push(`  s.sensitivity = ${j(meta.sensitivity)};`);
  // Публичный слой Д9 (§4.3.6, R07): { value, signalingSubgroups } — только у
  // недель, записанных кодом с полем; старые снапшоты и паритет не меняются.
  if (meta.precursor) lines.push(`  s.precursor = ${j(meta.precursor)};`);
  // Покрытие критериев недели (R05/R06, ADR 0045): { covered, total, uncovered } —
  // опционально, сериализуется только когда посчитано (старые недели поля не несут).
  if (meta.coverageCriteria) lines.push(`  s.coverageCriteria = ${j(meta.coverageCriteria)};`);
  lines.push(`  s.recalc = ${j(meta.recalc)};`);
  return header(week) + lines.join('\n') + '\n' + FOOTER;
}

export function renderRegions(week, regions) {
  return header(week) + `  s.regions = ${j(regions)};\n` + FOOTER;
}

// region-*.js: пересчитываются только index/delta/status/background; confidence
// и narrative-поля (drivers) сохраняются из уже опубликованного файла.
function mergedRegion(prev, index, delta, status, background) {
  return { index, delta, status, background, confidence: prev.confidence, drivers: prev.drivers };
}

export function renderRegionFile(week, id, prev, index, delta, status, background) {
  return header(week) + `  s.regions[${JSON.stringify(id)}] = ${j(mergedRegion(prev, index, delta, status, background))};\n` + FOOTER;
}

export function renderTrend(week, trend) {
  return header(week) + `  s.trend = ${j(trend)};\n` + FOOTER;
}

// --- Загрузка входа недели ---
function loadInput(week, regionIds) {
  const f = path.join(HERE, 'input', `${week}.json`);
  if (!existsSync(f)) return { errors: [`вход не найден: calc/input/${week}.json`] };
  let input;
  try {
    input = JSON.parse(readFileSync(f, 'utf8'));
  } catch (e) {
    return { errors: [`calc/input/${week}.json: не парсится JSON (${e.message})`] };
  }
  // Whitelist регионов входа — по версии недели (regionIdsFor(taxonomyForWeek)).
  const errors = validate(input, PARAMS, regionIds);
  if (!errors.length && input.sources !== undefined) {
    // Только форма (R01) — дословность цитат проверяется на записи, в writeWeek:
    // корпус текстов не лежит в репозитории (.gitignore), и чтение недели
    // (печать, тесты цепочки) не должно требовать файлов, которых нет.
    errors.push(...validateInputSources(input.sources, PARAMS));
  }
  // Ворота независимости (R01, §4.1.2): покрытый критерий ≥ даты ворот
  // требует ≥2 кластеров ИЛИ ≥1 primary|OSINT; ошибка — неделя не считается.
  if (!errors.length) {
    errors.push(...validateSourceIndependence(input, PARAMS));
  }
  return errors.length ? { errors } : { input };
}

// --- Прогон одной недели цепочки ---
// state: {prevInternal, prevPublished, prevRegions, sbLeft, sbReason} —
// состояние недельного цикла (инерция и персистентность override живут тут).
export function runWeek(week, state) {
  const regionIds = regionIdsFor(taxonomyForWeek(week));
  const { input, errors } = loadInput(week, regionIds);
  if (errors) return { week, errors };

  // Шаг недели — общий чистый модуль week-step.js (D03): маппинг → драйверы →
  // агрегация с контекстом цепочки → региональные сигналы → классификация.
  // Регионы: регион с сигналами считается по ним (nReg > 0, background:false),
  // без сигналов — «слепой» веткой (nReg = 0, background:true), сохраняющей
  // последнее региональное отклонение от глобального фона (prevRegions против
  // prevPublished прошлой недели). Для insufficient-недели это расчётные числа
  // превью (публикация запрещена — число не уходит в global/trend, но файлы
  // регионов несут его для редакции).
  const step = computeWeek(input, state, PARAMS);
  const { global: g, drivers, classification, regions, ctx, sbLeft, sbReason } = step;
  // Метрика чувствительности недели (R02, ADR 0019): leave-one-out по
  // доменам и кластерам критериальных источников при том же контексте
  // цепочки; max|ΔI| в п.п. Чистая функция, без сети, до ворот записи.
  // null — вырожденный вход без единого источника (R02.3), поле не пишется.
  const sensitivity = sensitivityScore(input, ctx, PARAMS);
  // Публичный слой Д9 (§4.3.6, R07): процент скора Д9 без ограничителя §4.3.5
  // и число сигналящих подгрупп. В индекс не входит; null — Д9 слепой/битый,
  // тогда поле не пишется вовсе (старые недели не меняются).
  const precursor = precursorOf(drivers);

  // trend: окно 12 точек как опубликовано; точки дат из пересчитываемой
  // цепочки несут methodology (версия снапшота недели точки). Опубликованные
  // недели — новым опубликованным значением; insufficient — value:null
  // (маркер разрыва: неопубликованная неделя не рисует число). Старше
  // цепочки — как были, без methodology (старьё).
  const prevTrend = loadSnapshotPart(week, 'trend');
  const methodologyOf = (date) => {
    const part = loadSnapshotPart(date, 'global');
    return part && typeof part.methodology === 'string' ? part.methodology : null;
  };
  const onDiskState = (date) => {
    const part = loadSnapshotPart(date, 'global');
    return part && typeof part.dataState === 'string' ? part.dataState : null;
  };
  const trend = (prevTrend ? prevTrend.trend : []).map((p) => {
    if (!RECALC_SET.has(p.date)) return { date: p.date, value: p.value };
    // Версия точки: для собственной недели берём версию записываемого снапшота
    // (PARAMS.methodology), а не до-записную с диска — иначе при --write
    // точка текущей недели несла бы старую версию, и trend-серия отсекала её
    // как несопоставимую (дыра в серии + ложный разрыв trendSegments).
    const methodology = p.date === week ? PARAMS.methodology : methodologyOf(p.date);
    const m = methodology ? { methodology } : {};
    // Классификация недели точки: уже посчитанные недели цепочки — из state;
    // текущая — из свежего расчёта; будущие — по опубликованному на диске
    // снапшоту (при повторном прогоне неделя уже переклассифицирована).
    const clsOf = state.classification[p.date]
      || (p.date === week ? classification.dataState : onDiskState(p.date));
    if (clsOf === 'insufficient') {
      return { date: p.date, value: null, ...m };
    }
    // точка текущей недели берётся из её расчёта; точки ранних недель
    // цепочки — из уже посчитанных значений (state.recalcIndex).
    const v = p.date === week ? g.index : state.recalcIndex[p.date];
    return typeof v === 'number' ? { date: p.date, value: v, ...m } : { date: p.date, value: p.value };
  });

  return {
    week,
    errors: [],
    global: g,
    classification,
    sensitivity,
    precursor,
    regions,
    trend,
    sbLeft,
    sbReason,
    sources: input.sources,
    flash: detectFlashTriggers(input.criteria, PARAMS) ? flashDetails(input.criteria, PARAMS) : [],
    core: checkCoreSources(input, PARAMS),
    ignoredAttribution: ignoredRegionalAttribution(input.criteria),
    // §4.1.5 (ADR 0046): id критериев с intersection: true — отсортированные,
    // чтобы редактор видел, что флаг принят, а не проигнорирован. Снапшот
    // не меняется: поле живёт только в отчёте прогона.
    intersections: collectIntersections(input.criteria),
    // История источников (ADR 0040): долг недели (слепые критерии с причиной
    // not-collected) и предупреждения схемы — rejected[] и обязательность
    // blindReasons с PARAMS.blindReasonFrom. Всё warning, запись не блокирует.
    debt: weekDebt(week, input),
    schemaWarnings: [
      ...validateBlindReasons(input, PARAMS),
      ...validateRejected(input),
    ],
    coverage: {
      // ADR 0045: id непокрытых критериев в порядке движка (не алфавитном) —
      // сайт группирует их по драйверам без пересортировки. Покрытый критерий —
      // только entry.covered === true; null и отсутствие ключа одинаково слепы.
      // §4.1.5 (ADR 0046): intersection на счётчик не влияет.
      ...coverageOf(input.criteria),
      drivers: classification.coveredDrivers,
    },
  };
}

// --- Запись числовых файлов недели ---
// Ворота записи по порядку: дословность цитат (R03i) — цитата обязана найтись
// в корпусе текстов недели, иначе отказ без единого записанного байта; затем
// ворота ссылок (R03) — собранный в памяти снапшот (числа из расчёта,
// защищённые поля — из уже опубликованных файлов) прогоняется через
// linkcheck.checkSources; при любом broken — отказ без записи. Затем
// самопроверка контрактом validate из js/data.js; при провале диск не трогаем.
// После успешной записи — append-записи в audit: recalc (пересчёт) и, при
// срабатывании, flash.
const round4 = (x) => Math.round(x * 10000) / 10000;
const round3 = (x) => Math.round(x * 1000) / 1000;

function recalcReason(cls, res) {
  if (cls.insufficient) {
    return `Покрытие ${res.coverage.criteria}/${res.coverage.totalCriteria} критериев ` +
      `— ниже порога публикации (nullWeight ${round4(cls.nullWeight)}, порог ${PARAMS.dataCoverage.insufficient})`;
  }
  if (cls.reduced) {
    return `Неполное покрытие (nullWeight ${round4(cls.nullWeight)}) — публикация с пониженной уверенностью`;
  }
  return 'Еженедельный пересчёт';
}

// diff изменившихся полей {field: {from, to}} для audit-записи recalc.
function recalcDiff(snap, globalOut, meta) {
  const prev = snap.global && typeof snap.global.index === 'number' ? snap.global : null;
  const diff = {
    'global.index': { from: prev ? prev.index : null, to: globalOut ? globalOut.index : null },
    'global.delta': { from: prev ? prev.delta : null, to: globalOut ? globalOut.delta : null },
    dataState: { from: snap.dataState ?? null, to: meta.dataState },
    q: { from: snap.q ?? null, to: meta.q },
    nullWeight: { from: snap.nullWeight ?? null, to: meta.nullWeight },
    confidence: { from: snap.confidence ?? null, to: meta.confidence },
  };
  if (meta.preview) diff.preview = { from: snap.preview ?? null, to: meta.preview };
  return diff;
}

// Публичный слой Д9 — forward-only (ADR 0047): неделя получает precursor только
// с PARAMS.precursorFrom, история задним числом не бэкфиллится (пересчёт
// 08-30…10-18 поле не добавляет). Пустая/отсутствующая дата — гейта нет.
export function precursorForWeek(week, res, params = PARAMS) {
  if (!res || !res.precursor) return null;
  const from = params.precursorFrom;
  if (typeof from === 'string' && from && week < from) return null;
  return res.precursor;
}

export async function writeWeek(res, state) {
  const week = res.week;
  const snap = loadSnapshotPart(week, 'global') || {};
  const cls = res.classification;

  const globalOut = cls.insufficient ? null : { index: res.global.index, delta: res.global.delta };
  // Слой Д9 пишется с гейта precursorFrom (ADR 0047); до него поля в снапшоте нет.
  const precursorOut = precursorForWeek(week, res, PARAMS);
  const recalc = {
    at: new Date().toISOString(),
    reason: recalcReason(cls, res),
    previous: snap.global && typeof snap.global.index === 'number' ? snap.global.index : null,
    methodologyBefore: snap.methodology,
    methodologyAfter: PARAMS.methodology,
    approvedBy: 'Editor-in-Chief',
  };
  const meta = {
    dataState: cls.dataState,
    q: round4(cls.q),
    nullWeight: round4(cls.nullWeight),
    coverage: { coveredDrivers: cls.coveredDrivers, totalDrivers: cls.totalDrivers },
    confidence: cls.confidence,
    // Покрытие критериев недели (R05/R06/R18): числа уже посчитаны в runWeek
    // (res.coverage.criteria/totalCriteria — критерии с covered:true из общего
    // числа критериев движка). До правки уходили только в строку аудита.
    // ADR 0045: uncovered — id слепых критериев в порядке движка, additive-поле.
    coverageCriteria: {
      covered: res.coverage.criteria,
      total: res.coverage.totalCriteria,
      uncovered: res.coverage.uncovered,
    },
    ...(cls.insufficient
      ? { preview: { index: res.global.index, internal: round3(res.global.internal) } }
      : {}),
    ...(cls.reduced ? { incompleteCoverage: true } : {}),
    ...(typeof res.sensitivity === 'number' ? { sensitivity: res.sensitivity } : {}),
    ...(precursorOut ? { precursor: precursorOut } : {}),
    recalc,
  };

  const full = {
    ...snap,
    global: globalOut,
    dataState: cls.dataState,
    regions_taxonomy: taxonomyForWeek(week),
    q: meta.q,
    nullWeight: meta.nullWeight,
    coverage: meta.coverage,
    confidence: meta.confidence,
    coverageCriteria: meta.coverageCriteria,
    ...(typeof res.sensitivity === 'number' ? { sensitivity: res.sensitivity } : {}),
    ...(precursorOut ? { precursor: precursorOut } : {}),
    recalc,
  };
  if (meta.preview) full.preview = meta.preview;
  if (meta.incompleteCoverage) full.incompleteCoverage = true;
  full.trend = res.trend;
  full.regions = {};
  const weekRegionIds = regionIdsFor(taxonomyForWeek(week));
  for (const id of weekRegionIds) {
    const prev = loadSnapshotPart(week, `region-${id}`);
    full.regions[id] = mergedRegion(
      prev && prev.regions ? prev.regions[id] : {},
      res.regions[id].index, res.regions[id].delta, res.regions[id].status, res.regions[id].background,
    );
  }
  for (const f of ['drivers']) {
    const p = loadSnapshotPart(week, f);
    if (p) Object.assign(full, { [f]: p[f] });
  }
  // Top-level sources из входа (R55): строго провалидированы ещё в loadInput;
  // если есть — заменяют ручные демо-записи, иначе сохраняем существующие.
  const sourcesOut = Array.isArray(res.sources) ? res.sources : null;
  if (sourcesOut) full.sources = sourcesOut;
  else {
    const p = loadSnapshotPart(week, 'sources');
    if (p) full.sources = p.sources;
  }
  // Ворота дословности цитат (R03i) — до ворот ссылок и до любой записи:
  // цитата ищется в корпусе текстов этой недели
  // (calc/input/drafts/texts-<неделя>/<id>.txt) той же нормализацией, что у
  // пилота Jev. Нет корпуса/фрагмента — неделя не пишется, ошибка называет
  // источник и критерий. Источники без quotes корпус не читают вовсе; чтение
  // недели (печать, тесты) сюда не доходит — корпус в репозитории не лежит.
  const quotesOut = verifyQuotes(
    Array.isArray(res.sources) ? res.sources : [],
    path.join(HERE, 'input', 'drafts', `texts-${week}`),
  );
  if (quotesOut.errors.length) {
    return { ok: false, stage: 'quotes', quotes: quotesOut };
  }
  // Ворота ссылок (R03): собранный снапшот прогоняется через
  // linkcheck.checkSources ДО контрактной самопроверки и до любой записи;
  // любой broken — отказ, диск не тронут. blocked — только предупреждение.
  const linkItems = collectSourceItems(full, week);
  process.stdout.write(`${week}: проверка ${linkItems.length} ссылок-источников…\n`);
  const linkReport = await checkSources(linkItems);
  if (linkReport.broken.length) {
    return { ok: false, stage: 'links', report: linkReport };
  }

  const v = validateSnapshot(full);
  if (!v.ok) return { ok: false, stage: 'contract', errors: v.errors };

  const files = {
    'global.js': renderGlobal(week, snap, globalOut, meta),
    'regions.js': renderRegions(week, res.regions),
    'trend.js': renderTrend(week, res.trend),
  };
  if (sourcesOut) files['sources.js'] = header(week) + `  s.sources = ${j(sourcesOut)};\n` + FOOTER;
  for (const id of weekRegionIds) {
    const prev = loadSnapshotPart(week, `region-${id}`);
    files[`region-${id}.js`] = renderRegionFile(
      week, id, prev ? prev.regions[id] : {}, res.regions[id].index, res.regions[id].delta, res.regions[id].status, res.regions[id].background,
    );
  }
  for (const [file, content] of Object.entries(files)) {
    writeFileSync(path.join(ROOT, 'data', week, file), content, 'utf8');
  }
  // Комбинированный week.js — производная от записанных частей: читаем их
  // с диска, чтобы файл был байт-собран из того же источника, что и при
  // разовой миграции (calc/migrate-week-combined.js).
  writeFileSync(
    path.join(ROOT, 'data', week, 'week.js'),
    renderWeekCombined(week, loadWeekParts(week)),
    'utf8',
  );

  // Журнал аудита: recalc при каждой перезаписи (R35–R37), flash при
  // срабатывании триггера без пересчёта снапшота (R16–R19).
  audit.append({
    type: 'recalc',
    snapshot_id: week,
    version_before: snap.methodology,
    version_after: PARAMS.methodology,
    changed_by: 'calc-pipeline',
    changed_at: recalc.at,
    reason: recalc.reason,
    parameters_changed: [],
    recalculation_method: 'aggregateDrivers v3.0',
    diff: recalcDiff(snap, globalOut, meta),
    approved_by: 'Editor-in-Chief',
  });
  for (const trigger of res.flash) {
    audit.append({
      type: 'flash',
      snapshot_id: week,
      version_before: snap.methodology,
      version_after: snap.methodology,
      changed_by: 'calc-pipeline',
      changed_at: new Date().toISOString(),
      reason: `flash trigger: ${trigger.criterion}`,
      parameters_changed: [],
      recalculation_method: 'none (alert only, snapshot unchanged)',
      diff: {},
      approved_by: 'Editor-in-Chief',
      flash: trigger,
    });
  }
  return { ok: true, report: linkReport };
}

// --- Печать ---
// Экспортируется ради теста отчётных строк (R12i): чистый форматтер, DOM и сети нет.
export function printWeek(res, writeMode, writeRejected = false) {
  const lines = [];
  if (res.errors && res.errors.length) {
    lines.push(`=== ${res.week} === ОШИБКА`);
    for (const e of res.errors) lines.push(`  ${e}`);
    return lines;
  }
  const g = res.global;
  const cls = res.classification;
  lines.push(`=== ${res.week} ===`);
  lines.push(
    `index: ${g.index}  state: ${g.state}  delta: ${g.delta >= 0 ? '+' : ''}${g.delta}` +
    ` (к опубликованному ${res.prevPublished} недели ${res.prevWeek})`,
  );
  const pubLine = cls.insufficient
    ? `публикация: НЕТ (insufficient, nullWeight ${cls.nullWeight.toFixed(3)} > ${PARAMS.dataCoverage.insufficient})` +
      ` — global:null, preview ${g.index}`
    : `публикация: ${cls.confidence === 'reduced' ? 'ДА (reduced — неполное покрытие)' : 'ДА (full)'}`;
  lines.push(pubLine);
  lines.push(`internal: ${g.internal.toFixed(3)}  q: ${g.q.toFixed(3)}  ` +
    `покрытие: критериев ${res.coverage.criteria}/${res.coverage.totalCriteria}, драйверов ${res.coverage.drivers}/9`);
  // §4.1.5 (ADR 0046): пересечения называются только когда они есть — иначе
  // строка шумит в каждой неделе.
  if (Array.isArray(res.intersections) && res.intersections.length) {
    lines.push(`пересечения: ${res.intersections.length} (${res.intersections.join(', ')})`);
  }
  lines.push(`structuralBreak: ${g.structuralBreak.active ? `АКТИВЕН (${g.structuralBreak.reason})` : 'нет'}`);
  lines.push(`sensitivity: ${res.sensitivity === null ? 'н/д (нет источников)' : `${res.sensitivity} п.п.`} (порог ${PARAMS.sensitivityThreshold} — пометка на сайте, таск 06)`);
  if (res.flash.length) {
    lines.push(`flash: ${res.flash.map((t) => t.criterion).join(', ')} — запись в audit`);
  }
  // Ядро источников (R03, ADR 0020): warning, не ворота — запись не блокирует.
  if (res.core && res.core.count < PARAMS.coreMinDomains) {
    lines.push(
      `предупреждение: ядро источников представлено ${res.core.count} из ` +
      `${PARAMS.coreMinDomains}+ доменов (нет: ${res.core.missing.join(', ')}) — сравнимость недель снижена, запись не блокируется`,
    );
  }
  // R01.2: атрибуция regions[] критериев Д2/Д4/Д9 (кроме Д9.3) региональная
  // агрегация проигнорирует (ADR 0022) — предупреждаем, молча не глотаем.
  if (res.ignoredAttribution && res.ignoredAttribution.length) {
    lines.push(
      `предупреждение: региональная атрибуция будет проигнорирована агрегацией ` +
      `(Д2/Д4/Д9 кроме Д9.3, ADR 0022): ${res.ignoredAttribution.join(', ')}`,
    );
  }
  // ADR 0040: долг истории недели и предупреждения схемы входа (warning).
  if (res.debt) {
    const b = res.debt.byReason;
    lines.push(`долг истории: ${res.debt.debt} критерий-недель (not-collected ${b['not-collected']}, ` +
      `searched-none ${b['searched-none']}, gate-failed ${b['gate-failed']}, unknown ${b.unknown})` +
      `${res.debt.legacySkeleton ? ' — ранний скелет' : ''} — окно дозабора ${PARAMS.backfillWindow} ${weeksGenitive(PARAMS.backfillWindow)}`);
  }
  for (const w of (res.schemaWarnings || [])) lines.push(`предупреждение: ${w}`);
  const nSignaled = Object.values(res.regions).filter((r) => !r.background).length;
  lines.push(`regions (фоновые, nReg=0 → сохранено последнее региональное отклонение от глобального фона; с сигналами: ${nSignaled}):`);
  for (const [id, r] of Object.entries(res.regions)) {
    lines.push(`  ${id}: ${r.index} (${r.status}, Δ ${r.delta >= 0 ? '+' : ''}${r.delta})${r.background ? ' — фон' : ''}`);
  }
  const replaced = res.trend.filter((p) => RECALC_SET.has(p.date)).length;
  const last = res.trend[res.trend.length - 1];
  lines.push(`trend: ${res.trend.length} точек, заменено ${replaced}, последняя ${last.date} = ${last.value === null ? 'null (не опубликована)' : last.value}`);
  lines.push(writeMode ? (writeRejected ? 'write: ОТКЛОНЕНО (файлы не изменены)' : 'write: записано') : 'write: нет (только печать)');
  return lines;
}

// --- CLI ---
async function main() {
  const args = process.argv.slice(2);
  const writeMode = args.includes('--write');
  const weeks = args.filter((a) => !a.startsWith('--'));
  const targets = weeks.length ? weeks : RECALC_WEEKS;

  const unknown = targets.filter((w) => !RECALC_WEEKS.includes(w));
  if (unknown.length) {
    process.stdout.write(`непересчитываемые недели: ${unknown.join(', ')} (доступны: ${RECALC_WEEKS.join(', ')})\n`);
    process.exitCode = 1;
    return;
  }

  // Старт цепочки: опубликованный снапшот PREV_WEEK (демо-история как есть).
  const prevGlobal = loadSnapshotPart(PREV_WEEK, 'global');
  const prevRegions = loadSnapshotPart(PREV_WEEK, 'regions');
  const state = {
    prevInternal: prevGlobal ? prevGlobal.global.index : null,
    prevPublished: prevGlobal ? prevGlobal.global.index : null,
    prevWeek: PREV_WEEK,
    prevRegions: prevRegions ? Object.fromEntries(regionIdsFor(taxonomyForWeek(PREV_WEEK)).map((id) => [id, prevRegions.regions[id].index])) : {},
    recalcIndex: {},
    classification: {},
    sbLeft: 0,
    sbReason: null,
  };
  if (state.prevInternal == null) {
    process.stdout.write(`не найден опубликованный снапшот ${PREV_WEEK} — инерции не к чему привязать\n`);
    process.exitCode = 1;
    return;
  }

  const out = [];
  let failed = false;
  const lastIdx = Math.max(...targets.map((w) => RECALC_WEEKS.indexOf(w)));
  for (let i = 0; i <= lastIdx; i++) {
    const week = RECALC_WEEKS[i];
    const res = runWeek(week, state);
    if (res.errors.length) {
      failed = true;
      out.push(...printWeek(res, writeMode));
      break;
    }
    res.prevPublished = state.prevPublished;
    res.prevWeek = state.prevWeek;
    let writeRejected = false;
    if (writeMode && targets.includes(week)) {
      const check = await writeWeek(res, state);
      if (!check.ok) {
        failed = true;
        writeRejected = true;
        if (check.stage === 'links') out.push(...formatLinkGateFailure(check.report));
        else if (check.stage === 'quotes') {
          out.push('  ЗАПИСЬ ОТКЛОНЕНА проверкой цитат: дословно не подтверждены (диск не тронут):');
          for (const e of check.quotes.errors) out.push(`    ${e}`);
        } else out.push(`  ЗАПИСЬ ОТКЛОНЕНА контрактом data.js: ${check.errors.join('; ')}`);
      } else if (check.report.blocked.length) {
        out.push(...formatLinkBlockedWarning(check.report));
      }
    }
    if (targets.includes(week)) out.push(...printWeek(res, writeMode, writeRejected));
    // Продвижение цепочки: insufficient-неделя не двигает lastValid —
    // следующая валидная считает инерцию от последнего валидного internal.
    Object.assign(state, nextChainState(state, res));
  }
  process.stdout.write(out.join('\n') + '\n');
  process.exitCode = failed ? 1 : 0;
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((e) => {
    process.stdout.write(`ошибка: ${e && e.message ? e.message : e}\n`);
    process.exitCode = 1;
  });
}
