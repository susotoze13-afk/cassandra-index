import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import {
  rankedRegions,
  orderedForDisplay,
  formatIndex,
  needsSignalsNote,
  statusLabel,
} from '../js/sections/regions.js';
import { validate } from '../js/data.js';
import { DICTS } from '../js/i18n.js';
import { loadSnapshotPart } from '../calc/calc.js';

// §4.6 — ranked-лист «Где выше риск»: регионы НАБОРА отображаемой недели
// (ADR 0028), порядок — по индексу региона по убыванию, при равенстве — по id
// (ADR 0069 §2). v1-неделя (без regions_taxonomy) — 6 строк, v2-неделя
// (regions_taxonomy:'2.0') — 12; чужой набор не подмешивается.
// Демо-недели несут целые индексы — их формат «73», не «73.0».
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

// Дробные индексы — форма 4.0 (ADR 0069 §1): две строки делят 71.6,
// равенство решается по id (baltic < ukraine-moldova).
const V2 = {
  regions_taxonomy: '2.0',
  regions: {
    'russia-belarus': { index: 72.4, delta: 5.3, status: 'very', signals: 6 },
    'ukraine-moldova': { index: 71.6, delta: 3.7, status: 'very', signals: 10 },
    baltic: { index: 71.6, delta: 3.6, status: 'very', signals: 3 },
    balkans: { index: 72.3, delta: 4.5, status: 'very', signals: 1 },
    'eu-north-europe': { index: 71.3, delta: 3.9, status: 'very', signals: 5 },
    'south-caucasus': { index: 72.6, delta: 4.9, status: 'very', signals: 1 },
    'central-asia': { index: 72.2, delta: 5.1, status: 'very', signals: 1 },
    'east-asia': { index: 72.4, delta: 5.4, status: 'very', signals: 7 },
    'middle-east': { index: 72.5, delta: 2.6, status: 'very', signals: 14 },
    'north-america': { index: 72.8, delta: 3.9, status: 'very', signals: 4 },
    'south-asia': { index: 72.2, delta: 4.7, status: 'very', signals: 1 },
    africa: { index: 72.9, delta: 5, status: 'very', signals: 3 },
  },
};

test('rankedRegions: v1-неделя — шесть строк, порядок по индексу убыванию', () => {
  const rows = rankedRegions(V1);
  assert.equal(rows.length, 6);
  // руками по индексам: 88, 70, 63, 55, 48, 41 (Δ на порядок не влияет)
  assert.deepEqual(rows.map((r) => r.id), [
    'middle-east', 'europe', 'south-asia', 'east-asia', 'africa', 'north-america',
  ]);
  assert.deepEqual(rows.map((r) => r.index), [88, 70, 63, 55, 48, 41]);
  // данные региона проходят в строку без потерь
  assert.equal(rows[0].status, 'critical');
  // демо-недели с целым индексом печатаются целыми
  assert.equal(formatIndex(rows[0].index), '88');
});

test('rankedRegions: v2-неделя — двенадцать строк, дробный порядок, равенство — по id', () => {
  const rows = rankedRegions(V2);
  assert.equal(rows.length, 12);
  // руками по индексам: africa 72.9, north-america 72.8, south-caucasus 72.6,
  // middle-east 72.5, russia-belarus 72.4, east-asia 72.4 (id: east-asia <
  // russia-belarus), balkans 72.3, central-asia 72.2, south-asia 72.2
  // (central-asia < south-asia), ukraine-moldova 71.6/baltic 71.6 (baltic <
  // ukraine-moldova), eu-north-europe 71.3.
  assert.deepEqual(rows.map((r) => r.id), [
    'africa', 'north-america', 'south-caucasus', 'middle-east', 'east-asia',
    'russia-belarus', 'balkans', 'central-asia', 'south-asia', 'baltic',
    'ukraine-moldova', 'eu-north-europe',
  ]);
  assert.deepEqual(rows.map((r) => r.index), [
    72.9, 72.8, 72.6, 72.5, 72.4, 72.4, 72.3, 72.2, 72.2, 71.6, 71.6, 71.3,
  ]);
  // поле signals проходит в строку (ADR 0069 §2 — маркер <2 строится на нём)
  assert.equal(rows.find((r) => r.id === 'balkans').signals, 1);
});

