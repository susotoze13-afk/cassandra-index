import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate, latest, week, listWeeks, REGION_IDS, regionIdsFor, CURRENT_TAXONOMY } from '../js/data.js';
import { loadSnapshotPart, renderGlobal } from '../calc/calc.js';

// Смысл псевдонима REGION_IDS — текущий набор (таск 02): контракт и расчёт
// ушли на regionIdsFor(версия), а псевдоним указывает на CURRENT_TAXONOMY.
test('REGION_IDS: псевдоним текущего набора (v2, двенадцать id, без europe)', () => {
  assert.deepEqual(REGION_IDS, regionIdsFor(CURRENT_TAXONOMY));
  assert.equal(REGION_IDS.length, 12);
  assert.ok(!REGION_IDS.includes('europe'));
  assert.ok(REGION_IDS.includes('russia-belarus'));
});

function validSnapshot() {
  return {
    published: '2026-09-13',
    through: '2026-09-06',
    methodology: '1.0',
    dataState: 'published',
    global: { index: 72, delta: 6 },
    regions: {
      europe: { index: 74, delta: 5 },
      'east-asia': { index: 55, delta: 2 },
      'middle-east': { index: 88, delta: 9 },
      'north-america': { index: 41, delta: -1 },
      'south-asia': { index: 63, delta: 4 },
      africa: { index: 48, delta: 1 },
    },
    trend: Array.from({ length: 12 }, (_, i) => ({
      date: `2026-06-${String(22 + i).padStart(2, '0')}`,
      value: 50 + i,
    })),
    drivers: [
      {
        observation: { ru: 'Наблюдение', en: 'Observation' },
        why: { ru: 'Почему важно', en: 'Why it matters' },
        contribution: 'high',
        confidence: 'high',
        sources: [
          { title: { ru: 'Источник 1', en: 'Source 1' }, url: 'https://example.com/a', domain: 'example.com', date: '2026-09-05' },
          { title: { ru: 'Источник 2', en: 'Source 2' }, url: 'https://example.org/b', domain: 'example.org', date: '2026-09-06' },
        ],
      },
      {
        observation: { ru: 'Наблюдение 2', en: 'Observation 2' },
        why: { ru: 'Почему важно 2', en: 'Why it matters 2' },
        contribution: 'medium',
        confidence: 'medium',
        sources: [
          { title: { ru: 'Источник 3', en: 'Source 3' }, url: 'https://example.com/c', domain: 'example.com', date: '2026-09-04' },
          { title: { ru: 'Источник 4', en: 'Source 4' }, url: 'https://example.org/d', domain: 'example.org', date: '2026-09-05' },
        ],
      },
      {
        observation: { ru: 'Наблюдение 3', en: 'Observation 3' },
        why: { ru: 'Почему важно 3', en: 'Why it matters 3' },
        contribution: 'low',
        confidence: 'high',
        sources: [
          { title: { ru: 'Источник 5', en: 'Source 5' }, url: 'https://example.com/e', domain: 'example.com', date: '2026-09-03' },
          { title: { ru: 'Источник 6', en: 'Source 6' }, url: 'https://example.net/f', domain: 'example.net', date: '2026-09-04' },
        ],
      },
    ],
    sources: [
      { title: { ru: 'Источник 1', en: 'Source 1' }, url: 'https://example.com/a', domain: 'example.com', date: '2026-09-05' },
    ],
  };
}

test('validate: корректный снапшот принимается', () => {
  const v = validate(validSnapshot());
  assert.equal(v.ok, true);
  assert.deepEqual(v.errors, []);
});

test('validate: отклоняет снапшот без обязательных полей', () => {
  const noGlobal = validSnapshot();
  delete noGlobal.global;
  const v1 = validate(noGlobal);
  assert.equal(v1.ok, false);
  assert.ok(v1.errors.some((e) => e.includes('global')));

  const noDates = validSnapshot();
  delete noDates.published;
  const v2 = validate(noDates);
  assert.equal(v2.ok, false);
  assert.ok(v2.errors.some((e) => e.includes('published')));

  const v3 = validate(null);
  assert.equal(v3.ok, false);
});

