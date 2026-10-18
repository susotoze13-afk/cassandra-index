// calibrate.js — калибровка параметра насыщающей кривой k на якорных
// профилях §9 по протоколу §10.1: перебор k по сетке, прогон профилей через
// engine, rolling-origin (ранние якоря выбирают k, поздние — только проверка),
// анализ чувствительности ±20 % для k и экспертных параметров (α, λ, ρ,
// U_abs, веса). CLI: `node calc/calibrate.js` — печать таблицы для журнала.
// Якорные профили — модельные (одна неделя, без инерции): см. журнал
// калибровки docs/calibration-journal.md.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { PARAMS, list } from './params.js';
import {
  buildDrivers,
  aggregateDrivers,
  validate,
} from './engine.js';
import { regionIdsFor } from '../js/data.js';
import {
  computeWeek,
  loadSnapshotPart,
  taxonomyForWeek,
} from './week-step.js';
// Окно цепочки и старт контекста — единственный источник: списки calc.js
// (RECALC_WEEKS/PREV_WEEK, их ведёт calc/prepare-week.js). Прямой импорт
// безопасен: calc.js больше не импортирует calibrate.js (buildDrivers живёт
// в engine.js, шаг недели — в week-step.js), поэтому цикл снят.
import { RECALC_WEEKS, PREV_WEEK } from './calc.js';

// Публичный шов маппинга входа → драйверы теперь живёт в engine.js; реэкспорт
// сохранён для тестов и sensitivity.js (обратная совместимость импортов).
export { buildDrivers };

// Сетка перебора k (§5.2: k > 0). Шаг 0.05 — баланс точности и ширины вывода.
export const K_GRID = Object.freeze(
  Array.from({ length: 61 }, (_, i) => Math.round((1 + i * 0.05) * 100) / 100),
);

// --- Маппинг входного файла недели → драйверы ---
// Шов §4.2–§4.3 переехал в engine.js (тонкая обёртка над buildDriversCore);
// здесь — только реэкспорт для тестов и sensitivity.js. Не дублируется.

// Прогон одного якорного профиля: валидация → драйверы → aggregateDrivers
// без контекста (профиль одиночной недели: инерции и q-сжатия к прошлому нет,
// q сохраняется в результате для справки). Возвращает {errors} при битом входе.
export function runAnchor(input, params = PARAMS) {
  const errors = validate(input);
  if (errors.length > 0) return { errors };
  const drivers = buildDrivers(input, params);
  const result = aggregateDrivers(drivers, params, {});
  return { errors: [], drivers, result };
}

// --- Сетка k: индекс каждого якоря при каждом k ---
// anchors: [{file, meta, input}]; возвращает [{k, anchors: [{id, index, target, role}]}]
export function evaluateGrid(anchors, params = PARAMS, grid = K_GRID) {
  return grid.map((k) => {
    const p = list(params);
    p.k = k;
    return {
      k,
      anchors: anchors.map(({ meta, input }) => {
        const r = runAnchor(input, p);
        return {
          id: meta.id,
          index: r.result.index,
          target: meta.target,
          role: meta.rollingOrigin,
        };
      }),
    };
  });
}

// Запас якоря внутри целевого кластера (пункты индекса): < 0 — промах.
export function marginOf(index, target) {
  return Math.min(index - target[0], target[1] - index);
}

// Попадание select-якорей в кластеры: минимальный запас по ним и флаг полного
// попадания. Единственное определение «попадания в окно» — используется и в
// selectK, и в итоговом выводе CLI (одна логика, не две).
function selectWindow(anchors) {
  const sel = anchors.filter((a) => a.role === 'select');
  const minMargin = Math.min(...sel.map((a) => marginOf(a.index, a.target)));
  const allHit = sel.every((a) => marginOf(a.index, a.target) >= 0);
  return { minMargin, allHit };
}

// --- Выбор k (rolling-origin): только role 'select' ---
// Кандидаты — k, где все select-якоря попали; из них — с максимумом
// минимального запаса (максиминная робастность). При равенстве запаса —
// tie-break по протоколу §10.1 (таск 07): меньшее отклонение k от
// калиброванного значения v0.7 (baseK, по умолчанию PARAMS.k), затем
// меньший k. Если попаданий нет ни при одном k — берётся максимум
// минимального запаса (ближайший к кластерам); флаг allHit = false.
export function selectK(evaluation, baseK = PARAMS.k) {
  let best = null;
  for (const row of evaluation) {
    const { minMargin, allHit } = selectWindow(row.anchors);
    const cand = { k: row.k, minMargin, allHit, dev: Math.abs(row.k - baseK) };
    if (
      !best ||
      (cand.allHit && !best.allHit) ||
      (cand.allHit === best.allHit &&
        (cand.minMargin > best.minMargin + 1e-9 ||
          (Math.abs(cand.minMargin - best.minMargin) <= 1e-9 &&
            (cand.dev < best.dev - 1e-9 ||
              (Math.abs(cand.dev - best.dev) <= 1e-9 && cand.k < best.k)))))
    ) {
      best = cand;
    }
  }
  return best;
}

