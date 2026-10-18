window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-27"] = window.CI_DATA.snapshots["2026-09-27"] || {};
  s.global = {
  "index": 47,
  "delta": -9
};
  s.published = "2026-09-27";
  s.through = "2026-09-27";
  s.methodology = "3.0";
  s.regions_taxonomy = "1.0";
  s.dataState = "published";
  s.q = 0.9071;
  s.nullWeight = 0.0929;
  s.coverage = {
  "coveredDrivers": 8,
  "totalDrivers": 9
};
  s.confidence = "full";
  s.sensitivity = 2.8;
  s.coverageCriteria = {
  "covered": 27,
  "total": 46
};
  s.recalc = {
  "at": "2026-10-18T14:02:38.929Z",
  "reason": "Еженедельный пересчёт",
  "previous": 47,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
  s.regions = {
  "europe": {
    "index": 45,
    "delta": 3,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 44,
    "delta": -9,
    "status": "danger",
    "background": true
  },
  "middle-east": {
    "index": 40,
    "delta": -20,
    "status": "tense",
    "background": false
  },
  "north-america": {
    "index": 28,
    "delta": -9,
    "status": "tense",
    "background": true
  },
  "south-asia": {
    "index": 43,
    "delta": -11,
    "status": "danger",
    "background": false
  },
  "africa": {
    "index": 45,
    "delta": -9,
    "status": "danger",
    "background": false
  }
};
  s.regions["europe"] = {
  "index": 45,
  "delta": 3,
  "status": "danger",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Активная фаза учений Namejs 2026 прошла в Риге 16–20 сентября; Литва провела военные учения в 12 муниципалитетах на фоне продолжающихся проверок восточной границы НАТО.",
        "en": "The active phase of exercise Namejs 2026 took place in Riga on 16–20 September; Lithuania held military drills across 12 municipalities amid continued probes of NATO's eastern border."
      },
      "why": {
        "ru": "Крупные учения в непосредственной близости от восточной границы альянса повышают плотность сил и риск инцидентов.",
        "en": "Large drills close to the alliance's eastern border raise force density and the risk of incidents."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "www-riga-lv-namejs-2026-active-phase",
          "title": {
            "ru": "16–20 сентября: активная фаза учений Namejs 2026 пройдёт в Риге",
            "en": "16–20 September: active phase of exercise Namejs 2026 will take place in Riga"
          },
          "domain": "riga.lv",
          "url": "https://www.riga.lv/en/article/16-20-september-active-phase-exercise-namejs-2026-will-take-place-riga-soldiers-military-vehicles-and-exercise-checkpoints-will-be-visible-across-city",
          "publication_date": "2026-09-16",
          "accessed_date": "2026-09-25",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "euromaidanpress-com-lithuania-exercises-12-municipalities",
          "title": {
            "ru": "Литва начала военные учения в 12 муниципалитетах на фоне проверок НАТО восточной границы",
            "en": "Lithuania launches military exercises across 12 municipalities as Russia keeps probing NATO's eastern border"
          },
          "domain": "euromaidanpress.com",
          "url": "https://euromaidanpress.com/2026/09/14/lithuania-launches-military-exercises-across-12-municipalities-as-russia-keeps-probing-natos-eastern-border/",
          "publication_date": "2026-09-14",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "eng-lsm-lv-namejs-drills-riga-a663399",
          "title": {
            "ru": "Учения Namejs проходят в Риге и её окрестностях",
            "en": "Namejs military drills taking place in and around Rīga"
          },
          "domain": "eng.lsm.lv",
          "url": "https://eng.lsm.lv/article/society/defence/16.09.2026-namejs-military-drills-taking-place-in-and-around-riga.a663399/",
          "publication_date": "2026-09-16",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Зафиксированы удары России вблизи границ Польши; Литва подтвердила данные Польши о подготовке Россией гибридных атак против союзников Украины.",
        "en": "Russian strikes were recorded near Poland's borders; Lithuania confirmed Polish reports of Russia preparing hybrid attacks against Ukraine's allies."
      },
      "why": {
        "ru": "Удары и подготовка гибридных операций вблизи территории альянса поддерживают постоянно высокое напряжение на восточном фланге.",
        "en": "Strikes and preparations for hybrid operations near alliance territory keep tension on the eastern flank persistently high."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "www-svoboda-org-a-udary-rossii-vblizi-granits-poljshi",
          "title": {
            "ru": "Удары России вблизи границ Польши",
            "en": "Russian strikes near Poland's borders"
          },
          "domain": "svoboda.org",
          "url": "https://www.svoboda.org/a/udary-rossii-vblizi-granits-poljshi/33854008.html",
          "publication_date": "2026-09-14",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-pravda-com-ua-rus-litva-gibridnye-ataki-8054030",
          "title": {
            "ru": "Литва подтвердила данные Польши о подготовке Россией гибридных атак против союзников Украины",
            "en": "Lithuania confirms Polish reports of Russia preparing hybrid attacks against Ukraine's allies"
          },
          "domain": "pravda.com.ua",
          "url": "https://www.pravda.com.ua/rus/news/2026/09/18/8054030/",
          "publication_date": "2026-09-18",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["east-asia"] = {
  "index": 44,
  "delta": -9,
  "status": "danger",
  "background": true,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "КНДР выпустила две предположительно баллистические ракеты у восточного побережья и назвала свой ядерный статус необратимым после резолюции МАГАТЭ, предупредив США и Южную Корею о возможном применении ядерного оружия.",
        "en": "North Korea fired two suspected ballistic missiles off its east coast and called its nuclear status irreversible after an IAEA resolution, warning the US and South Korea of possible nuclear weapon use."
      },
      "why": {
        "ru": "Пуски и заявления о ядерном статусе поддерживают цикл демонстрации силы в северо-восточной Азии.",
        "en": "Missile launches and statements on nuclear status sustain a cycle of shows of force in Northeast Asia."
      },
      "contribution": "high",
      "confidence": "medium",
      "confidenceNote": {
        "ru": "Покрыто 2 из 5 критериев драйвера; пуски малой дальности, часть заявлений — хроническая риторика.",
        "en": "2 of 5 criteria of the driver are covered; short-range launches, part of the statements is chronic rhetoric."
      },
      "sources": [
        {
          "id": "www-reuters-com-north-korea-fires-two-missiles",
          "title": {
            "ru": "КНДР выпустила две предположительно баллистические ракеты у восточного побережья",
            "en": "North Korea fires two suspected ballistic missiles off east coast within three hours"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/asia-pacific/north-korea-fires-missile-off-east-coast-yonhap-says-2026-09-27/",
          "publication_date": "2026-09-27",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-reuters-com-north-korea-rejects-iaea-resolution",
          "title": {
            "ru": "КНДР назвала ядерный статус «необратимым» после резолюции МАГАТЭ",
            "en": "North Korea says nuclear status 'irreversible' after UN watchdog resolution"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/asia-pacific/north-korea-rejects-iaea-resolution-doubles-down-nuclear-status-kim-jong-un-2026-09-18/",
          "publication_date": "2026-09-18",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "iz-ru-kndr-iadernoe-oruzhiie-2167943",
          "title": {
            "ru": "КНДР предупредила США и Южную Корею о возможном применении ядерного оружия",
            "en": "North Korea warns US and South Korea of possible nuclear weapon use"
          },
          "domain": "iz.ru",
          "url": "https://iz.ru/2167943/2026-09-16/kndr-predupredila-ssha-i-iuzhnuiu-koreiu-o-vozmozhnom-primenenii-iadernogo-oruzhiia",
          "publication_date": "2026-09-16",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Ким Чен Ын пообещал расширить связи с Россией и поддержать её в войне; по заявлениям сторон, Северная Корея направила в Россию от 30 до 50 тысяч военных.",
        "en": "Kim Jong Un vowed to expand ties with Russia and back it in the war; according to claims by the parties, North Korea sent 30 to 50 thousand soldiers to Russia."
      },
      "why": {
        "ru": "Углубление военного сотрудничества Пхеньяна и Москвы влияет на баланс сил в регионе.",
        "en": "Deepening military cooperation between Pyongyang and Moscow affects the balance of power in the region."
      },
      "contribution": "medium",
      "confidence": "medium",
      "confidenceNote": {
        "ru": "Цифры вовлечения подтверждены только заявлениями сторон.",
        "en": "Involvement figures are confirmed only by claims of the parties."
      },
      "sources": [
        {
          "id": "www-reuters-com-kim-vows-expand-ties-russia",
          "title": {
            "ru": "Ким Чен Ын пообещал расширить связи с Россией и поддержать победу в «священной войне»",
            "en": "North Korea's Kim vows to expand ties with Russia, backs victory in 'sacred war'"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/asia-pacific/north-koreas-kim-vows-expand-ties-with-russia-backs-victory-sacred-war-2026-09-14/",
          "publication_date": "2026-09-14",
          "accessed_date": "2026-09-25",
          "source_type": "primary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "apostrophe-ua-korea-30-50-tys-soldat",
          "title": {
            "ru": "Северная Корея отправила в Россию от 30 до 50 тыс. солдат",
            "en": "North Korea sent 30 to 50 thousand soldiers to Russia"
          },
          "domain": "apostrophe.ua",
          "url": "https://apostrophe.ua/ru/world/obuchajutsja-rabotajut-s-dronami-severnaja-koreja-otpravila-v-rossiju-ot-30-do-50-tys-soldat.html",
          "publication_date": "2026-09-17",
          "accessed_date": "2026-09-25",
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
  "delta": -20,
  "status": "tense",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Саудовская Аравия подтвердила попытку хуситов атаковать Эр-Рияд баллистической ракетой; хуситы заявляли об ударах по Эр-Рияду, Янбу и объекту Saudi Aramco и захватили ключевые острова в южной части Красного моря.",
        "en": "Saudi Arabia confirmed a Houthi attempt to attack its capital with a ballistic missile; the Houthis claimed strikes on Riyadh, Yanbu and a Saudi Aramco facility and seized key islands in the southern Red Sea."
      },
      "why": {
        "ru": "Атаки на столицу Саудовской Аравии и контроль над судоходными путями Красного моря расширяют зону конфликта и угрожают глобальной торговле.",
        "en": "Attacks on the Saudi capital and control over Red Sea shipping lanes widen the conflict zone and threaten global trade."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "www-thehindu-com-saudi-houthi-ballistic-article71486051",
          "title": {
            "ru": "Саудовская Аравия подтвердила: хуситы попытались атаковать её столицу баллистической ракетой",
            "en": "Saudi Arabia confirms Yemen's Houthi rebels tried to attack its capital with ballistic missile"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/saudi-arabia-confirms-yemens-houthi-rebels-tried-to-attack-its-capital-with-ballistic-missile/article71486051.ece",
          "publication_date": "2026-09-27",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-middleeasteye-net-houthis-riyadh-yanbu",
          "title": {
            "ru": "Хуситы заявляют об ударах по Эр-Рияду и Янбу, саудовская коалиция сообщает об отражении атак",
            "en": "Houthis claim strikes on Riyadh, Yanbu while Saudi coalition says attacks thwarted"
          },
          "domain": "middleeasteye.net",
          "url": "https://www.middleeasteye.net/news/houthis-claim-strikes-riyadh-yanbu-while-saudi-coalition-says-attacks-thwarted",
          "publication_date": "2026-09-19",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-jpost-com-houthis-aramco-riyadh-909128",
          "title": {
            "ru": "Хуситы заявили об ударах по объекту Saudi Aramco и Эр-Рияду ракетами и дронами",
            "en": "Houthis claim to have struck Saudi Aramco facility, Riyadh with missiles, drones"
          },
          "domain": "jpost.com",
          "url": "https://www.jpost.com/middle-east/article-909128",
          "publication_date": "2026-09-19",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Иран выдвинул семь условий для переговоров с США через Катар и предупредил о «решающей войне» в случае их отклонения.",
        "en": "Iran set seven conditions for talks with the US through Qatar and warned of a 'decisive war' if they are rejected."
      },
      "why": {
        "ru": "Условия и предупреждения вокруг переговоров поддерживают напряжённость вокруг Ирана и прилегающих морских маршрутов.",
        "en": "Conditions and warnings around the talks keep tension high around Iran and adjacent sea routes."
      },
      "contribution": "medium",
      "confidence": "medium",
      "confidenceNote": {
        "ru": "Позиция изложена сторонами; независимого подтверждения итога переговоров в окне нет.",
        "en": "The position is stated by the parties; there is no independent confirmation of the talks' outcome in the window."
      },
      "sources": [
        {
          "id": "www-newindianexpress-com-iran-seven-conditions",
          "title": {
            "ru": "Иран выдвинул семь условий для переговоров с США через Катар и предупредил о «решающей войне»",
            "en": "Iran sets seven conditions for talks with US through Qatar, warns of decisive war if Trump rejects demands"
          },
          "domain": "newindianexpress.com",
          "url": "https://www.newindianexpress.com/world/2026/Sep/20/iran-sets-seven-conditions-for-talks-with-us-through-qatar-warns-of-decisive-war-if-trump-rejects-demands",
          "publication_date": "2026-09-27",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-presstv-co-uk-iran-conditions-776648",
          "title": {
            "ru": "Иран выдвинул 7 условий для выхода США из военной трясины",
            "en": "Iran sets 7 conditions for US to escape war quagmire"
          },
          "domain": "presstv.co.uk",
          "url": "https://www.presstv.co.uk/Detail/2026/09/20/776648/Iran-conditions-US-talks",
          "publication_date": "2026-09-27",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.regions["north-america"] = {
  "index": 28,
  "delta": -9,
  "status": "tense",
  "background": true,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Президент США подписал в закон санкционный акт против России; в России его назвали «адскими санкциями», на фоне чего звучали призывы отвечать «языком военного сдерживания».",
        "en": "The US president signed a sanctions act against Russia into law; in Russia it was called 'hellish sanctions', amid calls to answer with the 'language of military deterrence'."
      },
      "why": {
        "ru": "Закон закрепляет санкционный курс на законодательном уровне, а ответная риторика увеличивает дистанцию между сторонами.",
        "en": "The law entrenches the sanctions course at the legislative level, and the response rhetoric widens the distance between the parties."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "www-reuters-com-trump-signs-russia-sanctions-bill",
          "title": {
            "ru": "Трамп подписал закон о санкциях против России",
            "en": "Trump signs Russia sanctions bill into law"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/us/trump-signs-russia-sanctions-bill-into-law-2026-09-18/",
          "publication_date": "2026-09-18",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-dw-com-ru-zakon-grema-a-79335094",
          "title": {
            "ru": "Трамп подписал закон Грэма об «адских санкциях» против РФ",
            "en": "Trump signs Graham Act on 'hellish sanctions' against Russia"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/ru/tramp-podpisal-zakon-lindsi-grema-ob-adskih-sankciah-protiv-rossii/a-79335094",
          "publication_date": "2026-09-19",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Госдепартамент США одобрил возможную продажу Украине средств ПВО на $2,6 млрд; Дания ускорила пакет помощи Украине на $275 млн после инцидента с Россией.",
        "en": "The US State Department approved a potential $2.6 billion sale of air-defence equipment to Ukraine; Denmark expedited a $275 million Ukraine aid package after an incident with Russia."
      },
      "why": {
        "ru": "Крупные оборонные поставки поддерживают длительный характер конфликта и военное планирование всех сторон.",
        "en": "Major defence deliveries support the protracted character of the conflict and the military planning of all parties."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "www-cbsnews-com-air-defense-sale-ukraine",
          "title": {
            "ru": "Госдеп одобрил возможную продажу Украине средств ПВО на $2,6 млрд",
            "en": "State Department approves potential sale of $2.6 billion in air defense equipment to Ukraine"
          },
          "domain": "cbsnews.com",
          "url": "https://www.cbsnews.com/news/us-ukraine-russia-war-air-defense-state-department/",
          "publication_date": "2026-09-19",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-bloomberg-com-denmark-expedites-275-million",
          "title": {
            "ru": "Дания ускоряет пакет помощи Украине на $275 млн после инцидента с Россией",
            "en": "Denmark Expedites $275 Million Ukraine Aid After Russia Bust-Up"
          },
          "domain": "bloomberg.com",
          "url": "https://www.bloomberg.com/news/articles/2026-09-18/denmark-expedites-275-million-ukraine-aid-after-russia-bust-up",
          "publication_date": "2026-09-18",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["south-asia"] = {
  "index": 43,
  "delta": -11,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "В покрытии недели прямых сигналов из Южной Азии не зафиксировано; регион влияет на общий фон опосредованно, через глобальные торговые и сырьевые рынки.",
        "en": "The week's coverage recorded no direct signals from South Asia; the region shapes the general background indirectly, through global trade and commodity markets."
      },
      "why": {
        "ru": "Без подтверждённых событий в регионе его наблюдаемый вклад определяется фоновой напряжённостью; непокрытые риски сохраняются.",
        "en": "Without confirmed events in the region, its observable contribution is set by background tension; uncovered risks remain."
      },
      "contribution": "low",
      "confidence": "medium",
      "confidenceNote": {
        "ru": "Прямые сигналы из региона в окне отсутствуют; оценка носит фоновый характер.",
        "en": "No direct signals from the region in the window; the reading is background-level."
      },
      "sources": [
        {
          "id": "www-reuters-com-london-marine-insurers-black-sea",
          "title": {
            "ru": "Лондонские морские страховщики расширили высокорисковую зону в Чёрном море на фоне всплеска атак на суда",
            "en": "London's marine insurers widen Black Sea high risk zone as shipping attacks surge"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/business/londons-marine-insurers-widen-black-sea-high-risk-zone-shipping-attacks-surge-2026-09-18/",
          "publication_date": "2026-09-18",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-kommersant-ru-sulfuric-acid-export-ban-8954462",
          "title": {
            "ru": "Правительство запретило экспорт серной кислоты до конца года",
            "en": "Government bans sulfuric acid exports until end of year"
          },
          "domain": "kommersant.ru",
          "url": "https://www.kommersant.ru/doc/8954462",
          "publication_date": "2026-09-14",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Россия продлила запрет на экспорт дизтоплива для производителей до ноября и запретила экспорт серной кислоты до конца года.",
        "en": "Russia extended its ban on diesel fuel exports for producers until November and banned sulfuric acid exports until the end of the year."
      },
      "why": {
        "ru": "Экспортные ограничения крупных поставщиков повышают волатильность рынков нефтепродуктов и удобрений, значимых для стран Южной Азии.",
        "en": "Export restrictions by major suppliers raise volatility in fuel and fertiliser markets that matter to South Asian states."
      },
      "contribution": "low",
      "confidence": "high",
      "sources": [
        {
          "id": "www-vedomosti-ru-diesel-export-ban-1229127",
          "title": {
            "ru": "Правительство продлит запрет на экспорт дизтоплива для производителей до ноября",
            "en": "Government to extend ban on diesel fuel exports for producers until November"
          },
          "domain": "vedomosti.ru",
          "url": "https://www.vedomosti.ru/business/articles/2026/09/15/1229127-pravitelstvo-prodlit-zapret",
          "publication_date": "2026-09-15",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-interfax-ru-sulfuric-acid-ban-1116026",
          "title": {
            "ru": "РФ запретила экспорт серной кислоты до конца года",
            "en": "Russia bans sulfuric acid exports until end of year"
          },
          "domain": "interfax.ru",
          "url": "https://www.interfax.ru/business/1116026",
          "publication_date": "2026-09-14",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.regions["africa"] = {
  "index": 45,
  "delta": -9,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Хуситы захватили ключевые острова в южной части Красного моря и заявляли о ракетно-дроновых атаках на саудовскую столицу, усилив контроль над судоходными путями, важными для торговли вдоль восточного побережья Африки.",
        "en": "Houthi rebels seized key islands in the southern Red Sea and claimed missile and drone attacks on the Saudi capital, tightening their grip on shipping routes that matter for trade along Africa's eastern coast."
      },
      "why": {
        "ru": "Риски и перебои на этих маршрутах повышают стоимость перевозок и снабжения для государств восточной Африки.",
        "en": "Risks and disruptions on these routes raise the cost of shipping and supply for East African states."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "abcnews-com-houthis-yemen-gains-strategic-strait-136485092",
          "title": {
            "ru": "Продвижение хуситов в Йемене ставит под вопрос контроль над стратегическим проливом и ключевыми городами",
            "en": "Houthis' Yemen gains put control of strategic strait, key cities in focus"
          },
          "domain": "abcnews.com",
          "url": "https://abcnews.com/International/houthis-yemen-gains-put-control-strategic-strait-key/story?id=136485092",
          "publication_date": "2026-09-16",
          "accessed_date": "2026-10-03",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-aa-com-tr-houthis-saudi-capital-4062167",
          "title": {
            "ru": "Хуситы заявили о ракетно-дроновых атаках на саудовскую столицу",
            "en": "Yemen's Houthis claim missile, drone attacks on Saudi capital"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/yemen-s-houthis-claim-missile-drone-attacks-on-saudi-capital/4062167",
          "publication_date": "2026-09-19",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Прямых сигналов эскалации на континенте за неделю в покрытии не зафиксировано; напряжённость носит фоновый характер и связана с мировыми рынками и судоходством.",
        "en": "The week's coverage recorded no direct escalation signals on the continent; tension is background-level and tied to world markets and shipping."
      },
      "why": {
        "ru": "Отсутствие подтверждённых событий ограничивает наблюдаемый вклад региона; фоновые риски сохраняются.",
        "en": "The absence of confirmed events limits the region's observable contribution; background risks persist."
      },
      "contribution": "low",
      "confidence": "medium",
      "confidenceNote": {
        "ru": "Прямые сигналы с континента в окне отсутствуют; оценка носит фоновый характер.",
        "en": "No direct signals from the continent in the window; the reading is background-level."
      },
      "sources": [
        {
          "id": "www-reuters-com-london-marine-insurers-black-sea",
          "title": {
            "ru": "Лондонские морские страховщики расширили высокорисковую зону в Чёрном море на фоне всплеска атак на суда",
            "en": "London's marine insurers widen Black Sea high risk zone as shipping attacks surge"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/business/londons-marine-insurers-widen-black-sea-high-risk-zone-shipping-attacks-surge-2026-09-18/",
          "publication_date": "2026-09-18",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-vedomosti-ru-diesel-export-ban-1229127",
          "title": {
            "ru": "Правительство продлит запрет на экспорт дизтоплива для производителей до ноября",
            "en": "Government to extend ban on diesel fuel exports for producers until November"
          },
          "domain": "vedomosti.ru",
          "url": "https://www.vedomosti.ru/business/articles/2026/09/15/1229127-pravitelstvo-prodlit-zapret",
          "publication_date": "2026-09-15",
          "accessed_date": "2026-09-25",
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
    "date": "2026-07-12",
    "value": 59
  },
  {
    "date": "2026-07-19",
    "value": 59
  },
  {
    "date": "2026-07-26",
    "value": 62
  },
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
  }
];
  // Редакционный сид недели 2026-09-27: три главных драйвера недели.
  // Источники — verbatim-записи из calc/input/2026-09-27.json (R55).
s.drivers = [
  {
    "label": {
      "ru": "Удары далеко за линией фронта участились",
      "en": "Strikes deep behind the front line intensified"
    },
    "observation": {
      "ru": "Украинские дроны и ракеты атаковали Москву и нефтеперерабатывающий завод; из-за атаки беспилотников в московских аэропортах задержаны более 400 рейсов; удар нанесён по складу боеприпасов и горючего в Запорожье.",
      "en": "Ukrainian drones and missiles struck Moscow and an oil refinery; more than 400 flights were delayed at Moscow airports after a drone attack; a Russian ammunition and fuel depot was hit in Zaporizhzhia."
    },
    "why": {
      "ru": "Массированные удары по объектам в глубоком тылу повышают интенсивность обмена ударами и нагрузку на гражданскую инфраструктуру обеих сторон.",
      "en": "Massed strikes on targets deep in the rear raise the intensity of reciprocal attacks and the burden on civilian infrastructure on both sides."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "abcnews-com-ukrainian-drones-moscow-refinery-136595832",
        "title": {
          "ru": "Украинские дроны и ракеты атаковали Москву и нефтеперерабатывающий завод, есть погибшие",
          "en": "Ukrainian drones and missiles target Moscow, oil refinery in deadly attack: officials"
        },
        "domain": "abcnews.com",
        "url": "https://abcnews.com/International/ukrainian-drones-target-moscow-oil-refinery-deadly-attack/story?id=136595832",
        "publication_date": "2026-09-27",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "lenta-ru-glavnoe-k-utru-20-sentyabrya",
        "title": {
          "ru": "Главное 20 сентября. Массированная атака дронов на Москву и область",
          "en": "Main news of 20 September: massed drone attack on Moscow and the region"
        },
        "domain": "lenta.ru",
        "url": "https://lenta.ru/twz/chto-proiskhodit/glavnoe-k-utru-20-sentyabrya.htm",
        "publication_date": "2026-09-27",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "www-rbc-ru-400-flights-delayed-20-09-2026",
        "title": {
          "ru": "Более 400 рейсов задержали в московских аэропортах из-за атаки беспилотников",
          "en": "Over 400 flights delayed at Moscow airports due to drone attack"
        },
        "domain": "rbc.ru",
        "url": "https://www.rbc.ru/politics/20/09/2026/6aaf7792201b0189cffa7df7",
        "publication_date": "2026-09-27",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "spravzhne-media-gur-warehouse-zaporizhzhia",
        "title": {
          "ru": "ГУР уничтожило склад боеприпасов и горючего РФ в Запорожье",
          "en": "Ukrainian military intelligence destroys Russian ammunition and fuel depot in Zaporizhzhia"
        },
        "domain": "spravzhne.media",
        "url": "https://spravzhne.media/rus/war/1789900681-rossiyskiy-sklad-boepripasov-i-goryuchego-unichtozhili-na-zaporozhe",
        "publication_date": "2026-09-27",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "www-kyivpost-com-post-84787",
        "title": {
          "ru": "ISW: оценка российского наступления, 17 сентября 2026",
          "en": "ISW Russian Offensive Campaign Assessment, September 17, 2026"
        },
        "domain": "kyivpost.com",
        "url": "https://www.kyivpost.com/post/84787",
        "publication_date": "2026-09-18",
        "accessed_date": "2026-09-25",
        "source_type": "OSINT",
        "cluster_id": "C-registries",
        "state_affiliated": false
      }
    ]
  },
  {
    "label": {
      "ru": "Санкционное противостояние ужесточилось",
      "en": "Sanctions confrontation tightened"
    },
    "observation": {
      "ru": "Трамп подписал закон о санкциях против России; указом № 661 активы «Ашан» и Nestlé переданы во временное управление; генеральное консульство Германии в Санкт-Петербурге закрылось; послы ЕС продлили санкции на семь дней.",
      "en": "Trump signed a Russia sanctions bill into law; by Decree No. 661 the assets of Auchan and Nestlé were placed under temporary management; Germany's consulate general in St. Petersburg closed; EU envoys extended sanctions by seven days."
    },
    "why": {
      "ru": "Юридически закреплённые ограничительные меры и закрытие дипломатических представительств сужают пространство для переговоров и закрепляют конфронтацию.",
      "en": "Legally entrenched restrictive measures and closed diplomatic missions narrow the room for talks and entrench confrontation."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "www-reuters-com-trump-signs-russia-sanctions-bill",
        "title": {
          "ru": "Трамп подписал закон о санкциях против России",
          "en": "Trump signs Russia sanctions bill into law"
        },
        "domain": "reuters.com",
        "url": "https://www.reuters.com/world/us/trump-signs-russia-sanctions-bill-into-law-2026-09-18/",
        "publication_date": "2026-09-18",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "www-garant-ru-ukaz-661-ot-17-09-2026",
        "title": {
          "ru": "Указ Президента РФ от 17 сентября 2026 г. № 661",
          "en": "Decree of the President of the Russian Federation No. 661 of 17 September 2026"
        },
        "domain": "garant.ru",
        "url": "https://www.garant.ru/products/ipo/prime/doc/414830418/",
        "publication_date": "2026-09-17",
        "accessed_date": "2026-09-25",
        "source_type": "primary",
        "cluster_id": "C-registries",
        "state_affiliated": false
      },
      {
        "id": "meduza-io-putin-auchan-nestle",
        "title": {
          "ru": "Путин передал во временное управление активы «Ашан» и Nestlé",
          "en": "Putin places Auchan and Nestlé assets under temporary management"
        },
        "domain": "meduza.io",
        "url": "https://meduza.io/news/2026/09/17/putin-peredal-vo-vremennoe-upravlenie-aktivy-ashan-i-nestle",
        "publication_date": "2026-09-17",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "www-pravda-com-ua-eng-german-consulate-closes-8054035",
        "title": {
          "ru": "Генеральное консульство Германии в России закрылось навсегда",
          "en": "German Consulate General in Russia permanently closes"
        },
        "domain": "pravda.com.ua",
        "url": "https://www.pravda.com.ua/eng/news/2026/09/18/8054035/",
        "publication_date": "2026-09-18",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "www-reuters-com-eu-envoys-extend-russia-sanctions",
        "title": {
          "ru": "Послы ЕС продлили санкции против России на семь дней для обсуждения шестимесячного продления",
          "en": "EU envoys extend Russia sanctions by seven days to debate six-month renewal"
        },
        "domain": "reuters.com",
        "url": "https://www.reuters.com/world/europe/eu-envoys-extend-russia-sanctions-by-seven-days-debate-six-month-renewal-eu-2026-09-14/",
        "publication_date": "2026-09-14",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  },
  {
    "label": {
      "ru": "Напряжённость на восточном фланге НАТО выросла",
      "en": "Tension rose on NATO's eastern flank"
    },
    "observation": {
      "ru": "Активная фаза учений Namejs 2026 прошла в Риге, Литва провела учения в 12 муниципалитетах на фоне проверок восточной границы альянса; зафиксированы удары России вблизи границ Польши; Минск объявил проверку боеготовности армии, вплоть до мобилизации.",
      "en": "The active phase of exercise Namejs 2026 took place in Riga and Lithuania held drills across 12 municipalities amid probes of the alliance's eastern border; Russian strikes were recorded near Poland's borders; Minsk announced combat-readiness checks of its army, up to mobilisation."
    },
    "why": {
      "ru": "Плотность учений и инциденты вблизи границ альянса повышают риск случайных столкновений и требуют постоянного повышенного дежурства сил.",
      "en": "The density of drills and incidents near alliance borders raises the risk of unintended clashes and requires continuously heightened readiness of forces."
    },
    "contribution": "medium",
    "confidence": "high",
    "sources": [
      {
        "id": "www-riga-lv-namejs-2026-active-phase",
        "title": {
          "ru": "16–20 сентября: активная фаза учений Namejs 2026 пройдёт в Риге",
          "en": "16–20 September: active phase of exercise Namejs 2026 will take place in Riga"
        },
        "domain": "riga.lv",
        "url": "https://www.riga.lv/en/article/16-20-september-active-phase-exercise-namejs-2026-will-take-place-riga-soldiers-military-vehicles-and-exercise-checkpoints-will-be-visible-across-city",
        "publication_date": "2026-09-16",
        "accessed_date": "2026-09-25",
        "source_type": "primary",
        "cluster_id": "C-registries",
        "state_affiliated": false
      },
      {
        "id": "euromaidanpress-com-lithuania-exercises-12-municipalities",
        "title": {
          "ru": "Литва начала военные учения в 12 муниципалитетах на фоне проверок НАТО восточной границы",
          "en": "Lithuania launches military exercises across 12 municipalities as Russia keeps probing NATO's eastern border"
        },
        "domain": "euromaidanpress.com",
        "url": "https://euromaidanpress.com/2026/09/14/lithuania-launches-military-exercises-across-12-municipalities-as-russia-keeps-probing-natos-eastern-border/",
        "publication_date": "2026-09-14",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "www-svoboda-org-a-udary-rossii-vblizi-granits-poljshi",
        "title": {
          "ru": "Удары России вблизи границ Польши",
          "en": "Russian strikes near Poland's borders"
        },
        "domain": "svoboda.org",
        "url": "https://www.svoboda.org/a/udary-rossii-vblizi-granits-poljshi/33854008.html",
        "publication_date": "2026-09-14",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "ria-ru-lukashenko-check-readiness-2117062795",
        "title": {
          "ru": "Минск проведет проверку боеготовности армии, вплоть до мобилизации",
          "en": "Minsk to hold combat readiness checks of the army, up to mobilisation"
        },
        "domain": "ria.ru",
        "url": "https://ria.ru/20260911/lukashenko-2117062795.html",
        "publication_date": "2026-09-11",
        "accessed_date": "2026-09-25",
        "source_type": "primary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      }
    ]
  }
];
  s.sources = [
  {
    "id": "guardian-russia-strikes-ukraine-digital-economy",
    "title": {
      "ru": "Россия бьёт по цифровой экономике Украины: атаки на интернет-провайдеров и дата-центры",
      "en": "Russia strikes at heart of Ukraine's digital economy with attacks on ISPs and datacentres"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/sep/26/russia-strikes-ukraine-digital-economy-attacks-isps-datacentres",
    "publication_date": "2026-09-26",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-russian-attacks-close-largest-steelmaker",
    "title": {
      "ru": "Атаки России вынудили закрыть крупнейшего сталевара Украины",
      "en": "Russian attacks force closure of Ukraine's largest steelmaker"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/sep/26/ukraine-war-briefing-russian-attacks-close-largest-steelmaker-arcelormittal",
    "publication_date": "2026-09-26",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-poland-military-spending",
    "title": {
      "ru": "Польша резко наращивает военные расходы",
      "en": "Poland is racing ahead with military spending"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/sep/27/poland-military-spending-economic-growth-economy-defence-boom",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "quotes": [
      {
        "criterion": "D1.5",
        "text": "Amid growing Russian drone incursions into Polish airspace, APS is playing a role in the Warsaw's $4bn San programme to build an \"anti-drone wall\" to protect the country's eastern flank."
      },
      {
        "criterion": "D6.3",
        "text": "The government has pledged to channel almost 90% of it to domestic industry – led by Polska Grupa Zbrojeniowa (PGZ), the state-owned defence conglomerate."
      }
    ]
  },
  {
    "id": "guardian-russia-attack-nato-danish-intelligence",
    "title": {
      "ru": "Разведка Дании: Россия может атаковать страну НАТО в течение месяцев",
      "en": "Russia could attack a Nato country within months, Danish intelligence says"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/sep/24/russia-could-attack-a-nato-country-within-months-danish-intelligence-says",
    "publication_date": "2026-09-24",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-oleshky-hell-on-earth",
    "title": {
      "ru": "Олешки под российской оккупацией: последние жители едят траву",
      "en": "'Hell on earth': last residents eat weeds to survive in Russian-occupied Oleshky"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/sep/27/hell-on-earth-last-residents-eat-weeds-to-survive-in-russian-occupied-oleshky",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-kyiv-frontline-winter",
    "title": {
      "ru": "Киев стал прифронтовым городом — и приближается зима",
      "en": "Kyiv has become a frontline city - and winter is on the way"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/sep/26/after-summer-respite-kyiv-winter-dread",
    "publication_date": "2026-09-26",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-german-fm-russia-escalation",
    "title": {
      "ru": "Глава МИД Германии призвал Россию отказаться от опасной эскалации",
      "en": "German foreign minister urges Russia to abandon dangerous escalation in rare meeting"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/sep/27/ukraine-war-briefing-german-foreign-minister-urges-russia-to-abandon-dangerous-escalation-in-rare-meeting",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-finland-starlink",
    "title": {
      "ru": "Финляндия призывает Маска расширить покрытие Starlink для Киева",
      "en": "Finland urges Elon Musk to expand Kyiv's Starlink coverage over Russia"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/sep/25/ukraine-war-briefing-finland-elon-musk-starlink-coverage-russia",
    "publication_date": "2026-09-25",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-trump-rejects-iran-hormuz-deal",
    "title": {
      "ru": "Трамп отклонил иранское семидневное предложение по открытию Ормузского пролива",
      "en": "Trump rejects Iran's seven-day peace deal to reopen strait of Hormuz"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/sep/26/trump-dismiss-iran-seven-day-peace-deal-hormuz",
    "publication_date": "2026-09-26",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "mea-us-ships-indian-ocean-irgc",
    "title": {
      "ru": "КСИР: суда США в Индийском океане будут поражены при новой войне",
      "en": "US ships in Indian Ocean will be hit if US launches new attacks, IRGC says"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/us-ships-indian-ocean-will-be-hit-if-another-war-breaks-out-irgc-says",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "mea-iraq-seeks-us-exemption-sanctions",
    "title": {
      "ru": "Ирак просит США об исключении из санкций против иранских авиалиний",
      "en": "Iraq seeks US exemption from sanctions on Iranian airlines"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/iraq-seeks-us-exemption-sanctions-iranian-airlines",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "quotes": [
      {
        "criterion": "D3.3",
        "text": "All Iraqi airports enforced the US ban this week, resulting in major disruption at the airport serving the holy city of Najaf, the main destination in Iraq for Iranian flights."
      }
    ]
  },
  {
    "id": "aa-oman-hormuz-navigation",
    "title": {
      "ru": "Оман обещает обеспечивать навигацию в Ормузском проливе и призывает Иран и США к урегулированию",
      "en": "Oman pledges to safeguard Strait of Hormuz navigation, urges Iran-US settlement"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/oman-pledges-to-safeguard-strait-of-hormuz-navigation-urges-iran-us-settlement/4070489",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "mea-us-coalition-withdraw-iraq-kurdistan",
    "title": {
      "ru": "Коалиция во главе с США выведет войска из Иракского Курдистана к 30 сентября",
      "en": "US-led coalition to withdraw from Iraqi Kurdistan by 30 September"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/us-led-coalition-withdraw-iraqs-kurdistan-30-september",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "quotes": [
      {
        "criterion": "D1.6",
        "text": "US-led coalition forces are scheduled to withdraw from facilities in Iraq's Kurdistan region by 30 September under an agreement between Baghdad and Washington to wind down the coalition mission."
      }
    ]
  },
  {
    "id": "aa-iraq-us-dollar-cash-shipments",
    "title": {
      "ru": "Ирак и США договорились возобновить поставки наличных долларов",
      "en": "Iraq, US agree to resume dollar cash shipments"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/iraq-us-agree-to-resume-dollar-cash-shipments/4070491",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "quotes": [
      {
        "criterion": "D4.5",
        "text": "Baghdad has reached an understanding with the US to resume dollar cash shipments to Iraq after a months-long suspension, an Iraqi government spokesman said on Saturday."
      }
    ]
  },
  {
    "id": "aa-australia-openai-anthropic-senate",
    "title": {
      "ru": "Австралия вызвала главы OpenAI и Anthropic на парламентское расследование по ИИ",
      "en": "Australia calls OpenAI, Anthropic CEOs to face Senate AI inquiry"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/australia-calls-openai-anthropic-ceos-to-face-senate-ai-inquiry/4070696",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "guardian-london-takeover-frenzy",
    "title": {
      "ru": "Банкиры и юристы Лондона заработали более £1 млрд на волне поглощений",
      "en": "London's investment bankers and lawyers make more than £1bn in takeover frenzy"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/business/2026/sep/27/londons-investment-bankers-lawyers-paid-more-than-1bn",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aj-yemen-forces-widen-attacks-houthis",
    "title": {
      "ru": "Силы правительства Йемена расширяют атаки против хуситов",
      "en": "Yemen government forces widen attacks against Houthis: What we know"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/9/27/yemen-government-forces-widen-attacks-against-houthis-what-we-know",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "quotes": [
      {
        "criterion": "D4.4",
        "text": "In recent weeks, the Houthis have made dramatic territorial gains against the government forces, seizing the strategic Red Sea coastal city of Mocha and expanding their control over the Bab al-Mandeb strait, a global maritime chokepoint connecting Europe to Asia."
      }
    ]
  },
  {
    "id": "aj-iran-shifts-trade-caspian",
    "title": {
      "ru": "Иран переориентирует торговлю на Каспий из-за войны и Ормузского пролива",
      "en": "Iran shifts trade north to Caspian Sea as war impairs Strait of Hormuz"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/economy/2026/9/27/can-iran-shift-trade-north-to-caspian-sea-as-war-impairs-strait-of-hormuz",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "yonhap-dmz-blast-joint-probe",
    "title": {
      "ru": "Военные Южной Кореи и Командование ООН проводят совместную проверку места взрыва в ДМЗ",
      "en": "S. Korean military, U.N. Command conduct joint probe of DMZ blast site"
    },
    "domain": "en.yna.co.kr",
    "url": "https://en.yna.co.kr/view/AEN20260927002651315",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-09-27",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "quotes": [
      {
        "criterion": "D8.3",
        "text": "The survey team -- comprising South Korean troops, the UNC's Military Armistice Commission and relevant investigative agencies -- inspected the area using mine detectors and conducted route-clearance operations in the DMZ"
      }
    ]
  },
  {
    "id": "aljazeera-iran-war-live-hormuz",
    "title": {
      "ru": "Хроника войны с Ираном: США отвергли заявление о «продвинутом» дроне, захваченном в Ормузе",
      "en": "Iran war updates: US refutes claim that 'advanced' drone seized in Hormuz"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/liveblog/2026/9/27/iran-war-live-tehran-awaits-official-response-as-trump-rejects-hormuz-plan",
    "publication_date": "2026-09-27",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aljazeera-cameroon-raid-0922",
    "title": {
      "ru": "На крайнем севере Камеруна сотни людей бегут из домов после рейда боевиков",
      "en": "Hundreds flee homes in Far North Cameroon after armed group raid kills 15"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/9/22/hundreds-flee-homes-in-far-north-cameroon-after-armed-group-raid-kills-15",
    "publication_date": "2026-09-22",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "adfmag-rsf-defections-0922",
    "title": {
      "ru": "Могут ли переходы бойцов RSF изменить ход гражданской войны в Судане?",
      "en": "Could RSF Defections Turn Tide of Sudanese Civil War?"
    },
    "domain": "adf-magazine.com",
    "url": "https://adf-magazine.com/2026/09/could-rsf-defections-turn-tide-of-sudanese-civil-war/",
    "publication_date": "2026-09-22",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-pakistan-airstrikes-0924",
    "title": {
      "ru": "Пакистан заявил об авиаударах по Афганистану после атак беспилотников",
      "en": "Afghanistan vows to respond after Pakistani air strikes kill four"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/9/24/pakistan-says-it-launches-air-strikes-on-afghanistan-after-drone-attacks",
    "publication_date": "2026-09-24",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "thehindu-afghan-border-clash-0925",
    "title": {
      "ru": "Пакистанские силы убили нескольких боевиков «Талибана» в пограничном столкновении",
      "en": "Pakistani forces kill several Afghan Taliban fighters in border clash amid escalating tensions"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/pakistani-forces-kill-several-afghan-taliban-fighters-in-border-clash-amid-escalating-tensions/article71507478.ece",
    "publication_date": "2026-09-25",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  }
];
})();
