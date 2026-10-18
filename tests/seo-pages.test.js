// Статические SEO-страницы (таск 02 public-data-digest-seo, R01–R08, R15i, R23i,
// R24, R24.1, R25–R28, A01): «Как читать индекс», хаб сравнения и три страницы
// сравнения. Тесты читают HTML с диска — без DOM, как tests/page-structure.test.js.
// Ожидания взяты из ticket/spec и из docs/competitive-analysis.md, не из разметки.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { FEEDBACK_TOPICS } from '../js/sections/feedback.js';
import { t } from '../js/i18n.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (file) => readFileSync(path.join(ROOT, file), 'utf8');

const HOWTO = 'how-to-read.html';
const HUB = 'compare.html';
const COMPARISONS = [
  { file: 'compare-war-monitor.html', source: 'https://warmonit.com/ru/' },
  { file: 'compare-acled.html', source: 'https://acleddata.com/' },
  { file: 'compare-crisiswatch.html', source: 'https://www.crisisgroup.org/crisiswatch' },
];
const PAGES = [HOWTO, HUB, ...COMPARISONS.map((c) => c.file)];

// Политика статических страниц: только собственные ресурсы и стили, без скриптов
// (ни инлайновых, ни внешних) и без JSON-LD — осознанный отказ от ослабления CSP.
const STATIC_CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; " +
  "font-src 'self'; base-uri 'self'; object-src 'none'";

