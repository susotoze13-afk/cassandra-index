// precursor-ui.test.js — блок «Косвенные предвестники (Д9)» на сайте (R04, R07,
// R07.1, R07.2, R09, R10, R10.1, R11, R21i): чистый шов precursorFacts(snapshot)
// без DOM, паритет PRECURSOR_SUBGROUPS с D9_SUBGROUPS движка, ключи словаря и
// место блока в разметке страницы. Ожидаемые значения — из спецификации
// (истории 7, 8, 11–13, 16–20, 33) и METHODOLOGY §4.3.6, не из кода под тестом.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  precursorFacts,
  showsNoSignals,
  PRECURSOR_SUBGROUPS,
} from '../js/sections/precursor.js';
import { PRECURSOR_SUBGROUPS as CONTRACT_SUBGROUPS } from '../js/data.js';
import { D9_SUBGROUPS } from '../calc/engine.js';
import { DICTS } from '../js/i18n.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Спецификация §4.3.8 (история 13): подгрупп Д9 — восемь. Единственное место,
// где число записано в тесте; всё остальное сверяется с этим ожиданием.
const TOTAL = 8;

// Синтетический опубликованный снапшот: значение 42 %, 3 сигналящие подгруппы.
function snap(extra = {}) {
  return {
    published: '2026-10-25',
    through: '2026-10-25',
    methodology: '3.0',
    dataState: 'published',
    global: { index: 64, delta: 8 },
    precursor: { value: 42, signalingSubgroups: 3 },
    ...extra,
  };
}

test('precursorFacts: опубликованная неделя с полем → value/signaling/total', () => {
  assert.deepEqual(precursorFacts(snap()), { value: 42, signaling: 3, total: TOTAL });
  // Границы контракта (js/data.js validateQuality) — включительно.
  assert.deepEqual(
    precursorFacts(snap({ precursor: { value: 0, signalingSubgroups: 0 } })),
    { value: 0, signaling: 0, total: TOTAL }
  );
  assert.deepEqual(
    precursorFacts(snap({ precursor: { value: 100, signalingSubgroups: TOTAL } })),
    { value: 100, signaling: TOTAL, total: TOTAL }
  );
  // Лишние ключи контракт игнорирует — блок тоже.
  assert.deepEqual(
    precursorFacts(snap({ precursor: { value: 7, signalingSubgroups: 1, note: 'x' } })),
    { value: 7, signaling: 1, total: TOTAL }
  );
});

test('precursorFacts: null без global, без поля и на неопубликованной неделе', () => {
  assert.equal(precursorFacts(null), null);
  assert.equal(precursorFacts(undefined), null);
  assert.equal(precursorFacts(snap({ global: null })), null);
  assert.equal(precursorFacts(snap({ precursor: undefined })), null);
  for (const dataState of ['updating', 'delayed', 'insufficient', 'unavailable']) {
    assert.equal(precursorFacts(snap({ dataState })), null, `dataState=${dataState}`);
  }
});

test('precursorFacts: битая форма поля → null (сайт не падает)', () => {
  const broken = [
    null, 'x', 42, [], {}, { value: 42 },
    { value: '42', signalingSubgroups: 3 },
    { value: 42.5, signalingSubgroups: 3 },
    { value: -1, signalingSubgroups: 0 },
    { value: 101, signalingSubgroups: 3 },
    { value: 42, signalingSubgroups: '3' },
    { value: 42, signalingSubgroups: 2.5 },
    { value: 42, signalingSubgroups: -1 },
    { value: 42, signalingSubgroups: TOTAL + 1 },
  ];
  for (const precursor of broken) {
    assert.equal(precursorFacts(snap({ precursor })), null, JSON.stringify(precursor));
  }
});

test('showsNoSignals: пометка только при value = 0 и signaling = 0', () => {
  assert.equal(showsNoSignals({ value: 0, signaling: 0, total: TOTAL }), true);
  // R10: signaling = 0 при ненулевом значении пометку не включает.
  assert.equal(showsNoSignals({ value: 50, signaling: 0, total: TOTAL }), false);
  assert.equal(showsNoSignals({ value: 0, signaling: 2, total: TOTAL }), false);
  assert.equal(showsNoSignals(null), false);
});

test('число подгрупп: один источник, паритет с движком (§4.3.8)', () => {
  // Смена числа подгрупп в движке обязана давать красный тест, а не тихую
  // ложь в подписи «из N»: сайт и контракт сверяются с D9_SUBGROUPS.length.
  assert.equal(D9_SUBGROUPS.length, TOTAL);
  assert.equal(PRECURSOR_SUBGROUPS, TOTAL);
  // Граница контракта снапшота (js/data.js) — тот же источник числа.
  assert.equal(CONTRACT_SUBGROUPS, TOTAL);
  assert.equal(PRECURSOR_SUBGROUPS, CONTRACT_SUBGROUPS);
});

