// seeds-2026-11-01.mjs — редакционные сиды новой недели 2026-11-01:
// data/2026-11-01/{global.js, drivers.js, trend.js, region-<id>.js}.
// Числа (index/delta/status/background) генератор перезапишет штатным
// `node calc/calc.js --write 2026-11-01`; здесь — только нарратив и ссылки.
// Источники берутся verbatim из calc/input/2026-11-01.json по id (иначе
// linkcheck пошёл бы проверять URL, которых нет в источниках недели).
//
//   node calc/input/drafts/seeds-2026-11-01.mjs [--write]

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const WEEK = '2026-11-01';

const input = JSON.parse(readFileSync(path.join(HERE, '..', `${WEEK}.json`), 'utf8'));
const byId = new Map(input.sources.map((s) => [s.id, s]));

function src(id) {
  const rec = byId.get(id);
  if (!rec) throw new Error(`источник ${id} отсутствует в sources недели`);
  // verbatim-запись R55: только поля контракта, без лишнего
  return JSON.parse(JSON.stringify(rec));
}
const srcs = (...ids) => ids.map(src);
const loc = (ru, en) => ({ ru, en });

const GLOBAL_DRIVERS = [
  {
    label: loc(
      'Ормуз: мины, горящие танкеры и «ответ без географических ограничений»',
      'Hormuz: limpet mines, burning tankers and a response "without geographic limits"',
    ),
    observation: loc(
      'Ормузский пролив остаётся зоной атак: четвёртый танкер взорвался на мине, КСИР сообщил об остановке двух танкеров, Оман спас 25 человек с горящего судна, США атаковали два иранских рыболовных судна у Кешма. Верховный лидер Ирана пригрозил США и Израилю «ответом без географических ограничений», армия Ирана предупредила о риске расширения войны. Brent подошёл к $120, бензин в США подорожал на 34 %, топочный мазут — на 74 %.',
      'The Strait of Hormuz remains a strike zone: a fourth tanker exploded on a mine, the IRGC reported stopping two tankers, Oman rescued 25 people from a burning vessel, and the US struck two Iranian fishing boats near Qeshm. Iran\'s supreme leader threatened the US and Israel with a response "without geographic limits", and the Iranian army warned of a wider war. Brent approached $120, US gasoline rose 34 % and heating oil 74 %.',
    ),
    why: loc(
      'Минная война на морском маршруте и ультиматумы высшего руководства одновременно бьют по Д1, Д4.4–Д4.6 и Д5.1 — это ядро недельного роста индекса.',
      'A mine war on a maritime route and ultimatums from the top leadership hit D1, D4.4–D4.6 and D5.1 at the same time — this is the core of the weekly index increase.',
    ),
    contribution: 'high',
    confidence: 'high',
    sources: srcs(
      'mehrnews-fourth-tanker',
      'gcaptain-limpet-mines',
      'straits-oman-rescue',
      'dawn-khamenei-unrestricted',
      'oilprice-brent-120',
    ),
  },
  {
    label: loc(
      'Вашингтон и Тегеран: удар «за десять минут» и переговоры в Дохе',
      'Washington and Tehran: a strike "in ten minutes" and talks in Doha',
    ),
    observation: loc(
      'Трамп заявил, что США готовы ударить по ядерной программе Ирана «за десять минут», Рубио сказал, что решения о новых ударах пока нет; иранская делегация прибыла в Доху обсуждать ядерные предложения с катарскими посредниками, Тегеран говорит о готовности открыть Ормуз в течение двух дней при сделке. США распорядились о выезде неэкстренного персонала из Саудовской Аравии, по данным источников Нетаньяху пытался отдать приказ о подготовке ударов ещё до выборов.',
      'Trump said the US is ready to strike Iran\'s nuclear programme "in ten minutes", while Rubio said no decision on new strikes has been made; an Iranian delegation arrived in Doha to discuss nuclear proposals with Qatari mediators, and Tehran says it could reopen Hormuz within two days under a deal. The US ordered non-emergency staff to leave Saudi Arabia, and reporting says Netanyahu tried to order strike preparations before the elections.',
    ),
    why: loc(
      'Подготовка удара и переговорный трек идут одновременно — сильнейший сигнал по Д3.2, Д5.1 и Д6.2: стороны торгуются под угрозой применения силы, а часть дипломатического присутствия свёрнута.',
      'Strike preparation and a negotiating track run in parallel — the strongest signal across D3.2, D5.1 and D6.2: the parties bargain under the threat of force while part of the diplomatic presence is drawn down.',
    ),
    contribution: 'high',
    confidence: 'high',
    sources: srcs(
      'jpost-trump-ten-minutes',
      'hindu-rubio-iran-strikes',
      'almonitor-qatari-mediators',
      'aa-us-staff-leave-saudi',
      'sputnik-netanyahu-strike-prep',
    ),
  },
  {
    label: loc(
      'Олешки: эвакуация завершилась, фронт — нет',
      'Oleshky: the evacuation is over, the front is not',
    ),
    observation: loc(
      'После локального гуманитарного перемирия жителей оккупированных Олешек вывезли в Украину, они воссоединились с семьями; омбудсмен РФ объявил о завершении миссии и договорённости о регулярных гуманитарных миссиях. При этом Киевская ТЭЦ-6 и железнодорожный вокзал в Днепре получили удары (13 погибших), в Чернигове погибли две девушки, США одобрили продажу Украине ракет Patriot на $2,1 млрд.',
      'After a local humanitarian ceasefire, residents of occupied Oleshky were evacuated to Ukraine and reunited with their families; Russia\'s ombudsman announced the end of the mission and an agreement on regular humanitarian missions. At the same time Kyiv CHPP-6 and the railway station in Dnipro were struck (13 killed), two teenage girls died in Chernihiv, and the US approved a $2.1bn Patriot missile sale to Ukraine.',
    ),
    why: loc(
      'Локальная гуманитарная деэскалация (Д3.5, Д8.2) не отменяет интенсивности ударов и внешних поставок (Д1.4, Д4.2, Д7.1) — вклад в индекс смешанный, поэтому уверенность средняя.',
      'Local humanitarian de-escalation (D3.5, D8.2) does not offset strike intensity and external supplies (D1.4, D4.2, D7.1) — the contribution is mixed, hence medium confidence.',
    ),
    contribution: 'medium',
    confidence: 'medium',
    sources: srcs(
      'cbs-oleshky-evacuation',
      'sputnik-alyoshki-mission-end',
      'sputnik-chpp6-strike',
      'un-news-dnipro-station',
      'aa-patriot-sale-ukraine',
    ),
  },
];

