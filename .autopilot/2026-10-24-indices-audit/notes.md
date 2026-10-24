# indices-audit.html — разведка перед спецификацией

Дата: 2026-10-24. Только факты: путь:строка + имена/сигнатуры/дословные фрагменты.

## 1. `blog-build.js` — образец генератора

- `blog-build.js` — CommonJS, только stdlib (`fs`, `path`, `vm`), `const ROOT = __dirname` (:21–24).
- Константы: `SITE = 'https://cassindex.ru'` (:26), `BLOG_URL` (:27), `SITE_NAME` (:28), `BLOG_NAME` (:29), `STATIC_CSP` (:30–31).
- `require('./article-build.js')` → `parseArticleMarkdown` (:19); Markdown-парсер живёт там, не в blog-build.
- Чтение статей: `loadIssues(root = ROOT)` (:146) — `fs.readdirSync(docs/articles/weekly)`, фильтр `.md`, `sort().reverse()`, для каждого `parseArticleMarkdown(fs.readFileSync(...))` + `loadSnapshot(article.week, root)` (:149–157). Сейчас в `docs/articles/weekly/` один файл: `2026-10-18.md`.
- Чтение снапшота: `loadSnapshot(week, root = ROOT)` (:133) — `data/<week>/week.js` исполняется в `vm.createContext({window:{CI_DATA:{snapshots:{}}}})`, `vm.runInContext`, берётся `window.CI_DATA.snapshots[week]`; нет файла → `throw new Error(...)` (:136).
- Экранирование: `escapeHtml(value)` (:82–89), `escapeXml = escapeHtml` (:91), всё подставляемое идёт через них.
- Утилиты вывода: `formatDate(week)` (:95), `isoDateTime(week)` (:100), `deltaLabel(delta)` (:104), `stateOf(index)` (:111), `slugify(text)` (:116), `articleUrl(week)` (:127).
- Инлайн/блоки: `renderSegments(segs, sources)` (:194), `renderBlocks(blocks, sources)` (:211) → `{html, toc}`; ссылка `r55:<id>` резолвится в `source.url` (:199–204).
- Шаблон страницы разбит на три функции (нет `renderPage`/`layout`):
  - `head({ title, description, canonical, type, published, modified, keywords, region, extra = [] })` (:257–292) — массив строк: `<!doctype html>`, `<html lang="ru">`, `<meta charset="utf-8">`, viewport, `referrer`, meta-CSP, `<title>`, description, canonical, `robots: index,follow,max-image-preview:large`, `author`, OG (`og:type/site_name/locale/title/description/url`), `twitter:card/title/description`, `<link rel="icon" ... href="../icon.svg">`, `<link rel="stylesheet" href="../css/styles.css">`, `<link rel="alternate" ... RSS>` (:286–288).
  - `header({ current = '', home = '../index.html', blog = 'index.html' })` (:294–314) — `<body class="doc-page blog-page">`, `<header class="site-header"><div class="header-inner"><a class="brand">…</a><nav class="site-nav" aria-label="Основная навигация">`.
  - `footer()` (:316–336) — `<footer class="site-footer">`, `<p class="disclaimer">…`, `<nav class="footer-nav" aria-label="Сервисные ссылки">`, закрывает `</body></html>`.
