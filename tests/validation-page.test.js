// tests/validation-page.test.js — страница публичной валидации
// (calc/validation-page.js) и её запись из calc/backtest.js --write.
// Синтетические validation/ledger inline; запись — во временный корень,
// фикстуры бэктеста — синтетические. Сеть не используется.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';

import { PARAMS } from '../calc/params.js';
import {
  VALIDATION_PAGE_FILE, renderValidationPage,
} from '../calc/validation-page.js';
import { writeValidation } from '../calc/backtest.js';

const require = createRequire(import.meta.url);
const { STATIC_CSP } = require('../blog-build.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const REQUIRED_IDS = [
  'summary', 'comparators', 'gpr', 'acled', 'crisiswatch',
  'limits', 'limits-constructs', 'limits-windows', 'limits-revisions',
  'ledger', 'method', 'sources',
];

function tempDir(t) {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'ci-validation-page-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

const LICENSE = {
  name: 'CC BY 4.0',
  url: 'https://creativecommons.org/licenses/by/4.0/legalcode',
  attribution: 'Cassandra Index — https://cassindex.ru, лицензия CC BY 4.0',
  note: 'Атрибуция обязательна.',
  placeholder: false,
};

function provenance(name, url) {
  return {
    name,
    url,
    data_url: `${url}/data.json`,
    retrieved: '2026-10-18',
    as_of: '2026-10-13',
    license: 'Условия использования источника',
  };
}

function sampleValidation() {
  return {
    schema: 'cassandra-index-validation',
    schema_version: 1,
    site: 'https://cassindex.ru',
    license: { ...LICENSE },
    methodology: '3.0',
    weeks: ['2026-08-30', '2026-09-06', '2026-09-13'],
    thresholds: { min_pairs: 6, preliminary_below: 20, lags: [-2, -1, 0, 1, 2] },
    comparators: [
      {
        id: 'gpr',
        title: 'Geopolitical Risk Index (GPR)',
        granularity: 'week',
        construct: { ru: 'Доля газетных публикаций о геополитических рисках.' },
        provenance: provenance('Geopolitical Risk Index (GPR)', 'https://example.org/gpr'),
        overlap: { periods: 7, from: '2026-08-30', to: '2026-10-11' },
        levels: {
          n: 7, pearson: 0.5123, spearman: 0.42, p_permutation: 0.31, status: 'preliminary',
        },
        deltas: {
          n: 6, pearson: -0.599, spearman: -0.638, p_permutation: 0.2314, status: 'preliminary',
        },
        direction: {
          hits: 4, total: 6, skipped: 1, rate: 0.6667, status: 'descriptive',
        },
        lead_lag: {
          by_lag: [
            { lag: -2, n: 4, pearson: null },
            { lag: 0, n: 6, pearson: -0.599 },
          ],
          best_lag: 0,
          best: -0.599,
          status: 'preliminary',
        },
        discrepancies: [
          { period: '2026-09-27', index_delta: -9, external_delta: 3.2 },
          { period: '2026-10-04', index_delta: 1, external_delta: -7.5 },
        ],
        note: null,
      },
      {
        id: 'acled',
        title: 'ACLED — события политического насилия',
        granularity: 'month',
        construct: { ru: 'Число зафиксированных событий политического насилия за месяц.' },
        provenance: provenance('ACLED', 'https://example.org/acled'),
        overlap: { periods: 3, from: '2026-08', to: '2026-10' },
        levels: {
          n: 3, pearson: null, spearman: null, p_permutation: null, status: 'insufficient',
        },
        deltas: {
          n: 2, pearson: null, spearman: null, p_permutation: null, status: 'insufficient',
        },
        direction: {
          hits: 1, total: 2, skipped: 0, rate: 0.5, status: 'descriptive',
        },
        lead_lag: {
          by_lag: [{ lag: 0, n: 2, pearson: null }],
          best_lag: null,
          best: null,
          status: 'insufficient',
        },
        discrepancies: [{ period: '2026-10', index_delta: 8.33, external_delta: -3837 }],
        note: 'Пересечение короче порога: 3 пар при минимуме 6.',
      },
      {
        id: 'crisiswatch',
        title: 'CrisisWatch (International Crisis Group)',
        granularity: 'month',
        construct: { ru: 'Число стран, где ситуация ухудшилась по оценке ICG за месяц.' },
        provenance: provenance('CrisisWatch', 'https://example.org/crisiswatch'),
        overlap: { periods: 2, from: '2026-08', to: '2026-09' },
        levels: {
          n: 2, pearson: null, spearman: null, p_permutation: null, status: 'insufficient',
        },
        deltas: {
          n: 1, pearson: null, spearman: null, p_permutation: null, status: 'insufficient',
        },
        direction: {
          hits: 0, total: 1, skipped: 0, rate: 0, status: 'insufficient',
        },
        lead_lag: {
          by_lag: [{ lag: 0, n: 1, pearson: null }],
          best_lag: null,
          best: null,
          status: 'insufficient',
        },
        discrepancies: [],
        note: 'Пересечение короче порога: 2 пар при минимуме 6.',
      },
    ],
    summary: { comparators: 3, with_coefficients: 1, insufficient: 2 },
  };
}

function sampleLedger() {
  return {
    schema: 'cassandra-index-forecast-ledger',
    schema_version: 1,
    site: 'https://cassindex.ru',
    license: { ...LICENSE },
    rule: {
      cluster: 'шкала js/risk.js (SCALE)',
      direction: { deadband: 2, values: ['down', 'flat', 'up'] },
      baseline: 'ожидание = кластер прошлой опубликованной недели и направление flat',
    },
    entries: [
      {
        week: '2026-09-06',
        kind: 'baseline',
        committedAt: '2026-08-30',
        verified: true,
        expectedCluster: 'danger',
        expectedDirection: 'flat',
        actualIndex: 42,
        actualCluster: 'danger',
        actualDelta: -9,
        actualDirection: 'down',
        outcome: { cluster: 'hit', direction: 'miss' },
      },
    ],
    summary: {
      baseline: {
        entries: 1,
        cluster: { hits: 1, total: 1 },
        direction: { hits: 0, total: 1 },
        pending: { cluster: 0, direction: 0 },
      },
      editor: {
        entries: 0,
        cluster: { hits: 0, total: 0 },
        direction: { hits: 0, total: 0 },
        pending: { cluster: 0, direction: 0 },
      },
    },
    misses: [
      {
        week: '2026-09-06', kind: 'baseline', field: 'direction', expected: 'flat', actual: 'down',
      },
    ],
  };
}

function renderSample(overrides = {}) {
  return renderValidationPage(overrides.validation || sampleValidation(),
    overrides.ledger || sampleLedger());
}

test('полный документ: doctype, один h1, canonical, og и CSP из blog-build', () => {
  const html = renderSample();
  assert.match(html, /^<!doctype html>/);
  assert.match(html, /<html lang="ru">/);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes('href="https://cassindex.ru/validation.html"'));
  assert.ok(html.includes('content="https://cassindex.ru/validation.html"'));
  assert.ok(html.includes('<body class="doc-page">'));
  assert.ok(html.includes('href="icon.svg"'));
  assert.ok(html.includes('href="css/styles.css"'));
  const csp = /<meta http-equiv="Content-Security-Policy" content="([^"]+)">/.exec(html);
  assert.ok(csp, 'CSP не найден');
  assert.equal(csp[1], STATIC_CSP);
  assert.ok(!html.includes('unsafe-inline'));
});

