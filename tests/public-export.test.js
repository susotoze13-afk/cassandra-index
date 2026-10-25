// Публичный слой данных (таск 01): проекция снапшота, JSON/CSV/SVG,
// changelog-страница, запись и CLI. Тесты идут через публичные швы
// calc/public-export.js; диск читается только в паритетной проверке.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  readFileSync, writeFileSync, mkdirSync, existsSync, mkdtempSync, rmSync, cpSync,
} from 'node:fs';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

import {
  PUBLIC_SCHEMA_VERSION,
  datasetOf,
  buildDataset,
  toCsv,
  toTrendSvg,
  renderChangelogPage,
  writePublicData,
  loadSnapshotFromDisk,
  loadAnalysisFromDisk,
  waterfallReasonFor,
} from '../calc/public-export.js';
import { CHANGELOG, sortedDesc, validateChangelog } from '../calc/changelog-entries.js';
import { validate, regionIdsFor } from '../js/data.js';
import { readLatestWeeks } from '../calc/prepare-week.js';

const ROOT = path.resolve(import.meta.dirname, '..');

const WEEK_DATES = [
  '2026-08-02', '2026-08-09', '2026-08-16', '2026-08-23',
  '2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20',
  '2026-09-27', '2026-10-04', '2026-10-11', '2026-10-18',
];

const HEADER = 'schema,schema_version,week,published,through,methodology,'
  + 'regions_taxonomy,data_state,scope,index,delta,state,q,confidence,'
  + 'coverage_covered,coverage_total,background';

function source(id, cluster, affiliated) {
  return {
    id,
    title: { ru: `Источник ${id}`, en: `Source ${id}` },
    domain: 'example.org',
    url: `https://example.org/${id}`,
    publication_date: '2026-10-18',
    accessed_date: '2026-10-18',
    source_type: 'secondary',
    cluster_id: cluster,
    state_affiliated: affiliated,
  };
}

function snapshotFor(week, opts = {}) {
  const taxonomy = opts.taxonomy ?? '2.0';
  const ids = regionIdsFor(taxonomy);
  const regions = {};
  ids.forEach((id, i) => {
    regions[id] = { index: 30 + i, delta: i - 2, background: i === 0, status: 'tense' };
  });
  const snap = {
    published: week,
    through: week,
    methodology: '3.0',
    regions_taxonomy: taxonomy,
    dataState: opts.dataState ?? 'published',
    global: opts.global === undefined ? { index: 64, delta: 8 } : opts.global,
    q: 1,
    nullWeight: 0,
    coverage: { coveredDrivers: 9, totalDrivers: 9 },
    confidence: 'full',
    coverageCriteria: { covered: 34, total: 46, uncovered: ['D1.6'] },
    regions,
    trend: WEEK_DATES.map((date, i) => {
      const point = { date, value: 40 + i };
      if (i >= 4) point.methodology = '3.0';
      return point;
    }),
    drivers: ['Д1', 'Д2', 'Д3'].map((id) => ({
      label: { ru: `Драйвер ${id}`, en: `Driver ${id}` },
      contribution: 'high',
      confidence: 'high',
      sources: [source(`s-${id}-1`, 'A-mainstream', false), source(`s-${id}-2`, 'B-state-media', true)],
    })),
    sources: [
      source('s1', 'A-mainstream', false),
      source('s2', 'B-state-media', true),
      source('s3', 'A-mainstream', false),
    ],
  };
  if (opts.precursor !== undefined) snap.precursor = opts.precursor;
  return snap;
}

function byWeek(weeks, opts = {}) {
  const map = new Map(weeks.map((w) => [w, snapshotFor(w, opts)]));
  return (w) => {
    const snap = map.get(w);
    if (!snap) throw new Error(`нет снапшота ${w}`);
    return snap;
  };
}

