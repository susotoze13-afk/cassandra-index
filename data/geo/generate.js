#!/usr/bin/env node
// data/geo/generate.js — генератор статического справочника городов и стран
// (ADR 0029). Node stdlib, ноль зависимостей. Сеть — только здесь, один раз:
// скачивает дамп GeoNames cities15000.zip и countryInfo.txt (либо берёт
// экспорт зеркала opendatasoft через --cities-json вместо zip), распаковывает zip
// встроенным минимальным zip-ридером (node:zlib inflateRawSync + разбор local
// file header), фильтрует города по населению ≥ 50 000 и добавляет столицы
// суверенных стран (feature code PPLC, ISO 3166-1) + 12 административных центров
// регионов из data/regions/reference.json (taxonomies['2.0'].regions[].adminCenter).
//
// Пишет два классических скрипта (работают и с file://, и ленивым <script>):
//   data/geo/cities.js    → window.CI_GEO_CITIES    = [{name:{ru,en},country,region_v2,region_v1,pop}]
//   data/geo/countries.js → window.CI_GEO_COUNTRIES = {ISO2:{name:{ru,en},region_v2,region_v1}}
// Русские имена СТРАН — из курируемой таблицы ISO→RU ниже (объективные данные).
// Русские имена ГОРОДОВ — по приоритету: курируемые админцентры reference.json,
// затем лейблы Wikidata (--ru-labels, ~58% городов), затем «чисто русский»
// вариант из alternatenames, чей транслит ближе всего к asciiname (Левенштейн):
// первым в дампе часто идёт историческое имя («Горький», «Молотов») — оно
// проигрывает современному.
//
// Сырой дамп в репозиторий не едет: по умолчанию качается в системную временную
// папку. Для офлайн-пересборки можно указать локальные файлы:
//   node data/geo/generate.js --zip <cities15000.zip> [--country-info <countryInfo.txt>]
//                                [--ru-labels <ru-labels.json>] [--out data/geo]
// Альтернативный вход городов — экспорт зеркала opendatasoft (те же данные
// GeoNames, запись JSON, alternate_names массивом):
//   node data/geo/generate.js --cities-json <cities.json> [--ru-labels <path>]
//                                [--country-info <path>] [--out data/geo]

