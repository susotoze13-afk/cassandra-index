window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  // Редакционный сид региона africa (неделя 2026-09-13, R55): два драйвера региона.
  // Источники — verbatim-записи из calc/input/2026-09-13.json. index/delta/status
  // пересчитываются пайплайном; confidence — редакционная.
  s.regions["africa"] = {
  "index": 60,
  "delta": 13,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Хуситы захватили остров Перим в Красном море; морские маршруты вдоль восточного побережья Африки несут растущие страховые издержки.",
        "en": "The Houthis seized Perim island in the Red Sea; sea routes along Africa’s eastern coast face rising insurance costs."
      },
      "why": {
        "ru": "Нестабильность в Красном море ударяет по торговле и снабжению восточной Африки через фрахт и страхование.",
        "en": "Red Sea instability hits East African trade and supply through freight and insurance."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "news-usni-org-houthis-perim-red-sea-2026-09-11",
          "title": {
            "ru": "Хуситы захватили остров Перим; США и Иран переходят к танкерам против военных кораблей",
            "en": "Houthis Make Moves on Red Sea, U.S., Iran Go Tanker for Warship"
          },
          "domain": "news.usni.org",
          "url": "https://news.usni.org/2026/09/11/houthis-make-moves-on-red-sea-u-s-iran-go-tanker-for-warship",
          "publication_date": "2026-09-11",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Brent подорожала выше 100 долларов; рост цен на энергоносители повышает издержки импортёров.",
        "en": "Brent rose above USD 100; higher energy prices raise costs for importers."
      },
      "why": {
        "ru": "Дорогая энергия и логистика сокращают ресурсы африканских экономик на продовольствие и гуманитарные программы.",
        "en": "Expensive energy and logistics drain African economies’ resources for food and humanitarian programmes."
      },
      "contribution": "low",
      "confidence": "medium",
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
