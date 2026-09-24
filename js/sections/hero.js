// Секция hero (js/render.js регистрирует render как 'hero'): глобальный индекс,
// персональная строка региона, inline-панель выбора региона.
// Чистые функции (formatDelta, deltaArrow, refineRegionFromCoords) — без DOM, тестируются.

import { t, date } from '../i18n.js';
import * as risk from '../risk.js';
import * as region from '../region.js';
import { createToast, deltaClass } from '../ui.js';
import { visibleSnapshotOf, needsPreliminaryNote } from './states.js';

// Δ со знаком: +6 / -3 / 0 (значения не только цветом — §12).
// Не-число (null/NaN) → '0': изменение неизвестно, показываем нейтральное значение.
export function formatDelta(n) {
  if (typeof n !== 'number' || Number.isFinite(n) === false) return '0';
  if (n > 0) return `+${n}`;
  if (n < 0) return `${n}`;
  return '0';
}

export function deltaArrow(n) {
  if (typeof n !== 'number' || Number.isFinite(n) === false) return '→';
  if (n > 0) return '↑';
  if (n < 0) return '↓';
  return '→';
}

// Демо-маппинг координат → один из 6 регионов (без tz-базы; грубые bounding-box).
// Принятое решение — долготный: всё западнее −45° считается Северной Америкой,
// восточнее 95° — Восточной Азией; внутри — уточнение по широте.
// Координаты вне справочника → null (ничего не меняем).
const COORD_BOXES = [
  ['middle-east', 10, 45, 25, 70],
  ['europe', 36, 72, -30, 40],
  ['east-asia', -12, 55, 95, 180],
  ['south-asia', 5, 40, 60, 95],
  ['north-america', -60, 75, -180, -45],
  ['africa', -40, 37, -20, 52],
];

export function refineRegionFromCoords(lat, lon) {
  if (typeof lat !== 'number' || typeof lon !== 'number') return null;
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
  for (const [id, latMin, latMax, lonMin, lonMax] of COORD_BOXES) {
    if (lat >= latMin && lat <= latMax && lon >= lonMin && lon <= lonMax) return id;
  }
  return null;
}

// Состояние модуля: город из автокомплита живёт в сессии модуля (сигнатуры region.js не трогаем).
let chosenCity = null;      // { name: {ru,en}, region: id } — после выбора города в поиске
let panel = null;           // построенный DOM панели (переживает перерендеры)
let panelOpen = false;
let activeOption = -1;      // активный пункт автокомплита
let current = null;         // последний appState (для синхронизации панели)
let lastTrigger = null;     // кнопка, открывшая панель (для возврата фокуса)

function setDelta(el, value) {
  if (!el) return;
  const val = el.querySelector('[data-role$="-delta-value"]') ?? el;
  val.textContent = `${deltaArrow(value)} ${formatDelta(value)}`;
  el.classList.remove('delta--rise', 'delta--fall', 'delta--same');
  const cls = deltaClass(value);
  if (cls) el.classList.add(cls);
}

// Текст статуса — всегда языком интерфейса; цвет не инлайним (контраст §12,
// тон состояния несёт левая полоса карточки региона).
function setStatus(el, index, lang, lower) {
  if (!el) return;
  const id = risk.status(index);
  el.textContent = id ? t(lang, lower ? `statusLower.${id}` : `status.${id}`) : '';
}

// ---------- Панель выбора региона ----------