- `jsonLdScript(data)` (:338–341): `JSON.stringify(data).replace(/</g, '\\u003c')`.
- Страницы: `renderArticlePage(issue, prev, next)` (:421–517), `renderIndexPage(issues)` (:536–598), `renderFeed(issues)` (:602–633), `renderSitemap(issues, root = ROOT)` (:644–668), `renderLlms(issues)` (:670–698).
- Сборка: `buildOutputs(root = ROOT)` (:702–715) → `{issues, outputs: Map<относительный путь, строка>}`; ключи `blog/index.html`, `blog/<week>.html`, `blog/feed.xml`, `sitemap.xml`, `llms.txt` (:705–713).
- CLI/запись: `main()` (:717–746) — `--write` из `process.argv` (:719), сравнение с диском `onDisk === content ? 'без изменений' : 'обновить'` (:724–725), запись `fs.mkdirSync(path.dirname(file), {recursive:true})` + `fs.writeFileSync(file, content)` (:727–730). При `--write` удаляет `.html` в `blog/`, которых нет среди выпусков (:733–743).
- Экспорт: `module.exports = { SITE, BLOG_URL, BLOG_NAME, REGION_NAMES, STATIC_CSP, escapeHtml, formatDate, deltaLabel, stateOf, slugify, articleUrl, articleRefs, loadSnapshot, loadIssues, renderSegments, renderBlocks, renderArticlePage, renderIndexPage, renderFeed, renderSitemap, renderLlms, buildOutputs, staticRootPages }` (:752–776).
- `staticRootPages(root = ROOT)` (:635–642): все корневые `*.html` минус `index.html`, `articles.html`, `cassandra-index-prototype.html`; `renderSitemap` строит `urls = ['https://cassindex.ru/', ...staticRootPages().map(p => SITE+'/'+p)]` + `/blog/` + выпуски (:645–648).
- `renderLlms(issues)` (:670) — список «Основные страницы» захардкожен (:677–684): Главная, Как читать, Блог, История изменений, Дайджест, Валидация.
- `renderFeed`, `renderSitemap`, `renderLlms` — чистые функции от `issues`, диска и сети не читают (кроме `staticRootPages` — `readdirSync`).

## 2. Статическая страница без JS — `how-to-read.html`

- Head (:1–21): `<!doctype html>`, `<html lang="ru">`, charset, viewport, `<meta name="referrer" content="strict-origin-when-cross-origin">`, комментарий про meta-CSP (:7–8), `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'self'; object-src 'none'">` (:9), `<title>`, `<meta name="description">`, `<link rel="canonical" href="https://cassindex.ru/how-to-read.html">` (:12), OG 5 тегов (:13–18), `<link rel="icon" type="image/svg+xml" href="icon.svg">`, `<link rel="stylesheet" href="css/styles.css">` (:19–20).
- `<body class="doc-page">` (:22) — класс обязателен: стили справочных страниц висят на `.doc-page` (`css/styles.css:2791`).
- Header (:24–35): `<header class="site-header"><div class="header-inner"><a class="brand" href="index.html">Cassandra Index</a><nav class="site-nav" aria-label="Навигация страницы">` + 5 ссылок (index, blog/, compare.html, digest.html, validation.html).
- Main: `<main id="main">` (:37), `<h1>` (:38), `<p class="doc-lede">` (:39), далее `<section aria-labelledby="…-title">` + `<h2 id="…-title">` (8 секций).
- Ключевые цифры: `.doc-keyfigures` → `.doc-figure` → `.doc-figure-label` / `.doc-figure-value` (+ модификатор `.doc-figure-value--state`) / `.doc-figure-note` (:43–59).
- Перечисления — обычные `<ul>/<ol>`, ссылки — обычные `<a>`; `.doc-links` для списка ссылок (:117).
- Footer (:126–135): `<footer class="site-footer"><p class="disclaimer">…</p><nav class="footer-nav" aria-label="Сервисные ссылки">` + 5 ссылок.
- Таблиц на `how-to-read.html` нет. Таблица есть на `compare.html` (проверяется `tests/seo-pages.test.js:179`), разметка — `<table>` (класс не пинится). На главной таблица методологии — `.method-table` (`css/styles.css:1698`), в блоге — `<div class="article-table-wrap"><table>` (`blog-build.js:236`).
- Скролл-обёртки/`<caption>` в реальных страницах: `.article-table-wrap` (`css/styles.css:2172–2175`, `overflow-x:auto`) — единственный контейнер со скроллом; `<caption>` не используется нигде (есть только `.index-caption` :205 и `.trend-caption` :1252, это легенда тренда, не caption таблицы).

## 3. `css/styles.css` — токены и готовые классы

