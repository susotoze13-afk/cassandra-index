# Разведка 13 известных багов — notes (2026-10-24)

Референс-коммиты прогона regional-iwith-degeneracy: **bc35393** (T01, основная
реализация) и **0921db8** (F1, пины). Оба уже в master (HEAD = 6cac58a).

## 1. params.js:60 — оборванный комментарий → УЖЕ ИСПРАВЛЕНО

- **Состояние:** `calc/params.js:58-61` — фраза завершена: «…(forward-only,
  прецедент independenceGateFrom). Методология не растёт: сдвигается только
  граница применения правила.» Именно это дозаписал F1 (0921db8): заменил
  оборванное «…independenceGateFrom); breaking» на полное предложение.
- **Вывод:** пункт закрыт, правка не нужна. Не переоткрывать.

## 2. tests/regional-hypothesis.test.js:60 — «эпсилон» при подмене 0.42 → УЖЕ ИСПРАВЛЕНО

- **Состояние:** оба замечания закрыты F1 (0921db8, +48 строк в файле):
  - Тест «…неделя на дате гейта и позже — эпсилон» (строка 60) теперь задаёт
    `p.regionHypothesisThreshold = 0.42` (строка 65) с комментарием
    «проверяется чтение параметра, а не совпадение результата с самим собой».
  - Тест «пустая дата гейта» (строка 42-51) тоже использует 0.42 (строка 47).
  - Плюс добавлены тесты на неделю раньше гейта (53-58) и реальный вход 10-18
    (75-101) и production-передача computeWeek (108-129).
- **Вывод:** закрыто, не трогать. Название теста на строке 60 оставлено
  намеренно («эпсилон» = смысл правила; число подменено, чтобы ловить литерал).

## 3. Ссылки «коммит autopilot-прогона 2026-10-24» без хеша

Два места:
- `docs/preproduction-decisions.md:65` — строка решённого вопроса O10:
  «…исследование — docs/regional-iwith-degeneracy.md; коммит autopilot-прогона
  2026-10-24». Относится к реализации варианта E = **bc35393** (T01; именно он
  добавил engine.js/params.js/week-step.js и саму строку O10). Можно указать
  оба хеша: `bc35393` (+доработка `0921db8`).
- `docs/regional-iwith-degeneracy.md:9` — «Коммит — autopilot-прогон
  2026-10-24.» Документ создан в bc35393; F1 (0921db8) правил в нём только
  номера строк engine.js (:602→:621, :649→:670). Ссылка «появления» документа
  = **bc35393**.
- **Поверхность:** только эти два .md. Тестов-пинов на хеш нет. Формат:
  «коммит bc35393 (autopilot-прогон regional-iwith-degeneracy, 2026-10-24)».

## 4. docs/api.md — лишнее поле methodology у index.json

- **Факт:** `buildDataset` (calc/public-export.js:181-210) возвращает конверт
  `{schema, schema_version, site, license, weeks}` — верхнеуровневого
  `methodology` НЕТ. На диске подтверждено: ключи index.json =
  `['schema','schema_version','site','license','weeks']`. Схема
  `INDEX_SCHEMA` (calc/public-contract.js:468-472, через `envelopeSchema` с
  `additionalProperties: false`) тоже его не допускает.
- **Ошибка в доке:** `docs/api.md:60` — таблица версионирования:
  «| `methodology` | `index.json`, `methodology.json`, `week.methodology` |».
  Убрать `index.json` (methodology есть у `validation.json` —
  calc/backtest.js:512 — и у `methodology.json`, и у объекта недели).
  Заодно проверить формулировку `docs/api.md:10` («`methodology` в файлах и в
  `methodology.json`») — расплывчато, но не ложно.
- **Тесты:** сторож на схему (tests/public-contract.test.js:373-389) уже пинит
  отсутствие поля фактически (additionalProperties:false). Отдельного пина
  «docs не врёт про index.json» нет — по желанию.

## 5. docs/api.md:398 — «опубликованный выпуск не переписывается»

- **Факт:** `writeDigestData` (calc/digest-export.js:110-140) пересобирает
  свежие выпуски и **перезаписывает** одноимённые: `merged.set(issue.week,
  digestFile(issue))` (строка 124) поверх прочитанного с диска (121-123).
  Архив лишь дополняется неделями вне запрошенного списка (шапка модуля,
  строки 8-9, обещает то же самое: «дополняются, а не стираются» — тоже
  неточно про перезапись запрошенной недели).
