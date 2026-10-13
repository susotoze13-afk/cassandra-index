# Границы и интерфейсы прогона site-load-fix

## Правила проекта (не выводить заново)

- Стек: чистый HTML/CSS/JS, ноль зависимостей (никаких npm/CDN), Node ≥ 18, ESM
  (кроме CommonJS `build.js` и data/*.js — classic scripts под `window.CI*`).
- Тесты: `node --test` из корня, без аргументов. После правки `js/**` обязателен
  `node build.js` (бандлы коммитятся). В этом прогоне `js/**` не трогаем.
- DOM только через createElement + textContent; строки — только через js/i18n.js.
- НЕ трогать: `cassandra-index-prototype.html`, `PRD_Casanda_Index.md`,
  `METHODOLOGY.md`, `.autopilot/`, опубликованные числа недель, data/audit.jsonl
  (кроме штатных записей через calc/audit.js — здесь не нужны).
- Коммитит только оркестратор. Субагент оставляет рабочее дерево, без коммитов.
- Отсутствующая возможность → вернуть BLOCKED с описанием, не ставить пакеты.

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `calc/calc.js` (генератор) | записью артефактов недели в `data/` | `renderWeekCombined(week, parts) -> string` (чистый шов) | порядок concat, обвязку IIFE |
| `data/latest.js` (загрузчик) | списком недель и файлов | `window.CI_WEEKS`, `window.CI_LATEST`, document.write-список | — |
| `data/<week>/week.js` | полным снапшотом недели | регистрацию в `window.CI_DATA.snapshots[week]` | — (генерируемый, руками не правится) |
| meta-CSP (index.html, privacy.html) | политикой загрузки | — | — |

## Контракт week.js

Один файл на неделю. Единый IIFE, регистрирующий в `window.CI_DATA.snapshots["<week>"]`
ровно те же поля, что сегодня регистрируют 11 отдельных файлов: части global, regions,
6 × region-<id>, trend, drivers, sources + поля published/through/methodology/dataState/q
(где они записываются частями). Сайт (`js/data.js`) читает только `window.CI_DATA` —
контракт сайта не меняется. Отдельные файлы частей остаются на диске (их пишет
пайплайн и пинят тесты); week.js — производная от них.

`renderWeekCombined(week, parts) -> string` — чистая функция: parts = содержимое
11 частей (строки), результат — готовый текст week.js. Юнит-тест на синтетике;
тест паритета: для каждой из 11 недель выполнение week.js в vm даёт тот же
`snapshots[week]`, что чтение частей через `loadSnapshotPart`.

## Швы для тестов

- `renderWeekCombined` (чистая, синтетика).
- Паритет week.js ↔ дисковым частям недели (11 недель).
- Состав meta-CSP — существующие тесты страниц/ИБ; при отсутствии пина добавить.

## Из таска 01 — генератор week.js

- `renderWeekCombined(week, parts) -> string` (calc/calc.js) — parts = полные тексты
  11 частей ({global, regions, region-europe…africa, trend, drivers, sources});
  результат — единый IIFE, регистрирующий тот же `window.CI_DATA.snapshots[week]`.
  Чистый шов: тесты tests/week-combined.test.js (синтетика).
- `WEEK_PART_FILES` — канонический порядок 11 частей (regions до region-*).
- `loadWeekParts(week) -> {global, regions, …} | null` (calc/calc.js) — чтение
  дисковых частей недели через vm (loadSnapshotPart), без DOM.
- `calc.js --write <неделя>` после частей пишет `data/<week>/week.js` (writeWeek);
  режим печати диск не трогает.
- `node calc/migrate-week-combined.js [недели…]` — идемпотентная разовая миграция;
  без аргументов — все CI_WEEKS из data/latest.js.
- Тест паритета: tests/week-combined-parity.test.js — все 11 недель, week.js ≡ части
  (глубокое равенство через JSON).
