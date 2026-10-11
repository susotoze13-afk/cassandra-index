# Интерфейсы прогона region-delta-market-criterion

## Правила проекта (не выводить — принять как данность)

- Стек: чистый HTML/CSS/JS, ноль зависимостей (npm/CDN-импорт = ошибка сборки). Node ≥ 18. Всё ESM, кроме CommonJS `build.js`.
- Команды: тесты — `node --test` из корня БЕЗ аргументов (форма `node --test tests/` падает на Windows/Node 24); один файл — `node --test tests/<имя>.test.js`; сборка бандла — `node build.js` (обязательна после ЛЮБОЙ правки `js/**`, бандлы коммитятся).
- Тестовых фреймворков нет — `node:test` + `assert`.
- Округление только на выходе движка; внутренние float течёт в инерцию.
- DOM только через `document.createElement` + `textContent` для НОВОГО кода (соседние секции с их шаблонами не переписывать); все пользовательские строки — через словарь `js/i18n.js` (сайт одноязычный RU); цвета — только CSS-токены из `css/styles.css`, тон статуса — `risk.tone`.
- Лексика: без слов из Avoid-списка PRD §11.5, без «на пороге/на грани», без метафор часов.
- НЕ ТРОГАТЬ: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`, `METHODOLOGY.md` (read-only), `.autopilot/`, опубликованные данные `data/<недели>/` (не пересчитывать, не редактировать), `design/cassandra-index.pen`.
- Исполнители НЕ коммитят и НЕ пушат (git-команды запрещены, кроме status/diff/log) — коммитит только оркестратор.
- Детерминизм: никаких LLM/сетевых вызовов в коде; недостающая возможность → вернуть BLOCKED с описанием, а не ставить пакет.
- Формат ADR: `docs/adr/NNNN-slug.md`; последний занятый номер — 0020, этому прогону — 0021 (и 0022 при необходимости).
- Схема источника R55 и ворота независимости (forward-only от 2026-10-11) — действуют как есть, этот прогон их не меняет.

## Границы, решённые в спецификации (копия раздела спеки)

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `engine.regionalIndex` (существующий, не менять семантику) | формула регионального индекса, ветки слепой/сигнальный | `regionalIndex(global, region, params) -> {index, state, delta, internal, background, mirrored}` | клэмп ±regionClamp, зеркалирование шока |
| `engine.regionalSignals` (НОВЫЙ чистый шов) | агрегация `regions[]` критериев в сигналы региона | `regionalSignals(criteria, regionIds, params) -> { [regionId]: {nReg, eStruct, eDyn, hasDeescSignals, iWith, iWithout} }` — только для регионов с атрибуцией; пустой объект при отсутствии атрибуции | трактовку шкал §7, whitelist regionIds |
| `engine.buildDriversCore` (перенесён из calibrate.js, дедупликация) | маппинг входных критериев → драйверы (§4.2), общее ядро calibrate.js и calc.js | `buildDriversCore(criteriaIn, confidenceLevels, params)` | детали шкал критериев |
| `calc.js runWeek` (проводка) | выбор ветки региона: сигналы есть → nReg>0 (`background:false`), нет → слепая (как сейчас) | без новых публичных сигнатур | подстановку сигналов в regionalIndex |
| `renderRegions` / `renderRegionFile` (calc.js) | сериализация regions.js / region-*.js | флаг `background: boolean` в обоих файлах (true — слепой регион) | перенос drivers verbatim |
| `js/data.js` | контракт снапшота | validate: опциональный `regions.<id>.background: boolean`, дефолт при отсутствии — false | — |
| `js/sections/regions.js`, `js/sections/hero.js` | подача региона и его динамики | без новых публичных сигнатур | верстку пометки |

## Контрактные точки (согласованы между тасками, менять только через оркестратора)

- Запись региона в `regions.js`: `{index, delta, status, background}`; флаг обязателен в НОВЫХ записях, отсутствие в старых = false.
- Запись региона в `region-*.js`: те же поля + `confidence`, `drivers` (переносятся).
- Критерий входа может нести `regions?: string[]` — массив из whitelist 6 регионов (`europe, east-asia, middle-east, north-america, south-asia, africa` из js/data.js REGION_IDS); неизвестный id → ошибка validate входа.
- Новый i18n-ключ: `region.background` — текст пометки «Индекс отражает глобальный фон; региональных данных недостаточно» (RU, без запрещённой лексики).
- Покрытие недели сигнальным регионом: сайт при `background:true` НЕ показывает Δ как региональную (пометка вместо дельты); при `background:false` или отсутствии флага — как раньше.

## Что известно о коде (проверено исследованием)

- Слепая дельта региона по построению равна глобальной: `delta = gInternal − prevGlobal` (engine.js regionalIndex, ветка nReg≤0). Это не баг формулы, а ложь подачи — фиксим подачу и даём механизм.
- Дисковые недели: у всех регионов всех пересчитываемых недель дельта одинаковая (например 2026-10-04: −2 у всех 6). Тест `tests/calc-engine.test.js` (строки ~457–547) пинит blind-offset (eu/af delta равны) — тест меняется ТОЛЬКО если меняется семантика слепой ветки; семантика не меняется.
- `tests/data.test.js` валидирует дисковые снапшоты и пинит их числа — после изменений прогон должен остаться зелёным БЕЗ правки фикстур опубликованных недель (новые опциональные поля не должны ломать валидацию старых файлов).
- `rankedRegions` (js/sections/regions.js) пропускает записи с нечисловым delta — нечисловую дельту в данные НЕ вводим (контракт требует число), честность через флаг background.
- `formatDelta(null)` → '0', `deltaArrow(null)` → '→' — при background-ветке дельту в эти форматтеры не передаём вообще.
- Hero (js/sections/hero.js, setDelta ~57–64) и раскрытая карточка региона (~93–127) — второе и третье место подачи дельты.

## Из таска 01 — региональная динамика (calc)

- `engine.regionalSignals(criteria, regionIds, params) -> { [regionId]: {nReg, eStruct, eDyn, hasDeescSignals, iWith, iWithout} }` — только регионы с атрибуцией; `{}` без неё. Трактовки §7 — docs/adr/0022 (eStruct нейтральный 0.5, Д2/Д4/Д9-кроме-Д9.3 игнорируются).
- `engine.buildDriversCore(criteriaIn, confidenceLevels, params)` — общее ядро маппинга критериев → драйверы (calibrate.js делегирует).
- `PARAMS.regionEstructDefault = 0.5`.
- regions.js / region-*.js: `{index, delta, status, background}` (+confidence, drivers в region-*). js/data.js validate: background опционален, absent=false.
- Вход: `regions` у критерия ⊆ REGION_IDS.

## Из таска 02 — документация

- ADR 0021 (рыночный критерий → методология 3.0), ADR 0022 (трактовки regionalSignals), вопрос O6 в docs/preproduction-decisions.md §1.

## Из таска 03 — подача фона на сайте

- `hero.js: isBackgroundRegion(rdata) -> boolean` — true только при `background === true` (дефолт false). Импортируется regions.js (паттерн как formatDelta/deltaArrow).
- i18n-ключ `region.background` = «Индекс отражает глобальный фон; региональных данных недостаточно»; CSS-класс `.region-background` (--text-muted).
- При background:true Δ в форматтеры не передаётся; hero [data-role="region-background"], ranked-строка и buildDetail показывают пометку.
