window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.regions["ukraine-moldova"] = {
  "index": 62,
  "delta": 6,
  "status": "very",
  "background": true,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Глубокий удар украинских дронов по Санкт-Петербургу и Ленинградской области сопровождался ударами по расчётам дронов ВСУ под Добропольем; война продолжается без признаков оперативной паузы.",
        "en": "A deep Ukrainian drone strike on St Petersburg and the Leningrad Region was accompanied by Russian strikes on Ukrainian drone crews near Dobropolye; the war continues without an operational pause."
      },
      "why": {
        "ru": "Обмен ударами по тылу и фронту удерживает высокую интенсивность войны и риск эскалации вдоль всей линии.",
        "en": "Mutual strikes on rear and front sustain high war intensity and escalation risk along the entire line."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "tass-leningrad-largest-drone-attack",
          "title": {
            "ru": "Атака дронов на Ленинградскую область — одна из крупнейших за четыре года",
            "en": "Drone attack on Leningrad Region one of largest in four years"
          },
          "domain": "tass.com",
          "url": "https://tass.com/emergencies/2203667",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aljazeera-st-petersburg-drone-swarm",
          "title": {
            "ru": "Санкт-Петербург под атакой роя украинских дронов",
            "en": "St Petersburg under attack from Ukrainian drone swarm"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/st-petersburg-under-attack-from-ukrainian-drone-swarm",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "tass-dobropolye-drone-crews",
          "title": {
            "ru": "Удары России уничтожили половину из почти 500 украинских расчётов дронов под Добропольем",
            "en": "Russian strikes destroy half of nearly 500 Ukrainian drone crews near Dobropolye"
          },
          "domain": "tass.com",
          "url": "https://tass.com/defense/2203653",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "МАГАТЭ опубликовало очередное обновление о ситуации на украинских АЭС, а у Запорожской АЭС сохраняется активность беспилотников несмотря на перемирие.",
        "en": "The IAEA published another update on the situation at Ukrainian nuclear plants, and drone activity persists near the Zaporizhzhia NPP despite a ceasefire."
      },
      "why": {
        "ru": "Ядерная безопасность на линии фронта остаётся источником трансграничного риска, даже когда боевые действия локальны.",
        "en": "Nuclear safety on the front line remains a source of cross-border risk even when fighting is local."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "iaea-update-371-ukraine",
          "title": {
            "ru": "Обновление 371 — заявление генерального директора МАГАТЭ о ситуации в Украине",
            "en": "Update 371 - IAEA Director General Statement on Situation in Ukraine"
          },
          "domain": "iaea.org",
          "url": "https://www.iaea.org/newscenter/pressreleases/update-371-iaea-director-general-statement-on-situation-in-ukraine",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "tass-zaporizhzhia-npp-drone-ceasefire",
          "title": {
            "ru": "Активность украинских беспилотников у Запорожской АЭС и Энергодара сохраняется несмотря на перемирие",
            "en": "Ukrainian drone activity near Zaporozhye NPP, Energodar persists despite ceasefire"
          },
          "domain": "tass.com",
          "url": "https://tass.com/economy/2203639",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
})();
