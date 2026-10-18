# Карта кода: хранение источников/цитат (снято с рабочего дерева 2026-10-18, HEAD `4c3a3f7`)

## 1. Схема источника R55 во входе недели

`calc/input/<week>.json` — top-level ключи: `week`, `params`, `criteria`, `driverConfidence`, `sources`
(проверено на `calc/input/2026-10-18.json`: 71 запись, 46 критериев, 19 критериев `null`).

Поля top-level `sources[]` (2026-10-18, фактические): `id`, `title{ru,en}`, `domain`, `url`,
`publication_date`, `accessed_date`, `source_type`, `cluster_id`, `state_affiliated`, `notes`.
`notes` — единственное фактически используемое опциональное поле (16 записей из 71; в остальных
семи входах `calc/input/*.json` его нет). Опциональные по коду: `author`, `archive_url`,
`archive_date`, `confidence`, `notes` (`calc/calc.js:72`).

```json
{
  "id": "aljazeera-egypt-saudi-help",
  "title": { "ru": "Саудовская коалиция перехватывает дроны…", "en": "Saudi-led coalition intercepts drones…" },
  "domain": "aljazeera.com",
  "url": "https://www.aljazeera.com/news/2026/10/17/saudi-led-coalition-intercepts-drones-as-egypt-weighs-sending-help",
  "publication_date": "2026-10-17", "accessed_date": "2026-10-18",
  "source_type": "secondary", "cluster_id": "B-state-media", "state_affiliated": true
}
```

`criteria[*]` — форма записи (пример D1.1 из 2026-10-18): `covered: true`, `events: [0.5, 0.5]`
(счётные), `sources: [{url,date,cluster,type,state_affiliated}]`, `regions: ["middle-east"]`.
Несчётные несут `value` (0..1) вместо `events`; флаги `acyclic` (Д9) — опциональны.

```json
{ "events": [0.5, 0.5], "covered": true,
  "sources": [{ "url": "https://www.aljazeera.com/…", "date": "2026-10-17",
                "cluster": "B-state-media", "type": "secondary", "state_affiliated": true }],
  "regions": ["middle-east"] }
```

Короткая схема `criteria[*].sources[]` не содержит `id`, `domain`, `title`, `publication_date` —
только `url`, `date`, `cluster`, опц. `type`, опц. `state_affiliated` (`calc/engine.js:687-706`).
`covered: false` в 10-18 не встречается: слепые критерии — `null`.

## 2. Валидация входа

`calc/calc.js:74-99` `validateInputSources(sources, params)` (R55):
- обязательны строки: `id`, `domain`, `url`, `publication_date`, `accessed_date`, `cluster_id` (строка 81);
- `title` — объект с строковыми `ru` и `en` (84);
- `source_type` ∈ `primary|secondary|OSINT` (87);
- `cluster_id` ∈ `PARAMS.clusters` (90-92);
- `state_affiliated` — строго boolean (93);
- опциональные `author/archive_url/archive_date/confidence/notes` — только проверка «строка» (94-96).

**Whitelist запрещённых полей отсутствует**: любое неизвестное поле (как `notes`, `quote`) молча
принимается и не проверяется. Ошибка любого известного поля → `loadInput` возвращает errors,
неделя не считается (calc.js:394-396).

`calc/engine.js:620-720` `validate(input, params, regionIds)`:
- `input.sources` **не читает вообще** (0 вхождений `input.sources` в engine.js) — top-level источники
  валидируются только `validateInputSources`;
- критерий: `covered !== true` допустим только как `null` (653-655); счётный — ровно одно из
  `value`/`events` (657-665), `events` непустой, ≤ `capCount·2 = 10`, веса из `severityValues` (669-679);
  несчётный — только `value` 0..1 (681-683), поле `events` у несчётного **не проверяется**;
- `sources[]` критерия: `url` непустой, `date` = YYYY-MM-DD, `cluster` непустой и из whitelist (684-699),
  `type` и `state_affiliated` опциональны (700-705);
- `regions[]` — массив непустых строк ⊆ whitelist версии недели (708-716).

Дополнительно: `validateSourceIndependence` (calc.js:109-129, ≥2 кластера или ≥1 primary|OSINT,
forward-only от `PARAMS.independenceGateFrom`), `checkCoreSources` (136-158, warning).

## 3. Публикация снапшота

`calc/calc.js:523` `writeWeek(res, state)`:
- `res.sources = input.sources` (calc.js:475) — сырой массив входа;
- 586-591: `sourcesOut = Array.isArray(res.sources) ? res.sources : null`; если есть — `full.sources =
  sourcesOut`, иначе из прежнего `sources.js`; **поля переносятся verbatim, без фильтра**;
