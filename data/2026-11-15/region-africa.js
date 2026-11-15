window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.regions["africa"] = {
  "index": 71.2,
  "delta": 2.1,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "В ДР Конго не менее 44 человек погибли при атаке боевиков, связанных с ИГ; в Судане нормой стали дальнобойные удары.",
        "en": "At least 44 people were killed in DR Congo in an attack by Islamic State-linked gunmen; long-range strikes are now the norm in Sudan."
      },
      "why": {
        "ru": "Боевые действия и удары по населённым пунктам (Д1.4).",
        "en": "Combat and strikes on populated areas (D1.4)."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "africanews-drc-44",
          "title": {
            "ru": "ДР Конго: не менее 44 погибших при атаке боевиков, связанных с ИГ",
            "en": "DR Congo: At least 44 dead in attack by Islamic State-linked gunmen"
          },
          "domain": "africanews.com",
          "url": "http://www.africanews.com/2026/11/14/dr-congo-at-least-44-dead-in-attack-by-islamic-state-linked-gunmen/",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "un-sudan-long-range",
          "title": {
            "ru": "Судан: после дронов-камикадзе нормой стали дальнобойные удары",
            "en": "Sudan war: First ‘suicide’ drone attacks, now long-range strikes are the norm"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/feed/view/en/story/2026/11/1168771",
          "publication_date": "2026-11-10",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Эфиопия и Эритрея обменялись ударами дронов и артиллерии, Аддис-Абеба обвиняет Асмэру в поддержке наступления тиграйских повстанцев; 64 тыс. человек бежали из Нигерии в Нигер.",
        "en": "Ethiopia and Eritrea exchanged drone and artillery strikes, Addis Ababa accuses Asmara of backing a Tigray rebel offensive; 64,000 fled Nigeria for Niger."
      },
      "why": {
        "ru": "Новый фронт и эвакуация населения (Д7.1, Д6.2).",
        "en": "A new front and population displacement (D7.1, D6.2)."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "aa-ethiopia-eritrea",
          "title": {
            "ru": "Эфиопия и Эритрея обменялись ударами дронов и артиллерии",
            "en": "Ethiopia, Eritrea reportedly exchange drone, artillery strikes as border fighting intensifies"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/africa/ethiopia-eritrea-reportedly-exchange-drone-artillery-strikes-as-border-fighting-intensifies/4124999",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        },
        {
          "id": "un-nigeria-64k",
          "title": {
            "ru": "Почти 64 тыс. человек бежали из Нигерии в Нигер",
            "en": "Nearly 64,000 flee Nigeria for Niger where a humanitarian crisis is deepening"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/feed/view/en/story/2026/11/1168779",
          "publication_date": "2026-11-10",
          "accessed_date": "2026-11-15",
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
