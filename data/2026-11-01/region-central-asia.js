window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["central-asia"] = {
  "index": 71.9,
  "delta": 4.8,
  "status": "very",
  "background": false,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Собственных сигналов в окне недели не собрано; фон — санкционное давление и торговые маршруты: Россия на G20 указала на санкции и заморозку активов, министры Quad обсуждали цепочки поставок и «произвольные экспортные ограничения».",
        "en": "No signals of its own were collected in the week window; the backdrop is sanctions pressure and trade routes: Russia at the G20 pointed to sanctions and asset freezes, and Quad ministers discussed supply chains and \"arbitrary export restrictions\"."
      },
      "why": {
        "ru": "Для региона это экономический фон (Д9.2), а не измеренный сигнал недели — запись помечена как фоновая.",
        "en": "For the region this is an economic backdrop (D9.2) rather than a measured weekly signal — the entry is marked as background."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "sputnik-g20-sanctions",
          "title": {
            "ru": "Россия на G20 указала на санкции и заморозку активов как методы подрыва мировой торговли",
            "en": "Russia at G20 meeting flags sanctions and asset freezes among methods undermining global trade"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261031/russia-at-g20-meeting-flags-sanctions-and-asset-freezes-among-methods-undermining-global-trade---1124983335.html",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Фон безопасности: США, Япония и Южная Корея укрепили партнёрство и подписали соглашение об Арктике, Вашингтон перебрасывает авианосцы на Ближний Восток.",
        "en": "Security backdrop: the US, Japan and South Korea strengthened their partnership and signed an Arctic agreement, while Washington moves carriers to the Middle East."
      },
      "why": {
        "ru": "Перестройка блоков вокруг России и Китая — контекст для региона, но собственных данных недели нет.",
        "en": "The realignment of blocs around Russia and China is context for the region, but there are no weekly data of its own."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "aa-us-japan-sk-arctic",
          "title": {
            "ru": "США, Япония и Южная Корея укрепили партнёрство и подписали соглашение об Арктике",
            "en": "US, Japan, South Korea strengthen partnership, sign Arctic cooperation agreement"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/us-japan-south-korea-strengthen-partnership-sign-arctic-cooperation-agreement/4107026",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "twz-carriers-oct27",
          "title": {
            "ru": "Где авианосцы: 27 октября 2026 года",
            "en": "Where are the aircraft carriers: October 27, 2026"
          },
          "domain": "twz.com",
          "url": "https://www.twz.com/sea/where-are-the-aircraft-carriers-october-27-2026",
          "publication_date": "2026-10-27",
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
