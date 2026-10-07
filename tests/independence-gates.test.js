// Ворота независимости источников (таск 01, R01, §4.1.2): покрытый критерий
// входа недели ≥ PARAMS.independenceGateFrom обязан иметь источники из
// ≥2 разных кластеров whitelist ИЛИ ≥1 источник типа primary|OSINT
// (Provisional Primary). Недели раньше даты ворот проверке не подлежат
// (forward-only, A2: опубликованная цепочка 08-30…10-04 не трогается).
// Чистый шов — calc/calc.js validateSourceIndependence(input, params).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateSourceIndependence } from '../calc/calc.js';
import { PARAMS } from '../calc/params.js';

const FROM = PARAMS.independenceGateFrom;

const src = (cluster, type) => ({ url: 'https://example.com/x', date: FROM, cluster, ...(type ? { type } : {}) });

const input = (week, criteria) => ({ week, criteria });

test('неделя раньше independenceGateFrom — проверка не применяется', () => {
  const i = input('2026-10-04', {
    'D1.1': { covered: true, value: 0.5, sources: [src('A-mainstream')] },
  });
  assert.deepEqual(validateSourceIndependence(i, PARAMS), []);
});

test('покрытый критерий на 1 кластер без primary/OSINT — ошибка входа', () => {
  const i = input(FROM, {
    'D1.1': { covered: true, value: 0.5, sources: [src('A-mainstream'), src('A-mainstream')] },
  });
  const errors = validateSourceIndependence(i, PARAMS);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /^criteria\.D1\.1:/);
  assert.match(errors[0], /primary\|OSINT/);
});

test('те же источники из 2 разных кластеров — проходит', () => {
  const i = input(FROM, {
    'D1.1': { covered: true, value: 0.5, sources: [src('A-mainstream'), src('B-state-media')] },
  });
  assert.deepEqual(validateSourceIndependence(i, PARAMS), []);
});

test('1 кластер + 1 primary (Provisional Primary) — проходит', () => {
  const i = input(FROM, {
    'D1.1': { covered: true, value: 0.5, sources: [src('A-mainstream'), src('A-mainstream', 'primary')] },
  });
  assert.deepEqual(validateSourceIndependence(i, PARAMS), []);
});

test('1 кластер + 1 OSINT — проходит', () => {
  const i = input(FROM, {
    'D1.1': { covered: true, value: 0.5, sources: [src('A-mainstream'), src('D-satellite-osint', 'OSINT')] },
  });
  assert.deepEqual(validateSourceIndependence(i, PARAMS), []);
});

test('слепые (null) критерии проверке не подлежат', () => {
  const i = input(FROM, {
    'D1.1': null,
    'D2.1': { covered: true, value: 0.5, sources: [src('A-mainstream'), src('C-registries')] },
  });
  assert.deepEqual(validateSourceIndependence(i, PARAMS), []);
});

test('каждый покрытый критерий проверяется сам — ошибка указывает на нарушителя', () => {
  const i = input(FROM, {
    'D1.1': { covered: true, value: 0.5, sources: [src('A-mainstream'), src('C-registries')] },
    'D5.3': { covered: true, value: 0.5, sources: [src('F-financial')] },
  });
  const errors = validateSourceIndependence(i, PARAMS);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /^criteria\.D5\.3:/);
});

test('дата ворота сравнивается строково (YYYY-MM-DD): неделя сразу после порога — ворота действуют', () => {
  const i = input('2026-10-11', {
    'D1.1': { covered: true, value: 0.5, sources: [src('A-mainstream')] },
  });
  assert.equal(validateSourceIndependence(i, PARAMS).length, 1);
});
