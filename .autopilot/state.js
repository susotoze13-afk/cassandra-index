window.STATE =
{
  "slug": "region-delta-market-criterion",
  "dir": "2026-10-11-region-delta-market-criterion",
  "title": "Региональная динамика: разные дельты по регионам + критерий фондового рынка",
  "mode": "semi",
  "depth": "normal",
  "polish": null,
  "tier": "T1",
  "briefFile": "2026-10-11-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-11T08:45:10+03:00",
  "updatedAt": "2026-10-11T11:20:00+03:00",
  "finishedAt": "2026-10-11T11:20:00+03:00",
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-11T08:45:10+03:00", "finishedAt": "2026-10-11T08:47:00+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-11T08:47:00+03:00", "finishedAt": "2026-10-11T08:55:00+03:00" },
    { "id": "briefing",  "status": "done", "startedAt": "2026-10-11T08:50:00+03:00", "finishedAt": "2026-10-11T08:55:00+03:00", "note": "2 развилки: регионы — честно+задел; рынок — решение к методологии 3.0" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-11T08:55:00+03:00", "finishedAt": "2026-10-11T09:10:00+03:00", "note": "G2: независимая сверка — пропущенного нет; 1 половинчатая находка (P2 vs O6) закрыта формулировкой" },
    { "id": "plan",      "status": "done", "startedAt": "2026-10-11T09:10:00+03:00", "finishedAt": "2026-10-11T09:20:00+03:00", "note": "3 таска, ярус T1, волны 1+1" },
    { "id": "build",     "status": "done", "startedAt": "2026-10-11T09:20:00+03:00", "finishedAt": "2026-10-11T10:40:00+03:00", "note": "01–03 сданы и закоммичены (5c266c6, 9ba55a9, 06a37f7); +d57f5e1 — забор работы параллельного процесса" },
    { "id": "review",    "status": "done", "finishedAt": "2026-10-11T10:40:00+03:00", "note": "все 3 таска: BLOCKING нет; ремонт 1 (таск 02, ADR↔O6), повторное ревью addressed" },
    { "id": "final",     "status": "done", "startedAt": "2026-10-11T10:45:00+03:00", "finishedAt": "2026-10-11T11:20:00+03:00", "note": "G4 слепая приёмка: оба требования реализованы, расхождений с манифестом нет" }
  ],
  "requirements": {
    "total": 6, "done": 6, "inSpec": 0, "inTicket": 0,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [
    { "id": "01", "title": "Региональная динамика в расчёте: задел и проводка", "requirements": ["R01", "R02", "R03", "R06i"], "blockedBy": [], "wave": 1, "zone": ["calc/", "js/data.js", "tests/"], "status": "done", "startedAt": "2026-10-11T09:01:40+03:00", "finishedAt": "2026-10-11T10:40:00+03:00", "retries": 0, "repairs": 0, "handoffs": 0, "tests": "node --test → 323/0", "commit": "5c266c6", "note": "коммит ждал разборки чужих изменений параллельного процесса; в diff calc.js — его строка RECALC_WEEKS (забрана коммитом d57f5e1)" },
    { "id": "02", "title": "Критерий фондового рынка: решение к методологии 3.0", "requirements": ["R04", "R05"], "blockedBy": [], "wave": 1, "zone": ["docs/"], "status": "done", "startedAt": "2026-10-11T09:01:40+03:00", "finishedAt": "2026-10-11T09:29:34+03:00", "retries": 0, "repairs": 1, "handoffs": 0, "tests": "node --test → 322/0", "commit": "9ba55a9" },
    { "id": "03", "title": "Сайт: честная подача регионального фона", "requirements": ["R02"], "blockedBy": ["01"], "wave": 2, "zone": ["js/sections/", "js/i18n.js"], "status": "done", "startedAt": "2026-10-11T09:37:01+03:00", "finishedAt": "2026-10-11T10:40:00+03:00", "retries": 0, "repairs": 0, "handoffs": 0, "tests": "node --test → 323/0", "commit": "06a37f7", "note": "зона расширена css/styles.css (минимальное правило .region-background — иначе токен --text-muted недостижим); согласовано ревью" }
  ],
  "singlePass": null,
  "tests": "323 passed / 0 failed (после всех коммитов)",
  "debt": { "placeholders": [], "assumptions": [], "emptyEnv": [] },
  "additions": [],
  "coverage": "G2: независимый читатель (бриф+спека): пропущенного нет; половинчатая находка P2/O6 закрыта в спеке; «лишнее» в спеке — углубления R02/R03/R06i с родителями",
  "concerns": ["01/craft: calc/engine.js:~530 — дубликат id в entry.regions (['europe','europe']) даёт двойной счёт в nReg; validate дубли не отклоняет — условие: дедуп или отказ validate", "01/craft: tests/regional-signals.test.js:123 — ассерт подстроки '\"background\": true' хрупок к смене сериализатора; j() стабилен в репо", "03/craft: js/sections/hero.js:395 — скрытый span-пометка создаётся в DOM и для сигнального региона (create-once); условие: ленивое создание или осознанный комментарий", "03/craft: tests/hero.test.js:22 — покрыт предикат isBackgroundRegion; DOM-проводка (скрытие Δ, подмена в строке/карточке) тестами не охвачена — конвенция «только чистые модули»; проверяется ручным прогоном/G4"],
  "reviewers": { "manifestSpec": "agent-4", "craft": "agent-5" },
  "blind": "G4 (бриф без спеки, запрещён .autopilot): РЕАЛИЗОВАНО — оба требования (честная подача дельт регионов + задел атрибуции; рыночный критерий как решение к методологии 3.0); команды проверяющего: node --test → 323/0; node calc/calc.js 2026-10-04 → index 45, 6 фоновых регионов с пометками; node build.js → ок. Расхождений с манифестом нет; живой рендер не открывал (проверка по коду/данным/тестам — честно заявлено)"
}
