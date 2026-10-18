import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Формулировка взята из брифа (спека, история R07), не из README под тестом.
const OFFICIAL_SOURCE = 'Официальный источник — cassindex.ru; форки не являются официальными.';

test('README.md: официальный источник заявлен дословно после заголовка', () => {
  const readme = readFileSync(join(root, 'README.md'), 'utf8');
  const lines = readme.split(/\r?\n/).map((line) => line.trim());
  const titleIndex = lines.findIndex((line) => line !== '');
  assert.equal(lines[titleIndex], '# Cassandra Index', 'файл должен начинаться заголовком');
  const afterTitle = lines.slice(titleIndex + 1).find((line) => line !== '');
  assert.equal(afterTitle, OFFICIAL_SOURCE);
});

test('корень: README, CONTRIBUTING и SECURITY на месте', () => {
  for (const file of ['README.md', 'CONTRIBUTING.md', 'SECURITY.md']) {
    assert.ok(existsSync(join(root, file)), `нет файла ${file}`);
  }
});
