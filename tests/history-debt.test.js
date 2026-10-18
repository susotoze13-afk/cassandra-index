// Долг истории источников (ADR 0040): причина слепоты, реестр отбраковки,
// окно дозабора и происхождение записи. Модуль чистый — без сети, диска и DOM.
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { CRITERIA } from '../calc/engine.js';
import { PARAMS } from '../calc/params.js';
import {
  BLIND_REASONS, ORIGINS, REJECT_REASONS, DEBT_REASON,
  blindReasonOf, weekDebt, debtReport, debtLine, backfillTasks,
  validateRejected, validateBlindReasons,
} from '../calc/history-debt.js';

// Синтетический вход: все критерии слепы, кроме перечисленных покрытых.
function makeInput(week, { covered = {}, reasons = {}, legacy = false } = {}) {
  const criteria = {};
  for (const id of Object.keys(CRITERIA)) {
    criteria[id] = covered[id]
      ? { value: 0.5, covered: true, sources: [{ url: 'https://x.example/a', date: week }] }
      : null;
  }
  const input = { week, criteria };
  if (Object.keys(reasons).length) input.blindReasons = reasons;
  if (legacy) input.legacy_skeleton = true;
  return input;
}

test('enum-ы ADR 0040 зафиксированы (пин схемы)', () => {
  assert.deepEqual(BLIND_REASONS, ['not-collected', 'searched-none', 'gate-failed']);
  assert.deepEqual(ORIGINS, ['collected-in-week', 'editorial-backfill']);
  assert.deepEqual(REJECT_REASONS, ['duplicate', 'out-of-window', 'wrong-criterion', 'weak', 'unavailable']);
  assert.equal(DEBT_REASON, 'not-collected');
});

test('PARAMS: причина слепоты обязательна с даты, окно и список критериев — явные', () => {
  assert.equal(PARAMS.blindReasonFrom, '2026-10-25');
  assert.equal(PARAMS.backfillWindow, 4);
  assert.ok(Array.isArray(PARAMS.backfillCriteria));
  assert.equal(new Set(PARAMS.backfillCriteria).size, PARAMS.backfillCriteria.length, 'дубли в списке');
  for (const id of PARAMS.backfillCriteria) {
    assert.ok(CRITERIA[id], `backfillCriteria: неизвестный критерий ${id}`);
  }
  // Правило наполнения (ADR 0040, Q15): esc ∪ драйверы Д1/Д3/Д5/Д6/Д7.
  const derived = Object.keys(CRITERIA)
    .filter((id) => CRITERIA[id].dir === 'esc' || ['D1', 'D3', 'D5', 'D6', 'D7'].includes(CRITERIA[id].driver));
  assert.deepEqual(PARAMS.backfillCriteria.slice().sort(), derived.slice().sort(),
    'список разошёлся с правилом — правка должна быть осознанной (ADR 0040)');
});

test('blindReasonOf: значение enum, мусор и отсутствие поля → unknown', () => {
  const input = makeInput('2026-10-25', { reasons: { 'D1.1': 'not-collected', 'D1.2': 'мусор' } });
  assert.equal(blindReasonOf(input, 'D1.1'), 'not-collected');
  assert.equal(blindReasonOf(input, 'D1.2'), 'unknown');
  assert.equal(blindReasonOf(input, 'D1.3'), 'unknown');
  assert.equal(blindReasonOf({}, 'D1.1'), 'unknown');
});

test('weekDebt: долг = только not-collected, остальные причины считаются отдельно', () => {
  const input = makeInput('2026-10-25', {
    covered: { 'D1.1': true },
    reasons: { 'D1.2': 'not-collected', 'D1.3': 'not-collected', 'D1.4': 'searched-none', 'D1.5': 'gate-failed' },
  });
  const w = weekDebt('2026-10-25', input);
  assert.equal(w.total, Object.keys(CRITERIA).length - 1);
  assert.equal(w.debt, 2);
  assert.equal(w.byReason['searched-none'], 1);
  assert.equal(w.byReason['gate-failed'], 1);
  // остальные слепые без причины — unknown, в долг не попадают
  assert.equal(w.byReason.unknown, Object.keys(CRITERIA).length - 5);
  assert.equal(w.legacySkeleton, false);
});

test('weekDebt: legacy_skeleton читается как флаг недели-скелета', () => {
  const w = weekDebt('2026-08-30', makeInput('2026-08-30', { legacy: true }));
  assert.equal(w.legacySkeleton, true);
});

test('debtReport/debtLine: сводка считает критерий-недели и недели с долгом', () => {
  const weeks = [
    { week: '2026-09-20', input: makeInput('2026-09-20', { reasons: { 'D1.1': 'not-collected' } }) },
    { week: '2026-09-27', input: makeInput('2026-09-27', { reasons: { 'D1.1': 'not-collected', 'D1.2': 'searched-none' }, legacy: true }) },
  ];
  const r = debtReport(weeks);
  assert.equal(r.debt, 2);
  assert.equal(r.weeksWithDebt, 2);
  assert.deepEqual(r.debtWeekIds, ['2026-09-20', '2026-09-27']);
  assert.deepEqual(r.legacy, ['2026-09-27']);
  assert.equal(r.byReason['searched-none'], 1);
  const line = debtLine(r);
  assert.match(line, /долг истории: 2 критерий-недель по 2 неделям/);
  assert.match(line, /ранние недели-скелеты: 2026-09-27/);
});

