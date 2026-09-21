window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  s.regions["north-america"] = {
  "index": 58,
  "delta": -2,
  "status": "danger",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "В регионе завершён цикл учений стратегических сил без отклонений.",
        "en": "The region completed a strategic forces exercise cycle without incidents."
      },
      "why": {
        "ru": "Завершение цикла без инцидентов снижает краткосрочную напряжённость.",
        "en": "An incident-free cycle lowers short-term tension."
      },
      "contribution": "low",
      "confidence": "high",
      "sources": [
        {
          "title": {
            "ru": "Масштабные учения объявлены на следующий месяц",
            "en": "Large-scale drills announced for next month"
          },
          "url": "https://www.dw.com/en/large-scale-drills/a-700001",
          "domain": "dw.com",
          "date": "2026-09-01"
        },
        {
          "title": {
            "ru": "Парламенты утверждают рост оборонных расходов",
            "en": "Parliaments approve higher defence spending"
          },
          "url": "https://www.sipri.org/media/press-release/budgets",
          "domain": "sipri.org",
          "date": "2026-09-03"
        }
      ]
    },
    {
      "observation": {
        "ru": "Дипломатические контакты по линии оборонных ведомств сохраняются.",
        "en": "Defence-ministry diplomatic contacts remain in place."
      },
      "why": {
        "ru": "Рабочие каналы связи снижают риск ошибочной эскалации.",
        "en": "Working communication channels reduce the risk of accidental escalation."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "title": {
            "ru": "Совет Безопасности: экстренное заседание по региону",
            "en": "Security Council emergency session on the region"
          },
          "url": "https://news.un.org/en/story/security-council-session",
          "domain": "un.org",
          "date": "2026-09-01"
        },
        {
          "title": {
            "ru": "Спутниковый анализ: новые позиции в приграничье",
            "en": "Satellite analysis: new positions near the border"
          },
          "url": "https://www.reuters.com/world/satellite-border-analysis",
          "domain": "reuters.com",
          "date": "2026-09-03"
        }
      ]
    }
  ]
};
})();
