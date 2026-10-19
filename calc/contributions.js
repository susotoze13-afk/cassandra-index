// contributions.js — публичная развёртка «почему индекс такой» (ADR 0062):
// числовой вклад девяти драйверов модели в п.п., top-3 критерия внутри драйвера,
// водопад «прошлая неделя → вклады → эта неделя» и блок «что бы изменило
// оценку». Чистые функции: ни диска, ни сети, расчёт индекса не меняется —
// числа берутся из тех же buildDrivers/aggregateDrivers, что и штатный прогон.
//
// Терминология: снапшот недели несёт РЕДАКЦИОННЫЕ драйверы (три сюжета недели
// с contribution: high|medium|low) — они остаются как были. Здесь считается
// МОДЕЛЬНАЯ развёртка: драйверы Д1…Д9 движка, у которых есть критерии и вес.
// Одно слово «драйвер» в публичном JSON обозначает две разные сущности, поэтому
// модельная развёртка живёт в отдельном поле driver_breakdown.
//
// contribution_pp драйвера — доля опубликованного индекса, приходящаяся на его
// вклад в агрегат до насыщающей кривой (§5 шаги 2–4), в пунктах индекса.
// Σ contribution_pp = index (с точностью до округления до 0.1; остаток отдан
// драйверу с наибольшим |вкладом|). Отрицательный вклад — деэскалация Д8.
//
// waterfall: шаги — изменение того же вклада от прошлой недели к текущей,
// пересчитанное в п.п. через насыщающую кривую; остаток residual_pp — механика
// модели, которую нельзя приписать драйверу (инерция §5.4, q-сжатие §5.3,
// лимит прироста Д9 §4.3.4 и округление опубликованного индекса).
//
// what_would_change: контрфактический прогон «сигнал одного покрытого критерия
// обнулён, прочие равны» — оценка leverage критерия в п.п. Без контекста цепочки
// (как hypotheticalIndex), поэтому сравнивается с базой того же прогона, а не с
// опубликованным индексом; crosses_state считает по index + impact.

import {
  CRITERIA, buildDrivers, aggregateDrivers, saturateCurve, stateOf,
} from './engine.js';
import { CRITERIA_LIST } from '../js/criteria.js';

export const DRIVER_IDS = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'];

// Названия драйверов модели. RU-часть повторяет ключи method.criteria.driver.*
// из js/i18n.js (сайт читает словарь, calc — нет); EN — перевод для API.
export const DRIVER_NAMES = {
  D1: { ru: 'Д1. Военная активность', en: 'D1. Military activity' },
  D2: { ru: 'Д2. Ядерная сигнальная активность', en: 'D2. Nuclear signaling activity' },
  D3: { ru: 'Д3. Дипломатическая эскалация и деэскалация', en: 'D3. Diplomatic escalation and de-escalation' },
  D4: { ru: 'Д4. Экономические индикаторы конфликта', en: 'D4. Economic indicators of conflict' },
  D5: { ru: 'Д5. Информационная и киберсфера', en: 'D5. Information and cyber sphere' },
  D6: { ru: 'Д6. Мобилизация общества', en: 'D6. Societal mobilization' },
  D7: { ru: 'Д7. Распространение и вовлечение третьих сторон', en: 'D7. Proliferation and third-party involvement' },
  D8: { ru: 'Д8. Подтверждённые деэскалирующие исходы', en: 'D8. Confirmed de-escalating outcomes' },
  D9: { ru: 'Д9. Косвенные индикаторы подготовки', en: 'D9. Indirect preparation indicators' },
};

const META = new Map(CRITERIA_LIST.map((c) => [c.id, c]));
const isNum = (v) => typeof v === 'number' && Number.isFinite(v);
// Нормализуем −0 → 0: JSON.stringify(−0) даёт «0», и паритет с диском
// (deepEqual) ловил бы расхождение знака нуля.
const round1 = (v) => {
  const r = Math.round(v * 10) / 10;
  return r === 0 ? 0 : r;
};
const round3 = (v) => {
  const r = Math.round(v * 1000) / 1000;
  return r === 0 ? 0 : r;
};

function nameOf(id) {
  const meta = META.get(id);
  return meta ? { ru: meta.name.ru, en: meta.name.en } : { ru: id, en: id };
}

function dirOf(criterion) {
  if (criterion && criterion.dir) return criterion.dir;
  const meta = criterion ? CRITERIA[criterion.id] : null;
  return (meta && meta.dir) || 'esc';
}

