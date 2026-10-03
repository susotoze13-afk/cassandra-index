window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.regions = {
  "europe": {
    "index": 63,
    "delta": 15,
    "status": "very"
  },
  "east-asia": {
    "index": 47,
    "delta": 15,
    "status": "danger"
  },
  "middle-east": {
    "index": 75,
    "delta": 15,
    "status": "very"
  },
  "north-america": {
    "index": 37,
    "delta": 15,
    "status": "tense"
  },
  "south-asia": {
    "index": 53,
    "delta": 15,
    "status": "danger"
  },
  "africa": {
    "index": 42,
    "delta": 15,
    "status": "danger"
  }
};
})();
