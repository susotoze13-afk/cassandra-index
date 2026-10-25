# notes.md — разведка кодовой базы под страновой слой

Записано 2026-10-25 оркестратором прогона (субагент-разведчик дважды прерывался — разведка выполнена оркестратором напрямую). Факты о текущем коде, без оценок.

## 1. calc/engine.js

- `CRITERIA` (строка 682): объект `id -> { driver, dir: 'esc'|'deesc', scale: 'count'|'ordinal'|'binary' }`. 46 критериев, D4.6 — ordinal (методология 3.0).
- `D9_SUBGROUPS = ['D1'… нет, 'D9.1'…'D9.7']` (8 подгрупп).
- `buildDriversCore(criteriaIn, confidenceLevels, params)` (строка 164) — маппинг критериев → 9 драйверов; используют calc.js и calibrate.js.
- `regionalSignals(criteria, regionIds, params, week)` (строка 621): возвращает `{ [regionId]: { nReg, eStruct, eDyn, hasDeescSignals, iWith, iWithout } }` только для регионов с ≥1 сигналом.
  - Eligible-фильтр: драйверы Д2/Д4 исключены, Д9 — только D9.3.
  - Сигнал региона = покрытая (`covered:true`) запись с непустым `regions[]`, включающим регион; `intersection: true` пропускается полностью (ADR 0046).
  - `nReg` = число записей-сигналов; `eStruct = regionEstructDefault`; `eDyn = nReg / nCovered`; гипотетики `iWith`/`iWithout` считаются с порогом из `regionalHypothesisParams` (гейт `regionHypothesisFrom`).
  - Дубли id внутри `regions[]` одной записи засчитываются дважды (известная неблокирующая находка).
- `regionalIndex(global, region, params)` (строка 502):
  - nReg ≤ 0 (слепая ветка): `internal = gInternal + clamp(prevIndex − prevGlobal, ±regionClamp)`, `background: true`; delta = index − prevIndex (при null prevIndex — глобальная delta).
  - nReg > 0: `e_r = γ·eStruct + (1−γ)·eDyn`, `m = nReg/(nReg+n0)`, `deltaRegion = clamp(iWith − iWithout, ±clamp)`, `internal = gInternal + e_r·m·deltaRegion`; зеркалирование шока при `g.delta ≥ regionShockDelta && !hasDeescSignals` (floor = κ·eStruct·gInternal). `prevIndex` null → подставляется `prevGlobal` (ADR 0038), delta всегда число.
  - Возвращает `{ index, state, delta, internal, background, mirrored }`.
- `validate(input, params, regionIds)` (строка 765): проверяет форму входа; `regions[]` валидируется по whitelist (тип + членство, дубли НЕ отклоняются).

## 2. calc/params.js

Ключи `PARAMS`: `version: '1.0'`, `methodology: '3.0'`, `taxonomyV2From: '2026-10-18'`, `weights` (Д1–Д8 по 0.1175, Д9 0.06), `alpha 0.5`, `lambda 0.6`, `rho 0.25`, `U_abs 0.025`, `gamma 0.5`, `kappa 0.85`, `k 1.95`, `betaUp 0.9`, `betaDown 0.5`, `structuralBreak {beta 0.8, prev 0.2, weeks 2}`, `n0 5`, `regionClamp 40`, `regionShockDelta 15`, `regionEstructDefault 0.5`, `coverageThreshold 0.5`, `regionHypothesisThreshold 1e-9`, `regionHypothesisFrom '2026-08-30'`, `precursorFrom '2026-10-25'`, `d9GrowthLimit 0.3`, `confidence {high 1.0, medium 0.7, low 0.4}`, `capCount 5`, `severityValues [0.2,0.5,1.0,2.0]`, `dataCoverage {insufficient 0.4, reduced 0.2, d1d2Required}`, `clusters [A-mainstream, B-state-media, C-registries, D-satellite-osint, E-field-osint, F-financial]`, `independenceGateFrom '2026-10-11'`, `coreSources` (9 доменов), `coreMinDomains 4`, `sensitivityThreshold 5`, `blindReasonFrom '2026-10-25'`, `backfillWindow 4`, `backfillCriteria` (39 id), `flashTriggers`, `qualityThresholds`, `ipConfidenceLadder`, `states` (6 состояний §9).

