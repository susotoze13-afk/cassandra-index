window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.regions["south-asia"] = {
  "index": 0,
  "delta": 0,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "США ввели санкции против индийских и турецких компаний и лиц за помощь Ирану; отдельный пакет — против индийского бизнесмена, его жены и девяти связанных с Индией компаний из-за иранского нефтяного экспорта.",
        "en": "The US sanctioned Indian and Turkish firms and people for aiding Iran, and a separate package targeted an Indian businessman, his wife and nine India-linked entities over Iran's oil exports."
      },
      "why": {
        "ru": "Санкции бьют по нефтяному экспорту и торговым связям региона (Д3.3, Д9.2).",
        "en": "The sanctions hit the region's oil exports and trade ties (D3.3, D9.2)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "thehindu-us-sanctions-indian-turkish-firms",
          "title": {
            "ru": "США ввели санкции против индийских и турецких компаний и лиц за помощь Ирану",
            "en": "U.S. slaps sanctions on Indian, Turkish firms and people for aiding Iran"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/us-slaps-sanctions-on-indian-turkish-firms-and-people-for-aiding-iran/article71668431.ece",
          "publication_date": "2026-11-05",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "indiatoday-iran-oil-sanctions",
          "title": {
            "ru": "США ввели санкции против индийского бизнесмена, его жены и девяти связанных с Индией компаний из-за иранского нефтяного экспорта",
            "en": "US sanctions Indian businessman, wife and nine India-linked entities over Iran oil exports"
          },
          "domain": "indiatoday.in",
          "url": "https://www.indiatoday.in/world/story/us-sanctions-indian-businessman-wife-and-nine-india-linked-entities-over-iran-oil-exports-3032570-2026-11-05",
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
        "ru": "Андхра-Прадеш предостерегает молодёжь от «заманчивых предложений работы» в российской армии; в самой Украине мобилизацию критикуют как источник злоупотреблений.",
        "en": "Andhra Pradesh cautions young people against \"lucrative job offers\" in the Russian army, while in Ukraine mobilisation itself is criticised as a source of abuse."
      },
      "why": {
        "ru": "Вербовка в чужую армию (Д6.1) — канал, через который конфликт доходит до региона.",
        "en": "Recruitment into a foreign army (D6.1) is a channel through which the conflict reaches the region."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "thehindu-andhra-russian-army-jobs",
          "title": {
            "ru": "Андхра-Прадеш предостерегает молодёжь от «заманчивых предложений работы» в российской армии",
            "en": "Andhra Pradesh cautions youth against ‘lucrative job offers’ in Russian army"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/cities/Visakhapatnam/andhra-pradesh-cautions-youth-against-lucrative-job-offers-in-russian-army/article71665678.ece",
          "publication_date": "2026-11-04",
          "accessed_date": "2026-11-08",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "iz-mendel-ukraine-mobilization",
          "title": {
            "ru": "Мендель назвал мобилизацию на Украине источником пыток и взяток",
            "en": "Mendel called the mobilization on Ukraine a source of torture and bribes"
          },
          "domain": "iz.ru",
          "url": "https://iz.ru/en/node/2195392",
          "publication_date": "2026-11-03",
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
