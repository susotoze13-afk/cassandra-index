window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.sources = [
  {
    "id": "tass-tersyanka",
    "title": {
      "ru": "Российские силы освободили Терсянку в Запорожской области — Генштаб",
      "en": "Russian forces liberate Tersyanka in Zaporozhye Region — top brass"
    },
    "domain": "tass.com",
    "url": "https://tass.com/defense/2218169",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "straitstimes-pentagon-troops",
    "title": {
      "ru": "Пентагон пересматривает сокращение войск в Европе",
      "en": "Pentagon eyes smaller troop cuts across Europe in reversal"
    },
    "domain": "straitstimes.com",
    "url": "https://www.straitstimes.com/world/europe/pentagon-eyes-smaller-troop-cuts-across-europe-in-reversal",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "japantimes-pentagon-troops",
    "title": {
      "ru": "Пентагон намерен сократить войска в Европе меньше запланированного",
      "en": "In reversal, Pentagon eyes smaller troop cuts across Europe"
    },
    "domain": "japantimes.co.jp",
    "url": "https://www.japantimes.co.jp/news/2026/11/15/world/pentagon-troop-cuts-europe-reversal/",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-f16-repairs",
    "title": {
      "ru": "Поставленные Украине F-16 постоянно находятся в ремонте — Зеленский",
      "en": "F-16s supplied to Ukraine constantly undergoing repairs — Zelensky"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2218181",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "ocmedia-drone-deals-baku",
    "title": {
      "ru": "Зеленский хвалит новые дроновые сделки Баку и Киева",
      "en": "‘We are working to scale up orders’: Zelenskyy praises new drone deals between Baku and Kyiv"
    },
    "domain": "oc-media.org",
    "url": "https://oc-media.org/we-are-working-to-scale-up-orders-zelenskyy-praises-new-drone-deals-between-baku-and-kyiv/",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "guardian-nasser-hospital",
    "title": {
      "ru": "Авиаудар Израиля по больнице «Насер» в Газе: погибли хирург и пятеро",
      "en": "Israeli airstrike on Nasser hospital in Gaza kills surgeon and five others"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/nov/12/israeli-airstrike-nasser-hospital-gaza-kills-surgeon",
    "publication_date": "2026-11-12",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "guardian-iran-radar-bahrain",
    "title": {
      "ru": "Иран заявил об ударе по радиолокатору США в Бахрейне",
      "en": "Iran says it targeted US military radar in Bahrain in retaliatory strike"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/nov/13/iran-us-radar-bahrain-sirik-hormuz",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-bahrain-radar",
    "title": {
      "ru": "Иран ударил БПЛА по радиолокационной инфраструктуре базы США в Бахрейне — КСИР",
      "en": "Iran strikes by UAVs radar infrastructure at US military base in Bahrain - IRGC"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2218255",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-bahrain-six-drones",
    "title": {
      "ru": "Иран заявил об ударе шестью дронами по радиолокатору США в Бахрейне",
      "en": "Iran says it targeted US radar site in Bahrain with 6 drones"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/iran-says-it-targeted-us-radar-site-in-bahrain-with-6-drones/4125490",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "africanews-kyiv-hospital",
    "title": {
      "ru": "Российские дроны ударили по больнице в Киеве, двое погибли в Одессе",
      "en": "Ukraine: Russian drone attacks hit Kyiv hospital, leave two dead in Odesa"
    },
    "domain": "africanews.com",
    "url": "http://www.africanews.com/2026/11/13/ukraine-russian-drone-attacks-hit-kyiv-hospital-leave-one-dead-in-odesa/",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-ethiopia-eritrea",
    "title": {
      "ru": "Эфиопия и Эритрея обменялись ударами дронов и артиллерии",
      "en": "Ethiopia, Eritrea reportedly exchange drone, artillery strikes as border fighting intensifies"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/africa/ethiopia-eritrea-reportedly-exchange-drone-artillery-strikes-as-border-fighting-intensifies/4124999",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-houthi-taiz",
    "title": {
      "ru": "Атаки хуситов в Таизе: 51 погибший за 12 дней",
      "en": "Houthi attacks kill 51, wound 85 in Yemen’s Taiz over 12 days, rights group says"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/houthi-attacks-kill-51-wound-85-in-yemen-s-taiz-over-12-days-rights-group-says/4125085",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "africanews-drc-44",
    "title": {
      "ru": "ДР Конго: не менее 44 погибших при атаке боевиков, связанных с ИГ",
      "en": "DR Congo: At least 44 dead in attack by Islamic State-linked gunmen"
    },
    "domain": "africanews.com",
    "url": "http://www.africanews.com/2026/11/14/dr-congo-at-least-44-dead-in-attack-by-islamic-state-linked-gunmen/",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "dawn-24-militants",
    "title": {
      "ru": "Пакистан: 24 боевика уничтожены в Хайбер-Пахтунхве и Белуджистане",
      "en": "Major among 4 troops martyred, 24 terrorists killed during operations in KP and Balochistan: ISPR"
    },
    "domain": "dawn.com",
    "url": "https://www.dawn.com/news/2044488/major-among-4-troops-martyred-24-terrorists-killed-during-operations-in-kp-and-balochistan-ispr",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-hamas-commander",
    "title": {
      "ru": "Израильский удар убил старшего командира ХАМАС в Газе",
      "en": "Israeli air strike kills senior Hamas commander in Gaza"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/11/15/israeli-air-strike-kills-senior-hamas-commander-in-gaza?traffic_source=rss",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "un-sudan-long-range",
    "title": {
      "ru": "Судан: после дронов-камикадзе нормой стали дальнобойные удары",
      "en": "Sudan war: First ‘suicide’ drone attacks, now long-range strikes are the norm"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/11/1168771",
    "publication_date": "2026-11-10",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "reportaz-hormuz-sailors",
    "title": {
      "ru": "ООН: не менее 25 моряков погибли в Ормузском проливе и вокруг него",
      "en": "At least 25 sailors killed in and around Strait of Hormuz, UN says"
    },
    "domain": "report.az",
    "url": "https://report.az/en/other-countries/at-least-25-sailors-killed-in-and-around-strait-of-hormuz-un-says",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-doctrine-review",
    "title": {
      "ru": "Высший клерикальный орган Ирана призвал пересмотреть ядерную доктрину",
      "en": "Iran's top clerical governing body calls for nuclear doctrine review"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611121701",
    "publication_date": "2026-11-12",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-iaea-alarm",
    "title": {
      "ru": "МАГАТЭ встревожено объектом обогащения в Иране, который никогда не инспектировало",
      "en": "IAEA raises alarm over Iranian enrichment plant it has never inspected"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611133720",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "reportaz-netanyahu-nuclear",
    "title": {
      "ru": "Нетаньяху: Иран стремится возродить ядерную программу",
      "en": "Netanyahu says Iran seeks to revive nuclear program"
    },
    "domain": "report.az",
    "url": "https://report.az/en/other-countries/netanyahu-says-iran-seeks-to-revive-nuclear-program",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "jpost-israel-fears-strike",
    "title": {
      "ru": "Израиль опасается внезапного удара США по Ирану на фоне ядерных переговоров",
      "en": "Israel fears surprise US strike on Iran as nuclear talks fuel concerns of escalation - analysis"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/iran-news/article-914880",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "almonitor-nuclear-arms-cuts",
    "title": {
      "ru": "Трамп поднимет вопрос сокращения ядерных арсеналов с Путиным и Си",
      "en": "Trump to raise nuclear-arms cuts with Putin, Xi on Thursday, White House says"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/11/trump-raise-nuclear-arms-cuts-putin-xi-thursday-white-house-says",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-seven-conditions",
    "title": {
      "ru": "Иран требует от США «сдаться» по семи условиям",
      "en": "Iran says the US must ‘surrender’ to seven conditions. What are they?"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611123622",
    "publication_date": "2026-11-12",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-total-victory",
    "title": {
      "ru": "Трамп обещает «полную победу», Иран отвергает уступки",
      "en": "Trump vows ‘total victory’ as Iran rejects concessions and threatens wider war"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611122691",
    "publication_date": "2026-11-12",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-latvia-grain-ban",
    "title": {
      "ru": "МИД Латвии готовит запрет транзита российского и белорусского зерна",
      "en": "Latvian Foreign Ministry drafts ban on Russian, Belarusian grain transit"
    },
    "domain": "tass.com",
    "url": "https://tass.com/economy/2218129",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-g7-warns",
    "title": {
      "ru": "G7 предупреждает Иран о продолжении давления",
      "en": "G7 warns Iran of continued pressure if diplomacy fails"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611111088",
    "publication_date": "2026-11-11",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "africanews-france-algeria",
    "title": {
      "ru": "Франция выводит торговый спор с Алжиром на уровень ЕС",
      "en": "France escalates Algeria trade dispute to EU-level"
    },
    "domain": "africanews.com",
    "url": "http://www.africanews.com/2026/11/13/france-escalates-algeria-trade-dispute-to-eu-level/",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-shenzhen-summit",
    "title": {
      "ru": "Трёхсторонний саммит Путина, Си и Трампа пройдёт в Шэньчжэне 19 ноября — Кремль",
      "en": "Putin, Xi Jinping, Trump trilateral summit to be held in Shenzhen on November 19 — Kremlin"
    },
    "domain": "tass.com",
    "url": "https://tass.com/politics/2218203",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "scmp-shenzhen-summit",
    "title": {
      "ru": "Белый дом подтвердил трёхсторонние переговоры США, Китая и России на полях саммита",
      "en": "White House confirms US-China-Russia trilateral talks on Apec sidelines"
    },
    "domain": "scmp.com",
    "url": "https://www.scmp.com/news/china/diplomacy/article/3374415/white-house-confirms-us-china-russia-trilateral-apec-sidelines",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "scmp-hq17-taiwan",
    "title": {
      "ru": "ПВО HQ-17: способна ли она прикрыть десантные силы КНР от ударов с Тайвань",
      "en": "Could Beijing’s HQ-17 air-defence system defend PLA amphibious forces from Taiwan strikes?"
    },
    "domain": "scmp.com",
    "url": "https://www.scmp.com/news/china/military/article/3374448/could-beijings-hq-17-air-defence-system-defend-pla-amphibious-forces-taiwan-strikes",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-kushner-broker",
    "title": {
      "ru": "Кушнер заявил, что намерен организовать переговоры Европы и России",
      "en": "US envoy Kushner says he aims to broker Europe-Russia talks on Ukraine"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/11/14/us-envoy-kushner-says-he-aims-to-broker-europe-russia-talks-on-ukraine?traffic_source=rss",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "almonitor-ceding-donbas",
    "title": {
      "ru": "Зеленский: США предлагали уступить Донбасс в обмен на членство в НАТО",
      "en": "US floated idea of Ukraine ceding Donbas for NATO membership, Zelenskiy says"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/11/us-floated-idea-ukraine-ceding-donbas-nato-membership-zelenskiy-says",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "washingtonpost-russia-pullback",
    "title": {
      "ru": "Россия требует отвода НАТО; Зеленский говорит об обсуждении уступок территорией",
      "en": "Russia seeks NATO pullback; Zelensky says U.S. asked about ceding territory"
    },
    "domain": "washingtonpost.com",
    "url": "https://www.washingtonpost.com/world/2026/11/14/russia-seeks-nato-pullback-zelensky-says-us-asked-about-ceding-territory/",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-zelensky-prisoner-swap",
    "title": {
      "ru": "Зеленский: стороны обсуждают обмен пленными по 1 200–1 300 человек",
      "en": "Zelenskyy says Ukraine, Russia discuss prisoner swap involving 1,200-1,300 people from each side"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/russia-ukraine-war/zelenskyy-says-ukraine-russia-discuss-prisoner-swap-involving-1-200-1-300-people-from-each-side/4125097",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-tankers-fire",
    "title": {
      "ru": "Два танкера загорелись после подрыва на морской мине в Ормузе",
      "en": "2 tankers caught fire after hitting naval mine in Hormuz, Iranian navy says"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/2-tankers-caught-fire-after-hitting-naval-mine-in-hormuz-iranian-navy-says/4125096",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-tankers-mines",
    "title": {
      "ru": "Два нефтяных танкера подорвались на минах при проходе Ормузского пролива",
      "en": "Two oil tankers hit mines attempting to pass Strait of Hormuz — IRGC"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2218247",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "almonitor-tankers-mines",
    "title": {
      "ru": "ВМС Ирана: три танкера горят после подрыва на минах в Ормузе",
      "en": "Iran's navy says three tankers on fire after hitting mines in Hormuz"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/11/irans-navy-says-three-tankers-fire-after-hitting-mines-hormuz",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-un-maritime-attacks",
    "title": {
      "ru": "ООН предупреждает о росте морских атак и требует восстановить судоходство",
      "en": "UN warns of rising maritime attacks, urges restoration of safe navigation in Strait of Hormuz, Red Sea"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/un-warns-of-rising-maritime-attacks-urges-restoration-of-safe-navigation-in-strait-of-hormuz-red-sea/4124809",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "almonitor-fertilisers",
    "title": {
      "ru": "ООН призывает Иран и США пропустить удобрения через Ормуз",
      "en": "UN official urges Iran, US to let fertilisers through Hormuz Strait"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/11/un-official-urges-iran-us-let-fertilisers-through-hormuz-strait",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "oilprice-jones-act",
    "title": {
      "ru": "Трамп продлил исключение из закона Джонса ещё на 90 дней",
      "en": "Trump Extends Jones Act Waiver For Another 90 Days"
    },
    "domain": "oilprice.com",
    "url": "https://oilprice.com/Latest-Energy-News/World-News/Trump-Extends-Jones-Act-Waiver-For-Another-90-Days.html",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-iraq-smuggling",
    "title": {
      "ru": "Премьер Ирака уволил девять чиновников из-за контрабанды нефти",
      "en": "Iraq PM sacks nine officials over oil smuggling in pro-Iran stronghold"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/11/15/iraq-pm-sacks-nine-officials-over-oil-smuggling-in-pro-iran-stronghold?traffic_source=rss",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "oilprice-brent-96",
    "title": {
      "ru": "Brent вернулся выше $96 на эскалации вокруг Ирана",
      "en": "Brent Crude Climbs Back Above $96 as Iran Tensions Escalate"
    },
    "domain": "oilprice.com",
    "url": "https://oilprice.com/Energy/Energy-General/Brent-Crude-Climbs-Back-Above-96-as-Iran-Tensions-Escalate.html",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "cnbc-ppi",
    "title": {
      "ru": "Оптовые цены в США выросли на 0,3 %, годовой рост 6,5 % — максимум за четыре года",
      "en": "Wholesale prices rose 0.3% in October, putting annual rate at 6.5%, the highest in nearly four years"
    },
    "domain": "cnbc.com",
    "url": "https://www.cnbc.com/2026/11/13/ppi-inflation-report-october-2026.html",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "cnbc-nvidia-17t",
    "title": {
      "ru": "Nvidia: худшая недельная серия с 2012 года, капитализация упала на $1,7 трлн",
      "en": "Nvidia stock suffers longest weekly losing streak since 2012 as market value sinks by $1.7 trillion"
    },
    "domain": "cnbc.com",
    "url": "https://www.cnbc.com/2026/11/13/nvidia-stock-jensen-affair-ai.html",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "hindustantimes-stocks-3t",
    "title": {
      "ru": "Трамп винит демократов в потере $3 трлн капитализации рынка США",
      "en": "Trump blames Democrats for $3 trillion US stock market loss after 2026 midterms"
    },
    "domain": "hindustantimes.com",
    "url": "https://www.hindustantimes.com/world-news/us-news/trump-blames-democrats-for-3-trillion-us-stock-market-loss-after-2026-midterms-101794713697395.html",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "cnbc-heating-oil",
    "title": {
      "ru": "Цены на печное топливо выросли на 59 % к прошлой зиме",
      "en": "Heating oil prices are up 59% from last winter. The spike is 'crushing folks,' Maine nonprofit says"
    },
    "domain": "cnbc.com",
    "url": "https://www.cnbc.com/2026/11/14/heating-oil-price-spike-household-budgets.html",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-threat-europe",
    "title": {
      "ru": "Иран угрожает базам США в Европе в случае возобновления атак",
      "en": "Iran threatens US bases in Europe if attacks resume"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611114265",
    "publication_date": "2026-11-11",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-threat-trump",
    "title": {
      "ru": "Иранские командиры угрожают убить Трампа и бить по целям США по всему миру",
      "en": "Iranian commanders threaten to kill Trump, strike US targets worldwide"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611111877",
    "publication_date": "2026-11-12",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-threat-armenia",
    "title": {
      "ru": "Иран угрожает Армении на фоне прохождения «маршрута Трампа»",
      "en": "Iran threatens Armenia as US-run Trump Route clears Yerevan’s parliament"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611129472",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "astanatimes-kazakhstan-nuclear",
    "title": {
      "ru": "Казахстан продвигает планы атомной энергетики",
      "en": "Kazakhstan Advances Nuclear Power Plans, Considers Sites for Third Facility"
    },
    "domain": "astanatimes.com",
    "url": "https://astanatimes.com/2026/11/kazakhstan-advances-nuclear-power-plans-considers-sites-for-third-facility/",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-france-hack",
    "title": {
      "ru": "Франция расследует взлом холодильника с кровью после похожих атак",
      "en": "France probes blood freezer hack after blaming Iran for similar attacks"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611137304",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-iran-network-europe",
    "title": {
      "ru": "Сеть из семи человек, связанная с Ираном, организовала волну атак в Европе",
      "en": "Seven-man Iran-linked network helped orchestrate wave of attacks across Europe - ITV"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611126962",
    "publication_date": "2026-11-12",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "cisa-advisory",
    "title": {
      "ru": "CISA: бюллетень по киберугрозам",
      "en": "CISA Announces Enhanced Reporting Form for Cyber Incidents"
    },
    "domain": "cisa.gov",
    "url": "https://www.cisa.gov/news-events/news/cisa-announces-enhanced-reporting-form-cyber-incidents",
    "publication_date": "2026-11-09",
    "accessed_date": "2026-11-15",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-us-rejects-radar",
    "title": {
      "ru": "США отвергли заявление Ирана о радиолокаторе и сообщили о сбитых дронах",
      "en": "US rejects Iran's radar claim, says it shot down drones over Bahrain"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611137770",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "un-nigeria-64k",
    "title": {
      "ru": "Почти 64 тыс. человек бежали из Нигерии в Нигер",
      "en": "Nearly 64,000 flee Nigeria for Niger where a humanitarian crisis is deepening"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/11/1168779",
    "publication_date": "2026-11-10",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-yemen-displaced",
    "title": {
      "ru": "Йемен: бои вытеснили более 340 тыс. человек",
      "en": "Yemen's government-aligned forces repel Houthi attack as fighting has displaced over 340,000 people"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/yemens-government-aligned-forces-repel-houthi-attack-as-fighting-has-displaced-over-340-000-people/4124969",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "un-gaza-winter-aid",
    "title": {
      "ru": "Гуманитарные организации требуют быстрого ввоза зимних грузов в Газу",
      "en": "‘Lives are at stake’: Humanitarians call for swift entry of winter supplies in Gaza"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/11/1168799",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-un-evacuations",
    "title": {
      "ru": "Управление ООН по правам человека рассматривает поддержку будущих эвакуаций",
      "en": "UN Human Rights Office considers supporting future evacuations"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2218267",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "oilprice-iran-budget",
    "title": {
      "ru": "Иран готовит бюджет без нефтяных доходов",
      "en": "Iran Braces for a Budget Without Oil Revenue"
    },
    "domain": "oilprice.com",
    "url": "https://oilprice.com/Energy/Energy-General/Iran-Braces-for-a-Budget-Without-Oil-Revenue.html",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-gasoline-rationing",
    "title": {
      "ru": "Иран вводит нормирование бензина, не решаясь поднять цены",
      "en": "Seven years after ‘Bloody November,’ Iran rations gasoline it dares not reprice"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611146434",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "almonitor-turkey-qatar",
    "title": {
      "ru": "Турция и Катар подписали соглашение о взаимной обороне",
      "en": "Turkey, Qatar sign mutual defence agreement"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/11/turkey-qatar-sign-mutual-defence-agreement",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-north-korea-moscow",
    "title": {
      "ru": "Официальная делегация КНДР прибыла в Москву — ЦТАК",
      "en": "North Korea’s official delegation arrives in Moscow — KCNA"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2218241",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-bulgaria-weapons",
    "title": {
      "ru": "Болгария прекращает поставки оружия Украине — премьер",
      "en": "Bulgaria to stop supplying weapons to Ukraine — PM"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2218193",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "balkaninsight-black-sea",
    "title": {
      "ru": "ЕС предложил странам Чёрного моря поддержку против угроз безопасности",
      "en": "EU Offers Black Sea Countries Support to Counter Security Threats"
    },
    "domain": "balkaninsight.com",
    "url": "https://balkaninsight.com/2026/11/09/eu-offers-black-sea-countries-support-to-counter-security-threats/bi/",
    "publication_date": "2026-11-09",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "bnn-gulf-warship",
    "title": {
      "ru": "Украинский дрон ударил по российскому военному кораблю в Финском заливе",
      "en": "Ukrainian drone strikes Russian warship in the Gulf of Finland"
    },
    "domain": "bnn-news.com",
    "url": "https://bnn-news.com/world/ukrainian-drone-strikes-russian-warship-in-the-gulf-of-finland-7pb9k3z",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "bnn-rail-baltica",
    "title": {
      "ru": "Латвия рассматривает заморозку проекта Rail Baltica",
      "en": "\"You cannot bear what you cannot afford\" – Latvia considers freezing Rail Baltica project"
    },
    "domain": "bnn-news.com",
    "url": "https://bnn-news.com/social/you-cannot-bear-what-you-cannot-afford-latvia-considers-freezing-rail-baltica-project-vdx9k4n",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "bnn-latvia-grain-checks",
    "title": {
      "ru": "Проверки транзитных партий зерна в Латвии не нашли украинского зерна",
      "en": "Initial checks of transit grain shipments in Latvia find no grain stolen from Ukraine"
    },
    "domain": "bnn-news.com",
    "url": "https://bnn-news.com/world/initial-checks-of-transit-grain-shipments-in-latvia-find-no-grain-stolen-from-ukraine-2g73jb6",
    "publication_date": "2026-11-12",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "kursiv-sibur-sanctions",
    "title": {
      "ru": "Британия ввела санкции против СИБУРа; Казахстан может почувствовать эффект",
      "en": "UK imposes sanctions on Russia’s SIBUR; Kazakhstan could feel the impact"
    },
    "domain": "kz.kursiv.media",
    "url": "https://kz.kursiv.media/en/2026-11-13/engk-tank-uk-imposes-sanctions-on-russias-sibur-kazakhstan-could-feel-the-impact/",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "kossev-serbia-kfor",
    "title": {
      "ru": "Начальник Генштаба Сербии обсудил с командующим KFOR ситуацию безопасности в Косове",
      "en": "Načelnik Generalštaba Vojske Srbije sa komandantom Kfora razgovarao o bezbednosnoj situaciji na Kosovu"
    },
    "domain": "kossev.info",
    "url": "https://kossev.info/nacelnik-generalstaba-vojske-srbije-sa-komandantom-kfora-razgovarao-o-bezbednosnoj-situaciji-na-kosovu/",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "almonitor-saudi-intercepts",
    "title": {
      "ru": "Коалиция Саудовской Аравии перехватила ракеты в сторону Эр-Рияда и дроны",
      "en": "Saudi-led coalition intercepts missiles towards Riyadh, drones in Eastern Province"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/11/saudi-led-coalition-intercepts-missiles-towards-riyadh-drones-eastern-province",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-saudi-intercepts",
    "title": {
      "ru": "Коалиция перехватила ракеты и дроны хуситов у Эр-Рияда",
      "en": "Saudi-led coalition intercepts suspected Houthi missiles and drones"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/11/15/saudi-led-coalition-intercepts-two-missiles-two-drones-in-riyadh?traffic_source=rss",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "mee-coalition-drone",
    "title": {
      "ru": "Силы коалиции перехватили очередной дрон над Восточной провинцией Саудовской Аравии",
      "en": "Coalition forces intercept another drone over Saudi Arabia's Eastern Region"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/coalition-forces-intercept-another-drone-over-saudi-arabias-eastern",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "almonitor-trump-hold-attacks",
    "title": {
      "ru": "Трамп сказал советникам, что может воздержаться от ударов по Ирану",
      "en": "Trump tells advisers he may hold off on Iran attacks barring new provocations, sources say"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/11/trump-tells-advisers-he-may-hold-iran-attacks-barring-new-provocations-sources",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "jpost-no-urgent-strike",
    "title": {
      "ru": "Оборонное ведомство Израиля не видит срочной необходимости бить по Ирану",
      "en": "Israel's defense establishment sees no urgent need to strike Iran until new gov't formed - report"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/israel-news/defense-news/article-914897",
    "publication_date": "2026-11-15",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "japantimes-pentagon-reversal",
    "title": {
      "ru": "Разворот: Пентагон сократит войска в Европе меньше",
      "en": "In reversal, Pentagon eyes smaller troop cuts across Europe"
    },
    "domain": "japantimes.co.jp",
    "url": "https://www.japantimes.co.jp/news/2026/11/15/world/pentagon-troop-cuts-europe-reversal/",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-ceasefire-compliance",
    "title": {
      "ru": "17 стран осудили удар по больнице в Газе и призвали соблюдать перемирие",
      "en": "Türkiye, 17 other countries condemn Israeli strike on Gaza hospital, urge ceasefire compliance"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/turkiye/turkiye-17-other-countries-condemn-israeli-strike-on-gaza-hospital-urge-ceasefire-compliance/4125212",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "un-sc-hormuz",
    "title": {
      "ru": "Совет Безопасности: хрупкое спокойствие в Заливе под давлением угроз судоходству",
      "en": "Security Council LIVE: Fragile Gulf calm tested as threats to Hormuz shipping mount"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/11/1168804",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-kushner-contacts",
    "title": {
      "ru": "США намерены содействовать прямым контактам России и Европы по Украине",
      "en": "US aims to facilitate direct contacts between Russia and Europe on Ukraine — Kushner"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2218233",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "oilprice-singapore-gold",
    "title": {
      "ru": "Сингапур ставит $65 млрд на будущее золота",
      "en": "Singapore Makes a $65 Billion Bet on the Future of Gold"
    },
    "domain": "oilprice.com",
    "url": "https://oilprice.com/Metals/Gold/Singapore-Makes-a-65-Billion-Bet-on-the-Future-of-Gold.html",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "reportaz-germany-coal",
    "title": {
      "ru": "Германия рассматривает резервные угольные станции ради экономии газа",
      "en": "Germany eyes reserve coal plants to save gas this winter"
    },
    "domain": "report.az",
    "url": "https://report.az/en/other-countries/germany-eyes-reserve-coal-plants-to-save-gas-this-winter",
    "publication_date": "2026-11-14",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "guardian-bessent-base",
    "title": {
      "ru": "Глава Минфина США Бессент переехал на военную базу из-за угроз Ирана",
      "en": "US Treasury chief Scott Bessent is reportedly latest Trump official to move to military base"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/us-news/2026/nov/11/us-treasury-chief-scott-bessent-moves-military-base-iran-threats",
    "publication_date": "2026-11-11",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iranintl-organs-sale",
    "title": {
      "ru": "Иранцы на фоне нужды выставляют на продажу органы",
      "en": "Cash-strapped Iranians put multiple organs up for sale"
    },
    "domain": "iranintl.com",
    "url": "https://www.iranintl.com/en/202611130278",
    "publication_date": "2026-11-13",
    "accessed_date": "2026-11-15",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "azernews-nuclear-strike-warning",
    "title": {
      "ru": "Иран предупреждает: ядерный удар будет иметь последствия за пределами региона",
      "en": "Iran warns nuclear strike would have consequences beyond the region"
    },
    "domain": "azernews.az",
    "url": "https://www.azernews.az/region/266740.html",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "editorial-backfill"
  },
  {
    "id": "newsaz-nuclear-weapons-response",
    "title": {
      "ru": "Иран заявил, что примет необходимые меры в случае ядерного удара",
      "en": "Iran warns it would take necessary measures if targeted with nuclear weapons"
    },
    "domain": "news.az",
    "url": "https://news.az/news/iran-warns-it-would-take-necessary-measures-if-targeted-with-nuclear-weapons",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "editorial-backfill"
  },
  {
    "id": "nournews-us-threats-nuclear-facilities",
    "title": {
      "ru": "Угрозы США по ядерным объектам Ирана говорят об отчаянии Вашингтона — глава ОАЭИ",
      "en": "US threats against Iran’s nuclear facilities reflect Washington’s growing desperation: AEOI chief"
    },
    "domain": "nournews.ir",
    "url": "https://nournews.ir/en/news/358643/us-threats-against-iran-nuclear-facilities-reflect-washington-growing-desperation-aeoi-chief",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "editorial-backfill"
  }
];
})();
