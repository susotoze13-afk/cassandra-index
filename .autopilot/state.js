window.STATE =
{
  "slug": "site-design-revisions",
  "dir": "2026-10-17-site-design-revisions--wip",
  "title": "Дизайн сайта с учётом новых правок (панель доверия, ступени, покрытие)",
  "mode": "semi",
  "depth": "normal",
  "polish": null,
  "tier": null,
  "briefFile": "2026-10-17-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-17T16:53:31+03:00",
  "updatedAt": "2026-10-17T17:12:30+03:00",
  "finishedAt": null,
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-17T16:53:31+03:00", "finishedAt": "2026-10-17T16:55:10+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-17T16:55:10+03:00", "finishedAt": "2026-10-17T16:56:40+03:00" },
    { "id": "briefing",  "status": "done", "startedAt": "2026-10-17T16:56:40+03:00", "finishedAt": "2026-10-17T17:02:00+03:00", "note": "semi: 2 форка — объём «интеграция новых блоков» и «коммит локально, пуш за пользователем»; оба отвечены" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-17T17:02:00+03:00", "finishedAt": "2026-10-17T17:12:30+03:00", "note": "G2: независимый чекер — 2 находки (поле покрытия T01 без истории; пуш-статус выглядел противоречием без дополнений брифа); обе закрыты: история 5 + ответы пользователя внесены в Дополнения брифа" },
    { "id": "plan",      "status": "skipped", "startedAt": "2026-10-17T17:12:30+03:00", "finishedAt": "2026-10-17T17:15:00+03:00", "note": "ярус T0 — одна зона (css/styles.css + index.html), одна поверхность, без внешних сервисов; собираю сразу из spec, без разбивки на таски" },
    { "id": "build",     "status": "active", "startedAt": "2026-10-17T17:15:00+03:00" },
    { "id": "review",    "status": "pending" },
    { "id": "final",     "status": "pending" }
  ],
  "requirements": {
    "total": 0, "done": 0, "inTicket": 0, "inSpec": 0,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [],
  "singlePass": null,
  "tests": null,
  "debt": { "placeholders": [], "assumptions": [], "emptyEnv": [] },
  "additions": [],
  "coverage": { "gate": "G2", "findings": 2, "resolved": 2, "details": "T01-поле покрытия → история 5 в spec; пуш-статус → ответы брифинга в Дополнения brief.md" },
  "concerns": [],
  "reviewers": { "manifestSpec": null, "craft": null },
  "blind": null
}
