window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  // Редакционный сид региона south-asia (неделя 2026-09-13, R55): два драйвера региона.
  // Источники — verbatim-записи из calc/input/2026-09-13.json. index/delta/status
  // пересчитываются пайплайном; confidence — редакционная.
  s.regions["south-asia"] = {
  "index": 60,
  "delta": 2,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "В России впервые не выпустили за границу военнообязанного запаса по решению военкомата — подтверждено тремя независимыми изданиями; Зеленский заявляет о планах России привлечь ещё около 300 тысяч военнослужащих.",
        "en": "Russia for the first time barred a reservist from leaving the country by a draft-board decision, confirmed by three independent outlets; Zelensky says Russia plans to recruit about 300,000 more troops."
      },
      "why": {
        "ru": "Наращивание мобилизационного ресурса меняет долгосрочный баланс сил в регионе и влияет на расчёты соседей.",
        "en": "Expanding the mobilisation resource changes the long-term balance of power in the region and shapes neighbours’ calculations."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "ru-themoscowtimes-com-zapasnik-vyezd-a205473",
          "title": {
            "ru": "В России начали ограничивать выезд запасников за границу по решению военкоматов",
            "en": "Russia begins restricting reservists' exit from country by military commissariat decisions"
          },
          "domain": "ru.themoscowtimes.com",
          "url": "https://ru.themoscowtimes.com/2026/09/07/v-rossii-nachali-ogranichivat-viezd-zapasnikov-za-granitsu-po-resheniyu-voenkomatov-a205473",
          "publication_date": "2026-09-07",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "nv-ua-zapret-vyezda-zapasniku-50639309",
          "title": {
            "ru": "В России впервые не выпустили за границу военнообязанного запаса по решению военкомата",
            "en": "Russia for first time bars military reservist from leaving country by military commissariat decision"
          },
          "domain": "nv.ua",
          "url": "https://nv.ua/world/countries/mobilizaciya-v-rossii-vpervye-voennoobyazannomu-zapasa-zapretili-vyezd-po-resheniyu-voenkomata-50639309.html",
          "publication_date": "2026-09-07",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "24tv-ua-mobilizacija-300-tysjach-n3138153",
          "title": {
            "ru": "Зеленский заявил о планах России привлечь ещё 300 тысяч военнослужащих",
            "en": "Zelensky says Russia plans to bring in 300,000 more troops"
          },
          "domain": "24tv.ua",
          "url": "https://24tv.ua/ru/mobilizacija-v-rossii-v-sentjabre-2026-goda-rossija-planiruet-otpravit-na-front-300-tysjach-chelovek_n3138153",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Цены на бензин в российских регионах стабилизировались, очереди на заправках сокращаются; мировые нефтяные цены при этом растут.",
        "en": "Petrol prices in Russian regions stabilised and queues at filling stations are shrinking; global oil prices are rising meanwhile."
      },
      "why": {
        "ru": "Разнонаправленные сигналы на топливных рынках удерживают неопределённость для импортозависимых экономик Южной Азии.",
        "en": "Mixed signals in fuel markets keep uncertainty high for import-dependent South Asian economies."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "mentoday-ru-benzin-azs-2026-09-08",
          "title": {
            "ru": "Цены устаканились, очереди на АЗС сокращаются: что происходит с бензином в регионах и что будет осенью",
            "en": "Fuel prices stabilise, gas station queues shrink: what is happening with petrol in Russian regions"
          },
          "domain": "mentoday.ru",
          "url": "https://www.mentoday.ru/life/news/08-09-2026/ceny-ustakanilis-ocheredi-na-azs-sokrashchayutsya-chto-proishodit-s-benzinom-v-regionah-i-chto-budet-osenyu/",
          "publication_date": "2026-09-08",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "sergeytereshkin-co-uk-oil-gas-news-2026-09-12",
          "title": {
            "ru": "Нефтегазовые новости, 12 сентября 2026: Brent выше $100 после роста на 7%, дизель в США дороже $6",
            "en": "Oil and Gas News, Saturday 12 September 2026: Brent ends week above $100 after 7% rise, US diesel over $6"
          },
          "domain": "sergeytereshkin.co.uk",
          "url": "https://sergeytereshkin.co.uk/publications/oil-and-gas-news-saturday-12-september-2026-brent-ends-week-above-100-diesel-in-usa-over-6-iea-reports-largest-demand-decline-since-2020",
          "publication_date": "2026-09-12",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
