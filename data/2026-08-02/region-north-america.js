window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-02"] = window.CI_DATA.snapshots["2026-08-02"] || {};
  // Миграция таск 09 (R55): новая схема источника, маппинг — как в sources.js
  // демо-недели ('OSINT' — спутниковые/полевые наблюдения, иначе 'secondary';
  // 'A-mainstream' — агентства/СМИ, 'C-registries' — институты и реестры;
  // state_affiliated: true только для dw.com). Тексты не изменены.
  s.regions["north-america"] = {
  "index": 43,
  "delta": 0,
  "status": "danger",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "В регионе завершён цикл учений стратегических сил без отклонений.",
        "en": "The region completed a strategic forces exercise cycle without incidents."
      },
      "why": {
        "ru": "Завершение цикла без инцидентов снижает краткосрочную напряжённость.",
        "en": "An incident-free cycle lowers short-term tension."
      },
      "contribution": "low",
      "confidence": "high",
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
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": true
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
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Дипломатические контакты по линии оборонных ведомств сохраняются.",
        "en": "Defence-ministry diplomatic contacts remain in place."
      },
      "why": {
        "ru": "Рабочие каналы связи снижают риск ошибочной эскалации.",
        "en": "Working communication channels reduce the risk of accidental escalation."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "news-un-org-en-story-2026-07-1167860",
          "title": {
            "ru": "Совет Безопасности: экстренное заседание по иранской атаке в Бахрейне",
            "en": "Security Council LIVE: Emergency meeting on Iranian attack in Bahrain"
          },
          "domain": "un.org",
          "url": "https://news.un.org/en/story/2026/07/1167860",
          "publication_date": "2026-07-02",
          "accessed_date": "2026-07-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
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
