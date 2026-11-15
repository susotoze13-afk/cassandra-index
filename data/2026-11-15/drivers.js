window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.drivers = [
  {
    "label": {
      "ru": "Ормуз и Бахрейн: мины под танкерами и удар по радиолокатору США",
      "en": "Hormuz and Bahrain: mines under tankers and a strike on a US radar"
    },
    "observation": {
      "ru": "Три танкера загорелись после подрыва на минах в Ормузском проливе, ООН сообщает о не менее 25 погибших моряках и предупреждает о росте морских атак. Иран заявил об ударе шестью дронами по радиолокационному узлу США в Бахрейне, Бахрейн впервые с сентября выпустил предупреждения об угрозе.",
      "en": "Three tankers caught fire after hitting mines in the Strait of Hormuz, the UN reports at least 25 sailors killed and warns of rising maritime attacks. Iran said it struck a US radar site in Bahrain with six drones, and Bahrain issued its first threat alerts since September."
    },
    "why": {
      "ru": "Морской маршрут остаётся зоной удара, а атака на базу США расширяет театр (Д1.4, Д4.4, Д7.2, Д9.3).",
      "en": "The sea lane remains a strike zone, and the attack on a US base widens the theatre (D1.4, D4.4, D7.2, D9.3)."
    },
    "contribution": "high",
    "confidence": "high",
    "sources": [
      {
        "id": "tass-bahrain-radar",
        "title": {
          "ru": "Иран ударил БПЛА по радиолокационной инфраструктуре базы США в Бахрейне — КСИР",
          "en": "Iran strikes by UAVs radar infrastructure at US military base in Bahrain - IRGC"
        },
        "domain": "tass.com",
        "url": "https://tass.com/world/2218255",
        "publication_date": "2026-11-15",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      },
      {
        "id": "aa-tankers-fire",
        "title": {
          "ru": "Два танкера загорелись после подрыва на морской мине в Ормузе",
          "en": "2 tankers caught fire after hitting naval mine in Hormuz, Iranian navy says"
        },
        "domain": "aa.com.tr",
        "url": "https://www.aa.com.tr/en/middle-east/2-tankers-caught-fire-after-hitting-naval-mine-in-hormuz-iranian-navy-says/4125096",
        "publication_date": "2026-11-14",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      },
      {
        "id": "almonitor-tankers-mines",
        "title": {
          "ru": "ВМС Ирана: три танкера горят после подрыва на минах в Ормузе",
          "en": "Iran's navy says three tankers on fire after hitting mines in Hormuz"
        },
        "domain": "al-monitor.com",
        "url": "https://www.al-monitor.com/originals/2026/11/irans-navy-says-three-tankers-fire-after-hitting-mines-hormuz",
        "publication_date": "2026-11-14",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "reportaz-hormuz-sailors",
        "title": {
          "ru": "ООН: не менее 25 моряков погибли в Ормузском проливе и вокруг него",
          "en": "At least 25 sailors killed in and around Strait of Hormuz, UN says"
        },
        "domain": "report.az",
        "url": "https://report.az/en/other-countries/at-least-25-sailors-killed-in-and-around-strait-of-hormuz-un-says",
        "publication_date": "2026-11-14",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      }
    ]
  },
  {
    "label": {
      "ru": "Рынки: Brent выше $96, оптовые цены 6,5 %, обвал Nvidia",
      "en": "Markets: Brent above $96, wholesale prices at 6.5 %, Nvidia slump"
    },
    "observation": {
      "ru": "Brent вернулся выше $96 на фоне эскалации вокруг Ирана; годовой рост оптовых цен в США достиг 6,5 % — максимум почти за четыре года; капитализация Nvidia за неделю упала на $1,7 трлн, а рынок США, по заявлению Трампа, потерял $3 трлн. Печное топливо подорожало на 59 % к прошлой зиме.",
      "en": "Brent climbed back above $96 as Iran tensions escalated; US annual wholesale price growth hit 6.5 %, the highest in nearly four years; Nvidia lost $1.7 trillion in market value in a week and, per Trump, the US market lost $3 trillion. Heating oil is up 59 % from last winter."
    },
    "why": {
      "ru": "Стресс рынков и сырья — отдельный критерий входа в драйвер Д4 (Д4.6), он же давит на финансовую изоляцию и накопления (Д9.2, Д9.4).",
      "en": "Market and commodity stress is its own input criterion inside D4 (D4.6) and feeds financial isolation and stockpiling (D9.2, D9.4)."
    },
    "contribution": "high",
    "confidence": "medium",
    "sources": [
      {
        "id": "oilprice-brent-96",
        "title": {
          "ru": "Brent вернулся выше $96 на эскалации вокруг Ирана",
          "en": "Brent Crude Climbs Back Above $96 as Iran Tensions Escalate"
        },
        "domain": "oilprice.com",
        "url": "https://oilprice.com/Energy/Energy-General/Brent-Crude-Climbs-Back-Above-96-as-Iran-Tensions-Escalate.html",
        "publication_date": "2026-11-13",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "F-financial",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "cnbc-ppi",
        "title": {
          "ru": "Оптовые цены в США выросли на 0,3 %, годовой рост 6,5 % — максимум за четыре года",
          "en": "Wholesale prices rose 0.3% in October, putting annual rate at 6.5%, the highest in nearly four years"
        },
        "domain": "cnbc.com",
        "url": "https://www.cnbc.com/2026/11/13/ppi-inflation-report-october-2026.html",
        "publication_date": "2026-11-13",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "cnbc-nvidia-17t",
        "title": {
          "ru": "Nvidia: худшая недельная серия с 2012 года, капитализация упала на $1,7 трлн",
          "en": "Nvidia stock suffers longest weekly losing streak since 2012 as market value sinks by $1.7 trillion"
        },
        "domain": "cnbc.com",
        "url": "https://www.cnbc.com/2026/11/13/nvidia-stock-jensen-affair-ai.html",
        "publication_date": "2026-11-13",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "hindustantimes-stocks-3t",
        "title": {
          "ru": "Трамп винит демократов в потере $3 трлн капитализации рынка США",
          "en": "Trump blames Democrats for $3 trillion US stock market loss after 2026 midterms"
        },
        "domain": "hindustantimes.com",
        "url": "https://www.hindustantimes.com/world-news/us-news/trump-blames-democrats-for-3-trillion-us-stock-market-loss-after-2026-midterms-101794713697395.html",
        "publication_date": "2026-11-15",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "cnbc-heating-oil",
        "title": {
          "ru": "Цены на печное топливо выросли на 59 % к прошлой зиме",
          "en": "Heating oil prices are up 59% from last winter. The spike is 'crushing folks,' Maine nonprofit says"
        },
        "domain": "cnbc.com",
        "url": "https://www.cnbc.com/2026/11/14/heating-oil-price-spike-household-budgets.html",
        "publication_date": "2026-11-14",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      }
    ]
  },
  {
    "label": {
      "ru": "Ядерная сфера: пересмотр доктрины Ирана и тревога МАГАТЭ",
      "en": "Nuclear: Iran doctrine review and an IAEA alarm"
    },
    "observation": {
      "ru": "Высший клерикальный орган Ирана призвал пересмотреть ядерную доктрину, МАГАТЭ подняло тревогу из-за объекта обогащения, который никогда не инспектировало, а Нетаньяху заявил, что Иран стремится возродить программу. На 19 ноября анонсирована трёхсторонняя встреча Трампа, Путина и Си в Шэньчжэне с повесткой сокращения ядерных арсеналов. В окне не было публичной ядерной угрозы уровня прошлой недели — этот сигнал перенесён из недели 2026-11-08 с раскрытием в driverConfidence.",
      "en": "Iran’s top clerical body called for a nuclear doctrine review, the IAEA raised alarm over an enrichment plant it has never inspected, and Netanyahu said Iran seeks to revive its programme. A Trump–Putin–Xi trilateral meeting in Shenzhen on 19 November was announced with nuclear-arms reductions on the agenda. No public nuclear threat of last week’s level appeared in the window — that signal is carried over from 2026-11-08 with disclosure in driverConfidence."
    },
    "why": {
      "ru": "Смена доктрины (Д2.2), технические сигналы (Д2.3) и возвращение к переговорам об арсеналах (Д2.5); эскалационная риторика — перенос (Д2.1).",
      "en": "Doctrine change (D2.2), technical signals (D2.3) and a return to talks on arsenals (D2.5); escalation rhetoric is carried over (D2.1)."
    },
    "contribution": "high",
    "confidence": "medium",
    "sources": [
      {
        "id": "iranintl-doctrine-review",
        "title": {
          "ru": "Высший клерикальный орган Ирана призвал пересмотреть ядерную доктрину",
          "en": "Iran's top clerical governing body calls for nuclear doctrine review"
        },
        "domain": "iranintl.com",
        "url": "https://www.iranintl.com/en/202611121701",
        "publication_date": "2026-11-12",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "iranintl-iaea-alarm",
        "title": {
          "ru": "МАГАТЭ встревожено объектом обогащения в Иране, который никогда не инспектировало",
          "en": "IAEA raises alarm over Iranian enrichment plant it has never inspected"
        },
        "domain": "iranintl.com",
        "url": "https://www.iranintl.com/en/202611133720",
        "publication_date": "2026-11-13",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      },
      {
        "id": "reportaz-netanyahu-nuclear",
        "title": {
          "ru": "Нетаньяху: Иран стремится возродить ядерную программу",
          "en": "Netanyahu says Iran seeks to revive nuclear program"
        },
        "domain": "report.az",
        "url": "https://report.az/en/other-countries/netanyahu-says-iran-seeks-to-revive-nuclear-program",
        "publication_date": "2026-11-14",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "B-state-media",
        "state_affiliated": true,
        "origin": "collected-in-week"
      },
      {
        "id": "jpost-israel-fears-strike",
        "title": {
          "ru": "Израиль опасается внезапного удара США по Ирану на фоне ядерных переговоров",
          "en": "Israel fears surprise US strike on Iran as nuclear talks fuel concerns of escalation - analysis"
        },
        "domain": "jpost.com",
        "url": "https://www.jpost.com/middle-east/iran-news/article-914880",
        "publication_date": "2026-11-14",
        "accessed_date": "2026-11-15",
        "source_type": "secondary",
        "cluster_id": "A-mainstream",
        "state_affiliated": false,
        "origin": "collected-in-week"
      }
    ]
  }
];
})();
