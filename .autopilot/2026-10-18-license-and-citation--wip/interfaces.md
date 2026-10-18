# Границы, решённые в спецификации

## Правила проекта (из прошлой сборки, не пересматриваются)

- Публичный слой — **производная** от `data/<week>/week.js`: узкая проекция, детерминизм
  (никаких timestamp внутри), версия схемы в файле (ADR 0050/0051). Руками файлы
  `data/public/**`, `changelog.html`, `digest.html` не правятся.
- Шкала объявлена порядковой с прокалиброванными границами состояний; расстояния —
  соглашение насыщающей кривой, не измеренная величина (ADR 0048).
- Слой `precursor` в индекс не входит, public forward-only, бэкфилл запрещён (ADR 0047).
- Форвардные якоря: файл пишется до `--write`, параметры не трогаются до 8 строк (ADR 0049).
- Статические SEO-страницы держат текст в разметке, без i18n-рантайма и без JSON-LD
  (ADR 0052).
- Email-доставка — HTTP-эндпоинт провайдера (ADR 0053); отметка доставки — пары
  «неделя + канал» с резервом (ADR 0054); подписка — заявкой через форму (ADR 0055).
- Число подгрупп Д9 — один источник `PRECURSOR_SUBGROUPS`.

Плюс правила репозитория, которые работа эта не меняет: ноль зависимостей, ESM, тексты —
через словарь `js/i18n.js`, DOM только через `createElement`/`textContent`, бандлы
пересобираются `node build.js` после правки `js/**`, коммит/пуш — за оркестратором.

## Единицы и их границы

### 1. Корневые правовые артефакты

- **Владеет**: `LICENSE`, `LICENSE-DATA`, `LICENSE-DOCS`, `NOTICE`, `TRADEMARK.md`,
  `CITATION.cff`, `VERSION`, `.zenodo.json`.
- **Открывает**: только текст. Никакой код их не импортирует.
- **Скрывает**: ничего.
- Инвариант: `LICENSE` — единственная лицензия кода в корне; `LICENSE-DATA` и
  `LICENSE-DOCS` различаются только шапкой области применения, тело legalcode идентично.

### 2. `VERSION` ↔ `CITATION.cff`

- `VERSION` — единственный источник версии проекта (одна строка, semver, `1.0.0`).
- `CITATION.cff` повторяет её в `version:`; паритет проверяется тестом, а не дисциплиной.
- `date-released` — дата релиза (календарная дата), не дата недели индекса.

### 3. `calc/public-export.js` — константа `LICENSE`

- **Владеет** формой лицензионного конверта публичного слоя:
  `{name, url, attribution, note, placeholder}`.
- **Открывает** её через `buildDataset(...).license` и `writePublicData(...)` →
  `data/public/index.json`, `data/public/latest.json`.
- **Скрывает** реализацию экспорта (CSV, SVG, changelog-страница).
- Замороженный контракт поля: `name` строкой `'CC BY 4.0'`, `url` — canonical legalcode,
  `attribution` непустая строка с URL сайта, `placeholder: false`.
- После правки обязательна перегенерация: `node calc/public-export.js --write`.

### 4. `tools/check-dco.js` — проверка подписи

- **Владеет** разбором trailers и решением «коммиты подписаны / нет».
- **Открывает** чистые функции: `parseTrailers(message) -> {signedOffBy: string[]}`,
  `checkCommits(commits) -> {ok, offenders[]}`; CLI-вход читает `git log` диапазона.
- **Скрывает** git-вызовы и формат вывода.
- Не знает ни про GitHub API, ни про PR: диапазон коммитов передаётся снаружи
  (в workflow — `BASE_SHA..HEAD_SHA`), поэтому тестируется без сети.

### 5. `.github/workflows/dco.yml`

- **Владеет** единственным событием: `pull_request` (`opened`, `synchronize`, `reopened`).
- `permissions: contents: read`; `actions/checkout` — тот же SHA, что в остальных
  workflow (`11d5960a326750d5838078e36cf38b85af677262 # v4.4.0`), `fetch-depth: 0`.
- Сторонних action нет: шаг `run: node tools/check-dco.js "$BASE" "$HEAD"`.

### 6. Тесты-пины

- `tests/licensing.test.js` — единственное место, где записаны инварианты рамки:
  наличие файлов, дословная фраза README, Apache-заголовок, CC URL и атрибуция,
  `VERSION` ↔ `CITATION.cff`, `upload_type: dataset`, NOTICE ↔ GeoNames,
  отсутствие закрытых каталогов в трекинге.
- `tests/dco.test.js` — чистые функции `tools/check-dco.js` (подписан, не подписан,
  несколько trailers, merge-коммит).

### 7. Документы

- `README.md` — входная страница; первая строка после заголовка — официальная фраза.
- `CONTRIBUTING.md` — процесс вклада, DCO 1.1 (`git commit -s`), релизы и DOI.
- `SECURITY.md` — канал, окна, область, запрещённые действия.
- `docs/repo-boundaries.md` + ADR `0056` — граница «публичное ядро / коммерческий модуль».
- `docs/architecture.md` §7 (границы модулей) не переписывается: разделение
  репозиториев на него не влияет, потому что публичное ядро остаётся целиком здесь.

## Швы для тестов

Один шов на каждую проверяемую единицу, все — чистые функции или чтение файла:

1. файлы рамки читаются с диска (как `tests/page-structure.test.js`);
2. `checkCommits`/`parseTrailers` — без git и сети;
3. `buildDataset` уже экспортирован — лицензионный конверт проверяется через него.

## Что уже построено прошлыми тасками

### Т01 — правовая рамка (коммит `T01`)

- Файлы: `LICENSE` (Apache-2.0 + заполненное приложение, `Copyright 2026 Cassandra Index contributors`),
  `LICENSE-DATA`, `LICENSE-DOCS` (шапка области применения + полный legalcode CC BY 4.0,
  маркер тела — `FULL TEXT OF THE CC BY 4.0 LEGAL CODE`), `NOTICE` (5 пунктов),
  `TRADEMARK.md`.
- Тест `tests/licensing.test.js` — 7 `test()` на `node:test` + `assert/strict`;
  проверяет наличие файлов, `git ls-files` на запрещённые каталоги через
  `execFileSync('git', ['-C', root, 'ls-files'])`.
- Тело legalcode CC в `LICENSE-DATA` и `LICENSE-DOCS` должно остаться идентичным;
  различаются только шапки.

## Проект: как ставить, запускать и проверять

- Зависимостей нет; ничего устанавливать не нужно (Node ≥ 18, всё ESM; `build.js` — CommonJS).
- Сайт: открыть `index.html` (`file://` работает, бандлы подключены).
- **Одна проверка** — `node --test` из корня, без аргументов (форма `node --test tests/`
  падает на Windows/Node 24).
- Один файл: `node --test tests/<имя>.test.js`.
- Сборка бандлов: `node build.js` — обязательна после любой правки `js/**`; в этом
  прогоне бандлы не меняются.
- Перегенерация публичного слоя: `node calc/public-export.js --write` — обязательна
  после правки константы `LICENSE` в `calc/public-export.js`.
- Ссылки/сеть в тестах не нужны; тесты — только чистые функции и чтение файлов.

**Не трогать**: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`,
`METHODOLOGY.md`, `.autopilot/` (кроме своей папки прогона), чужие правки в рабочем
дереве, `data/public/**` руками (только CLI), `js/bundle*.js` руками.

