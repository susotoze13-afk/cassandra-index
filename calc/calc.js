// calc.js — запуск расчёта недели: вход calc/input/<неделя>.json → engine →
// печать результата; с --write обновляет числовые файлы снапшота в data/.
// Перед записью: ворота ссылок-источников (linkcheck.checkSources, R03) —
// при любом битом URL запись отклоняется, диск не трогается.
// CLI — тонкая обвязка: вся математика в engine.js, маппинг входа — в
// buildDrivers из calibrate.js (шов §4.2–§4.3, не дублируется здесь).
//
// Использование:
//   node calc/calc.js [неделя …]          — прогон цепочки, только печать
//   node calc/calc.js --write [неделя …]  — прогон + запись числовых файлов
// Неделя без аргументов = вся пересчитываемая цепочка RECALC_WEEKS.
// Цепочка: инерция (prevInternal) и опубликованное prevPublished текут от
// недели к неделе внутри прогона; старт цепочки — опубликованный снапшот
// PREV_WEEK (демо-история не пересчитывается). Регионы входов сигналов не
// несут (D01) → nReg = 0, «слепые регионы»: I_region = I_global, background.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

import { PARAMS } from './params.js';
import { aggregateDrivers, validate, regionalIndex, CRITERIA, detectFlashTriggers } from './engine.js';
import { buildDrivers } from './calibrate.js';
import { validate as validateSnapshot, REGION_IDS } from '../js/data.js';
import { checkSources } from './linkcheck.js';
import * as audit from './audit.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);
const RECALC_WEEKS = ['2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20'];
const PREV_WEEK = '2026-08-23'; // опубликованная демо-неделя перед цепочкой
const RECALC_SET = new Set(RECALC_WEEKS);

// --- Чтение файлов снапшота data/<week>/<file>.js через vm (без DOM) ---
// Возвращает объект снапшота так, как его видит сайт в window.CI_DATA.
export function loadSnapshotPart(week, file) {
  const f = path.join(ROOT, 'data', week, `${file}.js`);
  if (!existsSync(f)) return null;
  const sandbox = { window: { CI_DATA: { snapshots: {}, latest: null } } };
  // region-*.js присваивает в s.regions[id] и предполагает, что s.regions
  // уже создан regions.js (порядок загрузки на сайте) — подсаживаем пустой.
  sandbox.window.CI_DATA.snapshots[week] = { regions: {} };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(f, 'utf8'), sandbox);
  return sandbox.window.CI_DATA.snapshots[week] || null;
}

// --- Классификация публикации (R11–R15) ---
// Правила из PARAMS.dataCoverage: nullWeight = 1 − q; nullWeight > insufficient
// (0.4) или null по Д1/Д2 → публикация запрещена; > reduced (0.2) — пониженная
// уверенность; иначе полная. Чистый шов — тестируется синтетически.
export function classifyPublication(aggregate, drivers, params = PARAMS) {
  const dc = params.dataCoverage || { insufficient: 0.4, reduced: 0.2, d1d2Required: true };
  const q = aggregate && typeof aggregate.q === 'number' ? aggregate.q : 0;
  const nullWeight = 1 - q;
  // EPS: границы 0.4/0.2 сравниваются без float-шума (q из движка — не
  // точный десятичный; строгость «> порог» сохраняется).
  const EPS = 1e-9;
  const byId = {};
  for (const d of Array.isArray(drivers) ? drivers : []) if (d && d.id) byId[d.id] = d;
  const d1Null = !byId.D1 || typeof byId.D1.score !== 'number';
  const d2Null = !byId.D2 || typeof byId.D2.score !== 'number';
  const insufficient = nullWeight > dc.insufficient + EPS || (dc.d1d2Required && (d1Null || d2Null));
  const reduced = !insufficient && nullWeight > dc.reduced + EPS;
  return {
    insufficient,
    reduced,
    dataState: insufficient ? 'insufficient' : 'published',
    confidence: insufficient ? 'none' : reduced ? 'reduced' : 'full',
    q,
    nullWeight,
    coveredDrivers: (Array.isArray(drivers) ? drivers : []).filter((d) => d && typeof d.score === 'number').length,
    totalDrivers: Array.isArray(drivers) ? drivers.length : 0,
  };
}

// --- Продвижение цепочки недель ---
// insufficient-неделя не рвёт инерцию: lastValidInternal/prevPublished и
// регионы не двигаются, число не идёт в trend (classification фиксирует,
// что точка этой недели — null). Чистый шов — тестируется синтетически.
export function nextChainState(state, res) {
  const next = {
    ...state,
    prevRegions: { ...state.prevRegions },
    recalcIndex: { ...state.recalcIndex },
    classification: { ...state.classification },
  };
  next.classification[res.week] = res.classification.dataState;
  if (!res.classification.insufficient) {
    next.prevInternal = res.global.internal;
    next.prevPublished = res.global.index;
    next.prevWeek = res.week;
    next.recalcIndex[res.week] = res.global.index;
    for (const id of REGION_IDS) next.prevRegions[id] = res.regions[id].index;
  }
  next.sbLeft = res.sbLeft;
  next.sbReason = res.sbReason;
  return next;
}

