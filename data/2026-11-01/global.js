window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-11-01"] = window.CI_DATA.snapshots["2026-11-01"] || {};
  s.global = {
  "index": 72,
  "delta": 4
};
  s.published = "2026-11-01";
  s.through = "2026-11-01";
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
  s.precursor = {
  "value": 48,
  "signalingSubgroups": 6
};
  s.coverageCriteria = {
  "covered": 35,
  "total": 46,
  "uncovered": [
    "D1.3",
    "D1.6",
    "D2.4",
    "D3.1",
    "D4.1",
    "D5.3",
    "D6.1",
    "D6.4",
    "D7.3",
    "D7.4",
    "D9.6a"
  ]
};
  s.recalc = {
  "at": "2026-11-01T09:51:39.772Z",
  "reason": "Еженедельный пересчёт",
  "previous": 70,
  "methodologyBefore": "3.0",
  "methodologyAfter": "3.0",
  "approvedBy": "Editor-in-Chief"
};
})();
