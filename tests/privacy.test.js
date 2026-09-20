import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { t } from '../js/i18n.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexHtml = readFileSync(join(root, 'index.html'), 'utf8');
const privacyHtml = readFileSync(join(root, 'privacy.html'), 'utf8');

// §17 (PRD) дословно — ожидание взято из текста спецификации, не из кода.
const DISCLAIMER_RU = 'Cassandra Index — экспериментальная оценка риска на основе открытых данных. Это не официальный прогноз правительства или международной организации. Оценка может быть ошибочной.';
const DISCLAIMER_EN = 'Cassandra Index is an experimental risk assessment based on open data. It is not an official forecast of any government or international organisation. The assessment may be wrong.';
const IP_RU = 'регион определяется приблизительно по IP для отображения регионального контекста; адрес не сохраняется и не передаётся третьим лицам';
const IP_EN = 'the region is determined approximately from your IP address to show regional context; the address is not stored and is not shared with third parties';

test('§17 дословно в словаре RU и EN', () => {
  assert.equal(t('ru', 'disclaimer.full'), DISCLAIMER_RU);
  assert.equal(t('en', 'disclaimer.full'), DISCLAIMER_EN);
});

test('IP-раскрытие дословно RU и EN (История 27)', () => {
  assert.equal(t('ru', 'footer.ip'), IP_RU);
  assert.equal(t('en', 'footer.ip'), IP_EN);
});

test('index.html: кнопка «Поделиться», §17 и IP-раскрытие рядом с данными и в футере', () => {
  assert.ok(indexHtml.includes('data-role="share-btn"'));
  assert.ok(indexHtml.includes('data-i18n="disclaimer.full"'));
  assert.ok(indexHtml.includes('data-i18n="footer.ip"'));
  assert.ok(indexHtml.includes('privacy.html'));
});

test('privacy.html: цели ключей cassandra.region/cassandra.lang, локализация, file://', () => {
  assert.ok(privacyHtml.includes('cassandra.region'));
  assert.ok(privacyHtml.includes('cassandra.lang'));
  assert.ok(privacyHtml.includes('localStorage'));
  assert.ok(privacyHtml.includes('data-i18n'));
  assert.ok(privacyHtml.includes('js/i18n.js'));
  assert.ok(privacyHtml.includes('href="index.html"'));
  // ноль внешних зависимостей: ни CDN, ни внешних скриптов/стилей
  assert.ok(!/src="https?:\/\//.test(privacyHtml));
  assert.ok(!/href="https?:\/\//.test(privacyHtml));
});

test('privacy.html: смысловое содержимое — дефолтный текст совпадает со словарём, цели описаны', () => {
  // Страница-заглушка с голыми ключами/подстроками не пройдёт: дефолтный текст
  // HTML обязан совпадать со значениями словаря RU (applyI18n перезаписывает им).
  for (const key of [
    'privacy.storage.lang',
    'privacy.storage.region',
    'privacy.storage.first',
    'privacy.region.static',
    'privacy.region.future',
    'privacy.geo.text',
    'privacy.not.cookies',
    'privacy.not.third',
    'privacy.delete.text',
  ]) {
    assert.ok(privacyHtml.includes(t('ru', key)), `privacy.html не содержит текст ключа ${key}`);
  }
  // Рядом с ключами описаны цель и хранилище, а не только имена ключей.
  assert.match(t('ru', 'privacy.storage.lang'), /язык/i);
  assert.match(t('ru', 'privacy.storage.region'), /Запомнить/);
  assert.match(t('ru', 'privacy.storage.first'), /localStorage/i);
  assert.match(t('ru', 'privacy.region.future'), /IP/);
  assert.match(t('ru', 'privacy.geo.text'), /Уточнить точнее/);
  assert.match(t('ru', 'privacy.delete.text'), /localStorage/);
});
