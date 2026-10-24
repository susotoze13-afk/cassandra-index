window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-13"] = window.CI_DATA.snapshots["2026-09-13"] || {};
  s.global = {
  "index": 43,
  "delta": 1
};
  s.published = "2026-09-13";
  s.through = "2026-09-13";
  s.methodology = "3.0";
  s.regions_taxonomy = "1.0";
  s.dataState = "published";
  s.q = 1;
  s.nullWeight = 0;
  s.coverage = {
  "coveredDrivers": 9,
  "totalDrivers": 9
};
  s.confidence = "full";
  s.sensitivity = 5.3;
  s.coverageCriteria = {
  "covered": 41,
  "total": 46,
  "uncovered": [
    "D3.5",
    "D4.2",
    "D9.1",
    "D9.4",
    "D9.5"
  ]
};
  s.recalc = {
  "at": "2026-10-24T17:53:49.402Z",
  "reason": "Еженедельный пересчёт",
  "previous": 43,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
})();
