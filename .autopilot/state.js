window.STATE =
{
  "slug": "habr-update-3",
  "dir": "2026-10-11-habr-update-3",
  "title": "Обновление статьи на Habr под методологию 3.0",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T0",
  "briefFile": "2026-10-11-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-11T21:55:22+03:00",
  "updatedAt": "2026-10-11T22:04:35+03:00",
  "finishedAt": "2026-10-11T22:04:35+03:00",
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-11T21:55:22+03:00", "finishedAt": "2026-10-11T21:56:33+03:00", "note": "третий случай: репо настроено; прошлый прогон заархивирован, дашборд на http://localhost:54800/dashboard.html" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-11T21:56:33+03:00", "finishedAt": "2026-10-11T21:57:16+03:00", "note": "R01–R09; R09 (публикация) — deferred: внешнее действие" },
    { "id": "briefing",  "status": "skipped", "startedAt": "2026-10-11T21:57:16+03:00", "finishedAt": "2026-10-11T21:57:16+03:00", "note": "полный автомат — самобрифинг, вопросов нет; 6 решений за пользователя" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-11T21:57:16+03:00", "finishedAt": "2026-10-11T21:58:30+03:00", "note": "G2: независимый чек — MISSING 0, HALF-COVERED 1 (метод отбора → правка 10); open нет" },
    { "id": "plan",      "status": "skipped", "startedAt": "2026-10-11T21:58:30+03:00", "finishedAt": "2026-10-11T21:58:30+03:00", "note": "ярус T0 — без разбивки на таски, один проход" },
    { "id": "build",     "status": "done", "startedAt": "2026-10-11T21:58:30+03:00", "finishedAt": "2026-10-11T22:02:05+03:00", "note": "T0: статья под 3.0 (46 критериев, index 56, чувствительность 5,4), производные и пакет обновлены, 5 скриншотов перерисованы; 359/0" },
    { "id": "review",    "status": "done", "startedAt": "2026-10-11T22:02:05+03:00", "finishedAt": "2026-10-11T22:02:05+03:00", "note": "три оси inline (T0): манифест/спека чисто; craft — 2 concerns, BLOCKING нет" },
    { "id": "final",     "status": "done", "startedAt": "2026-10-11T22:02:05+03:00", "finishedAt": "2026-10-11T22:04:35+03:00", "note": "G4: обновление реализовано; 3 находки исправлены, 1 унаследованная — в отчёт; 359/0" }
  ],
  "requirements": {
    "total": 9, "done": 8, "inTicket": 0, "inSpec": 0,
    "placeholder": 0, "deferred": 1, "dropped": 0
  },
  "tickets": [],
  "singlePass": { "startedAt": "2026-10-11T21:58:30+03:00", "finishedAt": "2026-10-11T22:02:05+03:00", "files": ["docs/articles/habr-idea-d.md", "docs/articles/habr-post-final.md", "docs/articles/habr-post-final.plain.txt", "docs/articles/habr-publish-package.md", "docs/articles/img/01-hero.png", "docs/articles/img/02-trend.png", "docs/articles/img/03-drivers.png", "docs/articles/img/04-criteria.png", "docs/articles/img/05-criteria-d1.png"], "tests": "node --test → 359 passed / 0 failed", "commit": "9926867" },
  "tests": "359 passed / 0 failed (node --test, прогон 2026-10-11)",
  "debt": { "placeholders": [], "assumptions": ["ASSUMPTION-1 заголовок «46 критериев»", "ASSUMPTION-2 хабы/теги не меняли", "ASSUMPTION-3 скриншоты перерисованы CDP/headless-Chrome", "ASSUMPTION-4 чувствительность 10-04 = 5,4", "ASSUMPTION-5 версия 3.0 в тексте", "ASSUMPTION-6 D4.6 = стресс рынков"], "emptyEnv": [] },
  "additions": [],
  "coverage": "G2 независимый чек (бриф+спека, без манифеста): MISSING 0; HALF-COVERED 1 — «метод отбора источников» покрыт точечно → добавлена явная правка 10 тела (ворота независимости, чувствительность с числами, ядро, red team, региональные R55); EXTRA — R05i–R08i (пакет, скриншоты, рабочие заметки, антибан) = имплицитные требования «обновить статью», привязаны к R01.",
  "concerns": [
    "docs/articles/img/03-drivers.png и 05-criteria-d1.png визуально не сверены построчно (сняты с живого сайта 3.0, файлы непустые); при желании перепроверить перед публикацией",
    "статья-источник habr-idea-d.md сохраняет внутренние doc-ссылки как код-спаны — это by design, публичная версия habr-post-final.md переписывает их на URL GitHub",
    "унаследованное (не из этого прогона): подпись образца черновика 06 ссылается на схему v2/events[] с «данными недели 21-27 сентября», тогда как calc/input/drafts/2026-09-27.llm-draft.json — схема v1 без events[] (events[] есть у 2026-09-20) — требует решения пользователя о происхождении образца",
    "docs/llm-pilot-journal.md:90 для недели 09-20 указывает delta +15, тогда как data/2026-09-20/global.js — +13 (вспомогательный документ, не статья)"
  ],
  "reviewers": { "manifestSpec": null, "craft": null },
  "blind": "G4 (бриф + репозиторий вне .autopilot): обновление реализовано — статья/производные/пакет отражают 3.0 (46 критериев, D4.6, index 56/+10 и 46/−1, чувствительность 5,4/0, цепочка 51/42/43/56/47/46/56, 38 тест-файлов/359, 6 скриншотов); node --test 359/0. Найдено 4 расхождения: (1) факт-чек «6 select + 4 verify» → исправлено на 7+3; (2) пакет «8 разделов H2» → исправлено на 10; (3) habr-idea-d.plain.txt «16 091 знак» → файл регенерирован, число 15 978; (4) унаследованное: подпись образца черновика 06 (v2/events[] «недели 21-27 сентября») не совпадает с 2026-09-27.llm-draft.json (v1, без events[]) — в открытые вопросы, вне запрошенного объёма."
}
