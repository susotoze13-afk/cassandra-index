window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-27"] = window.CI_DATA.snapshots["2026-09-27"] || {};
  s.regions = {
  "europe": {
    "index": 47.2,
    "delta": -6.3,
    "status": "danger",
    "background": false,
    "signals": 1
  },
  "east-asia": {
    "index": 46,
    "delta": -9,
    "status": "danger",
    "background": true,
    "signals": 0
  },
  "middle-east": {
    "index": 47.9,
    "delta": -8.9,
    "status": "danger",
    "background": false,
    "signals": 5
  },
  "north-america": {
    "index": 27.4,
    "delta": -9,
    "status": "tense",
    "background": true,
    "signals": 0
  },
  "south-asia": {
    "index": 47.7,
    "delta": -8.4,
    "status": "danger",
    "background": false,
    "signals": 3
  },
  "africa": {
    "index": 47,
    "delta": -8.9,
    "status": "danger",
    "background": false,
    "signals": 1
  }
};
})();
