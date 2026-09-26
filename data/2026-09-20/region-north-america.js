window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.regions["north-america"] = {
  "index": 56,
  "delta": 15,
  "status": "danger",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Президент США подписал в закон санкционный акт против России; в России его назвали «адскими санкциями», на фоне чего звучали призывы отвечать «языком военного сдерживания».",
        "en": "The US president signed a sanctions act against Russia into law; in Russia it was called 'hellish sanctions', amid calls to answer with the 'language of military deterrence'."
      },
      "why": {
        "ru": "Закон закрепляет санкционный курс на законодательном уровне, а ответная риторика увеличивает дистанцию между сторонами.",
        "en": "The law entrenches the sanctions course at the legislative level, and the response rhetoric widens the distance between the parties."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "www-reuters-com-trump-signs-russia-sanctions-bill",
          "title": {
            "ru": "Трамп подписал закон о санкциях против России",
            "en": "Trump signs Russia sanctions bill into law"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/us/trump-signs-russia-sanctions-bill-into-law-2026-09-18/",
          "publication_date": "2026-09-18",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-dw-com-ru-zakon-grema-a-79335094",
          "title": {
            "ru": "Трамп подписал закон Грэма об «адских санкциях» против РФ",
            "en": "Trump signs Graham Act on 'hellish sanctions' against Russia"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/ru/tramp-podpisal-zakon-lindsi-grema-ob-adskih-sankciah-protiv-rossii/a-79335094",
          "publication_date": "2026-09-19",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Госдепартамент США одобрил возможную продажу Украине средств ПВО на $2,6 млрд; Дания ускорила пакет помощи Украине на $275 млн после инцидента с Россией.",
        "en": "The US State Department approved a potential $2.6 billion sale of air-defence equipment to Ukraine; Denmark expedited a $275 million Ukraine aid package after an incident with Russia."
      },
      "why": {
        "ru": "Крупные оборонные поставки поддерживают длительный характер конфликта и военное планирование всех сторон.",
        "en": "Major defence deliveries support the protracted character of the conflict and the military planning of all parties."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "www-cbsnews-com-air-defense-sale-ukraine",
          "title": {
            "ru": "Госдеп одобрил возможную продажу Украине средств ПВО на $2,6 млрд",
            "en": "State Department approves potential sale of $2.6 billion in air defense equipment to Ukraine"
          },
          "domain": "cbsnews.com",
          "url": "https://www.cbsnews.com/news/us-ukraine-russia-war-air-defense-state-department/",
          "publication_date": "2026-09-19",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-bloomberg-com-denmark-expedites-275-million",
          "title": {
            "ru": "Дания ускоряет пакет помощи Украине на $275 млн после инцидента с Россией",
            "en": "Denmark Expedites $275 Million Ukraine Aid After Russia Bust-Up"
          },
          "domain": "bloomberg.com",
          "url": "https://www.bloomberg.com/news/articles/2026-09-18/denmark-expedites-275-million-ukraine-aid-after-russia-bust-up",
          "publication_date": "2026-09-18",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
