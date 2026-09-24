// Секция «Состояния данных» (js/render.js регистрирует render как 'states'):
// бейдж состояния рядом с датами, бейдж качества из q + модалка математики (R59–R61),
// баннер архивного снапшота, критический режим (функция данных, §6), экран
// «Model unavailable» с кнопкой повтора, выбор видимого снапшота при insufficient (R14).
// Чистые швы (criticalModeOn, badgeTone, isHistorical, historyBannerText,
// QUALITY_THRESHOLDS, qualityBadge, needsPreliminaryNote, pickVisibleSnapshot,
// visibleSnapshotOf) — без DOM, тестируются.

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

// ---------- Качество данных (R59–R61) ----------

// Пороги бейджа качества — константа рядом с швом (значения совпадают
// с PARAMS.qualityThresholds {high: 0.8, medium: 0.6}).
export const QUALITY_THRESHOLDS = { high: 0.8, medium: 0.6 };

// qualityBadge(q) → 'high'|'medium'|'low'|null. null — q нет или не число:
// недели до введения q бейдж не показывают (нет данных о качестве).
export function qualityBadge(q) {
  if (typeof q !== 'number' || !Number.isFinite(q)) return null;
  if (q >= QUALITY_THRESHOLDS.high) return 'high';
  if (q >= QUALITY_THRESHOLDS.medium) return 'medium';
  return 'low';
}

// Пометка «Предварительная оценка» (R61): q ниже порога 'medium' или явный
// флаг incompleteCoverage в снапшоте.
export function needsPreliminaryNote(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') return false;
  return qualityBadge(snapshot.q) === 'low' || snapshot.incompleteCoverage === true;
}

// R14/R59.1: insufficient-неделя не публикует число — hero берёт последний
// валидный снапшот. Чистый шов: идём от конца списка недель, берём первый
// снапшот с опубликованным глобальным индексом. Недели 'unavailable' пропускаем.
export function pickVisibleSnapshot(weekKeys, getSnapshot) {
  for (let i = weekKeys.length - 1; i >= 0; i--) {
    const snapshot = getSnapshot(weekKeys[i]);
    if (snapshot && !snapshot.unavailable && snapshot.global != null) {
      return { week: weekKeys[i], snapshot };
    }
  }
  return null;
}

// Видимый снапшот для appState: своя неделя, если индекс опубликован;
// иначе — последняя валидная неделя из данных (нет валидной — своя, hero
// покажет «—», overlay unavailable не включается: insufficient ≠ битый файл).
export function visibleSnapshotOf(state) {
  const snap = state?.snapshot ?? null;
  if (!snap || snap.unavailable || snap.global != null) return snap;
  const found = pickVisibleSnapshot(data.listWeeks(), (w) => data.week(w));
  return found ? found.snapshot : snap;
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
  // R14/R59.1: неделя без публикации (insufficient, global:null) — баннер
  // «Historical snapshot» с датами последнего ВАЛИДНОГО снапшота (hero на нём).
  if (!state.unavailable && state.snapshot?.global == null) {
    const fallback = pickVisibleSnapshot(data.listWeeks(), (w) => data.week(w));
    if (fallback) {
      host.hidden = false;
      host.textContent = historyBannerText(state.lang, fallback.snapshot);
      return;
    }
  }
  if (!isHistorical(state.week, data.latest()) || !state.snapshot?.published) {
    host.hidden = true;
    host.textContent = '';
    return;
  }
  host.hidden = false;
  host.textContent = historyBannerText(state.lang, state.snapshot);
}

// ---------- Качество данных: бейдж (R59) и модалка с математикой (R60) ----------

// Диалог живёт вне продакшен-потока renderAll: открывается по клику на бейдж,
// закрывается сам (X/Escape/вне карточки); при полном перерендере закрываем.
let qualityModal = null;    // построенный overlay
let qualityTrigger = null;  // бейдж — вернуть фокус при закрытии
let qualityKeydown = null;  // обработчик keydown фокус-ловушки
let currentState = null;    // последний appState (клик по бейджу — текущий язык/снапшот)

