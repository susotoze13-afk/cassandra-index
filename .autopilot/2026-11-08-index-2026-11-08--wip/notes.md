# Исследовательские заметки: неделя 2026-11-08

Собрано 2026-11-08 по коду/данным репозитория. Все пути — от корня.
Ничего в репозитории не менялось, кроме этого файла.

## 0. Окно и базовые числа

- Неделя: `2026-11-08` (воскресенье). Поле `week` входа = `2026-11-08`.
- Конвенция окна в репозитории — 7 календарных дней W−6…W включительно, не W−7:
  - 10-18: `publication_date` min 2026-10-12, max 2026-10-18 (`calc/input/2026-10-18.json`);
  - 10-25: 2026-10-19…2026-10-25;
  - 11-01: 2026-10-26…2026-11-01 (151 источник, `accessed_date` = 11-01).
  Следовательно для 11-08 окно = **2026-11-02…2026-11-08**, `accessed_date` = `2026-11-08`.
  В `.autopilot/2026-11-08-index-2026-11-08--wip/manifest.md:7` написано «W−7…W = 01.11–08.11» — это 8 дней и расходится с фактической конвенцией прошлых недель; бриф пользователя («02.11 по 08.11») совпадает с конвенцией.
- Текущая цепочка: `RECALC_WEEKS` = 08-30…11-01, 10 недель (`calc/calc.js:57`); `PREV_WEEK = '2026-08-23'` (`calc/calc.js:58`).
- `CI_WEEKS` = 14 недель 08-02…11-01, `CI_LATEST = "2026-11-01"` (`data/latest.js:3-4`), `CI_ASSET_REV = "818697ed"` (`data/latest.js:5`).
- Методология 4.0 (`calc/params.js:22`), таксономия v2 с 2026-10-18 (`calc/params.js:28`, `js/data.js:37`).
- Гейты: `independenceGateFrom = 2026-10-11`, `precursorFrom = 2026-10-25`, `countryLayerFrom = 2026-10-25`, `blindReasonFrom = 2026-10-25` (`calc/params.js:96,73,77,123`). Для 11-08 все они уже действуют.

## 1. Полная процедура добавления новой недели

Порядок, проверенный по `weekly-calc.yml:78-104` и прошлым прогонам:

1. Собрать `calc/input/2026-11-08.json` (46 критериев, R55-источники, `driverConfidence`, `blindReasons`, `rejected` при необходимости). Никакого CLI для сборки входа нет — это редакционная работа (черновики/скрипты прошлых недель лежат в `calc/input/drafts/`).
2. Создать сиды `data/2026-11-08/`: `global.js`, `trend.js`, `drivers.js`, 12 × `region-*.js` (см. §3). Тоже вручную/скриптом; CLI нет.
3. `node calc/prepare-week.js --write 2026-11-08` — добавляет дату в `RECALC_WEEKS` и в `CI_WEEKS`/`CI_LATEST`.
   - CLI: `node calc/prepare-week.js [--write] <неделя>`; неделя — первый не-флаговый аргумент (`calc/prepare-week.js:88-96`).
   - `addRecalcWeek` вставляет `'2026-11-08'` в конец `const RECALC_WEEKS = [...]` (`calc/prepare-week.js:23-34`).
   - `addLatestWeek` парсит `window.CI_WEEKS`, добавляет дату, сортирует, поднимает `CI_LATEST` только вверх (`calc/prepare-week.js:39-58`).
   - `CI_ASSET_REV` **не трогает**; ревизию пересчитывает только `updateLatestRev` из `calc/asset-rev.js`, вызываемый в `writeWeek` (`calc/calc.js:847`).
   - **Порядок важен:** prepare-week должен идти ДО `calc.js --write`, иначе `updateLatestRev` посчитает хеш по старому `CI_WEEKS` без 11-08, и `tests/asset-rev.test.js` упадёт.
