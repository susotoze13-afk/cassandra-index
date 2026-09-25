window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  // Миграция таск 09 (R55): новая схема источника, маппинг — как в sources.js
  // демо-недели ('OSINT' — спутниковые/полевые наблюдения, иначе 'secondary';
  // 'A-mainstream' — агентства/СМИ, 'C-registries' — институты и реестры;
  // state_affiliated: true только для dw.com). Тексты не изменены.
  s.regions["south-asia"] = {
  "index": 60,
  "delta": 2,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Обстрелы на линии разграничения участились по данным наблюдателей.",
        "en": "Observers report more exchanges of fire along the line of control."
      },
      "why": {
        "ru": "Частые обстрелы поддерживают высокий уровень боевого сдерживания.",
        "en": "Frequent fire keeps the level of military deterrence high."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "apnews-com-article-pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
          "title": {
            "ru": "Пакистан наносит удары по Афганистану; пограничные бои не стихают",
            "en": "Pakistan strikes inside Afghanistan with no letup in border fighting"
          },
          "domain": "apnews.com",
          "url": "https://apnews.com/article/pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
          "publication_date": "2026-02-28",
          "accessed_date": "2026-08-23",
          "source_type": "OSINT",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "reliefweb-int-report-south-sudan-south-sudan-humanitarian-access-snapshot-may-2026",
          "title": {
            "ru": "Южный Судан: снимок гуманитарного доступа (май 2026 года)",
            "en": "South Sudan: Humanitarian Access Snapshot (May 2026)"
          },
          "domain": "reliefweb.int",
          "url": "https://reliefweb.int/report/south-sudan/south-sudan-humanitarian-access-snapshot-may-2026",
          "publication_date": "2026-06-15",
          "accessed_date": "2026-08-23",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "В регионе испытываются новые ракетные комплексы средней дальности.",
        "en": "New medium-range missile systems are being tested in the region."
      },
      "why": {
        "ru": "Испытания ракет средней дальности усиливают циклы демонстрации сил.",
        "en": "Medium-range missile tests strengthen cycles of shows of force."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "www-dw-com-en-ukraine-9-countries-form-ballistic-missile-defense-coalition-live-77927840",
          "title": {
            "ru": "Украина и девять стран создают коалицию противоракетной обороны",
            "en": "Ukraine, 9 nations form ballistic missile defense coalition"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/en/ukraine-9-countries-form-ballistic-missile-defense-coalition/live-77927840",
          "publication_date": "2026-07-13",
          "accessed_date": "2026-08-23",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": true
        },
        {
          "id": "www-reuters-com-graphics-india-china-border-bdwpkadxqpm",
          "title": {
            "ru": "Индо-китайский спор: спутниковые снимки показывают новые сооружения возле места пограничного столкновения",
            "en": "India-China dispute: Satellite Images show new structures near site of border clash"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/graphics/INDIA-CHINA/BORDER/bdwpkadxqpm/",
          "publication_date": "2020-06-25",
          "accessed_date": "2026-08-23",
          "source_type": "OSINT",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
