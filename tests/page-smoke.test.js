// Сквозная проверка сайта через чистые швы (без DOM/сети), таск 05:
// (1) все 11 недель на диске проходят контракт js/data.js, не отдают
//     unavailable и дают витрину из шести строк (таксономия v1);
// (2) синтетический v2-снапшот даёт витрину из двенадцати строк.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate, regionIdsFor } from '../js/data.js';
import { loadSnapshotPart } from '../calc/calc.js';
import { rankedRegions } from '../js/sections/regions.js';

const WEEKS = ['2026-08-02', '2026-08-09', '2026-08-16', '2026-08-23',
  '2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20', '2026-09-27',
  '2026-10-04', '2026-10-11'];

// Снапшот недели из дисковых частей (как data.test.js): global.js несёт
// скалярные поля + global, остальные части — свои ключи.
function loadFullSnapshot(date) {
  const snap = {};
  for (const file of ['global', 'regions', 'trend', 'drivers', 'sources']) {
    const part = loadSnapshotPart(date, file);
    if (!part) continue;
    if (file === 'global') {
      const { regions, ...scalars } = part;
      Object.assign(snap, scalars);
    } else {
      snap[file] = part[file];
    }
  }
  return snap;
}

test('сквозная: 11 недель v1 валидны и витрина — шесть строк (нет unavailable)', () => {
  assert.equal(WEEKS.length, 11);
  for (const w of WEEKS) {
    const snap = loadFullSnapshot(w);
    const v = validate(snap);
    assert.deepEqual(v.errors, [], `${w}: ${v.errors.join('; ')}`);
    assert.equal(v.ok, true, w);
    assert.notEqual(snap.dataState, 'unavailable', w);
    assert.equal(snap.regions_taxonomy ?? '1.0', '1.0', w);
    assert.equal(rankedRegions(snap).length, 6, `${w}: витрина не шесть строк`);
  }
});

test('сквозная: v2-синтетика витрины — двенадцать строк', () => {
  const ids = regionIdsFor('2.0');
  const regions = Object.fromEntries(
    ids.map((id) => [id, { index: 50, delta: 1, background: true }]),
  );
  const snap = { regions_taxonomy: '2.0', global: { index: 50, delta: 1 }, regions };
  assert.equal(rankedRegions(snap).length, 12);
});
