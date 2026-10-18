// Паритет week.js ↔ дисковым частям недели: для каждой недели из
// window.CI_WEEKS выполнение data/<week>/week.js в vm даёт тот же
// window.CI_DATA.snapshots[week], что чтение частей недели через loadSnapshotPart
// (набор частей — по версии таксономии недели: v1 = 11, v2 = 17).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

import {
  loadSnapshotPart, weekPartFiles, taxonomyForWeek, loadWeekParts, renderWeekCombined,
} from '../calc/calc.js';

const ROOT = path.resolve(import.meta.dirname, '..');

const latestSrc = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
const WEEKS = JSON.parse(latestSrc.match(/window\.CI_WEEKS = (\[[^\]]*\])/)[1]);

// Эталон: части недели через шов loadSnapshotPart, сложенные в порядке
// загрузчика (regions и region-* мерджатся по ключам, не заменяют друг друга).
function snapshotFromParts(week) {
  const expected = { regions: {} };
  for (const f of weekPartFiles(taxonomyForWeek(week))) {
    const part = loadSnapshotPart(week, f);
    assert.ok(part, `${week}: части ${f} нет на диске`);
    const { regions, ...rest } = JSON.parse(JSON.stringify(part));
    Object.assign(expected, rest);
    Object.assign(expected.regions, regions);
  }
  return expected;
}

// Факт: выполнение сгенерированного week.js в чистом контексте.
function snapshotFromCombined(week) {
  const sandbox = { window: { CI_DATA: { snapshots: {}, latest: null } } };
  vm.createContext(sandbox);
  const file = path.join(ROOT, 'data', week, 'week.js');
  vm.runInContext(readFileSync(file, 'utf8'), sandbox, { filename: file });
  return JSON.parse(JSON.stringify(sandbox.window.CI_DATA.snapshots[week]));
}

test(`покрыто ${WEEKS.length} недель из CI_WEEKS`, () => {
  assert.equal(WEEKS.length, 12);
});

for (const week of WEEKS) {
  test(`week.js паритет с частями: ${week}`, () => {
    assert.deepStrictEqual(snapshotFromCombined(week), snapshotFromParts(week));
  });
}

// Migrate-week-combined идемпотентен: week.js на диске байт-в-байт равен
// renderWeekCombined(loadWeekParts) — для всех недель содержимое не меняется.
test('migrate идемпотентен: week.js = renderWeekCombined(loadWeekParts) для всех недель', () => {
  for (const week of WEEKS) {
    const disk = readFileSync(path.join(ROOT, 'data', week, 'week.js'), 'utf8');
    assert.equal(renderWeekCombined(week, loadWeekParts(week)), disk, week);
  }
});
