window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["north-america"] = {
  "index": 72,
  "delta": 0,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Трамп говорит, что США готовы ударить по ядерной программе Ирана «за десять минут», Рубио — что решения о новых ударах пока нет; авианосцы остаются в регионе, союзники в Заливе пересматривают оборонные расходы.",
        "en": "Trump says the US is ready to strike Iran's nuclear programme \"in ten minutes\", while Rubio says no decision on new strikes has been made; carriers remain in the region and Gulf allies are revisiting defence spending."
      },
      "why": {
        "ru": "Публичная угроза удара и одновременно отказ подтвердить решение — сигнал Д5.1 и Д3.2 с высокой неопределённостью.",
        "en": "A public strike threat combined with a refusal to confirm a decision is a D5.1 and D3.2 signal with high uncertainty."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "jpost-trump-ten-minutes",
          "title": {
            "ru": "Трамп: США готовы ударить по ядерной программе Ирана «за десять минут»",
            "en": "Trump says US ready to hit Iran's nuclear program 'in ten minutes'"
          },
          "domain": "jpost.com",
          "url": "https://www.jpost.com/middle-east/iran-news/article-913424",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "hindu-rubio-iran-strikes",
          "title": {
            "ru": "Рубио: США пока не решили, наносить ли новые удары по Ирану",
            "en": "Rubio says U.S. yet to decide on new Iran strikes"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/rubio-says-us-yet-to-decide-on-new-iran-strikes/article71651951.ece",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "twz-carriers-oct27",
          "title": {
            "ru": "Где авианосцы: 27 октября 2026 года",
            "en": "Where are the aircraft carriers: October 27, 2026"
          },
          "domain": "twz.com",
          "url": "https://www.twz.com/sea/where-are-the-aircraft-carriers-october-27-2026",
          "publication_date": "2026-10-27",
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
        "ru": "Уолл-стрит пережила худший день с июня, Минфин объявил ставку Series I bond 5,51 % на полгода, Brent подошёл к $120; ФБР обвинило КНДР в краже $6,3 млрд у Binance.",
        "en": "Wall Street had its worst day since June, the Treasury set the Series I bond rate at 5.51 % for six months, Brent approached $120, and the FBI blamed North Korea for the $6.3bn Binance theft."
      },
      "why": {
        "ru": "Рыночный стресс (Д4.6) и киберфинансирование ядерной программы КНДР (Д5.2) — внутренние каналы, через которые война приходит в США.",
        "en": "Market stress (D4.6) and cyber-funding of North Korea's nuclear programme (D5.2) are the channels through which the war reaches the US."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "cbc-stocks-sink",
          "title": {
            "ru": "Североамериканские акции падают: Уолл-стрит пережила худший день с июня",
            "en": "North American stocks sink, Wall Street suffers worst day since June"
          },
          "domain": "cbc.ca",
          "url": "https://www.cbc.ca/news/business/tech-stocks-markets-oct-30-9.7403226?cmp=rss",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "cnbc-i-bond-rate",
          "title": {
            "ru": "Минфин США объявил ставку Series I bond 5,51 % на полгода",
            "en": "Treasury Department announces new Series I bond rate of 5.51%"
          },
          "domain": "cnbc.com",
          "url": "https://www.cnbc.com/2026/10/30/treasury-i-bond-rate-through-april-2027.html",
          "publication_date": "2026-10-30",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "straits-fbi-binance",
          "title": {
            "ru": "ФБР обвинило КНДР в краже $6 млрд у Binance",
            "en": "FBI blames North Korea for US$6 billion Binance crypto hack"
          },
          "domain": "straitstimes.com",
          "url": "https://www.straitstimes.com/world/united-states/fbi-blames-north-korea-for-us6-billion-binance-crypto-hack",
          "publication_date": "2026-10-31",
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
