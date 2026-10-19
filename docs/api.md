# Публичный API Cassandra Index

Машинный контракт публичного слоя данных (ADR 0062). Все файлы — статические
JSON/CSV/SVG на том же домене, что и сайт: отдельного сервера, ключей и лимитов
запросов нет. Контракт описывает **что** отдаётся, а не **как** это читать:
любой HTTP-клиент, `curl`, `fetch`, `pd.read_json` подходят одинаково.

- База: `https://cassindex.ru`
- Версия схемы: `1` (`schema_version` в каждом JSON)
- Версия методологии: `3.0` (`methodology` в файлах и в `methodology.json`)
- Лицензия данных: **CC BY 4.0** (`LICENSE-DATA`), атрибуция обязательна
- Формат: UTF-8, LF, без BOM; JSON — два пробела отступа, ключи в стабильном
  порядке (повторная сборка даёт те же байты)

Cassandra Index — порядковая шкала уровня и направления риска глобального
конфликта по открытым данным. Это **не вероятность войны** и не предсказание
даты; числа несопоставимы между версиями методологии.

## Эндпоинты

| Путь | Что отдаёт | Обновляется |
|---|---|---|
| `/data/public/index.json` | все недели ряда: индекс, регионы, драйверы, развёртка «почему», тренд | еженедельно |
| `/data/public/latest.json` | последняя неделя тем же объектом + конверт | еженедельно |
| `/data/public/weeks/<YYYY-MM-DD>.json` | одна неделя — для кеша и embed | при пересборке |
| `/data/public/regions.json` | регионы обеих таксономий: id, названия, страны, админцентр | при смене таксономии |
| `/data/public/criteria.json` | 46 критериев: драйвер, шкала, направление, названия и описания | при смене методологии |
| `/data/public/methodology.json` | версия, веса, параметры агрегации, шкала состояний | при смене методологии |
| `/data/public/cassandra-index.csv` | плоская таблица «неделя × область» | еженедельно |
| `/data/public/changelog.json` | машинная история изменений методологии/схемы | по событиям |
| `/data/public/trend.svg` | кривая 12 недель без внешних ресурсов | еженедельно |
| `/data/public/schema/v1/*.json` | JSON Schema draft 2020-12 на каждый файл | при смене схемы |
| `/data/public/digest/index.json` | архив еженедельных дайджестов | еженедельно |
| `/data/public/digest/<week>.json` | один выпуск дайджеста: тема, текст, HTML, Telegram | еженедельно |
| `/data/public/validation.json` | внешняя сверка ряда с GPR, ACLED и CrisisWatch | по прогону сверки |
| `/data/public/forecast-ledger.json` | реестр прогнозов и их проверки по опубликованным неделям | еженедельно |

HTTP-заголовки задаёт GitHub Pages, а не приложение:

- `Access-Control-Allow-Origin: *` — читать можно из браузера с любого домена;
- `ETag` и `Last-Modified` — условные запросы (`If-None-Match`) работают;
- `Cache-Control` — кеширование CDN (фактический TTL задаёт GitHub Pages и
  промежуточный кеш; для свежести запрашивайте `latest.json` с `cache: no-cache`).

`week.js` сайта (`/data/<неделя>/week.js`) — **не** часть контракта: это
внутренний формат сайта. Машинным потребителям — только `data/public/*`.

`/data/analysis.js` — тоже не контракт, а зеркало развёртки для сайта
(`window.CI_ANALYSIS`, classic script для `file://`). Поля в нём те же, что в
`driver_breakdown`/`waterfall`/`what_would_change`; используйте JSON-эндпоинты,
а не этот файл.

## Версионирование

Три независимые версии, не путать:

| Поле | Где | Что значит |
|---|---|---|
| `schema_version` | все JSON | версия формы публичного файла; сейчас `1` |
| `methodology` | `index.json`, `methodology.json`, `week.methodology` | версия методики расчёта; сейчас `3.0` |
| `regions_taxonomy` | `week.regions_taxonomy` | версия таксономии регионов недели: `1.0` (6) или `2.0` (12) |
| `project_version` | `methodology.json` | версия проекта из `VERSION` (semver) |

