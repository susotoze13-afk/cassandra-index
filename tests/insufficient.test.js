// Классификация публикации и цепочка инерции — швы calc/calc.js.
// Ожидаемые значения посчитаны вручную от PARAMS.dataCoverage
// {insufficient: 0.4, reduced: 0.2, d1d2Required: true}:
//   nullWeight = 1 − q; insufficient при nullWeight > 0.4 или null Д1/Д2;
//   reduced при 0.2 < nullWeight ≤ 0.4; полная при nullWeight ≤ 0.2.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classifyPublication, nextChainState } from '../calc/calc.js';
import { PARAMS } from '../calc/params.js';
import { regionIdsFor } from '../js/data.js';

const V1 = regionIdsFor('1.0');

// Девять драйверов; score — число либо null (драйвер не покрыт).
function driversWith(nullIds) {
  return Array.from({ length: 9 }, (_, i) => ({
    id: `D${i + 1}`,
    score: nullIds.has(`D${i + 1}`) ? null : 0.5,
  }));
}

test('classify: граница 0.4 — nullWeight ровно 0.4 ещё публикуется (reduced)', () => {
  const c = classifyPublication({ q: 0.6 }, driversWith(new Set(['D3', 'D4', 'D5', 'D6'])), PARAMS);
  assert.ok(Math.abs(c.nullWeight - 0.4) < 1e-9);
  assert.equal(c.insufficient, false);
  assert.equal(c.dataState, 'published');
  assert.equal(c.confidence, 'reduced');
  assert.equal(c.coveredDrivers, 5);
  assert.equal(c.totalDrivers, 9);
});

test('classify: nullWeight 0.41 — insufficient, граница 0.2 — nullWeight 0.2 полная', () => {
  const above = classifyPublication({ q: 0.59 }, driversWith(new Set(['D3', 'D4', 'D5', 'D6'])), PARAMS);
  assert.equal(above.insufficient, true);
  assert.equal(above.dataState, 'insufficient');
  assert.equal(above.confidence, 'none');

  const atReducedFloor = classifyPublication({ q: 0.8 }, driversWith(new Set(['D3'])), PARAMS);
  assert.ok(Math.abs(atReducedFloor.nullWeight - 0.2) < 1e-9);
  assert.equal(atReducedFloor.dataState, 'published');
  assert.equal(atReducedFloor.confidence, 'full');

  const between = classifyPublication({ q: 0.75 }, driversWith(new Set(['D3'])), PARAMS);
  assert.equal(between.confidence, 'reduced');
});

test('classify: null Д1 или null Д2 — insufficient даже при полном q', () => {
  const d1Null = classifyPublication({ q: 0.95 }, driversWith(new Set(['D1'])), PARAMS);
  assert.equal(d1Null.insufficient, true);
  assert.equal(d1Null.dataState, 'insufficient');

  const d2Null = classifyPublication({ q: 0.95 }, driversWith(new Set(['D2'])), PARAMS);
  assert.equal(d2Null.insufficient, true);

  const d3Null = classifyPublication({ q: 0.95 }, driversWith(new Set(['D3'])), PARAMS);
  assert.equal(d3Null.insufficient, false);
  assert.equal(d3Null.dataState, 'published');
});

// --- Цепочка инерции: insufficient-неделя не двигает lastValid ---

function chainState() {
  return {
    prevInternal: 0.42,
    prevPublished: 61,
    prevWeek: '2026-08-23',
    prevRegions: Object.fromEntries(V1.map((id) => [id, 61])),
    recalcIndex: {},
    classification: {},
    sbLeft: 0,
    sbReason: null,
  };
}

function weekRes(week, insufficient, internal, index) {
  return {
    week,
    global: { internal, index },
    regions: Object.fromEntries(V1.map((id) => [id, { index: 62, delta: 1, status: 'tense' }])),
    classification: { insufficient, dataState: insufficient ? 'insufficient' : 'published' },
  };
}

test('chain: insufficient-неделя не меняет prevInternal/prevPublished, published — меняет', () => {
  const s0 = chainState();
  const s1 = nextChainState(s0, weekRes('2026-08-30', true, 0.55, 70));
  assert.equal(s1.prevInternal, 0.42, 'lastValidInternal не сдвинулся');
  assert.equal(s1.prevPublished, 61);
  assert.equal(s1.prevWeek, '2026-08-23');
  assert.equal(s1.recalcIndex['2026-08-30'], undefined, 'неопубликованное число не идёт в trend');
  assert.equal(s1.classification['2026-08-30'], 'insufficient');

  const s2 = nextChainState(s1, weekRes('2026-09-06', false, 0.44, 63));
  assert.equal(s2.prevInternal, 0.44, 'валидная неделя считает инерцию от lastValid');
  assert.equal(s2.prevPublished, 63);
  assert.equal(s2.prevWeek, '2026-09-06');
  assert.equal(s2.recalcIndex['2026-09-06'], 63);
  assert.equal(s2.recalcIndex['2026-08-30'], undefined);
  assert.equal(s1.prevInternal, 0.42, 'исходное состояние не мутировано');
});

test('chain: v2-неделя ведёт набор из 12 id; смещение europe новым id не наследуется', () => {
  const V2 = regionIdsFor('2.0');
  const s0 = chainState(); // v1-шестёрка с europe = 61
  const res = {
    week: '2026-10-18',
    global: { internal: 0.5, index: 70 },
    regions: Object.fromEntries(
      V2.map((id) => [id, { index: id === 'russia-belarus' ? 80 : 70, delta: 0, status: 'very' }]),
    ),
    classification: { insufficient: false, dataState: 'published' },
  };
  const s1 = nextChainState(s0, res);
  // Все двенадцать id ведут собственные значения недели — ни один не унаследовал
  // смещение v1-региона 'europe' (61). Наблюдаемое свойство, а не остаточный ключ.
  for (const id of V2) assert.equal(s1.prevRegions[id], res.regions[id].index, id);
  for (const id of V2) assert.notEqual(s1.prevRegions[id], s0.prevRegions.europe, `${id}: не наследует якорь v1`);
});
