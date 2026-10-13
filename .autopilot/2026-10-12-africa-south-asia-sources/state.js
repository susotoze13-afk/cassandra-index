window.STATE =
{
  "slug": "africa-south-asia-sources",
  "dir": "2026-10-12-africa-south-asia-sources",
  "title": "Источники для регионов africa и south-asia",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T1",
  "briefFile": "2026-10-12-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-12T21:33:10+03:00",
  "updatedAt": "2026-10-12T23:25:00+03:00",
  "finishedAt": "2026-10-12T23:25:00+03:00",
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-12T21:33:10+03:00",
      "finishedAt": "2026-10-12T21:35:30+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-12T21:35:30+03:00",
      "finishedAt": "2026-10-12T21:37:00+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-10-12T21:36:00+03:00",
      "finishedAt": "2026-10-12T21:36:00+03:00",
      "note": "полный автомат — самобрифинг, вопросов нет; 4 решения за пользователя"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-12T21:37:00+03:00",
      "finishedAt": "2026-10-12T21:42:00+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-10-12T21:42:00+03:00",
      "finishedAt": "2026-10-12T21:43:00+03:00"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-10-12T21:43:00+03:00",
      "finishedAt": "2026-10-12T23:00:00+03:00",
      "note": "2 из 2 тасков готовы (01 1b489ee, 02 8f057cf); 1 repair (окно источника), 0 handoffs"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-10-12T22:05:00+03:00",
      "finishedAt": "2026-10-12T23:00:00+03:00",
      "note": "оба таска прошли Manifest+Spec и Craft; блокирующее (источник вне окна) закрыто дозапросом и ре-ревью"
    },
    {
      "id": "final",
      "status": "done",
      "startedAt": "2026-10-12T23:00:00+03:00",
      "finishedAt": "2026-10-12T23:25:00+03:00",
      "note": "слепая приёмка по брифу: africa — реализовано (7/7), south-asia — частично (4/7, в 3 неделях честно слепой); память AGENTS.md обновлена; --wip снят"
    }
  ],
  "requirements": {
    "total": 4,
    "done": 4,
    "inTicket": 0,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Региональные источники africa и south-asia",
      "requirements": [
        "R01",
        "R02",
        "R01i",
        "R02.2"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "calc/input/2026-*.json",
        "proposals/"
      ],
      "status": "done",
      "startedAt": "2026-10-12T21:43:00+03:00",
      "reviewedAt": "2026-10-12T22:05:00+03:00",
      "finishedAt": "2026-10-12T22:20:00+03:00",
      "repairs": 1,
      "files": ["calc/input/2026-*.json", ".autopilot/2026-10-12-africa-south-asia-sources--wip/proposals/africa-south-asia-regions.md"],
      "tests": "359/0",
      "commit": "1b489ee",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "02",
      "title": "Пересчёт цепочки и фикстуры",
      "requirements": [
        "R02i",
        "R01i"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "data/",
        "tests/"
      ],
      "status": "done",
      "startedAt": "2026-10-12T22:21:00+03:00",
      "reviewedAt": "2026-10-12T22:40:00+03:00",
      "finishedAt": "2026-10-12T23:00:00+03:00",
      "files": ["data/**", "data/audit.jsonl", "tests/data.test.js"],
      "tests": "360/0",
      "commit": "8f057cf",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    }
  ],
  "singlePass": null,
  "tests": null,
  "debt": {
    "placeholders": [],
    "assumptions": [
      "в режиме полного автомата итоговый набор региональных источников атрибуции утверждён оркестратором, а не пользователем (пользователь делегировал решения режимом full)"
    ],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": "G2 независимый чек (бриф+спека, без манифеста): MISSING 2 — (1) «список источников» не расшифрован → уточнено в §Задача (это R55-записи входов; data/sources.js производная; сиды не трогаются), (2) «Продолжи» → уточнено, что это продолжение сданного прогона regional-index-sources. HALF-COVERED 1 — критерий «найдено достаточно» размыт → ужесточён (покрыть каждую неделю с событиями; минимум ≥1 неделя на регион). EXTRA 3 — правило независимости ≥2 источника, blocked/broken и структурные разделы: элаборация R01/R02 (R##.n), не A##; не удаляются.",
  "concerns": [
    "Таск 02 (ревью Craft, неблокирующее): новый пин в tests/data.test.js покрывает background только africa и south-asia; неизменность background остальных 4 регионов (europe/east-asia/middle-east/north-america) не проверяется. Условие: пин должен утверждать их прежние значения.",
    "Таск 02 (ревью Spec, минор): критерий тикета «дельта ≠ глобальной» пере-специфицирован относительно движка (дельта региона = дельта глобальная при стабильном региональном офсете) — править текст критерия, не код; добавленный тест верно пинит index ≠ global.index."
  ],
  "reviewers": {
    "manifestSpec": "ses_ece82bdd0ffebXEbjudNZzvs7c",
    "craft": "ses_ece82bdcfffetgawMA4zzyCWfd"
  },
  "blind": {
    "by": "независимый субагент: только бриф, без spec/manifest/tickets; запускал проект (node --test, calc.js 2026-10-11, site через headless Chrome file://)",
    "commands": [
      "node --test → 360 passed / 0 fail",
      "node calc/calc.js 2026-10-11 → index 56, africa 53 (Δ+9, с сигналами), south-asia 54 (Δ+10, фон)",
      "chrome --headless file://index.html → south-asia несёт пометку region-background в 09-13/09-20/10-11; africa — без пометки",
      "node build.js → бандлы актуальны (git status js/ пуст)"
    ],
    "verdicts": [
      { "req": "«Обязательно расширь список источников на регионы africa и south-asia»", "manifest": "done", "blind": "реализовано", "meaning": "+24 новых R55-записи во входах 7 недель; атрибуция regions[] на Д1/Д3/Д5/Д7" },
      { "req": "africa — найди источники", "manifest": "done", "blind": "реализовано", "meaning": "background:false во всех 7 неделях, пометка снята, индекс свой" },
      { "req": "south-asia — найди источники", "manifest": "done", "blind": "частично", "meaning": "покрыт 4/7 недель (08-30/09-06/09-27/10-04); в 09-13/09-20/10-11 остался честно слепым (нет ≥2 независимых источников в окне), пометка сохраняется" }
    ],
    "drift": "нет истинного расхождения: манифест R02/R01i прямо фиксируют south-asia 4/7 и правило «без ≥2 источников регион остаётся слепым». Слепые недели south-asia — ожидаемый результат объёма данных, раскрытый в spec/proposals, а не потерянное требование."
  }
}
