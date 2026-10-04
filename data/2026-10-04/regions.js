window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-04"] = window.CI_DATA.snapshots["2026-10-04"] || {};
  s.regions = {
  "europe": {
    "index": 52,
    "delta": -2,
    "status": "danger"
  },
  "east-asia": {
    "index": 36,
    "delta": -2,
    "status": "tense"
  },
  "middle-east": {
    "index": 64,
    "delta": -2,
    "status": "very"
  },
  "north-america": {
    "index": 26,
    "delta": -2,
    "status": "tense"
  },
  "south-asia": {
    "index": 42,
    "delta": -2,
    "status": "danger"
  },
  "africa": {
    "index": 31,
    "delta": -2,
    "status": "tense"
  }
};
})();
