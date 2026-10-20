// source-discovery.test.js — ворота обнаружения источников и CLI предложения
// (R01, R02, R04, R09i). Чистые функции; сеть ТОЛЬКО через мок fetchImpl —
// реальных запросов в тестах нет. Процедура — docs/source-discovery.md.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import {
  DISCOVERY_SCHEMA_VERSION,
  SOURCE_TYPES,
  windowFor,
  discoveryContext,
  regionalEligible,
  checkCandidate,
  checkCandidateUrl,
  discover,
  proposalOf,
  validateFeeds,
  validatePool,
  extractFeedLinks,
  scanFeeds,
  renderReport,
  renderFeedScan,
  discoveryDoc,
  run,
} from '../calc/source-discovery.js';
import { PARAMS } from '../calc/params.js';
import { regionIdsFor } from '../js/data.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);
const WEEK = '2026-10-18';

const input = JSON.parse(readFileSync(path.join(ROOT, 'calc', 'input', `${WEEK}.json`), 'utf8'));
const feedsDoc = JSON.parse(
  readFileSync(path.join(ROOT, 'calc', 'input', 'discovery', 'feeds.json'), 'utf8'),
);

const ctx = () => discoveryContext(WEEK, input);

// Пул-фикстура (синтетика на example.com, 17 кандидатов по 12 слепым критериям
// недели). Раньше лежал отдельным файлом calc/input/discovery/2026-10-18.json —
// по пути РЕАЛЬНОЙ опубликованной недели; условие ревью 2026-10-20: синтетика
// не занимает путь реальной недели, а тесты не утверждают вердикты/exit-код по
// содержимому дискового пула реальной недели. Теперь пул живёт только здесь;
// run/CLI-тесты сидируют его во временный tmp-корень (seedRoot).
const pf = (over) => ({
  domain: 'example.com',
  accessed_date: '2026-10-19',
  state_affiliated: false,
  ...over,
});

const pool = {
  schema_version: 1,
  week: WEEK,
  candidates: [
    pf({
      criterion: 'D1.6', regions: ['middle-east'], id: 'sd-001',
      title: { ru: 'Вашингтон и Тель-Авив обсудили параметры эскалации', en: 'Washington and Tel Aviv discuss escalation parameters' },
      url: 'https://example.com/articles/sd-001', publication_date: '2026-10-14',
      source_type: 'secondary', cluster_id: 'A-mainstream',
      quotes: [{ criterion: 'D1.6', text: 'Стороны обсудили параметры эскалации и порядок применения ограничений' }],
    }),
    pf({
      criterion: 'D1.6', regions: ['middle-east'], id: 'sd-002',
      title: { ru: 'Министерство обороны объявило о новых ограничениях в регионе', en: 'Defense ministry announces new regional restrictions' },
      url: 'https://example.com/articles/sd-002', publication_date: '2026-10-16',
      source_type: 'primary', cluster_id: 'B-state-media', state_affiliated: true,
    }),
    pf({
      criterion: 'D5.3', regions: ['africa'], id: 'sd-003',
      title: { ru: 'Наблюдатели зафиксировали переброску техники к линии фронта', en: 'Observers record armor movement near the front line' },
      url: 'https://example.com/articles/sd-003', publication_date: '2026-10-13',
      source_type: 'OSINT', cluster_id: 'E-field-osint',
    }),
    pf({
      criterion: 'D5.3', regions: ['africa'], id: 'sd-004',
      title: { ru: 'Спутниковые снимки показывают сосредоточение сил у границы', en: 'Satellite imagery shows force buildup near the border' },
      url: 'https://example.com/articles/sd-004', publication_date: '2026-10-17',
      source_type: 'OSINT', cluster_id: 'D-satellite-osint',
    }),
    pf({
      criterion: 'D6.4', id: 'sd-005',
      title: { ru: 'Генеральный штаб сообщил о перегруппировке подразделений', en: 'General staff reports unit regrouping' },
      url: 'https://example.com/articles/sd-005', publication_date: '2026-10-15',
      source_type: 'secondary', cluster_id: 'A-mainstream',
    }),
    pf({
      criterion: 'D3.1', id: 'sd-006',
      title: { ru: 'Совет безопасности провёл внеочередное заседание', en: 'Security council holds extraordinary session' },
      url: 'https://example.com/articles/sd-006', publication_date: '2026-10-04',
      source_type: 'primary', cluster_id: 'B-state-media', state_affiliated: true,
    }),
    pf({
      criterion: 'D1.1', id: 'sd-007',
      title: { ru: 'Переговоры о продлении договора войдут в решающую фазу', en: 'Treaty extension talks enter decisive phase' },
      url: 'https://example.com/articles/sd-007', publication_date: '2026-10-14',
      source_type: 'secondary', cluster_id: 'A-mainstream',
    }),
    pf({
      criterion: 'D5.4', id: 'sd-008',
      title: { ru: 'Региональный альянс начал совместные учения', en: 'Regional alliance launches joint drills' },
      url: 'https://example.com/articles/sd-008', publication_date: '2026-10-15',
      source_type: 'OSINT', cluster_id: 'G-unregistered',
    }),
    pf({
      criterion: 'D8.4', regions: ['europe'], id: 'sd-009',
      title: { ru: 'Энергетический оператор отчитался о резервах на зиму', en: 'Grid operator reports winter reserves' },
      url: 'https://example.com/articles/sd-009', publication_date: '2026-10-13',
      source_type: 'primary', cluster_id: 'C-registries',
    }),
    pf({
      criterion: 'D9.2', regions: ['africa'], id: 'sd-010',
      title: { ru: 'Центробанк ужесточил требования к валютным операциям', en: 'Central bank tightens foreign-currency rules' },
      url: 'https://example.com/articles/sd-010', publication_date: '2026-10-16',
      source_type: 'OSINT', cluster_id: 'E-field-osint',
    }),
    pf({
      criterion: 'D6.1', id: 'sd-011',
      title: { ru: 'Генеральный штаб уточнил численность мобилизованных' },
      url: 'https://example.com/articles/sd-011', publication_date: '2026-10-14',
      source_type: 'secondary', cluster_id: 'A-mainstream',
    }),
    pf({
      criterion: 'D9.5', id: 'sd-012',
      title: { ru: 'Министерство финансов опубликовало пресс-релиз о резервах', en: 'Finance ministry publishes reserves press release' },
      url: 'https://example.com/articles/sd-012', publication_date: '2026-10-15',
      source_type: 'press-release', cluster_id: 'F-financial', state_affiliated: true,
    }),
    pf({
      criterion: 'D9.6b', id: 'sd-013',
      title: { ru: 'Ведомство ограничило выдачу выездных документов', en: 'Agency restricts exit-document issuance' },
      url: 'https://example.com/articles/sd-013', publication_date: '2026-10-17',
      source_type: 'secondary', cluster_id: 'A-mainstream', state_affiliated: true,
    }),
    pf({
      criterion: 'D9.7', id: 'sd-014',
      title: { ru: 'Правительство утвердило план гражданской обороны', en: 'Government approves civil-defence plan' },
      url: 'https://example.com/articles/sd-014', publication_date: '2026-10-15',
      source_type: 'primary', cluster_id: 'A-mainstream',
    }),
    pf({
      criterion: 'D9.7', id: 'sd-015',
      title: { ru: 'Реестр опубликовал правила мобилизационного учёта', en: 'Registry publishes mobilisation-record rules' },
      url: 'https://example.com/articles/sd-015', publication_date: '2026-10-12',
      source_type: 'primary', cluster_id: 'C-registries',
    }),
    pf({
      criterion: 'D2.4', id: 'sd-016',
      title: { ru: 'МАГАЭ выразила обеспокоенность положением на объекте', en: 'IAEA expresses concern over facility status' },
      url: 'https://example.com/articles/sd-016', publication_date: '2026-10-11',
      source_type: 'primary', cluster_id: 'C-registries',
    }),
    pf({
      criterion: 'D2.4', id: 'sd-017',
      title: { ru: 'Рынок реактивировался на новости о инспекциях', en: 'Markets react to inspection news' },
      url: 'https://example.com/articles/sd-017', publication_date: '2026-10-18',
      source_type: 'secondary', cluster_id: 'F-financial',
    }),
  ],
};

