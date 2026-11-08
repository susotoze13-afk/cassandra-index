window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.regions["north-america"] = {
  "index": 68.9,
  "delta": -3.9,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Иран предложил вновь открыть Ормуз за 48 часов при проекте сделки с США, Трамп говорит, что сделка «может случиться».",
        "en": "Iran offered to reopen Hormuz within 48 hours under a draft US deal, and Trump says a deal \"could happen\"."
      },
      "why": {
        "ru": "Переговорный трек по Ормузу (Д3.2) — канал, через который США влияют на риск перебоев поставок.",
        "en": "The Hormuz negotiating track (D3.2) is the channel through which the US influences supply-disruption risk."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "dailysabah-iran-hormuz-two-days",
          "title": {
            "ru": "Иран предлагает вновь открыть Ормузский пролив за два дня на фоне проекта сделки с США",
            "en": "Iran offers to reopen Hormuz in 2 days as draft US deal circulates"
          },
          "domain": "dailysabah.com",
          "url": "https://www.dailysabah.com/world/mid-east/iran-offers-to-reopen-hormuz-in-2-days-as-draft-us-deal-circulates",
          "publication_date": "2026-11-02",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "moneycontrol-iran-hormuz-48-hours",
          "title": {
            "ru": "Иран обещает открыть Ормуз за 48 часов, Трамп говорит, что сделка «может случиться»",
            "en": "Iran offers to unlock Hormuz in 48 hours, Trump says a deal 'could happen'"
          },
          "domain": "moneycontrol.com",
          "url": "https://www.moneycontrol.com/world/iran-offers-to-unlock-hormuz-in-48-hours-trump-says-a-deal-could-happen-major-breakthrough-or-another-false-dawn-article-14067354.html",
          "publication_date": "2026-11-03",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "colombiaone-iran-hormuz-48-hours",
          "title": {
            "ru": "Иран заявляет, что Ормузский пролив может открыться в течение 48 часов",
            "en": "Iran Says Strait of Hormuz Could Reopen in 48 Hours"
          },
          "domain": "colombiaone.com",
          "url": "https://colombiaone.com/2026/11/03/iran-strait-hormuz-could-reopen/",
          "publication_date": "2026-11-03",
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
        "ru": "Переговоры России, США и Украины назначены в Абу-Даби на 10–11 ноября; делегацию Киева возглавит глава офиса Зеленского, в Белом доме приём в честь перемирия в Алёшках провела первая леди США.",
        "en": "Russia-US-Ukraine talks are set for Abu Dhabi on 10–11 November; Zelensky's office head will lead Kyiv's delegation, and the US first lady hosted a White House event marking the Oleshky ceasefire."
      },
      "why": {
        "ru": "Посредничество и переговорный трек (Д3.4, Д8.2) — деэскалационный канал для США.",
        "en": "Mediation and the negotiating track (D3.4, D8.2) are the de-escalatory channel for the US."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "latintimes-russia-ukraine-abu-dhabi-talks",
          "title": {
            "ru": "Команда Трампа возобновляет российско-украинские переговоры в Абу-Даби 10–11 ноября",
            "en": "Trump's Team Restarts Russia-Ukraine Peace Talks in Abu Dhabi Nov. 10–11"
          },
          "domain": "latintimes.com",
          "url": "https://www.latintimes.com/us-mediate-russia-ukraine-talks-abu-dhabi-600870",
          "publication_date": "2026-11-03",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-zelensky-delegation-abu-dhabi",
          "title": {
            "ru": "Глава офиса Зеленского возглавит делегацию Киева на переговорах в Абу-Даби",
            "en": "Zelensky's office head to lead Kiev's delegation to Abu Dhabi talks"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2213991",
          "publication_date": "2026-11-06",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "globe-melania-oleshky-ceasefire",
          "title": {
            "ru": "Мелания Трамп встретилась с представителями России и Украины в Белом доме в честь перемирия в Олешках",
            "en": "Melania Trump joins Russia, Ukraine officials at White House event to mark Oleshky ceasefire"
          },
          "domain": "theglobeandmail.com",
          "url": "https://www.theglobeandmail.com/world/article-melania-trump-putin-envoy-oleshky-ceasefire/",
          "publication_date": "2026-11-05",
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
