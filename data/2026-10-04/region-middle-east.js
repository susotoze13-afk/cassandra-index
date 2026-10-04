window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-04"] = window.CI_DATA.snapshots["2026-10-04"] || {};
  s.regions["middle-east"] = {
  "index": 64,
  "delta": -2,
  "status": "very",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Вокруг Ирана и Ормузского пролива неделя прошла под санкционным и военным давлением: 29.09 новые санкции США за закупки оружия для Ирана, 01–03.10 удары по танкерам в проливе, при этом посредничество Катара продолжается.",
        "en": "The week around Iran and the Strait of Hormuz ran under sanctions and military pressure: new US sanctions over Iranian weapons procurement on 29.09, tanker attacks in the strait on 01–03.10, with Qatari mediation still ongoing."
      },
      "why": {
        "ru": "Пролив остаётся узким местом мировой энергетики, поэтому удары по танкерам и ограничения движения дают и военный, и экономический вклад в индекс.",
        "en": "The strait remains the world's energy chokepoint, so tanker attacks and shipping restrictions feed both the military and the economic side of the index."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "state-us-cuts-off-hamas-financing",
          "title": {
            "ru": "США перекрыли сеть финансирования ХАМАС",
            "en": "United States Cuts Off Hamas Financing Network"
          },
          "domain": "state.gov",
          "url": "https://www.state.gov/releases/office-of-the-spokesperson/2026/10/united-states-cuts-off-hamas-financing-network/",
          "publication_date": "2026-10-02",
          "accessed_date": "2026-10-04",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": true
        },
        {
          "id": "gulfnews-oil-tankers-attacked-hormuz",
          "title": {
            "ru": "Танкеры атакованы в Ормузском проливе — британская морская служба",
            "en": "Oil tankers attacked in Hormuz strait: UK maritime agency"
          },
          "domain": "gulfnews.com",
          "url": "https://gulfnews.com/world/mena/oil-tankers-attacked-in-hormuz-strait-uk-maritime-agency-1.500696517",
          "publication_date": "2026-10-03",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Перемирие в Газе нарушено внутри окна: удары Израиля по жилым домам 02.10 и 03.10, погибли как минимум девять человек.",
        "en": "The Gaza ceasefire was violated inside the window: Israeli strikes on residential buildings on 02.10 and 03.10 killed at least nine people."
      },
      "why": {
        "ru": "Нарушение действующего режима — прямое опровержение деэскалационного критерия D8.1 и сигнал о хрупкости перемирия.",
        "en": "Violations of the standing regime directly refute the de-escalation criterion D8.1 and signal the ceasefire's fragility."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "aljazeera-com-gaza-city-apartment-strike",
          "title": {
            "ru": "Воздушная атака Израиля на жилой дом в Газе убила не менее пяти человек",
            "en": "Israeli air attack on Gaza City apartment kills at least five"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/10/3/israeli-air-attack-on-gaza-city-apartment-kills-at-least-five",
          "publication_date": "2026-10-03",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "reuters-com-israeli-strike-gaza-2026-10-02",
          "title": {
            "ru": "Удар Израиля по Газе убил четырёх человек, сообщают медики",
            "en": "Israeli strike kills four people in Gaza, medics say"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/middle-east/israeli-strike-kills-four-people-gaza-medics-say-2026-10-02/",
          "publication_date": "2026-10-02",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
