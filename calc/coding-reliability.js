// coding-reliability.js — межкодировочная надёжность (двойное кодирование).
//
// Зачем: методическая статья не может утверждать, что 46 критериев размечены
// «по правилам», если разметку делал один человек и совпадение не измерено.
// Модуль сравнивает два независимых кодировочных листа одной недели и считает
// согласие по покрытию (критерий покрыт / не покрыт) и по значениям (0…1).
//
// Три шва:
//   blankSheet(week, criteria, sources) — лист для второго кодировщика БЕЗ значений
//     автора и БЕЗ привязки источников к критериям (иначе это подсказка, а не
//     независимая разметка);
//   authorSheet(week, criteria, input) — лист автора из опубликованного входа
//     недели (calc/input/<неделя>.json): значения критериев как есть, null у
//     слепых; нужен второй стороной сравнения, когда лист кодировщика вернулся;
//   reliability(sheetA, sheetB) — чистое сравнение: покрытие (номинальная κ),
//     значения (линейно взвешенная κ), разбивка по драйверам.
//
// CLI:
//   node calc/coding-reliability.js template <неделя> [--out <файл>]
//   node calc/coding-reliability.js author <неделя> [--out <файл>]
//   node calc/coding-reliability.js compare <a.json> <b.json>
//
// Диска и сети в чистых функциях нет; CLI читает вход недели только для шаблона.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CRITERIA_LIST } from '../js/criteria.js';
import { normalizeCriterion } from './engine.js';

export const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const SHEET_VERSION = 1;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// Границы согласия (Landis & Koch, 1977) — конвенция описания, не порог приёмки.
const BANDS = [
  { max: 0, label: 'хуже случайного' },
  { max: 0.2, label: 'слабое' },
  { max: 0.4, label: 'умеренное' },
  { max: 0.6, label: 'среднее' },
  { max: 0.8, label: 'существенное' },
  { max: 1.0001, label: 'почти полное' },
];

export function bandOf(kappa) {
  if (typeof kappa !== 'number' || !Number.isFinite(kappa)) return 'не определено';
  if (kappa < 0) return BANDS[0].label;
  for (const band of BANDS.slice(1)) if (kappa < band.max) return band.label;
  return BANDS[BANDS.length - 1].label;
}

export function driverOf(id) {
  const dot = String(id).indexOf('.');
  return dot > 0 ? String(id).slice(0, dot) : 'unknown';
}

export function normalizeSheet(sheet) {
  const errors = [];
  if (!sheet || typeof sheet !== 'object' || Array.isArray(sheet)) {
    return { sheet: null, errors: ['лист: ожидается объект'] };
  }
  if (typeof sheet.week !== 'string' || !ISO_DATE.test(sheet.week)) {
    errors.push('week: ожидается дата YYYY-MM-DD');
  }
  if (typeof sheet.coder !== 'string' || !sheet.coder.trim()) {
    errors.push('coder: ожидается непустое имя кодировщика');
  }
  const values = sheet.values;
  if (!values || typeof values !== 'object' || Array.isArray(values)) {
    errors.push('values: ожидается объект «критерий → значение|null»');
    return { sheet: null, errors };
  }
  for (const [id, value] of Object.entries(values)) {
    if (value === null) continue;
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      errors.push(`values.${id}: ожидается число или null`);
      continue;
    }
    if (value < 0 || value > 1) errors.push(`values.${id}: значение вне 0…1`);
  }
  const notes = sheet.notes;
  if (notes !== undefined) {
    if (typeof notes !== 'object' || notes === null || Array.isArray(notes)) {
      errors.push('notes: ожидается объект «критерий → строка»');
    } else {
      for (const [id, note] of Object.entries(notes)) {
        if (typeof note !== 'string') errors.push(`notes.${id}: ожидается строка`);
      }
    }
  }
  return { sheet: { week: sheet.week, coder: sheet.coder.trim(), values, notes }, errors };
}