- Токены (`:root`, :3–36): `--bg #0A0E12`, `--surface #121820`, `--surface-2 #1A2028`, `--border #232B36`, `--border-soft #1A2028`; `--text #E6EDF3`, `--text-secondary #8B949E`, `--text-muted #6B7280`, `--text-on-accent #0A0E12`; `--accent #58A6FF`, `--accent-soft`, `--accent-line`; `--state-calm #3FB950`, `--state-tense #A8B06B`, `--state-danger #D29922`, `--state-very #D17F52`, `--state-critical #F85149`, `--state-extreme #A83A3A`; `--overlay-header`, `--overlay-backdrop`, `--focus #58A6FF`.
- Шрифты — не токены: `body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, ... }` (:52). Моноширинный — только точечно (`.trend-axis-label`, `mono 11px` по AGENTS).
- Базовое: `a` — `--accent` (:66), `a:hover { text-decoration: underline }` (:71), `:focus-visible { outline: 2px solid var(--focus) }` (:76), `button, a, .link-btn { min-height:44px; min-width:44px }` (:83–88), `[hidden] { display:none !important }` (:91).
- Контейнеры: `main { max-width:1120px; padding:24px 20px 64px }` (:148–152); `.doc-page main { max-width:820px; ... }` (:2791–2795); `.header-inner` 1120px (:106); `.site-footer` 1120px (:799).
- Заголовки/текст справочной страницы: `.doc-page h1` (:2797), `h2` (:2802, :2833), `h3` (:2807), `p, li` (:2812), `strong` (:2829); `.doc-lede` (:2837), `.doc-meta` (:2844), `.doc-note` (:2891), `.doc-source` (:2929), `.doc-links` (:2941).
- Карточки: `.doc-figure` (:2856) + `.doc-keyfigures` (grid, :2849); `.driver-card` (:534), `.region-card` (:247), `.review-card` (:1625), `.unavailable-card` (:990), `.quality-modal-card` (:877), `.method-criteria-group` (:1726), `.picker` (:380).
- Таблицы: `.doc-table` (:2903, `table-layout: fixed`, без скролла), `.method-table` (:1698, `max-width:720px`), `.article-body table` (:2018), `.article-table-wrap` (:2172, `overflow-x:auto`), `.contribution-table` (:2674, на ≤мобильном перестраивается в карточки :2752–2783).
- Бейджи/чипы: `.chip` (:395, `border-radius:999px`), `.data-state-badge` (:815) + модификаторы `--published/--updating/--delayed/--insufficient/--unavailable` (:825–829), `.quality-badge` (:837), `.method-criteria-count` (:1752).
- Детали/аккордеон: `.method-criteria-group` (:1726) — это `<details>` (`js/sections/methodology.js:96` `el('details','method-criteria-group')`), summary — `.method-criteria-summary` (:1733, `min-height:44px`), тело — `.method-criteria-list` (:1759). Второй пример: `.contribution-breakdown` + `.contribution-summary-toggle` (`js/sections/contribution.js:180`, стили :2638–2663). Общего стиля `details`/`summary` нет.
- Легенда: `.trend-caption` / `.trend-caption-item` / `.trend-caption-label` (:1252–1272). Отдельного класса «легенда» нет.
- Кнопки/ссылки-кнопки: `.cta-btn` (:356), `.link-btn` (:85, :286), `.privacy-back` (:2278), `.src-toggle` (:604).
- Раскладка `.privacy-page`: `.privacy-top` (:2267), `.privacy-page main/h1/h2/p/li/ul` (:2283–2306) — второй готовый каркас статической страницы (`changelog.html` использует его).

## 4. `.github/workflows/deploy.yml` — выкат

- Шаг `Stage site files` (:32–45), `run: |` (:33). Дословно (:37–41):
  ```
  cp index.html privacy.html about.html how-to-read.html changelog.html digest.html \
     articles.html compare.html compare-war-monitor.html compare-acled.html \
     compare-crisiswatch.html validation.html icon.svg robots.txt sitemap.xml llms.txt _site/
  cp -r css js data _site/
  cp -r blog _site/
  ```
