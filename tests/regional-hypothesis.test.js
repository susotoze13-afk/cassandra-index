// regional-hypothesis.test.js — гейт порога в региональных гипотетиках §7
// (ADR 0065): в iWith/iWithout драйвер покрыт, если в подмножестве есть хотя бы
// один его покрытый критерий (эпсилон вместо глобальных 50 %), с даты
// PARAMS.regionHypothesisFrom — первой пересчитанной недели цепочки 3.0
// (2026-08-30, региональный пересчёт истории по решению владельца, O11).
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

// --- Реальный вход 2026-10-18: гипотетики разрежённых регионов ---

test('regionalSignals на 2026-10-18: гейт с этой недели даёт iWith разрежённым регионам', () => {
  const p = list();
  p.regionHypothesisFrom = '2026-10-18';
  const input = inputWeek('2026-10-18');
  const out = regionalSignals(input.criteria, V2, p, '2026-10-18');

  // Ручной разбор прототипа (docs/regional-iwith-degeneracy.md §4): 77 и 60.
  assert.ok(out['russia-belarus'].iWith > 0);
  assert.ok(Math.abs(out['russia-belarus'].iWith - 77) <= 1);
  assert.ok(out['ukraine-moldova'].iWith > 0);
  assert.ok(Math.abs(out['ukraine-moldova'].iWith - 60) <= 1);
  // Единственный сигнал central-asia — D3.4 деэскалационный: iWith = 0 легален.
  assert.equal(out['central-asia'].iWith, 0);
});

test('regionalSignals на 2026-10-18: штатный гейт 2026-08-30 применяет эпсилон', () => {
  const input = inputWeek('2026-10-18');
  const out = regionalSignals(input.criteria, V2, PARAMS, '2026-10-18');
  assert.ok(out['russia-belarus'].iWith > 0);
  assert.ok(out['ukraine-moldova'].iWith > 0);
});

test('regionalSignals на 2026-10-18: гейт позже недели сохраняет прежнее поведение', () => {
  const p = list();
  p.regionHypothesisFrom = '2026-10-25';
  const input = inputWeek('2026-10-18');
  const out = regionalSignals(input.criteria, V2, p, '2026-10-18');
  // До пересчёта истории (forward-only с 10-25) гипотетики шли по 50 %: iWith = 0.
  assert.equal(out['russia-belarus'].iWith, 0);
  assert.equal(out['ukraine-moldova'].iWith, 0);
});

test('regionalSignals без недели: новое правило действует (R03.2)', () => {
  const input = inputWeek('2026-10-18');
  const out = regionalSignals(input.criteria, V2, list());
  assert.ok(out['russia-belarus'].iWith > 0);
});

// --- Production-передача недели: computeWeek → regionalSignals (ADR 0065) ---
// Единственная production-передача week живёт в calc/week-step.js; без неё
// правило не доезжает до публикации, а гейт молча не срабатывает. Тест пинит
// границу на реальном входе 10-18: меняется только дата гейта в params,
// неделя одна и та же.

test('computeWeek на 2026-10-18: дата недели доезжает до региональных гипотетик', () => {
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

  // Региональный индекс russia-belarus пересекает границу: ≈57 → ≈69
  // (ориентир прототипа §4 — 57 → 69 при контексте без прошлой недели).
  const rbBefore = before.regions['russia-belarus'].index;
  const rbAfter = after.regions['russia-belarus'].index;
  assert.notEqual(rbBefore, rbAfter);
  assert.ok(Math.abs(rbBefore - 57) <= 1, `russia-belarus до гейта: ${rbBefore}`);
  assert.ok(Math.abs(rbAfter - 69) <= 1, `russia-belarus после гейта: ${rbAfter}`);
  assert.equal(before.regions['russia-belarus'].background, false);
});
