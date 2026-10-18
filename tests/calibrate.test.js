// calibrate.test.js — чистая логика calc/calibrate.js (контракт таска 03):
// выбор k из прогона сетки (rolling-origin: ранние якоря выбирают k,
// поздние — только проверка) и маппинг criteria → drivers.
// CLI-обвязка не тестируется.

import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  selectK, buildDrivers, loadAnchors, calibrate, runAnchor,
  severityCandidates, remapSeverity, remapCriteria, evaluateSeverityChain,
  calibrateSeverity, selectSeverity, SEVERITY_CTX0_DEFAULT,
} from '../calc/calibrate.js';
import { validate, CRITERIA } from '../calc/engine.js';
import { PARAMS } from '../calc/params.js';

const ANCHORS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'calc', 'input', 'anchors');

test('selectK: max минимального запаса среди k с полным попаданием ранних якорей; verify игнорируется', () => {
  // Запас (margin) якоря = min(index − lo, hi − index); промах → k не кандидат.
  // verify-якорь (индекс 98 вне [81,96] при k=2.6) на выбор k влиять не должен.
  const mk = (k, routine, crimea) => ({
    k,
    anchors: [
      { id: 'routine', index: routine, target: [0, 20], role: 'select' },
      { id: 'crimea', index: crimea, target: [41, 60], role: 'select' },
      { id: 'feb2022', index: 98, target: [81, 96], role: 'verify' },
    ],
  });
  const evaluation = [
    mk(2.0, 30, 50), // routine промах (30 > 20) → не кандидат
    mk(2.6, 12, 50), // margins: min(12, 8) = 8 и min(9, 10) = 9 → min 8
    mk(3.0, 15, 55), // margins: min(15, 5) = 5 и min(14, 5) = 5 → min 5
  ];
  const r = selectK(evaluation);
  assert.equal(r.k, 2.6);
  assert.equal(r.minMargin, 8);
  assert.equal(r.allHit, true);
});

test('selectK: ни одно k без промахов → ближайшее к полному попаданию (minMargin < 0)', () => {
  const evaluation = [
    { k: 1.0, anchors: [{ id: 'a', index: 25, target: [0, 20], role: 'select' }] },
    { k: 2.0, anchors: [{ id: 'a', index: 22, target: [0, 20], role: 'select' }] },
  ];
  const r = selectK(evaluation);
  assert.equal(r.k, 2.0); // −2 ближе к диапазону, чем −5
  assert.equal(r.minMargin, -2);
  assert.equal(r.allHit, false);
});

test('selectK: равный minMargin у разных k → выбирается меньший k', () => {
  // Оба k дают одинаковый минимальный запас по select-якорям: tie-break
  // обязан уходить к меньшему k (максиминная робастность при равенстве).
  const mk = (k) => ({
    k,
    anchors: [
      { id: 'routine', index: 10, target: [0, 20], role: 'select' }, // min(10, 10) = 10
      { id: 'crimea', index: 50, target: [41, 60], role: 'select' }, // min(9, 10) = 9
    ],
  });
  const evaluation = [mk(2.5), mk(2.0)];
  const r = selectK(evaluation);
  assert.equal(r.k, 2.0);
  assert.equal(r.minMargin, 9);
  assert.equal(r.allHit, true);
});

test('buildDrivers: маппинг criteria → drivers по §4.2 (знаменатель — все критерии драйвера)', () => {
  const input = {
    week: '2026-09-13',
    criteria: {
      'D1.1': { value: 1, covered: true, sources: [{ url: 'https://a.org', date: '2026-09-10', cluster: 'x' }] },
      'D1.2': { value: 0, covered: true, sources: [{ url: 'https://a.org', date: '2026-09-10', cluster: 'x' }] },
      'D1.6': { value: 0.5, covered: true, sources: [{ url: 'https://a.org', date: '2026-09-10', cluster: 'x' }] },
      'D8.1': { value: 1, covered: true, sources: [{ url: 'https://a.org', date: '2026-09-10', cluster: 'x' }] },
      'D8.2': { value: 0.67, covered: true, sources: [{ url: 'https://a.org', date: '2026-09-10', cluster: 'x' }] },
      // D9.4 — единственная изолированная циклическая → corr 0.5 (v0.7)
      'D9.4': { value: 0.33, covered: true, sources: [{ url: 'https://a.org', date: '2026-09-10', cluster: 'x' }] },
    },
    driverConfidence: { D1: { level: 'high' } },
  };
  const drivers = buildDrivers(input);
  const byId = Object.fromEntries(drivers.map((d) => [d.id, d]));
  // D1: покрыто 3 из 6 (ровно порог 0.5): mean(esc 1, 0) − 0.5·0.5 = 0.25
  assert.equal(byId.D1.score, 0.25);
  assert.equal(byId.D1.confidence, 'high');
  // D2..D7: ни одного покрытого критерия → null, уверенность по умолчанию medium
  for (let i = 2; i <= 7; i++) {
    assert.equal(byId[`D${i}`].score, null);
    assert.equal(byId[`D${i}`].confidence, 'medium');
  }
  // D8: покрыто 2 из 4: d8 = (1 + 0.67)/2 = 0.835; breakValue = Д8.2
  assert.ok(Math.abs(byId.D8.score - 0.835) < 1e-12);
  assert.equal(byId.D8.breakValue, 0.67);
  // D9: одна изолированная циклическая подгруппа 0.33 → s9 = 0.33·0.5
  // (нормировка aggregateD9 — по покрытым подгруппам, здесь одна)
  assert.ok(Math.abs(byId.D9.score - 0.33 * 0.5) < 1e-12);
  assert.equal(byId.D9.signalingSubgroups, 1);
  assert.equal(byId.D9.confidence, 'medium'); // D9 high запрещён (§4.3.1)
});

