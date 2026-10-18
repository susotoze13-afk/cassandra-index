import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatDelta, deltaArrow, refineRegionFromCoords, isBackgroundRegion, displayedPlace,
} from '../js/sections/hero.js';

// §4.2.3 — изменение со знаком и стрелкой; значения не только цветом (§12).
test('formatDelta: знак у числа', () => {
  assert.equal(formatDelta(6), '+6');
  assert.equal(formatDelta(-3), '-3');
  assert.equal(formatDelta(0), '0');
  assert.equal(formatDelta(null), '0');
});

test('deltaArrow: направление изменения', () => {
  assert.equal(deltaArrow(6), '↑');
  assert.equal(deltaArrow(-3), '↓');
  assert.equal(deltaArrow(0), '→');
  assert.equal(deltaArrow(null), '→');
});

// R02 — запись региона с background:true — слепой регион: его Δ по построению равна
// глобальной и не подаётся как региональная динамика. Флаг обязателен только в новых
// записях; отсутствие (старые данные) = false — дельта показывается как раньше.
test('isBackgroundRegion: флаг из записи региона, дефолт false', () => {
  assert.equal(isBackgroundRegion({ index: 68, delta: -2, background: true }), true);
  assert.equal(isBackgroundRegion({ index: 68, delta: -2 }), false);
  assert.equal(isBackgroundRegion({ index: 68, delta: -2, background: false }), false);
  assert.equal(isBackgroundRegion(null), false);
  assert.equal(isBackgroundRegion({}), false);
});

// refineRegionFromCoords: грубые bounding-box регионов v2 (ADR 0028) для «Уточнить
// точнее» (§5.8). Ожидания — географические факты (столицы регионов), не код под
// тестом: по одному якорю на каждый из 12 регионов.
test('refineRegionFromCoords: столицы двенадцати регионов v2', () => {
  assert.equal(refineRegionFromCoords(55.75, 37.6), 'russia-belarus');   // Москва
  assert.equal(refineRegionFromCoords(50.45, 30.52), 'ukraine-moldova'); // Киев
  assert.equal(refineRegionFromCoords(56.95, 24.1), 'baltic');           // Рига
  assert.equal(refineRegionFromCoords(44.79, 20.47), 'balkans');         // Белград
  assert.equal(refineRegionFromCoords(52.37, 4.9), 'eu-north-europe');   // Амстердам
  assert.equal(refineRegionFromCoords(41.72, 44.8), 'south-caucasus');   // Тбилиси
  assert.equal(refineRegionFromCoords(43.24, 76.9), 'central-asia');     // Алматы
  assert.equal(refineRegionFromCoords(35.68, 139.69), 'east-asia');      // Токио
  assert.equal(refineRegionFromCoords(33.9, 35.5), 'middle-east');       // Бейрут
  assert.equal(refineRegionFromCoords(40.71, -74.0), 'north-america');   // Нью-Йорк
  assert.equal(refineRegionFromCoords(19.08, 72.88), 'south-asia');      // Мумбаи
  assert.equal(refineRegionFromCoords(-1.29, 36.82), 'africa');          // Найроби
});

// Место в блоке регионального индекса: выбор страны даёт её столицу, город —
// сам себя, чип/геолокация — админцентр региона. Страна без столицы (IL/PS)
// показывает название страны, а не чужой админцентр.
test('displayedPlace: столица выбранной страны, город, админцентр региона', () => {
  const reg = { id: 'eu-north-europe', city: { ru: 'Брюссель', en: 'Brussels' } };
  const chosen = (name) => ({ name, region: 'eu-north-europe' });
  assert.equal(displayedPlace(reg, chosen({ ru: 'Берлин', en: 'Berlin' }), 'ru'), 'Берлин');
  assert.equal(displayedPlace(reg, chosen({ ru: 'Берлин', en: 'Berlin' }), 'en'), 'Berlin');
  assert.equal(displayedPlace(reg, chosen({ ru: 'Израиль', en: 'Israel' }), 'ru'), 'Израиль');
  assert.equal(displayedPlace(reg, null, 'ru'), 'Брюссель');
  // Выбор принадлежит другому региону — не подставляем чужое место.
  assert.equal(displayedPlace(reg, { name: { ru: 'Токио', en: 'Tokyo' }, region: 'east-asia' }, 'ru'), 'Брюссель');
});

test('refineRegionFromCoords: возвращает v2-идентификаторы, не легаси europe', () => {
  assert.equal(refineRegionFromCoords(55.75, 37.6), 'russia-belarus');   // Москва
  assert.equal(refineRegionFromCoords(52.37, 4.9), 'eu-north-europe');   // Амстердам
});

test('refineRegionFromCoords: вне справочника — null, без изменений', () => {
  // Долготное решение: западнее −45° — Северная Америка, даже океан (принято ревью).
  assert.equal(refineRegionFromCoords(0, -140), 'north-america');
  assert.equal(refineRegionFromCoords(-33.9, 151.2), null); // Сидней
  assert.equal(refineRegionFromCoords(null, null), null);
  assert.equal(refineRegionFromCoords(95, 10), null);    // широта вне диапазона
});
