// Справочник городов и стран (ADR 0029): генератор/форма данных, ленивый
// загрузчик, поиск и резолв региона. Сети нет — каталог инъектируется.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';
import { deflateRawSync } from 'node:zlib';
import { loadGeo, resetGeoCache, resolveRegion } from '../js/geo.js';
import {
  unzipFirstEntry, pickRuAlternate, parseCityLine, parseCountryInfo, buildRegionMaps, buildOutput, COUNTRY_RU,
} from '../data/geo/generate.js';
import { regionIdsFor } from '../js/data.js';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const V1 = new Set(regionIdsFor('1.0'));
const V2 = new Set(regionIdsFor('2.0'));

// Классический скрипт data/geo/*.js → значение window.CI_GEO_* (как в браузере).
function loadDataScript(file, globalName) {
  const code = readFileSync(join(rootDir, 'data/geo', file), 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx.window[globalName];
}

// ---------- Форма сгенерированных данных (R14, R15, R15.2) ----------

test('cities.js: форма записи {name:{ru,en},country,region_*,pop}, ru непуст', () => {
  const cities = loadDataScript('cities.js', 'CI_GEO_CITIES');
  assert.ok(Array.isArray(cities) && cities.length > 1000, `cities: ${cities.length}`);
  for (const c of cities) {
    assert.ok(c.name && typeof c.name.ru === 'string' && c.name.ru.length > 0, `ru: ${JSON.stringify(c)}`);
    assert.ok(typeof c.name.en === 'string' && c.name.en.length > 0, `en: ${JSON.stringify(c)}`);
    assert.ok(typeof c.country === 'string' && /^[A-Z]{2}$/.test(c.country), `country: ${JSON.stringify(c)}`);
    assert.ok(c.region_v2 === null || V2.has(c.region_v2), `region_v2: ${JSON.stringify(c)}`);
    assert.ok(c.region_v1 === null || V1.has(c.region_v1), `region_v1: ${JSON.stringify(c)}`);
    assert.ok(typeof c.pop === 'number' && c.pop >= 0, `pop: ${JSON.stringify(c)}`);
  }
  // Порядок — по населению убыв. (нужен для топ-20 широкого запроса).
  assert.ok(cities[0].pop >= cities[1].pop && cities[1].pop >= cities[2].pop, 'sorted by pop desc');
});

test('cities.js: админцентры включены с курируемыми русскими именами', () => {
  const cities = loadDataScript('cities.js', 'CI_GEO_CITIES');
  const byEn = new Map(cities.map((c) => [c.name.en, c]));
  for (const [en, ru, region] of [
    ['Moscow', 'Москва', 'russia-belarus'],
    ['Tbilisi', 'Тбилиси', 'south-caucasus'],
    ['Belgrade', 'Белград', 'balkans'],
    ['Kyiv', 'Киев', 'ukraine-moldova'],
  ]) {
    const c = byEn.get(en);
    assert.ok(c, `нет админцентра ${en}`);
    assert.equal(c.name.ru, ru, `${en} ru`);
    assert.equal(c.region_v2, region, `${en} region_v2`);
  }
});

test('countries.js: ISO2→{name:{ru,en},region_*}, страны вне разбиения → null', () => {
  const countries = loadDataScript('countries.js', 'CI_GEO_COUNTRIES');
  const isos = Object.keys(countries);
  assert.ok(isos.length > 200, `countries: ${isos.length}`);
  for (const iso of isos) {
    assert.match(iso, /^[A-Z]{2}$/);
    const c = countries[iso];
    assert.ok(c.name.ru && c.name.en, `${iso} names`);
    assert.ok(c.region_v2 === null || V2.has(c.region_v2), `${iso} region_v2`);
    assert.ok(c.region_v1 === null || V1.has(c.region_v1), `${iso} region_v1`);
  }
  assert.equal(countries.RU.region_v2, 'russia-belarus');
  assert.equal(countries.RU.region_v1, 'europe');
  // Страна вне разбиения — регион не выдумывается (R15.2).
  assert.equal(countries.GL.region_v2, null);
  assert.equal(countries.GL.region_v1, null);
  assert.equal(countries.AQ.region_v2, null);
});

// ---------- Фикстура-каталог для поиска (инъекция, без сети) ----------

const CATALOG = {
  cities: [
    { name: { ru: 'Москва', en: 'Moscow' }, country: 'RU', region_v2: 'russia-belarus', region_v1: 'europe', pop: 12000000 },
    { name: { ru: 'Минск', en: 'Minsk' }, country: 'BY', region_v2: 'russia-belarus', region_v1: 'europe', pop: 2000000 },
    { name: { ru: 'Белград', en: 'Belgrade' }, country: 'RS', region_v2: 'balkans', region_v1: 'europe', pop: 1300000 },
    { name: { ru: 'Городок', en: 'Gorodok' }, country: 'GL', region_v2: null, region_v1: null, pop: 50000 },
  ],
  countries: {
    RU: { name: { ru: 'Россия', en: 'Russia' }, region_v2: 'russia-belarus', region_v1: 'europe' },
    BY: { name: { ru: 'Беларусь', en: 'Belarus' }, region_v2: 'russia-belarus', region_v1: 'europe' },
    RS: { name: { ru: 'Сербия', en: 'Serbia' }, region_v2: 'balkans', region_v1: 'europe' },
    GL: { name: { ru: 'Гренландия', en: 'Greenland' }, region_v2: null, region_v1: null },
  },
};

// Поиск по справочнику (region.search) покрыт в tests/region.test.js — единый
// вход; в js/geo.js обёртки нет.

// ---------- resolveRegion: fallback город→страна→регион ----------

test('resolveRegion: ISO-код, имя страны и город дают регион v2', () => {
  assert.equal(resolveRegion('RU', CATALOG).region_v2, 'russia-belarus');
  assert.equal(resolveRegion('Сербия', CATALOG).region_v2, 'balkans');
  assert.equal(resolveRegion({ country: 'RS' }, CATALOG).region_v2, 'balkans');
  assert.equal(resolveRegion('Минск', CATALOG).region_v2, 'russia-belarus');
});

test('resolveRegion: страна вне разбиения → region_* null; неизвестное → null', () => {
  const gl = resolveRegion('GL', CATALOG);
  assert.equal(gl.region_v2, null);
  assert.equal(gl.region_v1, null);
  assert.equal(resolveRegion('Атлантида', CATALOG), null);
  assert.equal(resolveRegion('NZ', CATALOG), null); // нет в каталоге
});

// ---------- Швы генератора data/geo/generate.js (офлайн, синтетика) ----------

// Минимальный zip с одним deflate-энтри (local file header + raw deflate).
function makeZip(name, content) {
  const nameBuf = Buffer.from(name, 'utf8');
  const raw = Buffer.from(content, 'utf8');
  const deflated = deflateRawSync(raw);
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(0, 6);
  header.writeUInt16LE(8, 8); // method: deflate
  header.writeUInt16LE(0, 10);
  header.writeUInt16LE(0, 12);
  header.writeUInt32LE(0, 14);
  header.writeUInt32LE(deflated.length, 18);
  header.writeUInt32LE(raw.length, 22);
  header.writeUInt16LE(nameBuf.length, 26);
  header.writeUInt16LE(0, 28);
  return Buffer.concat([header, nameBuf, deflated]);
}

test('unzipFirstEntry: минимальный zip → имя и содержимое', () => {
  const { name, data } = unzipFirstEntry(makeZip('cities15000.txt', 'hello\tworld\n'));
  assert.equal(name, 'cities15000.txt');
  assert.equal(data.toString('utf8'), 'hello\tworld\n');
  assert.throws(() => unzipFirstEntry(Buffer.from('not a zip')), /zip/);
});

test('pickRuAlternate: первый русский вариант, чужие кириллицы отвергаются', () => {
  assert.equal(pickRuAlternate('Moscow,Москва'), 'Москва');
  assert.equal(pickRuAlternate('Њу Јорк,New York'), null); // сербские ј — не русский алфавит
  assert.equal(pickRuAlternate('Бейжің'), null); // казахские і/ң
  assert.equal(pickRuAlternate('  ,  '), null);
  assert.equal(pickRuAlternate(null), null);
});

// Строка cities15000.tsv: 0 id, 1 name, 3 alternates, 7 fcode, 8 country, 14 pop.
function cityLine({ id = 1, name = 'Test', alt = '', fcode = 'PPL', country = 'RU', pop = 0 }) {
  const f = new Array(19).fill('');
  f[0] = String(id);
  f[1] = name;
  f[2] = name;
  f[3] = alt;
  f[7] = fcode;
  f[8] = country;
  f[14] = String(pop);
  return f.join('\t');
}

const EMPTY_REF = { adminCenters: new Set(), adminRu: new Map() };

test('parseCityLine: порог населения, столица только суверена, админцентр и ru-имя', () => {
  assert.equal(parseCityLine(cityLine({ fcode: 'PPL', pop: 40000 }), EMPTY_REF), null);
  assert.ok(parseCityLine(cityLine({ fcode: 'PPL', pop: 60000 }), EMPTY_REF));
  // PPLC суверенного государства — даже при малом населении.
  const cap = parseCityLine(cityLine({ fcode: 'PPLC', country: 'RU', pop: 1000 }), EMPTY_REF);
  assert.ok(cap && cap.isCapital === true);
  // PPLC зависимой территории (Гренландия) — не столица (R14) и ниже порога → null.
  assert.equal(parseCityLine(cityLine({ fcode: 'PPLC', country: 'GL', pop: 1000 }), EMPTY_REF), null);
  // Админцентр включается по geonamesId независимо от населения.
  const admin = parseCityLine(cityLine({ id: 42, pop: 100 }), { adminCenters: new Set([42]), adminRu: new Map([[42, 'Куре']]) });
  assert.ok(admin && admin.isAdminCenter === true && admin.name.ru === 'Куре');
  // Русское имя — из alternatenames, иначе первичное.
  assert.equal(parseCityLine(cityLine({ alt: 'Moscow,Москва', pop: 60000 }), EMPTY_REF).name.ru, 'Москва');
  assert.equal(parseCityLine(cityLine({ name: 'Nowhere', pop: 60000 }), EMPTY_REF).name.ru, 'Nowhere');
});

test('parseCountryInfo: ISO2, EN из дампа, RU из таблицы, EU/мусор пропущены', () => {
  const text = '# hdr\nEU\tEUU\t000\tEU\tEuropean Union\nDE\tDEU\t276\tGM\tGermany\nRUS\tRUS\t643\tRS\tRussia\nRU\tRUS\t643\tRS\tRussia\n';
  const out = parseCountryInfo(text);
  assert.deepEqual(Object.keys(out).sort(), ['DE', 'RU']);
  assert.equal(out.DE.en, 'Germany');
  assert.equal(out.DE.ru, COUNTRY_RU.DE);
  assert.equal(out.RU.ru, COUNTRY_RU.RU);
});

const REF = {
  taxonomies: {
    '1.0': { regions: [
      { id: 'europe', countries: ['RU', 'BY', 'DE'], adminCenter: { geonamesId: 1, city: { ru: 'Амстердам' } } },
    ] },
    '2.0': { regions: [
      { id: 'russia-belarus', countries: ['RU', 'BY'], adminCenter: { geonamesId: 1, city: { ru: 'Москва' } } },
      { id: 'eu-north-europe', countries: ['DE'], adminCenter: { geonamesId: 2, city: { ru: 'Брюссель' } } },
    ] },
  },
};

test('buildRegionMaps: страны обеих версий, админцентры и ru-имена из v2', () => {
  const maps = buildRegionMaps(REF);
  assert.deepEqual(maps.byCountry.RU, { v1: 'europe', v2: 'russia-belarus' });
  assert.equal(maps.byCountry.DE.v2, 'eu-north-europe');
  assert.equal(maps.byCountry.GL, undefined); // страна вне разбиения
  assert.deepEqual([...maps.adminCenters].sort(), [1, 2]);
  assert.equal(maps.adminRu.get(1), 'Москва');
  assert.equal(maps.adminRu.get(2), 'Брюссель');
});

test('buildOutput: фильтр и сортировка городов, регион стран, null вне разбиения', () => {
  const lines = [
    cityLine({ id: 1, name: 'Moscow', alt: 'Moscow,Москва', fcode: 'PPLC', country: 'RU', pop: 12000000 }),
    cityLine({ id: 20, name: 'Nuuk', fcode: 'PPLC', country: 'GL', pop: 18000 }),
    cityLine({ id: 3, name: 'Small', fcode: 'PPL', country: 'DE', pop: 1000 }),
    cityLine({ id: 4, name: 'Big', fcode: 'PPL', country: 'DE', pop: 90000 }),
  ];
  const countryText = 'DE\tDEU\t276\tGM\tGermany\nRU\tRUS\t643\tRS\tRussia\nGL\tGRL\t304\tGL\tGreenland\n';
  const { cities, countries } = buildOutput(lines, countryText, REF);
  assert.deepEqual(cities.map((c) => c.name.en), ['Moscow', 'Big']); // по населению убыв., не-столица GL отсеяна
  assert.equal(cities[0].region_v2, 'russia-belarus');
  assert.equal(cities[1].region_v2, 'eu-north-europe');
  assert.equal(countries.RU.region_v2, 'russia-belarus');
  assert.equal(countries.GL.region_v2, null); // вне разбиения
  assert.equal(countries.GL.region_v1, null);
});

// ---------- Ленивый загрузчик (подменённая инъекция) ----------

test('loadGeo: первый вызов инжектит два скрипта, второй отдаёт кэш', async () => {
  resetGeoCache();
  const injected = [];
  const inject = (src) => {
    injected.push(src);
    if (src.endsWith('cities.js')) globalThis.CI_GEO_CITIES = CATALOG.cities;
    if (src.endsWith('countries.js')) globalThis.CI_GEO_COUNTRIES = CATALOG.countries;
    return Promise.resolve();
  };
  const first = await loadGeo(inject);
  assert.deepEqual(injected, ['data/geo/cities.js', 'data/geo/countries.js']);
  assert.equal(first.cities, CATALOG.cities);
  assert.deepEqual(first.countries, CATALOG.countries);

  const second = await loadGeo(() => { throw new Error('не должен инжектить повторно'); });
  assert.equal(second, first, 'повторный вызов отдаёт тот же кэш');
  resetGeoCache();
  delete globalThis.CI_GEO_CITIES;
  delete globalThis.CI_GEO_COUNTRIES;
});

test('loadGeo: ошибка инъекции отклоняет промис (кэш не отравлен)', async () => {
  resetGeoCache();
  await assert.rejects(loadGeo(() => Promise.reject(new Error('boom'))), /boom/);
  resetGeoCache();
});

// ---------- Справочник не в бандле и не подключён статически (R16, R22) ----------

test('build.js не собирает data/geo/*; index.html их не подключает', () => {
  const build = readFileSync(join(rootDir, 'build.js'), 'utf8');
  assert.ok(!build.includes('data/geo'), 'build.js не должен читать data/geo');
  const html = readFileSync(join(rootDir, 'index.html'), 'utf8');
  assert.ok(!/data\/geo\//.test(html), 'index.html не должен подключать data/geo/* статически');
});

test('data/geo: в репозитории только вывод и генератор, сырого дампа нет (R15.1)', () => {
  const files = readdirSync(join(rootDir, 'data/geo'));
  assert.ok(files.includes('cities.js') && files.includes('countries.js') && files.includes('generate.js'));
  assert.deepEqual(files.filter((f) => /\.(zip|txt)$/i.test(f)), [], 'сырой дамп не коммитится');
});

