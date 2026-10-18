// precursor.js — публичный слой Д9 (§4.3.6 METHODOLOGY): процент скора Д9 без
// ограничителя §4.3.5 и число сигналящих подгрупп. Слой не входит в индекс и
// не сравнивается с ним — это доля сигналов, а не второй индекс.
// Чистый модуль: как считается score, решает engine.aggregateD9; здесь только
// форма публикации.

// drivers — массив драйверов buildDrivers: Д9 = {id:'D9', score, confidence,
// signalingSubgroups}. null без числового score/счётчика (слепой или битый Д9):
// пустой плашки на неделе не будет.
export function precursorOf(drivers) {
  const list = Array.isArray(drivers) ? drivers : [];
  const d9 = list.find((d) => d && d.id === 'D9');
  if (!d9) return null;
  if (typeof d9.score !== 'number' || !Number.isFinite(d9.score)) return null;
  if (typeof d9.signalingSubgroups !== 'number' || !Number.isFinite(d9.signalingSubgroups)) return null;
  const value = Math.min(100, Math.max(0, Math.round(d9.score * 100)));
  return { value, signalingSubgroups: d9.signalingSubgroups };
}
