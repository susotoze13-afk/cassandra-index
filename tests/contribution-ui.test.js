// Секция «Почему индекс изменился» (ADR 0062): чистые швы разбора данных,
// форматирование п.п., наличие хоста/скрипта/ключей словаря и зеркало
// data/analysis.js. DOM не нужен: проверяются чистые функции и статические
// файлы (index.html, css, словарь).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

import {
  analysisFor,
  barWidth,
  driverLabel,
  formatPp,
  levelRows,
  waterfallRows,
  whatRows,
} from '../js/sections/contribution.js';
import { SECTIONS } from '../js/render.js';
import { t } from '../js/i18n.js';
import { analysisBundle, buildDataset, loadSnapshotFromDisk, loadAnalysisFromDisk }
  from '../calc/public-export.js';
import { readLatestWeeks } from '../calc/prepare-week.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const INDEX_HTML = readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const CSS = readFileSync(path.join(ROOT, 'css', 'styles.css'), 'utf8');
const LATEST_SRC = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
const { weeks: WEEKS, latest: LATEST } = readLatestWeeks(LATEST_SRC);

const SAMPLE = {
  weeks: {
    '2026-10-18': {
      driver_breakdown: [
        {
          id: 'D1',
          name: { ru: 'Д1. Военная активность', en: 'D1. Military activity' },
          contribution_pp: 11.3,
          top_criteria: [{ id: 'D1.4' }, { id: 'D1.2' }, { id: 'D1.5' }],
        },
        {
          id: 'D8',
          name: { ru: 'Д8. Подтверждённые деэскалирующие исходы', en: 'D8.' },
          contribution_pp: -3.6,
          top_criteria: [{ id: 'D8.1' }],
        },
      ],
      waterfall: {
        from: { week: '2026-10-11', index: 56 },
        to: { week: '2026-10-18', index: 64 },
        steps: [
          { driver: 'D1', contribution_pp: -7.2 },
          { driver: 'D2', contribution_pp: 0 },
          { driver: 'D3', contribution_pp: 5.7 },
        ],
        residual_pp: 2,
        residual_reason: 'saturation-inertia-coverage-rounding',
      },
      what_would_change: {
        state: 'very',
        thresholds: {
          down: { state: 'danger', index: 61, gap_pp: -3 },
          up: { state: 'critical', index: 81, gap_pp: 17 },
        },
        criteria: [
          {
            id: 'D7.3',
            name: { ru: 'Новые фронты', en: 'New fronts' },
            impact_pp: -6.6,
            effect: 'down',
            crosses_state: true,
            breaks_driver: false,
          },
        ],
        method: 'criterion-zeroed',
      },
    },
  },
};

test('driverLabel: модельный id → русская подпись, прочее не трогаем', () => {
  assert.equal(driverLabel('D1'), 'Д1');
  assert.equal(driverLabel('D9'), 'Д9');
  assert.equal(driverLabel('unknown'), 'unknown');
});

test('formatPp: знак, типографский минус, без лишнего нуля', () => {
  assert.equal(formatPp(5.7), '+5.7');
  assert.equal(formatPp(-7.2), '−7.2');
  assert.equal(formatPp(5), '+5');
  assert.equal(formatPp(0), '0');
  assert.equal(formatPp(null), '—');
  assert.equal(formatPp(NaN), '—');
});

test('analysisFor: запись недели, отсутствие и битая форма', () => {
  assert.ok(analysisFor(SAMPLE, '2026-10-18'));
  assert.equal(analysisFor(SAMPLE, '2026-08-02'), null);
  assert.equal(analysisFor(null, '2026-10-18'), null);
  assert.equal(analysisFor({ weeks: { x: {} } }, 'x'), null);
  assert.equal(analysisFor({ weeks: { x: { driver_breakdown: 'нет' } } }, 'x'), null);
});

test('waterfallRows: шаги в порядке модели, нули сохраняются, остаток отдельно', () => {
  const rows = waterfallRows(SAMPLE.weeks['2026-10-18'].waterfall,
    SAMPLE.weeks['2026-10-18'].driver_breakdown);
  assert.deepEqual(rows.rows.map((r) => r.id), ['D1', 'D2', 'D3']);
  // Подпись — название драйвера; без него — короткая «Д2».
  assert.equal(rows.rows[0].label, 'Д1. Военная активность');
  assert.equal(rows.rows[1].label, 'Д2');
  assert.equal(rows.rows[1].pp, 0);
  assert.equal(rows.residual, 2);
  assert.deepEqual(rows.from, { week: '2026-10-11', index: 56 });
  assert.deepEqual(rows.to, { week: '2026-10-18', index: 64 });
  assert.equal(waterfallRows(null), null);
});

