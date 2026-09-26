window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  // Редакционный сид региона middle-east (неделя 2026-08-30, R55): два драйвера региона.
  // Источники — verbatim-записи из calc/input/2026-08-30.json. index/delta/status
  // пересчитываются пайплайном; confidence — редакционная.
  s.regions["middle-east"] = {
  "index": 60,
  "delta": -20,
  "status": "danger",
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "CrisisWatch фиксирует эскалацию вокруг средств ПВО; UANI документирует обновлённую картину судоходства Ирана на фоне кризиса в Ормузском проливе и Красном море.",
        "en": "CrisisWatch records escalation around air-defence assets; UANI documents an updated picture of Iranian shipping amid the crisis in the Strait of Hormuz and the Red Sea."
      },
      "why": {
        "ru": "Пересечение эскалации ПВО и перебоев судоходства повышает риски для энергетических маршрутов региона.",
        "en": "The intersection of air-defence escalation and shipping disruption raises risks for the region’s energy routes."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "crisisgroup-crisiswatch-air-defence-2026-08-28",
          "title": {
            "ru": "CrisisWatch: обзор эскалации вокруг ПВО",
            "en": "CrisisWatch: air defence escalation overview"
          },
          "domain": "crisisgroup.org",
          "url": "https://www.crisisgroup.org/crisiswatch/air-defence",
          "publication_date": "2026-08-28",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "uani-iran-shipping-update-2026-08-28",
          "title": {
            "ru": "UANI: обновление по судоходству Ирана, 28 августа 2026",
            "en": "UANI Iran Shipping Update – August 28, 2026"
          },
          "domain": "unitedagainstnucleariran.com",
          "url": "https://www.unitedagainstnucleariran.com/analysis/iran-shipping-update-august-28-2026",
          "publication_date": "2026-08-28",
          "accessed_date": "2026-09-26",
          "source_type": "OSINT",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Блокада чёрноморских портов остановила экспорт зерна, эскалация войны прерывает судоходство; торговые маршруты в двух морях одновременно под давлением.",
        "en": "The blockade of Black Sea ports halted grain exports and the escalation of the war is disrupting shipping; trade routes in two seas are under pressure at once."
      },
      "why": {
        "ru": "Перестройка морских маршрутов и рост страховых издержек затрагивают торговлю и снабжение государств региона.",
        "en": "The rerouting of sea lanes and rising insurance costs affect trade and supply for states in the region."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "lemonde-black-sea-blockade-2026-08-28",
          "title": {
            "ru": "Блокада черноморских портов душит экспорт зерна Украины",
            "en": "Ukraine's Black Sea port blockade strangles grain exports"
          },
          "domain": "lemonde.fr",
          "url": "https://www.lemonde.fr/en/international/article/2026/08/28/ukraine-s-black-sea-port-blockade-strangles-grain-exports_6756947_4.html",
          "publication_date": "2026-08-28",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "world-grain-black-sea-exports-2026-08-25",
          "title": {
            "ru": "Эскалация войны останавливает экспорт зерна через Черное море",
            "en": "Escalating war stalling Black Sea grain exports"
          },
          "domain": "world-grain.com",
          "url": "https://www.world-grain.com/articles/23138-escalating-war-stalling-black-sea-grain-exports",
          "publication_date": "2026-08-25",
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
