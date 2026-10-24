window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-11"] = window.CI_DATA.snapshots["2026-10-11"] || {};
  s.regions["africa"] = {
  "index": 59,
  "delta": 13,
  "status": "danger",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "08.10 Эфиопия нанесла дроновый удар по эритрейским войскам, вошедшим в Тыграй — Африканский Рог вернулся к открытому конфликту после дипломатического разрыва Эритреи с Эфиопией 01.10.",
        "en": "On 08.10 Ethiopia launched a drone attack against Eritrean troops who crossed into Tigray — the Horn of Africa returned to open conflict after Eritrea severed ties with Ethiopia on 01.10."
      },
      "why": {
        "ru": "Возобновление боевых действий в Тыграе с прямым вовлечением соседнего государства расширяет региональный конфликт.",
        "en": "The resumption of fighting in Tigray with direct involvement of a neighbouring state widens the regional conflict."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "guardian-ethiopia-drone-eritrea-tigray",
          "title": {
            "ru": "Эфиопия нанесла дроновый удар по эритрейским войскам, вошедшим в Тыграй",
            "en": "Ethiopia launches drone attack against Eritrean troops who crossed into Tigray"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/world/2026/oct/08/ethiopia-drone-attack-against-eritrean-troops-in-tigray",
          "publication_date": "2026-10-08",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Возвращение Эфиопии к конфликту описывается как гражданская катастрофа, грозящая перерасти в региональный поликризис с вовлечением соседей по Африканскому Рогу.",
        "en": "Ethiopia's return to conflict is described as a civilian catastrophe threatening to spill over into a regional polycrisis involving Horn of Africa neighbours."
      },
      "why": {
        "ru": "Риск разрастания конфликта на соседние страны повышает вероятность более широкой региональной войны.",
        "en": "The risk of the conflict spreading to neighbouring countries raises the probability of a wider regional war."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "guardian-view-ethiopia-conflict",
          "title": {
            "ru": "Взгляд Guardian: возвращение Эфиопии к конфликту — гражданская катастрофа и региональный поликризис",
            "en": "The Guardian view on Ethiopia's return to conflict: civilian catastrophe and a spiralling regional polycrisis"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/commentisfree/2026/oct/08/the-guardian-view-on-ethiopias-return-to-conflict-civilian-catastrophe-and-a-spiralling-regional-polycrisis",
          "publication_date": "2026-10-08",
          "accessed_date": "2026-10-11",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
