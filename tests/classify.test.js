import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import {
  normalizeText,
  quoteFound,
  validateDraft,
  reviewQueue,
  toInput,
  loadDraft,
} from '../calc/classify.js';
import { validate as validateInput, buildDriversCore, normalizeCriterion } from '../calc/engine.js';

// Синтетический корпус: файлы <source_id>.txt в темп-директории.
function makeCorpus(files) {
  const dir = mkdtempSync(path.join(tmpdir(), 'ci-classify-'));
  for (const [id, text] of Object.entries(files)) {
    writeFileSync(path.join(dir, `${id}.txt`), text, 'utf8');
  }
  return dir;
}

function baseItem(over = {}) {
  return {
    criterion: 'D1.2',
    source_id: 'src-a',
    url: 'https://example.com/a',
    kind: 'event',
    value: 0.67,
    quote: 'короткая цитата',
    event_date: '2026-10-15',
    cluster: 'A-mainstream',
    ...over,
  };
}

function baseDraft(items) {
  return { schema_version: 2, week: '2026-10-18', generated_by: 'jev', items };
}

test('normalizeText: пробелы/дефисы/кавычки приводятся к канону', () => {
  const raw = '  «слово»\u00A0—\u00A0ещё\u00ADслово\u2014тире\n\nи\u2013en ' +
    '“двойные” ‘одинарные’ минус −1 ';
  assert.equal(normalizeText(raw), '"слово" - ещёслово-тире и-en "двойные" \'одинарные\' минус -1');
});

test('normalizeText: не-строка → пустая строка', () => {
  assert.equal(normalizeText(null), '');
  assert.equal(normalizeText(undefined), '');
});

test('quoteFound: цитата находится через нормализацию типографики', () => {
  const text = 'Начало. «Государства достигли договорённости» — сообщил агентство.';
  assert.equal(quoteFound('"Государства достигли договорённости"', text), true);
  assert.equal(quoteFound('«Государства достигли договорённости»', text), true);
  assert.equal(quoteFound('Государства   достигли\nдоговорённости', text), true, 'пробельные runs схлопываются');
});

test('quoteFound: перефраз и пустая цитата не находятся', () => {
  const text = 'Государства достигли договорённости по итогам встречи.';
  assert.equal(quoteFound('страны договорились', text), false, 'перефраз');
  assert.equal(quoteFound('достигли соглашения', text), false);
  assert.equal(quoteFound('', text), false, 'пустая цитата');
  assert.equal(quoteFound('договорённости', ''), false, 'пустой текст');
});

test('validateDraft: валидный черновик → []', () => {
  const draft = baseDraft([
    baseItem(),
    baseItem({ criterion: 'D3.3', kind: 'event', events: [0.5, 0.2], value: undefined, quote: 'x' }),
    baseItem({ criterion: 'D5.1', kind: 'not_found', quote: undefined, url: undefined, value: undefined }),
    baseItem({ criterion: 'D2.1', kind: 'background', value: 0.33, quote: 'x', carryover: true }),
  ]);
  assert.deepEqual(validateDraft(draft), []);
});

test('validateDraft: схема v2 — версия, критерий, кластер, веса, kind-дисциплина', () => {
  const ver = validateDraft({ ...baseDraft([]), schema_version: 1 });
  assert.ok(ver.some((e) => e.includes('schema_version')), 'версия схемы');

  const bad = baseDraft([
    baseItem({ criterion: 'D9.99' }),
    baseItem({ source_id: 'src-b', criterion: 'D1.3', cluster: 'Z-unknown' }),
    baseItem({ source_id: 'src-c', criterion: 'D3.3', kind: 'event', events: [0.3], value: undefined }),
    baseItem({ source_id: 'src-d', criterion: 'D3.3', kind: 'event', value: 0.5 }),
    baseItem({ source_id: 'src-e', criterion: 'D1.4', kind: 'event', value: 0.5, events: [0.2] }),
    baseItem({ source_id: 'src-f', criterion: 'D5.1', kind: 'not_found', quote: undefined, url: undefined, value: 0.5 }),
    baseItem({ source_id: 'src-g', criterion: 'D1.5', kind: 'maybe' }),
    baseItem({ source_id: 'src-h', criterion: 'D3.1', kind: 'event', events: [0.2], value: undefined }),
    baseItem({ source_id: 'src-b', criterion: 'D1.3' }),
  ]);
  const errors = validateDraft(bad);
  const text = errors.join('\n');
  assert.ok(text.includes('D9.99'), 'неизвестный критерий');
  assert.ok(text.includes('Z-unknown'), 'кластер вне whitelist');
  assert.ok(text.includes('0.3'), 'вес вне {0.2, 0.5, 1.0, 2.0}');
  assert.ok(text.includes('events'), 'счётный event без events[]');
  assert.ok(errors.filter((e) => e.includes('D1.4')).length > 0, 'count: value и events вместе запрещены');
  assert.ok(errors.filter((e) => includesNotFound(e)).length > 0, 'not_found не несёт значения');
  assert.ok(text.includes('maybe'), 'kind вне enum');
  assert.ok(errors.filter((e) => e.includes('src-h')).length === 0, 'валидный count event чист');
  assert.ok(errors.filter((e) => e.includes('дубль')).length > 0, 'дубль пары (criterion, source)');
});

