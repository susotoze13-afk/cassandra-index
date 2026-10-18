// Панель доверия (R01, R02, R03, R04, R08, R10, R11, R18): чистый шов
// trustFacts(snapshot) — пять фактов + детали без DOM; порог чувствительности
// пиннится равным PARAMS.sensitivityThreshold (5); тексты фазы 1 без темы
// «инфошум ≠ реальные действия» (ADR 0033 §6). Ожидаемые значения — из
// спецификации/ADR, не из кода под тестом.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { trustFacts, factsLine, showSensitivity, TRUST_SENSITIVITY_THRESHOLD } from '../js/sections/trust.js';
import { DICTS } from '../js/i18n.js';
import { CRITERIA_LIST } from '../js/criteria.js';

// Синтетический снапшот v1: 4 источника (A×2, B×1, C×1; один гос-СМИ),
// 6 регионов, 2 из них слепые, покрытие 27/46, чувствительность 5.3.
const SNAP = {
  published: '2026-09-13',
  through: '2026-09-13',
  methodology: '3.0',
  dataState: 'published',
  global: { index: 43, delta: 1 },
  regions_taxonomy: '1.0',
  regions: {
    europe: { index: 40, delta: 0 },
    'east-asia': { index: 50, delta: 2, background: true },
    'middle-east': { index: 55, delta: 1 },
    'north-america': { index: 30, delta: -1 },
    'south-asia': { index: 45, delta: 0, background: true },
    africa: { index: 48, delta: 3 },
  },
  sources: [
    { cluster_id: 'A-mainstream', state_affiliated: false },
    { cluster_id: 'A-mainstream', state_affiliated: false },
    { cluster_id: 'B-state-media', state_affiliated: true },
    { cluster_id: 'C-registries', state_affiliated: false },
  ],
  coverageCriteria: { covered: 27, total: 46 },
  sensitivity: 5.3,
};

test('trustFacts: пять фактов + детали (значения разобраны вручную)', () => {
  const f = trustFacts(SNAP);
  assert.equal(f.criteriaTotal, CRITERIA_LIST.length);
  assert.equal(f.criteriaTotal, 46);
  assert.equal(f.sources, 4);
  assert.equal(f.clusters, 3);
  assert.equal(f.blindRegions, 2);
  assert.equal(f.methodology, '3.0');
  assert.deepEqual(f.coverage, { covered: 27, total: 46 });
  assert.equal(f.sensitivity, 5.3);
  assert.deepEqual(f.affiliated, { count: 1, total: 4 });
  // Распределение: по убыванию числа, затем по id.
  assert.deepEqual(f.clusterCounts, [
    ['A-mainstream', 2],
    ['B-state-media', 1],
    ['C-registries', 1],
  ]);
});

// R05i.1: источники, подкреплённые хотя бы одной цитатой — счётчик для раскрытия
// витрины. Фикстура: 4 источника, цитаты у первого и четвёртого; пустой список
// у второго и поле у третьего отсутствует — «с цитатой» 2 из 4.
test('trustFacts: quoted — источники с ≥1 цитатой, total — все источники', () => {
  const snap = {
    ...SNAP,
    sources: [
      { cluster_id: 'A-mainstream', state_affiliated: false, quotes: [{ criterion: 'D1.1', text: 'Фрагмент А' }] },
      { cluster_id: 'A-mainstream', state_affiliated: false, quotes: [] },
      { cluster_id: 'B-state-media', state_affiliated: true },
      { cluster_id: 'C-registries', state_affiliated: false, quotes: [
        { criterion: 'D5.1', text: 'Фрагмент Б' },
        { criterion: 'D9.1', text: 'Фрагмент В' },
      ] },
    ],
  };
  const f = trustFacts(snap);
  assert.deepEqual(f.quoted, { count: 2, total: 4 });
  // Пять фактов строки не изменились от нового поля.
  assert.equal(factsLine('ru', f).split(' · ').length, 5);
  // Недели без поля quotes — 0 из N, не падение.
  assert.deepEqual(trustFacts(SNAP).quoted, { count: 0, total: 4 });
});

test('trustFacts: слепые регионы считаются по набору недели (v2 — 12 id)', () => {
  const snap = {
    ...SNAP,
    regions_taxonomy: '2.0',
    regions: {
      'russia-belarus': { index: 40, delta: 0, background: true },
      'ukraine-moldova': { index: 41, delta: 1, background: true },
      'baltic': { index: 42, delta: 0 },
      balkans: { index: 43, delta: 0 },
      'eu-north-europe': { index: 44, delta: 0 },
      'south-caucasus': { index: 45, delta: 0 },
      'central-asia': { index: 46, delta: 0 },
      'east-asia': { index: 47, delta: 0 },
      'middle-east': { index: 48, delta: 0 },
      'north-america': { index: 49, delta: 0 },
      'south-asia': { index: 50, delta: 0, background: true },
      africa: { index: 51, delta: 0 },
    },
  };
  assert.equal(trustFacts(snap).blindRegions, 3);
});

