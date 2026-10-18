// backtest.js — публичная валидация индекса: сравнение недельного ряда методологии
// 3.0 с тремя независимыми внешними рядами (GPR, ACLED, CrisisWatch) и сборка
// data/public/validation.json. Только диск: фикстуры лежат офлайн в
// calc/backtest-fixtures/, сеть не используется (R15, interfaces.md §2/§4).
//
// Метрики — собственные функции без зависимостей: Пирсон, Спирмен (средние ранги),
// перестановочный тест на LCG с фиксированным seed 20261018 (2000 итераций),
// согласие знаков первых разностей, кросс-корреляция при сдвигах −2…+2.
//
// Выравнивание. Недельный ряд — только недели PARAMS.methodology с
// dataState === 'published' и конечным индексом. GPR дневной → среднее за окно
// [W−6, W] включительно; окно с менее чем 4 наблюдениями неделю не берёт.
// Месячные ряды сравниваются со средним индекса по неделям месяца.
//
// Порог выборки: MIN_PAIRS = 6 — ниже коэффициенты не публикуются (null +
// status 'insufficient'); PRELIMINARY_BELOW = 20 — от 6 до 19 пар 'preliminary'.
//
// Детерминизм: никаких timestamp внутри JSON, ключи в фиксированном порядке,
// LF; повторный --write даёт побайтно те же файлы.
//
// CLI: `node calc/backtest.js` — печать сводки; `--write` — запись;
// `--root <dir>` — другой корень (тесты).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { PARAMS } from './params.js';
import { readLatestWeeks } from './prepare-week.js';
import { loadSnapshotFromDisk } from './public-export.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const FIXTURES_DIR = path.join(ROOT, 'calc', 'backtest-fixtures');

export const BACKTEST_SCHEMA = 'cassandra-index-validation';
export const BACKTEST_SCHEMA_VERSION = 1;
export const MIN_PAIRS = 6;
export const PRELIMINARY_BELOW = 20;
export const MAX_DISCREPANCIES = 12;
export const LAGS = [-2, -1, 0, 1, 2];
export const COMPARATOR_IDS = ['gpr', 'acled', 'crisiswatch'];

const SITE = 'https://cassindex.ru';
const PERMUTATION_SEED = 20261018;
const PERMUTATION_ITERATIONS = 2000;
const GPR_WINDOW_DAYS = 6;
const GPR_MIN_DAYS = 4;
const MAX_PEARSON_ABS = 1;

// Те же поля и значения, что у публичного слоя (calc/public-export.js):
// данные распространяются под CC BY 4.0, атрибуция обязательна.
const LICENSE = {
  name: 'CC BY 4.0',
  url: 'https://creativecommons.org/licenses/by/4.0/legalcode',
  attribution: 'Cassandra Index — https://cassindex.ru, лицензия CC BY 4.0',
  note: 'Атрибуция обязательна: при переиспользовании укажите «Cassandra Index, версия, дата недели, https://cassindex.ru» и лицензию CC BY 4.0.',
  placeholder: false,
};

const COMPARATOR_META = {
  gpr: { granularity: 'week', field: null },
  acled: { granularity: 'month', field: 'events' },
  crisiswatch: { granularity: 'month', field: 'deteriorated' },
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MONTH_RE = /^\d{4}-\d{2}$/;

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

function round(value, digits = 3) {
  if (!isNum(value)) return null;
  const factor = 10 ** digits;
  const out = Math.round(value * factor) / factor;
  return Object.is(out, -0) ? 0 : out;
}

function signOf(value) {
  if (value > 0) return 1;
  if (value < 0) return -1;
  return 0;
}

// --- Статистика ---

export function pearson(xs, ys) {
  if (!Array.isArray(xs) || !Array.isArray(ys) || xs.length !== ys.length) return null;
  const n = xs.length;
  if (n < 3) return null;
  for (let i = 0; i < n; i += 1) {
    if (!isNum(xs[i]) || !isNum(ys[i])) return null;
  }
  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < n; i += 1) {
    sumX += xs[i];
    sumY += ys[i];
  }
  const meanX = sumX / n;
  const meanY = sumY / n;
  let cov = 0;
  let varX = 0;
  let varY = 0;
  for (let i = 0; i < n; i += 1) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    cov += dx * dy;
    varX += dx * dx;
    varY += dy * dy;
  }
  // Нулевая дисперсия: коэффициент не определён, а не «ноль».
  if (varX <= 0 || varY <= 0) return null;
  const r = cov / Math.sqrt(varX * varY);
  if (!isNum(r)) return null;
  return Math.max(-MAX_PEARSON_ABS, Math.min(MAX_PEARSON_ABS, r));
}

