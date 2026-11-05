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
import { readLatestWeeks } from '../calc/prepare-week.js';
import { PARAMS } from '../calc/params.js';

const ROOT = path.resolve(import.meta.dirname, '..');

const latestSrc = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
const { weeks: WEEKS } = readLatestWeeks(latestSrc);

// Эталон: части недели через шов loadSnapshotPart, сложенные в порядке
// загрузчика (regions и region-* мерджатся по ключам, не заменяют друг друга).
function snapshotFromParts(week) {
  const expected = { regions: {} };
  for (const f of weekPartFiles(taxonomyForWeek(week))) {
    const part = loadSnapshotPart(week, f);
    assert.ok(part, `${week}: части ${f} нет на диске`);
    const { regions, ...rest } = JSON.parse(JSON.stringify(part));
    Object.assign(expected, rest);
    // Часть regions несёт signals (ADR 0069), части region-* перезаписывают
    // запись региона целиком без поля — эталон сохраняет signals из части
    // regions (именно так собирает week.js renderWeekCombined).
    for (const [id, entry] of Object.entries(regions)) {
      const prev = expected.regions[id];
      if (prev && prev.signals !== undefined && entry.signals === undefined) {
        expected.regions[id] = { ...entry, signals: prev.signals };
      } else {
        expected.regions[id] = entry;
      }
    }
  }
  // Опциональная часть странового слоя (недели ≥ PARAMS.countryLayerFrom):
  // presence-gated — недели без файла countries.js валидны и не меняются.
  const countries = loadSnapshotPart(week, 'countries');
  if (countries && countries.countries !== undefined) {
    expected.countries = JSON.parse(JSON.stringify(countries.countries));
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

// Ручных пинов числа недель нет: согласие CI_WEEKS с диском проверяет отдельный
// тест (tests/weeklists-agreement.test.js), а per-week паритет ниже сам по себе
// покрывает каждую неделю списка — непустота списка здесь достаточна.
test('список недель из CI_WEEKS не пуст', () => {
  assert.ok(WEEKS.length > 0, 'CI_WEEKS пуст');
});

for (const week of WEEKS) {
  test(`week.js паритет с частями: ${week}`, () => {
    assert.deepStrictEqual(snapshotFromCombined(week), snapshotFromParts(week));
  });
}

// ADR 0069: маркер «мало региональных сигналов» и datasetOf висят на
// комбинированном снапшоте — signals обязан дойти до week.js, хотя части
// region-* запись региона перезаписывают. Демо-недели 1.0 поля не несут.
test('week.js цепочки 4.0 несёт signals у каждого региона (ADR 0069)', () => {
  for (const week of WEEKS) {
    const g = loadSnapshotPart(week, 'global');
    if (!g || g.methodology !== PARAMS.methodology) continue; // демо-недели без signals
    const snap = snapshotFromCombined(week);
    for (const [id, r] of Object.entries(snap.regions)) {
      assert.ok(Number.isInteger(r.signals) && r.signals >= 0, `${week}/${id}: signals целое ≥ 0, got ${r && r.signals}`);
    }
  }
});

// Migrate-week-combined идемпотентен: week.js на диске байт-в-байт равен
// renderWeekCombined(loadWeekParts) — для всех недель содержимое не меняется.
test('migrate идемпотентен: week.js = renderWeekCombined(loadWeekParts) для всех недель', () => {
  for (const week of WEEKS) {
    const disk = readFileSync(path.join(ROOT, 'data', week, 'week.js'), 'utf8');
    assert.equal(renderWeekCombined(week, loadWeekParts(week)), disk, week);
  }
});
