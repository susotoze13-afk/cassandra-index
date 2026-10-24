window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  s.global = {
  "index": 42,
  "delta": -9
};
  s.published = "2026-09-06";
  s.through = "2026-09-06";
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
  s.sensitivity = 2.5;
  s.coverageCriteria = {
  "covered": 41,
  "total": 46,
  "uncovered": [
    "D6.2",
    "D6.3",
    "D9.1",
    "D9.6b",
    "D9.7"
  ]
};
  s.recalc = {
  "at": "2026-10-24T17:50:46.246Z",
  "reason": "Еженедельный пересчёт",
  "previous": 42,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
  s.regions = {
  "europe": {
    "index": 44,
    "delta": -4,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 33,
    "delta": -9,
    "status": "tense",
    "background": true
  },
  "middle-east": {
    "index": 40,
    "delta": -9,
    "status": "tense",
    "background": true
  },
  "north-america": {
    "index": 23,
    "delta": -9,
    "status": "tense",
    "background": true
  },
  "south-asia": {
    "index": 45,
    "delta": -4,
    "status": "danger",
    "background": false
  },
  "africa": {
    "index": 44,
    "delta": -9,
    "status": "danger",
    "background": false
  }
};
  s.regions["europe"] = {
  "index": 44,
  "delta": -4,
  "status": "danger",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Германия обвинила Россию в атаке дронов в аэропорту Лейпцига и анонсировала закрытие Русского дома и генконсульства; Берлин ввёл санкции в ответ на диверсию.",
        "en": "Germany accused Russia of a drone attack at Leipzig airport and announced the closure of the Russian House and its consulate general; Berlin imposed sanctions in response to the sabotage."
      },
      "why": {
        "ru": "Инцидент на территории страны НАТО и взаимные меры ухудшают доверие между столицами и повышают риск цепных реакций.",
        "en": "An incident on NATO territory and reciprocal measures erode trust between capitals and raise the risk of chain reactions."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "kommersant-ru-germany-accuses-leipzig-8923569",
          "title": {
            "ru": "Германия обвинила Россию в инциденте с дроном в аэропорту Лейпцига",
            "en": "Germany accuses Russia over drone incident at Leipzig airport"
          },
          "domain": "kommersant.ru",
          "url": "https://www.kommersant.ru/doc/8923569",
          "publication_date": "2026-09-01",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "kommersant-ru-leipzig-consulate-closure-8924215",
          "title": {
            "ru": "Германия обвинила Россию в атаке дронов в Лейпциге и анонсировала закрытие Русского дома и генконсульства",
            "en": "Germany accuses Russia of Leipzig drone attack, announces closure of Russian House and consulate general"
          },
          "domain": "kommersant.ru",
          "url": "https://www.kommersant.ru/doc/8924215",
          "publication_date": "2026-09-02",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "dw-com-germany-response-leipzig-sanctions",
          "title": {
            "ru": "Ответ Германии на диверсию с дронами в Лейпциге: обвинение в адрес России и санкции",
            "en": "Germany's response to Leipzig drone sabotage: accusations against Russia and sanctions"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/ru/otvet-germanii-na-diversiu-s-dronami-v-lejpcige/a-78844842",
          "publication_date": "2026-09-03",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "В Латвии начались учения Namejs-2026 с участием 12 тысяч военнослужащих; Путин вновь публично опроверг слухи о мобилизации после выборов в Госдуму; издания разбирают сценарий новой волны призыва.",
        "en": "Exercise Namejs-2026 began in Latvia with 12,000 troops; Putin again publicly denied rumours of mobilisation after the Duma elections; outlets examine the scenario of a new conscription wave."
      },
      "why": {
        "ru": "Плотность учений на фланге альянса в сочетании с мобилизационной риторикой удерживает повышенную готовность сил.",
        "en": "Dense drills on the alliance’s flank combined with mobilisation rhetoric keep forces at heightened readiness."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "ura-news-namejs-2026-latvia-start",
          "title": {
            "ru": "В Латвии начались учения НАТО Namejs-2026 с участием 12 тысяч военнослужащих из США, Канады и Прибалтики",
            "en": "NATO's Namejs-2026 exercise begins in Latvia with 12,000 troops from the US, Canada and the Baltics"
          },
          "domain": "ura.news",
          "url": "https://ura.news/news/1053123716",
          "publication_date": "2026-09-02",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "ura-news-putin-otverg-mobilizaciyu",
          "title": {
            "ru": "Путин вновь опроверг слухи о мобилизации после выборов в Госдуму",
            "en": "Putin again denies rumours of mobilisation after State Duma elections"
          },
          "domain": "ura.news",
          "url": "https://ura.news/news/1053123991",
          "publication_date": "2026-09-03",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "klerk-ru-mobilization-after-elections",
          "title": {
            "ru": "Мобилизация после выборов 2026 года: будет ли новая волна",
            "en": "Mobilisation after the 2026 elections: will there be a new wave"
          },
          "domain": "klerk.ru",
          "url": "https://www.klerk.ru/buh/articles/707264/",
          "publication_date": "2026-09-02",
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
  "index": 33,
  "delta": -9,
  "status": "tense",
  "background": true,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Южная Корея заявила в ООН, что сотрудничество России и КНДР затягивает войну против Украины; тема связки Москвы и Пхеньяна прозвучала на площадке Организации Объединённых Наций.",
        "en": "South Korea told the UN that Russia-DPRK cooperation is prolonging the war against Ukraine; the Moscow-Pyongyang alignment was raised at the United Nations."
      },
      "why": {
        "ru": "Публичная фиксация военной связки в ООН повышает цену северокорейской поддержки России и усиливает внимание к региону.",
        "en": "Publicly recording the military alignment at the UN raises the cost of North Korea’s support for Russia and sharpens focus on the region."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "zn-ua-south-korea-un-rf-dprk",
          "title": {
            "ru": "Южная Корея заявила в ООН, что сотрудничество между РФ и КНДР затягивает войну в Украине",
            "en": "South Korea tells UN that Russia-DPRK cooperation prolongs the war in Ukraine"
          },
          "domain": "zn.ua",
          "url": "https://zn.ua/war/juzhnaja-koreja-zajavila-v-oon-chto-sotrudnichestvo-mezhdu-rf-i-kndr-zatjahivaet-vojnu-v-ukraine.html",
          "publication_date": "2026-09-02",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "apostrophe-ua-south-korea-un-rf-dprk",
          "title": {
            "ru": "Россия и КНДР затягивают войну против Украины: заявление Южной Кореи в ООН",
            "en": "Russia and North Korea prolonging war against Ukraine: South Korea's statement at UN"
          },
          "domain": "apostrophe.ua",
          "url": "https://apostrophe.ua/ru/politics/foreign-policy/rossija-i-kndr-zatjahivajut-vojnu-protiv-ukrainy-zajavlenie-juzhnoj-korei-v-oon-.html",
          "publication_date": "2026-09-02",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "6 сентября в России произошёл массовый сбой интернета; среди причин названы учения по автономности Рунета; мобильный интернет работал нестабильно.",
        "en": "On 6 September a mass internet outage hit Russia; exercises of the Runet’s autonomy were named among the causes; mobile internet was unstable."
      },
      "why": {
        "ru": "Контроль и автономность цифровой инфраструктуры — признак подготовки к устойчивой работе в условиях длительной конфронтации, за которой наблюдают и азиатские столицы.",
        "en": "Control and autonomy of digital infrastructure signals preparation for resilient operation during prolonged confrontation, watched closely by Asian capitals."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "techora-mass-internet-shutdown-september-6",
          "title": {
            "ru": "6 сентября: массовый сбой интернета в России — учения автономности Рунета",
            "en": "6 September: mass internet outage across Russia during Runet autonomy exercises"
          },
          "domain": "techora.ru",
          "url": "https://techora.ru/news/6-sentyabrya-massovyy-sboy-interneta-v-2026-09-06",
          "publication_date": "2026-09-06",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "news-ru-mobile-internet-september-6",
          "title": {
            "ru": "Почему не работает мобильный интернет 6 сентября: причины сбоев в России",
            "en": "Why mobile internet is down on 6 September: causes of outages in Russia"
          },
          "domain": "news.ru",
          "url": "https://news.ru/society/pochemu-ne-rabotaet-mobilnyj-internet-6-sentyabrya-prichiny-sboi-v-rossii",
          "publication_date": "2026-09-06",
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
  "index": 40,
  "delta": -9,
  "status": "tense",
  "background": true,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Рынок страхования от ударов беспилотников переоценивает риски; запрет на экспорт дизельного топлива продлён до 30 сентября, ужесточая глобальный баланс средних дистиллятов.",
        "en": "The drone-strike insurance market is repricing risk; the diesel export ban was extended to 30 September, tightening the global balance of middle distillates."
      },
      "why": {
        "ru": "Рост страховых и топливных издержек переносится на фрахт и снабжение, в том числе по маршрутам, важным для импортёров региона.",
        "en": "Rising insurance and fuel costs are passed on to freight and supply, including on routes that matter for the region’s importers."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "insur-info-drone-risk-insurance-market",
          "title": {
            "ru": "Воздушная защита: сколько стоят страховки от БПЛА в России",
            "en": "Air defence: the cost of drone-attack insurance in Russia"
          },
          "domain": "insur-info.ru",
          "url": "https://www.insur-info.ru/press/213927/",
          "publication_date": "2026-09-04",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        },
        {
          "id": "cargorun-ru-diesel-export-ban-extended",
          "title": {
            "ru": "Запрет на экспорт дизтоплива производителями продлён до 30 сентября 2026 года",
            "en": "Diesel fuel export ban for producers extended to 30 September 2026"
          },
          "domain": "cargorun.ru",
          "url": "https://cargorun.ru/blog/novosti/zapret-eksport-diztopliva-30-sentyabrya-2026",
          "publication_date": "2026-08-31",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Премьер Испании обвинил Россию и Израиль в дезинформации во время кризиса в Сеуте, ссылаясь на исследование EEAS; Россия отвергла связанные с Лейпцигом обвинения.",
        "en": "Spain’s prime minister accused Russia and Israel of disinformation during the Ceuta crisis, citing an EEAS study; Russia rejected the Leipzig-related accusations."
      },
      "why": {
        "ru": "Документированные кампании влияния вокруг кризисов миграции добавляют информационное измерение напряжённости в приграничье.",
        "en": "Documented influence campaigns around migration crises add an informational dimension to tension in border areas."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "aljazeera-com-ceuta-disinformation-eeas",
          "title": {
            "ru": "Премьер Испании обвинил Россию и Израиль в дезинформации во время кризиса в Сеуте, ссылаясь на исследование EEAS",
            "en": "Spain's Sanchez says Russia, Israel spread disinformation during Ceuta crisis, citing EEAS research"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/8/31/spains-sanchez-condemns-russia-israel-disinformation-during-ceuta-crisis",
          "publication_date": "2026-08-31",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "kommersant-ru-russia-rejects-leipzig-8924396",
          "title": {
            "ru": "Россия отвергла обвинения Германии в инциденте в Лейпциге и пообещала жёсткий ответ на санкции",
            "en": "Russia rejects German accusations over Leipzig incident, promises harsh response to sanctions"
          },
          "domain": "kommersant.ru",
          "url": "https://www.kommersant.ru/doc/8924396",
          "publication_date": "2026-09-02",
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
  "index": 23,
  "delta": -9,
  "status": "tense",
  "background": true,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Зеленский заявил, что Украина готова прекратить удары по городам, где проходят мирные переговоры при посредничестве США; режим тишины 5–8 сентября соблюдается приказом ВСУ.",
        "en": "Zelensky said Ukraine is ready to halt strikes on cities hosting peace talks mediated by the United States; the 5–8 September silence regime is observed under an order to the armed forces."
      },
      "why": {
        "ru": "Американское посредничество в локальных прекращениях огня — главный дипломатический канал недели, определяющий повестку Вашингтона.",
        "en": "US mediation in local ceasefires is the week’s main diplomatic channel, shaping Washington’s agenda."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "aa-com-tr-zelenskiy-halt-strikes-talks-cities-4048283",
          "title": {
            "ru": "Зеленский: Украина готова прекратить удары по городам, где проходят мирные переговоры при посредничестве США",
            "en": "Zelenskyy: Ukraine ready to halt strikes on cities hosting US-mediated peace talks"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/ru/%D0%BC%D0%B8%D1%80/%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0-%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%B0-%D0%BF%D1%80%D0%B5%D0%BA%D1%80%D0%B0%D1%82%D0%B8%D1%82%D1%8C-%D1%83%D0%B4%D0%B0%D1%80%D1%8B-%D0%BF%D0%BE-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D0%BC-%D0%B3%D0%B4%D0%B5-%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B4%D1%8F%D1%82-%D0%BC%D0%B8%D1%80%D0%BD%D1%8B%D0%B5-%D0%BF%D0%B5%D1%80%D0%B5%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D1%8B-%D0%BF%D1%80%D0%B8-%D0%BF%D0%BE%D1%81%D1%80%D0%B5%D0%B4%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%B5-%D1%81%D1%88%D0%B0/4048283",
          "publication_date": "2026-09-05",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "gazeta-ru-regime-of-silence-september-5",
          "title": {
            "ru": "Режим тишины между Россией и Украиной 5–8 сентября: ВСУ получили приказ соблюдать прекращение огня",
            "en": "Russia-Ukraine silence regime September 5-8: AFU ordered to abide by ceasefire"
          },
          "domain": "gazeta.ru",
          "url": "https://www.gazeta.ru/politics/2026/09/05/23506915.shtml",
          "publication_date": "2026-09-05",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "В учениях Namejs-2026 в Латвии участвуют военнослужащие из США и Канады; Германия удвоила оборонный бюджет, взяв на себя ответственность за оборону Европы.",
        "en": "US and Canadian troops take part in Exercise Namejs-2026 in Latvia; Germany doubled its defence budget, assuming responsibility for Europe’s defence."
      },
      "why": {
        "ru": "Рост оборонных усилий союзников означает более высокую трансатлантическую нагрузку и устойчивый спрос на координацию через Вашингтон.",
        "en": "Allies’ rising defence efforts mean a heavier transatlantic burden and steady demand for coordination through Washington."
      },
      "contribution": "low",
      "confidence": "high",
      "sources": [
        {
          "id": "ura-news-namejs-2026-latvia-start",
          "title": {
            "ru": "В Латвии начались учения НАТО Namejs-2026 с участием 12 тысяч военнослужащих из США, Канады и Прибалтики",
            "en": "NATO's Namejs-2026 exercise begins in Latvia with 12,000 troops from the US, Canada and the Baltics"
          },
          "domain": "ura.news",
          "url": "https://ura.news/news/1053123716",
          "publication_date": "2026-09-02",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "br-az-germany-record-rearmament-budget",
          "title": {
            "ru": "Германия готовится к рекордному перевооружению: военные расходы вырастут до €110 млрд",
            "en": "Germany prepares for record rearmament: military spending to rise to 110 billion euros"
          },
          "domain": "br.az",
          "url": "https://br.az/inworld/121800/germaniya-gotovitsya-k-rekordnomu-perevooruzheniyu-voennye-rashody-vzletyat-do-euro110-mlrd/",
          "publication_date": "2026-08-31",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["south-asia"] = {
  "index": 45,
  "delta": -4,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Россия продлила запрет на экспорт дизельного топлива производителями до 30 сентября 2026 года; по оценкам рынка, это ужесточает глобальный баланс средних дистиллятов и влияет на цены в Азии.",
        "en": "Russia extended the producers’ ban on diesel exports to 30 September 2026; market assessments say this tightens the global balance of middle distillates and affects prices in Asia."
      },
      "why": {
        "ru": "Южная Азия — крупнейший импортный рынок дистиллятов: перебои экспорта напрямую бьют по стоимости топлива и логистики региона.",
        "en": "South Asia is the largest import market for distillates: export disruptions directly hit the region’s fuel and logistics costs."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "commodity-board-diesel-ban-distillate-supply",
          "title": {
            "ru": "Россия продлевает запрет на экспорт дизельного топлива до 30 сентября 2026 года, ужесточая глобальный баланс средних дистиллятов",
            "en": "Russia extends diesel export ban to 30 September 2026, tightening global middle-distillate supply"
          },
          "domain": "commodity-board.com",
          "url": "https://commodity-board.com/%D1%80%D0%BE%D1%81%D1%81%D0%B8%D1%8F-%D0%BF%D1%80%D0%BE%D0%B4%D0%BB%D0%B5%D0%B2%D0%B0%D0%B5%D1%82-%D0%B7%D0%B0%D0%BF%D1%80%D0%B5%D1%82-%D0%BD%D0%B0-%D1%8D%D0%BA%D1%81%D0%BF%D0%BE%D1%80%D1%82-%D0%B4%D0%B8%D0%B7%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%B2%D0%B0-%D0%B4%D0%BE-30-%D1%81%D0%B5%D0%BD%D1%82%D1%8F%D0%B1%D1%80%D1%8F-2026-%D0%B3%D0%BE%D0%B4%D0%B0",
          "publication_date": "2026-09-01",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        },
        {
          "id": "cargorun-ru-diesel-export-ban-extended",
          "title": {
            "ru": "Запрет на экспорт дизтоплива производителями продлён до 30 сентября 2026 года",
            "en": "Diesel fuel export ban for producers extended to 30 September 2026"
          },
          "domain": "cargorun.ru",
          "url": "https://cargorun.ru/blog/novosti/zapret-eksport-diztopliva-30-sentyabrya-2026",
          "publication_date": "2026-08-31",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "marketpower-diesel-ban-winter-stockpiles",
          "title": {
            "ru": "Власти России продлили запрет на экспорт дизельного топлива до 30 сентября 2026 года для формирования запасов на зиму",
            "en": "Russia extends diesel export ban to 30 September 2026 to build winter fuel reserves"
          },
          "domain": "marketpower.pro",
          "url": "https://marketpower.pro/publications/vlasti-rossii-prodlili-zapret-na-eksport-dizelnogo-topliva-do-30-sentiabria",
          "publication_date": "2026-09-03",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Независимый мониторинг за август не зафиксировал пусков и смены ядерной риторики; ISW подтверждает отсутствие технических сигналов стратегических сил в окне.",
        "en": "Independent August monitoring recorded no launches or shifts in nuclear rhetoric; ISW confirms an absence of strategic-forces technical signals in the window."
      },
      "why": {
        "ru": "Аттестованное отсутствие сигналов сдерживания снижает неопределённость по одному из самых чувствительных направлений региона.",
        "en": "An attested absence of deterrent signals reduces uncertainty in one of the region’s most sensitive domains."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "isans-org-belarus-military-review-august-2026",
          "title": {
            "ru": "Обзор военной активности в Беларуси за август 2026 года",
            "en": "Review of military activity in Belarus, August 2026"
          },
          "domain": "isans.org",
          "url": "https://isans.org/military-ru/obzor-voennoj-aktivnosti-v-belarusi-za-avgust-2026.html",
          "publication_date": "2026-09-01",
          "accessed_date": "2026-09-26",
          "source_type": "OSINT",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "understandingwar-org-roca-september-4-2026",
          "title": {
            "ru": "ISW: оценка российского наступления, 4 сентября 2026",
            "en": "ISW Russian Offensive Campaign Assessment, September 4, 2026"
          },
          "domain": "understandingwar.org",
          "url": "https://understandingwar.org/research/russia-ukraine/russian-offensive-campaign-assessment-september-4-2026/",
          "publication_date": "2026-09-04",
          "accessed_date": "2026-09-26",
          "source_type": "OSINT",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["africa"] = {
  "index": 44,
  "delta": -9,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Стоимость страхования от ударов беспилотников растёт на ключевых рынках; запрет на экспорт дизтоплива ужесточает глобальный баланс поставок.",
        "en": "The cost of drone-strike insurance is rising in key markets; the diesel export ban tightens the global supply balance."
      },
      "why": {
        "ru": "Удорожание фрахта и топлива снижает доступность гуманитарных и товарных перевозок для африканских государств.",
        "en": "More expensive freight and fuel reduce the availability of humanitarian and goods shipments for African states."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "insur-info-drone-risk-insurance-market",
          "title": {
            "ru": "Воздушная защита: сколько стоят страховки от БПЛА в России",
            "en": "Air defence: the cost of drone-attack insurance in Russia"
          },
          "domain": "insur-info.ru",
          "url": "https://www.insur-info.ru/press/213927/",
          "publication_date": "2026-09-04",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        },
        {
          "id": "commodity-board-diesel-ban-distillate-supply",
          "title": {
            "ru": "Россия продлевает запрет на экспорт дизельного топлива до 30 сентября 2026 года, ужесточая глобальный баланс средних дистиллятов",
            "en": "Russia extends diesel export ban to 30 September 2026, tightening global middle-distillate supply"
          },
          "domain": "commodity-board.com",
          "url": "https://commodity-board.com/%D1%80%D0%BE%D1%81%D1%81%D0%B8%D1%8F-%D0%BF%D1%80%D0%BE%D0%B4%D0%BB%D0%B5%D0%B2%D0%B0%D0%B5%D1%82-%D0%B7%D0%B0%D0%BF%D1%80%D0%B5%D1%82-%D0%BD%D0%B0-%D1%8D%D0%BA%D1%81%D0%BF%D0%BE%D1%80%D1%82-%D0%B4%D0%B8%D0%B7%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%B2%D0%B0-%D0%B4%D0%BE-30-%D1%81%D0%B5%D0%BD%D1%82%D1%8F%D0%B1%D1%80%D1%8F-2026-%D0%B3%D0%BE%D0%B4%D0%B0",
          "publication_date": "2026-09-01",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Премьер Испании обвинил Россию и Израиль в дезинформации во время кризиса в Сеуте со ссылкой на исследование EEAS; миграционный кризис в испанском анклаве на севере Африки продолжался.",
        "en": "Spain’s prime minister accused Russia and Israel of disinformation during the Ceuta crisis, citing an EEAS study; the migration crisis in the Spanish enclave in North Africa continued."
      },
      "why": {
        "ru": "Информационные кампании вокруг миграционных кризисов на северной границе Африки усиливают нестабильность приграничья.",
        "en": "Information campaigns around migration crises on Africa’s northern frontier add to border instability."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "aljazeera-com-ceuta-disinformation-eeas",
          "title": {
            "ru": "Премьер Испании обвинил Россию и Израиль в дезинформации во время кризиса в Сеуте, ссылаясь на исследование EEAS",
            "en": "Spain's Sanchez says Russia, Israel spread disinformation during Ceuta crisis, citing EEAS research"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/8/31/spains-sanchez-condemns-russia-israel-disinformation-during-ceuta-crisis",
          "publication_date": "2026-08-31",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "lenta-ru-ogranicheniya-diplomatov-es",
          "title": {
            "ru": "Ограничения для российских дипломатов в ЕС объяснили подготовкой к войне с Россией",
            "en": "EU restrictions on Russian diplomats explained as preparation for war with Russia"
          },
          "domain": "lenta.ru",
          "url": "https://lenta.ru/news/2026/09/04/ogranicheniya-dlya-rossiyskih-diplomatov-v-es-ob-yasnili/",
          "publication_date": "2026-09-04",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.trend = [
  {
    "date": "2026-06-21",
    "value": 50
  },
  {
    "date": "2026-06-28",
    "value": 52
  },
  {
    "date": "2026-07-05",
    "value": 53
  },
  {
    "date": "2026-07-12",
    "value": 53
  },
  {
    "date": "2026-07-19",
    "value": 56
  },
  {
    "date": "2026-07-26",
    "value": 58
  },
  {
    "date": "2026-08-02",
    "value": 59
  },
  {
    "date": "2026-08-09",
    "value": 60
  },
  {
    "date": "2026-08-16",
    "value": 61
  },
  {
    "date": "2026-08-23",
    "value": 63
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
  }
];
  // Редакционный сид недели 2026-09-06: три главных драйвера недели.
  // Источники — verbatim-записи из calc/input/2026-09-06.json (R55).
s.drivers = [
  {
    "observation": {
      "ru": "Между Россией и Украиной действует режим тишины 5–8 сентября, ВСУ получили приказ соблюдать прекращение огня; Зеленский заявил о готовности прекратить удары по городам, где проходят мирные переговоры при посредничестве США; на ЗАЭС вступило в силу седьмое локальное прекращение огня для ремонта линии электропередачи под мониторингом МАГАТЭ; при этом Путин поручил подготовить массированные удары по энергетике Украины.",
      "en": "A silence regime between Russia and Ukraine is in force on 5–8 September and the Ukrainian armed forces were ordered to observe it; Zelensky said he is ready to halt strikes on cities hosting peace talks mediated by the United States; a seventh local ceasefire took effect at the Zaporizhzhia nuclear plant to repair a power line under IAEA monitoring; at the same time Putin ordered preparations for massed strikes on Ukraine’s energy grid."
    },
    "why": {
      "ru": "Первое устойчивое снижение интенсивности за недели сочетается с прямыми угрозами новых ударов — риск возврата к эскалации сохраняется.",
      "en": "The first sustained de-escalation in weeks is combined with direct threats of new strikes, so the risk of a return to escalation persists."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "gazeta-ru-regime-of-silence-september-5",
        "title": {
          "ru": "Режим тишины между Россией и Украиной 5–8 сентября: ВСУ получили приказ соблюдать прекращение огня",
          "en": "Russia-Ukraine silence regime September 5-8: AFU ordered to abide by ceasefire"
        },
        "domain": "gazeta.ru",
        "url": "https://www.gazeta.ru/politics/2026/09/05/23506915.shtml",
        "publication_date": "2026-09-05",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "aa-com-tr-zelenskiy-halt-strikes-talks-cities-4048283",
        "title": {
          "ru": "Зеленский: Украина готова прекратить удары по городам, где проходят мирные переговоры при посредничестве США",
          "en": "Zelenskyy: Ukraine ready to halt strikes on cities hosting US-mediated peace talks"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/ru/%D0%BC%D0%B8%D1%80/%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0-%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%B0-%D0%BF%D1%80%D0%B5%D0%BA%D1%80%D0%B0%D1%82%D0%B8%D1%82%D1%8C-%D1%83%D0%B4%D0%B0%D1%80%D1%8B-%D0%BF%D0%BE-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D0%BC-%D0%B3%D0%B4%D0%B5-%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B4%D1%8F%D1%82-%D0%BC%D0%B8%D1%80%D0%BD%D1%8B%D0%B5-%D0%BF%D0%B5%D1%80%D0%B5%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D1%8B-%D0%BF%D1%80%D0%B8-%D0%BF%D0%BE%D1%81%D1%80%D0%B5%D0%B4%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%B5-%D1%81%D1%88%D0%B0/4048283",
        "publication_date": "2026-09-05",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "aa-com-tr-iaea-zaes-local-ceasefire-4048007",
        "title": {
          "ru": "МАГАТЭ: в районе ЗАЭС вступило в силу локальное прекращение огня для ремонта линии электропередачи",
          "en": "IAEA: local ceasefire around ZNPP enters into force for power line repair"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/ru/%D0%BC%D0%B8%D1%80/%D0%BC%D0%B0%D0%B3%D0%B0%D1%82%D1%8D-%D0%B2-%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%B5-%D0%B7%D0%B0%D1%8D%D1%81-%D0%B2%D1%81%D1%82%D1%83%D0%BF%D0%B8%D0%BB%D0%BE-%D0%B2-%D1%81%D0%B8%D0%BB%D1%83-%D0%BB%D0%BE%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5-%D0%BF%D1%80%D0%B5%D0%BA%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B3%D0%BD%D1%8F-/4048007",
        "publication_date": "2026-09-05",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "rbc-ru-putin-poruchenie-udary-02-09-2026",
        "title": {
          "ru": "Путин рассказал о поручении насчет ударов по украинской энергетике и приостановке переговоров",
          "en": "Putin speaks on order regarding strikes on Ukrainian energy grid and suspension of talks"
        },
        "domain": "rbc.ru",
        "url": "https://www.rbc.ru/politics/02/09/2026/6a973cb65bd2c4a73a49f0dd",
        "publication_date": "2026-09-02",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ],
    "label": {
      "ru": "Режим тишины 5–8 сентября и локальное перемирие на ЗАЭС",
      "en": "Silence regime of 5–8 September and local ceasefire at the ZNPP"
    }
  },
  {
    "observation": {
      "ru": "Германия обвинила Россию в атаке дронов в аэропорту Лейпцига, где целью был украинский транспортный самолёт, и анонсировала закрытие Русского дома и генконсульства; Россия отвергла обвинения и пообещала жёсткий ответ на санкции; в ЕС объяснили новые ограничения для российских дипломатов.",
      "en": "Germany accused Russia of a drone attack at Leipzig airport targeting a Ukrainian transport aircraft and announced the closure of the Russian House and its consulate general; Russia rejected the accusations and promised a tough response to sanctions; the EU explained new restrictions on Russian diplomats."
    },
    "why": {
      "ru": "Прямое обвинение в диверсии на территории страны НАТО и взаимные дипломатические меры сужают пространство для переговоров и повышают ставки инцидентов.",
      "en": "A direct accusation of sabotage on NATO territory and reciprocal diplomatic measures narrow the room for talks and raise the stakes of incidents."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "kommersant-ru-leipzig-consulate-closure-8924215",
        "title": {
          "ru": "Германия обвинила Россию в атаке дронов в Лейпциге и анонсировала закрытие Русского дома и генконсульства",
          "en": "Germany accuses Russia of Leipzig drone attack, announces closure of Russian House and consulate general"
        },
        "domain": "kommersant.ru",
        "url": "https://www.kommersant.ru/doc/8924215",
        "publication_date": "2026-09-02",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "kommersant-ru-germany-accuses-leipzig-8923569",
        "title": {
          "ru": "Германия обвинила Россию в инциденте с дроном в аэропорту Лейпцига",
          "en": "Germany accuses Russia over drone incident at Leipzig airport"
        },
        "domain": "kommersant.ru",
        "url": "https://www.kommersant.ru/doc/8923569",
        "publication_date": "2026-09-01",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "kommersant-ru-russia-rejects-leipzig-8924396",
        "title": {
          "ru": "Россия отвергла обвинения Германии в инциденте в Лейпциге и пообещала жёсткий ответ на санкции",
          "en": "Russia rejects German accusations over Leipzig incident, promises harsh response to sanctions"
        },
        "domain": "kommersant.ru",
        "url": "https://www.kommersant.ru/doc/8924396",
        "publication_date": "2026-09-02",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "dw-com-germany-response-leipzig-sanctions",
        "title": {
          "ru": "Ответ Германии на диверсию с дронами в Лейпциге: обвинение в адрес России и санкции",
          "en": "Germany's response to Leipzig drone sabotage: accusations against Russia and sanctions"
        },
        "domain": "dw.com",
        "url": "https://www.dw.com/ru/otvet-germanii-na-diversiu-s-dronami-v-lejpcige/a-78844842",
        "publication_date": "2026-09-03",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "lenta-ru-ogranicheniya-diplomatov-es",
        "title": {
          "ru": "Ограничения для российских дипломатов в ЕС объяснили подготовкой к войне с Россией",
          "en": "EU restrictions on Russian diplomats explained as preparation for war with Russia"
        },
        "domain": "lenta.ru",
        "url": "https://lenta.ru/news/2026/09/04/ogranicheniya-dlya-rossiyskih-diplomatov-v-es-ob-yasnili/",
        "publication_date": "2026-09-04",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      }
    ],
    "label": {
      "ru": "Инцидент в Лейпциге вызвал дипломатический разрыв с Германией",
      "en": "Leipzig incident triggered a diplomatic rupture with Germany"
    }
  },
  {
    "observation": {
      "ru": "В Латвии начались учения Namejs-2026 с участием 12 тысяч военнослужащих из США, Канады и стран Прибалтики; Германия удвоила оборонный бюджет и взяла на себя ответственность за оборону Европы; военные расходы Берлина вырастут до 110 млрд евро.",
      "en": "Exercise Namejs-2026 began in Latvia with 12,000 troops from the United States, Canada and the Baltic states; Germany doubled its defence budget and took responsibility for Europe’s defence; Berlin’s military spending will rise to EUR 110 billion."
    },
    "why": {
      "ru": "Плотность учений на восточном фланге и серийный рост расходов закрепляют ожидание длительной напряжённости у границ альянса.",
      "en": "Dense drills on the eastern flank and serial spending growth entrench expectations of prolonged tension at the alliance’s borders."
    },
    "contribution": "medium",
    "confidence": "high",
    "sources": [
      {
        "id": "ura-news-namejs-2026-latvia-start",
        "title": {
          "ru": "В Латвии начались учения НАТО Namejs-2026 с участием 12 тысяч военнослужащих из США, Канады и Прибалтики",
          "en": "NATO's Namejs-2026 exercise begins in Latvia with 12,000 troops from the US, Canada and the Baltics"
        },
        "domain": "ura.news",
        "url": "https://ura.news/news/1053123716",
        "publication_date": "2026-09-02",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "realtribune-ru-germany-defense-budget-doubled",
        "title": {
          "ru": "Германия удвоила оборонный бюджет и взяла ответственность за оборону Европы",
          "en": "Germany doubles defence budget and takes responsibility for Europe's defence"
        },
        "domain": "realtribune.ru",
        "url": "https://realtribune.ru/germaniya-udvoila-oboronnyj-bjudzhet-i-vzyala-otvetstvennost-za-evropu/",
        "publication_date": "2026-08-31",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "br-az-germany-record-rearmament-budget",
        "title": {
          "ru": "Германия готовится к рекордному перевооружению: военные расходы вырастут до €110 млрд",
          "en": "Germany prepares for record rearmament: military spending to rise to 110 billion euros"
        },
        "domain": "br.az",
        "url": "https://br.az/inworld/121800/germaniya-gotovitsya-k-rekordnomu-perevooruzheniyu-voennye-rashody-vzletyat-do-euro110-mlrd/",
        "publication_date": "2026-08-31",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ],
    "label": {
      "ru": "Учения НАТО в Прибалтике и рост оборонных бюджетов",
      "en": "NATO drills in the Baltics and rising defence budgets"
    }
  }
];
  s.sources = [
  {
    "id": "ura-news-namejs-2026-latvia-start",
    "title": {
      "ru": "В Латвии начались учения НАТО Namejs-2026 с участием 12 тысяч военнослужащих из США, Канады и Прибалтики",
      "en": "NATO's Namejs-2026 exercise begins in Latvia with 12,000 troops from the US, Canada and the Baltics"
    },
    "domain": "ura.news",
    "url": "https://ura.news/news/1053123716",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "ura-news-putin-otverg-mobilizaciyu",
    "title": {
      "ru": "Путин вновь опроверг слухи о мобилизации после выборов в Госдуму",
      "en": "Putin again denies rumours of mobilisation after State Duma elections"
    },
    "domain": "ura.news",
    "url": "https://ura.news/news/1053123991",
    "publication_date": "2026-09-03",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "isans-org-belarus-military-review-august-2026",
    "title": {
      "ru": "Обзор военной активности в Беларуси за август 2026 года",
      "en": "Review of military activity in Belarus, August 2026"
    },
    "domain": "isans.org",
    "url": "https://isans.org/military-ru/obzor-voennoj-aktivnosti-v-belarusi-za-avgust-2026.html",
    "publication_date": "2026-09-01",
    "accessed_date": "2026-09-26",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "understandingwar-org-roca-september-4-2026",
    "title": {
      "ru": "ISW: оценка российского наступления, 4 сентября 2026",
      "en": "ISW Russian Offensive Campaign Assessment, September 4, 2026"
    },
    "domain": "understandingwar.org",
    "url": "https://understandingwar.org/research/russia-ukraine/russian-offensive-campaign-assessment-september-4-2026/",
    "publication_date": "2026-09-04",
    "accessed_date": "2026-09-26",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "lenta-ru-rossiya-udarila-logisticheskiy-tsentr",
    "title": {
      "ru": "Россия ударила новейшим беспилотником по логистическому центру под Киевом",
      "en": "Russia strikes logistics centre near Kyiv with newest drone"
    },
    "domain": "lenta.ru",
    "url": "https://lenta.ru/news/2026/09/02/rossiya-udarila-noveyshim-bespilotnikom-po-logisticheskomu-tsentru-pod-kievom/",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "lenta-ru-ogranicheniya-diplomatov-es",
    "title": {
      "ru": "Ограничения для российских дипломатов в ЕС объяснили подготовкой к войне с Россией",
      "en": "EU restrictions on Russian diplomats explained as preparation for war with Russia"
    },
    "domain": "lenta.ru",
    "url": "https://lenta.ru/news/2026/09/04/ogranicheniya-dlya-rossiyskih-diplomatov-v-es-ob-yasnili/",
    "publication_date": "2026-09-04",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "interfax-ru-putin-ukazaniya-udary-tek",
    "title": {
      "ru": "ВС РФ получили указания по подготовке массированных ударов по энергетике Украины, заявил Путин",
      "en": "Russian armed forces instructed to prepare massive strikes on Ukrainian energy infrastructure, Putin says"
    },
    "domain": "interfax.ru",
    "url": "https://www.interfax.ru/russia/1112563",
    "publication_date": "2026-09-01",
    "accessed_date": "2026-09-26",
    "source_type": "primary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "rbc-ru-putin-zayavleniya-01-09-2026",
    "title": {
      "ru": "Заявления Путина об ударах на Украине и ответных мерах, 1 сентября 2026",
      "en": "Putin's statements on strikes in Ukraine and retaliatory measures, September 1, 2026"
    },
    "domain": "rbc.ru",
    "url": "https://www.rbc.ru/politics/01/09/2026/6a9731ae6098ec160309dad4",
    "publication_date": "2026-09-01",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "rbc-ru-putin-poruchenie-udary-02-09-2026",
    "title": {
      "ru": "Путин рассказал о поручении насчет ударов по украинской энергетике и приостановке переговоров",
      "en": "Putin speaks on order regarding strikes on Ukrainian energy grid and suspension of talks"
    },
    "domain": "rbc.ru",
    "url": "https://www.rbc.ru/politics/02/09/2026/6a973cb65bd2c4a73a49f0dd",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "kommersant-ru-germany-accuses-leipzig-8923569",
    "title": {
      "ru": "Германия обвинила Россию в инциденте с дроном в аэропорту Лейпцига",
      "en": "Germany accuses Russia over drone incident at Leipzig airport"
    },
    "domain": "kommersant.ru",
    "url": "https://www.kommersant.ru/doc/8923569",
    "publication_date": "2026-09-01",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "kommersant-ru-leipzig-consulate-closure-8924215",
    "title": {
      "ru": "Германия обвинила Россию в атаке дронов в Лейпциге и анонсировала закрытие Русского дома и генконсульства",
      "en": "Germany accuses Russia of Leipzig drone attack, announces closure of Russian House and consulate general"
    },
    "domain": "kommersant.ru",
    "url": "https://www.kommersant.ru/doc/8924215",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "kommersant-ru-russia-rejects-leipzig-8924396",
    "title": {
      "ru": "Россия отвергла обвинения Германии в инциденте в Лейпциге и пообещала жёсткий ответ на санкции",
      "en": "Russia rejects German accusations over Leipzig incident, promises harsh response to sanctions"
    },
    "domain": "kommersant.ru",
    "url": "https://www.kommersant.ru/doc/8924396",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-com-tr-zelenskiy-halt-strikes-talks-cities-4048283",
    "title": {
      "ru": "Зеленский: Украина готова прекратить удары по городам, где проходят мирные переговоры при посредничестве США",
      "en": "Zelenskyy: Ukraine ready to halt strikes on cities hosting US-mediated peace talks"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/ru/%D0%BC%D0%B8%D1%80/%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0-%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%B0-%D0%BF%D1%80%D0%B5%D0%BA%D1%80%D0%B0%D1%82%D0%B8%D1%82%D1%8C-%D1%83%D0%B4%D0%B0%D1%80%D1%8B-%D0%BF%D0%BE-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D0%BC-%D0%B3%D0%B4%D0%B5-%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B4%D1%8F%D1%82-%D0%BC%D0%B8%D1%80%D0%BD%D1%8B%D0%B5-%D0%BF%D0%B5%D1%80%D0%B5%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D1%8B-%D0%BF%D1%80%D0%B8-%D0%BF%D0%BE%D1%81%D1%80%D0%B5%D0%B4%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%B5-%D1%81%D1%88%D0%B0/4048283",
    "publication_date": "2026-09-05",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-com-tr-iaea-zaes-local-ceasefire-4048007",
    "title": {
      "ru": "МАГАТЭ: в районе ЗАЭС вступило в силу локальное прекращение огня для ремонта линии электропередачи",
      "en": "IAEA: local ceasefire around ZNPP enters into force for power line repair"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/ru/%D0%BC%D0%B8%D1%80/%D0%BC%D0%B0%D0%B3%D0%B0%D1%82%D1%8D-%D0%B2-%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%B5-%D0%B7%D0%B0%D1%8D%D1%81-%D0%B2%D1%81%D1%82%D1%83%D0%BF%D0%B8%D0%BB%D0%BE-%D0%B2-%D1%81%D0%B8%D0%BB%D1%83-%D0%BB%D0%BE%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5-%D0%BF%D1%80%D0%B5%D0%BA%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B3%D0%BD%D1%8F-/4048007",
    "publication_date": "2026-09-05",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "gazeta-ru-regime-of-silence-september-5",
    "title": {
      "ru": "Режим тишины между Россией и Украиной 5–8 сентября: ВСУ получили приказ соблюдать прекращение огня",
      "en": "Russia-Ukraine silence regime September 5-8: AFU ordered to abide by ceasefire"
    },
    "domain": "gazeta.ru",
    "url": "https://www.gazeta.ru/politics/2026/09/05/23506915.shtml",
    "publication_date": "2026-09-05",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "dw-com-germany-response-leipzig-sanctions",
    "title": {
      "ru": "Ответ Германии на диверсию с дронами в Лейпциге: обвинение в адрес России и санкции",
      "en": "Germany's response to Leipzig drone sabotage: accusations against Russia and sanctions"
    },
    "domain": "dw.com",
    "url": "https://www.dw.com/ru/otvet-germanii-na-diversiu-s-dronami-v-lejpcige/a-78844842",
    "publication_date": "2026-09-03",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "eurointegration-com-ua-eu-sanctions-postponed",
    "title": {
      "ru": "Послы ЕС отложили продление индивидуальных санкций против России",
      "en": "EU ambassadors postpone extension of individual Russia sanctions"
    },
    "domain": "eurointegration.com.ua",
    "url": "https://www.eurointegration.com.ua/rus/news/2026/09/2/7244680/",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "euronews-belgium-frozen-assets-pushback",
    "title": {
      "ru": "Бельгия вновь выступила против использования замороженных российских активов",
      "en": "Belgium again pushes back against using frozen Russian assets"
    },
    "domain": "ru.euronews.com",
    "url": "https://ru.euronews.com/2026/09/02/belgium-pushes-back",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "realtribune-ru-germany-defense-budget-doubled",
    "title": {
      "ru": "Германия удвоила оборонный бюджет и взяла ответственность за оборону Европы",
      "en": "Germany doubles defence budget and takes responsibility for Europe's defence"
    },
    "domain": "realtribune.ru",
    "url": "https://realtribune.ru/germaniya-udvoila-oboronnyj-bjudzhet-i-vzyala-otvetstvennost-za-evropu/",
    "publication_date": "2026-08-31",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "br-az-germany-record-rearmament-budget",
    "title": {
      "ru": "Германия готовится к рекордному перевооружению: военные расходы вырастут до €110 млрд",
      "en": "Germany prepares for record rearmament: military spending to rise to 110 billion euros"
    },
    "domain": "br.az",
    "url": "https://br.az/inworld/121800/germaniya-gotovitsya-k-rekordnomu-perevooruzheniyu-voennye-rashody-vzletyat-do-euro110-mlrd/",
    "publication_date": "2026-08-31",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-com-ceuta-disinformation-eeas",
    "title": {
      "ru": "Премьер Испании обвинил Россию и Израиль в дезинформации во время кризиса в Сеуте, ссылаясь на исследование EEAS",
      "en": "Spain's Sanchez says Russia, Israel spread disinformation during Ceuta crisis, citing EEAS research"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/8/31/spains-sanchez-condemns-russia-israel-disinformation-during-ceuta-crisis",
    "publication_date": "2026-08-31",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "klerk-ru-mobilization-after-elections",
    "title": {
      "ru": "Мобилизация после выборов 2026 года: будет ли новая волна",
      "en": "Mobilisation after the 2026 elections: will there be a new wave"
    },
    "domain": "klerk.ru",
    "url": "https://www.klerk.ru/buh/articles/707264/",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "cargorun-ru-diesel-export-ban-extended",
    "title": {
      "ru": "Запрет на экспорт дизтоплива производителями продлён до 30 сентября 2026 года",
      "en": "Diesel fuel export ban for producers extended to 30 September 2026"
    },
    "domain": "cargorun.ru",
    "url": "https://cargorun.ru/blog/novosti/zapret-eksport-diztopliva-30-sentyabrya-2026",
    "publication_date": "2026-08-31",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "commodity-board-diesel-ban-distillate-supply",
    "title": {
      "ru": "Россия продлевает запрет на экспорт дизельного топлива до 30 сентября 2026 года, ужесточая глобальный баланс средних дистиллятов",
      "en": "Russia extends diesel export ban to 30 September 2026, tightening global middle-distillate supply"
    },
    "domain": "commodity-board.com",
    "url": "https://commodity-board.com/%D1%80%D0%BE%D1%81%D1%81%D0%B8%D1%8F-%D0%BF%D1%80%D0%BE%D0%B4%D0%BB%D0%B5%D0%B2%D0%B0%D0%B5%D1%82-%D0%B7%D0%B0%D0%BF%D1%80%D0%B5%D1%82-%D0%BD%D0%B0-%D1%8D%D0%BA%D1%81%D0%BF%D0%BE%D1%80%D1%82-%D0%B4%D0%B8%D0%B7%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%B2%D0%B0-%D0%B4%D0%BE-30-%D1%81%D0%B5%D0%BD%D1%82%D1%8F%D0%B1%D1%80%D1%8F-2026-%D0%B3%D0%BE%D0%B4%D0%B0",
    "publication_date": "2026-09-01",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "marketpower-diesel-ban-winter-stockpiles",
    "title": {
      "ru": "Власти России продлили запрет на экспорт дизельного топлива до 30 сентября 2026 года для формирования запасов на зиму",
      "en": "Russia extends diesel export ban to 30 September 2026 to build winter fuel reserves"
    },
    "domain": "marketpower.pro",
    "url": "https://marketpower.pro/publications/vlasti-rossii-prodlili-zapret-na-eksport-dizelnogo-topliva-do-30-sentiabria",
    "publication_date": "2026-09-03",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "insur-info-drone-risk-insurance-market",
    "title": {
      "ru": "Воздушная защита: сколько стоят страховки от БПЛА в России",
      "en": "Air defence: the cost of drone-attack insurance in Russia"
    },
    "domain": "insur-info.ru",
    "url": "https://www.insur-info.ru/press/213927/",
    "publication_date": "2026-09-04",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "techora-mass-internet-shutdown-september-6",
    "title": {
      "ru": "6 сентября: массовый сбой интернета в России — учения автономности Рунета",
      "en": "6 September: mass internet outage across Russia during Runet autonomy exercises"
    },
    "domain": "techora.ru",
    "url": "https://techora.ru/news/6-sentyabrya-massovyy-sboy-interneta-v-2026-09-06",
    "publication_date": "2026-09-06",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "news-ru-mobile-internet-september-6",
    "title": {
      "ru": "Почему не работает мобильный интернет 6 сентября: причины сбоев в России",
      "en": "Why mobile internet is down on 6 September: causes of outages in Russia"
    },
    "domain": "news.ru",
    "url": "https://news.ru/society/pochemu-ne-rabotaet-mobilnyj-internet-6-sentyabrya-prichiny-sboi-v-rossii",
    "publication_date": "2026-09-06",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "zn-ua-south-korea-un-rf-dprk",
    "title": {
      "ru": "Южная Корея заявила в ООН, что сотрудничество между РФ и КНДР затягивает войну в Украине",
      "en": "South Korea tells UN that Russia-DPRK cooperation prolongs the war in Ukraine"
    },
    "domain": "zn.ua",
    "url": "https://zn.ua/war/juzhnaja-koreja-zajavila-v-oon-chto-sotrudnichestvo-mezhdu-rf-i-kndr-zatjahivaet-vojnu-v-ukraine.html",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "apostrophe-ua-south-korea-un-rf-dprk",
    "title": {
      "ru": "Россия и КНДР затягивают войну против Украины: заявление Южной Кореи в ООН",
      "en": "Russia and North Korea prolonging war against Ukraine: South Korea's statement at UN"
    },
    "domain": "apostrophe.ua",
    "url": "https://apostrophe.ua/ru/politics/foreign-policy/rossija-i-kndr-zatjahivajut-vojnu-protiv-ukrainy-zajavlenie-juzhnoj-korei-v-oon-.html",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "cnn-germany-leipzig-drone",
    "title": {
      "ru": "Германия обвинила Россию в атаке дрона на аэропорт Лейпцига",
      "en": "Germany blames Russia for drone attack on Leipzig airport"
    },
    "domain": "cnn.com",
    "url": "https://www.cnn.com/2026/09/01/europe/leipzig-drone-germany-russia-intl",
    "publication_date": "2026-09-01",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-kordofan-attack-0905",
    "title": {
      "ru": "В Южном Кордофане Судана убиты пять человек при нападении повстанцев",
      "en": "At least five killed in Sudan’s South Kordofan in attack by rebel group"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/9/5/five-killed-in-sudans-kordofan-in-attack-by-rebel-group",
    "publication_date": "2026-09-05",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "darfur24-rsf-el-fasher-0904",
    "title": {
      "ru": "RSF ужесточили ограничения вокруг Эль-Фашира",
      "en": "RSF Tightens Restrictions Around El Fasher"
    },
    "domain": "darfur24.com",
    "url": "https://darfur24.com/en/2026/09/04/rsf-tightens-restrictions-around-el-fasher/",
    "publication_date": "2026-09-04",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "indiatv-iaf-notam-0904",
    "title": {
      "ru": "Паника в Пакистане: экстренное совещание после NOTAM ВВС Индии на 17-дневные учения",
      "en": "Panic in Pakistan, emergency meeting called as Indian Air Force issues NOTAM for 17-day combat exercise"
    },
    "domain": "indiatvnews.com",
    "url": "https://www.indiatvnews.com/news/india/panic-in-pakistan-emergency-meeting-called-as-indian-air-force-issued-notam-for-17-day-combat-exercise-2026-09-04-1053282",
    "publication_date": "2026-09-04",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "ssbcrack-iaf-notam-0904",
    "title": {
      "ru": "ВВС Индии выпустили 17-дневный NOTAM на военные учения; Пакистан усилил бдительность",
      "en": "Indian Air Force Issues 17-Day NOTAM for Military Exercise, Pakistan Steps Up Vigilance"
    },
    "domain": "ssbcrack.com",
    "url": "https://www.ssbcrack.com/2026/09/indian-air-force-issues-17-day-notam-for-military-exercise-pakistan-steps-up-vigilance.html",
    "publication_date": "2026-09-04",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-indus-waters-0901",
    "title": {
      "ru": "Пакистан выиграл спор об водах Инда в Гааге, но угроза со стороны Индии сохраняется",
      "en": "Pakistan wins Indus waters battle at The Hague, but India threat remains"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/9/1/pakistan-wins-indus-waters-battle-at-the-hague-but-india-threat-remains",
    "publication_date": "2026-09-01",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  }
];
})();
