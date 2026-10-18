window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.global = {
  "index": 63,
  "delta": 7
};
  s.published = "2026-10-18";
  s.through = "2026-10-18";
  s.methodology = "3.0";
  s.regions_taxonomy = "2.0";
  s.dataState = "published";
  s.q = 0.8622;
  s.nullWeight = 0.1378;
  s.coverage = {
  "coveredDrivers": 7,
  "totalDrivers": 9
};
  s.confidence = "full";
  s.sensitivity = 0;
  s.coverageCriteria = {
  "covered": 27,
  "total": 46
};
  s.recalc = {
  "at": "2026-10-18T12:45:49.483Z",
  "reason": "Еженедельный пересчёт",
  "previous": 64,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
  s.regions = {
  "russia-belarus": {
    "index": 56,
    "delta": 0,
    "status": "danger",
    "background": false
  },
  "ukraine-moldova": {
    "index": 57,
    "delta": 1,
    "status": "danger",
    "background": false
  },
  "baltic": {
    "index": 59,
    "delta": 3,
    "status": "danger",
    "background": false
  },
  "balkans": {
    "index": 61,
    "delta": 5,
    "status": "very",
    "background": false
  },
  "eu-north-europe": {
    "index": 59,
    "delta": 3,
    "status": "danger",
    "background": false
  },
  "south-caucasus": {
    "index": 61,
    "delta": 5,
    "status": "very",
    "background": false
  },
  "central-asia": {
    "index": 61,
    "delta": 5,
    "status": "very",
    "background": false
  },
  "east-asia": {
    "index": 61,
    "delta": -1,
    "status": "very",
    "background": false
  },
  "middle-east": {
    "index": 71,
    "delta": 4,
    "status": "very",
    "background": false
  },
  "north-america": {
    "index": 61,
    "delta": 9,
    "status": "very",
    "background": false
  },
  "south-asia": {
    "index": 59,
    "delta": 5,
    "status": "danger",
    "background": false
  },
  "africa": {
    "index": 61,
    "delta": 8,
    "status": "very",
    "background": false
  }
};
  s.regions["russia-belarus"] = {
  "index": 56,
  "delta": 0,
  "status": "danger",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Рой украинских дронов атаковал Санкт-Петербург и Ленинградскую область — одну из крупнейших атак за четыре года: поражены ЦОД VK и нефтетерминал, нарушена работа аэропорта Пулково и ПВО.",
        "en": "A Ukrainian drone swarm struck St Petersburg and the Leningrad Region in one of the largest attacks in four years, hitting a VK data centre and an oil terminal and disrupting Pulkovo airport and air defences."
      },
      "why": {
        "ru": "Удар по тыловой инфраструктуре и энергетике углубляет вовлечённость РФ и повышает региональный риск.",
        "en": "The strike on rear-area infrastructure and energy deepens Russian involvement and raises regional risk."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
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
        },
        {
          "id": "eadaily-st-petersburg-oil-terminal-2026-10-18",
          "title": {
            "ru": "Нефтетерминал в Санкт-Петербурге загорелся после дроновой атаки",
            "en": "The oil terminal caught fire in St. Petersburg after the drone attack"
          },
          "domain": "eadaily.com",
          "url": "https://eadaily.com/en/news/2026/10/18/the-oil-terminal-caught-fire-in-st-petersburg-after-the-drone-attack",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "ЕС ввёл крупнейший пакет санкций против РФ, США отсрочили вступление новых ограничений указом Трампа, а Москва назвала «короткий путь к ядерному нулю» контрпродуктивным.",
        "en": "The EU adopted its largest sanctions package on Russia, the US deferred new restrictions by a Trump order, and Moscow called a “shortcut to nuclear zero” counterproductive."
      },
      "why": {
        "ru": "Разнонаправленный санкционный и доктринальный фон повышает неопределённость расчётов для региона.",
        "en": "A mixed sanctions and doctrinal backdrop raises uncertainty in regional calculations."
      },
      "contribution": "medium",
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
          "id": "tass-nuclear-zero-postnikov-2026-10-17",
          "title": {
            "ru": "Россия считает идею «короткого пути к ядерному нулю» контрпродуктивной — дипломат Постников",
            "en": "Russia views idea of shortcut to 'nuclear zero' as counterproductive — diplomat Postnikov"
          },
          "domain": "tass.com",
          "url": "https://tass.com/politics/2203555",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "primary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.regions["ukraine-moldova"] = {
  "index": 57,
  "delta": 1,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Глубокий удар украинских дронов по Санкт-Петербургу и Ленинградской области сопровождался ударами по расчётам дронов ВСУ под Добропольем; война продолжается без признаков оперативной паузы.",
        "en": "A deep Ukrainian drone strike on St Petersburg and the Leningrad Region was accompanied by Russian strikes on Ukrainian drone crews near Dobropolye; the war continues without an operational pause."
      },
      "why": {
        "ru": "Обмен ударами по тылу и фронту удерживает высокую интенсивность войны и риск эскалации вдоль всей линии.",
        "en": "Mutual strikes on rear and front sustain high war intensity and escalation risk along the entire line."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
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
        },
        {
          "id": "tass-dobropolye-drone-crews",
          "title": {
            "ru": "Удары России уничтожили половину из почти 500 украинских расчётов дронов под Добропольем",
            "en": "Russian strikes destroy half of nearly 500 Ukrainian drone crews near Dobropolye"
          },
          "domain": "tass.com",
          "url": "https://tass.com/defense/2203653",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "МАГАТЭ опубликовало очередное обновление о ситуации на украинских АЭС, а у Запорожской АЭС сохраняется активность беспилотников несмотря на перемирие.",
        "en": "The IAEA published another update on the situation at Ukrainian nuclear plants, and drone activity persists near the Zaporizhzhia NPP despite a ceasefire."
      },
      "why": {
        "ru": "Ядерная безопасность на линии фронта остаётся источником трансграничного риска, даже когда боевые действия локальны.",
        "en": "Nuclear safety on the front line remains a source of cross-border risk even when fighting is local."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "iaea-update-371-ukraine",
          "title": {
            "ru": "Обновление 371 — заявление генерального директора МАГАТЭ о ситуации в Украине",
            "en": "Update 371 - IAEA Director General Statement on Situation in Ukraine"
          },
          "domain": "iaea.org",
          "url": "https://www.iaea.org/newscenter/pressreleases/update-371-iaea-director-general-statement-on-situation-in-ukraine",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "tass-zaporizhzhia-npp-drone-ceasefire",
          "title": {
            "ru": "Активность украинских беспилотников у Запорожской АЭС и Энергодара сохраняется несмотря на перемирие",
            "en": "Ukrainian drone activity near Zaporozhye NPP, Energodar persists despite ceasefire"
          },
          "domain": "tass.com",
          "url": "https://tass.com/economy/2203639",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.regions["baltic"] = {
  "index": 59,
  "delta": 3,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Рой украинских дронов атаковал Санкт-Петербург и Ленинградскую область, поразив ЦОД VK и нефтетерминал; для стран Балтии это сигнал о досягаемости тыловой инфраструктуры региона.",
        "en": "A Ukrainian drone swarm struck St Petersburg and the Leningrad Region, hitting a VK data centre and an oil terminal; for the Baltic states this signals the reachability of rear infrastructure in the region."
      },
      "why": {
        "ru": "Географическая близость ударов к Балтике повышает риск побочных инцидентов и ошибок в оценке воздушной обстановки.",
        "en": "The proximity of the strikes to the Baltic raises the risk of incidental incidents and air-picture misjudgements."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
    },
    {
      "observation": {
        "ru": "ЕС ввёл крупнейший пакет санкций против России, одновременно Brent превысил $110 из-за рисков Ормуза.",
        "en": "The EU adopted its largest sanctions package on Russia as Brent topped $110 on Hormuz risks."
      },
      "why": {
        "ru": "Санкции и энергетический шок вместе усиливают экономическое давление на прибалтийские экономики.",
        "en": "Sanctions and the energy shock together increase economic pressure on the Baltic economies."
      },
      "contribution": "medium",
      "confidence": "medium",
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
          "id": "cnbctv18-brent-110-explained-2026-10-16",
          "title": {
            "ru": "Объяснение: почему Brent впервые превысил $110",
            "en": "Explained: What led to Brent crude prices crossing $110 for the first time"
          },
          "domain": "cnbctv18.com",
          "url": "https://www.cnbctv18.com/market/commodities/crude-oil-prices-brent-wti-why-are-rates-rising-explained-saudi-houthis-hormuz-iran-us-russia-ukraine-20013997.htm",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["balkans"] = {
  "index": 61,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "ЕС принял крупнейший пакет санкций против России, добавив 1 569 записей в военный чёрный список; США ввели новый раунд санкций против связанных с Ираном сетей.",
        "en": "The EU adopted its largest sanctions package on Russia, adding 1,569 entries to the military blacklist, while the US imposed a new round of sanctions on Iran-linked networks."
      },
      "why": {
        "ru": "Ужесточение санкционного режима повышает чувствительность балканских экономик к внешним ограничениям.",
        "en": "A tighter sanctions regime increases the sensitivity of Balkan economies to external restrictions."
      },
      "contribution": "medium",
      "confidence": "medium",
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Нефтяной шок: Brent впервые с мая превысил $110, US crude — выше $100 на фоне рисков Ормузского пролива, Саудовской Аравии и России.",
        "en": "Oil shock: Brent topped $110 for the first time since May and US crude rose above $100 amid Hormuz, Saudi and Russia risks."
      },
      "why": {
        "ru": "Рост цен на энергоносители ухудшает внешнеторговый баланс и повышает социальную напряжённость в регионе.",
        "en": "Higher energy prices worsen the trade balance and raise social tension in the region."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "cnbctv18-brent-110-explained-2026-10-16",
          "title": {
            "ru": "Объяснение: почему Brent впервые превысил $110",
            "en": "Explained: What led to Brent crude prices crossing $110 for the first time"
          },
          "domain": "cnbctv18.com",
          "url": "https://www.cnbctv18.com/market/commodities/crude-oil-prices-brent-wti-why-are-rates-rising-explained-saudi-houthis-hormuz-iran-us-russia-ukraine-20013997.htm",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        },
        {
          "id": "discoveryalert-brent-110-2026-10-17",
          "title": {
            "ru": "Нефть Brent достигла $110: риски Ормуза, Саудовской Аравии и России накапливаются",
            "en": "Brent Oil Price Hits $110 as Hormuz, Saudi and Russia Risks Stack Up"
          },
          "domain": "discoveryalert.com",
          "url": "https://discoveryalert.com/news/brent-oil-price-110-hormuz-saudi-russia-october-2026/",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["eu-north-europe"] = {
  "index": 59,
  "delta": 3,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "В Италии стартовали ядерные учения НАТО Steadfast Noon, а российская атомная подлодка одновременно провела ракетные стрельбы — технические ядерные сигналы на обеих сторонах.",
        "en": "NATO’s Steadfast Noon nuclear exercise began in Italy while a Russian nuclear submarine ran missile drills — simultaneous technical nuclear signals on both sides."
      },
      "why": {
        "ru": "Публично подчёркнутые ядерные сигналы вблизи европейского театра поддерживают повышенный фон неверного прочтения намерений.",
        "en": "Publicly emphasised nuclear signals near the European theatre sustain a heightened risk of misreading intentions."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
          "id": "rt-english-russian-submarine-drill-2026-10-15",
          "title": {
            "ru": "Российская атомная подлодка отработала ракетные стрельбы",
            "en": "Russian nuclear submarine conducts missile firing drill"
          },
          "domain": "rt-english.com",
          "url": "https://rt-english.com/russia/647240-russian-submarine-fire-drill",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Израильские поселенцы напали на европейскую дипломатическую делегацию на Западном берегу — избит французский мэр; Париж и Брюссель требуют ареста нападавших.",
        "en": "Israeli settlers attacked a European diplomatic delegation in the West Bank, beating a French mayor; Paris and Brussels demand arrests."
      },
      "why": {
        "ru": "Прямое вовлечение европейских государств через нападение на дипмиссию усиливает региональную компоненту риска для Европы.",
        "en": "Direct European involvement through an attack on a diplomatic mission raises the Europe-related risk component."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "guardian-settlers-eu-diplomats",
          "title": {
            "ru": "Израильские поселенцы напали на европейских дипломатов на Западном берегу",
            "en": "Israeli settlers attack European diplomats in West Bank"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/oct/17/israeli-settlers-attack-european-diplomats-in-west-bank",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aljazeera-settlers-eu-diplomats-video",
          "title": {
            "ru": "Израильские поселенцы напали на европейских дипломатов на оккупированном Западном берегу",
            "en": "Israeli settlers attack European diplomats in the occupied West Bank"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/israeli-settlers-attack-european-diplomats-in-the-occupied-west-bank",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.regions["south-caucasus"] = {
  "index": 61,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Лавров готовится посетить Тегеран для переговоров с Арагчи, Иран представил «конкретное» предложение о разблокировке Ормузского пролива; Ливан подтвердил трёхсторонние переговоры с Израилем при содействии США.",
        "en": "Lavrov is set to visit Tehran for talks with Araghchi, Iran presented a “concrete” proposal to reopen the Strait of Hormuz, and Lebanon confirmed US-backed trilateral talks with Israel."
      },
      "why": {
        "ru": "Активизация дипломатии на южном направлении снижает часть рисков для Южного Кавказа, но переговоры пока не оформлены договорённостями.",
        "en": "Diplomatic activity to the south lowers some risks for the South Caucasus, but the talks are not yet codified in agreements."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "tehrantimes-lavrov-tehran-2026-10-17",
          "title": {
            "ru": "Лавров посетит Тегеран в понедельник для переговоров с Арагчи",
            "en": "Lavrov to visit Tehran on Monday for talks with Araghchi"
          },
          "domain": "tehrantimes.com",
          "url": "https://www.tehrantimes.com/news/531178/Lavrov-to-visit-Tehran-on-Monday-for-talks-with-Araghchi",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "trtworld-lebanon-israel-talks-2026-10-17",
          "title": {
            "ru": "Ливан примет участие в трёхсторонних переговорах с Израилем при поддержке США — Аун",
            "en": "Lebanon to take part in US-backed trilateral talks with Israel: Aoun"
          },
          "domain": "trtworld.com",
          "url": "https://www.trtworld.com/article/c2841d38185a",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "mee-araghchi-hormuz-proposal",
          "title": {
            "ru": "Арагчи: Иран представил «конкретное» предложение о разблокировке Ормузского пролива",
            "en": "Araghchi says Iran has presented 'concrete' Hormuz reopening proposal"
          },
          "domain": "middleeasteye.net",
          "url": "https://www.middleeasteye.net/live-blog/live-blog-update/araghchi-says-iran-has-presented-concrete-hormuz-reopening-proposal",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "США отсрочили новые санкции против России, а ЕС одновременно ввёл крупнейший пакет ограничений; санкционный режим вокруг ключевого торгового партнёра региона остаётся разнонаправленным.",
        "en": "The US deferred new sanctions on Russia while the EU adopted its largest package; the sanctions regime around the region’s key trading partner remains mixed."
      },
      "why": {
        "ru": "Несогласованность санкционной политики усложняет планирование транзита и торговли через Южный Кавказ.",
        "en": "Inconsistent sanctions policy complicates transit and trade planning through the South Caucasus."
      },
      "contribution": "medium",
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
        }
      ]
    }
  ]
};
  s.regions["central-asia"] = {
  "index": 61,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Китай требует от ЕС взаимности по экспортным лицензиям на редкозёмы, а армия США готовится к влиянию ограничений на критичные минералы с января.",
        "en": "China demands reciprocal EU cooperation on rare-earth export licences while the US Army braces for the impact of critical-mineral restrictions from January."
      },
      "why": {
        "ru": "Спрос на альтернативные поставки минералов повышает стратегическое значение Центральной Азии, но и риск вовлечения в торговые конфликты.",
        "en": "Demand for alternative mineral supplies raises Central Asia’s strategic value and the risk of being drawn into trade conflicts."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "businesstoday-my-china-rare-earth-eu-2026-10-15",
          "title": {
            "ru": "Китай требует взаимного сотрудничества ЕС по экспортным лицензиям на редкозёмы",
            "en": "China Seeks Reciprocal EU Cooperation On Rare Earth Export License"
          },
          "domain": "businesstoday.com.my",
          "url": "https://www.businesstoday.com.my/2026/10/15/china-seeks-reciprocal-eu-cooperation-on-rare-earth-export-license/",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        },
        {
          "id": "breakingdefense-critical-minerals-2026-10-15",
          "title": {
            "ru": "На фоне приближения срока по критичным минералам армия США ожидает «некоторого влияния»",
            "en": "As critical mineral deadline looms, Army expects to feel 'some impact'"
          },
          "domain": "breakingdefense.com",
          "url": "https://breakingdefense.com/2026/10/as-critical-mineral-deadline-looms-army-expects-to-feel-some-impact/",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "ЕС ввёл крупнейший пакет санкций против России, США отсрочили новые ограничения указом Трампа — санкционный фон вокруг ключевых транзитных партнёров региона остаётся нестабильным.",
        "en": "The EU adopted its largest sanctions package on Russia and the US deferred new restrictions by a Trump order — the sanctions backdrop around the region’s key transit partners remains unstable."
      },
      "why": {
        "ru": "Нестабильный санкционный режим затрудняет планирование торговых и транспортных коридоров через регион.",
        "en": "An unstable sanctions regime complicates planning of trade and transport corridors through the region."
      },
      "contribution": "medium",
      "confidence": "medium",
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
        }
      ]
    }
  ]
};
  s.regions["east-asia"] = {
  "index": 61,
  "delta": -1,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "КНДР провела первый за три года пуск стратегических крылатых ракет с подлодки; на этом же фоне российская атомная подлодка отработала ракетные стрельбы.",
        "en": "North Korea carried out its first submarine-launched strategic cruise missile test in three years, while a Russian nuclear submarine ran missile drills in the same week."
      },
      "why": {
        "ru": "Возобновление морских ядерных пусков в Азии повышает риск неверного прочтения в период одновременных учений НАТО.",
        "en": "Resumed sea-based nuclear testing in Asia raises the risk of misreading amid simultaneous NATO drills."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        },
        {
          "id": "rt-english-russian-submarine-drill-2026-10-15",
          "title": {
            "ru": "Российская атомная подлодка отработала ракетные стрельбы",
            "en": "Russian nuclear submarine conducts missile firing drill"
          },
          "domain": "rt-english.com",
          "url": "https://rt-english.com/russia/647240-russian-submarine-fire-drill",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Китай требует от ЕС взаимности по экспортным лицензиям на редкозёмы, а армия США ожидает влияния ограничений на критичные минералы с января; ЕС ищет новые торговые полномочия из-за дефицита с Китаем.",
        "en": "China demands reciprocal EU cooperation on rare-earth export licences, the US Army expects to feel the impact of critical-mineral restrictions from January, and the EU seeks new trade powers over its deficit with China."
      },
      "why": {
        "ru": "Ограничения на критичные минералы превращают торговый спор в фактор военно-промышленной уязвимости региона.",
        "en": "Critical-mineral restrictions turn a trade dispute into a factor of regional defence-industrial vulnerability."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "businesstoday-my-china-rare-earth-eu-2026-10-15",
          "title": {
            "ru": "Китай требует взаимного сотрудничества ЕС по экспортным лицензиям на редкозёмы",
            "en": "China Seeks Reciprocal EU Cooperation On Rare Earth Export License"
          },
          "domain": "businesstoday.com.my",
          "url": "https://www.businesstoday.com.my/2026/10/15/china-seeks-reciprocal-eu-cooperation-on-rare-earth-export-license/",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        },
        {
          "id": "breakingdefense-critical-minerals-2026-10-15",
          "title": {
            "ru": "На фоне приближения срока по критичным минералам армия США ожидает «некоторого влияния»",
            "en": "As critical mineral deadline looms, Army expects to feel 'some impact'"
          },
          "domain": "breakingdefense.com",
          "url": "https://breakingdefense.com/2026/10/as-critical-mineral-deadline-looms-army-expects-to-feel-some-impact/",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "theepochtimes-eu-china-trade-2026-10-16",
          "title": {
            "ru": "ЕС ищет новые торговые полномочия на фоне расширения дефицита с Китаем",
            "en": "EU Seeks New Trade Powers as Deficit With China Widens"
          },
          "domain": "theepochtimes.com",
          "url": "https://www.theepochtimes.com/world/eu-seeks-new-trade-powers-as-deficit-with-china-widens-6105278",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["middle-east"] = {
  "index": 71,
  "delta": 4,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Два супертанкера подорвались на минах в Ормузском проливе, у берегов Йемена обстрелян СПГ-танкер, у ОАЭ снаряды попали в буксир; Саудовская коалиция перехватывала дроны над Эр-Риядом на фоне трудностей с поставками дополнительных систем ПВО.",
        "en": "Two supertankers hit mines in the Strait of Hormuz, an LNG tanker was fired upon off Yemen and projectiles hit a tugboat off the UAE, while the Saudi-led coalition intercepted drones over Riyadh amid difficulties supplying more air-defence systems."
      },
      "why": {
        "ru": "Перекрытие Ормуза и удары по энергетической инфраструктуре Залива резко повышают региональный сигнал эскалации.",
        "en": "Hormuz disruption and strikes on Gulf energy infrastructure sharply raise the regional escalation signal."
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
          "id": "tass-air-defense-riyadh",
          "title": {
            "ru": "Европе сложно поставлять больше систем ПВО в Эр-Рияд — газета",
            "en": "Europe has difficulties with supplying more air defense systems to Riyadh — newspaper"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2203601",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Фронт в Йемене расширяется: ОАЭ согласовали возвращение в конфликт, Египет рассматривает военную помощь Саудовской Аравии, силы коалиции авиаударами пытаются снять осаду Таиза; хуситы освободили 159 задержанных под наблюдением МККК.",
        "en": "The Yemen front is widening: the UAE agreed to re-enter the conflict, Egypt is weighing military help for Saudi Arabia and coalition forces are trying to break the siege of Taiz with airstrikes, while the Houthis released 159 detainees under ICRC watch."
      },
      "why": {
        "ru": "Прямое вовлечение новых государств делает региональный конфликт более многослойным и труднее управляемым.",
        "en": "Direct involvement of additional states makes the regional conflict more layered and harder to manage."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
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
        },
        {
          "id": "almonitor-egypt-sisi-saudi-defence",
          "title": {
            "ru": "Сиси просит парламент одобрить помощь в защите Саудовской Аравии по запросу",
            "en": "Egypt's Sisi seeks parliament's backing to help defend Saudi Arabia if asked"
          },
          "domain": "al-monitor.com",
          "url": "https://www.al-monitor.com/originals/2026/10/egypts-sisi-seeks-parliaments-backing-help-defend-saudi-arabia-if-asked",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aljazeera-taiz-siege-airstrikes",
          "title": {
            "ru": "Силы во главе с Саудовской Аравией авиаударами пытаются снять осаду Таиза хуситами",
            "en": "Saudi-led forces try to break Houthi siege of Taiz with airstrikes"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/saudi-led-forces-try-to-break-houthi-siege-of-taiz-with-airstrikes",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aa-houthis-release-159-2026-10-17",
          "title": {
            "ru": "Хуситы Йемена освободили 159 задержанных в Сане — МККК",
            "en": "Yemen's Houthis release 159 detainees in Sanaa: ICRC"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/yemen-s-houthis-release-159-detainees-in-sanaa-icrc/4092084",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.regions["north-america"] = {
  "index": 61,
  "delta": 9,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Трамп публично исключил применение ядерного оружия против Ирана, сохранив удар по объекту Пик-Моунтин как опцию; Тегеран заявил, что не капитулирует.",
        "en": "Trump publicly ruled out using nuclear weapons against Iran while keeping a strike on Pickaxe Mountain as an option; Tehran said it will not surrender."
      },
      "why": {
        "ru": "Отход от ядерной риторики снижает один канал эскалации, но сохраняет неопределённость вокруг удара по ядерному объекту.",
        "en": "Stepping back from nuclear rhetoric lowers one escalation channel but leaves uncertainty around a strike on a nuclear site."
      },
      "contribution": "low",
      "confidence": "high",
      "sources": [
        {
          "id": "yahoo-trump-nuclear-bomb-iran-2026-10-16",
          "title": {
            "ru": "Трамп исключил применение ядерной бомбы против Ирана: почему это важно",
            "en": "Trump rules out using a nuclear bomb on Iran: Why that matters"
          },
          "domain": "yahoo.com",
          "url": "https://www.yahoo.com/news/politics/articles/trump-rules-using-nuclear-bomb-102112946.html",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "samaa-trump-nuclear-strike-2026-10-15",
          "title": {
            "ru": "Трамп исключил ядерный удар, Пезешкиан заявил, что Иран не сдастся",
            "en": "Trump rules out nuclear strike, Pezeshkian says Iran won't surrender"
          },
          "domain": "samaa.tv",
          "url": "https://www.samaa.tv/2087358549-trump-rules-out-nuclear-strike-pezeshkian-says-iran-won-t-surrender",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "arabtimesonline-trump-rules-out-nuclear-2026-10-16",
          "title": {
            "ru": "Трамп исключил применение ядерного оружия против Ирана, но удар по Pickaxe Mountain остаётся возможным",
            "en": "Trump Rules Out Nuclear Weapons Against Iran, But Pickaxe Mountain Strike Remains Possible"
          },
          "domain": "arabtimesonline.com",
          "url": "https://www.arabtimesonline.com/news/trump-rules-out-nuclear-weapons-against-iran-but-pickaxe-mountain-strike-remains-possible/",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Хегсет на AUSA анонсировал «поколенческие» оборонные инвестиции и автономность; Турция одновременно увеличила закупки вооружений на 229 % в бюджете 2027 года.",
        "en": "Hegseth used the AUSA stage to announce “generational” defence investment and autonomy, while Türkiye raised defence procurement by 229% in its 2027 budget."
      },
      "why": {
        "ru": "Рост оборонных бюджетов закрепляет долгосрочную ставку на военную готовность по обе стороны союзнических связей.",
        "en": "Rising defence budgets entrench a long-term bet on military readiness across allied relationships."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "breakingdefense-hegseth-ausa-2026-10-14",
          "title": {
            "ru": "Хегсет на AUSA продвигает автономность и «поколенческие» оборонные инвестиции",
            "en": "Hegseth uses AUSA spotlight to push autonomy, 'generational' defense investment"
          },
          "domain": "breakingdefense.com",
          "url": "https://breakingdefense.com/2026/10/hegseth-uses-ausa-spotlight-to-highlight-autonomy-generational-defense-investment/",
          "publication_date": "2026-10-14",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-turkiye-defense-229-2026-10-16",
          "title": {
            "ru": "Турция увеличила закупки вооружений на 229 % в 2027 году",
            "en": "Türkiye raises defense equipment procurement by 229% in 2027"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/turkiye/turkiye-raises-defense-equipment-procurement-by-229-in-2027/4091132",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.regions["south-asia"] = {
  "index": 59,
  "delta": 5,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "США и Индия завершили первую фазу торгового соглашения и начали юридическую проработку; Китай одновременно требует от ЕС взаимности по редкозёмам.",
        "en": "The US and India finalised the first phase of a trade deal and began legal drafting, while China demanded reciprocal EU cooperation on rare earths."
      },
      "why": {
        "ru": "Торговые договорённости меняют баланс экономических связей региона, но не снимают зависимость от внешних цепочек поставок.",
        "en": "Trade deals shift the region’s economic balance but do not remove dependence on external supply chains."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
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
          "id": "businesstoday-my-china-rare-earth-eu-2026-10-15",
          "title": {
            "ru": "Китай требует взаимного сотрудничества ЕС по экспортным лицензиям на редкозёмы",
            "en": "China Seeks Reciprocal EU Cooperation On Rare Earth Export License"
          },
          "domain": "businesstoday.com.my",
          "url": "https://www.businesstoday.com.my/2026/10/15/china-seeks-reciprocal-eu-cooperation-on-rare-earth-export-license/",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Brent впервые с мая превысил $110, US crude — выше $100 на фоне рисков Ормузского пролива, Саудовской Аравии и России.",
        "en": "Brent topped $110 for the first time since May and US crude rose above $100 amid Strait of Hormuz, Saudi and Russia risks."
      },
      "why": {
        "ru": "Энергетический шок бьёт по импортозависимым экономикам Южной Азии и усиливает внутреннее давление.",
        "en": "The energy shock hits import-dependent South Asian economies and increases domestic pressure."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "cnbctv18-brent-110-explained-2026-10-16",
          "title": {
            "ru": "Объяснение: почему Brent впервые превысил $110",
            "en": "Explained: What led to Brent crude prices crossing $110 for the first time"
          },
          "domain": "cnbctv18.com",
          "url": "https://www.cnbctv18.com/market/commodities/crude-oil-prices-brent-wti-why-are-rates-rising-explained-saudi-houthis-hormuz-iran-us-russia-ukraine-20013997.htm",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        },
        {
          "id": "discoveryalert-brent-110-2026-10-17",
          "title": {
            "ru": "Нефть Brent достигла $110: риски Ормуза, Саудовской Аравии и России накапливаются",
            "en": "Brent Oil Price Hits $110 as Hormuz, Saudi and Russia Risks Stack Up"
          },
          "domain": "discoveryalert.com",
          "url": "https://discoveryalert.com/news/brent-oil-price-110-hormuz-saudi-russia-october-2026/",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["africa"] = {
  "index": 61,
  "delta": 8,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Атаки на судоходство у берегов Йемена и подрывы танкеров в Ормузском проливе повышают военно-страховые риски на маршрутах Красного моря и Аденского залива, критичных для торговли Восточной Африки.",
        "en": "Attacks on shipping off Yemen and tanker mine strikes in the Strait of Hormuz raise war-risk premiums on Red Sea and Gulf of Aden routes critical to East African trade."
      },
      "why": {
        "ru": "Перебои на морских маршрутах у Африканского Рога напрямую бьют по импорту топлива и продовольствия региона.",
        "en": "Disruption on routes near the Horn of Africa directly affects the region’s fuel and food imports."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Хуситы освободили 159 задержанных в Сане под наблюдением МККК — ограниченный гуманитарный жест на фоне продолжающегося конфликта.",
        "en": "The Houthis released 159 detainees in Sanaa under ICRC watch — a limited humanitarian gesture amid the ongoing conflict."
      },
      "why": {
        "ru": "Гуманитарные договорённости снижают локальную напряжённость, но не меняют общего эскалационного фона.",
        "en": "Humanitarian arrangements lower local tension but do not change the overall escalation backdrop."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "aa-houthis-release-159-2026-10-17",
          "title": {
            "ru": "Хуситы Йемена освободили 159 задержанных в Сане — МККК",
            "en": "Yemen's Houthis release 159 detainees in Sanaa: ICRC"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/yemen-s-houthis-release-159-detainees-in-sanaa-icrc/4092084",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "middleeasteye-houthis-release-159-2026-10-17",
          "title": {
            "ru": "Хуситы освободили 159 человек по амнистии под наблюдением МККК",
            "en": "Houthis release 159 people under an amnesty under ICRC watch"
          },
          "domain": "middleeasteye.net",
          "url": "https://www.middleeasteye.net/live-blog/live-blog-update/houthis-release-159-people-under-amnesty-under-icrc-watch",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.trend = [
  {
    "date": "2026-08-02",
    "value": 64
  },
  {
    "date": "2026-08-09",
    "value": 65
  },
  {
    "date": "2026-08-16",
    "value": 66
  },
  {
    "date": "2026-08-23",
    "value": 67
  },
  {
    "date": "2026-08-30",
    "value": 51,
    "methodology": "3.0"
  },
  {
    "date": "2026-09-06",
    "value": 42,
    "methodology": "3.0"
  },
  {
    "date": "2026-09-13",
    "value": 43,
    "methodology": "3.0"
  },
  {
    "date": "2026-09-20",
    "value": 56,
    "methodology": "3.0"
  },
  {
    "date": "2026-09-27",
    "value": 47,
    "methodology": "3.0"
  },
  {
    "date": "2026-10-04",
    "value": 46,
    "methodology": "3.0"
  },
  {
    "date": "2026-10-11",
    "value": 56,
    "methodology": "3.0"
  },
  {
    "date": "2026-10-18",
    "value": 63,
    "methodology": "3.0"
  }
];
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
  s.sources = [
  {
    "id": "aljazeera-egypt-saudi-help",
    "title": {
      "ru": "Саудовская коалиция перехватывает дроны, Египет взвешивает помощь",
      "en": "Saudi-led coalition intercepts drones as Egypt weighs sending help"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/17/saudi-led-coalition-intercepts-drones-as-egypt-weighs-sending-help",
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
  },
  {
    "id": "aa-iraq-pmf-ammo-blast",
    "title": {
      "ru": "5 пострадавших при взрыве боеприпасов на базе Сил народной мобилизации в Ираке",
      "en": "5 injured in ammunition blast at Iraq's Popular Mobilization Forces base"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/5-injured-in-ammunition-blast-at-iraqs-popular-mobilization-forces-base/4092325",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-air-defense-riyadh",
    "title": {
      "ru": "Европе сложно поставлять больше систем ПВО в Эр-Рияд — газета",
      "en": "Europe has difficulties with supplying more air defense systems to Riyadh — newspaper"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2203601",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
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
    "id": "tass-dobropolye-drone-crews",
    "title": {
      "ru": "Удары России уничтожили половину из почти 500 украинских расчётов дронов под Добропольем",
      "en": "Russian strikes destroy half of nearly 500 Ukrainian drone crews near Dobropolye"
    },
    "domain": "tass.com",
    "url": "https://tass.com/defense/2203653",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "jpost-iran-irgc-high-alert",
    "title": {
      "ru": "Санкции сжимают иранскую экономику; КСИР приведён в повышенную готовность из-за рисков беспорядков",
      "en": "Sanctions strangle Iranian economy as IRGC goes on high alert over civil unrest risks"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/iran-news/article-911995",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "almonitor-trump-pickaxe-mountain",
    "title": {
      "ru": "Окно дипломатии с Ираном может закрываться: Трамп снова угрожает объекту Пик-Моунтин",
      "en": "Window for diplomacy with Iran may be closing as Trump again threatens Pickaxe Mountain"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/10/window-diplomacy-iran-may-be-closing-trump-again-threatens-pickaxe-mountain",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tass-ukraine-checkmate",
    "title": {
      "ru": "Российский посланник называет ситуацию вокруг Украины «мат»",
      "en": "Russian presidential envoy describes situation around Ukraine as checkmate"
    },
    "domain": "tass.com",
    "url": "https://tass.com/politics/2203539",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "ria-prison-military-clothing",
    "title": {
      "ru": "В российских колониях заключённые производят одежду для бойцов СВО",
      "en": "In Russian colonies inmates produce clothing for SMO soldiers"
    },
    "domain": "ria.ru",
    "url": "https://ria.ru/20261018/svo-2125201970.html",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
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
    "id": "almonitor-egypt-sisi-saudi-defence",
    "title": {
      "ru": "Сиси просит парламент одобрить помощь в защите Саудовской Аравии по запросу",
      "en": "Egypt's Sisi seeks parliament's backing to help defend Saudi Arabia if asked"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/10/egypts-sisi-seeks-parliaments-backing-help-defend-saudi-arabia-if-asked",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-france-protests",
    "title": {
      "ru": "Погромы и более 1200 задержанных: полиция столкнулась с протестующими по всей Франции",
      "en": "Buildings set ablaze and more than 1,200 arrested as police clash with protesters across France"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/17/protests-france-high-prices-social-security-gilets-jaunes",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tasnimnews-eslami-nuclear-threat-2026-10-12",
    "title": {
      "ru": "Ислами осудил ядерную угрозу США против Ирана",
      "en": "Eslami Condemns US Nuclear Threat against Iran"
    },
    "domain": "tasnimnews.ir",
    "url": "https://tasnimnews.ir/en/news/2026/10/12/3720781/eslami-condemns-us-nuclear-threat-against-iran",
    "publication_date": "2026-10-12",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "arabtimesonline-trump-rules-out-nuclear-2026-10-16",
    "title": {
      "ru": "Трамп исключил применение ядерного оружия против Ирана, но удар по Pickaxe Mountain остаётся возможным",
      "en": "Trump Rules Out Nuclear Weapons Against Iran, But Pickaxe Mountain Strike Remains Possible"
    },
    "domain": "arabtimesonline.com",
    "url": "https://www.arabtimesonline.com/news/trump-rules-out-nuclear-weapons-against-iran-but-pickaxe-mountain-strike-remains-possible/",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tass-nuclear-zero-postnikov-2026-10-17",
    "title": {
      "ru": "Россия считает идею «короткого пути к ядерному нулю» контрпродуктивной — дипломат Постников",
      "en": "Russia views idea of shortcut to 'nuclear zero' as counterproductive — diplomat Postnikov"
    },
    "domain": "tass.com",
    "url": "https://tass.com/politics/2203555",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "primary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
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
  },
  {
    "id": "rt-english-russian-submarine-drill-2026-10-15",
    "title": {
      "ru": "Российская атомная подлодка отработала ракетные стрельбы",
      "en": "Russian nuclear submarine conducts missile firing drill"
    },
    "domain": "rt-english.com",
    "url": "https://rt-english.com/russia/647240-russian-submarine-fire-drill",
    "publication_date": "2026-10-15",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "yahoo-trump-nuclear-bomb-iran-2026-10-16",
    "title": {
      "ru": "Трамп исключил применение ядерной бомбы против Ирана: почему это важно",
      "en": "Trump rules out using a nuclear bomb on Iran: Why that matters"
    },
    "domain": "yahoo.com",
    "url": "https://www.yahoo.com/news/politics/articles/trump-rules-using-nuclear-bomb-102112946.html",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "samaa-trump-nuclear-strike-2026-10-15",
    "title": {
      "ru": "Трамп исключил ядерный удар, Пезешкиан заявил, что Иран не сдастся",
      "en": "Trump rules out nuclear strike, Pezeshkian says Iran won't surrender"
    },
    "domain": "samaa.tv",
    "url": "https://www.samaa.tv/2087358549-trump-rules-out-nuclear-strike-pezeshkian-says-iran-won-t-surrender",
    "publication_date": "2026-10-15",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "nypost-nato-warns-russia-2026-10-13",
    "title": {
      "ru": "НАТО предупреждает Россию: «мы сломаем» силы и уничтожим «всё и вся» при нападении",
      "en": "NATO warns Russia: 'We will break' forces, destroy 'anything and everything' if you attack"
    },
    "domain": "nypost.com",
    "url": "https://nypost.com/2026/10/13/world-news/nato-warns-russia-we-will-break-forces-destroy-anything-and-everything-if-you-attack/",
    "publication_date": "2026-10-13",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "theweek-iran-counter-us-attack-2026-10-14",
    "title": {
      "ru": "Так Иран готовится отражать атаку США: «захваченные или убитые»",
      "en": "This is how Iran prepares to counter US attack: 'Boots on the ground'"
    },
    "domain": "theweek.in",
    "url": "https://www.theweek.in/news/middle-east/2026/10/14/this-is-how-iran-prepares-to-counter-us-attack-captured-or-killed.html",
    "publication_date": "2026-10-14",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
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
    "id": "iranwire-us-sanctions-iran-2026-10-15",
    "title": {
      "ru": "США атакуют иранские офшорные банки и нефтяные сети новым раундом санкций",
      "en": "US Targets Iranian-Linked Offshore Banks and Oil Networks in New Sanctions Round"
    },
    "domain": "iranwire.com",
    "url": "https://iranwire.com/en/features/158950-us-targets-iranian-linked-offshore-banks-and-oil-networks-in-new-sanctions-round/",
    "publication_date": "2026-10-15",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "trtworld-lebanon-israel-talks-2026-10-17",
    "title": {
      "ru": "Ливан примет участие в трёхсторонних переговорах с Израилем при поддержке США — Аун",
      "en": "Lebanon to take part in US-backed trilateral talks with Israel: Aoun"
    },
    "domain": "trtworld.com",
    "url": "https://www.trtworld.com/article/c2841d38185a",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tehrantimes-lavrov-tehran-2026-10-17",
    "title": {
      "ru": "Лавров посетит Тегеран в понедельник для переговоров с Арагчи",
      "en": "Lavrov to visit Tehran on Monday for talks with Araghchi"
    },
    "domain": "tehrantimes.com",
    "url": "https://www.tehrantimes.com/news/531178/Lavrov-to-visit-Tehran-on-Monday-for-talks-with-Araghchi",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "straitstimes-pope-putin-ceasefire-2026-10-16",
    "title": {
      "ru": "Из больницы папа Римский призвал Путина к прекращению огня в спорном городе Украины",
      "en": "From hospital, Pope Leo pushes Putin for ceasefire in contested Ukraine city"
    },
    "domain": "straitstimes.com",
    "url": "https://www.straitstimes.com/world/europe/from-hospital-pope-leo-pushes-putin-for-ceasefire-in-contested-ukraine-city",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-houthis-release-159-2026-10-17",
    "title": {
      "ru": "Хуситы Йемена освободили 159 задержанных в Сане — МККК",
      "en": "Yemen's Houthis release 159 detainees in Sanaa: ICRC"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/yemen-s-houthis-release-159-detainees-in-sanaa-icrc/4092084",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "middleeasteye-houthis-release-159-2026-10-17",
    "title": {
      "ru": "Хуситы освободили 159 человек по амнистии под наблюдением МККК",
      "en": "Houthis release 159 people under an amnesty under ICRC watch"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/houthis-release-159-people-under-amnesty-under-icrc-watch",
    "publication_date": "2026-10-17",
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
    "id": "theepochtimes-eu-china-trade-2026-10-16",
    "title": {
      "ru": "ЕС ищет новые торговые полномочия на фоне расширения дефицита с Китаем",
      "en": "EU Seeks New Trade Powers as Deficit With China Widens"
    },
    "domain": "theepochtimes.com",
    "url": "https://www.theepochtimes.com/world/eu-seeks-new-trade-powers-as-deficit-with-china-widens-6105278",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "breakingdefense-hegseth-ausa-2026-10-14",
    "title": {
      "ru": "Хегсет на AUSA продвигает автономность и «поколенческие» оборонные инвестиции",
      "en": "Hegseth uses AUSA spotlight to push autonomy, 'generational' defense investment"
    },
    "domain": "breakingdefense.com",
    "url": "https://breakingdefense.com/2026/10/hegseth-uses-ausa-spotlight-to-highlight-autonomy-generational-defense-investment/",
    "publication_date": "2026-10-14",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-turkiye-defense-229-2026-10-16",
    "title": {
      "ru": "Турция увеличила закупки вооружений на 229 % в 2027 году",
      "en": "Türkiye raises defense equipment procurement by 229% in 2027"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/turkiye/turkiye-raises-defense-equipment-procurement-by-229-in-2027/4091132",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "breakingdefense-critical-minerals-2026-10-15",
    "title": {
      "ru": "На фоне приближения срока по критичным минералам армия США ожидает «некоторого влияния»",
      "en": "As critical mineral deadline looms, Army expects to feel 'some impact'"
    },
    "domain": "breakingdefense.com",
    "url": "https://breakingdefense.com/2026/10/as-critical-mineral-deadline-looms-army-expects-to-feel-some-impact/",
    "publication_date": "2026-10-15",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "businesstoday-my-china-rare-earth-eu-2026-10-15",
    "title": {
      "ru": "Китай требует взаимного сотрудничества ЕС по экспортным лицензиям на редкозёмы",
      "en": "China Seeks Reciprocal EU Cooperation On Rare Earth Export License"
    },
    "domain": "businesstoday.com.my",
    "url": "https://www.businesstoday.com.my/2026/10/15/china-seeks-reciprocal-eu-cooperation-on-rare-earth-export-license/",
    "publication_date": "2026-10-15",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
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
    "id": "tbsnews-hormuz-tankers-mines-2026-10-17",
    "title": {
      "ru": "Два нефтяных танкера загорелись после подрыва на минах в Ормузском проливе — КСИР",
      "en": "Two oil tankers catch fire after striking mines in Strait of Hormuz: IRGC"
    },
    "domain": "tbsnews.net",
    "url": "https://www.tbsnews.net/worldbiz/middle-east/two-oil-tankers-catch-fire-after-striking-mines-strait-hormuz-irgc-1576151",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "eadaily-st-petersburg-oil-terminal-2026-10-18",
    "title": {
      "ru": "Нефтетерминал в Санкт-Петербурге загорелся после дроновой атаки",
      "en": "The oil terminal caught fire in St. Petersburg after the drone attack"
    },
    "domain": "eadaily.com",
    "url": "https://eadaily.com/en/news/2026/10/18/the-oil-terminal-caught-fire-in-st-petersburg-after-the-drone-attack",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": false
  },
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
    "id": "cnbctv18-brent-110-explained-2026-10-16",
    "title": {
      "ru": "Объяснение: почему Brent впервые превысил $110",
      "en": "Explained: What led to Brent crude prices crossing $110 for the first time"
    },
    "domain": "cnbctv18.com",
    "url": "https://www.cnbctv18.com/market/commodities/crude-oil-prices-brent-wti-why-are-rates-rising-explained-saudi-houthis-hormuz-iran-us-russia-ukraine-20013997.htm",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "discoveryalert-brent-110-2026-10-17",
    "title": {
      "ru": "Нефть Brent достигла $110: риски Ормуза, Саудовской Аравии и России накапливаются",
      "en": "Brent Oil Price Hits $110 as Hormuz, Saudi and Russia Risks Stack Up"
    },
    "domain": "discoveryalert.com",
    "url": "https://discoveryalert.com/news/brent-oil-price-110-hormuz-saudi-russia-october-2026/",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "mee-tugboat-uae-ukmto",
    "title": {
      "ru": "Один пострадавший: снаряды попали в буксир у берегов ОАЭ, сообщает UKMTO",
      "en": "One injured as projectiles hit tugboat off UAE coast, UKMTO says"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/one-injured-projectiles-hit-tugboat-uae-coast-ukmto-says",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-settlers-eu-diplomats",
    "title": {
      "ru": "Израильские поселенцы напали на европейских дипломатов на Западном берегу",
      "en": "Israeli settlers attack European diplomats in West Bank"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/17/israeli-settlers-attack-european-diplomats-in-west-bank",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-taiz-siege-airstrikes",
    "title": {
      "ru": "Силы во главе с Саудовской Аравией авиаударами пытаются снять осаду Таиза хуситами",
      "en": "Saudi-led forces try to break Houthi siege of Taiz with airstrikes"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/saudi-led-forces-try-to-break-houthi-siege-of-taiz-with-airstrikes",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "unicef-gaza-340-children-ceasefire",
    "title": {
      "ru": "Газа: 340 детей погибли несмотря на соглашение о прекращении огня — ЮНИСЕФ",
      "en": "Gaza: 340 children killed despite ceasefire agreement - UNICEF"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/10/1168611",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "tass-zaporizhzhia-npp-drone-ceasefire",
    "title": {
      "ru": "Активность украинских беспилотников у Запорожской АЭС и Энергодара сохраняется несмотря на перемирие",
      "en": "Ukrainian drone activity near Zaporozhye NPP, Energodar persists despite ceasefire"
    },
    "domain": "tass.com",
    "url": "https://tass.com/economy/2203639",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-lebanon-israel-us-talks",
    "title": {
      "ru": "Ливан примет участие в трёхсторонних переговорах с Израилем при поддержке США 20 октября — президент",
      "en": "Lebanon to take part in US-backed trilateral talks with Israel on Oct. 20, president says"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/lebanon-to-take-part-in-us-backed-trilateral-talks-with-israel-on-oct-20-president-says/4092254",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "mee-araghchi-hormuz-proposal",
    "title": {
      "ru": "Арагчи: Иран представил «конкретное» предложение о разблокировке Ормузского пролива",
      "en": "Araghchi says Iran has presented 'concrete' Hormuz reopening proposal"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/araghchi-says-iran-has-presented-concrete-hormuz-reopening-proposal",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "iaea-update-371-ukraine",
    "title": {
      "ru": "Обновление 371 — заявление генерального директора МАГАТЭ о ситуации в Украине",
      "en": "Update 371 - IAEA Director General Statement on Situation in Ukraine"
    },
    "domain": "iaea.org",
    "url": "https://www.iaea.org/newscenter/pressreleases/update-371-iaea-director-general-statement-on-situation-in-ukraine",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "mee-kpler-tanker-crisis",
    "title": {
      "ru": "Смягчение санкций США вряд ли ослабит кризис танкеров, считает Kpler",
      "en": "US sanctions relief unlikely to ease tanker crisis, Kpler says"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/us-sanctions-relief-unlikely-ease-tanker-crisis-kpler-says",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-settlers-eu-diplomats-video",
    "title": {
      "ru": "Израильские поселенцы напали на европейских дипломатов на оккупированном Западном берегу",
      "en": "Israeli settlers attack European diplomats in the occupied West Bank"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/israeli-settlers-attack-european-diplomats-in-the-occupied-west-bank",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "lithuania-drone-xinhua",
    "title": {
      "ru": "Латвия сняла воздушную тревогу в трёх самоуправлениях",
      "en": "Latvia lifts air threat alert for 3 municipalities"
    },
    "domain": "english.news.cn",
    "url": "https://english.news.cn/20261018/6ac1ff5d597c49b3925eae495974b62c/c.html",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "notes": "Тревога в Латвии объявлена после обнаружения неопознанного объекта в балтийском воздушном пространстве."
  },
  {
    "id": "lithuania-drone-yahoo",
    "title": {
      "ru": "Литва сообщила о повреждениях после входа неопознанного дрона в воздушное пространство",
      "en": "Lithuania reports damage caused by unidentified drone that entered its airspace"
    },
    "domain": "yahoo.com",
    "url": "https://www.yahoo.com/news/world/articles/lithuania-reports-damage-caused-unidentified-110000268.html",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Дрон вошёл в воздушное пространство Литвы, объявлена тревога, закрыт аэропорт Каунаса."
  },
  {
    "id": "moldova-drones-fakti",
    "title": {
      "ru": "Пять российских дронов упали в Молдове менее чем за сутки",
      "en": "Five Russian drones crashed in Moldova in less than 24 hours"
    },
    "domain": "fakti.bg",
    "url": "https://fakti.bg/en/world/1091179-pet-ruski-drona-padnaha-v-moldova-za-po-malko-ot-denonoshtie",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Падение дронов на территории Молдовы — пограничный инцидент, связанный с ударами по Украине."
  },
  {
    "id": "sudan-nyala-anadolu",
    "title": {
      "ru": "Удары суданской армии нанесли тяжёлые потери RSF в Ньяле (Дарфур) — региональные власти",
      "en": "Sudanese army strikes inflict heavy losses on RSF in Darfur's Nyala: Regional government"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/sudanese-army-strikes-inflict-heavy-losses-on-rsf-in-darfur-s-nyala-regional-government/4092539",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "notes": "Боевые действия в Дарфуре: удары по позициям RSF в Ньяле."
  },
  {
    "id": "sudan-kordofan-tamazuj",
    "title": {
      "ru": "Дроны ударили по кустарному золотому прииску в Южном Кордофане",
      "en": "Drones hit gold mining site in South Kordofan"
    },
    "domain": "radiotamazuj.org",
    "url": "https://www.radiotamazuj.org/en/news/article/drones-hit-gold-mining-site-in-south-kordofan",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "E-field-osint",
    "state_affiliated": false,
    "notes": "Удар дронов по прииску в Южном Кордофане — продолжение боевых действий в Судане."
  },
  {
    "id": "pakistan-afghan-clash-moneycontrol",
    "title": {
      "ru": "Пакистан и афганские талибы обменялись тяжёлым огнём на линии Дюранда: 7 военных убиты",
      "en": "Pakistan, Afghan Taliban exchange heavy fire along Durand Line; 7 soldiers killed amid fresh tensions"
    },
    "domain": "moneycontrol.com",
    "url": "https://www.moneycontrol.com/world/2-pakistan-afghan-taliban-exchange-heavy-fire-along-durand-line-7-soldiers-killed-amid-fresh-tensions-article-14054587.html",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Пограничный бой на линии Дюранда — пограничный инцидент с боевыми потерями."
  },
  {
    "id": "pakistan-balochistan-arabnews",
    "title": {
      "ru": "Пакистан сообщил о восьми уничтоженных боевиках в Белуджистане",
      "en": "Pakistan says eight militants killed in operations in restive Balochistan province"
    },
    "domain": "arabnews.pk",
    "url": "https://www.arabnews.pk/pakistan/pakistan-says-eight-militants-killed-in-operations-in-restive-balochistan-province-3004523",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Контртеррористические операции в Белуджистане в отчётном окне."
  },
  {
    "id": "pakistan-iran-trade-arabnews",
    "title": {
      "ru": "Пакистан приостановил торговлю с Ираном из-за проблем безопасности: тысячи контейнеров застряли",
      "en": "Pakistan suspends trade with Iran over security concerns, stranding thousands of containers"
    },
    "domain": "arabnews.pk",
    "url": "https://www.arabnews.pk/pakistan/pakistan-suspends-trade-with-iran-over-security-concerns-stranding-thousands-of-containers-3004477",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Приостановка трансграничной торговли и закрытие КПП — риск транспортного канала."
  },
  {
    "id": "pakistan-iran-border-minutemirror",
    "title": {
      "ru": "Торговля Пакистана и Ирана остановлена — КПП Тафтан закрыт",
      "en": "Pakistan-Iran trade halted as Taftan border shuts"
    },
    "domain": "minutemirror.com.pk",
    "url": "https://minutemirror.com.pk/pakistan-iran-trade-halted-as-taftan-border-shuts-646723/",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Закрытие КПП Тафтан останавливает грузопоток между Пакистаном и Ираном."
  },
  {
    "id": "schmidt-dodik-6yka",
    "title": {
      "ru": "Шмидт предупреждает: Додик может попытаться отделить Республику Сербскую — территориальная целостность БиГ не обсуждается",
      "en": "Schmidt warns: Dodik could attempt secession of Republika Srpska - Bosnia's territorial integrity is not up for discussion"
    },
    "domain": "6yka.com",
    "url": "https://6yka.com/bih/schmidt-upozorava-dodik-bi-mogao-pokusati-otcjepljenje-srpske-teritorijalni-integritet-bih-nije-na-diskusiji/",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Высокий представитель предупреждает о попытке отделения Республики Сербской — ультимативное предупреждение."
  },
  {
    "id": "rubio-central-asia-usnews",
    "title": {
      "ru": "Рубио направляется в Центральную Азию, пока другие чиновники США работают в горячих точках",
      "en": "Rubio heads to Central Asia as some wonder if he's keeping the most pressing matters at a distance"
    },
    "domain": "usnews.com",
    "url": "https://www.usnews.com/news/politics/articles/2026-10-18/rubio-heads-to-central-asia-as-some-wonder-if-hes-keeping-the-most-pressing-matters-at-a-distance",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Визит госсекретаря США в Центральную Азию — дипломатический трек недели."
  },
  {
    "id": "central-asia-security-presstv",
    "title": {
      "ru": "В Москве прошла конференция по безопасности в Центральной Азии и Афганистане",
      "en": "Moscow hosts conference on security in Central Asia, Afghanistan"
    },
    "domain": "presstv.co.uk",
    "url": "https://www.presstv.co.uk/Detail/2026/10/17/778559/Moscow-hosts-conference-on-security-in-Central-Asia,-Afghanistan",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "notes": "Конференция по региональной безопасности с участием центральноазиатских государств."
  },
  {
    "id": "armenia-kyrgyzstan-armenpress",
    "title": {
      "ru": "Опубликовано совместное заявление премьер-министра Армении и президента Кыргызстана",
      "en": "Joint statement signed by Armenian Prime Minister and Kyrgyz President published"
    },
    "domain": "armenpress.am",
    "url": "https://armenpress.am/en/article/1263137",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Совместное заявление Еревана и Бишкека — межгосударственные переговоры."
  },
  {
    "id": "baku-cica-jpost",
    "title": {
      "ru": "Герцог встретился с главой МИД Бахрейна на саммите CICA в Азербайджане",
      "en": "Isaac Herzog meets with Bahrain foreign minister at CICA summit hosted by Azerbaijan"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/article-912023",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Дипломатическая встреча на саммите CICA в Баку — переговорный трек Южного Кавказа."
  },
  {
    "id": "dprk-torpedo-qazinform",
    "title": {
      "ru": "КНДР испытала новую торпеду с ИИ-наведением — ЦТАК",
      "en": "North Korea tests new AI-powered precision-guided torpedo: KCNA"
    },
    "domain": "qazinform.com",
    "url": "https://qazinform.com/news/north-korea-tests-new-ai-powered-precision-guided-torpedo-kcna-dd68a0",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "notes": "Испытание новой подводной торпедной системы КНДР."
  },
  {
    "id": "dprk-torpedo-star",
    "title": {
      "ru": "Новую торпедную систему испытали",
      "en": "New torpedo weapon system put to the test"
    },
    "domain": "thestar.com.my",
    "url": "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/10/18/new-torpedo-weapon-system-put-to-the-test",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Подтверждение испытания КНДР независимым изданием."
  }
];
})();
