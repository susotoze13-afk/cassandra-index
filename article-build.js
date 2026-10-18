#!/usr/bin/env node
// article-build.js — конвертер рубрики (ADR 0037): docs/articles/weekly/<week>.md →
// data/<week>/article.js (редакционный сид, отдельная часть набора недели, НЕ входит
// в week.js) + data/articles.js (исторический манифест; статический блог ADR 0056
// его не читает). Без сторонних парсеров, только stdlib (как build.js).
// Пишет файлы только при --write; без него — печать и валидация (идемпотентно).
// Чистые функции экспортированы для тестов (module.exports; ESM-тесты берут через createRequire).

const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const WEEKLY_DIR = path.join(ROOT, 'docs', 'articles', 'weekly');
const DATA_DIR = path.join(ROOT, 'data');

const FORBIDDEN = [
  'прогноз', 'вероятн', 'предсказ', 'до войны', 'на грани', 'на пороге',
  'индекс эскалации', 'обратный отсчёт', 'дельта', 'триггер', 'baseline',
  'пайплайн', 'Brier', 'z-score', 'NLP-триггер', 'шаг к',
];

// ---------- Инлайн-разбор ----------
// Подмножество markdown под фиксированный формат пилота: **bold**, [label](r55:id).
// Сегмент: {t:'text'|'strong'|'link', v, ref?}. Возвращает массив сегментов.
function parseInline(text) {
  const segs = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) segs.push({ t: 'text', v: text.slice(last, m.index) });
    if (m[1] !== undefined) segs.push({ t: 'strong', v: m[1] });
    else segs.push({ t: 'link', v: m[2], ref: m[3] });
    last = re.lastIndex;
  }
  if (last < text.length) segs.push({ t: 'text', v: text.slice(last) });
  return segs.filter((s) => s.v !== '');
}

// ---------- Числа (ворота согласованности) ----------
function parseIntOf(s) {
  const m = s.match(/\*\*(\d+) из 100\*\*/);
  return m ? Number(m[1]) : null;
}
function parseDeltaOf(s) {
  const m = s.match(/за неделю \*\*([+\u2212-]?\d+)\*\*/);
  if (!m) return null;
  const raw = m[1];
  const neg = raw[0] === '-' || raw[0] === '\u2212';
  const n = Number(raw.replace(/[+\u2212-]/, ''));
  return neg ? -n : n;
}
function parseCoverageOf(s) {
  const m = s.match(/покрыто \*\*(\d+) из (\d+)\*\*/);
  return m ? { covered: Number(m[1]), total: Number(m[2]) } : null;
}

