// regional-hypothesis.test.js — гейт порога в региональных скорах §7
// (ADR 0065): драйвер покрыт, если в подмножестве есть хотя бы
// один его покрытый критерий (эпсилон вместо глобальных 50 %), с даты
// PARAMS.regionHypothesisFrom — первой пересчитанной недели цепочки 3.0
// (2026-08-30, региональный пересчёт истории по решению владельца, O11).
// После ADR 0069 порог применяется к обеим ногам Δ_region (регион и глобал).
// Проверяется чистый шов гейта и поведение на реальном входе недели 10-18 —
// без сети, без записи, без --write.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { regionalHypothesisParams, regionalSignals } from '../calc/engine.js';
import { computeWeek } from '../calc/week-step.js';
import { PARAMS, list } from '../calc/params.js';
import { regionIdsFor } from '../js/data.js';

const V2 = regionIdsFor('2.0');
const GATE = '2026-08-30';

function inputWeek(week) {
  const url = new URL(`../calc/input/${week}.json`, import.meta.url);
  return JSON.parse(readFileSync(url, 'utf8'));
}

// --- Числа модели: порог и дата гейта объявлены в params.js ---

test('PARAMS: порог гипотетик — эпсилон, гейт — с 2026-08-30 (ADR 0065, O11)', () => {
  assert.equal(PARAMS.regionHypothesisThreshold, 1e-9);
  assert.equal(PARAMS.regionHypothesisFrom, GATE);
});

// --- Чистый шов гейта: четыре ветки ---

test('regionalHypothesisParams: без params — базой служит штатный PARAMS', () => {
  // Неделя раньше штатного гейта 2026-08-30 (демо-неделя 1.0): подмены нет.
  const got = regionalHypothesisParams(undefined, '2026-08-23');
  assert.equal(got, PARAMS);
  // Штатная неделя цепочки — правило действует, но PARAMS не мутируется.
  const onChain = regionalHypothesisParams(undefined, '2026-10-18');
  assert.notEqual(onChain, PARAMS); // подмена делает копию
  assert.equal(onChain.coverageThreshold, 1e-9);
  assert.equal(PARAMS.coverageThreshold, 0.5);
  // Без недели действует новое правило — базой остаётся PARAMS.
  const noWeek = regionalHypothesisParams();
  assert.notEqual(noWeek, PARAMS);
  assert.equal(noWeek.coverageThreshold, 1e-9);
});

test('regionalHypothesisParams: пустая дата гейта — подмена всегда', () => {
  const p = list();
  p.regionHypothesisFrom = '';
  // Порог отличён от штатного эпсилона: тест падает, если движок подставил
  // литерал 1e-9 вместо чтения p.regionHypothesisThreshold.
  p.regionHypothesisThreshold = 0.42;
  const early = regionalHypothesisParams(p, '2026-08-30');
  assert.notEqual(early, p);
  assert.equal(early.coverageThreshold, 0.42);
});

test('regionalHypothesisParams: неделя раньше гейта — порог не подменяется', () => {
  const p = list();
  const got = regionalHypothesisParams(p, '2026-08-23'); // демо-неделя 1.0
  assert.equal(got.coverageThreshold, 0.5); // глобальный §4.2
  assert.equal(got, p); // тот же объект: подмены нет
});

test('regionalHypothesisParams: неделя на дате гейта и позже — порог берётся из params (подмена 0.42)', () => {
  const p = list();
  p.regionHypothesisFrom = '2026-10-25';
  // Порог задан отдельно от эпсилона: проверяется чтение параметра, а не
  // совпадение результата с самим собой (литерал 1e-9 в движке роняет тест).
  p.regionHypothesisThreshold = 0.42;
  const onGate = regionalHypothesisParams(p, '2026-10-25');
  assert.equal(onGate.coverageThreshold, 0.42);
  assert.equal(p.coverageThreshold, 0.5); // исходный объект не мутирован
  const later = regionalHypothesisParams(p, '2026-11-01');
  assert.equal(later.coverageThreshold, 0.42);
});

// --- Реальный вход 2026-10-18: гейт порога покрытия драйверов ---
// После ADR 0069 эпсилон-порог применяется к обеим ногам Δ_region (региональной
// и глобальной): под гейтом (глобальные 50 %) разрежённый регион не покрывает
// ни одного драйвера в региональной ноге → Δ_region = 0; с эпсилоном — покрывает.

