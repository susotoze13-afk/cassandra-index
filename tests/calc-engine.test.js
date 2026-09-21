import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  driverScore,
  d8Strength,
  aggregateD9,
  aggregateDrivers,
  applyInertia,
  detectStructuralBreak,
  regionalIndex,
  stateOf,
  validate,
} from '../calc/engine.js';
import { PARAMS, list } from '../calc/params.js';

// --- §4.2: скор драйвера ---

test('driverScore: чистая эскалация (все покрыты, значения 1) → 1', () => {
  const criteria = [
    { dir: 'esc', value: 1, covered: true },
    { dir: 'esc', value: 1, covered: true },
  ];
  assert.equal(driverScore(criteria, 0.5), 1);
});

test('driverScore: E/N_E − α·B/N_B = 1 − 0.5·1 = 0.5 (смешанный драйвер)', () => {
  const criteria = [
    { dir: 'esc', value: 1, covered: true },
    { dir: 'deesc', value: 1, covered: true },
  ];
  assert.equal(driverScore(criteria, 0.5), 0.5);
});

test('driverScore: отрицательный нетто-скор зажимается в 0', () => {
  const criteria = [
    { dir: 'esc', value: 0.33, covered: true },
    { dir: 'deesc', value: 1, covered: true },
    { dir: 'deesc', value: 1, covered: true },
  ];
  assert.equal(driverScore(criteria, 0.5), 0);
});

test('driverScore: нормировка только по покрытым — непокрытый не занижает скор', () => {
  // Один покрытый эск. критерий со значением 1 из двух: E/N_E = 1/1, а не 1/2.
  const criteria = [
    { dir: 'esc', value: 1, covered: true },
    { dir: 'esc', value: 1, covered: false },
  ];
  assert.equal(driverScore(criteria, 0.5), 1);
});

test('driverScore: защита от деления на ноль — нет покрытых эск. критериев → член 0, не NaN', () => {
  const criteria = [
    { dir: 'esc', value: 1, covered: false },
    { dir: 'deesc', value: 1, covered: true },
  ];
  assert.equal(driverScore(criteria, 0.5), 0);
});

test('driverScore: покрытие ниже 50 % → null (слепая зона), ровно 50 % → считается', () => {
  const low = [
    { dir: 'esc', value: 1, covered: true },
    { dir: 'esc', value: 1, covered: false },
    { dir: 'esc', value: 1, covered: false },
    { dir: 'esc', value: 1, covered: false },
  ];
  assert.equal(driverScore(low, 0.5), null);
  const half = [
    { dir: 'esc', value: 1, covered: true },
    { dir: 'esc', value: 0.5, covered: true },
    { dir: 'esc', value: 1, covered: false },
    { dir: 'esc', value: 1, covered: false },
  ];
  assert.equal(driverScore(half, 0.5), 0.75);
});

test('driverScore: N_E = N_B = 0 → null', () => {
  const criteria = [
    { dir: 'esc', value: 1, covered: false },
    { dir: 'deesc', value: 1, covered: false },
  ];
  assert.equal(driverScore(criteria, 0.5), null);
});

// --- §4.2: драйвер Д8 — сила деэскалации d₈ ---

test('d8Strength: среднее по покрытым критериям Д8', () => {
  const criteria = [
    { value: 1, covered: true },
    { value: 0.5, covered: true },
  ];
  assert.equal(d8Strength(criteria, 0.5), 0.75);
});

test('d8Strength: ни один критерий не покрыт → null', () => {
  assert.equal(d8Strength([{ value: 1, covered: false }], 0.5), null);
});

test('d8Strength: покрытие ниже порога → null', () => {
  const criteria = [
    { value: 1, covered: true },
    { value: 1, covered: false },
    { value: 1, covered: false },
    { value: 1, covered: false },
  ];
  assert.equal(d8Strength(criteria, 0.5), null);
});

