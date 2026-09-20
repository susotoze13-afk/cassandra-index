import { test } from 'node:test';
import assert from 'node:assert/strict';
import { t, plural, date } from '../js/i18n.js';

test('t: строки из словаря RU и EN', () => {
  assert.equal(t('ru', 'hero.title'), 'Насколько близко мир подошёл к глобальному военному конфликту?');
  assert.equal(t('en', 'hero.title'), 'How close is the world to a global military conflict?');
  assert.equal(t('ru', 'nav.overview'), 'Обзор');
  assert.equal(t('en', 'nav.overview'), 'Overview');
});

test('t: подстановка переменных {var}', () => {
  assert.equal(t('ru', 'sources.count', { n: 2 }), '2 источников');
  assert.equal(t('en', 'sources.count', { n: 5 }), '5 sources');
});

test('t: неизвестный ключ возвращается как есть, неизвестный язык → fallback ru', () => {
  assert.equal(t('ru', 'no.such.key'), 'no.such.key');
  assert.equal(t('fr', 'nav.overview'), 'Обзор');
});

// Правило 1 / 2–4 / 5+ для русского
test('plural: русское правило 1 / 2–4 / 5+', () => {
  const f = ['источник', 'источника', 'источников'];
  assert.equal(plural('ru', 1, f), 'источник');
  assert.equal(plural('ru', 2, f), 'источника');
  assert.equal(plural('ru', 4, f), 'источника');
  assert.equal(plural('ru', 5, f), 'источников');
  assert.equal(plural('ru', 11, f), 'источников');
  assert.equal(plural('ru', 12, f), 'источников');
  assert.equal(plural('ru', 14, f), 'источников');
  assert.equal(plural('ru', 21, f), 'источник');
  assert.equal(plural('ru', 22, f), 'источника');
  assert.equal(plural('ru', 101, f), 'источник');
});

test('plural: английское правило 1 / N', () => {
  const f = ['source', 'sources'];
  assert.equal(plural('en', 1, f), 'source');
  assert.equal(plural('en', 2, f), 'sources');
  assert.equal(plural('en', 0, f), 'sources');
});

// §11.2: «13 сентября 2026» / «13 Sep, 2026»; короткие «13.09» / «Sep 13»
test('date: полные и короткие форматы RU/EN через Intl', () => {
  assert.equal(date('ru', '2026-09-13'), '13 сентября 2026');
  assert.equal(date('en', '2026-09-13'), '13 Sep, 2026');
  assert.equal(date('ru', '2026-09-13', true), '13.09');
  assert.equal(date('en', '2026-09-13', true), 'Sep 13');
  assert.equal(date('ru', '2026-01-05'), '5 января 2026');
  assert.equal(date('en', 'bad-date'), '');
});