import { createWriteStream } from 'node:fs';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { get as httpsGet } from 'node:https';
import { inflateRawSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const REFERENCE = join(ROOT, 'data', 'regions', 'reference.json');

const CITIES_URL = 'https://download.geonames.org/export/dump/cities15000.zip';
const COUNTRY_URL = 'https://download.geonames.org/export/dump/countryInfo.txt';
const MIN_POP = 50000;

// ---------- Курируемая таблица ISO 3166-1 alpha-2 → русское имя страны ----------
// Объективные данные (не факт о пользователе). Дополнять точечно при жалобах.
export const COUNTRY_RU = {
  AD: 'Андорра', AE: 'ОАЭ', AF: 'Афганистан', AG: 'Антигуа и Барбуда', AI: 'Ангилья',
  AL: 'Албания', AM: 'Армения', AO: 'Ангола', AQ: 'Антарктида', AR: 'Аргентина',
  AS: 'Американское Самоа', AT: 'Австрия', AU: 'Австралия', AW: 'Аруба', AX: 'Аландские острова',
  AZ: 'Азербайджан', BA: 'Босния и Герцеговина', BB: 'Барбадос', BD: 'Бангладеш',
  BE: 'Бельгия', BF: 'Буркина-Фасо', BG: 'Болгария', BH: 'Бахрейн', BI: 'Бурунди',
  BJ: 'Бенин', BL: 'Сен-Бартелеми', BM: 'Бермуды', BN: 'Бруней', BO: 'Боливия',
  BQ: 'Бонайре, Синт-Эстатиус и Саба', BR: 'Бразилия', BS: 'Багамские Острова', BT: 'Бутан',
  BV: 'Остров Буве', BW: 'Ботсвана', BY: 'Беларусь', BZ: 'Белиз', CA: 'Канада',
  CC: 'Кокосовые острова', CD: 'ДР Конго', CF: 'Центральноафриканская Республика',
  CG: 'Республика Конго', CH: 'Швейцария', CI: 'Кот-д’Ивуар', CK: 'Острова Кука',
  CL: 'Чили', CM: 'Камерун', CN: 'Китай', CO: 'Колумбия', CR: 'Коста-Рика', CU: 'Куба',
  CV: 'Кабо-Верде', CW: 'Кюрасао', CX: 'Остров Рождества', CY: 'Кипр', CZ: 'Чехия',
  DE: 'Германия', DJ: 'Джибути', DK: 'Дания', DM: 'Доминика',
  DO: 'Доминиканская Республика', DZ: 'Алжир', EC: 'Эквадор', EE: 'Эстония', EG: 'Египет',
  EH: 'Западная Сахара', ER: 'Эритрея', ES: 'Испания', ET: 'Эфиопия', FI: 'Финляндия',
  FJ: 'Фиджи', FK: 'Фолклендские острова', FM: 'Микронезия', FO: 'Фарерские острова',
  FR: 'Франция', GA: 'Габон', GB: 'Великобритания', GD: 'Гренада', GE: 'Грузия',
  GF: 'Французская Гвиана', GG: 'Гернси', GH: 'Гана', GI: 'Гибралтар', GL: 'Гренландия',
  GM: 'Гамбия', GN: 'Гвинея', GP: 'Гваделупа', GQ: 'Экваториальная Гвинея', GR: 'Греция',
  GS: 'Южная Георгия и Южные Сандвичевы острова', GT: 'Гватемала', GU: 'Гуам',
  GW: 'Гвинея-Бисау', GY: 'Гайана', HK: 'Гонконг', HM: 'Остров Херд и острова Макдональд',
  HN: 'Гондурас', HR: 'Хорватия', HT: 'Гаити', HU: 'Венгрия', ID: 'Индонезия',
  IE: 'Ирландия', IL: 'Израиль', IM: 'Остров Мэн', IN: 'Индия',
  IO: 'Британская территория в Индийском океане', IQ: 'Ирак', IR: 'Иран', IS: 'Исландия',
  IT: 'Италия', JE: 'Джерси', JM: 'Ямайка', JO: 'Иордания', JP: 'Япония', KE: 'Кения',
  KG: 'Киргизия', KH: 'Камбоджа', KI: 'Кирибати', KM: 'Коморы',
  KN: 'Сент-Китс и Невис', KP: 'КНДР', KR: 'Республика Корея', KW: 'Кувейт',
  KY: 'Острова Кайман', KZ: 'Казахстан', LA: 'Лаос', LB: 'Ливан', LC: 'Сент-Люсия',
  LI: 'Лихтенштейн', LK: 'Шри-Ланка', LR: 'Либерия', LS: 'Лесото', LT: 'Литва',
  LU: 'Люксембург', LV: 'Латвия', LY: 'Ливия', MA: 'Марокко', MC: 'Монако',
  MD: 'Молдова', ME: 'Черногория', MF: 'Сен-Мартен', MG: 'Мадагаскар',
  MH: 'Маршалловы Острова', MK: 'Северная Македония', ML: 'Мали', MM: 'Мьянма',
  MN: 'Монголия', MO: 'Макао', MP: 'Северные Марианские острова', MQ: 'Мартиника',
  MR: 'Мавритания', MS: 'Монтсеррат', MT: 'Мальта', MU: 'Маврикий', MV: 'Мальдивы',
  MW: 'Малави', MX: 'Мексика', MY: 'Малайзия', MZ: 'Мозамбик', NA: 'Намибия',
  NC: 'Новая Каледония', NE: 'Нигер', NF: 'Остров Норфолк', NG: 'Нигерия',
  NI: 'Никарагуа', NL: 'Нидерланды', NO: 'Норвегия', NP: 'Непал', NR: 'Науру',
  NU: 'Ниуэ', NZ: 'Новая Зеландия', OM: 'Оман', PA: 'Панама', PE: 'Перу',
  PF: 'Французская Полинезия', PG: 'Папуа — Новая Гвинея', PH: 'Филиппины',
  PK: 'Пакистан', PL: 'Польша', PM: 'Сен-Пьер и Микелон', PN: 'Острова Питкэрн',
  PR: 'Пуэрто-Рико', PS: 'Палестина', PT: 'Португалия', PW: 'Палау', PY: 'Парагвай',
  QA: 'Катар', RE: 'Реюньон', RO: 'Румыния', RS: 'Сербия', RU: 'Россия', RW: 'Руанда',
  SA: 'Саудовская Аравия', SB: 'Соломоновы Острова', SC: 'Сейшельские Острова',
  SD: 'Судан', SE: 'Швеция', SG: 'Сингапур', SH: 'Остров Святой Елены', SI: 'Словения',
  SJ: 'Шпицберген и Ян-Майен', SK: 'Словакия', SL: 'Сьерра-Леоне', SM: 'Сан-Марино',
  SN: 'Сенегал', SO: 'Сомали', SR: 'Суринам', SS: 'Южный Судан', ST: 'Сан-Томе и Принсипи',
  SV: 'Сальвадор', SX: 'Синт-Мартен', SY: 'Сирия', SZ: 'Эсватини',
  TC: 'Тёркс и Кайкос', TD: 'Чад', TF: 'Французские Южные территории', TG: 'Того',
  TH: 'Таиланд', TJ: 'Таджикистан', TK: 'Токелау', TL: 'Восточный Тимор',
  TM: 'Туркменистан', TN: 'Тунис', TO: 'Тонга', TR: 'Турция',
  TT: 'Тринидад и Тобаго', TV: 'Тувалу', TW: 'Тайвань', TZ: 'Танзания', UA: 'Украина',
  UG: 'Уганда', UM: 'Внешние малые острова США', US: 'США', UY: 'Уругвай',
  UZ: 'Узбекистан', VA: 'Ватикан', VC: 'Сент-Винсент и Гренадины', VE: 'Венесуэла',
  VG: 'Британские Виргинские острова', VI: 'Виргинские Острова США', VN: 'Вьетнам',
  VU: 'Вануату', WF: 'Уоллис и Футуна', WS: 'Самоа', XK: 'Косово', YE: 'Йемен',
  YT: 'Майотта', ZA: 'ЮАР', ZM: 'Замбия', ZW: 'Зимбабве',
};

// ---------- Суверенные государства (ISO 3166-1 alpha-2) ----------
// Столицы добавляются только по суверенным странам (R14): зависимые территории
// (GL, HK, MO, PR, GU, …) в список не входят, даже если GeoNames метит их PPLC —
// такой город останется лишь при населении ≥ 50000. Набор — государства-члены ООН
// и наблюдатели (VA, PS); ISO 3166-1 его не различает от территорий, поэтому
// список курируемый.
export const SOVEREIGN_ISO = new Set((
  'AF AL DZ AD AO AG AR AM AU AT AZ '
  + 'BS BH BD BB BY BE BZ BJ BT BO BA BW BR BN BG BF BI '
  + 'CV KH CM CA CF TD CL CN CO KM CG CD CR CI HR CU CY CZ '
  + 'DK DJ DM DO '
  + 'EC EG SV GQ ER EE SZ ET '
  + 'FJ FI FR '
  + 'GA GM GE DE GH GR GD GT GN GW GY '
  + 'HT HN HU '
  + 'IS IN ID IR IQ IE IL IT '
  + 'JM JP JO '
  + 'KZ KE KI KP KR KW KG '
  + 'LA LV LB LS LR LY LI LT LU '
  + 'MG MW MY MV ML MT MH MR MU MX FM MD MC MN ME MA MZ MM '
  + 'NA NR NP NL NZ NI NE NG MK NO '
  + 'OM '
  + 'PK PW PA PG PY PE PH PL PT '
  + 'QA '
  + 'RO RU RW '
  + 'KN LC VC WS SM ST SA SN RS SC SL SG SK SI SB SO ZA SS ES LK SD SR SE CH SY '
  + 'TJ TZ TH TL TG TO TT TN TR TM TV '
  + 'UG UA AE GB US UY UZ '
  + 'VU VE VN '
  + 'YE '
  + 'ZM ZW '
  + 'VA PS'
).split(' ').filter(Boolean));

// ---------- Минимальный zip-ридер ----------

// Первый файл архива: разбор local file header (0x04034b50) + inflateRawSync.
// Если размеры в local-заголовке нулевые (data descriptor), читаем central
// directory (0x02014b50) из конца архива — так надёжнее.
export function unzipFirstEntry(buf) {
  const sig = buf.readUInt32LE(0);
  if (sig !== 0x04034b50) throw new Error('не zip-архив: нет local file header');
  const method = buf.readUInt16LE(8);
  let compSize = buf.readUInt32LE(18);
  const nameLen = buf.readUInt16LE(26);
  const extraLen = buf.readUInt16LE(28);
  const name = buf.toString('utf8', 30, 30 + nameLen);
  let dataStart = 30 + nameLen + extraLen;
  if (compSize === 0) {
    const cd = centralEntry(buf, name);
    compSize = cd.compSize;
    dataStart = cd.localOffset + cd.headerLen;
  }
  const raw = buf.subarray(dataStart, dataStart + compSize);
  const data = method === 0 ? raw : inflateRawSync(raw);
  return { name, data };
}

// Ищет central directory entry по имени файла (EOCD → записи).
function centralEntry(buf, wantName) {
  // EOCD: сигнатура 0x06054b50, размер 22 байта (+ комментарий). Ищем с конца.
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 66000; i -= 1) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('zip: не найден EOCD');
  let cdCount = buf.readUInt16LE(eocd + 10);
  let ptr = buf.readUInt32LE(eocd + 16);
  while (cdCount > 0) {
    if (buf.readUInt32LE(ptr) !== 0x02014b50) throw new Error('zip: битая central directory');
    const method = buf.readUInt16LE(ptr + 10);
    const compSize = buf.readUInt32LE(ptr + 20);
    const nameLen = buf.readUInt16LE(ptr + 28);
    const extraLen = buf.readUInt16LE(ptr + 30);
    const commentLen = buf.readUInt16LE(ptr + 32);
    const localOffset = buf.readUInt32LE(ptr + 42);
    const name = buf.toString('utf8', ptr + 46, ptr + 46 + nameLen);
    if (name === wantName) {
      const localNameLen = buf.readUInt16LE(localOffset + 26);
      const localExtraLen = buf.readUInt16LE(localOffset + 28);
      return { method, compSize, localOffset, headerLen: 30 + localNameLen + localExtraLen };
    }
    ptr += 46 + nameLen + extraLen + commentLen;
    cdCount -= 1;
  }
  throw new Error(`zip: не найден файл '${wantName}'`);
}

