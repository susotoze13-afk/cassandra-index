window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.regions = {
  "europe": {
    "index": 44,
    "delta": 7,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 53,
    "delta": 19,
    "status": "danger",
    "background": false
  },
  "middle-east": {
    "index": 60,
    "delta": 18,
    "status": "danger",
    "background": false
  },
  "north-america": {
    "index": 37,
    "delta": 13,
    "status": "tense",
    "background": true
  },
  "south-asia": {
    "index": 59,
    "delta": 13,
    "status": "danger",
    "background": true
  },
  "africa": {
    "index": 57,
    "delta": 14,
    "status": "danger",
    "background": false
  }
};
})();
