window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.global = {
  "index": 70,
  "delta": 2
};
  s.published = "2026-11-01";
  s.through = "2026-11-01";
  s.methodology = "3.0";
  s.regions_taxonomy = "2.0";
  s.dataState = "published";
  s.q = 1;
  s.nullWeight = 0;
  s.coverage = {
  "coveredDrivers": 9,
  "totalDrivers": 9
};
  s.confidence = "full";
  s.sensitivity = 0.6;
  s.precursor = {
  "value": 44,
  "signalingSubgroups": 5
};
  s.coverageCriteria = {
  "covered": 34,
  "total": 46,
  "uncovered": [
    "D1.3",
    "D1.6",
    "D2.4",
    "D3.1",
    "D4.1",
    "D5.3",
    "D6.1",
    "D6.4",
    "D7.3",
    "D7.4",
    "D9.5",
    "D9.6a"
  ]
};
  s.recalc = {
  "at": "2026-11-01T06:21:55.051Z",
  "reason": "Еженедельный пересчёт",
  "previous": 70,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
  s.regions = {
  "russia-belarus": {
    "index": 71,
    "delta": 5,
    "status": "very",
    "background": false
  },
  "ukraine-moldova": {
    "index": 73,
    "delta": 5,
    "status": "very",
    "background": false
  },
  "baltic": {
    "index": 71,
    "delta": 2,
    "status": "very",
    "background": true
  },
  "balkans": {
    "index": 71,
    "delta": 2,
    "status": "very",
    "background": false
  },
  "eu-north-europe": {
    "index": 69,
    "delta": 1,
    "status": "very",
    "background": false
  },
  "south-caucasus": {
    "index": 68,
    "delta": 2,
    "status": "very",
    "background": true
  },
  "central-asia": {
    "index": 67,
    "delta": 2,
    "status": "very",
    "background": true
  },
  "east-asia": {
    "index": 70,
    "delta": 6,
    "status": "very",
    "background": false
  },
  "middle-east": {
    "index": 83,
    "delta": 5,
    "status": "critical",
    "background": false
  },
  "north-america": {
    "index": 72,
    "delta": 0,
    "status": "very",
    "background": false
  },
  "south-asia": {
    "index": 69,
    "delta": 2,
    "status": "very",
    "background": true
  },
  "africa": {
    "index": 71,
    "delta": 2,
    "status": "very",
    "background": false
  }
};
  s.regions["russia-belarus"] = {
  "index": 71,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Кремль говорит, что подготовка трёхсторонних переговоров не требует паузы в боях, и что переговоры возобновятся после 4 ноября; Зеленский предложил провести трёхстороннюю встречу в Турции.",
        "en": "The Kremlin says preparing trilateral talks does not require a pause in fighting and that talks will resume after 4 November; Zelensky proposed holding a trilateral meeting in Turkey."
      },
      "why": {
        "ru": "Переговорный трек без прекращения огня — сигнал Д3.4: дипломатия идёт, но не как деэскалация.",
        "en": "A negotiating track without a ceasefire is a D3.4 signal: diplomacy proceeds, but not as de-escalation."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "sputnik-trilateral-resume",
          "title": {
            "ru": "Кремль: трёхсторонние переговоры по Украине возобновятся после 4 ноября",
            "en": "Kremlin says trilateral talks on Ukraine to resume after November 4"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261029/kremlin-says-trilateral-talks-on-ukraine-to-resume-after-november-4-1124971137.html",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "aa-kremlin-trilateral-pause",
          "title": {
            "ru": "Кремль: подготовка трёхсторонних переговоров не требует паузы в боевых действиях",
            "en": "Kremlin says preparations for trilateral talks do not require pause to fighting"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/kremlin-says-preparations-for-trilateral-talks-do-not-require-pause-to-fighting/4106812",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "report-zelensky-trilateral",
          "title": {
            "ru": "Зеленский предложил провести трёхсторонние переговоры в Турции",
            "en": "Zelensky proposes holding trilateral talks in Turkiye"
          },
          "domain": "report.az",
          "url": "https://report.az/en/other-countries/zelensky-proposes-holding-trilateral-talks-in-turkiye",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Чёрное море остаётся зоной ударов: российские силы поразили грузовое судно южнее Одессы и судно со снабжением украинских сил; черноморские страны НАТО осудили распространение войны на коммерческое судоходство.",
        "en": "The Black Sea remains a strike zone: Russian forces hit a cargo ship south of Odesa and a vessel supplying Ukrainian forces; NATO Black Sea states condemned the spillover of war onto commercial shipping."
      },
      "why": {
        "ru": "Удары по судоходству (Д7.2, Д9.3) переносят конфликт на торговые маршруты — это удерживает эскалацию на высоком уровне.",
        "en": "Strikes on shipping (D7.2, D9.3) move the conflict onto trade routes, keeping escalation high."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "tass-cargo-ship-odessa",
          "title": {
            "ru": "Российские силы поразили грузовое судно в 37 км южнее Одессы",
            "en": "Russian forces hit cargo ship 37 km south of Odessa — Defense Ministry"
          },
          "domain": "tass.com",
          "url": "https://tass.com/defense/2211383",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "sputnik-black-sea-ship",
          "title": {
            "ru": "Россия ударила по судну со снабжением украинских сил в Чёрном море",
            "en": "Russia strikes ship with supplies to Ukrainian forces in Black Sea"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261029/russia-strikes-ship-with-supplies-to-ukrainian-forces-in-black-sea--mod-1124975973.html",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "defensenews-black-sea-nations",
          "title": {
            "ru": "Черноморские страны НАТО осудили распространение войны на коммерческое судоходство",
            "en": "NATO's Black Sea nations decry Ukraine war spillover endangering commercial ship traffic"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/29/natos-black-sea-nations-decry-ukraine-war-spillover-endangering-commercial-ship-traffic/",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
  s.regions["ukraine-moldova"] = {
  "index": 73,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Эвакуация Олешек завершилась: жителей вывезли в Украину, они воссоединились с семьями, омбудсмен РФ объявил о завершении миссии и договорённости о регулярных гуманитарных миссиях; ООН назвала перемирие «надеждой» для гражданских.",
        "en": "The Oleshky evacuation is complete: residents were taken to Ukraine and reunited with their families, Russia's ombudsman announced the end of the mission and an agreement on regular humanitarian missions, and the UN called the truce \"hope\" for civilians."
      },
      "why": {
        "ru": "Единственный деэскалационный сигнал недели (Д3.5, Д8.2) — он снижает вклад региона, но остаётся локальным.",
        "en": "The week's only de-escalatory signal (D3.5, D8.2) lowers the region's contribution but remains local."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "cbs-oleshky-evacuation",
          "title": {
            "ru": "Жителей оккупированного Россией города вывезли в Украину в ходе перемирия при посредничестве США",
            "en": "Ukrainians trapped in Russia-held city evacuate during local ceasefire"
          },
          "domain": "cbsnews.com",
          "url": "https://www.cbsnews.com/news/residents-evacuated-oleshky-arrive-ukraine-temporary-us-brokered-ceasefire/",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "france24-oleshky-evacuees",
          "title": {
            "ru": "Жители оккупированных Россией Олешек воссоединились с семьями после эвакуации",
            "en": "Residents from Russian-occupied Oleshky reunite with families after evacuation"
          },
          "domain": "france24.com",
          "url": "https://www.france24.com/en/europe/20261031-evacuees-from-russian-occupied-oleshky-arrive-in-ukraine",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "sputnik-alyoshki-mission-end",
          "title": {
            "ru": "Гуманитарная миссия в Алёшках завершается — омбудсмен РФ",
            "en": "Humanitarian mission in Alyoshki coming to end — Russian ombudswoman"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261030/humanitarian-mission-in-alyoshki-coming-to-end---russian-ombudswoman-1124980382.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Удары по энергетике и логистике: Киевская ТЭЦ-6 и железнодорожный вокзал в Днепре (13 погибших), в Чернигове погибли две девушки; Зеленский говорит о сложной ситуации с энергоснабжением. США одобрили продажу ракет Patriot на $2,1 млрд, Украина завершила работу над новой системой ПРО.",
        "en": "Strikes on energy and logistics: Kyiv CHPP-6 and the railway station in Dnipro (13 killed), two teenage girls killed in Chernihiv; Zelensky describes a difficult power supply situation. The US approved a $2.1bn Patriot sale and Ukraine completed work on a new air-defence system."
      },
      "why": {
        "ru": "Энергетика и железнодорожная логистика — цели ударов (Д1.4, Д7.1), а внешние поставки ПВО (Д4.2) меняют баланс, не снижая интенсивность.",
        "en": "Energy and rail logistics are strike targets (D1.4, D7.1), while external air-defence supplies (D4.2) shift the balance without reducing intensity."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "sputnik-chpp6-strike",
          "title": {
            "ru": "Российские силы ударили по Киевской ТЭЦ-6, обеспечивавшей военную логистику",
            "en": "Russian forces hit Kiev CHPP-6 supplying energy to Ukrainian military logistics"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261031/russian-forces-hit-kiev-chpp-6-supplying-energy-to-ukrainian-military-logistics---mod-1124982131.html",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "un-news-dnipro-station",
          "title": {
            "ru": "Российский удар дроном по железнодорожному вокзалу в Украине: 13 погибших",
            "en": "Russia drone strike on Ukrainian railway station kills 13"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/feed/view/en/story/2026/10/1168702",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "aa-patriot-sale-ukraine",
          "title": {
            "ru": "США одобрили продажу Украине ракет Patriot на $2,1 млрд",
            "en": "US approves $2.1B Patriot missile sale to Ukraine"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/us-approves-21b-patriot-missile-sale-to-ukraine/4106902",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
  s.regions["baltic"] = {
  "index": 71,
  "delta": 2,
  "status": "very",
  "background": true,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Собственных сигналов в окне недели не собрано; фон — удары по украинской энергетике (Киевская ТЭЦ-6, логистика армии) и предупреждения США о теракте в Москве.",
        "en": "No signals of its own were collected in the week window; the backdrop is strikes on Ukrainian energy (Kyiv CHPP-6, army logistics) and US warnings about a terrorist attack in Moscow."
      },
      "why": {
        "ru": "Индекс региона отражает глобальный фон; локальной атрибуции в источниках недели нет, поэтому дельта не подаётся как региональная.",
        "en": "The regional index reflects the global backdrop; there is no local attribution in the week's sources, so the delta is not presented as regional."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "sputnik-chpp6-strike",
          "title": {
            "ru": "Российские силы ударили по Киевской ТЭЦ-6, обеспечивавшей военную логистику",
            "en": "Russian forces hit Kiev CHPP-6 supplying energy to Ukrainian military logistics"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261031/russian-forces-hit-kiev-chpp-6-supplying-energy-to-ukrainian-military-logistics---mod-1124982131.html",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-logistics-energy-strike",
          "title": {
            "ru": "Российские силы ударили по логистике и энергетике украинской армии",
            "en": "Russian forces strike Ukrainian army's logistics, energy infrastructure facilities"
          },
          "domain": "tass.com",
          "url": "https://tass.com/defense/2211325",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Фон перевооружения: Destinus нарастил выпуск крылатых ракет выше довоенного годового производства Европы, польские МиГ-29 направлены в Украину.",
        "en": "Rearmament backdrop: Destinus raised cruise-missile output above Europe's pre-war annual production and Polish MiG-29s were sent to Ukraine."
      },
      "why": {
        "ru": "Для Балтии это контекст, а не измеренный сигнал недели — запись носит фоновый характер.",
        "en": "For the Baltics this is context rather than a measured weekly signal — the entry is background in nature."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "defensenews-destinus",
          "title": {
            "ru": "Месячный выпуск Destinus превысил довоенное годовое производство крылатых ракет в Европе",
            "en": "Destinus monthly output tops Europe's pre-war annual cruise missile production"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/29/destinus-monthly-output-tops-europes-pre-war-annual-cruise-missile-production/",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "twz-polish-mig29",
          "title": {
            "ru": "Польские МиГ-29 и боеприпасы для F-16, как сообщается, направлены в Украину",
            "en": "Polish MiG-29s, F-16 cannon ammo reportedly headed to Ukraine"
          },
          "domain": "twz.com",
          "url": "https://www.twz.com/news-features/polish-mig-29s-f-16-cannon-ammo-reportedly-headed-to-ukraine-as-bitter-warsaw-kyiv-rift-heals",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
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
  "index": 71,
  "delta": 2,
  "status": "very",
  "background": false,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Сербия повысила уровень террористической угрозы после нападения на посольство Израиля; на этом фоне ФСБ сообщила, что США предупреждали Россию о готовящемся теракте в Москве.",
        "en": "Serbia raised its terrorist threat level after the attack on the Israeli embassy; against that backdrop the FSB said the US had warned Russia about an impending terrorist attack in Moscow."
      },
      "why": {
        "ru": "Террористическая угроза в Европе и предупреждения о терактах — сигнал Д7.2 в его невоенной форме.",
        "en": "Terrorist threat in Europe and attack warnings are a D7.2 signal in its non-military form."
      },
      "contribution": "medium",
      "confidence": "low",
      "sources": [
        {
          "id": "balkaninsight-serbia-alert",
          "title": {
            "ru": "Сербия повысила уровень террористической угрозы после нападения на посольство Израиля",
            "en": "Serbia raises terror alert after attack on Israeli embassy"
          },
          "domain": "balkaninsight.com",
          "url": "https://balkaninsight.com/2026/10/28/serbia-raises-terror-alert-after-attack-on-israeli-embassy/bi/",
          "publication_date": "2026-10-28",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "straits-fsb-us-warning",
          "title": {
            "ru": "ФСБ: США предупредили Россию о возможном теракте в Москве",
            "en": "FSB says US warned Russia of possible Moscow attack"
          },
          "domain": "straitstimes.com",
          "url": "https://www.straitstimes.com/world/europe/fsb-says-us-warned-russia-of-possible-moscow-attack",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Фон для региона — нефтяной шок и гибель судов: в Ормузском проливе горит танкер, Brent подошёл к $120.",
        "en": "The backdrop for the region is an oil shock and ships lost: a tanker is burning in the Strait of Hormuz and Brent approached $120."
      },
      "why": {
        "ru": "Собственных сигналов в окне недели мало (Д7.2 — единственная атрибуция), поэтому запись опирается на экономический канал Д4.6 и помечена пониженной уверенностью.",
        "en": "There are few signals of its own in the week window (D7.2 is the only attribution), so the entry rests on the D4.6 economic channel and is marked as low confidence."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "danas-hormuz-tanker-fire",
          "title": {
            "ru": "В Ормузском проливе горит танкер",
            "en": "Oil tanker on fire in the Strait of Hormuz"
          },
          "domain": "danas.rs",
          "url": "https://www.danas.rs/svet/gori-tanker-u-ormuskom-moreuzu/",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "oilprice-brent-120",
          "title": {
            "ru": "Нефтетрейдеры готовятся к волатильной неделе: Brent приближается к $120",
            "en": "Oil traders brace for a wild week as Brent approaches $120"
          },
          "domain": "oilprice.com",
          "url": "https://oilprice.com/Energy/Oil-Prices/Oil-Traders-Brace-for-a-Wild-Week-as-Brent-Approaches-120.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
  s.regions["eu-north-europe"] = {
  "index": 69,
  "delta": 1,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Энергетический шок: Европа всерьёз пересматривает сворачивание нефтепереработки, фрахт вышел из-под контроля, греческое контейнерное судно затонуло после атаки дрона у Болгарии, черноморские страны НАТО осудили перенос войны на коммерческое судоходство.",
        "en": "Energy shock: Europe is seriously reconsidering refinery closures, freight rates have spiralled, a Greek container ship sank after a drone attack off Bulgaria, and NATO Black Sea states condemned the spillover of war onto commercial shipping."
      },
      "why": {
        "ru": "Стоимость энергии и гибель судов у европейских берегов — прямой сигнал Д4.3, Д4.6 и Д9.3.",
        "en": "Energy costs and ships sinking off European shores are a direct D4.3, D4.6 and D9.3 signal."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "oilprice-refinery-rethink",
          "title": {
            "ru": "Европа всерьёз пересматривает сворачивание нефтепереработки",
            "en": "Europe is now seriously rethinking its oil refinery phase down"
          },
          "domain": "oilprice.com",
          "url": "https://oilprice.com/Energy/Crude-Oil/Europe-Is-Now-Seriously-Rethinking-Its-Oil-Refinery-Phase-Down.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "insjournal-greek-ship-sunk",
          "title": {
            "ru": "Греческое контейнерное судно затонуло после атаки дрона у Болгарии",
            "en": "Greek container ship sinks after drone attack off Bulgaria"
          },
          "domain": "insurancejournal.com",
          "url": "https://www.insurancejournal.com/news/international/2026/10/30/890853.htm",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "defensenews-black-sea-nations",
          "title": {
            "ru": "Черноморские страны НАТО осудили распространение войны на коммерческое судоходство",
            "en": "NATO's Black Sea nations decry Ukraine war spillover endangering commercial ship traffic"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/29/natos-black-sea-nations-decry-ukraine-war-spillover-endangering-commercial-ship-traffic/",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Перевооружение ускоряется: месячный выпуск крылатых ракет Destinus превысил довоенное годовое производство в Европе, Украина ждёт европейских компонентов для новой системы ПРО, польские МиГ-29 и боеприпасы для F-16, как сообщается, направлены в Украину.",
        "en": "Rearmament accelerates: Destinus' monthly cruise-missile output exceeded Europe's pre-war annual production, Ukraine awaits European components for its new air-defence system, and Polish MiG-29s and F-16 munitions reportedly went to Ukraine."
      },
      "why": {
        "ru": "Расширение военного производства и передача авиатехники — индикатор подготовки к длительной конфронтации (Д6.3, Д7.1).",
        "en": "Expanding military production and aircraft transfers indicate preparation for a prolonged confrontation (D6.3, D7.1)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "defensenews-destinus",
          "title": {
            "ru": "Месячный выпуск Destinus превысил довоенное годовое производство крылатых ракет в Европе",
            "en": "Destinus monthly output tops Europe's pre-war annual cruise missile production"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/29/destinus-monthly-output-tops-europes-pre-war-annual-cruise-missile-production/",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "defensenews-ukraine-freyja",
          "title": {
            "ru": "Украина завершила работу над новой системой ПРО и ждёт европейских компонентов",
            "en": "Ukraine completes work on new missile defense system, awaits European partner components"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/30/ukraine-completes-work-on-new-missile-defense-system-awaits-european-partner-components/",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "twz-polish-mig29",
          "title": {
            "ru": "Польские МиГ-29 и боеприпасы для F-16, как сообщается, направлены в Украину",
            "en": "Polish MiG-29s, F-16 cannon ammo reportedly headed to Ukraine"
          },
          "domain": "twz.com",
          "url": "https://www.twz.com/news-features/polish-mig-29s-f-16-cannon-ammo-reportedly-headed-to-ukraine-as-bitter-warsaw-kyiv-rift-heals",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
  s.regions["south-caucasus"] = {
  "index": 68,
  "delta": 2,
  "status": "very",
  "background": true,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Собственных сигналов в окне недели не собрано; фон — переговорный трек по Украине: Кремль говорит о возобновлении трёхсторонних переговоров после 4 ноября, Зеленский предложил площадку в Турции.",
        "en": "No signals of its own were collected in the week window; the backdrop is the Ukraine negotiating track: the Kremlin speaks of resuming trilateral talks after 4 November and Zelensky proposed a venue in Turkey."
      },
      "why": {
        "ru": "Индекс отражает глобальный фон; атрибуции событий региону в источниках недели нет.",
        "en": "The index reflects the global backdrop; the week's sources contain no attribution of events to the region."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "report-zelensky-trilateral",
          "title": {
            "ru": "Зеленский предложил провести трёхсторонние переговоры в Турции",
            "en": "Zelensky proposes holding trilateral talks in Turkiye"
          },
          "domain": "report.az",
          "url": "https://report.az/en/other-countries/zelensky-proposes-holding-trilateral-talks-in-turkiye",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "aa-kremlin-trilateral-pause",
          "title": {
            "ru": "Кремль: подготовка трёхсторонних переговоров не требует паузы в боевых действиях",
            "en": "Kremlin says preparations for trilateral talks do not require pause to fighting"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/kremlin-says-preparations-for-trilateral-talks-do-not-require-pause-to-fighting/4106812",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Экономический фон — удары по судоходству в Ормузе и рост нефтяных цен: импортёры пересматривают маршруты, Brent подошёл к $120.",
        "en": "The economic backdrop is strikes on Hormuz shipping and rising oil prices: importers are revisiting routes as Brent approached $120."
      },
      "why": {
        "ru": "Канал Д4.6 действует на регион через импорт, а не через собственные события недели — уверенность пониженная.",
        "en": "The D4.6 channel reaches the region through imports rather than its own weekly events — confidence is low."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "gcaptain-hormuz-economic-pain",
          "title": {
            "ru": "Удары по судоходству в Ормузе бьют по экономике обеих сторон",
            "en": "Shipping strikes in Hormuz leave both sides with economic pain"
          },
          "domain": "gcaptain.com",
          "url": "https://gcaptain.com/shipping-strikes-in-hormuz-leave-both-sides-with-economic-pain/",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "oilprice-brent-120",
          "title": {
            "ru": "Нефтетрейдеры готовятся к волатильной неделе: Brent приближается к $120",
            "en": "Oil traders brace for a wild week as Brent approaches $120"
          },
          "domain": "oilprice.com",
          "url": "https://oilprice.com/Energy/Oil-Prices/Oil-Traders-Brace-for-a-Wild-Week-as-Brent-Approaches-120.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
  s.regions["central-asia"] = {
  "index": 67,
  "delta": 2,
  "status": "very",
  "background": true,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Собственных сигналов в окне недели не собрано; фон — санкционное давление и торговые маршруты: Россия на G20 указала на санкции и заморозку активов, министры Quad обсуждали цепочки поставок и «произвольные экспортные ограничения».",
        "en": "No signals of its own were collected in the week window; the backdrop is sanctions pressure and trade routes: Russia at the G20 pointed to sanctions and asset freezes, and Quad ministers discussed supply chains and \"arbitrary export restrictions\"."
      },
      "why": {
        "ru": "Для региона это экономический фон (Д9.2), а не измеренный сигнал недели — запись помечена как фоновая.",
        "en": "For the region this is an economic backdrop (D9.2) rather than a measured weekly signal — the entry is marked as background."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "sputnik-g20-sanctions",
          "title": {
            "ru": "Россия на G20 указала на санкции и заморозку активов как методы подрыва мировой торговли",
            "en": "Russia at G20 meeting flags sanctions and asset freezes among methods undermining global trade"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261031/russia-at-g20-meeting-flags-sanctions-and-asset-freezes-among-methods-undermining-global-trade---1124983335.html",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "almonitor-quad-supply",
          "title": {
            "ru": "Министры Quad работают над цепочками поставок и осуждают произвольные экспортные ограничения",
            "en": "Indo-Pacific Quad ministers work on supply chains, denounce arbitrary export restrictions"
          },
          "domain": "al-monitor.com",
          "url": "https://www.al-monitor.com/originals/2026/10/indo-pacific-quad-ministers-work-supply-chains-denounce-arbitrary-export",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Фон безопасности: США, Япония и Южная Корея укрепили партнёрство и подписали соглашение об Арктике, Вашингтон перебрасывает авианосцы на Ближний Восток.",
        "en": "Security backdrop: the US, Japan and South Korea strengthened their partnership and signed an Arctic agreement, while Washington moves carriers to the Middle East."
      },
      "why": {
        "ru": "Перестройка блоков вокруг России и Китая — контекст для региона, но собственных данных недели нет.",
        "en": "The realignment of blocs around Russia and China is context for the region, but there are no weekly data of its own."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "aa-us-japan-sk-arctic",
          "title": {
            "ru": "США, Япония и Южная Корея укрепили партнёрство и подписали соглашение об Арктике",
            "en": "US, Japan, South Korea strengthen partnership, sign Arctic cooperation agreement"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/us-japan-south-korea-strengthen-partnership-sign-arctic-cooperation-agreement/4107026",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "twz-carriers-oct27",
          "title": {
            "ru": "Где авианосцы: 27 октября 2026 года",
            "en": "Where are the aircraft carriers: October 27, 2026"
          },
          "domain": "twz.com",
          "url": "https://www.twz.com/sea/where-are-the-aircraft-carriers-october-27-2026",
          "publication_date": "2026-10-27",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
  s.regions["east-asia"] = {
  "index": 70,
  "delta": 6,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "КНДР испытала кассетные боеголовки для тактических баллистических ракет и провела тест для оценки мощности оружейной системы; США, Южная Корея и Япония обязались добиваться «полной» денуклеаризации, Пхеньян назвал «стратегическим» многостороннее заявление в поддержку санкций.",
        "en": "North Korea tested cluster warheads for tactical ballistic missiles and ran a test to assess the yield of a weapons system; the US, South Korea and Japan vowed to pursue \"full\" denuclearisation, and Pyongyang called a multilateral sanctions statement \"strategic\"."
      },
      "why": {
        "ru": "Новые типы боеголовок и синхронная реакция трёх союзников — сигнал Д2.2, Д3.3 и Д5.2.",
        "en": "New warhead types and a synchronised response by three allies are a D2.2, D3.3 and D5.2 signal."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "yna-nk-cluster-bomb",
          "title": {
            "ru": "КНДР испытала кассетную боеголовку для тактических баллистических ракет",
            "en": "N. Korea tests cluster bomb mountable on tactical ballistic missiles"
          },
          "domain": "en.yna.co.kr",
          "url": "https://en.yna.co.kr/view/AEN20261101000451315",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "japantimes-denuclearization-vow",
          "title": {
            "ru": "США, Южная Корея и Япония обязались добиваться «полной» денуклеаризации КНДР",
            "en": "US, South Korea and Japan vow complete denuclearization of North Korea"
          },
          "domain": "japantimes.co.jp",
          "url": "https://www.japantimes.co.jp/news/2026/10/31/asia-pacific/politics/north-korea-denuclearization-vow/",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-nk-yield-test",
          "title": {
            "ru": "КНДР провела испытание для оценки мощности оружейной системы",
            "en": "North Korea held test to assess weapon system yield"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2211447",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Тайвань заявил, что Китай препятствует судоходству патрулём у восточного побережья; командующий армией США в Пацифике подтвердил актуальность окна конфликта вокруг Тайваня в 2027 году.",
        "en": "Taiwan said China is obstructing shipping with patrols off its east coast, and the US Army Pacific commander confirmed the relevance of a 2027 Taiwan conflict window."
      },
      "why": {
        "ru": "Давление на судоходство (Д9.3) и публичная оценка окна конфликта (Д1.1) держат напряжение в Тайваньском проливе.",
        "en": "Pressure on shipping (D9.3) and a public assessment of the conflict window (D1.1) keep tension in the Taiwan Strait."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "hindu-taiwan-shipping",
          "title": {
            "ru": "Тайвань заявил, что Китай препятствует судоходству патрулём у восточного побережья",
            "en": "Taiwan says China harassing shipping with east coast patrol"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/taiwan-says-china-harassing-shipping-with-east-coast-patrol/article71652011.ece",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "breakingdefense-taiwan-window",
          "title": {
            "ru": "Окно конфликта вокруг Тайваня в 2027 году остаётся актуальным — командующий армией США в Пацифике",
            "en": "Taiwan 2027 conflict window remains valid, Army Pacific commander says"
          },
          "domain": "breakingdefense.com",
          "url": "https://breakingdefense.com/2026/10/taiwan-2027-conflict-window-remains-valid-army-pacific-commander-says/",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
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
  "index": 83,
  "delta": 5,
  "status": "critical",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Ормуз парализован: четвёртый танкер взорвался на мине, КСИР остановил два танкера, США атаковали два иранских рыболовных судна у Кешма, Оман спас 25 человек с горящего судна. Верховный лидер Ирана обещает «ответ без географических ограничений», армия предупреждает о расширении войны.",
        "en": "Hormuz is paralysed: a fourth tanker exploded on a mine, the IRGC stopped two tankers, the US struck two Iranian fishing boats near Qeshm, and Oman rescued 25 people from a burning vessel. Iran's supreme leader promises a response \"without geographic limits\" and the army warns of a wider war."
      },
      "why": {
        "ru": "Для региона это прямой сигнал по Д1.5, Д4.4 и Д5.1: боевые действия идут на его собственных морских путях.",
        "en": "For the region this is a direct signal across D1.5, D4.4 and D5.1: the fighting is on its own sea lanes."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "mehrnews-fourth-tanker",
          "title": {
            "ru": "Четвёртый танкер взорвался на мине в Ормузском проливе",
            "en": "Fourth tanker explodes after hitting mine in Hormuz Strait"
          },
          "domain": "en.mehrnews.com",
          "url": "https://en.mehrnews.com/news/249039/4th-violating-tanker-catches-fire-in-Hormuz-IRGC-Navy",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "gcaptain-limpet-mines",
          "title": {
            "ru": "Танкер подорван на прикреплённых минах в Ормузском проливе: новая угроза судоходству",
            "en": "Tanker hit by limpet mines in Strait of Hormuz as new threat to shipping emerges"
          },
          "domain": "gcaptain.com",
          "url": "https://gcaptain.com/tanker-hit-by-limpet-mines-in-strait-of-hormuz-as-new-threat-to-shipping-emerges/",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "straits-oman-rescue",
          "title": {
            "ru": "Оман спас 25 человек с горящего судна; Иран остановил танкеры",
            "en": "Oman rescues 25 from burning ship, Iran halts tankers"
          },
          "domain": "straitstimes.com",
          "url": "https://www.straitstimes.com/world/middle-east/oman-rescues-25-from-burning-ship-iran-halts-tankers",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Хуситы сообщили об ударах по нефтеперерабатывающим заводам и аэропортам Саудовской Аравии, коалиция сбила беспилотник над Восточной провинцией; США велели неэкстренным сотрудникам покинуть страну, иранские переговорщики в Дохе обсуждают передачу урана и открытие Ормуза.",
        "en": "The Houthis reported strikes on Saudi refineries and airports, the coalition downed a drone over the Eastern Province; the US told non-emergency staff to leave the country, and Iranian negotiators in Doha discuss uranium transfer and reopening Hormuz."
      },
      "why": {
        "ru": "Удары по энергетике третьей страны и эвакуация персонала расширяют географию конфликта (Д6.2, Д7.2) и держат риск перебоев поставок.",
        "en": "Strikes on a third country's energy sector and staff evacuations widen the conflict geography (D6.2, D7.2) and keep supply-disruption risk elevated."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "sputnik-houthis-refineries",
          "title": {
            "ru": "Хуситы сообщили об ударах по нефтеперерабатывающим заводам и аэропортам Саудовской Аравии",
            "en": "Houthis report attacks on oil refineries, airports in Saudi Arabia"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261030/houthis-report-attacks-on-oil-refineries-airports-in-saudi-arabia-1124977367.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "almonitor-coalition-drone-down",
          "title": {
            "ru": "Коалиция во главе с Саудовской Аравией сообщила об уничтожении беспилотника над Восточной провинцией",
            "en": "Saudi-led coalition says it downs drone over oil-rich Eastern Region"
          },
          "domain": "al-monitor.com",
          "url": "https://www.al-monitor.com/originals/2026/10/saudi-led-coalition-says-it-downs-drone-over-oil-rich-eastern-region",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "almonitor-us-staff-leave",
          "title": {
            "ru": "США велели неэкстренным сотрудникам покинуть Саудовскую Аравию из-за рисков безопасности",
            "en": "US orders non-emergency staff to leave Saudi Arabia over security risks"
          },
          "domain": "al-monitor.com",
          "url": "https://www.al-monitor.com/originals/2026/10/us-orders-non-emergency-staff-leave-saudi-arabia-over-security-risks",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
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
  "index": 72,
  "delta": 0,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Трамп говорит, что США готовы ударить по ядерной программе Ирана «за десять минут», Рубио — что решения о новых ударах пока нет; авианосцы остаются в регионе, союзники в Заливе пересматривают оборонные расходы.",
        "en": "Trump says the US is ready to strike Iran's nuclear programme \"in ten minutes\", while Rubio says no decision on new strikes has been made; carriers remain in the region and Gulf allies are revisiting defence spending."
      },
      "why": {
        "ru": "Публичная угроза удара и одновременно отказ подтвердить решение — сигнал Д5.1 и Д3.2 с высокой неопределённостью.",
        "en": "A public strike threat combined with a refusal to confirm a decision is a D5.1 and D3.2 signal with high uncertainty."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "jpost-trump-ten-minutes",
          "title": {
            "ru": "Трамп: США готовы ударить по ядерной программе Ирана «за десять минут»",
            "en": "Trump says US ready to hit Iran's nuclear program 'in ten minutes'"
          },
          "domain": "jpost.com",
          "url": "https://www.jpost.com/middle-east/iran-news/article-913424",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "hindu-rubio-iran-strikes",
          "title": {
            "ru": "Рубио: США пока не решили, наносить ли новые удары по Ирану",
            "en": "Rubio says U.S. yet to decide on new Iran strikes"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/rubio-says-us-yet-to-decide-on-new-iran-strikes/article71651951.ece",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "twz-carriers-oct27",
          "title": {
            "ru": "Где авианосцы: 27 октября 2026 года",
            "en": "Where are the aircraft carriers: October 27, 2026"
          },
          "domain": "twz.com",
          "url": "https://www.twz.com/sea/where-are-the-aircraft-carriers-october-27-2026",
          "publication_date": "2026-10-27",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Уолл-стрит пережила худший день с июня, Минфин объявил ставку Series I bond 5,51 % на полгода, Brent подошёл к $120; ФБР обвинило КНДР в краже $6,3 млрд у Binance.",
        "en": "Wall Street had its worst day since June, the Treasury set the Series I bond rate at 5.51 % for six months, Brent approached $120, and the FBI blamed North Korea for the $6.3bn Binance theft."
      },
      "why": {
        "ru": "Рыночный стресс (Д4.6) и киберфинансирование ядерной программы КНДР (Д5.2) — внутренние каналы, через которые война приходит в США.",
        "en": "Market stress (D4.6) and cyber-funding of North Korea's nuclear programme (D5.2) are the channels through which the war reaches the US."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "cbc-stocks-sink",
          "title": {
            "ru": "Североамериканские акции падают: Уолл-стрит пережила худший день с июня",
            "en": "North American stocks sink, Wall Street suffers worst day since June"
          },
          "domain": "cbc.ca",
          "url": "https://www.cbc.ca/news/business/tech-stocks-markets-oct-30-9.7403226?cmp=rss",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "cnbc-i-bond-rate",
          "title": {
            "ru": "Минфин США объявил ставку Series I bond 5,51 % на полгода",
            "en": "Treasury Department announces new Series I bond rate of 5.51%"
          },
          "domain": "cnbc.com",
          "url": "https://www.cnbc.com/2026/10/30/treasury-i-bond-rate-through-april-2027.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "straits-fbi-binance",
          "title": {
            "ru": "ФБР обвинило КНДР в краже $6 млрд у Binance",
            "en": "FBI blames North Korea for US$6 billion Binance crypto hack"
          },
          "domain": "straitstimes.com",
          "url": "https://www.straitstimes.com/world/united-states/fbi-blames-north-korea-for-us6-billion-binance-crypto-hack",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
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
  "index": 69,
  "delta": 2,
  "status": "very",
  "background": true,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Собственной атрибуции, которую учитывает региональная модель, в окне недели нет: сигналы региона относятся к критериям Д4 (перебои энергетики, цепочки поставок, Brent у $120), а атрибуция Д4 региональной агрегацией не учитывается (ADR 0022). Фон — Индия осудила перебои в мировой энергетике из-за санкций и узких мест, министры Quad обсуждали цепочки поставок.",
        "en": "There is no attribution of its own that the regional model takes into account this week: the region's signals fall under D4 criteria (energy disruptions, supply chains, Brent near $120), and D4 attribution is not used in regional aggregation (ADR 0022). The backdrop: India condemned global energy disruptions from sanctions and bottlenecks, and Quad ministers discussed supply chains."
      },
      "why": {
        "ru": "Индекс региона отражает глобальный фон; дельта не подаётся как региональная, хотя события недели для региона значимы.",
        "en": "The regional index reflects the global backdrop; the delta is not presented as regional even though the week's events matter for the region."
      },
      "contribution": "medium",
      "confidence": "low",
      "sources": [
        {
          "id": "hindu-india-energy",
          "title": {
            "ru": "Индия осудила перебои в мировой энергетике из-за санкций и узких мест",
            "en": "India slams global energy disruptions through sanctions, chokepoints"
          },
          "domain": "hindustantimes.com",
          "url": "https://www.hindustantimes.com/world-news/us-news/india-slams-global-energy-disruptions-through-sanctions-chokepoints-101793402110619.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "almonitor-quad-supply",
          "title": {
            "ru": "Министры Quad работают над цепочками поставок и осуждают произвольные экспортные ограничения",
            "en": "Indo-Pacific Quad ministers work on supply chains, denounce arbitrary export restrictions"
          },
          "domain": "al-monitor.com",
          "url": "https://www.al-monitor.com/originals/2026/10/indo-pacific-quad-ministers-work-supply-chains-denounce-arbitrary-export",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "oilprice-brent-120",
          "title": {
            "ru": "Нефтетрейдеры готовятся к волатильной неделе: Brent приближается к $120",
            "en": "Oil traders brace for a wild week as Brent approaches $120"
          },
          "domain": "oilprice.com",
          "url": "https://oilprice.com/Energy/Oil-Prices/Oil-Traders-Brace-for-a-Wild-Week-as-Brent-Approaches-120.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Фон — минная угроза в Ормузе: несколько танкеров подорвались и загорелись, Оман спас 25 человек с горящего судна, Иран остановил танкеры.",
        "en": "The backdrop is the mine threat in Hormuz: several tankers struck mines and caught fire, Oman rescued 25 people from a burning vessel, and Iran stopped tankers."
      },
      "why": {
        "ru": "Для региона с импортным топливом и диаспорой в Заливе это канал Д4.3/Д9.3, но региональная агрегация его не видит — запись носит фоновый характер.",
        "en": "For a region with imported fuel and a Gulf diaspora this is a D4.3/D9.3 channel, but regional aggregation does not see it — the entry is background in nature."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "hindu-hormuz-tankers-mines",
          "title": {
            "ru": "Иран заявил, что несколько танкеров подорвались на минах и загорелись в Ормузском проливе",
            "en": "Iran says multiple oil tankers strike mines, catch fire in Strait of Hormuz"
          },
          "domain": "hindustantimes.com",
          "url": "https://www.hindustantimes.com/world-news/iran-says-multiple-oil-tankers-strike-mines-catch-fire-in-strait-of-hormuz-101793395035292.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "straits-oman-rescue",
          "title": {
            "ru": "Оман спас 25 человек с горящего судна; Иран остановил танкеры",
            "en": "Oman rescues 25 from burning ship, Iran halts tankers"
          },
          "domain": "straitstimes.com",
          "url": "https://www.straitstimes.com/world/middle-east/oman-rescues-25-from-burning-ship-iran-halts-tankers",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
  s.regions["africa"] = {
  "index": 71,
  "delta": 2,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Судан: пять детей погибли при ударе дрона по рынку в Ньяле, жители Эль-Обейда зажаты между дронами и арестами, Великобритания ввела санкции против суданских военных за «кампанию насилия» в Эль-Фашире. В Эфиопии удары дронов убили не менее 25 человек.",
        "en": "Sudan: five children were killed in a drone strike on a market in Nyala, residents of El Obeid are caught between drones and arrests, and the UK sanctioned Sudanese military figures over the \"campaign of violence\" in El Fasher. In Ethiopia drone strikes killed at least 25 people."
      },
      "why": {
        "ru": "Удары по гражданским объектам в двух странах одновременно — сигнал Д1.4 и Д8.3, санкции — Д3.3.",
        "en": "Strikes on civilian objects in two countries at once are a D1.4 and D8.3 signal; sanctions are D3.3."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "un-news-sudan-market",
          "title": {
            "ru": "ООН: пять детей погибли при ударе дрона по рынку в Ньяле, Судан",
            "en": "World News in Brief: 5 children killed in Sudan, Haiti hunger emergency, Yemen war update"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/feed/view/en/story/2026/10/1168703",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "un-news-sudan-el-obeid",
          "title": {
            "ru": "Жители Эль-Обейда в Судане зажаты между дронами и арестами",
            "en": "Civilians in Sudan's El Obeid trapped between drones and incarceration"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/feed/view/en/story/2026/10/1168696",
          "publication_date": "2026-10-28",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "africanews-ethiopia-drones",
          "title": {
            "ru": "Удары дронов в Эфиопии: не менее 25 погибших, по свидетельствам",
            "en": "Drone strikes in Ethiopia kill at least 25: witnesses"
          },
          "domain": "africanews.com",
          "url": "http://www.africanews.com/2026/10/31/drone-strikes-in-ethiopia-kill-at-least-25-witnesses/",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Санкции США против Руанды вызвали смешанную реакцию в Гоме; президент Руто требует компенсации для кенийцев, завербованных в российскую армию; Эфиопия получает 12 российских Су-35.",
        "en": "US sanctions on Rwanda drew a mixed reaction in Goma; Kenya's president demands compensation for Kenyans recruited into the Russian army; Ethiopia is receiving 12 Russian Su-35s."
      },
      "why": {
        "ru": "Внешние санкции, вербовка в чужую армию и поставки тяжёлых вооружений связывают регион с глобальной конфронтацией (Д3.3, Д9.2).",
        "en": "External sanctions, recruitment into a foreign army and heavy arms deliveries link the region to the global confrontation (D3.3, D9.2)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "africanews-rwanda-sanctions",
          "title": {
            "ru": "ДР Конго: санкции США против Руанды вызвали смешанную реакцию в Гоме",
            "en": "DRC: US sanctions on Rwanda draw mixed reactions in Goma"
          },
          "domain": "africanews.com",
          "url": "http://www.africanews.com/2026/10/29/drc-us-sanctions-on-rwanda-draw-mixed-reactions-in-goma/",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "africanews-kenya-recruits",
          "title": {
            "ru": "Президент Руто требует компенсации для кенийцев, завербованных в российскую армию",
            "en": "President Ruto seeks compensation for Kenyans recruited into Russian military"
          },
          "domain": "africanews.com",
          "url": "http://www.africanews.com/2026/10/30/president-ruto-seeks-compensation-for-kenyans-recruited-into-russian-military/",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "twz-ethiopia-su35",
          "title": {
            "ru": "Эфиопия получает 12 российских Су-35 и присматривается к С-400",
            "en": "Ethiopia gets 12 Russian Su-35 fighters, eyes S-400 air defenses"
          },
          "domain": "twz.com",
          "url": "https://www.twz.com/air/ethiopia-gets-12-russian-su-35-fighters-eyes-s-400-air-defenses",
          "publication_date": "2026-10-28",
          "accessed_date": "2026-11-01",
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
  },
  {
    "date": "2026-10-18",
    "value": 64,
    "methodology": "3.0"
  },
  {
    "date": "2026-10-25",
    "value": 68,
    "methodology": "3.0"
  },
  {
    "date": "2026-11-01",
    "value": 70,
    "methodology": "3.0"
  }
];
  s.drivers = [
  {
    "label": {
      "ru": "Ормуз: мины, горящие танкеры и «ответ без географических ограничений»",
      "en": "Hormuz: limpet mines, burning tankers and a response \"without geographic limits\""
    },
    "observation": {
      "ru": "Ормузский пролив остаётся зоной атак: четвёртый танкер взорвался на мине, КСИР сообщил об остановке двух танкеров, Оман спас 25 человек с горящего судна, США атаковали два иранских рыболовных судна у Кешма. Верховный лидер Ирана пригрозил США и Израилю «ответом без географических ограничений», армия Ирана предупредила о риске расширения войны. Brent подошёл к $120, бензин в США подорожал на 34 %, топочный мазут — на 74 %.",
      "en": "The Strait of Hormuz remains a strike zone: a fourth tanker exploded on a mine, the IRGC reported stopping two tankers, Oman rescued 25 people from a burning vessel, and the US struck two Iranian fishing boats near Qeshm. Iran's supreme leader threatened the US and Israel with a response \"without geographic limits\", and the Iranian army warned of a wider war. Brent approached $120, US gasoline rose 34 % and heating oil 74 %."
    },
    "why": {
      "ru": "Минная война на морском маршруте и ультиматумы высшего руководства одновременно бьют по Д1, Д4.4–Д4.6 и Д5.1 — это ядро недельного роста индекса.",
      "en": "A mine war on a maritime route and ultimatums from the top leadership hit D1, D4.4–D4.6 and D5.1 at the same time — this is the core of the weekly index increase."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "mehrnews-fourth-tanker",
        "title": {
          "ru": "Четвёртый танкер взорвался на мине в Ормузском проливе",
          "en": "Fourth tanker explodes after hitting mine in Hormuz Strait"
        },
        "domain": "en.mehrnews.com",
        "url": "https://en.mehrnews.com/news/249039/4th-violating-tanker-catches-fire-in-Hormuz-IRGC-Navy",
        "publication_date": "2026-10-31",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      },
      {
        "id": "gcaptain-limpet-mines",
        "title": {
          "ru": "Танкер подорван на прикреплённых минах в Ормузском проливе: новая угроза судоходству",
          "en": "Tanker hit by limpet mines in Strait of Hormuz as new threat to shipping emerges"
        },
        "domain": "gcaptain.com",
        "url": "https://gcaptain.com/tanker-hit-by-limpet-mines-in-strait-of-hormuz-as-new-threat-to-shipping-emerges/",
        "publication_date": "2026-10-30",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "straits-oman-rescue",
        "title": {
          "ru": "Оман спас 25 человек с горящего судна; Иран остановил танкеры",
          "en": "Oman rescues 25 from burning ship, Iran halts tankers"
        },
        "domain": "straitstimes.com",
        "url": "https://www.straitstimes.com/world/middle-east/oman-rescues-25-from-burning-ship-iran-halts-tankers",
        "publication_date": "2026-10-31",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "dawn-khamenei-unrestricted",
        "title": {
          "ru": "Верховный лидер Ирана пригрозил США и Израилю «ответом без географических ограничений»",
          "en": "Iran's supreme leader warns US, Israel of 'unrestricted geographical response'"
        },
        "domain": "dawn.com",
        "url": "https://www.dawn.com/news/2041187/irans-supreme-leader-warns-us-israel-of-unrestricted-geographical-response-to-new-attacks",
        "publication_date": "2026-10-31",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "oilprice-brent-120",
        "title": {
          "ru": "Нефтетрейдеры готовятся к волатильной неделе: Brent приближается к $120",
          "en": "Oil traders brace for a wild week as Brent approaches $120"
        },
        "domain": "oilprice.com",
        "url": "https://oilprice.com/Energy/Oil-Prices/Oil-Traders-Brace-for-a-Wild-Week-as-Brent-Approaches-120.html",
        "publication_date": "2026-10-30",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "F-financial",
        "state_affiliated": false,
        "origin": "collected-in-week"
      }
    ]
  },
  {
    "label": {
      "ru": "Вашингтон и Тегеран: удар «за десять минут» и переговоры в Дохе",
      "en": "Washington and Tehran: a strike \"in ten minutes\" and talks in Doha"
    },
    "observation": {
      "ru": "Трамп заявил, что США готовы ударить по ядерной программе Ирана «за десять минут», Рубио сказал, что решения о новых ударах пока нет; иранская делегация прибыла в Доху обсуждать ядерные предложения с катарскими посредниками, Тегеран говорит о готовности открыть Ормуз в течение двух дней при сделке. США распорядились о выезде неэкстренного персонала из Саудовской Аравии, по данным источников Нетаньяху пытался отдать приказ о подготовке ударов ещё до выборов.",
      "en": "Trump said the US is ready to strike Iran's nuclear programme \"in ten minutes\", while Rubio said no decision on new strikes has been made; an Iranian delegation arrived in Doha to discuss nuclear proposals with Qatari mediators, and Tehran says it could reopen Hormuz within two days under a deal. The US ordered non-emergency staff to leave Saudi Arabia, and reporting says Netanyahu tried to order strike preparations before the elections."
    },
    "why": {
      "ru": "Подготовка удара и переговорный трек идут одновременно — сильнейший сигнал по Д3.2, Д5.1 и Д6.2: стороны торгуются под угрозой применения силы, а часть дипломатического присутствия свёрнута.",
      "en": "Strike preparation and a negotiating track run in parallel — the strongest signal across D3.2, D5.1 and D6.2: the parties bargain under the threat of force while part of the diplomatic presence is drawn down."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "jpost-trump-ten-minutes",
        "title": {
          "ru": "Трамп: США готовы ударить по ядерной программе Ирана «за десять минут»",
          "en": "Trump says US ready to hit Iran's nuclear program 'in ten minutes'"
        },
        "domain": "jpost.com",
        "url": "https://www.jpost.com/middle-east/iran-news/article-913424",
        "publication_date": "2026-11-01",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "hindu-rubio-iran-strikes",
        "title": {
          "ru": "Рубио: США пока не решили, наносить ли новые удары по Ирану",
          "en": "Rubio says U.S. yet to decide on new Iran strikes"
        },
        "domain": "thehindu.com",
        "url": "https://www.thehindu.com/news/international/rubio-says-us-yet-to-decide-on-new-iran-strikes/article71651951.ece",
        "publication_date": "2026-11-01",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "almonitor-qatari-mediators",
        "title": {
          "ru": "Иранские переговорщики встретились с катарскими посредниками на фоне угрозы ударов США",
          "en": "Iranian envoys meet Qatari mediators as threat looms of US strikes after midterms"
        },
        "domain": "al-monitor.com",
        "url": "https://www.al-monitor.com/originals/2026/10/iranian-envoys-meet-qatari-mediators-threat-looms-us-strikes-after-midterms",
        "publication_date": "2026-10-31",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "aa-us-staff-leave-saudi",
        "title": {
          "ru": "США распорядились о выезде неэкстренного персонала из Саудовской Аравии на фоне атак хуситов",
          "en": "US orders non-emergency personnel to leave Saudi Arabia amid Houthi attacks"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/world/us-orders-non-emergency-personnel-to-leave-saudi-arabia-amid-houthi-attacks/4106888",
        "publication_date": "2026-10-30",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      },
      {
        "id": "sputnik-netanyahu-strike-prep",
        "title": {
          "ru": "Нетаньяху пытался приказать готовить удары по Ирану за три дня до выборов",
          "en": "Netanyahu sought to order preparations for strikes on Iran days before elections"
        },
        "domain": "sputnikglobe.com",
        "url": "https://sputnikglobe.com/20261027/netanyahu-sought-to-order-preparations-for-strikes-on-iran-days-before-elections---reports-1124952020.html",
        "publication_date": "2026-10-27",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      }
    ]
  },
  {
    "label": {
      "ru": "Олешки: эвакуация завершилась, фронт — нет",
      "en": "Oleshky: the evacuation is over, the front is not"
    },
    "observation": {
      "ru": "После локального гуманитарного перемирия жителей оккупированных Олешек вывезли в Украину, они воссоединились с семьями; омбудсмен РФ объявил о завершении миссии и договорённости о регулярных гуманитарных миссиях. При этом Киевская ТЭЦ-6 и железнодорожный вокзал в Днепре получили удары (13 погибших), в Чернигове погибли две девушки, США одобрили продажу Украине ракет Patriot на $2,1 млрд.",
      "en": "After a local humanitarian ceasefire, residents of occupied Oleshky were evacuated to Ukraine and reunited with their families; Russia's ombudsman announced the end of the mission and an agreement on regular humanitarian missions. At the same time Kyiv CHPP-6 and the railway station in Dnipro were struck (13 killed), two teenage girls died in Chernihiv, and the US approved a $2.1bn Patriot missile sale to Ukraine."
    },
    "why": {
      "ru": "Локальная гуманитарная деэскалация (Д3.5, Д8.2) не отменяет интенсивности ударов и внешних поставок (Д1.4, Д4.2, Д7.1) — вклад в индекс смешанный, поэтому уверенность средняя.",
      "en": "Local humanitarian de-escalation (D3.5, D8.2) does not offset strike intensity and external supplies (D1.4, D4.2, D7.1) — the contribution is mixed, hence medium confidence."
    },
    "contribution": "medium",
    "confidence": "medium",
    "sources": [
      {
        "id": "cbs-oleshky-evacuation",
        "title": {
          "ru": "Жителей оккупированного Россией города вывезли в Украину в ходе перемирия при посредничестве США",
          "en": "Ukrainians trapped in Russia-held city evacuate during local ceasefire"
        },
        "domain": "cbsnews.com",
        "url": "https://www.cbsnews.com/news/residents-evacuated-oleshky-arrive-ukraine-temporary-us-brokered-ceasefire/",
        "publication_date": "2026-11-01",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "sputnik-alyoshki-mission-end",
        "title": {
          "ru": "Гуманитарная миссия в Алёшках завершается — омбудсмен РФ",
          "en": "Humanitarian mission in Alyoshki coming to end — Russian ombudswoman"
        },
        "domain": "sputnikglobe.com",
        "url": "https://sputnikglobe.com/20261030/humanitarian-mission-in-alyoshki-coming-to-end---russian-ombudswoman-1124980382.html",
        "publication_date": "2026-10-30",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      },
      {
        "id": "sputnik-chpp6-strike",
        "title": {
          "ru": "Российские силы ударили по Киевской ТЭЦ-6, обеспечивавшей военную логистику",
          "en": "Russian forces hit Kiev CHPP-6 supplying energy to Ukrainian military logistics"
        },
        "domain": "sputnikglobe.com",
        "url": "https://sputnikglobe.com/20261031/russian-forces-hit-kiev-chpp-6-supplying-energy-to-ukrainian-military-logistics---mod-1124982131.html",
        "publication_date": "2026-10-31",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      },
      {
        "id": "un-news-dnipro-station",
        "title": {
          "ru": "Российский удар дроном по железнодорожному вокзалу в Украине: 13 погибших",
          "en": "Russia drone strike on Ukrainian railway station kills 13"
        },
        "domain": "news.un.org",
        "url": "https://news.un.org/feed/view/en/story/2026/10/1168702",
        "publication_date": "2026-10-29",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "aa-patriot-sale-ukraine",
        "title": {
          "ru": "США одобрили продажу Украине ракет Patriot на $2,1 млрд",
          "en": "US approves $2.1B Patriot missile sale to Ukraine"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/world/us-approves-21b-patriot-missile-sale-to-ukraine/4106902",
        "publication_date": "2026-10-30",
        "accessed_date": "2026-11-01",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      }
    ]
  }
];
  s.sources = [
  {
    "id": "aa-kremlin-trilateral-pause",
    "title": {
      "ru": "Кремль: подготовка трёхсторонних переговоров не требует паузы в боевых действиях",
      "en": "Kremlin says preparations for trilateral talks do not require pause to fighting"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/kremlin-says-preparations-for-trilateral-talks-do-not-require-pause-to-fighting/4106812",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-patriot-sale-ukraine",
    "title": {
      "ru": "США одобрили продажу Украине ракет Patriot на $2,1 млрд",
      "en": "US approves $2.1B Patriot missile sale to Ukraine"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/us-approves-21b-patriot-missile-sale-to-ukraine/4106902",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-us-japan-sk-arctic",
    "title": {
      "ru": "США, Япония и Южная Корея укрепили партнёрство и подписали соглашение об Арктике",
      "en": "US, Japan, South Korea strengthen partnership, sign Arctic cooperation agreement"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/us-japan-south-korea-strengthen-partnership-sign-arctic-cooperation-agreement/4107026",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-us-staff-leave-saudi",
    "title": {
      "ru": "США распорядились о выезде неэкстренного персонала из Саудовской Аравии на фоне атак хуситов",
      "en": "US orders non-emergency personnel to leave Saudi Arabia amid Houthi attacks"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/us-orders-non-emergency-personnel-to-leave-saudi-arabia-amid-houthi-attacks/4106888",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "abc-russia-moscow-attack",
    "title": {
      "ru": "Россия ответила на предупреждение США о готовящемся теракте в Москве",
      "en": "Russia responds to US warning of Moscow attack plan"
    },
    "domain": "abc.net.au",
    "url": "https://www.abc.net.au/news/2026-11-01/russia-responds-to-us-intelligence-moscow-terrorist-attack/107333516",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "africanews-chernihiv-strike",
    "title": {
      "ru": "Украина: российский удар в Чернигове убил двух девушек-подростков",
      "en": "Ukraine: Russian strike kills two teenage girls in Chernihiv"
    },
    "domain": "africanews.com",
    "url": "http://www.africanews.com/2026/10/30/ukraine-russian-strike-kills-two-teenage-girls-in-chernihiv/",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "africanews-cuba-embargo",
    "title": {
      "ru": "Кубинцы призывают снять эмбарго и надеются на улучшение жизни",
      "en": "Cubans call for lifting of embargo, express hope for better lives"
    },
    "domain": "africanews.com",
    "url": "http://www.africanews.com/2026/10/29/cubans-call-for-lifting-of-embargo-express-hope-for-better-lives/",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "africanews-ethiopia-drones",
    "title": {
      "ru": "Удары дронов в Эфиопии: не менее 25 погибших, по свидетельствам",
      "en": "Drone strikes in Ethiopia kill at least 25: witnesses"
    },
    "domain": "africanews.com",
    "url": "http://www.africanews.com/2026/10/31/drone-strikes-in-ethiopia-kill-at-least-25-witnesses/",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "africanews-ghana-nuclear",
    "title": {
      "ru": "Гана ведёт переговоры с Россией о первой АЭС",
      "en": "Ghana in talks with Russia for first nuclear power plant"
    },
    "domain": "africanews.com",
    "url": "http://www.africanews.com/2026/10/31/ghana-in-talks-with-russia-for-first-nuclear-power-plant/",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "africanews-haiti-salvadoran",
    "title": {
      "ru": "2 000 сальвадорских военных размещены на Гаити для борьбы с бандами",
      "en": "2,000 Salvadoran troops take quarters in Haiti to help fight gangs"
    },
    "domain": "africanews.com",
    "url": "http://www.africanews.com/2026/10/31/2000-salvadoran-troops-take-quarters-in-haiti-to-help-fight-gangs/",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "africanews-kenya-recruits",
    "title": {
      "ru": "Президент Руто требует компенсации для кенийцев, завербованных в российскую армию",
      "en": "President Ruto seeks compensation for Kenyans recruited into Russian military"
    },
    "domain": "africanews.com",
    "url": "http://www.africanews.com/2026/10/30/president-ruto-seeks-compensation-for-kenyans-recruited-into-russian-military/",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "africanews-rwanda-sanctions",
    "title": {
      "ru": "ДР Конго: санкции США против Руанды вызвали смешанную реакцию в Гоме",
      "en": "DRC: US sanctions on Rwanda draw mixed reactions in Goma"
    },
    "domain": "africanews.com",
    "url": "http://www.africanews.com/2026/10/29/drc-us-sanctions-on-rwanda-draw-mixed-reactions-in-goma/",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-erdogan-black-sea",
    "title": {
      "ru": "Эрдоган призвал Россию и Украину прекратить атаки в Чёрном море",
      "en": "Turkiye's Erdogan urges Russia and Ukraine to stop Black Sea attacks"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/31/turkiyes-erdogan-urges-russia-and-ukraine-to-stop-black-sea-attacks?traffic_source=rss",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-un-staffer-yemen",
    "title": {
      "ru": "ООН требует расследования гибели сотрудника в заключении хуситов в Йемене",
      "en": "UN demands investigation after staffer's death in Houthi custody in Yemen"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/11/1/un-demands-investigation-after-staffers-death-in-houthi-custody-in-yemen?traffic_source=rss",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "almonitor-black-sea-ceasefire",
    "title": {
      "ru": "США и Канада видят растущий интерес к ограниченному перемирию в Чёрном море",
      "en": "US, Canada see growing interest in limited ceasefire in Black Sea"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/10/us-canada-see-growing-interest-limited-ceasefire-black-sea",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "almonitor-coalition-drone-down",
    "title": {
      "ru": "Коалиция во главе с Саудовской Аравией сообщила об уничтожении беспилотника над Восточной провинцией",
      "en": "Saudi-led coalition says it downs drone over oil-rich Eastern Region"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/10/saudi-led-coalition-says-it-downs-drone-over-oil-rich-eastern-region",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "almonitor-qatari-mediators",
    "title": {
      "ru": "Иранские переговорщики встретились с катарскими посредниками на фоне угрозы ударов США",
      "en": "Iranian envoys meet Qatari mediators as threat looms of US strikes after midterms"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/10/iranian-envoys-meet-qatari-mediators-threat-looms-us-strikes-after-midterms",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "almonitor-quad-supply",
    "title": {
      "ru": "Министры Quad работают над цепочками поставок и осуждают произвольные экспортные ограничения",
      "en": "Indo-Pacific Quad ministers work on supply chains, denounce arbitrary export restrictions"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/10/indo-pacific-quad-ministers-work-supply-chains-denounce-arbitrary-export",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "almonitor-us-staff-leave",
    "title": {
      "ru": "США велели неэкстренным сотрудникам покинуть Саудовскую Аравию из-за рисков безопасности",
      "en": "US orders non-emergency staff to leave Saudi Arabia over security risks"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/10/us-orders-non-emergency-staff-leave-saudi-arabia-over-security-risks",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "balkaninsight-serbia-alert",
    "title": {
      "ru": "Сербия повысила уровень террористической угрозы после нападения на посольство Израиля",
      "en": "Serbia raises terror alert after attack on Israeli embassy"
    },
    "domain": "balkaninsight.com",
    "url": "https://balkaninsight.com/2026/10/28/serbia-raises-terror-alert-after-attack-on-israeli-embassy/bi/",
    "publication_date": "2026-10-28",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "breakingdefense-mecca-pact",
    "title": {
      "ru": "Вооружения Катара, арсенал дронов Турции и следующий тест Мекканского пакта",
      "en": "Qatar's domestic weapons, Turkey's drone arsenal and the Mecca pact's next test"
    },
    "domain": "breakingdefense.com",
    "url": "https://breakingdefense.com/2026/10/qatars-domestic-weapons-turkeys-drone-arsenal-and-the-mecca-pacts-next-test/",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "breakingdefense-taiwan-window",
    "title": {
      "ru": "Окно конфликта вокруг Тайваня в 2027 году остаётся актуальным — командующий армией США в Пацифике",
      "en": "Taiwan 2027 conflict window remains valid, Army Pacific commander says"
    },
    "domain": "breakingdefense.com",
    "url": "https://breakingdefense.com/2026/10/taiwan-2027-conflict-window-remains-valid-army-pacific-commander-says/",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "cbc-binance-hack",
    "title": {
      "ru": "Binance заявила о возмещении миллиардов после взлома, в котором ФБР винит КНДР",
      "en": "Binance says billions replaced from hack that FBI blames on North Korea"
    },
    "domain": "cbc.ca",
    "url": "https://www.cbc.ca/news/world/binance-hack-north-korea-9.7404502?cmp=rss",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "cbc-stocks-sink",
    "title": {
      "ru": "Североамериканские акции падают: Уолл-стрит пережила худший день с июня",
      "en": "North American stocks sink, Wall Street suffers worst day since June"
    },
    "domain": "cbc.ca",
    "url": "https://www.cbc.ca/news/business/tech-stocks-markets-oct-30-9.7403226?cmp=rss",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "cbs-oleshky-evacuation",
    "title": {
      "ru": "Жителей оккупированного Россией города вывезли в Украину в ходе перемирия при посредничестве США",
      "en": "Ukrainians trapped in Russia-held city evacuate during local ceasefire"
    },
    "domain": "cbsnews.com",
    "url": "https://www.cbsnews.com/news/residents-evacuated-oleshky-arrive-ukraine-temporary-us-brokered-ceasefire/",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "cnbc-binance-coverage",
    "title": {
      "ru": "Binance: 90 % потерь от взлома на $6,3 млрд покрыто, снятие средств возобновляется",
      "en": "Binance says 90% of $6.3 billion hack losses are now covered, plans to resume withdrawals"
    },
    "domain": "cnbc.com",
    "url": "https://www.cnbc.com/2026/10/31/binance-hack-asset-coverage-withdrawals.html",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "cnbc-i-bond-rate",
    "title": {
      "ru": "Минфин США объявил ставку Series I bond 5,51 % на полгода",
      "en": "Treasury Department announces new Series I bond rate of 5.51%"
    },
    "domain": "cnbc.com",
    "url": "https://www.cnbc.com/2026/10/30/treasury-i-bond-rate-through-april-2027.html",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "danas-hormuz-tanker-fire",
    "title": {
      "ru": "В Ормузском проливе горит танкер",
      "en": "Oil tanker on fire in the Strait of Hormuz"
    },
    "domain": "danas.rs",
    "url": "https://www.danas.rs/svet/gori-tanker-u-ormuskom-moreuzu/",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "dawn-khamenei-unrestricted",
    "title": {
      "ru": "Верховный лидер Ирана пригрозил США и Израилю «ответом без географических ограничений»",
      "en": "Iran's supreme leader warns US, Israel of 'unrestricted geographical response'"
    },
    "domain": "dawn.com",
    "url": "https://www.dawn.com/news/2041187/irans-supreme-leader-warns-us-israel-of-unrestricted-geographical-response-to-new-attacks",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "dawn-syria-mecca-pact",
    "title": {
      "ru": "Сирия рассматривает вступление в Мекканский пакт — глава МИД",
      "en": "Syria weighing whether to join Makkah pact: foreign minister"
    },
    "domain": "dawn.com",
    "url": "https://www.dawn.com/news/2041182/syria-weighing-whether-to-join-makkah-pact-foreign-minister",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "defensenews-black-sea-nations",
    "title": {
      "ru": "Черноморские страны НАТО осудили распространение войны на коммерческое судоходство",
      "en": "NATO's Black Sea nations decry Ukraine war spillover endangering commercial ship traffic"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/global/europe/2026/10/29/natos-black-sea-nations-decry-ukraine-war-spillover-endangering-commercial-ship-traffic/",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "defensenews-destinus",
    "title": {
      "ru": "Месячный выпуск Destinus превысил довоенное годовое производство крылатых ракет в Европе",
      "en": "Destinus monthly output tops Europe's pre-war annual cruise missile production"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/global/europe/2026/10/29/destinus-monthly-output-tops-europes-pre-war-annual-cruise-missile-production/",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "defensenews-ukraine-freyja",
    "title": {
      "ru": "Украина завершила работу над новой системой ПРО и ждёт европейских компонентов",
      "en": "Ukraine completes work on new missile defense system, awaits European partner components"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/global/europe/2026/10/30/ukraine-completes-work-on-new-missile-defense-system-awaits-european-partner-components/",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "france24-oleshky-evacuees",
    "title": {
      "ru": "Жители оккупированных Россией Олешек воссоединились с семьями после эвакуации",
      "en": "Residents from Russian-occupied Oleshky reunite with families after evacuation"
    },
    "domain": "france24.com",
    "url": "https://www.france24.com/en/europe/20261031-evacuees-from-russian-occupied-oleshky-arrive-in-ukraine",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "gcaptain-hormuz-economic-pain",
    "title": {
      "ru": "Удары по судоходству в Ормузе бьют по экономике обеих сторон",
      "en": "Shipping strikes in Hormuz leave both sides with economic pain"
    },
    "domain": "gcaptain.com",
    "url": "https://gcaptain.com/shipping-strikes-in-hormuz-leave-both-sides-with-economic-pain/",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "gcaptain-limpet-mines",
    "title": {
      "ru": "Танкер подорван на прикреплённых минах в Ормузском проливе: новая угроза судоходству",
      "en": "Tanker hit by limpet mines in Strait of Hormuz as new threat to shipping emerges"
    },
    "domain": "gcaptain.com",
    "url": "https://gcaptain.com/tanker-hit-by-limpet-mines-in-strait-of-hormuz-as-new-threat-to-shipping-emerges/",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "guardian-binance-hack",
    "title": {
      "ru": "Binance: 90 % потерь от взлома на $6,3 млрд покрыто, ФБР обвиняет КНДР",
      "en": "Binance says 90% of losses from $6.3bn hack covered as FBI says North Korea behind attack"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/business/2026/nov/01/binance-losses-covered-hack-fbi-north-korea-cryptocurrency",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "guardian-gulf-defence",
    "title": {
      "ru": "Страны Залива должны пересмотреть триллионные оборонные расходы из-за войны США и Ирана",
      "en": "Gulf states must rethink trillion-dollar defence in light of US-Iran war"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/30/gulf-states-rethink-trillion-dollar-defence-us-iran-war-iiss-report",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "guardian-nk-crypto-funding",
    "title": {
      "ru": "Как криптовзломы финансируют изолированную ядерную программу КНДР",
      "en": "How crypto hacking funds isolated North Korea nuclear programme"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/30/how-crypto-hacking-funds-isolated-north-korea-nuclear-programme",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "guardian-oleshky-reunite",
    "title": {
      "ru": "Эвакуированные из Олешек воссоединились с семьями после перемирия",
      "en": "Oleshky evacuees reunite with families after truce allows crossing back into Ukraine"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/31/oleshky-evacuees-reunite-with-families-after-truce-allows-crossing-into-ukraine",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "guardian-panahi-sentence",
    "title": {
      "ru": "Иранскому режиссёру Джафару Панахи вынесли новый тюремный приговор, активы арестованы",
      "en": "Iranian film-maker Jafar Panahi given new prison sentence"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/film/2026/oct/28/iran-film-maker-jafar-panahi-new-prison-sentence-assets-seized",
    "publication_date": "2026-10-28",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "guardian-uk-sanctions-sudan",
    "title": {
      "ru": "Великобритания ввела санкции против суданских военных за «кампанию насилия» в Эль-Фашире",
      "en": "UK sanctions Sudanese military leaders implicated in El Fasher campaign of rape"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/global-development/2026/oct/26/uk-sanctions-sudanese-military-leaders-implicated-in-el-fasher-campaign-of",
    "publication_date": "2026-10-26",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "guardian-vance-letter-iran",
    "title": {
      "ru": "Письмо Джей Ди Вэнса — последний шанс предотвратить новый конфликт США и Ирана",
      "en": "JD Vance letter may offer last chance to avert fresh conflict between US and Iran"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/29/jd-vance-letter-may-offer-last-chance-to-avert-fresh-conflict-between-us-and-iran",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "hindu-hormuz-tankers-mines",
    "title": {
      "ru": "Иран заявил, что несколько танкеров подорвались на минах и загорелись в Ормузском проливе",
      "en": "Iran says multiple oil tankers strike mines, catch fire in Strait of Hormuz"
    },
    "domain": "hindustantimes.com",
    "url": "https://www.hindustantimes.com/world-news/iran-says-multiple-oil-tankers-strike-mines-catch-fire-in-strait-of-hormuz-101793395035292.html",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "hindu-india-energy",
    "title": {
      "ru": "Индия осудила перебои в мировой энергетике из-за санкций и узких мест",
      "en": "India slams global energy disruptions through sanctions, chokepoints"
    },
    "domain": "hindustantimes.com",
    "url": "https://www.hindustantimes.com/world-news/us-news/india-slams-global-energy-disruptions-through-sanctions-chokepoints-101793402110619.html",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "hindu-iran-us-draft-proposal",
    "title": {
      "ru": "Передача урана и открытие Ормузского пролива: итоги ирано-американского проекта",
      "en": "Uranium transfer, Strait of Hormuz reopening: key takeaways from Iran-US draft proposal"
    },
    "domain": "hindustantimes.com",
    "url": "https://www.hindustantimes.com/world-news/uranium-transfer-strait-of-hormuz-reopening-key-takeaways-from-iran-us-draft-proposal-101793429781633.html",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "hindu-patriot-sale-ukraine",
    "title": {
      "ru": "США одобрили продажу Украине ракет Patriot на $2,1 млрд",
      "en": "US approves $2.1 billion Patriot missile sale to Ukraine"
    },
    "domain": "hindustantimes.com",
    "url": "https://www.hindustantimes.com/world-news/us-approves-2-1-billion-patriot-missile-sale-to-ukraine-101793412576155.html",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "hindu-rubio-iran-strikes",
    "title": {
      "ru": "Рубио: США пока не решили, наносить ли новые удары по Ирану",
      "en": "Rubio says U.S. yet to decide on new Iran strikes"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/rubio-says-us-yet-to-decide-on-new-iran-strikes/article71651951.ece",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "hindu-taiwan-shipping",
    "title": {
      "ru": "Тайвань заявил, что Китай препятствует судоходству патрулём у восточного побережья",
      "en": "Taiwan says China harassing shipping with east coast patrol"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/taiwan-says-china-harassing-shipping-with-east-coast-patrol/article71652011.ece",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "insjournal-greek-pm-truce",
    "title": {
      "ru": "Премьер Греции призвал к глобальному морскому перемирию после затопления судна",
      "en": "Greek PM calls for global maritime truce after Greek ship sunk in drone attack"
    },
    "domain": "insurancejournal.com",
    "url": "https://www.insurancejournal.com/news/international/2026/10/29/890791.htm",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "insjournal-greek-ship-sunk",
    "title": {
      "ru": "Греческое контейнерное судно затонуло после атаки дрона у Болгарии",
      "en": "Greek container ship sinks after drone attack off Bulgaria"
    },
    "domain": "insurancejournal.com",
    "url": "https://www.insurancejournal.com/news/international/2026/10/30/890853.htm",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "japantimes-denuclearization-vow",
    "title": {
      "ru": "США, Южная Корея и Япония обязались добиваться «полной» денуклеаризации КНДР",
      "en": "US, South Korea and Japan vow complete denuclearization of North Korea"
    },
    "domain": "japantimes.co.jp",
    "url": "https://www.japantimes.co.jp/news/2026/10/31/asia-pacific/politics/north-korea-denuclearization-vow/",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "japantimes-nk-cluster-bomb",
    "title": {
      "ru": "КНДР испытала кассетные боеголовки в рамках очередного «крупного» оружейного теста",
      "en": "North Korea tests cluster bomb warheads in latest major weapons test"
    },
    "domain": "japantimes.co.jp",
    "url": "https://www.japantimes.co.jp/news/2026/11/01/asia-pacific/north-korea-cluster-bomb-warhead/",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "jpost-iran-nuclear-ban-debate",
    "title": {
      "ru": "Иран обсуждает, сохранять ли запрет на ядерное оружие",
      "en": "Iran debating whether to maintain ban on nuclear weapons"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/iran-news/article-913416",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "jpost-trump-ten-minutes",
    "title": {
      "ru": "Трамп: США готовы ударить по ядерной программе Ирана «за десять минут»",
      "en": "Trump says US ready to hit Iran's nuclear program 'in ten minutes'"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/iran-news/article-913424",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "kommersant-brent-up",
    "title": {
      "ru": "Цена нефти Brent на бирже ICE растёт почти на 3 %",
      "en": "Brent crude price on ICE rises almost 3%"
    },
    "domain": "kommersant.ru",
    "url": "https://www.kommersant.ru/doc/9064282",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "mehrnews-doctrine-public-demand",
    "title": {
      "ru": "Пересмотр ядерной доктрины стал требованием народа",
      "en": "Revising nuclear doctrine has become people's demand"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/249032/Revising-nuclear-doctrine-has-become-people-s-demand",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "mehrnews-fishing-boats-qeshm",
    "title": {
      "ru": "США атаковали два иранских рыболовных судна у острова Кешм",
      "en": "US attacks 2 Iranian fishing boats off Masan, Qeshm Island"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/249049/US-attacks-2-Iranian-fishing-boats-off-Masan-Qeshm-Island",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "mehrnews-fourth-tanker",
    "title": {
      "ru": "Четвёртый танкер взорвался на мине в Ормузском проливе",
      "en": "Fourth tanker explodes after hitting mine in Hormuz Strait"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/249039/4th-violating-tanker-catches-fire-in-Hormuz-IRGC-Navy",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "mehrnews-iran-army-readiness",
    "title": {
      "ru": "Армия Ирана продолжает повышать боеготовность",
      "en": "Iran's army continues to enhance combat readiness: spox"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/249045/Iran-army-continues-to-enhance-combat-readiness-spox",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "mehrnews-irgc-two-tankers",
    "title": {
      "ru": "КСИР сообщил об остановке двух танкеров в Ормузском проливе",
      "en": "IRGC says two tankers halted in Hormuz Strait"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/249033/IRGC-says-two-tankers-halted-in-Hormuz-Strait",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "mehrnews-nuclear-doctrine-no-decision",
    "title": {
      "ru": "Серьёзного решения об изменении ядерной доктрины не принято",
      "en": "No serious decision made about change in nuclear doctrine"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/249058/No-serious-decision-made-about-change-in-nuclear-doctrine",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "mehrnews-response-no-limits",
    "title": {
      "ru": "Ответ на угрозы должен быть немедленным и без географических ограничений",
      "en": "Response to threats must be urgent, sans geographical limits"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/249048/Leader-s-message-in-meeting-with-senior-cmdrs-to-be-released",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "nbc-italy-troops",
    "title": {
      "ru": "Премьер Италии направляет войска на фоне общенациональных забастовок и блокад портов",
      "en": "Italy PM deploys troops as nation faces widespread strikes and port blockades"
    },
    "domain": "nbcnews.com",
    "url": "https://www.nbcnews.com/world/italy/italy-strikes-violent-protests-rome-colosseum-meloni-army-rome-milan-rcna606503",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "newsam-us-strikes-november",
    "title": {
      "ru": "Возможные удары США по Ирану в ноябре могут длиться несколько дней",
      "en": "Possible US strikes on Iran in November could last several days, media report"
    },
    "domain": "news.am",
    "url": "https://news.am/en/news/1071089",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "npr-binance-heist",
    "title": {
      "ru": "Простое объяснение крупнейшей кражи криптовалюты на $6,3 млрд у Binance",
      "en": "A simple explainer of the massive $6.3 billion crypto heist at Binance"
    },
    "domain": "npr.org",
    "url": "https://www.npr.org/2026/10/31/nx-s1-6024426/binance-crypto-heist-cyber-criminals-north-korea",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "ocmedia-prison-sentence",
    "title": {
      "ru": "Россиянин армянского происхождения приговорён почти к 10 годам сибирской колонии за комментарии в соцсетях",
      "en": "Russian-Armenian sentenced to almost 10 years in Siberian prison over social media comments"
    },
    "domain": "oc-media.org",
    "url": "https://oc-media.org/russian-armenian-sentenced-to-almost-10-years-in-siberian-prison-over-social-media-comments/",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "oilprice-brent-120",
    "title": {
      "ru": "Нефтетрейдеры готовятся к волатильной неделе: Brent приближается к $120",
      "en": "Oil traders brace for a wild week as Brent approaches $120"
    },
    "domain": "oilprice.com",
    "url": "https://oilprice.com/Energy/Oil-Prices/Oil-Traders-Brace-for-a-Wild-Week-as-Brent-Approaches-120.html",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "oilprice-gasoline-34",
    "title": {
      "ru": "Бензин подорожал на 34 %, топочный мазут — на 74 % перед промежуточными выборами",
      "en": "Gasoline up 34% and heating oil up 74% as voters head to the midterms"
    },
    "domain": "oilprice.com",
    "url": "https://oilprice.com/Energy/Gas-Prices/Gasoline-Up-34-and-Heating-Oil-Up-74-as-Voters-Head-to-the-Midterms.html",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "oilprice-refinery-rethink",
    "title": {
      "ru": "Европа всерьёз пересматривает сворачивание нефтепереработки",
      "en": "Europe is now seriously rethinking its oil refinery phase down"
    },
    "domain": "oilprice.com",
    "url": "https://oilprice.com/Energy/Crude-Oil/Europe-Is-Now-Seriously-Rethinking-Its-Oil-Refinery-Phase-Down.html",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "report-zelensky-trilateral",
    "title": {
      "ru": "Зеленский предложил провести трёхсторонние переговоры в Турции",
      "en": "Zelensky proposes holding trilateral talks in Turkiye"
    },
    "domain": "report.az",
    "url": "https://report.az/en/other-countries/zelensky-proposes-holding-trilateral-talks-in-turkiye",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "splash-runaway-tanker-rates",
    "title": {
      "ru": "Нефтяные мейджоры подсчитывают потери от вышедших из-под контроля ставок фрахта",
      "en": "Oil majors count the cost of runaway tanker rates"
    },
    "domain": "splash247.com",
    "url": "https://splash247.com/oil-majors-count-the-cost-of-runaway-tanker-rates/",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "sputnik-alyoshki-mission-end",
    "title": {
      "ru": "Гуманитарная миссия в Алёшках завершается — омбудсмен РФ",
      "en": "Humanitarian mission in Alyoshki coming to end — Russian ombudswoman"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261030/humanitarian-mission-in-alyoshki-coming-to-end---russian-ombudswoman-1124980382.html",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "sputnik-alyoshki-observed",
    "title": {
      "ru": "Перемирие в Алёшках полностью соблюдается, подтверждает омбудсмен РФ",
      "en": "Alyoshki ceasefire fully observed, Russian rights commissioner affirms"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261029/alyoshki-ceasefire-fully-observed--russian-rights-commissioner-1124972192.html",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "sputnik-black-sea-ship",
    "title": {
      "ru": "Россия ударила по судну со снабжением украинских сил в Чёрном море",
      "en": "Russia strikes ship with supplies to Ukrainian forces in Black Sea"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261029/russia-strikes-ship-with-supplies-to-ukrainian-forces-in-black-sea--mod-1124975973.html",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "sputnik-chpp6-strike",
    "title": {
      "ru": "Российские силы ударили по Киевской ТЭЦ-6, обеспечивавшей военную логистику",
      "en": "Russian forces hit Kiev CHPP-6 supplying energy to Ukrainian military logistics"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261031/russian-forces-hit-kiev-chpp-6-supplying-energy-to-ukrainian-military-logistics---mod-1124982131.html",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "sputnik-g20-sanctions",
    "title": {
      "ru": "Россия на G20 указала на санкции и заморозку активов как методы подрыва мировой торговли",
      "en": "Russia at G20 meeting flags sanctions and asset freezes among methods undermining global trade"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261031/russia-at-g20-meeting-flags-sanctions-and-asset-freezes-among-methods-undermining-global-trade---1124983335.html",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "sputnik-houthis-refineries",
    "title": {
      "ru": "Хуситы сообщили об ударах по нефтеперерабатывающим заводам и аэропортам Саудовской Аравии",
      "en": "Houthis report attacks on oil refineries, airports in Saudi Arabia"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261030/houthis-report-attacks-on-oil-refineries-airports-in-saudi-arabia-1124977367.html",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "sputnik-netanyahu-strike-prep",
    "title": {
      "ru": "Нетаньяху пытался приказать готовить удары по Ирану за три дня до выборов",
      "en": "Netanyahu sought to order preparations for strikes on Iran days before elections"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261027/netanyahu-sought-to-order-preparations-for-strikes-on-iran-days-before-elections---reports-1124952020.html",
    "publication_date": "2026-10-27",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "sputnik-trilateral-resume",
    "title": {
      "ru": "Кремль: трёхсторонние переговоры по Украине возобновятся после 4 ноября",
      "en": "Kremlin says trilateral talks on Ukraine to resume after November 4"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261029/kremlin-says-trilateral-talks-on-ukraine-to-resume-after-november-4-1124971137.html",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "sputnik-us-warns-region",
    "title": {
      "ru": "США предупредили страны Ближнего Востока о возможном возобновлении ударов по Ирану",
      "en": "US sounds alarm across Middle East over possible renewed strikes on Iran"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261029/us-warning-middle-east-countries-about-possible-resumption-of-strikes-on-iran---reports-1124971354.html",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "straits-crypto-defences",
    "title": {
      "ru": "Криптобиржи призывают срочно усилить защиту после кражи у Binance",
      "en": "Crypto exchanges call for quick moves to bolster defences after Binance heist"
    },
    "domain": "straitstimes.com",
    "url": "https://www.straitstimes.com/world/united-states/crypto-exchanges-call-for-quick-moves-to-bolster-defences-after-binance-heist",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "straits-fbi-binance",
    "title": {
      "ru": "ФБР обвинило КНДР в краже $6 млрд у Binance",
      "en": "FBI blames North Korea for US$6 billion Binance crypto hack"
    },
    "domain": "straitstimes.com",
    "url": "https://www.straitstimes.com/world/united-states/fbi-blames-north-korea-for-us6-billion-binance-crypto-hack",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "straits-fsb-us-warning",
    "title": {
      "ru": "ФСБ: США предупредили Россию о возможном теракте в Москве",
      "en": "FSB says US warned Russia of possible Moscow attack"
    },
    "domain": "straitstimes.com",
    "url": "https://www.straitstimes.com/world/europe/fsb-says-us-warned-russia-of-possible-moscow-attack",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "straits-oleshky-grass",
    "title": {
      "ru": "Вынужденные есть траву: эвакуированные из Олешек назвали перемирие «благословением»",
      "en": "Forced to eat grass, Oleshky evacuees say Russia-Ukraine truce was a blessing"
    },
    "domain": "straitstimes.com",
    "url": "https://www.straitstimes.com/world/europe/forced-to-eat-grass-oleshky-evacuees-say-russia-ukraine-truce-was-a-blessing",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "straits-oman-rescue",
    "title": {
      "ru": "Оман спас 25 человек с горящего судна; Иран остановил танкеры",
      "en": "Oman rescues 25 from burning ship, Iran halts tankers"
    },
    "domain": "straitstimes.com",
    "url": "https://www.straitstimes.com/world/middle-east/oman-rescues-25-from-burning-ship-iran-halts-tankers",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-cargo-ship-odessa",
    "title": {
      "ru": "Российские силы поразили грузовое судно в 37 км южнее Одессы",
      "en": "Russian forces hit cargo ship 37 km south of Odessa — Defense Ministry"
    },
    "domain": "tass.com",
    "url": "https://tass.com/defense/2211383",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-fbi-north-korea-binance",
    "title": {
      "ru": "ФБР обвинило КНДР во взломе криптобиржи Binance",
      "en": "FBI accuses North Korea of hacking Binance crypto exchange"
    },
    "domain": "tass.com",
    "url": "https://tass.com/economy/2211451",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-fsb-us-warning",
    "title": {
      "ru": "США предупредили Россию о готовящемся теракте в Москве — ФСБ",
      "en": "US warns Russia of planned terrorist attack in Moscow — FSB"
    },
    "domain": "tass.com",
    "url": "https://tass.com/politics/2211387",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-iran-delegation-doha",
    "title": {
      "ru": "Иранская делегация прибыла в Доху для обсуждения ядерных предложений",
      "en": "Iranian delegation arrives in Doha to discuss nuclear proposals"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2211371",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-iran-geo-unrestricted",
    "title": {
      "ru": "Иран ответит на любую угрозу без географических ограничений — верховный лидер",
      "en": "Iran to respond to any threat regardless of geographical restrictions"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2211365",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-iran-hormuz-two-days",
    "title": {
      "ru": "Иран согласен открыть Ормузский пролив в течение двух дней при сделке с США",
      "en": "Iran agrees to reopen Strait of Hormuz within two days if deal reached with US"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2211373",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-iran-npt-committed",
    "title": {
      "ru": "Иран остаётся привержен Договору о нераспространении — глава МИД",
      "en": "Iran remains committed to Nuclear Non-Proliferation Treaty — foreign minister"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2211381",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-iran-npt-withdraw",
    "title": {
      "ru": "Иран может выйти из ДНЯО при возобновлении войны",
      "en": "Iran may withdraw from NPT if war resumes — security council secretary"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2211423",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-iran-us-forces-condition",
    "title": {
      "ru": "Иран требует сокращения военного присутствия США в регионе как условия урегулирования",
      "en": "Iran demands reduction in US forces in region as condition for settlement"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2211377",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-logistics-energy-strike",
    "title": {
      "ru": "Российские силы ударили по логистике и энергетике украинской армии",
      "en": "Russian forces strike Ukrainian army's logistics, energy infrastructure facilities"
    },
    "domain": "tass.com",
    "url": "https://tass.com/defense/2211325",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-nk-yield-test",
    "title": {
      "ru": "КНДР провела испытание для оценки мощности оружейной системы",
      "en": "North Korea held test to assess weapon system yield"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2211447",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-regular-humanitarian-missions",
    "title": {
      "ru": "Достигнута договорённость о регулярных гуманитарных миссиях — омбудсмен РФ",
      "en": "Agreement reached on regular humanitarian missions — Russian ombudswoman"
    },
    "domain": "tass.com",
    "url": "https://tass.com/society/2211421",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-turkey-grain-proposals",
    "title": {
      "ru": "Турция передала США предложения по черноморскому судоходству — Рубио",
      "en": "Turkey submits Black Sea grain shipping proposals to US — Rubio"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2211399",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-vessel-cyprus",
    "title": {
      "ru": "Танзанийское торговое судно затонуло у берегов Кипра",
      "en": "Tanzanian-flagged merchant vessel sunk off the coast of Cyprus"
    },
    "domain": "tass.com",
    "url": "https://tass.com/emergencies/2211441",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-zelensky-power-supply",
    "title": {
      "ru": "Украина столкнулась со сложной ситуацией с энергоснабжением — Зеленский",
      "en": "Ukraine faces complicated situation with power supplies, says Zelensky"
    },
    "domain": "tass.com",
    "url": "https://tass.com/economy/2211361",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tehrantimes-274-structures",
    "title": {
      "ru": "Иранские удары повредили 274 объекта на 24 связанных с США военных базах",
      "en": "Iranian strikes damage 274 structures at 24 US-linked military sites"
    },
    "domain": "tehrantimes.com",
    "url": "https://www.tehrantimes.com/news/531697/Iranian-strikes-damage-274-structures-at-24-US-linked-military",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tehrantimes-army-warns-us",
    "title": {
      "ru": "Иранская армия предупредила США о риске расширения войны",
      "en": "Iranian army warns US against renewed military adventurism, says war could spread"
    },
    "domain": "tehrantimes.com",
    "url": "https://www.tehrantimes.com/news/531694/Iranian-army-warns-US-against-renewed-military-adventurism",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "twz-carriers-oct27",
    "title": {
      "ru": "Где авианосцы: 27 октября 2026 года",
      "en": "Where are the aircraft carriers: October 27, 2026"
    },
    "domain": "twz.com",
    "url": "https://www.twz.com/sea/where-are-the-aircraft-carriers-october-27-2026",
    "publication_date": "2026-10-27",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "twz-ethiopia-su35",
    "title": {
      "ru": "Эфиопия получает 12 российских Су-35 и присматривается к С-400",
      "en": "Ethiopia gets 12 Russian Su-35 fighters, eyes S-400 air defenses"
    },
    "domain": "twz.com",
    "url": "https://www.twz.com/air/ethiopia-gets-12-russian-su-35-fighters-eyes-s-400-air-defenses",
    "publication_date": "2026-10-28",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "twz-japan-amraam",
    "title": {
      "ru": "Япония будет собирать ракеты AMRAAM на фоне резкого роста производства AIM-120 в США",
      "en": "Japan to assemble AMRAAM missiles as U.S. moves to dramatically boost AIM-120 production"
    },
    "domain": "twz.com",
    "url": "https://www.twz.com/air/japan-to-assemble-amraam-missiles-as-u-s-moves-to-dramatically-boost-aim-120-production",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "twz-limpet-mine-hormuz",
    "title": {
      "ru": "Иран применил мину, закреплённую на корпусе судна, в очередной атаке в Ормузском проливе",
      "en": "Iran used limpet mine placed on ship hull in latest Strait of Hormuz attack"
    },
    "domain": "twz.com",
    "url": "https://www.twz.com/news-features/iran-used-limpet-mine-placed-on-ships-hull-in-latest-strait-of-hormuz-attack-report",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "twz-mar-a-lago-sam",
    "title": {
      "ru": "ЗРК развёрнуты для защиты поместья Трампа Мар-а-Лаго",
      "en": "Surface-to-air missiles deployed to protect Trump Mar-a-Lago estate"
    },
    "domain": "twz.com",
    "url": "https://www.twz.com/land/avenger-assemble-surface-to-air-missiles-deployed-to-protect-trumps-mar-a-lago-estate",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "twz-nk-drones",
    "title": {
      "ru": "Главное с «парада дронов» КНДР",
      "en": "Highlights from North Korea drone-a-palooza"
    },
    "domain": "twz.com",
    "url": "https://www.twz.com/air/highlights-from-north-koreas-drone-a-palooza",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "twz-polish-mig29",
    "title": {
      "ru": "Польские МиГ-29 и боеприпасы для F-16, как сообщается, направлены в Украину",
      "en": "Polish MiG-29s, F-16 cannon ammo reportedly headed to Ukraine"
    },
    "domain": "twz.com",
    "url": "https://www.twz.com/news-features/polish-mig-29s-f-16-cannon-ammo-reportedly-headed-to-ukraine-as-bitter-warsaw-kyiv-rift-heals",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "un-news-dnipro-station",
    "title": {
      "ru": "Российский удар дроном по железнодорожному вокзалу в Украине: 13 погибших",
      "en": "Russia drone strike on Ukrainian railway station kills 13"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/10/1168702",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "un-news-iaea-iran-inspectors",
    "title": {
      "ru": "ООН: «безопасного места в Украине нет», МАГАТЭ призывает вернуть инспекторов в Иран",
      "en": "World News in Brief: No safe place in Ukraine, IAEA calls for Iran nuclear inspections"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/10/1168682",
    "publication_date": "2026-10-27",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "un-news-oleshky-hope",
    "title": {
      "ru": "ООН: перемирие в Олешках даёт «надежду» гражданским при продолжении атак в других районах",
      "en": "Ukraine: Oleshky ceasefire offers hope for civilians as attacks on other areas continue"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/10/1168712",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "un-news-sudan-el-obeid",
    "title": {
      "ru": "Жители Эль-Обейда в Судане зажаты между дронами и арестами",
      "en": "Civilians in Sudan's El Obeid trapped between drones and incarceration"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/10/1168696",
    "publication_date": "2026-10-28",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "un-news-sudan-market",
    "title": {
      "ru": "ООН: пять детей погибли при ударе дрона по рынку в Ньяле, Судан",
      "en": "World News in Brief: 5 children killed in Sudan, Haiti hunger emergency, Yemen war update"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/10/1168703",
    "publication_date": "2026-10-29",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "un-news-yemen-access",
    "title": {
      "ru": "Война в Йемене делает доставку помощи слишком опасной для многих",
      "en": "Yemen war makes reaching assistance too dangerous for many"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/10/1168706",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "yna-diplomats-nk-call",
    "title": {
      "ru": "Южная Корея, США и Япония обсудили последние пуски КНДР по телефону",
      "en": "S. Korea, U.S., Japan discuss N. Korea latest missile launches by phone"
    },
    "domain": "en.yna.co.kr",
    "url": "https://en.yna.co.kr/view/AEN20261030008100315",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "yna-nk-cluster-bomb",
    "title": {
      "ru": "КНДР испытала кассетную боеголовку для тактических баллистических ракет",
      "en": "N. Korea tests cluster bomb mountable on tactical ballistic missiles"
    },
    "domain": "en.yna.co.kr",
    "url": "https://en.yna.co.kr/view/AEN20261101000451315",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "yna-nk-slams-sanctions",
    "title": {
      "ru": "КНДР назвала «стратегическим» многостороннее заявление в поддержку санкций",
      "en": "N. Korea slams multination statement backing anti-Pyongyang sanctions"
    },
    "domain": "en.yna.co.kr",
    "url": "https://en.yna.co.kr/view/AEN20261031001300315",
    "publication_date": "2026-10-31",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "cna-dprk-weapon-system",
    "title": {
      "ru": "КНДР: оборонные НИИ провели испытание «крупной системы вооружений»",
      "en": "North Korea says defence research institutes tested major weapon system"
    },
    "domain": "channelnewsasia.com",
    "url": "https://www.channelnewsasia.com/east-asia/north-korea-pyongyang-defence-institutes-test-major-weapon-system-6510466",
    "publication_date": "2026-11-01",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "defensenews-pentagon-cool-rhetoric",
    "title": {
      "ru": "Пентагон призвал европейцев сбавить риторику в отношении России (источники)",
      "en": "Pentagon tells Europeans to cool their rhetoric on Russia, sources say"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/global/europe/2026/10/30/pentagon-tells-europeans-to-cool-their-rhetoric-on-russia-sources-say/",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "kp-pentagon-baltic-rhetoric",
    "title": {
      "ru": "«Заткните рты про войну с Россией»: США потребовали от прибалтов помолчать",
      "en": "US demands Baltics tone down war rhetoric with Russia"
    },
    "domain": "kp.ru",
    "url": "https://www.kp.ru/daily/277829.5/5322467/?from=twall",
    "publication_date": "2026-10-30",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "twz-stargate-medevac",
    "title": {
      "ru": "Украинский дрон StarGate начал эвакуировать раненых военных",
      "en": "Ukraine's StarGate drone now evacuating wounded soldiers"
    },
    "domain": "twz.com",
    "url": "https://www.twz.com/air/ukraines-stargate-drone-now-evacuating-wounded-soldiers",
    "publication_date": "2026-10-27",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "defenceua-heavy-medevac-drones",
    "title": {
      "ru": "Украина разрабатывает тяжёлые дроны, способные эвакуировать раненых без GPS",
      "en": "Ukraine develops heavy drones that can evacuate wounded soldiers without GPS"
    },
    "domain": "en.defence-ua.com",
    "url": "https://en.defence-ua.com/news/ukraine_develops_heavy_drones_that_can_evacuate_wounded_soldiers_without_gps-20244.html",
    "publication_date": "2026-10-27",
    "accessed_date": "2026-11-01",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "united24-stargate-casevac",
    "title": {
      "ru": "Украинские военные за неделю дважды вывезли раненых по воздуху дроном StarGate CASEVAC",
      "en": "Ukrainian troops evacuate two wounded soldiers by air with StarGate CASEVAC drone in one week"
    },
    "domain": "united24media.com",
    "url": "https://united24media.com/war-in-ukraine/ukrainian-troops-evacuate-two-wounded-soldiers-by-air-with-stargate-casevac-drone-in-one-week-23817",
    "publication_date": "2026-10-26",
    "accessed_date": "2026-11-01",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "govuk-warsaw-defence-plan",
    "title": {
      "ru": "Британия и Польша укрепляют оборону восточного фланга Европы: Варшавский оборонный план",
      "en": "UK and Poland strengthen defences on Europe's Eastern flank: Warsaw Defence Plan"
    },
    "domain": "gov.uk",
    "url": "https://www.gov.uk/government/news/uk-and-poland-strengthen-defences-on-europes-eastern-flank--2",
    "publication_date": "2026-10-27",
    "accessed_date": "2026-11-01",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": true,
    "origin": "collected-in-week"
  }
];
  s.countries = {
  "total": 152,
  "published": 2,
  "rows": {
    "RU": {
      "index": 71,
      "delta": 5,
      "background": false,
      "region": "russia-belarus",
      "signals": 6,
      "name": {
        "ru": "Россия",
        "en": "Russia"
      }
    },
    "UA": {
      "index": 71,
      "delta": 3,
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
})();
