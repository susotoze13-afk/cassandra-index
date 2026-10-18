# Границы, швы и правила проекта

Читается каждым исполнителем и ревьюером **до** кода. Имена и формы здесь — контракт:
менять их можно только правкой этого файла и строкой в отчёте.

## Правила проекта (из `PROGRESS.md`, «Договорились»)

- Лицензии разделены по типу материала: код — Apache-2.0, данные и документы — CC BY 4.0,
  название/логотип/домен — вне лицензий (`TRADEMARK.md`), чужие материалы — `NOTICE`
  (ADR 0058).
- Версия проекта — `VERSION` (semver), дублируется в `CITATION.cff`, паритет пинится
  тестом; версия методологии — не версия проекта (ADR 0060).
- Вклад — DCO 1.1 (`git commit -s`), CLA нет; проверка `tools/check-dco.js` сверяет
  подпись с автором (ADR 0059).
- Официальный источник один — cassindex.ru; форки неофициальны.
- Публичное ядро целиком здесь; коммерческий модуль — отдельный приватный репозиторий,
  закрытое зависит от открытого (ADR 0057).
- Публичный слой — производная от `data/<week>/week.js`, детерминизм, версия схемы
  (ADR 0050/0051). Руками `data/public/**`, `changelog.html`, `digest.html` не правятся.
- Шкала порядковая (ADR 0048); `precursor` в индекс не входит и forward-only (ADR 0047);
  параметры калибровки не трогаются до 8 строк журнала (ADR 0049).
- Статические SEO-страницы держат текст в разметке (ADR 0052); email — HTTP-эндпоинт
  (ADR 0053); отметка доставки — «неделя + канал» с резервом (ADR 0054).

Правила, которые действуют в этом прогоне дополнительно:

- **Никаких выдуманных чисел.** Внешние ряды берутся из фикстур с провенансом; если
  значения нет — поле пустое и на странице сказано, почему. Ни один коэффициент не
  публикуется ниже `MIN_PAIRS`.
- **Сеть в пайплайне запрещена.** `calc/backtest.js` читает только диск.
- **Производные файлы** (`data/public/validation.json`, `data/public/forecast-ledger.json`,
  `validation.html`) руками не правятся — только CLI.

## Границы, решённые в спецификации

### 1. `calc/ledger.js` — журнал прогнозов

**Владеет:** правилом сравнения «ожидание → факт», чтением форвардных якорей, git-проверкой
порядка «якорь раньше публикации», сборкой `forecast-ledger.json`.
**Скрывает:** разбор `calc/input/anchors/forward-*.json`, вызов `git`, дедбенд направления.

```js
export const LEDGER_SCHEMA = 'cassandra-index-forecast-ledger';
export const LEDGER_SCHEMA_VERSION = 1;
export const DIRECTION_DEADBAND = 2;

export function clusterOf(index)            // id из SCALE | null
export function directionOf(delta)          // 'down' | 'flat' | 'up' (|null)
export function buildLedger({ weeks, loadSnapshot, anchorsDir, gitProbe })
export function writeLedger({ rootDir, weeks, loadSnapshot, anchorsDir, gitProbe })
// → { file, ledger }
```

Форма (ключи фиксированы, snake_case как в публичном слое):

```json
{
  "schema": "cassandra-index-forecast-ledger",
  "schema_version": 1,
  "site": "https://cassindex.ru",
  "license": { "name": "CC BY 4.0", "url": "…", "attribution": "…", "note": "…", "placeholder": false },
  "rule": {
    "cluster": "шкала js/risk.js (SCALE)",
    "direction": { "deadband": 2, "values": ["down", "flat", "up"] },
    "baseline": "ожидание = кластер прошлой опубликованной недели и направление flat"
  },
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
    "baseline": { "entries": 7, "cluster": { "hits": 6, "total": 7 },
                  "direction": { "hits": 2, "total": 7 },
                  "pending": { "cluster": 0, "direction": 0 } },
    "editor":   { "entries": 0, "cluster": { "hits": 0, "total": 0 },
                  "direction": { "hits": 0, "total": 0 },
                  "pending": { "cluster": 0, "direction": 0 } }
  },
  "misses": [{ "week": "2026-09-06", "kind": "baseline", "field": "direction",
               "expected": "flat", "actual": "down" }]
}
```

