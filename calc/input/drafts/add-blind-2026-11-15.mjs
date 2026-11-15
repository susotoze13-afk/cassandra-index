// Добор источников недели 2026-11-15 под слепые критерии (окно 2026-11-09…2026-11-15).
// Применяет к calc/input/2026-11-15.json: 30 R55-записей, 8 критериев, чистка
// blindReasons и тексты driverConfidence. Идемпотентен: повторный прогон ничего
// не меняет (критерий уже покрыт — запись пропускается).
//
// Основание записей — docs/backfill/2026-11-15-sources.md; URL проверены
// calc/linkcheck (broken нет, часть blocked — среда проверки).
import { readFileSync, writeFileSync } from 'node:fs';

const ROOT = 'C:/Users/1/Projects/Cassandra Index';
const INPUT = ROOT + '/calc/input/2026-11-15.json';
const ACCESSED = '2026-11-15';

// id, title.ru, title.en, domain, url, date, cluster, state_affiliated, source_type
const SOURCES = [
  // --- D1.2 учения необычного масштаба ---
  ['yahoo-koalicja26-exercises', '«Коалиция желающих» начала первые военные учения в Польше', 'Coalition of the Willing kicks off first military exercises in Poland', 'yahoo.com', 'https://www.yahoo.com/news/world/articles/coalition-willing-kicks-off-first-090325324.html', '2026-11-09', 'A-mainstream', false, 'secondary'],
  ['newsam-eternity-2026', 'Азербайджан проводит совместные учения с Турцией и Грузией', 'Azerbaijan holding joint military exercises with Turkey, Georgia', 'news.am', 'https://news.am/en/news/1074638', '2026-11-13', 'A-mainstream', false, 'secondary'],
  ['scmp-algeria-yj12-drill', 'Алжир испытал сверхзвуковую ракету YJ-12 на учениях в Средиземном море', 'Algeria test-fires apparent Chinese YJ-12 supersonic missile in Mediterranean drill', 'scmp.com', 'https://www.scmp.com/news/china/military/article/3374321/algeria-test-fires-apparent-chinese-yj-12-supersonic-missile-mediterranean-drill', '2026-11-13', 'A-mainstream', false, 'secondary'],
  ['chinaview-koalicja26-exercises', 'Учения «Коалиции желающих» в Польше и борьба Европы за роль в переговорах', "Military exercise highlights Europe's bid for role in Ukraine peace talks", 'chinaview.cn', 'http://www.chinaview.cn/20261110/7f96f4cafcd841689ad0f3bffd92ca84/c.html', '2026-11-10', 'B-state-media', true, 'secondary'],
  ['reportaz-eternity-2026', 'В Баку стартовали учения Eternity-2026 с участием Азербайджана, Грузии и Турции', 'Eternity-2026: Joint military exercise of Azerbaijan, Georgia, and Türkiye opens in Baku', 'report.az', 'https://report.az/en/military/eternity-2026-joint-military-exercise-of-azerbaijan-georgia-and-turkiye-opens-in-baku', '2026-11-13', 'B-state-media', true, 'secondary'],
  ['horizons-mediterranean-falcon', 'Шенегриха проконтролировал ход учений «Средиземноморский сокол — 2026»', "Chanegriha supervises 'Mediterranean Falcon 2026' naval exercise", 'horizons.dz', 'https://www.horizons.dz/language/en/2026/11/chanegriha-supervises-mediterranean-falcon-2026-naval-exercise/', '2026-11-10', 'B-state-media', true, 'secondary'],

  // --- D1.5 развёртывание стратегических систем ---
  ['jpost-missile-city', 'Иран показал подземный «город ракет», КСИР грозит ответом', "Iran unveils massive underground 'missile city,' IRGC warns of retaliation", 'jpost.com', 'https://www.jpost.com/middle-east/iran-news/article-914507', '2026-11-11', 'A-mainstream', false, 'secondary'],
  ['almonitor-missile-city', 'Иран представил новую подземную «город ракет»: что известно', "Iran unveils new underground 'missile city': What to know", 'al-monitor.com', 'https://www.al-monitor.com/originals/2026/11/iran-unveils-new-underground-missile-city-what-know', '2026-11-10', 'A-mainstream', false, 'secondary'],
  ['hindustantimes-iran-missile-rate', 'Иран выпускает до 50 баллистических ракет в месяц — вдвое меньше довоенного', 'Iran can produce 50 ballistic missiles a month, half of its pre-war capacity: Report', 'hindustantimes.com', 'https://www.hindustantimes.com/world-news/iran-can-produce-50-ballistic-missiles-per-month-as-new-underground-facility-missile-city-unveiled-irgc-us-iran-war-report-101794457316900.html', '2026-11-11', 'A-mainstream', false, 'secondary'],
  ['tasnim-missile-city', 'КСИР представил новый «город ракет»', 'IRGC Unveils New Missile City', 'tasnimnews.ir', 'https://www.tasnimnews.ir/en/news/2026/11/10/3745272/irgc-unveils-new-missile-city', '2026-11-10', 'B-state-media', true, 'secondary'],
  ['irna-missile-city', 'КСИР представил новую стратегическую «город ракет»', "Iran's IRGC unveils new strategic missile city", 'irna.ir', 'https://en.irna.ir/news/86318328/Iran-s-IRGC-unveils-new-strategic-missile-city', '2026-11-09', 'B-state-media', true, 'secondary'],

  // --- D1.6 разведение сил / вывод войск ---
  ['hurriyet-bashiqa-handover', 'Турция начнёт передачу базы Башика Ираку', 'Türkiye to begin handover of Bashiqa base to Iraq', 'hurriyetdailynews.com', 'https://www.hurriyetdailynews.com/turkiye-to-begin-handover-of-bashiqa-base-to-iraq-229189', '2026-11-09', 'A-mainstream', false, 'secondary'],
  ['turkishminute-bashiqa-handover', 'Анкара начинает передачу базы Башика Багдаду', 'Ankara to begin handing over Bashiqa base to Baghdad', 'turkishminute.com', 'https://www.turkishminute.com/2026/11/09/ankara-to-begin-handing-over-bashiqa-base-to-baghdad/', '2026-11-09', 'A-mainstream', false, 'secondary'],
  ['anf-zilkan-withdrawal', 'Турция начала вывод войск с базы Зилкан в Мосуле', 'Turkey begins withdrawal from Zilkan military base in Mosul', 'anf-news.com', 'https://english.anf-news.com/news/turkey-begins-withdrawal-from-zilkan-military-base-in-mosul-88095', '2026-11-09', 'A-mainstream', false, 'secondary'],
  ['reportaz-zilkan-withdrawal', 'Турция завершит вывод войск с базы Зилкан в Ираке до конца 2026 года', "Türkiye to complete troop withdrawal from Iraq's Zilkan base by end of 2026", 'report.az', 'https://report.az/en/other-countries/turkiye-to-complete-troop-withdrawal-from-iraq-s-zilkan-base-by-end-of-2026', '2026-11-09', 'B-state-media', true, 'secondary'],

  // --- D3.2 ультиматумы и несовместимые требования ---
  ['irna-iran-demands-ultimatum', '«Примите требования Ирана или капитулируйте на поле боя» — Минобороны Ирана', "Accept Iran's demands or surrender on battlefield: Defense Ministry spokesperson warns enemy", 'irna.ir', 'https://en.irna.ir/news/86319236/Accept-Iran-s-demands-or-surrender-on-battlefield-Defense-Ministry', '2026-11-11', 'B-state-media', true, 'secondary'],
  ['wion-hormuz-ultimatum-response', '«Это никогда не вернётся»: ответ Ирана на ультиматум Трампа по Ормузу', "'It will never return...': Iran issues direct response to Trump after expletive-filled Hormuz ultimatum", 'wionews.com', 'https://www.wionews.com/world/-it-will-never-return-iran-s-direct-response-to-trump-after-expletive-filled-hormuz-ultimatum-1775425671185', '2026-11-12', 'A-mainstream', false, 'secondary'],
  ['toi-trump-blinks-iran-strike', 'Трамп отступил после ответа Ирана: «новая бомбардировка маловероятна»', "Trump blinks after Iran's fiery response against Qeshm attacks; 'new bombing highly unlikely'", 'timesofindia.indiatimes.com', 'https://timesofindia.indiatimes.com/videos/international/trump-blinks-after-irans-fiery-response-against-qeshm-attacks-new-bombing-highly-unlikely/videoshow/135671123.cms', '2026-11-09', 'A-mainstream', false, 'secondary'],

  // --- D4.2 военные расходы ---
  ['chinaview-japan-defense-60tln', 'Япония планирует нарастить оборонные расходы до 60 трлн иен за пять лет', 'Japan plans to raise defense spending to 60 tln yen over next 5 years', 'chinaview.cn', 'http://www.chinaview.cn/20261114/cba3c2c7516a480abec0ea2f6d0bb41d/c.html', '2026-11-14', 'B-state-media', true, 'secondary'],
  ['bastillepost-japan-defense-60tln', 'Япония планирует повысить оборонные расходы до 60 трлн иен на пять лет', 'Japan plans to raise defense spending to 60 tln yen over next 5 years', 'bastillepost.com', 'https://www.bastillepost.com/global/article/6361503-japan-plans-to-raise-defense-spending-to-60-tln-yen-over-next-5-years', '2026-11-14', 'A-mainstream', false, 'secondary'],
  ['thestar-japan-defence-60tln', 'Япония планирует повысить оборонные расходы до 60 трлн иен на пять лет', 'Japan plans to raise defence spending to 60tril yen over next five years', 'thestar.com.my', 'https://www.thestar.com.my/aseanplus/aseanplus-news/2026/11/14/japan-plans-to-raise-defence-spending-to-60tril-yen-over-next-five-years', '2026-11-14', 'A-mainstream', false, 'secondary'],

  // --- D4.5 отмена ограничений / восстановление торговых связей ---
  ['thehindu-iraq-iran-crossing', 'Ирак вновь открыл пограничный переход с Ираном', 'Iraq reopens border crossing with Iran', 'thehindu.com', 'https://www.thehindu.com/news/international/iraq-reopens-border-crossing-with-iran/article71685697.ece', '2026-11-10', 'A-mainstream', false, 'secondary'],
  ['aa-iraq-shib-crossing', 'Ирак открыл КПП Шиб на границе с Ираном после трёхнедельного закрытия', 'Iraq reopens Shib border crossing with Iran after 3-week closure', 'aa.com.tr', 'https://www.aa.com.tr/en/middle-east/-iraq-reopens-shib-border-crossing-with-iran-after-3-week-closure/4118234', '2026-11-10', 'B-state-media', true, 'secondary'],
  ['irna-iraq-chazabeh-crossing', 'Ирак вновь откроет переход Чазабе с Ираном', 'Iraq to reopen Chazabeh crossing with Iran', 'irna.ir', 'https://en.irna.ir/news/86317433/Iraq-to-reopen-Chazabeh-crossing-with-Iran', '2026-11-10', 'B-state-media', true, 'secondary'],

  // --- D7.3 новый фронт ---
  ['aa-ethiopia-eritrea-tigray-offensive', 'Эфиопия обвинила Эритрею в руководстве наступлением в Тыграе при поддержке Египта', 'Ethiopia accuses Eritrea of leading Tigray rebel offensive with Egyptian support', 'aa.com.tr', 'https://www.aa.com.tr/en/africa/ethiopia-accuses-eritrea-of-leading-tigray-rebel-offensive-with-egyptian-support/4125272', '2026-11-14', 'B-state-media', true, 'secondary'],
  ['memo-ethiopia-eritrea-offensive', 'Эфиопия: Эритрея направляет наступление повстанцев Тыграя', 'Ethiopia accuses Eritrea of leading Tigray rebel offensive with Egyptian support', 'middleeastmonitor.com', 'https://www.middleeastmonitor.com/20261114-ethiopia-accuses-eritrea-of-leading-tigray-rebel-offensive-with-egyptian-support/', '2026-11-14', 'A-mainstream', false, 'secondary'],
  ['eastleigh-ethiopia-eritrea-offensive', 'Эфиопия обвинила Эритрею в новом наступлении при поддержке Египта', "Ethiopia accuses Eritrea of leading fresh offensive with Egypt's support", 'eastleighvoice.co.ke', 'https://eastleighvoice.co.ke/regional/423839/ethiopia-accuses-eritrea-of-leading-fresh-offensive-with-egypts-support', '2026-11-14', 'A-mainstream', false, 'secondary'],

  // --- D8.1 соблюдаемое прекращение огня ---
  ['nationthailand-ceasefire-reaffirm', 'Таиланд подтвердил приверженность соглашению о прекращении огня с Камбоджей', 'Thai official reaffirms commitment to ceasefire accord with Cambodia', 'nationthailand.com', 'https://www.nationthailand.com/news/asean/40073537', '2026-11-15', 'A-mainstream', false, 'secondary'],
  ['cambodianess-peaceful-resolution', 'Камбоджа добивается мирного урегулирования спора с Таиландом', 'Cambodia seeks peaceful border resolution with Thailand, Hun Manet tells Francophonie Summit', 'cambodianess.com', 'https://cambodianess.com/article/cambodia-seeks-peaceful-border-resolution-with-thailand-hun-manet-tells-francophonie-summit', '2026-11-15', 'A-mainstream', false, 'secondary'],
  ['aa-cambodia-thailand-demarcation', 'Камбоджа предлагает возобновить демаркацию границы с Таиландом', 'Cambodia calls for resumption of border demarcation with Thailand at Francophonie Summit', 'aa.com.tr', 'https://www.aa.com.tr/en/asia-pacific/cambodia-calls-for-resumption-of-border-demarcation-with-thailand-at-francophonie-summit/4125480', '2026-11-15', 'B-state-media', true, 'secondary'],
];

