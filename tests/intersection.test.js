// R03/R05/R10i/R11i/R12i (ADR 0046): критерий входа с `intersection: true` —
// вторичный учёт уже посчитанного события. Движок его видит (покрытие не падает),
// но не считает: критерий выпадает и из числителя, и из знаменателя скора
// драйвера, среднего Д8 и подгрупп Д9. Семантика — «как будто записи нет»,
// а не `value: 0` (покрытый ноль тянул бы среднее вниз и наказывал за честную
// запись). Прогон недели называет пересечения в отчёте, чтобы флаг не был
// молчаливым.
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  buildDriversCore, driverScore, d8Strength, aggregateD9, D9_SUBGROUPS, validate, regionalSignals,
} from '../calc/engine.js';
import { PARAMS } from '../calc/params.js';
import { collectIntersections, coverageOf, printWeek, runWeek, loadSnapshotPart, nextChainState } from '../calc/calc.js';
import { computeWeek } from '../calc/week-step.js';
import { regionIdsFor } from '../js/data.js';

// --- Перенос флага в запись критерия драйвера ---

test('buildDriversCore: intersection переносится только при истине, иначе ключа нет', () => {
  const criteria = {
    'D1.1': { events: [1, 1], covered: true, intersection: true },
    'D1.2': { value: 0.67, covered: true },
    'D1.3': { value: 0.33, covered: true, intersection: false },
  };
  const d1 = buildDriversCore(criteria, {}, PARAMS).find((d) => d.id === 'D1');
  const rec = Object.fromEntries(d1.criteria.map((c) => [c.id, c]));
  assert.equal(rec['D1.1'].intersection, true);
  assert.equal(rec['D1.1'].covered, true, 'критерий остаётся покрытым');
  assert.equal('intersection' in rec['D1.2'], false, 'при отсутствии поля ключа нет');
  assert.equal('intersection' in rec['D1.3'], false, 'false не переносится как ключ');
  assert.equal('intersection' in rec['D1.4'], false, 'непокрытый критерий ключа не несёт');
});

// Ручной разбор счётного случая (D1, scale count): D1.1 events [1,1,1,1,1] →
// norm 1 (CAP = 5); D1.3 = 0.5; D1.5 = 0.6; D1.4 events [0.2] → norm 0.04 и
// флаг пересечения.
// Без D1.4 в списке: покрыто 3 из 5 (0.6 ≥ 0.5), E = (1 + 0.5 + 0.6)/3 = 0.7,
// деэскалационных покрытых нет → скор 0.7.
test('driverScore (count, events): пересечение не входит в числитель и знаменатель', () => {
  const flagged = {
    'D1.1': { events: [1, 1, 1, 1, 1], covered: true },
    'D1.3': { value: 0.5, covered: true },
    'D1.4': { events: [0.2], covered: true, intersection: true },
    'D1.5': { value: 0.6, covered: true },
  };
  const absent = { ...flagged };
  delete absent['D1.4'];
  const score = (criteria) => buildDriversCore(criteria, {}, PARAMS).find((d) => d.id === 'D1').score;
  assert.ok(Math.abs(score(flagged) - 0.7) < 1e-12, `ожидалось 0.7, получено ${score(flagged)}`);
  assert.equal(score(flagged), score(absent), 'флаг даёт тот же скор, что и отсутствие записи');
  // Отличие от «покрытого нуля»: 0.525 (2.1/4), то есть пересечение реально исключено.
  const zeroed = { ...flagged, 'D1.4': { value: 0, covered: true } };
  assert.notEqual(score(flagged), score(zeroed));
});

// Ручной разбор порядкового случая: D1.2 (ordinal) value 0.67 с флагом;
// покрыты D1.1 (events [1,1,1,1,1] → 1), D1.3 = 0.5, D1.5 = 0.6. Без D1.2:
// E = 2.1/3 = 0.7, покрытие 3/5.
test('driverScore (ordinal, value): пересечение даёт скор прогона без записи', () => {
  const flagged = {
    'D1.1': { events: [1, 1, 1, 1, 1], covered: true },
    'D1.2': { value: 0.67, covered: true, intersection: true },
    'D1.3': { value: 0.5, covered: true },
    'D1.5': { value: 0.6, covered: true },
  };
  const absent = { ...flagged };
  delete absent['D1.2'];
  const score = (criteria) => buildDriversCore(criteria, {}, PARAMS).find((d) => d.id === 'D1').score;
  assert.ok(Math.abs(score(flagged) - 0.7) < 1e-12, `ожидалось 0.7, получено ${score(flagged)}`);
  assert.equal(score(flagged), score(absent));
  // Без флага D1.2 вошёл бы в среднее: 2.77/4 = 0.6925 — другое число.
  const plain = { ...flagged, 'D1.2': { value: 0.67, covered: true } };
  assert.notEqual(score(flagged), score(plain));
});