- Далее: `rm -f _site/data/audit.jsonl` (:44), `echo cassindex.ru > _site/CNAME` (:45).
- `indices-audit.html` в списке нет — без строки в этом `cp` страница не публикуется.

## 5. `tests/site-pages.test.js` — пин выката

- Читает все корневые `*.html` (:14–17), исключение одно: `const NOT_PUBLISHED = new Set(['cassandra-index-prototype.html'])` (:12).
- Парсер YAML: `stageCommands(yml)` (:24–44) — режет текст между `'Stage site files'` и `'Upload Pages artifact'`, склеивает строки с `\`; `stagedRootFiles(commands)` (:46–56) — берёт только `cp … _site/`, отбрасывает флаги, последний токен = цель.
- Тест 1 (:61–67): `stagedHtml` (все `.html` из cp) `deepEqual` списку корневых `*.html` → **новая страница обязана быть и на диске, и в cp**.
- Тест 2 (:69–77): в cp есть `robots.txt` и `sitemap.xml`; есть `cp -r css js data _site/`; есть `rm -f _site/data/audit.jsonl`; есть `echo cassindex.ru > _site/CNAME`.
- Тест 3 (:79–84): каждый `uses:` закреплён `@[0-9a-f]{40}`.
- `sitemapPaths(xml)` (:90–92) — regex `<loc>(...)</loc>`.
- Тест 4 (:94–120): sitemap — `<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, все URL абсолютные; `expected = [...pages минус 'articles.html' → SITE/<page> (index.html → SITE/), SITE/blog/, ...blogPages]` и `deepEqual` с уникальными `<loc>` + проверка отсутствия дублей. **Новая корневая страница обязана попасть в `sitemap.xml` на диске.**
- Тест 5 (:122–130): каждая запись `<url>` — ровно один `<loc>`, парность тегов.
- Тест 6 (:132–141): `robots.txt` содержит `User-agent: *`, `Allow: /`, `Sitemap: https://cassindex.ru/sitemap.xml`.
- Тест 7 (:145–151): каждая страница (кроме `index.html`) содержит `href="index.html"` или `href="./index.html"`.
- Тест 8 (:154–166): `data/public/index.json`, `changelog.json`, `digest/index.json` существуют и не удаляются из артефакта.
- Тест 9 (:168–182): `weekly-digest.yml` — `actions: write`, `gh workflow run deploy.yml` после `sent.json`, `GH_TOKEN`.
- Тест 10 (:184–189): `robots.txt`, `sitemap.xml`, `tests/site-pages.test.js` без `\r` (CRLF запрещён, `.gitattributes: * text=auto eol=lf`).

## 6. Пины «страница ↔ генератор»

- `tests/contribution-ui.test.js` — **HTML-страницу с генератором не сравнивает**. Читает `index.html` и `css/styles.css` в константы (:27–28), проверяет подстроками: `INDEX_HTML.includes('data-section="contribution"')`, `data-i18n="contribution.title"`, `src="data/analysis.js"`, `indexOf` до `js/bundle.js`, `CSS.includes('.contribution-section')`, `.contribution-section[hidden]` (:145–154). Паритет байтами — только для `data/analysis.js`: `assert.equal(source, analysisBundle(dataset))` (:174–180), плюс исполнение в `vm` (:182–185).
- `tests/public-contract.test.js` — про `data/public/**/*.json`, HTML не трогает. Хелперы: `publicJsonFiles(dir, prefix)` (:291–303), `schemaNameFor(rel)` (:306–313), `docPathFor(rel)` (:316–320), `apiMentionsPath(api, url)` (:326–339). Тесты: схемы на каждый JSON (:375–387), «сторож» — каждый публичный JSON упомянут в `docs/api.md` и имеет схему (:389–397), одиннадцать схем (:399), пин `MAX_DISCREPANCIES` (:363–373), негативный контроль `apiMentionsPath` (:341–361).
- Реальные образцы байтового паритета **HTML ↔ генератор**:
  - `tests/validation-parity.test.js` — `rebuilt()` (:27–39) собирает `buildValidation`/`buildLedger`/`renderValidationPage`, сравнивает `read('data/public/validation.json')`, `read('data/public/forecast-ledger.json')`, `read(VALIDATION_PAGE_FILE)` (:41–50).
  - `tests/public-export.test.js:428–431` — `assert.equal(readFileSync('changelog.html'), renderChangelogPage(sortedDesc(CHANGELOG)))`.
  - `tests/digest.test.js:335–339` — `assert.equal(readFileSync('digest.html'), renderDigestPage(issues))`; вход — JSON с диска, отсортированный (:332–334).
  - `tests/blog.test.js` — `builder.buildOutputs(ROOT)` (:18), затем цикл по `outputs` с `assert.equal(read(rel), content)` (:29–34) + проверка, что в `blog/` нет лишних html (:180–183).

