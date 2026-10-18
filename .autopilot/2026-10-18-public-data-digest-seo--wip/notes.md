# Public data, digest, SEO — что есть в коде сейчас

Срез: 2026-10-18, по коду. Стек: чистый HTML/CSS/JS, ноль зависимостей, Node ≥ 18, ESM (кроме CommonJS `build.js`).

## 1. Сайт

**`index.html`** — единственная страница приложения: `lang="ru"`, meta charset/viewport/referrer (`strict-origin-when-cross-origin`). Meta-CSP (GitHub Pages не даёт заголовки):
`default-src 'self'; script-src 'self' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'self' https://formsubmit.co https://cloudflareinsights.com; form-action 'self' https://formsubmit.co; base-uri 'self'; object-src 'none'`.
В `<head>`: `<title>`, `<meta name="description">`, `<link rel="icon" type="image/svg+xml" href="icon.svg">`, `<link rel="stylesheet" href="css/styles.css">`, временный inline `<style>` (media ≤640px для hero — отсюда `style-src 'unsafe-inline'`).
- Навигация: `<nav class="site-nav" aria-label="Основная навигация" data-i18n-aria="nav.label">` с `#overview`, `#regions`, `#trend`, `#methodology`; в футере `<nav class="footer-nav">` → `privacy.html` и демо-кнопки.
- Секции по порядку: `#overview` (hero), `#precursor` (`hidden`, снимает рендер), `.trust-section`, `[data-role="critical-panel"]`, `#regions`, `#trend`, `#drivers`, `#methodology` (+ `.method-block.method-scale-note` вне хоста секции), `#feedback`. Секции `#sources` нет.
- Скрипты в конце: `data/latest.js`, `data/regions/reference.js`, `js/bundle.js` (`defer`); ES-модули не подключаются — Chrome блокирует их на `file://`.

**`js/app.js`**: `init()` → `buildState()` → `renderApp(state)` → `dispatchEvent(new CustomEvent('ci:ready'))`. `buildState()` → `{lang, region, detected, week, snapshot, dataState, unavailable, errors}`; `week` из `parseWeekParam(location.search)` (`?week=YYYY-MM-DD`), снапшот — `data.week(...)`; `document.title` и `meta[name=description]` перезаписываются из `app.title`/`app.description`. События: `ci:demo`, `ci:regionchange`, `ci:consent`, `ci:weekchange`, `ci:datastate`, `popstate`; автостарт по `DOMContentLoaded`; `resolveLang()` всегда `'ru'`.

**`js/render.js`**: `SECTIONS = ['hero','precursor','trust','regions','trend','drivers','states','history','methodology','feedback']`; `registerSection(name, fn)` возвращает `false` для имени вне `SECTIONS`; `renderSection`, `renderAll`. `applyI18n(root, lang)` обрабатывает `[data-i18n]` (textContent), `[data-i18n-aria]` (aria-label), `[data-i18n-placeholder]`. Порядок `SECTIONS` пинит `tests/precursor-ui.test.js`; `history` без хоста обновляет только `[data-role="footer-next"]`; `states` пишет в `[data-role="critical-panel"]`.

**`js/i18n.js`**: `export const DICTS = { ru: { 'app.title': '…', … } }`, `LANGS = ['ru']`. Ключи плоские с точками, плейсхолдеры `{value}`, ICU `{n, plural, one{} few{} many{} other{}}` и `{g, select, …}`. API: `t(lang, key, vars)`, `plural`, `axisDate`, `date`; неизвестный ключ возвращается как есть, неизвестный язык → `ru`. Новая строка = ключ в `DICTS.ru` + `data-i18n*` в разметке. EN-словаря нет.