// --- §4.3.2/§4.3.8: драйвер Д9 — иерархическая агрегация с короборацией ---

const SUB = (id, score, extra = {}) => ({ id, score, ...extra });
const D9_IDS = ['D9.1', 'D9.2', 'D9.3', 'D9.4', 'D9.5', 'D9.6a', 'D9.6b', 'D9.7'];
const allNull = () => D9_IDS.map((id) => SUB(id, null));

test('aggregateD9: все 8 подгрупп со скором 1, короборация полная → s₉ = 1', () => {
  const r = aggregateD9(D9_IDS.map((id) => SUB(id, 1)), PARAMS);
  assert.equal(r.score, 1);
  assert.equal(r.signaling, 8);
  for (const id of D9_IDS) assert.equal(r.corr[id], 1);
});

test('aggregateD9: изолированная циклическая подгруппа (только она) → corr 0.5', () => {
  const subs = allNull();
  subs[2] = SUB('D9.3', 1); // транспорт и страхование, одна сигналящая
  const r = aggregateD9(subs, PARAMS);
  assert.equal(r.corr['D9.3'], 0.5);
  assert.equal(r.score, 0.5);
  assert.equal(r.signaling, 1);
});

test('aggregateD9: циклическая подгруппа с одной соседней → corr 0.5', () => {
  const subs = allNull();
  subs[0] = SUB('D9.1', 1);
  subs[1] = SUB('D9.2', 1);
  const r = aggregateD9(subs, PARAMS);
  assert.equal(r.corr['D9.1'], 0.5);
  assert.equal(r.corr['D9.2'], 0.5);
  assert.equal(r.score, 0.5); // (1·0.5 + 1·0.5) / 2
});

test('aggregateD9: ≥ 2 других подтверждают → corr 1.0', () => {
  const subs = allNull();
  subs[0] = SUB('D9.1', 1);
  subs[1] = SUB('D9.2', 1);
  subs[2] = SUB('D9.3', 1);
  const r = aggregateD9(subs, PARAMS);
  assert.equal(r.corr['D9.1'], 1);
  assert.equal(r.score, 1);
});

test('aggregateD9: Д9.6b — пониженный порог, достаточно 1 другой подгруппы → corr 1.0', () => {
  const subs = allNull();
  subs[6] = SUB('D9.6b', 1, { acyclic: true });
  subs[1] = SUB('D9.2', 1);
  const r = aggregateD9(subs, PARAMS);
  assert.equal(r.corr['D9.6b'], 1);
  // Д9.2 при этом изолирована: одна соседняя → 0.5
  assert.equal(r.corr['D9.2'], 0.5);
  assert.equal(r.score, 0.75); // (1·1 + 1·0.5) / 2
  assert.equal(r.signaling, 2);
});

test('aggregateD9: ациклическая одиночная подгруппа без подтверждений → corr 0', () => {
  const subs = allNull();
  subs[6] = SUB('D9.6b', 1, { acyclic: true });
  const r = aggregateD9(subs, PARAMS);
  assert.equal(r.corr['D9.6b'], 0);
  assert.equal(r.score, 0);
  assert.equal(r.signaling, 0);
});

test('aggregateD9: ациклические сигналы без ≥ 3 подгрупп обнуляются', () => {
  // Две ациклических подгруппы: для Д9.2 (2 всего, < 3) → 0; Д9.6b — пониженный порог → 1
  const subs = allNull();
  subs[1] = SUB('D9.2', 1, { acyclic: true });
  subs[6] = SUB('D9.6b', 1, { acyclic: true });
  const r = aggregateD9(subs, PARAMS);
  assert.equal(r.corr['D9.2'], 0);
  assert.equal(r.corr['D9.6b'], 1);
  assert.equal(r.score, 0.5);
});

