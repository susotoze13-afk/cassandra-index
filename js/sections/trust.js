// Секция «Витрина доверия» (регистрируется в js/render.js как 'trust'):
// компактная строка-факт сразу под hero — 46 критериев · N источников ·
// M независимых кластеров · S слепой регион · методология X.Y. Клик раскрывает
// честные детали: распределение источников по кластерам, долю гос/госфинансируемых
// СМИ (нейтрально), число непокрытых критериев и — только при заметном значении —
// строку чувствительности индекса. Числа берутся из уже загруженного снапшота
// недели (calc/ не читается, ничего не пересчитывается); единственное, что сайт
// добавляет своего, — общее число критериев из статического js/criteria.js.
// Чистый шов trustFacts(snapshot) — без DOM, тестируется.

import { t } from '../i18n.js';
import * as region from '../region.js';
import { CRITERIA_LIST } from '../criteria.js';

// Порог показа строки чувствительности, п.п. — равен PARAMS.sensitivityThreshold
// (calc/params.js); сайт не читает calc/, константа зашита с комментарием
// (как в js/sections/states.js).
export const TRUST_SENSITIVITY_THRESHOLD = 5;

// trustFacts(snapshot) → объект | null. null — если снапшота или глобального
// индекса нет (недоступный/insufficient снапшот → секция пуста).
// Критериев — статический список (сайт его знает); источники/кластеры/слепые
// регионы/методология — из снапшота; coverage — из snapshot.coverageCriteria
// (нет/битая форма → null); sensitivity — из snapshot.sensitivity.
export function trustFacts(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') return null;
  if (snapshot.global == null) return null;

  const sources = Array.isArray(snapshot.sources) ? snapshot.sources : [];

  const counts = new Map();
  for (const s of sources) {
    const id = s && typeof s.cluster_id === 'string' ? s.cluster_id : null;
    if (!id) continue;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  const clusterCounts = [...counts.entries()].sort((a, b) => (b[1] - a[1]) || a[0].localeCompare(b[0]));

  const affiliatedCount = sources.filter((s) => s && s.state_affiliated === true).length;

  // R05i.1: сколько источников подкреплено хотя бы одной цитатой (R05i).
  const quotedCount = sources.filter(
    (s) => s && Array.isArray(s.quotes) && s.quotes.length > 0
  ).length;

  const set = region.regionForTaxonomy(snapshot.regions_taxonomy);
  const regions = snapshot.regions && typeof snapshot.regions === 'object' ? snapshot.regions : {};
  const blindRegions = set.filter((r) => regions[r.id]?.background === true).length;

  const coverage = validCoverage(snapshot.coverageCriteria);
  const sensitivity =
    typeof snapshot.sensitivity === 'number' && Number.isFinite(snapshot.sensitivity)
      ? snapshot.sensitivity
      : null;
  const methodology =
    typeof snapshot.methodology === 'string' && snapshot.methodology !== ''
      ? snapshot.methodology
      : null;

  return {
    criteriaTotal: CRITERIA_LIST.length,
    sources: sources.length,
    clusters: clusterCounts.length,
    blindRegions,
    methodology,
    coverage,
    // ADR 0045: непокрытые id по драйверам — только когда снапшот несёт
    // coverageCriteria.uncovered (forward-only; иначе «н/д»).
    uncoveredByDriver: coverage?.uncovered ? groupUncovered(coverage.uncovered) : null,
    sensitivity,
    clusterCounts,
    affiliated: { count: affiliatedCount, total: sources.length },
    quoted: { count: quotedCount, total: sources.length },
    // R05i: список для блока «Источники с цитатами» (пустой → блок не рисуется).
    quotedSources: quotedSources(snapshot),
  };
}

// Группировка непокрытых id по драйверам в порядке статического списка:
// [{driver, total, ids}]. Драйверы без дыр в результат не попадают.
function groupUncovered(uncovered) {
  const byId = new Set(uncovered);
  const groups = new Map();
  for (const c of CRITERIA_LIST) {
    let g = groups.get(c.driver);
    if (!g) {
      g = { driver: c.driver, total: 0, ids: [] };
      groups.set(c.driver, g);
    }
    g.total += 1;
    if (byId.has(c.id)) g.ids.push(c.id);
  }
  return [...groups.values()].filter((g) => g.ids.length > 0);
}

// coverageCriteria валиден только как { covered:int >= 0, total:int > 0,
// covered <= total, uncovered?: string[] }; иначе (нет поля, битая форма) —
// null → «н/д». Битый uncovered счётчики покрытия не роняет — он игнорируется.
function validCoverage(cc) {
  if (!cc || typeof cc !== 'object' || Array.isArray(cc)) return null;
  const ok =
    Number.isInteger(cc.covered) && cc.covered >= 0 &&
    Number.isInteger(cc.total) && cc.total > 0 &&
    cc.covered <= cc.total;
  if (!ok) return null;
  const uncoveredOk =
    Array.isArray(cc.uncovered) &&
    cc.uncovered.every((id) => typeof id === 'string' && id !== '');
  return {
    covered: cc.covered,
    total: cc.total,
    ...(uncoveredOk ? { uncovered: cc.uncovered } : {}),
  };
}

// R05i: источники, подкреплённые хотя бы одной цитатой, — список для раскрытия
// витрины. Не зависит от того, попал ли источник в драйвер или регион: у недели
// 09-27 URL цитат не совпадают с источниками драйверов, и аккордеон их не видит.
// Порядок — по числу цитат (больше — выше), затем по домену и url; пустой
// результат означает «блока нет» (buildDetails его не рисует).
export function quotedSources(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') return [];
  const sources = Array.isArray(snapshot.sources) ? snapshot.sources : [];
  const out = [];
  for (const s of sources) {
    if (!s || !Array.isArray(s.quotes)) continue;
    const quotes = s.quotes
      .filter((q) => q && typeof q.text === 'string' && q.text.trim() !== '')
      .map((q) => ({
        criterion: typeof q.criterion === 'string' ? q.criterion : '',
        text: q.text,
      }));
    if (quotes.length === 0) continue;
    out.push({
      title: sourceTitle(s.title),
      url: typeof s.url === 'string' ? s.url : '',
      quotes,
      // Служебное поле только для сортировки; наружу не показывается.
      domain: sourceDomain(s),
    });
  }
  out.sort(
    (a, b) =>
      (b.quotes.length - a.quotes.length) ||
      a.domain.localeCompare(b.domain) ||
      a.url.localeCompare(b.url)
  );
  // domain — только ключ сортировки, в публичной форме ({title, url, quotes}) его нет.
  return out.map((s) => ({ title: s.title, url: s.url, quotes: s.quotes }));
}

function sourceDomain(s) {
  if (typeof s.domain === 'string' && s.domain !== '') return s.domain;
  const url = typeof s.url === 'string' ? s.url : '';
  return url.replace(/^[a-z]+:\/\//i, '').split('/')[0];
}

// title{ru,en} по контракту js/data.js; строковая форма — только для терпимости
// к синтетике, в снапшотах её нет.
function sourceTitle(title) {
  if (title && typeof title === 'object' && !Array.isArray(title)) {
    return {
      ru: typeof title.ru === 'string' ? title.ru : '',
      en: typeof title.en === 'string' ? title.en : '',
    };
  }
  return { ru: typeof title === 'string' ? title : '', en: '' };
}

// ---------- DOM ----------

const DETAILS_ID = 'trust-details';

// Название кластера происхождения (A–F, provenance-matrix): перевод по id;
// неизвестный id показываем как есть, не роняем строку.
function clusterLabel(lang, id) {
  const key = `trust.cluster.${id}`;
  const label = t(lang, key);
  return label === key ? id : label;
}

// Название источника по языку страницы (title{ru,en}); пустое — '' (вызывающий
// подставит url). Отдельная функция, чтобы buildDetails не знал формы title.
function sourceTitleFor(lang, title) {
  if (!title || typeof title !== 'object') return '';
  return title[lang] || title.ru || title.en || '';
}

export function factsLine(lang, facts) {
  return [
    t(lang, 'trust.fact.criteria', { n: facts.criteriaTotal }),
    t(lang, 'trust.fact.sources', { n: facts.sources }),
    t(lang, 'trust.fact.clusters', { n: facts.clusters }),
    t(lang, 'trust.fact.blind', { n: facts.blindRegions }),
    facts.methodology ? t(lang, 'trust.fact.methodology', { version: facts.methodology }) : t(lang, 'trust.na'),
  ].join(' · ');
}

// Решение о показе строки чувствительности — чистый шов без DOM (R08):
// true только при числовом значении не ниже порога; null/отсутствие → false.
export function showSensitivity(sensitivity) {
  return (
    typeof sensitivity === 'number' &&
    Number.isFinite(sensitivity) &&
    sensitivity >= TRUST_SENSITIVITY_THRESHOLD
  );
}

function buildDetails(lang, facts) {
  const wrap = document.createElement('div');
  wrap.className = 'trust-details-body';
  wrap.id = DETAILS_ID;

  const clusterHead = document.createElement('h3');
  clusterHead.className = 'trust-details-title';
  clusterHead.textContent = t(lang, 'trust.details.clusters');
  wrap.appendChild(clusterHead);

  const list = document.createElement('ul');
  list.className = 'trust-clusters';
  for (const [id, count] of facts.clusterCounts) {
    const li = document.createElement('li');
    // NBSP перед числом: счётчик не сиротой на второй строке, если метка
    // не влезает в колонку сетки — переносится целиком.
    li.textContent = `${clusterLabel(lang, id)}:\u00A0${count}`;
    list.appendChild(li);
  }
  wrap.appendChild(list);

  const affiliated = document.createElement('p');
  affiliated.className = 'trust-affiliated';
  affiliated.textContent = t(lang, 'trust.details.affiliated', {
    count: facts.affiliated.count,
    total: facts.affiliated.total,
  });
  wrap.appendChild(affiliated);

  // R05i.1: строка «С цитатой: N из M» — раскрытие витрины, не основная строка.
  const quoted = document.createElement('p');
  quoted.className = 'trust-quoted';
  quoted.textContent = t(lang, 'trust.details.quotes', {
    n: facts.quoted.count,
    total: facts.quoted.total,
  });
  wrap.appendChild(quoted);

  // R05i: «Источники с цитатами» — название источника по языку, под ним каждая
  // цитата с подписью и id критерия. Блока нет, если цитат нет ни у одного.
  const quotedList = facts.quotedSources ?? [];
  if (quotedList.length > 0) {
    const quotedHead = document.createElement('h3');
    quotedHead.className = 'trust-details-title trust-quoted-title';
    quotedHead.textContent = t(lang, 'trust.details.quotedSources');
    wrap.appendChild(quotedHead);

    const sourcesList = document.createElement('ul');
    sourcesList.className = 'trust-quoted-sources';
    for (const src of quotedList) {
      const item = document.createElement('li');
      item.className = 'trust-quoted-source';

      const name = document.createElement('p');
      name.className = 'trust-quoted-source-title';
      // Название — по языку страницы; пустое название → url, а не пустая строка.
      name.textContent = sourceTitleFor(lang, src.title) || src.url;
      item.appendChild(name);

      const quotes = document.createElement('ul');
      quotes.className = 'trust-quote-list';
      for (const q of src.quotes) {
        const quote = document.createElement('li');
        quote.className = 'trust-quote';

        const label = document.createElement('p');
        label.className = 'trust-quote-label';
        // Подпись «Цитата» из словаря, id критерия — рядом, mono-стилем.
        label.textContent = q.criterion
          ? `${t(lang, 'sources.quote.label')} · ${q.criterion}`
          : t(lang, 'sources.quote.label');
        quote.appendChild(label);

        const text = document.createElement('blockquote');
        text.className = 'trust-quote-text';
        text.textContent = q.text;
        quote.appendChild(text);

        quotes.appendChild(quote);
      }
      item.appendChild(quotes);
      sourcesList.appendChild(item);
    }
    wrap.appendChild(sourcesList);
  }

  const coverage = document.createElement('p');
  coverage.className = 'trust-coverage';
  if (facts.coverage) {
    coverage.textContent = t(lang, 'trust.details.coverage', {
      n: facts.coverage.total - facts.coverage.covered,
    });
  } else {
    coverage.textContent = t(lang, 'trust.details.coverage.na');
  }
  wrap.appendChild(coverage);

  // ADR 0045: где именно дыры — сводка по драйверам с id. Поля нет (старые
  // недели) → блок не рисуется, выше остаётся честное «н/д» или счётчик.
  if (facts.coverage?.uncovered) {
    const uncoveredHead = document.createElement('h3');
    uncoveredHead.className = 'trust-details-title trust-uncovered-title';
    uncoveredHead.textContent = t(lang, 'trust.details.coverage.drivers');
    wrap.appendChild(uncoveredHead);

    const uncoveredList = document.createElement('ul');
    uncoveredList.className = 'trust-uncovered';
    if (facts.uncoveredByDriver.length === 0) {
      const li = document.createElement('li');
      li.textContent = t(lang, 'trust.details.coverage.all');
      uncoveredList.appendChild(li);
    } else {
      for (const g of facts.uncoveredByDriver) {
        const li = document.createElement('li');
        li.textContent = t(lang, 'trust.details.coverage.driver', {
          title: t(lang, `method.criteria.driver.${g.driver.toLowerCase()}`),
          n: g.ids.length,
          total: g.total,
          ids: g.ids.join(', '),
        });
        uncoveredList.appendChild(li);
      }
    }
    wrap.appendChild(uncoveredList);
  }

  // ADR 0045: число чувствительности — всегда (0 честно, отсутствие поля «н/д»);
  // порог 5 управляет только предупреждением ниже.
  const sensitivity = document.createElement('p');
  sensitivity.className = 'trust-sensitivity';
  sensitivity.textContent =
    typeof facts.sensitivity === 'number'
      ? t(lang, 'trust.details.sensitivity', { delta: facts.sensitivity })
      : t(lang, 'trust.details.sensitivity.na');
  wrap.appendChild(sensitivity);

  // Строка-предупреждение — только при заметном значении (≥ порога).
  if (showSensitivity(facts.sensitivity)) {
    const sensitive = document.createElement('p');
    sensitive.className = 'trust-sensitive';
    sensitive.textContent = t(lang, 'trust.details.sensitive', { delta: facts.sensitivity });
    wrap.appendChild(sensitive);
  }

  return wrap;
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="trust"]');
  if (!host) return;

  host.textContent = '';
  const facts = trustFacts(appState?.snapshot);
  if (!facts) return; // пустой/недоступный снапшот → секция пуста, без исключений

  const lang = appState.lang ?? 'ru';
  const panel = document.createElement('div');
  panel.className = 'trust-panel';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'trust-row';
  toggle.dataset.role = 'trust-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', DETAILS_ID);
  toggle.textContent = factsLine(lang, facts);

  const details = buildDetails(lang, facts);
  details.hidden = true;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    details.hidden = expanded;
  });

  panel.append(toggle, details);
  host.appendChild(panel);
}