**`js/data.js`**: `DATA_STATES = ['published','updating','delayed','insufficient','unavailable']`; `REGION_TAXONOMIES = {'1.0': 6 id, '2.0': 12 id}`; `regionIdsFor(taxonomy = '1.0')`; `CURRENT_TAXONOMY = '2.0'`, `TAXONOMY_V2_FROM = '2026-10-18'`, `REGION_IDS` (псевдоним v2), `PRECURSOR_SUBGROUPS = 8`. Функции: `latest()`, `listWeeks()`, `week(date?)` (валидирует, добавляет `date`; битый снапшот → синтетический `unavailable` + событие `ci:datastate`), `validate(snapshot) → {ok, errors[]}` и внутренняя `validateQuality`.
- Контракт: `published`/`through` (дата), `methodology`, `dataState`, `global {index, delta}` (null только при `insufficient`/`unavailable`), регионы ровно по `regions_taxonomy` (+ `background?: boolean`), `trend` ровно 12 точек (`value:null` только с `methodology`), ровно 3 драйвера (`label`, `observation`, `why`, `contribution`, `confidence`, `sources` 2..5), `sources[]` по `isSource` (легаси `date` или R55: `id`, `publication_date`, `accessed_date`, `source_type`, `cluster_id`, `state_affiliated`, опц. `quotes[{criterion,text}]`).
- Качество: `q`, `nullWeight`, `confidence`, `coverage {coveredDrivers,totalDrivers}`, `coverageCriteria {covered,total,uncovered?}`, `preview`, `recalc`, `incompleteCoverage`, `sensitivity`, `precursor {value, signalingSubgroups}`; неделя `insufficient` обязана нести полный пакет непубликации.

**`css/styles.css`** (2260 строк). Токены `:root`: `--bg #0A0E12`, `--surface #121820`, `--surface-2 #1A2028`, `--border #232B36`, `--border-soft`, `--text #E6EDF3`, `--text-secondary #8B949E`, `--text-muted #6B7280`, `--text-on-accent`, `--accent #58A6FF`, `--accent-soft`, `--accent-line`, `--state-calm|tense|danger|very|critical|extreme`, `--overlay-header`, `--overlay-backdrop`, `--focus #58A6FF`. Страничные классы: `.hero`, `.section`, `.section-body`, `.privacy-top`, `.privacy-back`; `body.privacy-page`. Общего каркаса «документной страницы» нет.

**`privacy.html`** — отдельная статическая страница (`body class="privacy-page"`), свой CSP: `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'`. Скрипты: `js/bundle-privacy.js` + inline-локализация через `window.CI['js/i18n.js']` и `window.CI['js/ui.js']`. Дефолтный текст HTML обязан совпадать со значениями словаря. Внешних ресурсов нет, кроме анкора CC BY 4.0.

## 2. Данные

**`data/latest.js`**: `window.CI_WEEKS = [...]` (12 дат, 2026-08-02 … 2026-10-18), `window.CI_LATEST = "2026-10-18"`, `CI_DATA = {snapshots:{}, latest}`; IIFE печатает `document.write('<script src="data/<w>/week.js"><\/script>')` по одной на неделю. Части снапшота не грузятся.

**`data/<week>/week.js`** — производный IIFE, пишет в `window.CI_DATA.snapshots[week]`: `global {index, delta}`, `published`, `through`, `methodology`, `regions_taxonomy`, `dataState`, `q`, `nullWeight`, `coverage {coveredDrivers,totalDrivers}`, `confidence`, `sensitivity`, `coverageCriteria {covered,total,uncovered[]}`, `recalc {at,reason,previous,methodologyBefore,methodologyAfter,approvedBy}`, `regions {<id>: {index, delta, status, background}}`, `trend[12] {date, value[, methodology]}`, `drivers[3] {label{ru,en}, observation{ru,en}, why{ru,en}, contribution, confidence, sources[2..5]}`, `sources[R55]`. Поля `precursor` на диске нет ни у одной недели (forward-only, ADR 0047).

