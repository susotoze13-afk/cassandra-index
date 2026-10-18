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
  unzipFirstEntry, pickRuAlternate, translitRu, normAscii, levenshtein,
  citiesJsonToLines, ruLabelsToMap, parseCityLine, parseCountryInfo, buildRegionMaps, buildOutput, COUNTRY_RU,
  CAPITAL_OVERRIDES,
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

test('countries.js: ISO2→{name:{ru,en},region_*,capital}, страны вне разбиения → null', () => {
  const countries = loadDataScript('countries.js', 'CI_GEO_COUNTRIES');
  const isos = Object.keys(countries);
  assert.ok(isos.length > 200, `countries: ${isos.length}`);
  for (const iso of isos) {
    assert.match(iso, /^[A-Z]{2}$/);
    const c = countries[iso];
    assert.ok(c.name.ru && c.name.en, `${iso} names`);
    assert.ok(c.region_v2 === null || V2.has(c.region_v2), `${iso} region_v2`);
    assert.ok(c.region_v1 === null || V1.has(c.region_v1), `${iso} region_v1`);
    // Столица — всегда поле; null допустим (территории без PPLC).
    assert.ok('capital' in c, `${iso} capital field`);
    if (c.capital !== null) {
      assert.ok(c.capital.ru && c.capital.en, `${iso} capital names`);
    }
  }
  assert.equal(countries.RU.region_v2, 'russia-belarus');
  assert.equal(countries.RU.region_v1, 'europe');
  // Объекты из vm-контекста — сверяем поля, не прототип.
  assert.equal(countries.RU.capital.ru, 'Москва');
  assert.equal(countries.RU.capital.en, 'Moscow');
  assert.equal(countries.US.capital.ru, 'Вашингтон');
  assert.equal(countries.US.capital.en, 'Washington');
  // Страна вне разбиения — регион не выдумывается (R15.2).
  assert.equal(countries.GL.region_v2, null);
  assert.equal(countries.GL.region_v1, null);
  assert.equal(countries.AQ.region_v2, null);
  // Курируемые фактические столицы без суверенной PPLC (см. CAPITAL_OVERRIDES).
  for (const [iso, capital] of Object.entries(CAPITAL_OVERRIDES)) {
    assert.equal(countries[iso].capital.ru, capital.ru, `${iso} override ru`);
    assert.equal(countries[iso].capital.en, capital.en, `${iso} override en`);
  }
  // IL/PS: город-столица — политический выбор, не делаем (UI покажет страну).
  assert.equal(countries.IL.capital, null);
  assert.equal(countries.PS.capital, null);
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

test('translitRu/normAscii/levenshtein: таблица, нормализация, дистанция', () => {
  assert.equal(translitRu('Санкт-Петербург'), 'sankt-peterburg');
  assert.equal(translitRu('Щёлково'), 'shchelkovo'); // ё→e, щ→shch
  assert.equal(normAscii("Saint Petersburg'"), 'saintpetersburg');
  assert.equal(normAscii('Nizhniy Novgorod'), 'nizhniynovgorod');
  assert.equal(levenshtein('abc', 'abc'), 0);
  assert.equal(levenshtein('abc', 'abd'), 1);
  assert.equal(levenshtein('', 'abcd'), 4);
});

test('pickRuAlternate: ближайший по транслиту к asciiname, чужие кириллицы отвергаются', () => {
  assert.equal(pickRuAlternate('Moscow,Москва', 'Moscow'), 'Москва');
  assert.equal(pickRuAlternate('Њу Јорк,New York', 'New York'), null); // сербские ј — не русский алфавит
  assert.equal(pickRuAlternate('Бейжің', 'Beijing'), null); // казахские і/ң
  assert.equal(pickRuAlternate('  ,  ', 'X'), null);
  assert.equal(pickRuAlternate(null, 'X'), null);
  assert.equal(pickRuAlternate(null, null), null);
});

// Реальные строки из дампа: первым в alternatenames идёт историческое или
// национально-меньшинственное имя — выбирать надо современное русское.
test('pickRuAlternate: исторические имена проигрывают современному имени', () => {
  assert.equal(pickRuAlternate('Виль Сибиркар,Новониколаевск,Новосибирск', 'Novosibirsk'), 'Новосибирск');
  const spb = pickRuAlternate('Бетъырбух,Ленинград,Санкт-Петербург,Петербург', 'Saint Petersburg');
  assert.ok(spb === 'Санкт-Петербург' || spb === 'Петербург', `СПб: ${spb}`);
  assert.equal(pickRuAlternate('Горький,Нижний Новгород', 'Nizhniy Novgorod'), 'Нижний Новгород');
  assert.equal(pickRuAlternate('Оуфа,Уфа', 'Ufa'), 'Уфа');
  assert.equal(pickRuAlternate('Молотов,Пермь', "Perm'"), 'Пермь');
  assert.equal(pickRuAlternate('Ставрополь,Тольятти', 'Tolyatti'), 'Тольятти');
});

// Равная дистанция (часто оба exact-match): без ъ побеждает более ранний
// кандидат; архаичные формы с ъ («Новосибирьскъ», «Омьскъ») отодвигаются назад.
test('pickRuAlternate: при равной дистанции ъ проигрывает, иначе порядок дампа', () => {
  assert.equal(pickRuAlternate('Казан,Казань', 'Kazan'), 'Казан');
  assert.equal(pickRuAlternate('Тюмен,Тюмень', "Tyumen'"), 'Тюмен');
  assert.equal(pickRuAlternate('Перм,Пермь', "Perm'"), 'Перм');
  assert.equal(pickRuAlternate('Новосибирьскъ,Новосибирск', 'Novosibirsk'), 'Новосибирск');
  assert.equal(pickRuAlternate('Омьскъ,Омск', 'Omsk'), 'Омск');
});

// Экспорт зеркала opendatasoft (те же данные GeoNames) → те же TSV-колонки,
// что у дампа cities15000: конвертер — шов, дальше работает parseCityLine.
test('citiesJsonToLines: JSON-запись → колонки дампа, dedupe по geoname_id', () => {
  const record = {
    geoname_id: '1496747', name: 'Novosibirsk', ascii_name: 'Novosibirsk',
    alternate_names: ['Виль Сибиркар', 'Новониколаевск', 'Новосибирск'],
    feature_class: 'P', feature_code: 'PPLA2', country_code: 'RU',
    cou_name_en: 'Russia', country_code_2: null,
    admin1_code: '54', admin2_code: '', admin3_code: null, admin4_code: '',
    population: 1620000, elevation: null, dem: 150, timezone: 'Asia/Novosibirsk',
    modification_date: '2024-01-01', label_en: 'Novosibirsk',
    coordinates: { lon: 82.9346, lat: 55.0415 },
  };
  const noAlts = {
    ...record, geoname_id: '499099', name: 'Tolyatti', ascii_name: 'Tolyatti',
    alternate_names: null, population: 700000, modification_date: '2024-02-02',
  };
  const lines = citiesJsonToLines([record, { ...record }, noAlts, { geoname_id: '' }]);
  assert.equal(lines.length, 2, 'дедуп по geoname_id, пустой id пропущен');
  const f = lines[0].split('\t');
  assert.equal(f.length, 19, 'точная колоночная разметка дампа');
  assert.equal(f[0], '1496747');
  assert.equal(f[1], 'Novosibirsk');
  assert.equal(f[2], 'Novosibirsk');
  assert.equal(f[3], 'Виль Сибиркар,Новониколаевск,Новосибирск');
  assert.equal(f[4], '55.0415');
  assert.equal(f[5], '82.9346');
  assert.equal(f[7], 'PPLA2');
  assert.equal(f[8], 'RU');
  assert.equal(f[9], ''); // country_code_2: null → пусто
  assert.equal(f[10], '54');
  assert.equal(f[12], ''); // admin3_code: null → пусто
  assert.equal(f[14], '1620000');
  assert.equal(f[15], ''); // elevation: null → пусто
  // Сквозной прогон через parseCityLine: та же логика, что у дампа.
  const parsed = parseCityLine(lines[0], EMPTY_REF);
  assert.ok(parsed);
  assert.equal(parsed.name.ru, 'Новосибирск'); // новая эвристика, не «Виль Сибиркар»
  assert.equal(parsed.pop, 1620000);
  const noAltsF = lines[1].split('\t');
  assert.equal(noAltsF[3], ''); // alternate_names: null → пустая строка
  assert.equal(parseCityLine(lines[1], EMPTY_REF).name.ru, 'Tolyatti');
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

test('buildOutput: фильтр и сортировка городов, регион и столица стран, null вне разбиения', () => {
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
  assert.deepEqual(countries.RU.capital, { ru: 'Москва', en: 'Moscow' }); // PPLC суверена
  assert.equal(countries.DE.capital, null); // столицы в фикстуре нет
  assert.equal(countries.GL.region_v2, null); // вне разбиения
  assert.equal(countries.GL.region_v1, null);
  // PPLC зависимой территории (R14) столицей не считается.
  assert.equal(countries.GL.capital, null);
});

// ---------- Лейблы Wikidata (--ru-labels) ----------

test('ruLabelsToMap: ключи Number, значения trim, пустые отброшены', () => {
  const map = ruLabelsToMap('{"1496747":" Новосибирск ","499099":"","123":"   "}');
  assert.equal(map.get(1496747), 'Новосибирск');
  assert.ok(!map.has(499099), 'пустое значение отброшено');
  assert.ok(!map.has(123), 'значение из пробелов отброшено');
  assert.throws(() => ruLabelsToMap('not json'), /JSON/);
});

test('buildOutput: ru-имя — adminRu, затем Wikidata, затем эвристика', () => {
  const lines = [
    // id 1 — админцентр из REF: курируемое «Москва» бьёт и Wikidata, и эвристику.
    cityLine({ id: 1, name: 'Moscow', alt: 'Москва-хак', fcode: 'PPLC', country: 'RU', pop: 12000000 }),
    // id 4 — эвристика дала бы «Казан» (первый в списке), Wikidata даёт «Казань».
    cityLine({ id: 4, name: 'Kazan', alt: 'Казан,Казань', fcode: 'PPL', country: 'RU', pop: 1100000 }),
    // id 5 — записи в Wikidata нет: эвристика как раньше («Уфа»).
    cityLine({ id: 5, name: 'Ufa', alt: 'Оуфа,Уфа', fcode: 'PPL', country: 'RU', pop: 1100000 }),
  ];
  const countryText = 'RU\tRUS\t643\tRS\tRussia\n';
  const ruLabels = new Map([[1, 'Москва-викидата'], [4, 'Казань']]);
  const { cities } = buildOutput(lines, countryText, REF, ruLabels);
  const byEn = new Map(cities.map((c) => [c.name.en, c]));
  assert.equal(byEn.get('Moscow').name.ru, 'Москва', 'adminRu сильнее Wikidata');
  assert.equal(byEn.get('Kazan').name.ru, 'Казань', 'Wikidata сильнее эвристики');
  assert.equal(byEn.get('Ufa').name.ru, 'Уфа', 'без записи в Map — эвристика');
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

