// ledger.js — публичный журнал прогнозов (interfaces.md §1, R16–R24, R28i).
//
// Две вещи:
//   1. baseline — наивный benchmark (A01): ожидание = кластер прошлой
//      опубликованной недели и направление «flat». Не прогноз, а правило;
//      committedAt — published предыдущей недели, verified всегда true.
//   2. editor — редакционные форвардные якоря calc/input/anchors/forward-<week>.json
//      (ADR 0049) через validateForwardAnchor. Запись без опубликованного факта —
//      pending (в total не входит, считается отдельно по cluster и direction).
//      Baseline строится только по неделям цепочки RECALC_WEEKS, начиная со второй;
//      демо-недели методологии 1.0 в журнал не входят. Иммутабельность (R21): коммит добавления
//      якоря не позже коммита добавления data/<week>/week.js — проверка по git;
//      недоступная история → verified: null, а не молчаливое «всё хорошо».
//
// Детерминизм: порядок ключей и записей фиксирован, timestamp внутри файла нет,
// LF; повторный writeLedger даёт те же байты. Диска/сети, кроме чтения якорей,
// каталога вывода и git-пробы (шов gitProbe).
//
// Форма записи и сводки — interfaces.md §1; правило сравнения — здесь:
// попадание кластера — равенство id шкалы, попадание направления — равенство
// down|flat|up при мёртвой зоне DIRECTION_DEADBAND.

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { status } from '../js/risk.js';
import { validateForwardAnchor } from './forward-anchors.js';
import { RECALC_WEEKS } from './calc.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PUBLIC_DIR = path.join('data', 'public');
const LEDGER_FILE = 'forecast-ledger.json';

export const LEDGER_SCHEMA = 'cassandra-index-forecast-ledger';
export const LEDGER_SCHEMA_VERSION = 1;
export const DIRECTION_DEADBAND = 2;

const SITE = 'https://cassindex.ru';
const DIRECTION_VALUES = ['down', 'flat', 'up'];
const ANCHOR_RE = /^forward-.+\.json$/;
// Baseline живёт только на пересчитываемой цепочке: демо-недели методологии 1.0
// (08-02…08-23) несопоставимы с 3.0, переход 08-23→08-30 — разрыв методик, не промах.
const CHAIN_WEEKS = new Set(RECALC_WEEKS);

// Данные журнала распространяются под CC BY 4.0 (LICENSE-DATA). Конверт —
// те же поля и значения, что у публичного слоя (calc/public-export.js, LICENSE
// там не экспортируется, поэтому форма повторена осознанно).
const LICENSE = {
  name: 'CC BY 4.0',
  url: 'https://creativecommons.org/licenses/by/4.0/legalcode',
  attribution: 'Cassandra Index — https://cassindex.ru, лицензия CC BY 4.0',
  note: 'Атрибуция обязательна: при переиспользовании укажите «Cassandra Index, версия, дата недели, https://cassindex.ru» и лицензию CC BY 4.0.',
  placeholder: false,
};

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

// clusterOf(index) — id состояния из SCALE (js/risk.js); вне 0..100 → null.
export function clusterOf(index) {
  return status(index);
}

// directionOf(delta) — направление с мёртвой зоной ±DIRECTION_DEADBAND.
export function directionOf(delta) {
  if (!isNum(delta)) return null;
  if (delta > DIRECTION_DEADBAND) return 'up';
  if (delta < -DIRECTION_DEADBAND) return 'down';
  return 'flat';
}

// publishedFact(snapshot) — факт недели или null: нужна публикация и число
// глобального индекса. pending — это отсутствие факта, а не «0».
function publishedFact(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') return null;
  if (snapshot.dataState !== 'published') return null;
  const g = snapshot.global;
  if (!g || typeof g !== 'object' || !isNum(g.index)) return null;
  return {
    index: g.index,
    delta: isNum(g.delta) ? g.delta : null,
    cluster: clusterOf(g.index),
    direction: isNum(g.delta) ? directionOf(g.delta) : null,
  };
}

function outcomeOf(expected, actual) {
  if (expected === null || expected === undefined || actual === null || actual === undefined) {
    return 'pending';
  }
  return expected === actual ? 'hit' : 'miss';
}

function tally() {
  return { hits: 0, total: 0 };
}

function addOutcome(bucket, outcome) {
  // pending не входит в total: сводка считается по разрешённым записям.
  if (outcome === 'pending') return;
  bucket.total += 1;
  if (outcome === 'hit') bucket.hits += 1;
}

