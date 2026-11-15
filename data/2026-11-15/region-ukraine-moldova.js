window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.regions["ukraine-moldova"] = {
  "index": 68.7,
  "delta": 1.2,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Дроны ударили по больнице в Киеве, в Одессе погибли двое; Зеленский говорит, что переданные F-16 постоянно находятся в ремонте.",
        "en": "Drones hit a Kyiv hospital and two were killed in Odesa; Zelensky says the F-16s supplied are constantly under repair."
      },
      "why": {
        "ru": "Удары по инфраструктуре и состояние поставок (Д1.3, Д1.4).",
        "en": "Strikes on infrastructure and the state of supplies (D1.3, D1.4)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "africanews-kyiv-hospital",
          "title": {
            "ru": "Российские дроны ударили по больнице в Киеве, двое погибли в Одессе",
            "en": "Ukraine: Russian drone attacks hit Kyiv hospital, leave two dead in Odesa"
          },
          "domain": "africanews.com",
          "url": "http://www.africanews.com/2026/11/13/ukraine-russian-drone-attacks-hit-kyiv-hospital-leave-one-dead-in-odesa/",
          "publication_date": "2026-11-13",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-f16-repairs",
          "title": {
            "ru": "Поставленные Украине F-16 постоянно находятся в ремонте — Зеленский",
            "en": "F-16s supplied to Ukraine constantly undergoing repairs — Zelensky"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2218181",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Зеленский заявил, что США предлагали уступить Донбасс в обмен на членство в НАТО; Россия требует отвода сил НАТО к позициям до расширения.",
        "en": "Zelensky said the US floated ceding Donbas for NATO membership; Russia demands NATO forces return to pre-enlargement positions."
      },
      "why": {
        "ru": "Переговорный трек и условия сторон (Д3.4, Д8.2).",
        "en": "The negotiating track and each side’s terms (D3.4, D8.2)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "almonitor-ceding-donbas",
          "title": {
            "ru": "Зеленский: США предлагали уступить Донбасс в обмен на членство в НАТО",
            "en": "US floated idea of Ukraine ceding Donbas for NATO membership, Zelenskiy says"
          },
          "domain": "al-monitor.com",
          "url": "https://www.al-monitor.com/originals/2026/11/us-floated-idea-ukraine-ceding-donbas-nato-membership-zelenskiy-says",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "washingtonpost-russia-pullback",
          "title": {
            "ru": "Россия требует отвода НАТО; Зеленский говорит об обсуждении уступок территорией",
            "en": "Russia seeks NATO pullback; Zelensky says U.S. asked about ceding territory"
          },
          "domain": "washingtonpost.com",
          "url": "https://www.washingtonpost.com/world/2026/11/14/russia-seeks-nato-pullback-zelensky-says-us-asked-about-ceding-territory/",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
})();
