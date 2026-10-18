window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.regions["middle-east"] = {
  "index": 72,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Два супертанкера подорвались на минах в Ормузском проливе, у берегов Йемена обстрелян СПГ-танкер, у ОАЭ снаряды попали в буксир; Саудовская коалиция перехватывала дроны над Эр-Риядом на фоне трудностей с поставками дополнительных систем ПВО.",
        "en": "Two supertankers hit mines in the Strait of Hormuz, an LNG tanker was fired upon off Yemen and projectiles hit a tugboat off the UAE, while the Saudi-led coalition intercepted drones over Riyadh amid difficulties supplying more air-defence systems."
      },
      "why": {
        "ru": "Перекрытие Ормуза и удары по энергетической инфраструктуре Залива резко повышают региональный сигнал эскалации.",
        "en": "Hormuz disruption and strikes on Gulf energy infrastructure sharply raise the regional escalation signal."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "aljazeera-hormuz-tankers-mines",
          "title": {
            "ru": "Иран сообщает: два танкера загорелись после подрыва на минах в Ормузском проливе",
            "en": "Iran says two tankers catch fire after hitting mines in Strait of Hormuz"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/10/18/iran-says-two-tankers-catch-fire-after-hitting-mines-in-strait-of-hormuz",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "qatar-tribune-hormuz-tanker-mine-2026-10-17",
          "title": {
            "ru": "Второй нефтяной танкер горит в Ормузском проливе после подрыва на морской мине",
            "en": "Second oil tanker burns in Strait of Hormuz after hitting naval mine"
          },
          "domain": "qatar-tribune.com",
          "url": "https://www.qatar-tribune.com/article/259630/front/second-oil-tanker-burns-in-strait-of-hormuz-after-hitting-naval-mine",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "tass-air-defense-riyadh",
          "title": {
            "ru": "Европе сложно поставлять больше систем ПВО в Эр-Рияд — газета",
            "en": "Europe has difficulties with supplying more air defense systems to Riyadh — newspaper"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2203601",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Фронт в Йемене расширяется: ОАЭ согласовали возвращение в конфликт, Египет рассматривает военную помощь Саудовской Аравии, силы коалиции авиаударами пытаются снять осаду Таиза; хуситы освободили 159 задержанных под наблюдением МККК.",
        "en": "The Yemen front is widening: the UAE agreed to re-enter the conflict, Egypt is weighing military help for Saudi Arabia and coalition forces are trying to break the siege of Taiz with airstrikes, while the Houthis released 159 detainees under ICRC watch."
      },
      "why": {
        "ru": "Прямое вовлечение новых государств делает региональный конфликт более многослойным и труднее управляемым.",
        "en": "Direct involvement of additional states makes the regional conflict more layered and harder to manage."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "guardian-uae-yemen-reentry",
          "title": {
            "ru": "ОАЭ договорились с Саудовской Аравией о возвращении в конфликт в Йемене",
            "en": "UAE agrees with Saudi Arabia to re-enter Yemen conflict amid Houthi gains"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/oct/17/uae-yemen-conflict-agreement-saudi-arabia-houthi-gains",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "almonitor-egypt-sisi-saudi-defence",
          "title": {
            "ru": "Сиси просит парламент одобрить помощь в защите Саудовской Аравии по запросу",
            "en": "Egypt's Sisi seeks parliament's backing to help defend Saudi Arabia if asked"
          },
          "domain": "al-monitor.com",
          "url": "https://www.al-monitor.com/originals/2026/10/egypts-sisi-seeks-parliaments-backing-help-defend-saudi-arabia-if-asked",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aljazeera-taiz-siege-airstrikes",
          "title": {
            "ru": "Силы во главе с Саудовской Аравией авиаударами пытаются снять осаду Таиза хуситами",
            "en": "Saudi-led forces try to break Houthi siege of Taiz with airstrikes"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/saudi-led-forces-try-to-break-houthi-siege-of-taiz-with-airstrikes",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aa-houthis-release-159-2026-10-17",
          "title": {
            "ru": "Хуситы Йемена освободили 159 задержанных в Сане — МККК",
            "en": "Yemen's Houthis release 159 detainees in Sanaa: ICRC"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/yemen-s-houthis-release-159-detainees-in-sanaa-icrc/4092084",
          "publication_date": "2026-10-17",
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