- 610: `files['sources.js'] = header(week) + \`  s.sources = ${j(sourcesOut)};\n\` + FOOTER` —
  `renderGlobal` (341-362) источники не пишет вообще, файл собирается в `writeWeek`;
- `j = JSON.stringify(v, null, 2)` (239), `header` (231-237), `FOOTER = '})();\n'` (238).

Формат `data/<week>/sources.js` (1016 строк у 10-18):

```js
window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.sources = [ { "id": "…", "title": {…}, … } ];
})();
```

`notes` доезжает до диска: в `data/2026-10-18/sources.js` 16 вхождений `"notes"`.

Сборка `week.js`: `weekPartFiles(taxonomy)` (244-250) = `global, regions, region-*, trend, drivers,
sources` (v1 = 11, v2 = 17); `renderWeekCombined(week, parts)` (299-315) склеивает тела частей в один
IIFE, требует форму генератора (305-311); `partOrder` (277-291) сверяет набор с `regions_taxonomy`
из global-части; `loadWeekParts` (321-334) читает части с диска по версии. `writeWeek` пишет
`week.js` из `loadWeekParts` (623-627). Ворота ссылок — `collectSourceItems` (165-188) собирает
`sources[]`, `drivers[].sources[]`, `regions.*.drivers[].sources[]`; битая ссылка → отказ записи (598-600).

## 4. Контракт сайта (`js/data.js`)

`isSource(s)` (98-114): `title{ru,en}` + `url` + `domain` строки; затем либо легаси `date` — валидна
сразу (104), либо полная схема: `id`, `publication_date`, `accessed_date`, `source_type` ∈
`primary|secondary|OSINT`, `cluster_id`, `state_affiliated:boolean` (106-113). **Лишние поля не
отвергаются** — `isSource` только проверяет наличие, не состав.

`validate(snapshot)` (117-210): top-level `snapshot.sources` — массив, каждый `isSource` (207-208);
`drivers[].sources` — 2..5 записей, каждая `isSource` (200-204). Отдельного лимита длины
`snapshot.sources` нет. `validateQuality` (224-294) источники не трогает (q/nullWeight/confidence/
coverage/coverageCriteria/preview/recalc/incompleteCoverage/sensitivity).

## 5. Показ источников на сайте

`js/sections/drivers.js`:
- `sortSources` (18-28): тип `primary → OSINT → secondary` (`TYPE_RANK` 13), дата по убыванию
  (`publication_date ?? date`), домен, url; вход не мутируется;
- `sourcesLabel` (65-67) → ключ `sources.word`; `visibleSources` (70-74) — первые 5;
- `buildTypeBadge` (118-124) — `source_type`, фолбэк secondary;
- `buildSourceItem` (126-143) показывает **только** `title[lang]`, бейдж+подпись типа, `domain`,
  `publication_date ?? date`; `notes`, `id`, `cluster_id` не выводятся;
- `buildSourcesAccordion` (150-200) — кнопка `aria-expanded`, разворот в `sessionStorage`
  (`cassandra.sources.open`, TTL 30 мин, 32-61), «Показать все источники» при >5;
- `render` (273) собирает карточки 3 драйверов; регионы используют тот же builder
  (`js/sections/regions.js:65-71`); скрытая история рисует свой `sourceItem` (`js/sections/history.js:111-119`,
  те же 3 поля + тип/домен/дата).

`js/sections/trust.js`:
- `trustFacts(snapshot)` (25-66): `sources.length`, число кластеров по `cluster_id`, `state_affiliated
  === true`, слепые регионы (`background === true` по набору версии), `coverageCriteria`, `sensitivity`,
  `methodology`; `criteriaTotal` — из статического `js/criteria.js`;
- `factsLine` (91-99) — ровно 5 фактов: критерии · источники · кластеры · слепой регион · методология;
- `showSensitivity` (103-109) — порог `TRUST_SENSITIVITY_THRESHOLD = 5` (18);
- `buildDetails` (111-160): распределение по кластерам (`trust.cluster.*`), доля гос/госфин.
  (`trust.details.affiliated`), непокрытые критерии (`trust.details.coverage`/`.na`), строка
  чувствительности (`trust.details.sensitive`).