## 7. Общие требования к страницам (чтобы не сломать пины)

- `tests/seo-pages.test.js`:
  - `PAGES = [HOWTO, HUB, ...COMPARISONS, 'validation.html']` (:62) — список **явный**; `changelog.html`/`digest.html`/`blog/**` сюда не входят (у них свои тесты).
  - `STATIC_CSP` (:66–67) — дословная строка, сравнение `assert.equal(csp[1], STATIC_CSP)` (:89–92).
  - Базовый тест (:69–103) на каждую страницу списка: `<!doctype html>\n<html lang="ru">`, `<title>` ≥5 символов, `meta description` ≥20, `<link rel="canonical" href="https://cassindex.ru/<file>">`, `og:type/og:title/og:description/og:url`, `og:url == canonical`, ровно один `<h1>`, `href="index.html"`, meta-CSP == `STATIC_CSP` и без `unsafe-inline`, запрет `/<script/i`, внешних `src=`, внешних `link rel=stylesheet|preload|icon|manifest`, `<img`, `style="`, `application/ld+json`, `\r` (:72–101).
  - Контраст: `.doc-meta` и `.doc-figure-note` обязаны быть `var(--text-secondary)` и ≥4.5:1 на `--bg`/`--surface`; `--text-muted` обязан остаться <4.5:1 (:195–214).
  - `css/styles.css` без `\uFFFD`, без `???`, без `\r`, комментарий «Справочные страницы» обязателен (:216–224).
- `tests/csp.test.js` — `metaCsp(file)` (:13–18) точное сравнение строки CSP; блог/`articles.html` — ровно `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'self'; object-src 'none'`, без `cloudflareinsights`, `formsubmit`, `unsafe-inline` (:43–58, :61–71).
- `tests/privacy.test.js` — пинит только `privacy.html` и `index.html`: дословный дисклеймер из словаря (:13, :20–22), `footer.ip` (:18), отсутствие внешних `src`/`href` кроме `https://creativecommons.org/licenses/by/4.0/` (:49–56), совпадение текста страницы со словарём по 17 ключам (:62–96). Новой страницы не касается, но задаёт стиль пинов.

## 8. Другие готовые генераторы статического HTML

- `calc/public-export.js`:
  - `escapeXml(s)` (:245–252) и `escapeHtml = escapeXml` (:254–256) — экранируют `& < > " '`.
  - `renderChangelogPage(entries)` (:354–392) — собирает полный документ массивом строк: `<!doctype html>`, `<html lang="ru">`, head (CSP :364–365, title/description, `icon.svg`, `css/styles.css`), `<body class="privacy-page">` (:372), `<header class="privacy-top"><a class="privacy-back">` (:374–377), `<main>` + `<h1>` + `<p>` + `list.map(changelogArticle)` + `</main>`; **без header/footer сайта**; canonical/OG нет.
  - `changelogArticle(entry)` (:336–350) — `<article class="changelog-entry">`, `escapeHtml` на title/date/version/kind/body/link.
  - `toTrendSvg(snapshot)` (:268–334) — SVG строками, `escapeXml`, стили инлайном через `style="fill:var(--…)"` (в SVG-файле, не в HTML-странице).
  - Запись: `writePublicData({rootDir, weeks, loadSnapshot, entries, analyzeWeek})` (:438+), комментарий «собирает всё в память и только потом пишет» (:433–435).
