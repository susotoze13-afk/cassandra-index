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
| `js/geo.js` *(новый)* | ленивая загрузка `data/geo/*` | `loadGeo() -> Promise<{cities,countries}>`, `geoSearch(q, catalog)`, `resolveRegion(countryOrCity, catalog)` | инъекцию `<script>`, кэш, разбор `window.CI_GEO_*` |
| `js/sections/regions.js` | ранжированный список недели | `rankedRegions(snapshot)`, `render(appState)` | порядок и разметку строк |
| `js/sections/hero.js` | пикер (чипы + поиск), персональная карточка | `isBackgroundRegion`, `refineRegionFromCoords`, `render` | DOM панели, тосты, геолокацию |
| `js/sections/history.js` | футер, заметки о версии | `methodologyNote`, `regionalGridNote(lang, viewed, current)`, `nextPublication` | разметку секции |
| `calc/engine.js` | формулы §5/§7, whitelist входа | `regionalSignals(criteria, regionIds, params)`, `regionalIndex(global, region, params)`, `validate(input, params, regionIds)`, `buildDriversCore`, `CRITERIA` | внутреннюю математику |
| `calc/calc.js` | прогон недели, файлы снапшота | `runWeek`, `writeWeek`, `renderWeekCombined`, `loadWeekParts`, `weekPartFiles(taxonomy)`, `renderGlobal`, `renderRegionFile`, `renderRegions`, `nextChainState` | правит части недели на диске |
| `data/geo/generate.js` *(новый)* | генерацию справочника | CLI `node data/geo/generate.js` → `data/geo/cities.js`, `data/geo/countries.js` | скачивание, zip-разбор, эвристику RU-имён |

**Швы для тестов** (поведение проверяется только здесь — чистые функции без
DOM/сети): `regionIdsFor`+`validate` (data.js); `regionForTaxonomy`/`detect`/
`search` с инъекцией каталога (region.js); `geoSearch`/`resolveRegion` над
инъекцией (geo.js); `regionalGridNote` (history.js); `rankedRegions` (regions.js);
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
