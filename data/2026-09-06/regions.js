window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  s.regions = {
  "europe": {
    "index": 69,
    "delta": 0,
    "status": "very"
  },
  "east-asia": {
    "index": 53,
    "delta": 0,
    "status": "danger"
  },
  "middle-east": {
    "index": 79,
    "delta": -3,
    "status": "very"
  },
  "north-america": {
    "index": 42,
    "delta": 1,
    "status": "danger"
  },
  "south-asia": {
    "index": 59,
    "delta": 0,
    "status": "danger"
  },
  "africa": {
    "index": 47,
    "delta": 0,
    "status": "danger"
  }
};
})();
