window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-04"] = window.CI_DATA.snapshots["2026-10-04"] || {};
  s.regions["europe"] = {
  "index": 52,
  "delta": -2,
  "status": "danger",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Внутри Европы в окне продолжились гибридные инциденты: Эстония публично возложила на Россию поджог завода дронов, поставляющих Украине; в Финляндии взломы в домах депутатов парламента связывают с иностранной державой.",
        "en": "Hybrid incidents inside Europe continued in the window: Estonia publicly blamed Russia for an arson attack on a drone maker supplying Ukraine, and Finnish break-ins at the homes of MPs were linked to a foreign power."
      },
      "why": {
        "ru": "Прямые атаки на военное производство и политиков в странах НАТО повышают риск прямого столкновения и ответных мер.",
        "en": "Direct attacks on defense production and politicians inside NATO countries raise the risk of direct confrontation and countermeasures."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "guardian-estonia-russia-arson",
          "title": {
            "ru": "Эстония обвиняет Россию в поджоге завода дронов, поставляющих Украине",
            "en": "Estonia blames Russia for arson attack on drone maker supplying Ukraine"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/sep/29/estonia-blames-russia-arson-attack-drone-maker-ukraine",
          "publication_date": "2026-09-29",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "guardian-finland-mp-break-ins",
          "title": {
            "ru": "Премьер Финляндии: взломы в домах депутатов могла совершить иностранная держава",
            "en": "Finnish PM says suspected break-ins at MPs' homes could be work of foreign power"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/oct/01/finland-suspected-break-ins-mp-homes-foreign-power",
          "publication_date": "2026-10-01",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Дрон, вошедший в воздушное пространство Латвии, был перехвачен истребителями НАТО в рамках Baltic Air Policing (02.10) — инцидент на восточном фланге в неделю латвийских выборов.",
        "en": "A drone that entered Latvian airspace was intercepted by NATO fighters under Baltic Air Policing (02.10) — an incident on the eastern flank during Latvia's election week."
      },
      "why": {
        "ru": "Нарушения воздушного пространства вблизи границ альянса поддерживают повышенное дежурство сил и риск случайных столкновений.",
        "en": "Airspace incursions near alliance borders sustain heightened force readiness and the risk of unintended clashes."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "cde-news-nato-intercept-drone-latvia",
          "title": {
            "ru": "Истребители НАТО перехватывают угрозу дрона в воздушном пространстве Латвии",
            "en": "NATO Fighter Jets Intercept Drone Threat Over Latvia"
          },
          "domain": "cde.news",
          "url": "https://cde.news/nato-baltic-air-policing-jets-shoot-down-drone-over-latvia/",
          "publication_date": "2026-10-02",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