// Д8: значения 1, 0, 0.67 (флаг), 1 → без флага (1+0+0.67+1)/4 = 0.6675,
// с флагом (1 + 0 + 1)/3 = 2/3 — как если бы Д8.3 был null.
test('d8Strength: пересечение не тянет среднее вниз', () => {
  const flagged = {
    'D8.1': { value: 1, covered: true },
    'D8.2': { value: 0, covered: true },
    'D8.3': { value: 0.67, covered: true, intersection: true },
    'D8.4': { value: 1, covered: true },
  };
  const absent = { ...flagged };
  delete absent['D8.3'];
  const score = (criteria) => buildDriversCore(criteria, {}, PARAMS).find((d) => d.id === 'D8').score;
  assert.ok(Math.abs(score(flagged) - 2 / 3) < 1e-12, `ожидалось 2/3, получено ${score(flagged)}`);
  assert.equal(score(flagged), score(absent));
  const plain = { ...flagged, 'D8.3': { value: 0.67, covered: true } };
  assert.ok(Math.abs(score(plain) - 0.6675) < 1e-12);
  assert.ok(Math.abs(score(flagged) - score(plain)) > 1e-6, 'с флагом среднее иное, чем без него');
});

// Д9: подгруппы 0.8 / 0.2 / 1.0 (флаг). Флаг — полный эквивалент отсутствия
// сигнала: подгруппа выпадает из среднего, короборации и счётчика сигналящих.
// С флагом сигналят две → corr каждой 0.5, mean = (0.8·0.5 + 0.2·0.5)/2 = 0.25 —
// ровно как при score null. Если бы флаг оставался в короборации, corr была бы 1
// и среднее 0.5: повторное событие двигало бы скор соседей.
test('aggregateD9: флаг эквивалентен отсутствию сигнала (среднее и короборация)', () => {
  const base = [
    { id: 'D9.1', score: 0.8 },
    { id: 'D9.2', score: 0.2 },
    { id: 'D9.3', score: 1 },
  ];
  const plain = aggregateD9(base, PARAMS);
  const flagged = aggregateD9(
    base.map((s) => (s.id === 'D9.3' ? { ...s, intersection: true } : s)),
    PARAMS,
  );
  const absent = aggregateD9(base.map((s) => (s.id === 'D9.3' ? { ...s, score: null } : s)), PARAMS);
  assert.ok(Math.abs(plain.score - 2 / 3) < 1e-12);
  assert.equal(plain.signaling, 3);
  assert.ok(Math.abs(flagged.score - 0.25) < 1e-12, `ожидалось 0.25, получено ${flagged.score}`);
  assert.equal(flagged.signaling, 2, 'подгруппа не считается сигналящей');
  assert.equal(flagged.score, absent.score, 'флаг = отсутствие сигнала');
  assert.equal(flagged.signaling, absent.signaling);
  assert.deepEqual(flagged.corr, absent.corr);
});

// Порог покрытия драйвера считает пересечение покрытым наблюдением: D1 —
// покрыты D1.1 (0.4), D1.2 (0.5, флаг) и D1.3 (0.6), всего 6 критериев →
// 3/6 = 0.5 проходит порог; скор по двум счётным = (0.4 + 0.6)/2 = 0.5.
// Если бы флаг выпадал из total, покрытие стало бы 2/5 = 0.4 → null.
test('driverScore: пересечение покрыто для порога, но не в скоре', () => {
  const drv = buildDriversCore({
    'D1.1': { events: [1, 1], covered: true },
    'D1.2': { value: 0.5, covered: true, intersection: true },
    'D1.3': { value: 0.6, covered: true },
  }, {}, PARAMS).find((d) => d.id === 'D1');
  assert.ok(drv.score !== null, 'драйвер не должен уходить в null');
  assert.ok(Math.abs(drv.score - 0.5) < 1e-12, `ожидалось 0.5, получено ${drv.score}`);
});

