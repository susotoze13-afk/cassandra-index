window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.regions["africa"] = {
  "index": 69.1,
  "delta": -3.8,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Судан распорядился закрыть консульство Эфиопии и дал дипломатам 48 часов на выезд; страны обменялись высылками дипломатов на фоне роста напряжённости.",
        "en": "Sudan ordered the closure of Ethiopia's consulate and gave diplomats 48 hours to leave; the two countries exchanged expulsions of diplomats as tensions rose."
      },
      "why": {
        "ru": "Разрыв дипломатических каналов (Д3.1 = 1) — эскалационный сигнал региона.",
        "en": "Breaking diplomatic channels (D3.1 = 1) is an escalation signal for the region."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "aacomtr-sudan-ethiopia-consulate",
          "title": {
            "ru": "Судан распорядился закрыть консульство Эфиопии и дал дипломатам 48 часов на выезд",
            "en": "Sudan orders closure of Ethiopian consulate, gives diplomats 48 hours to leave: Report"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/africa/sudan-orders-closure-of-ethiopian-consulate-gives-diplomats-48-hours-to-leave-report/4112032",
          "publication_date": "2026-11-04",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "aljazeera-sudan-ethiopia-expulsions",
          "title": {
            "ru": "Судан и Эфиопия закрыли консульства друг друга в ответном шаге",
            "en": "Sudan, Ethiopia shut each other’s consulates in tit-for-tat move: Reports"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/11/4/sudan-ethiopia-order-tit-for-tat-diplomatic-expulsions",
          "publication_date": "2026-11-04",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "thenationalnews-sudan-ethiopia-expulsions",
          "title": {
            "ru": "Судан и Эфиопия обменялись высылками дипломатов на фоне роста напряжённости",
            "en": "Sudan and Ethiopia in retaliatory expulsions of diplomats as tensions rise"
          },
          "domain": "thenationalnews.com",
          "url": "https://www.thenationalnews.com/news/mena/2026/11/05/sudan-and-ethiopia-in-tit-for-tat-expulsions-of-diplomats-as-tensions-rise/",
          "publication_date": "2026-11-05",
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
        "ru": "Уганда начала вывод войск из Сомали после 20 лет присутствия; глава миротворчества ООН предупреждает о вакууме безопасности при выводе «голубых касок» из Ливана и Западной Сахары.",
        "en": "Uganda began withdrawing troops from Somalia after 20 years, and the UN peacekeeping chief warns of a security vacuum as Blue Helmets leave Lebanon and Western Sahara."
      },
      "why": {
        "ru": "Свёртывание миротворческих миссий (Д7.4, Д8.3) снижает устойчивость региона.",
        "en": "The drawdown of peacekeeping missions (D7.4, D8.3) reduces the region's resilience."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "observer-uganda-somalia-withdrawal",
          "title": {
            "ru": "Уганда начала вывод войск из Сомали после 20 лет присутствия",
            "en": "Uganda begins to withdraw troops from Somalia after 20 years"
          },
          "domain": "observer.ug",
          "url": "https://observer.ug/news/uganda-begins-to-withdraw-troops-from-somalia-after-20-years/",
          "publication_date": "2026-11-02",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "un-news-peacekeeping-vacuum",
          "title": {
            "ru": "Глава миротворчества ООН предупреждает о «вакууме безопасности» при выводе «голубых касок» из Ливана и Западной Сахары",
            "en": "UN peacekeeping chief warns of 'security vacuum' as Blue Helmets leave Lebanon and Western Sahara"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/en/story/2026/11/1168741",
          "publication_date": "2026-11-04",
          "accessed_date": "2026-11-08",
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
