window.STATE =
{
  "slug": "index-2026-10-18",
  "dir": "2026-10-18-index-2026-10-18--wip",
  "title": "Расчёт индекса Кассандры за неделю 12.10–18.10.2026",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T2",
  "briefFile": "2026-10-18-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-18T09:16:14+03:00",
  "updatedAt": "2026-10-18T09:55:00+03:00",
  "finishedAt": null,
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-18T09:16:14+03:00", "finishedAt": "2026-10-18T09:18:18+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-18T09:18:18+03:00", "finishedAt": "2026-10-18T09:20:00+03:00" },
    { "id": "briefing",  "status": "skipped", "startedAt": "2026-10-18T09:18:18+03:00", "finishedAt": "2026-10-18T09:20:00+03:00", "note": "полный автомат — самобрифинг" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-18T09:20:00+03:00", "finishedAt": "2026-10-18T09:24:00+03:00" },
    { "id": "plan",      "status": "done", "startedAt": "2026-10-18T09:24:00+03:00", "finishedAt": "2026-10-18T09:26:00+03:00" },
    { "id": "build",     "status": "active", "startedAt": "2026-10-18T09:26:00+03:00", "note": "3 из 4 тасков готовы" },
    { "id": "review",    "status": "active", "startedAt": "2026-10-18T09:50:00+03:00", "note": "проверено 3 из 4" },
    { "id": "final",     "status": "pending" }
  ],
  "requirements": {
    "total": 7, "done": 0, "inTicket": 6, "inSpec": 1,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [
    { "id": "01", "title": "Исследование D1/D5/D6", "requirements": ["R03i"], "blockedBy": [], "wave": 1, "zone": [".autopilot/2026-10-18-index-2026-10-18--wip/research/01.json"], "status": "done", "startedAt": "2026-10-18T09:28:00+03:00", "finishedAt": "2026-10-18T09:50:00+03:00", "retries": 0, "repairs": 0, "handoffs": 0, "files": [".autopilot/2026-10-18-index-2026-10-18--wip/research/01.json"], "tests": null, "commit": "T01" },
    { "id": "02", "title": "Исследование D2/D3/D4", "requirements": ["R03i"], "blockedBy": [], "wave": 1, "zone": [".autopilot/2026-10-18-index-2026-10-18--wip/research/02.json"], "status": "done", "startedAt": "2026-10-18T09:28:00+03:00", "finishedAt": "2026-10-18T09:50:00+03:00", "retries": 0, "repairs": 0, "handoffs": 0, "files": [".autopilot/2026-10-18-index-2026-10-18--wip/research/02.json"], "tests": null, "commit": "T02" },
    { "id": "03", "title": "Исследование D7/D8/D9", "requirements": ["R03i"], "blockedBy": [], "wave": 1, "zone": [".autopilot/2026-10-18-index-2026-10-18--wip/research/03.json"], "status": "done", "startedAt": "2026-10-18T09:28:00+03:00", "finishedAt": "2026-10-18T09:50:00+03:00", "retries": 0, "repairs": 0, "handoffs": 0, "files": [".autopilot/2026-10-18-index-2026-10-18--wip/research/03.json"], "tests": null, "commit": "T03" },
    { "id": "04", "title": "Сборка входа, сиды, расчёт и публикация недели 2026-10-18", "requirements": ["R01", "R02", "R03i", "R04i", "R04i.1", "R05i"], "blockedBy": ["01", "02", "03"], "wave": 2, "zone": ["calc/input/2026-10-18.json", "data/2026-10-18/", "data/latest.js", "calc/calc.js"], "status": "pending", "retries": 0, "repairs": 0, "handoffs": 0 }
  ],
  "singlePass": null,
  "tests": null,
  "debt": { "placeholders": [], "assumptions": [], "emptyEnv": [] },
  "additions": [],
  "coverage": { "findings": 3, "missing": 0, "half": 0, "extra": 0, "note": "независимая проверка брифа↔спеки: замечания только про параметры процесса (режим full / глубина / доводка) — они не продуктовые требования и в спеку не входят; «лишние» пункты — подразумеваемые требования конвейера (R##i). Продуктовых пропусков нет" },
  "concerns": [],
  "reviewers": { "manifestSpec": null, "craft": null },
  "blind": null
}
