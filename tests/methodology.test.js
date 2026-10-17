import { test } from 'node:test';
import assert from 'node:assert/strict';
import { thresholdRanges } from '../js/sections/methodology.js';
import { DICTS } from '../js/i18n.js';

// Определение термина из заголовка сайта — обязательный блок раздела
// «Методология»: пользователь не должен читать «Опасно» как «война идёт».
test('определение «глобальный военный конфликт» есть в словаре и не пустое', () => {
  const dict = DICTS.ru;
  assert.equal(typeof dict['method.definition.title'], 'string');
  assert.ok(dict['method.definition.title'].trim().length > 0);
  for (let n = 1; n <= 4; n += 1) {
    const key = `method.definition.${n}`;
    assert.equal(typeof dict[key], 'string', `${key} отсутствует`);
    assert.ok(dict[key].trim().length > 0, `${key} пустой`);
  }
  assert.equal(dict['method.definition.5'], undefined, 'пунктов должно быть ровно четыре');
});

// Диапазоны якорей §10: ожидания взяты из текста спецификации шкалы, не из кода
// под тестом — таблица методологии обязана выводиться из risk.SCALE (таск 11).
test('thresholdRanges: диапазоны совпадают со шкалой §10 дословно', () => {
  assert.deepEqual(thresholdRanges(), ['0–20', '21–40', '41–60', '61–80', '81–96', '97–100']);
});

test('thresholdRanges: 6 строк, границы стыкуются без разрывов и перекрытий', () => {
  const ranges = thresholdRanges();
  assert.equal(ranges.length, 6);
  let next = 0;
  for (const r of ranges) {
    const [lo, hi] = r.split('–').map(Number);
    assert.equal(lo, next);
    assert.ok(hi >= lo);
    next = hi + 1;
  }
  assert.equal(next, 101);
});
