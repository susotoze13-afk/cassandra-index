window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.regions["baltic"] = {
  "index": 74.6,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Украинский дрон ударил по российскому военному кораблю в Финском заливе; латвийские проверки транзитных партий зерна не нашли украинского зерна, но сам контроль транзита усилен.",
        "en": "A Ukrainian drone struck a Russian warship in the Gulf of Finland; Latvian checks of transit grain shipments found no Ukrainian grain, while transit controls were tightened."
      },
      "why": {
        "ru": "Атака вне украинского театра и контроль транзита (Д7.2, Д3.3).",
        "en": "An attack outside the Ukrainian theatre and transit controls (D7.2, D3.3)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "bnn-gulf-warship",
          "title": {
            "ru": "Украинский дрон ударил по российскому военному кораблю в Финском заливе",
            "en": "Ukrainian drone strikes Russian warship in the Gulf of Finland"
          },
          "domain": "bnn-news.com",
          "url": "https://bnn-news.com/world/ukrainian-drone-strikes-russian-warship-in-the-gulf-of-finland-7pb9k3z",
          "publication_date": "2026-11-13",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "bnn-latvia-grain-checks",
          "title": {
            "ru": "Проверки транзитных партий зерна в Латвии не нашли украинского зерна",
            "en": "Initial checks of transit grain shipments in Latvia find no grain stolen from Ukraine"
          },
          "domain": "bnn-news.com",
          "url": "https://bnn-news.com/world/initial-checks-of-transit-grain-shipments-in-latvia-find-no-grain-stolen-from-ukraine-2g73jb6",
          "publication_date": "2026-11-12",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
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
    },
    {
      "observation": {
        "ru": "Пентагон пересматривает планы сокращения войск в Европе в сторону меньшего сокращения; Латвия рассматривает заморозку Rail Baltica из-за стоимости.",
        "en": "The Pentagon is reversing course and now eyes smaller troop cuts in Europe, while Latvia considers freezing Rail Baltica over costs."
      },
      "why": {
        "ru": "Военное присутствие США и транспортная инфраструктура региона (Д1.1, Д9.3).",
        "en": "US military presence and the region’s transport infrastructure (D1.1, D9.3)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "straitstimes-pentagon-troops",
          "title": {
            "ru": "Пентагон пересматривает сокращение войск в Европе",
            "en": "Pentagon eyes smaller troop cuts across Europe in reversal"
          },
          "domain": "straitstimes.com",
          "url": "https://www.straitstimes.com/world/europe/pentagon-eyes-smaller-troop-cuts-across-europe-in-reversal",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "japantimes-pentagon-troops",
          "title": {
            "ru": "Пентагон намерен сократить войска в Европе меньше запланированного",
            "en": "In reversal, Pentagon eyes smaller troop cuts across Europe"
          },
          "domain": "japantimes.co.jp",
          "url": "https://www.japantimes.co.jp/news/2026/11/15/world/pentagon-troop-cuts-europe-reversal/",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "bnn-rail-baltica",
          "title": {
            "ru": "Латвия рассматривает заморозку проекта Rail Baltica",
            "en": "\"You cannot bear what you cannot afford\" – Latvia considers freezing Rail Baltica project"
          },
          "domain": "bnn-news.com",
          "url": "https://bnn-news.com/social/you-cannot-bear-what-you-cannot-afford-latvia-considers-freezing-rail-baltica-project-vdx9k4n",
          "publication_date": "2026-11-13",
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
