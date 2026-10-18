import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://cassindex.ru';

// Прототип — read-only артефакт вне публикации (AGENTS.md), поэтому из проверок
// публикации он исключён: его не должно быть ни в выкате, ни в карте сайта.
const NOT_PUBLISHED = new Set(['cassandra-index-prototype.html']);

const pages = readdirSync(root)
  .filter((name) => name.endsWith('.html'))
  .filter((name) => !NOT_PUBLISHED.has(name))
  .sort();

const deployYml = readFileSync(join(root, '.github', 'workflows', 'deploy.yml'), 'utf8');
const digestYml = readFileSync(join(root, '.github', 'workflows', 'weekly-digest.yml'), 'utf8');

// Ожидание взято из спецификации (R27, R36): выкат собирается явным cp, поэтому
// белый список читается из шага «Stage site files», а не из списка в тесте.
function stageCommands(yml) {
  const start = yml.indexOf('Stage site files');
  assert.ok(start > -1, 'deploy.yml: шаг «Stage site files» не найден');
  const end = yml.indexOf('Upload Pages artifact', start);
  assert.ok(end > start, 'deploy.yml: шаг «Stage site files» должен идти до upload');

  const commands = [];
  let buffer = '';
  for (const raw of yml.slice(start, end).split('\n')) {
    const line = raw.trim();
    if (line === '' || line.startsWith('#')) continue;
    buffer = buffer === '' ? line : `${buffer} ${line}`;
    if (buffer.endsWith('\\')) {
      buffer = buffer.slice(0, -1).trim();
      continue;
    }
    commands.push(buffer);
    buffer = '';
  }
  return commands;
}

function stagedRootFiles(commands) {
  const staged = new Set();
  for (const command of commands) {
    if (!command.startsWith('cp ')) continue;
    const tokens = command.split(/\s+/).filter((token) => token !== '' && !token.startsWith('-'));
    const target = tokens[tokens.length - 1];
    if (target !== '_site/') continue;
    for (const source of tokens.slice(1, -1)) staged.add(source);
  }
  return staged;
}

const commands = stageCommands(deployYml);
const staged = stagedRootFiles(commands);

test('deploy.yml: в выкат попадает каждый корневой *.html и ни одного лишнего', () => {
  const stagedHtml = [...staged].filter((name) => name.endsWith('.html')).sort();
  assert.deepEqual(stagedHtml, pages, 'cp-список deploy.yml должен совпадать с корневыми *.html');
  for (const page of pages) {
    assert.ok(staged.has(page), `страница ${page} не копируется в _site`);
  }
});

test('deploy.yml: robots.txt и sitemap.xml публикуются, data не исключаются', () => {
  assert.ok(staged.has('robots.txt'), 'robots.txt должен копироваться в _site');
  assert.ok(staged.has('sitemap.xml'), 'sitemap.xml должен копироваться в _site');

  const joined = commands.join('\n');
  assert.match(joined, /cp -r css js data _site\//, 'каталог data должен публиковаться целиком');
  assert.match(joined, /rm -f _site\/data\/audit\.jsonl/, 'аудит не публикуется (F-02)');
  assert.match(joined, /echo cassindex\.ru > _site\/CNAME/, 'кастомный домен пишется в артефакт');
});

test('deploy.yml: actions закреплены полным SHA', () => {
  for (const line of deployYml.split('\n')) {
    const uses = /^\s*-?\s*uses: (\S+)/.exec(line);
    if (uses) assert.match(uses[1], /@[0-9a-f]{40}$/, `action без SHA-пиннинга: ${uses[1]}`);
  }
});

// Карта сайта: index.html — корень «/», остальные страницы — своими именами.
const sitemapPath = join(root, 'sitemap.xml');
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, 'utf8') : '';

