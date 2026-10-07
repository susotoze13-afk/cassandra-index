// sensitivity.js — метрика чувствительности недели (R02, протокол Q5/Q11/Q17):
// leave-one-out пересчёт индекса — сначала с исключением каждого домена
// критериальных источников по очереди, затем каждого кластера; выход — одно
// число sensitivity = max|ΔI| в процентных пунктах (одно десятичное).
// Критерий, лишившийся всех источников исключением, становится непокрытым —
// как при ручной правке входа (entry → null). Вырожденный вход без единого
// источника → null, не ложный 0 (R02.3). Порог публикации пометки (5 п.п.) —
// забота сайта (таск 06), здесь только число. Чистая функция, ноль
// зависимостей: тот же шов buildDrivers (calibrate.js) и aggregateDrivers
// (engine.js), что и штатный прогон недели, с переданным контекстом цепочки.

import { PARAMS } from './params.js';
import { aggregateDrivers } from './engine.js';
import { buildDrivers } from './calibrate.js';

const round1 = (x) => Math.round(x * 10) / 10;

// Домен источника: поле domain, иначе hostname из url; без www, lowercase.
function domainOf(source) {
  if (!source || typeof source !== 'object') return null;
  const norm = (d) => d.toLowerCase().replace(/^www\./, '');
  if (typeof source.domain === 'string' && source.domain !== '') return norm(source.domain);
  if (typeof source.url === 'string' && source.url !== '') {
    try {
      return norm(new URL(source.url).hostname);
    } catch {
      return null; // битый url — источник выпадает из доменного теста
    }
  }
  return null;
}

// Копия входа с исключёнными источниками (pred). Покрытый критерий,
// оставшийся без источников, становится null — непокрытым, как ручная правка.
function excludeSources(input, pred) {
  const criteria = (input && input.criteria && typeof input.criteria === 'object') ? input.criteria : {};
  const next = { ...input, criteria: { ...criteria } };
  for (const [id, entry] of Object.entries(criteria)) {
    if (!entry || !Array.isArray(entry.sources)) continue;
    const sources = entry.sources.filter((s) => !pred(s));
    next.criteria[id] = entry.covered === true && sources.length === 0
      ? null
      : { ...entry, sources };
  }
  return next;
}

// sensitivityScore(input, ctx, params = PARAMS) -> number | null
// input — вход недели (criteria со sources, несущими {domain?|url, cluster});
// ctx — контекст агрегации цепочки ({prevInternal, prevPublished,
// structuralBreak}), тот же, что у штатного прогона: ΔI измеряется при той
// же инерции. ΔI — по внутреннему значению до округления публикации,
// результат — одно десятичное. Нечего выкидывать (нет ни доменов, ни
// кластеров) → null.
export function sensitivityScore(input, ctx, params = PARAMS) {
  const criteria = (input && input.criteria && typeof input.criteria === 'object') ? input.criteria : {};
  const domains = new Set();
  const clusters = new Set();
  for (const entry of Object.values(criteria)) {
    if (!entry || !Array.isArray(entry.sources)) continue;
    for (const s of entry.sources) {
      const d = domainOf(s);
      if (d) domains.add(d);
      if (s && typeof s.cluster === 'string' && s.cluster !== '') clusters.add(s.cluster);
    }
  }
  if (domains.size === 0 && clusters.size === 0) return null;

  const context = ctx || {};
  const internalOf = (modified) =>
    aggregateDrivers(buildDrivers(modified, params), params, context).internal;
  const baseline = internalOf(input);
  let max = 0;
  for (const d of domains) {
    max = Math.max(max, Math.abs(internalOf(excludeSources(input, (s) => domainOf(s) === d)) - baseline));
  }
  for (const c of clusters) {
    max = Math.max(max, Math.abs(internalOf(excludeSources(input, (s) => !!s && s.cluster === c)) - baseline));
  }
  return round1(max);
}

// Порог публикации пометки чувствительности, п.п. — теперь PARAMS.
// sensitivityThreshold (params.js, конвенция «все числа в params.js»,
// перенос условием ревью таска 02); здесь re-export для совместимости импортов.
export const SENSITIVITY_THRESHOLD = PARAMS.sensitivityThreshold;
