window.STATE =
{
  "version": 2,
  "slug": "regional-iwith-degeneracy",
  "dir": "2026-10-24-regional-iwith-degeneracy--wip",
  "title": "Региональные гипотетики §7: порог покрытия (вариант E)",
  "mode": "full",
  "depth": "normal",
  "tier": "T1",
  "briefFile": "2026-10-24-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": null,
  "startedAt": "2026-10-24T12:10:43+03:00",
  "updatedAt": "2026-10-24T12:17:39+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-24T12:10:43+03:00",
      "finishedAt": "2026-10-24T12:11:12+03:00"
    },
    {
      "id": "manifest",
      "status": "active",
      "startedAt": "2026-10-24T12:11:12+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-10-24T12:12:11+03:00",
      "finishedAt": "2026-10-24T12:12:11+03:00",
      "note": "полный автомат — самобрифинг, открытые места закрыты ASSUMPTION в манифесте"
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
    "total": 15,
    "done": 0,
    "inTicket": 15,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Порог покрытия в региональных гипотетиках §7 (вариант E)",
      "requirements": [
        "R01",
        "R01.1",
        "R02",
        "R03",
        "R03.1",
        "R03.2",
        "R04",
        "R05",
        "R06",
        "R07",
        "R08",
        "R09",
        "R10",
        "R11",
        "R12",
        "R13",
        "R14",
        "R15i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/engine.js",
        "calc/params.js",
        "calc/week-step.js",
        "tests/regional-signals.test.js",
        "tests/regional-hypothesis.test.js",
        "docs/adr/0065-regional-hypothesis-coverage.md",
        "docs/preproduction-decisions.md",
        "docs/regional-iwith-degeneracy.md"
      ],
      "review": "да — фундамент",
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
    "found": 13,
    "fixed": 12,
    "deferred": 1,
    "items": [
      "R13 — пересчёт истории 08-30…10-18: вопрос задан пользователю (ask action); без ответа действует forward-only, данные не переписываются"
    ]
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-10-24T12:10:43+03:00",
    "2026-10-24T12:11:12+03:00",
    "2026-10-24T12:12:11+03:00",
    "2026-10-24T12:16:54+03:00",
    "2026-10-24T12:17:38+03:00",
    "2026-10-24T12:17:39+03:00"
  ],
  "rev": 9,
  "waiting": null,
  "waits": [],
  "log": [
    {
      "t": "2026-10-24T12:10:43+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-24T12:11:12+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-24T12:12:11+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "skip",
      "note": "полный автомат — самобрифинг, открытые места закрыты ASSUMPTION в манифесте"
    },
    {
      "t": "2026-10-24T12:16:54+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 13,
      "fixed": 12,
      "deferred": 1
    },
    {
      "t": "2026-10-24T12:17:38+03:00",
      "k": "tier",
      "v": "T1"
    },
    {
      "t": "2026-10-24T12:17:38+03:00",
      "k": "tickets",
      "n": 1
    },
    {
      "t": "2026-10-24T12:17:39+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«В двух вызовах hypotheticalIndex порог заменяется на эпсилон»",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«PARAMS.regionHypothesisThreshold = 1e-9 (единственный источник числа, комментарий…)»",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«Обе ноги Δ (with и without) получают одинаковое правило — сопоставимость сохраняется»",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«Глобальный индекс всех недель цепочки, q, states, публикация, sensitivity, debt — не меняются»",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«D9 порог не задет; глобальная агрегация §5, q, k — не трогаются вообще»",
      "status": "in-ticket"
    },
    {
      "id": "R06",
      "text": "«Перегонка 10-18: iWith russia-belarus и ukraine-moldova > 0 (прототип: 77 и 60, ±1)»",
      "status": "in-ticket"
    },
    {
      "id": "R07",
      "text": "«tests/regional-signals.test.js:94 — пин eu.iWithout === 0 в E станет ≈ 37.7 … обновить пин и комментарий»",
      "status": "in-ticket"
    },
    {
      "id": "R08",
      "text": "«tests/regional-signals.test.js:100 — пин af.iWith === 0 останется»",
      "status": "in-ticket"
    },
    {
      "id": "R09",
      "text": "«central-asia остаётся с iWith=0 — это легальный деэскалационный результат, а не вырождение; комментарий в ADR»",
      "status": "in-ticket"
    },
    {
      "id": "R10",
      "text": "«node --test зелёный»",
      "status": "in-ticket"
    },
    {
      "id": "R11",
      "text": "«Глобальный индекс каждой недели цепочки неизменен (51/42/43/56/47/46/56/64)»",
      "status": "in-ticket"
    },
    {
      "id": "R12",
      "text": "«Принять вариант E (или другой — документ фиксирует исследование, не приказ)»",
      "status": "in-ticket"
    },
    {
      "id": "R13",
      "text": "«Версия и охват — выбор между: forward-only с даты …; региональным пересчётом цепочки 3.0 …»",
      "status": "in-ticket"
    },
    {
      "id": "R14",
      "text": "«ADR 0065 — предложение: «Региональные гипотетики §7: порог покрытия» — зафиксировать эпсилон, свойства E (§5), итоговый выбор версии»",
      "status": "in-ticket"
    },
    {
      "id": "R15i",
      "text": "(подразумевается) документ задачи после решения перестаёт быть «задачей к решению» и не противоречит закрытой O10",
      "status": "in-ticket"
    }
  ],
  "gates": {
    "G2": {
      "ok": true,
      "at": "2026-10-24T12:16:54+03:00",
      "found": 13,
      "fixed": 12,
      "deferred": 1
    },
    "G3": {
      "ok": true,
      "at": "2026-10-24T12:17:39+03:00",
      "problems": 0
    }
  },
  "result": null
}
