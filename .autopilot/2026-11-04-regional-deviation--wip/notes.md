# Карта кода для ADR 0069 — региональное отклонение по драйверам

Составлено по рабочему дереву HEAD `b007f7a` (после сборки `0df0f03..HEAD`, 36 коммитов).
Только существующий код: где лежит, точные имена, что пинят тесты. Пересказ ADR 0069 —
в `docs/adr/0069-regional-deviation-by-driver.md`.

## Где живёт

### Расчётное ядро

- `calc/engine.js`
  - `roundHalfUp(x)` :16 — `Math.round`, только выходное округление (глобал — целое).
  - `stateOf(index, params)` :21 — `states.find(s => index >= s.min && index <= s.max)`
    (пороги из `PARAMS.states`, params.js:150–157). **Дыры на дробях**: 80.4/40.5/96.5 → `null`.
  - `hypotheticalIndex` :248 — удаляется по ADR (ветка iWith/iWithout).
  - `aggregateDrivers(drivers, params, ctx)` :379 → `{index, state, delta, internal, q, parts, structuralBreak}`.
  - `attributedIndex(global, unit, params)` :503 — формула §7 целиком:
    слепая ветка `nReg ≤ 0` :511; `n0 = p.n0 ?? PARAMS.n0`, `m = nReg/(nReg+n0)` :534–535;
    `deltaRegion = iWith − iWithout` :536; зеркало шока :538–549; `roundHalfUp` :550;
    `prevIndex → prevGlobal` :556 (ADR 0038).
  - `regionalIndex` :571 — тонкая обёртка над `attributedIndex`; `regionalHypothesisParams` :583.
  - `attributedSignals(criteria, ids, params, week, attr)` :631 — eligible-драйверы
    Д1/Д3/Д5/Д6/Д7/Д9.3 :637–643; пропуск `intersection` :652;
    выход `{nReg, eStruct, eDyn, hasDeescSignals, iWith, iWithout}` :673–682.
  - `regionalSignals(criteria, ids, params, week)` :690 — обёртка `attr='regions'`.
  - `CRITERIA` :699, `validate(input, params, regionIds)` :782 (whitelist-третий аргумент).
- `calc/params.js` — единственный источник чисел: `methodology: '3.0'` :20;
  веса D1–D8 `0.1175` / D9 `0.06` :28–31; `n0: 5` :43 (удаляется по ADR);
  `regionClamp: 40` :44; `regionShockDelta: 15` :45; `gamma`, `kappa`, `regionEstructDefault: 0.5`;
  `regionHypothesisThreshold`/`regionHypothesisFrom` (ADR 0065); `states` :150–157;
  `clusters`, `coreSources`, `independenceGateFrom`, `blindReasonFrom`, `backfill*`,
  `taxonomyV2From`, `precursorFrom`, `countryLayerFrom`, `sensitivityThreshold`.
- `calc/week-step.js` — `computeWeek(input, state, params, opts)` :113;
  `opts.regionCriteria` :117 (ADR 0068); цикл :132–143:
  `regions[id] = {index, delta, status, background}` — **сюда добавляется `signals`**;
  `taxonomyForWeek`, `classifyPublication`, `nextChainState`, `loadSnapshotPart`.
- `calc/calc.js` — `RECALC_WEEKS` :57 = **10 недель 08-30…11-01**; `PREV_WEEK='2026-08-23'` :58;
  `renderGlobal` :393 (methodology из PARAMS, `regions_taxonomy`, `coverageCriteria`, `precursor`);
  `renderRegions` :419; `mergedRegion` :425 / `renderRegionFile` :429 (правит index/delta/status/background,
  confidence/drivers переносятся verbatim); `countryLayerForWeek` :472; `regionCriteriaForWeek` :507;
  `runWeek` :520; `writeWeek` :676 (ворота quotes → linkcheck → validate; `updateLatestRev(ROOT)` :818;
  аудит `recalculation_method: 'aggregateDrivers v3.0'` :831); `printWeek` :856
  (строка «с сигналами: N» :911); `main` :935.
