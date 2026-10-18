# notes.md — устройство кода для публичной валидации, бэктеста и журнала прогнозов

Снято с кода 2026-10-18 (после сборки `license-and-citation` и правок 0160ba2…).

## A. Публичный слой и генераторы страниц

### A1. `calc/public-export.js` (ESM)

Экспорты: `PUBLIC_SCHEMA_VERSION = 1`, `datasetOf(snapshot, week)`,
`buildDataset(weeks, loadSnapshot)`, `toCsv(dataset)`, `toTrendSvg(snapshot)`,
`renderChangelogPage(entries)`, `writePublicData({rootDir, weeks, loadSnapshot, entries})`,
`loadSnapshotFromDisk(week, rootDir = ROOT)`.

Внутренние: `coverageOf`, `precursorOf`, `trendPoint`, `csvValue`, `csvRow`, `escapeXml`,
`escapeHtml`, `changelogArticle`, `changelogFile`, `jsonText`, `readWeekParts`,
`executeCombined`, `parseArgs`, `main`.

```js
const PUBLIC_SCHEMA = 'cassandra-index-public';
const CHANGELOG_SCHEMA = 'cassandra-index-changelog';
const SITE = 'https://cassindex.ru';
const LICENSE = { name: 'CC BY 4.0', url: '…/legalcode',
  attribution: 'Cassandra Index — https://cassindex.ru, лицензия CC BY 4.0',
  note: '…', placeholder: false };
```

`index.json` = `{schema, schema_version, site, license, weeks: [datasetOf(...)]}`.
`latest.json` = `{schema, schema_version, site, license, week}`.
`changelog.json` = `{schema:'cassandra-index-changelog', schema_version:1, entries}`.

Поля недели в `datasetOf` (snake_case): `week`, `published`, `through`, `methodology`,
`regions_taxonomy`, `data_state`, `index`, `delta`, `state` (`stateOf`), `q`, `confidence`,
`coverage_criteria`, `regions[{id,index,delta,background}]`, `precursor`,
`precursor_present`, `drivers[{label:{ru,en}, contribution}]`,
`sources{count, clusters, state_affiliated}`, `trend[{date,value,methodology?}]`.

CSV-шапка:
`schema,schema_version,week,published,through,methodology,regions_taxonomy,data_state,scope,index,delta,state,q,confidence,coverage_covered,coverage_total,background`.
`csvValue` **бросает** при запятой/переводе строки.

`writePublicData` собирает всё в память, затем пишет 6 файлов:
`data/public/index.json`, `latest.json`, `cassandra-index.csv`, `trend.svg`,
`changelog.json`, `changelog.html`. Возвращает `{files}`.

`loadSnapshotFromDisk` — единственный способ получить снапшот с диска без DOM: части через
`loadWeekParts` / `readWeekParts` → `renderWeekCombined` → `vm` (`window.CI_DATA.snapshots`) →
`validate` из `js/data.js`.

CLI: ручной `parseArgs`, `--write`, `--root <dir>`; без `--write` только печать; ошибки в
`stderr` и `process.exitCode = 1`; запуск по `invokedDirectly`.

### A2. `calc/digest-export.js` + `calc/digest-page.js` — образец генерируемой страницы

`digest-export.js`: `DIGEST_INDEX_SCHEMA`, `DIGEST_DIR='data/public/digest'`, `digestFile`,
`digestIndexFile`, `readIssues(dir)`, `writeDigestData({...})`; merge с диском по `week`,
новые перезаписывают, архив сортируется по убыванию.

`digest-page.js`: `DIGEST_ARCHIVE_LINKS = 12`, `DIGEST_INDEX_PATH`, `renderDigestPage(issues)`
→ полный HTML; `escapeHtml` импортируется из `calc/digest.js`.

Структура страницы (копировать):

```
<!doctype html>
<html lang="ru">
<head>
  meta charset, viewport, referrer
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self';
        style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'self'; object-src 'none'">
  <title>… — Cassandra Index</title>
  <meta name="description" …>
  <link rel="canonical" href="https://cassindex.ru/<файл>">
  og:type/site_name/title/description/url/locale
  <link rel="icon" type="image/svg+xml" href="icon.svg">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body class="doc-page">
  <header class="site-header"><div class="header-inner">
    <a class="brand" href="index.html">Cassandra Index</a>
    <nav class="site-nav" aria-label="Навигация страницы">…</nav>
  </div></header>
  <main id="main"> … </main>
  <footer class="site-footer">
    <p class="disclaimer">…</p>
    <nav class="footer-nav" aria-label="Сервисные ссылки">…</nav>
  </footer>
</body>
</html>
```

