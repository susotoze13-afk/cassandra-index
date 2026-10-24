window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.global = {
  "index": 51,
  "delta": -10
};
  s.published = "2026-08-30";
  s.through = "2026-08-30";
  s.methodology = "3.0";
  s.regions_taxonomy = "1.0";
  s.dataState = "published";
  s.q = 1;
  s.nullWeight = 0;
  s.coverage = {
  "coveredDrivers": 9,
  "totalDrivers": 9
};
  s.confidence = "full";
  s.sensitivity = 0.6;
  s.coverageCriteria = {
  "covered": 38,
  "total": 46,
  "uncovered": [
    "D5.2",
    "D5.3",
    "D6.1",
    "D8.3",
    "D9.1",
    "D9.5",
    "D9.6a",
    "D9.6b"
  ]
};
  s.recalc = {
  "at": "2026-10-24T17:46:42.298Z",
  "reason": "Еженедельный пересчёт",
  "previous": 51,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
  s.regions = {
  "europe": {
    "index": 48,
    "delta": -20,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 42,
    "delta": -10,
    "status": "danger",
    "background": true
  },
  "middle-east": {
    "index": 49,
    "delta": -31,
    "status": "danger",
    "background": false
  },
  "north-america": {
    "index": 32,
    "delta": -10,
    "status": "tense",
    "background": true
  },
  "south-asia": {
    "index": 49,
    "delta": -9,
    "status": "danger",
    "background": false
  },
  "africa": {
    "index": 53,
    "delta": 6,
    "status": "danger",
    "background": false
  }
};
  s.regions["europe"] = {
  "index": 48,
  "delta": -20,
  "status": "danger",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Удар по складу в Миле под Киевом унёс жизни не менее 37 человек, в Киеве зафиксирован рекордный день — 13 воздушных тревог, ракетный удар по Белгороду повредил склад маркетплейса и теплоэлектроцентраль.",
        "en": "The strike on the Myla depot near Kyiv killed at least 37 people, Kyiv recorded a record day of 13 air raid alerts, and a missile strike on Belgorod damaged a marketplace warehouse and a cogeneration plant."
      },
      "why": {
        "ru": "Интенсивность обмена ударами напрямую влияет на риск случайного столкновения в воздушном пространстве союзников и на их границах.",
        "en": "The intensity of reciprocal strikes directly affects the risk of unintended encounters in allied airspace and at their borders."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Советник Зеленского допустил возможность переговоров Украины и России в сентябре; Москва предупредила Великобританию о последствиях поставок оружия; Лондон подтвердил поддержку Киева.",
        "en": "A Zelensky adviser said Ukraine-Russia talks could take place in September; Moscow warned the United Kingdom over arms supplies; London confirmed its support for Kyiv."
      },
      "why": {
        "ru": "Сохраняющийся переговорный трек при жёсткой риторике удерживает конфликт в непредсказуемом состоянии.",
        "en": "A persisting negotiation track amid harsh rhetoric keeps the conflict in an unpredictable state."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["east-asia"] = {
  "index": 42,
  "delta": -10,
  "status": "danger",
  "background": true,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Вблизи границы прошли учения необычного масштаба, сообщает DW; CrisisWatch фиксирует эскалацию вокруг систем противовоздушной обороны.",
        "en": "Drills of unusual scale took place near the border, DW reports; CrisisWatch records escalation around air defence systems."
      },
      "why": {
        "ru": "Плотность учений и передислокация средств ПВО сокращают время реакции сторон и повышают цену ошибки.",
        "en": "The density of drills and the redeployment of air-defence assets shorten reaction time and raise the cost of a mistake."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Reuters опубликовал спутниковый анализ пограничных перемещений и столкновений; Associated Press ведёт мониторинг пограничных столкновений.",
        "en": "Reuters published satellite analysis of border movements and clashes; the Associated Press monitors border clashes."
      },
      "why": {
        "ru": "Сопоставление спутниковых и полевых наблюдений позволяет отличить рутинную активность от подготовки к эскалации.",
        "en": "Combining satellite and field observations helps distinguish routine activity from escalation preparation."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["middle-east"] = {
  "index": 49,
  "delta": -31,
  "status": "danger",
  "background": false,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "CrisisWatch фиксирует эскалацию вокруг средств ПВО; UANI документирует обновлённую картину судоходства Ирана на фоне кризиса в Ормузском проливе и Красном море.",
        "en": "CrisisWatch records escalation around air-defence assets; UANI documents an updated picture of Iranian shipping amid the crisis in the Strait of Hormuz and the Red Sea."
      },
      "why": {
        "ru": "Пересечение эскалации ПВО и перебоев судоходства повышает риски для энергетических маршрутов региона.",
        "en": "The intersection of air-defence escalation and shipping disruption raises risks for the region’s energy routes."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Блокада чёрноморских портов остановила экспорт зерна, эскалация войны прерывает судоходство; торговые маршруты в двух морях одновременно под давлением.",
        "en": "The blockade of Black Sea ports halted grain exports and the escalation of the war is disrupting shipping; trade routes in two seas are under pressure at once."
      },
      "why": {
        "ru": "Перестройка морских маршрутов и рост страховых издержек затрагивают торговлю и снабжение государств региона.",
        "en": "The rerouting of sea lanes and rising insurance costs affect trade and supply for states in the region."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["north-america"] = {
  "index": 32,
  "delta": -10,
  "status": "tense",
  "background": true,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Москва предупредила Великобританию о последствиях поставок оружия Украине; министр обороны Великобритании заявил, что Лондон останется с Киевом несмотря на возмутительные угрозы.",
        "en": "Moscow warned the United Kingdom over arms supplies to Ukraine; the UK defence secretary said London will stand with Kyiv despite the outrageous threats."
      },
      "why": {
        "ru": "Публичные угрозы в адрес союзников и твёрдые ответные заявления закрепляют конфронтацию между столицами.",
        "en": "Public threats against allies and firm responses entrench confrontation between capitals."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "ЕС одобрил 7,1 млрд долларов новой военной помощи Украине; сводки санкционного регулирования фиксируют вступление в силу очередных ограничительных мер.",
        "en": "The EU approved USD 7.1 billion in new military aid to Ukraine; sanctions-regulation roundups record new restrictive measures taking effect."
      },
      "why": {
        "ru": "Серийное наращивание помощи и санкций закрепляет ожидание длительного периода напряжённости в трансатлантическом пространстве.",
        "en": "Serial increases in aid and sanctions entrench expectations of a prolonged period of tension across the Atlantic."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["south-asia"] = {
  "index": 49,
  "delta": -9,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Reuters опубликовал спутниковый анализ пограничных перемещений и столкновений в приграничных округах; Associated Press ведёт независимый мониторинг пограничных столкновений.",
        "en": "Reuters published satellite analysis of border movements and clashes in border districts; the Associated Press runs independent monitoring of border clashes."
      },
      "why": {
        "ru": "Сосредоточение сил в пограничных округах сокращает время реакции сторон и повышает риск локального столкновения.",
        "en": "The concentration of forces in border districts shortens reaction time and raises the risk of a local clash."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "DW сообщает об учениях необычного масштаба вблизи границы; мониторинг пограничных столкновений в регионе продолжается.",
        "en": "DW reports drills of unusual scale near the border; monitoring of border clashes in the region continues."
      },
      "why": {
        "ru": "Одновременные учения и живой мониторинг в соседних азиатских театрах удерживают фоновую напряжённость региона.",
        "en": "Simultaneous drills and active monitoring in neighbouring Asian theatres keep the region’s background tension elevated."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.regions["africa"] = {
  "index": 53,
  "delta": 6,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Эскалация войны останавливает экспорт зерна через Чёрное море; блокада портов душит украинский экспорт и бьёт по мировым ценам на зерно.",
        "en": "The escalation of the war is stopping grain exports through the Black Sea; the port blockade is choking Ukrainian exports and hitting world grain prices."
      },
      "why": {
        "ru": "Рост цен и перебои поставок зерна ударяют по странам, зависимым от импорта продовольствия.",
        "en": "Rising prices and supply disruptions hit countries dependent on food imports."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Кризис судоходства охватывает одновременно Чёрное море и маршруты вокруг Ирана; страховые и фрахтовые издержки растут.",
        "en": "The shipping crisis spans the Black Sea and the routes around Iran at once; insurance and freight costs are rising."
      },
      "why": {
        "ru": "Удорожание перевозок снижает доступность товаров и гуманитарных грузов для африканских импортёров.",
        "en": "More expensive shipping reduces the availability of goods and humanitarian cargo for African importers."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
  s.trend = [
  {
    "date": "2026-06-14",
    "value": 47
  },
  {
    "date": "2026-06-21",
    "value": 49
  },
  {
    "date": "2026-06-28",
    "value": 50
  },
  {
    "date": "2026-07-05",
    "value": 50
  },
  {
    "date": "2026-07-12",
    "value": 53
  },
  {
    "date": "2026-07-19",
    "value": 55
  },
  {
    "date": "2026-07-26",
    "value": 56
  },
  {
    "date": "2026-08-02",
    "value": 57
  },
  {
    "date": "2026-08-09",
    "value": 58
  },
  {
    "date": "2026-08-16",
    "value": 60
  },
  {
    "date": "2026-08-23",
    "value": 62
  },
  {
    "date": "2026-08-30",
    "value": 51,
    "methodology": "3.0"
  }
];
  // Редакционный сид недели 2026-08-30: три главных драйвера недели.
  // Источники — verbatim-записи из calc/input/2026-08-30.json (R55).
s.drivers = [
  {
    "observation": {
      "ru": "Удар дрона по складу оружия в Миле под Киевом унёс жизни не менее 37 человек, сотни жителей эвакуированы; в Киеве за день объявлены 13 воздушных тревог — рекорд с начала полномасштабного вторжения; ракетный удар по Белгороду повредил склад маркетплейса и теплоэлектроцентраль; ВСУ поразили пусковую установку «Искандер-М».",
      "en": "A drone strike on a weapons depot in Myla near Kyiv killed at least 37 people and hundreds were evacuated; Kyiv sounded 13 air raid alerts in a day, a record since the start of the full-scale invasion; a missile strike on Belgorod damaged a marketplace warehouse and a cogeneration plant; Ukrainian forces hit an Iskander-M launcher."
    },
    "why": {
      "ru": "Массированные удары по объектам в глубоком тылу с тяжёлыми последствиями для гражданской инфраструктуры ускоряют обмен ударами и повышают риск вовлечения третьих сторон.",
      "en": "Massed strikes on rear-area targets with heavy consequences for civilian infrastructure accelerate reciprocal attacks and raise the risk of drawing in third parties."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
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
      }
    ],
    "label": {
      "ru": "Удары по глубокому тылу вышли на рекордный уровень",
      "en": "Strikes deep behind the front line reached record intensity"
    }
  },
  {
    "observation": {
      "ru": "Возобновлённая блокада чёрноморских портов остановила экспорт зерна Украины, о чём сообщают Le Monde, France 24 и отраслевое издание World Grain; меры 21-го пакета санкций ЕС вступили в силу 25 августа; напряжённость сохраняется вокруг судоходства Ирана в Ормузском проливе.",
      "en": "The renewed blockade of Black Sea ports has halted Ukrainian grain exports, Le Monde, France 24 and the trade outlet World Grain report; measures of the EU's 21st sanctions package took effect on 25 August; tensions around Iranian shipping in the Strait of Hormuz continued."
    },
    "why": {
      "ru": "Блокада продовольственных маршрутов в сочетании с санкционным ужесточением разрывает цепочки поставок и перекладывает издержки эскалации на третьи страны.",
      "en": "A blockade of food routes combined with tighter sanctions breaks supply chains and shifts the costs of escalation onto third countries."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
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
      }
    ],
    "label": {
      "ru": "Блокада чёрноморских портов остановила экспорт зерна",
      "en": "The blockade of Black Sea ports halted grain exports"
    }
  },
  {
    "observation": {
      "ru": "28 августа с космодрома Плесецк выполнен пуск мобильной межконтинентальной баллистической ракеты «Ярс»; пуск подтверждён независимым мониторингом стратегических сил; публичных угроз применения ядерного оружия в окне зафиксировано не было.",
      "en": "On 28 August a mobile intercontinental ballistic missile Yars was launched from the Plesetsk cosmodrome; the launch was confirmed by independent monitoring of strategic forces; no public threats of nuclear use were recorded in the window."
    },
    "why": {
      "ru": "Учебный пуск — плановый сигнал готовности сил сдерживания: сам по себе он не меняет уровень риска, но фиксирует активность стратегических сил в напряжённый период.",
      "en": "A test launch is a routine signal of deterrent readiness: by itself it does not change the risk level, but it records strategic-forces activity during a tense period."
    },
    "contribution": "medium",
    "confidence": "high",
    "sources": [
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
      }
    ],
    "label": {
      "ru": "Пуск мобильной «Ярс» подтверждён независимым мониторингом",
      "en": "Mobile Yars launch confirmed by independent monitoring"
    }
  }
];
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
