# Границы и швы — precursor-and-scale

## Границы, решённые в спецификации

### `calc/precursor.js` (новый, чистый модуль)

- **Владеет:** единственным правилом «как из драйверов получается публичный слой Д9».
- **Отдаёт:** `precursorOf(drivers) → {value: int 0..100, signalingSubgroups: int 0..8} | null`.
  `null`, если драйвера `D9` нет, `score` не число или `signalingSubgroups` не число.
  Округление — `Math.round(score * 100)`, кламп 0..100.
- **Скрывает:** как считается `score` (это `aggregateD9` в `calc/engine.js`); модуль не
  трогает `U`, `U_raw`, `q`, инерцию.
- **Шов теста:** сама `precursorOf` — на синтетических драйверах, без диска.

### `calc/forward-anchors.js` (новый, чистый модуль)

- **Владеет:** схемой форвардного якоря и её проверкой.
- **Отдаёт:**
  - `CLUSTERS = ['calm','tense','danger','very','critical','extreme','unknown']`
    (идентификаторы — из `js/risk.js`, шестое состояние 97–100 включается; `unknown` —
    честный отказ редактора);
  - `validateForwardAnchor(obj) → errors[]` (пусто = валиден). Проверяет: `week` — дата
    `YYYY-MM-DD`; `expectedCluster` из `CLUSTERS`; `rationale` — непустая строка (для
    `unknown` обязана быть); `author` — непустая строка; `committedAt` — ISO-дата;
    `sources` — массив объектов с непустым `url` строкой (может быть пустым массивом).
- **Скрывает:** ничего; сети и диска нет.
- **Шов теста:** `validateForwardAnchor` + `CLUSTERS`.

### `calc/calibrate.js` (правка одной функции)

- `loadAnchors(dir)` пропускает файлы, где `input.anchor` отсутствует или не объект.
  Причина: форвардные файлы лежат в том же каталоге по требованию R15.
- **Не меняет:** формат существующих якорей, `evaluateGrid`, `selectK`, CLI-вывод.

### `calc/calc.js` (точки записи)

- `runWeek` кладёт `precursor` в результат (рядом с `sensitivity`).
- `writeWeek` добавляет поле в `meta` **и** в `full`; `renderGlobal` пишет его в `global.js`
  условно (`if (meta.precursor)`), чтобы старые снапшоты и паритет не менялись.
- **Скрывает:** решение «скрывать блок на неделе без поля» — это сайт.

### `js/data.js` (контракт)

- `validateQuality` принимает `precursor` опционально:
  `{value: int 0..100, signalingSubgroups: int 0..8}`; лишние ключи игнорируются,
  битая форма — ошибка контракта. Отсутствие поля валидно.

### `js/sections/precursor.js` (новый, сайт)

- **Владеет:** отображением слоя.
- **Отдаёт:** `PRECURSOR_SUBGROUPS = 8`; `precursorFacts(snapshot) → {value, signaling, total} | null`
  (`null` без `global`, без поля, при битой форме или `dataState !== 'published'`); `render(appState)`.
- **Скрывает:** i18n-тексты (ключи `precursor.*`), верстку.
- **Шов теста:** `precursorFacts` — на синтетических снапшотах; `PRECURSOR_SUBGROUPS`
  пинится против `D9_SUBGROUPS.length` из `calc/engine.js`.

### `js/render.js` + `index.html` + `css/styles.css`

- `SECTIONS`: `'precursor'` между `'hero'` и `'trust'`; `registerSection('precursor', …)`.
- Хост: `<div class="section-body" data-section="precursor">` внутри
  `<section class="section precursor-section">` между hero (строка 112) и trust (116).
- CSS: только существующие токены; классы `.precursor-section`, `.precursor-row`,
  `.precursor-value`, `.precursor-note`. Без `--state-*`.

### `js/i18n.js`

- Ключи: `precursor.title`, `precursor.value`, `precursor.signals` (плюрализация RU),
  `precursor.none`, `precursor.note`, `method.scale.intro` (абзац про шкалу).
- Плейсхолдеры: `precursor.value` — `{value}`, `precursor.signals` — `{n}`.
- Тесты: `tests/precursor.test.js` assert-ит наличие ключей и отсутствие цифр в
  `precursor.note`.

### `docs/calibration-journal.md`, `METHODOLOGY.md`, `docs/adr/0047-*.md`

- Журнал: новый `#`-раздел после строки 397 + одна ссылка из «Результат прогона».
- METHODOLOGY: одна сноска в §1.1 после существующей сноски про перцентиль; §4.3.6
  не переписывается.
- ADR 0047: формат 0045, порядок «Контекст → Решение → Почему → Последствия → План».

### `calc/input/anchors/forward-<week>.json` (данные, не код)

- Пишет человек (редактор), не пайплайн. Прогон создаёт только валидатор и тест.
- Файл коммитится до `--write` недели; `calc/calibrate.js` его игнорирует.

## Правила проекта (из `carried.md`, дословно)

- Цитаты живут полем `quotes: [{criterion, text}]` в записи источника R55; опционально.
- Публикуются цитаты только там, где есть корпус текстов: сейчас это 09-20 (8 источников)
  и 09-27 (6 источников, 7 цитат); у остальных недель цитат нет — не выдумывать.
- Цитата принимается только дословная: проверка против `calc/input/drafts/texts-<неделя>/`
  на записи недели; нет корпуса — запись отклоняется (ADR 0042).
- `events[]` в якорях — только при точном воспроизведении значения: 93 счётных критерия;
  0/0.33/0.67 и binary/ordinal остаются на `value` (ADR 0043). Числа опубликованных
  недель не меняются — «Без сдвига чисел».
- Скалярная/ковариационная калибровка k×severity — вне рамок, слова пользователя
  «Без k×severity».
- Выкат этого прогона делал оркестратор по поручению пользователя («выкатить на пром»);
  дальше пуш в master — снова за пользователем.

## Правила проекта для исполнителей

- Стек: Node ≥ 18, ноль зависимостей, ESM; браузерный код — classic-скрипты через `build.js`.
- Проверка одной командой: `node --test` (из корня, без аргументов; форма `node --test tests/`
  падает на Windows/Node 24). Один файл: `node --test tests/<имя>.test.js`.
- После любой правки `js/**` обязателен `node build.js`; бандлы коммитятся, руками не правятся.
  Тесты идут против исходников.
- Не трогать: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`, `METHODOLOGY.md`
  (кроме точечной сноски §1.1 в таске 01), `.autopilot/`, чужие незакоммиченные правки.
- Тексты — только через `js/i18n.js`, RU-only; DOM — `createElement` + `textContent`;
  цвета — только токены `css/styles.css`; без innerHTML со строками (исключение —
  `js/sections/methodology.js`, существующее).
- Числа опубликованных недель не меняются: `data/` в этом прогоне не перезаписывается.
- Коммит и пуш — только оркестратор; исполнитель оставляет рабочее дерево.

## Что уже построено прошлыми тикетами (обновляется исполнителями)

- Пока пусто: тикеты этого прогона ещё не начаты.
