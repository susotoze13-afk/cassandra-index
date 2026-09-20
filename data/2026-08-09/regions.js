window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-09"] = window.CI_DATA.snapshots["2026-08-09"] || {};
  s.regions = {
  "europe": {
    "index": 65,
    "delta": 1,
    "status": "very"
  },
  "east-asia": {
    "index": 50,
    "delta": 1,
    "status": "danger"
  },
  "middle-east": {
    "index": 77,
    "delta": 2,
    "status": "very"
  },
  "north-america": {
    "index": 43,
    "delta": 0,
    "status": "danger"
  },
  "south-asia": {
    "index": 56,
    "delta": 1,
    "status": "danger"
  },
  "africa": {
    "index": 46,
    "delta": 1,
    "status": "danger"
  }
};
})();
