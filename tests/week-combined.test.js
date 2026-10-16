// Шов renderWeekCombined: комбинированный week.js из 11 частей недели.
// Юнит-тест — на синтетике (ручные мини-части), паритет дисковых недель —
// в tests/week-combined-parity.test.js.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';

import { renderWeekCombined, WEEK_PART_FILES, weekPartFiles, taxonomyForWeek, loadWeekParts, renderGlobal } from '../calc/calc.js';
import { regionIdsFor } from '../js/data.js';

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

// --- Версия таксономии недели и список частей по версии (R25/R26) ---
test('taxonomyForWeek: граница PARAMS.taxonomyV2From — v2 от 2026-10-18, ранее v1', () => {
  assert.equal(taxonomyForWeek('2026-08-30'), '1.0');
  assert.equal(taxonomyForWeek('2026-10-11'), '1.0');
  assert.equal(taxonomyForWeek('2026-10-18'), '2.0');
  assert.equal(taxonomyForWeek('2026-10-25'), '2.0');
});

test('weekPartFiles: v1 — те же 11 частей, v2 — 17 с двенадцатью региональными', () => {
  assert.deepStrictEqual(weekPartFiles('1.0'), WEEK_PART_FILES);
  const v2 = weekPartFiles('2.0');
  assert.equal(v2.length, 17);
  assert.equal(v2.filter((f) => f.startsWith('region-')).length, 12);
  assert.deepStrictEqual(v2.slice(0, 2), ['global', 'regions']);
  assert.deepStrictEqual(v2.slice(-3), ['trend', 'drivers', 'sources']);
  const iRegions = v2.indexOf('regions');
  for (const f of v2.filter((x) => x.startsWith('region-'))) {
    assert.ok(v2.indexOf(f) > iRegions, `${f} после regions`);
  }
});

test('renderGlobal: пишет regions_taxonomy недели (v1/v2)', () => {
  const snap = { published: '2026-10-18', methodology: '1.0' };
  const meta = { dataState: 'published', q: 1, nullWeight: 0, coverage: { coveredDrivers: 9, totalDrivers: 9 }, confidence: 'full', recalc: { at: '2026-10-19T00:00:00.000Z', reason: 'r' } };
  const v2 = renderGlobal('2026-10-18', snap, { index: 50, delta: 1 }, meta);
  assert.ok(v2.includes('  s.regions_taxonomy = "2.0";'), v2);
  const v1 = renderGlobal('2026-10-11', snap, { index: 50, delta: 1 }, meta);
  assert.ok(v1.includes('  s.regions_taxonomy = "1.0";'), v1);
});

test('loadWeekParts: набор частей недели — по её regions_taxonomy (v1-неделя)', () => {
  const parts = loadWeekParts('2026-10-11');
  assert.ok(parts, 'неделя на диске');
  assert.deepStrictEqual(Object.keys(parts).sort(), [...WEEK_PART_FILES].sort());
});

test('renderWeekCombined: v2-набор частей (17) собирается целиком, двенадцать регионов', () => {
  const V2 = regionIdsFor('2.0');
  const parts = {
    global: PART('  s.global = { "index": 50, "delta": 1 };\n  s.regions_taxonomy = "2.0";\n  s.published = "2026-10-18";\n  s.methodology = "3.0";\n  s.dataState = "published";\n  s.q = 1;'),
    regions: PART('  s.regions = {};'),
    trend: PART('  s.trend = [{ "date": "2026-10-18", "value": 50, "methodology": "3.0" }];'),
    drivers: PART('  s.drivers = [];'),
    sources: PART('  s.sources = [];'),
  };
  for (const id of V2) {
    parts[`region-${id}`] = PART(`  s.regions[${JSON.stringify(id)}] = { "index": 50, "delta": 1, "background": true };`);
  }
  // parts неупорядочен, но список частей — по версии (v2), регионов двенадцать.
  const snap = runCombined(W, parts);
  assert.deepStrictEqual(Object.keys(snap.regions).sort(), [...V2].sort());
  assert.equal(snap.regions_taxonomy, '2.0');
  assert.ok(!('europe' in snap.regions));
});

