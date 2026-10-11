window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-11"] = window.CI_DATA.snapshots["2026-10-11"] || {};
  s.regions["north-america"] = {
  "index": 52,
  "delta": 10,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "США ввели санкции против Международного уголовного суда; ЕС, группа стран и генсек ООН осудили решение и призвали его отменить.",
        "en": "The US imposed sanctions on the International Criminal Court; the EU, a group of states and the UN secretary-general condemned the move and urged its reversal."
      },
      "why": {
        "ru": "Санкции против международного суда подрывают институты правосудия и усиливают конфронтацию Вашингтона с союзниками.",
        "en": "Sanctions on an international court undermine judicial institutions and deepen Washington's confrontation with allies."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "state-icc-sanctions",
          "title": {
            "ru": "О введении санкций против Международного уголовного суда",
            "en": "Imposing Sanctions on the International Criminal Court"
          },
          "domain": "state.gov",
          "url": "https://www.state.gov/releases/office-of-the-spokesman/2026/10/imposing-sanctions-on-the-international-criminal-court/",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": true
        },
        {
          "id": "nyt-icc-sanctions",
          "title": {
            "ru": "Администрация Трампа вводит жёсткие санкции против Международного уголовного суда",
            "en": "Trump administration hits International Criminal Court with severe sanctions"
          },
          "domain": "nytimes.com",
          "url": "https://www.nytimes.com/2026/10/09/us/politics/trump-international-criminal-court-sanctions.html",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-eu-urges-icc-reversal",
          "title": {
            "ru": "ЕС призывает США отменить последние санкции против МКС",
            "en": "EU urges US to reverse latest sanctions targeting ICC"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/eu-urges-us-to-reverse-latest-sanctions-targeting-icc-/4084422",
          "publication_date": "2026-10-10",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "Трамп объявил о сделке по закупке российского дизеля и приостановке топливных санкций, а также заявил, что Украине нужен «новый лидер». Отдельно Госдеп одобрил поставки вооружений Египту, Кувейту и ОАЭ на 2,27 млрд долларов.",
        "en": "Trump announced a deal to buy Russian diesel and a suspension of fuel sanctions, and said Ukraine needs a 'new leader'. Separately, the State Department approved $2.27bn in arms sales to Egypt, Kuwait and the UAE."
      },
      "why": {
        "ru": "Энергетическая сделка с Москвой и политическое давление на Киев меняют американскую вовлечённость в войну и мировую конфигурацию риска.",
        "en": "The energy deal with Moscow and political pressure on Kyiv change US involvement in the war and the global risk configuration."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "guardian-trump-putin-russian-diesel",
          "title": {
            "ru": "Зеленский в ярости: Трамп объявил о сделке по закупке российского дизеля",
            "en": "Zelenskyy furious as Trump announces deal to buy Russian diesel"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/us-news/2026/oct/09/trump-putin-russian-diesel-ukraine",
          "publication_date": "2026-10-09",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "aa-us-arms-sales-egypt-kuwait-uae",
          "title": {
            "ru": "Госдеп США одобрил продажи вооружений Египту, Кувейту и ОАЭ на 2,27 млрд долларов",
            "en": "US State Department approves arms sales worth $2.27B to Egypt, Kuwait, UAE"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/americas/us-state-department-approves-arms-sales-worth-227b-to-egypt-kuwait-uae/4078826",
          "publication_date": "2026-10-05",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
})();