4. Сухой прогон: `node calc/calc.js 2026-11-08` — только печать, без linkcheck/записи; проверяет `validate`, `validateInputSources`, независимость источников и показывает числа/регионы/страны.
5. Запись: `node calc/calc.js --write 2026-11-08` — сеть обязательна (linkcheck). Прогоняет всю цепочку от `PREV_WEEK` в памяти, пишет только целевую неделю (`calc/calc.js:996-1028`).
6. `node calc/public-export.js --write`.
7. `node calc/backtest.js --write` (обновляет `data/public/validation.json` + `validation.html`; фикстуры локальные, сети нет).
8. `node calc/ledger.js --write` (обновляет `data/public/forecast-ledger.json`; в workflow не входит, но на 11-01 запускался — см. коммит 6a89912).
9. `node calc/digest-export.js --write`.
10. `node blog-build.js --write` — если появилась статья `docs/articles/weekly/2026-11-08.md`; без неё просто пересобирает индекс/feed/sitemap/llms. В workflow входит всегда.
11. `node build.js` — страницы грузят бандлы; после правок `js/**` обязателен, workflow запускает всегда.
12. `node --test` — зелёный.
13. Коммит/пуш — только оркестратор; push в master = выкат.

Примечания:
- `calc.js --write` сам пишет `data/2026-11-08/{global,regions,trend,sources,region-*}.js`, затем собирает `week.js` (см. §10-11).
- `data/audit.jsonl` пополняется автоматически записью `recalc` (+ `flash`, если сработал триггер) — `calc/calc.js:851-878`.
- `node calc/migrate-week-combined.js [недели…]` — только идемпотентная пересборка `week.js` из дисковых частей; `CI_ASSET_REV` сам не обновляет, после неё нужен `updateLatestRev(ROOT)` (CLI у `calc/asset-rev.js` нет, вызывать импортом).
- `weekly-calc.yml` для v2-недель имеет устаревший ворот сидов (`region-europe`), поэтому автозапуск для 11-08 не использовать — считать вручную по списку выше (AGENTS.md, «Подводные камни»).

## 2. Структура `calc/input/<неделя>.json` (эталон 2026-11-01)

Top-level поля (`calc/input/2026-11-01.json`):
- `week`: `"2026-11-01"` (обязательно, строка YYYY-MM-DD).
- `params`: `"calc/params.js"` (опциональная строка).
- `criteria`: объект из 46 ключей `D1.1`…`D9.7`; слепой критерий — **`null`**, покрытый — объект.
- `driverConfidence`: `{ D1…D9: { level: high|medium|low, reason?: string } }`; у Д9 `level` не может быть `high` (`calc/engine.js:993-995`).
- `blindReasons`: `{ <id>: "not-collected"|"searched-none"|"gate-failed" }` — для каждого слепого критерия; с 10-25 обязателен, но проверка — warning, не ворота (`calc/history-debt.js:179-197`).
- `sources`: массив R55 (151 запись у 11-01).
- `rejected`: опциональный массив `{url,date,reason}`; `reason` ∈ duplicate|out-of-window|wrong-criterion|weak|unavailable (`calc/history-debt.js:23`), warning.
- `legacy_skeleton`: только у ранних недель 08-30/09-06/09-13; для 11-08 не нужен.

Форма покрытого критерия:
```json
"D1.1": {
  "events": [0.5, 0.5, 0.5],
  "regions": ["middle-east", "north-america", "east-asia"],
  "covered": true,
  "sources": [
    { "url": "https://...", "date": "2026-10-29", "cluster": "B-state-media",
      "type": "secondary", "state_affiliated": true }
  ]
}
```
- `value` 0..1 **или** `events` (для `scale: "count"` — ровно одно из двух); `events` — веса из `[0.2,0.5,1.0,2.0]`, не более `capCount*2 = 10` (`calc/engine.js:910-933`).
- `covered` обязан быть `true` (непокрытый — только `null`, `covered:false` контракт не принимает).
- `sources`: ≥1 запись `{url,date,cluster,type?,state_affiliated?}`; `cluster` из whitelist A–F (`calc/engine.js:937-959`).
- `regions`: опциональный массив id таксономии недели (см. §7).
- `intersection`: опциональный boolean, только на покрытом; региональной/страновой моделью игнорируется (`calc/engine.js:901-905`).
- `quotes`: опционально, массив `{criterion,text}`; для 11-08 **не добавлять без корпуса** `calc/input/drafts/texts-2026-11-08/` — иначе `writeWeek` отклонит запись (`calc/calc.js:789-795`).

