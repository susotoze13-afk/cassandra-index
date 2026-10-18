window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.global = {
  "index": 56,
  "delta": 13
};
  s.published = "2026-09-20";
  s.through = "2026-09-20";
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
  s.sensitivity = 1.6;
  s.coverageCriteria = {
  "covered": 43,
  "total": 46
};
  s.recalc = {
  "at": "2026-10-18T13:48:51.352Z",
  "reason": "Еженедельный пересчёт",
  "previous": 56,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
  s.regions = {
  "europe": {
    "index": 42,
    "delta": 2,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 53,
    "delta": 19,
    "status": "danger",
    "background": false
  },
  "middle-east": {
    "index": 60,
    "delta": 22,
    "status": "danger",
    "background": false
  },
  "north-america": {
    "index": 37,
    "delta": 13,
    "status": "tense",
    "background": true
  },
  "south-asia": {
    "index": 54,
    "delta": 13,
    "status": "danger",
    "background": true
  },
  "africa": {
    "index": 54,
    "delta": 14,
    "status": "danger",
    "background": false
  }
};
  s.regions["europe"] = {
  "index": 42,
  "delta": 2,
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
  "index": 53,
  "delta": 19,
  "status": "danger",
  "background": false,
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
          "url": "https://www.reuters.com/world/asia-pacific/north-korea-fires-missile-off-east-coast-yonhap-says-2026-09-20/",
          "publication_date": "2026-09-20",
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
  "index": 60,
  "delta": 22,
  "status": "danger",
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
          "publication_date": "2026-09-20",
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
          "publication_date": "2026-09-20",
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
          "publication_date": "2026-09-20",
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
  "index": 37,
  "delta": 13,
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
  "index": 54,
  "delta": 13,
  "status": "danger",
  "background": true,
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
  "index": 54,
  "delta": 14,
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
    "date": "2026-07-05",
    "value": 58
  },
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
  }
];
  // Редакционный сид недели 2026-09-20: три главных драйвера недели.
  // Источники — verbatim-записи из calc/input/2026-09-20.json (R55).
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
        "publication_date": "2026-09-20",
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
        "publication_date": "2026-09-20",
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
        "publication_date": "2026-09-20",
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
        "publication_date": "2026-09-20",
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
    "id": "www-kyivpost-com-post-84608",
    "title": {
      "ru": "ISW: оценка российского наступления, 15 сентября 2026",
      "en": "ISW Russian Offensive Campaign Assessment, September 15, 2026"
    },
    "domain": "kyivpost.com",
    "url": "https://www.kyivpost.com/post/84608",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
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
    "id": "spravzhne-media-gur-warehouse-zaporizhzhia",
    "title": {
      "ru": "ГУР уничтожило склад боеприпасов и горючего РФ в Запорожье",
      "en": "Ukrainian military intelligence destroys Russian ammunition and fuel depot in Zaporizhzhia"
    },
    "domain": "spravzhne.media",
    "url": "https://spravzhne.media/rus/war/1789900681-rossiyskiy-sklad-boepripasov-i-goryuchego-unichtozhili-na-zaporozhe",
    "publication_date": "2026-09-20",
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
  },
  {
    "id": "abcnews-com-ukrainian-drones-moscow-refinery-136595832",
    "title": {
      "ru": "Украинские дроны и ракеты атаковали Москву и нефтеперерабатывающий завод, есть погибшие",
      "en": "Ukrainian drones and missiles target Moscow, oil refinery in deadly attack: officials"
    },
    "domain": "abcnews.com",
    "url": "https://abcnews.com/International/ukrainian-drones-target-moscow-oil-refinery-deadly-attack/story?id=136595832",
    "publication_date": "2026-09-20",
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
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "24tv-ua-ataka-shahedov-16-sentjabrja",
    "title": {
      "ru": "Россия била по Украине дронами и ракетами: карта воздушных тревог",
      "en": "Russia struck Ukraine with drones and missiles: air-raid map"
    },
    "domain": "24tv.ua",
    "url": "https://24tv.ua/ru/ataka-shahedov-16-sentjabrja-2026-goda-kuda-letjat-drony-karta-trevog_n3143369",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
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
  },
  {
    "id": "www-reuters-com-north-korea-vice-defence-minister",
    "title": {
      "ru": "КНДР заявляет, что наращивание вооружений США оправдывает расширение ядерных сил",
      "en": "North Korea says US-led arms buildup justifies expanding nuclear force"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/business/aerospace-defense/north-korea-vice-defence-minister-says-us-arms-buildup-justifies-expanding-2026-09-17/",
    "publication_date": "2026-09-17",
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
  },
  {
    "id": "www-reuters-com-north-korea-fires-two-missiles",
    "title": {
      "ru": "КНДР выпустила две предположительно баллистические ракеты у восточного побережья",
      "en": "North Korea fires two suspected ballistic missiles off east coast within three hours"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/world/asia-pacific/north-korea-fires-missile-off-east-coast-yonhap-says-2026-09-20/",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "ria-ru-renkhap-ballistic-2118896646",
    "title": {
      "ru": "СМИ: ракета, запущенная КНДР в сторону Японского моря, была баллистической",
      "en": "Media: North Korean missile fired toward the Sea of Japan was ballistic"
    },
    "domain": "ria.ru",
    "url": "https://ria.ru/20260920/renkhap-2118896646.html",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "quotes": [
      {
        "criterion": "D2.3",
        "text": "СМИ: ракета, запущенная КНДР в сторону Японского моря, была баллистической"
      }
    ]
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
    "id": "www-dw-com-russia-closing-german-consulate-a-79149908",
    "title": {
      "ru": "Россия объявила о закрытии генерального консульства Германии в Санкт-Петербурге",
      "en": "Russia announces it is closing Germany's consulate in St. Petersburg"
    },
    "domain": "dw.com",
    "url": "https://www.dw.com/en/russia-announces-it-is-closing-germanys-consulate-in-st-petersburg/a-79149908",
    "publication_date": "2026-09-07",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-newindianexpress-com-iran-seven-conditions",
    "title": {
      "ru": "Иран выдвинул семь условий для переговоров с США через Катар и предупредил о «решающей войне»",
      "en": "Iran sets seven conditions for talks with US through Qatar, warns of decisive war if Trump rejects demands"
    },
    "domain": "newindianexpress.com",
    "url": "https://www.newindianexpress.com/world/2026/Sep/20/iran-sets-seven-conditions-for-talks-with-us-through-qatar-warns-of-decisive-war-if-trump-rejects-demands",
    "publication_date": "2026-09-20",
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
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
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
  },
  {
    "id": "www-euractiv-com-extend-russia-sanctions-oligarch-stand-off",
    "title": {
      "ru": "Страны ЕС продлили санкции против России на фоне нового спора об олигархе",
      "en": "EU countries extend Russia sanctions amid latest oligarch stand-off"
    },
    "domain": "euractiv.com",
    "url": "https://www.euractiv.com/news/eu-countries-extend-russia-sanctions-amid-latest-oligarch-stand-off/",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "mezha-net-evening-digest-14-veresnia",
    "title": {
      "ru": "Вечерний дайджест: Украина и мир — 14 сентября 2026",
      "en": "Evening Digest: Ukraine and the World — September 14, 2026"
    },
    "domain": "mezha.net",
    "url": "https://mezha.net/eng/news/vechirnii-daidzhest-ukraina-ta-svit-14-veresnia-2026/",
    "publication_date": "2026-09-14",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "lenta-ru-kreml-predlozhil-sdelku-peskov-dva-usloviya",
    "title": {
      "ru": "Кремль предложил сделку Западу и Украине: Песков выдвинул два условия",
      "en": "Kremlin unexpectedly offered a deal to the West and Ukraine: Peskov set two conditions"
    },
    "domain": "lenta.ru",
    "url": "https://lenta.ru/news/2026/09/15/long-kreml-neozhidanno-predlozhil-sdelku-zapadu-i-ukraine-peskov-vydvinul-dva-usloviya/",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-dw-com-ru-obmen-telami-a-79313703",
    "title": {
      "ru": "Украина и Россия вновь обменялись телами погибших военных",
      "en": "Ukraine and Russia exchange bodies of fallen soldiers again"
    },
    "domain": "dw.com",
    "url": "https://www.dw.com/ru/ukraina-i-rossia-vnov-obmenalis-telami-pogibsih-voennyh/a-79313703",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-rbc-ru-obmen-telami-17-09-2026",
    "title": {
      "ru": "Россия и Украина провели обмен телами погибших военнослужащих",
      "en": "Russia and Ukraine hold exchange of fallen service members' bodies"
    },
    "domain": "rbc.ru",
    "url": "https://www.rbc.ru/politics/17/09/2026/6aabb5e1bbf383b65c1f8e89",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "quotes": [
      {
        "criterion": "D3.5",
        "text": "По информации Саралиева, обмен прошел в пункте пропуска «Новая Гута» на белорусско-украинской границе. Россия передала 252 тела погибших военнослужащих, Украина — 23. Факт обмена подтвердил и украинский координационный штаб. Там уточнили, что возвращению тел погибших содействовал Международный Комитет Красного Креста."
      }
    ]
  },
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
  },
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
    "state_affiliated": false,
    "quotes": [
      {
        "criterion": "D7.1",
        "text": "The State Department approved a potential $2.68 billion sale of air defense equipment to Ukraine on Friday."
      }
    ]
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
    "id": "ria-ru-medvedev-voennoe-sderzhivanie-2118722131",
    "title": {
      "ru": "Медведев призвал ответить на санкции США языком военного сдерживания",
      "en": "Medvedev calls for answering US sanctions with the language of military deterrence"
    },
    "domain": "ria.ru",
    "url": "https://ria.ru/20260919/medvedev-2118722131.html",
    "publication_date": "2026-09-19",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-aa-com-tr-medvedev-voennoe-sderzhivanie-4061817",
    "title": {
      "ru": "Экс-президент РФ предложил ответить на «адские санкции» США языком военного сдерживания",
      "en": "Ex-president of Russia proposes answering US 'hellish sanctions' with language of military deterrence"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/ru/%D0%BC%D0%B8%D1%80/%D1%8D%D0%BA%D1%81-%D0%BF%D1%80%D0%B5%D0%B7%D0%B8%D0%B4%D0%B5%D0%BD%D1%82-%D1%80%D1%84-%D0%BF%D1%80%D0%B5%D0%B4%D0%BB%D0%BE%D0%B6%D0%B8%D0%BB-%D0%BE%D1%82%D0%B2%D0%B5%D1%82%D0%B8%D1%82%D1%8C-%D0%BD%D0%B0-%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B5-%D1%81%D0%B0%D0%BD%D0%BA%D1%86%D0%B8%D0%B8-%D1%81%D1%88%D0%B0-%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%BC-%D0%B2%D0%BE%D0%B5%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE-%D1%81%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F/4061817",
    "publication_date": "2026-09-19",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-interfax-ru-cik-ddos-1117223",
    "title": {
      "ru": "Глава ЦИК РФ сообщила о более чем тысяче волн DDoS-атак на инфраструктуру в избирательном процессе",
      "en": "Head of Russian Central Election Commission reports over a thousand waves of DDoS attacks on election infrastructure"
    },
    "domain": "interfax.ru",
    "url": "https://www.interfax.ru/russia/1117223",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "primary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "quotes": [
      {
        "criterion": "D5.2",
        "text": "Более 1 тыс. волн DDoS-атак было зафиксировано на задействованную в организации голосования на выборах в РФ инфраструктуру, более 120 - на дистанционное электронное голосование (ДЭГ), заявила председатель ЦИК РФ Элла Памфилова."
      }
    ]
  },
  {
    "id": "therecord-media-russia-cyberattacks-during-election",
    "title": {
      "ru": "В России сообщают о тысячах кибератак на избирательную инфраструктуру во время голосования",
      "en": "Russia reports thousands of cyberattacks on election infrastructure during vote"
    },
    "domain": "therecord.media",
    "url": "https://therecord.media/russia-reports-cyberattacks-during-election",
    "publication_date": "2026-09-21",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "dfrlab-org-storm-1516-baltic-states",
    "title": {
      "ru": "Операция Storm-1516 нацелена на прибалтийские государства",
      "en": "Storm-1516 operation targets the Baltic states"
    },
    "domain": "dfrlab.org",
    "url": "https://dfrlab.org/2026/09/17/storm-1516-operation-targets-the-baltic-states/",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "C-registries",
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
  },
  {
    "id": "unn-ua-donetsk-evacuation-zone",
    "title": {
      "ru": "В Донецкой области расширили зону принудительной эвакуации детей",
      "en": "Forced evacuation zone for children expanded in Donetsk region"
    },
    "domain": "unn.ua",
    "url": "https://unn.ua/ru/news/v-donetskoi-oblasti-rasshirili-zonu-prinuditelnoi-evakuatsii-detei",
    "publication_date": "2026-09-16",
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
  },
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
  },
  {
    "id": "www-thehindu-com-saudi-houthi-ballistic-article71486051",
    "title": {
      "ru": "Саудовская Аравия подтвердила: хуситы попытались атаковать её столицу баллистической ракетой",
      "en": "Saudi Arabia confirms Yemen's Houthi rebels tried to attack its capital with ballistic missile"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/saudi-arabia-confirms-yemens-houthi-rebels-tried-to-attack-its-capital-with-ballistic-missile/article71486051.ece",
    "publication_date": "2026-09-20",
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
    "state_affiliated": false,
    "quotes": [
      {
        "criterion": "D4.1",
        "text": "Правительство приняло решение продлить запрет на экспорт дизельного топлива для производителей до конца октября 2026 г."
      }
    ]
  },
  {
    "id": "www-interfax-ru-diesel-export-ban-1116328",
    "title": {
      "ru": "СМИ сообщили о планах продлить запрет экспорта дизтоплива для производителей до ноября",
      "en": "Media report plans to extend ban on diesel exports for producers until November"
    },
    "domain": "interfax.ru",
    "url": "https://www.interfax.ru/business/1116328",
    "publication_date": "2026-09-16",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
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
    "id": "www-rbc-ru-400-flights-delayed-20-09-2026",
    "title": {
      "ru": "Более 400 рейсов задержали в московских аэропортах из-за атаки беспилотников",
      "en": "Over 400 flights delayed at Moscow airports due to drone attack"
    },
    "domain": "rbc.ru",
    "url": "https://www.rbc.ru/politics/20/09/2026/6aaf7792201b0189cffa7df7",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "quotes": [
      {
        "criterion": "D1.4",
        "text": "На фоне самой массированной атаки беспилотников на Москву аэропорты столичного авиаузла перенесли и отменили часть рейсов. В общей сложности задержано было более 400 рейсов."
      }
    ]
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
    "state_affiliated": true,
    "quotes": [
      {
        "criterion": "D4.1",
        "text": "Правительство РФ ввело временное ограничение на экспорт серной кислоты. Соответствующее постановление премьер-министр Михаил Мишустин подписал 12 сентября."
      }
    ]
  },
  {
    "id": "news-ru-mobilnyj-internet-15-sentyabrya",
    "title": {
      "ru": "Почему не работает мобильный интернет 15 сентября: причины сбоев в России",
      "en": "Why mobile internet is down on 15 September: causes of outages in Russia"
    },
    "domain": "news.ru",
    "url": "https://news.ru/society/pochemu-ne-rabotaet-mobilnyj-internet-15-sentyabrya-prichiny-sboi-v-rossii",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "incidentia-ru-mobilnyy-internet-ogranichili",
    "title": {
      "ru": "Мобильный интернет в России ограничили из-за угрозы беспилотников",
      "en": "Mobile internet restricted in Russia due to drone threat"
    },
    "domain": "incidentia.ru",
    "url": "https://incidentia.ru/news/mobilnyy-internet-v-rossii-ogranichili-iz-2026-09-15",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "airlive-net-gps-jamming-sweden-2026-09-18",
    "title": {
      "ru": "Несколько рейсов сообщили о GPS-постановке помех над Швецией за последние сутки",
      "en": "Multiple flights reported GPS jamming over Sweden in the past 24 hours"
    },
    "domain": "airlive.net",
    "url": "https://airlive.net/news/2026/09/18/multiple-flights-reported-gps-jamming-over-sweden-in-the-past-24-hours/",
    "publication_date": "2026-09-18",
    "accessed_date": "2026-09-25",
    "source_type": "OSINT",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-nytimes-com-ukraine-russia-talks-wtk",
    "title": {
      "ru": "Переговоры России и Украины: где находится мирный процесс, 5 сентября 2026",
      "en": "Here Is Where Ukraine Peace Talks Stand, as a New Round Begins"
    },
    "domain": "nytimes.com",
    "url": "https://www.nytimes.com/2026/09/05/world/europe/ukraine-russia-talks-wtk.html",
    "publication_date": "2026-09-05",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "understandingwar-org-roca-september-17-2026",
    "title": {
      "ru": "ISW: оценка российского наступления, 17 сентября 2026",
      "en": "ISW Russian Offensive Campaign Assessment, September 17, 2026"
    },
    "domain": "understandingwar.org",
    "url": "https://understandingwar.org/research/russia-ukraine/russian-offensive-campaign-assessment-september-17-2026/",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "www-nti-org-nuclear-security-index-2026",
    "title": {
      "ru": "Индекс ядерной безопасности NTI 2026: Россия и США сокращают участие в ядерной безопасности",
      "en": "Russia and United States retreat from nuclear security as 12 countries step up, 2026 NTI Nuclear Security Index finds"
    },
    "domain": "nti.org",
    "url": "https://www.nti.org/news/russia-and-united-states-retreat-from-nuclear-security-as-12-countries-step-up-2026-nti-nuclear-security-index-finds/",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "sanctionsnews-bakermckenzie-com-graham-act-tariff-powers",
    "title": {
      "ru": "Президент США подписал закон о санкциях против России и Ирана с новыми полномочиями на пошлины",
      "en": "US President signs Russia and Iran sanctions bill with new tariff powers"
    },
    "domain": "sanctionsnews.bakermckenzie.com",
    "url": "https://sanctionsnews.bakermckenzie.com/us-president-signs-russia-and-iran-sanctions-bill-with-new-tariff-powers/",
    "publication_date": "2026-09-21",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-legal500-com-weekly-sanctions-update-2026-09-08",
    "title": {
      "ru": "Еженедельный обзор санкций, 8 сентября 2026: ЕС готовит пакет до 1600 листингов по ВПК России",
      "en": "Weekly Sanctions Update: September 8, 2026"
    },
    "domain": "legal500.com",
    "url": "https://www.legal500.com/intelligence/global/government-public-sector/weekly-sanctions-update-september-8-2026",
    "publication_date": "2026-09-08",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "understandingwar-org-roca-september-18-2026",
    "title": {
      "ru": "ISW: оценка российского наступления, 18 сентября 2026",
      "en": "ISW Russian Offensive Campaign Assessment, September 18, 2026"
    },
    "domain": "understandingwar.org",
    "url": "https://understandingwar.org/research/russia-ukraine/russian-offensive-campaign-assessment-september-18-2026/",
    "publication_date": "2026-09-19",
    "accessed_date": "2026-09-25",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "24tv-ua-mobilizacija-rossija-300-tysjach-n3138153",
    "title": {
      "ru": "Зеленский заявил о планах России привлечь ещё 300 тысяч военнослужащих",
      "en": "Zelensky says Russia plans to bring in 300,000 more troops"
    },
    "domain": "24tv.ua",
    "url": "https://24tv.ua/ru/mobilizacija-v-rossii-v-sentjabre-2026-goda-rossija-planiruet-otpravit-na-front-300-tysjach-chelovek_n3138153",
    "publication_date": "2026-09-08",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "nv-ua-isw-minoborony-prinuditelny-prizyv-50636768",
    "title": {
      "ru": "ISW: Минобороны РФ готовится к принудительному призыву осенью 2026 года",
      "en": "ISW: Russian Defense Ministry prepares for compulsory call-up in autumn 2026"
    },
    "domain": "nv.ua",
    "url": "https://nv.ua/world/countries/mobilizaciya-v-rossii-2026-minoborony-gotovitsya-k-prinuditelnomu-prizyvu-analiz-isw-50636768.html",
    "publication_date": "2026-08-29",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "ru-themoscowtimes-com-zapasnik-vyezd-a205473",
    "title": {
      "ru": "В России начали ограничивать выезд запасников за границу по решению военкоматов",
      "en": "Russia begins restricting reservists' exit from country by military commissariat decisions"
    },
    "domain": "ru.themoscowtimes.com",
    "url": "https://ru.themoscowtimes.com/2026/09/07/v-rossii-nachali-ogranichivat-viezd-zapasnikov-za-granitsu-po-resheniyu-voenkomatov-a205473",
    "publication_date": "2026-09-07",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "nv-ua-zapret-vyezda-zapasniku-50639309",
    "title": {
      "ru": "В России впервые не выпустили за границу военнообязанного запаса по решению военкомата",
      "en": "Russia for first time bars military reservist from leaving country by military commissariat decision"
    },
    "domain": "nv.ua",
    "url": "https://nv.ua/world/countries/mobilizaciya-v-rossii-vpervye-voennoobyazannomu-zapasa-zapretili-vyezd-po-resheniyu-voenkomata-50639309.html",
    "publication_date": "2026-09-07",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tsn-ua-rossiyan-ostanavlivayut-granitse-3163967",
    "title": {
      "ru": "Россиян начали останавливать на границе: в чём причина",
      "en": "Russians being stopped at the border: what is known"
    },
    "domain": "tsn.ua",
    "url": "https://tsn.ua/ru/svit/rossiyan-nachali-ostanavlivat-na-granitse-v-chem-prichina-3163967.html",
    "publication_date": "2026-09-07",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "fakty-com-ua-vyyizd-cholovikiv-1-veresnya",
    "title": {
      "ru": "Выезд мужчин за границу с 1 сентября 2026: кто имеет право и какие документы нужны",
      "en": "Men's travel abroad from 1 September 2026: who is eligible and which documents are required"
    },
    "domain": "fakty.com.ua",
    "url": "https://fakty.com.ua/ru/ukraine/20260901-vyyizd-cholovikiv-za-kordon-z-1-veresnya-hto-maye-pravo-ta-yaki-dokumenty-potribni/",
    "publication_date": "2026-09-01",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-independent-co-uk-ukraine-russia-talks-envoys-b3045408",
    "title": {
      "ru": "Украина — Россия: эмиссары Трампа покинули переговоры, по Киеву ударили баллистическими ракетами",
      "en": "Ukraine–Russia war: Trump's envoys leave talks as Kyiv hit by ballistic missiles"
    },
    "domain": "independent.co.uk",
    "url": "https://www.independent.co.uk/news/world/europe/ukraine-russia-war-live-trump-putin-zelensky-talks-witkoff-kushner-b3045408.html",
    "publication_date": "2026-09-08",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-iaea-org-update-366-ukraine-znpp",
    "title": {
      "ru": "МАГАТЭ: заявление гендиректора о ситуации на ЗАЭС, 11 сентября 2026",
      "en": "IAEA Director General statement on situation in Ukraine, Update 366, 11 September 2026"
    },
    "domain": "iaea.org",
    "url": "https://www.iaea.org/newscenter/pressreleases/update-366-iaea-director-general-statement-on-situation-in-ukraine",
    "publication_date": "2026-09-11",
    "accessed_date": "2026-09-25",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "www-aa-com-tr-rosatom-grossi-znpp-vienna-4057265",
    "title": {
      "ru": "Глава «Росатома» и гендиректор МАГАТЭ обсудили безопасность ЗАЭС в Вене",
      "en": "Rosatom chief, UN nuclear watchdog director general discuss Zaporizhzhia plant safety in Vienna"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/rosatom-chief-un-nuclear-watchdog-director-general-discuss-zaporizhzhia-nuclear-plant-s-safety-in-vienna/4057265",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-thehindubusinessline-com-iaea-kursk-npp-drone-71483674",
    "title": {
      "ru": "МАГАТЭ осудило атаки на ядерные объекты после удара дрона по градирне Курской АЭС",
      "en": "IAEA condemns attacks on nuclear facilities after drone hits Kursk nuclear plant cooling tower"
    },
    "domain": "thehindubusinessline.com",
    "url": "https://www.thehindubusinessline.com/news/world/iaea-condemns-attacks-on-nuclear-facilities-after-drone-hits-kursk-nuclear-plant-cooling-tower/article71483674.ece",
    "publication_date": "2026-09-19",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-forbes-ru-vysylka-150-diplomatov-germaniya",
    "title": {
      "ru": "Посольство России сообщило о высылке из Германии 150 дипломатов и членов их семей",
      "en": "Russian embassy reports expulsion of 150 diplomats and their family members from Germany"
    },
    "domain": "forbes.ru",
    "url": "https://www.forbes.ru/society/568359-posol-stvo-rossii-rasskazalo-o-vysylke-iz-germanii-150-diplomatov-i-clenov-ih-semej",
    "publication_date": "2026-09-10",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "uawire-org-germany-150-russian-staff-leave",
    "title": {
      "ru": "Германия потребовала от более чем 150 сотрудников российских миссий и их родственников покинуть страну",
      "en": "Germany orders over 150 Russian mission staff and relatives to leave"
    },
    "domain": "uawire.org",
    "url": "https://uawire.org/germany-orders-over-150-russian-mission-staff-and-relatives-to-leave",
    "publication_date": "2026-09-11",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "quotes": [
      {
        "criterion": "D3.1",
        "text": "The Russian Consulate General in Bonn is set to cease operations on September 18. Germany has also terminated the agreement allowing the Russian House cultural center to operate in Berlin."
      }
    ]
  },
  {
    "id": "unn-ua-germany-expels-150-diplomats-leipzig",
    "title": {
      "ru": "Германия выдворяет более 150 российских дипломатов и членов их семей после инцидента в Лейпциге",
      "en": "Germany expels more than 150 Russian diplomats and their family members following Leipzig incident"
    },
    "domain": "unn.ua",
    "url": "https://unn.ua/en/news/germany-expels-more-than-150-russian-diplomats-and-their-family-members-following-sabotage-in-leipzig",
    "publication_date": "2026-09-10",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-coalition-intercept-houthi-missile-riyadh",
    "title": {
      "ru": "Коалиция во главе с Саудовской Аравией заявила о перехвате ракеты хуситов по Эр-Рияду",
      "en": "Saudi-led coalition says defence intercepted Houthi missile fired at Riyadh"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/9/19/saudi-led-coalition-says-defences-intercept-houthi-missile-fired-at-riyadh",
    "publication_date": "2026-09-19",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-sudan-drones-0915",
    "title": {
      "ru": "Суданская армия сбила три беспилотника на востоке страны",
      "en": "Sudanese army downs 3 drones in eastern Sudan"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/sudanese-army-downs-3-drones-in-eastern-sudan/4057370",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "nigerianeye-boko-haram-adamawa-0915",
    "title": {
      "ru": "Атака «Боко Харам» в штате Адамава: четверо погибших, сожжены дома",
      "en": "Boko Haram Attack in Adamawa Leaves Four Dead and Homes Destroyed"
    },
    "domain": "nigerianeyenewspaper.com",
    "url": "https://nigerianeyenewspaper.com/2026/09/15/boko-haram-attack-in-adamawa-leaves-four-dead-and-homes-destroyed/",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  }
];
})();
