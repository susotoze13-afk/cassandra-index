import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cardLayout, cardColors, shareFileName } from '../js/share.js';

// Фикстура — демо-снапшот 2026-09-13 (global 72 ↑+6, Европа 74 ↑+5), как в data/.
const SNAPSHOT = {
  published: '2026-09-13',
  through: '2026-09-06',
  methodology: '1.0',
  dataState: 'published',
  global: { index: 72, delta: 6 },
  regions: { europe: { index: 74, delta: 5, status: 'very' } },
};

// R80: карточка по образцу из тикета. Ожидания — дословно из спецификации, не из кода.
test('cardLayout RU: все элементы образца, язык = язык интерфейса', () => {
  const items = cardLayout('ru', SNAPSHOT, 'europe');
  assert.equal(items[0].kind, 'brand');
  assert.equal(items[0].text, 'CASSANDRA INDEX');
  assert.equal(items[1].kind, 'index');
  assert.equal(items[1].text, '72 / 100');
  assert.equal(items[1].status, 'ОЧЕНЬ ОПАСНО');
  assert.equal(items[1].tone, '--state-very');
  assert.equal(items[2].kind, 'delta');
  assert.equal(items[2].text, '↑ +6 ЗА НЕДЕЛЮ');
  assert.equal(items[2].tone, '--state-very');
  assert.equal(items[3].kind, 'region');
  assert.equal(items[3].text, 'Ваш регион: Европа · 74 / 100');
  assert.equal(items[4].kind, 'date');
  assert.equal(items[4].text, '13 сентября 2026');
  assert.equal(items[5].kind, 'disclaimer');
  assert.equal(items[5].text, 'Оценка риска на основе открытых данных. Не официальный прогноз.');
});

test('cardLayout EN: строки образца на английском', () => {
  const items = cardLayout('en', SNAPSHOT, 'europe');
  assert.equal(items[1].status, 'VERY DANGEROUS');
  assert.equal(items[2].text, '↑ +6 THIS WEEK');
  assert.equal(items[3].text, 'Your region: Europe · 74 / 100');
  assert.equal(items[4].text, '13 Sep, 2026');
  assert.equal(items[5].text, 'Risk assessment based on open data. Not an official forecast.');
});

test('cardLayout: только регион, без города (R80)', () => {
  const items = cardLayout('ru', SNAPSHOT, 'europe');
  const regionItem = items.find((i) => i.kind === 'region');
  assert.ok(regionItem);
  assert.ok(!regionItem.text.includes('Амстердам'));
  const en = cardLayout('en', SNAPSHOT, 'europe');
  assert.ok(!en.find((i) => i.kind === 'region').text.includes('Amsterdam'));
});

// §79/История 29: метафора часов и обратный отсчёт запрещены — на карточке их нет.
test('cardLayout: без обратного отсчёта — только известные блоки', () => {
  const allowed = ['brand', 'index', 'delta', 'region', 'date', 'disclaimer'];
  for (const lang of ['ru', 'en']) {
    const items = cardLayout(lang, SNAPSHOT, 'europe');
    assert.deepEqual(items.map((i) => i.kind), allowed);
  }
});

test('cardLayout: регион без данных или не выбран — строки региона нет', () => {
  assert.equal(cardLayout('ru', SNAPSHOT, null).some((i) => i.kind === 'region'), false);
  assert.equal(cardLayout('ru', SNAPSHOT, 'africa').some((i) => i.kind === 'region'), false);
});

test('cardLayout: нет глобального индекса — карточку не собираем', () => {
  assert.equal(cardLayout('ru', { ...SNAPSHOT, global: null }, 'europe'), null);
  assert.equal(cardLayout('ru', null, 'europe'), null);
});

test('cardLayout: снижение — стрелка вниз, тон --state-calm (§12, значения не только цветом)', () => {
  const items = cardLayout('en', { ...SNAPSHOT, global: { index: 66, delta: -3 } }, null);
  assert.equal(items[2].text, '↓ -3 THIS WEEK');
  assert.equal(items[2].tone, '--state-calm');
});

// §14.4: палитра карточки — те же токены, что у сайта.
test('cardColors: HEX из §14.4', () => {
  const c = cardColors();
  assert.equal(c.bg, '#0A0E12');
  assert.equal(c.text, '#E6EDF3');
  assert.equal(c.accent, '#58A6FF');
  assert.equal(c.states.very, '#D17F52');
  assert.equal(c.states.calm, '#3FB950');
});

test('shareFileName: неделя в имени файла', () => {
  assert.equal(shareFileName('2026-09-13'), 'cassandra-index-2026-09-13.png');
  assert.equal(shareFileName(null), 'cassandra-index.png');
});
