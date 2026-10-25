// Страновой слой публичного API (ADR 0067): data/public/countries/<неделя>.json.
// writePublicData пишет файл только для недель, чей снапшот несёт блок countries;
// детерминизм — повторная сборка даёт те же байты. Тесты на synthetic-снапшотах
// (часть countries.js недели 2026-10-25 — зона таска 03; здесь не читается).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { countriesDoc, PUBLIC_SCHEMA_VERSION, SITE } from '../calc/public-contract.js';
import { writePublicData } from '../calc/public-export.js';

const SNAPSHOT_WITH_COUNTRIES = {
  published: '2026-10-25',
  through: '2026-10-25',
  methodology: '3.0',
  regions_taxonomy: '2.0',
  dataState: 'published',
  global: { index: 68, delta: 4 },
  q: 1,
  sensitivity: 1.1,
  countries: {
    total: 3,
    published: 2,
    rows: {
      RU: { index: 66, delta: 3, background: false, region: 'russia-belarus', signals: 2, name: { ru: 'Россия', en: 'Russia' } },
      UA: { index: 71, delta: 5, background: false, region: 'ukraine-moldova', signals: 3, name: { ru: 'Украина', en: 'Ukraine' } },
      FR: { index: 68, delta: 4, background: true, region: 'western-europe', signals: 0, name: { ru: 'Франция', en: 'France' } },
    },
  },
  trend: [],
  sources: [],
  drivers: [],
  regions: {},
};

const SNAPSHOT_WITHOUT_COUNTRIES = {
  published: '2026-10-18',
  methodology: '3.0',
  regions_taxonomy: '2.0',
  dataState: 'published',
  global: { index: 64, delta: 8 },
  q: 1,
  trend: [],
  sources: [],
  drivers: [],
  regions: {},
};

test('countriesDoc: конверт как у weekDoc, блок без name, sensitivity недели, note', () => {
  const doc = countriesDoc('2026-10-25', SNAPSHOT_WITH_COUNTRIES);
  assert.equal(doc.schema, 'cassandra-index-countries');
  assert.equal(doc.schema_version, PUBLIC_SCHEMA_VERSION);
  assert.equal(doc.site, SITE);
  assert.equal(doc.license.name, 'CC BY 4.0');
  assert.equal(doc.week, '2026-10-25');
  assert.equal(doc.methodology, '3.0');
  assert.equal(doc.countries.total, 3);
  assert.equal(doc.countries.published, 2);
  assert.deepEqual(Object.keys(doc.countries.rows).sort(), ['FR', 'RU', 'UA']);
  const ru = doc.countries.rows.RU;
  assert.deepEqual(ru, { index: 66, delta: 3, background: false, region: 'russia-belarus', signals: 2 });
  assert.ok(!('name' in ru), 'имя страны — забота справочника, в файле его нет');
  assert.equal(doc.sensitivity, 1.1);
  assert.match(doc.note, /sensitivity|чувствительност/i);
});

test('countriesDoc: без блока countries — null, sensitivity отсутствует — null', () => {
  assert.equal(countriesDoc('2026-10-18', SNAPSHOT_WITHOUT_COUNTRIES), null);
  const snap = { ...SNAPSHOT_WITH_COUNTRIES, sensitivity: undefined };
  assert.equal(countriesDoc('2026-10-25', snap).sensitivity, null);
});

function runWrite(weeks, snaps) {
  const root = mkdtempSync(path.join(tmpdir(), 'ci-countries-'));
  const { files } = writePublicData({
    rootDir: root,
    weeks,
    loadSnapshot: (w) => snaps[w],
  });
  return { root, files };
}

test('writePublicData: файл только у недель с блоком countries', () => {
  const weeks = ['2026-10-18', '2026-10-25'];
  const snaps = {
    '2026-10-18': SNAPSHOT_WITHOUT_COUNTRIES,
    '2026-10-25': SNAPSHOT_WITH_COUNTRIES,
  };
  const { root, files } = runWrite(weeks, snaps);
  const rel = files.map((f) => path.relative(root, f).split(path.sep).join('/'));
  assert.ok(rel.includes('data/public/countries/2026-10-25.json'));
  assert.ok(!rel.includes('data/public/countries/2026-10-18.json'));
  assert.ok(!existsSync(path.join(root, 'data', 'public', 'countries', '2026-10-18.json')));
  const doc = JSON.parse(readFileSync(
    path.join(root, 'data', 'public', 'countries', '2026-10-25.json'), 'utf8',
  ));
  assert.equal(doc.week, '2026-10-25');
  assert.equal(doc.countries.published, 2);
  assert.ok(!('name' in doc.countries.rows.RU));
});

test('writePublicData: страновой файл детерминирован (два прогона — те же байты)', () => {
  const weeks = ['2026-10-25'];
  const snaps = { '2026-10-25': SNAPSHOT_WITH_COUNTRIES };
  const a = runWrite(weeks, snaps);
  const b = runWrite(weeks, snaps);
  const read = (root) => readFileSync(
    path.join(root, 'data', 'public', 'countries', '2026-10-25.json'), 'utf8',
  );
  assert.equal(read(a.root), read(b.root));
  // Стабильный порядок ключей: ISO2-ключи строк в том же порядке, что во входе.
  const doc = JSON.parse(read(a.root));
  assert.deepEqual(Object.keys(doc.countries.rows), ['RU', 'UA', 'FR']);
});
