window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-09"] = window.CI_DATA.snapshots["2026-08-09"] || {};
  // Миграция таск 09 (R55): новая схема источника, маппинг — как в sources.js
  // демо-недели ('OSINT' — спутниковые/полевые наблюдения, иначе 'secondary';
  // 'A-mainstream' — агентства/СМИ, 'C-registries' — институты и реестры;
  // state_affiliated: true только для dw.com). Тексты не изменены.
  s.regions["east-asia"] = {
  "index": 50,
  "delta": 1,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Активность военно-морских учений в ключевом проливе выше среднего уровня за год.",
        "en": "Naval exercise activity in the key strait is above the yearly average."
      },
      "why": {
        "ru": "Устойчивая активность флота в узком проливе повышает риск морских инцидентов.",
        "en": "Sustained fleet activity in a narrow strait raises the risk of maritime incidents."
      },
      "contribution": "medium",
      "confidence": "medium",
      "confidenceNote": {
        "ru": "Неполное покрытие источников по морской зоне.",
        "en": "Incomplete source coverage for the maritime zone."
      },
      "sources": [
        {
          "id": "reliefweb-int-report-mauritania-unhcr-deeply-saddened-144-people-reportedly-dead-or-missing-west-africa",
          "title": {
            "ru": "УВКБ ООН: 144 человека, предположительно, погибли или пропали без вести у берегов Западной Африки",
            "en": "UNHCR deeply saddened as 144 people reportedly dead or missing off West Africa"
          },
          "domain": "reliefweb.int",
          "url": "https://reliefweb.int/report/mauritania/unhcr-deeply-saddened-144-people-reportedly-dead-or-missing-west-africa",
          "publication_date": "2026-07-21",
          "accessed_date": "2026-08-02",
          "source_type": "OSINT",
          "cluster_id": "C-registries",
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
          "accessed_date": "2026-08-02",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Государства региона увеличили частоту патрулирования воздушного пространства.",
        "en": "States in the region increased airspace patrol frequency."
      },
      "why": {
        "ru": "Рост патрулирования — реакция на серию сближений военных самолётов.",
        "en": "More patrols respond to a series of military aircraft close encounters."
      },
      "contribution": "medium",
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
          "accessed_date": "2026-08-02",
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
          "accessed_date": "2026-08-02",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
