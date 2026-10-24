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

### T03 (ledger + quotes)
- `buildLedger({rootDir, weeks, loadSnapshot, anchorsDir, gitProbe})` / `writeLedger({rootDir, ...})` — дефолт anchorsDir от `rootDir`; константа ANCHORS_DIR удалена. CLI без --root работает прежне.
- `verifyQuotes(sources, corpusDir, opts)` — id вне `^[A-Za-z0-9_-]+$` → `{skipped+1, errors:["sources[i].id: unsafe id"]}`, корпус не читается. Реальные id 09-20/09-27 проходят паттерн.
- Description `verified` в FORECAST_LEDGER_SCHEMA: pending + actualIndex null → неделя не опубликована; иначе null → git-история недели недоступна (текст, структура без изменений).

### T02 (тесты публичного контракта)
- Тестовый шов сторожа: `apiMentionsPath(api, url): boolean` — вхождение с не-буквенно-цифровыми границами или строка markdown-таблицы; URL-вложение не засчитывается.
- Пин: число записей расхождений в docs/api.md сверено с импортированным `MAX_DISCREPANCIES` (число, не формулировка).
- Nullable-покрытие: все пути notes §8 (week 23, validation 12, regions 1, ledger 9) + негативный контроль.

### T04 (backtest: неполный месяц ACLED)
- `incompleteMonths(source, series) → string[]` — месяцы YYYY-MM, где as_of раньше конца месяца (as_of вида YYYY-MM — закрытый месяц, не помечается).
- `comparatorOf().note` — склейка через пробел: insufficient-предложение (как раньше) + «ряд YYYY-MM неполный (as_of …)»; `comparatorLine` дописывает «, пометка: …». Новых полей нет.

### T05 (public-export: водопад и trend.svg)
- `waterfallReasonFor(week, snapshot, prevSnapshot, prevWeek, rootDir=ROOT) → string|null` — отдельный шов причины ('нет входа недели' | 'смена методологии у прошлой недели' | 'нет входа прошлой недели' | 'ошибка построения водопада'); печать main(): «водопад: есть» | «водопад: нет (<причина>)».
- `toTrendSvg` — по `<polyline>` на сегмент methodology; точки без версии подписаны «без версии», не выдуманным номером.
