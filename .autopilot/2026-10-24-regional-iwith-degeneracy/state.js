window.STATE =
{
  "version": 2,
  "slug": "regional-iwith-degeneracy",
  "dir": "2026-10-24-regional-iwith-degeneracy",
  "title": "Региональные гипотетики §7: порог покрытия (вариант E)",
  "mode": "full",
  "depth": "normal",
  "tier": "T1",
  "briefFile": "2026-10-24-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "baseCommit": "d2cc89a",
  "startedAt": "2026-10-24T12:10:43+03:00",
  "updatedAt": "2026-10-24T12:35:55+03:00",
  "finishedAt": "2026-10-24T12:35:55+03:00",
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-24T12:10:43+03:00",
      "finishedAt": "2026-10-24T12:11:12+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-24T12:11:12+03:00",
      "finishedAt": "2026-10-24T12:25:30+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-10-24T12:12:11+03:00",
      "finishedAt": "2026-10-24T12:12:11+03:00",
      "note": "полный автомат — самобрифинг, открытые места закрыты ASSUMPTION в манифесте"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-24T12:25:30+03:00",
      "finishedAt": "2026-10-24T12:25:30+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-10-24T12:25:30+03:00",
      "finishedAt": "2026-10-24T12:25:30+03:00"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-10-24T12:25:36+03:00",
      "finishedAt": "2026-10-24T12:25:36+03:00"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-10-24T12:25:30+03:00",
      "finishedAt": "2026-10-24T12:35:55+03:00"
    },
    {
      "id": "final",
      "status": "done",
      "finishedAt": "2026-10-24T12:35:55+03:00",
      "startedAt": "2026-10-24T12:35:55+03:00"
    }
  ],
  "requirements": {
    "total": 15,
    "done": 14,
    "inTicket": 0,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 1,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Порог покрытия в региональных гипотетиках §7 (вариант E)",
      "requirements": [
        "R01",
        "R01.1",
        "R02",
        "R03",
        "R03.1",
        "R03.2",
        "R04",
        "R05",
        "R06",
        "R07",
        "R08",
        "R09",
        "R10",
        "R11",
        "R12",
        "R13",
        "R14",
        "R15i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/engine.js",
        "calc/params.js",
        "calc/week-step.js",
        "tests/regional-signals.test.js",
        "tests/regional-hypothesis.test.js",
        "docs/adr/0065-regional-hypothesis-coverage.md",
        "docs/preproduction-decisions.md",
        "docs/regional-iwith-degeneracy.md"
      ],
      "review": "да — фундамент",
      "model": "сильная",
      "status": "done",
      "startedAt": "2026-10-24T12:18:02+03:00",
      "finishedAt": "2026-10-24T12:25:25+03:00",
      "retries": 0,
      "repairs": 0,
      "tests": {
        "passed": 808,
        "failed": 0
      },
      "commit": "bc35393"
    },
    {
      "id": "F1",
      "title": "Ремонт ветки: пины гейта и точность ссылок",
      "requirements": [
        "R02",
        "R03",
        "R03.1",
        "R04",
        "R14"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "calc/params.js",
        "tests/regional-hypothesis.test.js",
        "docs/regional-iwith-degeneracy.md"
      ],
      "review": "да — ремонт ветки",
      "model": "сильная",
      "status": "done",
      "retries": 0,
      "repairs": 0,
      "startedAt": "2026-10-24T12:29:41+03:00",
      "finishedAt": "2026-10-24T12:33:23+03:00",
      "tests": {
        "passed": 809,
        "failed": 0
      },
      "commit": "0921db8"
    }
  ],
  "tests": {
    "passed": 809,
    "failed": 0
  },
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "found": 13,
    "fixed": 12,
    "deferred": 1,
    "items": [
      "R13 — пересчёт истории 08-30…10-18: вопрос задан пользователю (ask action); без ответа действует forward-only, данные не переписываются"
    ]
  },
  "concerns": [
    "calc/params.js:60 — комментарий обрывается на «…independenceGateFrom); breaking» — дописать фразу или убрать слово",
    "tests/regional-hypothesis.test.js:45 — лишнее утверждение сравнивает значение, которое тест сам задал через list(); проверять только подменённый coverageThreshold",
    "docs/preproduction-decisions.md:65 — ссылка на коммит без хеша; подставить после коммита",
    "tests/regional-hypothesis.test.js:60 — название теста всё ещё говорит «эпсилон», хотя порог подменён на 0.42; переименовать в «порог берётся из params»"
  ],
  "blind": {
    "checked": 17,
    "matched": 13,
    "mismatches": [
      "§8.1 — перегонка 10-18: iWith russia-belarus/ukraine-moldova = 0, опубликованные 56/58; 77/60 получаются только с неделей ≥ 10-25 — критерий не выполнен без пересчёта",
      "§7.2 — рекомендованный пересчёт 08-30…10-18 не выполнен: выбран forward-only, пересчёт отложен до слова владельца (O11)",
      "§5.E — «только две гипотетики, больше ничего»: добавлены гейт по дате и четвёртый аргумент week, из-за чего правило на 10-18 не действует",
      "§5 — статус-кво отклонён: на опубликованной истории он фактически сохранён (10-18 = 56/58)"
    ]
  },
  "beats": [
    "2026-10-24T12:10:43+03:00",
    "2026-10-24T12:11:12+03:00",
    "2026-10-24T12:12:11+03:00",
    "2026-10-24T12:16:54+03:00",
    "2026-10-24T12:17:38+03:00",
    "2026-10-24T12:17:39+03:00",
    "2026-10-24T12:17:48+03:00",
    "2026-10-24T12:18:02+03:00",
    "2026-10-24T12:21:46+03:00",
    "2026-10-24T12:25:24+03:00",
    "2026-10-24T12:25:25+03:00",
    "2026-10-24T12:25:30+03:00",
    "2026-10-24T12:25:36+03:00",
    "2026-10-24T12:29:33+03:00",
    "2026-10-24T12:29:34+03:00",
    "2026-10-24T12:29:41+03:00",
    "2026-10-24T12:32:25+03:00",
    "2026-10-24T12:33:22+03:00",
    "2026-10-24T12:33:23+03:00",
    "2026-10-24T12:35:05+03:00",
    "2026-10-24T12:35:55+03:00"
  ],
  "rev": 26,
  "waiting": null,
  "waits": [],
  "log": [
    {
      "t": "2026-10-24T12:10:43+03:00",
      "k": "init"
    },
    {
      "t": "2026-10-24T12:11:12+03:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-10-24T12:12:11+03:00",
      "k": "stage",
      "id": "briefing",
      "act": "skip",
      "note": "полный автомат — самобрифинг, открытые места закрыты ASSUMPTION в манифесте"
    },
    {
      "t": "2026-10-24T12:16:54+03:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 13,
      "fixed": 12,
      "deferred": 1
    },
    {
      "t": "2026-10-24T12:17:38+03:00",
      "k": "tier",
      "v": "T1"
    },
    {
      "t": "2026-10-24T12:17:38+03:00",
      "k": "tickets",
      "n": 1
    },
    {
      "t": "2026-10-24T12:17:39+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-10-24T12:18:02+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-24T12:21:46+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "review"
    },
    {
      "t": "2026-10-24T12:25:24+03:00",
      "k": "add",
      "key": "concerns",
      "n": 3
    },
    {
      "t": "2026-10-24T12:25:25+03:00",
      "k": "ticket",
      "ids": [
        "01"
      ],
      "act": "done",
      "tests": {
        "passed": 808,
        "failed": 0
      }
    },
    {
      "t": "2026-10-24T12:25:30+03:00",
      "k": "stage",
      "id": "review",
      "act": "start"
    },
    {
      "t": "2026-10-24T12:25:36+03:00",
      "k": "stage",
      "id": "build",
      "act": "done"
    },
    {
      "t": "2026-10-24T12:29:33+03:00",
      "k": "tickets",
      "n": 2
    },
    {
      "t": "2026-10-24T12:29:33+03:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    },
    {
      "t": "2026-10-24T12:29:34+03:00",
      "k": "add",
      "key": "report",
      "n": 2
    },
    {
      "t": "2026-10-24T12:29:41+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "start"
    },
    {
      "t": "2026-10-24T12:32:25+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "review"
    },
    {
      "t": "2026-10-24T12:33:22+03:00",
      "k": "add",
      "key": "concerns",
      "n": 1
    },
    {
      "t": "2026-10-24T12:33:23+03:00",
      "k": "ticket",
      "ids": [
        "F1"
      ],
      "act": "done",
      "tests": {
        "passed": 809,
        "failed": 0
      }
    },
    {
      "t": "2026-10-24T12:35:05+03:00",
      "k": "gate",
      "g": "G4",
      "ok": false,
      "checked": 17,
      "matched": 13
    },
    {
      "t": "2026-10-24T12:35:55+03:00",
      "k": "tests",
      "passed": 809,
      "failed": 0
    },
    {
      "t": "2026-10-24T12:35:55+03:00",
      "k": "finish",
      "result": "Региональные гипотетики §7 считают драйвер при ≥1 покрытом критерии (эпсилон), forward-only с 2026-10-25; ADR 0065, O10 закрыта; пересчёт истории — за владельцем (O11)"
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«В двух вызовах hypotheticalIndex порог заменяется на эпсилон»",
      "status": "done"
    },
    {
      "id": "R02",
      "text": "«PARAMS.regionHypothesisThreshold = 1e-9 (единственный источник числа, комментарий…)»",
      "status": "done"
    },
    {
      "id": "R03",
      "text": "«Обе ноги Δ (with и without) получают одинаковое правило — сопоставимость сохраняется»",
      "status": "done"
    },
    {
      "id": "R04",
      "text": "«Глобальный индекс всех недель цепочки, q, states, публикация, sensitivity, debt — не меняются»",
      "status": "done"
    },
    {
      "id": "R05",
      "text": "«D9 порог не задет; глобальная агрегация §5, q, k — не трогаются вообще»",
      "status": "done"
    },
    {
      "id": "R06",
      "text": "«Перегонка 10-18: iWith russia-belarus и ukraine-moldova > 0 (прототип: 77 и 60, ±1)»",
      "status": "done"
    },
    {
      "id": "R07",
      "text": "«tests/regional-signals.test.js:94 — пин eu.iWithout === 0 в E станет ≈ 37.7 … обновить пин и комментарий»",
      "status": "done"
    },
    {
      "id": "R08",
      "text": "«tests/regional-signals.test.js:100 — пин af.iWith === 0 останется»",
      "status": "done"
    },
    {
      "id": "R09",
      "text": "«central-asia остаётся с iWith=0 — это легальный деэскалационный результат, а не вырождение; комментарий в ADR»",
      "status": "done"
    },
    {
      "id": "R10",
      "text": "«node --test зелёный»",
      "status": "done"
    },
    {
      "id": "R11",
      "text": "«Глобальный индекс каждой недели цепочки неизменен (51/42/43/56/47/46/56/64)»",
      "status": "done"
    },
    {
      "id": "R12",
      "text": "«Принять вариант E (или другой — документ фиксирует исследование, не приказ)»",
      "status": "done"
    },
    {
      "id": "R13",
      "text": "«Версия и охват — выбор между: forward-only с даты …; региональным пересчётом цепочки 3.0 …»",
      "status": "deferred",
      "why": "ASSUMPTION — принят forward-only с гейтом regionHypothesisFrom = '2026-10-25'; перезапись уже опубликованных значений — действие над опубликованными данными, в полном автомате не делается; пересчёт истории отложен до слова владельца — откр…"
    },
    {
      "id": "R14",
      "text": "«ADR 0065 — предложение: «Региональные гипотетики §7: порог покрытия» — зафиксировать эпсилон, свойства E (§5), итоговый выбор версии»",
      "status": "done"
    },
    {
      "id": "R15i",
      "text": "(подразумевается) документ задачи после решения перестаёт быть «задачей к решению» и не противоречит закрытой O10",
      "status": "done"
    }
  ],
  "gates": {
    "G2": {
      "ok": true,
      "at": "2026-10-24T12:16:54+03:00",
      "found": 13,
      "fixed": 12,
      "deferred": 1
    },
    "G3": {
      "ok": true,
      "at": "2026-10-24T12:29:33+03:00",
      "problems": 0
    },
    "G4": {
      "ok": false,
      "at": "2026-10-24T12:35:05+03:00",
      "checked": 17,
      "matched": 13
    }
  },
  "result": "Региональные гипотетики §7 считают драйвер при ≥1 покрытом критерии (эпсилон), forward-only с 2026-10-25; ADR 0065, O10 закрыта; пересчёт истории — за владельцем (O11)",
  "report": [
    "docs/preproduction-decisions.md:65 и docs/regional-iwith-degeneracy.md:9 — ссылка «коммит autopilot-прогона 2026-10-24» без хеша; хеш нельзя вписать в тот же коммит, закрывается следующим или убирается слово «коммит»",
    "docs/preproduction-decisions.md:61–65 — O10 в базовой версии файла не существовало (§1 содержал O1–O9), поэтому формулировка «перенесена из §1» описывает несуществующую историю; запись корректна по смыслу, но её стоит читать как новую от 2026-10-24"
  ]
}
