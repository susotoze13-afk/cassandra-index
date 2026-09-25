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
| Проверка ссылок источников | `node calc/check-sources.js [недели…]` — перепроверка ссылок опубликованных снапшотов; без аргументов — все недели `data/`. Код выхода 1 при битых; 403/406/нет-ответа = заблокирована, не битая |
| Сайт | открыть `index.html` (работает с `file://`, подключены бандлы) или любой статический сервер |

`node calc/calc.js --write` требует сети: перед записью собранный снапшот гоняется
через linkcheck (ворота R03) — хотя бы один битый URL → запись отклонена, диск не тронут.

## Публикация

- Выкат — GitHub Actions `.github/workflows/deploy.yml` на push в `master`; публикуется
  только `index.html`, `privacy.html`, `css/`, `js/`, `data/` — остальное наружу не уходит.
- Пуш в master = автоматический выкат; коммитить только готовое к публикации, коммит и пуш — только за оркестратором (агенты-исполнители НЕ коммитят — был инцидент).
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
calc/calc.js              CLI прогона недели; маппинг входа → драйверы через buildDrivers;
                          ворота ссылок (linkcheck) перед --write; validateInputSources (R55)
calc/linkcheck.js         чистый модуль проверки URL: classify(status) → ok|blocked|broken,
                          checkUrl (ретраи на 429/406/5xx, таймаут 10 c, браузерные
                          заголовки), checkSources (последовательный обход)
calc/check-sources.js     CLI перепроверки ссылок всех/перечисленных недель поверх calc.js
calc/calibrate.js         калибровка k на якорях: buildDrivers, runAnchor, evaluateGrid, selectK, sensitivity
calc/audit.js             append в data/audit.jsonl (recalc/flash, R35–R37/R16–R19)
calc/input/<неделя>.json  входные сигналы недели (45 критериев D1..D9, null = непокрыт,
                          опционально sources по R55)
calc/input/anchors/       6 модельных якорных профилей §9 (4 select + 2 verify)
data/<YYYY-MM-DD>/        снапшоты 08-02…09-13 (7 недель): global/regions/region-*/
                          trend/drivers/sources (.js в window.CI_DATA)
data/latest.js            CI_WEEKS + CI_LATEST + document.write-загрузка снапшотов
data/audit.jsonl          журнал аудита пересчётов и flash-срабатываний
docs/calibration-journal.md  аудиторский след калибровки k (2026-09-21)
tests/*.test.js           25 файлов, node --test (в т.ч. linkcheck, sources-schema)
build.js                  CommonJS-сборщик ESM js/** → classic scripts js/bundle*.js
design/cassandra-index.pen макет pen.dev (текстовый JSON), читается tests/pen.test.js
```

## Ключевые файлы

- `calc/engine.js` — чистые функции методологии: `driverScore`, `d8Strength`, `aggregateD9`,
  `aggregateDrivers` (→ `{index, state, delta, internal, q, parts, structuralBreak}`),
  `applyInertia`, `detectStructuralBreak`, `detectFlashTriggers`, `regionalIndex`, `stateOf`,
  константы `CRITERIA` (45), `D9_SUBGROUPS` (8), `validate(input) -> errors[]`. Округление только
  на выходе; внутренние float течёт в инерцию следующей недели.
- `calc/params.js` — `PARAMS` + `list()` (глубокая копия). Все числа здесь; engine
  только подставляет их как дефолты. k = 1.95 — калиброван на якорях (журнал).
- `calc/calibrate.js` — единственный шов маппинга входа → драйверы: `buildDrivers(input, params)`
  (используют и calibrate, и calc.js; в calc.js не дублируется).
- `calc/linkcheck.js` — чистый модуль: `classify` (2xx/3xx → ok; 403/406/null → blocked;
  404/410/прочее → broken), `checkUrl` (fetchImpl прокидывается снаружи — шов тестов,
  ретраи 2 попытки с паузой 1 c, AbortController на 10 c, браузерный User-Agent),
  `checkSources(items: {url, where})` → `{checked, ok, broken, blocked}`; ворота падают
  только по broken, blocked — предупреждение. Проверка последовательная — не долбить сайты.
- `calc/calc.js` — цепочка RECALC_WEEKS = ['2026-08-30','2026-09-06','2026-09-13'], старт
  от опубликованного PREV_WEEK = '2026-08-23'; переиспользуемые швы: `loadSnapshotPart`
  (чтение .js-снапшотов через vm, без DOM), `collectSourceItems` (дедуп URL из top-level
  sources/drivers/regions), `classifyPublication` (R11–R15), `nextChainState`,
  `validateInputSources` (строгая схема R55, cluster_id по whitelist PARAMS.clusters).
- `calc/check-sources.js` — CLI поверх `loadSnapshotPart`/`collectSourceItems`/`checkSources`;
  построчный отчёт ок/БИТАЯ/ЗАБЛОКИРОВАНА по каждому URL, итог, код 1 при битых.
- `js/data.js` — контракт снапшотов: `validate` (published/through/methodology, dataState
  из DATA_STATES, global:null только при insufficient/unavailable, regions по REGION_IDS
  (6), trend ровно 12 точек (value:null только с methodology), ровно 3 драйвера,
  источники по isSource), `validateQuality` (q/nullWeight/confidence/coverage/preview/
  recalc, неделя insufficient обязана нести полный пакет непубликации);
  `week/latest/listWeeks`; битый снапшот → `unavailable` + событие.
- `build.js` — свой мини-бандлер: топосорт, namespace `window.CI`, входы js/app.js+js/share.js
  и js/i18n.js+js/ui.js; неподдержанные формы import/export — ошибка сборки.

## Архитектура

- Поток данных расчёта: `calc/input/<week>.json` → `validate` + `validateInputSources`
  (если вход несёт sources, R55) → `buildDrivers` → `aggregateDrivers` (ctx: prevInternal/
  prevPublished/structuralBreak) → классификация публикации → ворота ссылок
  (collectSourceItems + linkcheck, раньше контрактной самопроверки) → `validate` из
  js/data.js → запись числовых файлов `data/<week>/` (global/regions/region-*/trend,
  плюс sources.js если вход нёс sources); защищённые поля (published/through/methodology)
  неизменны; после записи — append в data/audit.jsonl (recalc, flash).
