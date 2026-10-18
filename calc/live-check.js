// live-check.js — проверка живого сайта после выката (R02/R02.1/R06i/R07i).
// Одна команда: `node calc/live-check.js [--base https://cassindex.ru]`.
// Скачивает data/latest.js и по week.js каждой недели, выполняет их в vm
// (тот же приём, что у loadSnapshotPart: window.CI_DATA без DOM), гоняет
// контракт js/data.js и проверяет цитаты источников у недель пилота Jev.
// Сеть — только через переданный fetchImpl (по умолчанию fetch); модуль
// ничего не пишет на диск. Код выхода 1 — прод отдаёт не то, что собрано.
// В бандл сайта не входит: билдер собирает только js/**.
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { validate } from '../js/data.js';
import { trustFacts } from '../js/sections/trust.js';

export const DEFAULT_BASE = 'https://cassindex.ru';
// Список недель сайта — 12 (data/latest.js CI_WEEKS); расхождение = прод
// отдаёт не то, что собрано.
export const EXPECTED_WEEK_COUNT = 12;
// Недели с корпусом текстов и цитатами (T02): у них цитаты обязаны быть.
export const QUOTE_WEEKS = ['2026-09-20', '2026-09-27'];

const USAGE = `Проверка живого сайта Cassandra Index.

  node calc/live-check.js [--base https://cassindex.ru]

Скачивает data/latest.js и data/<неделя>/week.js, выполняет снапшоты в vm,
проверяет контракт js/data.js, список недель и цитаты источников недель
${QUOTE_WEEKS.join(' / ')}. Код выхода 1, если прод отдаёт не то.
`;

function trimSlash(url) {
  return url.replace(/\/+$/, '');
}

// Скачивание с проверкой статуса; fetchImpl — шов тестов (без сети).
async function fetchText(fetchImpl, url) {
  const res = await fetchImpl(url);
  if (!res || typeof res.text !== 'function') throw new Error('ответ без тела');
  const status = typeof res.status === 'number' ? res.status : 0;
  if (res.ok === false || (status && (status < 200 || status >= 300))) {
    throw new Error(`HTTP ${status || '?'}`);
  }
  return res.text();
}