Форма R55-источника (top-level):
```json
{
  "id": "aa-kremlin-trilateral-pause",
  "title": { "ru": "...", "en": "..." },
  "domain": "aa.com.tr",
  "url": "https://...",
  "publication_date": "2026-10-30",
  "accessed_date": "2026-11-01",
  "source_type": "secondary",
  "cluster_id": "B-state-media",
  "state_affiliated": true,
  "origin": "collected-in-week"
}
```
Обязательны: `id`, `title{ru,en}`, `domain`, `url`, `publication_date`, `accessed_date`, `source_type` ∈ primary|secondary|OSINT, `cluster_id` из whitelist, `state_affiliated` boolean (`calc/calc.js:113-141`). `origin` ∈ collected-in-week|editorial-backfill и прочие опциональные (`author`,`archive_url`,`archive_date`,`confidence`,`notes`) — `calc/calc.js:111`.
Схема источников критерия отличается от R55: там `cluster`/`type`, а не `cluster_id`/`source_type`.

Не добавлять `covered:false`; отсутствующий ключ критерия трактуется как слепой, но лучше перечислить все 46 с `null`.

## 3. Сиды `data/2026-11-08/`

Обязательны ДО `calc.js --write` (иначе контракт отклонит запись):
- `global.js` — минимум `s.published = "2026-11-08"` (иначе `published: required YYYY-MM-DD`), желательно `methodology: "4.0"`, `regions_taxonomy: "2.0"`, `through`, `dataState`; числа перезапишет генератор (`calc/calc.js:421-445`, спецификация 10-18 `/spec.md:70-75`).
- `trend.js` — **ровно 12 точек**, окно сдвигается: у 11-01 было 08-16…11-01; для 11-08 — 08-23…11-08, последняя `{date:"2026-11-08", value:0}` (значение заменит расчёт). Иначе `trend: exactly 12 weekly points required` (`js/data.js:200-202`).
- `drivers.js` — ровно 3 глобальных драйвера; `observation{ru,en}`, `why{ru,en}`, `contribution`/`confidence` ∈ high|medium|low, `sources` 2..5 (`js/data.js:219-239`). Генератор `drivers.js` **не пишет** — это редакционный сид.
- 12 × `region-*.js` — по 2 драйвера и `confidence` в каждом; генератор сохраняет `confidence` и `drivers` из прежнего файла verbatim, перезаписывая только `index/delta/status/background` (`calc/calc.js:451-460`). Если сида нет, региональные файлы получат `undefined` narrative (контракт не упадёт, но карточки региона будут пустыми).
- `regions.js`, `sources.js`, `week.js` генератор пишет сам; `drivers.js` не перезаписывает.

Кто/когда пишет:
- Для 11-01 использован закоммиченный скрипт `calc/input/drafts/seeds-2026-11-01.mjs` (структура: `GLOBAL_DRIVERS` ×3, `REGIONS` ×12, `TREND` 12 точек, `--write` пишет 15 файлов; самопроверка 2..5 источников и полноты 12 id — строки 483-556). Для 10-18 сиды написаны вручную (коммит a66d33b).
- Для 11-08 проще всего скопировать структуру `seeds-2026-11-01.mjs`, заменив WEEK/тексты/источники, либо писать файлы по образцу `data/2026-11-01/`.
- Источники сидов брать **verbatim из `calc/input/2026-11-08.json` по id** — иначе linkcheck проверит лишние URL и может отклонить запись (`seeds-2026-11-01.mjs:21-26`).

`validate` (`js/data.js:219-239`) смотрит только глобальные `drivers` (3 шт., 2..5 источников, ru+en) и наличие/форму `trend` (12 точек); региональные `drivers` контрактом снапшота не проверяются, но их требует редакционная спецификация.

## 4. Тесты-пины при добавлении недели

