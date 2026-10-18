# Заметки: `intersection` во входе + формальные критерии «глобального» (§1.2)

## 0. Блокирующее противоречие (решено ADR 0046)
- METHODOLOGY §4.1.5, строки 484–489: «Дедупликация — **редакторская** … в расчётном коде (`calc/`) и в схеме входа её нет, флаг `intersection` в схему **не вводится** (ADR 0045)».
- `docs/adr/0045-…:109-122`: раздел «`intersection` — только документация, без поля в схеме»; «поле `intersection` не вводится. Если позже понадобится автоматизация дедупликации — это отдельное решение с собственным ADR».
- Задача прямо реверсит решение ADR 0045 → новый ADR 0046 обязателен.

## 1. `calc/engine.js`
- `CRITERIA` — `engine.js:541-590`, запись `{ driver:'D1'..'D9', dir:'esc'|'deesc', scale:'count'|'ordinal'|'binary' }` (`D1.1` :542, `D4.6` :565).
- `normalizeCriterion(entry, params)` :209-218: `entry.events` → `min(1, Σsev/CAP)`; иначе `Number(entry.value)` или 0.
- `buildDriversCore(criteriaIn, confidenceLevels, params)` :127-181:
  - знаменатель покрытия — все критерии драйвера из `CRITERIA`; отсутствие ключа ≡ `null` (:125-126, :131-134);
  - Д1–Д7 :139-143: `{dir, value: entry ? normalizeCriterion(entry) : 0, covered: !!entry && entry.covered === true}`;
  - Д8 :150-164: `d8Strength`, `breakValue` из `D8.2` (:161-163);
  - Д9 :165-179: `score: entry && entry.covered===true ? normalizeCriterion(entry) : null`, `acyclic`/`rejected` (:169-170).
- `driverScore` :34-49: `covered` = `c.covered===true` :38; порог `covered.length/total < coverageThreshold` → null :39; `E/N_E − α·B/N_B` :40-48. **Покрытый критерий с `value:0` остаётся в `nE`/`nB`** :43-47.
- `d8Strength` :56-64: среднее по покрытым (:62).
- `aggregateD9` :76-119: `covered` = все с числовым score :82; вес `1/covered.length` :114.
- `aggregateDrivers` :276-384: E-набор :290; нормировка весов :291-300; S :303-308; потолок Д9 :309-315; q :322-331; кривая :333-336; лимит 30 % :338-348; q-сжатие :350-352; инерция/override :354-371; возврат :375-383.
- `validate(input, params, regionIds)` :620+: цикл по `input.criteria` :642; неизвестный id → ошибка :644-646; `null` разрешён :648; объект обязан иметь `covered===true` :653-655; count — ровно `value` XOR `events` :657-680; ordinal/binary — `value` 0..1 :681-683; `sources[]` min 1 :684-707; `regions[]` whitelist :708-717; boolean-флаги `['acyclic','rejected','flash_origin']` :718-720.
- **Лишние ключи критерия `validate` НЕ отклоняет** — проверяются только известные поля.

## 2. `calc/calc.js`
- `loadInput` :390-413: `validate` :400 → `validateInputSources` :401-406 → `validateSourceIndependence` :409-411.
- `validateInputSources` :78-106 — только top-level `sources[]`; детали R55 (:85-100), `validateQuotes` :104. `criteria` не смотрит.
- `runWeek` :418-510: `regionIdsFor(taxonomyForWeek(week))` :419; `computeWeek` :431; `sensitivityScore` :437; trend :444-473; `res.coverage` :497-508 (`criteria` :498, `totalCriteria` :499, `drivers` :500, `uncovered` :504-507).
- `printWeek` :709+: index/state/delta :719-722, публикация :723-727, `internal/q/покрытие` :728-729, structuralBreak :730, sensitivity :731, flash :732-734, ядро :736-741, ignoredAttribution :744-749, долг :751+.
- `writeWeek` :550+: `meta.coverageCriteria` :574-577; перенос в снапшот :594-596.

