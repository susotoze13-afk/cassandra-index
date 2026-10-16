// js/region.js — справочник регионов: две таксономии (v1 — легаси для старых
// недель, v2 — текущая, ADR 0028) + города для поиска.
//
// Порядок в REGIONS_V2 важен: detect() возвращает первый совпавший префикс,
// поэтому специфичные пояса идут раньше catch-all 'Europe/'. Российские 'Asia/*'
// стоят выше центральноазиатских.

export const REGIONS_V1 = [
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

// Текущая таксономия (ADR 0028): семь регионов вместо europe + пять макрорегионов.
export const REGIONS_V2 = [
  {
    id: 'russia-belarus',
    name: { ru: 'Россия и Беларусь', en: 'Russia and Belarus' },
    city: { ru: 'Москва', en: 'Moscow' },
    prefixes: [
      'Europe/Moscow', 'Europe/Kaliningrad', 'Europe/Kirov', 'Europe/Samara', 'Europe/Astrakhan',
      'Europe/Saratov', 'Europe/Ulyanovsk', 'Europe/Volgograd',
      'Asia/Yekaterinburg', 'Asia/Omsk', 'Asia/Novosibirsk', 'Asia/Barnaul', 'Asia/Krasnoyarsk',
      'Asia/Irkutsk', 'Asia/Chita', 'Asia/Yakutsk', 'Asia/Vladivostok', 'Asia/Magadan',
      'Asia/Sakhalin', 'Asia/Kamchatka', 'Asia/Anadyr', 'Asia/Novokuznetsk', 'Asia/Tomsk',
      'Asia/Ust-Nera', 'Asia/Srednekolymsk', 'Asia/Khandyga',
      'Europe/Minsk',
    ],
  },
  {
    id: 'ukraine-moldova',
    name: { ru: 'Украина и Молдова', en: 'Ukraine and Moldova' },
    city: { ru: 'Киев', en: 'Kyiv' },
    prefixes: ['Europe/Kyiv', 'Europe/Kiev', 'Europe/Chisinau', 'Europe/Uzhgorod', 'Europe/Zaporozhye'],
  },
  {
    id: 'baltic',
    name: { ru: 'Балтия', en: 'The Baltics' },
    city: { ru: 'Рига', en: 'Riga' },
    prefixes: ['Europe/Tallinn', 'Europe/Riga', 'Europe/Vilnius'],
  },
  {
    id: 'balkans',
    name: { ru: 'Балканы', en: 'The Balkans' },
    city: { ru: 'Белград', en: 'Belgrade' },
    prefixes: [
      'Europe/Belgrade', 'Europe/Bucharest', 'Europe/Sofia', 'Europe/Zagreb', 'Europe/Ljubljana',
      'Europe/Sarajevo', 'Europe/Skopje', 'Europe/Tirane', 'Europe/Podgorica', 'Europe/Athens',
    ],
  },
  {
    id: 'eu-north-europe',
    name: { ru: 'Европа (ЕС и Север)', en: 'Europe (EU & North)' },
    city: { ru: 'Брюссель', en: 'Brussels' },
    // catch-all 'Europe/' — последним: всё европейское, не поймано выше.
    prefixes: [
      'Atlantic/Reykjavik', 'Atlantic/Azores', 'Atlantic/Madeira', 'Atlantic/Canary',
      'Asia/Nicosia', 'Asia/Famagusta', 'Europe/',
    ],
  },
  {
    id: 'south-caucasus',
    name: { ru: 'Южный Кавказ', en: 'South Caucasus' },
    city: { ru: 'Тбилиси', en: 'Tbilisi' },
    prefixes: ['Asia/Tbilisi', 'Asia/Yerevan', 'Asia/Baku'],
  },
  {
    id: 'central-asia',
    name: { ru: 'Средняя Азия', en: 'Central Asia' },
    city: { ru: 'Алматы', en: 'Almaty' },
    prefixes: [
      'Asia/Almaty', 'Asia/Qostanay', 'Asia/Aqtobe', 'Asia/Aqtau', 'Asia/Atyrau', 'Asia/Oral',
      'Asia/Qyzylorda', 'Asia/Tashkent', 'Asia/Samarkand', 'Asia/Ashgabat', 'Asia/Dushanbe', 'Asia/Bishkek',
    ],
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

// Текущий набор (для detect/выбора); легаси — REGIONS_V1.
export const REGIONS = REGIONS_V2;

// Набор регионов по версии таксономии снапшота (ADR 0028). Согласовано с
// regionIdsFor(taxonomy) из js/data.js: отсутствие/неизвестная версия = '1.0'.
export function regionForTaxonomy(version) {
  return version === '2.0' ? REGIONS_V2 : REGIONS_V1;
}

export const CITIES = [
  { name: { ru: 'Москва', en: 'Moscow' }, region: 'russia-belarus' },
  { name: { ru: 'Санкт-Петербург', en: 'Saint Petersburg' }, region: 'russia-belarus' },
  { name: { ru: 'Минск', en: 'Minsk' }, region: 'russia-belarus' },
  { name: { ru: 'Киев', en: 'Kyiv' }, region: 'ukraine-moldova' },
  { name: { ru: 'Кишинёв', en: 'Chisinau' }, region: 'ukraine-moldova' },
  { name: { ru: 'Рига', en: 'Riga' }, region: 'baltic' },
  { name: { ru: 'Вильнюс', en: 'Vilnius' }, region: 'baltic' },
  { name: { ru: 'Таллин', en: 'Tallinn' }, region: 'baltic' },
  { name: { ru: 'Белград', en: 'Belgrade' }, region: 'balkans' },
  { name: { ru: 'Бухарест', en: 'Bucharest' }, region: 'balkans' },
  { name: { ru: 'София', en: 'Sofia' }, region: 'balkans' },
  { name: { ru: 'Загреб', en: 'Zagreb' }, region: 'balkans' },
  { name: { ru: 'Афины', en: 'Athens' }, region: 'balkans' },
  { name: { ru: 'Любляна', en: 'Ljubljana' }, region: 'balkans' },
  { name: { ru: 'Сараево', en: 'Sarajevo' }, region: 'balkans' },
  { name: { ru: 'Тирана', en: 'Tirana' }, region: 'balkans' },
  { name: { ru: 'Скопье', en: 'Skopje' }, region: 'balkans' },
  { name: { ru: 'Брюссель', en: 'Brussels' }, region: 'eu-north-europe' },
  { name: { ru: 'Амстердам', en: 'Amsterdam' }, region: 'eu-north-europe' },
  { name: { ru: 'Берлин', en: 'Berlin' }, region: 'eu-north-europe' },
  { name: { ru: 'Париж', en: 'Paris' }, region: 'eu-north-europe' },
  { name: { ru: 'Лондон', en: 'London' }, region: 'eu-north-europe' },
  { name: { ru: 'Варшава', en: 'Warsaw' }, region: 'eu-north-europe' },
  { name: { ru: 'Тбилиси', en: 'Tbilisi' }, region: 'south-caucasus' },
  { name: { ru: 'Ереван', en: 'Yerevan' }, region: 'south-caucasus' },
  { name: { ru: 'Баку', en: 'Baku' }, region: 'south-caucasus' },
  { name: { ru: 'Алматы', en: 'Almaty' }, region: 'central-asia' },
  { name: { ru: 'Ташкент', en: 'Tashkent' }, region: 'central-asia' },
  { name: { ru: 'Бишкек', en: 'Bishkek' }, region: 'central-asia' },
  { name: { ru: 'Душанбе', en: 'Dushanbe' }, region: 'central-asia' },
  { name: { ru: 'Ашхабад', en: 'Ashgabat' }, region: 'central-asia' },
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
// политика спорных территорий, версия таксономии). Сайт читает его через
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

// get(id) — поиск по ОБОИМ наборам (нужно для отрисовки старых недель v1 и
// текущих v2). Для выбора региона см. current()/choose() — только текущий набор.
export function get(id) {
  return REGIONS_V2.find((r) => r.id === id) ?? REGIONS_V1.find((r) => r.id === id) ?? null;
}

// id присутствует в текущем наборе (v2)? Устаревшее значение ('europe')
// считается отсутствующим — при выборе забывается, не ре-бакетится (ADR 0028).
export function isCurrent(id) {
  return REGIONS_V2.some((r) => r.id === id);
}

// Детект по IANA-префиксам часового пояса браузера; неизвестный пояс → null.
// Итерирует текущий набор (v2) в объявленном порядке.
export function detect(tz) {
  if (typeof tz !== 'string' || !tz) return null;
  for (const r of REGIONS_V2) {
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
// Значение вне текущего набора (напр. устаревшее 'europe') игнорируется.
export function current() {
  const ls = storage('local');
  if (ls) {
    const v = ls.getItem(LS_KEY);
    if (v && isCurrent(v)) return v;
  }
  const ss = storage('session');
  if (ss) {
    const v = ss.getItem(SS_KEY);
    if (v && isCurrent(v)) return v;
  }
  return null;
}

// choose(id, { persist }) — persist=true пишет в localStorage, иначе выбор живёт в сессии.
// Автосохранения нет: persist — только явное действие («Запомнить» в пикере).
export function choose(id, { persist = false } = {}) {
  const r = REGIONS_V2.find((x) => x.id === id);
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
// Без каталога (catalog == null) — прежнее поведение по встроенному CITIES
// (graceful fallback, тесты без сети). С переданным каталогом `{cities,countries}`
// (ленивый справочник data/geo/*, ADR 0029) — префиксный матч по ru/en именам
// городов и стран плюс имена регионов текущей таксономии, минимум 2 символа;
// широкий запрос (> 20 совпадений) → топ-20 по населению + флаг `broad` (подсказка
// «уточните запрос» на стороне UI). Каждый результат несёт `region_v2`
// (город/страна — из справочника, регион — свой id).
export function search(q, catalog) {
  const s = (q ?? '').trim().toLowerCase();
  if (!catalog) {
    if (!s) return CITIES.map((c) => ({ ...c, region_v2: c.region, regionName: get(c.region).name }));
    const out = [];
    for (const c of CITIES) {
      const region = get(c.region);
      const hay = `${c.name.ru} ${c.name.en} ${region.name.ru} ${region.name.en}`.toLowerCase();
      if (hay.includes(s)) out.push({ ...c, region_v2: c.region, regionName: region.name });
    }
    return out;
  }

  const out = [];
  if (s.length < 2) return out;

  const startsWith = (name) => name.ru.toLowerCase().startsWith(s) || name.en.toLowerCase().startsWith(s);

  for (const r of REGIONS_V2) {
    if (startsWith(r.name)) {
      out.push({ type: 'region', id: r.id, name: r.name, region_v2: r.id, region_v1: null, pop: 0, regionName: r.name });
    }
  }
  for (const iso of Object.keys(catalog.countries ?? {})) {
    const c = catalog.countries[iso];
    if (startsWith(c.name)) {
      out.push({
        type: 'country', country: iso, name: c.name,
        region_v2: c.region_v2 ?? null, region_v1: c.region_v1 ?? null, pop: 0,
      });
    }
  }
  for (const c of catalog.cities ?? []) {
    if (startsWith(c.name)) {
      out.push({
        type: 'city', name: c.name, country: c.country,
        region_v2: c.region_v2 ?? null, region_v1: c.region_v1 ?? null, pop: c.pop ?? 0,
      });
    }
  }

  // Регионы и страны — раньше городов (не тонут в широком запросе); внутри — по
  // населению убыв., затем по EN-имени (детерминизм).
  const priority = { region: 0, country: 1, city: 2 };
  out.sort((a, b) => (priority[a.type] - priority[b.type])
    || ((b.pop ?? 0) - (a.pop ?? 0))
    || a.name.en.localeCompare(b.name.en));

  const broad = out.length > 20;
  const limited = broad ? out.slice(0, 20) : out;
  limited.broad = broad;
  return limited;
}