- `calc/country-layer.js` — `expandRegionAttribution` :188; `loadValidatedCountryOverlay` :210;
  `countryAttributionWarnings` :230 (предупреждение, ≥2 кластера — ADR 0067 п. 8);
  `countrySignals` :260 / `countryIndex` :264; `buildCountryRows` :284 —
  строка `{index, delta, background, region, signals, name}` (**`signals` в странах уже есть**);
  `writeCountryLayer` :349 — **не вызывает `updateLatestRev`** (ловушка таска 03).

### Публичный слой

- `calc/public-contract.js` — `PUBLIC_SCHEMA_VERSION = 1` :28;
  `methodologyDoc` :125 (раскрывает `n0` :147 — удалить); `weekDoc` :174; `countryRowOf` :196 (несёт `signals`);
  `WEEK_SCHEMA.$defs.week`: global index/delta `nullable('integer')` :425–426, regions :444–445;
  `METHODOLOGY_SCHEMA` :625 (`$id` со `schema/v1`); `COUNTRIES_SCHEMA` :1026
  (rows.index integer :1059, delta `'number'` :1060, signals :1063); `schemaDocs()` :1076 — 12 схем.
- `calc/public-export.js` — `datasetOf` :120, регионы проецируются в `{id,index,delta,background}`
  :125–133 — **`signals` не проецируется**; `buildDataset` :182; `toCsv` :235;
  `writePublicData` :439 (`mkdir 'schema','v1'` :489); список печати :681–689.
- `docs/api.md` — правило версионирования :55–74 (**смена типа → новая папка `schema/vN/`**);
  `index`/`delta` «целое|null» :118–119; `regions` `{id,index,delta,background}` :124;
  версия методологии «3.0» :10/:62; пример methodology :307–336 (n0 в примере нет);
  `countries/<date>.json` :350–367; таблица `schema/v1/` :570–584; CSV :554.
- `data/public/schema/v1/` — 12 файлов: `index, latest, week, regions, criteria, methodology,
  changelog, digest, digest-index, validation, forecast-ledger, countries`.

### Сайт

- `js/sections/regions.js` — `rankedRegions` :21–39 (**сортировка по |Δ|** :32–35);
  `countryRows` :53 (по |Δ| :73–75); `statusLabel` :43; `deltaSpan` :83;
  `render` :210, пин `is-personal`/`region-row--pinned` :229/:232;
  строка `${row.index} ${t(lang,'hero.index.of')}` :176/:253 («из 100»);
  background-пометка :255; a11y-строка :249–250.
- `js/sections/hero.js` — `formatDelta` :15 (печатает число как есть: `+${n}`);
  `setDelta` :84; `isBackgroundRegion` :32; `String(rdata.index)` :470;
  `risk.status(rdata.index)` :483 (тюн карточки).
- `js/sections/trend.js` — `summaryTextV2(lang, points, version = '3.0')` :102;
  `selectMethodology(points, version = '3.0')` :185; вызовы без версии :217/:242.
  Тот же дефолт продублирован в `js/bundle.js` :4479/:4562 (пересобрать `node build.js`).
- `js/data.js` — `isIndex` :101 (finite 0..100), `isDelta` :105 (finite);
  `validate` :145, регионы :181–193 (**без поля `signals`**);
  `validateCountries` :250, `signals` int ≥ 0 :283 (образец валидации).
- `js/i18n.js` — `regions.*` :16–18; `hero.index.of` :26; `region.background` :43;
  `country.*` :45–48; **ключа для пометки «мало сигналов (<2)» нет** — добавлять.
- `js/risk.js` — `SCALE` :5–12 (max 20/40/60/80/96/100); `status(index)` :23–25 —
  `SCALE.find(s => index <= s.max)` (всегда попадает, в отличие от `engine.stateOf`).
- `css/styles.css` — `.region-row` :1098; `.region-row--pinned` :1117
  (**только `@media (max-width: 640px)`, `order: -1`**); `.region-row-index` :1159;
  `.region-background` :331; `.country-*` :2982+.
