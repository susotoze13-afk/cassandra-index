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
  assert.equal(t('ru', 'trend.now', { value: 72 }), 'Сейчас: 72 из 100');
  assert.equal(t('en', 'trend.now', { value: 72 }), 'Now: 72 of 100');
});

test('t: неизвестный ключ возвращается как есть, неизвестный язык → fallback ru', () => {
  assert.equal(t('ru', 'no.such.key'), 'no.such.key');
  assert.equal(t('fr', 'nav.overview'), 'Обзор');
});

// R62: ICU plural — CLDR-правила RU (one/few/many, дробные → other).
// Ожидаемые формы разобраны вручную по правилам: one — n%10=1 и n%100≠11;
// few — n%10∈2..4 и n%100∉12..14; many — прочие целые; other — дробные.
test('ICU plural: RU формы 1, 2, 5, 21, 22, 25, 0, дробные', () => {
  const msg = '{n, plural, one{источник} few{источника} many{источников} other{прочее}}';
  assert.equal(t('ru', msg, { n: 1 }), 'источник');
  assert.equal(t('ru', msg, { n: 2 }), 'источника');
  assert.equal(t('ru', msg, { n: 5 }), 'источников');
  assert.equal(t('ru', msg, { n: 21 }), 'источник');
  assert.equal(t('ru', msg, { n: 22 }), 'источника');
  assert.equal(t('ru', msg, { n: 25 }), 'источников');
  assert.equal(t('ru', msg, { n: 0 }), 'источников');
  assert.equal(t('ru', msg, { n: 1.5 }), 'прочее');
  // границы CLDR: 11/12/14 → many, 101 → one
  assert.equal(t('ru', msg, { n: 11 }), 'источников');
  assert.equal(t('ru', msg, { n: 12 }), 'источников');
  assert.equal(t('ru', msg, { n: 14 }), 'источников');
  assert.equal(t('ru', msg, { n: 101 }), 'источник');
});

test('ICU plural: EN one/other, дробные → other', () => {
  const msg = '{n, plural, one{source} other{sources}}';
  assert.equal(t('en', msg, { n: 1 }), 'source');
  assert.equal(t('en', msg, { n: 2 }), 'sources');
  assert.equal(t('en', msg, { n: 1.5 }), 'sources');
  assert.equal(t('en', msg, { n: 0 }), 'sources');
});

test('ICU plural: нет vars → other; категория не языка → other', () => {
  const msg = '{n, plural, one{источник} few{источника} many{источников} other{прочее}}';
  assert.equal(t('ru', msg), 'прочее');
  // EN не знает категорий few/many — значение из few игнорируется
  const enMsg = '{n, plural, one{point} few{points-few} other{points}}';
  assert.equal(t('en', enMsg, { n: 2 }), 'points');
});

test('ICU select: выбор варианта, неизвестное значение → other', () => {
  const msg = '{g, select, male{он} female{она} other{они}}';
  assert.equal(t('ru', msg, { g: 'female' }), 'она');
  assert.equal(t('ru', msg, { g: 'nobinary' }), 'они');
});

test('ICU: интерполяция {var} рядом с plural-блоком', () => {
  const msg = 'Всего {n} {n, plural, one{источник} few{источника} many{источников} other{источников}}';
  assert.equal(t('ru', msg, { n: 3 }), 'Всего 3 источника');
  // переменная без значения остаётся литералом, как раньше
  assert.equal(t('ru', 'Сейчас: {value} из 100'), 'Сейчас: {value} из 100');
});

// R62.2: мигрированные ключи дают прежние тексты (snapshot до/после).
test('миграция: sources.word и trend.points — прежние тексты для типовых n', () => {
  assert.equal(t('ru', 'sources.word', { n: 1 }), '1 источник');
  assert.equal(t('ru', 'sources.word', { n: 2 }), '2 источника');
  assert.equal(t('ru', 'sources.word', { n: 5 }), '5 источников');
  assert.equal(t('ru', 'sources.word', { n: 21 }), '21 источник');
  assert.equal(t('ru', 'sources.word', { n: 22 }), '22 источника');
  assert.equal(t('ru', 'sources.word', { n: 25 }), '25 источников');
  assert.equal(t('en', 'sources.word', { n: 1 }), '1 source');
  assert.equal(t('en', 'sources.word', { n: 2 }), '2 sources');
  assert.equal(t('ru', 'trend.points', { n: 1 }), 'пункт');
  assert.equal(t('ru', 'trend.points', { n: 2 }), 'пункта');
  assert.equal(t('ru', 'trend.points', { n: 5 }), 'пунктов');
  assert.equal(t('ru', 'trend.points', { n: 21 }), 'пункт');
  assert.equal(t('ru', 'trend.points', { n: 22 }), 'пункта');
  assert.equal(t('ru', 'trend.points', { n: 25 }), 'пунктов');
  assert.equal(t('ru', 'trend.points', { n: 1.5 }), 'пунктов');
  assert.equal(t('en', 'trend.points', { n: 1 }), 'point');
  assert.equal(t('en', 'trend.points', { n: 2 }), 'points');
});

// plural() остаётся тонкой обёрткой поверх CLDR-категорий (совместимость интерфейса).
test('plural: обёртка поверх CLDR RU/EN', () => {
  const ru = ['источник', 'источника', 'источников'];
  assert.equal(plural('ru', 1, ru), 'источник');
  assert.equal(plural('ru', 2, ru), 'источника');
  assert.equal(plural('ru', 5, ru), 'источников');
  assert.equal(plural('ru', 21, ru), 'источник');
  assert.equal(plural('ru', 1.5, ru), 'источников');
  const en = ['source', 'sources'];
  assert.equal(plural('en', 1, en), 'source');
  assert.equal(plural('en', 2, en), 'sources');
  assert.equal(plural('en', 1.5, en), 'sources');
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
