// Секция «Что это значит для моего региона?» (регистрируется как 'regions'):
// ranked-лист регионов набора недели по индексу убыванию — «где выше риск»
// (ADR 0069 §2: не по |Δ|).
// Семантический ol/li — не карта: карта не может быть единственным источником
// значения. Клик/фокус раскрывает карточку: статус, Δ, драйверы, уверенность
// (с причиной при сниженной), источники — тот же аккордеон-шаблон, что в таске 03
// (переиспользуются чистые швы confidenceInfo/levelLabel и общий аккордеон
// источников buildSourcesAccordion из drivers.js — таск 11).
// Чистые швы (rankedRegions, orderedForDisplay, formatIndex, needsSignalsNote,
// statusLabel) — без DOM, тестируются.

import { t } from '../i18n.js';
import * as risk from '../risk.js';
import * as region from '../region.js';
import { el, deltaClass } from '../ui.js';
import { formatDelta, deltaArrow, isBackgroundRegion } from './hero.js';
import { confidenceInfo, levelLabel, driverLabel, buildSourcesAccordion, quoteLookup } from './drivers.js';

// Ranked-лист: все регионы набора отображаемой недели по индексу убыванию;
// при равенстве индекса — по id (ADR 0069 §2), чтобы порядок не зависел от
// порядка справочника и был воспроизводим. Набор — по версии таксономии
// недели (ADR 0028): 6 строк на v1-неделе, 12 на v2. Битые записи
// (нечисловой индекс/Δ) пропускаем — нечисловую дельту в данные не вводить.
export function rankedRegions(snapshot) {
  const regs = snapshot?.regions;
  if (!regs || typeof regs !== 'object') return [];
  const set = region.regionForTaxonomy(snapshot?.regions_taxonomy);
  const rows = [];
  for (const r of set) {
    const d = regs[r.id];
    if (!d || typeof d.index !== 'number' || !Number.isFinite(d.index)) continue;
    if (typeof d.delta !== 'number' || !Number.isFinite(d.delta)) continue;
    rows.push({ id: r.id, ...d });
  }
  rows.sort((a, b) => {
    if (a.index !== b.index) return b.index - a.index;
    if (a.id === b.id) return 0;
    return a.id < b.id ? -1 : 1;
  });
  return rows;
}

// Q16a: личный регион показывается первой строкой в DOM, остальные сохраняют
// строгий порядок по индексу (перестановка, а не вторая сортировка). Чистый
// шов — порядок строк проверяется без DOM.
export function orderedForDisplay(rows, personal) {
  const list = Array.isArray(rows) ? rows : [];
  if (!personal) return list.slice();
  const own = list.filter((r) => r.id === personal);
  if (!own.length) return list.slice();
  return [...own, ...list.filter((r) => r.id !== personal)];
}

// Формат индекса региона — строго из данных (ADR 0069 §2, Q2): 73.4 → «73.4»,
// целое 73 → «73», `.0` не навязывается (образец — formatPp в contribution.js).
// Нечисловое значение — пустая строка: ячейка не рисуется, «NaN» не печатается.
export function formatIndex(value) {
  return typeof value === 'number' && Number.isFinite(value) ? String(value) : '';
}

// Q13: пометка «мало региональных сигналов» при signals < 2. Поле опционально:
// демо-недели его не несут, и отсутствие — это «неизвестно», а не ноль сигналов.
export function needsSignalsNote(row) {
  return typeof row?.signals === 'number' && Number.isFinite(row.signals) && row.signals < 2;
}

// Слово статуса: нижний регистр — для встроенной строки (как в hero), верхний —
// для автономной подписи в карточке региона. Шкала §10 + словарь; вне шкалы — ''.
export function statusLabel(lang, index, lower = true) {
  const id = risk.status(index);
  return id ? t(lang, `${lower ? 'statusLower' : 'status'}.${id}`) : '';
}

