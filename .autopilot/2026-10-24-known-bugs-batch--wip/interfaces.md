# Интерфейсы и правила проекта (прогон 2026-10-24-known-bugs-batch)

## Правила проекта (договорённости прошлых прогонов — обязательны)

Дословно из `.autopilot/PROGRESS.md` (раздел «Договорились — не пересматривать»):

- Контракт покрывает **весь** `data/public/**`, а не шесть названных путей (2026-10-19).
- `docs/api.md` — только в репозитории; страницы `api.html` нет: «сайт — витрина, не справочник» (2026-10-19).
- `PUBLIC_SCHEMA_VERSION = 1` не растёт: новых полей в существующих файлах нет.
- Схемы держатся на ключах минимального валидатора `tests/public-contract.test.js`; nullable — массивом типов.
- В силе: лицензии по типу материала, ADR 0045 (UI не раскрывает формулы), порядковая шкала,
  forward-only `precursor`, `validation.json` из `backtest.js --write`, `forecast-ledger.json` из `ledger.js --write`.
- Региональный порог гипотетик — forward-only: недели < 2026-10-25 считают по глобальному 50 %
  (ADR 0065); переписывать опубликованную историю автоматика не вправе.

Решение пользователя этого прогона (2026-10-24): R09 чинить **без нового поля** в
forecast-ledger.json; различие причин `verified:null` документировать парой
`(outcome, actualIndex)`; если бы не вышло — отложить. Вышло (notes §9а).

## Границы, решённые в спецификации

Зоны правок (друг друга не пересекают; js/** не трогаем):

- **docs-only:** `docs/api.md` (R04, R05, R06, R09а, R10), `docs/preproduction-decisions.md`,
  `docs/regional-iwith-degeneracy.md` (R03), шапка `calc/digest-export.js` (R05 — комментарий).
- **тесты-only:** `tests/public-contract.test.js` (R06-пин, R07, R08),
  `tests/ledger.test.js` (R09б-пин), `tests/quotes.test.js` (R13-пин).
- **calc:** `calc/ledger.js` (R09б), `calc/backtest.js` (R10), `calc/public-export.js`
  (R11, R12), `calc/quotes.js` (R13).
- **производные (пересборка CLI, не руками):** `data/public/validation.json`,
  `validation.html` (R10 — `node calc/backtest.js --write`); `data/public/trend.svg`,
  `data/analysis.js`, `changelog.html` и пр. (R11/R12 — `node calc/public-export.js --write`).
  Паритет производных пинят tests/public-contract.test.js, tests/contribution-ui.test.js.

Швы, которые используют тикеты (существующие, новые не вводим):
- `writeLedger({rootDir, weeks, loadSnapshot, anchorsDir, gitProbe})` / `buildLedger` —
  дефолт anchorsDir считается от `rootDir` (R09б).
- `verifyQuotes(sources, corpusDir, opts)` с шовым `opts.readText` (R13 — без диска в тесте).
- Сторож api.md: `docPathFor(rel)` + матч с границами (R07).
- Nullable-тест: мутации дисковых публичных файлов + минимальный валидатор (R08).
- `toTrendSvg(points…)` — сегменты по `p.methodology` (R12).
- Печать водопада в `main()` public-export.js — причина из `loadAnalysisFromDisk` (R11).

Что исполнители НЕ делают: не коммитят сами; не трогают незакоммиченные чужие правки в дереве
(docs/articles/* и др.); не пересматривают forward-only-гейты; не правят производные руками;
не меняют поведение расчёта (глобальный ряд 51/42/43/56/47/46/56/64 неподвижен).

## Что закрыли тикеты (дополняется по мере прогона)

(пока пусто)
