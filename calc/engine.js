// engine.js — формулы методологии: скор драйвера (§4.2), короборация Д9 (§4.3),
// глобальная агрегация (§5, шаги 1–8), инерция и Structural Break Override (§5.4),
// региональная модель отклонения (§7). Чистые функции, ноль зависимостей.
// Округление — только на выходе (Math.round, половины вверх); внутренние
// float-значения сохраняются для инерции следующей недели (§5.4).
// Численные значения по умолчанию берутся из calc/params.js (§10.1) —
// params.js — единственный источник чисел; engine только подставляет их,
// когда вызывающий не передал params явно.

import { PARAMS } from './params.js';

const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));

// Округление только при публикации (§5.4) — до целых, половины вверх.
function roundHalfUp(x) {
  return Math.round(x);
}

// --- §9: маппинг индекса в состояние (пороги из params.states) ---
export function stateOf(index, params) {
  const states = (params && params.states) || null;
  if (!states) return null;
  if (typeof index !== 'number' || !Number.isFinite(index)) return null;
  const hit = states.find((s) => index >= s.min && index <= s.max);
  return hit ? hit.id : null;
}

// --- §4.2: скор драйвера ---
// criteria: массив {dir: 'esc'|'deesc', value: 0..1, covered: bool}.
// Возвращает sᵢ ∈ [0,1] или null (доля покрытых критериев < coverageThreshold
// или ни один критерий не покрыт). Непокрытый критерий исключается из
// нормировки, а не засчитывается как ноль.
export function driverScore(criteria, alpha = PARAMS.alpha, coverageThreshold = PARAMS.coverageThreshold) {
  const list = Array.isArray(criteria) ? criteria : [];
  const total = list.length;
  if (total === 0) return null;
  const covered = list.filter((c) => c && c.covered === true);
  if (covered.length / total < coverageThreshold) return null;
  const esc = covered.filter((c) => c.dir === 'esc');
  const deesc = covered.filter((c) => c.dir === 'deesc');
  const sum = (arr) => arr.reduce((acc, c) => acc + (Number(c.value) || 0), 0);
  const nE = esc.length;   // N_E,i — максимум по покрытым эск. критериям
  const nB = deesc.length; // N_B,i — по покрытым деэск. критериям
  // Защита от деления на ноль (v0.7): отсутствующий член равен 0.
  const eTerm = nE > 0 ? sum(esc) / nE : 0;
  const bTerm = nB > 0 ? alpha * (sum(deesc) / nB) : 0;
  return clamp(eTerm - bTerm, 0, 1);
}

// --- §4.2: драйвер Д8 — сила деэскалации d₈ ---
// criteria: массив {value: 0..1, covered: bool} (все критерии Д8 деэскалационные,
// включая Д8.4 из независимого счётчика интенсивности).
// d₈ = clamp(E₈/N₈_cov, 0, 1); null при покрытии ниже порога (N₈_cov = 0
// тогда же: 0 покрытых из N ≥ 1 всегда ниже положительного порога).
export function d8Strength(criteria, coverageThreshold = PARAMS.coverageThreshold) {
  const list = Array.isArray(criteria) ? criteria : [];
  const total = list.length;
  if (total === 0) return null;
  const covered = list.filter((c) => c && c.covered === true);
  if (covered.length / total < coverageThreshold) return null;
  const mean = covered.reduce((acc, c) => acc + (Number(c.value) || 0), 0) / covered.length;
  return clamp(mean, 0, 1);
}

// --- §4.3: драйвер Д9 — иерархическая агрегация с короборацией ---
// subgroups: массив {id, score: null|0..1, acyclic?: bool, rejected?: bool}.
// corr_g (§4.3.2): 1.0 — подтверждено ≥ 2 другими сигналящими подгруппами
// (для Д9.6b достаточно 1); 0.5 — одна соседняя (частичное подтверждение);
// 0.0 — ациклические без ≥ 3 подгрупп или отклонённая по независимости.
// Открытое место методологии: единственная изолированная циклическая
// подгруппа получает 0.5 (половинный вес), по аналогии с частичным
// подтверждением — таск 03 калибровки может пересмотреть.
export const D9_SUBGROUPS = ['D9.1', 'D9.2', 'D9.3', 'D9.4', 'D9.5', 'D9.6a', 'D9.6b', 'D9.7'];

