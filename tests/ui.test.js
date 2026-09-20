import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deltaClass, parseWeekParam, resolveLang } from '../js/ui.js';

// Класс тона Δ выводится из risk.deltaTone (единый каскад §12): знаковые
// ветки в секциях не пересчитывают маппинг заново.
test('deltaClass: класс тона Δ из risk.deltaTone', () => {
  assert.equal(deltaClass(6), 'delta--rise');
  assert.equal(deltaClass(-3), 'delta--fall');
  assert.equal(deltaClass(0), 'delta--same');
  assert.equal(deltaClass(NaN), null);
  assert.equal(deltaClass(null), null);
});

test('parseWeekParam: строгий YYYY-MM-DD из query-строки', () => {
  assert.equal(parseWeekParam('?week=2026-09-13'), '2026-09-13');
  assert.equal(parseWeekParam('?foo=1&week=2026-08-02'), '2026-08-02');
  assert.equal(parseWeekParam('?week=13-09-2026'), null);
  assert.equal(parseWeekParam('?week=2026-9-13'), null);
  assert.equal(parseWeekParam('?week='), null);
  assert.equal(parseWeekParam(''), null);
  assert.equal(parseWeekParam(null), null);
});

test('resolveLang: без хранилища и navigator — дефолт ru (§11.1)', () => {
  assert.equal(resolveLang(), 'ru');
});
