import { test } from 'node:test';
import assert from 'node:assert/strict';
import { REGIONS, CITIES, detect, search } from '../js/region.js';

test('detect: IANA-префиксы маппятся в 6 регионов', () => {
  assert.equal(detect('Europe/Amsterdam'), 'europe');
  assert.equal(detect('Europe/Moscow'), 'europe');
  assert.equal(detect('Asia/Tokyo'), 'east-asia');
  assert.equal(detect('Asia/Shanghai'), 'east-asia');
  assert.equal(detect('Asia/Beirut'), 'middle-east');
  assert.equal(detect('Asia/Dubai'), 'middle-east');
  assert.equal(detect('America/New_York'), 'north-america');
  assert.equal(detect('America/Los_Angeles'), 'north-america');
  assert.equal(detect('Asia/Kolkata'), 'south-asia');
  assert.equal(detect('Asia/Kathmandu'), 'south-asia');
  assert.equal(detect('Africa/Nairobi'), 'africa');
  assert.equal(detect('Africa/Cairo'), 'africa');
});

test('detect: неизвестный/пустой пояс → null', () => {
  assert.equal(detect('Pacific/Kiritimati'), null);
  assert.equal(detect('Mars/Olympus_Mons'), null);
  assert.equal(detect(''), null);
  assert.equal(detect(undefined), null);
  assert.equal(detect(null), null);
});

test('detect: каждый из 6 регионов имеет непустые префиксы', () => {
  assert.equal(REGIONS.length, 6);
  for (const r of REGIONS) {
    assert.ok(Array.isArray(r.prefixes) && r.prefixes.length > 0, `${r.id} has prefixes`);
    assert.ok(r.name.ru && r.name.en && r.city.ru && r.city.en, `${r.id} has names`);
  }
});

test('search: находит город по русскому и английскому имени', () => {
  const byRu = search('Москв');
  assert.ok(byRu.some((c) => c.region === 'europe'));
  const byEn = search('moscow');
  assert.ok(byEn.some((c) => c.region === 'europe'));
  assert.ok(search('Токио').some((c) => c.region === 'east-asia'));
  assert.ok(search('beirut').some((c) => c.region === 'middle-east'));
  assert.ok(search('NAIROBI').some((c) => c.region === 'africa'));
  assert.ok(search('Дели').some((c) => c.region === 'south-asia'));
});

test('search: совпадение по имени региона, нет совпадений → пустой массив', () => {
  assert.ok(search('Европа').every((c) => c.region === 'europe'));
  assert.ok(search('Europe').some((c) => c.region === 'europe'));
  assert.deepEqual(search('вымышленныйгород'), []);
  assert.deepEqual(search('zzzz'), []);
});

test('search: справочник содержит ~30 городов', () => {
  assert.ok(CITIES.length >= 28 && CITIES.length <= 40, `cities: ${CITIES.length}`);
  for (const c of CITIES) {
    assert.ok(c.name.ru && c.name.en && REGIONS.some((r) => r.id === c.region));
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

test('reference: справочник валиден — 6 регионов, ISO, админцентры, политика, версия', () => {
  assert.equal(ref.methodology, '1.0');
  assert.ok(ref.disputedTerritories.includes('ISO 3166-2'));
  assert.equal(ref.regions.length, 6);
  for (const r of ref.regions) {
    assert.ok(r.id && r.name.ru && r.name.en, `${r.id} has bilingual name`);
    assert.ok(Array.isArray(r.countries) && r.countries.length > 0, `${r.id} has ISO codes`);
    assert.ok(r.countries.every((c) => /^[A-Z]{2}$/.test(c)), `${r.id} codes are ISO 3166-1 alpha-2`);
    assert.ok(r.adminCenter.city.ru && r.adminCenter.city.en, `${r.id} admin center`);
    assert.ok(/^[A-Z]{2}-[A-Z0-9]{1,3}$/.test(r.adminCenter.iso3166_2), `${r.id} admin center ISO 3166-2`);
  }
  // Пороги лестницы — ровно те же, что в PARAMS.ipConfidenceLadder (таск 01).
  assert.deepEqual(ref.confidenceLadder, PARAMS.ipConfidenceLadder);
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
