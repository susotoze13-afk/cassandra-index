window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-23"] = window.CI_DATA.snapshots["2026-08-23"] || {};
  s.regions = {
  "europe": {
    "index": 68,
    "delta": 1,
    "status": "very"
  },
  "east-asia": {
    "index": 52,
    "delta": 1,
    "status": "danger"
  },
  "middle-east": {
    "index": 80,
    "delta": 2,
    "status": "very"
  },
  "north-america": {
    "index": 42,
    "delta": 0,
    "status": "danger"
  },
  "south-asia": {
    "index": 58,
    "delta": 1,
    "status": "danger"
  },
  "africa": {
    "index": 47,
    "delta": 1,
    "status": "danger"
  }
};
})();
