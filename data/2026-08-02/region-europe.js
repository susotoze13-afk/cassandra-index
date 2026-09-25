window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-02"] = window.CI_DATA.snapshots["2026-08-02"] || {};
  // Миграция таск 09 (R55): новая схема источника, маппинг — как в sources.js
  // демо-недели ('OSINT' — спутниковые/полевые наблюдения, иначе 'secondary';
  // 'A-mainstream' — агентства/СМИ, 'C-registries' — институты и реестры;
  // state_affiliated: true только для dw.com). Тексты не изменены.
  s.regions["europe"] = {
  "index": 64,
  "delta": 0,
  "status": "very",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "В восточных районах региона фиксируется рост числа учений с боевой стрельбой.",
        "en": "More live-fire exercises are being recorded in the region’s eastern districts."
      },
      "why": {
        "ru": "Регулярные учения повышают плотность сил и риск инцидентов на границах.",
        "en": "Regular drills increase force density and the risk of border incidents."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "www-bbc-com-news-articles-c2e2vjl2ry8o",
          "title": {
            "ru": "Станция Чаринг-кросс использована для крупных военных учений",
            "en": "Charing Cross Tube station used for major military exercise"
          },
          "domain": "bbc.com",
          "url": "https://www.bbc.com/news/articles/c2e2vjl2ry8o",
          "publication_date": "2026-05-24",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-dw-com-en-ukraine-9-countries-form-ballistic-missile-defense-coalition-live-77927840",
          "title": {
            "ru": "Украина и девять стран создают коалицию противоракетной обороны",
            "en": "Ukraine, 9 nations form ballistic missile defense coalition"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/en/ukraine-9-countries-form-ballistic-missile-defense-coalition/live-77927840",
          "publication_date": "2026-07-13",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Поставки систем ПВО странам региона продолжаются третий месяц подряд.",
        "en": "Air-defence deliveries to states in the region continue for a third straight month."
      },
      "why": {
        "ru": "Наращивание ПВО сопровождается ростом боевого дежурства в воздушном пространстве.",
        "en": "Air-defence build-up comes with higher alert status in regional airspace."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "www-crisisgroup-org-europe-eastern-europe-ukraine",
          "title": {
            "ru": "CrisisWatch: Украина, июль 2026 года",
            "en": "CrisisWatch Ukraine July 2026"
          },
          "domain": "crisisgroup.org",
          "url": "https://www.crisisgroup.org/europe/eastern-europe/ukraine",
          "publication_date": "2026-06-26",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
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
          "accessed_date": "2026-07-26",
          "source_type": "OSINT",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
