// Соглашение о дате покрытия (R02, R02.1): through снапшота недели цепочки
// = дата недели (конец окна анализа W−7…W включительно), а не дата прежнего
// снапшота. Шов — renderGlobal из calc/calc.js; ожидаемые значения — из
// спецификации (история 1: through "2026-09-20" у недели 20.09).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderGlobal } from '../calc/calc.js';

// Снапшот как на диске: published/through/methodology. through указывает на
// предыдущую неделю — по старому соглашению; новое — дата самой недели.
const SNAP = {
  published: '2026-09-20',
  through: '2026-09-13',
  methodology: '1.0',
};
const META = {
  dataState: 'published',
  q: 0.9,
  nullWeight: 0.1,
  coverage: { coveredDrivers: 9, totalDrivers: 9 },
  confidence: 'full',
  recalc: { at: '2026-09-26T00:00:00.000Z', reason: 'Еженедельный пересчёт' },
};
const GLOBAL_OUT = { index: 55, delta: -2 };

test('renderGlobal: through = дата недели, даже если на диске — дата предыдущей', () => {
  const out = renderGlobal('2026-09-20', SNAP, GLOBAL_OUT, META);
  assert.ok(out.includes('  s.through = "2026-09-20";'), out);
});

test('renderGlobal: старое through не утекает в файл, published/methodology — как были', () => {
  const out = renderGlobal('2026-09-20', SNAP, GLOBAL_OUT, META);
  assert.ok(!out.includes('2026-09-13";'), out);
  assert.ok(out.includes('  s.published = "2026-09-20";'), out);
  assert.ok(out.includes('  s.methodology = "1.0";'), out);
});
