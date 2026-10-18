// Cache-busting бандлов (build.js): GitHub Pages кэширует js/, поэтому HTML
// обязан ссылаться на текущий бандл с хэшем содержимого. Иначе новый HTML
// встречается со старым bundle.js — на живой странице проступает сырой ключ
// словаря (симптом: «nav.blog» вместо «Блог»).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PAGES = [
  ['index.html', 'js/bundle.js'],
  ['privacy.html', 'js/bundle-privacy.js'],
];

test('HTML ссылается на бандл с хэшем текущего содержимого', () => {
  for (const [htmlFile, bundleFile] of PAGES) {
    const bundle = readFileSync(path.join(ROOT, bundleFile), 'utf8');
    const hash = createHash('sha256').update(bundle).digest('hex').slice(0, 10);
    const html = readFileSync(path.join(ROOT, htmlFile), 'utf8');
    assert.ok(
      html.includes(`src="${bundleFile}?v=${hash}"`),
      `${htmlFile}: нет src="${bundleFile}?v=${hash}" — пересоберите node build.js`,
    );
    assert.equal(
      (html.match(new RegExp(`src="${bundleFile.replace(/\./g, '\\.')}\\?v=`, 'g')) || []).length,
      1,
      `${htmlFile}: ссылка на ${bundleFile} должна быть ровно одна`,
    );
  }
});
