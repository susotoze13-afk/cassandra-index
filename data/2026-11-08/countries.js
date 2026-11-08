window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-08"] = window.CI_DATA.snapshots["2026-11-08"] || {};
  s.countries = {
  "total": 152,
  "published": 2,
  "rows": {
    "RU": {
      "index": 69.1,
      "delta": -3.3,
      "background": false,
      "region": "russia-belarus",
      "signals": 10,
      "name": {
        "ru": "Россия",
        "en": "Russia"
      }
    },
    "UA": {
      "index": 67.5,
      "delta": -4.9,
      "background": false,
      "region": "ukraine-moldova",
      "signals": 11,
      "name": {
        "ru": "Украина",
        "en": "Ukraine"
      }
    }
  }
};
})();
