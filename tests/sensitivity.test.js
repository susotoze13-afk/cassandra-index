// sensitivity.test.js — метрика чувствительности недели (R02): leave-one-out
// пересчёт по доменам и кластерам критериальных источников, выход — одно
// число sensitivity = max|ΔI| в п.п. Шов — чистая функция sensitivityScore
// из calc/sensitivity.js; опциональность поля quality-блока — validate из js/data.js.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { sensitivityScore } from '../calc/sensitivity.js';
import { aggregateDrivers } from '../calc/engine.js';
import { buildDrivers } from '../calc/calibrate.js';
import { validate } from '../js/data.js';
import { PARAMS } from '../calc/params.js';

const src = (domain, cluster) => ({ url: `https://${domain}/a`, date: '2026-10-01', cluster });

// Вход «монополия»: все покрытые критерии всех драйверов держатся на одном
// домене одного кластера. D1..D7 — по 3 покрытых эскалационных критерия
// value 1 (покрытие 3/5..3/6 ≥ 0.5 → score 1), D8/Д9 не покрыты.
function monopolyInput() {
  const one = [src('only.example', 'A-mainstream')];
  const criteria = {};
  const esc3 = [
    ['D1.1', 'D1.2', 'D1.3'],
    ['D2.1', 'D2.2', 'D2.3'],
    ['D3.1', 'D3.2', 'D3.3'],
    ['D4.1', 'D4.2', 'D4.3'],
    ['D5.1', 'D5.2', 'D5.3'],
    ['D6.1', 'D6.2', 'D6.3'],
    ['D7.1', 'D7.2', 'D7.3'],
  ];
  for (const ids of esc3) {
    for (const id of ids) criteria[id] = { value: 1, covered: true, sources: one };
  }
  return { week: '2026-10-11', criteria };
}

// Вход «кластер сильнее домена»: D1 покрыт тремя критериями — D1.1 держится
// на двух доменах одного кластера (исключение любого домена не роняет
// покрытие), D1.2 и D1.3 — на третьем домене второго кластера. Исключение
// кластера K1 роняет D1.1 → 2/6 < 0.5 → драйвер null → индекс падает до 0
// (без инерции, §5.2: curve(0) = 0). Разбор вручную: baseline S = 1 →
// internal 100; leave-one-cluster K1 → internal 0 → |ΔI| = 100.
function clusterInput() {
  const criteria = {
    'D1.1': { value: 1, covered: true, sources: [src('a.example', 'K1'), src('b.example', 'K1')] },
    'D1.2': { value: 1, covered: true, sources: [src('c.example', 'K2')] },
    'D1.3': { value: 1, covered: true, sources: [src('c.example', 'K2')] },
  };
  return { week: '2026-10-11', criteria };
}

test('вырожденный вход без источников → null, не ложный 0 (R02.3)', () => {
  const input = { week: '2026-10-11', criteria: { 'D1.1': null, 'D2.1': null } };
  assert.equal(sensitivityScore(input, {}, PARAMS), null);
});

test('домен-монополия → большой sensitivity; детерминизм', () => {
  const input = monopolyInput();
  const s = sensitivityScore(input, {}, PARAMS);
  assert.equal(typeof s, 'number');
  assert.ok(s > 5, `порог пометки R02.1 — 5 п.п.; ожидался sensitivity > 5, got ${s}`);
  // Исключение монопольного домена лишает все драйверы покрытия → internal 0
  // (известная величина из формул §5.2), значит sensitivity = baseline.internal.
  const baseline = aggregateDrivers(buildDrivers(input, PARAMS), PARAMS, {});
  assert.equal(s, Math.round(baseline.internal * 10) / 10);
  assert.equal(sensitivityScore(input, {}, PARAMS), s);
});

test('кластерный тест ловит то, что доменный не ловит; max|ΔI| = 100', () => {
  const input = clusterInput();
  assert.equal(sensitivityScore(input, {}, PARAMS), 100);
});

function validSnapshot() {
  const region = { index: 50, delta: 0 };
  const drvSource = { title: { ru: 'И', en: 'S' }, url: 'https://example.com/a', domain: 'example.com', date: '2026-10-01' };
  const driver = {
    observation: { ru: 'Н', en: 'O' }, why: { ru: 'П', en: 'W' },
    contribution: 'high', confidence: 'high', sources: [drvSource, { ...drvSource, url: 'https://example.org/b', domain: 'example.org' }],
  };
  return {
    published: '2026-10-11', through: '2026-10-11', methodology: '2.0', dataState: 'published',
    global: { index: 50, delta: 0 },
    regions: Object.fromEntries(['europe', 'east-asia', 'middle-east', 'north-america', 'south-asia', 'africa'].map((id) => [id, { ...region }])),
    trend: Array.from({ length: 12 }, (_, i) => ({ date: `2026-07-${String(20 + i).padStart(2, '0')}`, value: 50 })),
    drivers: [driver, { ...driver, contribution: 'medium' }, { ...driver, contribution: 'low' }],
    sources: [drvSource],
  };
}

test('поле sensitivity опционально: без поля и с полем — ок, битое поле — ошибка', () => {
  assert.equal(validate(validSnapshot()).ok, true);
  assert.equal(validate({ ...validSnapshot(), sensitivity: 12.5 }).ok, true);
  assert.equal(validate({ ...validSnapshot(), sensitivity: 0 }).ok, true);
  assert.equal(validate({ ...validSnapshot(), sensitivity: '12.5' }).ok, false);
  assert.equal(validate({ ...validSnapshot(), sensitivity: -1 }).ok, false);
});

// Реальный вход 2026-10-04: значение пинится независимым прогоном пайплайна
// (конвенция tests/data.test.js) — страховка от молчаливого сдвига метрики на
// живых данных; ctx {} — контекст цепочки фиксирован, детерминированность
// от него не зависит.
test('реальная неделя 2026-10-04: sensitivity пинится', () => {
  const input = JSON.parse(readFileSync(new URL('../calc/input/2026-10-04.json', import.meta.url), 'utf8'));
  assert.equal(sensitivityScore(input, {}, PARAMS), 11.8);
});