test('rankedRegions: набор недели решает — чужой id не подмешивается', () => {
  // v1-снапшот с v2-id в данных: 'balkans' вне набора v1 — не попадает.
  const rows = rankedRegions({ regions: { europe: { index: 70, delta: 3 }, balkans: { index: 88, delta: 9 } } });
  assert.deepEqual(rows.map((r) => r.id), ['europe']);
});

test('rankedRegions: нет данных / битый регион — без падения', () => {
  assert.deepEqual(rankedRegions(null), []);
  assert.deepEqual(rankedRegions({}), []);
  // регион без числового индекса (и Δ) не попадает в список
  const broken = { regions: { europe: { index: 'x', delta: 3 } } };
  assert.deepEqual(rankedRegions(broken), []);
  const brokenDelta = { regions: { europe: { index: 74, delta: 'x' } } };
  assert.deepEqual(rankedRegions(brokenDelta), []);
});

test('rankedRegions: опубликованная 11-01 — разброс 71.3…72.9, крайние строки по индексу', () => {
  const part = loadSnapshotPart('2026-11-01', 'regions');
  const { regions_taxonomy } = loadSnapshotPart('2026-11-01', 'global');
  const rows = rankedRegions({ ...part, regions_taxonomy });
  assert.equal(rows.length, 12);
  assert.equal(rows[0].id, 'africa');
  assert.equal(rows[0].index, 72.9);
  assert.equal(rows.at(-1).id, 'eu-north-europe');
  assert.equal(rows.at(-1).index, 71.3);
  // ряд монотонно не возрастает
  for (let i = 1; i < rows.length; i += 1) {
    assert.ok(rows[i - 1].index >= rows[i].index, `${rows[i].id}: индекс выше предыдущего`);
  }
});

// Q16a: личный регион — первой строкой в DOM, остальные сохраняют строгий
// порядок по индексу (перестановка, а не вторая сортировка).
test('orderedForDisplay: личный регион первым, порядок остальных не меняется', () => {
  const rows = rankedRegions(V2);
  const ordered = orderedForDisplay(rows, 'central-asia');
  assert.equal(ordered[0].id, 'central-asia');
  assert.deepEqual(
    ordered.slice(1).map((r) => r.id),
    rows.filter((r) => r.id !== 'central-asia').map((r) => r.id),
  );
  // нет личного региона / он вне списка — порядок как есть
  assert.deepEqual(orderedForDisplay(rows, null).map((r) => r.id), rows.map((r) => r.id));
  assert.deepEqual(orderedForDisplay(rows, 'atlantis').map((r) => r.id), rows.map((r) => r.id));
  assert.deepEqual(orderedForDisplay([], 'africa'), []);
});

// Q2 «В индекс можно добавить 1 знак после запятой»: формат строго из данных,
// `.0` не навязывается (образец — formatPp в contribution.js).
test('formatIndex: 73.4 → «73.4», 73 → «73», без навязанного нуля', () => {
  assert.equal(formatIndex(73.4), '73.4');
  assert.equal(formatIndex(73), '73');
  assert.equal(formatIndex(72.0), '72');
  assert.equal(formatIndex(100), '100');
  assert.equal(formatIndex(0), '0');
  // не число — пустая строка (ячейка индекса не рисуется), не «NaN»
  assert.equal(formatIndex(NaN), '');
  assert.equal(formatIndex(null), '');
  assert.equal(formatIndex(undefined), '');
});

