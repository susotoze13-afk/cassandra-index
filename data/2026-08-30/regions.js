window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.regions = {
  "europe": {
    "index": 69,
    "delta": 1,
    "status": "very"
  },
  "east-asia": {
    "index": 53,
    "delta": 1,
    "status": "danger"
  },
  "middle-east": {
    "index": 82,
    "delta": 2,
    "status": "critical"
  },
  "north-america": {
    "index": 41,
    "delta": -1,
    "status": "danger"
  },
  "south-asia": {
    "index": 59,
    "delta": 1,
    "status": "danger"
  },
  "africa": {
    "index": 47,
    "delta": 0,
    "status": "danger"
  }
};
})();
