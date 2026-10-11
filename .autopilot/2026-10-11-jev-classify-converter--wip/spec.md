# Спецификация — jev-classify-converter

Источник истины по дизайну — уже принятые документы, гейт G2 по ним пройден
прогоном дизайна 2026-10-11. Ниже — связывание требований с разделами.

## Нормативные разделы (читать исполнителю)

- `docs/jev-classification.md` §3 — схема черновика v2 (`schema_version: 2`,
  запись на `(criterion, source)`, `kind: event|background|not_found`,
  `events[]` без сворачивания в `value`, обязательные `quote`/`url` для любого
  kind кроме `not_found`, `cluster` из whitelist A–F, `review{flag,reason}`,
  `carryover` только D2.*);
- §4 правила 9 и 10 — машинные ворота;
- §6.1 — точный состав шва: `normalizeText(s)`, `quoteFound(quote, text, opts)`,
  `validateDraft(draft)` → `errors[]`, `reviewQueue(draft)` → неразрешённые
  пометки, `toInput(draft, r55Sources, corpusDir)` → `{ input, report, errors }`,
  `loadDraft(path)` + тонкий CLI;
- §6 (ворота §6: linkcheck, validate, validateInputSources) и §8 (раскладка
  артефактов: `calc/input/drafts/<неделя>.llm-draft.json`,
  `calc/input/drafts/texts-<неделя>/`, `calc/input/pilot-llm-<неделя>.json`,
  `calc/input/<неделя>.json`);
- ADR 0018 (дополнение 2026-10-11) — границы роли Jev, почему конвертер
  не ходит в сеть и не встроен в CI.

## Ключевые решения

- Конвертер — чистый модуль без сети и DOM; корпус читается с диска
  (`corpusDir`), Jev не вызывается.
- Ворота §6 (linkcheck/validate/validateInputSources) `toInput` не выполняет —
  это шаги `calc/calc.js` при `--write`; конвертер даёт «сырой вход» для замера
  ±2, штатные ворота прогоняются отдельно.
- `toInput` эмитит вход только при нуле ошибок ворот 9–10 и валидной схеме;
  иначе `{ input: null, report, errors }` с диагностикой.
- Нормализация поиска цитаты — пробелы/дефисы/кавычки (`normalizeText`);
  усечённые цитаты и перефраз воротами не решаются — граница редактора.
- Стиль и конвенции — как `calc/engine.js`/`calc/linkcheck.js`; тесты на
  синтетических черновиках, без сети и без Jev.

## Открытых вопросов нет

Дизайн-прогон зафиксировал всё, что исполнителю нужно; противоречия кода
и документов — через `D##`-запись, не молча.
