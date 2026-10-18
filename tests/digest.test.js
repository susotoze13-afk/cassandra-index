// digest.test.js — недельный выпуск (R17, R20, R02.1, A03, A03.1):
// чистый buildDigest на реальном снапшоте и на синтетике, статическая страница
// архива, запись data/public/digest/* и digest.html. Ожидаемые числа взяты из
// дискового снапшота 2026-10-18, а не из кода под тестом.

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync, readdirSync,
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
import { stateOf } from '../calc/engine.js';
import { PARAMS } from '../calc/params.js';
import { readLatestWeeks } from '../calc/prepare-week.js';
import { regionForTaxonomy } from '../js/region.js';
import { t } from '../js/i18n.js';
import {
  readSent, readSentChannels, writeSent, runDigestSend,
} from '../calc/digest-send.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const WEEK = '2026-10-18';

const WEEK_DATES = [
  '2026-08-02', '2026-08-09', '2026-08-16', '2026-08-23',
  '2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20',
  '2026-09-27', '2026-10-04', '2026-10-11', '2026-10-18',
];

const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

const snapshot = loadSnapshotFromDisk(WEEK);
const prevSnapshot = loadSnapshotFromDisk('2026-10-11');

const numbered = (text) => text.split('\n').filter((line) => /^\d+\. /.test(line));

