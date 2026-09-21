// calc.js — запуск расчёта недели: вход calc/input/<неделя>.json → engine →
// печать результата; с --write обновляет числовые файлы снапшота в data/.
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
import { aggregateDrivers, validate, regionalIndex, CRITERIA } from './engine.js';
import { buildDrivers } from './calibrate.js';
import { validate as validateSnapshot, REGION_IDS } from '../js/data.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);
const RECALC_WEEKS = ['2026-08-30', '2026-09-06', '2026-09-13'];
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

// Числовая часть global.js: index/delta — из расчёта, служебные строки —
// как были (published/through/methodology/dataState не меняются).
export function renderGlobal(week, snap, index, delta) {
  return (
    header(week) +
    `  s.global = ${j({ index, delta })};\n` +
    `  s.published = ${JSON.stringify(snap.published)};\n` +
    `  s.through = ${JSON.stringify(snap.through)};\n` +
    `  s.methodology = ${JSON.stringify(snap.methodology)};\n` +
    `  s.dataState = ${JSON.stringify(snap.dataState)};\n` +
    FOOTER
  );
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

  // Слепые регионы (nReg = 0 → I_region = I_global, background, §7) — через
  // engine.regionalIndex, даже в этом вырожденном случае; в res.regions —
  // проекция в форму снапшота {index, delta, status}.
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
  // цепочки заменяются новыми опубликованными значениями, старше — как были.
  const prevTrend = loadSnapshotPart(week, 'trend');
  const trend = (prevTrend ? prevTrend.trend : []).map((p) => {
    if (!RECALC_SET.has(p.date)) return { date: p.date, value: p.value };
    // точка текущей недели берётся из её расчёта; точки ранних недель
    // цепочки — из уже посчитанных значений (state.recalcIndex).
    const v = p.date === week ? g.index : state.recalcIndex[p.date];
    return typeof v === 'number' ? { date: p.date, value: v } : { date: p.date, value: p.value };
  });

  return {
    week,
    errors: [],
    global: g,
    regions,
    trend,
    sbLeft,
    sbReason,
    coverage: {
      criteria: Object.values(input.criteria || {}).filter((c) => c && c.covered === true).length,
      totalCriteria: Object.keys(CRITERIA).length,
      drivers: drivers.filter((d) => typeof d.score === 'number').length,
    },
  };
}

// --- Запись числовых файлов недели ---
// Самопроверка ДО записи: снапшот собирается в памяти (числа из расчёта,
// защищённые поля — из уже опубликованных файлов) и гоняется через контракт
// validate из js/data.js; при провале диск не трогаем.
function writeWeek(res, state) {
  const week = res.week;
  const snap = loadSnapshotPart(week, 'global') || {};

  const full = { ...snap, global: { index: res.global.index, delta: res.global.delta } };
  full.trend = res.trend;
  full.regions = {};
  for (const id of REGION_IDS) {
    const prev = loadSnapshotPart(week, `region-${id}`);
    full.regions[id] = mergedRegion(
      prev && prev.regions ? prev.regions[id] : {},
      res.regions[id].index, res.regions[id].delta, res.regions[id].status,
    );
  }
  for (const f of ['drivers', 'sources']) {
    const p = loadSnapshotPart(week, f);
    if (p) Object.assign(full, { [f]: p[f] });
  }
  const v = validateSnapshot(full);
  if (!v.ok) return { ok: false, errors: v.errors };

  const files = {
    'global.js': renderGlobal(week, snap, res.global.index, res.global.delta),
    'regions.js': renderRegions(week, res.regions),
    'trend.js': renderTrend(week, res.trend),
  };
  for (const id of REGION_IDS) {
    const prev = loadSnapshotPart(week, `region-${id}`);
    files[`region-${id}.js`] = renderRegionFile(
      week, id, prev ? prev.regions[id] : {}, res.regions[id].index, res.regions[id].delta, res.regions[id].status,
    );
  }
  for (const [file, content] of Object.entries(files)) {
    writeFileSync(path.join(ROOT, 'data', week, file), content, 'utf8');
  }
  return { ok: true };
}

// --- Печать ---
function printWeek(res, writeMode) {
  const lines = [];
  if (res.errors && res.errors.length) {
    lines.push(`=== ${res.week} === ОШИБКА`);
    for (const e of res.errors) lines.push(`  ${e}`);
    return lines;
  }
  const g = res.global;
  lines.push(`=== ${res.week} ===`);
  lines.push(
    `index: ${g.index}  state: ${g.state}  delta: ${g.delta >= 0 ? '+' : ''}${g.delta}` +
    ` (к опубликованному ${res.prevPublished} недели ${res.prevWeek})`,
  );
  lines.push(`internal: ${g.internal.toFixed(3)}  q: ${g.q.toFixed(3)}  ` +
    `покрытие: критериев ${res.coverage.criteria}/${res.coverage.totalCriteria}, драйверов ${res.coverage.drivers}/9`);
  lines.push(`structuralBreak: ${g.structuralBreak.active ? `АКТИВЕН (${g.structuralBreak.reason})` : 'нет'}`);
  lines.push('regions (слепые, nReg=0 → background, I_region = I_global, без зеркалирования):');
  for (const [id, r] of Object.entries(res.regions)) {
    lines.push(`  ${id}: ${r.index} (${r.status}, Δ ${r.delta >= 0 ? '+' : ''}${r.delta})`);
  }
  const replaced = res.trend.filter((p) => RECALC_SET.has(p.date)).length;
  lines.push(`trend: ${res.trend.length} точек, заменено ${replaced}, последняя ${res.trend[res.trend.length - 1].date} = ${res.trend[res.trend.length - 1].value}`);
  lines.push(writeMode ? 'write: записано' : 'write: нет (только печать)');
  return lines;
}

// --- CLI ---
function main() {
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
    if (writeMode && targets.includes(week)) {
      const check = writeWeek(res, state);
      if (!check.ok) {
        failed = true;
        out.push(`  ЗАПИСЬ ОТКЛОНЕНА контрактом data.js: ${check.errors.join('; ')}`);
      }
    }
    if (targets.includes(week)) out.push(...printWeek(res, writeMode));
    // Продвижение цепочки: следующая неделя стартует от этого расчёта.
    state.prevInternal = res.global.internal;
    state.prevPublished = res.global.index;
    state.prevWeek = week;
    state.recalcIndex[week] = res.global.index;
    for (const id of REGION_IDS) state.prevRegions[id] = res.regions[id].index;
    state.sbLeft = res.sbLeft;
    state.sbReason = res.sbReason;
  }
  process.stdout.write(out.join('\n') + '\n');
  process.exitCode = failed ? 1 : 0;
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
