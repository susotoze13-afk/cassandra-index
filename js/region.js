// Справочник: 6 регионов + города для поиска (Решения по реализации п.5, п.6).
export const REGIONS = [
  {
    id: 'europe',
    name: { ru: 'Европа', en: 'Europe' },
    city: { ru: 'Амстердам', en: 'Amsterdam' },
    prefixes: ['Europe/'],
  },
  {
    id: 'east-asia',
    name: { ru: 'Восточная Азия', en: 'East Asia' },
    city: { ru: 'Токио', en: 'Tokyo' },
    prefixes: [
      'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Hong_Kong', 'Asia/Macau', 'Asia/Taipei',
      'Asia/Seoul', 'Asia/Pyongyang', 'Asia/Singapore', 'Asia/Jakarta', 'Asia/Bangkok', 'Asia/Manila',
    ],
  },
  {
    id: 'middle-east',
    name: { ru: 'Ближний Восток', en: 'Middle East' },
    city: { ru: 'Бейрут', en: 'Beirut' },
    prefixes: [
      'Asia/Beirut', 'Asia/Damascus', 'Asia/Jerusalem', 'Asia/Riyadh', 'Asia/Dubai',
      'Asia/Qatar', 'Asia/Kuwait', 'Asia/Baghdad', 'Asia/Tehran', 'Asia/Amman',
    ],
  },
  {
    id: 'north-america',
    name: { ru: 'Северная Америка', en: 'North America' },
    city: { ru: 'Вашингтон', en: 'Washington' },
    prefixes: [
      'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
      'America/Toronto', 'America/Vancouver', 'America/Mexico_City', 'America/Halifax', 'US/', 'Canada/',
    ],
  },
  {
    id: 'south-asia',
    name: { ru: 'Южная Азия', en: 'South Asia' },
    city: { ru: 'Нью-Дели', en: 'New Delhi' },
    prefixes: ['Asia/Kolkata', 'Asia/Karachi', 'Asia/Kathmandu', 'Asia/Dhaka', 'Asia/Colombo', 'Asia/Kabul'],
  },
  {
    id: 'africa',
    name: { ru: 'Африка', en: 'Africa' },
    city: { ru: 'Найроби', en: 'Nairobi' },
    prefixes: ['Africa/'],
  },
];

export const CITIES = [
  { name: { ru: 'Амстердам', en: 'Amsterdam' }, region: 'europe' },
  { name: { ru: 'Берлин', en: 'Berlin' }, region: 'europe' },
  { name: { ru: 'Париж', en: 'Paris' }, region: 'europe' },
  { name: { ru: 'Лондон', en: 'London' }, region: 'europe' },
  { name: { ru: 'Варшава', en: 'Warsaw' }, region: 'europe' },
  { name: { ru: 'Москва', en: 'Moscow' }, region: 'europe' },
  { name: { ru: 'Киев', en: 'Kyiv' }, region: 'europe' },
  { name: { ru: 'Токио', en: 'Tokyo' }, region: 'east-asia' },
  { name: { ru: 'Пекин', en: 'Beijing' }, region: 'east-asia' },
  { name: { ru: 'Шанхай', en: 'Shanghai' }, region: 'east-asia' },
  { name: { ru: 'Гонконг', en: 'Hong Kong' }, region: 'east-asia' },
  { name: { ru: 'Сеул', en: 'Seoul' }, region: 'east-asia' },
  { name: { ru: 'Тайбэй', en: 'Taipei' }, region: 'east-asia' },
  { name: { ru: 'Сингапур', en: 'Singapore' }, region: 'east-asia' },
  { name: { ru: 'Бейрут', en: 'Beirut' }, region: 'middle-east' },
  { name: { ru: 'Иерусалим', en: 'Jerusalem' }, region: 'middle-east' },
  { name: { ru: 'Дубай', en: 'Dubai' }, region: 'middle-east' },
  { name: { ru: 'Эр-Рияд', en: 'Riyadh' }, region: 'middle-east' },
  { name: { ru: 'Тегеран', en: 'Tehran' }, region: 'middle-east' },
  { name: { ru: 'Вашингтон', en: 'Washington' }, region: 'north-america' },
  { name: { ru: 'Нью-Йорк', en: 'New York' }, region: 'north-america' },
  { name: { ru: 'Лос-Анджелес', en: 'Los Angeles' }, region: 'north-america' },
  { name: { ru: 'Торонто', en: 'Toronto' }, region: 'north-america' },
  { name: { ru: 'Ванкувер', en: 'Vancouver' }, region: 'north-america' },
  { name: { ru: 'Нью-Дели', en: 'New Delhi' }, region: 'south-asia' },
  { name: { ru: 'Мумбаи', en: 'Mumbai' }, region: 'south-asia' },
  { name: { ru: 'Карачи', en: 'Karachi' }, region: 'south-asia' },
  { name: { ru: 'Катманду', en: 'Kathmandu' }, region: 'south-asia' },
  { name: { ru: 'Дакка', en: 'Dhaka' }, region: 'south-asia' },
  { name: { ru: 'Найроби', en: 'Nairobi' }, region: 'africa' },
  { name: { ru: 'Каир', en: 'Cairo' }, region: 'africa' },
  { name: { ru: 'Лагос', en: 'Lagos' }, region: 'africa' },
  { name: { ru: 'Йоханнесбург', en: 'Johannesburg' }, region: 'africa' },
  { name: { ru: 'Аккра', en: 'Accra' }, region: 'africa' },
];

