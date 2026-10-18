import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CRITERIA } from '../calc/engine.js';
import { CRITERIA_LIST } from '../js/criteria.js';
import { criteriaModel } from '../js/sections/methodology.js';
import { DICTS } from '../js/i18n.js';

// R05.1: список критериев на сайте гарантированно совпадает с тем, что считает
// движок. Паритет импортом обоих модулей: одни и те же 46 id в том же порядке.
test('CRITERIA_LIST: те же 46 id и тот же порядок, что в engine.CRITERIA', () => {
  const engineIds = Object.keys(CRITERIA);
  const siteIds = CRITERIA_LIST.map((c) => c.id);
  assert.equal(engineIds.length, 46);
  assert.equal(CRITERIA_LIST.length, 46);
  assert.deepEqual(siteIds, engineIds);
});

test('CRITERIA_LIST: драйвер каждого критерия совпадает с engine.CRITERIA', () => {
  for (const c of CRITERIA_LIST) {
    assert.equal(c.driver, CRITERIA[c.id].driver, `driver mismatch for ${c.id}`);
  }
});

// ADR 0045: шкала и направление публичны — значит, они обязаны совпадать с
// движком так же строго, как driver. Значения — из фиксированных наборов
// engine.CRITERIA (scale: count|ordinal|binary, dir: esc|deesc).
test('CRITERIA_LIST: scale и dir совпадают с engine.CRITERIA и лежат в допустимых наборах', () => {
  for (const c of CRITERIA_LIST) {
    assert.equal(c.scale, CRITERIA[c.id].scale, `scale mismatch for ${c.id}`);
    assert.equal(c.dir, CRITERIA[c.id].dir, `dir mismatch for ${c.id}`);
    assert.ok(['count', 'ordinal', 'binary'].includes(c.scale), `${c.id}: неизвестная шкала ${c.scale}`);
    assert.ok(['esc', 'deesc'].includes(c.dir), `${c.id}: неизвестное направление ${c.dir}`);
  }
});

// R05: у каждого критерия — название и описание наблюдаемого сигнала на обоих
// языках (бриф: «название и короткое описание наблюдаемого сигнала (RU/EN)»).
test('CRITERIA_LIST: name и desc непустые на RU и EN у всех 46 позиций', () => {
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

// R05: «без формул» — ни одна строка name/desc не содержит знаков равенства,
// функций вида f(x)/w(x), пороговых шкал и служебных ссылок на разделы.
// Шаблоны — из брифа тасска и §4 METHODOLOGY (где формулы живут), а не из кода
// под тестом. Шкала и направление вынесены в поля scale/dir (ADR 0045) и на
// текст критерия не влияют.
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

// R05 (история 8): модель рендера раздела — 9 групп по драйверам, все 46
// позиций; переключение языка переводит и заголовки драйверов, и названия,
// и описания. Шов чистый (без DOM) — по аналогии с тестами соседних секций.
test('criteriaModel: 9 групп, 46 позиций, заголовки драйверов из словаря', () => {
  const model = criteriaModel('ru');
  assert.equal(model.length, 9);
  assert.deepEqual(model.map((g) => g.driver),
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9']);
  assert.equal(model.reduce((n, g) => n + g.items.length, 0), 46);
  for (const g of model) {
    assert.ok(g.title.length > 3, `пустой заголовок драйвера ${g.driver}`);
    for (const item of g.items) {
      assert.ok(item.name.length > 0 && item.desc.length > 0, `пустая позиция ${item.id}`);
    }
  }
});

test('criteriaModel: заголовки драйверов — из RU-словаря при любом языке; названия и описания переводятся', () => {
  const ru = criteriaModel('ru');
  const en = criteriaModel('en');
  assert.equal(ru.length, en.length);
  for (let i = 0; i < ru.length; i += 1) {
    // словарь одноязычный (ru): заголовки драйверов совпадают
    assert.equal(ru[i].title, en[i].title, `заголовок ${ru[i].driver} не из RU-словаря`);
    assert.equal(ru[i].items.length, en[i].items.length);
    for (let j = 0; j < ru[i].items.length; j += 1) {
      assert.notEqual(ru[i].items[j].name, en[i].items[j].name,
        `название ${ru[i].items[j].id} не переведено`);
      assert.notEqual(ru[i].items[j].desc, en[i].items[j].desc,
        `описание ${ru[i].items[j].id} не переведено`);
    }
  }
});

// ADR 0045: модель рендера несёт scale/dir, а их подписи живут в словаре.
// Подписи — без чисел: числовая шкала (0–1, CAP) остаётся закрытой.
test('criteriaModel: scale/dir у всех позиций, подписи из словаря и без чисел', () => {
  const seenScale = new Set();
  const seenDir = new Set();
  for (const g of criteriaModel('ru')) {
    for (const item of g.items) {
      assert.ok(['count', 'ordinal', 'binary'].includes(item.scale), `${item.id}: scale ${item.scale}`);
      assert.ok(['esc', 'deesc'].includes(item.dir), `${item.id}: dir ${item.dir}`);
      seenScale.add(item.scale);
      seenDir.add(item.dir);
    }
  }
  assert.deepEqual([...seenScale].sort(), ['binary', 'count', 'ordinal']);
  assert.deepEqual([...seenDir].sort(), ['deesc', 'esc']);

  for (const scale of seenScale) {
    const key = `method.criteria.scale.${scale}`;
    const label = DICTS.ru[key];
    assert.equal(typeof label, 'string', `нет ключа ${key}`);
    assert.ok(label.trim().length > 0, `пустой ключ ${key}`);
    assert.ok(!/\d/.test(label), `${key} содержит число: ${label}`);
  }
  for (const dir of seenDir) {
    const key = `method.criteria.dir.${dir}`;
    const label = DICTS.ru[key];
    assert.equal(typeof label, 'string', `нет ключа ${key}`);
    assert.ok(label.trim().length > 0, `пустой ключ ${key}`);
    assert.ok(!/\d/.test(label), `${key} содержит число: ${label}`);
  }
});

// R05 (история 8): ни одной формулы и в текстах вывода модели рендера.
test('criteriaModel: тексты не содержат формул и порогов', () => {
  const failures = [];
  for (const lang of ['ru']) {
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
