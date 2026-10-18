window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.regions["east-asia"] = {
  "index": 61,
  "delta": -1,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "КНДР провела первый за три года пуск стратегических крылатых ракет с подлодки; на этом же фоне российская атомная подлодка отработала ракетные стрельбы.",
        "en": "North Korea carried out its first submarine-launched strategic cruise missile test in three years, while a Russian nuclear submarine ran missile drills in the same week."
      },
      "why": {
        "ru": "Возобновление морских ядерных пусков в Азии повышает риск неверного прочтения в период одновременных учений НАТО.",
        "en": "Resumed sea-based nuclear testing in Asia raises the risk of misreading amid simultaneous NATO drills."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "channelnewsasia-nk-slcms-2026-10-14",
          "title": {
            "ru": "КНДР испытала два типа стратегических крылатых ракет подводного базирования",
            "en": "North Korea test-fires two types of submarine-launched strategic cruise missiles"
          },
          "domain": "channelnewsasia.com",
          "url": "https://www.channelnewsasia.com/east-asia/north-korea-tests-submarine-launched-strategic-cruise-missiles-6460706",
          "publication_date": "2026-10-14",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "rt-english-russian-submarine-drill-2026-10-15",
          "title": {
            "ru": "Российская атомная подлодка отработала ракетные стрельбы",
            "en": "Russian nuclear submarine conducts missile firing drill"
          },
          "domain": "rt-english.com",
          "url": "https://rt-english.com/russia/647240-russian-submarine-fire-drill",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Китай требует от ЕС взаимности по экспортным лицензиям на редкозёмы, а армия США ожидает влияния ограничений на критичные минералы с января; ЕС ищет новые торговые полномочия из-за дефицита с Китаем.",
        "en": "China demands reciprocal EU cooperation on rare-earth export licences, the US Army expects to feel the impact of critical-mineral restrictions from January, and the EU seeks new trade powers over its deficit with China."
      },
      "why": {
        "ru": "Ограничения на критичные минералы превращают торговый спор в фактор военно-промышленной уязвимости региона.",
        "en": "Critical-mineral restrictions turn a trade dispute into a factor of regional defence-industrial vulnerability."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "businesstoday-my-china-rare-earth-eu-2026-10-15",
          "title": {
            "ru": "Китай требует взаимного сотрудничества ЕС по экспортным лицензиям на редкозёмы",
            "en": "China Seeks Reciprocal EU Cooperation On Rare Earth Export License"
          },
          "domain": "businesstoday.com.my",
          "url": "https://www.businesstoday.com.my/2026/10/15/china-seeks-reciprocal-eu-cooperation-on-rare-earth-export-license/",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
        },
        {
          "id": "breakingdefense-critical-minerals-2026-10-15",
          "title": {
            "ru": "На фоне приближения срока по критичным минералам армия США ожидает «некоторого влияния»",
            "en": "As critical mineral deadline looms, Army expects to feel 'some impact'"
          },
          "domain": "breakingdefense.com",
          "url": "https://breakingdefense.com/2026/10/as-critical-mineral-deadline-looms-army-expects-to-feel-some-impact/",
          "publication_date": "2026-10-15",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "theepochtimes-eu-china-trade-2026-10-16",
          "title": {
            "ru": "ЕС ищет новые торговые полномочия на фоне расширения дефицита с Китаем",
            "en": "EU Seeks New Trade Powers as Deficit With China Widens"
          },
          "domain": "theepochtimes.com",
          "url": "https://www.theepochtimes.com/world/eu-seeks-new-trade-powers-as-deficit-with-china-widens-6105278",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
