# 02 — Бэктест: фикстуры, метрики, validation.json

**Требования:** R02, R03, R03.1, R04, R05, R05.1, R06, R07, R08, R09, R14, R14.1, R15,
R15.1, R26i, R27i
**Зависит от:** —
**Зона:** `calc/backtest.js` · `calc/backtest-fixtures/**` · `tests/backtest.test.js` ·
`data/public/validation.json`
**Волна:** 1
**Ревью:** да — фундамент (публичная схема и статистика)
**Модель:** сильная

## Что должно заработать

`node calc/backtest.js --write` читает только диск, выравнивает недельный индекс
методологии 3.0 с тремя внешними рядами и пишет `data/public/validation.json`. В нём на
каждый компаратор: провенанс, пересечение по периодам, корреляция уровней и дельт с `n`,
перестановочный p, согласие направлений, таблица лагов, список расхождений и `status`,
который честно говорит «недостаточно пар», когда пар меньше порога. Без `--write` скрипт
только печатает сводку и не трогает диск.

Внешние ряды лежат в `calc/backtest-fixtures/` готовыми JSON-фикстурами с провенансом.
Сырые выгрузки уже сняты с источников и лежат вне репозитория — забери их и приведи к
формату фикстур:
- `C:\Users\1\oc-temp\opencode\backtest-raw\gpr_daily.json` — 135 дневных значений
  `{date, value}`, 2026-06-01…2026-10-13, источник:
  GPR (Caldara & Iacoviello), `https://www.matteoiacoviello.com/gpr.htm`,
  файл `https://www.matteoiacoviello.com/gpr_files/data_gpr_daily_recent.xls`,
  колонка `GPRD`, снято 2026-10-18, as-of 2026-10-13.
- `C:\Users\1\oc-temp\opencode\backtest-raw\acled_monthly.json` — 22 месяца
  `{month, events, fatalities}`, 2025-01…2026-10, источник: ACLED, зеркало HDX
  (`political-violence-events-and-fatalities.xlsx`, датасет
  `https://data.humdata.org/dataset/3e6bfc98-f837-495d-b8de-71e5ac026f59`),
  лист `Non_HRP`, снято 2026-10-18, as-of 2026-10-09 (октябрь неполный).
- `C:\Users\1\oc-temp\opencode\backtest-raw\crisiswatch_monthly.json` — 6 месяцев
  `{month, deteriorated, improved, resolution}` (в фикстуре оставь `deteriorated`,
  `improved`, `resolution`; поле `unchanged` не нужно), 2026-04…2026-09,
  источник: CrisisWatch, International Crisis Group,
  `https://www.crisisgroup.org/crisiswatch`, выпуск
  `september-trends-and-october-alerts-2026`, снято 2026-10-18, as-of 2026-09.
  Сверка: сентябрьский `deteriorated` = 5 (совпадает со сводкой «five deteriorations»),
  августовский = 4 (сверено по августовскому выпуску).

Собери в `calc/backtest-fixtures/README.md`: откуда снято, как обновить (какой файл
скачать, какие колонки взять), какой проверкой подтверждена согласованность.

## Из брифа, дословно

> «сравнение уровня и направления индекса с ACLED Conflict Index, CrisisWatch и GPR»

> «корреляция уровней и дельт, direction hit rate, lead/lag, расхождения»

> «воспроизводимый скрипт calc/backtest.js с офлайн-фикстурами»

## Разделы спецификации

Истории 3–12, 17–20, 34–35; «Решения по реализации» — «Выравнивание», «Порог выборки»,
«Направление», «Lead/lag», «Расхождения», «Фикстуры»; границы — §2 и §4 `interfaces.md`.

## Критерии приёмки

- [ ] `node calc/backtest.js` без `--write` печатает сводку по трём компараторам и не
      пишет файлов
- [ ] `--write` создаёт `data/public/validation.json` со `schema`, `schema_version: 1`,
      `week`-списком, `thresholds`, тремя компараторами в порядке `gpr, acled, crisiswatch`
- [ ] `pearson([1,2,3],[2,4,6]) === 1`, `pearson` при нулевой дисперсии → `null`,
      `spearman` монотонно убывающей связи → `-1`
- [ ] `directionAgreement` не считает нулевые дельты в `total`, а отдаёт их в `skipped`
- [ ] `leadLag` при `n < MIN_PAIRS` на каждом сдвиге даёт `status: 'insufficient'` и
      `best: null`
- [ ] GPR-компаратор: пересечение 7 недель (10-12…10-18 отброшена — меньше 4 дней в окне),
      `levels.status: 'preliminary'`, `deltas.n = 6`
- [ ] месячные компараторы: `levels.status: 'insufficient'`, `pearson === null`,
      `n` сохранён
- [ ] `discrepancies` содержит только пары с разными ненулевыми знаками, по дате по
      убыванию, не больше 12
- [ ] снапшоты методологии не 3.0 и `dataState !== 'published'` в пересечение не попадают
- [ ] `permutationP` детерминирован: два прогона дают одинаковое p
- [ ] повторный `--write` даёт побайтно те же файлы; в JSON нет дат генерации
- [ ] тест на временном каталоге фикстур (`mkdtempSync`) воспроизводит пересечение без
      сети
- [ ] `calc/backtest-fixtures/README.md` описывает обновление всех трёх рядов
