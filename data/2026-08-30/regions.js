window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.regions = {
  "europe": {
    "index": 58,
    "delta": -10,
    "status": "danger"
  },
  "east-asia": {
    "index": 42,
    "delta": -10,
    "status": "danger"
  },
  "middle-east": {
    "index": 70,
    "delta": -10,
    "status": "very"
  },
  "north-america": {
    "index": 32,
    "delta": -10,
    "status": "tense"
  },
  "south-asia": {
    "index": 48,
    "delta": -10,
    "status": "danger"
  },
  "africa": {
    "index": 37,
    "delta": -10,
    "status": "tense"
  }
};
})();
