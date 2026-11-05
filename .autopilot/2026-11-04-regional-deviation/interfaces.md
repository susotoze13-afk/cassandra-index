# Границы и швы — ADR 0069 (региональное отклонение по драйверам)

Файл читают все исполнители и ревьюеры первым. Спорное место здесь — не повод
решать по-своему: либо переписать спецификацию, либо это чужая граница.

## Из carried.md: Договорились — не пересматривать

- Контракт покрывает **весь** `data/public/**`; `PUBLIC_SCHEMA_VERSION = 1` не растёт —
  новые данные новыми файлами, не полями (страновой слой — `countries/<неделя>.json`).
  ⚠️ Наш текущий бриф (дробная точность, `PUBLIC_SCHEMA_VERSION` 2) **противоречит** этому
  пункту — флагнуть пользователю на брифинге/спеке, а не молча обойти.
- `indices-audit.html` — производная `docs/articles/indices-audit-app-source.md`;
  при расхождении правится приложение; числа считает `indices-audit-build.js`, не рука.
- Страновой слой forward-only: гейт `PARAMS.countryLayerFrom = '2026-10-25'`; бэкфилл
  истории запрещён; недели < гейта не меняются.
- Стартовый охват стран — только RU/UA; расширение — добавлением строк оверлея, без правки кода.
- Цель «3-4 место» аудита не достигнута: 5-е место (70); следующий шаг — внешнее
  рецензирование (клетка Р) — за пользователем.
- Неделя 2026-10-25 и её вход — граница с параллельной сессией: чужие части не трогать.

**Разрешение пункта 1 (зафиксировано в этом прогоне):** пункт о «версии 1 не растёт»
пересмотрен **явным решением пользователя** — Q7 ответ «b» в брифе
`2026-11-04-brief.md`, основание R04 в манифесте, ADR 0069 §3. В этом прогоне
`PUBLIC_SCHEMA_VERSION = 2`. Остальные пункты «Договорились» действуют без изменений.

## Правила проекта (нарушение = отказ ревью)

- Ноль зависимостей: stdlib Node / браузер; всё ESM (кроме CommonJS `build.js`).
- Пользовательская строка — только через `js/i18n.js`; сайт одноязычный RU.
- DOM только `createElement` + `textContent`, никакого `innerHTML` со строками.
- Цвета — только CSS-токены; a11y-правила AGENTS.md (фокус, контраст, 44px, reduced-motion).
- `node --test` из корня без аргументов; после любой правки `js/**` — `node build.js`.
- Производные файлы (`data/public/**`, `changelog.html`, `digest.html`, `data/analysis.js`,
  `week.js`, бандлы) пересобираются только своими CLI, руками не правятся.
- Коммит и пуш — только оркестратор; субагенты-исполнители не коммитят и не трогают
  `git`; чужие правки в рабочем дереве (staged `docs/articles/vc-binance-*`, untracked
  ADR/`.autopilot`) не входят в наши коммиты.
- `METHODOLOGY.md` — заморожен правилом AGENTS.md, **кроме §7**: правка §7 явно
  утверждена пользователем (Q9 «Да — ADR 0069 + правка §7»). Больше в этом файле
  ничего не правится.

## Команды проверки

- **Одна команда проверки:** `node --test` — из корня репозитория, без аргументов
  (форма `node --test tests/` падает на Windows/Node 24). Типчеков и линтеров в
  проекте нет — проверка это тесты.
- **Один файл тестов:** `node --test tests/<имя>.test.js`.
- **Бандл:** `node build.js` — обязателен после ЛЮБОЙ правки `js/**`; бандлы
  коммитятся, руками не правятся.
- **Производные:** `data/public/**`, `changelog.html`, `digest.html`,
  `data/analysis.js`, `blog/**`, `sitemap.xml`, `llms.txt` — только своими CLI
  (`public-export.js --write`, `digest-export.js --write`, `blog-build.js --write`,
  `backtest.js --write`, `ledger.js --write`), руками не правятся.

