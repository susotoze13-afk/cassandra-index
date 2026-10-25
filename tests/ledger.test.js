// tests/ledger.test.js — публичный журнал прогнозов (interfaces.md §1).
// Швы: clusterOf / directionOf / buildLedger / writeLedger. Диска и сети нет,
// кроме временного каталога и поддельного gitProbe.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

import {
  LEDGER_SCHEMA,
  LEDGER_SCHEMA_VERSION,
  DIRECTION_DEADBAND,
  clusterOf,
  directionOf,
  buildLedger,
  writeLedger,
} from '../calc/ledger.js';

const ROOT = path.resolve(import.meta.dirname, '..');

function tempDir(t) {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'ci-ledger-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

function anchorsDirWith(t, files) {
  const dir = path.join(tempDir(t), 'anchors');
  mkdirSync(dir, { recursive: true });
  for (const [name, body] of Object.entries(files)) {
    writeFileSync(path.join(dir, name), JSON.stringify(body, null, 2), 'utf8');
  }
  return dir;
}

// Синтетическая цепочка (даты RECALC_WEEKS): индексы 10 → 25 → 41, published = дата недели.
const CHAIN = {
  '2026-08-30': { published: '2026-08-30', dataState: 'published', global: { index: 10, delta: 0 } },
  '2026-09-06': { published: '2026-09-06', dataState: 'published', global: { index: 25, delta: 15 } },
  '2026-09-13': { published: '2026-09-13', dataState: 'published', global: { index: 39, delta: 14 } },
};
const CHAIN_WEEKS = Object.keys(CHAIN);

const loadChain = (week) => CHAIN[week] || null;

const ANCHOR_FACT = {
  week: '2026-09-13',
  expectedCluster: 'tense',
  expectedDirection: 'up',
  rationale: 'тест: ожидание редактора',
  author: 'editor',
  committedAt: '2026-09-12T09:00:00Z',
  sources: [{ url: 'https://example.org/a' }],
};
const ANCHOR_PENDING = {
  week: '2026-09-20',
  expectedCluster: 'danger',
  rationale: 'тест: неделя ещё не опубликована',
  author: 'editor',
  committedAt: '2026-09-13T09:00:00Z',
  sources: [],
};

const noGit = { addedAt: () => null };

test('clusterOf и directionOf держат границы шкалы и мёртвой зоны', () => {
  assert.equal(clusterOf(20), 'calm');
  assert.equal(clusterOf(21), 'tense');
  assert.equal(clusterOf(60), 'danger');
  assert.equal(clusterOf(61), 'very');
  assert.equal(clusterOf(101), null);
  assert.equal(clusterOf(null), null);

  assert.equal(DIRECTION_DEADBAND, 2);
  assert.equal(directionOf(2), 'flat');
  assert.equal(directionOf(3), 'up');
  assert.equal(directionOf(-2), 'flat');
  assert.equal(directionOf(-3), 'down');
  assert.equal(directionOf(null), null);
});

test('buildLedger: baseline со второй опубликованной недели, committedAt предыдущей', () => {
  const ledger = buildLedger({
    weeks: CHAIN_WEEKS,
    loadSnapshot: loadChain,
    anchorsDir: anchorsDirWith(test, {}),
    gitProbe: noGit,
  });
  assert.equal(ledger.entries.length, 2);
  const second = ledger.entries[0];
  assert.equal(second.week, '2026-09-06');
  assert.equal(second.kind, 'baseline');
  assert.equal(second.committedAt, '2026-08-30');
  assert.equal(second.verified, true);
  assert.equal(second.expectedCluster, 'calm');
  assert.equal(second.expectedDirection, 'flat');
  assert.equal(second.actualIndex, 25);
  assert.equal(second.actualCluster, 'tense');
  assert.equal(second.actualDelta, 15);
  assert.equal(second.actualDirection, 'up');
  assert.equal(second.outcome.cluster, 'miss');
  assert.equal(second.outcome.direction, 'miss');
});

test('buildLedger: baseline-промах по направлению попадает в misses и в сводку', () => {
  const ledger = buildLedger({
    weeks: CHAIN_WEEKS,
    loadSnapshot: loadChain,
    anchorsDir: anchorsDirWith(test, {}),
    gitProbe: noGit,
  });
  const dirMisses = ledger.misses.filter((m) => m.field === 'direction');
  assert.equal(dirMisses.length, 2);
  assert.deepEqual(dirMisses[0], {
    week: '2026-09-06', kind: 'baseline', field: 'direction', expected: 'flat', actual: 'up',
  });
  assert.ok(ledger.summary.baseline.direction.hits < ledger.summary.baseline.direction.total);
  assert.equal(ledger.summary.baseline.direction.hits, 0);
  assert.equal(ledger.summary.baseline.direction.total, 2);
  assert.equal(ledger.summary.baseline.cluster.hits, 1);
  assert.equal(ledger.summary.baseline.entries, 2);
});

test('buildLedger без недель не падает и даёт пустой baseline', () => {
  const ledger = buildLedger({
    weeks: [], loadSnapshot: () => null, anchorsDir: anchorsDirWith(test, {}), gitProbe: noGit,
  });
  assert.deepEqual(ledger.entries, []);
  assert.deepEqual(ledger.misses, []);
  assert.equal(ledger.summary.baseline.entries, 0);
});

test('buildLedger: редакционный якорь с фактом и pending без факта', () => {
  const dir = anchorsDirWith(test, {
    'forward-2026-09-13.json': ANCHOR_FACT,
    'forward-2026-09-20.json': ANCHOR_PENDING,
  });
  const ledger = buildLedger({
    weeks: CHAIN_WEEKS,
    loadSnapshot: loadChain,
    anchorsDir: dir,
    gitProbe: {
      addedAt: (rel) => (rel.endsWith('week.js') ? '2026-09-13T12:00:00Z' : '2026-09-12T12:00:00Z'),
    },
  });
  const editor = ledger.entries.filter((e) => e.kind === 'editor');
  assert.equal(editor.length, 2);
  const fact = editor.find((e) => e.week === '2026-09-13');
  assert.equal(fact.committedAt, '2026-09-12T09:00:00Z');
  assert.equal(fact.verified, true);
  assert.equal(fact.expectedCluster, 'tense');
  assert.equal(fact.actualCluster, 'tense');
  assert.equal(fact.outcome.cluster, 'hit');
  assert.equal(fact.outcome.direction, 'hit');

  const pending = editor.find((e) => e.week === '2026-09-20');
  assert.equal(pending.outcome.cluster, 'pending');
  assert.equal(pending.outcome.direction, 'pending');
  assert.equal(pending.actualIndex, null);

  assert.equal(ledger.summary.editor.entries, 2);
  assert.equal(ledger.summary.editor.cluster.total, 1);
  assert.equal(ledger.summary.editor.direction.total, 1);
  assert.deepEqual(ledger.summary.editor.pending, { cluster: 1, direction: 1 });
  assert.deepEqual(ledger.summary.baseline.pending, { cluster: 0, direction: 0 });
});

test('buildLedger: pending считается по каждому полю отдельно', () => {
  // Факт есть, но направления в якоре нет → cluster разрешён, direction pending.
  const noDirection = { ...ANCHOR_FACT };
  delete noDirection.expectedDirection;
  const dir = anchorsDirWith(test, { 'forward-2026-09-13.json': noDirection });
  const ledger = buildLedger({
    weeks: CHAIN_WEEKS, loadSnapshot: loadChain, anchorsDir: dir, gitProbe: noGit,
  });
  assert.deepEqual(ledger.summary.editor.pending, { cluster: 0, direction: 1 });
  assert.equal(ledger.summary.editor.cluster.total, 1);
  assert.equal(ledger.summary.editor.direction.total, 0);
});

test('buildLedger: демо-недели 1.0 вне цепочки в baseline не участвуют', () => {
  const demos = {
    '2026-08-02': { published: '2026-08-02', dataState: 'published', global: { index: 51, delta: 3 } },
    '2026-08-23': { published: '2026-08-23', dataState: 'published', global: { index: 60, delta: 9 } },
  };
  const load = (w) => CHAIN[w] || demos[w] || null;
  const ledger = buildLedger({
    weeks: [...Object.keys(demos), ...CHAIN_WEEKS],
    loadSnapshot: load,
    anchorsDir: anchorsDirWith(test, {}),
    gitProbe: noGit,
  });
  const baseline = ledger.entries.filter((e) => e.kind === 'baseline');
  assert.deepEqual(baseline.map((e) => e.week), ['2026-09-06', '2026-09-13']);
  assert.equal(baseline[0].committedAt, '2026-08-30');
  assert.ok(!ledger.misses.some((m) => m.week === '2026-08-30'));
  assert.equal(ledger.summary.baseline.entries, 2);
});

test('buildLedger: verified false при позднем якоре и null без git-истории', () => {
  const dir = anchorsDirWith(test, { 'forward-2026-09-13.json': ANCHOR_FACT });
  const late = buildLedger({
    weeks: CHAIN_WEEKS,
    loadSnapshot: loadChain,
    anchorsDir: dir,
    gitProbe: {
      addedAt: (rel) => (rel.endsWith('week.js') ? '2026-09-13T12:00:00Z' : '2026-09-14T12:00:00Z'),
    },
  });
  assert.equal(late.entries.find((e) => e.kind === 'editor').verified, false);

  const unknown = buildLedger({
    weeks: CHAIN_WEEKS, loadSnapshot: loadChain, anchorsDir: dir, gitProbe: noGit,
  });
  assert.equal(unknown.entries.find((e) => e.kind === 'editor').verified, null);
});

test('buildLedger отклоняет невалидный forward-якорь с именем файла', () => {
  const dir = anchorsDirWith(test, {
    'forward-2026-09-13.json': { ...ANCHOR_FACT, expectedCluster: 'apocalyptic' },
  });
  assert.throws(
    () => buildLedger({
      weeks: CHAIN_WEEKS, loadSnapshot: loadChain, anchorsDir: dir, gitProbe: noGit,
    }),
    /forward-2026-09-13\.json/,
  );
});

test('writeLedger: конверт лицензии, порядок ключей и побайтный детерминизм', (t) => {
  const root = tempDir(t);
  const anchorsDir = anchorsDirWith(t, { 'forward-2026-09-13.json': ANCHOR_FACT });
  const args = {
    rootDir: root, weeks: CHAIN_WEEKS, loadSnapshot: loadChain, anchorsDir, gitProbe: noGit,
  };
  const first = writeLedger(args);
  const file = path.join(root, 'data', 'public', 'forecast-ledger.json');
  assert.equal(first.file, file);
  const bytes1 = readFileSync(file, 'utf8');
  writeLedger(args);
  const bytes2 = readFileSync(file, 'utf8');
  assert.equal(bytes1, bytes2);
  assert.ok(!bytes1.includes('\r\n'));

  const parsed = JSON.parse(bytes1);
  assert.equal(parsed.schema, LEDGER_SCHEMA);
  assert.equal(parsed.schema_version, LEDGER_SCHEMA_VERSION);
  assert.equal(parsed.license.name, 'CC BY 4.0');
  assert.equal(parsed.license.placeholder, false);
  assert.deepEqual(parsed.rule.direction.values, ['down', 'flat', 'up']);

  const keys = [...bytes1.matchAll(/^ {2}"([a-z_]+)":/gm)].map((m) => m[1]);
  assert.deepEqual(keys, [
    'schema', 'schema_version', 'site', 'license', 'rule', 'entries', 'summary', 'misses',
  ]);
});

test('writeLedger: без anchorsDir читает якоря из <rootDir>/calc/input/anchors, а не боевой каталог', (t) => {
  const root = tempDir(t);
  const anchorsDir = path.join(root, 'calc', 'input', 'anchors');
  mkdirSync(anchorsDir, { recursive: true });
  writeFileSync(
    path.join(anchorsDir, 'forward-2026-09-13.json'),
    JSON.stringify(ANCHOR_FACT, null, 2),
    'utf8',
  );
  const { ledger } = writeLedger({
    rootDir: root, weeks: CHAIN_WEEKS, loadSnapshot: loadChain, gitProbe: noGit,
  });
  const editor = ledger.entries.filter((e) => e.kind === 'editor');
  assert.equal(editor.length, 1, 'якорь tmp-root прочитан, боевой каталог не подмешан');
  assert.equal(editor[0].week, '2026-09-13');
  assert.equal(editor[0].expectedCluster, 'tense');
});

test('data/public/forecast-ledger.json опубликован и несёт схему и промахи', () => {
  const file = path.join(ROOT, 'data', 'public', 'forecast-ledger.json');
  assert.ok(existsSync(file), 'forecast-ledger.json отсутствует');
  const ledger = JSON.parse(readFileSync(file, 'utf8'));
  assert.equal(ledger.schema, LEDGER_SCHEMA);
  assert.equal(ledger.schema_version, LEDGER_SCHEMA_VERSION);
  assert.equal(ledger.license.name, 'CC BY 4.0');
  assert.ok(ledger.entries.length >= 1);
  assert.ok(ledger.misses.length >= 1, 'журнал без промахов бессмысленен (R24.1)');
  // Baseline — только цепочка RECALC_WEEKS: 8 записей 09-06…10-25, разрыв методик
  // 08-23→08-30 в журнал не попадает.
  const baseline = ledger.entries.filter((e) => e.kind === 'baseline');
  assert.equal(baseline.length, 8);
  assert.equal(baseline[0].week, '2026-09-06');
  assert.equal(baseline[baseline.length - 1].week, '2026-10-25');
  assert.ok(!ledger.entries.some((e) => e.week < '2026-09-06'));
  assert.ok(!ledger.misses.some((m) => m.week === '2026-08-30'));
  assert.ok(!ledger.entries.some((e) => e.week === '2026-08-30'));
  for (const kind of ['baseline', 'editor']) {
    assert.deepEqual(Object.keys(ledger.summary[kind].pending).sort(), ['cluster', 'direction']);
  }
  assert.equal(ledger.summary.baseline.entries, baseline.length);
  for (let i = 1; i < ledger.entries.length; i += 1) {
    assert.ok(ledger.entries[i - 1].week <= ledger.entries[i].week);
  }
  for (const m of ledger.misses) {
    assert.ok(['cluster', 'direction'].includes(m.field));
    assert.notEqual(m.expected, m.actual);
  }
});

test('CLI без --write: печатная ветка получает rootDir и не падает', () => {
  // Регрессия: ветка печати вызывала buildLedger без rootDir (anchorsDir → от undefined).
  const stdout = execFileSync(process.execPath, [path.join(ROOT, 'calc', 'ledger.js')], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  assert.match(stdout, /не записано: data\/public\/forecast-ledger\.json/);
  assert.match(stdout, /baseline: \d+ записей/);
});