const LS_KEY = 'cassandra.region';
const SS_KEY = 'cassandra.region.session';

// ---------- Версионированный справочник регионов (data/regions/reference.*) ----------
// Канонический источник — data/regions/reference.json (ISO 3166-2, админцентры,
// политика спорных территорий, версия методологии). Сайт читает его через
// data/regions/reference.js (window.CI_REGION_REF) — fetch на file:// невозможен.

// Ссылка на справочник, если загрузчик не подключён (тесты, вне браузера).
// Значения — зеркало data/regions/reference.json (синхрон проверяется тестом).
const LADDER_FALLBACK = { city: 80, region: 90, floor: 50 };

export function reference() {
  const g = typeof globalThis !== 'undefined' ? globalThis : {};
  return g.CI_REGION_REF ?? g.window?.CI_REGION_REF ?? null;
}

// Лестница «что показывать по уверенности» (История 37, R38) — детерминированная
// чистая функция, готовая к edge-слою. Две независимые оси:
//   город:   cityConf ≥ 80% → город; 50–80% → админцентр; null → города нет;
//   регион:  regionConf ≥ 90% → атрибуция к региону; 50–90% → только страна;
//   любая ось < 50% (или регион не определён) → глобальный индекс.
// conf: {cityConf, regionConf, city, adminCenter, regionId} — доли 0..1.
// Возвращает {level, place, regionId}: level 'city'|'adminCenter'|'region'|
// 'country'|'global'; place — показываемый город (null, если level не городской).
export function representative(conf = {}, ladder) {
  const ld = ladder ?? reference()?.confidenceLadder ?? LADDER_FALLBACK;
  const cityConf = conf.cityConf ?? null;
  const regionConf = conf.regionConf ?? null;
  const regionId = conf.regionId ?? null;
  const globalResult = { level: 'global', place: null, regionId: null };
  if (!regionId) return globalResult;
  if (regionConf === null || regionConf * 100 < ld.floor) return globalResult;
  if (cityConf !== null && cityConf * 100 < ld.floor) return globalResult;
  if (regionConf * 100 < ld.region) {
    return { level: 'country', place: null, regionId };
  }
  if (cityConf === null) return { level: 'region', place: null, regionId };
  if (cityConf * 100 >= ld.city) {
    return { level: 'city', place: conf.city ?? null, regionId };
  }
  return { level: 'adminCenter', place: conf.adminCenter ?? null, regionId };
}

// ---------- Согласие на автоматическое определение региона (R49–R51, A4) ----------
// Opt-in для всех: без granted детект не вызывается и регион не сохраняется.
// Запись: {v, status:'granted'|'denied', at, deniedUntil} в localStorage;
// denied действует до denied_until (30 дней тишины), затем запрос повторяется.

