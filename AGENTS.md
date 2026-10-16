<!-- autopilot:start -->
# Cassandra Index

Публичный еженедельный сервис: уровень и направление риска глобального конфликта
по открытым данным. Две половины репо: сайт (статика, `index.html` + `js/` + `data/`)
и расчётный пайплайн (`calc/`: входные сигналы → детерминированный движок → снапшоты
в `data/`). Не предсказывает дату войны и не является вероятностью войны.
Текущая методология — **3.0** (46 критериев, включая рыночный стресс-критерий D4.6
драйвера Д4); недели 08-02…08-23 — непересчитываемая демо-история методологии 1.0.
Регионы — таксономия **v2** (12 id, `CURRENT_TAXONOMY`, граница `TAXONOMY_V2_FROM`
= `2026-10-18`, forward-only); недели ≤ 10-11 — v1 (6 id). Версия таксономии
версионируется отдельно от methodology.
Стек: чистый HTML/CSS/JS, ноль зависимостей; Node ≥ 18; всё — ESM, кроме CommonJS `build.js`.

## Команды

| Что | Команда |
|---|---|
| Тесты (все) | `node --test` — из корня, без аргументов (форма `node --test tests/` падает на Windows/Node 24) |
| Один тест-файл | `node --test tests/<имя>.test.js` |
| Сборка бандла | `node build.js` — обязателен после ЛЮБОЙ правки `js/**`; бандлы коммитятся |
| Расчёт недели | `node calc/calc.js <неделя>` — только печать; `node calc/calc.js --write [неделя …]` — запись в `data/` (без недели — вся цепочка 08-30 → 09-06 → 09-13 → 09-20 → 09-27 → 10-04 → 10-11); после частей пишет и производный `week.js` |
| Миграция week.js | `node calc/migrate-week-combined.js [недели…]` — идемпотентная перегенерация `data/<week>/week.js` от дисковых частей; без аргументов — все CI_WEEKS; пишет файлы |
| Калибровка k | `node calc/calibrate.js` — сетка k, выбор, verify-якоря, чувствительность ±20 % |
| Проверка ссылок источников | `node calc/check-sources.js [недели…]` — перепроверка ссылок опубликованных снапшотов; без аргументов — все недели `data/`. Код выхода 1 при битых; 401/403/406/нет-ответа = заблокирована, не битая |
| Пересборка справочника geo | `node data/geo/generate.js [--zip <p>] [--country-info <p>] [--out <dir>]` — качает GeoNames (сеть только здесь), пишет `data/geo/cities.js` + `countries.js`; без `--zip` берёт дамп из системного temp |
| Еженедельный автозапуск | GitHub Actions `.github/workflows/weekly-calc.yml`: cron вс 08:00 МСК + `workflow_dispatch [week]`; при готовых входе и сидах сам добивает `RECALC_WEEKS`/`latest.js`, считает, тестирует, собирает, коммитит в master и запускает `deploy.yml`; иначе тихий skip |
| Сайт | открыть `index.html` (работает с `file://`, подключены бандлы) или любой статический сервер |

`node calc/calc.js --write` требует сети: перед записью собранный снапшот гоняется
через linkcheck (ворота R03) — хотя бы один битый URL → запись отклонена, диск не тронут.

## Публикация

- Выкат — GitHub Actions `.github/workflows/deploy.yml` на push в `master`; публикуется
  только `index.html`, `privacy.html`, `icon.svg`, `css/`, `js/`, `data/` — остальное наружу не уходит.
- Пуш в master = автоматический выкат; коммитить только готовое к публикации, коммит и пуш — только за оркестратором (агенты-исполнители НЕ коммитят — был инцидент).
- Автопуш по расписанию — `.github/workflows/weekly-calc.yml` (cron вс 08:00 МСК + `workflow_dispatch`): ЕДИНСТВЕННОЕ исключение правила выше — коммитит от `github-actions[bot]` и пушит в master только при готовом входе и сидах, после зелёных `node --test`; деплой запускается явно (`gh workflow run deploy.yml`, т.к. push от `GITHUB_TOKEN` не триггерит другие workflow). Подготовка входа и сидов остаётся ручной (§10.1); ворот на «не публиковать» нет — если вход/сиды не готовы, неделя тихо пропускается.
- Обновление недели: вход `calc/input/<дата>.json` → `node calc/calc.js --write <дата>` →
  `node build.js` → `node --test` зелёный → commit (push — оркестратору).
- URL: `https://cassindex.ru` (кастомный домен, зарегистрирован на Beget; DNS: 4 A-записи GitHub Pages на apex + CNAME `www` → `susotoze13-afk.github.io`). Репозиторий `susotoze13-afk/cassandra-index`, public. Старый адрес `https://susotoze13-afk.github.io/cassandra-index/` продолжает работать (GitHub редиректит на кастомный домен).

## Структура