// Валидный кандидат по умолчанию (критерий D1.6 слепой в неделе 2026-10-18).
const cand = (over = {}) => ({
  criterion: 'D1.6',
  id: 'sd-x',
  title: { ru: 'Заголовок', en: 'Headline' },
  domain: 'example.com',
  url: 'https://example.com/a',
  publication_date: '2026-10-15',
  accessed_date: '2026-10-19',
  source_type: 'secondary',
  cluster_id: 'A-mainstream',
  state_affiliated: false,
  ...over,
});

const blockersOf = (c, opts) => checkCandidate(c, ctx(), opts).blockers;

// fetch, который не должен вызываться (сеть в тестах запрещена).
const noNet = async () => {
  throw new Error('сеть в тестах запрещена');
};

const response = (status) => ({ status });

// --- Окно и контекст недели ---

test('windowFor: окно W−7…W с включёнными границами', () => {
  assert.deepEqual(windowFor(WEEK), { from: '2026-10-11', to: '2026-10-18' });
  assert.deepEqual(windowFor('2026-10-11'), { from: '2026-10-04', to: '2026-10-11' });
});

test('windowFor: некорректная дата недели — исключение', () => {
  assert.throws(() => windowFor('10-18'), /некорректная дата недели: 10-18/);
  assert.throws(() => windowFor('banana'), /некорректная дата недели/);
  assert.throws(() => windowFor('2026-13-40'), /некорректная дата недели/);
});

test('discoveryContext: v2-неделя — 12 регионов и 12 слепых критериев', () => {
  const c = ctx();
  assert.equal(c.week, WEEK);
  assert.equal(c.taxonomy, '2.0');
  assert.equal(c.regionIds.length, 12);
  assert.deepEqual(c.regionIds, regionIdsFor('2.0'));
  assert.equal(c.blind.length, 12);
  assert.ok(c.blindSet.has('D1.6') && c.blindSet.has('D9.7'));
  assert.ok(!c.blindSet.has('D1.1'), 'D1.1 покрыт — не слепой');
  assert.deepEqual(c.clusters, PARAMS.clusters);
});