test('aggregateD9: три ациклических подгруппы → подтверждение ≥ 3, corr 1.0', () => {
  const subs = allNull();
  subs[1] = SUB('D9.2', 1, { acyclic: true });
  subs[3] = SUB('D9.4', 1, { acyclic: true });
  subs[6] = SUB('D9.6b', 1, { acyclic: true });
  const r = aggregateD9(subs, PARAMS);
  assert.equal(r.corr['D9.2'], 1);
  assert.equal(r.score, 1);
  assert.equal(r.signaling, 3);
});

test('aggregateD9: отклонённая по независимости источников подгруппа → corr 0 и не подтверждает других', () => {
  const subs = allNull();
  subs[0] = SUB('D9.1', 1);
  subs[1] = SUB('D9.2', 1, { rejected: true });
  subs[2] = SUB('D9.3', 1);
  const r = aggregateD9(subs, PARAMS);
  assert.equal(r.corr['D9.2'], 0);
  // Д9.1 видит только Д9.3 (Д9.2 отклонена не считается) → одна соседняя → 0.5
  assert.equal(r.corr['D9.1'], 0.5);
  assert.equal(r.corr['D9.3'], 0.5);
});

test('aggregateD9: ни одна подгруппа не покрыта → null', () => {
  const r = aggregateD9(allNull(), PARAMS);
  assert.equal(r.score, null);
  assert.equal(r.signaling, 0);
});

// (прежний тест «покрытие подгрупп ниже 50 %» удалён: порог 50 % к подгруппам
// Д9 не применяется, см. решение в engine.js — заменён тестом выше)

// --- §5: глобальная агрегация, §5.4: инерция и Structural Break Override ---

// Драйверы D1..D7 со скором 0.5 (high), D8 с d₈ = 0 (high), D9 со скором 0.5
// (medium, 2 сигналящие подгруппы). Σ(w·c) по E = 0.8645; I_agg = 0.5 ровно.
function driversA(over = {}) {
  const drivers = [];
  for (let i = 1; i <= 7; i++) drivers.push({ id: `D${i}`, score: 0.5, confidence: 'high' });
  drivers.push({ id: 'D8', score: 0, confidence: 'high', breakValue: 0 });
  drivers.push({ id: 'D9', score: 0.5, confidence: 'medium', signalingSubgroups: 2 });
  for (const d of drivers) Object.assign(d, over[d.id] || {});
  return drivers;
}

test('aggregateDrivers: базовый прогон §5 шаги 1–8 — I_agg = 0.5, индекс 72, Δ +12', () => {
  const r = aggregateDrivers(driversA(), PARAMS, { prevInternal: 60, prevPublished: 60 });
  assert.equal(r.parts.I_agg, 0.5);
  assert.equal(r.index, 72);
  assert.equal(r.state, 'very');
  assert.equal(r.delta, 12);
  assert.ok(Math.abs(r.internal - 71.79527207670044) < 1e-9); // 0.9·73.10585786… + 6
  assert.equal(r.q, 1);
});

test('aggregateDrivers: Д8 вычитается через λ·w₈, но его уверенность не входит в нормировку эск. весов', () => {
  // d₈ = 1, уверенность Д8 low (0.4): I_agg = 0.5 − 0.6·0.1175·1 = 0.4295.
  // Если бы c₈ попала в знаменатель, S и U изменились бы.
  const r = aggregateDrivers(driversA({ D8: { score: 1, confidence: 'low' } }), PARAMS,
    { prevInternal: 60, prevPublished: 60 });
  assert.ok(Math.abs(r.parts.I_agg - 0.4295) < 1e-12);
  assert.ok(Math.abs(r.parts.S - (0.8225 / 0.8645) * 0.5) < 1e-12);
  assert.ok(Math.abs(r.parts.U - (0.042 / 0.8645) * 0.5) < 1e-12);
});

test('aggregateDrivers: d₈ = null (Д8 слепой) → член деэскалации 0', () => {
  const r = aggregateDrivers(driversA({ D8: { score: null } }), PARAMS,
    { prevInternal: 60, prevPublished: 60 });
  assert.equal(r.parts.I_agg, 0.5);
});

