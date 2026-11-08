window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.regions["middle-east"] = {
  "index": 0,
  "delta": 0,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Ормуз: два танкера подорвались на минах, новая волна атак задела танкеры и газовоз в проливе и Персидском заливе, ОАЭ спасли 22 моряка; Иран сообщает о поражённых танкерах на фоне опасений новой атаки США.",
        "en": "Hormuz: two tankers hit mines, a fresh wave of attacks hit tankers and an LNG carrier in the strait and the Persian Gulf, the UAE rescued 22 sailors, and Iran reports tankers struck amid fears of a new US attack."
      },
      "why": {
        "ru": "Боевые действия на собственных морских путях — Д1.4, Д4.4 и Д7.2.",
        "en": "Fighting on its own sea lanes is D1.4, D4.4 and D7.2."
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
          "id": "aljazeera-hormuz-tankers-struck",
          "title": {
            "ru": "Иран сообщает о поражённых танкерах в Ормузском проливе на фоне опасений новой атаки США",
            "en": "Iran says tankers struck in Hormuz amid fears of new US attack"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/11/5/iran-says-tankers-struck-in-hormuz-amid-fears-of-new-us-attack",
          "publication_date": "2026-11-05",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Верховный лидер Ирана предупредил о расширении войны в случае новых ударов США; иранский депутат пригрозил нефтяным объектам Саудовской Аравии и заявил, что Британия может оказаться в зоне досягаемости ракет. США начали воздушную переброску в Израиль в преддверии возможной операции против Ирана.",
        "en": "Iran's supreme leader warned of a wider war if the US strikes again; an Iranian MP threatened Saudi oil facilities and said Britain could be within missile range. The US began an airlift to Israel ahead of a possible operation against Iran."
      },
      "why": {
        "ru": "Риторика (Д5.1 = 1) и подготовка удара (Д1.5) держат эскалационный фон региона.",
        "en": "Rhetoric (D5.1 = 1) and strike preparation (D1.5) keep the region's escalation backdrop elevated."
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
        }
      ]
    }
  ]
};
})();
