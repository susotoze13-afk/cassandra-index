// engine-attribution-parity.test.js — байт-пин регионов после обобщения ядра §7
// в attributedSignals/attributedIndex: пересчёт регионов цепочки 08-30…10-25
// из calc/input/<неделя>.json тем же шагом недели (week-step.computeWeek),
// что и штатный --write, должен дать index/delta/background, равные опубликованным
// данным data/<неделя>/regions.js. Демо-недели 08-02…08-23 (методология 1.0)
// непересчитываемы — пинятся с диска как есть (набор и фон).
// Ожидаемые значения — опубликованные файлы (независимый источник, не код под тестом).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

import { computeWeek, loadSnapshotPart, nextChainState, taxonomyForWeek } from '../calc/week-step.js';
import { regionCriteriaForWeek } from '../calc/calc.js';
import { PARAMS } from '../calc/params.js';
import { regionIdsFor } from '../js/data.js';

const CHAIN = [
  '2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20',
  '2026-09-27', '2026-10-04', '2026-10-11', '2026-10-18', '2026-10-25',
];
const DEMO = ['2026-08-02', '2026-08-09', '2026-08-16', '2026-08-23'];
const PREV_WEEK = '2026-08-23';

function loadInput(week) {
  const f = new URL(`../calc/input/${week}.json`, import.meta.url);
  if (!existsSync(f)) return null;
  return JSON.parse(readFileSync(f, 'utf8'));
}

test('паритет регионов цепочки 08-30…10-25: пересчёт = опубликованным index/delta/background', () => {
  const prevGlobal = loadSnapshotPart(PREV_WEEK, 'global');
  const prevRegions = loadSnapshotPart(PREV_WEEK, 'regions');
  assert.ok(prevGlobal && prevRegions, 'старт цепочки — опубликованный снапшот 08-23');
  const state = {
    prevInternal: prevGlobal.global.index,
    prevPublished: prevGlobal.global.index,
    prevWeek: PREV_WEEK,
    prevRegions: Object.fromEntries(
      regionIdsFor(taxonomyForWeek(PREV_WEEK)).map((id) => [id, prevRegions.regions[id].index]),
    ),
    recalcIndex: {},
    classification: {},
    sbLeft: 0,
    sbReason: null,
  };
  for (const week of CHAIN) {
    const input = loadInput(week);
    assert.ok(input, `вход ${week} существует`);
    // Регионы недель странового слоя считаются по расширенной атрибуции
    // (ADR 0068) — тем же швом, что и штатный --write.
    const regionCriteria = regionCriteriaForWeek(week, input);
    const res = computeWeek(input, state, PARAMS, regionCriteria ? { regionCriteria } : {});
    const disk = loadSnapshotPart(week, 'regions');
    assert.ok(disk && disk.regions, `regions.js недели ${week} на диске`);
    for (const id of regionIdsFor(taxonomyForWeek(week))) {
      const calc = res.regions[id];
      const pub = disk.regions[id];
      assert.ok(pub, `${week}/${id} опубликовано`);
      assert.equal(calc.index, pub.index, `${week}/${id}: index ${calc.index} ≠ ${pub.index}`);
      assert.equal(calc.delta, pub.delta, `${week}/${id}: delta ${calc.delta} ≠ ${pub.delta}`);
      assert.equal(calc.background, pub.background, `${week}/${id}: background`);
    }
    Object.assign(state, nextChainState(state, res));
  }
});

test('паритет глобала цепочки: пересчёт = опубликованным index/delta', () => {
  // Глобал пинится tests/data.test.js; здесь — быстрая сверка по регионам уже
  // не нужна: этот тест гарантирует, что обобщение ядра не тронуло агрегацию.
  const prevGlobal = loadSnapshotPart(PREV_WEEK, 'global');
  const state = {
    prevInternal: prevGlobal.global.index,
    prevPublished: prevGlobal.global.index,
    prevRegions: {},
    recalcIndex: {},
    classification: {},
    sbLeft: 0,
    sbReason: null,
  };
  for (const week of CHAIN) {
    const res = computeWeek(loadInput(week), state, PARAMS);
    const disk = loadSnapshotPart(week, 'global');
    assert.equal(res.global.index, disk.global.index, `${week}: global.index`);
    assert.equal(res.global.delta, disk.global.delta, `${week}: global.delta`);
    Object.assign(state, nextChainState(state, res));
  }
});

test('демо-недели 08-02…08-23: опубликованный набор регионов версии 1.0 на диске как есть', () => {
  for (const week of DEMO) {
    const disk = loadSnapshotPart(week, 'regions');
    assert.ok(disk && disk.regions, `regions.js недели ${week} на диске`);
    const ids = regionIdsFor(taxonomyForWeek(week));
    assert.deepEqual(Object.keys(disk.regions), ids, `${week}: набор регионов v1`);
    for (const id of ids) {
      assert.equal(typeof disk.regions[id].index, 'number', `${week}/${id}: index число`);
      assert.equal(typeof disk.regions[id].delta, 'number', `${week}/${id}: delta число`);
      // background опционален в контракте (absent = false) — допустимы true/false/отсутствие.
      assert.ok([undefined, true, false].includes(disk.regions[id].background), `${week}/${id}: background boolean`);
    }
  }
});
