# Архитектура Cassandra Index

Одна страница-карта для агента, впервые открывшего репозиторий. Короткие правила и
подводные камни — `AGENTS.md`; здесь — поток данных и границы модулей.

## 1. Две половины и направление зависимостей

- `calc/` — расчёт: вход недели → движок → снапшоты `data/<week>/*.js`.
- `js/` + `index.html` + `css/` — сайт: читает только `data/`, про `calc/` не знает.
- `data/` — граница: `.js`-файлы в `window.CI_DATA`, не JSON (сайт работает с `file://`).
- Расчёту разрешено импортировать контракт `js/data.js` (`validate`, `regionIdsFor`);
  обратного импорта нет.
- `calc/params.js` — единственный источник чисел (`k = 1.95`, `methodology = '3.0'`).
- Всё ESM, кроме CommonJS `build.js`; ноль зависимостей; Node ≥ 18.

## 2. Поток расчёта недели

1. `calc/input/<week>.json` — 46 критериев `criteria[id] = {value, covered, sources, regions?,
   intersection?}` или `null` (слепой), плюс top-level R55-источники.
2. `calc/calc.js` `runWeek(week, state)` читает вход и зовёт `computeWeek` из `calc/week-step.js`.
3. `computeWeek`: `buildDrivers` → `aggregateDrivers(ctx: prevInternal/prevPublished/
   structuralBreak)` → `classifyPublication` → `regionalSignals` + `regionalIndex`.
4. `runWeek` добавляет `sensitivity` (`calc/sensitivity.js`), `precursor`
   (`calc/precursor.js`), `trend`, `intersections`, `debt`, `core`, `ignoredAttribution`.
5. `writeWeek` собирает `meta` (quality-поля) и `full` (полный снапшот с `...snap`).
6. Ворота до диска: дословность цитат (`calc/quotes.js`) → linkcheck (`calc/linkcheck.js`,
   broken = отказ) → контракт `js/data.js` (`validate`).
7. Запись: `global.js`, `regions.js`, `region-*.js`, `trend.js`; `sources.js` — из входа
   или прежний; затем производный `data/<week>/week.js` (`renderWeekCombined`).
8. `audit.jsonl` — append recalc/flash записи (`calc/audit.js`).

## 3. Поток слоя precursor (Д9)

1. Вход недели: сигналы подгрупп Д9 попадают в драйвер `D9` через `buildDrivers`
   (`aggregateD9` в `calc/engine.js` даёт `score`, `signalingSubgroups`).
2. `calc/precursor.js` `precursorOf(drivers)` → `{value: int 0..100, signalingSubgroups}`
   или `null` (нет Д9 / нечисловой score).
3. `value = clamp(Math.round(score * 100), 0, 100)` — доля скора Д9, ограничитель §4.3.5
   не применяется; `U`, `q`, инерция и индекс не трогаются.
4. `runWeek` кладёт `precursor` в результат рядом с `sensitivity` (`calc/calc.js`).
5. `writeWeek` прогоняет его через `precursorForWeek(week, res, PARAMS)` и добавляет поле
   в `meta` и в `full` только при непустом значении **и** неделе не раньше
   `PARAMS.precursorFrom` (`2026-10-25`) — иначе пересчёт истории бэкфиллил бы слой.
6. `renderGlobal` пишет `s.precursor` в `global.js` условно (`if (meta.precursor)`).
7. `data/<week>/week.js` получает поле verbatim: `renderWeekCombined` конкатенирует тела
   частей, `global` идёт первым; отдельной части у слоя нет.
8. Сайт: `data/latest.js` грузит `week.js` → `js/app.js` → `render.renderAll` →
   `js/sections/precursor.js`. Загрузчик подключает `week.js?v=<CI_ASSET_REV>`
   (хеш содержимого всех week.js, пересобирается записью недели через
   `calc/asset-rev.js`) — cache-buster против `max-age=600` GitHub Pages.
9. `precursorFacts(snapshot)` возвращает `{value, signaling, total}` только для
   `dataState === 'published'`, непустого `global` и валидной формы поля; иначе `null`.
