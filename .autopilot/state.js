window.STATE =
{
  "version": 2,
  "slug": "country-layer",
  "dir": "2026-10-25-country-layer--wip",
  "title": "Страновой слой индекса: Россия и Украина",
  "mode": "full",
  "depth": "normal",
  "tier": "T2",
  "briefFile": "2026-10-25-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": null,
  "startedAt": "2026-10-25T08:57:30+03:00",
  "updatedAt": "2026-10-25T15:11:13+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-25T08:57:30+03:00",
      "finishedAt": "2026-10-25T08:58:24+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-25T08:58:24+03:00",
      "finishedAt": "2026-10-25T15:07:53+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-10-25T08:58:52+03:00",
      "finishedAt": "2026-10-25T08:58:52+03:00",
      "note": "полный автомат — самобрифинг"
    },
    {
      "id": "spec",
      "status": "active",
      "startedAt": "2026-10-25T15:07:53+03:00"
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
    "total": 12,
    "done": 0,
    "inTicket": 11,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 1,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Ядро атрибуции и страновой модуль",
      "requirements": [
        "R05",
        "R11i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/engine.js",
        "calc/params.js",
        "calc/country-layer.js",
        "tests/"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "02",
      "title": "Пайплайн недели и контракт снапшота",
      "requirements": [
        "R02",
        "R03",
        "R11i",
        "R12i"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "calc/calc.js",
        "calc/week-step.js",
        "js/data.js",
        "tests/"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "03",
      "title": "Оверлей атрибуции для недели 2026-10-25",
      "requirements": [
        "R01",
        "R05",
        "R09i"
      ],
      "blockedBy": [
        "02"
      ],
      "wave": 3,
      "zone": [
        "calc/input/countries/",
        "data/2026-10-25/",
        "calc/classify.js"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "04",
      "title": "Публичный API странового слоя",
      "requirements": [
        "R09i",
        "R10i"
      ],
      "blockedBy": [
        "02"
      ],
      "wave": 3,
      "zone": [
        "calc/public-export.js",
        "calc/public-contract.js",
        "docs/api.md",
        "data/public/",
        "tests/"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "05",
      "title": "Страновой блок на сайте",
      "requirements": [
        "R08i"
      ],
      "blockedBy": [
        "02"
      ],
      "wave": 4,
      "zone": [
        "js/sections/regions.js",
        "js/i18n.js",
        "css/styles.css",
        "tests/",
        "js/bundle*.js"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "06",
      "title": "ADR, документы и честное обновление аудита",
      "requirements": [
        "R04",
        "R06"
      ],
      "blockedBy": [
        "03",
        "04"
      ],
      "wave": 4,
      "zone": [
        "docs/",
        "data/public/methodology.json",
        "AGENTS.md",
        "indices-audit.html"
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
      "Атрибуция стран — отдельный оверлей calc/input/countries/<неделя>.json; файл входа недели не трогаем",
      "Стартовое отклонение страны наследуется от её региона; глобальный индекс не меняется",
      "Публичный слой — новый файл data/public/countries/<неделя>.json, PUBLIC_SCHEMA_VERSION не растёт",
      "Клетка Ст аудита открывается при >=2 странах с >=2 независимыми кластерами и раскрытом покрытии",
      "UI — страновой блок внутри секции регионов, hero не меняется"
    ],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "found": 3,
    "fixed": 2,
    "deferred": 1,
    "items": [
      "R04 — клетки И/Р аудита остаются нулями осознанно (И — календарь, Р — вне брифа): зафиксировано в «Вне рамок» спецификации"
    ]
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-10-25T08:57:30+03:00",
    "2026-10-25T08:58:23+03:00",
    "2026-10-25T08:58:24+03:00",
    "2026-10-25T08:58:51+03:00",
    "2026-10-25T08:58:52+03:00",
    "2026-10-25T15:07:53+03:00",
    "2026-10-25T15:09:28+03:00",
    "2026-10-25T15:10:52+03:00",
    "2026-10-25T15:10:53+03:00",
    "2026-10-25T15:11:13+03:00"
  ],
  "rev": 12,
  "waiting": null,
  "waits": [],
  "log": [
    {
      "t": "2026-10-25T08:57:30+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-25T08:58:24+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-25T08:58:51+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 5
    },
    {
      "t": "2026-10-25T08:58:52+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "skip",
      "note": "полный автомат — самобрифинг"
    },
    {
      "t": "2026-10-25T15:07:53+03:00",
      "k": "gate",
      "g": "G1",
      "ok": true,
      "open": 0,
      "total": 12
    },
    {
      "t": "2026-10-25T15:07:53+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-10-25T15:09:28+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 3,
      "fixed": 2,
      "deferred": 1
    },
    {
      "t": "2026-10-25T15:10:52+03:00",
      "k": "tier",
      "v": "T2"
    },
    {
      "t": "2026-10-25T15:10:52+03:00",
      "k": "tickets",
      "n": 6
    },
    {
      "t": "2026-10-25T15:10:53+03:00",
      "k": "gate",
      "g": "G3",
      "ok": false,
      "problems": 2
    },
    {
      "t": "2026-10-25T15:11:13+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«по России и Ураине»",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«с ближайшей недели»",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«и далее шаг за шагом»",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«честно повысить позицию до 3-4 места … по результатам исследолвания docs/articles/habr-indices-audit.md и синхронный habr-indices-audit.plain.txt»",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«Да» (ответ на вопрос «страновой слой делаем forward-only с ближайшей недели…?»)",
      "status": "in-ticket"
    },
    {
      "id": "R06",
      "text": "«Что мне необходимо дорабюотать в методологии и в проекте»",
      "status": "in-ticket"
    },
    {
      "id": "R07",
      "text": "«full»",
      "status": "deferred",
      "why": "режим прогона, не свойство продукта — несёт режим, а не результат"
    },
    {
      "id": "R08i",
      "text": "(подразумевается) читатель должен увидеть значение по стране на сайте",
      "status": "in-ticket"
    },
    {
      "id": "R09i",
      "text": "(подразумевается) слой обязан раскрывать покрытие, слепые страны и неопределённость — иначе теряются уже заработанные клетки Г и Н аудита",
      "status": "in-ticket"
    },
    {
      "id": "R10i",
      "text": "(подразумивается) машинный контракт: data/public/, docs/api.md, JSON-схема — по правилу репозитория каждый публичный JSON",
      "status": "in-ticket"
    },
    {
      "id": "R11i",
      "text": "(подразумивается) глобальный индекс и опубликованная история (08-30…10-18) не меняются, переписывать нельзя",
      "status": "in-ticket"
    },
    {
      "id": "R12i",
      "text": "(подразумивается) паритет и регрессия: тесты репозитория зелёные, комбинированный week.js и его набор частей сходятся",
      "status": "in-ticket"
    }
  ],
  "gates": {
    "G1": {
      "ok": true,
      "at": "2026-10-25T15:07:53+03:00",
      "open": 0,
      "total": 12
    },
    "G2": {
      "ok": true,
      "at": "2026-10-25T15:09:28+03:00",
      "found": 3,
      "fixed": 2,
      "deferred": 1
    },
    "G3": {
      "ok": true,
      "at": "2026-10-25T15:11:13+03:00",
      "problems": 0
    }
  },
  "result": null
}
