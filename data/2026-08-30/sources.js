window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.sources = [
  {
    "id": "isw-roc-assessment-2026-08-25",
    "title": {
      "ru": "ISW: оценка российского наступления, 25 августа 2026",
      "en": "ISW Russian Offensive Campaign Assessment, August 25, 2026"
    },
    "domain": "understandingwar.org",
    "url": "https://understandingwar.org/research/russia-ukraine/russian-offensive-campaign-assessment-august-25-2026/",
    "publication_date": "2026-08-25",
    "accessed_date": "2026-09-26",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "militarnyi-iskander-launcher-2026-08-27",
    "title": {
      "ru": "Зеленский: ВСУ поразили российскую пусковую установку Искандер-М",
      "en": "Zelensky: Ukraine strikes Russian Iskander launcher"
    },
    "domain": "militarnyi.com",
    "url": "https://militarnyi.com/en/news/zelensky-ukraine-strikes-russian-iskander-launcher/",
    "publication_date": "2026-08-27",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "kyivindependent-13-air-raid-alerts-2026-08-28",
    "title": {
      "ru": "Киев зафиксировал 13 воздушных тревог за день — рекорд с начала полномасштабного вторжения",
      "en": "Kyiv records 13 air raid alerts in a single day, most since full-scale invasion began"
    },
    "domain": "kyivindependent.com",
    "url": "https://kyivindependent.com/kyiv-records-13-air-raid-alerts-in-single-day-most-since-full-scale-invasion-as-explosions-continue-overnight/",
    "publication_date": "2026-08-28",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "kyivindependent-belgorod-strike-2026-08-30",
    "title": {
      "ru": "Ракетный удар по Белгороду: повреждены склад Ozon и тепловая электростанция",
      "en": "Missile strike hits Belgorod, reportedly damaging Ozon facility and power plant"
    },
    "domain": "kyivindependent.com",
    "url": "https://kyivindependent.com/missile-strike-reportedly-hits-belgorod-damaging-ozon-facility-and-power-plant/",
    "publication_date": "2026-08-30",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "bbc-myla-depot-strike-2026-08-29",
    "title": {
      "ru": "Не менее 37 погибших и сотни эвакуированных после удара по складу оружия под Киевом",
      "en": "At least 37 dead and hundreds evacuated after strike on Kyiv weapons depot"
    },
    "domain": "bbc.com",
    "url": "https://www.bbc.com/news/articles/c86xwqez4npo",
    "publication_date": "2026-08-29",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-yars-plesetsk-launch-2026-08-28",
    "title": {
      "ru": "Россия провела пуск мобильной межконтинентальной баллистической ракеты с космодрома Плесецк",
      "en": "Russia says it launched mobile ICBM from Plesetsk Cosmodrome"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/eurasia/russia-says-it-launched-mobile-icbm-from-plesetsk-cosmodrome/4040451",
    "publication_date": "2026-08-28",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "russianforces-yars-launch-2026-08-28",
    "title": {
      "ru": "Пуск мобильной ракеты «Ярс» с Плесецка",
      "en": "Launch of mobile Yars missile from Plesetsk"
    },
    "domain": "russianforces.org",
    "url": "https://russianforces.org/blog/2026/08/launch_of_mobile_yars_missile_.shtml",
    "publication_date": "2026-08-28",
    "accessed_date": "2026-09-26",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "democracynow-headlines-2026-08-27",
    "title": {
      "ru": "Заголовки 27 августа 2026: Украина и Россия обмениваются ударами, Москва предупреждает Великобританию",
      "en": "Headlines August 27, 2026: Ukraine and Russia trade attacks as Moscow warns the UK"
    },
    "domain": "democracynow.org",
    "url": "https://www.democracynow.org/2026/8/27/headlines",
    "publication_date": "2026-08-27",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-europe-live-2026-08-24",
    "title": {
      "ru": "Бёрнем: Великобритания с Украиной «до конца» несмотря на «возмутительные угрозы» России — онлайн",
      "en": "Burnham says UK with Ukraine 'all the way' despite 'outrageous threats' from Russia – Europe live"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/live/2026/aug/24/europe-ukraine-russia-war-kyiv-andy-burnham-volodymyr-zelenskyy-latest-news-updates",
    "publication_date": "2026-08-24",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "reuters-talks-possible-september-2026-08-27",
    "title": {
      "ru": "Советник Зеленского: переговоры Украина–Россия возможны в сентябре",
      "en": "Zelenskiy's top aide says Ukraine-Russia talks may be possible in September"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/world/europe/zelenskiys-top-aide-says-ukraine-russia-talks-may-be-possible-september-2026-08-27/",
    "publication_date": "2026-08-27",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "united24-record-air-raid-alerts-2026-08-28",
    "title": {
      "ru": "Рекордные 13 воздушных тревог в Киеве — ответ России на визит директора ЦРУ",
      "en": "Kyiv faces record 13 air raid alerts — Russia's answer to CIA director's Moscow visit"
    },
    "domain": "united24media.com",
    "url": "https://united24media.com/war-in-ukraine/kyiv-faces-record-13-air-raid-alerts-russias-answer-to-cia-directors-moscow-visit-22024",
    "publication_date": "2026-08-28",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "ecovis-sanctions-regulation-august-2026",
    "title": {
      "ru": "RegRally Insights: санкционное регулирование, август 2026",
      "en": "RegRally Insights: Sanctions Regulation, August 2026"
    },
    "domain": "ecovis.lt",
    "url": "https://ecovis.lt/regrally-insights-sanctions-regulation-august-2026/",
    "publication_date": "2026-08-27",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "lemonde-black-sea-blockade-2026-08-28",
    "title": {
      "ru": "Блокада черноморских портов душит экспорт зерна Украины",
      "en": "Ukraine's Black Sea port blockade strangles grain exports"
    },
    "domain": "lemonde.fr",
    "url": "https://www.lemonde.fr/en/international/article/2026/08/28/ukraine-s-black-sea-port-blockade-strangles-grain-exports_6756947_4.html",
    "publication_date": "2026-08-28",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "france24-black-sea-farmers-2026-08-24",
    "title": {
      "ru": "Что возобновленная блокада Черного моря означает для фермеров Украины",
      "en": "What the renewed Black Sea blockade means for Ukraine's farmers"
    },
    "domain": "france24.com",
    "url": "https://www.france24.com/en/europe/20260824-what-renewed-black-sea-blockade-means-ukraine-farmers",
    "publication_date": "2026-08-24",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "world-grain-black-sea-exports-2026-08-25",
    "title": {
      "ru": "Эскалация войны останавливает экспорт зерна через Черное море",
      "en": "Escalating war stalling Black Sea grain exports"
    },
    "domain": "world-grain.com",
    "url": "https://www.world-grain.com/articles/23138-escalating-war-stalling-black-sea-grain-exports",
    "publication_date": "2026-08-25",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "uani-iran-shipping-update-2026-08-28",
    "title": {
      "ru": "UANI: обновление по судоходству Ирана, 28 августа 2026",
      "en": "UANI Iran Shipping Update – August 28, 2026"
    },
    "domain": "unitedagainstnucleariran.com",
    "url": "https://www.unitedagainstnucleariran.com/analysis/iran-shipping-update-august-28-2026",
    "publication_date": "2026-08-28",
    "accessed_date": "2026-09-26",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "aa-eu-defense-aid-2026-08-24",
    "title": {
      "ru": "ЕС одобрил $7,1 млрд новой военной помощи Украине",
      "en": "EU approves $7.1B in new defense aid for Ukraine"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/europe/eu-approves-71b-in-new-defense-aid-for-ukraine/4035762",
    "publication_date": "2026-08-24",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "akm-bspb-market-monitoring-2026-08-24",
    "title": {
      "ru": "Банк Санкт-Петербурга: мониторинг рынка, 24 августа 2026",
      "en": "BSPB: Market monitoring, August 24, 2026"
    },
    "domain": "akm.ru",
    "url": "https://www.akm.ru/eng/comments/bspb-market-monitoring-august-24-2026/",
    "publication_date": "2026-08-24",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "aa-myla-strike-37-killed-2026-08-29",
    "title": {
      "ru": "37 погибших и более 40 раненых при ударе дрона по складу под Киевом, сообщает Украина",
      "en": "37 killed, over 40 injured in Russian drone strike on warehouse near Kyiv, says Ukraine"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/russia-ukraine-war/37-killed-over-40-injured-in-russian-drone-strike-on-warehouse-near-kyiv-says-ukraine/4040922",
    "publication_date": "2026-08-29",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "reuters-satellite-border-analysis-2026-08-27",
    "title": {
      "ru": "Reuters: спутниковый анализ пограничных перемещений и столкновений",
      "en": "Reuters: satellite analysis of border movements and clashes"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/world/satellite-border-analysis",
    "publication_date": "2026-08-27",
    "accessed_date": "2026-09-26",
    "source_type": "OSINT",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "apnews-border-clashes-monitoring-2026-08-28",
    "title": {
      "ru": "AP: мониторинг пограничных столкновений",
      "en": "AP: border clashes monitoring"
    },
    "domain": "apnews.com",
    "url": "https://apnews.com/article/border-clashes-monitoring",
    "publication_date": "2026-08-28",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "dw-large-scale-drills-2026-08-29",
    "title": {
      "ru": "DW: учения необычного масштаба вблизи границы",
      "en": "DW: large-scale drills near the border"
    },
    "domain": "dw.com",
    "url": "https://www.dw.com/en/large-scale-drills/a-700001",
    "publication_date": "2026-08-29",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "crisisgroup-crisiswatch-air-defence-2026-08-28",
    "title": {
      "ru": "CrisisWatch: обзор эскалации вокруг ПВО",
      "en": "CrisisWatch: air defence escalation overview"
    },
    "domain": "crisisgroup.org",
    "url": "https://www.crisisgroup.org/crisiswatch/air-defence",
    "publication_date": "2026-08-28",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-zelensky-1000-drones",
    "title": {
      "ru": "Зеленский планирует наносить по России удары «1000 дронов в день»",
      "en": "Ukraine's Zelenskyy plans to hit Russia with '1,000 drones' a day"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/8/28/ukraines-zelenskyy-plans-to-hit-russia-with-1000-drones-a-day",
    "publication_date": "2026-08-28",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "cnn-kyiv-ammo-warehouse-38",
    "title": {
      "ru": "Атака РФ на склад боеприпасов в Украине вызвала серию взрывов, погибли 38 человек",
      "en": "Russian attack on Ukrainian ammunition warehouse triggers waves of blasts, killing 38"
    },
    "domain": "cnn.com",
    "url": "https://www.cnn.com/2026/08/29/europe/ukraine-kyiv-russia-war-attack-intl",
    "publication_date": "2026-08-29",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "nationpk-sudan-rsf-convoy-0824",
    "title": {
      "ru": "Армия Судана уничтожила 49 машин RSF, 70 бойцов захвачены",
      "en": "Sudan's army-aligned force says 49 RSF vehicles destroyed, 70 fighters captured"
    },
    "domain": "nation.com.pk",
    "url": "https://www.nation.com.pk/24-Aug-2026/sudan-s-army-aligned-force-says-49-rsf-vehicles-destroyed-70-fighters-captured",
    "publication_date": "2026-08-24",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "criticalthreats-congo-review-0828",
    "title": {
      "ru": "Обзор войны в Конго: RSF/СПЛМ/ИССП (28 августа 2026)",
      "en": "Congo War Security Review, August 28, 2026"
    },
    "domain": "criticalthreats.org",
    "url": "https://www.criticalthreats.org/briefs/congo-war-security-review/august-28-2026",
    "publication_date": "2026-08-28",
    "accessed_date": "2026-10-12",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "wapo-sudan-un-sanctions-0824",
    "title": {
      "ru": "США призывают ввести новые санкции ООН по Судану",
      "en": "US urges new UN sanctions to spur rivals in Sudan to negotiate an end to war"
    },
    "domain": "washingtonpost.com",
    "url": "https://www.washingtonpost.com/world/2026/08/24/sudan-military-rsf-united-nations-sanctions-conflict/7659c8a8-a00d-11f1-8606-1d40ad00172e_story.html",
    "publication_date": "2026-08-24",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "wapo-rohingya-rally-0825",
    "title": {
      "ru": "Беженцы-рохинджа в лагерях Бангладеш требуют безопасного возвращения в Мьянму",
      "en": "Rohingya refugees rally in Bangladesh camps to demand safe return to Myanmar"
    },
    "domain": "washingtonpost.com",
    "url": "https://www.washingtonpost.com/world/2026/08/25/bangladesh-rohingya-myanmar-refugees-coxs-bazar-anniversary/8079f94e-a08e-11f1-8606-1d40ad00172e_story.html",
    "publication_date": "2026-08-25",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  }
];
})();
