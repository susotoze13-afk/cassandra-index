# Границы и правила

Этот файл читают все исполнители и ревьюеры до кода. Спецификация на него ссылается.

## Границы, решённые в спецификации

### `calc/public-export.js` — публичный слой данных

- **Владеет**: проекцией снапшота в публичный формат, сериализацией JSON/CSV/SVG,
  записью `data/public/*` и генерацией `changelog.html`/`digest.html`.
- **Экспонирует** (имена окончательные):
  - `PUBLIC_SCHEMA_VERSION = 1`
  - `datasetOf(snapshot, week)` → `{...}` — проекция одной недели; чистая, без диска;
  - `buildDataset(weeks, loadSnapshot)` → `{schema, schema_version, site, license, weeks[]}`;
  - `toCsv(dataset)` → `string`;
  - `toTrendSvg(snapshot)` → `string` (валидный SVG, без внешних ссылок);
  - `renderChangelogPage(entries)` / `renderDigestPage(issues)` → `string` (полный HTML-документ);
  - `writePublicData({rootDir, weeks, loadSnapshot, entries})` → `{files: string[]}`.
- **Скрывает**: чтение частей (`loadWeekParts`), пороги состояний (`engine.stateOf`),
  выбор полей, экранирование.
- **Не знает**: ничего про сайт, бандлы и `js/i18n.js`.

### `calc/changelog-entries.js` — курируемая история изменений

- **Владеет**: массивом `CHANGELOG` записей `{date, version, kind, title, body, link?}`,
  `KINDS = ['methodology','taxonomy','schema','field','fix','product']`.
- **Экспонирует**: `CHANGELOG`, `KINDS`, `validateChangelog(list)` → `string[]` (ошибки формы),
  `sortedDesc(list)`.
- **Скрывает**: порядок хранения (в файле — по возрастанию даты, отдаётся по убыванию).

### `calc/digest.js` — текст выпуска

- **Владеет**: сборкой выпуска из снапшота: тема, текст, HTML, Telegram-разметка.
- **Экспонирует**:
  - `DIGEST_ITEMS = 5`, `DIGEST_REGIONS = 3`;
  - `buildDigest(snapshot, opts)` → `{week, subject, text, html, telegram, meta:{items, regions, hasPrev}}`;
  - `escapeHtml(s)`.
  - `opts` = `{site = 'https://cassindex.ru', prev = null, chartUrl}`.
- **Скрывает**: форматирование чисел/точек, выбор «пяти пунктов».
- **Не знает**: как сообщение уходит.

### `calc/digest-send.js` — доставка

- **Владеет**: каналами и защитой от повторной отправки.
- **Экспонирует**:
  - `sendTelegram(fetchImpl, {token, chatId}, text)` → `Promise<{ok, status}>`;
  - `sendEmail(fetchImpl, {endpoint, token, from, to}, {subject, text, html})` → `Promise<{ok, status}>`;
  - `deliver(digest, cfg, deps)` → `Promise<{sent: string[], skipped: string[], errors: {channel, message}[]}>`;
  - `readSent(dir)` / `writeSent(dir, week)`.
- **Скрывает**: форму запросов к Bot API и провайдеру, экранирование.
- **Правило**: ни одно значение секрета не попадает в `console.*`, в сообщение об ошибке
  и в файл. В ошибке — только имя переменной окружения.

### Страницы сайта (статические, корень репозитория)

`how-to-read.html`, `changelog.html`, `digest.html`, `compare.html`,
`compare-war-monitor.html`, `compare-acled.html`, `compare-crisiswatch.html`,
`robots.txt`, `sitemap.xml`.

- **Владеют**: своим текстом и метаданными.
- **Экспонируют**: только HTML; никаких JS-модулей и бандлов.
- **Скрывают**: всё остальное. Внешних ресурсов нет (кроме `icon.svg`, `css/styles.css`
  и ссылок `<a>`).
- `changelog.html` и `digest.html` — **генерируемые**: их пишет `writePublicData`,
  руками не правятся.

## Швы для тестов

Предпочитаем существующие и держим их мало:

1. `datasetOf` / `buildDataset` / `toCsv` / `toTrendSvg` — чистые, на синтетическом снапшоте.
2. `buildDigest` — чистая, на реальном снапшоте 2026-10-18 и на синтетике без прошлой недели.
3. `deliver` / `sendTelegram` / `sendEmail` — с поддельным `fetchImpl`, без сети.
4. `validateChangelog`.
5. Файловые проверки страниц (`readFileSync`) — как в `tests/page-structure.test.js`.

