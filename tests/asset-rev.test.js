// calc/asset-rev.js — ревизия данных для cache-buster в data/latest.js.
// Проверяются чистые швы (revOfEntries/withAssetRev/readAssetRev), запись
// latest.js на синтетическом каталоге и паритет диска: ревизия в data/latest.js
// обязана совпадать с хешем содержимого data/<неделя>/week.js. Иначе после
// пересчёта недели без пересборки latest.js браузер продолжит показывать
// старые числа (именно этот дефект чинится).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import {
  revOfEntries,
  readWeekContents,
  computeRev,
  readAssetRev,
  withAssetRev,
  updateLatestRev,
} from '../calc/asset-rev.js';
import { readLatestWeeks } from '../calc/prepare-week.js';

const ROOT = path.resolve(import.meta.dirname, '..');

test('revOfEntries: 8 hex-символов, детерминированность и независимость от порядка', () => {
  const entries = [
    { week: '2026-10-18', content: 'A' },
    { week: '2026-10-25', content: 'B' },
  ];
  const rev = revOfEntries(entries);
  assert.match(rev, /^[0-9a-f]{8}$/);
  assert.equal(revOfEntries(entries), rev, 'ревизия нестабильна');
  assert.equal(revOfEntries([...entries].reverse()), rev, 'порядок входа влияет на ревизию');
});

test('revOfEntries: смена содержимого или набора недель меняет ревизию', () => {
  const base = [{ week: '2026-10-25', content: 'A' }];
  const other = [{ week: '2026-10-25', content: 'A ' }];
  const extra = [...base, { week: '2026-11-01', content: 'A' }];
  assert.notEqual(revOfEntries(base), revOfEntries(other));
  assert.notEqual(revOfEntries(base), revOfEntries(extra));
});

test('revOfEntries: пустой набор — валидная ревизия, а не падение', () => {
  assert.match(revOfEntries([]), /^[0-9a-f]{8}$/);
  assert.match(revOfEntries(null), /^[0-9a-f]{8}$/);
});

test('readAssetRev: читает поле, без поля — null', () => {
  assert.equal(readAssetRev('window.CI_ASSET_REV = "f5983980";'), 'f5983980');
  assert.equal(readAssetRev('window.CI_LATEST = "2026-10-25";'), null);
  // поле обязано быть 8 hex — иначе это не ревизия
  assert.equal(readAssetRev('window.CI_ASSET_REV = "zzz";'), null);
});

test('withAssetRev: подставляет поле после CI_LATEST, если его нет', () => {
  const src = 'window.CI_WEEKS = ["2026-10-25"];\nwindow.CI_LATEST = "2026-10-25";\n';
  const out = withAssetRev(src, 'abcdef01');
  assert.ok(out.includes('window.CI_LATEST = "2026-10-25";\nwindow.CI_ASSET_REV = "abcdef01";\n'));
  // повторный вызов идемпотентен
  assert.equal(withAssetRev(out, 'abcdef01'), out);
});

test('withAssetRev: заменяет значение существующего поля, не дублирует его', () => {
  const src = 'window.CI_LATEST = "2026-10-25";\nwindow.CI_ASSET_REV = "00000000";\n';
  const out = withAssetRev(src, 'ffffffff');
  assert.equal(out.match(/CI_ASSET_REV/g).length, 1);
  assert.ok(out.includes('window.CI_ASSET_REV = "ffffffff";'));
});

test('withAssetRev: битая ревизия и отсутствие CI_LATEST — явная ошибка', () => {
  assert.throws(() => withAssetRev('window.CI_LATEST = "2026-10-25";\n', 'XYZ'), /8 hex/);
  assert.throws(() => withAssetRev('window.CI_WEEKS = [];\n', 'abcdef01'), /CI_LATEST/);
});

test('updateLatestRev: пишет latest.js только при изменении ревизии', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'ci-asset-rev-'));
  try {
    mkdirSync(path.join(dir, 'data', '2026-10-25'), { recursive: true });
    writeFileSync(path.join(dir, 'data', '2026-10-25', 'week.js'), '// v1\n', 'utf8');
    writeFileSync(
      path.join(dir, 'data', 'latest.js'),
      'window.CI_WEEKS = ["2026-10-25"];\nwindow.CI_LATEST = "2026-10-25";\n',
      'utf8',
    );

    const first = updateLatestRev(dir);
    assert.equal(first.changed, true);
    const rev1 = readAssetRev(readFileSync(path.join(dir, 'data', 'latest.js'), 'utf8'));
    assert.equal(rev1, computeRev(dir, ['2026-10-25']));

    // тот же диск — записи нет
    assert.deepEqual(updateLatestRev(dir), { rev: rev1, changed: false });

    // изменился week.js — ревизия пересобирается (пересчёт уже опубликованной недели)
    writeFileSync(path.join(dir, 'data', '2026-10-25', 'week.js'), '// v2\n', 'utf8');
    const third = updateLatestRev(dir);
    assert.equal(third.changed, true);
    assert.notEqual(third.rev, rev1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('updateLatestRev: без data/latest.js — no-op, а не падение', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'ci-asset-rev-missing-'));
  try {
    assert.deepEqual(updateLatestRev(dir), { rev: null, changed: false });
    assert.equal(existsSync(path.join(dir, 'data', 'latest.js')), false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('readWeekContents: отсутствующий week.js пропускается', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'ci-asset-rev-read-'));
  try {
    mkdirSync(path.join(dir, 'data', '2026-10-18'), { recursive: true });
    writeFileSync(path.join(dir, 'data', '2026-10-18', 'week.js'), 'x', 'utf8');
    const got = readWeekContents(dir, ['2026-10-18', '2026-10-25']);
    assert.deepEqual(got.map((e) => e.week), ['2026-10-18']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('паритет диска: CI_ASSET_REV в data/latest.js = хеш всех week.js CI_WEEKS', () => {
  const src = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
  const { weeks } = readLatestWeeks(src);
  const declared = readAssetRev(src);
  assert.ok(declared, 'в data/latest.js нет поля CI_ASSET_REV');
  assert.equal(declared, computeRev(ROOT, weeks),
    'CI_ASSET_REV не совпадает с содержимым week.js — пересоберите calc/asset-rev.js updateLatestRev (calc.js --write)');
});