Пример 2026-10-18 (`data/2026-10-18/week.js`, ~145 КБ): `global {index:64, delta:8}`, `methodology "3.0"`, `regions_taxonomy "2.0"`, `q 1`, `nullWeight 0`, `coverage 9/9`, `confidence "full"`, `sensitivity 0`, `coverageCriteria {covered:34, total:46, uncovered:["D1.6","D2.4","D3.1","D5.3","D5.4","D6.1","D6.4","D8.4","D9.2","D9.5","D9.6b","D9.7"]}`, 12 регионов (russia-belarus 56, ukraine-moldova 58, baltic 61, balkans 63, middle-east 71 …). Части: `global.js`, `regions.js`, `trend.js`, `drivers.js`, `sources.js`, `region-<id>.js` × 12, `week.js` — 17 файлов у v2, 11 у v1 (`weekPartFiles(taxonomy)`). `data/audit.jsonl` — 75 записей hash-цепочки, наружу не идёт.

## 3. `build.js`

CommonJS, только stdlib: `BUNDLES = [['js/bundle.js', ['js/app.js','js/share.js']], ['js/bundle-privacy.js', ['js/i18n.js','js/ui.js']]]`. Обход графа импортов, топосорт, запрет циклов, namespace `window.CI` с ключами-путями (`window.CI['js/i18n.js']`). Падают с ошибкой: side-effect `import './x.js'`, несколько деклараторов в `export const A = 1, B = 2`, default-импорт без default-экспорта, любые неподдержанные формы; после сборки проверяется отсутствие строк `import/export` в бандле. Команда `node build.js`; бандлы коммитятся, тесты идут против исходников. Новая страница либо переиспользует существующий бандл, либо требует новой пары в `BUNDLES`.

## 4. `calc/`

- CLI: `node calc/calc.js [неделя …]` — печать; `node calc/calc.js --write [неделя …]` — запись. `RECALC_WEEKS = ['2026-08-30'…'2026-10-18']` (8 недель), `PREV_WEEK = '2026-08-23'`; неделя вне списка → сообщение и `process.exitCode = 1`. Для N недель считается вся цепочка до последней запрошенной.
- `calc/week-step.js` — чистый шаг: `computeWeek(input, state, params)` → `{week, drivers, ctx, global, classification, regions, sbLeft, sbReason}`; `taxonomyForWeek(week)`, `loadSnapshotPart(week, file)` (чтение `.js` через `vm`), `classifyPublication`, `nextChainState`.
- `calc.js` реэкспортирует их и держит: `ignoredRegionalAttribution`, `collectIntersections`, `coverageOf`, `validateInputSources`, `validateSourceIndependence`, `checkCoreSources`, `collectSourceItems`, `weekPartFiles`, `renderWeekCombined`, `loadWeekParts`, `renderGlobal`, `renderRegions`, `renderRegionFile`, `renderTrend`, `runWeek`, `writeWeek`, `printWeek`.
- Публикация (`writeWeek`): `meta` + `full` → ворота цитат (`validateQuotes`/`verifyQuotes` по `calc/input/drafts/texts-<week>/`) → ворота ссылок (`checkSources`) → контракт `js/data.js#validate` → `writeFileSync` числовых файлов + `week.js` (`renderWeekCombined`) → `audit.append` (recalc/flash). Любой провал — диск не тронут.
- Швы для нового генератора публичных данных: `loadSnapshotPart`/`loadWeekParts`/`renderWeekCombined`, `collectSourceItems`, `coverageOf`, `regionIdsFor` + `taxonomyForWeek`, `js/data.js#validate`, `calc/prepare-week.js#readRecalcWeeks`/`readLatestWeeks` (парсинг списков без дублирования regex).
- Конвенция: **все числа — в `calc/params.js` (`PARAMS`)**: `methodology: '3.0'`, `k: 1.95`, `taxonomyV2From`, `sensitivityThreshold: 5`, `blindReasonFrom: '2026-10-25'`, `backfillWindow: 4`, `clusters`, `coreSources`. Магических чисел в новом коде быть не должно.

