window.STATE =
{
  "slug": "cassandra-index-publish",
  "dir": "2026-09-20-cassandra-index-publish",
  "title": "Публикация сервиса Индекс Кассандры",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T1",
  "briefFile": "2026-09-20-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-09-20T22:08:30+03:00",
  "updatedAt": "2026-09-20T23:05:00+03:00",
  "finishedAt": "2026-09-20T23:05:00+03:00",
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-09-20T22:08:30+03:00", "finishedAt": "2026-09-20T22:09:30+03:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-09-20T22:09:30+03:00", "finishedAt": "2026-09-20T22:14:00+03:00" },
    { "id": "briefing",  "status": "skipped", "note": "полный автомат — самобрифинг, решения в manifest.md" },
    { "id": "spec",      "status": "done", "startedAt": "2026-09-20T22:14:00+03:00", "finishedAt": "2026-09-20T22:18:00+03:00" },
    { "id": "plan",      "status": "done", "startedAt": "2026-09-20T22:18:00+03:00", "finishedAt": "2026-09-20T22:22:00+03:00", "note": "3 таска, ярус T1 — волна 1 (01), волна 2 (02, 03)" },
    { "id": "build",     "status": "done", "startedAt": "2026-09-20T22:22:00+03:00", "finishedAt": "2026-09-20T22:58:00+03:00", "note": "3 из 3 тасок готовы" },
    { "id": "review",    "status": "done", "startedAt": "2026-09-20T22:30:00+03:00", "finishedAt": "2026-09-20T22:58:00+03:00", "note": "все оси чистые, правки по concerns в таске 03" },
    { "id": "final",     "status": "done", "startedAt": "2026-09-20T22:58:00+03:00", "finishedAt": "2026-09-20T23:05:00+03:00", "note": "слепая приёмка без расхождений" }
  ],
  "requirements": {
    "total": 5, "done": 5, "inTicket": 0, "inSpec": 0,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [
    { "id": "01", "title": "Выкатная обвязка: GitHub Actions workflow + инструкция обновления",
      "requirements": ["R01", "R02i", "R04i", "R05i"],
      "blockedBy": [], "wave": 1, "zone": [".github/workflows/", "AGENTS.md"],
      "status": "done", "startedAt": "2026-09-20T22:24:00+03:00", "finishedAt": "2026-09-20T22:38:00+03:00",
      "retries": 0, "repairs": 0, "handoffs": 0,
      "files": [".github/workflows/deploy.yml", "AGENTS.md"],
      "tests": { "passed": 91, "failed": 0 },
      "commit": "e599d2b",
      "concerns": [] },
    { "id": "02", "title": "Публикация: репозиторий, push, проверка живого URL",
      "requirements": ["R01", "R03i"],
      "blockedBy": ["01"], "wave": 2, "zone": ["git remote / GitHub"],
      "status": "done", "startedAt": "2026-09-20T22:50:00+03:00", "finishedAt": "2026-09-20T22:58:00+03:00",
      "retries": 0, "repairs": 0, "handoffs": 0,
      "files": ["AGENTS.md"],
      "tests": { "passed": 91, "failed": 0 },
      "commit": "8b5319f",
      "concerns": [],
      "note": "пользователь подтвердил публикацию 2026-09-20; репозиторий public, выкат проверен headless" },
    { "id": "03", "title": "Правки по крафт-ревью: contents: read + счётчики тестов",
      "requirements": [],
      "blockedBy": ["01"], "wave": 2, "zone": [".github/workflows/", "AGENTS.md"],
      "status": "done", "startedAt": "2026-09-20T22:38:00+03:00", "finishedAt": "2026-09-20T22:45:00+03:00",
      "retries": 0, "repairs": 0, "handoffs": 0,
      "files": [".github/workflows/deploy.yml", "AGENTS.md"],
      "tests": { "passed": 91, "failed": 0 },
      "commit": "31fe7e2",
      "concerns": [],
      "note": "закрывает замечания крафт-ревью из concerns" }
  ],
  "singlePass": null,
  "tests": { "passed": 91, "failed": 0 },
  "debt": { "placeholders": [], "assumptions": [], "emptyEnv": [] },
  "additions": [],
  "coverage": {
    "gate": "G2",
    "checkedAt": "2026-09-20T22:18:00+03:00",
    "findings": 0,
    "detail": "независимая сверка brief↔spec: не покрытого нет, наполовину нет; всё сверх брифа — привязанные допущения (R02i–R05i)"
  },
  "concerns": [
    "наблюдение приёмки (не расхождение): в опубликованном index.html есть инлайн-<style> с пометкой «Мигрировать в css/styles.css» — донесение сайта, не этого прогона; на работу не влияет"
  ],
  "reviewers": { "manifestSpec": "agent-36", "craft": "agent-37" },
  "blind": {
    "checkedAt": "2026-09-20T23:02:00+03:00",
    "verdict": "реализовано",
    "drift": 0,
    "detail": "слепая приёмка: живой URL 200, hero/секции отрендерены, все ресурсы 200, утечки .autopilot/ и *.md наружу нет, репозиторий PUBLIC, оба выката success, node --test 91/0; расхождений с манифестом нет"
  }
}
