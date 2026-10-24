// digest-export.js — CLI сборки недельных выпусков: текст (calc/digest.js),
// JSON выпуска data/public/digest/<week>.json, машинный список
// data/public/digest/index.json и статическая страница архива digest.html
// (calc/digest-page.js). Выпуск — производная снапшота недели: второго расчёта
// здесь нет, числа приходят из data/<week>/week.js через loadSnapshotFromDisk.
//
// Запись атомарна по смыслу: всё собирается в памяти и только потом пишется,
// поэтому упавшая неделя не оставляет полузаписанного архива. Выпуски недель
// вне списка прогона не трогаются — они лишь дополняют архив; одноимённый
// выпуск запрошенной недели пересобирается из текущего снапшота и
// перезаписывает прежний (сознательная производность weekly-calc).
//
// CLI: `node calc/digest-export.js` — печать сводки (диск не трогается);
// `--write` — запись; `--week <YYYY-MM-DD>` — одна неделя вместо всех;
// `--root <dir>` — другой корень репозитория.

import {
  readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync,
} from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { loadSnapshotFromDisk } from './public-export.js';
import { buildDigest, DIGEST_SCHEMA, DIGEST_SCHEMA_VERSION } from './digest.js';
import { renderDigestPage } from './digest-page.js';
import { readLatestWeeks } from './prepare-week.js';
import { PARAMS } from './params.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export const DIGEST_INDEX_SCHEMA = 'cassandra-index-digest-index';
export const DIGEST_DIR = 'data/public/digest';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ISSUE_FILE_RE = /^(\d{4}-\d{2}-\d{2})\.json$/;

const jsonText = (v) => `${JSON.stringify(v, null, 2)}\n`;

// digestFile(digest) — форма файла выпуска: то же, что ушло в каналы, плюс
// версия схемы. Поле telegram публично: это уже отправленный текст.
export function digestFile(digest) {
  return {
    schema: DIGEST_SCHEMA,
    schema_version: DIGEST_SCHEMA_VERSION,
    week: digest.week,
    subject: digest.subject,
    text: digest.text,
    html: digest.html,
    telegram: digest.telegram,
    meta: digest.meta,
  };
}

// digestIndexFile(weeks) — список недель по убыванию, без дублей.
export function digestIndexFile(weeks) {
  const list = Array.isArray(weeks) ? weeks : [];
  const unique = Array.from(new Set(list.filter((w) => typeof w === 'string' && DATE_RE.test(w))));
  unique.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
  return {
    schema: DIGEST_INDEX_SCHEMA,
    schema_version: DIGEST_SCHEMA_VERSION,
    weeks: unique,
  };
}

// readIssues(dir) — уже записанные выпуски каталога, по возрастанию недели.
// Битый файл — ошибка с именем: молча выброшенный выпуск исчез бы из архива.
export function readIssues(dir) {
  if (!existsSync(dir)) return [];
  const issues = [];
  for (const name of readdirSync(dir).sort()) {
    const m = ISSUE_FILE_RE.exec(name);
    if (!m) continue;
    try {
      const issue = JSON.parse(readFileSync(path.join(dir, name), 'utf8'));
      if (issue && typeof issue === 'object') issues.push(issue);
    } catch (e) {
      throw new Error(`${DIGEST_DIR}/${name}: выпуск не читается: ${e.message}`);
    }
  }
  return issues;
}

// buildIssues(weeks, loadSnapshot, opts) — выпуски по возрастанию недели;
// prev для недели W — её предшественница в списке, а для первой — opts.prevWeek.
// Дельта через границу версий методологии не считается: снапшот другой версии
// — не «прошлая неделя» для этого ряда (Р02.1), выпуск выходит без дельты.
function buildIssues(weeks, loadSnapshot, opts = {}) {
  const issues = [];
  let prev = null;
  if (opts.prevWeek) {
    try {
      prev = loadSnapshot(opts.prevWeek);
    } catch {
      prev = null; // прошлой недели нет в публикации — законный первый выпуск
    }
  }
  for (const week of weeks) {
    const snapshot = loadSnapshot(week);
    if (!snapshot || typeof snapshot !== 'object') {
      throw new Error(`${week}: снапшот не найден`);
    }
    const sameMethodology = prev && prev.methodology === snapshot.methodology;
    issues.push(buildDigest(snapshot, { site: opts.site, prev: sameMethodology ? prev : null }));
    prev = snapshot;
  }
  return issues;
}

