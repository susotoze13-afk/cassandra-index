window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
  s.regions["eu-north-europe"] = {
  "index": 68,
  "delta": 2,
  "status": "very",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Перевооружение Европы ускоряется: в Телфорде вновь производят танковые стволы, Италия заказывает технику Leonardo и Rheinmetall на $4 млрд, Дания получает новый дальний удар, армия США расширяет закупки стволов гаубиц.",
        "en": "European rearmament accelerates: tank barrels are again produced in Telford, Italy orders $4bn of Leonardo and Rheinmetall equipment, Denmark gains a new long-range strike option, and the US Army expands howitzer barrel procurement."
      },
      "why": {
        "ru": "Военно-промышленные заказы и восстановление производственных цепочек фиксируют переход к длительной подготовке.",
        "en": "Defence-industrial orders and restored production chains lock in a shift towards long-term preparation."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "guardian-telford-1022",
          "title": {
            "ru": "Гонка перевооружения: в Телфорде возобновили производство стволов для танков",
            "en": "Race to rearm: Telford gun hall brings tank barrel production back to the UK"
          },
          "domain": "theguardian.com",
          "url": "https://www.theguardian.com/business/2026/oct/22/telford-gun-hall-tank-barrel-production-back-uk-rheinmetall",
          "publication_date": "2026-10-22",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "defnews-italy-contracts-1023",
          "title": {
            "ru": "Leonardo и Rheinmetall получили контракты с итальянской армией на $4 млрд",
            "en": "Leonardo, Rheinmetall secure $4 billion contracts with Italian Army"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/23/leonardo-rheinmetall-secure-4-billion-contracts-with-italian-army-report-says/",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "defnews-denmark-missiles-1022",
          "title": {
            "ru": "Дания закупает ракеты Kongsberg и Covenant для нового дальнего удара",
            "en": "Denmark to buy Kongsberg, Covenant missiles for new long-range strike option"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/global/europe/2026/10/22/denmark-to-buy-kongsberg-covenant-missiles-for-new-long-range-strike-option/",
          "publication_date": "2026-10-22",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "defnews-155mm-1022",
          "title": {
            "ru": "Армия США ищет производителей стволов 155-мм гаубиц на фоне роста спроса",
            "en": "US Army seeks manufacturers for 155mm howitzer barrels amid boost in demand"
          },
          "domain": "defensenews.com",
          "url": "https://www.defensenews.com/land/2026/10/22/us-army-seeks-manufacturers-for-155mm-howitzer-barrels-amid-boost-in-demand/",
          "publication_date": "2026-10-22",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "Российская кампания против Европы: канцлер Мерц говорит о кибератаках, саботаже и попытках ударов по критической инфраструктуре, Австрия высылает четырёх дипломатов, Молдова — сотрудника посольства.",
        "en": "Russia's campaign against Europe: Chancellor Merz cites cyberattacks, sabotage and attempted attacks on critical infrastructure, Austria expels four diplomats, Moldova an embassy staffer."
      },
      "why": {
        "ru": "Комбинация дипломатических высылок и обвинений в саботаже указывает на системное давление, а не отдельный инцидент.",
        "en": "The combination of diplomatic expulsions and sabotage allegations points to systemic pressure rather than a single incident."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "aa-merz-russia-1024",
          "title": {
            "ru": "Мерц обвинил Россию в стремлении дестабилизировать Германию кибератаками и саботажем",
            "en": "Merz accuses Russia of seeking to 'destabilize' Germany"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/europe/merz-accuses-russia-of-seeking-to-destabilize-germany/4099528",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aa-austria-expels-1023",
          "title": {
            "ru": "Австрия высылает четырёх российских дипломатов по соображениям безопасности",
            "en": "Austria expels 4 Russian diplomats on security grounds"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/politics/austria-expels-4-russian-diplomats-on-security-grounds-/4098352",
          "publication_date": "2026-10-23",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aa-moldova-expel-1024",
          "title": {
            "ru": "Россия обещает «жёсткий ответ» на высылку дипломата из Молдовы",
            "en": "Russia warns of 'firm response' after Moldova expels diplomat"
          },
          "domain": "aa.com.tr",
          "url": "https://www.aa.com.tr/en/world/russia-warns-of-firm-response-after-moldova-expels-diplomat/4099661",
          "publication_date": "2026-10-24",
          "accessed_date": "2026-10-25",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
})();
