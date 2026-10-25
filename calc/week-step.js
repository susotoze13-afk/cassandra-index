// week-step.js — общий чистый шаг недели цепочки (D03, ревью F1):
// маппинг входа → драйверы → агрегация с инерцией и Structural Break Override →
// региональные сигналы → классификация публикации. Один шов для штатного
// прогона (calc/calc.js --write) и для in-memory прогона severity-калибровки
// (calc/calibrate.js) — цикл недели не копируется.
// Здесь же живут швы состояния цепочки (classifyPublication, nextChainState) и
// чтение снапшотов с диска (loadSnapshotPart), которые нужны шагу и его
// вызывающим; calc.js реэкспортирует их для обратной совместимости тестов.
// Чистые функции: ни записи на диск, ни сети, ни linkcheck-ворот.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

import { PARAMS } from './params.js';
import { buildDrivers, aggregateDrivers, regionalIndex, regionalSignals } from './engine.js';
import { regionIdsFor } from '../js/data.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);

// Версия таксономии регионов недели (ADR 0028): неделя ≥ PARAMS.taxonomyV2From
// считается набором '2.0' (двенадцать регионов), иначе '1.0' (шесть).
// Версионируется отдельно от methodology — глобальный ряд тренда непрерывен.
export function taxonomyForWeek(week) {
  return week >= PARAMS.taxonomyV2From ? '2.0' : '1.0';
}

// --- Чтение файлов снапшота data/<week>/<file>.js через vm (без DOM) ---
// Возвращает объект снапшота так, как его видит сайт в window.CI_DATA.
// root — шов тестов на временном дереве (по умолчанию корень репозитория).
export function loadSnapshotPart(week, file, root = ROOT) {
  const f = path.join(root, 'data', week, `${file}.js`);
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
    for (const id of regionIdsFor(taxonomyForWeek(res.week))) next.prevRegions[id] = res.regions[id].index;
  }
  next.sbLeft = res.sbLeft;
  next.sbReason = res.sbReason;
  return next;
}

// --- Шаг одной недели цепочки (общий для calc.js и calibrate.js) ---
// input — вход недели (calc/input/<week>.json), state — состояние цикла
// {prevInternal, prevPublished, prevRegions, sbLeft, sbReason}, params — снапшот
// параметров (калибровка передаёт свой набор severity, штатный прогон — PARAMS).
// Возвращает {week, drivers, ctx, global, classification, regions, sbLeft,
// sbReason}: ctx — контекст агрегации (нужен sensitivityScore недели), regions —
// проекция региональной модели в форму снапшота {index, delta, status,
// background}. Регион с сигналами считается по ним (nReg > 0, background:false),
// без сигналов — «слепой» веткой (nReg = 0, background:true), сохраняющей
// последнее региональное отклонение от глобального фона (prevRegions против
// prevPublished прошлой недели). Персистентность Structural Break Override
// (§5.4, 2 недели) ведётся здесь же.
// opts.regionCriteria — карта критериев для региональных сигналов, если она
// отличается от input.criteria (страновой слой недели расширяет атрибуцию
// регионов, ADR 0068). Глобальный расчёт всегда идёт по input.
export function computeWeek(input, state = {}, params = PARAMS, opts = {}) {
  const week = input.week;
  const st = state || {};
  const regionIds = regionIdsFor(taxonomyForWeek(week));
  const regionCriteria = opts && opts.regionCriteria ? opts.regionCriteria : input.criteria;

  const drivers = buildDrivers(input, params);
  const ctx = {
    prevInternal: st.prevInternal,
    prevPublished: st.prevPublished,
    structuralBreak:
      st.sbLeft > 0 ? { active: true, reason: st.sbReason } : null,
  };
  const g = aggregateDrivers(drivers, params, ctx);
  const classification = classifyPublication(g, drivers, params);

  const prevRegions = st.prevRegions;
  const signals = regionalSignals(regionCriteria, regionIds, params, week);
  const regions = {};
  for (const id of regionIds) {
    const r = regionalIndex(
      { index: g.index, internal: g.internal, delta: g.delta },
      {
        ...(signals[id] || { nReg: 0 }),
        prevIndex: prevRegions[id],
        prevGlobal: st.prevPublished,
      },
      params,
    );
    regions[id] = { index: r.index, delta: r.delta, status: r.state, background: r.background };
  }

  const sb = g.structuralBreak;
  const sbLeft = sb.active ? (params.structuralBreak.weeks || 2) : Math.max(0, (st.sbLeft || 0) - 1);
  const sbReason = sb.active ? sb.reason : st.sbReason;

  return { week, drivers, ctx, global: g, classification, regions, sbLeft, sbReason };
}
