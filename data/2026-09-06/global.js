window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-06"] = window.CI_DATA.snapshots["2026-09-06"] || {};
  s.global = {
  "index": 42,
  "delta": -9
};
  s.published = "2026-09-06";
  s.through = "2026-09-06";
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
  s.sensitivity = 2.5;
  s.coverageCriteria = {
  "covered": 41,
  "total": 46,
  "uncovered": [
    "D6.2",
    "D6.3",
    "D9.1",
    "D9.6b",
    "D9.7"
  ]
};
  s.recalc = {
  "at": "2026-10-24T17:50:46.246Z",
  "reason": "Еженедельный пересчёт",
  "previous": 42,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
})();
