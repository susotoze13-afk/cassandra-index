window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-11"] = window.CI_DATA.snapshots["2026-10-11"] || {};
  s.regions = {
  "europe": {
    "index": 51,
    "delta": 7,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 62,
    "delta": 18,
    "status": "very",
    "background": false
  },
  "middle-east": {
    "index": 67,
    "delta": 28,
    "status": "very",
    "background": false
  },
  "north-america": {
    "index": 52,
    "delta": 10,
    "status": "danger",
    "background": false
  },
  "south-asia": {
    "index": 53,
    "delta": 10,
    "status": "danger",
    "background": true
  },
  "africa": {
    "index": 42,
    "delta": 10,
    "status": "danger",
    "background": true
  }
};
})();
