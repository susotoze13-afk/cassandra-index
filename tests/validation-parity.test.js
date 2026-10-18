// tests/validation-parity.test.js — паритет коммиченных производных файлов
// публичной валидации с выводом генератора (R26i, F1).
//
// data/public/validation.json, data/public/forecast-ledger.json и validation.html
// руками не правятся: тест пересобирает их тем же кодом, что и `node calc/backtest.js
// --write`, и сравнивает байты. Правка одной цифры в любом из трёх файлов роняет
// прогон. Сеть не используется; фикстуры и снапшоты читаются с диска.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { readLatestWeeks } from '../calc/prepare-week.js';
import { loadSnapshotFromDisk } from '../calc/public-export.js';
import { buildValidation } from '../calc/backtest.js';
import { buildLedger } from '../calc/ledger.js';
import { VALIDATION_PAGE_FILE, renderValidationPage } from '../calc/validation-page.js';

const ROOT = path.resolve(import.meta.dirname, '..');

const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const jsonText = (value) => `${JSON.stringify(value, null, 2)}\n`;

// Та же сборка, что в CLI: список недель из data/latest.js, снапшот с диска,
// фикстуры по умолчанию (calc/backtest-fixtures), журнал — со штатной git-пробой.
let cached = null;
function rebuilt() {
  if (cached) return cached;
  const { weeks } = readLatestWeeks(read('data/latest.js'));
  const loadSnapshot = (week) => loadSnapshotFromDisk(week, ROOT);
  const validation = buildValidation({ weeks, loadSnapshot });
  const ledger = buildLedger({ weeks, loadSnapshot });
  cached = {
    validation: jsonText(validation),
    ledger: jsonText(ledger),
    page: renderValidationPage(validation, ledger),
  };
  return cached;
}

test('data/public/validation.json совпадает с buildValidation побайтно', () => {
  assert.equal(read('data/public/validation.json'), rebuilt().validation);
});

test('data/public/forecast-ledger.json совпадает с buildLedger побайтно', () => {
  assert.equal(read('data/public/forecast-ledger.json'), rebuilt().ledger);
});

test(`${VALIDATION_PAGE_FILE} совпадает с renderValidationPage побайтно`, () => {
  assert.equal(read(VALIDATION_PAGE_FILE), rebuilt().page);
});
