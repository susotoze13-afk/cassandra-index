// public-export.js — производный публичный слой данных: узкая проекция
// дисковых снапшотов в data/public/* (index.json, latest.json, CSV, trend.svg) и
// changelog.json + changelog.html. Не второй расчёт: числа берутся из тех же
// частей data/<week>/, что грузит сайт (через loadWeekParts/renderWeekCombined),
// поэтому паритет с сайтом проверяется одним тестом.
//
// Схема публичного файла (schema_version 1): неделя —
//   week, published, through, methodology, regions_taxonomy, data_state,
//   index, delta, state, q, confidence, coverage_criteria,
//   regions [{id, index, delta, background}], precursor|null,
//   precursor_present, drivers [{label, contribution}],
//   sources {count, clusters, state_affiliated}, trend [{date, value, methodology?}].
// state — engine.stateOf(index, PARAMS): пороги состояний не дублируются.
// precursor отсутствует на диске у всех недель (ADR 0047): публикуется null +
// precursor_present: false — «не публиковалось» ≠ «ноль сигналов».
//
// CSV: фиксированная шапка, строка = неделя × область (global + каждый регион),
// UTF-8 без BOM, разделитель «,», перевод строки «\n». Колонки:
//   schema, schema_version, week, published, through, methodology,
//   regions_taxonomy, data_state, scope, index, delta, state, q, confidence,
//   coverage_covered, coverage_total, background.
// Ни одно поле не содержит запятой; пустое значение — отсутствие числа.
//
// Детерминизм: ни одного timestamp внутри файлов; повторный --write даёт те же
// байты. Битый снапшот отсекается validate из js/data.js до записи — диск не
// трогается.
//
// CLI: `node calc/public-export.js` — печать сводки; `--write` — запись;
// `--root <dir>` — другой корень (нужен тестам битого снапшота).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

import { PARAMS } from './params.js';
import { stateOf } from './engine.js';
import { validate, regionIdsFor } from '../js/data.js';
import {
  loadWeekParts, renderWeekCombined, weekPartFiles, taxonomyForWeek,
} from './calc.js';
import { CHANGELOG, sortedDesc, validateChangelog } from './changelog-entries.js';
import { readLatestWeeks } from './prepare-week.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export const PUBLIC_SCHEMA_VERSION = 1;
const PUBLIC_SCHEMA = 'cassandra-index-public';
const CHANGELOG_SCHEMA = 'cassandra-index-changelog';
const SITE = 'https://cassindex.ru';

// Данные публичного слоя распространяются под CC BY 4.0 (LICENSE-DATA в корне).
// Форма конверта заморожена (interfaces.md §3): name/url заполнены, `placeholder`
// снят — машинный потребитель видит разрешение, а не дыру. Атрибуция обязательна:
// обязательна ссылка на проект и лицензию, дата/версия недели уже лежат рядом.
const LICENSE = {
  name: 'CC BY 4.0',
  url: 'https://creativecommons.org/licenses/by/4.0/legalcode',
  attribution: 'Cassandra Index — https://cassindex.ru, лицензия CC BY 4.0',
  note: 'Атрибуция обязательна: при переиспользовании укажите «Cassandra Index, версия, дата недели, https://cassindex.ru» и лицензию CC BY 4.0.',
  placeholder: false,
};

const CSV_COLUMNS = [
  'schema', 'schema_version', 'week', 'published', 'through', 'methodology',
  'regions_taxonomy', 'data_state', 'scope', 'index', 'delta', 'state', 'q',
  'confidence', 'coverage_covered', 'coverage_total', 'background',
];

// Геометрия trend.svg — константы экспорта (не методологии, поэтому не PARAMS).
const TREND = {
  width: 640,
  height: 320,
  padLeft: 36,
  padRight: 16,
  padTop: 20,
  padBottom: 40,
  radius: 4,
};

