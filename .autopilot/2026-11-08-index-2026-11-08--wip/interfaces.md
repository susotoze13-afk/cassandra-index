# interfaces.md

## Правила проекта (из `carried.md`, раздел «Договорились» — дословно, пересматривать нельзя)

- Все grilling-решения Q1–Q17 и «Начинай» = разрешение реализации — держит
  ADR 0069 (статус «реализовано»); повторно не обсуждаются.
- `Δ_region` — внутренняя мера, наружу не публикуется — ADR 0072 и сторож
  `tests/regional-deviation.test.js`.
- «13 недель» в Q9 — счётная ошибка, верная цепочка 08-30…11-01 = 10 недель
  (пин глобальных чисел — на все 10, демо-недели 1.0 не трогаются).
- Выпуски блога 10-25/11-01 остаются methodology 3.0 — вне рамок 4.0
  (переиздан только 10-18, ADR 0070).

## Границы, решённые в спецификации

**Фрагменты коллекционеров** — `calc/input/drafts/2026-11-08/part-<группа>.json`
(4 файла, владелец — свой коллекционер):
- экспонирует: `{week:"2026-11-08", criteria:{<id>: obj|null}, sources:[R55],
  blindReasons:{<id>:"not-collected"|"searched-none"|"gate-failed"},
  driverConfidence:{<D#>: {level, reason?}}, rejected?:[]}`;
- правило: 46 id — только свои; `source_type` ∈ primary|secondary|OSINT,
  `cluster_id` из whitelist `PARAMS.clusters`, `state_affiliated` boolean;
  каждый источник критерия — URL из `sources`; `publication_date` в 02.11–08.11.2026;
  каждый покрытый критерий — ≥2 кластера ИЛИ ≥1 primary/OSINT;
- скрывает: ничего (чистые данные).

**Вход недели** — `calc/input/2026-11-08.json` (владелец — таск сборки):
слияние фрагментов, дедуп R55 по `id`, все 46 ключей, `driverConfidence`
(Д9 не `high`), `blindReasons` на каждый `null`, `accessed_date` = 2026-11-08.
Форма — `notes.md` §2.

**Страновой оверлей** — `calc/input/countries/2026-11-08.json` (владелец — таск
сборки): `{week, criteria:{<id>:{countries:[ISO2], basis, sources:[url]}}}`;
ISO2 — из union стран регионов таксономии v2; `basis` непустой; URL — только из
источников недели. Форма — `notes.md` §5.

**Сиды** — `data/2026-11-08/{global,trend,drivers,region-*}.js` (владелец — таск
сидов): `global.published` = 2026-11-08, `regions_taxonomy` = "2.0"; `trend` —
ровно 12 точек 08-23…11-08; `drivers` — 3 истории, 2–5 источников, ru+en;
`region-*` — по 2 драйвера + `confidence`. Источники сидов — verbatim по `id`
из входа недели. Образец — `calc/input/drafts/seeds-2026-11-01.mjs`.

**Генератор** — `node calc/calc.js --write 2026-11-08` (владелец чисел):
пишет `global/regions/region-*/trend/sources`, `week.js` и (при валидном
оверлее) `countries.js`; **`drivers.js` не пишет**; `updateLatestRev` внутри
`writeWeek` пересчитывает `CI_ASSET_REV`. `week.js` — производная, руками не
править; `data/latest.js` — тоже.

**Производные** — `public-export.js --write`, `backtest.js --write`,
`ledger.js --write`, `digest-export.js --write`, `blog-build.js --write`,
`build.js` (владелец — таск записи): руками не правятся, пересобираются CLI.

**Пины** — `tests/data.test.js` (CHAIN_GLOBAL_PIN), `calc/live-check.js` +
`tests/live-check.test.js` (EXPECTED_WEEK_COUNT), `tests/ledger.test.js`
(baseline), `CHAIN` в `tests/regional-deviation.test.js` и
`tests/engine-attribution-parity.test.js` (владелец — таск пинов): числа берутся
из прогона, не выдумываются.

**Швы для проверки** (тесты): `node calc/calc.js 2026-11-08` (печать без сети),
`node --test tests/<файл>`, `validateCountryOverlay` из `calc/country-layer.js`
(чистый вызов на прочитанном оверлее), `node --test` целиком.

## Правила проекта для исполнителей

- **Стек:** Node ≥ 18, ESM, ноль зависимостей. Ставить нечего — `npm install`
  не нужен и не делается. Сеть — только `curl.exe` / `fetch` в node; инструменты
  WebSearch/WebFetch в этой среде не работают (мёртвый прокси).
- **Команды проверки:** весь набор — `node --test` (из корня, без аргументов);
  один файл — `node --test tests/<имя>.test.js`; сухой прогон недели —
  `node calc/calc.js 2026-11-08` (без сети и записи); сборка бандла — `node build.js`.
- **Не трогать:** `data/<неделя>/week.js` (производная), `data/latest.js` руками
  (только `calc/prepare-week.js`), `data/public/**` и `changelog.html`/`digest.html`
  руками (только CLI), `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`,
  `METHODOLOGY.md`, `.autopilot/` (это оркестратор), чужие незакоммиченные файлы
  (`docs/articles/vc-binance-2026-11-01*` в рабочем дереве — не наши).
- **Коммиты:** исполнитель НЕ коммитит (правило репозитория: был инцидент) —
  коммит делает оркестратор после приёмки таска.
- **Окно недели:** 02.11–08.11.2026, `accessed_date` = 2026-11-08.
- **Источники:** только реальные URL (проверять curl: 404/410 — битая, брак;
  401/403/406/таймаут — blocked, допустимо). Никаких выдуманных заголовков/дат.
