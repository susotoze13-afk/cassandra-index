// Рубрика «Разбор недели» (ADR 0037): чистые швы js/article.js + конвертер
// article-build.js + ворота (лексика/числа/источники) над реальным сидом
// data/2026-10-18/article.js и снапшотом недели. Ожидаемые значения — из ADR/
// снапшота, не из кода под тестом.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import {
  articleOf,
  validateArticle,
  articleRefs,
  lexiconViolations,
  checkArticleNumbers,
  checkArticleSources,
  auditArticle,
  FORBIDDEN,
} from '../js/article.js';
import { validate } from '../js/data.js';

const require = createRequire(import.meta.url);
const builder = require('../article-build.js');

const ROOT = path.resolve(import.meta.dirname, '..');

function loadSnapshot() {
  const ctx = { window: { CI_DATA: { snapshots: {} } } };
  vm.createContext(ctx);
  vm.runInContext(readFileSync(path.join(ROOT, 'data/2026-10-18', 'week.js'), 'utf8'), ctx);
  vm.runInContext(readFileSync(path.join(ROOT, 'data/2026-10-18', 'article.js'), 'utf8'), ctx);
  return ctx.window.CI_DATA.snapshots['2026-10-18'];
}

const md = readFileSync(path.join(ROOT, 'docs/articles/weekly/2026-10-18.md'), 'utf8');
const parsed = builder.parseArticleMarkdown(md);
const snapshot = loadSnapshot();
const article = snapshot.article;

test('конвертер: разбирает сводку, регионы, featured_region без запрещённой лексики', () => {
  assert.deepEqual(parsed.summary, { index: 64, delta: 8, covered: 34, total: 46 });
  assert.equal(parsed.featured_region, 'middle-east');
  assert.equal(parsed.regionRows.length, 12);
  assert.ok(parsed.blocks.length > 0);
  assert.deepEqual(builder.lexiconViolations(parsed), []);
});

test('сид article.js регенерируется из черновика (идемпотентность)', () => {
  const regenerated = builder.articleFileFor(parsed);
  const onDisk = readFileSync(path.join(ROOT, 'data/2026-10-18/article.js'), 'utf8');
  assert.equal(regenerated, onDisk);
});

test('контракт выпуска валиден', () => {
  assert.deepEqual(validateArticle(article), []);
});

test('лексический ворот: выпуск чист', () => {
  assert.deepEqual(lexiconViolations(article), []);
  assert.ok(FORBIDDEN.includes('прогноз'));
  assert.ok(FORBIDDEN.includes('дельта'));
});

test('числа прозы совпадают со снапшотом', () => {
  const r = checkArticleNumbers(article, snapshot);
  assert.deepEqual(r, { ok: true, mismatches: [] });
});

test('источники прозы ⊆ R55-источников недели', () => {
  const r = checkArticleSources(article, snapshot);
  assert.deepEqual(r, { ok: true, missing: [] });
  // 87 уникальных ссылок r55: — все из недели; вне цитирования только контекст.
  const refs = articleRefs(article);
  assert.equal(refs.length, 87);
  assert.ok(refs.every((ref) => ref.startsWith('r55:')));
});

test('аудит целиком зелёный', () => {
  const a = auditArticle(article, snapshot);
  assert.deepEqual(a.contract, []);
  assert.deepEqual(a.lexicon, []);
  assert.equal(a.numbers.ok, true);
  assert.equal(a.sources.ok, true);
});

test('битая форма выпуска роняет контракт data.js', () => {
  const okSnap = { ...snapshot };
  assert.equal(validate(okSnap).ok, true);
  const bad = { ...snapshot, article: { week: '2026-10-18', title: '', blocks: [] } };
  assert.ok(validate(bad).errors.some((e) => e.startsWith('article:')));
});

test('ворота ловят расхождение чисел и чужой источник', () => {
  const num = checkArticleNumbers(
    { ...article, summary: { index: 63, delta: 8, covered: 34, total: 46 } },
    snapshot,
  );
  assert.equal(num.ok, false);
  const src = checkArticleSources(
    { ...article, blocks: [...article.blocks, { t: 'p', seg: [{ t: 'link', v: 'X', ref: 'r55:nonexistent' }] }] },
    snapshot,
  );
  assert.deepEqual(src.missing, ['nonexistent']);
});

test('старые снапшоты без article валидны (forward-only)', () => {
  const { article: _drop, ...rest } = snapshot;
  assert.equal(validate(rest).ok, true);
});
