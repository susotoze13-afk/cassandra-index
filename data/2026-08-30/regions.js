window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.regions = {
  "europe": {
    "index": 60,
    "delta": -8,
    "status": "danger"
  },
  "east-asia": {
    "index": 60,
    "delta": 8,
    "status": "danger"
  },
  "middle-east": {
    "index": 60,
    "delta": -20,
    "status": "danger"
  },
  "north-america": {
    "index": 60,
    "delta": 18,
    "status": "danger"
  },
  "south-asia": {
    "index": 60,
    "delta": 2,
    "status": "danger"
  },
  "africa": {
    "index": 60,
    "delta": 13,
    "status": "danger"
  }
};
})();