test('validate: индекс вне 0–100, неверное dataState, тренд не 12 точек', () => {
  const badIndex = validSnapshot();
  badIndex.global.index = 101;
  assert.equal(validate(badIndex).ok, false);

  const badState = validSnapshot();
  badState.dataState = 'exploded';
  assert.equal(validate(badState).ok, false);

  const shortTrend = validSnapshot();
  shortTrend.trend = shortTrend.trend.slice(0, 10);
  const v = validate(shortTrend);
  assert.equal(v.ok, false);
  assert.ok(v.errors.some((e) => e.includes('trend')));
});

test('validate: регионы — все 6, источники на драйвер 2–5', () => {
  const missRegion = validSnapshot();
  delete missRegion.regions.africa;
  const v1 = validate(missRegion);
  assert.equal(v1.ok, false);
  assert.ok(v1.errors.some((e) => e.includes('africa')));

  const oneSource = validSnapshot();
  oneSource.drivers[0].sources = oneSource.drivers[0].sources.slice(0, 1);
  assert.equal(validate(oneSource).ok, false);

  const sixSources = validSnapshot();
  sixSources.drivers[0].sources = Array.from({ length: 6 }, (_, i) => ({
    title: { ru: `И${i}`, en: `S${i}` }, url: 'https://example.com', domain: 'example.com', date: '2026-09-01',
  }));
  assert.equal(validate(sixSources).ok, false);
});

// R05i/R04i: поле quotes опционально (десять недель без него валидны); если
// задано — массив {criterion, text} с непустыми строками, иначе запись битая.
test('validate: quotes источника — корректная форма принимается, битая отклоняется', () => {
  const withQuotes = validSnapshot();
  withQuotes.sources[0].quotes = [
    { criterion: 'D1.1', text: 'Дословный фрагмент текста.' },
    { criterion: 'D9.3', text: 'Второй фрагмент.' },
  ];
  withQuotes.drivers[0].sources[0].quotes = [{ criterion: 'D2.3', text: 'Цитата в источнике драйвера.' }];
  assert.deepEqual(validate(withQuotes), { ok: true, errors: [] });

  const broken = [
    ['не массив', 'D1.1: текст'],
    ['элемент без text', [{ criterion: 'D1.1' }]],
    ['пустой text', [{ criterion: 'D1.1', text: '' }]],
    ['text из пробелов', [{ criterion: 'D1.1', text: '   ' }]],
    ['text не строка', [{ criterion: 'D1.1', text: 5 }]],
    ['нет criterion', [{ text: 'Фрагмент.' }]],
    ['criterion не строка', [{ criterion: 7, text: 'Фрагмент.' }]],
    ['null', null],
  ];
  for (const [name, value] of broken) {
    const snap = validSnapshot();
    snap.sources[0].quotes = value;
    const v = validate(snap);
    assert.equal(v.ok, false, name);
    assert.ok(v.errors.some((e) => e.includes('sources')), `${name}: ${v.errors.join('; ')}`);
  }
});

test('validate: драйверов ровно 3 (контракт снапшота drivers[3])', () => {  const twoDrivers = validSnapshot();
  twoDrivers.drivers = twoDrivers.drivers.slice(0, 2);
  const v1 = validate(twoDrivers);
  assert.equal(v1.ok, false);
  assert.ok(v1.errors.some((e) => e.includes('drivers')));

  const fourDrivers = validSnapshot();
  fourDrivers.drivers = [...fourDrivers.drivers, ...fourDrivers.drivers.slice(0, 1)];
  assert.equal(validate(fourDrivers).ok, false);
});

