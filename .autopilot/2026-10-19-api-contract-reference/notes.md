# Заметки: публичный слой `data/public/**` и контракт (ADR 0062)

Республика: ESM, ноль зависимостей, Node ≥ 18. Все пути — от корня
`C:\Users\1\Projects\Cassandra Index`.

## 1. `calc/public-contract.js` — единственный источник описаний и схем

| Экспорт | Что это |
|---|---|
| `PUBLIC_SCHEMA_VERSION = 1` | версия публичной схемы, дублируется полем `schema_version` в каждом файле |
| `SITE = 'https://cassindex.ru'` | база `site` и `$id` схем |
| `SCHEMA_NAMES` | `index: 'cassandra-index-public'`, `week: 'cassandra-index-week'`, `regions: 'cassandra-index-regions'`, `criteria: 'cassandra-index-criteria'`, `methodology: 'cassandra-index-methodology'` |
| `PUBLIC_LICENSE` | конверт CC BY 4.0: `name`, `url`, `attribution`, `note`, `placeholder` |
| `regionsDoc()` | `{schema, schema_version, taxonomy_version, taxonomy_v2_from, current, taxonomies{'1.0','2.0'}}`, регион = `{id, name{ru,en}, countries[], admin_center{city,country,iso3166_2,geonames_id}|null}` |
| `criteriaDoc()` | `{schema, schema_version, methodology, drivers[], criteria[]}`; критерий = `{id, driver, title{ru,en}, description{ru,en}}` (46) |
| `methodologyDoc()` | `{schema, schema_version, methodology, site, license, weights, params, scale, ...}` |
| `weekDoc(week, extra = {})` | `{schema, schema_version, site, license, week, ...}` — конверт одной недели |
| `schemaDocs()` | возвращает карту `'<file>.schema.json' → schema`; сейчас **6** записей: index, latest, week, regions, criteria, methodology |
| `envelopeSchema(name, schemaName, extraProps)` | общий конверт `{schema, schema_version, site, license}` + доп. свойства, `additionalProperties: false` |
| `LICENSE` / `LICENSE_SCHEMA` | конверт лицензии и его схема (внутренние константы) |

Схемы — JSON Schema **draft 2020-12**, `$id` = `https://cassindex.ru/data/public/schema/v1/<name>.schema.json`,
`$defs`, `required`, `additionalProperties: false`, `const`, `enum`, `$ref`.

`index.schema.json`/`latest.schema.json` ссылаются на `week.schema.json#/$defs/week` —
неделя описана один раз.

## 2. `calc/public-export.js` — запись публичного слоя

`PUBLIC_SCHEMA_VERSION`, `datasetOf`, `buildDataset`, `toCsv`, `toTrendSvg`,
`renderChangelogPage`, `writePublicData`, `loadSnapshotFromDisk`,
`loadAnalysisFromDisk`, `LICENSE`.

`writePublicData({rootDir, weeks, loadSnapshot, entries, analyzeWeek})` пишет:

- `data/public/index.json`, `latest.json`, `cassandra-index.csv`, `trend.svg`,
  `changelog.json`, `changelog.html`;
- `data/public/regions.json`, `criteria.json`, `methodology.json`;
- `data/public/weeks/<week>.json` (по одному на неделю);
- `data/public/schema/v1/*.json` — цикл `for (const [name, schema] of Object.entries(schemaDocs()))`;
- `data/analysis.js` (зеркало для сайта), `changelog.html`.

Лицензионный конверт — `LICENSE` из этого модуля, попадает в `index/latest/regions/
criteria/methodology/weeks/*`. `changelog.json` лицензионного конверта **не имеет**
(только `schema`, `schema_version`, `entries`).

## 3. `calc/contributions.js` — развёртка (ADR 0062)

`criteriaShares`, `topCriteria`, `driverBreakdown`, `buildWaterfall`,
`whatWouldChange`, `analyseWeek`. Поля недели:
`driver_breakdown[{driver, score, weight, contribution_pp, top_criteria[...]}]`,
`waterfall{from,to,steps[{...}],residual_pp}`,
`what_would_change{thresholds, criteria[]}`. `Σ contribution_pp = index`.

## 4. `data/public/validation.json` — внешняя сверка (ADR 0063)

Пишет `calc/backtest.js` (CLI `--write`). Верхний уровень:
`schema: 'cassandra-index-validation'`, `schema_version: 1`, `site`,
`license{name,url,attribution,note,placeholder}`, `methodology`, `weeks[]`,
`thresholds{min_pairs, preliminary_below, lags[]}`, `comparators[]`, `summary{comparators, with_coefficients, insufficient}`.

Компаратор: `{id, title, granularity, construct{ru}, provenance{name,url,data_url,retrieved,as_of,license}, overlap{periods,from,to}, levels{n,pearson,spearman,p_permutation,status}, deltas{...}, direction{hits,total,skipped,rate,status}, lead_lag{by_lag[{lag,n,pearson}],best_lag,best,status}, discrepancies[{period,index_delta,external_delta}], note}`.

`status` встречается: `preliminary`, `descriptive`, `insufficient`, `ok`.