// ---------- Главный парсер ----------
// md → контейнер статьи { week, published, methodology, regions_taxonomy, title, dek,
// disclaimer, featured_region, blocks, summary, regionRows }. Бросает Error на битой структуре.
function parseArticleMarkdown(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');

  // Frontmatter
  let i = 0;
  const fm = {};
  if (lines[0] && lines[0].trim() === '---') {
    i = 1;
    for (; i < lines.length && lines[i].trim() !== '---'; i += 1) {
      const line = lines[i];
      const mm = line.match(/^([A-Za-z_]+):\s*(.*)$/);
      if (!mm) continue;
      const key = mm[1];
      let val = mm[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      fm[key] = val;
    }
    i += 1; // пропускаем закрывающий ---
  }

  // Disclaimer — ведущий blockquote (>), до первого ##.
  let disclaimer = '';
  while (i < lines.length) {
    const line = lines[i];
    if (/^>\s?/.test(line)) {
      disclaimer += (disclaimer ? ' ' : '') + line.replace(/^>\s?/, '').trim();
      i += 1;
    } else if (line.trim() === '') {
      i += 1;
    } else {
      break;
    }
  }

  const blocks = [];
  let summary = null;
  const regionRows = [];

  function flushParagraph(buf) {
    if (!buf.length) return;
    blocks.push({ t: 'p', seg: parseInline(buf.join(' ')) });
    buf.length = 0;
  }
  function flushList(list) {
    if (!list.length) return;
    blocks.push({ t: 'ul', items: list.map((s) => ({ seg: parseInline(s) })) });
    list.length = 0;
  }

  let pbuf = [];
  let ulist = [];
  let tableHead = null;
  let tableRows = [];
  let stop = false;

  for (; i < lines.length && !stop; i += 1) {
    const raw = lines[i];
    const line = raw.trim();

    if (line === '') {
      flushList(ulist);
      flushParagraph(pbuf);
      flushTable();
      continue;
    }

    // Стоп: секция «Источники» в контейнер не входит — ссылки резолвит сайт из снапшота.
    if (/^##\s+Источники\s*$/.test(line)) {
      flushList(ulist);
      flushParagraph(pbuf);
      flushTable();
      stop = true;
      continue;
    }

    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      flushList(ulist);
      flushParagraph(pbuf);
      flushTable();
      blocks.push({ t: 'h', level: 2, text: h2[1] });
      continue;
    }
    const h3 = line.match(/^###\s+(.*)$/);
    if (h3) {
      flushList(ulist);
      flushParagraph(pbuf);
      flushTable();
      blocks.push({ t: 'h', level: 3, text: h3[1] });
      continue;
    }
    if (line === '---') {
      flushList(ulist);
      flushParagraph(pbuf);
      flushTable();
      blocks.push({ t: 'hr' });
      continue;
    }
    // Продолжение пункта маркированного списка (строка с отступом внутри списка).
    if (/^\s+/.test(raw) && ulist.length > 0) {
      flushParagraph(pbuf);
      ulist[ulist.length - 1] += ' ' + line;
      continue;
    }
    if (/^- /.test(line)) {
      flushParagraph(pbuf);
      ulist.push(line.slice(2));
      continue;
    }
    if (/^\|/.test(line)) {
      flushList(ulist);
      flushParagraph(pbuf);
      if (/^\|[\s\-:|]+\|$/.test(line)) continue; // разделитель таблицы
      if (tableHead === null) {
        tableHead = splitRow(line);
      } else {
        tableRows.push(splitRow(line));
      }
      continue;
    }

    // «Индекс: …» строки — факт-сводка: извлекаем числа для ворот, в прозу не дублируем.
    if (/^Индекс:\s/.test(line)) {
      flushList(ulist);
      flushParagraph(pbuf);
      flushTable();
      const idx = parseIntOf(line);
      const delta = parseDeltaOf(line);
      const cov = parseCoverageOf(line);
      if (cov) {
        summary = { index: idx, delta, covered: cov.covered, total: cov.total };
      } else if (idx != null && delta != null) {
        regionRows.push({ index: idx, delta });
      }
      continue;
    }

    // Обычный абзац (строки объединяются через пробел).
    flushList(ulist);
    pbuf.push(raw.trim());
  }
  flushList(ulist);
  flushParagraph(pbuf);
  flushTable();

  function splitRow(line) {
    return line.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
  }
  function flushTable() {
    if (tableHead === null) return;
    const rows = tableRows.map((cells) => {
      // Индекс (колонка 2) и дельта (колонка 3) — для ворот согласованности чисел.
      const idx = /^\d+$/.test(cells[1]) ? Number(cells[1]) : null;
      const d = parseTableDelta(cells[2]);
      if (idx != null && d != null) regionRows.push({ index: idx, delta: d });
      return cells.map((c) => ({ seg: parseInline(c) }));
    });
    blocks.push({ t: 'table', head: tableHead.map((c) => ({ seg: parseInline(c) })), rows });
    tableHead = null;
    tableRows = [];
  }
  function parseTableDelta(s) {
    const m = /^([+\u2212-]?)(\d+)$/.exec(s);
    if (!m) return null;
    const n = Number(m[2]);
    return m[1] === '-' || m[1] === '\u2212' ? -n : n;
  }

  if (!summary) throw new Error('не найдена строка глобальной сводки «Индекс: … покрыто …»');
  if (!fm.week) throw new Error('frontmatter: не указан week');
  if (!fm.title) throw new Error('frontmatter: не указан title');

  return {
    week: fm.week,
    published: fm.published || fm.week,
    methodology: fm.methodology || '3.0',
    regions_taxonomy: fm.taxonomy || '2.0',
    title: fm.title,
    dek: fm.dek || '',
    disclaimer: disclaimer || '',
    featured_region: fm.featured_region || null,
    blocks,
    summary,
    regionRows,
  };
}

// ---------- Сериализация ----------
// Стиль данных репозитория: window.CI_DATA… IIFE, ключи в кавычках, 2-пробельный отступ.
function articleFileFor(article) {
  const week = article.week;
  const json = JSON.stringify(
    {
      week: article.week,
      published: article.published,
      methodology: article.methodology,
      regions_taxonomy: article.regions_taxonomy,
      title: article.title,
      dek: article.dek,
      disclaimer: article.disclaimer,
      featured_region: article.featured_region,
      blocks: article.blocks,
      summary: article.summary,
      regionRows: article.regionRows,
    },
    null,
    2,
  );
  return (
    'window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };\n' +
    '(function () {\n' +
    `  var s = window.CI_DATA.snapshots[${JSON.stringify(week)}] = window.CI_DATA.snapshots[${JSON.stringify(week)}] || {};\n` +
    '  s.article = ' + json + ';\n' +
    '})();\n'
  );
}

function manifestFileFor(weeks) {
  const sorted = [...new Set(weeks)].sort();
  const writes = sorted
    .map((w) => `  document.write('<script src="data/${w}/week.js"><\\/script>');\n  document.write('<script src="data/${w}/article.js"><\\/script>');`)
    .join('\n');
  return (
    '// articles.js — исторический манифест рубрики (ADR 0037): недели с выпуском и\n' +
    '// document.write-загрузка week.js + article.js. Статический блог (ADR 0056) его не\n' +
    '// использует; файл оставлен для совместимости. Генерируется article-build.js.\n' +
    'window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };\n' +
    `window.CI_ARTICLES = ${JSON.stringify(sorted)};\n` +
    '(function () {\n' +
    `  window.CI_DATA.latest = ${JSON.stringify(sorted[sorted.length - 1] || null)};\n` +
    writes + '\n' +
    '})();\n'
  );
}

// ---------- Лексический ворот (ADR 0037 §10а) ----------
// Сканирует title/dek/blocks (disclaimer — штатное «не прогноз», не сканируется).
function lexiconViolations(article) {
  const hay = [
    article.title || '',
    article.dek || '',
    ...(article.blocks || []).flatMap((b) => blockText(b)),
  ].join('\n').toLowerCase();
  return FORBIDDEN.filter((w) => hay.includes(w.toLowerCase()));
}

function blockText(b) {
  if (!b) return [];
  if (b.t === 'p') return [segsText(b.seg)];
  if (b.t === 'ul') return (b.items || []).map((it) => segsText(it.seg));
  if (b.t === 'h') return [b.text || ''];
  if (b.t === 'table') {
    return [
      ...(b.head || []).map((c) => segsText(c.seg)),
      ...(b.rows || []).flatMap((r) => r.map((c) => segsText(c.seg))),
    ];
  }
  return [];
}
function segsText(seg) {
  return (seg || []).map((s) => s.v || '').join('');
}

// ---------- CLI ----------
function main() {
  const argv = process.argv.slice(2);
  const write = argv.includes('--write');
  const args = argv.filter((a) => a !== '--write');
  const weeks = args.length ? args : fs.readdirSync(WEEKLY_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));

  const built = [];
  for (const week of weeks) {
    const src = path.join(WEEKLY_DIR, `${week}.md`);
    if (!fs.existsSync(src)) {
      process.stderr.write(`нет черновика ${src}\n`);
      process.exitCode = 1;
      continue;
    }
    const article = parseArticleMarkdown(fs.readFileSync(src, 'utf8'));
    const lex = lexiconViolations(article);
    if (lex.length) {
      process.stderr.write(`${week}: запрещённая лексика: ${lex.join(', ')}\n`);
      process.exitCode = 1;
      continue;
    }
    if (write) {
      fs.writeFileSync(path.join(DATA_DIR, week, 'article.js'), articleFileFor(article));
    }
    built.push(article.week);
    process.stdout.write(`${week}: index ${article.summary.index} (Δ ${article.summary.delta}), блоков ${article.blocks.length}, регионов в строках ${article.regionRows.length}\n`);
  }
  if (write && built.length) {
    fs.writeFileSync(path.join(DATA_DIR, 'articles.js'), manifestFileFor(built));
    process.stdout.write(`data/articles.js: ${built.join(', ')}\n`);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  parseArticleMarkdown,
  parseInline,
  articleFileFor,
  manifestFileFor,
  lexiconViolations,
  FORBIDDEN,
};
