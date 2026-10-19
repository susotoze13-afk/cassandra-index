// js/sections/contribution.js — «Почему индекс изменился» (ADR 0062): водопад
// «прошлая неделя → вклады драйверов → эта неделя», разложение опубликованного
// индекса по девяти драйверам с top-3 критериями и блок «что бы изменило
// оценку». Источник — data/analysis.js (window.CI_ANALYSIS), зеркало
// data/public/*: сайт по конвенции не грузит публичный слой.
//
// Ничего не пересчитывается: числа приходят готовыми. Нет недели в зеркале
// (демо-история 1.0, архив без входа) — секция скрыта целиком, а не показывает
// нули. Чистые швы без DOM: analysisFor, waterfallRows, levelRows, whatRows,
// barWidth, formatPp.

import { t } from '../i18n.js';
import { el } from '../ui.js';

// Пункты индекса: «+5.7», «−7.2», «0». Минус — типографский (U+2212), как в
// остальных подписях изменений; дробная часть — не больше одной.
export function formatPp(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
  const text = Math.abs(value).toFixed(1).replace(/\.0$/, '');
  if (value > 0) return `+${text}`;
  if (value < 0) return `−${text}`;
  return '0';
}

// Подпись драйвера для узкой колонки водопада: модельный id D1…D9 → «Д1»…«Д9».
// Полное название («Д1. Военная активность») остаётся в таблице разложения.
export function driverLabel(id) {
  return /^D[1-9]$/.test(id) ? `Д${id.slice(1)}` : id;
}

// analysisFor(store, week) → {drivers, waterfall, what} | null. store — форма
// window.CI_ANALYSIS ({weeks: {<неделя>: {...}}}). Битая/отсутствующая запись
// даёт null: секция молчит, страница не падает.
export function analysisFor(store, week) {
  if (!store || typeof store !== 'object' || !store.weeks || typeof week !== 'string') {
    return null;
  }
  const raw = store.weeks[week];
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const drivers = Array.isArray(raw.driver_breakdown)
    ? raw.driver_breakdown.filter((d) => d && typeof d === 'object')
    : [];
  const waterfall = raw.waterfall && Array.isArray(raw.waterfall.steps)
    ? raw.waterfall
    : null;
  const what = raw.what_would_change && Array.isArray(raw.what_would_change.criteria)
    ? raw.what_would_change
    : null;
  if (!drivers.length && !waterfall) return null;
  return { drivers, waterfall, what };
}

// waterfallRows(waterfall, drivers) — шаги в порядке модели + остаток механики.
// Нулевые шаги остаются: «драйвер не изменился» — полезный факт, а не пропуск.
// Подпись — название драйвера из driver_breakdown (журналисту «Д1» мало);
// без него — короткая подпись «Д1».
export function waterfallRows(waterfall, drivers) {
  if (!waterfall || !Array.isArray(waterfall.steps)) return null;
  const names = new Map();
  for (const d of Array.isArray(drivers) ? drivers : []) {
    if (d && typeof d.id === 'string' && d.name && typeof d.name.ru === 'string') {
      names.set(d.id, d.name.ru);
    }
  }
  const rows = waterfall.steps
    .filter((s) => s && typeof s.driver === 'string'
      && typeof s.contribution_pp === 'number' && Number.isFinite(s.contribution_pp))
    .map((s) => ({
      id: s.driver,
      label: names.get(s.driver) || driverLabel(s.driver),
      pp: s.contribution_pp,
    }));
  return {
    from: waterfall.from && typeof waterfall.from.index === 'number' ? waterfall.from : null,
    to: waterfall.to && typeof waterfall.to.index === 'number' ? waterfall.to : null,
    rows,
    residual: typeof waterfall.residual_pp === 'number' ? waterfall.residual_pp : null,
  };
}

