// Разовая миграция: генерация data/<week>/week.js для существующих недель
// от дисковых частей той же функцией, что пользуется calc.js --write.
// Недели берутся из window.CI_WEEKS в data/latest.js; можно передать свои
// аргументами. Идемпотентен: перезапись тем же содержимым.
// Использование: node calc/migrate-week-combined.js [неделя …]
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { renderWeekCombined, loadWeekParts } from './calc.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);

const weeks = process.argv.slice(2);
if (!weeks.length) {
  const src = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
  const m = src.match(/window\.CI_WEEKS = (\[[^\]]*\])/);
  if (!m) throw new Error('window.CI_WEEKS не найден в data/latest.js');
  weeks.push(...JSON.parse(m[1]));
}

for (const week of weeks) {
  const parts = loadWeekParts(week);
  if (!parts) {
    console.error(`${week}: пропуск — на диске нет всех частей набора недели`);
    process.exitCode = 1;
    continue;
  }
  writeFileSync(path.join(ROOT, 'data', week, 'week.js'), renderWeekCombined(week, parts), 'utf8');
  console.log(`${week}: week.js (от ${Object.keys(parts).length} дисковых частей)`);
}
