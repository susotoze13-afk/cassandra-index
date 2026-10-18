# interfaces.md — границы и правила проекта (прогон index-2026-10-18)

## Границы, решённые в спецификации

Новых модулей не появляется: работа идёт через существующие швы (T2 по ярусу,
но архитектура не меняется).

| Шов | Что проверяем |
|---|---|
| `engine.validate(input, PARAMS, regionIds)` (calc/engine.js) | вход недели валиден (тесты и CLI) |
| `linkcheck.checkSources` (calc/linkcheck.js) | ворота запись/битая (CLI, `--write`) |
| `js/data.js validate` | контракт собранного снапшота (CLI, `--write`, тесты) |
| `taxonomyForWeek` / `weekPartFiles` / `renderWeekCombined` (calc/calc.js) | версия набора и сборка week.js (тесты) |
| `node --test` | вся эталонная зелень |

## Формат находок исследовательских тасков (шов между волной 1 и таском 04)

Каждый исследовательский таск пишет РОВНО один файл
`.autopilot/2026-10-18-index-2026-10-18--wip/research/NN.json` (NN = 01/02/03,
UTF-8, валидный JSON):

```json
{
  "group": "01",
  "window": { "from": "2026-10-12", "to": "2026-10-18" },
  "criteria": {
    "D1.1": {
      "covered": true,
      "value": 0.33,
      "sources": [ { "url": "…", "date": "2026-10-15", "cluster": "A-mainstream", "type": "secondary", "state_affiliated": false } ],
      "note": "одна строка на русском, что за событие",
      "regions": ["eu-north-europe"]
    },
    "D1.6": { "covered": false, "note": "сигналов в окне нет" }
  },
  "driverConfidence": { "D1": { "level": "medium", "reason": "покрыто 5/6 …" } },
  "regions": [
    {
      "region": "eu-north-europe",
      "observation": { "ru": "…", "en": "…" },
      "why": { "ru": "…", "en": "…" },
      "contribution": "high",
      "confidence": "high",
      "sources": [ { "url": "…", "date": "2026-10-15", "cluster": "A-mainstream" } ]
    }
  ],
  "records": [
    {
      "id": "domain-slug",
      "title": { "ru": "…", "en": "…" },
      "domain": "theguardian.com",
      "url": "https://…",
      "publication_date": "2026-10-15",
      "accessed_date": "2026-10-18",
      "source_type": "secondary",
      "cluster_id": "A-mainstream",
      "state_affiliated": false
    }
  ]
}
```

Правила формата:

- `criteria` — ВСЕ критерии своей группы (01: D1.1–D1.6, D5.1–D5.4, D6.1–D6.4;
  02: D2.1–D2.5, D3.1–D3.5, D4.1–D4.6; 03: D7.1–D7.4, D8.1–D8.4, D9.1–D9.7).
  Непокрытый — объект `{covered:false, note}` (в финальный вход превратится в `null`).
- Шкалы: бинарные — 0/1; порядковые — 0/0.33/0.67/1; счётные (D1.1, D1.4, D2.3,
  D3.1, D3.3, D3.5, D4.1, D4.4, D4.5, D5.2, D7.1, D7.2) — `value` 0..1 ИЛИ
  `events` (массив из severity 0.2/0.5/1.0/2.0, не более 10 штук). D4.6 — ordinal
  0/0.33/0.67/1.
- `cluster`/`cluster_id` — только из whitelist: A-mainstream, B-state-media,
  C-registries, D-satellite-osint, E-field-osint, F-financial.
- Не более 2 источников одного кластера на критерий (иначе независимость не
  подтверждается — `independenceWarnings`).
- `records` — R55-записи для КАЖДОГО уникального URL, который встречается в
  criteria/regions (те же URL; русский и английский заголовки обязательны).
- `date`/`publication_date` — дата публикации в окне 12.10–18.10.2026.
- `regions` — по 1–2 наблюдению на регион; id — только из набора v2 (12):
  russia-belarus, ukraine-moldova, baltic, balkans, eu-north-europe, south-caucasus,
  central-asia, east-asia, middle-east, north-america, south-asia, africa
  (легаси-id `europe` в v2 НЕТ — Франция/Италия/Германия и т.п. относятся к
  `eu-north-europe`). Атрибуция `regions[]` внутри критериев — тоже только из этих 12 id.

## Правила проекта (не выводятся из кода — только так)

- Стек: чистый HTML/CSS/JS, ноль зависимостей; Node ≥ 18; всё ESM, кроме
  CommonJS `build.js`. Любой импорт npm/CDN — ошибка.