test('levelRows: вклад и top-критерии, отрицательный Д8 сохраняется', () => {
  const rows = levelRows(SAMPLE.weeks['2026-10-18'].driver_breakdown);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].pp, 11.3);
  assert.deepEqual(rows[0].top.map((c) => c.id), ['D1.4', 'D1.2', 'D1.5']);
  assert.equal(rows[0].top[0].name, 'D1.4');
  assert.equal(rows[1].pp, -3.6);
});

test('whatRows: пороги и критерии, эффект и флаги', () => {
  const what = whatRows(SAMPLE.weeks['2026-10-18'].what_would_change);
  assert.deepEqual(what.down, { state: 'danger', index: 61, gap: -3 });
  assert.deepEqual(what.up, { state: 'critical', index: 81, gap: 17 });
  assert.equal(what.criteria[0].id, 'D7.3');
  assert.equal(what.criteria[0].effect, 'down');
  assert.equal(what.criteria[0].crosses, true);
  assert.equal(whatRows(null), null);
});

test('barWidth: ноль — без полосы, ненулевое — минимум 2 %, максимум 100 %', () => {
  assert.equal(barWidth(0, 10), 0);
  assert.equal(barWidth(0.1, 10), 2);
  assert.equal(barWidth(-10, 10), 100);
  assert.equal(barWidth(5, 0), 0);
});

test('секция зарегистрирована и разметка/стили на месте', () => {
  assert.ok(SECTIONS.includes('contribution'), 'нет секции contribution в render.js');
  assert.ok(INDEX_HTML.includes('data-section="contribution"'), 'нет хоста секции');
  assert.ok(INDEX_HTML.includes('data-i18n="contribution.title"'), 'заголовок не из словаря');
  assert.ok(INDEX_HTML.includes('src="data/analysis.js"'), 'нет зеркала развёртки');
  assert.ok(INDEX_HTML.indexOf('data/analysis.js') < INDEX_HTML.indexOf('js/bundle.js'),
    'analysis.js должен грузиться до бандла');
  assert.ok(CSS.includes('.contribution-section'), 'нет стилей секции');
  assert.ok(CSS.includes('.contribution-section[hidden]'), 'секция не скрывается через hidden');
});

test('ключи словаря contribution.* существуют и непустые', () => {
  const keys = [
    'contribution.title', 'contribution.summary', 'contribution.summary.flat',
    'contribution.residual', 'contribution.total', 'contribution.breakdown',
    'contribution.breakdown.note', 'contribution.table.caption',
    'contribution.table.driver', 'contribution.table.points',
    'contribution.table.criteria', 'contribution.criteria.none',
    'contribution.what.title', 'contribution.what.down', 'contribution.what.up',
    'contribution.what.item', 'contribution.what.crosses', 'contribution.what.breaks',
    'contribution.what.note',
  ];
  for (const key of keys) {
    const text = t('ru', key);
    assert.ok(typeof text === 'string' && text.length > 0, `пустой ключ ${key}`);
    assert.notEqual(text, key, `ключ ${key} не в словаре`);
  }
});

test('data/analysis.js: зеркало совпадает с генератором и кладёт CI_ANALYSIS', () => {
  const analyzeWeek = (w, snap, prevSnap, prevWeek) => loadAnalysisFromDisk(
    w, snap, prevSnap, prevWeek,
  );
  const dataset = buildDataset(WEEKS, loadSnapshotFromDisk, analyzeWeek);
  const source = readFileSync(path.join(ROOT, 'data', 'analysis.js'), 'utf8');
  assert.equal(source, analysisBundle(dataset), 'data/analysis.js устарел — пересоберите public-export');

  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  const store = sandbox.window.CI_ANALYSIS;
  assert.equal(store.schema_version, 1);
  assert.equal(store.latest, LATEST);
  const latest = analysisFor(store, LATEST);
  assert.ok(latest, `${LATEST}: нет развёртки в зеркале`);
  assert.equal(latest.drivers.length, 9);
  assert.ok(latest.waterfall, 'у последней недели должен быть водопад');
  // Демо-история 1.0 не попадает в зеркало: секция скрыта, а не нулевая.
  assert.equal(analysisFor(store, WEEKS[0]), null);
});
