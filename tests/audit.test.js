import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { append, verify, read, REDTEAM_QUESTIONS } from '../calc/audit.js';

const REQUIRED_FIELDS = [
  'snapshot_id',
  'version_before',
  'version_after',
  'changed_by',
  'changed_at',
  'reason',
  'parameters_changed',
  'recalculation_method',
  'diff',
  'approved_by',
];

function makeRecord(overrides = {}) {
  return {
    type: 'recalc',
    snapshot_id: '2026-09-13',
    version_before: '1.0',
    version_after: '1.0',
    changed_by: 'editor',
    changed_at: '2026-09-21T12:00:00Z',
    reason: 'weekly recalc',
    parameters_changed: [],
    recalculation_method: 'calc.js chain',
    diff: { index: { from: 57, to: 58 } },
    approved_by: 'editor-in-chief',
    ...overrides,
  };
}

function tmpLog() {
  const dir = mkdtempSync(join(tmpdir(), 'ci-audit-'));
  return join(dir, 'audit.jsonl');
}

test('append пишет в конец, возвращает id и hash; следующая запись ссылается prev_hash', () => {
  const log = tmpLog();
  const first = append(makeRecord(), log);
  const second = append(makeRecord({ snapshot_id: '2026-09-06' }), log);

  assert.match(first.id, /^recalc-0001$/);
  assert.match(second.id, /^recalc-0002$/);
  assert.ok(first.hash, 'hash первой записи непустой');
  assert.notEqual(first.hash, second.hash);

  const lines = readFileSync(log, 'utf8').trim().split('\n');
  assert.equal(lines.length, 2, 'append-only: файл растёт, не перезаписывается');

  const rec1 = JSON.parse(lines[0]);
  const rec2 = JSON.parse(lines[1]);
  assert.equal(rec2.prev_hash, rec1.hash, 'prev_hash = hash предыдущей записи');
  assert.equal(rec1.created_by, rec1.changed_by);
  assert.equal(rec1.diff.index.from, 57);
});

test('verify ok на чистой цепочке; правка записи ломает цепочку с индексом brokenAt', () => {
  const log = tmpLog();
  append(makeRecord(), log);
  append(makeRecord({ reason: 'second entry' }), log);
  append(makeRecord({ reason: 'third entry' }), log);

  const clean = verify(log);
  assert.deepEqual(clean, { ok: true, brokenAt: null, count: 3 });

  const lines = readFileSync(log, 'utf8').trim().split('\n');
  const tampered = JSON.parse(lines[1]);
  tampered.reason = 'forged after the fact';
  lines[1] = JSON.stringify(tampered);
  writeFileSync(log, lines.join('\n') + '\n');

  const broken = verify(log);
  assert.equal(broken.ok, false);
  assert.equal(broken.brokenAt, 1);
  assert.equal(broken.count, 3);
});

test('append без любого обязательного поля бросает ошибку с именем поля', () => {
  const log = tmpLog();
  for (const field of REQUIRED_FIELDS) {
    const record = makeRecord();
    delete record[field];
    assert.throws(
      () => append(record, log),
      new RegExp(field),
      `запись без ${field} должна отклоняться с именем поля`,
    );
  }
  assert.equal(read(log).length, 0, 'отклонённые записи не попадают в журнал');
});

test('flash-запись: diff может быть пустым, snapshot_id обязан быть строкой', () => {
  const log = tmpLog();
  const ok = append(
    makeRecord({ type: 'flash', diff: {}, snapshot_id: '2026-09-13' }),
    log,
  );
  assert.match(ok.id, /^flash-0001$/);

  assert.throws(
    () => append(makeRecord({ type: 'flash', diff: {}, snapshot_id: 42 }), log),
    /snapshot_id/,
  );
  assert.throws(
    () => append(makeRecord({ snapshot_id: 42 }), log),
    /snapshot_id/,
  );
});

