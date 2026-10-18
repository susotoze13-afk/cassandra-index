// digest-page.js — статическая страница архива выпусков (A03, A03.1):
// последний выпуск целиком + до DIGEST_ARCHIVE_LINKS прошлых + ссылка на
// машинный список data/public/digest/index.json. Полный HTML-документ без
// скриптов, без внешних ресурсов и без i18n-рантайма: страницу читает и
// краулер без JS. Все подставляемые значения проходят escapeHtml.

import { escapeHtml } from './digest.js';

export const DIGEST_ARCHIVE_LINKS = 12;
export const DIGEST_INDEX_PATH = 'data/public/digest/index.json';

const SITE = 'https://cassindex.ru';
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function issueLink(issue) {
  if (!issue || typeof issue.week !== 'string' || !DATE_RE.test(issue.week)) return null;
  return `data/public/digest/${issue.week}.json`;
}

function issueLabel(issue) {
  return typeof issue.subject === 'string' && issue.subject.trim()
    ? issue.subject.trim()
    : `Выпуск ${issue.week}`;
}

function latestArticle(issue) {
  if (!issue) {
    return ['    <p>Выпусков пока нет.</p>'];
  }
  const lines = [
    '    <article class="digest-issue">',
    `      <h2>${escapeHtml(issueLabel(issue))}</h2>`,
  ];
  const text = typeof issue.text === 'string' ? issue.text : '';
  for (const line of text.split('\n')) {
    const value = line.trim();
    if (value) lines.push(`      <p>${escapeHtml(value)}</p>`);
  }
  lines.push('    </article>');
  return lines;
}

function archiveList(issues) {
  const items = [];
  for (const issue of issues) {
    const href = issueLink(issue);
    if (!href) continue;
    items.push(`      <li><a href="${escapeHtml(href)}">${escapeHtml(issueLabel(issue))}</a></li>`);
  }
  return items;
}

// renderDigestPage(issues) → полный HTML-документ. Порядок входа не важен:
// выпуски сортируются по неделе по убыванию, последний показывается целиком.
export function renderDigestPage(issues) {
  const list = (Array.isArray(issues) ? issues : [])
    .filter((issue) => issue && typeof issue.week === 'string' && DATE_RE.test(issue.week))
    .slice()
    .sort((a, b) => (a.week < b.week ? 1 : a.week > b.week ? -1 : 0));
  const latest = list[0] || null;
  const previous = list.slice(1, 1 + DIGEST_ARCHIVE_LINKS);

  return [
    '<!doctype html>',
    '<html lang="ru">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <meta name="referrer" content="strict-origin-when-cross-origin">',
    '  <!-- CSP через meta: GitHub Pages не даёт заголовков. Страница статическая —',
    '       без скриптов, без внешних ресурсов и без JSON-LD. -->',
    '  <meta http-equiv="Content-Security-Policy" content="default-src \'self\'; '
    + 'script-src \'self\'; style-src \'self\'; img-src \'self\'; font-src \'self\'; '
    + 'base-uri \'self\'; object-src \'none\'">',
    '  <title>Дайджест — Cassandra Index</title>',
    '  <meta name="description" content="Недельный дайджест Cassandra Index: пять пунктов '
    + '«что изменилось», три региона и ссылка на кривую индекса.">',
    `  <link rel="canonical" href="${SITE}/digest.html">`,
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="Cassandra Index">',
    '  <meta property="og:title" content="Дайджест — Cassandra Index">',
    '  <meta property="og:description" content="Недельный дайджест Cassandra Index: пять пунктов '
    + '«что изменилось», три региона и ссылка на кривую индекса.">',
    `  <meta property="og:url" content="${SITE}/digest.html">`,
    '  <meta property="og:locale" content="ru_RU">',
    '  <link rel="icon" type="image/svg+xml" href="icon.svg">',
    '  <link rel="stylesheet" href="css/styles.css">',
    '</head>',
    '<body class="doc-page">',
    '',
    '  <header class="site-header">',
    '    <div class="header-inner">',
    '      <a class="brand" href="index.html">Cassandra Index</a>',
    '      <nav class="site-nav" aria-label="Навигация страницы">',
    '        <a href="index.html">На главную</a>',
    '        <a href="how-to-read.html">Как читать</a>',
    '        <a href="changelog.html">История изменений</a>',
    '      </nav>',
    '    </div>',
    '  </header>',
    '',
    '  <main id="main">',
    '    <h1>Дайджест</h1>',
    '    <p class="doc-lede">Раз в неделю — короткий выпуск «что изменилось»: пять пунктов, '
    + 'три региона по величине недельного изменения и ссылка на кривую. Числа выпуска — '
    + 'производная опубликованного снапшота недели, а не отдельный расчёт.</p>',
    '',
    ...latestArticle(latest),
    '',
    '    <section aria-labelledby="archive-title">',
    '      <h2 id="archive-title">Прошлые выпуски</h2>',
    ...(previous.length
      ? ['      <ul class="doc-links">', ...archiveList(previous), '      </ul>']
      : ['      <p>Прошлых выпусков пока нет.</p>']),
    `      <p>Машинный список выпусков — <a href="${escapeHtml(DIGEST_INDEX_PATH)}">index.json</a>.</p>`,
    '    </section>',
    '  </main>',
    '',
    '  <footer class="site-footer">',
    '    <p class="disclaimer">Cassandra Index — экспериментальная оценка риска на основе '
    + 'открытых данных. Это не официальный прогноз правительства или международной '
    + 'организации. Оценка может быть ошибочной.</p>',
    '    <nav class="footer-nav" aria-label="Сервисные ссылки">',
    '      <a href="index.html">На главную</a>',
    '      <a href="how-to-read.html">Как читать индекс</a>',
    '      <a href="changelog.html">История изменений</a>',
    '      <a href="data/public/index.json">Данные (JSON)</a>',
    '      <a href="privacy.html">Приватность</a>',
    '    </nav>',
    '  </footer>',
    '',
    '</body>',
    '</html>',
    '',
  ].join('\n');
}
