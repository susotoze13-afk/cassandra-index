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

// Блог «Разбор недели» (ADR 0037 → ADR 0056): статический архив blog/index.html
// и страницы недель; articles.html остался алиасом-редиректом. Главная ссылается
// на блог из шапки и подвала — это постоянная точка входа, а не разовая ссылка.
const articlesHtml = readFileSync(join(root, 'articles.html'), 'utf8');

test('blog: главная ссылается на блог в шапке и подвале', () => {
  assert.ok(indexHtml.includes('href="blog/"'), 'главная должна ссылаться на blog/');
  assert.ok(indexHtml.includes('data-i18n="nav.blog"'), 'ссылка шапки должна брать строку из словаря');
  assert.ok(indexHtml.includes('data-i18n="footer.blog"'), 'ссылка подвала должна брать строку из словаря');
  assert.ok(indexHtml.includes('href="blog/" data-i18n="nav.blog"'), 'в шапке нет пункта «Блог»');
});

test('articles.html: алиас ведёт в статический блог, а не рендерит выпуск', () => {
  assert.ok(articlesHtml.includes('href="blog/"'), 'articles.html должен вести в blog/');
  assert.ok(articlesHtml.includes('<link rel="canonical" href="https://cassindex.ru/blog/">'),
    'канонический адрес алиаса — страница блога');
  assert.ok(articlesHtml.includes('http-equiv="refresh"'), 'алиас должен перенаправлять без JS');
  assert.ok(!articlesHtml.includes('data-role="article"'), 'динамический хост выпуска больше не нужен');
});
