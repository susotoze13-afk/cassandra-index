window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.regions["south-asia"] = {
  "index": 74.3,
  "delta": 5.9,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "В операциях в Хайбер-Пахтунхве и Белуджистане убиты 24 боевика, погибли четверо военных, включая майора.",
        "en": "Operations in Khyber Pakhtunkhwa and Balochistan killed 24 militants and four troops, including a major."
      },
      "why": {
        "ru": "Активные боевые действия внутри страны (Д1.4).",
        "en": "Active combat inside the country (D1.4)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "dawn-24-militants",
          "title": {
            "ru": "Пакистан: 24 боевика уничтожены в Хайбер-Пахтунхве и Белуджистане",
            "en": "Major among 4 troops martyred, 24 terrorists killed during operations in KP and Balochistan: ISPR"
          },
          "domain": "dawn.com",
          "url": "https://www.dawn.com/news/2044488/major-among-4-troops-martyred-24-terrorists-killed-during-operations-in-kp-and-balochistan-ispr",
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
        "ru": "ООН сообщает о не менее 25 погибших моряках в Ормузском проливе — маршрут критичен для поставок энергоносителей в Южную Азию.",
        "en": "The UN reports at least 25 sailors killed in Hormuz — the route is critical for South Asian energy supplies."
      },
      "why": {
        "ru": "Разрыв цепочек поставок и морские риски (Д4.3, Д9.3).",
        "en": "Supply-chain rupture and maritime risk (D4.3, D9.3)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "reportaz-hormuz-sailors",
          "title": {
            "ru": "ООН: не менее 25 моряков погибли в Ормузском проливе и вокруг него",
            "en": "At least 25 sailors killed in and around Strait of Hormuz, UN says"
          },
          "domain": "report.az",
          "url": "https://report.az/en/other-countries/at-least-25-sailors-killed-in-and-around-strait-of-hormuz-un-says",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "aa-un-maritime-attacks",
          "title": {
            "ru": "ООН предупреждает о росте морских атак и требует восстановить судоходство",
            "en": "UN warns of rising maritime attacks, urges restoration of safe navigation in Strait of Hormuz, Red Sea"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/un-warns-of-rising-maritime-attacks-urges-restoration-of-safe-navigation-in-strait-of-hormuz-red-sea/4124809",
          "publication_date": "2026-11-13",
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
