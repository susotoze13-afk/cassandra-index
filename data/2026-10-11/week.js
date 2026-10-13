window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-11"] = window.CI_DATA.snapshots["2026-10-11"] || {};
  s.global = {
  "index": 56,
  "delta": 10
};
  s.published = "2026-10-11";
  s.through = "2026-10-11";
  s.methodology = "3.0";
  s.dataState = "published";
  s.q = 0.8622;
  s.nullWeight = 0.1378;
  s.coverage = {
  "coveredDrivers": 7,
  "totalDrivers": 9
};
  s.confidence = "full";
  s.sensitivity = 0;
  s.recalc = {
  "at": "2026-10-12T19:45:45.888Z",
  "reason": "Еженедельный пересчёт",
  "previous": 56,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
  s.regions = {
  "europe": {
    "index": 51,
    "delta": 7,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 62,
    "delta": 18,
    "status": "very",
    "background": false
  },
  "middle-east": {
    "index": 67,
    "delta": 28,
    "status": "very",
    "background": false
  },
  "north-america": {
    "index": 52,
    "delta": 10,
    "status": "danger",
    "background": false
  },
  "south-asia": {
    "index": 54,
    "delta": 10,
    "status": "danger",
    "background": true
  },
  "africa": {
    "index": 53,
    "delta": 9,
    "status": "danger",
    "background": false
  }
};
  s.regions["europe"] = {
  "index": 51,
  "delta": 7,
  "status": "danger",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Война РФ–Украина продолжается: удары РФ по Запорожью убили 21 человека, включая детей, а украинские дроны на время закрыли аэропорты Москвы, пока Путин возвращался в Россию. На этом фоне Франция провела пуск БРПЛ M51.3, а НАТО анонсировала ядерные учения Steadfast Noon.",
        "en": "The Russia–Ukraine war continues: Russian strikes on Zaporizhzhia killed 21 people including children, while Ukrainian drones temporarily closed Moscow airports as Putin flew back to Russia. Against this backdrop France test-fired an M51.3 SLBM and NATO announced the Steadfast Noon nuclear drills."
      },
      "why": {
        "ru": "Одновременная фронтовая эскалация и подчёркнутые ядерные сигналы на европейском театре повышают риск неверного шага.",
        "en": "Simultaneous battlefield escalation and emphasised nuclear signals on the European theatre raise the risk of miscalculation."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "france24-zaporizhzhia-strikes-diesel",
          "title": {
            "ru": "Трамп и Зеленский поспорили из-за дизельной сделки, удары РФ по Украине убили 21 человека",
            "en": "Trump, Zelensky clash over diesel deal as Russian strikes on Ukraine kill 21, including children"
          },
          "domain": "france24.com",
          "url": "https://www.france24.com/en/europe/20261010-trump-zelensky-clash-over-diesel-deal-as-russian-strikes-on-ukraine-kill-21-including-children",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "nyt-ukraine-drones-moscow-airports",
          "title": {
            "ru": "Украинские дроны закрыли аэропорты Москвы, пока Путин возвращался в Россию",
            "en": "Ukrainian drones close Moscow airports as Putin flies back to Russia"
          },
          "domain": "nytimes.com",
          "url": "https://www.nytimes.com/2026/10/09/world/europe/russia-putin-plane-ukraine.html",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "defensegouv-m513-acceptance-test",
          "title": {
            "ru": "Ракета M51.3: успешный приёмочный пуск с ПЛАРБ Le Vigilant",
            "en": "M51.3 missile: successful acceptance test from SSBN Le Vigilant"
          },
          "domain": "defense.gouv.fr",
          "url": "https://www.defense.gouv.fr/actualites/missile-m513-tir-dacceptation-reussi-snle-vigilant",
          "publication_date": "2026-10-06",
          "accessed_date": "2026-10-11",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": true
        },
        {
          "id": "rt-nato-nuclear-drills",
          "title": {
            "ru": "НАТО просит Россию «не волноваться» из-за ядерных учений",
            "en": "NATO asks Russia 'not to worry' about nuclear drills"
          },
          "domain": "rt.com",
          "url": "https://www.rt.com/news/646984-nato-nuclear-exercise-polyansky/",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Дизельная сделка США–РФ расколола Запад: Зеленский в ярости после объявления о закупке российского дизеля, Германия и ЕС подтверждают сохранение санкций, ЕС удерживает резерв для Украины в многолетнем бюджете.",
        "en": "The US–Russia diesel deal split the West: Zelenskyy reacted furiously to the announced purchase of Russian diesel, Germany and the EU reaffirmed sanctions remain, and the EU kept its reserve for Ukraine in the multi-year budget."
      },
      "why": {
        "ru": "Раскол внутри западной коалиции ослабляет единство санкционного фронта и устойчивость поддержки Украины.",
        "en": "A split within the Western coalition weakens the unity of the sanctions front and the resilience of support for Ukraine."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "guardian-trump-putin-russian-diesel",
          "title": {
            "ru": "Зеленский в ярости: Трамп объявил о сделке по закупке российского дизеля",
            "en": "Zelenskyy furious as Trump announces deal to buy Russian diesel"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/us-news/2026/oct/09/trump-putin-russian-diesel-ukraine",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "sputnik-eu-budget-ukraine-reserve",
          "title": {
            "ru": "ЕС хочет сократить новый бюджет почти на 180 млрд, но сохранить 111 млрд для Украины",
            "en": "EU wants to reduce new budget by almost $180Bln but keep $111Bln for Ukraine"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261010/eu-wants-to-reduce-new-budget-by-almost-180bln-but-keep-111bln-for-ukraine-1124862422.html",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "nyt-europe-shadow-war",
          "title": {
            "ru": "Пока Путин ведёт теневую войну, Европа ищет способ дать сдачи",
            "en": "As Putin wages shadow war, Europe looks for a way to hit back"
          },
          "domain": "nytimes.com",
          "url": "https://www.nytimes.com/2026/10/09/world/europe/putin-russia-ukraine-war-europe-nato.html",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["east-asia"] = {
  "index": 62,
  "delta": 18,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Морское трение США–Китай: китайский ополченческий катер впервые замечен у восточного побережья Тайваня, в Южно-Китайском море произошёл инцидент с эсминцем США, а китайская военная авиация использует новый совместный аэродром в Лаосе.",
        "en": "US–China maritime friction: a Chinese militia boat was spotted for the first time off Taiwan's east coast, an incident involving a US destroyer occurred in the South China Sea, and Chinese military aircraft are using a new joint air facility in Laos."
      },
      "why": {
        "ru": "Расширение зон присутствия вокруг Тайваня и в Южно-Китайском море повышает риск прямого столкновения на море и в воздухе.",
        "en": "Expanding presence zones around Taiwan and in the South China Sea raise the risk of a direct clash at sea and in the air."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "scmp-us-warship-china-destroyer",
          "title": {
            "ru": "Потерял ли эсминец США ход при преследовании китайского эсминца в Южно-Китайском море?",
            "en": "Did a US warship lose power while chasing a Chinese destroyer in the South China Sea?"
          },
          "domain": "scmp.com",
          "url": "https://www.scmp.com/news/china/military/article/3370182/did-us-warship-lose-power-while-chasing-chinese-destroyer-south-china-sea",
          "publication_date": "2026-10-08",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "japantimes-china-militia-boat-taiwan",
          "title": {
            "ru": "Китайский ополченческий катер впервые замечен у восточного побережья Тайваня",
            "en": "China militia boat spotted for first time off Taiwan's east coast, patrol finds"
          },
          "domain": "japantimes.co.jp",
          "url": "https://www.japantimes.co.jp/news/2026/10/10/asia-pacific/china-militia-boat-first-taiwan-east-coast/",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "scmp-chinese-aircraft-laos-facility",
          "title": {
            "ru": "Используют ли китайские военные самолёты новый совместный аэродром в Лаосе?",
            "en": "Are Chinese military aircraft already using a new joint air facility in Laos?"
          },
          "domain": "scmp.com",
          "url": "https://www.scmp.com/news/china/military/article/3370439/are-chinese-military-aircraft-already-using-new-joint-air-facility-laos",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Анонсированы расширенные учения Японии и США Keen Sword 27 (19–29.10, около 45 000 японских военных, 40 кораблей, 260 летательных аппаратов). Тайвань объявил о росте оборонных расходов, Германия рассматривает вступление в проект истребителя GCAP.",
        "en": "Expanded Japan–US Keen Sword 27 exercises were announced (19–29.10, about 45,000 Japanese personnel, 40 ships, 260 aircraft). Taiwan announced higher defence spending and Germany is considering joining the GCAP fighter project."
      },
      "why": {
        "ru": "Рост масштаба учений и оборонных бюджетов в регионе повышает фоновую напряжённость вокруг Тайваня.",
        "en": "Growing exercise scale and defence budgets in the region raise background tension around Taiwan."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "scmp-keen-sword-27-exercises",
          "title": {
            "ru": "Как расширенные учения Японии и США могут осложнить планирование НОАК по Тайваню",
            "en": "How expanded Japan-US military exercises could complicate PLA planning over Taiwan"
          },
          "domain": "scmp.com",
          "url": "https://www.scmp.com/news/china/military/article/3370210/how-expanded-japan-us-military-exercises-could-complicate-pla-planning-over-taiwan",
          "publication_date": "2026-10-08",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "japantimes-taiwan-defense-spending",
          "title": {
            "ru": "Лидер Тайваня заявил о наращивании оборонных расходов для «сдерживания войны»",
            "en": "Taiwan's leader says increasing defense spending to 'deter war'"
          },
          "domain": "japantimes.co.jp",
          "url": "https://www.japantimes.co.jp/news/2026/10/10/asia-pacific/politics/taiwan-lai-increasing-defense-spending/",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "japantimes-germany-gcap",
          "title": {
            "ru": "Германия рассматривает вступление в проект истребителя GCAP с Великобританией, Италией и Японией",
            "en": "Germany eyes joining GCAP fighter jet project with U.K., Italy and Japan"
          },
          "domain": "japantimes.co.jp",
          "url": "https://www.japantimes.co.jp/news/2026/10/10/japan/gcap-germany-join-japan/",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["middle-east"] = {
  "index": 67,
  "delta": 28,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Хуситы нанесли серию ударов по аэропорту Эр-Рияда (12 погибших, более 300 раненых) и Дамаму; саудовская коалиция заявила об уничтожении 136 целей в Йемене, а силы правительства Йемена отбили Баб-эль-Мандебский пролив.",
        "en": "Houthis struck Riyadh airport (12 killed, more than 300 injured) and Dammam; the Saudi-led coalition said it destroyed 136 targets in Yemen, and Yemeni government forces recaptured the Bab al-Mandab strait."
      },
      "why": {
        "ru": "Впервые удар достиг столичного аэропорта Саудовской Аравии, а боевые действия идут у стратегического пролива — региональная интенсивность резко выросла.",
        "en": "For the first time the strike reached Saudi Arabia's capital airport, and fighting is at a strategic strait — regional intensity has risen sharply."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "mee-riyadh-airport-12-dead",
          "title": {
            "ru": "Атака на аэропорт Эр-Рияда: 12 погибших, более 300 раненых",
            "en": "Attack on Riyadh airport leaves 12 dead, more than 300 injured"
          },
          "domain": "middleeasteye.net",
          "url": "https://www.middleeasteye.net/news/attack-riyadh-airport-leaves-12-dead-more-300-injured",
          "publication_date": "2026-10-11",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "jpost-houthi-riyadh-airport-attack",
          "title": {
            "ru": "Атака хуситов на аэропорт Саудовской Аравии: 12 погибших, сотни раненых",
            "en": "Houthi attack on Saudi airport leaves 12 dead, hundreds wounded"
          },
          "domain": "jpost.com",
          "url": "https://www.jpost.com/middle-east/article-911232",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-saudi-coalition-136-targets",
          "title": {
            "ru": "Саудовская коалиция объявила о масштабной операции против хуситов и уничтожении 136 целей",
            "en": "Saudi-led coalition announces large-scale operation against Houthis in Yemen, says 136 military targets destroyed"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/saudi-led-coalition-announces-large-scale-operation-against-houthis-in-yemen-says-136-military-targets-destroyed/4084119",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aljazeera-world-condemns-riyadh",
          "title": {
            "ru": "Мир осуждает смертоносную атаку хуситов на аэропорт Эр-Рияда",
            "en": "World condemns deadly Houthi attack on Saudi Arabia's Riyadh airport"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/10/11/world-condemns-deadly-houthi-attack-on-saudi-arabias-riyadh-airport",
          "publication_date": "2026-10-11",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Морская конфронтация вокруг Ирана: США обездвижили коммерческое судно, пытавшееся прорвать блокаду в Оманском заливе, в Ормузском проливе на мине подорвался супертанкер, а EASA расширила предупреждение по воздушному пространству Саудовской Аравии.",
        "en": "Maritime confrontation around Iran: US forces disabled a commercial vessel trying to run the blockade in the Gulf of Oman, a supertanker hit a mine in the Strait of Hormuz, and EASA expanded its warning for Saudi airspace."
      },
      "why": {
        "ru": "Прямая угроза ключевому энергомаршруту мира связывает военную и экономическую эскалацию в один узел.",
        "en": "A direct threat to the world's key energy route links military and economic escalation into a single knot."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "aljazeera-us-disable-ship-gulf-oman",
          "title": {
            "ru": "США обездвижили судно, «пытавшееся прорвать» блокаду Ирана в Оманском заливе",
            "en": "US forces disable ship 'attempting to run' Iran blockade in Gulf of Oman"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/10/11/us-forces-disable-ship-attempting-to-run-iran-blockade-in-gulf-of-oman",
          "publication_date": "2026-10-11",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "tass-hormuz-supertanker-mine",
          "title": {
            "ru": "Нефтяной супертанкер подорвался на мине в Ормузском проливе — КСИР",
            "en": "Oil supertanker hits mine in Strait of Hormuz — IRGC"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2200371",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "jpost-centcom-vessel-strike",
          "title": {
            "ru": "CENTCOM ударил по коммерческому судну, пытавшемуся обойти блокаду Ирана",
            "en": "CENTCOM strikes commercial vessel after ship attempts to bypass Iran blockade"
          },
          "domain": "jpost.com",
          "url": "https://www.jpost.com/middle-east/iran-news/article-911241",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-easa-saudi-airspace-warning",
          "title": {
            "ru": "После атак хуситов авиационное агентство Европы расширяет предупреждение по воздушному пространству Саудовской Аравии",
            "en": "Following Houthi attacks, Europe's aviation safety body expands Saudi airspace warning"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/europe/following-houthi-attacks-europes-aviation-safety-body-expands-saudi-airspace-warning/4084161",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.regions["north-america"] = {
  "index": 52,
  "delta": 10,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "США ввели санкции против Международного уголовного суда; ЕС, группа стран и генсек ООН осудили решение и призвали его отменить.",
        "en": "The US imposed sanctions on the International Criminal Court; the EU, a group of states and the UN secretary-general condemned the move and urged its reversal."
      },
      "why": {
        "ru": "Санкции против международного суда подрывают институты правосудия и усиливают конфронтацию Вашингтона с союзниками.",
        "en": "Sanctions on an international court undermine judicial institutions and deepen Washington's confrontation with allies."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "state-icc-sanctions",
          "title": {
            "ru": "О введении санкций против Международного уголовного суда",
            "en": "Imposing Sanctions on the International Criminal Court"
          },
          "domain": "state.gov",
          "url": "https://www.state.gov/releases/office-of-the-spokesman/2026/10/imposing-sanctions-on-the-international-criminal-court/",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": true
        },
        {
          "id": "nyt-icc-sanctions",
          "title": {
            "ru": "Администрация Трампа вводит жёсткие санкции против Международного уголовного суда",
            "en": "Trump administration hits International Criminal Court with severe sanctions"
          },
          "domain": "nytimes.com",
          "url": "https://www.nytimes.com/2026/10/09/us/politics/trump-international-criminal-court-sanctions.html",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-eu-urges-icc-reversal",
          "title": {
            "ru": "ЕС призывает США отменить последние санкции против МКС",
            "en": "EU urges US to reverse latest sanctions targeting ICC"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/eu-urges-us-to-reverse-latest-sanctions-targeting-icc-/4084422",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Трамп объявил о сделке по закупке российского дизеля и приостановке топливных санкций, а также заявил, что Украине нужен «новый лидер». Отдельно Госдеп одобрил поставки вооружений Египту, Кувейту и ОАЭ на 2,27 млрд долларов.",
        "en": "Trump announced a deal to buy Russian diesel and a suspension of fuel sanctions, and said Ukraine needs a 'new leader'. Separately, the State Department approved $2.27bn in arms sales to Egypt, Kuwait and the UAE."
      },
      "why": {
        "ru": "Энергетическая сделка с Москвой и политическое давление на Киев меняют американскую вовлечённость в войну и мировую конфигурацию риска.",
        "en": "The energy deal with Moscow and political pressure on Kyiv change US involvement in the war and the global risk configuration."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "guardian-trump-putin-russian-diesel",
          "title": {
            "ru": "Зеленский в ярости: Трамп объявил о сделке по закупке российского дизеля",
            "en": "Zelenskyy furious as Trump announces deal to buy Russian diesel"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/us-news/2026/oct/09/trump-putin-russian-diesel-ukraine",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-us-arms-sales-egypt-kuwait-uae",
          "title": {
            "ru": "Госдеп США одобрил продажи вооружений Египту, Кувейту и ОАЭ на 2,27 млрд долларов",
            "en": "US State Department approves arms sales worth $2.27B to Egypt, Kuwait, UAE"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/americas/us-state-department-approves-arms-sales-worth-227b-to-egypt-kuwait-uae/4078826",
          "publication_date": "2026-10-05",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.regions["south-asia"] = {
  "index": 54,
  "delta": 10,
  "status": "danger",
  "background": true,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Пакистан и Бахрейн на встрече глав МИД в Исламабаде призвали к деэскалации на Ближнем Востоке после ударов по аэропортам Саудовской Аравии.",
        "en": "Pakistan and Bahrain, at a foreign-ministers meeting in Islamabad, called for de-escalation in the Middle East after the strikes on Saudi airports."
      },
      "why": {
        "ru": "Региональная дипломатия активизировалась в ответ на риск вовлечения Южной Азии в ближневосточный конфликт.",
        "en": "Regional diplomacy accelerated in response to the risk of South Asia being drawn into the Middle East conflict."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "aa-pakistan-bahrain-deescalation",
          "title": {
            "ru": "Пакистан и Бахрейн призывают к деэскалации на Ближнем Востоке на встрече в Исламабаде",
            "en": "Pakistan, Bahrain call for de-escalation in Middle East as top diplomats meet in Islamabad"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/pakistani-bahrain-call-for-de-escalation-in-middle-east-as-top-diplomats-meet-in-islamabad/4082040",
          "publication_date": "2026-10-08",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Индия публично осудила атаки хуситов на аэропорты Саудовской Аравии, реагируя на эскалацию у ключевых энергомаршрутов, от которых зависит индийская экономика.",
        "en": "India publicly condemned the Houthi attacks on Saudi airports, reacting to the escalation around the key energy routes its economy depends on."
      },
      "why": {
        "ru": "Удары у Ормуза и Баб-эль-Мандеба напрямую затрагивают энергетическую безопасность Южной Азии и вовлекают регион в кризис.",
        "en": "Strikes around Hormuz and Bab al-Mandab directly affect South Asia's energy security and draw the region into the crisis."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "aa-india-condemns-houthi-airport",
          "title": {
            "ru": "Индия осуждает атаки хуситов на аэропорты Саудовской Аравии",
            "en": "India condemns Houthi attacks on Saudi airports"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/asia-pacific/india-condemns-houthi-attacks-on-saudi-airports/4082012",
          "publication_date": "2026-10-08",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.regions["africa"] = {
  "index": 53,
  "delta": 9,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "08.10 Эфиопия нанесла дроновый удар по эритрейским войскам, вошедшим в Тыграй — Африканский Рог вернулся к открытому конфликту после дипломатического разрыва Эритреи с Эфиопией 01.10.",
        "en": "On 08.10 Ethiopia launched a drone attack against Eritrean troops who crossed into Tigray — the Horn of Africa returned to open conflict after Eritrea severed ties with Ethiopia on 01.10."
      },
      "why": {
        "ru": "Возобновление боевых действий в Тыграе с прямым вовлечением соседнего государства расширяет региональный конфликт.",
        "en": "The resumption of fighting in Tigray with direct involvement of a neighbouring state widens the regional conflict."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "guardian-ethiopia-drone-eritrea-tigray",
          "title": {
            "ru": "Эфиопия нанесла дроновый удар по эритрейским войскам, вошедшим в Тыграй",
            "en": "Ethiopia launches drone attack against Eritrean troops who crossed into Tigray"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/oct/08/ethiopia-drone-attack-against-eritrean-troops-in-tigray",
          "publication_date": "2026-10-08",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Возвращение Эфиопии к конфликту описывается как гражданская катастрофа, грозящая перерасти в региональный поликризис с вовлечением соседей по Африканскому Рогу.",
        "en": "Ethiopia's return to conflict is described as a civilian catastrophe threatening to spill over into a regional polycrisis involving Horn of Africa neighbours."
      },
      "why": {
        "ru": "Риск разрастания конфликта на соседние страны повышает вероятность более широкой региональной войны.",
        "en": "The risk of the conflict spreading to neighbouring countries raises the probability of a wider regional war."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "guardian-view-ethiopia-conflict",
          "title": {
            "ru": "Взгляд Guardian: возвращение Эфиопии к конфликту — гражданская катастрофа и региональный поликризис",
            "en": "The Guardian view on Ethiopia's return to conflict: civilian catastrophe and a spiralling regional polycrisis"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/commentisfree/2026/oct/08/the-guardian-view-on-ethiopias-return-to-conflict-civilian-catastrophe-and-a-spiralling-regional-polycrisis",
          "publication_date": "2026-10-08",
          "accessed_date": "2026-10-11",
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
  }
];
  // Редакционный сид недели 2026-10-11: три главных драйвера недели.
  // Источники — verbatim-записи из calc/input/2026-10-11.json (R55).
s.drivers = [
  {
    "label": {
      "ru": "Хуситы расширили войну до Эр-Рияда, США блокируют Ормуз",
      "en": "Houthis widened the war to Riyadh as the US blockades Hormuz"
    },
    "observation": {
      "ru": "Хуситы нанесли серию ракетно-дроновых ударов по аэропорту Эр-Рияда (12 погибших, более 300 раненых) и Дамаму; саудовская коалиция заявила об уничтожении 136 целей в Йемене, а силы правительства Йемена отбили Баб-эль-Мандебский пролив. США обездвижили коммерческое судно, пытавшееся прорвать блокаду Ирана в Оманском заливе, а в Ормузском проливе на мине подорвался супертанкер.",
      "en": "Houthis carried out a series of missile and drone strikes on Riyadh airport (12 killed, more than 300 injured) and Dammam; the Saudi-led coalition said it destroyed 136 targets in Yemen, and Yemeni government forces recaptured the Bab al-Mandab strait. US forces disabled a commercial vessel trying to run the Iran blockade in the Gulf of Oman, while a supertanker hit a mine in the Strait of Hormuz."
    },
    "why": {
      "ru": "Боевые действия вплотную подошли к ключевому энергетическому узлу мира и впервые ударили по столичному аэропорту Саудовской Аравии — это поднимает и военную интенсивность, и географию вовлечения одновременно.",
      "en": "Fighting moved right up to the world's key energy chokepoint and struck Saudi Arabia's capital airport for the first time — raising both combat intensity and the geography of involvement at once."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "mee-riyadh-airport-12-dead",
        "title": { "ru": "Атака на аэропорт Эр-Рияда: 12 погибших, более 300 раненых", "en": "Attack on Riyadh airport leaves 12 dead, more than 300 injured" },
        "domain": "middleeasteye.net",
        "url": "https://www.middleeasteye.net/news/attack-riyadh-airport-leaves-12-dead-more-300-injured",
        "publication_date": "2026-10-11",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "aljazeera-us-disable-ship-gulf-oman",
        "title": { "ru": "США обездвижили судно, «пытавшееся прорвать» блокаду Ирана в Оманском заливе", "en": "US forces disable ship 'attempting to run' Iran blockade in Gulf of Oman" },
        "domain": "aljazeera.com",
        "url": "https://www.aljazeera.com/news/2026/10/11/us-forces-disable-ship-attempting-to-run-iran-blockade-in-gulf-of-oman",
        "publication_date": "2026-10-11",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "jpost-centcom-vessel-strike",
        "title": { "ru": "CENTCOM ударил по коммерческому судну, пытавшемуся обойти блокаду Ирана", "en": "CENTCOM strikes commercial vessel after ship attempts to bypass Iran blockade" },
        "domain": "jpost.com",
        "url": "https://www.jpost.com/middle-east/iran-news/article-911241",
        "publication_date": "2026-10-10",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "tass-hormuz-supertanker-mine",
        "title": { "ru": "Нефтяной супертанкер подорвался на мине в Ормузском проливе — КСИР", "en": "Oil supertanker hits mine in Strait of Hormuz — IRGC" },
        "domain": "tass.com",
        "url": "https://tass.com/world/2200371",
        "publication_date": "2026-10-10",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      }
    ]
  },
  {
    "label": {
      "ru": "Ядерная сигнальная активность: пуск M51.3 и учения НАТО",
      "en": "Nuclear signalling: M51.3 test and NATO drills"
    },
    "observation": {
      "ru": "Франция 06.10 провела приёмочный пуск баллистической ракеты M51.3 с ПЛАРБ Le Vigilant в присутствии президента. НАТО анонсировала учения ядерного сдерживания Steadfast Noon 13–23.10 (17 стран), Финляндия направит штабных офицеров. На этом фоне Путин вновь повторил ядерную угрозу в адрес НАТО.",
      "en": "On 06.10 France carried out an acceptance test of an M51.3 ballistic missile from the SSBN Le Vigilant in the president's presence. NATO announced its Steadfast Noon nuclear deterrence exercise for 13–23.10 (17 nations), with Finland sending staff officers. Against this backdrop Putin again repeated a nuclear threat against NATO."
    },
    "why": {
      "ru": "Плановые, но публично подчёркнутые технические ядерные сигналы на обеих сторонах в сочетании с ядерной риторикой высшего уровня поддерживают повышенный фон неверного прочтения намерений.",
      "en": "Routine yet publicly emphasised technical nuclear signals on both sides, combined with top-level nuclear rhetoric, sustain a heightened risk of misreading intentions."
    },
    "contribution": "medium",
    "confidence": "medium",
    "sources": [
      {
        "id": "defensegouv-m513-acceptance-test",
        "title": { "ru": "Ракета M51.3: успешный приёмочный пуск с ПЛАРБ Le Vigilant", "en": "M51.3 missile: successful acceptance test from SSBN Le Vigilant" },
        "domain": "defense.gouv.fr",
        "url": "https://www.defense.gouv.fr/actualites/missile-m513-tir-dacceptation-reussi-snle-vigilant",
        "publication_date": "2026-10-06",
        "accessed_date": "2026-10-11",
        "source_type": "primary",
        "cluster_id": "C-registries",
        "state_affiliated": true
      },
      {
        "id": "rt-nato-nuclear-drills",
        "title": { "ru": "НАТО просит Россию «не волноваться» из-за ядерных учений", "en": "NATO asks Russia 'not to worry' about nuclear drills" },
        "domain": "rt.com",
        "url": "https://www.rt.com/news/646984-nato-nuclear-exercise-polyansky/",
        "publication_date": "2026-10-09",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "aca-putin-nuclear-threat-voa",
        "title": { "ru": "Путин вновь повторяет ядерную угрозу в адрес НАТО", "en": "Russia's Putin reiterates nuclear threat against NATO" },
        "domain": "armscontrol.org",
        "url": "https://www.armscontrol.org/media-citations/voice-america/2026-10-07",
        "publication_date": "2026-10-07",
        "accessed_date": "2026-10-11",
        "source_type": "OSINT",
        "cluster_id": "C-registries",
        "state_affiliated": false
      },
      {
        "id": "sputnik-finland-steadfast-noon",
        "title": { "ru": "Финляндия примет участие в ядерных учениях НАТО в октябре — Минобороны", "en": "Finland to take part in NATO's nuclear deterrence exercise in October — Defense Ministry" },
        "domain": "sputnikglobe.com",
        "url": "https://sputnikglobe.com/20261009/finland-to-take-part-in-natos-nuclear-deterrence-exercise-in-october---defense-ministry-1124855777.html",
        "publication_date": "2026-10-09",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      }
    ]
  },
  {
    "label": {
      "ru": "Дизельная сделка США–РФ расколола Украину и Европу",
      "en": "The US–Russia diesel deal split Ukraine and Europe"
    },
    "observation": {
      "ru": "Трамп объявил о сделке по закупке российского дизеля и приостановке санкций на топливо, заявив при этом, что Украине нужен «новый лидер». Зеленский публично возмутился, а Германия и ЕС подтвердили, что санкции против России сохраняются. США одновременно ввели санкции против Международного уголовного суда.",
      "en": "Trump announced a deal to buy Russian diesel and a suspension of fuel sanctions, while saying Ukraine needs a 'new leader'. Zelenskyy reacted furiously, and Germany and the EU reaffirmed that sanctions on Russia remain. At the same time the US imposed sanctions on the International Criminal Court."
    },
    "why": {
      "ru": "Энергетическая сделка с Москвой и раскол внутри западной коалиции ослабляют единство санкционного фронта и меняют расстановку сил вокруг войны в Украине.",
      "en": "The energy deal with Moscow and the split within the Western coalition weaken the unity of the sanctions front and reshape the balance of forces around the war in Ukraine."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "guardian-trump-putin-russian-diesel",
        "title": { "ru": "Зеленский в ярости: Трамп объявил о сделке по закупке российского дизеля", "en": "Zelenskyy furious as Trump announces deal to buy Russian diesel" },
        "domain": "theguardian.com",
        "url": "https://www.theguardian.com/us-news/2026/oct/09/trump-putin-russian-diesel-ukraine",
        "publication_date": "2026-10-09",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "guardian-trump-diesel-new-leader",
        "title": { "ru": "Трамп заявил, что Украине нужен новый лидер после дизельной сделки с Россией", "en": "Trump says Ukraine needs a new leader after diesel deal with Russia" },
        "domain": "theguardian.com",
        "url": "https://www.theguardian.com/world/2026/oct/10/ukraine-russia-strikes-war-trump-diesel-deal-zelenskyy",
        "publication_date": "2026-10-10",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "state-icc-sanctions",
        "title": { "ru": "О введении санкций против Международного уголовного суда", "en": "Imposing Sanctions on the International Criminal Court" },
        "domain": "state.gov",
        "url": "https://www.state.gov/releases/office-of-the-spokesman/2026/10/imposing-sanctions-on-the-international-criminal-court/",
        "publication_date": "2026-10-09",
        "accessed_date": "2026-10-11",
        "source_type": "primary",
        "cluster_id": "C-registries",
        "state_affiliated": true
      },
      {
        "id": "nyt-europe-shadow-war",
        "title": { "ru": "Пока Путин ведёт теневую войну, Европа ищет способ дать сдачи", "en": "As Putin wages shadow war, Europe looks for a way to hit back" },
        "domain": "nytimes.com",
        "url": "https://www.nytimes.com/2026/10/09/world/europe/putin-russia-ukraine-war-europe-nato.html",
        "publication_date": "2026-10-09",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  }
];
  s.sources = [
  {
    "id": "tass-slavyansk-kramatorsk-forces",
    "title": {
      "ru": "Эксперт назвал район наибольшего сосредоточения сил ВСУ под Славянском и Краматорском",
      "en": "Expert names area with highest concentration of Ukrainian forces at Slavyansk, Kramatorsk"
    },
    "domain": "tass.com",
    "url": "https://tass.com/defense/2200415",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-battlegroup-north-lukashovo-lobanovka",
    "title": {
      "ru": "Группировка «Север» взяла под контроль Лукашово и Лобановку в Харьковской области",
      "en": "Russia's Battlegroup North takes control of Lukashovo, Lobanovka in Kharkov Region"
    },
    "domain": "tass.com",
    "url": "https://tass.com/defense/2200267",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "scmp-us-warship-china-destroyer",
    "title": {
      "ru": "Потерял ли эсминец США ход при преследовании китайского эсминца в Южно-Китайском море?",
      "en": "Did a US warship lose power while chasing a Chinese destroyer in the South China Sea?"
    },
    "domain": "scmp.com",
    "url": "https://www.scmp.com/news/china/military/article/3370182/did-us-warship-lose-power-while-chasing-chinese-destroyer-south-china-sea",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "japantimes-china-militia-boat-taiwan",
    "title": {
      "ru": "Китайский ополченческий катер впервые замечен у восточного побережья Тайваня",
      "en": "China militia boat spotted for first time off Taiwan's east coast, patrol finds"
    },
    "domain": "japantimes.co.jp",
    "url": "https://www.japantimes.co.jp/news/2026/10/10/asia-pacific/china-militia-boat-first-taiwan-east-coast/",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "scmp-chinese-aircraft-laos-facility",
    "title": {
      "ru": "Используют ли китайские военные самолёты новый совместный аэродром в Лаосе?",
      "en": "Are Chinese military aircraft already using a new joint air facility in Laos?"
    },
    "domain": "scmp.com",
    "url": "https://www.scmp.com/news/china/military/article/3370439/are-chinese-military-aircraft-already-using-new-joint-air-facility-laos",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "scmp-keen-sword-27-exercises",
    "title": {
      "ru": "Как расширенные учения Японии и США могут осложнить планирование НОАК по Тайваню",
      "en": "How expanded Japan-US military exercises could complicate PLA planning over Taiwan"
    },
    "domain": "scmp.com",
    "url": "https://www.scmp.com/news/china/military/article/3370210/how-expanded-japan-us-military-exercises-could-complicate-pla-planning-over-taiwan",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tass-nato-theory-of-victory",
    "title": {
      "ru": "План НАТО «Теория победы» не направлен против России — глава военного комитета",
      "en": "NATO 'Theory of Victory' plan not directed against Russia — chairman of military committee"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2200281",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "guardian-yemen-bab-al-mandab",
    "title": {
      "ru": "Силы правительства Йемена отбили Баб-эль-Мандебский пролив у хуситов",
      "en": "Yemen government-allied forces recapture Bab al-Mandab strait from Houthis"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/10/yemen-government-allied-forces-recapture-bab-al-mandab-strait-houthis-taiz",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "france24-zaporizhzhia-strikes-diesel",
    "title": {
      "ru": "Трамп и Зеленский поспорили из-за дизельной сделки, удары РФ по Украине убили 21 человека",
      "en": "Trump, Zelensky clash over diesel deal as Russian strikes on Ukraine kill 21, including children"
    },
    "domain": "france24.com",
    "url": "https://www.france24.com/en/europe/20261010-trump-zelensky-clash-over-diesel-deal-as-russian-strikes-on-ukraine-kill-21-including-children",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-kyiv-drone-playground",
    "title": {
      "ru": "В Киеве человек едва спасся при ударе дрона по детской площадке",
      "en": "Man narrowly escapes drone strike on playground in Kyiv"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/global/video/2026/oct/10/man-narrowly-escapes-drone-strike-on-playground-in-kyiv-video",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-saudi-coalition-136-targets",
    "title": {
      "ru": "Саудовская коалиция объявила о масштабной операции против хуситов и уничтожении 136 целей",
      "en": "Saudi-led coalition announces large-scale operation against Houthis in Yemen, says 136 military targets destroyed"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/saudi-led-coalition-announces-large-scale-operation-against-houthis-in-yemen-says-136-military-targets-destroyed/4084119",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-sochi-airport-drone-debris",
    "title": {
      "ru": "Обломки дронов упали на территорию аэропорта Сочи, жилые районы и отели",
      "en": "Drone debris falls on Sochi airport grounds, residential areas and hotels"
    },
    "domain": "tass.com",
    "url": "https://tass.com/emergencies/2200449",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-yandex-data-center-vladimir",
    "title": {
      "ru": "Дата-центр Яндекса во Владимире остановлен после атаки дрона",
      "en": "Yandex's data center in Vladimir suspended after drone attack"
    },
    "domain": "tass.com",
    "url": "https://tass.com/emergencies/2200435",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-dpr-23-attacks",
    "title": {
      "ru": "Украина атаковала ДНР 23 раза за последние сутки",
      "en": "Ukraine attacks DPR 23 times in last 24 hours"
    },
    "domain": "tass.com",
    "url": "https://tass.com/defense/2200397",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-air-defenses-725-drones",
    "title": {
      "ru": "Российская ПВО сбила 725 дронов, потери украинских войск — около 1455 человек",
      "en": "Russian air defenses down 725 drones, Ukrainian losses total about 1,455 troops"
    },
    "domain": "tass.com",
    "url": "https://tass.com/defense/2200261",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-oskol-river-bridge-destroyed",
    "title": {
      "ru": "Россия уничтожила мост через реку Оскол — эксперт",
      "en": "Russia destroys bridge across the Oskol River — expert"
    },
    "domain": "tass.com",
    "url": "https://tass.com/defense/2200399",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aljazeera-yemen-forces-advance",
    "title": {
      "ru": "Военные правительства Йемена заявляют о продвижении против хуситов",
      "en": "Yemeni government's military says its forces advancing against Houthis"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/10/yemeni-governments-military-says-its-forces-advancing-against-houthis",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "mee-riyadh-airport-12-dead",
    "title": {
      "ru": "Атака на аэропорт Эр-Рияда: 12 погибших, более 300 раненых",
      "en": "Attack on Riyadh airport leaves 12 dead, more than 300 injured"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/news/attack-riyadh-airport-leaves-12-dead-more-300-injured",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "jpost-centcom-vessel-strike",
    "title": {
      "ru": "CENTCOM ударил по коммерческому судну, пытавшемуся обойти блокаду Ирана",
      "en": "CENTCOM strikes commercial vessel after ship attempts to bypass Iran blockade"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/iran-news/article-911241",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tass-iaea-zaporozhye-silence",
    "title": {
      "ru": "Переговоры МАГАТЭ о режиме тишины на Запорожской АЭС значимы",
      "en": "IAEA talks on silence regime at Zaporozhye plant significant"
    },
    "domain": "tass.com",
    "url": "https://tass.com/economy/2200411",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aljazeera-us-disable-ship-gulf-oman",
    "title": {
      "ru": "США обездвижили судно, «пытавшееся прорвать» блокаду Ирана в Оманском заливе",
      "en": "US forces disable ship 'attempting to run' Iran blockade in Gulf of Oman"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/11/us-forces-disable-ship-attempting-to-run-iran-blockade-in-gulf-of-oman",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aca-putin-nuclear-threat-voa",
    "title": {
      "ru": "Путин вновь повторяет ядерную угрозу в адрес НАТО",
      "en": "Russia's Putin reiterates nuclear threat against NATO"
    },
    "domain": "armscontrol.org",
    "url": "https://www.armscontrol.org/media-citations/voice-america/2026-10-07",
    "publication_date": "2026-10-07",
    "accessed_date": "2026-10-11",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "rt-macron-nuclear-week",
    "title": {
      "ru": "«Ядерная дуэль» Макрона: главные истории недели по версии RT",
      "en": "Macron's nuclear throwdown: RT stories that shaped the week"
    },
    "domain": "rt.com",
    "url": "https://www.rt.com/news/646985-rt-top-stories-macron-germany-houthis/",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "nti-nuclear-security-index-2026",
    "title": {
      "ru": "Россия и США отступают от ядерной безопасности — индекс NTI 2026",
      "en": "Russia and United States retreat from nuclear security as 12 countries step up — 2026 NTI Nuclear Security Index finds"
    },
    "domain": "nti.org",
    "url": "https://www.nti.org/news/russia-and-united-states-retreat-from-nuclear-security-as-12-countries-step-up-2026-nti-nuclear-security-index-finds/",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "reuters-north-korea-nuclear-expansion",
    "title": {
      "ru": "Замминистра обороны КНДР: наращивание вооружений США оправдывает расширение ядерной программы",
      "en": "North Korea vice defence minister says US arms buildup justifies expanding nuclear programme"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/business/aerospace-defense/north-korea-vice-defence-minister-says-us-arms-buildup-justifies-expanding-2026-09-17/",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "iz-kndr-nuclear-warning",
    "title": {
      "ru": "КНДР предупредила США и Южную Корею о возможном применении ядерного оружия",
      "en": "North Korea warned US and South Korea of possible nuclear weapons use"
    },
    "domain": "iz.ru",
    "url": "https://iz.ru/2167943/2026-09-16/kndr-predupredila-ssha-i-iuzhnuiu-koreiu-o-vozmozhnom-primenenii-iadernogo-oruzhiia",
    "publication_date": "2026-09-16",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "defensegouv-m513-acceptance-test",
    "title": {
      "ru": "Ракета M51.3: успешный приёмочный пуск с ПЛАРБ Le Vigilant",
      "en": "M51.3 missile: successful acceptance test from SSBN Le Vigilant"
    },
    "domain": "defense.gouv.fr",
    "url": "https://www.defense.gouv.fr/actualites/missile-m513-tir-dacceptation-reussi-snle-vigilant",
    "publication_date": "2026-10-06",
    "accessed_date": "2026-10-11",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": true
  },
  {
    "id": "rt-nato-nuclear-drills",
    "title": {
      "ru": "НАТО просит Россию «не волноваться» из-за ядерных учений",
      "en": "NATO asks Russia 'not to worry' about nuclear drills"
    },
    "domain": "rt.com",
    "url": "https://www.rt.com/news/646984-nato-nuclear-exercise-polyansky/",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "sputnik-finland-steadfast-noon",
    "title": {
      "ru": "Финляндия примет участие в ядерных учениях НАТО в октябре — Минобороны",
      "en": "Finland to take part in NATO's nuclear deterrence exercise in October — Defense Ministry"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261009/finland-to-take-part-in-natos-nuclear-deterrence-exercise-in-october---defense-ministry-1124855777.html",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aca-pentagon-nuclear-options-ibt",
    "title": {
      "ru": "Пентагон даёт Трампу больше ядерных опций на фоне пересмотра потенциальной войны с Россией или Китаем",
      "en": "Pentagon moves to give Trump more nuclear options as US rethinks potential war with Russia or China"
    },
    "domain": "armscontrol.org",
    "url": "https://www.armscontrol.org/media-citations/international-business-times/2026-10-07",
    "publication_date": "2026-10-07",
    "accessed_date": "2026-10-11",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "rt-south-korea-recall-ambassador",
    "title": {
      "ru": "Южная Корея отзывает посла из Украины",
      "en": "South Korea recalls ambassador from Ukraine"
    },
    "domain": "rt.com",
    "url": "https://www.rt.com/russia/646925-kiev-south-korea-recall-ambassador/",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "guardian-south-korea-fuel-shipments",
    "title": {
      "ru": "Южная Корея грозит юридическими мерами из-за поставок топлива в Россию",
      "en": "South Korea threatens legal action if fuel shipments to Russia found to have broken law"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/08/south-korea-fuel-shipments-to-russia-domestic-law",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tass-trump-demanded-zelensky-refineries",
    "title": {
      "ru": "Трамп: США требовали от Зеленского прекратить удары по российским НПЗ",
      "en": "Trump says US demanded Zelensky halt strikes on Russian oil refineries"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2200333",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "guardian-trump-diesel-new-leader",
    "title": {
      "ru": "Трамп заявил, что Украине нужен новый лидер после дизельной сделки с Россией",
      "en": "Trump says Ukraine needs a new leader after diesel deal with Russia"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/10/ukraine-russia-strikes-war-trump-diesel-deal-zelenskyy",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "state-icc-sanctions",
    "title": {
      "ru": "О введении санкций против Международного уголовного суда",
      "en": "Imposing Sanctions on the International Criminal Court"
    },
    "domain": "state.gov",
    "url": "https://www.state.gov/releases/office-of-the-spokesman/2026/10/imposing-sanctions-on-the-international-criminal-court/",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": true
  },
  {
    "id": "aa-eu-urges-icc-reversal",
    "title": {
      "ru": "ЕС призывает США отменить последние санкции против МКС",
      "en": "EU urges US to reverse latest sanctions targeting ICC"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/eu-urges-us-to-reverse-latest-sanctions-targeting-icc-/4084422",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "govuk-icc-joint-statement",
    "title": {
      "ru": "Совместное заявление в поддержку Международного уголовного суда",
      "en": "Joint statement on support for the International Criminal Court"
    },
    "domain": "gov.uk",
    "url": "https://www.gov.uk/government/news/joint-statement-on-support-for-the-international-criminal-court",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": true
  },
  {
    "id": "un-sg-icc-sanctions",
    "title": {
      "ru": "Генсек ООН осуждает введение США санкций против Международного уголовного суда",
      "en": "Secretary-General condemns United States imposition of sanctions against the International Criminal Court"
    },
    "domain": "press.un.org",
    "url": "https://press.un.org/en/2026/sgsm23325.doc.htm",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "nyt-icc-sanctions",
    "title": {
      "ru": "Администрация Трампа вводит жёсткие санкции против Международного уголовного суда",
      "en": "Trump administration hits International Criminal Court with severe sanctions"
    },
    "domain": "nytimes.com",
    "url": "https://www.nytimes.com/2026/10/09/us/politics/trump-international-criminal-court-sanctions.html",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-zelensky-negotiation-team-us",
    "title": {
      "ru": "Зеленский: переговорная команда Украины отправится в США в ближайшие 2 дня",
      "en": "Zelenskyy says Ukraine's negotiation team will visit US in next 2 days for talks"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/europe/zelenskyy-says-ukraine-s-negotiation-team-will-visit-us-in-next-2-days-for-talks/4082504",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "sputnik-witkoff-miami-talks",
    "title": {
      "ru": "Уиткофф называет переговоры США–Украина продуктивными перед следующим раундом с Россией",
      "en": "Witkoff calls US-Ukraine talks productive ahead of next Russia engagement"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261010/witkoff-calls-us-ukraine-talks-productive-ahead-of-next-russia-engagement-1124858930.html",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-witkoff-kushner-moscow",
    "title": {
      "ru": "Уиткофф и Кушнер могут посетить Москву в ближайшие две недели — источник",
      "en": "US negotiators Witkoff, Kushner may visit Moscow in next two weeks — source"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2200299",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "guardian-uk-tariffs-chinese-cars",
    "title": {
      "ru": "Британия рассматривает пошлины на китайские авто в согласии с ЕС",
      "en": "UK reviewing whether to impose tariffs on Chinese car imports to align with EU"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/business/2026/oct/05/uk-tariffs-chinese-car-imports-eu-manufacturing",
    "publication_date": "2026-10-05",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-eu-china-trade-crossroads",
    "title": {
      "ru": "ЕС и Китай на торговом перепутье: планы строгого доступа к рынку грозят новой торговой войной",
      "en": "EU, China at trade crossroads amid strict market access plans threatening new trade war"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/europe/eu-china-at-trade-crossroads-amid-strict-market-access-plans-threatening-new-trade-war/4082551",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-us-arms-sales-egypt-kuwait-uae",
    "title": {
      "ru": "Госдеп США одобрил продажи вооружений Египту, Кувейту и ОАЭ на 2,27 млрд долларов",
      "en": "US State Department approves arms sales worth $2.27B to Egypt, Kuwait, UAE"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/americas/us-state-department-approves-arms-sales-worth-227b-to-egypt-kuwait-uae/4078826",
    "publication_date": "2026-10-05",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "sputnik-eu-budget-ukraine-reserve",
    "title": {
      "ru": "ЕС хочет сократить новый бюджет почти на 180 млрд, но сохранить 111 млрд для Украины",
      "en": "EU wants to reduce new budget by almost $180Bln but keep $111Bln for Ukraine"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261010/eu-wants-to-reduce-new-budget-by-almost-180bln-but-keep-111bln-for-ukraine-1124862422.html",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "nyt-europe-shadow-war",
    "title": {
      "ru": "Пока Путин ведёт теневую войну, Европа ищет способ дать сдачи",
      "en": "As Putin wages shadow war, Europe looks for a way to hit back"
    },
    "domain": "nytimes.com",
    "url": "https://www.nytimes.com/2026/10/09/world/europe/putin-russia-ukraine-war-europe-nato.html",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-eu-minerals-china",
    "title": {
      "ru": "ЕС «выкладывается по полной» с проектами по минералам, пытаясь предотвратить торговую войну с Китаем",
      "en": "EU 'pulling out all stops' with minerals projects as it tries to avert China trade war"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/09/eu-pulling-out-all-stops-with-minerals-projects-as-it-tries-to-avert-china-trade-war",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "fp-diesel-crisis-explained",
    "title": {
      "ru": "Глобальный дизельный кризис — разбор",
      "en": "The global diesel crisis, explained"
    },
    "domain": "foreignpolicy.com",
    "url": "https://foreignpolicy.com/2026/10/09/diesel-crisis-oil-fuel-refineries-iran-ukraine-war/",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "france24-yemen-bab-al-mandab",
    "title": {
      "ru": "Йемен заявляет о продвижении против хуситов вокруг ключевого Баб-эль-Мандебского пролива",
      "en": "Yemen says advancing against Houthis around key Bab al-Mandab strait"
    },
    "domain": "france24.com",
    "url": "https://www.france24.com/en/middle-east/20261010-yemen-says-forces-made-advances-against-houthis-around-key-waterway",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "govuk-black-sea-civilian-shipping",
    "title": {
      "ru": "Война России угрожает гражданскому судоходству в Чёрном море: заявление Британии в ОБСЕ",
      "en": "Russia's war threatening civilian shipping in the Black Sea: UK statement to the OSCE"
    },
    "domain": "gov.uk",
    "url": "https://www.gov.uk/government/speeches/russias-war-threatening-civilian-shipping-in-the-black-sea-uk-statement-to-the-osce",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-11",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": true
  },
  {
    "id": "tass-un-condemns-riyadh",
    "title": {
      "ru": "Генсек ООН осуждает атаку на аэропорт в Эр-Рияде",
      "en": "UN secretary-general condemns attack on airport in Riyadh"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2200437",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "rt-us-fuel-waiver",
    "title": {
      "ru": "Вашингтон приостанавливает санкции на торговлю российским топливом",
      "en": "Washington suspends sanctions on Russian fuel trade"
    },
    "domain": "rt.com",
    "url": "https://www.rt.com/news/647016-washington-suspends-sanctions-russian-fuel/",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "guardian-trump-putin-russian-diesel",
    "title": {
      "ru": "Зеленский в ярости: Трамп объявил о сделке по закупке российского дизеля",
      "en": "Zelenskyy furious as Trump announces deal to buy Russian diesel"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/us-news/2026/oct/09/trump-putin-russian-diesel-ukraine",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tass-russia-lifts-diesel-export-ban",
    "title": {
      "ru": "Правительство РФ частично снимает запрет на экспорт дизеля после договорённостей Путина и Трампа",
      "en": "Russian government partially lifts diesel export ban following Putin-Trump agreements"
    },
    "domain": "tass.com",
    "url": "https://tass.com/economy/2200347",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "sputnik-iran-oman-hormuz-routes",
    "title": {
      "ru": "Иран и Оман согласовали маршруты безопасного прохода через Ормузский пролив — сообщения",
      "en": "Iran, Oman agree on safe passage routes through Strait of Hormuz — reports"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261008/iran-oman-agree-on-safe-passage-routes-through-strait-of-hormuz---reports-1124850278.html",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-trump-iran-military-option",
    "title": {
      "ru": "Трамп: Иран «терпит неудачу», военная опция остаётся открытой",
      "en": "Trump says Iran 'failing badly', keeps military option open"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/trump-says-iran-failing-badly-keeps-military-option-open/4084135",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-estonian-rogues-mfa",
    "title": {
      "ru": "Эстонские провокаторы втягивают ЕС в трясину конфронтации — МИД РФ",
      "en": "Estonian rogues drag EU into quagmire of confrontation — Russian Foreign Ministry"
    },
    "domain": "tass.com",
    "url": "https://tass.com/politics/2200383",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "fp-russia-sabotage-europe-estonia",
    "title": {
      "ru": "Российские диверсии в Европе больше не «символические» — глава контрразведки Эстонии",
      "en": "Russian sabotage in Europe is no longer 'symbolic,' Estonian counterintelligence chief says"
    },
    "domain": "foreignpolicy.com",
    "url": "https://foreignpolicy.com/2026/10/09/russia-sabotage-europe-attacks-hybrid-warfare-estonia/",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-us-europe-ukraine-florida-talks",
    "title": {
      "ru": "Представители США, Европы и Украины провели во Флориде переговоры о деэскалации войны с Россией",
      "en": "US, European, Ukrainian officials hold talks in Florida on de-escalating, ending war with Russia"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/americas/us-european-ukrainian-officials-hold-talks-in-florida-on-de-escalating-ending-war-with-russia/4084138",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-nato-no-kaliningrad-blockade",
    "title": {
      "ru": "НАТО заявила, что не планирует блокаду Калининграда",
      "en": "NATO says it has no plans to blockade Kaliningrad"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2200231",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "japantimes-taiwan-defense-spending",
    "title": {
      "ru": "Лидер Тайваня заявил о наращивании оборонных расходов для «сдерживания войны»",
      "en": "Taiwan's leader says increasing defense spending to 'deter war'"
    },
    "domain": "japantimes.co.jp",
    "url": "https://www.japantimes.co.jp/news/2026/10/10/asia-pacific/politics/taiwan-lai-increasing-defense-spending/",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "japantimes-germany-gcap",
    "title": {
      "ru": "Германия рассматривает вступление в проект истребителя GCAP с Великобританией, Италией и Японией",
      "en": "Germany eyes joining GCAP fighter jet project with U.K., Italy and Japan"
    },
    "domain": "japantimes.co.jp",
    "url": "https://www.japantimes.co.jp/news/2026/10/10/japan/gcap-germany-join-japan/",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "jpost-houthi-riyadh-airport-attack",
    "title": {
      "ru": "Атака хуситов на аэропорт Саудовской Аравии: 12 погибших, сотни раненых",
      "en": "Houthi attack on Saudi airport leaves 12 dead, hundreds wounded"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/article-911232",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-world-condemns-riyadh",
    "title": {
      "ru": "Мир осуждает смертоносную атаку хуситов на аэропорт Эр-Рияда",
      "en": "World condemns deadly Houthi attack on Saudi Arabia's Riyadh airport"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/11/world-condemns-deadly-houthi-attack-on-saudi-arabias-riyadh-airport",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-france-ammo-lebanon",
    "title": {
      "ru": "Ливанская армия получила боеприпасы от Франции в рамках военного сотрудничества",
      "en": "Lebanese army receives ammunition from France under military cooperation"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/europe/lebanese-army-receives-ammunition-from-france-under-military-cooperation/4084006",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-hormuz-supertanker-mine",
    "title": {
      "ru": "Нефтяной супертанкер подорвался на мине в Ормузском проливе — КСИР",
      "en": "Oil supertanker hits mine in Strait of Hormuz — IRGC"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2200371",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "mee-ras-al-khaimah-vessel-rescued",
    "title": {
      "ru": "Индийский экипаж судна, попавшего в «инцидент» у Рас-эль-Хаймы, спасён",
      "en": "Indian crew of vessel involved in 'incident' off Ras al-Khaimah rescued"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/indian-crew-vessel-involved-incident-ras-al-khaimah-rescued",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "france24-riyadh-airport-suspends",
    "title": {
      "ru": "Атака на аэропорт Эр-Рияда: не менее 12 погибших, многие ранены",
      "en": "At least twelve killed, multiple people wounded in attack on Riyadh airport"
    },
    "domain": "france24.com",
    "url": "https://www.france24.com/en/middle-east/20261010-riyadh-airport-suspends-operations-after-attack-leaves-multiple-people-wounded",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-gaza-ceasefire-violated",
    "title": {
      "ru": "Израильский удар разрушил здание в Газе через год после «перемирия»",
      "en": "Israeli attack destroys building in Gaza one year into 'ceasefire'"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/video/newsfeed/2026/10/10/israeli-attack-destroys-building-in-gaza-one-year-into",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "france24-gaza-ceasefire-year",
    "title": {
      "ru": "Голод и недоедание среди жителей Газы спустя год после перемирия",
      "en": "Hunger and malnutrition stalk Gazans, a year on from ceasefire"
    },
    "domain": "france24.com",
    "url": "https://www.france24.com/en/video/20261010-hunger-and-malnutrition-stalk-gazans-a-year-on-from-ceasefire",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-easa-saudi-airspace-warning",
    "title": {
      "ru": "После атак хуситов авиационное агентство Европы расширяет предупреждение по воздушному пространству Саудовской Аравии",
      "en": "Following Houthi attacks, Europe's aviation safety body expands Saudi airspace warning"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/europe/following-houthi-attacks-europes-aviation-safety-body-expands-saudi-airspace-warning/4084161",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-riyadh-airport-suspends",
    "title": {
      "ru": "Аэропорт Эр-Рияда приостанавливает работу — источник в управлении воздушным движением",
      "en": "Riyadh airport suspends operations — air traffic control source"
    },
    "domain": "tass.com",
    "url": "https://tass.com/economy/2200307",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-embassies-avoid-riyadh-airport",
    "title": {
      "ru": "Посольства США и Британии призывают граждан избегать аэропорта Эр-Рияда после атак",
      "en": "US, UK embassies urge citizens to avoid Riyadh airport following attacks"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/us-uk-embassies-urge-citizens-to-avoid-riyadh-airport-following-attacks/4084655",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "nyt-ukraine-drones-moscow-airports",
    "title": {
      "ru": "Украинские дроны закрыли аэропорты Москвы, пока Путин возвращался в Россию",
      "en": "Ukrainian drones close Moscow airports as Putin flies back to Russia"
    },
    "domain": "nytimes.com",
    "url": "https://www.nytimes.com/2026/10/09/world/europe/russia-putin-plane-ukraine.html",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-ethiopia-drone-eritrea-tigray",
    "title": {
      "ru": "Эфиопия нанесла дроновый удар по эритрейским войскам, вошедшим в Тыграй",
      "en": "Ethiopia launches drone attack against Eritrean troops who crossed into Tigray"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/08/ethiopia-drone-attack-against-eritrean-troops-in-tigray",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-view-ethiopia-conflict",
    "title": {
      "ru": "Взгляд Guardian: возвращение Эфиопии к конфликту — гражданская катастрофа и региональный поликризис",
      "en": "The Guardian view on Ethiopia's return to conflict: civilian catastrophe and a spiralling regional polycrisis"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/commentisfree/2026/oct/08/the-guardian-view-on-ethiopias-return-to-conflict-civilian-catastrophe-and-a-spiralling-regional-polycrisis",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-pakistan-bahrain-deescalation",
    "title": {
      "ru": "Пакистан и Бахрейн призывают к деэскалации на Ближнем Востоке на встрече в Исламабаде",
      "en": "Pakistan, Bahrain call for de-escalation in Middle East as top diplomats meet in Islamabad"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/pakistani-bahrain-call-for-de-escalation-in-middle-east-as-top-diplomats-meet-in-islamabad/4082040",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-india-condemns-houthi-airport",
    "title": {
      "ru": "Индия осуждает атаки хуситов на аэропорты Саудовской Аравии",
      "en": "India condemns Houthi attacks on Saudi airports"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/asia-pacific/india-condemns-houthi-attacks-on-saudi-airports/4082012",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "cnbc-hormuz-tanker-attacks-wartime-high",
    "title": {
      "ru": "Атаки на танкеры в Ормузском проливе достигли военного максимума",
      "en": "Tanker attacks in Strait of Hormuz surge to wartime high"
    },
    "domain": "cnbc.com",
    "url": "https://www.cnbc.com/2026/10/09/iran-war-strait-hormuz-tanker-attack-oil.html",
    "publication_date": "2026-10-09",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "energyconnects-iran-ship-attacks-hormuz",
    "title": {
      "ru": "Иран наращивает атаки на суда в Ормузе на фоне роста потоков нефти и газа",
      "en": "Iran Ramps Up Ship Attacks in Hormuz as Oil, Gas Flows Rise"
    },
    "domain": "energyconnects.com",
    "url": "https://www.energyconnects.com/news/gas-lng/2026/october/iran-ramps-up-ship-attacks-in-hormuz-as-oil-gas-flows-rise/",
    "publication_date": "2026-10-07",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "cnbc-black-sea-grain-harvest-threat",
    "title": {
      "ru": "Урожай зерна Украины и России под угрозой из-за атак в Чёрном море",
      "en": "Ukraine and Russia's grain harvest under threat amid Black sea attacks"
    },
    "domain": "cnbc.com",
    "url": "https://www.cnbc.com/2026/10/10/ukraine-grain-exports-russia-harvest.html",
    "publication_date": "2026-10-10",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-ethiopia-eritrea-rhetoric-1011",
    "title": {
      "ru": "Эфиопия и Эритрея наращивают риторику: идут ли они к войне?",
      "en": "Ethiopia, Eritrea ramp up rhetoric: Are they inching towards war?"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/11/ethiopia-eritrea-ramp-up-rhetoric-are-they-inching-towards-war",
    "publication_date": "2026-10-11",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aljazeera-ethiopia-leaders-1005",
    "title": {
      "ru": "Четыре африканских лидера выступили с совместной декларацией на фоне эскалации войны в Эфиопии",
      "en": "Four African leaders issue joint declaration as Ethiopia war escalates"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/5/four-african-leaders-issue-joint-declaration-as-ethiopia-war-escalates",
    "publication_date": "2026-10-05",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "africanews-drc-masisi-1008",
    "title": {
      "ru": "ДР Конго: новые бои в Масиси, делегация АС спешит спасти перемирие",
      "en": "DRC: New fighting in Masisi as AU delegation rushes to save ceasefire"
    },
    "domain": "africanews.com",
    "url": "https://www.africanews.com/2026/10/08/drc-new-fighting-in-masisi-as-au-delegation-rushes-to-save-ceasefire/",
    "publication_date": "2026-10-08",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  }
];
})();
