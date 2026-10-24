window.STATE =
{
  "version": 2,
  "slug": "indices-audit",
  "dir": "2026-10-24-indices-audit--wip",
  "title": "Приложение «Аудит индексов» — indices-audit.html",
  "mode": "full",
  "depth": "normal",
  "tier": "T1",
  "briefFile": "2026-10-24-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": null,
  "startedAt": "2026-10-24T20:07:36+03:00",
  "updatedAt": "2026-10-24T20:11:35+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-24T20:07:36+03:00",
      "finishedAt": "2026-10-24T20:08:03+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-24T20:08:03+03:00",
      "finishedAt": "2026-10-24T20:08:25+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-10-24T20:08:24+03:00",
      "finishedAt": "2026-10-24T20:08:24+03:00",
      "note": "полный автомат — самобрифинг"
    },
    {
      "id": "spec",
      "status": "active",
      "startedAt": "2026-10-24T20:08:25+03:00"
    },
    {
      "id": "plan",
      "status": "pending"
    },
    {
      "id": "build",
      "status": "pending"
    },
    {
      "id": "review",
      "status": "pending"
    },
    {
      "id": "final",
      "status": "pending"
    }
  ],
  "requirements": {
    "total": 24,
    "done": 0,
    "inTicket": 24,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Источник страницы: карточки, матрица, развёртка 120 ячеек, страны",
      "requirements": [
        "R02",
        "R03",
        "R04",
        "R06",
        "R09",
        "R10",
        "R11",
        "R12",
        "R17",
        "R19"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "docs/articles/indices-audit-app-source.md"
      ],
      "review": "да — риск выдуманных фактов",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "02",
      "title": "Генератор страницы, тест-пин, выкат",
      "requirements": [
        "R01",
        "R04",
        "R05",
        "R06",
        "R07",
        "R08",
        "R13",
        "R14",
        "R15",
        "R16",
        "R18",
        "R19",
        "R20",
        "R21i",
        "R22i",
        "R23i",
        "R24i",
        "A01"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "indices-audit-build.js",
        "indices-audit.html",
        "tests/indices-audit.test.js",
        "tests/seo-pages.test.js",
        ".github/workflows/deploy.yml",
        "sitemap.xml"
      ],
      "review": "да — фундамент",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    }
  ],
  "tests": null,
  "debt": {
    "placeholders": [],
    "assumptions": [
      "страница статическая, без клиентского JS: текст экранирует генератор (R01, R16)",
      "генератор indices-audit-build.js в корне, вход — docs/articles/indices-audit-app-source.md (R13)",
      "формула весов и частота обновления восстановлены так, чтобы дать все 12 чисел статьи (R07)",
      "устойчивость — сдвиг одного веса ±5 с перенормировкой остальных (R08)",
      "таблица стран — матрица 14×12 + атрибуты проектов; неподтверждённое помечается «не проверено» (R09, R10)"
    ],
    "emptyEnv": []
  },
  "additions": [
    "якоря на проект и на пару «проект-критерий» плюс оглавление — чтобы ссылаться на клетку (R06)"
  ],
  "coverage": {
    "found": 8,
    "fixed": 7,
    "deferred": 1,
    "items": [
      "Туркменистан — сознательно не включаем (вне рамок, ASSUMPTION)",
      "публикация статьи на Habr — внешнее действие пользователя, вне рамок"
    ]
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-10-24T20:07:36+03:00",
    "2026-10-24T20:08:03+03:00",
    "2026-10-24T20:08:24+03:00",
    "2026-10-24T20:08:25+03:00",
    "2026-10-24T20:09:21+03:00",
    "2026-10-24T20:11:00+03:00",
    "2026-10-24T20:11:34+03:00",
    "2026-10-24T20:11:35+03:00"
  ],
  "rev": 13,
  "waiting": null,
  "waits": [],
  "log": [
    {
      "t": "2026-10-24T20:07:36+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-24T20:08:03+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-24T20:08:24+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "skip",
      "note": "полный автомат — самобрифинг"
    },
    {
      "t": "2026-10-24T20:08:24+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 5
    },
    {
      "t": "2026-10-24T20:08:25+03:00",
      "k": "gate",
      "g": "G1",
      "ok": false,
      "open": 24,
      "total": 24
    },
    {
      "t": "2026-10-24T20:08:25+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-10-24T20:09:21+03:00",
      "k": "add",
      "key": "additions",
      "n": 1
    },
    {
      "t": "2026-10-24T20:11:00+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 8,
      "fixed": 7,
      "deferred": 1
    },
    {
      "t": "2026-10-24T20:11:34+03:00",
      "k": "tier",
      "v": "T1"
    },
    {
      "t": "2026-10-24T20:11:35+03:00",
      "k": "tickets",
      "n": 2
    },
    {
      "t": "2026-10-24T20:11:35+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«создай приложение /indices-audit.html»",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«Карточки 12 проектов… По каждой: конструкт, что подтверждено, что не подтверждено, источник со ссылкой и датой проверки»",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«оговорка о том, что «—» значит «не подтверждено», а не «отсутствует»»",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«Матрица 12 × 10 (Д, Ф, С, Г, Н, В, Л, И, Ст, Р) - без колонки «Балл», без итога в шапке»",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«Итог 62 из 120 и медиана 5,5 - отдельным абзацем с оговоркой «это не рейтинг»»",
      "status": "in-ticket"
    },
    {
      "id": "R06",
      "text": "«Развёртка 120 ячеек: по каждой ячейке - чем именно подтверждена (документ, страница, дата) или почему пустая»",
      "status": "in-ticket"
    },
    {
      "id": "R07",
      "text": "«Взвешенная шкала (25/25/20/15/15) с формулой пересчёта из матрицы, промежуточными значениями по каждому критерию и результатом: UCDP 98, GPR 88, ACLED 73, INFORM 69, EWP 69, Cassandra 58, GPI 56, FSI 56, GDELT 48, War Monitor 45, CrisisWa…",
      "status": "in-ticket"
    },
    {
      "id": "R08",
      "text": "«Плюс проверка устойчивости при ±5 п.п.»",
      "status": "in-ticket"
    },
    {
      "id": "R09",
      "text": "«Таблица покрытия по 14 странам… Колонки: покрыт ли индексом, разрешение, с какого года, лаг публикации, где смотреть»",
      "status": "in-ticket"
    },
    {
      "id": "R10",
      "text": "«Ни одной строки не выдумывать… Если по стране данных нет - пустая клетка с пометкой, а не догадка»",
      "status": "in-ticket"
    },
    {
      "id": "R11",
      "text": "«Раздел «что не удалось проверить» с датами попыток и кодами ответов (403, WAF, сброс соединения, пустая разметка)»",
      "status": "in-ticket"
    },
    {
      "id": "R12",
      "text": "«Условия переиспользования: данные страницы - CC BY 4.0, атрибуция «Cassandra Index - https://cassindex.ru»»",
      "status": "in-ticket"
    },
    {
      "id": "R13",
      "text": "«генератор по образцу blog-build.js: вход - markdown-источники в docs/articles/, выход - indices-audit.html в корне»",
      "status": "in-ticket"
    },
    {
      "id": "R14",
      "text": "«добавить indices-audit.html в cp-строку шага «Stage site files» в .github/workflows/deploy.yml»",
      "status": "in-ticket"
    },
    {
      "id": "R15",
      "text": "«Тест: пин на паритет сгенерированной страницы с генератором… + проверка, что все 12 карточек и 120 ячеек на месте»",
      "status": "in-ticket"
    },
    {
      "id": "R16",
      "text": "«только токены из css/styles.css, document.createElement + textContent…, видимый фокус, контраст ≥ 4.5:1, reflow до 320 px, таблицы в скроллируемом контейнере с подписью»",
      "status": "in-ticket"
    },
    {
      "id": "R17",
      "text": "«без «на грани», «на пороге», без прогнозов и оценок сторон; «боевые действия на территории Украины»»",
      "status": "in-ticket"
    },
    {
      "id": "R18",
      "text": "«node --test зелёный, node build.js не нужен (нет правок js/)»",
      "status": "in-ticket"
    },
    {
      "id": "R19",
      "text": "«Все цифры статьи (5 из 12, 62 из 120, 58 баллов) должны совпасть с приложением»",
      "status": "in-ticket"
    },
    {
      "id": "R20",
      "text": "«Проверить ссылку из статьи в локальном браузере»",
      "status": "in-ticket"
    },
    {
      "id": "R21i",
      "text": "(подразумевается) страница открывается по адресу /indices-audit.html на cassindex.ru, то есть попадает в выкат",
      "status": "in-ticket"
    },
    {
      "id": "R22i",
      "text": "(подразумевается) страница работает без сети и без сервера — как остальные статические страницы сайта",
      "status": "in-ticket"
    },
    {
      "id": "R23i",
      "text": "(подразумевается) ноль зависимостей, ESM, никаких npm/CDN",
      "status": "in-ticket"
    },
    {
      "id": "R24i",
      "text": "(подразумевается) на страницу можно сослаться из статьи: одна строка ссылок в конце статьи не меняется",
      "status": "in-ticket"
    }
  ],
  "gates": {
    "G1": {
      "ok": false,
      "at": "2026-10-24T20:08:25+03:00",
      "open": 24,
      "total": 24
    },
    "G2": {
      "ok": true,
      "at": "2026-10-24T20:11:00+03:00",
      "found": 8,
      "fixed": 7,
      "deferred": 1
    },
    "G3": {
      "ok": true,
      "at": "2026-10-24T20:11:35+03:00",
      "problems": 0
    }
  },
  "result": null
}
