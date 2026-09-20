// Секция «Что изменилось» (регистрируется как 'drivers'): три драйвера недели
// по цепочке Наблюдение → Почему это важно → Уверенность → Источники (§4.3)
// + дополнительные измерения риска без процентов (R41, §4.5).
// Чистые швы (sourcesLabel, visibleSources, resolveMeasures) — без DOM, тестируются.

import { t, date, plural } from '../i18n.js';

const LEVELS = ['high', 'medium', 'low'];

// Кнопка аккордеона: «3 источника» / «3 sources» (§4.3.1, склонение §11.2).
// Формы — из словаря (sources.word), чтобы склонения жили в одном месте.
export function sourcesLabel(lang, n) {
  const forms = t(lang, 'sources.word').split(';');
  return `${n} ${plural(lang, n, forms)}`;
}

// >5 источников: первые 5 + «Показать все источники» (§4.3.1).
export function visibleSources(sources, showAll) {
  const list = Array.isArray(sources) ? sources : [];
  if (showAll || list.length <= 5) return { shown: list, remaining: 0 };
  return { shown: list.slice(0, 5), remaining: list.length - 5 };
}

// R41: уровни измерений из снапшота (snapshot.measures), дефолты — демо.
// data/ пока не отдаёт measures: пайплайн добавит поле — код подхватит без правки.
const DEFAULT_MEASURES = { direct: 'high', nuclear: 'low' };

export function resolveMeasures(snapshot) {
  const m = snapshot?.measures ?? {};
  const pick = (v) => (LEVELS.includes(v) ? v : null);
  return {
    direct: pick(m.direct) ?? DEFAULT_MEASURES.direct,
    nuclear: pick(m.nuclear) ?? DEFAULT_MEASURES.nuclear,
  };
}

// Краткий пользовательский лейбл карточки (§4.3): короткое имя драйвера,
// отличное от observation. Локализованное поле данных { ru, en }; фолбэк на RU.
export function driverLabel(lang, drv) {
  return drv?.label?.[lang] ?? drv?.label?.ru ?? '';
}

// Гендерные уровни: «высокий вклад» / «высокая уверенность» (§11.2).
// Экспортируется — общий компонент уверенности для карточек регионов (таск 05).
export function levelLabel(lang, kind, level) {
  return t(lang, `drivers.${kind}.${level}`);
}

// Уверенность драйвера: слово с родом + строка-причина при сниженной уверенности
// (меньше данных / противоречащие сигналы / неполное покрытие — формулирует редактор снапшота).
export function confidenceInfo(lang, drv) {
  const note = drv?.confidence !== 'high' ? (drv?.confidenceNote?.[lang] ?? null) : null;
  return { word: levelLabel(lang, 'confidence', drv?.confidence), note };
}

// ---------- DOM ----------

const LEVEL_TONE = {
  high: '--state-very',
  medium: '--state-danger',
  low: '--state-calm',
};

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function buildSourceItem(lang, src) {
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
  return li;
}