Правила:

- добавление поля или файла — минорное изменение схемы, `schema_version` не меняется;
  потребитель обязан игнорировать незнакомые поля;
- удаление/переименование/смена типа — новая версия `schema_version` и новая
  папка `schema/vN/`;
- недели не переписываются задним числом; недели до `2026-08-30` — демо-история
  методологии `1.0` и не пересчитываются. Фильтруйте по `methodology`, если
  строите непрерывный ряд.

## Конверт

`index.json`:

```json
{
  "schema": "cassandra-index-public",
  "schema_version": 1,
  "site": "https://cassindex.ru",
  "license": {
    "name": "CC BY 4.0",
    "url": "https://creativecommons.org/licenses/by/4.0/legalcode",
    "attribution": "Cassandra Index — https://cassindex.ru, лицензия CC BY 4.0",
    "note": "Атрибуция обязательна: …",
    "placeholder": false
  },
  "weeks": [ { "week": "2026-10-18", "…": "…" } ]
}
```

`latest.json` — тот же конверт с одним объектом `week` вместо массива.
`weeks/<date>.json` — конверт `cassandra-index-week` с одним объектом `week`.

Не все файлы несут конверт: `changelog.json` и `digest/index.json`/`digest/<week>.json`
содержат только `schema`, `schema_version` и полезную нагрузку — полей `site` и
`license` у них нет. Данные в них всё равно распространяются по CC BY 4.0
(`LICENSE-DATA`), атрибуция обязательна. `validation.json` и
`forecast-ledger.json` конверт несут, как `index.json`.

## Объект недели

Поля в порядке файла; `null` — значение отсутствует, а не ноль.

| Поле | Тип | Смысл |
|---|---|---|
| `week` | дата | дата недели (понедельник окна) |
| `published` | дата\|null | дата публикации |
| `through` | дата\|null | «данные по» — конец окна W−7…W |
| `methodology` | строка\|null | версия методики недели |
| `regions_taxonomy` | `"1.0"`\|`"2.0"` | набор регионов недели |
| `data_state` | строка | `published` / `updating` / `delayed` / `insufficient` / `unavailable` |
| `index` | целое\|null | глобальный индекс 0–100; `null` только при `insufficient`/`unavailable` |
| `delta` | целое\|null | изменение к прошлой опубликованной неделе |
| `state` | строка\|null | состояние шкалы: `calm` … `extreme` |
| `q` | число\|null | коэффициент покрытия драйверов 0–1 |
| `confidence` | строка\|null | `full` / `reduced` / `none` |
| `coverage_criteria` | объект\|null | `{covered, total}` — покрытых критериев из 46 |
| `regions` | массив | `{id, index, delta, background}` по набору недели |
| `precursor` | объект\|null | слой Д9: `{value 0–100, signaling_subgroups?}`; в индекс не входит |
| `precursor_present` | bool | `false` означает «не публиковалось», а не «0 сигналов» |
| `drivers` | массив | **редакционные** драйверы: `{label, contribution: high\|medium\|low}` |
| `driver_breakdown` | массив | **модельные** драйверы Д1…Д9 — см. ниже |
| `waterfall` | объект\|null | «прошлая неделя → вклады → эта неделя» |
| `what_would_change` | объект\|null | критерии у порога и контрфактика |
| `sources` | объект | `{count, clusters, state_affiliated}` |
| `trend` | массив | 12 точек `{date, value, methodology?}`; `value: null` — разрыв ряда |

`regions[].background: true` — регион слепой в этой неделе: индекс отражает
глобальный фон, а не региональные данные. Дельту такого региона нельзя читать
как региональную.

Различайте два поля: `drivers` — три сюжета недели от редакции, они не
складываются в индекс; `driver_breakdown` — девять драйверов модели, их вклады
складываются.