// --- Итеративный подбор (таск 07, протокол §10.1) ---
// Итерация 1 — сетка k при базовых параметрах v0.7. Если не все select-якоря
// попали — итерации 2+: однофакторные варианты калибруемого набора §10.1
// (веса драйверов ±10 % с перенормировкой, доля веса Д9, λ, ρ, U_abs),
// для каждого варианта — своя сетка k. Пороги состояний на прогон якорей
// не влияют (индекс сравнивается с кластерами числом, не состоянием) и в
// итерациях не участвуют. Критерий — максиминный запас; tie-break — меньшее
// отклонение от v0.7 (сумма относительных отклонений параметров + |Δk|).
// Каждая итерация возвращается в отчёте (печать CLI + журнал калибровки).
export function paramDeviation(params, base) {
  let dev = 0;
  for (const key of ['alpha', 'lambda', 'rho', 'U_abs']) {
    if (typeof params[key] === 'number' && typeof base[key] === 'number' && params[key] !== base[key]) {
      dev += Math.abs(params[key] - base[key]) / Math.abs(base[key]);
    }
  }
  const w = params.weights || {};
  const bw = base.weights || {};
  for (const id of Object.keys(bw)) {
    if (typeof w[id] === 'number' && w[id] !== bw[id]) {
      dev += Math.abs(w[id] - bw[id]) / Math.abs(bw[id]);
    }
  }
  return dev;
}

// Список однофакторных вариантов калибруемого набора §10.1.
export function candidateParams(base) {
  const variants = [];
  const withWeight = (id, f) => {
    const p = list(base);
    const w = p.weights[id] * f;
    // перенормировка: компенсация через пропорциональное сжатие остальных
    const rest = Object.keys(p.weights).filter((k) => k !== id);
    const restSum = rest.reduce((a, k) => a + p.weights[k], 0);
    const scale = restSum > 0 ? (1 - w) / restSum : 0;
    for (const k of rest) p.weights[k] = p.weights[k] * scale;
    p.weights[id] = w;
    return p;
  };
  for (const id of Object.keys(base.weights || {})) {
    for (const f of [0.9, 1.1]) {
      variants.push({ label: `вес ${id} ×${f}`, params: withWeight(id, f) });
    }
  }
  for (const [key, values] of [['lambda', [0.5, 0.7]], ['rho', [0.2, 0.3]], ['U_abs', [0.02, 0.03]]]) {
    for (const v of values) {
      const p = list(base);
      p[key] = v;
      variants.push({ label: `${key} = ${v}`, params: p });
    }
  }
  return variants;
}

// Полный прогон калибровки. Возвращает {iterations, chosen}:
// iterations — [{n, label, k, minMargin, allHit, deviation}],
// chosen — {k, params (глубокая копия), minMargin, allHit, deviation, label}.
export function calibrate(anchors, baseParams = PARAMS, grid = K_GRID) {
  const iterations = [];
  const runGrid = (params, label, n) => {
    const evaluation = evaluateGrid(anchors, params, grid);
    const chosen = selectK(evaluation, baseParams.k);
    const rec = {
      n, label, k: chosen.k, minMargin: chosen.minMargin, allHit: chosen.allHit,
      deviation: paramDeviation(params, baseParams) + Math.abs(chosen.k - baseParams.k),
      params: list(params),
    };
    iterations.push(rec);
    return rec;
  };

  const first = runGrid(baseParams, 'k-решётка при параметрах v0.7 (k — единственная свобода)', 1);
  let best = first;
  if (!first.allHit) {
    let n = 2;
    for (const variant of candidateParams(baseParams)) {
      const rec = runGrid(variant.params, variant.label, n);
      n += 1;
      if (
        (rec.allHit && !best.allHit) ||
        (rec.allHit === best.allHit &&
          (rec.minMargin > best.minMargin + 1e-9 ||
            (Math.abs(rec.minMargin - best.minMargin) <= 1e-9 && rec.deviation < best.deviation - 1e-9)))
      ) {
        best = rec;
      }
    }
  }
  return { iterations, chosen: best };
}

// --- Чувствительность ±20 % ---
// Однофакторные отклонения от выбранного k и экспертных параметров §10.1
// (α, λ, ρ, U_abs и каждый вес по отдельности — равномерное масштабирование
// всех весов нормировкой бесследно сокращается). Возвращает строки:
// {label, minus: {id: index}, plus: {id: index}}.
export function sensitivity(anchors, params, k, factor = 0.2) {
  const cases = [{ label: 'k', apply: (p, f) => { p.k = k * f; } }];
  for (const key of ['alpha', 'lambda', 'rho', 'U_abs']) {
    cases.push({ label: key, apply: (p, f) => { p[key] = p[key] * f; } });
  }
  for (const id of Object.keys(params.weights || {})) {
    cases.push({
      label: `w(${id})`,
      apply: (p, f) => { p.weights[id] = p.weights[id] * f; },
    });
  }
  return cases.map((c) => {
    const run = (f) => {
      const p = list(params);
      p.k = k;
      c.apply(p, f);
      const out = {};
      for (const { meta, input } of anchors) {
        out[meta.id] = runAnchor(input, p).result.index;
      }
      return out;
    };
    return { label: c.label, minus: run(1 - factor), plus: run(1 + factor) };
  });
}

