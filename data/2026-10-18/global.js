window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-10-18"] = window.CI_DATA.snapshots["2026-10-18"] || {};
  s.global = {
  "index": 64,
  "delta": 8
};
  s.published = "2026-10-18";
  s.through = "2026-10-18";
  s.methodology = "3.0";
  s.regions_taxonomy = "2.0";
  s.dataState = "published";
  s.q = 1;
  s.nullWeight = 0;
  s.coverage = {
  "coveredDrivers": 9,
  "totalDrivers": 9
};
  s.confidence = "full";
  s.sensitivity = 0;
  s.coverageCriteria = {
  "covered": 34,
  "total": 46,
  "uncovered": [
    "D1.6",
    "D2.4",
    "D3.1",
    "D5.3",
    "D5.4",
    "D6.1",
    "D6.4",
    "D8.4",
    "D9.2",
    "D9.5",
    "D9.6b",
    "D9.7"
  ]
};
  s.recalc = {
  "at": "2026-10-18T15:10:59.064Z",
  "reason": "Еженедельный пересчёт",
  "previous": 64,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
})();
