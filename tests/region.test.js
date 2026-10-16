import { test } from 'node:test';
import assert from 'node:assert/strict';
import { REGIONS, REGIONS_V1, REGIONS_V2, regionForTaxonomy, isCurrent, get, current, choose, CITIES, detect, search } from '../js/region.js';
import { regionIdsFor, REGION_TAXONOMIES, CURRENT_TAXONOMY, TAXONOMY_V2_FROM } from '../js/data.js';

test('detect: IANA-префиксы маппятся в 12 регионов v2 (специфичные раньше catch-all)', () => {
  assert.equal(detect('Europe/Moscow'), 'russia-belarus');
  assert.equal(detect('Asia/Novosibirsk'), 'russia-belarus'); // России Asia/* выше центральноазиатских
  assert.equal(detect('Europe/Minsk'), 'russia-belarus');
  assert.equal(detect('Europe/Kyiv'), 'ukraine-moldova');
  assert.equal(detect('Europe/Riga'), 'baltic');
  assert.equal(detect('Europe/Belgrade'), 'balkans');
  assert.equal(detect('Europe/Athens'), 'balkans');
  assert.equal(detect('Europe/Amsterdam'), 'eu-north-europe'); // catch-all 'Europe/'
  assert.equal(detect('Europe/London'), 'eu-north-europe');
  assert.equal(detect('Asia/Nicosia'), 'eu-north-europe'); // Кипр — в ЕС-корзине
  assert.equal(detect('Asia/Tbilisi'), 'south-caucasus');
  assert.equal(detect('Asia/Almaty'), 'central-asia');
  assert.equal(detect('Asia/Tashkent'), 'central-asia');
  assert.equal(detect('Asia/Tokyo'), 'east-asia');
  assert.equal(detect('Asia/Beirut'), 'middle-east');
  assert.equal(detect('America/New_York'), 'north-america');
  assert.equal(detect('Asia/Kolkata'), 'south-asia');
  assert.equal(detect('Africa/Nairobi'), 'africa');
});

test('regionForTaxonomy: 1.0/отсутствие/неизвестное → шестёрка; 2.0 → двенадцатка', () => {
  assert.deepEqual(regionForTaxonomy('1.0').map((r) => r.id), ['europe', 'east-asia', 'middle-east', 'north-america', 'south-asia', 'africa']);
  assert.deepEqual(regionForTaxonomy('2.0'), REGIONS_V2);
  assert.deepEqual(regionForTaxonomy(), REGIONS_V1);
  assert.deepEqual(regionForTaxonomy(undefined), REGIONS_V1);
  assert.deepEqual(regionForTaxonomy('9.9'), REGIONS_V1);
  // 'europe' — легаси, в текущем наборе отсутствует
  assert.equal(isCurrent('europe'), false);
  assert.equal(isCurrent('balkans'), true);
});

test('detect: неизвестный/пустой пояс → null', () => {
  assert.equal(detect('Pacific/Kiritimati'), null);
  assert.equal(detect('Mars/Olympus_Mons'), null);
  assert.equal(detect(''), null);
  assert.equal(detect(undefined), null);
  assert.equal(detect(null), null);
});

test('detect: каждый из 12 регионов v2 имеет непустые префиксы', () => {
  assert.equal(REGIONS_V2.length, 12);
  assert.equal(REGIONS_V1.length, 6);
  assert.equal(REGIONS.length, 12); // REGIONS = текущий набор (alias)
  for (const r of REGIONS_V2) {
    assert.ok(Array.isArray(r.prefixes) && r.prefixes.length > 0, `${r.id} has prefixes`);
    assert.ok(r.name.ru && r.name.en && r.city.ru && r.city.en, `${r.id} has names`);
  }
});

test('search: находит город по русскому и английскому имени', () => {
  const byRu = search('Москв');
  assert.ok(byRu.some((c) => c.region === 'russia-belarus'));
  const byEn = search('moscow');
  assert.ok(byEn.some((c) => c.region === 'russia-belarus'));
  assert.ok(search('Токио').some((c) => c.region === 'east-asia'));
  assert.ok(search('beirut').some((c) => c.region === 'middle-east'));
  assert.ok(search('NAIROBI').some((c) => c.region === 'africa'));
  assert.ok(search('Дели').some((c) => c.region === 'south-asia'));
  assert.ok(search('Белград').some((c) => c.region === 'balkans'));
  assert.ok(search('Тбилиси').some((c) => c.region === 'south-caucasus'));
  assert.ok(search('Алматы').some((c) => c.region === 'central-asia'));
});

