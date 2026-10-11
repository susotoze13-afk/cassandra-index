window.STATE =
{
  "slug": "habr-publish",
  "dir": "2026-10-11-habr-publish--wip",
  "title": "Публикация статьи на Habr",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T0",
  "briefFile": "2026-10-11-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-11T14:41:01+03:00",
  "updatedAt": "2026-10-11T14:44:49+03:00",
  "finishedAt": null,
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-11T14:41:01+03:00", "finishedAt": "2026-10-11T14:41:34+03:00", "note": "третий случай: репо настроено; предыдущий прогон заархивирован, дашборд поднят на http://localhost:54278/dashboard.html, память (AGENTS.md) уже есть — top-up не требуется" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-11T14:41:34+03:00", "finishedAt": "2026-10-11T14:42:20+03:00", "note": "R01–R08; R02 (сама публикация) — deferred: внешнее действие с аккаунтом пользователя" },
    { "id": "briefing",  "status": "skipped", "startedAt": "2026-10-11T14:42:20+03:00", "finishedAt": "2026-10-11T14:42:20+03:00", "note": "полный автомат — самобрифинг, вопросов нет; 7 решений за пользователя (ASSUMPTION-1…7)" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-11T14:42:20+03:00", "finishedAt": "2026-10-11T14:43:26+03:00", "note": "G2: независимый чек — 1 находка (R02 вне рамок), остальное — имплицитные требования публикации; open нет" },
    { "id": "plan",      "status": "skipped", "startedAt": "2026-10-11T14:43:26+03:00", "finishedAt": "2026-10-11T14:43:26+03:00", "note": "ярус T0 — без разбивки на таски, один проход" },
    { "id": "build",     "status": "done", "startedAt": "2026-10-11T14:43:26+03:00", "finishedAt": "2026-10-11T14:44:49+03:00", "note": "T0, один проход: habr-post-final.md + .plain.txt + habr-publish-package.md; node --test 345/0" },
    { "id": "review",    "status": "done", "startedAt": "2026-10-11T14:44:49+03:00", "finishedAt": "2026-10-11T14:44:49+03:00", "note": "три оси inline (T0): манифест/спека чисто; craft — 2 concerns, BLOCKING нет" },
    { "id": "final",     "status": "active", "startedAt": "2026-10-11T14:44:49+03:00" }
  ],
  "requirements": {
    "total": 8, "done": 7, "inTicket": 0, "inSpec": 0,
    "placeholder": 0, "deferred": 1, "dropped": 0
  },
  "tickets": [],
  "singlePass": { "startedAt": "2026-10-11T14:43:26+03:00", "finishedAt": "2026-10-11T14:44:49+03:00", "files": ["docs/articles/habr-post-final.md", "docs/articles/habr-post-final.plain.txt", "docs/articles/habr-publish-package.md"], "tests": "node --test → 345 passed / 0 failed", "commit": null },
  "tests": "345 passed / 0 failed (node --test, прогон 2026-10-11)",
  "debt": { "placeholders": [], "assumptions": ["ASSUMPTION-1 заголовок — вариант 1", "ASSUMPTION-2 хабы — 5 шт.", "ASSUMPTION-3 теги — 9 шт.", "ASSUMPTION-4 КДПВ — 01-hero.png", "ASSUMPTION-5 время — будний день, утро-день МСК", "ASSUMPTION-7 doc-ссылки — на GitHub master"], "emptyEnv": [] },
  "additions": [],
  "coverage": "G2 независимый чек (бриф+спека, без манифеста): MISSING 1 — R02 (сама публикация) вынесена во «Вне рамок» как deferred (внешнее действие); HALF-COVERED 0; EXTRA — имплицитные требования публикации (R03i–R08i: поля, картинки, HFM, модерация, ссылки), привязаны к R01/R02, не свободные A##. Все прочие расхождения — нужные следствия «опубликовать на Habr».",
  "concerns": [
    "docs/articles/habr-post-final.md:49 — фраза «без метафор «на грани»» содержит выражение из Avoid-списка проекта, но в отрицательной конструкции (описание состояния, которое сервис НЕ использует); сохранено как в вычитанном источнике, не блокирует",
    "docs/articles/habr-post-final.md:72,102,108,140,159 — кодовые спаны calc/*.js и data/audit.jsonl оставлены кодом, а не ссылками GitHub (решение спеки: иллюстрация, не ссылка-доказательство); при желании пользователя легко превращаются в ссылки"
  ],
  "reviewers": { "manifestSpec": null, "craft": null },
  "blind": null
}