const byId = Object.fromEntries(SOURCES.map((s) => [s[0], s]));
const critSrc = (ids) => ids.map((id) => {
  const s = byId[id];
  if (!s) throw new Error('нет источника ' + id);
  return { url: s[4], date: s[5], cluster: s[6], type: s[8], state_affiliated: s[7] };
});

const CRITERIA = {
  'D1.2': {
    value: 0.67,
    covered: true,
    regions: ['eu-north-europe', 'south-caucasus'],
    sources: critSrc(['yahoo-koalicja26-exercises', 'newsam-eternity-2026', 'scmp-algeria-yj12-drill', 'chinaview-koalicja26-exercises', 'reportaz-eternity-2026', 'horizons-mediterranean-falcon']),
  },
  'D1.5': {
    value: 0.67,
    covered: true,
    regions: ['middle-east'],
    sources: critSrc(['jpost-missile-city', 'almonitor-missile-city', 'hindustantimes-iran-missile-rate', 'tasnim-missile-city', 'irna-missile-city']),
  },
  'D1.6': {
    value: 0.33,
    covered: true,
    regions: ['middle-east'],
    sources: critSrc(['hurriyet-bashiqa-handover', 'turkishminute-bashiqa-handover', 'anf-zilkan-withdrawal', 'reportaz-zilkan-withdrawal']),
  },
  'D3.2': {
    value: 0.33,
    covered: true,
    regions: ['middle-east'],
    sources: critSrc(['irna-iran-demands-ultimatum', 'wion-hormuz-ultimatum-response', 'toi-trump-blinks-iran-strike']),
  },
  'D4.2': {
    value: 0.33,
    covered: true,
    sources: critSrc(['chinaview-japan-defense-60tln', 'bastillepost-japan-defense-60tln', 'thestar-japan-defence-60tln']),
  },
  'D4.5': {
    events: [0.5],
    covered: true,
    sources: critSrc(['thehindu-iraq-iran-crossing', 'aa-iraq-shib-crossing', 'irna-iraq-chazabeh-crossing']),
  },
  'D7.3': {
    value: 1,
    covered: true,
    regions: ['africa'],
    sources: critSrc(['aa-ethiopia-eritrea-tigray-offensive', 'memo-ethiopia-eritrea-offensive', 'eastleigh-ethiopia-eritrea-offensive']),
  },
  'D8.1': {
    value: 1,
    covered: true,
    regions: ['east-asia'],
    sources: critSrc(['nationthailand-ceasefire-reaffirm', 'cambodianess-peaceful-resolution', 'aa-cambodia-thailand-demarcation']),
  },
};

