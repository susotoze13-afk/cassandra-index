window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  s.regions = {
  "europe": {
    "index": 49,
    "delta": -9,
    "status": "danger"
  },
  "east-asia": {
    "index": 33,
    "delta": -9,
    "status": "tense"
  },
  "middle-east": {
    "index": 61,
    "delta": -9,
    "status": "very"
  },
  "north-america": {
    "index": 23,
    "delta": -9,
    "status": "tense"
  },
  "south-asia": {
    "index": 39,
    "delta": -9,
    "status": "tense"
  },
  "africa": {
    "index": 28,
    "delta": -9,
    "status": "tense"
  }
};
})();