test('aggregateDrivers: S = 0, Д9 с ≥ 2 подгруппами → потолок U_abs = 0.025', () => {
  const drivers = driversA();
  for (const d of drivers) if (d.id !== 'D9') d.score = 0;
  drivers.find((d) => d.id === 'D9').score = 1;
  const r = aggregateDrivers(drivers, PARAMS, { prevInternal: 60, prevPublished: 60 });
  assert.equal(r.parts.S, 0);
  assert.equal(r.parts.U, 0.025);
  assert.equal(r.parts.I_agg, 0.025);
});

test('aggregateDrivers: S = 0, одна изолированная подгруппа Д9 → вклад 0 (анти-фантомное напряжение)', () => {
  const drivers = driversA();
  for (const d of drivers) if (d.id !== 'D9') d.score = 0;
  const d9 = drivers.find((d) => d.id === 'D9');
  d9.score = 1;
  d9.signalingSubgroups = 1;
  const r = aggregateDrivers(drivers, PARAMS, { prevInternal: 60, prevPublished: 60 });
  assert.equal(r.parts.U, 0);
  assert.equal(r.parts.I_agg, 0);
  // снижение к предыдущему: 0.5·0 + 0.5·60 = 30
  assert.equal(r.internal, 30);
  assert.equal(r.index, 30);
  assert.equal(r.delta, -30);
});

test('aggregateDrivers: потолок ρ/(1−ρ)·S + U_abs обрезает U_raw', () => {
  const drivers = [];
  drivers.push({ id: 'D1', score: 0.0113, confidence: 'high' });
  for (let i = 2; i <= 7; i++) drivers.push({ id: `D${i}`, score: null, confidence: 'high' });
  drivers.push({ id: 'D8', score: 0, confidence: 'high', breakValue: 0 });
  drivers.push({ id: 'D9', score: 1, confidence: 'medium', signalingSubgroups: 2 });
  const r = aggregateDrivers(drivers, PARAMS, { prevInternal: 50, prevPublished: 50 });
  const S = (0.1175 / 0.1595) * 0.0113;
  assert.ok(Math.abs(r.parts.S - S) < 1e-12);
  assert.ok(r.parts.U < r.parts.U_raw); // потолок сработал
  assert.ok(Math.abs(r.parts.U - (S / 3 + 0.025)) < 1e-12);
  assert.ok(Math.abs(r.parts.I_agg - (S + S / 3 + 0.025)) < 1e-12);
});

test('aggregateDrivers: лимит прироста 30 % от Д9 (§4.3.4) — вклад Д9 в рост обрезан', () => {
  // Сильный Д9 при слабых прямых: без лимита прирост от Д9 превысил бы 0.3·(100−50).
  const drivers = [];
  for (let i = 1; i <= 7; i++) drivers.push({ id: `D${i}`, score: i === 1 ? 0.01 : null, confidence: 'high' });
  drivers.push({ id: 'D8', score: 0, confidence: 'high', breakValue: 0 });
  drivers.push({ id: 'D9', score: 1, confidence: 'medium', signalingSubgroups: 3 });
  const r = aggregateDrivers(drivers, PARAMS, { prevInternal: 50, prevPublished: 50 });
  const iNew0 = r.parts.I_new0; // I_new без Д9
  const limit = 0.3 * (100 - 50);
  assert.ok(r.parts.I_new - iNew0 <= limit + 1e-9);
  assert.ok(r.parts.I_new - iNew0 > 0); // но и не обнулён
});

