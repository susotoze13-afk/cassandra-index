window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-11"] = window.CI_DATA.snapshots["2026-10-11"] || {};
  s.regions = {
  "europe": {
    "index": 55.2,
    "delta": 9.2,
    "status": "danger",
    "background": false,
    "signals": 14
  },
  "east-asia": {
    "index": 56,
    "delta": 10.3,
    "status": "danger",
    "background": false,
    "signals": 5
  },
  "middle-east": {
    "index": 57.5,
    "delta": 11.8,
    "status": "danger",
    "background": false,
    "signals": 9
  },
  "north-america": {
    "index": 57.2,
    "delta": 11.2,
    "status": "danger",
    "background": false,
    "signals": 5
  },
  "south-asia": {
    "index": 55.9,
    "delta": 10.2,
    "status": "danger",
    "background": true,
    "signals": 0
  },
  "africa": {
    "index": 57.1,
    "delta": 11.4,
    "status": "danger",
    "background": false,
    "signals": 2
  }
};
})();
