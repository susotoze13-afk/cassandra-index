// regional-signals.test.js — шов engine.regionalSignals (агрегация региональной
// атрибуции критериев §7) и документация слепой ветки regionalIndex.
// Ожидаемые значения — разобранные вручную примеры (формулы §4.2/§5.2/§7),
// не пересчёт тем же кодом.
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { regionalIndex, regionalSignals, validate } from '../calc/engine.js';
import { PARAMS, list } from '../calc/params.js';
import { regionIdsFor } from '../js/data.js';

// Набор v1 (шесть id) — таксономия демо-недель и цепочки 08-30…10-11. Смысл
// псевдонима REGION_IDS — текущий набор (v2), поэтому исторические ожидания
// этого файла берут v1 явно.
const V1 = regionIdsFor('1.0');

// --- Диагностика брифа: у слепого региона дельта по построению равна глобальной ---
// Задокументированное поведение §7, а не баг: delta = (gInternal + clamp(prevIndex −
// prevGlobal)) − prevIndex = gInternal − prevGlobal — константа по всем регионам
// (пока отклонение не уперлось в клэмп ±regionClamp). Семантика слепой ветки
// regionalIndex осознанно НЕ меняется: регион сохраняет последнее отклонение от
// глобального фона, а дельта у всех слепых регионов общая.
test('regionalIndex: дельта слепого региона по построению равна gInternal − prevGlobal (документированное поведение §7)', () => {
  const g = { index: 72, internal: 72, delta: 11 };
  const eu = regionalIndex(g, { nReg: 0, prevIndex: 79, prevGlobal: 61 }, PARAMS);
  const af = regionalIndex(g, { nReg: 0, prevIndex: 55, prevGlobal: 61 }, PARAMS);
  assert.equal(eu.background, true);
  assert.equal(af.background, true);
  // 72 + (79−61) = 90; 72 + (55−61) = 66 — индексы различаются…
  assert.equal(eu.index, 90);
  assert.equal(af.index, 66);
  // …а дельта у обоих = 72 − 61 = 11 — общая, и равна дельте глобала к тому же prevGlobal.
  assert.equal(eu.delta, 11);
  assert.equal(af.delta, 11);
  assert.equal(eu.delta, g.index - 61);
});

// --- ADR 0038: регион без истории стартует от прошлого глобального фона ---
// Регион с сигналами (nReg > 0), но без prevIndex (первая неделя нового id
// таксономии v2) обязан получить числовую дельту index − prevGlobal, а не null:
// иначе контракт js/data.js отклонит запись недели. Мера отклонения — Δ_region
// по драйверам (ADR 0069 §1): internal = gInternal + e_r·Δ_region.
const SIGNAL_REGION = {
  nReg: 3, eStruct: 0.5, eDyn: 0.3, hasDeescSignals: false, deltaRegion: 10,
};

test('regionalIndex: регион с сигналами без prevIndex получает дельту от prevGlobal (ADR 0038)', () => {
  const g = { index: 64, internal: 64.4, delta: 8 };
  const r = regionalIndex(g, { ...SIGNAL_REGION, prevGlobal: 56 }, PARAMS);
  assert.equal(r.background, false);
  assert.equal(typeof r.delta, 'number');
  // e_r = 0.5·0.5 + 0.5·0.3 = 0.4; internal = 64.4 + 0.4·10 = 68.4
  assert.equal(r.internal, 68.4);
  assert.equal(r.index, 68.4);
  assert.equal(r.delta, 12.4); // round1(68.4 − 56) — одна десятичная
});

test('regionalIndex: регион со своей историей считает дельту от prevIndex, а не от глобала', () => {
  const g = { index: 64, internal: 64.4, delta: 8 };
  const r = regionalIndex(g, { ...SIGNAL_REGION, prevIndex: 40, prevGlobal: 56 }, PARAMS);
  assert.equal(r.delta, 28.4); // round1(68.4 − 40)
});

test('regionalIndex: слепая ветка при отсутствии prevIndex не меняется — дельта равна глобальной', () => {
  const g = { index: 64, internal: 64.4, delta: 8 };
  const r = regionalIndex(g, { nReg: 0, prevGlobal: 56 }, PARAMS);
  assert.equal(r.background, true);
  assert.equal(r.delta, g.delta);
});