test('aggregateDrivers: q-сжатие при плохом покрытии — только D1 покрыт', () => {
  const drivers = [{ id: 'D1', score: 1, confidence: 'high' }];
  for (let i = 2; i <= 7; i++) drivers.push({ id: `D${i}`, score: null, confidence: 'high' });
  drivers.push({ id: 'D8', score: null, confidence: 'high', breakValue: 0 });
  drivers.push({ id: 'D9', score: null, confidence: 'high', signalingSubgroups: 0 });
  const r = aggregateDrivers(drivers, PARAMS, { prevInternal: 50, prevPublished: 50 });
  // q = 0.1175 / 1.0 = 0.1175; Ĩ = 0.1175·100 + 0.8825·50 = 55.875
  assert.ok(Math.abs(r.q - 0.1175) < 1e-12);
  assert.ok(Math.abs(r.internal - 55.2875) < 1e-9); // 0.9·55.875 + 5
  assert.equal(r.index, 55);
  assert.equal(r.delta, 5);
});

test('aggregateDrivers: первая неделя ряда (нет prev) — без инерции, delta = null', () => {
  const r = aggregateDrivers(driversA(), PARAMS, {});
  assert.equal(r.index, 73); // round(73.10585786…)
  assert.equal(r.delta, null);
  assert.equal(r.state, 'very');
});

test('aggregateDrivers: детерминизм — два прогона дают идентичный результат', () => {
  const ctx = { prevInternal: 60, prevPublished: 60 };
  const a = aggregateDrivers(driversA(), PARAMS, ctx);
  const b = aggregateDrivers(driversA(), PARAMS, ctx);
  assert.deepEqual(a, b);
});

// --- §5.4: асимметричная инерция и Structural Break Override ---

test('applyInertia: рост 0.9/0.1, снижение 0.5/0.5, равенство → без изменений', () => {
  assert.equal(applyInertia(70, 50, { betaUp: 0.9, betaDown: 0.5 }), 68);
  assert.equal(applyInertia(30, 50, { betaUp: 0.9, betaDown: 0.5 }), 40);
  assert.equal(applyInertia(50, 50, { betaUp: 0.9, betaDown: 0.5 }), 50);
});

test('applyInertia: активный override на снижении → 0.8/0.2', () => {
  assert.equal(
    applyInertia(30, 50, { betaUp: 0.9, betaDown: 0.5, overrideActive: true }),
    34,
  );
  // на рост override не действует
  assert.equal(applyInertia(70, 50, { betaUp: 0.9, betaDown: 0.5, overrideActive: true }), 68);
});

test('detectStructuralBreak: Д8.2 на максимуме (1) с высокой уверенностью → active с причиной', () => {
  const drivers = [{ id: 'D8', score: 1, confidence: 'high', breakValue: 1 }];
  const b = detectStructuralBreak(drivers, PARAMS);
  assert.equal(b.active, true);
  assert.equal(typeof b.reason, 'string');
  assert.ok(b.reason.length > 0);
});

test('detectStructuralBreak: меньше максимума или не высокая уверенность → inactive', () => {
  assert.equal(detectStructuralBreak([{ id: 'D8', score: 1, confidence: 'high', breakValue: 0.67 }], PARAMS).active, false);
  assert.equal(detectStructuralBreak([{ id: 'D8', score: 1, confidence: 'medium', breakValue: 1 }], PARAMS).active, false);
  assert.equal(detectStructuralBreak([], PARAMS).active, false);
});

test('aggregateDrivers: override активен → снижение идёт 0.8/0.2, причина зафиксирована', () => {
  const drivers = [];
  for (let i = 1; i <= 7; i++) drivers.push({ id: `D${i}`, score: 0, confidence: 'high' });
  drivers.push({ id: 'D8', score: 1, confidence: 'high', breakValue: 1 }); // Д8.2 = 3 (max), high
  drivers.push({ id: 'D9', score: null, confidence: 'medium', signalingSubgroups: 0 });
  const ctx = { prevInternal: 80, prevPublished: 80 };
  const r = aggregateDrivers(drivers, PARAMS, ctx);
  assert.equal(r.structuralBreak.active, true);
  assert.ok(r.structuralBreak.reason.length > 0);
  // q = 0.94/0.982; Ĩ = (1−q)·80 = 80·0.042/0.982; internal = 0.8·Ĩ + 0.2·80
  const expected = 0.8 * (80 * 0.042 / 0.982) + 0.2 * 80;
  assert.ok(Math.abs(r.internal - expected) < 1e-9);
  // контроль: без override было бы 0.5·Ĩ + 40 — значительно выше
  const without = aggregateDrivers(drivers, PARAMS, { ...ctx, structuralBreak: { active: false, reason: null } });
  assert.ok(r.internal < without.internal);
});

