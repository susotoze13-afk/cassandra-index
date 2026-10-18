#!/usr/bin/env node
// blog-build.js — статическая сборка блога «Разбор недели» для SEO и GEO
// (ADR 0061). Читает редакционные черновики docs/articles/weekly/<week>.md
// (формат и гейты — ADR 0037) и опубликованный снапшот data/<week>/week.js,
// пишет:
//   blog/index.html        — архив выпусков (ссылки на все недели);
//   blog/<week>.html       — полностью статическая страница выпуска (без JS);
//   blog/feed.xml          — RSS 2.0;
//   sitemap.xml            — карта сайта с блогом;
//   llms.txt               — индекс для генеративных поисковых систем (GEO).
// Без зависимостей: только stdlib. Пишет файлы только при --write; без флага
// печатает сводку и проверяет идемпотентность (сравнение с диском).
// Чистые швы экспортированы для тестов (CommonJS, как build.js/article-build.js).

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const { parseArticleMarkdown } = require('./article-build.js');

const ROOT = __dirname;
const WEEKLY_DIR = path.join(ROOT, 'docs', 'articles', 'weekly');
const DATA_DIR = path.join(ROOT, 'data');
const BLOG_DIR = path.join(ROOT, 'blog');

const SITE = 'https://cassindex.ru';
const BLOG_URL = `${SITE}/blog/`;
const SITE_NAME = 'Cassandra Index';
const BLOG_NAME = 'Блог Cassandra Index';
const STATIC_CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; " +
  "font-src 'self'; base-uri 'self'; object-src 'none'";

const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

// Названия регионов повторяют js/region.js (REGIONS_V2). Дублирование осознанно:
// сборщик — CommonJS и не тянет ESM-модули сайта; паритет пинит tests/blog.test.js.
const REGION_NAMES = {
  'russia-belarus': 'Россия и Беларусь',
  'ukraine-moldova': 'Украина и Молдова',
  'baltic': 'Балтия',
  'balkans': 'Балканы',
  'eu-north-europe': 'Европа (ЕС и Север)',
  'south-caucasus': 'Южный Кавказ',
  'central-asia': 'Средняя Азия',
  'east-asia': 'Восточная Азия',
  'middle-east': 'Ближний Восток',
  'north-america': 'Северная Америка',
  'south-asia': 'Южная Азия',
  'africa': 'Африка',
};

const STATE_LABELS = {
  calm: 'Спокойно',
  tense: 'Напряжённо',
  danger: 'Опасно',
  very: 'Очень опасно',
  critical: 'Критически опасно',
  extreme: 'Экстремальная угроза',
};

const STATE_RANGES = [
  { max: 20, id: 'calm', range: '0–20' },
  { max: 40, id: 'tense', range: '21–40' },
  { max: 60, id: 'danger', range: '41–60' },
  { max: 80, id: 'very', range: '61–80' },
  { max: 96, id: 'critical', range: '81–96' },
  { max: 100, id: 'extreme', range: '97–100' },
];

const TRANSLIT = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};

// ---------- Чистые утилиты ----------

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeXml(value) {
  return escapeHtml(value);
}

function formatDate(week) {
  const [y, m, d] = String(week).split('-').map(Number);
  return `${d} ${MONTHS_GENITIVE[m - 1] || ''} ${y}`.trim();
}

function isoDateTime(week) {
  return `${week}T00:00:00+03:00`;
}

function deltaLabel(delta) {
  if (typeof delta !== 'number' || !Number.isFinite(delta)) return '—';
  if (delta > 0) return `+${delta}`;
  if (delta < 0) return `−${Math.abs(delta)}`;
  return '0';
}

function stateOf(index) {
  if (typeof index !== 'number' || !Number.isFinite(index)) return null;
  return STATE_RANGES.find((s) => index <= s.max) || null;
}

function slugify(text) {
  const base = String(text || '')
    .toLowerCase()
    .split('')
    .map((ch) => (TRANSLIT[ch] !== undefined ? TRANSLIT[ch] : ch))
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || 'section';
}

function articleUrl(week) {
  return `${SITE}/blog/${week}.html`;
}

// ---------- Загрузка ----------

