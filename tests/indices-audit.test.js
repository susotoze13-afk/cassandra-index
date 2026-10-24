// Приложение «Аудит 12 индексов» (таск 02, R01–R08, R13–R16, R19, A01):
// страница indices-audit.html — производная генератора indices-audit-build.js.
// Ожидания взяты из тикета, interfaces.md и статьи (98, 88, 73, 69, 69, 58, 56,
// 56, 48, 45, 33, 0; 62 из 120; медиана 5,5; 5 из 12; полный цикл — один проект),
// а не из разметки страницы.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import {
  ROOT,
  SOURCE,
  OUTPUT,
  SITE,
  WEIGHTS,
  FREQUENCY,
  CRITERIA,
  PROJECT_IDS,
  parseSource,
  validateSource,
  weightedRows,
  matrixStats,
  sensitivityRows,
  renderPage,
  buildOutputs,
} from '../indices-audit-build.js';

const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const source = read(SOURCE);
const model = parseSource(source);
const page = read(OUTPUT);

test('источник разбирается, validateSource возвращает пустой список ошибок', () => {
  assert.deepEqual(validateSource(model), []);
  assert.equal(model.date, '2026-10-24');
  assert.equal(model.criteria.length, 10);
  assert.deepEqual(model.criteria.map((c) => c.code), CRITERIA);
  assert.equal(model.projects.length, 12);
  assert.deepEqual(model.projects.map((p) => p.id), PROJECT_IDS);
  assert.equal(model.countries.rows.length, 14);
  assert.equal(model.unverified.length, 8);
  // У каждого проекта 10 клеток матрицы, 10 оснований и частота из словаря.
  for (const project of model.projects) {
    assert.equal(Object.keys(project.matrix).length, CRITERIA.length, `${project.id}: клеток матрицы`);
    for (const code of CRITERIA) assert.equal(typeof project.matrix[code], 'boolean', `${project.id}/${code}`);
    for (const code of CRITERIA) assert.ok(project.basis[code], `${project.id}/${code}: нет основания`);
    assert.ok(Object.hasOwn(FREQUENCY, project.frequency), `${project.id}: частота ${project.frequency}`);
    assert.match(project.source.checked, /^\d{4}-\d{2}-\d{2}$/, `${project.id}: дата проверки источника`);
    assert.ok(project.source.links.length >= 1, `${project.id}: нет ссылки на источник`);
  }
});