- **Правда:** «выпуск пересобирается из текущего снапшота при каждом
  `--write` по этой неделе; недели вне списка не трогаются». Это сознательная
  производность (weekly-calc.yml пересобирает дайджест каждую неделю).
- **Поверхность:** docs/api.md:398 (фраза-пин «стабилен по пути»), при
  желании комментарий calc/digest-export.js:8-9. Тест
  tests/digest.test.js — проверить, не пинит ли он старую формулировку.

## 6. docs/api.md — «до 12 записей» и невалидный JSON в примерах

- **MAX_DISCREPANCIES** объявлен в calc/backtest.js:41 (`= 12`), используется
  в `discrepanciesOf` (:442-454, `.slice(0, MAX_DISCREPANCIES)`). В docs/api.md
  дублируется числом в тексте: строка 413 «`thresholds`: …» нет; строка 438:
  «(до 12 записей)». Пина нет.
- **Примеры с «…»** (невалидный JSON, не парсится):
  docs/api.md:87 (`"note": "Атрибуция обязательна: …"`), :90
  (`{ "week": "2026-10-18", "…": "…" }`), :265-266, :283, :308, :317-319,
  :410, :418, :422, :451-452.
- **Поверхность:** только docs/api.md (+ опционально пин-тест:
  tests/public-contract.test.js или новый — что «до 12» сверено с
  MAX_DISCREPANCIES, импортируемым из calc/backtest.js).
- **Ловушка:** docs/api.md — текст контракта; сторож
  tests/public-contract.test.js:335-343 требует упоминания путей — при правках
  строки с путями не ломать шаблоны `/data/public/…`.

## 7. Сторож docs/api.md ищет путь подстрокой

- **Код:** tests/public-contract.test.js:335-343
  (`test('сторож: каждый публичный JSON упомянут в docs/api.md и имеет схему')`):
  ```js
  const url = `/data/public/${docPathFor(rel)}`;
  assert.ok(api.includes(url), `${rel}: нет строки ${url} в docs/api.md`);
  ```
  `docPathFor` (315-319) схлопывает конкретные даты в шаблоны
  (`weeks/<YYYY-MM-DD>.json`, `digest/<week>.json`); остальные пути — как есть.
- **Проблема:** `String.includes` — подстрока без границ. Ложное ПРОХОЖДЕНИЕ:
  путь засчитывается по любому упоминанию внутри чужой строки (URL с доменом
  в примерах, длинная строка, содержащая путь как подстроку). Ложная ТРЕВОГА
  маловероятна (путь либо есть, либо нет).
- **Поверхность:** tests/public-contract.test.js (усилить матч: например,
  проверять, что подстрока входит в строку таблицы эндпоинтов или отделена
  не-буквенными границами). Сторож упомянут в docs/api.md:525-526 — синхронно.

## 8. tests/public-contract.test.js — nullable-покрытие не полное

Nullable-пути схем (calc/public-contract.js), покрытые тестом
`схемы: nullable-поля допускают null` (353-371): только **digest.week**
(DIGEST_SCHEMA :675) и **validation**: `levels.pearson`, `lead_lag.best`,
`lead_lag.best_lag` (VALIDATION_SCHEMA :743-745, :823-824).

Не покрыты (все легальные null по схеме):
- **week ($defs/week, :354+):** `driver_breakdown[].score/confidence/weight/
  weight_effective` (:216-219 — DRIVER_BREAKDOWN_SCHEMA), `what_would_change.
  state` (:290), `thresholds.down/up` (:297/:305), `criteria[].driver/dir`
  (:324-325), `published/through/methodology` (:366-368), `index/delta`
  (:371-372), `state/q/confidence` (:373-375), `coverage_criteria` (:377),
  `regions[].index/delta` (:390-391), `precursor` (:397), `drivers[].label
  .ru/en` (:418), `drivers[].contribution` (:420), `waterfall` (:425),
  `what_would_change` (:426), `trend[].value` (:445).
- **validation:** `levels/deltas.spearman/p_permutation` (:744-745),
  `overlap.from/to` (:787-788), `direction.rate` (:801), `lead_lag.by_lag[]
  .pearson` (:819), `note` (:841).
- **regions:** `admin_center` (:513 — REGIONS_SCHEMA $defs.region).
- **ledger (FORECAST_LEDGER_SCHEMA :917-923):** `verified`,
  `expectedCluster/expectedDirection`, `actualIndex/actualCluster/
  actualDelta/actualDirection`, `misses[].expected/actual` (:898-899).
- **Поверхность:** tests/public-contract.test.js:353-371 (расширить тот же тест
  мутациями дисковых файлов). Сами схемы править не нужно — речь о покрытии.

