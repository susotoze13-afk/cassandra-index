# Что уже построено

Читается каждым исполнителем до начала работы. Не изобретай заново то, что здесь есть.

## Границы, решённые в спецификации (протокол Q1–Q24, manifest R01–R06)

- **Ворота независимости (таск 01, сдан)** — чистая функция проверки входа (шов для тестов):
  `calc.js validateSourceIndependence(input, params = PARAMS) -> string[]` (образец —
  validateInputSources); каждый покрытый критерий → ≥2 кластеров whitelist ИЛИ ≥1
  primary|OSINT (поля критериальных источников: `cluster`, `type`); применяется в
  `loadInput` до linkcheck, только к неделям ≥ `PARAMS.independenceGateFrom`
  ('2026-10-11', forward-only); недели раньше даты → [] безусловно.
- **Метрика чувствительности (таск 02)** — чистая функция: leave-one-domain +
  leave-one-cluster, выход `sensitivity` = max|ΔI| (п.п.); опциональное поле quality-блока.
- **Ядро источников (таск 03)** — `PARAMS.coreSources` (домен → кластер, кластеры A/B/C/F),
  warning не ворота, `coreMinDomains` (4).
- **Red team (таск 04)** — record-тип `redteam` в data/audit.jsonl (7 вопросов, answers[],
  flags[], advisory), append через calc/audit.js (hash-цепочка).
- **Документы (таск 05)** — governance §3.x/§3.1 + provenance-matrix (Bloomberg = F-financial).
- **Сайт (таск 06)** — `method.sources.*` (3 bullet'а) + `method.gaps.5` + пометка
  `quality.modal.sensitive` при sensitivity > 5; обязателен `node build.js`.

## Общие правила проекта

- Стек: чистый HTML/CSS/JS + Node stdlib; **ноль зависимостей** (npm/CDN — ошибка).
  Расчётные модули — ESM; `build.js` — CommonJS. Сайт читает собранные бандлы.
- Тесты: `node --test` (из корня, без аргументов); один файл — `node --test tests/<имя>.test.js`.
- Запрещено трогать: опубликованные недели data/2026-08-30…2026-10-04 (кроме явных задач
  таска), демо-недели v1.0, `cassandra-index-prototype.html`, PRD/METHODOLOGY, чужие таски.
- Фикстура `tests/data.test.js` пинит точные числа снапшотов — не ломать.
- `calc/params.js` — единственный источник численных параметров; константы с комментарием
  по конвенции блока.
- Любая правка `js/**` требует `node build.js` (бандлы коммитятся) — ответственность таска 06,
  остальным таскам js/ не трогать.
- Если не хватает решения/зависимости — не выдумывай, верни `BLOCKED` с описанием.
