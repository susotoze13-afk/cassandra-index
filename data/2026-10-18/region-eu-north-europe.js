window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.regions["eu-north-europe"] = {
  "index": 59,
  "delta": 3,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "В Италии стартовали ядерные учения НАТО Steadfast Noon, а российская атомная подлодка одновременно провела ракетные стрельбы — технические ядерные сигналы на обеих сторонах.",
        "en": "NATO’s Steadfast Noon nuclear exercise began in Italy while a Russian nuclear submarine ran missile drills — simultaneous technical nuclear signals on both sides."
      },
      "why": {
        "ru": "Публично подчёркнутые ядерные сигналы вблизи европейского театра поддерживают повышенный фон неверного прочтения намерений.",
        "en": "Publicly emphasised nuclear signals near the European theatre sustain a heightened risk of misreading intentions."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "forcesnews-steadfast-noon-italy-2026-10-13",
          "title": {
            "ru": "Единство и решимость: ядерные учения НАТО Steadfast Noon начались в Италии",
            "en": "Unity and resolve: NATO's nuclear exercise Steadfast Noon begins in Italy"
          },
          "domain": "forcesnews.com",
          "url": "https://www.forcesnews.com/nato/unity-and-resolve-natos-nuclear-exercise-steadfast-noon-begins-italy",
          "publication_date": "2026-10-13",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "rt-english-russian-submarine-drill-2026-10-15",
          "title": {
            "ru": "Российская атомная подлодка отработала ракетные стрельбы",
            "en": "Russian nuclear submarine conducts missile firing drill"
          },
          "domain": "rt-english.com",
          "url": "https://rt-english.com/russia/647240-russian-submarine-fire-drill",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Израильские поселенцы напали на европейскую дипломатическую делегацию на Западном берегу — избит французский мэр; Париж и Брюссель требуют ареста нападавших.",
        "en": "Israeli settlers attacked a European diplomatic delegation in the West Bank, beating a French mayor; Paris and Brussels demand arrests."
      },
      "why": {
        "ru": "Прямое вовлечение европейских государств через нападение на дипмиссию усиливает региональную компоненту риска для Европы.",
        "en": "Direct European involvement through an attack on a diplomatic mission raises the Europe-related risk component."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "guardian-settlers-eu-diplomats",
          "title": {
            "ru": "Израильские поселенцы напали на европейских дипломатов на Западном берегу",
            "en": "Israeli settlers attack European diplomats in West Bank"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/oct/17/israeli-settlers-attack-european-diplomats-in-west-bank",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aljazeera-settlers-eu-diplomats-video",
          "title": {
            "ru": "Израильские поселенцы напали на европейских дипломатов на оккупированном Западном берегу",
            "en": "Israeli settlers attack European diplomats in the occupied West Bank"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/israeli-settlers-attack-european-diplomats-in-the-occupied-west-bank",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
})();
