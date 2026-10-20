// source-discovery.js — ворота обнаружения источников для слепых критериев
// недели и CLI предложения кандидатов (R01, R02, R04, R09i; процедура —
// docs/source-discovery.md). Чистое ядро (без сети и диска) + тонкий CLI:
// статические ворота кандидата бегут всегда, сеть ТОЛЬКО при --feeds
// (обход реестра лент + проверка URL кандидатов через checkUrl из
// calc/linkcheck.js). Модуль не трогает data/<week>/: артефакт --write —
// data/discovery/<week>.json (машиночитаемое предложение для редактора).
//
// Использование:
//   node calc/source-discovery.js [--week YYYY-MM-DD] [--feeds] [--write]
//   discover(pool, ctx, opts) / checkCandidate(cand, ctx, opts) — чистые швы
//
// Ноль зависимостей: только stdlib Node / браузер; всё ESM. Сеть в тестах
// идёт только через мок fetchImpl (см. tests/source-discovery.test.js).

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CRITERIA } from './engine.js';
import { classify, checkUrl } from './linkcheck.js';
import { PARAMS } from './params.js';
import { quoteFound } from './classify.js';
import { validateQuotes } from './quotes.js';
import { taxonomyForWeek } from './week-step.js';
import { regionIdsFor } from '../js/data.js';

// --- Константы контракта ---

export const DISCOVERY_SCHEMA_VERSION = 1;
export const SOURCE_TYPES = ['primary', 'secondary', 'OSINT'];

const USAGE = [
  'использование: node calc/source-discovery.js [--week YYYY-MM-DD] [--feeds] [--write]',
  '  --week   неделя расчёта (дефолт — последняя папка YYYY-MM-DD в data/)',
  '  --feeds  обойти реестр лент calc/input/discovery/feeds.json и проверить URL кандидатов (сеть)',
  '  --write  записать предложение в data/discovery/<неделя>.json (data/<week>/ не трогается)',
];

// Обязательные поля R55-записи; «заполнено» = непустая строка, у
// title — по обеим локализациям, у state_affiliated — строго boolean.
const REQUIRED_FIELDS = [
  'id',
  'title.ru',
  'title.en',
  'domain',
  'url',
  'publication_date',
  'accessed_date',
  'source_type',
  'cluster_id',
  'state_affiliated',
];

// --- Даты и окно недели ---

