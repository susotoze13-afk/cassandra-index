window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.global = {
  "index": 74,
  "delta": 5
};
  s.published = "2026-11-15";
  s.through = "2026-11-15";
  s.methodology = "4.0";
  s.regions_taxonomy = "2.0";
  s.dataState = "published";
  s.q = 1;
  s.nullWeight = 0;
  s.coverage = {
  "coveredDrivers": 9,
  "totalDrivers": 9
};
  s.confidence = "full";
  s.sensitivity = 0;
  s.precursor = {
  "value": 78,
  "signalingSubgroups": 3
};
  s.coverageCriteria = {
  "covered": 26,
  "total": 46,
  "uncovered": [
    "D1.2",
    "D1.5",
    "D1.6",
    "D2.4",
    "D2.5",
    "D3.1",
    "D3.2",
    "D4.2",
    "D4.5",
    "D5.4",
    "D6.1",
    "D6.4",
    "D7.3",
    "D8.1",
    "D8.4",
    "D9.1",
    "D9.5",
    "D9.6a",
    "D9.6b",
    "D9.7"
  ]
};
  s.recalc = {
  "at": "2026-11-15T07:38:23.799Z",
  "reason": "Еженедельный пересчёт",
  "previous": 74,
  "methodologyBefore": "4.0",
  "methodologyAfter": "4.0",
  "approvedBy": "Editor-in-Chief"
};
  s.regions = {
  "russia-belarus": {
    "index": 73.8,
    "delta": 4.7,
    "status": "very",
    "background": false,
    "signals": 7
  },
  "ukraine-moldova": {
    "index": 72.3,
    "delta": 4.8,
    "status": "very",
    "background": false,
    "signals": 8
  },
  "baltic": {
    "index": 74.6,
    "delta": 5,
    "status": "very",
    "background": false,
    "signals": 3
  },
  "balkans": {
    "index": 73.8,
    "delta": 4.1,
    "status": "very",
    "background": false,
    "signals": 2
  },
  "eu-north-europe": {
    "index": 72.9,
    "delta": 4.1,
    "status": "very",
    "background": false,
    "signals": 10
  },
  "south-caucasus": {
    "index": 74.1,
    "delta": 5.4,
    "status": "very",
    "background": false,
    "signals": 2
  },
  "central-asia": {
    "index": 73.5,
    "delta": 4.2,
    "status": "very",
    "background": false,
    "signals": 2
  },
  "east-asia": {
    "index": 73.5,
    "delta": 4.5,
    "status": "very",
    "background": false,
    "signals": 4
  },
  "middle-east": {
    "index": 75.1,
    "delta": 7.6,
    "status": "very",
    "background": false,
    "signals": 13
  },
  "north-america": {
    "index": 74,
    "delta": 5.1,
    "status": "very",
    "background": false,
    "signals": 5
  },
  "south-asia": {
    "index": 74.3,
    "delta": 5.9,
    "status": "very",
    "background": false,
    "signals": 2
  },
  "africa": {
    "index": 75,
    "delta": 5.9,
    "status": "very",
    "background": false,
    "signals": 4
  }
};
  s.regions["russia-belarus"] = {
  "index": 73.8,
  "delta": 4.7,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Генштаб РФ сообщил о взятии Терсянки в Запорожской области; украинские дроны ударили по больнице в Киеве и по Одессе.",
        "en": "Russia’s top brass reported the capture of Tersyanka in Zaporozhye region; Ukrainian drones hit a Kyiv hospital and Odesa."
      },
      "why": {
        "ru": "Наземные действия и удары по городам (Д1.1, Д1.4).",
        "en": "Ground action and strikes on cities (D1.1, D1.4)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "МИД Латвии готовит запрет транзита российского и белорусского зерна, европейские ограничения продолжают сжимать экспортные маршруты.",
        "en": "Latvia’s foreign ministry is drafting a ban on Russian and Belarusian grain transit, while European restrictions keep tightening export routes."
      },
      "why": {
        "ru": "Санкции и логистика экспорта (Д3.3, Д4.1).",
        "en": "Sanctions and export logistics (D3.3, D4.1)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["ukraine-moldova"] = {
  "index": 72.3,
  "delta": 4.8,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Дроны ударили по больнице в Киеве, в Одессе погибли двое; Зеленский говорит, что переданные F-16 постоянно находятся в ремонте.",
        "en": "Drones hit a Kyiv hospital and two were killed in Odesa; Zelensky says the F-16s supplied are constantly under repair."
      },
      "why": {
        "ru": "Удары по инфраструктуре и состояние поставок (Д1.3, Д1.4).",
        "en": "Strikes on infrastructure and the state of supplies (D1.3, D1.4)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Зеленский заявил, что США предлагали уступить Донбасс в обмен на членство в НАТО; Россия требует отвода сил НАТО к позициям до расширения.",
        "en": "Zelensky said the US floated ceding Donbas for NATO membership; Russia demands NATO forces return to pre-enlargement positions."
      },
      "why": {
        "ru": "Переговорный трек и условия сторон (Д3.4, Д8.2).",
        "en": "The negotiating track and each side’s terms (D3.4, D8.2)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["baltic"] = {
  "index": 74.6,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Украинский дрон ударил по российскому военному кораблю в Финском заливе; латвийские проверки транзитных партий зерна не нашли украинского зерна, но сам контроль транзита усилен.",
        "en": "A Ukrainian drone struck a Russian warship in the Gulf of Finland; Latvian checks of transit grain shipments found no Ukrainian grain, while transit controls were tightened."
      },
      "why": {
        "ru": "Атака вне украинского театра и контроль транзита (Д7.2, Д3.3).",
        "en": "An attack outside the Ukrainian theatre and transit controls (D7.2, D3.3)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Пентагон пересматривает планы сокращения войск в Европе в сторону меньшего сокращения; Латвия рассматривает заморозку Rail Baltica из-за стоимости.",
        "en": "The Pentagon is reversing course and now eyes smaller troop cuts in Europe, while Latvia considers freezing Rail Baltica over costs."
      },
      "why": {
        "ru": "Военное присутствие США и транспортная инфраструктура региона (Д1.1, Д9.3).",
        "en": "US military presence and the region’s transport infrastructure (D1.1, D9.3)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["balkans"] = {
  "index": 73.8,
  "delta": 4.1,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "ЕС предложил странам Чёрного моря поддержку в противодействии угрозам безопасности; начальник Генштаба Сербии обсудил с командующим KFOR ситуацию безопасности в Косове.",
        "en": "The EU offered Black Sea countries support against security threats, and Serbia’s chief of staff discussed the security situation in Kosovo with the KFOR commander."
      },
      "why": {
        "ru": "Вовлечение новых форматов и военные контакты по Косову (Д7.1, Д3.4).",
        "en": "New formats and military contacts over Kosovo (D7.1, D3.4)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Болгария объявила о прекращении поставок оружия Украине.",
        "en": "Bulgaria announced it will stop supplying weapons to Ukraine."
      },
      "why": {
        "ru": "Выход третьей стороны из поставок (Д7.4).",
        "en": "A third party stepping out of supplies (D7.4)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["eu-north-europe"] = {
  "index": 72.9,
  "delta": 4.1,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Франция расследует взлом холодильника с кровью после серии атак, приписываемых Ирану; по данным ITV, волну атак в Европе организовывала сеть из семи человек.",
        "en": "France is investigating a blood-freezer hack after a series of Iran-linked attacks; ITV reports a seven-man network orchestrated a wave of attacks across Europe."
      },
      "why": {
        "ru": "Кибероперации против гражданской инфраструктуры (Д5.2).",
        "en": "Cyber operations against civilian infrastructure (D5.2)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Кушнер заявил, что США готовят следующий раунд переговоров России и Украины с участием европейцев; Кремль говорит, что европейские переговорщики ещё не выходили на связь.",
        "en": "Kushner said the US is preparing the next round of Russia–Ukraine talks with Europeans involved; the Kremlin says European negotiators have not made contact yet."
      },
      "why": {
        "ru": "Посредничество и готовность к переговорам (Д3.4, Д8.2).",
        "en": "Mediation and readiness to talk (D3.4, D8.2)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["south-caucasus"] = {
  "index": 74.1,
  "delta": 5.4,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Зеленский похвалил новые дроновые сделки Баку и Киева и рост заказов.",
        "en": "Zelensky praised new drone deals between Baku and Kyiv and said orders are scaling up."
      },
      "why": {
        "ru": "Поставки военной техники в регионе (Д1.3).",
        "en": "Military supplies in the region (D1.3)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Иран пригрозил Армении на фоне прохождения «маршрута Трампа» через парламент Еревана.",
        "en": "Iran threatened Armenia as the “Trump Route” cleared Yerevan’s parliament."
      },
      "why": {
        "ru": "Давление на маршруты и переговорную рамку региона (Д3.4, Д5.1).",
        "en": "Pressure on routes and the region’s negotiating framework (D3.4, D5.1)."
      },
      "contribution": "medium",
      "confidence": "low",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["central-asia"] = {
  "index": 73.5,
  "delta": 4.2,
  "status": "very",
  "background": false,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Казахстан продвигает планы атомной энергетики и рассматривает площадки для третьего объекта.",
        "en": "Kazakhstan is advancing nuclear power plans and considering sites for a third facility."
      },
      "why": {
        "ru": "Ядерная и энергетическая повестка региона (Д2, Д9.4) — эскалационного сигнала нет.",
        "en": "The region’s nuclear and energy agenda (D2, D9.4) with no escalation signal."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Британия ввела санкции против СИБУРа, и Казахстан может почувствовать эффект; объявлено, что трёхсторонний саммит России, Китая и США пройдёт 19 ноября в Шэньчжэне.",
        "en": "The UK sanctioned Russia’s SIBUR with a knock-on effect for Kazakhstan, and a Russia–China–US trilateral summit was announced for November 19 in Shenzhen."
      },
      "why": {
        "ru": "Санкционный канал и переговорная рамка региона (Д3.3, Д3.4).",
        "en": "The sanctions channel and the region’s negotiating frame (D3.3, D3.4)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "kursiv-sibur-sanctions",
          "title": {
            "ru": "Британия ввела санкции против СИБУРа; Казахстан может почувствовать эффект",
            "en": "UK imposes sanctions on Russia’s SIBUR; Kazakhstan could feel the impact"
          },
          "domain": "kz.kursiv.media",
          "url": "https://kz.kursiv.media/en/2026-11-13/engk-tank-uk-imposes-sanctions-on-russias-sibur-kazakhstan-could-feel-the-impact/?utm_source=rss&#038;utm_medium=rss&#038;utm_campaign=engk-tank-uk-imposes-sanctions-on-russias-sibur-kazakhstan-could-feel-the-impact",
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
        }
      ]
    }
  ]
};
  s.regions["east-asia"] = {
  "index": 73.5,
  "delta": 4.5,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Белый дом подтвердил трёхсторонние переговоры США, Китая и России на полях саммита; Сеул настаивает на диалоге с Пхеньяном, а делегация КНДР прибыла в Москву.",
        "en": "The White House confirmed US–China–Russia trilateral talks on the summit sidelines; Seoul pushes for talks with Pyongyang while a North Korean delegation arrived in Moscow."
      },
      "why": {
        "ru": "Дипломатическая активность и вовлечение новых государств (Д3.4, Д7.1).",
        "en": "Diplomatic activity and new state involvement (D3.4, D7.1)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Обсуждается способность китайской ПВО HQ-17 прикрывать морские десантные силы от ударов с Тайваня.",
        "en": "Analysts debate whether China’s HQ-17 air defence can shield amphibious forces from Taiwanese strikes."
      },
      "why": {
        "ru": "Военно-технический фон Тайваньского пролива (Д1.5 не покрыт — один кластер).",
        "en": "Military-technical backdrop of the Taiwan Strait (D1.5 uncovered — single cluster)."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["middle-east"] = {
  "index": 75.1,
  "delta": 7.6,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Иран заявил об ударе шестью дронами по радиолокационному узлу США в Бахрейне; Бахрейн выпустил первые с сентября предупреждения, США отвергли часть заявлений и сообщили о сбитых дронах.",
        "en": "Iran said it struck a US radar site in Bahrain with six drones; Bahrain issued its first alerts since September, while the US rejected part of the claim and reported downing drones."
      },
      "why": {
        "ru": "Прямой удар по объекту США вне иранского театра и спор о фактах (Д1.4, Д7.2, Д5.3).",
        "en": "A direct strike on a US facility outside the Iranian theatre and a dispute over facts (D1.4, D7.2, D5.3)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Три танкера горели после подрыва на минах в Ормузе; ООН требует восстановить безопасное судоходство и пропустить удобрения.",
        "en": "Three tankers burned after hitting mines in Hormuz; the UN demands restored safe navigation and passage for fertilisers."
      },
      "why": {
        "ru": "Морская блокада и страхование (Д4.3, Д4.4, Д9.3).",
        "en": "Maritime blockade and insurance (D4.3, D4.4, D9.3)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["north-america"] = {
  "index": 74,
  "delta": 5.1,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Оптовые цены выросли на 0,3 % за месяц, годовой рост 6,5 %; Nvidia потеряла $1,7 трлн капитализации, рынок США — $3 трлн по заявлению Трампа.",
        "en": "Wholesale prices rose 0.3 % on the month, 6.5 % year on year; Nvidia shed $1.7 trillion in value, and Trump says the US market lost $3 trillion."
      },
      "why": {
        "ru": "Стресс рынков и цен (Д4.6).",
        "en": "Market and price stress (D4.6)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Иранские командиры угрожали убить Трампа и бить по целям США по всему миру; глава Минфина США переехал на военную базу из-за угроз.",
        "en": "Iranian commanders threatened to kill Trump and strike US targets worldwide; the US Treasury chief moved to a military base over the threats."
      },
      "why": {
        "ru": "Эскалационная риторика и защита руководства (Д5.1).",
        "en": "Escalatory rhetoric and leadership protection (D5.1)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["south-asia"] = {
  "index": 74.3,
  "delta": 5.9,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "В операциях в Хайбер-Пахтунхве и Белуджистане убиты 24 боевика, погибли четверо военных, включая майора.",
        "en": "Operations in Khyber Pakhtunkhwa and Balochistan killed 24 militants and four troops, including a major."
      },
      "why": {
        "ru": "Активные боевые действия внутри страны (Д1.4).",
        "en": "Active combat inside the country (D1.4)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "ООН сообщает о не менее 25 погибших моряках в Ормузском проливе — маршрут критичен для поставок энергоносителей в Южную Азию.",
        "en": "The UN reports at least 25 sailors killed in Hormuz — the route is critical for South Asian energy supplies."
      },
      "why": {
        "ru": "Разрыв цепочек поставок и морские риски (Д4.3, Д9.3).",
        "en": "Supply-chain rupture and maritime risk (D4.3, D9.3)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["africa"] = {
  "index": 75,
  "delta": 5.9,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "В ДР Конго не менее 44 человек погибли при атаке боевиков, связанных с ИГ; в Судане нормой стали дальнобойные удары.",
        "en": "At least 44 people were killed in DR Congo in an attack by Islamic State-linked gunmen; long-range strikes are now the norm in Sudan."
      },
      "why": {
        "ru": "Боевые действия и удары по населённым пунктам (Д1.4).",
        "en": "Combat and strikes on populated areas (D1.4)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Эфиопия и Эритрея обменялись ударами дронов и артиллерии, Аддис-Абеба обвиняет Асмэру в поддержке наступления тиграйских повстанцев; 64 тыс. человек бежали из Нигерии в Нигер.",
        "en": "Ethiopia and Eritrea exchanged drone and artillery strikes, Addis Ababa accuses Asmara of backing a Tigray rebel offensive; 64,000 fled Nigeria for Niger."
      },
      "why": {
        "ru": "Новый фронт и эвакуация населения (Д7.1, Д6.2).",
        "en": "A new front and population displacement (D7.1, D6.2)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.trend = [
  {
    "date": "2026-08-30",
    "value": 51,
    "methodology": "4.0"
  },
  {
    "date": "2026-09-06",
    "value": 42,
    "methodology": "4.0"
  },
  {
    "date": "2026-09-13",
    "value": 43,
    "methodology": "4.0"
  },
  {
    "date": "2026-09-20",
    "value": 56,
    "methodology": "4.0"
  },
  {
    "date": "2026-09-27",
    "value": 47,
    "methodology": "4.0"
  },
  {
    "date": "2026-10-04",
    "value": 46,
    "methodology": "4.0"
  },
  {
    "date": "2026-10-11",
    "value": 56,
    "methodology": "4.0"
  },
  {
    "date": "2026-10-18",
    "value": 64,
    "methodology": "4.0"
  },
  {
    "date": "2026-10-25",
    "value": 68,
    "methodology": "4.0"
  },
  {
    "date": "2026-11-01",
    "value": 72,
    "methodology": "4.0"
  },
  {
    "date": "2026-11-08",
    "value": 69,
    "methodology": "4.0"
  },
  {
    "date": "2026-11-15",
    "value": 74,
    "methodology": "4.0"
  }
];
  s.drivers = [
  {
    "label": {
      "ru": "Ормуз и Бахрейн: мины под танкерами и удар по радиолокатору США",
      "en": "Hormuz and Bahrain: mines under tankers and a strike on a US radar"
    },
    "observation": {
      "ru": "Три танкера загорелись после подрыва на минах в Ормузском проливе, ООН сообщает о не менее 25 погибших моряках и предупреждает о росте морских атак. Иран заявил об ударе шестью дронами по радиолокационному узлу США в Бахрейне, Бахрейн впервые с сентября выпустил предупреждения об угрозе.",
      "en": "Three tankers caught fire after hitting mines in the Strait of Hormuz, the UN reports at least 25 sailors killed and warns of rising maritime attacks. Iran said it struck a US radar site in Bahrain with six drones, and Bahrain issued its first threat alerts since September."
    },
    "why": {
      "ru": "Морской маршрут остаётся зоной удара, а атака на базу США расширяет театр (Д1.4, Д4.4, Д7.2, Д9.3).",
      "en": "The sea lane remains a strike zone, and the attack on a US base widens the theatre (D1.4, D4.4, D7.2, D9.3)."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
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
      }
    ]
  },
  {
    "label": {
      "ru": "Рынки: Brent выше $96, оптовые цены 6,5 %, обвал Nvidia",
      "en": "Markets: Brent above $96, wholesale prices at 6.5 %, Nvidia slump"
    },
    "observation": {
      "ru": "Brent вернулся выше $96 на фоне эскалации вокруг Ирана; годовой рост оптовых цен в США достиг 6,5 % — максимум почти за четыре года; капитализация Nvidia за неделю упала на $1,7 трлн, а рынок США, по заявлению Трампа, потерял $3 трлн. Печное топливо подорожало на 59 % к прошлой зиме.",
      "en": "Brent climbed back above $96 as Iran tensions escalated; US annual wholesale price growth hit 6.5 %, the highest in nearly four years; Nvidia lost $1.7 trillion in market value in a week and, per Trump, the US market lost $3 trillion. Heating oil is up 59 % from last winter."
    },
    "why": {
      "ru": "Стресс рынков и сырья — отдельный критерий входа в драйвер Д4 (Д4.6), он же давит на финансовую изоляцию и накопления (Д9.2, Д9.4).",
      "en": "Market and commodity stress is its own input criterion inside D4 (D4.6) and feeds financial isolation and stockpiling (D9.2, D9.4)."
    },
    "contribution": "high",
    "confidence": "medium",
    "sources": [
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
      }
    ]
  },
  {
    "label": {
      "ru": "Ядерная сфера: пересмотр доктрины Ирана и тревога МАГАТЭ",
      "en": "Nuclear: Iran doctrine review and an IAEA alarm"
    },
    "observation": {
      "ru": "Высший клерикальный орган Ирана призвал пересмотреть ядерную доктрину, МАГАТЭ подняло тревогу из-за объекта обогащения, который никогда не инспектировало, а Нетаньяху заявил, что Иран стремится возродить программу. В окне не было публичной ядерной угрозы уровня прошлой недели — этот сигнал перенесён из недели 2026-11-08 с раскрытием в driverConfidence.",
      "en": "Iran’s top clerical body called for a nuclear doctrine review, the IAEA raised alarm over an enrichment plant it has never inspected, and Netanyahu said Iran seeks to revive its programme. No public nuclear threat of last week’s level appeared in the window — that signal is carried over from 2026-11-08 with disclosure in driverConfidence."
    },
    "why": {
      "ru": "Смена доктрины (Д2.2) и технические сигналы (Д2.3) при отсутствии эскалационной риторики (Д2.1 перенесён).",
      "en": "Doctrine change (D2.2) and technical signals (D2.3) with escalation rhetoric absent (D2.1 carried over)."
    },
    "contribution": "high",
    "confidence": "medium",
    "sources": [
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
      }
    ]
  }
];
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
  s.countries = {
  "total": 152,
  "published": 2,
  "rows": {
    "RU": {
      "index": 74.1,
      "delta": 5,
      "background": false,
      "region": "russia-belarus",
      "signals": 5,
      "name": {
        "ru": "Россия",
        "en": "Russia"
      }
    },
    "UA": {
      "index": 73.3,
      "delta": 5.5,
      "background": false,
      "region": "ukraine-moldova",
      "signals": 6,
      "name": {
        "ru": "Украина",
        "en": "Ukraine"
      }
    }
  }
};
  s.regions["russia-belarus"].signals = 7;
  s.regions["ukraine-moldova"].signals = 8;
  s.regions["baltic"].signals = 3;
  s.regions["balkans"].signals = 2;
  s.regions["eu-north-europe"].signals = 10;
  s.regions["south-caucasus"].signals = 2;
  s.regions["central-asia"].signals = 2;
  s.regions["east-asia"].signals = 4;
  s.regions["middle-east"].signals = 13;
  s.regions["north-america"].signals = 5;
  s.regions["south-asia"].signals = 2;
  s.regions["africa"].signals = 4;
})();
