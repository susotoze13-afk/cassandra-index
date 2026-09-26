window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  // Редакционный сид региона east-asia (неделя 2026-09-06, R55): два драйвера региона.
  // Источники — verbatim-записи из calc/input/2026-09-06.json. index/delta/status
  // пересчитываются пайплайном; confidence — редакционная.
  s.regions["east-asia"] = {
  "index": 60,
  "delta": 8,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Южная Корея заявила в ООН, что сотрудничество России и КНДР затягивает войну против Украины; тема связки Москвы и Пхеньяна прозвучала на площадке Организации Объединённых Наций.",
        "en": "South Korea told the UN that Russia-DPRK cooperation is prolonging the war against Ukraine; the Moscow-Pyongyang alignment was raised at the United Nations."
      },
      "why": {
        "ru": "Публичная фиксация военной связки в ООН повышает цену северокорейской поддержки России и усиливает внимание к региону.",
        "en": "Publicly recording the military alignment at the UN raises the cost of North Korea’s support for Russia and sharpens focus on the region."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "zn-ua-south-korea-un-rf-dprk",
          "title": {
            "ru": "Южная Корея заявила в ООН, что сотрудничество между РФ и КНДР затягивает войну в Украине",
            "en": "South Korea tells UN that Russia-DPRK cooperation prolongs the war in Ukraine"
          },
          "domain": "zn.ua",
          "url": "https://zn.ua/war/juzhnaja-koreja-zajavila-v-oon-chto-sotrudnichestvo-mezhdu-rf-i-kndr-zatjahivaet-vojnu-v-ukraine.html",
          "publication_date": "2026-09-02",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "apostrophe-ua-south-korea-un-rf-dprk",
          "title": {
            "ru": "Россия и КНДР затягивают войну против Украины: заявление Южной Кореи в ООН",
            "en": "Russia and North Korea prolonging war against Ukraine: South Korea's statement at UN"
          },
          "domain": "apostrophe.ua",
          "url": "https://apostrophe.ua/ru/politics/foreign-policy/rossija-i-kndr-zatjahivajut-vojnu-protiv-ukrainy-zajavlenie-juzhnoj-korei-v-oon-.html",
          "publication_date": "2026-09-02",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "6 сентября в России произошёл массовый сбой интернета; среди причин названы учения по автономности Рунета; мобильный интернет работал нестабильно.",
        "en": "On 6 September a mass internet outage hit Russia; exercises of the Runet’s autonomy were named among the causes; mobile internet was unstable."
      },
      "why": {
        "ru": "Контроль и автономность цифровой инфраструктуры — признак подготовки к устойчивой работе в условиях длительной конфронтации, за которой наблюдают и азиатские столицы.",
        "en": "Control and autonomy of digital infrastructure signals preparation for resilient operation during prolonged confrontation, watched closely by Asian capitals."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "techora-mass-internet-shutdown-september-6",
          "title": {
            "ru": "6 сентября: массовый сбой интернета в России — учения автономности Рунета",
            "en": "6 September: mass internet outage across Russia during Runet autonomy exercises"
          },
          "domain": "techora.ru",
          "url": "https://techora.ru/news/6-sentyabrya-massovyy-sboy-interneta-v-2026-09-06",
          "publication_date": "2026-09-06",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "news-ru-mobile-internet-september-6",
          "title": {
            "ru": "Почему не работает мобильный интернет 6 сентября: причины сбоев в России",
            "en": "Why mobile internet is down on 6 September: causes of outages in Russia"
          },
          "domain": "news.ru",
          "url": "https://news.ru/society/pochemu-ne-rabotaet-mobilnyj-internet-6-sentyabrya-prichiny-sboi-v-rossii",
          "publication_date": "2026-09-06",
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
