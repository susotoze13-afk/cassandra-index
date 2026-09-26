window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  // Редакционный сид региона europe (неделя 2026-09-13, R55): два драйвера региона.
  // Источники — verbatim-записи из calc/input/2026-09-13.json. index/delta/status
  // пересчитываются пайплайном; confidence — редакционная.
  s.regions["europe"] = {
  "index": 60,
  "delta": -8,
  "status": "danger",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Массированная атака 8 сентября включала сотни ракет и дронов; в Польше из-за ударов России объявлялись предупреждения об угрозе с воздуха.",
        "en": "The massed attack of 8 September involved hundreds of missiles and drones; Poland issued air-threat warnings because of the Russian strikes."
      },
      "why": {
        "ru": "Перебои в работе неба над союзником НАТО — прямой индикатор приближения конфликта к границам альянса.",
        "en": "Disruptions in the skies over a NATO ally are a direct indicator of the conflict closing in on the alliance’s borders."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "24tv-ua-massirovannaya-ataka-8-sentjabrja-n3137838",
          "title": {
            "ru": "Массированная атака 8 сентября 2026: сколько ракет и дронов запустила Россия",
            "en": "Massed attack on 8 September 2026: how many missiles and drones Russia launched"
          },
          "domain": "24tv.ua",
          "url": "https://24tv.ua/ru/massirovannaja-ataka-8-sentjabrja-2026-goda-skolko-raket-i-dronov-zapustila-rossija_n3137838",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "eurointegration-com-ua-poland-alerts-2026-09-13",
          "title": {
            "ru": "В Польше предупреждали об угрозе с воздуха в связи с атаками РФ на Украину",
            "en": "Poland issued air-threat warnings over Russian strikes on Ukraine"
          },
          "domain": "eurointegration.com.ua",
          "url": "https://www.eurointegration.com.ua/rus/news/2026/09/13/7245356/",
          "publication_date": "2026-09-13",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "kp-ru-massirovanny-udar-8-sentyabrya-5299991",
          "title": {
            "ru": "Массированный удар по Украине 8 сентября 2026 года",
            "en": "Massed strike on Ukraine on September 8, 2026"
          },
          "domain": "kp.ru",
          "url": "https://www.kp.ru/daily/277813.4/5299991/",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Германия выдворяет более 150 российских дипломатов и членов их семей; Россия в ответ объявила о закрытии генерального консульства Германии в Санкт-Петербурге.",
        "en": "Germany is expelling more than 150 Russian diplomats and their family members; Russia in response announced the closure of Germany’s consulate general in St. Petersburg."
      },
      "why": {
        "ru": "Дипломатический разрыв такого масштаба сокращает каналы связи между столицами в критический момент.",
        "en": "A diplomatic rupture of this scale cuts communication channels between capitals at a critical moment."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "forbes-ru-germany-expels-150-diplomats-568359",
          "title": {
            "ru": "Посольство России сообщило о высылке из Германии 150 дипломатов и членов их семей",
            "en": "Russian embassy reports expulsion of 150 diplomats and their family members from Germany"
          },
          "domain": "forbes.ru",
          "url": "https://www.forbes.ru/society/568359-posol-stvo-rossii-rasskazalo-o-vysylke-iz-germanii-150-diplomatov-i-clenov-ih-semej",
          "publication_date": "2026-09-10",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "unn-ua-germany-expels-150-diplomats-leipzig",
          "title": {
            "ru": "Германия выдворяет более 150 российских дипломатов и членов их семей после инцидента в Лейпциге",
            "en": "Germany expels more than 150 Russian diplomats and their family members following Leipzig incident"
          },
          "domain": "unn.ua",
          "url": "https://unn.ua/en/news/germany-expels-more-than-150-russian-diplomats-and-their-family-members-following-sabotage-in-leipzig",
          "publication_date": "2026-09-10",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "dw-com-german-consulate-closing-a-79149908",
          "title": {
            "ru": "Россия объявила о закрытии генерального консульства Германии в Санкт-Петербурге",
            "en": "Russia announces it is closing Germany's consulate in St. Petersburg"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/en/russia-announces-it-is-closing-germanys-consulate-in-st-petersburg/a-79149908",
          "publication_date": "2026-09-07",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
})();
