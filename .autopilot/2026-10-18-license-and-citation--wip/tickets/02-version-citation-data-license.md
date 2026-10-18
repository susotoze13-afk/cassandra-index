# 02 — Версия, цитирование и лицензия публичного слоя

**Требования:** R02i, R04, R04i, R04ii, R09, R09i, R10i
**Зависит от:** 01
**Зона:** `VERSION` · `CITATION.cff` · `.zenodo.json` · `calc/public-export.js` · `tests/public-export.test.js` · `tests/citation.test.js` · `how-to-read.html` · `data/public/`
**Волна:** 2
**Ревью:** да — фундамент
**Модель:** сильная

## Что должно заработать

Версия проекта живёт в одном файле, `CITATION.cff` её повторяет, Zenodo знает, что это
датасет, а машинный потребитель `data/public/index.json` видит CC BY 4.0 вместо `null`.
Раздел «Как цитировать» на сайте говорит ту же формулу, что и файлы.

## Из брифа, дословно

> «Добавить CITATION.cff и правило цитирования: «Cassandra Index, версия, дата, URL»»
> «По желанию — DOI через Zenodo на релизы, чтобы индекс цитировали как датасет.»

## Разделы спецификации

Истории 6, 10–13, 26–27; «Решения по реализации» (абзацы про версию, публичный слой,
атрибуцию, сайт); `interfaces.md` §2 и §3.

## Критерии приёмки

- [ ] В корне есть `VERSION` — одна строка semver (`1.0.0`), без префикса `v`
- [ ] `CITATION.cff` валиден по форме CFF 1.2.0: `cff-version: 1.2.0`, `message`,
      `title`, `version` (совпадает с `VERSION`), `date-released` (календарная дата,
      не дата недели), `url: https://cassindex.ru`, `license: CC-BY-4.0`, `authors`
      (collective `Cassandra Index`), `abstract`, `keywords`
- [ ] `.zenodo.json` содержит `upload_type: "dataset"`, `title`, `description`,
      `license: "cc-by-4.0"`, `creators`, `keywords`, `related_identifiers` на
      `https://cassindex.ru`; в нём нет выдуманных DOI и ORCID
- [ ] В `calc/public-export.js` константа `LICENSE` заполнена: `name: 'CC BY 4.0'`,
      `url` — canonical legalcode, `attribution` — непустая строка с `https://cassindex.ru`,
      `note` объясняет обязательность атрибуции, `placeholder: false`
- [ ] `data/public/index.json` и `data/public/latest.json` перегенерированы
      (`node calc/public-export.js --write`) и несут заполненную лицензию;
      повторный `--write` даёт те же байты (детерминизм)
- [ ] `tests/public-export.test.js` пинит `name`, `url`, `placeholder: false`;
      новый `tests/citation.test.js` пинит паритет `VERSION` ↔ `CITATION.cff`,
      `upload_type` в `.zenodo.json` и формулу цитирования в `how-to-read.html`
- [ ] Раздел `#cite-title` в `how-to-read.html` содержит каноническую формулу
      «Cassandra Index, версия, дата, URL» (с версией из `VERSION`), прежние полезные
      пункты сохранены, ссылка на `CITATION.cff` ведёт на существующий адрес
      (GitHub blob — файл не входит в deploy-whitelist)
- [ ] `node --test` зелёный; `node build.js` не требуется (`js/**` не меняется)

## Подсказки

- `data/public/*` — производные: править руками нельзя, только `public-export.js --write`.
- `tests/privacy.test.js` разрешает ровно один внешний URL в `privacy.html` — этот файл
  не трогать.
- `how-to-read.html` — статика без i18n (ADR 0052), текст правится в разметке.