### Жёстко падают / требуют правки
- `tests/data.test.js:477-505` — `CHAIN_GLOBAL_PIN`: сейчас 10 строк 08-30…11-01 и `assert.equal(CHAIN_GLOBAL_PIN.length, 10)` (строка 492). Добавить строку `['2026-11-08', index, delta, q, dataState]` и заменить 10 на 11. Числа брать из прогона `node calc/calc.js 2026-11-08`; комментарий теста требует при расхождении с ожиданием — стоп/отчёт, а не молчаливая актуализация.
- `calc/live-check.js:19` — `EXPECTED_WEEK_COUNT = 14` → `15`.
- `tests/live-check.test.js:60-65` — `EXPECTED_WEEK_COUNT`/`result.weeks.length` 14 → 15 и в литеральный список недель добавить `'2026-11-08'`.
- `tests/ledger.test.js:293-295` — baseline сейчас 9 записей 09-06…11-01. Если запускать `node calc/ledger.js --write` (как на 11-01), станет 10 записей и последняя 11-08 → обновить `baseline.length` и `baseline[last].week`. Если ledger не пересобирать, тест останется зелёным, но реестр будет отставать.
- `tests/region-country-consistency.test.js:24` — `WEEK = RECALC_WEEKS.at(-1)`, то есть после добавления это 11-08. Тест читает `calc/input/countries/2026-11-08.json` и требует валидный оверлей (`:39-40`), а также `RU.background === false` и **равенство** индекса/дельты региона `russia-belarus` стране RU (`:80-85`). Без оверлея тест падает; см. §5 и §7 о риске неравенства.

### Конвенционные пины (не падают, но их принято расширять)
- `tests/regional-deviation.test.js:18-22` — локальный `CHAIN` из 10 недель; добавить `'2026-11-08'`, поправить формулировку «10 недель» (`:53`). Тесты разброса/формы на 11-01 (`:31-47`) не меняются — 11-01 не пересчитывается.
- `tests/engine-attribution-parity.test.js:18-22` — локальный `CHAIN` 10 недель; добавить 11-08, заголовок `:32` «08-30…11-01» обновить. Это единственный тест, который докажет, что пересчёт 11-08 совпадает с опубликованными числами.
- `tests/trend.test.js:188-199` — пин 11-01 (10 точек 4.0) остаётся верным (тренд 11-01 не меняется). Для 11-08 можно добавить аналогичный тест: 11 точек 4.0 (12 точек окна минус 08-23 методологии 1.0).
- `tests/regions.test.js:102-110`, `tests/precursor.test.js:75-88`, `tests/regional-deviation.test.js:31-47` — прибиты к 11-01 и не меняются.

### Динамические — править не нужно
- `tests/latest-loader.test.js:28-50` — больше **не** пинит число недель литералом: читает `data/latest.js` и проверяет самосогласованность/по одному `document.write`. Старые прогоны (a66d33b) правили литералы, но после ccaf356/2dfa408 тест динамический.
- `tests/page-smoke.test.js:21-22` — `WEEKS` из `CI_WEEKS`; проверяет контракт и число строк витрины по таксономии недели.
- `tests/week-combined-parity.test.js` — динамический список `CI_WEEKS`, набор частей `weekPartFiles(taxonomyForWeek(week))`.
- `tests/weeklists-agreement.test.js:11-12,61-66` — читает списки через `readRecalcWeeks`/`readLatestWeeks`; требует, чтобы каталог `data/2026-11-08` существовал и совпадал с `CI_WEEKS` (если prepare-week сработал, а запись упала — тест красный).
- `tests/asset-rev.test.js:126-131` — паритет `CI_ASSET_REV` = хеш всех `week.js` из `CI_WEEKS`; обеспечивается `calc.js --write`.
- `tests/public-contract.test.js:41-43,623-630` — `LAST`/`PREV` и `index.weeks.length` динамические; требует наличия `data/public/weeks/2026-11-08.json` и схемной валидности. Строка `digest/2026-10-18.json` (`:390`) — фиксированный пример, не недельный пин.
- `tests/public-countries.test.js:15-16,39,86-110`, `tests/countries-block.test.js:95-117` — синтетика/временное дерево, от новой недели не зависят.
- `tests/backfill-report.test.js:79` — `>= 8` входов; новая неделя только увеличивает.
- `tests/history-debt.test.js:36` — пинит `blindReasonFrom = 2026-10-25`; вход 11-08 должен нести `blindReasons`.
- `tests/calc-engine.test.js:846-853` — `files.length >= 17`; новая неделя только подтверждает.
- `tests/indices-audit.test.js:42,313` — «14» относится к странам аудита, **не** к неделям; не трогать.
- `tests/digest.test.js:228` — синтетический `'2026-10-25'` в тесте архива; не недельный пин.