- `calc/digest-page.js`:
  - `import { escapeHtml } from './digest.js'` (:7); `escapeHtml` объявлен в `calc/digest.js:51–57` (та же пятёрка замен).
  - `renderDigestPage(issues)` (:55–139) — фильтр по `DATE_RE = /^\d{4}-\d{2}-\d{2}$/` (:13, :57), сортировка по убыванию недели, `latestArticle` (:26–41) и `archiveList` (:43–51); полный head с canonical и OG (:64–88), `<body class="doc-page">`, `site-header`/`site-footer` как у справочных страниц (:91–134).
  - Экспорт: `DIGEST_ARCHIVE_LINKS = 12` (:9), `DIGEST_INDEX_PATH` (:10).
- `calc/validation-page.js` — самый близкий аналог «аудиторской» страницы:
  - `import { escapeHtml } from './digest.js'` (:8), `VALIDATION_PAGE_FILE = 'validation.html'` (:10), локальный `STATIC_CSP` (:19–20), `TITLE`/`DESCRIPTION` (:22–24), `COMPARATOR_IDS` (:28), словари подписей (:37–49).
  - `renderValidationPage(validation, ledger)` (:543–640): head (:555–575) с canonical `${SITE}/${VALIDATION_PAGE_FILE}` и OG, `<body class="doc-page">`, сайтовый header (:578–590), `<main id="main">` + `<h1>` + `.doc-lede` + `.doc-meta`, секции `summarySection`, `comparatorsOverview`, `comparatorSection`, `limitsSection`, `ledgerSection`, `methodSection`, `sourcesSection` (:601–618), footer (:621–634).
  - Запись: `calc/backtest.js` — `writeValidation({rootDir, weeks, loadSnapshot, fixturesDir})` (:565), `writeFileSync` JSON (:570) и `path.join(root, VALIDATION_PAGE_FILE)` + `renderValidationPage(...)` (:572–573).
- Общая схема всех трёх: чистые функции → массив строк → `.join('\n')`, финальный `''` даёт завершающий `\n`; ни одной зависимости; никакого шаблонизатора.

## 9. Как проверяют innerHTML и запрещённую лексику

- Запрет `innerHTML` — чтение **исходника модуля** с диска + `assert.ok(!src.includes('innerHTML'))`:
  - `tests/feedback.test.js:166–168` — `test('js/sections/feedback.js: нет innerHTML (конвенция DOM-сборки)')`.
  - `tests/precursor-ui.test.js:189–191` — `test('js/sections/precursor.js: DOM без innerHTML, подпись получает {total}')`.
  - На HTML-страницы это не распространяется (страницы статические, скриптов нет).
- Запрещённая лексика — `tests/lexicon.test.js`:
  - `FORBIDDEN` (:16–41): `вероятн`, `шанс`, `процент риска`, `обратн… отсч`, `на пороге`, `на грани`, `осталос`, `до войны`, `шаг к` + EN-эквиваленты + метафоры часов (`стрелк… часов`, `часы бьют|сбились|показывают`, `tick-tock`, `N минут до войны/полночи`).
  - `lexiconHits(text)` (:44–47) — чистый шов, возвращает метки.
  - `HTML_PAGES = ['how-to-read.html','compare.html','compare-war-monitor.html','compare-acled.html','compare-crisiswatch.html','validation.html']` (:181–188) — **явный список**; новая страница сюда не попадёт сама.
  - `htmlToText(html)` (:190–198): вырезает `<script>`, `<style>`, комментарии, теги, `&xxx;`, сжимает пробелы; затем `lexiconHits` (:200–206).
