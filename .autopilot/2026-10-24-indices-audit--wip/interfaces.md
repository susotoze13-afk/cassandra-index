# Интерфейсы и правила проекта (прогон 2026-10-24-indices-audit)

## Правила проекта (договорённости прошлых прогонов — обязательны)

Дословно из `.autopilot/PROGRESS.md` (раздел «Договорились — не пересматривать»):

- Контракт покрывает **весь** `data/public/**`, а не шесть названных путей (2026-10-19).
- `docs/api.md` — только в репозитории; страницы `api.html` нет: «сайт — витрина, не справочник» (2026-10-19).
- `PUBLIC_SCHEMA_VERSION = 1` не растёт: новых полей в существующих файлах нет.
- Схемы держатся на ключах минимального валидатора `tests/public-contract.test.js`; nullable — массивом типов.
- В силе: лицензии по типу материала, ADR 0045 (UI не раскрывает формулы), порядковая шкала,
  forward-only `precursor`, `validation.json` из `backtest.js --write`, `forecast-ledger.json` из `ledger.js --write`.
- Региональный порог гипотетик — forward-only: недели < 2026-10-25 считают по глобальному 50 %
  (ADR 0065); переписывать опубликованную историю автоматика не вправе.
- `verified: null` в `forecast-ledger.json` различается парой `(outcome, actualIndex)`;
  нового поля под причину не заводить (решение пользователя 2026-10-24, ADR 0066).

Спецификация новой страницы ни одному из этих правил не противоречит. ADR 0045 (UI
не раскрывает формулы индекса) касается страницы «Методология» Cassandra; здесь
публикуются **чужие** веса и **своя** шкала аудита — это прямое требование брифа,
а не раскрытие внутренних весов индекса.

## Зоны правок (не пересекаются)

- **корень:** `indices-audit-build.js` (генератор), `indices-audit.html` (производная, не править руками).
- **docs:** `docs/articles/indices-audit-app-source.md` (единственный вход генератора).
- **тесты:** `tests/indices-audit.test.js`.
- **workflow:** одна строка в `cp` шага «Stage site files» `.github/workflows/deploy.yml`.
- **не трогать:** `js/**` (значит `node build.js` не нужен), `css/styles.css` (токены и классы уже есть),
  `calc/**`, `data/**`, статью `docs/articles/habr-indices-audit.md` и её паспорт.
- **чужие незакоммиченные правки в дереве** (в т.ч. `calc/params.js`, `tests/regional-hypothesis.test.js`,
  `AGENTS.md` — пересчёт O11 в соседней сессии) не трогать и не коммитить.

## Границы модуля

### `indices-audit-build.js` (ESM, только `node:fs`/`node:path`/`node:url`)

Владеет: разбором markdown-источника, расчётом всех чисел страницы и рендером HTML.
Скрывает: разметку страницы и правила разбора markdown.

Экспортирует (имена — контракт для тестов):

- `ROOT`, `SOURCE = 'docs/articles/indices-audit-app-source.md'`, `OUTPUT = 'indices-audit.html'`,
  `SITE = 'https://cassindex.ru'`.
- `WEIGHTS = { open: 25, repr: 25, cov: 20, hist: 15, indep: 15 }` — сумма 100.
- `FREQUENCY = { continuous: 1, day: 1, week: 1, month: 0.75, year: 0.5, halfyear: 0.5, dashboard: 0 }`.
- `CRITERIA = ['Д','Ф','С','Г','Н','В','Л','И','Ст','Р']` (порядок колонок).
- `PROJECT_IDS` — 12 слагов в порядке статьи: `cassandra, acled, ucdp, gdelt, crisiswatch, warmonitor, gpr, inform, gpi, fsi, ewp, bgri`.
- `escapeHtml(value) -> string` (`&`, `<`, `>`, `"`).
- `parseSource(markdown, { projectIds = PROJECT_IDS } = {}) -> model`.
- `validateSource(model) -> string[]` — пустой массив = источник валиден.
- `weightedRows(model) -> [{ id, name, parts: { open, repr, cov, hist, indep }, frequency, score }]`
  где `score` — неокруглённое, `total = Math.round(score)`.
- `matrixStats(model) -> { total, possible, median, perCriterion, byBlock, fullCycle, verifiable }`.
- `sensitivityRows(model) -> [{ key, delta, order, swaps }]` — `key` из `WEIGHTS`, `delta` = +5|−5,
  `order` — массив id по убыванию, `swaps` — пары `[a, b]`, обменявшиеся местами.
- `renderPage(model) -> string` — полный HTML документ (`<!doctype html>` … `</html>`).
- `buildOutputs(root = ROOT) -> [{ file, body }]`.
- `main()` — CLI: без аргументов печатает сводку, `--write` пишет файл, `--root <dir>` — другой корень.

Считает так (единственный источник чисел — матрица):

```
open  = (Д + Л) / 2
repr  = (Ф + С) / 2
cov   = 0.6 * Ст + 0.4 * FREQUENCY[bucket]
hist  = И
indep = Р
score = 25*open + 25*repr + 20*cov + 15*hist + 15*indep
total = Math.round(score)
```