// Вклад каждого покрытого критерия в скор своего драйвера (в единицах скора,
// знак учитывает деэскалацию). Формулы повторяют §4.2/§4.3.1/§4.3.2:
// Д1–Д7 — среднее esc минус α·среднее deesc, Д8 — среднее, Д9 — среднее с
// коэффициентом короборации подгруппы. Пересечения (§4.1.5) не считаются.
export function criteriaShares(driver, params) {
  const list = Array.isArray(driver && driver.criteria) ? driver.criteria : [];
  const id = driver && driver.id;
  if (id === 'D9') {
    const counted = list.filter((c) => isNum(c.score) && c.intersection !== true);
    if (counted.length === 0) return [];
    const corr = driver.corr || {};
    return counted.map((c) => ({
      id: c.id,
      value: c.score,
      dir: 'esc',
      contribution: (c.score * (isNum(corr[c.id]) ? corr[c.id] : 1)) / counted.length,
    }));
  }
  const covered = list.filter((c) => c && c.covered === true && c.intersection !== true);
  if (id === 'D8') {
    if (covered.length === 0) return [];
    return covered.map((c) => ({
      id: c.id,
      value: c.value,
      dir: 'deesc',
      contribution: (Number(c.value) || 0) / covered.length,
    }));
  }
  const esc = covered.filter((c) => c.dir === 'esc');
  const deesc = covered.filter((c) => c.dir === 'deesc');
  const alpha = params && isNum(params.alpha) ? params.alpha : 0.5;
  return covered.map((c) => {
    const value = Number(c.value) || 0;
    if (c.dir === 'esc') {
      return { id: c.id, value, dir: 'esc', contribution: esc.length ? value / esc.length : 0 };
    }
    return {
      id: c.id,
      value,
      dir: 'deesc',
      contribution: deesc.length ? (-alpha * value) / deesc.length : 0,
    };
  });
}

// topCriteria(driver, params) — до трёх самых весомых покрытых критериев
// драйвера. share — доля модуля вклада внутри драйвера (сумма |share| = 1),
// value — нормированный сигнал 0..1, contribution — вклад в скор драйвера.
export function topCriteria(driver, params) {
  const shares = criteriaShares(driver, params);
  const total = shares.reduce((acc, s) => acc + Math.abs(s.contribution), 0);
  if (!(total > 0)) return [];
  return shares
    .filter((s) => Math.abs(s.contribution) > 0)
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution) || a.id.localeCompare(b.id))
    .slice(0, 3)
    .map((s) => ({
      id: s.id,
      name: nameOf(s.id),
      dir: dirOf(s),
      value: round3(s.value),
      contribution: round3(s.contribution),
      share: round3(s.contribution / total),
    }));
}

function coveredOf(driver) {
  const list = Array.isArray(driver && driver.criteria) ? driver.criteria : [];
  // Пересечения (§4.1.5) движок видит, но не считает — в покрытие драйвера
  // они не входят.
  const covered = list.filter((c) => c && c.intersection !== true
    && (c.covered === true || (driver.id === 'D9' && isNum(c.score)))).length;
  return { criteria: covered, total: list.length };
}

// driverBreakdown(drivers, aggregate, index, params) — модельная развёртка
// опубликованного индекса. aggregate — результат aggregateDrivers для тех же
// drivers (передаётся, чтобы не считать дважды). Пустой массив, если индекс
// не опубликован (null).
export function driverBreakdown(drivers, aggregate, index, params) {
  if (!isNum(index)) return [];
  const agg = aggregate || aggregateDrivers(drivers, params, {});
  const iAgg = agg && agg.parts ? agg.parts.I_agg : 0;
  const scale = iAgg > 0 ? index / iAgg : 0;
  const items = (Array.isArray(drivers) ? drivers : []).map((driver, i) => {
    const id = driver && driver.id ? driver.id : DRIVER_IDS[i];
    const share = agg.shares && isNum(agg.shares[id]) ? agg.shares[id] : 0;
    const nominal = params && params.weights ? params.weights[id] : null;
    const effective = agg.weights && isNum(agg.weights[id]) ? agg.weights[id] : null;
    return {
      id,
      name: DRIVER_NAMES[id] || { ru: id, en: id },
      score: isNum(driver.score) ? round3(driver.score) : null,
      confidence: driver.confidence || null,
      weight: isNum(nominal) ? nominal : null,
      weight_effective: isNum(effective) ? round3(effective) : null,
      covered: coveredOf(driver),
      contribution_pp: round1(share * scale),
      // Слепой драйвер (score null) не влияет на индекс — не показываем у него
      // top-критерии, иначе шум выглядел бы как сигнал.
      top_criteria: isNum(driver.score) ? topCriteria(driver, params) : [],
    };
  });
  // Остаток округления отдаём драйверу с наибольшим |вкладом|, чтобы сумма
  // в точности равнялась опубликованному индексу (целому числу).
  const sum = items.reduce((acc, item) => acc + item.contribution_pp, 0);
  const diff = round1(index - sum);
  if (diff !== 0 && items.length) {
    let best = items[0];
    for (const item of items) {
      if (Math.abs(item.contribution_pp) > Math.abs(best.contribution_pp)) best = item;
    }
    best.contribution_pp = round1(best.contribution_pp + diff);
  }
  return items;
}

// --- Водопад «прошлая неделя → вклады → эта неделя» ---

function sharesOf(input, params) {
  const drivers = buildDrivers(input, params);
  const agg = aggregateDrivers(drivers, params, {});
  return { drivers, agg };
}

