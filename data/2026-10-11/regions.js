window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-11"] = window.CI_DATA.snapshots["2026-10-11"] || {};
  s.regions = {
  "europe": {
    "index": 62,
    "delta": 10,
    "status": "very",
    "background": true
  },
  "east-asia": {
    "index": 46,
    "delta": 10,
    "status": "danger",
    "background": true
  },
  "middle-east": {
    "index": 74,
    "delta": 10,
    "status": "very",
    "background": true
  },
  "north-america": {
    "index": 36,
    "delta": 10,
    "status": "tense",
    "background": true
  },
  "south-asia": {
    "index": 52,
    "delta": 10,
    "status": "danger",
    "background": true
  },
  "africa": {
    "index": 41,
    "delta": 10,
    "status": "danger",
    "background": true
  }
};
})();
