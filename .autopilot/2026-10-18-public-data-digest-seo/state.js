window.STATE =
{
  "version": 2,
  "slug": "public-data-digest-seo",
  "dir": "2026-10-18-public-data-digest-seo",
  "title": "Страница «Как читать индекс», публичные данные с changelog, еженедельный дайджест и SEO-страницы",
  "mode": "full",
  "depth": "normal",
  "tier": "T2",
  "briefFile": "2026-10-18-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": "97bd12c",
  "startedAt": "2026-10-18T20:42:30+03:00",
  "updatedAt": "2026-10-18T21:32:23+03:00",
  "finishedAt": "2026-10-18T21:32:11+03:00",
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
      "status": "done",
      "startedAt": "2026-10-18T20:44:00+03:00",
      "finishedAt": "2026-10-18T21:12:43+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-10-18T21:12:43+03:00",
      "finishedAt": "2026-10-18T21:12:43+03:00"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-10-18T21:12:50+03:00",
      "finishedAt": "2026-10-18T21:12:50+03:00"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-10-18T21:12:43+03:00",
      "finishedAt": "2026-10-18T21:26:20+03:00"
    },
    {
      "id": "final",
      "status": "done",
      "startedAt": "2026-10-18T21:26:20+03:00",
      "finishedAt": "2026-10-18T21:32:11+03:00"
    }
  ],
  "requirements": {
    "total": 28,
    "done": 25,
    "inTicket": 0,
    "inSpec": 0,
    "placeholder": 3,
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
      "status": "done",
      "startedAt": "2026-10-18T20:49:53+03:00",
      "finishedAt": "2026-10-18T21:00:41+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 615,
        "failed": 0
      },
      "commit": "4da1c2f"
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
      "status": "done",
      "startedAt": "2026-10-18T20:49:53+03:00",
      "finishedAt": "2026-10-18T21:00:42+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 615,
        "failed": 0
      },
      "commit": "c2c305b"
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
      "status": "done",
      "startedAt": "2026-10-18T21:00:55+03:00",
      "finishedAt": "2026-10-18T21:09:47+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 640,
        "failed": 0
      },
      "commit": "dae5a03"
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
        ".github/workflows/weekly-digest.yml",
        "tests/site-pages.test.js"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "done",
      "startedAt": "2026-10-18T21:09:48+03:00",
      "finishedAt": "2026-10-18T21:12:42+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 650,
        "failed": 0
      },
      "commit": "4b51695"
    },
    {
      "id": "F1",
      "title": "Ремонт ветки: хрупкие пины, автопрогон, дайджест и a11y",
      "requirements": [
        "R16i",
        "R17.1",
        "R20",
        "R21",
        "R18",
        "R19",
        "R08"
      ],
      "blockedBy": [],
      "wave": 4,
      "zone": [
        "tests/public-export.test.js",
        "tests/digest.test.js",
        "tests/seo-pages.test.js",
        "tests/changelog.test.js",
        ".github/workflows/weekly-calc.yml",
        ".github/workflows/weekly-digest.yml",
        "calc/digest.js",
        "calc/digest-send.js",
        "css/styles.css"
      ],
      "review": "да — ремонт ветки",
      "model": "сильная",
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "startedAt": "2026-10-18T21:16:34+03:00",
      "finishedAt": "2026-10-18T21:26:19+03:00",
      "tests": {
        "passed": 660,
        "failed": 0
      },
      "commit": "60b53ee"
    }
  ],
  "tests": {
    "passed": 660,
    "failed": 0
  },
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
  "additions": [
    "compare.html — хаб сравнений, ради R24",
    "trend.svg — кривая 12 точек для встраивания и дайджеста, ради R09",
    "digest.html — публичный архив выпусков, ради R17"
  ],
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
  "concerns": [
    "calc/public-export.js — changelog.json берёт schema_version публичной схемы, нужна своя константа",
    "calc/public-export.js:281 — trend.svg соединяет точки методологий 1.0 и 3.0 линией, сайт такие точки не показывает",
    "calc/public-export.js:397 — regex s.regions_taxonomy ломается при смене renderGlobal, тихий фолбэк на дату",
    "calc/public-export.js — флаг --root не объявлен в interfaces.md (тестовый шов)",
    "tests/public-export.test.js:391 — пин weeks.length === 12 упадёт на первой новой неделе",
    "tests/public-export.test.js:321 — замена \" index\\:",
    "64",
    "зависит",
    "от",
    "текущего",
    "значения",
    "global.js tests/public-export.test.js:378",
    "—",
    "«паритет",
    "с",
    "week.js»",
    "сравнивает",
    "datasetOf",
    "тем",
    "же",
    "снапшотом,",
    "файл",
    "не",
    "читается tests/changelog.test.js:62",
    "верхняя",
    "дата",
    "2026-10-18",
    "упадёт",
    "при",
    "новой",
    "записи .github/workflows/weekly-calc.yml",
    "public-export",
    "в",
    "автопрогоне:",
    "новая",
    "неделя",
    "уронит",
    "паритетный",
    "тест",
    "и",
    "остановит",
    "автопубликацию css/styles.css:2376-2478",
    "русские",
    "комментарии",
    "побиты",
    "серии",
    "?,",
    "вернуть",
    "кириллицу css/styles.css:2434,2476",
    ".doc-meta/.doc-figure-note",
    "на",
    "4.01:1",
    "3.69:1",
    "ниже",
    "4.5:1 compare-acled.html:62",
    "«рейтинг",
    "стран»",
    "у",
    "Conflict",
    "Index",
    "нет",
    "источнике compare-crisiswatch.html:42",
    "«до",
    "50",
    "ситуаций»",
    "вместо",
    "«50+»",
    "из",
    "desk",
    "research spec",
    "§5",
    "обещан",
    "видимый",
    "FAQ,",
    "ни",
    "одной",
    "странице",
    "его",
    "нет css/styles.css:2471",
    ".doc-figure-value--state",
    "жёстко",
    "класса",
    "состояния how-to-read.html:107",
    "«отправьте",
    "адрес",
    "через",
    "форму»,",
    "но",
    "поля",
    "адреса",
    "форме",
    "нет index.html",
    "подвал",
    "три",
    "страницы",
    "сравнения",
    "достижимы",
    "только",
    "хаб",
    "calc/digest-send.js:160-174 — отметка отправки только недельная: при падении второго канала первый дублируется при повторе; хранить пары неделя+канал",
    ".github/workflows/weekly-digest.yml:92-124 — отправка раньше коммита sent.json: срыв git push даёт дубль в публичный канал",
    "tests/digest.test.js:106-108 — экранирование проверено юнитом, а не сквозь buildDigest (html/telegram с <script> в источнике)",
    "calc/digest.js:176-180 — в «сильнее всего изменились» попадают регионы без числовой delta (печатается «—»)",
    "calc/digest.js:203-216 — пятый пункт и строка «Регионы: …» дублируют одни и те же числа",
    "calc/digest-send.js:291 — неделя помечается отправленной целиком при одном канале: email позже уже не уйдёт",
    "tests/seo-pages.test.js:167 — дата проверки фактов 2026-10-18 всё ещё пинится литералом",
    "tests/changelog.test.js — снята проверка «дата не в будущем», запись 2099 пройдёт",
    "tests/seo-pages.test.js:213 — тест утверждает контраст --text-muted < 4.5, то есть пинит дефект токена"
  ],
  "blind": {
    "checked": 28,
    "matched": 28,
    "mismatches": [
      "R18/R19 — доставка не проверена end-to-end: нет секретов; заглушка видна (placeholder), расхождением не считаю"
    ]
  },
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
    "2026-10-18T20:49:28+03:00",
    "2026-10-18T20:49:37+03:00",
    "2026-10-18T20:49:53+03:00",
    "2026-10-18T20:56:14+03:00",
    "2026-10-18T21:00:41+03:00",
    "2026-10-18T21:00:42+03:00",
    "2026-10-18T21:00:54+03:00",
    "2026-10-18T21:00:55+03:00",
    "2026-10-18T21:07:18+03:00",
    "2026-10-18T21:09:47+03:00",
    "2026-10-18T21:09:48+03:00",
    "2026-10-18T21:12:42+03:00",
    "2026-10-18T21:12:43+03:00",
    "2026-10-18T21:12:50+03:00",
    "2026-10-18T21:12:51+03:00",
    "2026-10-18T21:16:26+03:00",
    "2026-10-18T21:16:34+03:00",
    "2026-10-18T21:26:19+03:00",
    "2026-10-18T21:26:20+03:00",
    "2026-10-18T21:28:07+03:00",
    "2026-10-18T21:32:11+03:00",
    "2026-10-18T21:32:22+03:00",
    "2026-10-18T21:32:23+03:00"
  ],
  "rev": 43,
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
    },
    {
      "t": "2026-10-18T20:49:53+03:00",
      "k": "ticket",
      "ids": [
        "01",
        "02"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T20:56:14+03:00",
      "k": "ticket",
      "ids": [
        "01",
        "02"
      ],
      "act": "review"
    },
    {
      "t": "2026-10-18T21:00:41+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "done",
      "tests": {
        "passed": 615,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T21:00:42+03:00",
      "k": "ticket",
      "ids": [
        "02"
      ],
      "act": "done",
      "tests": {
        "passed": 615,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T21:00:54+03:00",
      "k": "add",
      "key": "concerns",
      "n": 116
    },
    {
      "t": "2026-10-18T21:00:55+03:00",
      "k": "add",
      "key": "report",
      "n": 1
    },
    {
      "t": "2026-10-18T21:00:55+03:00",
      "k": "ticket",
      "ids": [
        "03"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T21:07:18+03:00",
      "k": "ticket",
      "ids": [
        "03"
      ],
      "act": "review"
    },
    {
      "t": "2026-10-18T21:09:47+03:00",
      "k": "add",
      "key": "concerns",
      "n": 6
    },
    {
      "t": "2026-10-18T21:09:47+03:00",
      "k": "ticket",
      "ids": [
        "03"
      ],
      "act": "done",
      "tests": {
        "passed": 640,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T21:09:48+03:00",
      "k": "ticket",
      "ids": [
        "04"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T21:12:42+03:00",
      "k": "ticket",
      "ids": [
        "04"
      ],
      "act": "done",
      "tests": {
        "passed": 650,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T21:12:43+03:00",
      "k": "stage",
      "id": "review",
      "act": "start"
    },
    {
      "t": "2026-10-18T21:12:50+03:00",
      "k": "stage",
      "id": "build",
      "act": "done"
    },
    {
      "t": "2026-10-18T21:12:51+03:00",
      "k": "stage",
      "id": "review",
      "act": "start"
    },
    {
      "t": "2026-10-18T21:16:26+03:00",
      "k": "tickets",
      "n": 5
    },
    {
      "t": "2026-10-18T21:16:26+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-10-18T21:16:34+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-18T21:26:19+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "done",
      "tests": {
        "passed": 660,
        "failed": 0
      }
    },
    {
      "t": "2026-10-18T21:26:20+03:00",
      "k": "add",
      "key": "concerns",
      "n": 3
    },
    {
      "t": "2026-10-18T21:26:20+03:00",
      "k": "stage",
      "id": "final",
      "act": "start"
    },
    {
      "t": "2026-10-18T21:28:07+03:00",
      "k": "gate",
      "g": "G4",
      "ok": false,
      "checked": 28,
      "matched": 28
    },
    {
      "t": "2026-10-18T21:32:11+03:00",
      "k": "tests",
      "passed": 660,
      "failed": 0
    },
    {
      "t": "2026-10-18T21:32:11+03:00",
      "k": "finish",
      "result": "Публичный слой индекса: страница «Как читать индекс», JSON/CSV/trend.svg с changelog, недельный дайджест с архивом и доставкой, SEO-страницы сравнения с War Monitor/ACLED/CrisisWatch"
    },
    {
      "t": "2026-10-18T21:32:22+03:00",
      "k": "add",
      "key": "additions",
      "n": 3
    },
    {
      "t": "2026-10-18T21:32:23+03:00",
      "k": "add",
      "key": "report",
      "n": 4
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«страница «Как читать индекс»»",
      "status": "done"
    },
    {
      "id": "R02",
      "text": "«страница «Как читать индекс»»",
      "status": "done"
    },
    {
      "id": "R03",
      "text": "«Как читать индекс»",
      "status": "done"
    },
    {
      "id": "R04",
      "text": "«Как читать индекс»",
      "status": "done"
    },
    {
      "id": "R05",
      "text": "«Как читать индекс»",
      "status": "done"
    },
    {
      "id": "R06",
      "text": "«Как читать индекс»",
      "status": "done"
    },
    {
      "id": "R07",
      "text": "«Как читать индекс»",
      "status": "done"
    },
    {
      "id": "R08",
      "text": "«Как читать индекс»",
      "status": "done"
    },
    {
      "id": "R09",
      "text": "«публичный JSON/CSV»",
      "status": "done"
    },
    {
      "id": "R10",
      "text": "«публичный JSON/CSV»",
      "status": "done"
    },
    {
      "id": "R11",
      "text": "«публичный JSON/CSV»",
      "status": "done"
    },
    {
      "id": "R12",
      "text": "«+ changelog»",
      "status": "done"
    },
    {
      "id": "R13",
      "text": "«+ changelog»",
      "status": "done"
    },
    {
      "id": "R14",
      "text": "«публичный JSON/CSV»",
      "status": "done"
    },
    {
      "id": "R15i",
      "text": "(подразумевается) «публичный»",
      "status": "placeholder",
      "why": "условия переиспользования: как ссылаться и что нельзя приписывать"
    },
    {
      "id": "R16i",
      "text": "(подразумевается) публичные данные",
      "status": "done"
    },
    {
      "id": "R17",
      "text": "«еженедельный Telegram/email-дайджест»",
      "status": "done"
    },
    {
      "id": "R18",
      "text": "«еженедельный Telegram/email-дайджест»",
      "status": "placeholder",
      "why": "доставка в Telegram-канал"
    },
    {
      "id": "R19",
      "text": "«еженедельный Telegram/email-дайджест»",
      "status": "placeholder",
      "why": "доставка на email-адреса из списка"
    },
    {
      "id": "R20",
      "text": "«еженедельный Telegram/email-дайджест»",
      "status": "done"
    },
    {
      "id": "R21",
      "text": "«еженедельный»",
      "status": "done"
    },
    {
      "id": "R22i",
      "text": "(подразумевается) Telegram/email",
      "status": "done"
    },
    {
      "id": "R23i",
      "text": "«email-дайджест»",
      "status": "done"
    },
    {
      "id": "R24",
      "text": "«SEO-страницы против War Monitor»",
      "status": "done"
    },
    {
      "id": "R25",
      "text": "«против … ACLED»",
      "status": "done"
    },
    {
      "id": "R26",
      "text": "«против … CrisisWatch»",
      "status": "done"
    },
    {
      "id": "R27",
      "text": "«SEO-страницы»",
      "status": "done"
    },
    {
      "id": "R28",
      "text": "«SEO-страницы против …»",
      "status": "done"
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
      "at": "2026-10-18T21:16:26+03:00",
      "problems": 0
    },
    "G4": {
      "ok": false,
      "at": "2026-10-18T21:28:07+03:00",
      "checked": 28,
      "matched": 28
    }
  },
  "result": "Публичный слой индекса: страница «Как читать индекс», JSON/CSV/trend.svg с changelog, недельный дайджест с архивом и доставкой, SEO-страницы сравнения с War Monitor/ACLED/CrisisWatch",
  "report": [
    "Параллельная сессия в том же рабочем дереве коммитом 9d0f708 втянула половину таска 02 и затем перезаписала index.html/css/i18n их старой копией — изменения восстановлены из HEAD, потерянных правок нет",
    "trend.svg проводит одну линию через демо-недели 1.0 и 3.0 — сайт такие точки на тренде не показывает",
    "changelog.html и index.html без canonical/OG (у новых SEO-страниц они есть)",
    "how-to-read.html показывает пример недели 2026-10-18 и не перегенерируется — нужен либо генератор, либо пометка «пример»",
    "лицензия публичных данных не выбрана: в index.json license.name/url = null, placeholder"
  ]
}
