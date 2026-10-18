window.STATE =
{
  "version": 2,
  "slug": "severity-calibration",
  "dir": "2026-10-18-severity-calibration--wip",
  "title": "Калибровка severity-весов: грид severity-наборов в calibrate.js",
  "mode": "semi",
  "depth": "normal",
  "tier": "T0",
  "briefFile": "2026-10-18-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": "051e015",
  "startedAt": "2026-10-18T12:26:34+03:00",
  "updatedAt": "2026-10-18T15:48:08+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-18T12:26:34+03:00",
      "finishedAt": "2026-10-18T12:26:51+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-18T12:26:51+03:00",
      "finishedAt": "2026-10-18T12:33:59+03:00"
    },
    {
      "id": "briefing",
      "status": "done",
      "startedAt": "2026-10-18T12:34:03+03:00",
      "finishedAt": "2026-10-18T12:34:03+03:00",
      "note": "округа 1: форма грида + применение выбранного набора — закрыты пользователем"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-18T12:33:59+03:00",
      "finishedAt": "2026-10-18T12:45:41+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-10-18T12:45:41+03:00",
      "finishedAt": "2026-10-18T12:47:12+03:00"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-10-18T12:47:12+03:00",
      "finishedAt": "2026-10-18T15:34:36+03:00"
    },
    {
      "id": "review",
      "status": "active",
      "startedAt": "2026-10-18T15:34:36+03:00"
    },
    {
      "id": "final",
      "status": "pending"
    }
  ],
  "requirements": {
    "total": 8,
    "done": 0,
    "inTicket": 7,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 1,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Калибровка severity-весов: грид кандидатов, оценка по цепочке, выбор",
      "requirements": [
        "R01",
        "R01.1",
        "R01.2",
        "R02",
        "R03",
        "R05",
        "R04",
        "R06i",
        "R07i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/calibrate.js",
        "calc/calc.js",
        "calc/params.js",
        "tests/calibrate.test.js",
        "docs/calibration-journal.md"
      ],
      "review": "нет (T0: whole-branch review — его ревью)",
      "model": "сильная",
      "status": "in-progress",
      "startedAt": "2026-10-18T12:47:12+03:00",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "F1",
      "title": "Ремонт ветки: шов шага недели, метрика выбора, тесты и точность",
      "requirements": [
        "R01",
        "R01.1",
        "R01.2",
        "R03",
        "R05",
        "D03"
      ],
      "blockedBy": [],
      "wave": 2,
      "zone": [
        "calc/week-step.js",
        "calc/calc.js",
        "calc/calibrate.js",
        "calc/engine.js",
        "tests/calibrate.test.js",
        "docs/calibration-journal.md"
      ],
      "review": "да — ремонт ветки",
      "model": "сильная",
      "status": "repair",
      "retries": 0,
      "repairs": 1,
      "startedAt": "2026-10-18T15:37:24+03:00",
      "repairFindings": [
        "5 условий ре-ревью: fallback prevIndex, chosen.maxDrift, CLI-формулировка 2.0, косвенный цикл sensitivity, форма контракта"
      ]
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
    "found": 2,
    "fixed": 2,
    "deferred": 0,
    "items": [
      "weeklists-прогон: добавлена строка в Решение (сдан ccaf356, вне рамок)",
      "роль verify-якорей: добавлена явная переинтерпретация (ветка 1, Дополнение брифа)"
    ]
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-10-18T12:26:34+03:00",
    "2026-10-18T12:26:51+03:00",
    "2026-10-18T12:27:01+03:00",
    "2026-10-18T12:28:29+03:00",
    "2026-10-18T12:33:47+03:00",
    "2026-10-18T12:33:59+03:00",
    "2026-10-18T12:34:03+03:00",
    "2026-10-18T12:38:08+03:00",
    "2026-10-18T12:45:41+03:00",
    "2026-10-18T12:46:29+03:00",
    "2026-10-18T12:46:30+03:00",
    "2026-10-18T12:46:52+03:00",
    "2026-10-18T12:47:02+03:00",
    "2026-10-18T12:47:12+03:00",
    "2026-10-18T15:34:36+03:00",
    "2026-10-18T15:37:23+03:00",
    "2026-10-18T15:37:24+03:00",
    "2026-10-18T15:48:08+03:00"
  ],
  "rev": 23,
  "waiting": null,
  "waits": [
    {
      "kind": "briefing",
      "from": "2026-10-18T12:28:29+03:00",
      "to": "2026-10-18T12:33:47+03:00"
    },
    {
      "kind": "briefing",
      "from": "2026-10-18T12:38:08+03:00",
      "to": "2026-10-18T12:45:41+03:00"
    }
  ],
  "log": [
    {
      "t": "2026-10-18T12:26:34+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-18T12:26:51+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-18T12:28:29+03:00",
      "k": "ask",
      "kind": "briefing",
      "note": "два вопроса — форма грида severity и применять ли найденный набор к PARAMS"
    },
    {
      "t": "2026-10-18T12:33:47+03:00",
      "k": "answered",
      "kind": "briefing"
    },
    {
      "t": "2026-10-18T12:33:59+03:00",
      "k": "gate",
      "g": "G1",
      "ok": false,
      "open": 8,
      "total": 8
    },
    {
      "t": "2026-10-18T12:33:59+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-10-18T12:34:03+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "done"
    },
    {
      "t": "2026-10-18T12:38:08+03:00",
      "k": "ask",
      "kind": "briefing",
      "note": "развилка после разведки: у всех 10 якорей нет events[] — грид severity на них не дифференцируется"
    },
    {
      "t": "2026-10-18T12:45:41+03:00",
      "k": "answered",
      "kind": "briefing"
    },
    {
      "t": "2026-10-18T12:45:41+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 2,
      "fixed": 2,
      "deferred": 0
    },
    {
      "t": "2026-10-18T12:45:41+03:00",
      "k": "stage",
      "id": "plan",
      "act": "start"
    },
    {
      "t": "2026-10-18T12:46:29+03:00",
      "k": "tier",
      "v": "T0"
    },
    {
      "t": "2026-10-18T12:46:30+03:00",
      "k": "tickets",
      "n": 1
    },
    {
      "t": "2026-10-18T12:46:30+03:00",
      "k": "gate",
      "g": "G3",
      "ok": false,
      "problems": 1
    },
    {
      "t": "2026-10-18T12:46:52+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-10-18T12:47:12+03:00",
      "k": "stage",
      "id": "build",
      "act": "start"
    },
    {
      "t": "2026-10-18T12:47:12+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T15:34:36+03:00",
      "k": "stage",
      "id": "review",
      "act": "start"
    },
    {
      "t": "2026-10-18T15:37:23+03:00",
      "k": "tickets",
      "n": 2
    },
    {
      "t": "2026-10-18T15:37:23+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-10-18T15:37:24+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T15:48:08+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "repair",
      "note": "5 условий ре-ревью: fallback prevIndex, chosen.maxDrift, CLI-формулировка 2.0, косвенный цикл sensitivity, форма контракта"
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«расширь calc/calibrate.js гридом severity-наборов»",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«rolling-origin 7 select / 3 verify, verify-якоря»",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«чувствительность ±20 %»",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«журнал docs/calibration-journal.md»",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«калибровка severity (severityValues в calc/params.js)»",
      "status": "in-ticket"
    },
    {
      "id": "R06i",
      "text": "(подразумевается) при сдвиге чисел — актуализировать пины tests/data.test.js и tests/sensitivity.test.js",
      "status": "in-ticket"
    },
    {
      "id": "R07i",
      "text": "(подразумевается) node --test зелёный после всех правок",
      "status": "in-ticket"
    },
    {
      "id": "R08i",
      "text": "(подразумевается) один коммит оркестратора; пуш — за пользователем; исполнители не коммитят",
      "status": "deferred",
      "why": "процессная конвенция репо (AGENTS.md/interfaces.md), не таск"
    }
  ],
  "gates": {
    "G1": {
      "ok": false,
      "at": "2026-10-18T12:33:59+03:00",
      "open": 8,
      "total": 8
    },
    "G2": {
      "ok": true,
      "at": "2026-10-18T12:45:41+03:00",
      "found": 2,
      "fixed": 2,
      "deferred": 0
    },
    "G3": {
      "ok": true,
      "at": "2026-10-18T15:37:23+03:00",
      "problems": 0
    }
  },
  "result": null
}