// Формат YYYY-MM-DD с реальной календарной валидацией (2026-99-99 → false).
function isDateStr(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

// Окно недели W−7…W с включёнными границами (та же конвенция, что у
// calc/history-debt.js): from = W−7 дней, to = сама неделя.
export function windowFor(week) {
  if (!isDateStr(week)) throw new Error(`некорректная дата недели: ${week}`);
  const to = new Date(`${week}T00:00:00Z`);
  const from = new Date(to.getTime() - 7 * 24 * 3600 * 1000);
  return { from: from.toISOString().slice(0, 10), to: week };
}

// Контекст недели: таксономия регионов (по дате, ADR 0032), слепые критерии
// по входу (criteria[id] === null), whitelist кластеров и окно W−7…W.
export function discoveryContext(week, input) {
  const taxonomy = taxonomyForWeek(week);
  const regionIds = regionIdsFor(taxonomy);
  const blind = Object.entries(input.criteria)
    .filter(([, v]) => v === null)
    .map(([k]) => k);
  return {
    week,
    taxonomy,
    regionIds,
    blind,
    blindSet: new Set(blind),
    clusters: PARAMS.clusters,
    window: windowFor(week),
  };
}

// Правило региональной атрибуции ADR 0022: Д2/Д4 и Д9 кроме D9.3 не
// агрегируются в сигналы региона — зеркало правила в engine.regionalSignals
// (там оно не экспортировано; паритет держит тест региональной модели).
export function regionalEligible(id) {
  const m = CRITERIA[id];
  if (!m) return false;
  if (m.driver === 'D2' || m.driver === 'D4') return false;
  if (m.driver === 'D9' && id !== 'D9.3') return false;
  return true;
}

function isHttpUrl(u) {
  return typeof u === 'string' && /^https?:\/\//i.test(u);
}

// --- Ворота кандидата (статика) ---

function fieldOf(cand, field) {
  if (field.startsWith('title.')) {
    const t = cand.title;
    const v = t && typeof t === 'object' ? t[field.slice(6)] : undefined;
    return typeof v === 'string' && v.trim() !== '' ? v : null;
  }
  if (field === 'state_affiliated') return typeof cand.state_affiliated === 'boolean' ? cand.state_affiliated : null;
  const v = cand[field];
  return typeof v === 'string' && v.trim() !== '' ? v : null;
}

// Проверка одного кандидата по статике: обязательные поля, критерий (из 46 и
// слепой в неделе), окно публикации, формат дат, cluster/source_type/URL,
// региональная атрибуция (ADR 0022), форма цитат и их дословность (шов
// opts.readText(id) → текст корпуса | null; нет корпуса — warning).
// Сеть здесь не нужна — URL-гейт отдельно (checkCandidateUrl).
export function checkCandidate(cand, ctx, opts = {}) {
  const blockers = [];
  const warnings = [];
  const c = cand && typeof cand === 'object' ? cand : {};

  const gaps = REQUIRED_FIELDS.filter((f) => fieldOf(c, f) === null);
  if (gaps.length) blockers.push(`обязательные R55-поля не заполнены: ${gaps.join(', ')}`);

  const criterion = typeof c.criterion === 'string' && c.criterion !== '' ? c.criterion : null;
  if (!criterion) {
    blockers.push('критерий не указан (поле criterion)');
  } else if (!Object.prototype.hasOwnProperty.call(CRITERIA, criterion)) {
    blockers.push(`критерий ${criterion} не из 46 критериев методологии`);
  } else if (!ctx.blindSet.has(criterion)) {
    blockers.push(`критерий ${criterion} не слепой в неделе ${ctx.week}`);
  }

  if (fieldOf(c, 'publication_date')) {
    const d = c.publication_date;
    if (!isDateStr(d)) {
      blockers.push(`дата публикации ${d} не в формате YYYY-MM-DD`);
    } else if (d < ctx.window.from || d > ctx.window.to) {
      blockers.push(`дата публикации ${d} вне окна ${ctx.window.from}…${ctx.window.to}`);
    }
  }
  if (fieldOf(c, 'accessed_date') && !isDateStr(c.accessed_date)) {
    blockers.push(`дата доступа ${c.accessed_date} не в формате YYYY-MM-DD`);
  }

  if (fieldOf(c, 'cluster_id') && !ctx.clusters.includes(c.cluster_id)) {
    blockers.push(`cluster_id ${c.cluster_id} вне белого списка PARAMS.clusters`);
  }
  if (fieldOf(c, 'source_type') && !SOURCE_TYPES.includes(c.source_type)) {
    blockers.push(`source_type ${c.source_type} вне {${SOURCE_TYPES.join(', ')}}`);
  }
  if (fieldOf(c, 'url') && !isHttpUrl(c.url)) {
    blockers.push(`url не http(s): ${c.url}`);
  }

  if (c.regions !== undefined) {
    if (!Array.isArray(c.regions)) {
      blockers.push('regions: массив id ожидается');
    } else {
      for (const r of c.regions) {
        if (!ctx.regionIds.includes(r)) {
          blockers.push(`регион ${r} вне таксономии недели ${ctx.taxonomy} (${ctx.regionIds.length} id)`);
        }
      }
      if (criterion && Object.prototype.hasOwnProperty.call(CRITERIA, criterion) && !regionalEligible(criterion)) {
        blockers.push(
          `драйвер ${CRITERIA[criterion].driver} критерия ${criterion} не допустим для региональной атрибуции (ADR 0022)`,
        );
      }
    }
  }

  if (c.quotes !== undefined) {
    const formErrs = validateQuotes([c], Object.keys(CRITERIA));
    for (const e of formErrs) blockers.push(`цитаты: ${e.replace(/^sources\[\d+\]\./, '')}`);
    if (Array.isArray(c.quotes)) {
      const readText = typeof opts.readText === 'function' ? opts.readText : () => null;
      let corpusMissing = false;
      for (const q of c.quotes) {
        if (!q || typeof q !== 'object' || typeof q.text !== 'string') continue;
        const text = readText(c.id);
        if (typeof text !== 'string') {
          corpusMissing = true;
          continue;
        }
        if (!quoteFound(q.text, text)) {
          blockers.push(`цитата не найдена в корпусе дословно (кандидат ${c.id}, критерий ${q.criterion})`);
        }
      }
      if (corpusMissing) warnings.push(`корпус не найден — дословность цитат не проверена (кандидат ${c.id})`);
    }
  }

  return {
    id: c.id,
    criterion,
    verdict: blockers.length ? 'FAIL' : 'OK',
    blockers,
    warnings,
  };
}

// URL-гейт: те же классификация и ретраи, что у ворот ссылок пайплайна
// (calc/linkcheck.js): broken — блокер, blocked — предупреждение.
// Не-HTTP URL в сеть не ходит (urlStatus 'unchecked').
export async function checkCandidateUrl(cand, opts = {}) {
  const url = cand && cand.url;
  if (!isHttpUrl(url)) return { url, status: null, urlStatus: 'unchecked' };
  const r = await checkUrl(url, opts);
  return { url, status: r.status, urlStatus: classify(r.status) };
}

// --- discover: прогон пула кандидатов ---

// Опции: { fetchImpl, checkUrls, retryDelayMs, timeoutMs, readText }.
// checkUrls=false (дефолт) — статика, urlStatus 'unchecked', сеть 0 запросов.
// Независимость (ADR 0026): ≥2 distinct cluster_id среди кандидатов критерия,
// прошедших статику И URL-гейт; один кластер → блокер у каждого прошедшего.
export async function discover(pool, ctx, opts = {}) {
  const checkUrls = opts.checkUrls === true;
  const results = [];
  const counts = { checked: 0, ok: 0, broken: 0, blocked: 0 };

  for (const cand of pool.candidates) {
    const r = checkCandidate(cand, ctx, opts);
    r.source = cand;
    r.urlStatus = 'unchecked';
    if (checkUrls && isHttpUrl(cand.url)) {
      const u = await checkCandidateUrl(cand, opts);
      counts.checked += 1;
      counts[u.urlStatus] += 1;
      r.urlStatus = u.urlStatus;
      if (u.urlStatus === 'broken') {
        r.blockers.push(
          u.status === null ? 'URL недоступен (broken) — ответа не было' : `URL недоступен (broken) — статус ${u.status}`,
        );
        r.verdict = 'FAIL';
      } else if (u.urlStatus === 'blocked') {
        r.warnings.push(`URL заблокирован из среды проверки (blocked, статус ${u.status}) — предупреждение, не отказ`);
      }
    }
    results.push(r);
  }

  const byCriterion = new Map();
  for (const r of results) {
    if (r.blockers.length) continue;
    if (!byCriterion.has(r.criterion)) byCriterion.set(r.criterion, []);
    byCriterion.get(r.criterion).push(r);
  }
  for (const [crit, rs] of byCriterion) {
    const clusters = new Set(rs.map((r) => r.source.cluster_id));
    if (clusters.size < 2) {
      for (const r of rs) {
        r.blockers.push(`независимость: критерий ${crit} — ${clusters.size} кластер(ов) из 2+ требуемых (ADR 0026)`);
        r.verdict = 'FAIL';
      }
    }
  }

  return {
    week: ctx.week,
    window: ctx.window,
    blind: ctx.blind,
    network: checkUrls,
    candidates: results,
    counts,
  };
}

// Разделение отчёта на принятых и отбракованных (для редакционного решения).
export function proposalOf(rep) {
  const accepted = rep.candidates.filter((c) => c.verdict === 'OK');
  const rejected = rep.candidates.filter((c) => c.verdict === 'FAIL');
  return { week: rep.week, window: rep.window, accepted, rejected };
}

// --- Реестр лент ---

// Валидация calc/input/discovery/feeds.json: схема, дедуп id, тип ленты,
// регион (null = международная лента) по whitelist таксономии недели.
export function validateFeeds(doc, regionIds) {
  if (!doc || typeof doc !== 'object' || Array.isArray(doc)) return ['feeds.json: ожидается объект'];
  const errors = [];
  if (doc.schema_version !== 1) {
    errors.push(`schema_version ожидается 1 (найдено ${JSON.stringify(doc.schema_version)})`);
  }
  if (!Array.isArray(doc.feeds)) {
    errors.push('feeds должен быть массивом');
    return errors;
  }
  const allowed = new Set(regionIds);
  const ids = new Set();
  doc.feeds.forEach((f, i) => {
    if (!f || typeof f !== 'object' || Array.isArray(f)) {
      errors.push(`feeds[${i}]: объект ожидается`);
      return;
    }
    if (typeof f.id !== 'string' || f.id === '') {
      errors.push(`feeds[${i}].id обязателен`);
    } else if (ids.has(f.id)) {
      errors.push(`дубль id: ${f.id}`);
    } else {
      ids.add(f.id);
    }
    if (typeof f.name !== 'string' || f.name === '') errors.push(`feeds[${i}].name обязателен`);
    if (f.kind !== 'rss' && f.kind !== 'html') {
      errors.push(`feeds[${i}].kind ожидается rss|html (найдено ${JSON.stringify(f.kind)})`);
    }
    if (f.region !== null && f.region !== undefined) {
      if (typeof f.region !== 'string' || !allowed.has(f.region)) {
        errors.push(`feeds[${i}]: регион ${f.region} вне таксономии (${allowed.size} id)`);
      }
    }
    if (typeof f.url !== 'string' || !isHttpUrl(f.url)) {
      errors.push(`feeds[${i}].url не http(s): ${f.url}`);
    }
  });
  return errors;
}

// Валидация пула кандидатов относительно CLI-недели.
export function validatePool(doc, week) {
  if (!doc || typeof doc !== 'object' || Array.isArray(doc)) return ['ожидается объект'];
  const errors = [];
  if (doc.schema_version !== DISCOVERY_SCHEMA_VERSION) {
    errors.push(`schema_version ожидается ${DISCOVERY_SCHEMA_VERSION} (найдено ${JSON.stringify(doc.schema_version)})`);
  }
  if (doc.week !== week) errors.push(`week ожидается ${week} (найдено ${JSON.stringify(doc.week)})`);
  if (!Array.isArray(doc.candidates)) errors.push('candidates должен быть массивом');
  return errors;
}

// --- Извлечение ссылок из лент ---

function cleanLink(raw) {
  return raw.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '').trim();
}

