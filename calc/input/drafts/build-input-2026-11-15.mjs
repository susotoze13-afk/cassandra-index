// Сборка входа недели 2026-11-15 (окно 2026-11-09…2026-11-15).
// Машинный черновик: кандидаты берутся из calc/input/drafts/candidates-2026-11-15.json
// (сбор лент 2026-11-15), критерии размечены редакционно-машинно; источники Д2.1
// перенесены из недели 2026-11-08 (приём проекта — раскрыто в driverConfidence).
// Пишет фрагменты part-*.json по ADR 0074 и слитый calc/input/2026-11-15.json.
import { readFileSync, writeFileSync } from 'node:fs';

const root = 'C:/Users/1/Projects/Cassandra Index';
const WEEK = '2026-11-15';
const ACCESSED = '2026-11-15';
const cand = JSON.parse(readFileSync(root + '/calc/input/drafts/candidates-2026-11-15.json', 'utf8'));
const prev = JSON.parse(readFileSync(root + '/calc/input/2026-11-08.json', 'utf8'));

const clean = (s) => (s || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]*>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&apos;|&#0?39;/g, "'")
  .replace(/&#8217;/g, "'").replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ').trim();
const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };
const dateOf = (x) => { const t = new Date(x); return Number.isNaN(t.getTime()) ? '' : t.toISOString().slice(0, 10); };

const sources = [];
const byId = new Map();

