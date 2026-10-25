# interfaces.md — границы проекта

## Правила проекта (из carried.md «Договорились — не пересматривать», дословно)

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
- `indices-audit.html` — **производная**: руками не править, только `node indices-audit-build.js --write`;
  источник — `docs/articles/indices-audit-app-source.md`, матрица в нём — единственный источник чисел.
- При расхождении числа страницы и статьи правится **приложение**, не статья (2026-10-24).
- Страница статическая, без клиентского JS: правило `createElement`/`textContent` к ней не применяется.

## Правила этого прогона

- Неделя 2026-10-25 и её вход принадлежат параллельной сессии: `calc/input/2026-10-25.json` и части
  `global/regions/region-*/trend/drivers/sources` не редактировать и не перезаписывать. Страновой
  слой пишет ТОЛЬКО новую часть `countries.js` и пересобирает `week.js` из дисковых частей (детерминировано).
- Чужие грязные файлы в коммиты не брать; коммитит только оркестратор, по одному на таск.

## Границы, решённые в спецификации

### `calc/engine.js` — размерностно-нейтральное ядро атрибуции

- `attributedSignals(criteria, ids, params, week, attr = 'regions')` — бывшая `regionalSignals`,
  обобщённая по имени атрибутивного поля (`regions` | `countries`). Логика, eligible-фильтр
  (Д2/Д4/Д9-кроме-D9.3 игнорируются), skip `intersection`, eStruct/eDyn, гипотетики — без изменений.
- `attributedIndex(global, unit, params)` — бывшая `regionalIndex` (формула §7 целиком, включая
  слепую ветку и ADR 0038). Только переименование параметра `region` → `unit`.
- `regionalSignals(...)` = `attributedSignals(..., 'regions')`; `regionalIndex(...)` = `attributedIndex(...)` —
  тонкие обёртки. **Пин: выходы регионов всех 13 недель байт-в-байт прежние.**
- `validate(input, params, regionIds)` — без изменений (страновая атрибуция вход не трогает:
  она живёт в оверлее, а не в `criteria`).

### `calc/country-layer.js` (новый модуль) — владелец странового слоя

- `loadCountryOverlay(week)` → объект оверлея или null (файла нет).
- `validateCountryOverlay(overlay, weekInput, ref)` → массив ошибок: неделя совпадает; критерий
  известен и `covered: true`; дедупликация id внутри `countries[]`; ISO2 ∈ whitelist версии недели
  (union `countries` регионов `taxonomies[версия]` из `data/regions/reference.json`); `basis` непустая;
  каждый `sources[]` — url из источников недели (вход критерия или top-level `sources`).
- `mergeCountryAttribution(weekInput, overlay)` → копия `criteria` с добавленным `countries[]`
  (исходный объект не мутируется).
- `countrySignals(mergedCriteria, countryIds, params, week)` → `attributedSignals(..., 'countries')`.
- `countryIndex(globalOut, unit, params)` → `attributedIndex(globalOut, unit, params)`;
  `prevIndex` страны: опубликованный индекс страны прошлой недели, иначе индекс её региона
  прошлой недели, иначе `prevGlobal` (наследование региона — решение ADR 0067).
- `buildCountryRows(week, globalOut, weekInput, overlay, prevSnapshot, ref, params)` →
  `{ total, published, rows }`; `total` — число стран версии недели; строка страны:
  `{ index, delta, background, region, signals, name: { ru, en } }`; имя — из `data/geo/countries.js`
  (vm-чтение, кэш; единый источник имён стран).
- `renderCountryPart(week, rows)` → текст части `countries.js` (`s.countries = {...}` в шаблоне генератора).
- `writeCountryLayer(week)` → запись `data/<week>/countries.js` + пересборка `week.js` через
  `loadWeekParts`/`renderWeekCombined`; глобальные/региональные части не трогает.
- Чистые швы без диска/сети — тестируются; диск — только в `writeCountryLayer`/`loadCountryOverlay`.