// Регионы: 2 записи на регион (набор таксономии v2, 12 id). Числа
// перезаписываются расчётом; тексты — редакционный слой.
const REGIONS = {
  'middle-east': {
    confidence: 'high',
    drivers: [
      {
        observation: loc(
          'Ормуз парализован: четвёртый танкер взорвался на мине, КСИР остановил два танкера, США атаковали два иранских рыболовных судна у Кешма, Оман спас 25 человек с горящего судна. Верховный лидер Ирана обещает «ответ без географических ограничений», армия предупреждает о расширении войны.',
          'Hormuz is paralysed: a fourth tanker exploded on a mine, the IRGC stopped two tankers, the US struck two Iranian fishing boats near Qeshm, and Oman rescued 25 people from a burning vessel. Iran\'s supreme leader promises a response "without geographic limits" and the army warns of a wider war.',
        ),
        why: loc(
          'Для региона это прямой сигнал по Д1.5, Д4.4 и Д5.1: боевые действия идут на его собственных морских путях.',
          'For the region this is a direct signal across D1.5, D4.4 and D5.1: the fighting is on its own sea lanes.',
        ),
        contribution: 'high',
        confidence: 'high',
        sources: srcs('mehrnews-fourth-tanker', 'gcaptain-limpet-mines', 'straits-oman-rescue'),
      },
      {
        observation: loc(
          'Хуситы сообщили об ударах по нефтеперерабатывающим заводам и аэропортам Саудовской Аравии, коалиция сбила беспилотник над Восточной провинцией; США велели неэкстренным сотрудникам покинуть страну, иранские переговорщики в Дохе обсуждают передачу урана и открытие Ормуза.',
          'The Houthis reported strikes on Saudi refineries and airports, the coalition downed a drone over the Eastern Province; the US told non-emergency staff to leave the country, and Iranian negotiators in Doha discuss uranium transfer and reopening Hormuz.',
        ),
        why: loc(
          'Удары по энергетике третьей страны и эвакуация персонала расширяют географию конфликта (Д6.2, Д7.2) и держат риск перебоев поставок.',
          'Strikes on a third country\'s energy sector and staff evacuations widen the conflict geography (D6.2, D7.2) and keep supply-disruption risk elevated.',
        ),
        contribution: 'high',
        confidence: 'high',
        sources: srcs('sputnik-houthis-refineries', 'almonitor-coalition-drone-down', 'almonitor-us-staff-leave'),
      },
    ],
  },
  'ukraine-moldova': {
    confidence: 'high',
    drivers: [
      {
        observation: loc(
          'Эвакуация Олешек завершилась: жителей вывезли в Украину, они воссоединились с семьями, омбудсмен РФ объявил о завершении миссии и договорённости о регулярных гуманитарных миссиях; ООН назвала перемирие «надеждой» для гражданских.',
          'The Oleshky evacuation is complete: residents were taken to Ukraine and reunited with their families, Russia\'s ombudsman announced the end of the mission and an agreement on regular humanitarian missions, and the UN called the truce "hope" for civilians.',
        ),
        why: loc(
          'Единственный деэскалационный сигнал недели (Д3.5, Д8.2) — он снижает вклад региона, но остаётся локальным.',
          'The week\'s only de-escalatory signal (D3.5, D8.2) lowers the region\'s contribution but remains local.',
        ),
        contribution: 'medium',
        confidence: 'high',
        sources: srcs('cbs-oleshky-evacuation', 'france24-oleshky-evacuees', 'sputnik-alyoshki-mission-end'),
      },
      {
        observation: loc(
          'Удары по энергетике и логистике: Киевская ТЭЦ-6 и железнодорожный вокзал в Днепре (13 погибших), в Чернигове погибли две девушки; Зеленский говорит о сложной ситуации с энергоснабжением. США одобрили продажу ракет Patriot на $2,1 млрд, Украина завершила работу над новой системой ПРО.',
          'Strikes on energy and logistics: Kyiv CHPP-6 and the railway station in Dnipro (13 killed), two teenage girls killed in Chernihiv; Zelensky describes a difficult power supply situation. The US approved a $2.1bn Patriot sale and Ukraine completed work on a new air-defence system.',
        ),
        why: loc(
          'Энергетика и железнодорожная логистика — цели ударов (Д1.4, Д7.1), а внешние поставки ПВО (Д4.2) меняют баланс, не снижая интенсивность.',
          'Energy and rail logistics are strike targets (D1.4, D7.1), while external air-defence supplies (D4.2) shift the balance without reducing intensity.',
        ),
        contribution: 'high',
        confidence: 'high',
        sources: srcs('sputnik-chpp6-strike', 'un-news-dnipro-station', 'aa-patriot-sale-ukraine'),
      },
    ],
  },
  'russia-belarus': {
    confidence: 'medium',
    drivers: [
      {
        observation: loc(
          'Кремль говорит, что подготовка трёхсторонних переговоров не требует паузы в боях, и что переговоры возобновятся после 4 ноября; Зеленский предложил провести трёхстороннюю встречу в Турции.',
          'The Kremlin says preparing trilateral talks does not require a pause in fighting and that talks will resume after 4 November; Zelensky proposed holding a trilateral meeting in Turkey.',
        ),
        why: loc(
          'Переговорный трек без прекращения огня — сигнал Д3.4: дипломатия идёт, но не как деэскалация.',
          'A negotiating track without a ceasefire is a D3.4 signal: diplomacy proceeds, but not as de-escalation.',
        ),
        contribution: 'medium',
        confidence: 'medium',
        sources: srcs('sputnik-trilateral-resume', 'aa-kremlin-trilateral-pause', 'report-zelensky-trilateral'),
      },
      {
        observation: loc(
          'Чёрное море остаётся зоной ударов: российские силы поразили грузовое судно южнее Одессы и судно со снабжением украинских сил; черноморские страны НАТО осудили распространение войны на коммерческое судоходство.',
          'The Black Sea remains a strike zone: Russian forces hit a cargo ship south of Odesa and a vessel supplying Ukrainian forces; NATO Black Sea states condemned the spillover of war onto commercial shipping.',
        ),
        why: loc(
          'Удары по судоходству (Д7.2, Д9.3) переносят конфликт на торговые маршруты — это удерживает эскалацию на высоком уровне.',
          'Strikes on shipping (D7.2, D9.3) move the conflict onto trade routes, keeping escalation high.',
        ),
        contribution: 'high',
        confidence: 'medium',
        sources: srcs('tass-cargo-ship-odessa', 'sputnik-black-sea-ship', 'defensenews-black-sea-nations'),
      },
    ],
  },
  'north-america': {
    confidence: 'high',
    drivers: [
      {
        observation: loc(
          'Трамп говорит, что США готовы ударить по ядерной программе Ирана «за десять минут», Рубио — что решения о новых ударах пока нет; авианосцы остаются в регионе, союзники в Заливе пересматривают оборонные расходы.',
          'Trump says the US is ready to strike Iran\'s nuclear programme "in ten minutes", while Rubio says no decision on new strikes has been made; carriers remain in the region and Gulf allies are revisiting defence spending.',
        ),
        why: loc(
          'Публичная угроза удара и одновременно отказ подтвердить решение — сигнал Д5.1 и Д3.2 с высокой неопределённостью.',
          'A public strike threat combined with a refusal to confirm a decision is a D5.1 and D3.2 signal with high uncertainty.',
        ),
        contribution: 'high',
        confidence: 'high',
        sources: srcs('jpost-trump-ten-minutes', 'hindu-rubio-iran-strikes', 'twz-carriers-oct27'),
      },
      {
        observation: loc(
          'Уолл-стрит пережила худший день с июня, Минфин объявил ставку Series I bond 5,51 % на полгода, Brent подошёл к $120; ФБР обвинило КНДР в краже $6,3 млрд у Binance.',
          'Wall Street had its worst day since June, the Treasury set the Series I bond rate at 5.51 % for six months, Brent approached $120, and the FBI blamed North Korea for the $6.3bn Binance theft.',
        ),
        why: loc(
          'Рыночный стресс (Д4.6) и киберфинансирование ядерной программы КНДР (Д5.2) — внутренние каналы, через которые война приходит в США.',
          'Market stress (D4.6) and cyber-funding of North Korea\'s nuclear programme (D5.2) are the channels through which the war reaches the US.',
        ),
        contribution: 'high',
        confidence: 'high',
        sources: srcs('cbc-stocks-sink', 'cnbc-i-bond-rate', 'straits-fbi-binance'),
      },
    ],
  },
  africa: {
    confidence: 'medium',
    drivers: [
      {
        observation: loc(
          'Судан: пять детей погибли при ударе дрона по рынку в Ньяле, жители Эль-Обейда зажаты между дронами и арестами, Великобритания ввела санкции против суданских военных за «кампанию насилия» в Эль-Фашире. В Эфиопии удары дронов убили не менее 25 человек.',
          'Sudan: five children were killed in a drone strike on a market in Nyala, residents of El Obeid are caught between drones and arrests, and the UK sanctioned Sudanese military figures over the "campaign of violence" in El Fasher. In Ethiopia drone strikes killed at least 25 people.',
        ),
        why: loc(
          'Удары по гражданским объектам в двух странах одновременно — сигнал Д1.4 и Д8.3, санкции — Д3.3.',
          'Strikes on civilian objects in two countries at once are a D1.4 and D8.3 signal; sanctions are D3.3.',
        ),
        contribution: 'high',
        confidence: 'medium',
        sources: srcs('un-news-sudan-market', 'un-news-sudan-el-obeid', 'africanews-ethiopia-drones'),
      },
      {
        observation: loc(
          'Санкции США против Руанды вызвали смешанную реакцию в Гоме; президент Руто требует компенсации для кенийцев, завербованных в российскую армию; Эфиопия получает 12 российских Су-35.',
          'US sanctions on Rwanda drew a mixed reaction in Goma; Kenya\'s president demands compensation for Kenyans recruited into the Russian army; Ethiopia is receiving 12 Russian Su-35s.',
        ),
        why: loc(
          'Внешние санкции, вербовка в чужую армию и поставки тяжёлых вооружений связывают регион с глобальной конфронтацией (Д3.3, Д9.2).',
          'External sanctions, recruitment into a foreign army and heavy arms deliveries link the region to the global confrontation (D3.3, D9.2).',
        ),
        contribution: 'medium',
        confidence: 'medium',
        sources: srcs('africanews-rwanda-sanctions', 'africanews-kenya-recruits', 'twz-ethiopia-su35'),
      },
    ],
  },
  'eu-north-europe': {
    confidence: 'high',
    drivers: [
      {
        observation: loc(
          'Энергетический шок: Европа всерьёз пересматривает сворачивание нефтепереработки, фрахт вышел из-под контроля, греческое контейнерное судно затонуло после атаки дрона у Болгарии, черноморские страны НАТО осудили перенос войны на коммерческое судоходство.',
          'Energy shock: Europe is seriously reconsidering refinery closures, freight rates have spiralled, a Greek container ship sank after a drone attack off Bulgaria, and NATO Black Sea states condemned the spillover of war onto commercial shipping.',
        ),
        why: loc(
          'Стоимость энергии и гибель судов у европейских берегов — прямой сигнал Д4.3, Д4.6 и Д9.3.',
          'Energy costs and ships sinking off European shores are a direct D4.3, D4.6 and D9.3 signal.',
        ),
        contribution: 'high',
        confidence: 'high',
        sources: srcs('oilprice-refinery-rethink', 'insjournal-greek-ship-sunk', 'defensenews-black-sea-nations'),
      },
      {
        observation: loc(
          'Перевооружение ускоряется: месячный выпуск крылатых ракет Destinus превысил довоенное годовое производство в Европе, Украина ждёт европейских компонентов для новой системы ПРО, польские МиГ-29 и боеприпасы для F-16, как сообщается, направлены в Украину.',
          'Rearmament accelerates: Destinus\' monthly cruise-missile output exceeded Europe\'s pre-war annual production, Ukraine awaits European components for its new air-defence system, and Polish MiG-29s and F-16 munitions reportedly went to Ukraine.',
        ),
        why: loc(
          'Расширение военного производства и передача авиатехники — индикатор подготовки к длительной конфронтации (Д6.3, Д7.1).',
          'Expanding military production and aircraft transfers indicate preparation for a prolonged confrontation (D6.3, D7.1).',
        ),
        contribution: 'high',
        confidence: 'medium',
        sources: srcs('defensenews-destinus', 'defensenews-ukraine-freyja', 'twz-polish-mig29'),
      },
    ],
  },
  'east-asia': {
    confidence: 'high',
    drivers: [
      {
        observation: loc(
          'КНДР испытала кассетные боеголовки для тактических баллистических ракет и провела тест для оценки мощности оружейной системы; США, Южная Корея и Япония обязались добиваться «полной» денуклеаризации, Пхеньян назвал «стратегическим» многостороннее заявление в поддержку санкций.',
          'North Korea tested cluster warheads for tactical ballistic missiles and ran a test to assess the yield of a weapons system; the US, South Korea and Japan vowed to pursue "full" denuclearisation, and Pyongyang called a multilateral sanctions statement "strategic".',
        ),
        why: loc(
          'Новые типы боеголовок и синхронная реакция трёх союзников — сигнал Д2.2, Д3.3 и Д5.2.',
          'New warhead types and a synchronised response by three allies are a D2.2, D3.3 and D5.2 signal.',
        ),
        contribution: 'high',
        confidence: 'high',
        sources: srcs('yna-nk-cluster-bomb', 'japantimes-denuclearization-vow', 'tass-nk-yield-test'),
      },
      {
        observation: loc(
          'Тайвань заявил, что Китай препятствует судоходству патрулём у восточного побережья; командующий армией США в Пацифике подтвердил актуальность окна конфликта вокруг Тайваня в 2027 году.',
          'Taiwan said China is obstructing shipping with patrols off its east coast, and the US Army Pacific commander confirmed the relevance of a 2027 Taiwan conflict window.',
        ),
        why: loc(
          'Давление на судоходство (Д9.3) и публичная оценка окна конфликта (Д1.1) держат напряжение в Тайваньском проливе.',
          'Pressure on shipping (D9.3) and a public assessment of the conflict window (D1.1) keep tension in the Taiwan Strait.',
        ),
        contribution: 'medium',
        confidence: 'medium',
        sources: srcs('hindu-taiwan-shipping', 'breakingdefense-taiwan-window'),
      },
    ],
  },
  'south-asia': {
    confidence: 'low',
    background: true,
    drivers: [
      {
        observation: loc(
          'Собственной атрибуции, которую учитывает региональная модель, в окне недели нет: сигналы региона относятся к критериям Д4 (перебои энергетики, цепочки поставок, Brent у $120), а атрибуция Д4 региональной агрегацией не учитывается (ADR 0022). Фон — Индия осудила перебои в мировой энергетике из-за санкций и узких мест, министры Quad обсуждали цепочки поставок.',
          'There is no attribution of its own that the regional model takes into account this week: the region\'s signals fall under D4 criteria (energy disruptions, supply chains, Brent near $120), and D4 attribution is not used in regional aggregation (ADR 0022). The backdrop: India condemned global energy disruptions from sanctions and bottlenecks, and Quad ministers discussed supply chains.',
        ),
        why: loc(
          'Индекс региона отражает глобальный фон; дельта не подаётся как региональная, хотя события недели для региона значимы.',
          'The regional index reflects the global backdrop; the delta is not presented as regional even though the week\'s events matter for the region.',
        ),
        contribution: 'medium',
        confidence: 'low',
        sources: srcs('hindu-india-energy', 'almonitor-quad-supply', 'oilprice-brent-120'),
      },
      {
        observation: loc(
          'Фон — минная угроза в Ормузе: несколько танкеров подорвались и загорелись, Оман спас 25 человек с горящего судна, Иран остановил танкеры.',
          'The backdrop is the mine threat in Hormuz: several tankers struck mines and caught fire, Oman rescued 25 people from a burning vessel, and Iran stopped tankers.',
        ),
        why: loc(
          'Для региона с импортным топливом и диаспорой в Заливе это канал Д4.3/Д9.3, но региональная агрегация его не видит — запись носит фоновый характер.',
          'For a region with imported fuel and a Gulf diaspora this is a D4.3/D9.3 channel, but regional aggregation does not see it — the entry is background in nature.',
        ),
        contribution: 'low',
        confidence: 'low',
        sources: srcs('hindu-hormuz-tankers-mines', 'straits-oman-rescue'),
      },
    ],
  },
  balkans: {
    confidence: 'low',
    drivers: [
      {
        observation: loc(
          'Сербия повысила уровень террористической угрозы после нападения на посольство Израиля; на этом фоне ФСБ сообщила, что США предупреждали Россию о готовящемся теракте в Москве.',
          'Serbia raised its terrorist threat level after the attack on the Israeli embassy; against that backdrop the FSB said the US had warned Russia about an impending terrorist attack in Moscow.',
        ),
        why: loc(
          'Террористическая угроза в Европе и предупреждения о терактах — сигнал Д7.2 в его невоенной форме.',
          'Terrorist threat in Europe and attack warnings are a D7.2 signal in its non-military form.',
        ),
        contribution: 'medium',
        confidence: 'low',
        sources: srcs('balkaninsight-serbia-alert', 'straits-fsb-us-warning'),
      },
      {
        observation: loc(
          'Фон для региона — нефтяной шок и гибель судов: в Ормузском проливе горит танкер, Brent подошёл к $120.',
          'The backdrop for the region is an oil shock and ships lost: a tanker is burning in the Strait of Hormuz and Brent approached $120.',
        ),
        why: loc(
          'Собственных сигналов в окне недели мало (Д7.2 — единственная атрибуция), поэтому запись опирается на экономический канал Д4.6 и помечена пониженной уверенностью.',
          'There are few signals of its own in the week window (D7.2 is the only attribution), so the entry rests on the D4.6 economic channel and is marked as low confidence.',
        ),
        contribution: 'low',
        confidence: 'low',
        sources: srcs('danas-hormuz-tanker-fire', 'oilprice-brent-120'),
      },
    ],
  },
  baltic: {
    confidence: 'low',
    background: true,
    drivers: [
      {
        observation: loc(
          'Собственных сигналов в окне недели не собрано; фон — удары по украинской энергетике (Киевская ТЭЦ-6, логистика армии) и предупреждения США о теракте в Москве.',
          'No signals of its own were collected in the week window; the backdrop is strikes on Ukrainian energy (Kyiv CHPP-6, army logistics) and US warnings about a terrorist attack in Moscow.',
        ),
        why: loc(
          'Индекс региона отражает глобальный фон; локальной атрибуции в источниках недели нет, поэтому дельта не подаётся как региональная.',
          'The regional index reflects the global backdrop; there is no local attribution in the week\'s sources, so the delta is not presented as regional.',
        ),
        contribution: 'low',
        confidence: 'low',
        sources: srcs('sputnik-chpp6-strike', 'tass-logistics-energy-strike'),
      },
      {
        observation: loc(
          'Фон перевооружения: Destinus нарастил выпуск крылатых ракет выше довоенного годового производства Европы, польские МиГ-29 направлены в Украину.',
          'Rearmament backdrop: Destinus raised cruise-missile output above Europe\'s pre-war annual production and Polish MiG-29s were sent to Ukraine.',
        ),
        why: loc(
          'Для Балтии это контекст, а не измеренный сигнал недели — запись носит фоновый характер.',
          'For the Baltics this is context rather than a measured weekly signal — the entry is background in nature.',
        ),
        contribution: 'low',
        confidence: 'low',
        sources: srcs('defensenews-destinus', 'twz-polish-mig29'),
      },
    ],
  },
  'south-caucasus': {
    confidence: 'low',
    background: true,
    drivers: [
      {
        observation: loc(
          'Собственных сигналов в окне недели не собрано; фон — переговорный трек по Украине: Кремль говорит о возобновлении трёхсторонних переговоров после 4 ноября, Зеленский предложил площадку в Турции.',
          'No signals of its own were collected in the week window; the backdrop is the Ukraine negotiating track: the Kremlin speaks of resuming trilateral talks after 4 November and Zelensky proposed a venue in Turkey.',
        ),
        why: loc(
          'Индекс отражает глобальный фон; атрибуции событий региону в источниках недели нет.',
          'The index reflects the global backdrop; the week\'s sources contain no attribution of events to the region.',
        ),
        contribution: 'low',
        confidence: 'low',
        sources: srcs('report-zelensky-trilateral', 'aa-kremlin-trilateral-pause'),
      },
      {
        observation: loc(
          'Экономический фон — удары по судоходству в Ормузе и рост нефтяных цен: импортёры пересматривают маршруты, Brent подошёл к $120.',
          'The economic backdrop is strikes on Hormuz shipping and rising oil prices: importers are revisiting routes as Brent approached $120.',
        ),
        why: loc(
          'Канал Д4.6 действует на регион через импорт, а не через собственные события недели — уверенность пониженная.',
          'The D4.6 channel reaches the region through imports rather than its own weekly events — confidence is low.',
        ),
        contribution: 'low',
        confidence: 'low',
        sources: srcs('gcaptain-hormuz-economic-pain', 'oilprice-brent-120'),
      },
    ],
  },
  'central-asia': {
    confidence: 'low',
    background: true,
    drivers: [
      {
        observation: loc(
          'Собственных сигналов в окне недели не собрано; фон — санкционное давление и торговые маршруты: Россия на G20 указала на санкции и заморозку активов, министры Quad обсуждали цепочки поставок и «произвольные экспортные ограничения».',
          'No signals of its own were collected in the week window; the backdrop is sanctions pressure and trade routes: Russia at the G20 pointed to sanctions and asset freezes, and Quad ministers discussed supply chains and "arbitrary export restrictions".',
        ),
        why: loc(
          'Для региона это экономический фон (Д9.2), а не измеренный сигнал недели — запись помечена как фоновая.',
          'For the region this is an economic backdrop (D9.2) rather than a measured weekly signal — the entry is marked as background.',
        ),
        contribution: 'low',
        confidence: 'low',
        sources: srcs('sputnik-g20-sanctions', 'almonitor-quad-supply'),
      },
      {
        observation: loc(
          'Фон безопасности: США, Япония и Южная Корея укрепили партнёрство и подписали соглашение об Арктике, Вашингтон перебрасывает авианосцы на Ближний Восток.',
          'Security backdrop: the US, Japan and South Korea strengthened their partnership and signed an Arctic agreement, while Washington moves carriers to the Middle East.',
        ),
        why: loc(
          'Перестройка блоков вокруг России и Китая — контекст для региона, но собственных данных недели нет.',
          'The realignment of blocs around Russia and China is context for the region, but there are no weekly data of its own.',
        ),
        contribution: 'low',
        confidence: 'low',
        sources: srcs('aa-us-japan-sk-arctic', 'twz-carriers-oct27'),
      },
    ],
  },
};

