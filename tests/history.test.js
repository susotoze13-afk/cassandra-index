import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  nextPublication,
  publicationLabel,
  methodologyNote,
  regionalGridNote,
  DEMO_REVIEWS,
  reviewFor,
} from '../js/sections/history.js';

// Следующая публикация — ближайшее воскресенье 11:00 МСК = 08:00 UTC (§9).
// Входы заданы в UTC (ISO-строки), ожидания сверяются через toISOString() —
// тест не зависит от системного часового пояса машины.
test('nextPublication: с понедельника → ближайшее воскресенье 08:00 UTC', () => {
  const next = nextPublication(new Date('2026-09-21T15:30:00Z')); // понедельник
  assert.equal(next.toISOString(), '2026-09-27T08:00:00.000Z');
});

test('nextPublication: с воскресенья до 08:00 UTC — тот же день, после — через неделю', () => {
  assert.equal(nextPublication(new Date('2026-09-27T06:00:00Z')).toISOString(),
    '2026-09-27T08:00:00.000Z');
  assert.equal(nextPublication(new Date('2026-09-27T09:00:00Z')).toISOString(),
    '2026-10-04T08:00:00.000Z');
});

test('nextPublication: во вторник → воскресенье той же недели', () => {
  assert.equal(nextPublication(new Date('2026-09-22T08:00:00Z')).toISOString(),
    '2026-09-27T08:00:00.000Z');
});

// Подпись «воскресенье, 11:00 по мск» — фиксированный пояс Europe/Moscow
// (R62.1): дата — момент 08:00 UTC, тождественный 11:00 МСК в любом поясе.
test('publicationLabel: RU подпись в поясе публикации', () => {
  const sunday = new Date('2026-09-27T08:00:00Z');
  assert.equal(publicationLabel('ru', sunday), 'воскресенье, 11:00 по мск');
  assert.equal(publicationLabel('en', sunday), 'Sunday, 11:00 MSK');
});

// §8.5: смена версии методологии между просматриваемой неделей и текущей
// раскрывается строкой; совпадающие версии — без строки.
test('methodologyNote: разные версии → строка с обеими, совпадающие → пусто', () => {
  const note = methodologyNote('ru', '1.0', '1.1');
  assert.ok(note.includes('1.0'));
  assert.ok(note.includes('1.1'));
  assert.notEqual(note, '');
  assert.equal(methodologyNote('ru', '1.0', '1.0'), '');
  assert.equal(methodologyNote('ru', '1.0', ''), '');
  assert.equal(methodologyNote('ru', '', '1.1'), '');
});

// ADR 0028 / R08.1: смена региональной сетки раскрывается заметкой; дата — из
// TAXONOMY_V2_FROM ('2026-10-18' → «18 октября 2026», известная величина).
test('regionalGridNote: разные таксономии → строка с датой, совпадающие → пусто', () => {
  const note = regionalGridNote('ru', '1.0', '2.0');
  assert.ok(note.includes('18 октября 2026'));
  assert.notEqual(note, '');
  assert.equal(regionalGridNote('ru', '1.0', '1.0'), '');
  assert.equal(regionalGridNote('ru', '2.0', '2.0'), '');
  assert.equal(regionalGridNote('ru', '', '2.0'), '');
  assert.equal(regionalGridNote('ru', '1.0', ''), '');
});

// §8.4: демо-записи истории содержат разбор «где ошиблись / где были правы /
// где неопределённость» — все три части.
test('DEMO_REVIEWS: каждая запись имеет все три части на RU', () => {
  assert.ok(Array.isArray(DEMO_REVIEWS));
  assert.ok(DEMO_REVIEWS.length >= 1);
  for (const r of DEMO_REVIEWS) {
    assert.match(r.week, /^\d{4}-\d{2}-\d{2}$/);
    for (const part of ['wrong', 'right', 'uncertain']) {
      assert.equal(typeof r[part]?.ru, 'string');
      assert.ok(r[part].ru.length > 10, `${r.week}.${part}.ru`);
      assert.notEqual(r[part].ru.trim(), '', `${r.week}.${part}.ru пуст`);
    }
  }
});

test('reviewFor: находит демо-запись по неделе, иначе null', () => {
  const week = DEMO_REVIEWS[0].week;
  assert.equal(reviewFor(week)?.week, week);
  assert.equal(reviewFor('1999-01-01'), null);
});
