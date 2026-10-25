// Межкодировочная надёжность: сравнение двух независимых разметок одной недели.
// Пины: формула κ (номинальная и линейно взвешенная), вырожденные случаи,
// шаблон листа без подсказок первого кодировщика, CLI.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SHEET_VERSION,
  bandOf,
  blankSheet,
  driverOf,
  normalizeSheet,
  kappaNominal,
  kappaWeighted,
  coveragePairs,
  valuePairs,
  reliability,
  formatReport,
} from '../calc/coding-reliability.js';

const ROOT_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const sheet = (week, coder, values) => ({ sheet_version: SHEET_VERSION, week, coder, values });

// Классическая таблица 2×2 для κ Коэна:
// да/да 20, да/нет 5, нет/да 10, нет/нет 15 → po = 0,7; pe = 0,5; κ = 0,4.
function classicPairs() {
  const pairs = [];
  const push = (a, b, times) => { for (let i = 0; i < times; i += 1) pairs.push({ a, b }); };
  push(1, 1, 20);
  push(1, 0, 5);
  push(0, 1, 10);
  push(0, 0, 15);
  return pairs;
}

test('normalizeSheet: битые листы называют поле, а не падают молча', () => {
  assert.match(normalizeSheet(null).errors.join(' '), /объект/);
  const bad = normalizeSheet({ week: '18.10.2026', coder: ' ', values: [] });
  assert.match(bad.errors.join(' '), /week/);
  assert.match(bad.errors.join(' '), /coder/);
  assert.match(bad.errors.join(' '), /values/);
  const outOfRange = normalizeSheet({ week: '2026-10-18', coder: 'A', values: { 'D1.1': 1.5 } });
  assert.match(outOfRange.errors.join(' '), /вне 0…1/);
  const ok = normalizeSheet({ week: '2026-10-18', coder: ' A ', values: { 'D1.1': 0.5, 'D1.2': null } });
  assert.deepEqual(ok.errors, []);
  assert.equal(ok.sheet.coder, 'A');
});

test('blankSheet: значения пустые, привязки источников к критериям нет', () => {
  const criteria = [
    { id: 'D1.1', driver: 'D1', scale: 'count', dir: 'esc', name: { ru: 'Тест', en: 'Test' }, desc: { ru: 'т', en: 't' } },
    { id: 'D9.7', driver: 'D9', scale: 'ordinal', dir: 'deesc', name: { ru: 'Тест 2', en: 'Test 2' }, desc: { ru: 'т', en: 't' } },
  ];
  const sources = [{ id: 'src-1', title: { ru: 'Заголовок', en: 'Title' }, domain: 'example.org', url: 'https://example.org/a', publication_date: '2026-10-17', source_type: 'primary', cluster_id: 'A-mainstream', criteria: ['D1.1'] }];
  const blank = blankSheet('2026-10-18', criteria, sources, '');
  assert.equal(blank.week, '2026-10-18');
  assert.deepEqual(Object.keys(blank.values), ['D1.1', 'D9.7']);
  for (const value of Object.values(blank.values)) assert.equal(value, null, 'значения автора не переносятся');
  assert.ok(blank.definitions['D1.1'].name.ru, 'определение критерия нужно кодировщику');
  assert.equal(blank.sources.length, 1);
  assert.ok(!Object.hasOwn(blank.sources[0], 'criteria'), 'привязка «источник → критерий» — подсказка, её быть не должно');
  assert.equal(blank.sources[0].cluster_id, 'A-mainstream', 'кластер источника переносится: он часть правил');
  assert.throws(() => blankSheet('18.10.2026', criteria, sources), /YYYY-MM-DD/);
  assert.throws(() => blankSheet('2026-10-18', [], sources), /список критериев/);
});

test('номинальная κ: классическая таблица 2×2 даёт 0,4', () => {
  const stats = kappaNominal(classicPairs());
  assert.equal(stats.n, 50);
  assert.ok(Math.abs(stats.po - 0.7) < 1e-12);
  assert.ok(Math.abs(stats.pe - 0.5) < 1e-12);
  assert.ok(Math.abs(stats.kappa - 0.4) < 1e-12, `κ = ${stats.kappa}`);
  assert.equal(bandOf(stats.kappa), 'умеренное');
});

test('κ: полное согласие — 1, вырождение — null с причиной, а не ноль', () => {
  const perfect = kappaNominal([{ a: 1, b: 1 }, { a: 0, b: 0 }, { a: 1, b: 1 }]);
  assert.equal(perfect.kappa, 1);
  assert.equal(perfect.reason, null);

  const degenerate = kappaNominal([{ a: 1, b: 1 }, { a: 1, b: 1 }]);
  assert.equal(degenerate.kappa, null);
  assert.match(degenerate.reason, /одной категории/);
  assert.equal(bandOf(degenerate.kappa), 'не определено');
  assert.equal(bandOf(-0.2), 'хуже случайного');
});

test('взвешенная κ: полное согласие 1, разнос по шкале — отрицательная', () => {
  const perfect = kappaWeighted([
    { a: 0, b: 0 }, { a: 0.33, b: 0.33 }, { a: 0.67, b: 0.67 }, { a: 1, b: 1 },
  ]);
  assert.equal(perfect.kappa, 1);

  // Кодировщики «не совпали на шаг»: штраф меньше, чем при полном разносе.
  const near = kappaWeighted([{ a: 0, b: 0.33 }, { a: 0.33, b: 0.67 }]);
  const far = kappaWeighted([{ a: 0, b: 1 }, { a: 1, b: 0 }]);
  assert.ok(near.kappa > far.kappa, `близкое расхождение должно весить меньше: ${near.kappa} vs ${far.kappa}`);

  const single = kappaWeighted([{ a: 0.5, b: 0.5 }]);
  assert.equal(single.kappa, null);
  assert.match(single.reason, /одна категория/);
});

