// js/analytics.js — согласие на аналитику и подключение cookie-less счётчика
// Cloudflare Web Analytics (https://developers.cloudflare.com/web-analytics/).
// Выбран как privacy-friendly: без cookie, без отслеживания между сайтами, без
// сохранения персональных данных. Проект сохраняет явное согласие
// (localStorage cassandra.analytics.consent). Загрузчик живёт в бандле
// (createElement + src) — CSP остаётся строгим (см. head index.html).
// Тесты: tests/analytics.test.js.

import { createToast } from './ui.js';
import { t } from './i18n.js';

// Beacon-токен Cloudflare Web Analytics (Дашборд → Web Analytics → сайт
// cassindex.ru → установка «JS snippet»). Это НЕ секрет: токен встроен в HTML
// публичной страницы. Пусто = аналитика не настроена: баннер и загрузка выключены.
export const CF_BEACON_TOKEN = '49a23a5d11824903ad1cc3a2c76223a9';

export const CONSENT_KEY = 'cassandra.analytics.consent';

// beacon.min.js раздаётся Cloudflare; отчёты уходят на cloudflareinsights.com.
const BEACON_SRC = 'https://static.cloudflareinsights.com/beacon.min.js';

export function isConfigured() {
  return typeof CF_BEACON_TOKEN === 'string' && CF_BEACON_TOKEN.length > 0;
}

function storage() {
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch {
    /* доступ к хранилищу запрещён — считаем его отсутствующим */
  }
  return null;
}

function write(key, status) {
  const ls = storage();
  if (!ls) return false;
  try {
    ls.setItem(key, JSON.stringify({ v: 1, status, at: new Date().toISOString() }));
    return true;
  } catch {
    return false;
  }
}

// Согласие на аналитику: {status:'granted'|'denied'|null, at}.
// В отличие от region_consent отказ НЕ истекает: аналитику не переспрашиваем.
// Вернуть согласие можно, очистив данные сайта в браузере.
export const consent = {
  KEY: CONSENT_KEY,

  status() {
    const ls = storage();
    if (!ls) return { status: null, at: null };
    let raw = null;
    try {
      raw = JSON.parse(ls.getItem(this.KEY) ?? 'null');
    } catch {
      raw = null;
    }
    if (!raw || (raw.status !== 'granted' && raw.status !== 'denied')) {
      return { status: null, at: null };
    }
    return { status: raw.status, at: raw.at ?? null };
  },

  grant() {
    return write(this.KEY, 'granted');
  },

  deny() {
    return write(this.KEY, 'denied');
  },
};

// Подключение счётчика: вставляет beacon.min.js через createElement, передавая
// токен в data-cf-beacon. Тип — module (официальный сниппет Cloudflare; модули
// выполняются отложенно). No-op вне браузера и при пустом токене — безопасно в тестах.
export function loadCounter(token = CF_BEACON_TOKEN) {
  if (typeof token !== 'string' || token.length === 0) return false;
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  if (window.__ciCounterLoaded) return false;
  const script = document.createElement('script');
  script.type = 'module';
  script.src = BEACON_SRC;
  script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
  document.head.appendChild(script);
  window.__ciCounterLoaded = true;
  return true;
}

// Загрузка при уже выданном согласии — вызывается при старте приложения.
export function maybeInit() {
  if (!isConfigured()) return false;
  if (consent.status().status !== 'granted') return false;
  return loadCounter();
}

// Баннер согласия: один раз за сессию и только когда счётчик настроен, ответа ещё
// нет, пользователь уже ответил на региональное согласие (чтобы два toast не
// наслаивались) и на экране нет другого toast.
let bannerShown = false;

export function maybeShowBanner({ lang = 'ru', regionAnswered = false } = {}) {
  if (bannerShown) return null;
  if (!isConfigured()) return null;
  if (!regionAnswered) return null;
  if (consent.status().status !== null) return null;
  if (typeof document === 'undefined') return null;
  if (document.querySelector('.toast')) return null;
  const host = document.querySelector('#overview');
  if (!host) return null;
  bannerShown = true;
  const toast = createToast({
    text: t(lang, 'analytics.banner.text'),
    actions: [
      {
        label: t(lang, 'analytics.banner.accept'),
        className: 'toast-btn toast-btn--primary',
        onClick: () => {
          consent.grant();
          toast.remove();
          loadCounter();
        },
      },
      {
        label: t(lang, 'analytics.banner.decline'),
        onClick: () => {
          consent.deny();
          toast.remove();
        },
      },
    ],
  });
  host.appendChild(toast);
  return toast;
}
