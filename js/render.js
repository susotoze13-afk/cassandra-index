// render.js — вся DOM-разметка всех секций. Скелет dispatch: таск 02 регистрирует
// рендереры секций через registerSection(); renderAll проходит по SECTIONS и вызывает
// зарегистрированные. appState: { lang, region, detected, week, snapshot, dataState }.

import { t } from './i18n.js';
import { render as heroRender } from './sections/hero.js';
import { render as driversRender } from './sections/drivers.js';
import { render as trendRender } from './sections/trend.js';
import { render as regionsRender } from './sections/regions.js';
import { render as statesRender } from './sections/states.js';
import { render as historyRender } from './sections/history.js';
import { render as methodologyRender } from './sections/methodology.js';

export const SECTIONS = [
  'hero',
  'regions',
  'trend',
  'drivers',
  'states',
  'history',
  'methodology',
];

const registry = new Map();

// Секция hero — первая; остальные регистрируют свои таски.
registerSection('hero', heroRender);
registerSection('drivers', driversRender);
registerSection('trend', trendRender);
registerSection('regions', regionsRender);
registerSection('states', statesRender);
registerSection('history', historyRender);
registerSection('methodology', methodologyRender);

export function registerSection(name, renderFn) {
  if (!SECTIONS.includes(name)) return false;
  registry.set(name, renderFn);
  return true;
}

// renderSection(name, appState) → true если секция отрендерена, false если рендерер
// ещё не зарегистрирован (скелет; таск 02 наполняет).
export function renderSection(name, appState) {
  const fn = registry.get(name);
  if (typeof fn !== 'function') return false;
  fn(appState);
  return true;
}

export function renderAll(appState) {
  const rendered = [];
  for (const name of SECTIONS) {
    if (renderSection(name, appState)) rendered.push(name);
  }
  return rendered;
}

// applyI18n(root, lang) — проставляет текст по [data-i18n] из словаря (§11.3:
// жёстких строк вне словаря нет; дефолтная RU-разметка в HTML заменяется здесь).
export function applyI18n(root, lang) {
  if (!root?.querySelectorAll) return;
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(lang, key);
  });
  root.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(lang, el.getAttribute('data-i18n-aria')));
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(lang, el.getAttribute('data-i18n-placeholder')));
  });
}
