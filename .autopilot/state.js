window.STATE =
{
  "version": 2,
  "slug": "precursor-and-scale",
  "dir": "2026-10-18-precursor-and-scale--wip",
  "title": "Предвестники Д9 и честная интерпретация шкалы",
  "mode": "semi",
  "depth": "normal",
  "tier": "T2",
  "briefFile": "2026-10-18-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": null,
  "startedAt": "2026-10-18T20:01:41+03:00",
  "updatedAt": "2026-10-18T20:01:59+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-18T20:01:41+03:00",
      "finishedAt": "2026-10-18T20:01:48+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-18T20:01:48+03:00",
      "finishedAt": "2026-10-18T20:01:49+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-10-18T20:01:49+03:00",
      "finishedAt": "2026-10-18T20:01:49+03:00",
      "note": "брифинг проведён до перехвата state; два вопроса закрыты (R04 — слово порядковая)"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-18T20:01:49+03:00",
      "finishedAt": "2026-10-18T20:01:57+03:00"
    },
    {
      "id": "plan",
      "status": "active",
      "startedAt": "2026-10-18T20:01:57+03:00"
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
    "total": 22,
    "done": 0,
    "inTicket": 20,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 1,
    "dropped": 1
  },
  "tickets": [
    {
      "id": "01",
      "title": "",
      "requirements": [
        "R01",
        "R02",
        "R03",
        "R05",
        "R06",
        "R14",
        "R16",
        "R17",
        "R18"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "docs/calibration-journal.md",
        "METHODOLOGY.md",
        "docs/adr/0047-*.md"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "02",
      "title": "",
      "requirements": [
        "R07",
        "R12",
        "R13",
        "R15",
        "R19",
        "R20i"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "calc/precursor.js",
        "calc/forward-anchors.js",
        "calc/calc.js",
        "calc/calibrate.js",
        "js/data.js",
        "tests/precursor.test.js",
        "tests/forward-anchors.test.js",
        "tests/data.test.js",
        "tests/calibrate.test.js"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "03",
      "title": "Блок «Косвенные предвестники» на сайте",
      "requirements": [
        "R04",
        "R09",
        "R10",
        "R11",
        "R21i"
      ],
      "blockedBy": [
        "02"
      ],
      "wave": 3,
      "zone": [
        "js/sections/precursor.js",
        "js/render.js",
        "js/i18n.js",
        "index.html",
        "css/styles.css",
        "js/bundle.js",
        "js/bundle-privacy.js",
        "tests/precursor-ui.test.js",
        "tests/trust.test.js"
      ],
      "review": "да — публичная поверхность",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    }
  ],
  "tests": null,
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "found": 5,
    "fixed": 5,
    "deferred": 0,
    "items": [
      "R03.1 — четыре посылки добавлены в ответ",
      "R13.1 — граница первой записи",
      "R15.3 — проверка порядка git log",
      "R16.1 — таблица журнала",
      "четыре таска зафиксированы"
    ]
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-10-18T20:01:41+03:00",
    "2026-10-18T20:01:48+03:00",
    "2026-10-18T20:01:49+03:00",
    "2026-10-18T20:01:50+03:00",
    "2026-10-18T20:01:57+03:00",
    "2026-10-18T20:01:58+03:00",
    "2026-10-18T20:01:59+03:00"
  ],
  "rev": 11,
  "waiting": null,
  "waits": [],
  "log": [
    {
      "t": "2026-10-18T20:01:41+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-18T20:01:48+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-18T20:01:49+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "skip",
      "note": "брифинг проведён до перехвата state; два вопроса закрыты (R04 — слово порядковая)"
    },
    {
      "t": "2026-10-18T20:01:49+03:00",
      "k": "gate",
      "g": "G1",
      "ok": true,
      "open": 0,
      "total": 22
    },
    {
      "t": "2026-10-18T20:01:49+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-10-18T20:01:50+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 5,
      "fixed": 5,
      "deferred": 0
    },
    {
      "t": "2026-10-18T20:01:57+03:00",
      "k": "stage",
      "id": "plan",
      "act": "start"
    },
    {
      "t": "2026-10-18T20:01:57+03:00",
      "k": "tier",
      "v": "T2"
    },
    {
      "t": "2026-10-18T20:01:58+03:00",
      "k": "tickets",
      "n": 3
    },
    {
      "t": "2026-10-18T20:01:59+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«в docs/calibration-journal.md добавить раздел «интервальность»: фактические якорные индексы по сегментам шкалы, монотонность, линейность отклика»",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«Если отклик нелинеен — либо зафиксировать, либо ввести нелинейную нормировку»",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«прямой ответ на «чем измерена шкала»»",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«3–4 предложения в секции «Методология» (через js/i18n.js + node build.js)»",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«METHODOLOGY §1.1: та же оговорка сноской»",
      "status": "in-ticket"
    },
    {
      "id": "R06",
      "text": "«Явно перечисляем, чего раздел не доказывает»",
      "status": "in-ticket"
    },
    {
      "id": "R07",
      "text": "«реализовать как отдельный показатель рядом с главным индексом»",
      "status": "in-ticket"
    },
    {
      "id": "R08",
      "text": "«например, «доля критериев в фазе предвестника» … можно считать из уже собираемого входа events[]»",
      "status": "dropped",
      "why": "фаз в данных нет; пользователь: «Ok» (принята рекомендация: фазы не вводить, слой = s9)"
    },
    {
      "id": "R09",
      "text": "«закрывает расхождение «документация ↔ интерфейс», даёт leading-индикатор»",
      "status": "in-ticket"
    },
    {
      "id": "R10",
      "text": "«блок «Косвенные предвестники (Д9)» между hero и витриной доверия; скрыт, если неделя не published или D9 = null; при nSub = 0 — 0 % с пометкой «сигналов нет»»",
      "status": "in-ticket"
    },
    {
      "id": "R11",
      "text": "«round(s9·100) %, подпись «доля сигналов Д9, не сравнимо с индексом», «N сигналящих подгрупп из 8», дисклеймер §4.3.6»",
      "status": "in-ticket"
    },
    {
      "id": "R12",
      "text": "«опциональное поле precursor в снапшоте, валидация формы в js/data.js»",
      "status": "in-ticket"
    },
    {
      "id": "R13",
      "text": "«forward-only с 10-25, историю 08-30…10-18 не трогаем»",
      "status": "in-ticket"
    },
    {
      "id": "R14",
      "text": "«ADR … «Precursor Risk: литеральный слой Д9, не сравнимо с индексом, forward-only»; версия методологии остаётся 3.0»",
      "status": "in-ticket"
    },
    {
      "id": "R15",
      "text": "«calc/input/anchors/forward-<week>.json: {week, expectedCluster, rationale, author, committedAt, sources[]}, коммит до --write; допустимо unknown с причиной»",
      "status": "in-ticket"
    },
    {
      "id": "R16",
      "text": "«Несовпадения копятся в журнале, параметры не трогаются до 8 точек»",
      "status": "in-ticket"
    },
    {
      "id": "R17",
      "text": "«В журнале калибровки прямым текстом: независимых человеческих якорей нет; 3 verify-якоря — проверка порядка, не валидация реальности»",
      "status": "in-ticket"
    },
    {
      "id": "R18",
      "text": "«Внешних рейтеров сейчас не рекрутируем»",
      "status": "in-ticket"
    },
    {
      "id": "R19",
      "text": "«дозаполнение precursor за 8 недель» — не делаем",
      "status": "in-ticket"
    },
    {
      "id": "R20i",
      "text": "Числа опубликованных недель не меняются: индекс и дельта остаются как есть",
      "status": "in-ticket"
    },
    {
      "id": "R21i",
      "text": "Ворота прогона: node --test и node build.js зелёные; бандлы коммитятся",
      "status": "in-ticket"
    },
    {
      "id": "R22i",
      "text": "Черновик публичного ответа комментатору — в чат, не в репозиторий",
      "status": "deferred",
      "why": "вне кодовой сборки: черновик делает оркестратор после приёмки"
    }
  ],
  "gates": {
    "G1": {
      "ok": true,
      "at": "2026-10-18T20:01:49+03:00",
      "open": 0,
      "total": 22
    },
    "G2": {
      "ok": true,
      "at": "2026-10-18T20:01:50+03:00",
      "found": 5,
      "fixed": 5,
      "deferred": 0
    },
    "G3": {
      "ok": true,
      "at": "2026-10-18T20:01:59+03:00",
      "problems": 0
    }
  },
  "result": null
}