function loadSnapshot(week, root = ROOT) {
  const file = path.join(root, 'data', week, 'week.js');
  if (!fs.existsSync(file)) {
    throw new Error(`blog-build: нет снапшота ${path.relative(root, file)} (сначала опубликуйте неделю)`);
  }
  const ctx = { window: { CI_DATA: { snapshots: {} } } };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx);
  const snapshot = ctx.window.CI_DATA.snapshots[week];
  if (!snapshot) throw new Error(`blog-build: week.js не содержит снапшот ${week}`);
  return snapshot;
}

function loadIssues(root = ROOT) {
  const dir = path.join(root, 'docs', 'articles', 'weekly');
  if (!fs.existsSync(dir)) return [];
  const weeks = fs.readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.slice(0, -3))
    .sort()
    .reverse();
  return weeks.map((week) => {
    const article = parseArticleMarkdown(fs.readFileSync(path.join(dir, `${week}.md`), 'utf8'));
    return { week: article.week, article, snapshot: loadSnapshot(article.week, root) };
  });
}

function sourceMap(snapshot) {
  const map = new Map();
  for (const source of snapshot?.sources || []) {
    if (source && typeof source.id === 'string') map.set(source.id, source);
  }
  return map;
}

// ---------- Инлайн и блоки ----------

function articleRefs(article) {
  const refs = [];
  const seen = new Set();
  for (const block of article?.blocks || []) {
    for (const seg of blockSegments(block)) {
      if (seg.t === 'link' && typeof seg.ref === 'string' && !seen.has(seg.ref)) {
        seen.add(seg.ref);
        refs.push(seg.ref);
      }
    }
  }
  return refs;
}

function blockSegments(block) {
  if (!block) return [];
  if (block.t === 'p') return block.seg || [];
  if (block.t === 'ul') return (block.items || []).flatMap((item) => item.seg || []);
  if (block.t === 'table') {
    return [...(block.head || []), ...(block.rows || []).flat()].flatMap((cell) => cell.seg || []);
  }
  return [];
}

