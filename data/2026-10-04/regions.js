window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-04"] = window.CI_DATA.snapshots["2026-10-04"] || {};
  s.regions = {
  "europe": {
    "index": 44,
    "delta": -1,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 44,
    "delta": 0,
    "status": "danger",
    "background": false
  },
  "middle-east": {
    "index": 39,
    "delta": -1,
    "status": "tense",
    "background": false
  },
  "north-america": {
    "index": 42,
    "delta": 14,
    "status": "danger",
    "background": false
  },
  "south-asia": {
    "index": 43,
    "delta": -1,
    "status": "danger",
    "background": true
  },
  "africa": {
    "index": 32,
    "delta": -1,
    "status": "tense",
    "background": true
  }
};
})();
