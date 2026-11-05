window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
  s.countries = {
  "total": 152,
  "published": 2,
  "rows": {
    "RU": {
      "index": 67.1,
      "delta": 1.7,
      "background": false,
      "region": "russia-belarus",
      "signals": 8,
      "name": {
        "ru": "Россия",
        "en": "Russia"
      }
    },
    "UA": {
      "index": 68.1,
      "delta": 3.3,
      "background": false,
      "region": "ukraine-moldova",
      "signals": 7,
      "name": {
        "ru": "Украина",
        "en": "Ukraine"
      }
    }
  }
};
})();
