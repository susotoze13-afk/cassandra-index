// Публичный API-контракт (ADR 0062): справочники, понедельные файлы, схемы и
// числовая развёртка «почему индекс такой». Тесты идут через чистые швы
// calc/contributions.js и calc/public-contract.js; валидатор схем — минимальный
// (только используемые ключевые слова draft 2020-12), без зависимостей.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

import {
  DRIVER_IDS,
  analyseWeek,
  buildWaterfall,
  criteriaShares,
  driverBreakdown,
  topCriteria,
  whatWouldChange,
} from '../calc/contributions.js';
import {
  criteriaDoc,
  methodologyDoc,
  regionsDoc,
  schemaDocs,
  weekDoc,
} from '../calc/public-contract.js';
import { buildDrivers, aggregateDrivers, CRITERIA } from '../calc/engine.js';
import { PARAMS } from '../calc/params.js';
import { regionIdsFor } from '../js/data.js';
import {
  datasetOf,
  loadAnalysisFromDisk,
  loadSnapshotFromDisk,
} from '../calc/public-export.js';
import { readLatestWeeks } from '../calc/prepare-week.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const LATEST_SRC = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
const { weeks: WEEKS } = readLatestWeeks(LATEST_SRC);
const LAST = WEEKS[WEEKS.length - 1];
const PREV = WEEKS[WEEKS.length - 2];

const readInput = (week) => JSON.parse(
  readFileSync(path.join(ROOT, 'calc', 'input', `${week}.json`), 'utf8'),
);
const readPublic = (rel) => JSON.parse(
  readFileSync(path.join(ROOT, 'data', 'public', rel), 'utf8'),
);

// --- Справочники ---

test('regionsDoc: обе таксономии, порядок id совпадает с js/data.js', () => {
  const doc = regionsDoc();
  assert.equal(doc.taxonomy_version, '2.0');
  assert.equal(doc.current, '2.0');
  assert.equal(doc.taxonomy_v2_from, PARAMS.taxonomyV2From);
  assert.deepEqual(doc.taxonomies['1.0'].map((r) => r.id), regionIdsFor('1.0'));
  assert.deepEqual(doc.taxonomies['2.0'].map((r) => r.id), regionIdsFor('2.0'));
  assert.equal(doc.taxonomies['1.0'].length, 6);
  assert.equal(doc.taxonomies['2.0'].length, 12);
  for (const r of doc.taxonomies['2.0']) {
    assert.ok(r.name.ru && r.name.en, `${r.id}: нет названий`);
    assert.ok(Array.isArray(r.countries), `${r.id}: countries не массив`);
    for (const iso of r.countries) assert.match(iso, /^[A-Z]{2}$/);
  }
  const rb = doc.taxonomies['2.0'].find((r) => r.id === 'russia-belarus');
  assert.deepEqual(rb.countries, ['RU', 'BY']);
  assert.equal(rb.admin_center.city.ru, 'Москва');
  assert.equal(rb.admin_center.iso3166_2, 'RU-MOW');
});

test('criteriaDoc: 46 критериев в порядке движка, 9 драйверов, шкалы и направления', () => {
  const doc = criteriaDoc();
  assert.equal(doc.schema, 'cassandra-index-criteria');
  assert.equal(doc.methodology, PARAMS.methodology);
  assert.equal(doc.criteria_count, 46);
  assert.deepEqual(doc.criteria.map((c) => c.id), Object.keys(CRITERIA));
  assert.deepEqual(doc.drivers.map((d) => d.id), DRIVER_IDS);
  for (const c of doc.criteria) {
    assert.equal(c.driver, CRITERIA[c.id].driver, c.id);
    assert.equal(c.scale, CRITERIA[c.id].scale, c.id);
    assert.equal(c.dir, CRITERIA[c.id].dir, c.id);
    assert.ok(c.name.ru && c.name.en, `${c.id}: нет названия`);
    assert.ok(c.description.ru && c.description.en, `${c.id}: нет описания`);
  }
});

