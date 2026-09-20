# Интерфейсы и правила проекта

Копируется из спецификации (раздел «Границы и швы», Решения по реализации) + правила,
которые сабагент не может вывести сам. Первое, что читает исполнитель таска.

## Правила проекта (нормативны)

- **Стек**: чистый HTML/CSS/ES-модули. Ноль зависимостей, ноль сборки, ноль библиотек
  (включая визуализацию — графика инлайн-SVG, генерируется из данных). Node ≥ 18.
- **Тесты**: `node --test tests/` — только чистые модули без DOM (`i18n`, `risk`,
  `region.search/detect`, `data.validate`). Никаких тест-фреймворков.
- **Запуск**: сайт обязан работать с `file://` (двойной клик по `index.html`) и с любого
  статического хостинга. Поэтому данные — JS-файлы через `<script src>`, **не fetch**:
  снапшоты кладут данные в `window.CI_DATA` (Решение п.2, отступление от буквы R63
  с `*.json` — задокументировано в спецификации).
- **Не трогать**: `cassandra-index-prototype.html` (референс, только чтение),
  `PRD_Casandra_Index.md`, `METHODOLOGY.md`, всё в `.autopilot/`.
- **Лексика**: в primary UI нет слов из Avoid-списка §11.5 и фраз «на пороге», «на грани»
  (§15). Метафора часов нигде (§79 запрет). Технические термины — только в методологии.
- **i18n**: ни одной «жёсткой» пользовательской строки вне словаря. Ключи `data-i18n`,
  плюрализация RU правилом 1/2–4/5+, даты через `Intl.DateTimeFormat`.
