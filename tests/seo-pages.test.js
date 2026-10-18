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
import { loadSnapshotFromDisk } from '../calc/public-export.js';
import { readLatestWeeks } from '../calc/prepare-week.js';
import { stateOf } from '../calc/engine.js';
import { PARAMS } from '../calc/params.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (file) => readFileSync(path.join(ROOT, file), 'utf8');

const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

// Дата, названная страницей, а не «сегодняшняя»: страница статическая, и её
// числа обязаны сходиться со снапшотом той недели, которую она называет.
function namedWeek(html) {
  const m = /(\d{1,2}) ([а-яё]+) (\d{4})/.exec(html);
  if (!m) return null;
  const month = MONTHS_GENITIVE.indexOf(m[2]);
  if (month < 0) return null;
  return `${m[3]}-${String(month + 1).padStart(2, '0')}-${m[1].padStart(2, '0')}`;
}

// Контраст WCAG 2.2: относительная яркость sRGB-компонент и отношение
// (L_light + 0.05) / (L_dark + 0.05); порог проекта — 4.5:1.
function tokenColor(css, name) {
  const m = new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`).exec(css);
  assert.ok(m, `css/styles.css: нет токена --${name}`);
  return m[1];
}

function luminance(hex) {
  const channel = (offset) => {
    const c = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const HOWTO = 'how-to-read.html';
const HUB = 'compare.html';
const COMPARISONS = [
  { file: 'compare-war-monitor.html', source: 'https://warmonit.com/ru/' },
  { file: 'compare-acled.html', source: 'https://acleddata.com/' },
  { file: 'compare-crisiswatch.html', source: 'https://www.crisisgroup.org/crisiswatch' },
];
const PAGES = [HOWTO, HUB, ...COMPARISONS.map((c) => c.file), 'validation.html'];

// Политика статических страниц: только собственные ресурсы и стили, без скриптов
// (ни инлайновых, ни внешних) и без JSON-LD — осознанный отказ от ослабления CSP.
const STATIC_CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; " +
  "font-src 'self'; base-uri 'self'; object-src 'none'";

test('SEO-страницы: базовые требования к каждой из шести страниц', () => {
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
  // Первый экран называет опубликованную неделю, и его числа — из её снапшота.
  const week = namedWeek(html);
  assert.ok(week, 'how-to-read.html: первый экран не называет дату недели');
  const { weeks } = readLatestWeeks(read(path.join('data', 'latest.js')));
  assert.ok(weeks.includes(week), `how-to-read.html называет неделю ${week}, которой нет в CI_WEEKS`);
  const snapshot = loadSnapshotFromDisk(week);
  assert.equal(snapshot.dataState, 'published', `how-to-read.html: неделя ${week} не опубликована`);
  const global = snapshot.global;
  assert.ok(html.includes(`${global.index}`), 'how-to-read.html: первый экран не называет индекс недели');
  const delta = global.delta > 0 ? `+${global.delta}` : String(global.delta);
  assert.ok(html.includes(delta), `how-to-read.html: первый экран не называет изменение ${delta}`);
  const state = t('ru', `status.${stateOf(global.index, PARAMS)}`);
  assert.ok(html.toLowerCase().includes(state.toLowerCase()),
    `how-to-read.html: первый экран не называет состояние «${state}»`);
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

// Обязательная дата «проверено» и подпись под числом — единственный текст
// статических страниц, который раньше шёл цветом 4.01:1 на --bg и 3.69:1 на
// --surface. Порог проекта — 4.5:1 (WCAG 2.2 AA, обычный текст).
test('css/styles.css: .doc-meta и .doc-figure-note читаются при контрасте ≥ 4.5:1', () => {
  const css = read('css/styles.css');
  const bg = tokenColor(css, 'bg');
  const surface = tokenColor(css, 'surface');

  for (const [selector, token] of [['.doc-meta', 'text-secondary'], ['.doc-figure-note', 'text-secondary']]) {
    const block = new RegExp(`\\${selector}\\s*\\{([^}]*)\\}`).exec(css);
    assert.ok(block, `css/styles.css: нет правила ${selector}`);
    assert.ok(block[1].includes(`var(--${token})`), `${selector} должен использовать --${token}`);
    const color = tokenColor(css, token);
    for (const [name, background] of [['--bg', bg], ['--surface', surface]]) {
      const ratio = contrast(color, background);
      assert.ok(ratio >= 4.5,
        `${selector}: контраст ${ratio.toFixed(2)}:1 на ${name} ниже порога 4.5:1 (${color} на ${background})`);
    }
  }

  // Прежний токен ниже порога — тест держит причину, а не только следствие.
  assert.ok(contrast(tokenColor(css, 'text-muted'), bg) < 4.5, '--text-muted внезапно стал контрастным');
});

test('css/styles.css: комментарии в UTF-8, без битой кириллицы', () => {
  const raw = readFileSync(path.join(ROOT, 'css', 'styles.css'));
  const css = raw.toString('utf8');
  assert.ok(!css.includes('\uFFFD'), 'css/styles.css: битые символы UTF-8');
  assert.doesNotMatch(css, /\?{3,}/, 'css/styles.css: битая кириллица в комментариях');
  assert.ok(!css.includes('\r'), 'css/styles.css: CRLF вместо LF');
  // Секция статических страниц должна остаться описанной по-русски.
  assert.match(css, /Справочные страницы/, 'css/styles.css: комментарий секции статических страниц потерян');
});