function tempDir(t) {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'ci-public-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

// --- Проекция ---

test('datasetOf: поля недели, state из stateOf, 12 регионов, precursor null', () => {
  const week = '2026-10-18';
  const p = datasetOf(snapshotFor(week), week);
  assert.equal(p.week, week);
  assert.equal(p.published, week);
  assert.equal(p.through, week);
  assert.equal(p.methodology, '3.0');
  assert.equal(p.regions_taxonomy, '2.0');
  assert.equal(p.data_state, 'published');
  assert.equal(p.index, 64);
  assert.equal(p.delta, 8);
  assert.equal(p.state, 'very');
  assert.equal(p.q, 1);
  assert.equal(p.confidence, 'full');
  assert.deepEqual(p.coverage_criteria, { covered: 34, total: 46 });
  assert.equal(p.regions.length, 12);
  assert.deepEqual(p.regions[0], {
    id: 'russia-belarus', index: 30, delta: -2, background: true,
  });
  assert.equal(p.precursor, null);
  assert.equal(p.precursor_present, false);
  assert.deepEqual(p.sources, { count: 3, clusters: 2, state_affiliated: 1 });
  assert.equal(p.drivers.length, 3);
  assert.equal(p.drivers[0].label.ru, 'Драйвер Д1');
  assert.equal(p.drivers[0].contribution, 'high');
  assert.equal(p.trend.length, 12);
  assert.equal(p.trend[11].value, 51);
  assert.equal(p.trend[11].methodology, '3.0');
});

test('datasetOf: state идёт по шкале движка, а не второй таблице', () => {
  const state = (index) => datasetOf(snapshotFor('2026-10-18', { global: { index, delta: 0 } }), '2026-10-18').state;
  assert.equal(state(20), 'calm');
  assert.equal(state(21), 'tense');
  assert.equal(state(60), 'danger');
  assert.equal(state(61), 'very');
  assert.equal(state(80), 'very');
  assert.equal(state(81), 'critical');
  assert.equal(state(96), 'critical');
  assert.equal(state(97), 'extreme');
});

test('datasetOf: precursor публикуется, когда поле есть', () => {
  const snap = snapshotFor('2026-10-18', { precursor: { value: 50, signalingSubgroups: 4 } });
  const p = datasetOf(snap, '2026-10-18');
  assert.deepEqual(p.precursor, { value: 50, signaling_subgroups: 4 });
  assert.equal(p.precursor_present, true);
});

test('datasetOf: insufficient-неделя не падает (index/delta/state = null)', () => {
  const p = datasetOf(
    snapshotFor('2026-10-18', { dataState: 'insufficient', global: null }),
    '2026-10-18',
  );
  assert.equal(p.index, null);
  assert.equal(p.delta, null);
  assert.equal(p.state, null);
  assert.equal(p.data_state, 'insufficient');
});

// --- Конверт ---

test('buildDataset: schema, schema_version, site, license, weeks по порядку', () => {
  const weeks = ['2026-10-11', '2026-10-18'];
  const ds = buildDataset(weeks, byWeek(weeks));
  assert.equal(ds.schema, 'cassandra-index-public');
  assert.equal(ds.schema_version, PUBLIC_SCHEMA_VERSION);
  assert.equal(PUBLIC_SCHEMA_VERSION, 1);
  assert.equal(ds.site, 'https://cassindex.ru');
  assert.equal(typeof ds.license, 'object');
  assert.equal(ds.license.name, 'CC BY 4.0');
  assert.equal(ds.license.url, 'https://creativecommons.org/licenses/by/4.0/legalcode');
  assert.equal(ds.license.placeholder, false);
  assert.ok(ds.license && typeof ds.license.attribution === 'string' && ds.license.attribution);
  assert.ok(ds.license.attribution.includes('https://cassindex.ru'),
    'атрибуция обязана называть сайт проекта');
  assert.deepEqual(ds.weeks.map((w) => w.week), weeks);
});

// --- CSV ---

test('toCsv: фиксированная шапка, неделя × область, без запятых и CRLF', () => {
  const weeks = ['2026-10-11', '2026-10-18'];
  const ds = buildDataset(weeks, (w) => snapshotFor(w, { taxonomy: w === '2026-10-11' ? '1.0' : '2.0' }));
  const csv = toCsv(ds);
  assert.ok(!csv.startsWith('\uFEFF'), 'CSV без BOM');
  assert.ok(!csv.includes('\r'), 'CSV без CRLF');
  const lines = csv.split('\n');
  assert.equal(lines[lines.length - 1], '', 'файл завершается \\n');
  lines.pop();
  assert.equal(lines[0], HEADER);
  assert.equal(lines.length, 1 + (1 + 6) + (1 + 12));
  const cols = HEADER.split(',').length;
  for (const line of lines) {
    assert.equal(line.split(',').length, cols, `строка не по шапке: ${line.slice(0, 40)}`);
  }
  const globalRow = lines[1].split(',');
  assert.equal(globalRow[0], 'cassandra-index-public');
  assert.equal(globalRow[1], '1');
  assert.equal(globalRow[2], '2026-10-11');
  assert.equal(globalRow[8], 'global');
  assert.equal(globalRow[9], '64');
  assert.equal(globalRow[10], '8');
  assert.equal(globalRow[11], 'very');
  assert.equal(globalRow[14], '34');
  assert.equal(globalRow[15], '46');
  assert.equal(globalRow[16], 'false');
  // Первая неделя — таксономия 1.0, её первый регион — europe (v1-набор).
  const firstRegion = lines[2].split(',');
  assert.equal(firstRegion[2], '2026-10-11');
  assert.equal(firstRegion[8], 'europe');
  assert.equal(firstRegion[16], 'true');
  const v2First = lines[2 + 7].split(',');
  assert.equal(v2First[2], '2026-10-18');
  assert.equal(v2First[8], 'russia-belarus');
});

// --- SVG ---

test('toTrendSvg: валидная разметка, 12 точек и подписи дат без внешних ссылок', () => {
  const svg = toTrendSvg(snapshotFor('2026-10-18'));
  assert.ok(svg.startsWith('<svg'), 'SVG начинается с <svg');
  assert.ok(svg.endsWith('</svg>\n') || svg.endsWith('</svg>'), 'SVG закрыт');
  assert.ok(svg.includes('xmlns="http://www.w3.org/2000/svg"'));
  assert.equal((svg.match(/<circle /g) || []).length, 12);
  for (const date of WEEK_DATES) {
    const label = `${date.slice(8, 10)}.${date.slice(5, 7)}`;
    assert.ok(svg.includes(`>${label}<`), `нет подписи даты ${label}`);
  }
  assert.ok(!svg.includes('<image'), 'без встроенных картинок');
  assert.ok(!svg.includes('<script'), 'без скриптов');
  assert.ok(!/<a\s/.test(svg), 'без ссылок');
  const external = svg.replace('http://www.w3.org/2000/svg', '');
  assert.ok(!/https?:\/\//.test(external), 'ни одной внешней ссылки');
  assert.ok(!svg.includes('<style'), 'стили инлайн, без <style>');
});

test('toTrendSvg: сегменты по methodology — разрыв 1.0/3.0, все 12 точек сохранены', () => {
  const snap = snapshotFor('2026-10-18');
  snap.trend = WEEK_DATES.map((date, i) => ({
    date, value: 40 + i, methodology: i < 4 ? '1.0' : '3.0',
  }));
  const svg = toTrendSvg(snap);
  const polylines = svg.match(/<polyline points="([^"]+)"/g) || [];
  assert.equal(polylines.length, 2, 'две полилинии с разрывом на границе версий');
  const coordCounts = polylines.map((line) => /points="([^"]+)"/.exec(line)[1].trim().split(/\s+/).length);
  assert.deepEqual(coordCounts, [4, 8], 'сегменты 1.0 (4 точки) и 3.0 (8 точек)');
  assert.equal((svg.match(/<circle /g) || []).length, 12, 'все 12 точек на месте');
  assert.ok(svg.includes('1.0') && svg.includes('3.0'), 'заголовок называет обе версии методологий');
  assert.ok(!svg.includes('нет входа'), 'SVG не путается с печатью водопада');
});