test('buildDrivers: счётный критерий со events нормируется Σsev/CAP (§7.3)', () => {
  // D1.1: events [0.5, 2.0] → 0.5 — тот же скор, что у value 0.5. Покрыто 3 из 6:
  // mean(esc) = (0.5 + 1 + 1)/3 = 5/6.
  const mk = (d11) => ({
    week: '2026-09-13',
    criteria: {
      'D1.1': d11,
      'D1.2': { value: 1, covered: true, sources: [{ url: 'https://a.org', date: '2026-09-10', cluster: 'A-mainstream' }] },
      'D1.3': { value: 1, covered: true, sources: [{ url: 'https://a.org', date: '2026-09-10', cluster: 'A-mainstream' }] },
    },
  });
  const src = [{ url: 'https://a.org', date: '2026-09-10', cluster: 'A-mainstream' }];
  const withEvents = buildDrivers(mk({ covered: true, events: [0.5, 2.0], sources: src }));
  const withValue = buildDrivers(mk({ covered: true, value: 0.5, sources: src }));
  const e1 = withEvents.find((d) => d.id === 'D1');
  const v1 = withValue.find((d) => d.id === 'D1');
  assert.equal(e1.score, 5 / 6);
  assert.equal(e1.score, v1.score);
  // events [2,2,2] → min(1, 6/5) = 1: скор равен прогону с value 1
  const capped = buildDrivers(mk({ covered: true, events: [2, 2, 2], sources: src }));
  const plain = buildDrivers(mk({ covered: true, value: 1, sources: src }));
  assert.equal(capped.find((d) => d.id === 'D1').score, plain.find((d) => d.id === 'D1').score);
  assert.equal(PARAMS.capCount, 5);
});

test('selectK: равный minMargin → tie-break к k v0.7 (меньшее отклонение от baseK), не к меньшему k', () => {
  // Протокол §10.1 (таск 07): при равном запасе предпочтение — параметрам,
  // ближайшим к v0.7. baseK = 2.0: k=2.0 отклоняется на 0, k=1.7 на 0.3.
  const mk = (k) => ({
    k,
    anchors: [{ id: 'a', index: 10, target: [0, 20], role: 'select' }],
  });
  const r = selectK([mk(1.7), mk(2.0)], 2.0);
  assert.equal(r.k, 2.0);
});

test('anchors: 10 профилей (6 старых + 4 новых), все валидны через validate', () => {
  const anchors = loadAnchors(ANCHORS_DIR);
  assert.equal(anchors.length, 10);
  const ids = anchors.map((a) => a.meta.id).sort();
  for (const id of [
    'able-archer-1983', 'crimea-2014', 'cuban-1962', 'feb2022', 'georgia-2008',
    'iraq-2003', 'kargil-1999', 'proxy-sanctions-2018', 'routine-2010s', 'yom-kippur-1973',
  ]) {
    assert.ok(ids.includes(id), `профиль ${id} присутствует`);
  }
  for (const a of anchors) {
    assert.deepEqual(validate(a.input), [], `профиль ${a.file} проходит validate`);
  }
  const byId = Object.fromEntries(anchors.map((a) => [a.meta.id, a.meta]));
  // Роли и целевые диапазоны новых якорей — по §9 v0.7 и тикету 07
  assert.deepEqual(byId['able-archer-1983'].target, [81, 96]);
  assert.equal(byId['able-archer-1983'].rollingOrigin, 'verify');
  assert.deepEqual(byId['kargil-1999'].target, [41, 60]);
  assert.equal(byId['kargil-1999'].rollingOrigin, 'select');
  assert.deepEqual(byId['yom-kippur-1973'].target, [61, 80]);
  assert.equal(byId['yom-kippur-1973'].rollingOrigin, 'select');
  assert.deepEqual(byId['iraq-2003'].target, [61, 80]);
  assert.equal(byId['iraq-2003'].rollingOrigin, 'select');
});