test('backfillTasks: окно — от недели первого покрытия, только вперёд по списку', () => {
  const order = ['2026-09-06', '2026-09-13', '2026-09-20', '2026-09-27', '2026-10-04', '2026-10-11'];
  const weeks = order.map((week, i) => ({
    week,
    input: makeInput(week, {
      // D4.6 покрыт только с 2026-10-04 (индекс 4)
      covered: i >= 4 ? { 'D4.6': true } : {},
      reasons: i >= 4 ? {} : { 'D4.6': 'not-collected' },
    }),
  }));
  const tasks = backfillTasks(weeks);
  const d46 = tasks.filter((t) => t.criterion === 'D4.6');
  // окно 4 → 09-06, 09-13, 09-20, 09-27 (недели перед первым покрытием), 08-30 в наборе нет
  assert.deepEqual(d46.map((t) => t.week), ['2026-09-06', '2026-09-13', '2026-09-20', '2026-09-27']);
  assert.ok(d46.every((t) => t.firstCovered === '2026-10-04'));
  assert.ok(d46.every((t) => t.reason === 'not-collected'));
});

test('backfillTasks: сужение окна и критерий без покрытия', () => {
  const order = ['2026-09-20', '2026-09-27', '2026-10-04'];
  const weeks = order.map((week, i) => ({
    week,
    input: makeInput(week, {
      covered: i >= 2 ? { 'D4.6': true } : {},
      reasons: i >= 2 ? {} : { 'D4.6': 'not-collected' },
    }),
  }));
  const narrow = backfillTasks(weeks, { ...PARAMS, backfillWindow: 1 });
  assert.deepEqual(narrow.filter((t) => t.criterion === 'D4.6').map((t) => t.week), ['2026-09-27']);
  const never = backfillTasks([weeks[0], weeks[1]], { ...PARAMS, backfillCriteria: ['D4.6'] });
  assert.deepEqual(never, [{ criterion: 'D4.6', week: null, reason: 'never-covered', windowStart: null }]);
});

test('backfillTasks: окно смотрит только назад — слепота после первого покрытия не долг', () => {
  const weeks = [
    { week: '2026-09-20', input: makeInput('2026-09-20', { covered: { 'D4.6': true } }) },
    { week: '2026-09-27', input: makeInput('2026-09-27', { reasons: { 'D4.6': 'searched-none' } }) },
    { week: '2026-10-04', input: makeInput('2026-10-04', { reasons: { 'D4.6': 'searched-none' } }) },
    { week: '2026-10-11', input: makeInput('2026-10-11', { covered: { 'D4.6': true } }) },
  ];
  const tasks = backfillTasks(weeks, { ...PARAMS, backfillCriteria: ['D4.6'] });
  assert.deepEqual(tasks, []);
});

test('validateRejected: warning на битые записи, не исключение', () => {
  assert.deepEqual(validateRejected({}), []);
  assert.deepEqual(validateRejected({ rejected: [] }), []);
  const warnings = validateRejected({
    rejected: [
      { url: 'https://ok.example/a', date: '2026-10-14', reason: 'weak' },
      { url: 'ftp://bad', date: '14.10.2026', reason: 'потому что' },
      'строка',
      { url: 'https://x.example/b', date: '2026-10-15', reason: 'duplicate', origin: 'неизвестно' },
    ],
  });
  assert.equal(warnings.length, 5);
  assert.ok(warnings.some((w) => w.startsWith('rejected[1].url')));
  assert.ok(warnings.some((w) => w.startsWith('rejected[1].date')));
  assert.ok(warnings.some((w) => w.startsWith('rejected[1].reason')));
  assert.ok(warnings.some((w) => w.startsWith('rejected[2]: object required')));
  assert.ok(warnings.some((w) => w.startsWith('rejected[3].origin')));
  assert.equal(validateRejected({ rejected: 'не массив' }).length, 1);
});

test('validateBlindReasons: обязательна с blindReasonFrom, архив не трогаем', () => {
  const old = makeInput('2026-10-18');
  assert.deepEqual(validateBlindReasons(old), [], 'недели до blindReasonFrom не проверяются');

  const fresh = makeInput('2026-10-25', { reasons: { 'D1.1': 'not-collected' } });
  const warnings = validateBlindReasons(fresh);
  assert.ok(warnings.length > 0);
  assert.ok(warnings.every((w) => w.startsWith('blindReasons.')));
  assert.ok(warnings.some((w) => w.includes('D1.2')), 'слепой без причины попал в предупреждения');
  assert.ok(!warnings.some((w) => w.includes('D1.1:')), 'заполненная причина не предупреждает');
});

test('validateBlindReasons: причина на покрытом критерии и неизвестный id — предупреждения', () => {
  const input = makeInput('2026-10-25', { covered: { 'D1.1': true } });
  input.blindReasons = { 'D1.1': 'searched-none', 'D99.9': 'not-collected' };
  const warnings = validateBlindReasons(input);
  assert.ok(warnings.some((w) => w.includes('D1.1: критерий покрыт')));
  assert.ok(warnings.some((w) => w.includes('D99.9: критерий вне CRITERIA')));
});
