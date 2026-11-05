window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["africa"] = {
  "index": 72.9,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Судан: пять детей погибли при ударе дрона по рынку в Ньяле, жители Эль-Обейда зажаты между дронами и арестами, Великобритания ввела санкции против суданских военных за «кампанию насилия» в Эль-Фашире. В Эфиопии удары дронов убили не менее 25 человек.",
        "en": "Sudan: five children were killed in a drone strike on a market in Nyala, residents of El Obeid are caught between drones and arrests, and the UK sanctioned Sudanese military figures over the \"campaign of violence\" in El Fasher. In Ethiopia drone strikes killed at least 25 people."
      },
      "why": {
        "ru": "Удары по гражданским объектам в двух странах одновременно — сигнал Д1.4 и Д8.3, санкции — Д3.3.",
        "en": "Strikes on civilian objects in two countries at once are a D1.4 and D8.3 signal; sanctions are D3.3."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "un-news-sudan-market",
          "title": {
            "ru": "ООН: пять детей погибли при ударе дрона по рынку в Ньяле, Судан",
            "en": "World News in Brief: 5 children killed in Sudan, Haiti hunger emergency, Yemen war update"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/feed/view/en/story/2026/10/1168703",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "un-news-sudan-el-obeid",
          "title": {
            "ru": "Жители Эль-Обейда в Судане зажаты между дронами и арестами",
            "en": "Civilians in Sudan's El Obeid trapped between drones and incarceration"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/feed/view/en/story/2026/10/1168696",
          "publication_date": "2026-10-28",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "africanews-ethiopia-drones",
          "title": {
            "ru": "Удары дронов в Эфиопии: не менее 25 погибших, по свидетельствам",
            "en": "Drone strikes in Ethiopia kill at least 25: witnesses"
          },
          "domain": "africanews.com",
          "url": "http://www.africanews.com/2026/10/31/drone-strikes-in-ethiopia-kill-at-least-25-witnesses/",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Санкции США против Руанды вызвали смешанную реакцию в Гоме; президент Руто требует компенсации для кенийцев, завербованных в российскую армию; Эфиопия получает 12 российских Су-35.",
        "en": "US sanctions on Rwanda drew a mixed reaction in Goma; Kenya's president demands compensation for Kenyans recruited into the Russian army; Ethiopia is receiving 12 Russian Su-35s."
      },
      "why": {
        "ru": "Внешние санкции, вербовка в чужую армию и поставки тяжёлых вооружений связывают регион с глобальной конфронтацией (Д3.3, Д9.2).",
        "en": "External sanctions, recruitment into a foreign army and heavy arms deliveries link the region to the global confrontation (D3.3, D9.2)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "africanews-rwanda-sanctions",
          "title": {
            "ru": "ДР Конго: санкции США против Руанды вызвали смешанную реакцию в Гоме",
            "en": "DRC: US sanctions on Rwanda draw mixed reactions in Goma"
          },
          "domain": "africanews.com",
          "url": "http://www.africanews.com/2026/10/29/drc-us-sanctions-on-rwanda-draw-mixed-reactions-in-goma/",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "africanews-kenya-recruits",
          "title": {
            "ru": "Президент Руто требует компенсации для кенийцев, завербованных в российскую армию",
            "en": "President Ruto seeks compensation for Kenyans recruited into Russian military"
          },
          "domain": "africanews.com",
          "url": "http://www.africanews.com/2026/10/30/president-ruto-seeks-compensation-for-kenyans-recruited-into-russian-military/",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "twz-ethiopia-su35",
          "title": {
            "ru": "Эфиопия получает 12 российских Су-35 и присматривается к С-400",
            "en": "Ethiopia gets 12 Russian Su-35 fighters, eyes S-400 air defenses"
          },
          "domain": "twz.com",
          "url": "https://www.twz.com/air/ethiopia-gets-12-russian-su-35-fighters-eyes-s-400-air-defenses",
          "publication_date": "2026-10-28",
          "accessed_date": "2026-11-01",
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