## 5. Workflows

**`.github/workflows/deploy.yml`**: `push: branches [master]` + `workflow_dispatch`; права `contents: read`, `pages: write`, `id-token: write`; concurrency `pages`. Шаги: checkout (SHA-пиннинг), «Stage site files» — `mkdir -p _site`, `cp index.html privacy.html icon.svg _site/`, `cp -r css js data _site/`, `rm -f _site/data/audit.jsonl`, `echo cassindex.ru > _site/CNAME`; `actions/upload-pages-artifact` (path `_site`), `actions/deploy-pages`. Все actions закреплены полным SHA. **Белый список файлов — здесь**: новая страница, `robots.txt`, `sitemap.xml` не опубликуются, пока их не добавят в `cp`.

**`.github/workflows/weekly-calc.yml`**: cron `0 5 * * 0` (вс 08:00 МСК) + `workflow_dispatch [week]`; права `contents: write`, `actions: write`. Шаги: checkout, setup-node 24, «Определить целевую неделю» (env `WEEK_INPUT`, regex даты), «Ворота пропуска» (нужен `calc/input/<week>.json` + сиды `drivers` и `region-europe`…`region-africa`; если `data/<week>/global.js` есть — тихий skip), `node calc/prepare-week.js --write <week>`, `node calc/calc.js --write <week>`, `node --test`, `node build.js`, коммит от `github-actions[bot]` + `git push origin master`, затем `gh workflow run deploy.yml` (push от `GITHUB_TOKEN` не триггерит другие workflow). Список сидов зашит по v1 и для v2-недель устарел (`region-europe` в v2 нет) — известный баг. Секретов/env нет: `.env`, `.env.*` в `.gitignore` (кроме `!.env.example`), файлов нет; единственный токен — `${{ github.token }}`/`GH_TOKEN`.

## 6. Тесты

`node:test` + `node:assert/strict`, ESM `tests/*.test.js`, без фреймворков. Запуск `node --test` из корня (форма `node --test tests/` падает на Windows/Node 24). Сейчас 55 файлов, 575 passed.
- `tests/csp.test.js` — **точное равенство строки** meta-CSP для `index.html` и `privacy.html` (+ нет `'unsafe-eval'`).
- `tests/page-structure.test.js` — в `index.html` не должно быть `id="sources"`, `href="#sources"`, `data-section="history"`.
- `tests/privacy.test.js` — дословный §17 (`disclaimer.full`) и `footer.ip`; в `index.html` обязаны быть `data-role="share-btn"`, `data-i18n="disclaimer.full"`, `data-i18n="footer.ip"`, `privacy.html`, `data/regions/reference.js`; в `privacy.html` — ключи `cassandra.region*`, `localStorage`, `js/i18n.js`, `href="index.html"`, ноль внешних ресурсов кроме `https://creativecommons.org/licenses/by/4.0/`; дефолтные тексты HTML равны значениям словаря.
- `tests/build.test.js` — сборка копии `build.js` + `js/` во временном каталоге; три негативные формы и контрольная сборка реальных исходников (ожидает оба бандла). В фикстуре зашиты заглушки входов `BUNDLES`.
- `tests/data.test.js` — `validate`/`validateQuality` на синтетике; пины диска: 09-13 `index 43`, `delta 1`, `published`/`through` 09-13, тренд-точки, демо-08-23 валидна, недели без `coverageCriteria` проходят, `africa`/`south-asia` `background` по неделям цепочки.
- `tests/latest-loader.test.js` — исполняет `data/latest.js` в `vm`: `CI_WEEKS` без дублей и отсортирован, `CI_LATEST` входит и равен последнему, `CI_DATA.latest` согласован, `snapshots` пуст; ровно один `document.write` на неделю и всегда `data/<week>/week.js` (части запрещены).
- `tests/weeklists-agreement.test.js` — `RECALC_WEEKS` ↔ `CI_WEEKS` ↔ `CI_LATEST` ↔ каталоги `data/YYYY-MM-DD` согласованы, строго возрастают, без дублей.
- `tests/page-smoke.test.js` — каждая неделя собирается из 5 частей, проходит `validate`, `rankedRegions` даёт ровно 6 (v1) / 12 (v2) строк — литералами.
- `tests/lexicon.test.js` — сканер `DICTS` (и демо-снапшотов): «вероятн», «шанс», «процент риска», «обратный отсчёт», «на пороге», «на грани», «осталось», «до войны», «шаг к», метафоры часов + EN-эквиваленты.
- `tests/i18n.test.js` — пины конкретных строк и ICU plural.

