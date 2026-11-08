window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.regions["balkans"] = {
  "index": 69.7,
  "delta": -2.6,
  "status": "very",
  "background": false,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Греция принимает балканские военные учения у подножия Олимпа; параллельно европейские военные тренируются в Польше в рамках подготовки послевоенного развёртывания на Украине.",
        "en": "Greece hosts a Balkan military exercise beneath Mount Olympus, while European troops train in Poland for a postwar deployment to Ukraine."
      },
      "why": {
        "ru": "Собственная военная активность региона и общеевропейские учения — сигнал Д1.2.",
        "en": "The region's own military activity and the wider European drills are a D1.2 signal."
      },
      "contribution": "medium",
      "confidence": "low",
      "sources": [
        {
          "id": "greekcitytimes-balkan-shield-exercise",
          "title": {
            "ru": "Греция принимает балканские военные учения у подножия Олимпа",
            "en": "Greece Hosts Balkan Military Exercise Beneath Mount Olympus"
          },
          "domain": "greekcitytimes.com",
          "url": "https://greekcitytimes.com/2026/11/06/greece-hosts-balkan-military-exercise-beneath-mount-olympus/",
          "publication_date": "2026-11-06",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week",
          "notes": "Многонациональные учения BALKAN SHIELD: спецподразделения восьми балканских стран."
        },
        {
          "id": "defensenews-coalition-262-poland",
          "title": {
            "ru": "Европейские военные проведут учения в Польше в рамках подготовки развёртывания на Украине после войны",
            "en": "European troops set to train in Poland for postwar Ukraine deployment"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/news/2026/11/07/european-troops-set-to-train-in-poland-for-postwar-ukraine-deployment/",
          "publication_date": "2026-11-07",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Румыния и Молдова заключили первое совместное соглашение об оборонных закупках; польские компании договорились о сотрудничестве в производстве САУ Bohdana.",
        "en": "Romania and Moldova sealed their first joint defence procurement deal, and Polish companies agreed to cooperate on producing the Bohdana self-propelled howitzer."
      },
      "why": {
        "ru": "Оборонные закупки и производство (Д6.3) связывают регион с общим наращиванием военных возможностей.",
        "en": "Defence procurement and production (D6.3) tie the region to the wider build-up of military capability."
      },
      "contribution": "medium",
      "confidence": "low",
      "sources": [
        {
          "id": "balkaninsight-romania-moldova-defence-deal",
          "title": {
            "ru": "Румыния и Молдова заключили первое совместное соглашение об оборонных закупках",
            "en": "Romania and Moldova Seal First Joint Defence Procurement Deal"
          },
          "domain": "balkaninsight.com",
          "url": "https://balkaninsight.com/2026/11/02/romania-and-moldova-seal-first-joint-defence-procurement-deal/bi/",
          "publication_date": "2026-11-02",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "militarnyi-poland-bohdana-production",
          "title": {
            "ru": "Польские компании договорились о сотрудничестве в производстве САУ Bohdana",
            "en": "Polish Companies Agree to Cooperate on Production of the Bohdana Self-Propelled Howitzer"
          },
          "domain": "militarnyi.com",
          "url": "https://militarnyi.com/en/news/polish-companies-agree-to-cooperate-on-production-of-the-bohdana-self-propelled-howitzer/",
          "publication_date": "2026-11-03",
          "accessed_date": "2026-11-08",
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
