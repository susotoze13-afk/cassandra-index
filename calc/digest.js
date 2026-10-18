// digest.js — недельный выпуск «что изменилось»: тема, текст, HTML письма и
// Telegram-разметка. Чистая сборка из снапшота недели: диска, сети и времени
// здесь нет, поэтому текст проверяется тестом, а доставка (calc/digest-send.js)
// не правит ни одного слова.
//
// Структура выпуска (R20): ровно DIGEST_ITEMS пунктов «что изменилось»
// (мировой индекс + три драйвера + предвестники либо регионы), ровно
// DIGEST_REGIONS регионов по величине недельного изменения, покрытие критериев
// и ссылки на сайт, data/public/index.json, data/public/trend.svg и архив
// digest.html. Ни одно число не выдумывается: нет поля в снапшоте — нет строки.
//
// Снапшот без прошлой недели (opts.prev = null) — законный первый выпуск:
// дельта не показывается (R02.1), падения нет. Отсутствие precursor — не «0 %»:
// пункта о предвестниках нет вообще (ADR 0047).
//
// Все подставляемые значения проходят escapeHtml — и в HTML письма, и в
// Telegram (parse_mode: HTML).

import { stateOf } from './engine.js';
import { PARAMS } from './params.js';
import { PRECURSOR_SUBGROUPS } from '../js/data.js';
import { t } from '../js/i18n.js';
import { regionForTaxonomy } from '../js/region.js';

export const DIGEST_ITEMS = 5;
export const DIGEST_REGIONS = 3;
export const DIGEST_SCHEMA = 'cassandra-index-digest';
export const DIGEST_SCHEMA_VERSION = 1;

const DEFAULT_SITE = 'https://cassindex.ru';

// Адреса публичных файлов — относительно корня сайта: те же пути, что пишет
// calc/public-export.js и calc/digest-export.js.
const PATHS = {
  data: 'data/public/index.json',
  chart: 'data/public/trend.svg',
  archive: 'digest.html',
};

const CONTRIBUTION_LABELS = { high: 'высокий', medium: 'средний', low: 'низкий' };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function signed(n) {
  if (!isNum(n)) return '—';
  return n > 0 ? `+${n}` : String(n);
}

// weekLabel('2026-10-18') → '18 октября 2026 года' — формат сайта, без ICU.
function weekLabel(iso) {
  if (typeof iso !== 'string' || !DATE_RE.test(iso)) return null;
  const month = MONTHS_GENITIVE[Number(iso.slice(5, 7)) - 1];
  if (!month) return null;
  return `${Number(iso.slice(8, 10))} ${month} ${iso.slice(0, 4)} года`;
}

function stateLabel(index) {
  const id = stateOf(index, PARAMS);
  if (!id) return null;
  const label = t('ru', `status.${id}`);
  return label === `status.${id}` ? null : label;
}

function links(site) {
  return {
    site,
    data: `${site}/${PATHS.data}`,
    chart: `${site}/${PATHS.chart}`,
    archive: `${site}/${PATHS.archive}`,
  };
}

function regionNames(taxonomy) {
  const names = new Map();
  for (const region of regionForTaxonomy(taxonomy)) {
    names.set(region.id, region.name && region.name.ru ? region.name.ru : region.id);
  }
  return names;
}

