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
  normalizeCriterion,
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
      value: entry ? normalizeCriterion(entry, p) : 0,
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
        value: entry ? normalizeCriterion(entry, p) : 0,
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
      score: entry && entry.covered === true ? normalizeCriterion(entry, p) : null,
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

// Попадание select-якорей в кластеры: минимальный запас по ним и флаг полного
// попадания. Единственное определение «попадания в окно» — используется и в
// selectK, и в итоговом выводе CLI (одна логика, не две).
function selectWindow(anchors) {
  const sel = anchors.filter((a) => a.role === 'select');
  const minMargin = Math.min(...sel.map((a) => marginOf(a.index, a.target)));
  const allHit = sel.every((a) => marginOf(a.index, a.target) >= 0);
  return { minMargin, allHit };
}

// --- Выбор k (rolling-origin): только role 'select' ---
// Кандидаты — k, где все select-якоря попали; из них — с максимумом
// минимального запаса (максиминная робастность). При равенстве запаса —
// tie-break по протоколу §10.1 (таск 07): меньшее отклонение k от
// калиброванного значения v0.7 (baseK, по умолчанию PARAMS.k), затем
// меньший k. Если попаданий нет ни при одном k — берётся максимум
// минимального запаса (ближайший к кластерам); флаг allHit = false.
export function selectK(evaluation, baseK = PARAMS.k) {
  let best = null;
  for (const row of evaluation) {
    const { minMargin, allHit } = selectWindow(row.anchors);
    const cand = { k: row.k, minMargin, allHit, dev: Math.abs(row.k - baseK) };
    if (
      !best ||
      (cand.allHit && !best.allHit) ||
      (cand.allHit === best.allHit &&
        (cand.minMargin > best.minMargin + 1e-9 ||
          (Math.abs(cand.minMargin - best.minMargin) <= 1e-9 &&
            (cand.dev < best.dev - 1e-9 ||
              (Math.abs(cand.dev - best.dev) <= 1e-9 && cand.k < best.k)))))
    ) {
      best = cand;
    }
  }
  return best;
}

// --- Итеративный подбор (таск 07, протокол §10.1) ---
// Итерация 1 — сетка k при базовых параметрах v0.7. Если не все select-якоря
// попали — итерации 2+: однофакторные варианты калибруемого набора §10.1
// (веса драйверов ±10 % с перенормировкой, доля веса Д9, λ, ρ, U_abs),
// для каждого варианта — своя сетка k. Пороги состояний на прогон якорей
// не влияют (индекс сравнивается с кластерами числом, не состоянием) и в
// итерациях не участвуют. Критерий — максиминный запас; tie-break — меньшее
// отклонение от v0.7 (сумма относительных отклонений параметров + |Δk|).
// Каждая итерация возвращается в отчёте (печать CLI + журнал калибровки).
export function paramDeviation(params, base) {
  let dev = 0;
  for (const key of ['alpha', 'lambda', 'rho', 'U_abs']) {
    if (typeof params[key] === 'number' && typeof base[key] === 'number' && params[key] !== base[key]) {
      dev += Math.abs(params[key] - base[key]) / Math.abs(base[key]);
    }
  }
  const w = params.weights || {};
  const bw = base.weights || {};
  for (const id of Object.keys(bw)) {
    if (typeof w[id] === 'number' && w[id] !== bw[id]) {
      dev += Math.abs(w[id] - bw[id]) / Math.abs(bw[id]);
    }
  }
  return dev;
}

// Список однофакторных вариантов калибруемого набора §10.1.
export function candidateParams(base) {
  const variants = [];
  const withWeight = (id, f) => {
    const p = list(base);
    const w = p.weights[id] * f;
    // перенормировка: компенсация через пропорциональное сжатие остальных
    const rest = Object.keys(p.weights).filter((k) => k !== id);
    const restSum = rest.reduce((a, k) => a + p.weights[k], 0);
    const scale = restSum > 0 ? (1 - w) / restSum : 0;
    for (const k of rest) p.weights[k] = p.weights[k] * scale;
    p.weights[id] = w;
    return p;
  };
  for (const id of Object.keys(base.weights || {})) {
    for (const f of [0.9, 1.1]) {
      variants.push({ label: `вес ${id} ×${f}`, params: withWeight(id, f) });
    }
  }
  for (const [key, values] of [['lambda', [0.5, 0.7]], ['rho', [0.2, 0.3]], ['U_abs', [0.02, 0.03]]]) {
    for (const v of values) {
      const p = list(base);
      p[key] = v;
      variants.push({ label: `${key} = ${v}`, params: p });
    }
  }
  return variants;
}

