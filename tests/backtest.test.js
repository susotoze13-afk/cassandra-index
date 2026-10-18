// tests/backtest.test.js — швы публичной валидации (calc/backtest.js).
// Синтетика inline + временный каталог фикстур; сеть не используется.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync,
} from 'node:fs';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

import { PARAMS } from '../calc/params.js';
import { loadSnapshotFromDisk } from '../calc/public-export.js';
import {
  BACKTEST_SCHEMA, BACKTEST_SCHEMA_VERSION, MIN_PAIRS, PRELIMINARY_BELOW,
  MAX_DISCREPANCIES, LAGS, COMPARATOR_IDS,
  pearson, spearman, permutationP, directionAgreement, leadLag,
  alignWeekly, alignMonthly, loadFixtures, cassandraSeries,
  buildValidation, writeValidation,
} from '../calc/backtest.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const FIXTURES = path.join(ROOT, 'calc', 'backtest-fixtures');

function tempDir(t) {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'ci-backtest-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

function sourceOf(id, granularity, name) {
  return {
    id,
    name,
    url: `https://example.org/${id}`,
    data_url: `https://example.org/${id}/data.json`,
    retrieved: '2026-10-18',
    as_of: '2026-10-18',
    license: 'CC BY 4.0',
    construct: 'тестовая конструкция',
    granularity,
  };
}

function writeFixtureSet(dir, { gpr, acled, crisiswatch }) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'gpr.json'), JSON.stringify({
    source: sourceOf('gpr', 'day', 'GPR'), series: gpr,
  }));
  writeFileSync(path.join(dir, 'acled.json'), JSON.stringify({
    source: sourceOf('acled', 'month', 'ACLED'), series: acled,
  }));
  writeFileSync(path.join(dir, 'crisiswatch.json'), JSON.stringify({
    source: sourceOf('crisiswatch', 'month', 'CrisisWatch'), series: crisiswatch,
  }));
  return dir;
}

function daysBetween(from, to) {
  const out = [];
  let t = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);
  while (t <= end) {
    out.push(new Date(t).toISOString().slice(0, 10));
    t += 24 * 60 * 60 * 1000;
  }
  return out;
}

// 7 недель цепочки 3.0 с индексами реальной формы.
const WEEKS = [
  '2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20',
  '2026-09-27', '2026-10-04', '2026-10-11',
];
const INDEXES = [51, 42, 43, 56, 47, 46, 56];

function snapshotOf(week, index, extra = {}) {
  return {
    published: week,
    through: week,
    methodology: PARAMS.methodology,
    dataState: 'published',
    global: { index, delta: 0 },
    ...extra,
  };
}

function snapshotsFor(weeks = WEEKS, indexes = INDEXES) {
  const map = new Map(weeks.map((w, i) => [w, snapshotOf(w, indexes[i])]));
  return (w) => map.get(w) || null;
}

function syntheticDaily() {
  return daysBetween('2026-08-24', '2026-10-11').map((date, i) => ({
    date,
    value: 100 + i,
  }));
}

test('pearson и spearman: известные ответы и нулевая дисперсия', () => {
  assert.equal(pearson([1, 2, 3], [2, 4, 6]), 1);
  assert.equal(pearson([1, 2, 3], [-2, -4, -6]), -1);
  assert.equal(pearson([1, 1, 1], [1, 2, 3]), null);
  assert.equal(pearson([1, 2], [1, 2]), null);
  assert.equal(spearman([1, 2, 3, 4], [4, 3, 2, 1]), -1);
  assert.equal(spearman([1, 2, 3, 4], [10, 20, 30, 40]), 1);
});

test('permutationP детерминирован фиксированным seed', () => {
  const xs = [1, 2, 3, 4, 5, 6, 7];
  const ys = [3, 1, 4, 2, 6, 5, 7];
  const a = permutationP(xs, ys, {});
  const b = permutationP(xs, ys, {});
  assert.equal(a.seed, 20261018);
  assert.equal(a.iterations, 2000);
  assert.equal(a.p, b.p);
  assert.ok(a.p > 0 && a.p <= 1);
});

