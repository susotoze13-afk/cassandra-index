window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  // Редакционный сид региона middle-east (неделя 2026-09-06, R55): два драйвера региона.
  // Источники — verbatim-записи из calc/input/2026-09-06.json. index/delta/status
  // пересчитываются пайплайном; confidence — редакционная.
  s.regions["middle-east"] = {
  "index": 60,
  "delta": -20,
  "status": "danger",
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Рынок страхования от ударов беспилотников переоценивает риски; запрет на экспорт дизельного топлива продлён до 30 сентября, ужесточая глобальный баланс средних дистиллятов.",
        "en": "The drone-strike insurance market is repricing risk; the diesel export ban was extended to 30 September, tightening the global balance of middle distillates."
      },
      "why": {
        "ru": "Рост страховых и топливных издержек переносится на фрахт и снабжение, в том числе по маршрутам, важным для импортёров региона.",
        "en": "Rising insurance and fuel costs are passed on to freight and supply, including on routes that matter for the region’s importers."
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
          "id": "cargorun-ru-diesel-export-ban-extended",
          "title": {
            "ru": "Запрет на экспорт дизтоплива производителями продлён до 30 сентября 2026 года",
            "en": "Diesel fuel export ban for producers extended to 30 September 2026"
          },
          "domain": "cargorun.ru",
          "url": "https://cargorun.ru/blog/novosti/zapret-eksport-diztopliva-30-sentyabrya-2026",
          "publication_date": "2026-08-31",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Премьер Испании обвинил Россию и Израиль в дезинформации во время кризиса в Сеуте, ссылаясь на исследование EEAS; Россия отвергла связанные с Лейпцигом обвинения.",
        "en": "Spain’s prime minister accused Russia and Israel of disinformation during the Ceuta crisis, citing an EEAS study; Russia rejected the Leipzig-related accusations."
      },
      "why": {
        "ru": "Документированные кампании влияния вокруг кризисов миграции добавляют информационное измерение напряжённости в приграничье.",
        "en": "Documented influence campaigns around migration crises add an informational dimension to tension in border areas."
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
          "id": "kommersant-ru-russia-rejects-leipzig-8924396",
          "title": {
            "ru": "Россия отвергла обвинения Германии в инциденте в Лейпциге и пообещала жёсткий ответ на санкции",
            "en": "Russia rejects German accusations over Leipzig incident, promises harsh response to sanctions"
          },
          "domain": "kommersant.ru",
          "url": "https://www.kommersant.ru/doc/8924396",
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
