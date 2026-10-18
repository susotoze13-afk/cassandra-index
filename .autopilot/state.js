window.STATE =
{
  "version": 2,
  "slug": "public-validation-backtest",
  "dir": "2026-10-18-public-validation-backtest--wip",
  "title": "Публичная валидация: бэктест с внешними индексами и журнал прогнозов",
  "mode": "full",
  "depth": "normal",
  "tier": "T2",
  "briefFile": "2026-10-18-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:\\Users\\1\\.agents\\skills\\autopilot",
  "baseCommit": null,
  "startedAt": "2026-10-18T22:48:01+03:00",
  "updatedAt": "2026-10-18T23:00:25+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-18T22:48:01+03:00",
      "finishedAt": "2026-10-18T22:48:31+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-18T22:48:31+03:00",
      "finishedAt": "2026-10-18T22:57:38+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-10-18T22:57:43+03:00",
      "finishedAt": "2026-10-18T22:57:43+03:00",
      "note": "полный автомат — самобрифинг"
    },
    {
      "id": "spec",
      "status": "active",
      "startedAt": "2026-10-18T22:57:38+03:00"
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
    "total": 28,
    "done": 0,
    "inTicket": 28,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Журнал прогнозов и механический baseline",
      "requirements": [
        "R16",
        "R16.1",
        "R17",
        "R18",
        "R19",
        "R20",
        "R21",
        "R21.1",
        "R22",
        "R24",
        "R24.1",
        "R28i",
        "A01"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/ledger.js",
        "tests/ledger.test.js",
        "data/public/forecast-ledger.json"
      ],
      "review": "да — фундамент (публичная схема журнала)",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "02",
      "title": "Бэктест: фикстуры, метрики, validation.json",
      "requirements": [
        "R02",
        "R03",
        "R03.1",
        "R04",
        "R05",
        "R05.1",
        "R06",
        "R07",
        "R08",
        "R09",
        "R14",
        "R14.1",
        "R15"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/backtest.js",
        "calc/backtest-fixtures/**",
        "tests/backtest.test.js"
      ],
      "review": "да — фундамент (публичная схема и статистика)",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "03",
      "title": "Страница validation.html",
      "requirements": [
        "R01",
        "R03.1",
        "R04",
        "R09",
        "R10",
        "R11",
        "R12",
        "R13",
        "R23",
        "R24",
        "R26i"
      ],
      "blockedBy": [
        "01",
        "02"
      ],
      "wave": 2,
      "zone": [
        "calc/validation-page.js",
        "validation.html",
        "tests/validation-page.test.js"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "04",
      "title": "Публикация: deploy, sitemap, llms, навигация, NOTICE",
      "requirements": [
        "R25i",
        "R27i",
        "R23"
      ],
      "blockedBy": [
        "03"
      ],
      "wave": 3,
      "zone": [
        "deploy.yml",
        "index.html",
        "blog-build.js",
        "sitemap.xml",
        "llms.txt"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "05",
      "title": "",
      "requirements": [
        "R26i",
        "R27i",
        "R28i"
      ],
      "blockedBy": [
        "03"
      ],
      "wave": 3,
      "zone": [
        "docs/adr/0062-*.md",
        "docs/adr/0063-*.md",
        "docs/architecture.md"
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
    "fixed": 1,
    "deferred": 2,
    "items": [
      "R03 — сравнение именно с ACLED Conflict Index отложено: композит полугодовой и страновой, машинного доступа нет (D01), на странице раскрыто",
      "R21 — иммутабельность baseline не в git до публикации: baseline переклассифицирован в benchmark A01, требование R21 закрывается редакционными записями"
    ]
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-10-18T22:48:01+03:00",
    "2026-10-18T22:48:31+03:00",
    "2026-10-18T22:57:38+03:00",
    "2026-10-18T22:57:39+03:00",
    "2026-10-18T22:57:43+03:00",
    "2026-10-18T22:59:58+03:00",
    "2026-10-18T23:00:01+03:00",
    "2026-10-18T23:00:06+03:00",
    "2026-10-18T23:00:24+03:00",
    "2026-10-18T23:00:25+03:00"
  ],
  "rev": 14,
  "waiting": null,
  "waits": [],
  "log": [
    {
      "t": "2026-10-18T22:48:01+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-18T22:48:31+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-18T22:57:38+03:00",
      "k": "gate",
      "g": "G1",
      "ok": true,
      "open": 0,
      "total": 28
    },
    {
      "t": "2026-10-18T22:57:38+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-10-18T22:57:39+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 3,
      "fixed": 1,
      "deferred": 2
    },
    {
      "t": "2026-10-18T22:57:43+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "skip",
      "note": "полный автомат — самобрифинг"
    },
    {
      "t": "2026-10-18T22:59:58+03:00",
      "k": "tickets",
      "n": 5
    },
    {
      "t": "2026-10-18T23:00:01+03:00",
      "k": "gate",
      "g": "G3",
      "ok": false,
      "problems": 1
    },
    {
      "t": "2026-10-18T23:00:01+03:00",
      "k": "tier",
      "v": "T2"
    },
    {
      "t": "2026-10-18T23:00:06+03:00",
      "k": "tickets",
      "n": 5
    },
    {
      "t": "2026-10-18T23:00:06+03:00",
      "k": "gate",
      "g": "G3",
      "ok": false,
      "problems": 3
    },
    {
      "t": "2026-10-18T23:00:24+03:00",
      "k": "tickets",
      "n": 5
    },
    {
      "t": "2026-10-18T23:00:25+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«Сделайте страницу validation.html»",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«data/public/validation.json»",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«сравнение уровня … с ACLED Conflict Index, CrisisWatch и GPR»",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«сравнение … направления индекса с ACLED Conflict Index, CrisisWatch и GPR»",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«корреляция уровней»",
      "status": "in-ticket"
    },
    {
      "id": "R06",
      "text": "«корреляция … дельт»",
      "status": "in-ticket"
    },
    {
      "id": "R07",
      "text": "«direction hit rate»",
      "status": "in-ticket"
    },
    {
      "id": "R08",
      "text": "«lead/lag»",
      "status": "in-ticket"
    },
    {
      "id": "R09",
      "text": "«расхождения»",
      "status": "in-ticket"
    },
    {
      "id": "R10",
      "text": "«отдельный раздел «что это не доказывает»»",
      "status": "in-ticket"
    },
    {
      "id": "R11",
      "text": "«разные конструкты»",
      "status": "in-ticket"
    },
    {
      "id": "R12",
      "text": "«разные окна»",
      "status": "in-ticket"
    },
    {
      "id": "R13",
      "text": "«ревизии данных»",
      "status": "in-ticket"
    },
    {
      "id": "R14",
      "text": "«воспроизводимый скрипт calc/backtest.js»",
      "status": "in-ticket"
    },
    {
      "id": "R15",
      "text": "«с офлайн-фикстурами»",
      "status": "in-ticket"
    },
    {
      "id": "R16",
      "text": "«Нужен публичный журнал»",
      "status": "in-ticket"
    },
    {
      "id": "R17",
      "text": "«дата»",
      "status": "in-ticket"
    },
    {
      "id": "R18",
      "text": "«ожидаемое состояние/кластер»",
      "status": "in-ticket"
    },
    {
      "id": "R19",
      "text": "«фактическое состояние»",
      "status": "in-ticket"
    },
    {
      "id": "R20",
      "text": "«попадание/промах»",
      "status": "in-ticket"
    },
    {
      "id": "R21",
      "text": "«immutable: запись фиксируется в git до публикации недели»",
      "status": "in-ticket"
    },
    {
      "id": "R22",
      "text": "«отдельный forecast-ledger.json»",
      "status": "in-ticket"
    },
    {
      "id": "R23",
      "text": "«таблица в validation.html или calibration-journal.md»",
      "status": "in-ticket"
    },
    {
      "id": "R24",
      "text": "«обязательно публикуйте промахи, а не только попадания»",
      "status": "in-ticket"
    },
    {
      "id": "R25i",
      "text": "(подразумевается) страница публикуется: deploy.yml, навигация, sitemap.xml, llms.txt",
      "status": "in-ticket"
    },
    {
      "id": "R26i",
      "text": "(подразумевается) validation.json — производный файл, пересобирается CLI и пинится тестом",
      "status": "in-ticket"
    },
    {
      "id": "R27i",
      "text": "(подразумевается) значения ACLED / CrisisWatch / GPR имеют провенанс (URL, дата среза, лицензия) и лежат офлайн-фикстурой",
      "status": "in-ticket"
    },
    {
      "id": "R28i",
      "text": "(подразумевается) журнал считается из форвардных якорей и опубликованного индекса, а не вводится задним числом",
      "status": "in-ticket"
    }
  ],
  "gates": {
    "G1": {
      "ok": true,
      "at": "2026-10-18T22:57:38+03:00",
      "open": 0,
      "total": 28
    },
    "G2": {
      "ok": true,
      "at": "2026-10-18T22:57:39+03:00",
      "found": 3,
      "fixed": 1,
      "deferred": 2
    },
    "G3": {
      "ok": true,
      "at": "2026-10-18T23:00:25+03:00",
      "problems": 0
    }
  },
  "result": null
}
