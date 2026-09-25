// Секция «Тренд» (регистрируется как 'trend'): интерактивный график индекса
// за 12 недель, целиком инлайн-SVG из данных снапшота (Решение п.8, История 13).
// Подпись: текущее значение, неделю назад, направление, нарративный summary.
// Чистые швы (signedDelta, arrowOf, directionOf, pointAriaLabel, summaryText,
// clampX, trendSegments) — без DOM, тестируются; R28: разрыв серии при смене
// methodology; R63: aria-label «Дата / Индекс / Состояние» + sr-таблица + live.

import { t, date } from '../i18n.js';
import * as risk from '../risk.js';
import { el } from '../ui.js';

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

// aria-label точки графика (R63): «Дата: X, Индекс: Y, Состояние: Z».
// Неопубликованная неделя (value:null) подписана словами, состояние не выдумывается.
export function pointAriaLabel(lang, point) {
  const valued = typeof point?.value === 'number';
  const stateId = valued ? risk.status(point.value) : null;
  return t(lang, 'trend.point.aria', {
    date: date(lang, point?.date),
    value: valued ? point.value : t(lang, 'trend.point.na'),
    state: stateId ? t(lang, `statusLower.${stateId}`) : t(lang, 'trend.state.na'),
  });
}

// R28: разбиение ряда на непрерывные сегменты линии. Серия рвётся между
// соседними точками при смене methodology либо при value:null (неделя не
// опубликована — точки контракта таска 05). Возвращает сегменты (только
// точки с числовым value) и метки разрывов с причиной и версиями.
export function trendSegments(points) {
  const list = Array.isArray(points) ? points : [];
  const methOf = (p) =>
    p && typeof p.methodology === 'string' && p.methodology !== '' ? p.methodology : null;
  const segments = [];
  const breaks = [];
  let current = [];
  let prev = null;
  list.forEach((p, i) => {
    const point = p ?? {};
    const valued = typeof point.value === 'number';
    let reason = null;
    if (prev) {
      // Неопубликованная неделя рвёт серию сама по себе; смена methodology
      // фиксируется отдельно, между опубликованными точками.
      if (!valued && typeof prev.value === 'number') reason = 'unpublished';
      else if (methOf(point) !== methOf(prev)) reason = 'methodology';
    }
    if (reason) {
      if (current.length) segments.push(current);
      breaks.push({ index: i, reason, from: methOf(prev), to: methOf(point) });
      current = [];
    }
    if (valued) current.push(point);
    prev = point;
  });
  if (current.length) segments.push(current);
  return { segments, breaks };
}

// Дата вторичной строки tooltip: длинный локальный формат, совпадает с aria-label
// точки (История 13 / R36: «13 сентября 2026 / 13 Sep, 2026», не короткий «13.09»).
export function tooltipDate(lang, point) {
  return date(lang, point?.date);
}