function resolve(def) {
  const hits = cand.items.filter((i) => hostOf(i.link) === def.host && def.re.test(clean(i.title)));
  if (!hits.length) throw new Error(`не найден кандидат: ${def.id} (${def.host} / ${def.re})`);
  const item = hits.sort((a, b) => (dateOf(a.date) < dateOf(b.date) ? 1 : -1))[0];
  const date = dateOf(item.date);
  if (!date || date < '2026-11-09' || date > '2026-11-15') throw new Error(`дата вне окна: ${def.id} ${date}`);
  // Ленты отдают URL с HTML-сущностями и utm-метками — публикуем чистый адрес.
  let url = item.link.replace(/&#0?38;|&amp;/g, '&');
  if (/[?&]utm_/.test(url)) url = url.split('?')[0];
  return { url, date, titleEn: clean(item.title) };
}

function addSource(def) {
  const r = resolve(def);
  const rec = {
    id: def.id,
    title: { ru: def.ru, en: r.titleEn },
    domain: def.host,
    url: r.url,
    publication_date: r.date,
    accessed_date: ACCESSED,
    source_type: def.type || 'secondary',
    cluster_id: def.cluster,
    state_affiliated: def.affiliated === true,
    origin: 'collected-in-week',
  };
  sources.push(rec);
  byId.set(def.id, rec);
  return rec;
}

function carrySource(url) {
  const rec = prev.sources.find((s) => s.url === url);
  if (!rec) throw new Error(`источник переноса отсутствует в R55 2026-11-08: ${url}`);
  if (byId.has(rec.id)) return byId.get(rec.id);
  const copy = { ...rec, title: { ...rec.title }, origin: 'editorial-backfill' };
  sources.push(copy);
  byId.set(copy.id, copy);
  return copy;
}

const A = (id, host, re, ru, extra = {}) => addSource({ id, host, re, ru, cluster: 'A-mainstream', affiliated: false, ...extra });
const B = (id, host, re, ru, extra = {}) => addSource({ id, host, re, ru, cluster: 'B-state-media', affiliated: true, ...extra });
const F = (id, host, re, ru, extra = {}) => addSource({ id, host, re, ru, cluster: 'F-financial', affiliated: false, ...extra });

// --- Д1: военная сфера ---
const sTersyanka = B('tass-tersyanka', 'tass.com', /liberate.*Tersyanka|Tersyanka/i, 'Российские силы освободили Терсянку в Запорожской области — Генштаб');
const sPentagon = A('straitstimes-pentagon-troops', 'straitstimes.com', /Pentagon eyes smaller troop cuts/i, 'Пентагон пересматривает сокращение войск в Европе');
const sPentagonJp = A('japantimes-pentagon-troops', 'japantimes.co.jp', /Pentagon eyes smaller troop cuts/i, 'Пентагон намерен сократить войска в Европе меньше запланированного');
const sF16 = B('tass-f16-repairs', 'tass.com', /F-16s supplied to Ukraine/i, 'Поставленные Украине F-16 постоянно находятся в ремонте — Зеленский');
const sDroneDeals = A('ocmedia-drone-deals-baku', 'oc-media.org', /drone deals between Baku and Kyiv/i, 'Зеленский хвалит новые дроновые сделки Баку и Киева');

const sNasser = A('guardian-nasser-hospital', 'theguardian.com', /Nasser hospital in Gaza kills surgeon/i, 'Авиаудар Израиля по больнице «Насер» в Газе: погибли хирург и пятеро');
const sIranRadar = A('guardian-iran-radar-bahrain', 'theguardian.com', /targeted US military radar in Bahrain/i, 'Иран заявил об ударе по радиолокатору США в Бахрейне');
const sIranRadarTass = B('tass-bahrain-radar', 'tass.com', /radar infrastructure at US military base in Bahrain/i, 'Иран ударил БПЛА по радиолокационной инфраструктуре базы США в Бахрейне — КСИР');
const sIranRadarAa = B('aa-bahrain-six-drones', 'aa.com.tr', /targeted US radar site in Bahrain with 6 drones/i, 'Иран заявил об ударе шестью дронами по радиолокатору США в Бахрейне');
const sKyivHospital = A('africanews-kyiv-hospital', 'africanews.com', /Russian drone attacks hit Kyiv hospital/i, 'Российские дроны ударили по больнице в Киеве, двое погибли в Одессе');
const sEthiopiaEritrea = B('aa-ethiopia-eritrea', 'aa.com.tr', /Ethiopia, Eritrea reportedly exchange drone/i, 'Эфиопия и Эритрея обменялись ударами дронов и артиллерии');
const sHouthiTaiz = B('aa-houthi-taiz', 'aa.com.tr', /Houthi attacks kill 51/i, 'Атаки хуситов в Таизе: 51 погибший за 12 дней');
const sDrc44 = A('africanews-drc-44', 'africanews.com', /DR Congo: At least 44 dead/i, 'ДР Конго: не менее 44 погибших при атаке боевиков, связанных с ИГ');
const sPakistan24 = A('dawn-24-militants', 'dawn.com', /24 terrorists killed during operations/i, 'Пакистан: 24 боевика уничтожены в Хайбер-Пахтунхве и Белуджистане');
const sHamasCommander = B('aljazeera-hamas-commander', 'aljazeera.com', /kills senior Hamas commander/i, 'Израильский удар убил старшего командира ХАМАС в Газе');
const sSudanLongRange = A('un-sudan-long-range', 'news.un.org', /long-range strikes are the norm/i, 'Судан: после дронов-камикадзе нормой стали дальнобойные удары');
const sHormuzSailors = B('reportaz-hormuz-sailors', 'report.az', /25 sailors killed/i, 'ООН: не менее 25 моряков погибли в Ормузском проливе и вокруг него');

// --- Д2: ядерная сфера ---
const sDoctrine = A('iranintl-doctrine-review', 'iranintl.com', /clerical governing body calls for nuclear doctrine review/i, 'Высший клерикальный орган Ирана призвал пересмотреть ядерную доктрину');
const sIaia = A('iranintl-iaea-alarm', 'iranintl.com', /IAEA raises alarm over Iranian enrichment plant/i, 'МАГАТЭ встревожено объектом обогащения в Иране, который никогда не инспектировало');
const sNetanyahuNuclear = B('reportaz-netanyahu-nuclear', 'report.az', /Netanyahu says Iran seeks to revive nuclear program/i, 'Нетаньяху: Иран стремится возродить ядерную программу');
const sIsraelFearsStrike = A('jpost-israel-fears-strike', 'jpost.com', /Israel fears surprise US strike on Iran/i, 'Израиль опасается внезапного удара США по Ирану на фоне ядерных переговоров');
const sNuclearArmsCuts = A('almonitor-nuclear-arms-cuts', 'al-monitor.com', /raise nuclear-arms cuts with Putin, Xi/i, 'Трамп поднимет вопрос сокращения ядерных арсеналов с Путиным и Си');

// --- Д3: дипломатия ---
const sSevenConditions = A('iranintl-seven-conditions', 'iranintl.com', /US must .surrender. to seven conditions/i, 'Иран требует от США «сдаться» по семи условиям');
const sTotalVictory = A('iranintl-total-victory', 'iranintl.com', /Trump vows .total victory/i, 'Трамп обещает «полную победу», Иран отвергает уступки');
const sLatviaGrain = B('tass-latvia-grain-ban', 'tass.com', /Latvian Foreign Ministry drafts ban/i, 'МИД Латвии готовит запрет транзита российского и белорусского зерна');
const sG7Warns = A('iranintl-g7-warns', 'iranintl.com', /G7 warns Iran/i, 'G7 предупреждает Иран о продолжении давления');
const sFranceAlgeria = A('africanews-france-algeria', 'africanews.com', /France escalates Algeria trade dispute/i, 'Франция выводит торговый спор с Алжиром на уровень ЕС');
const sShenzhen = B('tass-shenzhen-summit', 'tass.com', /trilateral summit to be held in Shenzhen/i, 'Трёхсторонний саммит Путина, Си и Трампа пройдёт в Шэньчжэне 19 ноября — Кремль');
const sShenzhenScmp = A('scmp-shenzhen-summit', 'scmp.com', /White House confirms US-China-Russia trilateral talks/i, 'Белый дом подтвердил трёхсторонние переговоры США, Китая и России на полях саммита');
const sHq17 = A('scmp-hq17-taiwan', 'scmp.com', /HQ-17 air-defence system/i, 'ПВО HQ-17: способна ли она прикрыть десантные силы КНР от ударов с Тайвань');
const sKushner = B('aljazeera-kushner-broker', 'aljazeera.com', /Kushner says he aims to broker Europe-Russia talks/i, 'Кушнер заявил, что намерен организовать переговоры Европы и России');
const sCedingDonbas = A('almonitor-ceding-donbas', 'al-monitor.com', /Ukraine ceding Donbas for NATO membership/i, 'Зеленский: США предлагали уступить Донбасс в обмен на членство в НАТО');
const sRussiaPullback = A('washingtonpost-russia-pullback', 'washingtonpost.com', /Russia seeks NATO pullback/i, 'Россия требует отвода НАТО; Зеленский говорит об обсуждении уступок территорией');
const sPrisonerSwap = B('aa-zelensky-prisoner-swap', 'aa.com.tr', /prisoner swap involving 1,200/i, 'Зеленский: стороны обсуждают обмен пленными по 1 200–1 300 человек');

// --- Д4: экономика ---
const sTankersFire = B('aa-tankers-fire', 'aa.com.tr', /2 tankers caught fire after hitting naval mine/i, 'Два танкера загорелись после подрыва на морской мине в Ормузе');
const sTankersTass = B('tass-tankers-mines', 'tass.com', /Two oil tankers hit mines/i, 'Два нефтяных танкера подорвались на минах при проходе Ормузского пролива');
const sTankersMonitor = A('almonitor-tankers-mines', 'al-monitor.com', /three tankers on fire after hitting mines/i, 'ВМС Ирана: три танкера горят после подрыва на минах в Ормузе');
const sUnMaritime = B('aa-un-maritime-attacks', 'aa.com.tr', /UN warns of rising maritime attacks/i, 'ООН предупреждает о росте морских атак и требует восстановить судоходство');
const sFertilisers = A('almonitor-fertilisers', 'al-monitor.com', /let fertilisers through Hormuz/i, 'ООН призывает Иран и США пропустить удобрения через Ормуз');
const sJonesAct = F('oilprice-jones-act', 'oilprice.com', /Jones Act Waiver/i, 'Трамп продлил исключение из закона Джонса ещё на 90 дней');
const sIraqSmuggling = B('aljazeera-iraq-smuggling', 'aljazeera.com', /Iraq PM sacks nine officials over oil smuggling/i, 'Премьер Ирака уволил девять чиновников из-за контрабанды нефти');
const sBrent96 = F('oilprice-brent-96', 'oilprice.com', /Brent Crude Climbs Back Above \$96/i, 'Brent вернулся выше $96 на эскалации вокруг Ирана');
const sPpi = A('cnbc-ppi', 'cnbc.com', /Wholesale prices rose 0.3%/i, 'Оптовые цены в США выросли на 0,3 %, годовой рост 6,5 % — максимум за четыре года');
const sNvidia = A('cnbc-nvidia-17t', 'cnbc.com', /longest weekly losing streak since 2012/i, 'Nvidia: худшая недельная серия с 2012 года, капитализация упала на $1,7 трлн');
const sStocks3t = A('hindustantimes-stocks-3t', 'hindustantimes.com', /3 trillion US stock market loss/i, 'Трамп винит демократов в потере $3 трлн капитализации рынка США');
const sHeatingOil = A('cnbc-heating-oil', 'cnbc.com', /Heating oil prices are up 59%/i, 'Цены на печное топливо выросли на 59 % к прошлой зиме');

// --- Д5: информационная и кибер-сфера ---
const sThreatEurope = A('iranintl-threat-europe', 'iranintl.com', /Iran threatens US bases in Europe/i, 'Иран угрожает базам США в Европе в случае возобновления атак');
const sThreatTrump = A('iranintl-threat-trump', 'iranintl.com', /threaten to kill Trump/i, 'Иранские командиры угрожают убить Трампа и бить по целям США по всему миру');
const sThreatArmenia = A('iranintl-threat-armenia', 'iranintl.com', /Iran threatens Armenia/i, 'Иран угрожает Армении на фоне прохождения «маршрута Трампа»');
const sKazakhNuclear = A('astanatimes-kazakhstan-nuclear', 'astanatimes.com', /Kazakhstan Advances Nuclear Power Plans/i, 'Казахстан продвигает планы атомной энергетики');
const sFranceHack = A('iranintl-france-hack', 'iranintl.com', /France probes blood freezer hack/i, 'Франция расследует взлом холодильника с кровью после похожих атак');
const sIranNetwork = A('iranintl-iran-network-europe', 'iranintl.com', /Iran-linked network helped orchestrate/i, 'Сеть из семи человек, связанная с Ираном, организовала волну атак в Европе');
const sCisa = addSource({ id: 'cisa-advisory', host: 'cisa.gov', re: /./, ru: 'CISA: бюллетень по киберугрозам', cluster: 'C-registries', affiliated: false, type: 'primary' });
const sUsRejectsRadar = A('iranintl-us-rejects-radar', 'iranintl.com', /US rejects Iran.s radar claim/i, 'США отвергли заявление Ирана о радиолокаторе и сообщили о сбитых дронах');

// --- Д6: тыл ---
const sNigeria64k = A('un-nigeria-64k', 'news.un.org', /64,000 flee Nigeria/i, 'Почти 64 тыс. человек бежали из Нигерии в Нигер');
const sYemenDisplaced = B('aa-yemen-displaced', 'aa.com.tr', /displaced over 340,000/i, 'Йемен: бои вытеснили более 340 тыс. человек');
const sGazaWinter = A('un-gaza-winter-aid', 'news.un.org', /winter supplies in Gaza/i, 'Гуманитарные организации требуют быстрого ввоза зимних грузов в Газу');
const sUnEvacuations = B('tass-un-evacuations', 'tass.com', /considers supporting future evacuations/i, 'Управление ООН по правам человека рассматривает поддержку будущих эвакуаций');
const sIranBudget = F('oilprice-iran-budget', 'oilprice.com', /Budget Without Oil Revenue/i, 'Иран готовит бюджет без нефтяных доходов');
const sGasoline = A('iranintl-gasoline-rationing', 'iranintl.com', /Iran rations gasoline/i, 'Иран вводит нормирование бензина, не решаясь поднять цены');

// --- Д7: вовлечение третьих сторон ---
const sTurkeyQatar = A('almonitor-turkey-qatar', 'al-monitor.com', /Turkey, Qatar sign mutual defence agreement/i, 'Турция и Катар подписали соглашение о взаимной обороне');
const sNorthKorea = B('tass-north-korea-moscow', 'tass.com', /North Korea.s official delegation arrives in Moscow/i, 'Официальная делегация КНДР прибыла в Москву — ЦТАК');
const sBulgariaWeapons = B('tass-bulgaria-weapons', 'tass.com', /Bulgaria to stop supplying weapons to Ukraine/i, 'Болгария прекращает поставки оружия Украине — премьер');
const sBlackSea = A('balkaninsight-black-sea', 'balkaninsight.com', /Black Sea Countries Support to Counter Security Threats/i, 'ЕС предложил странам Чёрного моря поддержку против угроз безопасности');
// Региональные ленты недели (добор покрытия: Балтия, Балканы, Центральная Азия).
const sBnnWarship = A('bnn-gulf-warship', 'bnn-news.com', /Ukrainian drone strikes Russian warship/i, 'Украинский дрон ударил по российскому военному кораблю в Финском заливе');
const sBnnRailBaltica = A('bnn-rail-baltica', 'bnn-news.com', /freezing Rail Baltica/i, 'Латвия рассматривает заморозку проекта Rail Baltica');
const sBnnGrainChecks = A('bnn-latvia-grain-checks', 'bnn-news.com', /transit grain shipments in Latvia/i, 'Проверки транзитных партий зерна в Латвии не нашли украинского зерна');
const sKursivSibur = A('kursiv-sibur-sanctions', 'kz.kursiv.media', /UK imposes sanctions on Russia.s SIBUR/i, 'Британия ввела санкции против СИБУРа; Казахстан может почувствовать эффект');
const sKossevKfor = A('kossev-serbia-kfor', 'kossev.info', /komandantom Kfora|Kfora/i, 'Начальник Генштаба Сербии обсудил с командующим KFOR ситуацию безопасности в Косове');
const sSaudiIntercepts = A('almonitor-saudi-intercepts', 'al-monitor.com', /Saudi-led coalition intercepts missiles/i, 'Коалиция Саудовской Аравии перехватила ракеты в сторону Эр-Рияда и дроны');
const sSaudiInterceptsAj = B('aljazeera-saudi-intercepts', 'aljazeera.com', /intercepts suspected Houthi missiles/i, 'Коалиция перехватила ракеты и дроны хуситов у Эр-Рияда');
const sMeeDrone = A('mee-coalition-drone', 'middleeasteye.net', /Coalition forces intercept another drone/i, 'Силы коалиции перехватили очередной дрон над Восточной провинцией Саудовской Аравии');
const sHoldAttacks = A('almonitor-trump-hold-attacks', 'al-monitor.com', /may hold off on Iran attacks/i, 'Трамп сказал советникам, что может воздержаться от ударов по Ирану');
const sNoUrgentStrike = A('jpost-no-urgent-strike', 'jpost.com', /sees no urgent need to strike Iran/i, 'Оборонное ведомство Израиля не видит срочной необходимости бить по Ирану');
const sPentagonReversal = A('japantimes-pentagon-reversal', 'japantimes.co.jp', /In reversal, Pentagon eyes smaller troop cuts/i, 'Разворот: Пентагон сократит войска в Европе меньше');

// --- Д8: деэскалация ---
const sCeasefireCompliance = B('aa-ceasefire-compliance', 'aa.com.tr', /urge ceasefire compliance/i, '17 стран осудили удар по больнице в Газе и призвали соблюдать перемирие');
const sUnScHormuz = A('un-sc-hormuz', 'news.un.org', /Fragile Gulf calm tested/i, 'Совет Безопасности: хрупкое спокойствие в Заливе под давлением угроз судоходству');
const sTalksNextRound = B('tass-kushner-contacts', 'tass.com', /direct contacts between Russia and Europe/i, 'США намерены содействовать прямым контактам России и Европы по Украине');

// --- Д9: предвестники ---
const sSingaporeGold = F('oilprice-singapore-gold', 'oilprice.com', /65 Billion Bet on the Future of Gold/i, 'Сингапур ставит $65 млрд на будущее золота');
const sGermanyCoal = B('reportaz-germany-coal', 'report.az', /reserve coal plants/i, 'Германия рассматривает резервные угольные станции ради экономии газа');
const sBessentBase = A('guardian-bessent-base', 'theguardian.com', /Bessent is reportedly latest Trump official to move to military base/i, 'Глава Минфина США Бессент переехал на военную базу из-за угроз Ирана');
const sOrgans = A('iranintl-organs-sale', 'iranintl.com', /put multiple organs up for sale/i, 'Иранцы на фоне нужды выставляют на продажу органы');

// ---------- критерии ----------
const C = {};
const put = (id, entry) => { C[id] = entry; };
const src = (rec, extra = {}) => ({ url: rec.url, date: rec.publication_date, cluster: rec.cluster_id, type: rec.source_type, state_affiliated: rec.state_affiliated, ...extra });

put('D1.1', { events: [0.5, 0.5], covered: true, regions: ['ukraine-moldova', 'russia-belarus', 'eu-north-europe'],
  sources: [sTersyanka, sPentagon, sPentagonJp].map((s) => src(s)) });
put('D1.3', { value: 0.33, covered: true, regions: ['ukraine-moldova', 'russia-belarus', 'south-caucasus'],
  sources: [sF16, sDroneDeals].map((s) => src(s)) });
put('D1.4', { events: [2, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5], covered: true,
  regions: ['middle-east', 'ukraine-moldova', 'russia-belarus', 'africa', 'south-asia'],
  sources: [sIranRadarTass, sIranRadar, sNasser, sKyivHospital, sEthiopiaEritrea, sHouthiTaiz, sDrc44, sPakistan24, sHamasCommander, sSudanLongRange, sHormuzSailors].map((s) => src(s)) });

// Д2.1 — перенос из 2026-11-08 (приём проекта, раскрыт в driverConfidence).
const d21 = prev.criteria['D2.1'];
put('D2.1', { value: d21.value, covered: true, sources: d21.sources.map((s) => { carrySource(s.url); return { ...s }; }) });
put('D2.2', { value: 1, covered: true, sources: [sDoctrine, sNetanyahuNuclear, sIsraelFearsStrike].map((s) => src(s)) });
put('D2.3', { events: [0.5, 0.5], covered: true, sources: [sIaia, sNetanyahuNuclear].map((s) => src(s)) });

put('D3.3', { events: [1, 0.5, 0.5, 0.5], covered: true, regions: ['russia-belarus', 'eu-north-europe', 'baltic', 'middle-east', 'africa', 'central-asia'],
  sources: [sLatviaGrain, sG7Warns, sFranceAlgeria, sKursivSibur, sBnnGrainChecks].map((s) => src(s)) });
put('D3.4', { value: 0.67, covered: true, regions: ['ukraine-moldova', 'russia-belarus', 'eu-north-europe', 'east-asia', 'north-america', 'central-asia', 'balkans'],
  sources: [sShenzhen, sKushner, sCedingDonbas, sRussiaPullback, sKossevKfor].map((s) => src(s)) });
put('D3.5', { value: 0.33, covered: true, regions: ['ukraine-moldova', 'russia-belarus', 'middle-east'],
  sources: [sPrisonerSwap, sGazaWinter].map((s) => src(s)) });

put('D4.1', { events: [1, 0.5, 0.5, 0.5], covered: true, regions: ['russia-belarus', 'eu-north-europe', 'baltic', 'middle-east', 'africa', 'central-asia'],
  sources: [sLatviaGrain, sG7Warns, sFranceAlgeria, sKursivSibur, sBnnGrainChecks].map((s) => src(s)) });
put('D4.3', { value: 0.67, covered: true, regions: ['middle-east', 'east-asia', 'eu-north-europe', 'south-asia'],
  sources: [sTankersMonitor, sUnMaritime, sHormuzSailors, sIraqSmuggling].map((s) => src(s)) });
put('D4.4', { events: [1, 1, 0.5, 0.5], covered: true, regions: ['middle-east', 'east-asia', 'south-asia'],
  sources: [sTankersFire, sTankersTass, sFertilisers, sJonesAct].map((s) => src(s)) });
put('D4.6', { value: 0.67, covered: true, regions: ['north-america', 'eu-north-europe', 'east-asia', 'middle-east'],
  sources: [sBrent96, sPpi, sNvidia, sStocks3t, sHeatingOil].map((s) => src(s)) });

put('D5.1', { value: 1, covered: true, regions: ['middle-east', 'north-america', 'eu-north-europe', 'south-caucasus'],
  sources: [sThreatEurope, sThreatTrump, sTotalVictory, sIranRadarTass, sThreatArmenia].map((s) => src(s)) });
put('D5.2', { events: [1, 1], covered: true, regions: ['eu-north-europe', 'middle-east'],
  sources: [sFranceHack, sIranNetwork, sCisa].map((s) => src(s)) });
put('D5.3', { value: 0.33, covered: true, regions: ['middle-east', 'north-america'],
  sources: [sUsRejectsRadar, sIranRadarTass].map((s) => src(s)) });

put('D6.2', { value: 0.67, covered: true, regions: ['africa', 'middle-east'],
  sources: [sNigeria64k, sYemenDisplaced, sGazaWinter, sUnEvacuations].map((s) => src(s)) });
put('D6.3', { value: 1, covered: true, regions: ['middle-east'],
  sources: [sIranBudget, sGasoline].map((s) => src(s)) });

put('D7.1', { events: [1, 0.5, 0.5, 0.5, 0.5], covered: true, regions: ['africa', 'east-asia', 'middle-east', 'eu-north-europe', 'balkans'],
  sources: [sEthiopiaEritrea, sNorthKorea, sTurkeyQatar, sBulgariaWeapons, sBlackSea].map((s) => src(s)) });
put('D7.2', { events: [1, 1, 0.5, 0.5, 0.5, 0.5], covered: true, regions: ['middle-east', 'eu-north-europe', 'north-america', 'baltic'],
  sources: [sIranRadarTass, sIranRadarAa, sIranRadar, sIranNetwork, sSaudiIntercepts, sSaudiInterceptsAj, sMeeDrone, sBnnWarship].map((s) => src(s)) });
put('D7.4', { value: 0.67, covered: true, regions: ['middle-east', 'north-america', 'eu-north-europe', 'ukraine-moldova'],
  sources: [sBulgariaWeapons, sHoldAttacks, sNoUrgentStrike, sPentagonReversal].map((s) => src(s)) });

put('D8.2', { value: 0.33, covered: true, regions: ['ukraine-moldova', 'russia-belarus', 'eu-north-europe', 'east-asia'],
  sources: [sShenzhen, sKushner, sTalksNextRound, sCedingDonbas].map((s) => src(s)) });
put('D8.3', { value: 0.33, covered: true, regions: ['middle-east'],
  sources: [sUnScHormuz, sUnMaritime].map((s) => src(s)) });

put('D9.2', { value: 0.67, covered: true, sources: [sIranBudget, sGasoline, sOrgans].map((s) => src(s)) });
put('D9.3', { value: 1, covered: true, regions: ['middle-east', 'east-asia', 'south-asia', 'eu-north-europe', 'baltic'],
  sources: [sTankersFire, sTankersTass, sTankersMonitor, sUnMaritime, sJonesAct, sBnnRailBaltica].map((s) => src(s)) });
put('D9.4', { value: 0.67, covered: true, sources: [sGermanyCoal, sSingaporeGold, sJonesAct].map((s) => src(s)) });

// непокрытые — явный null + причина
const ids = ['D1.1','D1.2','D1.3','D1.4','D1.5','D1.6','D2.1','D2.2','D2.3','D2.4','D2.5','D3.1','D3.2','D3.3','D3.4','D3.5','D4.1','D4.2','D4.3','D4.4','D4.5','D4.6','D5.1','D5.2','D5.3','D5.4','D6.1','D6.2','D6.3','D6.4','D7.1','D7.2','D7.3','D7.4','D8.1','D8.2','D8.3','D8.4','D9.1','D9.2','D9.3','D9.4','D9.5','D9.6a','D9.6b','D9.7'];
const criteria = {};
const blindReasons = {};
for (const id of ids) {
  if (C[id]) { criteria[id] = C[id]; continue; }
  criteria[id] = null;
  // в окне искали: если событие есть, но независимость не набрана — gate-failed; иначе searched-none
  blindReasons[id] = ['D2.4', 'D8.1', 'D9.6b', 'D9.6a', 'D9.5', 'D1.5', 'D1.2', 'D6.1'].includes(id) ? 'gate-failed' : 'searched-none';
}

const driverConfidence = {
  D1: { level: 'low', reason: 'Покрыто 3 из 6: боевые действия (D1.4) подтверждены кластерами A и B — удар по больнице «Насер» в Газе, удар иранских БПЛА по радиолокатору США в Бахрейне, удары по больнице в Киеве, обмен ударами Эфиопия—Эритрея, атаки хуситов в Таизе, 44 погибших в ДР Конго. Перемещения (D1.1) — взятие Терсянки (B) и пересмотр сокращения войск США в Европе (A). Логистика (D1.3 = 0.33) — ремонт переданных Украине F-16 (B) и дроновые сделки Баку—Киев (A); сопоставление с критерием слабое, вклад мал. Учения (D1.2) и развёртывание стратегических систем (D1.5) в окне есть, но каждый опирается на один кластер (пробел покрытия лентами: Reuters/AP/ISW недоступны) — помечены gate-failed, не покрыты.' },
  D2: { level: 'medium', reason: 'Покрыто 3 из 5: пересмотр ядерной доктрины высшим клерикальным органом Ирана (A) при заявлении Нетаньяху о возрождении программы (B) — D2.2 = 1; тревога МАГАТЭ по неинспектированному объекту обогащения (D2.3). D2.1 (0.33) перенесён из недели 2026-11-08 вместе с источниками — приём проекта, раскрытие обязательно: в окне публичных ядерных угроз уровня прошлой недели не появилось.' },
  D3: { level: 'medium', reason: 'Покрыто 3 из 5: санкционное давление (D3.5 нет) — запрет транзита зерна Латвией (B), предупреждение G7 (A), торговый спор Франции и Алжира (A). Переговоры (D3.4 = 0.67) — анонс трёхстороннего саммита в Шэньчжэне, посредничество Кушнера, обсуждение уступки Донбасса; договорённостей нет. Гуманитарные договорённости (D3.5 = 0.33) — обмен пленными по 1 200–1 300 человек (обсуждается) и зимний доступ помощи в Газу.' },
  D4: { level: 'medium', reason: 'Покрыто 4 из 6: рынки (D4.6 = 0.67) — Brent выше $96, оптовые цены +6,5 % г/г, падение капитализации Nvidia на $1,7 трлн, заявление о потере $3 трлн рынком США, печное топливо +59 %. Цепочки (D4.3 = 0.67) и блокировка торговли (D4.4) — подрывы танкеров на минах в Ормузе, призыв ООН пропустить удобрения, контрабанда нефти в Ираке, продление исключения из закона Джонса. Новые санкции (D4.1) — Латвия, G7, спор ЕС и Алжира. Военные расходы (D4.2) и снятие ограничений (D4.5) в окне не подтверждены.' },
  D5: { level: 'high', reason: 'Покрыто 3 из 4: риторика (D5.1 = 1) — угрозы базам США в Европе, угрозы убить Трампа, «полная победа»; кибероперации (D5.2) — расследование взлома во Франции, сеть из семи человек в Европе, бюллетень CISA (primary); дезинформация (D5.3 = 0.33) — взаимно исключающие версии удара по радиолокатору в Бахрейне.' },
  D6: { level: 'medium', reason: 'Покрыто 2 из 4: эвакуация (D6.2 = 0.67) — 64 тыс. беженцев из Нигерии, 340 тыс. перемещённых в Йемене, зимняя помощь Газе, эвакуации ООН; переориентация экономики (D6.3 = 1) — бюджет Ирана без нефтяных доходов и нормирование бензина. Военное положение/мобилизация (D6.1) и отмена мер (D6.4) в окне не подтверждены.' },
  D7: { level: 'medium', reason: 'Покрыто 3 из 4: вовлечение новых государств (D7.1) — Эфиопия и Эритрея, делегация КНДР в Москве, оборонное соглашение Турции и Катара, прекращение поставок Болгарией; атаки вне театра (D7.2) — удар по базе США в Бахрейне, перехваты у Эр-Рияда, сеть в Европе. Выход третьих сторон (D7.4 = 0.67) — Болгария, пауза Трампа, отсутствие срочности у Израиля. Новый фронт (D7.3) — эфиопско-эритрейские удары есть, но подтверждение одним кластером (B) — gate-failed.' },
  D8: { level: 'low', reason: 'Покрыто 2 из 4: мирные договорённости (D8.2 = 0.33) — анонс саммита и посредничество без подписанного документа; наблюдение (D8.3 = 0.33) — Совет Безопасности и призывы ООН по судоходству. Снижение интенсивности (D8.4) и прекращение огня (D8.1) не подтверждены: призывы соблюдать перемирие в Газе есть, но боевые действия в окне продолжались.' },
  D9: { level: 'medium', reason: 'Покрыто 3 из 8: финансовая изоляция (D9.2 = 0.67) — бюджет без нефти, нормирование бензина, продажа органов; транспорт и страхование (D9.3 = 1) — мины в Ормузе, горящие танкеры, предупреждение ООН, исключение из закона Джонса; стратегическое накопление (D9.4 = 0.67) — угольный резерв Германии, $65 млрд Сингапура в золото. Медицинская подготовка, кадровые меры, информационный суверенитет и эвакуация элит (D9.6b) в окне не подтверждены двумя кластерами.' },
};

const sourcesOut = sources.map((s) => ({ ...s, title: { ...s.title } }));
const fragments = {
  'part-d1-d5': ['D1.1', 'D1.2', 'D1.3', 'D1.4', 'D1.5', 'D1.6', 'D2.1', 'D2.2', 'D2.3', 'D2.4', 'D2.5', 'D3.1', 'D3.2', 'D3.3', 'D3.4', 'D3.5', 'D4.1', 'D4.2', 'D4.3', 'D4.4', 'D4.5', 'D4.6'],
  'part-d2-d3-d6': ['D2.1', 'D2.2', 'D2.3', 'D2.4', 'D2.5', 'D3.1', 'D3.2', 'D3.3', 'D3.4', 'D3.5', 'D6.1', 'D6.2', 'D6.3', 'D6.4'],
  'part-d4-d7-d8': ['D4.1', 'D4.2', 'D4.3', 'D4.4', 'D4.5', 'D4.6', 'D7.1', 'D7.2', 'D7.3', 'D7.4', 'D8.1', 'D8.2', 'D8.3', 'D8.4'],
  'part-d9': ['D9.1', 'D9.2', 'D9.3', 'D9.4', 'D9.5', 'D9.6a', 'D9.6b', 'D9.7'],
};
const usedUrls = new Set();
for (const e of Object.values(criteria)) if (e) for (const s of e.sources) usedUrls.add(s.url);
const srcForFragment = (rec) => ({ ...rec, title: { ...rec.title } });

for (const [name, list] of Object.entries(fragments)) {
  const crit = {};
  const blind = {};
  for (const id of list) { crit[id] = criteria[id]; if (!criteria[id]) blind[id] = blindReasons[id]; }
  const ids = new Set();
  for (const id of list) if (criteria[id]) for (const s of criteria[id].sources) ids.add(s.url);
  writeFileSync(root + `/calc/input/drafts/${WEEK}/${name}.json`, JSON.stringify({
    week: WEEK,
    criteria: crit,
    sources: sourcesOut.filter((s) => ids.has(s.url)).map(srcForFragment),
    blindReasons: blind,
    driverConfidence,
    rejected: [],
  }, null, 2), 'utf8');
}

// слияние одним проходом (ADR 0074)
const merged = { week: WEEK, params: 'calc/params.js', criteria: {}, driverConfidence, blindReasons, sources: [], rejected: [] };
for (const id of ids) {
  const e = criteria[id];
  if (!e) { merged.criteria[id] = null; merged.blindReasons[id] = blindReasons[id]; continue; }
  merged.criteria[id] = e;
}
merged.sources = sourcesOut;
writeFileSync(root + `/calc/input/${WEEK}.json`, JSON.stringify(merged, null, 2), 'utf8');

const covered = ids.filter((id) => merged.criteria[id]);
console.log('критериев покрыто:', covered.length, '/', ids.length);
console.log('источников:', merged.sources.length);
console.log('покрытые:', covered.join(', '));