### `calc/calc.js` / `calc/week-step.js`

- `PARAMS.countryLayerFrom = '2026-10-25'` — гейт: слой пишется только для недель ≥ даты И при
  наличии валидного оверлея. Недели раньше — поведение прежнее.
- `weekPartFiles(taxonomy)` — без изменений (v1=11, v2=17). Часть `countries` — опциональная,
  presence-gated: `loadWeekParts` подхватывает `countries.js`, если файл есть; `partOrder` допускает
  её только у v2-недель и только как полный набор + `countries` (рассинхрон → прежняя явная ошибка).
- `writeWeek`: после записи основных частей, если неделя ≥ гейта и оверлей валиден —
  `writeCountryLayer(week)` (иначе предупреждение «оверлей отклонён: …»).
- `runWeek` печатает строку странового слоя: «страны: опубликовано M из N (RU, UA)».

### `calc/input/countries/<неделя>.json` (новый вход-оверлей)

```json
{ "week": "2026-10-25",
  "criteria": { "D1.4": { "countries": ["RU", "UA"],
      "basis": "…факт-основание одной строкой…",
      "sources": ["https://…"] } } }
```

### Снапшот: часть `countries.js` и блок `countries`

- `s.countries = { total, published, rows: { "<ISO2>": { index, delta, background, region, signals, name } } }`.
- `js/data.js`: `validateCountries(snapshot)` — опциональный блок; `rows` — объект, ключ `/^[A-Z]{2}$/`,
  `index 0..100`, `delta` число, `background` boolean, `region` — id региона версии снапшота,
  `signals` int ≥ 0, `name {ru,en}`; `published ≤ total`. Отсутствие блока — валидно (все недели до гейта).

### Публичный слой (новый файл, не поле)

- `data/public/countries/<YYYY-MM-DD>.json` — конверт как у `weeks/<неделя>.json`
  (schema/schema_version/site/license/week/methodology) + `countries` блок без `name`
  (имена — справочник) и с `sensitivity` недели (наследование неопределённости — раскрыто в описании).
- Схема `countries.schema.json` в `schemaDocs()`; строка в `docs/api.md`; пин tests/public-contract.test.js.
- `public-export.js --write` пишет файл для недель ≥ гейта, имеющих часть `countries.js`.

### Сайт

- `js/sections/regions.js`: чистый шов `countryRows(snapshot)` → массив строк `[{iso, index, delta,
  background, region, name}]` (null без блока); рендер странового под-блока в секции регионов:
  заголовок «По странам», строка = имя страны, индекс, Δ (для background — пометка `country.background`),
  сортировка по |Δ|; регистрация в render.js не меняется (блок внутри секции 'regions').
- `js/i18n.js`: ключи `country.*` (`country.title`, `country.background`, плюрализация `country.count`).
- `how-to-read.html`: абзац «что значит страновой балл и чего он не значит» (статика).

### Аудит (R04)

- `docs/articles/indices-audit-app-source.md`: матрица `Ст ✔`; строка в «Развёртке» с основанием
  (файл + сайт + дата); таблица «Страны»: RU и UA → `страна` (дата), остальные без изменений;
  строка в «Атрибуты».
- `docs/articles/habr-indices-audit.md` + `.plain.txt`: «шестое место» → 4-е, балл 58 → 70,
  разложение 8/20 → 20/20, раздел устойчивости переписан по выводу генератора, строка в
  «Что я поменял», видимая errata-запись. Пересборка: `node indices-audit-build.js --write`.

### Тестовые швы

- engine: эквивалентность регионов (13 недель, байт-пин), `attributedSignals` на synthetic
  для обоих attr, дедупликация в `countries[]` отклоняется.
- country-layer: валидация оверлея (позитив + негативы), `buildCountryRows` на synthetic
  (наследование региона при первой неделе), `renderCountryPart` shape.