// latest.js: список недель из window.CI_WEEKS. document.write на сайте
// подгружает week.js — здесь это no-op, недели качаются по списку.
export function evalLatest(code) {
  const writes = [];
  const sandbox = {
    window: {},
    document: { write: (s) => writes.push(String(s)) },
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const weeks = Array.isArray(sandbox.window.CI_WEEKS)
    ? Array.from(sandbox.window.CI_WEEKS)
    : [];
  return { weeks, latest: sandbox.window.CI_LATEST ?? null, writes };
}

// week.js: комбинированный снапшот недели так, как его видит сайт.
export function evalWeek(code, week) {
  const sandbox = { window: { CI_DATA: { snapshots: {}, latest: null } } };
  sandbox.window.CI_DATA.snapshots[week] = { regions: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const snap = sandbox.window.CI_DATA.snapshots[week];
  return snap && typeof snap === 'object' ? snap : null;
}

export function parseArgs(argv) {
  const args = { base: DEFAULT_BASE, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else if (arg === '--base') {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) throw new Error('--base требует значение');
      args.base = value;
      i += 1;
    } else if (arg.startsWith('--base=')) {
      args.base = arg.slice('--base='.length);
    } else {
      throw new Error(`неизвестный аргумент: ${arg}`);
    }
  }
  if (args.help) return args;
  if (!/^https?:\/\//i.test(args.base)) {
    throw new Error(`--base должен быть http(s)-адресом: ${args.base}`);
  }
  return args;
}

// checkSite({base, fetchImpl}) → { ok, exitCode, base, weeks, errors }.
// errors — сводные проблемы (latest.js и проверки недель); row.errors —
// подробности по неделе (контракт и цитаты).
export async function checkSite(options = {}) {
  const base = trimSlash(options.base ?? DEFAULT_BASE);
  const fetchImpl = options.fetchImpl ?? fetch;
  const errors = [];
  const weeks = [];

  const fail = (list) => ({ ok: false, exitCode: 1, base, weeks, errors: list });

  let weekList;
  let latestCode;
  try {
    latestCode = await fetchText(fetchImpl, `${base}/data/latest.js`);
  } catch (error) {
    return fail([`latest.js: не скачан — ${error.message ?? error}`]);
  }

  try {
    weekList = evalLatest(latestCode).weeks;
  } catch (error) {
    return fail([`latest.js: не выполняется — ${error.message ?? error}`]);
  }

  if (weekList.length !== EXPECTED_WEEK_COUNT) {
    errors.push(`latest.js: недель ${weekList.length}, ожидалось ${EXPECTED_WEEK_COUNT}`);
  }
  if (new Set(weekList).size !== weekList.length) {
    errors.push('latest.js: в CI_WEEKS есть повторы');
  }

  for (const week of weekList) {
    const row = {
      week,
      contractOk: false,
      sources: 0,
      quotedSources: null,
      trustQuoted: null,
      errors: [],
    };
    weeks.push(row);

    let code;
    try {
      code = await fetchText(fetchImpl, `${base}/data/${week}/week.js`);
    } catch (error) {
      row.errors.push(`week.js не скачан — ${error.message ?? error}`);
      continue;
    }

    let snapshot;
    try {
      snapshot = evalWeek(code, week);
    } catch (error) {
      row.errors.push(`week.js не выполняется — ${error.message ?? error}`);
      continue;
    }
    if (!snapshot) {
      row.errors.push('week.js не создал снапшот недели');
      continue;
    }

    row.sources = Array.isArray(snapshot.sources) ? snapshot.sources.length : 0;

    let verdict;
    try {
      verdict = validate(snapshot);
    } catch (error) {
      verdict = { ok: false, errors: [`validate упал: ${error.message ?? error}`] };
    }
    row.contractOk = verdict.ok === true;
    if (!row.contractOk) row.errors.push(...verdict.errors);

    if (QUOTE_WEEKS.includes(week)) {
      // Источники с хотя бы одной цитатой (R05i) и счётчик витрины (R05i.1).
      row.quotedSources = Array.isArray(snapshot.sources)
        ? snapshot.sources.filter(
            (s) => s && Array.isArray(s.quotes) && s.quotes.length > 0,
          ).length
        : 0;
      if (row.quotedSources === 0) {
        row.errors.push('ни у одного источника нет цитат (quotes)');
      }
      let facts = null;
      try {
        facts = trustFacts(snapshot);
      } catch (error) {
        row.errors.push(`витрина доверия упала — ${error.message ?? error}`);
      }
      row.trustQuoted = facts?.quoted?.count ?? 0;
      if (!(row.trustQuoted > 0)) {
        row.errors.push(`витрина доверия: с цитатой ${row.trustQuoted} из ${row.sources}`);
      }
    }

    if (row.errors.length > 0) {
      errors.push(`${week}: ${row.errors.length} проблем(ы)`);
    }
  }

  const ok = errors.length === 0 && weeks.every((r) => r.errors.length === 0);
  return { ok, exitCode: ok ? 0 : 1, base, weeks, errors };
}

// Человекочитаемый отчёт: по строке на неделю + список проблем + итог.
export function formatReport(result) {
  const lines = [];
  lines.push('Cassandra Index — проверка живого сайта');
  lines.push(`база: ${result.base}`);
  lines.push(
    `недель в latest.js: ${result.weeks.length} (ожидалось ${EXPECTED_WEEK_COUNT})`,
  );

  for (const row of result.weeks) {
    const contract = row.contractOk ? 'контракт ✓' : 'контракт ✗';
    const parts = [`${row.week}  ${contract}`, `источников ${row.sources}`];
    if (row.quotedSources !== null) {
      parts.push(`цитат у источников ${row.quotedSources}`);
      parts.push(`витрина: ${row.trustQuoted}`);
    }
    lines.push(parts.join('  '));
    for (const error of row.errors) lines.push(`  ✗ ${error}`);
  }

  if (result.errors.length > 0) {
    lines.push('проблемы:');
    for (const error of result.errors) lines.push(`  ✗ ${error}`);
  }

  if (result.ok) {
    lines.push(
      `ИТОГ: OK — ${result.weeks.length} недель, контракт выполнен, ` +
        `цитаты ${QUOTE_WEEKS.join(' / ')} на месте`,
    );
  } else {
    const total = result.errors.length || result.weeks.length || 1;
    lines.push(`ИТОГ: FAIL — проблем: ${total}`);
  }
  return lines.join('\n');
}

export async function main(argv, fetchImpl) {
  let args;
  try {
    args = parseArgs(argv);
  } catch (error) {
    process.stderr.write(`${error.message}\n\n${USAGE}`);
    process.exitCode = 2;
    return;
  }
  if (args.help) {
    process.stdout.write(USAGE);
    return;
  }
  const result = await checkSite({ base: args.base, fetchImpl });
  process.stdout.write(`${formatReport(result)}\n`);
  process.exitCode = result.exitCode;
}

const invokedAsScript =
  !!process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (invokedAsScript) {
  main(process.argv.slice(2));
}
