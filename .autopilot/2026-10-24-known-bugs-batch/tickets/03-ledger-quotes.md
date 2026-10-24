# 03 — calc/ledger.js и calc/quotes.js: якоря от rootDir, безопасный id источника

**Требования:** R09 (часть calc/схемы), R13
**Зависит от:** —
**Зона:** `calc/ledger.js` · `calc/public-contract.js` (только description поля verified) · `tests/ledger.test.js` · `tests/quotes.test.js`
**Волна:** 1
**Ревью:** нет
**Модель:** обычная

## Что должно заработать

`writeLedger`/`buildLedger` с `--root <tmp>` читают якоря из `<tmp>/calc/input/anchors`,
а не из боевого репозитория. Описание `verified` в схеме реестра самодокументирует
две причины null. `verifyQuotes` не читает файл вне corpusDir по crafted id источника.

## Из брифа, дословно

> «`calc/ledger.js`: `verified:null` не различает три причины; `writeLedger` без `anchorsDir` читает боевой каталог»
> «`calc/quotes.js` не проверяет `id` источника на путь (`../`)»

## Разделы спецификации

Истории 9, 13. Перед правкой прочитай `.autopilot/2026-10-24-known-bugs-batch--wip/notes.md` разделы 9, 13 — там сигнатуры, номера строк и предложение фикса. Решение пользователя: БЕЗ нового поля в forecast-ledger.json — различие причин только документированием.

## Критерии приёмки

- [ ] В `writeLedger` и `buildLedger` дефолт каталога якорей — `path.join(rootDir, 'calc', 'input', 'anchors')`; поведение с явным `anchorsDir` не изменилось
- [ ] В tests/ledger.test.js пин-тест: writeLedger с tmp-root, якоря в `<tmp>/calc/input/anchors`, без `anchorsDir` — читает tmp, а не боевой каталог
- [ ] Description поля `verified` в FORECAST_LEDGER_SCHEMA (calc/public-contract.js) уточнён: pending + actualIndex null → неделя не опубликована; иначе null → git-история недели недоступна (текст description, структура схемы не меняется)
- [ ] `verifyQuotes` отклоняет id вне `^[A-Za-z0-9_-]+$` ошибкой `sources[i].id: unsafe id` ДО чтения корпуса; реальные id входов 09-20/09-27 проходят (проверь по calc/input/2026-09-20.json и 2026-09-27.json)
- [ ] В tests/quotes.test.js тест: источник с id `'../secret'` и поддельным `opts.readText` даёт ошибку, а не чтение вне corpusDir
- [ ] `node --test` зелёный
