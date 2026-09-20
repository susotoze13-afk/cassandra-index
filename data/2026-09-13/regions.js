window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  s.regions = {
  "europe": {
    "index": 74,
    "delta": 5,
    "status": "very"
  },
  "east-asia": {
    "index": 55,
    "delta": 2,
    "status": "danger"
  },
  "middle-east": {
    "index": 88,
    "delta": 9,
    "status": "critical"
  },
  "north-america": {
    "index": 41,
    "delta": -1,
    "status": "danger"
  },
  "south-asia": {
    "index": 63,
    "delta": 4,
    "status": "very"
  },
  "africa": {
    "index": 48,
    "delta": 1,
    "status": "danger"
  }
};
})();
