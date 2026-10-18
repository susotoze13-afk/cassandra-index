// Курируемая история изменений (таск 01): форма CHANGELOG, порядок и
// обязательные записи о сменах методологии/таксономии/полей.
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  CHANGELOG, KINDS, validateChangelog, sortedDesc,
} from '../calc/changelog-entries.js';

test('CHANGELOG: проходит validateChangelog и хранится по возрастанию даты', () => {
  assert.deepEqual(validateChangelog(CHANGELOG), []);
  for (let i = 1; i < CHANGELOG.length; i += 1) {
    assert.ok(CHANGELOG[i - 1].date <= CHANGELOG[i].date, 'CHANGELOG не по возрастанию даты');
  }
  for (const e of CHANGELOG) assert.ok(KINDS.includes(e.kind), `kind вне KINDS: ${e.kind}`);
});

test('CHANGELOG: есть методология 3.0, таксономия 2.0, precursor, quotes и intersection', () => {
  const hit = (pred) => CHANGELOG.some(pred);
  assert.ok(hit((e) => e.kind === 'methodology' && /3\.0/.test(`${e.title} ${e.body}`)),
    'нет записи о методологии 3.0');
  assert.ok(hit((e) => e.kind === 'taxonomy' && /2\.0/.test(`${e.title} ${e.body}`)),
    'нет записи о таксономии 2.0');
  assert.ok(hit((e) => e.kind === 'field' && e.body.includes('precursor')),
    'нет записи о поле precursor');
  assert.ok(hit((e) => e.kind === 'field' && /quotes/.test(e.body)),
    'нет записи о цитатах источников');
  assert.ok(hit((e) => e.kind === 'field' && e.body.includes('intersection')),
    'нет записи о поле intersection');
  assert.ok(hit((e) => e.kind === 'schema'), 'нет записи о схеме публичных данных');
});

test('sortedDesc: новые записи первыми, исходный массив не мутирует', () => {
  const before = CHANGELOG.map((e) => e.date);
  const desc = sortedDesc(CHANGELOG);
  assert.equal(desc.length, CHANGELOG.length);
  for (let i = 1; i < desc.length; i += 1) {
    assert.ok(desc[i - 1].date >= desc[i].date, 'sortedDesc не по убыванию');
  }
  assert.deepEqual(CHANGELOG.map((e) => e.date), before, 'CHANGELOG мутирован');
  assert.notEqual(desc, CHANGELOG, 'sortedDesc вернул тот же массив');
});

test('validateChangelog: ловит битые записи формы', () => {
  const base = { date: '2026-10-18', version: '3.0', kind: 'field', title: 'Поле', body: 'Текст' };
  assert.deepEqual(validateChangelog([base]), []);
  assert.ok(validateChangelog('не массив').length > 0);
  assert.ok(validateChangelog([{ ...base, date: '18.10.2026' }]).length > 0);
  assert.ok(validateChangelog([{ ...base, kind: 'other' }]).length > 0);
  assert.ok(validateChangelog([{ ...base, title: '  ' }]).length > 0);
  assert.ok(validateChangelog([{ ...base, body: '' }]).length > 0);
  assert.ok(validateChangelog([{ ...base, version: '' }]).length > 0);
  assert.ok(validateChangelog([{ ...base, link: 'not-a-url' }]).length > 0);
  assert.deepEqual(validateChangelog([{ ...base, link: 'https://cassindex.ru/' }]), []);
});

test('KINDS: фиксированный набор видов записи', () => {
  assert.deepEqual(KINDS, ['methodology', 'taxonomy', 'schema', 'field', 'fix', 'product']);
});

test('CHANGELOG: даты не в будущем относительно даты сборки', () => {
  for (const e of CHANGELOG) assert.ok(e.date <= '2026-10-18', `будущая дата: ${e.date}`);
});
