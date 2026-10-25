window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
  s.drivers = [
  {
    "label": {
      "ru": "Вашингтон и Тегеран на пороге удара, Ормуз перекрыт",
      "en": "Washington and Tehran on the brink of a strike, Hormuz blocked"
    },
    "observation": {
      "ru": "США и Иран на пороге нового удара: Вашингтон перебрасывает боевые корабли, Тегеран обещает «апокалиптическую войну», Ормузский пролив остаётся перекрытым, а часть американских дипломатов и членов семей вывезена с Ближнего Востока. Трамп говорит о ударе «завтра» или «большой красивой» сделке; Иран предлагает открыть Ормуз в обмен на снятие морской блокады.",
      "en": "The US and Iran stand on the threshold of a new strike: Washington is sending more warships, Tehran promises an \"apocalyptic war\", the Strait of Hormuz remains blocked, and some US diplomats and families have been withdrawn from the Middle East. Trump speaks of a strike \"tomorrow\" or a \"big, beautiful\" deal; Iran offers to reopen Hormuz in exchange for lifting the naval blockade."
    },
    "why": {
      "ru": "Одновременные военные приготовления, блокада торгового пути и угрозы необратимой эскалации в одном недельном окне дают самый сильный сигнал по драйверам Д1, Д3, Д4 и Д5.",
      "en": "Simultaneous military preparations, a blockade of a trade route and threats of irreversible escalation within one week produce the strongest signal across drivers D1, D3, D4 and D5."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "aa-trump-iran-deal-1024",
        "title": {
          "ru": "Трамп: США могут ударить по Ирану «завтра» или заключить «большую красивую» сделку",
          "en": "Trump says US could strike Iran 'tomorrow' or reach 'big, beautiful' deal"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/world/trump-says-us-could-strike-iran-tomorrow-or-reach-big-beautiful-deal/4099883",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "aa-warships-mideast-1024",
        "title": {
          "ru": "Трамп взвешивает новые удары по Ирану; США направляют в регион дополнительные боевые корабли",
          "en": "Trump weighs new Iran strikes as US sends more warships to Middle East: Report"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/americas/trump-weighs-new-iran-strikes-as-us-sends-more-warships-to-middle-east-report/4099840",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "cbs-iran-war-live-1025",
        "title": {
          "ru": "Хроника войны с Ираном: приказ дипломатам покинуть посты, предупреждение Ирана о Заливе, морская блокада",
          "en": "Iran war live updates: diplomats ordered to leave Middle East posts, Iran warns on Gulf, naval blockade"
        },
        "domain": "cbsnews.com",
        "url": "https://www.cbsnews.com/live-updates/iran-war-trump-us-oil-gas-prices-strait-of-hormuz-midterms/",
        "publication_date": "2026-10-25",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "tass-hormuz-proposal-1024",
        "title": {
          "ru": "Иран предлагает открыть Ормузский пролив в обмен на снятие морской блокады США",
          "en": "Iran proposes reopening Hormuz in exchange for US lifting its blockade"
        },
        "domain": "tass.com",
        "url": "https://tass.com/world/2207343",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "mehr-irgc-apocalyptic-1024",
        "title": {
          "ru": "КСИР предупреждает об «апокалиптической войне», которая выйдет за пределы Ирана",
          "en": "IRGC warns 'apocalyptic war' will reverberate beyond Iran"
        },
        "domain": "en.mehrnews.com",
        "url": "https://en.mehrnews.com/news/248863/IRGC-warns-apocalyptic-war-will-reverberate-beyond-Iran",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      }
    ]
  },
  {
    "label": {
      "ru": "Йеменская война бьёт по аэропортам и нефти Саудовской Аравии",
      "en": "Yemen's war hits Saudi airports and Saudi oil"
    },
    "observation": {
      "ru": "Йеменская война вышла за пределы страны: хуситы заявили об ударах по трём саудовским аэропортам, нефтяным объектам и трубопроводу, ракеты сбиты над Эр-Риядом, Таифом и Янбу; Саудовская коалиция бьёт по Сане и Ходейде, в осаждённом Таизе заканчивается вода.",
      "en": "The Yemen war has spilled across borders: the Houthis claim strikes on three Saudi airports, oil facilities and a pipeline, missiles were intercepted over Riyadh, Taif and Yanbu; the Saudi-led coalition strikes Sanaa and Hodeidah, and water is running out in besieged Taiz."
    },
    "why": {
      "ru": "Удары по энергетике и аэропортам третьей страны расширяют географию конфликта (Д7.2) и повышают риск перебоев поставок (Д4.3, Д4.6).",
      "en": "Strikes on energy assets and airports of a third country widen the conflict geography (D7.2) and raise supply-disruption risk (D4.3, D4.6)."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "aa-houthis-airports-1024",
        "title": {
          "ru": "Хуситы заявили об ударах ракетами и дронами по аэропортам и нефтяным объектам Саудовской Аравии",
          "en": "Houthis claim to have struck Saudi airports, oil facilities with missiles, drones"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/middle-east/houthis-claim-to-have-struck-saudi-airports-oil-facilities-with-missiles-drones/4099758",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "aa-saudi-missiles-1024",
        "title": {
          "ru": "Коалиция Саудовской Аравии перехватила две баллистические ракеты хуситов по Таифу и Янбу",
          "en": "Saudi-led coalition says it intercepted 2 Houthi ballistic missiles targeting Saudi cities"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/middle-east/saudi-led-coalition-says-it-intercepted-2-houthi-ballistic-missiles-targeting-saudi-cities/4099364",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "aj-houthis-aden-1024",
        "title": {
          "ru": "Хуситы атаковали Саудовскую Аравию и йеменский Аден",
          "en": "Houthis launch attacks on Saudi Arabia and Yemen's Aden"
        },
        "domain": "aljazeera.com",
        "url": "https://www.aljazeera.com/news/2026/10/24/houthis-launch-attacks-on-saudi-arabia-and-yemens-aden",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "un-taiz-aid-1023",
        "title": {
          "ru": "Йемен: помощь не пропускают в осаждённый город Таиз",
          "en": "Yemen: Deepening concerns for Taiz City as aid is blocked from entering"
        },
        "domain": "news.un.org",
        "url": "https://news.un.org/feed/view/en/story/2026/10/1168654",
        "publication_date": "2026-10-23",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "cbs-iran-war-live-1025",
        "title": {
          "ru": "Хроника войны с Ираном: приказ дипломатам покинуть посты, предупреждение Ирана о Заливе, морская блокада",
          "en": "Iran war live updates: diplomats ordered to leave Middle East posts, Iran warns on Gulf, naval blockade"
        },
        "domain": "cbsnews.com",
        "url": "https://www.cbsnews.com/live-updates/iran-war-trump-us-oil-gas-prices-strait-of-hormuz-midterms/",
        "publication_date": "2026-10-25",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  },
  {
    "label": {
      "ru": "Олешки: гуманитарное перемирие согласовано, но фронт не стих",
      "en": "Oleshky: a humanitarian ceasefire agreed, but the front has not calmed"
    },
    "observation": {
      "ru": "Россия и Украина согласовали локальное гуманитарное перемирие в Олешках (вступает в силу 27 октября) при посредничестве США, но на фронте — массированные удары: Белгород, Орёл, Омск, 1 297 сбитых дронов за сутки; SpaceX ограничивала скорость Starshield для Украины и восстановила её после контактов на высоком уровне.",
      "en": "Russia and Ukraine agreed a local humanitarian ceasefire in Oleshky (effective 27 October) with US mediation, while the front saw massive strikes: Belgorod, Oryol, Omsk, 1,297 drones downed in 24 hours; SpaceX throttled Starshield speeds for Ukraine and restored them after high-level contacts."
    },
    "why": {
      "ru": "Локальное перемирие — редкий деэскалационный сигнал (Д8.2), но интенсивность боёв и зависимость от коммерческой спутниковой связи держат эскалацию (Д1.4, Д7.4, Д9.3).",
      "en": "The local ceasefire is a rare de-escalatory signal (D8.2), but combat intensity and dependence on commercial satellite communications keep escalation high (D1.4, D7.4, D9.3)."
    },
    "contribution": "high",
    "confidence": "medium",
    "sources": [
      {
        "id": "cbs-melania-ceasefire-1023",
        "title": {
          "ru": "Мелания Трамп добилась временного перемирия в Олешках",
          "en": "Melania Trump helps secure temporary ceasefire between Russia and Ukraine in Oleshky"
        },
        "domain": "cbsnews.com",
        "url": "https://www.cbsnews.com/news/first-lady-melania-trump-temporary-ceasefire-russia-ukraine-oleshky/",
        "publication_date": "2026-10-23",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "aa-zelensky-oleshky-1024",
        "title": {
          "ru": "Зеленский: Украина соблюдает перемирие в Олешках и рассчитывает на посредничество США",
          "en": "Zelenskyy says Ukraine will honor Oleshky ceasefire, counts on US mediation to work"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/politics/zelenskyy-says-ukraine-will-honor-oleshky-ceasefire-counts-on-us-mediation-to-work/4099683",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "hindu-ceasefire-oct27-1024",
        "title": {
          "ru": "Локальное гуманитарное перемирие с Россией начнётся 27 октября, заявил переговорщик",
          "en": "Local humanitarian ceasefire with Russia will start on October 27, says negotiator"
        },
        "domain": "thehindu.com",
        "url": "https://www.thehindu.com/news/international/local-humanitarian-ceasefire-with-russia-will-start-on-october-27-says-negotiator/article71618931.ece",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "tass-belgorod-1024",
        "title": {
          "ru": "Белгород понёс значительный ущерб и потери после массированного удара ВСУ",
          "en": "Belgorod faces significant damage, casualties following massive Ukrainian strike"
        },
        "domain": "tass.com",
        "url": "https://tass.com/politics/2207373",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "cbs-musk-starlink-1024",
        "title": {
          "ru": "Маск: SpaceX ограничивала скорость Starlink для Украины из-за ударов дронами",
          "en": "Elon Musk says SpaceX throttled Ukraine Starlink speeds over drone strikes"
        },
        "domain": "cbsnews.com",
        "url": "https://www.cbsnews.com/news/ukraine-starlink-drone-spacex-musk-speed-restriction/",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  }
];
})();
