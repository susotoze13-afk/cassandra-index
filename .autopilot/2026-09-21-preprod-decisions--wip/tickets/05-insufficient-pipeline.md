# 05 — Пороги покрытия и Insufficient data в пайплайне и контракте данных

**Требования:** R11, R12, R13, R14 (часть — данные), R16 (часть — запись в audit), R19 (часть — запись), R26 (часть — methodology в точках тренда), R28 (часть — данные), R35 (часть — записи recalc), R36 (часть — baseline в snapshot), R37 (часть — метаданные), R55 (часть — top-level sources)
**Blocked by:** 01, 02
**Зона:** `calc/calc.js`, `js/data.js`, `data/2026-08-30/`, `data/2026-09-06/`, `data/2026-09-13/`, `tests/data.test.js`
**Волна:** 2

## Что должно заработать

Пайплайн классифицирует публикацию по доле веса null-драйверов: >40% или null Д1/Д2 —
`dataState='insufficient'`, индекс не публикуется (global=null), q/nullWeight/confidence
записаны; 20–40% — published с пониженной уверенностью и пометкой; <20% — полная.
Инерция не рвётся: следующая валидная неделя считается от последнего валидного internal.
Снапшоты несут q, coverage, confidence, recalc-метаданные; точки тренда — methodology.
Перезапись недели пишет запись recalc в audit log. Контракт данных (js/data.js) принимает
новую форму и остаётся совместим с демо-неделями 08-02…08-23.

## Из брифа, дословно

> «Суммарный вес null драйверов > 40% или null по Д1 или null по Д2 — Insufficient data —
> публикация основного индекса запрещена»
> «Insufficient data не маскируется инерцией: показывается последний валидный снапшот
> с пометкой «Historical snapshot»»
> «Показывается последний валидный снапшот с пометкой «Historical snapshot»»

## Разделы спецификации

Истории 9–13, 51–53; Решения §1, §3, §10; Швы (data-contract, calc-cli).

## Детали

- Классификация — в calc.js после aggregateDrivers: nullWeight = 1 − q (q из движка);
  правила из PARAMS.dataCoverage (таск 01). D1/D2 null проверять по score === null.
- Снапшот insufficient-недели: `global: null`, `dataState: 'insufficient'`, пишутся
  `q`, `nullWeight`, `coverage: {coveredDrivers, totalDrivers}`, `confidence: 'none'`,
  `preview: {index, internal}` — расчётное число БЕЗ публикации (честность: видно
  редакции, не видно посетителям), `recalc: {at, reason, previous, methodologyBefore,
  methodologyAfter, approvedBy}`. validate (js/data.js) допускает global:null ТОЛЬКО при
  dataState insufficient/unavailable.
- Reduced-неделя: `confidence: 'reduced'`, `coverageNote: 'неполное покрытие'` (через
  i18n на сайте, в данных — ключ/флаг incompleteCoverage: true).
- Полная: `confidence: 'full'`.
- Инерция: calc.js хранит lastValidInternal; insufficient-неделя не меняет его, но
  пишет preview по цепочке от lastValidInternal. Структурный разрыв (SBO) — как раньше.
- Trend: каждая точка {date, value, methodology?}; methodology — версия снапшота недели
  точки; для недель без поля — null (старьё).
- top-level sources: вход может нести `sources` (полная схема из таска 01+09:
  id/title{ru,en}/domain/url/publication_date/accessed_date/source_type/cluster_id/
  state_affiliated + опциональные); если есть — calc.js пишет их в снапшот вместо
  ручных; строгая валидация до записи (ошибка — диск не трогаем).
- audit: при каждой перезаписи числовых файлов недели — append типа recalc с 9 полями
  (changed_by: 'calc-pipeline', recalculation_method: 'aggregateDrivers v2.0',
  approved_by: 'Editor-in-Chief', diff — изменившиеся поля с from/to).
- Переписать снапшоты трёх недель (08-30/09-06/09-13) новой логикой. Ожидание: все три —
  insufficient (покрытие 5/45, покрыт только Д1), global:null, hero позже покажет 08-23.
  Это требуемое брифом поведение — не баг.
- data/latest.js не трогать (document.write — инфраструктура).
- js/data.js validate: новые опциональные поля (q, nullWeight, confidence, coverage,
  preview, recalc, incompleteCoverage, methodology в точках тренда); старые снапшоты
  остаются валидными; неделя с global:null → week() отдаёт объект с dataState
  insufficient и НЕ падает в unavailable.
- Тесты: классификация на трёх синтетических входах (границы 0.4/0.2, D1-null, D2-null);
  контракт: insufficient-снапшот валиден, published без global — невалиден; демо-недели
  08-02…08-23 валидны как раньше; trend с methodology валиден.

## Критерии приёмки

- [ ] `node calc/calc.js --write` переписывает три недели: все insufficient, global:null, q/nullWeight/preview записаны
- [ ] Следующая валидная неделя (синтетический прогон в тесте) считает инерцию от lastValidInternal
- [ ] audit.jsonl содержит три записи recalc; verify() ок
- [ ] js/data.js validate: новая форма валидна, старые недели валидны, global:null при published — ошибка
- [ ] `node build.js`, `node --test` зелёный
