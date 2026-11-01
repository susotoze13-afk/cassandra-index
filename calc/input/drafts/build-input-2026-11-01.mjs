// Сборка входа недели 2026-11-01 из собранного корпуса.
// Правило: URL берётся ТОЛЬКО из корпуса (shortlist-2026-11-01.json);
// несовпадение фрагмента — ошибка сборки, а не выдуманная ссылка.
// Запуск: node calc/input/drafts/build-input-2026-11-01.mjs [--write]
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate, CRITERIA } from '../../../calc/engine.js';
import { validateInputSources, validateSourceIndependence } from '../../../calc/calc.js';
import { validateBlindReasons } from '../../../calc/history-debt.js';
import { regionIdsFor } from '../../../js/data.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');
const WEEK = '2026-11-01';
const WINDOW = ['2026-10-26', '2026-11-01'];

const corpus = JSON.parse(readFileSync(path.join(HERE, 'shortlist-2026-11-01.json'), 'utf8'));

const isoDate = (raw) => {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) throw new Error(`неразборчивая дата: ${raw}`);
  return d.toISOString().slice(0, 10);
};

const registry = new Map(); // url -> source record

// src(фрагмент url, {ru, en, cluster, type, sa}) → ключ-ссылка
function src(frag, meta) {
  let hits = corpus.filter((x) => x.link.toLowerCase().includes(frag.toLowerCase()));
  if (hits.length === 0) throw new Error(`нет в корпусе: ${frag}`);
  if (hits.length > 1 && meta.host) {
    const narrowed = hits.filter((x) => new URL(x.link).hostname.includes(meta.host));
    if (narrowed.length === 1) hits = narrowed;
  }
  if (hits.length > 1) {
    throw new Error(`неоднозначно (${hits.length}): ${frag}\n` +
      hits.map((h) => `  ${h.link}`).join('\n'));
  }
  const rec = hits[0];
  const date = isoDate(rec.date);
  if (date < WINDOW[0] || date > WINDOW[1]) {
    throw new Error(`вне окна ${WINDOW[0]}…${WINDOW[1]}: ${date} — ${rec.link}`);
  }
  if (registry.has(rec.link)) return rec.link;
  registry.set(rec.link, {
    id: meta.id,
    title: { ru: meta.ru, en: meta.en },
    domain: new URL(rec.link).hostname.replace(/^www\./, ''),
    url: rec.link,
    publication_date: date,
    accessed_date: WEEK,
    source_type: meta.type || 'secondary',
    cluster_id: meta.cluster,
    state_affiliated: meta.sa === true,
    origin: 'collected-in-week',
  });
  return rec.link;
}

const A = 'A-mainstream';
const B = 'B-state-media';
const F = 'F-financial';

// --- Реестр использованных источников -------------------------------------
const S = {};
// Иран / США
S.jpost424 = src('article-913424', { id: 'jpost-trump-ten-minutes', cluster: A,
  ru: 'Трамп: США готовы ударить по ядерной программе Ирана «за десять минут»',
  en: "Trump says US ready to hit Iran's nuclear program 'in ten minutes'" });
S.dawn187 = src('2041187', { id: 'dawn-khamenei-unrestricted', cluster: A,
  ru: 'Верховный лидер Ирана пригрозил США и Израилю «ответом без географических ограничений»',
  en: "Iran's supreme leader warns US, Israel of 'unrestricted geographical response'" });
S.tass365 = src('2211365', { id: 'tass-iran-geo-unrestricted', cluster: B, sa: true,
  ru: 'Иран ответит на любую угрозу без географических ограничений — верховный лидер',
  en: 'Iran to respond to any threat regardless of geographical restrictions' });
S.hindu951 = src('article71651951', { id: 'hindu-rubio-iran-strikes', cluster: A,
  ru: 'Рубио: США пока не решили, наносить ли новые удары по Ирану',
  en: 'Rubio says U.S. yet to decide on new Iran strikes' });
S.guardVance = src('jd-vance-letter', { id: 'guardian-vance-letter-iran', cluster: A,
  ru: 'Письмо Джей Ди Вэнса — последний шанс предотвратить новый конфликт США и Ирана',
  en: 'JD Vance letter may offer last chance to avert fresh conflict between US and Iran' });
S.almonQatar = src('qatari-mediators', { id: 'almonitor-qatari-mediators', cluster: A, host: 'al-monitor',
  ru: 'Иранские переговорщики встретились с катарскими посредниками на фоне угрозы ударов США',
  en: 'Iranian envoys meet Qatari mediators as threat looms of US strikes after midterms' });
S.tass371 = src('2211371', { id: 'tass-iran-delegation-doha', cluster: B, sa: true,
  ru: 'Иранская делегация прибыла в Доху для обсуждения ядерных предложений',
  en: 'Iranian delegation arrives in Doha to discuss nuclear proposals' });
S.tass373 = src('2211373', { id: 'tass-iran-hormuz-two-days', cluster: B, sa: true,
  ru: 'Иран согласен открыть Ормузский пролив в течение двух дней при сделке с США',
  en: 'Iran agrees to reopen Strait of Hormuz within two days if deal reached with US' });
S.hinduDraft = src('draft-proposal', { id: 'hindu-iran-us-draft-proposal', cluster: A,
  ru: 'Передача урана и открытие Ормузского пролива: итоги ирано-американского проекта',
  en: 'Uranium transfer, Strait of Hormuz reopening: key takeaways from Iran-US draft proposal' });
S.tass377 = src('2211377', { id: 'tass-iran-us-forces-condition', cluster: B, sa: true,
  ru: 'Иран требует сокращения военного присутствия США в регионе как условия урегулирования',
  en: 'Iran demands reduction in US forces in region as condition for settlement' });
S.sputAlarm = src('us-warning-middle-east', { id: 'sputnik-us-warns-region', cluster: B, sa: true,
  ru: 'США предупредили страны Ближнего Востока о возможном возобновлении ударов по Ирану',
  en: 'US sounds alarm across Middle East over possible renewed strikes on Iran' });
S.sputNetan = src('netanyahu-sought-to-order', { id: 'sputnik-netanyahu-strike-prep', cluster: B, sa: true,
  ru: 'Нетаньяху пытался приказать готовить удары по Ирану за три дня до выборов',
  en: 'Netanyahu sought to order preparations for strikes on Iran days before elections' });
S.newsam = src('1071089', { id: 'newsam-us-strikes-november', cluster: A,
  ru: 'Возможные удары США по Ирану в ноябре могут длиться несколько дней',
  en: 'Possible US strikes on Iran in November could last several days, media report' });
