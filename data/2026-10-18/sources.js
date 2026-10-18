window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.sources = [
  {
    "id": "aljazeera-egypt-saudi-help",
    "title": {
      "ru": "Саудовская коалиция перехватывает дроны, Египет взвешивает помощь",
      "en": "Saudi-led coalition intercepts drones as Egypt weighs sending help"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/17/saudi-led-coalition-intercepts-drones-as-egypt-weighs-sending-help",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "guardian-uae-yemen-reentry",
    "title": {
      "ru": "ОАЭ договорились с Саудовской Аравией о возвращении в конфликт в Йемене",
      "en": "UAE agrees with Saudi Arabia to re-enter Yemen conflict amid Houthi gains"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/17/uae-yemen-conflict-agreement-saudi-arabia-houthi-gains",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-iraq-pmf-ammo-blast",
    "title": {
      "ru": "5 пострадавших при взрыве боеприпасов на базе Сил народной мобилизации в Ираке",
      "en": "5 injured in ammunition blast at Iraq's Popular Mobilization Forces base"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/5-injured-in-ammunition-blast-at-iraqs-popular-mobilization-forces-base/4092325",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-air-defense-riyadh",
    "title": {
      "ru": "Европе сложно поставлять больше систем ПВО в Эр-Рияд — газета",
      "en": "Europe has difficulties with supplying more air defense systems to Riyadh — newspaper"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2203601",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aljazeera-hormuz-tankers-mines",
    "title": {
      "ru": "Иран сообщает: два танкера загорелись после подрыва на минах в Ормузском проливе",
      "en": "Iran says two tankers catch fire after hitting mines in Strait of Hormuz"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/10/18/iran-says-two-tankers-catch-fire-after-hitting-mines-in-strait-of-hormuz",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aljazeera-st-petersburg-drone-swarm",
    "title": {
      "ru": "Санкт-Петербург под атакой роя украинских дронов",
      "en": "St Petersburg under attack from Ukrainian drone swarm"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/st-petersburg-under-attack-from-ukrainian-drone-swarm",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-leningrad-largest-drone-attack",
    "title": {
      "ru": "Атака дронов на Ленинградскую область — одна из крупнейших за четыре года",
      "en": "Drone attack on Leningrad Region one of largest in four years"
    },
    "domain": "tass.com",
    "url": "https://tass.com/emergencies/2203667",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "tass-dobropolye-drone-crews",
    "title": {
      "ru": "Удары России уничтожили половину из почти 500 украинских расчётов дронов под Добропольем",
      "en": "Russian strikes destroy half of nearly 500 Ukrainian drone crews near Dobropolye"
    },
    "domain": "tass.com",
    "url": "https://tass.com/defense/2203653",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "jpost-iran-irgc-high-alert",
    "title": {
      "ru": "Санкции сжимают иранскую экономику; КСИР приведён в повышенную готовность из-за рисков беспорядков",
      "en": "Sanctions strangle Iranian economy as IRGC goes on high alert over civil unrest risks"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/iran-news/article-911995",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "almonitor-trump-pickaxe-mountain",
    "title": {
      "ru": "Окно дипломатии с Ираном может закрываться: Трамп снова угрожает объекту Пик-Моунтин",
      "en": "Window for diplomacy with Iran may be closing as Trump again threatens Pickaxe Mountain"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/10/window-diplomacy-iran-may-be-closing-trump-again-threatens-pickaxe-mountain",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tass-ukraine-checkmate",
    "title": {
      "ru": "Российский посланник называет ситуацию вокруг Украины «мат»",
      "en": "Russian presidential envoy describes situation around Ukraine as checkmate"
    },
    "domain": "tass.com",
    "url": "https://tass.com/politics/2203539",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "ria-prison-military-clothing",
    "title": {
      "ru": "В российских колониях заключённые производят одежду для бойцов СВО",
      "en": "In Russian colonies inmates produce clothing for SMO soldiers"
    },
    "domain": "ria.ru",
    "url": "https://ria.ru/20261018/svo-2125201970.html",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-lng-tanker-attacked-yemen",
    "title": {
      "ru": "Малый катер открыл огонь по СПГ-танкеру у берегов Йемена — морское агентство Британии",
      "en": "Small boat approaches, opens fire on LNG tanker off Yemen's coast, UK maritime agency says"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/small-boat-approaches-opens-fire-on-lng-tanker-off-yemen-s-coast-uk-maritime-agency-says/4092086",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "almonitor-egypt-sisi-saudi-defence",
    "title": {
      "ru": "Сиси просит парламент одобрить помощь в защите Саудовской Аравии по запросу",
      "en": "Egypt's Sisi seeks parliament's backing to help defend Saudi Arabia if asked"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/10/egypts-sisi-seeks-parliaments-backing-help-defend-saudi-arabia-if-asked",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-france-protests",
    "title": {
      "ru": "Погромы и более 1200 задержанных: полиция столкнулась с протестующими по всей Франции",
      "en": "Buildings set ablaze and more than 1,200 arrested as police clash with protesters across France"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/17/protests-france-high-prices-social-security-gilets-jaunes",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tasnimnews-eslami-nuclear-threat-2026-10-12",
    "title": {
      "ru": "Ислами осудил ядерную угрозу США против Ирана",
      "en": "Eslami Condemns US Nuclear Threat against Iran"
    },
    "domain": "tasnimnews.ir",
    "url": "https://tasnimnews.ir/en/news/2026/10/12/3720781/eslami-condemns-us-nuclear-threat-against-iran",
    "publication_date": "2026-10-12",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "arabtimesonline-trump-rules-out-nuclear-2026-10-16",
    "title": {
      "ru": "Трамп исключил применение ядерного оружия против Ирана, но удар по Pickaxe Mountain остаётся возможным",
      "en": "Trump Rules Out Nuclear Weapons Against Iran, But Pickaxe Mountain Strike Remains Possible"
    },
    "domain": "arabtimesonline.com",
    "url": "https://www.arabtimesonline.com/news/trump-rules-out-nuclear-weapons-against-iran-but-pickaxe-mountain-strike-remains-possible/",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tass-nuclear-zero-postnikov-2026-10-17",
    "title": {
      "ru": "Россия считает идею «короткого пути к ядерному нулю» контрпродуктивной — дипломат Постников",
      "en": "Russia views idea of shortcut to 'nuclear zero' as counterproductive — diplomat Postnikov"
    },
    "domain": "tass.com",
    "url": "https://tass.com/politics/2203555",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "primary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "forcesnews-steadfast-noon-italy-2026-10-13",
    "title": {
      "ru": "Единство и решимость: ядерные учения НАТО Steadfast Noon начались в Италии",
      "en": "Unity and resolve: NATO's nuclear exercise Steadfast Noon begins in Italy"
    },
    "domain": "forcesnews.com",
    "url": "https://www.forcesnews.com/nato/unity-and-resolve-natos-nuclear-exercise-steadfast-noon-begins-italy",
    "publication_date": "2026-10-13",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "channelnewsasia-nk-slcms-2026-10-14",
    "title": {
      "ru": "КНДР испытала два типа стратегических крылатых ракет подводного базирования",
      "en": "North Korea test-fires two types of submarine-launched strategic cruise missiles"
    },
    "domain": "channelnewsasia.com",
    "url": "https://www.channelnewsasia.com/east-asia/north-korea-tests-submarine-launched-strategic-cruise-missiles-6460706",
    "publication_date": "2026-10-14",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "rt-english-russian-submarine-drill-2026-10-15",
    "title": {
      "ru": "Российская атомная подлодка отработала ракетные стрельбы",
      "en": "Russian nuclear submarine conducts missile firing drill"
    },
    "domain": "rt-english.com",
    "url": "https://rt-english.com/russia/647240-russian-submarine-fire-drill",
    "publication_date": "2026-10-15",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "yahoo-trump-nuclear-bomb-iran-2026-10-16",
    "title": {
      "ru": "Трамп исключил применение ядерной бомбы против Ирана: почему это важно",
      "en": "Trump rules out using a nuclear bomb on Iran: Why that matters"
    },
    "domain": "yahoo.com",
    "url": "https://www.yahoo.com/news/politics/articles/trump-rules-using-nuclear-bomb-102112946.html",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "samaa-trump-nuclear-strike-2026-10-15",
    "title": {
      "ru": "Трамп исключил ядерный удар, Пезешкиан заявил, что Иран не сдастся",
      "en": "Trump rules out nuclear strike, Pezeshkian says Iran won't surrender"
    },
    "domain": "samaa.tv",
    "url": "https://www.samaa.tv/2087358549-trump-rules-out-nuclear-strike-pezeshkian-says-iran-won-t-surrender",
    "publication_date": "2026-10-15",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "nypost-nato-warns-russia-2026-10-13",
    "title": {
      "ru": "НАТО предупреждает Россию: «мы сломаем» силы и уничтожим «всё и вся» при нападении",
      "en": "NATO warns Russia: 'We will break' forces, destroy 'anything and everything' if you attack"
    },
    "domain": "nypost.com",
    "url": "https://nypost.com/2026/10/13/world-news/nato-warns-russia-we-will-break-forces-destroy-anything-and-everything-if-you-attack/",
    "publication_date": "2026-10-13",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "theweek-iran-counter-us-attack-2026-10-14",
    "title": {
      "ru": "Так Иран готовится отражать атаку США: «захваченные или убитые»",
      "en": "This is how Iran prepares to counter US attack: 'Boots on the ground'"
    },
    "domain": "theweek.in",
    "url": "https://www.theweek.in/news/middle-east/2026/10/14/this-is-how-iran-prepares-to-counter-us-attack-captured-or-killed.html",
    "publication_date": "2026-10-14",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "brusselstimes-eu-sanctions-1569-2026-10-12",
    "title": {
      "ru": "Крупнейший пакет санкций ЕС: 1 569 записей в военном чёрном списке России",
      "en": "Largest EU sanctions package yet adds 1,569 to Russia military blacklist"
    },
    "domain": "brusselstimes.com",
    "url": "https://www.brusselstimes.com/2357495/largest-eu-sanctions-package-yet-adds-1569-to-russia-military-blacklist",
    "publication_date": "2026-10-12",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "iranwire-us-sanctions-iran-2026-10-15",
    "title": {
      "ru": "США атакуют иранские офшорные банки и нефтяные сети новым раундом санкций",
      "en": "US Targets Iranian-Linked Offshore Banks and Oil Networks in New Sanctions Round"
    },
    "domain": "iranwire.com",
    "url": "https://iranwire.com/en/features/158950-us-targets-iranian-linked-offshore-banks-and-oil-networks-in-new-sanctions-round/",
    "publication_date": "2026-10-15",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "trtworld-lebanon-israel-talks-2026-10-17",
    "title": {
      "ru": "Ливан примет участие в трёхсторонних переговорах с Израилем при поддержке США — Аун",
      "en": "Lebanon to take part in US-backed trilateral talks with Israel: Aoun"
    },
    "domain": "trtworld.com",
    "url": "https://www.trtworld.com/article/c2841d38185a",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tehrantimes-lavrov-tehran-2026-10-17",
    "title": {
      "ru": "Лавров посетит Тегеран в понедельник для переговоров с Арагчи",
      "en": "Lavrov to visit Tehran on Monday for talks with Araghchi"
    },
    "domain": "tehrantimes.com",
    "url": "https://www.tehrantimes.com/news/531178/Lavrov-to-visit-Tehran-on-Monday-for-talks-with-Araghchi",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "straitstimes-pope-putin-ceasefire-2026-10-16",
    "title": {
      "ru": "Из больницы папа Римский призвал Путина к прекращению огня в спорном городе Украины",
      "en": "From hospital, Pope Leo pushes Putin for ceasefire in contested Ukraine city"
    },
    "domain": "straitstimes.com",
    "url": "https://www.straitstimes.com/world/europe/from-hospital-pope-leo-pushes-putin-for-ceasefire-in-contested-ukraine-city",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-houthis-release-159-2026-10-17",
    "title": {
      "ru": "Хуситы Йемена освободили 159 задержанных в Сане — МККК",
      "en": "Yemen's Houthis release 159 detainees in Sanaa: ICRC"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/yemen-s-houthis-release-159-detainees-in-sanaa-icrc/4092084",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "middleeasteye-houthis-release-159-2026-10-17",
    "title": {
      "ru": "Хуситы освободили 159 человек по амнистии под наблюдением МККК",
      "en": "Houthis release 159 people under an amnesty under ICRC watch"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/houthis-release-159-people-under-amnesty-under-icrc-watch",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "safety4sea-eu-sanctions-russia-2026-10-13",
    "title": {
      "ru": "ЕС принял крупнейший в истории пакет санкций против России",
      "en": "EU adopts largest-ever sanctions package targeting Russia"
    },
    "domain": "safety4sea.com",
    "url": "https://safety4sea.com/eu-adopts-largest-ever-sanctions-package-targeting-russia/",
    "publication_date": "2026-10-13",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "theepochtimes-eu-china-trade-2026-10-16",
    "title": {
      "ru": "ЕС ищет новые торговые полномочия на фоне расширения дефицита с Китаем",
      "en": "EU Seeks New Trade Powers as Deficit With China Widens"
    },
    "domain": "theepochtimes.com",
    "url": "https://www.theepochtimes.com/world/eu-seeks-new-trade-powers-as-deficit-with-china-widens-6105278",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "breakingdefense-hegseth-ausa-2026-10-14",
    "title": {
      "ru": "Хегсет на AUSA продвигает автономность и «поколенческие» оборонные инвестиции",
      "en": "Hegseth uses AUSA spotlight to push autonomy, 'generational' defense investment"
    },
    "domain": "breakingdefense.com",
    "url": "https://breakingdefense.com/2026/10/hegseth-uses-ausa-spotlight-to-highlight-autonomy-generational-defense-investment/",
    "publication_date": "2026-10-14",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aa-turkiye-defense-229-2026-10-16",
    "title": {
      "ru": "Турция увеличила закупки вооружений на 229 % в 2027 году",
      "en": "Türkiye raises defense equipment procurement by 229% in 2027"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/turkiye/turkiye-raises-defense-equipment-procurement-by-229-in-2027/4091132",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "breakingdefense-critical-minerals-2026-10-15",
    "title": {
      "ru": "На фоне приближения срока по критичным минералам армия США ожидает «некоторого влияния»",
      "en": "As critical mineral deadline looms, Army expects to feel 'some impact'"
    },
    "domain": "breakingdefense.com",
    "url": "https://breakingdefense.com/2026/10/as-critical-mineral-deadline-looms-army-expects-to-feel-some-impact/",
    "publication_date": "2026-10-15",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "businesstoday-my-china-rare-earth-eu-2026-10-15",
    "title": {
      "ru": "Китай требует взаимного сотрудничества ЕС по экспортным лицензиям на редкозёмы",
      "en": "China Seeks Reciprocal EU Cooperation On Rare Earth Export License"
    },
    "domain": "businesstoday.com.my",
    "url": "https://www.businesstoday.com.my/2026/10/15/china-seeks-reciprocal-eu-cooperation-on-rare-earth-export-license/",
    "publication_date": "2026-10-15",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "qatar-tribune-hormuz-tanker-mine-2026-10-17",
    "title": {
      "ru": "Второй нефтяной танкер горит в Ормузском проливе после подрыва на морской мине",
      "en": "Second oil tanker burns in Strait of Hormuz after hitting naval mine"
    },
    "domain": "qatar-tribune.com",
    "url": "https://www.qatar-tribune.com/article/259630/front/second-oil-tanker-burns-in-strait-of-hormuz-after-hitting-naval-mine",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "tbsnews-hormuz-tankers-mines-2026-10-17",
    "title": {
      "ru": "Два нефтяных танкера загорелись после подрыва на минах в Ормузском проливе — КСИР",
      "en": "Two oil tankers catch fire after striking mines in Strait of Hormuz: IRGC"
    },
    "domain": "tbsnews.net",
    "url": "https://www.tbsnews.net/worldbiz/middle-east/two-oil-tankers-catch-fire-after-striking-mines-strait-hormuz-irgc-1576151",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "eadaily-st-petersburg-oil-terminal-2026-10-18",
    "title": {
      "ru": "Нефтетерминал в Санкт-Петербурге загорелся после дроновой атаки",
      "en": "The oil terminal caught fire in St. Petersburg after the drone attack"
    },
    "domain": "eadaily.com",
    "url": "https://eadaily.com/en/news/2026/10/18/the-oil-terminal-caught-fire-in-st-petersburg-after-the-drone-attack",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": false
  },
  {
    "id": "cnn-trump-waives-russia-sanctions-2026-10-16",
    "title": {
      "ru": "Трамп отсрочил санкции против России до их вступления в силу, вызвав критику",
      "en": "Trump waives Russia-related sanctions before they kick in, prompting backlash"
    },
    "domain": "cnn.com",
    "url": "https://www.cnn.com/2026/10/16/europe/us-ukraine-russia-sanctions-intl-hnk",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "firstpost-india-us-trade-deal-2026-10-15",
    "title": {
      "ru": "Сделка Индии и США: первая фаза завершена, идёт юридическая проработка",
      "en": "India-US trade deal: First phase finalised, legal drafting underway"
    },
    "domain": "firstpost.com",
    "url": "https://www.firstpost.com/business/findia-us-trade-deal-first-phase-finalised-legal-drafting-underway-14053110.html",
    "publication_date": "2026-10-15",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "cnbctv18-brent-110-explained-2026-10-16",
    "title": {
      "ru": "Объяснение: почему Brent впервые превысил $110",
      "en": "Explained: What led to Brent crude prices crossing $110 for the first time"
    },
    "domain": "cnbctv18.com",
    "url": "https://www.cnbctv18.com/market/commodities/crude-oil-prices-brent-wti-why-are-rates-rising-explained-saudi-houthis-hormuz-iran-us-russia-ukraine-20013997.htm",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "discoveryalert-brent-110-2026-10-17",
    "title": {
      "ru": "Нефть Brent достигла $110: риски Ормуза, Саудовской Аравии и России накапливаются",
      "en": "Brent Oil Price Hits $110 as Hormuz, Saudi and Russia Risks Stack Up"
    },
    "domain": "discoveryalert.com",
    "url": "https://discoveryalert.com/news/brent-oil-price-110-hormuz-saudi-russia-october-2026/",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false
  },
  {
    "id": "mee-tugboat-uae-ukmto",
    "title": {
      "ru": "Один пострадавший: снаряды попали в буксир у берегов ОАЭ, сообщает UKMTO",
      "en": "One injured as projectiles hit tugboat off UAE coast, UKMTO says"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/one-injured-projectiles-hit-tugboat-uae-coast-ukmto-says",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "guardian-settlers-eu-diplomats",
    "title": {
      "ru": "Израильские поселенцы напали на европейских дипломатов на Западном берегу",
      "en": "Israeli settlers attack European diplomats in West Bank"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/oct/17/israeli-settlers-attack-european-diplomats-in-west-bank",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-taiz-siege-airstrikes",
    "title": {
      "ru": "Силы во главе с Саудовской Аравией авиаударами пытаются снять осаду Таиза хуситами",
      "en": "Saudi-led forces try to break Houthi siege of Taiz with airstrikes"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/saudi-led-forces-try-to-break-houthi-siege-of-taiz-with-airstrikes",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "unicef-gaza-340-children-ceasefire",
    "title": {
      "ru": "Газа: 340 детей погибли несмотря на соглашение о прекращении огня — ЮНИСЕФ",
      "en": "Gaza: 340 children killed despite ceasefire agreement - UNICEF"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/feed/view/en/story/2026/10/1168611",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "tass-zaporizhzhia-npp-drone-ceasefire",
    "title": {
      "ru": "Активность украинских беспилотников у Запорожской АЭС и Энергодара сохраняется несмотря на перемирие",
      "en": "Ukrainian drone activity near Zaporozhye NPP, Energodar persists despite ceasefire"
    },
    "domain": "tass.com",
    "url": "https://tass.com/economy/2203639",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "aa-lebanon-israel-us-talks",
    "title": {
      "ru": "Ливан примет участие в трёхсторонних переговорах с Израилем при поддержке США 20 октября — президент",
      "en": "Lebanon to take part in US-backed trilateral talks with Israel on Oct. 20, president says"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/lebanon-to-take-part-in-us-backed-trilateral-talks-with-israel-on-oct-20-president-says/4092254",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "mee-araghchi-hormuz-proposal",
    "title": {
      "ru": "Арагчи: Иран представил «конкретное» предложение о разблокировке Ормузского пролива",
      "en": "Araghchi says Iran has presented 'concrete' Hormuz reopening proposal"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/araghchi-says-iran-has-presented-concrete-hormuz-reopening-proposal",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "iaea-update-371-ukraine",
    "title": {
      "ru": "Обновление 371 — заявление генерального директора МАГАТЭ о ситуации в Украине",
      "en": "Update 371 - IAEA Director General Statement on Situation in Ukraine"
    },
    "domain": "iaea.org",
    "url": "https://www.iaea.org/newscenter/pressreleases/update-371-iaea-director-general-statement-on-situation-in-ukraine",
    "publication_date": "2026-10-16",
    "accessed_date": "2026-10-18",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": false
  },
  {
    "id": "mee-kpler-tanker-crisis",
    "title": {
      "ru": "Смягчение санкций США вряд ли ослабит кризис танкеров, считает Kpler",
      "en": "US sanctions relief unlikely to ease tanker crisis, Kpler says"
    },
    "domain": "middleeasteye.net",
    "url": "https://www.middleeasteye.net/live-blog/live-blog-update/us-sanctions-relief-unlikely-ease-tanker-crisis-kpler-says",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false
  },
  {
    "id": "aljazeera-settlers-eu-diplomats-video",
    "title": {
      "ru": "Израильские поселенцы напали на европейских дипломатов на оккупированном Западном берегу",
      "en": "Israeli settlers attack European diplomats in the occupied West Bank"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/israeli-settlers-attack-european-diplomats-in-the-occupied-west-bank",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true
  },
  {
    "id": "lithuania-drone-xinhua",
    "title": {
      "ru": "Латвия сняла воздушную тревогу в трёх самоуправлениях",
      "en": "Latvia lifts air threat alert for 3 municipalities"
    },
    "domain": "english.news.cn",
    "url": "https://english.news.cn/20261018/6ac1ff5d597c49b3925eae495974b62c/c.html",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "notes": "Тревога в Латвии объявлена после обнаружения неопознанного объекта в балтийском воздушном пространстве."
  },
  {
    "id": "lithuania-drone-yahoo",
    "title": {
      "ru": "Литва сообщила о повреждениях после входа неопознанного дрона в воздушное пространство",
      "en": "Lithuania reports damage caused by unidentified drone that entered its airspace"
    },
    "domain": "yahoo.com",
    "url": "https://www.yahoo.com/news/world/articles/lithuania-reports-damage-caused-unidentified-110000268.html",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Дрон вошёл в воздушное пространство Литвы, объявлена тревога, закрыт аэропорт Каунаса."
  },
  {
    "id": "moldova-drones-fakti",
    "title": {
      "ru": "Пять российских дронов упали в Молдове менее чем за сутки",
      "en": "Five Russian drones crashed in Moldova in less than 24 hours"
    },
    "domain": "fakti.bg",
    "url": "https://fakti.bg/en/world/1091179-pet-ruski-drona-padnaha-v-moldova-za-po-malko-ot-denonoshtie",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Падение дронов на территории Молдовы — пограничный инцидент, связанный с ударами по Украине."
  },
  {
    "id": "sudan-nyala-anadolu",
    "title": {
      "ru": "Удары суданской армии нанесли тяжёлые потери RSF в Ньяле (Дарфур) — региональные власти",
      "en": "Sudanese army strikes inflict heavy losses on RSF in Darfur's Nyala: Regional government"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/sudanese-army-strikes-inflict-heavy-losses-on-rsf-in-darfur-s-nyala-regional-government/4092539",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "notes": "Боевые действия в Дарфуре: удары по позициям RSF в Ньяле."
  },
  {
    "id": "sudan-kordofan-tamazuj",
    "title": {
      "ru": "Дроны ударили по кустарному золотому прииску в Южном Кордофане",
      "en": "Drones hit gold mining site in South Kordofan"
    },
    "domain": "radiotamazuj.org",
    "url": "https://www.radiotamazuj.org/en/news/article/drones-hit-gold-mining-site-in-south-kordofan",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "E-field-osint",
    "state_affiliated": false,
    "notes": "Удар дронов по прииску в Южном Кордофане — продолжение боевых действий в Судане."
  },
  {
    "id": "pakistan-afghan-clash-moneycontrol",
    "title": {
      "ru": "Пакистан и афганские талибы обменялись тяжёлым огнём на линии Дюранда: 7 военных убиты",
      "en": "Pakistan, Afghan Taliban exchange heavy fire along Durand Line; 7 soldiers killed amid fresh tensions"
    },
    "domain": "moneycontrol.com",
    "url": "https://www.moneycontrol.com/world/2-pakistan-afghan-taliban-exchange-heavy-fire-along-durand-line-7-soldiers-killed-amid-fresh-tensions-article-14054587.html",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Пограничный бой на линии Дюранда — пограничный инцидент с боевыми потерями."
  },
  {
    "id": "pakistan-balochistan-arabnews",
    "title": {
      "ru": "Пакистан сообщил о восьми уничтоженных боевиках в Белуджистане",
      "en": "Pakistan says eight militants killed in operations in restive Balochistan province"
    },
    "domain": "arabnews.pk",
    "url": "https://www.arabnews.pk/pakistan/pakistan-says-eight-militants-killed-in-operations-in-restive-balochistan-province-3004523",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Контртеррористические операции в Белуджистане в отчётном окне."
  },
  {
    "id": "pakistan-iran-trade-arabnews",
    "title": {
      "ru": "Пакистан приостановил торговлю с Ираном из-за проблем безопасности: тысячи контейнеров застряли",
      "en": "Pakistan suspends trade with Iran over security concerns, stranding thousands of containers"
    },
    "domain": "arabnews.pk",
    "url": "https://www.arabnews.pk/pakistan/pakistan-suspends-trade-with-iran-over-security-concerns-stranding-thousands-of-containers-3004477",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Приостановка трансграничной торговли и закрытие КПП — риск транспортного канала."
  },
  {
    "id": "pakistan-iran-border-minutemirror",
    "title": {
      "ru": "Торговля Пакистана и Ирана остановлена — КПП Тафтан закрыт",
      "en": "Pakistan-Iran trade halted as Taftan border shuts"
    },
    "domain": "minutemirror.com.pk",
    "url": "https://minutemirror.com.pk/pakistan-iran-trade-halted-as-taftan-border-shuts-646723/",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Закрытие КПП Тафтан останавливает грузопоток между Пакистаном и Ираном."
  },
  {
    "id": "schmidt-dodik-6yka",
    "title": {
      "ru": "Шмидт предупреждает: Додик может попытаться отделить Республику Сербскую — территориальная целостность БиГ не обсуждается",
      "en": "Schmidt warns: Dodik could attempt secession of Republika Srpska - Bosnia's territorial integrity is not up for discussion"
    },
    "domain": "6yka.com",
    "url": "https://6yka.com/bih/schmidt-upozorava-dodik-bi-mogao-pokusati-otcjepljenje-srpske-teritorijalni-integritet-bih-nije-na-diskusiji/",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Высокий представитель предупреждает о попытке отделения Республики Сербской — ультимативное предупреждение."
  },
  {
    "id": "rubio-central-asia-usnews",
    "title": {
      "ru": "Рубио направляется в Центральную Азию, пока другие чиновники США работают в горячих точках",
      "en": "Rubio heads to Central Asia as some wonder if he's keeping the most pressing matters at a distance"
    },
    "domain": "usnews.com",
    "url": "https://www.usnews.com/news/politics/articles/2026-10-18/rubio-heads-to-central-asia-as-some-wonder-if-hes-keeping-the-most-pressing-matters-at-a-distance",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Визит госсекретаря США в Центральную Азию — дипломатический трек недели."
  },
  {
    "id": "central-asia-security-presstv",
    "title": {
      "ru": "В Москве прошла конференция по безопасности в Центральной Азии и Афганистане",
      "en": "Moscow hosts conference on security in Central Asia, Afghanistan"
    },
    "domain": "presstv.co.uk",
    "url": "https://www.presstv.co.uk/Detail/2026/10/17/778559/Moscow-hosts-conference-on-security-in-Central-Asia,-Afghanistan",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "notes": "Конференция по региональной безопасности с участием центральноазиатских государств."
  },
  {
    "id": "armenia-kyrgyzstan-armenpress",
    "title": {
      "ru": "Опубликовано совместное заявление премьер-министра Армении и президента Кыргызстана",
      "en": "Joint statement signed by Armenian Prime Minister and Kyrgyz President published"
    },
    "domain": "armenpress.am",
    "url": "https://armenpress.am/en/article/1263137",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Совместное заявление Еревана и Бишкека — межгосударственные переговоры."
  },
  {
    "id": "baku-cica-jpost",
    "title": {
      "ru": "Герцог встретился с главой МИД Бахрейна на саммите CICA в Азербайджане",
      "en": "Isaac Herzog meets with Bahrain foreign minister at CICA summit hosted by Azerbaijan"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/article-912023",
    "publication_date": "2026-10-18",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Дипломатическая встреча на саммите CICA в Баку — переговорный трек Южного Кавказа."
  },
  {
    "id": "dprk-torpedo-qazinform",
    "title": {
      "ru": "КНДР испытала новую торпеду с ИИ-наведением — ЦТАК",
      "en": "North Korea tests new AI-powered precision-guided torpedo: KCNA"
    },
    "domain": "qazinform.com",
    "url": "https://qazinform.com/news/north-korea-tests-new-ai-powered-precision-guided-torpedo-kcna-dd68a0",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "notes": "Испытание новой подводной торпедной системы КНДР."
  },
  {
    "id": "dprk-torpedo-star",
    "title": {
      "ru": "Новую торпедную систему испытали",
      "en": "New torpedo weapon system put to the test"
    },
    "domain": "thestar.com.my",
    "url": "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/10/18/new-torpedo-weapon-system-put-to-the-test",
    "publication_date": "2026-10-17",
    "accessed_date": "2026-10-18",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "notes": "Подтверждение испытания КНДР независимым изданием."
  }
];
})();
