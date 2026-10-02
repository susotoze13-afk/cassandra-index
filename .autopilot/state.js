window.STATE =
{
  "slug": "region-blind-offset",
  "dir": "2026-10-02-region-blind-offset",
  "title": "Слепые регионы: сохранение регионального отклонения; тренд только методологии 2.0",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T0",
  "briefFile": "2026-10-02-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-02T22:02:43+03:00",
  "updatedAt": "2026-10-02T22:19:10+03:00",
  "finishedAt": "2026-10-02T22:19:10+03:00",
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-02T22:02:43+03:00", "finishedAt": "2026-10-02T22:07:00+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-02T22:05:00+03:00", "finishedAt": "2026-10-02T22:07:00+03:00" },
    { "id": "briefing",  "status": "skipped", "note": "full — самобрифинг; ASSUMPTION: незакоммиченная работа 09-30 — законченная задача, доделать и сдать" },
    { "id": "spec",      "status": "skipped", "note": "код написан до открытия прогона (прерванная сессия 09-30); дифф = контракт, ретроспективная спека не писалась" },
    { "id": "plan",      "status": "skipped", "note": "однопроходный прогон T0 без тасок — доводка уже готовой работы" },
    { "id": "build",     "status": "done", "startedAt": "2026-09-30T19:22:00+03:00", "finishedAt": "2026-10-02T22:04:00+03:00", "note": "работа сделана в прерванной сессии; оркестратор верифицировал: node build.js + node --test → 253/253" },
    { "id": "review",    "status": "done", "startedAt": "2026-10-02T22:07:00+03:00", "finishedAt": "2026-10-02T22:15:00+03:00", "note": "craft-ревью: BLOCKING нет; 6 неблокирующих находок → concerns (триаж: все в отчёт, ничего не чинить)" },
    { "id": "final",     "status": "done", "startedAt": "2026-10-02T22:15:00+03:00", "finishedAt": "2026-10-02T22:19:10+03:00", "note": "слепая приёмка: 6/6 требований реализовано, 0 расхождений; коммит e47fe1d + посадка, push — оркестратору" }
  ],
  "requirements": {
    "total": 6, "done": 6, "inTicket": 0, "inSpec": 0,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [],
  "singlePass": true,
  "tests": "253/253",
  "debt": { "placeholders": [], "assumptions": ["незакоммиченная работа 09-30 — законченная задача, доделать и сдать"], "emptyEnv": [] },
  "additions": [],
  "coverage": null,
  "concerns": [
    "craft · js/sections/trend.js · summaryTextV2 дублирует логику summaryText (разбор Δ и склонение «пункт») — слить в одно место при следующем касании тренда",
    "craft · js/sections/trend.js · summaryText после диффа не вызывается рендером (только тест и экспорт бандла) — мёртвая поверхность, удалить или вернуть вызов",
    "craft · tests/calc-engine.test.js · ветка clamp переноса отклонения (|prevIndex−prevGlobal| > regionClamp=40) не покрыта тестом",
    "craft · js/sections/trend.js · «за N недель» в подписи считает опубликованные точки v2, а не календарный спан (неделя с value:null выпадает из знаменателя)",
    "craft · data/audit.jsonl · diff записей recalc — только глобальные поля; региональный перенос в аудит не попадает (зафиксировано в AGENTS.md)"
  ],
  "reviewers": { "manifestSpec": null, "craft": "agent-0" },
  "blind": {
    "result": "6/6 реализовано, 0 расхождений с манифестом",
    "note": "вне брифа: недели 09-20 и 09-27 новой моделью не пересчитаны — их регионы на сайте равны глобалу (56/56…, 47/47…); открытый вопрос к пользователю: пересчитать их той же командой или оставить"
  }
}
