window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["south-caucasus"] = {
  "index": 73,
  "delta": 7,
  "status": "very",
  "background": false,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Собственных сигналов в окне недели не собрано; фон — переговорный трек по Украине: Кремль говорит о возобновлении трёхсторонних переговоров после 4 ноября, Зеленский предложил площадку в Турции.",
        "en": "No signals of its own were collected in the week window; the backdrop is the Ukraine negotiating track: the Kremlin speaks of resuming trilateral talks after 4 November and Zelensky proposed a venue in Turkey."
      },
      "why": {
        "ru": "Индекс отражает глобальный фон; атрибуции событий региону в источниках недели нет.",
        "en": "The index reflects the global backdrop; the week's sources contain no attribution of events to the region."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "report-zelensky-trilateral",
          "title": {
            "ru": "Зеленский предложил провести трёхсторонние переговоры в Турции",
            "en": "Zelensky proposes holding trilateral talks in Turkiye"
          },
          "domain": "report.az",
          "url": "https://report.az/en/other-countries/zelensky-proposes-holding-trilateral-talks-in-turkiye",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "aa-kremlin-trilateral-pause",
          "title": {
            "ru": "Кремль: подготовка трёхсторонних переговоров не требует паузы в боевых действиях",
            "en": "Kremlin says preparations for trilateral talks do not require pause to fighting"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/kremlin-says-preparations-for-trilateral-talks-do-not-require-pause-to-fighting/4106812",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Экономический фон — удары по судоходству в Ормузе и рост нефтяных цен: импортёры пересматривают маршруты, Brent подошёл к $120.",
        "en": "The economic backdrop is strikes on Hormuz shipping and rising oil prices: importers are revisiting routes as Brent approached $120."
      },
      "why": {
        "ru": "Канал Д4.6 действует на регион через импорт, а не через собственные события недели — уверенность пониженная.",
        "en": "The D4.6 channel reaches the region through imports rather than its own weekly events — confidence is low."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "gcaptain-hormuz-economic-pain",
          "title": {
            "ru": "Удары по судоходству в Ормузе бьют по экономике обеих сторон",
            "en": "Shipping strikes in Hormuz leave both sides with economic pain"
          },
          "domain": "gcaptain.com",
          "url": "https://gcaptain.com/shipping-strikes-in-hormuz-leave-both-sides-with-economic-pain/",
          "publication_date": "2026-11-01",
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
    }
  ]
};
})();
