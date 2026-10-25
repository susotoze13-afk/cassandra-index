window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
  s.regions["south-asia"] = {
  "index": 69,
  "delta": 3,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Пакистан закрепляет военно-политические обязательства: ратифицирован Мекканский пакт с Турцией и Саудовской Аравией, армия отчиталась об уничтожении 10 боевиков в Гвадаре, Исламабад отверг претензии Кабула.",
        "en": "Pakistan locks in military-political commitments: the Mecca pact with Türkiye and Saudi Arabia is ratified, the army reports 10 militants killed in Gwadar, and Islamabad rejects Kabul’s claims."
      },
      "why": {
        "ru": "Новые союзные обязательства и внутренняя контртеррористическая кампания повышают вовлечённость Пакистана в региональную конфронтацию.",
        "en": "New alliance commitments and a domestic counter-terrorism campaign increase Pakistan’s involvement in regional confrontation."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
          "id": "aa-pakistan-gwadar-1023",
          "title": {
            "ru": "Армия Пакистана: 10 боевиков убиты в Гвадаре",
            "en": "10 terrorists, including woman, killed in Gwadar: Pakistan army"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/asia-pacific/10-terrorists-including-woman-killed-in-gwadar-pakistan-army/4098663",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "dawn-islamabad-kabul-1024",
          "title": {
            "ru": "Исламабад отверг заявления Кабула о неспособности влиять на безопасность в Пакистане",
            "en": "Islamabad rebuts Kabul's stance on 'lacking capacity' to fuel insecurity in Pakistan"
          },
          "domain": "dawn.com",
          "url": "https://www.dawn.com/news/2039485/islamabad-rebuts-kabuls-stance-on-lacking-capacity-to-fuel-insecurity-in-pakistan-slams-diversionary-allegations",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Индия подстраивает логистику под перекрытый Ормуз: Тегеран просит у Дели авиамаршрут для гуманитарной помощи и пропускает парламентский форум БРИКС, тогда как морские поставки и фрахт резко подорожали.",
        "en": "India adjusts logistics to a blocked Hormuz: Tehran asks Delhi for an air route for humanitarian aid and skips the BRICS parliamentary forum, while seaborne supplies and freight costs have surged."
      },
      "why": {
        "ru": "Зависимость от морских поставок через Залив делает Южную Азию уязвимой к перекрытию Ормуза.",
        "en": "Dependence on seaborne supplies through the Gulf makes South Asia vulnerable to a Hormuz closure."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
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
        },
        {
          "id": "oilprice-tanker-rates-1024",
          "title": {
            "ru": "Рекордные ставки фрахта танкеров блокируют поставки американской нефти в Азию",
            "en": "Record Tanker Rates Cripple U.S. Crude Oil Flows to Asia"
          },
          "domain": "oilprice.com",
          "url": "https://oilprice.com/Energy/Crude-Oil/Record-Tanker-Rates-Cripple-US-Crude-Oil-Flows-to-Asia.html",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false
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
    }
  ]
};
})();