## 3. calc/week-step.js

- `computeWeek(input, state, params)` → `{ week, drivers, ctx, global, classification, regions, sbLeft, sbReason }` — чистый шаг недели.
- `taxonomyForWeek(week)`: `'2.0'` от `PARAMS.taxonomyV2From`, иначе `'1.0'`.
- `loadSnapshotPart(week, name)` — vm-исполнение части снапшота, без DOM.
- `nextChainState`, `classifyPublication` — состояние цепочки и классификация публикации.

## 4. calc/calc.js

- `RECALC_WEEKS` — 9 недель, уже включает `'2026-10-25'` (параллельная сессия добавила и посчитала).
- `weekPartFiles(taxonomy)` (строка 277): `['global','regions', ...regionIdsFor(taxonomy).map(id=>'region-'+id), 'trend','drivers','sources']` — v1 = 11, v2 = 17 частей.
- `WEEK_PART_FILES = weekPartFiles('1.0')` — пин tests/week-combined.test.js, не менять.
- `taxonomyOfParts(parts)` — версия из global-части (регэксп по `regions_taxonomy`); `partOrder(parts)` — набор строго по версии, рассинхрон = явная ошибка.
- `renderWeekCombined(week, parts)` — IIFE-обёртка: тела частей (строки 3..-1 после проверки шаблона) конкатенируются в `window.CI_DATA.snapshots[week]`.
- `loadWeekParts(week)` — читает global.js → версия → части своего набора с диска; null при отсутствии.
- `renderGlobal(week, snap, globalOut, meta)` — пишет `s.global/published/through/methodology/regions_taxonomy/dataState/q/nullWeight/coverage/confidence` + опционально `preview/incompleteCoverage/sensitivity/precursor/coverageCriteria/recalc`.
- `renderRegions(week, regions)` → `s.regions = {...}`; `renderRegionFile` переносит `confidence`/`drivers` из прежнего файла (mergedRegion), пересчитывает только index/delta/status/background.
- `runWeek(week, state)` (строка 447) — маппинг → агрегация → регионы → классификация + sensitivity/precursor/intersections/debt.
- `ignoredRegionalAttribution(criteria)` — R01.2: сортированные id Д2/Д4/Д9-кроме-D9.3 с непустым `regions[]`.
- `validateInputSources`, `collectSourceItems` — схема R55 и сбор URL для linkcheck.
- CLI: `node calc/calc.js <week>` (печать), `--write [недели…]` (запись + ворота ссылок/контракта).

## 5. data/<неделя>/

Неделя 2026-10-25 (v2) на диске полностью: 17 частей + week.js. `global.js`: index 68, delta 4, q 1, sensitivity 1.1, precursor {value 50, signalingSubgroups 5}, coverageCriteria {covered 36, total 46}, regions_taxonomy '2.0', dataState 'published'. Неделя 2026-10-18 имеет дополнительно `article.js` (часть v2-набора? нет — в списке parts нет article; это extra-файл, weekPartFiles его не включает).

## 6. js/data.js

- `REGION_TAXONOMIES {'1.0','2.0'}`, `regionIdsFor(taxonomy='1.0')` (неизвестная → v1), `CURRENT_TAXONOMY = '2.0'`, `TAXONOMY_V2_FROM = '2026-10-18'`, `REGION_IDS` = v2 (12 id).
- `validate(snapshot)`: проверяет global `{index, delta}`, набор регионов ровно `regionIdsFor(snapshot.regions_taxonomy ?? '1.0')` (строка версии обязана быть '1.0'|'2.0'), `regions.<id>.background` опциональный boolean, trend ровно 12 точек, источники по `isSource`.
- `validateQuality`: q/nullWeight/confidence/coverage/preview/recalc + опциональные `coverageCriteria` (covered≤total) и `precursor`.
- `week/latest/listWeeks` — чтение снапшотов.