test('aggregateDrivers: override из контекста (персистентность 2 недели) применяется к чужому триггеру', () => {
  const drivers = driversA();
  const r = aggregateDrivers(drivers, PARAMS, {
    prevInternal: 80, prevPublished: 80,
    structuralBreak: { active: true, reason: 'активация на прошлой неделе' },
  });
  assert.equal(r.structuralBreak.active, true);
  assert.equal(r.structuralBreak.reason, 'активация на прошлой неделе');
});

// --- §7: региональная модель отклонения ---

const GLOBAL = { index: 72, internal: 72, delta: 12 };

test('regionalIndex: слепой регион (nReg = 0) → глобальный фон, background = true', () => {
  const r = regionalIndex(GLOBAL, { nReg: 0, eStruct: 0.8, eDyn: 0.4 }, PARAMS);
  assert.equal(r.index, 72);
  assert.equal(r.internal, 72);
  assert.equal(r.background, true);
  assert.equal(r.mirrored, false);
  assert.equal(r.state, 'very');
});

test('regionalIndex: модель отклонения — e_r = 0.5·(e_struct+e_dyn), m = n/(n+5)', () => {
  const r = regionalIndex(GLOBAL, {
    iWith: 80, iWithout: 60, nReg: 10, eStruct: 0.8, eDyn: 0.4,
    hasDeescSignals: false, prevIndex: 70,
  }, PARAMS);
  // Δ = 80−60 = 20; m = 10/15; e_r = 0.6 → 72 + 0.6·(2/3)·20 = 80
  assert.equal(r.internal, 80);
  assert.equal(r.index, 80);
  assert.equal(r.background, false);
  assert.equal(r.delta, 10); // 80 − prevIndex 70
  assert.equal(r.state, 'very');
});

test('regionalIndex: отрицательное отклонение снижает индекс', () => {
  const r = regionalIndex(GLOBAL, {
    iWith: 60, iWithout: 80, nReg: 10, eStruct: 0.8, eDyn: 0.4, hasDeescSignals: false,
  }, PARAMS);
  assert.equal(r.internal, 64); // 72 + 0.6·(2/3)·(−20)
  assert.equal(r.index, 64);
});

test('regionalIndex: clamp Δ_region ±40', () => {
  const r = regionalIndex(GLOBAL, {
    iWith: 200, iWithout: 0, nReg: 10, eStruct: 0.8, eDyn: 0.4, hasDeescSignals: false,
  }, PARAMS);
  assert.equal(r.internal, 88); // 72 + 0.6·(2/3)·40
  const down = regionalIndex(GLOBAL, {
    iWith: 0, iWithout: 200, nReg: 10, eStruct: 0.8, eDyn: 0.4, hasDeescSignals: false,
  }, PARAMS);
  assert.equal(down.internal, 56); // 72 − 16
});

test('regionalIndex: зеркалирование шока — Δ_global ≥ +15 и нет деэск. сигналов → max(κ·e_struct·I_global)', () => {
  const g = { index: 72, internal: 72, delta: 16 };
  const r = regionalIndex(g, {
    iWith: 40, iWithout: 60, nReg: 10, eStruct: 1, eDyn: 0.2, hasDeescSignals: false,
  }, PARAMS);
  // базовое: 72 + 0.6·(2/3)·(−20) = 64 < 0.85·1·72 = 61.2? нет: 64 > 61.2 — зеркало ниже
  assert.equal(r.mirrored, false);
  const low = regionalIndex(g, {
    iWith: 20, iWithout: 80, nReg: 10, eStruct: 1, eDyn: 0.2, hasDeescSignals: false,
  }, PARAMS);
  // базовое: 72 + 0.4·(2/3)·(−60→−40) = 72 − 10.67 = 61.33… < 61.2? проверка точная ниже
  assert.ok(low.internal >= 0.85 * 72 - 1e-9);
  assert.equal(low.mirrored, low.internal === 0.85 * 72);
});