// --- regionalSignals: мера отклонения Δ_region по драйверам (ADR 0069 §1) ---
// Δ_region = 100 · Σ_d w_d·shrink_d·(s_d^reg − s_d^glob) / Σ_d w_d по допустимым
// драйверам (Д1, Д3, Д5–Д8, Д9 только D9.3); знаменатель — константа из весов,
// отсутствующий драйвер входит нулём; обе ноги — с epsilon-порогом ADR 0065.

// Ручной прогон (P: единственный вес D1): Д1 покрыт глобально 4 критериями из 6
// (D1.1, D1.2, D1.6, D1.3): s_glob = mean(0.8, 0.6, 0.2) − 0.5·0.4 = 0.3333.
// У Европы 3 сигнала Д1: s_reg = mean(0.8, 0.6) − 0.5·0.4 = 0.5; shrink = 3/4.
// Вклад = 1·(3/4)·(0.5 − 0.3333) = 0.125; Δ = 100·0.125/1 = 12.5.
const P = list();
P.weights = { D1: 1 };

const MIXED_WEEK = {
  'D1.1': { covered: true, value: 0.8, regions: ['europe'] },
  'D1.2': { covered: true, value: 0.6, regions: ['europe'] },
  'D1.6': { covered: true, value: 0.4, regions: ['europe'] }, // деэскалационный
  'D1.3': { covered: true, value: 0.2 },                       // глобальный сигнал
  'D5.1': { covered: true, value: 0.9, regions: ['africa'] },
};

test('regionalSignals: смешанная неделя — только регионы с атрибуцией, поля по §7', () => {
  const out = regionalSignals(MIXED_WEEK, V1, P);
  assert.deepEqual(Object.keys(out).sort(), ['africa', 'europe']);

  const eu = out.europe;
  assert.equal(eu.nReg, 3);
  assert.equal(eu.eStruct, 0.5); // нейтральный стартовый default (ADR 0022)
  assert.equal(eu.eDyn, 3 / 5);  // доля сигналов региона в общем потоке (5 покрытых)
  assert.equal(eu.hasDeescSignals, true); // D1.6 deesc, value > 0
  assert.ok(Math.abs(eu.deltaRegion - 12.5) < 1e-9); // ручной прогон выше

  const af = out.africa;
  assert.equal(af.nReg, 1);
  assert.equal(af.eDyn, 1 / 5);
  assert.equal(af.hasDeescSignals, false);
  // Д5 вне весов теста (w = 0) — вклад нулевой, запись есть, Δ = 0.
  assert.equal(af.deltaRegion, 0);
});

test('regionalSignals: Δ_region — постоянный знаменатель 0.765 из PARAMS.weights (ADR 0069 Q10)', () => {
  // Полные веса. Д1: s_reg = 0.8, s_glob = mean(0.8, 0.4) = 0.6, shrink = 1/2 →
  // вклад 0.1175·0.5·0.2 = 0.01175. Д9: региональная нога — только D9.3:
  // aggregateD9 по одной подгруппе даёт 0.8·0.5 = 0.4 (короборация 0.5);
  // глобальная нога — весь покрытый Д9: aggregateD9([D9.3:0.8, D9.1:1]) с
  // короборацией 0.5 обеих подгрупп = 0.5·0.8·0.5 + 0.5·1·0.5 = 0.45;
  // shrink = 1/2 → вклад 0.06·0.5·(0.4 − 0.45) = −0.0015. Σ = 0.01025;
  // Δ = 100·0.01025/0.765 ≈ 1.34. Драйверы без сигналов региона входят нулём,
  // но остаются в знаменателе (иначе Δ = 100·0.01025/0.1775 ≈ 5.77).
  const criteria = {
    'D1.1': { covered: true, value: 0.8, regions: ['europe'] },
    'D1.2': { covered: true, value: 0.4 },
    'D9.3': { covered: true, value: 0.8, regions: ['europe'] },
    'D9.1': { covered: true, value: 1 },
  };
  const out = regionalSignals(criteria, V1, list());
  assert.ok(Math.abs(out.europe.deltaRegion - 1.025 / 0.765) < 1e-9);
});

