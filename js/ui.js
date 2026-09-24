// js/ui.js — общие хелперы интерфейса, единый экземпляр каждого (таск 11):
// el() — DOM-фабрика секций; deltaClass() — класс тона Δ из risk.deltaTone;
// resolveLang() — язык из localStorage/navigator; parseWeekParam() — разбор ?week=;
// createToast() — неблокирующий toast (role=status, кнопки-действия, a11y).
// Модуль без побочных эффектов: безопасен для импорта из privacy.html и тестов.

import * as risk from './risk.js';

// DOM-фабрика: createElement + className + textContent (конвенция проекта —
// никакого innerHTML со строками).
export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Класс тона недельного изменения — из risk.deltaTone (единый каскад §12,
// пороги направления живут в risk.js, а не в знаковых ветках по месту).
const DELTA_CLASS = {
  '--state-very': 'delta--rise',
  '--state-calm': 'delta--fall',
  '--text-secondary': 'delta--same',
};

export function deltaClass(change) {
  return DELTA_CLASS[risk.deltaTone(change)] ?? null;
}

export const LANG_KEY = 'cassandra.lang';

// §11.1: сохранённый выбор побеждает; без сохранённого — язык браузера;
// не определён — дефолт 'ru'.
export function resolveLang() {
  try {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(LANG_KEY) : null;
    if (saved === 'ru' || saved === 'en') return saved;
  } catch {
    /* хранилище недоступно — остаёмся на дефолте */
  }
  const nav = typeof navigator !== 'undefined' && navigator.language ? navigator.language : '';
  if (!nav) return 'ru';
  return nav.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

// Разбор ?week= из query-строки: строгий формат YYYY-MM-DD, иначе null.
// Владелец разбора — один на app.js/share.js/sections.
export function parseWeekParam(search) {
  if (typeof search !== 'string' || !search) return null;
  const q = new URLSearchParams(search).get('week');
  return q && /^\d{4}-\d{2}-\d{2}$/.test(q) ? q : null;
}

// Неблокирующий toast: role=status + aria-live polite, фокус не воруется,
// кнопки-действия с доступными именами (сторона вызывающего кода — монтирование
// и обработчики). actions: [{ label, onClick, className? }]; dismiss: {label, onClick}.
// Возвращает корневой элемент (не прикреплён к документу).
export function createToast({ text, actions = [], dismiss = null }) {
  const node = document.createElement('div');
  node.className = 'toast';
  node.setAttribute('role', 'status');
  node.setAttribute('aria-live', 'polite');
  const body = document.createElement('p');
  body.className = 'toast-text';
  body.textContent = text;
  node.appendChild(body);
  const controls = document.createElement('div');
  controls.className = 'toast-actions';
  for (const a of actions) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = a.className ?? 'toast-btn';
    b.textContent = a.label;
    b.addEventListener('click', a.onClick);
    controls.appendChild(b);
  }
  if (dismiss) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'toast-close';
    b.setAttribute('aria-label', dismiss.label);
    b.textContent = '×';
    b.addEventListener('click', dismiss.onClick);
    controls.appendChild(b);
  }
  node.appendChild(controls);
  return node;
}