// --- week()/latest()/listWeeks() поверх window.CI_DATA ---
function setCiData(snapshots, latestKey) {
  globalThis.window = { CI_DATA: { snapshots, latest: latestKey } };
}

test('week: возвращает снапшот по дате и latest по умолчанию', () => {
  const s = validSnapshot();
  setCiData({ '2026-09-13': s }, '2026-09-13');
  assert.equal(latest(), '2026-09-13');
  assert.equal(week().global.index, 72);
  assert.equal(week('2026-09-13').published, '2026-09-13');
  assert.deepEqual(listWeeks(), ['2026-09-13']);
  delete globalThis.window;
});

test('week: битый или отсутствующий снапшот → Model unavailable, не падение', () => {
  const broken = validSnapshot();
  delete broken.global;
  setCiData({ '2026-09-13': broken }, '2026-09-13');
  const w = week();
  assert.equal(w.dataState, 'unavailable');
  assert.equal(w.unavailable, true);
  assert.ok(Array.isArray(w.errors) && w.errors.length > 0);
  assert.equal(week('2026-01-01').dataState, 'unavailable');
  delete globalThis.window;

  delete globalThis.window;
  globalThis.window = {};
  assert.equal(week().dataState, 'unavailable');
  delete globalThis.window;
});

// --- insufficient-снапшоты (таск 05): global:null, q/coverage/confidence/preview/recalc ---

function insufficientSnapshot() {
  const s = validSnapshot();
  s.dataState = 'insufficient';
  s.global = null;
  s.q = 0.1815;
  s.nullWeight = 0.8185;
  s.coverage = { coveredDrivers: 1, totalDrivers: 9 };
  s.confidence = 'none';
  s.preview = { index: 57, internal: 0.402 };
  s.recalc = {
    at: '2026-09-21T12:00:00.000Z',
    reason: 'Покрытие 5/45 критериев — ниже порога публикации',
    previous: 57,
    methodologyBefore: '1.0',
    methodologyAfter: '1.0',
    approvedBy: 'Editor-in-Chief',
  };
  return s;
}

test('validate: insufficient-снапшот (global:null + q/nullWeight/coverage/preview/recalc) валиден', () => {
  const v = validate(insufficientSnapshot());
  assert.deepEqual(v.errors, []);
  assert.equal(v.ok, true);
});

test('validate: global:null при published — ошибка; global при insufficient — ошибка', () => {
  const publishedNull = validSnapshot();
  publishedNull.global = null;
  const v1 = validate(publishedNull);
  assert.equal(v1.ok, false);
  assert.ok(v1.errors.some((e) => e.includes('global')));

  const insufficientWithNumber = insufficientSnapshot();
  insufficientWithNumber.global = { index: 57, delta: -1 };
  const v2 = validate(insufficientWithNumber);
  assert.equal(v2.ok, false);
});

test('validate: insufficient без preview/q/coverage/confidence — ошибка', () => {
  const noPreview = insufficientSnapshot();
  delete noPreview.preview;
  assert.equal(validate(noPreview).ok, false);

  const noQ = insufficientSnapshot();
  delete noQ.q;
  assert.equal(validate(noQ).ok, false);

  const wrongConfidence = insufficientSnapshot();
  wrongConfidence.confidence = 'full';
  assert.equal(validate(wrongConfidence).ok, false);

  const badCoverage = insufficientSnapshot();
  badCoverage.coverage = { coveredDrivers: -1, totalDrivers: 9 };
  assert.equal(validate(badCoverage).ok, false);
});

// --- coverageCriteria (таск 01, R05/R06/R18/R22i): опциональное поле quality-блока ---

