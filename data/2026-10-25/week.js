window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
  s.global = {
  "index": 68,
  "delta": 4
};
  s.published = "2026-10-25";
  s.through = "2026-10-25";
  s.methodology = "3.0";
  s.regions_taxonomy = "2.0";
  s.dataState = "published";
  s.q = 1;
  s.nullWeight = 0;
  s.coverage = {
  "coveredDrivers": 9,
  "totalDrivers": 9
};
  s.confidence = "full";
  s.sensitivity = 1.1;
  s.precursor = {
  "value": 47,
  "signalingSubgroups": 6
};
  s.coverageCriteria = {
  "covered": 37,
  "total": 46,
  "uncovered": [
    "D1.3",
    "D1.6",
    "D2.4",
    "D4.1",
    "D5.3",
    "D5.4",
    "D6.4",
    "D9.1",
    "D9.7"
  ]
};
  s.recalc = {
  "at": "2026-10-25T12:14:54.070Z",
  "reason": "Еженедельный пересчёт",
  "previous": 68,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
  s.regions = {
  "russia-belarus": {
    "index": 70,
    "delta": 2,
    "status": "very",
    "background": false
  },
  "ukraine-moldova": {
    "index": 68,
    "delta": 5,
    "status": "very",
    "background": false
  },
  "baltic": {
    "index": 69,
    "delta": 2,
    "status": "very",
    "background": false
  },
  "balkans": {
    "index": 69,
    "delta": 2,
    "status": "very",
    "background": false
  },
  "eu-north-europe": {
    "index": 68,
    "delta": 2,
    "status": "very",
    "background": false
  },
  "south-caucasus": {
    "index": 66,
    "delta": 5,
    "status": "very",
    "background": false
  },
  "central-asia": {
    "index": 65,
    "delta": 2,
    "status": "very",
    "background": false
  },
  "east-asia": {
    "index": 64,
    "delta": -2,
    "status": "very",
    "background": false
  },
  "middle-east": {
    "index": 79,
    "delta": 10,
    "status": "very",
    "background": false
  },
  "north-america": {
    "index": 72,
    "delta": 6,
    "status": "very",
    "background": false
  },
  "south-asia": {
    "index": 68,
    "delta": 2,
    "status": "very",
    "background": false
  },
  "africa": {
    "index": 70,
    "delta": 4,
    "status": "very",
    "background": false
  }
};
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
  s.regions["ukraine-moldova"] = {
  "index": 68,
  "delta": 5,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Согласовано локальное гуманитарное перемирие в Олешках: Москва и Киев подтверждают выполнение обязательств, Зеленский рассчитывает на посредничество США, вступление в силу — 27 октября.",
        "en": "A local humanitarian ceasefire in Oleshky has been agreed: Moscow and Kyiv confirm compliance, Zelensky counts on US mediation, and it takes effect on 27 October."
      },
      "why": {
        "ru": "Даже ограниченное перемирие — первый работающий механизм деэскалации за неделю, хотя оно не покрывает фронт.",
        "en": "Even a limited ceasefire is the first working de-escalation mechanism of the week, although it does not cover the front line."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "cbs-melania-ceasefire-1023",
          "title": {
            "ru": "Мелания Трамп добилась временного перемирия в Олешках",
            "en": "Melania Trump helps secure temporary ceasefire between Russia and Ukraine in Oleshky"
          },
          "domain": "cbsnews.com",
          "url": "https://www.cbsnews.com/news/first-lady-melania-trump-temporary-ceasefire-russia-ukraine-oleshky/",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-zelensky-oleshky-1024",
          "title": {
            "ru": "Зеленский: Украина соблюдает перемирие в Олешках и рассчитывает на посредничество США",
            "en": "Zelenskyy says Ukraine will honor Oleshky ceasefire, counts on US mediation to work"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/politics/zelenskyy-says-ukraine-will-honor-oleshky-ceasefire-counts-on-us-mediation-to-work/4099683",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "tass-alyoshki-1024",
          "title": {
            "ru": "Россия и Украина выполняют обязательства по перемирию в Алёшках",
            "en": "Russia, Ukraine fulfil their commitments toward Alyoshki ceasefire"
          },
          "domain": "tass.com",
          "url": "https://tass.com/politics/2207325",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "hindu-ceasefire-oct27-1024",
          "title": {
            "ru": "Локальное гуманитарное перемирие с Россией начнётся 27 октября, заявил переговорщик",
            "en": "Local humanitarian ceasefire with Russia will start on October 27, says negotiator"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/local-humanitarian-ceasefire-with-russia-will-start-on-october-27-says-negotiator/article71618931.ece",
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
        "ru": "Военная связь Украины зависит от коммерческого решения: SpaceX ограничивала скорость Starshield из-за ударов дронами, затем восстановила её после контактов на высоком уровне; за два года страна потеряла почти 14 % локомотивов.",
        "en": "Ukraine's military communications depend on a commercial decision: SpaceX throttled Starshield speeds over drone strikes, then restored them after high-level contacts; in two years the country has lost nearly 14% of its locomotives."
      },
      "why": {
        "ru": "Ограничение спутниковой связи и износ транспорта бьют по логистике и управлению войсками.",
        "en": "Restricted satellite communications and worn-out transport hit logistics and command and control."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "cbs-musk-starlink-1024",
          "title": {
            "ru": "Маск: SpaceX ограничивала скорость Starlink для Украины из-за ударов дронами",
            "en": "Elon Musk says SpaceX throttled Ukraine Starlink speeds over drone strikes"
          },
          "domain": "cbsnews.com",
          "url": "https://www.cbsnews.com/news/ukraine-starlink-drone-spacex-musk-speed-restriction/",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-starshield-restored-1024",
          "title": {
            "ru": "Украина: ограничения скорости Starshield сняты после контактов на высоком уровне",
            "en": "Ukraine says Starshield speed restrictions lifted after high-level contacts"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/ukraine-says-starshield-speed-restrictions-lifted-after-high-level-contacts/4099455",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "tass-locomotives-1025",
          "title": {
            "ru": "Украина потеряла почти 14 % локомотивов менее чем за два года",
            "en": "Ukraine loses nearly 14% of its locomotives in less than two years"
          },
          "domain": "tass.com",
          "url": "https://tass.com/economy/2207397",
          "publication_date": "2026-10-25",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
  s.regions["baltic"] = {
  "index": 69,
  "delta": 2,
  "status": "very",
  "background": false,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Давление России на европейскую инфраструктуру остаётся в повестке: канцлер ФРГ говорит о ежедневных кибератаках и попытках саботажа, Австрия высылает четырёх дипломатов по соображениям безопасности.",
        "en": "Russian pressure on European infrastructure remains on the agenda: the German chancellor speaks of daily cyberattacks and sabotage attempts, and Austria expels four diplomats on security grounds."
      },
      "why": {
        "ru": "Для Балтии это фон, при котором любая диверсия на энергетике или связи сразу читается как часть кампании.",
        "en": "For the Baltics this is the backdrop against which any energy or communications sabotage is immediately read as part of a campaign."
      },
      "contribution": "medium",
      "confidence": "low",
      "sources": [
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
        },
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Европа ускоряет перевооружение: в Телфорде возобновлено производство танковых стволов, Leonardo и Rheinmetall получили контракты с итальянской армией на $4 млрд, Дания закупает ракеты дальнего удара.",
        "en": "Europe accelerates rearmament: tank barrel production has resumed in Telford, Leonardo and Rheinmetall won $4bn contracts with the Italian Army, and Denmark is buying long-range missiles."
      },
      "why": {
        "ru": "Военные заказы гражданским заводам и новые программы — индикатор подготовки к длительной конфронтации.",
        "en": "Military orders to civilian plants and new programmes indicate preparation for a prolonged confrontation."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "guardian-telford-1022",
          "title": {
            "ru": "Гонка перевооружения: в Телфорде возобновили производство стволов для танков",
            "en": "Race to rearm: Telford gun hall brings tank barrel production back to the UK"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/business/2026/oct/22/telford-gun-hall-tank-barrel-production-back-uk-rheinmetall",
          "publication_date": "2026-10-22",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "defnews-italy-contracts-1023",
          "title": {
            "ru": "Leonardo и Rheinmetall получили контракты с итальянской армией на $4 млрд",
            "en": "Leonardo, Rheinmetall secure $4 billion contracts with Italian Army"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/23/leonardo-rheinmetall-secure-4-billion-contracts-with-italian-army-report-says/",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "defnews-denmark-missiles-1022",
          "title": {
            "ru": "Дания закупает ракеты Kongsberg и Covenant для нового дальнего удара",
            "en": "Denmark to buy Kongsberg, Covenant missiles for new long-range strike option"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/22/denmark-to-buy-kongsberg-covenant-missiles-for-new-long-range-strike-option/",
          "publication_date": "2026-10-22",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["balkans"] = {
  "index": 69,
  "delta": 2,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "США сняли санкции с лидера боснийских сербов Додика, чем, по оценке Balkan Insight, усилили позиции Москвы в Боснии и позволили ему беспрепятственно сближаться с Россией.",
        "en": "The US lifted sanctions on Bosnian Serb leader Dodik, which, according to Balkan Insight, strengthened Moscow’s hand in Bosnia and allowed him to pursue closer ties with Russia unhindered."
      },
      "why": {
        "ru": "Снятие ограничений на спорной фигуре меняет баланс в Боснии и создаёт риск нового витка блокады институтов.",
        "en": "Lifting restrictions on a contested figure shifts the balance in Bosnia and risks a new round of institutional blockade."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "balkaninsight-dodik-1020",
          "title": {
            "ru": "Уступки США Додику усиливают позиции Москвы в Боснии",
            "en": "US Concessions to Dodik Strengthen Moscow's Hand in Bosnia"
          },
          "domain": "balkaninsight.com",
          "url": "https://balkaninsight.com/2026/10/20/us-concessions-to-dodik-strengthen-moscows-hand-in-bosnia/bi/",
          "publication_date": "2026-10-20",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "balkaninsight-trump-rally-1021",
          "title": {
            "ru": "Связанные с Трампом лица посетили митинг боснийской сербской националистической партии",
            "en": "Trump Associates Attended Rally for Bosnian Serb Nationalist Party"
          },
          "domain": "balkaninsight.com",
          "url": "https://balkaninsight.com/2026/10/21/trump-associates-attended-rally-for-bosnian-serb-nationalist-party/bi/",
          "publication_date": "2026-10-21",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Сербия входит в самые непредсказуемые выборы за 14 лет: оппозиционное движение под давлением, активисты сообщают об атаках шпионского ПО, мобилизация избирателей за рубежом идёт с препятствиями.",
        "en": "Serbia enters its most unpredictable elections in 14 years: the opposition movement is under pressure, activists report spyware attacks, and voter mobilisation abroad faces obstacles."
      },
      "why": {
        "ru": "Электоральный кризис в ключевой для России стране региона повышает риск нестабильности и внешнего вмешательства.",
        "en": "An electoral crisis in a regional country key to Russia raises the risk of instability and external interference."
      },
      "contribution": "medium",
      "confidence": "low",
      "sources": [
        {
          "id": "balkaninsight-serbia-elections-1023",
          "title": {
            "ru": "Сербия готовится к самым непредсказуемым выборам за 14 лет",
            "en": "Serbia Braces for Most Uncertain Elections in 14 Years"
          },
          "domain": "balkaninsight.com",
          "url": "https://balkaninsight.com/2026/10/23/serbia-braces-for-most-uncertain-elections-in-14-years/bi/",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "balkaninsight-spyware-1019",
          "title": {
            "ru": "Связанных с протестным движением сербов атаковали шпионским ПО",
            "en": "Serbians Linked to Protest Movement Allegedly Hit by Spyware Attacks"
          },
          "domain": "balkaninsight.com",
          "url": "https://balkaninsight.com/2026/10/19/serbians-linked-to-protest-movement-allegedly-hit-by-spyware-attacks/bi/",
          "publication_date": "2026-10-19",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["eu-north-europe"] = {
  "index": 68,
  "delta": 2,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Перевооружение Европы ускоряется: в Телфорде вновь производят танковые стволы, Италия заказывает технику Leonardo и Rheinmetall на $4 млрд, Дания получает новый дальний удар, армия США расширяет закупки стволов гаубиц.",
        "en": "European rearmament accelerates: tank barrels are again produced in Telford, Italy orders $4bn of Leonardo and Rheinmetall equipment, Denmark gains a new long-range strike option, and the US Army expands howitzer barrel procurement."
      },
      "why": {
        "ru": "Военно-промышленные заказы и восстановление производственных цепочек фиксируют переход к длительной подготовке.",
        "en": "Defence-industrial orders and restored production chains lock in a shift towards long-term preparation."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "guardian-telford-1022",
          "title": {
            "ru": "Гонка перевооружения: в Телфорде возобновили производство стволов для танков",
            "en": "Race to rearm: Telford gun hall brings tank barrel production back to the UK"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/business/2026/oct/22/telford-gun-hall-tank-barrel-production-back-uk-rheinmetall",
          "publication_date": "2026-10-22",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "defnews-italy-contracts-1023",
          "title": {
            "ru": "Leonardo и Rheinmetall получили контракты с итальянской армией на $4 млрд",
            "en": "Leonardo, Rheinmetall secure $4 billion contracts with Italian Army"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/23/leonardo-rheinmetall-secure-4-billion-contracts-with-italian-army-report-says/",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "defnews-denmark-missiles-1022",
          "title": {
            "ru": "Дания закупает ракеты Kongsberg и Covenant для нового дальнего удара",
            "en": "Denmark to buy Kongsberg, Covenant missiles for new long-range strike option"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/22/denmark-to-buy-kongsberg-covenant-missiles-for-new-long-range-strike-option/",
          "publication_date": "2026-10-22",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "defnews-155mm-1022",
          "title": {
            "ru": "Армия США ищет производителей стволов 155-мм гаубиц на фоне роста спроса",
            "en": "US Army seeks manufacturers for 155mm howitzer barrels amid boost in demand"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/land/2026/10/22/us-army-seeks-manufacturers-for-155mm-howitzer-barrels-amid-boost-in-demand/",
          "publication_date": "2026-10-22",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Российская кампания против Европы: канцлер Мерц говорит о кибератаках, саботаже и попытках ударов по критической инфраструктуре, Австрия высылает четырёх дипломатов, Молдова — сотрудника посольства.",
        "en": "Russia's campaign against Europe: Chancellor Merz cites cyberattacks, sabotage and attempted attacks on critical infrastructure, Austria expels four diplomats, Moldova an embassy staffer."
      },
      "why": {
        "ru": "Комбинация дипломатических высылок и обвинений в саботаже указывает на системное давление, а не отдельный инцидент.",
        "en": "The combination of diplomatic expulsions and sabotage allegations points to systemic pressure rather than a single incident."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        },
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
        }
      ]
    }
  ]
};
  s.regions["south-caucasus"] = {
  "index": 66,
  "delta": 5,
  "status": "very",
  "background": false,
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
  s.regions["central-asia"] = {
  "index": 65,
  "delta": 2,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "В Таджикистане прошли учения спецназа ОДКБ «Кобальт-2026»; по их итогам ОДКБ заявляет о поставках вооружения Таджикистану до конца 2026 года. В Термезе Россия и Узбекистан отработали обеспечение безопасности афганской границы.",
        "en": "CSTO special forces held the Kobalt-2026 drills in Tajikistan, with pledges to supply weapons to Dushanbe before the end of 2026, while Russia and Uzbekistan trained for Afghan border security in Termez."
      },
      "why": {
        "ru": "Для Центральной Азии это означает рост военной активности на южном фланге и перенос учений ближе к афганской границе.",
        "en": "For Central Asia this means growing military activity on its southern flank and exercises moving closer to the Afghan border."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "sb-kobalt-start-1019",
          "title": {
            "ru": "Учения ОДКБ «Кобальт-2026» начались в Таджикистане",
            "en": "CSTO Kobalt-2026 exercises begin in Tajikistan"
          },
          "domain": "sb.by",
          "url": "https://news.sb.by/articles/ucheniya-odkb-kobalt-2026-nachalis-v-tadzhikistane.html",
          "publication_date": "2026-10-19",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "sb-kobalt-end-1023",
          "title": {
            "ru": "В Таджикистане завершились учения сил спецназа ОДКБ",
            "en": "CSTO special forces exercises conclude in Tajikistan"
          },
          "domain": "sb.by",
          "url": "https://www.sb.by/articles/v-tadzhikistane-zavershilis-ucheniya-sil-spetsnaza-odkb.html",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "iz-csto-central-asia-1023",
          "title": {
            "ru": "Союзный рефлекс: как ОДКБ готовится отражать угрозы в Центральной Азии",
            "en": "The Allied Reflex: How the CSTO Is Preparing to Counter Threats in Central Asia"
          },
          "domain": "iz.ru",
          "url": "https://iz.ru/2188766/sofia-sokolovskaia/kak-odkb-gotovitsya-otrazhat-ugrozy-v-centralnoy-azii",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "tasnim-termez-drills-1021",
          "title": {
            "ru": "Учения в Термезе: Россия и Узбекистан сосредоточились на обеспечении безопасности границ с Афганистаном",
            "en": "Exercises in Termez: Russia and Uzbekistan focus on securing the Afghan border"
          },
          "domain": "tasnimnews.ir",
          "url": "https://tasnimnews.ir/ru/news/2026/10/21/3728850/",
          "publication_date": "2026-10-21",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "anewz-csto-tajikistan-1023",
          "title": {
            "ru": "ОДКБ поставит Таджикистану вооружение на фоне роста угроз на афганской границе",
            "en": "Russia-led organisation to arm Tajikistan as security concerns grow along Afghan border"
          },
          "domain": "anewz.tv",
          "url": "https://anewz.tv/region/central-asia/25823/russia-csto-to-arm-tajikistan-for-afghan-border-security/news",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "США и страны Центральной Азии провели министерскую встречу C5+1: в итоговом заявлении — торговля, энергетика, критически важные минералы и безопасность.",
        "en": "The US and Central Asian states held a C5+1 ministerial meeting, with trade, energy, critical minerals and security in the joint statement."
      },
      "why": {
        "ru": "Формат закрепляет внешнее участие в региональной повестке безопасности и экономики, не меняя блоковой принадлежности стран.",
        "en": "The format anchors external involvement in the region's security and economic agenda without changing the countries' alliance ties."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "gazeta-c51-1019",
          "title": {
            "ru": "Торговля, энергетика и безопасность: о чём заявили страны ЦА и США по итогам встречи C5+1",
            "en": "Trade, energy and security: what Central Asian countries and the US said after the C5+1 meeting"
          },
          "domain": "gazeta.uz",
          "url": "https://www.gazeta.uz/ru/2026/10/19/statement/",
          "publication_date": "2026-10-19",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "vestiabad-c51-1020",
          "title": {
            "ru": "Центральная Азия и США обсудили укрепление сотрудничества в формате C5+1",
            "en": "Central Asia and the US discuss strengthening cooperation in the C5+1 format"
          },
          "domain": "vestiabad.ru",
          "url": "https://vestiabad.ru/ru/news/centralnaia-aziia-i-ssa-obsudili-ukreplenie-sotrudnicestva-v-formate-c51",
          "publication_date": "2026-10-20",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["east-asia"] = {
  "index": 64,
  "delta": -2,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Китай наращивает давление на Тайвань: суда милиции отрабатывают «подготовку поля боя» в западной части Тихого океана, первый авианосец вышел в новый цикл походов у Тайваня, Японии и Филиппин.",
        "en": "China increases pressure on Taiwan: militia boats exercise 'battlefield preparation' in the western Pacific, and the first aircraft carrier began a new cycle of voyages near Taiwan, Japan and the Philippines."
      },
      "why": {
        "ru": "Серые зоны и постоянное присутствие флота повышают риск инцидента без намерения начать войну.",
        "en": "Grey-zone operations and sustained naval presence raise the risk of an unintended incident."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "hindu-taiwan-militia-1023",
          "title": {
            "ru": "Тайвань: Китай использует суда милиции для «подготовки поля боя» в западной части Тихого океана",
            "en": "Taiwan says China using militia boats to expand 'battlefield preparation' in western Pacific"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/taiwan-says-china-using-militia-boats-to-expand-battlefield-preparation-in-western-pacific/article71617717.ece",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "defnews-china-carrier-1023",
          "title": {
            "ru": "Первый авианосец Китая вышел в новый цикл походов в спорных водах Азии",
            "en": "China's first aircraft carrier forms 'evolving pattern' of voyages in disputed Asian seas"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/asia-pacific/2026/10/23/chinas-first-aircraft-carrier-forms-evolving-pattern-of-voyages-in-disputed-asian-seas/",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Корейский полуостров: КНДР готовится возобновить пропагандистские громкоговорители, Ким Чен Ын требует «сильнейшей армии» и совершает неожиданный визит в Китай, Сеул предлагает военные переговоры и восстановление горячей линии.",
        "en": "The Korean Peninsula: North Korea prepares to restart propaganda loudspeakers, Kim Jong-un demands the \"strongest army\" and makes a surprise visit to China, while Seoul proposes military talks and a restored hotline."
      },
      "why": {
        "ru": "Одновременное ужесточение риторики и предложение переговоров дают и эскалацию, и канал деэскалации.",
        "en": "Simultaneous tougher rhetoric and a talks offer provide both escalation and a de-escalation channel."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "guardian-nk-speakers-1022",
          "title": {
            "ru": "КНДР готовится возобновить пропагандистские громкоговорители на границе с Югом",
            "en": "North Korea prepares to restart propaganda loudspeakers as ties sour with South"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/oct/22/north-korea-to-restart-propaganda-loudspeakers-south-korea",
          "publication_date": "2026-10-22",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "scmp-kim-army-1024",
          "title": {
            "ru": "Ким Чен Ын призвал сделать армию КНДР «сильнейшей в мире»",
            "en": "Kim Jong-un urges North Korean military to become 'strongest armed forces in the world'"
          },
          "domain": "scmp.com",
          "url": "https://www.scmp.com/news/asia/east-asia/article/3372003/kim-jong-un-urges-north-korean-military-become-strongest-armed-forces-world",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "guardian-kim-china-1024",
          "title": {
            "ru": "Ким Чен Ын пересёк новый мост и прибыл в Китай",
            "en": "Kim Jong-un crosses newly opened bridge into China"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/oct/24/kim-jong-un-crosses-newly-opened-bridge-into-china",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "yonhap-sk-nk-talks-1023",
          "title": {
            "ru": "Южная Корея предлагает КНДР военные переговоры для снижения напряжённости на границе",
            "en": "S. Korea proposes military talks with N. Korea to ease tensions along border"
          },
          "domain": "en.yna.co.kr",
          "url": "https://en.yna.co.kr/view/AEN20261023005752315",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["middle-east"] = {
  "index": 79,
  "delta": 10,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "США и Иран на пороге нового удара: Вашингтон направляет дополнительные боевые корабли и вывозит часть дипломатов, Трамп говорит об ударе «завтра» или сделке, Иран обещает ответ «в несколько раз больше» и угрожает ядерной эскалацией; Ормуз перекрыт.",
        "en": "The US and Iran are on the threshold of a new strike: Washington sends more warships and withdraws some diplomats, Trump speaks of a strike \"tomorrow\" or a deal, Iran promises a response \"several times greater\" and threatens nuclear escalation; Hormuz is blocked."
      },
      "why": {
        "ru": "Совпадение военных приготовлений, блокады и взаимных ультиматумов — максимальный сигнал по Д1, Д3 и Д5.",
        "en": "The coincidence of military preparations, blockade and mutual ultimatums is the maximum signal across D1, D3 and D5."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "aa-trump-iran-deal-1024",
          "title": {
            "ru": "Трамп: США могут ударить по Ирану «завтра» или заключить «большую красивую» сделку",
            "en": "Trump says US could strike Iran 'tomorrow' or reach 'big, beautiful' deal"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/trump-says-us-could-strike-iran-tomorrow-or-reach-big-beautiful-deal/4099883",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aa-warships-mideast-1024",
          "title": {
            "ru": "Трамп взвешивает новые удары по Ирану; США направляют в регион дополнительные боевые корабли",
            "en": "Trump weighs new Iran strikes as US sends more warships to Middle East: Report"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/americas/trump-weighs-new-iran-strikes-as-us-sends-more-warships-to-middle-east-report/4099840",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "cbs-iran-war-live-1025",
          "title": {
            "ru": "Хроника войны с Ираном: приказ дипломатам покинуть посты, предупреждение Ирана о Заливе, морская блокада",
            "en": "Iran war live updates: diplomats ordered to leave Middle East posts, Iran warns on Gulf, naval blockade"
          },
          "domain": "cbsnews.com",
          "url": "https://www.cbsnews.com/live-updates/iran-war-trump-us-oil-gas-prices-strait-of-hormuz-midterms/",
          "publication_date": "2026-10-25",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
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
        },
        {
          "id": "aa-iran-response-greater-1024",
          "title": {
            "ru": "Иран обещает ответ, «в несколько раз больший» любого военного действия",
            "en": "Iran warns of response 'several times greater' to any military action"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/iran-warns-of-response-several-times-greater-to-any-military-action/4099668",
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
        "ru": "Йемен и Хеврон: хуситы бьют по аэропортам и нефтяным объектам Саудовской Аравии, ракеты сбиты над Эр-Риядом, Таифом и Янбу; в Хевроне Израиль выселил 2 000 палестинцев и начал снос кварталов после гибели двух солдат.",
        "en": "Yemen and Hebron: the Houthis strike Saudi airports and oil facilities, missiles intercepted over Riyadh, Taif and Yanbu; in Hebron Israel displaced 2,000 Palestinians and began demolitions after two soldiers were killed."
      },
      "why": {
        "ru": "Два независимых фронта — йеменский и западно-бережный — расширяют географию и удержание конфликта.",
        "en": "Two independent fronts — Yemeni and West Bank — widen the geography and duration of the conflict."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "aa-houthis-airports-1024",
          "title": {
            "ru": "Хуситы заявили об ударах ракетами и дронами по аэропортам и нефтяным объектам Саудовской Аравии",
            "en": "Houthis claim to have struck Saudi airports, oil facilities with missiles, drones"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/houthis-claim-to-have-struck-saudi-airports-oil-facilities-with-missiles-drones/4099758",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aa-saudi-missiles-1024",
          "title": {
            "ru": "Коалиция Саудовской Аравии перехватила две баллистические ракеты хуситов по Таифу и Янбу",
            "en": "Saudi-led coalition says it intercepted 2 Houthi ballistic missiles targeting Saudi cities"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/saudi-led-coalition-says-it-intercepted-2-houthi-ballistic-missiles-targeting-saudi-cities/4099364",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aa-hebron-2000-1025",
          "title": {
            "ru": "Министр обороны Израиля признал, что 2 000 палестинцев выселены из домов в Хевроне",
            "en": "Israeli defense minister admits having forced 2,000 Palestinians from homes in Hebron"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/middle-east/israeli-defense-minister-admits-having-forced-2-000-palestinians-from-homes-in-west-bank-city-of-hebron/4099926",
          "publication_date": "2026-10-25",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "guardian-hebron-1023",
          "title": {
            "ru": "Израиль начал кампанию коллективного наказания в Хевроне после гибели двух солдат",
            "en": "Israel launches collective punishment campaign in Hebron after two soldiers killed"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/oct/23/netanyahu-orders-very-extensive-operation-west-bank-two-israeli-soldiers-killed",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["north-america"] = {
  "index": 72,
  "delta": 6,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Вашингтон балансирует между ударом и сделкой: Трамп говорит о возможном ударе «завтра», Пентагон перебрасывает дополнительные корабли, директор нацразведки предупреждает о «продвинутых стадиях» иранских планов против американцев, часть дипломатов вывезена.",
        "en": "Washington balances between a strike and a deal: Trump speaks of a possible strike \"tomorrow\", the Pentagon sends more ships, the director of national intelligence warns of \"advanced stages\" of Iranian plots against Americans, and some diplomats have been withdrawn."
      },
      "why": {
        "ru": "Внутренняя дискуссия о войне и эвакуация дипломатов — индикатор готовности к длительной кампании.",
        "en": "The domestic debate about war and the diplomatic drawdown indicate preparation for a prolonged campaign."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "aa-trump-iran-deal-1024",
          "title": {
            "ru": "Трамп: США могут ударить по Ирану «завтра» или заключить «большую красивую» сделку",
            "en": "Trump says US could strike Iran 'tomorrow' or reach 'big, beautiful' deal"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/trump-says-us-could-strike-iran-tomorrow-or-reach-big-beautiful-deal/4099883",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aa-warships-mideast-1024",
          "title": {
            "ru": "Трамп взвешивает новые удары по Ирану; США направляют в регион дополнительные боевые корабли",
            "en": "Trump weighs new Iran strikes as US sends more warships to Middle East: Report"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/americas/trump-weighs-new-iran-strikes-as-us-sends-more-warships-to-middle-east-report/4099840",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "cbs-iran-war-live-1025",
          "title": {
            "ru": "Хроника войны с Ираном: приказ дипломатам покинуть посты, предупреждение Ирана о Заливе, морская блокада",
            "en": "Iran war live updates: diplomats ordered to leave Middle East posts, Iran warns on Gulf, naval blockade"
          },
          "domain": "cbsnews.com",
          "url": "https://www.cbsnews.com/live-updates/iran-war-trump-us-oil-gas-prices-strait-of-hormuz-midterms/",
          "publication_date": "2026-10-25",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Экономический контур: США приостановили часть тарифов против Канады перед выборами, одновременно растёт давление на Иран через блокаду и санкции, а по сделке с Москвой вышел первый танкер с российским дизтопливом.",
        "en": "The economic contour: the US suspended some tariffs on Canada ahead of the midterms, while pressure on Iran grows through blockade and sanctions, and the first tanker of Russian diesel departed under a deal with Moscow."
      },
      "why": {
        "ru": "Торговые уступки и точечные сделки показывают, как Вашингтон покупает пространство для манёвра.",
        "en": "Trade concessions and targeted deals show how Washington buys room for manoeuvre."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "hindu-canada-tariffs-1024",
          "title": {
            "ru": "Трамп отменил часть тарифов против Канады перед выборами",
            "en": "Trump lifts some Canada tariffs ahead of midterms"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/trump-lifts-some-canada-tariffs-ahead-of-midterms/article71618930.ece",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-kremlin-diesel-1023",
          "title": {
            "ru": "Кремль: первый танкер с российским дизтопливом по сделке с США вышел в море",
            "en": "Kremlin says '1st tanker' carrying Russian diesel fuel as part of deal with US has departed"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/eurasia/kremlin-says-1st-tanker-carrying-russian-diesel-fuel-as-part-of-deal-with-us-has-departed/4098372",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "cbs-iran-war-live-1025",
          "title": {
            "ru": "Хроника войны с Ираном: приказ дипломатам покинуть посты, предупреждение Ирана о Заливе, морская блокада",
            "en": "Iran war live updates: diplomats ordered to leave Middle East posts, Iran warns on Gulf, naval blockade"
          },
          "domain": "cbsnews.com",
          "url": "https://www.cbsnews.com/live-updates/iran-war-trump-us-oil-gas-prices-strait-of-hormuz-midterms/",
          "publication_date": "2026-10-25",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.regions["south-asia"] = {
  "index": 68,
  "delta": 2,
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
  s.regions["africa"] = {
  "index": 70,
  "delta": 4,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Судан: удары дронов убили не менее 306 человек за три недели, армия отчиталась о возвращении двух районов в Голубом Ниле, в Южном Дарфуре начал работу «Высший комитет мобилизации и народного сопротивления», а война перекинулась в Центральноафриканскую Республику.",
        "en": "Sudan: drone strikes killed at least 306 people in three weeks, the army reported retaking two areas in Blue Nile, a \"Higher Committee for Mobilization and Popular Resistance\" began work in South Darfur, and the war has spilled into the Central African Republic."
      },
      "why": {
        "ru": "Дроновая война, мобилизационные структуры и региональное распространение делают Судан устойчивым источником насилия.",
        "en": "Drone warfare, mobilization structures and regional spillover make Sudan a persistent source of violence."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "un-sudan-drones-1023",
          "title": {
            "ru": "Судан: удары дронов убили не менее 306 человек за три недели",
            "en": "Sudan: Drone strikes killed at least 306 people in three weeks"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/feed/view/en/story/2026/10/1168661",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "un-car-spillover-1020",
          "title": {
            "ru": "ООН предупреждает против преждевременного вывода миротворцев: война в Судане перекинулась в ЦАР",
            "en": "As Sudan war spills into Central African Republic, UN warns against early peacekeeper exit"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/feed/view/en/story/2026/10/1168630",
          "publication_date": "2026-10-20",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "icrc-ethiopia-1020",
          "title": {
            "ru": "Эфиопия: МККК реагирует на возобновившиеся боевые действия на севере",
            "en": "Ethiopia: ICRC responds to humanitarian needs amid renewed hostilities in the north"
          },
          "domain": "icrc.org",
          "url": "https://www.icrc.org/en/article/ethiopia-icrc-responds-humanitarian-needs-amid-renewed-hostilities-north-ethiopia",
          "publication_date": "2026-10-20",
          "accessed_date": "2026-10-25",
          "source_type": "primary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "radiotamazuj-darfur-mobilization-1023",
          "title": {
            "ru": "Комитет мобилизации Южного Дарфура заявил о поддержке суданской армии",
            "en": "New South Darfur mobilization committee pledges support for Sudan Army"
          },
          "domain": "radiotamazuj.org",
          "url": "https://www.radiotamazuj.org/en/news/article/new-south-darfur-mobilization-committee-pledges-support-for-sudan-army",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "OSINT",
          "cluster_id": "E-field-osint",
          "state_affiliated": false
        },
        {
          "id": "aa-sudan-blue-nile-1022",
          "title": {
            "ru": "Суданская армия вернула два стратегических района в штате Голубой Нил и сбила дрон",
            "en": "Sudanese army retakes 2 strategic areas in Blue Nile state, downs drone"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/africa/sudanese-army-retakes-2-strategic-areas-in-blue-nile-state-downs-drone/4097645",
          "publication_date": "2026-10-22",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Сахель и Африканский Рог: в Мали число погибших при нападении выросло до 54, в Эфиопии возобновились боевые действия на севере, МККК наращивает помощь.",
        "en": "The Sahel and the Horn: the death toll from an attack in Mali rose to 54, hostilities resumed in northern Ethiopia, and the ICRC is scaling up aid."
      },
      "why": {
        "ru": "Одновременные вспышки насилия в Сахеле и Эфиопии истощают гуманитарные возможности региона.",
        "en": "Simultaneous outbreaks of violence in the Sahel and Ethiopia strain the region’s humanitarian capacity."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "hindu-mali-1025",
          "title": {
            "ru": "Власти Мали подняли до 54 число погибших при нападении на северо-востоке",
            "en": "Military ups death toll in Mali attack to 54"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/military-ups-death-toll-in-mali-attack-to-54/article71622485.ece",
          "publication_date": "2026-10-25",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "icrc-ethiopia-1020",
          "title": {
            "ru": "Эфиопия: МККК реагирует на возобновившиеся боевые действия на севере",
            "en": "Ethiopia: ICRC responds to humanitarian needs amid renewed hostilities in the north"
          },
          "domain": "icrc.org",
          "url": "https://www.icrc.org/en/article/ethiopia-icrc-responds-humanitarian-needs-amid-renewed-hostilities-north-ethiopia",
          "publication_date": "2026-10-20",
          "accessed_date": "2026-10-25",
          "source_type": "primary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
  s.trend = [
  {
    "date": "2026-08-09",
    "value": 65
  },
  {
    "date": "2026-08-16",
    "value": 66
  },
  {
    "date": "2026-08-23",
    "value": 67
  },
  {
    "date": "2026-08-30",
    "value": 51,
    "methodology": "3.0"
  },
  {
    "date": "2026-09-06",
    "value": 42,
    "methodology": "3.0"
  },
  {
    "date": "2026-09-13",
    "value": 43,
    "methodology": "3.0"
  },
  {
    "date": "2026-09-20",
    "value": 56,
    "methodology": "3.0"
  },
  {
    "date": "2026-09-27",
    "value": 47,
    "methodology": "3.0"
  },
  {
    "date": "2026-10-04",
    "value": 46,
    "methodology": "3.0"
  },
  {
    "date": "2026-10-11",
    "value": 56,
    "methodology": "3.0"
  },
  {
    "date": "2026-10-18",
    "value": 64,
    "methodology": "3.0"
  },
  {
    "date": "2026-10-25",
    "value": 68,
    "methodology": "3.0"
  }
];
  s.drivers = [
  {
    "label": {
      "ru": "Вашингтон и Тегеран на пороге удара, Ормуз перекрыт",
      "en": "Washington and Tehran on the brink of a strike, Hormuz blocked"
    },
    "observation": {
      "ru": "США и Иран на пороге нового удара: Вашингтон перебрасывает боевые корабли, Тегеран обещает «апокалиптическую войну», Ормузский пролив остаётся перекрытым, а часть американских дипломатов и членов семей вывезена с Ближнего Востока. Трамп говорит о ударе «завтра» или «большой красивой» сделке; Иран предлагает открыть Ормуз в обмен на снятие морской блокады.",
      "en": "The US and Iran stand on the threshold of a new strike: Washington is sending more warships, Tehran promises an \"apocalyptic war\", the Strait of Hormuz remains blocked, and some US diplomats and families have been withdrawn from the Middle East. Trump speaks of a strike \"tomorrow\" or a \"big, beautiful\" deal; Iran offers to reopen Hormuz in exchange for lifting the naval blockade."
    },
    "why": {
      "ru": "Одновременные военные приготовления, блокада торгового пути и угрозы необратимой эскалации в одном недельном окне дают самый сильный сигнал по драйверам Д1, Д3, Д4 и Д5.",
      "en": "Simultaneous military preparations, a blockade of a trade route and threats of irreversible escalation within one week produce the strongest signal across drivers D1, D3, D4 and D5."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "aa-trump-iran-deal-1024",
        "title": {
          "ru": "Трамп: США могут ударить по Ирану «завтра» или заключить «большую красивую» сделку",
          "en": "Trump says US could strike Iran 'tomorrow' or reach 'big, beautiful' deal"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/world/trump-says-us-could-strike-iran-tomorrow-or-reach-big-beautiful-deal/4099883",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "aa-warships-mideast-1024",
        "title": {
          "ru": "Трамп взвешивает новые удары по Ирану; США направляют в регион дополнительные боевые корабли",
          "en": "Trump weighs new Iran strikes as US sends more warships to Middle East: Report"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/americas/trump-weighs-new-iran-strikes-as-us-sends-more-warships-to-middle-east-report/4099840",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "cbs-iran-war-live-1025",
        "title": {
          "ru": "Хроника войны с Ираном: приказ дипломатам покинуть посты, предупреждение Ирана о Заливе, морская блокада",
          "en": "Iran war live updates: diplomats ordered to leave Middle East posts, Iran warns on Gulf, naval blockade"
        },
        "domain": "cbsnews.com",
        "url": "https://www.cbsnews.com/live-updates/iran-war-trump-us-oil-gas-prices-strait-of-hormuz-midterms/",
        "publication_date": "2026-10-25",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
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
      },
      {
        "id": "mehr-irgc-apocalyptic-1024",
        "title": {
          "ru": "КСИР предупреждает об «апокалиптической войне», которая выйдет за пределы Ирана",
          "en": "IRGC warns 'apocalyptic war' will reverberate beyond Iran"
        },
        "domain": "en.mehrnews.com",
        "url": "https://en.mehrnews.com/news/248863/IRGC-warns-apocalyptic-war-will-reverberate-beyond-Iran",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      }
    ]
  },
  {
    "label": {
      "ru": "Йеменская война бьёт по аэропортам и нефти Саудовской Аравии",
      "en": "Yemen's war hits Saudi airports and Saudi oil"
    },
    "observation": {
      "ru": "Йеменская война вышла за пределы страны: хуситы заявили об ударах по трём саудовским аэропортам, нефтяным объектам и трубопроводу, ракеты сбиты над Эр-Риядом, Таифом и Янбу; Саудовская коалиция бьёт по Сане и Ходейде, в осаждённом Таизе заканчивается вода.",
      "en": "The Yemen war has spilled across borders: the Houthis claim strikes on three Saudi airports, oil facilities and a pipeline, missiles were intercepted over Riyadh, Taif and Yanbu; the Saudi-led coalition strikes Sanaa and Hodeidah, and water is running out in besieged Taiz."
    },
    "why": {
      "ru": "Удары по энергетике и аэропортам третьей страны расширяют географию конфликта (Д7.2) и повышают риск перебоев поставок (Д4.3, Д4.6).",
      "en": "Strikes on energy assets and airports of a third country widen the conflict geography (D7.2) and raise supply-disruption risk (D4.3, D4.6)."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "aa-houthis-airports-1024",
        "title": {
          "ru": "Хуситы заявили об ударах ракетами и дронами по аэропортам и нефтяным объектам Саудовской Аравии",
          "en": "Houthis claim to have struck Saudi airports, oil facilities with missiles, drones"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/middle-east/houthis-claim-to-have-struck-saudi-airports-oil-facilities-with-missiles-drones/4099758",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "aa-saudi-missiles-1024",
        "title": {
          "ru": "Коалиция Саудовской Аравии перехватила две баллистические ракеты хуситов по Таифу и Янбу",
          "en": "Saudi-led coalition says it intercepted 2 Houthi ballistic missiles targeting Saudi cities"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/middle-east/saudi-led-coalition-says-it-intercepted-2-houthi-ballistic-missiles-targeting-saudi-cities/4099364",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "aj-houthis-aden-1024",
        "title": {
          "ru": "Хуситы атаковали Саудовскую Аравию и йеменский Аден",
          "en": "Houthis launch attacks on Saudi Arabia and Yemen's Aden"
        },
        "domain": "aljazeera.com",
        "url": "https://www.aljazeera.com/news/2026/10/24/houthis-launch-attacks-on-saudi-arabia-and-yemens-aden",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "un-taiz-aid-1023",
        "title": {
          "ru": "Йемен: помощь не пропускают в осаждённый город Таиз",
          "en": "Yemen: Deepening concerns for Taiz City as aid is blocked from entering"
        },
        "domain": "news.un.org",
        "url": "https://news.un.org/feed/view/en/story/2026/10/1168654",
        "publication_date": "2026-10-23",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "cbs-iran-war-live-1025",
        "title": {
          "ru": "Хроника войны с Ираном: приказ дипломатам покинуть посты, предупреждение Ирана о Заливе, морская блокада",
          "en": "Iran war live updates: diplomats ordered to leave Middle East posts, Iran warns on Gulf, naval blockade"
        },
        "domain": "cbsnews.com",
        "url": "https://www.cbsnews.com/live-updates/iran-war-trump-us-oil-gas-prices-strait-of-hormuz-midterms/",
        "publication_date": "2026-10-25",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  },
  {
    "label": {
      "ru": "Олешки: гуманитарное перемирие согласовано, но фронт не стих",
      "en": "Oleshky: a humanitarian ceasefire agreed, but the front has not calmed"
    },
    "observation": {
      "ru": "Россия и Украина согласовали локальное гуманитарное перемирие в Олешках (вступает в силу 27 октября) при посредничестве США, но на фронте — массированные удары: Белгород, Орёл, Омск, 1 297 сбитых дронов за сутки; SpaceX ограничивала скорость Starshield для Украины и восстановила её после контактов на высоком уровне.",
      "en": "Russia and Ukraine agreed a local humanitarian ceasefire in Oleshky (effective 27 October) with US mediation, while the front saw massive strikes: Belgorod, Oryol, Omsk, 1,297 drones downed in 24 hours; SpaceX throttled Starshield speeds for Ukraine and restored them after high-level contacts."
    },
    "why": {
      "ru": "Локальное перемирие — редкий деэскалационный сигнал (Д8.2), но интенсивность боёв и зависимость от коммерческой спутниковой связи держат эскалацию (Д1.4, Д7.4, Д9.3).",
      "en": "The local ceasefire is a rare de-escalatory signal (D8.2), but combat intensity and dependence on commercial satellite communications keep escalation high (D1.4, D7.4, D9.3)."
    },
    "contribution": "high",
    "confidence": "medium",
    "sources": [
      {
        "id": "cbs-melania-ceasefire-1023",
        "title": {
          "ru": "Мелания Трамп добилась временного перемирия в Олешках",
          "en": "Melania Trump helps secure temporary ceasefire between Russia and Ukraine in Oleshky"
        },
        "domain": "cbsnews.com",
        "url": "https://www.cbsnews.com/news/first-lady-melania-trump-temporary-ceasefire-russia-ukraine-oleshky/",
        "publication_date": "2026-10-23",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "aa-zelensky-oleshky-1024",
        "title": {
          "ru": "Зеленский: Украина соблюдает перемирие в Олешках и рассчитывает на посредничество США",
          "en": "Zelenskyy says Ukraine will honor Oleshky ceasefire, counts on US mediation to work"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/politics/zelenskyy-says-ukraine-will-honor-oleshky-ceasefire-counts-on-us-mediation-to-work/4099683",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "hindu-ceasefire-oct27-1024",
        "title": {
          "ru": "Локальное гуманитарное перемирие с Россией начнётся 27 октября, заявил переговорщик",
          "en": "Local humanitarian ceasefire with Russia will start on October 27, says negotiator"
        },
        "domain": "thehindu.com",
        "url": "https://www.thehindu.com/news/international/local-humanitarian-ceasefire-with-russia-will-start-on-october-27-says-negotiator/article71618931.ece",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
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
        "id": "cbs-musk-starlink-1024",
        "title": {
          "ru": "Маск: SpaceX ограничивала скорость Starlink для Украины из-за ударов дронами",
          "en": "Elon Musk says SpaceX throttled Ukraine Starlink speeds over drone strikes"
        },
        "domain": "cbsnews.com",
        "url": "https://www.cbsnews.com/news/ukraine-starlink-drone-spacex-musk-speed-restriction/",
        "publication_date": "2026-10-24",
        "accessed_date": "2026-10-25",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ]
  }
];
  s.sources = [
  {
    "id": "aa-trump-iran-deal-1024",
    "title": {
      "ru": "Трамп: США могут ударить по Ирану «завтра» или заключить «большую красивую» сделку",
      "en": "Trump says US could strike Iran 'tomorrow' or reach 'big, beautiful' deal"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/trump-says-us-could-strike-iran-tomorrow-or-reach-big-beautiful-deal/4099883",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-warships-mideast-1024",
    "title": {
      "ru": "Трамп взвешивает новые удары по Ирану; США направляют в регион дополнительные боевые корабли",
      "en": "Trump weighs new Iran strikes as US sends more warships to Middle East: Report"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/americas/trump-weighs-new-iran-strikes-as-us-sends-more-warships-to-middle-east-report/4099840",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-israel-alert-1024",
    "title": {
      "ru": "Армия Израиля приведена в высшую готовность и развернула десятки тысяч военных перед выборами",
      "en": "Israeli army on highest alert, deploys tens of thousands of troops ahead of elections"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/israeli-army-on-highest-alert-deploys-tens-of-thousands-of-troops-ahead-of-elections/4099876",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "cbs-iran-war-live-1025",
    "title": {
      "ru": "Хроника войны с Ираном: приказ дипломатам покинуть посты, предупреждение Ирана о Заливе, морская блокада",
      "en": "Iran war live updates: diplomats ordered to leave Middle East posts, Iran warns on Gulf, naval blockade"
    },
    "domain": "cbsnews.com",
    "url": "https://www.cbsnews.com/live-updates/iran-war-trump-us-oil-gas-prices-strait-of-hormuz-midterms/",
    "publication_date": "2026-10-25",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
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
  },
  {
    "id": "hindu-iran-cables-1023",
    "title": {
      "ru": "Иран имеет детальные планы ударов по подводным кабелям Залива при возобновлении войны",
      "en": "Iran has detailed plans to hit Gulf undersea cables if war resumes, officials say"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/iran-has-detailed-plans-to-hit-gulf-undersea-cables-if-war-resumes-officials-say/article71617797.ece",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "jpost-tehran-nuclear-strike-1025",
    "title": {
      "ru": "Тегеран угрожает ударами по энергетике и гражданским объектам и ядерной эскалацией в случае атаки",
      "en": "Tehran threatens strikes on energy, civilian targets, and nuclear escalation if attacked"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/iran-news/article-912728",
    "publication_date": "2026-10-25",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "un-iaea-inspectors-1023",
    "title": {
      "ru": "Гросси призывает к скорейшему возвращению инспекторов МАГАТЭ в Иран",
      "en": "IAEA chief calls for swift return of inspectors to Iran"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/10/1168664",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-iaea-ready-1023",
    "title": {
      "ru": "Глава МАГАТЭ: агентство готово верифицировать ядерную деятельность Ирана и призывает к дипломатическому соглашению",
      "en": "IAEA chief says agency 'ready' to verify Iran's nuclear activities, urges diplomatic agreement"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/americas/iaea-chief-says-agency-ready-to-verify-iran-s-nuclear-activities-urges-diplomatic-agreement/4099058",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "mehr-irgc-apocalyptic-1024",
    "title": {
      "ru": "КСИР предупреждает об «апокалиптической войне», которая выйдет за пределы Ирана",
      "en": "IRGC warns 'apocalyptic war' will reverberate beyond Iran"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/248863/IRGC-warns-apocalyptic-war-will-reverberate-beyond-Iran",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "mehr-iran-uninhabitable-1025",
    "title": {
      "ru": "Иран заявляет, что сделает Израиль непригодным для жизни менее чем за час",
      "en": "Iran can make Israel uninhabitable in under an hour"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/248868/Iran-to-make-Israel-uninhabitable-in-under-an-hour",
    "publication_date": "2026-10-25",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-iran-response-greater-1024",
    "title": {
      "ru": "Иран обещает ответ, «в несколько раз больший» любого военного действия",
      "en": "Iran warns of response 'several times greater' to any military action"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/iran-warns-of-response-several-times-greater-to-any-military-action/4099668",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "mehr-nuclear-sites-1024",
    "title": {
      "ru": "Тегеран: нормализация атак на ядерные объекты неприемлема",
      "en": "Normalization of attacks on nuclear sites unacceptable"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/248864/Normalization-of-attacks-on-nuclear-sites-unacceptable",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "hindu-us-ops-signs-1024",
    "title": {
      "ru": "Признаки возобновления крупных военных операций США против Ирана",
      "en": "Signs point to renewed major U.S. military operations against Iran"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/signs-point-to-renewed-major-us-military-operations-against-iran/article71618967.ece",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "npr-reinforcements-1023",
    "title": {
      "ru": "Военные подкрепления перебрасываются на Ближний Восток",
      "en": "Military reinforcements move to Mideast"
    },
    "domain": "npr.org",
    "url": "https://www.npr.org/2026/10/23/g-s1-149514/up-first-newsletter-iran-war-midterm-voting-trump-bbc",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tass-trump-weighs-1024",
    "title": {
      "ru": "Трамп взвешивает возобновление ударов США по Ирану",
      "en": "Trump weighs resumption of US strikes against Iran"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2207359",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "yonhap-guam-1023",
    "title": {
      "ru": "Армия США развернула батальон ПВО на Гуаме на фоне ракетных угроз КНДР и Китая",
      "en": "U.S. Army activates air defense battalion in Guam amid N. Korean, Chinese missile threats"
    },
    "domain": "en.yna.co.kr",
    "url": "https://en.yna.co.kr/view/AEN20261024000500315",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "defnews-china-carrier-1023",
    "title": {
      "ru": "Первый авианосец Китая вышел в новый цикл походов в спорных водах Азии",
      "en": "China's first aircraft carrier forms 'evolving pattern' of voyages in disputed Asian seas"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/global/asia-pacific/2026/10/23/chinas-first-aircraft-carrier-forms-evolving-pattern-of-voyages-in-disputed-asian-seas/",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "defnews-space-tail-1023",
    "title": {
      "ru": "Космическая война: Россия сблизила военный спутник с американским аппаратом, связанным с Украиной",
      "en": "'The West can't stop me': Space wars heat up as Russia tails a Ukraine-linked US satellite"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/space/2026/10/23/the-west-cant-stop-me-space-wars-heat-up-as-russia-tails-a-ukraine-linked-us-satellite/",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "mehr-iraq-resistance-1024",
    "title": {
      "ru": "«Иракское сопротивление» обещает встать на сторону Ирана в случае возобновления войны",
      "en": "Iraq resistance vows to side with Iran in case of renewed war"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/248862/Iraq-resistance-vows-to-side-with-Iran-in-case-of-renewed-war",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-komala-drone-1024",
    "title": {
      "ru": "Дроны атаковали лагерь иранской курдской оппозиции в Иракском Курдистане",
      "en": "Drone attacks camp of Iranian Kurdish opposition in Iraqi Kurdistan"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2207367",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
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
    "id": "jpost-iraq-militia-1024",
    "title": {
      "ru": "Ирак считает, что Израиль мог ударить по складам оружия ополченцев, поставленного Ираном",
      "en": "Iraq believes Israel may have struck militia weapons supplied by Iran - report"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/article-912720",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-saudi-missiles-1024",
    "title": {
      "ru": "Коалиция Саудовской Аравии перехватила две баллистические ракеты хуситов по Таифу и Янбу",
      "en": "Saudi-led coalition says it intercepted 2 Houthi ballistic missiles targeting Saudi cities"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/saudi-led-coalition-says-it-intercepted-2-houthi-ballistic-missiles-targeting-saudi-cities/4099364",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-houthis-airports-1024",
    "title": {
      "ru": "Хуситы заявили об ударах ракетами и дронами по аэропортам и нефтяным объектам Саудовской Аравии",
      "en": "Houthis claim to have struck Saudi airports, oil facilities with missiles, drones"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/houthis-claim-to-have-struck-saudi-airports-oil-facilities-with-missiles-drones/4099758",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aj-houthis-aden-1024",
    "title": {
      "ru": "Хуситы атаковали Саудовскую Аравию и йеменский Аден",
      "en": "Houthis launch attacks on Saudi Arabia and Yemen's Aden"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/24/houthis-launch-attacks-on-saudi-arabia-and-yemens-aden",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "un-taiz-aid-1023",
    "title": {
      "ru": "Йемен: помощь не пропускают в осаждённый город Таиз",
      "en": "Yemen: Deepening concerns for Taiz City as aid is blocked from entering"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/10/1168654",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-gaza-ceasefire-1024",
    "title": {
      "ru": "Четверо палестинцев убиты при очередных нарушениях перемирия в Газе",
      "en": "4 Palestinians, including 2 women, child, killed in latest Israeli violations of Gaza ceasefire"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/4-palestinians-including-2-women-child-killed-in-latest-israeli-violations-of-gaza-ceasefire/4099465",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "guardian-hebron-1023",
    "title": {
      "ru": "Израиль начал кампанию коллективного наказания в Хевроне после гибели двух солдат",
      "en": "Israel launches collective punishment campaign in Hebron after two soldiers killed"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/23/netanyahu-orders-very-extensive-operation-west-bank-two-israeli-soldiers-killed",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-hebron-2000-1025",
    "title": {
      "ru": "Министр обороны Израиля признал, что 2 000 палестинцев выселены из домов в Хевроне",
      "en": "Israeli defense minister admits having forced 2,000 Palestinians from homes in Hebron"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/israeli-defense-minister-admits-having-forced-2-000-palestinians-from-homes-in-west-bank-city-of-hebron/4099926",
    "publication_date": "2026-10-25",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "jpost-hebron-evac-1024",
    "title": {
      "ru": "ЦАХАЛ и Шабак принудительно выселили 2 000 палестинцев из Хеврона",
      "en": "IDF, Shin Bet forcibly evacuate 2,000 Hebron Palestinians"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/israel-news/defense-news/article-912714",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "un-sudan-drones-1023",
    "title": {
      "ru": "Судан: удары дронов убили не менее 306 человек за три недели",
      "en": "Sudan: Drone strikes killed at least 306 people in three weeks"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/10/1168661",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "un-car-spillover-1020",
    "title": {
      "ru": "ООН предупреждает против преждевременного вывода миротворцев: война в Судане перекинулась в ЦАР",
      "en": "As Sudan war spills into Central African Republic, UN warns against early peacekeeper exit"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/10/1168630",
    "publication_date": "2026-10-20",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "hindu-mali-1025",
    "title": {
      "ru": "Власти Мали подняли до 54 число погибших при нападении на северо-востоке",
      "en": "Military ups death toll in Mali attack to 54"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/military-ups-death-toll-in-mali-attack-to-54/article71622485.ece",
    "publication_date": "2026-10-25",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "icrc-ethiopia-1020",
    "title": {
      "ru": "Эфиопия: МККК реагирует на возобновившиеся боевые действия на севере",
      "en": "Ethiopia: ICRC responds to humanitarian needs amid renewed hostilities in the north"
    },
    "domain": "icrc.org",
    "url": "https://www.icrc.org/en/article/ethiopia-icrc-responds-humanitarian-needs-amid-renewed-hostilities-north-ethiopia",
    "publication_date": "2026-10-20",
    "accessed_date": "2026-10-25",
    "source_type": "primary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
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
  },
  {
    "id": "defnews-fr-uk-nuclear-1023",
    "title": {
      "ru": "Франция и Великобритания впервые провели совместные учения воздушных ядерных сил",
      "en": "France, UK carry out joint airborne nuclear-strike exercise for first time"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/global/europe/2026/10/23/france-uk-carry-out-joint-airborne-nuclear-strike-exercise-for-first-time/",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
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
  },
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
    "id": "balkaninsight-dodik-1020",
    "title": {
      "ru": "Уступки США Додику усиливают позиции Москвы в Боснии",
      "en": "US Concessions to Dodik Strengthen Moscow's Hand in Bosnia"
    },
    "domain": "balkaninsight.com",
    "url": "https://balkaninsight.com/2026/10/20/us-concessions-to-dodik-strengthen-moscows-hand-in-bosnia/bi/",
    "publication_date": "2026-10-20",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "balkaninsight-serbia-elections-1023",
    "title": {
      "ru": "Сербия готовится к самым непредсказуемым выборам за 14 лет",
      "en": "Serbia Braces for Most Uncertain Elections in 14 Years"
    },
    "domain": "balkaninsight.com",
    "url": "https://balkaninsight.com/2026/10/23/serbia-braces-for-most-uncertain-elections-in-14-years/bi/",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "balkaninsight-spyware-1019",
    "title": {
      "ru": "Связанных с протестным движением сербов атаковали шпионским ПО",
      "en": "Serbians Linked to Protest Movement Allegedly Hit by Spyware Attacks"
    },
    "domain": "balkaninsight.com",
    "url": "https://balkaninsight.com/2026/10/19/serbians-linked-to-protest-movement-allegedly-hit-by-spyware-attacks/bi/",
    "publication_date": "2026-10-19",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "balkaninsight-trump-rally-1021",
    "title": {
      "ru": "Связанные с Трампом лица посетили митинг боснийской сербской националистической партии",
      "en": "Trump Associates Attended Rally for Bosnian Serb Nationalist Party"
    },
    "domain": "balkaninsight.com",
    "url": "https://balkaninsight.com/2026/10/21/trump-associates-attended-rally-for-bosnian-serb-nationalist-party/bi/",
    "publication_date": "2026-10-21",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "yonhap-sk-nk-talks-1023",
    "title": {
      "ru": "Южная Корея предлагает КНДР военные переговоры для снижения напряжённости на границе",
      "en": "S. Korea proposes military talks with N. Korea to ease tensions along border"
    },
    "domain": "en.yna.co.kr",
    "url": "https://en.yna.co.kr/view/AEN20261023005752315",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-seoul-talks-1023",
    "title": {
      "ru": "Сеул предложил Пхеньяну военные переговоры на фоне напряжённости на полуострове",
      "en": "Seoul offers military talks to Pyongyang amid tensions on Korean Peninsula"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/asia-pacific/seoul-offers-military-talks-to-pyongyang-amid-tensions-on-korean-peninsula/4098301",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "guardian-nk-speakers-1022",
    "title": {
      "ru": "КНДР готовится возобновить пропагандистские громкоговорители на границе с Югом",
      "en": "North Korea prepares to restart propaganda loudspeakers as ties sour with South"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/22/north-korea-to-restart-propaganda-loudspeakers-south-korea",
    "publication_date": "2026-10-22",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "scmp-kim-army-1024",
    "title": {
      "ru": "Ким Чен Ын призвал сделать армию КНДР «сильнейшей в мире»",
      "en": "Kim Jong-un urges North Korean military to become 'strongest armed forces in the world'"
    },
    "domain": "scmp.com",
    "url": "https://www.scmp.com/news/asia/east-asia/article/3372003/kim-jong-un-urges-north-korean-military-become-strongest-armed-forces-world",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-kim-china-1024",
    "title": {
      "ru": "Ким Чен Ын пересёк новый мост и прибыл в Китай",
      "en": "Kim Jong-un crosses newly opened bridge into China"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/24/kim-jong-un-crosses-newly-opened-bridge-into-china",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "hindu-taiwan-militia-1023",
    "title": {
      "ru": "Тайвань: Китай использует суда милиции для «подготовки поля боя» в западной части Тихого океана",
      "en": "Taiwan says China using militia boats to expand 'battlefield preparation' in western Pacific"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/taiwan-says-china-using-militia-boats-to-expand-battlefield-preparation-in-western-pacific/article71617717.ece",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "yonhap-us-treasury-nk-1023",
    "title": {
      "ru": "Минфин США предлагает расширить ограничения на технологические инвестиции в КНДР",
      "en": "U.S. Treasury Department proposes expanding tech investment restrictions to N. Korea"
    },
    "domain": "en.yna.co.kr",
    "url": "https://en.yna.co.kr/view/AEN20261024000200315",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-australia-sanctions-nk-1023",
    "title": {
      "ru": "Австралия ввела санкции против двух северокорейских компаний и «финансовых посредников»",
      "en": "Australia sanctions 2 North Korean companies, 'financial brokers'"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/asia-pacific/australia-sanctions-2-north-korean-companies-financial-brokers-/4098037",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "yonhap-sk-drills-1023",
    "title": {
      "ru": "Командование Сухопутных войск Южной Кореи провело полевые учения с контрбатарейной борьбой",
      "en": "Army's Ground Operations Command stages field training drills linked to counterfire warfare"
    },
    "domain": "en.yna.co.kr",
    "url": "https://en.yna.co.kr/view/AEN20261023006500315",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-indonesia-highway-1022",
    "title": {
      "ru": "Индонезия отработала посадку истребителей на шоссе Восточной Явы в рамках учений готовности",
      "en": "Indonesia tests fighter jets on East Java highway as alternative runway amid operational readiness exercise"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/asia-pacific/indonesia-tests-fighter-jets-on-east-java-highway-as-alternative-runway-amid-operational-readiness-exercise/4097327",
    "publication_date": "2026-10-22",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-brent-highest-1023",
    "title": {
      "ru": "Brent достиг максимума с июня 2022 года на опасениях новых ударов США по Ирану",
      "en": "Brent crude hits highest since June 2022 on fears of renewed US strikes on Iran"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/economy/brent-crude-hits-highest-since-june-2022-on-fears-of-renewed-us-strikes-on-iran/4098685",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-global-markets-1023",
    "title": {
      "ru": "Мировые рынки падают на опасениях возобновления ближневосточного конфликта",
      "en": "Global markets tumble amid fears of reigniting Middle East tensions, AI concerns"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/economy/global-markets-tumble-amid-fears-of-reigniting-middle-east-tensions-ai-concerns/4098973",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "oilprice-brent-high-1023",
    "title": {
      "ru": "Brent достиг пятимесячного максимума на фоне перебоев поставок в Заливе",
      "en": "Middle East Physical Crude Slides While Brent Hits Five-Month High"
    },
    "domain": "oilprice.com",
    "url": "https://oilprice.com/Latest-Energy-News/World-News/Middle-East-Physical-Crude-Slides-While-Brent-Hits-Five-Month-High.html",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "F-financial",
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
    "id": "oilprice-spr-1023",
    "title": {
      "ru": "США снова расходуют стратегический нефтяной резерв из-за перебоев поставок",
      "en": "U.S. Dips Into Strategic Oil Reserve Again Amid Supply Disruptions"
    },
    "domain": "oilprice.com",
    "url": "https://oilprice.com/Latest-Energy-News/World-News/US-Dips-Into-Strategic-Oil-Reserve-Again-Amid-Supply-Disruptions.html",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "hindu-indonesia-gas-1024",
    "title": {
      "ru": "Индонезия сократила поставки трубопроводного газа в Сингапур примерно на 9 %",
      "en": "Indonesia cuts pipeline gas exports to Singapore by about 9%"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/indonesia-cuts-pipeline-gas-exports-to-singapore-by-about-9/article71621477.ece",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-iea-energy-crisis-1023",
    "title": {
      "ru": "Глава МЭА ожидает сохранения энергетического кризиса в 2027 году",
      "en": "IEA chief expects energy crisis to persist into 2027"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/economy/iea-chief-expects-energy-crisis-to-persist-into-2027/4098258",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-kremlin-diesel-1023",
    "title": {
      "ru": "Кремль: первый танкер с российским дизтопливом по сделке с США вышел в море",
      "en": "Kremlin says '1st tanker' carrying Russian diesel fuel as part of deal with US has departed"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/eurasia/kremlin-says-1st-tanker-carrying-russian-diesel-fuel-as-part-of-deal-with-us-has-departed/4098372",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "hindu-canada-tariffs-1024",
    "title": {
      "ru": "Трамп отменил часть тарифов против Канады перед выборами",
      "en": "Trump lifts some Canada tariffs ahead of midterms"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/trump-lifts-some-canada-tariffs-ahead-of-midterms/article71618930.ece",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "defnews-italy-contracts-1023",
    "title": {
      "ru": "Leonardo и Rheinmetall получили контракты с итальянской армией на $4 млрд",
      "en": "Leonardo, Rheinmetall secure $4 billion contracts with Italian Army"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/global/europe/2026/10/23/leonardo-rheinmetall-secure-4-billion-contracts-with-italian-army-report-says/",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-telford-1022",
    "title": {
      "ru": "Гонка перевооружения: в Телфорде возобновили производство стволов для танков",
      "en": "Race to rearm: Telford gun hall brings tank barrel production back to the UK"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/business/2026/oct/22/telford-gun-hall-tank-barrel-production-back-uk-rheinmetall",
    "publication_date": "2026-10-22",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "defnews-denmark-missiles-1022",
    "title": {
      "ru": "Дания закупает ракеты Kongsberg и Covenant для нового дальнего удара",
      "en": "Denmark to buy Kongsberg, Covenant missiles for new long-range strike option"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/global/europe/2026/10/22/denmark-to-buy-kongsberg-covenant-missiles-for-new-long-range-strike-option/",
    "publication_date": "2026-10-22",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "defnews-155mm-1022",
    "title": {
      "ru": "Армия США ищет производителей стволов 155-мм гаубиц на фоне роста спроса",
      "en": "US Army seeks manufacturers for 155mm howitzer barrels amid boost in demand"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/land/2026/10/22/us-army-seeks-manufacturers-for-155mm-howitzer-barrels-amid-boost-in-demand/",
    "publication_date": "2026-10-22",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "defnews-saudi-missiles-1023",
    "title": {
      "ru": "Расширение ракетного завода Саудовской Аравии может дать более мощные ракеты",
      "en": "Saudi missile plant expansion may produce more powerful missiles, study says"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/global/mideast-africa/2026/10/23/saudi-missile-plant-expansion-may-produce-more-powerful-missiles-study-says/",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-travel-advisory-1024",
    "title": {
      "ru": "США призывают граждан пересмотреть поездки в Саудовскую Аравию и ОАЭ из-за угроз безопасности",
      "en": "US urges citizens to reconsider travel to Saudi Arabia, UAE over regional security threats"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/americas/us-urges-citizens-to-reconsider-travel-to-saudi-arabia-uae-over-regional-security-threats/4099842",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
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
  },
  {
    "id": "aa-starshield-restored-1024",
    "title": {
      "ru": "Украина: ограничения скорости Starshield сняты после контактов на высоком уровне",
      "en": "Ukraine says Starshield speed restrictions lifted after high-level contacts"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/ukraine-says-starshield-speed-restrictions-lifted-after-high-level-contacts/4099455",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "cbs-musk-starlink-1024",
    "title": {
      "ru": "Маск: SpaceX ограничивала скорость Starlink для Украины из-за ударов дронами",
      "en": "Elon Musk says SpaceX throttled Ukraine Starlink speeds over drone strikes"
    },
    "domain": "cbsnews.com",
    "url": "https://www.cbsnews.com/news/ukraine-starlink-drone-spacex-musk-speed-restriction/",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tass-alyoshki-1024",
    "title": {
      "ru": "Россия и Украина выполняют обязательства по перемирию в Алёшках",
      "en": "Russia, Ukraine fulfil their commitments toward Alyoshki ceasefire"
    },
    "domain": "tass.com",
    "url": "https://tass.com/politics/2207325",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-zelensky-oleshky-1024",
    "title": {
      "ru": "Зеленский: Украина соблюдает перемирие в Олешках и рассчитывает на посредничество США",
      "en": "Zelenskyy says Ukraine will honor Oleshky ceasefire, counts on US mediation to work"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/politics/zelenskyy-says-ukraine-will-honor-oleshky-ceasefire-counts-on-us-mediation-to-work/4099683",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "cbs-melania-ceasefire-1023",
    "title": {
      "ru": "Мелания Трамп добилась временного перемирия в Олешках",
      "en": "Melania Trump helps secure temporary ceasefire between Russia and Ukraine in Oleshky"
    },
    "domain": "cbsnews.com",
    "url": "https://www.cbsnews.com/news/first-lady-melania-trump-temporary-ceasefire-russia-ukraine-oleshky/",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "hindu-ceasefire-oct27-1024",
    "title": {
      "ru": "Локальное гуманитарное перемирие с Россией начнётся 27 октября, заявил переговорщик",
      "en": "Local humanitarian ceasefire with Russia will start on October 27, says negotiator"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/local-humanitarian-ceasefire-with-russia-will-start-on-october-27-says-negotiator/article71618931.ece",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tass-locomotives-1025",
    "title": {
      "ru": "Украина потеряла почти 14 % локомотивов менее чем за два года",
      "en": "Ukraine loses nearly 14% of its locomotives in less than two years"
    },
    "domain": "tass.com",
    "url": "https://tass.com/economy/2207397",
    "publication_date": "2026-10-25",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-duma-delhi-1024",
    "title": {
      "ru": "Спикер Госдумы прибыл с рабочей поездкой в Нью-Дели",
      "en": "Duma speaker arrives on working visit to New Delhi"
    },
    "domain": "tass.com",
    "url": "https://tass.com/politics/2207347",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-india-russia-1024",
    "title": {
      "ru": "Индия рассчитывает на дальнейшее укрепление отношений с Россией, заявил спикер Лок Сабхи",
      "en": "India wants relations with Russia to be further strengthened — Lok Sabha speaker"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2207293",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-apec-talks-1021",
    "title": {
      "ru": "Кремль: Китай, Россия и США открыты к трёхсторонним переговорам на саммите АТЭС",
      "en": "Kremlin says China, Russia, US open to trilateral talks at APEC summit"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/politics/kremlin-says-china-russia-us-open-to-trilateral-talks-at-apec-summit/4096229",
    "publication_date": "2026-10-21",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "rt-israel-sanctions-economy-1025",
    "title": {
      "ru": "Нетаньяху: Израилю нужна экономика, устойчивая к санкциям",
      "en": "Israel needs sanctions-proof economy – Netanyahu"
    },
    "domain": "rt-english.com",
    "url": "https://rt-english.com/news/647625-israel-sanctions-alternative-economy-netanyahu/",
    "publication_date": "2026-10-25",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "jpost-bibicoin-1024",
    "title": {
      "ru": "Эйзенкот раскритиковал план Нетаньяху по альтернативному финансированию государства",
      "en": "Eisenkot slams Netanyahu's crypto plan for alternative funding"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/israel-election-2026/article-912715",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-france-social-media-1025",
    "title": {
      "ru": "Франция просила операторов связи готовиться к ограничениям соцсетей",
      "en": "France reportedly asked telecom operators to prepare for social media restrictions"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/europe/france-reportedly-asked-telecom-operators-to-prepare-for-social-media-restrictions-report/4099923",
    "publication_date": "2026-10-25",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "scmp-china-censorship-1024",
    "title": {
      "ru": "Аккаунт ведущего китайского экономического комментатора Рен Цзепина ограничен",
      "en": "Leading Chinese economic commentator Ren Zeping's social media account restricted"
    },
    "domain": "scmp.com",
    "url": "https://www.scmp.com/news/china/money-wealth/article/3372032/leading-chinese-economic-commentator-ren-zepings-social-media-account-restricted",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "radiotamazuj-darfur-mobilization-1023",
    "title": {
      "ru": "Комитет мобилизации Южного Дарфура заявил о поддержке суданской армии",
      "en": "New South Darfur mobilization committee pledges support for Sudan Army"
    },
    "domain": "radiotamazuj.org",
    "url": "https://www.radiotamazuj.org/en/news/article/new-south-darfur-mobilization-committee-pledges-support-for-sudan-army",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "OSINT",
    "cluster_id": "E-field-osint",
    "state_affiliated": false
  },
  {
    "id": "cgtn-china-export-japan-1021",
    "title": {
      "ru": "Китай ввёл экспортный контроль в отношении Японии",
      "en": "China imposes export controls on Japan to curb its nuclear ambition"
    },
    "domain": "news.cgtn.com",
    "url": "https://news.cgtn.com/news/2026-10-21/China-imposes-export-controls-on-Japan-to-curb-its-nuclear-ambition-1Rqtto6Dmx2/p.html",
    "publication_date": "2026-10-21",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "sputnik-iran-heu-1021",
    "title": {
      "ru": "Секретарь Совбеза Ирана: обогащённые ядерные материалы не покинут страну",
      "en": "Head of Iran's Security Council Says Enriched Nuclear Materials Will Not Leave Country"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261021/head-of-irans-security-council-says-enriched-nuclear-materials-will-not-leave-country-1124913190.html",
    "publication_date": "2026-10-21",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "scmp-singapore-gas-1025",
    "title": {
      "ru": "Сингапур требует от поставщиков выполнять обязательства после сокращения поставок газа из Индонезии",
      "en": "Singapore tells suppliers to 'honour commitments' amid Indonesia's gas cut"
    },
    "domain": "scmp.com",
    "url": "https://www.scmp.com/news/asia/southeast-asia/article/3372048/singapore-tells-suppliers-honour-commitments-amid-indonesias-gas-cut",
    "publication_date": "2026-10-25",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-brent-gas-1023",
    "title": {
      "ru": "Brent на пятимесячном максимуме, европейский газ — максимум с декабря 2022 года",
      "en": "Brent hits 5-month high, European gas highest since December 2022 as supply risks mount"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/economy/brent-hits-5-month-high-european-gas-highest-since-december-2022-as-supply-risks-mount/4097999",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "mehr-israel-west-bank-1025",
    "title": {
      "ru": "Израильские силы рейдировали 400 точек на Западном берегу, 2 200 человек выселены",
      "en": "Israeli forces raid 400 points in West Bank, 2,200 displaced"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/248885/Israeli-forces-raid-400-points-in-West-Bank-2-200-displaced",
    "publication_date": "2026-10-25",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "defenseone-greenland-bases-1020",
    "title": {
      "ru": "Пентагон со следующего года начнёт расширять базы в Гренландии",
      "en": "Pentagon to start expanding Greenland bases next year: official"
    },
    "domain": "defenseone.com",
    "url": "https://www.defenseone.com/policy/2026/10/pentagon-expand-greenland-bases/416706/",
    "publication_date": "2026-10-20",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "sputnik-mirovka-1022",
    "title": {
      "ru": "Минобороны РФ заявило о взятии села Мировка в Запорожской области",
      "en": "Russian Forces Liberate Mirovka Settlement in Zaporozhye Region - MoD"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261022/russian-forces-liberate-mirovka-settlement-in-zaporozhye-region---mod-1124923329.html",
    "publication_date": "2026-10-22",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-sudan-blue-nile-1022",
    "title": {
      "ru": "Суданская армия вернула два стратегических района в штате Голубой Нил и сбила дрон",
      "en": "Sudanese army retakes 2 strategic areas in Blue Nile state, downs drone"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/africa/sudanese-army-retakes-2-strategic-areas-in-blue-nile-state-downs-drone/4097645",
    "publication_date": "2026-10-22",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "kommersant-austria-expels-1023",
    "title": {
      "ru": "Австрия объявила четырёх российских дипломатов персонами нон грата",
      "en": "Austria declares four Russian diplomats personae non gratae"
    },
    "domain": "kommersant.ru",
    "url": "https://www.kommersant.ru/doc/9045475",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-moldova-expels-diplomat-1024",
    "title": {
      "ru": "Россия обещает «жёсткий ответ» после высылки дипломата Молдовой",
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
    "id": "defensenews-france-uk-nuclear-drill-1023",
    "title": {
      "ru": "Франция и Великобритания впервые провели совместные учения с отработкой ядерного удара с воздуха",
      "en": "France, UK carry out joint airborne nuclear-strike exercise for first time"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/global/europe/2026/10/23/france-uk-carry-out-joint-airborne-nuclear-strike-exercise-for-first-time/",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "govuk-uk-france-nuclear-exercise-1023",
    "title": {
      "ru": "Великобритания и Франция укрепляют ядерное оборонное партнёрство на первых совместных учениях",
      "en": "UK-France deepen nuclear defence ties in first joint exercise"
    },
    "domain": "gov.uk",
    "url": "https://www.gov.uk/government/news/uk-france-deepen-nuclear-defence-ties-in-first-joint-exercise",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": true
  },
  {
    "id": "euractiv-eu-defence-budget-1022",
    "title": {
      "ru": "Европарламент допускает участие стран вне ЕС в следующем оборонном бюджете: 136,1 млрд евро на оборону и космос",
      "en": "Parliament leaves door open to non-EU countries in next defence budget"
    },
    "domain": "rapporteur.com",
    "url": "https://www.rapporteur.com/news/parliament-leaves-door-open-to-non-eu-countries-in-next-defence-budget/",
    "publication_date": "2026-10-22",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Хост отдаёт 403 автоматическим проверкам (Cloudflare) — классификация linkcheck: blocked, не битая; материал доступен через RSS Euractiv."
  },
  {
    "id": "mehr-ukraine-military-spending-1025",
    "title": {
      "ru": "Конфликт с Россией будет стоить Украине более 470 млн долларов в день",
      "en": "Conflict with Russia to cost Ukraine over $470 mln per day"
    },
    "domain": "en.mehrnews.com",
    "url": "https://en.mehrnews.com/news/248873/Conflict-with-Russia-to-cost-Ukraine-over-470-mln-per-day",
    "publication_date": "2026-10-25",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "cyberscoop-gru-nato-firms-1020",
    "title": {
      "ru": "Хакеры ГРУ атаковали судостроителя НАТО, производителя авиадвигателей и правоохранительное ведомство",
      "en": "Russian GRU hackers hit NATO shipbuilder, aircraft engine maker, law enforcement agency in espionage campaign"
    },
    "domain": "cyberscoop.com",
    "url": "https://cyberscoop.com/russian-hackers-apt28-target-nato-defense-firms/",
    "publication_date": "2026-10-20",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-merz-russia-destabilize-1024",
    "title": {
      "ru": "Мерц обвинил Россию в стремлении «дестабилизировать» Германию",
      "en": "Merz accuses Russia of seeking to 'destabilize' Germany"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/europe/merz-accuses-russia-of-seeking-to-destabilize-germany/4099528",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "balkaninsight-bulgaria-drone-controversy-1023",
    "title": {
      "ru": "Болгария: фаворит президентской гонки лидирует несмотря на споры вокруг дронов",
      "en": "Bulgaria's Presidential Frontrunner Holds Lead Despite Drone Controversy"
    },
    "domain": "balkaninsight.com",
    "url": "https://balkaninsight.com/2026/10/23/bulgarias-presidential-frontrunner-holds-lead-despite-drone-controversy/bi/",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Атаки дронов по болгарской зоне Чёрного моря 6 и 13 октября и по румынским водам в этом месяце — вне окна недели; материал подтверждает региональную атрибуцию balkans для D7.2."
  },
  {
    "id": "aa-bulgaria-election-security-1025",
    "title": {
      "ru": "Болгария идёт на выборы на фоне региональных проблем безопасности",
      "en": "Bulgaria heads to polls for presidential election amid regional security concerns"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/europe/bulgaria-heads-to-polls-for-presidential-election-amid-regional-security-concerns/4099979",
    "publication_date": "2026-10-25",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "danas-latvia-drone-1024",
    "title": {
      "ru": "В Латвии обнаружен беспилотник неизвестного происхождения",
      "en": "Drone of unknown origin found in Latvia"
    },
    "domain": "danas.rs",
    "url": "https://www.danas.rs/svet/u-letoniji-pronadjena-bespilotna-letelica-nepoznatog-porekla/",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "civilge-iprm-135-1023",
    "title": {
      "ru": "В Эргнети прошла 135-я встреча Механизма предотвращения инцидентов и реагирования",
      "en": "135th IPRM Meeting Held in Ergneti"
    },
    "domain": "civil.ge",
    "url": "https://civil.ge/archives/755705",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "sb-kobalt-start-1019",
    "title": {
      "ru": "Учения ОДКБ «Кобальт-2026» начались в Таджикистане",
      "en": "CSTO Kobalt-2026 exercises begin in Tajikistan"
    },
    "domain": "sb.by",
    "url": "https://news.sb.by/articles/ucheniya-odkb-kobalt-2026-nachalis-v-tadzhikistane.html",
    "publication_date": "2026-10-19",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "sb-kobalt-end-1023",
    "title": {
      "ru": "В Таджикистане завершились учения сил спецназа ОДКБ",
      "en": "CSTO special forces exercises conclude in Tajikistan"
    },
    "domain": "sb.by",
    "url": "https://www.sb.by/articles/v-tadzhikistane-zavershilis-ucheniya-sil-spetsnaza-odkb.html",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "iz-csto-central-asia-1023",
    "title": {
      "ru": "Союзный рефлекс: как ОДКБ готовится отражать угрозы в Центральной Азии",
      "en": "The Allied Reflex: How the CSTO Is Preparing to Counter Threats in Central Asia"
    },
    "domain": "iz.ru",
    "url": "https://iz.ru/2188766/sofia-sokolovskaia/kak-odkb-gotovitsya-otrazhat-ugrozy-v-centralnoy-azii",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tasnim-termez-drills-1021",
    "title": {
      "ru": "Учения в Термезе: Россия и Узбекистан сосредоточились на обеспечении безопасности границ с Афганистаном",
      "en": "Exercises in Termez: Russia and Uzbekistan focus on securing the Afghan border"
    },
    "domain": "tasnimnews.ir",
    "url": "https://tasnimnews.ir/ru/news/2026/10/21/3728850/",
    "publication_date": "2026-10-21",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "anewz-csto-tajikistan-1023",
    "title": {
      "ru": "ОДКБ поставит Таджикистану вооружение на фоне роста угроз на афганской границе",
      "en": "Russia-led organisation to arm Tajikistan as security concerns grow along Afghan border"
    },
    "domain": "anewz.tv",
    "url": "https://anewz.tv/region/central-asia/25823/russia-csto-to-arm-tajikistan-for-afghan-border-security/news",
    "publication_date": "2026-10-23",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "gazeta-c51-1019",
    "title": {
      "ru": "Торговля, энергетика и безопасность: о чём заявили страны ЦА и США по итогам встречи C5+1",
      "en": "Trade, energy and security: what Central Asian countries and the US said after the C5+1 meeting"
    },
    "domain": "gazeta.uz",
    "url": "https://www.gazeta.uz/ru/2026/10/19/statement/",
    "publication_date": "2026-10-19",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "vestiabad-c51-1020",
    "title": {
      "ru": "Центральная Азия и США обсудили укрепление сотрудничества в формате C5+1",
      "en": "Central Asia and the US discuss strengthening cooperation in the C5+1 format"
    },
    "domain": "vestiabad.ru",
    "url": "https://vestiabad.ru/ru/news/centralnaia-aziia-i-ssa-obsudili-ukreplenie-sotrudnicestva-v-formate-c51",
    "publication_date": "2026-10-20",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "kaztag-military-reform-1021",
    "title": {
      "ru": "Казахстан меняет модель срочной службы — Токаев обсудил военную реформу с совбезом",
      "en": "Kazakhstan changes its conscription model as Tokayev discusses military reform with Security Council"
    },
    "domain": "kaztag.kz",
    "url": "https://kaztag.kz/ru/news/kazakhstan-menyaet-model-srochnoy-sluzhby-tokaev-obsudil-voennuyu-reformu-s-sovbezom",
    "publication_date": "2026-10-21",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "kursiv-military-reform-1024",
    "title": {
      "ru": "В Казахстане началась военная реформа: как изменятся армия и срочная служба",
      "en": "Military reform begins in Kazakhstan: how the army and conscription will change"
    },
    "domain": "kz.kursiv.media",
    "url": "https://kz.kursiv.media/2026-10-24/tsse-v-kazahstane-nachalas-voennaya-reforma-kak-izmenyatsya-armiya-i-srochnaya-sluzhb/",
    "publication_date": "2026-10-24",
    "accessed_date": "2026-10-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  }
];
})();
