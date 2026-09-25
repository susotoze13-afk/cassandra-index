// Указатель на текущую неделю. Новая неделя = каталог data/<дата> +
// дата в CI_WEEKS ниже. Код (js/) и index.html не меняются.
window.CI_WEEKS = ["2026-08-02","2026-08-09","2026-08-16","2026-08-23","2026-08-30","2026-09-06","2026-09-13","2026-09-20"];
window.CI_LATEST = "2026-09-20";
window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
window.CI_DATA.latest = window.CI_LATEST;
// Синхронная подгрузка всех файлов снапшотов (document.write в момент парсинга —
// работает и с file://, где fetch недоступен).
(function () {
  var files = ["global","regions","region-europe","region-east-asia","region-middle-east","region-north-america","region-south-asia","region-africa","trend","drivers","sources"];
  for (var w = 0; w < window.CI_WEEKS.length; w++) {
    for (var f = 0; f < files.length; f++) {
      document.write('<script src="data/' + window.CI_WEEKS[w] + '/' + files[f] + '.js"><\/script>');
    }
  }
})();