test('waterfallReasonFor: причина null-водопада вместо обманчивого «нет»', (t) => {
  const dir = tempDir(t);
  const snap = snapshotFor('2026-10-18');
  assert.equal(
    waterfallReasonFor('2026-10-18', snap, null, null, dir),
    'нет входа недели',
    'корень без входов: причина — отсутствие входа недели',
  );
  const firstChain = loadSnapshotFromDisk('2026-08-30');
  const demoPrev = loadSnapshotFromDisk('2026-08-23');
  assert.equal(
    waterfallReasonFor('2026-08-30', firstChain, demoPrev, '2026-08-23'),
    'смена методологии у прошлой недели',
    'первая неделя цепочки: разрыв версий 1.0 → 3.0',
  );
  const last = loadSnapshotFromDisk('2026-10-18');
  const prev = loadSnapshotFromDisk('2026-10-11');
  assert.equal(
    waterfallReasonFor('2026-10-18', last, prev, '2026-10-11'),
    null,
    'последняя неделя: водопад строится, причины нет',
  );
});

// --- changelog.html ---

test('renderChangelogPage: полный HTML, дата/версия/заголовок, значения экранируются', () => {
  const entries = [
    { date: '2026-10-11', version: '3.0', kind: 'methodology', title: 'Методология 3.0', body: 'Текст <b>изменения</b>' },
    { date: '2026-10-18', version: '3.0', kind: 'taxonomy', title: '<script>alert(1)</script>', body: 'Таксономия 2.0' },
  ];
  const html = renderChangelogPage(entries);
  assert.ok(html.startsWith('<!doctype html>'));
  assert.ok(html.includes('<html lang="ru">'));
  assert.ok(html.includes('2026-10-11'));
  assert.ok(html.includes('2026-10-18'));
  assert.ok(html.includes('3.0'));
  assert.ok(html.includes('Методология 3.0'));
  assert.ok(!html.includes('<script>alert(1)</script>'), 'заголовок экранирован');
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(html.includes('&lt;b&gt;изменения&lt;/b&gt;'), 'body экранирован');
  assert.ok(!html.includes('<script'), 'на странице нет скриптов');
  assert.ok(html.includes('css/styles.css'));
});