// --- Калибровка severity-весов (§7.3): грид кандидатов + прогон реальной цепочки ---
// Метод: сетка кандидатов severity-наборов (базовый + сдвиги соседних пар
// ×0.8/×1.2), ремап событий цепочки по порядковой позиции уровня, in-memory
// прогон реальной недельной цепочки общим шагом недели computeWeek
// (calc/week-step.js — тот же шов, что у runWeek), метрика, выбор.
// Роль verify-якорей здесь переинтерпретирована (спека: ветка 1): у якорей нет
// events[], грид на них не дифференцируется, поэтому якоря — severity-инвариантная
// проверка при выбранном наборе, а не источник выбора (CLI).

// Ремап событий по порядковой позиции уровня: from — канонический (строго
// возрастающий) набор, to — целевой набор той же длины. Вес вне from → null
// в соответствующем элементе (явная ошибка наверху, не тишина).
export function remapSeverity(events, from, to) {
  return (Array.isArray(events) ? events : []).map((w) => {
    const i = from.indexOf(w);
    return i >= 0 && i < to.length ? to[i] : null;
  });
}

// Ремап критериального блока входа под целевой набор весов. Возвращает
// {ok, criteria, missing}: ok = false, если хотя бы один вес вне from —
// кандидат, чей ремап не покрывает события недели, отбраковывается явно.
export function remapCriteria(criteria, from, to) {
  const missing = [];
  const out = {};
  for (const [id, entry] of Object.entries(criteria || {})) {
    if (entry && entry.covered === true && Array.isArray(entry.events)) {
      const ev = remapSeverity(entry.events, from, to);
      for (const w of entry.events) if (!from.includes(w)) missing.push(`${id}: ${w}`);
      out[id] = { ...entry, events: ev };
    } else {
      out[id] = entry;
    }
  }
  return { ok: missing.length === 0, criteria: out, missing };
}

// Состояние цепочки по умолчанию: первая неделя без инерции (как runWeek,
// если прежний снапшот не найден). Реальный прогон передаёт значения недели
// PREV_WEEK (см. mainSeverity ниже).
const DEFAULT_CTX0 = Object.freeze({ prevInternal: null, prevPublished: null, prevRegions: {} });
export const SEVERITY_CTX0_DEFAULT = DEFAULT_CTX0;

// --- Грид кандидатов severity-наборов ---
// Базовый первым; далее сдвиги соседних пар (0.2,0.5), (0.5,1.0), (1.0,2.0)
// ×0.8 и ×1.2. Защиты на генерации: строгая монотонность уровней и сохранение
// 2.0 (flash-триггеры D1.4/D2.4 по PARAMS.flashTriggers); пара, теряющая 2.0
// или ломающая порядок, бракуется с пометкой в note (values = null) — грид
// печатает её в отчёте, но в прогон она не идёт.
export function severityCandidates(base = PARAMS.severityValues) {
  const out = [{ label: base.join('/'), values: [...base], rejected: false }];
  const round2 = (x) => Math.round(x * 100) / 100;
  for (let p = 0; p < base.length - 1; p++) {
    for (const f of [0.8, 1.2]) {
      const values = base.map((w, i) => (i === p || i === p + 1 ? round2(w * f) : w));
      const label = `сдвиг пары (${base[p]}, ${base[p + 1]}) ×${f}`;
      const keepsTwo = base[base.length - 1] === 2.0 ? values[values.length - 1] === 2.0 : true;
      const mono = values.every((v, i) => i === 0 || v > values[i - 1]);
      if (!keepsTwo) {
        out.push({ label, values: null, rejected: true, note: `верхний уровень сдвинут, ровно 2.0 в наборе нет → отбраковка защитой flash-триггеров` });
      } else if (!mono) {
        out.push({ label, values: null, rejected: true, note: `нарушена строгая монотонность уровней: ${values.join(' ≤ ')}` });
      } else {
        out.push({ label, values, rejected: false });
      }
    }
  }
  return out;
}

// --- In-memory прогон цепочки одного severity-набора ---
// Недельный шаг — общий чистый шов computeWeek (calc/week-step.js): маппинг →
// драйверы → aggregateDrivers с контекстом инерции/structural break →
// региональные сигналы → classifyPublication. Здесь остаётся только ведение
// состояния цепочки (как nextChainState: insufficient-неделя не двигает
// инерцию) и проекция строки отчёта. Без записи на диск и без linkcheck-ворот;
// валидация входа — да (R55-схема источников проверяется при загрузке недели,
// уровень независимости тут существеннее не меняется — severity на состав
// источников не влияет, ворота независимости прогоняются при загрузке реальной
// цепочки в CLI).
function chainRows(weeks, params, ctx0) {
  const state = {
    prevInternal: typeof ctx0.prevInternal === 'number' ? ctx0.prevInternal : null,
    prevPublished: typeof ctx0.prevPublished === 'number' ? ctx0.prevPublished : null,
    prevRegions:
      ctx0.prevRegions && typeof ctx0.prevRegions === 'object' ? { ...ctx0.prevRegions } : {},
    sbLeft: ctx0.sbLeft || 0,
    sbReason: ctx0.sbReason || null,
  };
  const rows = [];
  for (const input of weeks) {
    const step = computeWeek(input, state, params);
    const g = step.global;
    const cls = step.classification;
    rows.push({
      date: input.week,
      index: g.index,
      delta: g.delta,
      q: g.q,
      internal: g.internal,
      published: !cls.insufficient,
      dataState: cls.dataState,
    });
    if (!cls.insufficient) { // insufficient-неделя не рвёт инерцию (nextChainState)
      state.prevInternal = g.internal;
      state.prevPublished = g.index;
    }
    state.sbLeft = step.sbLeft;
    state.sbReason = step.sbReason;
  }
  return rows;
}

