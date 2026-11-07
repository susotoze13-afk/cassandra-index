# Разведка кода для ревью методологии 4.0 (коммиты b2bca23..b60089c)

## 1. Карта модулей

**calc/ (пайплайн, ESM, чистый Node, диск/сеть только в CLI-швах):**
- `calc/engine.js` — ядро формул: скоры драйверов, `aggregateDrivers`, инерция, Structural Break, региональная модель §7 (ADR 0069), `round1`, `stateOf`, константы `CRITERIA`/`D9_SUBGROUPS`, `validate`.
- `calc/week-step.js` — шаг недели: `taxonomyForWeek`, `loadSnapshotPart` (vm), `computeWeek`, `classifyPublication`, `nextChainState`.
- `calc/calc.js` — CLI цепочки + ворота (linkcheck → quotes → validate): `runWeek`, `writeWeek`, `renderGlobal`, `renderRegionFile`, `renderRegions`, `renderWeekCombined`, `weekPartFiles`, `loadWeekParts`, `collectSourceItems`, `validateInputSources`, `ignoredRegionalAttribution` (R01.2).
- `calc/params.js` — `PARAMS`: единственный источник чисел (k, weights, regionClamp, gamma, kappa, states, гейты taxonomyV2From/countryLayerFrom/precursorFrom/blindReasonFrom/regionHypothesisFrom/regionHypothesisThreshold).
- `calc/country-layer.js` — страновой слой (ADR 0067): `loadCountryOverlay`, `validateCountryOverlay`, `mergeCountryAttribution`, `expandRegionAttribution` (ADR 0068 «регион ⊇ страна»), `countrySignals`/`countryIndex` (обёртки attributed* с attr='countries'), `buildCountryRows`, `renderCountryPart`, `writeCountryLayer` (+ диск).
- `calc/precursor.js`, `calc/forward-anchors.js`, `calc/sensitivity.js`, `calc/linkcheck.js`, `calc/quotes.js`, `calc/classify.js`, `calibrate.js`, `contributions.js` — чистые модули-швы.
- `calc/public-contract.js` — `PUBLIC_SCHEMA_VERSION = 2`, `schemaDocs()` (12 схем), `regionsDoc/criteriaDoc/methodologyDoc/weekDoc/countriesDoc`.
- `calc/public-export.js`, `calc/digest*.js`, `calc/backtest.js`, `calc/ledger.js` — производные CLI.

**js/ (сайт, ESM-исходники → бандлы build.js):**
- `js/data.js` — контракт снапшотов: `REGION_TAXONOMIES`, `regionIdsFor`, `CURRENT_TAXONOMY='2.0'`, `TAXONOMY_V2_FROM`, `validate`, `validateQuality`, `validateCountries`, `PRECURSOR_SUBGROUPS = 8`.
- `js/region.js` — `REGIONS_V1` (6) / `REGIONS_V2` (12), `regionForTaxonomy`, `search(q, catalog?)`.
- `js/sections/` — секции: `regions.js` (`rankedRegions`, `formatIndex`, `countryRows`), `hero.js` (`isBackgroundRegion`, пикер), `trend.js` (`selectMethodology`, `summaryTextV2`, `axisLabels`), `history.js`, `precursor.js` (`precursorFacts`), `trust.js` (`trustFacts`), `contribution.js`, `methodology.js`, `feedback.js`. Регистрация в `js/render.js` (10 секций, 9 видимых).
- `js/article.js` + `article-build.js` — рубрика, принимает дробные индексы/дельты (ADR 0070).

## 2. Конвенции

- ESM везде, кроме CommonJS `build.js`; ноль зависимостей, только stdlib.
- Чистые модули без DOM/диска/сети — швы с инъекцией (fetchImpl, inject, catalog, rootDir) тестируются `node --test`; диск/сеть — только в CLI-функциях.
- Вся пользовательская строка — через `js/i18n.js` (RU); DOM через createElement + textContent; цвета — CSS-токены; округление только на выходе (глобал целый roundHalfUp, регион/страна `round1`).
- Пины поведения литеральными фикстурами в `tests/` (например `CHAIN_GLOBAL_PIN` в data.test.js) — обновлять при пересчёте.

## 3. Команды

- `node --test` (из корня, без аргументов; форма `node --test tests/` падает на Windows/Node 24) — ~89 файлов.
- `node build.js` — обязателен после любой правки `js/**` (бандлы коммитятся).
- `node calc/calc.js <week>` / `--write [недели]` — расчёт + запись (ворота: quotes → linkcheck → validate).
- `node calc/public-export.js --write`, `node calc/migrate-week-combined.js [недели]`, `node calc/check-sources.js`, `node article-build.js [--write]`.

## 4. Имена, затронутые диффом 4.0