// R02: строка показывает ровно пять фактов в порядке ADR —
// критерии · источники · кластеры · слепой регион · методология.
// Ожидаемая строка разобрана вручную по словарю (46 → many, 4/3/2 → few),
// не собрана тем же вызовом t(), что и код под тестом.
test('factsLine: ровно пять фактов в порядке ADR', () => {
  const parts = factsLine('ru', trustFacts(SNAP)).split(' · ');
  assert.equal(parts.length, 5);
  assert.deepEqual(parts, [
    '46 критериев',
    '4 источника',
    '3 независимых кластера',
    '2 слепых региона',
    'методология 3.0',
  ]);
});

// R02.1: отсутствующая методология → «н/д» (i18n `trust.na`), строка не рушится.
test('factsLine: отсутствующая методология → «н/д», строка остаётся из пяти фактов', () => {
  const parts = factsLine('ru', trustFacts({ ...SNAP, methodology: null })).split(' · ');
  assert.equal(parts.length, 5);
  assert.equal(parts[4], 'н/д');
});

// R08: решение о показе строки чувствительности — чистый шов без DOM;
// граница: 4.99 — нет строки, 5 — есть.
test('showSensitivity: граница 4.99 — нет, 5 — есть; null/0 — нет', () => {
  assert.equal(showSensitivity(4.99), false);
  assert.equal(showSensitivity(5), true);
  assert.equal(showSensitivity(5.3), true);
  assert.equal(showSensitivity(0), false);
  assert.equal(showSensitivity(null), false);
});

test('trustFacts: null без снапшота или без глобального индекса', () => {
  assert.equal(trustFacts(null), null);
  assert.equal(trustFacts(undefined), null);
  assert.equal(trustFacts({}), null);
  assert.equal(trustFacts({ ...SNAP, global: null }), null);
});

test('trustFacts: отсутствие coverageCriteria/sensitivity → null (панель покажет «н/д»)', () => {
  const f = trustFacts({ ...SNAP, coverageCriteria: undefined, sensitivity: undefined });
  assert.equal(f.coverage, null);
  assert.equal(f.sensitivity, null);
});

test('trustFacts: битая форма coverageCriteria → null, не исключение', () => {
  assert.equal(trustFacts({ ...SNAP, coverageCriteria: { covered: 50, total: 46 } }).coverage, null);
  assert.equal(trustFacts({ ...SNAP, coverageCriteria: { covered: 1.5, total: 46 } }).coverage, null);
  assert.equal(trustFacts({ ...SNAP, coverageCriteria: { covered: 1, total: 0 } }).coverage, null);
});

// R08/R18: порог = PARAMS.sensitivityThreshold (calc/params.js), сайт calc/ не читает.
test('TRUST_SENSITIVITY_THRESHOLD = 5 (= PARAMS.sensitivityThreshold)', () => {
  assert.equal(TRUST_SENSITIVITY_THRESHOLD, 5);
});

// R11: в текстах фазы 1 (trust.*, share.*) нет темы «инфошум ≠ реальные действия».
test('тексты trust.*/share.*: нет «инфошум» и «реальные действия»', () => {
  const banned = ['инфошум', 'реальные действия'];
  const keys = Object.keys(DICTS.ru).filter((k) => k.startsWith('trust.') || k.startsWith('share.'));
  assert.ok(keys.length > 0);
  for (const key of keys) {
    for (const word of banned) {
      assert.ok(!DICTS.ru[key].toLowerCase().includes(word), `${key} содержит «${word}»`);
    }
  }
});

// R02.1: факты строки — через i18n; отсутствующее число — ключ «н/д».
test('i18n: ключи пяти фактов и «н/д» существуют', () => {
  for (const key of [
    'trust.fact.criteria', 'trust.fact.sources', 'trust.fact.clusters',
    'trust.fact.blind', 'trust.fact.methodology', 'trust.na',
    'trust.details.clusters', 'trust.details.affiliated',
    'trust.details.coverage', 'trust.details.coverage.na', 'trust.details.sensitive',
    'trust.details.quotes', 'sources.quote.label',
    'trust.title',
  ]) {
    assert.equal(typeof DICTS.ru[key], 'string', `нет ключа ${key}`);
  }
  assert.equal(DICTS.ru['trust.details.quotes'], 'С цитатой: {n} из {total}');
  assert.equal(DICTS.ru['sources.quote.label'], 'Цитата');
});