// writeDigestData({rootDir, weeks, loadSnapshot, site, prevWeek}) — собирает
// выпуски, дополняет архив и пишет файлы. Возвращает {files}.
export function writeDigestData({ rootDir, weeks, loadSnapshot, site, prevWeek }) {
  const root = rootDir || ROOT;
  if (!Array.isArray(weeks) || weeks.length === 0) {
    throw new Error('digest-export: список недель пуст');
  }
  if (typeof loadSnapshot !== 'function') {
    throw new Error('digest-export: нужен loadSnapshot(week)');
  }
  const fresh = buildIssues(weeks, loadSnapshot, { site, prevWeek });
  const dir = path.join(root, ...DIGEST_DIR.split('/'));
  const merged = new Map();
  for (const issue of readIssues(dir)) {
    if (issue.week) merged.set(issue.week, issue);
  }
  for (const issue of fresh) merged.set(issue.week, digestFile(issue));
  const archive = Array.from(merged.values()).sort((a, b) => (a.week < b.week ? 1 : -1));

  const outputs = fresh.map((issue) => [
    path.join(dir, `${issue.week}.json`),
    jsonText(digestFile(issue)),
  ]);
  outputs.push([
    path.join(dir, 'index.json'),
    jsonText(digestIndexFile(archive.map((issue) => issue.week))),
  ]);
  outputs.push([path.join(root, 'digest.html'), renderDigestPage(archive)]);

  mkdirSync(dir, { recursive: true });
  for (const [file, content] of outputs) writeFileSync(file, content, 'utf8');
  return { files: outputs.map(([file]) => file) };
}

// --- CLI ---

function parseArgs(argv) {
  const out = { write: false, root: ROOT, week: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--write') out.write = true;
    else if (arg === '--root') {
      i += 1;
      if (!argv[i]) throw new Error('--root требует путь');
      out.root = path.resolve(argv[i]);
    } else if (arg === '--week') {
      i += 1;
      if (!argv[i] || !DATE_RE.test(argv[i])) throw new Error('--week требует дату YYYY-MM-DD');
      out.week = argv[i];
    } else throw new Error(`неизвестный аргумент: ${arg}`);
  }
  return out;
}

function latestWeeks(root) {
  const src = readFileSync(path.join(root, 'data', 'latest.js'), 'utf8');
  return readLatestWeeks(src).weeks;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const all = latestWeeks(args.root);
  const loadSnapshot = (week) => loadSnapshotFromDisk(week, args.root);
  // Архив — только недели текущей методологии: демо-история 1.0 не выпускалась
  // и с рядом 3.0 несопоставима.
  const weeks = args.week
    ? [args.week]
    : all.filter((week) => {
      try {
        return loadSnapshot(week).methodology === PARAMS.methodology;
      } catch {
        return false;
      }
    });
  const at = args.week ? all.indexOf(args.week) : -1;
  const prevWeek = at > 0 ? all[at - 1] : null;
  const lines = [];

  if (args.write) {
    const { files } = writeDigestData({
      rootDir: args.root, weeks, loadSnapshot, prevWeek,
    });
    lines.push(`записано файлов: ${files.length}`);
    for (const file of files) lines.push(`  ${path.relative(args.root, file).split(path.sep).join('/')}`);
  } else {
    const issues = buildIssues(weeks, loadSnapshot, { prevWeek });
    for (const issue of issues) lines.push(`${issue.week}: ${issue.subject}`);
    lines.push(`выпусков: ${issues.length}; файлы (не записаны; для записи — --write):`);
    for (const week of weeks) lines.push(`  ${DIGEST_DIR}/${week}.json`);
    lines.push(`  ${DIGEST_DIR}/index.json`);
    lines.push('  digest.html');
  }
  process.stdout.write(`${lines.join('\n')}\n`);
}

const invokedDirectly = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  try {
    main();
  } catch (e) {
    process.stderr.write(`digest-export: ${e && e.message ? e.message : e}\n`);
    process.exitCode = 1;
  }
}
