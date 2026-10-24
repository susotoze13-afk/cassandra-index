# Что оставила прошлая сборка (копия PROGRESS.md на старте прогона 2026-10-24)

Последняя сданная сборка: `.autopilot/2026-10-19-api-contract-reference/` — контракт
покрывает весь публичный слой: 11 JSON Schema, `docs/api.md` по всем файлам, тест-сторож
«публичный JSON без схемы или строки в документе».

## Договорились — не пересматривать

- Контракт покрывает **весь** `data/public/**`, а не шесть названных путей.
- `docs/api.md` живёт только в репозитории; страница `api.html` не заводится: «сайт —
  витрина, не справочник» (пользователь, 2026-10-19).
- Хвосты прошлой сборки в новую не берутся, если задача к ним не относится.
- `PUBLIC_SCHEMA_VERSION = 1` не растёт: новых полей в существующих файлах нет.
- Схемы держатся на ключевых словах минимального валидатора
  `tests/public-contract.test.js`; nullable — массивом типов.
- В силе: лицензии по типу материала, ADR 0045 (UI не раскрывает формулы), порядковая
  шкала, forward-only `precursor`, `validation.json` из `backtest.js --write`,
  `forecast-ledger.json` из `ledger.js --write`.

## Не доделано

- Пять новых схем ещё не на сайте: нужен push в `master` и выкат `deploy.yml`.
- ACLED Conflict Index как композит не сравнивается (D01): полугодовой, без машинного доступа.
- Lead/lag по месячным рядам не считается: 2–3 точки, сдвиг неинформативен.
- Фикстуры GPR/ACLED/CrisisWatch сняты на 2026-10-18 и сами не обновляются.
- Редакционных форвардных якорей нет ни одного; журнал показывает только baseline.

## Известные баги

- `docs/api.md`: верхнеуровневое поле `methodology` в `index.json` указано ошибочно.
- `docs/api.md`: «опубликованный выпуск не переписывается» — `writeDigestData` пересобирает.
- `docs/api.md`: «до 12 записей» дублирует `MAX_DISCREPANCIES` без пина; примеры с «…» — невалидный JSON.
- Сторож `docs/api.md` ищет путь подстрокой.
- `tests/public-contract.test.js`: nullable-тест покрывает не все nullable-пути.
- `calc/ledger.js`: `verified:null` не различает три причины; `writeLedger` без `anchorsDir` читает боевой каталог.
- `calc/backtest.js`: ACLED за 2026-10 считается по 2026-10-09 без пометки.
- `calc/public-export.js --write` печатает «водопад: нет» при верных данных.
- `calc/public-export.js`: `trend.svg` рисует одну полилинию по всем 12 точкам, включая демо-1.0.
- `calc/quotes.js` не проверяет `id` источника на путь (`../`).
- `git clone` на Windows с `core.autocrlf=true` даёт падение двух тестов (CRLF).

## Правки без автопилота

- (пусто на момент старта прогона)

## Изменено после сборки (2bd5d6d..HEAD, 5 коммитов)

- `1dc5604` — T01 прерванного прогона: инструмент обнаружения источников `calc/source-discovery.js` (638 строк), реестр лент `calc/input/discovery/feeds.json`, `docs/source-discovery.md`, тесты (829 строк). Сеть только в инструменте.
- `5e543e6` — T02 прерванного прогона: витрина кандидатов `calc/input/discovery/2026-10-18.json`, `data/discovery/2026-10-18.json`, `docs/source-proposals/2026-10-18.md` (непубликуемое предложение; неделя не пересчитана).
- `431961d` — T02 прерванного прогона: одна строка в `AGENTS.md` о витрине кандидатур.
- `e59ff6b` — **Балканы**: в `calc/input/2026-10-18.json` добавлена атрибуция D1.4 и карточка региона; перезаписаны `data/2026-10-18/{regions,region-balkans,sources,week,global}.js`, `data/public/*` 10-18, `data/audit.jsonl`, `digest.html`; новые `docs/regional-source-pool.md`, `docs/backfill/2026-10-18-sources.md`, `docs/source-proposals/2026-10-18-balkans.md`. **Региональные числа 10-18 могли сдвинуться — перепроверить перед опорой на них.**
- `13f7774` — страница `about.html` («Независимость и исправления») + `docs/competitive-analysis.md`, правки `deploy.yml`/`how-to-read.html`/`index.html`/`sitemap.xml`.

Замечание: прерванный прогон `editorial-source-discovery` (T01 сдан, T02 в работе) архивирован
в `.autopilot/2026-10-20-editorial-source-discovery--wip/`; его хвосты в эту сборку не берутся.
