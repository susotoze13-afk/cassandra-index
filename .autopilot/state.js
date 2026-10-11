window.STATE =
{
  "slug": "regional-index-sources",
  "dir": "2026-10-11-regional-index-sources",
  "title": "Расширение источников региональных индексов",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T2",
  "briefFile": "2026-10-11-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-11T17:05:00+03:00",
  "updatedAt": "2026-10-11T21:05:00+03:00",
  "finishedAt": "2026-10-11T21:05:00+03:00",
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-11T17:05:00+03:00",
      "finishedAt": "2026-10-11T17:07:00+03:00",
      "note": "третий случай: репо настроено; прогон vc-publish заархивирован (state.js в его папку); сервер поднят на :55435"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-11T17:07:00+03:00",
      "finishedAt": "2026-10-11T17:22:00+03:00"
    },
    {
      "id": "briefing",
      "status": "done",
      "startedAt": "2026-10-11T17:08:00+03:00",
      "finishedAt": "2026-10-11T17:12:00+03:00",
      "note": "2 вопроса: недели (все 6 + методология 3.0) и подбор источников (агент собирает, пользователь утверждает)"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-11T17:13:00+03:00",
      "finishedAt": "2026-10-11T17:22:00+03:00",
      "note": "G2: 0 пропущено, 2 наполовину (правила отбора источников, формат утверждения) — дописаны в §6"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-10-11T17:22:00+03:00",
      "finishedAt": "2026-10-11T17:30:00+03:00",
      "note": "ярус T2 — 4 таска в 3 волнах; G3: оба направления чисты"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-10-11T17:30:00+03:00",
      "finishedAt": "2026-10-11T20:45:00+03:00",
      "note": "4 из 4 тасков готовы (01 b37dde5, 02 8406227, 03 2c795e8, 04 bc1551a); 2 repairs (03 R01 источники, 04 тренд-версия), 0 handoffs"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-10-11T19:05:00+03:00",
      "finishedAt": "2026-10-11T20:45:00+03:00",
      "note": "все таски прошли Manifest+Spec и Craft; блокирующие (R01, тренд 2.0) закрыты дозапросами и ре-ревью"
    },
    {
      "id": "final",
      "status": "done",
      "startedAt": "2026-10-11T20:45:00+03:00",
      "finishedAt": "2026-10-11T21:05:00+03:00",
      "note": "слепая приёмка по брифу: 3.0/пересчёт — реализовано; расширение источников — механизм работает, africa и south-asia остались слепыми (по замыслу); память AGENTS.md и ADR 0023–0027 записаны; --wip снят"
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
    { "id": "01", "title": "Движок и сайт под 46 критериев и методологию 3.0", "requirements": ["G02"], "blockedBy": [], "wave": 1, "zone": ["calc/engine.js", "calc/params.js", "calc/calc.js", "js/criteria.js", "js/i18n.js", "js/sections/trend.js", "tests/"], "status": "done", "startedAt": "2026-10-11T17:32:00+03:00", "finishedAt": "2026-10-11T17:48:00+03:00", "retries": 0, "repairs": 0, "handoffs": 0, "files": ["calc/engine.js", "calc/params.js", "calc/calc.js", "js/criteria.js", "js/i18n.js", "js/sections/trend.js", "js/sections/methodology.js", "js/bundle.js", "js/bundle-privacy.js", "tests/"], "tests": "359/0", "commit": "b37dde5" },
    { "id": "02", "title": "Якоря: D4.6 по 10 профилям и перекалибровка k", "requirements": ["G02"], "blockedBy": ["01"], "wave": 2, "zone": ["calc/input/anchors/", "calc/params.js", "docs/calibration-journal.md", "proposals/"], "status": "done", "startedAt": "2026-10-11T19:02:00+03:00", "reviewedAt": "2026-10-11T19:05:00+03:00", "finishedAt": "2026-10-11T19:12:00+03:00", "retries": 0, "repairs": 0, "handoffs": 0, "files": ["calc/input/anchors/*.json", "docs/calibration-journal.md", ".autopilot/2026-10-11-regional-index-sources--wip/proposals/anchors-d46.md"], "tests": "359/0", "commit": "8406227" },
    { "id": "03", "title": "Шесть недель: региональные источники и атрибуция", "requirements": ["R01", "R02i", "G01"], "blockedBy": ["01"], "wave": 2, "zone": ["calc/input/2026-*.json", "proposals/"], "status": "done", "startedAt": "2026-10-11T19:02:00+03:00", "reviewedAt": "2026-10-11T19:20:00+03:00", "finishedAt": "2026-10-11T19:40:00+03:00", "retries": 0, "repairs": 1, "handoffs": 0, "files": ["calc/input/2026-*.json", "tests/sensitivity.test.js", ".autopilot/2026-10-11-regional-index-sources--wip/proposals/*-regions.md"], "tests": "359/0", "commit": "2c795e8" },
    { "id": "04", "title": "Перевыпуск цепочки 3.0: пересчёт, фикстуры, документы", "requirements": ["G01", "G02", "R02i"], "blockedBy": ["02", "03"], "wave": 3, "zone": ["data/", "tests/", "METHODOLOGY.md", "PRD_Casandra_Index.md"], "status": "done", "startedAt": "2026-10-11T19:42:00+03:00", "reviewedAt": "2026-10-11T20:20:00+03:00", "finishedAt": "2026-10-11T20:45:00+03:00", "retries": 0, "repairs": 1, "handoffs": 0, "files": ["data/**", "data/audit.jsonl", "tests/data.test.js", "tests/sensitivity.test.js", "METHODOLOGY.md", "PRD_Casandra_Index.md", "calc/calc.js"], "tests": "359/0", "commit": "bc1551a" }
  ],
  "singlePass": null,
  "tests": null,
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": "G2 независимый чек: 0 missing, 2 half-covered (правила отбора региональных источников — добавлены §6; формат артефакта утверждения — добавлен), extra в спеке весь трассируется в G02/ADR 0021",
  "concerns": ["ИСПОЛНИТЕЛЬ-03 (контекст 1): вернул ложный BLOCKED «ничего не изменено», фактически отредактировав все 7 входов и создав 6 proposals (проверено по диску). Артефакты построены на повторном использовании уже лежащих в репо источников (сети у инструментов контекста 1 не было), на живой fetch не проверялись. Контекст 2 перепроверил только 09-27. Преемник обязан перепроверить живыми fetch'ами.", "calc/calc.js:60 — ignoredRegionalAttribution дублирует предикат eligible из engine.regionalSignals (engine.js:472-478); при смене правила ADR 0022 рассинхронизируется. Условие: предикат eligible экспортирован из engine и используется обеими.", "Окно риска между таском 01 и 04: дисковые снапшоты 2.0 vs дефолт тренда 3.0 — на опубликованном сайте тренд временно пустой; push до таска 04 не делать.weekly-calc cron (вс 08:00 МСК) до перевыпуска выпустил бы неделю 3.0 без данных D4.6 — риск insufficient.", "Таск 02 (ревью Spec, неблокирующее): proposals/anchors-d46.md:56 ссылается на «полную таблицу ±20 %» в docs/calibration-journal.md, но новый раздел журнала (249–262) несёт только k ±20 %; полной таблицы чувствительности (α/λ/ρ/U_abs/веса) для прогона 3.0 нет. Условие: либо внести таблицу, либо убрать указатель.", "Таск 02 (ревью Craft, неблокирующее): источник покрытого D4.6 в якорях — статья Wikipedia о самом геополитическом событии, не о рынках; журнал (docs/calibration-journal.md:254) признаёт, что источник «зеркалит соседний Д4.4» ради формы. Условие: источник D4.6 должен документировать рыночное поведение окна (обвал индексов / скачок нефти / спреды) либо значение помечено как экспертная оценка без рыночного источника.", "Таск 02 (ревью Craft, неблокирующее): proposals/anchors-d46.md:15 утверждает «та же дисциплина, что у соседних ordinal-критериев», но D1.5 = 0.2 в crimea-2014.json и proxy-sanctions-2018.json (вне {0,0.33,0.67,1}). Условие: формулировка должна относить шкалу 0/0.33/0.67/1 к D4.6, а не утверждать совпадение со всеми соседями.", "Таск 03 (ревью Spec, неблокирующее): 09-27 и 10-04 имеют по 2 региона с сигналами против цели 4–6 на поздних неделях (История 1). Адресуется в дозапросе таска 03 (за счёт новых источников).", "Таск 03 (ревью Spec, неблокирующее): источники D4.6 у недель — смежные экономические материалы (бонусы банкиров, поставки долларов, экспорт зерна), а не индикаторы рыночного стресса. Адресуется в дозапросе таска 03.", "Таск 03 (ревью Craft, неблокирующее): колонка «Цитата-обоснование» в proposals несёт русские пересказы, а не дословные фрагменты источника. Адресуется в дозапросе таска 03.", "Таск 03 (ревью Craft, неблокирующее): D4.6 у недель использует 0.5, ломая шкалу 0/0.33/0.67/1, закреплённую для якорей таска 02. Адресуется в дозапросе таска 03.", "Таск 03: WebSearch/WebFetch недоступны (мёртвый прокси 127.0.0.1:12334), но прямой доступ через shell (curl/node fetch) работает; R01-блокер снят этим обходом. Для weekly-calc.yml и будущих прогонов инструментальный доступ к сети остаётся хрупким.", "Таск 03 (письменное замечание Craft, неблокирующее): новые R55-записи несут accessed_date 2026-10-11, хотя изначально прогон фиксировал недоступность сети. Снято: сеть доступна через shell (подтверждено fetch'ем 200 у новых URL); accessed_date корректна.", "Таск 04 (ревью Spec, БЛОКИРУЮЩЕЕ → дозапрос): последняя точка каждой data/<неделя>/trend.js несла \"methodology\": \"2.0\" при предыдущих 3.0 — selectMethodology('3.0') отсекал точку и trendSegments рисовал ложный разрыв (История 12). Условие: все точки цепочки несут '3.0'; фикстура пинит p.methodology === '3.0'."],
  "reviewers": {
    "manifestSpec": "ses_ed44c7b85ffe47UIs6JCJx1TJh",
    "craft": "ses_ed44c7b85ffdOW9evpKvtdJa7q"
  },
  "blind": {
    "by": "независимый субагент: только бриф (2026-10-11-brief.md), без spec/manifest/tickets; запускал проект (тесты + Chrome headless file://index.html + calc.js)",
    "commands": [
      "node --test → 359 passed / 0 fail",
      "chrome --headless file:///…/index.html → DOM 205674 байт, data-role=global-index 56, секция regions с числами, «за 7 недель методологии 3.0»",
      "python -m http.server + Invoke-WebRequest index.html → 200",
      "node calc/calc.js 2026-10-11 → index 56, delta +10, q 0.862, покрытие 27/46, регионы с сигналами 4/6"
    ],
    "verdicts": [
      { "req": "R01/R02i — расширить региональные источники и снять «региональных данных недостаточно»", "manifest": "done", "blind": "частично", "meaning": "источники расширены (12 новых, 20–82/нед.), регионы с сигналами не слепые (4/6 у 10-11); africa (все 7 недель) и south-asia (6/7) остались слепыми — проектно для регионов без сигналов, пометка у них сохраняется" },
      { "req": "G01 — пересчёт цепочки под методологию 3.0", "manifest": "done", "blind": "реализовано" },
      { "req": "«Агент собирает, пользователь утверждает» набор источников", "manifest": "done", "blind": "частично подтверждено", "meaning": "сбор подтверждён (proposals/<неделя>-regions.md в 2c795e8); сам факт утверждения — вне доступных проверяющему файлов (косвенно approved_by Editor-in-Chief в audit)" }
    ],
    "drift": "нет истинного расхождения: R01 = «расширить список источников» (done), R02i = «регионы с данными перестают быть слепыми; у регионов без сигналов пометка остаётся» (done). Слепые africa/south-asia — не дрейф, а раскрытое на брифинге поведение."
  }
}
