window.STATE =
{
  "version": 2,
  "slug": "public-data-digest-seo",
  "dir": "2026-10-18-public-data-digest-seo--wip",
  "title": "Страница «Как читать индекс», публичные данные с changelog, еженедельный дайджест и SEO-страницы",
  "mode": "full",
  "depth": "normal",
  "tier": "T2",
  "briefFile": "2026-10-18-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": null,
  "startedAt": "2026-10-18T20:42:30+03:00",
  "updatedAt": "2026-10-18T20:49:28+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-18T20:42:30+03:00",
      "finishedAt": "2026-10-18T20:43:23+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-18T20:43:23+03:00",
      "finishedAt": "2026-10-18T20:44:00+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-10-18T20:43:45+03:00",
      "finishedAt": "2026-10-18T20:43:45+03:00",
      "note": "полный автомат — самобрифинг"
    },
    {
      "id": "spec",
      "status": "active",
      "startedAt": "2026-10-18T20:44:00+03:00"
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
    "total": 28,
    "done": 0,
    "inTicket": 28,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Публичные данные: JSON, CSV, changelog",
      "requirements": [
        "R09",
        "R09.1",
        "R09.2",
        "R10",
        "R11",
        "R12",
        "R13",
        "R14",
        "R15i",
        "R16i",
        "A02"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/public-export.js",
        "calc/changelog-entries.js",
        "data/public/",
        "changelog.html",
        "tests/public-export.test.js",
        "tests/changelog.test.js"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "02",
      "title": "«Как читать индекс» и страницы сравнения",
      "requirements": [
        "R01",
        "R02",
        "R03",
        "R04",
        "R05",
        "R06",
        "R07",
        "R08",
        "R15i",
        "R23i",
        "R24",
        "R24.1",
        "R25",
        "R26",
        "R27",
        "R28",
        "A01"
      ],
      "blockedBy": [],
      "wave": 2,
      "zone": [
        "index.html",
        "how-to-read.html",
        "compare.html",
        "compare-war-monitor.html",
        "compare-acled.html",
        "compare-crisiswatch.html",
        "css/styles.css",
        "js/i18n.js",
        "js/sections/feedback.js",
        "js/bundle.js",
        "js/bundle-privacy.js",
        "tests/seo-pages.test.js",
        "tests/lexicon.test.js"
      ],
      "review": "да — публичная поверхность",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "03",
      "title": "Недельный дайджест: текст, доставка, архив",
      "requirements": [
        "R17",
        "R17.1",
        "R18",
        "R19",
        "R19.1",
        "R20",
        "R21",
        "R22i",
        "A03",
        "A03.1"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "calc/digest.js",
        "calc/digest-page.js",
        "calc/digest-export.js",
        "calc/digest-send.js",
        ".github/workflows/weekly-digest.yml",
        ".env.example",
        "data/public/digest/",
        "data/digest/sent.json",
        "digest.html",
        "tests/digest.test.js",
        "tests/digest-send.test.js"
      ],
      "review": "да — секреты и сообщения третьим лицам",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "04",
      "title": "Публикация: sitemap, robots, deploy и сквозные проверки",
      "requirements": [
        "R14",
        "R27",
        "R27.1",
        "R13",
        "R07"
      ],
      "blockedBy": [
        "01",
        "02",
        "03"
      ],
      "wave": 3,
      "zone": [
        "sitemap.xml",
        "robots.txt",
        ".github/workflows/deploy.yml",
        "tests/site-pages.test.js"
      ],
      "review": "нет",
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
      "email-доставка — HTTP-адаптер к провайдеру (endpoint+token в секретах): SMTP-клиента без зависимостей нет",
      "список адресов дайджеста — секрет репозитория; самостоятельной подписки без бэкенда нет, заявка идёт через существующую форму",
      "график в дайджесте — ссылка на SVG-кривую и текстовый тренд: PNG без зависимостей не собрать",
      "SEO-страницы держат текст в разметке, а не в i18n — иначе поисковик и читатель без JS не увидят текста",
      "ни одного реального сообщения в этой сборке не отправляется; первый живой выпуск — за пользователем"
    ],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "found": 3,
    "fixed": 3,
    "deferred": 0,
    "items": [
      "R10 — добавлен полный URL CSV (data/public/cassandra-index.csv)",
      "R17/R18/R19 — уточнено: пайплайн доставки собирается целиком, живой выпуск — действие владельца",
      "R29i → A03: архив дайджеста — добавление к R17, не требование брифа",
      "процессные слова брифа (исполнить навык, состояние в .autopilot/, не спрашивать) — не продуктовые требования, в спецификацию не входят"
    ]
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-10-18T20:42:30+03:00",
    "2026-10-18T20:43:22+03:00",
    "2026-10-18T20:43:23+03:00",
    "2026-10-18T20:43:45+03:00",
    "2026-10-18T20:43:46+03:00",
    "2026-10-18T20:43:47+03:00",
    "2026-10-18T20:43:48+03:00",
    "2026-10-18T20:44:00+03:00",
    "2026-10-18T20:48:27+03:00",
    "2026-10-18T20:49:27+03:00",
    "2026-10-18T20:49:28+03:00"
  ],
  "rev": 15,
  "waiting": null,
  "waits": [],
  "log": [
    {
      "t": "2026-10-18T20:42:30+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-18T20:43:23+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-18T20:43:45+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "skip",
      "note": "полный автомат — самобрифинг"
    },
    {
      "t": "2026-10-18T20:43:45+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 1
    },
    {
      "t": "2026-10-18T20:43:46+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 1
    },
    {
      "t": "2026-10-18T20:43:47+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 1
    },
    {
      "t": "2026-10-18T20:43:47+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 1
    },
    {
      "t": "2026-10-18T20:43:48+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 1
    },
    {
      "t": "2026-10-18T20:44:00+03:00",
      "k": "gate",
      "g": "G1",
      "ok": true,
      "open": 0,
      "total": 29
    },
    {
      "t": "2026-10-18T20:44:00+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-10-18T20:48:27+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 3,
      "fixed": 3,
      "deferred": 0
    },
    {
      "t": "2026-10-18T20:49:27+03:00",
      "k": "tier",
      "v": "T2"
    },
    {
      "t": "2026-10-18T20:49:28+03:00",
      "k": "tickets",
      "n": 4
    },
    {
      "t": "2026-10-18T20:49:28+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«страница «Как читать индекс»»",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«страница «Как читать индекс»»",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«Как читать индекс»",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«Как читать индекс»",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«Как читать индекс»",
      "status": "in-ticket"
    },
    {
      "id": "R06",
      "text": "«Как читать индекс»",
      "status": "in-ticket"
    },
    {
      "id": "R07",
      "text": "«Как читать индекс»",
      "status": "in-ticket"
    },
    {
      "id": "R08",
      "text": "«Как читать индекс»",
      "status": "in-ticket"
    },
    {
      "id": "R09",
      "text": "«публичный JSON/CSV»",
      "status": "in-ticket"
    },
    {
      "id": "R10",
      "text": "«публичный JSON/CSV»",
      "status": "in-ticket"
    },
    {
      "id": "R11",
      "text": "«публичный JSON/CSV»",
      "status": "in-ticket"
    },
    {
      "id": "R12",
      "text": "«+ changelog»",
      "status": "in-ticket"
    },
    {
      "id": "R13",
      "text": "«+ changelog»",
      "status": "in-ticket"
    },
    {
      "id": "R14",
      "text": "«публичный JSON/CSV»",
      "status": "in-ticket"
    },
    {
      "id": "R15i",
      "text": "(подразумевается) «публичный»",
      "status": "in-ticket"
    },
    {
      "id": "R16i",
      "text": "(подразумевается) публичные данные",
      "status": "in-ticket"
    },
    {
      "id": "R17",
      "text": "«еженедельный Telegram/email-дайджест»",
      "status": "in-ticket"
    },
    {
      "id": "R18",
      "text": "«еженедельный Telegram/email-дайджест»",
      "status": "in-ticket"
    },
    {
      "id": "R19",
      "text": "«еженедельный Telegram/email-дайджест»",
      "status": "in-ticket"
    },
    {
      "id": "R20",
      "text": "«еженедельный Telegram/email-дайджест»",
      "status": "in-ticket"
    },
    {
      "id": "R21",
      "text": "«еженедельный»",
      "status": "in-ticket"
    },
    {
      "id": "R22i",
      "text": "(подразумевается) Telegram/email",
      "status": "in-ticket"
    },
    {
      "id": "R23i",
      "text": "«email-дайджест»",
      "status": "in-ticket"
    },
    {
      "id": "R24",
      "text": "«SEO-страницы против War Monitor»",
      "status": "in-ticket"
    },
    {
      "id": "R25",
      "text": "«против … ACLED»",
      "status": "in-ticket"
    },
    {
      "id": "R26",
      "text": "«против … CrisisWatch»",
      "status": "in-ticket"
    },
    {
      "id": "R27",
      "text": "«SEO-страницы»",
      "status": "in-ticket"
    },
    {
      "id": "R28",
      "text": "«SEO-страницы против …»",
      "status": "in-ticket"
    }
  ],
  "gates": {
    "G1": {
      "ok": true,
      "at": "2026-10-18T20:44:00+03:00",
      "open": 0,
      "total": 29
    },
    "G2": {
      "ok": true,
      "at": "2026-10-18T20:48:27+03:00",
      "found": 3,
      "fixed": 3,
      "deferred": 0
    },
    "G3": {
      "ok": true,
      "at": "2026-10-18T20:49:28+03:00",
      "problems": 0
    }
  },
  "result": null
}
