window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  // Редакционный сид недели 2026-09-06: три главных драйвера недели.
  // Источники — verbatim-записи из calc/input/2026-09-06.json (R55).
s.drivers = [
  {
    "observation": {
      "ru": "Между Россией и Украиной действует режим тишины 5–8 сентября, ВСУ получили приказ соблюдать прекращение огня; Зеленский заявил о готовности прекратить удары по городам, где проходят мирные переговоры при посредничестве США; на ЗАЭС вступило в силу седьмое локальное прекращение огня для ремонта линии электропередачи под мониторингом МАГАТЭ; при этом Путин поручил подготовить массированные удары по энергетике Украины.",
      "en": "A silence regime between Russia and Ukraine is in force on 5–8 September and the Ukrainian armed forces were ordered to observe it; Zelensky said he is ready to halt strikes on cities hosting peace talks mediated by the United States; a seventh local ceasefire took effect at the Zaporizhzhia nuclear plant to repair a power line under IAEA monitoring; at the same time Putin ordered preparations for massed strikes on Ukraine’s energy grid."
    },
    "why": {
      "ru": "Первое устойчивое снижение интенсивности за недели сочетается с прямыми угрозами новых ударов — риск возврата к эскалации сохраняется.",
      "en": "The first sustained de-escalation in weeks is combined with direct threats of new strikes, so the risk of a return to escalation persists."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "gazeta-ru-regime-of-silence-september-5",
        "title": {
          "ru": "Режим тишины между Россией и Украиной 5–8 сентября: ВСУ получили приказ соблюдать прекращение огня",
          "en": "Russia-Ukraine silence regime September 5-8: AFU ordered to abide by ceasefire"
        },
        "domain": "gazeta.ru",
        "url": "https://www.gazeta.ru/politics/2026/09/05/23506915.shtml",
        "publication_date": "2026-09-05",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "aa-com-tr-zelenskiy-halt-strikes-talks-cities-4048283",
        "title": {
          "ru": "Зеленский: Украина готова прекратить удары по городам, где проходят мирные переговоры при посредничестве США",
          "en": "Zelenskyy: Ukraine ready to halt strikes on cities hosting US-mediated peace talks"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/ru/%D0%BC%D0%B8%D1%80/%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0-%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%B0-%D0%BF%D1%80%D0%B5%D0%BA%D1%80%D0%B0%D1%82%D0%B8%D1%82%D1%8C-%D1%83%D0%B4%D0%B0%D1%80%D1%8B-%D0%BF%D0%BE-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D0%BC-%D0%B3%D0%B4%D0%B5-%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B4%D1%8F%D1%82-%D0%BC%D0%B8%D1%80%D0%BD%D1%8B%D0%B5-%D0%BF%D0%B5%D1%80%D0%B5%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D1%8B-%D0%BF%D1%80%D0%B8-%D0%BF%D0%BE%D1%81%D1%80%D0%B5%D0%B4%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%B5-%D1%81%D1%88%D0%B0/4048283",
        "publication_date": "2026-09-05",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "aa-com-tr-iaea-zaes-local-ceasefire-4048007",
        "title": {
          "ru": "МАГАТЭ: в районе ЗАЭС вступило в силу локальное прекращение огня для ремонта линии электропередачи",
          "en": "IAEA: local ceasefire around ZNPP enters into force for power line repair"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/ru/%D0%BC%D0%B8%D1%80/%D0%BC%D0%B0%D0%B3%D0%B0%D1%82%D1%8D-%D0%B2-%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%B5-%D0%B7%D0%B0%D1%8D%D1%81-%D0%B2%D1%81%D1%82%D1%83%D0%BF%D0%B8%D0%BB%D0%BE-%D0%B2-%D1%81%D0%B8%D0%BB%D1%83-%D0%BB%D0%BE%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5-%D0%BF%D1%80%D0%B5%D0%BA%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B3%D0%BD%D1%8F-/4048007",
        "publication_date": "2026-09-05",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "rbc-ru-putin-poruchenie-udary-02-09-2026",
        "title": {
          "ru": "Путин рассказал о поручении насчет ударов по украинской энергетике и приостановке переговоров",
          "en": "Putin speaks on order regarding strikes on Ukrainian energy grid and suspension of talks"
        },
        "domain": "rbc.ru",
        "url": "https://www.rbc.ru/politics/02/09/2026/6a973cb65bd2c4a73a49f0dd",
        "publication_date": "2026-09-02",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ],
    "label": {
      "ru": "Режим тишины 5–8 сентября и локальное перемирие на ЗАЭС",
      "en": "Silence regime of 5–8 September and local ceasefire at the ZNPP"
    }
  },
  {
    "observation": {
      "ru": "Германия обвинила Россию в атаке дронов в аэропорту Лейпцига, где целью был украинский транспортный самолёт, и анонсировала закрытие Русского дома и генконсульства; Россия отвергла обвинения и пообещала жёсткий ответ на санкции; в ЕС объяснили новые ограничения для российских дипломатов.",
      "en": "Germany accused Russia of a drone attack at Leipzig airport targeting a Ukrainian transport aircraft and announced the closure of the Russian House and its consulate general; Russia rejected the accusations and promised a tough response to sanctions; the EU explained new restrictions on Russian diplomats."
    },
    "why": {
      "ru": "Прямое обвинение в диверсии на территории страны НАТО и взаимные дипломатические меры сужают пространство для переговоров и повышают ставки инцидентов.",
      "en": "A direct accusation of sabotage on NATO territory and reciprocal diplomatic measures narrow the room for talks and raise the stakes of incidents."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "kommersant-ru-leipzig-consulate-closure-8924215",
        "title": {
          "ru": "Германия обвинила Россию в атаке дронов в Лейпциге и анонсировала закрытие Русского дома и генконсульства",
          "en": "Germany accuses Russia of Leipzig drone attack, announces closure of Russian House and consulate general"
        },
        "domain": "kommersant.ru",
        "url": "https://www.kommersant.ru/doc/8924215",
        "publication_date": "2026-09-02",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "kommersant-ru-germany-accuses-leipzig-8923569",
        "title": {
          "ru": "Германия обвинила Россию в инциденте с дроном в аэропорту Лейпцига",
          "en": "Germany accuses Russia over drone incident at Leipzig airport"
        },
        "domain": "kommersant.ru",
        "url": "https://www.kommersant.ru/doc/8923569",
        "publication_date": "2026-09-01",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "kommersant-ru-russia-rejects-leipzig-8924396",
        "title": {
          "ru": "Россия отвергла обвинения Германии в инциденте в Лейпциге и пообещала жёсткий ответ на санкции",
          "en": "Russia rejects German accusations over Leipzig incident, promises harsh response to sanctions"
        },
        "domain": "kommersant.ru",
        "url": "https://www.kommersant.ru/doc/8924396",
        "publication_date": "2026-09-02",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "dw-com-germany-response-leipzig-sanctions",
        "title": {
          "ru": "Ответ Германии на диверсию с дронами в Лейпциге: обвинение в адрес России и санкции",
          "en": "Germany's response to Leipzig drone sabotage: accusations against Russia and sanctions"
        },
        "domain": "dw.com",
        "url": "https://www.dw.com/ru/otvet-germanii-na-diversiu-s-dronami-v-lejpcige/a-78844842",
        "publication_date": "2026-09-03",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      },
      {
        "id": "lenta-ru-ogranicheniya-diplomatov-es",
        "title": {
          "ru": "Ограничения для российских дипломатов в ЕС объяснили подготовкой к войне с Россией",
          "en": "EU restrictions on Russian diplomats explained as preparation for war with Russia"
        },
        "domain": "lenta.ru",
        "url": "https://lenta.ru/news/2026/09/04/ogranicheniya-dlya-rossiyskih-diplomatov-v-es-ob-yasnili/",
        "publication_date": "2026-09-04",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true
      }
    ],
    "label": {
      "ru": "Инцидент в Лейпциге вызвал дипломатический разрыв с Германией",
      "en": "Leipzig incident triggered a diplomatic rupture with Germany"
    }
  },
  {
    "observation": {
      "ru": "В Латвии начались учения Namejs-2026 с участием 12 тысяч военнослужащих из США, Канады и стран Прибалтики; Германия удвоила оборонный бюджет и взяла на себя ответственность за оборону Европы; военные расходы Берлина вырастут до 110 млрд евро.",
      "en": "Exercise Namejs-2026 began in Latvia with 12,000 troops from the United States, Canada and the Baltic states; Germany doubled its defence budget and took responsibility for Europe’s defence; Berlin’s military spending will rise to EUR 110 billion."
    },
    "why": {
      "ru": "Плотность учений на восточном фланге и серийный рост расходов закрепляют ожидание длительной напряжённости у границ альянса.",
      "en": "Dense drills on the eastern flank and serial spending growth entrench expectations of prolonged tension at the alliance’s borders."
    },
    "contribution": "medium",
    "confidence": "high",
    "sources": [
      {
        "id": "ura-news-namejs-2026-latvia-start",
        "title": {
          "ru": "В Латвии начались учения НАТО Namejs-2026 с участием 12 тысяч военнослужащих из США, Канады и Прибалтики",
          "en": "NATO's Namejs-2026 exercise begins in Latvia with 12,000 troops from the US, Canada and the Baltics"
        },
        "domain": "ura.news",
        "url": "https://ura.news/news/1053123716",
        "publication_date": "2026-09-02",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "realtribune-ru-germany-defense-budget-doubled",
        "title": {
          "ru": "Германия удвоила оборонный бюджет и взяла ответственность за оборону Европы",
          "en": "Germany doubles defence budget and takes responsibility for Europe's defence"
        },
        "domain": "realtribune.ru",
        "url": "https://realtribune.ru/germaniya-udvoila-oboronnyj-bjudzhet-i-vzyala-otvetstvennost-za-evropu/",
        "publication_date": "2026-08-31",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      },
      {
        "id": "br-az-germany-record-rearmament-budget",
        "title": {
          "ru": "Германия готовится к рекордному перевооружению: военные расходы вырастут до €110 млрд",
          "en": "Germany prepares for record rearmament: military spending to rise to 110 billion euros"
        },
        "domain": "br.az",
        "url": "https://br.az/inworld/121800/germaniya-gotovitsya-k-rekordnomu-perevooruzheniyu-voennye-rashody-vzletyat-do-euro110-mlrd/",
        "publication_date": "2026-08-31",
        "accessed_date": "2026-09-26",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false
      }
    ],
    "label": {
      "ru": "Учения НАТО в Прибалтике и рост оборонных бюджетов",
      "en": "NATO drills in the Baltics and rising defence budgets"
    }
  }
];
})();
