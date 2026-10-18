window.STATE =
{
  "version": 2,
  "slug": "license-and-citation",
  "dir": "2026-10-18-license-and-citation",
  "title": "Лицензирование, цитирование и границы публичного ядра",
  "mode": "full",
  "depth": "normal",
  "tier": "T2",
  "briefFile": "2026-10-18-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": "867aa61",
  "startedAt": "2026-10-18T21:45:17+03:00",
  "updatedAt": "2026-10-18T22:15:33+03:00",
  "finishedAt": "2026-10-18T22:15:33+03:00",
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-18T21:45:17+03:00",
      "finishedAt": "2026-10-18T21:45:31+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-18T21:45:31+03:00",
      "finishedAt": "2026-10-18T21:46:43+03:00"
    },
    {
      "id": "briefing",
      "status": "done",
      "startedAt": "2026-10-18T21:46:43+03:00",
      "finishedAt": "2026-10-18T21:46:44+03:00"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-18T21:46:44+03:00",
      "finishedAt": "2026-10-18T21:49:43+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-10-18T21:49:43+03:00",
      "finishedAt": "2026-10-18T21:50:40+03:00"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-10-18T21:50:40+03:00",
      "finishedAt": "2026-10-18T22:02:38+03:00"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-10-18T22:02:38+03:00",
      "finishedAt": "2026-10-18T22:12:02+03:00"
    },
    {
      "id": "final",
      "status": "done",
      "startedAt": "2026-10-18T22:12:02+03:00",
      "finishedAt": "2026-10-18T22:15:33+03:00"
    }
  ],
  "requirements": {
    "total": 19,
    "done": 19,
    "inTicket": 0,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Правовая рамка: лицензии, NOTICE, торговая марка",
      "requirements": [
        "R01",
        "R01i",
        "R02",
        "R02i",
        "R03",
        "R03i",
        "R05",
        "R05i",
        "R08i",
        "R10i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "LICENSE",
        "LICENSE-DATA",
        "LICENSE-DOCS",
        "NOTICE",
        "TRADEMARK.md",
        "tests/licensing.test.js"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "done",
      "startedAt": "2026-10-18T21:50:44+03:00",
      "finishedAt": "2026-10-18T21:56:18+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 667,
        "failed": 0
      },
      "commit": "6cdfa51"
    },
    {
      "id": "02",
      "title": "Версия, цитирование и лицензия публичного слоя",
      "requirements": [
        "R02i",
        "R04",
        "R04i",
        "R04i",
        "R09",
        "R09i",
        "R10i"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "VERSION",
        "CITATION.cff",
        ".zenodo.json",
        "calc/public-export.js",
        "tests/public-export.test.js",
        "tests/citation.test.js",
        "how-to-read.html",
        "data/public/"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "done",
      "startedAt": "2026-10-18T21:56:24+03:00",
      "finishedAt": "2026-10-18T21:59:24+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 685,
        "failed": 0
      },
      "commit": "135475b"
    },
    {
      "id": "03",
      "title": "README, вклад, безопасность и DCO",
      "requirements": [
        "R06",
        "R06i",
        "R06i",
        "R07",
        "R07i",
        "R07i",
        "R09i",
        "R10i"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "README.md",
        "CONTRIBUTING.md",
        "SECURITY.md",
        "tools/",
        "tests/dco.test.js",
        "tests/governance.test.js",
        ".github/workflows/dco.yml"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "done",
      "startedAt": "2026-10-18T21:56:24+03:00",
      "finishedAt": "2026-10-18T21:59:28+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 685,
        "failed": 0
      },
      "commit": "a3b62b1"
    },
    {
      "id": "04",
      "title": "Граница публичного ядра и коммерческого модуля",
      "requirements": [
        "R08",
        "R08i",
        "R08i"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "docs/adr/0056-*.md",
        "docs/repo-boundaries.md"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "done",
      "startedAt": "2026-10-18T21:56:24+03:00",
      "finishedAt": "2026-10-18T21:59:32+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 685,
        "failed": 0
      },
      "commit": "4957b9f"
    },
    {
      "id": "05",
      "title": "Память проекта: рамка в AGENTS.md и CONTEXT.md",
      "requirements": [
        "R10i"
      ],
      "blockedBy": [
        "01",
        "02",
        "03",
        "04"
      ],
      "wave": 5,
      "zone": [
        "CONTEXT.md",
        ".autopilot/PROGRESS.md",
        ".autopilot/2026-10-18-license-and-citation--wip/agents-section.md"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "done",
      "startedAt": "2026-10-18T21:59:36+03:00",
      "finishedAt": "2026-10-18T22:02:33+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 698,
        "failed": 0
      },
      "commit": "307222f"
    },
    {
      "id": "F1",
      "title": "Ремонт ветки: одна область применения, один APPENDIX, номер ADR и пины",
      "requirements": [
        "R01",
        "R01i",
        "R02",
        "R02i",
        "R03",
        "R05",
        "R08",
        "R10i"
      ],
      "blockedBy": [],
      "wave": 6,
      "zone": [
        "LICENSE",
        "LICENSE-DATA",
        "LICENSE-DOCS",
        "README.md",
        "CONTRIBUTING.md",
        "tests/licensing.test.js",
        "tools/check-dco.js",
        "tests/dco.test.js",
        "docs/adr/",
        "docs/repo-boundaries.md"
      ],
      "review": "да — ремонт ветки",
      "model": "сильная",
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "startedAt": "2026-10-18T22:05:11+03:00",
      "finishedAt": "2026-10-18T22:11:47+03:00",
      "tests": {
        "passed": 701,
        "failed": 0
      },
      "commit": "14eb8de"
    }
  ],
  "tests": {
    "passed": 701,
    "failed": 0
  },
  "debt": {
    "placeholders": [],
    "assumptions": [
      "Правообладатель в LICENSE — 'Cassandra Index contributors': юридическое имя владельца не передано",
      "Версия проекта — корневой VERSION (semver), сверяется с CITATION.cff тестом",
      "LICENSE-DATA покрывает data/**; LICENSE-DOCS — docs/**, корневые *.md и текст статических страниц",
      "Контакт безопасности — Zasik2008@yandex.ru, уже опубликован в форме обратной связи",
      "Zenodo: готовятся метаданные и процедура, выпуск DOI остаётся за владельцем",
      "Разделение репозиториев: здесь public core, коммерческий модуль — отдельный репозиторий владельца",
      "DCO-проверка в CI — только actions/checkout с существующим пином SHA, сторонних action нет"
    ],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "found": 3,
    "fixed": 3,
    "deferred": 0,
    "items": [
      "R08 — дописана процедура переноса модуля в отдельный репозиторий",
      "R09 — upload_type зафиксирован как dataset, DOI прописан в CITATION.cff",
      "R06.1 — добавлен список запрещённых действий в SECURITY.md"
    ]
  },
  "concerns": [
    "LICENSE:204-238 — канонический APPENDIX оставлен незаполненным, ниже второй заполненный; утверждение о границах приложения неверно",
    "LICENSE:210 против LICENSE-DOCS:13-16 — HTML/CSS целиком под Apache против текста страниц под CC BY: одни байты в двух лицензиях",
    "LICENSE — нет labeled-раздела «Область применения», которого R02ii требует у каждого файла лицензии",
    "tests/licensing.test.js:36 — пинит число строк copyright вместо «есть заполненная строка и заполненное приложение»",
    "tests/licensing.test.js:39,65 — дословность держится на пороге длины файла, а не на точном каноническом сегменте",
    "tests/licensing.test.js:57 — includes('Geo') слишком слаб для утверждения про дампы GeoNames",
    "tests/licensing.test.js:100 — версия 1.17.0 захардкожена вместо чтения из package/package.json"
  ],
  "blind": {
    "checked": 9,
    "matched": 7,
    "mismatches": [
      "R08 «развести public core и commercial module по разным репозиториям» — граница записана (ADR 0057 + docs/repo-boundaries.md), второго репозитория нет: создание — внешнее действие владельца",
      "R09 «DOI через Zenodo» — метаданные и процедура готовы, самого DOI нет: нужен аккаунт и релиз"
    ]
  },
  "beats": [
    "2026-10-18T21:45:17+03:00",
    "2026-10-18T21:45:31+03:00",
    "2026-10-18T21:46:32+03:00",
    "2026-10-18T21:46:43+03:00",
    "2026-10-18T21:46:44+03:00",
    "2026-10-18T21:47:07+03:00",
    "2026-10-18T21:49:34+03:00",
    "2026-10-18T21:49:43+03:00",
    "2026-10-18T21:49:44+03:00",
    "2026-10-18T21:50:31+03:00",
    "2026-10-18T21:50:32+03:00",
    "2026-10-18T21:50:39+03:00",
    "2026-10-18T21:50:40+03:00",
    "2026-10-18T21:50:44+03:00",
    "2026-10-18T21:54:11+03:00",
    "2026-10-18T21:56:15+03:00",
    "2026-10-18T21:56:18+03:00",
    "2026-10-18T21:56:24+03:00",
    "2026-10-18T21:59:24+03:00",
    "2026-10-18T21:59:28+03:00",
    "2026-10-18T21:59:32+03:00",
    "2026-10-18T21:59:36+03:00",
    "2026-10-18T22:02:33+03:00",
    "2026-10-18T22:02:38+03:00",
    "2026-10-18T22:05:10+03:00",
    "2026-10-18T22:05:11+03:00",
    "2026-10-18T22:11:47+03:00",
    "2026-10-18T22:11:53+03:00",
    "2026-10-18T22:12:02+03:00",
    "2026-10-18T22:14:11+03:00",
    "2026-10-18T22:15:32+03:00",
    "2026-10-18T22:15:33+03:00"
  ],
  "rev": 33,
  "waiting": null,
  "waits": [],
  "log": [
    {
      "t": "2026-10-18T21:45:17+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-18T21:45:31+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-18T21:46:43+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "start"
    },
    {
      "t": "2026-10-18T21:46:44+03:00",
      "k": "gate",
      "g": "G1",
      "ok": false,
      "open": 19,
      "total": 19
    },
    {
      "t": "2026-10-18T21:46:44+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-10-18T21:47:07+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 7
    },
    {
      "t": "2026-10-18T21:49:34+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 3,
      "fixed": 3,
      "deferred": 0
    },
    {
      "t": "2026-10-18T21:49:43+03:00",
      "k": "stage",
      "id": "plan",
      "act": "start"
    },
    {
      "t": "2026-10-18T21:49:44+03:00",
      "k": "tier",
      "v": "T2"
    },
    {
      "t": "2026-10-18T21:50:31+03:00",
      "k": "tickets",
      "n": 5
    },
    {
      "t": "2026-10-18T21:50:32+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-10-18T21:50:40+03:00",
      "k": "stage",
      "id": "build",
      "act": "start"
    },
    {
      "t": "2026-10-18T21:50:44+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T21:54:11+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "review"
    },
    {
      "t": "2026-10-18T21:56:15+03:00",
      "k": "add",
      "key": "concerns",
      "n": 7
    },
    {
      "t": "2026-10-18T21:56:18+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "done",
      "tests": {
        "passed": 667,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T21:56:24+03:00",
      "k": "ticket",
      "ids": [
        "02",
        "03",
        "04"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T21:59:24+03:00",
      "k": "ticket",
      "ids": [
        "02"
      ],
      "act": "done",
      "tests": {
        "passed": 685,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T21:59:28+03:00",
      "k": "ticket",
      "ids": [
        "03"
      ],
      "act": "done",
      "tests": {
        "passed": 685,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T21:59:32+03:00",
      "k": "ticket",
      "ids": [
        "04"
      ],
      "act": "done",
      "tests": {
        "passed": 685,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T21:59:36+03:00",
      "k": "ticket",
      "ids": [
        "05"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T22:02:33+03:00",
      "k": "ticket",
      "ids": [
        "05"
      ],
      "act": "done",
      "tests": {
        "passed": 698,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T22:02:38+03:00",
      "k": "stage",
      "id": "review",
      "act": "start"
    },
    {
      "t": "2026-10-18T22:05:10+03:00",
      "k": "tickets",
      "n": 6
    },
    {
      "t": "2026-10-18T22:05:11+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T22:11:47+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "done",
      "tests": {
        "passed": 701,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T22:11:53+03:00",
      "k": "add",
      "key": "report",
      "n": 6
    },
    {
      "t": "2026-10-18T22:12:02+03:00",
      "k": "stage",
      "id": "final",
      "act": "start"
    },
    {
      "t": "2026-10-18T22:14:11+03:00",
      "k": "gate",
      "g": "G4",
      "ok": false,
      "checked": 9,
      "matched": 7
    },
    {
      "t": "2026-10-18T22:15:32+03:00",
      "k": "tests",
      "passed": 701,
      "failed": 0
    },
    {
      "t": "2026-10-18T22:15:33+03:00",
      "k": "finish",
      "result": "Правовая рамка: лицензии по типу материала, NOTICE и торговая марка, VERSION и CITATION.cff, README, вклад под DCO, SECURITY и граница репозиториев"
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«Добавить LICENSE (Apache-2.0) для кода.»",
      "status": "done"
    },
    {
      "id": "R01i",
      "text": "(подразумевается) лицензия должна быть машинночитаемой и не спорить с уже лежащим в репозитории сторонним кодом",
      "status": "done"
    },
    {
      "id": "R02",
      "text": "«Добавить LICENSE-DATA (CC BY 4.0) и LICENSE-DOCS (CC BY 4.0).»",
      "status": "done"
    },
    {
      "id": "R02i",
      "text": "(подразумевается) публичный слой данных обязан объявлять ту же лицензию, что LICENSE-DATA, а не null",
      "status": "done"
    },
    {
      "id": "R03",
      "text": "«Добавить NOTICE с атрибуцией GeoNames и сторонних данных.»",
      "status": "done"
    },
    {
      "id": "R03i",
      "text": "(подразумевается) NOTICE не перелицензирует чужие тексты источников и не приписывает их проекту",
      "status": "done"
    },
    {
      "id": "R04",
      "text": "«Добавить CITATION.cff и правило цитирования: «Cassandra Index, версия, дата, URL».»",
      "status": "done"
    },
    {
      "id": "R04i",
      "text": "(подразумевается) «версия» должна откуда-то браться, иначе правило цитирования невыполнимо",
      "status": "done"
    },
    {
      "id": "R05",
      "text": "«Добавить TRADEMARK.md: название и логотип — не под open-source лицензией; форк обязан называться иначе.»",
      "status": "done"
    },
    {
      "id": "R05i",
      "text": "(подразумевается) TRADEMARK.md обязан назвать, что именно защищено и что разрешено (номинативное упоминание, «based on»)",
      "status": "done"
    },
    {
      "id": "R06",
      "text": "«Добавить CONTRIBUTING.md и SECURITY.md; для вкладов — DCO, а не тяжёлый CLA.»",
      "status": "done"
    },
    {
      "id": "R06i",
      "text": "(подразумевается) SECURITY.md нужен живой приватный канал и окно ответа, иначе он бесполезен",
      "status": "done"
    },
    {
      "id": "R07",
      "text": "«Добавить README.md с одной фразой: «Официальный источник — cassindex.ru; форки не являются официальными».»",
      "status": "done"
    },
    {
      "id": "R07i",
      "text": "(подразумевается) README — первая страница репозитория: что это, как запустить, какие лицензии где",
      "status": "done"
    },
    {
      "id": "R08",
      "text": "«Развести public core и будущий commercial module по разным репозиториям.»",
      "status": "done"
    },
    {
      "id": "R08i",
      "text": "(подразумевается) граница должна быть записана решением, иначе первый же коммерческий файл приедет сюда",
      "status": "done"
    },
    {
      "id": "R09",
      "text": "«По желанию — DOI через Zenodo на релизы, чтобы индекс цитировали как датасет.»",
      "status": "done"
    },
    {
      "id": "R09i",
      "text": "(подразумевается) метаданные Zenodo должны быть готовы до первого релиза, иначе DOI выдадут с мусорным описанием",
      "status": "done"
    },
    {
      "id": "R10i",
      "text": "(подразумевается) всё перечисленное выше не должно тихо исчезнуть при следующей правке",
      "status": "done"
    }
  ],
  "gates": {
    "G1": {
      "ok": false,
      "at": "2026-10-18T21:46:44+03:00",
      "open": 19,
      "total": 19
    },
    "G2": {
      "ok": true,
      "at": "2026-10-18T21:49:34+03:00",
      "found": 3,
      "fixed": 3,
      "deferred": 0
    },
    "G3": {
      "ok": true,
      "at": "2026-10-18T21:50:32+03:00",
      "problems": 0
    },
    "G4": {
      "ok": false,
      "at": "2026-10-18T22:14:11+03:00",
      "checked": 9,
      "matched": 7
    }
  },
  "result": "Правовая рамка: лицензии по типу материала, NOTICE и торговая марка, VERSION и CITATION.cff, README, вклад под DCO, SECURITY и граница репозиториев",
  "report": [
    ".github/workflows/dco.yml — проверка DCO исполняет скрипт из самого PR: автор может ослабить свой же гейт; надёжнее гонять копию из базовой ветки",
    "how-to-read.html — версия 1.0.0 зашита в статику и сверяется тестом с VERSION: релиз правит файл вручную",
    "CITATION.cff — одно поле license CC-BY-4.0 объявляет весь репозиторий, хотя код под Apache-2.0",
    "SECURITY.md — окно первого ответа 72 часа выбрано исполнителем; владельцу подтвердить или снять",
    "CONTRIBUTING.md — опечатка в ссылке: раздел «Как цитировать» находится в README",
    "tests/licensing.test.js — проверка запрещённых каталогов требует git в PATH (в остальных случаях тест пропускается)"
  ]
}
