<!-- autopilot:start -->
# Cassandra Index

Публичный еженедельный сервис: уровень и направление риска глобального конфликта
по открытым данным. Две половины репо: сайт (статика, `index.html` + `js/` + `data/`)
и расчётный пайплайн (`calc/`: входные сигналы → детерминированный движок → снапшоты
в `data/`). Не предсказывает дату войны и не является вероятностью войны.
Стек: чистый HTML/CSS/JS, ноль зависимостей; Node ≥ 18; всё — ESM, кроме CommonJS `build.js`.

## Команды

| Что | Команда |
|---|---|
| Тесты (все) | `node --test` — из корня, без аргументов (форма `node --test tests/` падает на Windows/Node 24) |
| Один тест-файл | `node --test tests/<имя>.test.js` |
| Сборка бандла | `node build.js` — обязателен после ЛЮБОЙ правки `js/**`; бандлы коммитятся |
| Расчёт недели | `node calc/calc.js <неделя>` — только печать; `node calc/calc.js --write [неделя …]` — запись в `data/` (без недели — вся цепочка 08-30 → 09-06 → 09-13) |
| Калибровка k | `node calc/calibrate.js` — сетка k, выбор, verify-якоря, чувствительность ±20 % |
| Проверка ссылок источников | `node calc/check-sources.js [недели…]` — работоспособность ссылок-источников опубликованных снапшотов (код 1 при битых; 403 = заблокирована, не битая) |
| Сайт | открыть `index.html` (работает с `file://`, подключены бандлы) или любой статический сервер |

## Публикация

- Выкат — GitHub Actions `.github/workflows/deploy.yml` на push в `master`; публикуется
  только `index.html`, `privacy.html`, `css/`, `js/`, `data/` — остальное наружу не уходит.
- Пуш в master = автоматический выкат; коммитить только готовое к публикации, пуш — за оркестратором.
- Обновление недели: вход `calc/input/<дата>.json` → `node calc/calc.js --write <дата>` →
  `node build.js` → `node --test` зелёный → commit (push — оркестратору).
- URL: `https://susotoze13-afk.github.io/cassandra-index/` (репозиторий `susotoze13-afk/cassandra-index`, public).

## Структура

```
index.html                единственная страница; RU-разметка hero в HTML
privacy.html              политика приватности
css/styles.css            все токены палитры и стили
js/                       сайт: app (оркестрация), data (контракт снапшотов), i18n, risk,
                          region, render, sections/* (7 секций), share, demo, ui
calc/engine.js            ядро формул: скор драйвера (§4.2), короборация Д9 (§4.3),
                          глобальная агрегация §5 (шаги 1–8), инерция и Structural
                          Break Override (§5.4), региональная модель (§7), validate входов
calc/params.js            PARAMS — единственный источник численных параметров (k = 1.95)
calc/calc.js              CLI прогона недели; маппинг входа → драйверы через buildDrivers
calc/calibrate.js         калибровка k на якорях: buildDrivers, runAnchor, evaluateGrid, selectK, sensitivity
calc/input/<неделя>.json  входные сигналы недели (45 критериев D1..D9, null = непокрыт)
calc/input/anchors/       6 модельных якорных профилей §9 (4 select + 2 verify)
data/<YYYY-MM-DD>/        снапшоты: global/regions/region-*/trend/drivers/sources (.js в window.CI_DATA)
data/latest.js            CI_WEEKS + CI_LATEST + document.write-загрузка снапшотов
docs/calibration-journal.md  аудиторский след калибровки k (2026-09-21)
tests/*.test.js           20 файлов, node --test
build.js                  CommonJS-сборщик ESM js/** → classic scripts js/bundle*.js
design/cassandra-index.pen макет pen.dev (текстовый JSON), читается tests/pen.test.js
```

## Ключевые файлы

- `calc/engine.js` — чистые функции методологии: `driverScore`, `d8Strength`, `aggregateD9`,
  `aggregateDrivers` (→ `{index, state, delta, internal, q, parts, structuralBreak}`),
  `applyInertia`, `detectStructuralBreak`, `regionalIndex`, `stateOf`, константы
  `CRITERIA` (45), `D9_SUBGROUPS` (8), `validate(input) -> errors[]`. Округление только
  на выходе; внутренние float течёт в инерцию следующей недели.
- `calc/params.js` — `PARAMS` + `list()` (глубокая копия). Все числа здесь; engine
  только подставляет их как дефолты. k = 1.95 — калиброван на якорях (журнал).
- `calc/calibrate.js` — единственный шов маппинга входа → драйверы: `buildDrivers(input, params)`
  (используют и calibrate, и calc.js; в calc.js не дублируется).
- `calc/calc.js` — цепочка RECALC_WEEKS = ['2026-08-30','2026-09-06','2026-09-13'], старт
  от опубликованного PREV_WEEK = '2026-08-23'; самопроверка записи через `validate` из js/data.js.
- `js/data.js` — контракт снапшотов: `validate` (ровно 3 драйвера, trend ровно 12 точек,
  6 регионов из `REGION_IDS`), `week/latest/listWeeks`; битый снапшот → `unavailable` + событие.
- `build.js` — свой мини-бандлер: топосорт, namespace `window.CI`, входы js/app.js+js/share.js
  и js/i18n.js+js/ui.js; неподдержанные формы import/export — ошибка сборки.

## Архитектура

- Поток данных расчёта: `calc/input/<week>.json` → `validate` → `buildDrivers` →
  `aggregateDrivers` (ctx: prevInternal/prevPublished/structuralBreak) → `calc.js --write`
  перезаписывает числовые файлы `data/<week>/` (global/regions/region-*/trend);
  защищённые поля (drivers/sources/published/through/methodology) неизменны.