// Д8: покрыты Д8.1 (1) и Д8.2 (0.5, флаг) из четырёх → 2/4 = 0.5 проходит
// порог; среднее по одному не-пересечению = 1. Без учёта флага в пороге
// покрытие было бы 1/3 < 0.5 → null.
test('d8Strength: пересечение покрыто для порога, но не в среднем', () => {
  const drv = buildDriversCore({
    'D8.1': { value: 1, covered: true },
    'D8.2': { value: 0.5, covered: true, intersection: true },
  }, {}, PARAMS).find((d) => d.id === 'D8');
  assert.ok(drv.score !== null, 'драйвер не должен уходить в null');
  assert.equal(drv.score, 1);
});

// Все покрытые критерии — пересечения: порог покрыт, считаемых членов нет.
// Скор 0 (нового сигнала нет), а не null — иначе флаг выглядел бы как слепота.
test('driverScore и d8Strength: все покрытые — пересечения → 0, не null', () => {
  const d1 = buildDriversCore({
    'D1.1': { events: [1, 1], covered: true, intersection: true },
    'D1.2': { value: 0.5, covered: true, intersection: true },
    'D1.3': { value: 0.6, covered: true, intersection: true },
  }, {}, PARAMS).find((d) => d.id === 'D1');
  assert.equal(d1.score, 0);
  const d8 = buildDriversCore({
    'D8.1': { value: 1, covered: true, intersection: true },
    'D8.2': { value: 0.5, covered: true, intersection: true },
  }, {}, PARAMS).find((d) => d.id === 'D8');
  assert.equal(d8.score, 0);
});

// Граничный случай Д9 — один в один с Д1–Д8: все покрытые подгруппы помечены
// пересечением. Данные собраны (подгруппы покрыты), считаемых членов нет →
// `{score: 0, signaling: 0}`, как если бы скор драйвера обнулился отсутствием
// нового сигнала. `null` здесь означал бы слепоту, которой нет.
test('aggregateD9: все покрытые подгруппы — пересечения → {score: 0, signaling: 0}', () => {
  const flagged = aggregateD9([
    { id: 'D9.1', score: 0.8, intersection: true },
    { id: 'D9.2', score: 0.2, intersection: true },
    { id: 'D9.4', score: 1, intersection: true },
  ], PARAMS);
  assert.equal(flagged.score, 0, 'обнуление, не null');
  assert.equal(flagged.signaling, 0);
  assert.deepEqual(flagged.corr, {}, 'короборации у выбывших нет');
  // Отличие от «ни одной покрытой подгруппы»: там данных нет и остаётся null.
  const blind = aggregateD9(D9_SUBGROUPS.map((id) => ({ id, score: null })), PARAMS);
  assert.equal(blind.score, null);
});

// --- Валидация входа ---

function entry(extra = {}) {
  return {
    value: 0.4,
    covered: true,
    sources: [{ url: 'https://example.org/a', date: '2026-09-10', cluster: 'D-satellite-osint' }],
    ...extra,
  };
}
const inputWith = (e) => ({ week: '2026-09-13', criteria: { 'D1.1': e } });

test('validate: boolean intersection на покрытом критерии допустим', () => {
  assert.deepEqual(validate(inputWith(entry({ intersection: true }))), []);
  assert.deepEqual(validate(inputWith(entry({ intersection: false }))), []);
  assert.deepEqual(validate(inputWith(entry())), []);
});

test('validate: не-булево intersection отклоняется с id критерия', () => {
  for (const bad of ['yes', 1, {}, null]) {
    const errors = validate(inputWith(entry({ intersection: bad })));
    assert.ok(
      errors.some((e) => e.startsWith('criteria.D1.1.intersection:') && e.includes('boolean')),
      `ожидалась ошибка criteria.D1.1.intersection для ${JSON.stringify(bad)}: ${errors.join('; ')}`,
    );
  }
});

test('validate: intersection: true без covered: true отклоняется с id критерия', () => {
  for (const covered of [false, undefined]) {
    const e = entry({ intersection: true });
    if (covered === undefined) delete e.covered;
    else e.covered = covered;
    const errors = validate(inputWith(e));
    assert.ok(
      errors.some((err) => err.startsWith('criteria.D1.1') && err.includes('intersection')),
      `ожидалась ошибка пересечения на непокрытом D1.1: ${errors.join('; ')}`,
    );
  }
});