// Лист для второго кодировщика: определения критериев и корпус источников недели
// без значений автора и без привязки «источник → критерий».
export function blankSheet(week, criteria, sources, coder = '') {
  if (!ISO_DATE.test(String(week))) throw new Error('blankSheet: неделя должна быть датой YYYY-MM-DD');
  if (!Array.isArray(criteria) || criteria.length === 0) throw new Error('blankSheet: нужен список критериев');
  const values = {};
  const definitions = {};
  const notes = {};
  for (const item of criteria) {
    values[item.id] = null;
    notes[item.id] = '';
    definitions[item.id] = {
      driver: item.driver,
      scale: item.scale,
      dir: item.dir,
      name: item.name,
      desc: item.desc,
    };
  }
  return {
    sheet_version: SHEET_VERSION,
    week,
    coder,
    instructions: [
      'Заполните values: число 0…1 по правилам шкалы критерия либо null, если в окне недели сигнала нет.',
      'Покрытие не дотягивается: если источников в окне нет — null, а не оценка по памяти.',
      'Источники недели — в поле sources (это собранный корпус, привязка к критериям скрыта намеренно).',
      'Значения первого кодировщика вам не показываются до сдачи листа.',
      'Поле notes — необязательная строка «почему» для спорного решения; перенос Д2 из прошлой недели обязан быть помечен там.',
    ],
    values,
    notes,
    definitions,
    sources: (sources || []).map((item) => ({
      id: item.id,
      title: item.title,
      domain: item.domain,
      url: item.url,
      publication_date: item.publication_date,
      source_type: item.source_type,
      cluster_id: item.cluster_id,
    })),
  };
}

// Лист автора: значения берутся из опубликованного входа недели. Слепой критерий
// (criteria[id] = null) остаётся null. Диска здесь нет — вход передаётся вызывающим.
export function authorSheet(week, criteria, input, coder = 'author') {
  if (!ISO_DATE.test(String(week))) throw new Error('authorSheet: неделя должна быть датой YYYY-MM-DD');
  if (!Array.isArray(criteria) || criteria.length === 0) throw new Error('authorSheet: нужен список критериев');
  if (!input || typeof input !== 'object' || typeof input.criteria !== 'object' || input.criteria === null) {
    throw new Error('authorSheet: нужен вход недели с объектом criteria');
  }
  const sheet = blankSheet(week, criteria, [], coder);
  for (const item of criteria) {
    const entry = input.criteria[item.id];
    // Покрытый критерий нормируется тем же швом, что и движок: value либо events
    // (счётная шкала, value = min(1, Σsev/capCount)); слепой (null) остаётся null.
    sheet.values[item.id] = entry ? normalizeCriterion(entry) : null;
  }
  return sheet;
}

function bothSheets(a, b) {
  const { sheet: left, errors: leftErrors } = normalizeSheet(a);
  const { sheet: right, errors: rightErrors } = normalizeSheet(b);
  const errors = [...leftErrors.map((e) => `A: ${e}`), ...rightErrors.map((e) => `B: ${e}`)];
  if (left && right && left.week !== right.week) errors.push('недели листов не совпадают');
  if (left && right && left.coder === right.coder) errors.push('один и тот же кодировщик в обоих листах');
  return { left, right, errors };
}

// Покрытие: критерий покрыт, если значение не null. Номинальная κ по двум категориям.
export function coveragePairs(a, b) {
  const { left, right } = bothSheets(a, b);
  if (!left || !right) return [];
  const ids = Object.keys(left.values).filter((id) => Object.hasOwn(right.values, id));
  return ids.map((id) => ({
    id,
    driver: driverOf(id),
    a: left.values[id] === null ? 0 : 1,
    b: right.values[id] === null ? 0 : 1,
  }));
}

// Значения: только обоюдно покрытые критерии (иначе сравнивать нечего).
export function valuePairs(a, b) {
  const { left, right } = bothSheets(a, b);
  if (!left || !right) return [];
  const ids = Object.keys(left.values).filter((id) => Object.hasOwn(right.values, id));
  return ids
    .filter((id) => left.values[id] !== null && right.values[id] !== null)
    .map((id) => ({ id, driver: driverOf(id), a: left.values[id], b: right.values[id] }));
}