## Границы, решённые в спецификации

### 1. `calc/engine.js` — владелец формулы §7

**Владеет:** `round1`, gapless `stateOf`, вся математика регионального отклонения,
ветка зеркалирования шока, clamp ±40.

**Отдаёт (сигнатуры, которые зовут остальные):**

- `round1(x) -> number` — `Math.round(x * 10) / 10`; экспорт для тестов и слоёв выше.
  НЕ путать с локальными `round1` в `calc/contributions.js` и `calc/sensitivity.js`
  (они свои, не трогаются).
- `attributedSignals(criteria, ids, params, week, attr) -> { [unitId]: {
  nReg, eStruct, eDyn, hasDeescSignals, deltaRegion } }` — **`iWith`/`iWithout`
  удалены**, вместо них `deltaRegion`:
  `clamp(100 · Σ_d w_d·shrink_d·(s_d^reg − s_d^glob) / Σ_d w_d, ±regionClamp)`,
  где
  - допустимые `d`: D1, D3, D5, D6, D7, D8 и D9 только по критерию D9.3
    (текущий предикат `eligible` уже такой — не менять);
  - `s_d` — `driverScore` на подмножестве критериев драйвера; **обе ноги** —
    с epsilon-порогом ADR 0065 (`regionalHypothesisParams`), не с 50 %;
  - `shrink_d = n_cov_region,d / n_cov_global,d`; при `n_cov_global,d = 0`
    вклад драйвера 0 (отсутствующий драйвер входит нулём);
  - знаменатель — **вычисляемая константа** Σ весов допустимых драйверов из
    `PARAMS.weights` (`0.1175·6 + 0.06 = 0.765`), не хардкод-литерал;
  - D9: региональная нога — только D9.3, глобальная нога — весь покрытый набор Д9.
- `attributedIndex(global, unit, params) -> { index, state, delta, internal,
  background, mirrored }` — `internal = clamp(gInternal + e_r · deltaRegion, 0, 100)`,
  без `m`/`n0`; `index = round1(internal)`; `delta = round1(index − prevIndex)`
  (по **округлённому** индексу — это убивает float-артефакты вида 1.4000000000000057);
  слепая ветка (`nReg ≤ 0`) — без изменений по смыслу, но с `round1`;
  `state = stateOf(index, params)`.
- `stateOf(index, params)` — gapless: `index <= s.max` по упорядоченным состояниям
  (как `js/risk.js status()`); поведение на целых числах не меняется.
- `regionalIndex` / `regionalSignals` — тонкие обёртки, имена остаются.
- `regionalHypothesisParams`, ветка `kappa`/`regionShockDelta` — остаются как есть.

**Скрывает:** внутренности подсчёта `shrink_d` и наборов по драйверам; `deltaRegion`
наблюдается только через `attributedSignals`/`attributedIndex`.

### 2. `calc/params.js` — владелец чисел

`methodology: '4.0'`; **`n0` удалён** (и из `PARAMS`, и из `list()`-глубины — поле
просто отсутствует); `weights`, `regionClamp: 40`, `gamma`, `kappa`,
`regionShockDelta: 15`, `regionEstructDefault: 0.5`, `states` — не меняются.
Больше чисел в других файлах не заводится.

### 3. `calc/week-step.js` — владелец блока региона в снапшоте

`regions[id] = { index, delta, status, background, signals }` — `signals: n` = `nReg`
(слепой регион — `0`). **Ловушка имени:** локальная `const signals = regionalSignals(...)`
в `computeWeek` переименовывается (например, `signalsByRegion`), чтобы не перекрыть поле.
Сигнатура `computeWeek(input, state, params, opts)` и `opts.regionCriteria` (ADR 0068)
не меняются.

### 4. `calc/calc.js` — владелец цепочки и записи

