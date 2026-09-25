window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-16"] = window.CI_DATA.snapshots["2026-08-16"] || {};
  // Миграция таск 09 (R55): новая схема источника. source_type: 'OSINT' —
  // спутниковые/полевые наблюдения, иначе 'secondary'. cluster_id: 'A-mainstream'
  // — информационные агентства/СМИ, 'C-registries' — институты и реестры.
  // state_affiliated: true только для dw.com (общественно-правовое вещание,
  // финансируется государством). Отображаемые тексты не изменены.
  s.sources = [
  {
    "id": "www-reuters-com-graphics-india-china-border-bdwpkadxqpm",
    "title": {
      "ru": "Индо-китайский спор: спутниковые снимки показывают новые сооружения возле места пограничного столкновения",
      "en": "India-China dispute: Satellite Images show new structures near site of border clash"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/graphics/INDIA-CHINA/BORDER/bdwpkadxqpm/",
    "publication_date": "2020-06-25",
    "accessed_date": "2026-08-09",
    "source_type": "OSINT",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "apnews-com-article-pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
    "title": {
      "ru": "Пакистан наносит удары по Афганистану; пограничные бои не стихают",
      "en": "Pakistan strikes inside Afghanistan with no letup in border fighting"
    },
    "domain": "apnews.com",
    "url": "https://apnews.com/article/pakistan-afghanistan-border-clashes-air-strikes-b24a3f12e630e8dd30f8a4841f2c4198",
    "publication_date": "2026-02-28",
    "accessed_date": "2026-08-09",
    "source_type": "OSINT",
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
    "accessed_date": "2026-08-09",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": true
  },
  {
    "id": "news-un-org-en-story-2026-07-1167860",
    "title": {
      "ru": "Совет Безопасности: экстренное заседание по иранской атаке в Бахрейне",
      "en": "Security Council LIVE: Emergency meeting on Iranian attack in Bahrain"
    },
    "domain": "un.org",
    "url": "https://news.un.org/en/story/2026/07/1167860",
    "publication_date": "2026-07-02",
    "accessed_date": "2026-08-09",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-sipri-org-media-press-release-2026-global-military-spending-rise-continues-european-and-asian-expenditures-surge",
    "title": {
      "ru": "Рост мировых военных расходов продолжается на фоне всплеска трат в Европе и Азии",
      "en": "Global military spending rise continues as European and Asian expenditures surge"
    },
    "domain": "sipri.org",
    "url": "https://www.sipri.org/media/press-release/2026/global-military-spending-rise-continues-european-and-asian-expenditures-surge",
    "publication_date": "2026-04-27",
    "accessed_date": "2026-08-09",
    "source_type": "secondary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "www-crisisgroup-org-europe-eastern-europe-ukraine",
    "title": {
      "ru": "CrisisWatch: Украина, июль 2026 года",
      "en": "CrisisWatch Ukraine July 2026"
    },
    "domain": "crisisgroup.org",
    "url": "https://www.crisisgroup.org/europe/eastern-europe/ukraine",
    "publication_date": "2026-06-26",
    "accessed_date": "2026-08-09",
    "source_type": "secondary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  }
];
})();