test('discoveryContext: v1-неделя — 6 регионов таксономии 1.0', () => {
  const c = discoveryContext('2026-10-11', input);
  assert.equal(c.taxonomy, '1.0');
  assert.equal(c.regionIds.length, 6);
});

test('regionalEligible: зеркало правила региональной атрибуции (ADR 0022)', () => {
  assert.equal(regionalEligible('D1.6'), true);
  assert.equal(regionalEligible('D8.4'), true);
  assert.equal(regionalEligible('D9.3'), true);
  assert.equal(regionalEligible('D9.2'), false);
  assert.equal(regionalEligible('D9.6b'), false);
  assert.equal(regionalEligible('D2.4'), false);
  assert.equal(regionalEligible('D4.6'), false);
  assert.equal(regionalEligible('D42.4'), false, 'нет критерия — не допустим');
});

// --- Ворота кандидата ---

test('checkCandidate: валидный кандидат проходит без блокеров', () => {
  const r = checkCandidate(cand(), ctx());
  assert.equal(r.verdict, 'OK');
  assert.deepEqual(r.blockers, []);
  assert.deepEqual(r.warnings, []);
  assert.equal(r.id, 'sd-x');
  assert.equal(r.criterion, 'D1.6');
});

test('checkCandidate: незаполненные обязательные R55-поля', () => {
  assert.ok(
    blockersOf(cand({ title: { ru: 'только русский' }, state_affiliated: 'yes' })).includes(
      'обязательные R55-поля не заполнены: title.en, state_affiliated',
    ),
    'state_affiliated обязан быть boolean',
  );
  const noId = cand();
  delete noId.id;
  assert.ok(blockersOf(noId).some((b) => b.includes('обязательные R55-поля не заполнены: id')));
});

test('checkCandidate: критерий — обязателен, из 46 и слепой в неделе', () => {
  assert.ok(blockersOf(cand({ criterion: undefined })).includes('критерий не указан (поле criterion)'));
  assert.ok(
    blockersOf(cand({ criterion: 'D42.4' })).includes('критерий D42.4 не из 46 критериев методологии'),
  );
  assert.ok(
    blockersOf(cand({ criterion: 'D1.1' })).includes('критерий D1.1 не слепой в неделе 2026-10-18'),
  );
});

test('checkCandidate: окно публикации W−7…W, границы включительно', () => {
  assert.deepEqual(blockersOf(cand({ publication_date: '2026-10-11' })), [], 'граница from');
  assert.deepEqual(blockersOf(cand({ publication_date: '2026-10-18' })), [], 'граница to');
  assert.ok(
    blockersOf(cand({ publication_date: '2026-10-04' })).includes(
      'дата публикации 2026-10-04 вне окна 2026-10-11…2026-10-18',
    ),
  );
  assert.ok(
    blockersOf(cand({ publication_date: '2026-10-19' })).includes(
      'дата публикации 2026-10-19 вне окна 2026-10-11…2026-10-18',
    ),
  );
});

test('checkCandidate: формат дат publication_date и accessed_date', () => {
  assert.ok(
    blockersOf(cand({ publication_date: '15.10.2026' })).includes(
      'дата публикации 15.10.2026 не в формате YYYY-MM-DD',
    ),
  );
  assert.ok(
    blockersOf(cand({ accessed_date: '2026-99-99' })).includes(
      'дата доступа 2026-99-99 не в формате YYYY-MM-DD',
    ),
  );
});

test('checkCandidate: cluster_id, source_type и схема URL', () => {
  assert.ok(
    blockersOf(cand({ cluster_id: 'G-unregistered' })).includes(
      'cluster_id G-unregistered вне белого списка PARAMS.clusters',
    ),
  );
  assert.ok(
    blockersOf(cand({ source_type: 'press-release' })).includes(
      'source_type press-release вне {primary, secondary, OSINT}',
    ),
  );
  assert.ok(blockersOf(cand({ url: 'ftp://example.com/x' })).includes('url не http(s): ftp://example.com/x'));
  assert.deepEqual(blockersOf(cand({ cluster_id: 'F-financial' })), [], 'кластер из whitelist');
  assert.deepEqual(blockersOf(cand({ source_type: 'OSINT' })), [], 'OSINT допустим');
});

test('checkCandidate: регион — массив, whitelist таксономии и eligible-драйвер', () => {
  assert.ok(blockersOf(cand({ regions: 'europe' })).includes('regions: массив id ожидается'));
  assert.ok(
    blockersOf(cand({ regions: ['europe'] })).includes(
      'регион europe вне таксономии недели 2.0 (12 id)',
    ),
  );
  assert.deepEqual(blockersOf(cand({ regions: ['middle-east'] })), [], 'регион v2 допустим');
  assert.ok(
    blockersOf(cand({ criterion: 'D9.2', regions: ['africa'] })).includes(
      'драйвер D9 критерия D9.2 не допустим для региональной атрибуции (ADR 0022)',
    ),
  );
  assert.ok(
    blockersOf(cand({ criterion: 'D2.4', regions: ['africa'] })).includes(
      'драйвер D2 критерия D2.4 не допустим для региональной атрибуции (ADR 0022)',
    ),
  );
});

