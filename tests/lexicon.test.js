// Контент-ревью лексики (PRD §11.5, R05–R08, R10, R53; История 27).
// Автоматический сканер: словарь i18n (оба языка) и тексты демо-снапшотов
// недель 2026-08-02…2026-08-23 не должны содержать запрещённой лексики.
// Список — константа теста (единственный источник списка запрета).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DICTS } from '../js/i18n.js';

// Запрещённые слова и фразы (PRD §11.5 + R06): «вероятность», «шанс»,
// «процент риска», «обратный отсчёт», «на пороге», «на грани»,
// «осталось», «до войны», «шаг к» + метафоры часов (RU и EN).
// Границы слов — lookaround'ы по \p{L}: \b в JS не работает с кириллицей.
const FORBIDDEN = [
  { re: /вероятн/i, label: 'вероятность' },
  { re: /(?<![\p{L}])шанс(ы|а|у|ом|е)?(?![\p{L}])/iu, label: 'шанс' },
  { re: /процент\s+риска/i, label: 'процент риска' },
  { re: /обратн[а-яё]*\s+отсч[её]т/i, label: 'обратный отсчёт' },
  { re: /на\s+пороге/i, label: 'на пороге' },
  { re: /на\s+грани(?![\p{L}])/iu, label: 'на грани' },
  { re: /осталос/i, label: 'осталось' },
  { re: /до\s+войны/i, label: 'до войны' },
  { re: /(?<![\p{L}])шаг\s+к(?![\p{L}])/iu, label: 'шаг к' },
  // EN-эквиваленты
  { re: /probabilit/i, label: 'probability' },
  { re: /(?<![\p{L}])chances?(?![\p{L}])/iu, label: 'chance' },
  { re: /countdown/i, label: 'countdown' },
  { re: /percent\s+of\s+risk|risk\s+in\s+percent|percentage\s+of\s+risk/i, label: 'percent risk' },
  { re: /on\s+the\s+(verge|brink)/i, label: 'on the verge/brink' },
  { re: /time\s+left/i, label: 'time left' },
  { re: /until\s+war/i, label: 'until war' },
  { re: /one\s+step\s+closer/i, label: 'one step closer' },
  // Метафоры часов: стрелки часов, tick-tock, «N минут/часов до…».
  { re: /стрелк[а-яё]*\s+часов/i, label: 'стрелки часов' },
  { re: /часы\s+(бьют|сбились|показывают)/i, label: 'метафора часов' },
  { re: /tick-?tock/i, label: 'tick-tock' },
  { re: /\d+\s+(минут|часов|секунд)\s+до\s+(войны|полуночи)/i, label: 'N минут до полуночи/войны' },
  { re: /\b(minutes?|hours?|seconds?)\s+to\s+(midnight|war)\b/i, label: 'minutes to midnight/war' },
];

// Чистый шов: все срабатывания запрета в строке (метки, не позиции).
export function lexiconHits(text) {
  if (typeof text !== 'string') return [];
  return FORBIDDEN.filter((f) => f.re.test(text)).map((f) => f.label);
}

// Сбор всех строковых значений объекта (тексты снапшота — вложенные {ru,en}).
function collectStrings(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === 'object') {
    Object.values(value).forEach((v) => collectStrings(v, out));
  }
  return out;
}

// Загрузка снапшотов демо-недель: файлы data/<week>/*.js кладут данные в
// window.CI_DATA (как на сайте) — подсаживаем window и импортируем как ESM.
const WEEKS = ['2026-08-02', '2026-08-09', '2026-08-16', '2026-08-23'];
const PARTS = ['global', 'regions', 'region-europe', 'region-east-asia',
  'region-middle-east', 'region-north-america', 'region-south-asia',
  'region-africa', 'trend', 'drivers', 'sources'];

globalThis.window = globalThis;
for (const week of WEEKS) {
  for (const part of PARTS) {
    await import(`../data/${week}/${part}.js`);
  }
}

const snapshots = globalThis.CI_DATA?.snapshots ?? {};

// Инверсия: сканер обязан находить запрещённую строку (иначе тест мёртв).
test('lexiconHits: находит каждое запрещённое слово (инверсия)', () => {
  const dirty = [
    'вероятность конфликта', 'высокий шанс', 'процент риска растёт',
    'обратный отсчёт начался', 'на пороге войны', 'на грани срыва',
    'осталось две недели', 'шаг к эскалации', 'шаг к войне',
    'probability of war', 'no chance', 'final countdown',
    'risk in percent', 'on the brink', 'time left', 'hours until war',
    'one step closer', 'стрелки часов', 'tick-tock', '5 минут до полуночи',
    'minutes to midnight',
  ];
  for (const s of dirty) {
    assert.ok(lexiconHits(s).length > 0, `сканер пропустил: ${s}`);
  }
  // «на границах» — легитимное слово, не запретная фраза «на грани».
  assert.deepEqual(lexiconHits('риск инцидентов на границах'), []);
  assert.deepEqual(lexiconHits('нейтральная формулировка без запрета'), []);
});

// Словарь i18n: оба языка чисты; наборы ключей RU и EN совпадают (парность).
test('i18n-словарь: нет запрещённой лексики, RU и EN парные', () => {
  for (const lang of ['ru', 'en']) {
    for (const [key, text] of Object.entries(DICTS[lang])) {
      const hits = lexiconHits(text);
      assert.deepEqual(hits, [], `${lang}:${key} содержит запретную лексику: ${hits.join(', ')}`);
    }
  }
  assert.deepEqual(
    Object.keys(DICTS.ru).sort(),
    Object.keys(DICTS.en).sort(),
    'наборы ключей RU и EN должны совпадать'
  );
});

// Тексты демо-снапшотов (observation/why драйверов и регионов, sources.title и
// прочие пользовательские строки) — без запрещённой лексики.
test('тексты снапшотов 2026-08-02…2026-08-23: нет запрещённой лексики', () => {
  for (const week of WEEKS) {
    const snap = snapshots[week];
    assert.ok(snap, `снапшот ${week} не загрузился`);
    const dirty = collectStrings(snap)
      .map((s) => [s, lexiconHits(s)])
      .filter(([, hits]) => hits.length > 0);
    assert.deepEqual(
      dirty.map(([s, hits]) => `${week}: «${s.slice(0, 60)}» → ${hits.join(', ')}`),
      []
    );
  }
});

// R10: дисклеймер «Оценка состояния, а не прогноз даты» присутствует в обоих языках.
test('R10: дисклеймер «Оценка состояния, а не прогноз даты» в словаре', () => {
  assert.equal(DICTS.ru['hero.legal.disclaimer'], 'Оценка состояния, а не прогноз даты.');
  assert.equal(DICTS.en['hero.legal.disclaimer'], 'An assessment of the state, not a forecast of a date.');
});

// R53: H1 утвердительный — без вопросительного знака в обоих языках.
test('R53: H1 утвердительный (без вопроса и обратного отсчёта)', () => {
  for (const lang of ['ru', 'en']) {
    const title = DICTS[lang]['hero.title'];
    assert.ok(!title.includes('?'), `hero.title (${lang}) — вопрос: ${title}`);
    assert.deepEqual(lexiconHits(title), []);
  }
});