test('SEO-страницы: базовые требования к каждой из пяти страниц', () => {
  for (const file of PAGES) {
    const html = read(file);
    assert.match(html, /^<!doctype html>\n<html lang="ru">/, `${file}: нет doctype/lang=ru`);
    assert.match(html, /<title>[^<]{5,}<\/title>/, `${file}: нет содержательного title`);
    assert.match(html, /<meta name="description" content="[^"]{20,}">/, `${file}: нет meta description`);

    const canonical = `https://cassindex.ru/${file}`;
    assert.ok(
      html.includes(`<link rel="canonical" href="${canonical}">`),
      `${file}: canonical не указывает на ${canonical}`,
    );
    for (const prop of ['og:type', 'og:title', 'og:description', 'og:url']) {
      assert.ok(html.includes(`property="${prop}"`), `${file}: нет ${prop}`);
    }
    assert.ok(html.includes(`property="og:url" content="${canonical}"`), `${file}: og:url не равен canonical`);

    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${file}: должен быть ровно один h1`);
    assert.ok(html.includes('href="index.html"'), `${file}: нет ссылки на index.html`);

    const csp = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/);
    assert.ok(csp, `${file}: нет meta-CSP`);
    assert.equal(csp[1], STATIC_CSP, `${file}: CSP не соответствует статической странице`);
    assert.ok(!csp[1].includes('unsafe-inline'), `${file}: CSP ослаблен inline-стилями/скриптами`);

    // Ни скриптов, ни внешних ресурсов, ни инлайновых стилей, ни JSON-LD.
    assert.ok(!/<script/i.test(html), `${file}: страница не должна нести скриптов`);
    assert.ok(!/\bsrc\s*=\s*"https?:\/\//i.test(html), `${file}: внешний ресурс в src`);
    assert.ok(!/<link[^>]+rel="(?:stylesheet|preload|icon|manifest)"[^>]*href="https?:\/\//i.test(html), `${file}: внешний ресурс в link`);
    assert.ok(!/<img/i.test(html), `${file}: страница не должна нести картинок`);
    assert.ok(!/\bstyle\s*=\s*"/i.test(html), `${file}: инлайновый style-атрибут`);
    assert.ok(!/application\/ld\+json/i.test(html), `${file}: JSON-LD запрещён`);
    assert.ok(!html.includes('\r'), `${file}: CRLF вместо LF`);
  }
});

test('index.html: ссылка «Как читать индекс» в шапке и подвале, подвал ведёт на данные и сравнения', () => {
  const index = read('index.html');
  assert.equal(
    (index.match(/href="how-to-read\.html"/g) || []).length >= 2,
    true,
    'index.html: ссылка «Как читать индекс» должна быть в шапке и в подвале',
  );
  assert.ok(index.includes('data-i18n="nav.howto"'), 'index.html: ссылка шапки должна брать строку из словаря');
  assert.ok(index.includes('data-i18n="footer.howto"'), 'index.html: ссылка подвала должна брать строку из словаря');
  for (const href of ['changelog.html', 'digest.html', 'data/public/index.json', 'compare.html']) {
    assert.ok(index.includes(`href="${href}"`), `index.html: в подвале нет ссылки на ${href}`);
  }
});

test('how-to-read.html: первый экран, шкала, ограничения, драйверы, регионы, цитирование', () => {
  const html = read(HOWTO);
  // Первый экран — пример последней недели: индекс 64, дельта +8, состояние «очень опасно».
  for (const fact of ['18 октября 2026', '64', '+8', 'Очень опасно']) {
    assert.ok(html.includes(fact), `how-to-read.html: первый экран не называет «${fact}»`);
  }
  for (const heading of [
    'Чего индекс не означает',
    'Три драйвера недели',
    'Регионы и слепой регион',
    'Как цитировать',
  ]) {
    assert.ok(html.includes(heading), `how-to-read.html: нет раздела «${heading}»`);
  }
  // Шкала порядковая, расстояния — соглашение (ADR 0048), а не измеренная величина.
  assert.ok(/порядкова/i.test(html), 'how-to-read.html: шкала не названа порядковой');
  assert.ok(/расстояни/i.test(html) && /соглашени/i.test(html), 'how-to-read.html: нет оговорки о расстояниях');
  assert.ok(/не прогноз/i.test(html), 'how-to-read.html: нет явного «не прогноз»');

  // Блок цитирования: дата, что нельзя приписывать, ссылки на данные и changelog.
  assert.ok(/указ[а-я]*\s+дат/i.test(html), 'how-to-read.html: цитирование не требует даты');
  for (const href of ['data/public/index.json', 'data/public/cassandra-index.csv', 'changelog.html']) {
    assert.ok(html.includes(`href="${href}"`), `how-to-read.html: нет ссылки на ${href}`);
  }
  // Подписка — заявкой через форму, адрес добавляет владелец (R23i).
  assert.ok(/дайджест/i.test(html), 'how-to-read.html: нет абзаца про дайджест');
  assert.ok(html.includes('href="index.html#feedback"'), 'how-to-read.html: подписка не ведёт на форму обратной связи');
  assert.ok(/владел/i.test(html), 'how-to-read.html: не сказано, что список адресов ведёт владелец');
  assert.match(html, /слепой/i, 'how-to-read.html: слепой регион не объяснён');
});

test('Страницы сравнения: что это, что общего, отличия, чего нет, источник и дата проверки', () => {
  for (const { file, source } of COMPARISONS) {
    const html = read(file);
    for (const heading of ['Что это', 'Что общего', 'Чем отличаемся', 'Чего у нас нет']) {
      assert.ok(html.includes(heading), `${file}: нет раздела «${heading}»`);
    }
    assert.ok(html.includes(source), `${file}: нет ссылки на источник конкурента ${source}`);
    assert.ok(html.includes('2026-10-18'), `${file}: нет даты проверки фактов 2026-10-18`);
    // Честность сравнения: никаких заявлений о превосходстве (R28).
    assert.ok(!/лучше|превосход|опережа/i.test(html), `${file}: утверждение о превосходстве без основания`);
    // Отличий должно быть несколько — считаем пункты списка отличий по <li>.
    const diffBlock = (html.split('Чем отличаемся')[1] || '').split('Чего у нас нет')[0];
    const items = (diffBlock.match(/<li>/g) || []).length;
    assert.ok(items >= 3 && items <= 5, `${file}: ожидается 3–4 отличия, найдено ${items}`);
  }
});

test('compare.html: хаб со ссылками на три страницы и короткой таблицей', () => {
  const html = read(HUB);
  assert.ok(/<table/.test(html), 'compare.html: нет короткой таблицы');
  for (const { file } of COMPARISONS) {
    assert.ok(html.includes(`href="${file}"`), `compare.html: нет ссылки на ${file}`);
  }
});

test('форма обратной связи: тема «дайджест» и подпись темы в словаре', () => {
  assert.ok(FEEDBACK_TOPICS.includes('digest'), 'FEEDBACK_TOPICS не содержит тему digest');
  const label = t('ru', 'feedback.topic.digest');
  assert.notEqual(label, 'feedback.topic.digest', 'в словаре нет feedback.topic.digest');
  assert.match(label, /дайджест/i);
});
