// Секция «Состояния данных» (js/render.js регистрирует render как 'states'):
// бейдж состояния рядом с датами, баннер архивного снапшота, критический режим
// (функция данных, §6), экран «Model unavailable» с кнопкой повтора.
// Чистые швы (criticalModeOn, badgeTone, isHistorical, historyBannerText) — без DOM, тестируются.

import { t, date } from '../i18n.js';
import * as data from '../data.js';

// Критический режим: функция данных — global.index ≥81 (История 16, Решение п.10).
export function criticalModeOn(snapshot) {
  const index = snapshot?.global?.index;
  return typeof index === 'number' && index >= 81;
}

// Бейдж состояния данных (§7): тон — класс-модификатор, текст всегда рядом (не только цветом).
const BADGE_TONES = {
  published: 'data-state-badge--published',
  updating: 'data-state-badge--updating',
  delayed: 'data-state-badge--delayed',
  insufficient: 'data-state-badge--insufficient',
  unavailable: 'data-state-badge--unavailable',
};

export function badgeTone(dataState) {
  return BADGE_TONES[dataState] ?? BADGE_TONES.unavailable;
}

// Просмотр недели, отличной от latest — архивный снапшот (История 20 / §7).
export function isHistorical(week, latestWeek) {
  return !!week && !!latestWeek && week !== latestWeek;
}

// Текст баннера архивного снапшота с датами просматриваемых данных (§7:
// устаревшее значение никогда не выглядит текущим — даты в тексте баннера).
export function historyBannerText(lang, snapshot) {
  return t(lang, 'history.banner', {
    published: date(lang, snapshot.published),
    through: date(lang, snapshot.through),
  });
}

// ---------- Бейдж состояния рядом с датами публикации/покрытия ----------

function renderBadge(state) {
  const meta = document.querySelector('.hero .meta');
  if (!meta) return;
  let badge = meta.querySelector('[data-role="data-state-badge"]');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'data-state-badge';
    badge.dataset.role = 'data-state-badge';
    meta.appendChild(badge);
  }
  const dataState = state.dataState ?? 'unavailable';
  badge.textContent = t(state.lang, `state.${dataState}`);
  badge.className = `data-state-badge ${badgeTone(dataState)}`;
}

// ---------- Баннер архивного снапшота ----------

function renderHistoryBanner(state) {
  const host = document.querySelector('[data-role="history-banner"]');
  if (!host) return;
  if (!isHistorical(state.week, data.latest()) || !state.snapshot?.published) {
    host.hidden = true;
    host.textContent = '';
    return;
  }
  host.hidden = false;
  host.textContent = historyBannerText(state.lang, state.snapshot);
}

// ---------- Критический режим (§6): спокойная плашка, без §6.4 ----------

function renderCriticalPanel(state) {
  const host = document.querySelector('[data-role="critical-panel"]');
  if (!host) return;
  if (!criticalModeOn(state.snapshot)) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }
  const lang = state.lang;
  host.hidden = false;
  host.innerHTML = `
    <section class="critical-panel" aria-labelledby="critical-title">
      <h2 id="critical-title">${t(lang, 'critical.title')}</h2>
      <p class="critical-disclaimer">${t(lang, 'critical.disclaimer')}</p>
      <h3>${t(lang, 'critical.official.title')}</h3>
      <p>${t(lang, 'critical.official.text')}</p>
      <h3>${t(lang, 'critical.actions.title')}</h3>
      <ul>
        <li>${t(lang, 'critical.action.1')}</li>
        <li>${t(lang, 'critical.action.2')}</li>
        <li>${t(lang, 'critical.action.3')}</li>
        <li>${t(lang, 'critical.action.4')}</li>
      </ul>
    </section>`;
}

// ---------- «Model unavailable»: понятный экран с кнопкой повтора, не белый экран (R63.1) ----------

function renderUnavailable(state) {
  const overlay = document.querySelector('[data-role="unavailable-overlay"]');
  if (!overlay) return;
  if (!state.unavailable) {
    overlay.hidden = true;
    overlay.innerHTML = '';
    return;
  }
  const lang = state.lang;
  overlay.innerHTML = `
    <div class="unavailable-card" role="alert">
      <h2>${t(lang, 'unavailable.title')}</h2>
      <p>${t(lang, 'unavailable.text')}</p>
      <button type="button" class="retry-btn" data-role="unavailable-retry">${t(lang, 'data.retry')}</button>
    </div>`;
  overlay.hidden = false;
  overlay.querySelector('[data-role="unavailable-retry"]')
    .addEventListener('click', () => { location.reload(); });
  overlay.querySelector('[data-role="unavailable-retry"]').focus();
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  renderBadge(appState);
  renderHistoryBanner(appState);
  renderCriticalPanel(appState);
  renderUnavailable(appState);
}