- Поток данных сайта: `data/latest.js` синхронно кладёт снапшоты в `window.CI_DATA`
  (document.write — fetch на file:// невозможен) → `js/app.js` init → `render.renderAll`
  по 7 зарегистрированным секциям. Сайт не знает про calc/ — читает только data/.
- События document: `ci:ready`, `ci:datastate`, `ci:regionchange`, `ci:demo`.
- Шов для тестов — чистые функции: `calc/engine.js`, `calc/linkcheck.js` (поддельный
  fetchImpl, без сети), `validateInputSources`/`collectSourceItems`/`classifyPublication`/
  `nextChainState` из calc.js (синтетические данные) + чистые модули сайта (i18n, risk,
  region, data). CLI — тонкая обвязка.
- Схема источника R55 (во всех 7 неделях, включая региональные drivers): id,
  title{ru,en}, domain, url, publication_date, accessed_date, source_type
  (primary|secondary|OSINT), cluster_id (whitelist из PARAMS.clusters),
  state_affiliated:boolean + опциональные author/archive_url/archive_date/confidence/
  notes. data.js принимает и легаси-схему (скалярная date) для обратной совместимости.

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

- Коммит и push — только оркестратор. Исполнитель-агент, закоммитивший сам, — инцидент;
  правки остаются рабочим деревом.
- Сеть из среды проверки небезупречна: DNS не резолвит www.bbc.com/www.dw.com (проверять
  извне, curl --resolve); apnews/crisisgroup/iaea — Cloudflare 403 на bot-запросы
  (classify → blocked, не битые); reliefweb — интермитентный 406 (ретраится, финальный
  → blocked). blocked не роняет ворота и check-sources.
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
- `calc.js --write` пишет ДВА ворот до диска: сначала ссылки (любой broken → отказ,
  blocked — только предупреждение), затем контракт `validate` из js/data.js; при
  провале любого из них диск не тронут.
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
Для проверки ссылок нужна сеть; без неё `calc.js --write` и `check-sources.js`
массово уйдут в blocked (null → blocked), что ворота не блокирует, но отчёт раздувает.

## Тесты

`node --test` без аргументов (25 файлов, 241 passed / 0 fail — подтверждено оркестратором).
Один файл: `node --test tests/<имя>.test.js`. Покрыты только чистые модули без DOM,
тест-фреймворков нет. Расчётное ядро: `tests/calc-engine.test.js`; калибровка:
`tests/calibrate.test.js`; ссылки: `tests/linkcheck.test.js` (15 тестов, поддельный
fetchImpl, без сети); контракт данных и схема источников R55: `tests/data.test.js`,
`tests/sources-schema.test.js`; шов insufficient-публикации (classifyPublication,
nextChainState): `tests/insufficient.test.js`. Аудит: `tests/audit.test.js`.

## Как здесь работает Autopilot

Сборка ведётся навыком `/autopilot`. Требования, спецификация и таски — в `.autopilot/`.
Прогресс — `.autopilot/dashboard.html`. Правило: требование из `manifest.md`
может снять только пользователь.

Если работа продолжается — скажи «продолжи автопилот»: состояние поднимется
из `.autopilot/state.js`, переспрашивать ничего не нужно.
<!-- autopilot:end -->
