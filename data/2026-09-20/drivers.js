window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  // Редакционный сид недели 2026-09-20: три главных драйвера недели.
  // Источники — verbatim-записи из calc/input/2026-09-20.json (R55).
s.drivers = [
  {
    "label": {
      "ru": "Удары далеко за линией фронта участились",
      "en": "Strikes deep behind the front line intensified"
    },
    "observation": {
      "ru": "Украинские дроны и ракеты атаковали Москву и нефтеперерабатывающий завод; из-за атаки беспилотников в московских аэропортах задержаны более 400 рейсов; удар нанесён по складу боеприпасов и горючего в Запорожье.",
      "en": "Ukrainian drones and missiles struck Moscow and an oil refinery; more than 400 flights were delayed at Moscow airports after a drone attack; a Russian ammunition and fuel depot was hit in Zaporizhzhia."
    },
    "why": {
      "ru": "Массированные удары по объектам в глубоком тылу повышают интенсивность обмена ударами и нагрузку на гражданскую инфраструктуру обеих сторон.",
      "en": "Massed strikes on targets deep in the rear raise the intensity of reciprocal attacks and the burden on civilian infrastructure on both sides."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "abcnews-com-ukrainian-drones-moscow-refinery-136595832",
        "title": {
          "ru": "Украинские дроны и ракеты атаковали Москву и нефтеперерабатывающий завод, есть погибшие",
          "en": "Ukrainian drones and missiles target Moscow, oil refinery in deadly attack: officials"
        },
        "domain": "abcnews.com",
        "url": "https://abcnews.com/International/ukrainian-drones-target-moscow-oil-refinery-deadly-attack/story?id=136595832",
        "publication_date": "2026-09-20",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "lenta-ru-glavnoe-k-utru-20-sentyabrya",
        "title": {
          "ru": "Главное 20 сентября. Массированная атака дронов на Москву и область",
          "en": "Main news of 20 September: massed drone attack on Moscow and the region"
        },
        "domain": "lenta.ru",
        "url": "https://lenta.ru/twz/chto-proiskhodit/glavnoe-k-utru-20-sentyabrya.htm",
        "publication_date": "2026-09-20",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "www-rbc-ru-400-flights-delayed-20-09-2026",
        "title": {
          "ru": "Более 400 рейсов задержали в московских аэропортах из-за атаки беспилотников",
          "en": "Over 400 flights delayed at Moscow airports due to drone attack"
        },
        "domain": "rbc.ru",
        "url": "https://www.rbc.ru/politics/20/09/2026/6aaf7792201b0189cffa7df7",
        "publication_date": "2026-09-20",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "spravzhne-media-gur-warehouse-zaporizhzhia",
        "title": {
          "ru": "ГУР уничтожило склад боеприпасов и горючего РФ в Запорожье",
          "en": "Ukrainian military intelligence destroys Russian ammunition and fuel depot in Zaporizhzhia"
        },
        "domain": "spravzhne.media",
        "url": "https://spravzhne.media/rus/war/1789900681-rossiyskiy-sklad-boepripasov-i-goryuchego-unichtozhili-na-zaporozhe",
        "publication_date": "2026-09-20",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "www-kyivpost-com-post-84787",
        "title": {
          "ru": "ISW: оценка российского наступления, 17 сентября 2026",
          "en": "ISW Russian Offensive Campaign Assessment, September 17, 2026"
        },
        "domain": "kyivpost.com",
        "url": "https://www.kyivpost.com/post/84787",
        "publication_date": "2026-09-18",
        "accessed_date": "2026-09-25",
        "source_type": "OSINT",
        "cluster_id": "C-registries",
        "state_affiliated": false
      }
    ]
  },
  {
    "label": {
      "ru": "Санкционное противостояние ужесточилось",
      "en": "Sanctions confrontation tightened"
    },
    "observation": {
      "ru": "Трамп подписал закон о санкциях против России; указом № 661 активы «Ашан» и Nestlé переданы во временное управление; генеральное консульство Германии в Санкт-Петербурге закрылось; послы ЕС продлили санкции на семь дней.",
      "en": "Trump signed a Russia sanctions bill into law; by Decree No. 661 the assets of Auchan and Nestlé were placed under temporary management; Germany's consulate general in St. Petersburg closed; EU envoys extended sanctions by seven days."
    },
    "why": {
      "ru": "Юридически закреплённые ограничительные меры и закрытие дипломатических представительств сужают пространство для переговоров и закрепляют конфронтацию.",
      "en": "Legally entrenched restrictive measures and closed diplomatic missions narrow the room for talks and entrench confrontation."
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
        "id": "www-garant-ru-ukaz-661-ot-17-09-2026",
        "title": {
          "ru": "Указ Президента РФ от 17 сентября 2026 г. № 661",
          "en": "Decree of the President of the Russian Federation No. 661 of 17 September 2026"
        },
        "domain": "garant.ru",
        "url": "https://www.garant.ru/products/ipo/prime/doc/414830418/",
        "publication_date": "2026-09-17",
        "accessed_date": "2026-09-25",
        "source_type": "primary",
        "cluster_id": "C-registries",
        "state_affiliated": false
      },
      {
        "id": "meduza-io-putin-auchan-nestle",
        "title": {
          "ru": "Путин передал во временное управление активы «Ашан» и Nestlé",
          "en": "Putin places Auchan and Nestlé assets under temporary management"
        },
        "domain": "meduza.io",
        "url": "https://meduza.io/news/2026/09/17/putin-peredal-vo-vremennoe-upravlenie-aktivy-ashan-i-nestle",
        "publication_date": "2026-09-17",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "www-pravda-com-ua-eng-german-consulate-closes-8054035",
        "title": {
          "ru": "Генеральное консульство Германии в России закрылось навсегда",
          "en": "German Consulate General in Russia permanently closes"
        },
        "domain": "pravda.com.ua",
        "url": "https://www.pravda.com.ua/eng/news/2026/09/18/8054035/",
        "publication_date": "2026-09-18",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "www-reuters-com-eu-envoys-extend-russia-sanctions",
        "title": {
          "ru": "Послы ЕС продлили санкции против России на семь дней для обсуждения шестимесячного продления",
          "en": "EU envoys extend Russia sanctions by seven days to debate six-month renewal"
        },
        "domain": "reuters.com",
        "url": "https://www.reuters.com/world/europe/eu-envoys-extend-russia-sanctions-by-seven-days-debate-six-month-renewal-eu-2026-09-14/",
        "publication_date": "2026-09-14",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  },
  {
    "label": {
      "ru": "Напряжённость на восточном фланге НАТО выросла",
      "en": "Tension rose on NATO's eastern flank"
    },
    "observation": {
      "ru": "Активная фаза учений Namejs 2026 прошла в Риге, Литва провела учения в 12 муниципалитетах на фоне проверок восточной границы альянса; зафиксированы удары России вблизи границ Польши; Минск объявил проверку боеготовности армии, вплоть до мобилизации.",
      "en": "The active phase of exercise Namejs 2026 took place in Riga and Lithuania held drills across 12 municipalities amid probes of the alliance's eastern border; Russian strikes were recorded near Poland's borders; Minsk announced combat-readiness checks of its army, up to mobilisation."
    },
    "why": {
      "ru": "Плотность учений и инциденты вблизи границ альянса повышают риск случайных столкновений и требуют постоянного повышенного дежурства сил.",
      "en": "The density of drills and incidents near alliance borders raises the risk of unintended clashes and requires continuously heightened readiness of forces."
    },
    "contribution": "medium",
    "confidence": "high",
    "sources": [
      {
        "id": "www-riga-lv-namejs-2026-active-phase",
        "title": {
          "ru": "16–20 сентября: активная фаза учений Namejs 2026 пройдёт в Риге",
          "en": "16–20 September: active phase of exercise Namejs 2026 will take place in Riga"
        },
        "domain": "riga.lv",
        "url": "https://www.riga.lv/en/article/16-20-september-active-phase-exercise-namejs-2026-will-take-place-riga-soldiers-military-vehicles-and-exercise-checkpoints-will-be-visible-across-city",
        "publication_date": "2026-09-16",
        "accessed_date": "2026-09-25",
        "source_type": "primary",
        "cluster_id": "C-registries",
        "state_affiliated": false
      },
      {
        "id": "euromaidanpress-com-lithuania-exercises-12-municipalities",
        "title": {
          "ru": "Литва начала военные учения в 12 муниципалитетах на фоне проверок НАТО восточной границы",
          "en": "Lithuania launches military exercises across 12 municipalities as Russia keeps probing NATO's eastern border"
        },
        "domain": "euromaidanpress.com",
        "url": "https://euromaidanpress.com/2026/09/14/lithuania-launches-military-exercises-across-12-municipalities-as-russia-keeps-probing-natos-eastern-border/",
        "publication_date": "2026-09-14",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "www-svoboda-org-a-udary-rossii-vblizi-granits-poljshi",
        "title": {
          "ru": "Удары России вблизи границ Польши",
          "en": "Russian strikes near Poland's borders"
        },
        "domain": "svoboda.org",
        "url": "https://www.svoboda.org/a/udary-rossii-vblizi-granits-poljshi/33854008.html",
        "publication_date": "2026-09-14",
        "accessed_date": "2026-09-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "ria-ru-lukashenko-check-readiness-2117062795",
        "title": {
          "ru": "Минск проведет проверку боеготовности армии, вплоть до мобилизации",
          "en": "Minsk to hold combat readiness checks of the army, up to mobilisation"
        },
        "domain": "ria.ru",
        "url": "https://ria.ru/20260911/lukashenko-2117062795.html",
        "publication_date": "2026-09-11",
        "accessed_date": "2026-09-25",
        "source_type": "primary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      }
    ]
  }
];
})();
