window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
  s.regions["ukraine-moldova"] = {
  "index": 69,
  "delta": 6,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Согласовано локальное гуманитарное перемирие в Олешках: Москва и Киев подтверждают выполнение обязательств, Зеленский рассчитывает на посредничество США, вступление в силу — 27 октября.",
        "en": "A local humanitarian ceasefire in Oleshky has been agreed: Moscow and Kyiv confirm compliance, Zelensky counts on US mediation, and it takes effect on 27 October."
      },
      "why": {
        "ru": "Даже ограниченное перемирие — первый работающий механизм деэскалации за неделю, хотя оно не покрывает фронт.",
        "en": "Even a limited ceasefire is the first working de-escalation mechanism of the week, although it does not cover the front line."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "cbs-melania-ceasefire-1023",
          "title": {
            "ru": "Мелания Трамп добилась временного перемирия в Олешках",
            "en": "Melania Trump helps secure temporary ceasefire between Russia and Ukraine in Oleshky"
          },
          "domain": "cbsnews.com",
          "url": "https://www.cbsnews.com/news/first-lady-melania-trump-temporary-ceasefire-russia-ukraine-oleshky/",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-zelensky-oleshky-1024",
          "title": {
            "ru": "Зеленский: Украина соблюдает перемирие в Олешках и рассчитывает на посредничество США",
            "en": "Zelenskyy says Ukraine will honor Oleshky ceasefire, counts on US mediation to work"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/politics/zelenskyy-says-ukraine-will-honor-oleshky-ceasefire-counts-on-us-mediation-to-work/4099683",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "tass-alyoshki-1024",
          "title": {
            "ru": "Россия и Украина выполняют обязательства по перемирию в Алёшках",
            "en": "Russia, Ukraine fulfil their commitments toward Alyoshki ceasefire"
          },
          "domain": "tass.com",
          "url": "https://tass.com/politics/2207325",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "hindu-ceasefire-oct27-1024",
          "title": {
            "ru": "Локальное гуманитарное перемирие с Россией начнётся 27 октября, заявил переговорщик",
            "en": "Local humanitarian ceasefire with Russia will start on October 27, says negotiator"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/local-humanitarian-ceasefire-with-russia-will-start-on-october-27-says-negotiator/article71618931.ece",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Военная связь Украины зависит от коммерческого решения: SpaceX ограничивала скорость Starshield из-за ударов дронами, затем восстановила её после контактов на высоком уровне; за два года страна потеряла почти 14 % локомотивов.",
        "en": "Ukraine's military communications depend on a commercial decision: SpaceX throttled Starshield speeds over drone strikes, then restored them after high-level contacts; in two years the country has lost nearly 14% of its locomotives."
      },
      "why": {
        "ru": "Ограничение спутниковой связи и износ транспорта бьют по логистике и управлению войсками.",
        "en": "Restricted satellite communications and worn-out transport hit logistics and command and control."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "cbs-musk-starlink-1024",
          "title": {
            "ru": "Маск: SpaceX ограничивала скорость Starlink для Украины из-за ударов дронами",
            "en": "Elon Musk says SpaceX throttled Ukraine Starlink speeds over drone strikes"
          },
          "domain": "cbsnews.com",
          "url": "https://www.cbsnews.com/news/ukraine-starlink-drone-spacex-musk-speed-restriction/",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-starshield-restored-1024",
          "title": {
            "ru": "Украина: ограничения скорости Starshield сняты после контактов на высоком уровне",
            "en": "Ukraine says Starshield speed restrictions lifted after high-level contacts"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/ukraine-says-starshield-speed-restrictions-lifted-after-high-level-contacts/4099455",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "tass-locomotives-1025",
          "title": {
            "ru": "Украина потеряла почти 14 % локомотивов менее чем за два года",
            "en": "Ukraine loses nearly 14% of its locomotives in less than two years"
          },
          "domain": "tass.com",
          "url": "https://tass.com/economy/2207397",
          "publication_date": "2026-10-25",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
})();