S.tehr694 = src('531694', { id: 'tehrantimes-army-warns-us', cluster: B, sa: true,
  ru: 'Иранская армия предупредила США о риске расширения войны',
  en: 'Iranian army warns US against renewed military adventurism, says war could spread' });
S.tehr697 = src('531697', { id: 'tehrantimes-274-structures', cluster: B, sa: true,
  ru: 'Иранские удары повредили 274 объекта на 24 связанных с США военных базах',
  en: 'Iranian strikes damage 274 structures at 24 US-linked military sites' });
S.mehr049 = src('249049', { id: 'mehrnews-fishing-boats-qeshm', cluster: B, sa: true,
  ru: 'США атаковали два иранских рыболовных судна у острова Кешм',
  en: 'US attacks 2 Iranian fishing boats off Masan, Qeshm Island' });
S.mehr045 = src('249045', { id: 'mehrnews-iran-army-readiness', cluster: B, sa: true,
  ru: 'Армия Ирана продолжает повышать боеготовность',
  en: "Iran's army continues to enhance combat readiness: spox" });
S.mehr048 = src('249048', { id: 'mehrnews-response-no-limits', cluster: B, sa: true,
  ru: 'Ответ на угрозы должен быть немедленным и без географических ограничений',
  en: 'Response to threats must be urgent, sans geographical limits' });
S.jpost416 = src('article-913416', { id: 'jpost-iran-nuclear-ban-debate', cluster: A,
  ru: 'Иран обсуждает, сохранять ли запрет на ядерное оружие',
  en: "Iran debating whether to maintain ban on nuclear weapons" });
S.mehr058 = src('249058', { id: 'mehrnews-nuclear-doctrine-no-decision', cluster: B, sa: true,
  ru: 'Серьёзного решения об изменении ядерной доктрины не принято',
  en: 'No serious decision made about change in nuclear doctrine' });
S.mehr032 = src('249032', { id: 'mehrnews-doctrine-public-demand', cluster: B, sa: true,
  ru: 'Пересмотр ядерной доктрины стал требованием народа',
  en: "Revising nuclear doctrine has become people's demand" });
S.tass423 = src('2211423', { id: 'tass-iran-npt-withdraw', cluster: B, sa: true,
  ru: 'Иран может выйти из ДНЯО при возобновлении войны',
  en: 'Iran may withdraw from NPT if war resumes — security council secretary' });
S.tass381 = src('2211381', { id: 'tass-iran-npt-committed', cluster: B, sa: true,
  ru: 'Иран остаётся привержен Договору о нераспространении — глава МИД',
  en: 'Iran remains committed to Nuclear Non-Proliferation Treaty — foreign minister' });
S.un682 = src('1168682', { id: 'un-news-iaea-iran-inspectors', cluster: A,
  ru: 'ООН: «безопасного места в Украине нет», МАГАТЭ призывает вернуть инспекторов в Иран',
  en: 'World News in Brief: No safe place in Ukraine, IAEA calls for Iran nuclear inspections' });
// Ормуз / судоходство
S.hinduTankers = src('iran-says-multiple-oil-tankers', { id: 'hindu-hormuz-tankers-mines', cluster: A,
  ru: 'Иран заявил, что несколько танкеров подорвались на минах и загорелись в Ормузском проливе',
  en: 'Iran says multiple oil tankers strike mines, catch fire in Strait of Hormuz' });
S.gcapLimpet = src('tanker-hit-by-limpet-mines-in-strait', { id: 'gcaptain-limpet-mines', cluster: A,
  ru: 'Танкер подорван на прикреплённых минах в Ормузском проливе: новая угроза судоходству',
  en: 'Tanker hit by limpet mines in Strait of Hormuz as new threat to shipping emerges' });
S.twzLimpet = src('iran-used-limpet-mine', { id: 'twz-limpet-mine-hormuz', cluster: A,
  ru: 'Иран применил мину, закреплённую на корпусе судна, в очередной атаке в Ормузском проливе',
  en: 'Iran used limpet mine placed on ship hull in latest Strait of Hormuz attack' });
S.mehr039 = src('249039', { id: 'mehrnews-fourth-tanker', cluster: B, sa: true,
  ru: 'Четвёртый танкер взорвался на мине в Ормузском проливе',
  en: 'Fourth tanker explodes after hitting mine in Hormuz Strait' });
S.mehr033 = src('249033', { id: 'mehrnews-irgc-two-tankers', cluster: B, sa: true,
  ru: 'КСИР сообщил об остановке двух танкеров в Ормузском проливе',
  en: 'IRGC says two tankers halted in Hormuz Strait' });
S.straitsOman = src('oman-rescues-25', { id: 'straits-oman-rescue', cluster: A,
  ru: 'Оман спас 25 человек с горящего судна; Иран остановил танкеры',
  en: 'Oman rescues 25 from burning ship, Iran halts tankers' });
S.danasOr = src('ormuskom-moreuzu', { id: 'danas-hormuz-tanker-fire', cluster: A,
  ru: 'В Ормузском проливе горит танкер',
  en: 'Oil tanker on fire in the Strait of Hormuz' });
S.gcapEcon = src('economic-pain', { id: 'gcaptain-hormuz-economic-pain', cluster: A,
  ru: 'Удары по судоходству в Ормузе бьют по экономике обеих сторон',
  en: 'Shipping strikes in Hormuz leave both sides with economic pain' });
S.splashRates = src('runaway-tanker-rates', { id: 'splash-runaway-tanker-rates', cluster: A,
  ru: 'Нефтяные мейджоры подсчитывают потери от вышедших из-под контроля ставок фрахта',
  en: 'Oil majors count the cost of runaway tanker rates' });
// Хуситы / Саудовская Аравия
S.sputHouthi = src('houthis-report-attacks', { id: 'sputnik-houthis-refineries', cluster: B, sa: true,
  ru: 'Хуситы сообщили об ударах по нефтеперерабатывающим заводам и аэропортам Саудовской Аравии',
  en: 'Houthis report attacks on oil refineries, airports in Saudi Arabia' });
S.almonDrone = src('saudi-led-coalition', { id: 'almonitor-coalition-drone-down', cluster: A,
  ru: 'Коалиция во главе с Саудовской Аравией сообщила об уничтожении беспилотника над Восточной провинцией',
  en: 'Saudi-led coalition says it downs drone over oil-rich Eastern Region' });
S.aa888 = src('4106888', { id: 'aa-us-staff-leave-saudi', cluster: B, sa: true,
  ru: 'США распорядились о выезде неэкстренного персонала из Саудовской Аравии на фоне атак хуситов',
  en: 'US orders non-emergency personnel to leave Saudi Arabia amid Houthi attacks' });
