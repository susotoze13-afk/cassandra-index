window.STATE =
{
  "slug": "recalc-weeks-0920-0927",
  "dir": "2026-10-03-recalc-weeks-0920-0927--wip",
  "title": "Пересчёт недель 2026-09-20 и 2026-09-27 новой моделью (региональное отклонение)",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T0",
  "briefFile": "2026-10-03-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-03T08:50:10+03:00",
  "updatedAt": "2026-10-03T10:00:00+03:00",
  "finishedAt": "2026-10-03T10:00:00+03:00",
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-03T08:50:10+03:00", "finishedAt": "2026-10-03T08:55:00+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-03T08:55:00+03:00", "finishedAt": "2026-10-03T08:58:00+03:00" },
    { "id": "briefing",  "status": "skipped", "note": "full — самобрифинг; ASSUMPTION: пересчёт только числовых файлов движком (та же процедура, что прогон region-blind-offset для 08-30…09-13), входы calc/input не меняются" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-03T08:58:00+03:00", "finishedAt": "2026-10-03T09:06:00+03:00", "note": "G2: собственный проход 0 open; независимый — 0 пробелов, 4 «сверх брифа» = легитимные R03i/R04i с родителем" },
    { "id": "plan",      "status": "skipped", "note": "ярус T0 — без разбивки на таски; сборка одним контекстом прямо по спецификации" },
    { "id": "build",     "status": "done", "startedAt": "2026-10-03T09:06:00+03:00", "finishedAt": "2026-10-03T09:55:00+03:00", "note": "обе недели пересчитаны --write: глобал не изменился (56/47), регионы разошлись с глобалом (перенос отклонения); битая ссылка abcnews (404) починена заменой на реальную статью того же домена (R04i.1); аудит recalc-0022/flash-0023/recalc-0024" },
    { "id": "review",    "status": "done", "startedAt": "2026-10-03T09:55:00+03:00", "finishedAt": "2026-10-03T09:58:00+03:00", "note": "node build.js + node --test: 253/253 зелёный; diff global.js — только recalc-метаданные, index/delta прежние (R03i)" },
    { "id": "final",     "status": "done", "startedAt": "2026-10-03T09:58:00+03:00", "finishedAt": "2026-10-03T10:00:00+03:00" }
  ],
  "requirements": {
    "total": 0, "done": 0, "inTicket": 0, "inSpec": 0,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [],
  "singlePass": true,
  "tests": null,
  "debt": { "placeholders": [], "assumptions": ["пересчёт только числовых файлов движком (как прогон region-blind-offset для 08-30…09-13), входы calc/input не меняются"], "emptyEnv": [] },
  "additions": [],
  "coverage": "G2 независимый: 0 непокрытых, 0 половинчатых, 4 сверх брифа — все легитимные (R03i/R04i из контекста брифа, с родителем)",
  "concerns": [],
  "reviewers": { "manifestSpec": null, "craft": null },
  "blind": null
}
