window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
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
})();