// Q13: пометка «мало региональных сигналов» при signals < 2; поле опционально —
// демо-недели его не несут, и отсутствие не равно нулю сигналов.
test('needsSignalsNote: signals < 2 — пометка, ≥ 2 и отсутствие поля — нет', () => {
  assert.equal(needsSignalsNote({ signals: 0 }), true);
  assert.equal(needsSignalsNote({ signals: 1 }), true);
  assert.equal(needsSignalsNote({ signals: 2 }), false);
  assert.equal(needsSignalsNote({ signals: 14 }), false);
  assert.equal(needsSignalsNote({}), false, 'демо-неделя без поля — не «0 сигналов»');
  assert.equal(needsSignalsNote({ signals: 'много' }), false);
  assert.equal(needsSignalsNote(null), false);
});

// Контракт js/data.js: signals — опциональное целое ≥ 0 у региона
// (битая форма — ошибка; отсутствие валидно у демо-недель).
test('validate: signals региона — целое ≥ 0 или отсутствие', () => {
  const base = (extra) => ({
    regions: {
      europe: { index: 50, delta: 1, ...extra },
      'east-asia': { index: 50, delta: 1 },
      'middle-east': { index: 50, delta: 1 },
      'north-america': { index: 50, delta: 1 },
      'south-asia': { index: 50, delta: 1 },
      africa: { index: 50, delta: 1 },
    },
  });
  const signalsErrors = (snap) =>
    validate(snap).errors.filter((e) => e.includes('.signals'));
  assert.deepEqual(signalsErrors(base({ signals: 3 })), []);
  assert.deepEqual(signalsErrors(base({ signals: 0 })), []);
  assert.deepEqual(signalsErrors(base({})), []);
  for (const bad of [-1, 1.5, '2', null, NaN]) {
    assert.ok(signalsErrors(base({ signals: bad })).length > 0, `signals=${String(bad)} принят`);
  }
});

// Ключи словаря секции: пометка о сигналах — текстом, не только цветом (§12),
// и абзац методологии, объясняющий порог (R10/ADR 0069 §2).
test('i18n: ключи region.signals.low и method.regional.lowSignals', () => {
  assert.equal(typeof DICTS.ru['region.signals.low'], 'string');
  assert.ok(DICTS.ru['region.signals.low'].trim() !== '');
  assert.match(DICTS.ru['region.signals.low'], /мало/i);
  assert.equal(typeof DICTS.ru['method.regional.lowSignals'], 'string');
  assert.match(DICTS.ru['method.regional.lowSignals'], /сигнал/i);
  // раздел методологии действительно рендерит ключ (а не ключ в пустоту)
  const root = path.resolve(import.meta.dirname, '..');
  const src = readFileSync(path.join(root, 'js', 'sections', 'methodology.js'), 'utf8');
  assert.ok(src.includes('method.regional.lowSignals'), 'методология не выводит ключ');
  // строка-пометка в строке региона собрана из словаря, не литералом
  const regions = readFileSync(path.join(root, 'js', 'sections', 'regions.js'), 'utf8');
  assert.ok(regions.includes("'region.signals.low'"), 'строка региона не использует ключ');
  // стиль пометки — токены палитры
  const css = readFileSync(path.join(root, 'css', 'styles.css'), 'utf8');
  const rule = /\.region-signals-low \{([\s\S]*?)\}/.exec(css);
  assert.ok(rule, 'нет правила .region-signals-low');
  assert.match(rule[1], /var\(--text-(secondary|muted)\)/);
});

// §4.6 — раскрытая карточка показывает статус словами (нижний регистр, как в hero):
// слово из шкалы §10, локализованное через словарь.
test('statusLabel: слово статуса по индексу', () => {
  assert.equal(statusLabel('ru', 88), 'критически опасно');
  assert.equal(statusLabel('ru', 41), 'опасно');
  assert.equal(statusLabel('ru', 0), 'спокойно');
  // дробный индекс (4.0) тоже попадает в шкалу js/risk.js
  assert.equal(statusLabel('ru', 72.4), 'очень опасно');
  // вне шкалы / не число — пустая строка, не мусор
  assert.equal(statusLabel('ru', null), '');
  assert.equal(statusLabel('ru', 101), '');
  assert.equal(statusLabel('ru', NaN), '');
  // верхний регистр — для автономной подписи в карточке
  assert.equal(statusLabel('ru', 88, false), 'Критически опасно');
});
