// classify.js — чистый конвертер «черновик v2 → штатный вход»
// (docs/jev-classification.md §6.1, ADR 0018 доп. 2026-10-11). Jev (внешний
// MCP) здесь не вызывается: модуль — механика ворот правил 9–10 и маппинга
// записей (criterion, source) в критерии входа. Штатные ворота публикации
// (linkcheck, validate, validateInputSources) не повторяются: сырой вход
// проходит их в calc.js как любой ручной вход. Корпус текстов — файлы на
// диске (<corpusDir>/<source_id>.txt), сети нет.
//
// Использование:
//   node calc/classify.js <draft> [--corpus <dir>] [--sources <r55.json>] [--out <path>]
// По умолчанию корпус — calc/input/drafts/texts-<week>/, набор R55 —
// sources из calc/input/<week>.json. Без --out вход печатается в stdout.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { CRITERIA } from './engine.js';
import { PARAMS } from './params.js';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const KINDS = ['event', 'background', 'not_found'];

// --- Нормализация для дословного поиска цитаты (правило 9) ---
// Пробельные runs (вкл. NBSP и переводы строк) → один пробел; типографские
// дефисы/тире/минус → '-'; мягкий перенос удаляется; кавычки-варианты →
// " и '. Усечённые цитаты и перефраз нормализацией не спасаются — это
// граница редактора (§4.9).
export function normalizeText(s) {
  if (typeof s !== 'string') return '';
  return s
    .replace(/\u00AD/g, '')
    .replace(/[\u2010-\u2015\u2212]/g, '-')
    .replace(/[«»„“”‟]/g, '"')
    .replace(/[‘’‚‛ʼ]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// --- Дословная проверка цитаты (правило 9) ---
// quote ищется в text после одинаковой нормализации обеих сторон.
export function quoteFound(quote, text, opts = {}) {
  const q = normalizeText(quote);
  const t = normalizeText(text);
  if (q === '' || t === '') return false;
  return t.includes(q);
}

// --- Схема черновика v2 (§3) ---
// validateDraft(draft) -> массив строк ошибок; [] = черновик валиден.
// kind-дисциплина: quote/url обязательны для любого kind кроме not_found;
// счётный event несёт events[] из params.severityValues (нормировку в value
// делает движок, ADR 0007 — здесь events не сворачивается); value 0..1 —
// для не-счётных event/background и для счётных background; not_found не
// несёт значения; carryover — только D2.*; запись — одна на пару
// (criterion, source_id).
export function validateDraft(draft, params = PARAMS) {
  const clusters = params.clusters || [];
  const severity = params.severityValues || [];
  const errors = [];
  const err = (p, msg) => errors.push(`${p}: ${msg}`);
  if (draft === null || typeof draft !== 'object' || Array.isArray(draft)) {
    return ['корень: ожидается объект черновика v2'];
  }
  if (draft.schema_version !== 2) err('schema_version', 'ожидается 2');
  if (typeof draft.week !== 'string' || !DATE_RE.test(draft.week)) {
    err('week', 'ожидается дата окна YYYY-MM-DD');
  }
  if (draft.generated_by != null && typeof draft.generated_by !== 'string') {
    err('generated_by', 'ожидается строка');
  }
  if (!Array.isArray(draft.items)) {
    err('items', 'ожидается массив записей');
    return errors;
  }
  const seen = new Set();
  draft.items.forEach((it, i) => {
    let p = `items[${i}]`;
    if (!it || typeof it !== 'object' || Array.isArray(it)) {
      err(p, 'ожидается объект записи');
      return;
    }
    const meta = CRITERIA[it.criterion];
    if (!meta) err(`${p}.criterion`, `неизвестный критерий: ${it.criterion}`);
    if (typeof it.source_id !== 'string' || it.source_id === '') {
      err(`${p}.source_id`, 'ожидается непустая строка');
    }
    // читаемый идентификатор записи в путях ошибок: [criterion/source_id]
    p = `items[${i}] [${it.criterion}/${it.source_id}]`;
    if (!KINDS.includes(it.kind)) err(`${p}.kind`, `ожидается один из ${KINDS.join('/')}; получено: ${it.kind}`);
    if (typeof it.cluster !== 'string' || !clusters.includes(it.cluster)) {
      err(`${p}.cluster`, `кластер вне whitelist A–F: ${it.cluster}`);
    }
    if (it.kind !== 'not_found') {
      if (typeof it.quote !== 'string' || it.quote.trim() === '') {
        err(`${p}.quote`, 'дословная цитата обязательна (§4.2)');
      }
      if (typeof it.url !== 'string' || it.url === '') err(`${p}.url`, 'url обязателен (§4.8)');
      const countEvent = it.kind === 'event' && !!meta && meta.scale === 'count';
      const eventsGiven = countEvent && Array.isArray(it.events) && it.events.length > 0;
      if (!countEvent || !eventsGiven) {
        if (typeof it.value !== 'number' || !Number.isFinite(it.value) || it.value < 0 || it.value > 1) {
          err(`${p}.value`, 'ожидается нормированное число 0..1');
        }
      }
      if (it.kind === 'event') {
        if (typeof it.event_date !== 'string' || !DATE_RE.test(it.event_date)) {
          err(`${p}.event_date`, 'ожидается дата события YYYY-MM-DD (§4.1)');
        }
        if (countEvent) {
          if (!Array.isArray(it.events) || it.events.length === 0) {
            err(`${p}.events`, 'счётный event требует непустой events[] (§4.3)');
          } else if (it.events.some((sev) => !severity.includes(sev))) {
            const badW = it.events.filter((sev) => !severity.includes(sev));
            err(`${p}.events`, `допустимые веса: ${severity.join('/')} (§4.3); отклонены: ${badW.join('/')}`);
          } else if (it.value !== undefined) {
            err(`${p}.value`, 'счётный event: value не эмитится вместе с events[] (§4.3)');
          }
        } else if (it.events != null) {
          err(`${p}.events`, 'events допускается только для счётных event-записей (§4.3)');
        }
      } else if (it.events != null) {
        err(`${p}.events`, 'events допускается только для счётных event-записей (§4.3)');
      }
    } else if (it.value != null || it.events != null) {
      err(`${p}.value`, 'not_found не несёт значения (§4.7)');
    }
    if (it.review != null) {
      if (typeof it.review !== 'object' || Array.isArray(it)) {
        err(`${p}.review`, 'ожидается объект {flag, reason?}');
      } else {
        if (typeof it.review.flag !== 'boolean') err(`${p}.review.flag`, 'ожидается boolean');
        if (it.review.reason != null && typeof it.review.reason !== 'string') {
          err(`${p}.review.reason`, 'ожидается строка');
        }
      }
    }
    if (it.carryover != null && typeof it.carryover !== 'boolean') {
      err(`${p}.carryover`, 'ожидается boolean');
    }
    if (it.carryover === true && !(typeof it.criterion === 'string' && it.criterion.startsWith('D2.'))) {
      err(`${p}.carryover`, 'carryover — только для критериев D2.* (§4.6)');
    }
    if (meta && typeof it.source_id === 'string' && it.source_id !== '' && KINDS.includes(it.kind)) {
      const key = `${it.criterion}|${it.source_id}`;
      if (seen.has(key)) err(p, `дубль пары (criterion, source): ${key}`);
      else seen.add(key);
    }
  });
  return errors;
}

// --- Правило 10: неразрешённые пометки ---
// review.flag:true и carryover:true — долг редактора: пока хоть одна есть,
// вход не эмитится. Возвращает [{index, criterion, source_id, kind, reason}].
export function reviewQueue(draft) {
  const items = draft && Array.isArray(draft.items) ? draft.items : [];
  const queue = [];
  items.forEach((it, i) => {
    if (!it || typeof it !== 'object') return;
    if (it.review && it.review.flag === true) {
      queue.push({
        index: i,
        criterion: typeof it.criterion === 'string' ? it.criterion : null,
        source_id: typeof it.source_id === 'string' ? it.source_id : null,
        kind: 'review.flag',
        reason: typeof it.review.reason === 'string' ? it.review.reason : null,
      });
    }
    if (it.carryover === true) {
      queue.push({
        index: i,
        criterion: typeof it.criterion === 'string' ? it.criterion : null,
        source_id: typeof it.source_id === 'string' ? it.source_id : null,
        kind: 'carryover',
        reason: null,
      });
    }
  });
  return queue;
}

// --- Конвертация: черновик v2 + набор R55 + корпус → сырой штатный вход ---
// Ворота здесь: схема v2 (validateDraft) и правила 9–10. Каждая не-not_found
// запись проверяется дословно против корпуса своего источника; отверженная
// запись — в report.rejected и гасит эмиссию (вход не эмитится неполным).
// Отсутствие файла корпуса — отказ записей этого источника, не падение.
// Слияние по критерию: источники склеиваются, events[] конкатенируются,
// value берётся максимальным (одно событие — один критерий, §4.4).
// not_found → criteria[id] = null. r55Sources — массив записей R55 недели;
// источник критерия собирается из записи R55 (url/cluster_id/source_type/
// state_affiliated — канон), date = event_date записи, иначе publication_date.
export function toInput(draft, r55Sources, corpusDir) {
  const report = {
    items: { total: 0, accepted: 0, rejected: 0, notFound: 0 },
    rejected: [],
    review: [],
    missingCorpus: [],
  };
  const errors = [...validateDraft(draft)];
  const queue = reviewQueue(draft);
  report.review = queue;
  if (queue.length) {
    errors.push(`правило 10: неразрешённых пометок ${queue.length} (review.flag/carryover) — вход не эмитится`);
  }
  if (errors.length) return { input: null, report, errors };

  const r55 = Array.isArray(r55Sources) ? r55Sources : [];
  const r55ById = new Map(r55.filter((s) => s && typeof s.id === 'string').map((s) => [s.id, s]));
  const corpusCache = new Map();
  const corpusText = (sourceId) => {
    if (!corpusCache.has(sourceId)) {
      const file = path.join(corpusDir, `${sourceId}.txt`);
      corpusCache.set(sourceId, existsSync(file) ? readFileSync(file, 'utf8') : null);
    }
    return corpusCache.get(sourceId);
  };
  const missingCorpus = new Set();
  const reject = (item, reason) => {
    report.items.rejected += 1;
    report.rejected.push({ criterion: item.criterion, source_id: item.source_id, reason });
    errors.push(`правило 9: ${item.criterion}/${item.source_id}: ${reason}`);
  };

  const byCriterion = new Map();
  for (const item of draft.items) {
    report.items.total += 1;
    if (item.kind === 'not_found') {
      report.items.notFound += 1;
      continue;
    }
    const r = r55ById.get(item.source_id);
    if (!r) {
      reject(item, 'источник вне набора R55 (§4.8)');
      continue;
    }
    if (item.url !== r.url) {
      reject(item, 'url записи не совпадает с набором R55 (§4.8)');
      continue;
    }
    const text = corpusText(item.source_id);
    if (text === null) {
      missingCorpus.add(item.source_id);
      reject(item, `корпус не предоставлен: ${item.source_id}.txt отсутствует`);
      continue;
    }
    if (!quoteFound(item.quote, text)) {
      reject(item, 'цитата не найдена дословно в тексте источника');
      continue;
    }
    report.items.accepted += 1;
    let entry = byCriterion.get(item.criterion);
    if (!entry) {
      entry = { events: [], values: [], sources: [] };
      byCriterion.set(item.criterion, entry);
    }
    const src = { url: r.url, date: typeof item.event_date === 'string' ? item.event_date : r.publication_date, cluster: r.cluster_id };
    if (typeof r.source_type === 'string') src.type = r.source_type;
    if (typeof r.state_affiliated === 'boolean') src.state_affiliated = r.state_affiliated;
    entry.sources.push(src);
    if (Array.isArray(item.events)) entry.events.push(...item.events);
    if (typeof item.value === 'number') entry.values.push(item.value);
  }
  report.missingCorpus = [...missingCorpus];

  const criteria = {};
  for (const [id, e] of byCriterion) {
    const out = { covered: true, sources: e.sources };
    if (CRITERIA[id].scale === 'count' && e.events.length > 0) out.events = e.events;
    else out.value = e.values.length ? Math.max(...e.values) : 0;
    criteria[id] = out;
  }
  for (const item of draft.items) {
    if (item.kind === 'not_found' && !criteria[item.criterion]) criteria[item.criterion] = null;
  }

  const input = errors.length ? null : { week: draft.week, criteria, sources: r55 };
  return { input, report, errors };
}

// --- Загрузка черновика с диска ---
export function loadDraft(file) {
  let raw;
  try {
    raw = readFileSync(file, 'utf8');
  } catch (e) {
    throw new Error(`${file}: не читается (${e.message})`);
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`${file}: не парсится JSON (${e.message})`);
  }
}

// --- CLI ---
function usage() {
  return 'использование: node calc/classify.js <draft> [--corpus <dir>] [--sources <r55.json>] [--out <path>]';
}

function main() {
  const args = process.argv.slice(2);
  const FLAGS = ['--corpus', '--sources', '--out'];
  const opts = {};
  const positional = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (FLAGS.includes(a)) {
      if (i + 1 >= args.length) {
        process.stdout.write(`${a}: ожидается значение\n${usage()}\n`);
        process.exitCode = 1;
        return;
      }
      opts[a] = args[i + 1];
      i += 1;
    } else if (a.startsWith('--')) {
      process.stdout.write(`неизвестный флаг: ${a}\n${usage()}\n`);
      process.exitCode = 1;
      return;
    } else {
      positional.push(a);
    }
  }
  if (positional.length !== 1) {
    process.stdout.write(usage() + '\n');
    process.exitCode = 1;
    return;
  }
  const opt = (name) => opts[name] ?? null;
  const draftPath = positional[0];
  let draft;
  try {
    draft = loadDraft(draftPath);
  } catch (e) {
    process.stdout.write(`${e.message}\n`);
    process.exitCode = 1;
    return;
  }
  const week = draft && typeof draft.week === 'string' ? draft.week : null;
  const here = path.dirname(fileURLToPath(import.meta.url));
  const corpusDir = opt('--corpus') || (week ? path.join(here, 'input', 'drafts', `texts-${week}`) : null);
  const sourcesPath = opt('--sources') || (week ? path.join(here, 'input', `${week}.json`) : null);
  if (!corpusDir) {
    process.stdout.write('корпус не указан и неделя черновика не читается — задайте --corpus\n');
    process.exitCode = 1;
    return;
  }
  let r55 = null;
  if (sourcesPath && existsSync(sourcesPath)) {
    try {
      const parsed = JSON.parse(readFileSync(sourcesPath, 'utf8'));
      r55 = Array.isArray(parsed) ? parsed : parsed.sources;
    } catch (e) {
      process.stdout.write(`${sourcesPath}: не парсится JSON (${e.message})\n`);
      process.exitCode = 1;
      return;
    }
  }
  if (!Array.isArray(r55)) {
    process.stdout.write('набор R55 недели не найден — передайте его через --sources <r55.json>\n');
    process.exitCode = 1;
    return;
  }

  const { input, report, errors } = toInput(draft, r55, corpusDir);
  const lines = [
    `записей: ${report.items.total} (принято ${report.items.accepted}, отвергнуто ${report.items.rejected}, not_found ${report.items.notFound})`,
    `критериев покрыто: ${input ? Object.values(input.criteria).filter((c) => c && c.covered === true).length : 0}, not_found → null: ${input ? Object.values(input.criteria).filter((c) => c === null).length : 0}`,
  ];
  if (report.missingCorpus.length) lines.push(`корпус отсутствует для: ${report.missingCorpus.join(', ')}`);
  for (const rj of report.rejected) lines.push(`  отказ: ${rj.criterion}/${rj.source_id} — ${rj.reason}`);
  for (const e of errors) lines.push(`  ошибка: ${e}`);
  if (input) {
    lines.push('вход эмитирован');
    const out = opt('--out');
    if (out) writeFileSync(out, JSON.stringify(input, null, 2) + '\n', 'utf8');
    else process.stdout.write(JSON.stringify(input, null, 2) + '\n');
  } else {
    lines.push('вход НЕ эмитирован');
  }
  process.stdout.write(lines.join('\n') + '\n');
  process.exitCode = input ? 0 : 1;
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