test('calibrate: 8 якорей — k=1.95 (параметры v0.7), все select попадают, verify в диапазонах', () => {
  const anchors = loadAnchors(ANCHORS_DIR);
  const { chosen, iterations } = calibrate(anchors, PARAMS);
  // k=1.95 — калиброванное значение v0.7; на 8 якорях подтверждено без
  // итераций по весам/порогам (значение из журнала калибровки, не из кода).
  assert.equal(chosen.k, 1.95);
  assert.equal(chosen.allHit, true);
  assert.ok(chosen.minMargin >= 6, `min-запас ${chosen.minMargin} ≥ 6`);
  assert.equal(iterations.length, 1, 'достаточно итерации 1 (k-решётка)');
  assert.equal(PARAMS.k, 1.95);
  for (const { meta, input } of anchors) {
    const idx = runAnchor(input, chosen.params).result.index;
    const m = Math.min(idx - meta.target[0], meta.target[1] - idx);
    assert.ok(m >= 0, `${meta.id}: ${idx} в [${meta.target[0]}–${meta.target[1]}]`);
  }
});

// ---------------- Калибровка severity-весов (§7.3) ----------------

const BASE_SEV = [0.2, 0.5, 1.0, 2.0];

// Мини-движок цепочки: все 46 критериев присутствуют (D1.1 — для аттестации
// покрытия), у каждого драйвера покрытие > половины критериев value 0.4,
// event-веса несёт count-критерий драйвера. Источник один, R55-схема.
const DRIVERS = [...new Set(Object.keys(CRITERIA).map((k) => CRITERIA[k].driver))];
const IDS_BY_DRIVER = {};
for (const d of DRIVERS) IDS_BY_DRIVER[d] = Object.keys(CRITERIA).filter((k) => CRITERIA[k].driver === d);

function mkWeek(week, perDriver) {
  const src = [{ url: `https://a.test/${week}`, date: week, cluster: 'A-mainstream' }];
  const criteria = {};
  for (const id of Object.keys(CRITERIA)) criteria[id] = null;
  for (const d of DRIVERS) {
    const ids = IDS_BY_DRIVER[d];
    const extra = Math.max(1, Math.ceil(ids.length / 2));
    ids.forEach((id, i) => { if (i < extra) criteria[id] = { value: 0.4, covered: true, sources: src }; });
    const cfg = perDriver[d];
    if (cfg?.events) {
      const cnt = ids.find((id) => CRITERIA[id].scale === 'count');
      if (cnt) criteria[cnt] = { covered: true, events: cfg.events, sources: src };
    }
  }
  return { week, criteria };
}

const CTX0 = { prevInternal: 24, prevPublished: 24, sbLeft: 0, sbReason: null };

test('severityCandidates: пара, ломающая строгую монотонность, отбракована с пометкой', () => {
  // База [0.4, 0.5, 0.6, 2]: сдвиг пары (0.4, 0.5) ×1.2 даёт 0.48 и 0.60 —
  // 0.60 перестаёт быть строго меньше следующего уровня 0.6. Такой кандидат
  // отбраковывается на генерации, а не проходит в прогон с равными уровнями.
  const cands = severityCandidates([0.4, 0.5, 0.6, 2.0]);
  const bad = cands.find((c) => c.label === 'сдвиг пары (0.4, 0.5) ×1.2');
  assert.ok(bad, 'кандидат присутствует в отчёте');
  assert.equal(bad.rejected, true);
  assert.equal(bad.values, null);
  assert.ok(/монотонность/.test(bad.note), bad.note);
  // Сдвиг соседней пары ×1.2 без нарушения порядка остаётся живым.
  const ok = cands.find((c) => c.label === 'сдвиг пары (0.5, 0.6) ×1.2');
  assert.equal(ok.rejected, false);
  assert.deepEqual(ok.values, [0.4, 0.6, 0.72, 2.0]);
});

