# Интерфейсы и правила прогона

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `calc/engine.js` | формулы методологии | `driverScore(criteria, α)`, `aggregateDrivers(drivers, params)`, `applyInertia(value, prev, opts)`, `regionalIndex(global, regionSignals, params)` → чистые объекты `{index, state, delta, internal}` | нормировки шкал, защиту от деления на ноль, округление |
| `calc/params.js` | снапшот численных параметров версии | `PARAMS` (веса, α, λ, ρ, U_abs, k, β, пороги) + `list()` | значения по умолчанию |
| `calc/input/*.json` | закодированные сигналы недель и якорей | схему валидации (`validate(input) -> errors[]`) | — |
| `calc/calc.js` | запуск расчёта недели | CLI: `node calc/calc.js <week>` | чтение/парсинг входов |
| `calc/calibrate.js` | подбор k, якорные прогоны, sensitivity | CLI: `node calc/calibrate.js` | сетку перебора |

Шов для тестов — ровно один: чистые функции `calc/engine.js` (+ валидация
входов). CLI — тонкая обвязка без собственной логики.

Входной файл недели (`calc/input/<неделя>.json`), форма:

```json
{
  "week": "2026-09-13",
  "params": "calc/params.js",
  "criteria": {
    "D1.1": { "value": 0.4, "covered": true, "sources": [{"url": "...", "date": "2026-09-10", "cluster": "satellite-osint"}], "regions": ["europe"] },
    "D1.2": null,
    "D9.6b": { "value": 0.67, "covered": true, "acyclic": true, "sources": [...] }
  },
  "driverConfidence": { "D1": {"level": "high"}, "D9": {"level": "medium", "reason": "косвенные сигналы"} }
}
```

(`null` критерий = непокрыт; точную схему фиксирует таск 01 и она же —
единственная, что валидирует входы.)

## Правила проекта (сабагент не может вывести сам)

- Стек: Node ≥ 18, **ноль зависимостей** — любой импорт npm/CDN запрещён;
  только встроенные модули Node. Модули — ESM (`import`/`export`), как
  `tests/*.test.js` и `js/**` (build.js собирает бандлы для браузера отдельно).
- Тесты: полный набор — `node --test` (без аргументов, из корня репо;
  форма `node --test tests/` падает на Windows/Node 24); один файл —
  `node --test tests/<имя>.test.js`. Зелёный набор: 91 passed.
