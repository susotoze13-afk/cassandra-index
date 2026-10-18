# Границы и правила проекта

## Правила проекта (из `carried.md` «Договорились» — исполнитель их не пересматривает)

- Калибровка severity оценивается по реальной цепочке недель, а не по якорям
  (у якорей нет `events[]` — этот прогон добавляет их только там, где значение
  воспроизводится точно).
- Грид severity — «сдвиги соседних пар ±20 %, маленькая сетка», не скалярный множитель.
- Выбранный набор применяется в `PARAMS.severityValues`; базовый при отрыве < 5 п.п. остаётся.
- Защита 2.0 в кандидатах обязательна (flash-триггеры D1.4/D2.4).
- Пуш в master — за пользователем; **в этом прогоне пользователь поручил выкат оркестратору**
  (R02). Исполнители не коммитят и не пушут — коммит делает оркестратор.
- Числа опубликованных недель не меняются: правка источников и якорей не сдвигает
  `index`/`delta`/`q` (пины `tests/data.test.js`, `tests/sensitivity.test.js`).

## Правила репозитория (из `AGENTS.md`, обязательны)

- Ноль зависимостей: только stdlib Node / браузер; всё ESM (кроме `build.js`).
- Вся пользовательская строка — только через `js/i18n.js`; DOM только через
  `document.createElement` + `textContent`.
- Цвета — только токены `css/styles.css`; a11y: контраст ≥4.5:1, видимый фокус.
- После ЛЮБОЙ правки `js/**` — `node build.js`, бандлы коммитятся.
- Тесты: `node --test` из корня без аргументов.
- `data/<неделя>/week.js` — производная, руками не править.

## Границы, решённые в спецификации

### `calc/quotes.js` (новый, чистый модуль)

- **Владеет:** формой цитаты и её дословной проверкой; лимитами.
- **Отдаёт:**
  - `QUOTE_MAX_LEN = 1200`, `QUOTES_PER_SOURCE_MAX = 12`
  - `validateQuotes(sources, criteriaIds) -> errors[]` — форма: `quotes` массив (если есть),
    каждый элемент `{criterion, text}`, `criterion` ∈ `criteriaIds`, `text` непустая строка
    в лимите, число цитат ≤ лимита.
  - `verifyQuotes(sources, corpusDir, opts) -> {checked, ok, skipped, mismatched, errors}`
    — для каждой цитаты читает `<corpusDir>/<id>.txt`; файла нет → `skipped` + ошибка
    «корпус не найден»; текст не найден дословно → `mismatched` + ошибка с id и критерием.
- **Скрывает:** нормализацию — импортирует `normalizeText`/`quoteFound` из `calc/classify.js`,
  второй реализации не заводит.
- **Не знает:** про диск недель, про публикацию, про сайт.

### `calc/calc.js` (точка сборки)

- **Владеет:** вызовом проверок до записи; сообщениями об ошибке в стиле `validateInputSources`.
- **Отдаёт:** `validateInputSources` получает ветку `quotes`; `runWeek`/`writeWeek` — вызов
  `verifyQuotes` рядом с существующими воротами, до записи на диск.
- **Скрывает:** как именно ищется цитата (это `quotes.js`).

### `js/data.js` (контракт снапшота)

- **Владеет:** `isSource`; опциональная проверка `quotes` (массив объектов `{criterion, text}`,
  строки непустые). Отсутствие поля — валидно.
- **Не меняет:** `validate`/`validateQuality` в остальном; лимитов длины на сайте нет.

### `js/sections/drivers.js` (показ)

- **Владеет:** рендером записи источника и цитаты.
- **Отдаёт чистые швы:**
  - `quoteLookup(snapshot) -> Map<url, Array<{criterion, text}>>` — из `snapshot.sources`;
  - `quotesFor(source, lookup) -> Array<{criterion, text}>` — пустой массив, если нет;
  - `buildSourceItem(lang, src, quotes)` — третий аргумент опциональный; блок цитаты
    (`<p class="driver-source-quote">`) с подписью `sources.quote.label` и id критерия.
- **Скрывает:** DOM-сборку аккордеона. Регионы (`js/sections/regions.js`) используют тот же
  строитель и получают цитаты так же.

### `js/sections/trust.js` (счётчик)

- **Владеет:** `trustFacts` — добавляет `quoted: {count, total}` (источники с ≥1 цитатой).
- **Отдаёт:** `factsLine` не меняется (ровно 5 фактов); `buildDetails` добавляет строку
  `trust.details.quotes`.
- **Не знает:** как цитата рендерится.

### `js/i18n.js`

- Новые ключи: `sources.quote.label` («Цитата»), `trust.details.quotes`
  («С цитатой: {n} из {total}»). Только RU-словарь.

### `calc/input/anchors/*.json`

- `events[]` добавляются только при точном равенстве `min(1, Σsev/5) === value`
  (`capCount = 5`), веса из `PARAMS.severityValues`; ordinal-критерии (Д4/esc, D4.6)
  и `value: 0` не трогаются.

### `docs/adr/0039-*.md`

- Новый ADR по формату 0037/0038: `sens` как метрика выбора severity-набора,
  вынос шага недели в `calc/week-step.js`.

## Швы для тестов (минимум)

1. `calc/quotes.js` — `validateQuotes`/`verifyQuotes` на синтетике и на временном корпусе
   (без сети).
2. `js/data.js` — `isSource`/`validate` с `quotes` и без.
3. `js/sections/drivers.js` — `quoteLookup`/`quotesFor` (чистые).
4. `js/sections/trust.js` — `trustFacts.quoted`.
5. `tests/sources-schema.test.js` — обновлённый список полей источника.

## Как проверять (обязательно для каждого исполнителя)

- Всё: `node --test` из корня репозитория, без аргументов (форма `node --test tests/`
  падает на Windows). Один файл: `node --test tests/<имя>.test.js`.
- После любой правки `js/**`: `node build.js` — бандлы `js/bundle.js` и `js/bundle-privacy.js`
  коммитятся вместе с исходниками; тесты идут против исходников, не бандла.
- Расчёт: `node calc/calc.js <неделя>` — только печать; `--write` пишет на диск и требует
  сети (ворота ссылок). Для 09-20/09-27 запись — `node calc/calc.js --write 2026-09-20 2026-09-27`.
- Калибровка: `node calc/calibrate.js` (сравнивать вывод до и после правки якорей).
- Не трогать: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`, `METHODOLOGY.md`,
  `.autopilot/` (кроме своего тикета), `data/<неделя>/week.js` руками.
- Не коммитить и не пушить: коммит делает оркестратор после приёмки тикета.