test('i18n: ключи блока, плейсхолдеры и запрет цифр в подписи', () => {
  const ru = DICTS.ru;
  for (const key of [
    'precursor.title', 'precursor.value', 'precursor.signals', 'precursor.none',
    'precursor.note', 'precursor.disclaimer',
  ]) {
    assert.equal(typeof ru[key], 'string', `нет ключа ${key}`);
    assert.ok(ru[key].trim() !== '', `пустой ключ ${key}`);
  }
  assert.equal(ru['precursor.title'], 'Косвенные предвестники (Д9)');
  assert.equal(ru['precursor.none'], 'сигналов нет');
  assert.ok(ru['precursor.value'].includes('{value}'), 'precursor.value без {value}');
  assert.ok(ru['precursor.signals'].includes('{n, plural,'), 'precursor.signals без плюрализации {n}');
  // Число подгрупп — не литерал в тексте: подпись получает его плейсхолдером
  // {total} из единственного источника (js/data.js PRECURSOR_SUBGROUPS).
  assert.ok(ru['precursor.signals'].includes('из {total}'), 'precursor.signals без «из {total}»');
  assert.ok(
    !/\d/.test(ru['precursor.signals'].replace(/Д9/g, '')),
    'в precursor.signals не должно быть числа подгрупп литералом',
  );
  assert.equal(ru['precursor.note'], 'доля сигналов Д9, не сравнимо с индексом');
  assert.ok(ru['precursor.note'].includes('не сравнимо с индексом'), 'подпись без оговорки');
  // Цифра — только id драйвера «Д9»: числовых значений в подписи быть не должно.
  assert.ok(!/\d/.test(ru['precursor.note'].replace(/Д9/g, '')), 'в precursor.note не должно быть чисел');
  assert.match(
    ru['precursor.disclaimer'],
    /косвенные индикаторы, не подтверждено прямыми наблюдениями/i,
    'дисклеймер §4.3.6 дословно'
  );
});

test('i18n: абзац про шкалу — 3–4 предложения, без «перцентиль» и «вероятность»', () => {
  const text = DICTS.ru['method.scale.intro'];
  assert.equal(typeof text, 'string');
  assert.ok(text.includes('порядковая'), 'нет слова «порядковая»');
  assert.ok(text.includes('прокалиброван'), 'нет «границы прокалиброваны»');
  assert.ok(text.includes('не измеренная величина'), 'нет оговорки про расстояние');
  assert.ok(text.includes('соглашение модели'), 'нет «соглашение модели»');
  assert.ok(!/перцентил/i.test(text), 'слово «перцентиль» вне публичного текста');
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim() !== '');
  assert.ok(sentences.length >= 3 && sentences.length <= 4, `предложений: ${sentences.length}`);
  // Лексикон PRD §11.5 и R04: слово «вероятность» запрещено на сайте.
  for (const key of Object.keys(DICTS.ru).filter((k) => k.startsWith('precursor.') || k.startsWith('method.scale.'))) {
    assert.ok(!/вероятн/i.test(DICTS.ru[key]), `${key} содержит «вероятность»`);
  }
});

test('разметка: хост precursor стоит между hero и trust', () => {
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  // У hero нет собственного [data-section]: его секция — #overview.
  const heroAt = html.indexOf('id="overview"');
  const precursorAt = html.indexOf('data-section="precursor"');
  const trustAt = html.indexOf('class="section trust-section"');
  assert.ok(heroAt > -1 && trustAt > -1, 'нет секций hero/trust');
  assert.ok(precursorAt > -1, 'нет хоста [data-section="precursor"]');
  assert.ok(heroAt < precursorAt && precursorAt < trustAt, 'хост precursor не между hero и trust');
  assert.ok(html.includes('precursor-section'), 'нет секции .precursor-section');
  assert.ok(html.includes('data-i18n="method.scale.intro"'), 'абзац про шкалу не в разметке');
});

test('js/render.js: precursor в SECTIONS и зарегистрирован', () => {
  const src = readFileSync(join(root, 'js/render.js'), 'utf8');
  const block = /export const SECTIONS = \[([\s\S]*?)\];/.exec(src);
  assert.ok(block, 'не найден SECTIONS');
  const names = [...block[1].matchAll(/'([a-z-]+)'/g)].map((m) => m[1]);
  const at = names.indexOf('precursor');
  assert.ok(at > -1, 'precursor нет в SECTIONS');
  assert.equal(names[at - 1], 'hero');
  assert.equal(names[at + 1], 'trust');
  assert.match(src, /registerSection\('precursor'/, 'секция не зарегистрирована');
});

test('CSS: классы блока, одна колонка и никаких статусных цветов', () => {
  const css = readFileSync(join(root, 'css/styles.css'), 'utf8');
  for (const cls of ['.precursor-section', '.precursor-row', '.precursor-value', '.precursor-note']) {
    assert.ok(css.includes(`${cls} {`), `нет правила ${cls}`);
  }
  const row = /\.precursor-row \{([\s\S]*?)\}/.exec(css)[1];
  assert.ok(/flex-direction:\s*column/.test(row), 'блок должен быть в одну колонку');
  assert.ok(/max-width:\s*100%/.test(row), 'блок должен сжиматься по ширине экрана');
  const start = css.indexOf('.precursor-section {');
  const next = css.indexOf('\n/* ----------', start);
  const scope = css.slice(start, next === -1 ? undefined : next);
  assert.ok(!/--state-/.test(scope), 'в блоке нет статусных цветов');
});

test('js/sections/precursor.js: DOM без innerHTML, подпись получает {total}', () => {
  const src = readFileSync(join(root, 'js/sections/precursor.js'), 'utf8');
  assert.ok(!src.includes('innerHTML'), 'секция не собирает DOM строками');
  // Текст «из N» собирается из того же PRECURSOR_SUBGROUPS, что и контракт:
  // проверяем именно вызов подписи, а не любое упоминание константы в файле.
  const signalsLine = src.split('\n').find((l) => l.includes("'precursor.signals'"));
  assert.ok(signalsLine, 'render не рендерит precursor.signals');
  assert.match(signalsLine, /total:\s*PRECURSOR_SUBGROUPS/, 'render не передаёт {total} в подпись');
});
