window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
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
})();