// ---------- Разбор входов ----------

const CYRILLIC_RE = /[\u0400-\u04FF]/;
// Допустимы только буквы русского алфавита (А–Я, а–я, Ё/ё) и пунктуация/пробелы.
// Так отсекаются варианты чужих кириллических алфавитов (сербские ј/њ/љ, казахские
// ә/қ/ң, украинские і/ї, беларусские ў, осетинская æ), которые дают «Њу Јорк»,
// «Бейжің», «Məskəү» вместо русского имени.
const RUS_ONLY_RE = /^[\u0410-\u044F\u0401\u0451\s\-'.()]+$/;

// Явная таблица транслитерации ru→lat (без ГОСТ/ICU — только для сравнения
// с asciiname, поэтому достаточно инъективности по согласным/гласным).
const RU_TO_LAT = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh',
  щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};

// Транслитерация русской строки по RU_TO_LAT; не-кириллица проходит как есть.
export function translitRu(s) {
  let out = '';
  for (const ch of s.toLowerCase()) out += RU_TO_LAT[ch] ?? ch;
  return out;
}

// Нормализация для сравнения: lowercase, остаются только a-z
// (пробелы, дефисы, апострофы, точки убираются с обеих сторон).
export function normAscii(s) {
  return s.toLowerCase().replace(/[^a-z]/g, '');
}

