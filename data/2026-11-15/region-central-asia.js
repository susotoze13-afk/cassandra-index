window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.regions["central-asia"] = {
  "index": 63.9,
  "delta": -5.4,
  "status": "very",
  "background": false,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Казахстан продвигает планы атомной энергетики и рассматривает площадки для третьего объекта.",
        "en": "Kazakhstan is advancing nuclear power plans and considering sites for a third facility."
      },
      "why": {
        "ru": "Ядерная и энергетическая повестка региона (Д2, Д9.4) — эскалационного сигнала нет.",
        "en": "The region’s nuclear and energy agenda (D2, D9.4) with no escalation signal."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "astanatimes-kazakhstan-nuclear",
          "title": {
            "ru": "Казахстан продвигает планы атомной энергетики",
            "en": "Kazakhstan Advances Nuclear Power Plans, Considers Sites for Third Facility"
          },
          "domain": "astanatimes.com",
          "url": "https://astanatimes.com/2026/11/kazakhstan-advances-nuclear-power-plans-considers-sites-for-third-facility/",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Британия ввела санкции против СИБУРа, и Казахстан может почувствовать эффект; объявлено, что трёхсторонний саммит России, Китая и США пройдёт 19 ноября в Шэньчжэне.",
        "en": "The UK sanctioned Russia’s SIBUR with a knock-on effect for Kazakhstan, and a Russia–China–US trilateral summit was announced for November 19 in Shenzhen."
      },
      "why": {
        "ru": "Санкционный канал и переговорная рамка региона (Д3.3, Д3.4).",
        "en": "The sanctions channel and the region’s negotiating frame (D3.3, D3.4)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "kursiv-sibur-sanctions",
          "title": {
            "ru": "Британия ввела санкции против СИБУРа; Казахстан может почувствовать эффект",
            "en": "UK imposes sanctions on Russia’s SIBUR; Kazakhstan could feel the impact"
          },
          "domain": "kz.kursiv.media",
          "url": "https://kz.kursiv.media/en/2026-11-13/engk-tank-uk-imposes-sanctions-on-russias-sibur-kazakhstan-could-feel-the-impact/",
          "publication_date": "2026-11-13",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-shenzhen-summit",
          "title": {
            "ru": "Трёхсторонний саммит Путина, Си и Трампа пройдёт в Шэньчжэне 19 ноября — Кремль",
            "en": "Putin, Xi Jinping, Trump trilateral summit to be held in Shenzhen on November 19 — Kremlin"
          },
          "domain": "tass.com",
          "url": "https://tass.com/politics/2218203",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
})();
