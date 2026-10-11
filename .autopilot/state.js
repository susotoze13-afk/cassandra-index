window.STATE =
{
  "slug": "security-patches",
  "dir": "2026-10-11-security-patches",
  "title": "Патчи информационной безопасности: проверка и push",
  "mode": "semi",
  "depth": "normal",
  "polish": null,
  "tier": "T0",
  "briefFile": "2026-10-11-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-11T11:46:30+03:00",
  "updatedAt": "2026-10-11T12:12:00+03:00",
  "finishedAt": "2026-10-11T12:12:00+03:00",
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-11T11:46:30+03:00", "finishedAt": "2026-10-11T11:48:25+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-11T11:48:25+03:00", "finishedAt": "2026-10-11T11:49:36+03:00" },
    { "id": "briefing",  "status": "done", "startedAt": "2026-10-11T11:49:36+03:00", "finishedAt": "2026-10-11T11:49:36+03:00", "note": "вопросов нет: бриф однозначен — патчи уже подготовлены в рабочем дереве, push явно запрошен" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-11T11:49:36+03:00", "finishedAt": "2026-10-11T11:52:38+03:00", "note": "G2: пропущенного нет; «сверх брифа» — конкретизация R01 и R03i с родителем, находок к исправлению нет" },
    { "id": "plan",      "status": "skipped", "startedAt": "2026-10-11T11:52:38+03:00", "finishedAt": "2026-10-11T11:52:38+03:00", "note": "ярус T0 — код не пишется, только проверка патчей и git; тасков нет" },
    { "id": "build",     "status": "done", "startedAt": "2026-10-11T11:52:38+03:00", "finishedAt": "2026-10-11T12:05:00+03:00", "note": "T0: патчи проверены (323/0, SHA сверены через API, CSP разобрана по страницам, dependabot валиден), закоммичены 708afc6/7cfa725/8cc2a04 и запушены" },
    { "id": "review",    "status": "done", "startedAt": "2026-10-11T12:00:00+03:00", "finishedAt": "2026-10-11T12:05:00+03:00", "note": "T0: все три оси инлайн — Manifest (R01/R02/R03i доставлены), Spec (5 изменений соответствуют), Craft (патчи не добавляют поверхность, кроме опциональных игноров) — BLOCKING нет" },
    { "id": "final",     "status": "done", "startedAt": "2026-10-11T12:05:00+03:00", "finishedAt": "2026-10-11T12:12:00+03:00", "note": "R03i: workflow deploy success (run 38126831997), живой cassindex.ru 200 с CSP+referrer, data/audit.jsonl → 404; G4 слепая приёмка — без расхождений" }
  ],
  "requirements": {
    "total": 3, "done": 3, "inTicket": 0, "inSpec": 0,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [],
  "singlePass": { "files": [".gitignore", "index.html", "privacy.html", ".github/dependabot.yml"], "tests": "node --test → 323 passed / 0 failed", "commit": "708afc6, 7cfa725, 8cc2a04", "startedAt": "2026-10-11T11:52:38+03:00", "finishedAt": "2026-10-11T12:05:00+03:00" },
  "tests": "323 passed / 0 failed (node --test, до и после патчей)",
  "debt": { "placeholders": [], "assumptions": [], "emptyEnv": [] },
  "additions": [],
  "coverage": "G2: пропущенного нет, половинчатых нет; «сверх брифа» — конкретизация проверки R01 (5 именованных изменений с критериями) и R03i с родителем, процессные решения по коммитам — находок к исправлению нет",
  "concerns": ["F-01 остаточно: в индексе остаются 9 производных черновиков calc/input/drafts (llm-draft/pilot/*.tsv/*.sh) — отчёт §9 помечает их опциональными, сырые скрейп-дампы texts-* (68) из git убраны", "F-02/F-06 (SHA-пиннинг + rm audit.jsonl) закоммичены параллельной сессией (708afc6) до моих правок — проверены по факту HEAD, мои файлы изменений уже не содержали"],
  "reviewers": { "manifestSpec": null, "craft": null },
  "blind": "G4 (бриф + репозиторий/живой сайт без .autopilot): 4/4 подтверждено, расхождений нет"
}