function buildPanel(host, state) {
  const lang = state.lang;
  host.innerHTML = `
    <div class="picker" role="dialog" data-i18n-aria="region.panel.title" aria-label="${t(lang, 'region.panel.title')}">
      <div class="picker-chips" data-role="picker-chips"></div>
      <input class="picker-input" type="text" data-role="picker-input"
             autocomplete="off" spellcheck="false"
             placeholder="${t(lang, 'region.panel.search')}"
             data-i18n-aria="region.panel.search" data-i18n-placeholder="region.panel.search"
             aria-label="${t(lang, 'region.panel.search')}" aria-expanded="false"
             aria-controls="picker-list" role="combobox">
      <ul id="picker-list" class="picker-list" data-role="picker-list" role="listbox" hidden></ul>
      <div class="picker-row">
        <button type="button" class="picker-remember" role="switch" aria-checked="false" data-role="picker-remember">
          <span data-i18n="region.panel.remember">${t(lang, 'region.panel.remember')}</span>
        </button>
        <button type="button" class="picker-geo" data-role="picker-geo" data-i18n="region.panel.geolocate">${t(lang, 'region.panel.geolocate')}</button>
        <span class="picker-hint" data-i18n="region.panel.remember.hint">${t(lang, 'region.panel.remember.hint')}</span>
        <button type="button" class="picker-cancel" data-role="picker-cancel" data-i18n="region.panel.cancel">${t(lang, 'region.panel.cancel')}</button>
      </div>
    </div>`;
  panel = host.firstElementChild;

  const input = panel.querySelector('[data-role="picker-input"]');
  const list = panel.querySelector('[data-role="picker-list"]');

  panel.querySelector('[data-role="picker-cancel"]').addEventListener('click', () => closePanel(true));
  panel.querySelector('[data-role="picker-remember"]').addEventListener('click', (e) => {
    const sw = e.currentTarget;
    sw.setAttribute('aria-checked', String(sw.getAttribute('aria-checked') !== 'true'));
  });

  const geoBtn = panel.querySelector('[data-role="picker-geo"]');
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    geoBtn.addEventListener('click', () => {
      // Geolocation — только по клику; отказ: ничего не меняется, без ошибок (R51).
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const id = refineRegionFromCoords(pos.coords.latitude, pos.coords.longitude);
          if (id) pick(id, null);
        },
        () => { /* отказ/таймаут — текущий регион без изменений */ },
        { timeout: 8000 },
      );
    });
  } else {
    geoBtn.hidden = true;
  }

  input.addEventListener('input', () => renderList());
  input.addEventListener('blur', () => {
    // Тап по пункту успевает сработать раньше скрытия (mousedown → blur → click).
    setTimeout(() => {
      list.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      activeOption = -1;
    }, 150);
  });
  input.addEventListener('keydown', (e) => {
    const options = listItems();
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (list.hidden || !options.length) return;
      e.preventDefault();
      const dir = e.key === 'ArrowDown' ? 1 : -1;
      activeOption = (activeOption + dir + options.length) % options.length;
      paintActive(options);
    } else if (e.key === 'Enter') {
      if (list.hidden || !options.length) return;
      e.preventDefault();
      const idx = activeOption >= 0 ? activeOption : 0;
      options[idx].querySelector('button').click();
    } else if (e.key === 'Escape') {
      // Текст не теряется: список закрывается, ввод остаётся (R50).
      list.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      activeOption = -1;
    }
  });

  renderChips(state);
}

function listItems() {
  return [...panel.querySelectorAll('[data-role="picker-list"] li[data-region]')];
}

function paintActive(options) {
  options.forEach((li, i) => {
    li.classList.toggle('is-active', i === activeOption);
    li.setAttribute('aria-selected', String(i === activeOption));
  });
  options[activeOption]?.scrollIntoView({ block: 'nearest' });
}

function renderChips(state) {
  const host = panel.querySelector('[data-role="picker-chips"]');
  host.innerHTML = '';
  for (const r of region.REGIONS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.setAttribute('aria-pressed', String(r.id === state.region));
    b.textContent = `${r.name[state.lang]} · ${r.city[state.lang]}`;
    b.addEventListener('click', () => pick(r.id, null));
    host.appendChild(b);
  }
}

