window.STATE =
{
  "slug": "fix-source-metadata",
  "dir": "2026-10-05-fix-source-metadata",
  "title": "Исправление метаданных источников (классификация cluster_id/state_affiliated)",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T0",
  "briefFile": "2026-10-05-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-05T19:00:00+03:00",
  "updatedAt": "2026-10-05T22:00:00+03:00",
  "finishedAt": "2026-10-05T22:00:00+03:00",
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-05T19:00:00+03:00", "finishedAt": "2026-10-05T19:05:00+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-05T19:05:00+03:00", "finishedAt": "2026-10-05T19:10:00+03:00", "note": "уточнение у пользователя: чиним R55-метаданные входов" },
    { "id": "briefing",  "status": "skipped", "note": "полный автомат — самобрифинг; ASSUMPTIONS A1–A5 в manifest.md (канон B-state-media/true для aa.com.tr, dw.com, aljazeera.com)" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-05T19:10:00+03:00", "finishedAt": "2026-10-05T19:15:00+03:00", "note": "T0: аудит свёлся к 3 доменам с разнобоем классификации между неделями" },
    { "id": "plan",      "status": "skipped", "note": "ярус T0 — без разбивки на таски" },
    { "id": "build",     "status": "done", "startedAt": "2026-10-05T19:15:00+03:00", "finishedAt": "2026-10-05T21:55:00+03:00", "note": "T0: 8 top-level R55-записей + 10 критериальных ссылок в calc/input (08-30, 09-27, 10-04); пересчёт трёх недель --write (числа неизменны, обновлены sources.js, audit recalc-0026/0027/0028)" },
    { "id": "review",    "status": "done", "startedAt": "2026-10-05T21:55:00+03:00", "finishedAt": "2026-10-05T22:00:00+03:00", "note": "дифф data/ — только recalc-timestamp, sources.js (cluster/aff) и audit.jsonl; node --test 284/0" },
    { "id": "final",     "status": "done", "startedAt": "2026-10-05T22:00:00+03:00", "finishedAt": "2026-10-05T22:00:00+03:00", "note": "слепая приёмка G4: бриф — исправить неточности метаданных источников; исправлены все найденные (3 домена), расхождений нет; остатки осознанно не тронуты (A2–A5) и зафиксированы" }
  ],
  "requirements": { "total": 3, "done": 3, "inTicket": 0, "inSpec": 0, "placeholder": 0, "deferred": 0, "dropped": 0 },
  "tickets": [],
  "singlePass": { "files": ["calc/input/2026-08-30.json", "calc/input/2026-09-27.json", "calc/input/2026-10-04.json", "data/2026-08-30/sources.js", "data/2026-09-27/sources.js", "data/2026-10-04/sources.js", "data/*/global.js (recalc-timestamp)", "data/audit.jsonl", "AGENTS.md (конвенция)"], "tests": "node --test → 284 passed / 0 failed", "startedAt": "2026-10-05T19:15:00+03:00", "finishedAt": "2026-10-05T21:55:00+03:00" },
  "tests": "node --test → 284 passed / 0 failed",
  "debt": {
    "placeholders": [],
    "assumptions": ["A1 канон aa/dw/aljazeera = B-state-media/true по определению матрицы", "A2 демо-недели v1.0 не тронуты", "A3 reuters source_type и primary/secondary у interfax/ria — редакторские различия", "A4 даты вне окна в 09-20 — конвенция carryover", "A5 региональные сиды data/<week>/region-*.js несут старые значения — правка опубликованных сидов вне calc.js не делалась (отдельное решение редактора)"],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": "G2 непокрытых требований 0; найденные неточности — полный набор из аудита (сквозная сверка домен↔кластер↔affiliation по 6 неделям, ~300 записей)",
  "concerns": ["региональные сиды data/<week>/region-*.js унаследуют старую классификацию в будущие недели — нужен отдельный прогон правки сидов, если редактор решит"],
  "reviewers": { "manifestSpec": null, "craft": null },
  "blind": "G4 (бриф без манифеста): метаданные источников исправлены (3 домена, 3 недели входов + опубликованные sources.js), тесты 284/0, числа индекса не изменились. Расхождений нет."
}