- `js/sections/contribution.js:19` — `formatPp`: `Math.abs(value).toFixed(1).replace(/\.0$/,'')`
  — **образец стиля дробного форматирования** (`.0` не навязывать).
- `calc/digest.js` — `topRegions` :101–124: сортировка **|delta| → index → id**, `background` исключены.

### Точные имена (пересекающиеся)

| Имя | Где | Что делать по ADR 0069 |
|---|---|---|
| `nReg` | выход `attributedSignals` :673; `week-step.js` :136 (`{nReg:0}` fallback); тесты | остаётся, но `m = n/(n+n0)` уходит |
| `eStruct`, `eDyn`, `hasDeescSignals` | там же; `PARAMS.regionEstructDefault` | остаются (ep-ноги) |
| `iWith`, `iWithout` | `attributedSignals`/`attributedIndex`, 6 файлов тестов | **удаляются** (§2, Q6b) |
| `hypotheticalIndex` | engine.js :248 | **удаляется** |
| `n0` | `params.js:43`, `engine.js:534`, `public-contract.js:147` | **удаляется** (3 места) |
| `prevIndex` / `prevGlobal` | вход `regionalIndex` :571; `week-step.js`:137–138; `buildCountryRows` | остаются (инерция) |
| `background` | регионы/страны, `isBackgroundRegion`, digest :107 | не трогать |
| `signals` | страны уже (`country-row`, `validateCountries` :283); в `week-step.js` :130 — **локальная `const signals = regionalSignals(...)`**, конфликт имени в цикле :132 | добавить поле в `regions[id]` :142, обойти конфликт |
| `roundHalfUp` | engine.js :16 (целые) | новый `round1` для регионов/стран; **не путать** с `round1` в `calc/contributions.js:53` и `calc/sensitivity.js:17` (два разных уже есть) |
| `status`/`state` | `week-step.js`:142 (`status: r.state`), `engine.stateOf` :21, `js/risk.js status()` :23 | при дробях `stateOf` даёт `null`, сайт — нет (см. Ловушки) |
| `methodology` | `params.js:20`, `renderGlobal`, тренд-точки, `changelog-entries.js` (9 записей `'3.0'`), `article-build.js:236`, `backtest.js:392` (фильтр ряда!) | `'4.0'` + пересчёт |

## Команды

```text
node --test                                   # все тесты, из корня, без аргументов
node --test tests/<имя>.test.js               # один файл
node build.js                                 # ОБЯЗАТЕЛЬНО после любой правки js/** (bundle)
node calc/calc.js <неделя>                    # печать, без записи
node calc/calc.js --write [недели…]           # запись: цепочка 10 недель 08-30…11-01;
                                              # требует сети (linkcheck-ворота R03)
node calc/migrate-week-combined.js            # идемпотентная пересборка week.js от частей
node calc/public-export.js --write            # data/public/** + schema/v1 + changelog.html
node calc/digest-export.js --write            # data/public/digest/* + digest.html
node build.js && node --test                  # после правки сайта
```

Порядок производных при пересчёте: вход `calc/input/<неделя>.json` →
`calc.js --write <неделя>` (цепочка → `week.js` → `updateLatestRev` :818 →
append `data/audit.jsonl` :831) → `public-export.js --write` → `digest-export.js --write`
→ `build.js` → `node --test` → коммит (только оркестратор).
`blog-build.js --write` — при правке `docs/articles/weekly/*.md`.
`node calc/live-check.js` — EXPECTED_WEEK_COUNT = 14 (`tests/live-check.test.js:60`).

## Соседние зоны (после прошлой сборки, `0df0f03..HEAD`)

- Неделя **2026-11-01 создана и пересчитана** (70 → 72, Δ+4, покрытие 35/46, precursor 48);
  `RECALC_WEEKS` += 11-01 (**итого 10 недель**, ADR 0069 говорит «13» — ошибка, manifest R19);
  `EXPECTED_WEEK_COUNT` 13 → 14; `CI_WEEKS` — 14 недель.
- `computeWeek` получил `{regionCriteria}` (ADR 0068, `regionCriteriaForWeek` в calc.js :507);
  `region-country-consistency.test.js` — новый пин `region.index === ru.index` :84–85.