const TREND = [
  { date: '2026-08-16', value: 66 },
  { date: '2026-08-23', value: 67 },
  { date: '2026-08-30', value: 51, methodology: '3.0' },
  { date: '2026-09-06', value: 42, methodology: '3.0' },
  { date: '2026-09-13', value: 43, methodology: '3.0' },
  { date: '2026-09-20', value: 56, methodology: '3.0' },
  { date: '2026-09-27', value: 47, methodology: '3.0' },
  { date: '2026-10-04', value: 46, methodology: '3.0' },
  { date: '2026-10-11', value: 56, methodology: '3.0' },
  { date: '2026-10-18', value: 64, methodology: '3.0' },
  { date: '2026-10-25', value: 68, methodology: '3.0' },
  { date: WEEK, value: 0, methodology: '3.0' },
];

const header = `window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };\n(function () {\n  var s = window.CI_DATA.snapshots["${WEEK}"] = window.CI_DATA.snapshots["${WEEK}"] || {};\n`;
const FOOTER = '})();\n';
const j = (v) => JSON.stringify(v, null, 2);

const globalSeed =
  header +
  `  s.published = ${JSON.stringify(WEEK)};\n` +
  `  s.through = ${JSON.stringify(WEEK)};\n` +
  `  s.methodology = "3.0";\n` +
  `  s.regions_taxonomy = "2.0";\n` +
  `  s.dataState = "published";\n` +
  FOOTER;