function baselineEntry(week, snapshot, prevSnapshot, prevWeek) {
  const fact = publishedFact(snapshot);
  const prevFact = publishedFact(prevSnapshot);
  if (!fact || !prevFact) return null;
  const expectedCluster = prevFact.cluster;
  const expectedDirection = 'flat';
  const outcome = {
    cluster: outcomeOf(expectedCluster, fact.cluster),
    direction: outcomeOf(expectedDirection, fact.direction),
  };
  return {
    week,
    kind: 'baseline',
    committedAt: prevSnapshot.published ?? prevWeek,
    verified: true,
    expectedCluster,
    expectedDirection,
    actualIndex: fact.index,
    actualCluster: fact.cluster,
    actualDelta: fact.delta,
    actualDirection: fact.direction,
    outcome,
  };
}

// defaultGitProbe(rootDir) — { addedAt(relPath) → ISO|null }: первый коммит
// добавления файла по истории git. Ошибка/пустой вывод → null (история
// недоступна), а не выдуманная дата. Внутренний шов по умолчанию.
function defaultGitProbe(rootDir = ROOT) {
  return {
    addedAt(relPath) {
      try {
        const out = execFileSync(
          'git',
          ['log', '--diff-filter=A', '--format=%cI', '--reverse', '--', relPath],
          { cwd: rootDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
        );
        const line = String(out).split(/\r?\n/).find((s) => s.trim() !== '');
        return line ? line.trim() : null;
      } catch {
        return null;
      }
    },
  };
}

function readAnchors(anchorsDir) {
  let files;
  try {
    files = readdirSync(anchorsDir);
  } catch (e) {
    if (e && e.code === 'ENOENT') return [];
    throw e;
  }
  return files.filter((f) => ANCHOR_RE.test(f)).sort();
}

function readAnchor(anchorsDir, file) {
  const full = path.join(anchorsDir, file);
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(full, 'utf8'));
  } catch (e) {
    throw new Error(`ledger: ${file}: не читается как JSON (${e.message})`);
  }
  const errors = validateForwardAnchor(parsed);
  if (errors.length) {
    throw new Error(`ledger: ${file}: ${errors.join('; ')}`);
  }
  return parsed;
}

function gitVerified(gitProbe, anchorRel, weekRel) {
  if (!gitProbe || typeof gitProbe.addedAt !== 'function') return null;
  const anchorAt = gitProbe.addedAt(anchorRel);
  if (!anchorAt) return null;
  const weekAt = gitProbe.addedAt(weekRel);
  if (!weekAt) return null;
  const a = Date.parse(anchorAt);
  const w = Date.parse(weekAt);
  if (Number.isNaN(a) || Number.isNaN(w)) return null;
  return a <= w;
}

function editorEntry(anchor, file, snapshot, gitProbe) {
  const fact = publishedFact(snapshot);
  // Направления в схеме форвардного якоря нет; если редактор его указал и оно
  // валидно, сравниваем, иначе направление остаётся pending (не выдумываем).
  const expectedDirection = DIRECTION_VALUES.includes(anchor.expectedDirection)
    ? anchor.expectedDirection
    : null;
  const expectedCluster = anchor.expectedCluster;
  const outcome = fact
    ? {
      cluster: outcomeOf(expectedCluster, fact.cluster),
      direction: outcomeOf(expectedDirection, fact.direction),
    }
    : { cluster: 'pending', direction: 'pending' };
  const anchorRel = `calc/input/anchors/${file}`;
  const weekRel = `data/${anchor.week}/week.js`;
  return {
    week: anchor.week,
    kind: 'editor',
    committedAt: anchor.committedAt,
    verified: fact ? gitVerified(gitProbe, anchorRel, weekRel) : null,
    expectedCluster,
    expectedDirection,
    actualIndex: fact ? fact.index : null,
    actualCluster: fact ? fact.cluster : null,
    actualDelta: fact ? fact.delta : null,
    actualDirection: fact ? fact.direction : null,
    outcome,
  };
}

const KIND_ORDER = { baseline: 0, editor: 1 };

