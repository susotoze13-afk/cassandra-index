import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate, latest, week, listWeeks } from '../js/data.js';

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

test('validate: драйверов ровно 3 (контракт снапшота drivers[3])', () => {
  const twoDrivers = validSnapshot();
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
