window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-04"] = window.CI_DATA.snapshots["2026-10-04"] || {};
  s.regions = {
  "europe": {
    "index": 44,
    "delta": -1,
    "status": "danger",
    "background": false
  },
  "east-asia": {
    "index": 46,
    "delta": 2,
    "status": "danger",
    "background": false
  },
  "middle-east": {
    "index": 39,
    "delta": -9,
    "status": "tense",
    "background": false
  },
  "north-america": {
    "index": 43,
    "delta": 15,
    "status": "danger",
    "background": false
  },
  "south-asia": {
    "index": 46,
    "delta": -3,
    "status": "danger",
    "background": false
  },
  "africa": {
    "index": 46,
    "delta": -1,
    "status": "danger",
    "background": false
  }
};
})();