## 5. `data/public/forecast-ledger.json` — реестр прогнозов (ADR 0064)

Пишет `calc/ledger.js` (CLI `--write`). Верхний уровень:
`schema: 'cassandra-index-forecast-ledger'`, `schema_version: 1`, `site`, `license`,
`rule{cluster, direction{deadband, values[]}, baseline}`, `entries[]`,
`summary{baseline, editor}`, `misses[]`.

Запись: `{week, kind, committedAt, verified, expectedCluster, expectedDirection,
actualIndex, actualCluster, actualDelta, actualDirection, outcome{cluster, direction}}`.
Сводка: `{entries, cluster{hits,total}, direction{hits,total}, pending{cluster,direction}}`.
Промах: `{week, kind, field, expected, actual}`.

## 6. `data/public/changelog.json`

Пишут `calc/changelog-entries.js` (`CHANGELOG`, `KINDS`, `validateChangelog`,
`sortedDesc`) и `writePublicData`. Верхний уровень: `{schema:
'cassandra-index-changelog', schema_version: 1, entries[]}`. Запись:
`{date, version, kind, title, body, link?}`; `KINDS` сейчас — `taxonomy`, `schema`,
`field`, `methodology`.

## 7. `data/public/digest/*`

`calc/digest-export.js` (`--write`) пишет `digest/<week>.json`,
`digest/index.json`, `digest.html`; текст выпуска собирает `calc/digest.js`
(`buildDigest`), страницу — `calc/digest-page.js`.

- `digest/index.json`: `{schema: 'cassandra-index-digest-index', schema_version: 1, weeks[]}`.
- `digest/<week>.json`: `{schema: 'cassandra-index-digest', schema_version: 1, week,
  subject, text, html, telegram, meta{items, regions, hasPrev}}` — без лицензионного
  конверта и без `site`.

## 8. Тесты

- `tests/public-contract.test.js`: минимальный валидатор `validateNode(data, schema,
  name, schemas, at)`; поддерживает `$ref`, `type` (массив типов и `integer ⊂ number`),
  `const`, `enum`, `minimum`, `maximum`, `minLength`, `pattern`, `minItems`, `maxItems`,
  `items`, `required`, `additionalProperties: false`, `properties`. **Не поддерживает**
  `anyOf`/`oneOf`/`allOf`/`format`/`uniqueItems`. Есть `typeOf`, `resolveRef`.
  Тест «каждый публичный JSON проходит свою JSON Schema» перечисляет 5 файлов + все
  недели; тест паритета сверяет дисковые `schema/v1/*.json` с `schemaDocs()`.
- `tests/public-export.test.js`, `tests/validation-parity.test.js`,
  `tests/digest.test.js`, `tests/changelog.test.js`, `tests/ledger.test.js` — пинят
  содержимое производных.
- `tests/site-pages.test.js` — каждый `*.html` корня в `cp`-строке `deploy.yml`.

## 9. `docs/api.md` — что уже описано

389 строк: эндпоинты, поля, версии, лицензия, примеры. В таблице эндпоинтов есть
`index.json`, `latest.json`, `weeks/<week>.json`, `regions.json`, `criteria.json`,
`methodology.json`, `changelog.json`, `cassandra-index.csv`, `trend.svg`,
`schema/v1/*.json`, но **нет** `validation.json`, `forecast-ledger.json`,
`digest/index.json`, `digest/<week>.json`. Раздел «Схемы» перечисляет 6 схем.

## 10. Конвенции, релевантные правке

- Всё ESM, ноль зависимостей, отступ 2 пробела, имена полей — snake_case в JSON,
  camelCase в JS.
- Публичные файлы — производные: руками не правятся, пересобираются
  `node calc/public-export.js --write` (схемы — тоже), `node calc/digest-export.js --write`,
  `node calc/backtest.js --write`, `node calc/ledger.js --write`.
- После правки `js/**` — `node build.js`; тесты — `node --test` из корня.
- Дата в схеме — `pattern` `^\d{4}-\d{2}-\d{2}$` (`DATE_RE`).
- Лицензии: данные — CC BY 4.0 (`LICENSE-DATA`), доки — CC BY 4.0 (`LICENSE-DOCS`).

## 11. Изменено после прошлой сборки

Коммиты `9dc1e32` и `b67f370` (публичный контракт, ADR 0062/0063/0064) добавили
`calc/public-contract.js`, `calc/contributions.js`, `tests/public-contract.test.js`,
`data/public/schema/v1/*`, `docs/api.md`, `data/public/validation.json`,
`data/public/forecast-ledger.json`. Текущее состояние описано выше по коду.

## 12. Пробелы контракта

| Файл на диске | Схема `schema/v1` | `docs/api.md` |
|---|---|---|
| `changelog.json` | **нет** | есть в таблице, поля не описаны |
| `digest/index.json` | **нет** | **нет** |
| `digest/<week>.json` | **нет** | **нет** |
| `validation.json` | **нет** | **нет** |
| `forecast-ledger.json` | **нет** | **нет** |
| `cassandra-index.csv`, `trend.svg` | не JSON (схема не нужна) | есть |
