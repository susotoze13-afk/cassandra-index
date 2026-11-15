// Второй добор источников недели 2026-11-15 (окно 2026-11-09…2026-11-15).
// Закрывает 8 слепых критериев: D2.5, D3.1, D6.1, D9.1, D9.5, D9.6a, D9.6b, D9.7.
// Применяет к calc/input/2026-11-15.json 18 R55-записей, чистка blindReasons,
// тексты driverConfidence D2/D3/D6/D9. Идемпотентен: повторный прогон ничего
// не меняет (источник с тем же URL не дублируется, покрытый критерий пропускается).
//
// Основание записей — docs/backfill/2026-11-15-sources.md (round 2);
// кандидаты собраны Bing News RSS (calc/input/drafts/fetch-bing-2026-11-15.mjs).
import { readFileSync, writeFileSync } from 'node:fs';

const ROOT = 'C:/Users/1/Projects/Cassandra Index';
const INPUT = ROOT + '/calc/input/2026-11-15.json';
const ACCESSED = '2026-11-15';

// id, title.ru, title.en, domain, url, date, cluster, state_affiliated, source_type
const SOURCES = [
  // --- D2.5 отход от ядерной риторики: анонс ядерного разоружения ---
  ['yahoo-trump-nuclear-cuts', 'Трамп планирует обсудить с Си и Путиным войну с Ираном и ядерное оружие', 'Trump plans talks with Xi Jinping and Putin on Iran war and nuclear weapons', 'yahoo.com', 'https://www.yahoo.com/news/politics/articles/prez-trump-plans-talks-xi-164306024.html', '2026-11-11', 'A-mainstream', false, 'secondary'],
  ['sana-trump-putin-xi-nuclear', 'Война с Ираном и ядерные арсеналы станут главными темами переговоров Трампа, Путина и Си', 'Iran war, nuclear arms to top Trump-Putin-Xi talks in China', 'sana.sy', 'https://sana.sy/en/international/2358628/', '2026-11-14', 'B-state-media', true, 'secondary'],
  ['telesur-trump-xi-putin-nuclear', 'Саммит Путина, Си и Трампа в Шэньчжэне: ограничение ядерных арсеналов', 'Putin Xi Trump APEC Summit: 3 Leaders to Discuss Nuclear Limits', 'telesurenglish.net', 'https://www.telesurenglish.net/putin-xi-trump-apec-summit/', '2026-11-14', 'B-state-media', true, 'secondary'],

  // --- D3.1 разрыв/понижение дипломатических отношений: обмен высылками Россия—Молдова ---
  ['usnews-russia-moldovan-diplomat', 'Россия объявила молдавского дипломата нежелательным лицом в ответ на высылку', 'Russia Declares Moldovan Diplomat Undesirable in Retaliatory Move', 'usnews.com', 'https://www.usnews.com/news/world/articles/2026-11-10/russia-declares-moldovan-diplomat-undesirable-in-retaliatory-move', '2026-11-10', 'A-mainstream', false, 'secondary'],
  ['aa-russia-moldovan-diplomat', 'Россия вызвала молдавского посла из-за высылки дипломата', 'Russia summons Moldovan ambassador for expulsion of diplomat', 'aa.com.tr', 'https://www.aa.com.tr/en/eurasia/russia-summons-moldovan-ambassador-for-expulsion-of-diplomat/4119521', '2026-11-10', 'B-state-media', true, 'secondary'],

  // --- D6.1 военное/чрезвычайное положение: режим ЧП в Гватемале ---
  ['straits-guatemala-emergency', 'Гватемала ввела режим ЧП в двух департаментах после убийства законодателя', 'Guatemala decrees state of emergency in two departments after lawmaker killed in attack', 'straitstimes.com', 'https://www.straitstimes.com/world/guatemala-decrees-state-of-emergency-in-two-departments-after-lawmaker-killed-in-attack', '2026-11-14', 'A-mainstream', false, 'secondary'],
  ['sbby-guatemala-emergency', 'Гватемала ввела чрезвычайное положение в двух департаментах после гибели законодателя', 'Guatemala declares state of emergency in two departments after lawmaker killing', 'sb.by', 'https://www.sb.by/articles/gvatemala-vvela-chrezvychaynoe-polozhenie-v-dvukh-departamentakh-posle-gibeli-zakonodatelya.html', '2026-11-15', 'B-state-media', true, 'secondary'],

  // --- D9.1 медицинская подготовка: дрон ВВС Китая для раненых ---
  ['yahoo-pla-medical-drone', 'ВВС Китая создали дрон, который вводит обезболивающее раненым', "China's Air Force builds drone that shoots painkiller darts at wounded soldiers", 'yahoo.com', 'https://www.yahoo.com/news/world/articles/china-air-force-builds-drone-123000765.html', '2026-11-14', 'A-mainstream', false, 'secondary'],
  ['globaltimes-pla-medical-drone', 'Китай разработал дрон для дистанционного введения лекарств раненым', 'China develops drone capable of injecting emergency medication into wounded personnel from a distance', 'globaltimes.cn', 'https://www.globaltimes.cn/page/202611/1374097.shtml?id=12', '2026-11-11', 'B-state-media', true, 'secondary'],

  // --- D9.5 кадровые и мобилизационные меры: добровольческие батальоны и лагерь для женщин ---
  ['tehrantimes-janfada-battalions', 'В учебном центре Джавад аль-Аэмме началась трёхмесячная подготовка батальонов «Джан-Фада-йе Иран»', "Three-month training program for 'Jan-Fada-ye Iran' battalions begins at Javad Al-Aemmeh army base", 'tehrantimes.com', 'https://www.tehrantimes.com/news/532016/Three-Month-training-program-for-Jan-Fada-ye-Iran-battalions', '2026-11-10', 'B-state-media', true, 'secondary'],
  ['firstpost-iran-women-camp', 'Зиплайн, стрельба и многое другое: внутри военного учебного центра для женщин в Иране', "Ziplining, rifle training and more: Inside Iran's military training centre for women", 'firstpost.com', 'https://www.firstpost.com/explainers/ziplining-rifle-training-and-more-inside-irans-military-training-centre-for-women-14059291.html', '2026-11-15', 'A-mainstream', false, 'secondary'],

  // --- D9.6a информационный суверенитет: помехи GPS ---
  ['nltimes-schiphol-gps-jamming', 'Семь рейсов в Схипхол нарушены помехами GPS', 'At least seven Schiphol-bound flights disrupted by GPS interference', 'nltimes.nl', 'https://nltimes.nl/2026/11/15/video-least-seven-schiphol-bound-flights-disrupted-gps-interference', '2026-11-15', 'A-mainstream', false, 'secondary'],
  ['bgnes-nato-gps-jamming', 'НАТО усиливает наблюдение в Чёрном море на фоне массовых помех GPS', 'NATO Steps Up Black Sea Surveillance Amid Widespread GPS Jamming', 'bgnes.com', 'https://www.bgnes.com/society/nato-steps-up-black-sea-surveillance-amid-widespread-gps-jamming', '2026-11-12', 'B-state-media', true, 'secondary'],

  // --- D9.6b эвакуация элит и активов: вывод миссии Тайваня из Папуа — Новой Гвинеи ---
  ['taipeitimes-png-office-withdrawal', 'Тайвань начал вывод сотрудников представительства в Папуа — Новой Гвинее', 'MOFA begins withdrawal of staff from office in PNG', 'taipeitimes.com', 'https://www.taipeitimes.com/News/taiwan/archives/2026/11/11/2003867559', '2026-11-11', 'A-mainstream', false, 'secondary'],
  ['globaltimes-png-taipei-office', 'Китай приветствует решение Папуа — Новой Гвинеи закрыть «экономический офис Тайбэя»', "China appreciates Papua New Guinea's decision to close 'Taipei Economic Office'", 'globaltimes.cn', 'https://www.globaltimes.cn/page/202611/1373959.shtml?id=12', '2026-11-09', 'B-state-media', true, 'secondary'],

  // --- D9.7 снятие «тихих» мер: открытие КПП Аббудие между Ливаном и Сирией ---
  ['lorient-abboudieh-reopens', 'До 10 000 человек и 200 грузовиков в день: КПП Аббудие вновь открыт', 'Up to 10,000 people and 200 trucks per day: Abboudieh border crossing reopens', 'lorientlejour.com', 'https://today.lorientlejour.com/article/1553847/up-to-10000-people-and-200-trucks-per-day-abboudieh-border-crossing-reopens.html', '2026-11-09', 'A-mainstream', false, 'secondary'],
  ['mtv-abboudieh-reopens', 'КПП Дабусие—Аббудие между Ливаном и Сирией вновь открыт', 'Lebanon-Syria Dabousieh–Abboudieh border crossing has reopened', 'mtv.com.lb', 'https://www.mtv.com.lb/en/news/1756599', '2026-11-09', 'A-mainstream', false, 'secondary'],
  ['globaltimes-lebanon-syria-crossing', 'Ливан и Сирия открыли пограничный переход для торговли и мобильности', 'Lebanon, Syria reopen border crossing to boost trade, mobility', 'globaltimes.cn', 'https://www.globaltimes.cn/page/202611/1374063.shtml', '2026-11-11', 'B-state-media', true, 'secondary'],
];