## 5. Страновой слой (ADR 0067)

Формат `calc/input/countries/2026-11-01.json`:
```json
{
  "week": "2026-11-01",
  "criteria": {
    "D1.4": {
      "countries": ["RU", "UA"],
      "basis": "непустое основание атрибуции",
      "sources": ["https://...", "https://..."]
    }
  }
}
```
У 11-01 — 7 критериев: `D1.4`, `D3.5`, `D4.2`, `D7.1`, `D7.2`, `D8.2`, `D9.3`; везде `RU`/`UA`.

Правила `validateCountryOverlay` (`calc/country-layer.js:91-165`):
- `overlay.week` обязан совпасть с `input.week`;
- `overlay.criteria` — объект; критерий известен и **покрыт** во входе (`covered === true`);
- `countries` — непустой массив ISO2 `/^[A-Z]{2}$/`, без дублей внутри записи, каждый ISO2 ∈ union стран регионов таксономии (`countryIdsFor`);
- `basis` — непустая строка;
- `sources` — непустой массив URL, каждый URL обязан быть среди источников недели (критериальные + top-level);
- ошибки → `runWeek.countries = { errors }`; `writeWeek` печатает «оверлей стран отклонён: …» и пишется **без** `countries.js`, запись не блокируется (`calc/calc.js:831-842`).

Когда пишется `writeCountryLayer` (`calc/country-layer.js:349-357`): только если `res.countries.rows` есть, то есть неделя ≥ `countryLayerFrom` и оверлей валиден. Пишет `data/<неделя>/countries.js` и пересобирает `week.js` из дисковых частей. Сам `updateLatestRev` не вызывает — его вызывает `writeWeek` после (`calc/calc.js:847`). Если пересобирать слой отдельно — обязательно дозвать `updateLatestRev(ROOT)`, иначе падает `tests/asset-rev.test.js`.

Строки: только страны, заявленные оверлеем; `total` = число стран таксономии (у v2 152), `published` — число не-фоновых; `prevIndex` наследуется страна → регион → prevGlobal (`calc/country-layer.js:284-331`). У 11-01: `total 152`, `published 2`, RU 72.4/Δ+5.3/signals 6, UA 72.4/Δ+4.3/signals 6.

Тесты:
- `tests/region-country-consistency.test.js` — фактически требует оверлей для последней недели;
- `tests/countries-block.test.js`, `tests/public-countries.test.js`, `tests/country-layer.test.js`, `tests/country-layer-write.test.js` — синтетика/временное дерево, наличие нового файла не ломают;
- `data/public/countries/2026-11-08.json` сгенерирует `public-export.js --write`; схема `countries.schema.json`, строка в `docs/api.md` уже есть.

Важно: оверлей на `D4.2` (как у 11-01) валиден, но страновой/региональной моделью Д4 игнорируется (`attributedSignals` исключает Д2/Д4) — в сигналы не войдёт. Для влияния на индекс/строки берите критерии допустимых драйверов (Д1, Д3, Д5–Д8, Д9.3).

## 6. Ворота записи для 2026-11-08

Порядок в `loadInput` (`calc/calc.js:467-490`), до расчёта:
1. `validate(input, PARAMS, regionIdsFor(taxonomyForWeek('2026-11-08')))` — форма 46 критериев, типы, whitelist регионов v2, `driverConfidence`, Д9 ≠ high.
2. `validateInputSources(input.sources, PARAMS)` — R55-схема, whitelist кластеров, опциональные поля (`calc/calc.js:113-141`).
3. `validateSourceIndependence(input, PARAMS)` — с 10-11 каждый покрытый критерий обязан иметь ≥2 кластера whitelist **или** ≥1 `primary|OSINT` (`calc/calc.js:151-171`). Это жёсткие ворота: ошибка → неделя не считается, диск не тронут.

