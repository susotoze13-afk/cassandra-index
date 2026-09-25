// check-sources.js — перепроверка ссылок-источников уже опубликованных недель (R02.2).
// CLI — тонкая обвязка над calc.js и linkcheck.js: снапшоты читаются тем же
// механизмом (loadSnapshotPart), URL собираются тем же коллектором
// (collectSourceItems), проверка — linkcheck.checkSources.
//
// Использование:
//   node calc/check-sources.js [YYYY-MM-DD …]  — перечисленные недели
//   node calc/check-sources.js                 — все недели из data/
// Построчный отчёт по каждому URL (ок/битая/заблокирована) + итог.
// Код выхода: 0 — битых нет; 1 — хотя бы одна битая (blocked, 403, не считается).

import { readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { loadSnapshotPart, collectSourceItems } from './calc.js';
import { checkSources } from './linkcheck.js';
import { REGION_IDS } from '../js/data.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);

// Все опубликованные недели: каталоги data/<YYYY-MM-DD>.
function listWeeks() {
  return readdirSync(path.join(ROOT, 'data'), { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name))
    .map((d) => d.name)
    .sort();
}

// Сборка объекта снапшота из частей data/<week>/ — как в calc.js: top-level
// sources и drivers из своих файлов, региональные drivers из region-*.js.
function loadSnapshot(week) {
  const snap = { regions: {} };
  const sources = loadSnapshotPart(week, 'sources');
  if (sources && Array.isArray(sources.sources)) snap.sources = sources.sources;
  const drivers = loadSnapshotPart(week, 'drivers');
  if (drivers && Array.isArray(drivers.drivers)) snap.drivers = drivers.drivers;
  for (const id of REGION_IDS) {
    const part = loadSnapshotPart(week, `region-${id}`);
    if (part && part.regions && part.regions[id]) snap.regions[id] = part.regions[id];
  }
  return snap;
}

const statusLabel = (status) => (status === null ? 'нет ответа' : `статус ${status}`);

// --- CLI ---
async function main() {
  const args = process.argv.slice(2);
  const weeks = args.length ? args : listWeeks();

  const unknown = args.filter((w) => !existsSync(path.join(ROOT, 'data', w)));
  if (unknown.length) {
    process.stdout.write(`недели не найдены в data/: ${unknown.join(', ')}\n`);
    process.exitCode = 1;
    return;
  }

  const totals = { checked: 0, ok: 0, broken: 0, blocked: 0 };
  const lines = [];
  for (const week of weeks) {
    const items = collectSourceItems(loadSnapshot(week), week);
    lines.push(`=== ${week} === проверка ${items.length} ссылок…`);
    const report = await checkSources(items);
    for (const item of items) {
      const b = report.broken.find((x) => x.url === item.url);
      const bl = report.blocked.find((x) => x.url === item.url);
      const state = b ? 'БИТАЯ' : bl ? 'ЗАБЛОКИРОВАНА' : 'ок';
      const detail = b || bl ? ` — ${statusLabel((b || bl).status)}` : '';
      const loc = item.where.startsWith(`${week} `) ? item.where.slice(week.length + 1) : item.where;
      lines.push(`  ${state.padEnd(14)} ${item.url}  (${loc})${detail}`);
    }
    lines.push(
      `  итог ${week}: проверено ${report.checked}, ок ${report.ok}, ` +
      `битых ${report.broken.length}, заблокировано ${report.blocked.length}`,
    );
    totals.checked += report.checked;
    totals.ok += report.ok;
    totals.broken += report.broken.length;
    totals.blocked += report.blocked.length;
  }
  lines.push(
    `ИТОГО: недель ${weeks.length}, проверено ${totals.checked}, ок ${totals.ok}, ` +
    `битых ${totals.broken}, заблокировано ${totals.blocked}`,
  );
  process.stdout.write(lines.join('\n') + '\n');
  process.exitCode = totals.broken > 0 ? 1 : 0;
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((e) => {
    process.stdout.write(`ошибка: ${e && e.message ? e.message : e}\n`);
    process.exitCode = 1;
  });
}
