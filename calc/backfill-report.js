#!/usr/bin/env node
// backfill-report.js — чек-лист дозабора источников и сводка долга истории
// (ADR 0040). Только чтение и печать: ничего не собирает, не считает неделю и
// не пишет файлы. Сеть и отбор источников остаются за редактором
// (governance §10.1); автоматический сбор был бы регрессом качества входов.
//
//   node calc/backfill-report.js [--window N] [--weeks 2026-09-20,2026-09-27]
//
// --window N — переопределить PARAMS.backfillWindow (окно дозабора, недель).
// --weeks    — ограничить набор недель (по умолчанию все входы calc/input/).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PARAMS } from './params.js';
import { BLIND_REASONS, debtReport, debtLine, backfillTasks, validateRejected, validateBlindReasons, weeksGenitive } from './history-debt.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = path.join(HERE, 'input');
const WEEK_RE = /^\d{4}-\d{2}-\d{2}$/;

export function listInputWeeks(dir = INPUT_DIR) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json') && WEEK_RE.test(f.slice(0, -5)))
    .map((f) => f.slice(0, -5))
    .sort();
}

// Чтение недели: { week, input } или { week, error } — битый JSON не валит
// весь отчёт, а попадает строкой в предупреждения.
export function loadWeekInput(week, dir = INPUT_DIR) {
  const file = path.join(dir, `${week}.json`);
  if (!existsSync(file)) return { week, error: `вход не найден: ${file}` };
  try {
    return { week, input: JSON.parse(readFileSync(file, 'utf8')) };
  } catch (e) {
    return { week, error: `не парсится JSON (${e.message})` };
  }
}

export function buildReport(weeks, params = PARAMS) {
  const loaded = weeks.map((w) => (typeof w === 'string' ? loadWeekInput(w) : w));
  const bad = loaded.filter((w) => w.error);
  const good = loaded.filter((w) => !w.error).map(({ week, input }) => ({ week, input }));
  const report = debtReport(good, params);
  return {
    report,
    tasks: backfillTasks(good, params),
    schemaWarnings: good.flatMap(({ week, input }) => [
      ...validateBlindReasons(input, params).map((w) => `${week}: ${w}`),
      ...validateRejected(input).map((w) => `${week}: ${w}`),
    ]),
    errors: bad.map(({ week, error }) => `${week}: ${error}`),
  };
}

function formatCounts(byReason) {
  const parts = BLIND_REASONS.map((r) => `${r} ${byReason[r]}`);
  parts.push(`unknown ${byReason.unknown}`);
  return `слепых ${BLIND_REASONS.reduce((s, r) => s + byReason[r], 0) + byReason.unknown} (${parts.join(', ')})`;
}

// Родительный падеж для «N недель»: 1 неделя, 2–4 недели, 5+ недель.
export function formatReport(built, params = PARAMS) {
  const { report, tasks, schemaWarnings, errors } = built;
  const lines = [];
  lines.push('=== Долг истории источников (ADR 0040) ===');
  lines.push(debtLine(report));
  lines.push(`окно дозабора: ${report.backfillWindow} ${weeksGenitive(report.backfillWindow)} от недели первого покрытия ` +
    `(критериев в PARAMS.backfillCriteria: ${(params.backfillCriteria || []).length})`);
  lines.push('');
  lines.push('--- по неделям ---');
  for (const w of report.weeks) {
    lines.push(`  ${w.week}: ${formatCounts(w.byReason)}` +
      `${w.debt ? `, долг ${w.debt}` : ''}${w.legacySkeleton ? ' — ранний скелет' : ''}`);
  }
  lines.push('');
  lines.push('--- чек-лист дозабора (сбор — вручную, governance §10.1) ---');
  const inWindow = tasks.filter((t) => t.week);
  const never = tasks.filter((t) => !t.week);
  if (!inWindow.length && !never.length) {
    lines.push('  пусто: в окне всех критериев списка данные есть');
  }
  for (const t of inWindow) {
    lines.push(`  ${t.criterion}  неделя ${t.week}  причина ${t.reason}` +
      `  (первое покрытие ${t.firstCovered})`);
  }
  for (const t of never) {
    lines.push(`  ${t.criterion}  не покрыт ни в одной неделе набора — дозабор вне окна, решает редактор`);
  }
  if (schemaWarnings.length) {
    lines.push('');
    lines.push('--- предупреждения схемы (warning, не ворота) ---');
    for (const w of schemaWarnings) lines.push(`  ${w}`);
  }
  if (errors.length) {
    lines.push('');
    lines.push('--- ошибки чтения ---');
    for (const e of errors) lines.push(`  ${e}`);
  }
  return lines.join('\n');
}

function main() {
  const args = process.argv.slice(2);
  let weeks = null;
  let params = PARAMS;

  const wi = args.indexOf('--window');
  if (wi >= 0) {
    const n = Number(args[wi + 1]);
    if (!Number.isInteger(n) || n < 0) {
      process.stdout.write('--window: нужно целое ≥ 0\n');
      process.exitCode = 1;
      return;
    }
    params = { ...PARAMS, backfillWindow: n };
  }
  const wsi = args.indexOf('--weeks');
  if (wsi >= 0) {
    const raw = args[wsi + 1];
    if (!raw) {
      process.stdout.write('--weeks: нужен список через запятую\n');
      process.exitCode = 1;
      return;
    }
    weeks = raw.split(',').map((s) => s.trim()).filter(Boolean);
  }

  const targets = weeks || listInputWeeks();
  const built = buildReport(targets, params);
  process.stdout.write(formatReport(built, params) + '\n');
  process.exitCode = built.errors.length ? 1 : 0;
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
