// Секция «Обратная связь»: тесты чистых швов js/sections/feedback.js
// (без DOM и без сети — поведение отправки не трогаем) + конвенционная
// проверка «никакого innerHTML» в модуле секции.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  honeypotCheck,
  timingCheck,
  rateLimit,
  originAllowed,
  timingToken,
  validateFeedback,
  FEEDBACK_TOPICS,
  HONEYPOT_FIELDS,
} from '../js/sections/feedback.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const moduleSrc = readFileSync(join(root, 'js/sections/feedback.js'), 'utf8');

// --- honeypotCheck ---

test('honeypotCheck: пустые скрытые поля — не бот', () => {
  const empty = Object.fromEntries(HONEYPOT_FIELDS.map((name) => [name, '']));
  assert.equal(honeypotCheck(empty), false);
  assert.equal(honeypotCheck({}), false);
});

test('honeypotCheck: заполнено любое из полей — бот', () => {
  for (const name of HONEYPOT_FIELDS) {
    assert.equal(honeypotCheck({ [name]: 'http://spam.example' }), true, `поле ${name}`);
  }
  // все сразу — тоже бот
  const all = Object.fromEntries(HONEYPOT_FIELDS.map((n) => [n, 'x']));
  assert.equal(honeypotCheck(all), true);
});

test('honeypotCheck: работает и с FormData', () => {
  const data = new FormData();
  for (const name of HONEYPOT_FIELDS) data.set(name, '');
  assert.equal(honeypotCheck(data), false);
  data.set(HONEYPOT_FIELDS[1], 'бот');
  assert.equal(honeypotCheck(data), true);
});

// Имена ловушек — нестандартные (спека: не 'honeypot'/'email_confirm').
test('honeypotCheck: имена полей нестандартные', () => {
  assert.ok(!HONEYPOT_FIELDS.includes('honeypot'));
  assert.ok(!HONEYPOT_FIELDS.includes('email_confirm'));
});

// --- timingCheck ---

test('timingCheck: границы 1999/2000/5000 мс', () => {
  assert.equal(timingCheck(1999), false);
  assert.equal(timingCheck(2000), true);
  assert.equal(timingCheck(5000), true);
  assert.equal(timingCheck(0), false);
  assert.equal(timingCheck(-100), false);
  assert.equal(timingCheck(NaN), false);
});

// --- rateLimit ---

test('rateLimit: первая отправка — сразу', () => {
  assert.deepEqual(rateLimit({ attempts: [] }, 1_000_000), { allowed: true, retryAfterMs: 0 });
  assert.deepEqual(rateLimit({}, 1_000_000), { allowed: true, retryAfterMs: 0 });
});

test('rateLimit: вторая — через 30 с, границы ровно', () => {
  const t0 = 1_000_000;
  assert.deepEqual(rateLimit({ attempts: [t0] }, t0 + 29999), { allowed: false, retryAfterMs: 1 });
  assert.deepEqual(rateLimit({ attempts: [t0] }, t0 + 30000), { allowed: true, retryAfterMs: 0 });
});

test('rateLimit: третья — через 120 с', () => {
  const a = [1_000_000, 1_040_000]; // вторая отправлена после 40 с ожидания
  assert.deepEqual(rateLimit({ attempts: a }, a[1] + 119999), { allowed: false, retryAfterMs: 1 });
  assert.deepEqual(rateLimit({ attempts: a }, a[1] + 120000), { allowed: true, retryAfterMs: 0 });
});

test('rateLimit: четвёртая и далее — 300 с потолок', () => {
  const a = [1_000_000, 1_040_000, 1_200_000, 1_600_000]; // 4 прошлые отправки
  assert.deepEqual(rateLimit({ attempts: a }, a[3] + 299999), { allowed: false, retryAfterMs: 1 });
  assert.deepEqual(rateLimit({ attempts: a }, a[3] + 300000), { allowed: true, retryAfterMs: 0 });
  // retryAfterMs не отрицательный, если давно прошло
  assert.equal(rateLimit({ attempts: a }, a[3] + 900000).retryAfterMs, 0);
});

// --- originAllowed ---