// Короткий нарративный summary: Δ за неделю и за всё окно, слово «пункт» со склонением (ICU).
// Неопубликованные точки (value:null) игнорируются: Δ считается между опубликованными неделями.
export function summaryText(lang, points) {
  const list = (Array.isArray(points) ? points : []).filter((p) => typeof p?.value === 'number');
  if (list.length < 2) return '';
  const cur = list[list.length - 1].value;
  const prev = list[list.length - 2].value;
  const week = cur - prev;
  const total = cur - list[0].value;
  return t(lang, 'trend.summary', {
    week: signedDelta(week),
    weekWord: t(lang, 'trend.points', { n: Math.abs(week) }),
    total: signedDelta(total),
    totalWord: t(lang, 'trend.points', { n: Math.abs(total) }),
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

function svgEl(tag, attrs = {}) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

// Детект сенсорного ввода (R58): coarse pointer; fallback — первый touchstart
// на графике переводит взаимодействие в тач-режим до конца сессии страницы.
function detectTouch() {
  try {
    return typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches;
  } catch {
    return false;
  }
}

// Вибрация при листании точек — опционально, без ошибок где API нет (R58).
function vibrate(ms) {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(ms);
    }
  } catch {
    /* не поддерживается — молча */
  }
}

// Анонс скринридеру через общий live-регион (R63).
function announce(text) {
  const live = document.querySelector('[data-role="a11y-live"]');
  if (live) live.textContent = text;
}

// Методология точки (строка либо null — точки ручных неделей её не несут).
function methOf(p) {
  return p && typeof p.methodology === 'string' && p.methodology !== '' ? p.methodology : null;
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="trend"]');
  if (!host) return;
  const { lang, snapshot } = appState;

  // Полный перерендер (смена недели/языка) убирает открытую sheet: иначе
  // подложка и диалог останутся висеть над новым содержимым.
  document.querySelectorAll('.trend-sheet, .trend-sheet-backdrop').forEach((n) => n.remove());

  host.innerHTML = '';

  const points = Array.isArray(snapshot?.trend) ? snapshot.trend : [];
  if (points.length < 2) return;

  // Δ подписи — по последним опубликованным точкам: неделя insufficient
  // (value:null, таск 05) не должна превращать подпись в NaN.
  const valued = points.filter((p) => typeof p.value === 'number');
  const lastValued = valued[valued.length - 1] ?? null;
  const prevValued = valued[valued.length - 2] ?? null;
  const week = lastValued && prevValued ? lastValued.value - prevValued.value : 0;

  // Подпись: текущее, неделю назад, направление (словом и стрелкой), summary.
  // id — мишень aria-describedby графика (R63: сводка описывает svg).
  const caption = el('p', 'trend-caption');
  caption.id = 'trend-caption';
  caption.append(el('span', 'trend-caption-item', lastValued
    ? t(lang, 'trend.now', { value: lastValued.value })
    : t(lang, 'trend.now.na')));
  caption.append(el('span', 'trend-caption-item', prevValued
    ? t(lang, 'trend.weekAgo', { value: prevValued.value })
    : t(lang, 'trend.weekAgo.na')));
  const dir = el('span', 'trend-caption-item');
  dir.append(el('span', 'trend-caption-label', `${t(lang, 'trend.direction.label')}:`));
  dir.append(el('span', 'trend-direction', `${t(lang, `trend.direction.${directionOf(week)}`)} ${arrowOf(week)}`));
  caption.append(dir);
  host.append(caption);
  host.append(el('p', 'trend-summary', summaryText(lang, points)));

  // График: контейнер + инлайн-SVG + HTML-tooltip (desktop) + bottom sheet (touch).
  const chart = el('div', 'trend-chart');
  chart.dataset.role = 'trend-chart';
  const svg = svgEl('svg', {
    viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
    role: 'img',
    'aria-label': t(lang, 'trend.chart.label'),
    'aria-describedby': 'trend-caption',
  });

  const x = (i) => PAD.left + (i / (points.length - 1)) * (VIEW_W - PAD.left - PAD.right);
  const y = (v) => PAD.top + (1 - Math.min(100, Math.max(0, v)) / 100) * (VIEW_H - PAD.top - PAD.bottom);

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

  // Серия: сегменты по trendSegments (R28 — разрыв при смене methodology,
  // таск 05 — разрыв вокруг неопубликованных недель).
  const { segments, breaks } = trendSegments(points);
  const baseline = y(0);
  for (const seg of segments) {
    const coords = seg.map((p) => [x(points.indexOf(p)), y(p.value)]);
    if (coords.length > 1) {
      const area = svgEl('path', {
        d: `M ${coords[0][0]} ${baseline} ` + coords.map(([cx, cy]) => `L ${cx} ${cy}`).join(' ') + ` L ${coords[coords.length - 1][0]} ${baseline} Z`,
        fill: 'url(#trend-area-fill)',
      });
      svg.append(area);
    }
    svg.append(svgEl('polyline', {
      points: coords.map(([cx, cy]) => `${cx},${cy}`).join(' '),
      fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2,
    }));
  }

  // Маркеры разрыва: подпись «Смена методологии vX → vY» со ссылкой на
  // changelog-якорь methodology-секции (R28). Неопубликованные недели — без
  // подписи: пустоту в серии и aria-label точек достаточно.
  for (const br of breaks) {
    if (br.reason !== 'methodology' || br.index < 1) continue;
    const xMid = (x(br.index - 1) + x(br.index)) / 2;
    svg.append(svgEl('line', {
      x1: xMid, x2: xMid, y1: PAD.top, y2: VIEW_H - PAD.bottom,
      'class': 'trend-break-line',
      stroke: 'var(--border)', 'stroke-width': 1, 'stroke-dasharray': '3 3',
    }));
    const link = svgEl('a', { href: '#methodology', 'class': 'trend-break-label' });
    const text = svgEl('text', { x: xMid + 5, y: PAD.top + 10 });
    text.textContent = t(lang, 'trend.break.mark', { from: br.from ?? '—', to: br.to ?? '—' });
    link.append(text);
    svg.append(link);
  }

  // Tooltip (desktop): «N / 100» mono 15/600 + дата; при разрыве методологии
  // — строка версии. aria-hidden: те же данные в aria-label точек и sheet.
  const tooltip = el('div', 'trend-tooltip');
  tooltip.setAttribute('aria-hidden', 'true');
  tooltip.hidden = true;
  const tipValue = el('span', 'trend-tooltip-value');
  const tipDate = el('span', 'trend-tooltip-date');
  const tipNote = el('span', 'trend-tooltip-note');
  tooltip.append(tipValue, tipDate, tipNote);

  let touchMode = detectTouch();
  chart.addEventListener('touchstart', () => { touchMode = true; }, { once: true, passive: true });

  const hide = () => {
    tooltip.hidden = true;
  };

  const tooltipLines = (p) => {
    const valuedPoint = typeof p.value === 'number';
    tipValue.textContent = valuedPoint ? `${p.value} / 100` : t(lang, 'trend.point.na');
    tipDate.textContent = tooltipDate(lang, p);
    const i = points.indexOf(p);
    const methChanged = i > 0 && methOf(p) && methOf(p) !== methOf(points[i - 1]);
    tipNote.textContent = methChanged ? t(lang, 'trend.sheet.methodology', { version: methOf(p) }) : '';
    tipNote.hidden = !methChanged;
  };

  const show = (hitEl, p) => {
    tooltipLines(p);
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

  // Bottom sheet (touch, R58): role=dialog, aria-modal, закрытие только по X,
  // тапу вне области или Escape; автоскрытия по таймеру нет; фокус уходит на
  // панель при открытии и возвращается на точку при закрытии.
  let sheet = null;
  let sheetBackdrop = null;
  let sheetReturnFocus = null;
  let sheetKeyHandler = null;

  const closeSheet = () => {
    if (!sheet) return;
    sheet.remove();
    sheetBackdrop.remove();
    sheet = null;
    sheetBackdrop = null;
    if (sheetKeyHandler) {
      document.removeEventListener('keydown', sheetKeyHandler, true);
      sheetKeyHandler = null;
    }
    if (sheetReturnFocus && typeof sheetReturnFocus.focus === 'function') {
      sheetReturnFocus.focus();
    }
    sheetReturnFocus = null;
  };

  const trapTab = (ev) => {
    if (ev.key !== 'Tab' || !sheet) return;
    const focusables = sheet.querySelectorAll('button, a[href]');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault();
      first.focus();
    }
  };

  const openSheet = (dotEl, p) => {
    closeSheet();
    sheetReturnFocus = dotEl;
    sheetBackdrop = el('div', 'trend-sheet-backdrop');
    sheet = el('div', 'trend-sheet');
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-label', pointAriaLabel(lang, p));
    sheet.tabIndex = -1;

    const head = el('div', 'trend-sheet-head');
    head.append(el('p', 'trend-sheet-date', tooltipDate(lang, p)));
    const closeBtn = el('button', 'trend-sheet-close', '×');
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', t(lang, 'trend.sheet.close'));
    closeBtn.addEventListener('click', closeSheet);
    head.append(closeBtn);

    const body = el('div', 'trend-sheet-body');
    const valuedPoint = typeof p.value === 'number';
    body.append(el('p', 'trend-sheet-value',
      valuedPoint ? `${p.value} / 100` : t(lang, 'trend.point.na')));
    const stateId = valuedPoint ? risk.status(p.value) : null;
    body.append(el('p', 'trend-sheet-state',
      stateId ? t(lang, `statusLower.${stateId}`) : t(lang, 'trend.state.na')));
    const i = points.indexOf(p);
    const prev = valuedPoint ? [...points.slice(0, i)].reverse().find((q) => typeof q.value === 'number') : null;
    if (valuedPoint && prev) {
      body.append(el('p', 'trend-sheet-delta',
        t(lang, 'trend.sheet.delta', { value: signedDelta(p.value - prev.value) })));
    }
    const methChanged = i > 0 && methOf(p) && methOf(p) !== methOf(points[i - 1]);
    if (methChanged) {
      body.append(el('p', 'trend-sheet-note',
        t(lang, 'trend.break.note', { to: methOf(p) })));
    }

    sheet.append(head, body);
    sheetBackdrop.addEventListener('click', closeSheet);
    // Подпись-маркер R26 (баннер) живёт в таске 10; здесь — ссылка на changelog.
    sheetKeyHandler = (ev) => {
      if (ev.key === 'Escape') {
        ev.stopPropagation();
        closeSheet();
      } else {
        trapTab(ev);
      }
    };
    document.addEventListener('keydown', sheetKeyHandler, true);
    document.body.append(sheetBackdrop, sheet);
    sheet.focus();
  };

  // Точки: фокусируемые (tabindex=0, role=button, aria-label «Дата / Индекс /
  // Состояние», R63). Неопубликованные недели — пустые точки на нулевой линии.
  const dots = [];
  points.forEach((p, i) => {
    const isValued = typeof p.value === 'number';
    const wrap = svgEl('g');
    const cy = isValued ? y(p.value) : baseline;
    const hit = svgEl('circle', { cx: x(i), cy, r: 20, 'class': 'trend-hit' });
    const classes = ['trend-point'];
    if (i === points.length - 1) classes.push('trend-point--last');
    if (!isValued) classes.push('trend-point--na');
    const dot = svgEl('circle', { cx: x(i), cy, 'class': classes.join(' ') });
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', pointAriaLabel(lang, p));
    wrap.append(hit, dot);
    dots.push(dot);

    const activate = () => {
      dot.classList.add('is-active');
      show(dot, p);
    };
    const deactivate = () => {
      dot.classList.remove('is-active');
      hide();
    };
    // Desktop: hover — с автоскрытием при уходе; фокус — без автоскрытия
    // (скрывается только по blur/Escape, R58.1).
    wrap.addEventListener('pointerenter', () => { if (!touchMode) activate(); });
    wrap.addEventListener('pointerleave', () => { if (!touchMode) deactivate(); });
    dot.addEventListener('focus', () => { if (!touchMode) activate(); });
    dot.addEventListener('blur', () => { if (!touchMode) deactivate(); });
    dot.addEventListener('keydown', (ev) => {
      // Клавиатурная навигация по точкам: анонс через aria-live (R63) + вибрация.
      if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
        ev.preventDefault();
        const next = dots[i + (ev.key === 'ArrowRight' ? 1 : -1)];
        if (next) {
          next.focus();
          announce(pointAriaLabel(lang, points[dots.indexOf(next)]));
          vibrate(10);
        }
        return;
      }
      if (ev.key === 'Escape' && !touchMode) {
        hide();
        dot.blur();
      }
    });
    // Tap: сенсорный путь — bottom sheet без автоскрытия (R58); desktop-клик —
    // тот же tooltip, что по hover.
    dot.addEventListener('click', () => {
      if (touchMode) openSheet(dot, p);
      else activate();
    });
    svg.append(wrap);
  });

  chart.append(svg, tooltip);
  host.append(chart);

  // R63: скрытая таблица тренда для скринридера — все 12 точек: дата, индекс,
  // состояние. Под графиком, caption из словаря.
  const table = el('table', 'sr-only trend-table');
  table.append(el('caption', '', t(lang, 'trend.table.caption')));
  const thead = el('thead');
  const headRow = el('tr');
  for (const k of ['trend.table.date', 'trend.table.index', 'trend.table.state']) {
    headRow.append(el('th', '', t(lang, k)));
  }
  thead.append(headRow);
  const tbody = el('tbody');
  for (const p of points) {
    const row = el('tr');
    const stateId = typeof p.value === 'number' ? risk.status(p.value) : null;
    row.append(el('td', '', date(lang, p.date)));
    row.append(el('td', '', typeof p.value === 'number' ? String(p.value) : t(lang, 'trend.point.na')));
    row.append(el('td', '', stateId ? t(lang, `statusLower.${stateId}`) : t(lang, 'trend.state.na')));
    tbody.append(row);
  }
  table.append(thead, tbody);
  host.append(table);
}