```
index.html                единственная страница; RU-разметка hero в HTML; блок
                          «История и источники» скрыт (секция #sources и ссылка
                          навигации удалены — пинит tests/page-structure.test.js)
privacy.html              политика приватности
icon.svg                  favicon
css/styles.css            все токены палитры и стили
js/                       сайт: app (оркестрация), data (контракт снапшотов), i18n, risk,
                          region (две таксономии v1/v2 + поиск), render, sections/* (8
                          зарегистрированных секций, на странице видимых 7 — history скрыта),
                          geo (ленивый справочник городов/стран), share, demo, ui, criteria,
                          analytics (Cloudflare Web Analytics, beacon после согласия),
                          sections/feedback (форма обратной связи)
js/geo.js                 ленивая загрузка data/geo/* (ADR 0029): loadGeo(inject?) →
                          {cities,countries} (инжект <script>, кэш в памяти), resolveRegion
                          (ISO2/имя → region_v2/region_v1), resetGeoCache; поиск — единый
                          вход region.search(q, catalog)
js/region.js              REGIONS_V1 (6, легаси) / REGIONS_V2 (12, текущая, ADR 0028),
                          REGIONS = V2, regionForTaxonomy(v), detect (tz-префиксы, первый
                          матч), current/choose/isCurrent/get, consent, representative,
                          search(q, catalog?) — префиксный матч ru/en, .broad:boolean
calc/engine.js            ядро формул: скор драйвера (§4.2), короборация Д9 (§4.3),
                          глобальная агрегация §5 (шаги 1–8), инерция и Structural
                          Break Override (§5.4), региональная модель (§7): regionalIndex
                          + агрегация атрибуции regionalSignals, общее ядро маппинга
                          buildDriversCore, validate входов, константы CRITERIA (46,
                          D4.6 — ordinal-шкала 0/0.33/0.67/1)
calc/params.js            PARAMS — единственный источник чисел (k = 1.95,
                          methodology = '3.0')
calc/calc.js              CLI прогона недели; маппинг входа → драйверы через buildDrivers;
                          ворота ссылок и контракта перед --write; validateInputSources (R55);
                          ignoredRegionalAttribution (R01.2, предупреждение об игноре);
                          шов рендера снапшотов renderGlobal/renderRegionFile
calc/linkcheck.js         чистый модуль проверки URL: classify(status) → ok|blocked|broken,
                          checkUrl (ретраи на 429/406/5xx, таймаут 10 c, браузерные
                          заголовки), checkSources (последовательный обход)
calc/check-sources.js     CLI перепроверки ссылок всех/перечисленных недель поверх calc.js
calc/sensitivity.js       sensitivityScore — leave-one-domain/leave-one-cluster метрика
                          (R02): max|ΔI| в п.п., поле sensitivity quality-блока снапшота
calc/classify.js          чистый конвертер «черновик Jev v2 → штатный вход»
                          (docs/jev-classification.md §6.1, ADR 0018 доп.): ворота
                          правил 9–10, без сети и без вызова Jev; в CI не встроен;
                          тесты tests/classify.test.js
calc/calibrate.js         калибровка k на якорях: buildDrivers, runAnchor, evaluateGrid, selectK, sensitivity
calc/prepare-week.js      механика новой недели для weekly-calc: чистые швы addRecalcWeek/
                          addLatestWeek (RECALC_WEEKS, CI_WEEKS/CI_LATEST) + CLI [--write];
                          тесты tests/prepare-week.test.js
calc/audit.js             append в data/audit.jsonl (recalc/flash, R35–R37/R16–R19)
calc/migrate-week-combined.js  идемпотентная разовая миграция: `data/<week>/week.js`
                          из дисковых частей той же функцией, что и calc.js --write
                          (renderWeekCombined + loadWeekParts из calc.js)
calc/input/<неделя>.json  входные сигналы недели: 46 критериев D1..D9 ({value, covered,
                          sources}, слепые — covered:false с аттестацией), R55-источники
                          (top-level, 20–82 записи/неделя), driverConfidence; покрытие
                          27–43/46; критерий может нести опциональную региональную
                          атрибуцию `regions: string[]` (§4.1.9)
calc/input/drafts/        пилот Jev: черновики `<неделя>.llm-draft.json` (schema_version 2,
                          append-only), корпус текстов `texts-<неделя>/<source_id>.txt`
                          (предоставляет человек), сырой вход пилота `pilot-llm-<неделя>.json`
calc/input/anchors/       10 модельных якорных профилей §9 (rollingOrigin select/verify),
                          D4.6 добавлен к каждому как ordinal {value, covered, sources}
data/regions/             source of truth таксономии: reference.json (ISO 3166-2,
                          adminCenter, taxonomies{'1.0','2.0'}, taxonomy_version '2.0')
                          + зеркало reference.js (window.CI_REGION_REF)
data/geo/                 статический справочник (ADR 0029): generate.js (генератор/CLI,
                          сеть только здесь), cities.js (window.CI_GEO_CITIES, pop ≥ 50k +
                          столицы PPLC суверенных стран + 12 админцентров, ~12 417 городов),
                          countries.js (window.CI_GEO_COUNTRIES, 252 ISO2); дамп GeoNames
                          (*.zip/*.txt) в .gitignore — коммитятся только генератор и вывод
data/<YYYY-MM-DD>/        11 недель: 08-02…08-23 — непересчитываемая демо-история
                          (methodology "1.0"), 08-30…10-11 — пересчитанные published
                          (methodology "3.0"; index 51/42/43/56/47/46/56, delta
                          −10/−9/+1/+13/−9/−1/+10; q=1 у 08-30…09-20, 0.9071 у 09-27,
                          0.9293 у 10-04, 0.8622 у 10-11):
                          global/regions/region-*/trend/drivers/sources (.js в window.CI_DATA)
                          + week.js (комбинированный снапшот недели из частей своей версии
                          таксономии: v1 = 11, v2 = 17 — единственный файл, который грузит
                          сайт; производная, руками не править);
                          global.js несёт `regions_taxonomy` ('1.0'/'2.0'), по нему читаются части;
                          запись региона несёт background (true = слепой регион; слепых
                          по неделям 2/3/3/2/2/0/1 из 6; africa покрыт во всех 7
                          неделях цепочки, south-asia — в 08-30/09-06/09-27/10-04,
                          остальные недели south-asia честно слепые)
data/latest.js            CI_WEEKS + CI_LATEST + document.write-загрузка ТОЛЬКО week.js
                          (по одному запросу на неделю вместо 11 частей)
data/audit.jsonl          журнал аудита пересчётов и flash-срабатываний
docs/adr/                 зафиксированные архитектурные решения (нумерация 0001–0032;
                          0028 — таксономия регионов v2; 0029 — справочник городов/стран
                          GeoNames; 0030/0031 — обработка RU-имён городов/стран в справочнике;
                          0032 — версия таксономии недели выводится из её даты, forward-only),
                          два параллельных ряда + новые прогонов recalc-3months-publish,
                          source-selection-hardening 0019/0020, region-delta-market-criterion
                          0021 (рыночный критерий D4.6 → методология 3.0 — РЕАЛИЗОВАНО
                          прогоном regional-index-sources), 0022 (трактовки regionalSignals)
                          и 0018-jev-source-classification (доп. 2026-10-11: шов
                          calc/classify.js, схема черновика v2))
docs/jev-classification.md  логика классификации источников Jev-ом по критериям
                          D1…D9 (текст документа ещё говорит «45» — под 46/3.0 не
                          обновлён):
                          роли (Jev → редактор → код), правила (окно, цитата,
                          events[], дедупликация, Д9-кластеры, carryover Д2),
                          ворота без поблажек, механический шов §6.1, статус пилота
                          (версия 0.2, форвардный; критерии ±2 / ≥50 % — §7)
docs/llm-pilot-journal.md аудиторский след пилота машинной разметки (ретро-прогоны
                          09-27/09-20, критерии успеха, решение о форвард-пилоте)
docs/calibration-journal.md  аудиторский след калибровки k (2026-09-21; доп. 2026-10-11 —
                          ввод D4.6, methodology 3.0, k = 1.95 подтверждён)
docs/articles/            черновики статей для внешних площадок и пакеты публикаций:
                          habr-idea-d.md (источник + рабочие заметки) → habr-post-final.md
                          (тело без заметок, doc-ссылки на GitHub) + habr-publish-package.md
                          (поля редактора Habr, карта картинок, чек-лист); то же для vc-*
                          и pikabu-*; скриншоты — docs/articles/img/. Сама публикация — вручную (внешнее действие)
docs/preproduction-decisions.md  сверху только нерешённые вопросы (P2),
                          всё решённое — в архиве «Решено» (v1.2)
tests/*.test.js           44 файла, node --test
build.js                  CommonJS-сборщик ESM js/** → classic scripts js/bundle*.js
design/cassandra-index.pen макет pen.dev (текстовый JSON), читается tests/pen.test.js
```