export function aggregateD9(subgroups, params) {
  const p = params || {};
  const list = (Array.isArray(subgroups) ? subgroups : []).filter(
    (s) => s && D9_SUBGROUPS.includes(s.id),
  );
  if (list.length === 0) return { score: null, signaling: 0, corr: {} };
  const covered = list.filter((s) => typeof s.score === 'number' && Number.isFinite(s.score));
  // Порог покрытия 50 % (§4.2) здесь не применяем: подгруппы Д9 — композитные
  // критерии (§4.3.8), а короборация (§4.3.2) по построению работает на кластерах
  // из 1–3 подгрупп. Покрытие Д9 отражается через уверенность драйвера (§5.1).
  if (covered.length === 0) {
    return { score: null, signaling: 0, corr: {} };
  }
  const signaling = covered.filter((s) => s.score > 0 && !s.rejected);
  const corr = {};
  for (const s of covered) {
    if (s.rejected) {
      corr[s.id] = 0;
      continue;
    }
    if (s.score <= 0) {
      corr[s.id] = 1; // нулевой сигнал не требует короборации
      continue;
    }
    const others = signaling.filter((o) => o.id !== s.id).length;
    if (s.id === 'D9.6b') {
      // Пониженный порог (§4.3.2): достаточно 1 другой сигналящей подгруппы.
      // Одиночная Д9.6b (others === 0 → signaling.length === 1) → 0.
      corr[s.id] = others >= 1 ? 1 : 0;
      continue;
    }
    if (s.acyclic) {
      // ациклические: без подтверждения минимум 3 подгруппами — 0
      corr[s.id] = signaling.length >= 3 ? 1 : 0;
      continue;
    }
    corr[s.id] = others >= 2 ? 1 : 0.5;
  }
  const w = 1 / covered.length; // равные веса подгрупп, нормировка по покрытым
  let s9 = 0;
  for (const s of covered) s9 += w * s.score * corr[s.id];
  const nSignaling = covered.filter((s) => s.score * corr[s.id] > 0).length;
  return { score: clamp(s9, 0, 1), signaling: nSignaling, corr };
}

// --- §7.3: нормировка счётного критерия ---
// entry: {value} (старые входы) или {events: [sev…]}, sev ∈ params.severityValues.
// value = min(1, Σsev/CAP); CAP — params.capCount. Чистая нормировка: вход
// считается уже провалидированным (validate режет события вне severityValues).
export function normalizeCriterion(entry, params) {
  const p = params || {};
  const cap = p.capCount != null ? p.capCount : PARAMS.capCount;
  if (entry && Array.isArray(entry.events)) {
    const total = entry.events.reduce((acc, sev) => acc + (Number(sev) || 0), 0);
    return Math.min(1, total / cap);
  }
  const v = Number(entry && entry.value);
  return Number.isFinite(v) ? v : 0;
}

// --- R16–R19: детектор Flash-триггеров ---
// criteria: объект входа {id: entry|null}. Триггер — событие severity 2.0
// (params.flashTriggers.severity) по Д1.4/Д2.4 (params.flashTriggers.criteria)
// или value = 1 по Д7.3 (бинарный критерий, событий не несёт). Возвращает bool;
// снапшот не меняется — запись в журнал делает вызывающий (calc-cli, таск 02).
export function detectFlashTriggers(criteria, params) {
  const p = params || {};
  const ft = p.flashTriggers || PARAMS.flashTriggers;
  const map = criteria && typeof criteria === 'object' && !Array.isArray(criteria) ? criteria : {};
  for (const id of ft.criteria) {
    const entry = map[id];
    if (!entry || entry.covered !== true || !Array.isArray(entry.events)) continue;
    if (entry.events.includes(ft.severity)) return true;
  }
  const d7 = map['D7.3'];
  return !!d7 && d7.covered === true && d7.value === ft.d7Value;
}

