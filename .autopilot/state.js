window.STATE =
{
  "version": 2,
  "slug": "api-contract-reference",
  "dir": "2026-10-19-api-contract-reference",
  "title": "Публичный API-контракт и справочники",
  "mode": "semi",
  "depth": "normal",
  "tier": "T1",
  "briefFile": "2026-10-19-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:\\Users\\1\\.agents\\skills\\autopilot",
  "baseCommit": "5bb3700",
  "startedAt": "2026-10-19T22:11:46+03:00",
  "updatedAt": "2026-10-19T23:08:20+03:00",
  "finishedAt": "2026-10-19T23:08:20+03:00",
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
      "status": "done",
      "startedAt": "2026-10-19T22:29:25+03:00",
      "finishedAt": "2026-10-19T22:30:15+03:00"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-10-19T22:30:15+03:00",
      "finishedAt": "2026-10-19T22:44:39+03:00"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-10-19T22:44:39+03:00",
      "finishedAt": "2026-10-19T22:52:04+03:00"
    },
    {
      "id": "final",
      "status": "done",
      "startedAt": "2026-10-19T22:52:04+03:00",
      "finishedAt": "2026-10-19T23:08:20+03:00"
    }
  ],
  "requirements": {
    "total": 13,
    "done": 13,
    "inTicket": 0,
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
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "startedAt": "2026-10-19T22:30:57+03:00",
      "finishedAt": "2026-10-19T22:44:39+03:00",
      "tests": {
        "passed": 769,
        "failed": 0
      },
      "commit": "9162f43"
    }
  ],
  "tests": {
    "passed": 769,
    "failed": 0
  },
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
  "concerns": [
    "tests/public-contract.test.js:340 — сторож ищет путь подстрокой по всему docs/api.md; удаление подробного раздела оставит тест зелёным. Нужен заголовок ### <файл> или проверка полей/примера.",
    "tests/public-contract.test.js:311 — fallback <basename>.schema.json молча принимает новый подкаталог (foo/bar.json → bar.schema.json).",
    "calc/public-contract.js:22 — KINDS импортируется из calc/changelog-entries.js; единственная новая связь схемы с генератором, осознать или продублировать enum.",
    "tests/public-contract.test.js:362-367 — nullable-тест мутирует не все nullable-пути (spearman, p_permutation, direction.rate, overlap.from/to, note).",
    "docs/api.md:398-400 — проза дублирует MAX_DISCREPANCIES (12) без пина."
  ],
  "blind": {
    "checked": 9,
    "matched": 9,
    "mismatches": []
  },
  "beats": [
    "2026-10-19T22:11:46+03:00",
    "2026-10-19T22:12:53+03:00",
    "2026-10-19T22:12:54+03:00",
    "2026-10-19T22:13:01+03:00",
    "2026-10-19T22:19:22+03:00",
    "2026-10-19T22:19:49+03:00",
    "2026-10-19T22:28:34+03:00",
    "2026-10-19T22:29:25+03:00",
    "2026-10-19T22:29:26+03:00",
    "2026-10-19T22:30:14+03:00",
    "2026-10-19T22:30:15+03:00",
    "2026-10-19T22:30:57+03:00",
    "2026-10-19T22:41:30+03:00",
    "2026-10-19T22:44:22+03:00",
    "2026-10-19T22:44:39+03:00",
    "2026-10-19T22:52:03+03:00",
    "2026-10-19T22:52:04+03:00",
    "2026-10-19T23:03:03+03:00",
    "2026-10-19T23:08:20+03:00"
  ],
  "rev": 27,
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
    },
    {
      "t": "2026-10-19T22:30:15+03:00",
      "k": "stage",
      "id": "build",
      "act": "start"
    },
    {
      "t": "2026-10-19T22:30:57+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-19T22:41:30+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "review"
    },
    {
      "t": "2026-10-19T22:44:22+03:00",
      "k": "add",
      "key": "concerns",
      "n": 5
    },
    {
      "t": "2026-10-19T22:44:39+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "done",
      "tests": {
        "passed": 769,
        "failed": 0
      }
    },
    {
      "t": "2026-10-19T22:44:39+03:00",
      "k": "stage",
      "id": "review",
      "act": "start"
    },
    {
      "t": "2026-10-19T22:52:03+03:00",
      "k": "add",
      "key": "report",
      "n": 6
    },
    {
      "t": "2026-10-19T22:52:04+03:00",
      "k": "stage",
      "id": "final",
      "act": "start"
    },
    {
      "t": "2026-10-19T23:03:03+03:00",
      "k": "gate",
      "g": "G4",
      "ok": true,
      "checked": 9,
      "matched": 9
    },
    {
      "t": "2026-10-19T23:08:20+03:00",
      "k": "tests",
      "passed": 769,
      "failed": 0
    },
    {
      "t": "2026-10-19T23:08:20+03:00",
      "k": "finish",
      "result": "Полный контракт публичного слоя: 11 JSON Schema, docs/api.md по всем файлам, тест-сторож"
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«data/public/schema/v1/.json — JSON Schema»",
      "status": "done"
    },
    {
      "id": "R02",
      "text": "«docs/api.md — эндпоинты, поля, версия, лицензия, примеры»",
      "status": "done"
    },
    {
      "id": "R03",
      "text": "«data/public/regions.json — id, названия, таксономия»",
      "status": "done"
    },
    {
      "id": "R04",
      "text": "«data/public/criteria.json — 46 критериев, драйверы, описания»",
      "status": "done"
    },
    {
      "id": "R05",
      "text": "«data/public/methodology.json — веса, пороги, версия»",
      "status": "done"
    },
    {
      "id": "R06",
      "text": "«data/public/weeks/<date>.json — понедельные файлы для кеширования и embed»",
      "status": "done"
    },
    {
      "id": "R07",
      "text": "«Это делает Cassandra источником, а не только сайтом.»",
      "status": "done"
    },
    {
      "id": "R08",
      "text": "«Дёшево, потому что данные уже есть.»",
      "status": "done"
    },
    {
      "id": "R09i",
      "text": "(подразумевается) контракт покрывает весь публичный слой, а не только шесть названных путей: changelog.json, digest/, validation.json, forecast-ledger.json — тоже публичные файлы",
      "status": "done"
    },
    {
      "id": "R10i",
      "text": "(подразумевается) справочники и схемы — производные от кода, пересобираются CLI; ручная правка ловится тестом",
      "status": "done"
    },
    {
      "id": "R11i",
      "text": "(подразумевается) контракт не раскрывает больше, чем уже раскрыто публично (UI-граница ADR 0045): веса/пороги — можно, формулы на сайте — нет",
      "status": "done"
    },
    {
      "id": "R12i",
      "text": "(подразумевается) версионирование и обратная совместимость: потребитель видит schema_version и игнорирует незнакомые поля",
      "status": "done"
    },
    {
      "id": "R13i",
      "text": "(подразумевается) «уже отдаётся с Access-Control-Allow-Origin: \\, ETag и cache» — не сломать и зафиксировать в контракте",
      "status": "done"
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
    },
    "G4": {
      "ok": true,
      "at": "2026-10-19T23:03:03+03:00",
      "checked": 9,
      "matched": 9
    }
  },
  "result": "Полный контракт публичного слоя: 11 JSON Schema, docs/api.md по всем файлам, тест-сторож",
  "report": [
    "Сторож docs/api.md ищет путь подстрокой: строка таблицы засчитывается как «описано», подробный раздел можно удалить при зелёном тесте (tests/public-contract.test.js:340).",
    "Nullable-тест покрывает не все nullable-пути схемы: direction.rate, overlap.from/to не проверены (tests/public-contract.test.js:362-367).",
    "docs/api.md:398 говорит «выпуск не переписывается», а writeDigestData пересобирает <week>.json каждой fresh-недели (calc/digest-export.js:127-138).",
    "docs/api.md:438 дублирует MAX_DISCREPANCIES=12 без пина в тесте.",
    "Примеры validation.json в docs/api.md:410,421 содержат «…» внутри объектов — копирование даёт невалидный JSON (нарушает R07 о воспроизводимых примерах).",
    "В рабочем дереве чужие правки параллельной сессии: index.html, how-to-read.html, sitemap.xml, deploy.yml, about.html — в коммит приёмки не брать; about.html вне cp-строки deploy.yml."
  ]
}
