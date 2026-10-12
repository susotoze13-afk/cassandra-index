# Границы и правила прогона africa-south-asia-sources

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| входы (`calc/input/2026-*.json`) | 7 файлов недель | существующие JSON-схемы (R55 + `regions[]`) | редакционные решения разметки |
| движок / `calc.js` | расчёт, ворота, рендер | сигнатуры без изменений (`runWeek`, `renderGlobal`, `renderRegionFile`) | — |
| `data/` | снапшоты цепочки | `global/regions/region-*/trend/sources` | — |

Тест-швы (новых нет): `engine.validate`, `validateInputSources`,
`engine.regionalSignals`, `js/data.js validate`, `regional-signals`, `data.test.js`.

## Правила репозитория (AGENTS.md — обязательны)

- Стек: чистый HTML/CSS/JS + Node ≥ 18, НОЛЬ зависимостей; всё ESM, кроме CommonJS `build.js`.
- Тесты: `node --test` из корня, без аргументов; один файл — `node --test tests/<имя>.test.js`.
- После ЛЮБОЙ правки `js/**` — `node build.js`; бандлы `js/bundle*.js` коммитятся. В этом прогоне `js/**` не меняется.
- Сайт одноязычный RU; строки — только через `js/i18n.js`; цвета — CSS-токены.
- Кластеры источников — только whitelist `PARAMS.clusters`; каноническая классификация доменов — в AGENTS.md «Архитектура».
- Регионы — whitelist 6 `REGION_IDS` в `js/data.js`: `europe, east-asia, middle-east, north-america, south-asia, africa`.
- Атрибуция `regions[]` — только на принимаемые драйверы Д1/Д3/Д5/Д6/Д7/Д8/D9.3 (ADR 0022).
- Входы недель: окно W−7…W включительно; D2 carryover — конвенция репо.
- НЕДЕЛИ вне `RECALC_WEEKS` calc.js не считает; демо-недели 08-02…08-23 не трогать.
- Конвенция: фикстура `tests/data.test.js` актуализируется после пересчёта.
- **Сеть — только через оболочку** (`curl.exe -L`, `node -e "fetch(...)"`); инструменты WebSearch/WebFetch идут через мёртвый прокси и не работают.
- Отсутствующая возможность/сеть/доступ — вернуть `BLOCKED` с описанием, не обходить.
- Публикация/пуш — НЕ часть тасков; commit делает только оркестратор.

## Артефакты прогона

- Утверждающий артефакт пользователя ДО любого `--write`:
  `.autopilot/2026-10-12-africa-south-asia-sources--wip/proposals/africa-south-asia-regions.md`.
- Spec: `.autopilot/2026-10-12-africa-south-asia-sources--wip/spec.md`.