## 3. Вход `calc/input/2026-10-18.json`
- `D1.1` :5-30: `{ "events":[0.5,0.5], "covered":true, "sources":[…], "regions":[…] }`.
- `D1.2` :31+: `{ "value":0.67, "covered":true, … }`.
- Источник top-level :981-995 (схема R55). Доп. поля уже есть: `"acyclic": true` :931, `driverConfidence` :943, `origin` в др. неделях, `quotes` в 09-20/09-27. `intersection` нет нигде.

## 4. `js/data.js`
- `validate` :136-231; `validateQuality` :243+; `coverageCriteria` :261-282 — образец опционального additive-поля. Лишние поля снапшота не отклоняются.
- `regionIdsFor(taxonomy='1.0')` :28-31; `CURRENT_TAXONOMY='2.0'` :36; `TAXONOMY_V2_FROM='2026-10-18'` :37.

## 5. `js/risk.js` и пины
- `SCALE` :3-10: `{20,'calm'},{40,'tense'},{60,'danger'},{80,'very'},{96,'critical'},{100,'extreme'}`.
- `status` :21-24; `tone` :26-28 (`--state-*`); `deltaTone` :31-36.
- Дублирование диапазонов: `calc/params.js:129-135`, `stateOf` — `engine.js:21-27`.
- Пины: `tests/risk.test.js:7-19` (все границы), `tests/calc-engine.test.js:555-566`. Таблица §9 на сайте — `js/sections/methodology.js:32-47`.

## 6. `METHODOLOGY.md`
- §1.2: 68–127. Уже содержит (а)/(б)/(в) :75-80, разделение трёх вещей :86-93, операциональное чтение ADR 0045 :99-111, «не классифицирует» :109-111, «не имеет порога» :115-116. Шкала названа «§10» (:91) — фактически §9.
- §4.1.5: 482–509. Запрет `intersection` :484-489; таблица :496-505; Д9-оговорка :507-508.
- §9 «Состояния и пороги»: 991–1051; таблица :995-1002; якоря :1015-1026.
- Другие упоминания полос: :91, :1001-1002, :1024-1026. «дедуплик» — только :485. «intersection» — только :487.
- §5.2/§9: `METHODOLOGY.md:764-766`.

## 7. `js/i18n.js` — `method.definition.*`
- :262 заголовок; :263 `.1` («не менее двух» регионов, «крупные державы»); :264 `.2` (охват наблюдения); :265 `.3` (индекс не устанавливает факт войны); :266 `.4` («Опасно»/«Очень опасно»/«Критически опасно» — уровень риска). Про дедупликацию в i18n текстов нет.

## 8. Тесты: конвенции
- ESM, `node:test` + `node:assert/strict`.
- Минимальный валидный вход: все 46 критериев `null` — `tests/sources-schema.test.js:162-173`.
- Точечный критерий без источников — `tests/calc-engine.test.js:826-830`.
- Хелпер записи критерия — `tests/ignored-attribution.test.js:10`.
- Снапшот-хелперы — `tests/data.test.js:15` `validSnapshot()`, :204 `insufficientSnapshot()`; `coverageCriteria` :263-309.
- Релевантные: `tests/calc-engine.test.js`, `tests/methodology-criteria.test.js` (:10-34), `tests/sources-schema.test.js` (:160-174), `tests/data.test.js`, `tests/risk.test.js`.

## 9. ADR
- Последний — 0045. Формат шапки: `# 0045. Заголовок` / `**Дата:**` / `**Статус:**` / `**Номер:**`, далее `## Контекст`, `## Решение`, `### N.`.
- Реестра ADR нет; регистрация — самим файлом (AGENTS.md перечисляет текстом).

## 10. Переводы строк
- `.gitattributes` есть на диске (коммит beabacf, `* text=auto eol=lf`); `METHODOLOGY.md` — LF.
