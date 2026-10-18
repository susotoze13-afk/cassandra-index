window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  // Редакционный сид недели 2026-10-18: три главных драйвера недели.
  // Источники — verbatim-записи из calc/input/2026-10-18.json (R55).
  s.drivers = [
  {
    "label": {
      "ru": "Ормузский пролив заминирован, война расширяется на Красное море",
      "en": "The Strait of Hormuz is mined and the war spreads to the Red Sea"
    },
    "observation": {
      "ru": "На минах в Ормузском проливе подорвались два супертанкера; у берегов Йемена обстрелян СПГ-танкер, а у ОАЭ снаряды попали в буксир. Саудовская коалиция перехватывала дроны над Эр-Риядом, ОАЭ согласовали с Эр-Риядом возвращение в йеменскую войну, Египет рассматривает отправку военной помощи Саудовской Аравии. Brent впервые с мая превысил $110.",
      "en": "Two supertankers hit mines in the Strait of Hormuz; an LNG tanker was fired upon off Yemen and projectiles hit a tugboat off the UAE. The Saudi-led coalition intercepted drones over Riyadh, the UAE agreed with Riyadh to re-enter the Yemen war, and Egypt is weighing military help for Saudi Arabia. Brent topped $110 for the first time since May."
    },
    "why": {
      "ru": "Несколько морских инцидентов и расширение фронта в один недельный интервал одновременно бьют по энергетике и по географии вовлечения.",
      "en": "Several maritime incidents and a widening front within one week hit energy markets and the geography of involvement at the same time."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "aljazeera-hormuz-tankers-mines",
        "title": {
          "ru": "Иран сообщает: два танкера загорелись после подрыва на минах в Ормузском проливе",
          "en": "Iran says two tankers catch fire after hitting mines in Strait of Hormuz"
        },
        "domain": "aljazeera.com",
        "url": "https://www.aljazeera.com/news/2026/10/18/iran-says-two-tankers-catch-fire-after-hitting-mines-in-strait-of-hormuz",
        "publication_date": "2026-10-18",
        "accessed_date": "2026-10-18",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "qatar-tribune-hormuz-tanker-mine-2026-10-17",
        "title": {
          "ru": "Второй нефтяной танкер горит в Ормузском проливе после подрыва на морской мине",
          "en": "Second oil tanker burns in Strait of Hormuz after hitting naval mine"
        },
        "domain": "qatar-tribune.com",
        "url": "https://www.qatar-tribune.com/article/259630/front/second-oil-tanker-burns-in-strait-of-hormuz-after-hitting-naval-mine",
        "publication_date": "2026-10-17",
        "accessed_date": "2026-10-18",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "aa-lng-tanker-attacked-yemen",
        "title": {
          "ru": "Малый катер открыл огонь по СПГ-танкеру у берегов Йемена — морское агентство Британии",
          "en": "Small boat approaches, opens fire on LNG tanker off Yemen's coast, UK maritime agency says"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/middle-east/small-boat-approaches-opens-fire-on-lng-tanker-off-yemen-s-coast-uk-maritime-agency-says/4092086",
        "publication_date": "2026-10-17",
        "accessed_date": "2026-10-18",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "guardian-uae-yemen-reentry",
        "title": {
          "ru": "ОАЭ договорились с Саудовской Аравией о возвращении в конфликт в Йемене",
          "en": "UAE agrees with Saudi Arabia to re-enter Yemen conflict amid Houthi gains"
        },
        "domain": "theguardian.com",
        "url": "https://www.theguardian.com/world/2026/oct/17/uae-yemen-conflict-agreement-saudi-arabia-houthi-gains",
        "publication_date": "2026-10-17",
        "accessed_date": "2026-10-18",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  },
  {
    "label": {
      "ru": "ЕС ввёл крупнейший пакет санкций, НАТО начала ядерные учения",
      "en": "The EU adopted its largest sanctions package as NATO began nuclear drills"
    },
    "observation": {
      "ru": "12.10 ЕС принял крупнейший пакет санкций против России — 1 569 записей в военном чёрном списке; США ввели ограничения против связанных с Ираном банков и нефтяных сетей. 13.10 в Италии стартовали ядерные учения НАТО Steadfast Noon, КНДР провела пуск стратегических крылатых ракет с подлодки, а российская атомная подлодка — ракетные стрельбы.",
      "en": "On 12 Oct the EU adopted its largest sanctions package against Russia, adding 1,569 entries to the military blacklist; the US targeted Iran-linked banks and oil networks. On 13 Oct NATO began its Steadfast Noon nuclear exercise in Italy, North Korea test-fired strategic cruise missiles from a submarine, and a Russian nuclear submarine ran missile drills."
    },
    "why": {
      "ru": "Санкционное давление и одновременные ядерные учения и пуски повышают риск неверного прочтения сигналов при отсутствии работающих каналов деэскалации.",
      "en": "Sanctions pressure and simultaneous nuclear exercises and test launches raise the risk of misreading signals while de-escalation channels remain weak."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "brusselstimes-eu-sanctions-1569-2026-10-12",
        "title": {
          "ru": "Крупнейший пакет санкций ЕС: 1 569 записей в военном чёрном списке России",
          "en": "Largest EU sanctions package yet adds 1,569 to Russia military blacklist"
        },
        "domain": "brusselstimes.com",
        "url": "https://www.brusselstimes.com/2357495/largest-eu-sanctions-package-yet-adds-1569-to-russia-military-blacklist",
        "publication_date": "2026-10-12",
        "accessed_date": "2026-10-18",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "safety4sea-eu-sanctions-russia-2026-10-13",
        "title": {
          "ru": "ЕС принял крупнейший в истории пакет санкций против России",
          "en": "EU adopts largest-ever sanctions package targeting Russia"
        },
        "domain": "safety4sea.com",
        "url": "https://safety4sea.com/eu-adopts-largest-ever-sanctions-package-targeting-russia/",
        "publication_date": "2026-10-13",
        "accessed_date": "2026-10-18",
        "source_type": "secondary",
        "cluster_id": "F-financial",
        "state_affiliated": false
      },
      {
        "id": "forcesnews-steadfast-noon-italy-2026-10-13",
        "title": {
          "ru": "Единство и решимость: ядерные учения НАТО Steadfast Noon начались в Италии",
          "en": "Unity and resolve: NATO's nuclear exercise Steadfast Noon begins in Italy"
        },
        "domain": "forcesnews.com",
        "url": "https://www.forcesnews.com/nato/unity-and-resolve-natos-nuclear-exercise-steadfast-noon-begins-italy",
        "publication_date": "2026-10-13",
        "accessed_date": "2026-10-18",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "channelnewsasia-nk-slcms-2026-10-14",
        "title": {
          "ru": "КНДР испытала два типа стратегических крылатых ракет подводного базирования",
          "en": "North Korea test-fires two types of submarine-launched strategic cruise missiles"
        },
        "domain": "channelnewsasia.com",
        "url": "https://www.channelnewsasia.com/east-asia/north-korea-tests-submarine-launched-strategic-cruise-missiles-6460706",
        "publication_date": "2026-10-14",
        "accessed_date": "2026-10-18",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  },
  {
    "label": {
      "ru": "Санкционный маятник: США отсрочили ограничения, дроны ударили по тылу РФ",
      "en": "Sanctions pendulum: the US deferred restrictions as drones struck Russia’s rear"
    },
    "observation": {
      "ru": "Трамп подписал указ об отсрочке новых санкций против России, вызвав критику в Конгрессе; США и Индия завершили первую фазу торгового соглашения. В ночь на 18.10 рой украинских дронов атаковал Санкт-Петербург и Ленинградскую область — одну из крупнейших атак за четыре года: поражены ЦОД VK и нефтетерминал, нарушена работа Пулково.",
      "en": "Trump signed an order deferring new sanctions on Russia, drawing criticism in Congress, while the US and India finalised the first phase of a trade deal. Overnight on 18 Oct a Ukrainian drone swarm struck St Petersburg and the Leningrad Region in one of the largest attacks in four years, hitting a VK data centre and an oil terminal and disrupting Pulkovo airport."
    },
    "why": {
      "ru": "Ослабление санкционного трека соседствует с глубокими ударами по инфраструктуре — смешанный сигнал, который снижает предсказуемость эскалации.",
      "en": "A weaker sanctions track coexists with deep strikes on infrastructure — a mixed signal that reduces the predictability of escalation."
    },
    "contribution": "high",
    "confidence": "medium",
    "sources": [
      {
        "id": "cnn-trump-waives-russia-sanctions-2026-10-16",
        "title": {
          "ru": "Трамп отсрочил санкции против России до их вступления в силу, вызвав критику",
          "en": "Trump waives Russia-related sanctions before they kick in, prompting backlash"
        },
        "domain": "cnn.com",
        "url": "https://www.cnn.com/2026/10/16/europe/us-ukraine-russia-sanctions-intl-hnk",
        "publication_date": "2026-10-16",
        "accessed_date": "2026-10-18",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "firstpost-india-us-trade-deal-2026-10-15",
        "title": {
          "ru": "Сделка Индии и США: первая фаза завершена, идёт юридическая проработка",
          "en": "India-US trade deal: First phase finalised, legal drafting underway"
        },
        "domain": "firstpost.com",
        "url": "https://www.firstpost.com/business/findia-us-trade-deal-first-phase-finalised-legal-drafting-underway-14053110.html",
        "publication_date": "2026-10-15",
        "accessed_date": "2026-10-18",
        "source_type": "secondary",
        "cluster_id": "F-financial",
        "state_affiliated": false
      },
      {
        "id": "tass-leningrad-largest-drone-attack",
        "title": {
          "ru": "Атака дронов на Ленинградскую область — одна из крупнейших за четыре года",
          "en": "Drone attack on Leningrad Region one of largest in four years"
        },
        "domain": "tass.com",
        "url": "https://tass.com/emergencies/2203667",
        "publication_date": "2026-10-18",
        "accessed_date": "2026-10-18",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "aljazeera-st-petersburg-drone-swarm",
        "title": {
          "ru": "Санкт-Петербург под атакой роя украинских дронов",
          "en": "St Petersburg under attack from Ukrainian drone swarm"
        },
        "domain": "aljazeera.com",
        "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/st-petersburg-under-attack-from-ukrainian-drone-swarm",
        "publication_date": "2026-10-18",
        "accessed_date": "2026-10-18",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      }
    ]
  }
];
})();