test('regionalSignals на 2026-10-18: гейт с этой недели даёт ненулевое отклонение разрежённым регионам', () => {
  const p = list();
  p.regionHypothesisFrom = '2026-10-18';
  const input = inputWeek('2026-10-18');
  const out = regionalSignals(input.criteria, V2, p, '2026-10-18');

  assert.ok(typeof out['russia-belarus'].deltaRegion === 'number');
  assert.ok(out['russia-belarus'].deltaRegion !== 0);
  assert.ok(typeof out['ukraine-moldova'].deltaRegion === 'number');
  assert.ok(out['ukraine-moldova'].deltaRegion !== 0);
  // Единственный сигнал central-asia — D3.4 деэскалационный: отклонение не
  // положительное (скор деэскалации в скоре драйвера обрезан нулом §4.2).
  assert.ok(out['central-asia'].deltaRegion <= 0);
});

test('regionalSignals на 2026-10-18: штатный гейт 2026-08-30 применяет эпсилон', () => {
  const input = inputWeek('2026-10-18');
  const out = regionalSignals(input.criteria, V2, PARAMS, '2026-10-18');
  assert.ok(out['russia-belarus'].deltaRegion !== 0);
  assert.ok(out['ukraine-moldova'].deltaRegion !== 0);
});

test('regionalSignals на 2026-10-18: гейт позже недели обнуляет отклонение разрежённых регионов', () => {
  const p = list();
  p.regionHypothesisFrom = '2026-10-25';
  const input = inputWeek('2026-10-18');
  const out = regionalSignals(input.criteria, V2, p, '2026-10-18');
  // По глобальному порогу 50 % региональная нога разрежённого региона не
  // покрывает ни одного драйвера → Δ_region = 0 (прежнее поведение, ADR 0065).
  assert.equal(out['russia-belarus'].deltaRegion, 0);
  assert.equal(out['ukraine-moldova'].deltaRegion, 0);
});

test('regionalSignals без недели: новое правило действует (R03.2)', () => {
  const input = inputWeek('2026-10-18');
  const out = regionalSignals(input.criteria, V2, list());
  assert.ok(out['russia-belarus'].deltaRegion !== 0);
});

// --- Production-передача недели: computeWeek → regionalSignals (ADR 0065) ---
// Единственная production-передача week живёт в calc/week-step.js; без неё
// правило не доезжает до публикации, а гейт молча не срабатывает. Тест пинит
// границу на реальном входе 10-18: меняется только дата гейта в params,
// неделя одна и та же.

test('computeWeek на 2026-10-18: дата недели доезжает до региональных скоров', () => {
  // Контекст — опубликованный фон недели 10-11 (индекс 56).
  const state = { prevInternal: 56, prevPublished: 56, prevRegions: {} };
  const input = inputWeek('2026-10-18');
  const oldRule = list();
  oldRule.regionHypothesisFrom = '2026-10-25'; // гейт позже недели → 50 %
  const newRule = list();
  newRule.regionHypothesisFrom = GATE; // штатный гейт → эпсилон

  // Неделя в обоих прогонах одна и та же — различие даёт только гейт.
  const before = computeWeek({ ...input, week: '2026-10-18' }, state, oldRule);
  const after = computeWeek({ ...input, week: '2026-10-18' }, state, newRule);

  // Глобальный расчёт недели от гейта не зависит (R04): index/delta совпадают.
  assert.equal(before.global.index, 64);
  assert.equal(before.global.delta, 8);
  assert.equal(after.global.index, before.global.index);
  assert.equal(after.global.delta, before.global.delta);

  // Под гейтом 50 % отклонение разрежённого региона равно нулю: его internal
  // совпадает с глобальным. С эпсилоном регион уходит от фона — индекс меняется.
  const rbBefore = before.regions['russia-belarus'];
  const rbAfter = after.regions['russia-belarus'];
  assert.equal(rbBefore.background, false);
  assert.equal(rbAfter.background, false);
  assert.equal(rbBefore.index, Math.round(before.global.internal * 10) / 10);
  assert.notEqual(rbAfter.index, rbBefore.index);
  assert.equal(typeof rbAfter.signals, 'number');
});
