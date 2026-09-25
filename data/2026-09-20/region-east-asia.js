window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.regions["east-asia"] = {
  "index": 59,
  "delta": 7,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "КНДР выпустила две предположительно баллистические ракеты у восточного побережья и назвала свой ядерный статус необратимым после резолюции МАГАТЭ, предупредив США и Южную Корею о возможном применении ядерного оружия.",
        "en": "North Korea fired two suspected ballistic missiles off its east coast and called its nuclear status irreversible after an IAEA resolution, warning the US and South Korea of possible nuclear weapon use."
      },
      "why": {
        "ru": "Пуски и заявления о ядерном статусе поддерживают цикл демонстрации силы в северо-восточной Азии.",
        "en": "Missile launches and statements on nuclear status sustain a cycle of shows of force in Northeast Asia."
      },
      "contribution": "high",
      "confidence": "medium",
      "confidenceNote": {
        "ru": "Покрыто 2 из 5 критериев драйвера; пуски малой дальности, часть заявлений — хроническая риторика.",
        "en": "2 of 5 criteria of the driver are covered; short-range launches, part of the statements is chronic rhetoric."
      },
      "sources": [
        {
          "id": "www-reuters-com-north-korea-fires-two-missiles",
          "title": {
            "ru": "КНДР выпустила две предположительно баллистические ракеты у восточного побережья",
            "en": "North Korea fires two suspected ballistic missiles off east coast within three hours"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/asia-pacific/north-korea-fires-missile-off-east-coast-yonhap-says-2026-09-20/",
          "publication_date": "2026-09-20",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-reuters-com-north-korea-rejects-iaea-resolution",
          "title": {
            "ru": "КНДР назвала ядерный статус «необратимым» после резолюции МАГАТЭ",
            "en": "North Korea says nuclear status 'irreversible' after UN watchdog resolution"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/asia-pacific/north-korea-rejects-iaea-resolution-doubles-down-nuclear-status-kim-jong-un-2026-09-18/",
          "publication_date": "2026-09-18",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "iz-ru-kndr-iadernoe-oruzhiie-2167943",
          "title": {
            "ru": "КНДР предупредила США и Южную Корею о возможном применении ядерного оружия",
            "en": "North Korea warns US and South Korea of possible nuclear weapon use"
          },
          "domain": "iz.ru",
          "url": "https://iz.ru/2167943/2026-09-16/kndr-predupredila-ssha-i-iuzhnuiu-koreiu-o-vozmozhnom-primenenii-iadernogo-oruzhiia",
          "publication_date": "2026-09-16",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Ким Чен Ын пообещал расширить связи с Россией и поддержать её в войне; по заявлениям сторон, Северная Корея направила в Россию от 30 до 50 тысяч военных.",
        "en": "Kim Jong Un vowed to expand ties with Russia and back it in the war; according to claims by the parties, North Korea sent 30 to 50 thousand soldiers to Russia."
      },
      "why": {
        "ru": "Углубление военного сотрудничества Пхеньяна и Москвы влияет на баланс сил в регионе.",
        "en": "Deepening military cooperation between Pyongyang and Moscow affects the balance of power in the region."
      },
      "contribution": "medium",
      "confidence": "medium",
      "confidenceNote": {
        "ru": "Цифры вовлечения подтверждены только заявлениями сторон.",
        "en": "Involvement figures are confirmed only by claims of the parties."
      },
      "sources": [
        {
          "id": "www-reuters-com-kim-vows-expand-ties-russia",
          "title": {
            "ru": "Ким Чен Ын пообещал расширить связи с Россией и поддержать победу в «священной войне»",
            "en": "North Korea's Kim vows to expand ties with Russia, backs victory in 'sacred war'"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/asia-pacific/north-koreas-kim-vows-expand-ties-with-russia-backs-victory-sacred-war-2026-09-14/",
          "publication_date": "2026-09-14",
          "accessed_date": "2026-09-25",
          "source_type": "primary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "apostrophe-ua-korea-30-50-tys-soldat",
          "title": {
            "ru": "Северная Корея отправила в Россию от 30 до 50 тыс. солдат",
            "en": "North Korea sent 30 to 50 thousand soldiers to Russia"
          },
          "domain": "apostrophe.ua",
          "url": "https://apostrophe.ua/ru/world/obuchajutsja-rabotajut-s-dronami-severnaja-koreja-otpravila-v-rossiju-ot-30-do-50-tys-soldat.html",
          "publication_date": "2026-09-17",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