## Развёртка драйверов (`driver_breakdown`)

```json
{
  "id": "D1",
  "name": { "ru": "Д1. Военная активность", "en": "D1. Military activity" },
  "score": 0.574,
  "confidence": "medium",
  "weight": 0.1175,
  "weight_effective": 0.13,
  "covered": { "criteria": 5, "total": 6 },
  "contribution_pp": 11.3,
  "top_criteria": [
    {
      "id": "D1.4",
      "name": { "ru": "Актуальные боевые действия", "en": "Active hostilities" },
      "dir": "esc",
      "value": 1,
      "contribution": 0.2,
      "share": 0.348
    }
  ]
}
```

- `score` — нормированный скор драйвера 0–1; `null` — драйвер слепой (покрытие
  критериев ниже порога 50 %).
- `weight` — номинальный вес драйвера из методологии; `weight_effective` —
  вес после нормировки на покрытые драйверы и их уверенность. У Д8
  `weight_effective: null`: он не входит в нормировку эскалационных весов,
  а вычитается с коэффициентом λ.
- `contribution_pp` — вклад драйвера в **опубликованный индекс**, в пунктах
  индекса. Сумма девяти вкладов равна `index` (остаток округления до 0.1
  отдан драйверу с наибольшим модулем вклада). Отрицательный вклад — Д8
  (подтверждённая деэскалация).
- `top_criteria` — до трёх самых весомых покрытых критериев драйвера;
  `value` — нормированный сигнал 0–1, `contribution` — вклад в скор драйвера,
  `share` — доля модуля вклада внутри драйвера (сумма `|share|` = 1).
  Пересечения (`intersection`) не считаются.
- `covered.total` — все критерии драйвера (6/5/5/6/4/4/4/4/8), `criteria` —
  покрытые в этой неделе.

Как считается: вклад драйвера в агрегат до насыщающей кривой (вес × скор;
Д8 — с минусом, Д9 — с ограничителем §4.3.5) масштабируется на опубликованный
индекс. Это развёртка уже посчитанного индекса, а не второй расчёт.

## Водопад (`waterfall`)

```json
{
  "from": { "week": "2026-10-11", "index": 56 },
  "to": { "week": "2026-10-18", "index": 64 },
  "steps": [
    { "driver": "D1", "contribution_pp": -7.2 },
    { "driver": "D2", "contribution_pp": -3.1 },
    { "driver": "D3", "contribution_pp": 5.7 }
  ],
  "residual_pp": 2,
  "residual_reason": "saturation-inertia-coverage-rounding"
}
```

- `steps` — всегда девять драйверов; изменение вклада от прошлой недели к
  текущей, пересчитанное в п.п. через насыщающую кривую.
- Сумма `steps[].contribution_pp` **не равна** `to.index − from.index`:
  остаток лежит в `residual_pp`. Это механика модели — инерция (§5.4),
  q-сжатие (§5.3), лимит недельного прироста Д9 (§4.3.4) и округление
  опубликованного индекса. Атрибутировать остаток драйверам было бы неверно.
- `waterfall: null` — нет входа прошлой недели (первая неделя цепочки) или
  недели принадлежат разным версиям методологии: числа несопоставимы.
- Водопад строится из архивных входов `calc/input/<неделя>.json`; если вход
  недоступен, поле `null`, а не нули.

Для непрерывного ряда используйте `from.index`/`to.index`, а не сумму шагов.

## «Что бы изменило оценку» (`what_would_change`)

```json
{
  "state": "very",
  "thresholds": {
    "down": { "state": "danger", "index": 61, "gap_pp": -3 },
    "up":   { "state": "critical", "index": 81, "gap_pp": 17 }
  },
  "criteria": [
    {
      "id": "D7.3",
      "name": { "ru": "Новые фронты", "en": "New fronts" },
      "driver": "D7",
      "dir": "esc",
      "value": 1,
      "impact_pp": -6.6,
      "effect": "down",
      "crosses_state": true,
      "breaks_driver": false
    }
  ],
  "method": "criterion-zeroed"
}
```

