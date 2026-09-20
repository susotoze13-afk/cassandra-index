// app.js — оркестрация: язык, регион, неделя (?week=), data-state, первый render.
// Скелет: собирает appState и дергает renderAll; глубокая обвязка событий — таск 02+.

import * as data from './data.js';
import * as region from './region.js';
import { renderAll, applyI18n } from './render.js';

const LANG_KEY = 'cassandra.lang';

export function resolveLang() {
  try {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(LANG_KEY) : null;
    if (saved === 'ru' || saved === 'en') return saved;
  } catch {
    /* хранилище недоступно — остаёмся на дефолте */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language || '' : '';
  return nav.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

export function saveLang(lang) {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* см. resolveLang */
  }
}

export function resolveWeek() {
  try {
    const q = new URLSearchParams(location.search).get('week');
    if (q && /^\d{4}-\d{2}-\d{2}$/.test(q)) return q;
  } catch {
    /* вне браузера */
  }
  return null;
}

// appState — единый контракт между app и render:
// { lang, region (id|null), detected (id|null), week (YYYY-MM-DD|null),
//   snapshot, dataState, unavailable:boolean, errors:string[] }
export function buildState() {
  const lang = resolveLang();
  const tz = typeof Intl !== 'undefined'
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : null;
  const detected = region.detect(tz);
  const regionId = region.current() ?? detected;
  const weekKey = resolveWeek();
  const snapshot = data.week(weekKey ?? undefined);
  return {
    lang,
    region: regionId,
    detected,
    week: snapshot.date ?? data.latest(),
    snapshot,
    dataState: snapshot.dataState,
    unavailable: !!snapshot.unavailable,
    errors: snapshot.errors ?? [],
  };
}

export function renderApp(state) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = state.lang;
    applyI18n(document, state.lang);
    document.querySelectorAll('.lang-btn').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang));
    });
  }
  return renderAll(state);
}

export function init() {
  const state = buildState();
  // Минимальная обвязка переключателя языка (R67–R69; полный UI — таск 02).
  if (typeof document !== 'undefined') {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang === 'en' ? 'en' : 'ru';
        saveLang(lang);
        renderApp({ ...buildState(), lang });
      });
    });
  }
  renderApp(state);
  // «Model unavailable» / битый снапшот: состояние уже в данных (R63.1);
  // UI с кнопкой повтора — таск 06, здесь только событие.
  if (typeof document !== 'undefined') {
    document.dispatchEvent(new CustomEvent('ci:ready', { detail: state }));
  }
  return state;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
