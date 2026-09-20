import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DEMO_MODES, CRITICAL_DEMO_INDEX, applyDemo, demoModeLabel } from '../js/demo.js';

// A01 / История 28: ровно 4 состояния — крит-режим, задержка, недостаточно данных, модель недоступна.
test('DEMO_MODES: 4 состояния демо-панели', () => {
  assert.deepEqual(DEMO_MODES, ['critical', 'delayed', 'insufficient', 'unavailable']);
});

// Крит-режим в демо: подменяет только копию снапшота (оригинал не мутирует), порог ≥81 держится.
test('applyDemo critical: индекс копии = 85, оригинал не тронут', () => {
  const state = {
    lang: 'ru',
    dataState: 'published',
    unavailable: false,
    snapshot: { dataState: 'published', global: { index: 72, delta: 6 } },
  };
  const demo = applyDemo(state, 'critical');
  assert.equal(demo.snapshot.global.index, CRITICAL_DEMO_INDEX);
  assert.ok(demo.snapshot.global.index >= 81);
  assert.equal(demo.dataState, 'published');
  assert.equal(state.snapshot.global.index, 72); // исходный снапшот не изменился
  assert.notEqual(demo.snapshot, state.snapshot);
});

// Задержка и недостаточно данных: меняется только состояние данных (бейдж §7).
test('applyDemo delayed/insufficient: состояние данных в снапшоте и appState', () => {
  const base = {
    lang: 'ru',
    dataState: 'published',
    unavailable: false,
    snapshot: { dataState: 'published', global: { index: 72, delta: 6 } },
  };
  const d = applyDemo(base, 'delayed');
  assert.equal(d.dataState, 'delayed');
  assert.equal(d.snapshot.dataState, 'delayed');
  assert.equal(d.snapshot.global.index, 72);
  const i = applyDemo(base, 'insufficient');
  assert.equal(i.dataState, 'insufficient');
  assert.equal(i.snapshot.dataState, 'insufficient');
  assert.equal(base.dataState, 'published'); // база не мутирована
});

// Модель недоступна: синтетическое недоступное состояние, без глобальных чисел (не белый экран — UI).
test('applyDemo unavailable: unavailable=true, dataState=unavailable, global=null', () => {
  const state = {
    lang: 'en',
    dataState: 'published',
    unavailable: false,
    snapshot: { dataState: 'published', global: { index: 72, delta: 6 }, regions: { europe: { index: 74 } } },
  };
  const demo = applyDemo(state, 'unavailable');
  assert.equal(demo.unavailable, true);
  assert.equal(demo.dataState, 'unavailable');
  assert.equal(demo.snapshot.dataState, 'unavailable');
  assert.equal(demo.snapshot.global, null);
  assert.equal(state.unavailable, false); // исходное состояние не изменилось
});

// Выключение демо: null-режим возвращает состояние как есть — в продакшен-поток не вмешивается.
test('applyDemo null: состояние без изменений', () => {
  const state = { lang: 'ru', dataState: 'published', snapshot: { global: { index: 72 } } };
  assert.equal(applyDemo(state, null), state);
  assert.equal(applyDemo(state, 'off'), state);
});

// Локализованные названия режимов (панель — на языке интерфейса).
test('demoModeLabel: RU и EN', () => {
  assert.equal(demoModeLabel('ru', 'critical'), 'Критический режим');
  assert.equal(demoModeLabel('en', 'critical'), 'Critical mode');
  assert.equal(demoModeLabel('ru', 'unavailable'), 'Модель недоступна');
  assert.equal(demoModeLabel('en', 'bogus'), 'demo.bogus'); // фолбэк словаря — сам ключ
});
