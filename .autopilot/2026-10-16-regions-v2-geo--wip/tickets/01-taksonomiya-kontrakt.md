# 01 — Таксономия: контракт, резолверы, whitelist

**Требования:** R02.1, R03, R03.1–R03.5, R04, R05, R06, R07, R09, R30i
**Blocked by:** нет
**Зона:** `js/data.js` · `js/region.js` · `calc/params.js` · `calc/engine.js` · `tests/`
**Волна:** 1
**Status:** pending

## Что должно заработать

Контракт снапшота и расчётное ядро перестают знать одну шестёрку регионов и
начинают знать **набор по версии таксономии**. Неделя без поля
`regions_taxonomy` валидна как v1 (шесть регионов); неделя с `'2.0'` требует
двенадцать. Реестр сайта (`js/region.js`) уже несёт `REGIONS_V1`/`REGIONS_V2` —
доводим швы, а не состав. Ядро принимает whitelist регионов входа снаружи, а не
из константы.

## Из брифа, дословно

> «`validate` читает `snapshot.regions_taxonomy` и требует ровно id своей версии
> (через резолвер `regionIdsFor(taxonomy)` вместо единственной `REGION_IDS`)»

> «**Разбиение строгое** — страна принадлежит ровно одному региону»

> «Смещение старой `europe` новым регионам **не наследуется**»

## Разделы спецификации

Решения §Таксономия, §Контракт; Границы (`js/data.js`, `js/region.js`, `calc/engine.js`).

## Критерии приёмки

- [ ] `js/data.js`: `REGION_TAXONOMIES = {'1.0':[6 id], '2.0':[12 id]}`,
      `regionIdsFor(taxonomy='1.0')`, `CURRENT_TAXONOMY='2.0'`,
      `TAXONOMY_V2_FROM='2026-10-18'`; `REGION_IDS` = текущий набор (псевдоним).
- [ ] `validate(snapshot)` требует ровно `regionIdsFor(regions_taxonomy ?? '1.0')`;
      v1-снапшот без поля проходит, v2-снапшот с шестью регионами — отклонён.
- [ ] `engine.validate(input, params, regionIds)` — третий параметр, whitelist
      `regions[]` по нему; дефолт — текущий набор; ошибка называет whitelist.
- [ ] `calc/params.js`: `taxonomyV2From` (или константа) и `methodology` остаётся `'3.0'`.
- [ ] Тест пинит тройное равенство `regionIdsFor(v)` ↔ `regionForTaxonomy(v).map(id)`
      ↔ `reference.json taxonomies[v].regions[].id`.
- [ ] Тест строгости: каждый ISO-код v2 ровно в одном регионе; TR→`middle-east`,
      CY/MT→`eu-north-europe`, GR/BG/RO/HR/SI→`balkans`, EE/LV/LT→`baltic`;
      `GL`/`XK` не входят.
- [ ] `js/region.js`: `get`/`isCurrent`/`current`/`choose` по текущему набору;
      `'europe'` вне набора (забывается); порядок `detect` — российские `Asia/*`
      выше центральноазиатских, `Europe/` последним; `CITIES` размечены v2.
- [ ] `node --test` зелёный (пины `region.test.js`, `regional-signals.test.js`,
      `methodology-criteria.test.js` обновлены осознанно, не подогнаны).