test('checkCandidate: форма цитат — ворота, дословность — через корпус', () => {
  const badForm = blockersOf(cand({ quotes: [{ criterion: 'D42.4', text: 'x' }] }));
  assert.ok(
    badForm.some((b) => /^цитаты: quotes\[0\]\.criterion: unknown criterion/.test(b)),
    `ожидался блокер формы, получено: ${badForm.join(' | ')}`,
  );

  const withQuote = cand({ quotes: [{ criterion: 'D1.6', text: 'Стороны обсудили параметры эскалации' }] });

  // Нет корпуса — предупреждение, не отказ.
  const noCorpus = checkCandidate(withQuote, ctx(), { readText: () => null });
  assert.equal(noCorpus.verdict, 'OK');
  assert.ok(
    noCorpus.warnings.some((w) => /корпус не найден — дословность цитат не проверена \(кандидат sd-x\)/.test(w)),
  );

  // Корпус есть, цитата найдена — чисто.
  const ok = checkCandidate(withQuote, ctx(), {
    readText: () => 'Вводный абзац. Стороны обсудили параметры эскалации и порядок применения.',
  });
  assert.equal(ok.verdict, 'OK');
  assert.deepEqual(ok.warnings, []);

  // Цитаты нет в корпусе — отказ.
  const miss = checkCandidate(withQuote, ctx(), { readText: () => 'Совсем другой текст публикации.' });
  assert.equal(miss.verdict, 'FAIL');
  assert.ok(
    miss.blockers.some((b) => /цитата не найдена в корпусе дословно \(кандидат sd-x, критерий D1\.6\)/.test(b)),
  );
});

// --- URL-гейт ---

test('checkCandidateUrl: ok/broken/blocked и мимо URL без сети', async () => {
  const ok = await checkCandidateUrl(cand(), { fetchImpl: async () => response(200), retryDelayMs: 0 });
  assert.deepEqual(ok, { url: 'https://example.com/a', status: 200, urlStatus: 'ok' });

  const dead = await checkCandidateUrl(cand(), { fetchImpl: async () => response(404), retryDelayMs: 0 });
  assert.equal(dead.urlStatus, 'broken');
  assert.equal(dead.status, 404);

  const blocked = await checkCandidateUrl(cand(), { fetchImpl: async () => response(403), retryDelayMs: 0 });
  assert.equal(blocked.urlStatus, 'blocked');
  assert.equal(blocked.status, 403);

  const noUrl = await checkCandidateUrl(cand({ url: 'notaurl' }), { fetchImpl: noNet });
  assert.equal(noUrl.urlStatus, 'unchecked', 'не-HTTP URL не ходит в сеть');
});

// --- discover ---

test('discover: сухой прогон по пулу-фикстуре — OK 8 / FAIL 9, без сети', async () => {
  const rep = await discover(pool, ctx(), { fetchImpl: noNet });
  assert.equal(rep.network, false);
  assert.equal(rep.week, WEEK);
  assert.equal(rep.candidates.length, 17);
  assert.deepEqual(rep.blind, ctx().blind);
  assert.ok(rep.candidates.every((c) => c.urlStatus === 'unchecked'), 'сеть не включалась');

  const okIds = rep.candidates.filter((c) => c.verdict === 'OK').map((c) => c.id);
  assert.deepEqual(
    okIds,
    ['sd-001', 'sd-002', 'sd-003', 'sd-004', 'sd-014', 'sd-015', 'sd-016', 'sd-017'],
  );
  const by = Object.fromEntries(rep.candidates.map((c) => [c.id, c]));
  assert.equal(rep.candidates.filter((c) => c.verdict === 'FAIL').length, 9);

  const has = (id, re) =>
    assert.match(by[id].blockers.join(' | '), re, `блокеры ${id}: ${by[id].blockers.join(' | ')}`);
  has('sd-005', /независимость: критерий D6\.4 — 1 кластер\(ов\) из 2\+ требуемых \(ADR 0026\)/);
  has('sd-006', /дата публикации 2026-10-04 вне окна 2026-10-11…2026-10-18/);
  has('sd-007', /критерий D1\.1 не слепой в неделе 2026-10-18/);
  has('sd-008', /cluster_id G-unregistered вне белого списка PARAMS\.clusters/);
  has('sd-009', /регион europe вне таксономии недели 2\.0 \(12 id\)/);
  has('sd-010', /драйвер D9 критерия D9\.2 не допустим/);
  has('sd-011', /обязательные R55-поля не заполнены: title\.en/);
  has('sd-012', /source_type press-release вне \{primary, secondary, OSINT\}/);
  has('sd-013', /независимость: критерий D9\.6b — 1 кластер\(ов\) из 2\+ требуемых/);
  assert.match(by['sd-001'].warnings.join(' | '), /корпус не найден/, 'цитаты без корпуса — warning');
  assert.deepEqual(by['sd-016'].source, pool.candidates.find((c) => c.id === 'sd-016'), 'source verbatim');
});

