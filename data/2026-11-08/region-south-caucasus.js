window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.regions["south-caucasus"] = {
  "index": 68.7,
  "delta": -3.7,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Азербайджанский военнослужащий нарушил границу Армении; следствие заявляет, что умысла убивать у него не было.",
        "en": "An Azerbaijani soldier breached Armenia's border; investigators say he had no intent to kill."
      },
      "why": {
        "ru": "Пограничный инцидент — сигнал Д1.4 для региона.",
        "en": "A border incident is a D1.4 signal for the region."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "asbarez-azerbaijani-soldier-border-breach",
          "title": {
            "ru": "Азербайджанский военнослужащий, нарушивший границу Армении, «не имел намерения убивать», заявили в следствии",
            "en": "Azerbaijani Soldier who Breached Armenia's Border 'Had No Intent to Kill,' Top Security Officials Says"
          },
          "domain": "asbarez.com",
          "url": "https://asbarez.com/azerbaijani-soldier-who-breached-armenias-border-had-no-intent-to-kill-top-security-officials-says/",
          "publication_date": "2026-11-03",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week",
          "notes": "Пограничный инцидент на армяно-азербайджанской границе."
        },
        {
          "id": "reportaz-armenia-border-delimitation-resume",
          "title": {
            "ru": "Мгер Григорян: Ереван надеется вскоре возобновить делимитацию границы с Азербайджаном",
            "en": "Mher Grigoryan: Yerevan hopes to resume border delimitation with Azerbaijan soon"
          },
          "domain": "report.az",
          "url": "https://report.az/en/region/mher-grigoryan-yerevan-hopes-to-resume-border-delimitation-with-azerbaijan-soon",
          "publication_date": "2026-11-02",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Ереван надеется вскоре возобновить делимитацию границы с Азербайджаном — об этом заявил вице-премьер Мгер Григорян; инцидент на границе делает трек чувствительным.",
        "en": "Yerevan hopes to resume border delimitation with Azerbaijan soon, Deputy Prime Minister Mher Grigoryan said, while the border incident makes the track sensitive."
      },
      "why": {
        "ru": "Переговорный трек по границе — Д3.4; он остаётся хрупким после инцидента.",
        "en": "The border negotiating track is D3.4; it remains fragile after the incident."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "reportaz-armenia-border-delimitation-resume",
          "title": {
            "ru": "Мгер Григорян: Ереван надеется вскоре возобновить делимитацию границы с Азербайджаном",
            "en": "Mher Grigoryan: Yerevan hopes to resume border delimitation with Azerbaijan soon"
          },
          "domain": "report.az",
          "url": "https://report.az/en/region/mher-grigoryan-yerevan-hopes-to-resume-border-delimitation-with-azerbaijan-soon",
          "publication_date": "2026-11-02",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "asbarez-azerbaijani-soldier-border-breach",
          "title": {
            "ru": "Азербайджанский военнослужащий, нарушивший границу Армении, «не имел намерения убивать», заявили в следствии",
            "en": "Azerbaijani Soldier who Breached Armenia's Border 'Had No Intent to Kill,' Top Security Officials Says"
          },
          "domain": "asbarez.com",
          "url": "https://asbarez.com/azerbaijani-soldier-who-breached-armenias-border-had-no-intent-to-kill-top-security-officials-says/",
          "publication_date": "2026-11-03",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week",
          "notes": "Пограничный инцидент на армяно-азербайджанской границе."
        }
      ]
    }
  ]
};
})();
