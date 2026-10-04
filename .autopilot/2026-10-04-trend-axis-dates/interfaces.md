# interfaces.md — границы и правила (прогон trend-axis-dates, T0)

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `js/sections/trend.js` | рендер графика тренда | `axisLabels(lang, points, width?, pad?) -> [{x, text, anchor}]` (новый) + существующие швы без изменений | координаты, SVG-разметку, tooltip/sheet |

Швы для тестов (T0 — только они):
- `axisLabels` — новый чистый шов; проверяется без DOM.
- Существующие швы trend.js (`signedDelta`, `trendSegments`, `selectMethodology`,
  `summaryTextV2`, `clampX`, `pointAriaLabel`) — поведение не меняется.

## Правила проекта (не выводятся из кода — только так)

- Стек: чистый HTML/CSS/JS, ноль зависимостей; Node ≥ 18; всё ESM, кроме
  CommonJS `build.js`. Любой импорт npm/CDN — ошибка.
- Команды: `node --test` (все тесты, из корня, без аргументов); `node build.js`
  (обязателен после любой правки `js/**` — бандлы коммитятся).
- DOM только через `document.createElement`/`createElementNS` + `textContent`,
  никакого innerHTML со строками. Цвета — только CSS-токены из `css/styles.css`.
- Вся пользовательская строка — через словарь `js/i18n.js`; даты — через
  `date(lang, iso, short)`. Новых ключей в этом прогоне не нужно.
- Исполнитель (здесь — оркестратор, ярус T0) НЕ коммитит; коммит — за оркестратором.
- Не трогать: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`,
  `METHODOLOGY.md`, `js/bundle*.js` (пересобираются `node build.js`), чужие
  `data/`, `.autopilot/` других прогонов.
- Отсутствующая возможность — не повод ставить пакет: вернуть BLOCKED с описанием.