test('validate: coverageCriteria принимается опционально; битые формы отклоняются', () => {
  // Поле задано корректно — валидно; covered ровно total допустимо.
  const good = validSnapshot();
  good.coverageCriteria = { covered: 31, total: 46 };
  assert.deepEqual(validate(good).errors, []);

  const full = validSnapshot();
  full.coverageCriteria = { covered: 46, total: 46 };
  assert.equal(validate(full).ok, true);

  // ADR 0045: uncovered опционален, но если есть — длина ровно total − covered,
  // id только из 46, без дублей.
  const withIds = validSnapshot();
  withIds.coverageCriteria = { covered: 44, total: 46, uncovered: ['D1.2', 'D5.2'] };
  assert.deepEqual(validate(withIds).errors, []);

  const allCovered = validSnapshot();
  allCovered.coverageCriteria = { covered: 46, total: 46, uncovered: [] };
  assert.deepEqual(validate(allCovered).errors, []);

  // Поле отсутствует — старые недели остаются валидными.
  const absent = validSnapshot();
  assert.equal(validate(absent).ok, true);

  // Битые формы — по одной.
  const cases = [
    { name: 'не объект', value: 31 },
    { name: 'массив', value: [] },
    { name: 'covered не целое', value: { covered: 3.5, total: 46 } },
    { name: 'covered отрицательный', value: { covered: -1, total: 46 } },
    { name: 'total === 0', value: { covered: 0, total: 0 } },
    { name: 'total отрицательный', value: { covered: 1, total: -5 } },
    { name: 'covered > total', value: { covered: 47, total: 46 } },
    { name: 'нет total', value: { covered: 3 } },
    { name: 'нет covered', value: { total: 46 } },
    { name: 'uncovered не массив', value: { covered: 44, total: 46, uncovered: 'D1.2' } },
    { name: 'uncovered неизвестный id', value: { covered: 44, total: 46, uncovered: ['D1.2', 'D99.9'] } },
    { name: 'uncovered дубль', value: { covered: 44, total: 46, uncovered: ['D1.2', 'D1.2'] } },
    { name: 'uncovered длина не та', value: { covered: 44, total: 46, uncovered: ['D1.2'] } },
    { name: 'uncovered не строка', value: { covered: 44, total: 46, uncovered: ['D1.2', 7] } },
  ];
  for (const c of cases) {
    const s = validSnapshot();
    s.coverageCriteria = c.value;
    const v = validate(s);
    assert.equal(v.ok, false, `должна отклониться форма: ${c.name}`);
    assert.ok(v.errors.some((e) => e.includes('coverageCriteria')), `ошибка должна упоминать coverageCriteria: ${c.name}`);
  }
});

test('renderGlobal: сериализует s.coverageCriteria только когда поле задано', () => {
  const snap = { published: '2026-09-13', methodology: '1.0' };
  const baseMeta = {
    dataState: 'published', q: 1, nullWeight: 0,
    coverage: { coveredDrivers: 9, totalDrivers: 9 }, confidence: 'full',
    recalc: { at: '2026-09-14T00:00:00.000Z', reason: 'r' },
  };
  const withCriteria = renderGlobal('2026-09-13', snap, { index: 43, delta: 1 }, {
    ...baseMeta, coverageCriteria: { covered: 31, total: 46 },
  });
  assert.ok(withCriteria.includes('s.coverageCriteria'), withCriteria);
  assert.ok(withCriteria.includes('"covered": 31'), withCriteria);
  assert.ok(withCriteria.includes('"total": 46'), withCriteria);

  const without = renderGlobal('2026-09-13', snap, { index: 43, delta: 1 }, baseMeta);
  assert.ok(!without.includes('s.coverageCriteria'), without);
});

// --- precursor (R07, R12, R13): опциональный публичный слой Д9 ---

