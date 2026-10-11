# Таск 01 — calc/classify.js: конвертер черновика v2 → штатный вход

Wave 1 · Zone: `calc/classify.js`, `tests/classify.test.js` (новые файлы)

## Что строится

Чистый конвертер по дизайну `docs/jev-classification.md` §6.1: черновик
`schema_version: 2` (`calc/input/drafts/<неделя>.llm-draft.json`) + корпус
текстов (`calc/input/drafts/texts-<неделя>/`) + набор R55 недели → сырой
штатный вход (`calc/input/pilot-llm-<неделя>.json`-совместимый объект).

## Требования таска

- R01: `calc/classify.js` — ESM, только stdlib, чистые функции
  `normalizeText(s)`, `quoteFound(quote, text, opts)`, `validateDraft(draft)`
  → `errors[]`, `reviewQueue(draft)` → неразрешённые пометки,
  `toInput(draft, r55Sources, corpusDir)` → `{ input, report, errors }`,
  `loadDraft(path)` + тонкий CLI (`node calc/classify.js <draft> [--corpus <dir>] [--out <path>]`,
  точную форму флагов выбери сам и зафиксируй в INTERFACES). Без сети, без DOM,
  без вызова Jev. Корпус — файлы на диске (имя файла ← `source_id` записи;
  соглашение об именовании зафиксируй в INTERFACES, при отсутствии файла —
  честная ошибка/отказ записей этого источника, не падение всего прогона).
- R02: ворота 9–10 в `toInput`: (9) каждая запись с `quote` проверяется
  дословно против текста своего источника в корпусе через
  `normalizeText`/`quoteFound` — не найдена → запись отвергается, запись об
  отказе — в `report`, вход не эмитится, если отвергнута хоть одна обязательная
  запись; (10) `reviewQueue(draft)` непуст → `{ input: null, … }`, вход не
  эмитится. Схема v2 — через `validateDraft` (`schema_version`, обязательные
  поля, `cluster` из whitelist A–F, `events` из `{0.2, 0.5, 1.0, 2.0}`,
  `kind`-дисциплина по §3). `not_found` → `null` в выходном входе;
  `events[]` в выход не сворачивается в `value` — движок нормирует сам
  (переноси структуру так, чтобы `buildDriversCore` принял её — сверься с
  `calc/calc.js`, как вход маппится в драйверы).
- R03: `tests/classify.test.js` (node:test, без сети, синтетические черновики
  и корпус в темп-директориях): неразрешённая пометка → вход не эмитится;
  `quote` не найден в корпусе → отказ; `events[]` не нормируется в `value`;
  `not_found` → `null`; merge нескольких записей одного критерия (несколько
  источников → один критерий входа); плюс позитивный сквозной случай.
- R04: стиль как `calc/engine.js`/`calc/linkcheck.js`; без комментариев-прозы.
- R05: полный `node --test` зелёный (было 323 passed / 0 fail — сохрани рост
  только за счёт нового файла).

## Не трогать

`METHODOLOGY.md`, `PRD_Casandra_Index.md`, `cassandra-index-prototype.html`,
`.autopilot/`, `docs/articles/*`, чужие правки рабочего дерева. Документы дизайна
не править без `D##`-записи.

## Как проверять

`node --test tests/classify.test.js`, затем полный `node --test`.

## Дефинишн оф дан

R01–R05 закрыты, полный набор зелёный, контрактный блок ≤ 25 строк.
