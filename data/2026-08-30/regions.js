window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.regions = {
  "europe": {
    "index": 50.3,
    "delta": -17.7,
    "status": "danger",
    "background": false,
    "signals": 16
  },
  "east-asia": {
    "index": 41.6,
    "delta": -10.4,
    "status": "danger",
    "background": true,
    "signals": 0
  },
  "middle-east": {
    "index": 50.7,
    "delta": -29.3,
    "status": "danger",
    "background": false,
    "signals": 1
  },
  "north-america": {
    "index": 31.6,
    "delta": -10.4,
    "status": "tense",
    "background": true,
    "signals": 0
  },
  "south-asia": {
    "index": 50.5,
    "delta": -7.5,
    "status": "danger",
    "background": false,
    "signals": 1
  },
  "africa": {
    "index": 51,
    "delta": 4,
    "status": "danger",
    "background": false,
    "signals": 2
  }
};
})();