Значения — только через `escapeHtml`; ни скриптов, ни внешних ресурсов, ни JSON-LD.
Текст зашит в генератор (i18n-рантайм статические страницы не используют).

### A3. `blog-build.js` (CommonJS) — `sitemap.xml`, `llms.txt`

`module.exports = { SITE, BLOG_URL, …, escapeHtml, …, renderSitemap, renderLlms,
buildOutputs, staticRootPages }`;
`STATIC_CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';
font-src 'self'; base-uri 'self'; object-src 'none'"`.

`staticRootPages(root)` — все корневые `*.html`, кроме `index.html`, `articles.html`,
`cassandra-index-prototype.html`. `renderSitemap` строит `<loc>` из `/`, этих страниц,
`/blog/` и всех выпусков → `validation.html` попадёт в карту автоматически после
`node blog-build.js --write`.

`renderLlms(issues)` — **ручной** список разделов (`## Основные страницы`, `## Разборы недели`,
`## Данные`, `## Цитирование`): ссылку на `validation.html` добавлять руками.

### A4. `calc/changelog-entries.js`

`KINDS = ['methodology','taxonomy','schema','field','fix','product']`, `CHANGELOG`,
`validateChangelog(list) → string[]`, `sortedDesc(list)`. Запись:
`{date:'YYYY-MM-DD', version, kind, title, body, link?}`.

## B. Данные снапшотов

### B1. `js/data.js`

`DATA_STATES = ['published','updating','delayed','insufficient','unavailable']`;
`REGION_TAXONOMIES` (`'1.0'`: 6 id; `'2.0'`: 12 id); `regionIdsFor(taxonomy='1.0')`;
`CURRENT_TAXONOMY='2.0'`; `TAXONOMY_V2_FROM='2026-10-18'`; `REGION_IDS` (v2);
`PRECURSOR_SUBGROUPS = 8`; `latest()`, `listWeeks()`, `week(date?)`;
`validate(snapshot)`, `validateQuality(snapshot, errors)`.

`validate`: `published`/`through` — `YYYY-MM-DD`; `methodology` — непустая строка;
`dataState` из списка; `global: null` только при `insufficient|unavailable`; иначе
`{index:0..100, delta:number}`; `regions` — ровно набор `regions_taxonomy ?? '1.0'`,
записи `{index, delta, background?}`; `trend` — ровно 12 точек; `drivers` — ровно 3
(`{observation, why, contribution, confidence, confidenceNote?, sources:2..5}`);
`sources` — `isSource`.

`validateQuality` (всё опционально): `q`, `nullWeight`, `confidence`,
`coverage{coveredDrivers,totalDrivers}`, `coverageCriteria{covered,total,uncovered?}`,
`preview`, `recalc`, `incompleteCoverage`, `sensitivity`, `precursor`, `article`.

`week(date?)` читает `window.CI_DATA.snapshots[key]`; битый → синтетический `unavailable`.

### B2. `data/latest.js`

`window.CI_WEEKS`, `window.CI_LATEST`, `window.CI_DATA = {snapshots, latest}`; грузит
ТОЛЬКО `data/<week>/week.js` через `document.write` (12 штук).

### B3. `js/risk.js`

```js
export const SCALE = [
  { max: 20, id: 'calm' }, { max: 40, id: 'tense' }, { max: 60, id: 'danger' },
  { max: 80, id: 'very' }, { max: 96, id: 'critical' }, { max: 100, id: 'extreme' },
];
export function status(index)   // null вне 0..100
export function tone(statusId)  // '--state-calm' … '--state-extreme'
export function deltaTone(change)
```

Фактические индексы цепочки: 51, 42, 43, 56, 47, 46, 56, 64 → **все `danger`**.

### B4. `calc/week-step.js`

`taxonomyForWeek(week)` → `'2.0'` от `PARAMS.taxonomyV2From` (`2026-10-18`), иначе `'1.0'`;
`loadSnapshotPart(week, file)` — чтение части через `vm`; `computeWeek`, `nextChainState`,
`classifyPublication`.