10. `render` пишет в `[data-section="precursor"]` и снимает/ставит `hidden` у
    `.precursor-section`; при `null` блок скрыт, а не показывает «0 %».
11. Тексты — `js/i18n.js` (`precursor.*`, `method.scale.*`); число подгрупп —
    `PRECURSOR_SUBGROUPS = 8` из `js/data.js`, паритет с `engine.D9_SUBGROUPS`.
12. Forward-only: в `data/` поля нет ни у одной из 12 недель; бэкфилл не выполняется.
    Регрессионный пин расчёта — `tests/precursor.test.js` (10-18 = `value: 50`).

## 3а. Поток странового слоя (ADR 0067)

1. Оверлей `calc/input/countries/<week>.json` — редакционная атрибуция:
   `criteria[id].countries[]` (ISO2 из whitelist версии недели) + `basis` +
   `sources[]` (url из источников недели). Отдельный файл, а не поле входа:
   атрибуция появляется отдельными прогонами (как africa-south-asia-sources),
   а неделя 2026-10-25 принадлежала параллельной сессии.
2. Гейт: слой пишется только для недель ≥ `PARAMS.countryLayerFrom`
   (`2026-10-25`) и при валидном оверлее; `validateCountryOverlay` → errors[]
   (неделя/критерий/ISO2/дедупликация/url), битый оверлей — «оверлей отклонён»
   и часть не пишется. Бэкфилла нет (forward-only, как у precursor).
2а. Инвариант «регион ⊇ страна» (ADR 0068): валидный оверлей расширяет
   атрибуцию регионов ДО расчёта — критерий с `countries[]` получает в
   `regions[]` регионы этих стран (`expandRegionAttribution`, таксономия недели).
   Региональные сигналы считаются по расширенной карте
   (`computeWeek(..., { regionCriteria })`), глобальный индекс — всегда по входу.
   Так регион-контейнер не расходится со своей страной (russia-belarus = RU);
   регион при этом может нести и собственные сигналы, которых у страны нет.
2б. Независимость страновой атрибуции (ADR 0067 п. 8) — предупреждение, не ворота:
   `countryAttributionWarnings(overlay, weekInput)` считает кластеры источников
   каждой записи оверлея на каждую заявленную страну; записи с < 2 кластерами
   печатаются `printWeek` строками «предупреждение (страны): …». Снапшот,
   публикация и история не меняются — правило действует симметрично для всех стран.
3. Расчёт — то же ядро §7, обобщённое размерностно-нейтрально:
   `engine.attributedSignals(criteria, ids, params, week, attr)` и
   `engine.attributedIndex(global, unit, params)`; `countrySignals` =
   `attributedSignals(..., 'countries')`, `countryIndex` = `attributedIndex`.
   Регионы — тонкие обёртки, их выходы байт-в-байт прежние.
4. `prevIndex` страны: опубликованный индекс страны прошлой недели → иначе
   индекс её региона прошлой недели → иначе `prevGlobal` (аналогия ADR 0038:
   первая неделя слоя обязана дать числовую дельту). Слепая страна (nReg = 0)
   — `background: true`, число отражает глобальный фон.
5. `buildCountryRows(week, globalOut, weekInput, overlay, prevSnapshot, ref, params)`
   → `{total, published, rows}`; имена стран — из `data/geo/countries.js`
   (vm-чтение, кэш) — единый источник имён.
6. Запись: опциональная часть `countries.js` (`s.countries = {...}`) +
   пересборка `week.js` через `loadWeekParts`/`renderWeekCombined`
   (`writeCountryLayer`). Набор частей по версии не меняется (v1 = 11, v2 = 17):
   часть presence-gated, `partOrder` допускает её только у v2 сверх полного набора.
7. Контракт: `js/data.js` `validateCountries(snapshot)` — опциональный блок;
   отсутствие валидно (все недели до гейта), битая форма — ошибка.