function includesNotFound(e) {
  return /\.value: not_found не несёт значения/.test(e);
}

test('validateDraft: carryover — только D2.*, review — {flag, reason?}', () => {
  const draft = baseDraft([
    baseItem({ source_id: 'b', criterion: 'D3.1', carryover: true }),
    baseItem({ source_id: 'c', criterion: 'D2.1', kind: 'background', value: 0.33, quote: 'x', carryover: 'yes' }),
    baseItem({ source_id: 'd', criterion: 'D2.2', kind: 'background', value: 0.33, quote: 'x', review: { flag: 1 } }),
  ]);
  const text = validateDraft(draft).join('\n');
  assert.ok(text.includes('carryover'), 'carryover вне D2 отклонён');
  assert.ok(text.includes('boolean'), 'review.flag не-boolean отклонён');
});

test('reviewQueue: неразрешённые review.flag и carryover собираются с указанием записи', () => {
  const draft = baseDraft([
    baseItem(),
    baseItem({ source_id: 'b', criterion: 'D2.1', kind: 'background', value: 0.33, quote: 'x', carryover: true }),
    baseItem({ source_id: 'c', criterion: 'D1.3', review: { flag: true, reason: 'одно событие в трёх критериях' } }),
    baseItem({ source_id: 'd', criterion: 'D1.4', review: { flag: false } }),
  ]);
  const queue = reviewQueue(draft);
  assert.equal(queue.length, 2);
  assert.deepEqual(
    queue.map((q) => [q.criterion, q.source_id, q.kind]),
    [['D2.1', 'b', 'carryover'], ['D1.3', 'c', 'review.flag']],
  );
  assert.equal(queue[1].reason, 'одно событие в трёх критериях');
});

test('reviewQueue: разрешённые пометки (flag:false, carryover отсутствует) — очередь пуста', () => {
  const draft = baseDraft([
    baseItem(),
    baseItem({ source_id: 'b', criterion: 'D1.3', review: { flag: false, reason: 'проверено' } }),
  ]);
  assert.deepEqual(reviewQueue(draft), []);
});

// --- toInput: ворота правил 9–10 и маппинг ---

const R55 = [
  {
    id: 'src-a', title: { ru: 'А', en: 'A' }, domain: 'example.com',
    url: 'https://example.com/a', publication_date: '2026-10-16', accessed_date: '2026-10-17',
    source_type: 'primary', cluster_id: 'A-mainstream', state_affiliated: false,
  },
  {
    id: 'src-b', title: { ru: 'Б', en: 'B' }, domain: 'example.org',
    url: 'https://example.org/b', publication_date: '2026-10-15', accessed_date: '2026-10-17',
    source_type: 'secondary', cluster_id: 'C-registries', state_affiliated: true,
  },
];

const TEXT_A = 'Стороны обменялись ударами по объектам инфраструктуры. ' +
  'Переговоры в Женеве завершились без communiqué.';
const TEXT_B = 'Реестр зафиксировал новые поставки. Контрнаступление началось на рассвете.';

function evItem(over = {}) {
  return {
    criterion: 'D3.3', source_id: 'src-a', url: 'https://example.com/a',
    kind: 'event', events: [0.5], quote: 'Стороны обменялись ударами',
    event_date: '2026-10-14', cluster: 'A-mainstream', ...over,
  };
}