const byId = Object.fromEntries(SOURCES.map((s) => [s[0], s]));
const critSrc = (ids) => ids.map((id) => {
  const s = byId[id];
  if (!s) throw new Error('нет источника ' + id);
  return { url: s[4], date: s[5], cluster: s[6], type: s[8], state_affiliated: s[7] };
});

const CRITERIA = {
  'D2.5': {
    value: 0.33,
    covered: true,
    sources: critSrc(['yahoo-trump-nuclear-cuts', 'sana-trump-putin-xi-nuclear', 'telesur-trump-xi-putin-nuclear']),
  },
  'D3.1': {
    events: [0.5],
    covered: true,
    regions: ['russia-belarus', 'ukraine-moldova'],
    sources: critSrc(['usnews-russia-moldovan-diplomat', 'aa-russia-moldovan-diplomat']),
  },
  'D6.1': {
    value: 0.33,
    covered: true,
    sources: critSrc(['straits-guatemala-emergency', 'sbby-guatemala-emergency']),
  },
  'D9.1': {
    value: 0.33,
    covered: true,
    sources: critSrc(['yahoo-pla-medical-drone', 'globaltimes-pla-medical-drone']),
  },
  'D9.5': {
    value: 0.33,
    covered: true,
    sources: critSrc(['tehrantimes-janfada-battalions', 'firstpost-iran-women-camp']),
  },
  'D9.6a': {
    value: 0.67,
    covered: true,
    sources: critSrc(['nltimes-schiphol-gps-jamming', 'bgnes-nato-gps-jamming']),
  },
  'D9.6b': {
    value: 0.33,
    covered: true,
    sources: critSrc(['taipeitimes-png-office-withdrawal', 'globaltimes-png-taipei-office']),
  },
  'D9.7': {
    value: 0.33,
    covered: true,
    sources: critSrc(['lorient-abboudieh-reopens', 'mtv-abboudieh-reopens', 'globaltimes-lebanon-syria-crossing']),
  },
};

