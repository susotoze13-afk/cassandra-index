// forward-anchors.js — схема форвардного якоря (R15, Method 3.0 §9):
// до записи недели редактор фиксирует ожидаемый кластер состояния в
// calc/input/anchors/forward-<week>.json, после записи факт попадает в журнал
// калибровки. Схема НЕ совпадает с модельным якорем (anchor): у форвардного
// файла нет input.anchor, поэтому calc/calibrate.js его пропускает.
// Чистый модуль: ни диска, ни сети.

// Идентификаторы состояний — из js/risk.js SCALE (шестое состояние 97–100
// включается), плюс честный отказ редактора 'unknown'.
export const CLUSTERS = ['calm', 'tense', 'danger', 'very', 'critical', 'extreme', 'unknown'];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Дата без времени: YYYY-MM-DD и существующий календарный день. Date.parse
// один пропускает 2026-02-30 (нормализует), поэтому сверяем обратной сборкой.
function isCalendarDate(value) {
  if (typeof value !== 'string' || !DATE_RE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return false;
  return d.toISOString().slice(0, 10) === value;
}

// ISO-момент: дата или дата-время. Пустая/неразборчивая строка — ошибка.
function isIsoDate(value) {
  if (typeof value !== 'string' || value.trim() === '') return false;
  return !Number.isNaN(Date.parse(value));
}

const nonEmpty = (v) => typeof v === 'string' && v.trim() !== '';

// validateForwardAnchor(obj) → errors[] (пусто = валиден).
// Поля: week, expectedCluster, rationale, author, committedAt, sources[{url}].
// sources может быть пустым массивом — «ожидание без ссылок» допустимо, но
// каждый элемент обязан нести непустой url.
export function validateForwardAnchor(obj) {
  const errors = [];
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return ['forward anchor: expected object'];
  }
  if (!isCalendarDate(obj.week)) {
    errors.push('week: YYYY-MM-DD (existing calendar date)');
  }
  if (!CLUSTERS.includes(obj.expectedCluster)) {
    errors.push(`expectedCluster: must be one of ${CLUSTERS.join(', ')}`);
  }
  // rationale обязателен: для 'unknown' он объясняет отказ, для остальных —
  // на чём стоит ожидание. Пустая строка не считается объяснением.
  if (!nonEmpty(obj.rationale)) {
    errors.push('rationale: non-empty string');
  }
  if (!nonEmpty(obj.author)) {
    errors.push('author: non-empty string');
  }
  if (!isIsoDate(obj.committedAt)) {
    errors.push('committedAt: ISO date or datetime');
  }
  if (!Array.isArray(obj.sources)) {
    errors.push('sources: array of { url: non-empty string }');
  } else {
    const bad = obj.sources.some(
      (s) => !s || typeof s !== 'object' || Array.isArray(s) || !nonEmpty(s.url),
    );
    if (bad) errors.push('sources: array of { url: non-empty string }');
  }
  return errors;
}