function parseFeedDate(raw) {
  if (typeof raw !== 'string' || raw.trim() === '') return null;
  const d = new Date(raw.trim());
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function inWindow(date, win) {
  if (date === null) return true; // без даты — остаётся, фильтрует редактор
  return date >= win.from && date <= win.to;
}

// Ссылки ленты, попавшие в окно W−7…W: RSS/Atom — по <item>/<entry>
// (link/CDATA/atom-href, дата pubDate|published|updated), HTML — по
// абсолютным href с датой YYYY-MM-DD в URL. Дедуп по URL, порядок —
// документный; относительные ссылки отбрасываются.
export function extractFeedLinks(text, kind, win) {
  const out = [];
  const seen = new Set();
  const push = (url, date) => {
    if (!isHttpUrl(url) || seen.has(url)) return;
    if (!inWindow(date, win)) return;
    seen.add(url);
    out.push({ url, date });
  };

  if (kind === 'rss') {
    if (typeof text !== 'string' || text === '') return out;
    const blocks = text.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) || [];
    for (const b of blocks) {
      const textM = b.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
      const hrefM = b.match(/<link[^>]*?\bhref=["']([^"']+)["']/i);
      const raw = textM ? textM[1] : hrefM ? hrefM[1] : null;
      if (raw === null) continue;
      const dm =
        b.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i) ||
        b.match(/<published[^>]*>([\s\S]*?)<\/published>/i) ||
        b.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i);
      push(cleanLink(raw), dm ? parseFeedDate(dm[1]) : null);
    }
    return out;
  }

  // html
  if (typeof text !== 'string' || text === '') return out;
  for (const m of text.matchAll(/href=["']([^"']+)["']/gi)) {
    const raw = m[1];
    const dm = raw.match(/(\d{4}-\d{2}-\d{2})/);
    push(raw, dm ? dm[1] : null);
  }
  return out;
}