- `entries` сортированы по `week` возрастанию, затем `kind` (`editor` после `baseline`).
- `outcome.*` ∈ `hit|miss|pending`; `pending` — факта нет (неделя не опубликована).
- `baseline.committedAt` = `published` предыдущей недели; `verified: true` (правило
  детерминировано, git не нужен).
- `editor`: `committedAt` из файла якоря, `verified` — `null|true|false`:
  `true` — коммит добавления якоря не позже коммита добавления `data/<week>/week.js`;
  `null` — git-история недоступна.
- `gitProbe` — шов: `{ addedAt(relPath) → ISO|null }`. По умолчанию — `git log
  --diff-filter=A --format=%cI --reverse -- <relPath>` из корня репозитория.
- В `summary.editor` попадают только `total` по разрешённым записям; `pending` считается
  отдельно и в `total` не входит.
- Журнал **не** пересчитывает прогнозы задним числом: ожидание editor-записи берётся из
  файла как есть.

### 2. `calc/backtest.js` — метрики и сборка `validation.json`

**Владеет:** выравниванием рядов, статистикой, сборкой публичного JSON и CLI.
**Скрывает:** чтение фикстур, ГПСЧ перестановочного теста, фильтрацию методик.

```js
export const BACKTEST_SCHEMA = 'cassandra-index-validation';
export const BACKTEST_SCHEMA_VERSION = 1;
export const MIN_PAIRS = 6;
export const PRELIMINARY_BELOW = 20;
export const MAX_DISCREPANCIES = 12;
export const LAGS = [-2, -1, 0, 1, 2];
export const COMPARATOR_IDS = ['gpr', 'acled', 'crisiswatch'];

export function pearson(xs, ys)             // number|null (n<3 или нулевая дисперсия)
export function spearman(xs, ys)            // number|null
export function permutationP(xs, ys, opts)  // {p, iterations, seed}
export function directionAgreement(a, b)    // {hits, total, skipped, rate}
export function leadLag(pairs)              // {by_lag:[{lag,n,pearson}], best_lag, best, status}
export function alignWeekly(cassandra, series)   // [{period, index, external}]
export function alignMonthly(cassandra, series)  // [{period, index, external}]
export function loadFixtures(dir)           // {gpr, acled, crisiswatch}
export function cassandraSeries({ weeks, loadSnapshot }) // {weekly, monthly}
export function buildValidation({ weeks, loadSnapshot, fixturesDir })
export function writeValidation({ rootDir, weeks, loadSnapshot, fixturesDir })
// T02: пишет data/public/validation.json и возвращает { files, validation }.
// T03 добавляет в эту же запись data/public/forecast-ledger.json (через writeLedger)
// и validation.html; тест «файл записан» проверяет наличие пути в files, а не их число.
```

Форма `validation.json`:

```json
{
  "schema": "cassandra-index-validation",
  "schema_version": 1,
  "site": "https://cassindex.ru",
  "license": { … },
  "methodology": "3.0",
  "weeks": ["2026-08-30", "…", "2026-10-18"],
  "thresholds": { "min_pairs": 6, "preliminary_below": 20, "lags": [-2,-1,0,1,2] },
  "comparators": [{
    "id": "gpr",
    "title": "Geopolitical Risk Index (GPR)",
    "granularity": "week",
    "construct": { "ru": "…" },
    "provenance": { "name": "…", "url": "…", "data_url": "…",
                    "retrieved": "2026-10-18", "as_of": "2026-10-13",
                    "license": "…" },
    "overlap": { "periods": 8, "from": "2026-08-30", "to": "2026-10-18" },
    "levels": { "n": 8, "pearson": 0.51, "spearman": 0.42,
                "p_permutation": 0.31, "status": "preliminary" },
    "deltas": { "n": 7, "pearson": null, "spearman": null,
                "p_permutation": null, "status": "insufficient" },
    "direction": { "hits": 4, "total": 5, "skipped": 2, "rate": 0.8,
                   "status": "descriptive" },
    "lead_lag": { "by_lag": [{ "lag": -2, "n": 4, "pearson": null }],
                  "best_lag": null, "best": null, "status": "insufficient" },
    "discrepancies": [{ "period": "2026-09-27",
                        "index_delta": -9, "external_delta": 3.2 }],
    "note": null
  }],
  "summary": { "comparators": 3, "with_coefficients": 1, "insufficient": 2 }
}
```