## 9. calc/ledger.js — verified:null и anchorsDir

**(а) verified:null — три причины.** Поля записи: `week, kind, committedAt,
verified, expectedCluster, expectedDirection, actualIndex, actualCluster,
actualDelta, actualDirection, outcome{cluster,direction}` (editorEntry
:207-219, baselineEntry :117-129). `verified` выводится:
- baseline — всегда `true` (:121);
- editor — `fact ? gitVerified(...) : null` (:211): null при (1) неделя не
  опубликована (`publishedFact` null, :76-87), (2) gitProbe/`addedAt` вернул
  null или дата не парсится (`gitVerified` :179-189 → null).
- **Различимость без нового поля:** причина (1) даёт `outcome.cluster =
  'pending'` и `actualIndex = null`; причина (2) — разрешённый outcome
  (hit/miss) при `verified: null`. То есть причины различимы парой
  `(outcome.*, actualIndex)`. Решение «без нового поля» сводится к документированию
  этой трактовки (docs/api.md:476-477 уже частично: «null у непроверенной
  записи редактора» — можно уточнить: pending → «неделя не опубликована»,
  иначе → «git-история недоступна»). Схема меняется только текстом description.

**(б) writeLedger без anchorsDir читает боевой каталог.**
- Сигнатура: `writeLedger({rootDir, weeks, loadSnapshot, anchorsDir, gitProbe})`
  (:320-330). `buildLedger` — то же (:226-236). В обоих
  `const dir = anchorsDir || ANCHORS_DIR;` — дефолт `ANCHORS_DIR`
  (:33) = абсолютный путь `<repo>/calc/input/anchors`, вычисленный из
  расположения модуля, **не из rootDir**.
- Без anchorsDir вызывается: CLI `main()` ledger.js:359-360 (нет --root для
  anchors) и `writeValidation` calc/backtest.js:540
  (`writeLedger({rootDir: root, weeks, loadSnapshot})`). При `--root <tmp>`
  якоря читаются из боевого репо, а не `<tmp>/calc/input/anchors`.
- Тесты: tests/ledger.test.js — writeLedger-тест (:234-260) передаёт
  `anchorsDir` всегда; кейс дефолта не покрыт.
- **Фикс:** дефолт `path.join(root, 'calc', 'input', 'anchors')` (root уже
  есть в обеих функциях); пин-тест в tests/ledger.test.js: writeLedger с
  `--root`-каталогом и anchors в нём, без anchorsDir.

## 10. calc/backtest.js — ACLED 2026-10 по данным на 2026-10-09

- **Факт:** фикстура calc/backtest-fixtures/acled.json:8 — `"as_of":
  "2026-10-09"`; ряд содержит `2026-10: events 2286` (неполный месяц).
  `provenance.as_of` уходит в validation.json (comparatorOf :477-484), т.е.
  в файле дата есть, но ряд 2026-10 выглядит полным месяцем.
- **Где пометка:** поле `note` (comparatorOf :491-493) сейчас только для
  insufficient — расширить его по договорённости «новых полей нет» (note уже
  в схеме, nullable string :841). Либо печать: `comparatorLine`
  (backtest.js:564-570) + сводка в main (:572-592). Плюс docs/api.md
  (раздел validation.json :432-439 — строка про as_of).
- **Ловушка:** validation.json производный — после правки `node calc/backtest.js
  --write`; тексты docs/api.md пинит сторож по путям, не по тексту.

## 11. public-export.js — печать «водопад: нет» при верных данных

- **Строки печати:** calc/public-export.js:604-606 (--write) и :621-622
  (печать). Условие: `last.waterfall ? 'есть' : 'нет'`.
- **Почему null при верных данных:** `loadAnalysisFromDisk` (:530-563) даёт
  `waterfall: null` законно — (а) нет входа недели (демо-1.0, чужой `--root`),
  (б) первая неделя цепочки (prevWeek === '2026-08-23', входа нет), (в)
  смена methodology у prev. Печать «нет» не различает «не построился»
  (проблема) и «по правилам не строится» (норма) — вводит в заблуждение при
  прогоне с `--root` без входов.
- **Фикс:** уточнить формулировку/причину (например, «водопад: нет (нет входа
  прошлой недели / первая неделя цепочки)» — причина известна из
  loadAnalysisFromDisk). Поверхность: только main() public-export.js.

## 12. public-export.js — trend.svg одной полилинией через демо-1.0

