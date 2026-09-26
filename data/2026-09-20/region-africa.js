window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.regions["africa"] = {
  "index": 56,
  "delta": 15,
  "status": "danger",
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
          "id": "abcnews-com-houthi-rebels-seize-islands-136415608",
          "title": {
            "ru": "Хуситы захватили ключевые острова в южной части Красного моря, усилив контроль над судоходными путями",
            "en": "Yemen's Houthi rebels seize key islands in Red Sea, tighten grip on shipping routes"
          },
          "domain": "abcnews.com",
          "url": "https://abcnews.com/Business/wireStory/yemens-houthi-rebels-seize-key-islands-southern-red-136415608",
          "publication_date": "2026-09-14",
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
})();