S.almonLeave = src('staff-leave', { id: 'almonitor-us-staff-leave', cluster: A,
  ru: 'США велели неэкстренным сотрудникам покинуть Саудовскую Аравию из-за рисков безопасности',
  en: 'US orders non-emergency staff to leave Saudi Arabia over security risks' });
S.aljUN = src('staffers-death-in-houthi', { id: 'aljazeera-un-staffer-yemen', cluster: B, sa: true,
  ru: 'ООН требует расследования гибели сотрудника в заключении хуситов в Йемене',
  en: "UN demands investigation after staffer's death in Houthi custody in Yemen" });
S.un706 = src('1168706', { id: 'un-news-yemen-access', cluster: A,
  ru: 'Война в Йемене делает доставку помощи слишком опасной для многих',
  en: 'Yemen war makes reaching assistance too dangerous for many' });
// Украина / Россия
S.un702 = src('1168702', { id: 'un-news-dnipro-station', cluster: A,
  ru: 'Российский удар дроном по железнодорожному вокзалу в Украине: 13 погибших',
  en: 'Russia drone strike on Ukrainian railway station kills 13' });
S.afrChern = src('kills-two-teenage-girls', { id: 'africanews-chernihiv-strike', cluster: A,
  ru: 'Украина: российский удар в Чернигове убил двух девушек-подростков',
  en: 'Ukraine: Russian strike kills two teenage girls in Chernihiv' });
S.sputChpp = src('hit-kiev-chpp-6', { id: 'sputnik-chpp6-strike', cluster: B, sa: true,
  ru: 'Российские силы ударили по Киевской ТЭЦ-6, обеспечивавшей военную логистику',
  en: 'Russian forces hit Kiev CHPP-6 supplying energy to Ukrainian military logistics' });
S.tass383 = src('2211383', { id: 'tass-cargo-ship-odessa', cluster: B, sa: true,
  ru: 'Российские силы поразили грузовое судно в 37 км южнее Одессы',
  en: 'Russian forces hit cargo ship 37 km south of Odessa — Defense Ministry' });
S.tass325 = src('2211325', { id: 'tass-logistics-energy-strike', cluster: B, sa: true,
  ru: 'Российские силы ударили по логистике и энергетике украинской армии',
  en: "Russian forces strike Ukrainian army's logistics, energy infrastructure facilities" });
S.tass361 = src('2211361', { id: 'tass-zelensky-power-supply', cluster: B, sa: true,
  ru: 'Украина столкнулась со сложной ситуацией с энергоснабжением — Зеленский',
  en: 'Ukraine faces complicated situation with power supplies, says Zelensky' });
S.sputShip = src('russia-strikes-ship', { id: 'sputnik-black-sea-ship', cluster: B, sa: true,
  ru: 'Россия ударила по судну со снабжением украинских сил в Чёрном море',
  en: 'Russia strikes ship with supplies to Ukrainian forces in Black Sea' });
S.ins853 = src('890853', { id: 'insjournal-greek-ship-sunk', cluster: A,
  ru: 'Греческое контейнерное судно затонуло после атаки дрона у Болгарии',
  en: 'Greek container ship sinks after drone attack off Bulgaria' });
S.ins791 = src('890791', { id: 'insjournal-greek-pm-truce', cluster: A,
  ru: 'Премьер Греции призвал к глобальному морскому перемирию после затопления судна',
  en: 'Greek PM calls for global maritime truce after Greek ship sunk in drone attack' });
S.defBlack = src('natos-black-sea-nations', { id: 'defensenews-black-sea-nations', cluster: A,
  ru: 'Черноморские страны НАТО осудили распространение войны на коммерческое судоходство',
  en: "NATO's Black Sea nations decry Ukraine war spillover endangering commercial ship traffic" });
S.tass441 = src('2211441', { id: 'tass-vessel-cyprus', cluster: B, sa: true,
  ru: 'Танзанийское торговое судно затонуло у берегов Кипра',
  en: 'Tanzanian-flagged merchant vessel sunk off the coast of Cyprus' });
S.aa902 = src('4106902', { id: 'aa-patriot-sale-ukraine', cluster: B, sa: true,
  ru: 'США одобрили продажу Украине ракет Patriot на $2,1 млрд',
  en: 'US approves $2.1B Patriot missile sale to Ukraine' });
S.hinduPatriot = src('us-approves-2-1-billion-patriot', { id: 'hindu-patriot-sale-ukraine', cluster: A,
  ru: 'США одобрили продажу Украине ракет Patriot на $2,1 млрд',
  en: 'US approves $2.1 billion Patriot missile sale to Ukraine' });
S.twzMig = src('polish-mig-29s', { id: 'twz-polish-mig29', cluster: A,
  ru: 'Польские МиГ-29 и боеприпасы для F-16, как сообщается, направлены в Украину',
  en: 'Polish MiG-29s, F-16 cannon ammo reportedly headed to Ukraine' });
S.defFreyja = src('ukraine-completes-work-on-new-missile-defense', { id: 'defensenews-ukraine-freyja', cluster: A,
  ru: 'Украина завершила работу над новой системой ПРО и ждёт европейских компонентов',
  en: 'Ukraine completes work on new missile defense system, awaits European partner components' });
S.guardOlesh = src('oleshky-evacuees-reunite', { id: 'guardian-oleshky-reunite', cluster: A,
  ru: 'Эвакуированные из Олешек воссоединились с семьями после перемирия',
  en: 'Oleshky evacuees reunite with families after truce allows crossing back into Ukraine' });
S.cbsOlesh = src('residents-evacuated-oleshky-arrive-ukraine', { id: 'cbs-oleshky-evacuation', cluster: A,
  ru: 'Жителей оккупированного Россией города вывезли в Украину в ходе перемирия при посредничестве США',
  en: 'Ukrainians trapped in Russia-held city evacuate during local ceasefire' });
S.fr24Olesh = src('evacuees-from-russian-occupied-oleshky', { id: 'france24-oleshky-evacuees', cluster: A,
  ru: 'Жители оккупированных Россией Олешек воссоединились с семьями после эвакуации',
  en: 'Residents from Russian-occupied Oleshky reunite with families after evacuation' });
S.sputAlyEnd = src('humanitarian-mission-in-alyoshki-coming-to-end', { id: 'sputnik-alyoshki-mission-end', cluster: B, sa: true,
  ru: 'Гуманитарная миссия в Алёшках завершается — омбудсмен РФ',
  en: 'Humanitarian mission in Alyoshki coming to end — Russian ombudswoman' });