// Классическое расстояние Левенштейна (O(n·m), строки короткие).
export function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i += 1) {
    const cur = [i];
    for (let j = 1; j <= n; j += 1) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = cur;
  }
  return prev[n];
}

// Лексикографическое сравнение ключей покомпонентно (числа, не строки).
function keyLess(a, b) {
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return a[i] < b[i];
  }
  return false;
}

// Русское имя города из alternatenames: берётся «чисто русский» кандидат
// (CYRILLIC_RE + RUS_ONLY_RE), чей транслит ближе всего к asciiname по
// Левенштейну. Так исторические и национально-меньшинственные имена
// («Горький», «Молотов», «Бетъырбух») проигрывают современному русскому
// имени («Нижний Новгород», «Пермь», «Санкт-Петербург»). При равной
// дистанции архаичные формы с ъ («Новосибирьскъ», «Лондонъ») отодвигаются
// назад, затем побеждает более ранний кандидат. Дистанция 0 всегда бьёт
// любую ненулевую, как и раньше. Нет валидных кандидатов — null (тогда имя —
// primary). Приоритет полного выбора имени в parseCityLine: курируемые
// админцентры reference.json → лейблы Wikidata (--ru-labels) → эта эвристика.
export function pickRuAlternate(alternates, asciiname) {
  if (!alternates) return null;
  const target = asciiname ? normAscii(asciiname) : '';
  let best = null;
  let bestKey = null;
  let index = 0;
  for (const cand of alternates.split(',')) {
    const t = cand.trim();
    index += 1;
    if (!t || !CYRILLIC_RE.test(t) || !RUS_ONLY_RE.test(t)) continue;
    const dist = target ? levenshtein(normAscii(translitRu(t)), target) : 0;
    // Ключ выбора: дистанция asc; без ъ раньше; раньше в списке.
    const key = [dist, t.includes('ъ') ? 1 : 0, index];
    if (!bestKey || keyLess(key, bestKey)) { best = t; bestKey = key; }
  }
  return best;
}