- `thresholds` — ближайшие границы шкалы состояний; `gap_pp` знаковый
  (отрицательный — сколько пунктов отделяет от нижней границы).
- `criteria` — до трёх критериев с наибольшим плечом. `method:
  "criterion-zeroed"` означает контрфактический прогон: сигнал этого критерия
  обнуляется, прочие равны; `impact_pp` — сдвиг внутреннего значения без
  цепочки (инерции нет). Это **оценка плеча**, а не пересчёт опубликованного
  индекса.
- `effect: "down"` — оценка упала бы; `"up"` — выросла (например, при
  исчезновении деэскалационного сигнала).
- `crosses_state` считается по `index + impact_pp` и поэтому приблизителен.
- `breaks_driver: true` — без этого критерия драйвер стал бы слепым
  (покрытие ниже 50 %); такой критерий держит целый блок модели.

## Справочники

### `regions.json`

```json
{
  "schema": "cassandra-index-regions",
  "schema_version": 1,
  "taxonomy_version": "2.0",
  "taxonomy_v2_from": "2026-10-18",
  "current": "2.0",
  "taxonomies": {
    "1.0": [{ "id": "europe", "name": { "ru": "Европа", "en": "Europe" }, "countries": ["AL", "…"], "admin_center": { "…": "…" } }],
    "2.0": [{ "id": "russia-belarus", "name": { "ru": "Россия и Беларусь", "en": "Russia and Belarus" }, "countries": ["RU", "BY"], "admin_center": { "city": { "ru": "Москва", "en": "Moscow" }, "country": "RU", "iso3166_2": "RU-MOW", "geonames_id": 524901 } }]
  }
}
```

`countries` — ISO 3166-1 alpha-2. `admin_center` — город, на который
проецируется регион в интерфейсе; `null` у регионов без административного
центра в справочнике.

### `criteria.json`

```json
{
  "schema": "cassandra-index-criteria",
  "schema_version": 1,
  "methodology": "3.0",
  "criteria_count": 46,
  "drivers": [{ "id": "D1", "name": { "ru": "…", "en": "…" } }],
  "criteria": [{
    "id": "D1.1",
    "driver": "D1",
    "scale": "count",
    "dir": "esc",
    "name": { "ru": "…", "en": "…" },
    "description": { "ru": "…", "en": "…" }
  }]
}
```

`scale`: `count` (счётная), `ordinal` (порядковая 0/0.33/0.67/1),
`binary` (бинарная). `dir`: `esc` — эскалационная, `deesc` — деэскалационная.

### `methodology.json`

```json
{
  "schema": "cassandra-index-methodology",
  "schema_version": 1,
  "methodology": "3.0",
  "project_version": "1.0.0",
  "criteria_count": 46,
  "drivers_count": 9,
  "weights": { "D1": 0.1175, "…": "…", "D9": 0.06 },
  "parameters": {
    "alpha": 0.5, "lambda": 0.6, "rho": 0.25, "u_abs": 0.025, "k": 1.95,
    "coverage_threshold": 0.5, "cap_count": 5, "d9_growth_limit": 0.3,
    "beta_up": 0.9, "beta_down": 0.5,
    "structural_break": { "beta": 0.8, "prev": 0.2, "weeks": 2 },
    "confidence": { "high": 1, "medium": 0.7, "low": 0.4 }
  },
  "severity_values": [0.2, 0.5, 1, 2],
  "clusters": ["A-mainstream", "…"],
  "state_scale": [{ "id": "calm", "min": 0, "max": 20 }, "…"],
  "license": { "…": "…" },
  "sources": { "engine": "calc/engine.js", "params": "calc/params.js", "methodology_document": "METHODOLOGY.md" }
}
```