S.sputAlyObs = src('alyoshki-ceasefire-fully-observed', { id: 'sputnik-alyoshki-observed', cluster: B, sa: true,
  ru: 'Перемирие в Алёшках полностью соблюдается, подтверждает омбудсмен РФ',
  en: 'Alyoshki ceasefire fully observed, Russian rights commissioner affirms' });
S.tass421 = src('2211421', { id: 'tass-regular-humanitarian-missions', cluster: B, sa: true,
  ru: 'Достигнута договорённость о регулярных гуманитарных миссиях — омбудсмен РФ',
  en: 'Agreement reached on regular humanitarian missions — Russian ombudswoman' });
S.un712 = src('1168712', { id: 'un-news-oleshky-hope', cluster: A,
  ru: 'ООН: перемирие в Олешках даёт «надежду» гражданским при продолжении атак в других районах',
  en: 'Ukraine: Oleshky ceasefire offers hope for civilians as attacks on other areas continue' });
S.almonBlackSea = src('limited-ceasefire-black-sea', { id: 'almonitor-black-sea-ceasefire', cluster: A,
  ru: 'США и Канада видят растущий интерес к ограниченному перемирию в Чёрном море',
  en: 'US, Canada see growing interest in limited ceasefire in Black Sea' });
S.aljErdogan = src('erdogan-urges-russia-and-ukraine', { id: 'aljazeera-erdogan-black-sea', cluster: B, sa: true,
  ru: 'Эрдоган призвал Россию и Украину прекратить атаки в Чёрном море',
  en: "Turkiye's Erdogan urges Russia and Ukraine to stop Black Sea attacks" });
S.tass399 = src('2211399', { id: 'tass-turkey-grain-proposals', cluster: B, sa: true,
  ru: 'Турция передала США предложения по черноморскому судоходству — Рубио',
  en: 'Turkey submits Black Sea grain shipping proposals to US — Rubio' });
S.aa812 = src('4106812', { id: 'aa-kremlin-trilateral-pause', cluster: B, sa: true,
  ru: 'Кремль: подготовка трёхсторонних переговоров не требует паузы в боевых действиях',
  en: 'Kremlin says preparations for trilateral talks do not require pause to fighting' });
S.sputTril = src('trilateral-talks-on-ukraine-to-resume', { id: 'sputnik-trilateral-resume', cluster: B, sa: true,
  ru: 'Кремль: трёхсторонние переговоры по Украине возобновятся после 4 ноября',
  en: 'Kremlin says trilateral talks on Ukraine to resume after November 4' });
S.repTril = src('zelensky-proposes-holding-trilateral', { id: 'report-zelensky-trilateral', cluster: B, sa: true,
  ru: 'Зеленский предложил провести трёхсторонние переговоры в Турции',
  en: 'Zelensky proposes holding trilateral talks in Turkiye' });
S.straitsGrass = src('forced-to-eat-grass', { id: 'straits-oleshky-grass', cluster: A,
  ru: 'Вынужденные есть траву: эвакуированные из Олешек назвали перемирие «благословением»',
  en: 'Forced to eat grass, Oleshky evacuees say Russia-Ukraine truce was a blessing' });
S.abcMoscow = src('russia-responds-to-us-intelligence', { id: 'abc-russia-moscow-attack', cluster: A,
  ru: 'Россия ответила на предупреждение США о готовящемся теракте в Москве',
  en: 'Russia responds to US warning of Moscow attack plan' });
S.straitsFsb = src('fsb-says-us-warned-russia', { id: 'straits-fsb-us-warning', cluster: A,
  ru: 'ФСБ: США предупредили Россию о возможном теракте в Москве',
  en: 'FSB says US warned Russia of possible Moscow attack' });
S.tass387 = src('2211387', { id: 'tass-fsb-us-warning', cluster: B, sa: true,
  ru: 'США предупредили Россию о готовящемся теракте в Москве — ФСБ',
  en: 'US warns Russia of planned terrorist attack in Moscow — FSB' });
// Рынки
S.oilBrent = src('brent-approaches-120', { id: 'oilprice-brent-120', cluster: F,
  ru: 'Нефтетрейдеры готовятся к волатильной неделе: Brent приближается к $120',
  en: 'Oil traders brace for a wild week as Brent approaches $120' });
S.oilGas = src('gasoline-up-34', { id: 'oilprice-gasoline-34', cluster: F,
  ru: 'Бензин подорожал на 34 %, топочный мазут — на 74 % перед промежуточными выборами',
  en: 'Gasoline up 34% and heating oil up 74% as voters head to the midterms' });
S.cbcStocks = src('tech-stocks-markets-oct-30', { id: 'cbc-stocks-sink', cluster: A,
  ru: 'Североамериканские акции падают: Уолл-стрит пережила худший день с июня',
  en: 'North American stocks sink, Wall Street suffers worst day since June' });
S.cnbcIb = src('treasury-i-bond-rate', { id: 'cnbc-i-bond-rate', cluster: A,
  ru: 'Минфин США объявил ставку Series I bond 5,51 % на полгода',
  en: 'Treasury Department announces new Series I bond rate of 5.51%' });
S.komBrent = src('9064282', { id: 'kommersant-brent-up', cluster: A,
  ru: 'Цена нефти Brent на бирже ICE растёт почти на 3 %',
  en: 'Brent crude price on ICE rises almost 3%' });
S.oilRefin = src('rethinking-its-oil-refinery', { id: 'oilprice-refinery-rethink', cluster: F,
  ru: 'Европа всерьёз пересматривает сворачивание нефтепереработки',
  en: 'Europe is now seriously rethinking its oil refinery phase down' });
// Кибер
S.guardBin = src('binance-losses-covered-hack', { id: 'guardian-binance-hack', cluster: A,
  ru: 'Binance: 90 % потерь от взлома на $6,3 млрд покрыто, ФБР обвиняет КНДР',
  en: 'Binance says 90% of losses from $6.3bn hack covered as FBI says North Korea behind attack' });
S.nprBin = src('binance-crypto-heist', { id: 'npr-binance-heist', cluster: A,
  ru: 'Простое объяснение крупнейшей кражи криптовалюты на $6,3 млрд у Binance',
  en: 'A simple explainer of the massive $6.3 billion crypto heist at Binance' });
S.cbcBin = src('binance-hack-north-korea-9.7404502', { id: 'cbc-binance-hack', cluster: A,
  ru: 'Binance заявила о возмещении миллиардов после взлома, в котором ФБР винит КНДР',
  en: 'Binance says billions replaced from hack that FBI blames on North Korea' });
