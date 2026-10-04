window.STATE =
{
  "slug": "index-2026-10-04",
  "dir": "2026-10-04-index-2026-10-04--wip",
  "title": "Расчёт индекса Кассандры за 28.09–04.10.2026",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T2",
  "briefFile": "2026-10-04-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-04T09:09:40+03:00",
  "updatedAt": "2026-10-04T09:26:00+03:00",
  "finishedAt": null,
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-04T09:09:40+03:00", "finishedAt": "2026-10-04T09:12:00+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-04T09:12:00+03:00", "finishedAt": "2026-10-04T09:14:00+03:00" },
    { "id": "briefing",  "status": "skipped", "note": "полный автомат — самобрифинг; ASSUMPTIONS: неделя = 2026-10-04 (окно 28.09–04.10), только реально существующие открытые источники (фабрикация запрещена, ворота linkcheck), критерий без проверяемого сигнала → null, редакционные drivers/region-сиды пишутся по итогам исследования, пуш в master — outward-действие, спрашивается отдельно" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-04T09:20:00+03:00", "finishedAt": "2026-10-04T09:26:00+03:00" },
    { "id": "plan",      "status": "done", "startedAt": "2026-10-04T09:26:00+03:00", "finishedAt": "2026-10-04T09:31:00+03:00", "note": "4 таска, ярус T2 (исследование D1–D9 → интеграция)" },
    { "id": "build",     "status": "active", "startedAt": "2026-10-04T09:33:00+03:00" },
    { "id": "review",    "status": "pending" },
    { "id": "final",     "status": "pending" }
  ],
  "requirements": {
    "total": 6, "done": 0, "inTicket": 6, "inSpec": 0,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [
    { "id": "01", "wave": 1, "zone": "research/D1-D5-D6",        "status": "done", "finishedAt": "2026-10-04T10:05:00+03:00", "commit": "9159388", "tests": "research JSON валиден; 14 критериев; 13 URL открылись", "retries": 0, "repairs": [], "handoffs": [], "blockedBy": [] },
    { "id": "02", "wave": 1, "zone": "research/D2-D3-D4",        "status": "done", "finishedAt": "2026-10-04T10:05:00+03:00", "commit": "a005316", "tests": "research JSON валиден; 15 критериев; 20 записей", "retries": 0, "repairs": [], "handoffs": [], "blockedBy": [] },
    { "id": "03", "wave": 1, "zone": "research/D7-D8-D9",        "status": "done", "finishedAt": "2026-10-04T10:05:00+03:00", "commit": "dd3b963", "tests": "research JSON валиден; 16 критериев; 15 записей", "retries": 0, "repairs": [], "handoffs": [], "blockedBy": [] },
    { "id": "04", "wave": 2, "zone": "integration/input-seeds-build", "status": "in-progress", "startedAt": "2026-10-04T10:12:00+03:00", "retries": 0, "repairs": [], "handoffs": [], "blockedBy": ["01", "02", "03"] }
  ],
  "singlePass": null,
  "tests": null,
  "debt": { "placeholders": [], "assumptions": [], "emptyEnv": [] },
  "additions": [],
  "coverage": "G2 независимый (бриф + спека, без манифеста): «нет в спецификации» — только режим запуска full (процесс, не продукт — зафиксирован в state.js, не требование продукта); «покрыто наполовину» — 0; «лишнее» — 8 пунктов, все трассируются к R##i-строкам манифеста (подразумеванные требования) — прикреплено, не свободные добавления; actionable findings 0",
  "concerns": [
    "ревью волны 1 (Manifest): research/01.json, регион north-america — slug URL (france-schools-protests-ukraine-kallas-rome-pope) не совпадает с заголовком про G7/100m barrels; ссылку в наблюдении заменить или убрать (не блокирует, но таск 04 должен не тащить её в сайт)",
    "ревью волны 1 (Manifest): research/02.json D2.1 — в note упомянуто событие 01.10 без датированного source; не блокирует, note поправить при сборке",
    "волна 1: у части критериев оба источника одного кластера A — межкластерная независимость не подтверждена (в пределах лимита ≤2, engine предупредит independenceWarnings)"
  ],
  "reviewers": { "manifestSpec": "obs-led", "craft": null },
  "blind": null
}