function ranks(values) {
  const n = values.length;
  const order = Array.from({ length: n }, (_, i) => i)
    .sort((a, b) => (values[a] - values[b]) || (a - b));
  const out = new Array(n);
  let i = 0;
  while (i < n) {
    let j = i;
    while (j + 1 < n && values[order[j + 1]] === values[order[i]]) j += 1;
    const rank = (i + j) / 2 + 1;
    for (let k = i; k <= j; k += 1) out[order[k]] = rank;
    i = j + 1;
  }
  return out;
}

export function spearman(xs, ys) {
  if (!Array.isArray(xs) || !Array.isArray(ys) || xs.length !== ys.length) return null;
  if (xs.length < 3) return null;
  return pearson(ranks(xs), ranks(ys));
}

function lcg(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

// permutationP(xs, ys, opts) — двусторонний перестановочный тест на |r|.
// seed и iterations фиксированы по умолчанию (детерминизм публикации).
export function permutationP(xs, ys, opts = {}) {
  const iterations = Number.isInteger(opts.iterations) && opts.iterations > 0
    ? opts.iterations
    : PERMUTATION_ITERATIONS;
  const seed = Number.isInteger(opts.seed) ? opts.seed : PERMUTATION_SEED;
  const observed = pearson(xs, ys);
  if (observed === null) return { p: null, iterations, seed };
  const random = lcg(seed);
  const x = Array.from(xs);
  const y = Array.from(ys);
  const threshold = Math.abs(observed) - 1e-12;
  let hits = 0;
  for (let k = 0; k < iterations; k += 1) {
    for (let i = y.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      const tmp = y[i];
      y[i] = y[j];
      y[j] = tmp;
    }
    const r = pearson(x, y);
    if (r !== null && Math.abs(r) >= threshold) hits += 1;
  }
  return { p: (hits + 1) / (iterations + 1), iterations, seed };
}

// directionAgreement(a, b) — согласие знаков дельт. Нулевая дельта любой стороны
// не входит в знаменатель: она в skipped, а не считается промахом.
export function directionAgreement(a, b) {
  const n = Math.min(a.length, b.length);
  let hits = 0;
  let total = 0;
  let skipped = 0;
  for (let i = 0; i < n; i += 1) {
    const sa = signOf(a[i]);
    const sb = signOf(b[i]);
    if (sa === 0 || sb === 0) {
      skipped += 1;
      continue;
    }
    total += 1;
    if (sa === sb) hits += 1;
  }
  return { hits, total, skipped, rate: total > 0 ? round(hits / total) : null };
}

function statusOf(n) {
  if (n < MIN_PAIRS) return 'insufficient';
  if (n < PRELIMINARY_BELOW) return 'preliminary';
  return 'ok';
}

function firstDifferences(pairs) {
  const out = [];
  for (let i = 1; i < pairs.length; i += 1) {
    const prev = pairs[i - 1];
    const cur = pairs[i];
    out.push({
      period: cur.period,
      index_delta: round(cur.index - prev.index),
      external_delta: round(cur.external - prev.external, 2),
    });
  }
  return out;
}

// leadLag(pairs) — кросс-корреляция первых разностей. Сдвиг L > 0 означает, что
// индекс в периоде t сопоставляется с внешним рядом в t − L, то есть внешний ряд
// опережает индекс на L периодов. На каждом сдвиге своё n.
export function leadLag(pairs) {
  const list = Array.isArray(pairs) ? pairs : [];
  const diffs = firstDifferences(list);
  const xs = diffs.map((d) => d.index_delta);
  const ys = diffs.map((d) => d.external_delta);
  const byLag = [];
  let bestLag = null;
  let best = null;
  let maxN = 0;
  for (const lag of LAGS) {
    const left = [];
    const right = [];
    for (let i = 0; i < xs.length; i += 1) {
      const j = i - lag;
      if (j < 0 || j >= ys.length) continue;
      left.push(xs[i]);
      right.push(ys[j]);
    }
    const n = left.length;
    if (n > maxN) maxN = n;
    const r = n >= MIN_PAIRS ? pearson(left, right) : null;
    byLag.push({ lag, n, pearson: r === null ? null : round(r) });
    if (r !== null && n >= MIN_PAIRS) {
      if (best === null || Math.abs(r) > Math.abs(best)) {
        best = r;
        bestLag = lag;
      }
    }
  }
  return {
    by_lag: byLag,
    best_lag: best === null ? null : bestLag,
    best: best === null ? null : round(best),
    status: statusOf(maxN),
  };
}

// --- Выравнивание рядов ---

function addDays(date, days) {
  const t = Date.parse(`${date}T00:00:00Z`) + days * 24 * 60 * 60 * 1000;
  return new Date(t).toISOString().slice(0, 10);
}

// alignWeekly(cassandra, series) — GPR: среднее дневных значений за [W−6, W].
// Для каждой недели считается число наблюдений в окне; меньше 4 — неделя
// в пересечение не входит (неполное окно не выдаётся за недельное среднее).
export function alignWeekly(cassandra, series) {
  const weekly = Array.isArray(cassandra && cassandra.weekly) ? cassandra.weekly : [];
  const rows = Array.isArray(series) ? series : [];
  const byDate = new Map();
  for (const row of rows) {
    if (row && typeof row.date === 'string' && isNum(row.value)) byDate.set(row.date, row.value);
  }
  const out = [];
  for (const entry of weekly) {
    if (!entry || typeof entry.week !== 'string' || !isNum(entry.index)) continue;
    const start = addDays(entry.week, -GPR_WINDOW_DAYS);
    let sum = 0;
    let count = 0;
    for (const [date, value] of byDate) {
      if (date < start || date > entry.week) continue;
      sum += value;
      count += 1;
    }
    if (count < GPR_MIN_DAYS) continue;
    out.push({ period: entry.week, index: entry.index, external: round(sum / count, 2) });
  }
  return out;
}

// alignMonthly(cassandra, series, field?) — месяц против месячного среднего
// индекса по неделям. field выбирает колонку внешнего ряда; без него берётся
// value, затем events, затем deteriorated (форма фикстур §4).
export function alignMonthly(cassandra, series, field) {
  const monthly = Array.isArray(cassandra && cassandra.monthly) ? cassandra.monthly : [];
  const rows = Array.isArray(series) ? series : [];
  const byMonth = new Map();
  for (const row of rows) {
    if (!row || typeof row.month !== 'string') continue;
    let value = null;
    if (field) value = isNum(row[field]) ? row[field] : null;
    else if (isNum(row.value)) value = row.value;
    else if (isNum(row.events)) value = row.events;
    else if (isNum(row.deteriorated)) value = row.deteriorated;
    if (value === null) continue;
    byMonth.set(row.month, value);
  }
  const out = [];
  for (const entry of monthly) {
    if (!entry || typeof entry.month !== 'string' || !isNum(entry.index)) continue;
    if (!byMonth.has(entry.month)) continue;
    out.push({ period: entry.month, index: round(entry.index, 2), external: byMonth.get(entry.month) });
  }
  return out;
}

// --- Фикстуры и ряд индекса ---

const SOURCE_FIELDS = [
  'id', 'name', 'url', 'data_url', 'retrieved', 'as_of', 'license', 'construct', 'granularity',
];

function assertFixture(id, parsed) {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`фикстура ${id}: ожидался объект {source, series}`);
  }
  const source = parsed.source;
  if (!source || typeof source !== 'object') throw new Error(`фикстура ${id}: нет source`);
  for (const field of SOURCE_FIELDS) {
    if (typeof source[field] !== 'string' || source[field] === '') {
      throw new Error(`фикстура ${id}: source.${field} обязателен`);
    }
  }
  if (source.id !== id) throw new Error(`фикстура ${id}: source.id = ${source.id}`);
  if (!Array.isArray(parsed.series) || parsed.series.length === 0) {
    throw new Error(`фикстура ${id}: series пуст`);
  }
  parsed.series.forEach((row, index) => {
    if (id === 'gpr') {
      if (!row || !DATE_RE.test(row.date) || !isNum(row.value)) {
        throw new Error(`фикстура gpr: series[${index}] — нужен {date: YYYY-MM-DD, value: number}`);
      }
      return;
    }
    if (!row || !MONTH_RE.test(row.month)) {
      throw new Error(`фикстура ${id}: series[${index}].month — нужен YYYY-MM`);
    }
    if (id === 'acled' && !isNum(row.events)) {
      throw new Error(`фикстура acled: series[${index}].events — нужно число`);
    }
    if (id === 'crisiswatch' && !isNum(row.deteriorated)) {
      throw new Error(`фикстура crisiswatch: series[${index}].deteriorated — нужно число`);
    }
  });
  return parsed;
}