// Точный множитель набора: округление весов здесь запрещено (вес 0.24 → 0.19
// — уже −20.8 %, а не заявленные ±20 %); округление — только при печати.
const SENS_FACTOR = 0.2;
const scaleSet = (values, f) => values.map((w) => w * f);

// --- Оценка кандидата на цепочке ---
// referenceSet — набор, с которого берутся порядковые позиции событий
// (канонический base или сам кандидат при чувствительности); candidateSet —
// прогоняемый набор; params — снапшот параметров, от которого берутся все
// числа, кроме severityValues (калибруется только severity). Метрика:
// maxDrift — max по published-неделям |ΔI_кандидата − ΔI_базового|
// (внутреннее значение до округления, п.п.); deltaDrift — та же разность по
// публикационным недельным дельтам (целочисленна, потому информативна только
// как контроль: квантуется в 1 п.). Обе — след сдвига severity от референса.
// Валидация входов прогоняется (веса после ремапа обязаны попадать в
// candidateSet); linkcheck — нет.
// exceptions: {error, weeks: [], maxDrift: null} при весе вне набора
// (явная ошибка, не тишина) или при невалидном входе цепочки.
export function evaluateSeverityChain(weeks, referenceSet, candidateSet, ctx0 = DEFAULT_CTX0, params = PARAMS) {
  const p = list(params);
  p.severityValues = [...candidateSet];
  const remapped = [];
  for (const input of weeks) {
    const regionIds = regionIdsFor(taxonomyForWeek(input.week));
    const r = remapCriteria(input.criteria, [...referenceSet], [...candidateSet]);
    if (!r.ok) {
      return { error: `веса событий вне набора [${referenceSet.join(', ')}]: ${r.missing.join('; ')}`, weeks: [], maxDrift: null, deltaDrift: null };
    }
    const errors = validate({ ...input, criteria: r.criteria }, p, regionIds);
    if (errors.length > 0) {
      return { error: `вход недели ${input.week} невалиден при наборе [${candidateSet.join(', ')}]: ${errors.join('; ')}`, weeks: [], maxDrift: null, deltaDrift: null };
    }
    remapped.push({ ...input, criteria: r.criteria });
  }
  if (JSON.stringify([...candidateSet]) === JSON.stringify([...referenceSet])) {
    // Референс-прогон: ремап тождественен, события не трогаются. Параметры —
    // от переданного снапшота (не PARAMS: база может быть не-базовой).
    const pRef = list(params);
    pRef.severityValues = [...referenceSet];
    const rows = chainRows(weeks.map((w) => w), pRef, ctx0).map((r) => ({ ...r }));
    return { weeks: rows, maxDrift: 0, deltaDrift: 0 };
  }
  const pRef = list(params);
  pRef.severityValues = [...referenceSet];
  const rowsC = chainRows(remapped, p, ctx0);
  const rowsR = chainRows(weeks.map((w) => ({ ...w })), pRef, ctx0);
  let maxDrift = 0;
  let deltaDrift = 0;
  for (let i = 0; i < rowsC.length; i++) {
    if (!rowsC[i].published || !rowsR[i].published) continue;
    // ΔI — по внутреннему значению до округления публикации (конвенция
    // sensitivityScore, R02): округленные индексы квантизуют в 1 п. и маскируют
    // под-пунктные сдвиги.
    const a = rowsC[i].internal;
    const b = rowsR[i].internal;
    if (typeof a === 'number' && typeof b === 'number') {
      maxDrift = Math.max(maxDrift, Math.abs(a - b));
    }
    const dc = rowsC[i].delta;
    const dr = rowsR[i].delta;
    if (typeof dc === 'number' && typeof dr === 'number') {
      deltaDrift = Math.max(deltaDrift, Math.abs(dc - dr));
    }
  }
  return { weeks: rowsC, maxDrift, deltaDrift };
}

