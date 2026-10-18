# notes — precursor-and-scale (2026-10-18)

Разведка кода под спецификацию. Каталог прогона: `.autopilot/2026-10-18-precursor-and-scale/`
(суффикс `--wip` снят чужим `finish`; `state.js` сейчас принадлежит другому прогону).

## 1. Расчётный шов недели

- `calc/week-step.js`
  - `taxonomyForWeek(week)` — 26–28.
  - `loadSnapshotPart(week, file)` — 32–42.
  - `classifyPublication(aggregate, drivers, params)` — 48–71.
  - `nextChainState(state, res)` — 77–95.
  - `computeWeek(input, state = {}, params = PARAMS)` — 109–145 → `{ week, drivers, ctx, global, classification, regions, sbLeft, sbReason }`.
- `calc/calc.js`
  - Реэкспорт швов — 43.
  - `RECALC_WEEKS` — 47, `PREV_WEEK` — 48.
  - `weekPartFiles(taxonomy)` — 251–257 (v1 = 11, v2 = 17); `WEEK_PART_FILES` — 261.
  - `renderWeekCombined` — 306–322; `loadWeekParts` — 328–341.
  - `renderGlobal(week, snap, globalOut, meta)` — 348–369.
  - `renderRegionFile` — 381–383; `mergedRegion` — 377–379.
  - `runWeek(week, state)` — 418–510; `coverage = {criteria, totalCriteria, drivers, uncovered}` — 497–508.
  - `writeWeek(res, state)` — 550–706: `meta` 564–585, `full` 587–623, ворота цитат 630–636, linkcheck 640–645, `validateSnapshot(full)` 647, запись 650–672, audit 676–704.
  - **Ловушка:** новое поле надо добавить и в `meta`, и в `full`, и в `renderGlobal`; иначе оно либо не дойдёт до диска, либо не проверится контрактом.
- `calc/engine.js`
  - `D9_SUBGROUPS` — 74; `aggregateD9(subgroups, params)` — 76–119 → `{score, signaling, corr}`.
  - `buildDriversCore` — 127–181; драйвер Д9 — 174–179: `{id:'D9', score, confidence, signalingSubgroups}`.
  - `buildDrivers` — 187–193; `aggregateDrivers` — 276–384, `parts = {S,U,U_raw,I_agg,I_new,I_new0,tilde}`.
  - `d9Strength` в репозитории НЕТ: литеральный слой — `drivers.find(d => d.id === 'D9').score`.

## 2. Контракт снапшота (`js/data.js`)

- `validate` — 136–231; `validateQuality` — 243–324.
- Опциональны: `q`, `nullWeight`, `confidence`, `coverage`, `coverageCriteria` (265–282, включая `uncovered`), `preview`, `recalc`, `incompleteCoverage`, `sensitivity` (306–312).
- `regions.<id>.background` — 178–183.
- Незнакомые верхнеуровневые поля не проверяются и не запрещаются — `precursor` пройдёт молча, нужен явный тест формы.
- `data/latest.js`: `CI_WEEKS` — 3, `CI_LATEST` — 4, `document.write` только `data/<w>/week.js` — 11–14.
- Новый отдельный файл-часть ломает `weekPartFiles`/`partOrder` и все 12 недель — поле обязано жить в `global.js`.

## 3. Сайт

- `js/render.js`: `SECTIONS` — 16–26 (`hero, trust, regions, trend, drivers, states, history, methodology, feedback`); `registerSection` — 41–45; `renderAll` — 56–62.
- `index.html`: `#overview` (hero) — 51; trust — 116–119; regions — 125–128; trend — 130–133; drivers — 135–138; methodology — 140–143; feedback — 147–150. Блок precursor — между 112 и 116, плюс имя в `SECTIONS` между `hero` и `trust`.
- `js/sections/trust.js`: `trustFacts` — 25–77, `factsLine` — 189–197, `showSensitivity` — 201–207, `buildDetails` — 209–354 (не экспортирован), `render` — 356–388; ключи `trust.*` — `js/i18n.js:172–197`.
- `js/sections/methodology.js`: `criteriaModel` — 58–81, `criteriaMetaNode` — 85–90 (чипы `method-criteria-chip`), `render` — 143–202.
- `js/criteria.js`: у 46 записей есть `scale` и `dir` (ADR 0045).
- `js/i18n.js`: плоские ключи, ICU; `method.criteria.scale.*` — 283–285; общего теста ключей/плейсхолдеров нет, новые ключи assert-ить точечно.
- `css/styles.css`: `.section` — 504–509; `.section-body` — 515–517; `.method-criteria-chip` — 1787; `.trust-section` — 2080–2082; `.trust-row` — 2084–2099.

