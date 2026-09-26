window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  // Редакционный сид региона middle-east (неделя 2026-09-13, R55): два драйвера региона.
  // Источники — verbatim-записи из calc/input/2026-09-13.json. index/delta/status
  // пересчитываются пайплайном; confidence — редакционная.
  s.regions["middle-east"] = {
  "index": 60,
  "delta": -20,
  "status": "danger",
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Совет управляющих МАГАТЭ принял резолюцию по выполнению соглашения о гарантиях НПТ с Ираном; заседание сопровождалось заявлениями сторон.",
        "en": "The IAEA Board of Governors adopted a resolution on implementation of the NPT safeguards agreement with Iran; the session was accompanied by statements from the parties."
      },
      "why": {
        "ru": "Формальная резолюция по иранским гарантиям повышает давление на Тегеран и усиливает неопределённость вокруг ядерной программы региона.",
        "en": "A formal resolution on Iran’s safeguards raises pressure on Tehran and adds uncertainty around the region’s nuclear programme."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "gov-uk-iaea-iran-resolution-september-2026",
          "title": {
            "ru": "Резолюция Совета управляющих МАГАТЭ по гарантиям НПТ с Ираном, сентябрь 2026",
            "en": "NPT Safeguards Agreement with Iran: Resolution to the IAEA Board of Governors, September 2026"
          },
          "domain": "gov.uk",
          "url": "https://www.gov.uk/government/speeches/npt-safeguards-agreement-with-iran-resolution-to-the-iaea-board-of-governors-september-2026",
          "publication_date": "2026-09-10",
          "accessed_date": "2026-09-26",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "iranwatch-org-iaea-board-resolution-september-2026",
          "title": {
            "ru": "Резолюция Совета управляющих МАГАТЭ: выполнение соглашения о гарантиях НПТ с Ираном, сентябрь 2026",
            "en": "IAEA Board Resolution: Implementation of the NPT Safeguards Agreement with Iran, September 2026"
          },
          "domain": "iranwatch.org",
          "url": "https://www.iranwatch.org/library/multilateral-organizations/international-atomic-energy-agency/iaea-resolution/iaea-board-resolution-implementation-npt-safeguards-agreement-0",
          "publication_date": "2026-09-09",
          "accessed_date": "2026-09-26",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "iaea-org-dg-statement-board-7-september-2026",
          "title": {
            "ru": "МАГАТЭ: вступительное заявление генерального директора на Совете управляющих, 7 сентября 2026",
            "en": "IAEA Director General's Introductory Statement to the Board of Governors, 7 September 2026"
          },
          "domain": "iaea.org",
          "url": "https://www.iaea.org/newscenter/statements/iaea-director-generals-introductory-statement-to-the-board-of-governors-7-september-2026",
          "publication_date": "2026-09-07",
          "accessed_date": "2026-09-26",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Хуситы захватили остров Перим в Красном море; США и Иран перешли к атакам на танкеры в ответ на военные корабли; нефть Brent подорожала выше 100 долларов.",
        "en": "The Houthis seized Perim island in the Red Sea; the United States and Iran moved to attacking tankers in response to military ships; Brent crude rose above USD 100."
      },
      "why": {
        "ru": "Перехват контроля в районе пролива и переход к атакам на танкеры угрожают одному из ключевых энергетических маршрутов мира.",
        "en": "Seizing control near the strait and moving to attacks on tankers threatens one of the world’s key energy routes."
      },
      "contribution": "high",
      "confidence": "high",
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
    }
  ]
};
})();
