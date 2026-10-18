# Интерфейсы прогона weeklists-consolidation

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `calc/prepare-week.js` | разметка списков недель в calc.js/latest.js | `addRecalcWeek`, `addLatestWeek` (уже есть) + новые `readRecalcWeeks(src) -> string[]`, `readLatestWeeks(src) -> { weeks, latest }` | regex-парсинг обоих файлов |
| `tests/weeklists-agreement.test.js` | согласие RECALC ↔ CI ↔ диск | (тест, API не добавляет) | — |

Шов для тестов — один: read-шовы prepare-week.js. Тесты не должны
дублировать regex-парсинг списков недель.

## Фактически добавленный API (top-up после build)

`calc/prepare-week.js` экспортирует:

- `readRecalcWeeks(src: string) -> string[]` — все недели из RECALC_WEEKS
  в `calc/calc.js` (строка-источник), порядке следования; пустой список
  при отсутствии.
- `readLatestWeeks(src: string) -> { weeks: string[], latest: string|null }`
  — CI_WEEKS и CI_LATEST из `data/latest.js` (строка-источник);
  `latest` — `null`, если CI_LATEST не найден.

Оба — чистые read-шовы над теми же regex, что и запись в
`addRecalcWeek`/`addLatestWeek`; файлы на диск в этот момент не читают —
источник строк передаёт вызывающий.

Потребители: `tests/weeklists-agreement.test.js` (согласие списков),
`tests/page-smoke.test.js` и `tests/week-combined-parity.test.js`
(список недель неделя-набора из disk-независимого источника),
`tests/latest-loader.test.js` — работает через vm-прогон файла без шва.

## Правила проекта (субагент не выводит сам)

- Стек: чистый Node ≥ 18, ESM, ноль зависимостей; любой импорт npm — ошибка.
- Тесты: `node --test` из корня репозитория без аргументов (форма
  `node --test tests/` падает на Windows/Node 24). Один файл:
  `node --test tests/<имя>.test.js`. Сейчас зелёный уровень: 447 passed / 0 fail.
- Правки только в: `calc/prepare-week.js`, `tests/latest-loader.test.js`,
  `tests/week-combined-parity.test.js`, `tests/page-smoke.test.js`, новый
  `tests/weeklists-agreement.test.js`. НЕ трогать: `data/latest.js`,
  `calc/calc.js` (кроме случая, если понадобится экспорт — тогда вернуться
  к оркестратору), `data/2026-*/`, `js/`, бандлы (пересборка не нужна).
- После правки `js/**` нужен `node build.js` — в этом прогоне js/ не трогаем.
- Конвенции: DOM нет; всё через чистые шовы; комментарии — только по делу
  (на русском, в стиле соседних файлов); неделя — `YYYY-MM-DD`.
- Недели 08-02…08-23 — непересчитываемая демо-история; RECALC_WEEKS ⊆ CI_WEEKS
  осознанно (демо-недели живут только в CI_WEEKS).
- Отсутствующая возможность/зависимость — вернуть BLOCKED с описанием,
  ничего не устанавливать.
