// history-debt.js — учёт долга истории источников (ADR 0040).
// Чистый модуль: ни сети, ни диска, ни DOM. На вход — уже разобранные входы
// недель ({ week, input }); чтение диска — за вызывающим (calc.js,
// backfill-report.js). Мотивация: хранение источников у проекта есть (входы,
// sources.js, git), а покрытия нет — слепой критерий той недели не собирали.
// Долг истории — это конкретно причина not-collected, а не любая слепота.
import { CRITERIA } from './engine.js';
import { PARAMS } from './params.js';

// Причина слепоты критерия (ADR 0040, Q9). Три разных смысла одного пустого
// критерия:
//   not-collected — критерия тогда не было / его не собирали → долг истории;
//   searched-none — искали и не нашли → честное отсутствие сигнала;
//   gate-failed   — нашли, но ворота независимости (§4.1.2) не пройдены.
export const BLIND_REASONS = ['not-collected', 'searched-none', 'gate-failed'];

// Происхождение записи (Q16): собрано в ту неделю или добавлено задним числом
// при смене методологии. Серия с backfill'ом выглядит однородной, но ею не
// является (прецедент D4.6 — ADR 0021, docs/calibration-journal.md:254).
export const ORIGINS = ['collected-in-week', 'editorial-backfill'];

// Причины отбраковки (Q8): что читали, но не отобрали. Тексты не хранятся.
export const REJECT_REASONS = ['duplicate', 'out-of-window', 'wrong-criterion', 'weak', 'unavailable'];

// Причина, которая и есть долг истории.
export const DEBT_REASON = 'not-collected';

const criteriaOf = (input) => (input && typeof input.criteria === 'object' && input.criteria) || {};
const isCovered = (entry) => Boolean(entry) && entry.covered === true;

// Причина слепоты недели для критерия: значение enum или 'unknown'
// (старые входы без поля — не приписываем причину задним числом).
export function blindReasonOf(input, id) {
  const map = input && input.blindReasons;
  if (!map || typeof map !== 'object') return 'unknown';
  const reason = map[id];
  return BLIND_REASONS.includes(reason) ? reason : 'unknown';
}

// Долг одной недели: слепые критерии разложены по причинам. legacySkeleton —
// ранние недели-скелеты (08-30/09-06/09-13 до 2026-09-25): их цифры не
// равноценны остальным, и в сводке они идут отдельной строкой.
export function weekDebt(week, input) {
  const criteria = criteriaOf(input);
  const items = [];
  for (const id of Object.keys(CRITERIA)) {
    if (isCovered(criteria[id])) continue;
    items.push({ criterion: id, reason: blindReasonOf(input, id) });
  }
  const byReason = { unknown: 0 };
  for (const r of BLIND_REASONS) byReason[r] = 0;
  for (const it of items) byReason[it.reason] += 1;
  return {
    week,
    legacySkeleton: Boolean(input && input.legacy_skeleton === true),
    items,
    total: items.length,
    debt: byReason[DEBT_REASON],
    byReason,
  };
}

// Сводка по набору недель. debt — критерий-недели с причиной not-collected;
// weeksWithDebt — сколько недель затронуто; unknown — слепые без причины
// (архив до PARAMS.blindReasonFrom или неполный вход).
export function debtReport(weeks, params = PARAMS) {
  const perWeek = weeks.map(({ week, input }) => weekDebt(week, input));
  const byReason = { unknown: 0 };
  for (const r of BLIND_REASONS) byReason[r] = 0;
  for (const w of perWeek) {
    for (const [r, n] of Object.entries(w.byReason)) byReason[r] += n;
  }
  const debtWeeks = perWeek.filter((w) => w.debt > 0);
  return {
    weeks: perWeek,
    debt: byReason[DEBT_REASON],
    weeksWithDebt: debtWeeks.length,
    debtWeekIds: debtWeeks.map((w) => w.week),
    byReason,
    unknown: byReason.unknown,
    legacy: perWeek.filter((w) => w.legacySkeleton).map((w) => w.week),
    backfillWindow: Number.isInteger(params && params.backfillWindow) ? params.backfillWindow : null,
  };
}

// Дательный падеж для «по N неделям»: по 1 неделе, по 21 неделе, по 3 неделям.
function weeksDative(n) {
  return (n % 10 === 1 && n % 100 !== 11) ? 'неделе' : 'неделям';
}

// Родительный падеж для «N недель»: 1 неделя, 2–4 недели, 5+ недель.
export function weeksGenitive(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'неделя';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'недели';
  return 'недель';
}