test('discover: broken — блокер, blocked — предупреждение, независимость после URL', async () => {
  const mk = (id, cluster_id, url) => cand({ id, cluster_id, url });
  const candidates = [
    mk('sa', 'A-mainstream', 'https://example.com/a'),
    mk('sb', 'B-state-media', 'https://example.com/b'),
    mk('sc', 'C-registries', 'https://example.com/c'),
  ];
  const fetchImpl = async (url) => {
    if (url.endsWith('/a')) return response(200);
    if (url.endsWith('/b')) return response(404);
    return response(403);
  };
  const rep = await discover({ schema_version: 1, week: WEEK, candidates }, ctx(), {
    checkUrls: true,
    fetchImpl,
    retryDelayMs: 0,
  });
  assert.equal(rep.network, true);
  const by = Object.fromEntries(rep.candidates.map((c) => [c.id, c]));

  assert.equal(by.sa.verdict, 'OK');
  assert.equal(by.sa.urlStatus, 'ok');

  assert.equal(by.sb.verdict, 'FAIL');
  assert.ok(by.sb.blockers.includes('URL недоступен (broken) — статус 404'));

  // blocked — не отказ; независимость считается после URL-гейта: A + C = 2 кластера.
  assert.equal(by.sc.verdict, 'OK');
  assert.equal(by.sc.urlStatus, 'blocked');
  assert.ok(
    by.sc.warnings.some((w) => /URL заблокирован из среды проверки \(blocked, статус 403\)/.test(w)),
  );

  const summary = renderReport(rep);
  assert.match(summary, /сетевых запросов: 3 \(ok 1, broken 1, blocked 1\)/);
});

test('discover: независимость — два кластера на критерий, один кластер → отказ', async () => {
  const base = { schema_version: 1, week: WEEK };
  const two = await discover(
    {
      ...base,
      candidates: [
        cand({ id: 'x1', cluster_id: 'A-mainstream' }),
        cand({ id: 'x2', cluster_id: 'A-mainstream' }),
      ],
    },
    ctx(),
    { fetchImpl: noNet },
  );
  assert.ok(two.candidates.every((c) => c.verdict === 'FAIL'));
  assert.ok(
    two.candidates.every((c) =>
      c.blockers.some((b) => /независимость: критерий D1\.6 — 1 кластер\(ов\) из 2\+/.test(b)),
    ),
  );

  const ok = await discover(
    {
      ...base,
      candidates: [
        cand({ id: 'y1', cluster_id: 'A-mainstream' }),
        cand({ id: 'y2', cluster_id: 'B-state-media' }),
      ],
    },
    ctx(),
    { fetchImpl: noNet },
  );
  assert.ok(ok.candidates.every((c) => c.verdict === 'OK'));
});

test('proposalOf: предложение делит кандидатов на принятых и отбракованных', async () => {
  const rep = await discover(pool, ctx(), { fetchImpl: noNet });
  const p = proposalOf(rep);
  assert.equal(p.week, WEEK);
  assert.deepEqual(p.window, { from: '2026-10-11', to: '2026-10-18' });
  assert.equal(p.accepted.length, 8);
  assert.equal(p.rejected.length, 9);
  assert.ok(p.accepted.every((c) => c.verdict === 'OK'));
  assert.ok(p.rejected.every((c) => c.verdict === 'FAIL'));
});

// --- Реестр лент ---

test('validateFeeds: реестр из репозитория валиден, мутации ловятся', () => {
  const v2 = regionIdsFor('2.0');
  assert.deepEqual(validateFeeds(feedsDoc, v2), [], 'seed-реестр валиден');
  assert.equal(feedsDoc.feeds.length, 26);
  assert.equal(new Set(feedsDoc.feeds.filter((f) => f.region).map((f) => f.region)).size, 12, 'все регионы v2');

  const mut = (fn) => {
    const doc = JSON.parse(JSON.stringify(feedsDoc));
    fn(doc);
    return validateFeeds(doc, v2);
  };
  assert.ok(mut((d) => { d.feeds[0].kind = 'podcast'; }).some((e) => /kind ожидается rss\|html/.test(e)));
  assert.ok(mut((d) => { d.feeds[0].region = 'europe'; }).some((e) => /регион europe вне таксономии/.test(e)));
  assert.ok(mut((d) => { d.feeds[1].id = d.feeds[0].id; }).some((e) => /дубль id/.test(e)));
  assert.ok(mut((d) => { d.schema_version = 2; }).some((e) => /schema_version ожидается 1/.test(e)));
  assert.ok(mut((d) => { d.feeds[0].url = 'ftp://x/y'; }).some((e) => /url не http\(s\)/.test(e)));
  assert.ok(mut((d) => { d.feeds = 'нет'; }).some((e) => /feeds должен быть массивом/.test(e)));
  assert.ok(mut((d) => { delete d.feeds[0].name; }).some((e) => /name обязателен/.test(e)));
  // Регион null (международная лента) допустим — уже покрыто реальным прогоном.
  assert.deepEqual(
    validateFeeds({ schema_version: 1, feeds: [{ id: 'x', name: 'X', region: null, url: 'https://x/rss', kind: 'rss' }] }, v2),
    [],
  );
  assert.deepEqual(validateFeeds(null, v2), ['feeds.json: ожидается объект']);
  // v1-неделя не знает регионов v2.
  assert.ok(validateFeeds(feedsDoc, regionIdsFor('1.0')).some((e) => /вне таксономии/.test(e)));
});