test('severityCandidates: базовый + сдвиги соседних пар ×0.8/×1.2; верхний уровень вне 2.0 — отбракован', () => {
  const cands = severityCandidates(BASE_SEV);
  const byLabel = (label) => cands.find((c) => c.label === label);
  // Базовый — первая строка грида, ровно канон §7.3 (без сдвигов).
  assert.equal(cands[0].rejected, false);
  assert.deepEqual(cands[0].values, [0.2, 0.5, 1.0, 2.0]);
  // Сдвиг пары масштабирует оба её члена: 0.2·0.8 = 0.16, 0.5·0.8 = 0.4.
  const pair1Down = byLabel('сдвиг пары (0.2, 0.5) ×0.8');
  assert.equal(pair1Down.rejected, false);
  assert.deepEqual(pair1Down.values, [0.16, 0.4, 1.0, 2.0]);
  // 0.5·1.2 = 0.6, 1.0·1.2 = 1.2 — соседняя пара не затронута.
  const pair2Up = byLabel('сдвиг пары (0.5, 1) ×1.2');
  assert.equal(pair2Up.rejected, false);
  assert.deepEqual(pair2Up.values, [0.2, 0.6, 1.2, 2.0]);
  // Пара (1, 2) двигает верхний уровень: ×0.8 → 1.6, ×1.2 → 2.4. Ровно 2.0
  // (значение flash-триггеров D1.4/D2.4) в наборе отсутствует → отбраковка.
  const topDown = byLabel('сдвиг пары (1, 2) ×0.8');
  const topUp = byLabel('сдвиг пары (1, 2) ×1.2');
  for (const rej of [topDown, topUp]) {
    assert.equal(rej.rejected, true);
    assert.equal(rej.values, null, 'отбракованный кандидат в прогон не идёт');
    assert.ok(/2\.0/.test(rej.note), `note объясняет отсутствие 2.0: ${rej.note}`);
  }
  // Контракт живого кандидата: строго возрастающие уровни и сохранённые 2.0.
  const live = cands.filter((c) => c.rejected === false);
  assert.ok(live.length > 0);
  for (const c of live) {
    assert.equal(c.values.length, BASE_SEV.length);
    for (let i = 1; i < c.values.length; i++) {
      assert.ok(c.values[i] > c.values[i - 1], `${c.label}: строгая монотонность (${c.values.join(' ≤ ')})`);
    }
    assert.equal(c.values[c.values.length - 1], 2.0, `${c.label}: 2.0 сохранён`);
  }
});

test('remapSeverity: порядковый ремап; вес вне from → null; не-массив → пусто', () => {
  assert.deepEqual(remapSeverity([0.2, 1.0], BASE_SEV, [0.24, 0.6, 1.2, 2.0]), [0.24, 1.2]);
  assert.deepEqual(remapSeverity([2.0, 0.5, 0.2], BASE_SEV, [0.16, 0.4, 1.0, 2.0]), [2.0, 0.4, 0.16]);
  assert.deepEqual(remapSeverity([3.0], BASE_SEV, [0.24, 0.6, 1.2, 2.0]), [null], 'вес вне набора → null (явно наверху)');
  assert.deepEqual(remapSeverity(undefined, BASE_SEV, BASE_SEV), []);
});

test('remapCriteria: события ремапятся, слепые критерии проходят насквозь, чужие веса → ok:false + missing', () => {
  const week = mkWeek('2026-08-30', { D1: { events: [0.5, 1.0] } });
  const r = remapCriteria(week.criteria, BASE_SEV, [0.16, 0.4, 1.0, 2.0]);
  assert.equal(r.ok, true);
  let seen = 0;
  for (const [id, entry] of Object.entries(r.criteria)) {
    if (Array.isArray(entry?.events)) {
      seen++;
      assert.deepEqual(entry.events, [0.4, 1.0], `D1-критерий ${id} ремапнут по порядковой позиции`);
    }
  }
  assert.ok(seen >= 1, 'ремапнут хотя бы один D1-count критерий');
  const bad = { 'D1.2': { covered: true, events: [3.0], sources: [] } };
  const rb = remapCriteria(bad, BASE_SEV, [0.16, 0.4, 1.0, 2.0]);
  assert.equal(rb.ok, false);
  assert.deepEqual(rb.missing, ['D1.2: 3']);
});