// Три региона по величине недельного изменения: |delta| убыванием, затем
// индекс убыванием, затем id — порядок детерминирован, а не «как в объекте».
// Слепой регион (background: true) в рейтинг не входит: у него дельта по
// построению равна глобальной, и это фон, а не региональное изменение.
function topRegions(snapshot, limit) {
  const taxonomy = typeof snapshot.regions_taxonomy === 'string' ? snapshot.regions_taxonomy : '1.0';
  const names = regionNames(taxonomy);
  const rows = [];
  for (const [id, r] of Object.entries(snapshot.regions || {})) {
    if (!r || typeof r !== 'object') continue;
    if (r.background === true) continue;
    if (!isNum(r.index) && !isNum(r.delta)) continue;
    rows.push({
      id,
      name: names.get(id) || id,
      index: isNum(r.index) ? r.index : null,
      delta: isNum(r.delta) ? r.delta : null,
    });
  }
  rows.sort((a, b) => {
    const da = isNum(a.delta) ? Math.abs(a.delta) : -1;
    const db = isNum(b.delta) ? Math.abs(b.delta) : -1;
    if (da !== db) return db - da;
    const ia = isNum(a.index) ? a.index : -1;
    const ib = isNum(b.index) ? b.index : -1;
    if (ia !== ib) return ib - ia;
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });
  return rows.slice(0, limit);
}

function regionFigure(region) {
  if (isNum(region.index) && isNum(region.delta)) {
    return `${region.name} — ${region.index} (${signed(region.delta)})`;
  }
  if (isNum(region.index)) return `${region.name} — ${region.index}`;
  return `${region.name} — изменение ${signed(region.delta)}`;
}

function coverageLine(snapshot) {
  const c = snapshot.coverageCriteria;
  if (c && isNum(c.covered) && isNum(c.total)) {
    return `Покрытие критериев недели — ${c.covered} из ${c.total}.`;
  }
  return 'Покрытие критериев недели в снапшоте не опубликовано.';
}

function globalItem(snapshot, hasPrev) {
  const g = snapshot.global && typeof snapshot.global === 'object' ? snapshot.global : null;
  if (!g || !isNum(g.index)) {
    return 'Мировой индекс недели не опубликован: данных недостаточно.';
  }
  const state = stateLabel(g.index);
  const statePart = state ? `; состояние «${state.toLowerCase()}»` : '';
  if (hasPrev && isNum(g.delta)) {
    return `Мировой индекс — ${g.index} из 100; изменение за неделю ${signed(g.delta)}${statePart}.`;
  }
  return `Мировой индекс — ${g.index} из 100${statePart}. Это первый выпуск: прошлой недели в публикации нет.`;
}

function driverItem(driver, number) {
  const label = driver && driver.label && typeof driver.label.ru === 'string'
    ? driver.label.ru.trim()
    : '';
  if (!label) return null;
  const contribution = CONTRIBUTION_LABELS[driver.contribution];
  const tail = contribution ? ` Вклад — ${contribution}.` : '';
  return `Драйвер ${number}: ${label}.${tail}`;
}

function precursorItem(snapshot) {
  const p = snapshot.precursor;
  if (!p || typeof p !== 'object' || !isNum(p.value)) return null;
  const signaling = isNum(p.signalingSubgroups) ? p.signalingSubgroups : null;
  const tail = signaling === null ? '' : `; сигналящих подгрупп ${signaling} из ${PRECURSOR_SUBGROUPS}`;
  return `Слой предвестников (Д9) — ${p.value} из 100${tail}.`;
}

function regionItem(regions) {
  if (regions.length === 0) return null;
  const figures = regions.map((r) => `${r.name} (${signed(r.delta)})`).join(', ');
  return `Сильнее всего изменились регионы: ${figures}.`;
}