## C. Форвардные якоря и калибровка

### C1. `calc/forward-anchors.js`

`CLUSTERS = ['calm','tense','danger','very','critical','extreme','unknown']`;
`validateForwardAnchor(obj) → string[]` (пусто = валиден). Поля: `week` (строгий
`YYYY-MM-DD`), `expectedCluster` из `CLUSTERS`, `rationale` (непустая), `author`
(непустая), `committedAt` (`Date.parse` ≠ NaN), `sources` — массив `{url}` (пустой можно).

### C2. `calc/calibrate.js` — `loadAnchors(dir)`

```js
readdirSync(dir).filter(f => f.endsWith('.json')).sort().map(file => {
  const input = JSON.parse(readFileSync(path.join(dir, file), 'utf8'));
  return { file, meta: input.anchor, input };
}).filter(a => a.meta && typeof a.meta === 'object' && !Array.isArray(a.meta));
```

Файлы без `input.anchor` пропускаются — так `forward-*.json` не ломают грид k.
`validateForwardAnchor` здесь не вызывается.

### C3. `calc/input/anchors/` — реальные файлы

`able-archer-1983.json`, `crimea-2014.json`, `cuban-1962.json`, `feb2022.json`,
`georgia-2008.json`, `iraq-2003.json`, `kargil-1999.json`, `proxy-sanctions-2018.json`,
`routine-2010s.json`, `yom-kippur-1973.json`. Форвардных `forward-*.json` **нет**.

схема модельного якоря: `{week, params, note?, anchor:{id,title,type,target:[lo,hi],
rollingOrigin:'select'|'verify'}, criteria:{…}}`.

### C4. `docs/calibration-journal.md`

Разделы: `# Журнал калибровки …` (Параметры, Метод, Результат, Чувствительность,
Допущения, Что осталось экспертным, Открытые места); `# Перекалибровка k при вводе D4.6`;
`# Прогон 3: калибровка severity-весов`; `# Интервальность шкалы` с подразделами
`## Чего это не доказывает` и `## Форвардный журнал: ожидание до записи, факт после`.
Таблица журнала (пустая):

```md
| week | expectedCluster | observedCluster | match | date |
|---|---|---|---|---|
| — | — | — | — | — |
```

рядом маркер `<!-- forward-anchor-example -->` и пример JSON, который читает
`tests/forward-anchors.test.js`.

## D. Сайт и i18n

### D1. `js/i18n.js`

`DICTS = { ru: {…} }`; `t(lang, key, vars)` (fallback → ключ, плейсхолдеры `{x}`,
`plural`/`select`); `plural(lang, n, forms)`; `axisDate(lang, iso)`; `resolveLang()` живёт
в `js/ui.js` и всегда `'ru'`. Главная берёт тексты через `data-i18n`; статические
сгенерированные страницы i18n не используют.

### D2. Статические страницы

`index.html`: шапка `header.site-header > .header-inner > a.brand + nav.site-nav`,
пункты `#overview`, `#regions`, `#trend`, `#methodology`, `blog/`, `how-to-read.html`.
Футер `.site-footer > .footer-nav`: `blog/`, `how-to-read.html`, `compare.html`,
`digest.html`, `changelog.html`, `data/public/index.json`, `privacy.html`.

`compare-acled.html` — ближайший образец структуры: `body.doc-page`, шапка с
`aria-label="Навигация страницы"`, `main#main > h1 + p.doc-lede + p.doc-meta +
section[aria-labelledby] > h2 + p/ul + div.doc-source + p.doc-links`, футер
`p.disclaimer + nav.footer-nav`. Никаких скриптов, внешних `src`, `<img>`, инлайновых
`style`, JSON-LD.

### D3. `css/styles.css`

Готовые классы: `.site-header`, `.header-inner`, `.brand`, `.site-nav`, `.site-footer`,
`.footer-nav`, `.doc-page main` (max-width 820px), `.doc-page h1/h2/h3/p/li/strong`,
`.doc-lede`, `.doc-meta`, `.doc-keyfigures`, `.doc-figure`, `.doc-figure-label`,
`.doc-figure-value`, `.doc-figure-value--state`, `.doc-figure-note`, `.doc-note`,
`.doc-table` (`th/td`), `.doc-source`, `.doc-links`, `.cta-btn`.
Секция помечена `/* ---------- Справочные страницы … ---------- */`.