test('regionalSignals: epsilon-порог ADR 0065 применяется к обеим ногам (ADR 0069 Q11)', () => {
  // Д9 покрыт 2 подгруппами из 8 (25 % < глобальных 50 %): при epsilon-пороге
  // глобальная нога покрыта (s_glob = 0.25 — ручной разбор: aggregateD9
  // [D9.3:0.8, D9.1:0.2] с короборацией 0.5 обеих = 0.5·0.8·0.5 + 0.5·0.2·0.5),
  // региональная — тоже (1/8 ≥ эпсилон; s_reg = 0.8·0.5 = 0.4 по одной
  // подгруппе); shrink = 1/2 → Δ = 100·(0.06·0.5·0.15)/0.06 = 7.5.
  const criteria = {
    'D9.3': { covered: true, value: 0.8, regions: ['europe'] },
    'D9.1': { covered: true, value: 0.2 },
  };
  const pEps = list();
  pEps.weights = { D9: 0.06 };
  const on = regionalSignals(criteria, V1, pEps, undefined);
  assert.ok(Math.abs(on.europe.deltaRegion - 7.5) < 1e-9);
  // Подмена порога на глобальные 50 % (Д1): региональная нога Д1 региона с
  // одним сигналом из 6 критериев драйвера (1/6 < 50 %) не покрыта → вклад 0;
  // глобальная нога при 2/6 тоже не покрыта. Порог на Д9 не действует по §4.2
  // (композитный драйвер) — отдельный случай, эпсилон для неё без эффекта.
  const pHalf = list();
  pHalf.weights = { D1: 1 };
  pHalf.regionHypothesisThreshold = 0.5;
  const off = regionalSignals(
    { 'D1.1': { covered: true, value: 0.8, regions: ['europe'] }, 'D1.2': { covered: true, value: 0.2 } },
    V1,
    pHalf,
    undefined,
  );
  assert.equal(off.europe.deltaRegion, 0);
  // Контроль того же набора при эпсилоне: Δ = 100·1·(1/2)·(0.8 − 0.5) = 15.
  const onD1 = list();
  onD1.weights = { D1: 1 };
  const onD1Out = regionalSignals(
    { 'D1.1': { covered: true, value: 0.8, regions: ['europe'] }, 'D1.2': { covered: true, value: 0.2 } },
    V1,
    onD1,
    undefined,
  );
  assert.ok(Math.abs(onD1Out.europe.deltaRegion - 15) < 1e-9);
});

test('regionalSignals: пустой объект, если атрибуции нет', () => {
  const out = regionalSignals(
    { 'D1.1': { covered: true, value: 0.5 }, 'D1.2': null },
    V1,
    P,
  );
  assert.deepEqual(out, {});
});

test('regionalSignals: Д2/Д4 и Д9 (кроме Д9.3) не участвуют — эффект через экспозицию (§7)', () => {
  const out = regionalSignals(
    {
      'D2.1': { covered: true, value: 1, regions: ['europe'] },
      'D4.1': { covered: true, value: 1, regions: ['europe'] },
      'D9.1': { covered: true, value: 1, regions: ['europe'] },
      'D9.5': { covered: true, value: 1, regions: ['europe'] },
    },
    V1,
    P,
  );
  assert.deepEqual(out, {});
  // Д9.3 — исключение §7 (транспорт и страхование атрибутируются регионально).
  const with93 = regionalSignals(
    { 'D9.3': { covered: true, value: 0.7, regions: ['europe'] } },
    V1,
    P,
  );
  assert.equal(with93.europe.nReg, 1);
  assert.equal(typeof with93.europe.deltaRegion, 'number');
  // P несёт вес только D1: w.D9 = 0 → вклад Д9 нулевой.
  assert.equal(with93.europe.deltaRegion, 0);
});

test('regionalSignals: сигнал с нулевым значением — объём данных, не деэскалация', () => {
  const out = regionalSignals(
    { 'D1.6': { covered: true, value: 0, regions: ['europe'] } },
    V1,
    P,
  );
  assert.equal(out.europe.nReg, 1);
  assert.equal(out.europe.hasDeescSignals, false); // value = 0 — подтверждённой деэскалации нет
});


// --- Проводка флага background в файлы данных и контракт снапшота ---

import { renderRegions, renderRegionFile } from '../calc/calc.js';
import { validate as validateSnapshot } from '../js/data.js';

test('renderRegions: флаг background и поле signals сериализуются в regions.js', () => {
  const out = renderRegions('2026-10-11', {
    europe: { index: 50, delta: -2, status: 'danger', background: true, signals: 0 },
    africa: { index: 61, delta: 3, status: 'very', background: false, signals: 4 },
  });
  assert.ok(out.includes('"background": true'));
  assert.ok(out.includes('"background": false'));
  assert.ok(out.includes('"signals": 0'));
  assert.ok(out.includes('"signals": 4'));
  assert.ok(out.includes('s.regions ='));
});

