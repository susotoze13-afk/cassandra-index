window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  // Редакционный сид региона africa (неделя 2026-08-30, R55): два драйвера региона.
  // Источники — verbatim-записи из calc/input/2026-08-30.json. index/delta/status
  // пересчитываются пайплайном; confidence — редакционная.
  s.regions["africa"] = {
  "index": 60,
  "delta": 13,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Эскалация войны останавливает экспорт зерна через Чёрное море; блокада портов душит украинский экспорт и бьёт по мировым ценам на зерно.",
        "en": "The escalation of the war is stopping grain exports through the Black Sea; the port blockade is choking Ukrainian exports and hitting world grain prices."
      },
      "why": {
        "ru": "Рост цен и перебои поставок зерна ударяют по странам, зависимым от импорта продовольствия.",
        "en": "Rising prices and supply disruptions hit countries dependent on food imports."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        },
        {
          "id": "france24-black-sea-farmers-2026-08-24",
          "title": {
            "ru": "Что возобновленная блокада Черного моря означает для фермеров Украины",
            "en": "What the renewed Black Sea blockade means for Ukraine's farmers"
          },
          "domain": "france24.com",
          "url": "https://www.france24.com/en/europe/20260824-what-renewed-black-sea-blockade-means-ukraine-farmers",
          "publication_date": "2026-08-24",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Кризис судоходства охватывает одновременно Чёрное море и маршруты вокруг Ирана; страховые и фрахтовые издержки растут.",
        "en": "The shipping crisis spans the Black Sea and the routes around Iran at once; insurance and freight costs are rising."
      },
      "why": {
        "ru": "Удорожание перевозок снижает доступность товаров и гуманитарных грузов для африканских импортёров.",
        "en": "More expensive shipping reduces the availability of goods and humanitarian cargo for African importers."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
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
        },
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
        }
      ]
    }
  ]
};
})();