// --- Строгая валидация top-level sources входа (R55) ---
// Полная схема: id/title{ru,en}/domain/url/publication_date/accessed_date/
// source_type(primary|secondary|OSINT)/cluster_id (whitelist)/state_affiliated
// + опциональные author/archive_url/archive_date/confidence/notes.
// Ошибка — запись недели не производится.
const SOURCE_OPTIONALS = ['author', 'archive_url', 'archive_date', 'confidence', 'notes'];

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
  return errors;
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

// Числовая часть global.js: global (null при insufficient), q/nullWeight/
// coverage/confidence/preview/recalc — из классификации; published/methodology
// — как были (защищённые поля). through — дата самой недели: окно анализа
// W−7…W включительно, дата покрытия = день публикации (R02).
export function renderGlobal(week, snap, globalOut, meta) {
  const lines = [
    `  s.global = ${j(globalOut)};`,
    `  s.published = ${JSON.stringify(snap.published)};`,
    `  s.through = ${JSON.stringify(week)};`,
    `  s.methodology = ${JSON.stringify(snap.methodology)};`,
    `  s.dataState = ${JSON.stringify(meta.dataState)};`,
    `  s.q = ${j(meta.q)};`,
    `  s.nullWeight = ${j(meta.nullWeight)};`,
    `  s.coverage = ${j(meta.coverage)};`,
    `  s.confidence = ${JSON.stringify(meta.confidence)};`,
  ];
  if (meta.preview) lines.push(`  s.preview = ${j(meta.preview)};`);
  if (meta.incompleteCoverage) lines.push('  s.incompleteCoverage = true;');
  lines.push(`  s.recalc = ${j(meta.recalc)};`);
  return header(week) + lines.join('\n') + '\n' + FOOTER;
}

export function renderRegions(week, regions) {
  return header(week) + `  s.regions = ${j(regions)};\n` + FOOTER;
}

// region-*.js: пересчитываются только index/delta/status; confidence и
// narrative-поля (drivers) сохраняются из уже опубликованного файла.
function mergedRegion(prev, index, delta, status) {
  return { index, delta, status, confidence: prev.confidence, drivers: prev.drivers };
}

export function renderRegionFile(week, id, prev, index, delta, status) {
  return header(week) + `  s.regions[${JSON.stringify(id)}] = ${j(mergedRegion(prev, index, delta, status))};\n` + FOOTER;
}

export function renderTrend(week, trend) {
  return header(week) + `  s.trend = ${j(trend)};\n` + FOOTER;
}

// --- Загрузка входа недели ---
function loadInput(week) {
  const f = path.join(HERE, 'input', `${week}.json`);
  if (!existsSync(f)) return { errors: [`вход не найден: calc/input/${week}.json`] };
  let input;
  try {
    input = JSON.parse(readFileSync(f, 'utf8'));
  } catch (e) {
    return { errors: [`calc/input/${week}.json: не парсится JSON (${e.message})`] };
  }
  const errors = validate(input);
  if (!errors.length && input.sources !== undefined) {
    errors.push(...validateInputSources(input.sources, PARAMS));
  }
  return errors.length ? { errors } : { input };
}

// --- Прогон одной недели цепочки ---
// state: {prevInternal, prevPublished, prevRegions, sbLeft, sbReason} —
// состояние недельного цикла (инерция и персистентность override живут тут).
export function runWeek(week, state) {
  const { input, errors } = loadInput(week);
  if (errors) return { week, errors };

  const drivers = buildDrivers(input, PARAMS);
  const ctx = {
    prevInternal: state.prevInternal,
    prevPublished: state.prevPublished,
    structuralBreak:
      state.sbLeft > 0 ? { active: true, reason: state.sbReason } : null,
  };
  const g = aggregateDrivers(drivers, PARAMS, ctx);
  const classification = classifyPublication(g, drivers, PARAMS);

  // Слепые регионы (nReg = 0 → I_region = I_global, background, §7) — через
  // engine.regionalIndex, даже в этом вырожденном случае; в res.regions —
  // проекция в форму снапшота {index, delta, status}. Для insufficient-недели
  // это расчётные числа превью (публикация запрещена — число не уходит
  // в global/trend, но файлы регионов несут его для редакции).
  const regions = {};
  for (const id of REGION_IDS) {
    const r = regionalIndex(
      { index: g.index, internal: g.internal, delta: g.delta },
      { nReg: 0, prevIndex: state.prevRegions[id] },
      PARAMS,
    );
    regions[id] = { index: r.index, delta: r.delta, status: r.state };
  }

  // Персистентность Structural Break Override (§5.4): 2 недели.
  const sb = g.structuralBreak;
  const sbLeft = sb.active ? (PARAMS.structuralBreak.weeks || 2) : Math.max(0, state.sbLeft - 1);
  const sbReason = sb.active ? sb.reason : state.sbReason;

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
    const methodology = methodologyOf(p.date);
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
    regions,
    trend,
    sbLeft,
    sbReason,
    sources: input.sources,
    flash: detectFlashTriggers(input.criteria, PARAMS) ? flashDetails(input.criteria, PARAMS) : [],
    coverage: {
      criteria: Object.values(input.criteria || {}).filter((c) => c && c.covered === true).length,
      totalCriteria: Object.keys(CRITERIA).length,
      drivers: classification.coveredDrivers,
    },
  };
}

