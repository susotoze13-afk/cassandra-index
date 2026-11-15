// region-country-consistency.test.js — инвариант «регион ⊇ страна» (ADR 0068):
// критерий, атрибутированный стране страновым оверлеем, обязан попадать и в
// сигналы её региона. Иначе два независимых слоя атрибуции дают несогласованные
// числа (регион russia-belarus выше собственной страны RU без объяснения).
// Проверка на последней неделе цепочки (2026-11-01) + пин совпадения индексов.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  loadValidatedCountryOverlay,
  mergeCountryAttribution,
  expandRegionAttribution,
  countryIdsFor,
  regionOfCountry,
  loadRegionRef,
} from '../calc/country-layer.js';
import { attributedSignals, regionalSignals } from '../calc/engine.js';
import { PARAMS } from '../calc/params.js';
import { taxonomyForWeek, loadSnapshotPart } from '../calc/week-step.js';
import { runWeek, nextChainState, RECALC_WEEKS, PREV_WEEK } from '../calc/calc.js';
import { regionIdsFor } from '../js/data.js';

const WEEK = RECALC_WEEKS[RECALC_WEEKS.length - 1];
const input = JSON.parse(readFileSync(new URL(`../calc/input/${WEEK}.json`, import.meta.url), 'utf8'));
const ref = loadRegionRef();
const taxonomy = taxonomyForWeek(WEEK);

function signalIds(criteria, unit, attr) {
  const out = [];
  for (const [id, entry] of Object.entries(criteria)) {
    if (!entry || entry.covered !== true) continue;
    if (Array.isArray(entry[attr]) && entry[attr].includes(unit)) out.push(id);
  }
  return out.sort();
}

test('инвариант регион ⊇ страна: сигналы страны входят в сигналы её региона', () => {
  const resolved = loadValidatedCountryOverlay(WEEK, input);
  assert.ok(resolved && resolved.overlay, 'оверлей недели слоя валиден');
  const merged = mergeCountryAttribution(input, resolved.overlay).criteria;
  const expanded = expandRegionAttribution(merged, resolved.ref, taxonomy);
  const ids = countryIdsFor(taxonomy, ref);
  const countries = attributedSignals(merged, ids, PARAMS, WEEK, 'countries');
  const regions = regionalSignals(expanded, regionIdsFor(taxonomy), PARAMS, WEEK);
  const published = Object.keys(countries);
  assert.ok(published.length > 0, 'в неделе есть страны с сигналами');
  for (const iso of published) {
    const region = regionOfCountry(iso, taxonomy, ref);
    assert.ok(region, `${iso}: регион таксономии найден`);
    const own = signalIds(merged, iso, 'countries');
    const regionSignals = signalIds(expanded, region, 'regions');
    for (const id of own) {
      assert.ok(regionSignals.includes(id), `${iso}: сигнал ${id} не виден региону ${region}`);
    }
    assert.ok(regions[region].nReg >= countries[iso].nReg, `${iso}: nReg региона ≥ nReg страны`);
  }
});

// Прогон цепочки до указанной недели включительно (как main() в calc.js).
function runChainUpTo(week) {
  const prevGlobal = loadSnapshotPart(PREV_WEEK, 'global');
  const prevRegions = loadSnapshotPart(PREV_WEEK, 'regions');
  const state = {
    prevInternal: prevGlobal.global.index,
    prevPublished: prevGlobal.global.index,
    prevWeek: PREV_WEEK,
    prevRegions: Object.fromEntries(
      regionIdsFor(taxonomyForWeek(PREV_WEEK)).map((id) => [id, prevRegions.regions[id].index]),
    ),
    recalcIndex: {},
    classification: {},
    sbLeft: 0,
    sbReason: null,
  };
  let res = null;
  for (const id of RECALC_WEEKS) {
    res = runWeek(id, state);
    Object.assign(state, nextChainState(state, res));
    if (id === week) return res;
  }
  throw new Error(`неделя ${week} вне цепочки RECALC_WEEKS`);
}

// Пин совпадения чисел держится на неделе, где страновой оверлей покрывает ту же
// атрибуцию, что и регион: 2026-11-08. Инвариант ADR 0068 — вложенность сигналов,
// не равенство индексов, поэтому на других неделях числа расходятся законно.
test('2026-11-08 (эталон): индекс региона russia-belarus совпадает с индексом страны RU', () => {
  const res = runChainUpTo('2026-11-08');
  const region = res.regions['russia-belarus'];
  const ru = res.countries.rows.rows.RU;
  assert.equal(ru.background, false, 'RU — страна с сигналами');
  assert.equal(region.index, ru.index, 'регион-контейнер не расходится со своей страной');
  assert.equal(region.delta, ru.delta);
});

// Последняя неделя цепочки: числа слоёв не обязаны совпадать, но страна не может
// нести больше сигналов, чем её регион, и оба слоя публикуются.
test('последняя неделя цепочки: страна RU не шире своего региона и оба слоя опубликованы', () => {
  const res = runChainUpTo(WEEK);
  assert.equal(res.week, WEEK);
  const region = res.regions['russia-belarus'];
  const ru = res.countries.rows.rows.RU;
  assert.equal(ru.background, false, 'RU — страна с сигналами');
  assert.equal(region.background, false, 'регион russia-belarus не слепой');
  assert.ok(ru.signals <= region.signals, `сигналов страны ${ru.signals} ≤ сигналов региона ${region.signals}`);
  assert.ok(ru.signals >= 1, 'у страны есть хотя бы один сигнал');
});
