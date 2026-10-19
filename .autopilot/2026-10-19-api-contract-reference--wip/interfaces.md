# Границы и швы

## Правила проекта (из `carried.md`, дословно)

> Правки — только в рабочем дереве; коммит и push делает оркестратор.
> После любой правки `js/**` — `node build.js`; тесты — `node --test` из корня.
> Всё ESM, ноль зависимостей; производные файлы (`data/public/*`, `data/analysis.js`,
> `changelog.html`, `digest.html`) руками не правятся — только CLI.
> Секреты и чужие файлы в коммит не брать.

## Команды (обязательные к использованию)

- Стек: чистый Node ≥ 18, ESM, **ноль зависимостей**; JSON Schema — draft 2020-12.
- Один общий прогон: `node --test` (из корня, без аргументов).
- Один файл: `node --test tests/public-contract.test.js`.
- Пересборка схем и публичного слоя: `node calc/public-export.js --write`.
- После правки `js/**`: `node build.js` (в этой сборке `js/**` не меняется).
- Проверить, что пересборка идемпотентна: повторить `node calc/public-export.js --write`
  и `git status --porcelain data/public` (должно быть пусто).
- Не трогать: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`,
  `METHODOLOGY.md`, `.autopilot/`, `docs/competitive-analysis.md` (чужой файл),
  `data/public/*` руками (только CLI), `js/**` (вне сборки).

## Границы, решённые в спецификации

### `calc/public-contract.js` — владелец форм и схем

**Владеет:** описаниями публичных документов (`regionsDoc`, `criteriaDoc`,
`methodologyDoc`, `weekDoc`) и JSON Schema (`schemaDocs`).

**Экспортирует (добавляется):**

```js
SCHEMA_NAMES = {
  ...,
  changelog: 'cassandra-index-changelog',
  digestIndex: 'cassandra-index-digest-index',
  digestWeek: 'cassandra-index-digest',
  validation: 'cassandra-index-validation',
  forecastLedger: 'cassandra-index-forecast-ledger',
}

schemaDocs() // → {
// 'index.schema.json', 'latest.schema.json', 'week.schema.json',
// 'regions.schema.json', 'criteria.schema.json', 'methodology.schema.json',
// 'changelog.schema.json', 'digest-index.schema.json', 'digest.schema.json',
// 'validation.schema.json', 'forecast-ledger.schema.json'
// }  — ровно 11 записей
```

**Скрывает:** внутренние `$defs`, константы `DATE_RE`, `NAME_SCHEMA`,
`LICENSE_SCHEMA`, способ сборки конверта.

**Не делает:** не читает диск, не ходит в сеть, не импортирует `backtest.js`,
`ledger.js`, `digest-export.js`.

### `calc/public-export.js` — владелец записи

**Владеет:** `writePublicData` и списком путей публичного слоя.

**Экспортирует:** без изменений; пишет схемы существующим циклом
`for (const [name, schema] of Object.entries(schemaDocs()))`.

**Скрывает:** форматирование `jsonText` (2 пробела + `\n`), порядок файлов.

**Не делает:** не меняет содержимое `index/latest/weeks/regions/criteria/methodology/
changelog` — только добавляет 5 новых файлов в `schema/v1/`.

### `docs/api.md` — владелец прозы контракта

**Владеет:** таблицей эндпоинтов, описанием полей, версией, лицензией, примерами,
HTTP-поведением (CORS, ETag, cache).

**Обязан упоминать** (сторож проверяет текстом): `index.json`, `latest.json`,
`weeks/<week>.json`, `regions.json`, `criteria.json`, `methodology.json`,
`changelog.json`, `validation.json`, `forecast-ledger.json`, `digest/index.json`,
`digest/<week>.json`, `cassandra-index.csv`, `trend.svg`, `schema/v1/`.

**Не делает:** не заводит страницу сайта и не правит `js/**`.

### `tests/public-contract.test.js` — владелец проверки

**Владеет:** минимальным валидатором `validateNode`, списком проверяемых файлов,
сторожем покрытия.

**Добавляет:**

```js
function publicJsonFiles() // обход data/public/**/*.json, исключая schema/
```

и два теста:
1. каждый файл из `publicJsonFiles()` проходит схему, выбранную по пути
   (`index.json` → `index.schema.json`, `weeks/*` → `week.schema.json`,
   `digest/index.json` → `digest-index.schema.json`, `digest/*` → `digest.schema.json`,
   остальные — `<имя>.schema.json`);
2. каждый файл из `publicJsonFiles()` упомянут в `docs/api.md` и имеет схему в
   `schemaDocs()`; ошибка называет файл.

**Не делает:** не переписывает валидатор на новый язык и не добавляет зависимостей.

### `docs/adr/0062-...md`

**Добавляет** датированное дополнение об охвате всего публичного слоя. Решение и
номер не меняются.

## Швы для тестов

- `schemaDocs()` — единственный вход к схемам (уже есть).
- `validateNode` — чистый валидатор в тесте (уже есть, расширяется кейсами).
- `writePublicData` — идемпотентная запись (уже пинится тестом).
- `node calc/public-export.js --write` — пересборка; повторный прогон байт-в-байт.

## Что НЕ является границей

- `calc/backtest.js`, `calc/ledger.js`, `calc/digest-export.js` — не трогаются и не
  импортируются; их выходные файлы только читаются тестом.
- `js/**`, `index.html`, `css/**` — вне сборки; `api.html` не создаётся.
- `data/public/schema/v1/` — производная, правится только генератором.
