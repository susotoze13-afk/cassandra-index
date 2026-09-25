window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.regions["south-asia"] = {
  "index": 59,
  "delta": 1,
  "status": "danger",
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
})();