## 7. Договорённости, которые нельзя нарушать

`AGENTS.md`: ноль зависимостей (npm/CDN — ошибка), всё ESM, вся пользовательская строка — через `js/i18n.js`, DOM только `document.createElement` + `textContent` (никакого `innerHTML` со строками), цвета только токенами `css/styles.css`, a11y (фокус 2px #58A6FF, контраст ≥4.5:1, touch ≥44px, reflow 320px, `prefers-reduced-motion`, `aria-live`), лексика без PRD §11.5; коммит/пуш — только оркестратор. Не трогать `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`, `METHODOLOGY.md`, `.autopilot/`.
`docs/architecture.md` — поток данных расчёта и сайта, границы модулей (разделы 1–9; §5 контракт снапшота, §6 секции и хосты, §7 «модуль владеет / не знает»).
ADR: **0045** «Граница раскрытия: шкала и направление публичны, агрегация и пороги закрыты»; **0046** «Поле `intersection` в схеме входа: запрет ADR 0045 снят»; **0047** «Precursor Risk: слой Д9 публикуется отдельно, в индекс не входит»; **0048** «Шкала порядковая: нелинейность фиксируется и раскрывается, нормировка не меняется»; **0049** «Форвардный якорь: ожидание фиксируется до записи недели, параметры заморожены до 8 точек».
`CONTEXT.md` — глоссарий (`autopilot:glossary`): «снапшот», «пересчёт», «сид», «ворота», «слепой регион», «слой предвестников», «витрина доверия», «порядковая шкала», «методология 3.0 vs таксономия 2.0».
`docs/governance.md` §10.1 — редакционные ворота; `docs/competitive-analysis.md` (2026-10-18) — desk research по War Monitor / ACLED / CrisisWatch / GPR / ЦПК (прямо релевантно страницам сравнения).

## 8. SEO: что есть и чего нет

Есть: домен `https://cassindex.ru` (CNAME пишется в deploy), `<title>`, `<meta name="description">`, `<meta name="referrer">`, favicon `icon.svg`, `lang="ru"`, `?week=` как query-параметр, share-карточка 1200×630 в `js/share.js` (`CARD_W`/`CARD_H`, canvas → PNG → download; швы `cardLayout`, `cardColors`, `shareFileName`).
Нет: `robots.txt`, `sitemap.xml`, `<link rel="canonical">`, OG/Twitter-тегов (`og:title`, `og:image` и т. п.), JSON-LD (`application/ld+json`), `manifest.json`, RSS/Atom, отдельных URL под недели/регионы/страницы сравнения (всё на одном `index.html` + `?week=`). Title/description дополнительно ставятся из JS (`app.title`, `app.description`), то есть краулеру без JS виден только HTML-дефолт.

## 9. Рассылка, дайджест, внешние сервисы

- **Форма обратной связи**: `js/sections/feedback.js`, `POST` JSON на `https://formsubmit.co/ajax/Zasik2008@yandex.ru` (`ENDPOINT`). Антиспам-швы: `honeypotCheck` (поля `contact_me`, `company_site`, `site_url`), `timingCheck`/`timingToken` (мин. 2000 мс, соль `ci-feedback-token-v1`), `rateLimit` (30/120/300 с), `originAllowed` (`https://cassindex.ru`, `https://www.cassindex.ru`, `'null'`, `null`); лимиты `MIN_MESSAGE 5`/`MAX_MESSAGE 4000`; темы `FEEDBACK_TOPICS = ['wish','remark','question']`. Бэкенда нет, адрес получателя виден в коде, нужна одноразовая активация FormSubmit. CSP уже разрешает `formsubmit.co`.
- **Cloudflare Web Analytics**: `js/analytics.js`, `CF_BEACON_TOKEN = '49a23a5d11824903ad1cc3a2c76223a9'`, `CONSENT_KEY = 'cassandra.analytics.consent'`; `loadCounter()` создаёт `<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js">` с `data-cf-beacon`; `maybeInit()` — только при `granted`; `maybeShowBanner()` — один раз за сессию, после ответа на региональное согласие. CSP разрешает `static.cloudflareinsights.com` и `cloudflareinsights.com`.
- **Telegram / email-дайджест / RSS**: следов нет (grep по `telegram|t.me|rss|mailchimp|buttondown|substack` пуст). Серверной части нет: сайт статический, отправлять дайджест нечем; единственный внешний сервис — FormSubmit.

## Грабли

- **Бандл после правки `js/**`**: без `node build.js` коммиченный бандл молча старый; страница грузит бандл, тесты — исходники. Новый модуль обязан быть достижим из входов `BUNDLES`.
- **`tests/build.test.js`**: в фикстуре зашиты заглушки (`js/share.js`, `js/i18n.js`, `js/ui.js`); новая пара в `BUNDLES`/новый вход → «не найден модуль», пока не обновят `ENTRY_STUBS`.
- **CSP-пин**: сравнение строки целиком. Inline-JSON-LD или инлайн-скрипт потребует `'unsafe-inline'` в `script-src`; новая страница = новая ветка теста, а не правка старой.
- **`tests/page-structure.test.js`**: в `index.html` нельзя вернуть `id="sources"`, `href="#sources"`, `data-section="history"` — в том числе в новой навигации.
- **Списки недель**: `RECALC_WEEKS`, `CI_WEEKS`/`CI_LATEST` и каталоги `data/YYYY-MM-DD` обязаны совпадать. Публичный JSON-экспорт не должен добавлять неделю в `CI_WEEKS`: лоадер пинит «ровно один write на неделю и только `week.js`».
- **deploy-whitelist**: `_site` собирается явным `cp` — `robots.txt`, `sitemap.xml`, `how-to-read.html`, `changelog.html` не опубликуются, пока их не добавят в шаг «Stage site files».
- **`data/audit.jsonl`** удаляется из артефакта (`rm -f`). Публичный changelog строить прямо на нём нельзя — нужен производный файл; сам журнал (hash-цепочка) руками не править.
- **CRLF**: `.gitattributes` — `* text=auto eol=lf`; CRLF роняет `tests/build.test.js` и `tests/week-combined-parity.test.js` и ломает сборку бандла.
- **`week.js` руками не править**: только `calc.js --write` или `node calc/migrate-week-combined.js`. Новый файл в `data/<week>/` в `week.js` автоматически не попадёт.
- **Словарь**: новая страница = ключи в `DICTS.ru`; тексты проходят `tests/lexicon.test.js` («вероятность», «на грани», «на пороге» → красный тест). Дефолтная разметка должна совпадать со словарём (прецедент — `tests/privacy.test.js`).
- **`node --test`** без аргументов; `node --test tests/` падает на Windows/Node 24.
- **`calc.js`** откажется считать неделю вне `RECALC_WEEKS` (exit 1); новая неделя идёт через `calc/prepare-week.js --write`.
- **Зависимости**: корневого `package.json` нет (только `package/`); любой импорт npm/CDN — нарушение конвенции, CSP всё равно заблокирует внешний скрипт.
