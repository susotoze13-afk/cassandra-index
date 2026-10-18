// Сквозная проверка сайта через чистые швы (без DOM/сети), таск 05:
// (1) все недели на диске проходят контракт js/data.js, не отдают
//     unavailable и дают витрину по числу регионов своей таксономии (v1 = 6, v2 = 12);
// (2) синтетический v2-снапшот даёт витрину из двенадцати строк.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { validate, regionIdsFor } from '../js/data.js';
import { loadSnapshotPart, taxonomyForWeek } from '../calc/calc.js';
import { rankedRegions } from '../js/sections/regions.js';

// Канонический список недель — CI_WEEKS из data/latest.js (не литерал).
const ROOT = path.resolve(import.meta.dirname, '..');
const latestSrc = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
const WEEKS = JSON.parse(latestSrc.match(/window\.CI_WEEKS = (\[[^\]]*\])/)[1]);

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

test('сквозная: недели CI_WEEKS валидны и витрина — по числу регионов таксономии (нет unavailable)', () => {
  assert.ok(WEEKS.length > 0, 'CI_WEEKS пуст');
  for (const w of WEEKS) {
    const snap = loadFullSnapshot(w);
    const v = validate(snap);
    assert.deepEqual(v.errors, [], `${w}: ${v.errors.join('; ')}`);
    assert.equal(v.ok, true, w);
    assert.notEqual(snap.dataState, 'unavailable', w);
    const version = snap.regions_taxonomy ?? '1.0';
    assert.equal(version, taxonomyForWeek(w), `${w}: версия таксономии снапшота`);
    assert.equal(rankedRegions(snap).length, regionIdsFor(version).length,
      `${w}: витрина не по набору таксономии ${version}`);
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