// Ожидания берутся из фикстуры (дисковый снапшот) и словаря, а не из чисел,
// вписанных в тест: следующая неделя не должна делать прогон красным.
const signed = (n) => (n > 0 ? `+${n}` : String(n));
const weekLabel = (iso) => `${Number(iso.slice(8, 10))} ${MONTHS_GENITIVE[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;
const stateLabel = (index) => t('ru', `status.${stateOf(index, PARAMS)}`);

// Независимая от calc/digest.js реализация правила «три региона по величине
// изменения; слепой регион (background: true) в рейтинг не входит».
function expectedRegionNames(snap, limit = DIGEST_REGIONS) {
  const names = new Map(
    regionForTaxonomy(snap.regions_taxonomy || '1.0').map((r) => [r.id, r.name.ru]),
  );
  return Object.entries(snap.regions)
    .filter(([, r]) => r && typeof r === 'object' && r.background !== true && Number.isFinite(r.delta))
    .sort((a, b) => Math.abs(b[1].delta) - Math.abs(a[1].delta)
      || (b[1].index || 0) - (a[1].index || 0)
      || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .slice(0, limit)
    .map(([id]) => names.get(id) || id);
}

function weekList() {
  return readLatestWeeks(readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8')).weeks;
}

function currentWeeks() {
  return weekList().filter((week) => {
    try {
      return loadSnapshotFromDisk(week).methodology === PARAMS.methodology;
    } catch {
      return false;
    }
  });
}

const sink = () => {
  const chunks = [];
  return { chunks, write: (s) => { chunks.push(String(s)); return true; }, text: () => chunks.join('') };
};

const TELEGRAM_ENV = { TELEGRAM_BOT_TOKEN: 'TESTTELEGRAMTOKEN', TELEGRAM_CHAT_ID: '-1001234567890' };
const EMAIL_ENV = {
  DIGEST_EMAIL_ENDPOINT: 'https://mail.example.test/send',
  DIGEST_EMAIL_TOKEN: 'TESTEMAILTOKEN',
  DIGEST_EMAIL_FROM: 'digest@example.test',
  DIGEST_EMAIL_TO: 'first@example.test',
};

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
  const g = snapshot.global;
  const coverage = `${snapshot.coverageCriteria.covered} из ${snapshot.coverageCriteria.total}`;
  const deltaText = `изменение за неделю ${signed(g.delta)}`;

  assert.equal(digest.week, snapshot.published);
  assert.ok(digest.subject.includes(weekLabel(snapshot.published)), 'тема без даты недели');
  assert.equal(digest.meta.items, DIGEST_ITEMS);
  assert.equal(digest.meta.regions, DIGEST_REGIONS);
  assert.equal(digest.meta.hasPrev, true);

  // Одно и то же содержание в трёх представлениях.
  for (const body of [digest.text, digest.telegram, digest.html]) {
    assert.ok(body.includes(`${g.index} из 100`), 'нет мирового индекса недели');
    assert.ok(body.includes(deltaText), 'нет недельной дельты');
    assert.ok(body.toLowerCase().includes(stateLabel(g.index).toLowerCase()), 'нет состояния недели');
    assert.ok(body.includes(coverage), 'нет покрытия критериев');
    assert.match(body, /https:\/\/cassindex\.ru/);
    assert.match(body, /data\/public\/index\.json/);
    assert.match(body, /data\/public\/trend\.svg/);
    assert.match(body, /digest\.html/);
    for (const driver of snapshot.drivers) {
      assert.ok(body.includes(driver.label.ru), `нет драйвера «${driver.label.ru}»`);
    }
  }

  // Ровно пять пунктов; регионы пункта — непустые и не слепые.
  assert.equal(numbered(digest.text).length, DIGEST_ITEMS);
  const regionPoint = digest.text.split('\n').find((line) => line.includes('изменились регионы')) || '';
  const expected = expectedRegionNames(snapshot);
  assert.ok(expected.length > 0, 'фикстура не дала ни одного региона с дельтой');
  for (const name of expected) {
    assert.ok(regionPoint.includes(name), `регион «${name}» выпал из пункта: ${regionPoint}`);
  }
  assert.equal(digest.meta.regions, expected.length);
});

test('buildDigest: слепые регионы (background) не выдаются за региональное изменение (2026-09-06)', () => {
  const blind = loadSnapshotFromDisk('2026-09-06');
  const names = new Map(
    regionForTaxonomy(blind.regions_taxonomy || '1.0').map((r) => [r.id, r.name.ru]),
  );
  const blindNames = Object.entries(blind.regions)
    .filter(([, r]) => r && r.background === true)
    .map(([id]) => names.get(id) || id);
  assert.ok(blindNames.length > 0, 'фикстура 09-06 должна нести слепые регионы');

  const digest = buildDigest(blind, { prev: null });
  const regionPoint = digest.text.split('\n').find((line) => line.includes('изменились регионы')) || '';
  assert.ok(regionPoint, 'пункт о регионах пропал');

  for (const name of blindNames) {
    assert.ok(!regionPoint.includes(name), `слепой регион «${name}» подан как изменение: ${regionPoint}`);
  }
  const expected = expectedRegionNames(blind);
  assert.equal(digest.meta.regions, expected.length);
  for (const name of expected) {
    assert.ok(regionPoint.includes(name), `регион «${name}» выпал из пункта: ${regionPoint}`);
  }
});

test('buildDigest: без прошлой недели — hasPrev false, дельты нет, «первый выпуск»', () => {
  const digest = buildDigest(snapshot, { prev: null });

  assert.equal(digest.meta.hasPrev, false);
  assert.equal(digest.meta.items, DIGEST_ITEMS);
  assert.equal(digest.meta.regions, DIGEST_REGIONS);
  for (const body of [digest.text, digest.telegram, digest.html, digest.subject]) {
    assert.doesNotMatch(body, /изменение за неделю/i);
  }
  const globalPoint = numbered(digest.text)[0] || '';
  assert.ok(!globalPoint.includes(signed(snapshot.global.delta)),
    `первый пункт показывает дельту без прошлой недели: ${globalPoint}`);
  assert.match(digest.text, /первый выпуск/i);
  assert.ok(digest.text.includes(`${snapshot.global.index} из 100`));
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
    assert.ok(issue.subject.includes(weekLabel(WEEK)), 'тема выпуска без даты недели');
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
    assert.ok(html.includes(weekLabel(WEEK)), 'страница архива без даты последнего выпуска');
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('digestIndexFile: недели по убыванию без дублей', () => {
  const index = digestIndexFile(['2026-10-11', WEEK, '2026-10-11']);
  assert.deepEqual(index.weeks, [WEEK, '2026-10-11']);
});

// --- Паритет с диском ---

test('паритет: digest.html и data/public/digest/*.json совпадают с генератором', () => {
  const dir = path.join(ROOT, 'data', 'public', 'digest');
  const weeks = currentWeeks();
  assert.ok(weeks.length > 0, 'в CI_WEEKS нет ни одной недели текущей методологии');

  const onDisk = readdirSync(dir)
    .filter((name) => /^\d{4}-\d{2}-\d{2}\.json$/.test(name))
    .map((name) => name.slice(0, -5));
  assert.ok(onDisk.length > 0, 'архив выпусков пуст');

  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-digest-parity-'));
  try {
    // Генератор строит выпуск недели от её предшественницы в ряду недель,
    // поэтому считаем весь ряд, а сравниваем записанные файлы.
    writeDigestData({
      rootDir: tmp,
      weeks,
      loadSnapshot: (week) => loadSnapshotFromDisk(week),
    });
    for (const week of onDisk) {
      assert.ok(weeks.includes(week), `выпуск ${week} не из ряда CI_WEEKS текущей методологии`);
      assert.equal(
        readFileSync(path.join(dir, `${week}.json`), 'utf8'),
        readFileSync(path.join(tmp, 'data', 'public', 'digest', `${week}.json`), 'utf8'),
        `data/public/digest/${week}.json разошёлся с генератором`,
      );
    }

    const issues = onDisk
      .map((week) => JSON.parse(readFileSync(path.join(dir, `${week}.json`), 'utf8')))
      .sort((a, b) => (a.week < b.week ? 1 : a.week > b.week ? -1 : 0));
    assert.equal(
      readFileSync(path.join(ROOT, 'digest.html'), 'utf8'),
      renderDigestPage(issues),
      'digest.html разошёлся с генератором',
    );
    assert.equal(
      readFileSync(path.join(dir, 'index.json'), 'utf8'),
      `${JSON.stringify(digestIndexFile(issues.map((issue) => issue.week)), null, 2)}\n`,
      'data/public/digest/index.json разошёлся с генератором',
    );
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

// --- Отметка отправки: пара «неделя + канал» ---

test('sent.json: доставленный канал не повторяется, недостающий доотправляется', async () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    const env = { ...TELEGRAM_ENV, ...EMAIL_ENV };
    const tgOkMailFail = async (url) => (String(url).includes('api.telegram.org')
      ? { ok: true, status: 200 }
      : { ok: false, status: 500 });
    const first = await runDigestSend({
      root: ROOT, argv: ['--send', '--week', WEEK], env, sentDir: tmp,
      fetchImpl: tgOkMailFail, stdout: sink(), stderr: sink(),
    });
    assert.equal(first, 1, 'сбой канала должен быть красным');
    assert.deepEqual(readSentChannels(tmp, WEEK), ['telegram'], 'доставлен только telegram');

    // Повтор: email восстановился — уходит только он, telegram не дублируется.
    const calls = [];
    const allOk = async (url) => { calls.push(String(url)); return { ok: true, status: 200 }; };
    const second = sink();
    const code = await runDigestSend({
      root: ROOT, argv: ['--send', '--week', WEEK], env, sentDir: tmp,
      fetchImpl: allOk, stdout: second, stderr: sink(),
    });
    assert.equal(code, 0);
    assert.equal(calls.length, 1, `ожидался один запрос (email), было ${calls.length}`);
    assert.match(calls[0], /mail\.example\.test/, 'повтор отправил не тот канал');
    assert.deepEqual(readSentChannels(tmp, WEEK), ['telegram', 'email']);
    assert.deepEqual(readSent(tmp), [WEEK]);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('sent.json: старая форма ["2026-10-18"] читается как «неделя отправлена целиком»', () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    writeFileSync(
      path.join(tmp, 'sent.json'),
      `${JSON.stringify({ schema: 'cassandra-index-digest-sent', schema_version: 1, weeks: [WEEK] }, null, 2)}\n`,
    );
    assert.deepEqual(readSent(tmp), [WEEK]);
    assert.deepEqual(readSentChannels(tmp, WEEK), ['telegram', 'email']);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('sent.json: writeSent без каналов помечает неделю целиком, с каналами — только их', () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    writeSent(tmp, '2026-10-11');
    writeSent(tmp, WEEK, ['telegram']);
    assert.deepEqual(readSentChannels(tmp, '2026-10-11'), ['telegram', 'email']);
    assert.deepEqual(readSentChannels(tmp, WEEK), ['telegram']);
    // readSent — прежняя форма «неделя доставлена целиком»: частичная неделя в неё не входит.
    assert.deepEqual(readSent(tmp), ['2026-10-11']);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('sent.json: резерв до запроса снимается при сбое, чужой прогон не повторяет доставку', async () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    const env = { ...TELEGRAM_ENV, ...EMAIL_ENV };
    const calls = [];
    const fail = async (url) => { calls.push(String(url)); return { ok: false, status: 500 }; };
    const ok = async (url) => { calls.push(String(url)); return { ok: true, status: 200 }; };
    const run = (argv, fetchImpl) => runDigestSend({
      root: ROOT, argv, env, sentDir: tmp, fetchImpl, stdout: sink(), stderr: sink(),
    });

    assert.equal(await run(['--reserve', '--week', WEEK, '--run-id', '111'], ok), 0);
    assert.deepEqual(readSentChannels(tmp, WEEK), []);

    // Сбой отправки снимает резерв: канал не «потерян», повтор — не дубль.
    assert.equal(await run(['--send', '--week', WEEK, '--run-id', '111'], fail), 1);
    const afterFail = calls.length;
    assert.equal(await run(['--send', '--week', WEEK, '--run-id', '222'], ok), 0);
    assert.equal(calls.length, afterFail + 2, `повтор должен доотправить оба канала`);
    assert.deepEqual(readSentChannels(tmp, WEEK), ['telegram', 'email']);

    // Доставленная неделя: чужой прогон не повторяет ни одного запроса.
    const repeated = calls.length;
    assert.equal(await run(['--send', '--week', WEEK, '--run-id', '333'], ok), 0);
    assert.equal(calls.length, repeated, 'доставленные каналы не повторяются');
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('weekly-digest.yml: отметка в master фиксируется до запроса, отправка — после', () => {
  const workflow = readFileSync(
    path.join(ROOT, '.github', 'workflows', 'weekly-digest.yml'),
    'utf8',
  );
  const at = (needle) => {
    const i = workflow.indexOf(needle);
    assert.notEqual(i, -1, `weekly-digest.yml: нет «${needle}»`);
    return i;
  };
  const reserve = at('--reserve');
  const markPush = workflow.indexOf('git push origin master', reserve);
  assert.notEqual(markPush, -1, 'после резерва нет пуша отметки');
  const send = at('calc/digest-send.js --send');
  assert.ok(markPush < send, 'пуш отметки должен идти ДО отправки — иначе ретрай постит дважды');
  assert.ok(at('node calc/digest-export.js --write') < reserve, 'выпуск собирается до отметки');
});