const files = {
  'global.js': globalSeed,
  'drivers.js': header + `  s.drivers = ${j(GLOBAL_DRIVERS)};\n` + FOOTER,
  'trend.js': header + `  s.trend = ${j(TREND)};\n` + FOOTER,
};
for (const [id, spec] of Object.entries(REGIONS)) {
  const region = {
    index: 0,
    delta: 0,
    status: 'very',
    background: spec.background === true,
    confidence: spec.confidence,
    drivers: spec.drivers,
  };
  files[`region-${id}.js`] = header + `  s.regions[${JSON.stringify(id)}] = ${j(region)};\n` + FOOTER;
}

// Самопроверка: все источники сидов — записи недели, по 2..5 в блоке.
let bad = 0;
for (const [name, list] of [
  ['drivers.js', GLOBAL_DRIVERS],
  ...Object.entries(REGIONS).map(([id, r]) => [`region-${id}.js`, r.drivers]),
]) {
  for (const d of list) {
    if (d.sources.length < 2 || d.sources.length > 5) {
      console.log(`${name}: источников ${d.sources.length} (нужно 2..5)`);
      bad++;
    }
  }
}
const ids = Object.keys(REGIONS);
const expected = ['russia-belarus', 'ukraine-moldova', 'middle-east', 'north-america', 'africa', 'baltic', 'south-asia', 'central-asia', 'east-asia', 'eu-north-europe', 'south-caucasus', 'balkans'];
for (const id of expected) if (!ids.includes(id)) { console.log(`нет региона ${id}`); bad++; }
console.log(`регионов: ${ids.length}, глобальных драйверов: ${GLOBAL_DRIVERS.length}, источников недели: ${input.sources.length}`);
if (bad) process.exitCode = 1;

if (process.argv.includes('--write')) {
  const dir = path.join(ROOT, 'data', WEEK);
  mkdirSync(dir, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(path.join(dir, name), content, 'utf8');
  }
  console.log(`записано ${Object.keys(files).length} файлов в data/${WEEK}/`);
} else {
  console.log('сиды валидны (печать; --write — запись)');
}
