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
5. `writeWeek` добавляет поле в `meta` и в `full` только при непустом значении.
6. `renderGlobal` пишет `s.precursor` в `global.js` условно (`if (meta.precursor)`).
7. `data/<week>/week.js` получает поле verbatim: `renderWeekCombined` конкатенирует тела
   частей, `global` идёт первым; отдельной части у слоя нет.
8. Сайт: `data/latest.js` грузит `week.js` → `js/app.js` → `render.renderAll` →
   `js/sections/precursor.js`.
9. `precursorFacts(snapshot)` возвращает `{value, signaling, total}` только для
   `dataState === 'published'`, непустого `global` и валидной формы поля; иначе `null`.
10. `render` пишет в `[data-section="precursor"]` и снимает/ставит `hidden` у
    `.precursor-section`; при `null` блок скрыт, а не показывает «0 %».
11. Тексты — `js/i18n.js` (`precursor.*`, `method.scale.*`); число подгрупп —
    `PRECURSOR_SUBGROUPS = 8` из `js/data.js`, паритет с `engine.D9_SUBGROUPS`.
12. Forward-only: в `data/` поля нет ни у одной из 12 недель; бэкфилл не выполняется.
    Регрессионный пин расчёта — `tests/precursor.test.js` (10-18 = `value: 50`).

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
- Параметры `k`, веса, `severityValues`, пороги §9 заморожены до 8 строк таблицы.
- На 2026-10-18 файлов нет ни одного; каталог содержит только 10 модельных якорей.

## 5. Контракт снапшота и `week.js`

- Валидация — `js/data.js`: `validate(snapshot)` + `validateQuality(snapshot, errors)`.
- Обязательны `published`, `through`, `methodology`, `dataState`, набор регионов
  по `regions_taxonomy`, ровно 3 драйвера, тренд ровно 12 точек.
- Опциональные поля: `coverageCriteria {covered,total,uncovered}`, `sensitivity`,
  `precursor {value, signalingSubgroups}`, `background` у региона.
- `precursor` проверяется в `validateQuality` как поле верхнего уровня снапшота:
  целые `value 0..100`, `signalingSubgroups 0..8`; отсутствие валидно, битая форма —
  ошибка контракта, сайт на битой форме не падает.
- Набор частей зависит от таксономии: v1 = 11 файлов, v2 = 17
  (`weekPartFiles`); `WEEK_PART_FILES` заморожен на v1.
- `week.js` — производная от частей; сайт грузит только её
  (`data/latest.js`, `document.write`, 12 запросов). Руками не править;
  пересобрать — `node calc/migrate-week-combined.js`.

## 6. Сайт: секции и хосты

- `js/render.js` — `SECTIONS` (10): `hero, precursor, trust, regions, trend, drivers,
  states, history, methodology, feedback`.
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
| `calc/engine.js` | формулы §4–§7, `CRITERIA`, `D9_SUBGROUPS`, `validate` входа | диска, сети, сайта |
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
