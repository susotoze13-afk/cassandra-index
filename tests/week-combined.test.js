// Шов renderWeekCombined: комбинированный week.js из 11 частей недели.
// Юнит-тест — на синтетике (ручные мини-части), паритет дисковых недель —
// в tests/week-combined-parity.test.js.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';

import { renderWeekCombined, WEEK_PART_FILES } from '../calc/calc.js';

const W = '2026-01-03';

// Ручная мини-часть в том же шабоне, что пишет генератор calc.js (header/FOOTER).
const PART = (body) =>
  [
    'window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };',
    '(function () {',
    `  var s = window.CI_DATA.snapshots["${W}"] = window.CI_DATA.snapshots["${W}"] || {};`,
    body,
    '})();',
  ].join('\n') + '\n';

const REGION_IDS = ['europe', 'east-asia', 'middle-east', 'north-america', 'south-asia', 'africa'];

function syntheticParts() {
  const parts = {
    global: PART('  s.global = { "index": 42, "delta": -1 };\n  s.published = "2026-01-03";\n  s.methodology = "3.0";\n  s.dataState = "published";\n  s.q = 1;'),
    regions: PART('  s.regions = {};'),
    trend: PART('  s.trend = [{ "date": "2026-01-03", "value": 42, "methodology": "3.0" }];'),
    drivers: PART('  s.drivers = [{ "label": { "ru": "д1" } }];'),
    sources: PART('  s.sources = [{ "id": "src-1", "domain": "example.org" }];'),
  };
  for (const id of REGION_IDS) {
    parts[`region-${id}`] = PART(`  s.regions[${JSON.stringify(id)}] = { "index": 40, "delta": -2, "background": false };`);
  }
  return parts;
}

function runCombined(week, parts) {
  const sandbox = { window: { CI_DATA: { snapshots: {}, latest: null } } };
  vm.createContext(sandbox);
  vm.runInContext(renderWeekCombined(week, parts), sandbox);
  // JSON-нормализация: объект из vm-контекста несёт чужой Object.prototype.
  return JSON.parse(JSON.stringify(sandbox.window.CI_DATA.snapshots[week]));
}

test('renderWeekCombined: единый IIFE, snapshot совпадает с разобранным вручную', () => {
  const combined = renderWeekCombined(W, syntheticParts());
  // Один IIFE, не 11: обвязка единая.
  assert.equal(combined.split('(function () {').length - 1, 1);
  assert.equal(combined.split('})();').length - 1, 1);
  assert.ok(combined.startsWith('window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };\n(function () {\n'));
  assert.ok(combined.endsWith('})();\n'));

  const snap = runCombined(W, syntheticParts());
  const expectedRegions = {};
  for (const id of REGION_IDS) expectedRegions[id] = { index: 40, delta: -2, background: false };
  assert.deepStrictEqual(snap, {
    global: { index: 42, delta: -1 },
    published: '2026-01-03',
    methodology: '3.0',
    dataState: 'published',
    q: 1,
    regions: expectedRegions,
    trend: [{ date: '2026-01-03', value: 42, methodology: '3.0' }],
    drivers: [{ label: { ru: 'д1' } }],
    sources: [{ id: 'src-1', domain: 'example.org' }],
  });
});

test('renderWeekCombined: выполнение в vm не зависит от порядка ключей объекта parts', () => {
  // parts приходит неупорядоченным — порядок concat задаёт WEEK_PART_FILES.
  const parts = syntheticParts();
  const shuffled = Object.fromEntries(Object.keys(parts).reverse().map((k) => [k, parts[k]]));
  assert.deepStrictEqual(runCombined(W, shuffled), runCombined(W, parts));
});

test('renderWeekCombined: части region-* присваивают в s.regions после regions (регионы не затираются)', () => {
  const parts = syntheticParts();
  parts.regions = PART('  s.regions = { "europe": { "index": 99 } };');
  const snap = runCombined(W, parts);
  assert.equal(snap.regions.europe.index, 40); // region-europe.js перезаписал заглушку regions.js
  assert.equal(snap.regions.africa.index, 40);
});

test('renderWeekCombined: бросает при отсутствующей или бесшаблонной части', () => {
  const parts = syntheticParts();
  delete parts.sources;
  assert.throws(() => renderWeekCombined(W, parts), /sources/);
  const broken = syntheticParts();
  broken.trend = 'var x = 1;\n';
  assert.throws(() => renderWeekCombined(W, broken), /trend/);
});

test('WEEK_PART_FILES: 11 частей, regions до region-*, совпадает с порядком data/latest.js', () => {
  assert.equal(WEEK_PART_FILES.length, 11);
  const iRegions = WEEK_PART_FILES.indexOf('regions');
  const regionFiles = WEEK_PART_FILES.filter((f) => f.startsWith('region-'));
  assert.equal(regionFiles.length, 6);
  for (const f of regionFiles) assert.ok(WEEK_PART_FILES.indexOf(f) > iRegions, `${f} после regions`);
  assert.deepStrictEqual(WEEK_PART_FILES, ['global', 'regions', 'region-europe', 'region-east-asia', 'region-middle-east', 'region-north-america', 'region-south-asia', 'region-africa', 'trend', 'drivers', 'sources']);
});