// --- §5.4: асимметричная инерция и Structural Break Override ---
// tilde — Ĩ после q-сжатия; prev — внутреннее значение прошлой недели.
export function applyInertia(tilde, prev, opts) {
  const o = opts || {};
  const betaUp = o.betaUp != null ? o.betaUp : PARAMS.betaUp;
  const betaDown = o.betaDown != null ? o.betaDown : PARAMS.betaDown;
  if (tilde > prev) return betaUp * tilde + (1 - betaUp) * prev;
  if (o.overrideActive) {
    const sb = o.structuralBreak || PARAMS.structuralBreak;
    return sb.beta * tilde + sb.prev * prev;
  }
  return betaDown * tilde + (1 - betaDown) * prev;
}

// --- §5.4: детекция триггера Structural Break Override ---
// Триггер: Д8.2 на максимальной шкале (порядковая 3 → нормированное 1) с высокой
// уверенностью (подписан всеобъемлющий мирный договор по верифицируемой схеме).
// Персистентность (2 недели) — состояние недельного цикла; calc.js несёт её
// в context.structuralBreak, engine только применяет и фиксирует причину.
export function detectStructuralBreak(drivers, params) {
  const p = params || {};
  const d8 = (Array.isArray(drivers) ? drivers : []).find((d) => d && d.id === 'D8');
  const maxConf = p.confidence ? p.confidence.high : PARAMS.confidence.high;
  const active = !!d8 && d8.breakValue === 1 && (p.confidence || {})[d8.confidence] === maxConf;
  return {
    active,
    reason: active
      ? 'Structural Break Override: Д8.2 на максимальной шкале с высокой уверенностью (подписан мирный договор по верифицируемой схеме)'
      : null,
  };
}

