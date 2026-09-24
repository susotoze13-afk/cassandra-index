window.STATE =
{
  "slug": "preprod-decisions",
  "dir": "2026-09-21-preprod-decisions--wip",
  "title": "Предпродакшен: решения по открытым вопросам (Go/No-Go, B1–B6, патч формул)",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T3",
  "briefFile": "2026-09-21-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-09-21T20:43:00+03:00",
  "updatedAt": "2026-09-24T22:15:30+03:00",
  "finishedAt": null,
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-09-21T20:43:00+03:00", "finishedAt": "2026-09-21T20:44:10+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-09-21T20:44:10+03:00", "finishedAt": "2026-09-21T21:05:00+03:00" },
    { "id": "briefing",  "status": "skipped", "note": "полный автомат — самобрифинг" },
    { "id": "spec",      "status": "done", "startedAt": "2026-09-21T21:05:00+03:00", "finishedAt": "2026-09-21T21:40:00+03:00" },
    { "id": "plan",      "status": "done", "startedAt": "2026-09-21T21:40:00+03:00", "finishedAt": "2026-09-21T22:10:00+03:00" },
    { "id": "build",     "status": "active", "startedAt": "2026-09-21T22:10:00+03:00" },
    { "id": "review",    "status": "pending" },
    { "id": "final",     "status": "pending" }
  ],
  "requirements": {
    "total": 68, "done": 30, "inTicket": 32, "inSpec": 0,
    "placeholder": 0, "deferred": 6, "dropped": 0
  },
  "tickets": [
    { "id": "01", "title": "Параметры, severity и схема входа в ядре", "requirements": ["R15","R20","R21","R22","R23","R55","R64","R65","R66","R67"], "blockedBy": [], "wave": 1, "zone": ["calc/"], "status": "done", "startedAt": "2026-09-21T21:41:30+03:00", "finishedAt": "2026-09-24T21:56:00+03:00", "commit": "75b3743", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "02", "title": "Immutable audit log с хэш-цепочкой", "requirements": ["R19","R35","R36"], "blockedBy": [], "wave": 1, "zone": ["calc/audit.js"], "status": "done", "startedAt": "2026-09-21T21:41:30+03:00", "finishedAt": "2026-09-24T21:56:00+03:00", "commit": "f91f8f1", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "03", "title": "ICU MessageFormat в i18n", "requirements": ["R62"], "blockedBy": [], "wave": 1, "zone": ["js/i18n.js","js/sections/"], "status": "done", "startedAt": "2026-09-21T21:41:30+03:00", "finishedAt": "2026-09-24T21:56:00+03:00", "commit": "c7abea4", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "04", "title": "Governance-документы и правки методологии", "requirements": ["R05","R07","R09","R17","R18","R24","R25","R29","R30","R32","R33","R39","R40","R41","R43","R44","R46","R47","R50","R52","R54","R68i"], "blockedBy": [], "wave": 1, "zone": ["docs/","METHODOLOGY.md"], "status": "done", "startedAt": "2026-09-21T21:41:30+03:00", "finishedAt": "2026-09-24T21:56:00+03:00", "commit": "d910416", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "05", "title": "Пороги покрытия и Insufficient data в пайплайне", "requirements": ["R11","R12","R13","R14","R16","R26","R28","R36","R37","R55"], "blockedBy": ["01","02"], "wave": 2, "zone": ["calc/calc.js","js/data.js","data/недели"], "status": "done", "startedAt": "2026-09-24T21:30:00+03:00", "finishedAt": "2026-09-24T22:10:00+03:00", "commit": "bf7ccea", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "06", "title": "Регионы: справочник, лестница, согласие, privacy", "requirements": ["R31","R32","R33","R38","R43","R45","R47","R48","R49","R50","R51"], "blockedBy": ["03"], "wave": 2, "zone": ["js/region.js","data/regions/","privacy.html"], "status": "done", "startedAt": "2026-09-24T21:30:00+03:00", "finishedAt": "2026-09-24T22:05:00+03:00", "commit": "d1fbd94", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "07", "title": "Калибровка на 8 якорях, журнал, пересчёт, методология 2.0", "requirements": ["R01","R02","R03","R04","R14","R15","R34","R66"], "blockedBy": ["01","02","04","05"], "wave": 3, "zone": ["calc/input/anchors/","calc/calibrate.js","docs/calibration-journal.md","METHODOLOGY.md"], "status": "in-progress", "startedAt": "2026-09-24T22:14:30+03:00", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "08", "title": "Лексика, hero, бейдж качества, модалка", "requirements": ["R05","R06","R08","R10","R12","R14","R53","R59","R60","R61"], "blockedBy": ["03","05"], "wave": 3, "zone": ["js/sections/hero.js","js/sections/states.js","index.html"], "status": "in-progress", "startedAt": "2026-09-24T22:14:30+03:00", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "09", "title": "Тренд: bottom sheet и a11y; Источники: схема и сортировка", "requirements": ["R26","R28","R55","R56","R57","R58","R63"], "blockedBy": ["03","05"], "wave": 4, "zone": ["js/sections/trend.js","js/sections/history.js","js/sections/drivers.js","data/источники"], "status": "pending", "retries": 0, "repairs": 0, "handoffs": 0 },
    { "id": "10", "title": "Баннер breaking, журнал на сайте, справка о пересчёте", "requirements": ["R01","R03","R26","R27","R28","R32","R37"], "blockedBy": ["07","08","09"], "wave": 5, "zone": ["js/sections/","data/calibration.js"], "status": "pending", "retries": 0, "repairs": 0, "handoffs": 0 }
  ],
  "singlePass": null,
  "tests": null,
  "debt": { "placeholders": [], "assumptions": [], "emptyEnv": [] },
  "additions": [],
  "coverage": {
    "gate": "G2",
    "findings": 21,
    "missing": 7,
    "halfCovered": 7,
    "notInBrief": 6,
    "resolved": "все 7 пропусков закрыты новыми историями 56–62 и правками §7/§12/Вне рамок; половинные покрытия дописаны (итеративный подбор до всех попаданий, ось страны в лестнице, конверсия U_abs≈5–6 пунктов шкалы, opt-out-ветка для будущего edge-слоя, состав Review Board, процедура R42); 6 пунктов «не из брифа» осознанно сохранены (title{ru,en} — A-решение с обоснованием, версия методологии 2.0, следствие insufficient-недель, Escape для a11y, уточнения существующего поведения)"
  },
  "concerns": [
    "01 craft · calc/engine.js:127/472 · events vs value на не-count шкалах: normalizeCriterion отдаёт приоритет events, validate режет XOR только под scale==='count' — трактовку согласовать (concerns, не блокер)",
    "01 craft · calc/engine.js:149 · идентификатор «Д7.3» захардкожен в детекторе; PARAMS.flashTriggers.criteria уже параметризован — id Д7.3 рядом с d7Value (concerns)",
    "01 craft · tests/calc-engine.test.js:793 · эвристика распределения входов по каталогам (includes('-') && /^\\d{4}/) хрупкая — перечислить каталоги явно (concerns)",
    "04 craft · docs/adr/0011:14 · ADR описывает схему источника, дублируя validate тикета 01 (title{ru,en} vs фактическая валидация) — ADR должен ссылаться на validate как источник истины (concerns)",
    "04 craft · docs/adr/0009:19 · заявлен fallback «N единиц», в js/i18n.js его нет (пустая строка при отсутствии категории) — ADR описывает только реализованное (concerns)",
    "04 craft · docs/adr/0007..0011 · нумерация продолжает серию 0001–0006 при двух параллельных сериях — следующий пул даст коллизию; обозначить серию прогона (concerns)",
    "06 craft · js/region.js:96 · LADDER_FALLBACK в третий раз дублирует числа 80/90/50; комментарий обещает тест синхрона, теста нет — добавить сравнение fallback↔reference.json или убрать дублирование (concerns)",
    "06 craft · tests/region.test.js:78 · тест справочника не связывает id регионов с REGION_IDS контракта (js/data.js) — возможна молчаливая разойденность (concerns)"
  ],
  "reviewers": { "manifestSpec": "agent-62", "craft": "agent-63" },
  "blind": null
}
