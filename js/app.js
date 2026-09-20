// app.js — оркестрация: язык, регион, неделя (?week=), data-state, первый render.
// Скелет: собирает appState и дергает renderAll; глубокая обвязка событий — таск 02+.

import * as data from './data.js';
import * as region from './region.js';
import { t } from './i18n.js';
import { renderAll, applyI18n } from './render.js';
import { applyDemo, initDemo } from './demo.js';

const LANG_KEY = 'cassandra.lang';

export function resolveLang() {
  try {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(LANG_KEY) : null;
    if (saved === 'ru' || saved === 'en') return saved;
  } catch {
    /* хранилище недоступно — остаёмся на дефолте */
  }
  const nav = typeof navigator !== 'undefined' && navigator.language ? navigator.language : '';
  if (!nav) return 'ru'; // §11.1: язык браузера не определён — дефолт 'ru'
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
// Демо-подмена (A01): режим держится в памяти сессии и применяется к копии
// состояния через applyDemo — на данные файлов и продакшен-поток не влияет.
let demoMode = null;

function currentState() {
  return applyDemo(buildState(), demoMode);
}

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
    document.title = t(state.lang, 'app.title');
    document.querySelector('meta[name="description"]')
      ?.setAttribute('content', t(state.lang, 'app.description'));
    applyI18n(document, state.lang);
    document.querySelectorAll('.lang-btn').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang));
    });
  }
  return renderAll(state);
}

// aria-live: объявления скринридеру о смене региона/языка (R71).
function announce(lang, key, vars) {
  const live = document.querySelector('[data-role="a11y-live"]');
  if (live) live.textContent = t(lang, key, vars);
}

export function init() {
  const state = buildState();
  if (typeof document !== 'undefined') {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang === 'en' ? 'en' : 'ru';
        saveLang(lang);
        announce(lang, 'a11y.lang.changed');
        renderApp({ ...currentState(), lang });
      });
    });
    // Демо-панель A01: ci:demo меняет только сессионный режим подмены.
    document.addEventListener('ci:demo', (e) => {
      demoMode = e.detail?.mode ?? null;
      renderApp(currentState());
    });
    initDemo(() => resolveLang());
    // Выбор региона из панели hero: запоминание — только по явному «Запомнить» (R49.1).
    document.addEventListener('ci:regionchange', (e) => {
      const { id, persist } = e.detail ?? {};
      if (!id || !region.get(id)) return;
      region.choose(id, { persist: !!persist });
      const next = currentState();
      renderApp(next);
      const reg = region.get(id);
      const rdata = next.snapshot?.regions?.[id];
      announce(next.lang, 'a11y.region.changed', {
        city: reg.city[next.lang],
        region: reg.name[next.lang],
        index: rdata ? rdata.index : '—',
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