Веса, `k`, CAP и пороги раскрыты для машинного потребителя (ADR 0062).
Публичная страница «Методология» по-прежнему показывает только шкалу,
направление и названия критериев (ADR 0045): формула и веса — для тех, кто
воспроизводит расчёт, а не для чтения на сайте.

Числа `parameters` — снапшот `calc/params.js` на момент сборки. Меняются
только с версией методологии; сравнивайте `methodology`, прежде чем смешивать
недели в одном расчёте.

## Остальные публичные файлы

### `changelog.json`

История изменений методологии и схемы. Конверта `site`/`license` нет —
это метаданные проекта.

```json
{
  "schema": "cassandra-index-changelog",
  "schema_version": 1,
  "entries": [
    {
      "date": "2026-10-18",
      "version": "3.0",
      "kind": "taxonomy",
      "title": "Таксономия регионов 2.0: двенадцать регионов",
      "body": "Недели начиная с 2026-10-18 считаются набором 2.0 …",
      "link": "https://github.com/susotoze13-afk/cassandra-index/blob/master/docs/adr/0028-region-taxonomy-v2.md"
    }
  ]
}
```

- `date` — дата события `YYYY-MM-DD`; `version` — версия методологии, в которой
  изменение действует.
- `kind` — `methodology`, `taxonomy`, `schema`, `field`, `fix` или `product`.
- `link` необязателен и всегда http(s)-ссылка. Записи идут от новых к старым.

### `digest/index.json`

Архив выпусков: `{schema: "cassandra-index-digest-index", schema_version: 1,
weeks: ["YYYY-MM-DD", …]}`. Даты — в обратном хронологическом порядке. Конверта
`site`/`license` нет; данные — CC BY 4.0 по `LICENSE-DATA`.

```json
{
  "schema": "cassandra-index-digest-index",
  "schema_version": 1,
  "weeks": ["2026-10-18", "2026-10-11"]
}
```

### `digest/<YYYY-MM-DD>.json`

Готовый выпуск дайджеста за неделю. Конверта `site`/`license` нет.

```json
{
  "schema": "cassandra-index-digest",
  "schema_version": 1,
  "week": "2026-10-18",
  "subject": "Cassandra Index, неделя 18 октября 2026 года: 64 из 100, очень опасно, +8",
  "text": "Cassandra Index — неделя 18 октября 2026 года\n…",
  "html": "<!doctype html><html lang=\"ru\">…</html>",
  "telegram": "Cassandra Index — неделя 18 октября 2026 года\n…",
  "meta": { "items": 5, "regions": 3, "hasPrev": true }
}
```

- `week` — дата недели или `null` у служебного выпуска без недели.
- `text` — версия для письма, `html` — тело письма, `telegram` — версия для
  Telegram; `subject` — тема письма.
- `meta.items` — сколько пунктов в выпуске, `meta.regions` — сколько регионов,
  `meta.hasPrev` — был ли предыдущий выпуск (нужен для дельты).
- `digest/<week>.json` стабилен по пути: опубликованный выпуск не переписывается.

### `validation.json`

Внешняя сверка ряда с независимыми источниками (ADR 0063). Конверт
`site`/`license` есть.

```json
{
  "schema": "cassandra-index-validation",
  "schema_version": 1,
  "site": "https://cassindex.ru",
  "license": { "name": "CC BY 4.0", "…": "…" },
  "methodology": "3.0",
  "weeks": ["2026-08-30", "…", "2026-10-18"],
  "thresholds": { "min_pairs": 6, "preliminary_below": 20, "lags": [-2, -1, 0, 1, 2] },
  "comparators": [{
    "id": "gpr",
    "title": "Geopolitical Risk Index (GPR)",
    "granularity": "week",
    "construct": { "ru": "…" },
    "provenance": { "name": "…", "url": "…", "data_url": "…", "retrieved": "2026-10-18", "as_of": "2026-10-13", "license": "…" },
    "overlap": { "periods": 7, "from": "2026-08-30", "to": "2026-10-11" },
    "levels": { "n": 7, "pearson": -0.148, "spearman": 0.126, "p_permutation": 0.7421, "status": "preliminary" },
    "deltas": { "…": "…" },
    "direction": { "hits": 1, "total": 6, "skipped": 0, "rate": 0.167, "status": "descriptive" },
    "lead_lag": { "by_lag": [{ "lag": 0, "n": 6, "pearson": -0.599 }], "best_lag": 0, "best": -0.599, "status": "preliminary" },
    "discrepancies": [{ "period": "2026-10-11", "index_delta": 10, "external_delta": -26.45 }],
    "note": null
  }],
  "summary": { "comparators": 3, "with_coefficients": 1, "insufficient": 2 }
}
```