// Последовательный обход реестра лент (не долбить сайты): ok/blocked/broken
// той же классификацией, что URL-гейт; throw/обрыв → 'error'. Ссылки — только
// окна недели. Сеть только через opts.fetchImpl (дефолт — глобальный fetch).
export async function scanFeeds(feeds, win, opts = {}) {
  const { fetchImpl = fetch } = opts;
  const results = [];
  for (const feed of feeds) {
    try {
      const res = await fetchImpl(feed.url);
      const status = typeof res.status === 'number' ? res.status : null;
      const kind = classify(status);
      if (kind !== 'ok') {
        results.push({ feed, status: kind, links: [] });
        continue;
      }
      const text = await res.text();
      results.push({ feed, status: 'ok', links: extractFeedLinks(text, feed.kind, win) });
    } catch (err) {
      results.push({ feed, status: 'error', links: [], error: String((err && err.message) || err) });
    }
  }
  const count = (s) => results.filter((r) => r.status === s).length;
  return {
    window: win,
    results,
    counts: {
      ok: count('ok'),
      blocked: count('blocked'),
      broken: count('broken'),
      error: count('error'),
      links: results.reduce((n, r) => n + r.links.length, 0),
    },
  };
}

// --- Отчёты ---

export function renderReport(rep) {
  const lines = [];
  lines.push(
    `=== ${rep.week} === окно ${rep.window.from}…${rep.window.to} · слепых критериев: ${rep.blind.length} · кандидатов: ${rep.candidates.length}`,
  );
  for (const c of rep.candidates) {
    let line = `${c.verdict.padEnd(4)} ${c.id} ${c.criterion}`;
    if (c.urlStatus !== 'unchecked') line += ` [${c.urlStatus}]`;
    if (c.blockers.length) line += ` ← ${c.blockers.join(' | ')}`;
    if (c.warnings.length) line += ` ! ${c.warnings.join(' | ')}`;
    lines.push(line);
  }
  const okN = rep.candidates.filter((c) => c.verdict === 'OK').length;
  const failN = rep.candidates.length - okN;
  lines.push(
    rep.network
      ? `сетевых запросов: ${rep.counts.checked} (ok ${rep.counts.ok}, broken ${rep.counts.broken}, blocked ${rep.counts.blocked})`
      : 'сетевых запросов: 0',
  );
  lines.push(`итог: OK ${okN}, FAIL ${failN}`);
  return lines.join('\n');
}