const CONF = {
  D1: {
    level: 'high',
    reason: 'Покрыто 6 из 6: боевые действия (D1.4) подтверждены кластерами A и B — удар по больнице «Насер» в Газе, удар иранских БПЛА по радиолокатору США в Бахрейне, удары по больнице в Киеве, обмен ударами Эфиопия—Эритрея, атаки хуситов в Таизе, 44 погибших в ДР Конго. Учения (D1.2 = 0.67) — первые учения «Коалиции желающих» KOALICJA 26.2 в Польше (2 800 военных из 11 стран, 9–22 ноября; A + B), Eternity-2026 в Баку (A + B), Mediterranean Falcon 2026 Алжира (A + B). Развёртывание стратегических систем (D1.5 = 0.67) — подземный «город ракет» КСИР, оценки 1 500–2 500 баллистических ракет, до 50 ракет в месяц (A + B). Вывод войск (D1.6 = 0.33) — Турция начала поэтапный вывод с базы Зилкан в Ираке по договорённости с Багдадом (A + B). Логистика (D1.3 = 0.33) — ремонт переданных Украине F-16 и дроновые сделки Баку—Киев; сопоставление слабое, вклад мал.',
  },
  D3: {
    level: 'medium',
    reason: 'Покрыто 4 из 5: санкционное давление (D3.3) — запрет транзита зерна Латвией, предупреждение G7, торговый спор Франции и Алжира; переговоры (D3.4 = 0.67) — анонс трёхстороннего саммита в Шэньчжэне, посредничество Кушнера, обсуждение уступки Донбасса; гуманитарные договорённости (D3.5 = 0.33) — обмен пленными по 1 200–1 300 человек (обсуждается) и зимний доступ помощи в Газу; ультиматумы (D3.2 = 0.33) — требование Минобороны Ирана «принять требования или капитулировать» (B) и ультиматум Трампа по Ормузу с ответом Тегерана (A). Не покрыт D3.1: разрывов дипломатических отношений и закрытия посольств в лентах окна нет (searched-none).',
  },
  D4: {
    level: 'high',
    reason: 'Покрыто 6 из 6: рынки (D4.6 = 0.67) — Brent выше $96, оптовые цены +6,5 % г/г, падение капитализации Nvidia на $1,7 трлн, печное топливо +59 %; цепочки (D4.3 = 0.67) и блокировка торговли (D4.4) — подрывы танкеров на минах в Ормузе, призыв ООН пропустить удобрения, контрабанда нефти в Ираке, продление исключения из закона Джонса; новые санкции (D4.1) — Латвия, G7, спор ЕС и Алжира; военные расходы (D4.2 = 0.33) — Япония рассматривает 60 трлн иен на 2027–2031 (A + B) при сохранении рекордных бюджетов; снятие ограничений (D4.5 = 0.5 события) — Ирак вновь открыл КПП Шиб/Чазабе с Ираном после трёхнедельного закрытия (A + B).',
  },
  D7: {
    level: 'high',
    reason: 'Покрыто 4 из 4: вовлечение новых государств (D7.1) — Эфиопия и Эритрея, делегация КНДР в Москве, оборонное соглашение Турции и Катара, прекращение поставок Болгарией; атаки вне театра (D7.2) — удар по базе США в Бахрейне, перехваты у Эр-Рияда, сеть в Европе; выход третьих сторон (D7.4 = 0.67) — Болгария, пауза Трампа, отсутствие срочности у Израиля; новый фронт (D7.3 = 1) — четвёртый раунд наступления в Тыграе с обвинением Эритреи в руководстве и Египта в поставках (B + A).',
  },
  D8: {
    level: 'medium',
    reason: 'Покрыто 3 из 4: мирные договорённости (D8.2 = 0.33) — анонс саммита и посредничество без подписанного документа; наблюдение (D8.3 = 0.33) — Совет Безопасности и призывы ООН по судоходству; прекращение огня (D8.1 = 1) — перемирие Таиланд—Камбоджа соблюдается: официальный Бангкок подтвердил приверженность соглашению, Пномпень предлагает демаркацию, нарушений в окне нет (A + B). Снижение интенсивности (D8.4) не покрыто: нужен тренд ≥3 окон без нарушений.',
  },
};

const input = JSON.parse(readFileSync(INPUT, 'utf8'));
const before = Object.entries(input.criteria).filter(([, c]) => c && c.covered).length;

const known = new Set(input.sources.map((s) => s.url));
let addedSources = 0;
for (const s of SOURCES) {
  const [id, ru, en, domain, url, date, cluster, state, type] = s;
  if (known.has(url)) continue;
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
