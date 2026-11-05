window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-04"] = window.CI_DATA.snapshots["2026-10-04"] || {};
  s.regions = {
  "europe": {
    "index": 46,
    "delta": -1.2,
    "status": "danger",
    "background": false,
    "signals": 1
  },
  "east-asia": {
    "index": 45.7,
    "delta": -0.3,
    "status": "danger",
    "background": false,
    "signals": 1
  },
  "middle-east": {
    "index": 45.7,
    "delta": -2.2,
    "status": "danger",
    "background": false,
    "signals": 5
  },
  "north-america": {
    "index": 46,
    "delta": 18.6,
    "status": "danger",
    "background": false,
    "signals": 2
  },
  "south-asia": {
    "index": 45.7,
    "delta": -2,
    "status": "danger",
    "background": false,
    "signals": 1
  },
  "africa": {
    "index": 45.7,
    "delta": -1.3,
    "status": "danger",
    "background": false,
    "signals": 1
  }
};
})();
