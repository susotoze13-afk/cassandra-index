window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  s.regions = {
  "europe": {
    "index": 40,
    "delta": -5,
    "status": "tense",
    "background": false
  },
  "east-asia": {
    "index": 34,
    "delta": 1,
    "status": "tense",
    "background": true
  },
  "middle-east": {
    "index": 38,
    "delta": -2,
    "status": "tense",
    "background": false
  },
  "north-america": {
    "index": 24,
    "delta": 1,
    "status": "tense",
    "background": true
  },
  "south-asia": {
    "index": 41,
    "delta": 1,
    "status": "danger",
    "background": true
  },
  "africa": {
    "index": 40,
    "delta": -1,
    "status": "tense",
    "background": false
  }
};
})();
