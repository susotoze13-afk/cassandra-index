window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["russia-belarus"] = {
  "index": 71,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Кремль говорит, что подготовка трёхсторонних переговоров не требует паузы в боях, и что переговоры возобновятся после 4 ноября; Зеленский предложил провести трёхстороннюю встречу в Турции.",
        "en": "The Kremlin says preparing trilateral talks does not require a pause in fighting and that talks will resume after 4 November; Zelensky proposed holding a trilateral meeting in Turkey."
      },
      "why": {
        "ru": "Переговорный трек без прекращения огня — сигнал Д3.4: дипломатия идёт, но не как деэскалация.",
        "en": "A negotiating track without a ceasefire is a D3.4 signal: diplomacy proceeds, but not as de-escalation."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "sputnik-trilateral-resume",
          "title": {
            "ru": "Кремль: трёхсторонние переговоры по Украине возобновятся после 4 ноября",
            "en": "Kremlin says trilateral talks on Ukraine to resume after November 4"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261029/kremlin-says-trilateral-talks-on-ukraine-to-resume-after-november-4-1124971137.html",
          "publication_date": "2026-10-29",
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
        },
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Чёрное море остаётся зоной ударов: российские силы поразили грузовое судно южнее Одессы и судно со снабжением украинских сил; черноморские страны НАТО осудили распространение войны на коммерческое судоходство.",
        "en": "The Black Sea remains a strike zone: Russian forces hit a cargo ship south of Odesa and a vessel supplying Ukrainian forces; NATO Black Sea states condemned the spillover of war onto commercial shipping."
      },
      "why": {
        "ru": "Удары по судоходству (Д7.2, Д9.3) переносят конфликт на торговые маршруты — это удерживает эскалацию на высоком уровне.",
        "en": "Strikes on shipping (D7.2, D9.3) move the conflict onto trade routes, keeping escalation high."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "tass-cargo-ship-odessa",
          "title": {
            "ru": "Российские силы поразили грузовое судно в 37 км южнее Одессы",
            "en": "Russian forces hit cargo ship 37 km south of Odessa — Defense Ministry"
          },
          "domain": "tass.com",
          "url": "https://tass.com/defense/2211383",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "sputnik-black-sea-ship",
          "title": {
            "ru": "Россия ударила по судну со снабжением украинских сил в Чёрном море",
            "en": "Russia strikes ship with supplies to Ukrainian forces in Black Sea"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261029/russia-strikes-ship-with-supplies-to-ukrainian-forces-in-black-sea--mod-1124975973.html",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "defensenews-black-sea-nations",
          "title": {
            "ru": "Черноморские страны НАТО осудили распространение войны на коммерческое судоходство",
            "en": "NATO's Black Sea nations decry Ukraine war spillover endangering commercial ship traffic"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/29/natos-black-sea-nations-decry-ukraine-war-spillover-endangering-commercial-ship-traffic/",
          "publication_date": "2026-10-29",
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
