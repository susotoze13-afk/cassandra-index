window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  // Редакционный сид региона africa (неделя 2026-09-06, R55): два драйвера региона.
  // Источники — verbatim-записи из calc/input/2026-09-06.json. index/delta/status
  // пересчитываются пайплайном; confidence — редакционная.
  s.regions["africa"] = {
  "index": 60,
  "delta": 13,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Стоимость страхования от ударов беспилотников растёт на ключевых рынках; запрет на экспорт дизтоплива ужесточает глобальный баланс поставок.",
        "en": "The cost of drone-strike insurance is rising in key markets; the diesel export ban tightens the global supply balance."
      },
      "why": {
        "ru": "Удорожание фрахта и топлива снижает доступность гуманитарных и товарных перевозок для африканских государств.",
        "en": "More expensive freight and fuel reduce the availability of humanitarian and goods shipments for African states."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "insur-info-drone-risk-insurance-market",
          "title": {
            "ru": "Воздушная защита: сколько стоят страховки от БПЛА в России",
            "en": "Air defence: the cost of drone-attack insurance in Russia"
          },
          "domain": "insur-info.ru",
          "url": "https://www.insur-info.ru/press/213927/",
          "publication_date": "2026-09-04",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        },
        {
          "id": "commodity-board-diesel-ban-distillate-supply",
          "title": {
            "ru": "Россия продлевает запрет на экспорт дизельного топлива до 30 сентября 2026 года, ужесточая глобальный баланс средних дистиллятов",
            "en": "Russia extends diesel export ban to 30 September 2026, tightening global middle-distillate supply"
          },
          "domain": "commodity-board.com",
          "url": "https://commodity-board.com/%D1%80%D0%BE%D1%81%D1%81%D0%B8%D1%8F-%D0%BF%D1%80%D0%BE%D0%B4%D0%BB%D0%B5%D0%B2%D0%B0%D0%B5%D1%82-%D0%B7%D0%B0%D0%BF%D1%80%D0%B5%D1%82-%D0%BD%D0%B0-%D1%8D%D0%BA%D1%81%D0%BF%D0%BE%D1%80%D1%82-%D0%B4%D0%B8%D0%B7%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%B2%D0%B0-%D0%B4%D0%BE-30-%D1%81%D0%B5%D0%BD%D1%82%D1%8F%D0%B1%D1%80%D1%8F-2026-%D0%B3%D0%BE%D0%B4%D0%B0",
          "publication_date": "2026-09-01",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Премьер Испании обвинил Россию и Израиль в дезинформации во время кризиса в Сеуте со ссылкой на исследование EEAS; миграционный кризис в испанском анклаве на севере Африки продолжался.",
        "en": "Spain’s prime minister accused Russia and Israel of disinformation during the Ceuta crisis, citing an EEAS study; the migration crisis in the Spanish enclave in North Africa continued."
      },
      "why": {
        "ru": "Информационные кампании вокруг миграционных кризисов на северной границе Африки усиливают нестабильность приграничья.",
        "en": "Information campaigns around migration crises on Africa’s northern frontier add to border instability."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "aljazeera-com-ceuta-disinformation-eeas",
          "title": {
            "ru": "Премьер Испании обвинил Россию и Израиль в дезинформации во время кризиса в Сеуте, ссылаясь на исследование EEAS",
            "en": "Spain's Sanchez says Russia, Israel spread disinformation during Ceuta crisis, citing EEAS research"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/8/31/spains-sanchez-condemns-russia-israel-disinformation-during-ceuta-crisis",
          "publication_date": "2026-08-31",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "lenta-ru-ogranicheniya-diplomatov-es",
          "title": {
            "ru": "Ограничения для российских дипломатов в ЕС объяснили подготовкой к войне с Россией",
            "en": "EU restrictions on Russian diplomats explained as preparation for war with Russia"
          },
          "domain": "lenta.ru",
          "url": "https://lenta.ru/news/2026/09/04/ogranicheniya-dlya-rossiyskih-diplomatov-v-es-ob-yasnili/",
          "publication_date": "2026-09-04",
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
