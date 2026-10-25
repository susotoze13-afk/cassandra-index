window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-25"] = window.CI_DATA.snapshots["2026-10-25"] || {};
  s.countries = {
  "total": 152,
  "published": 2,
  "rows": {
    "RU": {
      "index": 66,
      "delta": -2,
      "background": false,
      "region": "russia-belarus",
      "signals": 8,
      "name": {
        "ru": "Россия",
        "en": "Russia"
      }
    },
    "UA": {
      "index": 61,
      "delta": -2,
      "background": false,
      "region": "ukraine-moldova",
      "signals": 5,
      "name": {
        "ru": "Украина",
        "en": "Ukraine"
      }
    }
  }
};
})();
