window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.regions["balkans"] = {
  "index": 63.8,
  "delta": -5.9,
  "status": "very",
  "background": false,
  "confidence": "medium",
  "drivers": [
    {
      "observation": {
        "ru": "ЕС предложил странам Чёрного моря поддержку в противодействии угрозам безопасности; начальник Генштаба Сербии обсудил с командующим KFOR ситуацию безопасности в Косове.",
        "en": "The EU offered Black Sea countries support against security threats, and Serbia’s chief of staff discussed the security situation in Kosovo with the KFOR commander."
      },
      "why": {
        "ru": "Вовлечение новых форматов и военные контакты по Косову (Д7.1, Д3.4).",
        "en": "New formats and military contacts over Kosovo (D7.1, D3.4)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "balkaninsight-black-sea",
          "title": {
            "ru": "ЕС предложил странам Чёрного моря поддержку против угроз безопасности",
            "en": "EU Offers Black Sea Countries Support to Counter Security Threats"
          },
          "domain": "balkaninsight.com",
          "url": "https://balkaninsight.com/2026/11/09/eu-offers-black-sea-countries-support-to-counter-security-threats/bi/",
          "publication_date": "2026-11-09",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "A-mainstream",
          "state_affiliated": false,
          "origin": "collected-in-week"
        },
        {
          "id": "kossev-serbia-kfor",
          "title": {
            "ru": "Начальник Генштаба Сербии обсудил с командующим KFOR ситуацию безопасности в Косове",
            "en": "Načelnik Generalštaba Vojske Srbije sa komandantom Kfora razgovarao o bezbednosnoj situaciji na Kosovu"
          },
          "domain": "kossev.info",
          "url": "https://kossev.info/nacelnik-generalstaba-vojske-srbije-sa-komandantom-kfora-razgovarao-o-bezbednosnoj-situaciji-na-kosovu/",
          "publication_date": "2026-11-14",
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
        "ru": "Болгария объявила о прекращении поставок оружия Украине.",
        "en": "Bulgaria announced it will stop supplying weapons to Ukraine."
      },
      "why": {
        "ru": "Выход третьей стороны из поставок (Д7.4).",
        "en": "A third party stepping out of supplies (D7.4)."
      },
      "contribution": "medium",
      "confidence": "medium",
      "sources": [
        {
          "id": "tass-bulgaria-weapons",
          "title": {
            "ru": "Болгария прекращает поставки оружия Украине — премьер",
            "en": "Bulgaria to stop supplying weapons to Ukraine — PM"
          },
          "domain": "tass.com",
          "url": "https://tass.com/world/2218193",
          "publication_date": "2026-11-14",
          "accessed_date": "2026-11-15",
          "source_type": "secondary",
          "cluster_id": "B-state-media",
          "state_affiliated": true,
          "origin": "collected-in-week"
        }
      ]
    }
  ]
};
})();
