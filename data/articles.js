// articles.js — исторический манифест рубрики (ADR 0037): недели с выпуском и
// document.write-загрузка week.js + article.js. Статический блог (ADR 0056) его не
// использует; файл оставлен для совместимости. Генерируется article-build.js.
window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
window.CI_ARTICLES = ["2026-10-18","2026-10-25","2026-11-01","2026-11-08","2026-11-15"];
(function () {
  window.CI_DATA.latest = "2026-11-15";
  document.write('<script src="data/2026-10-18/week.js"><\/script>');
  document.write('<script src="data/2026-10-18/article.js"><\/script>');
  document.write('<script src="data/2026-10-25/week.js"><\/script>');
  document.write('<script src="data/2026-10-25/article.js"><\/script>');
  document.write('<script src="data/2026-11-01/week.js"><\/script>');
  document.write('<script src="data/2026-11-01/article.js"><\/script>');
  document.write('<script src="data/2026-11-08/week.js"><\/script>');
  document.write('<script src="data/2026-11-08/article.js"><\/script>');
  document.write('<script src="data/2026-11-15/week.js"><\/script>');
  document.write('<script src="data/2026-11-15/article.js"><\/script>');
})();
