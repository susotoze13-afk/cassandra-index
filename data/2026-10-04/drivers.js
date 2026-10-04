window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-04"] = window.CI_DATA.snapshots["2026-10-04"] || {};
  // Редакционный сид недели 2026-10-04: три главных драйвера недели.
  // Источники — verbatim-записи из calc/input/2026-10-04.json (R55).
s.drivers = [
  {
    "label": {
      "ru": "Ядерная риторика и удары по энергетике усилились",
      "en": "Nuclear rhetoric and energy strikes intensified"
    },
    "observation": {
      "ru": "Россия направила НАТО дипломатическое предупреждение о готовности применить всё вооружение, включая ядерное; Альянс публично осудил «безответственную ядерную риторику» Москвы. Одновременно Россия нанесла крупнейшую за месяцы атаку на энергосеть Украины (семь погибших), а украинские дроны ударили по крупному НПЗ и нефтепроводному узлу в Самарской области.",
      "en": "Russia sent NATO a diplomatic warning that it was ready to use all weapons, including nuclear ones; the alliance publicly condemned Moscow's 'irresponsible nuclear rhetoric'. At the same time Russia launched its biggest energy-grid attack on Ukraine in months (seven killed), while Ukrainian drones struck a major refinery and oil pipeline hub in the Samara region."
    },
    "why": {
      "ru": "Публичные ядерные предупреждения на высоком уровне в сочетании с ударами по критической энергетике расширяют пространство эскалации и повышают риск неверного шага.",
      "en": "High-level public nuclear warnings combined with strikes on critical energy infrastructure widen the space for escalation and raise the risk of a miscalculation."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "reuters-russia-nuclear-warning-kaliningrad",
        "title": {
          "ru": "Россия направила НАТО ядерное предупреждение на фоне роста напряжённости в Балтике",
          "en": "Russia sends nuclear warning to NATO as tensions rise in the Baltic"
        },
        "domain": "reuters.com",
        "url": "https://www.reuters.com/business/aerospace-defense/russia-issues-nuclear-warning-nato-tensions-rise-baltic-2026-09-30/",
        "publication_date": "2026-09-30",
        "accessed_date": "2026-10-04",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "tass-nato-confirms-russian-warning",
        "title": {
          "ru": "Генсек НАТО подтвердил получение российского предупреждения о возможной блокаде Калининграда",
          "en": "NATO chief confirms receipt of Russian warning over potential Kaliningrad blockade"
        },
        "domain": "tass.com",
        "url": "https://tass.com/world/2195299",
        "publication_date": "2026-09-30",
        "accessed_date": "2026-10-04",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "guardian-power-grid-attack",
        "title": {
          "ru": "Сводка войны в Украине: Россия обрушилась на энергосеть, семь погибших — крупнейшая атака за месяцы",
          "en": "Ukraine war briefing: Russia pounds power grid with seven killed in biggest energy attack in months"
        },
        "domain": "theguardian.com",
        "url": "https://www.theguardian.com/world/2026/oct/01/ukraine-war-briefing-russia-pounds-power-grid-with-seven-killed-in-biggest-energy-attack-in-months",
        "publication_date": "2026-10-01",
        "accessed_date": "2026-10-04",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "hindustantimes-samara-refinery-drones",
        "title": {
          "ru": "Украина атаковала дронами крупный российский НПЗ и узел нефтепроводов в Самарской области",
          "en": "Ukraine attacks major Russian refinery and oil pipeline hub with drones in Samara region"
        },
        "domain": "hindustantimes.com",
        "url": "https://www.hindustantimes.com/world-news/ukraine-attacks-major-russian-refinery-and-oil-pipeline-hub-with-drones-in-samara-region-101790959628787.html",
        "publication_date": "2026-10-02",
        "accessed_date": "2026-10-04",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  },
  {
    "label": {
      "ru": "Санкции и энергетическое давление сжали рынки",
      "en": "Sanctions and energy pressure squeezed markets"
    },
    "observation": {
      "ru": "США ввели санкции против 13 лиц и компаний за закупки оружия и компонентов для Ирана и перекрыли сеть финансирования ХАМАС. На фоне ограничений движения в Ормузском проливе G7 и МЭА выпустили 325 млн баррелей нефти из стратегических резервов, но атаки на танкеры в проливе продолжились.",
      "en": "The US sanctioned 13 people and companies over weapons procurement for Iran and cut off a Hamas financing network. Against shipping restrictions in the Strait of Hormuz, the G7 and IEA released 325 million barrels of oil from strategic reserves, yet tanker attacks in the strait continued."
    },
    "why": {
      "ru": "Одновременное санкционное давление и системные удары по торговому пути через Ормуз бьют по мировой энергетике и связывают военную и экономическую эскалацию в один узел.",
      "en": "Simultaneous sanctions pressure and sustained attacks on the Hormuz trade route hit global energy and tie military and economic escalation into a single knot."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "reuters-us-sanctions-iran-weapons-procurement",
        "title": {
          "ru": "США ввели санкции против 13 лиц и компаний в связи с закупками оружия для Ирана",
          "en": "US imposes sanctions on 13 tied to Iran weapons procurement"
        },
        "domain": "reuters.com",
        "url": "https://www.reuters.com/world/asia-pacific/us-sanctions-10-over-allegedly-procuring-weapons-iran-2026-09-29/",
        "publication_date": "2026-09-29",
        "accessed_date": "2026-10-04",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "state-us-cuts-off-hamas-financing",
        "title": {
          "ru": "США перекрыли сеть финансирования ХАМАС",
          "en": "United States Cuts Off Hamas Financing Network"
        },
        "domain": "state.gov",
        "url": "https://www.state.gov/releases/office-of-the-spokesperson/2026/10/united-states-cuts-off-hamas-financing-network/",
        "publication_date": "2026-10-02",
        "accessed_date": "2026-10-04",
        "source_type": "primary",
        "cluster_id": "C-registries",
        "state_affiliated": true
      },
      {
        "id": "straitstimes-iea-325m-barrels-released",
        "title": {
          "ru": "ИЭА: из стратегических резервов выпущено 325 млн баррелей нефти",
          "en": "325 million barrels of oil released from strategic reserves: IEA"
        },
        "domain": "straitstimes.com",
        "url": "https://www.straitstimes.com/world/325-million-barrels-of-oil-from-strategic-reserves-released-says-international-energy-agency",
        "publication_date": "2026-10-03",
        "accessed_date": "2026-10-04",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "gulfnews-oil-tankers-attacked-hormuz",
        "title": {
          "ru": "Танкеры атакованы в Ормузском проливе — британская морская служба",
          "en": "Oil tankers attacked in Hormuz strait: UK maritime agency"
        },
        "domain": "gulfnews.com",
        "url": "https://gulfnews.com/world/mena/oil-tankers-attacked-in-hormuz-strait-uk-maritime-agency-1.500696517",
        "publication_date": "2026-10-03",
        "accessed_date": "2026-10-04",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  },
  {
    "label": {
      "ru": "Вывод войск США из Ирака на фоне торговой войны союзников",
      "en": "US troops leave Iraq amid allied trade war"
    },
    "observation": {
      "ru": "Пентагон 30.09 подтвердил полное завершение вывода войск США из Ирака, закрыв 23-летнее присутствие. В тот же день в силу вступили американские импортные запреты на ряд канадских товаров (алкоголь, молочная продукция, мотоциклы) — эскалация торгового конфликта внутри НАТО.",
      "en": "On 30.09 the Pentagon confirmed the completed withdrawal of US troops from Iraq, ending a 23-year presence. The same day US import bans on a range of Canadian goods (alcohol, dairy, motorcycles) took effect — an escalation of the trade conflict inside NATO."
    },
    "why": {
      "ru": "Крупнейшее деэскалационное событие недели уравновешивается торговым конфликтом между союзниками, который подрывает единство альянса и экономическую устойчивость.",
      "en": "The week's largest de-escalation event is balanced by a trade conflict between allies that undermines alliance cohesion and economic resilience."
    },
    "contribution": "medium",
    "confidence": "high",
    "sources": [
      {
        "id": "theguardian-com-pentagon-withdrawal-iraq",
        "title": {
          "ru": "Пентагон сообщает о формальном завершении вывода войск США из Ирака",
          "en": "Pentagon says it has formally completed withdrawal of US troops from Iraq"
        },
        "domain": "theguardian.com",
        "url": "https://www.theguardian.com/us-news/2026/sep/30/pentagon-formal-withdrawal-troops-iraq",
        "publication_date": "2026-09-30",
        "accessed_date": "2026-10-04",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "cnn-com-us-troops-complete-iraq-exit",
        "title": {
          "ru": "Войска США завершили выход из Ирака, Иран и его союзники празднуют",
          "en": "US troops complete Iraq exit, as Iran and its allies celebrate"
        },
        "domain": "cnn.com",
        "url": "https://www.cnn.com/2026/09/30/middleeast/us-military-withdrawal-iraq-intl",
        "publication_date": "2026-09-30",
        "accessed_date": "2026-10-04",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "cnbc-canada-import-ban-in-force",
        "title": {
          "ru": "Американские ограничения на импорт канадских товаров вступили в силу: список запрещённых товаров",
          "en": "America's Canadian import restrictions come into force. Here are the products barred"
        },
        "domain": "cnbc.com",
        "url": "https://www.cnbc.com/2026/09/29/canada-import-ban-trade-war.html",
        "publication_date": "2026-09-29",
        "accessed_date": "2026-10-04",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "guardian-us-ban-on-canadian-imports",
        "title": {
          "ru": "Запрет США на канадский импорт грозит ещё больше ослабить хрупкие отношения",
          "en": "US ban on Canadian imports likely to weaken already fragile relations"
        },
        "domain": "theguardian.com",
        "url": "https://www.theguardian.com/us-news/2026/sep/29/ban-canada-imports",
        "publication_date": "2026-09-29",
        "accessed_date": "2026-10-04",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  }
];
})();