// --- §5: глобальная агрегация, шаги 1–8 ---
// drivers: массив {id: 'D1'..'D9', score: null|0..1, confidence: 'high'|'medium'|'low',
//   signalingSubgroups (Д9), breakValue (Д8 — нормированное значение Д8.2)}.
// Д8.score — это d₈ (сила деэскалации); Д8 не входит в нормировку эск. весов.
// context: {prevInternal, prevPublished, structuralBreak: {active, reason}|null}.
// Возвращает {index, state, delta, internal, q, parts, structuralBreak}.
export function aggregateDrivers(drivers, params, context) {
  const p = params || {};
  const ctx = context || {};
  const w = p.weights || {};
  const confMap = p.confidence || PARAMS.confidence;
  const byId = {};
  for (const d of Array.isArray(drivers) ? drivers : []) if (d && d.id) byId[d.id] = d;
  const confOf = (d) => confMap[d.confidence] != null ? confMap[d.confidence] : confMap.medium;
  const covered = (id) => {
    const d = byId[id];
    return d && typeof d.score === 'number' && Number.isFinite(d.score) ? d : null;
  };

  // Шаг 2: нормировка эскалационных весов ОТДЕЛЬНО от Д8: E = {Д1..Д7, Д9}.
  const E = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D9'].filter((id) => w[id] != null);
  let denom = 0;
  for (const id of E) {
    const d = covered(id);
    if (d) denom += w[id] * confOf(d);
  }
  const wp = {};
  for (const id of E) {
    const d = covered(id);
    wp[id] = d && denom > 0 ? (w[id] * confOf(d)) / denom : 0;
  }

  // Шаг 3: S по прямым эскалационным (без Д9), потолок Д9 (§4.3.5).
  let S = 0;
  for (const id of E) {
    if (id === 'D9') continue;
    const d = covered(id);
    if (d) S += wp[id] * d.score;
  }
  const d9 = covered('D9');
  const U_raw = d9 ? wp.D9 * d9.score : 0;
  // U_abs применяется только при ≥ 2 сигналящих подгруппах Д9 (v0.7).
  const nSub = d9 && d9.signalingSubgroups != null ? d9.signalingSubgroups : 0;
  const U_abs = nSub >= 2 ? (p.U_abs != null ? p.U_abs : PARAMS.U_abs) : 0;
  const rho = p.rho != null ? p.rho : PARAMS.rho;
  const U = Math.min(U_raw, (rho / (1 - rho)) * S + U_abs);

  // Шаг 4: сырой скор; d₈ = null → член равен 0.
  const d8 = covered('D8');
  const lambda = p.lambda != null ? p.lambda : PARAMS.lambda;
  const I_agg = Math.max(0, S + U - lambda * (w.D8 || 0) * (d8 ? d8.score : 0));

  // Шаг 5: глобальный коэффициент покрытия q по всем 9 драйверам.
  let qNum = 0;
  let qDen = 0;
  for (const id of Object.keys(w)) {
    const d = byId[id];
    const c = d ? confOf(d) : confMap.medium;
    qDen += w[id] * c;
    if (covered(id)) qNum += w[id] * c;
  }
  const q = qDen > 0 ? qNum / qDen : 0;

  // Шаг 6: насыщающая кривая (§5.2).
  const k = p.k != null ? p.k : PARAMS.k;
  const curve = (x) => 100 * (1 - Math.exp(-k * x)) / (1 - Math.exp(-k));
  let I_new = curve(I_agg);

  // §4.3.4: лимит прироста 30 % — вклад Д9 в недельный прирост (до инерции).
  const I_new0 = curve(Math.max(0, I_agg - U));
  const prevRef = typeof ctx.prevInternal === 'number' ? ctx.prevInternal : I_new0;
  const growthLimit = (p.d9GrowthLimit != null ? p.d9GrowthLimit : PARAMS.d9GrowthLimit) * (100 - prevRef);
  if (I_new - I_new0 > growthLimit) {
    // Закрытая форма: ищем I_agg', где curve равна I_new0 + limit, вычитаем без-Д9 базу.
    const target = I_new0 + growthLimit;
    const x = -Math.log(1 - ((1 - Math.exp(-k)) * target) / 100) / k;
    const base = Math.max(0, I_agg - U);
    I_new = curve(base + Math.max(0, x - base));
  }

  // Шаг 7: q-сжатие к предыдущему внутреннему значению (§5.3).
  const prevInternal = typeof ctx.prevInternal === 'number' ? ctx.prevInternal : null;
  const tilde = prevInternal != null ? q * I_new + (1 - q) * prevInternal : I_new;

  // Шаг 8: асимметричная инерция + Structural Break Override (§5.4).
  const detected = detectStructuralBreak(drivers, p);
  // Явный override из контекста (персистентность 2 недели) имеет приоритет —
  // он может и активировать, и деактивировать; без контекста — детекция по Д8.2.
  const sb = ctx.structuralBreak
    ? {
        active: !!ctx.structuralBreak.active,
        reason: ctx.structuralBreak.active
          ? (ctx.structuralBreak.reason || detected.reason)
          : null,
      }
    : detected;
  const internal = prevInternal != null
    ? applyInertia(tilde, prevInternal, {
        betaUp: p.betaUp, betaDown: p.betaDown,
        overrideActive: sb.active, structuralBreak: p.structuralBreak,
      })
    : tilde;

  const index = roundHalfUp(internal);
  const prevPublished = typeof ctx.prevPublished === 'number' ? ctx.prevPublished : null;
  return {
    index,
    state: stateOf(index, p),
    delta: prevPublished != null ? index - prevPublished : null,
    internal,
    q,
    parts: { S, U, U_raw, I_agg, I_new, I_new0, tilde },
    structuralBreak: sb,
  };
}