// buildDigest(snapshot, opts) → {week, subject, text, html, telegram,
//   meta: {items, regions, hasPrev}}.
// opts = {site, prev, chartUrl}; prev — снапшот прошлой недели или null.
export function buildDigest(snapshot, opts = {}) {
  const s = snapshot || {};
  const site = (typeof opts.site === 'string' && opts.site.trim()) || DEFAULT_SITE;
  const url = links(site);
  if (typeof opts.chartUrl === 'string' && opts.chartUrl.trim()) url.chart = opts.chartUrl;
  const hasPrev = Boolean(opts.prev);

  const week = typeof s.published === 'string' && DATE_RE.test(s.published)
    ? s.published
    : null;
  const label = weekLabel(week);

  const items = [globalItem(s, hasPrev)];
  const drivers = Array.isArray(s.drivers) ? s.drivers : [];
  drivers.slice(0, 3).forEach((driver, i) => {
    const item = driverItem(driver, i + 1);
    if (item) items.push(item);
  });
  const precursor = precursorItem(s);
  const regions = topRegions(s, DIGEST_REGIONS);
  const regionPoint = regionItem(regions);
  // Пятый пункт: предвестники, если слой опубликован, иначе регионы. Контракт
  // снапшота гарантирует три драйвера, поэтому валидная неделя даёт ровно
  // DIGEST_ITEMS пунктов; DIGEST_ITEMS — верхняя граница, а не выдуманное число.
  if (precursor) items.push(precursor);
  else if (regionPoint) items.push(regionPoint);
  const outItems = items.slice(0, DIGEST_ITEMS);

  const figures = regions.map(regionFigure);
  const regionsLine = figures.length
    ? `Регионы: ${figures.join('; ')}.`
    : 'Регионы в снапшоте не опубликованы.';
  const coverage = coverageLine(s);

  const headline = label
    ? `Cassandra Index — неделя ${label}`
    : 'Cassandra Index — неделя без даты';

  const g = s.global && typeof s.global === 'object' ? s.global : null;
  const subjectHead = label ? `Cassandra Index, неделя ${label}` : 'Cassandra Index';
  const subjectTail = [];
  if (g && isNum(g.index)) {
    const state = stateLabel(g.index);
    subjectTail.push(`${g.index} из 100${state ? `, ${state.toLowerCase()}` : ''}`);
    if (hasPrev && isNum(g.delta)) subjectTail.push(signed(g.delta));
  }
  const subject = subjectTail.length
    ? `${subjectHead}: ${subjectTail.join(', ')}`
    : subjectHead;

  const numberedItems = outItems.map((item, i) => `${i + 1}. ${item}`);
  const textLines = [
    headline,
    ...numberedItems,
    regionsLine,
    coverage,
    `Сайт: ${url.site}`,
    `Данные: ${url.data}`,
    `Кривая: ${url.chart}`,
    `Архив выпусков: ${url.archive}`,
  ];

  const telegramLines = [
    `<b>${escapeHtml(headline)}</b>`,
    ...outItems.map((item, i) => `${i + 1}. ${escapeHtml(item)}`),
    escapeHtml(regionsLine),
    escapeHtml(coverage),
    `<a href="${escapeHtml(url.site)}">Сайт</a> · <a href="${escapeHtml(url.data)}">Данные JSON</a>`
      + ` · <a href="${escapeHtml(url.chart)}">Кривая</a>`
      + ` · <a href="${escapeHtml(url.archive)}">Архив</a>`,
  ];

  const htmlLines = [
    '<!doctype html>',
    '<html lang="ru">',
    '<head>',
    '  <meta charset="utf-8">',
    `  <title>${escapeHtml(subject)}</title>`,
    '</head>',
    '<body>',
    `  <h1>${escapeHtml(headline)}</h1>`,
    '  <ol>',
    ...outItems.map((item) => `    <li>${escapeHtml(item)}</li>`),
    '  </ol>',
    `  <p>${escapeHtml(regionsLine)}</p>`,
    `  <p>${escapeHtml(coverage)}</p>`,
    '  <p>',
    `    <a href="${escapeHtml(url.site)}">Сайт</a> · `,
    `    <a href="${escapeHtml(url.data)}">Данные (JSON)</a> · `,
    `    <a href="${escapeHtml(url.chart)}">Кривая</a> · `,
    `    <a href="${escapeHtml(url.archive)}">Архив выпусков</a>`,
    '  </p>',
    '</body>',
    '</html>',
    '',
  ];

  return {
    week,
    subject,
    text: `${textLines.join('\n')}\n`,
    html: htmlLines.join('\n'),
    telegram: telegramLines.join('\n'),
    meta: { items: outItems.length, regions: regions.length, hasPrev },
  };
}
