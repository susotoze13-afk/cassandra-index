// Страновой под-блок секции «Что это значит для моего региону?» (R08i,
// спека История 6): чистый шов countryRows(snapshot) → строки опубликованных
// стран; рендер — в DOM (не тестируем, в проекте чистые швы). Плюс пин
// ключей словаря country.* (существуют, без опечаток, плюрализация ICU-подмножеством).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { countryRows } from '../js/sections/regions.js';
import { t, DICTS } from '../js/i18n.js';

// Блок countries снапшота (контракт js/data.js validateCountries): rows —
// объект по ISO2; строка: {index, delta, background, region, signals, name{ru,en}}.
const SNAP = {
  published: '2026-10-25',
  countries: {
    total: 2,
    published: 2,
    rows: {
      RU: { index: 72, delta: 4, background: false, region: 'russia-belarus', signals: 3, name: { ru: 'Россия', en: 'Russia' } },
      UA: { index: 78, delta: -9, background: false, region: 'ukraine-moldova', signals: 2, name: { ru: 'Украина', en: 'Ukraine' } },
    },
  },
};

test('countryRows: null без блока countries', () => {
  assert.equal(countryRows({}), null);
  assert.equal(countryRows({ countries: null }), null);
  assert.equal(countryRows({ countries: {} }), null);
  assert.equal(countryRows({ countries: { total: 5, published: 0, rows: {} } }), null);
});

test('countryRows: строки с полями, имя — name.ru, fallback name.en', () => {
  const rows = countryRows(SNAP);
  assert.equal(rows.length, 2);
  const ru = rows.find((r) => r.iso === 'RU');
  assert.equal(ru.name, 'Россия');
  assert.equal(ru.index, 72);
  assert.equal(ru.delta, 4);
  assert.equal(ru.background, false);
  assert.equal(ru.region, 'russia-belarus');
  const enOnly = countryRows({
    countries: { rows: { MD: { index: 50, delta: 1, background: true, region: 'ukraine-moldova', signals: 1, name: { ru: '', en: 'Moldova' } } } },
  });
  assert.equal(enOnly[0].name, 'Moldova');
  assert.equal(enOnly[0].background, true);
});

test('countryRows: сортировка по |Δ|, при равенстве — по алфавиту имени', () => {
  const rows = countryRows(SNAP);
  assert.deepEqual(rows.map((r) => r.iso), ['UA', 'RU']); // |−9| > |+4|
  const tie = countryRows({
    countries: {
      rows: {
        UA: { index: 70, delta: 3, background: false, region: 'x', signals: 1, name: { ru: 'Украина', en: 'Ukraine' } },
        RU: { index: 70, delta: -3, background: false, region: 'x', signals: 1, name: { ru: 'Россия', en: 'Russia' } },
      },
    },
  });
  assert.deepEqual(tie.map((r) => r.iso), ['RU', 'UA']); // «Россия» < «Украина»
});

test('countryRows: строки без числовой delta (и index) пропускаются', () => {
  const rows = countryRows({
    countries: {
      rows: {
        RU: { index: 70, delta: 'x', background: false, region: 'x', signals: 1, name: { ru: 'Россия', en: 'Russia' } },
        UA: { index: NaN, delta: 1, background: false, region: 'x', signals: 1, name: { ru: 'Украина', en: 'Ukraine' } },
        BY: { index: 50, delta: 0, background: true, region: 'x', signals: 0, name: { ru: 'Беларусь', en: 'Belarus' } },
      },
    },
  });
  assert.deepEqual(rows.map((r) => r.iso), ['BY']);
});

test('словарь: ключи country.* существуют, без опечаток, строки непустые', () => {
  for (const key of ['country.title', 'country.background', 'country.note']) {
    assert.ok(key in DICTS.ru, `ключа ${key} нет в словаре`);
    assert.ok(DICTS.ru[key].length > 0, `${key} пуст`);
  }
  // Плюрализация ICU-подмножеством: one/few/many формы присутствуют и рендерятся.
  assert.match(DICTS.ru['country.count'], /plural/);
  assert.equal(t('ru', 'country.count', { n: 1 }), '1 страна');
  assert.equal(t('ru', 'country.count', { n: 2 }), '2 страны');
  assert.equal(t('ru', 'country.count', { n: 5 }), '5 стран');
});
