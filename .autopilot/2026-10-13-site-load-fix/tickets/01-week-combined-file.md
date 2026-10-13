# 01 — Генератор комбинированного файла недели (week.js)

**Требования:** R01, R03, R04, R01.1
**Blocked by:** —
**Зона:** `calc/`, новые `data/<week>/week.js`, `tests/`
**Волна:** 1
**Status:** ready

## Что должно заработать

Каждая неделя `data/<YYYY-MM-DD>/` получает производный файл `week.js` — один
синхронный запрос вместо 11. `node calc/calc.js --write <неделя>` пишет его
вместе с частями; все 11 существующих недель получают week.js разовой миграцией
от дисковых частей. Контракт `window.CI_DATA.snapshots[week]` — побайтово тот же
по смыслу (см. `interfaces.md`).

## Из брифа, дословно

> «долгая загрузка сайта»
> «137 запросов»
> «Finish 7.56 s»

## Разделы спецификации

Истории 1–3, 7; Решения 1–4; Швы.

## Критерии приёмки

- [ ] Чистая функция `renderWeekCombined(week, parts) -> string` в calc/calc.js
      (шов тестируется на синтетике): обвязка IIFE, регистрация всех частей
      (global, regions, 6 × region-*, trend, drivers, sources) и полей
      published/through/methodology/dataState/q в `window.CI_DATA.snapshots[week]`
- [ ] `calc.js --write <неделя>` после записи частей пишет и `data/<week>/week.js`;
      `node calc/calc.js <неделя>` (режим печати) диск не трогает
- [ ] Миграция для 11 существующих недель выполнена — week.js сгенерированы от
      дисковых частей одной командой/скриптом и лежат в git
- [ ] Тест паритета: для каждой из 11 недель выполнение week.js в vm даёт тот же
      `snapshots[week]`, что чтение частей через `loadSnapshotPart` (глубокое
      равенство)
- [ ] **Baseline-замер до правок зафиксирован** (см. ниже) — текстом в ответе
      и/или файлом `.autopilot/2026-10-13-site-load-fix--wip/baseline.md`

## Baseline-замер (в начале работы, до любых правок)

Поднять статический сервер корня репо (например `python -m http.server`), открыть
headless Chrome с чистым профилем (без расширений), замерить на http://localhost:PORT/
и на file://<abs>/index.html: число запросов, transferred, resources,
DOMContentLoaded, Load, Finish, ошибки/предупреждения консоли. Инструмент на выбор:
`chrome --headless=new --dump-dom` + CDP-метрики, или Playwright/CDP-скрипт, или
ручной DevTools-прогон с записью цифр. Команды воспроизводимы — записать их в
baseline.md вместе с цифрами. Цель: сопоставимость с замером «после» из таска 02.