- `comparators[].status` — `insufficient` (пар меньше `min_pairs`), `preliminary`
  (меньше `preliminary_below`), `ok` или `descriptive` (для направления).
- Коэффициенты `pearson`/`spearman`/`p_permutation`, `lead_lag.best` и
  `overlap.from`/`to` бывают `null` — это «недостаточно пар», а не ноль.
  Месячные компараторы дают `YYYY-MM` в `period`/`from`/`to`.
- `discrepancies` — периоды, где знак изменения индекса и внешнего ряда разошёлся
  (до 12 записей). Это диагностика, а не ошибка.
- `note` — пояснение, почему коэффициент не публикуется, или `null`.

### `forecast-ledger.json`

Реестр прогнозов и их проверки по опубликованным неделям (ADR 0064). Конверт
`site`/`license` есть.

```json
{
  "schema": "cassandra-index-forecast-ledger",
  "schema_version": 1,
  "site": "https://cassindex.ru",
  "license": { "name": "CC BY 4.0", "…": "…" },
  "rule": { "cluster": "шкала js/risk.js (SCALE)", "direction": { "deadband": 2, "values": ["down", "flat", "up"] }, "baseline": "…" },
  "entries": [{
    "week": "2026-09-06",
    "kind": "baseline",
    "committedAt": "2026-08-30",
    "verified": true,
    "expectedCluster": "danger",
    "expectedDirection": "flat",
    "actualIndex": 42,
    "actualCluster": "danger",
    "actualDelta": -9,
    "actualDirection": "down",
    "outcome": { "cluster": "hit", "direction": "miss" }
  }],
  "summary": {
    "baseline": { "entries": 7, "cluster": { "hits": 6, "total": 7 }, "direction": { "hits": 2, "total": 7 }, "pending": { "cluster": 0, "direction": 0 } },
    "editor": { "entries": 0, "cluster": { "hits": 0, "total": 0 }, "direction": { "hits": 0, "total": 0 }, "pending": { "cluster": 0, "direction": 0 } }
  },
  "misses": [{ "week": "2026-10-18", "kind": "baseline", "field": "cluster", "expected": "danger", "actual": "very" }]
}
```

- `kind` — `baseline` (прогноз «без изменений») или `editor` (прогноз редактора
  из `calc/input/anchors/forward-<week>.json`).
- `committedAt` — когда прогноз зафиксирован; `verified` — подтверждён ли он
  git-историей (`null` у непроверенной записи редактора).
- `outcome` по каждому полю — `hit`, `miss` или `pending` (нет факта или
  ожидания). `pending` не входит в `total`.
- `actualIndex`/`actualDelta`/`actualCluster`/`actualDirection` бывают `null`,
  пока неделя не опубликована.
- `rule.direction.deadband` — порог, ниже которого изменение считается `flat`.
- `misses` — плоский список промахов для быстрой проверки калибровки.

### `cassandra-index.csv`

Плоская таблица «неделя × область», одна строка на глобальный ряд и на каждый
регион недели. Колонки в этом порядке:

`schema,schema_version,week,published,through,methodology,regions_taxonomy,data_state,scope,index,delta,state,q,confidence,coverage_covered,coverage_total,background`

