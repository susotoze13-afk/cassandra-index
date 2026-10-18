// Проверка живого сайта после выката (таск 05, R02/R02.1/R06i/R07i):
// CLI calc/live-check.js на поддельном fetchImpl — файлы data/ читаются с
// диска, сети нет. Две ветки обязательны: успех на реальных файлах и провал,
// когда прод отдаёт данные без цитат (или с нарушенным контрактом).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

import {
  checkSite,
  formatReport,
  EXPECTED_WEEK_COUNT,
  QUOTE_WEEKS,
} from '../calc/live-check.js';

const ROOT = path.resolve(import.meta.dirname, '..');

function readData(rel) {
  return readFileSync(path.join(ROOT, rel), 'utf8');
}

// Поддельный прод: URL `<base>/<путь>` → файл репозитория по тому же пути.
// override(rel) может подменить тело (rel без ведущего слэша).
function fakeServer(override) {
  const requests = [];
  const fetchImpl = async (url) => {
    requests.push(url);
    const rel = new URL(url).pathname.replace(/^\//, '');
    const text = override?.(rel) ?? readData(rel);
    return { ok: true, status: 200, text: async () => text };
  };
  return { fetchImpl, requests };
}

// Снапшот недели из её combined week.js — независимо от кода под тестом
// (тот же vm-приём, что у loadSnapshotPart).
function snapshotOf(week) {
  const sandbox = { window: { CI_DATA: { snapshots: {}, latest: null } } };
  sandbox.window.CI_DATA.snapshots[week] = { regions: {} };
  vm.createContext(sandbox);
  vm.runInContext(readData(`data/${week}/week.js`), sandbox);
  return sandbox.window.CI_DATA.snapshots[week];
}

// «Прод» с подменённой формой снапшота: санитайзер получает копию снапшота.
function weekJsFrom(week, sanitize) {
  const snap = JSON.parse(JSON.stringify(snapshotOf(week)));
  sanitize(snap);
  return `window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };\n` +
    `window.CI_DATA.snapshots[${JSON.stringify(week)}] = ${JSON.stringify(snap)};\n`;
}

test('live-check: локальная раздача data/ проходит проверку целиком', async () => {
  const { fetchImpl, requests } = fakeServer();
  const result = await checkSite({ base: 'http://localhost:8080', fetchImpl });

  assert.equal(result.ok, true, formatReport(result));
  assert.equal(EXPECTED_WEEK_COUNT, 12);
  assert.equal(result.weeks.length, 12);
  assert.deepEqual(result.weeks.map((r) => r.week), [
    '2026-08-02', '2026-08-09', '2026-08-16', '2026-08-23', '2026-08-30', '2026-09-06',
    '2026-09-13', '2026-09-20', '2026-09-27', '2026-10-04', '2026-10-11', '2026-10-18',
  ]);
  for (const row of result.weeks) {
    assert.equal(row.contractOk, true, `${row.week}: ${row.errors.join('; ')}`);
    assert.ok(row.sources > 0, `${row.week}: источников нет`);
  }
  // latest.js + по одному week.js на неделю, без повторов
  assert.equal(requests.length, 1 + result.weeks.length);

  // Числа цитат — из опубликованных данных (T02): 8 и 6 источников.
  const expected = { '2026-09-20': 8, '2026-09-27': 6 };
  assert.deepEqual(QUOTE_WEEKS, ['2026-09-20', '2026-09-27']);
  for (const [week, count] of Object.entries(expected)) {
    const row = result.weeks.find((r) => r.week === week);
    assert.equal(row.quotedSources, count, `${week}: источников с цитатами`);
    assert.equal(row.trustQuoted, count, `${week}: счётчик витрины доверия`);
  }

  const report = formatReport(result);
  assert.match(report, /OK/);
  assert.match(report, new RegExp(`недель в latest\\.js: 12`));
  assert.match(report, /2026-09-20 .*цитат/);
});

test('live-check: данные без цитат у 09-20/09-27 — провал с кодом 1', async () => {
  const strip = (snap) => {
    for (const s of snap.sources ?? []) delete s.quotes;
  };
  const { fetchImpl } = fakeServer((rel) => {
    const m = rel.match(/^data\/(\d{4}-\d{2}-\d{2})\/week\.js$/);
    if (m && QUOTE_WEEKS.includes(m[1])) return weekJsFrom(m[1], strip);
    return undefined;
  });

  const result = await checkSite({ base: 'http://localhost:8080', fetchImpl });

  assert.equal(result.ok, false);
  assert.equal(result.exitCode, 1);
  for (const week of QUOTE_WEEKS) {
    const row = result.weeks.find((r) => r.week === week);
    assert.equal(row.contractOk, true, `${week}: контракт должен остаться валидным`);
    assert.equal(row.quotedSources, 0);
    assert.ok(
      row.errors.some((e) => /цитат/.test(e)),
      `${week}: нет ошибки про цитаты: ${row.errors.join('; ')}`,
    );
  }
  assert.match(formatReport(result), /FAIL/);
});

test('live-check: нарушенный контракт недели ловится и называется', async () => {
  const { fetchImpl } = fakeServer((rel) => {
    if (rel === 'data/2026-08-30/week.js') {
      return weekJsFrom('2026-08-30', (snap) => { snap.drivers = []; });
    }
    return undefined;
  });

  const result = await checkSite({ base: 'http://localhost:8080', fetchImpl });

  assert.equal(result.ok, false);
  const row = result.weeks.find((r) => r.week === '2026-08-30');
  assert.equal(row.contractOk, false);
  assert.ok(
    row.errors.some((e) => /drivers: exactly 3 required/.test(e)),
    `ошибки контракта: ${row.errors.join('; ')}`,
  );
  assert.match(formatReport(result), /2026-08-30 .*контракт/);
});

test('live-check: недоступный latest.js — провал с сообщением, а не падение', async () => {
  const fetchImpl = async () => ({ ok: false, status: 404, text: async () => 'not found' });
  const result = await checkSite({ base: 'http://localhost:8080', fetchImpl });

  assert.equal(result.ok, false);
  assert.deepEqual(result.weeks, []);
  assert.ok(result.errors.some((e) => /latest\.js/.test(e) && /404/.test(e)));
  assert.match(formatReport(result), /FAIL/);
});
