window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-27"] = window.CI_DATA.snapshots["2026-09-27"] || {};
  s.regions = {
  "europe": {
    "index": 45,
    "delta": 1,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 44,
    "delta": -9,
    "status": "danger",
    "background": true
  },
  "middle-east": {
    "index": 48,
    "delta": -12,
    "status": "danger",
    "background": false
  },
  "north-america": {
    "index": 28,
    "delta": -9,
    "status": "tense",
    "background": true
  },
  "south-asia": {
    "index": 49,
    "delta": -10,
    "status": "danger",
    "background": false
  },
  "africa": {
    "index": 47,
    "delta": -10,
    "status": "danger",
    "background": false
  }
};
})();
