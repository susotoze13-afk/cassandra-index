import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sourcesLabel, visibleSources, resolveMeasures, levelLabel, confidenceInfo, driverLabel } from '../js/sections/drivers.js';

// §4.3.1 — кнопка «N источников»: RU 1/2–4/5+, EN 1 source/N sources.
test('sourcesLabel: склонение RU 1/2–4/5+', () => {
  assert.equal(sourcesLabel('ru', 1), '1 источник');
  assert.equal(sourcesLabel('ru', 2), '2 источника');
  assert.equal(sourcesLabel('ru', 4), '4 источника');
  assert.equal(sourcesLabel('ru', 5), '5 источников');
  assert.equal(sourcesLabel('ru', 11), '11 источников');
  assert.equal(sourcesLabel('ru', 21), '21 источник');
});

test('sourcesLabel: EN 1 source / N sources', () => {
  assert.equal(sourcesLabel('en', 1), '1 source');
  assert.equal(sourcesLabel('en', 2), '2 sources');
  assert.equal(sourcesLabel('en', 5), '5 sources');
});

// §4.3.1 — больше 5 источников: первые 5 + «Показать все источники».
test('visibleSources: ≤5 — все; >5 — первые 5, остаток в remaining', () => {
  const three = ['a', 'b', 'c'];
  assert.deepEqual(visibleSources(three, false), { shown: ['a', 'b', 'c'], remaining: 0 });
  const seven = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  assert.deepEqual(visibleSources(seven, false), { shown: ['a', 'b', 'c', 'd', 'e'], remaining: 2 });
  assert.deepEqual(visibleSources(seven, true), { shown: seven, remaining: 0 });
});

// §4.3 / История 11 — карточка начинается с краткого локализованного лейбла,
// отличного от observation (в прототипе — h3 «Военная активность выросла»).
test('driverLabel: короткий локализованный лейбл, отличный от observation', () => {
  const drv = {
    label: { ru: 'Военная активность выросла', en: 'Military activity increased' },
    observation: { ru: 'Спутниковые снимки фиксируют переброску сил.', en: 'Satellite imagery shows troop movements.' },
  };
  assert.equal(driverLabel('ru', drv), 'Военная активность выросла');
  assert.equal(driverLabel('en', drv), 'Military activity increased');
  assert.notEqual(driverLabel('ru', drv), drv.observation.ru);
  assert.notEqual(driverLabel('en', drv), drv.observation.en);
  // фолбэк на RU, если языка нет; пустая строка, если label нет
  assert.equal(driverLabel('en', { label: { ru: 'Только по-русски' } }), 'Только по-русски');
  assert.equal(driverLabel('en', {}), '');
});

// Общий компонент уверенности (шов для карточек регионов, таск 05): слово с родом
// (§11.2 — «высокий вклад» / «высокая уверенность») + причина при сниженной уверенности.
test('levelLabel: род согласован RU / EN без рода', () => {
  assert.equal(levelLabel('ru', 'contribution', 'high'), 'высокий');
  assert.equal(levelLabel('ru', 'contribution', 'low'), 'низкий');
  assert.equal(levelLabel('ru', 'confidence', 'high'), 'высокая');
  assert.equal(levelLabel('ru', 'confidence', 'medium'), 'средняя');
  assert.equal(levelLabel('en', 'confidence', 'low'), 'low');
});

test('confidenceInfo: слово + причина при сниженной уверенности', () => {
  const drv = { confidence: 'medium', confidenceNote: { ru: 'Меньше данных, чем обычно.', en: 'Fewer data than usual.' } };
  assert.deepEqual(confidenceInfo('ru', drv), { word: 'средняя', note: 'Меньше данных, чем обычно.' });
  assert.deepEqual(confidenceInfo('en', drv), { word: 'medium', note: 'Fewer data than usual.' });
  // высокая уверенность — без строки-причины
  assert.deepEqual(confidenceInfo('ru', { confidence: 'high' }), { word: 'высокая', note: null });
});

// R41 — дополнительные измерения: уровни из снапшота (snapshot.measures) с дефолтами.
test('resolveMeasures: из снапшота / дефолты при отсутствии', () => {
  assert.deepEqual(resolveMeasures({ measures: { direct: 'medium', nuclear: 'low' } }),
    { direct: 'medium', nuclear: 'low' });
  assert.deepEqual(resolveMeasures({}), { direct: 'high', nuclear: 'low' });
  assert.deepEqual(resolveMeasures(null), { direct: 'high', nuclear: 'low' });
  // битые значения не пролезают
  assert.deepEqual(resolveMeasures({ measures: { direct: 'extreme', nuclear: null } }),
    { direct: 'high', nuclear: 'low' });
});