// --- Запись числовых файлов недели ---
// Ворота ссылок (R03) раньше всего: собранный в памяти снапшот (числа из
// расчёта, защищённые поля — из уже опубликованных файлов) прогоняется через
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

async function writeWeek(res, state) {
  const week = res.week;
  const snap = loadSnapshotPart(week, 'global') || {};
  const cls = res.classification;

  const globalOut = cls.insufficient ? null : { index: res.global.index, delta: res.global.delta };
  const recalc = {
    at: new Date().toISOString(),
    reason: recalcReason(cls, res),
    previous: snap.global && typeof snap.global.index === 'number' ? snap.global.index : null,
    methodologyBefore: snap.methodology,
    methodologyAfter: snap.methodology,
    approvedBy: 'Editor-in-Chief',
  };
  const meta = {
    dataState: cls.dataState,
    q: round4(cls.q),
    nullWeight: round4(cls.nullWeight),
    coverage: { coveredDrivers: cls.coveredDrivers, totalDrivers: cls.totalDrivers },
    confidence: cls.confidence,
    ...(cls.insufficient
      ? { preview: { index: res.global.index, internal: round3(res.global.internal) } }
      : {}),
    ...(cls.reduced ? { incompleteCoverage: true } : {}),
    recalc,
  };

  const full = {
    ...snap,
    global: globalOut,
    dataState: cls.dataState,
    q: meta.q,
    nullWeight: meta.nullWeight,
    coverage: meta.coverage,
    confidence: meta.confidence,
    recalc,
  };
  if (meta.preview) full.preview = meta.preview;
  if (meta.incompleteCoverage) full.incompleteCoverage = true;
  full.trend = res.trend;
  full.regions = {};
  for (const id of REGION_IDS) {
    const prev = loadSnapshotPart(week, `region-${id}`);
    full.regions[id] = mergedRegion(
      prev && prev.regions ? prev.regions[id] : {},
      res.regions[id].index, res.regions[id].delta, res.regions[id].status,
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
  for (const id of REGION_IDS) {
    const prev = loadSnapshotPart(week, `region-${id}`);
    files[`region-${id}.js`] = renderRegionFile(
      week, id, prev ? prev.regions[id] : {}, res.regions[id].index, res.regions[id].delta, res.regions[id].status,
    );
  }
  for (const [file, content] of Object.entries(files)) {
    writeFileSync(path.join(ROOT, 'data', week, file), content, 'utf8');
  }

  // Журнал аудита: recalc при каждой перезаписи (R35–R37), flash при
  // срабатывании триггера без пересчёта снапшота (R16–R19).
  audit.append({
    type: 'recalc',
    snapshot_id: week,
    version_before: snap.methodology,
    version_after: snap.methodology,
    changed_by: 'calc-pipeline',
    changed_at: recalc.at,
    reason: recalc.reason,
    parameters_changed: [],
    recalculation_method: 'aggregateDrivers v2.0',
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
function printWeek(res, writeMode, writeRejected = false) {
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
  lines.push(`structuralBreak: ${g.structuralBreak.active ? `АКТИВЕН (${g.structuralBreak.reason})` : 'нет'}`);
  if (res.flash.length) {
    lines.push(`flash: ${res.flash.map((t) => t.criterion).join(', ')} — запись в audit`);
  }
  lines.push('regions (слепые, nReg=0 → background, I_region = I_global, без зеркалирования):');
  for (const [id, r] of Object.entries(res.regions)) {
    lines.push(`  ${id}: ${r.index} (${r.status}, Δ ${r.delta >= 0 ? '+' : ''}${r.delta})`);
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
    prevRegions: prevRegions ? Object.fromEntries(REGION_IDS.map((id) => [id, prevRegions.regions[id].index])) : {},
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
        else out.push(`  ЗАПИСЬ ОТКЛОНЕНА контрактом data.js: ${check.errors.join('; ')}`);
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