test('документ несёт таблицу-зеркало feeds.json (паритет)', () => {
  const text = readFileSync(path.join(ROOT, 'docs', 'source-discovery.md'), 'utf8');
  const section = text.split('\n## Реестр лент\n')[1];
  assert.ok(section, 'в docs/source-discovery.md нет секции «## Реестр лент»');
  const body = section.split('\n## ')[0];
  const rows = body
    .split('\n')
    .filter((l) => l.startsWith('|') && !l.startsWith('|---') && !l.startsWith('| id '));
  const parsed = rows.map((l) => {
    const cells = l.split('|').slice(1, -1).map((s) => s.trim());
    return { id: cells[0], region: cells[1] === '—' ? null : cells[1], url: cells[3], kind: cells[4] };
  });
  assert.equal(parsed.length, feedsDoc.feeds.length, 'строк в таблице столько, сколько фидов');
  for (const f of feedsDoc.feeds) {
    const row = parsed.find((r) => r.id === f.id);
    assert.ok(row, `в таблице документа нет строки ${f.id}`);
    assert.equal(row.region, f.region, `${f.id}: регион`);
    assert.equal(row.url, f.url, `${f.id}: url`);
    assert.equal(row.kind.toLowerCase(), f.kind, `${f.id}: тип`);
  }
});

// --- Извлечение ссылок и обход лент ---

test('extractFeedLinks: RSS — окно, дедуп, atom и CDATA', () => {
  const win = windowFor(WEEK);
  const xml = [
    '<?xml version="1.0"?>',
    '<rss><channel>',
    '<item><title>in</title><link>https://example.com/in</link><pubDate>Wed, 14 Oct 2026 10:00:00 GMT</pubDate></item>',
    '<item><title>out</title><link>https://example.com/out</link><pubDate>Sun, 04 Oct 2026 10:00:00 GMT</pubDate></item>',
    '<item><title>nodate</title><link>https://example.com/nodate</link></item>',
    '<item><title>dup</title><link>https://example.com/in</link><pubDate>Thu, 15 Oct 2026 10:00:00 GMT</pubDate></item>',
    '<entry><title>atom</title><link href="https://example.com/atom"/><published>2026-10-16T08:00:00Z</published></entry>',
    '<item><title>cdata</title><link><![CDATA[https://example.com/cdata]]></link><pubDate>Fri, 16 Oct 2026 09:00:00 GMT</pubDate></item>',
    '<item><title>внутренняя ссылка</title><link>/relative</link></item>',
    '</channel></rss>',
  ].join('\n');
  const links = extractFeedLinks(xml, 'rss', win);
  assert.deepEqual(
    links.map((l) => l.url),
    ['https://example.com/in', 'https://example.com/nodate', 'https://example.com/atom', 'https://example.com/cdata'],
  );
  assert.equal(links[0].date, '2026-10-14');
  assert.equal(links[1].date, null, 'без даты — остаётся, дата null');
  assert.deepEqual(extractFeedLinks('', 'rss', win), []);
});

test('extractFeedLinks: HTML — только абсолютные http(s), дата из URL', () => {
  const win = windowFor(WEEK);
  const html = [
    '<a href="https://example.com/2026-10-15/story">a</a>',
    '<a href="/relative/x">r</a>',
    "<a href='https://example.com/other'>o</a>",
    '<a href="https://example.com/2026-10-04/old">old</a>',
    '<a href="https://example.com/2026-10-15/story">dup</a>',
  ].join('\n');
  assert.deepEqual(
    extractFeedLinks(html, 'html', win).map((l) => l.url),
    ['https://example.com/2026-10-15/story', 'https://example.com/other'],
  );
  const dated = extractFeedLinks('<a href="https://example.com/2026-10-15/x">x</a>', 'html', win);
  assert.equal(dated[0].date, '2026-10-15');
});

const scanFeedsSet = () => [
  { id: 'f-ok', name: 'OK', region: null, url: 'https://ok.example/rss', kind: 'rss' },
  { id: 'f-block', name: 'Block', region: null, url: 'https://block.example/rss', kind: 'rss' },
  { id: 'f-broken', name: 'Broken', region: null, url: 'https://broken.example/rss', kind: 'rss' },
  { id: 'f-throw', name: 'Throw', region: null, url: 'https://throw.example/rss', kind: 'rss' },
];

const scanFetch = async (url) => {
  if (url.includes('ok.')) {
    return {
      status: 200,
      text: async () =>
        [
          '<rss><item><link>https://example.com/in</link><pubDate>Wed, 14 Oct 2026 10:00:00 GMT</pubDate></item>',
          '<item><link>https://example.com/out</link><pubDate>Sun, 04 Oct 2026 10:00:00 GMT</pubDate></item></rss>',
        ].join(''),
    };
  }
  if (url.includes('block.')) return { status: 403, text: async () => '' };
  if (url.includes('broken.')) return { status: 404, text: async () => '' };
  throw new Error('обрыв сети');
};

