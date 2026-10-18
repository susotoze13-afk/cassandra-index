# 04 — Сборка входа, сиды, расчёт и публикация недели 2026-10-18 (первая на таксономии v2)

**Требования:** R01, R02, R03i, R04i, R04i.1, R05i
**Blocked by:** 01, 02, 03
**Зона:** `calc/input/2026-10-18.json` · `data/2026-10-18/` · `data/latest.js` · `calc/calc.js` · `tests/latest-loader.test.js` · `tests/week-combined-parity.test.js` · `tests/page-smoke.test.js`
**Волна:** 2
**Status:** ready

## Что должно заработать

Из находок `research/01.json`/`02.json`/`03.json` собирается
`calc/input/2026-10-18.json` (46 критериев: покрытые — значения+источники,
непокрытые — явный `null`; top-level `sources` — R55 из records без дублей;
`driverConfidence` D1..D9), создаются сиды `data/2026-10-18/` (global, trend,
drivers ×3, **12 × region-*** — неделя первая на таксономии v2), `RECALC_WEEKS`
пополняется строкой `'2026-10-18'`, `data/latest.js` указывает на новую неделю.
Далее `node calc/calc.js --write 2026-10-18` (сеть: ворота linkcheck),
`node build.js`, `node --test` зелёный.

## Из брифа, дословно

> «full рассчитай индекс за период 12.10 по 18.10.2026»

## Разделы спецификации

Истории 1–8, Решения §§ (неделя и цепочка, таксономия v2, сбор данных,
источники, сиды, публикация, тесты), Границы и швы.

## Критерии приёмки

- [ ] `validate(calc/input/2026-10-18.json, PARAMS, regionIdsFor('2.0'))` → `[]`
      (46 критериев, покрытие 27–43, R55-схема, D9 ≠ high, все `regions[]` ⊆ v2);
      `node calc/calc.js --write 2026-10-18` прошёл ворота linkcheck (0 broken)
      и контракт, файлы записаны
- [ ] `data/2026-10-18/global.js`: `published` = `through` = `2026-10-18`,
      `regions_taxonomy` = `"2.0"`, methodology `3.0`, dataState корректен;
      тренд — 12 точек, последняя `2026-10-18`
- [ ] Сиды drivers.js (3 драйвера, ru+en, 2–5 источников) и region-*.js
      (12 × по 2 драйвера) написаны по материалам исследования — авторская
      сводка недели, не копия 10-11
- [ ] `data/2026-10-18/week.js` собран из 17 частей (`weekPartFiles('2.0')`),
      версия `2.0` согласована с набором частей
- [ ] `data/latest.js`: CI_WEEKS содержит `2026-10-18`, CI_LATEST = `2026-10-18`
- [ ] `node build.js` выполнен; `node --test` — 0 fail
- [ ] `data/audit.jsonl` пополнился записью recalc недели (добавляет пайплайн)
- [ ] НЕ коммитить — коммит за оркестратором; правки только в «Зоне»
