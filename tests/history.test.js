import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  nextPublication,
  publicationLabel,
  methodologyNote,
  DEMO_REVIEWS,
  reviewFor,
} from '../js/sections/history.js';

// Следующая публикация — ближайший вторник 12:00 UTC (§9). Входы заданы в UTC
// (ISO-строки), ожидания сверяются через toISOString() — тест не зависит
// от системного часового пояса машины.
test('nextPublication: со среды → ближайший вторник 12:00 UTC', () => {
  const next = nextPublication(new Date('2026-09-16T15:30:00Z')); // среда
  assert.equal(next.toISOString(), '2026-09-22T12:00:00.000Z');
});

test('nextPublication: со вторника до 12:00 UTC — тот же день, после — через неделю', () => {
  assert.equal(nextPublication(new Date('2026-09-22T10:00:00Z')).toISOString(),
    '2026-09-22T12:00:00.000Z');
  assert.equal(nextPublication(new Date('2026-09-22T13:00:00Z')).toISOString(),
    '2026-09-29T12:00:00.000Z');
});

test('nextPublication: с понедельника → завтрашний вторник', () => {
  assert.equal(nextPublication(new Date('2026-09-21T08:00:00Z')).toISOString(),
    '2026-09-22T12:00:00.000Z');
});

// Подпись «вторник, 12:00» локализована через Intl (R62.1). Дата собирается
// локальным конструктором (вторник 09:05 в любом поясе), поэтому ожидания
// — константы, не зависящие от системного часового пояса.
test('publicationLabel: RU и EN для даты вторника', () => {
  const tuesday = new Date(2026, 8, 22, 9, 5); // вторник, 09:05 локально в любом TZ
  assert.equal(publicationLabel('ru', tuesday), 'вторник, 09:05');
  assert.equal(publicationLabel('en', tuesday), 'Tuesday, 09:05');
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

// §8.4: демо-записи истории содержат разбор «где ошиблись / где были правы /
// где неопределённость» — все три части на обоих языках.
test('DEMO_REVIEWS: каждая запись имеет все три части на RU и EN', () => {
  assert.ok(Array.isArray(DEMO_REVIEWS));
  assert.ok(DEMO_REVIEWS.length >= 1);
  for (const r of DEMO_REVIEWS) {
    assert.match(r.week, /^\d{4}-\d{2}-\d{2}$/);
    for (const part of ['wrong', 'right', 'uncertain']) {
      assert.equal(typeof r[part]?.ru, 'string');
      assert.ok(r[part].ru.length > 10, `${r.week}.${part}.ru`);
      assert.equal(typeof r[part]?.en, 'string');
      assert.ok(r[part].en.length > 10, `${r.week}.${part}.en`);
    }
  }
});

test('reviewFor: находит демо-запись по неделе, иначе null', () => {
  const week = DEMO_REVIEWS[0].week;
  assert.equal(reviewFor(week)?.week, week);
  assert.equal(reviewFor('1999-01-01'), null);
});
