window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.regions["europe"] = {
  "index": 69,
  "delta": 1,
  "status": "very",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "В восточных районах региона фиксируется рост числа учений с боевой стрельбой.",
        "en": "More live-fire exercises are being recorded in the region’s eastern districts."
      },
      "why": {
        "ru": "Регулярные учения повышают плотность сил и вероятность инцидентов на границах.",
        "en": "Regular drills increase force density and the chance of border incidents."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "title": {
            "ru": "В регионе проходят учения с боевой стрельбой",
            "en": "Live-fire exercises under way in the region"
          },
          "url": "https://www.bbc.com/news/world-exercises",
          "domain": "bbc.com",
          "date": "2026-08-25"
        },
        {
          "title": {
            "ru": "Масштабные учения объявлены на следующий месяц",
            "en": "Large-scale drills announced for next month"
          },
          "url": "https://www.dw.com/en/large-scale-drills/a-700001",
          "domain": "dw.com",
          "date": "2026-08-27"
        }
      ]
    },
    {
      "observation": {
        "ru": "Поставки систем ПВО странам региона продолжаются третий месяц подряд.",
        "en": "Air-defence deliveries to states in the region continue for a third straight month."
      },
      "why": {
        "ru": "Наращивание ПВО сопровождается ростом боевого дежурства в воздушном пространстве.",
        "en": "Air-defence build-up comes with higher alert status in regional airspace."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "title": {
            "ru": "Поставки систем ПВО продолжаются третий месяц",
            "en": "Air-defence deliveries continue for third month"
          },
          "url": "https://www.crisisgroup.org/crisiswatch/air-defence",
          "domain": "crisisgroup.org",
          "date": "2026-08-25"
        },
        {
          "title": {
            "ru": "Спутниковый анализ: новые позиции в приграничье",
            "en": "Satellite analysis: new positions near the border"
          },
          "url": "https://www.reuters.com/world/satellite-border-analysis",
          "domain": "reuters.com",
          "date": "2026-08-27"
        }
      ]
    }
  ]
};
})();
