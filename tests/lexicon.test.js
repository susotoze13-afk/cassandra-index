// Контент-ревью лексики (PRD §11.5, R05–R08, R10, R53; История 27).
// Автоматический сканер: словарь i18n (оба языка) и тексты демо-снапшотов
// недель 2026-08-02…2026-09-13 не должны содержать запрещённой лексики.
// Список — константа теста (единственный источник списка запрета).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { DICTS } from '../js/i18n.js';
import { REGIONS_V1, REGIONS_V2 } from '../js/region.js';

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

// R04 — имена регионов нейтральны по географии, без блоковой лексики. Отдельный
// список от FORBIDDEN: эти слова — запрет именно для НАЗВАНИЙ/заметок регионов,
// а не для описательных наблюдений источников (там «союзники» встречается как
// пересказ события и снимать его из снапшотов лексикон не должен).
const R04_FORBIDDEN = [
  { re: /коллективн[а-яё]*\s+запад/iu, label: 'коллективный Запад' },
  { re: /зарубежь/iu, label: 'зарубежье' },
  { re: /(?<![\p{L}])союзник/iu, label: 'союзники' },
];

export function r04Hits(text) {
  if (typeof text !== 'string') return [];
  return R04_FORBIDDEN.filter((f) => f.re.test(text)).map((f) => f.label);
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
const WEEKS = ['2026-08-02', '2026-08-09', '2026-08-16', '2026-08-23',
  '2026-08-30', '2026-09-06', '2026-09-13'];
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

// Словарь i18n: все строки чисты от запрещённой лексики.
test('i18n-словарь: нет запрещённой лексики', () => {
  for (const lang of ['ru']) {
    for (const [key, text] of Object.entries(DICTS[lang])) {
      const hits = lexiconHits(text);
      assert.deepEqual(hits, [], `${lang}:${key} содержит запретную лексику: ${hits.join(', ')}`);
    }
  }
});

// Тексты демо-снапшотов (observation/why драйверов и регионов, sources.title и
// прочие пользовательские строки) — без запрещённой лексики.
test('тексты снапшотов 2026-08-02…2026-09-13: нет запрещённой лексики', () => {
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

// R04 — имена регионов нейтральны по географии. Сканируем названия обеих
// таксономий; отдельные тексты наблюдений снапшотов сюда не входят (см. R04_FORBIDDEN).
test('R04: имена регионов без блоковой лексики', () => {
  for (const set of [REGIONS_V1, REGIONS_V2]) {
    for (const r of set) {
      for (const lang of ['ru', 'en']) {
        const hits = r04Hits(r.name[lang]);
        assert.deepEqual(hits, [], `${r.id}.name.${lang}: ${hits.join(', ')}`);
      }
    }
  }
  // Инверсия: сканер обязан находить каждое запрещённое R04-слово (иначе мёртв).
  assert.ok(r04Hits('коллективный Запад').length > 0);
  assert.ok(r04Hits('ближнее зарубежье').length > 0);
  assert.ok(r04Hits('союзники и партнёры').length > 0);
  assert.deepEqual(r04Hits('Россия и Беларусь'), []);
});

// R04 — заметки о регионах и сетке (имена региона в словаре, подписи футера).
test('R04: заметки о регионах/сетке в словаре без блоковой лексики', () => {
  const keys = Object.keys(DICTS.ru)
    .filter((k) => k.startsWith('region.') || k.startsWith('history.') || k.startsWith('footer.'));
  for (const key of keys) {
    const hits = r04Hits(DICTS.ru[key]);
    assert.deepEqual(hits, [], `ru:${key}: ${hits.join(', ')}`);
  }
});

// R10: дисклеймер «Оценка состояния, а не прогноз даты» присутствует в словаре.
test('R10: дисклеймер «Оценка состояния, а не прогноз даты» в словаре', () => {
  assert.equal(DICTS.ru['hero.legal.disclaimer'], 'Оценка состояния, а не прогноз даты.');
});

// R53: H1 утвердительный — без вопросительного знака.
test('R53: H1 утвердительный (без вопроса и обратного отсчёта)', () => {
  for (const lang of ['ru']) {
    const title = DICTS[lang]['hero.title'];
    assert.ok(!title.includes('?'), `hero.title (${lang}) — вопрос: ${title}`);
    assert.deepEqual(lexiconHits(title), []);
  }
});

// Статические SEO-страницы (таск 02): текст в разметке, а не в словаре, поэтому
// сканируем видимый текст HTML с диска — тот же список запрета (PRD §11.5).
const ROOT = path.resolve(import.meta.dirname, '..');
const HTML_PAGES = [
  'how-to-read.html',
  'compare.html',
  'compare-war-monitor.html',
  'compare-acled.html',
  'compare-crisiswatch.html',
  'validation.html',
];

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ');
}

test('статические SEO-страницы: нет запрещённой лексики', () => {
  for (const file of HTML_PAGES) {
    const text = htmlToText(readFileSync(path.join(ROOT, file), 'utf8'));
    const hits = lexiconHits(text);
    assert.deepEqual(hits, [], `${file} содержит запретную лексику: ${hits.join(', ')}`);
  }
});