- Бандл `js/bundle.js` собирается `node build.js` после ЛЮБОЙ правки
  `js/**`. Этот прогон js/** не трогает; если тронули — build.js обязателен.
- Не трогать: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`,
  `METHODOLOGY.md`, `.autopilot/`.
- Недели 08-02…08-23 в `data/` — непересчитываемая демо-история.
- Схема снапшотов — контракт `js/data.js` (validate) и `tests/data.test.js`
  (ровно 3 драйвера, trend ровно 12 точек). Любая запись в `data/` обязана
  проходить валидацию.
- Пороги статуса регионов — `js/risk.js` status(index): calm 0–20,
  tense 21–40, danger 41–60, very 61–80, critical 81–96, extreme 97–100.
- Отсутствующая возможность — не повод ставить пакет: возвращай BLOCKED
  с описанием, оркестратор решит.
- Пуш в master = автоматический выкат на GitHub Pages. Коммитишь только
  то, что готово к публикации; пуш — за оркестратором.

## Из таска 01 — расчётное ядро

- `calc/engine.js` (ESM): `driverScore(criteria[], alpha, coverageThreshold) -> number|null`;
  `d8Strength(criteria[], coverageThreshold) -> d8|null`;
  `aggregateD9(subgroups[], params) -> {score|null, signaling, corr}`;
  `aggregateDrivers(drivers[], params, ctx:{prevInternal?, prevPublished?, structuralBreak?}) -> {index, state, delta, internal, q, parts, structuralBreak}`;
  `applyInertia(tilde, prev, opts) -> internal`; `detectStructuralBreak(drivers, params)`;
  `regionalIndex(global, region:{iWith,iWithout,nReg,eStruct,eDyn,hasDeescSignals,prevIndex?}, params) -> {index, state, delta, internal, background, mirrored}`;
  `stateOf(index, params)`; константы `CRITERIA` (45 критериев), `D9_SUBGROUPS` (8).
- `calc/params.js`: `PARAMS` + `list()` — веса 0.1175×8 + Д9 0.06, α 0.5, λ 0.6,
  ρ 0.25, U_abs 0.025, γ 0.5, κ 0.85, k = 2.0 (меняет таск 03), β↑ 0.9 / β↓ 0.5,
  override 0.8/0.2 на 2 недели, n₀ = 5, clamp ±40, порог покрытия 0.5, пороги §9.
- `validate(input) -> errors[]` (в engine.js): вход `calc/input/<week>.json` —
  `{week, params?, criteria: {'D1.1': null | {value:0..1, covered:true, sources:[{url,date,cluster}], regions?, acyclic?, rejected?}}, driverConfidence?: {D1..D9: {level:'high|medium|low', reason?}}}`;
  Д9 level 'high' запрещён (§4.3.1).
- Отступления от методологии, сознательно зафиксированные исполнителем:
  порог 50 % не применяется к подгруппам Д9 (null только при 0 покрытых);
  единственная изолированная циклическая подгруппа → corr 0.5; лимит 30 % Д9 —
  закрытая форма относительно прогона без Д9; персистентность override —
  состояние цикла через ctx у calc.js.
- Тесты: `tests/calc-engine.test.js` (56 тестов); полный набор 147 passed.

## Из таска 02 — входные сигналы недель

- `calc/input/2026-{08-30,09-06,09-13}.json` — валидные входы (по 5/45
  покрытых критериев из наблюдений демо-снапшотов, остальные null; D01:
  наблюдения трёх снапшотов идентичны без дат). `week` = метка недели;
  окно событий трактовано по датам источников снапшота (его `through`
  системно отстаёт на неделю — конфликт зафиксирован в отчёте). Региональной
  атрибуции нет (наблюдения неоднозначны — всё глобально по §4.1.9).
- `driverConfidence` у всех трёх недель одинакова (зеркало идентичных
  снапшотов); Д1 = medium (противоречия + слепые зоны), Д9 = medium.

## Из таска 03 — калибровка

- `node calc/calibrate.js` — печатает сетку k (1.00–4.00/0.05), выбранное k
  с обоснованием, verify-попадания, таблицу ±20 %. k = 1.95 записан в
  `calc/params.js` (комментарий-ссылка на журнал).
- Экспорты `calc/calibrate.js`: `buildDrivers(input, params)` → драйверы для
  aggregateDrivers (отсутствующий ключ критерия ≡ null); `runAnchor(input,
  params)`; `evaluateGrid(anchors, params, grid)`; `selectK(evaluation)` →
  {k, minMargin, allHit} (максимин, tie-break к меньшему k); `marginOf(index,
  [lo,hi])`; `sensitivity(anchors, params, k)`; `loadAnchors(dir)`; `K_GRID`.
- `calc/input/anchors/{routine-2010s,proxy-sanctions-2018,crimea-2014,
  georgia-2008,feb2022,cuban-1962}.json` — 6 модельных якорных профилей,
  валидны; select — первые четыре, verify — feb2022 + cuban-1962.
- `docs/calibration-journal.md` — аудиторский след: до/после, метод,
  попадания, ±20 %, три оговорки (путь params.js вместо инлайн-копии;
  c=0.7 для null-драйверов в q; модельность профилей + открытый вопрос №1).
- `calc/engine.js`: дефолты функций переведены на PARAMS — params.js
  единственный источник чисел. Якоря при k=1.95: рутина 8, прокси 32,
  Крым 50, Грузия 69, фев-2022 91, Карибский 99 — все в кластерах §9.
- `tests/calibrate.test.js` (+3); полный набор 150 passed.

## Из таска 04 — пересчёт данных

- CLI: `node calc/calc.js [неделя …]` — печать; `node calc/calc.js --write [неделя …]` — запись (без недели = вся цепочка 08-30 → 09-06 → 09-13).
- Экспорты `calc/calc.js`: `loadSnapshotPart(week, file)`, `renderGlobal/renderRegions/renderRegionFile/renderTrend`, `runWeek(week, state)`. Цепочка: инерция и prevPublished текут от недели к неделе; старт — `PREV_WEEK = '2026-08-23'` (опубликованный index=61; 67 в trend-хвостах — ручной артефакт демо-данных).
- Регионы при nReg = 0: I_region = I_global, background (слепые регионы §7), без зеркалирования. ШОВ: `engine.regionalIndex` в calc.js НЕ вызван (воспроизведена только ветка слепого региона) — при появлении региональной атрибуции во входах расширять calc.js через engine.regionalIndex.
- Пересчитанные значения: 08-30 → 60 (Δ −1), 09-06 → 58 (Δ −2), 09-13 → 57 (Δ −1); q ≈ 0.168, покрытие 5/45 критериев (D01). Защищённые поля (drivers/sources/published/through/methodology) неизменны.
- Самопроверка: после записи calc.js перечитывает снапшот и гоняет `validate` из js/data.js (запись отклоняется при провале — но диск уже перезаписан, craft-находка в concerns).
- Полный набор 150 passed.
