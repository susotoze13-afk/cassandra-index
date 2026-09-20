// data.js — чтение снапшотов из window.CI_DATA (заполненного script-тегами, без fetch),
// указатель latest, схема validate. Битый/отсутствующий снапшот → «Model unavailable»
// в данных + событие ci:datastate, не падение.

export const DATA_STATES = ['published', 'updating', 'delayed', 'insufficient', 'unavailable'];
export const REGION_IDS = ['europe', 'east-asia', 'middle-east', 'north-america', 'south-asia', 'africa'];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const LEVELS = ['high', 'medium', 'low'];

function ciData() {
  const root = typeof window !== 'undefined' ? window : globalThis;
  return root.CI_DATA ?? null;
}

function emit(state, detail) {
  if (typeof document === 'undefined' || typeof CustomEvent === 'undefined') return;
  if (typeof document.dispatchEvent !== 'function') return;
  document.dispatchEvent(new CustomEvent('ci:datastate', { detail: { state, ...detail } }));
}

function unavailable(date, errors) {
  emit('unavailable', { date, errors });
  return {
    date: date ?? null,
    dataState: 'unavailable',
    unavailable: true,
    errors,
    global: null,
    regions: {},
    trend: [],
    drivers: [],
    sources: [],
  };
}

export function latest() {
  return ciData()?.latest ?? null;
}

export function listWeeks() {
  const d = ciData();
  if (!d || !d.snapshots) return [];
  return Object.keys(d.snapshots).sort();
}

// week(date?) — снапшот по дате (или latest); валидирует и отдаёт с date-меткой.
// Битый файл → синтетический снапшот { dataState: 'unavailable', unavailable: true, errors }.
export function week(date) {
  const d = ciData();
  const key = date ?? d?.latest ?? null;
  if (!key || !d?.snapshots?.[key]) {
    return unavailable(key, key ? [`snapshot not found: ${key}`] : ['no CI_DATA']);
  }
  const v = validate(d.snapshots[key]);
  if (!v.ok) return unavailable(key, v.errors);
  return { ...d.snapshots[key], date: key };
}

function isIndex(v) {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 100;
}

function isDelta(v) {
  return typeof v === 'number' && Number.isFinite(v);
}

function isLocalized(v) {
  return !!v && typeof v === 'object' && typeof v.ru === 'string' && typeof v.en === 'string';
}

function isSource(s) {
  return (
    !!s &&
    typeof s === 'object' &&
    isLocalized(s.title) &&
    typeof s.url === 'string' &&
    typeof s.domain === 'string' &&
    typeof s.date === 'string'
  );
}

// validate(snapshot) → { ok, errors[] }. Схема — контракт данных из interfaces.md.
export function validate(snapshot) {
  const errors = [];
  if (!snapshot || typeof snapshot !== 'object') {
    return { ok: false, errors: ['snapshot is not an object'] };
  }
  if (typeof snapshot.published !== 'string' || !DATE_RE.test(snapshot.published)) {
    errors.push('published: required YYYY-MM-DD');
  }
  if (typeof snapshot.through !== 'string' || !DATE_RE.test(snapshot.through)) {
    errors.push('through: required YYYY-MM-DD');
  }
  if (typeof snapshot.methodology !== 'string' || !snapshot.methodology) {
    errors.push('methodology: required non-empty string');
  }
  if (!DATA_STATES.includes(snapshot.dataState)) {
    errors.push(`dataState: must be one of ${DATA_STATES.join(', ')}`);
  }
  if (!snapshot.global || !isIndex(snapshot.global.index) || !isDelta(snapshot.global.delta)) {
    errors.push('global: { index: 0..100, delta: number } required');
  }
  if (!snapshot.regions || typeof snapshot.regions !== 'object') {
    errors.push('regions: object required');
  } else {
    for (const id of REGION_IDS) {
      const r = snapshot.regions[id];
      if (!r || !isIndex(r.index) || !isDelta(r.delta)) {
        errors.push(`regions.${id}: { index: 0..100, delta: number } required`);
      }
    }
  }
  if (!Array.isArray(snapshot.trend) || snapshot.trend.length !== 12) {
    errors.push('trend: exactly 12 weekly points required');
  } else {
    snapshot.trend.forEach((p, i) => {
      if (!p || !DATE_RE.test(p.date ?? '') || !isIndex(p.value)) {
        errors.push(`trend[${i}]: { date: YYYY-MM-DD, value: 0..100 } required`);
      }
    });
  }
  if (!Array.isArray(snapshot.drivers) || snapshot.drivers.length !== 3) {
    errors.push('drivers: exactly 3 required');
  } else {
    snapshot.drivers.forEach((drv, i) => {
      const pfx = `drivers[${i}]`;
      if (!isLocalized(drv.observation)) errors.push(`${pfx}.observation: { ru, en } required`);
      if (!isLocalized(drv.why)) errors.push(`${pfx}.why: { ru, en } required`);
      if (!LEVELS.includes(drv.contribution)) errors.push(`${pfx}.contribution: high|medium|low`);
      if (!LEVELS.includes(drv.confidence)) errors.push(`${pfx}.confidence: high|medium|low`);
      if (drv.confidence === 'low' || drv.confidence === 'medium') {
        if (drv.confidenceNote !== undefined && !isLocalized(drv.confidenceNote)) {
          errors.push(`${pfx}.confidenceNote: { ru, en }`);
        }
      }
      if (!Array.isArray(drv.sources) || drv.sources.length < 2 || drv.sources.length > 5) {
        errors.push(`${pfx}.sources: 2..5 required`);
      } else if (!drv.sources.every(isSource)) {
        errors.push(`${pfx}.sources[]: { title:{ru,en}, url, domain, date }`);
      }
    });
  }
  if (!Array.isArray(snapshot.sources) || !snapshot.sources.every(isSource)) {
    errors.push('sources: array of { title:{ru,en}, url, domain, date }');
  }
  return { ok: errors.length === 0, errors };
}
