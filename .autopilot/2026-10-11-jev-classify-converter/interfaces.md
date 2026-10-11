# Что уже построено

Читается каждым исполнителем до начала работы. Не изобретай заново то, что здесь есть.

## Границы, решённые в спецификации

- `calc/classify.js` — чистый конвертер «черновик v2 → штатный вход».
  Публичный шов (по §6.1 дизайн-документа): `normalizeText`, `quoteFound`,
  `validateDraft`, `reviewQueue`, `toInput`, `loadDraft` + тонкий CLI.
  Никакого сетевого фетча, никакого вызова Jev.
- Ворота конвертера — правила 9–10 (`docs/jev-classification.md` §4);
  штатные ворота публикации (linkcheck/validate/validateInputSources) здесь
  не повторяются.
- Нормативный дизайн: `docs/jev-classification.md` §3–§8, ADR 0018 (доп. 2026-10-11).

## Общие правила проекта

- Стек: чистый Node ≥ 18, только stdlib, всё ESM; ноль npm-зависимостей —
  любой импорт npm/CDN — ошибка.
- Тесты: полный набор — `node --test` (из корня, без аргументов);
  один файл — `node --test tests/<имя>.test.js`.
- Не трогать: `METHODOLOGY.md`, `PRD_Casandra_Index.md`,
  `cassandra-index-prototype.html`, `.autopilot/`, рабочее дерево параллельной
  сессии (`docs/articles/*` и прочие чужие правки).
- Коммитить не исполнителю — оркестратору.

## Из таска 01 — calc/classify.js

- `calc/classify.js` — чистый конвертер «черновик v2 → штатный вход» (ESM, stdlib, без сети):
  - `normalizeText(s)` — нормализация пробелов/дефисов/кавычек;
  - `quoteFound(quote, text, opts?) → bool` — дословная проверка цитаты (ворота 9);
  - `validateDraft(draft, params=PARAMS) → errors[]` — схема v2 (schema_version, kind-дисциплина: event требует event_date, value+events вместе у count запрещены, дубль пары (criterion,source) — ошибка; cluster из whitelist; events из {0.2,0.5,1.0,2.0});
  - `reviewQueue(draft) → [{index, criterion, source_id, kind, reason}]` — неразрешённые пометки (ворота 10);
  - `toInput(draft, r55Sources, corpusDir) → { input, report, errors }` — input:null при любых ошибках; report `{items:{total,accepted,rejected,notFound}, rejected:[], review, missingCorpus}`; merge по критерию: events конкатенируются, value = max; not_found → null; events[] НЕ сворачивается в value; источники входа — из записей R55 (url/cluster_id→cluster/source_type→type/state_affiliated), date = event_date || publication_date;
  - `loadDraft(path)`; CLI: `node calc/classify.js <draft> [--corpus <dir>] [--sources <r55.json>] [--out <path>]` (без --out — JSON в stdout, exit 0/1);
  - корпус: файл `<corpusDir>/<source_id>.txt`; отсутствие файла — отказ записей этого источника (missingCorpus), не падение прогона.
