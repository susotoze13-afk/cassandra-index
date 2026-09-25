window.STATE =
{
  "slug": "post-run-polish",
  "dir": "2026-09-21-post-run-polish",
  "title": "Доводка замечаний + публикация",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T1",
  "briefFile": "2026-09-21-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-09-21T20:31:03+03:00",
  "updatedAt": "2026-09-21T21:05:00+03:00",
  "finishedAt": "2026-09-21T21:05:00+03:00",
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-09-21T20:31:03+03:00", "finishedAt": "2026-09-21T20:31:30+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-09-21T20:31:30+03:00", "finishedAt": "2026-09-21T20:40:00+03:00" },
    { "id": "briefing",  "status": "skipped" },
    { "id": "spec",      "status": "done", "startedAt": "2026-09-21T20:40:00+03:00", "finishedAt": "2026-09-21T20:44:00+03:00" },
    { "id": "plan",      "status": "done", "startedAt": "2026-09-21T20:44:00+03:00", "finishedAt": "2026-09-21T20:45:00+03:00" },
    { "id": "build",     "status": "done", "startedAt": "2026-09-21T20:45:00+03:00", "finishedAt": "2026-09-21T21:00:00+03:00" },
    { "id": "review",    "status": "done", "startedAt": "2026-09-21T21:00:00+03:00", "finishedAt": "2026-09-21T21:04:00+03:00" },
    { "id": "final",     "status": "done", "startedAt": "2026-09-21T21:04:00+03:00", "finishedAt": "2026-09-21T21:05:00+03:00" }
  ],
  "requirements": {
    "total": 3, "done": 3, "inTicket": 15, "inSpec": 15,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [
    { "id": "01", "title": "Доводка кода и тестов calc/ (пункты 1–9)", "status": "done", "commit": "2a22308" },
    { "id": "02", "title": "Журнал калибровки и якорь cuban-1962 (пункты 10–15)", "status": "done", "commit": "df9314e" }
  ],
  "singlePass": null,
  "tests": { "before": "150/150", "after": "151/151" },
  "debt": { "placeholders": [], "assumptions": [
    "Брифинг пропущен (прогон T1, маленький) — допущения зафиксированы в manifest.md",
    "Числа расчётов не менялись по жёсткому инварианту (60/58/57, k=1.95) — подтверждено ревью"
  ], "emptyEnv": [] },
  "additions": [],
  "coverage": null,
  "concerns": [
    "calc/calc.js: prev-файлы регионов читаются дважды (сбор снапшота + рендер) — условие: при третьем месте чтения вынести загрузку в state (из craft-ревью, не блокер)",
    "Параллельный прогон 2026-09-21-preprod-decisions--wip ведёт другая сессия Autopilot: корневой .autopilot/state.js и dashboard ей принадлежат, финальный sync этого прогона пропущен, чтобы не затирать её состояние"
  ],
  "reviewers": { "manifestSpec": null, "craft": "agent-54/agent-55 — оба clean, блокеров нет" },
  "blind": null
}
