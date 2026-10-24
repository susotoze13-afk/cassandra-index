window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-04"] = window.CI_DATA.snapshots["2026-10-04"] || {};
  s.global = {
  "index": 46,
  "delta": -1
};
  s.published = "2026-10-04";
  s.through = "2026-10-04";
  s.methodology = "3.0";
  s.regions_taxonomy = "1.0";
  s.dataState = "published";
  s.q = 0.9293;
  s.nullWeight = 0.0707;
  s.coverage = {
  "coveredDrivers": 8,
  "totalDrivers": 9
};
  s.confidence = "full";
  s.sensitivity = 5.4;
  s.coverageCriteria = {
  "covered": 27,
  "total": 46,
  "uncovered": [
    "D1.3",
    "D1.6",
    "D3.1",
    "D3.5",
    "D4.5",
    "D5.2",
    "D5.3",
    "D5.4",
    "D6.1",
    "D6.4",
    "D7.3",
    "D8.2",
    "D8.4",
    "D9.1",
    "D9.3",
    "D9.4",
    "D9.5",
    "D9.6b",
    "D9.7"
  ]
};
  s.recalc = {
  "at": "2026-10-24T18:20:21.316Z",
  "reason": "Еженедельный пересчёт",
  "previous": 46,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
  s.regions = {
  "europe": {
    "index": 44,
    "delta": -1,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 46,
    "delta": 2,
    "status": "danger",
    "background": false
  },
  "middle-east": {
    "index": 39,
    "delta": -9,
    "status": "tense",
    "background": false
  },
  "north-america": {
    "index": 43,
    "delta": 15,
    "status": "danger",
    "background": false
  },
  "south-asia": {
    "index": 46,
    "delta": -3,
    "status": "danger",
    "background": false
  },
  "africa": {
    "index": 46,
    "delta": -1,
    "status": "danger",
    "background": false
  }
};
  s.regions["europe"] = {
  "index": 44,
  "delta": -1,
  "status": "danger",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Внутри Европы в окне продолжились гибридные инциденты: Эстония публично возложила на Россию поджог завода дронов, поставляющих Украине; в Финляндии взломы в домах депутатов парламента связывают с иностранной державой.",
        "en": "Hybrid incidents inside Europe continued in the window: Estonia publicly blamed Russia for an arson attack on a drone maker supplying Ukraine, and Finnish break-ins at the homes of MPs were linked to a foreign power."
      },
      "why": {
        "ru": "Прямые атаки на военное производство и политиков в странах НАТО повышают риск прямого столкновения и ответных мер.",
        "en": "Direct attacks on defense production and politicians inside NATO countries raise the risk of direct confrontation and countermeasures."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "guardian-estonia-russia-arson",
          "title": {
            "ru": "Эстония обвиняет Россию в поджоге завода дронов, поставляющих Украине",
            "en": "Estonia blames Russia for arson attack on drone maker supplying Ukraine"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/sep/29/estonia-blames-russia-arson-attack-drone-maker-ukraine",
          "publication_date": "2026-09-29",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "guardian-finland-mp-break-ins",
          "title": {
            "ru": "Премьер Финляндии: взломы в домах депутатов могла совершить иностранная держава",
            "en": "Finnish PM says suspected break-ins at MPs' homes could be work of foreign power"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/oct/01/finland-suspected-break-ins-mp-homes-foreign-power",
          "publication_date": "2026-10-01",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Дрон, вошедший в воздушное пространство Латвии, был перехвачен истребителями НАТО в рамках Baltic Air Policing (02.10) — инцидент на восточном фланге в неделю латвийских выборов.",
        "en": "A drone that entered Latvian airspace was intercepted by NATO fighters under Baltic Air Policing (02.10) — an incident on the eastern flank during Latvia's election week."
      },
      "why": {
        "ru": "Нарушения воздушного пространства вблизи границ альянса поддерживают повышенное дежурство сил и риск случайных столкновений.",
        "en": "Airspace incursions near alliance borders sustain heightened force readiness and the risk of unintended clashes."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "cde-news-nato-intercept-drone-latvia",
          "title": {
            "ru": "Истребители НАТО перехватывают угрозу дрона в воздушном пространстве Латвии",
            "en": "NATO Fighter Jets Intercept Drone Threat Over Latvia"
          },
          "domain": "cde.news",
          "url": "https://cde.news/nato-baltic-air-policing-jets-shoot-down-drone-over-latvia/",
          "publication_date": "2026-10-02",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["east-asia"] = {
  "index": 46,
  "delta": 2,
  "status": "danger",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "США впервые развернули противокорабельную систему NMESIS на японском острове, ближайшем к Тайваню; одновременно китайский контингент прибыл на российские учения «Центры-2026» — военные связи и развёртывания в регионе укрепляются.",
        "en": "The US deployed the NMESIS anti-ship system for the first time on a Japanese island closest to Taiwan, while Chinese troops arrived for Russia's Tsentr-2026 exercises — military ties and deployments in the region are hardening."
      },
      "why": {
        "ru": "Одновременное развёртывание ударных систем у Тайваня и сближение Китая с Россией повышают фоновую напряжённость в западной части Тихого океана.",
        "en": "The simultaneous deployment of strike systems near Taiwan and China's rapprochement with Russia raise background tension in the western Pacific."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "scmp-nmesis-japan-island",
          "title": {
            "ru": "США впервые развёртывают противокорабельную систему NMESIS на японском острове, ближайшем к Тайваню",
            "en": "US to deploy NMESIS anti-ship system on Japanese island closest to Taiwan for first time"
          },
          "domain": "scmp.com",
          "url": "https://www.scmp.com/news/china/diplomacy/article/3369666/us-deploy-nmesis-anti-ship-system-japanese-island-closest-taiwan-first-time",
          "publication_date": "2026-10-03",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "scmp-china-troops-tsentr-2026",
          "title": {
            "ru": "Китайские военные выстроились на учения «Центры-2026» России по мере укрепления военных связей",
            "en": "Chinese troops line up for Russia's Tsentr-2026 exercise as military ties tighten"
          },
          "domain": "scmp.com",
          "url": "https://www.scmp.com/news/china/military/article/3369657/chinese-troops-line-russias-tsentr-2026-exercise-military-ties-tighten",
          "publication_date": "2026-10-03",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "КНДР провела испытание ракеты средней дальности на фоне напряжённости из-за взрыва в шахте у границы — ракетный трек Корейского полуострова остаётся активным.",
        "en": "North Korea test-fired an intermediate-range missile amid tensions over a mine blast near the border — the Korean peninsula missile track remains active."
      },
      "why": {
        "ru": "Ракетные испытания КНДР поддерживают риск эскалации на Корейском полуострове и требуют постоянного внимания сил сдерживания.",
        "en": "North Korean missile tests sustain escalation risk on the Korean peninsula and demand constant attention of deterrence forces."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "scmp-north-korea-irmb-test",
          "title": {
            "ru": "КНДР провела испытание ракеты средней дальности на фоне напряжённости из-за взрыва в шахте",
            "en": "North Korea test-fires intermediate-range missile amid mine blast tensions"
          },
          "domain": "scmp.com",
          "url": "https://www.scmp.com/news/asia/east-asia/article/3369665/north-korea-test-fires-intermediate-range-missile-amid-mine-blast-tensions",
          "publication_date": "2026-10-03",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["middle-east"] = {
  "index": 39,
  "delta": -9,
  "status": "tense",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Вокруг Ирана и Ормузского пролива неделя прошла под санкционным и военным давлением: 29.09 новые санкции США за закупки оружия для Ирана, 01–03.10 удары по танкерам в проливе, при этом посредничество Катара продолжается.",
        "en": "The week around Iran and the Strait of Hormuz ran under sanctions and military pressure: new US sanctions over Iranian weapons procurement on 29.09, tanker attacks in the strait on 01–03.10, with Qatari mediation still ongoing."
      },
      "why": {
        "ru": "Пролив остаётся узким местом мировой энергетики, поэтому удары по танкерам и ограничения движения дают и военный, и экономический вклад в индекс.",
        "en": "The strait remains the world's energy chokepoint, so tanker attacks and shipping restrictions feed both the military and the economic side of the index."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
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
      "observation": {
        "ru": "Перемирие в Газе нарушено внутри окна: удары Израиля по жилым домам 02.10 и 03.10, погибли как минимум девять человек.",
        "en": "The Gaza ceasefire was violated inside the window: Israeli strikes on residential buildings on 02.10 and 03.10 killed at least nine people."
      },
      "why": {
        "ru": "Нарушение действующего режима — прямое опровержение деэскалационного критерия D8.1 и сигнал о хрупкости перемирия.",
        "en": "Violations of the standing regime directly refute the de-escalation criterion D8.1 and signal the ceasefire's fragility."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "aljazeera-com-gaza-city-apartment-strike",
          "title": {
            "ru": "Воздушная атака Израиля на жилой дом в Газе убила не менее пяти человек",
            "en": "Israeli air attack on Gaza City apartment kills at least five"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/10/3/israeli-air-attack-on-gaza-city-apartment-kills-at-least-five",
          "publication_date": "2026-10-03",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "reuters-com-israeli-strike-gaza-2026-10-02",
          "title": {
            "ru": "Удар Израиля по Газе убил четырёх человек, сообщают медики",
            "en": "Israeli strike kills four people in Gaza, medics say"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/middle-east/israeli-strike-kills-four-people-gaza-medics-say-2026-10-02/",
          "publication_date": "2026-10-02",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["north-america"] = {
  "index": 43,
  "delta": 15,
  "status": "danger",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "29.09 в США вступили в силу импортные запреты на ряд канадских товаров (алкоголь, молочная продукция, мотоциклы, около $1 млрд) в ответ на контрмеры Оттавы — эскалация торговой войны между союзниками.",
        "en": "On 29.09 US import bans on a range of Canadian goods (alcohol, dairy, motorcycles, about $1 billion) took effect in response to Ottawa's countermeasures — an escalation of the trade war between allies."
      },
      "why": {
        "ru": "Прямое ограничение торговых связей внутри НАТО — экономический трек драйвера D4 и одновременно сигнал о трении в североамериканском альянсе.",
        "en": "A direct restriction of trade inside NATO — the D4 economic track and at the same time a signal of friction in the North American alliance."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
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
    },
    {
      "observation": {
        "ru": "Пентагон 30.09 подтвердил полное завершение вывода войск США из Ирака — завершено 23-летнее присутствие.",
        "en": "On 30.09 the Pentagon confirmed the completed withdrawal of US troops from Iraq, ending a 23-year presence."
      },
      "why": {
        "ru": "Крупнейшее деэскалационное событие недели: выход третьей стороны из конфликта (D7.4, уровень 3).",
        "en": "The week's largest de-escalation event: withdrawal of a third party from the conflict (D7.4, level 3)."
      },
      "contribution": "high",
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
        }
      ]
    }
  ]
};
  s.regions["south-asia"] = {
  "index": 46,
  "delta": -3,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "02.10 у границы погибли два пакистанских гражданина, и 03.10 Пакистан вызвал индийского поверенного в делах — стороны обменялись протестами на фоне устойчивой напряжённости между ядерными державами.",
        "en": "Two Pakistani civilians were killed at the border on 02.10, and on 03.10 Pakistan summoned India's chargé d'affaires — the sides exchanged protests amid persistent tension between nuclear powers."
      },
      "why": {
        "ru": "Пограничный инцидент с летальным исходом и дипломатический протест — сигнал на южноазиатском направлении, где отношения двух ядерных держав остаются хрупкими.",
        "en": "A lethal border incident with a diplomatic protest — a signal on the South Asian track, where relations between two nuclear powers remain fragile."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "aljazeera-pakistan-summons-indian-diplomat",
          "title": {
            "ru": "Пакистан вызвал индийского дипломата после убийства двух пакистанцев у границы",
            "en": "Pakistan summons Indian diplomat over border killing of two Pakistanis"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/10/3/pakistan-summons-indian-diplomat-over-border-killing-of-two-pakistanis",
          "publication_date": "2026-10-03",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "mofa-pakistan-summons-indian-charge-daffaires",
          "title": {
            "ru": "Атташе по делам Индии вызван в МИД Пакистана в связи с убийством двух граждан",
            "en": "Indian Chargé d'Affaires Summoned over Killing of Two Pakistani Civilians"
          },
          "domain": "mofa.gov.pk",
          "url": "https://mofa.gov.pk/press-releases/indian-charge-daffaires-summoned-over-killing-of-two-pakistani-civilians",
          "publication_date": "2026-10-03",
          "accessed_date": "2026-10-04",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "01.10 Пакистан нанёс авиаудары по Афганистану, заявив о гибели 22 боевиков; Кабул сообщает о девяти погибших мирных жителях в Кунаре и Гельменде.",
        "en": "On 01.10 Pakistan struck Afghanistan, claiming 22 militants killed; Kabul reported nine civilian deaths in Kunar and Helmand."
      },
      "why": {
        "ru": "Государственные авиаудары по территории соседа продолжают двустороннюю войну Пакистан–Афганистан без деэскалации.",
        "en": "State airstrikes on a neighbour sustain the Pakistan–Afghanistan war with no de-escalation."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "reuters-com-pakistan-airstrikes-afghanistan",
          "title": {
            "ru": "Удары Пакистана по Афганистану убили девять человек, заявляет Кабул",
            "en": "Pakistani airstrikes in Afghanistan kill nine, Kabul says"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/asia-pacific/pakistani-airstrikes-afghanistan-kill-nine-kabul-says-2026-10-01/",
          "publication_date": "2026-10-01",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["africa"] = {
  "index": 46,
  "delta": -1,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "04.10 Египет принимает в Новом Эль-Аламейне четырёхсторонний саммит (Египет, Эритрея, Судан, Сомали) на фоне обострения конфликта в Эфиопии и боёв в Тыграе.",
        "en": "On 04.10 Egypt hosts a four-way summit in New El Alamein (Egypt, Eritrea, Sudan, Somalia) amid the escalation of the conflict in Ethiopia and fighting in Tigray."
      },
      "why": {
        "ru": "Региональная дипломатия активизировалась именно из-за военного обострения: саммит — ответ на риск расширения конфликта в Африканском Роге.",
        "en": "Regional diplomacy accelerated precisely because of the military escalation: the summit responds to the risk of the conflict spreading in the Horn of Africa."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "anews-egypt-four-way-summit",
          "title": {
            "ru": "Египет проведёт четырёхсторонний саммит с Эритреей, Сомали и Суданом на фоне конфликта в Эфиопии",
            "en": "Egypt to host 4-way summit with Eritrea, Somalia, Sudan amid Ethiopia conflict"
          },
          "domain": "anews.com.tr",
          "url": "https://www.anews.com.tr/europe/2026/10/03/egypt-to-host-4-way-summit-with-eritrea-somalia-sudan-amid-ethiopia-conflict",
          "publication_date": "2026-10-03",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "presidency-egypt-sisi-four-way-summit",
          "title": {
            "ru": "Президент ас-Сиси примет участие в координационном саммите Афросоюза и четырёхстороннем консультативном саммите",
            "en": "President El-Sisi Attends AU Mid-Year Coordination Meeting & Four-way Consultative Summit"
          },
          "domain": "presidency.eg",
          "url": "https://www.presidency.eg/en/%D9%82%D8%B3%D9%85-%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1-%D8%B1%D8%A6%D8%A7%D8%B3%D9%8A%D8%A9/news03102026-6/",
          "publication_date": "2026-10-03",
          "accessed_date": "2026-10-04",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Эритрея 01.10 разорвала дипломатические отношения с Эфиопией после взаимных высылок дипломатов; Египет объявил персоной нон грата дипломата Эфиопии.",
        "en": "On 01.10 Eritrea severed diplomatic ties with Ethiopia after tit-for-tat diplomat expulsions; Egypt declared an Ethiopian diplomat persona non grata."
      },
      "why": {
        "ru": "Дипломатический разрыв в регионе, где уже идёт война в Тыграе, повышает риск прямого вовлечения соседей.",
        "en": "A diplomatic rupture in a region already at war in Tigray raises the risk of direct neighbouring involvement."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "aljazeera-com-eritrea-severs-ties-ethiopia",
          "title": {
            "ru": "Эритрея разрывает дипломатические отношения с Эфиопией в ответ на высылку дипломатов",
            "en": "Eritrea severs diplomatic ties with Ethiopia in tit-for-tat move"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/10/1/eritrea-severs-diplomatic-ties-with-ethiopia-in-tit-for-tat-move",
          "publication_date": "2026-10-01",
          "accessed_date": "2026-10-04",
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
  },
  {
    "date": "2026-10-04",
    "value": 46,
    "methodology": "3.0"
  }
];
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
  s.sources = [
  {
    "id": "scmp-china-troops-tsentr-2026",
    "title": {
      "ru": "Китайские военные выстроились на учения «Центры-2026» России по мере укрепления военных связей",
      "en": "Chinese troops line up for Russia's Tsentr-2026 exercise as military ties tighten"
    },
    "domain": "scmp.com",
    "url": "https://www.scmp.com/news/china/military/article/3369657/chinese-troops-line-russias-tsentr-2026-exercise-military-ties-tighten",
    "publication_date": "2026-10-03",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "scmp-nmesis-japan-island",
    "title": {
      "ru": "США впервые развёртывают противокорабельную систему NMESIS на японском острове, ближайшем к Тайваню",
      "en": "US to deploy NMESIS anti-ship system on Japanese island closest to Taiwan for first time"
    },
    "domain": "scmp.com",
    "url": "https://www.scmp.com/news/china/diplomacy/article/3369666/us-deploy-nmesis-anti-ship-system-japanese-island-closest-taiwan-first-time",
    "publication_date": "2026-10-03",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "scmp-north-korea-irmb-test",
    "title": {
      "ru": "КНДР провела испытание ракеты средней дальности на фоне напряжённости из-за взрыва в шахте",
      "en": "North Korea test-fires intermediate-range missile amid mine blast tensions"
    },
    "domain": "scmp.com",
    "url": "https://www.scmp.com/news/asia/east-asia/article/3369665/north-korea-test-fires-intermediate-range-missile-amid-mine-blast-tensions",
    "publication_date": "2026-10-03",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
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
  },
  {
    "id": "guardian-nato-nuclear-rhetoric",
    "title": {
      "ru": "Сводка: НАТО осуждает «безответственную ядерную риторику» Москвы, пока удары по Киеву нарастают",
      "en": "Ukraine war briefing: Nato condemns Moscow's 'irresponsible nuclear rhetoric' as strikes on Kyiv intensify"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/sep/30/ukraine-war-briefing-nato-condemns-moscows-irresponsible-nuclear-rhetoric-as-strikes-on-kyiv-intensify",
    "publication_date": "2026-09-30",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "cnbc-kyiv-datacenters-nuclear-rhetoric",
    "title": {
      "ru": "Россия атакует дата-центры в Киеве на фоне осуждения НАТО ядерной риторики Москвы",
      "en": "Russia targets data centers in Kyiv as NATO condemns Moscow's 'irresponsible nuclear rhetoric'"
    },
    "domain": "cnbc.com",
    "url": "https://www.cnbc.com/2026/09/30/ukraine-war-russia-nato-nuclear-kyiv.html",
    "publication_date": "2026-09-30",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "yahoo-finance-russia-military-spending-2027",
    "title": {
      "ru": "Россия планирует увеличение военных расходов на 27% в 2027 году",
      "en": "Russia Plans 27% Increase in Military Spending in 2027"
    },
    "domain": "finance.yahoo.com",
    "url": "https://finance.yahoo.com/economy/policy/articles/russia-plans-27-increase-military-135647070.html",
    "publication_date": "2026-09-30",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "yahoo-kyiv-bomb-shelters-dire",
    "title": {
      "ru": "Киевские бомбоубежища в плачевном состоянии: мэр Кличко перекладывает вину",
      "en": "Kyiv's bomb shelters are in a dire state. Mayor Klitschko is passing on the blame"
    },
    "domain": "yahoo.com",
    "url": "https://www.yahoo.com/news/world/articles/kyivs-bomb-shelters-dire-state-172646250.html",
    "publication_date": "2026-10-01",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-estonia-russia-arson",
    "title": {
      "ru": "Эстония обвиняет Россию в поджоге завода дронов, поставляющих Украине",
      "en": "Estonia blames Russia for arson attack on drone maker supplying Ukraine"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/sep/29/estonia-blames-russia-arson-attack-drone-maker-ukraine",
    "publication_date": "2026-09-29",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-finland-mp-break-ins",
    "title": {
      "ru": "Премьер Финляндии: взломы в домах депутатов могла совершить иностранная держава",
      "en": "Finnish PM says suspected break-ins at MPs' homes could be work of foreign power"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/01/finland-suspected-break-ins-mp-homes-foreign-power",
    "publication_date": "2026-10-01",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-ukraine-refinery-strikes-defying-trump",
    "title": {
      "ru": "Украина продолжает удары по российским НПЗ, несмотря на предупреждения Трампа о ценах на топливо",
      "en": "Ukraine persists with Russian oil refinery strikes in defiance of Trump"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/01/ukraine-russian-oil-refinery-strikes-defying-trump-fuel-price-warnings",
    "publication_date": "2026-10-01",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
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
    "id": "indiatoday-trump-rejects-iran-seven-day-plan",
    "title": {
      "ru": "Трамп отклонил план перемирия: Катар пытается возобновить диалог США и Ирана",
      "en": "Trump rejected truce plan. Qatar now tries to get US and Iran talking again"
    },
    "domain": "indiatoday.in",
    "url": "https://www.indiatoday.in/world/story/us-iran-talks-qatar-mediates-after-trump-rejects-iran-seven-day-hormuz-truce-proposal-3005173-2026-09-28",
    "publication_date": "2026-09-28",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "gulfnews-us-responds-to-tehran-hormuz-plan",
    "title": {
      "ru": "Война США и Ирана: Вашингтон ответил на тегеранскую программу по Ормузу",
      "en": "US-Iran war: US responds to Tehran's Hormuz plan"
    },
    "domain": "gulfnews.com",
    "url": "https://gulfnews.com/uae/us-iran-war-us-responds-to-tehrans-hormuz-plan-what-uae-residents-need-to-know-tonight-september-30-2026-1.500693821",
    "publication_date": "2026-09-30",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
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
    "id": "aljazeera-araghchi-meets-qatari-mediators",
    "title": {
      "ru": "Министр Ирана Арагичи встретился с катарскими посредниками; США настаивают на ядерных переговорах",
      "en": "Iran's Araghchi meets Qatari mediators as US insists on nuclear talks"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/9/29/irans-araghchi-meets-qatari-mediators-as-us-insists-on-nuclear-talks",
    "publication_date": "2026-09-29",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "democracynow-us-iran-indirect-talks",
    "title": {
      "ru": "США и Иран провели косвенные переговоры о прекращении боёв, снятии санкций и открытии Ормуза",
      "en": "US and Iran Hold Indirect Talks on Deal to End Fighting, Lift Sanctions and Reopen Hormuz"
    },
    "domain": "democracynow.org",
    "url": "https://www.democracynow.org/2026/9/29/headlines/us_and_iran_hold_indirect_talks_on_deal_to_end_fighting_lift_sanctions_and_reopen_hormuz",
    "publication_date": "2026-09-29",
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
  },
  {
    "id": "reuters-boeing-wins-navy-fighter-contract",
    "title": {
      "ru": "Пентагон: Boeing получил контракт ВМС на истребитель нового поколения",
      "en": "Boeing wins US Navy's next-generation fighter contract, Pentagon says"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/business/autos-transportation/boeing-wins-us-navys-next-generation-fighter-contract-sources-say-2026-09-29/",
    "publication_date": "2026-09-29",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "war-gov-faxx-contract-award",
    "title": {
      "ru": "Министерство войны и ВМС США заключили контракт по программе F/A-XX",
      "en": "Department of War and U.S. Navy Award Contract for F/A-XX Program"
    },
    "domain": "war.gov",
    "url": "https://www.war.gov/News/Releases/Release/Article/4614331/department-of-war-and-us-navy-award-contract-for-fa-xx-program/",
    "publication_date": "2026-09-29",
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
    "id": "xinhua-iea-325m-barrels-released",
    "title": {
      "ru": "ИЭА: выпущено 325 млн баррелей нефти из стратегических резервов",
      "en": "325 mln barrels of oil released from strategic reserves: IEA"
    },
    "domain": "english.news.cn",
    "url": "https://english.news.cn/20261003/6e3415aa91444ece9a916428366a799f/c.html",
    "publication_date": "2026-10-03",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
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
  },
  {
    "id": "aljazeera-pakistan-summons-indian-diplomat",
    "title": {
      "ru": "Пакистан вызвал индийского дипломата после убийства двух пакистанцев у границы",
      "en": "Pakistan summons Indian diplomat over border killing of two Pakistanis"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/3/pakistan-summons-indian-diplomat-over-border-killing-of-two-pakistanis",
    "publication_date": "2026-10-03",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "mofa-pakistan-summons-indian-charge-daffaires",
    "title": {
      "ru": "Атташе по делам Индии вызван в МИД Пакистана в связи с убийством двух граждан",
      "en": "Indian Chargé d'Affaires Summoned over Killing of Two Pakistani Civilians"
    },
    "domain": "mofa.gov.pk",
    "url": "https://mofa.gov.pk/press-releases/indian-charge-daffaires-summoned-over-killing-of-two-pakistani-civilians",
    "publication_date": "2026-10-03",
    "accessed_date": "2026-10-04",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": true
  },
  {
    "id": "anews-egypt-four-way-summit",
    "title": {
      "ru": "Египет проведёт четырёхсторонний саммит с Эритреей, Сомали и Суданом на фоне конфликта в Эфиопии",
      "en": "Egypt to host 4-way summit with Eritrea, Somalia, Sudan amid Ethiopia conflict"
    },
    "domain": "anews.com.tr",
    "url": "https://www.anews.com.tr/europe/2026/10/03/egypt-to-host-4-way-summit-with-eritrea-somalia-sudan-amid-ethiopia-conflict",
    "publication_date": "2026-10-03",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "presidency-egypt-sisi-four-way-summit",
    "title": {
      "ru": "Президент ас-Сиси примет участие в координационном саммите Афросоюза и четырёхстороннем консультативном саммите",
      "en": "President El-Sisi Attends AU Mid-Year Coordination Meeting & Four-way Consultative Summit"
    },
    "domain": "presidency.eg",
    "url": "https://www.presidency.eg/en/%D9%82%D8%B3%D9%85-%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1-%D8%B1%D8%A6%D8%A7%D8%B3%D9%8A%D8%A9/news03102026-6/",
    "publication_date": "2026-10-03",
    "accessed_date": "2026-10-04",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": true
  },
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
    "id": "ynetnews-com-saudi-yemen-offensive-bab-el-mandeb",
    "title": {
      "ru": "Саудовская Аравия планирует наступление в Йемене силами до 100 тыс. человек для возврата Баб-эль-Мандеба у хуситов",
      "en": "Saudi Arabia plans 100,000-troop Yemen offensive to retake Bab el-Mandeb from Houthis"
    },
    "domain": "ynetnews.com",
    "url": "https://www.ynetnews.com/article/bjxod8tcfe",
    "publication_date": "2026-10-02",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "siasat-com-saudi-houthi-bab-el-mandeb-offensive",
    "title": {
      "ru": "Саудовская Аравия планирует наступление на хуситов для возврата Баб-эль-Мандеб",
      "en": "Saudi Arabia plans Houthi offensive to retake Bab el-Mandeb"
    },
    "domain": "siasat.com",
    "url": "https://www.siasat.com/saudi-arabia-plans-houthi-offensive-to-retake-bab-el-mandeb-3551859/",
    "publication_date": "2026-10-03",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "cde-news-nato-intercept-drone-latvia",
    "title": {
      "ru": "Истребители НАТО перехватывают угрозу дрона в воздушном пространстве Латвии",
      "en": "NATO Fighter Jets Intercept Drone Threat Over Latvia"
    },
    "domain": "cde.news",
    "url": "https://cde.news/nato-baltic-air-policing-jets-shoot-down-drone-over-latvia/",
    "publication_date": "2026-10-02",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-com-gaza-city-apartment-strike",
    "title": {
      "ru": "Воздушная атака Израиля на жилой дом в Газе убила не менее пяти человек",
      "en": "Israeli air attack on Gaza City apartment kills at least five"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/3/israeli-air-attack-on-gaza-city-apartment-kills-at-least-five",
    "publication_date": "2026-10-03",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "reuters-com-israeli-strike-gaza-2026-10-02",
    "title": {
      "ru": "Удар Израиля по Газе убил четырёх человек, сообщают медики",
      "en": "Israeli strike kills four people in Gaza, medics say"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/world/middle-east/israeli-strike-kills-four-people-gaza-medics-say-2026-10-02/",
    "publication_date": "2026-10-02",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "reuters-com-turkey-court-access-ban-t24",
    "title": {
      "ru": "Турецкий суд распорядился заблокировать популярный новостный портал под предлогом «LGBT-пропаганды»",
      "en": "Turkish court orders access ban on popular news portal over LGBTQ propaganda"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/legal/litigation/turkish-court-orders-access-ban-popular-news-portal-over-lgbtq-propaganda-2026-09-30/",
    "publication_date": "2026-09-30",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "europeanjournalists-org-turkey-t24-shutdown",
    "title": {
      "ru": "Турция: стамбульский суд закрыл независимое новостное издание T24",
      "en": "Turkey: Istanbul court shuts down independent news site T24"
    },
    "domain": "europeanjournalists.org",
    "url": "https://europeanjournalists.org/blog/2026/10/01/turkey-istanbul-court-shuts-down-independent-news-site-t24/",
    "publication_date": "2026-10-01",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "securitycouncilreport-org-lebanon-october-2026-forecast",
    "title": {
      "ru": "Ливан: месячный прогноз Совета Безопасности на октябрь 2026",
      "en": "Lebanon, October 2026 Monthly Forecast"
    },
    "domain": "securitycouncilreport.org",
    "url": "https://www.securitycouncilreport.org/monthly-forecast/2026-10/lebanon-40.php",
    "publication_date": "2026-10-01",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "italytelegraph-com-italy-lead-lebanon-monitoring",
    "title": {
      "ru": "Италия возглавит миссию ООН в Ливане: новый план контроля демилитаризованной границы",
      "en": "Italy to Lead UN Lebanon Mission: Border Control Plan 2026"
    },
    "domain": "italytelegraph.com",
    "url": "https://italytelegraph.com/posts/italy-takes-command-new-plan-to-monitor-lebanons-demilitarized-border",
    "publication_date": "2026-10-04",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "reuters-com-russia-metro-temporary-administration",
    "title": {
      "ru": "Россия передала активы немецкой сети Metro под временное управление",
      "en": "Russia puts German retailer Metro's assets under temporary administration"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/business/russia-puts-german-retailer-metros-assets-under-temporary-administration-amid-2026-09-28/",
    "publication_date": "2026-09-28",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "apnews-com-russia-kremlin-metro-germany",
    "title": {
      "ru": "Путин перевёл российские активы Metro AG под временное управление Кремля",
      "en": "Putin places Metro AG's Russian assets under temporary administration"
    },
    "domain": "apnews.com",
    "url": "https://apnews.com/article/russia-kremlin-metro-germany-ukraine-3c9e1ffc85eec2a448ca2dbc2ef4147b",
    "publication_date": "2026-09-28",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-com-eritrea-severs-ties-ethiopia",
    "title": {
      "ru": "Эритрея разрывает дипломатические отношения с Эфиопией в ответ на высылку дипломатов",
      "en": "Eritrea severs diplomatic ties with Ethiopia in tit-for-tat move"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/1/eritrea-severs-diplomatic-ties-with-ethiopia-in-tit-for-tat-move",
    "publication_date": "2026-10-01",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "reuters-com-pakistan-airstrikes-afghanistan",
    "title": {
      "ru": "Удары Пакистана по Афганистану убили девять человек, заявляет Кабул",
      "en": "Pakistani airstrikes in Afghanistan kill nine, Kabul says"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/world/asia-pacific/pakistani-airstrikes-afghanistan-kill-nine-kabul-says-2026-10-01/",
    "publication_date": "2026-10-01",
    "accessed_date": "2026-10-04",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-iraq-security-after-us-withdrawal",
    "title": {
      "ru": "Как изменится безопасность Ирака после вывода войск США",
      "en": "How does Iraq's security change after US forces withdraw?"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/9/30/how-does-iraqs-security-change-after-us-forces-withdraw",
    "publication_date": "2026-09-30",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "taipeitimes-nmesis-yonaguni",
    "title": {
      "ru": "США разместят противокорабельные ракеты на острове у Тайваня в ходе учений",
      "en": "US to put anti-ship missiles on island near Taiwan for drill"
    },
    "domain": "taipeitimes.com",
    "url": "https://www.taipeitimes.com/News/taiwan/archives/2026/10/03/2003865333",
    "publication_date": "2026-10-03",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "globaltimes-nmesis-yonaguni",
    "title": {
      "ru": "США, как сообщается, впервые развернут NMESIS на западном острове Японии; эксперт предупреждает о росте рисков безопасности",
      "en": "US reportedly to deploy NMESIS to Japan's westernmost island for first time; expert warns greater security risk"
    },
    "domain": "globaltimes.cn",
    "url": "https://www.globaltimes.cn/page/202610/1371655.shtml",
    "publication_date": "2026-10-02",
    "accessed_date": "2026-10-11",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aljazeera-kordofan-battle-1001",
    "title": {
      "ru": "Битва за Кордофан: коридор, связывающий восток и запад Судана",
      "en": "The battle for Kordofan: The corridor linking Sudan's east and west"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/1/the-battle-for-kordofan-the-corridor-linking-sudans-east-and-west",
    "publication_date": "2026-10-01",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "martinplaut-eepa-766-1001",
    "title": {
      "ru": "Ситуационный отчёт EEPA: Африканский Рог, № 766, 1 октября 2026",
      "en": "EEPA Situation Report, Horn of Africa, No. 766, 1 October 2026"
    },
    "domain": "martinplaut.com",
    "url": "https://martinplaut.com/2026/10/01/eepa-situation-report-horn-of-africa-no-766-1-october-2026/",
    "publication_date": "2026-10-01",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-pakistan-raids-kunar-1001",
    "title": {
      "ru": "Пакистан нанёс смертоносные авиаудары по Афганистану (Кунар, Гильменд)",
      "en": "Pakistan launches deadly air attacks on Afghanistan"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/1/afghanistan-says-nine-killed-in-pakistani-air-raids-on-kunar-helmand",
    "publication_date": "2026-10-01",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "wapo-pakistan-airstrikes-1001",
    "title": {
      "ru": "Пакистанские авиаудары по Афганистану: 10 мирных жителей погибли, заявляют Кабул и ООН",
      "en": "Pakistani airstrikes in Afghanistan kill 10 civilians, Kabul and UN say"
    },
    "domain": "washingtonpost.com",
    "url": "https://www.washingtonpost.com/world/2026/10/01/pakistan-afghanistan-airstrikes-militants-civilians-border-clashes/ecd6687e-bd4f-11f1-81fc-9b76f8343b6c_story.html",
    "publication_date": "2026-10-01",
    "accessed_date": "2026-10-12",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "criticalthreats-ethiopia-review-1002",
    "title": {
      "ru": "Обзор войны в Эфиопии, 2 октября 2026",
      "en": "Ethiopia War Security Review, October 2, 2026"
    },
    "domain": "criticalthreats.org",
    "url": "https://www.criticalthreats.org/briefs/ethiopia-war-security-review/ethiopia-war-security-review-october-2-2026",
    "publication_date": "2026-10-02",
    "accessed_date": "2026-10-12",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  }
];
})();
