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

## Из таска 01 — ворота независимости (commit 83fffbc)

- `validateSourceIndependence(input, params = PARAMS) -> string[]` (calc/calc.js; пусто
  для недель < `PARAMS.independenceGateFrom`); hook в loadInput после validate/validateInputSources.
- `PARAMS.independenceGateFrom = '2026-10-11'` (forward-only).

## Из таска 04 — red team (commit 15f2a63)

- `audit.append({type:'redteam', week, answers: string[7], flags?: string[], approved_by}) -> {id, hash}`;
  `REQUIRED_BY_TYPE` — per-type обязательные поля; `created_by = changed_by ?? approved_by`;
  'redteam' добавлен в TYPES, verify() зелёный. Форма чек-листа (7 вопросов, advisory) — governance §3.1.

## Из таска 02 — метрика чувствительности (commit 4a9e16b, бандл 39a3fcf)

- `sensitivityScore(input, ctx, params = PARAMS) -> number|null` (calc/sensitivity.js;
  `null` — вырожденный вход, не 0). Порог: `PARAMS.sensitivityThreshold = 5`
  (константа `SENSITIVITY_THRESHOLD` — re-export для совместимости импортов).
- Опциональное поле `quality.sensitivity` в контракте снапшота: `validateQuality`
  (`js/data.js`) принимает и без него (демо-недели валидны).

## Из таска 03 — ядро источников (commit 4e1de90)

- `PARAMS.coreSources` (9 доменов: A — reuters/theguardian/apnews, B — aa.com.tr/dw,
  C — understandingwar/crisisgroup, F — bloomberg/finance.yahoo), `PARAMS.coreMinDomains = 4`.
- Warning в отчёте расчёта при задействованных доменах ядра < coreMinDomains —
  предупреждение, не ворота.

## Из таска 05 — документы (commit 78d055a)

- Кода нет: governance §3 (таблица ядра, ворота ADR 0019 с 2026-10-11), §3.1
  (процедура red team — 7 вопросов verbatim), provenance-matrix: Bloomberg = F-financial.
  Для сверки текстов: таблица ядра 1:1 с `PARAMS.coreSources`.

## Из таска 06 — сайт (commit a683c31)

- i18n-ключи (`js/i18n.js`): `method.sources.title`, `method.sources.1–3`,
  `method.gaps.5`, `quality.modal.sensitive` (пометка при `sensitivity > 5`).
- Подключены в `LIST_KEYS` секции «Методология»; бандлы пересобраны (`node build.js`).
