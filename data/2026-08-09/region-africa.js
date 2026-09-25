window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-09"] = window.CI_DATA.snapshots["2026-08-09"] || {};
  // Миграция таск 09 (R55): новая схема источника, маппинг — как в sources.js
  // демо-недели ('OSINT' — спутниковые/полевые наблюдения, иначе 'secondary';
  // 'A-mainstream' — агентства/СМИ, 'C-registries' — институты и реестры;
  // state_affiliated: true только для dw.com). Тексты не изменены.
  s.regions["africa"] = {
  "index": 46,
  "delta": 1,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "В соседних государствах региона активизировались переговоры о перемирии.",
        "en": "Truce talks have intensified among neighbouring states in the region."
      },
      "why": {
        "ru": "Переговорный трек снижает риск распространения конфликта.",
        "en": "A negotiation track lowers the risk of the conflict spreading."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "news-un-org-en-story-2026-07-1167860",
          "title": {
            "ru": "Совет Безопасности: экстренное заседание по иранской атаке в Бахрейне",
            "en": "Security Council LIVE: Emergency meeting on Iranian attack in Bahrain"
          },
          "domain": "un.org",
          "url": "https://news.un.org/en/story/2026/07/1167860",
          "publication_date": "2026-07-02",
          "accessed_date": "2026-08-02",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "reliefweb-int-report-south-sudan-south-sudan-humanitarian-access-snapshot-may-2026",
          "title": {
            "ru": "Южный Судан: снимок гуманитарного доступа (май 2026 года)",
            "en": "South Sudan: Humanitarian Access Snapshot (May 2026)"
          },
          "domain": "reliefweb.int",
          "url": "https://reliefweb.int/report/south-sudan/south-sudan-humanitarian-access-snapshot-may-2026",
          "publication_date": "2026-06-15",
          "accessed_date": "2026-08-02",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
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
          "id": "reliefweb-int-report-south-sudan-south-sudan-humanitarian-access-snapshot-may-2026-2",
          "title": {
            "ru": "Южный Судан: снимок гуманитарного доступа (май 2026 года)",
            "en": "South Sudan: Humanitarian Access Snapshot (May 2026)"
          },
          "domain": "reliefweb.int",
          "url": "https://reliefweb.int/report/south-sudan/south-sudan-humanitarian-access-snapshot-may-2026",
          "publication_date": "2026-06-15",
          "accessed_date": "2026-08-02",
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
          "accessed_date": "2026-08-02",
          "source_type": "OSINT",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