test('methodologyDoc: версия, веса (сумма 1), параметры и шкала состояний', () => {
  const doc = methodologyDoc();
  assert.equal(doc.schema, 'cassandra-index-methodology');
  assert.equal(doc.methodology, PARAMS.methodology);
  assert.match(doc.project_version, /^\d+\.\d+\.\d+$/);
  assert.equal(doc.criteria_count, 46);
  assert.equal(doc.drivers_count, 9);
  assert.deepEqual(doc.weights, PARAMS.weights);
  const sum = Object.values(doc.weights).reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sum - 1) < 1e-9, 'сумма весов не 1');
  assert.equal(doc.parameters.k, PARAMS.k);
  assert.equal(doc.parameters.alpha, PARAMS.alpha);
  assert.equal(doc.state_scale.length, 6);
  assert.deepEqual(doc.state_scale[0], { id: 'calm', min: 0, max: 20 });
  assert.deepEqual(doc.state_scale[5], { id: 'extreme', min: 97, max: 100 });
});

// --- Развёртка драйверов ---

test('driverBreakdown: сумма contribution_pp равна индексу, top-3 внутри драйвера', () => {
  const input = readInput(LAST);
  const drivers = buildDrivers(input, PARAMS);
  const agg = aggregateDrivers(drivers, PARAMS, {});
  const items = driverBreakdown(drivers, agg, 64, PARAMS);
  assert.equal(items.length, 9);
  assert.deepEqual(items.map((d) => d.id), DRIVER_IDS);
  const sum = items.reduce((acc, d) => acc + d.contribution_pp, 0);
  // 0.1 в double не точно: сумма равна индексу с точностью до 1e-9.
  assert.ok(Math.abs(sum - 64) < 1e-9, 'сумма вкладов должна равняться published index');
  for (const d of items) {
    assert.ok(d.contribution_pp >= -64 && d.contribution_pp <= 64, d.id);
    assert.ok(d.top_criteria.length <= 3, `${d.id}: больше трёх критериев`);
    for (const c of d.top_criteria) {
      assert.ok(c.id.startsWith(`${d.id}.`), `${d.id}: чужой критерий ${c.id}`);
      assert.ok(c.value >= 0 && c.value <= 1, `${c.id}: value вне 0..1`);
      assert.ok(Math.abs(c.share) <= 1, `${c.id}: share вне -1..1`);
    }
  }
  // Д8 — деэскалация: вклад не положительный.
  const d8 = items.find((d) => d.id === 'D8');
  assert.ok(d8.contribution_pp <= 0, 'Д8 не может увеличивать индекс');
});

test('topCriteria: |share| внутри драйвера суммируется в 1', () => {
  const input = readInput(LAST);
  for (const driver of buildDrivers(input, PARAMS)) {
    const shares = criteriaShares(driver, PARAMS);
    const total = shares.reduce((acc, s) => acc + Math.abs(s.contribution), 0);
    if (total === 0) continue;
    const top = topCriteria(driver, PARAMS);
    const topTotal = shares
      .filter((s) => top.some((t) => t.id === s.id))
      .reduce((acc, s) => acc + Math.abs(s.contribution) / total, 0);
    const expected = shares
      .filter((s) => Math.abs(s.contribution) > 0)
      .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution) || a.id.localeCompare(b.id))
      .slice(0, 3)
      .reduce((acc, s) => acc + Math.abs(s.contribution) / total, 0);
    assert.ok(Math.abs(topTotal - expected) < 1e-9, driver.id);
  }
});

test('analyseWeek: null-индекс не выдаёт нулевую развёртку за расчёт', () => {
  const out = analyseWeek(readInput(LAST), PARAMS, null);
  assert.deepEqual(out, { driver_breakdown: [], what_would_change: null });
});

// --- Водопад ---

test('waterfall: девять шагов, identity steps + residual = published delta', () => {
  const wf = buildWaterfall({
    current: readInput(LAST),
    previous: readInput(PREV),
    currentIndex: 64,
    previousIndex: 56,
    params: PARAMS,
  });
  assert.equal(wf.steps.length, 9);
  assert.deepEqual(wf.steps.map((s) => s.driver), DRIVER_IDS);
  const stepsSum = wf.steps.reduce((acc, s) => acc + s.contribution_pp, 0);
  assert.ok(Math.abs(stepsSum + wf.residual_pp - 8) < 1e-9,
    `steps ${stepsSum} + residual ${wf.residual_pp} != 8`);
  assert.equal(wf.residual_reason, 'saturation-inertia-coverage-rounding');
  assert.deepEqual(wf.from, { week: PREV, index: 56 });
  assert.deepEqual(wf.to, { week: LAST, index: 64 });
});

