// Секция «Что это значит для моего региона?» (регистрируется как 'regions'):
// ranked-лист всех 6 регионов по недельному изменению (§4.6, §5.1).
// Семантический ol/li — не карта: карта не может быть единственным источником
// значения. Клик/фокус раскрывает карточку: статус, Δ, драйверы, уверенность
// (с причиной при сниженной), источники — тот же аккордеон-шаблон, что в таске 03
// (переиспользуются чистые швы sourcesLabel/visibleSources/confidenceInfo из drivers.js).
// Чистые швы (rankedRegions, statusLabel) — без DOM, тестируются.

import { t, date } from '../i18n.js';
import * as risk from '../risk.js';
import * as region from '../region.js';
import { formatDelta, deltaArrow } from './hero.js';
import { sourcesLabel, visibleSources, confidenceInfo, levelLabel, driverLabel } from './drivers.js';

// Ranked-лист: все регионы снапшота по убыванию |Δ|; при равенстве |Δ| рост выше
// снижения, дальше — порядок справочника. Битые записи пропускаем.
export function rankedRegions(snapshot) {
  const regs = snapshot?.regions;
  if (!regs || typeof regs !== 'object') return [];
  const rows = [];
  for (const r of region.REGIONS) {
    const d = regs[r.id];
    if (!d || typeof d.delta !== 'number' || !Number.isFinite(d.delta)) continue;
    rows.push({ id: r.id, ...d });
  }
  const order = new Map(region.REGIONS.map((r, i) => [r.id, i]));
  rows.sort((a, b) => {
    const byAbs = Math.abs(b.delta) - Math.abs(a.delta);
    if (byAbs !== 0) return byAbs;
    if (b.delta !== a.delta) return b.delta - a.delta;
    return order.get(a.id) - order.get(b.id);
  });
  return rows;
}

// Слово статуса: нижний регистр — для встроенной строки (как в hero), верхний —
// для автономной подписи в карточке региона. Шкала §10 + словарь; вне шкалы — ''.
export function statusLabel(lang, index, lower = true) {
  const id = risk.status(index);
  return id ? t(lang, `${lower ? 'statusLower' : 'status'}.${id}`) : '';
}

// ---------- DOM ----------

const DELTA_CLASS = {
  '--state-very': 'delta--rise',
  '--state-calm': 'delta--fall',
  '--text-secondary': 'delta--same',
};

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function deltaSpan(lang, value, extraClass = '') {
  const span = el('span', `delta ${extraClass}`.trim());
  const cls = DELTA_CLASS[risk.deltaTone(value)];
  if (cls) span.classList.add(cls);
  const sign = risk.deltaTone(value) === '--text-secondary' ? '→' : deltaArrow(value);
  span.textContent = `${sign} ${formatDelta(value)}`;
  span.setAttribute('aria-label', `${t(lang, 'hero.week.change')}: ${formatDelta(value)}`);
  return span;
}

// Источники драйвера — аккордеон-шаблон таска 03 (§4.3.1): та же разметка и классы.
function buildSourcesAccordion(lang, drv, uid) {
  const sources = Array.isArray(drv?.sources) ? drv.sources : [];
  const wrap = el('div', 'region-driver-sources');
  if (!sources.length) return wrap;

  const listId = `region-src-${uid}`;
  const list = el('ul', 'driver-sources');
  list.id = listId;
  const moreBtn = el('button', 'driver-sources-more', t(lang, 'drivers.sources.showAll'));
  moreBtn.type = 'button';
  moreBtn.hidden = true;

  const state = { expanded: false, showAll: false };

  const paint = () => {
    const { shown, remaining } = visibleSources(sources, state.showAll);
    list.innerHTML = '';
    for (const src of shown) {
      const li = el('li', 'driver-source');
      const a = el('a', 'driver-source-link');
      a.href = src.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.append(el('span', 'driver-source-title', src.title?.[lang] ?? src.title?.ru ?? ''));
      const meta = el('span', 'driver-source-meta');
      meta.append(el('span', 'driver-source-domain', src.domain ?? ''));
      meta.append(el('span', 'driver-source-date', date(lang, src.date, true)));
      a.append(meta);
      li.append(a);
      list.append(li);
    }
    moreBtn.hidden = !state.expanded || (!state.showAll && remaining === 0);
    moreBtn.textContent = state.showAll
      ? t(lang, 'drivers.sources.hideAll')
      : t(lang, 'drivers.sources.showAll');
    list.hidden = !state.expanded;
    toggle.setAttribute('aria-expanded', String(state.expanded));
    toggle.querySelector('[data-role="src-count"]').textContent = state.expanded
      ? `${sourcesLabel(lang, sources.length)} — ${t(lang, 'drivers.sources.hide')}`
      : sourcesLabel(lang, sources.length);
    toggle.classList.toggle('is-open', state.expanded);
  };

  const toggle = el('button', 'src-toggle');
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', listId);
  const label = el('span', 'src-toggle-label', '');
  label.dataset.role = 'src-count';
  toggle.append(label);
  toggle.addEventListener('click', () => {
    state.expanded = !state.expanded;
    paint();
  });
  moreBtn.addEventListener('click', () => {
    state.showAll = !state.showAll;
    paint();
  });

  paint();
  wrap.append(toggle, list, moreBtn);
  return wrap;
}

