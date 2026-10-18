import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Правовая рамка репозитория (R01/R01i/R02/R02ii/R03/R03i/R05/R05i/R08ii/R10i).
// Ожидания — из спецификации и первоисточников лицензий, не из содержимого файлов
// под тестом. Сравнения по вхождению подстрок: файлы на диске могут быть с CRLF.
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (name) => readFileSync(join(root, name), 'utf8');
const norm = (text) => text.replace(/\r\n/g, '\n');

// Canonical-адреса так, как они стоят в первоисточниках (http, без .txt).
const APACHE_URL = 'http://www.apache.org/licenses/LICENSE-2.0';
const CC_BY_URL = 'https://creativecommons.org/licenses/by/4.0/legalcode';
const CC_BODY_MARKER = 'FULL TEXT OF THE CC BY 4.0 LEGAL CODE';
const SITE = 'https://cassindex.ru';

test('LICENSE: дословный Apache License 2.0 и заполненный copyright', () => {
  const license = norm(read('LICENSE'));

  // Опора первоисточника: заголовок, конец условий, canonical URL, приложение.
  assert.ok(license.includes('Apache License'), 'нет заголовка «Apache License»');
  assert.ok(license.includes('Version 2.0, January 2004'), 'нет строки версии Apache-2.0');
  assert.ok(license.includes(APACHE_URL), 'нет canonical URL текста Apache-2.0');
  assert.ok(license.includes('END OF TERMS AND CONDITIONS'), 'нет блока «END OF TERMS AND CONDITIONS»');
  assert.ok(license.includes('APPENDIX'), 'нет приложения «How to apply the Apache License»');
  assert.ok(license.includes('TRADEMARK.md'), 'LICENSE должен ссылаться на TRADEMARK.md (R05)');

  // Правообладатель — «Cassandra Index contributors» (спецификация, «Решения по реализации»).
  // Две строки: уведомление проекта и заполненное приложение к лицензии.
  assert.ok(license.includes('Copyright 2026 Cassandra Index contributors'), 'нет строки правообладателя');
  const copyrightLines = license.match(/Copyright 2026 Cassandra Index contributors/g) || [];
  assert.ok(copyrightLines.length >= 2, 'приложение должно быть заполнено, а не оставлено шаблоном');

  // Полнота дословного текста: первоисточник — 11 358 байт.
  assert.ok(license.length >= 11000, `текст Apache-2.0 короче первоисточника: ${license.length} символов`);
});

const ccBody = (name) => {
  const text = norm(read(name));
  const parts = text.split(CC_BODY_MARKER);
  assert.equal(parts.length, 2, `${name}: нет маркера начала полного текста CC BY 4.0`);
  return { header: parts[0], body: parts[1] };
};

test('LICENSE-DATA: область применения, атрибуция и полный текст CC BY 4.0', () => {
  const { header, body } = ccBody('LICENSE-DATA');

  assert.ok(header.includes('data/**'), 'шапка должна называть покрытый путь data/**');
  assert.ok(header.includes('Apache License 2.0') || header.includes('Apache-2.0'),
    'шапка должна говорить, что код покрыт Apache-2.0');
  assert.ok(header.includes('не покрыт') || header.includes('НЕ покрыт'),
    'шапка должна прямо говорить, что не покрыто');
  assert.ok(header.includes('Geo'), 'шапка должна говорить, что дампы GeoNames не входят');
  assert.ok(header.includes('издател'), 'шапка должна говорить, что тексты источников — права издателей');
  assert.ok(header.includes(`${SITE}, лицензия CC BY 4.0`), 'нет строки атрибуции с сайтом');
  assert.ok(header.includes('TRADEMARK.md'), 'шапка должна ссылаться на TRADEMARK.md (R05)');
  assert.ok(norm(header).includes(CC_BY_URL), 'нет canonical URL CC BY 4.0');

  assert.ok(body.includes('Attribution 4.0 International'), 'нет заголовка CC BY 4.0');
  assert.ok(body.includes('Creative Commons Corporation'), 'нет текста legalcode');
  assert.ok(body.length >= 18000, `тело CC BY 4.0 короче первоисточника: ${body.length} символов`);
});

