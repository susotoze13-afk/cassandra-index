// calc/prepare-week.js — механика новой недели для еженедельного расчёта
// (weekly-calc.yml): добавление даты в RECALC_WEEKS (calc/calc.js) и в
// CI_WEEKS/CI_LATEST (data/latest.js). Чистые швы addRecalcWeek/addLatestWeek
// не трогают ФС и покрыты tests/prepare-week.test.js; CLI — тонкая обвязка
// в стиле calc.js:
//   node calc/prepare-week.js <неделя>          — только печать
//   node calc/prepare-week.js --write <неделя>  — запись файлов
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);
const WEEK_RE = /^\d{4}-\d{2}-\d{2}$/;

function assertWeek(week) {
  if (typeof week !== 'string' || !WEEK_RE.test(week)) {
    throw new Error(`неделя должна быть в формате YYYY-MM-DD, получено: ${week}`);
  }
}

// calc/calc.js: вставляет week в конец RECALC_WEEKS, если там её нет.
export function addRecalcWeek(src, week) {
  assertWeek(week);
  const m = src.match(/const RECALC_WEEKS = \[([^\]]*)\]/);
  if (!m) throw new Error('RECALC_WEEKS не найден');
  const dates = m[1].match(/'\d{4}-\d{2}-\d{2}'/g) || [];
  if (dates.includes(`'${week}'`)) return { src, changed: false };
  const inner = m[1].trimEnd() + `, '${week}'`;
  return {
    src: src.replace(/const RECALC_WEEKS = \[[^\]]*\]/, `const RECALC_WEEKS = [${inner}]`),
    changed: true,
  };
}

// data/latest.js: дописывает week в CI_WEEKS (по возрастанию) и поднимает
// CI_LATEST, если week новее; старую неделю в CI_LATEST не понижает
// (защита при ручном workflow_dispatch для прошлой недели).
export function addLatestWeek(src, week) {
  assertWeek(week);
  const m = src.match(/window\.CI_WEEKS = \[([^\]]*)\]/);
  if (!m) throw new Error('CI_WEEKS не найден');
  let weeks;
  try {
    weeks = JSON.parse(`[${m[1]}]`);
  } catch (e) {
    throw new Error(`CI_WEEKS не парсится: ${e.message}`);
  }
  if (!Array.isArray(weeks)) throw new Error('CI_WEEKS не массив');
  if (!weeks.includes(week)) weeks.push(week);
  weeks.sort();
  const mL = src.match(/window\.CI_LATEST = "(\d{4}-\d{2}-\d{2})"/);
  if (!mL) throw new Error('CI_LATEST не найден');
  const latest = mL[1] > week ? mL[1] : week;
  let out = src.replace(/window\.CI_WEEKS = \[[^\]]*\]/, `window.CI_WEEKS = ${JSON.stringify(weeks)}`);
  out = out.replace(/window\.CI_LATEST = "\d{4}-\d{2}-\d{2}"/, `window.CI_LATEST = "${latest}"`);
  return { src: out, changed: out !== src };
}

function main() {
  const args = process.argv.slice(2);
  const writeMode = args.includes('--write');
  const week = args.find((a) => !a.startsWith('--'));
  if (!week) {
    process.stdout.write('нужна неделя YYYY-MM-DD (node calc/prepare-week.js [--write] <неделя>)\n');
    process.exitCode = 1;
    return;
  }
  const calcPath = path.join(ROOT, 'calc', 'calc.js');
  const latestPath = path.join(ROOT, 'data', 'latest.js');
  try {
    // Оба пересчёта — до любой записи: битый вход не должен оставить
    // полузаписанный state (calc.js и latest.js меняются парой).
    const r1 = addRecalcWeek(readFileSync(calcPath, 'utf8'), week);
    const r2 = addLatestWeek(readFileSync(latestPath, 'utf8'), week);
    const out = [
      r1.changed ? `calc/calc.js: +${week} в RECALC_WEEKS` : 'calc/calc.js: неделя уже в RECALC_WEEKS',
      r2.changed ? `data/latest.js: ${week} учтена в CI_WEEKS/CI_LATEST` : 'data/latest.js: неделя уже учтена',
    ];
    if (writeMode) {
      if (r1.changed) writeFileSync(calcPath, r1.src, 'utf8');
      if (r2.changed) writeFileSync(latestPath, r2.src, 'utf8');
    } else {
      out.push('запись не выполнялась (без --write)');
    }
    process.stdout.write(out.join('\n') + '\n');
  } catch (e) {
    process.stdout.write(`ошибка: ${e && e.message ? e.message : e}\n`);
    process.exitCode = 1;
  }
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
