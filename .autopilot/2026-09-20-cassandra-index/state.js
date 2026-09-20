window.STATE =
{
  "slug": "cassandra-index",
  "dir": "2026-09-20-cassandra-index",
  "title": "Cassandra Index — публичный индекс конфликтного риска",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T2",
  "briefFile": "2026-09-20-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-09-20T09:16:44+03:00",
  "updatedAt": "2026-09-20T19:03:47+03:00",
  "finishedAt": "2026-09-20T19:03:47+03:00",
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-09-20T09:16:44+03:00",
      "finishedAt": "2026-09-20T09:19:30+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-09-20T09:19:30+03:00",
      "finishedAt": "2026-09-20T09:26:00+03:00"
    },
    {
      "id": "briefing",
      "status": "done",
      "startedAt": "2026-09-20T09:26:00+03:00",
      "finishedAt": "2026-09-20T09:30:00+03:00",
      "note": "полный автомат — самобрифинг"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-09-20T09:30:00+03:00",
      "finishedAt": "2026-09-20T11:06:31+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-09-20T11:06:31+03:00",
      "finishedAt": "2026-09-20T11:18:30+03:00",
      "note": "8 тасков, ярус T2 — цепочка, параллельных волн нет; +таск 09 (дополнение пользователя, волна 3)"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-09-20T11:18:30+03:00",
      "note": "12 из 12 тасков готово (9 + 3 ремонта приёмки)",
      "finishedAt": "2026-09-20T19:03:47+03:00"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-09-20T11:35:00+03:00",
      "note": "проверены таски 01–12, блокирующих находок нет",
      "finishedAt": "2026-09-20T19:03:47+03:00"
    },
    {
      "id": "final",
      "status": "done",
      "finishedAt": "2026-09-20T19:03:47+03:00",
      "note": "слепая приёмка: 13 требований подтверждено, 2 дрифта закрыты ремонтом (file://, навигация 360px)"
    }
  ],
  "requirements": {
    "total": 87,
    "done": 87,
    "inTicket": 0,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Каркас сайта, демо-данные и чистые модули",
      "requirements": [
        "R01",
        "R09",
        "R26",
        "R46",
        "R47",
        "R63",
        "R63.1",
        "R64",
        "R65",
        "R73",
        "R76",
        "R77"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "css/",
        "js/data.js",
        "js/i18n.js",
        "js/risk.js",
        "js/region.js",
        "js/render.js",
        "js/app.js",
        "data/",
        "tests/"
      ],
      "status": "done",
      "startedAt": "2026-09-20T11:20:00+03:00",
      "retries": 0,
      "repairs": 1,
      "repairFindings": [
        "EN-полная дата Sep 13, 2026 вместо контракта 13 Sep, 2026 (spec R68) — унаследовал бы все таски; validate принимает drivers != 3; aria-label бренда перекрывает имя продукта; мёртвые имена в SECTIONS; тест-only ключ test.greet в продакшен-словаре"
      ],
      "handoffs": 0,
      "files": [
        "index.html",
        "css/styles.css",
        "data/latest.js",
        "data/2026-08-02..2026-09-13/",
        "js/data.js",
        "js/i18n.js",
        "js/risk.js",
        "js/region.js",
        "js/render.js",
        "js/app.js",
        "tests/"
      ],
      "tests": {
        "passed": 23,
        "failed": 0
      },
      "commit": "5518d4b",
      "finishedAt": "2026-09-20T11:50:00+03:00",
      "concerns": []
    },
    {
      "id": "02",
      "title": "Первый экран: hero, персональный регион, выбор региона, язык",
      "requirements": [
        "R02",
        "R03",
        "R04",
        "R05",
        "R06",
        "R07",
        "R08",
        "R11",
        "R12",
        "R15",
        "R17",
        "R18",
        "R19",
        "R20",
        "R21",
        "R22",
        "R23",
        "R24",
        "R25",
        "R27",
        "R28",
        "R45",
        "R48",
        "R49",
        "R50",
        "R51",
        "R67",
        "R68",
        "R69",
        "R70",
        "R71",
        "R72",
        "R74",
        "R75",
        "R78"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "index.html",
        "js/render.js",
        "js/sections/hero.js",
        "js/app.js"
      ],
      "status": "done",
      "startedAt": "2026-09-20T11:50:00+03:00",
      "retries": 0,
      "repairs": 1,
      "repairFindings": [
        "Красный прогон: hero.test.js импортирует несуществующие экспорты и тестирует несуществующую модель heroModel; EN-заголовок и EN-приписка не дословно против PRD; панель выбора не переводится при первом построении; дефолт языка 'en' вместо 'ru'; CTA без «→»"
      ],
      "handoffs": 0,
      "finishedAt": "2026-09-20T12:19:00+03:00",
      "tests": {
        "passed": 27,
        "failed": 0
      },
      "commit": "a5bd9a6",
      "files": [
        "index.html",
        "css/styles.css",
        "js/sections/hero.js",
        "js/render.js",
        "js/app.js",
        "js/i18n.js",
        "tests/hero.test.js",
        "tests/i18n.test.js"
      ],
      "concerns": [
        "панель строится один раз; при закрытой панели смену языка перекрывает applyI18n из renderApp",
        "долготный маппинг Geolocation — демо-семантика, задокументирована в коде и тесте"
      ]
    },
    {
      "id": "03",
      "title": "Драйверы изменения и дополнительные измерения риска",
      "requirements": [
        "R05",
        "R13",
        "R29",
        "R30",
        "R31",
        "R32",
        "R33",
        "R34",
        "R41",
        "R57",
        "R58"
      ],
      "blockedBy": [
        "02"
      ],
      "wave": 3,
      "zone": [
        "js/sections/drivers.js",
        "index.html",
        "js/render.js"
      ],
      "status": "done",
      "retries": 0,
      "repairs": 1,
      "repairFindings": [
        "Ревью (manifest/spec): R29 partial — карточка драйвера без краткого лейбла (spec История 11, прототип h3); дозапрос: чистый шов driverLabel + поле label{ru,en} в схеме, 7 недель данных и h3.driver-label; переревью — addressed"
      ],
      "handoffs": 0,
      "startedAt": "2026-09-20T12:20:00+03:00",
      "finishedAt": "2026-09-20T15:21:38+03:00",
      "tests": {
        "passed": 34,
        "failed": 0
      },
      "commit": "25d4d2a",
      "files": [
        "js/sections/drivers.js",
        "tests/drivers.test.js",
        "index.html",
        "css/styles.css",
        "js/i18n.js",
        "js/render.js",
        "data/2026-08-02..2026-09-13/drivers.js (7 недель)"
      ],
      "concerns": [
        "перерванный исполнитель сессии 12:20 доделан свежим контекстом (agent-14); счётчик шагов предшественника неизвестен"
      ]
    },
    {
      "id": "04",
      "title": "Тренд за 12 недель",
      "requirements": [
        "R35",
        "R36",
        "R37",
        "R38",
        "R39",
        "R40"
      ],
      "blockedBy": [
        "03"
      ],
      "wave": 4,
      "zone": [
        "js/sections/trend.js",
        "index.html",
        "js/render.js"
      ],
      "status": "done",
      "retries": 0,
      "repairs": 1,
      "repairFindings": [
        "Ревью (manifest/spec): R36 partial — дата в tooltip точки коротким форматом вопреки цитате манифеста («локальный формат») и aria-label; дозапрос: чистый шов tooltipDate с длинным форматом + тест; переревью — addressed"
      ],
      "handoffs": 0,
      "startedAt": "2026-09-20T15:25:00+03:00",
      "finishedAt": "2026-09-20T15:40:27+03:00",
      "tests": {
        "passed": 47,
        "failed": 0
      },
      "commit": "673b12b",
      "files": [
        "js/sections/trend.js",
        "tests/trend.test.js",
        "js/render.js",
        "js/i18n.js",
        "css/styles.css"
      ],
      "concerns": [
        "тач-мишень точек графика r=20 SVG-единиц (~14px на 320px) — до 44px не дотягивает, компромисс плотного графика (12 точек на ширину экрана)"
      ]
    },
    {
      "id": "09",
      "title": "Дизайн-макет в pen.dev (дополнение пользователя 2026-09-20)",
      "requirements": [
        "G01"
      ],
      "blockedBy": [],
      "wave": 3,
      "zone": [
        "design/",
        "tests/pen.test.js"
      ],
      "status": "done",
      "retries": 0,
      "repairs": 1,
      "repairFindings": [
        "Внешняя причина: пользователь открыл design/cassandra-index.pen в приложении pen.dev, документ пересохранён как version 2.17 — тест ожидал 2.6, прогон красный; дозапрос: ожидание привязано к pen-schema.md расширения 0.6.71; инварианты пересохранения проверены — не пострадали"
      ],
      "handoffs": 0,
      "startedAt": "2026-09-20T15:25:00+03:00",
      "finishedAt": "2026-09-20T15:48:00+03:00",
      "tests": {
        "passed": 6,
        "failed": 0
      },
      "commit": "cdd3993",
      "files": [
        "design/cassandra-index.pen",
        "tests/pen.test.js"
      ],
      "concerns": [
        "тренд в макете нарисован столбцами — линия с точками формат .pen не поддерживает (оговорка исполнителя)",
        "макет подтверждённо открывается в pen.dev (пользователь пересохранил) — concern про версию закрыт ремонтом"
      ],
      "note": "добавлен пользователем посреди прогона; бумажность (манифест G01, spec, тикет) оформлена ранее"
    },
    {
      "id": "05",
      "title": "Региональный ranked-лист",
      "requirements": [
        "R14",
        "R42",
        "R43",
        "R44",
        "R57"
      ],
      "blockedBy": [
        "04"
      ],
      "wave": 5,
      "zone": [
        "js/sections/regions.js",
        "index.html",
        "js/render.js"
      ],
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "startedAt": "2026-09-20T15:42:00+03:00",
      "finishedAt": "2026-09-20T16:05:00+03:00",
      "tests": {
        "passed": 50,
        "failed": 0
      },
      "commit": "47963db",
      "files": [
        "js/sections/regions.js",
        "tests/regions.test.js",
        "js/render.js",
        "index.html",
        "js/i18n.js",
        "css/styles.css"
      ],
      "concerns": [
        "региональный уровень данных не отдаёт confidenceNote — подхватится без правки, если пайплайн добавит поле",
        "разметка accordion-источников продублирована из drivers.js (export buildSourceItem править было нельзя) — копии начали дрейфовать, собрать в общий builder при ближайшем таске, касающемся drivers.js"
      ]
    },
    {
      "id": "06",
      "title": "Крит-режим, состояния данных, fallback, демо-панель",
      "requirements": [
        "R10",
        "R11",
        "R52",
        "R53",
        "R54",
        "R55",
        "R56",
        "A01"
      ],
      "blockedBy": [
        "05"
      ],
      "wave": 6,
      "zone": [
        "js/sections/states.js",
        "js/demo.js",
        "js/app.js",
        "index.html",
        "js/render.js"
      ],
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "startedAt": "2026-09-20T16:08:00+03:00",
      "finishedAt": "2026-09-20T16:20:00+03:00",
      "tests": {
        "passed": 60,
        "failed": 0
      },
      "commit": null,
      "files": [
        "js/sections/states.js",
        "js/demo.js",
        "tests/states.test.js",
        "tests/demo.test.js",
        "js/app.js",
        "js/render.js",
        "js/i18n.js",
        "index.html",
        "css/styles.css"
      ],
      "concerns": [
        "браузерный smoke-тест не выполнен (Aside недоступен на Windows) — DOM-сборка проверена вручную + node-импортами"
      ]
    },
    {
      "id": "07",
      "title": "История публикаций, методология, футер",
      "requirements": [
        "R16",
        "R17",
        "R59",
        "R60",
        "R61",
        "R62",
        "R66",
        "R79",
        "R85"
      ],
      "blockedBy": [
        "06"
      ],
      "wave": 7,
      "zone": [
        "js/sections/history.js",
        "js/sections/methodology.js",
        "index.html",
        "js/render.js"
      ],
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "startedAt": "2026-09-20T16:25:00+03:00",
      "tests": {
        "passed": 67,
        "failed": 0
      },
      "finishedAt": "2026-09-20T20:13:26+03:00",
      "commit": "8a8210f"
    },
    {
      "id": "08",
      "title": "Share-карточка и privacy.html",
      "requirements": [
        "R17",
        "R49",
        "R80",
        "R81",
        "R82",
        "R83",
        "R84"
      ],
      "blockedBy": [
        "07"
      ],
      "wave": 8,
      "zone": [
        "js/share.js",
        "privacy.html",
        "index.html"
      ],
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "startedAt": "2026-09-20T20:13:26+03:00",
      "tests": {
        "passed": 80,
        "failed": 0
      },
      "finishedAt": "2026-09-20T17:37:45+03:00",
      "commit": null
    },
    {
      "id": "11",
      "title": "Консолидация дублей, усиление тестов, навигация на 360px",
      "requirements": [
        "R04",
        "R16",
        "R45",
        "R49",
        "R80"
      ],
      "blockedBy": [],
      "wave": 9,
      "zone": [
        "js/** (кроме bundle таска 10)",
        "css/styles.css",
        "privacy.html",
        "tests/"
      ],
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "startedAt": "2026-09-20T17:54:18+03:00",
      "note": "триаж concerns фазы 8: дубли хелперов повторились в 5+ тасках → fix now",
      "tests": {
        "passed": 87,
        "failed": 0
      },
      "finishedAt": "2026-09-20T18:19:10+03:00",
      "commit": "f02364b"
    },
    {
      "id": "10",
      "title": "Сайт реально работает с file://",
      "requirements": [
        "R63"
      ],
      "blockedBy": [
        "11"
      ],
      "wave": 10,
      "zone": [
        "build.js",
        "js/bundle.js",
        "index.html",
        "privacy.html"
      ],
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "note": "дрифт G4: ES-модули заблокированы на file://; доказательство — headless Chrome",
      "startedAt": "2026-09-20T18:19:10+03:00",
      "tests": {
        "passed": 87,
        "failed": 0
      },
      "finishedAt": "2026-09-20T18:54:30+03:00",
      "commit": "c7515c7"
    },
    {
      "id": "12",
      "title": "build.js: громкие ошибки на неподдержанных формах",
      "requirements": [
        "R63"
      ],
      "blockedBy": [
        "10"
      ],
      "wave": 11,
      "zone": [
        "build.js",
        "tests/"
      ],
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "startedAt": "2026-09-20T19:03:16+03:00",
      "finishedAt": "2026-09-20T19:03:16+03:00",
      "tests": {
        "passed": 91,
        "failed": 0
      },
      "commit": "02a9e3a",
      "note": "триаж concerns фазы 8: молчаливый пропуск форм хуже громкой ошибки"
    }
  ],
  "singlePass": null,
  "tests": {
    "passed": 91,
    "failed": 0
  },
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "gate": "G2",
    "checkedAt": "2026-09-20T11:06:31+03:00",
    "reviewer": "agent-0",
    "findings": 13,
    "resolved": 13,
    "details": "6 missing (причина снижения уверенности §8.1; относительный вклад драйвера §4.3; фразы «на пороге/на грани» §15; шкала «безопасно→война» §4.2.5; читаемость share-карточки в превью; числовые цели CWV §13) — дописаны в Истории 4, 11, 17, 21, 23, 25; 3 half-covered (состав карточки драйвера; вид индикатора состояний §7; evidence chain §8.2) — раскрыты в Историях 11, 17; 4 сверх брифа: A01 (с родителем R52/R55, История 28), node --test (Решение п.12, не история), .js вместо .json (задокументировано в Решении п.2 как отступление от R63), справочник 6 регионов (Решение п.6)"
  },
  "concerns": [
    "js/sections/hero.js:197-202 — валидация id в app.js дублирует гарантию справочника (minor, из ревью таска 02)",
    "js/sections/hero.js:41-45 — состояние панели в модульных let, при повторном импорте модуля может протечь (minor, из ревью таска 02)",
    "index.html:30-32 — комментарий привязан к жёсткой неделе 2026-09-13, упрётся при обновлении data/ (minor, из ревью таска 02)",
    "js/sections/drivers.js:52 — LEVEL_TONE маппит medium на --state-danger, минуя --state-tense (minor, из ревью таска 03)",
    "js/i18n.js:55-77 — лексика уровней продублирована в drivers.contribution.*/confidence.* и drivers.measures.level.* (minor, из ревью таска 03)",
    "js/i18n.js:53 — ключ sources.count из таска 01 остался без потребителей (minor, из ревью таска 03)",
    "js/sections/drivers.js:97,102 — confidenceInfo вычисляется дважды на карточку (minor, из ревью таска 03)",
    "js/sections/drivers.js:112-125 — второй переключатель drivers.sources.hideAll сверх R33; ревью не заблокировало, триаж на приёмке (из ревью таска 03)",
    "js/sections/trend.js:10,19 — Reinvention: signedDelta/arrowOf дублируют formatDelta/deltaArrow из hero.js (minor, из ревью таска 04)",
    "js/i18n.js:84 — trend.summary зашито «за 12 недель» при счёте total по фактической длине списка (minor, из ревью таска 04)",
    "js/sections/trend.js:73 — DOM-хелпер el() — вторая копия после drivers.js:58 (minor, из ревью таска 04)",
    "ВНЕ ТАСКОВ: правка в js/sections/drivers.js:128-135 (скрытие «Все источники» при свёрнутом аккордеоне) появилась в дереве отдельно от исполнителей — предположительно рука пользователя; закоммичена отдельным коммитом",
    "design/cassandra-index.pen:563-778 — шесть строк регионов и hero-экраны скопированы литерально, reusable-компоненты формата не использованы (minor, из ревью таска 09)",
    "tests/pen.test.js:42 — тест палитры проверяет объявление hex в variables, не ссылки fill/stroke нод (minor, из ревью таска 09)",
    "js/sections/regions.js:69-131 — вторая копия аккордеона источников, копии разошлись по moreBtn.hidden; собрать в общий builder при ближайшем таске, касающемся drivers.js (minor, из ревью таска 05)",
    "js/sections/regions.js:62 — стрелка через сравнение deltaTone(...) === '--text-secondary' вместо deltaArrow(value) (minor, из ревью таска 05)",
    "css/styles.css:199-206 — правка .hero-numbers (flex→grid) вне зоны таска 05 в диффе таска; причина не зафиксирована, вероятен reflow-фикс (minor, из ревью таска 05)",
    "tests/regions.test.js — не покрыта ветка tie-break rankedRegions (равные |Δ|, рост выше снижения) (minor, из ревью таска 05)",
    "ВНЕ ТАСКОВ: METHODOLOGY.md переписан пользователем (v0.5, второй раунд правок по внешнему ревью) — коммитится отдельно",
    "js/sections/states.js:45 — renderBadge лезет во внутренности чужой секции (.hero .meta), при рефакторе hero молча перестанет рендериться (minor, из ревью таска 06)",
    "js/sections/states.js:85,112 — крит-панель и unavailable собираются через innerHTML с интерполяцией, вне конвенции createElement остальных секций (minor, из ревью таска 06)",
    "js/i18n.js:55 — ключ state.historical объявлен, но кодом не читается (мёртвый ключ, minor, из ревью таска 06)",
    "js/demo.js:103 — баннер/панель демо не синхронизируются со сменой языка (renderApp), надпись остаётся на старом языке (minor, из ревью таска 06)",
    "js/i18n.js:197 — EN-лейбл навигации «History & sources» против дословной цитаты R16 «Sources & history»; спека (Решения п.11) сама называет раздел «История и источники» — расхождение цитат бриф/спека, триаж на приёмке (minor, из ревью таска 07)",
    "js/sections/methodology.js — блок «Открытые вопросы» (25 вопросов §19+v1.3) выведен в публичный UI, хотя R85 просил «документально»; внутренние вопросы (провайдер IP, GDPR) теперь публичны — на усмотрение пользователя, триаж на приёмке (minor, из ревью таска 07)",
    "js/sections/history.js:179 — третья копия маппинга класса дельты (delta--rise/fall/same) при готовых DELTA_CLASS hero.js:48 и regions.js:46 — собрать в общий маппинг (minor, из ревью таска 07)",
    "js/sections/methodology.js:22-29 — диапазоны порогов зашиты в ANCHOR_KEYS вместо вывода из risk.SCALE — смена порогов молча разойдётся с таблицей (minor, из ревью таска 07)",
    "js/sections/history.js:101-126 — пересборка appState по неделе и ведение URL ?week= внутри секции; владелец — app.js (interfaces.md) — перенести оркестрацию в app.js (minor, из ревью таска 07)",
    "tests/history.test.js:54-66 — тест DEMO_REVIEWS проверяет тип/длину строк, не отличает переставленные RU/EN от контента — усилить ассерт (minor, из ревью таска 07)",
    "index.html:91-97 — hero-legal (полный дисклеймер §17 в первом вьюпорте) может вытеснить карточку региона за пределы 640px на 360×640 (R45/R04) — проверить в браузере на приёмке G4 (minor, из ревью таска 08)",
    "js/share.js:162-169, privacy.html:61-68 — третья/четвёртая копии резолва языка (localStorage+navigator), хотя app.js экспортирует resolveLang — собрать в одном месте (minor, из ревью таска 08)",
    "js/share.js:180-186 — resolveWeekParam сам парсит ?week=, дублируя владельца (app.js) — переиспользовать (minor, из ревью таска 08)",
    "js/share.js:244-253 — гард двойного биндинга на dataset кнопки, listener на document: при пересоздании кнопки initShare повесит второй слушатель — гард на уровне модуля (minor, из ревью таска 08)",
    "tests/privacy.test.js:18-24 — EN-проверки §17/footer.ip слабые (length/includes), дословность EN не закреплена, в отличие от RU — усилить (minor, из ревью таска 08)",
    "tests/privacy.test.js:34-43 — проверки privacy.html на наличие подстрок; страница-заглушка пройдёт — проверять смысловое содержимое (minor, из ревью таска 08)",
    "js/share.js drawCard — вёрстка карточки (позиции/кегли) без теста, покрыт только cardLayout; canvas в node недоступен — непокрытый шов R80 «читаема в превью» (minor, из ревью таска 08)",
    "tests/methodology.test.js:7-22 — тест фиксирует диапазоны и их стыковку, но не связку «подпись якоря ↔ диапазон»: перемешанный порядок ANCHOR_KEYS против risk.SCALE пройдёт (minor, из ревью таска 11)",
    "js/share.js:190,206 — parseWeekParam(location.search) без try/catch, как было в удалённом resolveWeekParam: вне браузера buildCard/shareSnapshot бросают ReferenceError — сделать обёртку или зафиксировать браузер-only (minor, из ревью таска 11)",
    "build.js:23-61 — парсер молча пропускает side-effect-импорт, множественный export const и default без источника: ошибка уйдёт в рантайм браузера, а не на сборке — добавить громкие ошибки (таск 12)",
    "build.js:31-47 — hasTopLevelComma не понимает regex-литералы (export const RE = /a,b/ ложно роняет сборку) — учесть при ближайшем касании build.js (minor, из ревью таска 12)",
    "build.js:103-131 — importLines повторно разбирает клаузу вместо использования результата parseClause — двойной разбор строки (minor, из ревью таска 12)"
  ],
  "reviewers": {
    "manifestSpec": "agent-25",
    "craft": "agent-26"
  },
  "blind": {
    "checkedAt": "2026-09-20T17:54:18+03:00",
    "checker": "agent-28",
    "verdict": "проект работает полноценно по http, 80/80 тестов; найдено 2 расхождения",
    "drift": [
      "file:// не работает: Chrome блокирует ES-модули по CORS — живой только статичный RU-hero (требование спеки «работает по двойному клику») → таск 10",
      "на 360px .site-nav — внутренний горизонтальный скролл (378>328), «Методология»/«История» обрезаны до свайпа (рефлоу) → таск 11"
    ],
    "confirmed": "все 13 проверенных требований брифа реализованы: разделы, регион по часовому поясу без записи при первом визите, RU/EN, выбор региона, тренд, драйверы, история недель и ?week=, share-карточка, приватность, палитра, дизайн-макет",
    "driftResolved": "оба дрифта закрыты ремонтом: file:// — bundle (таск 10, перепроверено ревьюером), навигация 360px — таск 11"
  },
  "final": {
    "id": "final",
    "status": "pending"
  }
}
