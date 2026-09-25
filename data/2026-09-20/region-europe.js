window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.regions["europe"] = {
  "index": 59,
  "delta": -9,
  "status": "danger",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Активная фаза учений Namejs 2026 прошла в Риге 16–20 сентября; Литва провела военные учения в 12 муниципалитетах на фоне продолжающихся проверок восточной границы НАТО.",
        "en": "The active phase of exercise Namejs 2026 took place in Riga on 16–20 September; Lithuania held military drills across 12 municipalities amid continued probes of NATO's eastern border."
      },
      "why": {
        "ru": "Крупные учения в непосредственной близости от восточной границы альянса повышают плотность сил и риск инцидентов.",
        "en": "Large drills close to the alliance's eastern border raise force density and the risk of incidents."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "www-riga-lv-namejs-2026-active-phase",
          "title": {
            "ru": "16–20 сентября: активная фаза учений Namejs 2026 пройдёт в Риге",
            "en": "16–20 September: active phase of exercise Namejs 2026 will take place in Riga"
          },
          "domain": "riga.lv",
          "url": "https://www.riga.lv/en/article/16-20-september-active-phase-exercise-namejs-2026-will-take-place-riga-soldiers-military-vehicles-and-exercise-checkpoints-will-be-visible-across-city",
          "publication_date": "2026-09-16",
          "accessed_date": "2026-09-25",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        },
        {
          "id": "euromaidanpress-com-lithuania-exercises-12-municipalities",
          "title": {
            "ru": "Литва начала военные учения в 12 муниципалитетах на фоне проверок НАТО восточной границы",
            "en": "Lithuania launches military exercises across 12 municipalities as Russia keeps probing NATO's eastern border"
          },
          "domain": "euromaidanpress.com",
          "url": "https://euromaidanpress.com/2026/09/14/lithuania-launches-military-exercises-across-12-municipalities-as-russia-keeps-probing-natos-eastern-border/",
          "publication_date": "2026-09-14",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "eng-lsm-lv-namejs-drills-riga-a663399",
          "title": {
            "ru": "Учения Namejs проходят в Риге и её окрестностях",
            "en": "Namejs military drills taking place in and around Rīga"
          },
          "domain": "eng.lsm.lv",
          "url": "https://eng.lsm.lv/article/society/defence/16.09.2026-namejs-military-drills-taking-place-in-and-around-riga.a663399/",
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
        "ru": "Зафиксированы удары России вблизи границ Польши; Литва подтвердила данные Польши о подготовке Россией гибридных атак против союзников Украины.",
        "en": "Russian strikes were recorded near Poland's borders; Lithuania confirmed Polish reports of Russia preparing hybrid attacks against Ukraine's allies."
      },
      "why": {
        "ru": "Удары и подготовка гибридных операций вблизи территории альянса поддерживают постоянно высокое напряжение на восточном фланге.",
        "en": "Strikes and preparations for hybrid operations near alliance territory keep tension on the eastern flank persistently high."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "www-svoboda-org-a-udary-rossii-vblizi-granits-poljshi",
          "title": {
            "ru": "Удары России вблизи границ Польши",
            "en": "Russian strikes near Poland's borders"
          },
          "domain": "svoboda.org",
          "url": "https://www.svoboda.org/a/udary-rossii-vblizi-granits-poljshi/33854008.html",
          "publication_date": "2026-09-14",
          "accessed_date": "2026-09-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "www-pravda-com-ua-rus-litva-gibridnye-ataki-8054030",
          "title": {
            "ru": "Литва подтвердила данные Польши о подготовке Россией гибридных атак против союзников Украины",
            "en": "Lithuania confirms Polish reports of Russia preparing hybrid attacks against Ukraine's allies"
          },
          "domain": "pravda.com.ua",
          "url": "https://www.pravda.com.ua/rus/news/2026/09/18/8054030/",
          "publication_date": "2026-09-18",
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
