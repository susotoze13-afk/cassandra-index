import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatDelta, deltaArrow, refineRegionFromCoords } from '../js/sections/hero.js';

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

// refineRegionFromCoords: грубые bounding-box демо-регионов для «Уточнить точнее» (§5.8).
// Ожидания — географические факты, не код под тестом.
test('refineRegionFromCoords: столицы шести регионов', () => {
  assert.equal(refineRegionFromCoords(52.37, 4.9), 'europe');        // Амстердам
  assert.equal(refineRegionFromCoords(35.68, 139.69), 'east-asia');  // Токио
  assert.equal(refineRegionFromCoords(33.9, 35.5), 'middle-east');   // Бейрут
  assert.equal(refineRegionFromCoords(40.71, -74.0), 'north-america'); // Нью-Йорк
  assert.equal(refineRegionFromCoords(19.08, 72.88), 'south-asia');  // Мумбаи
  assert.equal(refineRegionFromCoords(-1.29, 36.82), 'africa');      // Найроби
  assert.equal(refineRegionFromCoords(55.75, 37.6), 'europe');       // Москва
});

test('refineRegionFromCoords: вне справочника — null, без изменений', () => {
  // Долготное решение: западнее −45° — Северная Америка, даже океан (принято ревью).
  assert.equal(refineRegionFromCoords(0, -140), 'north-america');
  assert.equal(refineRegionFromCoords(-33.9, 151.2), null); // Сидней
  assert.equal(refineRegionFromCoords(null, null), null);
  assert.equal(refineRegionFromCoords(95, 10), null);    // широта вне диапазона
});
