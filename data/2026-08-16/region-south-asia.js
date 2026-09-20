window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-16"] = window.CI_DATA.snapshots["2026-08-16"] || {};
  s.regions["south-asia"] = {
  "index": 57,
  "delta": 1,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Обстрелы на линии разграничения участились по данным наблюдателей.",
        "en": "Observers report more exchanges of fire along the line of control."
      },
      "why": {
        "ru": "Частые обстрелы поддерживают высокий уровень боевого сдерживания.",
        "en": "Frequent fire keeps the level of military deterrence high."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "title": {
            "ru": "Мониторинг: число столкновений выросло за неделю",
            "en": "Monitoring: clash count up over the week"
          },
          "url": "https://apnews.com/article/border-clashes-monitoring",
          "domain": "apnews.com",
          "date": "2026-08-11"
        },
        {
          "title": {
            "ru": "Гуманитарные коридоры работают с перебоями",
            "en": "Humanitarian corridors operating intermittently"
          },
          "url": "https://reliefweb.int/report/corridor-status",
          "domain": "reliefweb.int",
          "date": "2026-08-13"
        }
      ]
    },
    {
      "observation": {
        "ru": "В регионе испытываются новые ракетные комплексы средней дальности.",
        "en": "New medium-range missile systems are being tested in the region."
      },
      "why": {
        "ru": "Испытания ракет средней дальности усиливают циклы демонстрации сил.",
        "en": "Medium-range missile tests strengthen cycles of shows of force."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "title": {
            "ru": "Масштабные учения объявлены на следующий месяц",
            "en": "Large-scale drills announced for next month"
          },
          "url": "https://www.dw.com/en/large-scale-drills/a-700001",
          "domain": "dw.com",
          "date": "2026-08-11"
        },
        {
          "title": {
            "ru": "Спутниковый анализ: новые позиции в приграничье",
            "en": "Satellite analysis: new positions near the border"
          },
          "url": "https://www.reuters.com/world/satellite-border-analysis",
          "domain": "reuters.com",
          "date": "2026-08-13"
        }
      ]
    }
  ]
};
})();
