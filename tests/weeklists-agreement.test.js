// Согласие списков недель (R02): RECALC_WEEKS (calc/calc.js) ⊆ CI_WEEKS,
// последняя week цепочки === CI_LATEST, а множества каталогов данных
// data/YYYY-MM-DD совпадают с CI_WEEKS (R01.1 — забытая неделя ловится).
// Списки читаются ТОЛЬКО через read-шовы calc/prepare-week.js — парсинг
// списков не дублируется (см. tests/prepare-week.test.js — там же форма шов).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

import { readRecalcWeeks, readLatestWeeks } from '../calc/prepare-week.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const calcSrc = readFileSync(path.join(ROOT, 'calc', 'calc.js'), 'utf8');
const latestSrc = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');

const RECALC = readRecalcWeeks(calcSrc);
const { weeks: CI, latest: CI_LATEST } = readLatestWeeks(latestSrc);

// Списки непусты и разумны: все даты в формате, списки отсортированы по
// возрастанию, дублей нет.
const WEEK_RE = /^\d{4}-\d{2}-\d{2}$/;
function assertStrictAscending(label, list) {
  assert.ok(list.length > 0, `${label}: список пуст`);
  for (const w of list) {
    assert.ok(WEEK_RE.test(w), `${label}: не дата — ${w}`);
  }
  const sorted = [...list].sort();
  assert.deepEqual(list, sorted, `${label}: не отсортирован по возрастанию`);
  assert.equal(new Set(list).size, list.length, `${label}: есть дубли`);
}

test('CI_WEEKS: непуст, все даты, строго по возрастанию, без дублей', () => {
  assertStrictAscending('CI_WEEKS', CI);
});

test('CI_LATEST: в CI_WEEKS и совпадает с последним элементом', () => {
  assert.ok(WEEK_RE.test(CI_LATEST), `CI_LATEST не дата — ${CI_LATEST}`);
  assert.ok(CI.includes(CI_LATEST), 'CI_LATEST не входит в CI_WEEKS');
  assert.equal(CI_LATEST, CI.at(-1), 'CI_LATEST — не последняя неделя CI_WEEKS');
});

test('RECALC_WEEKS: непуст, все даты, по возрастанию, без дублей', () => {
  assertStrictAscending('RECALC_WEEKS', RECALC);
});

// Демо-недели 08-02…08-23 живут только в CI_WEEKS и не пересчитываются —
// это осознанная история (архив методологии 1.0), поэтому RECALC ⊆ CI_WEEKS.
test('RECALC_WEEKS — подмножество CI_WEEKS', () => {
  const ci = new Set(CI);
  for (const w of RECALC) {
    assert.ok(ci.has(w), `${w}: в RECALC_WEEKS, но не в CI_WEEKS`);
  }
});

test('цепочка согласована: последняя неделя RECALC_WEEKS === CI_LATEST', () => {
  assert.equal(RECALC.at(-1), CI_LATEST,
    'рассинхрон цепочки пересчёта и публикуемого latest');
});

test('диск согласован: каталоги data/YYYY-MM-DD — ровно CI_WEEKS', () => {
  const onDisk = readdirSync(path.join(ROOT, 'data'))
    .filter((name) => WEEK_RE.test(name))
    .sort();
  assert.deepEqual(onDisk, CI,
    'рассинхрон каталогов data/ и CI_WEEKS — забытая или лишняя неделя');
});