test('validate: precursor принимается опционально; битые формы отклоняются', () => {
  const good = validSnapshot();
  good.precursor = { value: 42, signalingSubgroups: 3 };
  assert.deepEqual(validate(good).errors, []);

  // Границы целых 0..100 и 0..8 допустимы.
  const bounds = validSnapshot();
  bounds.precursor = { value: 0, signalingSubgroups: 0 };
  assert.equal(validate(bounds).ok, true);
  const upper = validSnapshot();
  upper.precursor = { value: 100, signalingSubgroups: 8 };
  assert.equal(validate(upper).ok, true);

  // Лишние ключи игнорируются — форма валидна.
  const extra = validSnapshot();
  extra.precursor = { value: 7, signalingSubgroups: 1, note: 'x' };
  assert.equal(validate(extra).ok, true);

  // Отсутствие поля — старые недели валидны (08-30…10-18 задним числом не трогаем).
  assert.equal(validate(validSnapshot()).ok, true);

  const cases = [
    { name: 'не объект', value: 42 },
    { name: 'массив', value: [] },
    { name: 'null', value: null },
    { name: 'value не целое', value: { value: 42.5, signalingSubgroups: 3 } },
    { name: 'value отрицательный', value: { value: -1, signalingSubgroups: 3 } },
    { name: 'value > 100', value: { value: 101, signalingSubgroups: 3 } },
    { name: 'нет value', value: { signalingSubgroups: 3 } },
    { name: 'signalingSubgroups не целое', value: { value: 42, signalingSubgroups: 2.5 } },
    { name: 'signalingSubgroups отрицательный', value: { value: 42, signalingSubgroups: -1 } },
    { name: 'signalingSubgroups > 8', value: { value: 42, signalingSubgroups: 9 } },
    { name: 'нет signalingSubgroups', value: { value: 42 } },
    { name: 'value строкой', value: { value: '42', signalingSubgroups: 3 } },
  ];
  for (const c of cases) {
    const s = validSnapshot();
    s.precursor = c.value;
    const v = validate(s);
    assert.equal(v.ok, false, `должна отклониться форма: ${c.name}`);
    assert.ok(v.errors.some((e) => e.includes('precursor')), `ошибка должна упоминать precursor: ${c.name}`);
  }
});

test('validate: trend точки с methodology валидны; value:null только с methodology', () => {
  const withMethodology = validSnapshot();
  withMethodology.trend = withMethodology.trend.map((p, i) =>
    i < 6 ? p : { date: p.date, value: p.value, methodology: '1.0' },
  );
  assert.equal(validate(withMethodology).ok, true);

  const nullValue = validSnapshot();
  nullValue.trend = nullValue.trend.map((p, i) =>
    i < 6 ? p : { date: p.date, value: null, methodology: '1.0' },
  );
  assert.equal(validate(nullValue).ok, true);

  const bareNull = validSnapshot();
  bareNull.trend = bareNull.trend.map((p, i) => (i < 6 ? p : { date: p.date, value: null }));
  const v = validate(bareNull);
  assert.equal(v.ok, false);
  assert.ok(v.errors.some((e) => e.includes('trend')));
});

test('week: insufficient-снапшот отдаётся как есть, не unavailable', () => {
  setCiData({ '2026-09-13': insufficientSnapshot() }, '2026-09-13');
  const w = week();
  assert.equal(w.dataState, 'insufficient');
  assert.equal(w.unavailable, undefined);
  assert.equal(w.global, null);
  assert.equal(w.preview.index, 57);
  delete globalThis.window;
});

// --- Дисковые снапшоты: демо-история валидна прежней формой, пересчитанные недели — published ---
function loadFullSnapshot(date) {
  const snap = {};
  for (const file of ['global', 'regions', 'trend', 'drivers', 'sources']) {
    const part = loadSnapshotPart(date, file);
    if (!part) continue;
    if (file === 'global') {
      // global.js — скалярные поля снапшота + global; плейсхолдер regions:{}
      // из песочницы vm не переносим.
      const { regions, ...scalars } = part;
      Object.assign(snap, scalars);
    } else {
      snap[file] = part[file];
    }
  }
  return snap;
}

