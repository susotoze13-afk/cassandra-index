window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-11"] = window.CI_DATA.snapshots["2026-10-11"] || {};
  s.regions["middle-east"] = {
  "index": 67,
  "delta": 28,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Хуситы нанесли серию ударов по аэропорту Эр-Рияда (12 погибших, более 300 раненых) и Дамаму; саудовская коалиция заявила об уничтожении 136 целей в Йемене, а силы правительства Йемена отбили Баб-эль-Мандебский пролив.",
        "en": "Houthis struck Riyadh airport (12 killed, more than 300 injured) and Dammam; the Saudi-led coalition said it destroyed 136 targets in Yemen, and Yemeni government forces recaptured the Bab al-Mandab strait."
      },
      "why": {
        "ru": "Впервые удар достиг столичного аэропорта Саудовской Аравии, а боевые действия идут у стратегического пролива — региональная интенсивность резко выросла.",
        "en": "For the first time the strike reached Saudi Arabia's capital airport, and fighting is at a strategic strait — regional intensity has risen sharply."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "mee-riyadh-airport-12-dead",
          "title": {
            "ru": "Атака на аэропорт Эр-Рияда: 12 погибших, более 300 раненых",
            "en": "Attack on Riyadh airport leaves 12 dead, more than 300 injured"
          },
          "domain": "middleeasteye.net",
          "url": "https://www.middleeasteye.net/news/attack-riyadh-airport-leaves-12-dead-more-300-injured",
          "publication_date": "2026-10-11",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "jpost-houthi-riyadh-airport-attack",
          "title": {
            "ru": "Атака хуситов на аэропорт Саудовской Аравии: 12 погибших, сотни раненых",
            "en": "Houthi attack on Saudi airport leaves 12 dead, hundreds wounded"
          },
          "domain": "jpost.com",
          "url": "https://www.jpost.com/middle-east/article-911232",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-saudi-coalition-136-targets",
          "title": {
            "ru": "Саудовская коалиция объявила о масштабной операции против хуситов и уничтожении 136 целей",
            "en": "Saudi-led coalition announces large-scale operation against Houthis in Yemen, says 136 military targets destroyed"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/saudi-led-coalition-announces-large-scale-operation-against-houthis-in-yemen-says-136-military-targets-destroyed/4084119",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aljazeera-world-condemns-riyadh",
          "title": {
            "ru": "Мир осуждает смертоносную атаку хуситов на аэропорт Эр-Рияда",
            "en": "World condemns deadly Houthi attack on Saudi Arabia's Riyadh airport"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/10/11/world-condemns-deadly-houthi-attack-on-saudi-arabias-riyadh-airport",
          "publication_date": "2026-10-11",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Морская конфронтация вокруг Ирана: США обездвижили коммерческое судно, пытавшееся прорвать блокаду в Оманском заливе, в Ормузском проливе на мине подорвался супертанкер, а EASA расширила предупреждение по воздушному пространству Саудовской Аравии.",
        "en": "Maritime confrontation around Iran: US forces disabled a commercial vessel trying to run the blockade in the Gulf of Oman, a supertanker hit a mine in the Strait of Hormuz, and EASA expanded its warning for Saudi airspace."
      },
      "why": {
        "ru": "Прямая угроза ключевому энергомаршруту мира связывает военную и экономическую эскалацию в один узел.",
        "en": "A direct threat to the world's key energy route links military and economic escalation into a single knot."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "aljazeera-us-disable-ship-gulf-oman",
          "title": {
            "ru": "США обездвижили судно, «пытавшееся прорвать» блокаду Ирана в Оманском заливе",
            "en": "US forces disable ship 'attempting to run' Iran blockade in Gulf of Oman"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/10/11/us-forces-disable-ship-attempting-to-run-iran-blockade-in-gulf-of-oman",
          "publication_date": "2026-10-11",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "tass-hormuz-supertanker-mine",
          "title": {
            "ru": "Нефтяной супертанкер подорвался на мине в Ормузском проливе — КСИР",
            "en": "Oil supertanker hits mine in Strait of Hormuz — IRGC"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2200371",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "jpost-centcom-vessel-strike",
          "title": {
            "ru": "CENTCOM ударил по коммерческому судну, пытавшемуся обойти блокаду Ирана",
            "en": "CENTCOM strikes commercial vessel after ship attempts to bypass Iran blockade"
          },
          "domain": "jpost.com",
          "url": "https://www.jpost.com/middle-east/iran-news/article-911241",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-easa-saudi-airspace-warning",
          "title": {
            "ru": "После атак хуситов авиационное агентство Европы расширяет предупреждение по воздушному пространству Саудовской Аравии",
            "en": "Following Houthi attacks, Europe's aviation safety body expands Saudi airspace warning"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/europe/following-houthi-attacks-europes-aviation-safety-body-expands-saudi-airspace-warning/4084161",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
})();