test('LICENSE-DOCS: та же шапка области для docs/** и корневых *.md', () => {
  const { header, body } = ccBody('LICENSE-DOCS');

  assert.ok(header.includes('docs/**'), 'шапка должна называть покрытый путь docs/**');
  assert.ok(header.includes('*.md'), 'шапка должна называть корневые *.md');
  assert.ok(header.includes('Apache License 2.0') || header.includes('Apache-2.0'),
    'шапка должна говорить, что код покрыт Apache-2.0');
  assert.ok(header.includes(`${SITE}, лицензия CC BY 4.0`), 'нет строки атрибуции с сайтом');
  assert.ok(header.includes('TRADEMARK.md'), 'шапка должна ссылаться на TRADEMARK.md (R05)');
  assert.ok(body.includes('Creative Commons Corporation'), 'нет текста legalcode');
});

test('LICENSE-DATA и LICENSE-DOCS: тело legalcode идентично, различается только шапка', () => {
  const data = ccBody('LICENSE-DATA');
  const docs = ccBody('LICENSE-DOCS');

  assert.equal(data.body, docs.body, 'тело CC BY 4.0 должно быть дословно одинаковым');
  assert.notEqual(data.header, docs.header, 'шапки областей применения должны различаться');
});

test('NOTICE: чужие материалы перечислены по пунктам и не покрыты лицензиями проекта', () => {
  const notice = norm(read('NOTICE'));

  assert.ok(notice.includes('GeoNames'), 'нет пункта GeoNames');
  assert.ok(notice.includes('CC BY 4.0'), 'нет лицензии GeoNames');
  assert.ok(notice.includes('https://www.geonames.org/'), 'нет ссылки на GeoNames');
  assert.ok(notice.includes('издател'), 'нет пункта про тексты источников и права издателей');
  assert.ok(notice.includes('цитир'), 'нет пояснения про цитирование');
  assert.ok(notice.includes('Cloudflare Web Analytics'), 'нет пункта Cloudflare Web Analytics');
  assert.ok(notice.includes('FormSubmit'), 'нет пункта FormSubmit');
  assert.ok(notice.includes('package/package.json'), 'нет пункта стороннего package/package.json');
  assert.ok(notice.includes('GSD Core'), 'нет имени стороннего пакета');
  assert.ok(notice.includes('1.17.0'), 'нет версии стороннего пакета');
  assert.ok(notice.includes('MIT'), 'нет лицензии стороннего пакета');
  assert.ok(notice.includes('не покрывается лицензиями проекта'),
    'нет отдельной фразы о непокрытии лицензиями проекта');
});

test('TRADEMARK.md: защищаемое, два списка и требование к форку', () => {
  const tm = norm(read('TRADEMARK.md'));

  assert.ok(tm.includes('Cassandra Index'), 'нет словесного обозначения');
  assert.ok(tm.includes('icon.svg'), 'нет логотипа icon.svg');
  assert.ok(tm.includes('cassindex.ru'), 'нет домена cassindex.ru');
  assert.ok(tm.includes('Разрешено без спроса'), 'нет списка разрешённого без спроса');
  assert.ok(tm.includes('Требует письменного разрешения'), 'нет списка требующего разрешения');
  assert.ok(tm.includes('based on Cassandra Index'), 'нет разрешённой формы «based on Cassandra Index»');
  assert.ok(tm.includes('Apache License 2.0'), 'нет ссылки на Apache-2.0');
  assert.ok(tm.includes('§6') || tm.includes('раздел 6'), 'нет ссылки на §6 Apache-2.0 (товарные знаки)');
  assert.ok(tm.includes('форк') && tm.includes('иначе'), 'нет требования к форку называться иначе');
});

test('в трекинге нет закрытых каталогов commercial/, private/, enterprise/', () => {
  const tracked = execFileSync('git', ['-C', root, 'ls-files'], { encoding: 'utf8' })
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  for (const dir of ['commercial/', 'private/', 'enterprise/']) {
    const leaked = tracked.filter((path) => path.startsWith(dir));
    assert.deepEqual(leaked, [], `закрытый каталог ${dir} не должен быть в трекинге`);
  }
});
