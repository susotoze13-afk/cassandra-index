window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-09-20"] = window.CI_DATA.snapshots["2026-09-20"] || {};
  s.global = null;
  s.published = "2026-09-20";
  s.through = "2026-09-13";
  s.methodology = "2.0";
  s.dataState = "insufficient";
  s.q = 0.7603;
  s.nullWeight = 0.2397;
  s.coverage = {
  "coveredDrivers": 6,
  "totalDrivers": 9
};
  s.confidence = "none";
  s.preview = {
  "index": 59,
  "internal": 58.859
};
  s.recalc = {
  "at": "2026-09-25T16:26:03.058Z",
  "reason": "Покрытие 26/45 критериев — ниже порога публикации (nullWeight 0.2397, порог 0.4)",
  "previous": null,
  "methodologyBefore": "2.0",
  "methodologyAfter": "2.0",
  "approvedBy": "Editor-in-Chief"
};
})();
