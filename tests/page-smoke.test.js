// Сквозная проверка сайта через чистые швы (без DOM/сети), таск 05:
// (1) все недели на диске проходят контракт js/data.js, не отдают unavailable
//     и дают витрину по числу регионов своей таксономии;
// (1a) недели v1 (6 регионов), (1b) недели v2 (12 регионов) — число строк
//     витрины пинится литералами НЕЗАВИСИМО от regionIdsFor: защита от
//     переразметки таксономии (сам автономный regionIdsFor проверяется
//     js/data.js-контрактом, здесь он — только вторая ветка ожидания);
// (2) синтетический v2-снапшот даёт витрину из двенадцати строк.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { validate, regionIdsFor } from '../js/data.js';
import { loadSnapshotPart, taxonomyForWeek } from '../calc/calc.js';
import { readLatestWeeks } from '../calc/prepare-week.js';
import { rankedRegions } from '../js/sections/regions.js';

// Канонический список недель — CI_WEEKS/CI_LATEST из data/latest.js,
// прочитанные через шов prepare-week.js (парсинг не дублируется).
const ROOT = path.resolve(import.meta.dirname, '..');
const latestSrc = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
const { weeks: WEEKS } = readLatestWeeks(latestSrc);

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

// Витрина недели = размер её набора регионов. Пин литералом: число строк
// витрины НЕ выводится из regionIdsFor(version) — иначе переразметка
// таксономии (изменение набора) осталась бы незамеченной здесь.
function expectedRows(version) {
  if (version === '2.0') return 12;
  return 6;
}

function assertWeekSmoke(w) {
  const snap = loadFullSnapshot(w);
  const v = validate(snap);
  assert.deepEqual(v.errors, [], `${w}: ${v.errors.join('; ')}`);
  assert.equal(v.ok, true, w);
  assert.notEqual(snap.dataState, 'unavailable', w);
  const version = snap.regions_taxonomy ?? '1.0';
  assert.equal(version, taxonomyForWeek(w), `${w}: версия таксономии снапшота`);
  const rows = rankedRegions(snap);
  assert.equal(rows.length, expectedRows(version),
    `${w}: витрина не по набору таксономии ${version}`);
  assert.notDeepStrictEqual(rows.map((r) => r.id).sort(), [],
    `${w}: строки витрины без id`);
}

test('сквозная v1: недели таксономии 1.0 — витрина из шести строк (нет unavailable)', () => {
  assert.ok(WEEKS.length > 0, 'CI_WEEKS пуст');
  const v1Weeks = WEEKS.filter((w) => taxonomyForWeek(w) === '1.0');
  assert.ok(v1Weeks.length > 0, 'v1-недель в CI_WEEKS нет');
  for (const w of v1Weeks) assertWeekSmoke(w);
});

test('сквозная v2: недели таксономии 2.0 — витрина из двенадцати строк (нет unavailable)', () => {
  const v2Weeks = WEEKS.filter((w) => taxonomyForWeek(w) === '2.0');
  assert.ok(v2Weeks.length > 0, 'v2-недель в CI_WEEKS нет');
  for (const w of v2Weeks) assertWeekSmoke(w);
});

test('сквозная: v2-синтетика витрины — двенадцать строк', () => {
  const ids = regionIdsFor('2.0');
  const regions = Object.fromEntries(
    ids.map((id) => [id, { index: 50, delta: 1, background: true }]),
  );
  const snap = { regions_taxonomy: '2.0', global: { index: 50, delta: 1 }, regions };
  assert.equal(rankedRegions(snap).length, 12);
});
