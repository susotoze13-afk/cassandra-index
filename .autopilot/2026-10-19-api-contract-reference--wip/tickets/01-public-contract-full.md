# 01 — Полный контракт публичного слоя: схемы, документ, сторож

**Требования:** R01, R01.1, R02, R02.1, R03, R04, R05, R06, R07, R08, R09i, A01, R10i, R11i, R12i, R13i
**Зависит от:** —
**Зона:** `calc/public-contract.js` · `data/public/schema/v1/` · `docs/api.md` · `tests/public-contract.test.js` · `docs/adr/0062-public-api-contract-and-driver-contributions.md`
**Волна:** 1
**Ревью:** да — фундамент (схема, на которую ссылается контракт)
**Модель:** сильная

## Что должно заработать

Потребитель открывает `data/public/schema/v1/` и находит схему на **каждый** публичный
JSON, включая `validation.json`, `forecast-ledger.json`, `changelog.json`,
`digest/index.json` и `digest/<week>.json`. В `docs/api.md` у каждого файла есть
эндпоинт, поля, версия, лицензия и пример. Тест падает, если завтра на диске появится
публичный JSON без схемы или без строки в документе. Содержимое существующих
публичных файлов не меняется — только добавляются пять схем, документ и проверки.

## Из брифа, дословно

> «data/public/schema/v1/*.json — JSON Schema; docs/api.md — эндпоинты, поля, версия,
> лицензия, примеры; data/public/regions.json — id, названия, таксономия;
> data/public/criteria.json — 46 критериев, драйверы, описания;
> data/public/methodology.json — веса, пороги, версия;
> data/public/weeks/<date>.json — понедельные файлы для кеширования и embed.»

> «допиши: иначе контракт отстаёт от диска и „источник“ получается неполным.»

## Разделы спецификации

Истории 1–16; «Решения по реализации»; `interfaces.md` — границы и команды.

## Что известно про код (не переисследовать)

- `calc/public-contract.js`: `SCHEMA_NAMES`, `schemaDocs()` (сейчас 6 записей),
  `envelopeSchema(name, schemaName, extraProps)` для конверта
  `{schema, schema_version, site, license}`, `DATE_RE`, `NAME_SCHEMA`, `PUBLIC_LICENSE`.
- `calc/public-export.js`: `writePublicData` уже пишет все файлы `schemaDocs()` циклом —
  менять его не нужно.
- `tests/public-contract.test.js`: минимальный валидатор `validateNode` поддерживает
  только `$ref`, `type` (включая массив типов и `integer ⊂ number`), `const`, `enum`,
  `minimum`, `maximum`, `minLength`, `pattern`, `minItems`, `maxItems`, `items`,
  `required`, `additionalProperties`, `properties`. **Не использовать** `anyOf`,
  `oneOf`, `allOf`, `format`, `uniqueItems`.
- Точные формы файлов — в `data/public/*.json`; читать их, а не выдумывать.

## Критерии приёмки

- [ ] `schemaDocs()` возвращает ровно 11 записей; в `SCHEMA_NAMES` есть `changelog`,
      `digestIndex`, `digestWeek`, `validation`, `forecastLedger`.
- [ ] На диске появились `changelog.schema.json`, `digest-index.schema.json`,
      `digest.schema.json`, `validation.schema.json`, `forecast-ledger.schema.json`;
      повторный `node calc/public-export.js --write` не меняет `git status` по
      `data/public/`.
- [ ] Каждый файл `data/public/**/*.json` (кроме `schema/**`) проходит схему,
      выбранную по пути: `index` → `index`, `weeks/*` → `week`, `digest/index` →
      `digest-index`, `digest/*` → `digest`, остальные — `<имя>.schema.json`.
      Ошибка валидации называет файл и JSON-путь.
- [ ] Схемы `changelog`/`digest-index`/`digest` не требуют `site`/`license`
      (их в файлах нет), а `validation`/`forecast-ledger` — требуют, как в файлах.
      `additionalProperties: false` во всех новых схемах.
- [ ] Числовые поля, которые бывают `null` (например `pearson` в `validation.json`),
      описаны как `['number','null']`; `digest.week` — `['string','null']`.
- [ ] `docs/api.md`: в таблице эндпоинтов есть `validation.json`,
      `forecast-ledger.json`, `digest/index.json`, `digest/<week>.json`; у каждого —
      назначение, поля, версия, лицензия (или явное «конверта нет, данные CC BY 4.0 по
      `LICENSE-DATA`»), пример. Раздел «Схемы» перечисляет 11 файлов.
- [ ] `docs/api.md` фиксирует: `schema_version = 1`; добавление файлов/полей —
      обратно совместимо; `Access-Control-Allow-Origin: *`, ETag и cache — поведение
      GitHub Pages, контрактом не отменяется.
- [ ] `docs/api.md` описывает `cassandra-index.csv` (колонки) и `trend.svg`
      (что нарисовано), хотя JSON Schema к ним не применяется.
- [ ] В `tests/public-contract.test.js` есть тест-сторож: обход
      `data/public/**/*.json` (кроме `schema/`), проверка наличия схемы и упоминания
      пути в `docs/api.md`; при нарушении сообщение называет файл.
- [ ] `docs/adr/0062-public-api-contract-and-driver-contributions.md` получил
      датированное дополнение 2026-10-19: контракт покрывает весь публичный слой,
      `schema_version` не растёт.
- [ ] `node --test` зелёный целиком; `js/**`, `index.html`, `css/**` не изменены.