- Прочие «читают HTML с диска и ищут подстроки»: `tests/site-pages.test.js` (cp/sitemap/index-ссылка), `tests/seo-pages.test.js` (заголовки разделов, href, дата), `tests/page-structure.test.js` (index.html и articles.html), `tests/blog.test.js` (выходы генератора против диска).

## 10. Конвенции, обязательные для новой страницы

- `<html lang="ru">` и `<!doctype html>` — первая строка, `\n`-разделитель (`tests/seo-pages.test.js:72`).
- Meta-CSP **дословно**: `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'self'; object-src 'none'` — строка продублирована в `blog-build.js:30–31`, `calc/digest-page.js:72–74`, `calc/validation-page.js:19–20`, `tests/seo-pages.test.js:66–67`. Для статических страниц `script`/`img`/inline-style/JSON-LD запрещены (`tests/seo-pages.test.js:95–100`, ADR 0052).
- Текст живёт в разметке, не в словаре: ADR 0052 (`docs/adr/0052-static-seo-pages-inline-text.md:6–10`) — осознанное исключение из правила i18n; без бандла и рантайма.
- Метаданные: `<title>`, `meta description` ≥20 символов, `link rel=canonical` на `https://cassindex.ru/<file>`, OG (`og:type`, `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`), `robots: index,follow,max-image-preview:large` (у blog-build :270).
- Ровно один `<h1>`; путь назад — `href="index.html"` (`tests/site-pages.test.js:145–151`, `tests/seo-pages.test.js:86–87`).
- `robots.txt` — статический, per-page правил нет; требования: `User-agent: *`, `Allow: /`, `Sitemap: https://cassindex.ru/sitemap.xml` (`tests/site-pages.test.js:132–141`).
- `sitemap.xml` — **генерируется** `blog-build.js` (`renderSitemap` :644, `staticRootPages` :635). Новая корневая `*.html` попадёт туда автоматически после `node blog-build.js --write`; руками не править (`AGENTS.md`, «Подводные камни»). Пин `tests/site-pages.test.js:112–118` требует совпадения карты со списком корневых страниц.
- `llms.txt` — тоже генерируется (`renderLlms` :670); список «Основные страницы» захардкожен (:677–684), новая страница сама не появится — правка только через генератор.
- `deploy.yml` cp-список — единственный whitelist публикации; `tests/site-pages.test.js:61–67` сверяет его с диском в обе стороны.
- Производные файлы пишутся только CLI и проверяются байтами (`AGENTS.md`; модели — `tests/validation-parity.test.js`, `tests/blog.test.js:29`, `tests/public-export.test.js:428`, `tests/digest.test.js:335`).
- Автопересборка: `.github/workflows/weekly-calc.yml:90–96` — `public-export.js --write`, `backtest.js --write`, `digest-export.js --write`, `blog-build.js --write`; новый генератор нужно добавить в этот шаг, иначе он разъедется с диском (а `git add -A` :124 заберёт что попало).
- Стиль/доступность: только токены `css/styles.css`, `:focus-visible` 2px, touch ≥44px, reflow 320px, `[hidden]` для скрытия, значения не только цветом.
- CRLF запрещён (`.gitattributes`: `* text=auto eol=lf`; пины `tests/site-pages.test.js:184–189`, `tests/seo-pages.test.js:101`).
- Лексика: без слов из `FORBIDDEN` (`tests/lexicon.test.js:16–41`) — включая «на пороге/на грани», «вероятность», «осталось».

## Смежное: уже существующая заявка на страницу

