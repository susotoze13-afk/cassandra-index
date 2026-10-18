window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.regions["russia-belarus"] = {
  "index": 55,
  "delta": -1,
  "status": "danger",
  "background": false,
  "confidence": "high",
  "drivers": [
    {
      "observation": {
        "ru": "Рой украинских дронов атаковал Санкт-Петербург и Ленинградскую область — одну из крупнейших атак за четыре года: поражены ЦОД VK и нефтетерминал, нарушена работа аэропорта Пулково и ПВО.",
        "en": "A Ukrainian drone swarm struck St Petersburg and the Leningrad Region in one of the largest attacks in four years, hitting a VK data centre and an oil terminal and disrupting Pulkovo airport and air defences."
      },
      "why": {
        "ru": "Удар по тыловой инфраструктуре и энергетике углубляет вовлечённость РФ и повышает региональный риск.",
        "en": "The strike on rear-area infrastructure and energy deepens Russian involvement and raises regional risk."
      },
      "contribution": "high",
      "confidence": "high",
      "sources": [
        {
          "id": "tass-leningrad-largest-drone-attack",
          "title": {
            "ru": "Атака дронов на Ленинградскую область — одна из крупнейших за четыре года",
            "en": "Drone attack on Leningrad Region one of largest in four years"
          },
          "domain": "tass.com",
          "url": "https://tass.com/emergencies/2203667",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "aljazeera-st-petersburg-drone-swarm",
          "title": {
            "ru": "Санкт-Петербург под атакой роя украинских дронов",
            "en": "St Petersburg under attack from Ukrainian drone swarm"
          },
          "domain": "aljazeera.com",
          "url": "https://www.aljazeera.com/video/newsfeed/2026/10/18/st-petersburg-under-attack-from-ukrainian-drone-swarm",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        },
        {
          "id": "eadaily-st-petersburg-oil-terminal-2026-10-18",
          "title": {
            "ru": "Нефтетерминал в Санкт-Петербурге загорелся после дроновой атаки",
            "en": "The oil terminal caught fire in St. Petersburg after the drone attack"
          },
          "domain": "eadaily.com",
          "url": "https://eadaily.com/en/news/2026/10/18/the-oil-terminal-caught-fire-in-st-petersburg-after-the-drone-attack",
          "publication_date": "2026-10-18",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": false
        }
      ]
    },
    {
      "observation": {
        "ru": "ЕС ввёл крупнейший пакет санкций против РФ, США отсрочили вступление новых ограничений указом Трампа, а Москва назвала «короткий путь к ядерному нулю» контрпродуктивным.",
        "en": "The EU adopted its largest sanctions package on Russia, the US deferred new restrictions by a Trump order, and Moscow called a “shortcut to nuclear zero” counterproductive."
      },
      "why": {
        "ru": "Разнонаправленный санкционный и доктринальный фон повышает неопределённость расчётов для региона.",
        "en": "A mixed sanctions and doctrinal backdrop raises uncertainty in regional calculations."
      },
      "contribution": "medium",
      "confidence": "high",
      "sources": [
        {
          "id": "brusselstimes-eu-sanctions-1569-2026-10-12",
          "title": {
            "ru": "Крупнейший пакет санкций ЕС: 1 569 записей в военном чёрном списке России",
            "en": "Largest EU sanctions package yet adds 1,569 to Russia military blacklist"
          },
          "domain": "brusselstimes.com",
          "url": "https://www.brusselstimes.com/2357495/largest-eu-sanctions-package-yet-adds-1569-to-russia-military-blacklist",
          "publication_date": "2026-10-12",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "cnn-trump-waives-russia-sanctions-2026-10-16",
          "title": {
            "ru": "Трамп отсрочил санкции против России до их вступления в силу, вызвав критику",
            "en": "Trump waives Russia-related sanctions before they kick in, prompting backlash"
          },
          "domain": "cnn.com",
          "url": "https://www.cnn.com/2026/10/16/europe/us-ukraine-russia-sanctions-intl-hnk",
          "publication_date": "2026-10-16",
          "accessed_date": "2026-10-18",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false
        },
        {
          "id": "tass-nuclear-zero-postnikov-2026-10-17",
          "title": {
            "ru": "Россия считает идею «короткого пути к ядерному нулю» контрпродуктивной — дипломат Постников",
            "en": "Russia views idea of shortcut to 'nuclear zero' as counterproductive — diplomat Postnikov"
          },
          "domain": "tass.com",
          "url": "https://tass.com/politics/2203555",
          "publication_date": "2026-10-17",
          "accessed_date": "2026-10-18",
          "source_type": "primary",
          "cluster_id": "B-state-media",
          "state_affiliated": true
        }
      ]
    }
  ]
};
})();