// loadFixtures(dir) — три фикстуры с провенансом; битая форма — ошибка, а не тихий
// пропуск: пустой ряд выдал бы «нет связи» вместо «нет данных».
export function loadFixtures(dir = FIXTURES_DIR) {
  const out = {};
  for (const id of COMPARATOR_IDS) {
    const file = path.join(dir, `${id}.json`);
    let parsed;
    try {
      parsed = JSON.parse(readFileSync(file, 'utf8'));
    } catch (e) {
      throw new Error(`фикстура ${id}: ${file} не читается (${e.message})`);
    }
    out[id] = assertFixture(id, parsed);
  }
  return out;
}

// cassandraSeries({weeks, loadSnapshot}) — только опубликованные недели текущей
// методологии: демо-история 1.0 и непубликации в сравнение не попадают.
export function cassandraSeries({ weeks, loadSnapshot }) {
  if (!Array.isArray(weeks) || weeks.length === 0) {
    throw new Error('backtest: список недель пуст');
  }
  if (typeof loadSnapshot !== 'function') {
    throw new Error('backtest: нужен loadSnapshot(week)');
  }
  const weekly = [];
  for (const week of Array.from(weeks).sort()) {
    const snapshot = loadSnapshot(week);
    if (!snapshot || typeof snapshot !== 'object') continue;
    if (snapshot.methodology !== PARAMS.methodology) continue;
    if (snapshot.dataState !== 'published') continue;
    const global = snapshot.global;
    if (!global || !isNum(global.index)) continue;
    weekly.push({
      week,
      published: typeof snapshot.published === 'string' ? snapshot.published : null,
      index: global.index,
      delta: isNum(global.delta) ? global.delta : null,
    });
  }
  const buckets = new Map();
  for (const entry of weekly) {
    const month = entry.week.slice(0, 7);
    const bucket = buckets.get(month) || { month, sum: 0, weeks: 0 };
    bucket.sum += entry.index;
    bucket.weeks += 1;
    buckets.set(month, bucket);
  }
  const monthly = Array.from(buckets.values())
    .sort((a, b) => (a.month < b.month ? -1 : a.month > b.month ? 1 : 0))
    .map((b) => ({ month: b.month, index: round(b.sum / b.weeks, 2), weeks: b.weeks }));
  return { weekly, monthly };
}

