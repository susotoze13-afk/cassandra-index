// Статический блог «Разбор недели» (ADR 0061): сборка blog/index.html,
// blog/<week>.html, RSS, sitemap.xml и llms.txt из редакционных черновиков и
// опубликованных снапшотов. Проверяются SEO/GEO-требования (canonical, meta,
// Open Graph, JSON-LD, статический текст) и идемпотентность сборки.
// Ожидания — из ADR 0061 и контракта статьи, не из кода под тестом.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

import { REGIONS_V2 } from '../js/region.js';

const require = createRequire(import.meta.url);
const builder = require('../blog-build.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const { issues, outputs } = builder.buildOutputs(ROOT);

function read(rel) {
  return readFileSync(path.join(ROOT, rel), 'utf8');
}

function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => JSON.parse(m[1]));
}

test('сборка идемпотентна: все выходы совпадают с диском', () => {
  assert.ok(outputs.size >= 5, 'должны собираться архив, выпуски, RSS, карта и llms.txt');
  for (const [rel, content] of outputs) {
    assert.ok(existsSync(path.join(ROOT, rel)), `${rel}: файл не собран`);
    assert.equal(read(rel), content, `${rel}: файл на диске расходится со сборкой`);
    assert.ok(!content.includes('\r'), `${rel}: CRLF вместо LF`);
  }
});

test('выпуски: есть хотя бы один и они отсортированы от новых к старым', () => {
  assert.ok(issues.length >= 1, 'нет ни одного выпуска');
  const weeks = issues.map((issue) => issue.week);
  assert.deepEqual(weeks, [...weeks].sort().reverse(), 'выпуски должны идти от новых к старым');
  for (const issue of issues) {
    assert.ok(issue.article.title, `${issue.week}: нет заголовка`);
    assert.ok(issue.article.dek, `${issue.week}: нет дека`);
    assert.ok(issue.snapshot.sources.length > 0, `${issue.week}: у снапшота нет источников`);
  }
});

test('blog/index.html: архив, ссылки на все недели и JSON-LD Blog', () => {
  const html = read('blog/index.html');
  assert.match(html, /<html lang="ru">/);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, 'должен быть ровно один h1');
  assert.ok(html.includes('<link rel="canonical" href="https://cassindex.ru/blog/">'));
  assert.match(html, /<meta name="description" content="[^"]{20,}">/);
  for (const prop of ['og:type', 'og:title', 'og:description', 'og:url']) {
    assert.ok(html.includes(`property="${prop}"`), `нет ${prop}`);
  }
  assert.ok(html.includes('href="feed.xml"'), 'нет ссылки на RSS');
  assert.ok(!/<script src=/.test(html), 'страница блога не должна нести JS-файлов');
  for (const issue of issues) {
    assert.ok(html.includes(`href="${issue.week}.html"`), `нет ссылки на выпуск ${issue.week}`);
    assert.ok(html.includes(issue.article.title), `нет заголовка выпуска ${issue.week}`);
  }
  const ld = jsonLd(html);
  assert.equal(ld.length, 1, 'на архиве ожидается один JSON-LD');
  assert.equal(ld[0]['@type'], 'Blog');
  assert.equal(ld[0].blogPost.length, issues.length);
  for (const post of ld[0].blogPost) {
    assert.ok(post.headline && post.url && post.datePublished, 'BlogPosting неполный');
  }
});