// Страновой под-блок «По странам» (R08i): чистый шов — строки опубликованных
// стран из опционального блока snapshot.countries. null без блока / пустых rows
// (недели раньше гейта слоя — под-блок не рендерится, секция прежняя). Строки
// без числовой delta/index пропускаются; сортировка по |Δ|, при равенстве —
// по алфавиту имени; имя — name.ru, fallback name.en, далее ISO2.
export function countryRows(snapshot) {
  const block = snapshot?.countries;
  const data = block && typeof block === 'object' ? block.rows : null;
  if (!data || typeof data !== 'object') return null;
  const rows = [];
  for (const [iso, d] of Object.entries(data)) {
    if (!d || typeof d.delta !== 'number' || !Number.isFinite(d.delta)) continue;
    if (typeof d.index !== 'number' || !Number.isFinite(d.index)) continue;
    const nameRu = d.name && typeof d.name.ru === 'string' ? d.name.ru : '';
    const nameEn = d.name && typeof d.name.en === 'string' ? d.name.en : '';
    rows.push({
      iso,
      name: nameRu || nameEn || iso,
      index: d.index,
      delta: d.delta,
      background: d.background === true,
      region: d.region,
    });
  }
  if (!rows.length) return null;
  rows.sort((a, b) => {
    const byAbs = Math.abs(b.delta) - Math.abs(a.delta);
    if (byAbs !== 0) return byAbs;
    return a.name.localeCompare(b.name, 'ru');
  });
  return rows;
}

// ---------- DOM ----------

function deltaSpan(lang, value, extraClass = '') {
  const span = el('span', `delta ${extraClass}`.trim());
  const cls = deltaClass(value);
  if (cls) span.classList.add(cls);
  span.textContent = `${deltaArrow(value)} ${formatDelta(value)}`;
  span.setAttribute('aria-label', `${t(lang, 'hero.week.change')}: ${formatDelta(value)}`);
  return span;
}

// Пометка для слепого региона (R02): вместо Δ, поданной как региональная динамика,
// — честное объяснение, что индекс несёт глобальный фон. Тон --text-muted (CSS).
function backgroundNote(lang) {
  return el('span', 'region-background', t(lang, 'region.background'));
}

// Пометка «мало региональных сигналов» (Q13, ADR 0069 §2): текст, не только
// цвет — отклонение региона при 0–1 сигнале опирается на узкий набор данных.
function signalsNote(lang) {
  return el('span', 'region-signals-low', t(lang, 'region.signals.low'));
}

// Пометка для слепой страны: вместо Δ — честное объяснение (тот же смысл, что
// у регионов, тон --text-muted через CSS-класс .country-background).
function countryBackgroundNote(lang) {
  return el('span', 'country-background', t(lang, 'country.background'));
}

// Страновой под-блок после ranked-списка (R08i): семантический ul, строка =
// страна + индекс + Δ (у слепой страны — пометка вместо Δ), сортировка по |Δ|
// — на шве countryRows. Строки — только из словаря country.*; a11y-анонс
// через live-регион, как в trend (R63).
function buildCountryBlock(lang, rows) {
  const block = el('div', 'country-block');

  const head = el('h3', 'country-title');
  head.append(el('span', 'country-title-text', t(lang, 'country.title')));
  head.append(el('span', 'country-count', t(lang, 'country.count', { n: rows.length })));
  block.append(head);

  const list = el('ul', 'country-list');
  rows.forEach((row) => {
    const li = el('li', 'country-row');
    li.append(el('span', 'country-name', row.name));
    li.append(el('span', 'country-row-index', `${row.index} ${t(lang, 'hero.index.of')}`));
    li.append(row.background ? countryBackgroundNote(lang) : deltaSpan(lang, row.delta));
    list.append(li);
  });
  block.append(list);
  block.append(el('p', 'country-note', t(lang, 'country.note')));

  const live = document.querySelector('[data-role="a11y-live"]');
  if (live) live.textContent = `${t(lang, 'country.title')}: ${t(lang, 'country.count', { n: rows.length })}`;
  return block;
}

