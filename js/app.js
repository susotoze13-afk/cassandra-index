// app.js — оркестрация: язык, регион, неделя (?week=), data-state, первый render.
// Скелет: собирает appState и дергает renderAll; глубокая обвязка событий — таск 02+.

import * as data from './data.js';
import * as region from './region.js';
import { t } from './i18n.js';
import { renderAll, applyI18n } from './render.js';
import { applyDemo, initDemo } from './demo.js';
import { LANG_KEY, resolveLang, parseWeekParam } from './ui.js';

export { resolveLang };

export function saveLang(lang) {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* см. resolveLang */
  }
}

export function resolveWeek() {
  try {
    return parseWeekParam(location.search);
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

// URL ?week=: текущая неделя — без параметра, архивная — с ним (§8.6).
function navigateToWeek(week) {
  try {
    const url = new URL(location.href);
    if (week === data.latest()) {
      url.searchParams.delete('week');
    } else {
      url.searchParams.set('week', week);
    }
    history.pushState(null, '', url);
  } catch {
    /* вне браузера — состояние пересоберётся без URL */
  }
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
    // Смена недели из секции истории: владелец состояния и URL — app.js.
    // pushState ?week= (latest — без параметра), затем полный перерендер.
    document.addEventListener('ci:weekchange', (e) => {
      const week = e.detail?.week;
      if (!week || !data.listWeeks().includes(week)) return;
      navigateToWeek(week);
      renderApp(currentState());
    });
    // Кнопки «назад/вперёд» после pushState: неделя уже в URL — пересобираем состояние.
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', () => renderApp(currentState()));
    }
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