- `country-layer.js`: `expandRegionAttribution`, `loadValidatedCountryOverlay`,
  `countryAttributionWarnings`, фикс «строки только из оверлея» (предупреждение ≥2 кластеров
  **уже реализовано** — пункт carried.md «не доделано» устарел).
- Новый `calc/coding-reliability.js` (κ); правки `js/sections/{history,precursor,regions}.js`
  (публикация вс 11:00 МСК, вводный абзац precursor, сноска `country.note`); бандлы пересобраны.
- `docs/api.md` +8 строк (страновой слой); ADR 0068; VERSION 1.1.0 (Zenodo …4114);
  неделя 10-25: дозабор Д9, russia-belarus 70 → 66; 941 passed.
- Рабочее дерево: untracked `.autopilot/2026-11-04-regional-deviation--wip/`,
  `docs/adr/0069-regional-deviation-by-driver.md`; staged `docs/articles/vc-binance-2026-11-01*`;
  правки `AGENTS.md`/`.autopilot/*`. **Ничего из этого не коммитить.**

## Тесты и их пины (что сломается пересчётом)

- `tests/regional-signals.test.js` — пины `iWith 72.61` / `iWithout 37.65` :93/:98,
  `af iWith 0` / `af iWithout 55.72` :104/:107, фикстура SIGNAL_REGION :42–44;
  renderRegions/renderRegionFile/validate-ветки.
- `tests/calc-engine.test.js:460–550` — слепая ветка, «m = n/(n+5)» :487,
  clamp ±40 :508, зеркало шока :519–550 — всё через iWith/iWithout.
- `tests/engine-attribution.test.js` — эквивалентность обёрток, выходы iWith/iWithout :78–79,
  эпсилон-порог :82–87.
- `tests/engine-attribution-parity.test.js` — CHAIN 08-30…10-25 = **9 недель** :17–20
  (11-01 в цепочке parity пока нет), пин index/delta/background с диска.
- `tests/regional-hypothesis.test.js` — пины iWith 77/60/0 (10-18, ADR 0065) :89–117.
- `tests/region-country-consistency.test.js` — WEEK = последняя `RECALC_WEEKS` :24,
  `region.index === ru.index` :84, `nReg региона ≥ nReg страны` :56.
- `tests/data.test.js:425–508` — пин 09-13 index 43/delta 1/q 1; якорь 09-20/africa 57/14;
  комментарий «iWith − iWithout ≈ 0.36» :475; **пин methodology '3.0' у trend-точек :458/:464**.
- `tests/regions.test.js:38–66` — сортировка по |Δ|, `deltas [9,4,3,2,1,-1]` — **сломается при
  смене на индекс**; `page-smoke.test.js` (6/12 строк, rankedRegions 12 :83);
  `country-ui.test.js:47–58` — сортировка стран по |Δ|, ключи `country.*`.
- `tests/public-export.test.js:180` — `PUBLIC_SCHEMA_VERSION === 1` (пин на 2).
- `tests/public-contract.test.js` — 12 схем :409–415, диск `schema/v1/${name}` :602
  (пин каталога), `apiMentionsPath` :400–406 (каждый `data/public/**` → строка в api.md),
  `parameters.k/alpha` :99–100, nullable-мутации всех схем.
- `tests/trend.test.js:149/:168` — дефолт `'3.0'` в `selectMethodology`/`summaryTextV2`.
- `tests/digest.test.js:58–69` — **независимая реплика** сортировки topRegions по |Δ|;
  `:121` `${g.index} из 100`.
- `tests/risk-scale-methodology.test.js` — §9 ↔ `js/risk.js SCALE` ↔ §1.2 (три места шкалы).
- `tests/backtest.test.js:81/:191/:238` + `calc/backtest.js:392` — ряд только
  `methodology === PARAMS.methodology`; `tests/sensitivity.test.js:125` — 10-04 = 5.4.

## Ловушки

1. **ADR 0069 «13 недель» — ошибка**: `RECALC_WEEKS` = 10 (08-30…11-01), опубликовано 14.
   ASSUMPTION R19 в manifest.
