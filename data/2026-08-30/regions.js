window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.regions = {
  "europe": {
    "index": 49,
    "delta": -19,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 42,
    "delta": -10,
    "status": "danger",
    "background": true
  },
  "middle-east": {
    "index": 49,
    "delta": -31,
    "status": "danger",
    "background": false
  },
  "north-america": {
    "index": 32,
    "delta": -10,
    "status": "tense",
    "background": true
  },
  "south-asia": {
    "index": 48,
    "delta": -10,
    "status": "danger",
    "background": true
  },
  "africa": {
    "index": 37,
    "delta": -10,
    "status": "tense",
    "background": true
  }
};
})();