function renderList() {
  const lang = current.lang;
  const input = panel.querySelector('[data-role="picker-input"]');
  const list = panel.querySelector('[data-role="picker-list"]');
  const results = region.search(input.value);
  list.innerHTML = '';
  activeOption = -1;
  if (!results.length) {
    const li = document.createElement('li');
    li.className = 'picker-empty';
    li.textContent = t(lang, 'region.panel.notfound');
    list.appendChild(li);
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    return;
  }
  results.forEach((c, i) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', 'false');
    li.dataset.region = c.region;
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = `${c.name[lang]} · ${c.regionName[lang]}`;
    b.addEventListener('click', () => pick(c.region, c));
    li.appendChild(b);
    list.appendChild(li);
    if (i === 0) activeOption = 0;
  });
  paintActive(listItems());
  list.hidden = false;
  input.setAttribute('aria-expanded', 'true');
}

function pick(id, city) {
  chosenCity = city ? { name: city.name, region: id } : null;
  const persist = panel.querySelector('[data-role="picker-remember"]').getAttribute('aria-checked') === 'true';
  closePanel(false);
  document.dispatchEvent(new CustomEvent('ci:regionchange', { detail: { id, persist } }));
}

function openPanel(state, trigger) {
  const host = document.querySelector('[data-role="region-picker"]');
  if (!host) return;
  if (!panel) buildPanel(host, state);
  lastTrigger = trigger ?? null;
  panel.parentElement.hidden = false;
  panelOpen = true;
  setTriggersExpanded(true);
  renderChips(state);
  // Полный список городов не показываем до ввода: фокус в поле, список скрыт.
  const list = panel.querySelector('[data-role="picker-list"]');
  list.hidden = true;
  panel.querySelector('[data-role="picker-input"]').setAttribute('aria-expanded', 'false');
  panel.querySelector('[data-role="picker-input"]').focus();
}

function closePanel(refocus) {
  if (!panel) return;
  panel.parentElement.hidden = true;
  panelOpen = false;
  setTriggersExpanded(false);
  if (refocus) (lastTrigger ?? document.querySelector('[data-role="region-change"]'))?.focus();
}

function setTriggersExpanded(v) {
  document.querySelectorAll('[data-role="region-change"], [data-role="region-cta"]')
    .forEach((b) => b.setAttribute('aria-expanded', String(v)));
}

// Синхронизация открытой панели после renderAll (смена языка/региона): текст ввода не трогаем.
function syncPanel(state) {
  renderChips(state);
  const input = panel.querySelector('[data-role="picker-input"]');
  const list = panel.querySelector('[data-role="picker-list"]');
  if (!list.hidden && input.value.trim()) renderList();
}

// ---------- Toast согласия на определение региона (Истории 40–41, R49–R51) ----------

// Один раз за сессию, только когда ответа ещё нет и пользователь не выбрал
// регион вручную. Неблокирующий: фокус не трогаем, пока пользователь сам не действует.
let consentToastShown = false;

function maybeShowConsentToast(state) {
  if (consentToastShown) return;
  if (region.consent.status().status !== null) return;
  if (region.current()) return; // ручной выбор сильнее согласия — не мешаем
  const host = document.querySelector('#overview');
  if (!host) return;
  consentToastShown = true;
  const lang = state.lang;
  const close = (node) => node.remove();
  const toast = createToast({
    text: t(lang, 'region.toast.text'),
    actions: [
      {
        label: t(lang, 'region.toast.change'),
        onClick: () => { close(toast); openPanel(state, null); },
      },
      {
        label: t(lang, 'region.toast.accept'),
        className: 'toast-btn toast-btn--primary',
        onClick: () => {
          region.consent.grant();
          close(toast);
          document.dispatchEvent(new CustomEvent('ci:consent'));
        },
      },
    ],
    dismiss: {
      label: t(lang, 'region.toast.dismiss'),
      onClick: () => { region.consent.dismiss(); close(toast); },
    },
  });
  host.appendChild(toast);
}

// ---------- Рендер секции ----------