test('coverageOf: критерий с пересечением остаётся покрытым и не попадает в uncovered', () => {
  const cov = coverageOf({
    'D1.1': { value: 0.4, covered: true, intersection: true },
    'D1.2': null,
  });
  assert.equal(cov.criteria, 1, 'флаг не снимает покрытие');
  assert.equal(cov.totalCriteria, 46);
  assert.ok(!cov.uncovered.includes('D1.1'), 'D1.1 не считается слепым');
  assert.ok(cov.uncovered.includes('D1.2'));
});

// --- calc.js: отчёт прогона ---

test('collectIntersections: отсортированные id, только истинные значения', () => {
  const criteria = {
    'D9.3': { value: 0.5, covered: true, intersection: true },
    'D1.2': { value: 0.5, covered: true, intersection: true },
    'D1.3': { value: 0.5, covered: true, intersection: false },
    'D1.4': { value: 0.5, covered: true },
    'D1.5': null,
  };
  assert.deepEqual(collectIntersections(criteria), ['D1.2', 'D9.3']);
  assert.deepEqual(collectIntersections({}), []);
  assert.deepEqual(collectIntersections(null), []);
});

test('runWeek: реальная неделя без флагов возвращает пустой список пересечений', () => {
  const PREV_WEEK = '2026-08-23';
  const pg = loadSnapshotPart(PREV_WEEK, 'global');
  const pr = loadSnapshotPart(PREV_WEEK, 'regions');
  const state = {
    prevInternal: pg.global.index,
    prevPublished: pg.global.index,
    prevWeek: PREV_WEEK,
    prevRegions: Object.fromEntries(regionIdsFor('1.0').map((id) => [id, pr.regions[id].index])),
    recalcIndex: {}, classification: {}, sbLeft: 0, sbReason: null,
  };
  const res = runWeek('2026-08-30', state);
  assert.deepEqual(res.errors, []);
  assert.deepEqual(res.intersections, [], 'в архиве флага нет — список пуст');
  assert.ok(Array.isArray(res.intersections));
  Object.assign(state, nextChainState(state, res));
});

// --- §7: региональная модель не считает пересечения (R05/R10i) ---
// Тот же принцип, что и у глобального скора: критерий с intersection: true —
// вторичный учёт уже посчитанного события, поэтому в региональную модель он не
// входит ни сигналом (nReg), ни потоком недели (знаменатель eDyn). Иначе
// повторное событие сдвигало бы индексы регионов при неизменном глобальном.
const V1 = regionIdsFor('1.0');

// --- regionalSignals: запись с флагом = отсутствие записи ---
test('regionalSignals: пересечение не даёт сигналов и не входит в региональное покрытие', () => {
  const absent = {
    'D1.1': { value: 0.8, covered: true, regions: ['europe'] },
    'D1.2': { value: 0.6, covered: true, regions: ['europe'] },
    'D1.3': { value: 0.2, covered: true },                       // глобальный сигнал
    'D5.1': { value: 0.9, covered: true, regions: ['africa'] },
    'D1.4': { value: 0.4, covered: true, regions: ['south-asia'] },
  };
  const flagged = {
    ...absent,
    'D1.2': { ...absent['D1.2'], intersection: true },
    'D1.4': { ...absent['D1.4'], intersection: true },
  };
  const out = regionalSignals(flagged, V1, PARAMS);
  // Ручной счёт: покрыто 3 считаемых критерия (D1.1, D1.3, D5.1).
  // Europe: 1 сигнал (D1.1), доля в потоке 1/3.
  assert.equal(out.europe.nReg, 1, 'D1.2 с флагом не сигнал');
  assert.equal(out.europe.eDyn, 1 / 3, 'знаменатель eDyn — только считаемые записи');
  assert.equal(out.africa.nReg, 1);
  assert.equal(out.africa.eDyn, 1 / 3);
  assert.equal('south-asia' in out, false, 'регион без считаемых сигналов не появляется');
  // Сравнение с прогоном, где записи просто нет: флаг — полный эквивалент.
  const without = { ...absent };
  delete without['D1.2'];
  delete without['D1.4'];
  assert.deepEqual(out, regionalSignals(without, V1, PARAMS));
});