// --- Запись ---

test('writePublicData: ряд, справочники, понедельные файлы и схемы; повторная запись та же', (t) => {
  const dir = tempDir(t);
  const weeks = ['2026-10-11', '2026-10-18'];
  const loadSnapshot = (week) => snapshotFor(week);
  const first = writePublicData({
    rootDir: dir,
    weeks,
    loadSnapshot,
    entries: CHANGELOG,
  });
  // 9 файлов ряда, зеркало analysis.js и changelog + 2 недели + 12 схем
  // (ADR 0062 + countries.schema.json странового слоя, ADR 0067).
  assert.deepEqual(first.files.map((f) => path.basename(f)).sort(), [
    '2026-10-11.json', '2026-10-18.json', 'analysis.js',
    'cassandra-index.csv', 'changelog.html', 'changelog.json',
    'changelog.schema.json', 'countries.schema.json', 'criteria.json', 'criteria.schema.json',
    'digest-index.schema.json', 'digest.schema.json',
    'forecast-ledger.schema.json', 'index.json', 'index.schema.json', 'latest.json',
    'latest.schema.json', 'methodology.json', 'methodology.schema.json',
    'regions.json', 'regions.schema.json', 'trend.svg',
    'validation.schema.json', 'week.schema.json',
  ]);
  const read = () => first.files.map((f) => readFileSync(f));
  const before = read();
  assert.ok(existsSync(path.join(dir, 'changelog.html')));
  writePublicData({ rootDir: dir, weeks, loadSnapshot, entries: CHANGELOG });
  const after = read();
  for (let i = 0; i < before.length; i += 1) {
    assert.ok(before[i].equals(after[i]), `файл изменился при повторной записи: ${first.files[i]}`);
  }
  const all = before.map((b) => b.toString('utf8')).join('\n');
  assert.ok(!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(all), 'нет timestamp внутри файлов');
  assert.ok(!all.includes('\r'), 'LF во всех файлах');
});

