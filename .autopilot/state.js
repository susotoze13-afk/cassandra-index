window.STATE =
{
  "slug": "cassandra-index-publish",
  "dir": "2026-09-20-cassandra-index-publish--wip",
  "title": "Публикация сервиса Индекс Кассандры",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T1",
  "briefFile": "2026-09-20-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-09-20T22:08:30+03:00",
  "updatedAt": "2026-09-20T22:24:00+03:00",
  "finishedAt": null,
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-09-20T22:08:30+03:00", "finishedAt": "2026-09-20T22:09:30+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-09-20T22:09:30+03:00", "finishedAt": "2026-09-20T22:14:00+03:00" },
    { "id": "briefing",  "status": "skipped", "note": "полный автомат — самобрифинг, решения в manifest.md" },
    { "id": "spec",      "status": "done", "startedAt": "2026-09-20T22:14:00+03:00", "finishedAt": "2026-09-20T22:18:00+03:00" },
    { "id": "plan",      "status": "done", "startedAt": "2026-09-20T22:18:00+03:00", "finishedAt": "2026-09-20T22:22:00+03:00", "note": "2 таска, ярус T1 — волна 1 (01), волна 2 (02, ждёт подтверждения пользователя)" },
    { "id": "build",     "status": "active", "startedAt": "2026-09-20T22:22:00+03:00", "note": "таск 01 в работе" },
    { "id": "review",    "status": "pending" },
    { "id": "final",     "status": "pending" }
  ],
  "requirements": {
    "total": 5, "done": 0, "inTicket": 5, "inSpec": 0,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [
    { "id": "01", "title": "Выкатная обвязка: GitHub Actions workflow + инструкция обновления",
      "requirements": ["R01", "R02i", "R04i", "R05i"],
      "blockedBy": [], "wave": 1, "zone": [".github/workflows/", "AGENTS.md"],
      "status": "review", "startedAt": "2026-09-20T22:24:00+03:00", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "02", "title": "Публикация: репозиторий, push, проверка живого URL",
      "requirements": ["R01", "R03i"],
      "blockedBy": ["01"], "wave": 2, "zone": ["git remote / GitHub"],
      "status": "pending", "retries": 0, "repairs": 0, "handoffs": 0,
      "note": "действие наружу — только после подтверждения пользователя" }
  ],
  "singlePass": null,
  "tests": null,
  "debt": { "placeholders": [], "assumptions": [], "emptyEnv": [] },
  "additions": [],
  "coverage": {
    "gate": "G2",
    "checkedAt": "2026-09-20T22:18:00+03:00",
    "findings": 0,
    "detail": "независимая сверка brief↔spec: не покрытого нет, наполовину нет; всё сверх брифа — привязанные допущения (R02i–R05i)"
  },
  "concerns": [],
  "reviewers": { "manifestSpec": null, "craft": null },
  "blind": null
}
