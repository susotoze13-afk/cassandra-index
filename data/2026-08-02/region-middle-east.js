window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-02"] = window.CI_DATA.snapshots["2026-08-02"] || {};
  // Миграция таск 09 (R55): новая схема источника, маппинг — как в sources.js
  // демо-недели ('OSINT' — спутниковые/полевые наблюдения, иначе 'secondary';
  // 'A-mainstream' — агентства/СМИ, 'C-registries' — институты и реестры;
  // state_affiliated: true только для dw.com). Тексты не изменены.
  s.regions["middle-east"] = {
  "index": 75,
  "delta": 0,
  "status": "very",
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
          "id": "www-iaea-org-newscenter-news-iaea-board-of-governors-briefed-on-ukraine-iran-and-global-nuclear-cooperation",
          "title": {
            "ru": "Совет управляющих МАГАТЭ проинформирован об Украине, Иране и глобальном сотрудничестве",
            "en": "IAEA Board of Governors Briefed on Ukraine, Iran and Global Nuclear Cooperation"
          },
          "domain": "iaea.org",
          "url": "https://www.iaea.org/newscenter/news/iaea-board-of-governors-briefed-on-ukraine-iran-and-global-nuclear-cooperation",
          "publication_date": "2026-06-09",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "news-un-org-en-story-2026-07-1167860",
          "title": {
            "ru": "Совет Безопасности: экстренное заседание по иранской атаке в Бахрейне",
            "en": "Security Council LIVE: Emergency meeting on Iranian attack in Bahrain"
          },
          "domain": "un.org",
          "url": "https://news.un.org/en/story/2026/07/1167860",
          "publication_date": "2026-07-02",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
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
          "id": "reliefweb-int-report-south-sudan-south-sudan-humanitarian-access-snapshot-may-2026",
          "title": {
            "ru": "Южный Судан: снимок гуманитарного доступа (май 2026 года)",
            "en": "South Sudan: Humanitarian Access Snapshot (May 2026)"
          },
          "domain": "reliefweb.int",
          "url": "https://reliefweb.int/report/south-sudan/south-sudan-humanitarian-access-snapshot-may-2026",
          "publication_date": "2026-06-15",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "apnews-com-article-pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
          "title": {
            "ru": "Пакистан наносит удары по Афганистану; пограничные бои не стихают",
            "en": "Pakistan strikes inside Afghanistan with no letup in border fighting"
          },
          "domain": "apnews.com",
          "url": "https://apnews.com/article/pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
          "publication_date": "2026-02-28",
          "accessed_date": "2026-07-26",
          "source_type": "OSINT",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "news-un-org-en-story-2026-07-1167860-2",
          "title": {
            "ru": "Совет Безопасности: экстренное заседание по иранской атаке в Бахрейне",
            "en": "Security Council LIVE: Emergency meeting on Iranian attack in Bahrain"
          },
          "domain": "un.org",
          "url": "https://news.un.org/en/story/2026/07/1167860",
          "publication_date": "2026-07-02",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