test('scanFeeds: ok/blocked/broken/error и ссылки только окна', async () => {
  const win = windowFor(WEEK);
  const scan = await scanFeeds(scanFeedsSet(), win, { fetchImpl: scanFetch });
  assert.deepEqual(scan.window, win);
  const by = Object.fromEntries(scan.results.map((r) => [r.feed.id, r]));
  assert.equal(by['f-ok'].status, 'ok');
  assert.deepEqual(by['f-ok'].links.map((l) => l.url), ['https://example.com/in'], 'вне окна отфильтрован');
  assert.equal(by['f-block'].status, 'blocked');
  assert.deepEqual(by['f-block'].links, []);
  assert.equal(by['f-broken'].status, 'broken');
  assert.equal(by['f-throw'].status, 'error');
  assert.equal(scan.results.length, 4);
});

// --- Отчёты ---

test('renderReport: заголовок, вердикты, сводные строки', async () => {
  const rep = await discover(pool, ctx(), { fetchImpl: noNet });
  const out = renderReport(rep);
  assert.match(out, /=== 2026-10-18 === окно 2026-10-11…2026-10-18 · слепых критериев: 12 · кандидатов: 17/);
  assert.match(out, /OK\s+sd-001\s+D1\.6/);
  assert.match(out, /FAIL\s+sd-005\s+D6\.4/);
  assert.match(out, /сетевых запросов: 0/);
  assert.match(out, /итог: OK 8, FAIL 9/);
});

test('renderFeedScan: статусы и итог обхода', async () => {
  const scan = await scanFeeds(scanFeedsSet(), windowFor(WEEK), { fetchImpl: scanFetch });
  const out = renderFeedScan(scan);
  assert.match(out, /=== реестр лент ===/);
  assert.match(out, /ок\s+f-ok\s+1 ссылок/);
  assert.match(out, /итог: ок 1, заблокирована 1, битых 1, ошибок 1, ссылок 1/);
});

test('discoveryDoc: машиночитаемая форма предложения', async () => {
  const rep = await discover(pool, ctx(), { fetchImpl: noNet });
  const doc = discoveryDoc(rep);
  assert.equal(doc.schema_version, DISCOVERY_SCHEMA_VERSION);
  assert.equal(doc.week, WEEK);
  assert.deepEqual(doc.blind, ctx().blind);
  assert.equal(doc.network, false);
  assert.equal(doc.feed_scan, null, 'без --feeds обхода нет');
  assert.equal(doc.candidates.length, 17);
  const one = doc.candidates.find((c) => c.id === 'sd-007');
  assert.equal(one.verdict, 'FAIL');
  assert.ok(one.blockers.length > 0);
  assert.equal(one.source.id, 'sd-007', 'полный R55-объект verbatim');
  assert.equal(one.urlStatus, 'unchecked');
  const withScan = discoveryDoc(rep, {
    feedScan: { window: windowFor(WEEK), results: [{ feed: scanFeedsSet()[0], status: 'ok', links: [] }] },
  });
  assert.equal(withScan.feed_scan.results[0].id, 'f-ok');
  assert.equal(withScan.feed_scan.results[0].status, 'ok');
});

// --- CLI run() ---

function tmpRoot() {
  return mkdtempSync(path.join(os.tmpdir(), 'ci-discovery-'));
}

function seedRoot(root) {
  mkdirSync(path.join(root, 'calc', 'input', 'discovery'), { recursive: true });
  mkdirSync(path.join(root, 'data', WEEK), { recursive: true });
  writeFileSync(path.join(root, 'calc', 'input', `${WEEK}.json`), JSON.stringify(input));
  writeFileSync(path.join(root, 'calc', 'input', 'discovery', `${WEEK}.json`), JSON.stringify(pool));
  writeFileSync(path.join(root, 'calc', 'input', 'discovery', 'feeds.json'), JSON.stringify(feedsDoc));
  writeFileSync(path.join(root, 'data', WEEK, 'marker.txt'), 'sentinel');
}