const FEED_STATUS_LABEL = { ok: 'ок', blocked: 'заблокирована', broken: 'битая', error: 'ошибка' };

export function renderFeedScan(scan) {
  const lines = [`=== реестр лент === окно ${scan.window.from}…${scan.window.to} · лент: ${scan.results.length}`];
  for (const r of scan.results) {
    lines.push(`${FEED_STATUS_LABEL[r.status] || r.status} ${r.feed.id} ${r.links.length} ссылок`);
  }
  const c = scan.counts;
  lines.push(`итог: ок ${c.ok}, заблокирована ${c.blocked}, битых ${c.broken}, ошибок ${c.error}, ссылок ${c.links}`);
  return lines.join('\n');
}

// --- Машиночитаемая форма предложения ---

export function discoveryDoc(rep, opts = {}) {
  const { feedScan = null } = opts;
  return {
    schema_version: DISCOVERY_SCHEMA_VERSION,
    week: rep.week,
    window: rep.window,
    blind: rep.blind,
    network: rep.network,
    feed_scan: feedScan
      ? {
          window: feedScan.window,
          results: feedScan.results.map((r) => ({
            id: r.feed.id,
            name: r.feed.name,
            region: r.feed.region ?? null,
            kind: r.feed.kind,
            status: r.status,
            links: r.links,
          })),
        }
      : null,
    candidates: rep.candidates.map((c) => ({
      id: c.id,
      criterion: c.criterion,
      verdict: c.verdict,
      blockers: c.blockers,
      warnings: c.warnings,
      urlStatus: c.urlStatus,
      source: c.source,
    })),
  };
}

// --- CLI ---

// Шов корпуса цитат: calc/input/drafts/texts-<week>/<id>.txt (в .gitignore);
// каталога нет → readText возвращает null (дословность не проверяется).
function corpusReader(week, root) {
  const dir = path.join(root, 'calc', 'input', 'drafts', `texts-${week}`);
  if (!existsSync(dir)) return () => null;
  return (id) => {
    try {
      return readFileSync(path.join(dir, `${id}.txt`), 'utf8');
    } catch {
      return null;
    }
  };
}

