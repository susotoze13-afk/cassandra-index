window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.regions["ukraine-moldova"] = {
  "index": 67.5,
  "delta": -4.1,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Киев после ударов по энергосистеме: отключения света и дефицит воды, поражена подстанция в Житомирской области.",
        "en": "Kyiv after strikes on the power grid: blackouts and water shortages, and a substation in the Zhitomir region was hit."
      },
      "why": {
        "ru": "Прямой сигнал Д1.4: цели ударов — энергетика страны.",
        "en": "A direct D1.4 signal: the strikes target the country's energy sector."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "guardian-kyiv-energy-grid-strike",
          "title": {
            "ru": "Отключения света и дефицит воды в Киеве после ударов России по энергосистеме Украины",
            "en": "Blackouts and water shortages in Kyiv after Russia strikes Ukraine's energy grid"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/nov/07/blackout-water-shortage-kyiv-russia-strike-ukraine-energy-grid",
          "publication_date": "2026-11-07",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-zhitomir-substation",
          "title": {
            "ru": "Российские войска поразили электроподстанцию в Житомирской области",
            "en": "Russian forces hit electrical substation in Zhitomir region"
          },
          "domain": "tass.com",
          "url": "https://tass.com/defense/2214397",
          "publication_date": "2026-11-08",
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
        "ru": "Гуманитарная миссия в Алёшках официально завершилась, омбудсмены России и Украины договорились о ежемесячных миссиях. Переговоры России, США и Украины назначены в Абу-Даби на 10–11 ноября, делегацию Киева возглавит глава офиса Зеленского.",
        "en": "The humanitarian mission in Oleshky officially ended and Russian and Ukrainian rights chiefs agreed on monthly missions. Russia-US-Ukraine talks are set for Abu Dhabi on 10–11 November, with Zelensky's office head leading Kyiv's delegation."
      },
      "why": {
        "ru": "Договорённость о миссиях (Д3.5, Д8.2) и переговорный трек (Д3.4) — деэскалационная часть недели, хотя удары не прекратились.",
        "en": "The agreement on missions (D3.5, D8.2) and the negotiating track (D3.4) form the de-escalatory part of the week, although the strikes did not stop."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "latintimes-oleshky-monthly-aid-missions",
          "title": {
            "ru": "Омбудсмены России и Украины договорились о ежемесячных гуманитарных миссиях в Алешки",
            "en": "Russia and Ukraine's Rights Chiefs Agree to Monthly Aid Missions for Occupied Oleshky After Ceasefire"
          },
          "domain": "latintimes.com",
          "url": "https://www.latintimes.com/russia-ukraine-monthly-humanitarian-missions-oleshky-600839",
          "publication_date": "2026-11-03",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "vedomosti-lantratova-oleshky-mission-completed",
          "title": {
            "ru": "Лантратова: гуманитарная миссия в Алешках официально завершилась 1 ноября",
            "en": "Lantratova: the humanitarian mission in Oleshky officially ended on November 1"
          },
          "domain": "vedomosti.ru",
          "url": "https://www.vedomosti.ru/politics/news/2026/11/02/1242032-gumanitarnaya-missiya",
          "publication_date": "2026-11-02",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-abu-dhabi-talks-nov10",
          "title": {
            "ru": "Переговоры России, США и Украины пройдут в Абу-Даби 10–11 ноября, заявил Уиткофф",
            "en": "Russia-US-Ukraine talks to be held in Abu Dhabi on November 10-11, Witkoff says"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2212141",
          "publication_date": "2026-11-03",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-zelensky-delegation-abu-dhabi",
          "title": {
            "ru": "Глава офиса Зеленского возглавит делегацию Киева на переговорах в Абу-Даби",
            "en": "Zelensky's office head to lead Kiev's delegation to Abu Dhabi talks"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2213991",
          "publication_date": "2026-11-06",
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
