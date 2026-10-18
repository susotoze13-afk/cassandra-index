// Контракт загрузчика data/latest.js: document.write-список файлов данных.
// Таск 02 (site-load-fix): 12 комбинированных data/<week>/week.js вместо
// 121 отдельных частей. Механика document.write, window.CI_WEEKS/CI_LATEST —
// без изменений. Выполнение файла в vm с поддельным document (без DOM/сети).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');

function runLoader() {
  const src = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
  const writes = [];
  const sandbox = {
    window: {},
    document: { write: (s) => { writes.push(s); } },
  };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return { sandbox, writes };
}

test('загрузчик: window.CI_WEEKS (12 недель) и CI_LATEST не меняются', () => {
  const { sandbox } = runLoader();
  assert.equal(sandbox.window.CI_WEEKS.length, 12);
  assert.equal(sandbox.window.CI_LATEST, '2026-10-18');
  assert.equal(sandbox.window.CI_DATA.latest, '2026-10-18');
  assert.deepEqual(Object.keys(sandbox.window.CI_DATA.snapshots), []);
});

test('загрузчик: ровно 12 document.write — по одному data/<week>/week.js на неделю', () => {
  const { sandbox, writes } = runLoader();
  assert.equal(writes.length, 12);
  const expected = sandbox.window.CI_WEEKS.map(
    (w) => `<script src="data/${w}/week.js"><\/script>`,
  );
  assert.equal(writes.join('\n'), expected.join('\n'));
});

test('загрузчик: ни один write не ссылается на отдельные части снапшота', () => {
  const { writes } = runLoader();
  const parts = ['global', 'regions', 'region-europe', 'region-east-asia',
    'region-middle-east', 'region-north-america', 'region-south-asia',
    'region-africa', 'trend', 'drivers', 'sources'];
  for (const w of writes) {
    for (const p of parts) {
      assert.ok(!w.includes(`/${p}.js`), `write ссылается на часть: ${w}`);
    }
  }
});
