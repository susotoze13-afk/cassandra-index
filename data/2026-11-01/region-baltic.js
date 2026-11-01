window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["baltic"] = {
  "index": 72,
  "delta": 3,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Собственные сигналы региона в окне: бригада НАТО провела крупнейшие учения по развёртыванию в восточной Латвии «Resolute Reforger 2026» (10-26), немецкая бригада в Литве переводит Калининград и Белоруссию под наблюдение средствами РЭБ (10-28); в индекс региона они вошли через D1.2 и D7.1.",
        "en": "Собственные сигналы региона в окне: бригада НАТО провела крупнейшие учения по развёртыванию в восточной Латвии «Resolute Reforger 2026» (10-26), немецкая бригада в Литве переводит Калининград и Белоруссию под наблюдение средствами РЭБ (10-28); в индекс региона они вошли через D1.2 и D7.1."
      },
      "why": {
        "ru": "Впервые за несколько недель у Балтии есть собственная региональная атрибуция по прямым событиям (не только глобальный фон), приписки проверены ворота независимости источников.",
        "en": "Впервые за несколько недель у Балтии есть собственная региональная атрибуция по прямым событиям (не только глобальный фон), приписки проверены ворота независимости источников."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "xinhua-reforger-latvia-exercise",
          "title": {
            "ru": "Бригада НАТО начала крупные учения в восточной Латвии",
            "en": "NATO brigade launches major exercise in eastern Latvia"
          },
          "domain": "english.news.cn",
          "url": "https://english.news.cn/20261026/b48a6eb27a7d4558a36d9e19bc2fc3cd/c.html",
          "publication_date": "2026-10-26",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "yahoo-nato-brigade-latvia-exercises",
          "title": {
            "ru": "Бригада НАТО в Латвии провела «самые масштабные» учения по развёртыванию",
            "en": "NATO Brigade in Latvia launches 'most extensive' deployment exercises, Latvian army says"
          },
          "domain": "yahoo.com",
          "url": "https://www.yahoo.com/news/world/articles/nato-brigade-latvia-launches-most-141743550.html",
          "publication_date": "2026-10-26",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "fakti-german-brigade-ew-lithuania",
          "title": {
            "ru": "Немецкая бригада в Литве держит Калининград и Белоруссию под наблюдением (РЭБ)",
            "en": "Kaliningrad and Belarus under surveillance: what is the German brigade in Lithuania preparing?"
          },
          "domain": "fakti.bg",
          "url": "https://fakti.bg/en/world/1094922-kaliningrad-and-belarus-under-surveillance-what-is-the-german-brigade-in-lithuania-prepar",
          "publication_date": "2026-10-28",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "breakingdefense-kaliningrad-not-suwalki",
          "title": {
            "ru": "Калининград больше, чем Сувалкский коридор, и НАТО не может его игнорировать",
            "en": "Kaliningrad is more than the Suwałki Gap, and NATO cannot ignore it"
          },
          "domain": "breakingdefense.com",
          "url": "https://breakingdefense.com/2026/10/kaliningrad-is-more-than-the-suwalki-gap-and-nato-cannot-ignore-it/",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Поддерживающий контекст: Пентагон призвал прибалтийские государства снизить риторику о российских угрозах (10-29/30, D5.4 — de-эскалационный критерий недели), Латвия разрешила пограничникам открывать огонь для защиты инфраструктуры от гибридных атак (10-30), Литва продлила размещение ~100 военных на границе с Калининградом (10-27).",
        "en": "Поддерживающий контекст: Пентагон призвал прибалтийские государства снизить риторику о российских угрозах (10-29/30, D5.4 — de-эскалационный критерий недели), Латвия разрешила пограничникам открывать огонь для защиты инфраструктуры от гибридных атак (10-30), Литва продлила размещение ~100 военных на границе с Калининградом (10-27)."
      },
      "why": {
        "ru": "Меры harder и внутренние военные режима — взаимосвязанные признаки подготовки гибридного контура; задержка в значениях индекса от них скромная (атрибуты D5.4 и региональный narrative).",
        "en": "Меры harder и внутренние военные режима — взаимосвязанные признаки подготовки гибридного контура; задержка в значениях индекса от них скромная (атрибуты D5.4 и региональный narrative)."
      },
      "contribution": "low",
      "confidence": "high",
      "sources": [
        {
          "id": "newsam-pentagon-baltic-rhetoric",
          "title": {
            "ru": "Пентагон призвал европейцев «остыть» — Балтия в центре дискуссии о тонусе",
            "en": "Pentagon tells Europeans to cool their rhetoric on Russia — Baltic voices targeted"
          },
          "domain": "news.am",
          "url": "https://news.am/eng/news/1071414",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "lrt-pentagon-baltic-tone-down",
          "title": {
            "ru": "Пентагон призвал прибалтов к сдержанности в риторике о России",
            "en": "Pentagon urges Baltic states to tone down rhetoric on Russia over security concerns — Reuters"
          },
          "domain": "lrt.lt",
          "url": "https://www.lrt.lt/en/news-in-english/19/3098101/pentagon-urges-baltic-states-to-tone-down-rhetoric-on-russia-media",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
})();
