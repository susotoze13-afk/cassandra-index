// Секция «Тренд» (регистрируется как 'trend'): интерактивный график индекса
// за 12 недель, целиком инлайн-SVG из данных снапшота (Решение п.8, История 13).
// Подпись: текущее значение, неделю назад, направление, нарративный summary.
// Чистые швы (signedDelta, arrowOf, directionOf, pointAriaLabel, summaryText,
// clampX) — без DOM, тестируются; aria-label точек вместо aria-live (§19.25).

import { t, date, plural } from '../i18n.js';

// Δ со знаком: '+6' | '-3' | '0' (подпись и summary).
export function signedDelta(n) {
  if (!Number.isFinite(n)) return '0';
  const r = Math.round(n);
  if (r > 0) return `+${r}`;
  if (r < 0) return `-${Math.abs(r)}`;
  return '0';
}

// Стрелка направления: значения не только цветом (R24).
export function arrowOf(delta) {
  return delta > 0 ? '↑' : delta < 0 ? '↓' : '→';
}

export function directionOf(delta) {
  return delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
}

// aria-label точки графика: «значение, дата» на языке интерфейса (§19.25).
export function pointAriaLabel(lang, point) {
  return t(lang, 'trend.point.aria', {
    value: point?.value ?? 0,
    date: date(lang, point?.date),
  });
}

// Дата вторичной строки tooltip: длинный локальный формат, совпадает с aria-label
// точки (История 13 / R36: «13 сентября 2026 / 13 Sep, 2026», не короткий «13.09»).
export function tooltipDate(lang, point) {
  return date(lang, point?.date);
}

// Короткий нарративный summary: Δ за неделю и за всё окно, слово «пункт» со склонением.
export function summaryText(lang, points) {
  const list = Array.isArray(points) ? points : [];
  if (list.length < 2) return '';
  const cur = list[list.length - 1].value;
  const prev = list[list.length - 2].value;
  const week = cur - prev;
  const total = cur - list[0].value;
  const forms = t(lang, 'trend.points').split(';');
  return t(lang, 'trend.summary', {
    week: signedDelta(week),
    weekWord: plural(lang, Math.abs(week), forms),
    total: signedDelta(total),
    totalWord: plural(lang, Math.abs(total), forms),
  });
}

// Tooltip не выходит за контейнер по X (История 13): позиция зажата с обеих сторон.
export function clampX(left, width, containerWidth) {
  const max = Math.max(0, containerWidth - width);
  return Math.min(Math.max(left, 0), max);
}

// ---------- DOM ----------

const NS = 'http://www.w3.org/2000/svg';
const VIEW_W = 640;
const VIEW_H = 280;
const PAD = { top: 16, right: 14, bottom: 30, left: 34 };
const GRID = [30, 60, 90];
const TAP_HIDE_MS = 3500;

