window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-16"] = window.CI_DATA.snapshots["2026-08-16"] || {};
  s.regions = {
  "europe": {
    "index": 67,
    "delta": 2,
    "status": "very"
  },
  "east-asia": {
    "index": 51,
    "delta": 1,
    "status": "danger"
  },
  "middle-east": {
    "index": 78,
    "delta": 1,
    "status": "very"
  },
  "north-america": {
    "index": 42,
    "delta": -1,
    "status": "danger"
  },
  "south-asia": {
    "index": 57,
    "delta": 1,
    "status": "danger"
  },
  "africa": {
    "index": 46,
    "delta": 0,
    "status": "danger"
  }
};
})();
