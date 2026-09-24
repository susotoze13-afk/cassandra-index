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
  if (!s || typeof s !== 'object') return false;
  if (!isLocalized(s.title) || typeof s.url !== 'string' || typeof s.domain !== 'string') {
    return false;
  }
  // Легаси-схема демо-недель: скалярная дата публикации.
  if (typeof s.date === 'string') return true;
  // Полная схема ingestion (R55): обязательные поля новой записи.
  return (
    typeof s.id === 'string' &&
    typeof s.publication_date === 'string' &&
    typeof s.accessed_date === 'string' &&
    ['primary', 'secondary', 'OSINT'].includes(s.source_type) &&
    typeof s.cluster_id === 'string' &&
    typeof s.state_affiliated === 'boolean'
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
  // global: null допускается только при insufficient/unavailable; неделя
  // insufficient обязана иметь global:null (публикация запрещена, R11–R13).
  const nullGlobalAllowed = snapshot.dataState === 'insufficient' || snapshot.dataState === 'unavailable';
  if (snapshot.global === null || snapshot.global === undefined) {
    if (!nullGlobalAllowed) {
      errors.push('global: null allowed only when dataState is insufficient or unavailable');
    }
  } else if (!isIndex(snapshot.global.index) || !isDelta(snapshot.global.delta)) {
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
      if (!p || !DATE_RE.test(p.date ?? '')) {
        errors.push(`trend[${i}]: { date: YYYY-MM-DD, value: 0..100 } required`);
        return;
      }
      // Точка может нести methodology (версия снапшота недели точки);
      // value:null — только с methodology: неделя не опубликована.
      if (p.methodology !== undefined && typeof p.methodology !== 'string') {
        errors.push(`trend[${i}]: methodology must be a string`);
      }
      const nullPoint = p.value === null && typeof p.methodology === 'string' && p.methodology !== '';
      if (!isIndex(p.value) && !nullPoint) {
        errors.push(`trend[${i}]: { date: YYYY-MM-DD, value: 0..100 } required (value:null only with methodology)`);
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
  validateQuality(snapshot, errors);
  return { ok: errors.length === 0, errors };
}

// Опциональные поля качества публикации (таск 05): q, nullWeight, confidence,
// coverage, preview, recalc, incompleteCoverage. Старые снапшоты без них —
// валидны. Неделя insufficient обязана нести полное описание непубликации.
const CONFIDENCES = ['full', 'reduced', 'none'];

function isUnitInterval(v) {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1;
}

function validateQuality(snapshot, errors) {
  if (snapshot.q !== undefined && !isUnitInterval(snapshot.q)) {
    errors.push('q: number 0..1');
  }
  if (snapshot.nullWeight !== undefined && !isUnitInterval(snapshot.nullWeight)) {
    errors.push('nullWeight: number 0..1');
  }
  if (snapshot.confidence !== undefined && !CONFIDENCES.includes(snapshot.confidence)) {
    errors.push(`confidence: must be one of ${CONFIDENCES.join(', ')}`);
  }
  if (snapshot.coverage !== undefined) {
    const c = snapshot.coverage;
    const ok =
      !!c && typeof c === 'object' &&
      Number.isInteger(c.coveredDrivers) && c.coveredDrivers >= 0 &&
      Number.isInteger(c.totalDrivers) && c.totalDrivers > 0;
    if (!ok) errors.push('coverage: { coveredDrivers: int >= 0, totalDrivers: int > 0 }');
  }
  if (snapshot.preview !== undefined) {
    const p = snapshot.preview;
    if (!p || !isIndex(p.index) || !isDelta(p.internal)) {
      errors.push('preview: { index: 0..100, internal: number }');
    }
  }
  if (snapshot.recalc !== undefined) {
    const r = snapshot.recalc;
    const ok =
      !!r && typeof r === 'object' &&
      typeof r.at === 'string' && !Number.isNaN(Date.parse(r.at)) &&
      typeof r.reason === 'string' && r.reason !== '' &&
      (r.previous === null || isIndex(r.previous)) &&
      typeof r.methodologyBefore === 'string' && r.methodologyBefore !== '' &&
      typeof r.methodologyAfter === 'string' && r.methodologyAfter !== '' &&
      typeof r.approvedBy === 'string' && r.approvedBy !== '';
    if (!ok) errors.push('recalc: { at: ISO datetime, reason, previous: 0..100|null, methodologyBefore, methodologyAfter, approvedBy }');
  }
  if (snapshot.incompleteCoverage !== undefined && typeof snapshot.incompleteCoverage !== 'boolean') {
    errors.push('incompleteCoverage: boolean');
  }

  if (snapshot.dataState === 'insufficient') {
    if (snapshot.global !== null) {
      errors.push('insufficient: global must be null (publication blocked)');
    }
    if (!isUnitInterval(snapshot.q)) errors.push('insufficient: q (0..1) required');
    if (!isUnitInterval(snapshot.nullWeight)) errors.push('insufficient: nullWeight (0..1) required');
    if (snapshot.confidence !== 'none') errors.push("insufficient: confidence must be 'none'");
    if (snapshot.coverage === undefined) errors.push('insufficient: coverage required');
    if (snapshot.preview === undefined) errors.push('insufficient: preview { index, internal } required');
  }
}
