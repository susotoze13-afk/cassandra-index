// acceptance-source-selection.test.js — сводная приёмка прогона source-selection-hardening
// (таск 07): R01–R06 по разделам «Пользовательские истории» и «Покрытие манифеста»
// spec.md. Ожидаемые значения взяты из спецификации, протокола Q1–Q24 и
// interfaces.md (дата включения ворот, порог пометки, состав ядра, ключи словаря),
// а не из кода под тестом. Швы: PARAMS (calc/params.js), словарь DICTS (js/i18n.js),
// собранные бандлы js/bundle*.js — сайт читает их, а не ES-модули.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { PARAMS } from '../calc/params.js';
import { DICTS } from '../js/i18n.js';

const dict = DICTS.ru;

// История 2 / Решение §3: ворота включаются по дате недели ≥ 2026-10-11,
// вычисляется на вызове (forward-only, опубликованное не пересчитывается).
test('R01: ворота независимости включаются с недели 2026-10-11', () => {
  assert.equal(PARAMS.independenceGateFrom, '2026-10-11');
});

// Решение §5: порог 5 п.п. публикуется как метод («раскрываем, если превышает»).
test('R02: порог пометки чувствительности — 5 п.п.', () => {
  assert.equal(PARAMS.sensitivityThreshold, 5);
});

// Решение §6: состав ядра задан дословно — A: reuters/theguardian/apnews,
// B: aa.com.tr/dw, C: understandingwar/crisisgroup, F: bloomberg/finance.yahoo.
test('R03: ядро — ровно 9 доменов спецификации, кластеры A/B/C/F, минимум 4 домена', () => {
  const spec = {
    'reuters.com': 'A',
    'theguardian.com': 'A',
    'apnews.com': 'A',
    'aa.com.tr': 'B',
    'dw.com': 'B',
    'understandingwar.org': 'C',
    'crisisgroup.org': 'C',
    'bloomberg.com': 'F',
    'finance.yahoo.com': 'F',
  };
  assert.deepEqual(Object.keys(PARAMS.coreSources).sort(), Object.keys(spec).sort());
  for (const [domain, letter] of Object.entries(spec)) {
    assert.match(PARAMS.coreSources[domain], new RegExp(`^${letter}-`), `${domain} → кластер ${letter}`);
  }
  assert.equal(PARAMS.coreMinDomains, 4);
});

// История 14 / Р05: блок «выбор → проверка → устойчивость», ровно 3 пункта.
test('R05: словарь — блок «Как выбираются источники»: заголовок и ровно три пункта', () => {
  assert.equal(typeof dict['method.sources.title'], 'string');
  assert.ok(dict['method.sources.title'].trim().length > 0, 'заголовок блока пустой');
  for (const n of ['1', '2', '3']) {
    const text = dict[`method.sources.${n}`];
    assert.equal(typeof text, 'string', `method.sources.${n} отсутствует`);
    assert.ok(text.trim().length > 0, `method.sources.${n} пустой`);
  }
  assert.equal(dict['method.sources.4'], undefined, 'пунктов должно быть ровно три');
});

// История 15 / R05.1: честная граница о нерепрезентативной выборке.
test('R05.1: в разделе ограничений есть пункт о нерепрезентативной выборке', () => {
  const text = dict['method.gaps.5'];
  assert.equal(typeof text, 'string', 'method.gaps.5 отсутствует');
  assert.ok(text.trim().length > 0, 'method.gaps.5 пустой');
  assert.ok(text.includes('выборк'), 'граница — про выборку источников (история 15)');
});

// Истории 5 и 16 / R02.1–R05.2: пометка при sensitivity > 5, порог раскрыт
// в самом тексте пометки, а не спрятан в цифру.
test('R02.1/R05.2: пометка чувствительности называет порог «5 пунктов»', () => {
  const text = dict['quality.modal.sensitive'];
  assert.equal(typeof text, 'string', 'quality.modal.sensitive отсутствует');
  assert.ok(text.includes('чувствительна'), 'пометка — про чувствительность недели');
  assert.ok(text.includes('5 пунктов'), 'порог >5 п.п. раскрыт в тексте пометки');
});

// Сайт грузит собранные бандлы (AGENTS, file://), поэтому пометка и пункты
// блока обязаны дожить до бандла — иначе читатель их не увидит.
test('R05/R02: собранные бандлы несут пометку и пункты блока источников', () => {
  const bundle = readFileSync(new URL('../js/bundle.js', import.meta.url), 'utf8');
  assert.ok(bundle.includes("'method.sources.1'"), 'bundle.js без пункта блока');
  assert.ok(bundle.includes('method.gaps.5'), 'bundle.js без пункта ограничений');
  assert.ok(bundle.includes("'quality.modal.sensitive'"), 'bundle.js без ключа пометки');
  assert.ok(
    bundle.includes("addLine(body, 'quality.modal.sensitive')"),
    'пометка не подключена в quality-модалке бандла',
  );
  const privacy = readFileSync(new URL('../js/bundle-privacy.js', import.meta.url), 'utf8');
  assert.ok(privacy.includes('quality.modal.sensitive'), 'bundle-privacy.js без ключа пометки');
});
