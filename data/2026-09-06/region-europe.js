window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  s.regions["europe"] = {
  "index": 42,
  "delta": -9,
  "status": "danger",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Германия обвинила Россию в атаке дронов в аэропорту Лейпцига и анонсировала закрытие Русского дома и генконсульства; Берлин ввёл санкции в ответ на диверсию.",
        "en": "Germany accused Russia of a drone attack at Leipzig airport and announced the closure of the Russian House and its consulate general; Berlin imposed sanctions in response to the sabotage."
      },
      "why": {
        "ru": "Инцидент на территории страны НАТО и взаимные меры ухудшают доверие между столицами и повышают риск цепных реакций.",
        "en": "An incident on NATO territory and reciprocal measures erode trust between capitals and raise the risk of chain reactions."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "kommersant-ru-germany-accuses-leipzig-8923569",
          "title": {
            "ru": "Германия обвинила Россию в инциденте с дроном в аэропорту Лейпцига",
            "en": "Germany accuses Russia over drone incident at Leipzig airport"
          },
          "domain": "kommersant.ru",
          "url": "https://www.kommersant.ru/doc/8923569",
          "publication_date": "2026-09-01",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "kommersant-ru-leipzig-consulate-closure-8924215",
          "title": {
            "ru": "Германия обвинила Россию в атаке дронов в Лейпциге и анонсировала закрытие Русского дома и генконсульства",
            "en": "Germany accuses Russia of Leipzig drone attack, announces closure of Russian House and consulate general"
          },
          "domain": "kommersant.ru",
          "url": "https://www.kommersant.ru/doc/8924215",
          "publication_date": "2026-09-02",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "dw-com-germany-response-leipzig-sanctions",
          "title": {
            "ru": "Ответ Германии на диверсию с дронами в Лейпциге: обвинение в адрес России и санкции",
            "en": "Germany's response to Leipzig drone sabotage: accusations against Russia and sanctions"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/ru/otvet-germanii-na-diversiu-s-dronami-v-lejpcige/a-78844842",
          "publication_date": "2026-09-03",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "В Латвии начались учения Namejs-2026 с участием 12 тысяч военнослужащих; Путин вновь публично опроверг слухи о мобилизации после выборов в Госдуму; издания разбирают сценарий новой волны призыва.",
        "en": "Exercise Namejs-2026 began in Latvia with 12,000 troops; Putin again publicly denied rumours of mobilisation after the Duma elections; outlets examine the scenario of a new conscription wave."
      },
      "why": {
        "ru": "Плотность учений на фланге альянса в сочетании с мобилизационной риторикой удерживает повышенную готовность сил.",
        "en": "Dense drills on the alliance’s flank combined with mobilisation rhetoric keep forces at heightened readiness."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "ura-news-namejs-2026-latvia-start",
          "title": {
            "ru": "В Латвии начались учения НАТО Namejs-2026 с участием 12 тысяч военнослужащих из США, Канады и Прибалтики",
            "en": "NATO's Namejs-2026 exercise begins in Latvia with 12,000 troops from the US, Canada and the Baltics"
          },
          "domain": "ura.news",
          "url": "https://ura.news/news/1053123716",
          "publication_date": "2026-09-02",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "ura-news-putin-otverg-mobilizaciyu",
          "title": {
            "ru": "Путин вновь опроверг слухи о мобилизации после выборов в Госдуму",
            "en": "Putin again denies rumours of mobilisation after State Duma elections"
          },
          "domain": "ura.news",
          "url": "https://ura.news/news/1053123991",
          "publication_date": "2026-09-03",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "klerk-ru-mobilization-after-elections",
          "title": {
            "ru": "Мобилизация после выборов 2026 года: будет ли новая волна",
            "en": "Mobilisation after the 2026 elections: will there be a new wave"
          },
          "domain": "klerk.ru",
          "url": "https://www.klerk.ru/buh/articles/707264/",
          "publication_date": "2026-09-02",
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