- week-combined: набор 17/17+countries для гейт-недели, 17 без, рассинхрон → ошибка.
- parity: недели ≥ гейта парятся с частью countries; раньше — без.
- js/data: validateCountries позитив/негатив.
- public-contract: новый файл имеет схему и строку в api.md; nullable-мутации.
- UI: countryRows + ключи словаря.
- audit: пины tests/indices-audit.test.js обновлены генератором.

## Проверка — одна команда

### Выставлено таской 01

- `engine.attributedSignals(criteria, ids, params, week, attr='regions')`, `engine.attributedIndex(global, unit, params)`; `regionalSignals`/`regionalIndex` — обёртки (сигнатуры прежние).
- `PARAMS.countryLayerFrom = '2026-10-25'`.
- `calc/country-layer.js`: `loadCountryOverlay(week)→obj|null`, `validateCountryOverlay(overlay, weekInput, ref)→errors[]`, `mergeCountryAttribution(weekInput, overlay)→копия criteria`, `countrySignals(mergedCriteria, countryIds, params, week)`, `countryIndex(globalOut, unit, params)`, `buildCountryRows(week, globalOut, weekInput, overlay, prevSnapshot, ref, params)→{total, published, rows}`, `renderCountryPart(week, rows)→текст части`, `countryIdsFor(taxonomy, ref)`, `regionOfCountry(iso, taxonomy, ref)`.
- Строка страны: `{ index, delta, background, region, signals, name: { ru, en } }`.
- Не реализован таской 01 (сознательно): `writeCountryLayer` — требует presence-gated `loadWeekParts` в calc.js (таск 02/03).

### Выставлено таской 02

- `loadWeekParts(week, root=ROOT)` подхватывает `countries.js` по наличию; `partOrder` допускает `countries` только у v2 сверх полного набора.
- `writeCountryLayer(week, rows, root=ROOT)` — дозапись `countries.js` + пересборка `week.js`.
- `countryLayerForWeek(week, input, g, prevWeek)` → null | {errors} | {rows} — шов решения «считать ли слой недели».
- `js/data.js validateCountries(snapshot)` → {ok, errors}, подключён в `validate`.
- Печать: «страны: опубликовано M из N (ISO, …)».
- D## (показала сборка): пересборка `week.js` через `writeCountryLayer` обязана держать `CI_ASSET_REV` — паритет «CI_ASSET_REV = хеш всех week.js» пинит `tests/asset-rev.test.js` (механика параллельной сессии, `calc/asset-rev.js updateLatestRev`). Таск 03/ремонт обязан вызывать тот же шов.

### Выставлено таской 05

- `regions.js countryRows(snapshot)` → `[{iso, name, index, delta, background, region}]` | null.
- i18n: `country.title`, `country.background`, `country.count` (plural one/few/many).
- CSS: `.country-block/.country-title/.country-count/.country-list/.country-row/.country-name/.country-row-index/.country-background`.

- Полная проверка: `node --test` (из корня, без аргументов; форма `node --test tests/` падает на Windows/Node 24).
- Один файл: `node --test tests/<имя>.test.js`.
- Сборка бандла после правки `js/**`: `node build.js` (обязательно, бандлы коммитятся).
- Публичный слой: `node calc/public-export.js --write`. Страница аудита: `node indices-audit-build.js --write`.

## Не трогать

- `data/2026-10-25/` — кроме новой части `countries.js` и пересборки `week.js` (таска 03).
- `calc/input/2026-10-25.json` и все грязные файлы параллельной сессии (см. carried.md).
- `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`, `METHODOLOGY.md`, `.autopilot/` (кроме файлов этого прогона).
- `PARAMS` числа, кроме добавления `countryLayerFrom`.

## Тесты — команды

- `node --test` из корня (без аргументов). Один файл: `node --test tests/<имя>.test.js`.
- После правки `js/**`: `node build.js`. Публичный слой: `node calc/public-export.js --write`.
- Страница аудита: `node indices-audit-build.js --write`.
