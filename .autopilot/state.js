window.STATE =
{
  "version": 2,
  "slug": "license-and-citation",
  "dir": "2026-10-18-license-and-citation--wip",
  "title": "Лицензирование, цитирование и границы публичного ядра",
  "mode": "full",
  "depth": "normal",
  "tier": "T2",
  "briefFile": "2026-10-18-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": null,
  "startedAt": "2026-10-18T21:45:17+03:00",
  "updatedAt": "2026-10-18T21:50:32+03:00",
  "finishedAt": null,
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
      "status": "active",
      "startedAt": "2026-10-18T21:49:43+03:00"
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
    "total": 19,
    "done": 0,
    "inTicket": 19,
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
      "status": "pending",
      "retries": 0,
      "repairs": 0
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
      "status": "pending",
      "retries": 0,
      "repairs": 0
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
      "status": "pending",
      "retries": 0,
      "repairs": 0
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
      "status": "pending",
      "retries": 0,
      "repairs": 0
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
        "AGENTS.md",
        "CONTEXT.md",
        ".autopilot/PROGRESS.md"
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
  "concerns": [],
  "blind": null,
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
    "2026-10-18T21:50:32+03:00"
  ],
  "rev": 12,
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
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«Добавить LICENSE (Apache-2.0) для кода.»",
      "status": "in-ticket"
    },
    {
      "id": "R01i",
      "text": "(подразумевается) лицензия должна быть машинночитаемой и не спорить с уже лежащим в репозитории сторонним кодом",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«Добавить LICENSE-DATA (CC BY 4.0) и LICENSE-DOCS (CC BY 4.0).»",
      "status": "in-ticket"
    },
    {
      "id": "R02i",
      "text": "(подразумевается) публичный слой данных обязан объявлять ту же лицензию, что LICENSE-DATA, а не null",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«Добавить NOTICE с атрибуцией GeoNames и сторонних данных.»",
      "status": "in-ticket"
    },
    {
      "id": "R03i",
      "text": "(подразумевается) NOTICE не перелицензирует чужие тексты источников и не приписывает их проекту",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«Добавить CITATION.cff и правило цитирования: «Cassandra Index, версия, дата, URL».»",
      "status": "in-ticket"
    },
    {
      "id": "R04i",
      "text": "(подразумевается) «версия» должна откуда-то браться, иначе правило цитирования невыполнимо",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«Добавить TRADEMARK.md: название и логотип — не под open-source лицензией; форк обязан называться иначе.»",
      "status": "in-ticket"
    },
    {
      "id": "R05i",
      "text": "(подразумевается) TRADEMARK.md обязан назвать, что именно защищено и что разрешено (номинативное упоминание, «based on»)",
      "status": "in-ticket"
    },
    {
      "id": "R06",
      "text": "«Добавить CONTRIBUTING.md и SECURITY.md; для вкладов — DCO, а не тяжёлый CLA.»",
      "status": "in-ticket"
    },
    {
      "id": "R06i",
      "text": "(подразумевается) SECURITY.md нужен живой приватный канал и окно ответа, иначе он бесполезен",
      "status": "in-ticket"
    },
    {
      "id": "R07",
      "text": "«Добавить README.md с одной фразой: «Официальный источник — cassindex.ru; форки не являются официальными».»",
      "status": "in-ticket"
    },
    {
      "id": "R07i",
      "text": "(подразумевается) README — первая страница репозитория: что это, как запустить, какие лицензии где",
      "status": "in-ticket"
    },
    {
      "id": "R08",
      "text": "«Развести public core и будущий commercial module по разным репозиториям.»",
      "status": "in-ticket"
    },
    {
      "id": "R08i",
      "text": "(подразумевается) граница должна быть записана решением, иначе первый же коммерческий файл приедет сюда",
      "status": "in-ticket"
    },
    {
      "id": "R09",
      "text": "«По желанию — DOI через Zenodo на релизы, чтобы индекс цитировали как датасет.»",
      "status": "in-ticket"
    },
    {
      "id": "R09i",
      "text": "(подразумевается) метаданные Zenodo должны быть готовы до первого релиза, иначе DOI выдадут с мусорным описанием",
      "status": "in-ticket"
    },
    {
      "id": "R10i",
      "text": "(подразумевается) всё перечисленное выше не должно тихо исчезнуть при следующей правке",
      "status": "in-ticket"
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
    }
  },
  "result": null
}
