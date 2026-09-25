window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.regions = {
  "europe": {
    "index": 59,
    "delta": -9,
    "status": "danger"
  },
  "east-asia": {
    "index": 59,
    "delta": 7,
    "status": "danger"
  },
  "middle-east": {
    "index": 59,
    "delta": -21,
    "status": "danger"
  },
  "north-america": {
    "index": 59,
    "delta": 17,
    "status": "danger"
  },
  "south-asia": {
    "index": 59,
    "delta": 1,
    "status": "danger"
  },
  "africa": {
    "index": 59,
    "delta": 12,
    "status": "danger"
  }
};
})();
