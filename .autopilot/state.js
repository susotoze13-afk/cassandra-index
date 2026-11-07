window.STATE =
{
  "version": 2,
  "slug": "code-review-fix",
  "dir": "2026-11-07-code-review-fix--wip",
  "title": "Ревью кода 4.0, устранение недостатков и выкат в master",
  "mode": "full",
  "depth": "normal",
  "tier": "T1",
  "briefFile": "2026-11-07-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:\\Users\\1\\.agents\\skills\\autopilot",
  "baseCommit": null,
  "startedAt": "2026-11-07T09:32:04+03:00",
  "updatedAt": "2026-11-07T09:41:27+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-11-07T09:32:04+03:00",
      "finishedAt": "2026-11-07T09:32:47+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-11-07T09:32:47+03:00",
      "finishedAt": "2026-11-07T09:40:24+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-11-07T09:34:25+03:00",
      "finishedAt": "2026-11-07T09:34:25+03:00",
      "note": "полный автомат — самобрифинг"
    },
    {
      "id": "spec",
      "status": "active",
      "startedAt": "2026-11-07T09:40:24+03:00"
    },
    {
      "id": "plan",
      "status": "pending"
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
    "total": 5,
    "done": 0,
    "inTicket": 0,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Ревью кода диффа сборки 4.0",
      "requirements": [
        "R01"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/",
        "js/",
        "build.js",
        "article-build.js",
        "blog-build.js",
        "indices-audit-build.js",
        "tests/",
        "b2bca23..b60089c",
        ".autopilot/2026-11-07-code-review-fix--wip/review-findings.md"
      ],
      "review": "нет",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "02",
      "title": "Ремонт находок ревью",
      "requirements": [
        "R02",
        "R04i"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "review-findings.md",
        "tests/",
        "js/**"
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
    "assumptions": [
      "R01: ревью = дифф сборки 4.0 по кодовым путям (b558ae9..HEAD), data/docs вне объёма",
      "R02: чинятся только находки «исправить сейчас»; стиль — в отчёт; редакционные пункты PROGRESS вне рамок"
    ],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "found": 1,
    "fixed": 1,
    "deferred": 0,
    "items": [
      "G2: противоречивые границы диффа (b558ae9..HEAD vs b2bca23..b60089c) — унифицировано на b2bca23..b60089c"
    ]
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-11-07T09:32:04+03:00",
    "2026-11-07T09:32:47+03:00",
    "2026-11-07T09:33:26+03:00",
    "2026-11-07T09:34:25+03:00",
    "2026-11-07T09:34:26+03:00",
    "2026-11-07T09:40:23+03:00",
    "2026-11-07T09:40:24+03:00",
    "2026-11-07T09:41:25+03:00",
    "2026-11-07T09:41:26+03:00",
    "2026-11-07T09:41:27+03:00"
  ],
  "rev": 12,
  "waiting": null,
  "waits": [],
  "log": [
    {
      "t": "2026-11-07T09:32:04+03:00",
      "k": "init"
    },
    {
      "t": "2026-11-07T09:32:47+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-11-07T09:34:25+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "skip",
      "note": "полный автомат — самобрифинг"
    },
    {
      "t": "2026-11-07T09:34:26+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 2
    },
    {
      "t": "2026-11-07T09:40:23+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 1,
      "fixed": 1,
      "deferred": 0
    },
    {
      "t": "2026-11-07T09:40:24+03:00",
      "k": "gate",
      "g": "G1",
      "ok": false,
      "open": 5,
      "total": 5
    },
    {
      "t": "2026-11-07T09:40:24+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-11-07T09:41:25+03:00",
      "k": "tickets",
      "n": 2
    },
    {
      "t": "2026-11-07T09:41:26+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-11-07T09:41:27+03:00",
      "k": "tier",
      "v": "T1"
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«Проведи ревью кода»",
      "status": "open"
    },
    {
      "id": "R02",
      "text": "«устрани недостатки»",
      "status": "open"
    },
    {
      "id": "R03",
      "text": "«запуш в мастер»",
      "status": "open"
    },
    {
      "id": "R04i",
      "text": "(подразумевается) после правок проект остаётся рабочим",
      "status": "open"
    },
    {
      "id": "R05i",
      "text": "(подразумевается) пуш содержит только код этой сборки",
      "status": "open"
    }
  ],
  "gates": {
    "G2": {
      "ok": true,
      "at": "2026-11-07T09:40:23+03:00",
      "found": 1,
      "fixed": 1,
      "deferred": 0
    },
    "G1": {
      "ok": false,
      "at": "2026-11-07T09:40:24+03:00",
      "open": 5,
      "total": 5
    },
    "G3": {
      "ok": true,
      "at": "2026-11-07T09:41:26+03:00",
      "problems": 0
    }
  },
  "result": null
}