const KIND_LABELS = {
  methodology: 'методология',
  taxonomy: 'таксономия',
  schema: 'схема данных',
  field: 'поле',
  fix: 'исправление',
  product: 'продукт',
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

function coverageOf(snapshot) {
  const c = snapshot && snapshot.coverageCriteria;
  if (!c || !isNum(c.covered) || !isNum(c.total)) return null;
  return { covered: c.covered, total: c.total };
}

function precursorOf(snapshot) {
  const p = snapshot && snapshot.precursor;
  if (!p || typeof p !== 'object' || !isNum(p.value)) return null;
  const out = { value: p.value };
  if (isNum(p.signalingSubgroups)) out.signaling_subgroups = p.signalingSubgroups;
  return out;
}

function trendPoint(point) {
  const out = { date: point && point.date, value: point ? point.value : null };
  if (point && typeof point.methodology === 'string') out.methodology = point.methodology;
  return out;
}

// datasetOf(snapshot, week) — чистая проекция одной недели; диска и сети нет.
export function datasetOf(snapshot, week) {
  const s = snapshot || {};
  const taxonomy = typeof s.regions_taxonomy === 'string' ? s.regions_taxonomy : '1.0';
  const g = s.global && typeof s.global === 'object' ? s.global : null;
  const regions = regionIdsFor(taxonomy).map((id) => {
    const r = (s.regions && s.regions[id]) || {};
    return {
      id,
      index: isNum(r.index) ? r.index : null,
      delta: isNum(r.delta) ? r.delta : null,
      background: r.background === true,
    };
  });
  const sources = Array.isArray(s.sources) ? s.sources : [];
  const precursor = precursorOf(s);
  const clusters = new Set();
  let affiliated = 0;
  for (const src of sources) {
    if (!src) continue;
    if (typeof src.cluster_id === 'string' && src.cluster_id) clusters.add(src.cluster_id);
    if (src.state_affiliated === true) affiliated += 1;
  }
  return {
    week,
    published: s.published ?? null,
    through: s.through ?? null,
    methodology: s.methodology ?? null,
    regions_taxonomy: taxonomy,
    data_state: s.dataState ?? null,
    index: g && isNum(g.index) ? g.index : null,
    delta: g && isNum(g.delta) ? g.delta : null,
    state: g && isNum(g.index) ? stateOf(g.index, PARAMS) : null,
    q: isNum(s.q) ? s.q : null,
    confidence: typeof s.confidence === 'string' ? s.confidence : null,
    coverage_criteria: coverageOf(s),
    regions,
    precursor,
    precursor_present: precursor !== null,
    drivers: Array.from(Array.isArray(s.drivers) ? s.drivers : [], (d) => ({
      label: { ru: d && d.label ? d.label.ru : null, en: d && d.label ? d.label.en : null },
      contribution: d ? d.contribution : null,
    })),
    sources: {
      count: sources.length,
      clusters: clusters.size,
      state_affiliated: affiliated,
    },
    // Array.from, а не .map: снапшот приходит из vm-контекста, и .map вернул бы
    // массив чужого realm — JSON тот же, а deepEqual с диском уже нет.
    trend: Array.from(Array.isArray(s.trend) ? s.trend : [], trendPoint),
  };
}

// buildDataset(weeks, loadSnapshot) — конверт публичного ряда. Порядок недель
// задаёт вызывающий (CI_WEEKS возрастает); последняя неделя — latest.
export function buildDataset(weeks, loadSnapshot) {
  if (!Array.isArray(weeks) || weeks.length === 0) {
    throw new Error('public-export: список недель пуст');
  }
  if (typeof loadSnapshot !== 'function') {
    throw new Error('public-export: нужен loadSnapshot(week)');
  }
  const out = [];
  for (const week of weeks) {
    const snap = loadSnapshot(week);
    if (!snap || typeof snap !== 'object') {
      throw new Error(`public-export: ${week}: снапшот не найден`);
    }
    out.push(datasetOf(snap, week));
  }
  return {
    schema: PUBLIC_SCHEMA,
    schema_version: PUBLIC_SCHEMA_VERSION,
    site: SITE,
    license: { ...LICENSE },
    weeks: out,
  };
}

function csvValue(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  // Одна таблица без кавычек: запятая или перевод строки внутри значения
  // сломали бы разбор — это ошибка экспорта, а не повод цитировать поле.
  if (s.includes(',') || s.includes('\n') || s.includes('\r')) {
    throw new Error(`public-export: поле CSV содержит запятую или перевод строки: ${JSON.stringify(s)}`);
  }
  return s;
}

function csvRow(week, scope, index, delta, state, background) {
  const cov = week.coverage_criteria;
  return [
    PUBLIC_SCHEMA, PUBLIC_SCHEMA_VERSION, week.week, week.published, week.through,
    week.methodology, week.regions_taxonomy, week.data_state, scope, index, delta,
    state, week.q, week.confidence,
    cov ? cov.covered : '', cov ? cov.total : '', background,
  ].map(csvValue).join(',');
}

// toCsv(dataset) — одна таблица: неделя × область (global + регионы).
export function toCsv(dataset) {
  const rows = [CSV_COLUMNS.join(',')];
  for (const w of dataset.weeks) {
    rows.push(csvRow(w, 'global', w.index, w.delta, w.state, false));
    for (const r of w.regions) {
      rows.push(csvRow(w, r.id, r.index, r.delta, isNum(r.index) ? stateOf(r.index, PARAMS) : null, r.background));
    }
  }
  return `${rows.join('\n')}\n`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtml(s) {
  return escapeXml(s);
}

// toTrendSvg(snapshot) — кривая 12 точек: подписи дат, без внешних ресурсов.
// Принимает снапшот или проекцию недели (у обоих есть trend).
export function toTrendSvg(snapshot) {
  const trend = snapshot && Array.isArray(snapshot.trend) ? snapshot.trend : [];
  const { width: W, height: H, padLeft, padRight, padTop, padBottom, radius } = TREND;
  const plotW = W - padLeft - padRight;
  const plotH = H - padTop - padBottom;
  const n = trend.length;
  const x = (i) => (n <= 1 ? padLeft : padLeft + (plotW * i) / (n - 1));
  const y = (v) => H - padBottom - (plotH * v) / 100;
  const points = [];
  const marks = [];
  trend.forEach((p, i) => {
    const cx = x(i);
    const label = typeof p.date === 'string' && DATE_RE.test(p.date)
      ? `${p.date.slice(8, 10)}.${p.date.slice(5, 7)}`
      : '';
    if (label) {
      marks.push(
        `  <text class="trend-axis-label" x="${cx.toFixed(1)}" y="${(H - padBottom + 18).toFixed(1)}" `
        + 'text-anchor="middle" style="fill:var(--text-secondary, #8B949E)">'
        + `${escapeXml(label)}</text>`,
      );
    }
    if (!isNum(p.value)) return;
    const cy = y(p.value);
    points.push(`${cx.toFixed(1)},${cy.toFixed(1)}`);
    marks.push(
      `  <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${radius}" `
      + 'style="fill:var(--accent, #58A6FF)"/>',
      `  <text x="${cx.toFixed(1)}" y="${(cy - 8).toFixed(1)}" text-anchor="middle" `
      + 'style="fill:var(--text, #E6EDF3)">' + `${p.value}</text>`,
    );
  });
  const axis = `  <line x1="${padLeft}" y1="${H - padBottom}" x2="${W - padRight}" `
    + `y2="${H - padBottom}" style="stroke:var(--border, #232B36)"/>`;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" `
    + 'role="img" aria-labelledby="trend-title trend-desc">',
    '  <title id="trend-title">Cassandra Index — индекс за 12 недель</title>',
    '  <desc id="trend-desc">Точки — опубликованный индекс по неделям; шкала 0–100 '
    + 'порядковая, расстояния между числами — соглашение.</desc>',
    axis,
    `  <polyline points="${points.join(' ')}" fill="none" `
    + 'style="stroke:var(--accent, #58A6FF);stroke-width:2"/>',
    ...marks,
    '</svg>',
    '',
  ].join('\n');
}

function changelogArticle(entry) {
  const kind = KIND_LABELS[entry.kind] || entry.kind;
  const parts = [
    '  <article class="changelog-entry">',
    `    <h2>${escapeHtml(entry.title)}</h2>`,
    `    <p class="changelog-meta"><time datetime="${escapeHtml(entry.date)}">${escapeHtml(entry.date)}</time>`
    + ` · версия ${escapeHtml(entry.version)} · ${escapeHtml(kind)}</p>`,
    `    <p>${escapeHtml(entry.body)}</p>`,
  ];
  if (entry.link) {
    parts.push(`    <p><a href="${escapeHtml(entry.link)}" rel="noopener noreferrer">Подробнее</a></p>`);
  }
  parts.push('  </article>');
  return parts.join('\n');
}

// renderChangelogPage(entries) — полный статический HTML-документ; без скриптов
// и внешних ресурсов (только css/styles.css и icon.svg), значения экранируются.
export function renderChangelogPage(entries) {
  const list = Array.isArray(entries) ? entries : [];
  return [
    '<!doctype html>',
    '<html lang="ru">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <meta name="referrer" content="strict-origin-when-cross-origin">',
    '  <!-- CSP через meta: GitHub Pages не отдаёт заголовки. Страница статическая, без скриптов. -->',
    '  <meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\'; '
    + 'style-src \'self\'; img-src \'self\'; font-src \'self\'; base-uri \'self\'; object-src \'none\'">',
    '  <title>История изменений — Cassandra Index</title>',
    '  <meta name="description" content="Что и когда менялось в методологии, таксономии и полях '
    + 'Cassandra Index.">',
    '  <link rel="icon" type="image/svg+xml" href="icon.svg">',
    '  <link rel="stylesheet" href="css/styles.css">',
    '</head>',
    '<body class="privacy-page">',
    '',
    '  <header class="privacy-top">',
    '    <a class="privacy-back" href="index.html">← На главную</a>',
    '  </header>',
    '',
    '  <main>',
    '    <h1>История изменений</h1>',
    '    <p>Что и когда менялось в методологии, таксономии регионов, схеме публичных данных '
    + 'и полях снапшота. Машинночитаемая копия — <a href="data/public/changelog.json">'
    + 'changelog.json</a>.</p>',
    '',
    ...list.map(changelogArticle),
    '  </main>',
    '',
    '</body>',
    '</html>',
    '',
  ].join('\n');
}

function changelogFile(entries) {
  return {
    schema: CHANGELOG_SCHEMA,
    schema_version: PUBLIC_SCHEMA_VERSION,
    entries: sortedDesc(entries),
  };
}

const jsonText = (v) => `${JSON.stringify(v, null, 2)}\n`;

// writePublicData({rootDir, weeks, loadSnapshot, entries}) — собирает всё в
// память и только потом пишет: упавший снапшот не оставляет полузаписанных
// файлов. Возвращает {files} — пути записанного.
export function writePublicData({ rootDir, weeks, loadSnapshot, entries = CHANGELOG }) {
  const root = rootDir || ROOT;
  const errors = validateChangelog(entries);
  if (errors.length) throw new Error(`changelog: ${errors.join('; ')}`);
  const dataset = buildDataset(weeks, loadSnapshot);
  const latest = dataset.weeks[dataset.weeks.length - 1];
  const changelog = changelogFile(entries);
  const outputs = [
    [path.join(root, 'data', 'public', 'index.json'), jsonText(dataset)],
    [
      path.join(root, 'data', 'public', 'latest.json'),
      jsonText({
        schema: dataset.schema,
        schema_version: dataset.schema_version,
        site: dataset.site,
        license: dataset.license,
        week: latest,
      }),
    ],
    [path.join(root, 'data', 'public', 'cassandra-index.csv'), toCsv(dataset)],
    [path.join(root, 'data', 'public', 'trend.svg'), toTrendSvg(latest)],
    [path.join(root, 'data', 'public', 'changelog.json'), jsonText(changelog)],
    [path.join(root, 'changelog.html'), renderChangelogPage(changelog.entries)],
  ];
  mkdirSync(path.join(root, 'data', 'public'), { recursive: true });
  for (const [file, content] of outputs) writeFileSync(file, content, 'utf8');
  return { files: outputs.map(([file]) => file) };
}

// --- Чтение дисковых снапшотов (CLI и паритетный тест) ---

function readWeekParts(root, week) {
  const dir = path.join(root, 'data', week);
  const globalPath = path.join(dir, 'global.js');
  if (!existsSync(globalPath)) return null;
  // Версия таксономии — из global-части; при отсутствии поля действует то же
  // правило, что у сайта: неделя вне границы v2 — набор 1.0.
  const globalSrc = readFileSync(globalPath, 'utf8');
  const m = /s\.regions_taxonomy = "([^"]+)"/.exec(globalSrc);
  const taxonomy = m ? m[1] : taxonomyForWeek(week);
  const parts = {};
  for (const file of weekPartFiles(taxonomy)) {
    const p = path.join(dir, `${file}.js`);
    if (!existsSync(p)) return null;
    parts[file] = readFileSync(p, 'utf8');
  }
  return parts;
}

