window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["balkans"] = {
  "index": 71,
  "delta": 2,
  "status": "very",
  "background": false,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Сербия повысила уровень террористической угрозы после нападения на посольство Израиля; на этом фоне ФСБ сообщила, что США предупреждали Россию о готовящемся теракте в Москве.",
        "en": "Serbia raised its terrorist threat level after the attack on the Israeli embassy; against that backdrop the FSB said the US had warned Russia about an impending terrorist attack in Moscow."
      },
      "why": {
        "ru": "Террористическая угроза в Европе и предупреждения о терактах — сигнал Д7.2 в его невоенной форме.",
        "en": "Terrorist threat in Europe and attack warnings are a D7.2 signal in its non-military form."
      },
      "contribution": "medium",
      "confidence": "low",
      "sources": [
        {
          "id": "balkaninsight-serbia-alert",
          "title": {
            "ru": "Сербия повысила уровень террористической угрозы после нападения на посольство Израиля",
            "en": "Serbia raises terror alert after attack on Israeli embassy"
          },
          "domain": "balkaninsight.com",
          "url": "https://balkaninsight.com/2026/10/28/serbia-raises-terror-alert-after-attack-on-israeli-embassy/bi/",
          "publication_date": "2026-10-28",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "straits-fsb-us-warning",
          "title": {
            "ru": "ФСБ: США предупредили Россию о возможном теракте в Москве",
            "en": "FSB says US warned Russia of possible Moscow attack"
          },
          "domain": "straitstimes.com",
          "url": "https://www.straitstimes.com/world/europe/fsb-says-us-warned-russia-of-possible-moscow-attack",
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
        "ru": "Фон для региона — нефтяной шок и гибель судов: в Ормузском проливе горит танкер, Brent подошёл к $120.",
        "en": "The backdrop for the region is an oil shock and ships lost: a tanker is burning in the Strait of Hormuz and Brent approached $120."
      },
      "why": {
        "ru": "Собственных сигналов в окне недели мало (Д7.2 — единственная атрибуция), поэтому запись опирается на экономический канал Д4.6 и помечена пониженной уверенностью.",
        "en": "There are few signals of its own in the week window (D7.2 is the only attribution), so the entry rests on the D4.6 economic channel and is marked as low confidence."
      },
      "contribution": "low",
      "confidence": "low",
      "sources": [
        {
          "id": "danas-hormuz-tanker-fire",
          "title": {
            "ru": "В Ормузском проливе горит танкер",
            "en": "Oil tanker on fire in the Strait of Hormuz"
          },
          "domain": "danas.rs",
          "url": "https://www.danas.rs/svet/gori-tanker-u-ormuskom-moreuzu/",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "oilprice-brent-120",
          "title": {
            "ru": "Нефтетрейдеры готовятся к волатильной неделе: Brent приближается к $120",
            "en": "Oil traders brace for a wild week as Brent approaches $120"
          },
          "domain": "oilprice.com",
          "url": "https://oilprice.com/Energy/Oil-Prices/Oil-Traders-Brace-for-a-Wild-Week-as-Brent-Approaches-120.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "F-financial",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
})();
