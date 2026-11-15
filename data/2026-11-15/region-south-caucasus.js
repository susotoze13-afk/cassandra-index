window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.regions["south-caucasus"] = {
  "index": 64.5,
  "delta": -4.2,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Зеленский похвалил новые дроновые сделки Баку и Киева и рост заказов.",
        "en": "Zelensky praised new drone deals between Baku and Kyiv and said orders are scaling up."
      },
      "why": {
        "ru": "Поставки военной техники в регионе (Д1.3).",
        "en": "Military supplies in the region (D1.3)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "ocmedia-drone-deals-baku",
          "title": {
            "ru": "Зеленский хвалит новые дроновые сделки Баку и Киева",
            "en": "‘We are working to scale up orders’: Zelenskyy praises new drone deals between Baku and Kyiv"
          },
          "domain": "oc-media.org",
          "url": "https://oc-media.org/we-are-working-to-scale-up-orders-zelenskyy-praises-new-drone-deals-between-baku-and-kyiv/",
          "publication_date": "2026-11-13",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Иран пригрозил Армении на фоне прохождения «маршрута Трампа» через парламент Еревана.",
        "en": "Iran threatened Armenia as the “Trump Route” cleared Yerevan’s parliament."
      },
      "why": {
        "ru": "Давление на маршруты и переговорную рамку региона (Д3.4, Д5.1).",
        "en": "Pressure on routes and the region’s negotiating framework (D3.4, D5.1)."
      },
      "contribution": "medium",
      "confidence": "low",
      "sources": [
        {
          "id": "iranintl-threat-armenia",
          "title": {
            "ru": "Иран угрожает Армении на фоне прохождения «маршрута Трампа»",
            "en": "Iran threatens Armenia as US-run Trump Route clears Yerevan’s parliament"
          },
          "domain": "iranintl.com",
          "url": "https://www.iranintl.com/en/202611129472",
          "publication_date": "2026-11-13",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
})();