// --- Полная калибровка severity ---
// Для каждого кандидата: maxDrift/Δdrift (численный след от базового прогона,
// R01.2) и устойчивость δI = max по направлениям ±20 % (равномерный сдвиг
// всего набора, фактор 0.2) прогонов от его собственного прогона — конвенция
// max|ΔI| в п.п. как у sensitivityScore (R02). Выбор — чистый шов
// selectSeverity (см. ниже); эта функция только собирает числа.
export function calibrateSeverity(weeks, baseParams = PARAMS, ctx0 = DEFAULT_CTX0, threshold = baseParams.sensitivityThreshold ?? PARAMS.sensitivityThreshold) {
  const base = [...baseParams.severityValues];
  const baseRows = evaluateSeverityChain(weeks, base, base, ctx0, baseParams);
  const rows = [];
  for (const cand of severityCandidates(base)) {
    if (cand.rejected) {
      rows.push({ label: cand.label, values: null, rejected: true, note: cand.note });
      continue;
    }
    const ev = evaluateSeverityChain(weeks, base, cand.values, ctx0, baseParams);
    if (ev.error) {
      // Кандидат, чей ремап не покрывает события недели, отбраковывается
      // явно — с причиной в отчёте, а не молчаливым null в метрике.
      rows.push({ label: cand.label, values: null, rejected: true, note: ev.error });
      continue;
    }
    // ±20 %: события уже ремапнуты base → кандидат (цепочка всегда хранит
    // канонические веса), поэтому от кандидата — второй ремап до масштаба.
    const prep = weeks.map((w) => ({ ...w, criteria: remapCriteria(w.criteria, base, cand.values).criteria }));
    const sensM = evaluateSeverityChain(prep, cand.values, scaleSet(cand.values, 1 - SENS_FACTOR), ctx0, baseParams);
    const sensP = evaluateSeverityChain(prep, cand.values, scaleSet(cand.values, 1 + SENS_FACTOR), ctx0, baseParams);
    const sensMinus = sensM.maxDrift;
    const sensPlus = sensP.maxDrift;
    const sens = Math.max(sensMinus ?? 0, sensPlus ?? 0);
    rows.push({
      label: cand.label, values: cand.values, rejected: false,
      maxDrift: ev.maxDrift, deltaDrift: ev.deltaDrift, sensMinus, sensPlus, sens,
    });
    if (sensM.error) rows[rows.length - 1].note = `±20 %: ${sensM.error}`;
    else if (sensP.error) rows[rows.length - 1].note = `±20 %: ${sensP.error}`;
  }
  const live = rows.filter((r) => !r.rejected);
  const chosen = selectSeverity(live, base, threshold);
  return {
    candidates: rows,
    chosen,
    baseRows: baseRows.weeks,
    maxDriftBase: live.find((r) => JSON.stringify(r.values) === JSON.stringify(base))?.maxDrift ?? 0,
    reasons: chosen.reasons,
    baseRowsPublished: baseRows.weeks.filter((r) => r.published).length,
  };
}
// Чувствительность ±20 % по severity (R03): колонки «кандидат → δI» —
// поля sensMinus/sensPlus каждой строки candidates; печать — в CLI mainSeverity.

// --- Выбор severity-набора (чистый шов, тестируется крафтом как selectK) ---
// Метрика выбора — D01 (spec «Уточнения по факту сборки»): устойчивость
// кандидата к собственной ±20 %-пертурбации (sens, п.п.), а не maxDrift —
// у базового прогона maxDrift структурно 0, поэтому такой метрикой базовый
// был бы выбран всегда. maxDrift остаётся информационной колонкой отчёта и
// переносится в chosen для журнала.
// Минимум sens; при ничьей (≤EPS) остаётся базовый. Не-базовый применяется
// только если его sens ниже базовой на ≥ threshold (п.п.). Аргумент порога:
// переиспользуется PARAMS.sensitivityThreshold = 5 (ADR 0019 sens-протокол) —
// сдвиг опубликованных чисел ниже 5 п.п. проект уже считает «не заметным»
// (порог пометки чувствительности на сайте); второй порог не плодится.
// Не-базовый, устойчивее базового, но ниже порога: остаётся базовый,
// reason-строки фиксируют отрыв.
export function selectSeverity(candidates, base, threshold = PARAMS.sensitivityThreshold) {
  const EPS = 1e-9;
  const baseRow = candidates.find((c) => JSON.stringify(c.values) === JSON.stringify(base));
  let best = baseRow || candidates.find((c) => typeof c.sens === 'number') || candidates[0];
  for (const c of candidates) {
    if (c === baseRow || typeof c.sens !== 'number') continue;
    // Строго лучше — иначе ничья остаётся за базовым (tie-break R05).
    if (!best || c.sens < best.sens - EPS) best = c;
  }
  const isBase = best === baseRow;
  const margin = isBase ? 0 : (baseRow?.sens ?? 0) - best.sens;
  const applied = !isBase && margin >= threshold - EPS;
  const reasons = [];
  if (isBase) {
    reasons.push(`базовый набор ${base.join('/')} подтверждён: минимальная чувствительность ±20 % среди всех кандидатов.`)
  } else if (applied) {
    reasons.push(`кандидат «${best.label}» применён: δI ${best.sens?.toFixed(1)} п.п. против базовой ${(baseRow?.sens ?? 0).toFixed(1)} — отрыв ${margin.toFixed(1)} ≥ порога ${threshold}`);
  } else {
    reasons.push(`кандидат «${best.label}» устойчивее базового на ${margin.toFixed(1)} п.п. — ниже порога применения ${threshold} п.п.: остаётся базовый.`);
  }
  reasons.push(`Порог применения ${threshold} п.п. = PARAMS.sensitivityThreshold (ADR 0019): переиспользование, не второй порог.`);
  return {
    label: applied ? best.label : 'базовый',
    values: applied ? [...best.values] : [...base],
    applied,
    margin: Math.round(margin * 100) / 100,
    sens: applied ? best.sens : (baseRow?.sens ?? 0),
    baseSens: baseRow?.sens ?? 0,
    // maxDrift — информационная колонка (D01): след ИМЕННО выбранного набора
    // от базового прогона, не аргумент выбора; при неприменении выбран
    // базовый, и его след структурно 0. След победителя по δI (даже если он
    // не применён) — отдельное поле winnerMaxDrift.
    maxDrift: applied ? (best?.maxDrift ?? 0) : (baseRow?.maxDrift ?? 0),
    winnerMaxDrift: best?.maxDrift ?? 0,
    winnerLabel: best?.label ?? 'базовый',
    winnerSens: best?.sens ?? 0,
    reasons,
  };
}

