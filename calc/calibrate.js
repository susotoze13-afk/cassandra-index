// calibrate.js — калибровка параметра насыщающей кривой k на якорных
// профилях §9 по протоколу §10.1: перебор k по сетке, прогон профилей через
// engine, rolling-origin (ранние якоря выбирают k, поздние — только проверка),
// анализ чувствительности ±20 % для k и экспертных параметров (α, λ, ρ,
// U_abs, веса). CLI: `node calc/calibrate.js` — печать таблицы для журнала.
// Якорные профили — модельные (одна неделя, без инерции): см. журнал
// калибровки docs/calibration-journal.md.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { PARAMS, list } from './params.js';
import {
  CRITERIA,
  driverScore,
  d8Strength,
  aggregateD9,
  aggregateDrivers,
  validate,
} from './engine.js';

// Сетка перебора k (§5.2: k > 0). Шаг 0.05 — баланс точности и ширины вывода.
export const K_GRID = Object.freeze(
  Array.from({ length: 61 }, (_, i) => Math.round((1 + i * 0.05) * 100) / 100),
);

// --- Маппинг входного файла недели → драйверы для aggregateDrivers ---
// Тот же шов, который использует calc.js: criteria + driverConfidence
// (после validate) → массив {id, score, confidence, ...} по §4.2–§4.3.
// Знаменатель порога покрытия — все критерии драйвера из CRITERIA: отсутствие
// ключа в файле эквивалентно явному null (§4.2, R02.2).
export function buildDrivers(input, params = PARAMS) {
  const p = params || PARAMS;
  const conf = (input && input.driverConfidence) || {};
  const criteriaIn = (input && input.criteria) || {};
  const entriesOf = (driver) =>
    Object.entries(CRITERIA)
      .filter(([, meta]) => meta.driver === driver)
      .map(([id, meta]) => ({ id, meta, entry: criteriaIn[id] || null }));
  const level = (d) => ((conf[d] || {}).level) || 'medium';
  const drivers = [];
  for (let i = 1; i <= 7; i++) {
    const id = `D${i}`;
    const criteria = entriesOf(id).map(({ entry, meta }) => ({
      dir: meta.dir,
      value: entry ? entry.value : 0,
      covered: !!entry && entry.covered === true,
    }));
    drivers.push({
      id,
      score: driverScore(criteria, p.alpha, p.coverageThreshold),
      confidence: level(id),
    });
  }
  const d8Entries = entriesOf('D8');
  drivers.push({
    id: 'D8',
    score: d8Strength(
      d8Entries.map(({ entry }) => ({
        value: entry ? entry.value : 0,
        covered: !!entry && entry.covered === true,
      })),
      p.coverageThreshold,
    ),
    confidence: level('D8'),
    breakValue: d8Entries.find(({ id }) => id === 'D8.2' && criteriaIn['D8.2'] && criteriaIn['D8.2'].covered === true)
      ? criteriaIn['D8.2'].value
      : 0,
  });
  const d9 = aggregateD9(
    entriesOf('D9').map(({ id, entry }) => ({
      id,
      score: entry && entry.covered === true ? entry.value : null,
      acyclic: !!entry && entry.acyclic === true,
      rejected: !!entry && entry.rejected === true,
    })),
    p,
  );
  drivers.push({
    id: 'D9',
    score: d9.score,
    confidence: level('D9'),
    signalingSubgroups: d9.signaling,
  });
  return drivers;
}

// Прогон одного якорного профиля: валидация → драйверы → aggregateDrivers
// без контекста (профиль одиночной недели: инерции и q-сжатия к прошлому нет,
// q сохраняется в результате для справки). Возвращает {errors} при битом входе.
export function runAnchor(input, params = PARAMS) {
  const errors = validate(input);
  if (errors.length > 0) return { errors };
  const drivers = buildDrivers(input, params);
  const result = aggregateDrivers(drivers, params, {});
  return { errors: [], drivers, result };
}

// --- Сетка k: индекс каждого якоря при каждом k ---
// anchors: [{file, meta, input}]; возвращает [{k, anchors: [{id, index, target, role}]}]
export function evaluateGrid(anchors, params = PARAMS, grid = K_GRID) {
  return grid.map((k) => {
    const p = list(params);
    p.k = k;
    return {
      k,
      anchors: anchors.map(({ meta, input }) => {
        const r = runAnchor(input, p);
        return {
          id: meta.id,
          index: r.result.index,
          target: meta.target,
          role: meta.rollingOrigin,
        };
      }),
    };
  });
}

// Запас якоря внутри целевого кластера (пункты индекса): < 0 — промах.
export function marginOf(index, target) {
  return Math.min(index - target[0], target[1] - index);
}

// --- Выбор k (rolling-origin): только role 'select' ---
// Кандидаты — k, где все select-якоря попали; из них — с максимумом
// минимального запаса (максиминная робастность), при равенстве — меньший k.
// Если попаданий нет ни при одном k — берётся максимум минимального запаса
// (ближайший к кластерам); флаг allHit = false.
export function selectK(evaluation) {
  let best = null;
  for (const row of evaluation) {
    const sel = row.anchors.filter((a) => a.role === 'select');
    const minMargin = Math.min(...sel.map((a) => marginOf(a.index, a.target)));
    const allHit = sel.every((a) => marginOf(a.index, a.target) >= 0);
    const cand = { k: row.k, minMargin, allHit };
    if (
      !best ||
      (cand.allHit && !best.allHit) ||
      (cand.allHit === best.allHit &&
        (cand.minMargin > best.minMargin + 1e-9 ||
          (Math.abs(cand.minMargin - best.minMargin) <= 1e-9 && cand.k < best.k)))
    ) {
      best = cand;
    }
  }
  return best;
}

