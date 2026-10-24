# notes.md — код как он есть (разведка к правке гипотетик §7)

## 1. Сигнатуры и строки в `calc/engine.js`

| Функция | Строка | Сигнатура |
|---|---|---|
| `scoredCriteria` (не экспортируется) | 33 | `function scoredCriteria(list, coverageThreshold)` |
| `driverScore` | 55 | `export function driverScore(criteria, alpha = PARAMS.alpha, coverageThreshold = PARAMS.coverageThreshold)` |
| `d8Strength` | 77 | `export function d8Strength(criteria, coverageThreshold = PARAMS.coverageThreshold)` |
| `aggregateD9` | 102 | `export function aggregateD9(subgroups, params)` — порог **не** использует |
| `buildDriversCore` | 164 | `export function buildDriversCore(criteriaIn, confidenceLevels, params)` |
| `buildDrivers` | 235 | `export function buildDrivers(input, params = PARAMS)` |
| `hypotheticalIndex` (не экспортируется) | 248 | `function hypotheticalIndex(criteriaIn, params)` |
| `aggregateDrivers` | 379 | `export function aggregateDrivers(drivers, params, context)` |
| `regionalIndex` | 502 | `export function regionalIndex(global, region, params)` |
| `regionalSignals` | 602 | `export function regionalSignals(criteria, regionIds, params)` |

Цепочка дефекта: `regionalSignals` (`:649–650`) → `hypotheticalIndex` (`:248`) →
`buildDriversCore` → `driverScore` (`:189`) / `d8Strength` (`:203`) →
`scoredCriteria` (`:33–39`). `hypotheticalIndex` вызывается **только** из
`regionalSignals`; других вызовов в репо нет.

```js
function scoredCriteria(list, coverageThreshold) {
  const total = Array.isArray(list) ? list.length : 0;
  if (total === 0) return null;
  const covered = list.filter((c) => c && c.covered === true);
  if (covered.length / total < coverageThreshold) return null;
  return { covered, counted: covered.filter((c) => c.intersection !== true) };
}
```

`regionalSignals` (тело, `:602–654`): считает `nCovered` по всем покрытым
не-пересечениям, собирает `attributed[rid]` из `entry.regions[]` (whitelist,
`eligible`: исключены Д2, Д4, Д9 кроме D9.3), строит `withMap`/`withoutMap` и
возвращает `{ nReg, eStruct, eDyn, hasDeescSignals, iWith, iWithout }`.
`iWith = hypotheticalIndex(withMap, p)`, `iWithout = hypotheticalIndex(withoutMap, p)`.

## 2. Вызовы `regionalSignals` и наличие недели

- Production-вызов один: `calc/week-step.js:125`
  ```js
  const signals = regionalSignals(input.criteria, regionIds, params);
  ```
  `computeWeek(input, state = {}, params = PARAMS)` (`week-step.js:109`) держит
  `const week = input.week;` (`:110`) и `regionIds` (`:112`) в области видимости —
  неделю прокинуть можно без новых зависимостей.
- `calc/calc.js:460` → `computeWeek(input, state, PARAMS)`; `calc/calibrate.js:332`
  → `computeWeek(input, state, params)`. Прямых вызовов `regionalSignals` в них нет.
- Тестовые вызовы (3 аргумента, без недели): `tests/regional-signals.test.js:85,
  107,116,128,137`; `tests/intersection.test.js:289,301`.

## 3. Прецедент forward-only-гейта

- `calc/params.js:70` — `independenceGateFrom: '2026-10-11'`.
- `calc/calc.js:142–145`:
  ```js
  export function validateSourceIndependence(input, params = PARAMS) {
    const from = params.independenceGateFrom;
    if (typeof from !== 'string' || from === '') return [];
    if (!input || typeof input.week !== 'string' || input.week < from) return [];
  ```
- Сравнение — лексикографическое по ISO `YYYY-MM-DD`, без `Date`. Отдельного
  хелпера сравнения нет; так же сделано в `taxonomyForWeek` (`week-step.js:26–28`,
  `week >= PARAMS.taxonomyV2From`) и `validateBlindReasons` (`history-debt.js:179`).

## 4. `calc/params.js` (точные строки)

| Строка | Поле | Значение |
|---|---|---|
| 20 | `methodology` | `'3.0'` |
| 26 | `taxonomyV2From` | `'2026-10-18'` |
| 43 | `n0` | `5` |
| 44 | `regionClamp` | `40` |
| 45 | `regionShockDelta` | `15` |
| 50 | `regionEstructDefault` | `0.5` |
| 51 | `coverageThreshold` | `0.5` |
| 70 | `independenceGateFrom` | `'2026-10-11'` |
| 97 | `blindReasonFrom` | `'2026-10-25'` |

