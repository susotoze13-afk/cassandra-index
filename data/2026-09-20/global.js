window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.global = {
  "index": 56,
  "delta": 13
};
  s.published = "2026-09-20";
  s.through = "2026-09-20";
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
  s.sensitivity = 1.6;
  s.coverageCriteria = {
  "covered": 43,
  "total": 46,
  "uncovered": [
    "D9.1",
    "D9.5",
    "D9.7"
  ]
};
  s.recalc = {
  "at": "2026-11-04T10:18:20.861Z",
  "reason": "Еженедельный пересчёт",
  "previous": 56,
  "methodologyBefore": "3.0",
  "methodologyAfter": "4.0",
  "approvedBy": "Editor-in-Chief"
};
})();
