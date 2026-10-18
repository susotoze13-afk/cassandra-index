# 02 — Поле precursor в расчёте и контракте, форвардные якоря

**Требования:** R07, R12, R13, R15, R19, R20i
**Зависит от:** 01
**Зона:** `calc/precursor.js` · `calc/forward-anchors.js` · `calc/calc.js` · `calc/calibrate.js` · `js/data.js` · `tests/precursor.test.js` · `tests/forward-anchors.test.js` · `tests/data.test.js` · `tests/calibrate.test.js`
**Волна:** 2
**Ревью:** да — фундамент
**Модель:** сильная

## Что должно заработать

`runWeek` считает слой Д9 тем же числом, что обещает §4.3.6, и `writeWeek` пишет его в
`global.js` полем `precursor: {value, signalingSubgroups}` — только у недель, записанных
новым кодом. Контракт `js/data.js` принимает поле опционально и отвергает битую форму.
Форвардный якорь `calc/input/anchors/forward-<week>.json` проверяется чистым валидатором и
не ломает `calc/calibrate.js`, который теперь пропускает файлы без `anchor`.

## Из брифа, дословно

> «реализовать как отдельный показатель рядом с главным индексом»

> «forward-only с 10-25, историю 08-30…10-18 не трогаем»

> «calc/input/anchors/forward-<week>.json: {week, expectedCluster, rationale, author,
> committedAt, sources[]}, коммит до --write; допустимо unknown с причиной»

## Разделы спецификации

Истории 11, 15, 21–23a, 25–27, 31, 32; «Решение» пункты про слой, контракт и форвардные
якоря; `interfaces.md` — модули `calc/precursor.js`, `calc/forward-anchors.js`,
`calc/calibrate.js` и `js/data.js`.

## Критерии приёмки

- [ ] `calc/precursor.js` экспортирует `precursorOf(drivers)`: `null` без числового `D9`,
      иначе `{value: round(score·100), signalingSubgroups}`; тест на 0, середину, 1 и `null`
- [ ] `runWeek` кладёт `precursor` в результат; `writeWeek` — в `meta` и `full`;
      `renderGlobal` пишет поле в `global.js` только когда оно есть
- [ ] `js/data.js` принимает `precursor` опционально и валидирует `{value:int 0..100,
      signalingSubgroups:int 0..8}`; битая форма → ошибка контракта, отсутствие → валидно
- [ ] `calc/forward-anchors.js` экспортирует `CLUSTERS` (7 значений: шесть состояний
      `js/risk.js` + `unknown`) и `validateForwardAnchor`: битая дата, неизвестный кластер,
      пустой `rationale` у `unknown`, пустой `author`, пустые `sources[].url` → ошибки
- [ ] `calc/calibrate.js` `loadAnchors` пропускает JSON без `input.anchor`; CLI-прогон
      калибровки даёт те же 10 якорей и те же индексы (81/99/91, 8/33/50/51/69/72/73)
- [ ] Ни один файл `data/<неделя>/` не изменён; пины `tests/data.test.js` не тронуты
- [ ] `node --test` зелёный; новые тесты падают на коде до правки