test('originAllowed: свой домен и file:// — можно, чужой — нет', () => {
  const allowed = ['https://cassindex.ru', 'https://www.cassindex.ru', 'null', null];
  assert.equal(originAllowed('https://cassindex.ru', allowed), true);
  assert.equal(originAllowed('https://www.cassindex.ru', allowed), true);
  assert.equal(originAllowed('null', allowed), true); // file:// в браузере
  assert.equal(originAllowed(null, allowed), true);
  assert.equal(originAllowed('https://evil.example', allowed), false);
  assert.equal(originAllowed('https://cassindex.ru.evil.example', allowed), false);
  assert.equal(originAllowed(undefined, allowed), false);
});

// --- timingToken ---

test('timingToken: валиден, если с отрисовки прошло >= 2000 мс', () => {
  assert.equal(timingToken(1000, 2999), false);
  assert.equal(timingToken(1000, 3000), true);
  assert.equal(timingToken(1000, 5000), true);
  assert.equal(timingToken(1000, 999), false); // часы «поехали» назад
});

// --- validateFeedback ---

test('validateFeedback: границы длины сообщения 4/5/4000/4001', () => {
  const base = { topic: 'wish', replyTo: '' };
  assert.equal(validateFeedback({ ...base, message: 'abcd' }).ok, false);
  assert.equal(validateFeedback({ ...base, message: 'abcde' }).ok, true);
  assert.equal(validateFeedback({ ...base, message: 'a'.repeat(4000) }).ok, true);
  const tooLong = validateFeedback({ ...base, message: 'a'.repeat(4001) });
  assert.equal(tooLong.ok, false);
  assert.equal(tooLong.errors.message, 'length');
});

test('validateFeedback: пустое сообщение и нестрока — ошибка', () => {
  assert.equal(validateFeedback({ topic: 'wish', message: '' }).errors.message, 'length');
  assert.equal(validateFeedback({ topic: 'wish' }).errors.message, 'length');
  assert.equal(validateFeedback({ topic: 'wish', message: '   ' }).errors.message, 'length');
  // краевые пробелы обрезаются: '  abc  ' — 3 символа, меньше минимума
  assert.equal(validateFeedback({ topic: 'wish', message: '  abc  ' }).errors.message, 'length');
});

test('validateFeedback: replyTo пустой — ок, плохой формат — ошибка', () => {
  const base = { topic: 'remark', message: 'текст сообщения' };
  assert.equal(validateFeedback({ ...base, replyTo: '' }).ok, true);
  assert.equal(validateFeedback({ ...base, replyTo: undefined }).ok, true);
  assert.equal(validateFeedback({ ...base, replyTo: null }).ok, true);
  const bad = validateFeedback({ ...base, replyTo: 'не-email' });
  assert.equal(bad.ok, false);
  assert.equal(bad.errors.replyTo, 'email');
  assert.equal(validateFeedback({ ...base, replyTo: 'a@b' }).errors.replyTo, 'email');
  assert.equal(validateFeedback({ ...base, replyTo: 'a b@c.ru' }).errors.replyTo, 'email');
  assert.equal(validateFeedback({ ...base, replyTo: 'reader@example.com' }).ok, true);
});

test('validateFeedback: тема из белого списка', () => {
  for (const topic of FEEDBACK_TOPICS) {
    assert.equal(validateFeedback({ topic, message: 'нормальное сообщение' }).ok, true);
  }
  const bad = validateFeedback({ topic: 'spam', message: 'нормальное сообщение' });
  assert.equal(bad.ok, false);
  assert.equal(bad.errors.topic, 'topic');
  assert.equal(validateFeedback({ message: 'нормальное сообщение' }).ok, false);
});

test('validateFeedback: errors содержит только ключи с ошибками', () => {
  const ok = validateFeedback({ topic: 'question', message: 'всё в порядке', replyTo: '' });
  assert.deepEqual(ok, { ok: true, errors: {} });
  const bad = validateFeedback({ topic: 'wish', message: 'x', replyTo: 'нет' });
  assert.deepEqual(Object.keys(bad.errors).sort(), ['message', 'replyTo']);
});

// --- Конвенция: никакого innerHTML в модуле секции ---

test('js/sections/feedback.js: нет innerHTML (конвенция DOM-сборки)', () => {
  assert.ok(!moduleSrc.includes('innerHTML'));
});