test('writePublicData: битый снапшот не трогает диск', async (t) => {
  const dir = tempDir(t);
  mkdirSync(path.join(dir, 'data', 'public'), { recursive: true });
  const sentinel = path.join(dir, 'data', 'public', 'index.json');
  writeFileSync(sentinel, 'sentinel');
  const weeks = ['2026-10-11', '2026-10-18'];
  const loadSnapshot = (w) => {
    if (w === '2026-10-18') throw new Error(`${w}: снапшот не проходит validate: global`);
    return snapshotFor(w);
  };
  assert.throws(
    () => writePublicData({ rootDir: dir, weeks, loadSnapshot, entries: CHANGELOG }),
    /2026-10-18/,
  );
  assert.equal(readFileSync(sentinel, 'utf8'), 'sentinel');
  assert.ok(!existsSync(path.join(dir, 'changelog.html')));
});

// --- CLI ---

test('CLI --write с битым снапшотом: код 1, неделя и validate в stderr, диск не тронут', (t) => {
  const dir = tempDir(t);
  const week = '2026-10-18';
  cpSync(path.join(ROOT, 'data', week), path.join(dir, 'data', week), { recursive: true });
  writeFileSync(
    path.join(dir, 'data', 'latest.js'),
    `window.CI_WEEKS = ["${week}"];\nwindow.CI_LATEST = "${week}";\n`,
  );
  const globalFile = path.join(dir, 'data', week, 'global.js');
  // Портим структуру, а не конкретное значение: индекс недели меняется, тип
  // поля — нет. Замена «64 → 999» пережила бы только текущую неделю.
  const broken = readFileSync(globalFile, 'utf8').replace(/("index":\s*)-?\d+/, '$1"не число"');
  assert.notEqual(broken, readFileSync(globalFile, 'utf8'), 'фикстура не испорчена: index не найден');
  writeFileSync(globalFile, broken);
  const run = spawnSync(process.execPath, ['calc/public-export.js', '--root', dir, '--write'], {
    cwd: ROOT, encoding: 'utf8',
  });
  assert.equal(run.status, 1);
  assert.match(run.stderr, /2026-10-18/);
  assert.match(run.stderr, /validate/);
  assert.ok(!existsSync(path.join(dir, 'data', 'public')), 'data/public не создан');
  assert.ok(!existsSync(path.join(dir, 'changelog.html')), 'changelog.html не создан');
});