Порядок в `writeWeek` (`calc/calc.js:705-879`):
1. `verifyQuotes` (`:789-795`) — если у источников есть `quotes`, ищет дословность в `calc/input/drafts/texts-2026-11-08/<id>.txt`; нет корпуса/фрагмента → отказ без записи. Если `quotes` нет — корпус не читается вовсе.
2. `collectSourceItems` + `checkSources` (`:799-804`) — linkcheck всех URL: top-level `sources`, `drivers[].sources`, `region-*.drivers[].sources`. `broken` (404/410/прочее) → отказ без записи; `blocked` (401/403/406/нет ответа) → только предупреждение. Нужна сеть; reuters/apnews/... могут быть blocked — это нормально.
3. `validateSnapshot(full)` — контракт `js/data.js`: `published`, `through`, `methodology`, `regions_taxonomy`, `global`, ровно 12 точек trend, ровно 3 глобальных драйвера, `sources`, опциональный `countries`, `coverageCriteria`, `precursor` (`js/data.js:145-300`).
4. Запись частей, `week.js`, `updateLatestRev`, audit.

Прочие проверки (warning, не ворота):
- `validateBlindReasons` (`calc/history-debt.js:179-197`) — с 10-25 каждый слепой критерий должен иметь `blindReasons[id]`; иначе строка «предупреждение: blindReasons…» в `printWeek`. `validateRejected` — warning.
- `precursorOf` — считается всегда; в снапшот пишется с `precursorFrom = 10-25`, у 11-08 поле будет.
- `countryLayerFrom = 10-25` — слой считается при валидном оверлее; без оверлея блока нет (и падает `region-country-consistency`).
- `taxonomyForWeek('2026-11-08') = '2.0'` (`calc/calc.js`/`week-step.js`, `PARAMS.taxonomyV2From`), набор частей v2 = 17.
- `validateSourceIndependence` применяется к покрытым критериям; не забыть про ≥2 кластера/primary у каждого.

Печать `printWeek` (`calc/calc.js:885-960`): индекс/состояние/дельта, покрытие `N/46`, sensitivity, ядро источников, игнорируемая атрибуция, долг истории, `schemaWarnings`, строка регионов («с сигналами: N»), строка стран («опубликовано M из N»), trend.

## 7. Региональная атрибуция

- 12 id v2 (`js/data.js:19-23`): `russia-belarus`, `ukraine-moldova`, `baltic`, `balkans`, `eu-north-europe`, `south-caucasus`, `central-asia`, `east-asia`, `middle-east`, `north-america`, `south-asia`, `africa`.
- Допустимые драйверы: `DEVIATION_DRIVERS = ['D1','D3','D5','D6','D7','D8','D9']`, но `eligible` исключает Д2, Д4 и **все Д9 кроме D9.3** (`calc/engine.js:646-660`). Атрибуция на D2/D4/D9.1–D9.7 (кроме D9.3) игнорируется и печатается как `ignoredAttribution` (ADR 0022).
- Сигнал региона = покрытый критерий с непустым `regions[]`, содержащим id; сигнал с `value: 0` тоже считается; `intersection: true` не считается ни сигналом, ни потоком (`calc/engine.js:611-624`).
- `computeWeek` (`calc/week-step.js:114-153`): `regionalSignals` → для региона с сигналами `nReg > 0`, `background:false`; без сигналов `nReg = 0`, `background:true` и индекс = глобальный internal + clamp(prevRegion − prevGlobal, ±40) (`calc/engine.js:519-538`).
- `signals` = `nReg` пишется в `regions.js`, в `region-*.js` поля нет (ADR 0069). Сайт помечает `signals < 2` (`docs/architecture.md:127-130`).
- `expandRegionAttribution` (ADR 0068, `calc/country-layer.js:188-204`): для каждого покрытого критерия с `countries[]` добавляет в `regions[]` регионы этих стран (RU → `russia-belarus`, UA → `ukraine-moldova`), не мутируя вход. Поэтому валидный страновой оверлей **меняет** региональные сигналы и индексы даже без правки `regions[]` в критериях — это ожидаемо, а не ошибка.
- Ворота независимости проверяют критериальные источники, а не региональную атрибуцию; дубли id внутри `regions[]` не отклоняются (известная неблокирующая находка).
- Как закрывать регионы (шаблон 6ebd089): добавлять источники в уже покрытые критерии и расширять `regions[]`, **не меняя `value`/`events`** — глобальный индекс не меняется; источник обязан быть реальным и в окне; для каждого региона цель `signals ≥ 2`, `background:false` (бриф R02).

