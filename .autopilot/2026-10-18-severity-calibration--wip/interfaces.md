# interfaces.md — границы, решённые в спецификации

## Границы, решённые в спецификации

### calc/calibrate.js — модуль калибровки severity (владелец всей механики)
- **Владеет**: генерацию кандидатов severity, ремап событий, in-memory
  прогон цепочки, метрику, порог применения, печать отчёта.
- **Экспортирует (имена)** (уточнено по факту сборки, F1):
  - `severityCandidates(base = PARAMS.severityValues)` → массив
    `{label, values|null, rejected, note?}`: базовый + сдвиги соседних пар
    ×0.8/×1.2; защиты: строгая монотонность, сохранение ровно 2.0
    (иначе кандидат не попадает в грид — `rejected: true` с note).
  - `remapSeverity(events, from, to)` → `(number|null)[]`: вес → вес той же
    порядковой позиции в `to`; вес вне `from` → `null` (не валидатор).
  - `remapCriteria(criteria, from, to)` → `{ok, criteria, missing}` —
    обёртка над `remapSeverity` по всем критериям недели.
  - `evaluateSeverityChain(weeks, referenceSet, candidateSet, ctx0?, params?)`
    → `{weeks: [...], maxDrift, deltaDrift} | {error}`: чистый in-memory
    прогон, без записи и без linkcheck.
  - `calibrateSeverity(weeks, baseParams?, ctx0?, threshold?)` →
    `{candidates, chosen, baseRows, maxDriftBase, reasons, baseRowsPublished}`.
  - `selectSeverity(candidates, base, threshold?)` →
    `{label, values, applied, margin, sens, baseSens, winnerLabel,
    winnerSens, maxDrift, reasons}` (`maxDrift` — след именно выбранного
    набора; при неприменении 0).
  - `SEVERITY_CTX0_DEFAULT` — пустой стартовый контекст
    `{prevInternal: null, prevPublished: null, prevRegions: {}}`;
    реальный старт цепочки собирается в CLI из `PREV_WEEK`.
  - CLI `--severity`.
- **Скрывает**: вспомогательные таблицы/кэши; CLI-печать.
- **Метрика выбора** (уточнено по факту, D02): maxDrift «кандидат против
  базового прогона» у базового структурно 0, поэтому им нельзя выбирать;
  выбор идёт по устойчивости кандидата к собственной ±20 %-пертурбации
  (`sens`, п.п.), порог применения 5 п.п., tie-break — базовый.
  `maxDrift` остаётся информационной колонкой отчёта.

### calc/calc.js — швы цепочки (переиспользование, не переписывание)
- **Отдаёт**: загрузку входов цепочки, state-machine контекста
  (prevInternal/prevPublished/structuralBreak/prevRegions), шов расчёта
  одной недели (уже есть `loadSnapshotPart`, `nextChainState` и перерас
  недели внутри main-пайплайна). Шаг недели выделяется в общий чистый модуль
  `calc/week-step.js` (F1, по факту ревью): `computeWeek`, `classifyPublication`,
  `nextChainState`, `loadSnapshotPart` живут там и реэкспортируются calc.js
  для обратной совместимости тестов; calc.js и calibrate.js импортируют
  модуль — цикл calc.js ↔ calibrate.js снимается.
- **Не меняет**: `RECALC_WEEKS`, `PREV_WEEK`, ворота --write, audit.
- `buildDrivers` переезжает в engine.js тонкой обёрткой над
  `buildDriversCore` (calc.js импортирует оттуда; calibrate.js оставляет
  свой реэкспорт для тестов).

### calc/params.js
- `severityValues` остаётся единственным источником чисел; изменение
  только по результату калибровки и только оркестратором (коммит прогона).
- `sensitivityThreshold = 5` переиспользуется как порог применения
  (не плодим второй порог).

### calc/engine.js
  не меняется: `validate`, `normalizeCriterion`, `buildDriversCore`,
  `detectFlashTriggers` остаются как есть; ремап событий происходит на
  уровне входа ДО валидации (in-memory), не внутри движка.

## Тест-швы (существующие предпочтительны)
- `tests/calibrate.test.js` — добавляются: генератор кандидатов
  (защиты/порядок), ремап (включая вес вне набора → явная ошибка),
  метрика/порог на синтетике, биг-пикчр: calibrateSeverity на синтетической
  цепочке выбирает устойчивый кандидат и при ничьей остаётся базовым.
- Пины НЕ трогаются при выборе базового: `tests/data.test.js`,
  `tests/sensitivity.test.js`, `tests/calibrate.test.js` (k=1.95,
  iterations.length === 1).

## Правила проекта (из AGENTS.md, обязательные для исполнителей)
- Ноль зависимостей, всё ESM; допустим только stdlib Node.
- PARAMS — единственный источник чисел; engine только подставляет.
- `--write` обязательные ворота ДО записи (linkcheck → validate); in-memory
  прогон их повторяет только частично (validate — да, linkcheck — нет).
- Округление только на выходе; внутренние float текут в инерцию.
- Коммит/пуш — только оркестратор; исполнители не коммитят.
- Демонстрация: содержимое якорей и входов не редактировать.
