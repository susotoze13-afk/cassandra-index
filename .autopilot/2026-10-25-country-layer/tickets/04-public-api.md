# 04 — Публичный API странового слоя

**Требования:** R09i, R10i
**Зависит от:** 02
**Зона:** `calc/public-export.js` · `calc/public-contract.js` · `docs/api.md` · `data/public/` · `tests/`
**Волна:** 3
**Ревью:** да — фундамент
**Модель:** сильная

## Что должно заработать

Машинный контракт: `node calc/public-export.js --write` пишет
`data/public/countries/<неделя>.json` для каждой недели с частью `countries.js`
(конверт schema/schema_version/site/license как у `weeks/<неделя>.json`, блок
`countries` без `name`, плюс `sensitivity` недели с раскрытием наследования),
схему `countries.schema.json` в `schema/v1/` и строку в `docs/api.md`.
Сторож tests/public-contract.test.js зелёный: новый файл имеет схему и упоминание.

## Из брифа, дословно

> «и далее шаг за шагом»

## Разделы спецификации

История 7, 8; interfaces.md «Публичный слой (новый файл, не поле)».

## Критерии приёмки

- [ ] `--write` производит `data/public/countries/2026-10-25.json`; недели без части countries файлов не получают
- [ ] Схема `countries.schema.json` проходит минимальный валидатор тестов; nullable-поля — массивом типов
- [ ] `docs/api.md` имеет строку пути с не-буквенно-цифровыми границами (матч `apiMentionsPath`)
- [ ] Детерминизм: повторный `--write` даёт те же байты
- [ ] `PUBLIC_SCHEMA_VERSION` прежний; поля существующих файлов не изменились (diff `data/public/weeks/*.json`, `index.json` — только ожидаемые изменения от параллельной сессии, не от этого тикета)
- [ ] `node --test` зелёный
