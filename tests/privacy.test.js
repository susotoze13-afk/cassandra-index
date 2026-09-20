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
const IP_RU = 'регион определяется приблизительно по IP для отображения регионального контекста; адрес не сохраняется и не передаётся третьим лицам';

test('§17 дословно в словаре RU и EN', () => {
  assert.equal(t('ru', 'disclaimer.full'), DISCLAIMER_RU);
  assert.ok(t('en', 'disclaimer.full').length > 60);
  assert.notEqual(t('en', 'disclaimer.full'), 'disclaimer.full');
});

test('IP-раскрытие дословно RU, переведено EN (История 27)', () => {
  assert.equal(t('ru', 'footer.ip'), IP_RU);
  assert.ok(t('en', 'footer.ip').includes('IP address'));
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