test('search: совпадение по имени региона, нет совпадений → пустой массив', () => {
  const evr = search('Европа');
  assert.ok(evr.length > 0, '«Европа» должна находиться хотя бы раз');
  assert.ok(evr.every((c) => c.region === 'eu-north-europe'));
  assert.ok(search('Балканы').some((c) => c.region === 'balkans'));
  assert.ok(search('Europe').some((c) => c.region === 'eu-north-europe'));
  assert.deepEqual([...search('вымышленныйгород')], []);
  assert.deepEqual([...search('zzzz')], []);
});

test('search: справочник городов не пуст и ссылается на регионы v2', () => {
  assert.ok(CITIES.length >= 50, `cities: ${CITIES.length}`);
  for (const c of CITIES) {
    assert.ok(c.name.ru && c.name.en && REGIONS_V2.some((r) => r.id === c.region), `${c.name.ru} → ${c.region}`);
  }
});

// ---------- Лестница уверенности (История 37, R38) ----------

import { representative, reference, consent } from '../js/region.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { PARAMS } from '../calc/params.js';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const ref = JSON.parse(readFileSync(join(rootDir, 'data/regions/reference.json'), 'utf8'));
const LADDER = ref.confidenceLadder; // { city: 80, region: 90, floor: 50 }

test('reference: справочник валиден — две таксономии, ISO, админцентры, политика, версия', () => {
  assert.equal(ref.taxonomy_version, '2.0');
  assert.ok(ref.disputedTerritories.includes('ISO 3166-2'));
  assert.equal(ref.taxonomies['1.0'].regions.length, 6);
  assert.equal(ref.taxonomies['2.0'].regions.length, 12);
  for (const version of ['1.0', '2.0']) {
    for (const r of ref.taxonomies[version].regions) {
      assert.ok(r.id && r.name.ru && r.name.en, `${version}/${r.id} has bilingual name`);
      assert.ok(Array.isArray(r.countries) && r.countries.length > 0, `${version}/${r.id} has ISO codes`);
      assert.ok(r.countries.every((c) => /^[A-Z]{2}$/.test(c)), `${version}/${r.id} codes are ISO 3166-1 alpha-2`);
      assert.ok(r.adminCenter.city.ru && r.adminCenter.city.en, `${version}/${r.id} admin center`);
      assert.ok(/^[A-Z]{2}-[A-Z0-9]{1,3}$/.test(r.adminCenter.iso3166_2), `${version}/${r.id} admin center ISO 3166-2`);
    }
  }
  // Набор id v2 совпадает с реестром сайта (REGIONS_V2) — справочник и реестр синхронны.
  assert.deepEqual(ref.taxonomies['2.0'].regions.map((r) => r.id), REGIONS_V2.map((r) => r.id));
  assert.deepEqual(ref.taxonomies['1.0'].regions.map((r) => r.id), REGIONS_V1.map((r) => r.id));
  // Пороги лестницы — ровно те же, что в PARAMS.ipConfidenceLadder (таск 01).
  assert.deepEqual(ref.confidenceLadder, PARAMS.ipConfidenceLadder);
});

// ---------- Таксономия v1/v2: резолверы контракта ↔ реестр ↔ справочник (ADR 0028) ----------

