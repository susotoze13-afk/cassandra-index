// Секция «Методология» (регистрируется как 'methodology'): что модель измеряет
// и не измеряет, пробелы в данных, конфликты источников, случаи отказа,
// известные ложные срабатывания и пропуски (PRD §8.3, методология §12);
// обоснование порогов историческими якорями и версия методологии (R66);
// открытые вопросы PRD §19 + v1.3, перенесённые документально (R85).
// Метафора часов нигде не используется (R79). Контент статичен — из словаря
// i18n; числовые параметры и формулы в публичный UI не выносятся (PRD §8.1,
// внутренние скоринги остаются в закрытой части методологии).

import { t } from '../i18n.js';
import * as risk from '../risk.js';
import { el } from '../ui.js';
import { CRITERIA_LIST } from '../criteria.js';

// Пункты списков и якоря порогов — из ключей словаря (§11.3: жёстких строк нет).
const LIST_KEYS = {
  measures: ['method.measures.1'],
  notMeasures: ['method.not.1', 'method.not.2', 'method.not.3'],
  gaps: ['method.gaps.1', 'method.gaps.2', 'method.gaps.3', 'method.gaps.4'],
  conflicts: ['method.conflicts.1', 'method.conflicts.2', 'method.conflicts.3'],
  failures: ['method.failures.1', 'method.failures.2', 'method.failures.3'],
  fpfn: ['method.fpfn.1', 'method.fpfn.2', 'method.fpfn.3'],
};

// Якоря порогов — ключи словаря в порядке risk.SCALE; сами диапазоны выводятся
// из risk.SCALE (таск 11: пороги живут только в risk.js — risk.SCALE и таблица
// не могут разойтись). Порядок ключей обязан совпадать с порядком SCALE.
const ANCHOR_KEYS = [
  'method.anchor.routine',
  'method.anchor.proxy',
  'method.anchor.local',
  'method.anchor.conv',
  'method.anchor.full',
  'method.anchor.extreme',
];

// Диапазоны шкалы из risk.SCALE: каждый следующий начинается с max+1 предыдущего.
export function thresholdRanges() {
  let start = 0;
  return risk.SCALE.map((step) => {
    const range = `${start}–${step.max}`;
    start = step.max + 1;
    return range;
  });
}

const OPEN_QUESTION_COUNT = 25;

// R05: полный перечень 45 критериев из js/criteria.js, сгруппированный по
// драйверам. Чистый шов: модель групп (заголовок драйвера + позиции) по языку —
// без DOM, тестируется. Названия драйверов — прозаические ключи словаря;
// названия и описания критериев — данные модуля criteria.js.
export function criteriaModel(lang) {
  const groups = [];
  for (const c of CRITERIA_LIST) {
    let group = groups.find((g) => g.driver === c.driver);
    if (!group) {
      group = {
        driver: c.driver,
        title: t(lang, `method.criteria.driver.${c.driver.toLowerCase()}`),
        items: [],
      };
      groups.push(group);
    }
    group.items.push({ id: c.id, name: c.name[lang], desc: c.desc[lang] });
  }
  return groups;
}

// Сворачиваемая группа драйвера: <details>/<summary> — нативная a11y
// (клавиатура и скринридер без скриптов). DOM только createElement + textContent.
function criteriaGroupNode(group) {
  const details = el('details', 'method-criteria-group');
  const summary = el('summary', 'method-criteria-summary');
  summary.appendChild(el('span', 'method-criteria-driver', group.title));
  summary.appendChild(el('span', 'method-criteria-count', String(group.items.length)));
  details.appendChild(summary);
  const ul = el('ul', 'method-criteria-list');
  for (const item of group.items) {
    const li = el('li', 'method-criteria-item');
    const head = el('div', 'method-criteria-head');
    head.appendChild(el('span', 'method-criteria-id', item.id));
    head.appendChild(el('span', 'method-criteria-name', item.name));
    li.appendChild(head);
    li.appendChild(el('div', 'method-criteria-desc', item.desc));
    ul.appendChild(li);
  }
  details.appendChild(ul);
  return details;
}

// Блок «Полный перечень критериев» для раздела (R05). Сигналы — без формул,
// шкал и порогов: это принципиально зафиксировано в js/criteria.js и его тесте.
function criteriaBlock(lang) {
  const block = el('div', 'method-block');
  block.appendChild(el('h3', '', t(lang, 'method.criteria.title')));
  block.appendChild(el('p', '', t(lang, 'method.criteria.intro')));
  for (const group of criteriaModel(lang)) {
    block.appendChild(criteriaGroupNode(group));
  }
  return block;
}

function list(lang, keys) {
  return `<ul>${keys.map((k) => `<li>${t(lang, k)}</li>`).join('')}</ul>`;
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="methodology"]');
  if (!host) return;
  const lang = appState.lang;
  const version = appState.snapshot?.methodology;

  const ranges = thresholdRanges();
  const anchors = ANCHOR_KEYS.map((key, i) =>
    `<tr><td>${t(lang, key)}</td><td>${ranges[i]}</td></tr>`).join('');
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
  // Перечень критериев — сразу после «Что модель измеряет»: это первое, что
  // ищет посетитель раздела (R05); прочие блоки методологии — после него.
  const anchor = host.querySelector('.method-block');
  host.insertBefore(criteriaBlock(lang), anchor?.nextSibling ?? null);
}