- `status` ∈ `ok` (`n ≥ PRELIMINARY_BELOW`), `preliminary` (`MIN_PAIRS ≤ n < PRELIMINARY_BELOW`),
  `insufficient` (`n < MIN_PAIRS`). Для `direction` — `descriptive` либо `insufficient`
  (при `total + skipped < 2`).
- `levels`/`deltas`: при `insufficient` все значения `null`, `n` сохраняется.
- `lead_lag.best` — наибольший по модулю `pearson`, но только при `n ≥ MIN_PAIRS`.
- `discrepancies` — только пары с разными ненулевыми знаками дельт; по дате по убыванию;
  не больше `MAX_DISCREPANCIES`.
- `cassandraSeries.weekly` — недели `methodology === PARAMS.methodology`,
  `dataState === 'published'`, конечный `index`; `{week, published, index, delta}`.
  `monthly` — среднее по неделям месяца, `{month:'YYYY-MM', index, weeks}`.
- GPR: `external` = среднее дневных значений за `[W−6, W]` включительно; если в окне
  меньше 4 дней — неделя в пересечение не входит.
- ACLED: `external` = `events` месяца; CrisisWatch: `deteriorated`.
- `permutationP` детерминирован: LCG с `seed = 20261018`, `iterations = 2000`.
- Порядок компараторов — `COMPARATOR_IDS`.

### 3. `calc/validation-page.js` — страница

**Владеет:** разметкой `validation.html`, экранированием, текстами страницы.
**Скрывает:** вёрстку таблиц, форматирование чисел, выбор подписей статусов.

```js
export const VALIDATION_PAGE_FILE = 'validation.html';
export function renderValidationPage(validation, ledger)  // → string (полный HTML)
```

Обязательные якоря страницы: `#summary`, `#comparators`, `#gpr`, `#acled`,
`#crisiswatch`, `#limits` (подразделы `#limits-constructs`, `#limits-windows`,
`#limits-revisions`), `#ledger`, `#method`, `#sources`.
Структура документа — как у `digest.html`: `body.doc-page`, `STATIC_CSP`, `canonical`
`https://cassindex.ru/validation.html`, `og:*`, `icon.svg`, `css/styles.css`, ровно один
`<h1>`, ни одного `<script>` и внешнего ресурса. Числа: коэффициенты — 2 знака, `rate` —
целые проценты, `null` → «—» с причиной.

### 4. Фикстуры `calc/backtest-fixtures/`

```json
{
  "source": { "id": "gpr", "name": "…", "url": "…", "data_url": "…",
              "retrieved": "YYYY-MM-DD", "as_of": "YYYY-MM-DD",
              "license": "…", "construct": "…", "granularity": "day|month" },
  "series": [ … ]
}
```

- `gpr.json` — `series: [{date:'YYYY-MM-DD', value:number}]`, дневной GPR.
- `acled.json` — `series: [{month:'YYYY-MM', events:number, fatalities:number}]`.
- `crisiswatch.json` — `series: [{month:'YYYY-MM', deteriorated:number, improved:number, resolution:number}]`.
- `README.md` в каталоге: откуда снято, как обновить, чем проверена согласованность.
- Файлы — данные, не код: правятся редактором, но обязаны оставаться валидным JSON с
  провенансом.

### 5. Публикация

- `deploy.yml`: `validation.html` в первой `cp`-строке.
- `index.html`: ссылка в `.footer-nav` (`href="validation.html"`).
- `blog-build.js` → `renderLlms`: строка в «Основные страницы».
- `NOTICE`: пункты GPR / ACLED / CrisisWatch с URL, условиями и тем, что взято.
- `tests/seo-pages.test.js`: `validation.html` в `PAGES`; `tests/lexicon.test.js`:
  в `HTML_PAGES`.

## Швы для тестов

Минимальный набор, всё — чистые функции без сети и DOM:

1. `pearson`, `spearman`, `directionAgreement`, `leadLag` — на синтетике с известным ответом.
2. `alignWeekly` / `alignMonthly` — на синтетических снапшотах.
3. `buildValidation` — на временном каталоге фикстур (`mkdtempSync`).
4. `buildLedger` — с поддельным `gitProbe` и поддельными снапшотами.
5. `renderValidationPage` — на синтетических `validation`/`ledger`: экранирование,
   отсутствие `<script>`, наличие якорей.
6. `writeValidation` — детерминизм: повторная запись даёт те же байты.

## Что построили таски

_(заполняется по ходу сборки)_