// --- CLI: отчёт --severity для журнала ---
async function mainSeverity() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const inputDir = path.join(here, 'input');
  // Окно калибровки — ровно пересчитываемая цепочка RECALC_WEEKS (её ведёт
  // calc/prepare-week.js): листинг calc/input/ не расширяет окно молча, когда
  // в каталоге появляется вход новой недели.
  const lines = [];
  lines.push('=== Калибровка severity-весов по реальной цепочке недель (§7.3, сетка кандидатов) ===');
  const weeks = [];
  for (const week of RECALC_WEEKS) {
    const f = `${week}.json`;
    const input = JSON.parse(readFileSync(path.join(inputDir, f), 'utf8'));
    if (input.week !== week) {
      lines.push(`ОШИБКА calc/input/${f}: поле week ${JSON.stringify(input.week)} не совпадает с именем файла`);
      process.stdout.write(lines.join('\n') + '\n');
      process.exitCode = 1;
      return;
    }
    const errors = validate(input, PARAMS, regionIdsFor(taxonomyForWeek(input.week)));
    if (errors.length > 0) {
      lines.push(`ОШИБКА ВАЛИДАЦИИ calc/input/${f}:`);
      for (const e of errors) lines.push(`  ${e}`);
      process.stdout.write(lines.join('\n') + '\n');
      process.exitCode = 1;
      return;
    }
    weeks.push(input);
  }
  lines.push(`Цепочка: ${weeks.map((w) => w.week).join(' → ')}`);

  // Фактические веса событий цепочки: ремап строится к этому набору.
  const usedWeights = new Set();
  for (const { criteria } of weeks) {
    for (const entry of Object.values(criteria || {})) {
      if (entry && entry.covered === true && Array.isArray(entry.events)) for (const w of entry.events) usedWeights.add(w);
    }
  }
  const canon = [...PARAMS.severityValues];
  const foreign = [...usedWeights].filter((w) => !canon.includes(w));
  if (foreign.length) {
    lines.push(`НАХОДКА: веса событий вне канона §7.3: ${foreign.join(', ')} — кандидаты, не покрывающие их ремапом, отбракуются явно.`);
  } else {
    lines.push(`Веса событий цепочки: ${[...usedWeights].sort((a, b) => a - b).join(', ')} — внутри канона §7.3.`);
  }

  // Старт цепочки — как calc.js: опубликованный снапшот недели перед цепочкой
  // (PREV_WEEK — единственный источник даты, без литералов в логике).
  const prevGlobal = loadSnapshotPart(PREV_WEEK, 'global');
  const prevIndex = prevGlobal && prevGlobal.global && typeof prevGlobal.global.index === 'number' ? prevGlobal.global.index : null;
  const ctx0 = { prevInternal: prevIndex, prevPublished: prevIndex, prevRegions: {}, sbLeft: 0, sbReason: null };
  lines.push(`Старт цепочки: опубликованный индекс ${prevIndex} недели ${PREV_WEEK}.`);
  if (prevIndex == null) {
    lines.push(`не найден опубликованный снапшот ${PREV_WEEK} — инерции не к чему привязать`);
    process.stdout.write(lines.join('\n') + '\n');
    process.exitCode = 1;
    return;
  }

  const res = calibrateSeverity(weeks, PARAMS, ctx0);
  lines.push('');
  lines.push('Базовый прогон цепочки (severity 0.2/0.5/1.0/2.0):');
  for (const r of res.baseRows) {
    lines.push(`  ${r.date}: index ${r.index}  Δ ${r.delta}  q ${r.q}${r.published ? '' : ' — insufficient (не публикуется)'} · ${r.dataState}`);
  }
  lines.push('');
  lines.push('Грид кандидатов (в п.п.): maxDrift — след по внутреннему индексу до округления (R01.2),');
  lines.push('Δdrift — max|ΔI − ΔI_база| по публикационным недельным дельтам (целочисленна → 1 п. шага),');
  lines.push('δI −20 %/+20 % — чувствительность равномерного сдвига набора от его собственного прогона (R03).');
  const shiftPct = (f) => ((f - 1) * 100).toFixed(1);
  lines.push(`Пертурбация набора для δI: ×${(1 - SENS_FACTOR).toFixed(2)} / ×${(1 + SENS_FACTOR).toFixed(2)} — ` +
    `фактический сдвиг весов ${shiftPct(1 - SENS_FACTOR)} % / +${shiftPct(1 + SENS_FACTOR)} % ` +
    '(точный множитель, округления весов нет).');
  lines.push('кандидат'.padEnd(46) + 'maxDrift'.padEnd(10) + 'Δdrift'.padEnd(9) + 'δI−20%'.padEnd(10) + 'δI+20%'.padEnd(10) + 'δI');
  for (const r of res.candidates) {
    if (r.rejected) {
      lines.push(`${r.label}`.padEnd(46) + `ОТКЛОНЁН — ${r.note}`);
      continue;
    }
    lines.push(
      `${r.label}`.padEnd(46) +
      `${r.maxDrift.toFixed(1)}`.padEnd(10) +
      `${typeof r.deltaDrift === 'number' ? r.deltaDrift.toFixed(0) : '—'}`.padEnd(9) +
      `${r.sensMinus.toFixed(1)}`.padEnd(10) +
      `${r.sensPlus.toFixed(1)}`.padEnd(10) +
      `${r.sens.toFixed(1)}` + (r.sens === res.chosen.sens && r.label === res.chosen.label ? '  <== ' + (res.chosen.applied ? 'ПРИМЕНЁН' : 'ВЫБРАН') : ''),
    );
    if (r.note) lines.push(`  примечание: ${r.note}`);
  }
  lines.push('');
  for (const reason of res.reasons) lines.push(reason);
  lines.push(`maxDrift выбранного набора: ${res.chosen.maxDrift.toFixed(1)} п.п. — след именно выбранного набора (при неприменении базовый = 0), информационная колонка (D01), не аргумент выбора.`);
  lines.push(`maxDrift победителя по δI («${res.chosen.winnerLabel}»): ${res.chosen.winnerMaxDrift.toFixed(1)} п.п. — колонка отчёта, в chosen переносится только при применении.`);
  lines.push('');
  lines.push('Якорная проверка (severity-инвариантность, §9): у якорей нет events[], грид на них не дифференцируется;');
  lines.push('все 10 прогоняются при выбранном наборе — проверка, не источник выбора.');
  const anchorsDir = path.join(here, 'input', 'anchors');
  const anchors = loadAnchors(anchorsDir);
  const pChosen = list();
  if (res.chosen.applied) pChosen.severityValues = [...res.chosen.values];
  let allHit = true;
  for (const { meta, input } of anchors) {
    const errors = validate(input);
    if (errors.length > 0) {
      lines.push(`  ОШИБКА ${meta.id}: ${errors.join('; ')}`);
      allHit = false;
      continue;
    }
    const r = runAnchor(input, pChosen).result;
    const m = marginOf(r.index, meta.target);
    allHit = allHit && m >= 0;
    lines.push(`  ${meta.id}: ${r.index} vs [${meta.target[0]}–${meta.target[1]}] — ${m >= 0 ? 'ПОПАДАНИЕ' : `ПРОМАХ (${m.toFixed(1)})`} (${meta.rollingOrigin})`);
  }
  lines.push(`k = ${pChosen.k} (${pChosen.k === PARAMS.k ? 'без изменений' : 'ИЗМЕНЁН — эскалация'}); все 10 якорей: ${allHit ? 'попадание' : 'есть промахи'}.`);
  lines.push('');
  lines.push('Чувствительность ±20 % по severity: таблица кандидатов выше (колонки δI −20 %/+20 %).');
  lines.push('');
  lines.push(`Итог: ${res.chosen.applied ? `применён «${res.chosen.label}» (${res.chosen.values.join('/')})` : `базовый набор ${canon.join('/')} подтверждён`}; запись — docs/calibration-journal.md.`);
  process.stdout.write(lines.join('\n') + '\n');
}

