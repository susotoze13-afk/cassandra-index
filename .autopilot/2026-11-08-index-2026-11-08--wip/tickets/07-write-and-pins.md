# 07 — Запись недели, производные, пины, зелёные тесты

**Требования:** R01, R04i, R05i, R06i, R07i
**Зависит от:** 06
**Зона:** `calc/calc.js` (RECALC_WEEKS через prepare-week) · `data/latest.js` ·
`data/2026-11-08/` (сгенерированное) · `data/public/**` · `data/analysis.js` ·
`data/audit.jsonl` · `changelog.html` · `digest.html` · `blog/**` ·
`sitemap.xml` · `llms.txt` · `tests/` · `calc/live-check.js`
**Волна:** 4
**Ревью:** нет
**Модель:** обычная

## Что должно заработать

Неделя `2026-11-08` записана штатным конвейером и опубликована как предыдущие:
списки недель обновлены (подготовка ДО записи), части и `week.js` на диске,
публичный слой/CSV/тренд/дайджест/бандл пересобраны, пины тестов обновлены
вместе с неделей, `node --test` зелёный.

## Из брифа, дословно

> «рассчитай индекс кассандры за период с 02.11 по 08.11.2026»
> «чтобы не было слепых регионов»
> «выполни его целиком»

## Разделы спецификации

Истории 2, 3, 8–10; «Решения по реализации» (порядок записи); `interfaces.md`
§«Генератор», §«Производные», §«Пины», §«Правила проекта»; `notes.md` §1, §4,
§10, §11.

## Критерии приёмки

- [ ] `node calc/prepare-week.js --write 2026-11-08` выполнен ДО записи:
      `RECALC_WEEKS` = 11 недель (08-30…11-08), `CI_WEEKS` = 15,
      `CI_LATEST` = "2026-11-08"
- [ ] `node calc/calc.js --write 2026-11-08` завершился успешно (linkcheck без
      broken); на диске все части v2, `week.js`, `countries.js`
- [ ] `CI_ASSET_REV` пересчитан; `tests/asset-rev.test.js` зелёный
- [ ] `data/2026-11-08/regions.js`: 12 регионов, `background:false` у всех,
      `signals` заполнены; глобальный `coverageCriteria` записан
- [ ] производные пересобраны: `public-export --write`, `backtest --write`,
      `ledger --write`, `digest-export --write`, `blog-build --write`,
      `build.js`; `data/public/weeks/2026-11-08.json` валиден по схеме,
      `data/public/countries/2026-11-08.json` есть
- [ ] пины обновлены числами прогона: `CHAIN_GLOBAL_PIN` — 11 строк (11-08
      последняя), `EXPECTED_WEEK_COUNT` 14→15 (`calc/live-check.js` +
      `tests/live-check.test.js`), ledger baseline 9→10, `CHAIN` в
      `tests/regional-deviation.test.js` и `tests/engine-attribution-parity.test.js`
- [ ] `node --test` — 0 failed (число passed напечатано), `tests/region-country-consistency.test.js`
      зелёный
- [ ] чужие незакоммиченные файлы (`docs/articles/vc-binance-2026-11-01*`) не тронуты