function sitemapPaths(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

test('sitemap.xml: urlset 0.9, абсолютные URL и ровно опубликованные страницы', () => {
  assert.ok(sitemap.length > 0, 'sitemap.xml должен существовать');
  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.match(sitemap, /<\/urlset>\s*$/);

  const locations = sitemapPaths(sitemap);
  assert.ok(locations.length > 0, 'sitemap.xml не содержит <loc>');
  for (const location of locations) {
    assert.ok(location.startsWith(`${SITE}/`), `URL карты должен быть абсолютным: ${location}`);
  }

  const expected = pages
    .map((page) => (page === 'index.html' ? `${SITE}/` : `${SITE}/${page}`))
    .sort();
  assert.deepEqual([...new Set(locations)].sort(), expected);
  assert.equal(locations.length, expected.length, 'в sitemap.xml не должно быть дублей');
});

test('sitemap.xml: каждая запись — <url> с одним <loc>', () => {
  const blocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  assert.ok(blocks.length > 0, 'sitemap.xml не содержит записей <url>');
  assert.equal(blocks.length, sitemapPaths(sitemap).length);
  for (const block of blocks) {
    assert.equal((block.match(/<loc>/g) ?? []).length, 1, `битая запись карты: ${block}`);
  }
  assert.equal((sitemap.match(/<url>/g) ?? []).length, (sitemap.match(/<\/url>/g) ?? []).length);
});

test('robots.txt: открыт для всех и ссылается на карту сайта', () => {
  const robots = readFileSync(join(root, 'robots.txt'), 'utf8');
  const lines = robots.split('\n').map((line) => line.trim());
  assert.ok(lines.includes('User-agent: *'), 'robots.txt: нужен User-agent: *');
  assert.ok(lines.includes('Allow: /'), 'robots.txt: нужен Allow: /');
  assert.ok(
    lines.includes(`Sitemap: ${SITE}/sitemap.xml`),
    `robots.txt: нужен Sitemap: ${SITE}/sitemap.xml`,
  );
});

// R07/R13: со страницы всегда есть путь назад на главную. Сам index.html —
// это и есть главная, ссылка на себя ему не нужна.
test('каждая страница ссылается на index.html', () => {
  for (const page of pages) {
    if (page === 'index.html') continue;
    const html = readFileSync(join(root, page), 'utf8');
    assert.match(html, /href="(?:\.\/)?index\.html"/, `${page}: нет ссылки на index.html`);
  }
});

// R09: данные лежат в data/public и уезжают на сайт вместе с cp -r data.
test('data/public:index.json, changelog.json и digest/index.json достижимы в выкате', () => {
  for (const rel of ['index.json', 'changelog.json', 'digest/index.json']) {
    assert.ok(existsSync(join(root, 'data', 'public', rel)), `нет data/public/${rel}`);
  }
  assert.ok(
    commands.some((command) => /^cp -r .*data _site\//.test(command)),
    'data публикуется целиком — иначе data/public недостижим',
  );
  for (const command of commands) {
    if (!command.startsWith('rm ')) continue;
    assert.doesNotMatch(command, /_site\/data\/public/, 'data/public не должен удаляться из артефакта');
  }
});

test('weekly-digest.yml: actions: write и явный запуск deploy.yml после пуша', () => {
  assert.match(digestYml, /^\s{2}actions: write$/m, 'weekly-digest.yml: нужен actions: write');

  const runIndex = digestYml.indexOf('gh workflow run deploy.yml');
  assert.ok(runIndex > -1, 'weekly-digest.yml: нужен gh workflow run deploy.yml');
  assert.ok(
    runIndex > digestYml.indexOf('sent.json'),
    'деплой запускается после коммита sent.json',
  );
  assert.match(
    digestYml.slice(0, runIndex),
    /GH_TOKEN: \$\{\{ (?:github\.token|secrets\.GITHUB_TOKEN) \}\}/,
    'gh workflow run требует GH_TOKEN',
  );
});

test('новые файлы публикации — LF', () => {
  for (const name of ['robots.txt', 'sitemap.xml', 'tests/site-pages.test.js']) {
    const content = readFileSync(join(root, name), 'utf8');
    assert.ok(!content.includes('\r'), `${name}: CRLF запрещён (.gitattributes)`);
  }
});
