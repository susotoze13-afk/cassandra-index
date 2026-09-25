window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
(function () {
  var s = window.CI_DATA.snapshots["2026-08-30"] = window.CI_DATA.snapshots["2026-08-30"] || {};
  s.global = null;
  s.published = "2026-08-30";
  s.through = "2026-08-23";
  s.methodology = "2.0";
  s.dataState = "insufficient";
  s.q = 0.1684;
  s.nullWeight = 0.8316;
  s.coverage = {
  "coveredDrivers": 1,
  "totalDrivers": 9
};
  s.confidence = "none";
  s.preview = {
  "index": 60,
  "internal": 59.573
};
  s.recalc = {
  "at": "2026-09-24T19:42:17.781Z",
  "reason": "Покрытие 5/45 критериев — ниже порога публикации (nullWeight 0.8316, порог 0.4); методология 1.0→2.0 (предпродакшен-решения B1–B6)",
  "previous": null,
  "methodologyBefore": "1.0",
  "methodologyAfter": "2.0",
  "approvedBy": "Editor-in-Chief"
};
})();