test('selectSeverity: margin ≥ порога применяет не-базовый; ничья и near-miss оставляют базовый', () => {
  // maxDrift — информационная колонка (D01): chosen несёт значение победителя,
  // но выбора не определяет.
  const base = { label: '0.2/0.5/1/2', values: [0.2, 0.5, 1.0, 2.0], sens: 8, maxDrift: 0 };
  // отрыв 6 ≥ 5 → применение
  const better = { label: 'кандидат', values: [0.16, 0.4, 0.8, 2.0], sens: 2, maxDrift: 2.3 };
  const r = selectSeverity([base, better], BASE_SEV, 5);
  assert.equal(r.applied, true, 'margin 6 ≥ порога 5');
  assert.deepEqual(r.values, [0.16, 0.4, 0.8, 2.0]);
  assert.equal(r.label, 'кандидат');
  assert.equal(r.margin, 6);
  assert.equal(r.maxDrift, 2.3, 'maxDrift победителя перенесён в chosen (D01)');
  // ничья → базовый
  const tie = { label: 'кандидат', values: [0.16, 0.4, 0.8, 2.0], sens: 8, maxDrift: 2.3 };
  const rt = selectSeverity([base, tie], BASE_SEV, 5);
  assert.equal(rt.applied, false);
  assert.deepEqual(rt.values, [...BASE_SEV]);
  assert.equal(rt.winnerLabel, '0.2/0.5/1/2', 'победитель по δI — ничья с базой, label базы');
  assert.equal(rt.maxDrift, 0, 'ничья оставила базовый — его maxDrift');
  assert.ok(rt.reasons.some((s) => s.includes('подтверждён')));
  // близкий промах: отрыв 3 < 5 → базовый остаётся
  const near = { label: 'кандидат', values: [0.16, 0.4, 0.8, 2.0], sens: 5, maxDrift: 2.3 };
  const rn = selectSeverity([base, near], BASE_SEV, 5);
  assert.equal(rn.applied, false);
  assert.deepEqual(rn.values, [...BASE_SEV]);
  assert.equal(rn.maxDrift, 0, 'выбран базовый — след выбранного набора 0, а не победителя');
  assert.equal(rn.winnerMaxDrift, 2.3, 'след победителя по δI — отдельной колонкой отчёта');
  assert.equal(rn.winnerLabel, 'кандидат', 'победитель по δI фиксируется, не применяется');
  assert.ok(rn.reasons.some((s) => s.includes('ниже порога')));
  // точно на пороге 5 → применяется
  const exact = { label: 'кандидат', values: [0.16, 0.4, 0.8, 2.0], sens: 3, maxDrift: 2.3 };
  const rr = selectSeverity([base, exact], BASE_SEV, 5);
  assert.equal(rr.applied, true);
  assert.equal(rr.maxDrift, 2.3);
});

test('evaluateSeverityChain: идентичный набор → maxDrift 0; кандидат → известный дрейф по внутреннему индексу', () => {
  const weeks = [
    mkWeek('2026-08-30', { D1: { events: [1.0, 1.0, 0.5, 0.5] }, D3: { events: [2.0, 1.0, 0.5] } }),
    mkWeek('2026-09-06', { D1: { events: [0.5, 0.5, 1.0] }, D3: { events: [0.5, 0.2] } }),
  ];
  const ref = evaluateSeverityChain(weeks, BASE_SEV, BASE_SEV, CTX0);
  assert.equal(ref.error, undefined);
  assert.equal(ref.maxDrift, 0);
  assert.equal(ref.deltaDrift, 0, 'тождественный прогон — нулевой дрейф дельт');
  assert.equal(ref.weeks.length, 2);
  assert.equal(ref.weeks[0].published, true, 'покрытие достаточное → обе в published');
  // Независимые ожидания: те же две недели, посчитанные напрямую движком
  // (buildDrivers + aggregateDrivers, ctx prevInternal = prevPublished = 24),
  // без участия evaluateSeverityChain. Числа — результат прямого прогона.
  assert.ok(Math.abs(ref.weeks[0].internal - 58.661758854172035) < 1e-12);
  assert.ok(Math.abs(ref.weeks[1].internal - 58.819334886954586) < 1e-12);

  const cand = evaluateSeverityChain(weeks, BASE_SEV, [0.2, 0.4, 0.8, 2.0], CTX0);
  assert.equal(cand.error, undefined);
  // Сдвиг пары (0.5, 1) ×0.8: прямой прогон кандидата даёт внутренние
  // 57.89769533986321 / 58.291160487988776, значит max|Δ| = 0.7640635143088232.
  assert.ok(Math.abs(cand.weeks[0].internal - 57.89769533986321) < 1e-12);
  assert.ok(Math.abs(cand.weeks[1].internal - 58.291160487988776) < 1e-12);
  assert.ok(Math.abs(cand.maxDrift - 0.7640635143088232) < 1e-12, `maxDrift ${cand.maxDrift}`);
  // Публикационная дельта квантуется в целый пункт: 34 против 35 → Δdrift 1.
  assert.equal(cand.deltaDrift, 1);
  // Все веса внутри §7.3-канона? Проверка стоп-листа: не-канонический вес → error
  const bad = weeks.map((w) => ({
    ...w,
    criteria: { ...w.criteria, 'D1.2': { covered: true, events: [3], sources: w.criteria['D1.2'].sources } },
  }));
  const err = evaluateSeverityChain(bad, BASE_SEV, [0.24, 0.6, 1.2, 2.0], CTX0);
  assert.ok(err.error.includes('вне набора') || err.error.includes('невалиден'), err.error);
  assert.equal(err.maxDrift, null);
  assert.deepEqual(err.weeks, []);
});

