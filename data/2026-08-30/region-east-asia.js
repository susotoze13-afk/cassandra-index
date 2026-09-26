window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  // Редакционный сид региона east-asia (неделя 2026-08-30, R55): два драйвера региона.
  // Источники — verbatim-записи из calc/input/2026-08-30.json. index/delta/status
  // пересчитываются пайплайном; confidence — редакционная.
  s.regions["east-asia"] = {
  "index": 60,
  "delta": 8,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "Вблизи границы прошли учения необычного масштаба, сообщает DW; CrisisWatch фиксирует эскалацию вокруг систем противовоздушной обороны.",
        "en": "Drills of unusual scale took place near the border, DW reports; CrisisWatch records escalation around air defence systems."
      },
      "why": {
        "ru": "Плотность учений и передислокация средств ПВО сокращают время реакции сторон и повышают цену ошибки.",
        "en": "The density of drills and the redeployment of air-defence assets shorten reaction time and raise the cost of a mistake."
      },
      "contribution": "medium",
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
          "id": "crisisgroup-crisiswatch-air-defence-2026-08-28",
          "title": {
            "ru": "CrisisWatch: обзор эскалации вокруг ПВО",
            "en": "CrisisWatch: air defence escalation overview"
          },
          "domain": "crisisgroup.org",
          "url": "https://www.crisisgroup.org/crisiswatch/air-defence",
          "publication_date": "2026-08-28",
          "accessed_date": "2026-09-26",
          "source_type": "secondary",
          "cluster_id": "C-registries",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Reuters опубликовал спутниковый анализ пограничных перемещений и столкновений; Associated Press ведёт мониторинг пограничных столкновений.",
        "en": "Reuters published satellite analysis of border movements and clashes; the Associated Press monitors border clashes."
      },
      "why": {
        "ru": "Сопоставление спутниковых и полевых наблюдений позволяет отличить рутинную активность от подготовки к эскалации.",
        "en": "Combining satellite and field observations helps distinguish routine activity from escalation preparation."
      },
      "contribution": "low",
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
    }
  ]
};
})();