// buildWaterfall({current, previous, currentIndex, previousIndex, params}) —
// null, если нет входа прошлой недели или одного из индексов. current и
// previous — входы недель (calc/input/<week>.json), не снапшоты.
export function buildWaterfall({
  current, previous, currentIndex, previousIndex, params,
}) {
  if (!current || !previous || !isNum(currentIndex) || !isNum(previousIndex)) return null;
  const cur = sharesOf(current, params);
  const prev = sharesOf(previous, params);
  const curAgg = cur.agg.parts.I_agg;
  const prevAgg = prev.agg.parts.I_agg;
  const dAgg = curAgg - prevAgg;
  const curveDelta = saturateCurve(curAgg, params) - saturateCurve(prevAgg, params);
  const scale = Math.abs(dAgg) > 1e-12 ? curveDelta / dAgg : 0;
  const steps = DRIVER_IDS.map((id) => {
    const delta = (cur.agg.shares[id] || 0) - (prev.agg.shares[id] || 0);
    return { driver: id, contribution_pp: round1(delta * scale) };
  });
  const stepsSum = steps.reduce((acc, s) => acc + s.contribution_pp, 0);
  const publishedDelta = currentIndex - previousIndex;
  return {
    from: { week: previous.week, index: previousIndex },
    to: { week: current.week, index: currentIndex },
    steps,
    residual_pp: round1(publishedDelta - stepsSum),
    // Код причины остатка: механика модели, не «ошибка». Расшифровка — docs/api.md.
    residual_reason: 'saturation-inertia-coverage-rounding',
  };
}

// --- «Что бы изменило оценку» ---

function thresholdsAround(index, params) {
  const states = Array.isArray(params && params.states) ? params.states : [];
  const current = states.find((s) => index >= s.min && index <= s.max) || null;
  if (!current) return { state: null, thresholds: { down: null, up: null } };
  const down = states.find((s) => s.max === current.min - 1) || null;
  const up = states.find((s) => s.min === current.max + 1) || null;
  return {
    state: current.id,
    thresholds: {
      down: down ? { state: down.id, index: current.min, gap_pp: current.min - index } : null,
      up: up ? { state: up.id, index: current.max + 1, gap_pp: current.max + 1 - index } : null,
    },
  };
}

// criterionImpacts(input, params) — контрфактический прогон по каждому
// покрытому критерию: его сигнал обнуляется, прочие равны. impact_pp —
// разница внутреннего значения без цепочки (инерции нет), поэтому это
// «плечо» критерия, а не точный пересчёт опубликованного индекса.
export function criterionImpacts(input, params) {
  const base = aggregateDrivers(buildDrivers(input, params), params, {}).internal;
  const criteria = input && input.criteria && typeof input.criteria === 'object'
    ? input.criteria : {};
  const out = [];
  for (const id of Object.keys(criteria)) {
    const entry = criteria[id];
    if (!entry || entry.covered !== true) continue;
    const modified = {
      ...input,
      criteria: { ...criteria, [id]: { ...entry, value: 0, events: undefined } },
    };
    delete modified.criteria[id].events;
    const drivers = buildDrivers(modified, params);
    const agg = aggregateDrivers(drivers, params, {});
    const driverId = CRITERIA[id] ? CRITERIA[id].driver : null;
    const driver = drivers.find((d) => d.id === driverId) || null;
    out.push({
      id,
      driver: driverId,
      dir: CRITERIA[id] ? CRITERIA[id].dir : null,
      value: round3(Number(entry.value) || 0),
      impact_pp: round1(agg.internal - base),
      breaks_driver: !!driver && driver.score === null,
    });
  }
  return out;
}

// whatWouldChange(input, params, index) — 2–3 критерия с наибольшим плечом и
// ближайшие пороги состояний. crosses_state — пересекает ли оценка
// (index + impact_pp) границу состояния; это приближение, а не пересчёт.
export function whatWouldChange(input, params, index) {
  if (!isNum(index)) return null;
  const { state, thresholds } = thresholdsAround(index, params);
  const items = criterionImpacts(input, params)
    .filter((c) => Math.abs(c.impact_pp) >= 0.1)
    .sort((a, b) => Math.abs(b.impact_pp) - Math.abs(a.impact_pp) || a.id.localeCompare(b.id))
    .slice(0, 3)
    .map((c) => ({
      id: c.id,
      name: nameOf(c.id),
      driver: c.driver,
      dir: c.dir,
      value: c.value,
      impact_pp: c.impact_pp,
      effect: c.impact_pp > 0 ? 'up' : 'down',
      crosses_state: stateOf(index + c.impact_pp, params) !== state,
      breaks_driver: c.breaks_driver,
    }));
  return {
    state,
    thresholds,
    criteria: items,
    method: 'criterion-zeroed',
  };
}

// analyseWeek(input, params, index) — обе части модельной развёртки недели.
// Вход недели и опубликованный индекс; null-поля, если индекс не опубликован.
export function analyseWeek(input, params, index) {
  if (!input || !isNum(index)) {
    return { driver_breakdown: [], what_would_change: null };
  }
  const drivers = buildDrivers(input, params);
  const agg = aggregateDrivers(drivers, params, {});
  return {
    driver_breakdown: driverBreakdown(drivers, agg, index, params),
    what_would_change: whatWouldChange(input, params, index),
  };
}