test('directionAgreement: нулевые дельты уходят в skipped, не в total', () => {
  const r = directionAgreement([1, -2, 0, 3, -1], [2, 2, 0, -1, 1]);
  assert.deepEqual(
    { hits: r.hits, total: r.total, skipped: r.skipped, rate: r.rate },
    { hits: 1, total: 4, skipped: 1, rate: 0.25 },
  );
  const empty = directionAgreement([0, 0], [1, -1]);
  assert.equal(empty.total, 0);
  assert.equal(empty.skipped, 2);
  assert.equal(empty.rate, null);
});

test('leadLag: при нехватке пар — insufficient и best null', () => {
  const pairs = [10, 12, 11].map((value, i) => ({ period: `p${i}`, index: value, external: value * 2 }));
  const r = leadLag(pairs);
  assert.equal(r.status, 'insufficient');
  assert.equal(r.best, null);
  assert.equal(r.best_lag, null);
  assert.deepEqual(Array.from(r.by_lag, (e) => e.lag), LAGS);
  for (const entry of r.by_lag) assert.ok(entry.n < MIN_PAIRS);
});

test('leadLag: сдвиг +1 находится на синтетике с известным ответом', () => {
  const external = [10, 11, 14, 16, 21, 25, 32, 38, 47, 56];
  const index = [50, 50, 51, 54, 56, 61, 65, 72, 78, 87];
  const pairs = external.map((value, i) => ({ period: `p${i}`, index: index[i], external: value }));
  const r = leadLag(pairs);
  assert.equal(r.best_lag, 1);
  assert.equal(r.best, 1);
  assert.equal(r.status, 'preliminary');
});

test('alignWeekly: среднее за [W−6, W], окно меньше 4 дней отброшено', () => {
  const series = [
    ...daysBetween('2026-08-31', '2026-09-13').map((date) => ({ date, value: 2 })),
    ...daysBetween('2026-09-19', '2026-09-20').map((date) => ({ date, value: 9 })),
  ];
  const cassandra = {
    weekly: [
      { week: '2026-09-06', index: 42, delta: -9 },
      { week: '2026-09-13', index: 43, delta: 1 },
      { week: '2026-09-20', index: 56, delta: 13 },
    ],
  };
  const pairs = alignWeekly(cassandra, series);
  assert.deepEqual(Array.from(pairs, (p) => p.period), ['2026-09-06', '2026-09-13']);
  assert.equal(pairs[0].external, 2);
  assert.equal(pairs[0].index, 42);
  assert.equal(pairs[1].external, 2);
});

test('alignMonthly: среднее индекса по неделям месяца и выбор поля ряда', () => {
  const cassandra = {
    monthly: [
      { month: '2026-07', index: 50, weeks: 1 },
      { month: '2026-08', index: 51, weeks: 1 },
      { month: '2026-09', index: 46.5, weeks: 4 },
    ],
  };
  const acled = [{ month: '2026-08', events: 5208, fatalities: 3435 }, { month: '2026-09', events: 6000, fatalities: 4000 }];
  assert.deepEqual(
    Array.from(alignMonthly(cassandra, acled), (p) => [p.period, p.index, p.external]),
    [['2026-08', 51, 5208], ['2026-09', 46.5, 6000]],
  );
  const cw = [{ month: '2026-09', deteriorated: 5, improved: 0, resolution: 0 }];
  assert.deepEqual(
    Array.from(alignMonthly(cassandra, cw), (p) => [p.period, p.external]),
    [['2026-09', 5]],
  );
});

