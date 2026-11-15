window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-15"] = window.CI_DATA.snapshots["2026-11-15"] || {};
  s.countries = {
  "total": 152,
  "published": 2,
  "rows": {
    "RU": {
      "index": 70.5,
      "delta": 1.4,
      "background": false,
      "region": "russia-belarus",
      "signals": 5,
      "name": {
        "ru": "Россия",
        "en": "Russia"
      }
    },
    "UA": {
      "index": 69.9,
      "delta": 2.1,
      "background": false,
      "region": "ukraine-moldova",
      "signals": 6,
      "name": {
        "ru": "Украина",
        "en": "Ukraine"
      }
    }
  }
};
})();
