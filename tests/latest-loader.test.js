// Контракт загрузчика data/latest.js: document.write-список файлов данных.
// Таск 02 (site-load-fix): по одному комбинированному data/<week>/week.js на
// неделю вместо отдельных частей. Механика document.write,
// window.CI_WEEKS/CI_LATEST — без изменений. Согласие списков — через сами
// значения (число недель литералом не пинится: тесты согласия списков —
// tests/weeklists-agreement.test.js). Выполнение файла в vm с поддельным
// document (без DOM/сети).
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

test('загрузчик: window.CI_WEEKS/CI_LATEST согласованы между собой', () => {
  const { sandbox } = runLoader();
  const ci = Array.from(sandbox.window.CI_WEEKS); // локальная копия — массив из vm-контекста другого realm
  assert.ok(ci.length > 0, 'CI_WEEKS пуст');
  assert.equal(new Set(ci).size, ci.length, 'CI_WEEKS: есть дубли');
  assert.deepEqual([...ci].sort(), ci, 'CI_WEEKS не отсортирован по возрастанию');
  assert.ok(ci.includes(sandbox.window.CI_LATEST), 'CI_LATEST не входит в CI_WEEKS');
  assert.equal(sandbox.window.CI_LATEST, ci.at(-1), 'CI_LATEST — не последняя неделя');
  assert.equal(sandbox.window.CI_DATA.latest, sandbox.window.CI_LATEST,
    'CI_DATA.latest не согласован с CI_LATEST');
  assert.deepEqual(Object.keys(sandbox.window.CI_DATA.snapshots), []);
});

test('загрузчик: ровно по одному document.write data/<week>/week.js на каждую неделю CI_WEEKS', () => {
  const { sandbox, writes } = runLoader();
  const ci = sandbox.window.CI_WEEKS;
  assert.equal(writes.length, ci.length,
    `записей ${writes.length}, недель в CI_WEEKS ${ci.length}`);
  const expected = ci.map(
    (w) => `<script src="data/${w}/week.js"><\/script>`,
  );
  assert.equal(writes.join('\n'), expected.join('\n'));
});

test('загрузчик: ни один write не ссылается на отдельные части снапшота', () => {
  const { writes } = runLoader();
  // форма-write-гвардия вместо перечня частей (перечень зашить нельзя:
  // наборы частей зависят от версии таксономии недели) — week.js позволен,
  // любая другая data/<week>/<файл> — часть (имя файла — захват без ".js")
  for (const w of writes) {
    const m = w.match(/data\/\d{4}-\d{2}-\d{2}\/([^/]+)\.js/);
    assert.ok(m && m[1] === 'week', `write ссылается на часть: ${w}`);
  }
});
