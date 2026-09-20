<!-- autopilot:start -->
# Cassandra Index

Публичный еженедельный сервис: уровень и направление риска глобального конфликта
на основе открытых данных. Не предсказывает дату войны и не является вероятностью
войны. Спецификация — `PRD_Casandra_Index.md` (v1.3). Стек: чистый HTML/CSS/JS,
ноль зависимостей и runtime-библиотек; графика — инлайн-SVG из данных; Node ≥ 18.

## Команды

- Тесты: `node --test` (без аргументов) — 91 passed / 0 fail, подтверждено оркестратором.
  Форма `node --test tests/` падает на Windows/Node 24; один файл: `node --test tests/<имя>.test.js`.
- Сборка бандла: `node build.js` — пересобирает `js/bundle.js` и `js/bundle-privacy.js`
  после ЛЮБОЙ правки исходников `js/**` (см. подводные камни). Бандлы коммитятся.
- Сайт — статика: открыть `index.html` (работает с `file://`, подключены бандлы) или
  любой статический сервер (`python -m http.server`).

## Публикация

- Выкат — GitHub Actions: workflow `.github/workflows/deploy.yml` запускается при
  каждом push в `master` и публикует сайт на GitHub Pages. Публикуется только
  `index.html`, `privacy.html`, `css/`, `js/`, `data/` — всё остальное
  (`.autopilot/`, `tests/`, `design/`, `docs/`, `*.md`, `build.js`) наружу не уходит.
- Обновление недели: новый каталог `data/<дата>/` + дата в `CI_WEEKS`
  (`data/latest.js`) → `node build.js` → `node --test` зелёный → commit → push.
  Actions выкатывает сам, ручных шагов на хостинге нет.
- Публичный URL вида `https://<аккаунт>.github.io/cassandra-index/` — дописать
  после первого выката (создание репозитория и первый push — отдельный шаг).

## Структура

```
index.html                единственная страница; дефолтная RU-разметка hero в HTML
privacy.html              политика приватности (отдельная страница)
css/styles.css            все токены палитры и стили
js/app.js                 init(): оркестрация, appState, ?week=, демо-подмена
js/data.js                чтение снапшотов из window.CI_DATA; latest/week/listWeeks/validate
js/i18n.js                словари RU/EN; t/plural/date
js/risk.js                status(index)/tone/deltaTone по шкале §10
js/region.js              справочник 6 регионов и ~30 городов; detect/current/choose/search
js/render.js              SECTIONS, registerSection, renderAll, applyI18n
js/sections/*.js          hero, regions, trend, drivers, states, history, methodology
js/share.js               карточка 1200×630 canvas → PNG → download / Web Share API
js/demo.js                панель демо-состояний (режим живёт только в сессии)
data/<YYYY-MM-DD>/        global.js, regions.js, region-<slug>.js, trend.js, drivers.js, sources.js
data/latest.js            CI_WEEKS + CI_LATEST + document.write-загрузка всех снапшотов
tests/*.test.js           14 файлов, node --test
design/cassandra-index.pen    макет pen.dev (текстовый JSON), читается tests/pen.test.js
```

## Ключевые файлы

- Точки входа: `index.html`, `js/app.js` (init на DOMContentLoaded), `data/latest.js`.
- Часто трогают: `js/sections/*` (по одному модулю на секцию), `js/data.js` (схема validate:
  ровно 3 драйвера, trend ровно 12 точек), `data/<дата>/` + `CI_WEEKS` при новой неделе.

## Архитектура

- Поток данных: `data/latest.js` синхронно кладёт все снапшоты в `window.CI_DATA`
  (document.write — fetch на file:// невозможен) → `app.init()` собирает
  `appState = {lang, region, detected, week, snapshot, dataState, unavailable, errors}`
  → `render.renderAll(appState)` диспатчит по 7 зарегистрированным секциям.
- Контракт снапшота: `{published, through, methodology, dataState, global{index,delta},
  regions{slug{index,delta,…}}, trend[12], drivers[3], sources[]}`; битый файл →
  `{dataState:'unavailable', unavailable:true, errors[]}` + событие, не исключение.
- События document (связь секций↔app): `ci:ready` {appState}, `ci:datastate` {state,date,errors},
  `ci:regionchange` {id,persist}, `ci:demo` {mode|null}.
- Швы для тестов — чистые функции без DOM: `i18n.*`, `risk.*`, `region.search/detect`,
  `data.validate`, плюс чистые экспорты секций (`formatDelta`, `rankedRegions` и т.п.).
- Границы модулей: data владеет загрузкой и схемой; i18n — словарём и Intl-форматами;
  risk — порогами шкалы; region — маппингом tz→регион и localStorage; render — всей
  DOM-разметкой; app — связыванием событий и демо-подменой.

## Соглашения кода

- Вся пользовательская строка — только через словарь `js/i18n.js` (`data-i18n`,
  `data-i18n-aria`, `data-i18n-placeholder`; плюрализация RU 1/2–4/5+; даты через Intl).
- DOM только через `document.createElement` + `textContent` — никакого innerHTML со строками.
- Цвета — только CSS-токены из `css/styles.css`; тон статуса — `risk.tone` (токены `--state-*`).
- a11y сквозная: видимый фокус 2px #58A6FF (offset 2–3px), контраст ≥4.5:1, touch ≥44px,
  reflow 320px без горизонтального скролла, prefers-reduced-motion, значения не цветом,
  aria-live — `[data-role="a11y-live"]`.
- Лексика: нет слов из Avoid-списка PRD §11.5, фраз «на пороге/на грани» и метафоры часов;
  технические термины — только в методологии.
- Не трогать: `cassandra-index-prototype.html` (референс, read-only), `PRD_Casandra_Index.md`,
  `METHODOLOGY.md`, `.autopilot/`. Зависимости запрещены — любой импорт npm/CDN ошибка.

## Окружение

Секретов, конфигов и переменных окружения нет — репозиторий полностью статический.

## Тесты

`node --test` без аргументов (18 файлов, 91 тест). Один файл: `node --test tests/<имя>.test.js`.
Покрыты только чистые модули без DOM; тест-фреймворков нет.

## Подводные камни

- `data/latest.js` грузит снапшоты через `document.write` — единственный способ без fetch
  на file://, не баг и не удалять. Новая неделя = каталог `data/<дата>/` + дата в `CI_WEEKS`.
- Страницы грузят СОБРАННЫЕ `js/bundle.js`/`js/bundle-privacy.js`, а не ES-модули: Chrome
  блокирует ES-модули по CORS на file://. После правки любого `js/**` обязателен
  `node build.js` — иначе коммиченный бандл молча останется старым. bundle руками не править.
- Пересохранение `design/cassandra-index.pen` в приложении pen.dev перезаписывает
  `"version"` файла → ломает `tests/pen.test.js` (жёстко ожидает текущую версию).
- Все демо-снапшоты имеют `methodology: "1.0"` — строка о смене версии в UI реализована
  и покрыта тестом, но на демо-данных не проявляется.
- `js/share.js`: `share.announce` берёт язык из localStorage на момент клика, а не из appState.
- Тренд: 12 точек на ширину экрана физически не дают hit-target 44px каждая (r=20 SVG).

## Как здесь работает Autopilot

Сборка ведётся навыком `/autopilot`. Требования, спецификация и таски — в `.autopilot/`.
Прогресс — `.autopilot/dashboard.html`. Правило: требование из `manifest.md`
может снять только пользователь.

Если работа продолжается — скажи «продолжи автопилот»: состояние поднимется
из `.autopilot/state.js`, переспрашивать ничего не нужно.
<!-- autopilot:end -->