function svgEl(tag, attrs = {}) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="trend"]');
  if (!host) return;
  const { lang, snapshot } = appState;
  host.innerHTML = '';

  const points = Array.isArray(snapshot?.trend) ? snapshot.trend : [];
  if (points.length < 2) return;

  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  const week = last.value - prev.value;

  // Подпись: текущее, неделю назад, направление (словом и стрелкой), summary.
  const caption = el('p', 'trend-caption');
  caption.append(el('span', 'trend-caption-item', t(lang, 'trend.now', { value: last.value })));
  caption.append(el('span', 'trend-caption-item', t(lang, 'trend.weekAgo', { value: prev.value })));
  const dir = el('span', 'trend-caption-item');
  dir.append(el('span', 'trend-caption-label', `${t(lang, 'trend.direction.label')}:`));
  dir.append(el('span', 'trend-direction', `${t(lang, `trend.direction.${directionOf(week)}`)} ${arrowOf(week)}`));
  caption.append(dir);
  host.append(caption);
  host.append(el('p', 'trend-summary', summaryText(lang, points)));

  // График: контейнер + инлайн-SVG + HTML-tooltip (mono 15/600 + mono 11 muted).
  const chart = el('div', 'trend-chart');
  chart.dataset.role = 'trend-chart';
  const svg = svgEl('svg', {
    viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
    role: 'img',
    'aria-label': t(lang, 'trend.chart.label'),
  });

  const x = (i) => PAD.left + (i / (points.length - 1)) * (VIEW_W - PAD.left - PAD.right);
  const y = (v) => PAD.top + (1 - Math.min(100, Math.max(0, v)) / 100) * (VIEW_H - PAD.top - PAD.bottom);
  const coords = points.map((p, i) => [x(i), y(p.value)]);

  // Градиентная область rgba(88,166,255,.30) → 0 (§4.4).
  const defs = svgEl('defs');
  const grad = svgEl('linearGradient', { id: 'trend-area-fill', x1: 0, y1: 0, x2: 0, y2: 1 });
  grad.append(svgEl('stop', { offset: '0%', 'stop-color': 'rgba(88,166,255,.30)' }));
  grad.append(svgEl('stop', { offset: '100%', 'stop-color': 'rgba(88,166,255,0)' }));
  defs.append(grad);
  svg.append(defs);

  // Направляющие 30/60/90 (--border-soft 1px) с подписями mono 10px.
  for (const g of GRID) {
    svg.append(svgEl('line', {
      x1: PAD.left, x2: VIEW_W - PAD.right, y1: y(g), y2: y(g),
      stroke: 'var(--border-soft)', 'stroke-width': 1,
    }));
    const label = svgEl('text', { x: PAD.left - 8, y: y(g) + 3, 'text-anchor': 'end' });
    label.setAttribute('class', 'trend-grid-label');
    label.textContent = String(g);
    svg.append(label);
  }
  svg.append(svgEl('line', {
    x1: PAD.left, x2: VIEW_W - PAD.right, y1: y(0), y2: y(0),
    stroke: 'var(--border-soft)', 'stroke-width': 1,
  }));

  // Область под линией и сама линия 2px --accent.
  const baseline = y(0);
  const area = svgEl('path', {
    d: `M ${coords[0][0]} ${baseline} ` + coords.map(([cx, cy]) => `L ${cx} ${cy}`).join(' ') + ` L ${coords[coords.length - 1][0]} ${baseline} Z`,
    fill: 'url(#trend-area-fill)',
  });
  svg.append(area);
  svg.append(svgEl('polyline', {
    points: coords.map(([cx, cy]) => `${cx},${cy}`).join(' '),
    fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2,
  }));

  // Tooltip: «N / 100» (mono 15/600, доминирует) + дата (mono 11, muted). aria-hidden —
  // данные дублируются в aria-label точек (§19.25); позиция зажата по X.
  const tooltip = el('div', 'trend-tooltip');
  tooltip.setAttribute('aria-hidden', 'true');
  tooltip.hidden = true;
  const tipValue = el('span', 'trend-tooltip-value');
  const tipDate = el('span', 'trend-tooltip-date');
  tooltip.append(tipValue, tipDate);

  let tapTimer = null;

  const hide = () => {
    tooltip.hidden = true;
  };

  const show = (hitEl, p) => {
    tipValue.textContent = `${p.value} / 100`;
    tipDate.textContent = tooltipDate(lang, p);
    tooltip.hidden = false;
    const chartRect = chart.getBoundingClientRect();
    const r = hitEl.getBoundingClientRect();
    const left = clampX(
      r.left + r.width / 2 - chartRect.left - tooltip.offsetWidth / 2,
      tooltip.offsetWidth,
      chartRect.width
    );
    tooltip.style.left = `${Math.round(left)}px`;
    tooltip.style.top = `${Math.round(r.top - chartRect.top - tooltip.offsetHeight - 10)}px`;
  };

  // Точки: фокусируемые (tabindex=0, role=button, aria-label «значение, дата»),
  // последняя крупнее с обводкой --surface; увеличение на hover/фокус/tap — CSS.
  points.forEach((p, i) => {
    const wrap = svgEl('g');
    const hit = svgEl('circle', { cx: x(i), cy: y(p.value), r: 20, 'class': 'trend-hit' });
    const dot = svgEl('circle', {
      cx: x(i), cy: y(p.value), 'class': `trend-point${i === points.length - 1 ? ' trend-point--last' : ''}`,
    });
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', pointAriaLabel(lang, p));
    wrap.append(hit, dot);

    const activate = () => {
      dot.classList.add('is-active');
      show(dot, p);
    };
    const deactivate = () => {
      dot.classList.remove('is-active');
      hide();
    };
    wrap.addEventListener('pointerenter', activate);
    wrap.addEventListener('pointerleave', deactivate);
    // Клавиатура: focus/blur (фокус видимый — глобальный :focus-visible + рост точки).
    dot.addEventListener('focus', activate);
    dot.addEventListener('blur', deactivate);
    dot.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        hide();
        dot.blur();
      }
    });
    // Tap: показали — автоскрытие через 3.5 с (История 13).
    dot.addEventListener('click', () => {
      clearTimeout(tapTimer);
      activate();
      tapTimer = setTimeout(hide, TAP_HIDE_MS);
    });
    svg.append(wrap);
  });

  chart.append(svg, tooltip);
  host.append(chart);
}