function renderSegments(segs, sources) {
  return (segs || []).map((seg) => {
    if (seg.t === 'strong') return `<strong>${escapeHtml(seg.v)}</strong>`;
    if (seg.t === 'link') {
      const ref = String(seg.ref || '');
      const isR55 = ref.startsWith('r55:');
      const source = isR55 ? sources.get(ref.slice(4)) : null;
      const href = source && typeof source.url === 'string' ? source.url : (!isR55 ? ref : '');
      if (href) {
        return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(seg.v)}</a>`;
      }
      return escapeHtml(seg.v);
    }
    return escapeHtml(seg.v);
  }).join('');
}

function renderBlocks(blocks, sources) {
  const used = new Map();
  const toc = [];
  const html = [];

  function headingId(text) {
    const base = slugify(text);
    const count = used.get(base) || 0;
    used.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  }

  for (const block of blocks || []) {
    if (block.t === 'h') {
      const id = headingId(block.text);
      const tag = block.level === 3 ? 'h3' : 'h2';
      if (block.level !== 3) toc.push({ id, text: block.text });
      html.push(`<${tag} id="${escapeHtml(id)}">${escapeHtml(block.text)}</${tag}>`);
    } else if (block.t === 'p') {
      html.push(`<p>${renderSegments(block.seg, sources)}</p>`);
    } else if (block.t === 'ul') {
      html.push('<ul>');
      for (const item of block.items || []) html.push(`<li>${renderSegments(item.seg, sources)}</li>`);
      html.push('</ul>');
    } else if (block.t === 'table') {
      html.push('<div class="article-table-wrap"><table>');
      html.push('<thead><tr>');
      for (const cell of block.head || []) {
        html.push(`<th scope="col">${renderSegments(cell.seg, sources)}</th>`);
      }
      html.push('</tr></thead><tbody>');
      for (const row of block.rows || []) {
        html.push('<tr>');
        for (const cell of row) html.push(`<td>${renderSegments(cell.seg, sources)}</td>`);
        html.push('</tr>');
      }
      html.push('</tbody></table></div>');
    } else if (block.t === 'hr') {
      html.push('<hr>');
    }
  }
  return { html: html.join('\n'), toc };
}

// ---------- Общие части страниц ----------

function head({ title, description, canonical, type, published, modified, keywords, region, extra = [] }) {
  const ogType = type || 'website';
  return [
    '<!doctype html>',
    '<html lang="ru">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <meta name="referrer" content="strict-origin-when-cross-origin">',
    `  <meta http-equiv="Content-Security-Policy" content="${STATIC_CSP}">`,
    `  <title>${escapeHtml(title)}</title>`,
    `  <meta name="description" content="${escapeHtml(description)}">`,
    `  <link rel="canonical" href="${escapeHtml(canonical)}">`,
    '  <meta name="robots" content="index,follow,max-image-preview:large">',
    `  <meta name="author" content="${SITE_NAME}">`,
    `  <meta property="og:type" content="${ogType}">`,
    `  <meta property="og:site_name" content="${SITE_NAME}">`,
    '  <meta property="og:locale" content="ru_RU">',
    `  <meta property="og:title" content="${escapeHtml(title)}">`,
    `  <meta property="og:description" content="${escapeHtml(description)}">`,
    `  <meta property="og:url" content="${escapeHtml(canonical)}">`,
    '  <meta name="twitter:card" content="summary">',
    `  <meta name="twitter:title" content="${escapeHtml(title)}">`,
    `  <meta name="twitter:description" content="${escapeHtml(description)}">`,
    ...(published ? [`  <meta property="article:published_time" content="${escapeHtml(published)}">`] : []),
    ...(modified ? [`  <meta property="article:modified_time" content="${escapeHtml(modified)}">`] : []),
    ...(type === 'article' ? ['  <meta property="article:section" content="Разбор недели">'] : []),
    ...(keywords ? [`  <meta name="keywords" content="${escapeHtml(keywords)}">`] : []),
    ...(region ? [`  <meta property="article:tag" content="${escapeHtml(region)}">`] : []),
    '  <link rel="icon" type="image/svg+xml" href="../icon.svg">',
    '  <link rel="stylesheet" href="../css/styles.css">',
    `  <link rel="alternate" type="application/rss+xml" title="${escapeHtml(BLOG_NAME)}" href="${BLOG_URL}feed.xml">`,
    ...extra,
    '</head>',
  ].join('\n');
}

function header({ current = '', home = '../index.html', blog = 'index.html' }) {
  const item = (href, label, key) => {
    const attrs = key === current ? ' aria-current="page"' : '';
    return `        <a href="${href}"${attrs}>${label}</a>`;
  };
  return [
    '<body class="doc-page blog-page">',
    '',
    '  <header class="site-header">',
    '    <div class="header-inner">',
    `      <a class="brand" href="${home}">${SITE_NAME}</a>`,
    '      <nav class="site-nav" aria-label="Основная навигация">',
    item(home, 'Главная', 'home'),
    item(blog, 'Блог', 'blog'),
    '        <a href="../how-to-read.html">Как читать индекс</a>',
    '        <a href="../index.html#methodology">Методология</a>',
    '      </nav>',
    '    </div>',
    '  </header>',
  ].join('\n');
}

function footer() {
  return [
    '',
    '  <footer class="site-footer">',
    '    <p class="disclaimer">Cassandra Index — оценка уровня и направления риска глобального '
      + 'конфликта по открытым данным. Не официальная оценка правительства или международной '
      + 'организации; оценка может быть ошибочной.</p>',
    '    <nav class="footer-nav" aria-label="Сервисные ссылки">',
    '      <a href="../index.html">Главная</a>',
    '      <a href="index.html">Блог</a>',
    '      <a href="../how-to-read.html">Как читать индекс</a>',
    '      <a href="../data/public/index.json">Данные (JSON)</a>',
    '      <a href="../privacy.html">Приватность</a>',
    '    </nav>',
    '  </footer>',
    '',
    '</body>',
    '</html>',
    '',
  ].join('\n');
}

function jsonLdScript(data) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `  <script type="application/ld+json">${json}</script>`;
}

// ---------- Страница выпуска ----------

function renderFacts(article) {
  const { index, delta, covered, total } = article.summary;
  const state = stateOf(index);
  return [
    '      <div class="doc-keyfigures">',
    '        <div class="doc-figure">',
    '          <span class="doc-figure-label">Мировой индекс</span>',
    `          <strong class="doc-figure-value">${index}</strong>`,
    '          <span class="doc-figure-note">из 100</span>',
    '        </div>',
    '        <div class="doc-figure">',
    '          <span class="doc-figure-label">За неделю</span>',
    `          <strong class="doc-figure-value">${escapeHtml(deltaLabel(delta))}</strong>`,
    '          <span class="doc-figure-note">пунктов к прошлой неделе</span>',
    '        </div>',
    '        <div class="doc-figure">',
    '          <span class="doc-figure-label">Состояние</span>',
    `          <strong class="doc-figure-value doc-figure-value--state">${escapeHtml(state ? STATE_LABELS[state.id] : '—')}</strong>`,
    `          <span class="doc-figure-note">диапазон ${state ? state.range : '—'}</span>`,
    '        </div>',
    '        <div class="doc-figure">',
    '          <span class="doc-figure-label">Покрытие</span>',
    `          <strong class="doc-figure-value">${covered}/${total}</strong>`,
    '          <span class="doc-figure-note">критериев недели</span>',
    '        </div>',
    '      </div>',
  ].join('\n');
}

function renderToc(toc) {
  if (!toc.length) return [];
  return [
    '      <nav class="article-toc" aria-label="Содержание">',
    '        <p class="article-toc-title">Содержание</p>',
    '        <ol>',
    ...toc.map((item) => `          <li><a href="#${escapeHtml(item.id)}">${escapeHtml(item.text)}</a></li>`),
    '        </ol>',
    '      </nav>',
  ];
}

function renderSources(refs, sources) {
  if (!refs.length) return [];
  return [
    '      <section class="article-sources" aria-labelledby="sources-title">',
    '        <h2 id="sources-title">Источники</h2>',
    '        <ol>',
    ...refs.map((ref) => {
      const id = String(ref).replace(/^r55:/, '');
      const source = sources.get(id);
      const title = source && source.title
        ? (typeof source.title === 'object' ? (source.title.ru || source.title.en) : source.title)
        : id;
      if (source && typeof source.url === 'string') {
        return `          <li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a></li>`;
      }
      return `          <li>${escapeHtml(title)}</li>`;
    }),
    '        </ol>',
    '      </section>',
  ];
}

function renderPager(article, prev, next) {
  const links = [];
  if (prev) links.push(`          <a href="${prev.week}.html" rel="prev">← ${escapeHtml(formatDate(prev.week))}: ${escapeHtml(prev.article.title)}</a>`);
  if (next) links.push(`          <a href="${next.week}.html" rel="next">${escapeHtml(formatDate(next.week))}: ${escapeHtml(next.article.title)} →</a>`);
  if (!links.length) return [];
  return [
    '      <nav class="article-pager" aria-label="Другие выпуски">',
    '        <p class="article-pager-title">Другие выпуски</p>',
    ...links,
    '      </nav>',
  ];
}

function renderArticlePage(issue, prev, next) {
  const { article, snapshot, week } = issue;
  const sources = sourceMap(snapshot);
  const refs = articleRefs(article);
  const url = articleUrl(week);
  const description = article.dek || `${formatDate(week)}: разбор недели Cassandra Index.`;
  const state = stateOf(article.summary.index);
  const region = article.featured_region ? REGION_NAMES[article.featured_region] || article.featured_region : '';
  const { html: body, toc } = renderBlocks(article.blocks, sources);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description,
    datePublished: isoDateTime(article.published || week),
    dateModified: isoDateTime(article.published || week),
    inLanguage: 'ru',
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isAccessibleForFree: true,
    articleSection: 'Разбор недели',
    author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE}/` },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE}/`,
      logo: { '@type': 'ImageObject', url: `${SITE}/icon.svg` },
    },
    isPartOf: { '@type': 'Blog', '@id': BLOG_URL, name: BLOG_NAME },
    about: { '@type': 'Thing', name: 'Уровень и направление риска глобального конфликта' },
    ...(region ? { mentions: [{ '@type': 'Place', name: region }] } : []),
    ...(state ? { keywords: [SITE_NAME, 'разбор недели', 'конфликтный риск', region].filter(Boolean).join(', ') } : {}),
    citation: refs
      .map((ref) => sources.get(String(ref).replace(/^r55:/, '')))
      .filter((source) => source && typeof source.url === 'string')
      .map((source) => source.url),
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Блог', item: BLOG_URL },
      { '@type': 'ListItem', position: 3, name: formatDate(week), item: url },
    ],
  };

  return [
    head({
      title: `${article.title} — ${SITE_NAME}`,
      description,
      canonical: url,
      type: 'article',
      published: isoDateTime(article.published || week),
      modified: isoDateTime(article.published || week),
      keywords: [SITE_NAME, 'разбор недели', 'конфликтный риск', region, formatDate(week)].filter(Boolean).join(', '),
      region,
      extra: [jsonLdScript(ld), jsonLdScript(breadcrumbs)],
    }),
    header({ current: 'blog' }),
    '',
    '  <main id="main">',
    '    <nav class="breadcrumbs" aria-label="Хлебные крошки">',
    '      <a href="../index.html">Главная</a>',
    '      <span aria-hidden="true">/</span>',
    '      <a href="index.html">Блог</a>',
    '      <span aria-hidden="true">/</span>',
    `      <span aria-current="page">${escapeHtml(formatDate(week))}</span>`,
    '    </nav>',
    '',
    '    <article class="article">',
    `      <h1>${escapeHtml(article.title)}</h1>`,
    `      <p class="article-dek">${escapeHtml(article.dek)}</p>`,
    `      <p class="article-meta">Разбор недели · <time datetime="${escapeHtml(week)}">${escapeHtml(formatDate(week))}</time> · методология ${escapeHtml(article.methodology)}</p>`,
    article.disclaimer ? `      <blockquote class="article-disclaimer">${escapeHtml(article.disclaimer)}</blockquote>` : '',
    renderFacts(article),
    ...renderToc(toc),
    '      <div class="article-body">',
    body,
    '      </div>',
    ...renderSources(refs, sources),
    ...renderPager(article, prev, next),
    '      <section class="article-data" aria-labelledby="article-data-title">',
    '        <h2 id="article-data-title">Данные и методология</h2>',
    '        <p>Числа выпуска — из опубликованного снапшота недели. Методология, шкала и правила '
      + `чтения описаны на страницах <a href="../how-to-read.html">«Как читать индекс»</a> и `
      + `<a href="../index.html#methodology">«Методология»</a>. Машинные данные — `
      + `<a href="../data/public/index.json">index.json</a> и `
      + `<a href="../data/public/cassandra-index.csv">CSV</a>.</p>`,
    '      </section>',
    '    </article>',
    '  </main>',
    footer(),
  ].join('\n');
}

// ---------- Архив выпусков ----------

function renderIssueCard(issue) {
  const { article, week } = issue;
  return [
    '        <li class="blog-item">',
    '          <article>',
    `            <p class="blog-item-date"><time datetime="${escapeHtml(week)}">${escapeHtml(formatDate(week))}</time></p>`,
    `            <h3 class="blog-item-title"><a href="${week}.html">${escapeHtml(article.title)}</a></h3>`,
    `            <p class="blog-item-dek">${escapeHtml(article.dek)}</p>`,
    `            <p class="blog-item-facts">Индекс ${article.summary.index} из 100 · ${escapeHtml(deltaLabel(article.summary.delta))} за неделю · покрыто ${article.summary.covered} из ${article.summary.total} критериев</p>`,
    `            <p class="blog-item-more"><a href="${week}.html">Читать разбор</a></p>`,
    '          </article>',
    '        </li>',
  ].join('\n');
}

function renderIndexPage(issues) {
  const latest = issues[0];
  const description = 'Еженедельные разборы Cassandra Index: что произошло за неделю, на что это повлияло и на что смотреть дальше. Архив выпусков с числами и источниками.';
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: BLOG_NAME,
    description,
    url: BLOG_URL,
    inLanguage: 'ru',
    publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE}/` },
    ...(latest ? { dateModified: isoDateTime(latest.article.published || latest.week) } : []),
    blogPost: issues.map((issue) => ({
      '@type': 'BlogPosting',
      headline: issue.article.title,
      description: issue.article.dek,
      url: articleUrl(issue.week),
      datePublished: isoDateTime(issue.article.published || issue.week),
      inLanguage: 'ru',
    })),
  };

  return [
    head({
      title: `Блог: разбор недели — ${SITE_NAME}`,
      description,
      canonical: BLOG_URL,
      type: 'website',
      keywords: `${SITE_NAME}, блог, разбор недели, конфликтный риск`,
      extra: [jsonLdScript(ld)],
    }),
    header({ current: 'blog', blog: 'index.html' }),
    '',
    '  <main id="main">',
    '    <h1>Блог: разбор недели</h1>',
    '    <p class="doc-lede">Каждую неделю — разбор опубликованного индекса: что произошло, '
      + 'на что это повлияло и какие известные точки календаря смотреть дальше. Числа выпуска '
      + 'совпадают с опубликованным снапшотом недели, а ссылки ведут к источникам.</p>',
    `    <p class="doc-meta">Выпусков: ${issues.length}${latest ? ` · последний — ${escapeHtml(formatDate(latest.week))}` : ''}. `
      + 'Архив пополняется по воскресеньям; формат — <a href="../how-to-read.html">как читать индекс</a>.</p>',
    '',
    '    <section aria-labelledby="issues-title">',
    '      <h2 id="issues-title">Выпуски</h2>',
    issues.length
      ? ['      <ol class="blog-list">', ...issues.map(renderIssueCard), '      </ol>'].join('\n')
      : '      <p>Первый выпуск готовится.</p>',
    '    </section>',
    '',
    '    <section class="blog-about" aria-labelledby="blog-about-title">',
    '      <h2 id="blog-about-title">О блоге</h2>',
    '      <p>Блог — нарративный слой поверх еженедельного индекса. Он не предсказывает события '
      + 'и не называет дату: материал показывает уровень и направление уже измеренного риска '
      + 'и прослеживает, какой критерий недели сдвинул число. Если неделя опубликована с '
      + 'неполным покрытием, это указано в выпуске.</p>',
    '      <p>Машинные данные и история — <a href="../data/public/index.json">index.json</a>, '
      + '<a href="../data/public/cassandra-index.csv">CSV</a> и '
      + '<a href="../changelog.html">история изменений</a>. Лента выпусков — '
      + '<a href="feed.xml">RSS</a>.</p>',
    '    </section>',
    '  </main>',
    footer(),
  ].join('\n');
}