test('blog/<week>.html: SEO-метаданные, Open Graph и JSON-LD NewsArticle', () => {
  for (const issue of issues) {
    const rel = `blog/${issue.week}.html`;
    const html = read(rel);
    const url = `https://cassindex.ru/blog/${issue.week}.html`;
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${rel}: должен быть ровно один h1`);
    assert.ok(html.includes(`<link rel="canonical" href="${url}">`), `${rel}: canonical`);
    assert.ok(html.includes(`property="og:url" content="${url}"`), `${rel}: og:url`);
    assert.ok(html.includes('property="og:type" content="article"'), `${rel}: og:type`);
    assert.ok(html.includes('property="article:published_time"'), `${rel}: published_time`);
    assert.ok(html.includes('<link rel="alternate" type="application/rss+xml"'), `${rel}: RSS`);
    assert.ok(html.includes('href="../index.html"'), `${rel}: нет пути на главную`);
    assert.ok(html.includes(issue.article.title), `${rel}: нет заголовка`);
    assert.ok(html.includes(`<time datetime="${issue.week}">`), `${rel}: нет даты выпуска`);
    assert.ok(html.includes('href="index.html"'), `${rel}: нет ссылки на архив блога`);
    assert.ok(!/<script src=/.test(html), `${rel}: не должно быть внешних скриптов`);

    const ld = jsonLd(html);
    const article = ld.find((item) => item['@type'] === 'NewsArticle');
    const crumbs = ld.find((item) => item['@type'] === 'BreadcrumbList');
    assert.ok(article, `${rel}: нет JSON-LD NewsArticle`);
    assert.ok(crumbs, `${rel}: нет JSON-LD BreadcrumbList`);
    assert.equal(article.headline, issue.article.title);
    assert.equal(article.url, url);
    assert.equal(article.inLanguage, 'ru');
    assert.ok(article.datePublished.startsWith(issue.week), `${rel}: datePublished не та неделя`);
    assert.ok(Array.isArray(article.citation) && article.citation.length > 0, `${rel}: нет citation`);
    assert.equal(crumbs.itemListElement.length, 3, `${rel}: хлебные крошки неполные`);
    assert.equal(crumbs.itemListElement[2].item, url);
  }
});

test('текст выпуска статический: блоки и источники отрисованы в HTML', () => {
  for (const issue of issues) {
    const html = read(`blog/${issue.week}.html`);
    const refs = builder.articleRefs(issue.article);
    assert.ok(refs.length > 0, `${issue.week}: в тексте нет ссылок на источники`);
    assert.ok(html.includes('class="article-body"'), `${issue.week}: нет тела статьи`);
    assert.ok(html.includes('class="article-sources"'), `${issue.week}: нет списка источников`);
    const sourceCount = (html.match(/class="article-sources"[\s\S]*?<\/section>/) || [''])[0]
      .match(/<li>/g)?.length || 0;
    assert.equal(sourceCount, refs.length, `${issue.week}: источников в HTML ${sourceCount}, в тексте ${refs.length}`);
    for (const ref of refs) {
      const source = issue.snapshot.sources.find((item) => item.id === ref.replace(/^r55:/, ''));
      assert.ok(source && source.url, `${issue.week}: источник ${ref} не найден в снапшоте`);
      assert.ok(html.includes(source.url), `${issue.week}: ссылка ${ref} не попала в HTML`);
    }
  }
});

test('названия регионов совпадают с таксономией v2 сайта', () => {
  const ids = Object.keys(builder.REGION_NAMES).sort();
  assert.deepEqual(ids, REGIONS_V2.map((region) => region.id).sort());
  for (const region of REGIONS_V2) {
    assert.equal(builder.REGION_NAMES[region.id], region.name.ru, `регион ${region.id}`);
  }
});

test('sitemap.xml: блог и все выпуски, без алиаса articles.html', () => {
  const xml = read('sitemap.xml');
  assert.match(xml, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locations.includes('https://cassindex.ru/blog/'), 'в карте нет архива блога');
  for (const issue of issues) {
    assert.ok(locations.includes(builder.articleUrl(issue.week)), `в карте нет выпуска ${issue.week}`);
  }
  assert.ok(!locations.includes('https://cassindex.ru/articles.html'), 'алиас не должен попадать в карту');
  assert.equal(new Set(locations).size, locations.length, 'в карте есть дубли');
});

test('llms.txt: индекс для генеративных поисковых систем (GEO)', () => {
  const text = read('llms.txt');
  assert.match(text, /^# Cassandra Index/m);
  assert.match(text, /^> /m, 'нет краткого описания проекта');
  for (const heading of ['Основные страницы', 'Разборы недели', 'Данные', 'Цитирование']) {
    assert.ok(text.includes(`## ${heading}`), `нет раздела «${heading}»`);
  }
  assert.ok(text.includes('https://cassindex.ru/blog/'), 'нет ссылки на блог');
  for (const issue of issues) {
    assert.ok(text.includes(builder.articleUrl(issue.week)), `нет выпуска ${issue.week}`);
    assert.ok(text.includes(issue.article.title), `нет заголовка ${issue.week}`);
  }
});

test('blog/feed.xml: RSS 2.0 со всеми выпусками', () => {
  const xml = read('blog/feed.xml');
  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(xml, /<rss version="2\.0"/);
  const items = xml.match(/<item>/g) || [];
  assert.equal(items.length, issues.length);
  for (const issue of issues) {
    assert.ok(xml.includes(builder.articleUrl(issue.week)), `в ленте нет ${issue.week}`);
  }
  assert.ok(xml.includes('<lastBuildDate>'), 'нет lastBuildDate');
});

test('утилиты сборки: экранирование, дата, изменение и состояние', () => {
  assert.equal(builder.escapeHtml('<b>&"\'</b>'), '&lt;b&gt;&amp;&quot;&#39;&lt;/b&gt;');
  assert.equal(builder.formatDate('2026-10-18'), '18 октября 2026');
  assert.equal(builder.deltaLabel(8), '+8');
  assert.equal(builder.deltaLabel(-3), '−3');
  assert.equal(builder.deltaLabel(0), '0');
  assert.equal(builder.stateOf(64).id, 'very');
  assert.equal(builder.stateOf(5).id, 'calm');
  assert.equal(builder.slugify('Регион: middle-east — Ближний Восток'), 'region-middle-east-blizhniy-vostok');
});

test('blog: каталог содержит только собранные выпуски и архив', () => {
  const files = readdirSync(path.join(ROOT, 'blog')).filter((name) => name.endsWith('.html')).sort();
  const expected = ['index.html', ...issues.map((issue) => `${issue.week}.html`)].sort();
  assert.deepEqual(files, expected, 'в blog/ остались страницы без черновика');
});
