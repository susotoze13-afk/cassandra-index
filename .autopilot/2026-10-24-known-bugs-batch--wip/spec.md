# Спецификация: известные баги из PROGRESS.md — пакетная починка

## Задача

В проекте накопился список из 13 мелких известных багов (docs/правки, тесты, calc/).
Владелец страдает тем, что PROGRESS.md не убывает: баги мелкие, но каждый либо врёт
в документации контракта, либо оставляет дыру в тестах/валидаторах, либо путает при
эксплуатации (печать, SVG, чтение боевого каталога).

## Решение

Чиним все 13 пунктов брифа. Два из них (R01, R02) оказались уже исправлены коммитом
F1 (`0921db8`) прошлого прогона — перепроверены по коду, правка не нужна. Остальные
11: 4 правки документации `docs/api.md` и двух `.md` прогона, 3 правки тестов
(сторож api.md, nullable-покрытие, пин MAX_DISCREPANCIES), 4 правки calc/
(ledger anchorsDir + документирование трактовки `verified:null`; пометка ACLED-2026-10;
печать «водопад»; сегменты trend.svg; проверка id источника в quotes). Производные
файлы пересобираются штатными CLI. Поведение расчёта, снапшоты недель, глобальный
ряд — не меняются. `js/**` не трогаем.

## Истории

| # | Метка | История | Приёмка |
|---|-------|---------|---------|
| 1 | R01 | Комментарий гипотетик в params.js завершён | уже сделано в 0921db8, перепроверено |
| 2 | R02 | Тест гипотетик подменяет 0.42 и не сравнивает с самим собой | уже сделано в 0921db8, перепроверено |
| 3 | R03 | В docs/preproduction-decisions.md:65 вписан хеш `bc35393` (+`0921db8`), в docs/regional-iwith-degeneracy.md:9 — хеш `bc35393`, в формате «коммит bc35393 (autopilot-прогон regional-iwith-degeneracy, 2026-10-24)» | обе ссылки с хешем |
| 4 | R04 | В docs/api.md:60 из строки про `methodology` убран `index.json`; формулировка :10 уточнена | docs совпадает со схемой envelopeSchema (additionalProperties:false) |
| 5 | R05 | docs/api.md:398 переписана по правде: выпуск пересобирается из текущего снапшота при каждом `--write` по этой неделе; недели вне списка не трогаются. Заодно уточнён комментарий-шапка calc/digest-export.js:8-9 («дополняются, а не стираются» — неточно про перезапись запрошенной недели). tests/digest.test.js проверяется на пин старой формулировки | docs и шапка не врут; тесты зелёные |
| 6 | R06 | docs/api.md: «(до 12 записей)» получает пин: в tests/public-contract.test.js (или tests/backtest-сколько-годится) тест, импортирующий `MAX_DISCREPANCIES` из calc/backtest.js и проверяющий, что docs/api.md содержит это число. Все примеры JSON с «…» (:87, :90, :265-266, :283, :308, :317-319, :410, :418, :422, :451-452) заменены на валидный JSON (укороченные реальные объекты без многоточий; пояснения — текстом вне блока кода) | JSON-примеры парсятся; пин-тест зелёный |
| 7 | R07 | Сторож tests/public-contract.test.js:335-343 усилен: путь засчитывается только по вхождению с не-буквенно-цифровыми границами (или как строка таблицы эндпоинтов), не как подстрока внутри чужого URL | поддельный файл, упомянутый только внутри доменного URL, сторожем отклоняется; реальные пути проходят |
| 8 | R08 | Тест «схемы: nullable-поля допускают null» (tests/public-contract.test.js:353-371) расширен мутациями на ВСЕ nullable-пути из notes §8: week ($defs/week — driver_breakdown.score/confidence/weight/weight_effective, what_would_change.state, thresholds.down/up, criteria[].driver/dir, published/through/methodology, index/delta, state/q/confidence, coverage_criteria, regions[].index/delta, precursor, drivers[].label.ru/en, drivers[].contribution, waterfall, what_would_change, trend[].value), validation (levels/deltas.spearman/p_permutation, overlap.from/to, direction.rate, lead_lag.by_lag[].pearson, note), regions (admin_center), ledger (verified, expectedCluster/expectedDirection, actualIndex/actualCluster/actualDelta/actualDirection, misses[].expected/actual) | все легальные null принимаются схемами; тест зелёный |
| 9 | R09 | (а) В docs/api.md:476-477 трактовка `verified:null` дописана: `outcome.cluster === 'pending'` + `actualIndex === null` → неделя не опубликована; иначе при `verified:null` → git-история недели недоступна. description поля verified в FORECAST_LEDGER_SCHEMA (calc/public-contract.js:917-923) уточнён тем же текстом. (б) В calc/ledger.js `writeLedger` и `buildLedger`: дефолт каталога якорей — `path.join(rootDir, 'calc', 'input', 'anchors')` вместо абсолютного ANCHORS_DIR модуля; пин-тест в tests/ledger.test.js: writeLedger с tmp-root и anchors в нём, без anchorsDir, не читает боевой каталог | документация различает причины без нового поля; --root не тянет боевые якоря; тест зелёный |
| 10 | R10 | calc/backtest.js: у компаратора ACLED, у которого последний месяц ряда неполный (as_of 2026-10-09 при наличии точки 2026-10), заполняется существующее nullable-поле `note` текстом «ряд 2026-10 неполный (as_of 2026-10-09)» и печатается пометка в comparatorLine/сводке main. docs/api.md (раздел validation.json, ~:432-439) — строка про as_of неполного месяца. После правки `node calc/backtest.js --write` — validation.json/validation.html пересобраны | в validation.json у ACLED-2026-10 заполнен note; в консоли пометка видна; новых полей нет |
| 11 | R11 | calc/public-export.js:604-606,621-622: печать водопада различает «по правилам не строится» и «не построился»: при null выводится причина из loadAnalysisFromDisk (нет входа недели / первая неделя цепочки / смена methodology у prev), при объекте — «есть» | прогон с --root без входов печатает причину, а не обманчивое «нет» |
| 12 | R12 | calc/public-export.js toTrendSvg: точки тренда разбиваются на сегменты по смене `methodology`; каждый сегмент — свой `<polyline>` (сохраняются все 12 точек, разрыв между 1.0 и 3.0); заголовок уточнён (индекс за N недель, версии указаны). После правки `node calc/public-export.js --write` — trend.svg пересобран | в trend.svg две полилинии с разрывом на границе версий; схемы и пины тренда не сломаны |
| 13 | R13 | calc/quotes.js verifyQuotes: id источника, не подходящий под `^[A-Za-z0-9_-]+$`, отклоняется ошибкой `sources[i].id: unsafe id` до чтения корпуса (проверка совместима с реальными id входов 09-20/09-27). Тест в tests/quotes.test.js: id `'../secret'` с поддельным readText-шовым — ошибка, а не чтение вне corpusDir | traversal-запрос не читает файлы вне корпуса; тест зелёный |

