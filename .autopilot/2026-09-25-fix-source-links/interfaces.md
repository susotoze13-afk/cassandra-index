# Интерфейсы и правила прогона fix-source-links

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `calc/linkcheck.js` | классификацию статусов и проверку URL | `classify(status)`, `checkUrl(url, opts)`, `checkSources(items, opts)` | fetch, таймауты, повторы, задержки |
| `calc/calc.js` | встройку проверки в запись недели | — (CLI) | порядок: сначала ссылки, потом validate, потом диск |
| `calc/check-sources.js` | перепроверку опубликованных недель | — (CLI) | чтение снапшотов, формат отчёта |
| `data/*/sources.js, drivers.js` | текст источников снапшота | — (данные) | — |

Шов для тестов — ровно один: чистые функции `calc/linkcheck.js` с поддельным
`fetchImpl`. CLI тестами не покрываются.

## Правила проекта (субагент не выводит их сам)

- Стек: чистый Node ≥ 18 ESM, ноль зависимостей (только stdlib). Любой импорт
  npm/CDN — ошибка. `build.js` — CommonJS, остальное ESM.
- Тесты: `node --test` из корня без аргументов (форма `node --test tests/`
  падает на Windows/Node 24). Один файл: `node --test tests/<имя>.test.js`.
- Бандлы: после ЛЮБОЙ правки `js/**` обязателен `node build.js`; бандлы
  коммитятся. В этом прогоне код сайта не меняется — бандлы не трогать.
- НЕ трогать: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`,
  `METHODOLOGY.md`, `.autopilot/` (кроме своих тикетов оркестратором).
- Пользовательские строки сайта — только через словарь `js/i18n.js` (в этом
  прогоне UI не меняется).
- В дереве есть НЕЗАКОММИЧЕННАЯ работа прерванного прогона preprod-decisions
  (calc/calibrate.js, calc/input/anchors/, METHODOLOGY.md, docs/,
  data/*/global|regions|trend, tests/). Она вне зоны этого прогона: не
  редактировать, не откатывать, не коммитить. Коммитить только свои файлы.
- Поля снапшотов global/regions/trend — не пересчитывать и не править.
- Отсутствующая возможность — не повод ставить пакет: вернуть BLOCKED
  с описанием, оркестратор решит.
- Windows: `PYTHONUTF8=1` для python-скриптов; в bash — unix-синтаксис.

## Реестр: что построили таски

## Из таска 01 — linkcheck (после ремонта D01)

- `calc/linkcheck.js` — чистый ESM, ноль зависимостей:
  - `classify(status) → 'ok'|'blocked'|'broken'` — 2xx/3xx ok, 403 blocked (D01:
    bot-защита ≠ битая ссылка), прочее 4xx/5xx и null broken
  - `checkUrl(url, {fetchImpl=fetch, timeoutMs=10000, retries=2, retryDelayMs=1000}) → {url,status,ok,attempts}`
    — ретрай на 429/5xx/таймауте/обрыве; 403 финален (blocked, не ретраится)
  - `checkSources(items, opts) → {checked, ok, broken:[{url,status,where}], blocked:[{url,status,where}]}`
    — items `{url, where}`, проверка последовательная; ворота падают ТОЛЬКО по broken
- Тестовый шов: поддельный fetchImpl, `tests/linkcheck.test.js` (10 тестов, без сети)