- Команды: `node --test` (все тесты, из корня, без аргументов), `node build.js`
  (бандл после правок js/**), `node calc/calc.js --write <неделя>` (запись
  недели, требует сети для linkcheck).
- **Исполнители НЕ коммитят.** Коммит — только оркестратор. Правки остаются
  рабочим деревом.
- НЕ трогать: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`,
  `METHODOLOGY.md`, `.autopilot/` (кроме research/ своего таска), `js/bundle*.js`
  (пересобираются `node build.js`), `docs/`, `data/audit.jsonl` (пишет пайплайн).
- `data/2026-10-18/` для новой недели: сиды создаются ДО `--write`
  (global.js, trend.js, drivers.js, 12 × region-*.js) — остальное пишет генератор
  (regions.js, sources.js, week.js).
- Отсутствующая зависимость/возможность → вернуть BLOCKED с описанием,
  а не ставить пакет.
- Тест-фикстуры: существующие пины чисел (`tests/data.test.js`) относятся к
  прежним неделям и не меняются; пин `files.length >= 17` в
  `tests/calc-engine.test.js` новым входом (18) только подтверждается —
  правок не требует.

## Швы для тестов

Поведение проверяется через те же швы из первой таблицы; новых швов тесты не
получают. Исследовательские таски кода не трогают — их «приёмка» — валидность
JSON и полнота критериев.

## Из тасков 01–03 — исследование недели (волна 1)

Три файла `.autopilot/2026-10-18-index-2026-10-18--wip/research/{01,02,03}.json`,
схема по §«Формат находок» (см. выше). Проверено оркестратором inline (не автором):
JSON парсится, состав критериев полный, шкалы/даты окна 12.10–18.10/кластеры
whitelist/≤2 источника на кластер/`records` для каждого URL/`regions[]` ⊆ v2 —
0 ошибок.

- **01** — D1.1–D1.6, D5.1–D5.4, D6.1–D6.4: покрыто 7 (D1.1, D1.3, D1.4, D1.5,
  D5.1, D5.2, D6.3); 17 R55-записей; наблюдения middle-east, russia-belarus,
  eu-north-europe (Франция).
- **02** — D2.1–D2.5, D3.1–D3.5, D4.1–D4.6: покрыто 14 (все, кроме D2.4, D3.1);
  30 R55-записей; наблюдения middle-east, russia-belarus.
- **03** — D7.1–D7.4, D8.1–D8.4, D9.1–D9.7: покрыто 7 (D7.1, D7.2, D7.3, D8.1,
  D8.2, D8.3, D9.3); 17 R55-записей; наблюдения middle-east, eu-north-europe,
  russia-belarus.

## Ворота независимости — согласование для сборки входа (решение оркестратора)

Канонизация: `aljazeera.com` → `B-state-media` + `state_affiliated:true` во всех
записях (госфинансируемое СМИ, §«Каноническая классификация доменов» AGENTS.md;
в research/01 его источники ошибочно помечены A). `safety4sea.com`,
`businesstoday.com.my`, business-статья `firstpost.com` → `F-financial`.

Прогон ворот `validateSourceIndependence` (≥2 кластера ИЛИ ≥1 primary|OSINT на
покрытый критерий) по 28 покрытым критериям исследования даёт 8 отказов —
связаны с канонизацией (aljazeera → B) и одно-кластерными критериями. Обязательное
согласование при сборке `calc/input/2026-10-18.json`:

| Критерий | Что сделать |
|---|---|
| D1.1 | канонизация aljazeera→B: кластеры {A,B} — ок |
| D1.3 | +источник A: al-monitor Сиси/Саудовская Аравия (`egypts-sisi-…`) |
| D1.4 | +источник A: guardian-uae-yemen (`uae-yemen-conflict-…`) |
| D5.2 | **убрать** критерий (null): только кластер A, второго нет |
| D6.3 | +источник A: breakingdefense-hegseth (`hegseth-uses-ausa-…`) |
| D2.5 | +источник B: tasnimnews (`eslami-condemns-…`) |
| D3.2 | +источник B: tass 2203539 (`tass.com/politics/2203539`) |
| D3.3 | +источник F: safety4sea (`eu-adopts-largest-ever-…`) |
| D4.6 | +источник A: mee-kpler (`us-sanctions-relief-unlikely-…`) |

Все добавляемые URL уже есть среди `records` источников (R55) — новых ссылок не
заводить, чтобы linkcheck не пошёл по лишним. Итог: покрытие **27/46** (D5.2 →
null; D5 → 1/4 → драйвер null, D6 остаётся 1/4 → драйвер null — как и было).
D7.3 = 1 штатно вызовет flash-trigger `d7Value` → дополнительная запись `flash`
в `data/audit.jsonl` (ожидаемо, не ошибка).

## Из таска 04 — вход, сиды, расчёт недели 2026-10-18

_(заполнит таск 04)_
