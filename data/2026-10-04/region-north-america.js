window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-04"] = window.CI_DATA.snapshots["2026-10-04"] || {};
  s.regions["north-america"] = {
  "index": 26,
  "delta": -2,
  "status": "tense",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "29.09 в США вступили в силу импортные запреты на ряд канадских товаров (алкоголь, молочная продукция, мотоциклы, около $1 млрд) в ответ на контрмеры Оттавы — эскалация торговой войны между союзниками.",
        "en": "On 29.09 US import bans on a range of Canadian goods (alcohol, dairy, motorcycles, about $1 billion) took effect in response to Ottawa's countermeasures — an escalation of the trade war between allies."
      },
      "why": {
        "ru": "Прямое ограничение торговых связей внутри НАТО — экономический трек драйвера D4 и одновременно сигнал о трении в североамериканском альянсе.",
        "en": "A direct restriction of trade inside NATO — the D4 economic track and at the same time a signal of friction in the North American alliance."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "cnbc-canada-import-ban-in-force",
          "title": {
            "ru": "Американские ограничения на импорт канадских товаров вступили в силу: список запрещённых товаров",
            "en": "America's Canadian import restrictions come into force. Here are the products barred"
          },
          "domain": "cnbc.com",
          "url": "https://www.cnbc.com/2026/09/29/canada-import-ban-trade-war.html",
          "publication_date": "2026-09-29",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "guardian-us-ban-on-canadian-imports",
          "title": {
            "ru": "Запрет США на канадский импорт грозит ещё больше ослабить хрупкие отношения",
            "en": "US ban on Canadian imports likely to weaken already fragile relations"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/us-news/2026/sep/29/ban-canada-imports",
          "publication_date": "2026-09-29",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Пентагон 30.09 подтвердил полное завершение вывода войск США из Ирака — завершено 23-летнее присутствие.",
        "en": "On 30.09 the Pentagon confirmed the completed withdrawal of US troops from Iraq, ending a 23-year presence."
      },
      "why": {
        "ru": "Крупнейшее деэскалационное событие недели: выход третьей стороны из конфликта (D7.4, уровень 3).",
        "en": "The week's largest de-escalation event: withdrawal of a third party from the conflict (D7.4, level 3)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "theguardian-com-pentagon-withdrawal-iraq",
          "title": {
            "ru": "Пентагон сообщает о формальном завершении вывода войск США из Ирака",
            "en": "Pentagon says it has formally completed withdrawal of US troops from Iraq"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/us-news/2026/sep/30/pentagon-formal-withdrawal-troops-iraq",
          "publication_date": "2026-09-30",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "cnn-com-us-troops-complete-iraq-exit",
          "title": {
            "ru": "Войска США завершили выход из Ирака, Иран и его союзники празднуют",
            "en": "US troops complete Iraq exit, as Iran and its allies celebrate"
          },
          "domain": "cnn.com",
          "url": "https://www.cnn.com/2026/09/30/middleeast/us-military-withdrawal-iraq-intl",
          "publication_date": "2026-09-30",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
