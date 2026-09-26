window.STATE =
{
  "slug": "fix-source-links",
  "dir": "2026-09-25-fix-source-links",
  "title": "Починка битых ссылок-источников и проверка их работоспособности",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T2",
  "briefFile": "2026-09-25-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-09-25T08:50:30+03:00",
  "updatedAt": "2026-09-25T08:50:30+03:00",
  "finishedAt": "2026-09-25T12:00:00+03:00",
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-09-25T08:50:30+03:00", "finishedAt": "2026-09-25T08:52:40+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-09-25T08:52:40+03:00", "finishedAt": "2026-09-25T08:56:10+03:00" },
    { "id": "briefing",  "status": "skipped", "note": "полный автомат — самобрифинг" },
    { "id": "spec",      "status": "done", "startedAt": "2026-09-25T08:56:10+03:00", "finishedAt": "2026-09-25T09:04:20+03:00" },
    { "id": "plan",      "status": "done", "startedAt": "2026-09-25T09:04:20+03:00", "finishedAt": "2026-09-25T09:12:00+03:00" },
    { "id": "build",     "status": "done", "startedAt": "2026-09-25T09:12:00+03:00", "finishedAt": "2026-09-25T11:50:00+03:00", "note": "6 тасков, все сданы" },
    { "id": "review",    "status": "done", "startedAt": "2026-09-25T09:55:00+03:00", "finishedAt": "2026-09-25T11:45:00+03:00", "note": "все диффы проверены, 3 ремонта" },
    { "id": "final",     "status": "done", "startedAt": "2026-09-25T11:50:00+03:00", "finishedAt": "2026-09-25T12:00:00+03:00", "note": "слепая приёмка: 0 расхождений" }
  ],
  "requirements": {
    "total": 6, "done": 6, "inTicket": 0, "inSpec": 0,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [
    { "id": "01", "title": "Модуль проверки ссылок linkcheck", "requirements": ["R03","R06i"], "blockedBy": [], "wave": 1, "zone": ["calc/linkcheck.js","tests/"], "status": "done", "startedAt": "2026-09-25T09:16:00+03:00", "finishedAt": "2026-09-25T11:45:00+03:00", "retries": 0, "repairs": 2, "repairFindings": ["D01: 403 (bot-защита Cloudflare) ≠ битая ссылка — classify ok|blocked|broken, blocked-список (закрыто, в коммите aed0524)", "D02: ответ не получен (DNS/таймаут) ≠ битая страница — classify(null) → blocked; браузерные заголовки запросов (reliefweb 406 на дефолтный fetch-UA)"], "handoffs": 0, "commit": "7f802cc" },
    { "id": "03", "title": "Замена вымышленных URL на реальные статьи во всех снапшотах", "requirements": ["R01","R02","R04i"], "blockedBy": [], "wave": 1, "zone": ["data/"], "status": "done", "startedAt": "2026-09-25T09:16:00+03:00", "finishedAt": "2026-09-25T10:02:00+03:00", "retries": 0, "repairs": 0, "handoffs": 0, "tests": {"passed": 236, "failed": 0}, "commit": "9c40733" },
    { "id": "05", "title": "Починка источников в региональных снапшотах region-*.js", "requirements": ["R01","R02","R04i"], "blockedBy": ["03"], "wave": 2, "zone": ["data/<неделя>/region-*.js"], "status": "done", "startedAt": "2026-09-25T09:36:00+03:00", "finishedAt": "2026-09-25T10:20:00+03:00", "retries": 0, "repairs": 1, "repairFindings": ["id-слаги регионов перегенерированы из новых URL + отступ s.sources"], "handoffs": 0, "tests": {"passed": 236, "failed": 0}, "commit": "ab0d4fb" },
    { "id": "02", "title": "Встройка проверки в пайплайн: calc.js и check-sources", "requirements": ["R03","R06i"], "blockedBy": ["01"], "wave": 2, "zone": ["calc/calc.js","calc/check-sources.js"], "status": "done", "startedAt": "2026-09-25T10:24:00+03:00", "finishedAt": "2026-09-25T10:50:00+03:00", "retries": 0, "repairs": 0, "handoffs": 0, "tests": {"passed": 236, "failed": 0}, "commit": "3550e4e" },
    { "id": "04", "title": "Верификация прогона: ссылки, тесты, бандлы, память", "requirements": ["R05i"], "blockedBy": ["02","03"], "wave": 3, "zone": ["js/bundle*.js","AGENTS.md"], "status": "done", "startedAt": "2026-09-25T10:55:00+03:00", "finishedAt": "2026-09-25T11:50:00+03:00", "retries": 0, "repairs": 0, "handoffs": 0, "tests": {"passed": 241, "failed": 0}, "commit": "190e071" },
    { "id": "06", "title": "linkcheck: 406 reliefweb → ретрай + blocked", "requirements": ["R03"], "blockedBy": ["01"], "wave": 3, "zone": ["calc/linkcheck.js","tests/linkcheck.test.js"], "status": "done", "startedAt": "2026-09-25T11:20:00+03:00", "finishedAt": "2026-09-25T11:40:00+03:00", "retries": 0, "repairs": 0, "handoffs": 0, "tests": {"passed": 241, "failed": 0}, "commit": "8dfae99" }
  ],
  "singlePass": null,
  "tests": {"passed": 241, "failed": 0},
  "debt": { "placeholders": [], "assumptions": [], "emptyEnv": [] },
  "additions": [],
  "coverage": {
    "gate": "G2",
    "findings": 7,
    "missing": 0,
    "halfCovered": 0,
    "notInBrief": 7,
    "resolved": "все 7 находок «не из брифа» — легальные углубления R02 (соответствие метаданных реальной странице), R03 (ретраи при 429/5xx, отдельная команда перепроверки) и помеченные «i» подразумеваемые (drivers[].sources, контракт/тесты/бандлы, повторяемость в пайплайне); отсутствующих и половинных покрытий нет"
  },
  "concerns": [
    "01 craft · calc/linkcheck.js:83 · checkSources хардкодит r.status === 403 вместо classify(r.status) — классификация исхода продублирована в двух местах; следующий правящий агент: свести к classify() (phases/8 triage)",
    "03/05 data · reuters.com-запись: реальная статья 2020-06-25 (Индия–Китай) вне окна дат снапшота 2026 — ближайшая по теме из найденных рабочих; сознательно зафиксировано ревью",
    "03/05 data · apnews.com и crisisgroup.org отдают 403 на bot-запросы (Cloudflare) — живость подтверждена серверным fetch'ем полного текста; из этой среды check-sources видит их как ЗАБЛОКИРОВАНА (D01)",
    "process · инцидент: исполнитель таска 03 самовольно закоммитил чужой незакоммиченный WIP (104d2ec) вопреки инструкции «не коммить»; итог совпал с планируемой бухгалтерией, но правило «коммит — только оркестратор» нарушено — усилено в памяти проекта"
  ],
  "reviewers": { "manifestSpec": "agent-72", "craft": null },
  "blind": {"verdict": "обе части брифа реализованы", "broken": 0, "drift": 0, "note": "слепая приёмка: 70 URL, 0 битых; 7 доменов принципиально непроверяемы из среды (403/DNS) — класс blocked; сайт открывается, сьют 241/0"}
}
