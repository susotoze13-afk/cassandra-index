// engine-attribution.test.js — размерностно-нейтральное ядро атрибуции §7:
// attributedSignals/attributedIndex — та же формула, что regionalSignals/
// regionalIndex, обобщённая по имени атрибутивного поля ('regions' |
// 'countries'). Обёртки с прежними сигнатурами обязаны давать байт-в-байт
// прежний результат (пин всех 13 недель — tests/engine-attribution-parity.test.js).
// Ожидаемые значения — разобранные вручную примеры (формулы §4.2/§5/§7).
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  attributedIndex,
  attributedSignals,
  regionalIndex,
  regionalSignals,
} from '../calc/engine.js';
import { PARAMS, list } from '../calc/params.js';

// --- Эквивалентность обёрток: та же формула, те же числа ---
test('attributedIndex ≡ regionalIndex: сигнальная ветка (nReg > 0)', () => {
  const g = { index: 68, internal: 68.25, delta: 4 };
  const unit = {
    nReg: 3, eStruct: 0.5, eDyn: 0.2, hasDeescSignals: false,
    iWith: 74.1, iWithout: 66.3, prevIndex: 63, prevGlobal: 64,
  };
  assert.deepEqual(attributedIndex(g, unit, PARAMS), regionalIndex(g, unit, PARAMS));
});

test('attributedIndex ≡ regionalIndex: слепая ветка (nReg = 0), прежнее отклонение сохраняется', () => {
  const g = { index: 68, internal: 68.25, delta: 4 };
  const unit = { nReg: 0, prevIndex: 72, prevGlobal: 64 };
  const a = attributedIndex(g, unit, PARAMS);
  const b = regionalIndex(g, unit, PARAMS);
  assert.deepEqual(a, b);
  // Ручной разбор §7: offset = clamp(72 − 64, ±40) = 8 → internal = 68.25 + 8.
  assert.equal(a.background, true);
  assert.equal(a.internal, 76.25);
  assert.equal(a.index, 76);
  assert.equal(a.delta, 4); // 76 − 72
});

test('attributedSignals ≡ regionalSignals: обёртка — прежняя функция для attr="regions"', () => {
  const criteria = {
    'D1.1': { covered: true, value: 2, regions: ['europe', 'africa'], sources: [] },
    'D1.4': { covered: true, value: 1, regions: ['europe'], sources: [] },
    'D3.1': { covered: true, value: 3, regions: ['africa'], sources: [] },
    'D1.6': { covered: true, value: 1, intersection: true, regions: ['europe'], sources: [] },
  };
  const ids = ['europe', 'africa', 'south-asia'];
  assert.deepEqual(
    attributedSignals(criteria, ids, PARAMS, '2026-08-30', 'regions'),
    regionalSignals(criteria, ids, PARAMS, '2026-08-30'),
  );
});

// --- attributedSignals по attr='countries': та же агрегация на страновом поле ---
// Ручной разбор: eligible Д1/Д3; nReg — число записей; eDyn = nReg/nCovered;
// гипотетики — прогоны §5 по подмножествам (точные float не пиним — пинятся
// parity-тестом регионов; здесь — структура и ручные величины nReg/eDyn).
test('attributedSignals: сигналы стран по полю countries[]', () => {
  const criteria = {
    'D1.1': { covered: true, value: 2, countries: ['RU', 'UA'], sources: [] },
    'D1.4': { covered: true, value: 1, countries: ['RU'], sources: [] },
    'D3.1': { covered: true, value: 3, countries: ['UA'], sources: [] },
    // intersection — вторичный учёт: страновая модель его не видит (ADR 0046).
    'D1.6': { covered: true, value: 1, intersection: true, countries: ['RU'], sources: [] },
    // Не-eligible драйверы: Д2/Д4 вся, Д9 кроме Д9.3.
    'D2.1': { covered: true, value: 1, countries: ['RU'], sources: [] },
    'D9.1': { covered: true, value: 1, countries: ['RU'], sources: [] },
  };
  const out = attributedSignals(criteria, ['RU', 'UA', 'FR'], PARAMS, '2026-10-25', 'countries');
  // nCovered считает покрытые не-пересечения: D1.1, D1.4, D3.1, D2.1, D9.1 = 5.
  assert.equal(out.RU.nReg, 2); // D1.1, D1.4
  assert.equal(out.RU.eDyn, 2 / 5);
  assert.equal(out.RU.eStruct, 0.5);
  assert.equal(out.UA.nReg, 2); // D1.1, D3.1
  assert.equal(out.UA.eDyn, 2 / 5);
  assert.equal(out.FR, undefined); // сигналов нет — записи нет
  assert.equal(typeof out.RU.iWith, 'number');
  assert.equal(typeof out.RU.iWithout, 'number');
});

test('attributedSignals: гипотетики без недели — правило действует всегда (порог эпсилон, ADR 0065)', () => {
  const criteria = { 'D1.1': { covered: true, value: 1, countries: ['RU'], sources: [] } };
  const out = attributedSignals(criteria, ['RU'], PARAMS, undefined, 'countries');
  assert.equal(out.RU.nReg, 1);
  assert.ok(out.RU.iWith > 0, 'с эпсилон-порогом одиночный критерий покрывает драйвер');
});

test('attributedSignals: params не мутируется', () => {
  const criteria = { 'D1.1': { covered: true, value: 1, countries: ['RU'], sources: [] } };
  const p = list();
  attributedSignals(criteria, ['RU'], p, '2026-10-25', 'countries');
  assert.deepEqual(p, list());
});
