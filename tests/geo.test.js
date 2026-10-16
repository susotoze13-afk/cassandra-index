// Справочник городов и стран (ADR 0029): генератор/форма данных, ленивый
// загрузчик, поиск и резолв региона. Сети нет — каталог инъектируется.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';
import { loadGeo, resetGeoCache, geoSearch, resolveRegion } from '../js/geo.js';
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

// Широкий каталог: >20 городов на префикс «Те».
const WIDE = {
  cities: Array.from({ length: 30 }, (_, i) => ({
    name: { ru: `Тем${i}`, en: `Tem${i}` }, country: 'RU', region_v2: 'russia-belarus', region_v1: 'europe', pop: i * 1000,
  })),
  countries: {},
};

test('geoSearch: префикс по ru/en городов/стран/регионов, результат несёт region_v2', () => {
  const ru = geoSearch('Моск', CATALOG);
  assert.ok(ru.some((r) => r.type === 'city' && r.region_v2 === 'russia-belarus'));
  const en = geoSearch('belgr', CATALOG);
  assert.ok(en.some((r) => r.type === 'city' && r.region_v2 === 'balkans'));
  const country = geoSearch('Гренланд', CATALOG);
  assert.ok(country.some((r) => r.type === 'country' && r.region_v2 === null));
  const region = geoSearch('Балканы', CATALOG);
  assert.ok(region.some((r) => r.type === 'region' && r.region_v2 === 'balkans'));
});

test('geoSearch: минимум 2 символа — 1 символ даёт пусто', () => {
  assert.deepEqual([...geoSearch('М', CATALOG)], []);
  assert.deepEqual([...geoSearch('', CATALOG)], []);
  assert.ok(geoSearch('Мо', CATALOG).length > 0);
});

test('geoSearch: широкий запрос → ровно топ-20 по населению + broad', () => {
  const out = geoSearch('Те', WIDE);
  assert.equal(out.length, 20);
  assert.equal(out.broad, true);
  // перечислены самые населённые, в порядке убывания
  assert.equal(out[0].name.en, 'Tem29');
  assert.equal(out[19].name.en, 'Tem10');
  const narrow = geoSearch('Моск', CATALOG);
  assert.equal(narrow.broad, false);
});

test('geoSearch: неизвестный ввод → пустой массив без broad', () => {
  const out = geoSearch('zzzzzz', CATALOG);
  assert.equal(out.length, 0);
  assert.equal(out.broad, false);
});

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