export function kappaNominal(pairs) {
  const n = pairs.length;
  if (n === 0) return { n, po: null, pe: null, kappa: null, reason: 'нет пар' };
  const categories = [...new Set(pairs.flatMap((pair) => [pair.a, pair.b]))];
  const left = new Map(categories.map((c) => [c, 0]));
  const right = new Map(categories.map((c) => [c, 0]));
  let agree = 0;
  for (const pair of pairs) {
    left.set(pair.a, left.get(pair.a) + 1);
    right.set(pair.b, right.get(pair.b) + 1);
    if (pair.a === pair.b) agree += 1;
  }
  const po = agree / n;
  let pe = 0;
  for (const c of categories) pe += (left.get(c) / n) * (right.get(c) / n);
  if (Math.abs(1 - pe) < 1e-12) {
    return { n, po, pe, kappa: null, reason: 'вырожденное распределение: все суждения в одной категории' };
  }
  return { n, po, pe, kappa: (po - pe) / (1 - pe), reason: null };
}

// Линейно взвешенная κ (Cohen, веса расхождения): расхождение в 0,1 по шкале 0…1
// весит меньше, чем в 0,5. Взвешивается именно несогласие — иначе полное совпадение
// давало бы отрицательную κ.
export function kappaWeighted(pairs) {
  const n = pairs.length;
  if (n === 0) return { n, po: null, pe: null, kappa: null, reason: 'нет пар' };
  const categories = [...new Set(pairs.flatMap((pair) => [pair.a, pair.b]))].sort((x, y) => x - y);
  const index = new Map(categories.map((c, i) => [c, i]));
  const size = categories.length;
  const left = new Map(categories.map((c) => [c, 0]));
  const right = new Map(categories.map((c) => [c, 0]));
  for (const pair of pairs) {
    left.set(pair.a, left.get(pair.a) + 1);
    right.set(pair.b, right.get(pair.b) + 1);
  }
  if (size < 2) {
    return { n, po: 1, pe: 1, kappa: null, reason: 'одна категория значений: расхождений нет, κ не определена' };
  }
  const disagreement = (i, j) => Math.abs(i - j) / (size - 1);
  let observed = 0; // среднее взвешенное расхождение в выборке
  for (const pair of pairs) observed += disagreement(index.get(pair.a), index.get(pair.b));
  observed /= n;
  let expected = 0; // то же при независимой разметке (по маргиналам)
  for (const a of categories) {
    for (const b of categories) {
      expected += disagreement(index.get(a), index.get(b)) * (left.get(a) / n) * (right.get(b) / n);
    }
  }
  if (expected < 1e-12) {
    return { n, po: 1 - observed, pe: 1 - expected, kappa: null, reason: 'ожидаемое расхождение близко к нулю' };
  }
  return { n, po: 1 - observed, pe: 1 - expected, kappa: 1 - observed / expected, reason: null };
}

function byDriver(pairs, scorer) {
  const groups = new Map();
  for (const pair of pairs) {
    const key = pair.driver;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(pair);
  }
  return [...groups.entries()]
    .sort((x, y) => x[0].localeCompare(y[0], 'en', { numeric: true }))
    .map(([driver, group]) => ({ driver, n: group.length, kappa: scorer(group).kappa }));
}

export function reliability(a, b) {
  const { left, right, errors } = bothSheets(a, b);
  if (errors.length > 0) return { ok: false, errors };
  const coverage = coveragePairs(a, b);
  const values = valuePairs(a, b);
  const coverageStats = kappaNominal(coverage);
  const valueStats = kappaWeighted(values);
  return {
    ok: true,
    errors: [],
    week: left.week,
    coders: [left.coder, right.coder],
    coverage: {
      ...coverageStats,
      band: bandOf(coverageStats.kappa),
      coveredA: coverage.filter((pair) => pair.a === 1).length,
      coveredB: coverage.filter((pair) => pair.b === 1).length,
      total: coverage.length,
      byDriver: byDriver(coverage, kappaNominal),
    },
    values: {
      ...valueStats,
      band: bandOf(valueStats.kappa),
      byDriver: byDriver(values, kappaWeighted),
    },
  };
}

