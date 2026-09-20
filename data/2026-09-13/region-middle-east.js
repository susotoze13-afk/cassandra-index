window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  s.regions["middle-east"] = {
  "index": 88,
  "delta": 9,
  "status": "critical",
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Доступ инспекторов к ряду объектов ограничен, говорится в докладе агентства.",
        "en": "An agency report says inspector access to several facilities is limited."
      },
      "why": {
        "ru": "Снижение прозрачности затрудняет проверку соблюдения обязательств.",
        "en": "Reduced transparency makes it harder to verify compliance with obligations."
      },
      "contribution": "high",
      "confidence": "medium",
      "confidenceNote": {
        "ru": "Меньше данных, чем обычно: часть источников недоступна.",
        "en": "Fewer data than usual: some sources are unavailable."
      },
      "sources": [
        {
          "title": {
            "ru": "Доклад агентства: доступ инспекторов ограничен",
            "en": "Agency report: inspector access limited"
          },
          "url": "https://www.iaea.org/newscenter/reports/access",
          "domain": "iaea.org",
          "date": "2026-09-08"
        },
        {
          "title": {
            "ru": "Совет Безопасности: экстренное заседание по региону",
            "en": "Security Council emergency session on the region"
          },
          "url": "https://news.un.org/en/story/security-council-session",
          "domain": "un.org",
          "date": "2026-09-10"
        }
      ]
    },
    {
      "observation": {
        "ru": "Гуманитарные коридоры работают с перебоями, по данным гуманитарных организаций.",
        "en": "Humanitarian organisations report that corridors are operating intermittently."
      },
      "why": {
        "ru": "Нестабильные коридоры сопровождаются ростом локальных столкновений.",
        "en": "Unstable corridors coincide with more local clashes."
      },
      "contribution": "high",
      "confidence": "low",
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
        },
        {
          "title": {
            "ru": "Совет Безопасности: экстренное заседание по региону",
            "en": "Security Council emergency session on the region"
          },
          "url": "https://news.un.org/en/story/security-council-session",
          "domain": "un.org",
          "date": "2026-09-12"
        }
      ]
    }
  ]
};
})();
