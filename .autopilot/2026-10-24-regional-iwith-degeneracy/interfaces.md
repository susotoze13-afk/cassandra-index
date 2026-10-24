# Границы и правила проекта

## Правила проекта (обязательны для каждого исполнителя и ревьюера)

Из `carried.md` («Договорились — не пересматривать») и AGENTS.md:

- Публичный контракт покрывает **весь** `data/public/**`; новый файл без схемы и
  строки в `docs/api.md` роняет `tests/public-contract.test.js`. В этом прогоне
  `data/public/**` **не меняется**.
- `docs/api.md` — только в репозитории; страницы `api.html` нет.
- `PUBLIC_SCHEMA_VERSION = 1` не растёт.
- ADR 0045: страница «Методология» **не** показывает формулы и веса. ADR 0062
  раскрывает их для API. UI вслед за API не «чинить».
- Лицензии по типу материала не трогаются; `LICENSE*`, `NOTICE`, `TRADEMARK.md`
  не редактируются.
- `precursor`, `validation.json`, `forecast-ledger.json` — forward-only / свои
  генераторы; в этом прогоне не касаются.
- **`METHODOLOGY.md` не редактируется** (правило репозитория). Трактовка живёт в ADR.
- Ноль зависимостей: только stdlib Node / браузер. Всё ESM, кроме `build.js`.
- Все числа модели — в `calc/params.js`; движок подставляет их дефолтами.
- `data/**`, `data/public/**`, `digest.html`, `changelog.html`, `data/analysis.js` —
  производные: руками не правятся.
- `node build.js` обязателен только после правки `js/**`; здесь не нужен.
- Коммит — только с названными путями; чужие правки в дереве не брать.
- Никаких секретов в файлах, промптах, коммитах и отчётах.

## Границы, решённые в спецификации

### `calc/params.js` — числа модели

- **Владеет**: единственный источник чисел (`PARAMS`, `list()`).
- **Добавляет**: `regionHypothesisThreshold: 1e-9`,
  `regionHypothesisFrom: '2026-10-25'` с комментариями на русском в стиле соседей.
- **Скрывает**: всё остальное; сигнатуры не меняются.

### `calc/engine.js` — формулы

- **Владеет**: `driverScore`, `d8Strength`, `aggregateD9`, `aggregateDrivers`,
  `regionalIndex`, `regionalSignals`; скрывает `scoredCriteria`, `hypotheticalIndex`.
- **Новый экспорт**: `regionalHypothesisParams(params, week) → params` — чистый
  шов гейта, без диска и сети. Контракт:
  - `params` пуст → `PARAMS`;
  - `from = p.regionHypothesisFrom`; если `from` не непустая строка → подмена всегда;
  - если `week` — строка и `week < from` → вернуть `p` без подмены;
  - иначе → `{ ...p, coverageThreshold: p.regionHypothesisThreshold ?? 1e-9 }`.
- **Меняет**: `regionalSignals(criteria, regionIds, params, week)` — четвёртый
  опциональный аргумент; внутри `const pRegion = regionalHypothesisParams(p, week)`
  и обе гипотетики получают `pRegion`. `nReg`, `eDyn`, `eStruct`,
  `hasDeescSignals` не меняются.
- **Скрывает**: реализацию подмены; вызывающие видят только сигнатуру.

### `calc/week-step.js` — шаг недели

- **Владеет**: `computeWeek`.
- **Меняет**: одна строка вызова — `regionalSignals(input.criteria, regionIds, params, week)`.
- Новых экспортов нет.

### `tests/regional-signals.test.js` — существующие пины

- **Владеет**: семантика `regionalSignals` на синтетике.
- **Меняет**: пин `eu.iWithout` (`:94`) на ≈ 37.65 с комментарием; остальные
  значения не трогает. `af.iWith === 0` (`:100`) остаётся.

### `tests/regional-hypothesis.test.js` — новый файл

- **Владеет**: гейт и поведение на реальном входе.
- **Проверяет**: `regionalHypothesisParams` (4 ветки), `regionalSignals` с
  реальным `calc/input/2026-10-18.json` при `regionHypothesisFrom = '2026-10-18'`
  (russia-belarus/ukraine-moldova `iWith > 0`, central-asia `iWith === 0`) и при
  штатном `PARAMS` (старое поведение: russia-belarus `iWith === 0`).
- **Скрывает**: чтение диска — только `calc/input/<неделя>.json`, без сети и без `--write`.

### Документы

- `docs/adr/0065-regional-hypothesis-coverage.md` — новый ADR по шаблону 0064
  (`Дата`, `Статус`, `Контекст`, `Решение`, `Почему`, `Последствия`, `Ссылки`).
- `docs/preproduction-decisions.md` — O10 из §1 в архив §2; новая открытая O11
  (пересчёт истории); шапка: версия 1.5, дата 2026-10-24, диапазон `O1–O11`.
- `docs/regional-iwith-degeneracy.md` — статус: решение принято, ссылка на ADR 0065
  и коммит.

## Швы для тестов

- `regionalHypothesisParams(params, week)` — чистый (без `PARAMS`-мутаций).
- `regionalSignals(criteria, regionIds, params, week)` — чистый.
- Больше швов не добавляем: `scoredCriteria` остаётся приватным.

## Что уже построено (дополняется по ходу)

- `regionalHypothesisParams(params?, week?) → params | { ...params, coverageThreshold }` — чистый шов гейта, без мутаций.
- `regionalSignals(criteria, regionIds?, params?, week?)` — четвёртый опциональный аргумент `week`.
- `PARAMS.regionHypothesisThreshold = 1e-9`, `PARAMS.regionHypothesisFrom = '2026-10-25'`.
- `calc/week-step.js` передаёт `week` в `regionalSignals` (единственный production-вызов).

## Команды

| Что | Команда |
|---|---|
| Установка зависимостей | не требуется — ноль зависимостей, только stdlib |
| Проверка (тесты) | `node --test` из корня, без аргументов |
| Один тест-файл | `node --test tests/<имя>.test.js` |
| Сборка бандла | `node build.js` — **в этом прогоне не нужна** (нет правок `js/**`) |
| Расчёт недели | `node calc/calc.js <неделя>` — только печать; `--write` не запускать |

Не трогать: `METHODOLOGY.md`, `PRD_Casandra_Index.md`, `cassandra-index-prototype.html`,
`data/**` и `data/public/**` (в этом таске), чужие untracked-файлы в дереве.