### D4. `build.js`

`BUNDLES = [['js/bundle.js', ['js/app.js','js/share.js']],
['js/bundle-privacy.js', ['js/i18n.js','js/ui.js']]]`; ESM → classic в `window.CI`;
штампует `?v=<sha256[:10]>` в `index.html`/`privacy.html`. `node build.js` обязателен
после правки `js/**`. Статические страницы бандлы не подключают.

## E. Тесты и правила

### E1. Что пинят тесты

- `tests/site-pages.test.js`: `cp`-строка `deploy.yml` ↔ все корневые `*.html`
  (кроме `cassandra-index-prototype.html`); каждая страница, кроме `index.html`,
  содержит `href="index.html"`; состав `<loc>` в `sitemap.xml`; наличие
  `data/public/index.json`, `changelog.json`, `digest/index.json`.
- `tests/seo-pages.test.js`: `PAGES = [how-to-read.html, compare.html,
  compare-war-monitor.html, compare-acled.html, compare-crisiswatch.html]` — новый файл
  добавлять сюда; проверяет doctype/lang, `<title>` ≥5, description ≥20, canonical
  `https://cassindex.ru/<file>`, `og:url === canonical`, ровно один `<h1>`,
  `href="index.html"`, CSP **дословно** равен `STATIC_CSP`, отсутствие `<script`,
  внешних `src`/stylesheet, `<img>`, `style=`, `ld+json`, CRLF.
- `tests/csp.test.js`: дословный CSP `index.html`, `privacy.html`, `blog/*.html`,
  `articles.html`.
- `tests/public-export.test.js`: форма `datasetOf`, границы `state` (20 calm, 21 tense,
  60 danger, 61 very, 80 very, 81 critical, 96 critical, 97 extreme), конверт LICENSE,
  CSV-шапка, `toTrendSvg`, `renderChangelogPage`, 6 файлов и побайтный детерминизм,
  паритет с диском; `latest.js` не грузит `data/public`.
- `tests/licensing.test.js`: обязательные фразы `NOTICE` — `@opengsd/gsd-core`, `MIT`,
  `GeoNames`, `CC BY 4.0`, `https://www.geonames.org/`, `издател`, `цитир`,
  `Cloudflare Web Analytics`, `FormSubmit`, `не покрывается лицензиями проекта`;
  обязательная фраза о лицензиях страниц в `LICENSE`, `LICENSE-DATA`, `LICENSE-DOCS`,
  `README.md`.
- `tests/lexicon.test.js`: `HTML_PAGES` — ручной список; запрещены `вероятн`, `шанс`,
  `процент риска`, `обратный отсчёт`, `на пороге`, `на грани`, `осталось`, `до войны`,
  `шаг к`, метафоры часов.
- `tests/citation.test.js`: `how-to-read.html` — формула цитирования, слово
  «вероятность» запрещено.
- `tests/blog.test.js`: `sitemap.xml` содержит блог и выпуски, не содержит
  `articles.html`; `llms.txt` содержит разделы и ссылки блога.

### E2. `deploy.yml` — белый список

```yaml
cp index.html privacy.html how-to-read.html changelog.html digest.html \
   articles.html compare.html compare-war-monitor.html compare-acled.html \
   compare-crisiswatch.html icon.svg robots.txt sitemap.xml llms.txt _site/
cp -r css js data _site/
cp -r blog _site/
rm -f _site/data/audit.jsonl
echo cassindex.ru > _site/CNAME
```

### E3. `NOTICE` / `LICENSE-DATA`

`NOTICE` — плоский список чужих материалов (источник, лицензия, что взято, где видна
атрибуция), вводная фраза «Ничего из перечисленного ниже не покрывается лицензиями
проекта…». Новые ряды (GPR, ACLED, CrisisWatch) — отдельными пунктами там же.

### E4. Стиль тестов

`import { test } from 'node:test'; import assert from 'node:assert/strict';`
импорты из `../calc/*.js`, `../js/*.js`; `path.resolve(import.meta.dirname, '..')`;
временные каталоги `mkdtempSync(os.tmpdir())` + `t.after(rmSync)`; CLI —
`spawnSync(process.execPath, ['calc/…','--write'], {cwd: ROOT, encoding:'utf8'})`.