test('испорченный источник — понятная ошибка, а не тихий пропуск', () => {
  // Убран раздел «Матрица»: без него чисел не посчитать.
  const withoutMatrix = source.replace(/## Матрица[\s\S]*?## Развёртка/, '## Развёртка');
  assert.throws(() => parseSource(withoutMatrix), /Матрица/);

  // Матрица и развёртка разошлись: положительная клетка описана как минус.
  const broken = model.projects.map((p) => ({ ...p }));
  broken[0] = { ...broken[0], basis: { ...broken[0].basis, Д: '— причины нет' } };
  const brokenModel = { ...model, projects: broken };
  const errors = validateSource(brokenModel);
  assert.ok(errors.length > 0, 'расхождение матрицы и развёртки должно ловиться');
  assert.match(errors.join('\n'), /Д/);
});

test('взвешенная шкала: 12 баллов из матрицы совпадают со статьёй', () => {
  const rows = weightedRows(model);
  assert.equal(rows.length, 12);
  assert.deepEqual(rows.map((row) => row.id), PROJECT_IDS);

  // Пять вкладов на проект, каждый в [0, 1].
  for (const row of rows) {
    assert.deepEqual(Object.keys(row.parts).sort(), Object.keys(WEIGHTS).sort(), `${row.id}: состав вкладов`);
    for (const value of Object.values(row.parts)) {
      assert.ok(value >= 0 && value <= 1, `${row.id}: вклад вне [0, 1]`);
    }
    assert.ok(Number.isFinite(row.score), `${row.id}: нечисленный балл`);
    assert.equal(row.total, Math.round(row.score), `${row.id}: total = округлённый балл`);
  }

  // Числа статьи — в порядке убывания балла (так они напечатаны в статье).
  const totals = [...rows].sort((a, b) => b.score - a.score || PROJECT_IDS.indexOf(a.id) - PROJECT_IDS.indexOf(b.id))
    .map((row) => row.total);
  assert.deepEqual(totals, [98, 88, 73, 69, 69, 58, 56, 56, 48, 45, 33, 0]);
  // 58 баллов Cassandra — число из статьи.
  assert.equal(rows.find((row) => row.id === 'cassandra').total, 58);
});

test('matrixStats: 62 из 120, медиана 5,5, пять проверяемых, один полный цикл', () => {
  const stats = matrixStats(model);
  assert.equal(stats.total, 62);
  assert.equal(stats.possible, 120);
  assert.equal(stats.median, 5.5);
  assert.equal(stats.verifiable, 5);
  assert.equal(stats.fullCycle, 1);
  assert.equal(stats.perCriterion.length, CRITERIA.length);
  assert.equal(stats.perCriterion.reduce((sum, item) => sum + item.confirmed, 0), 62);
  assert.ok(stats.byBlock.length >= 2, 'ожидаются блоки признаков');
  assert.equal(stats.byBlock.reduce((sum, block) => sum + block.confirmed, 0), 62);
});

test('устойчивость ±5 п.п.: верх и низ не двигаются, в середине есть обмены', () => {
  const rows = sensitivityRows(model);
  assert.equal(rows.length, 10); // пять весов × два сдвига
  const baseline = weightedRows(model)
    .sort((a, b) => b.score - a.score || PROJECT_IDS.indexOf(a.id) - PROJECT_IDS.indexOf(b.id))
    .map((row) => row.id);
  const top = baseline[0];
  const bottom = baseline.slice(-2); // последние два места

  let swaps = 0;
  for (const row of rows) {
    assert.equal(row.order.length, 12, `${row.key}${row.delta}: в порядке не 12 проектов`);
    assert.equal(row.order[0], top, `${row.key}${row.delta}: первое место сдвинулось`);
    assert.deepEqual(row.order.slice(-2), bottom, `${row.key}${row.delta}: последние два места сдвинулись`);
    assert.ok(Array.isArray(row.swaps), `${row.key}${row.delta}: нет списка обменов`);
    swaps += row.swaps.length;
  }
  assert.ok(swaps > 0, 'ни один сдвиг веса не дал обменов мест — проверка ничего не проверяет');
});

test('источник: INFORM/Д подтверждён страницей Results and data, а не XLSX-заглушкой', () => {
  const inform = model.projects.find((project) => project.id === 'inform');
  const unverified = model.unverified.find((row) => row.project === 'INFORM');
  assert.ok(unverified, 'INFORM должен быть в разделе «Не проверено»');
  assert.match(unverified.reason, /WAF/i, 'причина непроверенного XLSX — WAF-заглушка');
  const basis = inform.basis['Д'];
  assert.match(basis, /Results and data/, 'подтверждение — страница со списком стран');
  assert.match(basis, /191/, 'страница называет 191 позицию');
  assert.ok(!/XLSX[^.;]*—\s*проверено/.test(basis),
    'XLSX назван подтверждением, хотя в «Не проверено» он WAF-заглушка');
});

test('источник: FSI/Д подтверждён тем, что открылось, а не выгрузками', () => {
  const fsi = model.projects.find((project) => project.id === 'fsi');
  const unverified = model.unverified.find((row) => row.project === 'Fragile States Index');
  assert.ok(unverified, 'FSI должен быть в разделе «Не проверено»');
  assert.match(unverified.reason, /Tableau/, 'причина — пустой Tableau-embed');
  assert.match(unverified.reason, /XLSX/, 'причина — обрезанные XLSX');
  const basis = fsi.basis['Д'];
  assert.match(basis, /200/, 'подтверждение называет реально полученный ответ страниц');
  assert.ok(!/выгрузк/i.test(basis) || /обрезан|не (скачал|открыл|получен)|Tableau/i.test(basis),
    '«подтверждено выгрузками» не может стоять рядом с «обрезанные XLSX»');
});

test('источник: INFORM/В не ссылается на файл, названный WAF-заглушкой', () => {
  const inform = model.projects.find((project) => project.id === 'inform');
  const unverified = model.unverified.find((row) => row.project === 'INFORM');
  const stubbed = /INFORM_Risk_Mid_(\d+)_v(\d+)\.xlsx/.exec(unverified.reason);
  const basis = inform.basis['В'];
  assert.match(basis, /год/i, 'версии должны называть год и полугодие');
  assert.ok(!/Mid_2026|INFORM_Risk_/i.test(basis),
    'файл, названный в «Не проверено» WAF-заглушкой, не может подтверждать версии');
  assert.ok(!stubbed || !basis.includes(stubbed[0]), 'неподтверждённый XLSX не может быть основанием «В»');
});

test('генератор: дата среза и число непроверенного берутся из модели, а не вписаны', () => {
  const mutated = { ...model, date: '2026-11-05', unverified: model.unverified.slice(0, 3) };
  const html = renderPage(mutated);
  assert.ok(html.includes('5 ноября 2026'), 'дата среза в прозе — из model.date');
  assert.ok(!html.includes('24 октября'), 'вписанная дата не должна переживать смену model.date');
  assert.ok(html.includes('проверок, которые не удалось довести до конца: 3'), 'число непроверенного считается из модели');
  assert.ok(!/все клетки проверены/i.test(html), '«все клетки проверены» — ложное утверждение');
});

test('таблица устойчивости: у каждого сдвинувшегося проекта есть «было → стало»', () => {
  const html = renderPage(model);
  // При +5 к открытости War Monitor поднимается с 10-го места на 9-е, GDELT опускается с 9-го на 10-е.
  assert.ok(html.includes('GDELT: 9 → 10'), 'нет позиции «было → стало» для GDELT');
  assert.ok(html.includes('War Monitor: 10 → 9'), 'нет позиции «было → стало» для War Monitor');
});

test('фраза «все они — в середине списка» вычисляется, а не вписана', () => {
  // Синтетика: у всех проектов пустая матрица и нулевое покрытие; Cassandra открыта
  // только по Д, ACLED — только по Ф. Эти два проекта обмениваются первым местом
  // при сдвиге веса, значит «верх не двигался» уже неверно.
  const empty = Object.fromEntries(CRITERIA.map((code) => [code, false]));
  const projects = model.projects.map((project) => ({
    ...project,
    frequency: 'dashboard',
    matrix: { ...empty },
    basis: Object.fromEntries(CRITERIA.map((code) => [code, '— тест'])),
  }));
  projects[0].matrix = { ...empty, 'Д': true };
  projects[1].matrix = { ...empty, 'Ф': true };
  const html = renderPage({ ...model, projects });
  assert.ok(!html.includes('все они — в середине списка'),
    'верх двигался, значит «все они — в середине списка» — вписанная фраза');
  assert.ok(html.includes('часть обменов затрагивает верх или низ списка'),
    'фраза должна строиться из флага «верх и низ не двигались»');
  // На реальных данных верх и низ устойчивы — фраза честно стоит.
  assert.ok(renderPage(model).includes('все они — в середине списка'));
});

test('buildOutputs возвращает один файл, равный renderPage на диске', () => {
  const outputs = buildOutputs(ROOT);
  assert.equal(outputs.length, 1);
  assert.equal(outputs[0].file, OUTPUT);
  assert.equal(OUTPUT, 'indices-audit.html');
  assert.equal(SOURCE, 'docs/articles/indices-audit-app-source.md');
  assert.equal(SITE, 'https://cassindex.ru');
  // Байтовый паритет: страница не правится руками.
  assert.equal(page, renderPage(model));
  assert.equal(outputs[0].body, page);
});

test('CLI без --write печатает сводку и не пишет файл', () => {
  const file = path.join(ROOT, OUTPUT);
  const before = existsSync(file) ? readFileSync(file, 'utf8') : null;
  const stdout = execFileSync(process.execPath, [path.join(ROOT, 'indices-audit-build.js')], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  assert.match(stdout, /62 из 120/);
  assert.match(stdout, /медиана/i);
  assert.equal(existsSync(file) ? readFileSync(file, 'utf8') : null, before, 'CLI без --write не должен писать страницу');
});

test('HTML: head, один h1, 12 карточек, 120 ячеек, 62 ✔, 14 стран, 12 атрибутов', () => {
  assert.match(page, /^<!doctype html>\n<html lang="ru">/);
  assert.ok(page.includes('<link rel="canonical" href="https://cassindex.ru/indices-audit.html">'));
  assert.ok(page.includes('<body class="doc-page">'));
  assert.ok(page.includes('href="index.html"'));
  assert.equal((page.match(/<h1[\s>]/g) || []).length, 1, 'ровно один h1');

  // Head-конвенция статических страниц: CSP дословно, OG-пятёрка, без скриптов.
  const csp = page.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/);
  assert.ok(csp, 'нет meta-CSP');
  assert.equal(
    csp[1],
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; " +
      "font-src 'self'; base-uri 'self'; object-src 'none'",
  );
  for (const prop of ['og:type', 'og:title', 'og:description', 'og:url']) {
    assert.ok(page.includes(`property="${prop}"`), `нет ${prop}`);
  }
  assert.ok(!page.includes('\r'), 'CRLF запрещён');

  // Содержимое: карточки и развёртка.
  assert.equal((page.match(/<article\b/g) || []).length, 12, '12 карточек-статей');
  assert.equal((page.match(/id="cell-[a-z-]+-[a-z]+"/g) || []).length, 120, '120 строк развёртки');
  assert.equal((page.match(/<td>✔/g) || []).length, 62, '62 подтверждённые клетки');
  assert.equal((page.match(/id="country-[^"]+"/g) || []).length, 14, '14 строк стран');
  assert.equal((page.match(/id="attribute-[a-z-]+"/g) || []).length, 12, '12 строк атрибутов');

  // Якоря A01: проект, критерий, клетка.
  for (const id of PROJECT_IDS) {
    assert.ok(page.includes(`id="project-${id}"`), `нет якоря карточки ${id}`);
    assert.ok(page.includes(`id="scale-${id}"`), `нет якоря шкалы ${id}`);
  }
  assert.equal((page.match(/id="criterion-[a-z]+"/g) || []).length, 10, 'якорь на каждый критерий');

  // Таблицы — в скроллируемой обёртке и с подписью для скринридера.
  const tables = (page.match(/<table\b/g) || []).length;
  const wraps = (page.match(/<div class="article-table-wrap">/g) || []).length;
  const captions = (page.match(/<caption class="sr-only">/g) || []).length;
  assert.ok(tables > 0);
  assert.equal(wraps, tables, 'каждая таблица — в .article-table-wrap');
  assert.equal(captions, tables, 'каждая таблица — с caption.sr-only');

  // Запреты статических страниц (ADR 0052).
  assert.ok(!/<script/i.test(page), 'страница без скриптов');
  assert.ok(!/<img/i.test(page), 'страница без картинок');
  assert.ok(!/\bstyle\s*=\s*"/i.test(page), 'страница без инлайновых стилей');
  assert.ok(!page.includes('innerHTML'), 'генератор не собирает разметку через innerHTML');
});

test('текст страницы: запрещённая лексика и догадки о Украине', () => {
  for (const phrase of ['на грани', 'на пороге', 'вероятность войны', 'прогноз даты', 'нет практики']) {
    assert.ok(!page.toLowerCase().includes(phrase), `страница содержит «${phrase}»`);
  }
  // Про Украину допустима только страновая строка таблицы, не оценка сторон.
  assert.ok(!/войн[а-я]*\s+(?:в|на)\s+Украин/i.test(page), 'оценка войны в Украине');
  assert.ok(!/вторжени[а-я]*\s+в\s+Украин/i.test(page), 'оценка вторжения в Украину');
});

test('числа раздела «Пять из двенадцати» выводятся из матрицы, а не вписаны', () => {
  // Снимаем подтверждение ACLED по С: проверяемых становится 4, остальных — 8.
  const mutated = {
    ...model,
    projects: model.projects.map((project) => (project.id === 'acled'
      ? { ...project, matrix: { ...project.matrix, С: false }, basis: { ...project.basis, С: '— проверки нет' } }
      : project)),
  };
  const html = renderPage(mutated);
  assert.ok(html.includes('сжимает это до «4 и 8»'), 'раздел должен называть числа, посчитанные из матрицы');
  assert.ok(!html.includes('«5 и 7»'), 'вписанное «5 и 7» не должно переживать изменение матрицы');
});

test('ссылка на legalcode: хвостовая пунктуация не попадает в href', () => {
  const variants = [
    model.license,
    `Условия: https://creativecommons.org/licenses/by/4.0/legalcode, далее текст.`,
    `Условия (https://creativecommons.org/licenses/by/4.0/legalcode).`,
  ];
  for (const license of variants) {
    const html = renderPage({ ...model, license });
    assert.ok(!/href="https:\/\/creativecommons\.org\/licenses\/by\/4\.0\/legalcode[.,;:!?]/.test(html),
      `href с хвостовой пунктуацией: ${license}`);
  }
});

test('выкат: страница в cp-строке deploy.yml', () => {
  const deploy = read('.github/workflows/deploy.yml');
  const stage = deploy.slice(deploy.indexOf('Stage site files'), deploy.indexOf('Upload Pages artifact'));
  assert.ok(stage.includes(OUTPUT), `${OUTPUT} должен быть в cp-строке шага «Stage site files»`);
});

test('seo-пин: indices-audit.html добавлен в PAGES явного списка', () => {
  const seo = read('tests/seo-pages.test.js');
  assert.ok(/PAGES\s*=\s*\[[\s\S]*?['"]indices-audit\.html['"][\s\S]*?\]/.test(seo),
    'tests/seo-pages.test.js: добавь indices-audit.html в PAGES');
});

test('sitemap.xml: новая страница в карте сайта', () => {
  const sitemap = read('sitemap.xml');
  assert.ok(sitemap.includes('<loc>https://cassindex.ru/indices-audit.html</loc>'),
    'sitemap.xml перегенерируй: node blog-build.js --write');
  // Обратная сверка не в тесте site-pages: здесь — только присутствие.
  const rootPages = readdirSync(ROOT)
    .filter((name) => name.endsWith('.html') && name !== 'articles.html' && name !== 'cassandra-index-prototype.html');
  for (const name of rootPages) {
    if (name === 'index.html') continue; // главная в карте — корень «/»
    assert.ok(sitemap.includes(`https://cassindex.ru/${name}`), `sitemap.xml: нет ${name}`);
  }
});