test('диск: демо-неделя 2026-08-23 валидна прежней формой', () => {
  const v = validate(loadFullSnapshot('2026-08-23'));
  assert.deepEqual(v.errors, []);
  assert.equal(v.ok, true);
});

// coverageCriteria — опциональное поле (ADR 0033): демо-недели 1.0 записаны без
// него и обязаны остаться валидными; недели цепочки 4.0 его несут (ADR 0045).
test('диск: демо-недели 1.0 без coverageCriteria по-прежнему проходят validate', () => {
  const WEEKS = ['2026-08-02', '2026-08-09', '2026-08-16', '2026-08-23'];
  for (const w of WEEKS) {
    const v = validate(loadFullSnapshot(w));
    assert.deepEqual(v.errors, [], `${w}: ${v.errors.join('; ')}`);
    assert.equal(v.ok, true, w);
  }
});

test('диск: пересчитанная 2026-09-13 несёт coverageCriteria {covered,total,uncovered} (ADR 0045)', () => {
  const snap = loadFullSnapshot('2026-09-13');
  assert.ok(snap.coverageCriteria && typeof snap.coverageCriteria.covered === 'number');
  assert.equal(snap.coverageCriteria.total, 46);
  assert.ok(Array.isArray(snap.coverageCriteria.uncovered));
});

test('диск: пересчитанная 2026-09-13 — published с полным покрытием', () => {
  const snap = loadFullSnapshot('2026-09-13');
  const v = validate(snap);
  assert.deepEqual(v.errors, []);
  assert.equal(snap.dataState, 'published');
  assert.equal(snap.global.index, 43);
  assert.equal(snap.global.delta, 1);
  assert.equal(snap.confidence, 'full');
  assert.equal(snap.q, 1);
  assert.equal(snap.nullWeight, 0);
  assert.equal(snap.through, '2026-09-13');
  assert.equal(snap.published, '2026-09-13');
  assert.ok(snap.recalc && typeof snap.recalc.reason === 'string');
  const recalcPoints = snap.trend.filter((p) => p.date >= '2026-08-30');
  assert.ok(recalcPoints.length > 0 && recalcPoints.every((p) => typeof p.value === 'number' && p.methodology === '4.0'));
  // Точка собственной недели обязана нести версию записываемого снапшота
  // (регресс-защита: до-записная версия с диска отсекала бы её в
  // selectMethodology → дыра в серии 4.0).
  const own = snap.trend[snap.trend.length - 1];
  assert.equal(own.date, '2026-09-13');
  assert.equal(own.methodology, '4.0');
});

// --- История 15 (R19): литеральный пин глобальных чисел 11 недель ---
// Ожидания 08-30…11-01 — таблица «Результат пересчёта» из docs/calibration-journal.md
// (прогон перехода на 4.0); 11-08 — воспроизводимый результат прогона
// `node calc/calc.js 2026-11-08` (строки в журнале нет: журнал фиксирует пересчёт
// 4.0, а не добавление недели). Пин — литералы, а не пересчёт тем же кодом:
// сравнение пересчёта с диском, пересобранным тем же прогоном, ничего не
// доказывает. Расхождение любого числа — стоп и отчёт оркестратору, а не
// «актуализировать пин».
const CHAIN_GLOBAL_PIN = [
  // [неделя, index, delta, q, dataState]
  ['2026-08-30', 51, -10, 1, 'published'],
  ['2026-09-06', 42, -9, 1, 'published'],
  ['2026-09-13', 43, 1, 1, 'published'],
  ['2026-09-20', 56, 13, 1, 'published'],
  ['2026-09-27', 47, -9, 0.9071, 'published'],
  ['2026-10-04', 46, -1, 0.9293, 'published'],
  ['2026-10-11', 56, 10, 0.8622, 'published'],
  ['2026-10-18', 64, 8, 1, 'published'],
  ['2026-10-25', 68, 4, 1, 'published'],
  ['2026-11-01', 72, 4, 1, 'published'],
  ['2026-11-08', 69, -3, 1, 'published'],
];

