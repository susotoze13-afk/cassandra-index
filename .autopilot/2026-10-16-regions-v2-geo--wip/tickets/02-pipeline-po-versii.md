# 02 — Расчётный пайплайн по версии недели

**Требования:** R08, R12, R25, R26, R27(calc-часть), R09(calc-часть)
**Blocked by:** 01
**Зона:** `calc/calc.js` · `calc/migrate-week-combined.js` · `tests/data.test.js` · `tests/week-combined*.test.js` · `tests/latest-loader.test.js` · `tests/insufficient.test.js` · `tests/sensitivity.test.js`
**Волна:** 2
**Status:** pending

## Что должно заработать

`calc.js` проводит неделю **набором её версии**: v1-неделя (≤ 2026-10-11)
работает шестёркой как раньше, v2-неделя (≥ 2026-10-18) — двенадцатью, пишет
`regions_taxonomy` и `region-*.js` своего набора. Список частей `week.js` —
по версии. Новый регион без якоря честно слеп (offset 0). Существующие 11 недель
не меняются по содержанию.

## Из брифа, дословно

> «`calc.js` пишет `regions_taxonomy` и 7 новых `region-*.js` для v2-недели; сид offset 0»

> «**Forward-only.** Старые 11 недель сохраняют v1-шестёрку и показывают её без правок данных»

> «`calc/prepare-week.js`, `data/latest.js`, `tests/week-combined-parity.test.js` — список частей недели по версии»

## Разделы спецификации

Решения §Расчёт; Границы (`calc/calc.js`).

## Критерии приёмки

- [ ] `taxonomyForWeek(week)` → `'2.0'` при `week >= TAXONOMY_V2_FROM`, иначе `'1.0'`;
      `runWeek`/`nextChainState`/`writeWeek`/`main` итерируют набор недели, не `REGION_IDS`.
- [ ] `renderGlobal` пишет `regions_taxonomy`; `--write` проходит оба ворот.
- [ ] `weekPartFiles('1.0')` = 11 частей (как `WEEK_PART_FILES` сегодня),
      `weekPartFiles('2.0')` = 17; `loadWeekParts(week)` читает `global.js`,
      узнаёт версию, читает части своего набора; `renderWeekCombined` не меняет контракт.
- [ ] Новый регион v2 без `prevIndex` → offset 0, `background:true`; `europe`-смещение
      новым id не наследуется.
- [ ] `migrate-week-combined.js` идемпотентен; для 11 недель v1 `week.js` не меняется
      по содержанию (парити-тест зелёный).
- [ ] Пины обновлены: `data.test.js`, `week-combined*.test.js`, `latest-loader.test.js`,
      `insufficient.test.js`, `sensitivity.test.js`; `node --test` зелёный.

## Оговорка исполнителю

Реальный `--write` требует сети (linkcheck) — не гонять; покрыть `weekPartFiles`/
`loadWeekParts`/`renderWeekCombined` на синтетике и пометить в CONCERNS, что
дисковую запись проверять при следующем реальном `--write`.