test('cassandraSeries: только 3.0, published и конечный индекс', () => {
  const loadSnapshot = (week) => {
    if (week === '2026-08-30') return snapshotOf(week, 51);
    if (week === '2026-09-06') return snapshotOf(week, 42, { methodology: '1.0' });
    if (week === '2026-09-13') return snapshotOf(week, 43, { dataState: 'insufficient' });
    if (week === '2026-09-20') return snapshotOf(week, 56);
    if (week === '2026-09-27') return snapshotOf(week, Number.NaN);
    return null;
  };
  const series = cassandraSeries({
    weeks: ['2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20', '2026-09-27', '2026-10-04'],
    loadSnapshot,
  });
  assert.deepEqual(Array.from(series.weekly, (w) => w.week), ['2026-08-30', '2026-09-20']);
  assert.deepEqual(
    Array.from(series.monthly, (m) => [m.month, m.index, m.weeks]),
    [['2026-08', 51, 1], ['2026-09', 56, 1]],
  );
});

test('loadFixtures: провенанс и форма рядов обязательны', (t) => {
  const dir = tempDir(t);
  writeFixtureSet(dir, {
    gpr: [{ date: '2026-10-01', value: 120 }],
    acled: [{ month: '2026-09', events: 10, fatalities: 2 }],
    crisiswatch: [{ month: '2026-09', deteriorated: 5, improved: 0, resolution: 0 }],
  });
  const fx = loadFixtures(dir);
  assert.equal(fx.gpr.source.id, 'gpr');
  assert.equal(fx.crisiswatch.series[0].deteriorated, 5);
  assert.equal('unchanged' in fx.crisiswatch.series[0], false);
  assert.ok(fx.acled.source.retrieved);
});

test('buildValidation: пересечения, статусы и порядок компараторов', (t) => {
  const dir = tempDir(t);
  writeFixtureSet(dir, {
    gpr: syntheticDaily(),
    acled: [
      { month: '2026-09', events: 5000, fatalities: 3000 },
      { month: '2026-10', events: 6000, fatalities: 3500 },
    ],
    crisiswatch: [{ month: '2026-09', deteriorated: 5, improved: 0, resolution: 0 }],
  });
  const v = buildValidation({ weeks: WEEKS, loadSnapshot: snapshotsFor(), fixturesDir: dir });
  assert.equal(v.schema, BACKTEST_SCHEMA);
  assert.equal(v.schema_version, BACKTEST_SCHEMA_VERSION);
  assert.equal(v.methodology, PARAMS.methodology);
  assert.deepEqual(v.weeks, WEEKS);
  assert.deepEqual(v.thresholds, { min_pairs: MIN_PAIRS, preliminary_below: PRELIMINARY_BELOW, lags: LAGS });
  assert.deepEqual(Array.from(v.comparators, (c) => c.id), COMPARATOR_IDS);

  const [gpr, acled, cw] = v.comparators;
  assert.equal(gpr.overlap.periods, 7);
  assert.equal(gpr.levels.n, 7);
  assert.equal(gpr.levels.status, 'preliminary');
  assert.equal(gpr.deltas.n, 6);
  assert.equal(gpr.direction.status, 'descriptive');

  assert.equal(acled.levels.n, 2);
  assert.equal(acled.levels.status, 'insufficient');
  assert.equal(acled.levels.pearson, null);
  assert.equal(acled.levels.spearman, null);
  assert.equal(acled.levels.p_permutation, null);
  assert.equal(cw.levels.n, 1);
  assert.equal(cw.levels.status, 'insufficient');
  assert.equal(cw.levels.pearson, null);

  assert.deepEqual(v.summary, { comparators: 3, with_coefficients: 1, insufficient: 2 });
  assert.equal(v.license.name, 'CC BY 4.0');
  assert.equal(v.license.attribution, 'Cassandra Index — https://cassindex.ru, лицензия CC BY 4.0');
  for (const c of v.comparators) {
    assert.ok(c.provenance.url && c.provenance.data_url && c.provenance.retrieved);
    assert.ok(c.provenance.as_of && c.provenance.license && c.provenance.name);
    assert.equal(c.construct.ru, 'тестовая конструкция');
  }
});