// --- Сборка публичного JSON ---

function coefficients(xs, ys) {
  const n = xs.length;
  const status = statusOf(n);
  if (status === 'insufficient') {
    return { n, pearson: null, spearman: null, p_permutation: null, status };
  }
  const r = pearson(xs, ys);
  const rho = spearman(xs, ys);
  const perm = permutationP(xs, ys);
  return {
    n,
    pearson: r === null ? null : round(r),
    spearman: rho === null ? null : round(rho),
    p_permutation: perm.p === null ? null : round(perm.p, 4),
    status,
  };
}

function overlapOf(pairs) {
  if (pairs.length === 0) return { periods: 0, from: null, to: null };
  return {
    periods: pairs.length,
    from: pairs[0].period,
    to: pairs[pairs.length - 1].period,
  };
}

function discrepanciesOf(diffs) {
  const out = diffs
    .filter((d) => d.index_delta !== 0 && d.external_delta !== 0
      && signOf(d.index_delta) !== signOf(d.external_delta))
    .sort((a, b) => (a.period < b.period ? 1 : a.period > b.period ? -1 : 0))
    .slice(0, MAX_DISCREPANCIES)
    .map((d) => ({
      period: d.period,
      index_delta: d.index_delta,
      external_delta: d.external_delta,
    }));
  return out;
}

function comparatorOf(id, fixture, series) {
  const meta = COMPARATOR_META[id];
  const source = fixture.source;
  const pairs = meta.granularity === 'week'
    ? alignWeekly(series, fixture.series)
    : alignMonthly(series, fixture.series, meta.field);
  const diffs = firstDifferences(pairs);
  const indexLevels = pairs.map((p) => p.index);
  const externalLevels = pairs.map((p) => p.external);
  const levels = coefficients(indexLevels, externalLevels);
  const deltas = coefficients(diffs.map((d) => d.index_delta), diffs.map((d) => d.external_delta));
  const agreement = directionAgreement(
    diffs.map((d) => d.index_delta),
    diffs.map((d) => d.external_delta),
  );
  const directionStatus = agreement.total + agreement.skipped < 2 ? 'insufficient' : 'descriptive';
  return {
    id,
    title: source.name,
    granularity: meta.granularity,
    construct: { ru: source.construct },
    provenance: {
      name: source.name,
      url: source.url,
      data_url: source.data_url,
      retrieved: source.retrieved,
      as_of: source.as_of,
      license: source.license,
    },
    overlap: overlapOf(pairs),
    levels,
    deltas,
    direction: { ...agreement, status: directionStatus },
    lead_lag: leadLag(pairs),
    discrepancies: discrepanciesOf(diffs),
    note: levels.status === 'insufficient'
      ? `Пересечение короче порога: ${levels.n} пар при минимуме ${MIN_PAIRS}; коэффициент не публикуется.`
      : null,
  };
}