test('waterfall: без входа прошлой недели или через границу версий — null', () => {
  const cur = readInput(LAST);
  assert.equal(buildWaterfall({
    current: cur, previous: null, currentIndex: 64, previousIndex: 56, params: PARAMS,
  }), null);
  assert.equal(buildWaterfall({
    current: cur, previous: readInput(PREV), currentIndex: null, previousIndex: 56, params: PARAMS,
  }), null);
});

// --- «Что бы изменило оценку» ---

test('whatWouldChange: ближайшие пороги, до трёх критериев, знак effect = знак impact', () => {
  const out = whatWouldChange(readInput(LAST), PARAMS, 64);
  assert.equal(out.state, 'very');
  assert.deepEqual(out.thresholds.down, { state: 'danger', index: 61, gap_pp: -3 });
  assert.deepEqual(out.thresholds.up, { state: 'critical', index: 81, gap_pp: 17 });
  assert.equal(out.method, 'criterion-zeroed');
  assert.ok(out.criteria.length >= 2 && out.criteria.length <= 3);
  for (const c of out.criteria) {
    assert.ok(CRITERIA[c.id], `${c.id}: критерия нет в движке`);
    assert.equal(c.effect, c.impact_pp > 0 ? 'up' : 'down');
    assert.equal(typeof c.crosses_state, 'boolean');
    assert.equal(typeof c.breaks_driver, 'boolean');
  }
  const impacts = out.criteria.map((c) => Math.abs(c.impact_pp));
  assert.deepEqual(impacts, impacts.slice().sort((a, b) => b - a), 'не отсортировано по плечу');
});

test('whatWouldChange: на границе шкалы отсутствующая сторона = null', () => {
  const out = whatWouldChange(readInput(LAST), PARAMS, 100);
  assert.equal(out.state, 'extreme');
  assert.equal(out.thresholds.up, null);
  assert.deepEqual(out.thresholds.down, { state: 'critical', index: 97, gap_pp: -3 });
});

// --- Схемы и файлы на диске ---

function typeOf(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  if (typeof v === 'number' && Number.isInteger(v)) return 'integer';
  return typeof v;
}

function resolveRef(ref, name, schemas) {
  const [file, frag] = ref.split('#');
  const docName = file || name;
  const doc = schemas[docName];
  assert.ok(doc, `неизвестная схема в $ref: ${ref}`);
  if (!frag) return { schema: doc, name: docName };
  let node = doc;
  for (const part of frag.split('/').filter(Boolean)) {
    node = node[part.replace(/~1/g, '/').replace(/~0/g, '~')];
  }
  assert.ok(node, `неизвестный фрагмент $ref: ${ref}`);
  return { schema: node, name: docName };
}

function validateNode(data, schema, name, schemas, at = '$') {
  const errors = [];
  if (schema.$ref) {
    const r = resolveRef(schema.$ref, name, schemas);
    return validateNode(data, r.schema, r.name, schemas, at);
  }
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    // В JSON Schema integer — частный случай number.
    const actual = typeOf(data);
    const ok = types.includes(actual) || (actual === 'integer' && types.includes('number'));
    if (!ok) {
      errors.push(`${at}: ${actual} не ${types.join('|')}`);
      return errors;
    }
  }
  if ('const' in schema && data !== schema.const) {
    errors.push(`${at}: ${JSON.stringify(data)} != const ${JSON.stringify(schema.const)}`);
  }
  if (Array.isArray(schema.enum) && !schema.enum.includes(data)) {
    errors.push(`${at}: ${JSON.stringify(data)} вне enum`);
  }
  if (typeof data === 'number') {
    if (typeof schema.minimum === 'number' && data < schema.minimum) errors.push(`${at}: < minimum`);
    if (typeof schema.maximum === 'number' && data > schema.maximum) errors.push(`${at}: > maximum`);
  }
  if (typeof data === 'string') {
    if (typeof schema.minLength === 'number' && data.length < schema.minLength) errors.push(`${at}: короче minLength`);
    if (typeof schema.pattern === 'string' && !new RegExp(schema.pattern).test(data)) errors.push(`${at}: не по pattern`);
  }
  if (Array.isArray(data)) {
    if (typeof schema.minItems === 'number' && data.length < schema.minItems) errors.push(`${at}: меньше minItems`);
    if (typeof schema.maxItems === 'number' && data.length > schema.maxItems) errors.push(`${at}: больше maxItems`);
    if (schema.items) {
      data.forEach((item, i) => errors.push(...validateNode(item, schema.items, name, schemas, `${at}[${i}]`)));
    }
  }
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const key of Array.isArray(schema.required) ? schema.required : []) {
      if (!(key in data)) errors.push(`${at}: нет обязательного поля ${key}`);
    }
    const props = schema.properties || {};
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(data)) {
        if (!(key in props)) errors.push(`${at}: лишнее поле ${key}`);
      }
    }
    for (const [key, sub] of Object.entries(props)) {
      if (key in data) errors.push(...validateNode(data[key], sub, name, schemas, `${at}.${key}`));
    }
  }
  return errors;
}

