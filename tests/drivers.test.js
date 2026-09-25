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

// R56: единая сортировка источников — тип (primary=0, OSINT=1, secondary=2),
// затем дата publication_date по убыванию (новые выше), затем домен по алфавиту.
// Ожидания разобраны вручную от фикстуры ниже.
import { sortSources, sourcesOpenState, rememberSourcesOpen, SOURCES_OPEN_KEY, SOURCES_OPEN_TTL_MS } from '../js/sections/drivers.js';

function src(type, publicationDate, domain) {
  return {
    id: `${domain}-${publicationDate}`,
    title: { ru: 'Источник', en: 'Source' },
    domain,
    url: `https://${domain}/report`,
    publication_date: publicationDate,
    accessed_date: '2026-09-13',
    source_type: type,
    cluster_id: 'A-mainstream',
    state_affiliated: false,
  };
}

test('sortSources: тип → дата (новые выше) → домен (алфавит), вход не мутируется', () => {
  const input = [
    src('secondary', '2026-09-01', 'aaa.example'),
    src('primary', '2026-08-01', 'zzz.example'),
    src('OSINT', '2026-09-05', 'mmm.example'),
    src('primary', '2026-09-02', 'bbb.example'),
    src('primary', '2026-09-02', 'aaa.example'),
  ];
  const before = input.slice();
  const sorted = sortSources(input);
  // primary 09-02: aaa раньше bbb (домен), затем primary 08-01; дальше OSINT, secondary
  assert.deepEqual(
    sorted.map((s) => `${s.source_type} ${s.domain} ${s.publication_date}`),
    [
      'primary aaa.example 2026-09-02',
      'primary bbb.example 2026-09-02',
      'primary zzz.example 2026-08-01',
      'OSINT mmm.example 2026-09-05',
      'secondary aaa.example 2026-09-01',
    ]
  );
  assert.deepEqual(input, before, 'входной массив не должен меняться');
});

test('sortSources: легаси-источники (только date) сортируются как secondary', () => {
  const legacy = { title: { ru: 'Т', en: 'T' }, url: 'https://a.example/x', domain: 'a.example', date: '2026-09-10' };
  const primary = src('primary', '2026-09-01', 'z.example');
  assert.deepEqual(sortSources([legacy, primary]).map((s) => s.domain), ['z.example', 'a.example']);
});

// R57: разворот аккордеона источников живёт в sessionStorage ≤ 30 минут;
// чтение — чистый шов с подменой хранилища и времени.
test('sourcesOpenState: новая сессия свёрнута; свежая метка — развёрнут; после 30 минут — свёрнут', () => {
  const fake = (map) => ({
    getItem: (k) => (k in map ? map[k] : null),
    setItem: (k, v) => { map[k] = v; },
  });
  const t0 = 1_800_000_000_000;
  const fresh = fake({});
  rememberSourcesOpen(fresh, t0);
  assert.equal(sourcesOpenState(fresh, t0), true);
  assert.equal(sourcesOpenState(fresh, t0 + SOURCES_OPEN_TTL_MS), true, 'ровно 30 минут — ещё живёт');
  assert.equal(sourcesOpenState(fresh, t0 + SOURCES_OPEN_TTL_MS + 1), false, 'истекло — свёрнут');
  assert.equal(sourcesOpenState(fake({}), t0), false, 'новая сессия — свёрнут');
  // битое значение — не разворачиваем
  assert.equal(sourcesOpenState(fake({ [SOURCES_OPEN_KEY]: 'не-json' }), t0), false);
  assert.equal(sourcesOpenState(null, t0), false, 'хранилище недоступно — свёрнут, без исключений');
});
