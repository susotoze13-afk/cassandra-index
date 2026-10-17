window.STATE =
{
  "slug": "trust-panel-levels",
  "dir": "2026-10-17-trust-panel-levels",
  "title": "Витрина доверия и ступени уровней (ADR 0033)",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T1",
  "briefFile": "2026-10-17-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-17T13:33:30+03:00",
  "updatedAt": "2026-10-17T14:22:15+03:00",
  "finishedAt": "2026-10-17T14:22:15+03:00",
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-17T13:33:30+03:00", "finishedAt": "2026-10-17T13:34:45+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-17T13:34:45+03:00", "finishedAt": "2026-10-17T13:35:41+03:00" },
    { "id": "briefing",  "status": "skipped", "startedAt": "2026-10-17T13:35:41+03:00", "finishedAt": "2026-10-17T13:35:41+03:00", "note": "полный автомат — самобрифинг; решения за пользователя помечены ASSUMPTION в manifest.md, вопросов не задавалось; адверсариальный проход не запускался (глубина обычная)" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-17T13:35:41+03:00", "finishedAt": "2026-10-17T13:41:13+03:00", "note": "спецификация + независимая проверка покрытия (отдельный агент по брифу и spec, без манифеста): расхождений по существу нет, отмеченные пункты — мета-конфигурация запуска, зафиксировано в spec §Примечания" },
    { "id": "plan",      "status": "done", "startedAt": "2026-10-17T13:41:13+03:00", "finishedAt": "2026-10-17T13:43:06+03:00", "note": "ярус T1 — 2 таска; волны 1 и 2 последовательно (js/data.js и js/sections/* делят пересобираемый js/bundle.js — параллель невозможна); interfaces.md засеян до первого таска" },
    { "id": "build",     "status": "done", "startedAt": "2026-10-17T13:43:06+03:00", "finishedAt": "2026-10-17T14:03:52+03:00", "note": "3 из 3 тасков готовы (T01, T02, T03 — T03 из трияжа отложенных замечаний)" },
    { "id": "review",    "status": "done", "startedAt": "2026-10-17T13:46:00+03:00", "finishedAt": "2026-10-17T14:14:06+03:00", "note": "каждый таск — независимый ревьюер по осям Manifest/Spec и Craft; блокирующих находок нет" },
    { "id": "final",     "status": "done", "startedAt": "2026-10-17T14:14:06+03:00", "finishedAt": "2026-10-17T14:22:15+03:00", "note": "слепая приёмка G4 — расхождений нет; память AGENTS.md обновлена; каталог переименован без --wip" }
  ],
  "requirements": {
    "total": 23, "done": 16, "inTicket": 0, "inSpec": 0,
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
      "commit": "7f98293",
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
      "status": "done",
      "startedAt": "2026-10-17T13:52:10+03:00",
      "finishedAt": "2026-10-17T14:03:52+03:00",
      "tests": "node --test → 443 passed / 0 fail (до таска 434)",
      "commit": "37ff4e0",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "03",
      "title": "Чистка секции trust: кодировка комментария и тесты строки фактов",
      "requirements": ["R02", "R08"],
      "blockedBy": ["02"],
      "wave": 3,
      "zone": ["js/sections/trust.js", "css/styles.css", "tests/trust.test.js"],
      "status": "done",
      "startedAt": "2026-10-17T14:06:56+03:00",
      "finishedAt": "2026-10-17T14:14:06+03:00",
      "tests": "node --test → 446 passed / 0 fail (до таска 443)",
      "commit": "53fdaa3",
      "retries": 0,
      "repairs": 1,
      "repairFindings": ["комментарий trust-секции ссылался на несуществующее правило родителя и писал «=44px» вместо «≥44px»"],
      "files": ["js/sections/trust.js", "css/styles.css", "tests/trust.test.js", "js/bundle.js"],
      "handoffs": 0
    }
  ],
  "singlePass": null,
  "tests": "node --test → 446 passed / 0 fail (после таска 03; 45 файлов)",
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
  "coverage": { "found": 3, "fixed": 3, "deferred": 0 },
  "concerns": [
    { "axis": "craft", "where": "css/styles.css:2000", "what": "комментарий новой trust-секции записан битой кодировкой (кириллица → «?»)", "status": "fixed", "ticket": "03" },
    { "axis": "craft", "where": "tests/trust.test.js:39", "what": "набор стоял только на trustFacts; порядок пяти фактов, «н/д» методологии и гейт sensitivity≥порога не проверялись", "status": "fixed", "ticket": "03" },
    { "axis": "craft", "where": "js/sections/trust.js:70", "what": "validCoverage заново реализует правило формы coverageCriteria (js/data.js:244)", "status": "report", "why": "сайт по архитектуре не читает calc/; правило продублировано осознанно — объединение через модули отдельный рефактор" },
    { "axis": "craft", "where": "js/sections/trust.js:18", "what": "TRUST_SENSITIVITY_THRESHOLD=5 дублирует приватный SENSITIVITY_DISPLAY_THRESHOLD=5 (js/sections/states.js:62)", "status": "report", "why": "сайт не читает calc/params.js; объединение констант между секциями — отдельный рефактор" },
    { "axis": "craft", "where": "js/sections/trust.js", "what": "модуль написан до первого прогона тестов (не строгий red-first)", "status": "dropped", "why": "процессная заметка исполнителя, кода не касается" }
  ],
  "reviewers": { "manifestSpec": "ses_eb685095affeeEr3xI1AmImfd7", "craft": "ses_eb685095affdI6bZGpmUPneqEq" },
  "blind": {
    "run": true,
    "drift": [],
    "note": "независимый проверяющий (бриф + репозиторий, без spec/манифеста/тасков): фаза 1 ADR 0033 подтверждена как реализованная; O7/O8/O9 и секция ступеней (фаза 2) ожидаемо не реализованы (deferred/placeholder); три _TBD_ metrics-journal на месте как метки владельца. Живой прогон в браузере недоступен в среде — работоспособность подтверждена зелёными тестами 446/0 и соответствием закоммиченного бандла исходникам"
  }
}