function executeCombined(week, parts) {
  const sandbox = { window: { CI_DATA: { snapshots: {}, latest: null } } };
  vm.createContext(sandbox);
  vm.runInContext(renderWeekCombined(week, parts), sandbox, { filename: `${week}/week.js` });
  const snap = sandbox.window.CI_DATA.snapshots[week];
  if (!snap || typeof snap !== 'object') {
    throw new Error('снапшот не зарегистрировался в window.CI_DATA');
  }
  return snap;
}

// loadSnapshotFromDisk(week, rootDir = ROOT) — снапшот недели так, как его видит
// сайт, с воротами validate из js/data.js. Ошибка называет неделю и ошибки
// контракта — CLI печатает её в stderr.
export function loadSnapshotFromDisk(week, rootDir = ROOT) {
  const root = rootDir || ROOT;
  const parts = root === ROOT ? loadWeekParts(week) : readWeekParts(root, week);
  if (!parts) throw new Error(`${week}: снапшот недели не найден в data/${week}/`);
  let snapshot;
  try {
    snapshot = executeCombined(week, parts);
  } catch (e) {
    throw new Error(`${week}: снапшот не читается: ${e.message}`);
  }
  const v = validate(snapshot);
  if (!v.ok) {
    throw new Error(`${week}: снапшот не проходит validate: ${v.errors.join('; ')}`);
  }
  return snapshot;
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

function signed(n) {
  if (!isNum(n)) return '—';
  return n > 0 ? `+${n}` : String(n);
}

function main() {
  const { write, root } = parseArgs(process.argv.slice(2));
  const latestSrc = readFileSync(path.join(root, 'data', 'latest.js'), 'utf8');
  const { weeks } = readLatestWeeks(latestSrc);
  const loadSnapshot = (w) => loadSnapshotFromDisk(w, root);
  const lines = [];
  if (write) {
    const { files } = writePublicData({ rootDir: root, weeks, loadSnapshot, entries: CHANGELOG });
    const last = buildDataset([weeks[weeks.length - 1]], loadSnapshot).weeks[0];
    lines.push(`записано файлов: ${files.length}`);
    for (const file of files) lines.push(`  ${path.relative(root, file).split(path.sep).join('/')}`);
    lines.push(`последняя неделя: ${last.week} — индекс ${last.index}, дельта ${signed(last.delta)}, `
      + `состояние ${last.state}`);
  } else {
    const dataset = buildDataset(weeks, loadSnapshot);
    const last = dataset.weeks[dataset.weeks.length - 1];
    const files = [
      'data/public/index.json', 'data/public/latest.json',
      'data/public/cassandra-index.csv', 'data/public/trend.svg',
      'data/public/changelog.json', 'changelog.html',
    ];
    lines.push(`недель: ${dataset.weeks.length}, последняя ${last.week} — индекс ${last.index}, `
      + `дельта ${signed(last.delta)}, состояние ${last.state}`);
    lines.push(`changelog: ${CHANGELOG.length} записей`);
    lines.push('файлы (не записаны; для записи — --write):');
    for (const file of files) lines.push(`  ${file}`);
  }
  process.stdout.write(`${lines.join('\n')}\n`);
}

const invokedDirectly = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  try {
    main();
  } catch (e) {
    process.stderr.write(`public-export: ${e && e.message ? e.message : e}\n`);
    process.exitCode = 1;
  }
}
