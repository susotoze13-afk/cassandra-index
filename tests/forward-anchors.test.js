// forward-anchors.test.js — схема форвардного якоря (R15, R15.1, A01→R15):
// редактор фиксирует ожидание до --write. Чистый валидатор, без диска и сети.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { CLUSTERS, validateForwardAnchor } from '../calc/forward-anchors.js';
import { SCALE } from '../js/risk.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

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

test('CLUSTERS: id из SCALE js/risk.js плюс unknown', () => {
  // Ожидание — из шкалы сайта (идентификаторы состояний), не из литерала:
  // любое расхождение словаря якорей со шкалой — красный тест.
  assert.deepEqual(CLUSTERS, [...SCALE.map((s) => s.id), 'unknown']);
  assert.equal(CLUSTERS.length, SCALE.length + 1);
  assert.equal(CLUSTERS.at(-1), 'unknown');
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

// Журнал калибровки — человеческий источник перечня кластеров и примера файла:
// оба обязаны совпадать с кодом (R01, R15), иначе редактор пишет по устаревшей
// инструкции и файл молча не проходит валидатор.
function journal() {
  return readFileSync(path.join(ROOT, 'docs', 'calibration-journal.md'), 'utf8');
}

function forwardSection() {
  const text = journal();
  const start = text.indexOf('## Форвардный журнал');
  const end = text.indexOf('## Честная оговорка про якоря', start);
  assert.ok(start > -1 && end > start, 'в журнале нет раздела «Форвардный журнал»');
  return text.slice(start, end);
}

test('журнал: перечень expectedCluster совпадает с CLUSTERS', () => {
  const section = forwardSection();
  for (const id of CLUSTERS) {
    assert.ok(section.includes(`\`${id}\``), `в журнале нет кластера ${id}`);
  }
  // Устаревшие имена состояний не должны остаться ни в одном виде.
  for (const stale of ['`dangerous`', '`very-dangerous`', '`critically-dangerous`']) {
    assert.ok(!section.includes(stale), `в журнале устаревший кластер ${stale}`);
  }
});

test('журнал: пример файла проходит validateForwardAnchor без ошибок', () => {
  const text = journal();
  const marker = '<!-- forward-anchor-example -->';
  const at = text.indexOf(marker);
  assert.ok(at > -1, 'в журнале нет примера файла форвардного якоря');
  const rest = text.slice(at + marker.length);
  const open = rest.indexOf('```json');
  const close = rest.indexOf('```', open + '```json'.length);
  assert.ok(open > -1 && close > open, 'пример не в блоке ```json');
  let example;
  assert.doesNotThrow(() => {
    example = JSON.parse(rest.slice(open + '```json'.length, close));
  });
  assert.deepEqual(validateForwardAnchor(example), []);
});
