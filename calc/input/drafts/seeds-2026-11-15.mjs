// Редакционные сиды недели 2026-11-15 (образец — data/2026-11-08/).
// Источники драйверов — verbatim-записи из calc/input/2026-11-15.json по id:
// иначе linkcheck пошёл бы проверять URL вне входа недели.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const root = 'C:/Users/1/Projects/Cassandra Index';
const WEEK = '2026-11-15';
const input = JSON.parse(readFileSync(root + '/calc/input/' + WEEK + '.json', 'utf8'));
const byId = new Map(input.sources.map((s) => [s.id, s]));

const src = (id) => {
  const s = byId.get(id);
  if (!s) throw new Error('нет источника во входе: ' + id);
  return { ...s, title: { ...s.title } };
};

const header = `window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };\n(function () {\n  var s = window.CI_DATA.snapshots["${WEEK}"] = window.CI_DATA.snapshots["${WEEK}"] || {};\n`;
const footer = '})();\n';
const j = (o) => JSON.stringify(o, null, 2);

const drivers = [
  {
    label: { ru: 'Ормуз и Бахрейн: мины под танкерами и удар по радиолокатору США', en: 'Hormuz and Bahrain: mines under tankers and a strike on a US radar' },
    observation: {
      ru: 'Три танкера загорелись после подрыва на минах в Ормузском проливе, ООН сообщает о не менее 25 погибших моряках и предупреждает о росте морских атак. Иран заявил об ударе шестью дронами по радиолокационному узлу США в Бахрейне, Бахрейн впервые с сентября выпустил предупреждения об угрозе.',
      en: 'Three tankers caught fire after hitting mines in the Strait of Hormuz, the UN reports at least 25 sailors killed and warns of rising maritime attacks. Iran said it struck a US radar site in Bahrain with six drones, and Bahrain issued its first threat alerts since September.',
    },
    why: { ru: 'Морской маршрут остаётся зоной удара, а атака на базу США расширяет театр (Д1.4, Д4.4, Д7.2, Д9.3).', en: 'The sea lane remains a strike zone, and the attack on a US base widens the theatre (D1.4, D4.4, D7.2, D9.3).' },
    contribution: 'high',
    confidence: 'high',
    sources: ['tass-bahrain-radar', 'aa-tankers-fire', 'almonitor-tankers-mines', 'reportaz-hormuz-sailors'].map(src),
  },
  {
    label: { ru: 'Рынки: Brent выше $96, оптовые цены 6,5 %, обвал Nvidia', en: 'Markets: Brent above $96, wholesale prices at 6.5 %, Nvidia slump' },
    observation: {
      ru: 'Brent вернулся выше $96 на фоне эскалации вокруг Ирана; годовой рост оптовых цен в США достиг 6,5 % — максимум почти за четыре года; капитализация Nvidia за неделю упала на $1,7 трлн, а рынок США, по заявлению Трампа, потерял $3 трлн. Печное топливо подорожало на 59 % к прошлой зиме.',
      en: 'Brent climbed back above $96 as Iran tensions escalated; US annual wholesale price growth hit 6.5 %, the highest in nearly four years; Nvidia lost $1.7 trillion in market value in a week and, per Trump, the US market lost $3 trillion. Heating oil is up 59 % from last winter.',
    },
    why: { ru: 'Стресс рынков и сырья — отдельный критерий входа в драйвер Д4 (Д4.6), он же давит на финансовую изоляцию и накопления (Д9.2, Д9.4).', en: 'Market and commodity stress is its own input criterion inside D4 (D4.6) and feeds financial isolation and stockpiling (D9.2, D9.4).' },
    contribution: 'high',
    confidence: 'medium',
    sources: ['oilprice-brent-96', 'cnbc-ppi', 'cnbc-nvidia-17t', 'hindustantimes-stocks-3t', 'cnbc-heating-oil'].map(src),
  },
  {
    label: { ru: 'Ядерная сфера: пересмотр доктрины Ирана и тревога МАГАТЭ', en: 'Nuclear: Iran doctrine review and an IAEA alarm' },
    observation: {
      ru: 'Высший клерикальный орган Ирана призвал пересмотреть ядерную доктрину, МАГАТЭ подняло тревогу из-за объекта обогащения, который никогда не инспектировало, а Нетаньяху заявил, что Иран стремится возродить программу. На 19 ноября анонсирована трёхсторонняя встреча Трампа, Путина и Си в Шэньчжэне с повесткой сокращения ядерных арсеналов. В окне не было публичной ядерной угрозы уровня прошлой недели — этот сигнал перенесён из недели 2026-11-08 с раскрытием в driverConfidence.',
      en: 'Iran’s top clerical body called for a nuclear doctrine review, the IAEA raised alarm over an enrichment plant it has never inspected, and Netanyahu said Iran seeks to revive its programme. A Trump–Putin–Xi trilateral meeting in Shenzhen on 19 November was announced with nuclear-arms reductions on the agenda. No public nuclear threat of last week’s level appeared in the window — that signal is carried over from 2026-11-08 with disclosure in driverConfidence.',
    },
    why: { ru: 'Смена доктрины (Д2.2), технические сигналы (Д2.3) и возвращение к переговорам об арсеналах (Д2.5); эскалационная риторика — перенос (Д2.1).', en: 'Doctrine change (D2.2), technical signals (D2.3) and a return to talks on arsenals (D2.5); escalation rhetoric is carried over (D2.1).' },
    contribution: 'high',
    confidence: 'medium',
    sources: ['iranintl-doctrine-review', 'iranintl-iaea-alarm', 'reportaz-netanyahu-nuclear', 'jpost-israel-fears-strike'].map(src),
  },
];