Ключи `js/i18n.js`: `sources.word` (99), `sources.type.primary|OSINT|secondary` (100-102),
`sources.sort.tooltip` (103), `sources.affiliated` (104); `drivers.sources.hide|showAll|hideAll`
(116-118); `trust.title|na|fact.*|details.*|cluster.*` (172-189); `history.sources.title` (253).
Ключей про цитаты (`sources.quote*`, `drivers.sources.quote*`) нет.

## 6. Цитаты в пилоте Jev

`calc/classify.js`:
- `normalizeText` (29-38): soft-hyphen, тире/минус → `-`, кавычки → `"`/`'`, `\s+` → пробел, trim;
- `quoteFound(quote, text)` (42-47): `includes` после нормализации обеих сторон;
- `validateDraft` (57-151) — схема **v2 с `items[]`**: `{criterion, source_id, kind ∈
  event|background|not_found, cluster, quote, url, value|events, event_date, review, carryover}`;
  `quote` обязателен для всех kind, кроме `not_found` (94-97);
- `toInput` (193-279): цитата используется только как ворота — `quoteFound(item.quote, corpusText(id))`
  (247-249); в критерий входа она **не попадает**: `src` собирается из R55-записи
  (`{url, date: event_date ?? publication_date, cluster, type?, state_affiliated?}`, 257-260),
  `input.sources = r55` транзитом (277).

Фактические черновики **не в схеме v2**: `calc/input/drafts/2026-09-27.llm-draft.json` имеет
top-level `week, generator, window, fetchReport, criteria` (45 критериев), без `items[]`/`schema_version`,
т.е. `validateDraft` на нём даст ошибку. Форма записи критерия:

```json
"D1.4": { "value": 0.67,
  "sources": ["guardian-russia-strikes-ukraine-digital-economy", "…"],
  "quote": "On Friday, another drone strike … ... its air defence systems intercepted …",
  "confidence": "high", "titleOnly": false, "note": "Счётная шкала: …" }
```

`quote` здесь один на критерий (склейка нескольких цитат через `" ... "`), `sources` — массив
**id-строк**, а не объектов. `2026-09-20.llm-draft.json` дополнительно несёт `events[]` и
`eventsDetail[]` (`{sev, what, quote, source}`) — 10 критериев с событиями, 16 с `quote`; у 09-27
`events` нет, `value` у 21 критерия, `status: not_found` у 24.

Корпус: `calc/input/drafts/texts-2026-09-27/` — 19 пар `<source_id>.txt` + `.html` (38 файлов);
все 15 id, использованных черновиком, имеют `.txt`; `texts-2026-09-20/` — 30 файлов `.txt` (без html).
`pilot-llm-2026-09-27.json` — уже эмитированный вход (`week, params, driverConfidence, criteria, sources`).

## 7. Цитаты в опубликованных неделях

Проверено чтением файлов: `data/2026-09-20/sources.js` (77 записей, 44 952 байта) и
`data/2026-09-27/sources.js` (24 записи, 13 999 байт) — подстрок `quote`/`цитат` нет; в
`global.js` обеих недель цитат тоже нет. Поля записей: `id,title,domain,url,publication_date,
accessed_date,source_type,cluster_id,state_affiliated` (у 09-20 и 09-27 без `notes`).

Сверка id (фактическая): черновик 09-20 — 46 уникальных id, все 46 есть среди 77 опубликованных
(0 draft-only, 31 pub-only); черновик 09-27 — 15 id, все 15 есть среди 24 (0 draft-only, 9 pub-only).
То есть id черновиков — подмножество опубликованного набора R55 той же недели.

## 8. Якоря калибровки

`calc/input/anchors/` — 10 файлов: `able-archer-1983`, `crimea-2014`, `cuban-1962`, `feb2022`,
`georgia-2008`, `iraq-2003`, `kargil-1999`, `proxy-sanctions-2018`, `routine-2010s`, `yom-kippur-1973`.
Top-level: `week`, `params`, `note`, `anchor{id,title,type,target:[lo,hi],rollingOrigin}`,
`criteria` (46), `driverConfidence`. Top-level `sources` нет (значит `validateInputSources` к якорям
не применяется — calc.js:394 проверяет только при `input.sources !== undefined`).

```json
"D1.1": { "value": 1, "covered": true,
  "sources": [{ "url": "https://en.wikipedia.org/wiki/Russian_invasion_of_Ukraine",
                "date": "2022-02-28", "cluster": "C-registries" }] }
```

Покрытых критериев 38–42 из 46, остальные `null`; объектов `covered:false` нет. `events[]` **нет
ни в одном** якоре (проверено программно по всем 10 файлам).