export function buildValidation({ weeks, loadSnapshot, fixturesDir = FIXTURES_DIR }) {
  const fixtures = loadFixtures(fixturesDir);
  const series = cassandraSeries({ weeks, loadSnapshot });
  const comparators = COMPARATOR_IDS.map((id) => comparatorOf(id, fixtures[id], series));
  const withCoefficients = comparators.filter(
    (c) => c.levels.pearson !== null || c.deltas.pearson !== null,
  ).length;
  const insufficient = comparators.filter(
    (c) => c.levels.status === 'insufficient' && c.deltas.status === 'insufficient',
  ).length;
  return {
    schema: BACKTEST_SCHEMA,
    schema_version: BACKTEST_SCHEMA_VERSION,
    site: SITE,
    license: { ...LICENSE },
    methodology: PARAMS.methodology,
    weeks: series.weekly.map((w) => w.week),
    thresholds: {
      min_pairs: MIN_PAIRS,
      preliminary_below: PRELIMINARY_BELOW,
      lags: Array.from(LAGS),
    },
    comparators,
    summary: {
      comparators: comparators.length,
      with_coefficients: withCoefficients,
      insufficient,
    },
  };
}

const jsonText = (value) => `${JSON.stringify(value, null, 2)}\n`;

// writeValidation({rootDir, weeks, loadSnapshot, fixturesDir}) — сначала собирает
// JSON в памяти, потом пишет: битая фикстура не оставляет полузаписанного файла.
export function writeValidation({ rootDir, weeks, loadSnapshot, fixturesDir = FIXTURES_DIR }) {
  const root = rootDir || ROOT;
  const validation = buildValidation({ weeks, loadSnapshot, fixturesDir });
  const file = path.join(root, 'data', 'public', 'validation.json');
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, jsonText(validation), 'utf8');
  return { files: [file], validation };
}

// --- CLI ---

function parseArgs(argv) {
  const out = { write: false, root: ROOT };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--write') out.write = true;
    else if (arg === '--root') {
      i += 1;
      if (!argv[i]) throw new Error('--root требует путь');
      out.root = path.resolve(argv[i]);
    } else throw new Error(`неизвестный аргумент: ${arg}`);
  }
  return out;
}

const valueOrDash = (v) => (v === null || v === undefined ? '—' : String(v));

function comparatorLine(c) {
  return `${c.id}: пересечение ${c.overlap.periods} (${valueOrDash(c.overlap.from)}…${valueOrDash(c.overlap.to)}), `
    + `уровни n=${c.levels.n} ${c.levels.status} r=${valueOrDash(c.levels.pearson)}, `
    + `дельты n=${c.deltas.n} ${c.deltas.status} r=${valueOrDash(c.deltas.pearson)}, `
    + `направление ${c.direction.hits}/${c.direction.total} (пропущено ${c.direction.skipped}), `
    + `лаг ${c.lead_lag.status}${c.lead_lag.best_lag === null ? '' : ` best=${c.lead_lag.best_lag}`}`;
}

function main() {
  const { write, root } = parseArgs(process.argv.slice(2));
  const latestSrc = readFileSync(path.join(root, 'data', 'latest.js'), 'utf8');
  const { weeks } = readLatestWeeks(latestSrc);
  const loadSnapshot = (w) => loadSnapshotFromDisk(w, root);
  const fixturesDir = root === ROOT ? FIXTURES_DIR : path.join(root, 'calc', 'backtest-fixtures');
  const lines = [];
  if (write) {
    const { files, validation } = writeValidation({ rootDir: root, weeks, loadSnapshot, fixturesDir });
    lines.push(`записано файлов: ${files.length}`);
    for (const file of files) lines.push(`  ${path.relative(root, file).split(path.sep).join('/')}`);
    for (const c of validation.comparators) lines.push(comparatorLine(c));
    lines.push(`недель методологии ${validation.methodology}: ${validation.weeks.length}`);
  } else {
    const validation = buildValidation({ weeks, loadSnapshot, fixturesDir });
    for (const c of validation.comparators) lines.push(comparatorLine(c));
    lines.push(`недель методологии ${validation.methodology}: ${validation.weeks.length}`);
    lines.push('файл (не записан; для записи — --write): data/public/validation.json');
  }
  process.stdout.write(`${lines.join('\n')}\n`);
}

const invokedDirectly = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  try {
    main();
  } catch (e) {
    process.stderr.write(`backtest: ${e && e.message ? e.message : e}\n`);
    process.exitCode = 1;
  }
}