const regions = {
  'russia-belarus': [
    { observation: { ru: 'Генштаб РФ сообщил о взятии Терсянки в Запорожской области; украинские дроны ударили по больнице в Киеве и по Одессе.', en: 'Russia’s top brass reported the capture of Tersyanka in Zaporozhye region; Ukrainian drones hit a Kyiv hospital and Odesa.' },
      why: { ru: 'Наземные действия и удары по городам (Д1.1, Д1.4).', en: 'Ground action and strikes on cities (D1.1, D1.4).' },
      contribution: 'high', confidence: 'high', sources: ['tass-tersyanka', 'africanews-kyiv-hospital'].map(src) },
    { observation: { ru: 'МИД Латвии готовит запрет транзита российского и белорусского зерна, европейские ограничения продолжают сжимать экспортные маршруты.', en: 'Latvia’s foreign ministry is drafting a ban on Russian and Belarusian grain transit, while European restrictions keep tightening export routes.' },
      why: { ru: 'Санкции и логистика экспорта (Д3.3, Д4.1).', en: 'Sanctions and export logistics (D3.3, D4.1).' },
      contribution: 'medium', confidence: 'medium', sources: ['tass-latvia-grain-ban'].map(src) },
  ],
  'ukraine-moldova': [
    { observation: { ru: 'Дроны ударили по больнице в Киеве, в Одессе погибли двое; Зеленский говорит, что переданные F-16 постоянно находятся в ремонте.', en: 'Drones hit a Kyiv hospital and two were killed in Odesa; Zelensky says the F-16s supplied are constantly under repair.' },
      why: { ru: 'Удары по инфраструктуре и состояние поставок (Д1.3, Д1.4).', en: 'Strikes on infrastructure and the state of supplies (D1.3, D1.4).' },
      contribution: 'high', confidence: 'high', sources: ['africanews-kyiv-hospital', 'tass-f16-repairs'].map(src) },
    { observation: { ru: 'Зеленский заявил, что США предлагали уступить Донбасс в обмен на членство в НАТО; Россия требует отвода сил НАТО к позициям до расширения.', en: 'Zelensky said the US floated ceding Donbas for NATO membership; Russia demands NATO forces return to pre-enlargement positions.' },
      why: { ru: 'Переговорный трек и условия сторон (Д3.4, Д8.2).', en: 'The negotiating track and each side’s terms (D3.4, D8.2).' },
      contribution: 'high', confidence: 'medium', sources: ['almonitor-ceding-donbas', 'washingtonpost-russia-pullback'].map(src) },
  ],
  'baltic': [
    { observation: { ru: 'Украинский дрон ударил по российскому военному кораблю в Финском заливе; латвийские проверки транзитных партий зерна не нашли украинского зерна, но сам контроль транзита усилен.', en: 'A Ukrainian drone struck a Russian warship in the Gulf of Finland; Latvian checks of transit grain shipments found no Ukrainian grain, while transit controls were tightened.' },
      why: { ru: 'Атака вне украинского театра и контроль транзита (Д7.2, Д3.3).', en: 'An attack outside the Ukrainian theatre and transit controls (D7.2, D3.3).' },
      contribution: 'high', confidence: 'medium', sources: ['bnn-gulf-warship', 'bnn-latvia-grain-checks', 'tass-latvia-grain-ban'].map(src) },
    { observation: { ru: 'Пентагон пересматривает планы сокращения войск в Европе в сторону меньшего сокращения; Латвия рассматривает заморозку Rail Baltica из-за стоимости.', en: 'The Pentagon is reversing course and now eyes smaller troop cuts in Europe, while Latvia considers freezing Rail Baltica over costs.' },
      why: { ru: 'Военное присутствие США и транспортная инфраструктура региона (Д1.1, Д9.3).', en: 'US military presence and the region’s transport infrastructure (D1.1, D9.3).' },
      contribution: 'medium', confidence: 'medium', sources: ['straitstimes-pentagon-troops', 'japantimes-pentagon-troops', 'bnn-rail-baltica'].map(src) },
  ],
  'balkans': [
    { observation: { ru: 'ЕС предложил странам Чёрного моря поддержку в противодействии угрозам безопасности; начальник Генштаба Сербии обсудил с командующим KFOR ситуацию безопасности в Косове.', en: 'The EU offered Black Sea countries support against security threats, and Serbia’s chief of staff discussed the security situation in Kosovo with the KFOR commander.' },
      why: { ru: 'Вовлечение новых форматов и военные контакты по Косову (Д7.1, Д3.4).', en: 'New formats and military contacts over Kosovo (D7.1, D3.4).' },
      contribution: 'medium', confidence: 'medium', sources: ['balkaninsight-black-sea', 'kossev-serbia-kfor'].map(src) },
    { observation: { ru: 'Болгария объявила о прекращении поставок оружия Украине.', en: 'Bulgaria announced it will stop supplying weapons to Ukraine.' },
      why: { ru: 'Выход третьей стороны из поставок (Д7.4).', en: 'A third party stepping out of supplies (D7.4).' },
      contribution: 'medium', confidence: 'medium', sources: ['tass-bulgaria-weapons'].map(src) },
  ],
  'eu-north-europe': [
    { observation: { ru: 'Франция расследует взлом холодильника с кровью после серии атак, приписываемых Ирану; по данным ITV, волну атак в Европе организовывала сеть из семи человек.', en: 'France is investigating a blood-freezer hack after a series of Iran-linked attacks; ITV reports a seven-man network orchestrated a wave of attacks across Europe.' },
      why: { ru: 'Кибероперации против гражданской инфраструктуры (Д5.2).', en: 'Cyber operations against civilian infrastructure (D5.2).' },
      contribution: 'high', confidence: 'medium', sources: ['iranintl-france-hack', 'iranintl-iran-network-europe'].map(src) },
    { observation: { ru: 'Кушнер заявил, что США готовят следующий раунд переговоров России и Украины с участием европейцев; Кремль говорит, что европейские переговорщики ещё не выходили на связь.', en: 'Kushner said the US is preparing the next round of Russia–Ukraine talks with Europeans involved; the Kremlin says European negotiators have not made contact yet.' },
      why: { ru: 'Посредничество и готовность к переговорам (Д3.4, Д8.2).', en: 'Mediation and readiness to talk (D3.4, D8.2).' },
      contribution: 'medium', confidence: 'medium', sources: ['aljazeera-kushner-broker', 'tass-kushner-contacts'].map(src) },
  ],
  'south-caucasus': [
    { observation: { ru: 'Зеленский похвалил новые дроновые сделки Баку и Киева и рост заказов.', en: 'Zelensky praised new drone deals between Baku and Kyiv and said orders are scaling up.' },
      why: { ru: 'Поставки военной техники в регионе (Д1.3).', en: 'Military supplies in the region (D1.3).' },
      contribution: 'medium', confidence: 'medium', sources: ['ocmedia-drone-deals-baku'].map(src) },
    { observation: { ru: 'Иран пригрозил Армении на фоне прохождения «маршрута Трампа» через парламент Еревана.', en: 'Iran threatened Armenia as the “Trump Route” cleared Yerevan’s parliament.' },
      why: { ru: 'Давление на маршруты и переговорную рамку региона (Д3.4, Д5.1).', en: 'Pressure on routes and the region’s negotiating framework (D3.4, D5.1).' },
      contribution: 'medium', confidence: 'low', sources: ['iranintl-threat-armenia'].map(src) },
  ],
  'central-asia': [
    { observation: { ru: 'Казахстан продвигает планы атомной энергетики и рассматривает площадки для третьего объекта.', en: 'Kazakhstan is advancing nuclear power plans and considering sites for a third facility.' },
      why: { ru: 'Ядерная и энергетическая повестка региона (Д2, Д9.4) — эскалационного сигнала нет.', en: 'The region’s nuclear and energy agenda (D2, D9.4) with no escalation signal.' },
      contribution: 'low', confidence: 'low', sources: ['astanatimes-kazakhstan-nuclear'].map(src) },
    { observation: { ru: 'Британия ввела санкции против СИБУРа, и Казахстан может почувствовать эффект; объявлено, что трёхсторонний саммит России, Китая и США пройдёт 19 ноября в Шэньчжэне.', en: 'The UK sanctioned Russia’s SIBUR with a knock-on effect for Kazakhstan, and a Russia–China–US trilateral summit was announced for November 19 in Shenzhen.' },
      why: { ru: 'Санкционный канал и переговорная рамка региона (Д3.3, Д3.4).', en: 'The sanctions channel and the region’s negotiating frame (D3.3, D3.4).' },
      contribution: 'medium', confidence: 'medium', sources: ['kursiv-sibur-sanctions', 'tass-shenzhen-summit'].map(src) },
  ],
  'east-asia': [
    { observation: { ru: 'Белый дом подтвердил трёхсторонние переговоры США, Китая и России на полях саммита; Сеул настаивает на диалоге с Пхеньяном, а делегация КНДР прибыла в Москву.', en: 'The White House confirmed US–China–Russia trilateral talks on the summit sidelines; Seoul pushes for talks with Pyongyang while a North Korean delegation arrived in Moscow.' },
      why: { ru: 'Дипломатическая активность и вовлечение новых государств (Д3.4, Д7.1).', en: 'Diplomatic activity and new state involvement (D3.4, D7.1).' },
      contribution: 'medium', confidence: 'medium', sources: ['scmp-shenzhen-summit', 'tass-north-korea-moscow'].map(src) },
    { observation: { ru: 'Обсуждается способность китайской ПВО HQ-17 прикрывать морские десантные силы от ударов с Тайваня.', en: 'Analysts debate whether China’s HQ-17 air defence can shield amphibious forces from Taiwanese strikes.' },
      why: { ru: 'Военно-технический фон Тайваньского пролива (Д1.5); сигнал слабый.', en: 'Military-technical backdrop of the Taiwan Strait (D1.5); a weak signal.' },
      contribution: 'low', confidence: 'low', sources: ['scmp-hq17-taiwan'].map(src) },
  ],
  'middle-east': [
    { observation: { ru: 'Иран заявил об ударе шестью дронами по радиолокационному узлу США в Бахрейне; Бахрейн выпустил первые с сентября предупреждения, США отвергли часть заявлений и сообщили о сбитых дронах.', en: 'Iran said it struck a US radar site in Bahrain with six drones; Bahrain issued its first alerts since September, while the US rejected part of the claim and reported downing drones.' },
      why: { ru: 'Прямой удар по объекту США вне иранского театра и спор о фактах (Д1.4, Д7.2, Д5.3).', en: 'A direct strike on a US facility outside the Iranian theatre and a dispute over facts (D1.4, D7.2, D5.3).' },
      contribution: 'high', confidence: 'high', sources: ['aa-bahrain-six-drones', 'tass-bahrain-radar', 'guardian-iran-radar-bahrain', 'iranintl-us-rejects-radar'].map(src) },
    { observation: { ru: 'Три танкера горели после подрыва на минах в Ормузе; ООН требует восстановить безопасное судоходство и пропустить удобрения.', en: 'Three tankers burned after hitting mines in Hormuz; the UN demands restored safe navigation and passage for fertilisers.' },
      why: { ru: 'Морская блокада и страхование (Д4.3, Д4.4, Д9.3).', en: 'Maritime blockade and insurance (D4.3, D4.4, D9.3).' },
      contribution: 'high', confidence: 'high', sources: ['almonitor-tankers-mines', 'aa-un-maritime-attacks', 'almonitor-fertilisers'].map(src) },
  ],
  'north-america': [
    { observation: { ru: 'Оптовые цены выросли на 0,3 % за месяц, годовой рост 6,5 %; Nvidia потеряла $1,7 трлн капитализации, рынок США — $3 трлн по заявлению Трампа.', en: 'Wholesale prices rose 0.3 % on the month, 6.5 % year on year; Nvidia shed $1.7 trillion in value, and Trump says the US market lost $3 trillion.' },
      why: { ru: 'Стресс рынков и цен (Д4.6).', en: 'Market and price stress (D4.6).' },
      contribution: 'high', confidence: 'medium', sources: ['cnbc-ppi', 'cnbc-nvidia-17t', 'hindustantimes-stocks-3t'].map(src) },
    { observation: { ru: 'Иранские командиры угрожали убить Трампа и бить по целям США по всему миру; глава Минфина США переехал на военную базу из-за угроз.', en: 'Iranian commanders threatened to kill Trump and strike US targets worldwide; the US Treasury chief moved to a military base over the threats.' },
      why: { ru: 'Эскалационная риторика и защита руководства (Д5.1).', en: 'Escalatory rhetoric and leadership protection (D5.1).' },
      contribution: 'high', confidence: 'high', sources: ['iranintl-threat-trump', 'guardian-bessent-base'].map(src) },
  ],
  'south-asia': [
    { observation: { ru: 'В операциях в Хайбер-Пахтунхве и Белуджистане убиты 24 боевика, погибли четверо военных, включая майора.', en: 'Operations in Khyber Pakhtunkhwa and Balochistan killed 24 militants and four troops, including a major.' },
      why: { ru: 'Активные боевые действия внутри страны (Д1.4).', en: 'Active combat inside the country (D1.4).' },
      contribution: 'medium', confidence: 'medium', sources: ['dawn-24-militants'].map(src) },
    { observation: { ru: 'ООН сообщает о не менее 25 погибших моряках в Ормузском проливе — маршрут критичен для поставок энергоносителей в Южную Азию.', en: 'The UN reports at least 25 sailors killed in Hormuz — the route is critical for South Asian energy supplies.' },
      why: { ru: 'Разрыв цепочек поставок и морские риски (Д4.3, Д9.3).', en: 'Supply-chain rupture and maritime risk (D4.3, D9.3).' },
      contribution: 'medium', confidence: 'medium', sources: ['reportaz-hormuz-sailors', 'aa-un-maritime-attacks'].map(src) },
  ],
  'africa': [
    { observation: { ru: 'В ДР Конго не менее 44 человек погибли при атаке боевиков, связанных с ИГ; в Судане нормой стали дальнобойные удары.', en: 'At least 44 people were killed in DR Congo in an attack by Islamic State-linked gunmen; long-range strikes are now the norm in Sudan.' },
      why: { ru: 'Боевые действия и удары по населённым пунктам (Д1.4).', en: 'Combat and strikes on populated areas (D1.4).' },
      contribution: 'high', confidence: 'high', sources: ['africanews-drc-44', 'un-sudan-long-range'].map(src) },
    { observation: { ru: 'Эфиопия и Эритрея обменялись ударами дронов и артиллерии, Аддис-Абеба обвиняет Асмэру в поддержке наступления тиграйских повстанцев; 64 тыс. человек бежали из Нигерии в Нигер.', en: 'Ethiopia and Eritrea exchanged drone and artillery strikes, Addis Ababa accuses Asmara of backing a Tigray rebel offensive; 64,000 fled Nigeria for Niger.' },
      why: { ru: 'Новый фронт и эвакуация населения (Д7.1, Д6.2).', en: 'A new front and population displacement (D7.1, D6.2).' },
      contribution: 'high', confidence: 'medium', sources: ['aa-ethiopia-eritrea', 'un-nigeria-64k'].map(src) },
  ],
};

mkdirSync(root + '/data/' + WEEK, { recursive: true });

writeFileSync(root + `/data/${WEEK}/drivers.js`, header + `  s.drivers = ${j(drivers)};\n` + footer, 'utf8');

for (const [id, list] of Object.entries(regions)) {
  if (list.length !== 2) throw new Error('нужно ровно 2 драйвера: ' + id);
  const body = { index: 0, delta: 0, status: 'very', background: false, confidence: list[0].confidence, drivers: list };
  writeFileSync(root + `/data/${WEEK}/region-${id}.js`, header + `  s.regions[${JSON.stringify(id)}] = ${j(body)};\n` + footer, 'utf8');
}
console.log('сиды записаны: drivers.js +', Object.keys(regions).length, 'регионов');
