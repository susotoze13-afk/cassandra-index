window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.regions["east-asia"] = {
  "index": 0,
  "delta": 0,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Тайвань ожидает вторую партию реактивных систем HIMARS до конца года; USS Theodore Roosevelt прибыл в Сингапур перед выходом третьей авианосной группы на Ближний Восток.",
        "en": "Taiwan expects its second batch of HIMARS systems by the end of the year, and USS Theodore Roosevelt arrived in Singapore before the third carrier strike group reaches the Middle East."
      },
      "why": {
        "ru": "Поставки вооружений (Д7.1) и переброска сил в Индо-Пацифике — сигналы для региона.",
        "en": "Arms deliveries (D7.1) and force movements in the Indo-Pacific are signals for the region."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Третья авианосная группа идёт на Ближний Восток, а Германия отказывается от дальнейших поставок Patriot Украине — приоритеты поставок и дислокации перераспределяются.",
        "en": "The third carrier strike group is heading to the Middle East and Germany draws the line on further Patriot deliveries to Ukraine, so deployment and supply priorities are being redistributed."
      },
      "why": {
        "ru": "Перенос части сил из Индо-Пацифики (Д1.5) ослабляет присутствие у региона в пользу другого театра.",
        "en": "Moving part of the force out of the Indo-Pacific (D1.5) weakens the presence near the region in favour of another theatre."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
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
        }
      ]
    }
  ]
};
})();
