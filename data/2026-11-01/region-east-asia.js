window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions["east-asia"] = {
  "index": 70,
  "delta": 6,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "КНДР испытала кассетные боеголовки для тактических баллистических ракет и провела тест для оценки мощности оружейной системы; США, Южная Корея и Япония обязались добиваться «полной» денуклеаризации, Пхеньян назвал «стратегическим» многостороннее заявление в поддержку санкций.",
        "en": "North Korea tested cluster warheads for tactical ballistic missiles and ran a test to assess the yield of a weapons system; the US, South Korea and Japan vowed to pursue \"full\" denuclearisation, and Pyongyang called a multilateral sanctions statement \"strategic\"."
      },
      "why": {
        "ru": "Новые типы боеголовок и синхронная реакция трёх союзников — сигнал Д2.2, Д3.3 и Д5.2.",
        "en": "New warhead types and a synchronised response by three allies are a D2.2, D3.3 and D5.2 signal."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "yna-nk-cluster-bomb",
          "title": {
            "ru": "КНДР испытала кассетную боеголовку для тактических баллистических ракет",
            "en": "N. Korea tests cluster bomb mountable on tactical ballistic missiles"
          },
          "domain": "en.yna.co.kr",
          "url": "https://en.yna.co.kr/view/AEN20261101000451315",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "japantimes-denuclearization-vow",
          "title": {
            "ru": "США, Южная Корея и Япония обязались добиваться «полной» денуклеаризации КНДР",
            "en": "US, South Korea and Japan vow complete denuclearization of North Korea"
          },
          "domain": "japantimes.co.jp",
          "url": "https://www.japantimes.co.jp/news/2026/10/31/asia-pacific/politics/north-korea-denuclearization-vow/",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "tass-nk-yield-test",
          "title": {
            "ru": "КНДР провела испытание для оценки мощности оружейной системы",
            "en": "North Korea held test to assess weapon system yield"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2211447",
          "publication_date": "2026-10-31",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    },
    {
      "observation": {
        "ru": "Тайвань заявил, что Китай препятствует судоходству патрулём у восточного побережья; командующий армией США в Пацифике подтвердил актуальность окна конфликта вокруг Тайваня в 2027 году.",
        "en": "Taiwan said China is obstructing shipping with patrols off its east coast, and the US Army Pacific commander confirmed the relevance of a 2027 Taiwan conflict window."
      },
      "why": {
        "ru": "Давление на судоходство (Д9.3) и публичная оценка окна конфликта (Д1.1) держат напряжение в Тайваньском проливе.",
        "en": "Pressure on shipping (D9.3) and a public assessment of the conflict window (D1.1) keep tension in the Taiwan Strait."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "hindu-taiwan-shipping",
          "title": {
            "ru": "Тайвань заявил, что Китай препятствует судоходству патрулём у восточного побережья",
            "en": "Taiwan says China harassing shipping with east coast patrol"
          },
          "domain": "thehindu.com",
          "url": "https://www.thehindu.com/news/international/taiwan-says-china-harassing-shipping-with-east-coast-patrol/article71652011.ece",
          "publication_date": "2026-11-01",
          "accessed_date": "2026-11-01",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "breakingdefense-taiwan-window",
          "title": {
            "ru": "Окно конфликта вокруг Тайваня в 2027 году остаётся актуальным — командующий армией США в Пацифике",
            "en": "Taiwan 2027 conflict window remains valid, Army Pacific commander says"
          },
          "domain": "breakingdefense.com",
          "url": "https://breakingdefense.com/2026/10/taiwan-2027-conflict-window-remains-valid-army-pacific-commander-says/",
          "publication_date": "2026-10-29",
          "accessed_date": "2026-11-01",
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