- Поток данных сайта: `data/latest.js` синхронно кладёт снапшоты в `window.CI_DATA`
  (document.write — fetch на file:// невозможен) → `js/app.js` init → `render.renderAll`
  по 7 зарегистрированным секциям. Сайт не знает про calc/ — читает только data/.
- События document: `ci:ready`, `ci:datastate`, `ci:regionchange`, `ci:demo`.
- Шов для тестов — ровно один: чистые функции `calc/engine.js` + `validate` входов
  (и прежние чистые модули сайта: i18n, risk, region, data). CLI — тонкая обвязка.

## Соглашения кода

- Ноль зависимостей: только stdlib Node / браузер; любой импорт npm/CDN — ошибка. Всё ESM.
- Вся пользовательская строка — только через словарь `js/i18n.js` (data-i18n,
  data-i18n-aria, data-i18n-placeholder; плюрализация RU; даты через Intl).
- DOM только через `document.createElement` + `textContent` — никакого innerHTML со строками.
- Цвета — только CSS-токены из `css/styles.css`; тон статуса — `risk.tone` (--state-*).
- a11y: видимый фокус 2px #58A6FF, контраст ≥4.5:1, touch ≥44px, reflow 320px,
  prefers-reduced-motion, значения не цветом, aria-live — `[data-role="a11y-live"]`.
- Лексика: нет слов из Avoid-списка PRD §11.5, фраз «на пороге/на грани» и метафоры часов.
- Не трогать: `cassandra-index-prototype.html` (read-only), `PRD_Casandra_Index.md`,
  `METHODOLOGY.md`, `.autopilot/`.

## Подводные камни

- `data/latest.js` грузит через `document.write` — единственный способ без fetch на file://,
  не баг и не удалять. Новая неделя = вход в `calc/input/` + запись через calc.js.
- Страницы грузят СОБРАННЫЕ `js/bundle.js`/`js/bundle-privacy.js`, а не ES-модули (CORS на file://).
  После правки `js/**` обязателен `node build.js` — иначе коммиченный бандл молча останется
  старым. bundle руками не править; тесты идут против исходников.
- Недели 08-02…08-23 в `data/` — непересчитываемая демо-история; calc.js откажется
  считать неделю вне RECALC_WEEKS.
- Демо-снапшоты 08-30/09-06/09-13 побайтово идентичны по наблюдениям (D01) — driverConfidence
  у всех трёх одинакова, поэтому. trend-хвосты ручных неделей не равны их global.js
  (демо-данные противоречивы: у 08-23 опубликован 61, в trend-хвосте 67).
- Пересчитанные значения 60/58/57 ниже ручных 63/66/72 — корректный эффект q-сжатия
  при покрытии 5/45 критериев, не баг.
- `calc.js` звёт `engine.regionalIndex` даже для слепых регионов (nReg=0 →
  background, I_region = I_global) — региональная ветка движка не дублируется.
- `calc.js --write` самопроверку делает ДО записи: снапшот собирается в памяти
  и гоняется через `validate` из js/data.js; при провале диск не трогается.
- Отступления, сознательно зафиксированные в коде: порог 50 % не применяется к подгруппам
  Д9 (null только при 0 покрытых); единственная изолированная циклическая подгруппа Д9 →
  corr 0.5; лимит 30 % Д9 — закрытая форма относительно прогона без Д9; персистентность
  Structural Break Override (2 недели) — состояние цикла несёт calc.js через ctx.
- Д9 не может иметь уверенность high без прямого подтверждения (§4.3.1) — validate режет.
- Пересохранение `design/cassandra-index.pen` в pen.dev перезаписывает `"version"` →
  ломает `tests/pen.test.js` (жёстко ожидает текущую версию).
- Все демо-снапшоты имеют `methodology: "1.0"` — строка о смене версии в UI покрыта
  тестом, но на демо-данных не проявляется.
- `js/share.js`: `share.announce` берёт язык из localStorage на момент клика, не из appState.
- Тренд: 12 точек на ширину экрана физически не дают hit-target 44px каждая (r=20 SVG).
- Workflow не включает Pages сам: в НОВОМ репозитории нужен одноразовый шаг
  (`gh api repos/<владелец>/<repo>/pages -X POST -f build_type=workflow`), иначе выкат
  молча не публикуется.
- `.autopilot/sync.py` требует `PYTHONUTF8=1` на Windows (cp1252 падает на печати).
- Отсутствующая возможность — не повод ставить пакет: возвращай BLOCKED с описанием,
  оркестратор решит.

## Окружение

Секретов, конфигов и переменных окружения нет — репозиторий полностью статический.

## Тесты

`node --test` без аргументов (20 файлов, 151 passed / 0 fail — подтверждено оркестратором).
Один файл: `node --test tests/<имя>.test.js`. Покрыты только чистые модули без DOM;
тест-фреймворков нет. Расчётное ядро: `tests/calc-engine.test.js` (56 тестов),
`tests/calibrate.test.js`; контракт данных: `tests/data.test.js`.

## Как здесь работает Autopilot

Сборка ведётся навыком `/autopilot`. Требования, спецификация и таски — в `.autopilot/`.
Прогресс — `.autopilot/dashboard.html`. Правило: требование из `manifest.md`
может снять только пользователь.

Если работа продолжается — скажи «продолжи автопилот»: состояние поднимется
из `.autopilot/state.js`, переспрашивать ничего не нужно.
<!-- autopilot:end -->
