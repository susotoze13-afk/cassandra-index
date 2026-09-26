import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CRITERIA } from '../calc/engine.js';
import { CRITERIA_LIST } from '../js/criteria.js';
import { criteriaModel } from '../js/sections/methodology.js';

// R05.1: список критериев на сайте гарантированно совпадает с тем, что считает
// движок. Паритет импортом обоих модулей: одни и те же 45 id в том же порядке.
test('CRITERIA_LIST: те же 45 id и тот же порядок, что в engine.CRITERIA', () => {
  const engineIds = Object.keys(CRITERIA);
  const siteIds = CRITERIA_LIST.map((c) => c.id);
  assert.equal(engineIds.length, 45);
  assert.equal(CRITERIA_LIST.length, 45);
  assert.deepEqual(siteIds, engineIds);
});

test('CRITERIA_LIST: драйвер каждого критерия совпадает с engine.CRITERIA', () => {
  for (const c of CRITERIA_LIST) {
    assert.equal(c.driver, CRITERIA[c.id].driver, `driver mismatch for ${c.id}`);
  }
});

// R05: у каждого критерия — название и описание наблюдаемого сигнала на обоих
// языках (бриф: «название и короткое описание наблюдаемого сигнала (RU/EN)»).
test('CRITERIA_LIST: name и desc непустые на RU и EN у всех 45 позиций', () => {
  for (const c of CRITERIA_LIST) {
    for (const field of ['name', 'desc']) {
      for (const lang of ['ru', 'en']) {
        const value = c?.[field]?.[lang];
        assert.equal(typeof value, 'string', `${c.id}.${field}.${lang} — не строка`);
        assert.ok(value.trim().length >= 3, `${c.id}.${field}.${lang} — слишком короткая`);
      }
    }
  }
});

// R05: «без формул» — ни одна строка модуля не содержит знаков равенства,
// функций вида f(x)/w(x), пороговых шкал и служебных ссылок на разделы.
// Шаблоны — из брифа тасска и §4 METHODOLOGY (где формулы и шкалы живут),
// а не из кода под тестом.
const FORMULA_RE = [
  { re: /=/, label: 'знак равенства' },
  { re: /(?<![\p{L}])[fw]\s*\(/iu, label: 'функция f()/w()' },
  { re: /\bCAP\s*[=:]?\s*\d|порядковая\s*0|бинарная\s*\(|сч[её]тная\s*\(|scale\s*\(/iu, label: 'шкала/порог' },
  { re: /[≥≤<>]/u, label: 'знак неравенства' },
  { re: /§/, label: 'ссылка на раздел методологии' },
];

test('CRITERIA_LIST: ни одна строка не содержит формул, шкал и порогов', () => {
  const failures = [];
  for (const c of CRITERIA_LIST) {
    for (const field of ['name', 'desc']) {
      for (const lang of ['ru', 'en']) {
        const value = c[field][lang];
        for (const { re, label } of FORMULA_RE) {
          if (re.test(value)) failures.push(`${c.id}.${field}.${lang}: ${label}`);
        }
      }
    }
  }
  assert.deepEqual(failures, []);
});

// R05 (история 8): модель рендера раздела — 9 групп по драйверам, все 45
// позиций; переключение языка переводит и заголовки драйверов, и названия,
// и описания. Шов чистый (без DOM) — по аналогии с тестами соседних секций.
test('criteriaModel: 9 групп, 45 позиций, заголовки драйверов из словаря', () => {
  const model = criteriaModel('ru');
  assert.equal(model.length, 9);
  assert.deepEqual(model.map((g) => g.driver),
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9']);
  assert.equal(model.reduce((n, g) => n + g.items.length, 0), 45);
  for (const g of model) {
    assert.ok(g.title.length > 3, `пустой заголовок драйвера ${g.driver}`);
    for (const item of g.items) {
      assert.ok(item.name.length > 0 && item.desc.length > 0, `пустая позиция ${item.id}`);
    }
  }
});

test('criteriaModel: RU и EN переводят названия, описания и заголовки драйверов', () => {
  const ru = criteriaModel('ru');
  const en = criteriaModel('en');
  assert.equal(ru.length, en.length);
  for (let i = 0; i < ru.length; i += 1) {
    assert.notEqual(ru[i].title, en[i].title, `заголовок ${ru[i].driver} не переведён`);
    assert.equal(ru[i].items.length, en[i].items.length);
    for (let j = 0; j < ru[i].items.length; j += 1) {
      assert.notEqual(ru[i].items[j].name, en[i].items[j].name,
        `название ${ru[i].items[j].id} не переведено`);
      assert.notEqual(ru[i].items[j].desc, en[i].items[j].desc,
        `описание ${ru[i].items[j].id} не переведено`);
    }
  }
});

// R05 (история 8): ни одной формулы и в выводе модели рендера — на обоих языках.
test('criteriaModel: вывод модели не содержит формул, шкал и порогов', () => {
  const failures = [];
  for (const lang of ['ru', 'en']) {
    for (const g of criteriaModel(lang)) {
      const strings = [g.title, ...g.items.flatMap((i) => [i.id, i.name, i.desc])];
      for (const value of strings) {
        for (const { re, label } of FORMULA_RE) {
          if (re.test(value)) failures.push(`${lang} ${g.driver}: ${label}`);
        }
      }
    }
  }
  assert.deepEqual(failures, []);
});
