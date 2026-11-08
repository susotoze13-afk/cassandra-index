window.STATE =
{
  "version": 2,
  "slug": "code-review-fix",
  "dir": "2026-11-07-code-review-fix",
  "title": "Ревью кода 4.0, устранение недостатков и выкат в master",
  "mode": "full",
  "depth": "normal",
  "tier": "T1",
  "briefFile": "2026-11-07-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:\\Users\\1\\.agents\\skills\\autopilot",
  "baseCommit": "220fdf5",
  "startedAt": "2026-11-07T09:32:04+03:00",
  "updatedAt": "2026-11-07T10:47:02+03:00",
  "finishedAt": "2026-11-07T10:47:02+03:00",
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
      "status": "done",
      "startedAt": "2026-11-07T09:40:24+03:00",
      "finishedAt": "2026-11-07T10:33:48+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-11-07T10:33:48+03:00",
      "finishedAt": "2026-11-07T10:33:48+03:00"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-11-07T10:33:55+03:00",
      "finishedAt": "2026-11-07T10:33:55+03:00"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-11-07T10:33:48+03:00",
      "finishedAt": "2026-11-07T10:38:17+03:00"
    },
    {
      "id": "final",
      "status": "done",
      "startedAt": "2026-11-07T10:38:19+03:00",
      "finishedAt": "2026-11-07T10:47:02+03:00"
    }
  ],
  "requirements": {
    "total": 5,
    "done": 3,
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
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "startedAt": "2026-11-07T09:42:23+03:00",
      "finishedAt": "2026-11-07T10:33:28+03:00"
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
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "startedAt": "2026-11-07T09:50:05+03:00",
      "finishedAt": "2026-11-07T10:33:29+03:00"
    }
  ],
  "tests": {
    "passed": 977,
    "failed": 0
  },
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
  "blind": {
    "checked": 4,
    "matched": 4,
    "mismatches": []
  },
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
    "2026-11-07T09:41:27+03:00",
    "2026-11-07T09:41:37+03:00",
    "2026-11-07T09:42:23+03:00",
    "2026-11-07T09:50:05+03:00",
    "2026-11-07T10:33:28+03:00",
    "2026-11-07T10:33:29+03:00",
    "2026-11-07T10:33:30+03:00",
    "2026-11-07T10:33:48+03:00",
    "2026-11-07T10:33:55+03:00",
    "2026-11-07T10:33:56+03:00",
    "2026-11-07T10:37:49+03:00",
    "2026-11-07T10:38:17+03:00",
    "2026-11-07T10:38:19+03:00",
    "2026-11-07T10:41:02+03:00",
    "2026-11-07T10:47:01+03:00",
    "2026-11-07T10:47:02+03:00"
  ],
  "rev": 28,
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
    },
    {
      "t": "2026-11-07T09:42:23+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "start"
    },
    {
      "t": "2026-11-07T09:50:05+03:00",
      "k": "ticket",
      "ids": [
        "02"
      ],
      "act": "start"
    },
    {
      "t": "2026-11-07T10:33:28+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "done"
    },
    {
      "t": "2026-11-07T10:33:29+03:00",
      "k": "ticket",
      "ids": [
        "02"
      ],
      "act": "done"
    },
    {
      "t": "2026-11-07T10:33:30+03:00",
      "k": "tests",
      "passed": 977,
      "failed": 0
    },
    {
      "t": "2026-11-07T10:33:48+03:00",
      "k": "stage",
      "id": "review",
      "act": "start"
    },
    {
      "t": "2026-11-07T10:33:55+03:00",
      "k": "stage",
      "id": "build",
      "act": "done"
    },
    {
      "t": "2026-11-07T10:33:56+03:00",
      "k": "stage",
      "id": "review",
      "act": "start"
    },
    {
      "t": "2026-11-07T10:37:49+03:00",
      "k": "add",
      "key": "report",
      "n": 2
    },
    {
      "t": "2026-11-07T10:37:49+03:00",
      "k": "add",
      "key": "report",
      "n": 2
    },
    {
      "t": "2026-11-07T10:38:17+03:00",
      "k": "stage",
      "id": "review",
      "act": "done"
    },
    {
      "t": "2026-11-07T10:38:19+03:00",
      "k": "stage",
      "id": "final",
      "act": "start"
    },
    {
      "t": "2026-11-07T10:41:02+03:00",
      "k": "gate",
      "g": "G4",
      "ok": true,
      "checked": 4,
      "matched": 4
    },
    {
      "t": "2026-11-07T10:47:01+03:00",
      "k": "tests",
      "passed": 977,
      "failed": 0
    },
    {
      "t": "2026-11-07T10:47:02+03:00",
      "k": "finish",
      "result": "Ревью диффа 4.0, ремонт F1–F4 (+5 тестов, 977/0), G4 без расхождений, push в master"
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«Проведи ревью кода»",
      "status": "done"
    },
    {
      "id": "R02",
      "text": "«устрани недостатки»",
      "status": "done"
    },
    {
      "id": "R03",
      "text": "«запуш в мастер»",
      "status": "open"
    },
    {
      "id": "R04i",
      "text": "(подразумевается) после правок проект остаётся рабочим",
      "status": "done"
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
    },
    "G4": {
      "ok": true,
      "at": "2026-11-07T10:41:02+03:00",
      "checked": 4,
      "matched": 4
    }
  },
  "result": "Ревью диффа 4.0, ремонт F1–F4 (+5 тестов, 977/0), G4 без расхождений, push в master",
  "report": [
    "F3 односторонняя: удаление старых schema/vN производно от PUBLIC_SCHEMA_VERSION (staleSchemaDirs), но создание/запись схем литеральны (schema/v2 — public-export.js:504,509). При бампе на v3 mkdir v2 удалит v2 как stale и запись упадёт — бамп и так ручной (правка литералов + \\), но комментарий обещает чистую смену версии.",
    "calc/public-export.js:504,509",
    "node article-build.js падает (exit 1) на выпуске 2026-10-25: ворото FORBIDDEN 'шаг к' (зеркало PRD §11.5) vs фраза 'шаг к снижению напряжения' в опубликованной статье. Предсуществует в master с faca399, blog собирается (gate не применяет) — вред только неработоспособная задокументированная команда. Лечение редакционное/спецификационное.",
    "article-build.js:19, docs/articles/weekly/2026-10-25.md:24"
  ]
}
