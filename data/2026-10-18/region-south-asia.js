window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.regions["south-asia"] = {
  "index": 58,
  "delta": 4,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "США и Индия завершили первую фазу торгового соглашения и начали юридическую проработку; Китай одновременно требует от ЕС взаимности по редкозёмам.",
        "en": "The US and India finalised the first phase of a trade deal and began legal drafting, while China demanded reciprocal EU cooperation on rare earths."
      },
      "why": {
        "ru": "Торговые договорённости меняют баланс экономических связей региона, но не снимают зависимость от внешних цепочек поставок.",
        "en": "Trade deals shift the region’s economic balance but do not remove dependence on external supply chains."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "firstpost-india-us-trade-deal-2026-10-15",
          "title": {
            "ru": "Сделка Индии и США: первая фаза завершена, идёт юридическая проработка",
            "en": "India-US trade deal: First phase finalised, legal drafting underway"
          },
          "domain": "firstpost.com",
          "url": "https://www.firstpost.com/business/findia-us-trade-deal-first-phase-finalised-legal-drafting-underway-14053110.html",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        },
        {
          "id": "businesstoday-my-china-rare-earth-eu-2026-10-15",
          "title": {
            "ru": "Китай требует взаимного сотрудничества ЕС по экспортным лицензиям на редкозёмы",
            "en": "China Seeks Reciprocal EU Cooperation On Rare Earth Export License"
          },
          "domain": "businesstoday.com.my",
          "url": "https://www.businesstoday.com.my/2026/10/15/china-seeks-reciprocal-eu-cooperation-on-rare-earth-export-license/",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Brent впервые с мая превысил $110, US crude — выше $100 на фоне рисков Ормузского пролива, Саудовской Аравии и России.",
        "en": "Brent topped $110 for the first time since May and US crude rose above $100 amid Strait of Hormuz, Saudi and Russia risks."
      },
      "why": {
        "ru": "Энергетический шок бьёт по импортозависимым экономикам Южной Азии и усиливает внутреннее давление.",
        "en": "The energy shock hits import-dependent South Asian economies and increases domestic pressure."
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