// Источники драйвера — общий аккордеон-шаблон §4.3.1 из drivers.js (таск 11);
// регион оборачивает узлы в .region-driver-sources.
function wrapSourcesAccordion(lang, drv, uid, lookup) {
  const sources = Array.isArray(drv?.sources) ? drv.sources : [];
  const wrap = el('div', 'region-driver-sources');
  if (!sources.length) return wrap;
  const acc = buildSourcesAccordion(lang, sources, `region-src-${uid}`, lookup);
  wrap.append(acc.toggle, acc.list, acc.moreBtn);
  return wrap;
}

// Главные драйверы региона — кратко: лейбл/наблюдение, вклад и уверенность словами,
// причина при сниженной уверенности (общий компонент confidenceInfo, таск 03).
function buildDriverBlock(lang, drv, uid, lookup) {
  const block = el('div', 'region-driver');

  const label = driverLabel(lang, drv);
  if (label) block.append(el('h4', 'region-driver-label', label));
  block.append(el('p', 'region-driver-observation', drv.observation?.[lang] ?? ''));

  const meta = el('p', 'driver-meta');
  const contribution = el('span', 'driver-chip');
  contribution.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.contribution.label')}:`));
  contribution.append(el('span', 'driver-chip-value', levelLabel(lang, 'contribution', drv.contribution)));
  const conf = confidenceInfo(lang, drv);
  const confidence = el('span', 'driver-chip');
  confidence.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.confidence.label')}:`));
  confidence.append(el('span', 'driver-chip-value', conf.word));
  meta.append(contribution, el('span', 'driver-meta-sep', '·'), confidence);
  block.append(meta);
  if (conf.note) block.append(el('p', 'driver-confidence-note', conf.note));

  block.append(wrapSourcesAccordion(lang, drv, uid, lookup));
  return block;
}