// --- §7: региональная модель отклонения ---
// global: {index, internal, delta} — результат aggregateDrivers.
// region: {iWith, iWithout — внутренние значения гипотетических прогонов §5
//   по сигналам региона и без них; nReg — число независимых региональных
//   сигналов за окно; eStruct, eDyn ∈ [0,1]; hasDeescSignals: bool;
//   prevIndex — опубликованный региональный индекс прошлой недели (для Δ)}.
// Слепой регион (nReg = 0) → I_region = I_global, background = true
// (статус «глобальный фон», §7/§11).
export function regionalIndex(global, region, params) {
  const p = params || {};
  const g = global || {};
  const r = region || {};
  const gInternal = typeof g.internal === 'number' ? g.internal : g.index;
  const gIndex = typeof g.index === 'number' ? g.index : roundHalfUp(gInternal);
  const nReg = typeof r.nReg === 'number' ? r.nReg : 0;
  if (nReg <= 0) {
    const prevIndex = typeof r.prevIndex === 'number' ? r.prevIndex : null;
    return {
      index: gIndex,
      state: stateOf(gIndex, p),
      delta: prevIndex != null ? gIndex - prevIndex : (typeof g.delta === 'number' ? g.delta : null),
      internal: gInternal,
      background: true,
      mirrored: false,
    };
  }
  const gamma = p.gamma != null ? p.gamma : PARAMS.gamma;
  const e_r = gamma * (r.eStruct || 0) + (1 - gamma) * (r.eDyn || 0);
  const n0 = p.n0 != null ? p.n0 : PARAMS.n0;
  const m = nReg / (nReg + n0);
  const clampR = p.regionClamp != null ? p.regionClamp : PARAMS.regionClamp;
  const deltaRegion = clamp((r.iWith != null ? r.iWith : gInternal) - (r.iWithout != null ? r.iWithout : gInternal), -clampR, clampR);
  let internal = gInternal + e_r * m * deltaRegion;
  // Зеркалирование глобального шока, взвешенное по структурной экспозиции (§7).
  const gDelta = typeof g.delta === 'number' ? g.delta : 0;
  const threshold = p.regionShockDelta != null ? p.regionShockDelta : PARAMS.regionShockDelta;
  let mirrored = false;
  if (gDelta >= threshold && !r.hasDeescSignals) {
    const kappa = p.kappa != null ? p.kappa : PARAMS.kappa;
    const floor = kappa * (r.eStruct || 0) * gInternal;
    if (internal < floor) {
      internal = floor;
      mirrored = true;
    }
  }
  const index = roundHalfUp(internal);
  const prevIndex = typeof r.prevIndex === 'number' ? r.prevIndex : null;
  return {
    index,
    state: stateOf(index, p),
    delta: prevIndex != null ? index - prevIndex : null,
    internal,
    background: false,
    mirrored,
  };
}

// --- Валидация входного файла недели (calc/input/<неделя>.json) ---
// Контракт для тасок 02/03. validate(input) -> массив строк ошибок с путями
// полей; [] = вход валиден. Битый вход не считается (R01.2).