// levelRows(drivers) — разложение опубликованного индекса: вклад драйвера и
// id top-критериев (названия критериев не дублируются — они уже в снапшоте
// и в секции «Методология»).
export function levelRows(drivers) {
  return (Array.isArray(drivers) ? drivers : [])
    .filter((d) => d && typeof d.id === 'string' && typeof d.contribution_pp === 'number')
    .map((d) => ({
      id: d.id,
      name: d.name && typeof d.name.ru === 'string' ? d.name.ru : d.id,
      pp: d.contribution_pp,
      top: (Array.isArray(d.top_criteria) ? d.top_criteria : [])
        .map((c) => (c && typeof c.id === 'string'
          ? { id: c.id, name: c.name && typeof c.name.ru === 'string' ? c.name.ru : c.id }
          : null))
        .filter(Boolean),
    }));
}

// whatRows(what) — «что бы изменило оценку»: пороги и до трёх критериев.
export function whatRows(what) {
  if (!what || !Array.isArray(what.criteria)) return null;
  const threshold = (v) => (v && typeof v.index === 'number'
    ? { state: typeof v.state === 'string' ? v.state : null, index: v.index, gap: v.gap_pp }
    : null);
  return {
    state: typeof what.state === 'string' ? what.state : null,
    down: threshold(what.thresholds && what.thresholds.down),
    up: threshold(what.thresholds && what.thresholds.up),
    criteria: what.criteria
      .filter((c) => c && typeof c.id === 'string')
      .map((c) => ({
        id: c.id,
        name: c.name && typeof c.name.ru === 'string' ? c.name.ru : c.id,
        pp: c.impact_pp,
        effect: c.effect === 'up' ? 'up' : 'down',
        crosses: c.crosses_state === true,
        breaks: c.breaks_driver === true,
      })),
  };
}

// barWidth(pp, maxAbs) — ширина полосы в процентах, минимум 2 % для ненулевого
// вклада (иначе «+0.2» рисуется пустотой).
export function barWidth(pp, maxAbs) {
  if (typeof pp !== 'number' || !(maxAbs > 0)) return 0;
  if (pp === 0) return 0;
  return Math.max(2, Math.round((Math.abs(pp) / maxAbs) * 100));
}

function bar(pp, maxAbs) {
  const node = el('span', 'contribution-bar');
  node.setAttribute('aria-hidden', 'true');
  node.style.width = `${barWidth(pp, maxAbs)}%`;
  node.classList.add(pp < 0 ? 'contribution-bar--down' : 'contribution-bar--up');
  return node;
}

function renderWaterfall(model, lang) {
  const wrap = el('div', 'contribution-waterfall');
  const maxAbs = Math.max(0.1, ...model.rows.map((r) => Math.abs(r.pp)),
    model.residual === null ? 0 : Math.abs(model.residual));

  if (model.from && model.to) {
    const delta = model.to.index - model.from.index;
    wrap.appendChild(el('p', 'contribution-lead', delta === 0
      ? t(lang, 'contribution.summary.flat', { value: model.to.index })
      : t(lang, 'contribution.summary', {
        from: model.from.index,
        to: model.to.index,
        delta: formatPp(delta),
      })));
  }

  const list = el('ul', 'contribution-steps');
  for (const row of model.rows) {
    const item = el('li', 'contribution-step');
    item.appendChild(el('span', 'contribution-step-label', row.label));
    item.appendChild(el('span', 'contribution-step-value', formatPp(row.pp)));
    item.appendChild(bar(row.pp, maxAbs));
    list.appendChild(item);
  }
  if (model.residual !== null) {
    const item = el('li', 'contribution-step contribution-step--residual');
    item.appendChild(el('span', 'contribution-step-label', t(lang, 'contribution.residual')));
    item.appendChild(el('span', 'contribution-step-value', formatPp(model.residual)));
    item.appendChild(bar(model.residual, maxAbs));
    list.appendChild(item);
  }
  wrap.appendChild(list);

  if (model.to) {
    wrap.appendChild(el('p', 'contribution-total',
      t(lang, 'contribution.total', { value: model.to.index })));
  }
  return wrap;
}

