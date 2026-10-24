window.STATE =
{
  "version": 2,
  "slug": "editorial-source-discovery",
  "dir": "2026-10-20-editorial-source-discovery--wip",
  "title": "Редакционный поиск источников и корректировка методологии",
  "mode": "full",
  "depth": "normal",
  "tier": "T1",
  "briefFile": "2026-10-20-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": "3f7765e",
  "startedAt": "2026-10-20T21:57:59+03:00",
  "updatedAt": "2026-10-20T23:46:20+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-20T21:57:59+03:00",
      "finishedAt": "2026-10-20T21:58:59+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-20T21:58:59+03:00",
      "finishedAt": "2026-10-20T22:04:42+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-10-20T22:04:42+03:00",
      "finishedAt": "2026-10-20T22:04:42+03:00",
      "note": "полный автомат — самобрифинг"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-20T22:04:42+03:00",
      "finishedAt": "2026-10-20T22:20:43+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-10-20T22:25:12+03:00",
      "finishedAt": "2026-10-20T22:25:12+03:00"
    },
    {
      "id": "build",
      "status": "active",
      "startedAt": "2026-10-20T22:25:12+03:00"
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
    "total": 9,
    "done": 2,
    "inTicket": 7,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Инструмент обнаружения источников и реестр лент",
      "requirements": [
        "R01",
        "R02",
        "R09i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/source-discovery.js",
        "calc/input/discovery/",
        "docs/source-discovery.md",
        "tests/source-discovery.test.js"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "done",
      "startedAt": "2026-10-20T22:25:12+03:00",
      "finishedAt": "2026-10-20T23:45:56+03:00",
      "retries": 0,
      "repairs": 2,
      "repairFindings": [
        "исполнитель вернулся без контракта и без файлов — дозапрос в тот же контекст",
        "BLOCKING: синтетический пул по пути реальной недели 2026-10-18 + тесты привязаны к его содержимому"
      ],
      "tests": {
        "passed": 800,
        "failed": 0
      },
      "commit": "1dc5604"
    },
    {
      "id": "02",
      "title": "Предложение для недели 2026-10-18 и корректировка методологии",
      "requirements": [
        "R02",
        "R03",
        "R04",
        "R05",
        "R06",
        "R07i",
        "R08i"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "docs/source-proposals/",
        "data/discovery/",
        "calc/input/discovery/2026-10-18.json",
        "docs/governance.md",
        "docs/adr/",
        "AGENTS.md"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "in-progress",
      "retries": 0,
      "repairs": 0,
      "startedAt": "2026-10-20T23:46:20+03:00"
    }
  ],
  "tests": {
    "passed": 800,
    "failed": 0
  },
  "debt": {
    "placeholders": [],
    "assumptions": [
      "ASSUMPTION — принято за пользователя: «скорректируй методологию» = процедура (governance §10.1 + ADR 0065), не числа методологии",
      "ASSUMPTION — принято за пользователя: выбор из предложенного списка и применение к неделе 2026-10-18 — шаг редактора после сборки; неделя в прогоне не пересчитывается",
      "ASSUMPTION — принято за пользователя: поиск без платных API — публичные ленты и HTTP-fetch; платный поисковый API — адаптер, если понадобится"
    ],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "found": 4,
    "fixed": 4,
    "deferred": 0,
    "items": [
      "spec §3: оговорка — calc.js --write в этом прогоне не выполняется",
      "spec §1/§2: единый машинный реестр feeds.json + зеркало в docs, паритет тестом",
      "spec: имя брифа 2026-10-20-brief.md",
      "spec: 'Открытые места' — формат реестра решён, вопросов к пользователю нет"
    ]
  },
  "concerns": [
    "calc/source-discovery.js:404-434 · scanFeeds без таймаута/AbortController — зависшая лента вешает CLI",
    "tests/source-discovery.test.js:414-434 · паритет документ↔feeds.json не пинит колонку name",
    "calc/source-discovery.js:95-101 · regionalEligible — зеркало правила engine без пина паритета",
    "calc/source-discovery.js:393-397 + docs/source-discovery.md:32 · HTML-режим: ссылки без даты проходят как inWindow, документ описывает иначе"
  ],
  "blind": null,
  "beats": [
    "2026-10-20T21:57:59+03:00",
    "2026-10-20T21:58:59+03:00",
    "2026-10-20T22:01:59+03:00",
    "2026-10-20T22:04:34+03:00",
    "2026-10-20T22:04:42+03:00",
    "2026-10-20T22:20:08+03:00",
    "2026-10-20T22:20:43+03:00",
    "2026-10-20T22:23:33+03:00",
    "2026-10-20T22:23:34+03:00",
    "2026-10-20T22:24:29+03:00",
    "2026-10-20T22:24:46+03:00",
    "2026-10-20T22:25:12+03:00",
    "2026-10-20T22:50:53+03:00",
    "2026-10-20T23:26:05+03:00",
    "2026-10-20T23:34:22+03:00",
    "2026-10-20T23:45:56+03:00",
    "2026-10-20T23:46:19+03:00",
    "2026-10-20T23:46:20+03:00"
  ],
  "rev": 25,
  "waiting": null,
  "waits": [],
  "log": [
    {
      "t": "2026-10-20T21:57:59+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-20T21:58:59+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-20T22:04:34+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 3
    },
    {
      "t": "2026-10-20T22:04:42+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "skip",
      "note": "полный автомат — самобрифинг"
    },
    {
      "t": "2026-10-20T22:04:42+03:00",
      "k": "gate",
      "g": "G1",
      "ok": true,
      "open": 0,
      "total": 9
    },
    {
      "t": "2026-10-20T22:04:42+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-10-20T22:20:08+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 4,
      "fixed": 4,
      "deferred": 0
    },
    {
      "t": "2026-10-20T22:20:43+03:00",
      "k": "gate",
      "g": "G1",
      "ok": true,
      "open": 0,
      "total": 9
    },
    {
      "t": "2026-10-20T22:20:43+03:00",
      "k": "stage",
      "id": "spec",
      "act": "done"
    },
    {
      "t": "2026-10-20T22:23:33+03:00",
      "k": "tier",
      "v": "T1"
    },
    {
      "t": "2026-10-20T22:23:33+03:00",
      "k": "tickets",
      "n": 2
    },
    {
      "t": "2026-10-20T22:23:34+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-10-20T22:25:12+03:00",
      "k": "stage",
      "id": "build",
      "act": "start"
    },
    {
      "t": "2026-10-20T22:25:12+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-20T22:50:53+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "repair",
      "note": "исполнитель вернулся без контракта и без файлов — дозапрос в тот же контекст"
    },
    {
      "t": "2026-10-20T23:26:05+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "review"
    },
    {
      "t": "2026-10-20T23:34:22+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "repair",
      "note": "BLOCKING: синтетический пул по пути реальной недели 2026-10-18 + тесты привязаны к его содержимому"
    },
    {
      "t": "2026-10-20T23:34:22+03:00",
      "k": "add",
      "key": "concerns",
      "n": 4
    },
    {
      "t": "2026-10-20T23:45:56+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "done",
      "tests": {
        "passed": 800,
        "failed": 0
      }
    },
    {
      "t": "2026-10-20T23:46:19+03:00",
      "k": "tickets",
      "n": 2
    },
    {
      "t": "2026-10-20T23:46:20+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-10-20T23:46:20+03:00",
      "k": "ticket",
      "ids": [
        "02"
      ],
      "act": "start"
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«Отбор источников — редакционная процедура.»",
      "status": "done"
    },
    {
      "id": "R02",
      "text": "«Необходимо добавить возможность, чтобы модель искала статьи в интернете, сканировала ленты и предлагала готовые URL»",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«Изменения опубликованной недели 2026-10-18 требуют конкретных, существующих публикаций.»",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«предложи этот список с заполненными атрибутами редактору»",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«а редактор отберет из этих статей наиболее подходящие»",
      "status": "in-ticket"
    },
    {
      "id": "R06",
      "text": "«Скорректируй методологию проекта»",
      "status": "in-ticket"
    },
    {
      "id": "R07i",
      "text": "(подразумевается) «с заполненными атрибутами» = атрибуты R55-схемы проекта (id, title{ru,en}, domain, url, publication_date, accessed_date, source_type, cluster_id, state_affiliated) + соответствие критерию/региону; окно недели 2026-10-18…",
      "status": "in-ticket"
    },
    {
      "id": "R08i",
      "text": "(подразумевается) «предлагала готовые URL» = URL проверены на существование (живая ссылка), иначе список — не «готовые URL»",
      "status": "in-ticket"
    },
    {
      "id": "R09i",
      "text": "(подразумевается) новая возможность не ломает конвенции репо: ноль зависимостей (stdlib/браузер), сеть только в инструменте поиска, всё остальное — чистые модули с тестами",
      "status": "done"
    }
  ],
  "gates": {
    "G1": {
      "ok": true,
      "at": "2026-10-20T22:20:43+03:00",
      "open": 0,
      "total": 9
    },
    "G2": {
      "ok": true,
      "at": "2026-10-20T22:20:08+03:00",
      "found": 4,
      "fixed": 4,
      "deferred": 0
    },
    "G3": {
      "ok": true,
      "at": "2026-10-20T23:46:20+03:00",
      "problems": 0
    }
  },
  "result": null
}
