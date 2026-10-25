// region-country-consistency.test.js — инвариант «регион ⊇ страна» (ADR 0068):
// критерий, атрибутированный стране страновым оверлеем, обязан попадать и в
// сигналы её региона. Иначе два независимых слоя атрибуции дают несогласованные
// числа (регион russia-belarus выше собственной страны RU без объяснения).
// Проверка на реальной неделе слоя 2026-10-25 + пин совпадения индексов.
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

const WEEK = '2026-10-25';
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

test('неделя 2026-10-25: индекс региона russia-belarus совпадает с индексом страны RU', () => {
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
  for (const week of RECALC_WEEKS) {
    res = runWeek(week, state);
    Object.assign(state, nextChainState(state, res));
  }
  assert.equal(res.week, WEEK);
  const region = res.regions['russia-belarus'];
  const ru = res.countries.rows.rows.RU;
  assert.equal(ru.background, false, 'RU — страна с сигналами');
  assert.equal(region.index, ru.index, 'регион-контейнер не расходится со своей страной');
  assert.equal(region.delta, ru.delta);
});
