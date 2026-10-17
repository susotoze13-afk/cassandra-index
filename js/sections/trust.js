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
    sensitivity,
    clusterCounts,
    affiliated: { count: affiliatedCount, total: sources.length },
  };
}

// coverageCriteria валиден только как { covered:int >= 0, total:int > 0, covered <= total };
// иначе (нет поля, битая форма) — null → «н/д».
function validCoverage(cc) {
  if (!cc || typeof cc !== 'object' || Array.isArray(cc)) return null;
  const ok =
    Number.isInteger(cc.covered) && cc.covered >= 0 &&
    Number.isInteger(cc.total) && cc.total > 0 &&
    cc.covered <= cc.total;
  return ok ? { covered: cc.covered, total: cc.total } : null;
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

  // Строка чувствительности — только при заметном значении (≥ порога).
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
