# Таск 01 (A): Доводка кода и тестов calc/

Зона: `calc/calibrate.js`, `calc/engine.js`, `calc/calc.js`,
`tests/calibrate.test.js`, `tests/calc-engine.test.js`.

Пункты 1–9 из спецификации (`spec.md`, раздел «Таск A»). Ключевое:

- Новый тест tie-break selectK (равный minMargin → меньший k).
- Общая функция попадания в окно в calibrate.js (evaluation + итог).
- totalCriteria из engine, runWeek через engine.regionalIndex,
  самопроверка до записи в writeWeek.
- round1 → переименование; мёртвая ветка Д9.6b; d8Strength упрощение;
  комментарий 73.10585786 → 72.61.

Жёсткое ограничение: числа не меняются — три недели остаются 60/58/57,
якоря и k=1.95 без изменений. Если правка меняет числа — стоп, вернуться
с объяснением.

Не трогать: `js/**`, `data/**`, `cassandra-index-prototype.html`,
`PRD_Casandra_Index.md`, `METHODOLOGY.md`, `build.js` (бандл не нужен).

Тесты: `node --test` из корня (без аргументов; `node --test tests/` на
Windows не использовать). Один файл: `node --test tests/<имя>.test.js`.
Было 150 passed / 0 fail — после таска число растёт.
