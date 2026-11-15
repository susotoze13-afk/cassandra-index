window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.regions["east-asia"] = {
  "index": 65.9,
  "delta": -3.1,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Белый дом подтвердил трёхсторонние переговоры США, Китая и России на полях саммита; Сеул настаивает на диалоге с Пхеньяном, а делегация КНДР прибыла в Москву.",
        "en": "The White House confirmed US–China–Russia trilateral talks on the summit sidelines; Seoul pushes for talks with Pyongyang while a North Korean delegation arrived in Moscow."
      },
      "why": {
        "ru": "Дипломатическая активность и вовлечение новых государств (Д3.4, Д7.1).",
        "en": "Diplomatic activity and new state involvement (D3.4, D7.1)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "scmp-shenzhen-summit",
          "title": {
            "ru": "Белый дом подтвердил трёхсторонние переговоры США, Китая и России на полях саммита",
            "en": "White House confirms US-China-Russia trilateral talks on Apec sidelines"
          },
          "domain": "scmp.com",
          "url": "https://www.scmp.com/news/china/diplomacy/article/3374415/white-house-confirms-us-china-russia-trilateral-apec-sidelines",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-north-korea-moscow",
          "title": {
            "ru": "Официальная делегация КНДР прибыла в Москву — ЦТАК",
            "en": "North Korea’s official delegation arrives in Moscow — KCNA"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2218241",
          "publication_date": "2026-11-15",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Обсуждается способность китайской ПВО HQ-17 прикрывать морские десантные силы от ударов с Тайваня.",
        "en": "Analysts debate whether China’s HQ-17 air defence can shield amphibious forces from Taiwanese strikes."
      },
      "why": {
        "ru": "Военно-технический фон Тайваньского пролива (Д1.5); сигнал слабый.",
        "en": "Military-technical backdrop of the Taiwan Strait (D1.5); a weak signal."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "scmp-hq17-taiwan",
          "title": {
            "ru": "ПВО HQ-17: способна ли она прикрыть десантные силы КНР от ударов с Тайвань",
            "en": "Could Beijing’s HQ-17 air-defence system defend PLA amphibious forces from Taiwan strikes?"
          },
          "domain": "scmp.com",
          "url": "https://www.scmp.com/news/china/military/article/3374448/could-beijings-hq-17-air-defence-system-defend-pla-amphibious-forces-taiwan-strikes",
          "publication_date": "2026-11-15",
          "accessed_date": "2026-11-15",
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