8. Сайт: `js/sections/regions.js` `countryRows(snapshot)` → строки под-блока
   «По странам» (сортировка по |Δ|, пометка `country.background`); без блока
   под-блок скрыт. Публичный слой: новый файл `data/public/countries/<week>.json`
   (конверт как у `weeks/<week>.json`, без `name`, с `sensitivity` недели —
   отдельной страновой чувствительности не считается), схема
   `countries.schema.json`; `PUBLIC_SCHEMA_VERSION` прежний, новых полей нет.

## 4. Форвардные якоря

- Схема: `calc/input/anchors/forward-<week>.json` —
  `{week, expectedCluster, rationale, author, committedAt, sources[{url}]}`.
- Валидатор: `calc/forward-anchors.js` `validateForwardAnchor(obj) → errors[]`.
- `CLUSTERS` = id из `SCALE` (`js/risk.js`) + `unknown`; `unknown` требует непустой
  `rationale` (отказ редактора — законная запись).
- Файл пишет редактор до `--write` недели; после коммита не редактируется.
- `calc/calibrate.js` `loadAnchors` пропускает файлы без объекта `input.anchor` — иначе
  форвардный файл уронил бы сетку `k`.
- Факт (`observedCluster`) живёт в таблице `docs/calibration-journal.md`, не в файле;
  порядок «файл раньше записи» проверяется по `git log` (автоматических ворот нет).
  Публичный журнал (`calc/ledger.js` → `data/public/forecast-ledger.json`, ADR 0064)
  сверяет те же якоря с фактом и проверяет порядок по git, но запись недели не
  блокирует: нарушение видно как `verified: false`.
- Параметры `k`, веса, `severityValues`, пороги §9 заморожены до 8 строк таблицы.
- На 2026-10-18 файлов нет ни одного; каталог содержит только 10 модельных якорей.

## 5. Контракт снапшота и `week.js`

- Валидация — `js/data.js`: `validate(snapshot)` + `validateQuality(snapshot, errors)`.
- Обязательны `published`, `through`, `methodology`, `dataState`, набор регионов
  по `regions_taxonomy`, ровно 3 драйвера, тренд ровно 12 точек.
- Опциональные поля: `coverageCriteria {covered,total,uncovered}`, `sensitivity`,
  `precursor {value, signalingSubgroups}`, `background` у региона, `countries`
  (`{total, published, rows}` по ISO2, ADR 0067 — опциональная часть, presence-gated).
- `precursor` проверяется в `validateQuality` как поле верхнего уровня снапшота:
  целые `value 0..100`, `signalingSubgroups 0..8`; отсутствие валидно, битая форма —
  ошибка контракта, сайт на битой форме не падает.
- Набор частей зависит от таксономии: v1 = 11 файлов, v2 = 17
  (`weekPartFiles`); `WEEK_PART_FILES` заморожен на v1.
- `week.js` — производная от частей; сайт грузит только её
  (`data/latest.js`, `document.write`, 12 запросов). Руками не править;
  пересобрать — `node calc/migrate-week-combined.js`.

## 6. Сайт: секции и хосты

- `js/render.js` — `SECTIONS` (11): `hero, precursor, trust, contribution, regions,
  trend, drivers, states, history, methodology, feedback`.
- `contribution` — «Почему индекс изменился» (ADR 0062), между trust и regions;
  читает `window.CI_ANALYSIS` из `data/analysis.js` (зеркало `data/public/*`,
  которое сайт по конвенции не грузит): водопад, разложение по драйверам,
  «что бы изменило оценку». Нет записи недели — секция скрыта целиком.
- Видимых на странице 9: у `history` нет хоста `[data-section="history"]` — его
  `render` обновляет только футер `[data-role="footer-next"]`.
- `states` пишет в `[data-role="critical-panel"]` (не в `section-body`).
- `precursor` — `<section class="section precursor-section" hidden>` с хостом
  `[data-section="precursor"]` между hero и trust; скрыт по умолчанию, `render` снимает
  `hidden` только когда поле слоя валидно.
