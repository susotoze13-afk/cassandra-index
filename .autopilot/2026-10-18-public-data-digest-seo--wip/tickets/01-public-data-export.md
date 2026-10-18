# 01 — Публичные данные: JSON, CSV, changelog

**Требования:** R09, R09.1, R09.2, R10, R11, R12, R13, R14, R15i, R16i, A02
**Зависит от:** —
**Зона:** `calc/public-export.js` · `calc/changelog-entries.js` · `data/public/` · `changelog.html` · `tests/public-export.test.js` · `tests/changelog.test.js`
**Волна:** 1
**Ревью:** да — фундамент
**Модель:** сильная

## Что должно заработать

У проекта появляется машинночитаемый публичный слой. Аналитик открывает
`https://cassindex.ru/data/public/index.json` и получает историю недель с индексом,
дельтой, состоянием, покрытием, регионами и трендом; тот же ряд лежит в CSV одной
таблицей; рядом — `changelog.json`, где записано, что и когда менялось в методологии,
таксономии и полях. Всё это производная от уже существующих снапшотов: числа в файлах
не могут разойтись с сайтом, и это проверяется тестом.

## Из брифа, дословно

> «публичный JSON/CSV + changelog»

## Разделы спецификации

Истории 9–16, 31–33, 39; «Решения по реализации» — про проекцию, `state`, CSV,
changelog и детерминизм; «Открытые места» не касаются этого таска.

## Критерии приёмки

- [ ] `node calc/public-export.js` печатает сводку и **не пишет** файлы; `--write` пишет
      `data/public/index.json`, `data/public/latest.json`, `data/public/cassandra-index.csv`,
      `data/public/trend.svg`, `data/public/changelog.json` и `changelog.html` в корне
- [ ] `index.json` несёт `schema`, `schema_version`, `site`, `license`, `weeks[]`; каждая
      неделя — проекция полей из спецификации; каждая проходит `validate` из `js/data.js`
- [ ] Неделя 2026-10-18 в JSON: `index 64`, `delta 8`, `methodology "3.0"`,
      `regions_taxonomy "2.0"`, 12 регионов, `coverage_criteria {covered:34,total:46}`,
      `precursor: null` и `precursor_present: false`
- [ ] `state` каждой недели считается `engine.stateOf(index)`, а не второй таблицей порогов
- [ ] CSV: фиксированная шапка (перечислена в файле-экспорте), строка = неделя × область
      (`global` + регионы), UTF-8 без BOM, разделитель `,`, перевод строки `\n`,
      ни одно поле не содержит запятой
- [ ] `trend.svg` — валидный SVG: 12 точек, подписи дат, ни одной внешней ссылки
- [ ] `changelog.json` проходит `validateChangelog`; в нём есть записи про методологию
      3.0, таксономию 2.0, поле `precursor`, цитаты источников и поле `intersection`;
      `changelog.html` содержит дату, версию и заголовок каждой записи JSON
- [ ] `--write` дважды подряд даёт байт-в-байт те же файлы (никаких timestamp внутри)
- [ ] Битый снапшот на диске → код выхода 1, в stderr имя недели и ошибка `validate`,
      ни один файл не перезаписан
- [ ] Тест паритета: `buildDataset` по диску равен прочитанным `index.json`/CSV; новые
      файлы не добавляют недель в `CI_WEEKS` и не трогают `data/latest.js`
- [ ] `node --test` зелёный; `node build.js` не нужен (правки вне `js/`) и не даёт diff
