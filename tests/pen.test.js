import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Макет pen.dev (тикет 09): инварианты формата и палитра §14.4 — статические
// проверки по дереву .pen без рендера. Ожидаемые значения — из spec.md
// «Дизайн-макет pen.dev» и PRD §14.4, а не из кода под тестом.
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const doc = JSON.parse(readFileSync(join(root, 'design', 'cassandra-index.pen'), 'utf8'));

function* walk(node) {
  yield node;
  for (const child of node.children ?? []) yield* walk(child);
}

const SCREENS = [
  { name: 'Desktop — Hero', width: 1440, height: 900 },
  { name: 'Desktop — Sections', width: 1440 },
  { name: 'Desktop — Regions', width: 1440 },
  { name: 'Mobile — Hero', width: 360, height: 640 },
];

test('документ: валидный JSON формата .pen version 2.6', () => {
  assert.equal(doc.version, '2.6');
  assert.ok(Array.isArray(doc.children));
});

test('экраны: 4 top-level фрейма с clip: true и размерами из spec', () => {
  const frames = doc.children.filter((c) => c.type === 'frame');
  assert.equal(frames.length, 4);
  for (const expected of SCREENS) {
    const frame = frames.find((f) => f.name === expected.name);
    assert.ok(frame, `фрейм «${expected.name}»`);
    assert.equal(frame.clip, true);
    assert.equal(frame.width, expected.width);
    if (expected.height) assert.equal(frame.height, expected.height);
  }
});

test('палитра §14.4 объявлена в variables документа', () => {
  const colors = Object.values(doc.variables ?? {})
    .filter((v) => v.type === 'color')
    .map((v) => String(v.value).toUpperCase());
  for (const hex of ['#0A0E12', '#E6EDF3', '#58A6FF', '#D29922', '#D17F52', '#3FB950']) {
    assert.ok(colors.includes(hex), `токен ${hex}`);
  }
});

test('инварианты раскладки: нет %, margin, baseline/stretch', () => {
  for (const node of walk(doc)) {
    assert.ok(!('margin' in node), `margin у ${node.name ?? node.id}`);
    for (const key of ['width', 'height']) {
      const value = node[key];
      assert.ok(
        typeof value !== 'string' || !value.includes('%'),
        `% в ${key} у ${node.name ?? node.id}`
      );
    }
    assert.ok(
      !node.alignItems || ['start', 'center', 'end'].includes(node.alignItems),
      `alignItems у ${node.name ?? node.id}`
    );
  }
});

test('инварианты текста: fill задан, width только с textGrowth', () => {
  for (const node of walk(doc)) {
    if (node.type !== 'text') continue;
    assert.ok(node.fill, `fill у текста «${String(node.content).slice(0, 30)}»`);
    if (node.width !== undefined) {
      assert.ok(
        ['fixed-width', 'fixed-width-height'].includes(node.textGrowth),
        `textGrowth у текста «${String(node.content).slice(0, 30)}»`
      );
    }
  }
});

test('hero (индекс 72 ≤ 80): критического красного #F85149 нет', () => {
  const hero = doc.children.find((f) => f.name === 'Desktop — Hero');
  const fills = [];
  for (const node of walk(hero)) {
    for (const f of [].concat(node.fill ?? [], node.stroke ?? [])) {
      fills.push(String(typeof f === 'object' ? f.color : f).toUpperCase());
    }
  }
  assert.ok(!fills.includes('#F85149'));
  assert.ok(!fills.includes('$STATE-CRITICAL'));
});
