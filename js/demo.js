// Демо-панель A01 (История 28): неприметная ссылка в футере открывает панель
// с 4 состояниями продукта. Подмена данных — только в текущей сессии, помечена
// «демо», в продакшен-потоке данных не участвует (app.js держит режим в памяти).
// Чистые швы (DEMO_MODES, applyDemo, demoModeLabel) — без DOM, тестируются.

import { t } from './i18n.js';

export const DEMO_MODES = ['critical', 'delayed', 'insufficient', 'unavailable'];

// Демо-значение крит-режима: внутри диапазона 81–96 §10 («Критически опасно»).
export const CRITICAL_DEMO_INDEX = 85;

// applyDemo(appState, mode) → новый appState с подменёнными данными.
// Не мутирует вход: подмена — копия снапшота; null/'off' — состояние как есть.
export function applyDemo(state, mode) {
  if (!mode || mode === 'off' || !DEMO_MODES.includes(mode)) return state;
  const snap = state.snapshot ?? {};
  if (mode === 'critical') {
    return {
      ...state,
      snapshot: {
        ...snap,
        global: { ...(snap.global ?? {}), index: CRITICAL_DEMO_INDEX },
      },
    };
  }
  if (mode === 'delayed' || mode === 'insufficient') {
    return {
      ...state,
      dataState: mode,
      snapshot: { ...snap, dataState: mode },
    };
  }
  // unavailable — понятный экран с кнопкой повтора (states.js), как при битом файле.
  return {
    ...state,
    dataState: 'unavailable',
    unavailable: true,
    errors: [...(state.errors ?? []), 'demo: model unavailable'],
    snapshot: {
      ...snap,
      dataState: 'unavailable',
      unavailable: true,
      global: null,
      regions: {},
      trend: [],
      drivers: [],
      sources: [],
    },
  };
}

export function demoModeLabel(lang, mode) {
  return t(lang, `demo.${mode}`);
}

// ---------- DOM: панель, баннер «демо», событие ci:demo ----------

function buildPanel(host, lang, activeMode) {
  host.innerHTML = `
    <div class="demo-panel" role="dialog" aria-label="${t(lang, 'demo.title')}">
      <p class="demo-hint">${t(lang, 'demo.hint')}</p>
      <div class="demo-actions" data-role="demo-actions"></div>
      <button type="button" class="demo-close" data-role="demo-close">${t(lang, 'demo.close')}</button>
    </div>`;
  const actions = host.querySelector('[data-role="demo-actions"]');
  for (const mode of DEMO_MODES) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'demo-btn';
    b.dataset.demo = mode;
    b.setAttribute('aria-pressed', String(mode === activeMode));
    b.textContent = demoModeLabel(lang, mode);
    b.addEventListener('click', () => {
      const next = mode === activeMode ? null : mode;
      document.dispatchEvent(new CustomEvent('ci:demo', { detail: { mode: next } }));
    });
    actions.appendChild(b);
  }
  const off = document.createElement('button');
  off.type = 'button';
  off.className = 'demo-btn demo-btn--off';
  off.setAttribute('aria-pressed', String(!activeMode));
  off.textContent = t(lang, 'demo.off');
  off.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('ci:demo', { detail: { mode: null } }));
  });
  actions.appendChild(off);
  host.querySelector('[data-role="demo-close"]').addEventListener('click', () => { host.hidden = true; });
}

// Панель и баннер живут вне продакшен-потока: их содержимое собирает demo.js,
// а app.js только применяет applyDemo к appState перед renderAll.
export function initDemo(getLang) {
  if (typeof document === 'undefined') return;
  const link = document.querySelector('[data-role="demo-link"]');
  const panel = document.querySelector('[data-role="demo-panel"]');
  const banner = document.querySelector('[data-role="demo-banner"]');
  if (!link || !panel || !banner) return;

  let activeMode = null;

  function sync() {
    const lang = getLang();
    buildPanel(panel, lang, activeMode);
    if (activeMode) {
      banner.hidden = false;
      banner.textContent = t(lang, 'demo.banner', { mode: demoModeLabel(lang, activeMode) });
    } else {
      banner.hidden = true;
      banner.textContent = '';
    }
  }

  link.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) sync();
  });

  document.addEventListener('ci:demo', (e) => {
    activeMode = e.detail?.mode ?? null;
    sync();
  });
}