test('redteam-запись: append проходит, verify зелёный, форма — 7 ответов + flags + approved_by', () => {
  const log = tmpLog();
  append(makeRecord(), log);
  const rec = append(
    {
      type: 'redteam',
      week: '2026-10-11',
      answers: [
        'домен X = 60 % недели — превышение, источники перераспределены',
        'источник, опровергающий главный сигнал: не назван — добавлен',
        'D3 и D4 полностью на одном домене — подтверждение вторым кластером найдено',
        'ядро: пропуск cluster C (реестры) — в окне нет сигналов, зафиксировано',
        'secondary-на-secondary без primary у D7 — заменено на primary',
        'цитата драйвера D5 сверена с источником дословно',
        'события отделены от громкости ленты по правилу §4 окна W−7…W',
      ],
      flags: ['dominance: example.com', 'core-gap: C'],
      approved_by: 'editor-in-chief',
    },
    log,
  );
  assert.match(rec.id, /^redteam-0002$/);

  const clean = verify(log);
  assert.deepEqual(clean, { ok: true, brokenAt: null, count: 2 });

  const lines = readFileSync(log, 'utf8').trim().split('\n');
  const stored = JSON.parse(lines[1]);
  assert.equal(stored.prev_hash, JSON.parse(lines[0]).hash);
  assert.equal(stored.week, '2026-10-11');
  assert.equal(stored.answers.length, 7);
  assert.equal(stored.created_by, 'editor-in-chief');
});

test('redteam-валидация: ровно 7 непустых строк answers, week/approved_by обязательны, flags — строки', () => {
  const log = tmpLog();
  const good = {
    type: 'redteam',
    week: '2026-10-11',
    answers: ['1', '2', '3', '4', '5', '6', '7'],
    flags: [],
    approved_by: 'editor-in-chief',
  };
  append(good, log);

  assert.throws(() => append({ ...good, answers: ['1', '2', '3'] }, log), /answers/);
  assert.throws(() => append({ ...good, answers: ['1', '2', '3', '4', '5', '6', ''] }, log), /answers/);
  assert.throws(() => append({ ...good, week: '' }, log), /week/);
  assert.throws(() => append({ ...good, approved_by: '' }, log), /approved_by/);
  assert.throws(() => append({ ...good, flags: [42] }, log), /flags/);
  assert.throws(() => append({ ...good, type: 'unknown' }, log), /unknown type/);
  assert.equal(read(log).length, 1, 'отклонённые записи не попадают в журнал');
});

test('REDTEAM_QUESTIONS: канонические 7 вопросов чек-листа (Q16), 6 и 7 — разные', () => {
  assert.equal(REDTEAM_QUESTIONS.length, 7);
  for (const q of REDTEAM_QUESTIONS) {
    assert.equal(typeof q, 'string');
    assert.notEqual(q.trim(), '');
  }
  assert.match(REDTEAM_QUESTIONS[1], /опроверг/i, 'вопрос 2 — поиск опровержения главного сигнала');
  assert.match(REDTEAM_QUESTIONS[3], /ядр/i, 'вопрос 4 — пропуски ядра');
  assert.notEqual(REDTEAM_QUESTIONS[5], REDTEAM_QUESTIONS[6], '6 и 7 не объединены');
});

test('read() возвращает записи в порядке добавления', () => {
  const log = tmpLog();
  append(makeRecord({ reason: 'a' }), log);
  append(makeRecord({ type: 'methodology', reason: 'b', version_after: '2.0' }), log);
  const records = read(log);
  assert.equal(records.length, 2);
  assert.equal(records[0].reason, 'a');
  assert.equal(records[1].id, 'methodology-0002');
});

test('импорт модуля не создаёт файлы; журнал по умолчанию в data/audit.jsonl', () => {
  const repoRoot = new URL('..', import.meta.url).pathname;
  const defaultLog = join(repoRoot, 'data', 'audit.jsonl');
  assert.equal(existsSync(defaultLog), false, 'реальный data/audit.jsonl не тронут');
});
