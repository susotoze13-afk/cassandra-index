window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["ukraine-moldova"] = {
  "index": 73,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Эвакуация Олешек завершилась: жителей вывезли в Украину, они воссоединились с семьями, омбудсмен РФ объявил о завершении миссии и договорённости о регулярных гуманитарных миссиях; ООН назвала перемирие «надеждой» для гражданских.",
        "en": "The Oleshky evacuation is complete: residents were taken to Ukraine and reunited with their families, Russia's ombudsman announced the end of the mission and an agreement on regular humanitarian missions, and the UN called the truce \"hope\" for civilians."
      },
      "why": {
        "ru": "Единственный деэскалационный сигнал недели (Д3.5, Д8.2) — он снижает вклад региона, но остаётся локальным.",
        "en": "The week's only de-escalatory signal (D3.5, D8.2) lowers the region's contribution but remains local."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "cbs-oleshky-evacuation",
          "title": {
            "ru": "Жителей оккупированного Россией города вывезли в Украину в ходе перемирия при посредничестве США",
            "en": "Ukrainians trapped in Russia-held city evacuate during local ceasefire"
          },
          "domain": "cbsnews.com",
          "url": "https://www.cbsnews.com/news/residents-evacuated-oleshky-arrive-ukraine-temporary-us-brokered-ceasefire/",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "france24-oleshky-evacuees",
          "title": {
            "ru": "Жители оккупированных Россией Олешек воссоединились с семьями после эвакуации",
            "en": "Residents from Russian-occupied Oleshky reunite with families after evacuation"
          },
          "domain": "france24.com",
          "url": "https://www.france24.com/en/europe/20261031-evacuees-from-russian-occupied-oleshky-arrive-in-ukraine",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "sputnik-alyoshki-mission-end",
          "title": {
            "ru": "Гуманитарная миссия в Алёшках завершается — омбудсмен РФ",
            "en": "Humanitarian mission in Alyoshki coming to end — Russian ombudswoman"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261030/humanitarian-mission-in-alyoshki-coming-to-end---russian-ombudswoman-1124980382.html",
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
        "ru": "Удары по энергетике и логистике: Киевская ТЭЦ-6 и железнодорожный вокзал в Днепре (13 погибших), в Чернигове погибли две девушки; Зеленский говорит о сложной ситуации с энергоснабжением. США одобрили продажу ракет Patriot на $2,1 млрд, Украина завершила работу над новой системой ПРО.",
        "en": "Strikes on energy and logistics: Kyiv CHPP-6 and the railway station in Dnipro (13 killed), two teenage girls killed in Chernihiv; Zelensky describes a difficult power supply situation. The US approved a $2.1bn Patriot sale and Ukraine completed work on a new air-defence system."
      },
      "why": {
        "ru": "Энергетика и железнодорожная логистика — цели ударов (Д1.4, Д7.1), а внешние поставки ПВО (Д4.2) меняют баланс, не снижая интенсивность.",
        "en": "Energy and rail logistics are strike targets (D1.4, D7.1), while external air-defence supplies (D4.2) shift the balance without reducing intensity."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "sputnik-chpp6-strike",
          "title": {
            "ru": "Российские силы ударили по Киевской ТЭЦ-6, обеспечивавшей военную логистику",
            "en": "Russian forces hit Kiev CHPP-6 supplying energy to Ukrainian military logistics"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261031/russian-forces-hit-kiev-chpp-6-supplying-energy-to-ukrainian-military-logistics---mod-1124982131.html",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "un-news-dnipro-station",
          "title": {
            "ru": "Российский удар дроном по железнодорожному вокзалу в Украине: 13 погибших",
            "en": "Russia drone strike on Ukrainian railway station kills 13"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/feed/view/en/story/2026/10/1168702",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "aa-patriot-sale-ukraine",
          "title": {
            "ru": "США одобрили продажу Украине ракет Patriot на $2,1 млрд",
            "en": "US approves $2.1B Patriot missile sale to Ukraine"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/us-approves-21b-patriot-missile-sale-to-ukraine/4106902",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
})();