test('regionalIndex: деэскалационные сигналы региона блокируют зеркалирование', () => {
  const g = { index: 72, internal: 72, delta: 16 };
  const r = regionalIndex(g, {
    iWith: 20, iWithout: 80, nReg: 10, eStruct: 1, eDyn: 0.2, hasDeescSignals: true,
  }, PARAMS);
  assert.equal(r.mirrored, false);
  assert.ok(r.internal < 0.85 * 72);
});

test('regionalIndex: e_struct = 0 — зеркало ничего не требует', () => {
  const g = { index: 72, internal: 72, delta: 16 };
  const r = regionalIndex(g, {
    iWith: 20, iWithout: 80, nReg: 10, eStruct: 0, eDyn: 0, hasDeescSignals: false,
  }, PARAMS);
  assert.equal(r.mirrored, false);
  assert.equal(r.internal, 72); // e_r = 0 → отклонение сжато к нулю, шок не зеркалится
});

// --- §9: состояния ---

test('stateOf: границы всех шести диапазонов', () => {
  assert.equal(stateOf(0, PARAMS), 'calm');
  assert.equal(stateOf(20, PARAMS), 'calm');
  assert.equal(stateOf(21, PARAMS), 'tense');
  assert.equal(stateOf(40, PARAMS), 'tense');
  assert.equal(stateOf(41, PARAMS), 'danger');
  assert.equal(stateOf(60, PARAMS), 'danger');
  assert.equal(stateOf(61, PARAMS), 'very');
  assert.equal(stateOf(80, PARAMS), 'very');
  assert.equal(stateOf(81, PARAMS), 'critical');
  assert.equal(stateOf(96, PARAMS), 'critical');
  assert.equal(stateOf(97, PARAMS), 'extreme');
  assert.equal(stateOf(100, PARAMS), 'extreme');
  assert.equal(stateOf(101, PARAMS), null);
  assert.equal(stateOf(-1, PARAMS), null);
  assert.equal(stateOf(NaN, PARAMS), null);
});

// --- calc/params.js ---

test('params: веса Д1–Д8 по 0.1175, Д9 0.06, сумма ровно 1', () => {
  const sum = Object.values(PARAMS.weights).reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sum - 1) < 1e-12);
  for (let i = 1; i <= 8; i++) assert.equal(PARAMS.weights[`D${i}`], 0.1175);
  assert.equal(PARAMS.weights.D9, 0.06);
  assert.equal(PARAMS.alpha, 0.5);
  assert.equal(PARAMS.lambda, 0.6);
  assert.equal(PARAMS.rho, 0.25);
  assert.equal(PARAMS.U_abs, 0.025);
  assert.equal(PARAMS.gamma, 0.5);
  assert.equal(PARAMS.kappa, 0.85);
  assert.equal(PARAMS.betaUp, 0.9);
  assert.equal(PARAMS.betaDown, 0.5);
  assert.equal(PARAMS.k, 2.0);
});

test('params: list() возвращает глубокую копию — мутация не трогает PARAMS', () => {
  const snapshot = list();
  snapshot.weights.D1 = 0.9;
  snapshot.k = 9;
  assert.equal(PARAMS.weights.D1, 0.1175);
  assert.equal(PARAMS.k, 2.0);
});

// --- Валидация входного файла недели (контракт для тасок 02/03) ---

