window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-02"] = window.CI_DATA.snapshots["2026-08-02"] || {};
  s.global = {
  "index": 54,
  "delta": 0
};
  s.published = "2026-08-02";
  s.through = "2026-07-26";
  s.methodology = "1.0";
  s.dataState = "published";
  s.regions = {
  "europe": {
    "index": 64,
    "delta": 0,
    "status": "very"
  },
  "east-asia": {
    "index": 49,
    "delta": 0,
    "status": "danger"
  },
  "middle-east": {
    "index": 75,
    "delta": 0,
    "status": "very"
  },
  "north-america": {
    "index": 43,
    "delta": 0,
    "status": "danger"
  },
  "south-asia": {
    "index": 55,
    "delta": 0,
    "status": "danger"
  },
  "africa": {
    "index": 45,
    "delta": 0,
    "status": "danger"
  }
};
  // Миграция таск 09 (R55): новая схема источника, маппинг — как в sources.js
  // демо-недели ('OSINT' — спутниковые/полевые наблюдения, иначе 'secondary';
  // 'A-mainstream' — агентства/СМИ, 'C-registries' — институты и реестры;
  // state_affiliated: true только для dw.com). Тексты не изменены.
  s.regions["europe"] = {
  "index": 64,
  "delta": 0,
  "status": "very",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "В восточных районах региона фиксируется рост числа учений с боевой стрельбой.",
        "en": "More live-fire exercises are being recorded in the region’s eastern districts."
      },
      "why": {
        "ru": "Регулярные учения повышают плотность сил и риск инцидентов на границах.",
        "en": "Regular drills increase force density and the risk of border incidents."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "www-bbc-com-news-articles-c2e2vjl2ry8o",
          "title": {
            "ru": "Станция Чаринг-кросс использована для крупных военных учений",
            "en": "Charing Cross Tube station used for major military exercise"
          },
          "domain": "bbc.com",
          "url": "https://www.bbc.com/news/articles/c2e2vjl2ry8o",
          "publication_date": "2026-05-24",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-dw-com-en-ukraine-9-countries-form-ballistic-missile-defense-coalition-live-77927840",
          "title": {
            "ru": "Украина и девять стран создают коалицию противоракетной обороны",
            "en": "Ukraine, 9 nations form ballistic missile defense coalition"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/en/ukraine-9-countries-form-ballistic-missile-defense-coalition/live-77927840",
          "publication_date": "2026-07-13",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Поставки систем ПВО странам региона продолжаются третий месяц подряд.",
        "en": "Air-defence deliveries to states in the region continue for a third straight month."
      },
      "why": {
        "ru": "Наращивание ПВО сопровождается ростом боевого дежурства в воздушном пространстве.",
        "en": "Air-defence build-up comes with higher alert status in regional airspace."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "www-crisisgroup-org-europe-eastern-europe-ukraine",
          "title": {
            "ru": "CrisisWatch: Украина, июль 2026 года",
            "en": "CrisisWatch Ukraine July 2026"
          },
          "domain": "crisisgroup.org",
          "url": "https://www.crisisgroup.org/europe/eastern-europe/ukraine",
          "publication_date": "2026-06-26",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "www-reuters-com-graphics-india-china-border-bdwpkadxqpm",
          "title": {
            "ru": "Индо-китайский спор: спутниковые снимки показывают новые сооружения возле места пограничного столкновения",
            "en": "India-China dispute: Satellite Images show new structures near site of border clash"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/graphics/INDIA-CHINA/BORDER/bdwpkadxqpm/",
          "publication_date": "2020-06-25",
          "accessed_date": "2026-07-26",
          "source_type": "OSINT",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  // Миграция таск 09 (R55): новая схема источника, маппинг — как в sources.js
  // демо-недели ('OSINT' — спутниковые/полевые наблюдения, иначе 'secondary';
  // 'A-mainstream' — агентства/СМИ, 'C-registries' — институты и реестры;
  // state_affiliated: true только для dw.com). Тексты не изменены.
  s.regions["east-asia"] = {
  "index": 49,
  "delta": 0,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Активность военно-морских учений в ключевом проливе выше среднего уровня за год.",
        "en": "Naval exercise activity in the key strait is above the yearly average."
      },
      "why": {
        "ru": "Устойчивая активность флота в узком проливе повышает риск морских инцидентов.",
        "en": "Sustained fleet activity in a narrow strait raises the risk of maritime incidents."
      },
      "contribution": "medium",
      "confidence": "medium",
      "confidenceNote": {
        "ru": "Неполное покрытие источников по морской зоне.",
        "en": "Incomplete source coverage for the maritime zone."
      },
      "sources": [
        {
          "id": "reliefweb-int-report-mauritania-unhcr-deeply-saddened-144-people-reportedly-dead-or-missing-west-africa",
          "title": {
            "ru": "УВКБ ООН: 144 человека, предположительно, погибли или пропали без вести у берегов Западной Африки",
            "en": "UNHCR deeply saddened as 144 people reportedly dead or missing off West Africa"
          },
          "domain": "reliefweb.int",
          "url": "https://reliefweb.int/report/mauritania/unhcr-deeply-saddened-144-people-reportedly-dead-or-missing-west-africa",
          "publication_date": "2026-07-21",
          "accessed_date": "2026-07-26",
          "source_type": "OSINT",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "www-dw-com-en-ukraine-9-countries-form-ballistic-missile-defense-coalition-live-77927840",
          "title": {
            "ru": "Украина и девять стран создают коалицию противоракетной обороны",
            "en": "Ukraine, 9 nations form ballistic missile defense coalition"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/en/ukraine-9-countries-form-ballistic-missile-defense-coalition/live-77927840",
          "publication_date": "2026-07-13",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Государства региона увеличили частоту патрулирования воздушного пространства.",
        "en": "States in the region increased airspace patrol frequency."
      },
      "why": {
        "ru": "Рост патрулирования — реакция на серию сближений военных самолётов.",
        "en": "More patrols respond to a series of military aircraft close encounters."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "www-bbc-com-news-articles-c2e2vjl2ry8o",
          "title": {
            "ru": "Станция Чаринг-кросс использована для крупных военных учений",
            "en": "Charing Cross Tube station used for major military exercise"
          },
          "domain": "bbc.com",
          "url": "https://www.bbc.com/news/articles/c2e2vjl2ry8o",
          "publication_date": "2026-05-24",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-sipri-org-media-press-release-2026-global-military-spending-rise-continues-european-and-asian-expenditures-surge",
          "title": {
            "ru": "Рост мировых военных расходов продолжается на фоне всплеска трат в Европе и Азии",
            "en": "Global military spending rise continues as European and Asian expenditures surge"
          },
          "domain": "sipri.org",
          "url": "https://www.sipri.org/media/press-release/2026/global-military-spending-rise-continues-european-and-asian-expenditures-surge",
          "publication_date": "2026-04-27",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  // Миграция таск 09 (R55): новая схема источника, маппинг — как в sources.js
  // демо-недели ('OSINT' — спутниковые/полевые наблюдения, иначе 'secondary';
  // 'A-mainstream' — агентства/СМИ, 'C-registries' — институты и реестры;
  // state_affiliated: true только для dw.com). Тексты не изменены.
  s.regions["middle-east"] = {
  "index": 75,
  "delta": 0,
  "status": "very",
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Доступ инспекторов к ряду объектов ограничен, говорится в докладе агентства.",
        "en": "An agency report says inspector access to several facilities is limited."
      },
      "why": {
        "ru": "Снижение прозрачности затрудняет проверку соблюдения обязательств.",
        "en": "Reduced transparency makes it harder to verify compliance with obligations."
      },
      "contribution": "high",
      "confidence": "medium",
      "confidenceNote": {
        "ru": "Меньше данных, чем обычно: часть источников недоступна.",
        "en": "Fewer data than usual: some sources are unavailable."
      },
      "sources": [
        {
          "id": "www-iaea-org-newscenter-news-iaea-board-of-governors-briefed-on-ukraine-iran-and-global-nuclear-cooperation",
          "title": {
            "ru": "Совет управляющих МАГАТЭ проинформирован об Украине, Иране и глобальном сотрудничестве",
            "en": "IAEA Board of Governors Briefed on Ukraine, Iran and Global Nuclear Cooperation"
          },
          "domain": "iaea.org",
          "url": "https://www.iaea.org/newscenter/news/iaea-board-of-governors-briefed-on-ukraine-iran-and-global-nuclear-cooperation",
          "publication_date": "2026-06-09",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "news-un-org-en-story-2026-07-1167860",
          "title": {
            "ru": "Совет Безопасности: экстренное заседание по иранской атаке в Бахрейне",
            "en": "Security Council LIVE: Emergency meeting on Iranian attack in Bahrain"
          },
          "domain": "un.org",
          "url": "https://news.un.org/en/story/2026/07/1167860",
          "publication_date": "2026-07-02",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Гуманитарные коридоры работают с перебоями, по данным гуманитарных организаций.",
        "en": "Humanitarian organisations report that corridors are operating intermittently."
      },
      "why": {
        "ru": "Нестабильные коридоры сопровождаются ростом локальных столкновений.",
        "en": "Unstable corridors coincide with more local clashes."
      },
      "contribution": "high",
      "confidence": "low",
      "sources": [
        {
          "id": "reliefweb-int-report-south-sudan-south-sudan-humanitarian-access-snapshot-may-2026",
          "title": {
            "ru": "Южный Судан: снимок гуманитарного доступа (май 2026 года)",
            "en": "South Sudan: Humanitarian Access Snapshot (May 2026)"
          },
          "domain": "reliefweb.int",
          "url": "https://reliefweb.int/report/south-sudan/south-sudan-humanitarian-access-snapshot-may-2026",
          "publication_date": "2026-06-15",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "apnews-com-article-pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
          "title": {
            "ru": "Пакистан наносит удары по Афганистану; пограничные бои не стихают",
            "en": "Pakistan strikes inside Afghanistan with no letup in border fighting"
          },
          "domain": "apnews.com",
          "url": "https://apnews.com/article/pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
          "publication_date": "2026-02-28",
          "accessed_date": "2026-07-26",
          "source_type": "OSINT",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "news-un-org-en-story-2026-07-1167860-2",
          "title": {
            "ru": "Совет Безопасности: экстренное заседание по иранской атаке в Бахрейне",
            "en": "Security Council LIVE: Emergency meeting on Iranian attack in Bahrain"
          },
          "domain": "un.org",
          "url": "https://news.un.org/en/story/2026/07/1167860",
          "publication_date": "2026-07-02",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  // Миграция таск 09 (R55): новая схема источника, маппинг — как в sources.js
  // демо-недели ('OSINT' — спутниковые/полевые наблюдения, иначе 'secondary';
  // 'A-mainstream' — агентства/СМИ, 'C-registries' — институты и реестры;
  // state_affiliated: true только для dw.com). Тексты не изменены.
  s.regions["north-america"] = {
  "index": 43,
  "delta": 0,
  "status": "danger",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "В регионе завершён цикл учений стратегических сил без отклонений.",
        "en": "The region completed a strategic forces exercise cycle without incidents."
      },
      "why": {
        "ru": "Завершение цикла без инцидентов снижает краткосрочную напряжённость.",
        "en": "An incident-free cycle lowers short-term tension."
      },
      "contribution": "low",
      "confidence": "high",
      "sources": [
        {
          "id": "www-dw-com-en-ukraine-9-countries-form-ballistic-missile-defense-coalition-live-77927840",
          "title": {
            "ru": "Украина и девять стран создают коалицию противоракетной обороны",
            "en": "Ukraine, 9 nations form ballistic missile defense coalition"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/en/ukraine-9-countries-form-ballistic-missile-defense-coalition/live-77927840",
          "publication_date": "2026-07-13",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": true
        },
        {
          "id": "www-sipri-org-media-press-release-2026-global-military-spending-rise-continues-european-and-asian-expenditures-surge",
          "title": {
            "ru": "Рост мировых военных расходов продолжается на фоне всплеска трат в Европе и Азии",
            "en": "Global military spending rise continues as European and Asian expenditures surge"
          },
          "domain": "sipri.org",
          "url": "https://www.sipri.org/media/press-release/2026/global-military-spending-rise-continues-european-and-asian-expenditures-surge",
          "publication_date": "2026-04-27",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Дипломатические контакты по линии оборонных ведомств сохраняются.",
        "en": "Defence-ministry diplomatic contacts remain in place."
      },
      "why": {
        "ru": "Рабочие каналы связи снижают риск ошибочной эскалации.",
        "en": "Working communication channels reduce the risk of accidental escalation."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "news-un-org-en-story-2026-07-1167860",
          "title": {
            "ru": "Совет Безопасности: экстренное заседание по иранской атаке в Бахрейне",
            "en": "Security Council LIVE: Emergency meeting on Iranian attack in Bahrain"
          },
          "domain": "un.org",
          "url": "https://news.un.org/en/story/2026/07/1167860",
          "publication_date": "2026-07-02",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-reuters-com-graphics-india-china-border-bdwpkadxqpm",
          "title": {
            "ru": "Индо-китайский спор: спутниковые снимки показывают новые сооружения возле места пограничного столкновения",
            "en": "India-China dispute: Satellite Images show new structures near site of border clash"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/graphics/INDIA-CHINA/BORDER/bdwpkadxqpm/",
          "publication_date": "2020-06-25",
          "accessed_date": "2026-07-26",
          "source_type": "OSINT",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  // Миграция таск 09 (R55): новая схема источника, маппинг — как в sources.js
  // демо-недели ('OSINT' — спутниковые/полевые наблюдения, иначе 'secondary';
  // 'A-mainstream' — агентства/СМИ, 'C-registries' — институты и реестры;
  // state_affiliated: true только для dw.com). Тексты не изменены.
  s.regions["south-asia"] = {
  "index": 55,
  "delta": 0,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Обстрелы на линии разграничения участились по данным наблюдателей.",
        "en": "Observers report more exchanges of fire along the line of control."
      },
      "why": {
        "ru": "Частые обстрелы поддерживают высокий уровень боевого сдерживания.",
        "en": "Frequent fire keeps the level of military deterrence high."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "apnews-com-article-pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
          "title": {
            "ru": "Пакистан наносит удары по Афганистану; пограничные бои не стихают",
            "en": "Pakistan strikes inside Afghanistan with no letup in border fighting"
          },
          "domain": "apnews.com",
          "url": "https://apnews.com/article/pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
          "publication_date": "2026-02-28",
          "accessed_date": "2026-07-26",
          "source_type": "OSINT",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "reliefweb-int-report-south-sudan-south-sudan-humanitarian-access-snapshot-may-2026",
          "title": {
            "ru": "Южный Судан: снимок гуманитарного доступа (май 2026 года)",
            "en": "South Sudan: Humanitarian Access Snapshot (May 2026)"
          },
          "domain": "reliefweb.int",
          "url": "https://reliefweb.int/report/south-sudan/south-sudan-humanitarian-access-snapshot-may-2026",
          "publication_date": "2026-06-15",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "В регионе испытываются новые ракетные комплексы средней дальности.",
        "en": "New medium-range missile systems are being tested in the region."
      },
      "why": {
        "ru": "Испытания ракет средней дальности усиливают циклы демонстрации сил.",
        "en": "Medium-range missile tests strengthen cycles of shows of force."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "www-dw-com-en-ukraine-9-countries-form-ballistic-missile-defense-coalition-live-77927840",
          "title": {
            "ru": "Украина и девять стран создают коалицию противоракетной обороны",
            "en": "Ukraine, 9 nations form ballistic missile defense coalition"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/en/ukraine-9-countries-form-ballistic-missile-defense-coalition/live-77927840",
          "publication_date": "2026-07-13",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": true
        },
        {
          "id": "www-reuters-com-graphics-india-china-border-bdwpkadxqpm",
          "title": {
            "ru": "Индо-китайский спор: спутниковые снимки показывают новые сооружения возле места пограничного столкновения",
            "en": "India-China dispute: Satellite Images show new structures near site of border clash"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/graphics/INDIA-CHINA/BORDER/bdwpkadxqpm/",
          "publication_date": "2020-06-25",
          "accessed_date": "2026-07-26",
          "source_type": "OSINT",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  // Миграция таск 09 (R55): новая схема источника, маппинг — как в sources.js
  // демо-недели ('OSINT' — спутниковые/полевые наблюдения, иначе 'secondary';
  // 'A-mainstream' — агентства/СМИ, 'C-registries' — институты и реестры;
  // state_affiliated: true только для dw.com). Тексты не изменены.
  s.regions["africa"] = {
  "index": 45,
  "delta": 0,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "В соседних государствах региона активизировались переговоры о перемирии.",
        "en": "Truce talks have intensified among neighbouring states in the region."
      },
      "why": {
        "ru": "Переговорный трек снижает риск распространения конфликта.",
        "en": "A negotiation track lowers the risk of the conflict spreading."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "news-un-org-en-story-2026-07-1167860",
          "title": {
            "ru": "Совет Безопасности: экстренное заседание по иранской атаке в Бахрейне",
            "en": "Security Council LIVE: Emergency meeting on Iranian attack in Bahrain"
          },
          "domain": "un.org",
          "url": "https://news.un.org/en/story/2026/07/1167860",
          "publication_date": "2026-07-02",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "reliefweb-int-report-south-sudan-south-sudan-humanitarian-access-snapshot-may-2026",
          "title": {
            "ru": "Южный Судан: снимок гуманитарного доступа (май 2026 года)",
            "en": "South Sudan: Humanitarian Access Snapshot (May 2026)"
          },
          "domain": "reliefweb.int",
          "url": "https://reliefweb.int/report/south-sudan/south-sudan-humanitarian-access-snapshot-may-2026",
          "publication_date": "2026-06-15",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Гуманитарные организации фиксируют рост перемещённых лиц в приграничных районах.",
        "en": "Aid organisations record more displaced people in border areas."
      },
      "why": {
        "ru": "Потоки перемещённых лиц — индикатор устойчивой нестабильности в приграничье.",
        "en": "Displacement flows signal persistent instability near borders."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "reliefweb-int-report-south-sudan-south-sudan-humanitarian-access-snapshot-may-2026-2",
          "title": {
            "ru": "Южный Судан: снимок гуманитарного доступа (май 2026 года)",
            "en": "South Sudan: Humanitarian Access Snapshot (May 2026)"
          },
          "domain": "reliefweb.int",
          "url": "https://reliefweb.int/report/south-sudan/south-sudan-humanitarian-access-snapshot-may-2026",
          "publication_date": "2026-06-15",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "apnews-com-article-pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
          "title": {
            "ru": "Пакистан наносит удары по Афганистану; пограничные бои не стихают",
            "en": "Pakistan strikes inside Afghanistan with no letup in border fighting"
          },
          "domain": "apnews.com",
          "url": "https://apnews.com/article/pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
          "publication_date": "2026-02-28",
          "accessed_date": "2026-07-26",
          "source_type": "OSINT",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.trend = [
  {
    "date": "2026-05-17",
    "value": 38
  },
  {
    "date": "2026-05-24",
    "value": 40
  },
  {
    "date": "2026-05-31",
    "value": 41
  },
  {
    "date": "2026-06-07",
    "value": 41
  },
  {
    "date": "2026-06-14",
    "value": 44
  },
  {
    "date": "2026-06-21",
    "value": 46
  },
  {
    "date": "2026-06-28",
    "value": 47
  },
  {
    "date": "2026-07-05",
    "value": 48
  },
  {
    "date": "2026-07-12",
    "value": 49
  },
  {
    "date": "2026-07-19",
    "value": 51
  },
  {
    "date": "2026-07-26",
    "value": 53
  },
  {
    "date": "2026-08-02",
    "value": 54
  }
];
  // Миграция таск 09 (R55): новая схема источника. source_type: 'OSINT' —
  // спутниковые/полевые наблюдения, иначе 'secondary'. cluster_id: 'A-mainstream'
  // — информационные агентства/СМИ, 'C-registries' — институты и реестры.
  // state_affiliated: true только для dw.com (общественно-правовое вещание,
  // финансируется государством). Отображаемые тексты не изменены.
s.drivers = [
  {
    "label": {
      "ru": "Военная активность выросла",
      "en": "Military activity increased"
    },
    "observation": {
      "ru": "Спутниковые снимки фиксируют переброску дополнительных сил в приграничных округах двух государств.",
      "en": "Satellite imagery shows additional troop movements in the border districts of two states."
    },
    "why": {
      "ru": "Сосредоточение группировок сокращает время реакции сторон и повышает риск случайного столкновения.",
      "en": "Concentrated forces shorten reaction time and raise the risk of an unintended clash."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "www-reuters-com-graphics-india-china-border-bdwpkadxqpm",
        "title": {
          "ru": "Индо-китайский спор: спутниковые снимки показывают новые сооружения возле места пограничного столкновения",
          "en": "India-China dispute: Satellite Images show new structures near site of border clash"
        },
        "domain": "reuters.com",
        "url": "https://www.reuters.com/graphics/INDIA-CHINA/BORDER/bdwpkadxqpm/",
        "publication_date": "2020-06-25",
        "accessed_date": "2026-07-26",
        "source_type": "OSINT",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "apnews-com-article-pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
        "title": {
          "ru": "Пакистан наносит удары по Афганистану; пограничные бои не стихают",
          "en": "Pakistan strikes inside Afghanistan with no letup in border fighting"
        },
        "domain": "apnews.com",
        "url": "https://apnews.com/article/pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
        "publication_date": "2026-02-28",
        "accessed_date": "2026-07-26",
        "source_type": "OSINT",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "www-dw-com-en-ukraine-9-countries-form-ballistic-missile-defense-coalition-live-77927840",
        "title": {
          "ru": "Украина и девять стран создают коалицию противоракетной обороны",
          "en": "Ukraine, 9 nations form ballistic missile defense coalition"
        },
        "domain": "dw.com",
        "url": "https://www.dw.com/en/ukraine-9-countries-form-ballistic-missile-defense-coalition/live-77927840",
        "publication_date": "2026-07-13",
        "accessed_date": "2026-07-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": true
      }
    ]
  },
  {
    "label": {
      "ru": "Интенсивность столкновений выросла",
      "en": "Clash intensity increased"
    },
    "observation": {
      "ru": "Число боестолкновений вдоль линии соприкосновения за неделю выросло по данным независимого мониторинга.",
      "en": "Independent monitoring recorded more clashes along the line of contact this week."
    },
    "why": {
      "ru": "Устойчивый рост интенсивности — один из самых стабильных признаков нарастания риска.",
      "en": "A steady rise in intensity is one of the most persistent signs of growing risk."
    },
    "contribution": "high",
    "confidence": "medium",
    "confidenceNote": {
      "ru": "Независимые источники дают противоречивые показания по интенсивности.",
      "en": "Independent sources give conflicting readings on intensity."
    },
    "sources": [
      {
        "id": "apnews-com-article-pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
        "title": {
          "ru": "Пакистан наносит удары по Афганистану; пограничные бои не стихают",
          "en": "Pakistan strikes inside Afghanistan with no letup in border fighting"
        },
        "domain": "apnews.com",
        "url": "https://apnews.com/article/pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
        "publication_date": "2026-02-28",
        "accessed_date": "2026-07-26",
        "source_type": "OSINT",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "news-un-org-en-story-2026-07-1167860",
        "title": {
          "ru": "Совет Безопасности: экстренное заседание по иранской атаке в Бахрейне",
          "en": "Security Council LIVE: Emergency meeting on Iranian attack in Bahrain"
        },
        "domain": "un.org",
        "url": "https://news.un.org/en/story/2026/07/1167860",
        "publication_date": "2026-07-02",
        "accessed_date": "2026-07-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  },
  {
    "label": {
      "ru": "Оборонные расходы растут",
      "en": "Defence spending is rising"
    },
    "observation": {
      "ru": "Несколько государств объявили об увеличении оборонных бюджетов на следующий финансовый год.",
      "en": "Several states announced higher defence budgets for the next fiscal year."
    },
    "why": {
      "ru": "Серийный рост расходов отражает ожидание длительного периода напряжённости.",
      "en": "Serial spending growth reflects expectations of a prolonged period of tension."
    },
    "contribution": "medium",
    "confidence": "high",
    "sources": [
      {
        "id": "www-sipri-org-media-press-release-2026-global-military-spending-rise-continues-european-and-asian-expenditures-surge",
        "title": {
          "ru": "Рост мировых военных расходов продолжается на фоне всплеска трат в Европе и Азии",
          "en": "Global military spending rise continues as European and Asian expenditures surge"
        },
        "domain": "sipri.org",
        "url": "https://www.sipri.org/media/press-release/2026/global-military-spending-rise-continues-european-and-asian-expenditures-surge",
        "publication_date": "2026-04-27",
        "accessed_date": "2026-07-26",
        "source_type": "secondary",
        "cluster_id": "C-registries",
        "state_affiliated": false
      },
      {
        "id": "www-crisisgroup-org-europe-eastern-europe-ukraine",
        "title": {
          "ru": "CrisisWatch: Украина, июль 2026 года",
          "en": "CrisisWatch Ukraine July 2026"
        },
        "domain": "crisisgroup.org",
        "url": "https://www.crisisgroup.org/europe/eastern-europe/ukraine",
        "publication_date": "2026-06-26",
        "accessed_date": "2026-07-26",
        "source_type": "secondary",
        "cluster_id": "C-registries",
        "state_affiliated": false
      }
    ]
  }
];
  // Миграция таск 09 (R55): новая схема источника. source_type: 'OSINT' —
  // спутниковые/полевые наблюдения, иначе 'secondary'. cluster_id: 'A-mainstream'
  // — информационные агентства/СМИ, 'C-registries' — институты и реестры.
  // state_affiliated: true только для dw.com (общественно-правовое вещание,
  // финансируется государством). Отображаемые тексты не изменены.
  s.sources = [
  {
    "id": "www-reuters-com-graphics-india-china-border-bdwpkadxqpm",
    "title": {
      "ru": "Индо-китайский спор: спутниковые снимки показывают новые сооружения возле места пограничного столкновения",
      "en": "India-China dispute: Satellite Images show new structures near site of border clash"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/graphics/INDIA-CHINA/BORDER/bdwpkadxqpm/",
    "publication_date": "2020-06-25",
    "accessed_date": "2026-07-26",
    "source_type": "OSINT",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "apnews-com-article-pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
    "title": {
      "ru": "Пакистан наносит удары по Афганистану; пограничные бои не стихают",
      "en": "Pakistan strikes inside Afghanistan with no letup in border fighting"
    },
    "domain": "apnews.com",
    "url": "https://apnews.com/article/pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
    "publication_date": "2026-02-28",
    "accessed_date": "2026-07-26",
    "source_type": "OSINT",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-dw-com-en-ukraine-9-countries-form-ballistic-missile-defense-coalition-live-77927840",
    "title": {
      "ru": "Украина и девять стран создают коалицию противоракетной обороны",
      "en": "Ukraine, 9 nations form ballistic missile defense coalition"
    },
    "domain": "dw.com",
    "url": "https://www.dw.com/en/ukraine-9-countries-form-ballistic-missile-defense-coalition/live-77927840",
    "publication_date": "2026-07-13",
    "accessed_date": "2026-07-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": true
  },
  {
    "id": "news-un-org-en-story-2026-07-1167860",
    "title": {
      "ru": "Совет Безопасности: экстренное заседание по иранской атаке в Бахрейне",
      "en": "Security Council LIVE: Emergency meeting on Iranian attack in Bahrain"
    },
    "domain": "un.org",
    "url": "https://news.un.org/en/story/2026/07/1167860",
    "publication_date": "2026-07-02",
    "accessed_date": "2026-07-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-sipri-org-media-press-release-2026-global-military-spending-rise-continues-european-and-asian-expenditures-surge",
    "title": {
      "ru": "Рост мировых военных расходов продолжается на фоне всплеска трат в Европе и Азии",
      "en": "Global military spending rise continues as European and Asian expenditures surge"
    },
    "domain": "sipri.org",
    "url": "https://www.sipri.org/media/press-release/2026/global-military-spending-rise-continues-european-and-asian-expenditures-surge",
    "publication_date": "2026-04-27",
    "accessed_date": "2026-07-26",
    "source_type": "secondary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "www-crisisgroup-org-europe-eastern-europe-ukraine",
    "title": {
      "ru": "CrisisWatch: Украина, июль 2026 года",
      "en": "CrisisWatch Ukraine July 2026"
    },
    "domain": "crisisgroup.org",
    "url": "https://www.crisisgroup.org/europe/eastern-europe/ukraine",
    "publication_date": "2026-06-26",
    "accessed_date": "2026-07-26",
    "source_type": "secondary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  }
];
})();
