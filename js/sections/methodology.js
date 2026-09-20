// Секция «Методология» (регистрируется как 'methodology'): что модель измеряет
// и не измеряет, пробелы в данных, конфликты источников, случаи отказа,
// известные ложные срабатывания и пропуски (PRD §8.3, методология §12);
// обоснование порогов историческими якорями и версия методологии (R66);
// открытые вопросы PRD §19 + v1.3, перенесённые документально (R85).
// Метафора часов нигде не используется (R79). Контент статичен — из словаря
// i18n; числовые параметры и формулы в публичный UI не выносятся (PRD §8.1,
// внутренние скоринги остаются в закрытой части методологии).

import { t } from '../i18n.js';

// Пункты списков и якоря порогов — из ключей словаря (§11.3: жёстких строк нет).
const LIST_KEYS = {
  measures: ['method.measures.1'],
  notMeasures: ['method.not.1', 'method.not.2', 'method.not.3'],
  gaps: ['method.gaps.1', 'method.gaps.2', 'method.gaps.3', 'method.gaps.4'],
  conflicts: ['method.conflicts.1', 'method.conflicts.2', 'method.conflicts.3'],
  failures: ['method.failures.1', 'method.failures.2', 'method.failures.3'],
  fpfn: ['method.fpfn.1', 'method.fpfn.2', 'method.fpfn.3'],
};

const ANCHOR_KEYS = [
  ['method.anchor.routine', '0–20'],
  ['method.anchor.proxy', '21–40'],
  ['method.anchor.local', '41–60'],
  ['method.anchor.conv', '61–80'],
  ['method.anchor.full', '81–96'],
  ['method.anchor.extreme', '97–100'],
];

const OPEN_QUESTION_COUNT = 25;

function list(lang, keys) {
  return `<ul>${keys.map((k) => `<li>${t(lang, k)}</li>`).join('')}</ul>`;
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="methodology"]');
  if (!host) return;
  const lang = appState.lang;
  const version = appState.snapshot?.methodology;

  const anchors = ANCHOR_KEYS.map(([key, range]) =>
    `<tr><td>${t(lang, key)}</td><td>${range}</td></tr>`).join('');
  const openQuestions = Array.from({ length: OPEN_QUESTION_COUNT }, (_, i) =>
    `<li>${t(lang, `method.open.${i + 1}`)}</li>`).join('');

  host.innerHTML = `
    <div class="method-block">
      <h3>${t(lang, 'method.measures.title')}</h3>
      ${list(lang, LIST_KEYS.measures)}
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.not.title')}</h3>
      ${list(lang, LIST_KEYS.notMeasures)}
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.gaps.title')}</h3>
      ${list(lang, LIST_KEYS.gaps)}
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.conflicts.title')}</h3>
      ${list(lang, LIST_KEYS.conflicts)}
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.failures.title')}</h3>
      ${list(lang, LIST_KEYS.failures)}
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.fpfn.title')}</h3>
      ${list(lang, LIST_KEYS.fpfn)}
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.thresholds.title')}</h3>
      <p>${t(lang, 'method.thresholds.intro')}</p>
      <table class="method-table">
        <thead><tr><th>${t(lang, 'method.anchor.col.event')}</th><th>${t(lang, 'method.anchor.col.range')}</th></tr></thead>
        <tbody>${anchors}</tbody>
      </table>
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.version.title')}</h3>
      <p>${t(lang, 'method.version.text', { version: version ?? '—' })}</p>
      <p>${t(lang, 'method.version.note')}</p>
    </div>
    <div class="method-block">
      <h3>${t(lang, 'method.open.title')}</h3>
      <ol class="method-open">${openQuestions}</ol>
    </div>`;
}
