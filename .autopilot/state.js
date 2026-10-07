window.STATE =
{
  "slug": "source-selection-hardening",
  "dir": "2026-10-05-source-selection-hardening--wip",
  "title": "Укрепление выбора источников: ворота независимости, чувствительность, ядро, red team",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T2",
  "briefFile": "2026-10-05-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-05T22:32:00+03:00",
  "updatedAt": "2026-10-07T21:14:00+03:00",
  "finishedAt": null,
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-05T22:29:01+03:00", "finishedAt": "2026-10-05T22:30:00+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-05T22:30:00+03:00", "finishedAt": "2026-10-05T22:35:00+03:00", "note": "grilling-сессия: протокол Q1–Q24, R01–R06" },
    { "id": "briefing",  "status": "done", "startedAt": "2026-10-05T22:35:00+03:00", "finishedAt": "2026-10-05T23:30:00+03:00", "note": "adversarial pass в сессии grilling (4 раунда)" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-05T23:30:00+03:00", "finishedAt": "2026-10-05T23:55:00+03:00", "note": "спецификация = протокол Q1–Q24 + manifest + ADR 0019/0020" },
    { "id": "plan",      "status": "done", "startedAt": "2026-10-05T23:55:00+03:00", "finishedAt": "2026-10-06T00:06:00+03:00", "note": "7 тасков, 3 волны; interfaces.md засеян" },
    { "id": "build",     "status": "active", "startedAt": "2026-10-06T12:00:00+03:00", "note": "01–06 сданы и закоммичены (83fffbc, 4a9e16b+39a3fcf, 4e1de90, 15f2a63, 78d055a, a683c31); ревью 05/06: findings, BLOCKING нет; в полёте 07" },
    { "id": "review",    "status": "done", "finishedAt": "2026-10-07T23:00:00+03:00", "note": "ревью всех тасок: 04 PASS_WITH_CONCERNS (notes), остальные clean/PASS; находки — concerns" },
    { "id": "final",     "status": "done", "startedAt": "2026-10-07T23:00:00+03:00", "finishedAt": "2026-10-07T23:40:00+03:00" }
  ],
  "requirements": { "total": 6, "done": 6, "inTicket": 0, "inSpec": 0, "placeholder": 0, "deferred": 0, "dropped": 0 },
  "tickets": [
    { "id": "01", "slug": "independence-gates", "status": "done", "wave": 1, "startedAt": "2026-10-06T12:00:00+03:00", "finishedAt": "2026-10-07T20:31:00+03:00", "handoffs": 0, "repairs": 0, "tests": "node --test → 292/0 (было 284)", "commit": "83fffbc" },
    { "id": "02", "slug": "sensitivity-metric", "status": "done", "wave": 1, "startedAt": "2026-10-07T20:31:35+03:00", "finishedAt": "2026-10-07T22:00:00+03:00", "handoffs": 0, "repairs": 0, "tests": "node --test → 300/0; ревью PASS (6/6)", "commit": "4a9e16b", "note": "работали 2 исполнителя параллельно, версия на диске слита — ревью оценено как единый дифф" },
    { "id": "03", "slug": "core-sources", "status": "done", "wave": 2, "startedAt": "2026-10-07T21:40:00+03:00", "finishedAt": "2026-10-07T22:45:00+03:00", "handoffs": 0, "repairs": 1, "tests": "305/0; ревью clean 5/5; дозапрос: PARAMS.sensitivityThreshold", "commit": "4e1de90" },
    { "id": "04", "slug": "redteam-checklist", "status": "done", "wave": 2, "startedAt": "2026-10-07T20:31:35+03:00", "finishedAt": "2026-10-07T21:10:00+03:00", "handoffs": 0, "repairs": 0, "tests": "tests/audit.test.js → 9/0; полный suite 294/0 по словам исполнителя (проверено точечно)", "commit": "15f2a63" },
    { "id": "05", "slug": "docs-governance-provenance", "status": "done", "wave": 2, "blockedBy": [], "startedAt": "2026-10-07T20:45:00+03:00", "finishedAt": "2026-10-07T21:12:00+03:00", "handoffs": 0, "repairs": 0, "commit": "78d055a", "tests": "node --test → 305/0", "note": "сдан второй линией; ревью Manifest+Spec и Craft: findings, BLOCKING нет" },
    { "id": "06", "slug": "site-methodology-bullets", "status": "done", "wave": 3, "blockedBy": [], "startedAt": "2026-10-07T20:45:00+03:00", "finishedAt": "2026-10-07T21:12:00+03:00", "handoffs": 0, "repairs": 0, "commit": "a683c31", "tests": "node --test → 305/0; бандлы пересобраны", "note": "сдан второй линией; ревью Manifest+Spec и Craft: findings, BLOCKING нет" },
    { "id": "07", "slug": "final-acceptance", "status": "in-progress", "wave": 3, "blockedBy": [], "startedAt": "2026-10-07T21:14:00+03:00", "handoffs": 0, "repairs": 0 }
  ],
  "singlePass": null,
  "tests": "node --test → 305 passed / 0 failed",
  "debt": { "placeholders": [], "assumptions": ["A1–A5 из manifest (--wip/manifest.md)"], "emptyEnv": [] },
  "additions": [],
  "coverage": "G2/G3 на материалах grilling: 0 непокрытых требований, 0 тасков без требований",
  "concerns": ["02/условие ревью: SENSITIVITY_THRESHOLD перенести из calc/sensitivity.js в PARAMS (конвенция «все числа в params.js») — дозапрос к таску 03", "02/note: пин 11.8 в тесте посчитан без инерции — пометить комментарием «без инерции», чтобы не читался как прод-значение", "02/note: правило «покрытый без источников → null» дублируется в sensitivity.js — при смене трактовки в движке менять оба места", "04/note: формулировка в.1 governance («Нет ли домена…») инвертирована против константы REDTEAM_QUESTIONS («Есть ли домен…») — семантика та же, привести к пословному совпадению", "04/note: бенчмарк 50% доминирования не воспроизводится машиночитаемой константой", "04/note: тест пинит вопросы по regex/счётчику — расхождение формы не ловит", "05/spec: красная команда оказалась в governance §3.2, а таск 05 и interfaces.md ссылаются на §3.1 — привести нумерацию к фактической либо поправить ссылки", "05/spec: пункт приёмки «визуальная проверка на тестовом снапшоте» недоказуем из диффа (нет снапшота с sensitivity) — закрыть на таске 07", "05/craft: docs/provenance-matrix.md:26 — маркер сноски `**` вне строки таблицы, сноска не привязана к F-строке", "06/spec: пункт приёмки «рендер через textContent» не закрыт буквально — блок идёт через HTML-шаблон секции, как соседние статичные блоки; уточнить приёмку или перевести рендер", "06/manifest: method.sources.1 подаёт правило ворот как действующее без даты 2026-10-11 — сверить с решением Q19 (подача без даты)", "06/craft: js/sections/methodology.js:118 — новые строки попадают в host.innerHTML (в AGENTS.md — createElement+textContent; в том же файле criteriaBlock так и собирает)", "06/craft: js/i18n.js:247 — «исключаем каждый источник» против фактической механики «домен и кластер» (calc/sensitivity.js)"],
  "reviewers": { "manifestSpec": "ses_ee87695eaffezopyT34viYxz8E", "craft": "ses_ee87695eaffdI3RsrwyNZHgSe0" },
  "blind": "G4 (бриф без спеки, запрещён .autopilot): РЕАЛИЗОВАНО — 6/6 пунктов с доказательствами; расхождений нет; оговорки (forward-only, warning-ядро, короборация ≠ верификация фактов) — зафиксированные решения протокола"
}