- `hero` — секция `#overview` без `[data-section]`; остальные хосты —
  `[data-section="<id>"]` в одноимённых секциях `index.html`.
- Порядок `SECTIONS` — порядок рендера и порядок блоков; пин —
  `tests/precursor-ui.test.js`.

## 7. Границы модулей

| Модуль | Владеет | Не знает |
|---|---|---|
| `calc/engine.js` | формулы §4–§7, `CRITERIA`, `D9_SUBGROUPS`, `validate` входа, размерностно-нейтральные `attributedSignals`/`attributedIndex` (обёртки `regionalSignals`/`regionalIndex`) | диска, сети, сайта |
| `calc/country-layer.js` | страновой слой: оверлей, `validateCountryOverlay`, `buildCountryRows`, `writeCountryLayer` | сайта, публичного слоя |
| `calc/params.js` | все числа и версия методологии | расчёта |
| `calc/week-step.js` | шаг недели, `taxonomyForWeek`, `loadSnapshotPart`, `nextChainState` | ворот записи, CLI |
| `calc/calc.js` | CLI, ворота, запись, рендер снапшотов | формул (зовёт движок и week-step) |
| `calc/precursor.js` | одно правило «драйверы → слой Д9» | индекса, `q`, инерции, диска |
| `calc/forward-anchors.js` | схему форвардного ожидания | калибровки, диска, сети |
| `calc/calibrate.js` | калибровку `k` на якорях | форвардных файлов (пропускает) |
| `js/data.js` | контракт снапшота, `PRECURSOR_SUBGROUPS`, таксономии | расчёта |
| `js/sections/precursor.js` | отображение слоя Д9 | вычисления значения |
| `js/risk.js` | шкалу состояний `SCALE` | данных недели |

## 8. Конвенции

- Числа — только в `calc/params.js`; округление — на выходе, внутренние float текут
  в инерцию следующей недели.
- Поля снапшота добавляются forward-only: старые недели остаются валидными,
  бэкфилл — отдельное решение, а не побочный эффект.
- Версия методологии и версия таксономии регионов — независимые оси; `methodology`
  не поднимается ради нового справочного поля.
- Пользовательский текст — только `js/i18n.js` (RU-only); DOM — `createElement` +
  `textContent`; цвета — токены `css/styles.css`.
- После правки `js/**` — `node build.js`; бандлы коммитятся, руками не правятся.
- Тесты идут против исходников; `node --test` из корня без аргументов.
- Числовые пины реальных недель (`tests/data.test.js`, `tests/precursor.test.js`)
  обновляются вместе с пересчётом — это конвенция, не баг.

## 9. Где больно

- `weekly-calc.yml` проверяет семь v1-сидов (`region-europe`), для v2-недель список
  устарел — гейт тихо пропустит новую неделю ≥ 10-18.
- `precursor` нельзя проверить на живом сайте: поля ещё нет в `data/`; проверяется
  прогоном `runWeek` и тестами.
- Форвардный журнал пуст: таблица в журнале и `calc/input/anchors/forward-*` появятся
  только с первой неделей, записанной после ADR 0049.
- ADR 0046 (поле `intersection`) пришёл из параллельного прогона: нумерация 0047–0049
  сдвинута относительно него, ссылки в текстах это учитывают.
- `docs/jev-classification.md` всё ещё говорит «45 критериев» — документ под 46/3.0
  не обновлялся.

## 10. Публичный слой и дайджест

Вторая, «витринная» половина пайплайна: снапшот недели → проекция для внешних
потребителей → статические файлы → страницы. Обе ветки производны от тех же частей
недели, что и `week.js`, и ни в один момент не меняют сам снапшот.

### Поток данных

