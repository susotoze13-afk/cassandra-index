window.STATE =
{
  "slug": "regions-v2-geo",
  "dir": "2026-10-16-regions-v2-geo",
  "title": "Регионы v2 и справочник городов/стран (ADR 0028 + 0029)",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T2",
  "briefFile": "2026-10-16-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/1/.agents/skills/autopilot",
  "startedAt": "2026-10-16T23:58:16+03:00",
  "updatedAt": "2026-10-17T00:57:17+03:00",
  "finishedAt": "2026-10-17T00:57:17+03:00",
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-16T23:58:16+03:00",
      "finishedAt": "2026-10-17T00:00:30+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-17T00:00:30+03:00",
      "finishedAt": "2026-10-17T00:00:40+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "startedAt": "2026-10-17T00:00:40+03:00",
      "finishedAt": "2026-10-17T00:00:40+03:00",
      "note": "полный автомат — самобрифинг; решения за пользователя помечены ASSUMPTION в manifest.md, вопросов не задавалось; адверсариальный проход не запускался (глубина обычная)"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-17T00:00:40+03:00",
      "finishedAt": "2026-10-17T00:06:00+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-10-17T00:06:00+03:00",
      "note": "5 тасков, ярус T2, 4 волны",
      "finishedAt": "2026-10-17T00:06:40+03:00"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-10-17T00:06:40+03:00",
      "finishedAt": "2026-10-17T00:52:43+03:00",
      "note": "6 из 6 готовы (01–06); 1 repair на 01, 0 handoffs"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-10-17T00:06:40+03:00",
      "finishedAt": "2026-10-17T00:52:43+03:00",
      "note": "ревью всех тасков по двум осям (Manifest+Spec, Craft); блокирующих закрыто 1 (таск 01 → repair)"
    },
    {
      "id": "final",
      "status": "done",
      "startedAt": "2026-10-17T00:53:00+03:00",
      "finishedAt": "2026-10-17T00:57:17+03:00",
      "note": "слепая приёмка G4: все проверяемые требования ADR 0028/0029 реализованы; не выполнен только пилот 2026-10-18 (R13, deferred); --wip снят"
    }
  ],
  "requirements": {
    "total": 42,
    "done": 41,
    "inTicket": 0,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 1,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Таксономия: контракт, резолверы, whitelist",
      "requirements": [
        "R02.1",
        "R03",
        "R03.1",
        "R03.2",
        "R03.3",
        "R03.4",
        "R03.5",
        "R04",
        "R05",
        "R06",
        "R07",
        "R09",
        "R30i"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "js/data.js",
        "js/region.js",
        "calc/params.js",
        "calc/engine.js",
        "tests/"
      ],
      "status": "done",
      "startedAt": "2026-10-17T00:06:40+03:00",
      "reviewedAt": "2026-10-17T00:14:00+03:00",
      "finishedAt": "2026-10-17T00:16:36+03:00",
      "retries": 0,
      "repairs": 1,
      "handoffs": 0,
      "files": [
        "js/data.js",
        "js/region.js",
        "calc/params.js",
        "calc/engine.js",
        "js/bundle.js",
        "tests/region.test.js",
        "tests/regional-signals.test.js",
        "tests/regions.test.js"
      ],
      "tests": "388/0",
      "commit": "e847b41"
    },
    {
      "id": "02",
      "title": "Расчётный пайплайн по версии недели",
      "requirements": [
        "R08",
        "R12",
        "R25",
        "R26"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "calc/calc.js",
        "calc/migrate-week-combined.js",
        "tests/"
      ],
      "status": "done",
      "startedAt": "2026-10-17T00:17:00+03:00",
      "reviewedAt": "2026-10-17T00:31:00+03:00",
      "finishedAt": "2026-10-17T00:32:37+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "files": ["calc/calc.js", "calc/migrate-week-combined.js", "calc/check-sources.js", "js/data.js", "tests/"],
      "tests": "413/0",
      "commit": "71598a5"
    },
    {
      "id": "03",
      "title": "Справочник GeoNames: генератор, ленивая загрузка, поиск",
      "requirements": [
        "R14",
        "R15",
        "R15.1",
        "R15.2",
        "R16",
        "R17",
        "R17.1",
        "R20",
        "R21",
        "R22",
        "R23"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "data/geo/",
        "js/geo.js",
        "js/region.js",
        "data/regions/reference.json",
        "tests/"
      ],
      "status": "done",
      "startedAt": "2026-10-17T00:17:00+03:00",
      "reviewedAt": "2026-10-17T00:31:00+03:00",
      "finishedAt": "2026-10-17T00:32:37+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "files": ["data/geo/", "js/geo.js", "js/region.js", "data/regions/reference.json", ".gitignore", "js/bundle.js", "tests/geo.test.js", "tests/region.test.js"],
      "tests": "413/0",
      "commit": "9fd430c"
    },
    {
      "id": "04",
      "title": "Сайт: регионы по версии, пикер, футер и заметка",
      "requirements": [
        "R01",
        "R02",
        "R08.1",
        "R10",
        "R10.1",
        "R10.2",
        "R11",
        "R18",
        "R19",
        "R29i"
      ],
      "blockedBy": [
        "01",
        "03"
      ],
      "wave": 3,
      "zone": [
        "js/sections/",
        "js/i18n.js",
        "js/app.js",
        "js/share.js",
        "privacy.html",
        "tests/"
      ],
      "status": "done",
      "startedAt": "2026-10-17T00:33:00+03:00",
      "reviewedAt": "2026-10-17T00:39:00+03:00",
      "finishedAt": "2026-10-17T00:40:22+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "files": ["js/sections/regions.js", "js/sections/hero.js", "js/sections/history.js", "js/i18n.js", "js/app.js", "privacy.html", "js/bundle.js", "js/bundle-privacy.js", "tests/"],
      "tests": "417/0",
      "commit": "f6398f8"
    },
    {
      "id": "05",
      "title": "Сборка, сквозная проверка, лексикон, память",
      "requirements": [
        "R04",
        "R24",
        "R27",
        "R28",
        "R30i"
      ],
      "blockedBy": [
        "02",
        "04"
      ],
      "wave": 4,
      "zone": [
        "js/bundle.js",
        "js/bundle-privacy.js",
        "css/styles.css",
        "js/sections/hero.js",
        "tests/"
      ],
      "status": "done",
      "startedAt": "2026-10-17T00:40:30+03:00",
      "reviewedAt": "2026-10-17T00:43:00+03:00",
      "finishedAt": "2026-10-17T00:44:14+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "files": ["css/styles.css", "js/bundle.js", "js/sections/hero.js", "tests/hero.test.js", "tests/lexicon.test.js", "tests/privacy.test.js", "tests/page-smoke.test.js"],
      "tests": "421/0",
      "commit": "e915cfa"
    },
    {
      "id": "06",
      "title": "Доводка по находкам ревью (исправить сейчас)",
      "requirements": ["R17", "R24", "R27", "R28"],
      "blockedBy": ["02", "03", "05"],
      "wave": 5,
      "zone": ["calc/calc.js", "js/region.js", "js/geo.js", "data/geo/generate.js", "css/styles.css", "js/bundle.js", "tests/"],
      "status": "done",
      "startedAt": "2026-10-17T00:45:00+03:00",
      "reviewedAt": "2026-10-17T00:51:00+03:00",
      "finishedAt": "2026-10-17T00:52:43+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0,
      "files": ["calc/calc.js", "css/styles.css", "data/geo/cities.js", "data/geo/countries.js", "data/geo/generate.js", "js/bundle.js", "js/geo.js", "js/region.js", "tests/"],
      "tests": "424/0",
      "commit": "accf109"
    }
  ],
  "singlePass": null,
  "tests": "421/0",
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": "G2 независимый чек (бриф+спека, без манифеста): missing 5 — (1) порядок detect российских Asia/* выше центральноазиатских, (2) тихий откат к глобальному при неудаче detect, (3) 12 строк витрины на узких экранах/пин личного региона, (4) запрет публикации частичного входа с пустыми Балканами, (5) переточка CITIES под v2 — все внесены в spec §Сайт/§Расчёт/§Вне рамок. half-covered 2 — «2 драйвера на region-*.js» и «Балканы не слепые» — внесены. EXTRA ~12 — детали API/файлов (taxonomyForWeek, CURRENT_TAXONOMY, TAXONOMY_V2_FROM, weekPartFiles, js/geo.js, data/geo/generate.js, COORD_BOXES) = deepening R##.n; ASSUMPTION-подмены (RU-имена из alternatenames, курируемая таблица стран, обязательная ссылка в privacy) помечены ASSUMPTION. Найденки приняты без отсечений.",
  "concerns": [
    "Таск 01 (Craft, неблокирующее): js/region.js get/choose повторяют форму REGIONS_V2.find(x=>x.id===id) — вынести общий хелпер поиска по id",
    "Таск 01 (Craft, неблокирующее): tests/region.test.js search('Европа') вакуумно истинно на пустом массиве — утверждать непустоту результата",
    "План: R07 фактически покрыт тасками 01(контракт)+04(сайт), R09 — 01+02; требование не снято, уточняется раскладка G3",
    "Таск 02 (Craft, неблокирующее): calc/calc.js partOrder выводит версию по наличию v2-эксклюзивных region-* вместо regions_taxonomy global-части — v2-декларация без v2-регионов молча рисуется как v1",
    "Таск 02 (Craft, неблокирующее): tests/calc-engine.test.js дублирует выражение границы версии вместо вызова taxonomyForWeek — тест подтверждает сам себя",
    "Таск 02 (Craft, неблокирующее): tests/insufficient.test.js пинит остаточный v1-ключ prevRegions.europe вместо наблюдаемого «смещение не наследуется»",
    "Таск 03 (Craft, неблокирующее): тесты не покрывают швы генератора (zip-ридер, pickRuAlternate, parseCityLine, parseCountryInfo) — тихие ошибки генерации вне зелёного прогона",
    "Таск 03 (Craft, неблокирующее): js/geo.js geoSearch — тонкий посредник region.search (два входа поиска); .broad не выставляется в офлайн-fallback, хотя контракт обещал boolean",
    "Таск 03 (Manifest, неблокирующее): generate.js добавляет столицы по fcode=PPLC для любых территорий, а R14 — столицы суверенных стран",
    "Таск 04 (Spec, неблокирующее→закрыто таском 05): класс .region-row--pinned без CSS-правила order — пин личного региона не работал",
    "Таск 04 (Craft, неблокирующее→закрыто таском 05): hero.js geoRequested не сбрасывался при ошибке loadGeo; порог ≥2 символов не действовал в fallback без каталога; tests/hero.test.js notEqual(...,'europe') вакуумен; tests/privacy.test.js сузил запрет внешних ресурсов",
    "Таск 05 (Craft, неблокирующее): .region-row--pinned{order:-1} применён на всех ширинах (спека говорила «на узких экранах»); комментарий обещает скролл, но у .regions-list нет max-height/overflow; tests/page-smoke.test.js дублирует список 11 недель вместо CI_WEEKS/listWeeks",
    "Пилот 2026-10-18 (R13, вне этого прогона): корпус Балкан и сиды кладёт редактор; неделя не публикуется автоматически — weekly-calc тихо пропустит",
    "Таск 06 (Craft, неблокирующее, отчёт): tests/geo.test.js makeZip пишет ненулевой compSize — ветка unzipFirstEntry с compSize===0 (central directory/data descriptor) не покрыта",
    "Таск 06 (Craft, неблокирующее, отчёт): calc/calc.js taxonomyOfParts парсит regions_taxonomy регэкспом по тексту, не привязан к строке присваивания s.regions_taxonomy",
    "Данные: data/geo/cities.js ≈1.5 МБ (12417 городов) — больше оценки ADR «несколько сотен КБ»; грузится лениво, стартовая страница не тяжелеет"
  ],
  "reviewers": {
    "manifestSpec": "ses_eb970ac69ffeVc4JepT17Cze7U",
    "craft": "ses_eb970ac69ffdcVhHzCNTWMcQXl"
  },
  "blind": {
    "by": "независимый субагент: только бриф (без spec/manifest/tickets), чтение репозитория + node --test + node build.js",
    "commands": [
      "node --test → 424 pass / 0 fail",
      "node build.js → bundle.js 20 модулей 227726 байт; bundle-privacy.js 3 модуля 36073 байта; exit 0",
      "grep regions_taxonomy data/*/week.js → пусто (11 недель — v1)",
      "Test-Path calc/input/2026-10-18.json → False"
    ],
    "verdicts": [
      { "req": "ADR 0028: 12 регионов v2 + v1-шестёрка легаси", "manifest": "done", "blind": "реализовано", "meaning": "REGIONS_V2 12 id / REGIONS_V1 6; reference.json taxonomies['1.0'/'2.0']" },
      { "req": "Строгость разбиения (приоритеты)", "manifest": "done", "blind": "реализовано", "meaning": "TR→middle-east, CY/MT→eu-north-europe, GR/BG/RO/HR/SI→balkans, EE/LV/LT→baltic; Косово/Гренландия вне; пин region.test.js" },
      { "req": "Forward-only + regions_taxonomy", "manifest": "done", "blind": "реализовано", "meaning": "11 недель без поля → v1; calc.js пишет регион-файлы по версии; offset 0 у нового региона" },
      { "req": "Витрина 12/6 строк по версии недели", "manifest": "done", "blind": "реализовано", "meaning": "rankedRegions по regionForTaxonomy(snapshot.regions_taxonomy)" },
      { "req": "Личный регион: detect/выбор/забывание 'europe'/тост", "manifest": "done", "blind": "реализовано", "meaning": "current/choose только v2; region.toast.stale; подсветка только в наборе недели" },
      { "req": "Заметка о смене сетки", "manifest": "done", "blind": "реализовано", "meaning": "regionalGridNote + history.taxonomy.note (дормантна — секция скрыта)" },
      { "req": "ADR 0029: генератор + два статических файла + форма", "manifest": "done", "blind": "реализовано", "meaning": "data/geo/generate.js; window.CI_GEO_CITIES/COUNTRIES; tests/geo.test.js" },
      { "req": "Обе версии региона на страну; вне разбиения → null", "manifest": "done", "blind": "реализовано", "meaning": "RU→russia-belarus/europe; GL/AQ→null/null" },
      { "req": "Ленивая загрузка, не в бандле, не в index.html", "manifest": "done", "blind": "реализовано", "meaning": "js/geo.js loadGeo; data/geo не подключён статически" },
      { "req": "Поиск мин-2/топ-20/страна-fallback", "manifest": "done", "blind": "реализовано", "meaning": "region.search(q,catalog) .broad; resolveRegion; region.panel.noregion" },
      { "req": "Атрибуция GeoNames в футере + privacy", "manifest": "done", "blind": "реализовано", "meaning": "footer.geo «© GeoNames, CC BY 4.0»; privacy.geodata.text (анкор CC BY 4.0)" },
      { "req": "Пилот 2026-10-18 и редакционные ворота", "manifest": "deferred", "blind": "нет", "meaning": "ожидаемо: входа calc/input/2026-10-18.json нет, ворота ручные (R13)" }
    ],
    "drift": "нет: расхождений между манифестом и слепым вердиктом нет. Проверяющий подтвердил 424/0 и сборку; не поднимал сайт отдельно (index.html грузит собранные бандлы, build.js воспроизводится без изменений бандлов). Единственное «нет» — сам пилот недели 2026-10-18, что совпадает с R13 (deferred)."
  }
}
