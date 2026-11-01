window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["baltic"] = {
  "index": 71,
  "delta": 2,
  "status": "very",
  "background": true,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Собственных сигналов в окне недели не собрано; фон — удары по украинской энергетике (Киевская ТЭЦ-6, логистика армии) и предупреждения США о теракте в Москве.",
        "en": "No signals of its own were collected in the week window; the backdrop is strikes on Ukrainian energy (Kyiv CHPP-6, army logistics) and US warnings about a terrorist attack in Moscow."
      },
      "why": {
        "ru": "Индекс региона отражает глобальный фон; локальной атрибуции в источниках недели нет, поэтому дельта не подаётся как региональная.",
        "en": "The regional index reflects the global backdrop; there is no local attribution in the week's sources, so the delta is not presented as regional."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "sputnik-chpp6-strike",
          "title": {
            "ru": "Российские силы ударили по Киевской ТЭЦ-6, обеспечивавшей военную логистику",
            "en": "Russian forces hit Kiev CHPP-6 supplying energy to Ukrainian military logistics"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261031/russian-forces-hit-kiev-chpp-6-supplying-energy-to-ukrainian-military-logistics---mod-1124982131.html",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-logistics-energy-strike",
          "title": {
            "ru": "Российские силы ударили по логистике и энергетике украинской армии",
            "en": "Russian forces strike Ukrainian army's logistics, energy infrastructure facilities"
          },
          "domain": "tass.com",
          "url": "https://tass.com/defense/2211325",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Фон перевооружения: Destinus нарастил выпуск крылатых ракет выше довоенного годового производства Европы, польские МиГ-29 направлены в Украину.",
        "en": "Rearmament backdrop: Destinus raised cruise-missile output above Europe's pre-war annual production and Polish MiG-29s were sent to Ukraine."
      },
      "why": {
        "ru": "Для Балтии это контекст, а не измеренный сигнал недели — запись носит фоновый характер.",
        "en": "For the Baltics this is context rather than a measured weekly signal — the entry is background in nature."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "defensenews-destinus",
          "title": {
            "ru": "Месячный выпуск Destinus превысил довоенное годовое производство крылатых ракет в Европе",
            "en": "Destinus monthly output tops Europe's pre-war annual cruise missile production"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/29/destinus-monthly-output-tops-europes-pre-war-annual-cruise-missile-production/",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "twz-polish-mig29",
          "title": {
            "ru": "Польские МиГ-29 и боеприпасы для F-16, как сообщается, направлены в Украину",
            "en": "Polish MiG-29s, F-16 cannon ammo reportedly headed to Ukraine"
          },
          "domain": "twz.com",
          "url": "https://www.twz.com/news-features/polish-mig-29s-f-16-cannon-ammo-reportedly-headed-to-ukraine-as-bitter-warsaw-kyiv-rift-heals",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
})();