const REGION_PREV = {
  confidence: 'medium',
  drivers: [
    {
      observation: { ru: 'Наблюдение', en: 'Observation' },
      why: { ru: 'Почему', en: 'Why' },
      contribution: 'high',
      confidence: 'low',
      sources: [
        { title: { ru: 'Источник', en: 'Source' }, url: 'https://example.com/a', domain: 'example.com', date: '2026-10-10' },
        { title: { ru: 'Источник 2', en: 'Source 2' }, url: 'https://example.org/b', domain: 'example.org', date: '2026-10-09' },
      ],
    },
    {
      observation: { ru: 'Наблюдение 2', en: 'Observation 2' },
      why: { ru: 'Почему 2', en: 'Why 2' },
      contribution: 'low',
      confidence: 'high',
      sources: [
        { title: { ru: 'Источник 3', en: 'Source 3' }, url: 'https://example.net/c', domain: 'example.net', date: '2026-10-08' },
        { title: { ru: 'Источник 4', en: 'Source 4' }, url: 'https://example.edu/d', domain: 'example.edu', date: '2026-10-07' },
      ],
    },
  ],
};

test('renderRegionFile: background в region-*.js, drivers/confidence переносятся', () => {
  const blind = renderRegionFile('2026-10-11', 'europe', REGION_PREV, 50, -2, 'danger', true);
  assert.ok(blind.includes('"background": true'));
  assert.ok(blind.includes('"confidence": "medium"'));
  assert.ok(blind.includes('Наблюдение 2'));
  const signaled = renderRegionFile('2026-10-11', 'africa', REGION_PREV, 61, 3, 'very', false);
  assert.ok(signaled.includes('"background": false'));
});

function snapshotWith(regions) {
  return {
    published: '2026-10-11',
    through: '2026-10-11',
    methodology: '2.0',
    dataState: 'published',
    global: { index: 60, delta: -2 },
    regions,
    trend: Array.from({ length: 12 }, (_, i) => ({
      date: `2026-08-${String(2 + i * 7).padStart(2, '0')}`,
      value: 50 + i,
    })),
    drivers: REGION_PREV.drivers.concat([
      {
        observation: { ru: 'Н', en: 'O' },
        why: { ru: 'П', en: 'W' },
        contribution: 'medium',
        confidence: 'medium',
        sources: [
          { title: { ru: 'С', en: 'S' }, url: 'https://example.com/e', domain: 'example.com', date: '2026-10-10' },
          { title: { ru: 'С2', en: 'S2' }, url: 'https://example.org/f', domain: 'example.org', date: '2026-10-09' },
        ],
      },
    ]),
    sources: [
      { title: { ru: 'С', en: 'S' }, url: 'https://example.com/e', domain: 'example.com', date: '2026-10-10' },
    ],
  };
}

const SIX_REGIONS = (extra) => Object.fromEntries(
  V1.map((id, i) => [id, { index: 50 + i, delta: i - 3, ...extra(id) }]),
);

test('validate (js/data.js): background опционален — true/false принимаются, отсутствие = false', () => {
  const withFlag = validateSnapshot(snapshotWith(SIX_REGIONS(() => ({ background: true }))));
  assert.equal(withFlag.ok, true, JSON.stringify(withFlag.errors));
  const without = validateSnapshot(snapshotWith(SIX_REGIONS(() => ({}))));
  assert.equal(without.ok, true, JSON.stringify(without.errors));
});

test('validate (js/data.js): background не-boolean отклоняется', () => {
  const bad = validateSnapshot(snapshotWith(SIX_REGIONS((id) => (id === 'europe' ? { background: 'да' } : {}))));
  assert.equal(bad.ok, false);
  assert.ok(bad.errors.some((e) => e.includes('regions.europe.background')));
});

test('validate (js/data.js): опциональное signals региона (ADR 0069) — целое ≥ 0 принимается, отсутствие валидно', () => {
  // Демо-недели (1.0) поля не несут — валидны; недели 4.0 несут целое ≥ 0.
  const without = validateSnapshot(snapshotWith(SIX_REGIONS(() => ({}))));
  assert.equal(without.ok, true, JSON.stringify(without.errors));
  const withSignals = validateSnapshot(snapshotWith(SIX_REGIONS(() => ({ signals: 2 }))));
  assert.equal(withSignals.ok, true, JSON.stringify(withSignals.errors));
});

