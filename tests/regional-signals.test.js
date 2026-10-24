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
// иначе контракт js/data.js отклонит запись недели.
const SIGNAL_REGION = {
  nReg: 3, eStruct: 0.5, eDyn: 0.3, hasDeescSignals: false, iWith: 78, iWithout: 66,
};

test('regionalIndex: регион с сигналами без prevIndex получает дельту от prevGlobal (ADR 0038)', () => {
  const g = { index: 64, internal: 64.4, delta: 8 };
  const r = regionalIndex(g, { ...SIGNAL_REGION, prevGlobal: 56 }, PARAMS);
  assert.equal(r.background, false);
  assert.equal(typeof r.delta, 'number');
  assert.equal(r.delta, r.index - 56);
});

test('regionalIndex: регион со своей историей считает дельту от prevIndex, а не от глобала', () => {
  const g = { index: 64, internal: 64.4, delta: 8 };
  const r = regionalIndex(g, { ...SIGNAL_REGION, prevIndex: 40, prevGlobal: 56 }, PARAMS);
  assert.equal(r.delta, r.index - 40);
});

test('regionalIndex: слепая ветка при отсутствии prevIndex не меняется — дельта равна глобальной', () => {
  const g = { index: 64, internal: 64.4, delta: 8 };
  const r = regionalIndex(g, { nReg: 0, prevGlobal: 56 }, PARAMS);
  assert.equal(r.background, true);
  assert.equal(r.delta, g.delta);
});

// --- regionalSignals ---

// Ручной прогон: params с единственным весом D1 (остальные драйверы вне
// нормировки), k = 1.95. Драйвер Д1 по 3 покрытым критериям из 6:
// score = mean(esc) − α·mean(deesc) = mean(0.8, 0.6) − 0.5·0.4 = 0.5.
// Насыщающая кривая §5.2: 100·(1−e^{−1.95·0.5})/(1−e^{−1.95}) ≈ 72.61.
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
  assert.ok(Math.abs(eu.iWith - 72.61) < 0.01); // ручной прогон выше
  // iWithout: без сигналов Европы D1 покрыт 1/6 (D1.3) — по глобальному порогу
  // 50 % это null, но гипотетики считаются по правилу «≥1 покрытого критерия»
  // (ADR 0065, эпсилон): S = 0.2; curve(0.2) = 100·(1−e^{−0.39})/(1−e^{−1.95})
  // ≈ 37.65.
  assert.ok(Math.abs(eu.iWithout - 37.65) < 0.01);

  const af = out.africa;
  assert.equal(af.nReg, 1);
  assert.equal(af.eDyn, 1 / 5);
  assert.equal(af.hasDeescSignals, false);
  assert.equal(af.iWith, 0); // D5 вне весов теста → гипотетика по сигналам Африки = 0
  // iWithout: неделя без сигналов Африки — D1 покрыт 4/6: mean(0.8, 0.6, 0.2) − 0.5·0.4
  // = 0.5333 − 0.2 = 0.3333; curve(1/3) = 100·(1−e^{−0.65})/(1−e^{−1.95}) ≈ 55.72.
  assert.ok(Math.abs(af.iWithout - 55.72) < 0.01);
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

test('renderRegions: флаг background сериализуется в regions.js (true — слепой регион)', () => {
  const out = renderRegions('2026-10-11', {
    europe: { index: 50, delta: -2, status: 'danger', background: true },
    africa: { index: 61, delta: 3, status: 'very', background: false },
  });
  assert.ok(out.includes('"background": true'));
  assert.ok(out.includes('"background": false'));
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
