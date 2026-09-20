import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rankedRegions, statusLabel } from '../js/sections/regions.js';

// §4.6 — ranked-лист «Где риск изменился сильнее всего»: все 6 регионов,
// порядок — по величине недельного изменения (|Δ|), при равенстве — рост выше снижения.
const DEMO = {
  regions: {
    europe: { index: 74, delta: 5, status: 'very' },
    'east-asia': { index: 55, delta: 2, status: 'danger' },
    'middle-east': { index: 88, delta: 9, status: 'critical' },
    'north-america': { index: 41, delta: -1, status: 'danger' },
    'south-asia': { index: 63, delta: 4, status: 'very' },
    africa: { index: 48, delta: 1, status: 'danger' },
  },
};

test('rankedRegions: все 6 регионов, сортировка по |Δ|', () => {
  const rows = rankedRegions(DEMO);
  assert.equal(rows.length, 6);
  assert.deepEqual(rows.map((r) => r.id), [
    'middle-east', 'europe', 'south-asia', 'east-asia', 'africa', 'north-america',
  ]);
  assert.deepEqual(rows.map((r) => r.delta), [9, 5, 4, 2, 1, -1]);
  // данные региона проходят в строку без потерь
  assert.equal(rows[0].index, 88);
  assert.equal(rows[0].status, 'critical');
});

test('rankedRegions: нет данных / битый регион — без падения', () => {
  assert.deepEqual(rankedRegions(null), []);
  assert.deepEqual(rankedRegions({}), []);
  // регион без числового Δ не попадает в список
  const broken = { regions: { europe: { index: 74, delta: 'x' } } };
  assert.deepEqual(rankedRegions(broken), []);
});

// §4.6 — раскрытая карточка показывает статус словами (нижний регистр, как в hero):
// слово из шкалы §10, локализованное через словарь.
test('statusLabel: слово статуса по индексу, оба языка', () => {
  assert.equal(statusLabel('ru', 88), 'критически опасно');
  assert.equal(statusLabel('en', 88), 'critically dangerous');
  assert.equal(statusLabel('ru', 41), 'опасно');
  assert.equal(statusLabel('en', 41), 'dangerous');
  assert.equal(statusLabel('ru', 0), 'спокойно');
  assert.equal(statusLabel('en', 100), 'extreme threat');
  // вне шкалы / не число — пустая строка, не мусор
  assert.equal(statusLabel('ru', null), '');
  assert.equal(statusLabel('ru', 101), '');
  assert.equal(statusLabel('en', NaN), '');
  // верхний регистр — для автономной подписи в карточке
  assert.equal(statusLabel('ru', 88, false), 'Критически опасно');
  assert.equal(statusLabel('en', 88, false), 'Critically dangerous');
});