// ---------- RSS, карта сайта, llms.txt ----------

function renderFeed(issues) {
  const latest = issues[0];
  const lastBuild = latest ? new Date(`${latest.article.published || latest.week}T00:00:00Z`).toUTCString() : new Date(0).toUTCString();
  const items = issues.map((issue) => {
    const url = articleUrl(issue.week);
    const pub = new Date(`${issue.article.published || issue.week}T00:00:00Z`).toUTCString();
    return [
      '    <item>',
      `      <title>${escapeXml(issue.article.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${pub}</pubDate>`,
      `      <description>${escapeXml(issue.article.dek)}</description>`,
      '    </item>',
    ].join('\n');
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(BLOG_NAME)}</title>`,
    `    <link>${BLOG_URL}</link>`,
    `    <atom:link href="${BLOG_URL}feed.xml" rel="self" type="application/rss+xml"/>`,
    '    <description>Еженедельные разборы уровня и направления конфликтного риска по открытым данным.</description>',
    '    <language>ru</language>',
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

function staticRootPages(root = ROOT) {
  return fs.readdirSync(root)
    .filter((name) => name.endsWith('.html'))
    .filter((name) => name !== 'index.html')
    .filter((name) => name !== 'articles.html') // алиас-редирект, вне карты
    .filter((name) => name !== 'cassandra-index-prototype.html')
    .sort();
}

function renderSitemap(issues, root = ROOT) {
  const urls = [`${SITE}/`, ...staticRootPages(root).map((page) => `${SITE}/${page}`)];
  const latest = issues[0];
  urls.push(BLOG_URL);
  for (const issue of issues) urls.push(articleUrl(issue.week));
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];
  for (const url of urls) {
    lines.push('  <url>');
    lines.push(`    <loc>${url}</loc>`);
    if (url === BLOG_URL && latest) {
      lines.push(`    <lastmod>${latest.article.published || latest.week}</lastmod>`);
    }
    if (url.startsWith(`${BLOG_URL}`) && url !== BLOG_URL) {
      const week = url.slice(BLOG_URL.length).replace(/\.html$/, '');
      const issue = issues.find((item) => item.week === week);
      if (issue) lines.push(`    <lastmod>${issue.article.published || issue.week}</lastmod>`);
    }
    lines.push('  </url>');
  }
  lines.push('</urlset>', '');
  return lines.join('\n');
}

function renderLlms(issues) {
  return [
    `# ${SITE_NAME}`,
    '',
    '> Публичный еженедельный индекс уровня и направления риска глобального конфликта по открытым данным. '
      + 'Значение от 0 до 100 упорядочивает недели по уровню риска; это не предсказание событий и не официальная оценка.',
    '',
    '## Основные страницы',
    `- [Главная](${SITE}/): текущая неделя, региональная разбивка, тренд и методология.`,
    `- [Как читать индекс](${SITE}/how-to-read.html): шкала, ограничения, правила цитирования.`,
    `- [Блог](${BLOG_URL}): архив еженедельных разборов.`,
    `- [История изменений](${SITE}/changelog.html): версии методологии и данных.`,
    `- [Дайджест](${SITE}/digest.html): короткие недельные выпуски.`,
    `- [Валидация и журнал прогнозов](${SITE}/validation.html): сравнение с GPR, ACLED и CrisisWatch, попадания и промахи прогнозов.`,
    '',
    '## Разборы недели',
    ...issues.map((issue) => `- [${formatDate(issue.week)} — ${issue.article.title}](${articleUrl(issue.week)}): ${issue.article.dek}`),
    '',
    '## Данные',
    `- [index.json](${SITE}/data/public/index.json): все недели и значения индекса.`,
    `- [cassandra-index.csv](${SITE}/data/public/cassandra-index.csv): плоская таблица для анализа.`,
    `- [changelog.json](${SITE}/data/public/changelog.json): машинная история изменений.`,
    `- [RSS блога](${BLOG_URL}feed.xml): лента выпусков.`,
    '',
    '## Цитирование',
    'При использовании значений указывайте неделю, версию методологии и ссылку на страницу недели.',
    '',
  ].join('\n');
}