// Строка cities15000.tsv → нормализованный город (или null, если не подходит).
// 0 geonameid,1 name,2 asciiname,3 alternatenames,4 lat,5 lon,6 fclass,7 fcode,
// 8 country,9 cc2,10 admin1,…,14 population,…
export function parseCityLine(line, ref) {
  if (!line || line.startsWith('#')) return null;
  const f = line.split('\t');
  if (f.length < 15) return null;
  const geonameid = Number(f[0]);
  const name = f[1];
  const alternates = f[3];
  const asciiname = f[2];
  const fcode = f[7];
  const country = f[8];
  const pop = Number(f[14]) || 0;
  const adminIds = ref.adminCenters;
  // Столица — PPLC только суверенного государства (R14); PPLC зависимых
  // территорий за капитала не считается (остаётся правило населения).
  const isCapital = fcode === 'PPLC' && SOVEREIGN_ISO.has(country);
  const isAdminCenter = adminIds.has(geonameid);
  if (!name || (!isCapital && !isAdminCenter && pop < MIN_POP)) return null;
  // Приоритет русского имени: курируемые админцентры reference.json, затем
  // лейблы Wikidata (--ru-labels), затем эвристика pickRuAlternate, затем primary.
  const override = ref.adminRu?.get(geonameid) ?? ref.ruLabels?.get(geonameid);
  return {
    geonameid,
    name: { ru: override ?? pickRuAlternate(alternates, asciiname) ?? name, en: name },
    country,
    pop,
    isCapital,
    isAdminCenter,
  };
}

// Экспорт зеркала opendatasoft (те же данные GeoNames, запись JSON) →
// строки в ТОЧНОЙ колоночной разметке дампа cities15000.tsv
// (0 geonameid,1 name,2 asciiname,3 alternatenames,4 lat,5 lon,6 fclass,
// 7 fcode,8 country,9 cc2,10 admin1,11 admin2,12 admin3,13 admin4,
// 14 population,15 elevation,16 dem,17 timezone,18 modification_date),
// чтобы дальше работал тот же parseCityLine — ноль расхождения логики.
// alternate_names (null|string[]) — через запятую; отсутствующие числовые —
// 0/пусто по аналогии с дампом; дедуп по geoname_id (источники пересекаются).
export function citiesJsonToLines(records) {
  const seen = new Set();
  const lines = [];
  for (const r of records ?? []) {
    const id = String(r.geoname_id ?? '');
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const f = new Array(19).fill('');
    f[0] = id;
    f[1] = r.name ?? '';
    f[2] = r.ascii_name ?? '';
    f[3] = Array.isArray(r.alternate_names) ? r.alternate_names.join(',') : '';
    f[4] = r.coordinates?.lat != null ? String(r.coordinates.lat) : '';
    f[5] = r.coordinates?.lon != null ? String(r.coordinates.lon) : '';
    f[6] = r.feature_class ?? '';
    f[7] = r.feature_code ?? '';
    f[8] = r.country_code ?? '';
    f[9] = r.country_code_2 ?? '';
    f[10] = r.admin1_code != null ? String(r.admin1_code) : '';
    f[11] = r.admin2_code != null ? String(r.admin2_code) : '';
    f[12] = r.admin3_code != null ? String(r.admin3_code) : '';
    f[13] = r.admin4_code != null ? String(r.admin4_code) : '';
    f[14] = String(r.population ?? 0);
    f[15] = r.elevation != null ? String(r.elevation) : '';
    f[16] = r.dem != null ? String(r.dem) : '';
    f[17] = r.timezone ?? '';
    f[18] = r.modification_date ?? '';
    lines.push(f.join('\t'));
  }
  return lines;
}