## Ключевые файлы

- `calc/engine.js` — чистые функции методологии: `driverScore`, `d8Strength`, `aggregateD9`,
  `aggregateDrivers` (→ `{index, state, delta, internal, q, parts, structuralBreak}`),
  `applyInertia`, `detectStructuralBreak`, `detectFlashTriggers`, `regionalIndex`, `stateOf`,
  константы `CRITERIA` (46, D4.6 — Д4/esc/ordinal), `D9_SUBGROUPS` (8), `validate(input) -> errors[]`. Плюс
  `buildDriversCore(criteriaIn, confidenceLevels, params)` — общее ядро маппинга критериев →
  драйверы (делегируют calibrate.js и calc.js) и `regionalSignals(criteria, regionIds, params)`
  — агрегация региональной атрибуции критериев (`regions: string[]` из набора версии,
  whitelist — третий аргумент `validate(input, params, regionIds)`; дефолт — текущая
  двенадцатка) в
  сигналы региона для regionalIndex (ветка nReg>0); трактовки §7 — docs/adr/0022,
  `PARAMS.regionEstructDefault = 0.5`. Округление только
  на выходе; внутренние float течёт в инерцию следующей недели.
- `calc/params.js` — `PARAMS` + `list()` (глубокая копия). Все числа здесь; engine
  только подставляет их как дефолты. k = 1.95 — калиброван на якорях (журнал);
  `PARAMS.methodology = '3.0'` — единственный источник версии перевыпуска
  (renderGlobal берёт её отсюда; `published` — защищённое поле из прежнего снапшота).
- `calc/calibrate.js` — калибровка k на якорях: `buildDrivers(input, params)` — тонкая
  обёртка над общим ядром `engine.buildDriversCore` (используют и calibrate, и calc.js;
  маппинг в calibrate.js не дублируется).
- `calc/linkcheck.js` — чистый модуль: `classify` (2xx/3xx → ok; 401/403/406/null → blocked;
  404/410/прочее → broken), `checkUrl` (fetchImpl прокидывается снаружи — шов тестов,
  ретраи 2 попытки с паузой 1 c, AbortController на 10 c, браузерный User-Agent),
  `checkSources(items: {url, where})` → `{checked, ok, broken, blocked}`; ворота падают
  только по broken, blocked — предупреждение. Проверка последовательная — не долбить сайты.
- `calc/calc.js` — цепочка RECALC_WEEKS = ['2026-08-30','2026-09-06','2026-09-13','2026-09-20','2026-09-27','2026-10-04','2026-10-11'], старт
  от опубликованного PREV_WEEK = '2026-08-23'; набор регионов недели — по версии:
  `taxonomyForWeek(week)` ('2.0' от `PARAMS.taxonomyV2From`, иначе '1.0'), whitelist входа
  `regionIdsFor(taxonomyForWeek(week))`; runWeek проводит региональные сигналы:
  `regionalSignals(input.criteria, regionIds, PARAMS)` → регион с сигналами считается
  по ним (nReg>0, background:false), без — слепой веткой (background:true); переиспользуемые швы: `loadSnapshotPart`
  (чтение .js-снапшотов через vm, без DOM), `collectSourceItems` (дедуп URL из top-level
  sources/drivers/regions), `classifyPublication` (R11–R15), `nextChainState`,
  `validateInputSources` (строгая схема R55, cluster_id по whitelist PARAMS.clusters),
  `ignoredRegionalAttribution` (R01.2 — сортированные id Д2/Д4/Д9-кроме-D9.3 с непустой
  `regions[]`; поле `ignoredAttribution` в выводе runWeek, предупреждение об игноре ADR 0022),
  `renderGlobal` (through = дата недели — конвенция таска 05, тест tests/through.test.js;
  пишет `s.regions_taxonomy` недели),
  `renderRegions`/`renderRegionFile` (числа пересчёта + флаг background + drivers/confidence из прежнего файла);
  комбинированный снапшот: `weekPartFiles(taxonomy)` (v1 = 11 / v2 = 17 частей,
  `regions` до `region-*`), `WEEK_PART_FILES = weekPartFiles('1.0')` (обратная совместимость),
  `loadWeekParts(week)` — сначала `global.js`, из него `regions_taxonomy` → части своего
  набора (vm), `renderWeekCombined(week, parts)` (чистый шов — единый IIFE
  в `window.CI_DATA.snapshots[week]`; версия из `regions_taxonomy`, рассинхрон набора и
  версии → явная ошибка, не даунгрейд), writeWeek — `--write` пишет week.js после частей
- `calc/check-sources.js` — CLI поверх `loadSnapshotPart`/`collectSourceItems`/`checkSources`;
  построчный отчёт ок/БИТАЯ/ЗАБЛОКИРОВАНА по каждому URL, итог, код 1 при битых.
- `calc/sensitivity.js` — `sensitivityScore(input, ctx, params)` → число|null: пересчёт
  `aggregateDrivers` при исключении каждого домена и каждого кластера источников,
  `max|ΔI|` по internal (одно десятичное); `SENSITIVITY_THRESHOLD = PARAMS.sensitivityThreshold`.
- `calc/classify.js` — чистый конвертер «черновик Jev v2 → штатный вход»
  (docs/jev-classification.md §6.1, ADR 0018 доп. 2026-10-11): шов `normalizeText`
  (пробелы/дефисы/кавычки → канон), `quoteFound` (дословность цитаты — ворот
  правила 9), `validateDraft` (схема v2: kind-дисциплина, дубль пары
  (criterion,source), cluster из whitelist, events из {0.2,0.5,1.0,2.0}),
  `reviewQueue` (неразрешённые review.flag/carryover — ворот правила 10),
  `toInput(draft, r55Sources, corpusDir) → {input, report, errors}` (input:null
  при любых ошибках; merge по критерию: events concat, value = max; not_found →
  criteria[id]=null; events[] не сворачивается в value — нормирует движок;
  источники критерия — из R55-записей, date = event_date || publication_date),
  `loadDraft` + CLI `node calc/classify.js <draft> [--corpus <dir>] [--sources
  <r55.json>] [--out <path>]` (корпус — `<corpusDir>/<source_id>.txt`, дефолт
  `calc/input/drafts/texts-<week>/`; R55 — из `calc/input/<week>.json`; exit 0/1).
  Jev (внешний MCP) не вызывается, сети нет, в CI не встроен; штатные ворота
  публикации (linkcheck/validate/validateInputSources) не повторяются — сырой
  вход проходит их в calc.js как любой ручной.