function validInput() {
  return {
    week: '2026-09-13',
    params: 'calc/params.js',
    criteria: {
      'D1.1': {
        value: 0.4, covered: true,
        sources: [{ url: 'https://example.org/a', date: '2026-09-10', cluster: 'satellite-osint' }],
        regions: ['europe'],
      },
      'D1.2': null,
      'D9.6b': { value: 0.67, covered: true, acyclic: true, sources: [{ url: 'https://example.org/b', date: '2026-09-11', cluster: 'field-osint' }] },
    },
    driverConfidence: { D1: { level: 'high' }, D9: { level: 'medium', reason: 'косвенные сигналы' } },
  };
}

test('validate: валидный вход → []', () => {
  assert.deepEqual(validate(validInput()), []);
});

test('validate: минимальный вход (только week и пустые criteria) → []', () => {
  assert.deepEqual(validate({ week: '2026-09-13', criteria: {} }), []);
});

test('validate: не-объект на входе → одна ошибка', () => {
  assert.equal(validate(null).length, 1);
  assert.equal(validate([1, 2]).length, 1);
});

test('validate: week отсутствует или битый формат → ошибка с путём', () => {
  const bad = validate({ criteria: {} });
  assert.ok(bad.some((e) => e.startsWith('week:')));
  const bad2 = validate({ week: '13.09.2026', criteria: {} });
  assert.ok(bad2.some((e) => e.startsWith('week:')));
});

test('validate: неизвестный критерий → ошибка с путём', () => {
  const input = validInput();
  input.criteria['D1.7'] = null;
  const errors = validate(input);
  assert.ok(errors.some((e) => e.startsWith('criteria.D1.7:') && e.includes('неизвестный')));
});

test('validate: значение вне 0..1, NaN и строка → ошибки value', () => {
  for (const bad of [1.5, -0.1, NaN, '0.4', null]) {
    const input = validInput();
    input.criteria['D1.1'].value = bad;
    const errors = validate(input);
    assert.ok(errors.some((e) => e.startsWith('criteria.D1.1.value:')), `value ${String(bad)}`);
  }
});

test('validate: покрытый критерий без источников → ошибка sources', () => {
  const input = validInput();
  input.criteria['D1.1'].sources = [];
  assert.ok(validate(input).some((e) => e.startsWith('criteria.D1.1.sources:')));
  const input2 = validInput();
  delete input2.criteria['D1.1'].sources;
  assert.ok(validate(input2).some((e) => e.startsWith('criteria.D1.1.sources:')));
});

test('validate: источник без url / битая дата / без кластера → ошибки с индексом', () => {
  const cases = [
    [{ date: '2026-09-10', cluster: 'x' }, 'sources[0].url'],
    [{ url: 'https://a.org', date: '10.09.2026', cluster: 'x' }, 'sources[0].date'],
    [{ url: 'https://a.org', date: '2026-09-10' }, 'sources[0].cluster'],
  ];
  for (const [source, path] of cases) {
    const input = validInput();
    input.criteria['D1.1'].sources = [source];
    assert.ok(validate(input).some((e) => e.includes(path)), path);
  }
});

test('validate: непокрытый критерий объектом вместо null → ошибка', () => {
  const input = validInput();
  input.criteria['D1.2'] = { value: 0.4, covered: false };
  assert.ok(validate(input).some((e) => e.startsWith('criteria.D1.2:')));
});

test('validate: driverConfidence — неизвестный драйвер, битый level, D9 high', () => {
  const input = validInput();
  input.driverConfidence['D10'] = { level: 'high' };
  input.driverConfidence['D2'] = { level: 'super' };
  input.driverConfidence['D9'] = { level: 'high' };
  const errors = validate(input);
  assert.ok(errors.some((e) => e.startsWith('driverConfidence.D10:')));
  assert.ok(errors.some((e) => e.startsWith('driverConfidence.D2.level:')));
  assert.ok(errors.some((e) => e.startsWith('driverConfidence.D9.level:')));
});