export function render(appState) {
  if (typeof document === 'undefined') return;
  const root = document.querySelector('#overview');
  if (!root) return;
  current = appState;
  const { lang } = appState;
  const $ = (sel) => root.querySelector(sel);

  if (!root.dataset.heroBound) {
    root.dataset.heroBound = '1';
    $('[data-role="region-change"]').addEventListener('click', (e) => openPanel(current, e.currentTarget));
    $('[data-role="region-cta"]').addEventListener('click', (e) => openPanel(current, e.currentTarget));
  }

  // R14/R59.1: неделя без публикации (insufficient) — числа и даты hero берутся
  // из последнего валидного снапшота (баннер «Historical snapshot» — states.js);
  // качество данных (q) и пометка «Предварительная оценка» — просматриваемой недели.
  const snapshot = visibleSnapshotOf(appState);
  const viewed = appState.snapshot;

  // Глобальный индекс + статус + Δ + обе даты.
  const g = snapshot?.global;
  const gDelta = $('[data-role="global-delta"]');
  if (g) {
    $('[data-role="global-index"]').textContent = String(g.index);
    setStatus($('[data-role="global-status"]'), g.index, lang, false);
    setDelta(gDelta, g.delta);
    gDelta.hidden = false;
  } else {
    // Нет глобальных данных: показываем состояние явно, без прошлых чисел (§7).
    $('[data-role="global-index"]').textContent = '—';
    $('[data-role="global-status"]').textContent = t(lang, 'state.unavailable');
    gDelta.hidden = true;
  }
  // Пометка «Предварительная оценка» (R61) — качество просматриваемой недели,
  // а не видимого снапшота: insufficient-неделя объясняется рядом с числом.
  const prelim = $('[data-role="preliminary-note"]');
  if (prelim) {
    const show = needsPreliminaryNote(viewed);
    prelim.hidden = !show;
    if (show) prelim.textContent = t(lang, 'hero.preliminary');
  }

  if (snapshot?.published) $('[data-role="meta-published"]').textContent = date(lang, snapshot.published);
  if (snapshot?.through) $('[data-role="meta-through"]').textContent = date(lang, snapshot.through);

  // Персональная строка региона.
  const card = $('[data-role="region-card"]');
  const cta = $('[data-role="region-cta"]');
  const regId = appState.region;
  if (!regId) {
    // Нераспознанный пояс: нейтральный hero + CTA (R46.1).
    card.hidden = true;
    cta.hidden = false;
  } else {
    card.hidden = false;
    cta.hidden = true;
    const reg = region.get(regId);
    const cityName = chosenCity && chosenCity.region === regId ? chosenCity.name[lang] : reg.city[lang];
    $('[data-role="region-city"]').textContent = cityName;
    $('[data-role="region-name"]').textContent = reg.name[lang];
    const stats = $('[data-role="region-stats"]');
    const rdata = snapshot?.regions?.[regId];
    if (rdata) {
      stats.hidden = false;
      $('[data-role="region-unavailable"]').hidden = true;
      $('[data-role="region-index"]').textContent = String(rdata.index);
      setStatus($('[data-role="region-status"]'), rdata.index, lang, true);
      setDelta($('[data-role="region-delta"]'), rdata.delta);
      card.style.setProperty('--region-tone', `var(${risk.tone(risk.status(rdata.index))})`);
    } else {
      // Региональный снапшот недоступен: глобальный жив, строка — fallback (R56.1).
      stats.hidden = true;
      const un = $('[data-role="region-unavailable"]');
      un.hidden = false;
      un.textContent = t(lang, 'region.unavailable');
      card.style.setProperty('--region-tone', 'var(--text-muted)');
    }
    // Приписка — только после выбора города в поиске (История 9); чипы и геолокация — без неё.
    $('[data-role="region-note"]').hidden = !chosenCity;
  }

  if (panel && panelOpen) syncPanel(appState);
  maybeShowConsentToast(appState);
}
