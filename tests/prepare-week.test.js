import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { addRecalcWeek, addLatestWeek } from '../calc/prepare-week.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// --- addRecalcWeek: синтетический источник ---
const CALC_SAMPLE = "const RECALC_WEEKS = ['2026-08-30', '2026-09-06'];\nconst PREV_WEEK = '2026-08-23';\n";

test('addRecalcWeek: добавляет дату в конец массива, не трогая остальной код', () => {
  const r = addRecalcWeek(CALC_SAMPLE, '2026-10-11');
  assert.equal(r.changed, true);
  assert.ok(r.src.includes("const RECALC_WEEKS = ['2026-08-30', '2026-09-06', '2026-10-11'];"));
  assert.ok(r.src.includes("const PREV_WEEK = '2026-08-23';"));
});

test('addRecalcWeek: повторный вызов идемпотентен', () => {
  const once = addRecalcWeek(CALC_SAMPLE, '2026-10-11');
  const twice = addRecalcWeek(once.src, '2026-10-11');
  assert.equal(twice.changed, false);
  assert.equal(twice.src, once.src);
});

test('addRecalcWeek: уже существующая неделя — без изменений', () => {
  const r = addRecalcWeek(CALC_SAMPLE, '2026-08-30');
  assert.equal(r.changed, false);
  assert.equal(r.src, CALC_SAMPLE);
});

test('addRecalcWeek: неверный формат недели — ошибка', () => {
  assert.throws(() => addRecalcWeek(CALC_SAMPLE, '11-10-2026'), /YYYY-MM-DD/);
  assert.throws(() => addRecalcWeek(CALC_SAMPLE, undefined), /YYYY-MM-DD/);
});

test('addRecalcWeek: в источнике нет RECALC_WEEKS — ошибка', () => {
  assert.throws(() => addRecalcWeek('const x = 1;\n', '2026-10-11'), /RECALC_WEEKS/);
});

// --- addLatestWeek: синтетический источник ---
const LATEST_SAMPLE = 'window.CI_WEEKS = ["2026-08-02","2026-08-09"];\nwindow.CI_LATEST = "2026-08-09";\n';

test('addLatestWeek: новейшая неделя попадает в CI_WEEKS и становится CI_LATEST', () => {
  const r = addLatestWeek(LATEST_SAMPLE, '2026-08-16');
  assert.equal(r.changed, true);
  assert.ok(r.src.includes('window.CI_WEEKS = ["2026-08-02","2026-08-09","2026-08-16"];'));
  assert.ok(r.src.includes('window.CI_LATEST = "2026-08-16";'));
});

test('addLatestWeek: старая неделя встаёт по порядку, CI_LATEST не понижается', () => {
  const src = 'window.CI_WEEKS = ["2026-08-09"];\nwindow.CI_LATEST = "2026-08-09";\n';
  const r = addLatestWeek(src, '2026-08-02');
  assert.equal(r.changed, true);
  assert.ok(r.src.includes('window.CI_WEEKS = ["2026-08-02","2026-08-09"];'));
  assert.ok(r.src.includes('window.CI_LATEST = "2026-08-09";'));
});

test('addLatestWeek: уже учтённая неделя — без изменений', () => {
  const r = addLatestWeek(LATEST_SAMPLE, '2026-08-09');
  assert.equal(r.changed, false);
  assert.equal(r.src, LATEST_SAMPLE);
});

test('addLatestWeek: неверный формат недели — ошибка', () => {
  assert.throws(() => addLatestWeek(LATEST_SAMPLE, '20261011'), /YYYY-MM-DD/);
});

test('addLatestWeek: в источнике нет CI_WEEKS — ошибка', () => {
  assert.throws(() => addLatestWeek('// пусто\n', '2026-10-11'), /CI_WEEKS/);
});

// --- Реальные файлы репо: тест читает с диска, ничего не пишет ---
test('реальный calc/calc.js: неделя цепочки уже есть, новая добавляется', () => {
  const src = readFileSync(path.join(ROOT, 'calc', 'calc.js'), 'utf8');
  const existing = addRecalcWeek(src, '2026-08-30');
  assert.equal(existing.changed, false);
  assert.equal(existing.src, src);
  const added = addRecalcWeek(src, '2099-12-31');
  assert.equal(added.changed, true);
  assert.ok(added.src.includes("'2099-12-31'"));
  const again = addRecalcWeek(added.src, '2099-12-31');
  assert.equal(again.changed, false);
  assert.equal(again.src, added.src);
});

test('реальный data/latest.js: текущая latest без изменений, новая неделя добавляется', () => {
  const src = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
  const cur = src.match(/window\.CI_LATEST = "([0-9-]{10})"/)[1];
  const same = addLatestWeek(src, cur);
  assert.equal(same.changed, false);
  assert.equal(same.src, src);
  const added = addLatestWeek(src, '2099-12-31');
  assert.equal(added.changed, true);
  assert.ok(added.src.includes('window.CI_LATEST = "2099-12-31"'));
  const weeks = added.src.match(/window\.CI_WEEKS = (\[[^\]]*\])/)[1];
  assert.ok(weeks.includes('"2099-12-31"'));
});
