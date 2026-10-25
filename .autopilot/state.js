window.STATE =
{
  "version": 2,
  "slug": "country-layer",
  "dir": "2026-10-25-country-layer--wip",
  "title": "Страновой слой индекса: Россия и Украина",
  "mode": "full",
  "depth": "normal",
  "tier": null,
  "briefFile": "2026-10-25-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": null,
  "startedAt": "2026-10-25T08:57:30+03:00",
  "updatedAt": "2026-10-25T08:58:52+03:00",
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
      "status": "active",
      "startedAt": "2026-10-25T08:58:24+03:00"
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
      "status": "pending"
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
    "inTicket": 0,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [],
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
  "coverage": null,
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-10-25T08:57:30+03:00",
    "2026-10-25T08:58:23+03:00",
    "2026-10-25T08:58:24+03:00",
    "2026-10-25T08:58:51+03:00",
    "2026-10-25T08:58:52+03:00"
  ],
  "rev": 6,
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
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«по России и Ураине»",
      "status": "open"
    },
    {
      "id": "R02",
      "text": "«с ближайшей недели»",
      "status": "open"
    },
    {
      "id": "R03",
      "text": "«и далее шаг за шагом»",
      "status": "open"
    },
    {
      "id": "R04",
      "text": "«честно повысить позицию до 3-4 места … по результатам исследолвания docs/articles/habr-indices-audit.md и синхронный habr-indices-audit.plain.txt»",
      "status": "open"
    },
    {
      "id": "R05",
      "text": "«Да» (ответ на вопрос «страновой слой делаем forward-only с ближайшей недели…?»)",
      "status": "open"
    },
    {
      "id": "R06",
      "text": "«Что мне необходимо дорабюотать в методологии и в проекте»",
      "status": "open"
    },
    {
      "id": "R07",
      "text": "«full»",
      "status": "open"
    },
    {
      "id": "R08i",
      "text": "(подразумевается) читатель должен увидеть значение по стране на сайте",
      "status": "open"
    },
    {
      "id": "R09i",
      "text": "(подразумевается) слой обязан раскрывать покрытие, слепые страны и неопределённость — иначе теряются уже заработанные клетки Г и Н аудита",
      "status": "open"
    },
    {
      "id": "R10i",
      "text": "(подразумевается) машинный контракт: data/public/, docs/api.md, JSON-схема — по правилу репозитория каждый публичный JSON",
      "status": "open"
    },
    {
      "id": "R11i",
      "text": "(подразумевается) глобальный индекс и опубликованная история (08-30…10-18) не меняются, переписывать нельзя",
      "status": "open"
    },
    {
      "id": "R12i",
      "text": "(подразумевается) паритет и регрессия: тесты репозитория зелёные, комбинированный week.js и его набор частей сходятся",
      "status": "open"
    }
  ],
  "gates": {},
  "result": null
}
