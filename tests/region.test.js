import { test } from 'node:test';
import assert from 'node:assert/strict';
import { REGIONS, CITIES, detect, search } from '../js/region.js';

test('detect: IANA-префиксы маппятся в 6 регионов', () => {
  assert.equal(detect('Europe/Amsterdam'), 'europe');
  assert.equal(detect('Europe/Moscow'), 'europe');
  assert.equal(detect('Asia/Tokyo'), 'east-asia');
  assert.equal(detect('Asia/Shanghai'), 'east-asia');
  assert.equal(detect('Asia/Beirut'), 'middle-east');
  assert.equal(detect('Asia/Dubai'), 'middle-east');
  assert.equal(detect('America/New_York'), 'north-america');
  assert.equal(detect('America/Los_Angeles'), 'north-america');
  assert.equal(detect('Asia/Kolkata'), 'south-asia');
  assert.equal(detect('Asia/Kathmandu'), 'south-asia');
  assert.equal(detect('Africa/Nairobi'), 'africa');
  assert.equal(detect('Africa/Cairo'), 'africa');
});

test('detect: неизвестный/пустой пояс → null', () => {
  assert.equal(detect('Pacific/Kiritimati'), null);
  assert.equal(detect('Mars/Olympus_Mons'), null);
  assert.equal(detect(''), null);
  assert.equal(detect(undefined), null);
  assert.equal(detect(null), null);
});

test('detect: каждый из 6 регионов имеет непустые префиксы', () => {
  assert.equal(REGIONS.length, 6);
  for (const r of REGIONS) {
    assert.ok(Array.isArray(r.prefixes) && r.prefixes.length > 0, `${r.id} has prefixes`);
    assert.ok(r.name.ru && r.name.en && r.city.ru && r.city.en, `${r.id} has names`);
  }
});

test('search: находит город по русскому и английскому имени', () => {
  const byRu = search('Москв');
  assert.ok(byRu.some((c) => c.region === 'europe'));
  const byEn = search('moscow');
  assert.ok(byEn.some((c) => c.region === 'europe'));
  assert.ok(search('Токио').some((c) => c.region === 'east-asia'));
  assert.ok(search('beirut').some((c) => c.region === 'middle-east'));
  assert.ok(search('NAIROBI').some((c) => c.region === 'africa'));
  assert.ok(search('Дели').some((c) => c.region === 'south-asia'));
});

test('search: совпадение по имени региона, нет совпадений → пустой массив', () => {
  assert.ok(search('Европа').every((c) => c.region === 'europe'));
  assert.ok(search('Europe').some((c) => c.region === 'europe'));
  assert.deepEqual(search('вымышленныйгород'), []);
  assert.deepEqual(search('zzzz'), []);
});

test('search: справочник содержит ~30 городов', () => {
  assert.ok(CITIES.length >= 28 && CITIES.length <= 40, `cities: ${CITIES.length}`);
  for (const c of CITIES) {
    assert.ok(c.name.ru && c.name.en && REGIONS.some((r) => r.id === c.region));
  }
});
