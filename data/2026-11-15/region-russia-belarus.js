window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.regions["russia-belarus"] = {
  "index": 73.8,
  "delta": 4.7,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Генштаб РФ сообщил о взятии Терсянки в Запорожской области; украинские дроны ударили по больнице в Киеве и по Одессе.",
        "en": "Russia’s top brass reported the capture of Tersyanka in Zaporozhye region; Ukrainian drones hit a Kyiv hospital and Odesa."
      },
      "why": {
        "ru": "Наземные действия и удары по городам (Д1.1, Д1.4).",
        "en": "Ground action and strikes on cities (D1.1, D1.4)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "tass-tersyanka",
          "title": {
            "ru": "Российские силы освободили Терсянку в Запорожской области — Генштаб",
            "en": "Russian forces liberate Tersyanka in Zaporozhye Region — top brass"
          },
          "domain": "tass.com",
          "url": "https://tass.com/defense/2218169",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
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
        }
      ]
    },
    {
      "observation": {
        "ru": "МИД Латвии готовит запрет транзита российского и белорусского зерна, европейские ограничения продолжают сжимать экспортные маршруты.",
        "en": "Latvia’s foreign ministry is drafting a ban on Russian and Belarusian grain transit, while European restrictions keep tightening export routes."
      },
      "why": {
        "ru": "Санкции и логистика экспорта (Д3.3, Д4.1).",
        "en": "Sanctions and export logistics (D3.3, D4.1)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "tass-latvia-grain-ban",
          "title": {
            "ru": "МИД Латвии готовит запрет транзита российского и белорусского зерна",
            "en": "Latvian Foreign Ministry drafts ban on Russian, Belarusian grain transit"
          },
          "domain": "tass.com",
          "url": "https://tass.com/economy/2218129",
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
