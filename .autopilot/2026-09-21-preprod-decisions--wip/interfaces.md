# Интерфейсы — предпродакшен-прогон (2026-09-21-preprod-decisions)

## Правила проекта (субагент не выводит их сам — они здесь)

- Стек: чистый HTML/CSS/JS, ноль зависимостей (любой импорт npm/CDN — ошибка). Всё ESM,
  кроме CommonJS `build.js`. Node ≥ 18.
- Тесты: `node --test` — из корня, БЕЗ аргументов (форма `node --test tests/` падает на
  Windows/Node 24). Один файл: `node --test tests/<имя>.test.js`.
- После ЛЮБОЙ правки `js/**`: `node build.js` — бандлы коммитятся. bundle руками не править.
- Страницы грузят СОБРАННЫЕ `js/bundle.js`/`js/bundle-privacy.js`, не ES-модули (CORS на file://).
- Все пользовательские строки — только через словарь `js/i18n.js` (после таска 03 — ICU
  MessageFormat: `{var}`, `{n, plural, …}`, `{x, select, …}`; split(';') запрещён).
- DOM — только `document.createElement` + `textContent`. Никакого innerHTML со строками.
- Цвета — только токены из `css/styles.css`. Тон статуса — risk.tone.
- a11y: видимый фокус 2px #58A6FF, контраст ≥4.5:1, touch ≥44px, reflow 320px,
  prefers-reduced-motion, значения не цветом, aria-live — `[data-role="a11y-live"]`.
- Лексика: избегаем слов PRD §11.5 и списка теста лексики (таск 08). Нет «вероятность»,
  «шанс», «процент риска», «обратный отсчёт», «на пороге», «на грани», «осталось»,
  «до войны», метафор часов.
- НЕ трогать: `cassandra-index-prototype.html`, `PRD_Casandra_Index.md`, `.autopilot/`,
  `data/latest.js` (document.write — инфраструктура), `design/cassandra-index.pen`
  (пересохранение ломает tests/pen.test.js). METHODOLOGY.md В ЭТОМ ПРОГОНЕ правится
   — по брифу B6 (обычно она под запретом; здесь разрешение явное).
- Защищённые поля снапшотов (drivers/sources/published/through/тексты) calc.js не
  перезаписывает; числовые файлы и dataState — перезаписывает.
- Отсутствующая возможность — не повод ставить пакет: возвращай BLOCKED с описанием.
- Коммитить — только зелёный `node --test` после `node build.js`. Пуш в master = выкат
  (автодеплой GitHub Actions) — решает оркестратор, таски не пушат.
- Деплой публикует только `index.html`, `privacy.html`, `css/`, `js/`, `data/` — всё
  публичное для сайта должно лежать в data/ (например data/calibration.js).

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `engine` (calc) | формулы §4–§7, validate входа | `driverScore, d8Strength, aggregateD9, aggregateDrivers, applyInertia, detectStructuralBreak, regionalIndex, stateOf, validate, CRITERIA` + новые `normalizeCriterion`, `detectFlashTriggers` | нормировки, кривую |
| `params` (calc) | все числа | `PARAMS, list()` + dataCoverage, severityValues, capCount, qualityThresholds, clusters, flashTriggers, ipConfidenceLadder | — |
| `audit` (calc, новый) | append-only журнал | `append(record) -> {id, hash}`, `verify() -> {ok, brokenAt}`, `read()` | sha256-цепочку, JSONL |
| `calibrate` (calc) | калибровка k/весов/порогов | `buildDrivers, runAnchor, evaluateGrid, sensitivity` (без изменений) + `selectK(evaluation, baseK=PARAMS.k)` (tie-break к baseK — таск 07) + новые швы-итератор `calibrate(), paramDeviation, candidateParams` (таск 07) | сетку |
| `calc-cli` | прогон недель | цепочка RECALC_WEEKS, классификация публикации (insufficient/reduced/full), запись снапшотов + recalc-метаданных, вызовы audit | состояние цепочки, lastValidInternal |
| `data-contract` (js) | контракт снапшота | `validate, week, latest, listWeeks` — расширено: global nullable при insufficient, q/coverage/confidence/preview/recalc, sources по новой схеме | дефолты |
| `i18n` (js) | словарь, ICU | `t(lang, key, vars)` с ICU plural/select, `date` | парсинг ICU, CLDR-правила |
| `region` (js) | детект, согласие, справочник | `detect, search, current, choose, consent.status/grant/dismiss, representative(conf)` (новое), reference | storage-ключи |
| `sections/*` (js) | рендер 7 секций | существующие чистые швы + `sortSources`, `qualityBadge(q)` (новые) | DOM |
| `lexicon-test` (tests) | контент-ревью строк | константа запрещённых слов + сканер | — |

## Швы для тестов

`engine` (основной), `data-contract.validate`, `i18n` (t/plural ICU), `region`
(consent/representative), `audit` (append/verify), `sortSources`, `qualityBadge`,
`lexicon`. Поведение проверяется только через эти швы; CLI — тонкая обвязка, не шов.

## Зоны тасок (волны)

- Волна 1: 01 `calc/` params+engine; 02 `calc/audit.js`; 03 `js/i18n.js`+plural-вызовы;
  04 `docs/`+METHODOLOGY.md (§1.1/§8/§10/§11/§13).
- Волна 2: 05 `calc/calc.js`+`js/data.js`+data/недели; 06 `js/region.js`+`data/regions/`+
  privacy.html+toast.
- Волна 3: 07 anchors+calibrate+журнал+METHODOLOGY(§9/приложение)+data/недели;
  08 hero/states+lexicon+index.html+data текст.
- Волна 4: 09 trend/history/drivers+data источники+data.js.
- Волна 5: 10 methodology/regions/states/history+data/calibration.js.

Конфликты общих файлов (js/i18n.js, css/styles.css, METHODOLOGY.md, data/недели)
сериализованы волнами; внутри волны зоны не пересекаются.

## Из таска 07 — калибровка 10 профилей, журнал, методология 2.0 (done)

- 4 новых якоря: able-archer-1983 (verify), kargil-1999, yom-kippur-1973, iraq-2003 (select) — модельные профили по образцу 6 существующих, помечены «модельный профиль, не архивная реконструкция».
- k = 1.95 подтверждён: allHit на 10 профилях, min-запас 7.0 п., плато k∈[1.20,2.75], tie-break к v0.7; веса/λ/ρ не потребовали изменений.
- Журнал (docs/calibration-journal.md) переписан: таблица 10 якорей (роль/тип/источник/диапазон/обоснование/I_agg/индекс/итог), A2/U_abs=0.025 (≈5.5 п. шкалы при k=1.95), чувствительность ±20 %, открытое место: Able Archer у нижней границы (79 при k−20 %).
- METHODOLOGY.md → 2.0 (§9 расширена, §10.1, §13, Приложение А); §4–§8 не тронуты.
- data недель 08-30+ : methodology «2.0», recalc.at/After обновлены, числа не менялись; audit.jsonl +4 записи (recalc-0004..0006, methodology-0007), verify ok.
- Дозапрос: лексика вычищена в region-текстах 08-30+ (12 вхождений), сканер теста лексики теперь покрывает все 7 недель.

## Из таска 09 — тренд и источники (done, дозапрос по region-источникам в работе)

- `sections.trend.trendSegments(points) -> {segments:[point[]], breaks:[{index, reason:'methodology'|'unpublished', from, to}]}` — разрывы серии R28; null-точки insufficient — отдельный сегмент.
- `sections.drivers.sortSources(sources) -> новый массив` — тип (primary=0/OSINT=1/secondary=2) → дата desc → домен → url; вход не мутируется. Иконка типа + tooltip «Сортировка: primary → дата → алфавит».
- `sourcesOpenState(storage, now?, key?, ttl?) / rememberSourcesOpen(storage, now?) / forgetSourcesOpen(storage)`; ключ `cassandra.sources.open` {at} — sessionStorage-семантика (R57).
- Bottom sheet: role=dialog, aria-modal, X/backdrop/Escape, focus-trap, возврат фокуса на точку, vibrate graceful; desktop hover/focus-tooltip без автоскрытия. a11y: pointAriaLabel «Дата/Индекс/Состояние», aria-describedby=trend-caption, sr-таблица 12 точек, aria-live при стрелках.
- Миграция источников: data/2026-*/sources.js + drivers.js (91 источник, 8 недель) на схему {id, title{ru,en}, domain, url, publication_date, accessed_date, source_type('primary'|'secondary'|'OSINT'), cluster_id, state_affiliated}; идентичность текстов сверена против HEAD. Остаток: источники внутри region-*.js — дозапрос к исполнителю 09; validate (js/data.js) держит легаси-ветку isSource как фолбэк.
- Новые i18n-ключи: trend.point.aria/na, trend.state.na, trend.sheet.*, trend.break.*, trend.table.*, trend.{now,weekAgo}.na, sources.type.*, sources.sort.tooltip.

## Из таска 08 — hero, лексика, бейдж качества (done)

- `states.qualityBadge(q) -> 'high'|'medium'|'low'|null`; `QUALITY_THRESHOLDS={high:0.8, medium:0.6}` (зеркало PARAMS.qualityThresholds).
- `states.needsPreliminaryNote(snapshot) -> bool`; `states.pickVisibleSnapshot(weekKeys, getSnapshot) -> {week, snapshot}|null`; `states.visibleSnapshotOf(appState) -> snapshot` — при insufficient берёт последний валидный, overlay не включается.
- i18n: `export DICTS` (для теста лексики); новые ключи `hero.legal.disclaimer`, `hero.preliminary`, `quality.{label,level.*,badge,badge.aria,modal.*}`, `a11y.quality.opened`.
- index.html: H1 утвердительный («Индекс N — Состояние»), дефолты 08-23.
- tests/lexicon.test.js — сканер запрещённой лексики по словарю и текстам снапшотов; покрывает недели 08-02…08-23 (недели 08-30+ — дозапрос таску 07: тексты region-*.js).
- Бейдж/пометка берут q ПРОСМАТРИВАЕМОЙ недели, числа/даты — последнего валидного (зафиксировано исполнителем, CONCERN).

## Из таска 05 — insufficient-пороги в пайплайне (done)

- `classifyPublication(aggregate{q}, drivers, params=PARAMS) -> {insufficient, reduced, dataState, confidence, q, nullWeight, coveredDrivers, totalDrivers}` — EPS 1e-9 на порогах 0.4/0.2.
- `nextChainState(state, res)` — insufficient-неделя НЕ двигает prevInternal/prevPublished/prevRegions/recalcIndex (инерция от последнего валидного).
- `validateInputSources(sources, params) -> errors[]` — top-level sources, 9 обязательных полей (R55).
- Контракт снапшота (js/data.js): `global:null` только при dataState insufficient|unavailable; insufficient требует q/nullWeight/coverage{coveredDrivers,totalDrivers}/confidence:'none'/preview{index,internal}; reduced → confidence:'reduced' + incompleteCoverage:true; полная → 'full'. `recalc{at, reason, previous, methodologyBefore, methodologyAfter, approvedBy}` на каждой перезаписи (baseline=recalc.previous).
- Тренд: точки `{date, value|null, methodology?}`; value:null только вместе с methodology (разрыв серии — маркер R28).
- calc.js `--write`: пишет в data/audit.jsonl запись type=recalc (changed_by 'calc-pipeline', recalculation_method 'aggregateDrivers v2.0', approved_by 'Editor-in-Chief', diff {field:{from,to}}); при срабатывании engine.detectFlashTriggers — запись type=flash (diff {}, поле flash {criterion, sources}), снапшот не пересчитывается.
- Три демо-недели 08-30/09-06/09-13 теперь dataState='insufficient', global:null; UI ОБЯЗАН смотреть dataState (region-*.js несут расчётные preview для редакции). Повторный --write добавляет recalc-записи (append-only by design).

## Из таска 06 — регионы, согласие, privacy (done)

- `region.reference() -> window.CI_REGION_REF | null` — канонический справочник `data/regions/reference.json` + загрузчик `data/regions/reference.js`: methodology, taxonomy (ISO 3166-2 + GeoNames admin1_code), disputedTerritories (политика нейтральная, contested-разметки в публичном UI нет), 6 регионов {id, name{ru,en}, countries[], adminCenter{city,country,iso3166_2,geonamesId}}, confidenceLadder {city:80, region:90, floor:50} — зеркало PARAMS.ipConfidenceLadder, числа не дублировать.
- `region.representative({cityConf,regionConf,city,adminCenter,regionId}, ladder?) -> {level:'city'|'adminCenter'|'region'|'country'|'global', place, regionId}` — доли 0..1, «никогда не гадать»; страна из справочника (UI пока не выводит — шов для edge-слоя).
- `region.consent.{status()->{status,at,deniedUntil}, grant(), dismiss(), KEY}`; localStorage: `cassandra.region.consent` {v,status,at,deniedUntil}, `cassandra.region`, `cassandra.region.session`; CONSENT_DENY_DAYS.
- `ui.createToast({text,actions[],dismiss}) -> Element`; событие document `ci:consent`; js/app.js гейт: детект региона только при consent=granted (opt-in для всех, A4).
- privacy.html: edge-модель, CCPA/GDPR/152-ФЗ тексты, IP не хранится; index.html — script-тег справочника + footer.ip.
- Затронут `js/sections/hero.js` (монтирование toast) — таск 08 строит поверх текущего состояния.

## Из таска 02 — audit log (done)

- `audit.append(record, logPath?) -> {id, hash}` — дефолтный путь `data/audit.jsonl` (JSONL, append-only через appendFileSync). id вида `«type»-NNNN`, монотонный.
- `audit.verify(logPath?) -> {ok, brokenAt, count}` — sha256-цепочка: hash = sha256(canonical JSON тела + prev_hash), genesis = «GENESIS»; подделка записи ломает цепочку (тест есть).
- `audit.read(logPath?) -> Record[]`.
- Типы записей `recalc | flash | methodology`. Тело = 10 обязательных полей (snapshot_id, version_before, version_after, changed_by, changed_at, reason, parameters_changed, recalculation_method, diff, approved_by) + service {type, id, created_by, prev_hash, hash}. flash допускает пустой diff; иные типы — diff непустой {field:{from,to}}.

## Из таска 01 — параметры, severity, схема входа (done)

- `PARAMS += { capCount: 5, severityValues: [0.2,0.5,1,2], dataCoverage: {insufficient:0.4, reduced:0.2, d1d2Required:true}, clusters: [...A–F], flashTriggers: {criteria:["D1.4","D2.4"], severity:2.0, d7Value:1}, qualityThresholds: {high:0.8, medium:0.6}, ipConfidenceLadder: {city:80, region:90, floor:50} }` — имена полей уже используют docs и обязательны для следующих тасок.
- `engine.normalizeCriterion(entry, params) -> value (number)` — count-шкала: `value=min(1, Σsev/capCount)`; вход критерия `{events:[...]}` или `{value}` (строгий XOR под `scale==='count'`; на иных шкалах трактовка events не согласована с validate — concern).
- `engine.detectFlashTriggers(criteria, params) -> boolean` — событие sev 2.0 по D1.4/D2.4 или D7.3=1.
- `engine.independenceWarnings(input, params) -> string[]` — 2 источника одного кластера → предупреждение (не ошибка; rejected ставит аналитик).
- `engine.validate(input, params=PARAMS) -> errors[]` — XOR value/events на count-шкале, whitelist кластеров, обязательные поля источника, flash_origin/state_affiliated.
- calc/calibrate.js `buildDrivers` считает через normalizeCriterion; 3 существующих входа без events валидны, числа не меняются (тест на обратную совместимость).

## Из таска 03 — ICU в i18n (done)

- `t(lang, key, vars)` — строки словаря поддерживают ICU: `{var}`, `{n, plural, one/few/many/other}` (вложенные блоки работают), `{x, select, ...}`; plural без vars → other; неизвестная категория → other; `{var}` без значения — литерал (совместимость).
- `plural(lang, n, forms)` — тонкая обёртка CLDR (RU [one,few,many], EN [one,other]); новых вызовов в js/** нет, оставлен как шов.
- Мигрированы plural-ключи `sources.word`, `trend.points` (были split(';')). split(';') в js/** отсутствует, включая бандлы.

## Из таска 04 — governance-документы и методология (done)

- `docs/preproduction-decisions.md` — дословный текст брифа без служебной шапки (эталон для слепой проверки G4).
- `docs/governance.md` — роли/RACI Flash Alert (Accountable Editor-in-Chief, SLA 2 ч, отзыв 24 ч), кластеры A–F + state_affiliated + правило red team, провайдер гео (MaxMind/IP2Location, SLA 99.9 %/<50 мс), пороги IP как breaking, спорные территории ISO 3166-2, мостик 4–8 недель, отдельная модель для доп. категорий (PR-AUC, log loss, reliability), чек-лист ссылок, критерий брака копирайта >20 %, таблица отложенных R25/R29/R42/R46/R52/R54.
- `docs/provenance-matrix.md` — матрица «источники × драйверы», ячейки главный/вторичный/не учитывается.
- `docs/adr/0007..0011` — severity-поле во входе, пороги покрытия, ICU-подмножество вместо react-i18next, opt-in для всех, двуязычный title источника.
- METHODOLOGY.md: §1.1 сноска «расчёт не даёт CDF», §8 запрет вероятностных оценок до бэктеста, §10 +5 пунктов breaking, §11 закрытый порог 40/20/null Д1|Д2 (со ссылкой на PARAMS.dataCoverage), §13 снят открытый вопрос. Заголовок версии и §4–§9 НЕ тронуты — версию 2.0 ставит таск 07.