// buildLedger({rootDir, weeks, loadSnapshot, anchorsDir, gitProbe}) — чистая сборка
// журнала (диска нет, кроме чтения каталога якорей).
export function buildLedger({ rootDir, weeks, loadSnapshot, anchorsDir, gitProbe } = {}) {
  if (typeof loadSnapshot !== 'function') {
    throw new Error('ledger: нужен loadSnapshot(week)');
  }
  const root = rootDir || ROOT;
  const probe = gitProbe === undefined ? defaultGitProbe(root) : gitProbe;
  // Baseline — только по неделям цепочки RECALC_WEEKS: демо-недели 1.0 (08-02…08-23)
  // исключены, переход 08-23→08-30 не считается промахом.
  const list = Array.isArray(weeks)
    ? weeks.filter((w) => CHAIN_WEEKS.has(w)).sort()
    : [];
  const dir = anchorsDir || path.join(root, 'calc', 'input', 'anchors');

  const entries = [];
  let prevWeek = null;
  let prevSnapshot = null;
  for (const week of list) {
    const snapshot = loadSnapshot(week);
    if (!publishedFact(snapshot)) continue;
    if (prevSnapshot) {
      const entry = baselineEntry(week, snapshot, prevSnapshot, prevWeek);
      if (entry) entries.push(entry);
    }
    prevWeek = week;
    prevSnapshot = snapshot;
  }

  const editorEntries = [];
  for (const file of readAnchors(dir)) {
    const anchor = readAnchor(dir, file);
    editorEntries.push(editorEntry(anchor, file, loadSnapshot(anchor.week), probe));
  }
  editorEntries.sort((a, b) => (a.week < b.week ? -1 : a.week > b.week ? 1 : 0));
  for (const entry of editorEntries) entries.push(entry);

  entries.sort((a, b) => {
    if (a.week !== b.week) return a.week < b.week ? -1 : 1;
    return KIND_ORDER[a.kind] - KIND_ORDER[b.kind];
  });

  const summary = {
    baseline: {
      entries: 0, cluster: tally(), direction: tally(), pending: { cluster: 0, direction: 0 },
    },
    editor: {
      entries: 0, cluster: tally(), direction: tally(), pending: { cluster: 0, direction: 0 },
    },
  };
  const misses = [];
  for (const entry of entries) {
    const bucket = summary[entry.kind];
    bucket.entries += 1;
    for (const field of ['cluster', 'direction']) {
      const outcome = entry.outcome[field];
      // pending — по каждому полю отдельно (нет факта или нет ожидания); в total не входит.
      if (outcome === 'pending') bucket.pending[field] += 1;
      addOutcome(bucket[field], outcome);
      if (outcome === 'miss') {
        missed(misses, entry, field);
      }
    }
  }

  return {
    schema: LEDGER_SCHEMA,
    schema_version: LEDGER_SCHEMA_VERSION,
    site: SITE,
    license: { ...LICENSE },
    rule: {
      cluster: 'шкала js/risk.js (SCALE)',
      direction: { deadband: DIRECTION_DEADBAND, values: [...DIRECTION_VALUES] },
      baseline: 'ожидание = кластер прошлой опубликованной недели и направление flat',
    },
    entries,
    summary,
    misses,
  };
}

function missed(misses, entry, field) {
  const actual = field === 'cluster' ? entry.actualCluster : entry.actualDirection;
  const expected = field === 'cluster' ? entry.expectedCluster : entry.expectedDirection;
  misses.push({
    week: entry.week,
    kind: entry.kind,
    field,
    expected,
    actual,
  });
}

const jsonText = (v) => `${JSON.stringify(v, null, 2)}\n`;

// writeLedger({rootDir, weeks, loadSnapshot, anchorsDir, gitProbe}) — собирает
// журнал в память и пишет data/public/forecast-ledger.json. → {file, ledger}
export function writeLedger({
  rootDir, weeks, loadSnapshot, anchorsDir, gitProbe,
} = {}) {
  const root = rootDir || ROOT;
  const probe = gitProbe === undefined ? defaultGitProbe(root) : gitProbe;
  const ledger = buildLedger({ rootDir: root, weeks, loadSnapshot, anchorsDir, gitProbe: probe });
  const file = path.join(root, PUBLIC_DIR, LEDGER_FILE);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, jsonText(ledger), 'utf8');
  return { file, ledger };
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

function main() {
  // Список недель — из data/latest.js, снапшот — с диска (ленивый импорт,
  // чтобы модуль оставался чистым для тестов).
  const { write, root } = parseArgs(process.argv.slice(2));
  return import('./public-export.js').then(({ loadSnapshotFromDisk }) => {
    const latestSrc = readFileSync(path.join(root, 'data', 'latest.js'), 'utf8');
    const m = /CI_WEEKS\s*=\s*(\[[^\]]*\])/.exec(latestSrc);
    if (!m) throw new Error('data/latest.js: не найден CI_WEEKS');
    const weeks = JSON.parse(m[1]);
    const loadSnapshot = (w) => loadSnapshotFromDisk(w, root);
    const { file, ledger } = write
      ? writeLedger({ rootDir: root, weeks, loadSnapshot })
      : { file: path.join(root, PUBLIC_DIR, LEDGER_FILE), ledger: buildLedger({ weeks, loadSnapshot }) };
    const b = ledger.summary.baseline;
    const e = ledger.summary.editor;
    process.stdout.write(
      `${write ? 'записано' : 'не записано'}: ${path.relative(root, file).split(path.sep).join('/')}\n`
      + `baseline: ${b.entries} записей, кластер ${b.cluster.hits}/${b.cluster.total}, `
      + `направление ${b.direction.hits}/${b.direction.total}; промахов ${ledger.misses.length}\n`
      + `editor: ${e.entries} записей, pending ${e.pending.cluster}/${e.pending.direction} `
      + '(cluster/direction)\n',
    );
  });
}

const invokedDirectly = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((e) => {
    process.stderr.write(`ledger: ${e && e.message ? e.message : e}\n`);
    process.exitCode = 1;
  });
}