2. **Противоречие R04** (carried): «PUBLIC_SCHEMA_VERSION = 1 не растёт» vs требование ADR «2» —
   разрешено в пользу ADR; при брифинге флагнуть, не обходить молча.
3. **Дайджест**: ADR §4 утверждает, что `topRegions` уже сортирует по индексу —
   **фактически |delta| → index → id** (`calc/digest.js:116–124`), и `tests/digest.test.js:64`
   репликирует ту же логику. Либо править дайджест+тест, либо зафиксировать расхождение.
4. **Статус при дробях**: `engine.stateOf` (min/max, дыры: 80.4 → `null`) vs
   `js/risk.js status()` (`<= max`, всегда попадает). После `round1` регион может получить
   `status: null` в снапшоте и нормальный статус на сайте — разъехался контракт.
   `week-step.js:142` кладёт `status: r.state` — следить.
5. **Тренд исчезнет**: после пересчёта точки несут `methodology: '4.0'`, а
   `selectMethodology`/`summaryTextV2` дефолтят `'3.0'` (`js/sections/trend.js:102/:185`,
   тот же дефолт в bundle) — ряд покажет пустоту/разрыв. Править дефолт + пины
   `tests/trend.test.js:149/:168` и `tests/data.test.js:458/:464`.
6. **Форматирование дроби**: `formatDelta` (:15) и `String(rdata.index)` (:470) и
   `${row.index} из 100` печатают дробь как есть («71.5 из 100») — осознанно решить;
   `.0` не навязывать — образец `formatPp` в `contribution.js:19`.
7. **`signals` в регионов нет нигде**: ни в `week-step.js:142`, ни в `js/data.js:181–193`,
   ни в `datasetOf` (public-export :125–133), ни в `WEEK_SCHEMA` (:444) — добавлять во все
   четыре точки; в странах поле уже есть (образец валидации `js/data.js:283`,
   схема `COUNTRIES_SCHEMA:1063`, `countryRowOf:196`). В `week-step.js:130` имя `signals`
   занято локальной переменной.
8. **Сортировка секции регионов** сейчас по |Δ| (`regions.js:32`) — пин `tests/regions.test.js:38–66`;
   пин `region-row--pinned` — только в мобильном CSS (`styles.css:1117`, `order:-1`).
9. **Каталог схем**: `docs/api.md:55–74` — смена типа (integer → number) = новая папка `schema/vN/`;
   `public-contract.test.js:602` пинит `schema/v1/` на диске; `writePublicData` создаёт `v1` жёстко (:489). `PUBLIC_SCHEMA_VERSION` 1 → 2
   (`public-export.test.js:180`).
10. **`n0` раскрыт в API**: `methodologyDoc` (`public-contract.js:147`) — удалить, иначе
    `methodology.json` противоречит коду.
11. **`recalculation_method: 'aggregateDrivers v3.0'`** (`calc.js:831`) — строка аудита,
    при 4.0 переписать; `data/audit.jsonl` append-only, известный баг пустых дифов
    recalc-0096/0098 (carried).
12. **`writeCountryLayer` не зовёт `updateLatestRev`** — после отдельной пересборки звать
    `updateLatestRev(ROOT)` (`calc/asset-rev.js`), иначе падает `tests/asset-rev.test.js`.
13. **Бэкфилл**: demo-недели 08-02…08-23 (methodology 1.0) не трогать; `backtest.js:392`
    отфильтрует не-4.0 недели из validation при смене `PARAMS.methodology` — ряд покажет только 4.0.
14. `changelog-entries.js` — 9 курируемых записей `version: '3.0'` (история, не трогать);
    новая запись 4.0 добавляется в начало. `article-build.js:236` дефолт `'3.0'`.
15. `week.js` производный; после правок `js/**` — `node build.js`, иначе бандл молча старый.
16. Коммит/пуш — только оркестратор; `tests/data.test.js` (пины 09-13 и др.) и
    `tests/sensitivity.test.js:125` (10-04 = 5.4) обновляются в том же коммите, что и пересчёт.
