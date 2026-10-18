window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.regions["baltic"] = {
  "index": 60,
  "delta": 4,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Рой украинских дронов атаковал Санкт-Петербург и Ленинградскую область, поразив ЦОД VK и нефтетерминал; для стран Балтии это сигнал о досягаемости тыловой инфраструктуры региона.",
        "en": "A Ukrainian drone swarm struck St Petersburg and the Leningrad Region, hitting a VK data centre and an oil terminal; for the Baltic states this signals the reachability of rear infrastructure in the region."
      },
      "why": {
        "ru": "Географическая близость ударов к Балтике повышает риск побочных инцидентов и ошибок в оценке воздушной обстановки.",
        "en": "The proximity of the strikes to the Baltic raises the risk of incidental incidents and air-picture misjudgements."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "tass-leningrad-largest-drone-attack",
          "title": {
            "ru": "Атака дронов на Ленинградскую область — одна из крупнейших за четыре года",
            "en": "Drone attack on Leningrad Region one of largest in four years"
          },
          "domain": "tass.com",
          "url": "https://tass.com/emergencies/2203667",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aljazeera-st-petersburg-drone-swarm",
          "title": {
            "ru": "Санкт-Петербург под атакой роя украинских дронов",
            "en": "St Petersburg under attack from Ukrainian drone swarm"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/st-petersburg-under-attack-from-ukrainian-drone-swarm",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "ЕС ввёл крупнейший пакет санкций против России, одновременно Brent превысил $110 из-за рисков Ормуза.",
        "en": "The EU adopted its largest sanctions package on Russia as Brent topped $110 on Hormuz risks."
      },
      "why": {
        "ru": "Санкции и энергетический шок вместе усиливают экономическое давление на прибалтийские экономики.",
        "en": "Sanctions and the energy shock together increase economic pressure on the Baltic economies."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "brusselstimes-eu-sanctions-1569-2026-10-12",
          "title": {
            "ru": "Крупнейший пакет санкций ЕС: 1 569 записей в военном чёрном списке России",
            "en": "Largest EU sanctions package yet adds 1,569 to Russia military blacklist"
          },
          "domain": "brusselstimes.com",
          "url": "https://www.brusselstimes.com/2357495/largest-eu-sanctions-package-yet-adds-1569-to-russia-military-blacklist",
          "publication_date": "2026-10-12",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "cnbctv18-brent-110-explained-2026-10-16",
          "title": {
            "ru": "Объяснение: почему Brent впервые превысил $110",
            "en": "Explained: What led to Brent crude prices crossing $110 for the first time"
          },
          "domain": "cnbctv18.com",
          "url": "https://www.cnbctv18.com/market/commodities/crude-oil-prices-brent-wti-why-are-rates-rising-explained-saudi-houthis-hormuz-iran-us-russia-ukraine-20013997.htm",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
