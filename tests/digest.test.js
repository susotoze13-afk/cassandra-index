// digest.test.js — недельный выпуск (R17, R20, R02.1, A03, A03.1):
// чистый buildDigest на реальном снапшоте и на синтетике, статическая страница
// архива, запись data/public/digest/* и digest.html. Ожидаемые числа взяты из
// дискового снапшота 2026-10-18, а не из кода под тестом.

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  readFileSync, existsSync, mkdtempSync, rmSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  DIGEST_ITEMS, DIGEST_REGIONS, buildDigest, escapeHtml,
} from '../calc/digest.js';
import { DIGEST_ARCHIVE_LINKS, renderDigestPage } from '../calc/digest-page.js';
import {
  writeDigestData, digestIndexFile,
} from '../calc/digest-export.js';
import { loadSnapshotFromDisk } from '../calc/public-export.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const WEEK = '2026-10-18';

const WEEK_DATES = [
  '2026-08-02', '2026-08-09', '2026-08-16', '2026-08-23',
  '2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20',
  '2026-09-27', '2026-10-04', '2026-10-11', '2026-10-18',
];

const snapshot = loadSnapshotFromDisk(WEEK);
const prevSnapshot = loadSnapshotFromDisk('2026-10-11');

const numbered = (text) => text.split('\n').filter((line) => /^\d+\. /.test(line));

function syntheticIssue(week) {
  return {
    week,
    subject: `Выпуск ${week}`,
    text: `Текст выпуска ${week}`,
    meta: { items: DIGEST_ITEMS, regions: DIGEST_REGIONS, hasPrev: true },
  };
}

test('buildDigest: выпуск 2026-10-18 — тема с датой, 5 пунктов, 3 региона, индекс, покрытие, ссылки', () => {
  const digest = buildDigest(snapshot, { prev: prevSnapshot });

  assert.equal(digest.week, WEEK);
  assert.match(digest.subject, /18 октября 2026/);
  assert.equal(digest.meta.items, DIGEST_ITEMS);
  assert.equal(digest.meta.regions, DIGEST_REGIONS);
  assert.equal(digest.meta.hasPrev, true);

  // Одно и то же содержание в трёх представлениях.
  for (const body of [digest.text, digest.telegram, digest.html]) {
    assert.match(body, /64 из 100/);
    assert.match(body, /\+8/);
    assert.match(body, /очень опасно/i);
    assert.match(body, /34 из 46/);
    assert.match(body, /https:\/\/cassindex\.ru/);
    assert.match(body, /data\/public\/index\.json/);
    assert.match(body, /data\/public\/trend\.svg/);
    assert.match(body, /digest\.html/);
    for (const driver of snapshot.drivers) {
      assert.ok(body.includes(driver.label.ru), `нет драйвера «${driver.label.ru}»`);
    }
  }

  // Ровно пять пунктов и три региона; регионы — по величине изменения.
  assert.equal(numbered(digest.text).length, DIGEST_ITEMS);
  assert.match(digest.text, /Северная Америка/);
  assert.match(digest.text, /Африка/);
  assert.match(digest.text, /Балканы/);
});

test('buildDigest: без прошлой недели — hasPrev false, дельты нет, «первый выпуск»', () => {
  const digest = buildDigest(snapshot, { prev: null });

  assert.equal(digest.meta.hasPrev, false);
  assert.equal(digest.meta.items, DIGEST_ITEMS);
  assert.equal(digest.meta.regions, DIGEST_REGIONS);
  for (const body of [digest.text, digest.telegram, digest.html, digest.subject]) {
    assert.doesNotMatch(body, /изменение за неделю/i);
    assert.doesNotMatch(body, /\+8/);
  }
  assert.match(digest.text, /первый выпуск/i);
  assert.match(digest.text, /64 из 100/);
});

test('buildDigest: precursor только при наличии поля, отсутствие — не «0 %»', () => {
  const withPrecursor = { ...snapshot, precursor: { value: 50, signalingSubgroups: 4 } };
  const shown = buildDigest(withPrecursor, { prev: prevSnapshot });
  assert.match(shown.text, /предвестник/i);
  assert.match(shown.text, /50 из 100/);
  assert.equal(shown.meta.items, DIGEST_ITEMS);

  const hidden = buildDigest(snapshot, { prev: prevSnapshot });
  assert.equal(snapshot.precursor, undefined);
  assert.doesNotMatch(hidden.text, /предвестник/i);
  assert.doesNotMatch(hidden.text, /0\s?%/);
  assert.doesNotMatch(hidden.html, /предвестник/i);
  assert.equal(hidden.meta.items, DIGEST_ITEMS);
});

