# Границы и правила прогона regional-index-sources

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `engine` (calc/engine.js) | CRITERIA (45→46), формулы | `CRITERIA`, `buildDriversCore`, `regionalSignals`, `regionalIndex`, `validate` — сигнатуры без изменений | маппинг D4.6 (жёсткие циклы драйверов расширить) |
| `params` (calc/params.js) | все числа + версия методологии | `PARAMS.methodology` ('3.0'), `PARAMS.k` | — |
| `calc.js` | цепочка, ворота, рендер снапшотов | runWeek/renderGlobal/renderRegionFile — сигнатуры без изменений | откуда methodology попадает в снапшот (теперь из PARAMS) |
| входы (calc/input/) | 6 файлов недель + 10 якорей | существующие JSON-схемы | редакционные решения разметки |
| сайт (js/) | подача версии и 46 критериев | `selectMethodology`, `summaryTextV2`, `criteriaModel` — сигнатуры без изменений (меняются дефолты/данные) | — |

Тест-швы (новых нет): engine, regional-signals, calibrate, data.validate,
trend, methodology-criteria — все чистые модули без DOM/сети.

## Правила репозитория (AGENTS.md — обязательны)

- Стек: чистый HTML/CSS/JS + Node ≥ 18, НОЛЬ зависимостей; всё ESM, кроме CommonJS build.js. Любой импорт npm/CDN — ошибка.
- Тесты: `node --test` из корня, без аргументов (форма `node --test tests/` падает на Windows). Один файл: `node --test tests/<имя>.test.js`.
- После ЛЮБОЙ правки `js/**` — `node build.js`; бандлы js/bundle*.js коммитятся, руками не править.
- Сайт одноязычный RU: все пользовательские строки только через словарь js/i18n.js; DOM только createElement + textContent (никакого innerHTML со строками); цвета только CSS-токены.
- Не трогать: cassandra-index-prototype.html, design/cassandra-index.pen, .autopilot/ чужих прогонов, data/audit.jsonl руками (только через calc/audit.js).
- Публикация/пуш — НЕ часть тасков: работаем в рабочем дереве, commit делает только оркестратор.
- Кластеры источников — только whitelist PARAMS.clusters; каноническая классификация доменов — в AGENTS.md «Архитектура».
- Входы недель: окно W−7…W включительно; D2 carryover — конвенция репо (см. AGENTS.md «Подводные камни»).
- Недели вне RECALC_WEEKS calc.js не считает; демо-недели 08-02…08-23 непересчитываемы.
- Конвенция: фикстура tests/data.test.js актуализируется после пересчёта (не баг).
- Отсутствующая возможность/сеть/доступ — вернуть BLOCKED с описанием, не обходить.

## Из таска 01 — движок и сайт под 46/3.0

- `PARAMS.methodology` ('3.0') — единственный источник версии перевыпуска; renderGlobal/writeWeek берут methodology из PARAMS (published — из прежнего снапшота)
- `engine.ignoredRegionalAttribution(criteria) -> string[]` (calc/calc.js) — сортированные id Д2/Д4/Д9 (кроме D9.3) с непустой regions[]; поле `ignoredAttribution` в выводе runWeek — предупреждение об игноре (ADR 0022)
- Аудит recalc: `version_before` из снапшота / `version_after` из PARAMS, `recalculation_method: 'aggregateDrivers v3.0'` (flash-записи оставлены version_before=version_after=snap.methodology — осознанно)
- Тренд: `selectMethodology`/`summaryTextV2(points, version = '3.0')`; ключ i18n `trend.summary.v2` требует плейсхолдер `{version}`
- Паритет: engine.CRITERIA 46 записей (D4.6: Д4, esc, ordinal) ↔ js/criteria.js

## Из таска 02 — якоря D4.6 и калибровка

- 10 файлов `calc/input/anchors/*.json`: D4.6 добавлен как `{value: 0..1, covered: true, sources:[{url,date,cluster}]}` (форма — зеркало соседнего Д4.4); шкала 4-уровневая ordinal (0/0.33/0.67/1)
- `PARAMS.k` остаётся **1.95** (selectK подтвердил — params.js не менялся); `PARAMS.methodology` = '3.0' (из таска 01)
- `docs/calibration-journal.md`: запись 2026-10-11 (ввод D4.6, methodology 3.0; сетка/selectK/verify/чувствительность)
- Артефакт утверждения: `.autopilot/2026-10-11-regional-index-sources--wip/proposals/anchors-d46.md`

## Из таска 03 — региональные источники и атрибуция

- Вход недели несёт `criteria.<D1/D3/D5/D6/D7/D8/D9.3>.regions: string[]` (⊆ 6 REGION_IDS); ключи Д2/Д4/Д9 (кроме D9.3) атрибуцию не несут (агрегация игнорирует)
- `criteria.D4.6 = { value∈{0,0.33,0.67,1}, covered, sources:[] }` — единая ordinal-шкала с якорями (таск 02)
- 12 новых R55-записей в top-level `sources` 7 недель (fetch-verified, `publication_date` в окне, `cluster_id` из whitelist); схема R55 не менялась
- Регионы с сигналами: 08-30→2, 09-06→1, 09-13→2, 09-20→3, 09-27→3, 10-04→4, 10-11→4
- `tests/sensitivity.test.js`: пин 10-04 11.8→15.1 (следствие данных; утверждение — строгое равенство, не ослаблено)
- Артефакты утверждения: `proposals/<неделя>-regions.md` (7 шт)

## Из таска 04 — перевыпуск цепочки 3.0

- `data/2026-08-30 … 2026-10-11`: `global.methodology = '3.0'`, `published` — прежние даты; demo 08-02…08-23 (1.0) не тронуты
- `regions.<id>.background`: `false` у регионов с сигналами, `true` у слепых (blind: 08-30 4, 09-06 5, 09-13 4, 09-20 3, 09-27 3, 10-04 2, 10-11 2 из 6)
- `data/audit.jsonl`: 7 записей `recalc-0034…0041`, `version_before '2.0'` → `version_after '3.0'`, `recalculation_method 'aggregateDrivers v3.0'`, hash-цепочка цела
- `tests/data.test.js`: пин 09-13 index 41→43, delta −1→+1; `tests/sensitivity.test.js` пин 10-04 = 15.1
- `METHODOLOGY.md`: 45→46 критериев, описание D4.6, §7 региональная атрибуция, §10.2 перевыпуск; `PRD_Casandra_Index.md` §8.5 — запись про 3.0/46-й критерий
- Сигнатуры runWeek/renderGlobal/renderRegionFile без изменений
- Точка тренда: `{date, value, methodology}`; для недели W — `methodology = PARAMS.methodology`, для более ранних недель цепочки — версия из их `global.js` на диске (фикс дозапроса 04: своя неделя больше не берёт до-записную версию)

## Артефакты прогона

- Утверждающие гейты пользователя ДО любого `--write`: `.autopilot/2026-10-11-regional-index-sources--wip/proposals/anchors-d46.md` (значения D4.6 по 10 якорям + новый k) и `proposals/<неделя>-regions.md` по 6 неделям.
- Spec: `.autopilot/2026-10-11-regional-index-sources--wip/spec.md` (§6 — правила отбора источников).
