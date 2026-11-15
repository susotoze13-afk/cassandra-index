window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.regions["eu-north-europe"] = {
  "index": 64.2,
  "delta": -4.6,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Франция расследует взлом холодильника с кровью после серии атак, приписываемых Ирану; по данным ITV, волну атак в Европе организовывала сеть из семи человек.",
        "en": "France is investigating a blood-freezer hack after a series of Iran-linked attacks; ITV reports a seven-man network orchestrated a wave of attacks across Europe."
      },
      "why": {
        "ru": "Кибероперации против гражданской инфраструктуры (Д5.2).",
        "en": "Cyber operations against civilian infrastructure (D5.2)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "iranintl-france-hack",
          "title": {
            "ru": "Франция расследует взлом холодильника с кровью после похожих атак",
            "en": "France probes blood freezer hack after blaming Iran for similar attacks"
          },
          "domain": "iranintl.com",
          "url": "https://www.iranintl.com/en/202611137304",
          "publication_date": "2026-11-13",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "iranintl-iran-network-europe",
          "title": {
            "ru": "Сеть из семи человек, связанная с Ираном, организовала волну атак в Европе",
            "en": "Seven-man Iran-linked network helped orchestrate wave of attacks across Europe - ITV"
          },
          "domain": "iranintl.com",
          "url": "https://www.iranintl.com/en/202611126962",
          "publication_date": "2026-11-12",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Кушнер заявил, что США готовят следующий раунд переговоров России и Украины с участием европейцев; Кремль говорит, что европейские переговорщики ещё не выходили на связь.",
        "en": "Kushner said the US is preparing the next round of Russia–Ukraine talks with Europeans involved; the Kremlin says European negotiators have not made contact yet."
      },
      "why": {
        "ru": "Посредничество и готовность к переговорам (Д3.4, Д8.2).",
        "en": "Mediation and readiness to talk (D3.4, D8.2)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "aljazeera-kushner-broker",
          "title": {
            "ru": "Кушнер заявил, что намерен организовать переговоры Европы и России",
            "en": "US envoy Kushner says he aims to broker Europe-Russia talks on Ukraine"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/11/14/us-envoy-kushner-says-he-aims-to-broker-europe-russia-talks-on-ukraine?traffic_source=rss",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-kushner-contacts",
          "title": {
            "ru": "США намерены содействовать прямым контактам России и Европы по Украине",
            "en": "US aims to facilitate direct contacts between Russia and Europe on Ukraine — Kushner"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2218233",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
})();