function buildDriverCard(lang, drv, index) {
  const card = el('article', 'driver-card');
  card.dataset.driver = String(index);

  // Карточка начинается с краткого лейбла (§4.3), затем цепочка Наблюдение → …
  card.append(el('h3', 'driver-label', driverLabel(lang, drv)));

  card.append(el('p', 'driver-overline', t(lang, 'drivers.observation')));
  card.append(el('p', 'driver-observation', drv.observation?.[lang] ?? ''));

  card.append(el('p', 'driver-overline', t(lang, 'drivers.why')));
  card.append(el('p', 'driver-why', drv.why?.[lang] ?? ''));

  // Вклад · Уверенность — словами, род согласован (§11.2); значения не только цветом.
  const metaLine = el('p', 'driver-meta');
  const contribution = el('span', 'driver-chip');
  contribution.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.contribution.label')}:`));
  contribution.append(el('span', 'driver-chip-value', levelLabel(lang, 'contribution', drv.contribution)));
  const confidence = el('span', 'driver-chip');
  confidence.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.confidence.label')}:`));
  confidence.append(el('span', 'driver-chip-value', confidenceInfo(lang, drv).word));
  metaLine.append(contribution, el('span', 'driver-meta-sep', '·'), confidence);
  card.append(metaLine);

  // Причина сниженной уверенности — строкой из данных (общий компонент confidenceInfo).
  const conf = confidenceInfo(lang, drv);
  if (conf.note) {
    card.append(el('p', 'driver-confidence-note', conf.note));
  }

  // Аккордеон источников (§4.3.1): кнопка --accent, chevron 90°, aria-expanded/aria-controls.
  const sources = Array.isArray(drv.sources) ? drv.sources : [];
  const listId = `driver-${index}-sources`;
  const list = el('ul', 'driver-sources');
  list.id = listId;
  const moreBtn = el('button', 'driver-sources-more', t(lang, 'drivers.sources.showAll'));
  moreBtn.type = 'button';
  moreBtn.hidden = true;

  const state = { expanded: false, showAll: false };

  const paint = () => {
    const { shown, remaining } = visibleSources(sources, state.showAll);
    list.innerHTML = '';
    for (const src of shown) list.append(buildSourceItem(lang, src));
    // Кнопка «все источники» живёт под раскрытым списком: при свёрнутом
    // аккордеоне не показываем (иначе — висящая кнопка без списка).
    moreBtn.hidden = !state.expanded || (!state.showAll && remaining === 0);
    moreBtn.textContent = state.showAll
      ? t(lang, 'drivers.sources.hideAll')
      : t(lang, 'drivers.sources.showAll');
    list.hidden = !state.expanded;
    toggle.setAttribute('aria-expanded', String(state.expanded));
    // При раскрытии label меняется: «N источников — скрыть» (§4.3.1).
    toggle.querySelector('[data-role="src-count"]').textContent = state.expanded
      ? `${sourcesLabel(lang, sources.length)} — ${t(lang, 'drivers.sources.hide')}`
      : sourcesLabel(lang, sources.length);
    toggle.classList.toggle('is-open', state.expanded);
  };

  const toggle = el('button', 'src-toggle');
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', listId);
  toggle.append(el('span', 'src-toggle-label', ''));
  toggle.querySelector('.src-toggle-label').dataset.role = 'src-count';
  toggle.addEventListener('click', () => {
    state.expanded = !state.expanded;
    paint();
  });
  moreBtn.addEventListener('click', () => {
    state.showAll = !state.showAll;
    paint();
  });

  paint();
  card.append(toggle, list, moreBtn);
  return card;
}

function buildMeasureRow(lang, key, level, defKey) {
  const row = el('div', 'measure');
  const head = el('button', 'measure-head');
  head.type = 'button';
  head.setAttribute('aria-expanded', 'false');
  head.setAttribute('aria-controls', `measure-${key}`);
  head.setAttribute('aria-label', `${t(lang, `drivers.measures.${key}`)} — ${t(lang, `drivers.measures.level.${level}`)}`);

  const left = el('span', 'measure-left');
  left.append(el('span', 'measure-name', t(lang, `drivers.measures.${key}`)));
  const lvl = el('span', `measure-level measure-level--${level}`);
  lvl.style.setProperty('--measure-tone', `var(${LEVEL_TONE[level]})`);
  lvl.append(el('span', 'measure-dot', ''), el('span', '', t(lang, `drivers.measures.level.${level}`)));
  left.append(lvl);
  head.append(left);

  const body = el('div', 'measure-body');
  body.id = `measure-${key}`;
  body.hidden = true;
  body.append(el('p', 'measure-line', t(lang, 'drivers.measures.horizon')));
  body.append(el('p', 'measure-line', t(lang, defKey)));
  body.append(el('p', 'measure-line measure-calibration', t(lang, 'drivers.measures.calibration')));

  head.addEventListener('click', () => {
    const open = head.getAttribute('aria-expanded') === 'true';
    head.setAttribute('aria-expanded', String(!open));
    body.hidden = open;
    head.classList.toggle('is-open', !open);
  });

  row.append(head, body);
  return row;
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="drivers"]');
  if (!host) return;
  const { lang, snapshot } = appState;
  host.innerHTML = '';

  const drivers = Array.isArray(snapshot?.drivers) ? snapshot.drivers : [];
  const cards = el('div', 'drivers-list');
  drivers.forEach((drv, i) => cards.append(buildDriverCard(lang, drv, i)));
  host.append(cards);

  const measures = resolveMeasures(snapshot);
  const mHost = el('div', 'measures');
  mHost.append(el('h3', 'measures-title', t(lang, 'drivers.measures.title')));
  mHost.append(buildMeasureRow(lang, 'direct', measures.direct, 'drivers.measures.direct.def'));
  mHost.append(buildMeasureRow(lang, 'nuclear', measures.nuclear, 'drivers.measures.nuclear.def'));
  host.append(mHost);
}
