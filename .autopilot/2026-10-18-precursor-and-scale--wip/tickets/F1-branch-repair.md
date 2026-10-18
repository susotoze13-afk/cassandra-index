# F1 — Ремонт ветки: один словарь кластеров, пины контракта и числа

**Требования:** R01, R12, R15
**Зависит от:** —
**Зона:** `docs/calibration-journal.md` · `calc/forward-anchors.js` · `tests/forward-anchors.test.js` · `tests/precursor.test.js` · `calc/calc.js` · `js/i18n.js` · `js/sections/precursor.js` · `js/data.js` · `js/bundle.js` · `js/bundle-privacy.js` · `tests/precursor-ui.test.js`
**Волна:** 4
**Ревью:** да — ремонт ветки
**Модель:** сильная

## Что должно заработать

Журнал, валидатор и словарь состояний называют один и тот же набор кластеров, включая
97–100. Тесты падают, если `CLUSTERS` разойдётся с `SCALE` из `js/risk.js`, если строка
«положить `precursor` в `meta`» исчезнет, если сломается реальное значение недели 10-18,
и если число подгрупп Д9 изменится без правки текста. Число «8» живёт в одном источнике.

## Из брифа, дословно

> «calc/input/anchors/forward-<week>.json: {week, expectedCluster, rationale, author,
> committedAt, sources[]}, коммит до --write; допустимо unknown с причиной»

> ««N сигналящих подгрупп из 8», дисклеймер §4.3.6»

## Разделы спецификации

Истории 13, 21–23a, 25–27; «Решение» (контракт, форвардные якоря).

## Критерии приёмки

- [ ] В `docs/calibration-journal.md` перечень `expectedCluster` совпадает с `CLUSTERS` в
      `calc/forward-anchors.js` и включает `extreme` (97–100); пример файла проходит
      `validateForwardAnchor` без ошибок
- [ ] `tests/forward-anchors.test.js` сверяет `CLUSTERS` с id из `SCALE` (`js/risk.js`) плюс
      `unknown`; расхождение даёт красный тест
- [ ] `tests/precursor.test.js` падает, если убрать строку `writeWeek`, кладущую `precursor`
      в `meta`; значение недели 10-18 закреплено как `{value: 50, signalingSubgroups: 4}`
- [ ] Число подгрупп в тексте (`js/i18n.js`), в `js/sections/precursor.js` и в границе
      контракта (`js/data.js`) берётся из одного источника/сверяется с `D9_SUBGROUPS.length`;
      смена числа в движке даёт красный тест, а не тихую ложь в подписи
- [ ] `node --test` зелёный; `node build.js` пересобрал бандлы