test('диск: глобальные числа 11 недель цепочки 08-30…11-08 — литеральный пин', () => {
  assert.equal(CHAIN_GLOBAL_PIN.length, 11, 'цепочка 4.0 — одиннадцать недель');
  for (const [week, index, delta, q, dataState] of CHAIN_GLOBAL_PIN) {
    const snap = loadFullSnapshot(week);
    assert.equal(snap.methodology, '4.0', `${week}: методология недели`);
    assert.equal(snap.global.index, index, `${week}: index`);
    assert.equal(snap.global.delta, delta, `${week}: delta`);
    assert.equal(snap.q, q, `${week}: q`);
    assert.equal(snap.through, week, `${week}: through — дата самой недели`);
    assert.equal(snap.dataState, dataState, `${week}: dataState`);
    // Глобальный слой остаётся целым (дробная точность — только у регионов/стран).
    assert.ok(Number.isInteger(snap.global.index), `${week}: индекс глобала целый`);
    assert.ok(Number.isInteger(snap.global.delta), `${week}: дельта глобала целая`);
  }
});

// Пин регионального охвата africa/south-asia после пересчёта под источники
// (прогон africa-asia-sources). Ожидание — из спецификации прогона:
// africa покрыт во всех 7 неделях цепочки, south-asia — в 08-30, 09-06,
// 09-27, 10-04; остальные недели south-asia честно слепые. Покрытый регион
// (background:false) считается по своим сигналам; слепой несёт глобальный фон.
// Совпадение пары {index, delta} с глобальной у покрытого региона — законный
// результат, а не признак слепой ветки: после ADR 0069 (отклонение по
// драйверам) регион, чьи сигналы покрывают все покрытые критерии драйвера,
// получает вклад 0 и стоит на глобальном фоне. Пин проверяет флаги, числовые
// значения и регрессионный якорь 09-20/africa.
test('диск: africa/south-asia — background по неделям цепочки, покрытые считаются по сигналам', () => {
  const WEEKS = ['2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20', '2026-09-27', '2026-10-04', '2026-10-11'];
  const covered = {
    africa: new Set(WEEKS),
    'south-asia': new Set(['2026-08-30', '2026-09-06', '2026-09-27', '2026-10-04']),
  };
  let differing = 0;
  let coveredCount = 0;
  for (const w of WEEKS) {
    const regions = loadSnapshotPart(w, 'regions');
    const global = loadSnapshotPart(w, 'global').global;
    for (const id of ['africa', 'south-asia']) {
      const r = regions.regions[id];
      const isCovered = covered[id].has(w);
      assert.equal(r.background, !isCovered, `${w}/${id}: background`);
      assert.equal(typeof r.index, 'number', `${w}/${id}: индекс региона — число`);
      assert.equal(typeof r.delta, 'number', `${w}/${id}: изменение региона — число`);
      if (isCovered) {
        coveredCount += 1;
        if (r.index !== global.index || r.delta !== global.delta) differing += 1;
      }
    }
  }
  // Регрессионный якорь после пересчёта 4.0 (ADR 0069): 09-20/africa = 55.9
  // (+13.1) против глобальных 56 (+13) — один сигнал, вклад мал, округление
  // одна десятичная.
  const anchor = loadSnapshotPart('2026-09-20', 'regions').regions.africa;
  assert.equal(anchor.index, 55.9);
  assert.equal(anchor.delta, 13.1);
  assert.equal(anchor.background, false);
  assert.equal(anchor.signals, 1);
  // Почти все покрытые регион-недели отходят от глобального фона; единичные
  // совпадения — округление малого отклонения (см. комментарий выше).
  assert.ok(differing >= coveredCount - 2, `совпало с фоном: ${coveredCount - differing} из ${coveredCount}`);
});