test('пары: null исключается из значений, но входит в покрытие', () => {
  const a = sheet('2026-10-18', 'Автор', { 'D1.1': 0.5, 'D1.2': null, 'D3.1': 1 });
  const b = sheet('2026-10-18', 'Рецензент', { 'D1.1': 0.5, 'D1.2': 0.33, 'D3.1': null });
  const coverage = coveragePairs(a, b);
  assert.equal(coverage.length, 3);
  assert.deepEqual(coverage.map((pair) => pair.driver), ['D1', 'D1', 'D3']);
  assert.deepEqual(coverage.map((pair) => [pair.a, pair.b]), [[1, 1], [0, 1], [1, 0]]);

  const values = valuePairs(a, b);
  assert.equal(values.length, 1, 'сравниваются только обоюдно покрытые критерии');
  assert.equal(values[0].id, 'D1.1');
});

test('reliability: разные недели или один кодировщик — отказ, не отчёт', () => {
  const a = sheet('2026-10-18', 'A', { 'D1.1': 0.5 });
  const b = sheet('2026-10-25', 'B', { 'D1.1': 0.5 });
  const sameWeek = reliability(a, b);
  assert.equal(sameWeek.ok, false);
  assert.match(sameWeek.errors.join(' '), /недели листов не совпадают/);

  const sameCoder = reliability(a, sheet('2026-10-18', 'A', { 'D1.1': 0.5 }));
  assert.equal(sameCoder.ok, false);
  assert.match(sameCoder.errors.join(' '), /один и тот же кодировщик/);
});

test('reliability: отчёт несёт покрытие, значения и разбивку по драйверам', () => {
  const valuesA = { 'D1.1': 0, 'D1.2': 0.33, 'D3.1': 1, 'D5.1': null, 'D9.3': 0.67 };
  const valuesB = { 'D1.1': 0, 'D1.2': 0.33, 'D3.1': 1, 'D5.1': 0.5, 'D9.3': 0.67 };
  const report = reliability(sheet('2026-10-18', 'Автор', valuesA), sheet('2026-10-18', 'Рецензент', valuesB));
  assert.equal(report.ok, true);
  assert.equal(report.coverage.total, 5);
  assert.equal(report.coverage.coveredA, 4);
  assert.equal(report.coverage.coveredB, 5);
  // 4 совпадения из 5, но покрытие почти целиком «1» у одного из кодировщиков:
  // κ честно около нуля — при таком перекосе маргиналов согласие не отличимо от случайного.
  assert.ok(Math.abs(report.coverage.po - 0.8) < 1e-12);
  assert.equal(bandOf(report.coverage.kappa), 'слабое');
  assert.ok(report.coverage.kappa >= 0 && report.coverage.kappa < 0.05, `κ = ${report.coverage.kappa}`);

  // Сбалансированные маргиналы: 5 из 6 совпадений дают уже заметную κ.
  const balancedA = sheet('2026-10-18', 'Автор', { 'D1.1': 0.5, 'D1.2': 0.5, 'D3.1': null, 'D5.1': null, 'D9.3': 0.5, 'D9.4': null });
  const balancedB = sheet('2026-10-18', 'Рецензент', { 'D1.1': 0.5, 'D1.2': 0.5, 'D3.1': null, 'D5.1': null, 'D9.3': 0.5, 'D9.4': 0.5 });
  const balanced = reliability(balancedA, balancedB);
  assert.ok(balanced.coverage.kappa > 0.6, `κ = ${balanced.coverage.kappa}`);

  assert.equal(report.values.n, 4);
  assert.equal(report.values.kappa, 1, 'по обоюдно покрытым значения совпали');
  assert.equal(report.coverage.byDriver.length, 4);

  const text = formatReport(report);
  assert.match(text, /Неделя 2026-10-18/);
  assert.match(text, /Покрытие/);
  assert.match(text, /κ/);
  assert.match(formatReport({ ok: false, errors: ['битый лист'] }), /Листы не сравнимы/);
});

test('выравнивание по драйверу не зависит от порядка критериев в листе', () => {
  assert.equal(driverOf('D9.6a'), 'D9');
  assert.equal(driverOf('D1.1'), 'D1');
  assert.equal(driverOf('мусор'), 'unknown');
});

test('CLI template: лист на реальный вход недели, значения пустые, 46 критериев', () => {
  const stdout = execFileSync(process.execPath, [path.join(ROOT_DIR, 'calc', 'coding-reliability.js'), 'template', '2026-10-18'], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
  const parsed = JSON.parse(stdout);
  assert.equal(parsed.week, '2026-10-18');
  assert.equal(Object.keys(parsed.values).length, 46, 'лист обязан покрывать все 46 критериев, включая слепые');
  assert.equal(Object.values(parsed.values).filter((value) => value !== null).length, 0, 'значения автора не утекают в шаблон');
  assert.ok(parsed.sources.length > 20, 'корпус источников недели нужен кодировщику');
  assert.ok(parsed.instructions.length >= 3);
});
