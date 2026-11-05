window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.global = {
  "index": 51,
  "delta": -10
};
  s.published = "2026-08-30";
  s.through = "2026-08-30";
  s.methodology = "4.0";
  s.regions_taxonomy = "1.0";
  s.dataState = "published";
  s.q = 1;
  s.nullWeight = 0;
  s.coverage = {
  "coveredDrivers": 9,
  "totalDrivers": 9
};
  s.confidence = "full";
  s.sensitivity = 0.6;
  s.coverageCriteria = {
  "covered": 38,
  "total": 46,
  "uncovered": [
    "D5.2",
    "D5.3",
    "D6.1",
    "D8.3",
    "D9.1",
    "D9.5",
    "D9.6a",
    "D9.6b"
  ]
};
  s.recalc = {
  "at": "2026-11-04T10:03:03.184Z",
  "reason": "Еженедельный пересчёт",
  "previous": 51,
  "methodologyBefore": "3.0",
  "methodologyAfter": "4.0",
  "approvedBy": "Editor-in-Chief"
};
})();
