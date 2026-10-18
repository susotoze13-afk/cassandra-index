window.STATE =
{
  "version": 2,
  "slug": "public-validation-backtest",
  "dir": "2026-10-18-public-validation-backtest",
  "title": "Публичная валидация: бэктест с внешними индексами и журнал прогнозов",
  "mode": "full",
  "depth": "normal",
  "tier": "T2",
  "briefFile": "2026-10-18-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:\\Users\\1\\.agents\\skills\\autopilot",
  "baseCommit": "HEAD",
  "startedAt": "2026-10-18T22:48:01+03:00",
  "updatedAt": "2026-10-18T23:23:05+03:00",
  "finishedAt": "2026-10-18T23:23:05+03:00",
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
      "status": "done",
      "startedAt": "2026-10-18T22:57:38+03:00",
      "finishedAt": "2026-10-18T23:15:10+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-10-18T23:15:10+03:00",
      "finishedAt": "2026-10-18T23:15:10+03:00"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-10-18T23:15:13+03:00",
      "finishedAt": "2026-10-18T23:15:13+03:00"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-10-18T23:15:10+03:00",
      "finishedAt": "2026-10-18T23:21:18+03:00"
    },
    {
      "id": "final",
      "status": "done",
      "startedAt": "2026-10-18T23:21:18+03:00",
      "finishedAt": "2026-10-18T23:23:05+03:00"
    }
  ],
  "requirements": {
    "total": 28,
    "done": 28,
    "inTicket": 0,
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
      "status": "done",
      "startedAt": "2026-10-18T23:00:51+03:00",
      "finishedAt": "2026-10-18T23:07:40+03:00",
      "retries": 0,
      "repairs": 1,
      "repairFindings": [
        "baseline по демо-неделям 1.0; pending по направлению не в сводке; лишний экспорт"
      ],
      "tests": {
        "passed": 727,
        "failed": 0
      },
      "commit": "31b6458"
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
      "status": "done",
      "startedAt": "2026-10-18T23:00:51+03:00",
      "finishedAt": "2026-10-18T23:07:41+03:00",
      "retries": 0,
      "repairs": 1,
      "repairFindings": [
        "тест пинит число файлов записи"
      ],
      "tests": {
        "passed": 727,
        "failed": 0
      },
      "commit": "02e7515"
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
      "status": "done",
      "startedAt": "2026-10-18T23:07:51+03:00",
      "finishedAt": "2026-10-18T23:13:05+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 750,
        "failed": 2
      },
      "commit": "1a8b6ec"
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
      "status": "done",
      "startedAt": "2026-10-18T23:13:05+03:00",
      "finishedAt": "2026-10-18T23:14:53+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 752,
        "failed": 0
      },
      "commit": "0605290"
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
        "docs/adr/0063-*.md",
        "docs/adr/0064-*.md",
        "docs/architecture.md"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "done",
      "startedAt": "2026-10-18T23:13:05+03:00",
      "finishedAt": "2026-10-18T23:15:06+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 752,
        "failed": 0
      },
      "commit": "7f86325"
    },
    {
      "id": "F1",
      "title": "Ремонт ветки: паритет артефактов, пересборка в CI, навигация",
      "requirements": [
        "R26i",
        "R25i",
        "R16"
      ],
      "blockedBy": [],
      "wave": 4,
      "zone": [
        "tests/validation-parity.test.js",
        "tests/backtest.test.js"
      ],
      "review": "да — ремонт ветки",
      "model": "сильная",
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "startedAt": "2026-10-18T23:18:24+03:00",
      "finishedAt": "2026-10-18T23:21:09+03:00",
      "tests": {
        "passed": 755,
        "failed": 0
      },
      "commit": "0c52247"
    }
  ],
  "tests": {
    "passed": 740,
    "failed": 0
  },
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
  "concerns": [
    "calc/ledger.js — verified:null смешивает «нет git-истории» и «нет коммита week.js»; различать случаи полем причины",
    "calc/ledger.js — weekRel строится из anchor.week, имя файла не сверяется: возможен ложный verified:true",
    "calc/ledger.js — writeLedger с rootDir=tmp без anchorsDir читает боевой calc/input/anchors",
    "calc/backtest.js — alignMonthly получил третий аргумент field с фолбэком по имени поля; либо явно, либо обновить §2",
    "tests/backtest.test.js — d.length <= MAX_DISCREPANCIES ничего не проверяет при двух парах",
    "calc/backtest-fixtures/crisiswatch.json — апрель 0/0/0 не объяснён в README"
  ],
  "blind": {
    "checked": 14,
    "matched": 9,
    "mismatches": [
      "ACLED: сравнение по агрегатам событий, а не по Conflict Index (D01, раскрыто на странице)",
      "Корреляции уровней/дельт, lead/lag и direction hit rate посчитаны только для GPR; у ACLED и CrisisWatch n ниже порога — в таблице «—»",
      "Иммутабельность: редакционных якорей 0, есть только baseline, который сам помечен как benchmark"
    ]
  },
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
    "2026-10-18T23:00:25+03:00",
    "2026-10-18T23:00:32+03:00",
    "2026-10-18T23:00:51+03:00",
    "2026-10-18T23:02:39+03:00",
    "2026-10-18T23:04:16+03:00",
    "2026-10-18T23:04:17+03:00",
    "2026-10-18T23:06:02+03:00",
    "2026-10-18T23:06:03+03:00",
    "2026-10-18T23:07:40+03:00",
    "2026-10-18T23:07:41+03:00",
    "2026-10-18T23:07:51+03:00",
    "2026-10-18T23:13:05+03:00",
    "2026-10-18T23:13:06+03:00",
    "2026-10-18T23:14:53+03:00",
    "2026-10-18T23:15:06+03:00",
    "2026-10-18T23:15:10+03:00",
    "2026-10-18T23:15:13+03:00",
    "2026-10-18T23:18:16+03:00",
    "2026-10-18T23:18:17+03:00",
    "2026-10-18T23:18:24+03:00",
    "2026-10-18T23:21:09+03:00",
    "2026-10-18T23:21:18+03:00",
    "2026-10-18T23:22:47+03:00",
    "2026-10-18T23:23:00+03:00",
    "2026-10-18T23:23:04+03:00",
    "2026-10-18T23:23:05+03:00"
  ],
  "rev": 41,
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
    },
    {
      "t": "2026-10-18T23:00:51+03:00",
      "k": "ticket",
      "ids": [
        "01",
        "02"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T23:02:39+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "review"
    },
    {
      "t": "2026-10-18T23:04:16+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "repair",
      "note": "baseline по демо-неделям 1.0; pending по направлению не в сводке; лишний экспорт"
    },
    {
      "t": "2026-10-18T23:04:17+03:00",
      "k": "ticket",
      "ids": [
        "02"
      ],
      "act": "review"
    },
    {
      "t": "2026-10-18T23:06:02+03:00",
      "k": "ticket",
      "ids": [
        "02"
      ],
      "act": "repair",
      "note": "тест пинит число файлов записи"
    },
    {
      "t": "2026-10-18T23:06:03+03:00",
      "k": "add",
      "key": "concerns",
      "n": 6
    },
    {
      "t": "2026-10-18T23:07:40+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "done",
      "tests": {
        "passed": 727,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T23:07:41+03:00",
      "k": "ticket",
      "ids": [
        "02"
      ],
      "act": "done",
      "tests": {
        "passed": 727,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T23:07:51+03:00",
      "k": "ticket",
      "ids": [
        "03"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T23:13:05+03:00",
      "k": "ticket",
      "ids": [
        "03"
      ],
      "act": "done",
      "tests": {
        "passed": 750,
        "failed": 2
      }
    },
    {
      "t": "2026-10-18T23:13:05+03:00",
      "k": "ticket",
      "ids": [
        "04",
        "05"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T23:13:06+03:00",
      "k": "tickets",
      "n": 5
    },
    {
      "t": "2026-10-18T23:14:53+03:00",
      "k": "ticket",
      "ids": [
        "04"
      ],
      "act": "done",
      "tests": {
        "passed": 752,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T23:15:06+03:00",
      "k": "ticket",
      "ids": [
        "05"
      ],
      "act": "done",
      "tests": {
        "passed": 752,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T23:15:10+03:00",
      "k": "stage",
      "id": "review",
      "act": "start"
    },
    {
      "t": "2026-10-18T23:15:13+03:00",
      "k": "stage",
      "id": "build",
      "act": "done"
    },
    {
      "t": "2026-10-18T23:18:16+03:00",
      "k": "add",
      "key": "report",
      "n": 6
    },
    {
      "t": "2026-10-18T23:18:16+03:00",
      "k": "tickets",
      "n": 6
    },
    {
      "t": "2026-10-18T23:18:17+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-10-18T23:18:24+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T23:21:09+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "done",
      "tests": {
        "passed": 755,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T23:21:18+03:00",
      "k": "stage",
      "id": "final",
      "act": "start"
    },
    {
      "t": "2026-10-18T23:22:47+03:00",
      "k": "gate",
      "g": "G4",
      "ok": false,
      "checked": 14,
      "matched": 9
    },
    {
      "t": "2026-10-18T23:23:00+03:00",
      "k": "tests",
      "passed": 755,
      "failed": 0
    },
    {
      "t": "2026-10-18T23:23:04+03:00",
      "k": "tests",
      "passed": 740,
      "failed": 0
    },
    {
      "t": "2026-10-18T23:23:05+03:00",
      "k": "finish",
      "result": "Публичная валидация индекса внешними рядами и журнал прогнозов: validation.html, validation.json, forecast-ledger.json, офлайн-бэктест calc/backtest.js"
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«Сделайте страницу validation.html»",
      "status": "done"
    },
    {
      "id": "R02",
      "text": "«data/public/validation.json»",
      "status": "done"
    },
    {
      "id": "R03",
      "text": "«сравнение уровня … с ACLED Conflict Index, CrisisWatch и GPR»",
      "status": "done"
    },
    {
      "id": "R04",
      "text": "«сравнение … направления индекса с ACLED Conflict Index, CrisisWatch и GPR»",
      "status": "done"
    },
    {
      "id": "R05",
      "text": "«корреляция уровней»",
      "status": "done"
    },
    {
      "id": "R06",
      "text": "«корреляция … дельт»",
      "status": "done"
    },
    {
      "id": "R07",
      "text": "«direction hit rate»",
      "status": "done"
    },
    {
      "id": "R08",
      "text": "«lead/lag»",
      "status": "done"
    },
    {
      "id": "R09",
      "text": "«расхождения»",
      "status": "done"
    },
    {
      "id": "R10",
      "text": "«отдельный раздел «что это не доказывает»»",
      "status": "done"
    },
    {
      "id": "R11",
      "text": "«разные конструкты»",
      "status": "done"
    },
    {
      "id": "R12",
      "text": "«разные окна»",
      "status": "done"
    },
    {
      "id": "R13",
      "text": "«ревизии данных»",
      "status": "done"
    },
    {
      "id": "R14",
      "text": "«воспроизводимый скрипт calc/backtest.js»",
      "status": "done"
    },
    {
      "id": "R15",
      "text": "«с офлайн-фикстурами»",
      "status": "done"
    },
    {
      "id": "R16",
      "text": "«Нужен публичный журнал»",
      "status": "done"
    },
    {
      "id": "R17",
      "text": "«дата»",
      "status": "done"
    },
    {
      "id": "R18",
      "text": "«ожидаемое состояние/кластер»",
      "status": "done"
    },
    {
      "id": "R19",
      "text": "«фактическое состояние»",
      "status": "done"
    },
    {
      "id": "R20",
      "text": "«попадание/промах»",
      "status": "done"
    },
    {
      "id": "R21",
      "text": "«immutable: запись фиксируется в git до публикации недели»",
      "status": "done"
    },
    {
      "id": "R22",
      "text": "«отдельный forecast-ledger.json»",
      "status": "done"
    },
    {
      "id": "R23",
      "text": "«таблица в validation.html или calibration-journal.md»",
      "status": "done"
    },
    {
      "id": "R24",
      "text": "«обязательно публикуйте промахи, а не только попадания»",
      "status": "done"
    },
    {
      "id": "R25i",
      "text": "(подразумевается) страница публикуется: deploy.yml, навигация, sitemap.xml, llms.txt",
      "status": "done"
    },
    {
      "id": "R26i",
      "text": "(подразумевается) validation.json — производный файл, пересобирается CLI и пинится тестом",
      "status": "done"
    },
    {
      "id": "R27i",
      "text": "(подразумевается) значения ACLED / CrisisWatch / GPR имеют провенанс (URL, дата среза, лицензия) и лежат офлайн-фикстурой",
      "status": "done"
    },
    {
      "id": "R28i",
      "text": "(подразумевается) журнал считается из форвардных якорей и опубликованного индекса, а не вводится задним числом",
      "status": "done"
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
      "at": "2026-10-18T23:18:17+03:00",
      "problems": 0
    },
    "G4": {
      "ok": false,
      "at": "2026-10-18T23:22:47+03:00",
      "checked": 14,
      "matched": 9
    }
  },
  "result": "Публичная валидация индекса внешними рядами и журнал прогнозов: validation.html, validation.json, forecast-ledger.json, офлайн-бэктест calc/backtest.js",
  "report": [
    "calc/ledger.js: verified:null не различает «нет коммита якоря», «нет коммита week.js» и «git недоступен»; страница для всех трёх пишет «история git недоступна»",
    "calc/ledger.js: writeLedger с rootDir=tmp без anchorsDir читает боевой calc/input/anchors",
    "calc/ledger.js: editor-записи не фильтруются по неделям цепочки — якорь на демо-неделю 1.0 попадёт в summary.editor",
    "calc/backtest.js: ACLED за 2026-10 снят по 10-09, но сравнивается как полный месяц; на странице нет пометки о неполном месяце",
    "calc/backtest-fixtures/crisiswatch.json: 2026-04 = 0/0/0 не объяснён в README",
    "tests/backtest.test.js: срез MAX_DISCREPANCIES не покрыт (две пары в фикстуре)"
  ]
}
