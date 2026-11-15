window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.regions["middle-east"] = {
  "index": 66.8,
  "delta": -0.7,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Иран заявил об ударе шестью дронами по радиолокационному узлу США в Бахрейне; Бахрейн выпустил первые с сентября предупреждения, США отвергли часть заявлений и сообщили о сбитых дронах.",
        "en": "Iran said it struck a US radar site in Bahrain with six drones; Bahrain issued its first alerts since September, while the US rejected part of the claim and reported downing drones."
      },
      "why": {
        "ru": "Прямой удар по объекту США вне иранского театра и спор о фактах (Д1.4, Д7.2, Д5.3).",
        "en": "A direct strike on a US facility outside the Iranian theatre and a dispute over facts (D1.4, D7.2, D5.3)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "aa-bahrain-six-drones",
          "title": {
            "ru": "Иран заявил об ударе шестью дронами по радиолокатору США в Бахрейне",
            "en": "Iran says it targeted US radar site in Bahrain with 6 drones"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/iran-says-it-targeted-us-radar-site-in-bahrain-with-6-drones/4125490",
          "publication_date": "2026-11-15",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-bahrain-radar",
          "title": {
            "ru": "Иран ударил БПЛА по радиолокационной инфраструктуре базы США в Бахрейне — КСИР",
            "en": "Iran strikes by UAVs radar infrastructure at US military base in Bahrain - IRGC"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2218255",
          "publication_date": "2026-11-15",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "guardian-iran-radar-bahrain",
          "title": {
            "ru": "Иран заявил об ударе по радиолокатору США в Бахрейне",
            "en": "Iran says it targeted US military radar in Bahrain in retaliatory strike"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/nov/13/iran-us-radar-bahrain-sirik-hormuz",
          "publication_date": "2026-11-13",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "iranintl-us-rejects-radar",
          "title": {
            "ru": "США отвергли заявление Ирана о радиолокаторе и сообщили о сбитых дронах",
            "en": "US rejects Iran's radar claim, says it shot down drones over Bahrain"
          },
          "domain": "iranintl.com",
          "url": "https://www.iranintl.com/en/202611137770",
          "publication_date": "2026-11-13",
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
        "ru": "Три танкера горели после подрыва на минах в Ормузе; ООН требует восстановить безопасное судоходство и пропустить удобрения.",
        "en": "Three tankers burned after hitting mines in Hormuz; the UN demands restored safe navigation and passage for fertilisers."
      },
      "why": {
        "ru": "Морская блокада и страхование (Д4.3, Д4.4, Д9.3).",
        "en": "Maritime blockade and insurance (D4.3, D4.4, D9.3)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "almonitor-tankers-mines",
          "title": {
            "ru": "ВМС Ирана: три танкера горят после подрыва на минах в Ормузе",
            "en": "Iran's navy says three tankers on fire after hitting mines in Hormuz"
          },
          "domain": "al-monitor.com",
          "url": "https://www.al-monitor.com/originals/2026/11/irans-navy-says-three-tankers-fire-after-hitting-mines-hormuz",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
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
        },
        {
          "id": "almonitor-fertilisers",
          "title": {
            "ru": "ООН призывает Иран и США пропустить удобрения через Ормуз",
            "en": "UN official urges Iran, US to let fertilisers through Hormuz Strait"
          },
          "domain": "al-monitor.com",
          "url": "https://www.al-monitor.com/originals/2026/11/un-official-urges-iran-us-let-fertilisers-through-hormuz-strait",
          "publication_date": "2026-11-14",
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
