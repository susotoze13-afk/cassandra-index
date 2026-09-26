window.STATE =
{
  "slug": "recalc-3months-publish",
  "dir": "2026-09-26-recalc-3months-publish",
  "title": "Пересчёт индексов за 3 месяца с расширенными источниками, доработка методологии и публикация",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T2",
  "briefFile": "2026-09-26-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-09-26T08:08:30+03:00",
  "updatedAt": "2026-09-26T19:05:00+03:00",
  "finishedAt": "2026-09-26T19:05:00+03:00",
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-09-26T08:08:30+03:00",
      "finishedAt": "2026-09-26T08:10:00+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-09-26T08:10:00+03:00",
      "finishedAt": "2026-09-26T08:22:00+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "note": "полный автомат — самобрифинг, допущения зафиксированы в manifest.md (A-R02, A-R04, A-R05, A-R06)"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-09-26T08:24:00+03:00",
      "finishedAt": "2026-09-26T08:40:00+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-09-26T08:40:00+03:00",
      "finishedAt": "2026-09-26T08:52:00+03:00"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-09-26T08:52:00+03:00",
      "finishedAt": "2026-09-26T18:30:00+03:00"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-09-26T09:20:00+03:00",
      "finishedAt": "2026-09-26T18:40:00+03:00",
      "note": "8 тасков проверено, 0 блокирующих; ревьюеры свежие (agent-19 manifest+spec, agent-20 craft — прежние не пережили смену сессии)"
    },
    {
      "id": "final",
      "status": "done",
      "startedAt": "2026-09-26T18:40:00+03:00",
      "finishedAt": "2026-09-26T19:05:00+03:00",
      "note": "слепая приёмка agent-21 (3 дрейфа: R01 закрыт проверкой живого URL cassindex.ru — index 56 на сайте; R02 и R06 — редакционные, в отчёт); отложенные замечания разобраны: 0 «чинить сейчас», 6 в отчёт, 1 снято (AGENTS.md синхронизирован коммитом 6ec3fb3); push уже был выполнен, сайт проверен живым URL"
    }
  ],
  "requirements": {
    "total": 9,
    "done": 9,
    "inTicket": 0,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Расширение входа недели 2026-08-30 (источники + покрытие)",
      "requirements": [
        "R03",
        "R03.1",
        "R03.2",
        "R03i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/input/2026-08-30.json"
      ],
      "status": "done",
      "startedAt": "2026-09-26T08:55:00+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "finishedAt": "2026-09-26T11:15:00+03:00",
      "tests": {
        "passed": 250,
        "failed": 0
      },
      "commit": "5b0b56f"
    },
    {
      "id": "02",
      "title": "Расширение входа недели 2026-09-06 (источники + покрытие)",
      "requirements": [
        "R03",
        "R03.1",
        "R03.2",
        "R03i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/input/2026-09-06.json"
      ],
      "status": "done",
      "repairFindings": [
        "D8.3 inline-URL с искажённым percent-encoding (строка 296) — не curl-проверен; должен быть побайтово равен top-level записи (строка 580)"
      ],
      "startedAt": "2026-09-26T08:55:00+03:00",
      "retries": 0,
      "repairs": 1,
      "handoffs": 0,
      "finishedAt": "2026-09-26T11:15:00+03:00",
      "tests": {
        "passed": 250,
        "failed": 0
      },
      "commit": "0a9d518"
    },
    {
      "id": "03",
      "title": "Расширение входа недели 2026-09-13 (источники + покрытие)",
      "requirements": [
        "R03",
        "R03.1",
        "R03.2",
        "R03i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/input/2026-09-13.json"
      ],
      "status": "done",
      "startedAt": "2026-09-26T08:55:00+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "finishedAt": "2026-09-26T11:15:00+03:00",
      "tests": {
        "passed": 250,
        "failed": 0
      },
      "commit": "2709587"
    },
    {
      "id": "04",
      "title": "Полный список критериев в разделе «Методология» сайта",
      "requirements": [
        "R05",
        "R05.1"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "js/"
      ],
      "status": "done",
      "startedAt": "2026-09-26T09:20:00+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "finishedAt": "2026-09-26T11:15:00+03:00",
      "tests": {
        "passed": 250,
        "failed": 0
      },
      "commit": "c70b0e3"
    },
    {
      "id": "05",
      "title": "Соглашение о дате покрытия: through = конец окна включительно",
      "requirements": [
        "R02",
        "R02.1",
        "R02.2"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/",
        "METHODOLOGY.md"
      ],
      "status": "done",
      "startedAt": "2026-09-26T09:20:00+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "finishedAt": "2026-09-26T11:15:00+03:00",
      "tests": {
        "passed": 250,
        "failed": 0
      },
      "commit": "2d9d6f8"
    },
    {
      "id": "06",
      "title": "Предпродакшен-документ: только нерешённые вопросы",
      "requirements": [
        "R04"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "docs/preproduction-decisions.md"
      ],
      "status": "done",
      "startedAt": "2026-09-26T09:20:00+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "finishedAt": "2026-09-26T11:15:00+03:00",
      "tests": {
        "passed": 250,
        "failed": 0
      },
      "commit": "bc739c4"
    },
    {
      "id": "07",
      "title": "Редакционные сиды недель (drivers.js и регионы)",
      "requirements": [
        "R03",
        "R06"
      ],
      "blockedBy": [
        "01",
        "02",
        "03"
      ],
      "wave": 2,
      "zone": [
        "data/2026-08-30/",
        "data/2026-09-06/",
        "data/2026-09-13/"
      ],
      "status": "done",
      "startedAt": "2026-09-26T09:35:00+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "finishedAt": "2026-09-26T11:15:00+03:00",
      "tests": {
        "passed": 250,
        "failed": 0
      },
      "commit": "96616da"
    },
    {
      "id": "08",
      "title": "Пересчёт цепочки и подготовка к публикации",
      "requirements": [
        "R01",
        "R01i",
        "R03i",
        "R06",
        "R06.1",
        "R06i"
      ],
      "blockedBy": [
        "04",
        "05",
        "07"
      ],
      "wave": 3,
      "zone": [
        "data/ (числовые)",
        "js/bundle*.js"
      ],
      "status": "done",
      "startedAt": "2026-09-26T09:35:00+03:00",
      "retries": 0,
      "repairs": 1,
      "repairsNote": "фикстура tests/data.test.js устарела (insufficient → published) — актуализирована субагентом, 250/0",
      "handoffs": 0,
      "finishedAt": "2026-09-26T18:30:00+03:00",
      "tests": {
        "passed": 250,
        "failed": 0
      },
      "commit": "5d7d335"
    }
  ],
  "singlePass": null,
  "tests": {
    "passed": 250,
    "failed": 0
  },
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "gate": "G2",
    "findings": 9,
    "missing": 0,
    "halfCovered": 2,
    "notInBrief": 7,
    "resolved": "половинные: объём «3 месяца» (недели 02.08–23.08 непересчитываемы, нет входов — ASSUMPTION A-R06 в manifest) и архив vs удаление решённых вопросов (A-R04) — оба осознанно закрыты допущениями; «не из брифа» — все R##.n-углубления и подразумеваемые (окно на цепочку, синк §2 методологии под R02, версия документа, a11y по конвенции AGENTS.md, паритет-тест, insufficient-классификация) — легальны; отсутствующих нет"
  },
  "concerns": [
    "01 data · calc/input/2026-08-30.json: reuters-запись промаркирована source_type OSINT при кластере A-mainstream (противоречит типу кластера); 4 легаси-URL (reuters/apnews/dw/crisisgroup) не верифицируемы из среды — пошли в публикацию как blocked [отчёт]",
    "02 data · D8.1=1 (режим тишины) опирается на один кластер/сторону — editorial, к ремонту не отправлено; сообщение коммита 713e83d промаркировано «t-05» вместо 02 — переименование за оркестратором (не критично, в отчёт) [отчёт]",
    "03 data · understandingwar-запись: publication_date 2026-09-13 при заголовке «September 12» — внутреннее противоречие; D9.6a переиспользует источник 06.09 (граница окон, двойной учёт события в смежных неделях); заявленный «превью 46» фактически 41 (материалы прогона исправлены) [отчёт]",
    "04 craft · js/sections/methodology.js: legacy render() секции на innerHTML, новый блок на el() — раскол конвенций в одной функции (структурное, кандидат в отдельный таск); счётчик позиций группы голым числом без подписи «критериев» для скринридера [отчёт]",
    "06 craft · приложение docs/preproduction-decisions.md покрывает подмножество архива (нет 4.1–4.3, 5.1–5.7, 5.9–5.10) — либо дополнить, либо пометить выборочным; ссылка 5.8→METHODOLOGY §5.1 есть только в приложении, в архиве не подтверждена [отчёт]",
    "05 process · AGENTS.md в двух местах описывает through как неизменное защищённое поле — устарело после таска 05; синхронизировать на этапе финальной памяти [снято: синхронизирован коммитом 6ec3fb3]",
    "process · вторая Autopilot-сессия параллельно коммитит в репозиторий (favicon ff2bf08, CNAME f0c1c8e, обновление AGENTS.md) — зоны не пересекались; пуш в конце прогона заберёт и её коммиты; исполнителям таска 08 — не коммитить (усиленное правило AGENTS.md) [историческое, снято: пуш выполнен, зоны не пересеклись]"
  ],
  "reviewers": {
    "manifestSpec": "agent-19",
    "craft": "agent-20"
  },
  "blind": {
    "agent": "agent-21",
    "verdict": "тесты 250/0, данные/методология/открытые-вопросы соответствуют брифу; 3 расхождения с манифестом",
    "drift": [
      "R01 «Опубликуй последние изменения»: манифест in-ticket (push за оркестратором) — слепой зафиксировал «нет» на момент проверки (remote на 1 коммит отставал, живой сайт старый). Ожидаемо: push исполняется этим же этапом посадки; закрывается проверкой живого URL",
      "R02 окно 13–20.09: манифест done — слепой «частично»: во входе calc/input/2026-09-20.json 17 из 74 источников с publication_date вне окна, включая 2 шт. датированы 2026-09-21 (после конца окна; подтверждено grep'ом). Предсуществующие редакционные данные входа, этим прогоном не менялись; требует редакционного решения — в отчёт, не блокер",
      "R06 «3 месяца»: манифест done по цепочке — слепой «частично» (пересчитано 4 недели, 08-02…08-23 непересчитываемы, входов раньше 08-30 нет). Ожидаемый дрейф: закрыто допущением A-R06, зафиксировано в ADR 0015"
    ]
  }
}