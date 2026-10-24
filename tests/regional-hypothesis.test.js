// regional-hypothesis.test.js — гейт порога в региональных гипотетиках §7
// (ADR 0065): в iWith/iWithout драйвер покрыт, если в подмножестве есть хотя бы
// один его покрытый критерий (эпсилон вместо глобальных 50 %), forward-only с
// даты PARAMS.regionHypothesisFrom. Проверяется чистый шов гейта и поведение на
// реальном входе недели 10-18 — без сети, без записи, без --write.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { regionalHypothesisParams, regionalSignals } from '../calc/engine.js';
import { PARAMS, list } from '../calc/params.js';
import { regionIdsFor } from '../js/data.js';

const V2 = regionIdsFor('2.0');

function inputWeek(week) {
  const url = new URL(`../calc/input/${week}.json`, import.meta.url);
  return JSON.parse(readFileSync(url, 'utf8'));
}

// --- Числа модели: порог и дата гейта объявлены в params.js ---

test('PARAMS: порог гипотетик — эпсилон, гейт — с 2026-10-25 (ADR 0065)', () => {
  assert.equal(PARAMS.regionHypothesisThreshold, 1e-9);
  assert.equal(PARAMS.regionHypothesisFrom, '2026-10-25');
});

// --- Чистый шов гейта: четыре ветки ---

test('regionalHypothesisParams: без params — базой служит штатный PARAMS', () => {
  // Неделя раньше штатного гейта 2026-10-25: подмены нет, возвращается PARAMS.
  const got = regionalHypothesisParams(undefined, '2026-10-18');
  assert.equal(got, PARAMS);
  // Без недели действует новое правило — но базой остаётся PARAMS.
  const noWeek = regionalHypothesisParams();
  assert.equal(noWeek.regionHypothesisFrom, PARAMS.regionHypothesisFrom);
  assert.equal(noWeek.coverageThreshold, 1e-9);
});

test('regionalHypothesisParams: пустая дата гейта — подмена всегда', () => {
  const p = list();
  p.regionHypothesisFrom = '';
  const early = regionalHypothesisParams(p, '2026-08-30');
  assert.equal(early.coverageThreshold, 1e-9);
  assert.equal(early.regionHypothesisThreshold, 1e-9); // число из PARAMS
});

test('regionalHypothesisParams: неделя раньше гейта — порог не подменяется', () => {
  const p = list();
  const got = regionalHypothesisParams(p, '2026-10-18');
  assert.equal(got.coverageThreshold, 0.5); // глобальный §4.2
  assert.equal(got, p); // тот же объект: подмены нет
});

test('regionalHypothesisParams: неделя на дате гейта и позже — эпсилон', () => {
  const p = list();
  p.regionHypothesisFrom = '2026-10-25';
  const onGate = regionalHypothesisParams(p, '2026-10-25');
  assert.equal(onGate.coverageThreshold, 1e-9);
  assert.equal(onGate.coverageThreshold, p.regionHypothesisThreshold ?? 1e-9);
  assert.equal(p.coverageThreshold, 0.5); // исходный объект не мутирован
  const later = regionalHypothesisParams(p, '2026-11-01');
  assert.equal(later.coverageThreshold, 1e-9);
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

test('regionalSignals на 2026-10-18: штатный гейт 2026-10-25 сохраняет старое поведение', () => {
  const input = inputWeek('2026-10-18');
  const out = regionalSignals(input.criteria, V2, PARAMS, '2026-10-18');
  assert.equal(out['russia-belarus'].iWith, 0);
  assert.equal(out['ukraine-moldova'].iWith, 0);
});

test('regionalSignals без недели: новое правило действует (R03.2)', () => {
  const input = inputWeek('2026-10-18');
  const out = regionalSignals(input.criteria, V2, list());
  assert.ok(out['russia-belarus'].iWith > 0);
});