test('toInput: правило 10 — неразрешённая пометка гасит эмиссию', () => {
  const dir = makeCorpus({ 'src-a': TEXT_A });
  const draft = baseDraft([
    evItem({ review: { flag: true, reason: 'одно событие в трёх критериях' } }),
  ]);
  const { input, errors, report } = toInput(draft, R55, dir);
  assert.equal(input, null);
  assert.ok(errors.some((e) => e.includes('правило 10')));
  assert.equal(report.review.length, 1);
  assert.equal(report.review[0].reason, 'одно событие в трёх критериях');
});

test('toInput: правило 9 — цитата не найдена дословно → отказ записи, вход не эмитится', () => {
  const dir = makeCorpus({ 'src-a': TEXT_A });
  const draft = baseDraft([evItem({ quote: 'Стороны договорились о перемирии' })]);
  const { input, errors, report } = toInput(draft, R55, dir);
  assert.equal(input, null);
  assert.equal(report.items.rejected, 1);
  assert.equal(report.rejected[0].criterion, 'D3.3');
  assert.ok(report.rejected[0].reason.includes('цитата'));
  assert.ok(errors.some((e) => e.includes('правило 9')));
});

test('toInput: правило 9 — цитата находится через нормализацию типографики', () => {
  const dir = makeCorpus({ 'src-a': TEXT_A });
  const draft = baseDraft([evItem({ quote: 'Стороны  обменялись\nударами' })]);
  const { input, errors } = toInput(draft, R55, dir);
  assert.deepEqual(errors, []);
  assert.ok(input);
});

test('toInput: отсутствие файла корпуса — отказ записей источника, не падение', () => {
  const dir = makeCorpus({ 'src-a': TEXT_A });
  const draft = baseDraft([
    evItem(),
    evItem({ source_id: 'src-b', url: 'https://example.org/b', quote: 'Реестр зафиксировал' }),
  ]);
  const { input, report } = toInput(draft, R55, dir);
  assert.equal(input, null);
  assert.deepEqual(report.missingCorpus, ['src-b']);
  assert.equal(report.items.accepted, 1);
  assert.equal(report.items.rejected, 1);
});

test('toInput: not_found → null в выходном входе; accepted не перезаписывается', () => {
  const dir = makeCorpus({ 'src-a': TEXT_A });
  const draft = baseDraft([
    evItem(),
    baseItem({
      criterion: 'D5.1', source_id: 'src-b', url: 'https://example.org/b',
      kind: 'not_found', value: undefined, quote: undefined,
    }),
  ]);
  const { input, errors } = toInput(draft, R55, dir);
  assert.deepEqual(errors, []);
  assert.equal(input.criteria['D5.1'], null);
  assert.ok(input.criteria['D3.3'].covered);
});

test('toInput: events[] не сворачивается в value — нормирует движок', () => {
  const dir = makeCorpus({ 'src-a': TEXT_A });
  const draft = baseDraft([evItem({ events: [0.2, 0.5, 1.0] })]);
  const { input } = toInput(draft, R55, dir);
  const entry = input.criteria['D3.3'];
  assert.deepEqual(entry.events, [0.2, 0.5, 1.0]);
  assert.equal('value' in entry, false);
});

test('toInput: merge — несколько записей одного критерия сливаются в один вход', () => {
  const dir = makeCorpus({ 'src-a': TEXT_A, 'src-b': TEXT_B });
  const draft = baseDraft([
    evItem({ events: [0.5] }),
    evItem({ source_id: 'src-b', url: 'https://example.org/b', cluster: 'C-registries', events: [0.2, 1.0], quote: 'Контрнаступление началось' }),
  ]);
  const { input, errors } = toInput(draft, R55, dir);
  assert.deepEqual(errors, []);
  const keys = Object.keys(input.criteria);
  assert.deepEqual(keys, ['D3.3']);
  const entry = input.criteria['D3.3'];
  assert.deepEqual(entry.events, [0.5, 0.2, 1.0]);
  assert.equal(entry.sources.length, 2);
  assert.equal(entry.sources[0].url, 'https://example.com/a');
  assert.equal(entry.sources[0].date, '2026-10-14');
  assert.equal(entry.sources[0].type, 'primary');
  assert.equal(entry.sources[0].state_affiliated, false);
  assert.equal(entry.sources[1].url, 'https://example.org/b');
  assert.equal(entry.sources[1].date, '2026-10-14');
  assert.equal(entry.sources[1].cluster, 'C-registries');
  assert.equal(entry.sources[1].type, 'secondary');
  assert.equal(entry.sources[1].state_affiliated, true);
  assert.deepEqual(input.sources, R55, 'top-level R55 проходит транзитом');
});

