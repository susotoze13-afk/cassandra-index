window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.regions["russia-belarus"] = {
  "index": 0,
  "delta": 0,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Удары по украинской энергосистеме: Киев остался без света и с дефицитом воды, поражена подстанция в Житомирской области. Российские силы за неделю наносили удары по украинской логистике и позициям войск на передовой.",
        "en": "Strikes on Ukraine's power grid: Kyiv was left without electricity and short of water, and a substation in the Zhitomir region was hit. Russian forces spent the week striking Ukrainian logistics and frontline positions, according to reports."
      },
      "why": {
        "ru": "Для региона это прямые сигналы Д1.4 и Д1.3: удары идут по его собственной энергетике и логистике.",
        "en": "For the region these are direct D1.4 and D1.3 signals: the strikes target its own energy system and logistics."
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
        },
        {
          "id": "sputnikglobe-ukraine-logistics-blitz",
          "title": {
            "ru": "Российские силы разрушили украинскую логистику и позиции войск на передовой за неделю ударов",
            "en": "Russian Forces Devastate Ukrainian Logistics and Frontline Troops in Week-Long Blitz"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261106/russian-forces-devastate-ukrainian-logistics-and-frontline-troops-in-week-long-blitz-1125025222.html",
          "publication_date": "2026-11-06",
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
        "ru": "Россия наращивает производство ракет вопреки санкциям — до 700 баллистических ракет к октябрю 2026 года. Атаки украинских дронов расширяют ограничения полётов в России, а старший российский законодатель заявил, что Европа рассчитывала на перемирие, чтобы ввести войска на Украину.",
        "en": "Russia keeps building missiles despite sanctions, amassing up to 700 ballistic missiles by October 2026. Ukrainian drone attacks are widening flight restrictions in Russia, and a senior Russian lawmaker said Europe hoped for a Ukraine truce to deploy troops there."
      },
      "why": {
        "ru": "Производство вооружений (Д6.3), ограничения в воздухе (Д9.3) и риторика (Д5.1) — каналы, через которые регион наращивает конфронтацию.",
        "en": "Weapons production (D6.3), air restrictions (D9.3) and rhetoric (D5.1) are the channels through which the region builds up confrontation."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "united24media-russia-missile-production",
          "title": {
            "ru": "Россия наращивает производство ракет вопреки санкциям: до 700 баллистических ракет к октябрю 2026 года",
            "en": "Russia Keeps Building Missiles Despite Sanctions, Amassing Up to 700 Ballistic Missiles by October 2026"
          },
          "domain": "united24media.com",
          "url": "https://united24media.com/war-in-ukraine/russia-keeps-building-missiles-despite-sanctions-amassing-up-to-700-ballistic-missiles-by-october-2026-24069",
          "publication_date": "2026-11-04",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "aa-russia-aviation-restrictions",
          "title": {
            "ru": "Атаки украинских дронов влияют на российскую авиацию: ограничения полётов растут",
            "en": "Ukrainian drone attacks affect Russian aviation as flight restrictions rise"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/eurasia/ukrainian-drone-attacks-affect-russian-aviation-as-flight-restrictions-rise/4109546",
          "publication_date": "2026-11-03",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-tolstoy-europe-truce-troops",
          "title": {
            "ru": "Европа рассчитывала на перемирие на Украине, чтобы ввести туда войска, — старший российский законодатель",
            "en": "Europe hoped for Ukraine truce to deploy troops there — senior Russian lawmaker"
          },
          "domain": "tass.com",
          "url": "https://tass.com/politics/2214375",
          "publication_date": "2026-11-08",
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
