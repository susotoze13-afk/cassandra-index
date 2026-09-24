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
// Раскрытие модели определения региона: часовой пояс браузера после согласия,
// сырой IP не используется (таск 06, R43/R47 — синхронизировано с privacy.html).
const IP_RU = 'регион определяется приблизительно по часовому поясу вашего браузера — только после вашего согласия; IP-адрес не используется, не сохраняется и не передаётся третьим лицам';
const IP_EN = 'your region is determined approximately from your browser’s time zone — only after you consent; your IP address is not used, stored, or shared with third parties';

test('§17 дословно в словаре RU и EN', () => {
  assert.equal(t('ru', 'disclaimer.full'), DISCLAIMER_RU);
  assert.equal(t('en', 'disclaimer.full'), DISCLAIMER_EN);
});

test('Раскрытие модели региона RU и EN (таск 06)', () => {
  assert.equal(t('ru', 'footer.ip'), IP_RU);
  assert.equal(t('en', 'footer.ip'), IP_EN);
  assert.ok(!/по IP для отображения/.test(t('ru', 'footer.ip')));
});

test('index.html: кнопка «Поделиться», §17 и раскрытие региона рядом с данными и в футере', () => {
  assert.ok(indexHtml.includes('data-role="share-btn"'));
  assert.ok(indexHtml.includes('data-i18n="disclaimer.full"'));
  assert.ok(indexHtml.includes('data-i18n="footer.ip"'));
  assert.ok(indexHtml.includes('privacy.html'));
  // справочник регионов подключён classic script-тегом (fetch на file:// невозможен)
  assert.ok(indexHtml.includes('data/regions/reference.js'));
});

test('privacy.html: цели ключей cassandra.region/cassandra.lang/consent, локализация, file://', () => {
  assert.ok(privacyHtml.includes('cassandra.region'));
  assert.ok(privacyHtml.includes('cassandra.lang'));
  assert.ok(privacyHtml.includes('cassandra.region.consent'));
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
    'privacy.storage.consent',
    'privacy.storage.first',
    'privacy.consent.text',
    'privacy.region.static',
    'privacy.region.future',
    'privacy.edge.text',
    'privacy.ccpa.text',
    'privacy.gdpr.text',
    'privacy.fz.text',
    'privacy.geo.text',
    'privacy.not.cookies',
    'privacy.not.third',
    'privacy.delete.text',
  ]) {
    assert.ok(privacyHtml.includes(t('ru', key)), `privacy.html не содержит текста ключа ${key}`);
  }
  // Рядом с ключами описаны цель и хранилище, а не только имена ключей.
  assert.match(t('ru', 'privacy.storage.lang'), /язык/i);
  assert.match(t('ru', 'privacy.storage.region'), /Запомнить/);
  assert.match(t('ru', 'privacy.storage.consent'), /granted\/denied/);
  assert.match(t('ru', 'privacy.storage.first'), /localStorage/i);
  assert.match(t('ru', 'privacy.consent.text'), /30 дней/);
  assert.match(t('ru', 'privacy.region.static'), /часовому поясу/);
  assert.match(t('ru', 'privacy.region.future'), /только код региона/);
  assert.match(t('ru', 'privacy.edge.text'), /сырой IP/i);
  assert.match(t('ru', 'privacy.ccpa.text'), /право на отказ/);
  assert.match(t('ru', 'privacy.gdpr.text'), /6\(1\)\(f\)/);
  assert.match(t('ru', 'privacy.fz.text'), /локализац/i);
  assert.match(t('ru', 'privacy.geo.text'), /Уточнить точнее/);
  assert.match(t('ru', 'privacy.delete.text'), /cassandra.region.consent/);
});

test('словарь: новые ключи таска 06 есть в паре ru+en', () => {
  for (const key of [
    'privacy.storage.consent',
    'privacy.consent.h',
    'privacy.consent.text',
    'privacy.edge.h',
    'privacy.edge.text',
    'privacy.laws.h',
    'privacy.ccpa.h',
    'privacy.ccpa.text',
    'privacy.gdpr.h',
    'privacy.gdpr.text',
    'privacy.fz.h',
    'privacy.fz.text',
    'region.toast.text',
    'region.toast.change',
    'region.toast.accept',
    'region.toast.dismiss',
  ]) {
    assert.notEqual(t('en', key), key, `EN-словарь не содержит ${key}`);
    assert.ok(t('en', key).length > 3, `EN-строка ${key} слишком короткая`);
    assert.notEqual(t('ru', key), key, `RU-словарь не содержит ${key}`);
  }
});
