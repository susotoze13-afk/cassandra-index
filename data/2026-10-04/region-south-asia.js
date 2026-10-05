window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-04"] = window.CI_DATA.snapshots["2026-10-04"] || {};
  s.regions["south-asia"] = {
  "index": 42,
  "delta": -2,
  "status": "danger",
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "02.10 у границы погибли два пакистанских гражданина, и 03.10 Пакистан вызвал индийского поверенного в делах — стороны обменялись протестами на фоне устойчивой напряжённости между ядерными державами.",
        "en": "Two Pakistani civilians were killed at the border on 02.10, and on 03.10 Pakistan summoned India's chargé d'affaires — the sides exchanged protests amid persistent tension between nuclear powers."
      },
      "why": {
        "ru": "Пограничный инцидент с летальным исходом и дипломатический протест — сигнал на южноазиатском направлении, где отношения двух ядерных держав остаются хрупкими.",
        "en": "A lethal border incident with a diplomatic protest — a signal on the South Asian track, where relations between two nuclear powers remain fragile."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "aljazeera-pakistan-summons-indian-diplomat",
          "title": {
            "ru": "Пакистан вызвал индийского дипломата после убийства двух пакистанцев у границы",
            "en": "Pakistan summons Indian diplomat over border killing of two Pakistanis"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/news/2026/10/3/pakistan-summons-indian-diplomat-over-border-killing-of-two-pakistanis",
          "publication_date": "2026-10-03",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "mofa-pakistan-summons-indian-charge-daffaires",
          "title": {
            "ru": "Атташе по делам Индии вызван в МИД Пакистана в связи с убийством двух граждан",
            "en": "Indian Chargé d'Affaires Summoned over Killing of Two Pakistani Civilians"
          },
          "domain": "mofa.gov.pk",
          "url": "https://mofa.gov.pk/press-releases/indian-charge-daffaires-summoned-over-killing-of-two-pakistani-civilians",
          "publication_date": "2026-10-03",
          "accessed_date": "2026-10-04",
          "source_type": "primary",
          "cluster_id": "C-registries",
          "state_affiliated": true
        }
      ]
    },
    {
      "observation": {
        "ru": "01.10 Пакистан нанёс авиаудары по Афганистану, заявив о гибели 22 боевиков; Кабул сообщает о девяти погибших мирных жителях в Кунаре и Гельменде.",
        "en": "On 01.10 Pakistan struck Afghanistan, claiming 22 militants killed; Kabul reported nine civilian deaths in Kunar and Helmand."
      },
      "why": {
        "ru": "Государственные авиаудары по территории соседа продолжают двустороннюю войну Пакистан–Афганистан без деэскалации.",
        "en": "State airstrikes on a neighbour sustain the Pakistan–Afghanistan war with no de-escalation."
      },
      "contribution": "high",
      "confidence": "medium",
      "sources": [
        {
          "id": "reuters-com-pakistan-airstrikes-afghanistan",
          "title": {
            "ru": "Удары Пакистана по Афганистану убили девять человек, заявляет Кабул",
            "en": "Pakistani airstrikes in Afghanistan kill nine, Kabul says"
          },
          "domain": "reuters.com",
          "url": "https://www.reuters.com/world/asia-pacific/pakistani-airstrikes-afghanistan-kill-nine-kabul-says-2026-10-01/",
          "publication_date": "2026-10-01",
          "accessed_date": "2026-10-04",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    }
  ]
};
})();
