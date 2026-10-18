// forward-anchors.test.js — схема форвардного якоря (R15, R15.1, A01→R15):
// редактор фиксирует ожидание до --write. Чистый валидатор, без диска и сети.

import test from 'node:test';
import assert from 'node:assert/strict';

import { CLUSTERS, validateForwardAnchor } from '../calc/forward-anchors.js';

function valid() {
  return {
    week: '2026-10-25',
    expectedCluster: 'tense',
    rationale: 'Повышенная активность учений, но без прямых ударов',
    author: 'editor',
    committedAt: '2026-10-20T09:00:00Z',
    sources: [{ url: 'https://example.com/a' }, { url: 'https://example.org/b' }],
  };
}

test('CLUSTERS: шесть состояний js/risk.js плюс unknown', () => {
  assert.deepEqual(CLUSTERS, ['calm', 'tense', 'danger', 'very', 'critical', 'extreme', 'unknown']);
  assert.equal(CLUSTERS.length, 7);
});

test('validateForwardAnchor: корректный файл принимается, пустой sources допустим', () => {
  assert.deepEqual(validateForwardAnchor(valid()), []);

  const emptySources = valid();
  emptySources.sources = [];
  assert.deepEqual(validateForwardAnchor(emptySources), []);

  const isoDateOnly = valid();
  isoDateOnly.committedAt = '2026-10-20';
  assert.deepEqual(validateForwardAnchor(isoDateOnly), []);
});

test('validateForwardAnchor: не объект и пустой объект — ошибки', () => {
  assert.ok(validateForwardAnchor(null).length > 0);
  assert.ok(validateForwardAnchor([]).length > 0);
  assert.ok(validateForwardAnchor('2026-10-25').length > 0);
  assert.ok(validateForwardAnchor({}).length > 0);
});

test('validateForwardAnchor: битая дата week и committedAt', () => {
  const badWeek = valid();
  badWeek.week = '25.10.2026';
  assert.ok(validateForwardAnchor(badWeek).some((e) => e.includes('week')));

  const impossibleWeek = valid();
  impossibleWeek.week = '2026-02-30';
  assert.ok(validateForwardAnchor(impossibleWeek).some((e) => e.includes('week')));

  const badCommitted = valid();
  badCommitted.committedAt = 'не дата';
  assert.ok(validateForwardAnchor(badCommitted).some((e) => e.includes('committedAt')));

  const missingCommitted = valid();
  delete missingCommitted.committedAt;
  assert.ok(validateForwardAnchor(missingCommitted).some((e) => e.includes('committedAt')));
});

test('validateForwardAnchor: неизвестный кластер', () => {
  const a = valid();
  a.expectedCluster = 'dangerous';
  assert.ok(validateForwardAnchor(a).some((e) => e.includes('expectedCluster')));

  const missing = valid();
  delete missing.expectedCluster;
  assert.ok(validateForwardAnchor(missing).some((e) => e.includes('expectedCluster')));
});

test('validateForwardAnchor: unknown требует непустой rationale', () => {
  const unknown = valid();
  unknown.expectedCluster = 'unknown';
  unknown.rationale = 'Граница окна: не хватает независимых источников';
  assert.deepEqual(validateForwardAnchor(unknown), []);

  const noReason = valid();
  noReason.expectedCluster = 'unknown';
  noReason.rationale = '';
  assert.ok(validateForwardAnchor(noReason).some((e) => e.includes('rationale')));

  const missingReason = valid();
  missingReason.expectedCluster = 'unknown';
  delete missingReason.rationale;
  assert.ok(validateForwardAnchor(missingReason).some((e) => e.includes('rationale')));

  const emptyForKnown = valid();
  emptyForKnown.rationale = '   ';
  assert.ok(validateForwardAnchor(emptyForKnown).some((e) => e.includes('rationale')));
});

test('validateForwardAnchor: пустой author', () => {
  const a = valid();
  a.author = '';
  assert.ok(validateForwardAnchor(a).some((e) => e.includes('author')));

  const missing = valid();
  delete missing.author;
  assert.ok(validateForwardAnchor(missing).some((e) => e.includes('author')));
});

test('validateForwardAnchor: sources — массив объектов с непустым url', () => {
  const notArray = valid();
  notArray.sources = 'https://example.com/a';
  assert.ok(validateForwardAnchor(notArray).some((e) => e.includes('sources')));

  const emptyUrl = valid();
  emptyUrl.sources = [{ url: '' }];
  assert.ok(validateForwardAnchor(emptyUrl).some((e) => e.includes('sources')));

  const noUrl = valid();
  noUrl.sources = [{ title: 'без адреса' }];
  assert.ok(validateForwardAnchor(noUrl).some((e) => e.includes('sources')));

  const notObject = valid();
  notObject.sources = ['https://example.com/a'];
  assert.ok(validateForwardAnchor(notObject).some((e) => e.includes('sources')));

  const missing = valid();
  delete missing.sources;
  assert.ok(validateForwardAnchor(missing).some((e) => e.includes('sources')));
});
