window.STATE =
{
  "slug": "index-3weeks-calibration",
  "dir": "2026-09-21-index-3weeks-calibration--wip",
  "title": "Расчёт индекса за 3 недели + калибровка",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": null,
  "briefFile": "2026-09-21-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-09-21T07:56:24+03:00",
  "updatedAt": "2026-09-21T07:58:30+03:00",
  "finishedAt": null,
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-09-21T07:56:24+03:00", "finishedAt": "2026-09-21T07:58:30+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-09-21T07:58:30+03:00", "finishedAt": "2026-09-21T08:05:00+03:00" },
    { "id": "briefing",  "status": "skipped", "note": "полный автомат — самобрифинг, решения A1–A5 в manifest.md" },
    { "id": "spec",      "status": "done", "startedAt": "2026-09-21T08:05:00+03:00", "finishedAt": "2026-09-21T08:20:00+03:00" },
    { "id": "plan",      "status": "done", "startedAt": "2026-09-21T08:20:00+03:00", "finishedAt": "2026-09-21T08:35:00+03:00", "note": "ярус T2 — 4 таска в 3 волны: 1 (01), 2 (02, 03 параллельно), 3 (04)" },
    { "id": "build",     "status": "active", "startedAt": "2026-09-21T08:35:00+03:00" },
    { "id": "review",    "status": "pending" },
    { "id": "final",     "status": "pending" }
  ],
  "requirements": {
    "total": 9, "done": 0, "inTicket": 9, "inSpec": 0,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [
    { "id": "01", "title": "Расчётное ядро пайплайна", "requirements": ["R01", "R04i", "R07i"],
      "blockedBy": [], "wave": 1, "zone": ["calc/engine.js", "calc/params.js", "tests/calc-engine.test.js"],
      "status": "in-progress", "startedAt": "2026-09-21T08:07:06+03:00", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "02", "title": "Входные сигналы трёх недель", "requirements": ["R02", "R05i"],
      "blockedBy": ["01"], "wave": 2, "zone": ["calc/input/"],
      "status": "pending", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "03", "title": "Якорные сценарии и калибровка", "requirements": ["R03", "R06i", "R09i"],
      "blockedBy": ["01"], "wave": 2, "zone": ["calc/input/anchors/", "calc/calibrate.js", "docs/calibration-journal.md"],
      "status": "pending", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "04", "title": "Пересчёт трёх недель в data/ и выкатная обвязка", "requirements": ["R02", "R01"],
      "blockedBy": ["01", "02", "03"], "wave": 3, "zone": ["calc/calc.js", "data/2026-08-30/", "data/2026-09-06/", "data/2026-09-13/"],
      "status": "pending", "retries": 0, "repairs": 0, "handoffs": 0 }
  ],
  "singlePass": null,
  "tests": null,
  "debt": { "placeholders": [], "assumptions": [], "emptyEnv": [] },
  "additions": [],
  "coverage": { "missing": 0, "half": 0, "extra": 9, "disposition": "все extras — R##.n-углубления или R##i-подразумеваемые из манифеста; перезапись значений 3 недель — суть R02 (пересчёт), зафиксировано в spec Решение 5/8" },
  "concerns": [],
  "reviewers": { "manifestSpec": null, "craft": null },
  "blind": null
}