// JSON-объект {geoname_id строкой: "русское имя"} — русские лейблы Wikidata
// (качество выше эвристики; покрывает ~58% городов) → Map<Number,string>.
// Ключи нормализуются в Number, значения trim, пустые и нечисловые отброшены.
export function ruLabelsToMap(text) {
  const raw = JSON.parse(text);
  const map = new Map();
  for (const [k, v] of Object.entries(raw)) {
    const id = Number(k);
    const label = typeof v === 'string' ? v.trim() : '';
    if (!Number.isInteger(id) || !label) continue;
    map.set(id, label);
  }
  return map;
}

// countryInfo.txt → {iso2: {name:{ru,en}}}. EU (код без региона) пропускается.
export function parseCountryInfo(text) {
  const out = {};
  for (const line of text.split('\n')) {
    if (!line || line.startsWith('#')) continue;
    const f = line.split('\t');
    if (f.length < 5) continue;
    const iso = f[0];
    if (!/^[A-Z]{2}$/.test(iso)) continue;
    if (iso === 'EU') continue;
    out[iso] = { en: f[4], ru: COUNTRY_RU[iso] ?? f[4] };
  }
  return out;
}

// reference.json → {byCountry:{ISO2:{v1,v2}}, adminCenters:Set<geonameid>}
export function buildRegionMaps(ref) {
  const byCountry = {};
  for (const version of ['1.0', '2.0']) {
    const key = version === '2.0' ? 'v2' : 'v1';
    for (const r of ref.taxonomies[version].regions) {
      for (const c of r.countries) {
        byCountry[c] = byCountry[c] ?? {};
        byCountry[c][key] = r.id;
      }
    }
  }
  const adminCenters = new Set();
  const adminRu = new Map();
  for (const r of ref.taxonomies['2.0'].regions) {
    if (r.adminCenter?.geonamesId) {
      adminCenters.add(r.adminCenter.geonamesId);
      if (r.adminCenter.city?.ru) adminRu.set(r.adminCenter.geonamesId, r.adminCenter.city.ru);
    }
  }
  return { byCountry, adminCenters, adminRu };
}

// Формирует выходные структуры из строк дампа. ruLabels (Map<Number,string>
// из ruLabelsToMap) опциональна и кладётся в тот же ref, что уходит в
// parseCityLine — приоритет имени там: adminRu → ruLabels → эвристика.
export function buildOutput(cityLines, countryInfoText, ref, ruLabels = null) {
  const { byCountry, adminCenters, adminRu } = buildRegionMaps(ref);
  const seen = new Set();
  const cities = [];
  for (const line of cityLines) {
    const c = parseCityLine(line, { adminCenters, adminRu, ruLabels });
    if (!c || seen.has(c.geonameid)) continue;
    seen.add(c.geonameid);
    const map = byCountry[c.country] ?? {};
    cities.push({
      name: c.name,
      country: c.country,
      region_v2: map.v2 ?? null,
      region_v1: map.v1 ?? null,
      pop: c.pop,
    });
  }
  // Порядок — по населению убыв., затем по EN-имени (детерминизм + топ-20).
  cities.sort((a, b) => (b.pop - a.pop) || a.name.en.localeCompare(b.name.en));

  const countries = {};
  const parsed = parseCountryInfo(countryInfoText);
  for (const iso of Object.keys(parsed).sort()) {
    const map = byCountry[iso] ?? {};
    countries[iso] = {
      name: parsed[iso],
      region_v2: map.v2 ?? null,
      region_v1: map.v1 ?? null,
    };
  }
  return { cities, countries };
}

