import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { SCALE } from '../js/risk.js';

// Паритет документа и кода (R08/A01/A02/A03): диапазоны состояний живут в двух
// местах — таблица §9 METHODOLOGY.md и SCALE в js/risk.js. Ожидания берутся из
// документа на диске, сеть не используется.

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const METHODOLOGY = readFileSync(join(ROOT, 'METHODOLOGY.md'), 'utf8');
const RISK_SOURCE = readFileSync(join(ROOT, 'js', 'risk.js'), 'utf8');

const RANGE_ROW = /^\|\s*(\d{1,3})[–-](\d{1,3})\s*\|/gm;

function sectionAfter(heading, nextPrefix) {
  const from = METHODOLOGY.indexOf(heading);
  assert.notEqual(from, -1, `в METHODOLOGY.md нет раздела «${heading}»`);
  const to = METHODOLOGY.indexOf(nextPrefix, from + heading.length);
  assert.notEqual(to, -1, `не найден конец раздела «${heading}»`);
  return METHODOLOGY.slice(from, to);
}

function rangeRows(text) {
  return [...text.matchAll(RANGE_ROW)].map((m) => ({ lo: Number(m[1]), hi: Number(m[2]) }));
}

test('§9 ↔ SCALE: диапазоны таблицы состояний совпадают с js/risk.js', () => {
  const rows = rangeRows(sectionAfter('## 9. Состояния и пороги', '\n## '));
  assert.equal(rows.length, SCALE.length, 'число строк таблицы §9 и записей SCALE разошлось');
  SCALE.forEach((entry, i) => {
    const row = rows[i];
    assert.equal(row.hi, entry.max, `${i + 1}-й диапазон §9: верх ${row.hi} ≠ SCALE.max ${entry.max}`);
    assert.equal(row.lo, i === 0 ? 0 : rows[i - 1].hi + 1, `${i + 1}-й диапазон §9 начинается не со следующего числа`);
  });
  assert.equal(rows[rows.length - 1].hi, 100, 'последний диапазон §9 не доходит до 100');
});

test('§1.2: таблица-граница диапазонов совпадает с таблицей §9', () => {
  const boundary = rangeRows(sectionAfter('### 1.2.', '\n## '));
  const scale = rangeRows(sectionAfter('## 9. Состояния и пороги', '\n## '));
  assert.deepEqual(boundary, scale, 'таблица-граница §1.2 расходится с таблицей состояний §9');
});

test('§1.2: состояния ссылаются на §9, а не на §10', () => {
  const text = sectionAfter('### 1.2.', '\n## ');
  assert.equal(text.includes('§10'), false, '§1.2 всё ещё ссылается на несуществующий раздел порогов §10');
  assert.ok(text.includes('§9'), '§1.2 не ссылается на раздел состояний §9');
});

test('§1.2: процедура применения (а)/(б)/(в) с исходом «недостаточно данных»', () => {
  const text = sectionAfter('### 1.2.', '\n## ');
  assert.ok(text.includes('недостаточно данных'), '§1.2 не описывает исход «недостаточно данных»');
  assert.ok(text.includes('(а)') && text.includes('(б)') && text.includes('(в)'), '§1.2 потерял условия (а)/(б)/(в)');
});

test('§4.1.5: поле intersection описано, запрет снят', () => {
  const text = sectionAfter('#### 4.1.5.', '\n#### ');
  assert.ok(text.includes('`intersection`'), '§4.1.5 не называет поле intersection');
  assert.equal(text.includes('не вводится'), false, '§4.1.5 всё ещё утверждает, что флаг не вводится');
  assert.ok(text.includes('редактор'), '§4.1.5 не говорит, кто ставит флаг');
  assert.ok(text.includes('| Д3.3 |'), 'матрица главных/вторичных критериев исчезла из §4.1.5');
});

test('js/risk.js: шапка ссылается на METHODOLOGY §1.2 и §9', () => {
  const header = RISK_SOURCE.slice(0, RISK_SOURCE.indexOf('export const SCALE'));
  assert.ok(header.includes('METHODOLOGY §1.2'), 'шапка js/risk.js не ссылается на METHODOLOGY §1.2');
  assert.ok(header.includes('§9'), 'шапка js/risk.js не ссылается на §9');
  assert.equal(header.includes('§10'), false, 'шапка js/risk.js ссылается на PRD §10 вместо §9 METHODOLOGY');
});