- `js/data.js` — контракт снапшотов: таксономии регионов `REGION_TAXONOMIES{'1.0','2.0'}`,
  `regionIdsFor(taxonomy='1.0')` (неизвестная/отсутствующая версия → v1), `CURRENT_TAXONOMY
  = '2.0'`, `TAXONOMY_V2_FROM = '2026-10-18'`, `REGION_IDS` = текущая двенадцатка (движок
  берёт как дефолт); `validate` (published/through/methodology, dataState из DATA_STATES,
  global:null только при insufficient/unavailable, regions — ровно `regionIdsFor(snapshot.
  regions_taxonomy ?? '1.0')` и строка версии обязана быть '1.0'|'2.0',
  опциональный `regions.<id>.background: boolean` — absent=false, true = слепой
  регион (индекс отражает глобальный фон), trend ровно 12 точек (value:null только с
  methodology), ровно 3 драйвера,
  источники по isSource), `validateQuality` (q/nullWeight/confidence/coverage/preview/
  recalc, неделя insufficient обязана нести полный пакет непубликации);
  `week/latest/listWeeks`; битый снапшот → `unavailable` + событие.
- `js/region.js` — реестр двух таксономий: `REGIONS_V1` (6 легаси-регионов) и `REGIONS_V2`
  (12 текущих), `REGIONS = REGIONS_V2`, `regionForTaxonomy(version)` ('2.0' → V2, иначе V1);
  `detect(tz)` (IANA-префиксы, первый матч, порядок массива важен), `current/choose/isCurrent`
  (значение вне V2 игнорируется — 'europe' при выборе забывается, не ре-бакетится),
  `get(id)` ищет в обоих наборах, `consent` (opt-in, denied 30 дней), `representative`
  (лестница уверенности); `search(q, catalog?)` — единый вход поиска (без каталога —
  встроенный `CITIES`, с каталогом — префиксный матч ru/en по городам/странам/регионам,
  >20 совпадений → топ-20 + `.broad:boolean`, `geoSearch` не существует).
- `js/geo.js` — ленивый справочник (ADR 0029): `loadGeo(inject?)` → Promise `{cities,
  countries}`, инжектит `data/geo/cities.js`+`countries.js` `<script>`-тегами (шов `inject`
  для тестов), кэш в памяти; `resolveRegion(countryOrCity, catalog)` (ISO2/имя/объект-город
  → `{country, region_v2, region_v1, name}|null`, страна вне разбиения → region_*:null);
  `resetGeoCache()`. Поиск здесь не дублируется — `region.search(q, catalog)`.
- `data/geo/generate.js` — генератор справочника (ADR 0029, сеть только здесь): CLI
  `node data/geo/generate.js [--zip <p>] [--country-info <p>] [--out <dir>]`; экспорт-швы
  `unzipFirstEntry`, `pickRuAlternate`, `parseCityLine`, `parseCountryInfo`, `buildRegionMaps`,
  `buildOutput`, `COUNTRY_RU` (курируемая ISO2→RU), `SOVEREIGN_ISO` (195 суверенных);
  столица = feature code PPLC суверенной страны; фильтр pop ≥ 50k. Пишет `cities.js`
  (~12 417) и `countries.js` (252 ISO2). Дамп GeoNames в .gitignore.
- `js/sections/regions.js` (секция «Что это значит для моего региона?») — `rankedRegions
  (snapshot)` берёт набор `region.regionForTaxonomy(snapshot.regions_taxonomy)` (6/12 строк),
  сортировка по |Δ|; `render` пиннит личный регион классом `.region-row--pinned`, слепой
  регион — пометкой `region.background` вместо Δ.
- `js/sections/hero.js` — чистые швы `isBackgroundRegion(rdata)` (true только при
  `background === true`) — импортируется в js/sections/regions.js, и `refineRegionFromCoords
  (lat,lon)` (грубые bounding-box → v2-id, порядок боксов = приоритет, вне — null, столицы
  региона — якорь теста); при background:true Δ
  не подаётся как региональная: пометка i18n-ключа `region.background` («Индекс отражает
  глобальный фон; региональных данных недостаточно») и CSS-класс `.region-background`
  (--text-muted) в hero, ranked-строке и раскрытой карточке. Пикер: чипы — по набору
  отображаемой недели (`regionForTaxonomy`), при первом открытии лениво грузит `js/geo.js`
  (`loadGeo`) и ищет через `region.search(q, catalog)`; личный регион пиннится вверху.
- `js/criteria.js` — статический `CRITERIA_LIST` (46 критериев: id, драйвер, RU/EN название
  и описание; порядок = Object.keys(engine.CRITERIA), паритет пинит tests/methodology-criteria.test.js).
- `js/sections/history.js` — модуль скрытой секции «История и источники»: регистрация 'history'
  в js/render.js сохранена, но хоста `[data-section="history"]` в index.html нет — render()
  при пустом DOM обновляет только футер «Следующая публикация» (`[data-role="footer-next"]`,
  §9 R62.1). Чистые швы: `nextPublication`, `publicationLabel`, `methodologyNote`,
  `regionalGridNote(lang, viewed, current)` ('' при совпадении версий таксономии, иначе
  заметка с датой `TAXONOMY_V2_FROM`), `DEMO_REVIEWS`, `reviewFor`. В футере — строка
  атрибуции GeoNames (`footer.geo`, «© GeoNames, CC BY 4.0», ADR 0029). Тесты модуля
  (tests/history.test.js) сохранены.
- `js/sections/methodology.js` — секция «Методология»: статический контент из i18n + полный
  список 46 критериев; шов `criteriaModel(lang) → [{driver, title, items}]` (9 групп),
  рендер `<details>/<summary>`, ключи i18n `method.criteria.*`.
