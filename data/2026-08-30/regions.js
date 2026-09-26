window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.regions = {
  "europe": {
    "index": 51,
    "delta": -17,
    "status": "danger"
  },
  "east-asia": {
    "index": 51,
    "delta": -1,
    "status": "danger"
  },
  "middle-east": {
    "index": 51,
    "delta": -29,
    "status": "danger"
  },
  "north-america": {
    "index": 51,
    "delta": 9,
    "status": "danger"
  },
  "south-asia": {
    "index": 51,
    "delta": -7,
    "status": "danger"
  },
  "africa": {
    "index": 51,
    "delta": 4,
    "status": "danger"
  }
};
})();