Устойчивость: один вес `w` сдвигается на `delta` (±5), остальные четыре умножаются на
`(100 − w − delta) / (100 − w)`. Места считаются по `score`, показывается `total`.

### `docs/articles/indices-audit-app-source.md` (вход, markdown)

Обязательные разделы и таблицы (парсер падает с понятной ошибкой, если раздела нет):

| Раздел | Форма |
|---|---|
| шапка | `**Дата среза:** YYYY-MM-DD` |
| `## Критерии` | `\| Код \| Признак \| Что считается подтверждением \|` — 10 строк, коды из `CRITERIA` |
| `## Проекты` | `### <Название>` × 12, внутри `- **Конструкт:**`, `- **Подтверждено:**`, `- **Не подтверждено:**`, `- **Источник:** [текст](url) — проверено <дата>` |
| `## Матрица` | `\| Проект \| Д \| Ф \| С \| Г \| Н \| В \| Л \| И \| Ст \| Р \|`, значения `✔` или `—` |
| `## Развёртка` | `\| Проект \| Критерий \| Основание \|` — ровно 120 строк, по одной на клетку |
| `## Частота` | `\| Проект \| Частота \| Источник \|`, `Частота` ∈ `FREQUENCY` |
| `## Страны` | `\| Страна \| <слаг проекта> … 12 колонок \|`, значения `страна` / `регион` / `нет` / `не проверено: <причина>, <дата>` |
| `## Атрибуты` | `\| Проект \| Разрешение \| С какого года \| Лаг публикации \| Где смотреть \| Дата проверки \|` |
| `## Не проверено` | `\| Проект \| Что проверяли \| Адрес \| Дата \| Код или причина \|` |
| `## Лицензия` | абзац: CC BY 4.0 + атрибуция + ссылка на legalcode |

Проект в таблицах — по отображаемому имени (`Cassandra Index`, `War Monitor`, …);
парсер сопоставляет имя со слагом по `PROJECT_IDS` и списку `###`-заголовков.

### `indices-audit.html` (выход)

Один файл, без клиентского JS. Структура: `head` (charset, viewport, referrer,
meta-CSP **дословно** `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'self'; object-src 'none'`,
title, description ≥ 20 символов, canonical `https://cassindex.ru/indices-audit.html`, robots,
og:type/title/description/url/site_name/locale, `icon.svg`, `css/styles.css`), `<body class="doc-page">`,
`header.site-header` (бренд + навигация: Главная, Как читать индекс, Сравнение), `main#main`
с ровно одним `<h1>`, `footer.site-footer`. Обязательна ссылка `href="index.html"`.
Секции `main`: «Что это», «Критерии», «Матрица», «Итог», «Пять из двенадцати», «Карточки»,
«Развёртка 120 ячеек», «Взвешенная шкала», «Устойчивость ±5 п.п.», «Страны», «Что не удалось
проверить», «Переиспользование».
Классы — существующие: `doc-lede`, `doc-meta`, `doc-note`, `doc-source`, `doc-figure`
(в `.doc-keyfigures`), `article-table-wrap`, `doc-table`, `sr-only`. Таблицы:
`.article-table-wrap > table.doc-table > caption.sr-only`. Никакого `innerHTML`, никакого
`<script>`, `<img>`, `style="…"`, JSON-LD (запрещены пинами сео-страниц).
Файл пишется с `\n` в конце, без CRLF.

## Швы для тестов

`tests/indices-audit.test.js` импортирует генератор и работает без DOM и без сети:

- источник читается с диска и проходит `validateSource` без ошибок;
- `weightedRows` даёт ровно `[98, 88, 73, 69, 69, 58, 56, 56, 48, 45, 33, 0]` в порядке статьи;
- `matrixStats` даёт `total = 62`, `possible = 120`, `median = 5.5`, `verifiable = 5`;
- `sensitivityRows` подтверждает: верх (UCDP) и низ (BGRI, CrisisWatch) не двигаются ни при одном сдвиге;
- `renderPage(parseSource(source))` совпадает с `indices-audit.html` на диске байт в байт;
- в HTML: 12 `<article`-карточек, 120 строк развёртки, 62 знака `✔` в матрице, 14 строк стран;
- в HTML нет запрещённых формулировок и нет `innerHTML`;
- `indices-audit.html` есть в `cp`-строке `deploy.yml` (это же пинит `tests/site-pages.test.js`);
- `indices-audit.html` добавлен в `PAGES` пина `tests/seo-pages.test.js` — тогда базовая
  проверка head/OG/CSP/одного `<h1>`/запрета скриптов работает и на нём;
- `sitemap.xml` перегенерирован `node blog-build.js --write` и содержит новую страницу
  (`tests/site-pages.test.js` сверяет карту с корневыми `*.html` в обе стороны);
- в `tests/lexicon.test.js` страница **не** добавляется: её текст законно говорит
  «вероятность массовых зверств» при описании EWP; свой список запрещённых формулировок —
  в `tests/indices-audit.test.js`.

## Что закрыли тикеты (дополняется по мере прогона)
