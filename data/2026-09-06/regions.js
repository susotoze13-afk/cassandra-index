window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  s.regions = {
  "europe": {
    "index": 45,
    "delta": -4,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 33,
    "delta": -9,
    "status": "tense",
    "background": true
  },
  "middle-east": {
    "index": 40,
    "delta": -9,
    "status": "tense",
    "background": true
  },
  "north-america": {
    "index": 23,
    "delta": -9,
    "status": "tense",
    "background": true
  },
  "south-asia": {
    "index": 39,
    "delta": -9,
    "status": "tense",
    "background": true
  },
  "africa": {
    "index": 28,
    "delta": -9,
    "status": "tense",
    "background": true
  }
};
})();
