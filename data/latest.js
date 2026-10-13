// Указатель на текущую неделю. Новая неделя = каталог data/<дата> +
// дата в CI_WEEKS ниже. Код (js/) и index.html не меняются.
window.CI_WEEKS = ["2026-08-02","2026-08-09","2026-08-16","2026-08-23","2026-08-30","2026-09-06","2026-09-13","2026-09-20","2026-09-27","2026-10-04","2026-10-11"];
window.CI_LATEST = "2026-10-11";
window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };
window.CI_DATA.latest = window.CI_LATEST;
// Синхронная подгрузка комбинированных снапшотов недель (document.write в момент
// парсинга — работает и с file://, где fetch недоступен). Один файл на неделю
// вместо 11 частей; части остаются на диске (пайплайн, тесты), week.js —
// производная от них (calc.js --write / calc/migrate-week-combined.js).
(function () {
  for (var w = 0; w < window.CI_WEEKS.length; w++) {
    document.write('<script src="data/' + window.CI_WEEKS[w] + '/week.js"><\/script>');
  }
})();