Риск для теста `region-country-consistency`: он требует, чтобы индекс `russia-belarus` совпал с RU. Если атрибутировать `russia-belarus` критериям, которых нет в оверлее RU (например, событие только про Беларусь), регион получит лишний сигнал и может разойтись с RU. На 11-01 у обоих было по 6 сигналов и совпадение. Проверять после прогона.

## 8. Покрытие и слепые критерии

- `coverageCriteria` (covered/total=46) на диске:
  - 2026-10-18: 34/46;
  - 2026-10-25: **39/46** (лучший уровень цепочки);
  - 2026-11-01: 35/46.
- Слепой критерий во входе — `"D1.3": null`; причина — `blindReasons: {"D1.3":"gate-failed"}`. У 11-01 11 слепых: D1.3, D1.6, D2.4, D3.1, D4.1, D5.3, D6.1, D6.4, D7.3, D7.4, D9.6a (в текущем файле 7 searched-none + 4 gate-failed; в коммите 6a89912 было 12 слепых, после покрытия D9.5 в 926e551 их 11).
- `coverageCriteria.uncovered` в `global.js` — id в порядке движка; у 11-01 тот же список.
- Сигналы регионов 11-01 (все `background:false`): russia-belarus 6, ukraine-moldova 10, baltic 3, balkans 2, eu-north-europe 5, south-caucasus 2, central-asia 2, east-asia 7, middle-east 14, north-america 4, south-asia 2, africa 3. Минимум 2 — цель брифа.
- Формального «целевого» числа покрытия в коде/тестах нет: бриф требует минимум слепых; ориентир — не хуже 39/46, но под воротами независимости источников. Все слепые обязаны нести `blindReasons`.

## 9. Коммит 6ebd089 — образец «закрытия регионов»

`6ebd089` «Региональные источники 2026-11-01: закрыты все регионы с signals < 2»:
- `calc/input/2026-11-01.json` +164 строки: 7 новых R55-источников; `regions[]` расширены у D1.4 (+south-asia), D3.4 (+south-caucasus, +central-asia), D9.3 (+balkans); D6.3 подтверждён для central-asia; значения/`events[]` не менялись.
- Пересчитаны `data/2026-11-01/{global,regions,region-central-asia,region-south-asia,region-south-caucasus,week,sources}.js`, `data/public/*`, `digest.html`, `data/audit.jsonl`, `data/latest.js`.
- Глобальный индекс остался 72/Δ+4; signals: balkans/central-asia/south-asia/south-caucasus 1 → 2; все 12 регионов ≥2.
- Реестр-обоснование: `docs/source-proposals/2026-11-01-regional-coverage.md` (не `docs/backfill/`); там же перечислены 7 источников и основания атрибуции.
- Вывод для 11-08: источники добавлять в top-level и в `sources` критерия; `regions[]` — только допустимых драйверов; значения не трогать, если нужно сохранить глобальный индекс; после правки — `calc.js --write`, затем производные.

## 10. Что происходит после `calc.js --write`

- `writeWeek` пишет `global.js`, `regions.js`, `trend.js`, `sources.js` (из `input.sources`), `region-*.js` (числа + narrative из сида), затем `week.js`:
  - при валидном оверлее — `writeCountryLayer` (сначала `countries.js`, потом `week.js` из частей);
  - иначе — `renderWeekCombined(week, loadWeekParts(week))`.
- `updateLatestRev(ROOT)` пересчитывает `CI_ASSET_REV` (`calc/asset-rev.js:79+`); `data/latest.js` руками не править.
- `audit.append` — запись `recalc` (`version_before` из старого `global.js`, `version_after` из `PARAMS.methodology`, `recalculation_method: "aggregateDrivers v4.0"`); `flash`-записи при срабатывании триггеров.
- `week.js` — производная; руками не править. Для пересборки из частей: `node calc/migrate-week-combined.js 2026-11-08`, затем **вручную** `updateLatestRev(ROOT)` (CLI нет).
- Если правили только `drivers.js`/`region-*.js` после записи — `week.js` устарел: migrate + updateLatestRev; проще перезапустить `calc.js --write`.
- `article-build.js` — **не** часть конвейера недели и не в workflow. Известный баг: падает с exit 1 на `docs/articles/weekly/2026-10-25.md:24` (лексический ворот FORBIDDEN ловит «шаг к»); для 11-08 статья не обязательна. Если писать — `node article-build.js --write`, затем `node blog-build.js --write`.
- `blog-build.js --write` без `docs/articles/weekly/2026-11-08.md` новых постов не создаёт, но пересобирает `blog/index.html`, `feed.xml`, `sitemap.xml`, `llms.txt`.
- `indices-audit-build.js --write` не обязателен и не входит в конвейер; производная уже отстаёт (carried.md).
- Проверка ссылок после публикации (опционально): `node calc/check-sources.js 2026-11-08`.

