window.STATE =
{
  "version": 2,
  "slug": "source-quotes",
  "dir": "2026-10-18-source-quotes--wip",
  "title": "Источники с цитатами: хранение и выкат на прод",
  "mode": "semi",
  "depth": "normal",
  "tier": "T2",
  "briefFile": "2026-10-18-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": null,
  "startedAt": "2026-10-18T16:05:09+03:00",
  "updatedAt": "2026-10-18T16:16:46+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-18T16:05:09+03:00",
      "finishedAt": "2026-10-18T16:05:37+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-18T16:05:37+03:00",
      "finishedAt": "2026-10-18T16:07:53+03:00"
    },
    {
      "id": "briefing",
      "status": "pending"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-18T16:07:53+03:00",
      "finishedAt": "2026-10-18T16:16:00+03:00"
    },
    {
      "id": "plan",
      "status": "active",
      "startedAt": "2026-10-18T16:16:00+03:00"
    },
    {
      "id": "build",
      "status": "pending"
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
    "done": 0,
    "inTicket": 9,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Цитаты источника: схема, дословная проверка, ворота записи",
      "requirements": [
        "R01",
        "R01.1",
        "R03i",
        "R04i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/quotes.js",
        "calc/calc.js",
        "tests/quotes.test.js",
        "tests/sources-schema.test.js"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "02",
      "title": "Заднее заполнение цитат недель 09-20 и 09-27",
      "requirements": [
        "R01",
        "R01.1",
        "R01.2",
        "R03i"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "calc/input/2026-09-20.json",
        "calc/input/2026-09-27.json",
        "data/2026-09-20/",
        "data/2026-09-27/"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "03",
      "title": "events[] в якорях калибровки + ADR 0039",
      "requirements": [
        "G01",
        "G01.1",
        "G01.2",
        "G02"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/input/anchors/",
        "docs/adr/0039-*.md",
        "tests/calibrate.test.js"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "04",
      "title": "Показ цитат: аккордеон источников и витрина доверия",
      "requirements": [
        "R05i",
        "R05i.1",
        "R05i.2",
        "R05i.3",
        "R04i"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "js/data.js",
        "js/sections/drivers.js",
        "js/sections/regions.js",
        "js/sections/trust.js",
        "js/i18n.js",
        "css/styles.css",
        "js/bundle*.js",
        "tests/drivers.test.js",
        "tests/trust.test.js",
        "tests/data.test.js"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "05",
      "title": "Проверка живого сайта после выката",
      "requirements": [
        "R02",
        "R02.1",
        "R06i",
        "R07i"
      ],
      "blockedBy": [
        "02",
        "03",
        "04"
      ],
      "wave": 3,
      "zone": [
        "calc/live-check.js",
        "tests/live-check.test.js"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    }
  ],
  "tests": null,
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "found": 3,
    "fixed": 3,
    "deferred": 0,
    "items": [
      "охват 2/12 недель объяснён (корпус есть только у двух)"
    ]
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-10-18T16:05:09+03:00",
    "2026-10-18T16:05:37+03:00",
    "2026-10-18T16:06:00+03:00",
    "2026-10-18T16:07:27+03:00",
    "2026-10-18T16:07:52+03:00",
    "2026-10-18T16:07:53+03:00",
    "2026-10-18T16:12:44+03:00",
    "2026-10-18T16:15:59+03:00",
    "2026-10-18T16:16:00+03:00",
    "2026-10-18T16:16:44+03:00",
    "2026-10-18T16:16:45+03:00",
    "2026-10-18T16:16:46+03:00"
  ],
  "rev": 14,
  "waiting": null,
  "waits": [
    {
      "kind": "briefing",
      "from": "2026-10-18T16:06:00+03:00",
      "to": "2026-10-18T16:07:52+03:00"
    },
    {
      "kind": "action",
      "from": "2026-10-18T16:12:44+03:00",
      "to": "2026-10-18T16:15:59+03:00"
    }
  ],
  "log": [
    {
      "t": "2026-10-18T16:05:09+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-18T16:05:37+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-18T16:06:00+03:00",
      "k": "ask",
      "kind": "briefing",
      "note": "4 вопроса: слой хранения цитат, показ на сайте, backfill недель 09-20/09-27, пункты прошлой сборки"
    },
    {
      "t": "2026-10-18T16:07:27+03:00",
      "k": "ask",
      "kind": "briefing",
      "note": "уточнение по прошлой сборке: входят ли k×severity (ранее вынесено за рамки) или только events[] + ADR"
    },
    {
      "t": "2026-10-18T16:07:52+03:00",
      "k": "answered",
      "kind": "briefing"
    },
    {
      "t": "2026-10-18T16:07:53+03:00",
      "k": "gate",
      "g": "G1",
      "ok": false,
      "open": 9,
      "total": 9
    },
    {
      "t": "2026-10-18T16:07:53+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-10-18T16:12:44+03:00",
      "k": "ask",
      "kind": "action",
      "note": "G01: события в якорях сдвинут значения — спросить, допустим ли пересчёт k и опубликованных чисел"
    },
    {
      "t": "2026-10-18T16:15:59+03:00",
      "k": "answered",
      "kind": "action"
    },
    {
      "t": "2026-10-18T16:15:59+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 3,
      "fixed": 3,
      "deferred": 0
    },
    {
      "t": "2026-10-18T16:16:00+03:00",
      "k": "stage",
      "id": "plan",
      "act": "start"
    },
    {
      "t": "2026-10-18T16:16:44+03:00",
      "k": "tier",
      "v": "T2"
    },
    {
      "t": "2026-10-18T16:16:45+03:00",
      "k": "tickets",
      "n": 5
    },
    {
      "t": "2026-10-18T16:16:46+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«хранение информации об источниках с циататми»",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«выкатить на пром»",
      "status": "in-ticket"
    },
    {
      "id": "R03i",
      "text": "(подразумевается) цитата — дословный фрагмент источника, проверяемый",
      "status": "in-ticket"
    },
    {
      "id": "R04i",
      "text": "(подразумевается) старые недели и их снапшоты остаются валидными",
      "status": "in-ticket"
    },
    {
      "id": "R05i",
      "text": "(подразумевается) цитаты видны пользователю, а не только лежат в data/",
      "status": "in-ticket"
    },
    {
      "id": "R06i",
      "text": "(подразумевается) node --test зелёный после правок",
      "status": "in-ticket"
    },
    {
      "id": "R07i",
      "text": "(подразумевается) выкат не ломает прод-сайт (12 недель, регион, витрина)",
      "status": "in-ticket"
    },
    {
      "id": "G01",
      "text": "«С прошлой сборки остались доработки. Берем»",
      "status": "in-ticket"
    },
    {
      "id": "G02",
      "text": "«С прошлой сборки остались доработки. Берем»",
      "status": "in-ticket"
    }
  ],
  "gates": {
    "G1": {
      "ok": false,
      "at": "2026-10-18T16:07:53+03:00",
      "open": 9,
      "total": 9
    },
    "G2": {
      "ok": true,
      "at": "2026-10-18T16:15:59+03:00",
      "found": 3,
      "fixed": 3,
      "deferred": 0
    },
    "G3": {
      "ok": true,
      "at": "2026-10-18T16:16:46+03:00",
      "problems": 0
    }
  },
  "result": null
}