// --- computeWeek: региональные индексы недели не двигаются флагом ---
// Синтетическая неделя v1: D1.2 — единственный сигнал south-asia, на нём флаг.
// Прогон с флагом обязан совпасть с прогоном без записи по всем регионам и
// глобальному индексу/дельте/q; отличается только счётчик покрытия недели
// (данные собраны — критерий остаётся покрытым, R02.1). Fixture держит покрытие
// Д1 выше порога 50 % в обоих прогонах (D1.1/D1.3/D1.4): глобальное правило
// «пересечение покрыто для порога» (§4.2, F1) иначе сдвинуло бы и глобальный
// скор — сравнение регионов проверяло бы не тот шов.
function weekWithFlag(intersection) {
  const flagged = {
    week: '2026-09-13',
    criteria: {
      'D1.1': { value: 0.8, covered: true, regions: ['europe'] },
      'D1.2': { value: 0.6, covered: true, regions: ['south-asia'] },
      'D1.3': { value: 0.2, covered: true },
      'D1.4': { value: 0.4, covered: true },
      'D5.1': { value: 0.9, covered: true, regions: ['africa'] },
    },
  };
  if (intersection === null) {
    delete flagged.criteria['D1.2']; // прогон «записи нет»
    return flagged;
  }
  flagged.criteria['D1.2'] = { ...flagged.criteria['D1.2'], intersection };
  return flagged;
}
const CHAIN_STATE = {
  prevInternal: 40,
  prevPublished: 45,
  prevRegions: { europe: 54, 'south-asia': 38, africa: 52 },
  sbLeft: 0,
  sbReason: null,
};

test('computeWeek: флаг на атрибутированном критерии не меняет региональные индексы', () => {
  const withFlag = computeWeek(weekWithFlag(true), CHAIN_STATE);
  const absent = computeWeek(weekWithFlag(null), CHAIN_STATE);
  assert.deepEqual(withFlag.regions, absent.regions, 'регионы считаются как без записи');
  assert.equal(withFlag.global.index, absent.global.index);
  assert.equal(withFlag.global.delta, absent.global.delta);
  assert.equal(withFlag.global.internal, absent.global.internal);
  assert.equal(withFlag.global.q, absent.global.q);
  // Покрытие недели — наоборот, сохраняет запись: она собрана, просто не считается.
  const covFlag = coverageOf(weekWithFlag(true).criteria);
  const covAbsent = coverageOf(weekWithFlag(null).criteria);
  assert.equal(covFlag.criteria, covAbsent.criteria + 1);
  assert.ok(!covFlag.uncovered.includes('D1.2'));
});

// --- Граница слепоты: все сигналы региона — пересечения ---
test('computeWeek: регион, у которого все сигналы — пересечения, становится слепым', () => {
  const withFlag = computeWeek(weekWithFlag(true), CHAIN_STATE);
  const absent = computeWeek(weekWithFlag(null), CHAIN_STATE);
  assert.equal(withFlag.regions['south-asia'].background, true, 'фантомного сдвига нет — регион слепой');
  assert.equal(withFlag.regions['south-asia'].index, absent.regions['south-asia'].index);
  assert.equal(withFlag.regions.europe.background, false, 'считаемый сигнал региона остаётся');
  assert.equal(withFlag.regions.africa.background, false);
});

test('printWeek: строка пересечений только при непустом списке', () => {
  const res = (intersections) => ({
    week: '2026-08-30',
    errors: [],
    prevWeek: '2026-08-23',
    prevPublished: 50,
    global: {
      index: 51, state: 'tense', delta: 1, internal: 42.5, q: 0.8,
      structuralBreak: { active: false, reason: null },
    },
    classification: { insufficient: false, confidence: 'full', nullWeight: 0.1, coveredDrivers: 9 },
    coverage: { criteria: 30, totalCriteria: 46, drivers: 9 },
    sensitivity: 2.1,
    flash: [],
    core: { count: 9, missing: [] },
    ignoredAttribution: [],
    schemaWarnings: [],
    regions: { europe: { index: 51, status: 'tense', delta: 1, background: false } },
    trend: [{ date: '2026-08-30', value: 51 }],
    intersections,
  });
  const withAny = printWeek(res(['D1.2']));
  assert.ok(withAny.some((l) => l === 'пересечения: 1 (D1.2)'), withAny.join('\n'));
  const none = printWeek(res([]));
  assert.ok(!none.some((l) => l.startsWith('пересечения:')), 'пустой список строку не печатает');
});