test('CLI без --write: печатает сводку и не меняет файлы', () => {
  const { weeks } = readLatestWeeks(readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8'));
  const last = weeks[weeks.length - 1];
  const before = readFileSync(path.join(ROOT, 'data', 'public', 'index.json'));
  const run = spawnSync(process.execPath, ['calc/public-export.js'], { cwd: ROOT, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, new RegExp(last), 'сводка называет последнюю неделю из CI_WEEKS');
  assert.match(run.stdout, /недел/i);
  const after = readFileSync(path.join(ROOT, 'data', 'public', 'index.json'));
  assert.ok(before.equals(after), 'печать не пишет файлы');
});

// --- Паритет с диском ---

test('паритет: buildDataset по диску равен записанным index.json и CSV', () => {
  const { weeks } = readLatestWeeks(readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8'));
  const analyzeWeek = (w, snap, prevSnap, prevWeek) => loadAnalysisFromDisk(
    w, snap, prevSnap, prevWeek,
  );
  const dataset = buildDataset(weeks, loadSnapshotFromDisk, analyzeWeek);

  const index = JSON.parse(readFileSync(path.join(ROOT, 'data', 'public', 'index.json'), 'utf8'));
  assert.deepEqual(index, dataset);
  assert.equal(
    readFileSync(path.join(ROOT, 'data', 'public', 'cassandra-index.csv'), 'utf8'),
    toCsv(dataset),
  );
  const latest = dataset.weeks[dataset.weeks.length - 1];
  assert.deepEqual(
    JSON.parse(readFileSync(path.join(ROOT, 'data', 'public', 'latest.json'), 'utf8')).week,
    latest,
  );
  assert.equal(
    readFileSync(path.join(ROOT, 'data', 'public', 'trend.svg'), 'utf8'),
    toTrendSvg(latest),
  );
  const changelog = JSON.parse(readFileSync(path.join(ROOT, 'data', 'public', 'changelog.json'), 'utf8'));
  assert.deepEqual(changelog.entries, sortedDesc(CHANGELOG));
  assert.equal(
    readFileSync(path.join(ROOT, 'changelog.html'), 'utf8'),
    renderChangelogPage(sortedDesc(CHANGELOG)),
  );
});

test('паритет: каждая неделя проходит validate из js/data.js и совпадает с week.js', () => {
  const { weeks } = readLatestWeeks(readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8'));
  for (const w of weeks) {
    const snap = loadSnapshotFromDisk(w);
    const v = validate(snap);
    assert.deepEqual(v.errors, [], `${w}: ${v.errors.join('; ')}`);
    const dataset = buildDataset([w], () => snap);
    assert.equal(dataset.weeks[0].index, snap.global.index, w);
    assert.equal(dataset.weeks[0].methodology, snap.methodology, w);
  }
});

test('паритет: публичные файлы не добавляют недель в CI_WEEKS', () => {
  const { weeks } = readLatestWeeks(readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8'));
  const index = JSON.parse(readFileSync(path.join(ROOT, 'data', 'public', 'index.json'), 'utf8'));
  assert.deepEqual(index.weeks.map((w) => w.week), weeks);
  // Лоадер сайта не знает про публичные файлы: только week.js одной недели.
  const latestJs = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
  assert.ok(!latestJs.includes('data/public'), 'latest.js не грузит публичный слой');
  assert.ok(latestJs.includes("/week.js"), 'latest.js грузит week.js');
  // Форма списка, а не «сегодняшняя длина»: новая неделя не должна красить тест.
  assert.ok(Array.isArray(weeks) && weeks.length > 0, 'в CI_WEEKS нет ни одной недели');
  for (const week of weeks) assert.match(week, /^\d{4}-\d{2}-\d{2}$/, `не дата недели: ${week}`);
  assert.equal(new Set(weeks).size, weeks.length, 'в CI_WEEKS дубли недель');
  assert.deepEqual(weeks, weeks.slice().sort(), 'CI_WEEKS не по возрастанию');
  assert.equal(index.weeks.length, weeks.length, 'публичный слой покрывает не все недели CI_WEEKS');
});

test('weekly-calc.yml: публичный слой пересобирается до тестов, иначе паритет гасит автопубликацию', () => {
  const workflow = readFileSync(
    path.join(ROOT, '.github', 'workflows', 'weekly-calc.yml'),
    'utf8',
  );
  const at = (needle) => {
    const i = workflow.indexOf(needle);
    assert.notEqual(i, -1, `weekly-calc.yml: нет шага «${needle}»`);
    return i;
  };
  const publicExport = at('node calc/public-export.js --write');
  const digestExport = at('node calc/digest-export.js --write');
  const tests = at('node --test');
  assert.ok(publicExport < tests, 'public-export --write должен идти до node --test');
  assert.ok(digestExport < tests, 'digest-export --write должен идти до node --test');
  // Генерируемые страницы пишутся в рабочее дерево и уезжают тем же коммитом.
  assert.ok(at('git add -A') > tests, 'сгенерированные файлы должны попасть в коммит');
});