Обработка: `calc/calibrate.js:47-53 runAnchor` → `validate(input)` → `buildDrivers` →
`engine.buildDriversCore` (engine.js:127-175) → `normalizeCriterion`. `normalizeCriterion`
(engine.js:209-218): если `Array.isArray(entry.events)` → `min(1, Σsev / capCount)` (capCount = 5),
иначе `value`. `detectFlashTriggers` (225-236) читает `events.includes(2.0)` по D1.4/D2.4.

Если добавить `events` в якорь: для счётного критерия `validate` потребует ровно одно из
`value`/`events` (657-665) и веса из `severityValues`; формула драйвера переключится с
`value` на `min(1, Σsev/5)` — числа якорей и `selectK`/`calibrate` поменяются (пины
`tests/calibrate.test.js:165-180` — k = 1.95, все select-якоря в кластерах, min-запас ≥ 6).
Для несчётного (ordinal) критерия `events` валидацией не запрещён, но `normalizeCriterion`
всё равно возьмёт `events` раньше `value` — тихая подмена шкалы.

## 9. ADR

`docs/adr/` — 0001…0038; следующий свободный номер — **0039** (файла `0039-*` нет). Формат свежего
ADR (`0038-region-delta-without-history.md:1-10`):

```md
# 0038. Дельта региона без истории — от прошлого глобального фона

**Дата:** 2026-10-18
**Статус:** принято (реализовано в `engine.regionalIndex`, `calc/engine.js`; данные недели `2026-10-18` пересчитаны)

## Контекст
… ## Решение … ## Почему … ## Последствия
```

ADR 0037 — «Еженедельная аналитическая рубрика» (2026-10-18, статус «принято»), ADR 0038 — дельта
региона без истории от `prevGlobal`.

Прошлый прогон severity оставил след только в спеке и коде, ADR нет. Суть из
`.autopilot/2026-10-18-severity-calibration/spec.md` (строки 44-52):
- **D01**: метрика выбора severity-набора — устойчивость кандидата к собственной ±20 %-пертурбации
  (`sens`), а не `maxDrift` (у базового он структурно 0); порог применения 5 п.п.,
  tie-break — базовый;
- **D03**: шаг недели вынесен в `calc/week-step.js` (`computeWeek`), `buildDrivers` — в `engine.js`,
  импортная петля calc.js ↔ calibrate.js снята;
- **D02** (для контекста): у якорей нет `events[]`, severity на якорях инвариантна.
Манифест текущего прогона (`.autopilot/2026-10-18-source-quotes--wip/manifest.md`, G02) держит
ADR 0039 за D01/D03 открытым пунктом.

## 10. Тесты, которые придётся обновить

- `tests/sources-schema.test.js` — 9 обязательных полей источников для 7 недель 08-02…09-13,
  отсутствие легаси `date`, `count >= 60`, `validate` принимает снапшоты, запись без `cluster_id`
  отклоняется (жёсткий `REQUIRED`-список, лишние поля не проверяет).
- `tests/data.test.js` — точные числа снапшотов с диска (09-13: index 43, delta +1), `coverageCriteria`,
  `renderGlobal` не пишет `coverageCriteria` без meta, africa/south-asia `background` по неделям.
- `tests/week-combined.test.js` — синтетика `renderWeekCombined`, наборы частей v1 = 11 / v2 = 17,
  отсутствие части → ошибка, `s.sources` как одна из частей.
- `tests/week-combined-parity.test.js` — для каждой недели `CI_WEEKS` выполнение `week.js` в vm равно
  сборке из дисковых частей; миграция идемпотентна байт-в-байт.
- `tests/latest-loader.test.js` — ровно 12 `document.write` на `data/<week>/week.js`.
- `tests/page-smoke.test.js` — каждая неделя проходит `validate`, версия таксономии совпадает с
  `taxonomyForWeek`, витрина = 6/12 строк (литералы).
- `tests/trust.test.js` — 5 фактов, счётчики кластеров/`state_affiliated`, слепые регионы по набору,
  `coverage`/`sensitivity` → null при отсутствии/битой форме.
- `tests/calc-engine.test.js` — валидация `criteria.sources[]` (url/date/cluster/type/state_affiliated).
- `tests/classify.test.js` — `quoteFound`, `validateDraft` (schema_version 2, items), `toInput`
  (R55-транзит, quote вне входа).
- `tests/drivers.test.js` — `sortSources`, `sourcesLabel`, `visibleSources`, `sourcesOpenState`;
  `buildSourceItem`/`buildSourcesAccordion` не тестируются (DOM).
- `tests/regional-signals.test.js` — ADR 0038 (дельта от `prevGlobal`), whitelist регионов входа,
  `background` в `regions.js`/`region-*.js`.
