window.STATE =
{
  "version": 2,
  "slug": "api-contract-reference",
  "dir": "2026-10-19-api-contract-reference--wip",
  "title": "Публичный API-контракт и справочники",
  "mode": "semi",
  "depth": "normal",
  "tier": "T1",
  "briefFile": "2026-10-19-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:\\Users\\1\\.agents\\skills\\autopilot",
  "baseCommit": null,
  "startedAt": "2026-10-19T22:11:46+03:00",
  "updatedAt": "2026-10-19T22:29:26+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-19T22:11:46+03:00",
      "finishedAt": "2026-10-19T22:12:53+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-19T22:12:53+03:00",
      "finishedAt": "2026-10-19T22:12:54+03:00"
    },
    {
      "id": "briefing",
      "status": "done",
      "startedAt": "2026-10-19T22:12:54+03:00",
      "finishedAt": "2026-10-19T22:19:49+03:00"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-19T22:19:49+03:00",
      "finishedAt": "2026-10-19T22:29:25+03:00"
    },
    {
      "id": "plan",
      "status": "active",
      "startedAt": "2026-10-19T22:29:25+03:00"
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
    "total": 13,
    "done": 0,
    "inTicket": 13,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Полный контракт публичного слоя: схемы, документ, сторож",
      "requirements": [
        "R01",
        "R01.1",
        "R02",
        "R02.1",
        "R03",
        "R04",
        "R05",
        "R06",
        "R07",
        "R08",
        "R09i",
        "A01",
        "R10i",
        "R11i",
        "R12i",
        "R13i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/public-contract.js",
        "data/public/schema/v1/",
        "docs/api.md",
        "tests/public-contract.test.js",
        "docs/adr/0062-public-api-contract-and-driver-contributions.md"
      ],
      "review": "да — фундамент (схема, на которую ссылается контракт)",
      "model": "сильная",
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
    "found": 15,
    "fixed": 5,
    "deferred": 0,
    "items": [
      "Сверх брифа: R01.1 additionalProperties/required — глубина R01",
      "Сверх брифа: A01 сторож контракта — привязан к R09i",
      "Сверх брифа: R02.1 лицензионный конверт по файлам — глубина R02",
      "Сверх брифа: R02 упоминает CSV/SVG — полнота таблицы эндпоинтов",
      "Сверх брифа: R10i генерация схем writePublicData — следствие R08/R01",
      "Сверх брифа: R11i граница ADR 0045 — «сайт не меняется» словами пользователя",
      "Сверх брифа: R12i schema_version=1 — версионирование уже в контракте",
      "Сверх брифа: R13i CORS/ETag/cache в документе — констатация брифа",
      "Сверх брифа: дополнение ADR 0062 — фиксация охвата",
      "Сверх брифа: поля countries/admin_center — фактическая форма regions.json"
    ]
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-10-19T22:11:46+03:00",
    "2026-10-19T22:12:53+03:00",
    "2026-10-19T22:12:54+03:00",
    "2026-10-19T22:13:01+03:00",
    "2026-10-19T22:19:22+03:00",
    "2026-10-19T22:19:49+03:00",
    "2026-10-19T22:28:34+03:00",
    "2026-10-19T22:29:25+03:00",
    "2026-10-19T22:29:26+03:00"
  ],
  "rev": 15,
  "waiting": null,
  "waits": [
    {
      "kind": "briefing",
      "from": "2026-10-19T22:13:01+03:00",
      "to": "2026-10-19T22:19:22+03:00"
    }
  ],
  "log": [
    {
      "t": "2026-10-19T22:11:46+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-19T22:12:53+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-19T22:12:54+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "start"
    },
    {
      "t": "2026-10-19T22:13:01+03:00",
      "k": "ask",
      "kind": "briefing",
      "note": "три вопроса — хвосты прошлой сборки, охват контракта, страница API"
    },
    {
      "t": "2026-10-19T22:19:22+03:00",
      "k": "answered",
      "kind": "briefing"
    },
    {
      "t": "2026-10-19T22:19:49+03:00",
      "k": "gate",
      "g": "G1",
      "ok": true,
      "open": 0,
      "total": 13
    },
    {
      "t": "2026-10-19T22:19:49+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-10-19T22:28:34+03:00",
      "k": "gate",
      "g": "G2",
      "ok": false,
      "found": 15,
      "fixed": 5,
      "deferred": 0
    },
    {
      "t": "2026-10-19T22:29:25+03:00",
      "k": "stage",
      "id": "plan",
      "act": "start"
    },
    {
      "t": "2026-10-19T22:29:25+03:00",
      "k": "tier",
      "v": "T1"
    },
    {
      "t": "2026-10-19T22:29:26+03:00",
      "k": "tickets",
      "n": 1
    },
    {
      "t": "2026-10-19T22:29:26+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«data/public/schema/v1/.json — JSON Schema»",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«docs/api.md — эндпоинты, поля, версия, лицензия, примеры»",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«data/public/regions.json — id, названия, таксономия»",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«data/public/criteria.json — 46 критериев, драйверы, описания»",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«data/public/methodology.json — веса, пороги, версия»",
      "status": "in-ticket"
    },
    {
      "id": "R06",
      "text": "«data/public/weeks/<date>.json — понедельные файлы для кеширования и embed»",
      "status": "in-ticket"
    },
    {
      "id": "R07",
      "text": "«Это делает Cassandra источником, а не только сайтом.»",
      "status": "in-ticket"
    },
    {
      "id": "R08",
      "text": "«Дёшево, потому что данные уже есть.»",
      "status": "in-ticket"
    },
    {
      "id": "R09i",
      "text": "(подразумевается) контракт покрывает весь публичный слой, а не только шесть названных путей: changelog.json, digest/, validation.json, forecast-ledger.json — тоже публичные файлы",
      "status": "in-ticket"
    },
    {
      "id": "R10i",
      "text": "(подразумевается) справочники и схемы — производные от кода, пересобираются CLI; ручная правка ловится тестом",
      "status": "in-ticket"
    },
    {
      "id": "R11i",
      "text": "(подразумевается) контракт не раскрывает больше, чем уже раскрыто публично (UI-граница ADR 0045): веса/пороги — можно, формулы на сайте — нет",
      "status": "in-ticket"
    },
    {
      "id": "R12i",
      "text": "(подразумевается) версионирование и обратная совместимость: потребитель видит schema_version и игнорирует незнакомые поля",
      "status": "in-ticket"
    },
    {
      "id": "R13i",
      "text": "(подразумевается) «уже отдаётся с Access-Control-Allow-Origin: \\, ETag и cache» — не сломать и зафиксировать в контракте",
      "status": "in-ticket"
    }
  ],
  "gates": {
    "G1": {
      "ok": true,
      "at": "2026-10-19T22:19:49+03:00",
      "open": 0,
      "total": 13
    },
    "G2": {
      "ok": false,
      "at": "2026-10-19T22:28:34+03:00",
      "found": 15,
      "fixed": 5,
      "deferred": 0
    },
    "G3": {
      "ok": true,
      "at": "2026-10-19T22:29:26+03:00",
      "problems": 0
    }
  },
  "result": null
}
