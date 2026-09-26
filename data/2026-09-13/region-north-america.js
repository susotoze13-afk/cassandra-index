window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  // Редакционный сид региона north-america (неделя 2026-09-13, R55): два драйвера региона.
  // Источники — verbatim-записи из calc/input/2026-09-13.json. index/delta/status
  // пересчитываются пайплайном; confidence — редакционная.
  s.regions["north-america"] = {
  "index": 60,
  "delta": 18,
  "status": "danger",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Эмиссары Трампа Уиткофф и Кушнер ведут переговоры между Украиной и Россией; на фоне шаттл-дипломатии по Киеву ударили баллистическими ракетами.",
        "en": "Trump’s envoys Witkoff and Kushner are conducting talks between Ukraine and Russia; amid the shuttle diplomacy, Kyiv was hit by ballistic missiles."
      },
      "why": {
        "ru": "Американская посредническая линия остаётся главным каналом деэскалации, но удары в дни переговоров ограничивают её пространство.",
        "en": "The American mediation track remains the main channel for de-escalation, but strikes on the days of talks limit its room."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "independent-co-uk-witkoff-kushner-talks-b3045408",
          "title": {
            "ru": "Украина — Россия: эмиссары Трампа ведут переговоры, по Киеву ударили баллистическими ракетами",
            "en": "Ukraine–Russia war: Trump's envoys in talks as Kyiv hit by ballistic missiles"
          },
          "domain": "independent.co.uk",
          "url": "https://www.independent.co.uk/news/world/europe/ukraine-russia-war-live-trump-putin-zelensky-talks-witkoff-kushner-b3045408.html",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "kp-ru-massirovanny-udar-8-sentyabrya-5299991",
          "title": {
            "ru": "Массированный удар по Украине 8 сентября 2026 года",
            "en": "Massed strike on Ukraine on September 8, 2026"
          },
          "domain": "kp.ru",
          "url": "https://www.kp.ru/daily/277813.4/5299991/",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Brent подорожала выше 100 долларов после роста на 7 %; в США дизель дороже шести долларов; цены на бензин в регионах стабилизировались.",
        "en": "Brent rose above USD 100 after a 7% jump; diesel cost more than six dollars in the United States; petrol prices in Russian regions stabilised."
      },
      "why": {
        "ru": "Скачок цен на энергоносители напрямую бьёт по американской экономике и усиливает внимание к маршрутам поставок.",
        "en": "The spike in energy prices directly hits the US economy and sharpens attention on supply routes."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "sergeytereshkin-co-uk-oil-gas-news-2026-09-12",
          "title": {
            "ru": "Нефтегазовые новости, 12 сентября 2026: Brent выше $100 после роста на 7%, дизель в США дороже $6",
            "en": "Oil and Gas News, Saturday 12 September 2026: Brent ends week above $100 after 7% rise, US diesel over $6"
          },
          "domain": "sergeytereshkin.co.uk",
          "url": "https://sergeytereshkin.co.uk/publications/oil-and-gas-news-saturday-12-september-2026-brent-ends-week-above-100-diesel-in-usa-over-6-iea-reports-largest-demand-decline-since-2020",
          "publication_date": "2026-09-12",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "mentoday-ru-benzin-azs-2026-09-08",
          "title": {
            "ru": "Цены устаканились, очереди на АЗС сокращаются: что происходит с бензином в регионах и что будет осенью",
            "en": "Fuel prices stabilise, gas station queues shrink: what is happening with petrol in Russian regions"
          },
          "domain": "mentoday.ru",
          "url": "https://www.mentoday.ru/life/news/08-09-2026/ceny-ustakanilis-ocheredi-na-azs-sokrashchayutsya-chto-proishodit-s-benzinom-v-regionah-i-chto-budet-osenyu/",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
