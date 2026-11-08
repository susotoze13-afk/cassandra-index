window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.regions["eu-north-europe"] = {
  "index": 0,
  "delta": 0,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Гибридные атаки: французские банки крови атакованы через несколько дней после взлома холодильников в европейских супермаркетах, Россия отвергает обвинения; европейские разведки обсуждают, кто стоит за серией атак.",
        "en": "Hybrid attacks: French blood banks were hit days after European supermarket freezers were hacked, Russia rejects the blame, and European intelligence services discuss who is behind the wave."
      },
      "why": {
        "ru": "Кибероперации против гражданской инфраструктуры — Д5.2 (в драйвере учтены оценки 1 и 0.5).",
        "en": "Cyber operations against civilian infrastructure are D5.2 (the driver counts scores of 1 and 0.5)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "cbsnews-france-blood-banks-cyber",
          "title": {
            "ru": "Французские банки крови подверглись кибератаке через несколько дней после взлома холодильников в Европе",
            "en": "Blood banks hit by cyberattack in France days after European freezer hacks"
          },
          "domain": "cbsnews.com",
          "url": "https://www.cbsnews.com/news/cyberattack-france-blood-bank/",
          "publication_date": "2026-11-04",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "latintimes-freezers-cyber-russia-blame",
          "title": {
            "ru": "Россия отвергает обвинения: взломанные холодильники супермаркетов испортили продукты по всей Европе",
            "en": "Russia Rejects Blame as Hacked Supermarket Freezers Spoil Food Across Europe"
          },
          "domain": "latintimes.com",
          "url": "https://www.latintimes.com/cyberattack-refrigeration-systems-european-supermarkets-600976",
          "publication_date": "2026-11-06",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "aljazeera-europe-hybrid-attacks",
          "title": {
            "ru": "Кто стоит за предполагаемыми гибридными атаками в Европе?",
            "en": "Who is behind Europe's suspected hybrid attacks?"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/video/inside-story/2026/11/7/who-is-behind-europes-suspected-hybrid-attacks",
          "publication_date": "2026-11-07",
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
        "ru": "Учения и производство: более 6 000 военных НАТО на германских учениях в Литве, европейские военные тренируются в Польше, польские компании кооперируются по производству САУ Bohdana.",
        "en": "Drills and production: more than 6,000 NATO troops in German-led drills in Lithuania, European troops training in Poland, and Polish companies cooperating on Bohdana howitzer production."
      },
      "why": {
        "ru": "Мобилизация производства и учения (Д6.3, Д1.2) — индикатор подготовки к длительной конфронтации.",
        "en": "Mobilising production and drills (D6.3, D1.2) indicate preparation for a prolonged confrontation."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "aa-nato-lithuania-drills",
          "title": {
            "ru": "Более 6 000 военных НАТО примут участие в учениях под руководством ФРГ в Литве",
            "en": "More than 6,000 NATO troops to take part in German-led drills in Lithuania"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/europe/more-than-6-000-nato-troops-to-take-part-in-german-led-drills-in-lithuania/4114400",
          "publication_date": "2026-11-06",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "defensenews-coalition-262-poland",
          "title": {
            "ru": "Европейские военные проведут учения в Польше в рамках подготовки развёртывания на Украине после войны",
            "en": "European troops set to train in Poland for postwar Ukraine deployment"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/news/2026/11/07/european-troops-set-to-train-in-poland-for-postwar-ukraine-deployment/",
          "publication_date": "2026-11-07",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "militarnyi-poland-bohdana-production",
          "title": {
            "ru": "Польские компании договорились о сотрудничестве в производстве САУ Bohdana",
            "en": "Polish Companies Agree to Cooperate on Production of the Bohdana Self-Propelled Howitzer"
          },
          "domain": "militarnyi.com",
          "url": "https://militarnyi.com/en/news/polish-companies-agree-to-cooperate-on-production-of-the-bohdana-self-propelled-howitzer/",
          "publication_date": "2026-11-03",
          "accessed_date": "2026-11-08",
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