S.tass451 = src('2211451', { id: 'tass-fbi-north-korea-binance', cluster: B, sa: true,
  ru: 'ФБР обвинило КНДР во взломе криптобиржи Binance',
  en: 'FBI accuses North Korea of hacking Binance crypto exchange' });
S.straitsFbiBin = src('fbi-blames-north-korea', { id: 'straits-fbi-binance', cluster: A, host: 'straitstimes',
  ru: 'ФБР обвинило КНДР в краже $6 млрд у Binance',
  en: 'FBI blames North Korea for US$6 billion Binance crypto hack' });
S.straitsCrypto = src('crypto-exchanges-call', { id: 'straits-crypto-defences', cluster: A,
  ru: 'Криптобиржи призывают срочно усилить защиту после кражи у Binance',
  en: 'Crypto exchanges call for quick moves to bolster defences after Binance heist' });
S.cnbcBin = src('binance-hack-asset-coverage', { id: 'cnbc-binance-coverage', cluster: A,
  ru: 'Binance: 90 % потерь от взлома на $6,3 млрд покрыто, снятие средств возобновляется',
  en: 'Binance says 90% of $6.3 billion hack losses are now covered, plans to resume withdrawals' });
S.guardNKfund = src('how-crypto-hacking-funds-isolated', { id: 'guardian-nk-crypto-funding', cluster: A,
  ru: 'Как криптовзломы финансируют изолированную ядерную программу КНДР',
  en: 'How crypto hacking funds isolated North Korea nuclear programme' });
// КНДР
S.jtCluster = src('cluster-bomb-warhead', { id: 'japantimes-nk-cluster-bomb', cluster: A,
  ru: 'КНДР испытала кассетные боеголовки в рамках очередного «крупного» оружейного теста',
  en: 'North Korea tests cluster bomb warheads in latest major weapons test' });
S.tass447 = src('2211447', { id: 'tass-nk-yield-test', cluster: B, sa: true,
  ru: 'КНДР провела испытание для оценки мощности оружейной системы',
  en: 'North Korea held test to assess weapon system yield' });
S.yna451 = src('000451315', { id: 'yna-nk-cluster-bomb', cluster: A,
  ru: 'КНДР испытала кассетную боеголовку для тактических баллистических ракет',
  en: 'N. Korea tests cluster bomb mountable on tactical ballistic missiles' });
S.yna130 = src('001300315', { id: 'yna-nk-slams-sanctions', cluster: A,
  ru: 'КНДР назвала «стратегическим» многостороннее заявление в поддержку санкций',
  en: "N. Korea slams multination statement backing anti-Pyongyang sanctions" });
S.jtDenuc = src('denuclearization-vow', { id: 'japantimes-denuclearization-vow', cluster: A,
  ru: 'США, Южная Корея и Япония обязались добиваться «полной» денуклеаризации КНДР',
  en: 'US, South Korea and Japan vow complete denuclearization of North Korea' });
S.aa026 = src('4107026', { id: 'aa-us-japan-sk-arctic', cluster: B, sa: true,
  ru: 'США, Япония и Южная Корея укрепили партнёрство и подписали соглашение об Арктике',
  en: 'US, Japan, South Korea strengthen partnership, sign Arctic cooperation agreement' });
S.yna300 = src('AEN20261030008100315', { id: 'yna-diplomats-nk-call', cluster: A,
  ru: 'Южная Корея, США и Япония обсудили последние пуски КНДР по телефону',
  en: 'S. Korea, U.S., Japan discuss N. Korea latest missile launches by phone' });
S.twzNKdrone = src('drone-a-palooza', { id: 'twz-nk-drones', cluster: A,
  ru: 'Главное с «парада дронов» КНДР',
  en: 'Highlights from North Korea drone-a-palooza' });
// Африка
S.afrEth = src('kill-at-least-25', { id: 'africanews-ethiopia-drones', cluster: A,
  ru: 'Удары дронов в Эфиопии: не менее 25 погибших, по свидетельствам',
  en: 'Drone strikes in Ethiopia kill at least 25: witnesses' });
S.twzEth = src('ethiopia-gets-12-russian-su-35', { id: 'twz-ethiopia-su35', cluster: A,
  ru: 'Эфиопия получает 12 российских Су-35 и присматривается к С-400',
  en: 'Ethiopia gets 12 Russian Su-35 fighters, eyes S-400 air defenses' });
S.un696 = src('1168696', { id: 'un-news-sudan-el-obeid', cluster: A,
  ru: 'Жители Эль-Обейда в Судане зажаты между дронами и арестами',
  en: "Civilians in Sudan's El Obeid trapped between drones and incarceration" });
S.un703 = src('1168703', { id: 'un-news-sudan-market', cluster: A,
  ru: 'ООН: пять детей погибли при ударе дрона по рынку в Ньяле, Судан',
  en: 'World News in Brief: 5 children killed in Sudan, Haiti hunger emergency, Yemen war update' });
S.guardSudan = src('uk-sanctions-sudanese-military-leaders', { id: 'guardian-uk-sanctions-sudan', cluster: A,
  ru: 'Великобритания ввела санкции против суданских военных за «кампанию насилия» в Эль-Фашире',
  en: "UK sanctions Sudanese military leaders implicated in El Fasher campaign of rape" });
S.afrRwanda = src('us-sanctions-on-rwanda', { id: 'africanews-rwanda-sanctions', cluster: A,
  ru: 'ДР Конго: санкции США против Руанды вызвали смешанную реакцию в Гоме',
  en: 'DRC: US sanctions on Rwanda draw mixed reactions in Goma' });
S.afrGhana = src('ghana-in-talks-with-russia', { id: 'africanews-ghana-nuclear', cluster: A,
  ru: 'Гана ведёт переговоры с Россией о первой АЭС',
  en: 'Ghana in talks with Russia for first nuclear power plant' });
S.afrRuto = src('president-ruto-seeks-compensation', { id: 'africanews-kenya-recruits', cluster: A,
  ru: 'Президент Руто требует компенсации для кенийцев, завербованных в российскую армию',
  en: 'President Ruto seeks compensation for Kenyans recruited into Russian military' });
S.afrCuba = src('cubans-call-for-lifting', { id: 'africanews-cuba-embargo', cluster: A,
  ru: 'Кубинцы призывают снять эмбарго и надеются на улучшение жизни',
  en: 'Cubans call for lifting of embargo, express hope for better lives' });
S.afrHaiti = src('2000-salvadoran-troops', { id: 'africanews-haiti-salvadoran', cluster: A,
  ru: '2 000 сальвадорских военных размещены на Гаити для борьбы с бандами',
  en: '2,000 Salvadoran troops take quarters in Haiti to help fight gangs' });
