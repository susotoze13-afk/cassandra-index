import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  criticalModeOn,
  badgeTone,
  isHistorical,
  historyBannerText,
} from '../js/sections/states.js';

// Крит-режим — функция данных: порог ≥81 (История 16 / Решение п.10), не кнопка.
test('criticalModeOn: включается от данных при индексе ≥81', () => {
  assert.equal(criticalModeOn({ global: { index: 81 } }), true);
  assert.equal(criticalModeOn({ global: { index: 96 } }), true);
  assert.equal(criticalModeOn({ global: { index: 80 } }), false);
  assert.equal(criticalModeOn({ global: { index: 0 } }), false);
  assert.equal(criticalModeOn(null), false);
  assert.equal(criticalModeOn({}), false);
});

// Каждое состояние данных (§7) — бейдж с текстом; тон — класс-модификатор (не только цветом).
test('badgeTone: класс-модификатор для каждого из 5 состояний, неизвестное → unavailable', () => {
  assert.equal(badgeTone('published'), 'data-state-badge--published');
  assert.equal(badgeTone('updating'), 'data-state-badge--updating');
  assert.equal(badgeTone('delayed'), 'data-state-badge--delayed');
  assert.equal(badgeTone('insufficient'), 'data-state-badge--insufficient');
  assert.equal(badgeTone('unavailable'), 'data-state-badge--unavailable');
  assert.equal(badgeTone('bogus'), 'data-state-badge--unavailable');
});

// Historical snapshot: любая неделя, не совпадающая с latest (История 20/§7).
test('isHistorical: старый снапшот помечен, текущий — нет', () => {
  assert.equal(isHistorical('2026-09-06', '2026-09-13'), true);
  assert.equal(isHistorical('2026-09-13', '2026-09-13'), false);
  assert.equal(isHistorical(null, '2026-09-13'), false);
  assert.equal(isHistorical('2026-09-13', null), false);
});

// Баннер архивного снапшота: даты просматриваемого снапшота длинным локальным
// форматом (История 20 / §7). Ожидаемые строки разобраны вручную из образца дат.
test('historyBannerText: RU и EN с датами снапшота', () => {
  const snap = { published: '2026-09-06', through: '2026-08-30' };
  assert.equal(
    historyBannerText('ru', snap),
    'Архивный снапшот: опубликован 6 сентября 2026, данные по 30 августа 2026. Значения не являются текущими.'
  );
  assert.equal(
    historyBannerText('en', snap),
    'Historical snapshot: published 6 Sep, 2026, data through 30 Aug, 2026. These values are not current.'
  );
});