## 11. Части недели v2 (17 файлов)

`weekPartFiles('2.0')` (`calc/calc.js:286-292`) в порядке:
`global`, `regions`, затем 12 `region-<id>` в порядке `regionIdsFor('2.0')` (russia-belarus, ukraine-moldova, baltic, balkans, eu-north-europe, south-caucasus, central-asia, east-asia, middle-east, north-america, south-asia, africa), затем `trend`, `drivers`, `sources` = 17.
Опционально + `countries` (presence-gated, недели ≥ 10-25 с валидным оверлеем) = 18 частей; `week.js` собирается из 18, если `countries.js` есть.

`loadWeekParts` (`calc/calc.js:399-414`): читает `global.js` первым, берёт `regions_taxonomy`, затем требует наличие всех частей набора; отсутствие любой → `null`; `countries.js` подхватывает по наличию. `renderWeekCombined` переносит `signals` из `regions` в итоговые `region-*` (ADR 0069).

До `--write` обязательны только сиды (§3): `global`, `trend`, `drivers`, 12 `region-*`. `regions`, `sources`, `week` пишет генератор. После `--write` на диске должны быть все 17 (+ `countries`, если оверлей) и `week.js`; `tests/week-combined-parity.test.js` проверяет байт-паритет `week.js` ↔ части.

## 12. Быстрый чек-лист для исполнителя

1. `calc/input/2026-11-08.json`: 46 ключей, окно 11-02…11-08, R55, `blindReasons` на все `null`, `driverConfidence` (Д9 не high), каждый покрытый критерий ≥2 кластеров или primary/OSINT.
2. `calc/input/countries/2026-11-08.json`: RU/UA на покрытых критериях, URL только из источников недели, непустые `basis`.
3. Сиды `data/2026-11-08/`: `global` (`published` 11-08), `trend` 12 точек 08-23…11-08, `drivers` ×3, 12 `region-*` по 2 драйвера. Источники сидов — verbatim из входа.
4. `node calc/prepare-week.js --write 2026-11-08` (до calc!).
5. `node calc/calc.js 2026-11-08` — посмотреть числа, «с сигналами: 12», страны, предупреждения.
6. `node calc/calc.js --write 2026-11-08`.
7. `node calc/public-export.js --write`; `node calc/backtest.js --write`; `node calc/ledger.js --write`; `node calc/digest-export.js --write`; `node blog-build.js --write`; `node build.js`.
8. Обновить пины §4; `node --test` зелёный.
9. Коммит/пуш — оркестратор.

## 13. Что осталось не выяснено / риски

- Нет формального CLI/генератора сидов: только ручной файл/скрипт по образцу `seeds-2026-11-01.mjs`. Не выяснено иного автоматического пути.
- `docs/architecture.md:133` и `.autopilot/.../carried.md:9-10` говорят «10 недель» — после 11-08 это станет неверно; тесты не ловят, но документацию/память придётся обновить.
- Manifest `.autopilot/.../manifest.md:7` указывает окно «01.11–08.11» (8 дней) — расходится с конвенцией W−6…W; использовать 02.11–08.11.
- `tests/region-country-consistency.test.js` — реальный риск падения, если регион `russia-belarus` получит сигнал, не атрибутированный RU; проверять после прогона.
- `weekly-calc.yml` для v2-недель имеет устаревший ворот сидов (`region-europe`), поэтому авто-прогон не использовать.
- Точное целевое число покрытия нигде не задано; ориентир — 39/46 (10-25) при отсутствии слепых регионов.