```
data/<week>/{global,regions,trend,drivers,sources,region-*}.js
  └─ loadWeekParts / renderWeekCombined (calc/week-step.js)
       └─ loadSnapshotFromDisk + validate (js/data.js)        ← единственный вход обеих веток
            ├─ calc/contributions.js ─ analyseWeek / buildWaterfall
            │    (driver_breakdown, waterfall, what_would_change; вход — calc/input/<week>.json)
            │       └─ calc/public-export.js ─ datasetOf / buildDataset ─┬─ data/public/index.json
            │                                                    ├─ data/public/latest.json
            │                                                    ├─ data/public/weeks/<week>.json
            │                                                    ├─ data/public/cassandra-index.csv
            │                                                    ├─ data/public/trend.svg
            │                                                    ├─ data/public/{regions,criteria,methodology}.json
            │                                                    ├─ data/public/schema/v1/*.json
            │                                                    └─ changelog.json + changelog.html
            │                                                       (из calc/changelog-entries.js)
            └─ calc/digest.js ─ buildDigest(snapshot, {site, prev, chartUrl})
                 ├─ calc/digest-export.js ─ data/public/digest/<week>.json
                 │                           + data/public/digest/index.json + digest.html
                 └─ calc/digest-send.js ─ deliver ─┬─ Telegram Bot API (sendMessage)
                                                   └─ HTTP-эндпоинт письма (POST JSON)
                                                      └─ data/digest/sent.json (реестр)

calc/digest-send.js --preview ─ sendPreview ─ Telegram Bot API в чат редактора
                                  (TELEGRAM_EDITOR_CHAT_ID; sent.json не трогается)
```

`datasetOf` — узкая проекция (индекс, дельта, состояние, `q`, покрытие, регионы,
precursor, редакционные драйверы, сводка источников, тренд) плюс необязательная
модельная развёртка (ADR 0062: `driver_breakdown`, `waterfall`, `what_would_change`);
части снапшота в публичный формат не копируются целиком. Развёртку считает
`calc/contributions.js` из архивных входов `calc/input/<week>.json`, справочники и
JSON Schema — `calc/public-contract.js`; контракт описан в `docs/api.md`.

Сайт не грузит `data/public/*` (пин `tests/public-export.test.js`), поэтому те же
три поля развёртки публикуются зеркалом `data/analysis.js` (`window.CI_ANALYSIS`,
classic script для `file://`), его грузит `index.html` рядом с `data/latest.js`.
Секция `js/sections/contribution.js` читает зеркало и ничего не пересчитывает;
паритет зеркала с `index.json` пинит `tests/contribution-ui.test.js`. `data/public/*`, `digest.html`, `changelog.html` —
производные: ручная правка затирается следующей сборкой, а расхождение ловят
`tests/public-export.test.js`, `tests/changelog.test.js`, `tests/digest.test.js`.

### Границы

| Модуль | Владеет | Не знает |
|---|---|---|
| `calc/public-export.js` | проекцией снапшота, JSON/CSV/SVG, `changelog.html` | сайта, бандлов, `js/i18n.js` |
| `calc/changelog-entries.js` | курируемым списком изменений и его формой | данных недели |
| `calc/digest.js` | текстом выпуска (тема, text/html/telegram, 5 пунктов, 3 региона) | как и куда он уходит |
| `calc/digest-page.js` | `digest.html` и ссылкой на `index.json` | доставки, расписания |
| `calc/digest-export.js` | записью выпусков и архивного индекса (merge с диском) | каналов и секретов |
| `calc/digest-send.js` | каналами, резервом и реестром `sent.json` | текста выпуска (получает готовый) |

Обратной связи нет: сайт читает только `data/`, и ни один модуль `js/**` не грузит
`data/public/*` — публичный слой существует для внешних потребителей и SEO-страниц.

### Инварианты

- Порядок сборки недели: `calc.js --write` → `public-export.js --write` →
  `digest-export.js --write` → `node build.js` → `node --test`; так же в
  `weekly-calc.yml`, где публичный слой и дайджест пересобираются до тестов.
- Публичная схема версионируется отдельно (`PUBLIC_SCHEMA_VERSION = 1`), таймстемпов в
  выводе нет: повторный `--write` без изменения данных даёт тот же файл.
- `digest-export.js` по умолчанию берёт только недели текущей `PARAMS.methodology`;
  `--week` добавляет одну, архив на диске не теряется (merge по неделе).