function latestWeek(root) {
  let entries;
  try {
    entries = readdirSync(path.join(root, 'data'), { withFileTypes: true });
  } catch {
    return null;
  }
  const weeks = entries
    .filter((e) => e.isDirectory() && isDateStr(e.name))
    .map((e) => e.name)
    .sort();
  return weeks.length ? weeks[weeks.length - 1] : null;
}

function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'));
}

// run(argv, { root }) → { code, lines }: тонкая CLI-обвязка. Статические
// ворота — всегда; сеть — только при --feeds; запись (--write) — только в
// data/discovery/<week>.json, все записи (OK и FAIL), data/<week>/ не
// трогается. exit 1 при ≥1 отбракованном кандидате или ошибке аргументов/
// входов; статусы лент на код выхода не влияют.
export async function run(argv, opts = {}) {
  const root = opts.root || process.cwd();

  let weekArg = null;
  let feeds = false;
  let write = false;
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--week') {
      weekArg = argv[i + 1];
      i += 1;
      if (weekArg === undefined) return { code: 1, lines: ['--week требует дату', ...USAGE] };
    } else if (a === '--feeds') {
      feeds = true;
    } else if (a === '--write') {
      write = true;
    } else {
      return { code: 1, lines: [`неизвестный аргумент ${a}`, ...USAGE] };
    }
  }

  const week = weekArg || latestWeek(root);
  if (!week) return { code: 1, lines: ['неделя не найдена: в data/ нет папок YYYY-MM-DD', ...USAGE] };
  if (!isDateStr(week)) return { code: 1, lines: [`некорректная дата недели: ${week}`, ...USAGE] };

  const inputPath = path.join(root, 'calc', 'input', `${week}.json`);
  if (!existsSync(inputPath)) return { code: 1, lines: [`вход недели не найден: calc/input/${week}.json`] };
  let input;
  try {
    input = readJson(inputPath);
  } catch (err) {
    return { code: 1, lines: [`вход недели не читается: calc/input/${week}.json (${String(err.message)})`] };
  }

  // Реестр лент читается и валидируется раньше пула и раньше любого обхода —
  // битый feeds.json не тратит ни сети, ни прогон кандидатов.
  const context = discoveryContext(week, input);
  let feedsDoc = null;
  if (feeds) {
    const feedsPath = path.join(root, 'calc', 'input', 'discovery', 'feeds.json');
    if (!existsSync(feedsPath)) {
      return { code: 1, lines: ['реестр лент не найден: calc/input/discovery/feeds.json'] };
    }
    try {
      feedsDoc = readJson(feedsPath);
    } catch (err) {
      return { code: 1, lines: [`реестр лент не читается: calc/input/discovery/feeds.json (${String(err.message)})`] };
    }
    const feedErrors = validateFeeds(feedsDoc, context.regionIds);
    if (feedErrors.length) return { code: 1, lines: ['реестр лент невалиден:', ...feedErrors] };
  }

  const poolPath = path.join(root, 'calc', 'input', 'discovery', `${week}.json`);
  if (!existsSync(poolPath)) {
    return { code: 1, lines: [`пул кандидатов не найден: calc/input/discovery/${week}.json`] };
  }
  let pool;
  try {
    pool = readJson(poolPath);
  } catch (err) {
    return { code: 1, lines: [`пул кандидатов не читается: calc/input/discovery/${week}.json (${String(err.message)})`] };
  }
  const poolErrors = validatePool(pool, week);
  if (poolErrors.length) return { code: 1, lines: ['пул кандидатов невалиден:', ...poolErrors] };

  const rep = await discover(pool, context, { checkUrls: feeds, readText: corpusReader(week, root) });
  const lines = renderReport(rep).split('\n');

  let feedScan = null;
  if (feeds) {
    feedScan = await scanFeeds(feedsDoc.feeds, context.window, {});
    lines.push(...renderFeedScan(feedScan).split('\n'));
  }

  if (write) {
    const dir = path.join(root, 'data', 'discovery');
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, `${week}.json`), `${JSON.stringify(discoveryDoc(rep, { feedScan }), null, 2)}\n`);
    lines.push(`записано: data/discovery/${week}.json`);
  }

  return { code: rep.candidates.some((c) => c.verdict === 'FAIL') ? 1 : 0, lines };
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  run(process.argv.slice(2), { root: process.cwd() }).then(({ code, lines }) => {
    for (const l of lines) console.log(l);
    process.exitCode = code;
  });
}
