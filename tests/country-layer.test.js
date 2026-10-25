// country-layer.test.js — шов calc/country-layer.js (владелец странового слоя):
// валидация оверлея атрибуции (позитив + негативы), слияние без мутации входа,
// buildCountryRows (первая неделя наследует prevIndex региона, ADR 0067),
// renderCountryPart (форма части countries.js). Ожидаемые значения — ручной
// разбор формул §7, не пересчёт тем же кодом.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

import {
  loadCountryOverlay,
  validateCountryOverlay,
  mergeCountryAttribution,
  buildCountryRows,
  renderCountryPart,
} from '../calc/country-layer.js';
import { PARAMS } from '../calc/params.js';

const REF = JSON.parse(readFileSync(new URL('../data/regions/reference.json', import.meta.url), 'utf8'));

const GOOD_URL = 'https://example.com/a';
const ALT_URL = 'https://example.org/b';

function weekInput() {
  return {
    week: '2026-10-25',
    criteria: {
      'D1.4': { covered: true, value: 2, sources: [{ url: GOOD_URL }] },
      'D1.5': { covered: true, value: 1, sources: [] },
    },
    sources: [{ url: ALT_URL }],
  };
}

function goodOverlay() {
  return {
    week: '2026-10-25',
    criteria: {
      'D1.4': { countries: ['RU', 'UA'], basis: 'атрибуция недели', sources: [GOOD_URL] },
    },
  };
}

// --- Валидация оверлея ---
test('validateCountryOverlay: позитив — [] для корректного оверлея (источник из критерия и из top-level)', () => {
  const o = goodOverlay();
  o.criteria['D1.5'] = { countries: ['UA'], basis: 'второй критерий', sources: [ALT_URL] };
  assert.deepEqual(validateCountryOverlay(o, weekInput(), REF), []);
});

test('validateCountryOverlay: неделя оверлея ≠ неделя входа', () => {
  const errors = validateCountryOverlay(goodOverlay(), { ...weekInput(), week: '2026-11-01' }, REF);
  assert.ok(errors.some((e) => e.includes('week')));
});

test('validateCountryOverlay: неизвестный критерий отклоняется', () => {
  const o = goodOverlay();
  o.criteria['D9.9'] = { countries: ['RU'], basis: 'x', sources: [GOOD_URL] };
  assert.ok(validateCountryOverlay(o, weekInput(), REF).some((e) => e.includes('D9.9')));
});

test('validateCountryOverlay: слепой критерий входа отклоняется', () => {
  const o = goodOverlay();
  o.criteria['D1.5'] = { countries: ['RU'], basis: 'x', sources: [GOOD_URL] };
  const inp = weekInput();
  inp.criteria['D1.5'] = null; // слепой
  assert.ok(validateCountryOverlay(o, inp, REF).some((e) => e.includes('D1.5')));
});

test('validateCountryOverlay: ISO2 вне whitelist версии недели отклоняется', () => {
  const o = goodOverlay();
  o.criteria['D1.4'].countries = ['XX'];
  assert.ok(validateCountryOverlay(o, weekInput(), REF).some((e) => e.includes('XX')));
});

test('validateCountryOverlay: дубль id внутри countries[] отклоняется', () => {
  const o = goodOverlay();
  o.criteria['D1.4'].countries = ['RU', 'RU'];
  assert.ok(validateCountryOverlay(o, weekInput(), REF).some((e) => e.includes('RU')));
});

test('validateCountryOverlay: пустой basis отклоняется', () => {
  const o = goodOverlay();
  o.criteria['D1.4'].basis = '  ';
  assert.ok(validateCountryOverlay(o, weekInput(), REF).some((e) => e.includes('basis')));
});

test('validateCountryOverlay: url источника вне источников недели отклоняется', () => {
  const o = goodOverlay();
  o.criteria['D1.4'].sources = ['https://stranger.example/c'];
  assert.ok(validateCountryOverlay(o, weekInput(), REF).some((e) => e.includes('stranger.example')));
});

// --- Слияние атрибуции ---
test('mergeCountryAttribution: добавляет countries[] копии, исходный вход не мутирует', () => {
  const input = weekInput();
  const merged = mergeCountryAttribution(input, goodOverlay());
  assert.deepEqual(merged.criteria['D1.4'].countries, ['RU', 'UA']);
  assert.equal(merged.criteria['D1.4'].basis, undefined, 'служебные поля оверлея в критерий не попадают');
  assert.equal(input.criteria['D1.4'].countries, undefined, 'исходный вход не тронут');
  assert.notEqual(merged.criteria['D1.4'], input.criteria['D1.4'], 'запись критерия — копия');
});