test('calibrateSeverity: база берётся из переданного baseParams, а не из PARAMS', () => {
  // Не-PARAMS канон событий [0.3, 0.6, 1.2, 2.4]: ремап строится от него,
  // поэтому все кандидаты живые, базовый прогон тождественен, а не падает
  // на «весах вне набора».
  const custom = [0.3, 0.6, 1.2, 2.4];
  const weeks = [
    mkWeek('2026-08-30', { D1: { events: [1.2, 0.6, 0.3] }, D3: { events: [2.4, 1.2] } }),
    mkWeek('2026-09-06', { D1: { events: [0.6, 0.6, 1.2] } }),
  ];
  const res = calibrateSeverity(weeks, { ...PARAMS, severityValues: custom }, CTX0);
  assert.equal(res.candidates[0].label, custom.join('/'));
  assert.deepEqual(res.candidates[0].values, custom);
  assert.deepEqual(res.chosen.values, custom);
  assert.equal(res.chosen.applied, false);
  assert.equal(res.maxDriftBase, 0);
  for (const c of res.candidates.filter((x) => !x.rejected)) {
    assert.equal(typeof c.maxDrift, 'number', `кандидат ${c.label} посчитан, а не отбракован ремапом`);
    assert.ok(!/вне набора/.test(c.note || ''), c.note);
  }
});

test('calibrateSeverity: при отрыве ≥ порога не-базовый кандидат применяется', () => {
  // Та же синтетическая цепочка, что ниже: лучший кандидат устойчивее базы на
  // 0.3 п.п. При штатном пороге 5 он не применяется; порог — параметр шва,
  // поэтому на крафте 0.1 отрыв достаточен и выбор обязан сдвинуться.
  const weeks = [
    mkWeek('2026-08-30', { D1: { events: [1.0, 1.0, 1.0, 0.5, 0.5] }, D3: { events: [2.0, 1.0, 0.5] } }),
    mkWeek('2026-09-06', { D1: { events: [0.5, 0.5, 1.0] }, D3: { events: [0.5, 0.2] } }),
    mkWeek('2026-09-13', { D1: { events: [1.0, 0.5, 0.5, 1.0] }, D3: { events: [1.0, 1.0, 0.2, 0.2] } }),
  ];
  const res = calibrateSeverity(weeks, PARAMS, CTX0, 0.1);
  assert.equal(res.chosen.applied, true);
  assert.ok(res.chosen.margin >= 0.1, `margin ${res.chosen.margin} ≥ 0.1`);
  assert.notDeepEqual(res.chosen.values, [...BASE_SEV]);
  assert.equal(res.chosen.label, res.chosen.winnerLabel);
});

test('calibrateSeverity: синтетическая цепочка — базовый подтверждён (applied=false)', () => {
  const weeks = [
    mkWeek('2026-08-30', { D1: { events: [1.0, 1.0, 1.0, 0.5, 0.5] }, D3: { events: [2.0, 1.0, 0.5] } }),
    mkWeek('2026-09-06', { D1: { events: [0.5, 0.5, 1.0] }, D3: { events: [0.5, 0.2] } }),
    mkWeek('2026-09-13', { D1: { events: [1.0, 0.5, 0.5, 1.0] }, D3: { events: [1.0, 1.0, 0.2, 0.2] } }),
  ];
  const res = calibrateSeverity(weeks, undefined, CTX0);
  const baseCand = res.candidates.find((c) => JSON.stringify(c.values) === JSON.stringify(BASE_SEV));
  assert.ok(baseCand, 'базовый набор присутствует среди кандидатов');
  assert.equal(res.chosen.applied, false, 'δI отрыв крошечный — не на пороге 5 п.п.');
  assert.deepEqual(res.chosen.values, [...BASE_SEV]);
  assert.equal(typeof baseCand.sens, 'number', 'базовый δI посчитан');
  assert.equal(res.chosen.baseSens, baseCand.sens, 'базовый δI дублируется в chosen (шов журнала)');
  assert.equal(res.maxDriftBase, 0, 'базовый прогон — тождествен самому себе');
  assert.equal(res.baseRowsPublished, res.baseRows.length, 'все три недели published');
  // Пустой ctx0 (дефолт: нет инерции) — тоже валиден и подтверждает базовый
  const res0 = calibrateSeverity(weeks);
  assert.equal(res0.chosen.applied, false);
  assert.equal(SEVERITY_CTX0_DEFAULT.prevRegions && typeof SEVERITY_CTX0_DEFAULT.prevRegions, 'object');
  assert.deepEqual(SEVERITY_CTX0_DEFAULT, { prevInternal: null, prevPublished: null, prevRegions: {} });
});

