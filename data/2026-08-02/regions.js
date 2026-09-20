window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-02"] = window.CI_DATA.snapshots["2026-08-02"] || {};
  s.regions = {
  "europe": {
    "index": 64,
    "delta": 0,
    "status": "very"
  },
  "east-asia": {
    "index": 49,
    "delta": 0,
    "status": "danger"
  },
  "middle-east": {
    "index": 75,
    "delta": 0,
    "status": "very"
  },
  "north-america": {
    "index": 43,
    "delta": 0,
    "status": "danger"
  },
  "south-asia": {
    "index": 55,
    "delta": 0,
    "status": "danger"
  },
  "africa": {
    "index": 45,
    "delta": 0,
    "status": "danger"
  }
};
})();
