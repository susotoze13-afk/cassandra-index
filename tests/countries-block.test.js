// countries-block.test.js — контракт опционального блока countries снапшота
// (страновой слой, ADR 0067): validateCountries из js/data.js. Блок есть только
// у недель ≥ PARAMS.countryLayerFrom; отсутствие — валидно (вся прежняя история).
import test from 'node:test';
import assert from 'node:assert/strict';

import { validateCountries, validate } from '../js/data.js';

const GOOD_ROW = {
  index: 70,
  delta: 2,
  background: false,
  region: 'russia-belarus',
  signals: 2,
  name: { ru: 'Россия', en: 'Russia' },
};

function goodBlock() {
  return {
    total: 2,
    published: 1,
    rows: {
      RU: { ...GOOD_ROW },
      UA: {
        index: 68, delta: 0, background: true, region: 'ukraine-moldova',
        signals: 0, name: { ru: 'Украина', en: 'Ukraine' },
      },
    },
  };
}

test('validateCountries: отсутствие блока — валидно (недели до гейта)', () => {
  assert.deepStrictEqual(validateCountries({}), { ok: true, errors: [] });
  assert.deepStrictEqual(validateCountries({ countries: undefined }), { ok: true, errors: [] });
});

test('validateCountries: полный блок — валиден', () => {
  const v = validateCountries({ regions_taxonomy: '2.0', countries: goodBlock() });
  assert.deepStrictEqual(v, { ok: true, errors: [] });
});

test('validateCountries: total/published — целые, total > 0, published ≤ total', () => {
  for (const bad of [
    [{ ...goodBlock(), total: 0 }, /total/],
    [{ ...goodBlock(), total: 1.5 }, /total/],
    [{ ...goodBlock(), published: 3 }, /published/],
    [{ ...goodBlock(), published: -1 }, /published/],
  ]) {
    const v = validateCountries({ countries: bad[0] });
    assert.equal(v.ok, false);
    assert.ok(v.errors.some((e) => bad[1].test(e)), JSON.stringify(v.errors));
  }
});

test('validateCountries: rows — объект с ключами ISO2', () => {
  const v1 = validateCountries({ countries: { ...goodBlock(), rows: [] } });
  assert.ok(v1.errors.some((e) => /rows/.test(e)));
  const v2 = validateCountries({
    countries: { ...goodBlock(), rows: { ru: { ...GOOD_ROW } } },
  });
  assert.ok(v2.errors.some((e) => /ISO2/.test(e)), JSON.stringify(v2.errors));
});

test('validateCountries: форма строки — index/delta/background/region/signals/name', () => {
  const cases = [
    [{ ...GOOD_ROW, index: 101 }, /index/],
    [{ ...GOOD_ROW, index: -1 }, /index/],
    [{ ...GOOD_ROW, delta: 'x' }, /delta/],
    [{ ...GOOD_ROW, background: 'yes' }, /background/],
    [{ ...GOOD_ROW, region: 'europe' }, /region/], // не id версии 2.0
    [{ ...GOOD_ROW, signals: 1.5 }, /signals/],
    [{ ...GOOD_ROW, signals: -1 }, /signals/],
    [{ ...GOOD_ROW, name: { ru: 'Россия' } }, /name/],
  ];
  for (const [row, re] of cases) {
    const v = validateCountries({
      regions_taxonomy: '2.0',
      countries: { total: 1, published: 1, rows: { RU: row } },
    });
    assert.equal(v.ok, false, JSON.stringify(row));
    assert.ok(v.errors.some((e) => re.test(e)), `${re}: ${JSON.stringify(v.errors)}`);
  }
});

test('validateCountries: region — id региона версии снапшота (v1 принимает v1-id)', () => {
  const v = validateCountries({
    regions_taxonomy: '1.0',
    countries: { total: 1, published: 1, rows: { RU: { ...GOOD_ROW, region: 'europe' } } },
  });
  assert.deepStrictEqual(v, { ok: true, errors: [] });
});

test('validate: блок countries прогоняется в общем контракте (ошибки с путями)', () => {
  const base = {
    published: '2026-10-25',
    through: '2026-10-25',
    methodology: '3.0',
    dataState: 'published',
    regions_taxonomy: '2.0',
    global: { index: 68, delta: 4 },
    regions: Object.fromEntries(
      ['russia-belarus', 'ukraine-moldova', 'baltic', 'balkans', 'eu-north-europe', 'south-caucasus',
        'central-asia', 'east-asia', 'middle-east', 'north-america', 'south-asia', 'africa']
        .map((id) => [id, { index: 68, delta: 4 }]),
    ),
    trend: Array.from({ length: 12 }, (_, i) => ({ date: `2026-08-0${(i % 9) + 1}`, value: 50 })),
    drivers: [],
    sources: [],
  };
  // drivers/sources битые — но countries-ошибки тоже должны быть в списке.
  const bad = validate({
    ...base,
    drivers: [{}, {}, {}],
    sources: [],
    countries: { total: 1, published: 1, rows: { RU: { ...GOOD_ROW, index: 700 } } },
  });
  assert.equal(bad.ok, false);
  assert.ok(bad.errors.some((e) => e.includes('countries.rows.RU.index')), JSON.stringify(bad.errors));
});