// Прочее (эскалация/деэскалация вне театра)
S.balkanSerbia = src('serbia-raises-terror-alert', { id: 'balkaninsight-serbia-alert', cluster: A,
  ru: 'Сербия повысила уровень террористической угрозы после нападения на посольство Израиля',
  en: 'Serbia raises terror alert after attack on Israeli embassy' });
S.nbcItaly = src('italy-strikes-violent-protests', { id: 'nbc-italy-troops', cluster: A,
  ru: 'Премьер Италии направляет войска на фоне общенациональных забастовок и блокад портов',
  en: 'Italy PM deploys troops as nation faces widespread strikes and port blockades' });
S.bdTaiwan = src('taiwan-2027-conflict-window', { id: 'breakingdefense-taiwan-window', cluster: A,
  ru: 'Окно конфликта вокруг Тайваня в 2027 году остаётся актуальным — командующий армией США в Пацифике',
  en: 'Taiwan 2027 conflict window remains valid, Army Pacific commander says' });
S.twzAmraam = src('japan-to-assemble-amraam', { id: 'twz-japan-amraam', cluster: A,
  ru: 'Япония будет собирать ракеты AMRAAM на фоне резкого роста производства AIM-120 в США',
  en: 'Japan to assemble AMRAAM missiles as U.S. moves to dramatically boost AIM-120 production' });
S.bdMecca = src('qatars-domestic-weapons', { id: 'breakingdefense-mecca-pact', cluster: A,
  ru: 'Вооружения Катара, арсенал дронов Турции и следующий тест Мекканского пакта',
  en: "Qatar's domestic weapons, Turkey's drone arsenal and the Mecca pact's next test" });
S.defDestinus = src('destinus-monthly-output', { id: 'defensenews-destinus', cluster: A,
  ru: 'Месячный выпуск Destinus превысил довоенное годовое производство крылатых ракет в Европе',
  en: "Destinus monthly output tops Europe's pre-war annual cruise missile production" });
S.guardGulf = src('gulf-states-rethink-trillion-dollar', { id: 'guardian-gulf-defence', cluster: A,
  ru: 'Страны Залива должны пересмотреть триллионные оборонные расходы из-за войны США и Ирана',
  en: 'Gulf states must rethink trillion-dollar defence in light of US-Iran war' });
S.ocPanahi = src('jafar-panahi', { id: 'guardian-panahi-sentence', cluster: A,
  ru: 'Иранскому режиссёру Джафару Панахи вынесли новый тюремный приговор, активы арестованы',
  en: 'Iranian film-maker Jafar Panahi given new prison sentence' });
S.ocPrison = src('russian-armenian-sentenced', { id: 'ocmedia-prison-sentence', cluster: A,
  ru: 'Россиянин армянского происхождения приговорён почти к 10 годам сибирской колонии за комментарии в соцсетях',
  en: 'Russian-Armenian sentenced to almost 10 years in Siberian prison over social media comments' });
S.sputSanctions = src('russia-at-g20-meeting-flags-sanctions', { id: 'sputnik-g20-sanctions', cluster: B, sa: true,
  ru: 'Россия на G20 указала на санкции и заморозку активов как методы подрыва мировой торговли',
  en: 'Russia at G20 meeting flags sanctions and asset freezes among methods undermining global trade' });
S.hinduIndiaEnergy = src('india-slams-global-energy-disruptions', { id: 'hindu-india-energy', cluster: A,
  ru: 'Индия осудила перебои в мировой энергетике из-за санкций и узких мест',
  en: 'India slams global energy disruptions through sanctions, chokepoints' });
S.almonQuad = src('indo-pacific-quad-ministers', { id: 'almonitor-quad-supply', cluster: A,
  ru: 'Министры Quad работают над цепочками поставок и осуждают произвольные экспортные ограничения',
  en: 'Indo-Pacific Quad ministers work on supply chains, denounce arbitrary export restrictions' });
S.twzCarriers = src('where-are-the-aircraft-carriers', { id: 'twz-carriers-oct27', cluster: A,
  ru: 'Где авианосцы: 27 октября 2026 года',
  en: 'Where are the aircraft carriers: October 27, 2026' });
S.twzMarALago = src('surface-to-air-missiles-deployed', { id: 'twz-mar-a-lago-sam', cluster: A,
  ru: 'ЗРК развёрнуты для защиты поместья Трампа Мар-а-Лаго',
  en: 'Surface-to-air missiles deployed to protect Trump Mar-a-Lago estate' });
S.dawnSyria = src('syria-weighing-whether-to-join-makkah', { id: 'dawn-syria-mecca-pact', cluster: A,
  ru: 'Сирия рассматривает вступление в Мекканский пакт — глава МИД',
  en: 'Syria weighing whether to join Makkah pact: foreign minister' });
S.hinduTaiwan = src('taiwan-says-china-harassing-shipping', { id: 'hindu-taiwan-shipping', cluster: A,
  ru: 'Тайвань заявил, что Китай препятствует судоходству патрулём у восточного побережья',
  en: 'Taiwan says China harassing shipping with east coast patrol' });

// --- Критерии недели ------------------------------------------------------
const R = (...ids) => ids;
const pick = (keys) => keys.map((k) => {
  const url = S[k];
  if (!url) throw new Error(`неизвестный источник: ${k}`);
  const rec = registry.get(url);
  return { url: rec.url, date: rec.publication_date, cluster: rec.cluster_id, type: rec.source_type, state_affiliated: rec.state_affiliated };
});