test('документ без скриптов, внешних ресурсов, img, style= и JSON-LD', () => {
  const html = renderSample();
  assert.ok(!/<script/i.test(html));
  assert.ok(!/<img/i.test(html));
  assert.ok(!/<iframe/i.test(html));
  assert.ok(!/style=/i.test(html));
  assert.ok(!/ld\+json/i.test(html));
  assert.ok(!/\ssrc=/i.test(html));
  assert.ok(!/<link[^>]+rel="(?:stylesheet|icon|preload|prefetch)"[^>]+href="https?:/i.test(html));
});

test('все обязательные якоря и три подраздела лимитов', () => {
  const html = renderSample();
  for (const id of REQUIRED_IDS) {
    assert.ok(html.includes(`id="${id}"`), `нет якоря #${id}`);
  }
  const limits = html.slice(html.indexOf('id="limits"'), html.indexOf('id="ledger"'));
  assert.ok(limits.includes('id="limits-constructs"'));
  assert.ok(limits.includes('id="limits-windows"'));
  assert.ok(limits.includes('id="limits-revisions"'));
});

test('ACLED: объяснение, почему сравнение не по Conflict Index', () => {
  const html = renderSample();
  const acled = html.slice(html.indexOf('id="acled"'), html.indexOf('id="crisiswatch"'));
  assert.match(acled, /Conflict Index/);
  assert.match(acled, /событи/i);
  assert.match(acled, /полугодов|раз в полгода/i);
});

test('insufficient: в ячейке коэффициента «—» и причина, а не ноль', () => {
  const html = renderSample();
  const acled = html.slice(html.indexOf('id="acled"'), html.indexOf('id="crisiswatch"'));
  assert.ok(acled.includes('—'), 'нет прочерка');
  assert.match(acled, /порог/i);
  assert.ok(!acled.includes('<td>0.00</td>'));
  assert.ok(acled.includes('n = 3') || acled.includes('<td>3</td>'));
});

test('коэффициенты — 2 знака, доля направления — целые проценты', () => {
  const html = renderSample();
  assert.ok(html.includes('0.51'), 'pearson не округлён до 2 знаков');
  assert.ok(html.includes('-0.60'), 'отрицательный коэффициент не округлён');
  assert.ok(html.includes('67 %'), 'доля совпадений не в целых процентах');
});

test('журнал: baseline и редакционные записи разными блоками, промахи отдельно', () => {
  const html = renderSample();
  const ledger = html.slice(html.indexOf('id="ledger"'), html.indexOf('id="method"'));
  assert.ok(ledger.includes('ledger-baseline'), 'нет блока baseline');
  assert.ok(ledger.includes('ledger-editor'), 'нет блока редакционных записей');
  assert.match(ledger, /Наивный benchmark/);
  assert.match(ledger, /не прогноз проекта/);
  assert.match(ledger, /Редакционные прогнозы/);
  assert.match(ledger, /Записей нет/);
  assert.ok(ledger.includes('ledger-misses'), 'нет блока промахов');
  assert.match(ledger, /Промахи/);
  assert.ok(ledger.includes('2026-09-06'));
  assert.ok(!/<details/i.test(ledger), 'промахи спрятаны в раскрывающийся блок');
});

test('значения из данных экранируются', () => {
  const validation = sampleValidation();
  validation.comparators[0].title = 'GPR <script>alert(1)</script>';
  validation.comparators[0].construct.ru = '<b>конструкт</b>';
  const html = renderSample({ validation });
  assert.ok(!/<script/i.test(html));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('&lt;b&gt;'));
});

