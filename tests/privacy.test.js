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
// Раскрытие модели определения региона: часовой пояс браузера после согласия,
// сырой IP для определения не используется (таск 06, R43/R47 — синхронизировано
// с privacy.html). Обновлено 2026-10-11: cookie-less аналитика Cloudflare
// Web Analytics (по согласию).
const IP_RU = 'регион определяется приблизительно по часовому поясу вашего браузера — только после вашего согласия; для этого IP-адрес не используется и не сохраняется. Если вы разрешите аналитику, включается cookie-less аналитика Cloudflare Web Analytics — подробности в политике приватности';

test('§17 дословно в словаре RU', () => {
  assert.equal(t('ru', 'disclaimer.full'), DISCLAIMER_RU);
});

test('Раскрытие модели региона RU (таск 06)', () => {
  assert.equal(t('ru', 'footer.ip'), IP_RU);
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

test('privacy.html: цели ключей cassandra.region/consent, локализация, file://', () => {
  assert.ok(privacyHtml.includes('cassandra.region'));
  assert.ok(privacyHtml.includes('cassandra.region.consent'));
  assert.ok(privacyHtml.includes('localStorage'));
  assert.ok(privacyHtml.includes('data-i18n'));
  assert.ok(privacyHtml.includes('js/i18n.js'));
  assert.ok(privacyHtml.includes('href="index.html"'));
  // ноль внешних зависимостей: ни CDN, ни внешних скриптов/стилей. Единственный
  // разрешённый внешний URL — лицензия GeoNames (R29i, CC BY 4.0) как обычный
  // <a>-анкор, не подгружаемый ресурс. Порядок атрибутов (href/rel/src) не важен,
  // поэтому ловим сам внешний URL, а не шаблон тега.
  const ALLOWED_EXTERNAL = new Set(['https://creativecommons.org/licenses/by/4.0/']);
  const external = [...privacyHtml.matchAll(/\b(?:src|href)\s*=\s*"(https?:\/\/[^"]*)"/gi)]
    .map((m) => m[1]);
  const foreign = external.filter((u) => !ALLOWED_EXTERNAL.has(u));
  assert.deepEqual(foreign, [], `privacy.html тянет внешние ресурсы: ${foreign.join(', ')}`);
  // Ничего внешнее не подгружается как ресурс (script/link/img src).
  assert.ok(!/\bsrc\s*=\s*"https?:\/\//i.test(privacyHtml));
  assert.ok(privacyHtml.includes('href="https://creativecommons.org/licenses/by/4.0/"'));
});

test('privacy.html: смысловое содержимое — дефолтный текст совпадает со словарём, цели описаны', () => {
  // Страница-заглушка с голыми ключами/подстроками не пройдёт: дефолтный текст
  // HTML обязан совпадать со значениями словаря RU (applyI18n перезаписывает им).
  for (const key of [
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
    'privacy.geodata.text',
    'privacy.feedback.text',
    'privacy.analytics.text',
    'privacy.not.cookies',
    'privacy.not.third',
    'privacy.delete.text',
  ]) {
    assert.ok(privacyHtml.includes(t('ru', key)), `privacy.html не содержит текста ключа ${key}`);
  }
  // Рядом с ключами описаны цель и хранилище, а не только имена ключей.
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

test('словарь: новые ключи таска 06 есть в словаре ru', () => {
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
    assert.notEqual(t('ru', key), key, `RU-словарь не содержит ${key}`);
  }
});