const C = {
  // Д1 — военные перемещения и боевые действия
  'D1.1': { events: [0.5, 0.5, 0.5], regions: R('middle-east', 'north-america', 'east-asia'),
    srcs: pick(['sputAlarm', 'newsam', 'twzCarriers']) },
  'D1.4': { events: [1, 1, 1, 0.5, 0.5, 0.5], regions: R('middle-east', 'ukraine-moldova', 'russia-belarus', 'africa'),
    srcs: pick(['un702', 'sputChpp', 'tass325', 'afrChern', 'un696', 'sputHouthi']) },
  'D1.5': { value: 0.33, regions: R('middle-east', 'eu-north-europe'),
    srcs: pick(['twzCarriers', 'defBlack', 'sputAlarm']) },
  // Д2 — ядерная сфера
  'D2.1': { value: 0, regions: R('middle-east'), srcs: pick(['jpost416', 'mehr058']) },
  'D2.2': { value: 0, regions: R('middle-east'), srcs: pick(['tass423', 'tass381', 'jpost416']) },
  'D2.5': { value: 0.33, regions: R('middle-east'), srcs: pick(['un682', 'tass381']) },
  // Д3 — дипломатия
  'D3.2': { value: 0.67, regions: R('middle-east', 'north-america'),
    srcs: pick(['dawn187', 'tass365', 'tass377', 'hindu951']) },
  'D3.3': { events: [1, 0.5, 0.5], regions: R('africa', 'east-asia'),
    srcs: pick(['guardSudan', 'afrRwanda', 'yna130', 'sputSanctions']) },
  'D3.4': { value: 0.67, regions: R('middle-east', 'ukraine-moldova'),
    srcs: pick(['almonQatar', 'tass371', 'hinduDraft', 'aa812', 'sputTril', 'repTril']) },
  'D3.5': { events: [1, 0.5, 0.5], regions: R('ukraine-moldova'),
    srcs: pick(['guardOlesh', 'un712', 'sputAlyEnd', 'tass421', 'straitsGrass']) },
  // Д4 — экономика
  'D4.2': { value: 0.33, regions: R('ukraine-moldova', 'north-america'), srcs: pick(['aa902', 'hinduPatriot']) },
  'D4.3': { value: 0.67, regions: R('middle-east', 'eu-north-europe', 'south-asia'),
    srcs: pick(['splashRates', 'gcapEcon', 'oilRefin', 'hinduIndiaEnergy', 'almonQuad']) },
  'D4.4': { events: [1, 0.5, 0.5, 0.5], regions: R('middle-east', 'south-asia'),
    srcs: pick(['hinduTankers', 'mehr039', 'straitsOman', 'gcapLimpet', 'mehr033']) },
  'D4.5': { events: [0.5, 0.5], regions: R('middle-east', 'north-america'), srcs: pick(['tass373', 'afrCuba']) },
  'D4.6': { value: 1, regions: R('middle-east', 'north-america', 'eu-north-europe'),
    srcs: pick(['oilBrent', 'oilGas', 'cbcStocks', 'cnbcIb', 'komBrent']) },
  // Д5 — риторика и кибер
  'D5.1': { value: 1, regions: R('middle-east', 'north-america'),
    srcs: pick(['dawn187', 'tass365', 'tehr694', 'mehr048', 'sputAlarm']) },
  'D5.2': { events: [1, 1, 0.5], regions: R('east-asia', 'north-america'),
    srcs: pick(['guardBin', 'tass451', 'straitsFbiBin', 'nprBin']) },
  // Д6 — мобилизация и эвакуация
  'D6.2': { value: 1, regions: R('middle-east', 'ukraine-moldova'),
    srcs: pick(['almonLeave', 'aa888', 'guardOlesh', 'sputAlyEnd']) },
  'D6.3': { value: 1, regions: R('eu-north-europe', 'middle-east', 'east-asia'),
    srcs: pick(['defDestinus', 'twzAmraam', 'bdMecca', 'aa902']) },
  // Д7 — вовлечение третьих сторон
  'D7.1': { events: [1, 1, 0.5, 0.5], regions: R('ukraine-moldova', 'east-asia', 'middle-east'),
    srcs: pick(['aa902', 'hinduPatriot', 'twzMig', 'bdMecca', 'defBlack']) },
  'D7.2': { events: [1, 1, 0.5, 0.5, 0.5], regions: R('middle-east', 'ukraine-moldova', 'balkans', 'russia-belarus'),
    srcs: pick(['ins853', 'tass441', 'gcapLimpet', 'mehr049', 'balkanSerbia', 'straitsFsb', 'tass387']) },
  // Д8 — деэскалация
  'D8.1': { value: 0, regions: R('ukraine-moldova', 'middle-east'), srcs: pick(['almonBlackSea', 'sputAlyObs']) },
  'D8.2': { value: 0.33, regions: R('ukraine-moldova'),
    srcs: pick(['guardOlesh', 'cbsOlesh', 'fr24Olesh', 'sputAlyObs', 'tass421']) },
  'D8.3': { value: 0.33, regions: R('middle-east', 'africa'), srcs: pick(['un706', 'aljUN', 'un682']) },
  'D8.4': { value: 0, regions: R('ukraine-moldova', 'middle-east'), srcs: pick(['un702', 'sputChpp', 'tass361']) },
  // Д9 — «тихие» меры
  'D9.2': { value: 0.33, regions: R('africa', 'russia-belarus'), srcs: pick(['sputSanctions', 'guardSudan']) },
  'D9.3': { value: 1, regions: R('middle-east', 'eu-north-europe', 'east-asia'),
    srcs: pick(['splashRates', 'gcapEcon', 'ins853', 'straitsOman', 'tass441', 'defBlack']) },
  'D9.6b': { value: 0.67, regions: R('middle-east', 'north-america'), srcs: pick(['almonLeave', 'aa888']) },
  'D9.7': { value: 0, regions: R('middle-east', 'africa'), srcs: pick(['sputSanctions', 'guardSudan']) },
};

const BLIND = {
  'D1.2': 'searched-none',
  'D1.3': 'gate-failed',
  'D1.6': 'searched-none',
  'D2.3': 'searched-none',
  'D2.4': 'searched-none',
  'D3.1': 'searched-none',
  'D4.1': 'gate-failed',
  'D5.3': 'searched-none',
  'D5.4': 'searched-none',
  'D6.1': 'gate-failed',
  'D6.4': 'searched-none',
  'D7.3': 'searched-none',
  'D7.4': 'searched-none',
  'D9.1': 'searched-none',
  'D9.4': 'searched-none',
  'D9.5': 'searched-none',
  'D9.6a': 'searched-none',
};

const criteria = {};
for (const id of Object.keys(CRITERIA)) {
  if (C[id]) {
    const { srcs, ...rest } = C[id];
    criteria[id] = { ...rest, covered: true, sources: srcs };
  } else criteria[id] = null;
}

