window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
  s.regions["baltic"] = {
  "index": 73,
  "delta": 6,
  "status": "very",
  "background": true,
  "confidence": "low",
  "drivers": [
    {
      "observation": {
        "ru": "Давление России на европейскую инфраструктуру остаётся в повестке: канцлер ФРГ говорит о ежедневных кибератаках и попытках саботажа, Австрия высылает четырёх дипломатов по соображениям безопасности.",
        "en": "Russian pressure on European infrastructure remains on the agenda: the German chancellor speaks of daily cyberattacks and sabotage attempts, and Austria expels four diplomats on security grounds."
      },
      "why": {
        "ru": "Для Балтии это фон, при котором любая диверсия на энергетике или связи сразу читается как часть кампании.",
        "en": "For the Baltics this is the backdrop against which any energy or communications sabotage is immediately read as part of a campaign."
      },
      "contribution": "medium",
      "confidence": "low",
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
        }
      ]
    },
    {
      "observation": {
        "ru": "Европа ускоряет перевооружение: в Телфорде возобновлено производство танковых стволов, Leonardo и Rheinmetall получили контракты с итальянской армией на $4 млрд, Дания закупает ракеты дальнего удара.",
        "en": "Europe accelerates rearmament: tank barrel production has resumed in Telford, Leonardo and Rheinmetall won $4bn contracts with the Italian Army, and Denmark is buying long-range missiles."
      },
      "why": {
        "ru": "Военные заказы гражданским заводам и новые программы — индикатор подготовки к длительной конфронтации.",
        "en": "Military orders to civilian plants and new programmes indicate preparation for a prolonged confrontation."
      },
      "contribution": "medium",
      "confidence": "medium",
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
        }
      ]
    }
  ]
};
})();
