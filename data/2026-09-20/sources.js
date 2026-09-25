window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.sources = [
  {
    "id": "www-kyivpost-com-post-84608",
    "title": {
      "ru": "ISW: оценка российского наступления, 15 сентября 2026",
      "en": "ISW Russian Offensive Campaign Assessment, September 15, 2026"
    },
    "domain": "kyivpost.com",
    "url": "https://www.kyivpost.com/post/84608",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "www-riga-lv-namejs-2026-active-phase",
    "title": {
      "ru": "16–20 сентября: активная фаза учений Namejs 2026 пройдёт в Риге",
      "en": "16–20 September: active phase of exercise Namejs 2026 will take place in Riga"
    },
    "domain": "riga.lv",
    "url": "https://www.riga.lv/en/article/16-20-september-active-phase-exercise-namejs-2026-will-take-place-riga-soldiers-military-vehicles-and-exercise-checkpoints-will-be-visible-across-city",
    "publication_date": "2026-09-16",
    "accessed_date": "2026-09-25",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "euromaidanpress-com-lithuania-exercises-12-municipalities",
    "title": {
      "ru": "Литва начала военные учения в 12 муниципалитетах на фоне проверок НАТО восточной границы",
      "en": "Lithuania launches military exercises across 12 municipalities as Russia keeps probing NATO's eastern border"
    },
    "domain": "euromaidanpress.com",
    "url": "https://euromaidanpress.com/2026/09/14/lithuania-launches-military-exercises-across-12-municipalities-as-russia-keeps-probing-natos-eastern-border/",
    "publication_date": "2026-09-14",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "spravzhne-media-gur-warehouse-zaporizhzhia",
    "title": {
      "ru": "ГУР уничтожило склад боеприпасов и горючего РФ в Запорожье",
      "en": "Ukrainian military intelligence destroys Russian ammunition and fuel depot in Zaporizhzhia"
    },
    "domain": "spravzhne.media",
    "url": "https://spravzhne.media/rus/war/1789900681-rossiyskiy-sklad-boepripasov-i-goryuchego-unichtozhili-na-zaporozhe",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-kyivpost-com-post-84787",
    "title": {
      "ru": "ISW: оценка российского наступления, 17 сентября 2026",
      "en": "ISW Russian Offensive Campaign Assessment, September 17, 2026"
    },
    "domain": "kyivpost.com",
    "url": "https://www.kyivpost.com/post/84787",
    "publication_date": "2026-09-18",
    "accessed_date": "2026-09-25",
    "source_type": "OSINT",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "abcnews-com-ukrainian-drones-moscow-refinery-136595832",
    "title": {
      "ru": "Украинские дроны и ракеты атаковали Москву и нефтеперерабатывающий завод, есть погибшие",
      "en": "Ukrainian drones and missiles target Moscow, oil refinery in deadly attack: officials"
    },
    "domain": "abcnews.com",
    "url": "https://abcnews.com/International/ukrainian-drones-target-moscow-oil-refinery-deadly-attack/story?id=136595832",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "lenta-ru-glavnoe-k-utru-20-sentyabrya",
    "title": {
      "ru": "Главное 20 сентября. Массированная атака дронов на Москву и область",
      "en": "Main news of 20 September: massed drone attack on Moscow and the region"
    },
    "domain": "lenta.ru",
    "url": "https://lenta.ru/twz/chto-proiskhodit/glavnoe-k-utru-20-sentyabrya.htm",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "24tv-ua-ataka-shahedov-16-sentjabrja",
    "title": {
      "ru": "Россия била по Украине дронами и ракетами: карта воздушных тревог",
      "en": "Russia struck Ukraine with drones and missiles: air-raid map"
    },
    "domain": "24tv.ua",
    "url": "https://24tv.ua/ru/ataka-shahedov-16-sentjabrja-2026-goda-kuda-letjat-drony-karta-trevog_n3143369",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "abcnews-com-houthi-rebels-seize-islands-136415608",
    "title": {
      "ru": "Хуситы захватили ключевые острова в южной части Красного моря, усилив контроль над судоходными путями",
      "en": "Yemen's Houthi rebels seize key islands in Red Sea, tighten grip on shipping routes"
    },
    "domain": "abcnews.com",
    "url": "https://abcnews.com/Business/wireStory/yemens-houthi-rebels-seize-key-islands-southern-red-136415608",
    "publication_date": "2026-09-14",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-svoboda-org-a-udary-rossii-vblizi-granits-poljshi",
    "title": {
      "ru": "Удары России вблизи границ Польши",
      "en": "Russian strikes near Poland's borders"
    },
    "domain": "svoboda.org",
    "url": "https://www.svoboda.org/a/udary-rossii-vblizi-granits-poljshi/33854008.html",
    "publication_date": "2026-09-14",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "ria-ru-lukashenko-check-readiness-2117062795",
    "title": {
      "ru": "Минск проведет проверку боеготовности армии, вплоть до мобилизации",
      "en": "Minsk to hold combat readiness checks of the army, up to mobilisation"
    },
    "domain": "ria.ru",
    "url": "https://ria.ru/20260911/lukashenko-2117062795.html",
    "publication_date": "2026-09-11",
    "accessed_date": "2026-09-25",
    "source_type": "primary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-reuters-com-north-korea-vice-defence-minister",
    "title": {
      "ru": "КНДР заявляет, что наращивание вооружений США оправдывает расширение ядерных сил",
      "en": "North Korea says US-led arms buildup justifies expanding nuclear force"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/business/aerospace-defense/north-korea-vice-defence-minister-says-us-arms-buildup-justifies-expanding-2026-09-17/",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-reuters-com-north-korea-rejects-iaea-resolution",
    "title": {
      "ru": "КНДР назвала ядерный статус «необратимым» после резолюции МАГАТЭ",
      "en": "North Korea says nuclear status 'irreversible' after UN watchdog resolution"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/world/asia-pacific/north-korea-rejects-iaea-resolution-doubles-down-nuclear-status-kim-jong-un-2026-09-18/",
    "publication_date": "2026-09-18",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "iz-ru-kndr-iadernoe-oruzhiie-2167943",
    "title": {
      "ru": "КНДР предупредила США и Южную Корею о возможном применении ядерного оружия",
      "en": "North Korea warns US and South Korea of possible nuclear weapon use"
    },
    "domain": "iz.ru",
    "url": "https://iz.ru/2167943/2026-09-16/kndr-predupredila-ssha-i-iuzhnuiu-koreiu-o-vozmozhnom-primenenii-iadernogo-oruzhiia",
    "publication_date": "2026-09-16",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-reuters-com-north-korea-fires-two-missiles",
    "title": {
      "ru": "КНДР выпустила две предположительно баллистические ракеты у восточного побережья",
      "en": "North Korea fires two suspected ballistic missiles off east coast within three hours"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/world/asia-pacific/north-korea-fires-missile-off-east-coast-yonhap-says-2026-09-20/",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "ria-ru-renkhap-ballistic-2118896646",
    "title": {
      "ru": "СМИ: ракета, запущенная КНДР в сторону Японского моря, была баллистической",
      "en": "Media: North Korean missile fired toward the Sea of Japan was ballistic"
    },
    "domain": "ria.ru",
    "url": "https://ria.ru/20260920/renkhap-2118896646.html",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-pravda-com-ua-eng-german-consulate-closes-8054035",
    "title": {
      "ru": "Генеральное консульство Германии в России закрылось навсегда",
      "en": "German Consulate General in Russia permanently closes"
    },
    "domain": "pravda.com.ua",
    "url": "https://www.pravda.com.ua/eng/news/2026/09/18/8054035/",
    "publication_date": "2026-09-18",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-dw-com-russia-closing-german-consulate-a-79149908",
    "title": {
      "ru": "Россия объявила о закрытии генерального консульства Германии в Санкт-Петербурге",
      "en": "Russia announces it is closing Germany's consulate in St. Petersburg"
    },
    "domain": "dw.com",
    "url": "https://www.dw.com/en/russia-announces-it-is-closing-germanys-consulate-in-st-petersburg/a-79149908",
    "publication_date": "2026-09-07",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-newindianexpress-com-iran-seven-conditions",
    "title": {
      "ru": "Иран выдвинул семь условий для переговоров с США через Катар и предупредил о «решающей войне»",
      "en": "Iran sets seven conditions for talks with US through Qatar, warns of decisive war if Trump rejects demands"
    },
    "domain": "newindianexpress.com",
    "url": "https://www.newindianexpress.com/world/2026/Sep/20/iran-sets-seven-conditions-for-talks-with-us-through-qatar-warns-of-decisive-war-if-trump-rejects-demands",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-presstv-co-uk-iran-conditions-776648",
    "title": {
      "ru": "Иран выдвинул 7 условий для выхода США из военной трясины",
      "en": "Iran sets 7 conditions for US to escape war quagmire"
    },
    "domain": "presstv.co.uk",
    "url": "https://www.presstv.co.uk/Detail/2026/09/20/776648/Iran-conditions-US-talks",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-reuters-com-eu-envoys-extend-russia-sanctions",
    "title": {
      "ru": "Послы ЕС продлили санкции против России на семь дней для обсуждения шестимесячного продления",
      "en": "EU envoys extend Russia sanctions by seven days to debate six-month renewal"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/world/europe/eu-envoys-extend-russia-sanctions-by-seven-days-debate-six-month-renewal-eu-2026-09-14/",
    "publication_date": "2026-09-14",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-euractiv-com-extend-russia-sanctions-oligarch-stand-off",
    "title": {
      "ru": "Страны ЕС продлили санкции против России на фоне нового спора об олигархе",
      "en": "EU countries extend Russia sanctions amid latest oligarch stand-off"
    },
    "domain": "euractiv.com",
    "url": "https://www.euractiv.com/news/eu-countries-extend-russia-sanctions-amid-latest-oligarch-stand-off/",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "mezha-net-evening-digest-14-veresnia",
    "title": {
      "ru": "Вечерний дайджест: Украина и мир — 14 сентября 2026",
      "en": "Evening Digest: Ukraine and the World — September 14, 2026"
    },
    "domain": "mezha.net",
    "url": "https://mezha.net/eng/news/vechirnii-daidzhest-ukraina-ta-svit-14-veresnia-2026/",
    "publication_date": "2026-09-14",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "lenta-ru-kreml-predlozhil-sdelku-peskov-dva-usloviya",
    "title": {
      "ru": "Кремль предложил сделку Западу и Украине: Песков выдвинул два условия",
      "en": "Kremlin unexpectedly offered a deal to the West and Ukraine: Peskov set two conditions"
    },
    "domain": "lenta.ru",
    "url": "https://lenta.ru/news/2026/09/15/long-kreml-neozhidanno-predlozhil-sdelku-zapadu-i-ukraine-peskov-vydvinul-dva-usloviya/",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-dw-com-ru-obmen-telami-a-79313703",
    "title": {
      "ru": "Украина и Россия вновь обменялись телами погибших военных",
      "en": "Ukraine and Russia exchange bodies of fallen soldiers again"
    },
    "domain": "dw.com",
    "url": "https://www.dw.com/ru/ukraina-i-rossia-vnov-obmenalis-telami-pogibsih-voennyh/a-79313703",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-rbc-ru-obmen-telami-17-09-2026",
    "title": {
      "ru": "Россия и Украина провели обмен телами погибших военнослужащих",
      "en": "Russia and Ukraine hold exchange of fallen service members' bodies"
    },
    "domain": "rbc.ru",
    "url": "https://www.rbc.ru/politics/17/09/2026/6aabb5e1bbf383b65c1f8e89",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-reuters-com-trump-signs-russia-sanctions-bill",
    "title": {
      "ru": "Трамп подписал закон о санкциях против России",
      "en": "Trump signs Russia sanctions bill into law"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/world/us/trump-signs-russia-sanctions-bill-into-law-2026-09-18/",
    "publication_date": "2026-09-18",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-dw-com-ru-zakon-grema-a-79335094",
    "title": {
      "ru": "Трамп подписал закон Грэма об «адских санкциях» против РФ",
      "en": "Trump signs Graham Act on 'hellish sanctions' against Russia"
    },
    "domain": "dw.com",
    "url": "https://www.dw.com/ru/tramp-podpisal-zakon-lindsi-grema-ob-adskih-sankciah-protiv-rossii/a-79335094",
    "publication_date": "2026-09-19",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-bloomberg-com-denmark-expedites-275-million",
    "title": {
      "ru": "Дания ускоряет пакет помощи Украине на $275 млн после инцидента с Россией",
      "en": "Denmark Expedites $275 Million Ukraine Aid After Russia Bust-Up"
    },
    "domain": "bloomberg.com",
    "url": "https://www.bloomberg.com/news/articles/2026-09-18/denmark-expedites-275-million-ukraine-aid-after-russia-bust-up",
    "publication_date": "2026-09-18",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "www-cbsnews-com-air-defense-sale-ukraine",
    "title": {
      "ru": "Госдеп одобрил возможную продажу Украине средств ПВО на $2,6 млрд",
      "en": "State Department approves potential sale of $2.6 billion in air defense equipment to Ukraine"
    },
    "domain": "cbsnews.com",
    "url": "https://www.cbsnews.com/news/us-ukraine-russia-war-air-defense-state-department/",
    "publication_date": "2026-09-19",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-garant-ru-ukaz-661-ot-17-09-2026",
    "title": {
      "ru": "Указ Президента РФ от 17 сентября 2026 г. № 661",
      "en": "Decree of the President of the Russian Federation No. 661 of 17 September 2026"
    },
    "domain": "garant.ru",
    "url": "https://www.garant.ru/products/ipo/prime/doc/414830418/",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "meduza-io-putin-auchan-nestle",
    "title": {
      "ru": "Путин передал во временное управление активы «Ашан» и Nestlé",
      "en": "Putin places Auchan and Nestlé assets under temporary management"
    },
    "domain": "meduza.io",
    "url": "https://meduza.io/news/2026/09/17/putin-peredal-vo-vremennoe-upravlenie-aktivy-ashan-i-nestle",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "ria-ru-medvedev-voennoe-sderzhivanie-2118722131",
    "title": {
      "ru": "Медведев призвал ответить на санкции США языком военного сдерживания",
      "en": "Medvedev calls for answering US sanctions with the language of military deterrence"
    },
    "domain": "ria.ru",
    "url": "https://ria.ru/20260919/medvedev-2118722131.html",
    "publication_date": "2026-09-19",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-aa-com-tr-medvedev-voennoe-sderzhivanie-4061817",
    "title": {
      "ru": "Экс-президент РФ предложил ответить на «адские санкции» США языком военного сдерживания",
      "en": "Ex-president of Russia proposes answering US 'hellish sanctions' with language of military deterrence"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/ru/%D0%BC%D0%B8%D1%80/%D1%8D%D0%BA%D1%81-%D0%BF%D1%80%D0%B5%D0%B7%D0%B8%D0%B4%D0%B5%D0%BD%D1%82-%D1%80%D1%84-%D0%BF%D1%80%D0%B5%D0%B4%D0%BB%D0%BE%D0%B6%D0%B8%D0%BB-%D0%BE%D1%82%D0%B2%D0%B5%D1%82%D0%B8%D1%82%D1%8C-%D0%BD%D0%B0-%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B5-%D1%81%D0%B0%D0%BD%D0%BA%D1%86%D0%B8%D0%B8-%D1%81%D1%88%D0%B0-%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%BC-%D0%B2%D0%BE%D0%B5%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE-%D1%81%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F/4061817",
    "publication_date": "2026-09-19",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-interfax-ru-cik-ddos-1117223",
    "title": {
      "ru": "Глава ЦИК РФ сообщила о более чем тысяче волн DDoS-атак на инфраструктуру в избирательном процессе",
      "en": "Head of Russian Central Election Commission reports over a thousand waves of DDoS attacks on election infrastructure"
    },
    "domain": "interfax.ru",
    "url": "https://www.interfax.ru/russia/1117223",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "primary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "therecord-media-russia-cyberattacks-during-election",
    "title": {
      "ru": "В России сообщают о тысячах кибератак на избирательную инфраструктуру во время голосования",
      "en": "Russia reports thousands of cyberattacks on election infrastructure during vote"
    },
    "domain": "therecord.media",
    "url": "https://therecord.media/russia-reports-cyberattacks-during-election",
    "publication_date": "2026-09-21",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "dfrlab-org-storm-1516-baltic-states",
    "title": {
      "ru": "Операция Storm-1516 нацелена на прибалтийские государства",
      "en": "Storm-1516 operation targets the Baltic states"
    },
    "domain": "dfrlab.org",
    "url": "https://dfrlab.org/2026/09/17/storm-1516-operation-targets-the-baltic-states/",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "www-pravda-com-ua-rus-litva-gibridnye-ataki-8054030",
    "title": {
      "ru": "Литва подтвердила данные Польши о подготовке Россией гибридных атак против союзников Украины",
      "en": "Lithuania confirms Polish reports of Russia preparing hybrid attacks against Ukraine's allies"
    },
    "domain": "pravda.com.ua",
    "url": "https://www.pravda.com.ua/rus/news/2026/09/18/8054030/",
    "publication_date": "2026-09-18",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "unn-ua-donetsk-evacuation-zone",
    "title": {
      "ru": "В Донецкой области расширили зону принудительной эвакуации детей",
      "en": "Forced evacuation zone for children expanded in Donetsk region"
    },
    "domain": "unn.ua",
    "url": "https://unn.ua/ru/news/v-donetskoi-oblasti-rasshirili-zonu-prinuditelnoi-evakuatsii-detei",
    "publication_date": "2026-09-16",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "eng-lsm-lv-namejs-drills-riga-a663399",
    "title": {
      "ru": "Учения Namejs проходят в Риге и её окрестностях",
      "en": "Namejs military drills taking place in and around Rīga"
    },
    "domain": "eng.lsm.lv",
    "url": "https://eng.lsm.lv/article/society/defence/16.09.2026-namejs-military-drills-taking-place-in-and-around-riga.a663399/",
    "publication_date": "2026-09-16",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-reuters-com-kim-vows-expand-ties-russia",
    "title": {
      "ru": "Ким Чен Ын пообещал расширить связи с Россией и поддержать победу в «священной войне»",
      "en": "North Korea's Kim vows to expand ties with Russia, backs victory in 'sacred war'"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/world/asia-pacific/north-koreas-kim-vows-expand-ties-with-russia-backs-victory-sacred-war-2026-09-14/",
    "publication_date": "2026-09-14",
    "accessed_date": "2026-09-25",
    "source_type": "primary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "apostrophe-ua-korea-30-50-tys-soldat",
    "title": {
      "ru": "Северная Корея отправила в Россию от 30 до 50 тыс. солдат",
      "en": "North Korea sent 30 to 50 thousand soldiers to Russia"
    },
    "domain": "apostrophe.ua",
    "url": "https://apostrophe.ua/ru/world/obuchajutsja-rabotajut-s-dronami-severnaja-koreja-otpravila-v-rossiju-ot-30-do-50-tys-soldat.html",
    "publication_date": "2026-09-17",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-thehindu-com-saudi-houthi-ballistic-article71486051",
    "title": {
      "ru": "Саудовская Аравия подтвердила: хуситы попытались атаковать её столицу баллистической ракетой",
      "en": "Saudi Arabia confirms Yemen's Houthi rebels tried to attack its capital with ballistic missile"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/saudi-arabia-confirms-yemens-houthi-rebels-tried-to-attack-its-capital-with-ballistic-missile/article71486051.ece",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-jpost-com-houthis-aramco-riyadh-909128",
    "title": {
      "ru": "Хуситы заявили об ударах по объекту Saudi Aramco и Эр-Рияду ракетами и дронами",
      "en": "Houthis claim to have struck Saudi Aramco facility, Riyadh with missiles, drones"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/article-909128",
    "publication_date": "2026-09-19",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-middleeasteye-net-houthis-riyadh-yanbu",
    "title": {
      "ru": "Хуситы заявляют об ударах по Эр-Рияду и Янбу, саудовская коалиция сообщает об отражении атак",
      "en": "Houthis claim strikes on Riyadh, Yanbu while Saudi coalition says attacks thwarted"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/news/houthis-claim-strikes-riyadh-yanbu-while-saudi-coalition-says-attacks-thwarted",
    "publication_date": "2026-09-19",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-aa-com-tr-houthis-saudi-capital-4062167",
    "title": {
      "ru": "Хуситы заявили о ракетно-дроновых атаках на саудовскую столицу",
      "en": "Yemen's Houthis claim missile, drone attacks on Saudi capital"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/yemen-s-houthis-claim-missile-drone-attacks-on-saudi-capital/4062167",
    "publication_date": "2026-09-19",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-vedomosti-ru-diesel-export-ban-1229127",
    "title": {
      "ru": "Правительство продлит запрет на экспорт дизтоплива для производителей до ноября",
      "en": "Government to extend ban on diesel fuel exports for producers until November"
    },
    "domain": "vedomosti.ru",
    "url": "https://www.vedomosti.ru/business/articles/2026/09/15/1229127-pravitelstvo-prodlit-zapret",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-interfax-ru-diesel-export-ban-1116328",
    "title": {
      "ru": "СМИ сообщили о планах продлить запрет экспорта дизтоплива для производителей до ноября",
      "en": "Media report plans to extend ban on diesel exports for producers until November"
    },
    "domain": "interfax.ru",
    "url": "https://www.interfax.ru/business/1116328",
    "publication_date": "2026-09-16",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "www-reuters-com-london-marine-insurers-black-sea",
    "title": {
      "ru": "Лондонские морские страховщики расширили высокорисковую зону в Чёрном море на фоне всплеска атак на суда",
      "en": "London's marine insurers widen Black Sea high risk zone as shipping attacks surge"
    },
    "domain": "reuters.com",
    "url": "https://www.reuters.com/business/londons-marine-insurers-widen-black-sea-high-risk-zone-shipping-attacks-surge-2026-09-18/",
    "publication_date": "2026-09-18",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-rbc-ru-400-flights-delayed-20-09-2026",
    "title": {
      "ru": "Более 400 рейсов задержали в московских аэропортах из-за атаки беспилотников",
      "en": "Over 400 flights delayed at Moscow airports due to drone attack"
    },
    "domain": "rbc.ru",
    "url": "https://www.rbc.ru/politics/20/09/2026/6aaf7792201b0189cffa7df7",
    "publication_date": "2026-09-20",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-kommersant-ru-sulfuric-acid-export-ban-8954462",
    "title": {
      "ru": "Правительство запретило экспорт серной кислоты до конца года",
      "en": "Government bans sulfuric acid exports until end of year"
    },
    "domain": "kommersant.ru",
    "url": "https://www.kommersant.ru/doc/8954462",
    "publication_date": "2026-09-14",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "www-interfax-ru-sulfuric-acid-ban-1116026",
    "title": {
      "ru": "РФ запретила экспорт серной кислоты до конца года",
      "en": "Russia bans sulfuric acid exports until end of year"
    },
    "domain": "interfax.ru",
    "url": "https://www.interfax.ru/business/1116026",
    "publication_date": "2026-09-14",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "news-ru-mobilnyj-internet-15-sentyabrya",
    "title": {
      "ru": "Почему не работает мобильный интернет 15 сентября: причины сбоев в России",
      "en": "Why mobile internet is down on 15 September: causes of outages in Russia"
    },
    "domain": "news.ru",
    "url": "https://news.ru/society/pochemu-ne-rabotaet-mobilnyj-internet-15-sentyabrya-prichiny-sboi-v-rossii",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "incidentia-ru-mobilnyy-internet-ogranichili",
    "title": {
      "ru": "Мобильный интернет в России ограничили из-за угрозы беспилотников",
      "en": "Mobile internet restricted in Russia due to drone threat"
    },
    "domain": "incidentia.ru",
    "url": "https://incidentia.ru/news/mobilnyy-internet-v-rossii-ogranichili-iz-2026-09-15",
    "publication_date": "2026-09-15",
    "accessed_date": "2026-09-25",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "airlive-net-gps-jamming-sweden-2026-09-18",
    "title": {
      "ru": "Несколько рейсов сообщили о GPS-постановке помех над Швецией за последние сутки",
      "en": "Multiple flights reported GPS jamming over Sweden in the past 24 hours"
    },
    "domain": "airlive.net",
    "url": "https://airlive.net/news/2026/09/18/multiple-flights-reported-gps-jamming-over-sweden-in-the-past-24-hours/",
    "publication_date": "2026-09-18",
    "accessed_date": "2026-09-25",
    "source_type": "OSINT",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  }
];
})();
