window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.countries = {
  "total": 152,
  "published": 2,
  "rows": {
    "RU": {
      "index": 72.4,
      "delta": 5.3,
      "background": false,
      "region": "russia-belarus",
      "signals": 6,
      "name": {
        "ru": "Россия",
        "en": "Russia"
      }
    },
    "UA": {
      "index": 72.4,
      "delta": 4.3,
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
