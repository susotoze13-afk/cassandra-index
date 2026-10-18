// Цитаты источника: форма записи {criterion, text} (R01) и дословная проверка
// против корпуса текстов недели (R03i). Чистый модуль: без сети и DOM; поиск —
// той же нормализацией, что у пилота Jev (calc/classify.js).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { QUOTE_MAX_LEN, QUOTES_PER_SOURCE_MAX, validateQuotes, verifyQuotes } from '../calc/quotes.js';
import { validateInputSources, writeWeek, taxonomyForWeek } from '../calc/calc.js';
import { regionIdsFor } from '../js/data.js';

const IDS = ['D1.1', 'D1.4', 'D9.3'];
const ROOT = path.resolve(import.meta.dirname, '..');

const source = (id, quotes) => {
  const s = { id };
  if (quotes !== undefined) s.quotes = quotes;
  return s;
};

// --- validateQuotes: форма ---

test('validateQuotes: запись без поля quotes ошибкой не считается', () => {
  assert.deepEqual(validateQuotes([source('a'), source('b', [])], IDS), []);
});

test('validateQuotes: criterion вне переданного набора отклоняется с путём записи', () => {
  const errors = validateQuotes([source('a', [{ criterion: 'D7.9', text: 'фрагмент' }])], IDS);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /sources\[0\]\.quotes\[0\]\.criterion/);
});

test('validateQuotes: пустой text и text длиннее лимита отклоняются', () => {
  const empty = validateQuotes([source('a', [{ criterion: 'D1.1', text: '   ' }])], IDS);
  assert.equal(empty.length, 1);
  assert.match(empty[0], /sources\[0\]\.quotes\[0\]\.text/);

  const long = validateQuotes([source('b', [{ criterion: 'D1.1', text: 'я'.repeat(QUOTE_MAX_LEN + 1) }])], IDS);
  assert.equal(long.length, 1);
  assert.match(long[0], /sources\[0\]\.quotes\[0\]\.text/);

  const exact = validateQuotes([source('c', [{ criterion: 'D1.1', text: 'я'.repeat(QUOTE_MAX_LEN) }])], IDS);
  assert.deepEqual(exact, [], 'ровно лимит — допустимо');
});

test('validateQuotes: quotes не массив отклоняется', () => {
  const errors = validateQuotes([source('a', 'цитата строкой')], IDS);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /sources\[0\]\.quotes/);
});

test('validateQuotes: больше QUOTES_PER_SOURCE_MAX цитат у источника отклоняется', () => {
  const many = Array.from({ length: QUOTES_PER_SOURCE_MAX + 1 }, () => ({ criterion: 'D1.1', text: 'т' }));
  const errors = validateQuotes([source('a', many)], IDS);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /sources\[0\]\.quotes/);
  assert.deepEqual(validateQuotes([source('b', many.slice(0, QUOTES_PER_SOURCE_MAX))], IDS), []);
});

test('validateQuotes: элемент без criterion/text отклоняется', () => {
  const errors = validateQuotes([source('a', [{ text: 'т' }])], IDS);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /sources\[0\]\.quotes\[0\]/);
});

// --- verifyQuotes: дословность против корпуса ---

function corpus(files) {
  const dir = mkdtempSync(path.join(tmpdir(), 'ci-quotes-'));
  for (const [id, text] of Object.entries(files)) writeFileSync(path.join(dir, `${id}.txt`), text, 'utf8');
  return dir;
}