test('buildValidation: расхождения только разных ненулевых знаков, по убыванию', (t) => {
  const dir = tempDir(t);
  const series = daysBetween('2026-08-24', '2026-10-11').map((date) => {
    const low = (date >= '2026-09-07' && date <= '2026-09-13')
      || (date >= '2026-10-05' && date <= '2026-10-11');
    return { date, value: low ? 100 : 200 };
  });
  writeFixtureSet(dir, {
    gpr: series,
    acled: [{ month: '2026-09', events: 5000, fatalities: 3000 }],
    crisiswatch: [{ month: '2026-09', deteriorated: 5, improved: 0, resolution: 0 }],
  });
  const v = buildValidation({ weeks: WEEKS, loadSnapshot: snapshotsFor(), fixturesDir: dir });
  const d = v.comparators[0].discrepancies;
  assert.deepEqual(Array.from(d, (x) => [x.period, x.index_delta, x.external_delta]), [
    ['2026-10-11', 10, -100],
    ['2026-09-13', 1, -100],
  ]);
  assert.ok(d.length <= MAX_DISCREPANCIES);
});

test('writeValidation: повторная запись даёт побайтно тот же файл', (t) => {
  const dir = tempDir(t);
  const fixturesDir = writeFixtureSet(path.join(dir, 'fixtures'), {
    gpr: syntheticDaily(),
    acled: [{ month: '2026-09', events: 5000, fatalities: 3000 }],
    crisiswatch: [{ month: '2026-09', deteriorated: 5, improved: 0, resolution: 0 }],
  });
  const args = { rootDir: dir, weeks: WEEKS, loadSnapshot: snapshotsFor(), fixturesDir };
  const first = writeValidation(args);
  const before = readFileSync(path.join(dir, 'data', 'public', 'validation.json'), 'utf8');
  writeValidation(args);
  const after = readFileSync(path.join(dir, 'data', 'public', 'validation.json'), 'utf8');
  const validationFile = path.join(dir, 'data', 'public', 'validation.json');
  assert.ok(first.files.includes(validationFile));
  assert.ok(existsSync(validationFile));
  assert.equal(before, after);
  assert.ok(!/generated|generated_at|created_at/i.test(before));
  assert.ok(!before.includes('\r'));
});

test('реальные фикстуры: GPR 7 недель и 6 дельт, месячные — insufficient', () => {
  const latestSrc = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
  const weeks = JSON.parse(/CI_WEEKS = (\[[^\]]+\])/.exec(latestSrc)[1]);
  const v = buildValidation({
    weeks,
    loadSnapshot: (w) => loadSnapshotFromDisk(w, ROOT),
    fixturesDir: FIXTURES,
  });
  const [gpr, acled, cw] = v.comparators;
  assert.deepEqual(Array.from(v.comparators, (c) => c.id), COMPARATOR_IDS);
  assert.equal(gpr.overlap.periods, 7);
  assert.equal(gpr.overlap.from, '2026-08-30');
  assert.equal(gpr.overlap.to, '2026-10-11');
  assert.equal(gpr.levels.status, 'preliminary');
  assert.equal(gpr.deltas.n, 6);
  assert.equal(acled.overlap.periods, 3);
  assert.equal(acled.levels.status, 'insufficient');
  assert.equal(acled.levels.pearson, null);
  assert.equal(cw.overlap.periods, 2);
  assert.equal(cw.levels.status, 'insufficient');
  assert.equal(cw.levels.pearson, null);
});

test('CLI без --write печатает сводку и не трогает диск', () => {
  const file = path.join(ROOT, 'data', 'public', 'validation.json');
  const before = existsSync(file) ? readFileSync(file, 'utf8') : null;
  const r = spawnSync(process.execPath, ['calc/backtest.js'], { cwd: ROOT, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /gpr/);
  assert.match(r.stdout, /acled/);
  assert.match(r.stdout, /crisiswatch/);
  const after = existsSync(file) ? readFileSync(file, 'utf8') : null;
  assert.equal(after, before);
});
