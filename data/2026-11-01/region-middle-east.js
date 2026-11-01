window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["middle-east"] = {
  "index": 80,
  "delta": 2,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Ормуз парализован: четвёртый танкер взорвался на мине, КСИР остановил два танкера, США атаковали два иранских рыболовных судна у Кешма, Оман спас 25 человек с горящего судна. Верховный лидер Ирана обещает «ответ без географических ограничений», армия предупреждает о расширении войны.",
        "en": "Hormuz is paralysed: a fourth tanker exploded on a mine, the IRGC stopped two tankers, the US struck two Iranian fishing boats near Qeshm, and Oman rescued 25 people from a burning vessel. Iran's supreme leader promises a response \"without geographic limits\" and the army warns of a wider war."
      },
      "why": {
        "ru": "Для региона это прямой сигнал по Д1.5, Д4.4 и Д5.1: боевые действия идут на его собственных морских путях.",
        "en": "For the region this is a direct signal across D1.5, D4.4 and D5.1: the fighting is on its own sea lanes."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "mehrnews-fourth-tanker",
          "title": {
            "ru": "Четвёртый танкер взорвался на мине в Ормузском проливе",
            "en": "Fourth tanker explodes after hitting mine in Hormuz Strait"
          },
          "domain": "en.mehrnews.com",
          "url": "https://en.mehrnews.com/news/249039/4th-violating-tanker-catches-fire-in-Hormuz-IRGC-Navy",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "gcaptain-limpet-mines",
          "title": {
            "ru": "Танкер подорван на прикреплённых минах в Ормузском проливе: новая угроза судоходству",
            "en": "Tanker hit by limpet mines in Strait of Hormuz as new threat to shipping emerges"
          },
          "domain": "gcaptain.com",
          "url": "https://gcaptain.com/tanker-hit-by-limpet-mines-in-strait-of-hormuz-as-new-threat-to-shipping-emerges/",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "straits-oman-rescue",
          "title": {
            "ru": "Оман спас 25 человек с горящего судна; Иран остановил танкеры",
            "en": "Oman rescues 25 from burning ship, Iran halts tankers"
          },
          "domain": "straitstimes.com",
          "url": "https://www.straitstimes.com/world/middle-east/oman-rescues-25-from-burning-ship-iran-halts-tankers",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Хуситы сообщили об ударах по нефтеперерабатывающим заводам и аэропортам Саудовской Аравии, коалиция сбила беспилотник над Восточной провинцией; США велели неэкстренным сотрудникам покинуть страну, иранские переговорщики в Дохе обсуждают передачу урана и открытие Ормуза.",
        "en": "The Houthis reported strikes on Saudi refineries and airports, the coalition downed a drone over the Eastern Province; the US told non-emergency staff to leave the country, and Iranian negotiators in Doha discuss uranium transfer and reopening Hormuz."
      },
      "why": {
        "ru": "Удары по энергетике третьей страны и эвакуация персонала расширяют географию конфликта (Д6.2, Д7.2) и держат риск перебоев поставок.",
        "en": "Strikes on a third country's energy sector and staff evacuations widen the conflict geography (D6.2, D7.2) and keep supply-disruption risk elevated."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "sputnik-houthis-refineries",
          "title": {
            "ru": "Хуситы сообщили об ударах по нефтеперерабатывающим заводам и аэропортам Саудовской Аравии",
            "en": "Houthis report attacks on oil refineries, airports in Saudi Arabia"
          },
          "domain": "sputnikglobe.com",
          "url": "https://sputnikglobe.com/20261030/houthis-report-attacks-on-oil-refineries-airports-in-saudi-arabia-1124977367.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "almonitor-coalition-drone-down",
          "title": {
            "ru": "Коалиция во главе с Саудовской Аравией сообщила об уничтожении беспилотника над Восточной провинцией",
            "en": "Saudi-led coalition says it downs drone over oil-rich Eastern Region"
          },
          "domain": "al-monitor.com",
          "url": "https://www.al-monitor.com/originals/2026/10/saudi-led-coalition-says-it-downs-drone-over-oil-rich-eastern-region",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "almonitor-us-staff-leave",
          "title": {
            "ru": "США велели неэкстренным сотрудникам покинуть Саудовскую Аравию из-за рисков безопасности",
            "en": "US orders non-emergency staff to leave Saudi Arabia over security risks"
          },
          "domain": "al-monitor.com",
          "url": "https://www.al-monitor.com/originals/2026/10/us-orders-non-emergency-staff-leave-saudi-arabia-over-security-risks",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
})();