const CONF = {
  D2: {
    level: 'high',
    reason: 'Покрыто 4 из 5: смена доктрины (D2.2 = 1) — призыв высшего клерикального органа Ирана пересмотреть доктрину; технические сигналы (D2.3 = 0.2) — тревога МАГАТЭ по неинспектированному объекту; публичные угрозы (D2.1 = 0.33) перенесены из прошлой недели с раскрытием; отход от ядерной риторики (D2.5 = 0.33) — анонс трёхсторонней встречи Трампа, Путина и Си 19 ноября с повесткой сокращения ядерных арсеналов (A + B). Перевода ядерных сил в особый режим (D2.4) в окне не подтверждено.',
  },
  D3: {
    level: 'high',
    reason: 'Покрыто 5 из 5: санкционное давление (D3.3) — запрет транзита зерна Латвией, предупреждение G7, торговый спор Франции и Алжира; переговоры (D3.4 = 0.67) — анонс трёхстороннего саммита в Шэньчжэне, посредничество Кушнера, обсуждение уступки Донбасса; гуманитарные договорённости (D3.5 = 0.33) — обмен пленными по 1 200–1 300 человек и зимний доступ помощи в Газу; ультиматумы (D3.2 = 0.33) — требование Минобороны Ирана «принять требования или капитулировать» (B) и ультиматум Трампа по Ормузу с ответом Тегерана (A); понижение отношений (D3.1, события 0.5) — обмен высылками Россия—Молдова: Москва объявила молдавского дипломата нежелательным лицом в ответ на высылку из Кишинёва (A + B).',
  },
  D6: {
    level: 'medium',
    reason: 'Покрыто 3 из 4: военная переориентация экономики (D6.3 = 1) — бюджет Ирана без нефтяных доходов и нормирование бензина; эвакуация населения (D6.2 = 0.67) — 64 тыс. из Нигерии в Нигер, 340 тыс. перемещённых в Йемене, зимняя помощь Газе; режим чрезвычайного положения (D6.1 = 0.33) — Гватемала ввела 30-дневное ЧП в Сакапе и Исабале с расширением полномочий сил безопасности после убийства законодателя и трёх полицейских (A + B). Отмены мобилизационных мер (D6.4) в окне не документировано.',
  },
  D9: {
    level: 'medium',
    reason: 'Покрыто 8 из 8: финансовая изоляция (D9.2 = 0.67) — бюджет без нефти, нормирование бензина, продажа органов; транспорт и страхование (D9.3 = 1) — мины в Ормузе, горящие танкеры, предупреждение ООН, исключение из закона Джонса; стратегическое накопление (D9.4 = 0.67) — резервные угольные станции Германии и $65 млрд Сингапура в золото; медицинская подготовка (D9.1 = 0.33) — дрон ВВС Китая для дистанционного введения обезболивающего раненым (A + B); кадровые и мобилизационные меры (D9.5 = 0.33) — трёхмесячная подготовка добровольческих батальонов «Джан-Фада-йе Иран» и первый военный лагерь для женщин в Тегеране (A + B); информационный суверенитет (D9.6a = 0.67) — помехи GPS у Схипхола и массовый джамминг в Чёрном море (A + B); эвакуация элит и активов (D9.6b = 0.33) — вывод всей дипломатической миссии Тайваня из Папуа — Новой Гвинеи после требования Порт-Морсби (A + B); снятие «тихих» мер (D9.7 = 0.33) — открытие КПП Аббудие между Ливаном и Сирией после двух лет закрытия из-за ударов (A + B).',
  },
};

