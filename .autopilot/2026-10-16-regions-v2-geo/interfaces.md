# Границы и правила (interfaces)

Всё, что исполнителю нельзя вывести из репозитория, и границы, решённые в
спецификации. Читать до первой строки кода. Спецификация —
`.autopilot/2026-10-16-regions-v2-geo--wip/spec.md`.

## Правила проекта (не выводимые из кода)

- **Ноль зависимостей.** Только stdlib Node / браузер. Любой `npm`/CDN-импорт —
  ошибка. Всё ESM, кроме CommonJS `build.js`. Недостающая возможность →
  вернуть `BLOCKED` с описанием, НЕ ставить пакет.
- **Стек:** чистый HTML/CSS/JS; Node ≥ 18. Тесты — `node --test` (из корня, без
  аргументов; форма `node --test tests/` падает на Windows/Node 24). Один файл:
  `node --test tests/<имя>.test.js`.
- **После ЛЮБОЙ правки `js/**` обязателен `node build.js`** — бандлы
  `js/bundle.js`/`js/bundle-privacy.js` коммитятся; руками не править.
- **Пользовательская строка — только через словарь `js/i18n.js`** (`data-i18n`,
  `data-i18n-aria`, `data-i18n-placeholder`), сайт одноязычный RU. Имена городов
  и стран из `data/geo/*` — **данные**, не UI-строки.
- **DOM** только через `document.createElement` + `textContent`; никакого
  `innerHTML` со строками. Цвета — токены `css/styles.css`.
- **a11y:** фокус 2px #58A6FF, контраст ≥4.5:1, touch ≥44px, reflow 320px,
  `prefers-reduced-motion`, aria-live `[data-role="a11y-live"]`.
- **Не трогать:** `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`,
  `METHODOLOGY.md`, `.autopilot/` (кроме своих артефактов).
- **Сеть** — только на генерации справочника; тесты сети не требуют.
- **Коммитит оркестратор, не исполнитель.**

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `js/data.js` | контракт снапшота, наборы id по версии | `regionIdsFor(taxonomy)`, `CURRENT_TAXONOMY`, `REGION_IDS`, `TAXONOMY_V2_FROM`, `validate(snapshot)`, `week/latest/listWeeks` | разбор версии, схему полей |
| `js/region.js` | реестр двух таксономий, личный регион, согласие | `REGIONS_V1`, `REGIONS_V2`, `REGIONS`, `regionForTaxonomy(v)`, `detect/current/choose/isCurrent/get`, `search(q, catalog?)` | storage-ключи, consent, порядок префиксов |
| `js/geo.js` *(новый)* | ленивая загрузка `data/geo/*` | `loadGeo() -> Promise<{cities,countries}>`, `resolveRegion(countryOrCity, catalog)` | инъекцию `<script>`, кэш, разбор `window.CI_GEO_*` |
| `js/sections/regions.js` | ранжированный список недели | `rankedRegions(snapshot)`, `render(appState)` | порядок и разметку строк |
| `js/sections/hero.js` | пикер (чипы + поиск), персональная карточка | `isBackgroundRegion`, `refineRegionFromCoords`, `render` | DOM панели, тосты, геолокацию |
| `js/sections/history.js` | футер, заметки о версии | `methodologyNote`, `regionalGridNote(lang, viewed, current)`, `nextPublication` | разметку секции |
| `calc/engine.js` | формулы §5/§7, whitelist входа | `regionalSignals(criteria, regionIds, params)`, `regionalIndex(global, region, params)`, `validate(input, params, regionIds)`, `buildDriversCore`, `CRITERIA` | внутреннюю математику |
| `calc/calc.js` | прогон недели, файлы снапшота | `runWeek`, `writeWeek`, `renderWeekCombined`, `loadWeekParts`, `weekPartFiles(taxonomy)`, `renderGlobal`, `renderRegionFile`, `renderRegions`, `nextChainState` | правит части недели на диске |
| `data/geo/generate.js` *(новый)* | генерацию справочника | CLI `node data/geo/generate.js` → `data/geo/cities.js`, `data/geo/countries.js` | скачивание, zip-разбор, эвристику RU-имён |

**Швы для тестов** (поведение проверяется только здесь — чистые функции без
DOM/сети): `regionIdsFor`+`validate` (data.js); `regionForTaxonomy`/`detect`/
`search` с инъекцией каталога (region.js); `resolveRegion` над инъекцией (geo.js);
`regionalGridNote` (history.js); `rankedRegions` (regions.js);
`weekPartFiles`/`renderWeekCombined`/`loadWeekParts`/`regionalSignals`/`validate`
(calc). Ленивый `loadGeo` тестируется с подменённой инъекцией — без сети.

## Данные (не изобретать)

- `data/regions/reference.json` — источник правды таксономии (уже
  `taxonomies:{'1.0','2.0'}` + `taxonomy_version:'2.0'`), зеркало
  `data/regions/reference.js` (`window.CI_REGION_REF`).
- `js/region.js` `REGIONS_V1`/`REGIONS_V2` уже написаны — не переписывать
  состав, только дополнять швы.
- Граница версий: `TAXONOMY_V2_FROM = '2026-10-18'` (недели ≤ 2026-10-11 — v1).
- `PARAMS.methodology` остаётся `'3.0'` — не бампать.

## Из таска 01 — таксономия-фундамент

- `js/data.js`: `REGION_TAXONOMIES{'1.0','2.0'}`; `regionIdsFor(taxonomy='1.0')`;
  `CURRENT_TAXONOMY='2.0'`; `TAXONOMY_V2_FROM='2026-10-18'`;
  `validate(snapshot)` требует ровно `regionIdsFor(snapshot.regions_taxonomy ?? '1.0')`
  (версия вне {'1.0','2.0'} → ошибка).
