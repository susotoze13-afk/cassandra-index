window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  s.regions = {
  "europe": {
    "index": 42.6,
    "delta": -1.7,
    "status": "danger",
    "background": false,
    "signals": 15
  },
  "east-asia": {
    "index": 33.7,
    "delta": 0.8,
    "status": "tense",
    "background": true,
    "signals": 0
  },
  "middle-east": {
    "index": 43.3,
    "delta": 1.3,
    "status": "danger",
    "background": false,
    "signals": 3
  },
  "north-america": {
    "index": 23.7,
    "delta": 0.8,
    "status": "tense",
    "background": true,
    "signals": 0
  },
  "south-asia": {
    "index": 43.4,
    "delta": 0.8,
    "status": "danger",
    "background": true,
    "signals": 0
  },
  "africa": {
    "index": 42.8,
    "delta": 0.5,
    "status": "danger",
    "background": false,
    "signals": 2
  }
};
})();