## Решения по реализации

- Стек и конвенции — существующие (ноль зависимостей, ESM, node --test). js/** не
  задевается → `node build.js` не нужен.
- Производные пересобираются только штатными CLI: `backtest.js --write` (R10),
  `public-export.js --write` (R11/R12) — после их тикетов; руками не правятся.
- Новых полей в существующих публичных файлах нет (договорённость): R09 решается
  документированием пары `(outcome, actualIndex)`, R10 — существующим nullable `note`.
- Схемы JSON не меняются, кроме текстового description у `verified` (R09) — текст
  описания, не структура.
- Формат хеш-коммитов в docs: «коммит bc35393 (autopilot-прогон regional-iwith-degeneracy,
  2026-10-24)».

## Границы и швы

См. `interfaces.md`.

## Вне рамок

| Требование | Почему не сейчас |
|---|---|
| «Не доделано» прошлой сборки (O11 пересчёт истории, ACLED-композит, lead/lag, форвардные якоря) | пользователь (2026-10-24): «Нет» — не берём в этот прогон |
| `git clone`/CRLF-проблема двух тестов на Windows | окружение, не код; известно, лечится настройкой git |
| Сторож docs/api.md — ложная тревога | маловероятна (путь либо есть, либо нет); чиним только ложное прохождение |

## Открытые места

Нет — все строки закрыты кодом или документацией, placeholder'ы не нужны.