- `calc/engine.js`: `validate(input, params, regionIds)` — третий параметр, whitelist
  `regions[]` критериев; дефолт `REGION_IDS`.
- `calc/params.js`: `PARAMS.taxonomyV2From = '2026-10-18'`.
- **ВАЖНО для таска 02:** `REGION_IDS` сейчас — псевдоним **v1-шестёрки** (не текущей
  двенадцатки), чтобы цепочка 08-30…10-11 и файлы таска 02 остались зелёными.
  Таск 02 обязан перевести `calc.js` на `regionIdsFor(taxonomyForWeek(week))` и после
  этого сменить смысл псевдонима на текущий набор.
- `tests/regions.test.js` тронут минимально (ожидание `'europe'`→`'balkans'`); таск 04
  переведёт `rankedRegions` на `regionForTaxonomy` и перекроет это.

## Из таска 02 — расчёт по версии

- `calc/calc.js`: `taxonomyForWeek(week) -> '1.0'|'2.0'` (граница `PARAMS.taxonomyV2From`);
  `weekPartFiles(taxonomy) -> string[]` (v1 = 11, v2 = 17 частей); `WEEK_PART_FILES == weekPartFiles('1.0')`;
  `loadWeekParts(week)` читает `global.js` → узнаёт `regions_taxonomy` → читает части своего набора;
  `renderGlobal` пишет `s.regions_taxonomy`; `renderWeekCombined(week, parts)` — контракт прежний
  (набор выводится по v2-эксклюзивным `region-*` в parts).
- **`js/data.js`: `REGION_IDS` теперь = текущий набор (v2, 12)** (смысл флипнут).
- `calc/check-sources.js`: обход region-файлов по версии недели.
- `node calc/migrate-week-combined.js` идемпотентен; `data/` не изменился.

## Из таска 03 — справочник

- `data/geo/generate.js`: CLI `node data/geo/generate.js [--zip <p>] [--country-info <p>] [--out <dir>]`;
  экспорт-швы `unzipFirstEntry(buf)`, `pickRuAlternate(s)`, `parseCityLine(line,ref)`,
  `parseCountryInfo(text)`, `buildRegionMaps(ref)`, `buildOutput(...)`, `COUNTRY_RU`.
- `data/geo/cities.js` → `window.CI_GEO_CITIES = [{name:{ru,en},country,region_v2,region_v1,pop}]`;
  `data/geo/countries.js` → `window.CI_GEO_COUNTRIES = {ISO2:{name:{ru,en},region_v2,region_v1}}`.
- `js/geo.js`: `loadGeo(inject?) -> Promise<{cities,countries}>`,
  `resolveRegion(countryOrCity, catalog) -> {country,region_v2,region_v1,name}|null`, `resetGeoCache()`
  (поиск идёт через `region.search(q, catalog)` — единый вход; `geoSearch` удалён таском 06).
- `js/region.js`: `search(q, catalog?)` — при каталоге результат `[{type:'city'|'country'|'region',
  name,country?,region_v2,region_v1,pop}]` + свойство массива `.broad:boolean`; без каталога — прежний `CITIES`.
- Дампы GeoNames (`*.zip`/`*.txt`) в `.gitignore`; коммитятся только вывод и генератор.
- **ВНИМАНИЕ (таск 05):** `js/bundle.js` пересобирался в волне 2 при параллельной правке `js/data.js`
  таском 02 — таск 05 обязан пересобрать бандл и подтвердить консистентность.

## Из таска 04 — сайт (регионы по версии, пикер, футер)

- `js/sections/regions.js`: `rankedRegions(snapshot)` и `render` берут набор через
  `regionForTaxonomy(snapshot.regions_taxonomy)` — 6 строк (v1) / 12 (v2).
- `js/sections/hero.js`: `refineRegionFromCoords(lat,lon)` → v2-id (или null); пикер при первом
  открытии грузит `js/geo.js` и ищет через `region.search(q, catalog)`; личный регион пиннится
  классом `.region-row--pinned` (раскладку `order` добавляет CSS).
- `js/sections/history.js`: `regionalGridNote(lang, viewed, current)` — '' при совпадении версий,
  иначе строка с датой `TAXONOMY_V2_FROM`; в футере — строка атрибуции GeoNames.
- i18n (RU): `region.panel.broad`, `region.panel.noregion`, `region.toast.stale`,
  `history.taxonomy.note`, `footer.geo`, `privacy.geodata.h`, `privacy.geodata.text`.
- `privacy.html`: ссылка-анкор на CC BY 4.0 GeoNames; пин `privacy.test.js` сужен: внешние
  `src=`/`stylesheet` по-прежнему запрещены, разрешён только `<a>`-анкор лицензии.

## Из таска 06 — доводка (обновления контрактов)

- `calc/calc.js`: `renderWeekCombined`/`partOrder` берут версию из `regions_taxonomy` global-части;
  рассинхрон набора и версии → явная ошибка (не молчаливый даунгрейд).
- `js/region.js`: приватный `findById(list,id)` (дубль устранён); `search` несёт `.broad:boolean`
  в обеих ветках (fallback без каталога → `false`).
- `js/geo.js`: **`geoSearch` УДАЛЁН** — единый вход поиска `region.search(q, catalog)` (замена
  прежнего решения из таска 03).
- `data/geo/generate.js`: `SOVEREIGN_ISO` (Set, 195 ISO2); столица = `PPLC && SOVEREIGN_ISO.has(country)`;
  `data/geo/*.js` перегенерированы (12417 городов, 252 страны).
