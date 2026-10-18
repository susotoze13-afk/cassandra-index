window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.regions["balkans"] = {
  "index": 61,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "ЕС принял крупнейший пакет санкций против России, добавив 1 569 записей в военный чёрный список; США ввели новый раунд санкций против связанных с Ираном сетей.",
        "en": "The EU adopted its largest sanctions package on Russia, adding 1,569 entries to the military blacklist, while the US imposed a new round of sanctions on Iran-linked networks."
      },
      "why": {
        "ru": "Ужесточение санкционного режима повышает чувствительность балканских экономик к внешним ограничениям.",
        "en": "A tighter sanctions regime increases the sensitivity of Balkan economies to external restrictions."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "brusselstimes-eu-sanctions-1569-2026-10-12",
          "title": {
            "ru": "Крупнейший пакет санкций ЕС: 1 569 записей в военном чёрном списке России",
            "en": "Largest EU sanctions package yet adds 1,569 to Russia military blacklist"
          },
          "domain": "brusselstimes.com",
          "url": "https://www.brusselstimes.com/2357495/largest-eu-sanctions-package-yet-adds-1569-to-russia-military-blacklist",
          "publication_date": "2026-10-12",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "safety4sea-eu-sanctions-russia-2026-10-13",
          "title": {
            "ru": "ЕС принял крупнейший в истории пакет санкций против России",
            "en": "EU adopts largest-ever sanctions package targeting Russia"
          },
          "domain": "safety4sea.com",
          "url": "https://safety4sea.com/eu-adopts-largest-ever-sanctions-package-targeting-russia/",
          "publication_date": "2026-10-13",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Нефтяной шок: Brent впервые с мая превысил $110, US crude — выше $100 на фоне рисков Ормузского пролива, Саудовской Аравии и России.",
        "en": "Oil shock: Brent topped $110 for the first time since May and US crude rose above $100 amid Hormuz, Saudi and Russia risks."
      },
      "why": {
        "ru": "Рост цен на энергоносители ухудшает внешнеторговый баланс и повышает социальную напряжённость в регионе.",
        "en": "Higher energy prices worsen the trade balance and raise social tension in the region."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "cnbctv18-brent-110-explained-2026-10-16",
          "title": {
            "ru": "Объяснение: почему Brent впервые превысил $110",
            "en": "Explained: What led to Brent crude prices crossing $110 for the first time"
          },
          "domain": "cnbctv18.com",
          "url": "https://www.cnbctv18.com/market/commodities/crude-oil-prices-brent-wti-why-are-rates-rising-explained-saudi-houthis-hormuz-iran-us-russia-ukraine-20013997.htm",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        },
        {
          "id": "discoveryalert-brent-110-2026-10-17",
          "title": {
            "ru": "Нефть Brent достигла $110: риски Ормуза, Саудовской Аравии и России накапливаются",
            "en": "Brent Oil Price Hits $110 as Hormuz, Saudi and Russia Risks Stack Up"
          },
          "domain": "discoveryalert.com",
          "url": "https://discoveryalert.com/news/brent-oil-price-110-hormuz-saudi-russia-october-2026/",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