## 7. js/sections/regions.js + hero.js

- `rankedRegions(snapshot)` — набор по `region.regionForTaxonomy(snapshot.regions_taxonomy)`, строки с нечисловой delta пропускаются, сортировка по |Δ|.
- Рендер: семантический ol/li, `.region-row--pinned`, `backgroundNote` → `region.background` (CSS `.region-background`, --text-muted), аккордеон источников `buildSourcesAccordion` из drivers.js.
- hero.js: `isBackgroundRegion(rdata)` (`background === true`), `refineRegionFromCoords`, `displayedPlace`.
- render.js — реестр 10 секций; секции получают снапшот через renderAll.

## 8–9. js/render.js, js/i18n.js

- render.js: регистрация секций по id, хосты `[data-section="…"]`.
- i18n.js: словарь `DICTS.ru` только ru; `t(lang, key, params?)`; ключи вида `region.background`, `trust.cluster.A-mainstream`; плюрализация ICU-подмножеством. Правило: вся пользовательская строка — только через словарь.

## 10. calc/public-export.js / public-contract.js

- `PUBLIC_SCHEMA_VERSION = 1`. `writePublicData` пишет: `index.json`, `latest.json`, `cassandra-index.csv`, `trend.svg`, `changelog.json`, `regions.json`, `criteria.json`, `methodology.json`, `data/analysis.js` (зеркало для сайта), `changelog.html`, `weeks/<неделя>.json` (через `weekDoc`), `schema/v1/*.json` (через `schemaDocs()`).
- `schemaDocs()`/`SCHEMA_NAMES` в public-contract.js — 11 схем; справочники `regionsDoc/criteriaDoc/methodologyDoc/weekDoc`.
- Сторож tests/public-contract.test.js: каждый `data/public/**/*.json` обязан иметь схему и строку в docs/api.md (матч `apiMentionsPath`, вложенный URL-префикс не засчитывается).

## 11. docs/api.md

Раздел «Эндпоинты» — таблица `| Путь | Что отдаёт | Обновляется |`; пути в backtick-строках вида `` `data/public/weeks/<YYYY-MM-DD>.json` ``.

## 12. data/regions/reference.json

- Корень: `taxonomy_version: '2.0'`, `taxonomies: {'1.0','2.0'}`, каждая — `regions[]` с полями `id`, `name`, `countries` (массив ISO2!), `adminCenter`.
- v2: russia-belarus → `['RU','BY']`; ukraine-moldova → `['UA','MD']`; всего 12 регионов.

## 13. Тесты (что пинят)

- `tests/region.test.js` — две таксономии, `regionForTaxonomy`, поиск.
- `tests/regional-signals.test.js` — агрегация атрибуции.
- `tests/regions.test.js` — региональная модель.
- `tests/data.test.js` — точные выходы недель цепочки (index/delta/q) + региональный охват; фикстура пересчитывается после пересчёта.
- `tests/week-combined.test.js` — `renderWeekCombined` на синтетике, `taxonomyForWeek`/`weekPartFiles`, v1=11/v2=17, рассинхрон → ошибка.
- `tests/week-combined-parity.test.js` — паритет week.js ↔ дисковые части для всех неделей `weekPartFiles(taxonomyForWeek(week))`.
- `tests/page-smoke.test.js` — каждый снапшот проходит `validate` и даёт витрину.
- `tests/public-contract.test.js` — схемы, api.md-строки, nullable-мутации, пин MAX_DISCREPANCIES.
- `tests/methodology-criteria.test.js` — паритет criteria.js ↔ engine.CRITERIA.
- `tests/regional-hypothesis.test.js` — порог из params.
- `tests/latest-loader.test.js` — latest.js грузит только week.js, 12 → 13 недель (обновится).
- `tests/indices-audit.test.js` — байтовый пин матрицы/страницы аудита.

## 14. build.js

