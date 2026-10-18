// Пин состава meta-CSP обеих страниц (таск 02 site-load-fix, R02.1/R06i).
// Чтение HTML с диска, без DOM. Любое изменение политики — осознанная правка
// этого теста. Состав — текущий обоснованный: cloudflareinsights в index.html
// требуется живой аналитике (js/analytics.js: beacon static.cloudflareinsights.com
// + отчёты cloudflareinsights.com, только после согласия); privacy.html их не несёт.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

function metaCsp(file) {
  const html = readFileSync(path.join(ROOT, file), 'utf8');
  const m = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/);
  assert.ok(m, `${file}: meta-CSP не найден`);
  return m[1];
}

test('index.html: meta-CSP — состав не ослаблен, analytics-разрешения на месте', () => {
  const csp = metaCsp('index.html');
  assert.equal(
    csp,
    "default-src 'self'; script-src 'self' https://static.cloudflareinsights.com; " +
    "style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; " +
    "connect-src 'self' https://formsubmit.co https://cloudflareinsights.com; " +
    "form-action 'self' https://formsubmit.co; base-uri 'self'; object-src 'none'",
  );
  assert.ok(!csp.includes("'unsafe-eval'"), 'script-src не должен содержать unsafe-eval');
});

test('privacy.html: meta-CSP чиста от cloudflareinsights, diff к index только связанный', () => {
  const csp = metaCsp('privacy.html');
  assert.equal(
    csp,
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'; " +
    "img-src 'self'; font-src 'self'; connect-src 'self'; form-action 'self'; " +
    "base-uri 'self'; object-src 'none'",
  );
  assert.ok(!csp.includes('cloudflareinsights'), 'privacy.html не несёт разрешений cloudflareinsights');
});

test('blog: статические страницы — только self, без analytics/formsubmit', () => {
  const pages = ['blog/index.html', ...readdirSync(path.join(ROOT, 'blog'))
    .filter((name) => name.endsWith('.html') && name !== 'index.html')
    .map((name) => `blog/${name}`)];
  for (const file of pages) {
    const csp = metaCsp(file);
    assert.equal(
      csp,
      "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; " +
      "font-src 'self'; base-uri 'self'; object-src 'none'",
      `${file}: CSP не соответствует статической странице`,
    );
    assert.ok(!csp.includes('cloudflareinsights'), `${file}: не должен нести аналитику`);
    assert.ok(!csp.includes('formsubmit'), `${file}: не должен нести formsubmit`);
    assert.ok(!csp.includes("'unsafe-inline'"), `${file}: не должен нести unsafe-inline`);
  }
});

test('articles.html: meta-CSP — только self, без analytics/formsubmit', () => {
  const csp = metaCsp('articles.html');
  assert.equal(
    csp,
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; " +
    "font-src 'self'; base-uri 'self'; object-src 'none'",
  );
  assert.ok(!csp.includes('cloudflareinsights'), 'articles.html не несёт разрешений cloudflareinsights');
  assert.ok(!csp.includes('formsubmit'), 'articles.html не несёт разрешения formsubmit');
  assert.ok(!csp.includes("'unsafe-inline'"), 'articles.html не должен нести unsafe-inline');
});