// ---------------- events[] в якорях (ADR 0039) ----------------

// Значения, точно представимые как min(1, Σsev / capCount) при весах §7.3
// (0.2/0.5/1/2): Σsev = value·5 ∈ {1, 2, 3, 4, 5}. Значения 0.33/0.67 суммой
// весов не представляются, 0 — пустым списком не считается.
const REPRESENTABLE = new Set([0.2, 0.4, 0.6, 0.8, 1]);

// Ожидание снято с якорей ДО правки (HEAD 1193088): профиль → критерий →
// прежнее `value`. Событийные критерии обязаны воспроизводить эти значения
// в точности (сравнение по каждому критерию, не на глаз).
const ANCHOR_EVENT_VALUES = Object.freeze({
  'able-archer-1983': Object.freeze({
    'D1.1': 0.8, 'D1.4': 0.6, 'D2.3': 1, 'D3.1': 0.8, 'D3.3': 0.8,
    'D4.1': 0.4, 'D4.4': 0.6, 'D5.2': 0.8, 'D7.1': 0.8, 'D7.2': 0.6,
  }),
  'crimea-2014': Object.freeze({
    'D1.1': 0.4, 'D1.4': 0.4, 'D2.3': 0.4, 'D3.1': 0.4, 'D3.3': 0.4,
    'D4.1': 0.4, 'D4.4': 0.2, 'D5.2': 0.4, 'D7.1': 0.4, 'D7.2': 0.4,
  }),
  'cuban-1962': Object.freeze({
    'D1.1': 1, 'D1.4': 1, 'D2.3': 1, 'D3.1': 1, 'D3.3': 1,
    'D4.1': 1, 'D4.4': 1, 'D5.2': 1, 'D7.1': 1, 'D7.2': 1,
  }),
  'feb2022': Object.freeze({
    'D1.1': 1, 'D1.4': 1, 'D2.3': 0.8, 'D3.1': 0.8, 'D3.3': 0.8,
    'D4.1': 0.8, 'D4.4': 0.8, 'D5.2': 0.8, 'D7.1': 0.8, 'D7.2': 0.6,
  }),
  'georgia-2008': Object.freeze({
    'D1.4': 0.6, 'D2.3': 0.6, 'D3.1': 0.6, 'D3.3': 0.6, 'D4.1': 0.6,
    'D4.4': 0.6, 'D5.2': 0.6, 'D7.1': 0.6, 'D7.2': 0.4,
  }),
  'iraq-2003': Object.freeze({
    'D1.1': 0.8, 'D1.4': 0.6, 'D2.3': 0.2, 'D3.1': 0.6, 'D3.3': 0.4,
    'D4.1': 0.4, 'D4.4': 0.6, 'D5.2': 0.6, 'D7.1': 0.6, 'D7.2': 0.2,
  }),
  'kargil-1999': Object.freeze({
    'D1.4': 0.6, 'D2.3': 0.2, 'D3.1': 0.4, 'D3.3': 0.4, 'D4.1': 0.4,
    'D4.4': 0.2, 'D5.2': 0.4, 'D7.1': 0.4, 'D7.2': 0.2,
  }),
  'proxy-sanctions-2018': Object.freeze({
    'D1.1': 0.2, 'D1.4': 0.6, 'D2.3': 0.6, 'D3.1': 0.2, 'D3.3': 0.2,
    'D4.1': 0.2, 'D4.4': 0.2, 'D5.2': 0.4, 'D7.1': 0.6, 'D7.2': 0.2,
  }),
  'routine-2010s': Object.freeze({
    'D1.1': 0.2, 'D1.4': 0.2, 'D2.3': 0.2, 'D3.1': 0.2, 'D3.3': 0.2,
    'D5.2': 0.2, 'D7.1': 0.2,
  }),
  'yom-kippur-1973': Object.freeze({
    'D1.4': 0.6, 'D2.3': 0.4, 'D3.1': 0.6, 'D3.3': 0.6, 'D4.1': 0.6,
    'D4.4': 0.6, 'D5.2': 0.4, 'D7.1': 0.6,
  }),
});

