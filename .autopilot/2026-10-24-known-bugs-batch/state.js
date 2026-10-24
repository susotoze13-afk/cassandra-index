window.STATE =
{
  "version": 2,
  "slug": "known-bugs-batch",
  "dir": "2026-10-24-known-bugs-batch",
  "title": "Известные баги из PROGRESS.md: пакетная починка",
  "mode": "semi",
  "depth": "normal",
  "tier": "T2",
  "briefFile": "2026-10-24-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": "0b6d5bc",
  "startedAt": "2026-10-24T18:19:13+03:00",
  "updatedAt": "2026-10-24T20:07:17+03:00",
  "finishedAt": "2026-10-24T20:07:17+03:00",
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-24T18:19:13+03:00",
      "finishedAt": "2026-10-24T18:20:24+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-24T18:20:24+03:00",
      "finishedAt": "2026-10-24T18:20:24+03:00"
    },
    {
      "id": "briefing",
      "status": "done",
      "startedAt": "2026-10-24T18:20:24+03:00",
      "finishedAt": "2026-10-24T18:24:08+03:00"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-24T18:24:08+03:00",
      "finishedAt": "2026-10-24T18:34:45+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-10-24T18:34:45+03:00",
      "finishedAt": "2026-10-24T18:55:08+03:00"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-10-24T18:55:20+03:00",
      "finishedAt": "2026-10-24T18:55:20+03:00",
      "note": "пять тикетов сданы и закоммичены"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-10-24T18:55:08+03:00",
      "finishedAt": "2026-10-24T19:02:42+03:00"
    },
    {
      "id": "final",
      "status": "done",
      "startedAt": "2026-10-24T19:02:42+03:00",
      "finishedAt": "2026-10-24T20:07:17+03:00"
    }
  ],
  "requirements": {
    "total": 14,
    "done": 14,
    "inTicket": 0,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Документация: хеши коммитов и правка docs/api.md",
      "requirements": [
        "R03",
        "R04",
        "R05",
        "R09",
        "R10"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "docs/",
        "calc/digest-export.js"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "done",
      "startedAt": "2026-10-24T18:37:22+03:00",
      "finishedAt": "2026-10-24T18:45:50+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 815,
        "failed": 0
      },
      "commit": "9a88c58"
    },
    {
      "id": "02",
      "title": "Тесты публичного контракта: пин MAX_DISCREPANCIES, сторож api.md, nullable-покрытие",
      "requirements": [
        "R06",
        "R07",
        "R08"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "tests/public-contract.test.js"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "done",
      "startedAt": "2026-10-24T18:37:22+03:00",
      "finishedAt": "2026-10-24T18:45:34+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 815,
        "failed": 0
      },
      "commit": "b52ef95"
    },
    {
      "id": "03",
      "title": "calc/ledger.js и calc/quotes.js: якоря от rootDir, безопасный id источника",
      "requirements": [
        "R09",
        "R13"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/ledger.js",
        "calc/public-contract.js",
        "tests/ledger.test.js",
        "tests/quotes.test.js"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "done",
      "startedAt": "2026-10-24T18:37:22+03:00",
      "finishedAt": "2026-10-24T18:43:48+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 813,
        "failed": 0
      },
      "commit": "b81102f"
    },
    {
      "id": "04",
      "title": "calc/backtest.js: пометка неполного месяца ACLED 2026-10",
      "requirements": [
        "R10"
      ],
      "blockedBy": [],
      "wave": 2,
      "zone": [
        "calc/backtest.js",
        "data/public/validation.json",
        "validation.html"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "done",
      "startedAt": "2026-10-24T18:45:57+03:00",
      "finishedAt": "2026-10-24T18:51:16+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 29,
        "failed": 0
      },
      "commit": "f7e1805"
    },
    {
      "id": "05",
      "title": "calc/public-export.js: честная печать водопада и сегменты trend.svg",
      "requirements": [
        "R11",
        "R12",
        "R14i"
      ],
      "blockedBy": [],
      "wave": 2,
      "zone": [
        "calc/public-export.js",
        "data/public/trend.svg",
        "public-export.js --write"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "done",
      "startedAt": "2026-10-24T18:45:57+03:00",
      "finishedAt": "2026-10-24T18:55:01+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 820,
        "failed": 0
      },
      "commit": "f1e4217"
    },
    {
      "id": "F1",
      "title": "Ремонт ветки: название теста гипотетик",
      "requirements": [
        "R02"
      ],
      "blockedBy": [],
      "wave": 3,
      "zone": [
        "tests/regional-hypothesis.test.js"
      ],
      "review": "да — ремонт ветки",
      "model": "обычная",
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "startedAt": "2026-10-24T20:03:38+03:00",
      "finishedAt": "2026-10-24T20:05:12+03:00",
      "tests": {
        "passed": 820,
        "failed": 0
      },
      "commit": "a546511"
    }
  ],
  "tests": {
    "passed": 820,
    "failed": 0
  },
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "found": 1,
    "fixed": 1,
    "items": [
      "R02 — читатель G2 не мог сверить с кодом: факт «уже исправлено в 0921db8» подтверждён разведкой по коду и git show, расхождения нет"
    ]
  },
  "concerns": [],
  "blind": {
    "checked": 15,
    "matched": 14,
    "mismatches": [
      "R09 — слепая проверка: пара (outcome, actualIndex) различает две причины verified:null, третья (нет gitProbe/коммита) не различается; ограничение задокументировано ADR 0066, как разрешил пользователь 2026-10-24"
    ]
  },
  "beats": [
    "2026-10-24T18:19:13+03:00",
    "2026-10-24T18:20:24+03:00",
    "2026-10-24T18:21:12+03:00",
    "2026-10-24T18:24:08+03:00",
    "2026-10-24T18:34:44+03:00",
    "2026-10-24T18:34:45+03:00",
    "2026-10-24T18:36:39+03:00",
    "2026-10-24T18:36:40+03:00",
    "2026-10-24T18:36:52+03:00",
    "2026-10-24T18:36:53+03:00",
    "2026-10-24T18:37:02+03:00",
    "2026-10-24T18:37:22+03:00",
    "2026-10-24T18:43:48+03:00",
    "2026-10-24T18:45:34+03:00",
    "2026-10-24T18:45:50+03:00",
    "2026-10-24T18:45:57+03:00",
    "2026-10-24T18:51:16+03:00",
    "2026-10-24T18:55:01+03:00",
    "2026-10-24T18:55:08+03:00",
    "2026-10-24T18:55:20+03:00",
    "2026-10-24T19:01:35+03:00",
    "2026-10-24T19:02:42+03:00",
    "2026-10-24T20:03:32+03:00",
    "2026-10-24T20:03:37+03:00",
    "2026-10-24T20:03:38+03:00",
    "2026-10-24T20:05:12+03:00",
    "2026-10-24T20:06:29+03:00",
    "2026-10-24T20:07:13+03:00",
    "2026-10-24T20:07:17+03:00"
  ],
  "rev": 34,
  "waiting": null,
  "waits": [
    {
      "kind": "briefing",
      "from": "2026-10-24T18:21:12+03:00",
      "to": "2026-10-24T18:24:08+03:00"
    }
  ],
  "log": [
    {
      "t": "2026-10-24T18:19:13+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-24T18:20:24+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "start"
    },
    {
      "t": "2026-10-24T18:21:12+03:00",
      "k": "ask",
      "kind": "briefing",
      "note": "два вопроса: брать ли не-доделанное с прошлой сборки; как чинить ledger verified:null в рамках схемы v1"
    },
    {
      "t": "2026-10-24T18:24:08+03:00",
      "k": "answered",
      "kind": "briefing"
    },
    {
      "t": "2026-10-24T18:24:08+03:00",
      "k": "gate",
      "g": "G1",
      "ok": false,
      "open": 14,
      "total": 14
    },
    {
      "t": "2026-10-24T18:24:08+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-10-24T18:34:44+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 1,
      "fixed": 1,
      "deferred": 0
    },
    {
      "t": "2026-10-24T18:34:45+03:00",
      "k": "stage",
      "id": "plan",
      "act": "start"
    },
    {
      "t": "2026-10-24T18:36:39+03:00",
      "k": "tier",
      "v": "T2"
    },
    {
      "t": "2026-10-24T18:36:40+03:00",
      "k": "tickets",
      "n": 5
    },
    {
      "t": "2026-10-24T18:36:40+03:00",
      "k": "gate",
      "g": "G3",
      "ok": false,
      "problems": 1
    },
    {
      "t": "2026-10-24T18:36:52+03:00",
      "k": "tickets",
      "n": 5
    },
    {
      "t": "2026-10-24T18:36:53+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-10-24T18:37:22+03:00",
      "k": "ticket",
      "ids": [
        "01",
        "02",
        "03"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-24T18:43:48+03:00",
      "k": "ticket",
      "ids": [
        "03"
      ],
      "act": "done",
      "tests": {
        "passed": 813,
        "failed": 0
      }
    },
    {
      "t": "2026-10-24T18:45:34+03:00",
      "k": "ticket",
      "ids": [
        "02"
      ],
      "act": "done",
      "tests": {
        "passed": 815,
        "failed": 0
      }
    },
    {
      "t": "2026-10-24T18:45:50+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "done",
      "tests": {
        "passed": 815,
        "failed": 0
      }
    },
    {
      "t": "2026-10-24T18:45:57+03:00",
      "k": "ticket",
      "ids": [
        "04",
        "05"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-24T18:51:16+03:00",
      "k": "ticket",
      "ids": [
        "04"
      ],
      "act": "done",
      "tests": {
        "passed": 29,
        "failed": 0
      }
    },
    {
      "t": "2026-10-24T18:55:01+03:00",
      "k": "ticket",
      "ids": [
        "05"
      ],
      "act": "done",
      "tests": {
        "passed": 820,
        "failed": 0
      }
    },
    {
      "t": "2026-10-24T18:55:08+03:00",
      "k": "stage",
      "id": "review",
      "act": "start"
    },
    {
      "t": "2026-10-24T18:55:20+03:00",
      "k": "stage",
      "id": "build",
      "act": "done"
    },
    {
      "t": "2026-10-24T19:01:35+03:00",
      "k": "add",
      "key": "report",
      "n": 2
    },
    {
      "t": "2026-10-24T19:02:42+03:00",
      "k": "stage",
      "id": "final",
      "act": "start"
    },
    {
      "t": "2026-10-24T20:03:32+03:00",
      "k": "gate",
      "g": "G4",
      "ok": false,
      "checked": 13,
      "matched": 12
    },
    {
      "t": "2026-10-24T20:03:37+03:00",
      "k": "tickets",
      "n": 6
    },
    {
      "t": "2026-10-24T20:03:38+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-10-24T20:03:38+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-24T20:05:12+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "done",
      "tests": {
        "passed": 820,
        "failed": 0
      }
    },
    {
      "t": "2026-10-24T20:06:29+03:00",
      "k": "tests",
      "passed": 820,
      "failed": 0
    },
    {
      "t": "2026-10-24T20:07:13+03:00",
      "k": "gate",
      "g": "G4",
      "ok": false,
      "checked": 15,
      "matched": 14
    },
    {
      "t": "2026-10-24T20:07:17+03:00",
      "k": "finish",
      "result": "13 известных багов из PROGRESS.md закрыты: docs/api.md, ledger/backtest/public-export/quotes, пины тестов; 820 тестов зелёные, глобальный ряд не сдвинут"
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«calc/params.js:60 — комментарий гипотетик обрывается (исправлен в F1; при следующей правке рядом не терять завершённость фразы)»",
      "status": "done"
    },
    {
      "id": "R02",
      "text": "«tests/regional-hypothesis.test.js:60 — название теста говорит «эпсилон», хотя порог подменён на 0.42»",
      "status": "done"
    },
    {
      "id": "R03",
      "text": "«docs/preproduction-decisions.md и docs/regional-iwith-degeneracy.md — ссылка «коммит autopilot-прогона 2026-10-24» без хеша; вписать при следующей правке»",
      "status": "done"
    },
    {
      "id": "R04",
      "text": "«docs/api.md: верхнеуровневое поле methodology в index.json указано ошибочно»",
      "status": "done"
    },
    {
      "id": "R05",
      "text": "«docs/api.md: «опубликованный выпуск не переписывается» — writeDigestData пересобирает»",
      "status": "done"
    },
    {
      "id": "R06",
      "text": "«docs/api.md: «до 12 записей» дублирует MAX_DISCREPANCIES без пина; примеры с «…» — невалидный JSON»",
      "status": "done"
    },
    {
      "id": "R07",
      "text": "«Сторож docs/api.md ищет путь подстрокой»",
      "status": "done"
    },
    {
      "id": "R08",
      "text": "«tests/public-contract.test.js: nullable-тест покрывает не все nullable-пути»",
      "status": "done"
    },
    {
      "id": "R09",
      "text": "«calc/ledger.js: verified:null не различает три причины; writeLedger без anchorsDir читает боевой каталог»",
      "status": "done"
    },
    {
      "id": "R10",
      "text": "«calc/backtest.js: ACLED за 2026-10 считается по 2026-10-09 без пометки»",
      "status": "done"
    },
    {
      "id": "R11",
      "text": "«calc/public-export.js --write печатает «водопад: нет» при верных данных»",
      "status": "done"
    },
    {
      "id": "R12",
      "text": "«calc/public-export.js: trend.svg рисует одну полилинию по всем 12 точкам, включая демо-1.0»",
      "status": "done"
    },
    {
      "id": "R13",
      "text": "«calc/quotes.js не проверяет id источника на путь (../)»",
      "status": "done"
    },
    {
      "id": "R14i",
      "text": "(подразумевается) после правок node --test остаётся зелёным (769+ passed, 0 fail)",
      "status": "done"
    }
  ],
  "gates": {
    "G1": {
      "ok": false,
      "at": "2026-10-24T18:24:08+03:00",
      "open": 14,
      "total": 14
    },
    "G2": {
      "ok": true,
      "at": "2026-10-24T18:34:44+03:00",
      "found": 1,
      "fixed": 1,
      "deferred": 0
    },
    "G3": {
      "ok": true,
      "at": "2026-10-24T20:03:38+03:00",
      "problems": 0
    },
    "G4": {
      "ok": false,
      "at": "2026-10-24T20:07:13+03:00",
      "checked": 15,
      "matched": 14
    }
  },
  "result": "13 известных багов из PROGRESS.md закрыты: docs/api.md, ledger/backtest/public-export/quotes, пины тестов; 820 тестов зелёные, глобальный ряд не сдвинут",
  "report": [
    "calc/quotes.js:101 — гард «id !== ''» пропускает пустой/не-строковый id до чтения <corpusDir>/.txt (traversal невозможен, но чтение падает с ошибкой); стоит расширить до полного паттерна ^[A-Za-z0-9_-]+$",
    "calc/backtest.js:505 — склейка note через пробел даёт строчную букву после точки («…не публикуется. ряд 2026-10 неполный…»); видимый текст validation.json/validation.html — с заглавной или через «;»"
  ]
}