const withTmpRoot = async (fn) => {
  const root = tmpRoot();
  try {
    seedRoot(root);
    await fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
};

test('run: сухой прогон печатает вердикты и не пишет файлов', async () => {
  await withTmpRoot(async (root) => {
    const { code, lines } = await run([], { root });
    const out = lines.join('\n');
    assert.equal(code, 1, 'в пуле есть отбракованные кандидаты');
    assert.match(out, /сетевых запросов: 0/);
    assert.match(out, /итог: OK 8, FAIL 9/);
    assert.equal(existsSync(path.join(root, 'data', 'discovery')), false, 'без --write файлов нет');
    assert.equal(
      readFileSync(path.join(root, 'data', WEEK, 'marker.txt'), 'utf8'),
      'sentinel',
      'data/<week>/ не тронута',
    );
  });
});

test('run: --write кладёт data/discovery/<week>.json, data/<week>/ не меняется', async () => {
  await withTmpRoot(async (root) => {
    const { code, lines } = await run(['--week', WEEK, '--write'], { root });
    assert.equal(code, 1, 'отбракованные кандидаты → exit 1');
    assert.ok(lines.join('\n').includes(`записано: data/discovery/${WEEK}.json`));

    const file = path.join(root, 'data', 'discovery', `${WEEK}.json`);
    assert.ok(existsSync(file), 'файл создан');
    const raw = readFileSync(file, 'utf8');
    assert.ok(raw.endsWith('\n'), 'JSON с завершающим переводом строки');
    const doc = JSON.parse(raw);
    assert.equal(doc.schema_version, 1);
    assert.equal(doc.week, WEEK);
    assert.equal(doc.blind.length, 12);
    assert.equal(doc.candidates.length, 17, 'пишутся и OK, и FAIL');
    const okOne = doc.candidates.find((c) => c.id === 'sd-001');
    assert.equal(okOne.verdict, 'OK');
    assert.equal(okOne.source.id, 'sd-001');
    assert.equal(okOne.source.cluster_id, 'A-mainstream');
    const bad = doc.candidates.find((c) => c.id === 'sd-007');
    assert.equal(bad.verdict, 'FAIL');
    assert.match(bad.blockers.join(' | '), /не слепой/);

    assert.deepEqual(
      readdirSync(path.join(root, 'data', WEEK)),
      ['marker.txt'],
      'data/<week>/ не изменилась',
    );
    assert.equal(
      readFileSync(path.join(root, 'data', WEEK, 'marker.txt'), 'utf8'),
      'sentinel',
    );
  });
});

test('run: ошибки аргументов и входов → exit 1 с причиной', async () => {
  await withTmpRoot(async (root) => {
    const unknown = await run(['--wat'], { root });
    assert.equal(unknown.code, 1);
    assert.match(unknown.lines.join('\n'), /использование:/);
    assert.match(unknown.lines.join('\n'), /неизвестный аргумент --wat/);

    const noValue = await run(['--week'], { root });
    assert.equal(noValue.code, 1);
    assert.match(noValue.lines.join('\n'), /--week требует дату/);

    const badDate = await run(['--week', 'banana'], { root });
    assert.equal(badDate.code, 1);
    assert.match(badDate.lines.join('\n'), /некорректная дата недели: banana/);

    const noInput = await run(['--week', '2000-01-01'], { root });
    assert.equal(noInput.code, 1);
    assert.match(noInput.lines.join('\n'), /вход недели не найден: calc\/input\/2000-01-01\.json/);

    rmSync(path.join(root, 'calc', 'input', 'discovery', `${WEEK}.json`));
    const noPool = await run(['--week', WEEK], { root });
    assert.equal(noPool.code, 1);
    assert.match(noPool.lines.join('\n'), /пул кандидатов не найден: calc\/input\/discovery\/2026-10-18\.json/);

    writeFileSync(
      path.join(root, 'calc', 'input', 'discovery', `${WEEK}.json`),
      JSON.stringify({ ...pool, week: '2026-10-11' }),
    );
    const badPool = await run(['--week', WEEK], { root });
    assert.equal(badPool.code, 1);
    assert.match(badPool.lines.join('\n'), /пул кандидатов невалиден:/);

    writeFileSync(path.join(root, 'calc', 'input', 'discovery', 'feeds.json'), '{"schema_version":2,"feeds":[]}');
    const badFeeds = await run(['--week', WEEK, '--feeds'], { root });
    assert.equal(badFeeds.code, 1);
    assert.match(badFeeds.lines.join('\n'), /реестр лент невалиден:/);
    assert.doesNotMatch(badFeeds.lines.join('\n'), /=== реестр лент ===/, 'валидация раньше обхода — сети нет');
  });
});

test('CLI: сухой прогон без аргументов печатает вердикты, exit 1, без записи', async () => {
  const exec = promisify(execFile);
  // Спавн в tmp-корне с посеянными входом/пулом/реестром: дефолтный --week берётся
  // из data/ tmp-корня, диск настоящего репозитория CLI не читает и не пишет.
  await withTmpRoot(async (root) => {
    try {
      await exec(process.execPath, [path.join(ROOT, 'calc', 'source-discovery.js')], { cwd: root });
      assert.fail('ожидался ненулевой код выхода');
    } catch (e) {
      assert.equal(e.code, 1, 'в пуле есть отбракованные → exit 1');
      assert.match(e.stdout, /=== 2026-10-18 ===/);
      assert.match(e.stdout, /итог: OK 8, FAIL 9/);
      assert.match(e.stdout, /сетевых запросов: 0/);
      assert.doesNotMatch(e.stdout, /записано:/, 'сухой прогон ничего не пишет');
    }
  });
});

// --- Контрактные константы ---

test('константы модуля', () => {
  assert.equal(DISCOVERY_SCHEMA_VERSION, 1);
  assert.deepEqual(SOURCE_TYPES, ['primary', 'secondary', 'OSINT']);
  assert.deepEqual([...PARAMS.clusters].sort(), [...PARAMS.clusters], 'порог — сам whitelist');
  assert.equal(pool.schema_version, 1, 'пул кандидатов в той же схеме');
  assert.equal(pool.week, WEEK);
  const blind = Object.entries(input.criteria)
    .filter(([, v]) => v === null)
    .map(([k]) => k);
  const coveredByPool = new Set(pool.candidates.map((c) => c.criterion));
  for (const id of blind) {
    assert.ok(coveredByPool.has(id), `слепой критерий ${id} не покрыт пулом кандидатов`);
  }
  const ids = pool.candidates.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length, 'id кандидатов уникальны');
  assert.ok(ids.every((id) => /^sd-\d{3}$/.test(id)), 'формат id кандидатов');
});
