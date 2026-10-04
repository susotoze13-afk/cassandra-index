import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexHtml = readFileSync(join(root, 'index.html'), 'utf8');

// Прогон 2026-10-04 (R01): блок «История и источники» скрыт со страницы.
// Пинит отсутствие секции и навигационной ссылки — чтобы блок не вернулся молча
// при следующей правке разметки. Ожидание — из брифа, не из кода под тестом.
test('index.html: блок «История и источники» скрыт (секция и навигация)', () => {
  assert.ok(!indexHtml.includes('id="sources"'), 'секция #sources должна быть удалена из разметки');
  assert.ok(!indexHtml.includes('href="#sources"'), 'навигационная ссылка #sources должна быть удалена');
  assert.ok(!indexHtml.includes('data-section="history"'), 'хост секции истории не должен остаться в разметке');
});