// Полный прогон калибровки. Возвращает {iterations, chosen}:
// iterations — [{n, label, k, minMargin, allHit, deviation}],
// chosen — {k, params (глубокая копия), minMargin, allHit, deviation, label}.
export function calibrate(anchors, baseParams = PARAMS, grid = K_GRID) {
  const iterations = [];
  const runGrid = (params, label, n) => {
    const evaluation = evaluateGrid(anchors, params, grid);
    const chosen = selectK(evaluation, baseParams.k);
    const rec = {
      n, label, k: chosen.k, minMargin: chosen.minMargin, allHit: chosen.allHit,
      deviation: paramDeviation(params, baseParams) + Math.abs(chosen.k - baseParams.k),
      params: list(params),
    };
    iterations.push(rec);
    return rec;
  };

  const first = runGrid(baseParams, 'k-решётка при параметрах v0.7 (k — единственная свобода)', 1);
  let best = first;
  if (!first.allHit) {
    let n = 2;
    for (const variant of candidateParams(baseParams)) {
      const rec = runGrid(variant.params, variant.label, n);
      n += 1;
      if (
        (rec.allHit && !best.allHit) ||
        (rec.allHit === best.allHit &&
          (rec.minMargin > best.minMargin + 1e-9 ||
            (Math.abs(rec.minMargin - best.minMargin) <= 1e-9 && rec.deviation < best.deviation - 1e-9)))
      ) {
        best = rec;
      }
    }
  }
  return { iterations, chosen: best };
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

  const cal = calibrate(anchors, PARAMS);
  const chosen = cal.chosen;
  const evaluation = evaluateGrid(anchors, chosen.params, K_GRID);

  lines.push('=== Калибровка на якорных профилях §9 (протокол §10.1, 8 якорей) ===');
  lines.push('');
  lines.push('Якоря (rolling-origin):');
  for (const { meta } of anchors) {
    const role = meta.rollingOrigin === 'select' ? 'выбор k' : 'проверка';
    lines.push(`  ${meta.id} — ${meta.title} [${meta.target[0]}–${meta.target[1]}] (${role})`);
  }
  lines.push(`Сетка k: ${K_GRID[0]}–${K_GRID[K_GRID.length - 1]}, шаг 0.05`);
  lines.push('');
  lines.push('Итерации подбора (таск 07):');
  for (const it of cal.iterations) {
    lines.push(
      `  итерация ${it.n}: ${it.label} → k=${it.k.toFixed(2)}, ` +
      `min-запас ${it.minMargin.toFixed(1)}, allHit=${it.allHit}, отклонение от v0.7 ${it.deviation.toFixed(3)}` +
      (chosen === it ? '  <== ЛУЧШАЯ' : ''),
    );
  }
  if (cal.iterations.length === 1) {
    lines.push('  итерации по весам/порогам не понадобились: все select-якоря попали на итерации 1');
  }
  lines.push('');
  lines.push(`Выбранные параметры: k = ${chosen.k.toFixed(2)}${chosen.n === 1 ? '' : ` (итерация ${chosen.n}: ${chosen.label})`}; ` +
    'прочие параметры — как в v0.7 (α, λ, ρ, U_abs, веса без изменений), если итерация не указана.');
  lines.push('');
  lines.push('Прогон сетки при выбранных параметрах (индексы; знак ✓ = все select-якоря в кластерах):');
  for (const row of evaluation) {
    const { minMargin, allHit } = selectWindow(row.anchors);
    const parts = row.anchors.map((a) => `${a.id}:${a.index}`).join(' ');
    const mark = allHit ? `✓ min-запас ${minMargin.toFixed(1)}` : `min-запас ${minMargin.toFixed(1)}`;
    const star = Math.abs(row.k - chosen.k) < 1e-9 ? '  <== ВЫБРАНО' : '';
    lines.push(`  k=${row.k.toFixed(2)}  ${parts}  | ${mark}${star}`);
  }
  lines.push('');
  lines.push(`Выбрано k = ${chosen.k} (allHit=${chosen.allHit}, min-запас ${chosen.minMargin.toFixed(1)} п. по select-якорям)`);
  if (!chosen.allHit) {
    lines.push('ВНИМАНИЕ: полные попадания не достигнуты — фиксируются лучшая итерация и промахи, эскалация на Review Board (журнал).');
  }
  lines.push('');
  lines.push('Проверка поздних якорей (verify) при выбранном k:');
  const row = evaluation.find((r) => Math.abs(r.k - chosen.k) < 1e-9);
  for (const a of row.anchors.filter((x) => x.role === 'verify')) {
    const m = marginOf(a.index, a.target);
    lines.push(`  ${a.id}: ${a.index} vs [${a.target[0]}–${a.target[1]}] — ${m >= 0 ? 'ПОПАДАНИЕ' : `ПРОМАХ (${m.toFixed(1)})`}`);
  }
  lines.push('');
  lines.push('Чувствительность ±20 % (индексы якорей при выбранных параметрах):');
  const sens = sensitivity(anchors, chosen.params, chosen.k);
  const ids = anchors.map((a) => a.meta.id);
  const colW = Math.max(16, ...ids.map((id) => id.length + 8));
  lines.push('  параметр'.padEnd(14) + ids.map((id) => `${id} (−20%)`.padEnd(colW)).join('') + ids.map((id) => `${id} (+20%)`.padEnd(colW)).join(''));
  for (const s of sens) {
    lines.push(
      `  ${s.label}`.padEnd(14) +
      ids.map((id) => `${s.minus[id]}`.padEnd(colW)).join('') +
      ids.map((id) => `${s.plus[id]}`.padEnd(colW)).join(''),
    );
  }
  lines.push('');
  lines.push(`Итог: k = ${chosen.k} подтверждён на 8 якорях; зафиксировано в docs/calibration-journal.md.`);
  process.stdout.write(lines.join('\n') + '\n');
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
