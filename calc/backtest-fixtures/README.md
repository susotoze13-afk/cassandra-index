# Офлайн-фикстуры бэктеста

Внешние ряды для `calc/backtest.js` (R15). Только значения и провенанс — никакой логики.
`calc/backtest.js` в сеть не ходит: файлы обновляет редактор, вручную, по инструкции ниже.

Формат (`interfaces.md` §4): `{source, series}`.

- `source` — `id`, `name`, `url`, `data_url`, `retrieved` (дата снятия), `as_of`
  (последняя дата, по которую данные полны), `license`, `construct` (что измеряет ряд),
  `granularity` (`day` для GPR, `month` для ACLED/CrisisWatch).
- `series` — GPR: `{date:'YYYY-MM-DD', value}`; ACLED: `{month:'YYYY-MM',
  events, fatalities}`; CrisisWatch: `{month:'YYYY-MM', deteriorated, improved, resolution}`
  (поле `unchanged` в фикстуру не попадает — сравнение идёт по `deteriorated`).

Фикстура — данные, а не код: правится редактором, но должна оставаться валидным JSON
с полным провенансом.

## GPR (Caldara & Iacoviello)

- Источник: <https://www.matteoiacoviello.com/gpr.htm>.
- Файл: `https://www.matteoiacoviello.com/gpr_files/data_gpr_daily_recent.xls`, колонка
  `GPRD` (дневной индекс), строки `date`/`GPRD`.
- Снято 2026-10-18, полные данные по 2026-10-13; 135 дней (2026-06-01…2026-10-13).
- Обновление: скачать файл, взять пары `date → GPRD` за нужный отрезок, положить в
  `series`, обновить `retrieved` и `as_of` в `source`.
- Бэктест сопоставляет неделю `W` со средним дневных значений за `[W−6, W]`
  включительно; если в окне меньше 4 дней ряда (например, последняя неделя после
  `as_of`), неделя в пересечение не входит.

## ACLED (зеркало HDX)

- Датасет: <https://data.humdata.org/dataset/3e6bfc98-f837-495d-b8de-71e5ac026f59>
  (`political-violence-events-and-fatalities.xlsx`), лист `Non_HRP`.
- Снято 2026-10-18, полные данные по 2026-10-09 (октябрь неполный — это честно
  отражено в `as_of`); 22 месяца (2025-01…2026-10).
- Обновление: скачать xlsx, лист `Non_HRP`, агрегировать по месяцам — число событий
  (`events`) и погибших (`fatalities`); строки с неполным месяцем оставлять как есть,
  но поднимать `as_of`.
- Валидация JSON: `node -e "JSON.parse(require('fs').readFileSync('calc/backtest-fixtures/acled.json','utf8'))"`.
- Бэктест сравнивает `events` месяца со средним индексом по неделям методологии 3.0
  этого месяца; месяц без единой недели 3.0 в пересечение не входит.

## CrisisWatch (International Crisis Group)

- Страница: <https://www.crisisgroup.org/crisiswatch>; выпуск
  `september-trends-and-october-alerts-2026`.
- Снято 2026-10-18, as-of 2026-09; 6 месяцев (2026-04…2026-09). Считаются страны по
  строкам месячных Trends: `deteriorated`, `improved`, `resolution` (нужное — только
  `deteriorated`).
- Обновление: открыть свежий выпуск Trends, посчитать строки по каждой категории за
  месяц, дописать месяц в `series`, обновить `retrieved`/`as_of`.
- **Проверка согласованности (сделана при снятии):** сентябрьский `deteriorated` = 5 —
  совпадает со сводкой выпуска «five deteriorations»; августовский = 4 — сверено по
  августовскому выпуску Trends. Эти два числа — контрольные: при пересборке фикстуры
  они обязаны остаться прежними, иначе разметка страницы изменилась и счёт перечитан
  неверно.

## Проверка перед коммитом

```sh
node --test tests/backtest.test.js   # форма фикстур, пересечения, детерминизм
node calc/backtest.js                # печать сводки; диск не трогает
```

Полная проверка репозитория — `node --test` из корня.
