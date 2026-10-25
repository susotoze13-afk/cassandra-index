window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
  s.regions["south-caucasus"] = {
  "index": 66,
  "delta": 5,
  "status": "very",
  "background": true,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Война у южных границ региона: КСИР наносит удары по базе «Комала» в иракском Балисане, Ормуз остаётся перекрытым, а Иран предлагает открыть его в обмен на снятие морской блокады США.",
        "en": "War on the region's southern borders: the IRGC strikes a Komala base in Iraq's Balisan, Hormuz remains blocked, and Iran offers to reopen it in exchange for lifting the US naval blockade."
      },
      "why": {
        "ru": "Перекрытый Ормуз и удары по Курдистану меняют маршруты и повышают цену транзита для всего кавказского коридора.",
        "en": "A blocked Hormuz and strikes in Kurdistan change routes and raise transit costs for the entire Caucasus corridor."
      },
      "contribution": "medium",
      "confidence": "low",
      "sources": [
        {
          "id": "mehr-irgc-komala-1025",
          "title": {
            "ru": "КСИР ударил по базе «Комала» в иракском Балисане",
            "en": "IRGC strikes Komala base in Iraq's Balisan"
          },
          "domain": "en.mehrnews.com",
          "url": "https://en.mehrnews.com/news/248878/IRGC-strikes-Komala-base-in-Iraq-s-Balisan",
          "publication_date": "2026-10-25",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "tass-hormuz-proposal-1024",
          "title": {
            "ru": "Иран предлагает открыть Ормузский пролив в обмен на снятие морской блокады США",
            "en": "Iran proposes reopening Hormuz in exchange for US lifting its blockade"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2207343",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Регион перестраивает внешние связи: Турция и Канада подписали соглашения по оборонной промышленности, Пакистан ратифицировал Мекканский пакт с Турцией и Саудовской Аравией, Индия ищет альтернативные маршруты для помощи Ирану.",
        "en": "The region is reshaping external ties: Türkiye and Canada signed defence-industry agreements, Pakistan ratified the Mecca pact with Türkiye and Saudi Arabia, and India seeks alternative routes for aid to Iran."
      },
      "why": {
        "ru": "Новые оборонные и логистические договорённости меняют баланс сил вдоль южного периметра.",
        "en": "New defence and logistics arrangements shift the balance of power along the southern perimeter."
      },
      "contribution": "medium",
      "confidence": "low",
      "sources": [
        {
          "id": "aa-turkiye-canada-defense-1022",
          "title": {
            "ru": "Турция и Канада подписали три соглашения по оборонной промышленности, авиаперевозкам и энергетике",
            "en": "Türkiye, Canada sign 3 agreements on defense industry, air transport, energy"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/turkiye/turkiye-canada-sign-3-agreements-on-defense-industry-air-transport-energy/4097621",
          "publication_date": "2026-10-22",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aa-mecca-pact-1023",
          "title": {
            "ru": "Пакистан объявил о ратификации Мекканского пакта с Турцией и Саудовской Аравией",
            "en": "Pakistan announces ratification of Mecca pact signed with Türkiye, Saudi Arabia"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/pakistan-announces-ratification-of-mecca-pact-signed-with-turkiye-saudi-arabia/4099147",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "hindu-iran-india-air-1024",
          "title": {
            "ru": "Спикер парламента Ирана пропустит встречу БРИКС; Тегеран просит авиамаршрут для гуманитарной помощи из Индии",
            "en": "Iran Speaker to skip BRICS meet, as Iran seeks bilateral air route for humanitarian aid from India"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/national/irans-ghalibaf-will-not-attend-brics-parliamentary-forum-in-delhi-embassy/article71619999.ece",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
