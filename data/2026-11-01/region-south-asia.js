window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["south-asia"] = {
  "index": 69,
  "delta": 2,
  "status": "very",
  "background": true,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Собственной атрибуции, которую учитывает региональная модель, в окне недели нет: сигналы региона относятся к критериям Д4 (перебои энергетики, цепочки поставок, Brent у $120), а атрибуция Д4 региональной агрегацией не учитывается (ADR 0022). Фон — Индия осудила перебои в мировой энергетике из-за санкций и узких мест, министры Quad обсуждали цепочки поставок.",
        "en": "There is no attribution of its own that the regional model takes into account this week: the region's signals fall under D4 criteria (energy disruptions, supply chains, Brent near $120), and D4 attribution is not used in regional aggregation (ADR 0022). The backdrop: India condemned global energy disruptions from sanctions and bottlenecks, and Quad ministers discussed supply chains."
      },
      "why": {
        "ru": "Индекс региона отражает глобальный фон; дельта не подаётся как региональная, хотя события недели для региона значимы.",
        "en": "The regional index reflects the global backdrop; the delta is not presented as regional even though the week's events matter for the region."
      },
      "contribution": "medium",
      "confidence": "low",
      "sources": [
        {
          "id": "hindu-india-energy",
          "title": {
            "ru": "Индия осудила перебои в мировой энергетике из-за санкций и узких мест",
            "en": "India slams global energy disruptions through sanctions, chokepoints"
          },
          "domain": "hindustantimes.com",
          "url": "https://www.hindustantimes.com/world-news/us-news/india-slams-global-energy-disruptions-through-sanctions-chokepoints-101793402110619.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "almonitor-quad-supply",
          "title": {
            "ru": "Министры Quad работают над цепочками поставок и осуждают произвольные экспортные ограничения",
            "en": "Indo-Pacific Quad ministers work on supply chains, denounce arbitrary export restrictions"
          },
          "domain": "al-monitor.com",
          "url": "https://www.al-monitor.com/originals/2026/10/indo-pacific-quad-ministers-work-supply-chains-denounce-arbitrary-export",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "oilprice-brent-120",
          "title": {
            "ru": "Нефтетрейдеры готовятся к волатильной неделе: Brent приближается к $120",
            "en": "Oil traders brace for a wild week as Brent approaches $120"
          },
          "domain": "oilprice.com",
          "url": "https://oilprice.com/Energy/Oil-Prices/Oil-Traders-Brace-for-a-Wild-Week-as-Brent-Approaches-120.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Фон — минная угроза в Ормузе: несколько танкеров подорвались и загорелись, Оман спас 25 человек с горящего судна, Иран остановил танкеры.",
        "en": "The backdrop is the mine threat in Hormuz: several tankers struck mines and caught fire, Oman rescued 25 people from a burning vessel, and Iran stopped tankers."
      },
      "why": {
        "ru": "Для региона с импортным топливом и диаспорой в Заливе это канал Д4.3/Д9.3, но региональная агрегация его не видит — запись носит фоновый характер.",
        "en": "For a region with imported fuel and a Gulf diaspora this is a D4.3/D9.3 channel, but regional aggregation does not see it — the entry is background in nature."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "hindu-hormuz-tankers-mines",
          "title": {
            "ru": "Иран заявил, что несколько танкеров подорвались на минах и загорелись в Ормузском проливе",
            "en": "Iran says multiple oil tankers strike mines, catch fire in Strait of Hormuz"
          },
          "domain": "hindustantimes.com",
          "url": "https://www.hindustantimes.com/world-news/iran-says-multiple-oil-tankers-strike-mines-catch-fire-in-strait-of-hormuz-101793395035292.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "straits-oman-rescue",
          "title": {
            "ru": "Оман спас 25 человек с горящего судна; Иран остановил танкеры",
            "en": "Oman rescues 25 from burning ship, Iran halts tankers"
          },
          "domain": "straitstimes.com",
          "url": "https://www.straitstimes.com/world/middle-east/oman-rescues-25-from-burning-ship-iran-halts-tankers",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
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