- `scope` — `global` или id региона набора недели (`regions_taxonomy`).
- `background` — `true` у слепого региона: индекс отражает глобальный фон.
- Пустые поля — «нет данных» (`null` в JSON), а не ноль. `schema` каждой строки —
`cassandra-index-public`, `schema_version` — `1`.

### `trend.svg`

Кривая последних 12 недель: 640×320, линия и точки, подписи дат по оси X,
без внешних ресурсов, шрифтов и скриптов — встраивается в страницу и письмо
как есть. Значения — глобальный индекс 0–100. Файл не JSON, JSON Schema к нему
не применяется.

## Схемы

`data/public/schema/v1/`:

| Файл | На что |
|---|---|
| `index.schema.json` | `index.json` |
| `latest.schema.json` | `latest.json` |
| `week.schema.json` | `weeks/<date>.json` и объект недели (`#/$defs/week`) |
| `regions.schema.json` | `regions.json` |
| `criteria.schema.json` | `criteria.json` |
| `methodology.schema.json` | `methodology.json` |
| `changelog.schema.json` | `changelog.json` |
| `digest-index.schema.json` | `digest/index.json` |
| `digest.schema.json` | `digest/<date>.json` |
| `validation.schema.json` | `validation.json` |
| `forecast-ledger.schema.json` | `forecast-ledger.json` |

JSON Schema draft 2020-12. Схемы разрешают только описанные поля
(`additionalProperties: false`) — это контракт, а не подсказка. `index.json` и
`latest.json` ссылаются на `week.schema.json#/$defs/week`, а не дублируют его.
Схема на каждый публичный JSON обязательна: тест-сторож падает, если на диске
появился файл `data/public/**/*.json` без схемы или без строки в этом документе.

## Примеры

```bash
# последняя неделя
curl -s https://cassindex.ru/data/public/latest.json | jq '.week | {week, index, delta, state}'

# почему изменился индекс
curl -s https://cassindex.ru/data/public/latest.json \
  | jq '.week | {delta, steps: .waterfall.steps, residual: .waterfall.residual_pp}'

# вклады драйверов и top-3 критерия
curl -s https://cassindex.ru/data/public/latest.json \
  | jq '.week.driver_breakdown[] | {id, contribution_pp, top: [.top_criteria[].id]}'

# одна неделя из кеша
curl -s https://cassindex.ru/data/public/weeks/2026-10-18.json | jq '.week.index'
```

```js
const res = await fetch('https://cassindex.ru/data/public/latest.json', {
  headers: { accept: 'application/json' },
});
const { week } = await res.json();
const drivers = week.driver_breakdown
  .filter((d) => d.contribution_pp > 0)
  .sort((a, b) => b.contribution_pp - a.contribution_pp);
console.log(week.week, week.index, drivers.map((d) => `${d.id}: ${d.contribution_pp}`));
```

## Лицензия и цитирование

Данные — CC BY 4.0 (`LICENSE-DATA`). При переиспользовании обязательны:
упоминание «Cassandra Index», ссылка https://cassindex.ru, лицензия CC BY 4.0 и
отметка изменений. Код — Apache 2.0 (`LICENSE`), тексты — CC BY 4.0
(`LICENSE-DOCS`). Название, логотип и домен лицензиями не передаются
(`TRADEMARK.md`).

Корректная ссылка: «Cassandra Index, версия <project_version>, неделя
<YYYY-MM-DD>, https://cassindex.ru». Машинная форма — `CITATION.cff`.

## Границы

- Индекс не предсказывает дату войны и не является вероятностью войны.
- Пропуск (`null`) — честное «нет данных», а не ноль.
- `precursor` в индекс не входит; `precursor_present: false` — слой не
  публиковался.
- `residual_pp` — модель, а не ошибка; не складывайте шаги водопада без него.
- Числа разных версий методологии несопоставимы; фильтруйте по `methodology`.
- `week.js` сайта — внутренний формат, не контракт.
