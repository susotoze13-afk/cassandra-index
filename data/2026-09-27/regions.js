window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-27"] = window.CI_DATA.snapshots["2026-09-27"] || {};
  s.regions = {
  "europe": {
    "index": 45,
    "delta": 3,
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
    "index": 40,
    "delta": -20,
    "status": "tense",
    "background": false
  },
  "north-america": {
    "index": 28,
    "delta": -9,
    "status": "tense",
    "background": true
  },
  "south-asia": {
    "index": 43,
    "delta": -11,
    "status": "danger",
    "background": false
  },
  "africa": {
    "index": 45,
    "delta": -9,
    "status": "danger",
    "background": false
  }
};
})();
