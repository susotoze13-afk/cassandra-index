window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.regions = {
  "europe": {
    "index": 53.5,
    "delta": 10.9,
    "status": "danger",
    "background": false,
    "signals": 18
  },
  "east-asia": {
    "index": 55,
    "delta": 21.3,
    "status": "danger",
    "background": false,
    "signals": 2
  },
  "middle-east": {
    "index": 56.8,
    "delta": 13.5,
    "status": "danger",
    "background": false,
    "signals": 4
  },
  "north-america": {
    "index": 36.4,
    "delta": 12.7,
    "status": "tense",
    "background": true,
    "signals": 0
  },
  "south-asia": {
    "index": 56.1,
    "delta": 12.7,
    "status": "danger",
    "background": true,
    "signals": 0
  },
  "africa": {
    "index": 55.9,
    "delta": 13.1,
    "status": "danger",
    "background": false,
    "signals": 1
  }
};
})();
