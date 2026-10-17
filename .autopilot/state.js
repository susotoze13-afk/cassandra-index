window.STATE =
{
  "slug": "trust-panel-levels",
  "dir": "2026-10-17-trust-panel-levels--wip",
  "title": "Витрина доверия и ступени уровней (ADR 0033)",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T1",
  "briefFile": "2026-10-17-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-17T13:33:30+03:00",
  "updatedAt": "2026-10-17T13:50:46+03:00",
  "finishedAt": null,
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-17T13:33:30+03:00", "finishedAt": "2026-10-17T13:34:45+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-17T13:34:45+03:00", "finishedAt": "2026-10-17T13:35:41+03:00" },
    { "id": "briefing",  "status": "skipped", "startedAt": "2026-10-17T13:35:41+03:00", "finishedAt": "2026-10-17T13:35:41+03:00", "note": "полный автомат — самобрифинг; решения за пользователя помечены ASSUMPTION в manifest.md, вопросов не задавалось; адверсариальный проход не запускался (глубина обычная)" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-17T13:35:41+03:00", "finishedAt": "2026-10-17T13:41:13+03:00", "note": "спецификация + независимая проверка покрытия (отдельный агент по брифу и spec, без манифеста): расхождений по существу нет, отмеченные пункты — мета-конфигурация запуска, зафиксировано в spec §Примечания" },
    { "id": "plan",      "status": "done", "startedAt": "2026-10-17T13:41:13+03:00", "finishedAt": "2026-10-17T13:43:06+03:00", "note": "ярус T1 — 2 таска; волны 1 и 2 последовательно (js/data.js и js/sections/* делят пересобираемый js/bundle.js — параллель невозможна); interfaces.md засеян до первого таска" },
    { "id": "build",     "status": "active", "startedAt": "2026-10-17T13:43:06+03:00", "note": "1 из 2 тасков готов (T01); волна 2 (T02) — следующим" },
    { "id": "review",    "status": "pending" },
    { "id": "final",     "status": "pending" }
  ],
  "requirements": {
    "total": 23, "done": 4, "inTicket": 12, "inSpec": 0,
    "placeholder": 1, "deferred": 6, "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Покрытие критериев: снапшот и контракт",
      "requirements": ["R05", "R06", "R18", "R22i"],
      "blockedBy": [],
      "wave": 1,
      "zone": ["calc/calc.js", "js/data.js", "tests/data.test.js"],
      "status": "done",
      "startedAt": "2026-10-17T13:44:04+03:00",
      "finishedAt": "2026-10-17T13:50:46+03:00",
      "tests": "node --test → 434 passed / 0 fail (до таска 431)",
      "commit": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "02",
      "title": "Панель доверия, share и лексика",
      "requirements": ["R01", "R02", "R03", "R04", "R08", "R09", "R10", "R11", "R19i", "R20i", "R21i", "R23i"],
      "blockedBy": ["01"],
      "wave": 2,
      "zone": ["js/sections/trust.js", "js/render.js", "js/i18n.js", "js/share.js", "index.html", "css/styles.css", "tests/trust.test.js", "tests/share.test.js"],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    }
  ],
  "singlePass": null,
  "tests": "node --test → 434 passed / 0 fail (после таска 01)",
  "debt": {
    "placeholders": [
      { "where": "docs/metrics-journal.md", "what": "три baseline-цифры CF Analytics (#TBD#) — факт владельца" }
    ],
    "assumptions": [
      { "where": "R01", "what": "панель видна всегда; отсутствующие числа показываются как «н/д», а не скрываются" },
      { "where": "R05", "what": "coverageCriteria.total выводится из числа критериев движка (46), не константа «на глаз»" },
      { "where": "R06", "what": "опубликованные недели в этом прогоне не пересчитываются — поле появится на следующем штатном пересчёте" }
    ],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": null,
  "concerns": [],
  "reviewers": { "manifestSpec": "ses_eb685095affeeEr3xI1AmImfd7", "craft": "ses_eb685095affdI6bZGpmUPneqEq" },
  "blind": null
}
