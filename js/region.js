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
// Первый визит ничего не сохраняет (persist по умолчанию false).
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
