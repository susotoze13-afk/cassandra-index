window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  s.regions = {
  "europe": {
    "index": 44.3,
    "delta": -6,
    "status": "danger",
    "background": false,
    "signals": 16
  },
  "east-asia": {
    "index": 32.9,
    "delta": -8.7,
    "status": "tense",
    "background": true,
    "signals": 0
  },
  "middle-east": {
    "index": 42,
    "delta": -8.7,
    "status": "danger",
    "background": true,
    "signals": 0
  },
  "north-america": {
    "index": 22.9,
    "delta": -8.7,
    "status": "tense",
    "background": true,
    "signals": 0
  },
  "south-asia": {
    "index": 42.6,
    "delta": -7.9,
    "status": "danger",
    "background": false,
    "signals": 2
  },
  "africa": {
    "index": 42.3,
    "delta": -8.7,
    "status": "danger",
    "background": false,
    "signals": 1
  }
};
})();
