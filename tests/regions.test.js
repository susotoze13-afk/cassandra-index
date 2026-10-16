import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rankedRegions, statusLabel } from '../js/sections/regions.js';

// §4.6 — ranked-лист «Где риск изменился сильнее всего»: регионы НАБОРА
// отображаемой недели (ADR 0028), порядок — по величине недельного изменения (|Δ|),
// при равенстве — рост выше снижения. v1-неделя (без regions_taxonomy) — 6 строк,
// v2-неделя (regions_taxonomy:'2.0') — 12; чужой набор не подмешивается.
const V1 = {
  regions: {
    europe: { index: 70, delta: 3, status: 'very' },
    'east-asia': { index: 55, delta: 2, status: 'danger' },
    'middle-east': { index: 88, delta: 9, status: 'critical' },
    'north-america': { index: 41, delta: -1, status: 'danger' },
    'south-asia': { index: 63, delta: 4, status: 'very' },
    africa: { index: 48, delta: 1, status: 'danger' },
  },
};

const V2 = {
  regions_taxonomy: '2.0',
  regions: {
    'russia-belarus': { index: 74, delta: 5, status: 'very' },
    'ukraine-moldova': { index: 55, delta: 2, status: 'danger' },
    baltic: { index: 60, delta: -3, status: 'danger' },
    balkans: { index: 88, delta: 9, status: 'critical' },
    'eu-north-europe': { index: 41, delta: -1, status: 'danger' },
    'south-caucasus': { index: 63, delta: 4, status: 'very' },
    'central-asia': { index: 48, delta: 1, status: 'danger' },
    'east-asia': { index: 50, delta: 0, status: 'tense' },
    'middle-east': { index: 70, delta: 6, status: 'very' },
    'north-america': { index: 35, delta: -2, status: 'tense' },
    'south-asia': { index: 52, delta: -4, status: 'danger' },
    africa: { index: 45, delta: 3, status: 'danger' },
  },
};

test('rankedRegions: v1-неделя — шесть строк набора v1, сортировка по |Δ|', () => {
  const rows = rankedRegions(V1);
  assert.equal(rows.length, 6);
  assert.deepEqual(rows.map((r) => r.id), [
    'middle-east', 'south-asia', 'europe', 'east-asia', 'africa', 'north-america',
  ]);
  assert.deepEqual(rows.map((r) => r.delta), [9, 4, 3, 2, 1, -1]);
  // данные региона проходят в строку без потерь
  assert.equal(rows[0].index, 88);
  assert.equal(rows[0].status, 'critical');
});

test('rankedRegions: v2-неделя — двенадцать строк набора v2', () => {
  const rows = rankedRegions(V2);
  assert.equal(rows.length, 12);
  // порядок по |Δ|: balkans 9, middle-east 6, russia-belarus 5, south-caucasus 4,
  // south-asia −4, africa 3, baltic −3, ukraine-moldova 2, north-america −2,
  // central-asia 1, eu-north-europe −1, east-asia 0.
  assert.deepEqual(rows.map((r) => r.id), [
    'balkans', 'middle-east', 'russia-belarus', 'south-caucasus', 'south-asia',
    'africa', 'baltic', 'ukraine-moldova', 'north-america', 'central-asia',
    'eu-north-europe', 'east-asia',
  ]);
});

test('rankedRegions: набор недели решает — чужой id не подмешивается', () => {
  // v1-снапшот с v2-id в данных: 'balkans' вне набора v1 — не попадает.
  const rows = rankedRegions({ regions: { europe: { index: 70, delta: 3 }, balkans: { index: 88, delta: 9 } } });
  assert.deepEqual(rows.map((r) => r.id), ['europe']);
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
test('statusLabel: слово статуса по индексу', () => {
  assert.equal(statusLabel('ru', 88), 'критически опасно');
  assert.equal(statusLabel('ru', 41), 'опасно');
  assert.equal(statusLabel('ru', 0), 'спокойно');
  // вне шкалы / не число — пустая строка, не мусор
  assert.equal(statusLabel('ru', null), '');
  assert.equal(statusLabel('ru', 101), '');
  assert.equal(statusLabel('ru', NaN), '');
  // верхний регистр — для автономной подписи в карточке
  assert.equal(statusLabel('ru', 88, false), 'Критически опасно');
});
