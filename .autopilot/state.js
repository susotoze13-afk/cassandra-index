window.STATE =
{
  "version": 2,
  "slug": "regional-deviation",
  "dir": "2026-11-04-regional-deviation--wip",
  "title": "Региональное отклонение по драйверам, дробная точность слоя, методология 4.0",
  "mode": "full",
  "depth": "normal",
  "tier": null,
  "briefFile": "2026-11-04-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": null,
  "startedAt": "2026-11-04T09:05:29+03:00",
  "updatedAt": "2026-11-04T11:37:33+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-11-04T09:05:29+03:00",
      "finishedAt": "2026-11-04T09:30:03+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-11-04T09:30:03+03:00",
      "finishedAt": "2026-11-04T09:33:20+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-11-04T09:33:20+03:00",
      "finishedAt": "2026-11-04T09:41:16+03:00",
      "note": "полный автомат — самобрифинг: 23/23 закрыты, 2 допущения в debt.assumptions, эталон не задан"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-11-04T09:41:33+03:00",
      "finishedAt": "2026-11-04T11:21:11+03:00"
    },
    {
      "id": "plan",
      "status": "active",
      "startedAt": "2026-11-04T11:21:11+03:00"
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
    "total": 23,
    "done": 0,
    "inTicket": 23,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Формула §7 по драйверам, дробная точность слоя и пересчёт цепочки",
      "requirements": [
        "R01",
        "R02",
        "R03",
        "R05",
        "R07",
        "R08",
        "R09",
        "R10",
        "R11",
        "R15",
        "R16",
        "R16.4",
        "R16.5",
        "R19"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/engine.js",
        "calc/params.js",
        "calc/week-step.js",
        "calc/calc.js",
        "data/<недели>/",
        "tests/"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "02",
      "title": "Публичный слой: версия 2, дробная точность, производные и changelog",
      "requirements": [
        "R04",
        "R10",
        "R13",
        "R18",
        "R22i",
        "R16.3"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "calc/public-contract.js",
        "calc/public-export.js",
        "calc/changelog-entries.js",
        "data/public/**",
        "docs/api.md",
        "tests/public-*",
        "tests/changelog*",
        "tests/contribution-ui*"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "03",
      "title": "Сайт: сортировка регионов по индексу, маркер сигналов, дробный формат, тренд 4.0",
      "requirements": [
        "R14",
        "R15.1",
        "R17",
        "R10",
        "R13",
        "R16.1",
        "R21i"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "js/**",
        "js/bundle*.js",
        "tests/regions*",
        "tests/trend*",
        "tests/page-smoke*",
        "tests/country-ui*",
        "tests/precursor-ui*"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    },
    {
      "id": "04",
      "title": "Документация 4.0 и сведение ветки",
      "requirements": [
        "R06",
        "R06.1",
        "R12",
        "R20",
        "R21i",
        "R23i"
      ],
      "blockedBy": [
        "02",
        "03"
      ],
      "wave": 3,
      "zone": [
        "METHODOLOGY.md",
        "docs/adr/0069-regional-deviation-by-driver.md",
        "AGENTS.md",
        "docs/architecture.md",
        "docs/calibration-journal.md"
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
      "R19: «13 недель» в Q9/ADR 0069 — счётная ошибка; цепочка 08-30...11-01 = 10 недель (RECALC_WEEKS), пин глобальных чисел — на все 10, демо-недели 1.0 не трогаются; ADR исправляется на 10 как фактологическая правка",
      "R13: отклонение Δ_region не публикуется ни в UI, ни в data/public/** — интерпретация ADR 0069 §3 (публичный слой меняется только точностью и версией) вместе с ответом Q2"
    ],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "found": 2,
    "fixed": 2,
    "deferred": 0,
    "items": []
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-11-04T09:05:29+03:00",
    "2026-11-04T09:30:03+03:00",
    "2026-11-04T09:33:13+03:00",
    "2026-11-04T09:33:20+03:00",
    "2026-11-04T09:41:03+03:00",
    "2026-11-04T09:41:16+03:00",
    "2026-11-04T09:41:33+03:00",
    "2026-11-04T11:20:53+03:00",
    "2026-11-04T11:21:11+03:00",
    "2026-11-04T11:37:33+03:00"
  ],
  "rev": 14,
  "waiting": null,
  "waits": [],
  "log": [
    {
      "t": "2026-11-04T09:05:29+03:00",
      "k": "init"
    },
    {
      "t": "2026-11-04T09:30:03+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-11-04T09:33:20+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "start"
    },
    {
      "t": "2026-11-04T09:41:03+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 1
    },
    {
      "t": "2026-11-04T09:41:03+03:00",
      "k": "add",
      "key": "debt.assumptions",
      "n": 1
    },
    {
      "t": "2026-11-04T09:41:16+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "skip",
      "note": "полный автомат — самобрифинг: 23/23 закрыты, 2 допущения в debt.assumptions, эталон не задан"
    },
    {
      "t": "2026-11-04T09:41:33+03:00",
      "k": "gate",
      "g": "G1",
      "ok": true,
      "open": 0,
      "total": 23
    },
    {
      "t": "2026-11-04T09:41:33+03:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-11-04T11:20:53+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 2,
      "fixed": 2,
      "deferred": 0
    },
    {
      "t": "2026-11-04T11:21:11+03:00",
      "k": "stage",
      "id": "plan",
      "act": "start"
    },
    {
      "t": "2026-11-04T11:37:33+03:00",
      "k": "tickets",
      "n": 4
    },
    {
      "t": "2026-11-04T11:37:33+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«regional Cassandra Index values are suspiciously identical (9 of 12 regions = 73 on week 2026-11-01)» — investigate and fix",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«Q5 a» — мера отклонения по драйверам (вариант a: Δ_region = Σ_d w_d·(s_d^region − s_d^global))",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«Q6 b» — убрать объёмное сжатие m = n/(n+n0), PARAMS.n0 удалить; e_r оставить",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«Q7 b» — дробь в снапшоте и в публичном API; схемы integer → number; PUBLIC_SCHEMA_VERSION 1 → 2",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«Q8 Да» — delta региона и страны тоже с одной десятичной; глобальный — целый",
      "status": "in-ticket"
    },
    {
      "id": "R06",
      "text": "«Q9 Да» — ADR 0069 + правка §7 + PUBLIC_SCHEMA_VERSION = 2 + критерий приёмки (4 пункта)",
      "status": "in-ticket"
    },
    {
      "id": "R07",
      "text": "«Q11 Да» — эпсилон-порог ADR 0065 на обеих ногах (регион и глобал)",
      "status": "in-ticket"
    },
    {
      "id": "R08",
      "text": "«Q10 Да» — знаменатель отклонения — константа (сумма весов всех допустимых драйверов), отсутствующий драйвер входит нулём",
      "status": "in-ticket"
    },
    {
      "id": "R09",
      "text": "«Q12 a» — принять честный разброс; бар разброса ≥ 1.5 п.п.; равные индексы допустимы при равных вкладах",
      "status": "in-ticket"
    },
    {
      "id": "R10",
      "text": "«Q13 да» — поле signals: n у региона, пометка в UI при signals < 2; редакционное confidence не трогаем",
      "status": "in-ticket"
    },
    {
      "id": "R11",
      "text": "«Q14 Оставить и запинить: это единственная защита от «регион отстал от резкого глобального скачка»…» — ветка зеркалирования шока (kappa, regionShockDelta) остаётся + пин «на реальной истории не срабатывает»",
      "status": "in-ticket"
    },
    {
      "id": "R12",
      "text": "«Q15 Да» — порядок: ADR 0069 → код → пересчёт 08-30…11-01 → публичный слой → сайт → тесты; коммит и пуш только оркестратор",
      "status": "in-ticket"
    },
    {
      "id": "R13",
      "text": "«Q2 Нет, отклонение от глобального не показываем»",
      "status": "in-ticket"
    },
    {
      "id": "R14",
      "text": "«Q2 … сортировать надо регионы по числу индекса региона от большого к меньшему»",
      "status": "in-ticket"
    },
    {
      "id": "R15",
      "text": "«Q2 … В индекс можно добавить 1 знак после запятой» (регионы и страны; глобальный — целый)",
      "status": "in-ticket"
    },
    {
      "id": "R16",
      "text": "«Q3 Б: поднять методологию до 4.0 и пересчитать цепочку 08-30…11-01 — региональный слой заявлен как несущий смысл, оставлять его с известным дефектом в опубликованных неделях значит публиковать известную кривизну.»",
      "status": "in-ticket"
    },
    {
      "id": "R17",
      "text": "«Q16 a» — личный регион пиннится первой строкой, ниже — строгий порядок по индексу",
      "status": "in-ticket"
    },
    {
      "id": "R18",
      "text": "«Q17 (a) + запись в changelog: точность не выдумываем, а переход методологии — событие публичного слоя, оно должно быть видно, а не только в git.»",
      "status": "in-ticket"
    },
    {
      "id": "R19",
      "text": "«глобальные числа всех 13 недель не изменились» (пункт 4 критерия приёмки, Q9)",
      "status": "in-ticket"
    },
    {
      "id": "R20",
      "text": "«Загрузи навык autopilot … выполни его целиком, как оркестратор. … не спрашивай разрешения на каждом шаге» — прогнать autopilot в режиме full до посадки",
      "status": "in-ticket"
    },
    {
      "id": "R21i",
      "text": "(подразумевается) после правок js/ пересобрать бандл node build.js, node --test зелёный",
      "status": "in-ticket"
    },
    {
      "id": "R22i",
      "text": "(подразумевается) существующие слои не сломаны: инвариант ADR 0068 «регион ⊇ страна», страновой слой 2026-10-25/11-01, precursor, витрина доверия",
      "status": "in-ticket"
    },
    {
      "id": "R23i",
      "text": "(подразумевается) ADR 0069 после реализации перевести в статус «реализовано» с датой и перечнем файлов",
      "status": "in-ticket"
    }
  ],
  "gates": {
    "G1": {
      "ok": true,
      "at": "2026-11-04T09:41:33+03:00",
      "open": 0,
      "total": 23
    },
    "G2": {
      "ok": true,
      "at": "2026-11-04T11:20:53+03:00",
      "found": 2,
      "fixed": 2,
      "deferred": 0
    },
    "G3": {
      "ok": true,
      "at": "2026-11-04T11:37:33+03:00",
      "problems": 0
    }
  },
  "result": null
}
