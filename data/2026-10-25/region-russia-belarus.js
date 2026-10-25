window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
  s.regions["russia-belarus"] = {
  "index": 70,
  "delta": 2,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Украинские дроны бьют вглубь России: массированный удар по Белгороду, попадания в Орле и атака на логистический центр Ozon в Омске; ПВО отчиталась о 1 297 сбитых дронах за сутки.",
        "en": "Ukrainian drones strike deep into Russia: a massive attack on Belgorod, hits in Oryol and an attack on the Ozon logistics centre in Omsk; air defences reported 1,297 drones downed in 24 hours."
      },
      "why": {
        "ru": "Дальность и массовость ударов означают, что война не локализована у границы и экономические объекты в тылу остаются целями.",
        "en": "The range and mass of the strikes mean the war is not confined to the border and rear economic assets remain targets."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "tass-belgorod-1024",
          "title": {
            "ru": "Белгород понёс значительный ущерб и потери после массированного удара ВСУ",
            "en": "Belgorod faces significant damage, casualties following massive Ukrainian strike"
          },
          "domain": "tass.com",
          "url": "https://tass.com/politics/2207373",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "tass-airdef-1297-1024",
          "title": {
            "ru": "ПВО России сбила 1 297 дронов за сутки",
            "en": "Russian air defenses down 1,297 drones over past 24 hours"
          },
          "domain": "tass.com",
          "url": "https://tass.com/defense/2207273",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "tass-omsk-drone-1024",
          "title": {
            "ru": "Логистический центр Ozon в Омске под атакой дронов",
            "en": "Ozon logistics center in Siberia’s Omsk comes under enemy attack"
          },
          "domain": "tass.com",
          "url": "https://tass.com/emergencies/2207313",
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
        "ru": "Дипломатическое давление на Россию нарастает: Австрия выслала четырёх российских дипломатов «по соображениям безопасности», Молдова объявила персоной нон грата сотрудника посольства, канцлер ФРГ Мерц обвинил Москву в ежедневной дестабилизации Германии кибератаками и саботажем.",
        "en": "Diplomatic pressure on Russia grows: Austria expelled four Russian diplomats on security grounds, Moldova declared an embassy staffer persona non grata, and German Chancellor Merz accused Moscow of destabilising Germany daily through cyberattacks and sabotage."
      },
      "why": {
        "ru": "Высылки и обвинения в саботаже расширяют конфликт с военного на политический и инфраструктурный уровень.",
        "en": "Expulsions and sabotage allegations widen the conflict from the military to the political and infrastructure level."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "aa-austria-expels-1023",
          "title": {
            "ru": "Австрия высылает четырёх российских дипломатов по соображениям безопасности",
            "en": "Austria expels 4 Russian diplomats on security grounds"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/politics/austria-expels-4-russian-diplomats-on-security-grounds-/4098352",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aa-moldova-expel-1024",
          "title": {
            "ru": "Россия обещает «жёсткий ответ» на высылку дипломата из Молдовы",
            "en": "Russia warns of 'firm response' after Moldova expels diplomat"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/russia-warns-of-firm-response-after-moldova-expels-diplomat/4099661",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aa-merz-russia-1024",
          "title": {
            "ru": "Мерц обвинил Россию в стремлении дестабилизировать Германию кибератаками и саботажем",
            "en": "Merz accuses Russia of seeking to 'destabilize' Germany"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/europe/merz-accuses-russia-of-seeking-to-destabilize-germany/4099528",
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
