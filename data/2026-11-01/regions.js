window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.regions = {
  "russia-belarus": {
    "index": 71,
    "delta": 5,
    "status": "very",
    "background": false
  },
  "ukraine-moldova": {
    "index": 73,
    "delta": 5,
    "status": "very",
    "background": false
  },
  "baltic": {
    "index": 71,
    "delta": 2,
    "status": "very",
    "background": true
  },
  "balkans": {
    "index": 71,
    "delta": 2,
    "status": "very",
    "background": false
  },
  "eu-north-europe": {
    "index": 69,
    "delta": 1,
    "status": "very",
    "background": false
  },
  "south-caucasus": {
    "index": 68,
    "delta": 2,
    "status": "very",
    "background": true
  },
  "central-asia": {
    "index": 67,
    "delta": 2,
    "status": "very",
    "background": true
  },
  "east-asia": {
    "index": 70,
    "delta": 6,
    "status": "very",
    "background": false
  },
  "middle-east": {
    "index": 83,
    "delta": 5,
    "status": "critical",
    "background": false
  },
  "north-america": {
    "index": 72,
    "delta": 0,
    "status": "very",
    "background": false
  },
  "south-asia": {
    "index": 69,
    "delta": 2,
    "status": "very",
    "background": true
  },
  "africa": {
    "index": 71,
    "delta": 2,
    "status": "very",
    "background": false
  }
};
})();