## 4. Тесты

- `tests/data.test.js`: `validSnapshot` 15–69; пины чисел — 398–419 (09-13 index 43, delta +1); `coverageCriteria` — 263–311; диск — 379–396.
- `tests/trust.test.js`: `SNAP` 20–43; ключи i18n 274–291.
- `tests/page-smoke.test.js`: 12 недель через `readLatestWeeks`, `validate`, `rankedRegions` 6/12.
- `tests/methodology-criteria.test.js`: паритет 46 id, `scale`/`dir` 27–34, `criteriaModel` 81–93, подписи 114–142.
- `tests/week-combined-parity.test.js`: `week.js` ≡ склейка частей.
- `tests/build.test.js`: контрольная сборка во временном каталоге.
- Стиль: `node:test` + `node:assert/strict`, чистые швы без DOM/сети, R-id/ADR в комментарии.

## 5. Сборка и деплой

- `build.js`: `BUNDLES` — 18–21; после любой правки `js/**` — `node build.js`.
- `deploy.yml:34–40` публикует `data/` целиком, кроме `audit.jsonl`.
- `weekly-calc.yml:68` — гейт v1-сидов (`region-europe`), v2-недели тихо пропускает.

## 6. Якоря

- `calc/calibrate.js`: `runAnchor` — 47–53, `evaluateGrid` — 57–74, `marginOf` — 77–79, `loadAnchors(dir)` — 647–655 (читает ВСЕ `*.json` из `calc/input/anchors/`).
- **Ловушка:** `forward-<week>.json` без `input.anchor` уронит `evaluateGrid`/CLI — либо класть в отдельный каталог, либо фильтровать в `loadAnchors`.
- Формат якоря: `anchor {id, title, type, target:[lo,hi], rollingOrigin:'select'|'verify'}`; 7 select + 3 verify. `I_agg` в файле не хранится — брать `runAnchor(input, PARAMS).result.parts.I_agg`.

## 7. Документы

- `docs/calibration-journal.md`: три `#`-раздела (1, 231, 299); новый `# Интервальность шкалы…` — после 397, ссылка из «Результат прогона».
- `METHODOLOGY.md` §1.1 — 37–66 (сноска про перцентиль 61–66); §4.3.6 — это пункт 6 §4.3, 657–664, отдельного заголовка нет.

## 8. ADR

- Формат — по `0045`: `# NNNN. …`, `**Дата:**`, `**Статус:**`, `## Контекст`, `## Решение`, `## Почему`, `## Последствия`, `## План реализации`.
- Заняты 0001–0045; следующий свободный — **0046**.

## 9. Что уже в рабочем дереве

- `js/criteria.js` — `scale`/`dir` у всех 46; `js/sections/methodology.js` — чипы; `js/i18n.js` — `method.criteria.scale.*` 283–285; `js/sections/trust.js` — sensitivity числом и `uncoveredByDriver`; `js/data.js` — `coverageCriteria.uncovered` 265–282.
- `data/2026-10-18/global.js`: index 63, delta +7, q 0.8622; покрытие на момент разведки 28/46 (параллельная сессия дозабора меняет его — не трогать).
- Бандл пересобран; дерево грязное, чужие правки не коммитить.

## Риски, которые надо держать в голове

1. Новое поле снапшота — три точки записи (`meta`, `full`, `renderGlobal`), иначе тихая потеря.
2. Отдельный файл-часть ломает `weekPartFiles` — только поле внутри `global.js`.
3. `js/data.js` не запрещает незнакомые поля — валидация `precursor` должна быть явной.
4. Forward-якоря в `calc/input/anchors/` уронят `calibrate.js` — фильтр или отдельный каталог.
5. Параллельная сессия правит `data/2026-10-18` и `AGENTS.md`; `node --test` может быть красным по чужим причинам.