export const CRITERIA = {
  'D1.1': { driver: 'D1', dir: 'esc', scale: 'count' },
  'D1.2': { driver: 'D1', dir: 'esc', scale: 'ordinal' },
  'D1.3': { driver: 'D1', dir: 'esc', scale: 'ordinal' },
  'D1.4': { driver: 'D1', dir: 'esc', scale: 'count' },
  'D1.5': { driver: 'D1', dir: 'esc', scale: 'ordinal' },
  'D1.6': { driver: 'D1', dir: 'deesc', scale: 'ordinal' },
  'D2.1': { driver: 'D2', dir: 'esc', scale: 'ordinal' },
  'D2.2': { driver: 'D2', dir: 'esc', scale: 'binary' },
  'D2.3': { driver: 'D2', dir: 'esc', scale: 'count' },
  'D2.4': { driver: 'D2', dir: 'esc', scale: 'binary' },
  'D2.5': { driver: 'D2', dir: 'deesc', scale: 'binary' },
  'D3.1': { driver: 'D3', dir: 'esc', scale: 'count' },
  'D3.2': { driver: 'D3', dir: 'esc', scale: 'ordinal' },
  'D3.3': { driver: 'D3', dir: 'esc', scale: 'count' },
  'D3.4': { driver: 'D3', dir: 'deesc', scale: 'ordinal' },
  'D3.5': { driver: 'D3', dir: 'deesc', scale: 'count' },
  'D4.1': { driver: 'D4', dir: 'esc', scale: 'count' },
  'D4.2': { driver: 'D4', dir: 'esc', scale: 'ordinal' },
  'D4.3': { driver: 'D4', dir: 'esc', scale: 'ordinal' },
  'D4.4': { driver: 'D4', dir: 'esc', scale: 'count' },
  'D4.5': { driver: 'D4', dir: 'deesc', scale: 'count' },
  'D5.1': { driver: 'D5', dir: 'esc', scale: 'ordinal' },
  'D5.2': { driver: 'D5', dir: 'esc', scale: 'count' },
  'D5.3': { driver: 'D5', dir: 'esc', scale: 'ordinal' },
  'D5.4': { driver: 'D5', dir: 'deesc', scale: 'ordinal' },
  'D6.1': { driver: 'D6', dir: 'esc', scale: 'ordinal' },
  'D6.2': { driver: 'D6', dir: 'esc', scale: 'ordinal' },
  'D6.3': { driver: 'D6', dir: 'esc', scale: 'binary' },
  'D6.4': { driver: 'D6', dir: 'deesc', scale: 'binary' },
  'D7.1': { driver: 'D7', dir: 'esc', scale: 'count' },
  'D7.2': { driver: 'D7', dir: 'esc', scale: 'count' },
  'D7.3': { driver: 'D7', dir: 'esc', scale: 'binary' },
  'D7.4': { driver: 'D7', dir: 'deesc', scale: 'ordinal' },
  'D8.1': { driver: 'D8', dir: 'deesc', scale: 'binary' },
  'D8.2': { driver: 'D8', dir: 'deesc', scale: 'ordinal' },
  'D8.3': { driver: 'D8', dir: 'deesc', scale: 'ordinal' },
  'D8.4': { driver: 'D8', dir: 'deesc', scale: 'ordinal' },
  'D9.1': { driver: 'D9', dir: 'esc', scale: 'ordinal' },
  'D9.2': { driver: 'D9', dir: 'esc', scale: 'ordinal' },
  'D9.3': { driver: 'D9', dir: 'esc', scale: 'ordinal' },
  'D9.4': { driver: 'D9', dir: 'esc', scale: 'ordinal' },
  'D9.5': { driver: 'D9', dir: 'esc', scale: 'ordinal' },
  'D9.6a': { driver: 'D9', dir: 'esc', scale: 'ordinal' },
  'D9.6b': { driver: 'D9', dir: 'esc', scale: 'ordinal' },
  'D9.7': { driver: 'D9', dir: 'deesc', scale: 'ordinal' },
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const CONFIDENCE_LEVELS = ['high', 'medium', 'low'];
const DRIVER_IDS = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'];
const SOURCE_TYPES = ['primary', 'secondary', 'OSINT'];

// Форма входного файла (схему фиксирует таск 01, v0.7):
// {
//   week: 'YYYY-MM-DD',                  // дата окна (понедельник)
//   params?: 'calc/params.js',           // ссылка на снапшот параметров
//   criteria: { 'D1.1': null | {        // null = непокрыт
//     value: 0..1,                       // нормированный сигнал (бинарная 0/1,
//                                        // порядковая 0/0.33/0.67/1) — обязателен
//                                        // для не-счётных шкал
//     events?: number[],                 // счётная шкала (§7.3): вместо value,
//                                        // sev ∈ params.severityValues, длина
//                                        // ≤ capCount·2; вклад = min(1, Σsev/CAP)
//     covered: true,
//     sources: [{ url, date,             // обязательные поля источника
//       cluster,                         // id из params.clusters (whitelist A–F)
//       type?: 'primary'|'secondary'|'OSINT',
//       state_affiliated?: bool }],      // опциональные поля источника
//     regions?: string[],                // региональная атрибуция (§4.1.9)
//     acyclic?: bool,                    // ациклический подкритерий Д9 (§4.3.3)
//     rejected?: bool,                   // отклонён по независимости источников
//     flash_origin?: bool,               // наблюдение — источник Flash-алерта
//   } },
//   driverConfidence?: { D1: { level: 'high'|'medium'|'low', reason?: string } }
// }
export function validate(input, params) {
  const p = params || PARAMS;
  const clusters = Array.isArray(p.clusters) ? p.clusters : [];
  const severityValues = Array.isArray(p.severityValues) ? p.severityValues : [];
  const eventsMax = (typeof p.capCount === 'number' ? p.capCount : 0) * 2;
  const errors = [];
  const err = (path, msg) => errors.push(`${path}: ${msg}`);
  if (input === null || typeof input !== 'object' || Array.isArray(input)) {
    return ['корень: ожидается объект входного файла недели'];
  }
  if (typeof input.week !== 'string' || !DATE_RE.test(input.week)) {
    err('week', 'ожидается дата окна в формате YYYY-MM-DD');
  }
  if (input.params != null && typeof input.params !== 'string') {
    err('params', 'ожидается строка-путь к снапшоту параметров');
  }
  if (input.criteria === null || typeof input.criteria !== 'object' || Array.isArray(input.criteria)) {
    err('criteria', 'ожидается объект критериев');
  } else {
    for (const [id, entry] of Object.entries(input.criteria)) {
      const path = `criteria.${id}`;
      if (!CRITERIA[id]) {
        err(path, 'неизвестный критерий');
        continue;
      }
      if (entry === null) continue; // непокрытый критерий — явный null
      if (typeof entry !== 'object' || Array.isArray(entry)) {
        err(path, 'ожидается null или объект сигнала');
        continue;
      }
      if (entry.covered !== true) {
        err(path, 'непокрытый критерий должен быть null, не объектом');
        continue;
      }
      if (CRITERIA[id].scale === 'count') {
        // §7.3: счётный критерий — либо value, либо events (ровно одно).
        const hasValue = entry.value != null;
        const hasEvents = entry.events != null;
        if (hasValue && hasEvents) {
          err(path, 'счётный критерий: либо value, либо events, не оба');
        } else if (!hasValue && !hasEvents) {
          err(`${path}.value`, 'счётный критерий требует value или events (§7.3)');
        }
        if (hasValue && (typeof entry.value !== 'number' || !Number.isFinite(entry.value) || entry.value < 0 || entry.value > 1)) {
          err(`${path}.value`, 'ожидается нормированное число 0..1');
        }
        if (hasEvents) {
          if (!Array.isArray(entry.events) || entry.events.length === 0) {
            err(`${path}.events`, 'ожидается непустой массив severity-весов');
          } else {
            if (entry.events.length > eventsMax) {
              err(`${path}.events`, `не более ${eventsMax} событий (capCount·2)`);
            }
            if (entry.events.some((sev) => typeof sev !== 'number' || !severityValues.includes(sev))) {
              err(`${path}.events`, `допустимые веса: ${severityValues.join('/')} (§7.3)`);
            }
          }
        }
      } else if (typeof entry.value !== 'number' || !Number.isFinite(entry.value) || entry.value < 0 || entry.value > 1) {
        err(`${path}.value`, 'ожидается нормированное число 0..1');
      }
      if (!Array.isArray(entry.sources) || entry.sources.length === 0) {
        err(`${path}.sources`, 'покрытый критерий требует минимум 1 источник');
      } else {
        entry.sources.forEach((s, i) => {
          const sp = `${path}.sources[${i}]`;
          if (s === null || typeof s !== 'object') {
            err(sp, 'ожидается объект источника');
            return;
          }
          if (typeof s.url !== 'string' || s.url.length === 0) err(`${sp}.url`, 'ожидается непустая строка');
          if (typeof s.date !== 'string' || !DATE_RE.test(s.date)) err(`${sp}.date`, 'ожидается дата YYYY-MM-DD');
          if (typeof s.cluster !== 'string' || s.cluster.length === 0) {
            err(`${sp}.cluster`, 'ожидается кластер происхождения');
          } else if (clusters.length > 0 && !clusters.includes(s.cluster)) {
            err(`${sp}.cluster`, `кластер вне whitelist A–F: ${s.cluster}`);
          }
          if (s.type != null && !SOURCE_TYPES.includes(s.type)) {
            err(`${sp}.type`, `ожидается один из ${SOURCE_TYPES.join('/')}`);
          }
          if (s.state_affiliated != null && typeof s.state_affiliated !== 'boolean') {
            err(`${sp}.state_affiliated`, 'ожидается boolean');
          }
        });
      }
      if (entry.regions != null && (!Array.isArray(entry.regions) || entry.regions.some((r) => typeof r !== 'string' || r.length === 0))) {
        err(`${path}.regions`, 'ожидается массив непустых строк регионов');
      }
      for (const flag of ['acyclic', 'rejected', 'flash_origin']) {
        if (entry[flag] != null && typeof entry[flag] !== 'boolean') err(`${path}.${flag}`, 'ожидается boolean');
      }
    }
  }
  if (input.driverConfidence != null) {
    if (typeof input.driverConfidence !== 'object' || Array.isArray(input.driverConfidence)) {
      err('driverConfidence', 'ожидается объект {D1..D9: {level, reason?}}');
    } else {
      for (const [id, entry] of Object.entries(input.driverConfidence)) {
        const path = `driverConfidence.${id}`;
        if (!DRIVER_IDS.includes(id)) {
          err(path, 'неизвестный драйвер');
          continue;
        }
        if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) {
          err(path, 'ожидается объект {level, reason?}');
          continue;
        }
        if (!CONFIDENCE_LEVELS.includes(entry.level)) {
          err(`${path}.level`, `ожидается один из ${CONFIDENCE_LEVELS.join('/')}`);
        }
        if (id === 'D9' && entry.level === 'high') {
          err(`${path}.level`, 'Д9 не может иметь высокую уверенность без прямого подтверждения (§4.3.1)');
        }
        if (entry.reason != null && typeof entry.reason !== 'string') err(`${path}.reason`, 'ожидается строка');
      }
    }
  }
  return errors;
}

// --- R21–R23: предупреждения о независимости источников ---
// Два источника считаются независимыми только из разных кластеров (бриф;
// правило — в governance). Не ошибка пайплайна: аналитик сам помечает
// критерий rejected, движок обнуляет его короборацию (§4.3.2). Возвращает
// строки-предупреждения с путями; [] = конфликтов кластеров нет.
export function independenceWarnings(input, params) {
  const p = params || PARAMS;
  const whitelist = Array.isArray(p.clusters) ? p.clusters : [];
  const criteria = (input && input.criteria && typeof input.criteria === 'object') ? input.criteria : {};
  const warnings = [];
  for (const [id, entry] of Object.entries(criteria)) {
    if (!entry || entry.covered !== true || !Array.isArray(entry.sources)) continue;
    const byCluster = {};
    for (const s of entry.sources) {
      const c = s && s.cluster;
      if (typeof c !== 'string' || !whitelist.includes(c)) continue;
      byCluster[c] = (byCluster[c] || 0) + 1;
    }
    for (const [c, n] of Object.entries(byCluster)) {
      if (n >= 2) {
        warnings.push(`criteria.${id}.sources: ${n} источников из кластера ${c} — не считаются независимыми (§4.3.2)`);
      }
    }
  }
  return warnings;
}