- `js/sections/feedback.js` — секция «Обратная связь» (8-я, зарегистрирована в js/render.js):
  форма шлёт POST JSON на FormSubmit (`formsubmit.co/ajax/Zasik2008@yandex.ru` — внешний
  сервис, бэкенда у сайта нет). Антиспам чистыми швами: `honeypotCheck` (3 скрытых поля),
  `timingCheck`/`timingToken` (мин. 2 c + подпись по соли модуля), `rateLimit` (бэкофф
  30→120→300 c, состояние в памяти модуля), `originAllowed` (whitelist доменов, null для
  file://). Все ловушки дают боту фейковый «Отправлено» без fetch. Константы модуля:
  FEEDBACK_TOPICS, MIN/MAX_MESSAGE (5/4000), TIMING_MIN_MS, RATE_LIMIT_STEPS_MS,
  HONEYPOT_FIELDS, ENDPOINT, ALLOWED_ORIGINS. Тесты: tests/feedback.test.js (17).
- `build.js` — свой мини-бандлер: топосорт, namespace `window.CI`, входы js/app.js+js/share.js
  и js/i18n.js+js/ui.js; неподдержанные формы import/export — ошибка сборки.

## Архитектура

- Поток данных расчёта: `calc/input/<week>.json` → `validate` + `validateInputSources`
  (входы цепочки несут sources, R55) → `buildDrivers` → `aggregateDrivers` (ctx: prevInternal/
  prevPublished/structuralBreak) → классификация публикации → ворота ссылок
  (collectSourceItems + linkcheck, раньше контрактной самопроверки) → `validate` из
  js/data.js → запись числовых файлов `data/<week>/` (global/regions/region-*/trend;
  sources.js — из входа, иначе прежние сохраняются) и производного комбинированного
  week.js поверх них (renderWeekCombined от частей набора недели — v1 = 11 / v2 = 17;
  сайт грузит только его); записи регионов несут флаг background
  (regions.js + region-*.js); published — защищённое поле из прежнего снапшота,
  methodology — из `PARAMS.methodology` (3.0), through = дата самой недели (окно W−7…W
  включительно); точка тренда недели несёт `{date, value, methodology}` — своя неделя берёт
  версию записываемого снапшота (PARAMS), более ранние — из их `global.js` на диске;
  глобальный drivers.js генератор не трогает (редакционный сид); после записи —
  append в data/audit.jsonl (recalc: `version_before` из снапшота, `version_after` из
  PARAMS, `recalculation_method: 'aggregateDrivers v3.0'`; flash).
- Поток данных сайта: `data/latest.js` синхронно кладёт снапшоты в `window.CI_DATA`
  (document.write ТОЛЬКО комбинированных `data/<week>/week.js` — 11 запросов вместо
  121 частей; измеренный эффект локально: 127→17 запросов, DCL ~5 с → ~0,14 с;
  fetch на file:// невозможен, поэтому document.write) → `js/app.js` init → `render.renderAll`
  по 8 зарегистрированным секциям (на странице видимых 7: «История и источники»
  скрыта — её render при отсутствии хоста обновляет только футер «Следующая
  публикация»). Секции регионов/hero выбирают набор по `regions_taxonomy` недели
  (`regionForTaxonomy`), `js/geo.js` грузится лениво при первом открытии пикера
  (`data/geo/*.js` не в бандле и не в index.html). Сайт не знает про calc/ — читает только data/.
- События document: `ci:ready`, `ci:datastate`, `ci:regionchange`, `ci:demo`.
- Шов для тестов — чистые функции: `calc/engine.js`, `calc/linkcheck.js` (поддельный
  fetchImpl, без сети), `validateInputSources`/`collectSourceItems`/`classifyPublication`/
  `nextChainState`/`renderGlobal`/`renderRegionFile`/`renderWeekCombined`/`loadWeekParts`/
  `weekPartFiles`/`taxonomyForWeek` из calc.js (синтетические данные)
  + чистые модули сайта (i18n, risk, region — `regionForTaxonomy`/`search` с инъекцией
  каталога, data — `regionIdsFor`/`validate`, geo — `resolveRegion`/`loadGeo` с инъекцией).
  CLI — тонкая обвязка.
- Схема источника R55 (во всех 11 неделях, включая региональные drivers): id,
  title{ru,en}, domain, url, publication_date, accessed_date, source_type
  (primary|secondary|OSINT), cluster_id (whitelist из PARAMS.clusters),
  state_affiliated:boolean + опциональные author/archive_url/archive_date/confidence/
  notes. data.js принимает и легаси-схему (скалярная date) для обратной совместимости.
- Каноническая классификация доменов (зафиксирована при правке метаданных
  2026-10-05): aa.com.tr (Anadolu), dw.com (Deutsche Welle), aljazeera.com —
  всегда `B-state-media` + `state_affiliated: true` (гос/госфинансируемые СМИ
  по определению кластера в provenance-матрице). Разнобой во входах и
  опубликованных сидах (включая региональные region-*.js недель 08-30 и 10-04)
  исправлен; записи аудита recalc-0026…0030. Демо-недели v1.0 (08-02…08-23)
  непересчитываемые и несут старые значения — это зафиксированный архив.
  Сиды region-*.js штатным пересчётом не перезаписываются (renderRegionFile
  переносит их verbatim) — ручная правка их требует записи в audit.jsonl.

## Соглашения кода

- Ноль зависимостей: только stdlib Node / браузер; любой импорт npm/CDN — ошибка. Всё ESM.
- Вся пользовательская строка — только через словарь `js/i18n.js` (data-i18n,
  data-i18n-aria, data-i18n-placeholder; плюрализация RU; даты через Intl). Сайт
  одноязычный RU: DICTS только ru, `resolveLang()` в js/ui.js всегда 'ru',
  переключателя языка нет (EN-словарь и lang-UI удалены).
- DOM только через `document.createElement` + `textContent` — никакого innerHTML со строками.
- Цвета — только CSS-токены из `css/styles.css`; тон статуса — `risk.tone` (--state-*).
- a11y: видимый фокус 2px #58A6FF, контраст ≥4.5:1, touch ≥44px, reflow 320px,
  prefers-reduced-motion, значения не цветом, aria-live — `[data-role="a11y-live"]`.
- Лексика: нет слов из Avoid-списка PRD §11.5, фраз «на пороге/на грани» и метафоры часов.
- Не трогать: `cassandra-index-prototype.html` (read-only), `PRD_Casandra_Index.md`,
  `METHODOLOGY.md`, `.autopilot/`.

## Окружение

Секретов, конфигов и переменных окружения нет — репозиторий полностью статический;
для проверки ссылок нужна сеть (без неё проверки массово уходят в blocked — ворота
это не блокирует, но отчёт раздувает). Доступ к сети в этой среде — только через
оболочку (`curl.exe`, `node` fetch); инструменты WebSearch/WebFetch ходят через мёртвый
прокси и результата не дают.

## Тесты

`node --test` без аргументов (44 файла, 424 passed / 0 fail — подтверждено прогоном
2026-10-17). Один файл: `node --test tests/<имя>.test.js`. Покрыты только чистые модули
без DOM, тест-фреймворков нет. Таксономия регионов: `tests/region.test.js` (две версии,
`regionForTaxonomy`, поиск) и `tests/geo.test.js` (генератор/форма `data/geo/*`,
`loadGeo`/`resolveRegion` над инъекцией — без сети). Расчётное ядро: `tests/calc-engine.test.js` (включая
перенос регионального отклонения при nReg = 0); региональная модель:
`tests/regional-signals.test.js` (aggregation атрибуции в регионы) и `tests/regions.test.js`;
признак игнора атрибуции: `tests/ignored-attribution.test.js` (R01.2, ADR 0022); калибровка:
`tests/calibrate.test.js`; ссылки: `tests/linkcheck.test.js` (поддельный fetchImpl, без сети);
чувствительность: `tests/sensitivity.test.js` (чистый sensitivityScore + пин реальной
недели 10-04 = 5.4 через прогон цепочки); ворота независимости и ядро источников:
`tests/independence-gates.test.js`, `tests/core-sources.test.js`,
`tests/acceptance-source-selection.test.js`;
конвертер черновика Jev: `tests/classify.test.js` (ворота 9–10, merge, not_found → null,
сквозной позитив: эмитированный вход проходит engine.validate и маппится в 9 драйверов);
контракт данных: `tests/data.test.js` (пинит точные выходы пересчитанных недель и
региональный охват africa/south-asia — см. подводные камни); схема источников R55:
`tests/sources-schema.test.js`;
insufficient-публикация (classifyPublication, nextChainState): `tests/insufficient.test.js`;
through-конвенция: `tests/through.test.js`; список критериев (паритет criteria.js ↔
engine.CRITERIA): `tests/methodology-criteria.test.js`; аудит: `tests/audit.test.js`;
механика недели автозапуска (addRecalcWeek/addLatestWeek, идемпотентность):
`tests/prepare-week.test.js`;
отсечение точек не-3.0 на тренде, подпись v2 и подписи оси
(selectMethodology, summaryTextV2, axisLabels): `tests/trend.test.js`; состав
разметки страницы (отсутствие скрытой секции #sources
и ссылки навигации — чтение index.html с диска, без DOM): `tests/page-structure.test.js`;
комбинированный снапшот и версии набора: `tests/week-combined.test.js` (renderWeekCombined
на синтетике, taxonomyForWeek/weekPartFiles, v1 = 11 / v2 = 17, рассинхрон → ошибка),
`tests/week-combined-parity.test.js` (паритет week.js ↔ дисковые части для всех 11 недель)
и `tests/latest-loader.test.js` (latest.js грузит только week.js); meta-CSP обеих
страниц пинит `tests/csp.test.js` (разрешение static.cloudflareinsights.com осознанно —
живой js/analytics.js, beacon только после согласия).

## Подводные камни

- Кастомный домен `cassindex.ru`: workflow сам кладёт `_site/CNAME` (менять домен —
  править строку `echo cassindex.ru > _site/CNAME` в deploy.yml). CNAME из артефакта
  НЕ привязывает домен автоматически: одноразово домен сохранён вручную (Settings →
  Pages → Custom domain); REST `PATCH /pages` у токена возвращает 404 (нет права
  Administration) — при смене домена делать это вручную в UI.
- Коммит и push — только оркестратор. Исполнитель-агент, закоммитивший сам, — инцидент;
  правки остаются рабочим деревом. Исключение — workflow `.github/workflows/weekly-calc.yml`
  (см. «Публикация»): его коммит/пуш — автоматика по расписанию, не агент.
- `weekly-calc.yml`: зелёный skip — не ошибка (неделя без входа/сидов или уже пересчитанная;
  причина — в логе шага «Ворота пропуска»). GitHub может задерживать cron до ~30 мин;
  ретрай несостоявшегося прогона — `workflow_dispatch` с input `week`. Красный фейл (битая
  ссылка, упавшие тесты, отклонённый push) коммита не оставляет. Ворота проверяют только
  факт наличия входа и семи сидов (`drivers.js` + 6 `region-*.js`) — качество входа
  по-прежнему на редакторе (§10.1), автоматической сверки нет.
- Списки недель (`RECALC_WEEKS` в calc/calc.js и `CI_WEEKS`/`CI_LATEST` в data/latest.js)
  при публикации по расписанию обновляет `calc/prepare-week.js`; вручную добавлять не
  обязательно (идемпотентно — повторный запуск не дублирует дату). деплой после автопуша
  запускается явно (`gh workflow run deploy.yml`) — push от `GITHUB_TOKEN` не триггерит
  другие workflow; поэтому у deploy.yml есть триггер `workflow_dispatch`.
- Сеть из среды проверки небезупречна: DNS не резолвит www.bbc.com/www.dw.com (проверять
  извне, curl --resolve); apnews/crisisgroup/iaea — Cloudflare 403 на bot-запросы,
  reuters.com — site-wide 401 даже на главной (D04, проверено 2026-09-25)
  (classify → blocked, не битые); reliefweb — интермитентный 406 (ретраится, финальный
  → blocked). blocked не роняет ворота и check-sources.
- `data/latest.js` грузит через `document.write` — единственный способ без fetch на file://,
  не баг и не удалять. Грузит ТОЛЬКО комбинированные `week.js` (1 на неделю); части
  (global/regions/…/sources) остаются на диске для пайплайна и тестов, week.js —
  производная (calc.js --write пишет его после частей; `node calc/migrate-week-combined.js`
  идемпотентно пересобирает от частей), руками не править. Новая неделя = вход в
  `calc/input/` + запись через calc.js.
- Страницы грузят СОБРАННЫЕ `js/bundle.js`/`js/bundle-privacy.js`, а не ES-модули (CORS на file://).
  После правки `js/**` обязателен `node build.js` — иначе коммиченный бандл молча останется
  старым. bundle руками не править; тесты идут против исходников.
- Прогон source-selection-hardening (2026-10-07, ADR 0019/0020): ворота независимости
  `validateSourceIndependence` в calc/calc.js (≥2 кластеров ИЛИ ≥1 primary|OSINT на
  покрытый критерий, `PARAMS.independenceGateFrom = '2026-10-11'`, forward-only —
  цепочка 08-30…10-04 не пересчитывается); метрика `calc/sensitivity.js sensitivityScore`
  (leave-one-domain/leave-one-cluster, max|ΔI| п.п., опц. поле quality-блока,
  `PARAMS.sensitivityThreshold = 5`); ядро `PARAMS.coreSources` (9 доменов A/B/C/F,
  warning при < coreMinDomains=4, НЕ ворота); red team: 7 вопросов (константа
  REDTEAM_QUESTIONS в calc/audit.js = governance §3.2 пословно), record-тип `redteam`
  в hash-цепочке аудита, advisory. Опубликованные недели до 10-11 ворота не видят.
- Недели 08-02…08-23 в `data/` — непересчитываемая демо-история (methodology "1.0" у них,
  у пересчитанной цепочки "3.0" — разрыв версии реален); calc.js откажется считать неделю
  вне RECALC_WEEKS. На тренде точки не-3.0 не показываются (см. ниже про selectMethodology);
  несопоставимость версий раскрывается в секции истории (`methodologyNote`,
  `history.methodology.note`) при просмотре недели другой версии.
- Таксономия регионов версионируется ОТДЕЛЬНО от methodology (ADR 0028): версия недели —
  поле `s.regions_taxonomy` в global.js, граница `2026-10-18` (`PARAMS.taxonomyV2From` —
  единственный источник, `js/data.js TAXONOMY_V2_FROM` его зеркалит для сайта), forward-only —
  недели ≤ 10-11 навсегда v1. Набор частей week.js зависит от версии (v1 = 11 / v2 = 17);
  `loadWeekParts`/`renderWeekCombined` читают версию из global-части, рассинхрон набора и
  версии → явная ошибка. `WEEK_PART_FILES` заморожен на v1 (обратная совместимость, пин).
- `REGION_IDS` в js/data.js — псевдоним ТЕКУЩЕГО набора (v2, 12), не легаси-шестёрки; движок
  берёт его дефолтом, но расчёт недели обязан ходить через `regionIdsFor(taxonomyForWeek
  (week))` — иначе v1-неделя получит v2-регионы. `check-sources.js` обходит region-файлы
  по версии недели.
- Справочник geo: `data/geo/*.js` НЕ в бандле и НЕ подключены в index.html — инжектятся
  лениво при первом открытии пикера (`js/geo.js`), поэтому при отсутствии сети/файла поиск
  тихо откатывается на встроенный `CITIES` (region.search без каталога). Перегенерация
  требует сети и дампа GeoNames (в .gitignore); RU-имена городов — эвристика (первый
  кириллический alternate), стран — курируемая `COUNTRY_RU`. Атрибуция GeoNames — `footer.geo`
  + `privacy.html` (ссылка CC BY 4.0), пин tests/privacy.test.js (разрешён только `<a>`-анкор).
- Новая неделя требует редакционного сида ДО `--write`: `data/<неделя>/drivers.js`
  (ровно 3 драйвера по контракту) и `region-*.js` (по 2 драйвера на регион) — иначе
  ворота `validate` отклонят запись («drivers: exactly 3 required»). Источники сида —
  verbatim-записи из `input.sources` по id (иначе linkcheck пойдёт проверять лишние URL).
- Генератор при `--write` перезаписывает `region-*.js` целиком (renderRegionFile): числа
  из движка + drivers/confidence, перенесённые из прежнего файла; ручные комментарии
  сидов съедаются (видно в diff 96616da → 5d7d335) — осознанное поведение, не баг.
- Фикстура `tests/data.test.js` пинит точные выходные числа пайплайна для дисковых недель
  цепочки (index/delta/q/through) — после каждого пересчёта её нужно актуализировать;
  это конвенция, не баг. Текущий пин: 09-13 index 43, delta +1, q 1, trend-точки недель
  цепочки несут methodology '3.0' (своя неделя — версию записываемого снапшота).
  `tests/sensitivity.test.js` пинит sensitivity реальной недели 10-04 = 5.4 (через прогон
  цепочки тем же кодом, что и --write) — тоже обновляется после пересчёта.
- Поле `through` («Данные по») у недель цепочки — дата самой недели (окно W−7…W
  включительно), не защищённое поле; защищено только published.
- Входы цепочки несут R55-источники (20–82 записи на неделю), покрытие 27–43/46;
  слепые критерии — `covered:false` с аттестацией, null-значений вместо covered-флага нет.
- D2 (ядерная сфера) может не иметь сигналов в окне недели — приём проекта: переносить
  D2.1–D2.5 из предыдущей недели (их источники старше окна) при явном раскрытии в
  `driverConfidence`, иначе D2 = 1/5 → `insufficient`; так сделано в 09-27 и 10-04 —
  конвенция, не баг.
- Региональная атрибуция и слепые регионы: критерий входа может нести `regions: string[]`
  (⊆ whitelist версии недели: 6 id у v1-недели, 12 у v2); регион без единого сигнала в неделе — слепой (nReg = 0,
  background:true), смешанная неделя (часть регионов с сигналами, часть без) допустима.
  `calc.js` звёт `engine.regionalIndex` с prevIndex/prevGlobal из
  опубликованного снапшота прошлой недели; индекс слепого региона
  = I_global + clamp(prevIndex − prevGlobal, ±regionClamp) — сохраняется последнее
  региональное отклонение от глобального фона, а не схлопывание в I_global (иначе все
  регионы одинаковы и локальные аномалии маскируются). Стартовое отклонение первой
  недели цепочки сидируется из демо-недели 08-23 методологии 1.0 (prevRegions против
  prevGlobal) — намеренно: регионы 3.0 наследуют якоря v1. Следствие формулы: дельта
  слепого региона по построению равна глобальной — подача честная через флаг background
  и пометку `region.background`, не баг. Недели цепочки 3.0 смешанные: входы несут
  атрибуцию `regions[]` на части критериев, поэтому у недели есть регионы с сигналами
  (background:false) и слепые (background:true; слепых 2/3/3/2/2/0/1 из 6 у
  08-30…10-11). Прогон africa-south-asia-sources: africa получила региональные
  источники и покрыта во всех 7 неделях, south-asia — в 08-30/09-06/09-27/10-04
  (в 09-13/09-20/10-11 внутри окна не нашлось ≥2 независимых источников — слепая).
  Всего 24 новых R55-источника, атрибуция `regions[]` на Д1/Д3/Д5/Д7. Состав id версии —
  `regionIdsFor(taxonomy)` / `REGION_TAXONOMIES` в js/data.js (v1/v2), имена — js/region.js.
- Критерий «дельта покрытого региона ≠ глобальной дельте» выполняется не всегда строго:
  при стабильном региональном офсете (индекс региона свой) дельта региона может совпасть
  с глобальной — это свойство региональной модели, не баг (пин в `tests/data.test.js`
  проверяет индекс, а не дельту).
- Дубли id внутри `regions[]` одного критерия validate входа не отклоняет (проверяются
  только тип и whitelist) — известная неблокирующая находка; regionalSignals такую
  запись засчитает дважды.
- `rankedRegions` (js/sections/regions.js) пропускает записи с нечисловым delta
  (typeof !== 'number' / не finite) — нечисловую дельту в данные НЕ вводить, честность
  недостатка данных — через флаг background, а не через костыль формата.
- Тренд (`js/sections/trend.js`) показывает только точки методологии 3.0: `selectMethodology`
  отсекает точки других версий на входе секции (построены по другой методике,
  несопоставимы) — осознанно. Точка тренда несёт `{date, value, methodology}`; неделя
  W берёт версию записываемого снапшота, предыдущие — из их `global.js` на диске
  (регресс-защита: своя неделя не должна брать до-записную версию и выпадать из серии).
  Подпись — `summaryTextV2(lang, points, version = '3.0')` (i18n-ключи
  `trend.summary.v2`/`trend.weeks`; `trend.summary.v2` требует плейсхолдер `{version}`);
  «за N недель» в подписи считает число опубликованных точек v2, а не
  календарный спан окна. Подписи горизонтальной оси — чистый шов
  `axisLabels(lang, points, width?, pad?) -> [{x, text, anchor}]`: дата расчёта
  индекса каждой недели в формате «12 июл» (`axisDate` в js/i18n.js — день +
  сокращённый месяц без точки; ICU отдаёт «июл.»/«сент»), класс
  `.trend-axis-label` (mono 11px, --text-secondary), Y = VIEW_H − PAD.bottom +
  14; все якоря `middle` (формат «ДД мон» до 7 знаков не влезает между
  соседними точками при краевых start/end, поэтому PAD.right поднят до 30);
  общий helper координаты `plotX` с линией (r=20 SVG).
- Записи аудита recalc несут только глобальный diff (`recalcDiff`: global.index/delta,
  dataState, q, nullWeight, confidence, preview) — региональный перенос в diff не
  попадает, смотреть файлы регионов. Перевыпуск 3.0: записи recalc-0034…0041,
  `version_before '2.0'` → `version_after '3.0'`, `recalculation_method
  'aggregateDrivers v3.0'`; flash-записи оставлены version_before=version_after.
- `calc.js --write` пишет ДВА ворот до диска: сначала ссылки (любой broken → отказ,
  blocked — только предупреждение), затем контракт `validate` из js/data.js; при
  провале любого из них диск не тронут.
- Отступления, сознательно зафиксированные в коде: порог 50 % не применяется к подгруппам
  Д9 (null только при 0 покрытых); единственная изолированная циклическая подгруппа Д9 →
  corr 0.5; лимит 30 % Д9 — закрытая форма относительно прогона без Д9; персистентность
  Structural Break Override (2 недели) — состояние цикла несёт calc.js через ctx.
- Д9 не может иметь уверенность high без прямого подтверждения (§4.3.1) — validate режет.
- D4.6 — стресс рынков (методология 3.0, ADR 0021), драйвер Д4, эскалационный,
  ordinal-шкала 0/0.33/0.67/1 (та же, что в якорях); входит в нормировку Д4 как обычный
  esc-критерий, региональную агрегацию не получает (Д4 игнорируется, см.
  ignoredRegionalAttribution). Паритет движок↔сайт пинит tests/methodology-criteria.test.js.
- Пересохранение `design/cassandra-index.pen` в pen.dev перезаписывает `"version"` →
  ломает `tests/pen.test.js` (жёстко ожидает текущую версию).
- `js/share.js`: `share.announce` получает язык через `resolveLang()` — всегда 'ru' (сайт одноязычный).
- Тренд: 12 точек на ширину экрана физически не дают hit-target 44px каждая (r=20 SVG).
- Workflow не включает Pages сам: в НОВОМ репозитории нужен одноразовый шаг
  (`gh api repos/<владелец>/<repo>/pages -X POST -f build_type=workflow`), иначе выкат
  молча не публикуется.
- `.autopilot/sync.py` требует `PYTHONUTF8=1` на Windows (cp1252 падает на печати).
- Форма обратной связи (js/sections/feedback.js) шлёт через FormSubmit: адрес
  `Zasik2008@yandex.ru` требует одноразовой активации владельцем ссылкой из первого
  письма FormSubmit — без неё отправки молча не дойдут, форма покажет честную ошибку.
  Все антиспам-ловушки (honeypot/timing/rateLimit/origin) дают боту фейковый «Отправлено»
  и НЕ шлют fetch — «успешная» отправка в логах/сети не доказательство реального письма.
  Инфраструктурный DDoS статики клиентом не закрывается (закрыт только флод самой формы);
  капча с серверным ключом (Turnstile/reCAPTCHA) не сделана — требует аккаунта владельца.
- Отсутствующая возможность — не повод ставить пакет: возвращай BLOCKED с описанием,
  оркестратор решит.
- Футер «Следующая публикация» живёт в модуле js/sections/history.js — при скрытой
  секции «История и источники» модуль и его регистрация в js/render.js не удаляются:
  render() без хоста `[data-section="history"]` обновляет только `[data-role="footer-next"]`.
- В тексте методологии (`method.fpfn.3` в js/i18n.js) осталось упоминание скрытого
  раздела «История и источники» — известная недействительная ссылка, намеренно не правлена
  (словарь в этом прогоне не чистился).
- Патчи ИБ 2026-10-11 (docs/security-review.md, F-01/F-02/F-05/F-06): GitHub Actions
  закреплены по полному SHA — обновлять только осознанно (PR Dependabot сверять с релизом);
  выкат НЕ публикует data/audit.jsonl (rm в deploy.yml); meta-CSP на обеих страницах —
  index несёт `style-src 'unsafe-inline'` из-за временного `<style>` в head, privacy —
  `script-src 'unsafe-inline'` из-за инлайн-скрипта локализации (вынос в бандл снимет);
  состав meta-CSP обеих страниц пинит tests/csp.test.js — разрешения
  `https://static.cloudflareinsights.com` (script-src) и `https://cloudflareinsights.com`
  (connect-src) осознанны, не мёртвое: живой js/analytics.js шлёт beacon только
  после согласия пользователя.
- В рабочем дереве возможна работа параллельной сессии (weekly-calc и т.п.) — коммитит
  только оркестратор текущего прогона и только свои файлы; чужие правки в коммиты не брать.
- Пилот Jev (прогон jev-classify-converter, 2026-10-11, ADR 0018 доп.): Jev — внешний
  MCP, фетч текстов не часть пайплайна (редактор кладёт корпус в
  `calc/input/drafts/texts-<неделя>/`); классификатор не отбирает источники и не решает
  `covered:false` — это редактор (governance §10.1). Критерии пилота (index ±2 и тот же
  state, экономия редактора ≥50 %) зафиксированы до форвард-прогона — docs/jev-classification.md §7.
- `calc/classify.js`: merge не-счётных записей одного критерия берёт value = max —
  трактовка реализации, дизайн (§4/§6.1) её не задавал; пересмотреть по данным
  форвард-прогона. Известные мелкие дефекты: :129 `Array.isArray(it)` вместо
  `Array.isArray(it.review)`, :116–118 else-if глотает вторую ошибку схемы (value вместе
  с events при отклонённых весах) — неблокирующие, чинить отдельным таском.

## Как здесь работает Autopilot

Сборка ведётся навыком `/autopilot`. Требования, спецификация и таски — в `.autopilot/`.
Прогресс — `.autopilot/dashboard.html`. Правило: требование из `manifest.md`
может снять только пользователь.

Если работа продолжается — скажи «продолжи автопилот»: состояние поднимется
из `.autopilot/state.js`, переспрашивать ничего не нужно.
<!-- autopilot:end -->
