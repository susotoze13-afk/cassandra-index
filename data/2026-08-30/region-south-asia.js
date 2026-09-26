window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.regions["south-asia"] = {
  "index": 51,
  "delta": -7,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Reuters опубликовал спутниковый анализ пограничных перемещений и столкновений в приграничных округах; Associated Press ведёт независимый мониторинг пограничных столкновений.",
        "en": "Reuters published satellite analysis of border movements and clashes in border districts; the Associated Press runs independent monitoring of border clashes."
      },
      "why": {
        "ru": "Сосредоточение сил в пограничных округах сокращает время реакции сторон и повышает риск локального столкновения.",
        "en": "The concentration of forces in border districts shortens reaction time and raises the risk of a local clash."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "reuters-satellite-border-analysis-2026-08-27",
          "title": {
            "ru": "Reuters: спутниковый анализ пограничных перемещений и столкновений",
            "en": "Reuters: satellite analysis of border movements and clashes"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/satellite-border-analysis",
          "publication_date": "2026-08-27",
          "accessed_date": "2026-09-26",
          "source_type": "OSINT",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "apnews-border-clashes-monitoring-2026-08-28",
          "title": {
            "ru": "AP: мониторинг пограничных столкновений",
            "en": "AP: border clashes monitoring"
          },
          "domain": "apnews.com",
          "url": "https://apnews.com/article/border-clashes-monitoring",
          "publication_date": "2026-08-28",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "DW сообщает об учениях необычного масштаба вблизи границы; мониторинг пограничных столкновений в регионе продолжается.",
        "en": "DW reports drills of unusual scale near the border; monitoring of border clashes in the region continues."
      },
      "why": {
        "ru": "Одновременные учения и живой мониторинг в соседних азиатских театрах удерживают фоновую напряжённость региона.",
        "en": "Simultaneous drills and active monitoring in neighbouring Asian theatres keep the region’s background tension elevated."
      },
      "contribution": "low",
      "confidence": "medium",
      "sources": [
        {
          "id": "dw-large-scale-drills-2026-08-29",
          "title": {
            "ru": "DW: учения необычного масштаба вблизи границы",
            "en": "DW: large-scale drills near the border"
          },
          "domain": "dw.com",
          "url": "https://www.dw.com/en/large-scale-drills/a-700001",
          "publication_date": "2026-08-29",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": true
        },
        {
          "id": "apnews-border-clashes-monitoring-2026-08-28",
          "title": {
            "ru": "AP: мониторинг пограничных столкновений",
            "en": "AP: border clashes monitoring"
          },
          "domain": "apnews.com",
          "url": "https://apnews.com/article/border-clashes-monitoring",
          "publication_date": "2026-08-28",
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
