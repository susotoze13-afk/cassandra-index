# Что оставил прошлый прогон (на входе 2026-10-19-api-contract-reference)

Источник: `.autopilot/PROGRESS.md` + git после последней сданной сборки
(«Autopilot: сборка сдана» = 4842ec2, публичная валидация).

## Договорились — не пересматривать

- Сравниваются только недели методологии `PARAMS.methodology` (3.0): демо-недели 1.0
  в пересечение и в журнал не попадают — переход между методиками не «промах».
- Коэффициент не публикуется ниже `MIN_PAIRS = 6` пар; 6–19 — `preliminary`;
  описательные метрики (направление) отделены от инференциальных (r, p).
- Журнал: редакционные якоря (ADR 0049) проверяются по git «якорь раньше публикации»;
  baseline — наивный benchmark, не прогноз проекта, подписан отдельно.
- Ретроспективные записи в журнал не добавляются; `observedCluster` задним числом
  не выдумывается.
- ACLED сравнивается по агрегатам событий (HDX), а не по Conflict Index (D01, ADR 0063).
- `data/public/validation.json`, `data/public/forecast-ledger.json`, `validation.html`
  — производные: только `node calc/backtest.js --write`; паритет пинит
  `tests/validation-parity.test.js`.
- Внешние ряды обновляет редактор вручную; `calc/backtest.js` в сеть не ходит.
- Прошлые договорённости (лицензии по типу материала, `VERSION`/`CITATION`, DCO,
  официальный источник, граница публичного ядра, порядковая шкала, forward-only
  `precursor`, статические SEO-страницы) — в силе.

## Не доделано

- Редакционных форвардных якорей нет ни одного: журнал показывает только baseline.
- ACLED Conflict Index как композит не сравнивается (D01).
- Lead/lag по месячным рядам не считается: 2–3 точки, сдвиг неинформативен.
- Фикстуры GPR/ACLED/CrisisWatch сняты на 2026-10-18 и сами не обновляются.
- Строки о `calc/backtest.js` в `AGENTS.md` (раздел «Команды») не добавлены: файл
  был занят незакоммиченными правками параллельного прогона.

## Известные баги

- `calc/ledger.js`: `verified:null` не различает «нет коммита якоря», «нет коммита
  week.js» и «git недоступен».
- `calc/ledger.js`: `writeLedger` с `rootDir` без `anchorsDir` читает боевой
  `calc/input/anchors`; editor-записи не фильтруются по неделям цепочки.
- `calc/backtest.js`: ACLED за 2026-10 снят по 2026-10-09, но сравнивается как полный
  месяц; пометки о неполном месяце на странице нет.
- `calc/backtest-fixtures/crisiswatch.json`: 2026-04 = 0/0/0 не объяснён в README.
- `tests/backtest.test.js`: срез `MAX_DISCREPANCIES` не покрыт.
- `calc/public-export.js`: `trend.svg` рисует одну полилинию по всем 12 точкам,
  включая демо-недели методологии 1.0.
- `calc/quotes.js` не проверяет `id` источника на путь (`../`).
- `calc/live-check.js`: `EXPECTED_WEEK_COUNT = 12` зашит литералом.
- `how-to-read.html`: версия `1.0.0` зашита в статику и сверяется тестом с `VERSION`.
- `git clone` на Windows с `core.autocrlf=true` даёт падение двух тестов (CRLF).

## Изменено после сборки

- **9dc1e32** «Публичный API-контракт и развёртка „почему индекс изменился“»
  (ADR 0062): `calc/contributions.js`, `calc/public-contract.js`, `data/public/regions.json`,
  `criteria.json`, `methodology.json`, `weeks/<дата>.json`, `data/public/schema/v1/*.json`,
  `docs/api.md`, секция «Почему индекс изменился» (`js/sections/contribution.js`),
  зеркало `data/analysis.js`; тесты `public-contract`, `contribution-ui`; 765 passed.
- **b67f370** «audit: fix stale q in AGENTS, document SBO floor basis in ADR 0022,
  refactor engine helpers» — документация/рефакторинг без смены чисел.
