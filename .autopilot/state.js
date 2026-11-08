window.STATE =
{
  "version": 2,
  "slug": "index-2026-11-08",
  "dir": "2026-11-08-index-2026-11-08--wip",
  "title": "Расчёт индекса за 02-08.11.2026: без слепых регионов, минимум слепых критериев",
  "mode": "full",
  "depth": "normal",
  "tier": "T3",
  "briefFile": "2026-11-08-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:\\Users\\1\\.agents\\skills\\autopilot",
  "baseCommit": null,
  "startedAt": "2026-11-08T09:00:45+03:00",
  "updatedAt": "2026-11-08T10:27:52+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-11-08T09:00:45+03:00",
      "finishedAt": "2026-11-08T09:03:06+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-11-08T09:03:06+03:00",
      "finishedAt": "2026-11-08T09:05:51+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-11-08T09:05:51+03:00",
      "finishedAt": "2026-11-08T09:08:20+03:00",
      "note": "полный автомат — самобрифинг"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-11-08T09:09:48+03:00",
      "finishedAt": "2026-11-08T10:26:27+03:00"
    },
    {
      "id": "plan",
      "status": "active",
      "startedAt": "2026-11-08T10:26:27+03:00"
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
    "total": 7,
    "done": 0,
    "inTicket": 7,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Источники недели: Д1 и Д5 (конфликты и военные сигналы)",
      "requirements": [
        "R01",
        "R02",
        "R03"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/input/drafts/2026-11-08/part-d1-d5.json"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "02",
      "title": "Источники недели: Д2, Д3, Д6 (ядерное, дипломатия, мобилизация)",
      "requirements": [
        "R01",
        "R02",
        "R03"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/input/drafts/2026-11-08/part-d2-d3-d6.json"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "03",
      "title": "Источники недели: Д4, Д7, Д8 (рынки, союзы, гуманитарка)",
      "requirements": [
        "R01",
        "R02",
        "R03"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/input/drafts/2026-11-08/part-d4-d7-d8.json"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "04",
      "title": "Источники недели: Д9 (предвестники)",
      "requirements": [
        "R01",
        "R02",
        "R03"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/input/drafts/2026-11-08/part-d9.json"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "05",
      "title": "Вход недели: слияние, покрытие 12 регионов, страновой оверлей",
      "requirements": [
        "R01",
        "R02",
        "R03",
        "R07i"
      ],
      "blockedBy": [
        "01",
        "02",
        "03",
        "04"
      ],
      "wave": 2,
      "zone": [
        "calc/input/2026-11-08.json",
        "calc/input/countries/2026-11-08.json",
        "calc/input/drafts/2026-11-08/"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "06",
      "title": "Сиды недели: global, trend, drivers, 12 region-*",
      "requirements": [
        "R01",
        "R04i"
      ],
      "blockedBy": [
        "05"
      ],
      "wave": 3,
      "zone": [
        "data/2026-11-08/global.js",
        "trend.js",
        "drivers.js",
        "region-*.js"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "07",
      "title": "Запись недели, производные, пины, зелёные тесты",
      "requirements": [
        "R01",
        "R04i",
        "R05i",
        "R06i",
        "R07i"
      ],
      "blockedBy": [
        "06"
      ],
      "wave": 4,
      "zone": [
        "calc/calc.js",
        "data/latest.js"
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
      "R01: неделя 2026-11-08, окно W-7..W = 01.11-08.11 (конвенция репо); 02.11-08.11 - окно сбора новостей",
      "R02: цель - все 12 регионов v2 background:false, приоритет signals >= 2",
      "R03: минимум слепых критериев = максимум достижимого под воротами независимости; слепые - с blindReasons",
      "R04i: пуш в master = выкат на cassindex.ru - отдельный вопрос перед пушем",
      "R07i: страновой слой 11-08 включаю (RU/UA), как на 10-25/11-01"
    ],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "found": 5,
    "fixed": 5,
    "items": [
      "лишнее: backtest/ledger/blog-build осознанно оставлены как часть «как предыдущие недели» (родитель R04i), не отдельное требование"
    ]
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-11-08T09:00:45+03:00",
    "2026-11-08T09:03:06+03:00",
    "2026-11-08T09:05:50+03:00",
    "2026-11-08T09:05:51+03:00",
    "2026-11-08T09:08:19+03:00",
    "2026-11-08T09:08:20+03:00",
    "2026-11-08T09:09:48+03:00",
    "2026-11-08T10:26:26+03:00",
    "2026-11-08T10:26:27+03:00",
    "2026-11-08T10:27:51+03:00",
    "2026-11-08T10:27:52+03:00"
  ],
  "rev": 13,
  "waiting": null,
  "waits": [],
  "log": [
    {
      "t": "2026-11-08T09:00:45+03:00",
      "k": "init"
    },
    {
      "t": "2026-11-08T09:03:06+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-11-08T09:05:51+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "start"
    },
    {
      "t": "2026-11-08T09:08:19+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 5
    },
    {
      "t": "2026-11-08T09:08:20+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "skip",
      "note": "полный автомат — самобрифинг"
    },
    {
      "t": "2026-11-08T09:09:48+03:00",
      "k": "gate",
      "g": "G1",
      "ok": false,
      "open": 7,
      "total": 7
    },
    {
      "t": "2026-11-08T09:09:48+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-11-08T10:26:26+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 5,
      "fixed": 5,
      "deferred": 0
    },
    {
      "t": "2026-11-08T10:26:27+03:00",
      "k": "stage",
      "id": "plan",
      "act": "start"
    },
    {
      "t": "2026-11-08T10:27:51+03:00",
      "k": "tickets",
      "n": 7
    },
    {
      "t": "2026-11-08T10:27:51+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-11-08T10:27:52+03:00",
      "k": "tier",
      "v": "T3"
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«рассчитай индекс кассандры за период с 02.11 по 08.11.2026»",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«чтобы не было слепых регионов»",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«миниимум слпеых критериев»",
      "status": "in-ticket"
    },
    {
      "id": "R04i",
      "text": "(подразумевается) индекс публикуется как предыдущие недели: data/, публичный слой, дайджест, сайт",
      "status": "in-ticket"
    },
    {
      "id": "R05i",
      "text": "(подразумевается) расчёт валиден: ворота (validate, linkcheck, независимость источников) и node --test зелёный",
      "status": "in-ticket"
    },
    {
      "id": "R06i",
      "text": "(подразумевается) прогон доведён до финальной приёмки и отчёта",
      "status": "in-ticket"
    },
    {
      "id": "R07i",
      "text": "(подразумевается) блок «По странам» остаётся на неделе, как на 10-25 и 11-01",
      "status": "in-ticket"
    }
  ],
  "gates": {
    "G1": {
      "ok": false,
      "at": "2026-11-08T09:09:48+03:00",
      "open": 7,
      "total": 7
    },
    "G2": {
      "ok": true,
      "at": "2026-11-08T10:26:26+03:00",
      "found": 5,
      "fixed": 5,
      "deferred": 0
    },
    "G3": {
      "ok": true,
      "at": "2026-11-08T10:27:51+03:00",
      "problems": 0
    }
  },
  "result": null
}
