// data/regions/reference.js — загрузчик справочника регионов (window.CI_REGION_REF).
// Канонический источник — data/regions/reference.json; содержимое обязано
// совпадать с ним (тест tests/region.test.js). Подключается classic script-
// тегом из index.html: fetch JSON на file:// невозможен (как data/latest.js).
window.CI_REGION_REF = {
  "taxonomy_version": "2.0",
  "owner": "Data Governance Lead",
  "taxonomy": {
    "standard": "ISO 3166-2",
    "cities": "GeoNames",
    "mapping": "город → регион через GeoNames admin1_code, приведённый к ISO 3166-2"
  },
  "cityImport": "Полный импорт городов GeoNames — при подключении edge-слоя; статический справочник городов/стран (ADR 0029) — отдельный слой data/geo/*.",
  "confidenceLadder": { "city": 80, "region": 90, "floor": 50 },
  "disputedTerritories": "Город отображается в регионе, определённом ISO 3166-2, с нейтральной формулировкой без политических утверждений. Contested-разметки в публичном интерфейсе нет.",
  "taxonomies": {
    "1.0": {
      "regions": [
        {
          "id": "europe",
          "name": { "ru": "Европа", "en": "Europe" },
          "countries": ["AL", "AD", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "MD", "MC", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "RU", "SM", "RS", "SK", "SI", "ES", "SE", "CH", "UA", "GB", "VA"],
          "adminCenter": { "city": { "ru": "Амстердам", "en": "Amsterdam" }, "country": "NL", "iso3166_2": "NL-NH", "geonamesId": 2759794 }
        },
        {
          "id": "east-asia",
          "name": { "ru": "Восточная Азия", "en": "East Asia" },
          "countries": ["BN", "JP", "CN", "HK", "MO", "TW", "KP", "KR", "SG", "ID", "KH", "LA", "MY", "MN", "MM", "PH", "TH", "TL", "VN"],
          "adminCenter": { "city": { "ru": "Токио", "en": "Tokyo" }, "country": "JP", "iso3166_2": "JP-13", "geonamesId": 1850147 }
        },
        {
          "id": "middle-east",
          "name": { "ru": "Ближний Восток", "en": "Middle East" },
          "countries": ["BH", "IR", "IQ", "IL", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "SY", "TR", "AE", "YE"],
          "adminCenter": { "city": { "ru": "Бейрут", "en": "Beirut" }, "country": "LB", "iso3166_2": "LB-BA", "geonamesId": 276781 }
        },
        {
          "id": "north-america",
          "name": { "ru": "Северная Америка", "en": "North America" },
          "countries": ["CA", "MX", "US"],
          "adminCenter": { "city": { "ru": "Вашингтон", "en": "Washington" }, "country": "US", "iso3166_2": "US-DC", "geonamesId": 4140963 }
        },
        {
          "id": "south-asia",
          "name": { "ru": "Южная Азия", "en": "South Asia" },
          "countries": ["AF", "BD", "BT", "IN", "MV", "NP", "PK", "LK"],
          "adminCenter": { "city": { "ru": "Нью-Дели", "en": "New Delhi" }, "country": "IN", "iso3166_2": "IN-DL", "geonamesId": 1261481 }
        },
        {
          "id": "africa",
          "name": { "ru": "Африка", "en": "Africa" },
          "countries": ["DZ", "AO", "BJ", "BW", "BF", "BI", "CV", "CM", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "SZ", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"],
          "adminCenter": { "city": { "ru": "Найроби", "en": "Nairobi" }, "country": "KE", "iso3166_2": "KE-30", "geonamesId": 184745 }
        }
      ]
    },
    "2.0": {
      "regions": [
        {
          "id": "russia-belarus",
          "name": { "ru": "Россия и Беларусь", "en": "Russia and Belarus" },
          "countries": ["RU", "BY"],
          "adminCenter": { "city": { "ru": "Москва", "en": "Moscow" }, "country": "RU", "iso3166_2": "RU-MOW", "geonamesId": 524901 }
        },
        {
          "id": "ukraine-moldova",
          "name": { "ru": "Украина и Молдова", "en": "Ukraine and Moldova" },
          "countries": ["UA", "MD"],
          "adminCenter": { "city": { "ru": "Киев", "en": "Kyiv" }, "country": "UA", "iso3166_2": "UA-30", "geonamesId": 703448 }
        },
        {
          "id": "baltic",
          "name": { "ru": "Балтия", "en": "The Baltics" },
          "countries": ["EE", "LV", "LT"],
          "adminCenter": { "city": { "ru": "Рига", "en": "Riga" }, "country": "LV", "iso3166_2": "LV-RIX", "geonamesId": 456172 }
        },
        {
          "id": "balkans",
          "name": { "ru": "Балканы", "en": "The Balkans" },
          "countries": ["AL", "BA", "BG", "HR", "GR", "ME", "MK", "RO", "RS", "SI"],
          "adminCenter": { "city": { "ru": "Белград", "en": "Belgrade" }, "country": "RS", "iso3166_2": "RS-00", "geonamesId": 792680 }
        },
        {
          "id": "eu-north-europe",
          "name": { "ru": "Европа (ЕС и Север)", "en": "Europe (EU & North)" },
          "countries": ["AT", "AD", "BE", "CY", "CZ", "DK", "FI", "FR", "DE", "HU", "IS", "IE", "IT", "LI", "LU", "MT", "MC", "NL", "NO", "PL", "PT", "SM", "SK", "ES", "SE", "CH", "GB", "VA"],
          "adminCenter": { "city": { "ru": "Брюссель", "en": "Brussels" }, "country": "BE", "iso3166_2": "BE-BRU", "geonamesId": 2800866 }
        },
        {
          "id": "south-caucasus",
          "name": { "ru": "Южный Кавказ", "en": "South Caucasus" },
          "countries": ["GE", "AM", "AZ"],
          "adminCenter": { "city": { "ru": "Тбилиси", "en": "Tbilisi" }, "country": "GE", "iso3166_2": "GE-TB", "geonamesId": 611717 }
        },
        {
          "id": "central-asia",
          "name": { "ru": "Средняя Азия", "en": "Central Asia" },
          "countries": ["KZ", "UZ", "TM", "TJ", "KG"],
          "adminCenter": { "city": { "ru": "Алматы", "en": "Almaty" }, "country": "KZ", "iso3166_2": "KZ-ALA", "geonamesId": 1526384 }
        },
        {
          "id": "east-asia",
          "name": { "ru": "Восточная Азия", "en": "East Asia" },
          "countries": ["BN", "JP", "CN", "HK", "MO", "TW", "KP", "KR", "SG", "ID", "KH", "LA", "MY", "MN", "MM", "PH", "TH", "TL", "VN"],
          "adminCenter": { "city": { "ru": "Токио", "en": "Tokyo" }, "country": "JP", "iso3166_2": "JP-13", "geonamesId": 1850147 }
        },
        {
          "id": "middle-east",
          "name": { "ru": "Ближний Восток", "en": "Middle East" },
          "countries": ["BH", "IR", "IQ", "IL", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "SY", "TR", "AE", "YE"],
          "adminCenter": { "city": { "ru": "Бейрут", "en": "Beirut" }, "country": "LB", "iso3166_2": "LB-BA", "geonamesId": 276781 }
        },
        {
          "id": "north-america",
          "name": { "ru": "Северная Америка", "en": "North America" },
          "countries": ["CA", "MX", "US"],
          "adminCenter": { "city": { "ru": "Вашингтон", "en": "Washington" }, "country": "US", "iso3166_2": "US-DC", "geonamesId": 4140963 }
        },
        {
          "id": "south-asia",
          "name": { "ru": "Южная Азия", "en": "South Asia" },
          "countries": ["AF", "BD", "BT", "IN", "MV", "NP", "PK", "LK"],
          "adminCenter": { "city": { "ru": "Нью-Дели", "en": "New Delhi" }, "country": "IN", "iso3166_2": "IN-DL", "geonamesId": 1261481 }
        },
        {
          "id": "africa",
          "name": { "ru": "Африка", "en": "Africa" },
          "countries": ["DZ", "AO", "BJ", "BW", "BF", "BI", "CV", "CM", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "SZ", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW"],
          "adminCenter": { "city": { "ru": "Найроби", "en": "Nairobi" }, "country": "KE", "iso3166_2": "KE-30", "geonamesId": 184745 }
        }
      ]
    }
  }
}
;