- `tests/csp.test.js`, `tests/page-structure.test.js` — состав разметки страниц (не источники, но
  поедут при правке секций).
- `tests/build.test.js` — только падения `node build.js` на неподдержанных формах import/export;
  паритета содержимого бандла нет.

## 11. Команды

`package.json` нет. Тесты — `node --test` из корня (46 файлов сейчас), один файл —
`node --test tests/<имя>.test.js`. Сборка — `node build.js` (обязателен после правок `js/**`;
бандлы `js/bundle.js`, `js/bundle-privacy.js` коммитятся). Расчёт — `node calc/calc.js <week>` /
`node calc/calc.js --write [weeks…]`; `node calc/migrate-week-combined.js`; `node calc/check-sources.js`;
`node calc/calibrate.js` и `node calc/calibrate.js --severity` (calc/calibrate.js:658-662).

## 12. Состояние после прошлой сборки `4c3a3f7` (regional-source-coverage)

- `calc/input/2026-10-18.json` — 71 источник (было 55), `regions[]` на покрытых критериях
  Д1/Д3/Д5/Д6/Д7/Д8/Д9.3, в D1.4 добавлены события недели; 46 критериев, 19 `null`, `covered:false` нет.
- `calc/engine.js` — единственная правка в `regionalIndex` (строки 448-451): `prevIndex =
  r.prevIndex`, иначе `r.prevGlobal`, иначе `null` (ADR 0038) — иначе дельта была бы `null`.
- `data/2026-10-18/*` — `global`: index 63, delta 7, `regions_taxonomy "2.0"`, q 0.8622,
  `coverageCriteria {covered:27,total:46}`; `sources.js` 71 запись (16 с `notes`); слепых регионов 0;
  `week.js` 2645 строк; `regions.js`/`region-*.js` пересчитаны, `trend.js` обновлён.
- `docs/adr/0037-weekly-regional-brief.md` — рубрика «что произошло / на что повлияло / чего ждать»
  без слова «прогноз», текст статьи не расходится с числами недели.
- `docs/adr/0038-region-delta-without-history.md` — подстановка `prevGlobal` для регионов без истории,
  `delta` больше не `null`, контракт `js/data.js` не менялся.
- `tests/regional-signals.test.js` — +29 строк: три теста ADR 0038 (`prevGlobal` вместо `prevIndex`,
  своя история приоритетна, слепая ветка не изменилась).

## Что придётся тронуть

- `calc/calc.js` — `validateInputSources`/`SOURCE_OPTIONALS`: новое поле (например `quote`) сейчас не описано; `writeWeek` пишет `sources.js` verbatim.
- `calc/input/2026-10-18.json` — источник данных, куда поле попадает первым (71 запись).
- `data/2026-10-18/sources.js` — перегенерируется `--write`, форма `s.sources` (плюс `notes` уже там).
- `data/2026-10-18/week.js` — производная, пересобирается из частей (`renderWeekCombined`).
- `js/data.js` — `isSource` (98-114) и проверка `snapshot.sources` (207-208): новое поле не валидируется, лишние не отвергаются.
- `js/sections/drivers.js` — `buildSourceItem` (126-143): единственное место показа записи источника в аккордеоне.
- `js/sections/history.js` — `sourceItem` (111-119): второй рендер источника (скрытая секция).
- `js/i18n.js` — ключи `sources.*`/`drivers.sources.*` для подписи нового поля.
- `css/styles.css` — стили строки источника (`.driver-source-*`, `.source-*`), если появится блок цитаты.
- `js/bundle.js`, `js/bundle-privacy.js` — пересборка `node build.js` после правок `js/**`.
- `calc/classify.js` — `toInput` (257-260) сейчас теряет `quote`; схема v2 (`validateDraft`) цитату требует.
- `docs/jev-classification.md` — описание схемы черновика и правила цитаты (§3, §6.1).
- `docs/adr/0039-*.md` — новый ADR (свободный номер), формат 0037/0038.
- `tests/sources-schema.test.js` — список `REQUIRED` полей источника.
- `tests/data.test.js` — пины чисел/полей снапшотов с диска.
- `tests/week-combined-parity.test.js` — паритет `week.js` ↔ части (поедет от любой перегенерации).
- `tests/page-smoke.test.js` — `validate` каждой недели после изменения контракта.
- `tests/trust.test.js` — счётчики витрины, если меняется состав/семантика `sources`.
- `tests/drivers.test.js` — чистые швы аккордеона при изменении показа.