test('escapeHtml: угловые скобки, амперсанд и кавычки', () => {
  assert.equal(escapeHtml('<b>&"\''), '&lt;b&gt;&amp;&quot;&apos;');
});

test('renderDigestPage: полный документ, один h1, canonical, без скриптов и внешних ресурсов', () => {
  const issues = WEEK_DATES.map(syntheticIssue);
  const html = renderDigestPage(issues);

  assert.match(html, /^<!doctype html>/);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /<link rel="canonical" href="https:\/\/cassindex\.ru\/digest\.html">/);
  assert.match(html, /http-equiv="Content-Security-Policy"/);
  assert.match(html, /script-src 'self'/);
  assert.doesNotMatch(html, /<script/i);
  assert.doesNotMatch(html, /src="https?:\/\//);
  assert.doesNotMatch(html, /<a [^>]*href="https?:\/\//);
  assert.match(html, /Текст выпуска 2026-10-18/);
  assert.doesNotMatch(html, /Текст выпуска 2026-10-11/);
});

test('renderDigestPage: последние 12 прошлых выпусков и ссылка на полный index.json', () => {
  const issues = WEEK_DATES.map(syntheticIssue);
  const links = (html) => (html.match(/href="data\/public\/digest\/(\d{4}-\d{2}-\d{2})\.json"/g) || []);

  const twelve = renderDigestPage(issues);
  assert.equal(links(twelve).length, WEEK_DATES.length - 1);
  assert.match(twelve, /href="data\/public\/digest\/index\.json"/);

  const thirteenWeeks = [...WEEK_DATES, '2026-10-25'];
  const thirteen = renderDigestPage(thirteenWeeks.map(syntheticIssue));
  assert.equal(links(thirteen).length, DIGEST_ARCHIVE_LINKS);
  assert.match(thirteen, /href="data\/public\/digest\/index\.json"/);

  const many = Array.from({ length: 16 }, (_, i) => syntheticIssue(`2026-01-${String(i + 1).padStart(2, '0')}`));
  assert.equal(links(renderDigestPage(many)).length, DIGEST_ARCHIVE_LINKS);
});

test('renderDigestPage: пустой архив и экранирование подставляемых значений', () => {
  const empty = renderDigestPage([]);
  assert.match(empty, /^<!doctype html>/);
  assert.equal((empty.match(/<h1[\s>]/g) || []).length, 1);
  assert.doesNotMatch(empty, /data\/public\/digest\/\d{4}/);

  const evil = [{
    week: WEEK,
    subject: '<script>alert(1)</script>',
    text: 'Строка с <b>разметкой</b>',
    meta: { items: 5, regions: 3, hasPrev: true },
  }];
  const html = renderDigestPage(evil);
  assert.doesNotMatch(html, /<script/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<b>разметкой<\/b>/);
});

test('writeDigestData: JSON выпуска, index.json по убыванию, digest.html', () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-digest-'));
  try {
    const { files } = writeDigestData({
      rootDir: tmp,
      weeks: ['2026-10-11', WEEK],
      loadSnapshot: (week) => loadSnapshotFromDisk(week),
    });
    const issuePath = path.join(tmp, 'data', 'public', 'digest', `${WEEK}.json`);
    const indexPath = path.join(tmp, 'data', 'public', 'digest', 'index.json');
    const pagePath = path.join(tmp, 'digest.html');
    for (const file of [issuePath, indexPath, pagePath]) {
      assert.ok(existsSync(file), `не записан ${path.relative(tmp, file)}`);
    }
    assert.ok(files.length >= 4);

    const issue = JSON.parse(readFileSync(issuePath, 'utf8'));
    assert.equal(issue.week, WEEK);
    assert.match(issue.subject, /18 октября 2026/);
    assert.equal(issue.meta.items, DIGEST_ITEMS);
    assert.ok(issue.text.length > 0);

    const index = JSON.parse(readFileSync(indexPath, 'utf8'));
    assert.deepEqual(index.weeks, [WEEK, '2026-10-11']);

    // Повторный прогон идемпотентен по составу архива.
    writeDigestData({
      rootDir: tmp,
      weeks: [WEEK],
      loadSnapshot: (week) => loadSnapshotFromDisk(week),
    });
    const again = JSON.parse(readFileSync(indexPath, 'utf8'));
    assert.deepEqual(again.weeks, [WEEK, '2026-10-11']);

    const html = readFileSync(pagePath, 'utf8');
    assert.match(html, /^<!doctype html>/);
    assert.match(html, /18 октября 2026/);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('digestIndexFile: недели по убыванию без дублей', () => {
  const index = digestIndexFile(['2026-10-11', WEEK, '2026-10-11']);
  assert.deepEqual(index.weeks, [WEEK, '2026-10-11']);
});