test('regionIdsFor(v) ↔ regionForTaxonomy(v) ↔ reference.json — тройное равенство id', () => {
  assert.deepEqual(Object.keys(REGION_TAXONOMIES), ['1.0', '2.0']);
  assert.equal(CURRENT_TAXONOMY, '2.0');
  assert.equal(TAXONOMY_V2_FROM, '2026-10-18');
  // отсутствие версии/неизвестная версия = '1.0' (старые недели поля не несут)
  assert.deepEqual(regionIdsFor(), regionIdsFor('1.0'));
  assert.deepEqual(regionIdsFor('9.9'), regionIdsFor('1.0'));
  for (const v of ['1.0', '2.0']) {
    const fromResolver = regionIdsFor(v);
    const fromRegistry = regionForTaxonomy(v).map((r) => r.id);
    const fromReference = ref.taxonomies[v].regions.map((r) => r.id);
    assert.deepEqual(fromResolver, fromRegistry, `taxonomy ${v}: js/data.js ↔ js/region.js`);
    assert.deepEqual(fromResolver, fromReference, `taxonomy ${v}: js/data.js ↔ reference.json`);
  }
  // отсутствие/неизвестная версия — согласованно '1.0' в обоих резолверах
  for (const v of [undefined, '9.9']) {
    assert.deepEqual(regionIdsFor(v), regionForTaxonomy(v).map((r) => r.id), `taxonomy ${v}: js/data.js ↔ js/region.js`);
    assert.deepEqual(regionIdsFor(v), regionIdsFor('1.0'));
  }
  assert.equal(regionIdsFor('1.0').length, 6);
  assert.equal(regionIdsFor('2.0').length, 12);
});

// Разбиение строгое: каждый ISO ровно в одном регионе; спорные клетки решены
// явными приоритетами (R03–R03.5). Ожидаемые клетки — из спецификации, не из кода.
test('строгость v2: каждый ISO ровно в одном регионе; TR/CY/MT/GR-…/EE-… разрешены', () => {
  const owner = new Map();
  const dups = [];
  for (const r of ref.taxonomies['2.0'].regions) {
    for (const c of r.countries) {
      if (owner.has(c)) dups.push(c);
      else owner.set(c, r.id);
    }
  }
  assert.deepEqual(dups, [], 'страна не может принадлежать двум регионам');
  const at = (c) => owner.get(c) ?? null;
  assert.equal(at('TR'), 'middle-east');
  assert.equal(at('CY'), 'eu-north-europe');
  assert.equal(at('MT'), 'eu-north-europe');
  for (const c of ['GR', 'BG', 'RO', 'HR', 'SI']) assert.equal(at(c), 'balkans', `${c} → balkans`);
  for (const c of ['EE', 'LV', 'LT']) assert.equal(at(c), 'baltic', `${c} → baltic`);
  assert.equal(at('GL'), null, 'Гренландия вне разбиения');
  assert.equal(at('XK'), null, 'Косово вне разбиения');
});

test('get/isCurrent: get ищет оба набора, isCurrent — только текущий', () => {
  assert.equal(get('balkans').id, 'balkans');
  assert.equal(get('europe').id, 'europe'); // v1 — нужен для отрисовки старых недель
  assert.equal(get('atlantis'), null);
  assert.equal(isCurrent('europe'), false);
  assert.equal(isCurrent('balkans'), true);
});

test('current/choose: устаревшее "europe" забывается, выбор v2 сохраняется', () => {
  const store = fakeStorage();
  store.setItem('cassandra.region', 'europe'); // «хвост» старой таксономии
  withLocalStorage(store, () => {
    assert.equal(current(), null);          // значение вне текущего набора игнорируется
    assert.equal(choose('europe'), null);   // устаревшее значение не выбирается
    const r = choose('balkans', { persist: true });
    assert.equal(r.id, 'balkans');
    assert.equal(current(), 'balkans');     // выбор v2 читается обратно
  });
});

test('reference: data/regions/reference.js зеркалит reference.json (грузится сайтом)', () => {
  const loader = readFileSync(join(rootDir, 'data/regions/reference.js'), 'utf8');
  assert.ok(loader.includes('window.CI_REGION_REF'));
  const jsonText = loader.slice(loader.indexOf('=') + 1).trim().replace(/;\s*$/, '');
  assert.deepEqual(JSON.parse(jsonText), ref);
});

test('reference(): читает window.CI_REGION_REF, без него — null', () => {
  const prev = globalThis.CI_REGION_REF;
  try {
    globalThis.CI_REGION_REF = ref;
    assert.deepEqual(reference(), ref);
  } finally {
    if (prev === undefined) delete globalThis.CI_REGION_REF;
    else globalThis.CI_REGION_REF = prev;
  }
  // globalThis.CI_REGION_REF не задан — reference() не падает и даёт null
  if (prev === undefined) assert.equal(reference(), null);
});