function renderBreakdown(rows, index, lang) {
  if (!rows.length) return null;
  const details = el('details', 'contribution-breakdown');
  details.appendChild(el('summary', 'contribution-summary-toggle',
    t(lang, 'contribution.breakdown')));
  if (typeof index === 'number') {
    details.appendChild(el('p', 'contribution-note',
      t(lang, 'contribution.breakdown.note', { index })));
  }

  const table = el('table', 'contribution-table');
  const caption = el('caption', 'sr-only', t(lang, 'contribution.table.caption'));
  table.appendChild(caption);
  const head = el('tr');
  head.appendChild(el('th', null, t(lang, 'contribution.table.driver')));
  head.appendChild(el('th', null, t(lang, 'contribution.table.points')));
  head.appendChild(el('th', null, t(lang, 'contribution.table.criteria')));
  const thead = el('thead');
  thead.appendChild(head);
  table.appendChild(thead);

  const tbody = el('tbody');
  for (const row of rows) {
    const tr = el('tr');
    tr.appendChild(el('th', null, row.name));
    tr.appendChild(el('td', 'contribution-table-pp', formatPp(row.pp)));
    tr.appendChild(el('td', null, row.top.length
      ? row.top.map((c) => `${c.id} — ${c.name}`).join('; ')
      : t(lang, 'contribution.criteria.none')));
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  details.appendChild(table);
  return details;
}

function renderWhat(model, lang) {
  if (!model) return null;
  const wrap = el('div', 'contribution-what');
  wrap.appendChild(el('h3', 'contribution-what-title', t(lang, 'contribution.what.title')));

  const thresholds = [];
  const gapText = (gap) => (typeof gap === 'number' && Number.isFinite(gap)
    ? String(Math.abs(gap)) : '—');
  if (model.down) thresholds.push(t(lang, 'contribution.what.down', {
    index: model.down.index,
    state: model.down.state ? t(lang, `status.${model.down.state}`) : '—',
    gap: gapText(model.down.gap),
  }));
  if (model.up) thresholds.push(t(lang, 'contribution.what.up', {
    index: model.up.index,
    state: model.up.state ? t(lang, `status.${model.up.state}`) : '—',
    gap: gapText(model.up.gap),
  }));
  if (thresholds.length) {
    wrap.appendChild(el('p', 'contribution-note', thresholds.join(' ')));
  }

  const list = el('ul', 'contribution-what-list');
  for (const c of model.criteria) {
    const tail = c.crosses ? t(lang, 'contribution.what.crosses') : '';
    const breaks = c.breaks ? t(lang, 'contribution.what.breaks') : '';
    list.appendChild(el('li', 'contribution-what-item',
      t(lang, 'contribution.what.item', {
        id: c.id,
        name: c.name,
        impact: formatPp(c.pp),
        tail: `${tail}${breaks}`,
      })));
  }
  wrap.appendChild(list);
  wrap.appendChild(el('p', 'contribution-note', t(lang, 'contribution.what.note')));
  return wrap;
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="contribution"]');
  if (!host) return;
  const section = typeof host.closest === 'function'
    ? host.closest('.contribution-section')
    : null;

  host.textContent = '';
  const store = typeof window !== 'undefined' ? window.CI_ANALYSIS : null;
  const data = analysisFor(store, appState?.week);
  if (section) section.hidden = !data;
  if (!data) return;

  const lang = appState?.lang ?? 'ru';
  const waterfall = waterfallRows(data.waterfall, data.drivers);
  if (waterfall) host.appendChild(renderWaterfall(waterfall, lang));

  const index = waterfall && waterfall.to
    ? waterfall.to.index
    : (appState?.snapshot?.global?.index ?? null);
  const breakdown = renderBreakdown(levelRows(data.drivers), index, lang);
  if (breakdown) host.appendChild(breakdown);

  const what = renderWhat(whatRows(data.what), lang);
  if (what) host.appendChild(what);
}