// Раскрытая карточка региона (§4.6): статус, Δ, уверенность региона, драйверы, источники.
function buildDetail(lang, row, data, personal, lookup) {
  const detail = el('div', 'region-detail');

  // Статус + индекс + Δ: значения не только цветом — слова и знак рядом с тоном (§12).
  // R02: у слепого региона (background:true) Δ не подаётся как региональная — пометка.
  const head = el('p', 'region-detail-head');
  head.append(el('span', 'status', statusLabel(lang, row.index, false)));
  head.append(el('span', 'region-detail-index', `${formatIndex(row.index)} ${t(lang, 'hero.index.of')}`));
  if (isBackgroundRegion(row)) {
    head.append(backgroundNote(lang));
  } else {
    const d = deltaSpan(lang, row.delta);
    d.append(el('span', 'region-detail-week', ` ${t(lang, 'hero.week.change')}`));
    head.append(d);
  }
  if (needsSignalsNote(row)) head.append(signalsNote(lang));
  detail.append(head);

  // Уверенность по региону — словами; причина — если снапшот её отдаёт (поле
  // confidenceNote на уровне региона; демо-данные пока несут причины на драйверах —
  // они показываются ниже в блоках драйверов через тот же confidenceInfo).
  const conf = confidenceInfo(lang, data);
  const confLine = el('p', 'driver-meta');
  const chip = el('span', 'driver-chip');
  chip.append(el('span', 'driver-chip-label', `${t(lang, 'drivers.confidence.label')}:`));
  chip.append(el('span', 'driver-chip-value', conf.word));
  confLine.append(chip);
  detail.append(confLine);
  if (conf.note) detail.append(el('p', 'driver-confidence-note', conf.note));

  // Приписка про контекстный риск — всегда в карточке (§5.1: индекс привязан к региону).
  detail.append(el('p', 'region-note', t(lang, 'region.note')));

  const drivers = Array.isArray(data?.drivers) ? data.drivers : [];
  if (drivers.length) {
    detail.append(el('h3', 'region-detail-subtitle', t(lang, 'regions.drivers')));
    drivers.forEach((drv, i) => detail.append(buildDriverBlock(lang, drv, `${row.id}-${i}`, lookup)));
  }

  return detail;
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="regions"]');
  if (!host) return;
  const { lang, snapshot } = appState;
  const personal = appState.region;
  host.innerHTML = '';

  const rows = rankedRegions(snapshot);
  if (!rows.length) {
    host.append(el('p', 'region-unavailable', t(lang, 'region.unavailable')));
    return;
  }
  // Место в строгом порядке по индексу — номер строки не зависит от
  // перестановки личного региона (он остаётся на своей позиции по индексу).
  const rankOf = new Map(rows.map((r, i) => [r.id, i + 1]));
  const lookup = quoteLookup(snapshot);

  const list = el('ol', 'regions-list');
  orderedForDisplay(rows, personal).forEach((row) => {
    const li = el('li', 'region-row');
    if (row.id === personal) {
      li.classList.add('is-personal');
      // ADR 0028/0069: личный регион пиннится вверху — первой строкой в DOM,
      // а на узких экранах ещё и CSS-порядком (класс-модификатор). Бейдж
      // «ваш регион» остаётся отдельным сигналом, порядок — не единственный.
      li.classList.add('region-row--pinned');
    }

    // Строка-раскрывалка: №, регион, индекс, Δ со знаком и цветом; личный регион — текстовым бейджем.
    const head = el('button', 'region-row-head');
    head.type = 'button';
    head.setAttribute('aria-expanded', 'false');
    const detailId = `region-detail-${row.id}`;
    head.setAttribute('aria-controls', detailId);
    head.append(el('span', 'region-rank', String(rankOf.get(row.id) ?? '')));
    head.append(el('span', 'region-name', region.get(row.id)?.name[lang] ?? row.id));
    if (row.id === personal) {
      // Бейдж текстом + aria — пометка не единственным полаганием на цвет (§12).
      head.append(el('span', 'region-yours', t(lang, 'regions.yours')));
      const bg = isBackgroundRegion(row);
      const signalsAria = needsSignalsNote(row) ? `, ${t(lang, 'region.signals.low')}` : '';
      const place = region.get(row.id)?.name[lang] ?? row.id;
      if (bg) {
        head.setAttribute('aria-label',
          `${place}, ${formatIndex(row.index)} ${t(lang, 'hero.index.of')}, ${t(lang, 'region.background')}, ${t(lang, 'regions.yours')}${signalsAria}`);
      } else {
        head.setAttribute('aria-label',
          `${place}, ${formatIndex(row.index)} ${t(lang, 'hero.index.of')}, ${formatDelta(row.delta)}, ${t(lang, 'regions.yours')}${signalsAria}`);
      }
    }
    const indexText = formatIndex(row.index);
    if (indexText) {
      head.append(el('span', 'region-row-index', `${indexText} ${t(lang, 'hero.index.of')}`));
    }
    head.append(isBackgroundRegion(row) ? backgroundNote(lang) : deltaSpan(lang, row.delta));
    if (needsSignalsNote(row)) head.append(signalsNote(lang));

    const detail = buildDetail(lang, row, snapshot.regions[row.id], row.id === personal, lookup);
    detail.id = detailId;
    detail.hidden = true;

    head.addEventListener('click', () => {
      const open = head.getAttribute('aria-expanded') === 'true';
      head.setAttribute('aria-expanded', String(!open));
      detail.hidden = open;
      head.classList.toggle('is-open', !open);
    });

    li.append(head, detail);
    list.append(li);
  });
  host.append(list);

  // Страновой под-блок (R08i): только при наличии блока countries в снапшоте;
  // без него — секция прежняя.
  const countries = countryRows(snapshot);
  if (countries) host.append(buildCountryBlock(lang, countries));
}