export function formatReport(report) {
  if (!report.ok) return `Листы не сравнимы:\n${report.errors.map((e) => `  - ${e}`).join('\n')}`;
  const pct = (value) => (typeof value === 'number' ? value.toFixed(3) : 'н/д');
  const lines = [
    `Неделя ${report.week}: ${report.coders[0]} vs ${report.coders[1]}`,
    '',
    `Покрытие (критерий покрыт / не покрыт), суждений ${report.coverage.total}:`,
    `  покрыто: A ${report.coverage.coveredA}, B ${report.coverage.coveredB}`,
    `  согласие po = ${pct(report.coverage.po)}, κ = ${pct(report.coverage.kappa)} — ${report.coverage.band}`,
  ];
  if (report.coverage.reason) lines.push(`  (${report.coverage.reason})`);
  lines.push(
    '',
    `Значения, обоюдно покрытых критериев ${report.values.n}:`,
    `  po (взвешенное) = ${pct(report.values.po)}, κ = ${pct(report.values.kappa)} — ${report.values.band}`,
  );
  if (report.values.reason) lines.push(`  (${report.values.reason})`);
  lines.push('', 'По драйверам (значения):');
  for (const row of report.values.byDriver) {
    lines.push(`  ${row.driver}: n = ${row.n}, κ = ${pct(row.kappa)}`);
  }
  return lines.join('\n');
}

// ---------- CLI ----------

function readJson(file) {
  if (!existsSync(file)) throw new Error(`файл не найден: ${file}`);
  return JSON.parse(readFileSync(file, 'utf8'));
}

function main(argv) {
  const [command, ...rest] = argv;
  const option = (name) => {
    const i = rest.indexOf(name);
    return i >= 0 ? rest[i + 1] : null;
  };

  if (command === 'template') {
    const week = rest.find((arg) => ISO_DATE.test(arg));
    if (!week) throw new Error('template: укажите неделю YYYY-MM-DD');
    const input = readJson(path.join(ROOT, 'calc', 'input', `${week}.json`));
    const sheet = blankSheet(week, CRITERIA_LIST, input.sources);
    const out = option('--out');
    const text = `${JSON.stringify(sheet, null, 2)}\n`;
    if (out) {
      writeFileSync(out, text);
      console.log(`шаблон: ${out} (критериев ${CRITERIA_LIST.length}, источников ${sheet.sources.length})`);
    } else {
      process.stdout.write(text);
    }
    return 0;
  }

  if (command === 'author') {
    const week = rest.find((arg) => ISO_DATE.test(arg));
    if (!week) throw new Error('author: укажите неделю YYYY-MM-DD');
    const input = readJson(path.join(ROOT, 'calc', 'input', `${week}.json`));
    const sheet = authorSheet(week, CRITERIA_LIST, input);
    const out = option('--out');
    const text = `${JSON.stringify(sheet, null, 2)}\n`;
    if (out) {
      writeFileSync(out, text);
      console.log(`лист автора: ${out} (покрыто ${Object.values(sheet.values).filter((v) => v !== null).length} из ${CRITERIA_LIST.length})`);
    } else {
      process.stdout.write(text);
    }
    return 0;
  }

  if (command === 'compare') {
    const [a, b] = rest.filter((arg) => !arg.startsWith('--'));
    if (!a || !b) throw new Error('compare: нужны два файла листов');
    const report = reliability(readJson(a), readJson(b));
    console.log(formatReport(report));
    return report.ok ? 0 : 1;
  }

  console.log('node calc/coding-reliability.js template <неделя> [--out <файл>]');
  console.log('node calc/coding-reliability.js author <неделя> [--out <файл>]');
  console.log('node calc/coding-reliability.js compare <a.json> <b.json>');
  return 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    console.error(`ошибка: ${error.message}`);
    process.exitCode = 1;
  }
}