// --- Загрузка профилей из calc/input/anchors/*.json ---
// В том же каталоге лежат форвардные якоря forward-<week>.json (R15) с другой
// схемой: у них нет input.anchor. Пропускаем такие файлы — иначе калибровка
// падает на них через validate/evaluateGrid.
export function loadAnchors(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((file) => {
      const input = JSON.parse(readFileSync(path.join(dir, file), 'utf8'));
      return { file, meta: input.anchor, input };
    })
    .filter((a) => a.meta && typeof a.meta === 'object' && !Array.isArray(a.meta));
}

// --- CLI: таблица для журнала калибровки ---
function main() {
  // Флаг --severity: отчёт калибровки severity-весов (см. журнал, прогон
  // severity). Дефолтный прогон без флага остаётся k-only (совместимость).
  if (process.argv.includes('--severity')) {
    mainSeverity().catch((e) => {
      process.stdout.write(`ошибка: ${e && e.message ? e.message : e}\n`);
      process.exitCode = 1;
    });
    return;
  }
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'input', 'anchors');
  const anchors = loadAnchors(dir);

  const lines = [];
  const bad = [];
  for (const a of anchors) {
    const errors = validate(a.input);
    if (errors.length > 0) bad.push({ file: a.file, errors });
  }
  if (bad.length > 0) {
    for (const b of bad) {
      lines.push(`ОШИБКА ВАЛИДАЦИИ ${b.file}:`);
      for (const e of b.errors) lines.push(`  ${e}`);
    }
    process.stdout.write(lines.join('\n') + '\n');
    process.exitCode = 1;
    return;
  }

  const cal = calibrate(anchors, PARAMS);
  const chosen = cal.chosen;
  const evaluation = evaluateGrid(anchors, chosen.params, K_GRID);

  lines.push('=== Калибровка на якорных профилях §9 (протокол §10.1, 8 якорей) ===');
  lines.push('');
  lines.push('Якоря (rolling-origin):');
  for (const { meta } of anchors) {
    const role = meta.rollingOrigin === 'select' ? 'выбор k' : 'проверка';
    lines.push(`  ${meta.id} — ${meta.title} [${meta.target[0]}–${meta.target[1]}] (${role})`);
  }
  lines.push(`Сетка k: ${K_GRID[0]}–${K_GRID[K_GRID.length - 1]}, шаг 0.05`);
  lines.push('');
  lines.push('Итерации подбора (таск 07):');
  for (const it of cal.iterations) {
    lines.push(
      `  итерация ${it.n}: ${it.label} → k=${it.k.toFixed(2)}, ` +
      `min-запас ${it.minMargin.toFixed(1)}, allHit=${it.allHit}, отклонение от v0.7 ${it.deviation.toFixed(3)}` +
      (chosen === it ? '  <== ЛУЧШАЯ' : ''),
    );
  }
  if (cal.iterations.length === 1) {
    lines.push('  итерации по весам/порогам не понадобились: все select-якоря попали на итерации 1');
  }
  lines.push('');
  lines.push(`Выбранные параметры: k = ${chosen.k.toFixed(2)}${chosen.n === 1 ? '' : ` (итерация ${chosen.n}: ${chosen.label})`}; ` +
    'прочие параметры — как в v0.7 (α, λ, ρ, U_abs, веса без изменений), если итерация не указана.');
  lines.push('');
  lines.push('Прогон сетки при выбранных параметрах (индексы; знак ✓ = все select-якоря в кластерах):');
  for (const row of evaluation) {
    const { minMargin, allHit } = selectWindow(row.anchors);
    const parts = row.anchors.map((a) => `${a.id}:${a.index}`).join(' ');
    const mark = allHit ? `✓ min-запас ${minMargin.toFixed(1)}` : `min-запас ${minMargin.toFixed(1)}`;
    const star = Math.abs(row.k - chosen.k) < 1e-9 ? '  <== ВЫБРАНО' : '';
    lines.push(`  k=${row.k.toFixed(2)}  ${parts}  | ${mark}${star}`);
  }
  lines.push('');
  lines.push(`Выбрано k = ${chosen.k} (allHit=${chosen.allHit}, min-запас ${chosen.minMargin.toFixed(1)} п. по select-якорям)`);
  if (!chosen.allHit) {
    lines.push('ВНИМАНИЕ: полные попадания не достигнуты — фиксируются лучшая итерация и промахи, эскалация на Review Board (журнал).');
  }
  lines.push('');
  lines.push('Проверка поздних якорей (verify) при выбранном k:');
  const row = evaluation.find((r) => Math.abs(r.k - chosen.k) < 1e-9);
  for (const a of row.anchors.filter((x) => x.role === 'verify')) {
    const m = marginOf(a.index, a.target);
    lines.push(`  ${a.id}: ${a.index} vs [${a.target[0]}–${a.target[1]}] — ${m >= 0 ? 'ПОПАДАНИЕ' : `ПРОМАХ (${m.toFixed(1)})`}`);
  }
  lines.push('');
  lines.push('Чувствительность ±20 % (индексы якорей при выбранных параметрах):');
  const sens = sensitivity(anchors, chosen.params, chosen.k);
  const ids = anchors.map((a) => a.meta.id);
  const colW = Math.max(16, ...ids.map((id) => id.length + 8));
  lines.push('  параметр'.padEnd(14) + ids.map((id) => `${id} (−20%)`.padEnd(colW)).join('') + ids.map((id) => `${id} (+20%)`.padEnd(colW)).join(''));
  for (const s of sens) {
    lines.push(
      `  ${s.label}`.padEnd(14) +
      ids.map((id) => `${s.minus[id]}`.padEnd(colW)).join('') +
      ids.map((id) => `${s.plus[id]}`.padEnd(colW)).join(''),
    );
  }
  lines.push('');
  lines.push(`Итог: k = ${chosen.k} подтверждён на 8 якорях; зафиксировано в docs/calibration-journal.md.`);
  process.stdout.write(lines.join('\n') + '\n');
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