test('representative: границы городской оси (0.8 включительно → город)', () => {
  const base = { regionConf: 0.95, city: 'Oslo', adminCenter: 'Amsterdam', regionId: 'europe' };
  assert.equal(representative({ ...base, cityConf: 0.8 }, LADDER).level, 'city');
  assert.equal(representative({ ...base, cityConf: 0.8 }, LADDER).place, 'Oslo');
  assert.equal(representative({ ...base, cityConf: 0.81 }, LADDER).level, 'city');
  // 0.5–0.8 → админцентр (граница 0.5 включительно)
  assert.equal(representative({ ...base, cityConf: 0.79 }, LADDER).level, 'adminCenter');
  assert.equal(representative({ ...base, cityConf: 0.79 }, LADDER).place, 'Amsterdam');
  assert.equal(representative({ ...base, cityConf: 0.5 }, LADDER).level, 'adminCenter');
  // точно под порогом пола — глобальный
  assert.equal(representative({ ...base, cityConf: 0.499 }, LADDER).level, 'global');
  assert.equal(representative({ ...base, cityConf: 0.499 }, LADDER).regionId, null);
});

test('representative: граница региональной оси (0.9 включительно → регион)', () => {
  const base = { cityConf: null, city: 'Oslo', adminCenter: 'Amsterdam', regionId: 'europe' };
  assert.equal(representative({ ...base, regionConf: 0.9 }, LADDER).level, 'region');
  assert.equal(representative({ ...base, regionConf: 0.9 }, LADDER).regionId, 'europe');
  assert.equal(representative({ ...base, regionConf: 0.89 }, LADDER).level, 'country');
  assert.equal(representative({ ...base, regionConf: 0.89 }, LADDER).regionId, 'europe');
  assert.equal(representative({ ...base, regionConf: 0.49 }, LADDER).level, 'global');
});

test('representative: регион не определён → глобальный; город без региона — тоже', () => {
  assert.equal(representative({ cityConf: 0.99, regionConf: 0.99, regionId: null }, LADDER).level, 'global');
  assert.equal(representative({ cityConf: 0.99, regionConf: 0.99 }, LADDER).level, 'global');
});

test('representative: реальный tz-детект (cityConf=null) — регион, не город', () => {
  const out = representative(
    { cityConf: null, regionConf: 0.92, adminCenter: 'Amsterdam', regionId: 'europe' },
    LADDER,
  );
  assert.equal(out.level, 'region');
  assert.equal(out.place, null);
});

// ---------- Согласие region_consent (Истории 40–41, R49–R51) ----------

function fakeStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    _map: map,
  };
}