- **Доступность и производительность — сквозные критерии каждого UI-таска**:
  видимый фокус (#58A6FF, 2px, offset 2–3px), контраст ≥4.5:1, touch ≥44px,
  reflow 320px без горизонтального скролла, prefers-reduced-motion, значения не только
  цветом; нижефолдовые секции — content-visibility, первый экран читается без JS-ожидания.
- **Missing dependency → `BLOCKED`**, а не самостоятельная установка пакетов.
  (На этом проекте зависимостей нет в принципе — любой импорт из npm/CDN — ошибка.)

## Структура (зоны владения)

```
index.html          — единственная страница, якорные разделы; hero-разметка RU в исходном HTML
privacy.html        — политика приватности (отдельная страница)
css/styles.css      — все токены §14.4 и стили
js/data.js          — загрузка снапшотов через script-теги, latest(), week(), listWeeks(), validate()
js/i18n.js          — словари RU/EN, t(), plural(), date()
js/risk.js          — status(index), tone(statusId), deltaTone(change) по §10
js/region.js        — справочник 6 регионов + ~30 городов, detect(tz), current(), choose(), search()
js/render.js        — renderAll(appState), dispatch по секциям
js/app.js           — init(): оркестрация, data-state, URL ?week=, демо-подмена
js/sections/*.js    — по одному модулю на секцию (hero, drivers, trend, regions, states, history, methodology)
js/share.js         — canvas 1200×630 → PNG → download / Web Share API
js/demo.js          — панель «Демо-состояния» (A01, только сессия)
data/<YYYY-MM-DD>/  — global.js, regions.js, region-<slug>.js, trend.js, drivers.js, sources.js
data/latest.js      — указатель на текущую неделю
tests/*.test.js     — node --test
```

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `data` | снапшоты, указатель latest, схема | `latest()`, `week(date?)`, `listWeeks()`, `validate(snapshot)` | загрузку script-тегов, дефолты при битых файлах |
| `i18n` | словари RU/EN, плюрализация, форматы | `t(lang,key,vars)`, `plural(lang,n,forms)`, `date(lang,iso,short?)` | правила склонения, Intl-настройки |
| `risk` | шкала §10, тона палитры | `status(index)`, `tone(statusId)`, `deltaTone(change)` | пороги, границы диапазонов |
| `region` | справочник регионов/городов, детект, хранение | `detect(tz)`, `current()`, `choose(id,{persist})`, `search(q)` | маппинг tz→регион, ключи localStorage |
| `render` | вся DOM-разметка всех секций | `renderAll(appState)`, `renderSection(name,appState)` | aria-атрибуты, svg-геометрию, состояния контролов |
| `app` | оркестрация, data-state, URL `?week=` | `init()` | связывание событий, демо-подмену |

Швы для тестов (тестируем только здесь): `i18n`, `risk`, `region.search/detect`,
`data.validate` — чистые функции без DOM.

## Контракт данных (снапшот)

`window.CI_DATA = { snapshots: { "<YYYY-MM-DD>": {...} }, latest: "<YYYY-MM-DD>" }`.
Поля снапшота: даты публикации/покрытия, версия методологии, глобальный индекс и Δ,
регионы (индекс, Δ, статус, драйверы, уверенность, источники), 12-недельный тренд,
состояние данных (Published/Updating/Delayed/Insufficient data/Model unavailable).
Демо-данные — согласно PRD «в прототипе — demo-данные»: ≥6 недель истории,
глобальный индекс последней недели — 72 (↑+6), рекомендованные 2–5 источников на драйвер.

## Из таска 01 — каркас, демо-данные, чистые модули

- `risk.status(index 0..100)` → `'calm'|'tense'|'danger'|'very'|'critical'|'extreme'`|null; `risk.tone(id)` → токен `'--state-*'`; `risk.deltaTone(Δ)` → `'--state-very'|'--state-calm'|'--text-secondary'`
- `i18n.t(lang,key,vars)` · `i18n.plural(lang,n,[one,few,many])` · `i18n.date(lang,iso,short?)` → `13 сентября 2026` / `13 Sep, 2026` / `13.09` / `Sep 13`
- `region.REGIONS` · `region.CITIES` · `region.get(id)` · `region.detect(tz)` (неизвестный IANA-пояс → null) · `region.current()` · `region.choose(id,{persist})` · `region.search(q)` → `[{name,region,regionName}]`
- `data.latest()` → `'YYYY-MM-DD'` · `data.week(date?)` → snapshot | `{dataState:'unavailable',unavailable,errors[]}` · `data.listWeeks()` · `data.validate(snap)` → `{ok,errors[]}`
- События на document: `ci:datastate` {state,date,errors}, `ci:ready` {appState}
- `appState = {lang,region,detected,week,snapshot,dataState,unavailable,errors}`
- `render.SECTIONS = ['hero','regions','trend','drivers','states','history','methodology']` — `render.registerSection(name,fn)` · `render.renderAll(appState)` · `render.applyI18n(root,lang)`
- Схема снапшота: `{published,through,methodology,dataState,global{index,delta},regions{slug{index,delta,status,confidence,drivers[]}},trend[12×{date,value}],drivers[3],sources[]}` — validate требует ровно 3 драйвера
- Тесты: `node --test` (bare — `node --test tests/` падает на Windows/Node 24), один файл: `node --test tests/<file>.test.js`
- `data/latest.js` грузит снапшоты через `document.write` (единственный способ без fetch на file://); новая неделя = каталог `data/<дата>/` + дата в `CI_WEEKS`
- `js/render.js`/`js/app.js` — скелеты: dispatch без зарегистрированных секций, hero — дефолтная RU-разметка HTML

## Из таска 02 — первый экран (hero)

- `js/sections/hero.js` — зарегистрирован как `'hero'`; чистые `formatDelta(n)` → `'+6'|'-3'|'0'`, `deltaArrow(n)` → `'↑'|'↓'|'→'`, `refineRegionFromCoords(lat,lon)` → regionId|null
- Событие document `ci:regionchange` {id, persist} — app.js делает `region.choose(id,{persist})` + `renderAll`
- `render.applyI18n` теперь обрабатывает `[data-i18n-placeholder]`
- Новые i18n-ключи: `statusLower.*`, `region.{note,cta,panel.*}`, `a11y.{region.changed,lang.changed}`, `nav.label`, `lang.label`


## Из таска 02 — hero, первый экран, регион, язык

- `js/sections/hero.js` — `render(appState)`, регистрируется как `'hero'` через `render.registerSection`; чистые швы `formatDelta(n)`, `deltaArrow(n)`, `refineRegionFromCoords(lat,lon) → regionId|null`
- Событие document `ci:regionchange` `{id, persist}` — hero→app: region.choose + перерисовка + aria-live
- data-role в hero: `global-index`, `status`, `delta(-value)`, `meta-published`, `meta-through`, `region-card/city/name/change/stats/index/status/delta/unavailable/note`, `region-cta`, `region-picker`, `a11y-live`
- `render.applyI18n` покрывает `[data-i18n-placeholder]`; новые ключи i18n: `nav.label`, `lang.label`, `statusLower.*`, `region.note`, `region.cta`, `region.panel.*`, `a11y.*`
- Тесты: 27 (`node --test`), в т.ч. `tests/hero.test.js` против чистых швов

## Из таска 03 — драйверы и дополнительные измерения

- `js/sections/drivers.js` — `render(appState)`, регистрация `'drivers'`; чистые швы:
  `driverLabel(lang,drv)` → короткий локализованный лейбл (фолбэк RU, '' при отсутствии),
  `sourcesLabel(lang,n)` → `'N источников'/'N sources'`, `visibleSources(sources,showAll)`
  → `{shown,remaining}`, `resolveMeasures(snapshot)` → `{direct,nuclear}`,
  `levelLabel(lang,kind,level)` (kind: `'contribution'|'confidence'`),
  `confidenceInfo(lang,drv)` → `{word,note}` — общий компонент уверенности для таска 05
- Схема драйвера: `{observation{ru,en}, why{ru,en}, contribution, confidence,
  confidenceNote{ru,en}?, sources[{title{ru,en},url,domain,date}]}`; опционально
  `snapshot.measures {direct,nuclear}` (демо-данные поля не отдают — код читает с дефолтами)
- i18n-ключи `drivers.*`, `sources.word` (';'-формы для plural); скрытие аккордеона
  через `[hidden]` с `!important` (`.driver-sources{display:flex}` иначе перебивает)
- Тесты: 33 (`node --test`), в т.ч. `tests/drivers.test.js` против чистых швов

## Из таска 04 — тренд за 12 недель

- `js/sections/trend.js` — `render(appState)`, регистрация `'trend'`; чистые швы:
  `signedDelta(n)` → `'+6'|'-3'|'0'`, `arrowOf(Δ)` → `'↑'|'↓'|'→'`,
  `directionOf(Δ)` → `'up'|'down'|'flat'`, `pointAriaLabel(lang,{date,value})` → `'72 из 100, 13 сентября 2026'`,
  `tooltipDate(lang,{date,value})` → `'13 сентября 2026' | '13 Sep, 2026'` (длинный формат, как в aria-label),
  `summaryText(lang,points12)` → `'За неделю индекс изменился на +1 пункт; за 12 недель — на +16 пунктов.'`,
  `clampX(left,w,containerW)`
- DOM: `[data-section="trend"]` → `.trend-caption/.trend-summary/.trend-chart`; точки SVG
  `circle.trend-point(tabindex=0, role=button, aria-label)`, `.trend-tooltip[aria-hidden=true]`,
  tap-автоскрытие 3500 мс; i18n-ключи `trend.*`
- Компромисс: hit-circle точек r=20 SVG-единиц (~14px на 320px) — 12 точек на ширину экрана
  физически не дают 44px каждая

## Из таска 09 — дизайн-макет pen.dev (дополнение пользователя)

- `design/cassandra-index.pen` — документ .pen v2.6 (текстовый JSON); 4 top-level фрейма
  с `clip: true`: «Desktop — Hero» 1440×900, «Desktop — Sections» 1440, «Desktop — Regions»
  1440, «Mobile — Hero» 360×640; палитра §14.4 в `document.variables` (вкл. HEX24 rgba-токены)
- Открыть: VS Code → расширение highagency.pencildev → Recent Files → design/cassandra-index.pen
  (или приложение pen.dev)
- Тексты макета — дословно из демо-данных data/2026-09-13 (норматив спеки «Дизайн-макет pen.dev»)
- `tests/pen.test.js` — 6 тестов: парсинг JSON, 4 фрейма, палитра, инварианты формата
  (нет % в размерах, fill у text-нод, clip у экранов)
- Известные оговорки: поддеревья скопированы, не вынесены в reusable-компоненты; тренд в макете
  — столбцы (линия с точками формат не поддерживает); после пересохранения в приложении pen.dev
  `"version": "2.17"` (как в pen-schema.md расширения 0.6.71) — макет открывается, инварианты целы

## Из таска 05 — региональный ranked-лист

- `js/sections/regions.js` — `render(appState)`, регистрация `'regions'`; чистые швы:
  `rankedRegions(snapshot)` → `[{id,index,delta,status,…}]` (все 6 регионов, сортировка по |Δ|,
  при равенстве рост выше снижения, далее порядок справочника),
  `statusLabel(lang,index,lower=true)` → слово статуса из словаря, '' вне шкалы
- Переиспользует: `formatDelta/deltaArrow` (hero.js), `sourcesLabel/visibleSources/confidenceInfo/
  levelLabel/driverLabel` (drivers.js) — R57 закрыт общим компонентом уверенности
- Разметка accordion-источников регионов продублирована из drivers.js (export buildSourceItem
  править было нельзя); классы те же, стили общие
- Региональный уровень данных не отдаёт confidenceNote — подхватится без правки, если пайплайн
  добавит поле

## Из таска 06 — крит-режим, состояния данных, fallback, демо-панель

- `js/sections/states.js` — `render(appState)`, регистрация `'states'`; чистые швы:
  `criticalModeOn(snapshot)` → bool (глобальный индекс ≥81), `badgeTone(dataState)` → класс-модификатор,
  `isHistorical(week, latest)` → bool, `historyBannerText(lang, snapshot)` → строка с датами
- `js/demo.js` — `DEMO_MODES=['critical','delayed','insufficient','unavailable']`,
  `CRITICAL_DEMO_INDEX=85`, `applyDemo(appState, mode)` → новый appState (вход не мутирует;
  null/'off' — без изменений), `demoModeLabel(lang, mode)`, `initDemo(getLang)`;
  событие document `ci:demo {mode|null}` — app.js держит режим в памяти сессии (A01)
- data-role в index.html: `history-banner`, `critical-panel`, `unavailable-overlay`
  (+`unavailable-retry`), `demo-link`, `demo-panel`, `demo-banner`; i18n-ключи
  `state.historical`, `history.banner`, `critical.*`, `unavailable.*`, `demo.*`
- Крит-панель использует #F85149 — допустимо по §14.5 (крит-режим)
