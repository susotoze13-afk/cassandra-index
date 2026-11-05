window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["eu-north-europe"] = {
  "index": 71.3,
  "delta": 3.9,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Энергетический шок: Европа всерьёз пересматривает сворачивание нефтепереработки, фрахт вышел из-под контроля, греческое контейнерное судно затонуло после атаки дрона у Болгарии, черноморские страны НАТО осудили перенос войны на коммерческое судоходство.",
        "en": "Energy shock: Europe is seriously reconsidering refinery closures, freight rates have spiralled, a Greek container ship sank after a drone attack off Bulgaria, and NATO Black Sea states condemned the spillover of war onto commercial shipping."
      },
      "why": {
        "ru": "Стоимость энергии и гибель судов у европейских берегов — прямой сигнал Д4.3, Д4.6 и Д9.3.",
        "en": "Energy costs and ships sinking off European shores are a direct D4.3, D4.6 and D9.3 signal."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "oilprice-refinery-rethink",
          "title": {
            "ru": "Европа всерьёз пересматривает сворачивание нефтепереработки",
            "en": "Europe is now seriously rethinking its oil refinery phase down"
          },
          "domain": "oilprice.com",
          "url": "https://oilprice.com/Energy/Crude-Oil/Europe-Is-Now-Seriously-Rethinking-Its-Oil-Refinery-Phase-Down.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "insjournal-greek-ship-sunk",
          "title": {
            "ru": "Греческое контейнерное судно затонуло после атаки дрона у Болгарии",
            "en": "Greek container ship sinks after drone attack off Bulgaria"
          },
          "domain": "insurancejournal.com",
          "url": "https://www.insurancejournal.com/news/international/2026/10/30/890853.htm",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "defensenews-black-sea-nations",
          "title": {
            "ru": "Черноморские страны НАТО осудили распространение войны на коммерческое судоходство",
            "en": "NATO's Black Sea nations decry Ukraine war spillover endangering commercial ship traffic"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/29/natos-black-sea-nations-decry-ukraine-war-spillover-endangering-commercial-ship-traffic/",
          "publication_date": "2026-10-29",
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
        "ru": "Перевооружение ускоряется: месячный выпуск крылатых ракет Destinus превысил довоенное годовое производство в Европе, Украина ждёт европейских компонентов для новой системы ПРО, польские МиГ-29 и боеприпасы для F-16, как сообщается, направлены в Украину.",
        "en": "Rearmament accelerates: Destinus' monthly cruise-missile output exceeded Europe's pre-war annual production, Ukraine awaits European components for its new air-defence system, and Polish MiG-29s and F-16 munitions reportedly went to Ukraine."
      },
      "why": {
        "ru": "Расширение военного производства и передача авиатехники — индикатор подготовки к длительной конфронтации (Д6.3, Д7.1).",
        "en": "Expanding military production and aircraft transfers indicate preparation for a prolonged confrontation (D6.3, D7.1)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "defensenews-destinus",
          "title": {
            "ru": "Месячный выпуск Destinus превысил довоенное годовое производство крылатых ракет в Европе",
            "en": "Destinus monthly output tops Europe's pre-war annual cruise missile production"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/29/destinus-monthly-output-tops-europes-pre-war-annual-cruise-missile-production/",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "defensenews-ukraine-freyja",
          "title": {
            "ru": "Украина завершила работу над новой системой ПРО и ждёт европейских компонентов",
            "en": "Ukraine completes work on new missile defense system, awaits European partner components"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/30/ukraine-completes-work-on-new-missile-defense-system-awaits-european-partner-components/",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "twz-polish-mig29",
          "title": {
            "ru": "Польские МиГ-29 и боеприпасы для F-16, как сообщается, направлены в Украину",
            "en": "Polish MiG-29s, F-16 cannon ammo reportedly headed to Ukraine"
          },
          "domain": "twz.com",
          "url": "https://www.twz.com/news-features/polish-mig-29s-f-16-cannon-ammo-reportedly-headed-to-ukraine-as-bitter-warsaw-kyiv-rift-heals",
          "publication_date": "2026-10-29",
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
