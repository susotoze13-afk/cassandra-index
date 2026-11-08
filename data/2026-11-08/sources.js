window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.sources = [
  {
    "id": "sputnikglobe-kharkov-redeploy",
    "title": {
      "ru": "Украинские войска переброшены в Харьков для охраны секретных тюрем — источник",
      "en": "Ukrainian Troops Redeployed to Kharkov to Guard Secret Prisons - Source"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261105/ukrainian-troops-redeployed-to-kharkov-to-guard-secret-prisons---source-1125016238.html",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "vedomosti-norway-border-presence",
    "title": {
      "ru": "Норвегия усилит военное присутствие на границе с Россией",
      "en": "Norway to strengthen military presence on border with Russia"
    },
    "domain": "vedomosti.ru",
    "url": "https://www.vedomosti.ru/politics/news/2026/11/04/1242652-norvegiya-prisutstvie",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "israeldefense-us-airlift-israel",
    "title": {
      "ru": "США начали воздушную переброску в Израиль в преддверии возможной военной операции против Ирана",
      "en": "US Launches Airlift to Israel Ahead of Possible Military Action in Iran"
    },
    "domain": "israeldefense.co.il",
    "url": "https://www.israeldefense.co.il/en/node/72294",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-nato-lithuania-drills",
    "title": {
      "ru": "Более 6 000 военных НАТО примут участие в учениях под руководством ФРГ в Литве",
      "en": "More than 6,000 NATO troops to take part in German-led drills in Lithuania"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/europe/more-than-6-000-nato-troops-to-take-part-in-german-led-drills-in-lithuania/4114400",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "defensenews-coalition-262-poland",
    "title": {
      "ru": "Европейские военные проведут учения в Польше в рамках подготовки развёртывания на Украине после войны",
      "en": "European troops set to train in Poland for postwar Ukraine deployment"
    },
    "domain": "defensenews.com",
    "url": "https://www.defensenews.com/news/2026/11/07/european-troops-set-to-train-in-poland-for-postwar-ukraine-deployment/",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-iran-land-supply-task-force",
    "title": {
      "ru": "США создали оперативную группу для перекрытия наземных маршрутов снабжения Ирана",
      "en": "US launches task force to disrupt Iran's land-based supply routes"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/11/8/us-launches-task-force-to-disrupt-irans-land-based-supply-routes",
    "publication_date": "2026-11-08",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "timesofisrael-iran-military-agencies-network",
    "title": {
      "ru": "Как скрытая сеть военных ведомств Ирана обходит морскую блокаду США",
      "en": "How Iran's hidden web of military agencies is slipping hardware past the US blockade"
    },
    "domain": "timesofisrael.com",
    "url": "https://www.timesofisrael.com/how-irans-hidden-web-of-military-agencies-is-slipping-hardware-past-the-us-blockade/",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week",
    "notes": "Материал Reuters, перепечатка; страница отдаёт 403 на автоматические запросы (blocked)."
  },
  {
    "id": "sputnikglobe-ukraine-logistics-blitz",
    "title": {
      "ru": "Российские силы разрушили украинскую логистику и позиции войск на передовой за неделю ударов",
      "en": "Russian Forces Devastate Ukrainian Logistics and Frontline Troops in Week-Long Blitz"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261106/russian-forces-devastate-ukrainian-logistics-and-frontline-troops-in-week-long-blitz-1125025222.html",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "guardian-kyiv-energy-grid-strike",
    "title": {
      "ru": "Отключения света и дефицит воды в Киеве после ударов России по энергосистеме Украины",
      "en": "Blackouts and water shortages in Kyiv after Russia strikes Ukraine's energy grid"
    },
    "domain": "theguardian.com",
    "url": "https://www.theguardian.com/world/2026/nov/07/blackout-water-shortage-kyiv-russia-strike-ukraine-energy-grid",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-zhitomir-substation",
    "title": {
      "ru": "Российские войска поразили электроподстанцию в Житомирской области",
      "en": "Russian forces hit electrical substation in Zhitomir region"
    },
    "domain": "tass.com",
    "url": "https://tass.com/defense/2214397",
    "publication_date": "2026-11-08",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "al-monitor-yemen-airstrike-33",
    "title": {
      "ru": "Минздрав хуситов: авиаудары под столицей Йемена убили 33 человека",
      "en": "Houthi-run health ministry says airstrikes kill 33 near Yemen capital"
    },
    "domain": "al-monitor.com",
    "url": "https://www.al-monitor.com/originals/2026/11/houthi-run-health-ministry-says-airstrikes-kill-33-near-yemen-capital",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "un-news-beni-civilians-killed",
    "title": {
      "ru": "Новости ООН: погибшие мирные жители в ДР Конго, возвращение украинцев, Гутерриш о «нормализации» силы",
      "en": "World News in Brief: Civilians killed in DR Congo, Ukrainians wrestle with return, Guterres calls out 'normalisation' of force"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/en/story/2026/11/1168757",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-hormuz-tankers-mines",
    "title": {
      "ru": "Два танкера подорвались на минах в Ормузском проливе — КСИР",
      "en": "Two tankers hit mines in Hormuz — IRGC"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2214367",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-iran-war-live-nov8",
    "title": {
      "ru": "Война с Ираном онлайн: США перекрывают наземные маршруты снабжения; ОАЭ спасли 22 моряка",
      "en": "Iran war live: US moves to block land supply routes; UAE rescues 22 sailors"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/liveblog/2026/11/8/iran-war-live-explosions-hit-qeshm-us-moves-to-block-land-supply-routes",
    "publication_date": "2026-11-08",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "twz-roosevelt-third-strike-group",
    "title": {
      "ru": "USS Theodore Roosevelt прибыл в Сингапур — последняя стоянка перед выходом третьей авианосной группы на Ближний Восток",
      "en": "USS Theodore Roosevelt Arrives In Singapore; Last Stop Before Third Strike Group Reaches The Middle East"
    },
    "domain": "twz.com",
    "url": "https://www.twz.com/sea/uss-theodore-roosevelt-arrives-in-singapore-last-stop-before-third-strike-group-reaches-the-middle-east",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "israeldefense-patriot-israel",
    "title": {
      "ru": "США развернули в Израиле систему ПВО Patriot",
      "en": "US Deploys Patriot Missile Defense System to Israel"
    },
    "domain": "israeldefense.co.il",
    "url": "https://www.israeldefense.co.il/en/node/72281",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "sputnikglobe-germany-patriot-ukraine",
    "title": {
      "ru": "Германия отказывается от дальнейших поставок Patriot Украине",
      "en": "Germany Draws The Line on Further Patriot Deliveries to Ukraine"
    },
    "domain": "sputnikglobe.com",
    "url": "https://sputnikglobe.com/20261107/germany-draws-the-line-on-further-patriot-deliveries-to-ukraine-1125029017.html",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "khaleejtimes-khamenei-wider-war",
    "title": {
      "ru": "Верховный лидер Ирана предупредил о расширении войны в случае новых ударов США",
      "en": "Iran supreme leader warns of wider war if US attacks after Trump election rout"
    },
    "domain": "khaleejtimes.com",
    "url": "https://www.khaleejtimes.com/world/mena/iran-supreme-leader-warns-of-wider-war-if-us-attacks-after-trump-election-rout",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "arabtimes-iranian-mp-threats",
    "title": {
      "ru": "Иранский депутат угрожает нефтяным объектам Саудовской Аравии и предупреждает, что Британия может оказаться в зоне досягаемости ракет",
      "en": "Iranian MP Threatens Saudi Oil Facilities and Warns Britain Could Be Within Missile Range"
    },
    "domain": "arabtimesonline.com",
    "url": "https://www.arabtimesonline.com/news/iranian-mp-threatens-saudi-oil-facilities-and-warns-britain-could-be-within-missile-range/",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-tolstoy-europe-truce-troops",
    "title": {
      "ru": "Европа рассчитывала на перемирие на Украине, чтобы ввести туда войска, — старший российский законодатель",
      "en": "Europe hoped for Ukraine truce to deploy troops there — senior Russian lawmaker"
    },
    "domain": "tass.com",
    "url": "https://tass.com/politics/2214375",
    "publication_date": "2026-11-08",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "cbsnews-france-blood-banks-cyber",
    "title": {
      "ru": "Французские банки крови подверглись кибератаке через несколько дней после взлома холодильников в Европе",
      "en": "Blood banks hit by cyberattack in France days after European freezer hacks"
    },
    "domain": "cbsnews.com",
    "url": "https://www.cbsnews.com/news/cyberattack-france-blood-bank/",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "latintimes-freezers-cyber-russia-blame",
    "title": {
      "ru": "Россия отвергает обвинения: взломанные холодильники супермаркетов испортили продукты по всей Европе",
      "en": "Russia Rejects Blame as Hacked Supermarket Freezers Spoil Food Across Europe"
    },
    "domain": "latintimes.com",
    "url": "https://www.latintimes.com/cyberattack-refrigeration-systems-european-supermarkets-600976",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-europe-hybrid-attacks",
    "title": {
      "ru": "Кто стоит за предполагаемыми гибридными атаками в Европе?",
      "en": "Who is behind Europe's suspected hybrid attacks?"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/video/inside-story/2026/11/7/who-is-behind-europes-suspected-hybrid-attacks",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "azernews-nuclear-strike-warning",
    "title": {
      "ru": "Иран предупреждает: ядерный удар будет иметь последствия за пределами региона",
      "en": "Iran warns nuclear strike would have consequences beyond the region"
    },
    "domain": "azernews.az",
    "url": "https://www.azernews.az/region/266740.html",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "newsaz-nuclear-weapons-response",
    "title": {
      "ru": "Иран заявил, что примет необходимые меры в случае ядерного удара",
      "en": "Iran warns it would take necessary measures if targeted with nuclear weapons"
    },
    "domain": "news.az",
    "url": "https://news.az/news/iran-warns-it-would-take-necessary-measures-if-targeted-with-nuclear-weapons",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "nournews-us-threats-nuclear-facilities",
    "title": {
      "ru": "Угрозы США по ядерным объектам Ирана говорят об отчаянии Вашингтона — глава ОАЭИ",
      "en": "US threats against Iran’s nuclear facilities reflect Washington’s growing desperation: AEOI chief"
    },
    "domain": "nournews.ir",
    "url": "https://nournews.ir/en/news/358643/us-threats-against-iran-nuclear-facilities-reflect-washington-growing-desperation-aeoi-chief",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "indiatoday-irgc-nuclear-doctrine",
    "title": {
      "ru": "КСИР готов изменить ядерную доктрину Ирана по приказу Моджтабы Хаменеи",
      "en": "IRGC ready to change Iran nuclear doctrine if Mojtaba Khamenei orders"
    },
    "domain": "indiatoday.in",
    "url": "https://www.indiatoday.in/world/story/irgc-ready-to-change-iran-nuclear-doctrine-if-mojtaba-khamenei-orders-3034524-2026-11-07",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "nournews-nuclear-doctrine-debate",
    "title": {
      "ru": "Что говорят сторонники и противники ядерной доктрины Ирана",
      "en": "What Do Supporters and Opponents of Iran’s Nuclear Doctrine Have to Say?"
    },
    "domain": "nournews.ir",
    "url": "https://nournews.ir/en/news/357188/what-do-supporters-and-opponents-of-iran-nuclear-doctrine-have-to-say",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "iranwire-mp-npt-withdrawal",
    "title": {
      "ru": "Иранский депутат призывает выйти из Договора о нераспространении ядерного оружия",
      "en": "Iranian MP Calls for Country’s Withdrawal from Nuclear Non-Proliferation Treaty"
    },
    "domain": "iranwire.com",
    "url": "https://iranwire.com/en/news/159875-iranian-mp-calls-for-countrys-withdrawal-from-nuclear-non-proliferation-treaty/",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "worldisraelnews-iran-npt-exit",
    "title": {
      "ru": "Иран рассматривает выход из Договора о нераспространении ядерного оружия",
      "en": "Iran considers leaving the nuclear non-proliferation treaty"
    },
    "domain": "worldisraelnews.com",
    "url": "https://worldisraelnews.com/iran-considers-leaving-the-nuclear-non-proliferation-treaty/",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "globaltimes-df61-training",
    "title": {
      "ru": "МБР DF-61 переходит к плановой боевой подготовке в Ракетных войсках НОАК",
      "en": "ICBM DF-61 enters routine training with PLA Rocket Force; rapid transition highlights faster-than-usual development: expert"
    },
    "domain": "globaltimes.cn",
    "url": "https://www.globaltimes.cn/page/202611/1373745.shtml?id=12",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "kyodonews-df61-deployment",
    "title": {
      "ru": "Китай развернул МБР Dongfeng-61, показанную на параде 2025 года",
      "en": "China deploys Dongfeng-61 ICBM unveiled at 2025 military parade"
    },
    "domain": "english.kyodonews.net",
    "url": "https://english.kyodonews.net/articles/-/90510",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "thedefensepost-sentinel-mk21a-test",
    "title": {
      "ru": "Ключевой ядерный компонент американской МБР Sentinel прошёл лётные испытания",
      "en": "Key Nuclear Payload Component for US Sentinel ICBM Completes Flight Test"
    },
    "domain": "thedefensepost.com",
    "url": "https://thedefensepost.com/2026/11/06/lockheed-mk21a-sentinel-icbm-test/",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "thehindu-iran-reviews-nuclear-proposals",
    "title": {
      "ru": "Иран рассматривает предложения по своей ядерной программе — официальные лица",
      "en": "Iran reviewing proposals on Tehran’s nuclear programme: Officials"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/iran-reviewing-proposals-on-tehrans-nuclear-programme-officials/article71677167.ece",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "jpost-iran-reviews-proposals",
    "title": {
      "ru": "Иран изучает предложения посредников о будущем ядерной программы",
      "en": "Iran reviews mediators' proposals on nuclear program's future"
    },
    "domain": "jpost.com",
    "url": "https://www.jpost.com/middle-east/iran-news/article-914000",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "nournews-araghchi-conditions-feasible",
    "title": {
      "ru": "Арагчи: условия Ирана выполнимы, если США ищут мирное решение",
      "en": "Araghchi: Iran’s conditions are all feasible if US seeks peaceful solution"
    },
    "domain": "nournews.ir",
    "url": "https://nournews.ir/en/news/357294/araghchi-iran-conditions-are-all-feasible-if-us-seeks-peaceful-solution",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "aacomtr-sudan-ethiopia-consulate",
    "title": {
      "ru": "Судан распорядился закрыть консульство Эфиопии и дал дипломатам 48 часов на выезд",
      "en": "Sudan orders closure of Ethiopian consulate, gives diplomats 48 hours to leave: Report"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/africa/sudan-orders-closure-of-ethiopian-consulate-gives-diplomats-48-hours-to-leave-report/4112032",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-sudan-ethiopia-expulsions",
    "title": {
      "ru": "Судан и Эфиопия закрыли консульства друг друга в ответном шаге",
      "en": "Sudan, Ethiopia shut each other’s consulates in tit-for-tat move: Reports"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/11/4/sudan-ethiopia-order-tit-for-tat-diplomatic-expulsions",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "thenationalnews-sudan-ethiopia-expulsions",
    "title": {
      "ru": "Судан и Эфиопия обменялись высылками дипломатов на фоне роста напряжённости",
      "en": "Sudan and Ethiopia in retaliatory expulsions of diplomats as tensions rise"
    },
    "domain": "thenationalnews.com",
    "url": "https://www.thenationalnews.com/news/mena/2026/11/05/sudan-and-ethiopia-in-tit-for-tat-expulsions-of-diplomats-as-tensions-rise/",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "dailysabah-iran-hormuz-two-days",
    "title": {
      "ru": "Иран предлагает вновь открыть Ормузский пролив за два дня на фоне проекта сделки с США",
      "en": "Iran offers to reopen Hormuz in 2 days as draft US deal circulates"
    },
    "domain": "dailysabah.com",
    "url": "https://www.dailysabah.com/world/mid-east/iran-offers-to-reopen-hormuz-in-2-days-as-draft-us-deal-circulates",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "moneycontrol-iran-hormuz-48-hours",
    "title": {
      "ru": "Иран обещает открыть Ормуз за 48 часов, Трамп говорит, что сделка «может случиться»",
      "en": "Iran offers to unlock Hormuz in 48 hours, Trump says a deal 'could happen'"
    },
    "domain": "moneycontrol.com",
    "url": "https://www.moneycontrol.com/world/iran-offers-to-unlock-hormuz-in-48-hours-trump-says-a-deal-could-happen-major-breakthrough-or-another-false-dawn-article-14067354.html",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "colombiaone-iran-hormuz-48-hours",
    "title": {
      "ru": "Иран заявляет, что Ормузский пролив может открыться в течение 48 часов",
      "en": "Iran Says Strait of Hormuz Could Reopen in 48 Hours"
    },
    "domain": "colombiaone.com",
    "url": "https://colombiaone.com/2026/11/03/iran-strait-hormuz-could-reopen/",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "thehindu-us-sanctions-indian-turkish-firms",
    "title": {
      "ru": "США ввели санкции против индийских и турецких компаний и лиц за помощь Ирану",
      "en": "U.S. slaps sanctions on Indian, Turkish firms and people for aiding Iran"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/international/us-slaps-sanctions-on-indian-turkish-firms-and-people-for-aiding-iran/article71668431.ece",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "adminch-swiss-21st-sanctions-package",
    "title": {
      "ru": "Украина: Федеральный совет ввёл 21-й пакет санкций",
      "en": "Ukraine: Federal Council implements 21st package of sanctions"
    },
    "domain": "admin.ch",
    "url": "https://www.admin.ch/en/newnsb/KsmEWk4E-bHM",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "kursivmedia-us-sanctions-tajik-iran-arms",
    "title": {
      "ru": "США ввели санкции против уроженца Таджикистана за поставки оружия Ирану",
      "en": "US sanctions Tajikistan-born man over selling arms to Iran"
    },
    "domain": "uz.kursiv.media",
    "url": "https://uz.kursiv.media/en/2026-11-06/us-tajik-missiles-iran-sanctions/",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "latintimes-russia-ukraine-abu-dhabi-talks",
    "title": {
      "ru": "Команда Трампа возобновляет российско-украинские переговоры в Абу-Даби 10–11 ноября",
      "en": "Trump's Team Restarts Russia-Ukraine Peace Talks in Abu Dhabi Nov. 10–11"
    },
    "domain": "latintimes.com",
    "url": "https://www.latintimes.com/us-mediate-russia-ukraine-talks-abu-dhabi-600870",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-trump-progress-iran-ceasefire-talks",
    "title": {
      "ru": "Трамп сигнализирует о прогрессе по сделке с Ираном, Тегеран торопит с прекращением огня",
      "en": "Trump signals progress on Iran deal as Tehran pushes faster ceasefire"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/11/2/iran-pushing-accelerated-plan-for-ceasefire-talks-with-us",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "firstpost-melania-russia-ukraine-talks",
    "title": {
      "ru": "Первая леди принимает российско-украинские переговоры в Белом доме",
      "en": "Can Melania Trump succeed where diplomats have struggled? First Lady hosts Russia-Ukraine talks"
    },
    "domain": "firstpost.com",
    "url": "https://www.firstpost.com/world/united-states/can-melania-trump-succeed-where-diplomats-have-struggled-first-lady-hosts-russia-ukraine-talks-14058208.html",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "latintimes-oleshky-monthly-aid-missions",
    "title": {
      "ru": "Омбудсмены России и Украины договорились о ежемесячных гуманитарных миссиях в Алешки",
      "en": "Russia and Ukraine's Rights Chiefs Agree to Monthly Aid Missions for Occupied Oleshky After Ceasefire"
    },
    "domain": "latintimes.com",
    "url": "https://www.latintimes.com/russia-ukraine-monthly-humanitarian-missions-oleshky-600839",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "belta-krupko-oleshky-humanitarian-mission",
    "title": {
      "ru": "Крупко о гуманитарной миссии в Алешках: Беларусь вновь подтвердила позицию миролюбия и добрососедства",
      "en": "Krupko on the humanitarian mission in Oleshky: Belarus reaffirmed its position of peacefulness and good neighbourliness"
    },
    "domain": "belta.by",
    "url": "https://belta.by/politics/view/krupko-o-gumanitarnoj-missii-v-aleshkah-belarus-vnov-podtverdila-pozitsiju-miroljubija-i-dobrososedstva-808860-2026/",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "vedomosti-lantratova-oleshky-mission-completed",
    "title": {
      "ru": "Лантратова: гуманитарная миссия в Алешках официально завершилась 1 ноября",
      "en": "Lantratova: the humanitarian mission in Oleshky officially ended on November 1"
    },
    "domain": "vedomosti.ru",
    "url": "https://www.vedomosti.ru/politics/news/2026/11/02/1242032-gumanitarnaya-missiya",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iz-mendel-ukraine-mobilization",
    "title": {
      "ru": "Мендель назвал мобилизацию на Украине источником пыток и взяток",
      "en": "Mendel called the mobilization on Ukraine a source of torture and bribes"
    },
    "domain": "iz.ru",
    "url": "https://iz.ru/en/node/2195392",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "sudua-november-changes-mobilization",
    "title": {
      "ru": "Что изменилось для украинцев с 1 ноября: пенсии, субсидии, тарифы, бронирование и новые платежи",
      "en": "What changed for Ukrainians from November 1: pensions, subsidies, tariffs, reservation and new payments"
    },
    "domain": "sud.ua",
    "url": "https://sud.ua/ru/news/suspilstvo/376524-shcho-zminylosia-dlia-ukraintsiv-z-1-lystopada-pensii-subsydii-taryfy-broniuvannia-ta-novi-platezhi",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "thehindu-andhra-russian-army-jobs",
    "title": {
      "ru": "Андхра-Прадеш предостерегает молодёжь от «заманчивых предложений работы» в российской армии",
      "en": "Andhra Pradesh cautions youth against ‘lucrative job offers’ in Russian army"
    },
    "domain": "thehindu.com",
    "url": "https://www.thehindu.com/news/cities/Visakhapatnam/andhra-pradesh-cautions-youth-against-lucrative-job-offers-in-russian-army/article71665678.ece",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "vedomosti-evacuees-oleshky-needs",
    "title": {
      "ru": "Какова судьба и нужды эвакуированных из Алешек",
      "en": "What is the fate and what are the needs of those evacuated from Oleshky"
    },
    "domain": "vedomosti.ru",
    "url": "https://www.vedomosti.ru/newspaper/articles/2026/11/03/1242209-sudba-i-nuzhdi-evakuirovannih-iz-aleshek",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "yahoo-ukraine-interceptor-production",
    "title": {
      "ru": "Украина выйдет на массовое производство перехватчиков против реактивных «Шахедов» к концу 2026 года",
      "en": "Ukraine to reach mass interceptor production against jet Shaheds at the end of 2026"
    },
    "domain": "yahoo.com",
    "url": "https://www.yahoo.com/news/world/articles/ukraine-reach-mass-interceptor-production-082700118.html",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "united24media-russia-missile-production",
    "title": {
      "ru": "Россия наращивает производство ракет вопреки санкциям: до 700 баллистических ракет к октябрю 2026 года",
      "en": "Russia Keeps Building Missiles Despite Sanctions, Amassing Up to 700 Ballistic Missiles by October 2026"
    },
    "domain": "united24media.com",
    "url": "https://united24media.com/war-in-ukraine/russia-keeps-building-missiles-despite-sanctions-amassing-up-to-700-ballistic-missiles-by-october-2026-24069",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "militarnyi-poland-bohdana-production",
    "title": {
      "ru": "Польские компании договорились о сотрудничестве в производстве САУ Bohdana",
      "en": "Polish Companies Agree to Cooperate on Production of the Bohdana Self-Propelled Howitzer"
    },
    "domain": "militarnyi.com",
    "url": "https://militarnyi.com/en/news/polish-companies-agree-to-cooperate-on-production-of-the-bohdana-self-propelled-howitzer/",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "state-gov-cuba-sanctions",
    "title": {
      "ru": "Дополнительные санкции против иностранной военной поддержки кубинского режима и сетей незаконных доходов",
      "en": "Further Sanctions on the Cuban Regime's Foreign Military Support and Illicit Revenue Networks"
    },
    "domain": "state.gov",
    "url": "https://www.state.gov/releases/office-of-the-spokesman/2026/11/further-sanctions-on-the-cuban-regimes-foreign-military-support-and-illicit-revenue-networks/",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "gcaptain-cuba-tanker-sanctions",
    "title": {
      "ru": "США вводят санкции против кубинского нефтяного танкерного флота",
      "en": "U.S. Targets Cuba's Oil Tanker Fleet in New Sanctions Crackdown"
    },
    "domain": "gcaptain.com",
    "url": "https://gcaptain.com/u-s-targets-cubas-oil-tanker-fleet-in-new-sanctions-crackdown/",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-beijing-cuba-sanctions",
    "title": {
      "ru": "Пекин требует от США быстро исправить «неправомерные действия» после санкций против китайских компаний за связи с Кубой",
      "en": "Beijing urges US to correct its 'wrongdoings' swiftly after Washington sanctions Chinese companies over Cuba"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/asia-pacific/beijing-urges-us-to-correct-its-wrongdoings-swiftly-after-washington-sanctions-chinese-companies-over-cuba/4115021",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-us-sanctions-iran-air-defense",
    "title": {
      "ru": "США ввели санкции против лиц и организаций за предполагаемые поставки Ирану систем ПВО",
      "en": "US sanctions individuals, entities over alleged efforts to supply Iran with air defense systems"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/americas/us-sanctions-individuals-entities-over-alleged-efforts-to-supply-iran-with-air-defense-systems/4112138",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "fool-rare-earth-pause-expires",
    "title": {
      "ru": "Пауза в экспортных ограничениях Китая на редкоземельные металлы истекает 10 ноября",
      "en": "China's Rare-Earth Export Pause Expires Nov. 10. Here's What It Means for USA Rare Earth and MP Materials."
    },
    "domain": "fool.com",
    "url": "https://www.fool.com/investing/2026/11/05/china-rare-earth-export-pause-usar-mp-materials/",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "japantimes-us-china-rare-earths",
    "title": {
      "ru": "США требуют от Китая выполнения обязательств по редкоземельным металлам и сельхозпродукции перед встречами Трампа и Си",
      "en": "U.S. urges China to meet rare earths and agriculture commitments ahead of Trump-Xi meetings"
    },
    "domain": "japantimes.co.jp",
    "url": "https://www.japantimes.co.jp/business/2026/11/07/economy/us-china-rare-earths-agriculture/",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "gcaptain-hormuz-new-wave-attacks",
    "title": {
      "ru": "Новая волна атак на танкеры и газовоз в Ормузском проливе и Персидском заливе",
      "en": "New Wave of Attacks Hits Tankers and LNG Carrier in Strait of Hormuz and Persian Gulf"
    },
    "domain": "gcaptain.com",
    "url": "https://gcaptain.com/new-wave-of-attacks-hits-tankers-and-lng-carrier-in-strait-of-hormuz-and-persian-gulf/",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-hormuz-tankers-struck",
    "title": {
      "ru": "Иран сообщает о поражённых танкерах в Ормузском проливе на фоне опасений новой атаки США",
      "en": "Iran says tankers struck in Hormuz amid fears of new US attack"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/11/5/iran-says-tankers-struck-in-hormuz-amid-fears-of-new-us-attack",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-switzerland-lifts-sanctions",
    "title": {
      "ru": "Швейцария вслед за ЕС сняла санкции с Усманова и Фридмана",
      "en": "Switzerland follows EU in lifting sanctions on Usmanov, Fridman"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2213007",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "finews-usmanov-sanctions-lifted",
    "title": {
      "ru": "Швейцария исключила Алишера Усманова из санкционного списка",
      "en": "Switzerland removes Alisher Usmanov from sanctions list"
    },
    "domain": "finews.com",
    "url": "https://www.finews.com/news/english-news/74349-alisher-usmanov-switzerland-lifts-sanctions-federal-court-of-justice-eu-council-lawsuit",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "fakti-switzerland-lifts-sanctions",
    "title": {
      "ru": "Швейцария сняла санкции с двух российских миллиардеров",
      "en": "Switzerland lifts sanctions against two Russian billionaires"
    },
    "domain": "fakti.bg",
    "url": "https://fakti.bg/en/biznes/1098208-switzerland-lifts-sanctions-against-two-russian-billionaires",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "oilprice-12pct-weekly-loss",
    "title": {
      "ru": "Нефть идёт к недельному падению на 12 % несмотря на новые атаки на танкеры",
      "en": "Oil Prices Head for 12% Weekly Loss Despite Fresh Tanker Attacks"
    },
    "domain": "oilprice.com",
    "url": "https://oilprice.com/Latest-Energy-News/World-News/Oil-Prices-Head-for-12-Weekly-Loss-Despite-Fresh-Tanker-Attacks.html",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "F-financial",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "cnbc-retail-dump-selloff",
    "title": {
      "ru": "Частные трейдеры распродали рекордный объём акций за день с обвала эпохи ковида",
      "en": "Retail traders dump the most stocks in single day since Covid selloff"
    },
    "domain": "cnbc.com",
    "url": "https://www.cnbc.com/2026/11/05/retail-traders-dump-the-most-stocks-in-single-day-since-covid-sell-off.html",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "cnbc-fear-gauge",
    "title": {
      "ru": "Индикатор страха Уолл-стрит, возможно, подаёт сигнал к покупке",
      "en": "Wall Street's fear gauge may be flashing a buy sign"
    },
    "domain": "cnbc.com",
    "url": "https://www.cnbc.com/2026/11/06/wall-streets-fear-gauge-may-be-flashing-a-buy-sign.html",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "defence24-us-troops-estonia",
    "title": {
      "ru": "Американские войска возвращаются в Эстонию: восточный фланг НАТО усиливается",
      "en": "US troops return to Estonia. NATO's eastern flank is getting stronger"
    },
    "domain": "defence24.com",
    "url": "https://defence24.com/defence-policy/us-troops-return-to-estonia-natos-eastern-flank-is-getting-stronger",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "ctv-nato-latvia-training",
    "title": {
      "ru": "Военные НАТО в Латвии тренируются взаимозаменяемости на передовой",
      "en": "CTV News in Latvia: NATO soldiers train to become interchangeable on the front lines"
    },
    "domain": "ctvnews.ca",
    "url": "https://www.ctvnews.ca/canada/article/ctv-news-in-latvia-nato-soldiers-train-to-become-interchangeable-on-the-front-lines/",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-houthi-missiles-riyadh",
    "title": {
      "ru": "Коалиция во главе с Саудовской Аравией сообщила о перехвате двух баллистических ракет хуситов над Эр-Риядом",
      "en": "Saudi-led coalition says it intercepted 2 Houthi ballistic missiles over Riyadh"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/saudi-led-coalition-says-it-intercepted-2-houthi-ballistic-missiles-over-riyadh/4115656",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "observer-uganda-somalia-withdrawal",
    "title": {
      "ru": "Уганда начала вывод войск из Сомали после 20 лет присутствия",
      "en": "Uganda begins to withdraw troops from Somalia after 20 years"
    },
    "domain": "observer.ug",
    "url": "https://observer.ug/news/uganda-begins-to-withdraw-troops-from-somalia-after-20-years/",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "un-news-peacekeeping-vacuum",
    "title": {
      "ru": "Глава миротворчества ООН предупреждает о «вакууме безопасности» при выводе «голубых касок» из Ливана и Западной Сахары",
      "en": "UN peacekeeping chief warns of 'security vacuum' as Blue Helmets leave Lebanon and Western Sahara"
    },
    "domain": "news.un.org",
    "url": "https://news.un.org/en/story/2026/11/1168741",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-un-lebanon-security-vacuum",
    "title": {
      "ru": "ООН предупреждает о вакууме безопасности на юге Ливана в случае вывода миротворцев",
      "en": "UN warns of security vacuum in southern Lebanon if peacekeepers withdraw"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/world/un-warns-of-security-vacuum-in-southern-lebanon-if-peacekeepers-withdraw/4112012",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-abu-dhabi-talks-nov10",
    "title": {
      "ru": "Переговоры России, США и Украины пройдут в Абу-Даби 10–11 ноября, заявил Уиткофф",
      "en": "Russia-US-Ukraine talks to be held in Abu Dhabi on November 10-11, Witkoff says"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2212141",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-zelensky-delegation-abu-dhabi",
    "title": {
      "ru": "Глава офиса Зеленского возглавит делегацию Киева на переговорах в Абу-Даби",
      "en": "Zelensky's office head to lead Kiev's delegation to Abu Dhabi talks"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2213991",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "globe-melania-oleshky-ceasefire",
    "title": {
      "ru": "Мелания Трамп встретилась с представителями России и Украины в Белом доме в честь перемирия в Олешках",
      "en": "Melania Trump joins Russia, Ukraine officials at White House event to mark Oleshky ceasefire"
    },
    "domain": "theglobeandmail.com",
    "url": "https://www.theglobeandmail.com/world/article-melania-trump-putin-envoy-oleshky-ceasefire/",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-gaza-attacks-nov5",
    "title": {
      "ru": "Четверо погибших, включая ребёнка, в результате израильских ударов по Газе",
      "en": "Four people, including a child, killed in Israeli attacks on Gaza"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/11/5/four-people-including-a-child-killed-in-israeli-attacks-on-gaza",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tass-alyoshki-mission-done",
    "title": {
      "ru": "Россия и Украина добросовестно выполнили миссию в Алёшках, заявила первая леди США",
      "en": "Russia, Ukraine worked diligently to carry out Alyoshki mission — US First Lady"
    },
    "domain": "tass.com",
    "url": "https://tass.com/world/2213513",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "dvidshub-field-hospital-night-move",
    "title": {
      "ru": "121-й полевой госпиталь перебрасывает госпиталь в темноте в ходе учений Pacific Medic Forge 26-2",
      "en": "121st Field Hospital Moves Its Hospital in the Dark During Pacific Medic Forge 26-2"
    },
    "domain": "dvidshub.net",
    "url": "https://www.dvidshub.net/news/578643/121st-field-hospital-moves-its-hospital-dark-during-pacific-medic-forge-26-2",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "siemens-medevac-train",
    "title": {
      "ru": "Siemens и Lufthansa Technik Defense разрабатывают медицинский эвакуационный поезд",
      "en": "Siemens and Lufthansa Technik Defense develop medical evacuation train"
    },
    "domain": "press.siemens.com",
    "url": "https://press.siemens.com/global/en/pressrelease/siemens-and-lufthansa-technik-defense-develop-medical-evacuation-train",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "ssbcrack-india-medical-readiness",
    "title": {
      "ru": "Генерал-лейтенант К. Г. Муралидхаран проверил медицинскую готовность полевых госпиталей дивизии «Бизон» и военного госпиталя Голконда",
      "en": "Lt Gen CG Muralidharan Reviews Medical Preparedness at Bison Division Field Hospitals and Military Hospital Golconda"
    },
    "domain": "ssbcrack.com",
    "url": "https://www.ssbcrack.com/2026/11/lt-gen-cg-muralidharan-reviews-medical-preparedness-at-bison-division-field-hospitals-and-military-hospital-golconda.html",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "interfax-petrochem-export-ban",
    "title": {
      "ru": "Правительство РФ ввело временный запрет на экспорт отдельных видов нефтехимической продукции",
      "en": "Russian govt introduces temporary ban on exports of certain petrochemical products"
    },
    "domain": "interfax.com",
    "url": "https://interfax.com/newsroom/top-stories/119773/",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "enerdata-russia-diesel-ban-jan2027",
    "title": {
      "ru": "Россия продлила ограничения на экспорт дизельного топлива до января 2027 года",
      "en": "Russia prolongs diesel export restrictions until January 2027"
    },
    "domain": "enerdata.net",
    "url": "https://www.enerdata.net/publications/daily-energy-news/russia-prolongs-diesel-export-restrictions-until-january-2027.html",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "indiatoday-iran-oil-sanctions",
    "title": {
      "ru": "США ввели санкции против индийского бизнесмена, его жены и девяти связанных с Индией компаний из-за иранского нефтяного экспорта",
      "en": "US sanctions Indian businessman, wife and nine India-linked entities over Iran oil exports"
    },
    "domain": "indiatoday.in",
    "url": "https://www.indiatoday.in/world/story/us-sanctions-indian-businessman-wife-and-nine-india-linked-entities-over-iran-oil-exports-3032570-2026-11-05",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aljazeera-russian-diesel-traders",
    "title": {
      "ru": "Почему нефтетрейдеры отказываются покупать российское дизельное топливо после сделки Трампа и Путина",
      "en": "Why are oil traders refusing to buy Russian diesel after Trump-Putin deal?"
    },
    "domain": "aljazeera.com",
    "url": "https://www.aljazeera.com/news/2026/11/7/why-are-oil-traders-refusing-to-buy-russian-diesel-after-trump-putin-deal",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "tbsnews-saudi-airport-flights",
    "title": {
      "ru": "Ограничения в аэропортах Саудовской Аравии: затронуты 23 077 пассажиров, нарушены 174 рейса",
      "en": "Saudi airport restrictions: 23,077 passengers affected as 174 flights disrupted so far"
    },
    "domain": "tbsnews.net",
    "url": "https://www.tbsnews.net/economy/aviation/saudi-airport-restrictions-23077-passengers-affected-174-flights-disrupted-so-far",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-russia-aviation-restrictions",
    "title": {
      "ru": "Атаки украинских дронов влияют на российскую авиацию: ограничения полётов растут",
      "en": "Ukrainian drone attacks affect Russian aviation as flight restrictions rise"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/eurasia/ukrainian-drone-attacks-affect-russian-aviation-as-flight-restrictions-rise/4109546",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "militarytimes-ammo-plants-iran-war",
    "title": {
      "ru": "Пентагону нужно больше боеприпасов для войны с Ираном; расплачиваются небольшие городки",
      "en": "The Pentagon needs more ammo for the Iran war. Small communities are paying the price."
    },
    "domain": "militarytimes.com",
    "url": "https://www.militarytimes.com/pentagon/2026/11/04/the-pentagon-needs-more-ammo-for-the-iran-war-small-communities-are-paying-the-price/",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "rg-modo-logistics-armament-posts",
    "title": {
      "ru": "Путин ввел в Минобороны должности начальников тыла и вооружения ВС РФ",
      "en": "Putin introduces posts of chiefs of logistics and armaments in Russia's Defense Ministry"
    },
    "domain": "rg.ru",
    "url": "https://rg.ru/2026/11/06/putin-vvel-v-minoborony-dolzhnosti-nachalnikov-tyla-i-vooruzheniia-vs-rf.html",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "defencenu-ammunition-plants-rebuild",
    "title": {
      "ru": "Восстановление заводов боеприпасов, обеспечивающих боевую мощь Америки",
      "en": "Rebuilding The Ammunition Plants Behind America's Combat Power"
    },
    "domain": "defence.nu",
    "url": "https://defence.nu/2026/11/07/rebuilding-the-ammunition-plants-behind-americas-combat-power/",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "moldovalive-diaspora-mobilisation-bill",
    "title": {
      "ru": "Молдаван за рубежом могут обязать вернуться в страну при мобилизации в военное время",
      "en": "Moldovans Living Abroad Could Be Required to Return if Mobilised During Wartime"
    },
    "domain": "moldovalive.md",
    "url": "https://moldovalive.md/moldovans-living-abroad-could-be-required-to-return-if-mobilised-during-wartime/",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "vesti-moldova-mobilisation-return",
    "title": {
      "ru": "При мобилизации граждан Молдавии будут возвращать из-за границы",
      "en": "Moldova to recall its citizens from abroad in case of mobilisation"
    },
    "domain": "vesti.ru",
    "url": "https://www.vesti.ru/ns/pri-mobilizacii-grazhdan-moldavii-budut-vozvrashchat-iz-za-granicy",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "iranwire-cybersphere-nov5",
    "title": {
      "ru": "Сегодня в иранской киберсфере: 5 ноября 2026 года",
      "en": "Today in the Iranian Cybersphere: November 5, 2026"
    },
    "domain": "iranwire.com",
    "url": "https://iranwire.com/en/news/159847-today-in-the-iranian-cybersphere-november-5-2026/",
    "publication_date": "2026-11-05",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "warwatch-gps-interference-iran-border",
    "title": {
      "ru": "Зафиксированы помехи GPS у западной границы Ирана; причина не подтверждена",
      "en": "GPS interference reported near Iran's western border; cause unconfirmed"
    },
    "domain": "war-watch.com",
    "url": "https://www.war-watch.com/article/cmw5gl3e9j21qscci4l8iyxts",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "OSINT",
    "cluster_id": "E-field-osint",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "ncriran-iran-brief-nov7",
    "title": {
      "ru": "Иран: новости коротко — 7 ноября 2026 года",
      "en": "Iran News in Brief – November 7, 2026"
    },
    "domain": "ncr-iran.org",
    "url": "https://www.ncr-iran.org/en/news/iran-news-in-brief-november-7-2026/",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "OSINT",
    "cluster_id": "E-field-osint",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "usembassy-riyadh-security-alert",
    "title": {
      "ru": "Предупреждение о безопасности: миссия США в Саудовской Аравии — 3 ноября 2026 года",
      "en": "Security Alert: U.S. Mission to Saudi Arabia – November 3, 2026"
    },
    "domain": "sa.usembassy.gov",
    "url": "https://sa.usembassy.gov/security-alert-u-s-mission-to-saudi-arabia-november-3-2026/",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "primary",
    "cluster_id": "C-registries",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "dawn-riyadh-staff-departure",
    "title": {
      "ru": "Посольство США повторно объявило о выезде неэкстренного персонала из Саудовской Аравии",
      "en": "US Embassy reissues Saudi Arabia alert ordering non-emergency staff to leave"
    },
    "domain": "dawn.com",
    "url": "https://www.dawn.com/news/2042022",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "iz-switzerland-sanctions-delisting",
    "title": {
      "ru": "Швейцария сняла санкции с российских бизнесменов Усманова и Фридмана",
      "en": "Switzerland lifted sanctions against Russian businessmen Usmanov and Fridman"
    },
    "domain": "iz.ru",
    "url": "https://iz.ru/en/2196351/2026-11-04/switzerland-lifted-sanctions-against-russian-businessmen-usmanov-and-fridman",
    "publication_date": "2026-11-04",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "aa-hormuz-transit-exemptions",
    "title": {
      "ru": "Иран вывел суда Индии, Китая, Ирака и Катара из ограничений на транзит через Ормузский пролив — депутат",
      "en": "Iran exempts ships from India, China, Iraq, Qatar from Hormuz transit restrictions: Lawmaker"
    },
    "domain": "aa.com.tr",
    "url": "https://www.aa.com.tr/en/middle-east/iran-exempts-ships-from-india-china-iraq-qatar-from-hormuz-transit-restrictions-lawmaker/4110513",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  },
  {
    "id": "greekcitytimes-balkan-shield-exercise",
    "title": {
      "ru": "Греция принимает балканские военные учения у подножия Олимпа",
      "en": "Greece Hosts Balkan Military Exercise Beneath Mount Olympus"
    },
    "domain": "greekcitytimes.com",
    "url": "https://greekcitytimes.com/2026/11/06/greece-hosts-balkan-military-exercise-beneath-mount-olympus/",
    "publication_date": "2026-11-06",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week",
    "notes": "Многонациональные учения BALKAN SHIELD: спецподразделения восьми балканских стран."
  },
  {
    "id": "balkaninsight-romania-moldova-defence-deal",
    "title": {
      "ru": "Румыния и Молдова заключили первое совместное соглашение об оборонных закупках",
      "en": "Romania and Moldova Seal First Joint Defence Procurement Deal"
    },
    "domain": "balkaninsight.com",
    "url": "https://balkaninsight.com/2026/11/02/romania-and-moldova-seal-first-joint-defence-procurement-deal/bi/",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "kursiv-kazakhstan-second-a400m",
    "title": {
      "ru": "Казахстан получил второй военно-транспортный самолёт Airbus A400M",
      "en": "Kazakhstan receives second Airbus A400M military transport aircraft"
    },
    "domain": "kz.kursiv.media",
    "url": "https://kz.kursiv.media/en/2026-11-03/engk-nknk-kazakhstan-receives-second-airbus-a400m-military-transport-aircraft/",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week"
  },
  {
    "id": "asbarez-azerbaijani-soldier-border-breach",
    "title": {
      "ru": "Азербайджанский военнослужащий, нарушивший границу Армении, «не имел намерения убивать», заявили в следствии",
      "en": "Azerbaijani Soldier who Breached Armenia's Border 'Had No Intent to Kill,' Top Security Officials Says"
    },
    "domain": "asbarez.com",
    "url": "https://asbarez.com/azerbaijani-soldier-who-breached-armenias-border-had-no-intent-to-kill-top-security-officials-says/",
    "publication_date": "2026-11-03",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week",
    "notes": "Пограничный инцидент на армяно-азербайджанской границе."
  },
  {
    "id": "taiwannews-himars-second-batch",
    "title": {
      "ru": "Тайвань ожидает вторую партию реактивных систем HIMARS до конца года",
      "en": "Taiwan expects second batch of HIMARS systems by end of year"
    },
    "domain": "taiwannews.com.tw",
    "url": "https://www.taiwannews.com.tw/en/news/6473285",
    "publication_date": "2026-11-07",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "A-mainstream",
    "state_affiliated": false,
    "origin": "collected-in-week",
    "notes": "Вторая партия из 18 пусковых установок M142 HIMARS из США."
  },
  {
    "id": "reportaz-armenia-border-delimitation-resume",
    "title": {
      "ru": "Мгер Григорян: Ереван надеется вскоре возобновить делимитацию границы с Азербайджаном",
      "en": "Mher Grigoryan: Yerevan hopes to resume border delimitation with Azerbaijan soon"
    },
    "domain": "report.az",
    "url": "https://report.az/en/region/mher-grigoryan-yerevan-hopes-to-resume-border-delimitation-with-azerbaijan-soon",
    "publication_date": "2026-11-02",
    "accessed_date": "2026-11-08",
    "source_type": "secondary",
    "cluster_id": "B-state-media",
    "state_affiliated": true,
    "origin": "collected-in-week"
  }
];
})();
