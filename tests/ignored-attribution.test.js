// R01.2 / ADR 0022: региональная атрибуция критериев Д2, Д4 и Д9 (кроме Д9.3)
// в агрегацию региональных сигналов не входит — эффект этих драйверов на регион
// идёт через экспозицию (eStruct/eDyn). Молчаливого игнора не должно быть:
// calc.js печатает предупреждение со списком таких критериев. Шов —
// ignoredRegionalAttribution из calc/calc.js (чистая функция).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ignoredRegionalAttribution } from '../calc/calc.js';

const entry = (regions) => ({ value: 1, covered: true, regions });

test('ignoredRegionalAttribution: Д2, Д4 и Д9 (кроме Д9.3) с regions[] — в списке игнора', () => {
  const criteria = {
    'D2.1': entry(['europe']),
    'D4.6': entry(['east-asia']),
    'D9.1': entry(['middle-east']),
  };
  assert.deepEqual(ignoredRegionalAttribution(criteria), ['D2.1', 'D4.6', 'D9.1']);
});

test('ignoredRegionalAttribution: Д1 и Д9.3 с regions[] — не игнорируются', () => {
  const criteria = {
    'D1.1': entry(['europe']),
    'D9.3': entry(['south-asia']),
    'D5.1': entry(['africa']),
  };
  assert.deepEqual(ignoredRegionalAttribution(criteria), []);
});

test('ignoredRegionalAttribution: непокрытые, без regions[] и неизвестные id — пропускаются', () => {
  const criteria = {
    'D4.6': { value: 1, covered: false, regions: ['europe'] },
    'D4.2': { value: 1, covered: true },
    'D2.1': { value: 1, covered: true, regions: [] },
    'X.1': entry(['europe']),
  };
  assert.deepEqual(ignoredRegionalAttribution(criteria), []);
  assert.deepEqual(ignoredRegionalAttribution(null), []);
  assert.deepEqual(ignoredRegionalAttribution({}), []);
});
