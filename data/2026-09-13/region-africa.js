window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  s.regions["africa"] = {
  "index": 60,
  "delta": 13,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "В соседних государствах региона активизировались переговоры о перемирии.",
        "en": "Truce talks have intensified among neighbouring states in the region."
      },
      "why": {
        "ru": "Переговорный трек снижает вероятность распространения конфликта.",
        "en": "A negotiation track lowers the chance of the conflict spreading."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "title": {
            "ru": "Совет Безопасности: экстренное заседание по региону",
            "en": "Security Council emergency session on the region"
          },
          "url": "https://news.un.org/en/story/security-council-session",
          "domain": "un.org",
          "date": "2026-09-08"
        },
        {
          "title": {
            "ru": "Гуманитарные коридоры работают с перебоями",
            "en": "Humanitarian corridors operating intermittently"
          },
          "url": "https://reliefweb.int/report/corridor-status",
          "domain": "reliefweb.int",
          "date": "2026-09-10"
        }
      ]
    },
    {
      "observation": {
        "ru": "Гуманитарные организации фиксируют рост перемещённых лиц в приграничных районах.",
        "en": "Aid organisations record more displaced people in border areas."
      },
      "why": {
        "ru": "Потоки перемещённых лиц — индикатор устойчивой нестабильности в приграничье.",
        "en": "Displacement flows signal persistent instability near borders."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "title": {
            "ru": "Гуманитарные коридоры работают с перебоями",
            "en": "Humanitarian corridors operating intermittently"
          },
          "url": "https://reliefweb.int/report/corridor-status",
          "domain": "reliefweb.int",
          "date": "2026-09-08"
        },
        {
          "title": {
            "ru": "Мониторинг: число столкновений выросло за неделю",
            "en": "Monitoring: clash count up over the week"
          },
          "url": "https://apnews.com/article/border-clashes-monitoring",
          "domain": "apnews.com",
          "date": "2026-09-10"
        }
      ]
    }
  ]
};
})();