- `docs/articles/indices-audit-annex-spec.md` (рабочее дерево, не закоммичен) — спецификация той же страницы: 12 карточек, матрица 12×10, развёртка 120 ячеек, взвешенная шкала, таблица 14 стран, «что не удалось проверить», CC BY 4.0 (:7–15); требование «не писать HTML руками, генератор по образцу `blog-build.js`» (:23); `deploy.yml` + пин (:24–25); «`document.createElement` + `textContent`, никакого innerHTML» (:26).
- Расхождения этой заявки с фактическим кодом: (а) `tests/contribution-ui.test.js` и `tests/public-contract.test.js` **не** проверяют паритет HTML-страницы с генератором (§6 выше; образцы — `tests/validation-parity.test.js`, `tests/blog.test.js`, `tests/digest.test.js`); (б) `document.createElement`/`textContent` — конвенция **DOM-модулей сайта** (`tests/feedback.test.js:166`, `tests/precursor-ui.test.js:189`), а статическая страница по ADR 0052 строится строками HTML в генераторе и скриптов не несёт; (в) «скроллируемый контейнер с подписью» — в CSS есть только `.article-table-wrap` (`overflow-x:auto`, :2172), стилей для `<caption>` нет.

## Грабли

1. **Страница на диске, но не в `cp`** — `tests/site-pages.test.js:61` падает (сверка в обе стороны); локально страница открывается, наружу не уходит.
2. **Страница в `cp`, но `sitemap.xml` не перегенерирован** — падает `tests/site-pages.test.js:112` (карта обязана совпадать с корневыми `*.html` минус `articles.html`). Карта производная: руками не править, гонять `node blog-build.js --write`.
3. **Генератор пишет страницу, а `weekly-calc.yml` его не вызывает** — после автопересчёта недели файл на диске устаревает, байтовый пин краснеет; шаг правок — `.github/workflows/weekly-calc.yml:90–96`.
4. **`<body>` без `class="doc-page"`** — вся секция `.doc-page *` (`css/styles.css:2791–2947`) не применяется: страница получит `main` 1120px, другие отступы и цвета; при этом тесты этого не заметят.
5. **`STATIC_CSP` переписан «по памяти»** (лишний пробел, другой порядок, `'unsafe-inline'`) — точное сравнение `tests/seo-pages.test.js:91` и `tests/csp.test.js`; кроме того `unsafe-inline`/скрипт/`<img>`/`style=`/JSON-LD прямо запрещены (:95–100).
6. **Добавить `<script>`/JSON-LD «для сортировки таблицы»** — нарушает CSP и ADR 0052; страница должна быть полностью статической.
7. **Широкая таблица в `.doc-table`** — `table-layout: fixed` и `main` 820px (`:2903`, `:2791`), длинные id критериев/URL вылезут; горизонтального скролла у `.doc-table` нет, обёртка есть только у `.article-table-wrap` (`:2172`).
8. **`<caption>` как единственная подпись таблицы** — стилей нет (в CSS только `.index-caption`/`.trend-caption`, это другое); и `caption` не попадёт в контрастные пины, зато попадёт в `htmlToText` лексического теста.
9. **Текст с «вероятность»/«на грани»/«осталось»** — упадёт `tests/lexicon.test.js`, если страницу добавить в `HTML_PAGES` (:181); без добавления — пройдёт незамеченным (список явный).
10. **Полагаться на `tests/seo-pages.test.js`** — он проверяет только свой `PAGES` (:62); новая generated-страница не покрыта ни базовыми SEO-требованиями, ни запретом скриптов, пока не добавлена туда или в отдельный пин.
11. **Забыть `href="index.html"`** — падает `tests/site-pages.test.js:145` (для каждой корневой страницы, кроме самой главной).
12. **Ручная правка `sitemap.xml`, `llms.txt` или сгенерированного HTML** — расхождение с генератором; в проекте это ловится байтовым пином (образцы: `tests/validation-parity.test.js:49`, `tests/blog.test.js:29`).
13. **CRLF** (сохранение файла в Windows-редакторе без `.gitattributes`-нормализации) — падает пин LF (`tests/site-pages.test.js:184`) и `tests/seo-pages.test.js:101`.
14. **Числа в тексте страницы «на глаз»** — `how-to-read.html` пинится против снапшота (`tests/seo-pages.test.js:119–134`); для аудиторской страницы источником обязаны быть `data/public/*.json`/`week.js`, иначе байтовый паритет с генератором недостижим.
