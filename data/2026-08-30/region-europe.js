window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  // Редакционный сид региона europe (неделя 2026-08-30, R55): два драйвера региона.
  // Источники — verbatim-записи из calc/input/2026-08-30.json. index/delta/status
  // пересчитываются пайплайном; confidence — редакционная.
  s.regions["europe"] = {
  "index": 60,
  "delta": -8,
  "status": "danger",
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Удар по складу в Миле под Киевом унёс жизни не менее 37 человек, в Киеве зафиксирован рекордный день — 13 воздушных тревог, ракетный удар по Белгороду повредил склад маркетплейса и теплоэлектроцентраль.",
        "en": "The strike on the Myla depot near Kyiv killed at least 37 people, Kyiv recorded a record day of 13 air raid alerts, and a missile strike on Belgorod damaged a marketplace warehouse and a cogeneration plant."
      },
      "why": {
        "ru": "Интенсивность обмена ударами напрямую влияет на риск случайного столкновения в воздушном пространстве союзников и на их границах.",
        "en": "The intensity of reciprocal strikes directly affects the risk of unintended encounters in allied airspace and at their borders."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "bbc-myla-depot-strike-2026-08-29",
          "title": {
            "ru": "Не менее 37 погибших и сотни эвакуированных после удара по складу оружия под Киевом",
            "en": "At least 37 dead and hundreds evacuated after strike on Kyiv weapons depot"
          },
          "domain": "bbc.com",
          "url": "https://www.bbc.com/news/articles/c86xwqez4npo",
          "publication_date": "2026-08-29",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "kyivindependent-13-air-raid-alerts-2026-08-28",
          "title": {
            "ru": "Киев зафиксировал 13 воздушных тревог за день — рекорд с начала полномасштабного вторжения",
            "en": "Kyiv records 13 air raid alerts in a single day, most since full-scale invasion began"
          },
          "domain": "kyivindependent.com",
          "url": "https://kyivindependent.com/kyiv-records-13-air-raid-alerts-in-single-day-most-since-full-scale-invasion-as-explosions-continue-overnight/",
          "publication_date": "2026-08-28",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "kyivindependent-belgorod-strike-2026-08-30",
          "title": {
            "ru": "Ракетный удар по Белгороду: повреждены склад Ozon и тепловая электростанция",
            "en": "Missile strike hits Belgorod, reportedly damaging Ozon facility and power plant"
          },
          "domain": "kyivindependent.com",
          "url": "https://kyivindependent.com/missile-strike-reportedly-hits-belgorod-damaging-ozon-facility-and-power-plant/",
          "publication_date": "2026-08-30",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Советник Зеленского допустил возможность переговоров Украины и России в сентябре; Москва предупредила Великобританию о последствиях поставок оружия; Лондон подтвердил поддержку Киева.",
        "en": "A Zelensky adviser said Ukraine-Russia talks could take place in September; Moscow warned the United Kingdom over arms supplies; London confirmed its support for Kyiv."
      },
      "why": {
        "ru": "Сохраняющийся переговорный трек при жёсткой риторике удерживает конфликт в непредсказуемом состоянии.",
        "en": "A persisting negotiation track amid harsh rhetoric keeps the conflict in an unpredictable state."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "reuters-talks-possible-september-2026-08-27",
          "title": {
            "ru": "Советник Зеленского: переговоры Украина–Россия возможны в сентябре",
            "en": "Zelenskiy's top aide says Ukraine-Russia talks may be possible in September"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/europe/zelenskiys-top-aide-says-ukraine-russia-talks-may-be-possible-september-2026-08-27/",
          "publication_date": "2026-08-27",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "democracynow-headlines-2026-08-27",
          "title": {
            "ru": "Заголовки 27 августа 2026: Украина и Россия обмениваются ударами, Москва предупреждает Великобританию",
            "en": "Headlines August 27, 2026: Ukraine and Russia trade attacks as Moscow warns the UK"
          },
          "domain": "democracynow.org",
          "url": "https://www.democracynow.org/2026/8/27/headlines",
          "publication_date": "2026-08-27",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "guardian-europe-live-2026-08-24",
          "title": {
            "ru": "Бёрнем: Великобритания с Украиной «до конца» несмотря на «возмутительные угрозы» России — онлайн",
            "en": "Burnham says UK with Ukraine 'all the way' despite 'outrageous threats' from Russia – Europe live"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/live/2026/aug/24/europe-ukraine-russia-war-kyiv-andy-burnham-volodymyr-zelenskyy-latest-news-updates",
          "publication_date": "2026-08-24",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
