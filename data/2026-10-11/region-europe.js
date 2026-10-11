window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-11"] = window.CI_DATA.snapshots["2026-10-11"] || {};
  s.regions["europe"] = {
  "index": 51,
  "delta": 7,
  "status": "danger",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Война РФ–Украина продолжается: удары РФ по Запорожью убили 21 человека, включая детей, а украинские дроны на время закрыли аэропорты Москвы, пока Путин возвращался в Россию. На этом фоне Франция провела пуск БРПЛ M51.3, а НАТО анонсировала ядерные учения Steadfast Noon.",
        "en": "The Russia–Ukraine war continues: Russian strikes on Zaporizhzhia killed 21 people including children, while Ukrainian drones temporarily closed Moscow airports as Putin flew back to Russia. Against this backdrop France test-fired an M51.3 SLBM and NATO announced the Steadfast Noon nuclear drills."
      },
      "why": {
        "ru": "Одновременная фронтовая эскалация и подчёркнутые ядерные сигналы на европейском театре повышают риск неверного шага.",
        "en": "Simultaneous battlefield escalation and emphasised nuclear signals on the European theatre raise the risk of miscalculation."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "france24-zaporizhzhia-strikes-diesel",
          "title": {
            "ru": "Трамп и Зеленский поспорили из-за дизельной сделки, удары РФ по Украине убили 21 человека",
            "en": "Trump, Zelensky clash over diesel deal as Russian strikes on Ukraine kill 21, including children"
          },
          "domain": "france24.com",
          "url": "https://www.france24.com/en/europe/20261010-trump-zelensky-clash-over-diesel-deal-as-russian-strikes-on-ukraine-kill-21-including-children",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "nyt-ukraine-drones-moscow-airports",
          "title": {
            "ru": "Украинские дроны закрыли аэропорты Москвы, пока Путин возвращался в Россию",
            "en": "Ukrainian drones close Moscow airports as Putin flies back to Russia"
          },
          "domain": "nytimes.com",
          "url": "https://www.nytimes.com/2026/10/09/world/europe/russia-putin-plane-ukraine.html",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "defensegouv-m513-acceptance-test",
          "title": {
            "ru": "Ракета M51.3: успешный приёмочный пуск с ПЛАРБ Le Vigilant",
            "en": "M51.3 missile: successful acceptance test from SSBN Le Vigilant"
          },
          "domain": "defense.gouv.fr",
          "url": "https://www.defense.gouv.fr/actualites/missile-m513-tir-dacceptation-reussi-snle-vigilant",
          "publication_date": "2026-10-06",
          "accessed_date": "2026-10-11",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": true
        },
        {
          "id": "rt-nato-nuclear-drills",
          "title": {
            "ru": "НАТО просит Россию «не волноваться» из-за ядерных учений",
            "en": "NATO asks Russia 'not to worry' about nuclear drills"
          },
          "domain": "rt.com",
          "url": "https://www.rt.com/news/646984-nato-nuclear-exercise-polyansky/",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Дизельная сделка США–РФ расколола Запад: Зеленский в ярости после объявления о закупке российского дизеля, Германия и ЕС подтверждают сохранение санкций, ЕС удерживает резерв для Украины в многолетнем бюджете.",
        "en": "The US–Russia diesel deal split the West: Zelenskyy reacted furiously to the announced purchase of Russian diesel, Germany and the EU reaffirmed sanctions remain, and the EU kept its reserve for Ukraine in the multi-year budget."
      },
      "why": {
        "ru": "Раскол внутри западной коалиции ослабляет единство санкционного фронта и устойчивость поддержки Украины.",
        "en": "A split within the Western coalition weakens the unity of the sanctions front and the resilience of support for Ukraine."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "guardian-trump-putin-russian-diesel",
          "title": {
            "ru": "Зеленский в ярости: Трамп объявил о сделке по закупке российского дизеля",
            "en": "Zelenskyy furious as Trump announces deal to buy Russian diesel"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/us-news/2026/oct/09/trump-putin-russian-diesel-ukraine",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "sputnik-eu-budget-ukraine-reserve",
          "title": {
            "ru": "ЕС хочет сократить новый бюджет почти на 180 млрд, но сохранить 111 млрд для Украины",
            "en": "EU wants to reduce new budget by almost $180Bln but keep $111Bln for Ukraine"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261010/eu-wants-to-reduce-new-budget-by-almost-180bln-but-keep-111bln-for-ukraine-1124862422.html",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "nyt-europe-shadow-war",
          "title": {
            "ru": "Пока Путин ведёт теневую войну, Европа ищет способ дать сдачи",
            "en": "As Putin wages shadow war, Europe looks for a way to hit back"
          },
          "domain": "nytimes.com",
          "url": "https://www.nytimes.com/2026/10/09/world/europe/putin-russia-ukraine-war-europe-nato.html",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
