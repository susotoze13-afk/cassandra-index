// Миграция источников на схему R55 (таск 09): все демо-снапшоты несут
// источники новой схемы (9 обязательных полей), контракт validate принимает
// мигрированные снапшоты целиком, легаси-поле date у источников отсутствует.
// Загрузка снапшотов — как на сайте: файлы data/<week>/*.js кладут данные в
// window.CI_DATA; подсаживаем window и импортируем как CJS.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate } from '../js/data.js';

const WEEKS = ['2026-08-02', '2026-08-09', '2026-08-16', '2026-08-23',
  '2026-08-30', '2026-09-06', '2026-09-13'];
const PARTS = ['global', 'regions', 'region-europe', 'region-east-asia',
  'region-middle-east', 'region-north-america', 'region-south-asia',
  'region-africa', 'trend', 'drivers', 'sources'];

globalThis.window = globalThis;
for (const week of WEEKS) {
  for (const part of PARTS) {
    await import(`../data/${week}/${part}.js`);
  }
}

const snapshots = globalThis.CI_DATA?.snapshots ?? {};

const REQUIRED = [
  ['id', (v) => typeof v === 'string' && v.length > 0],
  ['title', (v) => v && typeof v.ru === 'string' && typeof v.en === 'string'],
  ['domain', (v) => typeof v === 'string' && v.length > 0],
  ['url', (v) => typeof v === 'string' && v.startsWith('https://')],
  ['publication_date', (v) => /^\d{4}-\d{2}-\d{2}$/.test(v ?? '')],
  ['accessed_date', (v) => /^\d{4}-\d{2}-\d{2}$/.test(v ?? '')],
  ['source_type', (v) => ['primary', 'secondary', 'OSINT'].includes(v)],
  ['cluster_id', (v) => typeof v === 'string' && v.length > 0],
  ['state_affiliated', (v) => typeof v === 'boolean'],
];

function* allSources(week) {
  const snap = snapshots[week];
  yield* (snap.sources ?? []);
  for (const drv of (snap.drivers ?? [])) yield* (drv.sources ?? []);
}

// R55/миграция: источники sources.js и drivers.js всех демо-недель — новая схема.
test('мигрированные источники: 9 обязательных полей новой схемы, легаси date удалено', () => {
  let count = 0;
  for (const week of WEEKS) {
    assert.ok(snapshots[week], `снапшот ${week} не загрузился`);
    for (const src of allSources(week)) {
      count++;
      for (const [field, ok] of REQUIRED) {
        assert.ok(ok(src[field]), `${week}: ${src.url ?? src.id} — поле ${field}`);
      }
      assert.equal(src.date, undefined, `${week}: ${src.id} — легаси-поле date не удалено`);
    }
  }
  assert.ok(count >= 60, `ожидали демо-источники, нашли ${count}`);
});

// Контракт снапшота принимает мигрированные недели целиком (источники —
// по новой ветке isSource с полным набором полей).
test('validate: все мигрированные демо-снапшоты валидны', () => {
  for (const week of WEEKS) {
    const v = validate(snapshots[week]);
    assert.deepEqual(v.errors, [], `${week}: ${v.errors.join('; ')}`);
    assert.equal(v.ok, true);
  }
});

// Строгость контракта на новой схеме: полная запись без обязательного поля
// (cluster_id) отклоняется — иначе миграция не проверяется на полноту.
test('validate: запись новой схемы без cluster_id отклоняется', () => {
  const base = {
    published: '2026-09-13', through: '2026-09-06', methodology: '2.0',
    dataState: 'published', global: { index: 60, delta: -1 },
    trend: Array.from({ length: 12 }, (_, i) => ({ date: `2026-06-${String(22 + i).padStart(2, '0')}`, value: 50 + i })),
    regions: Object.fromEntries(['europe', 'east-asia', 'middle-east', 'north-america', 'south-asia', 'africa']
      .map((id) => [id, { index: 50, delta: 0 }])),
    drivers: [
      {
        observation: { ru: 'Н', en: 'O' }, why: { ru: 'В', en: 'W' },
        contribution: 'high', confidence: 'high',
        sources: [
          {
            id: 'x', title: { ru: 'Т', en: 'T' }, domain: 'example.com',
            url: 'https://example.com/a', publication_date: '2026-09-01',
            accessed_date: '2026-09-06', source_type: 'secondary',
            state_affiliated: false, // cluster_id намеренно отсутствует
          },
          { title: { ru: 'Т2', en: 'T2' }, url: 'https://b.example/b', domain: 'b.example', date: '2026-09-02' },
        ],
      },
      {
        observation: { ru: 'Н', en: 'O' }, why: { ru: 'В', en: 'W' },
        contribution: 'low', confidence: 'high',
        sources: [
          { title: { ru: 'Т3', en: 'T3' }, url: 'https://c.example/c', domain: 'c.example', date: '2026-09-01' },
          { title: { ru: 'Т4', en: 'T4' }, url: 'https://d.example/d', domain: 'd.example', date: '2026-09-02' },
        ],
      },
      {
        observation: { ru: 'Н', en: 'O' }, why: { ru: 'В', en: 'W' },
        contribution: 'low', confidence: 'high',
        sources: [
          { title: { ru: 'Т5', en: 'T5' }, url: 'https://e.example/e', domain: 'e.example', date: '2026-09-01' },
          { title: { ru: 'Т6', en: 'T6' }, url: 'https://f.example/f', domain: 'f.example', date: '2026-09-02' },
        ],
      },
    ],
    sources: [],
  };
  const v = validate(base);
  assert.equal(v.ok, false);
  assert.ok(v.errors.some((e) => e.includes('drivers[0].sources')));
});