test('toInput: не-счётный критерий — value максимум по записям', () => {
  const dir = makeCorpus({ 'src-a': TEXT_A, 'src-b': TEXT_B });
  const draft = baseDraft([
    baseItem({ criterion: 'D1.2', value: 0.33, quote: 'Переговоры в Женеве' }),
    baseItem({ criterion: 'D1.2', source_id: 'src-b', url: 'https://example.org/b', cluster: 'C-registries', value: 0.67, quote: 'Контрнаступление началось' }),
  ]);
  const { input, errors } = toInput(draft, R55, dir);
  assert.deepEqual(errors, []);
  assert.equal(input.criteria['D1.2'].value, 0.67);
  assert.equal(input.criteria['D1.2'].sources.length, 2);
});

test('toInput: источник вне набора R55 — отказ (§4.8)', () => {
  const dir = makeCorpus({ 'src-a': TEXT_A });
  const draft = baseDraft([evItem({ source_id: 'src-z', url: 'https://z.example/z' })]);
  const { input, report } = toInput(draft, R55, dir);
  assert.equal(input, null);
  assert.ok(report.rejected[0].reason.includes('R55'));
});

test('toInput: схема невалидна — вход не эмитится', () => {
  const dir = makeCorpus({ 'src-a': TEXT_A });
  const draft = baseDraft([evItem({ kind: 'maybe' })]);
  const { input, errors } = toInput(draft, R55, dir);
  assert.equal(input, null);
  assert.ok(errors.length > 0);
});

test('toInput: background-запись — date берётся из publication_date R55', () => {
  const dir = makeCorpus({ 'src-a': TEXT_A });
  const draft = baseDraft([
    baseItem({ criterion: 'D3.4', kind: 'background', value: 0.33, quote: 'Переговоры в Женеве', event_date: undefined }),
  ]);
  const { input, errors } = toInput(draft, R55, dir);
  assert.deepEqual(errors, []);
  assert.equal(input.criteria['D3.4'].value, 0.33);
  assert.equal(input.criteria['D3.4'].sources[0].date, '2026-10-16');
});

// --- Сквозной позитив: сырой вход принимается движком ---

test('toInput: эмитированный вход проходит валидацию движка и маппится в 9 драйверов', () => {
  const dir = makeCorpus({ 'src-a': TEXT_A, 'src-b': TEXT_B });
  const draft = baseDraft([
    evItem({ events: [0.5, 0.2] }),
    evItem({ source_id: 'src-b', url: 'https://example.org/b', cluster: 'C-registries', events: [1.0], quote: 'Контрнаступление началось' }),
    baseItem({ criterion: 'D1.2', value: 0.67, quote: 'Переговоры в Женеве' }),
    baseItem({ criterion: 'D5.1', source_id: 'src-b', url: 'https://example.org/b', kind: 'not_found', value: undefined, quote: undefined }),
  ]);
  const { input, errors } = toInput(draft, R55, dir);
  assert.deepEqual(errors, []);
  assert.equal(input.week, '2026-10-18');
  assert.deepEqual(validateInput(input), [], 'контракт входа engine.validate');
  const drivers = buildDriversCore(input.criteria, {}, undefined);
  assert.deepEqual(drivers.map((d) => d.id), ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9']);
  assert.equal(normalizeCriterion(input.criteria['D3.3']), 1.7 / 5, 'value = min(1, Σsev/CAP) — нормирует движок');
  assert.deepEqual(input.sources, R55);
});

test('loadDraft: читает JSON черновика; битый файл — понятная ошибка', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'ci-classify-'));
  const file = path.join(dir, 'draft.json');
  writeFileSync(file, JSON.stringify(baseDraft([])), 'utf8');
  assert.equal(loadDraft(file).schema_version, 2);
  writeFileSync(file, '{not json', 'utf8');
  assert.throws(() => loadDraft(file), /не парсится JSON/);
  assert.throws(() => loadDraft(path.join(dir, 'missing.json')), /не читается/);
});