function buildQualityModal(lang, snapshot) {
  const pct = (v) => String(Math.round(v * 100));
  const addLine = (parent, key, vars) => {
    const p = document.createElement('p');
    p.textContent = t(lang, key, vars);
    parent.appendChild(p);
  };

  const overlay = document.createElement('div');
  overlay.className = 'quality-modal';
  overlay.dataset.role = 'quality-modal';

  const card = document.createElement('div');
  card.className = 'quality-modal-card';
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-modal', 'true');
  card.setAttribute('aria-labelledby', 'quality-modal-title');

  const head = document.createElement('div');
  head.className = 'quality-modal-head';
  const title = document.createElement('h2');
  title.id = 'quality-modal-title';
  title.textContent = t(lang, 'quality.modal.title');
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'quality-modal-close';
  close.dataset.role = 'quality-modal-close';
  close.setAttribute('aria-label', t(lang, 'quality.modal.close'));
  close.textContent = '×';
  head.append(title, close);

  const body = document.createElement('div');
  body.className = 'quality-modal-body';
  if (qualityBadge(snapshot.q)) addLine(body, 'quality.modal.q', { pct: pct(snapshot.q) });
  if (typeof snapshot.nullWeight === 'number' && Number.isFinite(snapshot.nullWeight)) {
    addLine(body, 'quality.modal.nullWeight', { pct: pct(snapshot.nullWeight) });
  }
  if (snapshot.coverage && Number.isInteger(snapshot.coverage.coveredDrivers)) {
    addLine(body, 'quality.modal.coverage', {
      covered: snapshot.coverage.coveredDrivers,
      total: snapshot.coverage.totalDrivers,
    });
  }
  addLine(body, 'quality.modal.explained');
  if (snapshot.incompleteCoverage === true) addLine(body, 'quality.modal.incomplete');
  if (snapshot.confidence === 'reduced') addLine(body, 'quality.modal.reduced');
  if (snapshot.dataState === 'insufficient') addLine(body, 'quality.modal.insufficient');

  card.append(head, body);
  overlay.appendChild(card);
  return overlay;
}

function openQualityModal(lang, trigger, snapshot) {
  closeQualityModal(false);
  qualityTrigger = trigger;
  qualityModal = buildQualityModal(lang, snapshot);
  document.body.appendChild(qualityModal);
  trigger.setAttribute('aria-expanded', 'true');

  const closeBtn = qualityModal.querySelector('[data-role="quality-modal-close"]');
  closeBtn.addEventListener('click', () => closeQualityModal(true));
  qualityModal.addEventListener('click', (e) => {
    if (e.target === qualityModal) closeQualityModal(true);
  });
  qualityKeydown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeQualityModal(true);
      return;
    }
    if (e.key !== 'Tab') return;
    // Фокус-ловушка: Tab циклит внутри карточки диалога.
    const els = [...qualityModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter((el) => !el.disabled && el.getClientRects().length > 0);
    if (!els.length) return;
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  document.addEventListener('keydown', qualityKeydown);

  const live = document.querySelector('[data-role="a11y-live"]');
  if (live) live.textContent = t(lang, 'a11y.quality.opened');
  closeBtn.focus();
}

function closeQualityModal(refocus) {
  if (!qualityModal) return;
  document.removeEventListener('keydown', qualityKeydown);
  qualityKeydown = null;
  qualityModal.remove();
  qualityModal = null;
  if (qualityTrigger) {
    qualityTrigger.setAttribute('aria-expanded', 'false');
    if (refocus) qualityTrigger.focus();
    qualityTrigger = null;
  }
}

function renderQualityBadge(state) {
  const meta = document.querySelector('.hero .meta');
  if (!meta) return;
  let badge = meta.querySelector('[data-role="quality-badge"]');
  if (!badge) {
    badge = document.createElement('button');
    badge.type = 'button';
    badge.className = 'quality-badge';
    badge.dataset.role = 'quality-badge';
    badge.setAttribute('aria-haspopup', 'dialog');
    badge.setAttribute('aria-expanded', 'false');
    badge.addEventListener('click', () => openQualityModal(currentState.lang, badge, currentState.snapshot));
    meta.appendChild(badge);
  }
  // Качество — просматриваемой недели: при insufficient-снапшоте герой показывает
  // последний валидный индекс, но состояние данных недели — своё (R59.1, R26).
  const level = qualityBadge(state.snapshot?.q);
  if (!level) {
    badge.hidden = true;
    return;
  }
  badge.hidden = false;
  const levelText = t(state.lang, `quality.level.${level}`);
  badge.textContent = t(state.lang, 'quality.badge', { level: levelText });
  badge.setAttribute('aria-label', t(state.lang, 'quality.badge.aria', { level: levelText }));
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
  currentState = appState;
  // Полный перерендер (язык/неделя/регион) закрывает открытый диалог качества:
  // его содержимое собрано под прежний язык/снапшот.
  closeQualityModal(false);
  renderBadge(appState);
  renderQualityBadge(appState);
  renderHistoryBanner(appState);
  renderCriticalPanel(appState);
  renderUnavailable(appState);
}