// Строка отчёта: «долг истории: N критерий-недель по M неделям» + отдельно
// причина неизвестна и недели-скелеты. Печатается calc.js в каждом прогоне.
export function debtLine(report) {
  const parts = [`долг истории: ${report.debt} критерий-недель по ${report.weeksWithDebt} ${weeksDative(report.weeksWithDebt)}`];
  if (report.unknown) {
    parts.push(`причина неизвестна: ${report.unknown} (архив до ${PARAMS.blindReasonFrom} или неполный вход)`);
  }
  if (report.legacy && report.legacy.length) {
    parts.push(`ранние недели-скелеты: ${report.legacy.join(', ')}`);
  }
  return parts.join('; ');
}

// Чек-лист дозабора (ADR 0040, Q7/Q15): для каждого критерия из
// PARAMS.backfillCriteria берём неделю первого покрытия и до backfillWindow
// непосредственно предшествующих недель цепочки. Только информационный список:
// ничего не собирает и не пишет. Окно смотрит только назад: слепота ПОСЛЕ
// первого покрытия — состояние той недели, а не долг истории.
export function backfillTasks(weeks, params = PARAMS) {
  const windowSize = Number.isInteger(params && params.backfillWindow) ? params.backfillWindow : 4;
  const targets = params && Array.isArray(params.backfillCriteria) ? params.backfillCriteria : [];
  const ordered = weeks
    .filter((w) => w && typeof w.week === 'string')
    .slice()
    .sort((a, b) => (a.week < b.week ? -1 : a.week > b.week ? 1 : 0));
  const tasks = [];
  for (const id of targets) {
    if (!CRITERIA[id]) continue;
    const first = ordered.findIndex(({ input }) => isCovered(criteriaOf(input)[id]));
    if (first < 0) {
      tasks.push({ criterion: id, week: null, reason: 'never-covered', windowStart: null });
      continue;
    }
    const from = Math.max(0, first - windowSize);
    for (let i = from; i < first; i += 1) {
      const { week, input } = ordered[i];
      tasks.push({
        criterion: id,
        week,
        reason: blindReasonOf(input, id),
        firstCovered: ordered[first].week,
      });
    }
  }
  return tasks;
}

// Реестр отбраковки (Q8/Q18): warning, не ворота. Кривая строка в rejected[]
// не должна отменять запись недели с ценными данными (в отличие от R55).
export function validateRejected(input) {
  const warnings = [];
  if (!input || input.rejected === undefined) return warnings;
  if (!Array.isArray(input.rejected)) return ['rejected: must be an array'];
  input.rejected.forEach((item, i) => {
    const pfx = `rejected[${i}]`;
    if (!item || typeof item !== 'object') { warnings.push(`${pfx}: object required`); return; }
    if (typeof item.url !== 'string' || !/^https?:\/\//.test(item.url)) {
      warnings.push(`${pfx}.url: http(s) URL required`);
    }
    if (typeof item.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
      warnings.push(`${pfx}.date: YYYY-MM-DD required`);
    }
    if (!REJECT_REASONS.includes(item.reason)) {
      warnings.push(`${pfx}.reason: ${REJECT_REASONS.join('|')}`);
    }
    if (item.origin !== undefined && !ORIGINS.includes(item.origin)) {
      warnings.push(`${pfx}.origin: ${ORIGINS.join('|')}`);
    }
    if (item.note !== undefined && typeof item.note !== 'string') {
      warnings.push(`${pfx}.note: string`);
    }
  });
  return warnings;
}

// Причина слепоты обязательна с PARAMS.blindReasonFrom (warning, не ворота):
// без неё через год не отличить долг истории от честного отсутствия сигнала,
// и дозабор будут гонять вслепую. Обратная сторона тоже проверяется: причина
// на покрытом критерии или на неизвестном id — бессмысленна.
export function validateBlindReasons(input, params = PARAMS) {
  const warnings = [];
  const from = params && params.blindReasonFrom;
  if (!input || typeof input.week !== 'string' || typeof from !== 'string' || from === '') return warnings;
  if (input.week < from) return warnings;
  const criteria = criteriaOf(input);
  const map = input.blindReasons && typeof input.blindReasons === 'object' ? input.blindReasons : {};
  for (const id of Object.keys(CRITERIA)) {
    if (isCovered(criteria[id])) continue;
    if (!BLIND_REASONS.includes(map[id])) {
      warnings.push(`blindReasons.${id}: причина слепоты обязательна с ${from} (${BLIND_REASONS.join('|')})`);
    }
  }
  for (const id of Object.keys(map)) {
    if (!CRITERIA[id]) { warnings.push(`blindReasons.${id}: критерий вне CRITERIA`); continue; }
    if (isCovered(criteria[id])) warnings.push(`blindReasons.${id}: критерий покрыт — причина не применяется`);
  }
  return warnings;
}
