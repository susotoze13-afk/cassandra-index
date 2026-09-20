window.STATE =
{
  "slug": "cassandra-index",
  "dir": "2026-09-20-cassandra-index--wip",
  "title": "Cassandra Index — публичный индекс конфликтного риска",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T2",
  "briefFile": "2026-09-20-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-09-20T09:16:44+03:00",
  "updatedAt": "2026-09-20T11:18:30+03:00",
  "finishedAt": null,
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
      "note": "8 тасков, ярус T2 — цепочка, параллельных волн нет",
      "finishedAt": "2026-09-20T11:18:30+03:00"
    },
    {
      "id": "build",
      "status": "active",
      "startedAt": "2026-09-20T11:18:30+03:00"
    },
    {
      "id": "review",
      "status": "pending"
    },
    {
      "id": "final",
      "status": "pending"
    }
  ],
  "requirements": {
    "total": 85,
    "done": 0,
    "inTicket": 85,
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
      "status": "repair",
      "startedAt": "2026-09-20T11:20:00+03:00",
      "retries": 0,
      "repairs": 1,
      "repairFindings": [
        "EN-полная дата Sep 13, 2026 вместо контракта 13 Sep, 2026 (spec R68) — унаследовал бы все таски; validate принимает drivers != 3; aria-label бренда перекрывает имя продукта; мёртвые имена в SECTIONS; тест-only ключ test.greet в продакшен-словаре"
      ],
      "handoffs": 0
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
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
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
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
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
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
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
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
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
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
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
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
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
  "coverage": {
    "gate": "G2",
    "checkedAt": "2026-09-20T11:06:31+03:00",
    "reviewer": "agent-0",
    "findings": 13,
    "resolved": 13,
    "details": "6 missing (причина снижения уверенности §8.1; относительный вклад драйвера §4.3; фразы «на пороге/на грани» §15; шкала «безопасно→война» §4.2.5; читаемость share-карточки в превью; числовые цели CWV §13) — дописаны в Истории 4, 11, 17, 21, 23, 25; 3 half-covered (состав карточки драйвера; вид индикатора состояний §7; evidence chain §8.2) — раскрыты в Историях 11, 17; 4 сверх брифа: A01 (с родителем R52/R55, История 28), node --test (Решение п.12, не история), .js вместо .json (задокументировано в Решении п.2 как отступление от R63), справочник 6 регионов (Решение п.6)"
  },
  "concerns": [],
  "reviewers": {
    "manifestSpec": null,
    "craft": null
  },
  "blind": null
}
