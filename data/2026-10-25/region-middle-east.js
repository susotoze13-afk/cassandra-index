window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
  s.regions["middle-east"] = {
  "index": 79,
  "delta": 10,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "США и Иран на пороге нового удара: Вашингтон направляет дополнительные боевые корабли и вывозит часть дипломатов, Трамп говорит об ударе «завтра» или сделке, Иран обещает ответ «в несколько раз больше» и угрожает ядерной эскалацией; Ормуз перекрыт.",
        "en": "The US and Iran are on the threshold of a new strike: Washington sends more warships and withdraws some diplomats, Trump speaks of a strike \"tomorrow\" or a deal, Iran promises a response \"several times greater\" and threatens nuclear escalation; Hormuz is blocked."
      },
      "why": {
        "ru": "Совпадение военных приготовлений, блокады и взаимных ультиматумов — максимальный сигнал по Д1, Д3 и Д5.",
        "en": "The coincidence of military preparations, blockade and mutual ultimatums is the maximum signal across D1, D3 and D5."
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
          "id": "aa-iran-response-greater-1024",
          "title": {
            "ru": "Иран обещает ответ, «в несколько раз больший» любого военного действия",
            "en": "Iran warns of response 'several times greater' to any military action"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/iran-warns-of-response-several-times-greater-to-any-military-action/4099668",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Йемен и Хеврон: хуситы бьют по аэропортам и нефтяным объектам Саудовской Аравии, ракеты сбиты над Эр-Риядом, Таифом и Янбу; в Хевроне Израиль выселил 2 000 палестинцев и начал снос кварталов после гибели двух солдат.",
        "en": "Yemen and Hebron: the Houthis strike Saudi airports and oil facilities, missiles intercepted over Riyadh, Taif and Yanbu; in Hebron Israel displaced 2,000 Palestinians and began demolitions after two soldiers were killed."
      },
      "why": {
        "ru": "Два независимых фронта — йеменский и западно-бережный — расширяют географию и удержание конфликта.",
        "en": "Two independent fronts — Yemeni and West Bank — widen the geography and duration of the conflict."
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
          "id": "aa-hebron-2000-1025",
          "title": {
            "ru": "Министр обороны Израиля признал, что 2 000 палестинцев выселены из домов в Хевроне",
            "en": "Israeli defense minister admits having forced 2,000 Palestinians from homes in Hebron"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/israeli-defense-minister-admits-having-forced-2-000-palestinians-from-homes-in-west-bank-city-of-hebron/4099926",
          "publication_date": "2026-10-25",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "guardian-hebron-1023",
          "title": {
            "ru": "Израиль начал кампанию коллективного наказания в Хевроне после гибели двух солдат",
            "en": "Israel launches collective punishment campaign in Hebron after two soldiers killed"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/oct/23/netanyahu-orders-very-extensive-operation-west-bank-two-israeli-soldiers-killed",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
