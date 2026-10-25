window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
  s.regions["africa"] = {
  "index": 72,
  "delta": 6,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Судан: удары дронов убили не менее 306 человек за три недели, война перекинулась в Центральноафриканскую Республику, ООН предупреждает против преждевременного вывода миротворцев.",
        "en": "Sudan: drone strikes killed at least 306 people in three weeks, the war has spilled into the Central African Republic, and the UN warns against a premature peacekeeper withdrawal."
      },
      "why": {
        "ru": "Дроновая война и региональное распространение делают Судан устойчивым источником насилия.",
        "en": "Drone warfare and regional spillover make Sudan a persistent source of violence."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "un-sudan-drones-1023",
          "title": {
            "ru": "Судан: удары дронов убили не менее 306 человек за три недели",
            "en": "Sudan: Drone strikes killed at least 306 people in three weeks"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/feed/view/en/story/2026/10/1168661",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "un-car-spillover-1020",
          "title": {
            "ru": "ООН предупреждает против преждевременного вывода миротворцев: война в Судане перекинулась в ЦАР",
            "en": "As Sudan war spills into Central African Republic, UN warns against early peacekeeper exit"
          },
          "domain": "news.un.org",
          "url": "https://news.un.org/feed/view/en/story/2026/10/1168630",
          "publication_date": "2026-10-20",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "icrc-ethiopia-1020",
          "title": {
            "ru": "Эфиопия: МККК реагирует на возобновившиеся боевые действия на севере",
            "en": "Ethiopia: ICRC responds to humanitarian needs amid renewed hostilities in the north"
          },
          "domain": "icrc.org",
          "url": "https://www.icrc.org/en/article/ethiopia-icrc-responds-humanitarian-needs-amid-renewed-hostilities-north-ethiopia",
          "publication_date": "2026-10-20",
          "accessed_date": "2026-10-25",
          "source_type": "primary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Сахель и Африканский Рог: в Мали число погибших при нападении выросло до 54, в Эфиопии возобновились боевые действия на севере, МККК наращивает помощь.",
        "en": "The Sahel and the Horn: the death toll from an attack in Mali rose to 54, hostilities resumed in northern Ethiopia, and the ICRC is scaling up aid."
      },
      "why": {
        "ru": "Одновременные вспышки насилия в Сахеле и Эфиопии истощают гуманитарные возможности региона.",
        "en": "Simultaneous outbreaks of violence in the Sahel and Ethiopia strain the region’s humanitarian capacity."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "hindu-mali-1025",
          "title": {
            "ru": "Власти Мали подняли до 54 число погибших при нападении на северо-востоке",
            "en": "Military ups death toll in Mali attack to 54"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/military-ups-death-toll-in-mali-attack-to-54/article71622485.ece",
          "publication_date": "2026-10-25",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "icrc-ethiopia-1020",
          "title": {
            "ru": "Эфиопия: МККК реагирует на возобновившиеся боевые действия на севере",
            "en": "Ethiopia: ICRC responds to humanitarian needs amid renewed hostilities in the north"
          },
          "domain": "icrc.org",
          "url": "https://www.icrc.org/en/article/ethiopia-icrc-responds-humanitarian-needs-amid-renewed-hostilities-north-ethiopia",
          "publication_date": "2026-10-20",
          "accessed_date": "2026-10-25",
          "source_type": "primary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
