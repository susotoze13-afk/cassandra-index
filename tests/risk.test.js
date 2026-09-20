import { test } from 'node:test';
import assert from 'node:assert/strict';
import { status, tone, deltaTone } from '../js/risk.js';

// Границы диапазонов §10: 0–20 Calm, 21–40 Tense, 41–60 Dangerous,
// 61–80 Very dangerous, 81–96 Critically dangerous, 97–100 Extreme threat
test('status: ключи на нижних и верхних границах всех шести диапазонов', () => {
  assert.equal(status(0), 'calm');
  assert.equal(status(20), 'calm');
  assert.equal(status(21), 'tense');
  assert.equal(status(40), 'tense');
  assert.equal(status(41), 'danger');
  assert.equal(status(60), 'danger');
  assert.equal(status(61), 'very');
  assert.equal(status(80), 'very');
  assert.equal(status(81), 'critical');
  assert.equal(status(96), 'critical');
  assert.equal(status(97), 'extreme');
  assert.equal(status(100), 'extreme');
  assert.equal(status(72), 'very');
});

test('status: вне шкалы и не-числа → null', () => {
  assert.equal(status(-1), null);
  assert.equal(status(101), null);
  assert.equal(status(NaN), null);
  assert.equal(status('72'), null);
});

test('tone: id состояния → токен палитры §14.4', () => {
  assert.equal(tone('calm'), '--state-calm');
  assert.equal(tone('tense'), '--state-tense');
  assert.equal(tone('danger'), '--state-danger');
  assert.equal(tone('very'), '--state-very');
  assert.equal(tone('critical'), '--state-critical');
  assert.equal(tone('extreme'), '--state-extreme');
  assert.equal(tone('unknown'), null);
});

test('deltaTone: рост → --state-very, снижение → --state-calm, ноль → --text-secondary', () => {
  assert.equal(deltaTone(6), '--state-very');
  assert.equal(deltaTone(1), '--state-very');
  assert.equal(deltaTone(-3), '--state-calm');
  assert.equal(deltaTone(-1), '--state-calm');
  assert.equal(deltaTone(0), '--text-secondary');
  assert.equal(deltaTone(NaN), null);
});
