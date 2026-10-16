window.STATE =
{
  "slug": "regions-v2-geo",
  "dir": "2026-10-16-regions-v2-geo--wip",
  "title": "Регионы v2 и справочник городов/стран (ADR 0028 + 0029)",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T2",
  "briefFile": "2026-10-16-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-16T23:58:16+03:00",
  "updatedAt": "2026-10-17T00:06:40+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-16T23:58:16+03:00",
      "finishedAt": "2026-10-17T00:00:30+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-17T00:00:30+03:00",
      "finishedAt": "2026-10-17T00:00:40+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-10-17T00:00:40+03:00",
      "finishedAt": "2026-10-17T00:00:40+03:00",
      "note": "полный автомат — самобрифинг; решения за пользователя помечены ASSUMPTION в manifest.md, вопросов не задавалось; адверсариальный проход не запускался (глубина обычная)"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-17T00:00:40+03:00",
      "finishedAt": "2026-10-17T00:06:00+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-10-17T00:06:00+03:00",
      "note": "5 тасков, ярус T2, 4 волны",
      "finishedAt": "2026-10-17T00:06:40+03:00"
    },
    {
      "id": "build",
      "status": "active",
      "startedAt": "2026-10-17T00:06:40+03:00",
      "note": "волна 1: таск 01"
    },
    {
      "id": "review",
      "status": "active",
      "startedAt": "2026-10-17T00:06:40+03:00"
    },
    {
      "id": "final",
      "status": "pending"
    }
  ],
  "requirements": {
    "total": 42,
    "done": 0,
    "inTicket": 41,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 1,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Таксономия: контракт, резолверы, whitelist",
      "requirements": [
        "R02.1",
        "R03",
        "R03.1",
        "R03.2",
        "R03.3",
        "R03.4",
        "R03.5",
        "R04",
        "R05",
        "R06",
        "R07",
        "R09",
        "R30i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "js/data.js",
        "js/region.js",
        "calc/params.js",
        "calc/engine.js",
        "tests/"
      ],
      "status": "repair",
      "startedAt": "2026-10-17T00:06:40+03:00",
      "retries": 0,
      "repairs": 1,
      "handoffs": 0
    },
    {
      "id": "02",
      "title": "Расчётный пайплайн по версии недели",
      "requirements": [
        "R08",
        "R12",
        "R25",
        "R26"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "calc/calc.js",
        "calc/migrate-week-combined.js",
        "tests/"
      ],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "03",
      "title": "Справочник GeoNames: генератор, ленивая загрузка, поиск",
      "requirements": [
        "R14",
        "R15",
        "R15.1",
        "R15.2",
        "R16",
        "R17",
        "R17.1",
        "R20",
        "R21",
        "R22",
        "R23"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "data/geo/",
        "js/geo.js",
        "js/region.js",
        "data/regions/reference.json",
        "tests/"
      ],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "04",
      "title": "Сайт: регионы по версии, пикер, футер и заметка",
      "requirements": [
        "R01",
        "R02",
        "R08.1",
        "R10",
        "R10.1",
        "R10.2",
        "R11",
        "R18",
        "R19",
        "R29i"
      ],
      "blockedBy": [
        "01",
        "03"
      ],
      "wave": 3,
      "zone": [
        "js/sections/",
        "js/i18n.js",
        "js/app.js",
        "js/share.js",
        "privacy.html",
        "tests/"
      ],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "05",
      "title": "Сборка, сквозная проверка, лексикон, память",
      "requirements": [
        "R24",
        "R27",
        "R28",
        "R30i"
      ],
      "blockedBy": [
        "02",
        "04"
      ],
      "wave": 4,
      "zone": [
        "js/bundle.js",
        "js/bundle-privacy.js",
        "tests/",
        "AGENTS.md"
      ],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    }
  ],
  "singlePass": null,
  "tests": null,
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": "G2 независимый чек (бриф+спека, без манифеста): missing 5 — (1) порядок detect российских Asia/* выше центральноазиатских, (2) тихий откат к глобальному при неудаче detect, (3) 12 строк витрины на узких экранах/пин личного региона, (4) запрет публикации частичного входа с пустыми Балканами, (5) переточка CITIES под v2 — все внесены в spec §Сайт/§Расчёт/§Вне рамок. half-covered 2 — «2 драйвера на region-*.js» и «Балканы не слепые» — внесены. EXTRA ~12 — детали API/файлов (taxonomyForWeek, CURRENT_TAXONOMY, TAXONOMY_V2_FROM, weekPartFiles, js/geo.js, data/geo/generate.js, COORD_BOXES) = deepening R##.n; ASSUMPTION-подмены (RU-имена из alternatenames, курируемая таблица стран, обязательная ссылка в privacy) помечены ASSUMPTION. Найденки приняты без отсечений.",
  "concerns": [
    "Таск 01 (Craft, неблокирующее): js/region.js get/choose повторяют форму REGIONS_V2.find(x=>x.id===id) — вынести общий хелпер поиска по id",
    "Таск 01 (Craft, неблокирующее): tests/region.test.js search('Европа') вакуумно истинно на пустом массиве — утверждать непустоту результата",
    "План: R07 фактически покрыт тасками 01(контракт)+04(сайт), R09 — 01+02; требование не снято, уточняется раскладка G3"
  ],
  "reviewers": {
    "manifestSpec": "ses_eb970ac69ffeVc4JepT17Cze7U",
    "craft": "ses_eb970ac69ffdcVhHzCNTWMcQXl"
  },
  "blind": null
}
