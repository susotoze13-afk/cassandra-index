window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.regions["north-america"] = {
  "index": 74,
  "delta": 5.1,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Оптовые цены выросли на 0,3 % за месяц, годовой рост 6,5 %; Nvidia потеряла $1,7 трлн капитализации, рынок США — $3 трлн по заявлению Трампа.",
        "en": "Wholesale prices rose 0.3 % on the month, 6.5 % year on year; Nvidia shed $1.7 trillion in value, and Trump says the US market lost $3 trillion."
      },
      "why": {
        "ru": "Стресс рынков и цен (Д4.6).",
        "en": "Market and price stress (D4.6)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "cnbc-ppi",
          "title": {
            "ru": "Оптовые цены в США выросли на 0,3 %, годовой рост 6,5 % — максимум за четыре года",
            "en": "Wholesale prices rose 0.3% in October, putting annual rate at 6.5%, the highest in nearly four years"
          },
          "domain": "cnbc.com",
          "url": "https://www.cnbc.com/2026/11/13/ppi-inflation-report-october-2026.html",
          "publication_date": "2026-11-13",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "cnbc-nvidia-17t",
          "title": {
            "ru": "Nvidia: худшая недельная серия с 2012 года, капитализация упала на $1,7 трлн",
            "en": "Nvidia stock suffers longest weekly losing streak since 2012 as market value sinks by $1.7 trillion"
          },
          "domain": "cnbc.com",
          "url": "https://www.cnbc.com/2026/11/13/nvidia-stock-jensen-affair-ai.html",
          "publication_date": "2026-11-13",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "hindustantimes-stocks-3t",
          "title": {
            "ru": "Трамп винит демократов в потере $3 трлн капитализации рынка США",
            "en": "Trump blames Democrats for $3 trillion US stock market loss after 2026 midterms"
          },
          "domain": "hindustantimes.com",
          "url": "https://www.hindustantimes.com/world-news/us-news/trump-blames-democrats-for-3-trillion-us-stock-market-loss-after-2026-midterms-101794713697395.html",
          "publication_date": "2026-11-15",
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
        "ru": "Иранские командиры угрожали убить Трампа и бить по целям США по всему миру; глава Минфина США переехал на военную базу из-за угроз.",
        "en": "Iranian commanders threatened to kill Trump and strike US targets worldwide; the US Treasury chief moved to a military base over the threats."
      },
      "why": {
        "ru": "Эскалационная риторика и защита руководства (Д5.1).",
        "en": "Escalatory rhetoric and leadership protection (D5.1)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "iranintl-threat-trump",
          "title": {
            "ru": "Иранские командиры угрожают убить Трампа и бить по целям США по всему миру",
            "en": "Iranian commanders threaten to kill Trump, strike US targets worldwide"
          },
          "domain": "iranintl.com",
          "url": "https://www.iranintl.com/en/202611111877",
          "publication_date": "2026-11-12",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "guardian-bessent-base",
          "title": {
            "ru": "Глава Минфина США Бессент переехал на военную базу из-за угроз Ирана",
            "en": "US Treasury chief Scott Bessent is reportedly latest Trump official to move to military base"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/us-news/2026/nov/11/us-treasury-chief-scott-bessent-moves-military-base-iran-threats",
          "publication_date": "2026-11-11",
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