const input = JSON.parse(readFileSync(INPUT, 'utf8'));
const before = Object.entries(input.criteria).filter(([, c]) => c && c.covered).length;

const known = new Set(input.sources.map((s) => s.url));
let addedSources = 0;
for (const s of SOURCES) {
  const [id, ru, en, domain, url, date, cluster, state, type] = s;
  if (known.has(url)) continue;
  if (input.sources.some((x) => x.id === id)) throw new Error('дубль id источника: ' + id);
  input.sources.push({
    id,
    title: { ru, en },
    domain,
    url,
    publication_date: date,
    accessed_date: ACCESSED,
    source_type: type,
    cluster_id: cluster,
    state_affiliated: state,
    origin: 'collected-in-week',
  });
  known.add(url);
  addedSources++;
}

let addedCriteria = 0;
for (const [id, entry] of Object.entries(CRITERIA)) {
  if (input.criteria[id] && input.criteria[id].covered === true) continue;
  input.criteria[id] = entry;
  delete input.blindReasons[id];
  addedCriteria++;
}

for (const [k, v] of Object.entries(CONF)) input.driverConfidence[k] = v;

const after = Object.entries(input.criteria).filter(([, c]) => c && c.covered).length;
writeFileSync(INPUT, JSON.stringify(input, null, 2) + '\n', 'utf8');
console.log(`источников: +${addedSources} (всего ${input.sources.length})`);
console.log(`критериев покрыто: ${before} → ${after}; blindReasons: ${Object.keys(input.blindReasons).length}`);