test('anchors: events[] только там, где min(1, Σsev / capCount) точно равно прежнему value', () => {
  let total = 0;
  for (const { meta, input } of loadAnchors(ANCHORS_DIR)) {
    const expected = ANCHOR_EVENT_VALUES[meta.id] || {};
    let withEvents = 0;
    for (const [id, entry] of Object.entries(input.criteria)) {
      if (!entry) continue;
      const scale = CRITERIA[id].scale;
      if (Array.isArray(entry.events)) {
        assert.equal(scale, 'count', `${meta.id}/${id}: события только на счётной шкале (§7.3)`);
        assert.ok(!('value' in entry), `${meta.id}/${id}: value убран — иначе normalizeCriterion молча выберет events`);
        assert.ok(entry.events.length > 0, `${meta.id}/${id}: непустой список событий`);
        assert.ok(
          entry.events.length <= PARAMS.capCount * 2,
          `${meta.id}/${id}: не более ${PARAMS.capCount * 2} событий`,
        );
        for (const sev of entry.events) {
          assert.ok(PARAMS.severityValues.includes(sev), `${meta.id}/${id}: вес ${sev} вне severityValues`);
        }
        const value = Math.min(1, entry.events.reduce((a, b) => a + b, 0) / PARAMS.capCount);
        assert.ok(Number.isFinite(expected[id]), `${meta.id}/${id}: events у критерия, которого не было в ожидании`);
        assert.ok(
          Math.abs(value - expected[id]) < 1e-12,
          `${meta.id}/${id}: события дают ${value}, прежнее value ${expected[id]}`,
        );
        withEvents += 1;
      } else {
        assert.ok(!(id in expected), `${meta.id}/${id}: прежнее value ${expected[id]} точно представимо, а events нет`);
        if (scale === 'count') {
          // Счётный критерий без событий обязан быть на значении, которое
          // суммой весов не воспроизводится (0, 0.67) — иначе события потеряны.
          assert.ok(!REPRESENTABLE.has(entry.value), `${meta.id}/${id}: value ${entry.value} точно представимо — ожидались events`);
        } else {
          // ordinal/binary (включая Д4/esc и D4.6): шкала не счётная, value
          // обязателен контрактом validate, события сюда не добавляются.
          assert.equal(entry.events, undefined, `${meta.id}/${id}: не-счётная шкала остаётся на value`);
          assert.equal(typeof entry.value, 'number', `${meta.id}/${id}: не-счётная шкала несёт value`);
        }
      }
    }
    for (const id of Object.keys(expected)) {
      assert.ok(input.criteria[id], `${meta.id}/${id}: критерий с ожидаемыми events исчез`);
    }
    assert.equal(withEvents, Object.keys(expected).length, `${meta.id}: число критериев с events`);
    total += withEvents;
  }
  assert.equal(total, 93, '93 счётных критерия с точно представимым значением во всех 10 якорях');
});

test('loadAnchors: файлы без input.anchor (форвардные якоря) пропускаются', () => {
  // R15.2: forward-<week>.json лежит в том же каталоге, что и модельные якоря,
  // но схема у него другая. Калибровка обязана его игнорировать, а не падать.
  const dir = mkdtempSync(path.join(os.tmpdir(), 'ci-anchors-'));
  try {
    writeFileSync(path.join(dir, 'anchor-a.json'), JSON.stringify({ anchor: { id: 'a' }, criteria: {} }));
    writeFileSync(path.join(dir, 'forward-2026-10-25.json'), JSON.stringify({
      week: '2026-10-25', expectedCluster: 'tense', rationale: 'r', author: 'editor',
      committedAt: '2026-10-20', sources: [],
    }));
    writeFileSync(path.join(dir, 'anchor-not-object.json'), JSON.stringify({ anchor: 'a', criteria: {} }));

    const anchors = loadAnchors(dir);
    assert.equal(anchors.length, 1);
    assert.equal(anchors[0].meta.id, 'a');
    assert.equal(anchors[0].file, 'anchor-a.json');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('anchors: индекс каждого профиля не сдвинулся от замены value на events', () => {
  const expected = {
    'able-archer-1983': 81,
    'crimea-2014': 50,
    'cuban-1962': 99,
    'feb2022': 91,
    'georgia-2008': 69,
    'iraq-2003': 72,
    'kargil-1999': 51,
    'proxy-sanctions-2018': 33,
    'routine-2010s': 8,
    'yom-kippur-1973': 73,
  };
  for (const { meta, input } of loadAnchors(ANCHORS_DIR)) {
    // Индексы сняты прогоном runAnchor до правки якорей (k = 1.95).
    assert.equal(runAnchor(input, PARAMS).result.index, expected[meta.id], meta.id);
  }
});


