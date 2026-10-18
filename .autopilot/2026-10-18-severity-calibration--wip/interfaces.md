# interfaces.md — границы, решённые в спецификации

## Границы, решённые в спецификации

### calc/calibrate.js — модуль калибровки severity (владелец всей механики)
- **Владеет**: генерацию кандидатов severity, ремап событий, in-memory
  прогон цепочки, метрику, порог применения, печать отчёта.
- **Экспортирует (имена)**:
  - `severityCandidates(base = PARAMS.severityValues)` → массив
    `{label, values, note?}`: базовый + сдвиги соседних пар ×0.8/×1.2;
    защиты: строгая монотонность, сохранение 2.0 (иначе кандидат не
    попадает в грид — пометка в note).
  - `remapSeverity(events, from, to)` → массив чисел: вес → вес той же
    порядковой позиции в `to`; вес вне `from` → `null` (не валидатор).
  - `evaluateSeverityChain(weeks, baseSet, candidate)` →
    `{weeks: [{date, index, delta, q}], maxDrift}` — чистый in-memory
    прогон без записи; `weeks` — входы цепочки как у calc.js
    (`calc/input/<week>.json`).
  - `calibrateSeverity(weeks, baseParams = PARAMS)` →
    `{candidates: [{label, maxDrift}], chosen: {label, values, applied: boolean, margin}, reasons: []}` —
    tie-break: минимальный maxDrift, порог применения 5 п.п.
    (= `PARAMS.sensitivityThreshold`), базовый выигрывает при равенстве
    или пределах порога.
- **Скрывает**: вспомогательные таблицы/кэши; CLI-печать.

### calc/calc.js — швы цепочки (переиспользование, не переписывание)
- **Отдаёт**: загрузку входов цепочки, state-machine контекста
  (prevInternal/prevPublished/structuralBreak/prevRegions), шов расчёта
  одной недели (уже есть `loadSnapshotPart`, `nextChainState` и перерас
  недели внутри main-пайплайна). Severity-прогон строится над существующими
  швами; новые экспорты в calc.js допускаются ТОЛЬКО если расчёт недели
  не выделяется без микро-рефакторинга (одна экспортная функция «рассчитать
  неделю по входу и ctx, ничего не писать»).
- **Не меняет**: `RECALC_WEEKS`, `PREV_WEEK`, ворота --write, audit.

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
