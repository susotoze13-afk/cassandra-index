window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  s.regions["east-asia"] = {
  "index": 41,
  "delta": -1,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "КНДР запустила несколько баллистических ракет в сторону Японского моря; сначала был зафиксирован неопознанный снаряд, затем — серия пусков.",
        "en": "The DPRK fired several ballistic missiles toward the Sea of Japan; an unidentified projectile was recorded first, followed by a series of launches."
      },
      "why": {
        "ru": "Серийные пуски повышают напряжённость вокруг Корейского полуострова и требуют координации сил сдерживания.",
        "en": "Serial launches raise tension around the Korean peninsula and require coordination of deterrent forces."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "en-yna-co-kr-nkorea-ballistic-2026-09-12",
          "title": {
            "ru": "КНДР запустила баллистические ракеты, 12 сентября 2026",
            "en": "N. Korea fires ballistic missiles, September 12, 2026"
          },
          "domain": "en.yna.co.kr",
          "url": "https://en.yna.co.kr/view/PYH20260912021500315",
          "publication_date": "2026-09-12",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "iz-ru-en-nkorea-missiles-2165769",
          "title": {
            "ru": "Yonhap: КНДР запустила несколько баллистических ракет в сторону Японского моря",
            "en": "Yonhap: North Korea launched several ballistic missiles toward the Sea of Japan"
          },
          "domain": "iz.ru",
          "url": "https://iz.ru/en/2165769/2026-09-12/yonhap-reported-north-korea-launched-several-missiles-towards-sea-japan",
          "publication_date": "2026-09-12",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "usnews-com-nkorea-projectile-2026-09-11",
          "title": {
            "ru": "КНДР выпустила неопознанный снаряд в сторону Японского моря, сообщает Рёнхап",
            "en": "North Korea launches unidentified projectile toward East Sea, Yonhap reports"
          },
          "domain": "usnews.com",
          "url": "https://www.usnews.com/news/world/articles/2026-09-11/north-korea-launches-unidentified-projectile-toward-east-sea-yonhap-reports",
          "publication_date": "2026-09-11",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Посол Японии выступил на Совете управляющих МАГАТЭ по применению гарантий к ДКНЯР; генеральный директор МАГАТЭ открыл сентябрьскую сессию Совета управляющих.",
        "en": "Japan’s ambassador addressed the IAEA Board of Governors on safeguards for the DPRK; the IAEA Director General opened the Board’s September session."
      },
      "why": {
        "ru": "Перенос ядерной повестки КНДР на площадку МАГАТЭ закрепляет международный контроль за программой и повышает ставки пусков.",
        "en": "Bringing the DPRK nuclear file to the IAEA board entrenches international oversight of the programme and raises the stakes of launches."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "vie-mission-emb-japan-dprk-safeguards-2026-09-09",
          "title": {
            "ru": "Заявление посла Японии Кайфу Ацуши на Совете управляющих МАГАТЭ по ДКНЯР, 9 сентября 2026",
            "en": "Statement by Ambassador KAIFU Atsushi at the IAEA Board of Governors, DPRK safeguards, 9 September 2026"
          },
          "domain": "vie-mission.emb-japan.go.jp",
          "url": "https://www.vie-mission.emb-japan.go.jp/itprtop_en/11_000001_00769.html",
          "publication_date": "2026-09-09",
          "accessed_date": "2026-09-26",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "iaea-org-dg-statement-board-7-september-2026",
          "title": {
            "ru": "МАГАТЭ: вступительное заявление генерального директора на Совете управляющих, 7 сентября 2026",
            "en": "IAEA Director General's Introductory Statement to the Board of Governors, 7 September 2026"
          },
          "domain": "iaea.org",
          "url": "https://www.iaea.org/newscenter/statements/iaea-director-generals-introductory-statement-to-the-board-of-governors-7-september-2026",
          "publication_date": "2026-09-07",
          "accessed_date": "2026-09-26",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
