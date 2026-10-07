// Ядро источников (таск 03, R03, ADR 0020): PARAMS.coreSources — домен →
// кластер (A/B/C/F); вход недели, где ядро представлено меньше чем
// PARAMS.coreMinDomains уникальными доменами, получает warning в отчёте
// расчёта (не ворота — запись не блокируется). Чистый шов — calc/calc.js
// checkCoreSources(input, params): пересечение доменов источников входа
// (критериальные + top-level) с ядром.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkCoreSources } from '../calc/calc.js';
import { PARAMS } from '../calc/params.js';

const CORE = PARAMS.coreSources;
const MIN = PARAMS.coreMinDomains;

const src = (url) => ({ url, date: '2026-10-04' });

// Вход: критериальные источники по url + top-level sources с полем domain.
const input = (criteria, sources) => ({ week: '2026-10-11', criteria, sources });

test('ядро покрывает кластеры A, B, C, F (по ≥1 домену)', () => {
  const clusters = new Set(Object.values(CORE));
  for (const c of ['A-mainstream', 'B-state-media', 'C-registries', 'F-financial']) {
    assert.ok(clusters.has(c), `кластер ${c} представлен в coreSources`);
  }
});

test('вход с ядром ≥ coreMinDomains уникальных доменов — без пропусков', () => {
  const domains = Object.keys(CORE).slice(0, MIN);
  const criteria = Object.fromEntries(domains.map((d, i) => [`D1.${i + 1}`, {
    covered: true, value: 0.5, sources: [src(`https://${d}/a`), src(`https://${d}/b`)],
  }]));
  const r = checkCoreSources(input(criteria), PARAMS);
  assert.equal(r.count, MIN);
  assert.deepEqual(r.missing, Object.keys(CORE).slice(MIN));
});

test('домены считаются уникально: тот же домен в 2 критериях — 1 к ядру', () => {
  const d = Object.keys(CORE)[0];
  const criteria = {
    'D1.1': { covered: true, value: 0.5, sources: [src(`https://${d}/a`)] },
    'D2.1': { covered: true, value: 0.5, sources: [src(`https://${d}/b`)] },
  };
  const r = checkCoreSources(input(criteria), PARAMS);
  assert.equal(r.count, 1);
  assert.equal(r.missing.length, Object.keys(CORE).length - 1);
});

test('top-level sources с полем domain тоже засчитываются', () => {
  const d = Object.keys(CORE)[0];
  const r = checkCoreSources(input({}, [
    { url: `https://${d}/x`, domain: d },
  ]), PARAMS);
  assert.equal(r.count, 1);
  assert.ok(!r.missing.includes(d));
});

test('вход без ядра — count 0, missing весь список (warning, не ошибка)', () => {
  const r = checkCoreSources(input({
    'D1.1': { covered: true, value: 0.5, sources: [src('https://unknown.example/x')] },
  }), PARAMS);
  assert.equal(r.count, 0);
  assert.equal(r.missing.length, Object.keys(CORE).length);
});
