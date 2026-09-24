import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  criticalModeOn,
  badgeTone,
  isHistorical,
  historyBannerText,
  QUALITY_THRESHOLDS,
  qualityBadge,
  needsPreliminaryNote,
  pickVisibleSnapshot,
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

// --- R59: бейдж качества данных из q (пороги 0.8/0.6 — константа рядом с швом) ---

test('qualityBadge: пороги 0.8/0.6 и границы (R59)', () => {
  assert.deepEqual(QUALITY_THRESHOLDS, { high: 0.8, medium: 0.6 });
  assert.equal(qualityBadge(1), 'high');
  assert.equal(qualityBadge(0.8), 'high');     // ровно на пороге — Высокое
  assert.equal(qualityBadge(0.81), 'high');
  assert.equal(qualityBadge(0.79), 'medium');
  assert.equal(qualityBadge(0.6), 'medium');   // ровно на пороге — Среднее
  assert.equal(qualityBadge(0.59), 'low');
  assert.equal(qualityBadge(0.1684), 'low');   // демо q=0.17 (покрытие 5/45)
  assert.equal(qualityBadge(0), 'low');
  // q нет в снапшоте (недели до введения q) — бейдж не показывается
  assert.equal(qualityBadge(undefined), null);
  assert.equal(qualityBadge(null), null);
  assert.equal(qualityBadge(NaN), null);
  assert.equal(qualityBadge('0.9'), null);
});

// R61: пометка «Предварительная оценка» при q<0.6 или incompleteCoverage.
test('needsPreliminaryNote: q<0.6 или incompleteCoverage', () => {
  assert.equal(needsPreliminaryNote({ q: 0.5 }), true);
  assert.equal(needsPreliminaryNote({ q: 0.1684 }), true);
  assert.equal(needsPreliminaryNote({ q: 0.6 }), false);
  assert.equal(needsPreliminaryNote({ q: 0.9 }), false);
  assert.equal(needsPreliminaryNote({ q: 0.9, incompleteCoverage: true }), true);
  assert.equal(needsPreliminaryNote({}), false);
  assert.equal(needsPreliminaryNote(null), false);
});

// R14/R59.1: insufficient-неделя → hero на последнем валидном снапшоте.
// pickVisibleSnapshot идёт от конца списка недель и берёт первый снапшот
// с опубликованным глобальным индексом (недели 08-30…09-13 insufficient → 08-23).
test('pickVisibleSnapshot: последний снапшот с данными; недели-insufficient пропускаются', () => {
  const weeks = ['2026-08-16', '2026-08-23', '2026-08-30', '2026-09-06', '2026-09-13'];
  const map = {
    '2026-08-16': { global: { index: 63 }, dataState: 'published' },
    '2026-08-23': { global: { index: 61 }, dataState: 'published' },
    '2026-08-30': { global: null, dataState: 'insufficient', q: 0.17 },
    '2026-09-06': { global: null, dataState: 'insufficient', q: 0.17 },
    '2026-09-13': { global: null, dataState: 'insufficient', q: 0.17 },
  };
  const found = pickVisibleSnapshot(weeks, (w) => map[w]);
  assert.equal(found.week, '2026-08-23');
  assert.equal(found.snapshot.global.index, 61);

  // unavailable-недели не берутся, даже если в них есть число
  const withUnavailable = {
    ...map,
    '2026-09-13': { global: { index: 70 }, dataState: 'unavailable', unavailable: true },
  };
  assert.equal(
    pickVisibleSnapshot(weeks, (w) => withUnavailable[w]).week,
    '2026-08-23'
  );

  // все недели без публикации → null (overlay unavailable, История 53)
  assert.equal(
    pickVisibleSnapshot(['2026-09-13'], () => ({ global: null, dataState: 'insufficient' })),
    null
  );
  assert.equal(pickVisibleSnapshot([], () => null), null);
});