export const CONSENT_DENY_DAYS = 30;

export const consent = {
  KEY: 'cassandra.region.consent',

  // {status:'granted'|'denied'|null, at, deniedUntil} — 'denied' только пока
  // действует denied_until; истёкший отказ приравнивается к отсутствию ответа.
  status() {
    const ls = storage('local');
    if (!ls) return { status: null, at: null, deniedUntil: null };
    let raw = null;
    try {
      raw = JSON.parse(ls.getItem(this.KEY) ?? 'null');
    } catch {
      raw = null;
    }
    if (!raw || (raw.status !== 'granted' && raw.status !== 'denied')) {
      return { status: null, at: null, deniedUntil: null };
    }
    if (raw.status === 'denied' && raw.deniedUntil && Date.parse(raw.deniedUntil) > Date.now()) {
      return { status: 'denied', at: raw.at ?? null, deniedUntil: raw.deniedUntil };
    }
    if (raw.status === 'denied') {
      return { status: null, at: null, deniedUntil: null };
    }
    return { status: 'granted', at: raw.at ?? null, deniedUntil: null };
  },

  // «Согласен» в toast: разрешает tz-детект и сохранение региона.
  grant() {
    const ls = storage('local');
    if (!ls) return false;
    try {
      ls.setItem(this.KEY, JSON.stringify({ v: 1, status: 'granted', at: new Date().toISOString(), deniedUntil: null }));
      return true;
    } catch {
      return false;
    }
  },

  // «Закрыть» в toast: отказ — повторный запрос не раньше denied_until.
  dismiss() {
    const ls = storage('local');
    if (!ls) return false;
    const at = new Date();
    const until = new Date(at.getTime() + CONSENT_DENY_DAYS * 86400_000);
    try {
      ls.setItem(this.KEY, JSON.stringify({
        v: 1, status: 'denied', at: at.toISOString(), deniedUntil: until.toISOString(),
      }));
      return true;
    } catch {
      return false;
    }
  },
};

export function get(id) {
  return REGIONS.find((r) => r.id === id) ?? null;
}

// Детект по IANA-префиксам часового пояса браузера; неизвестный пояс → null.
export function detect(tz) {
  if (typeof tz !== 'string' || !tz) return null;
  for (const r of REGIONS) {
    if (r.prefixes.some((p) => tz === p || tz.startsWith(p))) return r.id;
  }
  return null;
}

function storage(kind) {
  try {
    if (kind === 'local' && typeof localStorage !== 'undefined') return localStorage;
    if (kind === 'session' && typeof sessionStorage !== 'undefined') return sessionStorage;
  } catch {
    /* доступ к хранилищу может быть запрещён — считаем его отсутствующим */
  }
  return null;
}

// Выбор пользователя: localStorage (только при явном persist) → session → null.
export function current() {
  const ls = storage('local');
  if (ls) {
    const v = ls.getItem(LS_KEY);
    if (v && get(v)) return v;
  }
  const ss = storage('session');
  if (ss) {
    const v = ss.getItem(SS_KEY);
    if (v && get(v)) return v;
  }
  return null;
}

// choose(id, { persist }) — persist=true пишет в localStorage, иначе выбор живёт в сессии.
// Автосохранения нет: persist — только явное действие («Запомнить» в пикере).
export function choose(id, { persist = false } = {}) {
  const r = get(id);
  if (!r) return null;
  const ss = storage('session');
  if (ss) ss.setItem(SS_KEY, id);
  if (persist) {
    const ls = storage('local');
    if (ls) ls.setItem(LS_KEY, id);
  }
  return r;
}

// Поиск по справочнику городов и названиям регионов; регистронезависимый.
export function search(q) {
  const s = (q ?? '').trim().toLowerCase();
  if (!s) return CITIES.map((c) => ({ ...c, regionName: get(c.region).name }));
  const out = [];
  for (const c of CITIES) {
    const region = get(c.region);
    const hay = `${c.name.ru} ${c.name.en} ${region.name.ru} ${region.name.en}`.toLowerCase();
    if (hay.includes(s)) out.push({ ...c, regionName: region.name });
  }
  return out;
}
