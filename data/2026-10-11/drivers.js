window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-11"] = window.CI_DATA.snapshots["2026-10-11"] || {};
  // Редакционный сид недели 2026-10-11: три главных драйвера недели.
  // Источники — verbatim-записи из calc/input/2026-10-11.json (R55).
s.drivers = [
  {
    "label": {
      "ru": "Хуситы расширили войну до Эр-Рияда, США блокируют Ормуз",
      "en": "Houthis widened the war to Riyadh as the US blockades Hormuz"
    },
    "observation": {
      "ru": "Хуситы нанесли серию ракетно-дроновых ударов по аэропорту Эр-Рияда (12 погибших, более 300 раненых) и Дамаму; саудовская коалиция заявила об уничтожении 136 целей в Йемене, а силы правительства Йемена отбили Баб-эль-Мандебский пролив. США обездвижили коммерческое судно, пытавшееся прорвать блокаду Ирана в Оманском заливе, а в Ормузском проливе на мине подорвался супертанкер.",
      "en": "Houthis carried out a series of missile and drone strikes on Riyadh airport (12 killed, more than 300 injured) and Dammam; the Saudi-led coalition said it destroyed 136 targets in Yemen, and Yemeni government forces recaptured the Bab al-Mandab strait. US forces disabled a commercial vessel trying to run the Iran blockade in the Gulf of Oman, while a supertanker hit a mine in the Strait of Hormuz."
    },
    "why": {
      "ru": "Боевые действия вплотную подошли к ключевому энергетическому узлу мира и впервые ударили по столичному аэропорту Саудовской Аравии — это поднимает и военную интенсивность, и географию вовлечения одновременно.",
      "en": "Fighting moved right up to the world's key energy chokepoint and struck Saudi Arabia's capital airport for the first time — raising both combat intensity and the geography of involvement at once."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "mee-riyadh-airport-12-dead",
        "title": { "ru": "Атака на аэропорт Эр-Рияда: 12 погибших, более 300 раненых", "en": "Attack on Riyadh airport leaves 12 dead, more than 300 injured" },
        "domain": "middleeasteye.net",
        "url": "https://www.middleeasteye.net/news/attack-riyadh-airport-leaves-12-dead-more-300-injured",
        "publication_date": "2026-10-11",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "aljazeera-us-disable-ship-gulf-oman",
        "title": { "ru": "США обездвижили судно, «пытавшееся прорвать» блокаду Ирана в Оманском заливе", "en": "US forces disable ship 'attempting to run' Iran blockade in Gulf of Oman" },
        "domain": "aljazeera.com",
        "url": "https://www.aljazeera.com/news/2026/10/11/us-forces-disable-ship-attempting-to-run-iran-blockade-in-gulf-of-oman",
        "publication_date": "2026-10-11",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "jpost-centcom-vessel-strike",
        "title": { "ru": "CENTCOM ударил по коммерческому судну, пытавшемуся обойти блокаду Ирана", "en": "CENTCOM strikes commercial vessel after ship attempts to bypass Iran blockade" },
        "domain": "jpost.com",
        "url": "https://www.jpost.com/middle-east/iran-news/article-911241",
        "publication_date": "2026-10-10",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "tass-hormuz-supertanker-mine",
        "title": { "ru": "Нефтяной супертанкер подорвался на мине в Ормузском проливе — КСИР", "en": "Oil supertanker hits mine in Strait of Hormuz — IRGC" },
        "domain": "tass.com",
        "url": "https://tass.com/world/2200371",
        "publication_date": "2026-10-10",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      }
    ]
  },
  {
    "label": {
      "ru": "Ядерная сигнальная активность: пуск M51.3 и учения НАТО",
      "en": "Nuclear signalling: M51.3 test and NATO drills"
    },
    "observation": {
      "ru": "Франция 06.10 провела приёмочный пуск баллистической ракеты M51.3 с ПЛАРБ Le Vigilant в присутствии президента. НАТО анонсировала учения ядерного сдерживания Steadfast Noon 13–23.10 (17 стран), Финляндия направит штабных офицеров. На этом фоне Путин вновь повторил ядерную угрозу в адрес НАТО.",
      "en": "On 06.10 France carried out an acceptance test of an M51.3 ballistic missile from the SSBN Le Vigilant in the president's presence. NATO announced its Steadfast Noon nuclear deterrence exercise for 13–23.10 (17 nations), with Finland sending staff officers. Against this backdrop Putin again repeated a nuclear threat against NATO."
    },
    "why": {
      "ru": "Плановые, но публично подчёркнутые технические ядерные сигналы на обеих сторонах в сочетании с ядерной риторикой высшего уровня поддерживают повышенный фон неверного прочтения намерений.",
      "en": "Routine yet publicly emphasised technical nuclear signals on both sides, combined with top-level nuclear rhetoric, sustain a heightened risk of misreading intentions."
    },
    "contribution": "medium",
    "confidence": "medium",
    "sources": [
      {
        "id": "defensegouv-m513-acceptance-test",
        "title": { "ru": "Ракета M51.3: успешный приёмочный пуск с ПЛАРБ Le Vigilant", "en": "M51.3 missile: successful acceptance test from SSBN Le Vigilant" },
        "domain": "defense.gouv.fr",
        "url": "https://www.defense.gouv.fr/actualites/missile-m513-tir-dacceptation-reussi-snle-vigilant",
        "publication_date": "2026-10-06",
        "accessed_date": "2026-10-11",
        "source_type": "primary",
        "cluster_id": "C-registries",
        "state_affiliated": true
      },
      {
        "id": "rt-nato-nuclear-drills",
        "title": { "ru": "НАТО просит Россию «не волноваться» из-за ядерных учений", "en": "NATO asks Russia 'not to worry' about nuclear drills" },
        "domain": "rt.com",
        "url": "https://www.rt.com/news/646984-nato-nuclear-exercise-polyansky/",
        "publication_date": "2026-10-09",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "aca-putin-nuclear-threat-voa",
        "title": { "ru": "Путин вновь повторяет ядерную угрозу в адрес НАТО", "en": "Russia's Putin reiterates nuclear threat against NATO" },
        "domain": "armscontrol.org",
        "url": "https://www.armscontrol.org/media-citations/voice-america/2026-10-07",
        "publication_date": "2026-10-07",
        "accessed_date": "2026-10-11",
        "source_type": "OSINT",
        "cluster_id": "C-registries",
        "state_affiliated": false
      },
      {
        "id": "sputnik-finland-steadfast-noon",
        "title": { "ru": "Финляндия примет участие в ядерных учениях НАТО в октябре — Минобороны", "en": "Finland to take part in NATO's nuclear deterrence exercise in October — Defense Ministry" },
        "domain": "sputnikglobe.com",
        "url": "https://sputnikglobe.com/20261009/finland-to-take-part-in-natos-nuclear-deterrence-exercise-in-october---defense-ministry-1124855777.html",
        "publication_date": "2026-10-09",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      }
    ]
  },
  {
    "label": {
      "ru": "Дизельная сделка США–РФ расколола Украину и Европу",
      "en": "The US–Russia diesel deal split Ukraine and Europe"
    },
    "observation": {
      "ru": "Трамп объявил о сделке по закупке российского дизеля и приостановке санкций на топливо, заявив при этом, что Украине нужен «новый лидер». Зеленский публично возмутился, а Германия и ЕС подтвердили, что санкции против России сохраняются. США одновременно ввели санкции против Международного уголовного суда.",
      "en": "Trump announced a deal to buy Russian diesel and a suspension of fuel sanctions, while saying Ukraine needs a 'new leader'. Zelenskyy reacted furiously, and Germany and the EU reaffirmed that sanctions on Russia remain. At the same time the US imposed sanctions on the International Criminal Court."
    },
    "why": {
      "ru": "Энергетическая сделка с Москвой и раскол внутри западной коалиции ослабляют единство санкционного фронта и меняют расстановку сил вокруг войны в Украине.",
      "en": "The energy deal with Moscow and the split within the Western coalition weaken the unity of the sanctions front and reshape the balance of forces around the war in Ukraine."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "guardian-trump-putin-russian-diesel",
        "title": { "ru": "Зеленский в ярости: Трамп объявил о сделке по закупке российского дизеля", "en": "Zelenskyy furious as Trump announces deal to buy Russian diesel" },
        "domain": "theguardian.com",
        "url": "https://www.theguardian.com/us-news/2026/oct/09/trump-putin-russian-diesel-ukraine",
        "publication_date": "2026-10-09",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "guardian-trump-diesel-new-leader",
        "title": { "ru": "Трамп заявил, что Украине нужен новый лидер после дизельной сделки с Россией", "en": "Trump says Ukraine needs a new leader after diesel deal with Russia" },
        "domain": "theguardian.com",
        "url": "https://www.theguardian.com/world/2026/oct/10/ukraine-russia-strikes-war-trump-diesel-deal-zelenskyy",
        "publication_date": "2026-10-10",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "state-icc-sanctions",
        "title": { "ru": "О введении санкций против Международного уголовного суда", "en": "Imposing Sanctions on the International Criminal Court" },
        "domain": "state.gov",
        "url": "https://www.state.gov/releases/office-of-the-spokesman/2026/10/imposing-sanctions-on-the-international-criminal-court/",
        "publication_date": "2026-10-09",
        "accessed_date": "2026-10-11",
        "source_type": "primary",
        "cluster_id": "C-registries",
        "state_affiliated": true
      },
      {
        "id": "nyt-europe-shadow-war",
        "title": { "ru": "Пока Путин ведёт теневую войну, Европа ищет способ дать сдачи", "en": "As Putin wages shadow war, Europe looks for a way to hit back" },
        "domain": "nytimes.com",
        "url": "https://www.nytimes.com/2026/10/09/world/europe/putin-russia-ukraine-war-europe-nato.html",
        "publication_date": "2026-10-09",
        "accessed_date": "2026-10-11",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  }
];
})();
