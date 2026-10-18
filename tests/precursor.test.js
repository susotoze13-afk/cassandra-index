// precursor.test.js — публичный слой Д9 (R07, R11, R13; §4.3.6 METHODOLOGY):
// чистый шов precursorOf(drivers) и точки записи поля precursor в снапшот.
// Числа ожидания берутся из спецификации: percent = round(score·100), 0..100.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { precursorOf } from '../calc/precursor.js';
import { runWeek, renderGlobal } from '../calc/calc.js';
import { buildDrivers } from '../calc/engine.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const driversOf = (...extra) => [{ id: 'D1', score: 0.9 }, ...extra];

test('precursorOf: null без драйвера Д9 и при нечисловом score', () => {
  assert.equal(precursorOf(null), null);
  assert.equal(precursorOf([]), null);
  assert.equal(precursorOf(driversOf()), null);
  assert.equal(precursorOf(driversOf({ id: 'D9', score: null, signalingSubgroups: 0 })), null);
  assert.equal(precursorOf(driversOf({ id: 'D9', score: '0.5', signalingSubgroups: 1 })), null);
  assert.equal(precursorOf(driversOf({ id: 'D9', score: 0.5 })), null);
  assert.equal(precursorOf(driversOf({ id: 'D9', score: 0.5, signalingSubgroups: '3' })), null);
});

test('precursorOf: 0, середина и 1 дают проценты 0/50/100', () => {
  assert.deepEqual(
    precursorOf(driversOf({ id: 'D9', score: 0, signalingSubgroups: 0 })),
    { value: 0, signalingSubgroups: 0 },
  );
  assert.deepEqual(
    precursorOf(driversOf({ id: 'D9', score: 0.5, signalingSubgroups: 4 })),
    { value: 50, signalingSubgroups: 4 },
  );
  assert.deepEqual(
    precursorOf(driversOf({ id: 'D9', score: 1, signalingSubgroups: 8 })),
    { value: 100, signalingSubgroups: 8 },
  );
});

test('precursorOf: округление до целого и кламп 0..100', () => {
  assert.equal(precursorOf(driversOf({ id: 'D9', score: 0.123, signalingSubgroups: 2 })).value, 12);
  assert.equal(precursorOf(driversOf({ id: 'D9', score: 0.126, signalingSubgroups: 2 })).value, 13);
  assert.equal(precursorOf(driversOf({ id: 'D9', score: 1.4, signalingSubgroups: 8 })).value, 100);
  assert.equal(precursorOf(driversOf({ id: 'D9', score: -0.2, signalingSubgroups: 0 })).value, 0);
});

test('runWeek: кладёт precursor рядом с sensitivity и совпадает с Д9 недели', () => {
  const week = '2026-10-18';
  const res = runWeek(week, { prevRegions: {}, classification: {}, recalcIndex: {} });
  assert.deepEqual(res.errors, []);
  assert.ok(res.precursor, 'precursor в результате прогона');
  assert.equal(Number.isInteger(res.precursor.value), true);
  assert.ok(res.precursor.value >= 0 && res.precursor.value <= 100);
  assert.equal(Number.isInteger(res.precursor.signalingSubgroups), true);

  // Ожидание — из входа недели тем же публичным маппингом, а не из runWeek.
  const input = JSON.parse(readFileSync(path.join(ROOT, 'calc', 'input', `${week}.json`), 'utf8'));
  const expected = precursorOf(buildDrivers(input));
  assert.deepEqual(res.precursor, expected);
});

test('renderGlobal: пишет s.precursor только когда поле задано', () => {
  const snap = { published: '2026-10-18', methodology: '3.0' };
  const meta = {
    dataState: 'published', q: 1, nullWeight: 0,
    coverage: { coveredDrivers: 9, totalDrivers: 9 }, confidence: 'full',
    recalc: { at: '2026-10-18T00:00:00.000Z', reason: 'r' },
  };
  const withField = renderGlobal('2026-10-18', snap, { index: 64, delta: 8 }, {
    ...meta, precursor: { value: 42, signalingSubgroups: 3 },
  });
  assert.ok(withField.includes('s.precursor'), withField);
  assert.ok(withField.includes('"value": 42'), withField);
  assert.ok(withField.includes('"signalingSubgroups": 3'), withField);

  const without = renderGlobal('2026-10-18', snap, { index: 64, delta: 8 }, meta);
  assert.ok(!without.includes('s.precursor'), without);
});