// --- Построение строк стран ---
// Первая неделя слоя (ADR 0067): у страны нет прошлой недели — prevIndex =
// индекс её региона прошлой недели (иначе prevGlobal). RU: регион
// russia-belarus, прошлый индекс 72 → delta = index − 72 (число, не null).
test('buildCountryRows: первая неделя — страна с сигналами (background:false) наследует prevIndex региона', () => {
  const prev = {
    global: { index: 64 },
    regions: { 'russia-belarus': { index: 72 }, 'ukraine-moldova': { index: 70 } },
  };
  const g = { index: 68, internal: 68.25, delta: 4 };
  const res = buildCountryRows('2026-10-25', g, weekInput(), goodOverlay(), prev, REF, PARAMS);
  assert.equal(res.published, 2);
  const ru = res.rows.RU;
  assert.equal(ru.background, false);
  assert.equal(ru.region, 'russia-belarus');
  assert.equal(ru.signals, 1);
  assert.equal(ru.delta, ru.index - 72, 'delta от унаследованного prevIndex региона');
  assert.equal(typeof ru.delta, 'number');
  assert.deepEqual(ru.name, { ru: 'Россия', en: 'Russia' });
  const ua = res.rows.UA;
  assert.equal(ua.background, false);
  assert.equal(ua.delta, ua.index - 70);
  // Строки есть только у заявленных оверлеем стран: незаявленная отсутствует,
  // а не рисуется фоновой (иначе «страновой ряд» возникал бы из ниоткуда).
  assert.equal(res.rows.FR, undefined, 'незаявленная страна в блок не входит');
  assert.deepEqual(Object.keys(res.rows).sort(), ['RU', 'UA']);
  // total — всё же число стран версии (знаменатель покрытия), не число строк.
  assert.ok(res.total > Object.keys(res.rows).length);
});

test('buildCountryRows: заявленная, но без сигналов страна — слепая ветка §7 (background:true)', () => {
  // Сигналы страны считаются только по подходящим драйверам (ADR 0022): запись,
  // заявленная на Д2 (ядерная сфера), сигналом стране не станет.
  const o = goodOverlay();
  o.criteria['D2.1'] = { countries: ['FR'], basis: 'заявлена на неподходящем драйвере', sources: [ALT_URL] };
  const input = weekInput();
  input.criteria['D2.1'] = { covered: true, value: 1, sources: [] };
  const prev = { global: { index: 64 }, regions: { 'eu-north-europe': { index: 68 } } };
  const g = { index: 68, internal: 68.25, delta: 4 };
  const res = buildCountryRows('2026-10-25', g, input, o, prev, REF, PARAMS);
  const fr = res.rows.FR;
  assert.equal(fr.background, true);
  assert.equal(fr.region, 'eu-north-europe');
  assert.equal(fr.signals, 0);
  assert.equal(typeof fr.delta, 'number', 'у слепой заявленной страны дельта прежнего отклонения');
  assert.equal(res.published, 2, 'слепая заявленная страна published не считает');
});

test('buildCountryRows: вторая неделя — prevIndex прошлой недели страны', () => {
  const prev = {
    global: { index: 68 },
    regions: { 'russia-belarus': { index: 76 } },
    countries: { rows: { RU: { index: 79 } } },
  };
  const g = { index: 71, internal: 71.1, delta: 3 };
  const res = buildCountryRows('2026-11-01', g, weekInput(), goodOverlay(), prev, REF, PARAMS);
  assert.equal(res.rows.RU.delta, res.rows.RU.index - 79, 'prevIndex страны, не региона');
});

// --- Форма части countries.js ---
test('renderCountryPart: текст части исполняется в vm и даёт s.countries', () => {
  const prev = { global: { index: 64 }, regions: { 'russia-belarus': { index: 72 } } };
  const res = buildCountryRows('2026-10-25', { index: 68, internal: 68.25, delta: 4 },
    weekInput(), goodOverlay(), prev, REF, PARAMS);
  const text = renderCountryPart('2026-10-25', res);
  assert.ok(text.includes('s.countries = '));
  const sandbox = { window: { CI_DATA: { snapshots: {}, latest: null } } };
  vm.createContext(sandbox);
  vm.runInContext(text, sandbox);
  const c = sandbox.window.CI_DATA.snapshots['2026-10-25'].countries;
  assert.equal(c.total, res.total);
  assert.equal(c.published, 2);
  assert.equal(typeof c.rows.RU.index, 'number');
});

// --- Дисковый шов: оверлея нет → null (недели без слоя) ---
test('loadCountryOverlay: null, когда файла оверлея нет', () => {
  assert.equal(loadCountryOverlay('2026-08-30'), null);
});