- **Код:** `toTrendSvg` (:260-307): все числовые точки тренда складываются в
  один массив `points` (:268-284) и рисуются одним `<polyline>` (:301-302);
  заголовок :297 «индекс за 12 недель». Методология точки (`p.methodology`)
  игнорируется — демо-точки 1.0 (51/42/43/56) соединены линией с 3.0.
- **Образец решения на сайте:** js/sections/trend.js — `selectMethodology`
  (:185-…, фильтр по версии, по умолчанию '3.0'), `trendSegments` с разрывом
  `reason: 'methodology'` (:59-62), сегментная отрисовка (:281). Для SVG
  проще: либо сегменты полилинии по смене methodology (сохраняет все 12
  точек), либо фильтр 3.0 + подпись.
- **Ловушки:** trend.svg производный — после правки `node calc/public-export.js
  --write`; паритет тренда/точек пинят tests/trend.test.js и
  tests/public-contract.test.js (trend[].value nullable :445 — сегментирование
  не должно сломать схему; SVG схемой не покрыт, api.md:502).

## 13. calc/quotes.js — id источника не проверяется на путь

- **Чтение корпуса:** `verifyQuotes` → `corpusText(id)` (calc/quotes.js:82-92):
  `read(path.join(corpusDir, `${id}.txt`))`. id берётся как есть
  (`typeof s.id === 'string' ? s.id : ''`, :96); проверок формы id нет.
  `id = '../x'` → чтение вне corpusDir (path traversal, либо ложный skipped).
- **Кто ещё смотрит id:** `validateInputSources` (calc/calc.js:104-132) требует
  только non-empty string для id (:111-113) — паттерна нет. Вызов ворот:
  calc.js:434; verifyQuotes вызывается из writeWeek (calc.js:666-668, corpusDir
  = `calc/input/drafts/texts-<week>`).
- **Правило-образец:** файлы корпуса создаются как `<id>.txt`
  (tests/quotes.test.js:71-72), т.е. легальные id — плоские имена
  (`^[A-Za-z0-9_-]+$` или около того — сверить с реальными id входов 09-20/09-27).
- **Фикс:** в verifyQuotes (или validateQuotes — ворота формы) отклонять id с
  разделителями пути / не в паттерне: ошибка вида `sources[i].id: unsafe id`
  → mismatched/errors. Тест: tests/quotes.test.js — источник с id `'../secret'`
  и поддельный readText-шов, ожидается ошибка, а не чтение за пределами dir.
  Внимание: opts.readText шов уже есть (:75-77) — тест без диска.

## Общее

### Команды
- Все тесты: `node --test` (из корня, без аргументов — форма `node --test
  tests/` падает на Windows/Node 24). Один файл: `node --test tests/<имя>.test.js`.
- Производные после правок calc/: `node calc/public-export.js --write`
  (index/latest/csv/trend.svg/changelog + справочники + схемы + data/analysis.js
  + changelog.html), `node calc/backtest.js --write` (validation.json +
  validation.html + forecast-ledger.json), `node calc/digest-export.js --write`
  (digest/* + digest.html), при смене js/** — `node build.js`. Руками
  производные не править — паритет ловят tests/public-contract.test.js,
  tests/contribution-ui.test.js и др.
- Коммит/пуш — только оркестратору (AGENTS.md; агент-исполнитель не коммитит).

### Соглашения, важные для фиксов
- Ноль зависимостей, ESM (кроме CommonJS build.js); stdlib Node только.
- Производные `data/public/*`, `changelog.html`, `digest.html`,
  `data/analysis.js`, `trend.svg` — только через CLI-пересборку.
- Контракт публичного слоя (ADR 0062): новые поля в существующие файлы не
  вводим без схемы в `schemaDocs()` и строки в docs/api.md (сторож
  tests/public-contract.test.js). Пункты 6/10 — текстовые правки, поля не менять.
- Forward-only-гейты (independenceGateFrom, blindReasonFrom,
  regionHypothesisFrom и т.п.) в затронутом коде не пересматривать.
- `docs/api.md` — обязательная строка для каждого публичного пути; правки
  текста безопасны, удаление строк путей — нет.
- Пины фикстур, за которые могут зацепиться правки: tests/data.test.js
  (точные числа недель), tests/sensitivity.test.js (10-04 = 5.4),
  tests/ledger.test.js:262-291 (forecast-ledger.json: 7 baseline-записей,
  misses ≥ 1), tests/digest.test.js (sent.json v2).
- В рабочем дереве много чужих незакоммиченных правок (.autopilot/*,
  docs/articles/*) — чужое не трогать и в коммиты не брать (оркестратору).
