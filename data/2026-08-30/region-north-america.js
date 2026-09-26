window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.regions["north-america"] = {
  "index": 51,
  "delta": 9,
  "status": "danger",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Москва предупредила Великобританию о последствиях поставок оружия Украине; министр обороны Великобритании заявил, что Лондон останется с Киевом несмотря на возмутительные угрозы.",
        "en": "Moscow warned the United Kingdom over arms supplies to Ukraine; the UK defence secretary said London will stand with Kyiv despite the outrageous threats."
      },
      "why": {
        "ru": "Публичные угрозы в адрес союзников и твёрдые ответные заявления закрепляют конфронтацию между столицами.",
        "en": "Public threats against allies and firm responses entrench confrontation between capitals."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "guardian-europe-live-2026-08-24",
          "title": {
            "ru": "Бёрнем: Великобритания с Украиной «до конца» несмотря на «возмутительные угрозы» России — онлайн",
            "en": "Burnham says UK with Ukraine 'all the way' despite 'outrageous threats' from Russia – Europe live"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/live/2026/aug/24/europe-ukraine-russia-war-kyiv-andy-burnham-volodymyr-zelenskyy-latest-news-updates",
          "publication_date": "2026-08-24",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "democracynow-headlines-2026-08-27",
          "title": {
            "ru": "Заголовки 27 августа 2026: Украина и Россия обмениваются ударами, Москва предупреждает Великобританию",
            "en": "Headlines August 27, 2026: Ukraine and Russia trade attacks as Moscow warns the UK"
          },
          "domain": "democracynow.org",
          "url": "https://www.democracynow.org/2026/8/27/headlines",
          "publication_date": "2026-08-27",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "ЕС одобрил 7,1 млрд долларов новой военной помощи Украине; сводки санкционного регулирования фиксируют вступление в силу очередных ограничительных мер.",
        "en": "The EU approved USD 7.1 billion in new military aid to Ukraine; sanctions-regulation roundups record new restrictive measures taking effect."
      },
      "why": {
        "ru": "Серийное наращивание помощи и санкций закрепляет ожидание длительного периода напряжённости в трансатлантическом пространстве.",
        "en": "Serial increases in aid and sanctions entrench expectations of a prolonged period of tension across the Atlantic."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "aa-eu-defense-aid-2026-08-24",
          "title": {
            "ru": "ЕС одобрил $7,1 млрд новой военной помощи Украине",
            "en": "EU approves $7.1B in new defense aid for Ukraine"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/europe/eu-approves-71b-in-new-defense-aid-for-ukraine/4035762",
          "publication_date": "2026-08-24",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "ecovis-sanctions-regulation-august-2026",
          "title": {
            "ru": "RegRally Insights: санкционное регулирование, август 2026",
            "en": "RegRally Insights: Sanctions Regulation, August 2026"
          },
          "domain": "ecovis.lt",
          "url": "https://ecovis.lt/regrally-insights-sanctions-regulation-august-2026/",
          "publication_date": "2026-08-27",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