function withLocalStorage(store, fn) {
  const prev = globalThis.localStorage;
  globalThis.localStorage = store;
  try {
    return fn();
  } finally {
    if (prev === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = prev;
  }
}

test('consent: до ответа статус null, ничего не записано', () => {
  const store = fakeStorage();
  withLocalStorage(store, () => {
    assert.deepEqual(consent.status(), { status: null, at: null, deniedUntil: null });
  });
  assert.equal(store._map.size, 0);
});

test('consent: grant пишет granted + timestamp', () => {
  const store = fakeStorage();
  withLocalStorage(store, () => {
    consent.grant();
    const st = consent.status();
    assert.equal(st.status, 'granted');
    assert.ok(typeof st.at === 'string' && !Number.isNaN(Date.parse(st.at)));
    assert.equal(st.deniedUntil, null);
    const raw = JSON.parse(store.getItem(consent.KEY));
    assert.equal(raw.status, 'granted');
  });
});

test('consent: dismiss пишет denied и тишину на 30 дней (denied_until)', () => {
  const store = fakeStorage();
  withLocalStorage(store, () => {
    consent.dismiss();
    const st = consent.status();
    assert.equal(st.status, 'denied');
    assert.ok(st.deniedUntil);
    const until = Date.parse(st.deniedUntil);
    const at = Date.parse(st.at);
    // 30 дней ± допуск на длительность теста
    assert.ok(until - at >= 29 * 86400_000 && until - at <= 31 * 86400_000, 'denied_until ≈ at + 30d');
  });
});

test('consent: истёкший denied снова даёт null (повторный запрос возможен)', () => {
  const store = fakeStorage();
  withLocalStorage(store, () => {
    const past = new Date(Date.now() - 40 * 86400_000).toISOString();
    store.setItem(consent.KEY, JSON.stringify({ v: 1, status: 'denied', at: past, deniedUntil: past }));
    assert.equal(consent.status().status, null);
  });
});

test('consent: битая запись трактуется как отсутствие согласия', () => {
  const store = fakeStorage();
  withLocalStorage(store, () => {
    store.setItem(consent.KEY, '{oops');
    assert.equal(consent.status().status, null);
  });
});

test('consent: хранилище недоступно — статус null, grant/dismiss не падают', () => {
  const prev = globalThis.localStorage;
  delete globalThis.localStorage;
  try {
    assert.equal(consent.status().status, null);
    consent.grant();
    consent.dismiss();
  } finally {
    if (prev !== undefined) globalThis.localStorage = prev;
  }
});

// ---------- Поиск по ленивому справочнику (search(q, catalog), ADR 0029) ----------

const GEO_CATALOG = {
  cities: [
    { name: { ru: 'Москва', en: 'Moscow' }, country: 'RU', region_v2: 'russia-belarus', region_v1: 'europe', pop: 12000000 },
    { name: { ru: 'Минск', en: 'Minsk' }, country: 'BY', region_v2: 'russia-belarus', region_v1: 'europe', pop: 2000000 },
    { name: { ru: 'Белград', en: 'Belgrade' }, country: 'RS', region_v2: 'balkans', region_v1: 'europe', pop: 1300000 },
    { name: { ru: 'Городок', en: 'Gorodok' }, country: 'GL', region_v2: null, region_v1: null, pop: 50000 },
  ],
  countries: {
    RU: { name: { ru: 'Россия', en: 'Russia' }, region_v2: 'russia-belarus', region_v1: 'europe' },
    GL: { name: { ru: 'Гренландия', en: 'Greenland' }, region_v2: null, region_v1: null },
  },
};

test('search(q, catalog): префикс ru/en, страны/регионы, region_v2 в результате', () => {
  assert.ok(search('Моск', GEO_CATALOG).some((r) => r.type === 'city' && r.region_v2 === 'russia-belarus'));
  assert.ok(search('minsk', GEO_CATALOG).some((r) => r.type === 'city' && r.region_v2 === 'russia-belarus'));
  assert.ok(search('Гренланд', GEO_CATALOG).some((r) => r.type === 'country' && r.region_v2 === null));
  assert.ok(search('Балканы', GEO_CATALOG).some((r) => r.type === 'region' && r.region_v2 === 'balkans'));
});

test('search(q, catalog): минимум 2 символа, иначе пусто', () => {
  assert.deepEqual(search('М', GEO_CATALOG), []);
  assert.deepEqual(search('', GEO_CATALOG), []);
  assert.ok(search('Бе', GEO_CATALOG).length > 0);
});

test('search(q, catalog): широкий запрос → топ-20 по населению + broad', () => {
  const wide = {
    cities: Array.from({ length: 25 }, (_, i) => ({
      name: { ru: `Тест${i}`, en: `Test${i}` }, country: 'RU', region_v2: 'russia-belarus', region_v1: 'europe', pop: i,
    })),
    countries: {},
  };
  const out = search('Тест', wide);
  assert.equal(out.length, 20);
  assert.equal(out.broad, true);
  assert.equal(out[0].name.en, 'Test24');
});

test('search(q): без каталога — прежнее поведение по CITIES (graceful fallback)', () => {
  assert.ok(search('Москв').some((c) => c.region === 'russia-belarus'));
  assert.deepEqual([...search('zzzz')], []);
  assert.equal(search('zzzz').broad, false); // .broad — boolean и в fallback без каталога
  assert.equal(search('Москва').broad, false);
});