const driverConfidence = {
  D1: { level: 'high', reason: 'Покрыто 3/6: боевые действия (D1.4) подтверждены кластерами A и B — удар по вокзалу в Днепре (13 погибших), удары по ТЭЦ-6 и энергетике, гибель двух подростков в Чернигове, удар дрона по рынку в Ньяле и атаки хуситов на НПЗ и аэропорты Саудовской Аравии; перемещения войск (D1.1 = 0.3) и развёртывание стратегических систем (D1.5 = 0.33) опираются на стягивание сил США к Ближнему Востоку, переход авианосной группы к учениям Keen Sword 27 и концентрацию кораблей НАТО в Чёрном море. Учения (D1.2), логистика (D1.3) и разведение сил (D1.6) в окне не подтверждены.' },
  D2: { level: 'medium', reason: 'Покрыто 3/5: публичных ядерных угроз на уровне глав государств нет (D2.1 = 0), смены доктрины нет (D2.2 = 0) — Тегеран обсуждает запрет на ядерное оружие и возможность выхода из ДНЯО, но глав МИД подтверждает приверженность договору. Возврат к договорным механизмам частичный (D2.5 = 0.33): МАГАТЭ призывает вернуть инспекторов в Иран, приверженность ДНЯО подтверждена. Технических сигналов и повышения готовности ядерных сил в окне нет.' },
  D3: { level: 'high', reason: 'Покрыто 4/5: ультиматумы (D3.2 = 0.67) — требование Ирана сократить военное присутствие США в регионе и угроза «ответа без географических ограничений»; переговоры (D3.4 = 0.67) — иранская делегация в Дохе с катарскими посредниками, письмо Вэнса, проект сделки по урану и Ормузу, подготовка трёхсторонних переговоров по Украине после 4 ноября; санкционные решения (D3.3 = 0.4) — санкции Великобритании против суданских военных, санкции США против Руанды, реакция КНДР; гуманитарные договорённости (D3.5 = 0.4) — перемирие в Олешках и договорённость о регулярных гуманитарных миссиях. Разрыва дипломатических отношений в окне не зафиксировано.' },
  D4: { level: 'high', reason: 'Покрыто 5/6: стресс рынков (D4.6 = 1) — Brent у $120, бензин +34 %, топочный мазут +74 %, худший день Уолл-стрит с июня, ставка I bond 5,51 %; подрыв цепочек поставок (D4.3 = 0.67) — вышедшие из-под контроля ставки фрахта, пересмотр сворачивания нефтепереработки в Европе, перебои энергетики из-за санкций и узких мест; блокировка торговых путей (D4.4 = 0.5) — мины и пожары на танкерах, остановка судов КСИР; военные расходы (D4.2 = 0.33) — одобренная продажа Patriot Украине на $2,1 млрд; частичное снятие ограничений (D4.5 = 0.2) — готовность Ирана открыть Ормуз при сделке, призывы снять эмбарго с Кубы. Новые санкции и контрсанкции (D4.1) отсечены воротами независимости — один кластер.' },
  D5: { level: 'medium', reason: 'Покрыто 2/4: эскалация военной риторики (D5.1 = 1) — заявления верховного лидера Ирана о «неограниченном географическом ответе», предупреждения армии Ирана, сообщения о подготовке ударов Израилем и США. Кибероперации с атрибуцией (D5.2 = 0.5) — кража $6,3 млрд у Binance с атрибуцией ФБР (группа TraderTraitor, КНДР), призывы бирж усилить защиту. Дезинформационных кампаний и снижения пропаганды в окне не зафиксировано.' },
  D6: { level: 'medium', reason: 'Покрыто 2/4: эвакуация населения (D6.2 = 1) — вывоз неэкстренного персонала США из Саудовской Аравии и эвакуация жителей Олешек через гуманитарный коридор. Военная переориентация экономики (D6.3 = 1) — месячный выпуск крылатых ракет Destinus превысил довоенный годовой объём Европы, Япония начинает сборку AMRAAM, Мекканский пакт и вооружение Катара, продажа Patriot Украине. Военного положения и отмены мобилизационных мер в окне нет.' },
  D7: { level: 'medium', reason: 'Покрыто 2/4: вовлечение новых государств (D7.1 = 0.6) — одобренная продажа Patriot Украине, передача польских МиГ-29, военное сотрудничество по Мекканскому пакту, координация черноморских стран НАТО; удары за пределами театра (D7.2 = 0.7) — затопление греческого судна у Болгарии дроном, гибель танзанийского судна у Кипра, мина на танкере в Ормузе, атака на посольство Израиля в Белграде, предупреждение ФСБ о теракте в Москве. Новых фронтов и выхода третьих сторон из конфликта в окне нет.' },
  D8: { level: 'low', reason: 'Покрыто 4/4: прекращения огня, соблюдаемого всё окно, нет (D8.1 = 0) — обсуждается лишь ограниченное перемирие в Чёрном море; локальные договорённости частичные (D8.2 = 0.33) — перемирие в Олешках и регулярные гуманитарные миссии; наблюдение ограничено призывами и отчётами (D8.3 = 0.33) — МАГАТЭ по инспекциям в Иране, ООН по доступу в Йемене; устойчивого снижения интенсивности нет (D8.4 = 0) — удары по вокзалу и энергетике продолжались.' },
  D9: { level: 'medium', reason: 'Покрыто 4/8 подгрупп. Финансовая изоляция (D9.2 = 0.33): Россия на G20 указывает на санкции и заморозку активов, Великобритания вводит санкции против суданских военных. Транспорт и страхование (D9.3 = 1): рекордные ставки фрахта, остановка танкеров КСИР, затопления судов у Болгарии и Кипра, эвакуация экипажа Оманом. Эвакуация элит и активов (D9.6b = 0.67): вывоз неэкстренного персонала США из Саудовской Аравии. Снятия «тихих» мер нет (D9.7 = 0): санкции и заморозка активов сохраняются, обратного движения не зафиксировано. Медицинская подготовка, стратегическое накопление, кадровые меры и информационный суверенитет в окне не подтверждены.' },
};

const sources = [...registry.values()].sort((a, b) => a.id.localeCompare(b.id));

const input = {
  week: WEEK,
  params: 'calc/params.js',
  criteria,
  driverConfidence,
  blindReasons: BLIND,
  sources,
};

// --- Самопроверка до записи ----------------------------------------------
const regionIds = regionIdsFor('2.0');
const errors = [
  ...validate(input, undefined, regionIds),
  ...validateInputSources(sources),
  ...validateSourceIndependence(input),
  ...validateBlindReasons(input),
];
if (errors.length) {
  process.stderr.write('ОШИБКИ ВХОДА:\n' + errors.map((e) => '  ' + e).join('\n') + '\n');
  process.exitCode = 1;
} else {
  const covered = Object.values(criteria).filter((c) => c && c.covered === true).length;
  process.stdout.write(`вход валиден: критериев покрыто ${covered}/${Object.keys(criteria).length}, источников ${sources.length}, слепых ${Object.keys(BLIND).length}\n`);
  if (process.argv.includes('--write')) {
    const out = path.join(ROOT, 'calc/input', `${WEEK}.json`);
    writeFileSync(out, JSON.stringify(input, null, 2) + '\n', 'utf8');
    process.stdout.write(`записано: ${out}\n`);
  }
}
