// Версия проекта, машинное цитирование и метаданные Zenodo (таск 02, R04/R04i/
// R04ii/R09/R10i). Тесты читают файлы с диска — без DOM, без сети, без YAML-парсера:
// CFF 1.2.0 — простой YAML, ключи верхнего уровня проверяются построчно, как
// tests/page-structure.test.js читает разметку.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (file) => readFileSync(path.join(ROOT, file), 'utf8');

// Значение ключа верхнего уровня из CFF: `key: value` или `key: "value"`,
// многострочные блоки (`key: >` / `|`) для наших полей не используются.
function cffField(text, key) {
  const m = new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(text);
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}

// Список элементов верхнего уровня: строки `- item`, идущие после `key:`.
function cffList(text, key) {
  const m = new RegExp(`^${key}:\\s*$`, 'm').exec(text);
  if (!m) return [];
  const rest = text.slice(m.index + m[0].length).split('\n');
  const items = [];
  for (const line of rest) {
    if (/^\S/.test(line) && line.trim()) break; // следующий ключ верхнего уровня
    const item = /^\s*-\s+(.+)$/.exec(line);
    if (item) items.push(item[1].trim().replace(/^["']|["']$/g, ''));
  }
  return items;
}

test('VERSION: одна строка semver без префикса v', () => {
  assert.ok(existsSync(path.join(ROOT, 'VERSION')), 'в корне нет файла VERSION');
  const raw = read('VERSION');
  assert.equal(raw, '1.0.0\n', 'VERSION обязан быть ровно одной строкой 1.0.0 и переводом строки');
  assert.match(raw.trim(), /^\d+\.\d+\.\d+$/, 'VERSION не semver');
});

test('CITATION.cff: форма CFF 1.2.0 и паритет версии с VERSION', () => {
  assert.ok(existsSync(path.join(ROOT, 'CITATION.cff')), 'в корне нет CITATION.cff');
  const cff = read('CITATION.cff');
  const version = read('VERSION').trim();

  assert.equal(cffField(cff, 'cff-version'), '1.2.0');
  assert.ok(cffField(cff, 'message'), 'нет message');
  assert.ok(cffField(cff, 'title'), 'нет title');
  assert.equal(cffField(cff, 'version'), version, 'CITATION.cff.version не совпадает с VERSION');
  assert.equal(cffField(cff, 'url'), 'https://cassindex.ru');
  assert.equal(cffField(cff, 'license'), 'CC-BY-4.0');
  assert.ok(cffField(cff, 'abstract'), 'нет abstract');
  assert.ok(cffList(cff, 'keywords').length >= 3, 'нужно не меньше трёх keywords');

  // Автор — владелец проекта, а не коллектив: DOI должен быть привязан к человеку.
  assert.ok(cff.includes('authors:'), 'нет authors');
  assert.ok(/^\s*-\s+family-names:\s*["']?Zasidkevich["']?\s*$/m.test(cff),
    'authors должен называть владельца проекта (family-names: Zasidkevich)');
  assert.ok(/^\s*given-names:\s*["']?Mikhail["']?\s*$/m.test(cff),
    'authors должен нести given-names: Mikhail');

  // DOI версии 1.0.0 в Zenodo — постоянная ссылка датасета.
  assert.equal(cffField(cff, 'doi'), '10.5281/zenodo.23458011',
    'CITATION.cff.doi должен нести DOI версии 1.0.0');

  // date-released — календарная дата релиза, а не дата недели в прозе.
  const released = cffField(cff, 'date-released');
  assert.match(released || '', /^\d{4}-\d{2}-\d{2}$/, 'date-released не ISO-дата');
  assert.ok(!Number.isNaN(Date.parse(released)), 'date-released не разбирается как дата');
});

test('.zenodo.json: датасет с лицензией CC BY 4.0 и ссылкой на сайт', () => {
  assert.ok(existsSync(path.join(ROOT, '.zenodo.json')), 'в корне нет .zenodo.json');
  const raw = read('.zenodo.json');
  const meta = JSON.parse(raw);

  assert.equal(meta.upload_type, 'dataset', 'upload_type обязан быть dataset');
  assert.ok(typeof meta.title === 'string' && meta.title.trim(), 'нет title');
  assert.ok(typeof meta.description === 'string' && meta.description.trim(), 'нет description');
  assert.equal(meta.license, 'cc-by-4.0');
  assert.ok(Array.isArray(meta.creators) && meta.creators.length > 0, 'нет creators');
  for (const creator of meta.creators) {
    assert.ok(typeof creator.name === 'string' && creator.name.trim(), 'у creators нет name');
  }
  assert.ok(Array.isArray(meta.keywords) && meta.keywords.length >= 3, 'нужно не меньше трёх keywords');
  assert.ok(Array.isArray(meta.related_identifiers), 'нет related_identifiers');
  assert.ok(meta.related_identifiers.some((r) => r && r.identifier === 'https://cassindex.ru'),
    'related_identifiers не ссылается на https://cassindex.ru');

  // Выдуманных идентификаторов нет: DOI и ORCID выдаёт не этот файл.
  assert.ok(!/orcid/i.test(raw), 'в .zenodo.json не должно быть ORCID');
  assert.ok(!/doi/i.test(raw), 'в .zenodo.json не должно быть DOI до реального релиза');
});

test('how-to-read.html: каноническая формула цитирования с версией из VERSION', () => {
  const html = read('how-to-read.html');
  const version = read('VERSION').trim();
  const section = html.split('id="cite-title"')[1] || '';
  assert.ok(section, 'how-to-read.html: нет раздела #cite-title');

  const formula = new RegExp(
    `Cassandra Index, версия ${version.replace(/\./g, '\\.')}, [^<]+, https://cassindex\\.ru`,
  );
  assert.match(section, formula, 'нет формулы «Cassandra Index, версия, дата, URL» с версией из VERSION');

  assert.ok(
    section.includes('href="https://github.com/susotoze13-afk/cassandra-index/blob/master/CITATION.cff"'),
    'нет ссылки на CITATION.cff в GitHub (файл не входит в deploy-whitelist)',
  );
  // Прежние полезные пункты раздела сохранены.
  assert.match(section, /указ[а-я]*\s+дат/i, 'раздел не требует указывать дату недели');
  assert.match(section, /не прогноз|не называйте его прогнозом/i, 'раздел не предупреждает о «прогнозе»');
  // Формулировка шкалы остаётся порядковой (ADR 0048), без «вероятности».
  assert.ok(!/вероятност/i.test(html), 'how-to-read.html: слово «вероятность» запрещено');
});
