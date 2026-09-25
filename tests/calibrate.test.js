// calibrate.test.js — чистая логика calc/calibrate.js (контракт таска 03):
// выбор k из прогона сетки (rolling-origin: ранние якоря выбирают k,
// поздние — только проверка) и маппинг criteria → drivers.
// CLI-обвязка не тестируется.

import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { selectK, buildDrivers, loadAnchors, calibrate, runAnchor } from '../calc/calibrate.js';
import { validate } from '../calc/engine.js';
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