`RECALC_WEEKS` (10 недель) не меняется; `renderRegions` переносит `signals` в часть
`regions.js`; `renderRegionFile` (части `region-*.js`) поле не получает — там
драйверы/confidence сида; `writeWeek` пишет как раньше; аудит:
`recalculation_method: \`aggregateDrivers v${PARAMS.methodology}\`` (динамическая
строка, не литерал); `printWeek` печатает прежние строки. Ворота (quotes → linkcheck →
validate) не ослабляются.

### 5. `calc/country-layer.js` — наследует без своих решений

`buildCountryRows`/`countryIndex` пользуются `attributedIndex` — дробная точность и
новая мера приходят сами. `signals` в строках стран уже есть. Сортировка стран
(по |Δ|) и гейт `countryLayerFrom` — **не меняются**. `writeCountryLayer` по-прежнему
не зовёт `updateLatestRev` — после любой отдельной пересборки слоя звать
`updateLatestRev(ROOT)` из `calc/asset-rev.js`.

### 6. `calc/public-contract.js` + `calc/public-export.js` — владелец публичного слоя

- `PUBLIC_SCHEMA_VERSION = 2`.
- `regions[].index/delta` и `countries.rows[].index/delta`: `integer → number`;
  `regions[].signals` — опциональное неотрицательное целое (отсутствие валидно —
  демо-недели его не имеют; образец — `COUNTRIES_SCHEMA.signals`).
- Каталог схем на диске: `data/public/schema/v2/` (правило `docs/api.md` — смена
  типа = новая папка); `v1` при регенерации удаляется, не сосуществует.
- `$id` схем и `writePublicData` (mkdir) переводятся на `v2`.
- `methodologyDoc`: параметр `n0` убран; `regionEstructDefault`/`gamma` остаются
  раскрытыми.
- `datasetOf`: регионы проецируются `{id, index, delta, background, signals}`.
- `data/analysis.js`, `changelog.html` — той же регенерацией.

### 7. Сайт — три узла, без расширения контракта

- `js/sections/regions.js`: `rankedRegions(snapshot)` сортирует **по индексу
  убыванию, при равенстве — по id**; в `render` личный регион переставляется
  первой строкой (DOM-порядок, не только CSS); в строке — маркер
  `signals < 2` (i18n-ключ `region.signals.low`); `countryRows` — без изменений
  (по |Δ|). Формат числа — строго из данных: `String(73.4)` → «73.4», `String(73)` →
  «73»; `.0` не навязывать (образец — `formatPp` в `contribution.js`).
- `js/sections/trend.js`: дефолты `version = '4.0'` в `selectMethodology` и
  `summaryTextV2` (иначе после пересчёта ряд пуст) + пины в тестах.
- `js/data.js`: в валидацию регионов — опциональный `signals` (integer ≥ 0);
  `isIndex`/`isDelta` уже принимают дробь — не трогать.
- `js/i18n.js`: новые ключи только `region.signals.low` (+ абзац методологии
  `method.regional.lowSignals`, если добавляется текст). Остальные словари — нет.

### 8. Документы — свои правки, свои владельцы