// Набор регионов снапшота — по версии (R07, ADR 0028): поле regions_taxonomy
// опционально (отсутствие = '1.0'), но если есть — валидны только '1.0'|'2.0';
// требуются ровно id своей версии, не единственная шестёрка.
test('validate (js/data.js): набор регионов — по regions_taxonomy', () => {
  const twelve = (extra) => Object.fromEntries(
    regionIdsFor('2.0').map((id, i) => [id, { index: 50 + (i % 30), delta: i - 6, ...extra(id) }]),
  );
  // v1-снапшот без поля проходит
  const v1 = validateSnapshot(snapshotWith(SIX_REGIONS(() => ({}))));
  assert.equal(v1.ok, true, JSON.stringify(v1.errors));
  // v2-снапшот с двенадцатью регионами проходит
  const v2 = validateSnapshot({ ...snapshotWith(twelve(() => ({}))), regions_taxonomy: '2.0' });
  assert.equal(v2.ok, true, JSON.stringify(v2.errors));
  // v2 объявлен, а регионов шесть — отклонён (нет id набора 2.0)
  const v2Six = validateSnapshot({ ...snapshotWith(SIX_REGIONS(() => ({}))), regions_taxonomy: '2.0' });
  assert.equal(v2Six.ok, false);
  assert.ok(v2Six.errors.some((e) => e.includes('regions.russia-belarus')));
  // неизвестная версия — ошибка поля
  const badVer = validateSnapshot({ ...snapshotWith(SIX_REGIONS(() => ({}))), regions_taxonomy: '9.9' });
  assert.equal(badVer.ok, false);
  assert.ok(badVer.errors.some((e) => e.includes('regions_taxonomy')));
});

// --- Валидация входа: whitelist регионов ---

function inputWithRegions(regions) {
  return {
    week: '2026-10-11',
    criteria: {
      'D1.1': {
        covered: true,
        value: 0.5,
        sources: [{ url: 'https://example.com/a', date: '2026-10-10', cluster: 'A-mainstream' }],
        regions,
      },
    },
  };
}

test('validate: regions критерия — whitelist по третьему параметру; дефолт — текущий набор', () => {
  // Дефолт (без третьего параметра) — текущий набор (v2, двенадцать id):
  // v2-id валиден, устаревший v1-id 'europe' — нет.
  const good = validate(inputWithRegions(['balkans', 'africa']));
  assert.deepEqual(good, []);

  const unknown = validate(inputWithRegions(['balkans', 'atlantis']));
  assert.equal(unknown.length, 1);
  assert.ok(unknown[0].includes('criteria.D1.1.regions'));
  assert.ok(unknown[0].includes('atlantis'));
  assert.ok(unknown[0].includes('balkans')); // в сообщении — полный whitelist

  const legacyEurope = validate(inputWithRegions(['europe']));
  assert.equal(legacyEurope.length, 1);
  assert.ok(legacyEurope[0].includes('europe'));

  const notArray = validate(inputWithRegions('balkans'));
  assert.ok(notArray.some((e) => e.includes('criteria.D1.1.regions')));
  const emptyString = validate(inputWithRegions(['']));
  assert.ok(emptyString.some((e) => e.includes('criteria.D1.1.regions')));

  // Явный whitelist версии недели: v1-неделя принимает 'europe'; v2-неделя — нет.
  const wrongForV2 = validate(inputWithRegions(['europe']), PARAMS, regionIdsFor('2.0'));
  assert.equal(wrongForV2.length, 1);
  assert.ok(wrongForV2[0].includes('europe'));
  assert.ok(wrongForV2[0].includes('russia-belarus')); // ошибка называет переданный whitelist
  assert.deepEqual(validate(inputWithRegions(['europe', 'africa']), PARAMS, regionIdsFor('1.0')), []);
});

// --- Проводка поля signals в блок регионов снапшота (ADR 0069) ---
import { computeWeek } from '../calc/week-step.js';

test('computeWeek: регион несёт signals = nReg, слепой регион — signals 0', () => {
  const input = {
    week: '2026-10-11', // v1-неделя: набор из шести регионов
    criteria: {
      'D1.1': { covered: true, value: 0.5, regions: ['europe'] },
      'D3.1': { covered: true, value: 0.4, regions: ['europe'] },
    },
  };
  const res = computeWeek(input, { prevInternal: 50, prevPublished: 50, prevRegions: {} }, PARAMS);
  assert.equal(res.regions.europe.signals, 2);
  assert.equal(res.regions.europe.background, false);
  assert.equal(res.regions.africa.signals, 0);
  assert.equal(res.regions.africa.background, true);
  assert.equal(typeof res.regions.europe.index, 'number');
  assert.equal(typeof res.regions.europe.delta, 'number');
});
