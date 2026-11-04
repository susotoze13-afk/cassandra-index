# 02 — Публичный слой: версия 2, дробная точность, производные и changelog

**Требования:** R04, R10 (публичная часть), R13, R18, R22i, R16.3 (производные)
**Зависит от:** 01
**Зона:** `calc/public-contract.js` · `calc/public-export.js` · `calc/changelog-entries.js` · `data/public/**` · `docs/api.md` · тесты публичного слоя (`tests/public-*`, `tests/changelog*`, `tests/contribution-ui*`)
**Волна:** 2
**Ревью:** да — фундамент
**Модель:** сильная

## Что должно заработать

Публичный API отдаёт ту же точность, что снапшот: `PUBLIC_SCHEMA_VERSION = 2`,
схемы `regions[].index/delta` и `countries.rows[].index/delta` — `integer → number`,
`regions[].signals` — опциональное неотрицательное целое (демо-недели без поля
валидны), каталог схем на диске — `data/public/schema/v2/` (при регенерации
`v1` удаляется, `$id` обновлены). `methodologyDoc` больше не раскрывает `n0`.
`datasetOf` проецирует регионы `{id, index, delta, background, signals}`.
Все производные пересобираются штатными CLI от уже пересчитанных снапшотов
(публичный слой, дайджест, архив блога, анализ, внешняя сверка, реестр
прогнозов), `data/analysis.js` синхронна. В курируемый changelog добавляется
запись о переходе на 4.0 — она доходит до `changelog.json` и `changelog.html`.
`docs/api.md` описывает точность, версию схем и поле `signals`.

## Из брифа, дословно

> «Q7 b» — дробь в снапшоте и в публичном API; схемы `integer → number`; `PUBLIC_SCHEMA_VERSION` 1 → 2

> «Q13 да» — поле `signals: n` у региона, пометка в UI при `signals < 2`; редакционное `confidence` не трогаем

> «Q2 Нет, отклонение от глобального не показываем»

> «Q17 (a) + запись в changelog: точность не выдумываем, а переход методологии — событие публичного слоя, оно должно быть видно, а не только в git.»

## Разделы спецификации

Истории 5, 6 (публичная часть), 12 (производные и docs/api.md), 19, 20, 21;
Решения «Публичная версия», «signals — опциональное поле», «Схема аудита/статей».

## Критерии приёмки

- [ ] `PUBLIC_SCHEMA_VERSION === 2`; `regions[].index/delta` и `countries.rows[].index/delta` — тип `number` во всех схемах; `regions[].signals` — опциональное целое ≥ 0 (образец — `COUNTRIES_SCHEMA.signals`)
- [ ] На диске `data/public/schema/v2/`, каталога `v1` нет; `$id` схем и `writePublicData` (mkdir) — на `v2`
- [ ] `methodologyDoc` не содержит `n0`; `regionEstructDefault`/`gamma` раскрыты
- [ ] `datasetOf`: регионы проецируются `{id, index, delta, background, signals}`
- [ ] Запись changelog (дата 2026-11-04, version `4.0`, kind `methodology`, текст «4.0: региональное отклонение по драйверам, дробная точность слоя, снятие объёмного сжатия») присутствует в `changelog.json` и `changelog.html`; `validateChangelog` зелёный; история записей 3.0 не переписана
- [ ] Пересобраны без ошибок: `node calc/public-export.js --write`, `node calc/digest-export.js --write`, `node blog-build.js --write`, `node calc/backtest.js --write`, `node calc/ledger.js --write`; `data/analysis.js` синхронна с генератором (паритет-тест зелёный)
- [ ] `tests/public-contract.test.js` зелёный целиком: типы, `apiMentionsPath` (каждый публичный JSON упомянут в `docs/api.md`), nullable-мутации, число записей расхождений = `MAX_DISCREPANCIES`, диск `schema/v2/`
- [ ] `docs/api.md`: точность (одна десятичная у регионов/стран, целая у глобала), правило `schema/v2`, поле `signals`, обновлённый пример
- [ ] `deltaRegion` отсутствует в `data/public/**` (grep)
- [ ] Инвариант «регион ⊇ страна», страновой слой, precursor, витрина доверия, `intersection`, `history-debt`, `asset-rev` — зелёные (`node --test` из корня без аргументов)
- [ ] Полный `node --test`: 0 fail (красные из списка волны 1 закрыты регенерацией)
