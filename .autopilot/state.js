window.STATE =
{
  "slug": "weeklists-consolidation",
  "dir": "2026-10-18-weeklists-consolidation",
  "title": "Консолидация списков недель и добивка ревью-замечаний",
  "mode": "semi",
  "depth": "normal",
  "polish": null,
  "tier": "T0",
  "briefFile": "2026-10-18-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-18T11:23:00+03:00",
  "updatedAt": "2026-10-18T12:45:00+03:00",
  "finishedAt": "2026-10-18T12:45:00+03:00",
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-18T11:23:00+03:00", "finishedAt": "2026-10-18T11:24:30+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-18T11:24:30+03:00", "finishedAt": "2026-10-18T11:27:00+03:00" },
    { "id": "briefing",  "status": "skipped", "startedAt": "2026-10-18T11:27:00+03:00", "finishedAt": "2026-10-18T11:27:00+03:00", "note": "вопросов не потребовалось — бриф точный, направление названо" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-18T11:27:00+03:00", "finishedAt": "2026-10-18T11:35:00+03:00", "note": "G2: независимая проверка — 0 missing, 0 half; 5 extra (диск-сверка, порядок/дубли, производные проверки, запрет литералов, строка вне рамок про weekly-calc.yml) — все разрешены как R##.n-углубления R01/R02 или фиксация отложенного, A## не понадобились" },
    { "id": "plan",      "status": "skipped", "startedAt": "2026-10-18T11:35:00+03:00", "finishedAt": "2026-10-18T11:35:00+03:00", "note": "ярус T0 — одна зона (calc/prepare-week.js + 4 тестовых файла), одна поверхность, без внешних сервисов; собираю сразу из spec, без разбивки на таски" },
    { "id": "build",     "status": "done", "startedAt": "2026-10-18T11:36:00+03:00", "finishedAt": "2026-10-18T12:20:00+03:00", "note": "T0 single-pass: read-швы readRecalcWeeks/readLatestWeeks в calc/prepare-week.js; тест согласия tests/weeklists-agreement.test.js (новый); latest-loader/page-smoke/week-combined-parity переведены на производные проверки без литеральных пинов числа недель" },
    { "id": "review",    "status": "done", "startedAt": "2026-10-18T12:20:00+03:00", "finishedAt": "2026-10-18T12:35:00+03:00", "note": "субагент craft-review (ses_eb1b6f097ffeCsKS10ssQIAc55): 0 CRITICAL, 1 MAJOR (guard write-формы в latest-loader слеп к v2-регионам — заменён на shape-гвардию), 2 MINOR (regex readRecalcWeeks расходился с write-стороной — выровнен по кавычкам; round-trip тесты швов добавлены в prepare-week.test.js), 1 NIT убран (неиспользуемый CI_LATEST). Все замечания закрыты до коммита" },
    { "id": "final",     "status": "done", "startedAt": "2026-10-18T12:35:00+03:00", "finishedAt": "2026-10-18T12:45:00+03:00", "note": "интерфейсы top-up (интерфейсы фактически добавленного API), review замечания закрыты, директория без --wip, 456/0" }
  ],
  "requirements": {
    "total": 5, "done": 5, "inTicket": 0, "inSpec": 5,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [],
  "singlePass": {
    "files": [
      "calc/prepare-week.js",
      "tests/weeklists-agreement.test.js",
      "tests/latest-loader.test.js",
      "tests/page-smoke.test.js",
      "tests/week-combined-parity.test.js",
      "tests/prepare-week.test.js"
    ],
    "tests": { "total": 456, "passed": 456, "failed": 0 }
  },
  "tests": null,
  "debt": { "placeholders": [], "assumptions": [], "emptyEnv": [] },
  "additions": [],
  "coverage": { "findings": 5, "missing": 0, "half": 0, "extra": 5, "note": "независимая проверка брифа↔спеки: пропусков и половинок нет; 5 extra — все разрешены как углубления R01/R02 (диск-сверка CI_WEEKS↔каталоги data/, порядок и дубли списков, производные проверки в latest-loader, запрет новых литералов) или как фиксация отложенного (weekly-calc.yml в «Вне рамок»); свободных A## нет" },
  "concerns": [],
  "reviewers": { "manifestSpec": null, "craft": "subagent ✓ — 0 CRITICAL; MAJ/MIN замечания закрыты до коммита (craft-review, ses_eb1b6f097ffeCsKS10ssQIAc55)" },
  "blind": null
}