// Главные драйверы региона — кратко: лейбл/наблюдение, вклад и уверенность словами,
// причина при сниженной уверенности (общий компонент confidenceInfo, таск 03).
function buildDriverBlock(lang, drv, uid) {
  const block = el('div', 'region-driver');

  const label = driverLabel(lang, drv);
  if (label) block.append(el('h4', 'region-driver-label', label));
  block.append(el('p', 'region-driver-observation', drv.observation?.[lang] ?? ''));

  const meta = el('p', 'driver-meta');
  const contribution = el('span', 'driver-chip');
  contribution.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.contribution.label')}:`));
  contribution.append(el('span', 'driver-chip-value', levelLabel(lang, 'contribution', drv.contribution)));
  const conf = confidenceInfo(lang, drv);
  const confidence = el('span', 'driver-chip');
  confidence.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.confidence.label')}:`));
  confidence.append(el('span', 'driver-chip-value', conf.word));
  meta.append(contribution, el('span', 'driver-meta-sep', '·'), confidence);
  block.append(meta);
  if (conf.note) block.append(el('p', 'driver-confidence-note', conf.note));

  block.append(buildSourcesAccordion(lang, drv, uid));
  return block;
}

// Раскрытая карточка региона (§4.6): статус, Δ, уверенность региона, драйверы, источники.
function buildDetail(lang, row, data, personal) {
  const detail = el('div', 'region-detail');

  // Статус + индекс + Δ: значения не только цветом — слова и знак рядом с тоном (§12).
  const head = el('p', 'region-detail-head');
  head.append(el('span', 'status', statusLabel(lang, row.index, false)));
  head.append(el('span', 'region-detail-index', `${row.index} ${t(lang, 'hero.index.of')}`));
  const d = deltaSpan(lang, row.delta);
  d.append(el('span', 'region-detail-week', ` ${t(lang, 'hero.week.change')}`));
  head.append(d);
  detail.append(head);

  // Уверенность по региону — словами; причина — если снапшот её отдаёт (поле
  // confidenceNote на уровне региона; демо-данные пока несут причины на драйверах —
  // они показываются ниже в блоках драйверов через тот же confidenceInfo).
  const conf = confidenceInfo(lang, data);
  const confLine = el('p', 'driver-meta');
  const chip = el('span', 'driver-chip');
  chip.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.confidence.label')}:`));
  chip.append(el('span', 'driver-chip-value', conf.word));
  confLine.append(chip);
  detail.append(confLine);
  if (conf.note) detail.append(el('p', 'driver-confidence-note', conf.note));

  // Приписка про контекстный риск — всегда в карточке (§5.1: индекс привязан к региону).
  detail.append(el('p', 'region-note', t(lang, 'region.note')));

  const drivers = Array.isArray(data?.drivers) ? data.drivers : [];
  if (drivers.length) {
    detail.append(el('h3', 'region-detail-subtitle', t(lang, 'regions.drivers')));
    drivers.forEach((drv, i) => detail.append(buildDriverBlock(lang, drv, `${row.id}-${i}`)));
  }

  return detail;
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="regions"]');
  if (!host) return;
  const { lang, snapshot } = appState;
  const personal = appState.region;
  host.innerHTML = '';

  const rows = rankedRegions(snapshot);
  if (!rows.length) {
    host.append(el('p', 'region-unavailable', t(lang, 'region.unavailable')));
    return;
  }

  const list = el('ol', 'regions-list');
  rows.forEach((row, i) => {
    const li = el('li', 'region-row');
    if (row.id === personal) li.classList.add('is-personal');

    // Строка-раскрывалка: №, регион, Δ со знаком и цветом; личный регион — текстовым бейджем.
    const head = el('button', 'region-row-head');
    head.type = 'button';
    head.setAttribute('aria-expanded', 'false');
    const detailId = `region-detail-${row.id}`;
    head.setAttribute('aria-controls', detailId);
    head.append(el('span', 'region-rank', String(i + 1)));
    head.append(el('span', 'region-name', region.get(row.id)?.name[lang] ?? row.id));
    if (row.id === personal) {
      // Бейдж текстом + aria — пометка не единственным полаганием на цвет (§12).
      head.append(el('span', 'region-yours', t(lang, 'regions.yours')));
      head.setAttribute('aria-label',
        `${region.get(row.id)?.name[lang] ?? row.id}, ${formatDelta(row.delta)}, ${t(lang, 'regions.yours')}`);
    }
    head.append(deltaSpan(lang, row.delta));

    const detail = buildDetail(lang, row, snapshot.regions[row.id], row.id === personal);
    detail.id = detailId;
    detail.hidden = true;

    head.addEventListener('click', () => {
      const open = head.getAttribute('aria-expanded') === 'true';
      head.setAttribute('aria-expanded', String(!open));
      detail.hidden = open;
      head.classList.toggle('is-open', !open);
    });

    li.append(head, detail);
    list.append(li);
  });
  host.append(list);
}
