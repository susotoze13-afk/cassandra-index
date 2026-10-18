// articles.js — манифест рубрики (ADR 0037): недели с выпуском и document.write-
// загрузка week.js + article.js этих недель. Тянет только articles.html. Генерируется
// article-build.js, вручную не править.
window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
window.CI_ARTICLES = ["2026-10-18"];
(function () {
  window.CI_DATA.latest = "2026-10-18";
  document.write('<script src="data/2026-10-18/week.js"><\/script>');
  document.write('<script src="data/2026-10-18/article.js"><\/script>');
})();
