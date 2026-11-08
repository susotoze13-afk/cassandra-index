window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.regions["baltic"] = {
  "index": 0,
  "delta": 0,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Более 6 000 военных НАТО участвуют в германско-литовских учениях в Литве; европейские военные тренируются в Польше в рамках подготовки послевоенного развёртывания на Украине.",
        "en": "More than 6,000 NATO troops are taking part in German-led drills in Lithuania, and European troops are training in Poland for a postwar deployment to Ukraine."
      },
      "why": {
        "ru": "Учения у границы с Беларусью и подготовка развёртывания — сигналы Д1.2.",
        "en": "Drills near the border with Belarus and deployment preparation are D1.2 signals."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "aa-nato-lithuania-drills",
          "title": {
            "ru": "Более 6 000 военных НАТО примут участие в учениях под руководством ФРГ в Литве",
            "en": "More than 6,000 NATO troops to take part in German-led drills in Lithuania"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/europe/more-than-6-000-nato-troops-to-take-part-in-german-led-drills-in-lithuania/4114400",
          "publication_date": "2026-11-06",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
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
        "ru": "Американские войска возвращаются в Эстонию, восточный фланг НАТО усиливается; в Латвии военные НАТО тренируют взаимозаменяемость подразделений на передовой.",
        "en": "US troops are returning to Estonia as NATO's eastern flank grows stronger, and in Latvia NATO soldiers train to become interchangeable on the front lines."
      },
      "why": {
        "ru": "Усиление восточного фланга (Д7.1) — прямое изменение обстановки для региона.",
        "en": "Reinforcing the eastern flank (D7.1) directly changes the situation for the region."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "defence24-us-troops-estonia",
          "title": {
            "ru": "Американские войска возвращаются в Эстонию: восточный фланг НАТО усиливается",
            "en": "US troops return to Estonia. NATO's eastern flank is getting stronger"
          },
          "domain": "defence24.com",
          "url": "https://defence24.com/defence-policy/us-troops-return-to-estonia-natos-eastern-flank-is-getting-stronger",
          "publication_date": "2026-11-06",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "ctv-nato-latvia-training",
          "title": {
            "ru": "Военные НАТО в Латвии тренируются взаимозаменяемости на передовой",
            "en": "CTV News in Latvia: NATO soldiers train to become interchangeable on the front lines"
          },
          "domain": "ctvnews.ca",
          "url": "https://www.ctvnews.ca/canada/article/ctv-news-in-latvia-nato-soldiers-train-to-become-interchangeable-on-the-front-lines/",
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