## Правила проекта (обязательны для всех)

Из `AGENTS.md` и `docs/architecture.md`:

- Ноль зависимостей: только stdlib Node / браузер. Любой импорт npm/CDN — ошибка.
- Всё ESM; CommonJS только `build.js`.
- Все числа — в `calc/params.js` (`PARAMS`); магических чисел в новом коде нет.
- Пользовательские строки приложения — через `js/i18n.js`; **исключение** — статические
  SEO-страницы и HTML письма/страниц, генерируемых из данных (см. спецификацию).
- DOM приложения — только `document.createElement` + `textContent`; в генерируемом HTML
  любое подставляемое значение проходит `escapeHtml`.
- Цвета — только токены `css/styles.css`.
- Лексика: без «вероятность/вероятно», «шанс», «на грани», «на пороге», «осталось»,
  «шаг к», метафор часов (PRD §11.5, `tests/lexicon.test.js`).
- После любой правки `js/**` — `node build.js`, бандлы коммитятся.
- `node --test` без аргументов; `week.js` руками не править; `data/audit.jsonl` не
  публикуется.
- CRLF: `.gitattributes` держит LF; новые файлы — LF.
- Секреты: только имена в `.env.example`; значения — в окружении/секретах GitHub.

## Договорённости прошлых сборок (не пересматривать)

Из `.autopilot/PROGRESS.md`, дословно:

- Шкала объявлена порядковой с прокалиброванными границами состояний; расстояния между
  числами — соглашение насыщающей кривой §5.2, а не измеренная величина (ADR 0048).
  Нормировку не меняли, числа недель не сдвинулись.
- Слой `precursor` не входит в индекс, публикуется отдельно, forward-only: на диске его
  нет ни у одной недели, бэкфилл запрещён (ADR 0047). Ноль и отсутствие поля — разные
  вещи: нет поля → блок скрыт, а не «0 %».
- Форвардный якорь — `calc/input/anchors/forward-<неделя>.json`, пишется до `--write`;
  `unknown` — законная запись с причиной; параметры `k`/веса/пороги не трогаются до
  8 строк журнальной таблицы (ADR 0049).
- Число подгрупп Д9 — один источник `PRECURSOR_SUBGROUPS` в `js/data.js`, паритет с
  движком пинится тестом.
- Слово «порядковая» публично (ADR 0045 и 0048) — прежняя договорённость «без этого
  слова» отменена на брифинге.

## Команды и запреты

- Проверка одной командой: `node --test` — из корня, **без аргументов** (форма
  `node --test tests/` падает на Windows/Node 24).
- Один файл: `node --test tests/<имя>.test.js`.
- Сборка бандлов: `node build.js` — обязательна после любой правки `js/**`, бандлы
  коммитятся; без правок `js/**` запуск не должен давать diff.
- Экспорт публичных данных: `node calc/public-export.js` (печать) / `--write` (запись).
- Дайджест: `node calc/digest-send.js` (dry-run) / `--send`.
- Не трогать: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`, `METHODOLOGY.md`,
  `docs/adr/**` (ADR пишет только оркестратор), `data/<week>/week.js` руками,
  `data/audit.jsonl`, `.autopilot/**` (кроме своего файла таска — и его тоже не править).
- Коммиты делает только оркестратор: исполнитель оставляет рабочим деревом и присылает
  отчёт.

## Что уже построено (для контекста исполнителей)

- `data/latest.js` + `data/<week>/week.js` — единственный путь данных сайта; части
  (global/regions/trend/drivers/sources/region-*) остаются для пайплайна.
- `js/data.js` — контракт снапшота (`validate`, `validateQuality`, `regionIdsFor`,
  `CURRENT_TAXONOMY = '2.0'`, `PRECURSOR_SUBGROUPS = 8`).
- `calc/calc.js` — CLI расчёта недели (`--write`), ворота цитат → ссылок → контракта.
  `calc/week-step.js` — `loadWeekParts`, `taxonomyForWeek`.
- `calc/engine.js` — `stateOf(index)`, `CRITERIA` (46).
- Сайт грузит бандлы `js/bundle.js` и `js/bundle-privacy.js`; `privacy.html` — образец
  отдельной статической страницы (свой meta-CSP, `body class="privacy-page"`).
- `deploy.yml` публикует только `index.html privacy.html icon.svg`, `css/`, `js/`, `data/`.
