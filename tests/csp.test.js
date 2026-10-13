// Пин состава meta-CSP обеих страниц (таск 02 site-load-fix, R02.1/R06i).
// Чтение HTML с диска, без DOM. Любое изменение политики — осознанная правка
// этого теста. Состав — текущий обоснованный: cloudflareinsights в index.html
// требуется живой аналитике (js/analytics.js: beacon static.cloudflareinsights.com
// + отчёты cloudflareinsights.com, только после согласия); privacy.html их не несёт.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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