// --- Чувствительность ±20 % ---
// Однофакторные отклонения от выбранного k и экспертных параметров §10.1
// (α, λ, ρ, U_abs и каждый вес по отдельности — равномерное масштабирование
// всех весов нормировкой бесследно сокращается). Возвращает строки:
// {label, minus: {id: index}, plus: {id: index}}.
export function sensitivity(anchors, params, k, factor = 0.2) {
  const cases = [{ label: 'k', apply: (p, f) => { p.k = k * f; } }];
  for (const key of ['alpha', 'lambda', 'rho', 'U_abs']) {
    cases.push({ label: key, apply: (p, f) => { p[key] = p[key] * f; } });
  }
  for (const id of Object.keys(params.weights || {})) {
    cases.push({
      label: `w(${id})`,
      apply: (p, f) => { p.weights[id] = p.weights[id] * f; },
    });
  }
  return cases.map((c) => {
    const run = (f) => {
      const p = list(params);
      p.k = k;
      c.apply(p, f);
      const out = {};
      for (const { meta, input } of anchors) {
        out[meta.id] = runAnchor(input, p).result.index;
      }
      return out;
    };
    return { label: c.label, minus: run(1 - factor), plus: run(1 + factor) };
  });
}

// --- Загрузка профилей из calc/input/anchors/*.json ---
export function loadAnchors(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((file) => {
      const input = JSON.parse(readFileSync(path.join(dir, file), 'utf8'));
      return { file, meta: input.anchor, input };
    });
}

// --- CLI: таблица для журнала калибровки ---
function main() {
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'input', 'anchors');
  const anchors = loadAnchors(dir);

  const lines = [];
  const bad = [];
  for (const a of anchors) {
    const errors = validate(a.input);
    if (errors.length > 0) bad.push({ file: a.file, errors });
  }
  if (bad.length > 0) {
    for (const b of bad) {
      lines.push(`ОШИБКА ВАЛИДАЦИИ ${b.file}:`);
      for (const e of b.errors) lines.push(`  ${e}`);
    }
    process.stdout.write(lines.join('\n') + '\n');
    process.exitCode = 1;
    return;
  }

  const evaluation = evaluateGrid(anchors, PARAMS);
  const chosen = selectK(evaluation);

  lines.push('=== Калибровка k на якорных профилях §9 (протокол §10.1) ===');
  lines.push('');
  lines.push('Якоря (rolling-origin):');
  for (const { meta } of anchors) {
    const role = meta.rollingOrigin === 'select' ? 'выбор k' : 'проверка';
    lines.push(`  ${meta.id} — ${meta.title} [${meta.target[0]}–${meta.target[1]}] (${role})`);
  }
  lines.push(`Сетка k: ${K_GRID[0]}–${K_GRID[K_GRID.length - 1]}, шаг 0.05`);
  lines.push('');
  lines.push('Прогон сетки (индексы; знак ✓ = все select-якоря в кластерах):');
  for (const row of evaluation) {
    const sel = row.anchors.filter((a) => a.role === 'select');
    const minMargin = Math.min(...sel.map((a) => marginOf(a.index, a.target)));
    const allHit = sel.every((a) => marginOf(a.index, a.target) >= 0);
    const parts = row.anchors.map((a) => `${a.id}:${a.index}`).join(' ');
    const mark = allHit ? `✓ min-запас ${minMargin.toFixed(1)}` : `min-запас ${minMargin.toFixed(1)}`;
    const star = Math.abs(row.k - chosen.k) < 1e-9 ? '  <== ВЫБРАНО' : '';
    lines.push(`  k=${row.k.toFixed(2)}  ${parts}  | ${mark}${star}`);
  }
  lines.push('');
  lines.push(`Выбрано k = ${chosen.k} (allHit=${chosen.allHit}, min-запас ${chosen.minMargin.toFixed(1)} п. по ранним якорям)`);
  lines.push('');
  lines.push('Проверка поздних якорей (verify) при выбранном k:');
  const row = evaluation.find((r) => Math.abs(r.k - chosen.k) < 1e-9);
  for (const a of row.anchors.filter((x) => x.role === 'verify')) {
    const m = marginOf(a.index, a.target);
    lines.push(`  ${a.id}: ${a.index} vs [${a.target[0]}–${a.target[1]}] — ${m >= 0 ? 'ПОПАДАНИЕ' : `ПРОМАХ (${m.toFixed(1)})`}`);
  }
  lines.push('');
  lines.push('Чувствительность ±20 % (индексы якорей при выбранном k):');
  const sens = sensitivity(anchors, PARAMS, chosen.k);
  const ids = anchors.map((a) => a.meta.id);
  lines.push('  параметр'.padEnd(14) + ids.map((id) => `${id} (−20%)`.padEnd(16)).join('') + ids.map((id) => `${id} (+20%)`.padEnd(16)).join(''));
  for (const s of sens) {
    lines.push(
      `  ${s.label}`.padEnd(14) +
      ids.map((id) => `${s.minus[id]}`.padEnd(16)).join('') +
      ids.map((id) => `${s.plus[id]}`.padEnd(16)).join(''),
    );
  }
  lines.push('');
  lines.push(`Итог: записать k = ${chosen.k} в calc/params.js и зафиксировать в docs/calibration-journal.md.`);
  process.stdout.write(lines.join('\n') + '\n');
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