test('схемы: каждый публичный JSON проходит свою JSON Schema', () => {
  const schemas = schemaDocs();
  const checks = [
    ['index.schema.json', readPublic('index.json')],
    ['latest.schema.json', readPublic('latest.json')],
    ['regions.schema.json', readPublic('regions.json')],
    ['criteria.schema.json', readPublic('criteria.json')],
    ['methodology.schema.json', readPublic('methodology.json')],
  ];
  for (const week of WEEKS) {
    checks.push(['week.schema.json', readPublic(`weeks/${week}.json`)]);
  }
  for (const [file, data] of checks) {
    const errors = validateNode(data, schemas[file], file, schemas);
    assert.deepEqual(errors, [], `${file}: ${errors.slice(0, 5).join('; ')}`);
  }
});

test('паритет: справочники и понедельные файлы на диске равны генераторам', () => {
  assert.deepEqual(readPublic('regions.json'), regionsDoc());
  assert.deepEqual(readPublic('criteria.json'), criteriaDoc());
  assert.deepEqual(readPublic('methodology.json'), methodologyDoc());
  const index = readPublic('index.json');
  assert.equal(index.weeks.length, WEEKS.length);
  for (const week of WEEKS) {
    const file = readPublic(`weeks/${week}.json`);
    const fromIndex = index.weeks.find((w) => w.week === week);
    assert.deepEqual(file.week, fromIndex, `${week}: weeks/<date>.json != index.json`);
    assert.deepEqual(file, weekDoc(fromIndex), `${week}: конверт недели разошёлся`);
    const expected = week >= '2026-08-30' ? 9 : 0;
    assert.equal(file.week.driver_breakdown.length, expected, `${week}: развёртка драйверов`);
  }
  for (const [name, schema] of Object.entries(schemaDocs())) {
    assert.deepEqual(readPublic(`schema/v1/${name}`), schema, `${name}: схема на диске устарела`);
  }
});

test('развёртка на диске совпадает с расчётом от калькуляционных входов', () => {
  const snap = loadSnapshotFromDisk(LAST);
  const prevSnap = loadSnapshotFromDisk(PREV);
  const analysis = loadAnalysisFromDisk(LAST, snap, prevSnap, PREV);
  const dataset = datasetOf(snap, LAST, analysis);
  const onDisk = readPublic(`weeks/${LAST}.json`).week;
  assert.deepEqual(dataset.driver_breakdown, onDisk.driver_breakdown);
  assert.deepEqual(dataset.waterfall, onDisk.waterfall);
  assert.deepEqual(dataset.what_would_change, onDisk.what_would_change);
  assert.ok(dataset.waterfall, 'водопад последней недели должен строиться');
});

test('без входа недели развёртка пустая, а не нулевая', () => {
  const snap = loadSnapshotFromDisk(LAST);
  const analysis = loadAnalysisFromDisk(LAST, snap, null, null, path.join(ROOT, 'нет-такого-корня'));
  assert.deepEqual(analysis, { driver_breakdown: [], what_would_change: null, waterfall: null });
  assert.deepEqual(datasetOf(snap, LAST).driver_breakdown, []);
});

test('демо-недели 1.0 не получают развёртку: нет входов и нет сравнимой истории', () => {
  const demo = WEEKS[0];
  const onDisk = readPublic(`weeks/${demo}.json`).week;
  assert.deepEqual(onDisk.driver_breakdown, []);
  assert.equal(onDisk.waterfall, null);
  assert.equal(onDisk.what_would_change, null);
  // Водопад через границу версий не строится даже при наличии входов.
  const firstChain = WEEKS.find((w) => readPublic(`weeks/${w}.json`).week.waterfall === null
    && readPublic(`weeks/${w}.json`).week.driver_breakdown.length > 0);
  assert.ok(firstChain, 'первая неделя цепочки должна иметь развёртку без водопада');
  assert.ok(existsSync(path.join(ROOT, 'data', 'public', 'weeks', `${firstChain}.json`)));
});
