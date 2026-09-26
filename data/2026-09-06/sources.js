window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  s.sources = [
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
    "id": "ura-news-putin-otverg-mobilizaciyu",
    "title": {
      "ru": "Путин вновь опроверг слухи о мобилизации после выборов в Госдуму",
      "en": "Putin again denies rumours of mobilisation after State Duma elections"
    },
    "domain": "ura.news",
    "url": "https://ura.news/news/1053123991",
    "publication_date": "2026-09-03",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "isans-org-belarus-military-review-august-2026",
    "title": {
      "ru": "Обзор военной активности в Беларуси за август 2026 года",
      "en": "Review of military activity in Belarus, August 2026"
    },
    "domain": "isans.org",
    "url": "https://isans.org/military-ru/obzor-voennoj-aktivnosti-v-belarusi-za-avgust-2026.html",
    "publication_date": "2026-09-01",
    "accessed_date": "2026-09-26",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "understandingwar-org-roca-september-4-2026",
    "title": {
      "ru": "ISW: оценка российского наступления, 4 сентября 2026",
      "en": "ISW Russian Offensive Campaign Assessment, September 4, 2026"
    },
    "domain": "understandingwar.org",
    "url": "https://understandingwar.org/research/russia-ukraine/russian-offensive-campaign-assessment-september-4-2026/",
    "publication_date": "2026-09-04",
    "accessed_date": "2026-09-26",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "lenta-ru-rossiya-udarila-logisticheskiy-tsentr",
    "title": {
      "ru": "Россия ударила новейшим беспилотником по логистическому центру под Киевом",
      "en": "Russia strikes logistics centre near Kyiv with newest drone"
    },
    "domain": "lenta.ru",
    "url": "https://lenta.ru/news/2026/09/02/rossiya-udarila-noveyshim-bespilotnikom-po-logisticheskomu-tsentru-pod-kievom/",
    "publication_date": "2026-09-02",
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
  },
  {
    "id": "interfax-ru-putin-ukazaniya-udary-tek",
    "title": {
      "ru": "ВС РФ получили указания по подготовке массированных ударов по энергетике Украины, заявил Путин",
      "en": "Russian armed forces instructed to prepare massive strikes on Ukrainian energy infrastructure, Putin says"
    },
    "domain": "interfax.ru",
    "url": "https://www.interfax.ru/russia/1112563",
    "publication_date": "2026-09-01",
    "accessed_date": "2026-09-26",
    "source_type": "primary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "rbc-ru-putin-zayavleniya-01-09-2026",
    "title": {
      "ru": "Заявления Путина об ударах на Украине и ответных мерах, 1 сентября 2026",
      "en": "Putin's statements on strikes in Ukraine and retaliatory measures, September 1, 2026"
    },
    "domain": "rbc.ru",
    "url": "https://www.rbc.ru/politics/01/09/2026/6a9731ae6098ec160309dad4",
    "publication_date": "2026-09-01",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
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
    "id": "eurointegration-com-ua-eu-sanctions-postponed",
    "title": {
      "ru": "Послы ЕС отложили продление индивидуальных санкций против России",
      "en": "EU ambassadors postpone extension of individual Russia sanctions"
    },
    "domain": "eurointegration.com.ua",
    "url": "https://www.eurointegration.com.ua/rus/news/2026/09/2/7244680/",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "euronews-belgium-frozen-assets-pushback",
    "title": {
      "ru": "Бельгия вновь выступила против использования замороженных российских активов",
      "en": "Belgium again pushes back against using frozen Russian assets"
    },
    "domain": "ru.euronews.com",
    "url": "https://ru.euronews.com/2026/09/02/belgium-pushes-back",
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
  },
  {
    "id": "aljazeera-com-ceuta-disinformation-eeas",
    "title": {
      "ru": "Премьер Испании обвинил Россию и Израиль в дезинформации во время кризиса в Сеуте, ссылаясь на исследование EEAS",
      "en": "Spain's Sanchez says Russia, Israel spread disinformation during Ceuta crisis, citing EEAS research"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/8/31/spains-sanchez-condemns-russia-israel-disinformation-during-ceuta-crisis",
    "publication_date": "2026-08-31",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "klerk-ru-mobilization-after-elections",
    "title": {
      "ru": "Мобилизация после выборов 2026 года: будет ли новая волна",
      "en": "Mobilisation after the 2026 elections: will there be a new wave"
    },
    "domain": "klerk.ru",
    "url": "https://www.klerk.ru/buh/articles/707264/",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "cargorun-ru-diesel-export-ban-extended",
    "title": {
      "ru": "Запрет на экспорт дизтоплива производителями продлён до 30 сентября 2026 года",
      "en": "Diesel fuel export ban for producers extended to 30 September 2026"
    },
    "domain": "cargorun.ru",
    "url": "https://cargorun.ru/blog/novosti/zapret-eksport-diztopliva-30-sentyabrya-2026",
    "publication_date": "2026-08-31",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "commodity-board-diesel-ban-distillate-supply",
    "title": {
      "ru": "Россия продлевает запрет на экспорт дизельного топлива до 30 сентября 2026 года, ужесточая глобальный баланс средних дистиллятов",
      "en": "Russia extends diesel export ban to 30 September 2026, tightening global middle-distillate supply"
    },
    "domain": "commodity-board.com",
    "url": "https://commodity-board.com/%D1%80%D0%BE%D1%81%D1%81%D0%B8%D1%8F-%D0%BF%D1%80%D0%BE%D0%B4%D0%BB%D0%B5%D0%B2%D0%B0%D0%B5%D1%82-%D0%B7%D0%B0%D0%BF%D1%80%D0%B5%D1%82-%D0%BD%D0%B0-%D1%8D%D0%BA%D1%81%D0%BF%D0%BE%D1%80%D1%82-%D0%B4%D0%B8%D0%B7%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%B2%D0%B0-%D0%B4%D0%BE-30-%D1%81%D0%B5%D0%BD%D1%82%D1%8F%D0%B1%D1%80%D1%8F-2026-%D0%B3%D0%BE%D0%B4%D0%B0",
    "publication_date": "2026-09-01",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "marketpower-diesel-ban-winter-stockpiles",
    "title": {
      "ru": "Власти России продлили запрет на экспорт дизельного топлива до 30 сентября 2026 года для формирования запасов на зиму",
      "en": "Russia extends diesel export ban to 30 September 2026 to build winter fuel reserves"
    },
    "domain": "marketpower.pro",
    "url": "https://marketpower.pro/publications/vlasti-rossii-prodlili-zapret-na-eksport-dizelnogo-topliva-do-30-sentiabria",
    "publication_date": "2026-09-03",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "insur-info-drone-risk-insurance-market",
    "title": {
      "ru": "Воздушная защита: сколько стоят страховки от БПЛА в России",
      "en": "Air defence: the cost of drone-attack insurance in Russia"
    },
    "domain": "insur-info.ru",
    "url": "https://www.insur-info.ru/press/213927/",
    "publication_date": "2026-09-04",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "techora-mass-internet-shutdown-september-6",
    "title": {
      "ru": "6 сентября: массовый сбой интернета в России — учения автономности Рунета",
      "en": "6 September: mass internet outage across Russia during Runet autonomy exercises"
    },
    "domain": "techora.ru",
    "url": "https://techora.ru/news/6-sentyabrya-massovyy-sboy-interneta-v-2026-09-06",
    "publication_date": "2026-09-06",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "news-ru-mobile-internet-september-6",
    "title": {
      "ru": "Почему не работает мобильный интернет 6 сентября: причины сбоев в России",
      "en": "Why mobile internet is down on 6 September: causes of outages in Russia"
    },
    "domain": "news.ru",
    "url": "https://news.ru/society/pochemu-ne-rabotaet-mobilnyj-internet-6-sentyabrya-prichiny-sboi-v-rossii",
    "publication_date": "2026-09-06",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "zn-ua-south-korea-un-rf-dprk",
    "title": {
      "ru": "Южная Корея заявила в ООН, что сотрудничество между РФ и КНДР затягивает войну в Украине",
      "en": "South Korea tells UN that Russia-DPRK cooperation prolongs the war in Ukraine"
    },
    "domain": "zn.ua",
    "url": "https://zn.ua/war/juzhnaja-koreja-zajavila-v-oon-chto-sotrudnichestvo-mezhdu-rf-i-kndr-zatjahivaet-vojnu-v-ukraine.html",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "apostrophe-ua-south-korea-un-rf-dprk",
    "title": {
      "ru": "Россия и КНДР затягивают войну против Украины: заявление Южной Кореи в ООН",
      "en": "Russia and North Korea prolonging war against Ukraine: South Korea's statement at UN"
    },
    "domain": "apostrophe.ua",
    "url": "https://apostrophe.ua/ru/politics/foreign-policy/rossija-i-kndr-zatjahivajut-vojnu-protiv-ukrainy-zajavlenie-juzhnoj-korei-v-oon-.html",
    "publication_date": "2026-09-02",
    "accessed_date": "2026-09-26",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  }
];
})();
