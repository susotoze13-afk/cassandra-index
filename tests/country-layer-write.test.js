// country-layer-write.test.js — дисковый шов writeCountryLayer (calc/country-layer.js):
// дозапись части countries.js и пересборка week.js из дисковых частей недели.
// Глобальные/региональные части не трогаются (проверка байтово); повторный вызов
// идемпотентен. Дерево — временное (mkdtemp), реальные data/ не затрагиваются.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import vm from 'node:vm';

import { writeCountryLayer, renderCountryPart } from '../calc/country-layer.js';
import { loadWeekParts, renderWeekCombined } from '../calc/calc.js';
import { regionIdsFor } from '../js/data.js';

const WEEK = '2026-11-01'; // синтетическая v2-неделя за пределами реальных данных

const HEADER = (week) =>
  'window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };\n' +
  '(function () {\n' +
  `  var s = window.CI_DATA.snapshots["${week}"] = window.CI_DATA.snapshots["${week}"] || {};\n`;
const FOOTER = '})();\n';
const PART = (body) => `${HEADER(WEEK)}${body}\n${FOOTER}`;

const ROWS = {
  total: 2,
  published: 1,
  rows: {
    RU: {
      index: 70, delta: 2, background: false, region: 'russia-belarus', signals: 2,
      name: { ru: 'Россия', en: 'Russia' },
    },
    UA: {
      index: 68, delta: 0, background: true, region: 'ukraine-moldova', signals: 0,
      name: { ru: 'Украина', en: 'Ukraine' },
    },
  },
};

// Временное дерево с полным v2-набором частей (17 файлов) недели.
function makeTree() {
  const root = mkdtempSync(path.join(tmpdir(), 'ci-country-layer-'));
  const dir = path.join(root, 'data', WEEK);
  mkdirSync(dir, { recursive: true });
  const parts = {
    global: PART('  s.global = { "index": 68, "delta": 4 };\n  s.regions_taxonomy = "2.0";\n  s.published = "2026-11-01";\n  s.methodology = "3.0";\n  s.dataState = "published";\n  s.q = 1;'),
    regions: PART('  s.regions = {};'),
    trend: PART('  s.trend = [];'),
    drivers: PART('  s.drivers = [];'),
    sources: PART('  s.sources = [];'),
  };
  for (const id of regionIdsFor('2.0')) {
    parts[`region-${id}`] = PART(`  s.regions[${JSON.stringify(id)}] = { "index": 68, "delta": 4, "background": true };`);
  }
  for (const [f, text] of Object.entries(parts)) writeFileSync(path.join(dir, `${f}.js`), text, 'utf8');
  return { root, dir };
}

function readSnapshot(file) {
  const sandbox = { window: { CI_DATA: { snapshots: {}, latest: null } } };
  sandbox.window.CI_DATA.snapshots[WEEK] = { regions: {} };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(file, 'utf8'), sandbox);
  return JSON.parse(JSON.stringify(sandbox.window.CI_DATA.snapshots[WEEK]));
}

test('writeCountryLayer: пишет countries.js и пересобирает week.js, чужие части не тронуты', () => {
  const { root, dir } = makeTree();
  const before = Object.fromEntries(
    readdirSync(dir).map((f) => [f, readFileSync(path.join(dir, f), 'utf8')]),
  );

  writeCountryLayer(WEEK, ROWS, root);

  // Часть countries.js — в шаблоне генератора и несёт строки слоя.
  const countriesFile = path.join(dir, 'countries.js');
  const part = readSnapshotPartFile(countriesFile);
  assert.deepStrictEqual(part.countries, ROWS);

  // week.js пересобран из дисковых частей и содержит блок countries.
  const weekFile = path.join(dir, 'week.js');
  const snap = readSnapshot(weekFile);
  assert.deepStrictEqual(snap.countries, ROWS);
  assert.equal(
    readFileSync(weekFile, 'utf8'),
    renderWeekCombined(WEEK, loadWeekParts(WEEK, root)),
  );

  // Глобальные/региональные части байтово прежние; добавился ровно один файл.
  for (const [f, text] of Object.entries(before)) {
    assert.equal(readFileSync(path.join(dir, f), 'utf8'), text, `${f} не должен меняться`);
  }
  assert.deepStrictEqual(
    readdirSync(dir).sort(),
    [...Object.keys(before), 'countries.js', 'week.js'].sort(),
  );
});

test('writeCountryLayer: идемпотентен — повторный вызов не меняет байты', () => {
  const { root, dir } = makeTree();
  writeCountryLayer(WEEK, ROWS, root);
  const first = {
    'countries.js': readFileSync(path.join(dir, 'countries.js'), 'utf8'),
    'week.js': readFileSync(path.join(dir, 'week.js'), 'utf8'),
  };
  writeCountryLayer(WEEK, ROWS, root);
  assert.equal(readFileSync(path.join(dir, 'countries.js'), 'utf8'), first['countries.js']);
  assert.equal(readFileSync(path.join(dir, 'week.js'), 'utf8'), first['week.js']);
});

test('writeCountryLayer: renderCountryPart совпадает с формой частей генератора', () => {
  const text = renderCountryPart(WEEK, ROWS);
  const lines = text.split('\n');
  assert.equal(lines[0], 'window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };');
  assert.equal(lines[1], '(function () {');
  assert.ok(lines[2].startsWith('  var s = '));
  assert.equal(lines[lines.length - 2], '})();');
  assert.ok(text.includes('  s.countries = '));
});

function readSnapshotPartFile(file) {
  return readSnapshot(file);
}
