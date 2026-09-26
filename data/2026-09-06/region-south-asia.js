window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  s.regions["south-asia"] = {
  "index": 42,
  "delta": -9,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Россия продлила запрет на экспорт дизельного топлива производителями до 30 сентября 2026 года; по оценкам рынка, это ужесточает глобальный баланс средних дистиллятов и влияет на цены в Азии.",
        "en": "Russia extended the producers’ ban on diesel exports to 30 September 2026; market assessments say this tightens the global balance of middle distillates and affects prices in Asia."
      },
      "why": {
        "ru": "Южная Азия — крупнейший импортный рынок дистиллятов: перебои экспорта напрямую бьют по стоимости топлива и логистики региона.",
        "en": "South Asia is the largest import market for distillates: export disruptions directly hit the region’s fuel and logistics costs."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "commodity-board-diesel-ban-distillate-supply",
          "title": {
            "ru": "Россия продлевает запрет на экспорт дизельного топлива до 30 сентября 2026 года, ужесточая глобальный баланс средних дистиллятов",
            "en": "Russia extends diesel export ban to 30 September 2026, tightening global middle-distillate supply"
          },
          "domain": "commodity-board.com",
          "url": "https://commodity-board.com/%D1%80%D0%BE%D1%81%D1%81%D0%B8%D1%8F-%D0%BF%D1%80%D0%BE%D0%B4%D0%BB%D0%B5%D0%B2%D0%B0%D0%B5%D1%82-%D0%B7%D0%B0%D0%BF%D1%80%D0%B5%D1%82-%D0%BD%D0%B0-%D1%8D%D0%BA%D1%81%D0%BF%D0%BE%D1%80%D1%82-%D0%B4%D0%B8%D0%B7%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%B2%D0%B0-%D0%B4%D0%BE-30-%D1%81%D0%B5%D0%BD%D1%82%D1%8F%D0%B1%D1%80%D1%8F-2026-%D0%B3%D0%BE%D0%B4%D0%B0",
          "publication_date": "2026-09-01",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        },
        {
          "id": "cargorun-ru-diesel-export-ban-extended",
          "title": {
            "ru": "Запрет на экспорт дизтоплива производителями продлён до 30 сентября 2026 года",
            "en": "Diesel fuel export ban for producers extended to 30 September 2026"
          },
          "domain": "cargorun.ru",
          "url": "https://cargorun.ru/blog/novosti/zapret-eksport-diztopliva-30-sentyabrya-2026",
          "publication_date": "2026-08-31",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "marketpower-diesel-ban-winter-stockpiles",
          "title": {
            "ru": "Власти России продлили запрет на экспорт дизельного топлива до 30 сентября 2026 года для формирования запасов на зиму",
            "en": "Russia extends diesel export ban to 30 September 2026 to build winter fuel reserves"
          },
          "domain": "marketpower.pro",
          "url": "https://marketpower.pro/publications/vlasti-rossii-prodlili-zapret-na-eksport-dizelnogo-topliva-do-30-sentiabria",
          "publication_date": "2026-09-03",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Независимый мониторинг за август не зафиксировал пусков и смены ядерной риторики; ISW подтверждает отсутствие технических сигналов стратегических сил в окне.",
        "en": "Independent August monitoring recorded no launches or shifts in nuclear rhetoric; ISW confirms an absence of strategic-forces technical signals in the window."
      },
      "why": {
        "ru": "Аттестованное отсутствие сигналов сдерживания снижает неопределённость по одному из самых чувствительных направлений региона.",
        "en": "An attested absence of deterrent signals reduces uncertainty in one of the region’s most sensitive domains."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "isans-org-belarus-military-review-august-2026",
          "title": {
            "ru": "Обзор военной активности в Беларуси за август 2026 года",
            "en": "Review of military activity in Belarus, August 2026"
          },
          "domain": "isans.org",
          "url": "https://isans.org/military-ru/obzor-voennoj-aktivnosti-v-belarusi-za-avgust-2026.html",
          "publication_date": "2026-09-01",
          "accessed_date": "2026-09-26",
          "source_type": "OSINT",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "understandingwar-org-roca-september-4-2026",
          "title": {
            "ru": "ISW: оценка российского наступления, 4 сентября 2026",
            "en": "ISW Russian Offensive Campaign Assessment, September 4, 2026"
          },
          "domain": "understandingwar.org",
          "url": "https://understandingwar.org/research/russia-ukraine/russian-offensive-campaign-assessment-september-4-2026/",
          "publication_date": "2026-09-04",
          "accessed_date": "2026-09-26",
          "source_type": "OSINT",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
