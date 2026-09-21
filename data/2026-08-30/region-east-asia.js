window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.regions["east-asia"] = {
  "index": 60,
  "delta": 8,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Активность военно-морских учений в ключевом проливе выше среднего уровня за год.",
        "en": "Naval exercise activity in the key strait is above the yearly average."
      },
      "why": {
        "ru": "Устойчивая активность флота в узком проливе повышает риск морских инцидентов.",
        "en": "Sustained fleet activity in a narrow strait raises the risk of maritime incidents."
      },
      "contribution": "medium",
      "confidence": "medium",
      "confidenceNote": {
        "ru": "Неполное покрытие источников по морской зоне.",
        "en": "Incomplete source coverage for the maritime zone."
      },
      "sources": [
        {
          "title": {
            "ru": "Инциденты в морской зоне: хроника за неделю",
            "en": "Maritime incidents: week in review"
          },
          "url": "https://reliefweb.int/report/maritime-incidents-week",
          "domain": "reliefweb.int",
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
        "ru": "Государства региона увеличили частоту патрулирования воздушного пространства.",
        "en": "States in the region increased airspace patrol frequency."
      },
      "why": {
        "ru": "Рост патрулирования — реакция на серию сближений военных самолётов.",
        "en": "More patrols respond to a series of military aircraft close encounters."
      },
      "contribution": "medium",
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
            "ru": "Парламенты утверждают рост оборонных расходов",
            "en": "Parliaments approve higher defence spending"
          },
          "url": "https://www.sipri.org/media/press-release/budgets",
          "domain": "sipri.org",
          "date": "2026-08-27"
        }
      ]
    }
  ]
};
})();