- `docs/adr/0069-…md`: статус → «реализовано» (после приёмки) + фактологические
  правки «13 недель» → «10» и скобки про дайджест (см. спецификацию, #16).
- `METHODOLOGY.md` **только §7** — переписывается под новую формулу (Q9).
- `docs/api.md` — точность, `schema/v2`, `signals`; `docs/architecture.md`,
  `AGENTS.md`, `docs/calibration-journal.md` — запись о 4.0 (спецификация, #12).

### INTERFACES (закрыто тикетом 01, `done`)

- `engine.round1(x) -> number` — `Math.round(x*10)/10`; экспорт.
- `engine.stateOf(index, params)` — gapless (`index <= s.max` по упорядоченным
  состояниям); целые поведение прежнее.
- `engine.attributedSignals(criteria, ids, params, week, attr) -> { [unitId]: {
  nReg, eStruct, eDyn, hasDeescSignals, deltaRegion } }` — **`deltaRegion` вместо
  `iWith`/`iWithout`**; формула ADR 0069 §1 (допустимые драйверы, `shrink_d`,
  знаменатель из `PARAMS.weights`, эпсилон ADR 0065 на обеих ногах, clamp ±40).
- `engine.attributedIndex(global, unit, params) -> { index, delta, state,
  internal, background, mirrored }` — `internal = clamp(gInternal + e_r·deltaRegion,
  0, 100)` без `m`; `index = round1(internal)`; `delta = round1(index −
  prevIndex)` по округлённому индексу.
- `PARAMS.methodology = '4.0'`; `PARAMS.n0` удалён (поле отсутствует).
- Снапшот: `regions[id].signals = nReg` (слепой — 0); части `region-*.js`
  поле не получают.
- Аудит: `recalculation_method: \`aggregateDrivers v${PARAMS.methodology}\``.
- Факт после пересчёта: глобальные числа 10 недель (index/delta/q/through/
  dataState/sensitivity/precursor) байт-в-байт прежние; разброс индексов
  11-01 = 1.6 п.п.; ветка зеркалирования ни разу не сработала (max |Δглобала| = 13).
- Заметка: региональная нога Д9 не порогуется эпсилоном (композитный драйвер, §4.2) —
  осознанно, глобальная нога порогуется.
- Разбор расхождения с прототипом ADR (ремонт после ревью, 11-01): прототип читал
  `entry.value`, игнорируя нормировку счётных критериев §7.3 (events → Σsev/CAP);
  при `value||0` на обеих ногах 9/12 его чисел воспроизводятся ±0.03; «перевёрнутые
  знаки» baltic/eu-north-europe/africa — следствие заниженных у прототипа глобальных
  ног Д1/Д5/Д7 обнулёнными счётными (D5.2 ev=0.5, D1.4 ev=0.9, D7.x); остаток ±0.6 —
  противоречивое обнуление прототипом Д8-вклада (единое правило из 12 чисел не
  восстанавливается — признак кустарности эскиза, не дефекта формулы); выброс 80.0
  (middle-east) — артефакт старой меры `iWith`, который ADR 0069 именно устраняет,
  и прототип его не воспроизводил; наследование prevIndex по цепочке на Δ_region
  не влияет. Факт 11-01: индексы 71.3–72.9, разброс 1.6 п.п., сторож формы —
  ≥4 региона на ≥0.3 п.п. от глобала, ≤3 ровно на нём (тест
  `tests/regional-deviation.test.js`). Таблица прототипа в ADR — эскиз, постфактум
  не воспроизводит ожидаемые значения (пометка добавляется тикетом 04).

### Тестовые швы (минимум, существующие предпочтительны)

`round1`/`stateOf`/`attributedSignals`/`attributedIndex` (чистые) → юниты
(новый `tests/regional-deviation.test.js` + обновлённые calc-engine/
engine-attribution/regional-signals/regional-hypothesis); `rankedRegions`
(чистый) → порядок/пин; `validate` (js/data.js) → `signals`; `schemaDocs()`
(public-contract) → типы/версия; прогон `computeWeek` на реальных входах →
паритет с диском (`engine-attribution-parity`); пин в `tests/data.test.js` →
глобальные числа 10 недель (предыдущие, неизменные) + обновлённые региональные.

### Чего не касаемся (границы соседей)

Демо-недели 08-02…08-23 (1.0) и их файлы; `calc/digest.js topRegions` (сортировка
|Δ| → index → id остаётся, ADR 0069 §4 получает фактологическую правку); сортировка
стран; блог-статьи `docs/articles/**` (frontmatter `methodology: "3.0"` — исторические
выпуски); `calc/backtest.js`/`calc/ledger.js` — только регенерация производных, не
правка логики; `live-check.js` — `EXPECTED_WEEK_COUNT = 14` не меняется; файлы
параллельной сессии.
