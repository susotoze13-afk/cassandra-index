# 01 — Журнал прогнозов и механический baseline

**Требования:** R16, R16.1, R17, R18, R19, R20, R21, R21.1, R22, R24, R24.1, R28i, A01
**Зависит от:** —
**Зона:** `calc/ledger.js` · `tests/ledger.test.js` · `data/public/forecast-ledger.json`
**Волна:** 1
**Ревью:** да — фундамент (публичная схема журнала)
**Модель:** сильная

## Что должно заработать

Команда собирает публичный журнал прогнозов и кладёт его в `data/public/forecast-ledger.json`.
Журнал умеет две вещи. Первая — читать редакционные форвардные якоря
(`calc/input/anchors/forward-<неделя>.json`, ADR 0049), сверять ожидаемый кластер с
фактическим состоянием опубликованной недели и проверять по истории git, что файл якоря
добавлен раньше, чем `data/<неделя>/week.js`. Вторая — строить наивный benchmark
(`baseline`) по опубликованным неделям: ожидание равно кластеру прошлой недели и
направлению «flat», факт берётся из текущей. Промахи попадают в отдельный список `misses`,
а не прячутся в счётчике. Всё детерминировано: повторный прогон даёт те же байты.

## Из брифа, дословно

> «Нужен публичный журнал»

> «дата, ожидаемое состояние/кластер, фактическое состояние, попадание/промах»

> «immutable: запись фиксируется в git до публикации недели»

> «отдельный forecast-ledger.json»

> «обязательно публикуйте промахи, а не только попадания; иначе журнал теряет смысл»

## Разделы спецификации

Истории 21–29, 31–32, 36–37; «Решения по реализации» — «Журнал», «Иммутабельность журнала»,
«Детерминизм»; границы — §1 `interfaces.md`.

## Критерии приёмки

- [ ] `calc/ledger.js` экспортирует ровно `LEDGER_SCHEMA`, `LEDGER_SCHEMA_VERSION`,
      `DIRECTION_DEADBAND`, `clusterOf`, `directionOf`, `buildLedger`, `writeLedger`
- [ ] `clusterOf(20) === 'calm'`, `clusterOf(21) === 'tense'`, `clusterOf(60) === 'danger'`,
      `clusterOf(61) === 'very'`, `clusterOf(101) === null`, `clusterOf(null) === null`
- [ ] `directionOf` с мёртвой зоной 2: `directionOf(2) === 'flat'`, `directionOf(3) === 'up'`,
      `directionOf(-2) === 'flat'`, `directionOf(-3) === 'down'`
- [ ] `buildLedger` на поддельных снапшотах цепочки даёт baseline-записи начиная со второй
      недели, `committedAt` = `published` предыдущей недели, `verified === true`
- [ ] baseline-промах по направлению виден в `misses` с `field: 'direction'` и в
      `summary.baseline.direction` как `hits < total`
- [ ] `buildLedger` без недель возвращает `entries: []`, `summary.baseline.entries === 0`,
      и не падает
- [ ] редакционный якорь: файл `forward-<week>.json` проходит `validateForwardAnchor`,
      при факте даёт `kind:'editor'` и `outcome`, без факта — `pending`, и `pending`
      не входит в `total`
- [ ] `verified: false`, когда поддельный `gitProbe` говорит, что якорь добавлен позже
      публикации; `verified: null`, когда `gitProbe` возвращает `null`
- [ ] ключи JSON отсортированы детерминированно, повторный `writeLedger` даёт те же байты
- [ ] `data/public/forecast-ledger.json` несёт конверт `license` и валиден по схеме
