// CLI долга истории (ADR 0040): отчёт строится на синтетических входах и на
// реальных calc/input; CLI ничего не пишет и не собирает источников.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readdirSync, statSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { PARAMS } from '../calc/params.js';
import { CRITERIA } from '../calc/engine.js';
import { listInputWeeks, loadWeekInput, buildReport, formatReport } from '../calc/backfill-report.js';

function tmpInputs(files) {
  const dir = mkdtempSync(path.join(tmpdir(), 'ci-backfill-'));
  for (const [week, input] of Object.entries(files)) {
    writeFileSync(path.join(dir, `${week}.json`), JSON.stringify(input));
  }
  return dir;
}

test('listInputWeeks: только датированные JSON, по возрастанию', () => {
  const dir = tmpInputs({ '2026-10-04': { week: '2026-10-04' }, '2026-09-27': { week: '2026-09-27' } });
  writeFileSync(path.join(dir, 'drafts.json'), '{}');
  writeFileSync(path.join(dir, 'notes.txt'), 'x');
  try {
    assert.deepEqual(listInputWeeks(dir), ['2026-09-27', '2026-10-04']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('loadWeekInput: битый JSON — строка ошибки, а не исключение', () => {
  const dir = tmpInputs({});
  writeFileSync(path.join(dir, '2026-10-04.json'), '{ битый');
  try {
    const got = loadWeekInput('2026-10-04', dir);
    assert.equal(got.week, '2026-10-04');
    assert.match(got.error, /не парсится JSON/);
    assert.equal(loadWeekInput('2026-01-01', dir).error, 'вход не найден: ' +
      path.join(dir, '2026-01-01.json'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('buildReport/formatReport: долг, чек-лист и предупреждения схемы на синтетике', () => {
  const criteria = {};
  for (const id of Object.keys(CRITERIA)) criteria[id] = null;
  const dir = tmpInputs({
    '2026-10-04': { week: '2026-10-04', criteria, blindReasons: { 'D4.6': 'not-collected' } },
    '2026-10-11': {
      week: '2026-10-11',
      criteria: { ...criteria, 'D4.6': { value: 0.67, covered: true, sources: [{ url: 'https://x.example/a', date: '2026-10-09' }] } },
      blindReasons: { 'D1.1': 'searched-none' },
      rejected: [{ url: 'ftp://bad', date: '2026/10/09', reason: 'потому что' }],
    },
  });
  try {
    const built = buildReport(
      ['2026-10-04', '2026-10-11'].map((w) => loadWeekInput(w, dir)),
      { ...PARAMS, backfillCriteria: ['D4.6'], backfillWindow: 4 },
    );
    assert.equal(built.report.debt, 1);
    assert.equal(built.report.weeksWithDebt, 1);
    const d46 = built.tasks.filter((t) => t.criterion === 'D4.6');
    assert.deepEqual(d46.map((t) => t.week), ['2026-10-04']);
    assert.ok(built.schemaWarnings.some((w) => w.includes('rejected[0].url')));
    const text = formatReport(built, { ...PARAMS, backfillCriteria: ['D4.6'] });
    assert.match(text, /долг истории: 1 критерий-недель по 1 неделе/);
    assert.match(text, /D4\.6\s+неделя 2026-10-04/);
    assert.match(text, /сбор — вручную/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('реальные входы: отчёт строится, скелеты помечены, сегодняшний долг посчитан', () => {
  const weeks = listInputWeeks();
  assert.ok(weeks.length >= 8, `ожидали входы цепочки, нашли ${weeks.length}`);
  const built = buildReport(weeks);
  assert.deepEqual(built.errors, []);
  // Ранние недели-скелеты (ADR 0040): 08-30/09-06/09-13 размечены.
  assert.deepEqual(built.report.legacy, ['2026-08-30', '2026-09-06', '2026-09-13']);
  // Архив до blindReasonFrom не несёт причин → unknown, а не придуманный долг.
  assert.equal(built.report.byReason['not-collected'], 0);
  assert.ok(built.report.unknown > 0);
  assert.match(formatReport(built), /долг истории: 0 критерий-недель по 0 неделям/);
});

test('CLI долга не пишет файлы в calc/input (только чтение)', () => {
  const before = readdirSync('calc/input').map((f) => [f, statSync(path.join('calc/input', f)).mtimeMs]);
  buildReport(listInputWeeks());
  const after = readdirSync('calc/input').map((f) => [f, statSync(path.join('calc/input', f)).mtimeMs]);
  assert.deepEqual(after, before);
});