- `engine.round1(x)` — одна десятичная, регион/страна (engine.js:22).
- `engine.stateOf(index, params)` — gapless по верхней границе (`index <= s.max`, ADR 0071) (engine.js:30).
- `engine.attributedSignals(criteria, ids, params, week, attr='regions'|'countries')` — Δ_region §7: Σ w_d·shrink_d·(s_reg−s_glob)/Σ w_d, допустимые Д1/Д3/Д5–Д8 + Д9.3, эпсилон `regionHypothesisThreshold` (1e-9) на обе ноги через `regionalHypothesisParams`, clamp ±`regionClamp`; вернул `deltaRegion` (engine.js:648).
- `engine.attributedIndex(global, unit, params)` — internal = gInternal + e_r·Δ_region (e_r = γ·eStruct+(1−γ)·eDyn), зеркалирование при шоке (κ-пол, `mirrored`), слепая ветка nReg=0: offset от prevIndex−prevGlobal, `background:true` (engine.js:512).
- `engine.regionalSignals` / `regionalIndex` — тонкие обёртки attributed* (engine.js:773).
- `calc.weekPartFiles(taxonomy)` — v1 = 11 / v2 = 17 частей (calc.js:286).
- `calc.renderWeekCombined(week, parts)` — строгая форма части (5+ строк, префикс `var s = `), склейка IIFE; **достаёт `signals` из тела части `regions` regex'ом `s\.regions = (\{...\})` и JSON.parse, затем генерирует строки `s.regions[id].signals = ...` в хвост** (calc.js:346).
- `calc.renderGlobal` — `s.regions_taxonomy`, `coverageCriteria`, `precursor` (calc.js:417); `calc.renderRegionFile` — переносит drivers/confidence прежнего файла (calc.js:454).
- `country-layer.buildCountryRows(...)` — prevIndex: страна → регион → prevGlobal (country-layer.js:284); `expandRegionAttribution` — инвариант ADR 0068.
- `sections/regions.rankedRegions(snapshot)` — набор по `regionForTaxonomy(regions_taxonomy)`, сортировка по индексу убыванию (при равенстве — по id, подтверждено по коду regions.js:24-40); `orderedForDisplay(rows, personal)` — личный регион первой строкой; `formatIndex(value)` — 73→«73», 72.4→«72.4»; `countryRows(snapshot)` — под-блок «По странам».
- `sections/trend.selectMethodology(points, version='4.0')` — отсечение не-4.0; `summaryTextV2(lang, points, version)` — плейсхолдер `{version}`.
- `sections/hero.isBackgroundRegion(rdata)` — только `background === true`.
- `public-contract` — `PUBLIC_SCHEMA_VERSION = 2`, дробная точность регионов/стран в схемах.

## 5. Тонкие места (по коду)

1. **renderWeekCombined парсит JSON из текстовой части `regions`** regex'ом `^\s*s\.regions = (\{[\s\S]*\});?\s*$` — хрупко к форме записи (однострочный объект с отступом 2, точка с запятой опциональна); несовпадение regex или JSON.parse → signalsTail пуст, **молча, без ошибки** (calc.js:~380–400).
2. **stateOf зависит от порядка `PARAMS.states`** — gapless по `index <= s.max`, массив должен быть отсортирован по max; добавление/перестановка состояния меняет классификацию граничных индексов.
3. **attributedIndex слепая ветка** — `delta = round1(index − prevIndex)` либо глобальная дельта при отсутствии prevIndex; при наследовании офсета дельта слепого региона по построению ≈ глобальной (честно через `background:true`, не баг).
4. **weekPartFiles v2 = 17 частей**, `loadWeekParts` подхватывает `countries.js` по наличию (presence-gated, ADR 0067); рассинхрон набора и `regions_taxonomy` → явный throw.
5. **Эпсилон покрытия** (`regionHypothesisThreshold` = 1e-9, forward-only с `regionHypothesisFrom`) применяется к обеим ногам Δ_region — пересчёт старых недель другим порогом меняет регионы.
6. **`deltaRegion` — внутренняя величина** (ADR 0072): не должна утекать в `data/public/**` и `data/analysis.js` — сторож `tests/regional-deviation.test.js`.
7. **writeCountryLayer не обновляет CI_ASSET_REV** — после ручной миграции нужен `updateLatestRev` (calc/asset-rev.js), иначе падает `tests/asset-rev.test.js`.
8. **Кириллица в консоли Windows показывается мojibake'ом** — файлы UTF-8 в норме, это кодовая страница терминала, не повреждение.
9. Фикстуры-пины (`tests/data.test.js` CHAIN_GLOBAL_PIN, sensitivity 10-04 = 5.4, regional-deviation 11-01 71.3…72.9) — ломаются при любом пересчёте, обновлять осознанно.
10. `weekly-calc.yml` гейт сидов заточен на v1 (ждёт `region-europe`) — v2-недели проходят тихо; чинить отдельным таском.