// ---------- Сборка ----------

function buildOutputs(root = ROOT) {
  const issues = loadIssues(root);
  const outputs = new Map();
  outputs.set('blog/index.html', renderIndexPage(issues));
  issues.forEach((issue, index) => {
    const prev = issues[index + 1] || null; // более старая неделя
    const next = issues[index - 1] || null; // более новая неделя
    outputs.set(`blog/${issue.week}.html`, renderArticlePage(issue, prev, next));
  });
  outputs.set('blog/feed.xml', renderFeed(issues));
  outputs.set('sitemap.xml', renderSitemap(issues, root));
  outputs.set('llms.txt', renderLlms(issues));
  return { issues, outputs };
}

function main() {
  const argv = process.argv.slice(2);
  const write = argv.includes('--write');
  const { issues, outputs } = buildOutputs();

  for (const [rel, content] of outputs) {
    const file = path.join(ROOT, rel);
    const onDisk = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
    const state = onDisk === content ? 'без изменений' : 'обновить';
    process.stdout.write(`${rel}: ${state} (${content.length} байт)\n`);
    if (write && onDisk !== content) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, content);
    }
  }

  if (write) {
    const keep = new Set(issues.map((issue) => `${issue.week}.html`).concat('index.html', 'feed.xml'));
    if (fs.existsSync(BLOG_DIR)) {
      for (const name of fs.readdirSync(BLOG_DIR)) {
        if (name.endsWith('.html') && !keep.has(name)) {
          fs.unlinkSync(path.join(BLOG_DIR, name));
          process.stdout.write(`blog/${name}: удалён (нет черновика)\n`);
        }
      }
    }
  }

  process.stdout.write(`выпусков: ${issues.length}\n`);
}

if (require.main === module) {
  main();
}

module.exports = {
  SITE,
  BLOG_URL,
  BLOG_NAME,
  REGION_NAMES,
  STATIC_CSP,
  escapeHtml,
  formatDate,
  deltaLabel,
  stateOf,
  slugify,
  articleUrl,
  articleRefs,
  loadSnapshot,
  loadIssues,
  renderSegments,
  renderBlocks,
  renderArticlePage,
  renderIndexPage,
  renderFeed,
  renderSitemap,
  renderLlms,
  buildOutputs,
  staticRootPages,
};