CommonJS-сборщик ESM `js/**` → classic scripts `js/bundle*.js` (namespace `window.CI`; входы app+share и i18n+ui). После ЛЮБОЙ правки `js/**` обязателен `node build.js`; бандлы коммитятся.

## 15. docs/adr/

Последний занятый номер: **0066**. Следующий свободный: **0067**. Релевантные: 0022 (трактовки regionalSignals), 0028 (таксономия v2), 0033 (витрина доверия/coverageCriteria), 0038 (дельта региона без истории), 0040 (blindReasons), 0062 (публичный контракт), 0065 (порог гипотетик).

## 16. Команды

- Тесты: `node --test` (из корня, без аргументов; 843+ passed).
- Сборка бандла: `node build.js`.
- Расчёт недели: `node calc/calc.js <неделя>` / `--write`.
- Публичный слой: `node calc/public-export.js --write`.
- Страница аудита: `node indices-audit-build.js --write`.

## Точки касания странового слоя

- **engine.js**: обобщить `regionalSignals`/`regionalIndex` (размерностно-нейтральное ядро) или добавить `countrySignals`/`countryIndex` поверх; валидация `countries[]` (ISO2-whitelist, дедупликация).
- **params.js**: `countryLayerFrom: '2026-10-25'`, возможно `countryCoverageFloor`.
- **calc/calc.js + week-step.js**: `computeWeek` — расчёт стран; `renderCountryFile`; `weekPartFiles` — набор v2 недель с гейтом; `partOrder`/`loadWeekParts`/`renderWeekCombined` — опциональная часть `countries`; `renderGlobal` — флаг слоя.
- **Новый модуль**: чтение оверлея `calc/input/countries/<неделя>.json` (атрибуция), валидация, слияние с критериями.
- **js/data.js**: `COUNTRY_IDS`/валидация блока `countries` снапшота.
- **js/sections/regions.js** (+ hero): страновой блок, пометка слепой страны.
- **js/i18n.js**: ключи `country.*`.
- **public-export.js / public-contract.js**: `data/public/countries/<неделя>.json` + схема; **не** менять поля существующих файлов (PUBLIC_SCHEMA_VERSION = 1, договорённость).
- **docs/api.md**: строка нового пути + схема.
- **indices-audit**: матрица `Ст ✔`, развёртка, таблица «Страны» (RU/UA → `страна`), «Атрибуты», пересборка + пины тестов.
- **Документы**: ADR 0067, methodology.json doc, how-to-read.html абзац, AGENTS.md, docs/architecture.md.

## Риски

1. Набор частей week.js: 17 → 18 для недель ≥ гейта ломает `weekPartFiles` как чистую функцию версии; паритетные тесты. Решение: опциональная часть, presence-gated + флаг в global-части.
2. Глобальный индекс и демо/пересчитанная история не должны сдвинуться (пин tests/data.test.js).
3. Дубли id внутри атрибуции (известный баг) — новая валидация должна отклонять дубли в `countries[]`.
4. `PUBLIC_SCHEMA_VERSION` не растёт — новый файл, не новое поле.
5. Неделя 2026-10-25 принадлежит параллельной сессии: вход не редактировать, трогать только новую часть countries + пересборку week.js из дисковых частей.
6. Сторож api.md: новый публичный файл без схемы/строки роняет tests/public-contract.test.js.

## Что в рабочем дереве после прошлой сборки

Коммитов после `70f09c0 (Autopilot: сборка сдана)` нет. Грязные файлы — работа параллельной сессии (неделя 2026-10-25): `calc/calc.js`, `calc/live-check.js`, `data/analysis.js`, `data/audit.jsonl`, `data/latest.js`, `data/public/*`, `digest.html`, `validation.html`, `tests/ledger.test.js`, `tests/live-check.test.js`; новые: `calc/input/2026-10-25.json`, `data/2026-10-25/` (17 частей + week.js, неделя посчитана: index 68, delta 4, q 1), `data/public/digest/2026-10-25.json`, `data/public/weeks/2026-10-25.json`. Не трогать, не коммитить чужое.