- Идемпотентность доставки — пара «неделя+канал»: `--reserve` пишет `pending` до
  отправки, `--send` пропускает занятые каналы и снимает `pending` только по успешным;
  легаси-форма `sent.json` `{weeks:[...]}` читается как «оба канала отправлены».
- Публикация дайджеста — после одобрения редактора: `weekly-digest.yml` разделён на
  `prepare` (выпуск, архив, превью в чат редактора) и `publish` (job с
  `environment: digest-approval` и required reviewer). Резерв `sent.json` пишется
  только в `publish`, то есть после одобрения; environment настраивается в
  репозитории, файл workflow его не создаёт.
- Секреты не покидают процесс: в stderr — только имя переменной, значения вырезаются
  `redact` из любых сообщений.
- Статические страницы (`how-to-read.html`, `compare*.html`, `articles.html`) — вне
  бандла, без JS, с инлайн-текстом; `robots.txt`/`sitemap.xml` их перечисляют, а
  `tests/site-pages.test.js` требует, чтобы каждая страница корня была в `cp`-строке
  `deploy.yml` — иначе она просто не публикуется.

## 11. Публичная валидация и журнал прогнозов

Третья ветка производных: внешние ряды → сравнение с индексом → статический JSON
и страница. Снапшот недели не меняется, расчёт индекса не участвует.

### Поток данных

```
calc/backtest-fixtures/{gpr,acled,crisiswatch}.json   ← офлайн-фикстуры, правит редактор
  └─ calc/backtest.js ─ loadFixtures / alignWeekly / alignMonthly / cassandraSeries
       └─ buildValidation ─┬─ data/public/validation.json
                           │    (cassandra-index-validation, schema_version 1)
                           └─ calc/validation-page.js ─ validation.html
calc/ledger.js ─ buildLedger ─ data/public/forecast-ledger.json
                    │            (cassandra-index-forecast-ledger, schema_version 1)
                    └─ validation.html, раздел #ledger
```

`node calc/backtest.js --write` пишет все три файла — `data/public/validation.json`,
`data/public/forecast-ledger.json` и `validation.html` — и в сеть не ходит: вход
только диск (`data/<week>/week.js`, `calc/backtest-fixtures/`, якоря
`calc/input/anchors/forward-*.json`). Без `--write` CLI печатает сводку, диск не
трогает. Вывод детерминирован: timestamp внутри файлов нет, повторная запись даёт
те же байты.

### Границы

| Модуль | Владеет | Не знает |
|---|---|---|
| `calc/backtest.js` | выравниванием рядов, статистикой, сборкой `validation.json`, CLI | `validation.html`, журнала |
| `calc/validation-page.js` | разметкой `validation.html`, экранированием, текстами страницы | чтения фикстур, git |
| `calc/ledger.js` | правилом «ожидание → факт», чтением якорей, git-проверкой, `forecast-ledger.json` | внешних рядов, страницы |
| `calc/backtest-fixtures/*.json` | значениями и провенансом внешних рядов | логики |

### Инварианты

- Ряд индекса для сравнения — только опубликованные недели `PARAMS.methodology`
  (3.0); демо-недели 1.0 исключены. GPR выравнивается по окну `[W−6, W]`
  (нужно ≥ 4 дня), месячные ряды — по среднему индекса за месяц.
- Ниже `MIN_PAIRS = 6` пар коэффициент не публикуется: `value: null`,
  `status: 'insufficient'`, на странице — «—» с причиной. До 19 пар —
  `preliminary`.
- Журнал: `baseline` — наивный benchmark (кластер прошлой недели + `flat`),
  `editor` — якоря ADR 0049 с git-проверкой порядка; промахи публикуются списком,
  ретроспективные записи запрещены, при недоступной истории — `verified: null`.
- `data/public/validation.json`, `data/public/forecast-ledger.json`,
  `validation.html` — производные, руками не правятся; расхождение ловят
  `tests/backtest.test.js`, `tests/ledger.test.js`, `tests/validation-page.test.js`.
