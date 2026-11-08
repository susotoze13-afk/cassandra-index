window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.regions["central-asia"] = {
  "index": 69.3,
  "delta": -2.6,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "США ввели санкции против уроженца Таджикистана за поставки оружия Ирану; в отдельном пакете под санкции попали индийские и турецкие компании и лица, помогавшие Ирану.",
        "en": "The US sanctioned a Tajikistan-born man over selling arms to Iran, and a separate package targeted Indian and Turkish firms and people for aiding Iran."
      },
      "why": {
        "ru": "Санкции (Д3.3) идут через трудовую миграцию и торговые связи региона.",
        "en": "Sanctions (D3.3) reach the region through labour migration and trade ties."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "kursivmedia-us-sanctions-tajik-iran-arms",
          "title": {
            "ru": "США ввели санкции против уроженца Таджикистана за поставки оружия Ирану",
            "en": "US sanctions Tajikistan-born man over selling arms to Iran"
          },
          "domain": "uz.kursiv.media",
          "url": "https://uz.kursiv.media/en/2026-11-06/us-tajik-missiles-iran-sanctions/",
          "publication_date": "2026-11-06",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "thehindu-us-sanctions-indian-turkish-firms",
          "title": {
            "ru": "США ввели санкции против индийских и турецких компаний и лиц за помощь Ирану",
            "en": "U.S. slaps sanctions on Indian, Turkish firms and people for aiding Iran"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/us-slaps-sanctions-on-indian-turkish-firms-and-people-for-aiding-iran/article71668431.ece",
          "publication_date": "2026-11-05",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Казахстан получил второй военно-транспортный самолёт Airbus A400M; Россия наращивает производство ракет вопреки санкциям.",
        "en": "Kazakhstan received its second Airbus A400M military transport aircraft, while Russia keeps building missiles despite sanctions."
      },
      "why": {
        "ru": "Перевооружение и производство (Д6.3) — фон наращивания возможностей для региона.",
        "en": "Rearmament and production (D6.3) are the capability build-up backdrop for the region."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "kursiv-kazakhstan-second-a400m",
          "title": {
            "ru": "Казахстан получил второй военно-транспортный самолёт Airbus A400M",
            "en": "Kazakhstan receives second Airbus A400M military transport aircraft"
          },
          "domain": "kz.kursiv.media",
          "url": "https://kz.kursiv.media/en/2026-11-03/engk-nknk-kazakhstan-receives-second-airbus-a400m-military-transport-aircraft/",
          "publication_date": "2026-11-03",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "united24media-russia-missile-production",
          "title": {
            "ru": "Россия наращивает производство ракет вопреки санкциям: до 700 баллистических ракет к октябрю 2026 года",
            "en": "Russia Keeps Building Missiles Despite Sanctions, Amassing Up to 700 Ballistic Missiles by October 2026"
          },
          "domain": "united24media.com",
          "url": "https://united24media.com/war-in-ukraine/russia-keeps-building-missiles-despite-sanctions-amassing-up-to-700-ballistic-missiles-by-october-2026-24069",
          "publication_date": "2026-11-04",
          "accessed_date": "2026-11-08",
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