test('verifyQuotes: дословная цитата находится (нормализация кавычек как у Jev)', () => {
  const dir = corpus({
    'src-a': 'Совет Федерации «одобрил» применение войск за рубежом.\nВторое предложение.',
  });
  try {
    const res = verifyQuotes(
      [source('src-a', [{ criterion: 'D1.1', text: '"одобрил" применение войск за рубежом' }])],
      dir,
    );
    assert.deepEqual(res.errors, []);
    assert.equal(res.checked, 1);
    assert.equal(res.ok, 1);
    assert.equal(res.mismatched, 0);
    assert.equal(res.skipped, 0);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('verifyQuotes: пересказ отклоняется, ошибка называет источник и критерий', () => {
  const dir = corpus({ 'src-a': 'Совет Федерации одобрил применение войск за рубежом.' });
  try {
    const res = verifyQuotes(
      [source('src-a', [{ criterion: 'D9.3', text: 'парламент согласился отправить армию' }])],
      dir,
    );
    assert.equal(res.mismatched, 1);
    assert.equal(res.ok, 0);
    assert.equal(res.errors.length, 1);
    assert.match(res.errors[0], /src-a/);
    assert.match(res.errors[0], /D9\.3/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('verifyQuotes: пустая цитата не проходит, даже когда includes её «находит»', () => {
  const dir = corpus({ 'src-a': 'любой текст' });
  try {
    const res = verifyQuotes([source('src-a', [{ criterion: 'D1.1', text: '   ' }])], dir);
    assert.equal(res.ok, 0);
    assert.equal(res.mismatched, 1);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('verifyQuotes: нет файла корпуса — skipped и ошибка с id и критерием', () => {
  const dir = corpus({});
  try {
    const res = verifyQuotes(
      [source('src-missing', [{ criterion: 'D1.4', text: 'фрагмент' }])],
      dir,
    );
    assert.equal(res.skipped, 1);
    assert.equal(res.checked, 0);
    assert.equal(res.errors.length, 1);
    assert.match(res.errors[0], /src-missing/);
    assert.match(res.errors[0], /D1\.4/);
    assert.match(res.errors[0], /src-missing\.txt|корпус/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('verifyQuotes: счётчики по двум источникам — найдено, пересказ, нет корпуса', () => {
  const dir = corpus({ 'src-a': 'Дроны атаковали объект инфраструктуры.' });
  try {
    const sources = [
      source('src-a', [
        { criterion: 'D1.1', text: 'Дроны атаковали объект инфраструктуры' },
        { criterion: 'D1.4', text: 'атака была отбита' },
      ]),
      source('src-none', [{ criterion: 'D1.1', text: 'что-то' }]),
    ];
    const res = verifyQuotes(sources, dir);
    assert.equal(res.checked, 2);
    assert.equal(res.ok, 1);
    assert.equal(res.mismatched, 1);
    assert.equal(res.skipped, 1);
    assert.equal(res.errors.length, 2);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('verifyQuotes: источник без quotes корпус не требует', () => {
  const dir = corpus({});
  try {
    const res = verifyQuotes([source('no-quotes')], dir);
    assert.deepEqual(res, { checked: 0, ok: 0, skipped: 0, mismatched: 0, errors: [] });
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

// --- Ворота входа: validateInputSources вызывает проверку формы ---

test('validateInputSources: битая цитата отклоняется в стиле остальных полей источника', () => {
  const base = {
    id: 'a', title: { ru: 'Т', en: 'T' }, domain: 'example.com', url: 'https://example.com/a',
    publication_date: '2026-10-17', accessed_date: '2026-10-18',
    source_type: 'secondary', cluster_id: 'A-mainstream', state_affiliated: false,
  };
  assert.deepEqual(validateInputSources([base]), []);
  const withQuotes = { ...base, quotes: [{ criterion: 'D1.1', text: 'фрагмент' }] };
  assert.deepEqual(validateInputSources([withQuotes]), [], 'валидная цитата пропускается');
  const broken = { ...base, quotes: [{ criterion: 'D99', text: 'фрагмент' }] };
  const errors = validateInputSources([broken]);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /^sources\[0\]\.quotes\[0\]\.criterion/);
});

// --- Ворота записи: writeWeek отклоняет непроверяемую цитату до диска ---

// Синтетический результат runWeek: всё, что writeWeek читает до ворот цитат.
// Регионы — по набору версии недели (public-шов regionIdsFor/taxonomyForWeek).
function fakeResult(week, sources) {
  const regions = Object.fromEntries(
    regionIdsFor(taxonomyForWeek(week)).map((id) => [id, { index: 50, delta: 0, status: 'calm', background: true }]),
  );
  return {
    week,
    global: { index: 50, delta: 0, internal: 50 },
    classification: {
      dataState: 'published', insufficient: false, reduced: false,
      q: 1, nullWeight: 0, confidence: 'high', coveredDrivers: 9, totalDrivers: 9,
    },
    sensitivity: null,
    trend: [],
    regions,
    coverage: { criteria: 1, totalCriteria: 46, drivers: 9 },
    sources,
    flash: [],
  };
}

test('writeWeek: цитата без корпуса — отказ записи, диск не тронут', async () => {
  // Неделя вне data/: если ворота когда-нибудь пропустят запись, каталога
  // не существует и запись упадёт — тест не может создать мусор на диске.
  const week = '2026-01-04';
  const dir = path.join(ROOT, 'data', week);
  assert.equal(existsSync(dir), false, 'предусловие: каталога недели нет');
  const res = fakeResult(week, [source('src-no-corpus', [{ criterion: 'D1.1', text: 'фрагмент' }])]);

  const check = await writeWeek(res, {});

  assert.equal(check.ok, false, 'запись обязана быть отклонена');
  assert.equal(check.stage, 'quotes', 'отказ именно на воротах цитат, до ссылок и контракта');
  assert.equal(check.quotes.skipped, 1);
  assert.match(check.quotes.errors[0], /src-no-corpus/, 'ошибка называет id источника');
  assert.match(check.quotes.errors[0], /D1\.1/, 'ошибка называет критерий');
  assert.equal(existsSync(dir), false, 'диск не тронут');
});