`regionHypothesisThreshold` / `regionHypothesisFrom` пока нет.

## 5. `tests/regional-signals.test.js`

- `const V1 = regionIdsFor('1.0');` (`:15`), `const P = list(); P.weights = { D1: 1 };` (`:73–74`).
- `MIXED_WEEK` (`:76–82`): D1.1/D1.2/D1.6 — Европа, D1.3 — глобальный, D5.1 — Африка.
- Ключевые пины:

| Строка | Assert |
|---|---|
| 93 | `Math.abs(eu.iWith - 72.61) < 0.01` |
| **94** | **`eu.iWithout === 0`** («без сигналов Европы D1 не покрыт: 1/6 < 50 %») — при эпсилоне ≈ 37.65 |
| **100** | **`af.iWith === 0`** — останется (D5 нет в весах теста, S = 0) |
| 103 | `Math.abs(af.iWithout - 55.72) < 0.01` |
| 89–92 | `eu.nReg === 3`, `eStruct === 0.5`, `eDyn === 3/5`, `hasDeescSignals === true` |
| 27–35 | синтетический `regionalIndex`: `eu.index 90`, `af.index 66`, дельты 11 |
| 157–158, 190–194 | `background` в renderRegions/renderRegionFile |

- `tests/intersection.test.js:289–301` сравнивает два прогона `regionalSignals`
  по `nReg`/`eDyn` — переживёт смену порога при одинаковом правиле в обеих ногах.

## 6. Тесты, пересчитывающие цепочку

- `tests/sensitivity.test.js:106–127` — `runWeek` по 08-30…10-04, пин
  `res.sensitivity === 5.4`; региональные значения не пинит → не ломается.
- `tests/data.test.js:444–465` — глобальные пины 09-13; `:467–491` — единственный
  региональный пин: `africa`/`south-asia` `background === !isCovered` и
  `r.index !== global.index` у покрытого. 10-18 не пинится → не ломается.
- `tests/regions.test.js` — синтетика `rankedRegions`, движок не зовёт.
- `tests/page-smoke.test.js:49–75` — контракт дисковых недель, значения не пинит.
- `tests/precursor.test.js:52,68` — `runWeek('2026-10-18')`, пин глобальный.

## 7. Актуальные числа `data/2026-10-18/` (после `e59ff6b`)

`global.js`: `index 64`, `delta 8`, `methodology '3.0'`, `regions_taxonomy '2.0'`,
`q 1`, `nullWeight 0`, `confidence 'full'`, `sensitivity 0`,
`coverageCriteria {covered: 34, total: 46}`; `recalc.at 2026-10-24T06:55:33Z`.

`regions.js` — все 12 `background: false`:

| Регион | index | delta |
|---|---:|---:|
| russia-belarus | 56 | 0 |
| ukraine-moldova | 58 | +2 |
| baltic | 61 | +5 |
| balkans | 61 | +5 |
| eu-north-europe | 61 | +5 |
| south-caucasus | 61 | +5 |
| central-asia | 63 | +7 |
| east-asia | 61 | −1 |
| middle-east | 71 | +4 |
| north-america | 63 | +11 |
| south-asia | 60 | +6 |
| africa | 63 | +10 |

Числа совпадают с таблицей §1 задачи — правка Балкан их не сдвинула
(`recalc-0076`, `64 → 64`).

## 8. Радиус `coverageThreshold`

Продуктивный код: `params.js:51` (определение), `engine.js:33,37,44,55,56,77,78,189,203`
(чтение/дефолты), `public-contract.js:133` (`coverage_threshold` в
`methodology.json`, ADR 0062). Тестов, пинящих порог напрямую, нет.
`aggregateD9` порог игнорирует — Д9 не задет.

## 9. Структура ADR и закрытие пункта

- Шаблон свежего ADR (`0064-public-forecast-ledger.md`): `# 0065. <название>`,
  `**Дата:**`, `**Статус:**`, разделы `## Контекст / ## Решение / ## Почему /
  ## Последствия / ## Ссылки`.
- `docs/preproduction-decisions.md`: открытые — таблица §1 (`O10` на `:31`),
  архив — §2 «Решено (архив)» (`:35+`), формат `| Пункт | Решение (кратко) | Владелец | Ссылка |`.
  Прецедента закрытия O-пункта нет; механика — убрать строку из §1, добавить в
  архив, обновить шапку (версия, дата, диапазон `O1–O10`).

## 10. Команды проверки

- `node --test` из корня без аргументов; один файл — `node --test tests/<имя>.test.js`.
- `node build.js` — только после правки `js/**`; правка `calc/**` его не требует.
- `node calc/calc.js <неделя>` — печать; `--write` требует сети (linkcheck).
- `node calc/calibrate.js` — k; гейт задевает только якоря с неделей ≥ даты.
