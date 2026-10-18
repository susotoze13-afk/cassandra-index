window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.regions["africa"] = {
  "index": 61,
  "delta": 8,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Атаки на судоходство у берегов Йемена и подрывы танкеров в Ормузском проливе повышают военно-страховые риски на маршрутах Красного моря и Аденского залива, критичных для торговли Восточной Африки.",
        "en": "Attacks on shipping off Yemen and tanker mine strikes in the Strait of Hormuz raise war-risk premiums on Red Sea and Gulf of Aden routes critical to East African trade."
      },
      "why": {
        "ru": "Перебои на морских маршрутах у Африканского Рога напрямую бьют по импорту топлива и продовольствия региона.",
        "en": "Disruption on routes near the Horn of Africa directly affects the region’s fuel and food imports."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "aa-lng-tanker-attacked-yemen",
          "title": {
            "ru": "Малый катер открыл огонь по СПГ-танкеру у берегов Йемена — морское агентство Британии",
            "en": "Small boat approaches, opens fire on LNG tanker off Yemen's coast, UK maritime agency says"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/small-boat-approaches-opens-fire-on-lng-tanker-off-yemen-s-coast-uk-maritime-agency-says/4092086",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "qatar-tribune-hormuz-tanker-mine-2026-10-17",
          "title": {
            "ru": "Второй нефтяной танкер горит в Ормузском проливе после подрыва на морской мине",
            "en": "Second oil tanker burns in Strait of Hormuz after hitting naval mine"
          },
          "domain": "qatar-tribune.com",
          "url": "https://www.qatar-tribune.com/article/259630/front/second-oil-tanker-burns-in-strait-of-hormuz-after-hitting-naval-mine",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Хуситы освободили 159 задержанных в Сане под наблюдением МККК — ограниченный гуманитарный жест на фоне продолжающегося конфликта.",
        "en": "The Houthis released 159 detainees in Sanaa under ICRC watch — a limited humanitarian gesture amid the ongoing conflict."
      },
      "why": {
        "ru": "Гуманитарные договорённости снижают локальную напряжённость, но не меняют общего эскалационного фона.",
        "en": "Humanitarian arrangements lower local tension but do not change the overall escalation backdrop."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "aa-houthis-release-159-2026-10-17",
          "title": {
            "ru": "Хуситы Йемена освободили 159 задержанных в Сане — МККК",
            "en": "Yemen's Houthis release 159 detainees in Sanaa: ICRC"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/yemen-s-houthis-release-159-detainees-in-sanaa-icrc/4092084",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "middleeasteye-houthis-release-159-2026-10-17",
          "title": {
            "ru": "Хуситы освободили 159 человек по амнистии под наблюдением МККК",
            "en": "Houthis release 159 people under an amnesty under ICRC watch"
          },
          "domain": "middleeasteye.net",
          "url": "https://www.middleeasteye.net/live-blog/live-blog-update/houthis-release-159-people-under-amnesty-under-icrc-watch",
          "publication_date": "2026-10-17",
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
