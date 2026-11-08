window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.drivers = [
  {
    "label": {
      "ru": "Ормуз: мины, новые атаки и обещание открыть пролив за 48 часов",
      "en": "Hormuz: mines, fresh attacks and an offer to reopen the strait in 48 hours"
    },
    "observation": {
      "ru": "Ормузский пролив остаётся зоной атак: два танкера подорвались на минах, о чём сообщил КСИР, новая волна ударов задела танкеры и газовоз в проливе и Персидском заливе, ОАЭ спасли 22 моряка. Тегеран предложил вновь открыть пролив в течение 48 часов при проекте сделки с США, Трамп говорит, что сделка «может случиться». При этом нефть идёт к недельному падению на 12 % вопреки новым атакам на танкеры.",
      "en": "The Strait of Hormuz remains a strike zone: two tankers hit mines, the IRGC said, a fresh wave of attacks hit tankers and an LNG carrier in the strait and the Persian Gulf, and the UAE rescued 22 sailors. Tehran offered to reopen the strait within 48 hours under a draft US deal, and Trump says a deal \"could happen\". Yet oil is heading for a 12 % weekly loss despite the fresh tanker attacks."
    },
    "why": {
      "ru": "Морской маршрут остаётся под ударом (Д1.4, Д4.4, Д7.2), но рыночный стресс и перебои поставок ослабли (Д4.3–Д4.6) — этот сдвиг работал на недельное снижение индекса.",
      "en": "The sea route stays under attack (D1.4, D4.4, D7.2), but market stress and supply disruption eased (D4.3–D4.6) — a shift that pulled the weekly index down."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "tass-hormuz-tankers-mines",
        "title": {
          "ru": "Два танкера подорвались на минах в Ормузском проливе — КСИР",
          "en": "Two tankers hit mines in Hormuz — IRGC"
        },
        "domain": "tass.com",
        "url": "https://tass.com/world/2214367",
        "publication_date": "2026-11-07",
        "accessed_date": "2026-11-08",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      },
      {
        "id": "gcaptain-hormuz-new-wave-attacks",
        "title": {
          "ru": "Новая волна атак на танкеры и газовоз в Ормузском проливе и Персидском заливе",
          "en": "New Wave of Attacks Hits Tankers and LNG Carrier in Strait of Hormuz and Persian Gulf"
        },
        "domain": "gcaptain.com",
        "url": "https://gcaptain.com/new-wave-of-attacks-hits-tankers-and-lng-carrier-in-strait-of-hormuz-and-persian-gulf/",
        "publication_date": "2026-11-02",
        "accessed_date": "2026-11-08",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "aljazeera-iran-war-live-nov8",
        "title": {
          "ru": "Война с Ираном онлайн: США перекрывают наземные маршруты снабжения; ОАЭ спасли 22 моряка",
          "en": "Iran war live: US moves to block land supply routes; UAE rescues 22 sailors"
        },
        "domain": "aljazeera.com",
        "url": "https://www.aljazeera.com/news/liveblog/2026/11/8/iran-war-live-explosions-hit-qeshm-us-moves-to-block-land-supply-routes",
        "publication_date": "2026-11-08",
        "accessed_date": "2026-11-08",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      },
      {
        "id": "dailysabah-iran-hormuz-two-days",
        "title": {
          "ru": "Иран предлагает вновь открыть Ормузский пролив за два дня на фоне проекта сделки с США",
          "en": "Iran offers to reopen Hormuz in 2 days as draft US deal circulates"
        },
        "domain": "dailysabah.com",
        "url": "https://www.dailysabah.com/world/mid-east/iran-offers-to-reopen-hormuz-in-2-days-as-draft-us-deal-circulates",
        "publication_date": "2026-11-02",
        "accessed_date": "2026-11-08",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      },
      {
        "id": "oilprice-12pct-weekly-loss",
        "title": {
          "ru": "Нефть идёт к недельному падению на 12 % несмотря на новые атаки на танкеры",
          "en": "Oil Prices Head for 12% Weekly Loss Despite Fresh Tanker Attacks"
        },
        "domain": "oilprice.com",
        "url": "https://oilprice.com/Latest-Energy-News/World-News/Oil-Prices-Head-for-12-Weekly-Loss-Despite-Fresh-Tanker-Attacks.html",
        "publication_date": "2026-11-06",
        "accessed_date": "2026-11-08",
        "source_type": "secondary",
        "cluster_id": "F-financial",
        "state_affiliated": false,
        "origin": "collected-in-week"
      }
    ]
  },
  {
    "label": {
      "ru": "Риторика и подготовка удара: «война шире», угрозы нефтяным объектам, переброска сил",
      "en": "Rhetoric and strike preparation: a \"wider war\", threats to oil facilities, force movements"
    },
    "observation": {
      "ru": "Верховный лидер Ирана предупредил о расширении войны в случае новых ударов США; иранский депутат пригрозил нефтяным объектам Саудовской Аравии и заявил, что Британия может оказаться в зоне досягаемости ракет. США начали воздушную переброску в Израиль в преддверии возможной военной операции против Ирана, USS Theodore Roosevelt прибыл в Сингапур перед выходом третьей авианосной группы на Ближний Восток. Вашингтон создал оперативную группу для перекрытия наземных маршрутов снабжения Ирана.",
      "en": "Iran's supreme leader warned of a wider war if the US strikes again; an Iranian MP threatened Saudi oil facilities and said Britain could be within missile range. The US began an airlift to Israel ahead of a possible military operation against Iran, and USS Theodore Roosevelt arrived in Singapore before the third carrier strike group reaches the Middle East. Washington set up a task force to block Iran's land-based supply routes."
    },
    "why": {
      "ru": "Риторика держится на верхней оценке (Д5.1 = 1), а подготовка удара и перекрытие снабжения видны в Д1.5 и Д1.3 — эскалационный противовес недельному снижению индекса.",
      "en": "Rhetoric stays at the top score (D5.1 = 1), while strike preparation and supply-route interdiction show up in D1.5 and D1.3 — an escalation counterweight to the weekly index decline."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "khaleejtimes-khamenei-wider-war",
        "title": {
          "ru": "Верховный лидер Ирана предупредил о расширении войны в случае новых ударов США",
          "en": "Iran supreme leader warns of wider war if US attacks after Trump election rout"
        },
        "domain": "khaleejtimes.com",
        "url": "https://www.khaleejtimes.com/world/mena/iran-supreme-leader-warns-of-wider-war-if-us-attacks-after-trump-election-rout",
        "publication_date": "2026-11-04",
        "accessed_date": "2026-11-08",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "arabtimes-iranian-mp-threats",
        "title": {
          "ru": "Иранский депутат угрожает нефтяным объектам Саудовской Аравии и предупреждает, что Британия может оказаться в зоне досягаемости ракет",
          "en": "Iranian MP Threatens Saudi Oil Facilities and Warns Britain Could Be Within Missile Range"
        },
        "domain": "arabtimesonline.com",
        "url": "https://www.arabtimesonline.com/news/iranian-mp-threatens-saudi-oil-facilities-and-warns-britain-could-be-within-missile-range/",
        "publication_date": "2026-11-07",
        "accessed_date": "2026-11-08",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "israeldefense-us-airlift-israel",
        "title": {
          "ru": "США начали воздушную переброску в Израиль в преддверии возможной военной операции против Ирана",
          "en": "US Launches Airlift to Israel Ahead of Possible Military Action in Iran"
        },
        "domain": "israeldefense.co.il",
        "url": "https://www.israeldefense.co.il/en/node/72294",
        "publication_date": "2026-11-03",
        "accessed_date": "2026-11-08",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "twz-roosevelt-third-strike-group",
        "title": {
          "ru": "USS Theodore Roosevelt прибыл в Сингапур — последняя стоянка перед выходом третьей авианосной группы на Ближний Восток",
          "en": "USS Theodore Roosevelt Arrives In Singapore; Last Stop Before Third Strike Group Reaches The Middle East"
        },
        "domain": "twz.com",
        "url": "https://www.twz.com/sea/uss-theodore-roosevelt-arrives-in-singapore-last-stop-before-third-strike-group-reaches-the-middle-east",
        "publication_date": "2026-11-06",
        "accessed_date": "2026-11-08",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "aljazeera-iran-land-supply-task-force",
        "title": {
          "ru": "США создали оперативную группу для перекрытия наземных маршрутов снабжения Ирана",
          "en": "US launches task force to disrupt Iran's land-based supply routes"
        },
        "domain": "aljazeera.com",
        "url": "https://www.aljazeera.com/news/2026/11/8/us-launches-task-force-to-disrupt-irans-land-based-supply-routes",
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
    "label": {
      "ru": "Украина: удары по энергосистеме, завершённая миссия в Алёшках и переговоры в Абу-Даби",
      "en": "Ukraine: strikes on the power grid, the finished Oleshky mission and talks in Abu Dhabi"
    },
    "observation": {
      "ru": "Удары по энергосистеме Украины оставили Киев без света и с дефицитом воды, поражена подстанция в Житомирской области. Одновременно гуманитарная миссия в Алёшках официально завершилась, омбудсмены России и Украины договорились о ежемесячных миссиях. Переговоры России, США и Украины назначены в Абу-Даби на 10–11 ноября, делегацию Киева возглавит глава офиса Зеленского.",
      "en": "Strikes on Ukraine's power grid left Kyiv without electricity and short of water, and a substation in the Zhitomir region was hit. At the same time the humanitarian mission in Oleshky officially ended, with Russian and Ukrainian rights chiefs agreeing on monthly missions. Russia-US-Ukraine talks are set for Abu Dhabi on 10–11 November, with Zelensky's office head leading Kyiv's delegation."
    },
    "why": {
      "ru": "Удары по энергетике (Д1.4) держат интенсивность, но гуманитарная договорённость и переговорный трек (Д3.5, Д8.2, Д3.4) дали деэскалационную составляющую — вклад смешанный.",
      "en": "Strikes on energy infrastructure (D1.4) keep intensity, while the humanitarian agreement and the negotiating track (D3.5, D8.2, D3.4) added a de-escalatory component — a mixed contribution."
    },
    "contribution": "medium",
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
];
})();