// ---------- Вывод ----------

function banner() {
  return [
    '// СГЕНЕРИРОВАН data/geo/generate.js — не править вручную. Пересборка:',
    '//   node data/geo/generate.js',
    '// Источник: GeoNames (https://www.geonames.org/), лицензия CC BY 4.0.',
    '// Дамп cities15000.zip + countryInfo.txt; фильтр: население ≥ 50000,',
    '// столицы суверенных стран (PPLC) и 12 административных центров регионов.',
  ].join('\n');
}

function renderScript(globalName, value) {
  return `${banner()}\nwindow.${globalName} = ${JSON.stringify(value)};\n`;
}

// ---------- Сеть (однократная загрузка) ----------

function download(url, dest) {
  return new Promise((resolve, reject) => {
    httpsGet(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode} для ${url}`));
        return;
      }
      const file = createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
      file.on('error', reject);
    }).on('error', reject);
  });
}

function parseArgs(argv) {
  const args = { zip: null, citiesJson: null, ruLabels: null, countryInfo: null, out: HERE };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--zip') args.zip = argv[++i];
    else if (argv[i] === '--cities-json') args.citiesJson = argv[++i];
    else if (argv[i] === '--ru-labels') args.ruLabels = argv[++i];
    else if (argv[i] === '--country-info') args.countryInfo = argv[++i];
    else if (argv[i] === '--out') args.out = argv[++i];
  }
  if (args.zip && args.citiesJson) {
    throw new Error('нельзя задать одновременно --zip и --cities-json');
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const ref = JSON.parse(await readFile(REFERENCE, 'utf8'));
  let tmpCountry = args.countryInfo;
  const cleanup = [];
  let cityLines;
  if (args.citiesJson) {
    const records = JSON.parse(await readFile(args.citiesJson, 'utf8'));
    cityLines = citiesJsonToLines(records);
    console.log(`Загружено ${cityLines.length} записей из ${args.citiesJson}`);
  } else {
    let tmpZip = args.zip;
    if (!tmpZip) {
      tmpZip = join(tmpdir(), `ci-cities15000-${Date.now()}.zip`);
      console.log(`Скачиваю ${CITIES_URL} → ${tmpZip}`);
      await download(CITIES_URL, tmpZip);
      cleanup.push(tmpZip);
    }
    const zipBuf = await readFile(tmpZip);
    const { name: entryName, data } = unzipFirstEntry(zipBuf);
    console.log(`Распакован '${entryName}' (${data.length} байт)`);
    cityLines = data.toString('utf8').split('\n');
  }
  if (!tmpCountry) {
    tmpCountry = join(tmpdir(), `ci-countryInfo-${Date.now()}.txt`);
    console.log(`Скачиваю ${COUNTRY_URL} → ${tmpCountry}`);
    await download(COUNTRY_URL, tmpCountry);
    cleanup.push(tmpCountry);
  }

  const countryText = await readFile(tmpCountry, 'utf8');
  const ruLabels = args.ruLabels
    ? ruLabelsToMap(await readFile(args.ruLabels, 'utf8'))
    : null;

  const { cities, countries } = buildOutput(cityLines, countryText, ref, ruLabels);
  await mkdir(args.out, { recursive: true });
  await writeFile(join(args.out, 'cities.js'), renderScript('CI_GEO_CITIES', cities));
  await writeFile(join(args.out, 'countries.js'), renderScript('CI_GEO_COUNTRIES', countries));

  const nullRegions = cities.filter((c) => c.region_v2 === null).length;
  console.log(`cities.js: ${cities.length} городов (${nullRegions} без региона v2)`);
  console.log(`countries.js: ${Object.keys(countries).length} стран`);
  for (const f of cleanup) await rm(f, { force: true });
}

// Запуск CLI только при прямом вызове (не при импорте тестами).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