### E5. Команды

`node --test` (из корня, без аргументов), `node --test tests/<файл>`,
`node build.js`, `node calc/calc.js --write`, `node calc/public-export.js --write`,
`node calc/digest-export.js --write`, `node blog-build.js --write`, `node calc/calibrate.js`.

## F. Соглашения

### F1. CLI

Ручной `parseArgs(process.argv.slice(2))`; `--write` → boolean, `--root`/`--week` — значения,
неизвестное → `throw`; `const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))`;
без `--write` — только печать; с `--write` — собрать в память, потом `mkdirSync` +
`writeFileSync(..., 'utf8')`, вернуть `{files}`; ошибки —
`process.stderr.write('<имя>: ' + e.message + '\n'); process.exitCode = 1;`;
точка входа — `invokedDirectly`; детерминизм: никаких timestamp внутри файлов, LF.

### F2. Фикстуры

Каталогов `calc/fixtures/` и `tests/fixtures/` в репозитории **нет**. Тесты строят
синтетические снапшоты inline. Офлайн-фикстуры бэктеста — новый каталог
(`calc/backtest-fixtures/`), формат описать; тесты в сеть не ходят.

### F3. Правила

Ноль зависимостей, ESM (CommonJS — `build.js`, `blog-build.js`); DOM только
`createElement` + `textContent`; в генераторах — `escapeHtml`; цвета только токены;
a11y: фокус, контраст ≥4.5:1, `aria-labelledby`; не трогать
`cassandra-index-prototype.html`, `PRD_Casandra_Index.md`, `METHODOLOGY.md`.

## Грабли

1. **Производные файлы.** `data/public/*`, `changelog.html`, `digest.html`, `blog/**`,
   `sitemap.xml`, `llms.txt` генерируются; `validation.json`, `forecast-ledger.json`,
   `validation.html` обязаны генерироваться CLI, а не правиться руками.
2. **`deploy.yml` whitelist.** Новая корневая страница не публикуется без строки в `cp`;
   `tests/site-pages.test.js` сравнивает `cp`-список с корневыми `*.html`.
3. **`sitemap.xml`.** `staticRootPages` подхватывает страницу автоматически, но только
   после `node blog-build.js --write`; `llms.txt` — ручной список.
4. **`tests/seo-pages.test.js`.** Новую страницу надо явно добавить в `PAGES`; CSP обязан
   дословно совпасть со `STATIC_CSP`, canonical/og — с `https://cassindex.ru/validation.html`.
5. **`tests/lexicon.test.js`.** `HTML_PAGES` — ручной список; текст страницы проходит
   сканер запрещённой лексики.
6. **CSP.** Не ослаблять до `unsafe-inline`; брать `STATIC_CSP`.
7. **Бандлы.** Правка `js/**` → `node build.js`; иначе коммиченный бандл старый.
8. **Realm vm.** Снапшоты из `vm` — объекты чужого realm: `Array.from(...)`, не `.map`,
   иначе `deepEqual` ломается.
9. **CSV без кавычек.** `csvValue` бросает при запятой/переводе строки.
10. **Лицензионный конверт.** Публичные JSON несут `license`; чужие ряды — в `NOTICE`.
11. **Форвардные якоря.** `loadAnchors` пропускает файлы без `input.anchor` — не «чинить»
    фильтром по имени; валидировать отдельно `validateForwardAnchor`.
12. **Журнал калибровки.** Таблица форвардных якорей пустая; `observedCluster` задним
    числом не выдумывать.
13. **Пины чисел.** `tests/data.test.js`, `tests/sensitivity.test.js`,
    `tests/page-smoke.test.js` пинят точные выходы недель.
14. **i18n.** Новые ключи только в `DICTS.ru`; отсутствующий ключ возвращается как есть.
15. **Таксономия.** `REGION_TAXONOMIES` (js/data.js), `REGIONS_V1/V2` (js/region.js),
    `REGION_NAMES` (blog-build.js) — паритет пинят тесты.
16. **Сеть.** `calc/backtest.js` работает офлайн; `--write` в сеть не ходит.
17. **Коммит.** Агенты-исполнители не коммитят; коммит/пуш — только оркестратор.