test('writeValidation пишет ledger и страницу; повторный прогон — те же байты', (t) => {
  const dir = tempDir(t);
  const fixturesDir = path.join(dir, 'calc', 'backtest-fixtures');
  mkdirSync(fixturesDir, { recursive: true });
  const src = (id, granularity) => ({
    id,
    name: id,
    url: `https://example.org/${id}`,
    data_url: `https://example.org/${id}/data.json`,
    retrieved: '2026-10-18',
    as_of: '2026-10-18',
    license: 'CC BY 4.0',
    construct: 'тестовая конструкция',
    granularity,
  });
  const days = [];
  for (let i = 0; i < 49; i += 1) {
    const date = new Date(Date.UTC(2026, 7, 24 + i)).toISOString().slice(0, 10);
    days.push({ date, value: 100 + i });
  }
  writeFileSync(path.join(fixturesDir, 'gpr.json'),
    JSON.stringify({ source: src('gpr', 'day'), series: days }));
  writeFileSync(path.join(fixturesDir, 'acled.json'), JSON.stringify({
    source: src('acled', 'month'),
    series: [{ month: '2026-09', events: 5000, fatalities: 3000 }],
  }));
  writeFileSync(path.join(fixturesDir, 'crisiswatch.json'), JSON.stringify({
    source: src('crisiswatch', 'month'),
    series: [{ month: '2026-09', deteriorated: 5, improved: 0, resolution: 0 }],
  }));

  const weeks = ['2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20', '2026-09-27'];
  const indexes = [51, 42, 43, 56, 47];
  const snapshots = new Map(weeks.map((w, i) => [w, {
    published: w,
    through: w,
    methodology: PARAMS.methodology,
    dataState: 'published',
    global: { index: indexes[i], delta: 0 },
  }]));
  const loadSnapshot = (w) => snapshots.get(w) || null;

  const rootDir = path.join(dir, 'root');
  const args = { rootDir, weeks, loadSnapshot, fixturesDir };
  const first = writeValidation(args);
  const pageFile = path.join(rootDir, VALIDATION_PAGE_FILE);
  const validationFile = path.join(rootDir, 'data', 'public', 'validation.json');
  const ledgerFile = path.join(rootDir, 'data', 'public', 'forecast-ledger.json');
  for (const file of [pageFile, validationFile, ledgerFile]) {
    assert.ok(first.files.includes(file), `нет пути в files: ${file}`);
    assert.ok(existsSync(file), `файл не записан: ${file}`);
  }
  assert.equal(first.ledger.schema, 'cassandra-index-forecast-ledger');
  assert.equal(first.validation.schema, 'cassandra-index-validation');

  const before = [pageFile, validationFile, ledgerFile].map((f) => readFileSync(f, 'utf8'));
  writeValidation(args);
  const after = [pageFile, validationFile, ledgerFile].map((f) => readFileSync(f, 'utf8'));
  assert.deepEqual(after, before);
  assert.ok(before[0].includes('id="ledger"'));
  assert.ok(before[0].includes('id="limits-revisions"'));
  assert.ok(!before[0].includes('\r'));
});

test('пустая сводка компараторов рендерится без падения', () => {
  const validation = sampleValidation();
  validation.comparators = [];
  validation.weeks = [];
  validation.summary = { comparators: 0, with_coefficients: 0, insufficient: 0 };
  const ledger = sampleLedger();
  ledger.entries = [];
  ledger.misses = [];
  ledger.summary.baseline.entries = 0;
  ledger.summary.baseline.cluster = { hits: 0, total: 0 };
  ledger.summary.baseline.direction = { hits: 0, total: 0 };
  const html = renderValidationPage(validation, ledger);
  for (const id of REQUIRED_IDS) assert.ok(html.includes(`id="${id}"`));
  assert.match(html, /Записей нет/);
  assert.match(html, /Промахов нет/);
});
