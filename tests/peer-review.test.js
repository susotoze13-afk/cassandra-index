// Внешнее рецензирование (клетка «Р») — сторож честности, а не балл за намерение.
// Правило аудита: «Р» = метод или результаты прошли независимую научную либо
// редакционную проверку вне организации. Клетка открывается ТОЛЬКО записью в
// docs/peer-review/records/ (формат — docs/peer-review/evidence.md), и в обе
// стороны: запись без ✔ в матрице — ошибка, ✔ без записи — тоже.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import {
  ROOT,
  SOURCE,
  parseSource,
  validateSource,
  weightedRows,
  PROJECT_IDS,
} from '../indices-audit-build.js';

const DIR = 'docs/peer-review';
const RECORDS = path.join(DIR, 'records');
const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const source = read(SOURCE);
const model = parseSource(source);

const DECISIONS = ['accepted', 'accepted-with-revisions', 'rejected', 'in-review'];
const SCOPES = ['method', 'results', 'software'];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function recordFiles() {
  const abs = path.join(ROOT, RECORDS);
  if (!existsSync(abs)) return [];
  return readdirSync(abs)
    .filter((name) => name.endsWith('.json'))
    .sort();
}

function loadRecord(name) {
  return JSON.parse(readFileSync(path.join(ROOT, RECORDS, name), 'utf8'));
}

// Клетку открывает только внешнее решение «принято» (в том числе после доработки).
function opensCell(record) {
  return record.external === true
    && (record.decision === 'accepted' || record.decision === 'accepted-with-revisions');
}

const cassandra = () => model.projects.find((project) => project.id === 'cassandra');

test('пакет подготовки на месте: план, площадки, рукопись, протокол доказательства', () => {
  for (const file of [
    'README.md',
    'plan.md',
    'venues.md',
    'manuscript.md',
    'cover-letter.md',
    'evidence.md',
    'joss-checklist.md',
    'release.md',
    'polis-plan.md',
    'coding/README.md',
    'literature.md',
    'records/README.md',
  ]) {
    assert.ok(existsSync(path.join(ROOT, DIR, file)), `${DIR}/${file} отсутствует`);
  }
  // JOSS читает статью и библиографию из репозитория с ПО — они обязаны быть в корне.
  const paper = read('paper.md');
  assert.match(paper, /^---\ntitle:/, 'paper.md: нет frontmatter');
  assert.match(paper, /bibliography:\s*paper\.bib/, 'paper.md: не указана библиография');
  assert.match(paper, /# Statement of need/, 'paper.md: нет раздела Statement of need');
  assert.match(paper, /# AI usage disclosure/, 'paper.md: нет раскрытия использования ИИ');
  assert.ok(existsSync(path.join(ROOT, 'paper.bib')), 'paper.bib отсутствует в корне');
});

test('план честно называет то, чего агент сделать не может', () => {
  const plan = read(`${DIR}/plan.md`);
  assert.match(plan, /Чего агент сделать не может/);
  assert.match(plan, /второ[го|й] кодировщик/i);
  assert.match(plan, /решение внешнего органа/i);
});

test('записи рецензирования: схема, внешность, даты, решения', () => {
  assert.deepEqual(validateSource(model), [], 'источник аудита должен разбираться без ошибок');
  for (const name of recordFiles()) {
    const record = loadRecord(name);
    for (const field of ['venue', 'kind', 'scope', 'submitted', 'decision', 'decided', 'external', 'summary']) {
      assert.ok(Object.hasOwn(record, field), `${name}: нет поля ${field}`);
    }
    assert.equal(record.external, true, `${name}: external должен быть true`);
    assert.ok(DECISIONS.includes(record.decision), `${name}: решение «${record.decision}» вне списка`);
    assert.ok(SCOPES.includes(record.scope), `${name}: scope «${record.scope}» вне списка`);
    assert.match(record.submitted, ISO_DATE, `${name}: дата подачи`);
    assert.match(record.decided, ISO_DATE, `${name}: дата решения`);
    assert.ok(Number.isFinite(Date.parse(record.submitted)), `${name}: дата подачи не парсится`);
    assert.ok(Number.isFinite(Date.parse(record.decided)), `${name}: дата решения не парсится`);
    assert.ok(String(record.summary).trim().length >= 20, `${name}: summary короче 20 символов`);
    for (const report of record.reports ?? []) {
      assert.ok(existsSync(path.join(ROOT, report)), `${name}: нет файла отчёта ${report}`);
    }
  }
});

test('клетка «Р» совпадает с записями в обе стороны', () => {
  const records = recordFiles().map(loadRecord);
  const shouldBeOpen = records.some(opensCell);
  assert.equal(
    cassandra().matrix['Р'],
    shouldBeOpen,
    shouldBeOpen
      ? 'есть принятое внешнее решение — клетка «Р» обязана быть открыта в источнике аудита'
      : 'записей о внешнем рецензировании нет — клетка «Р» обязана оставаться минусом',
  );
});

test('обзор только ПО не выдаётся за проверку метода: основание это говорит', () => {
  const softwareOnly = recordFiles()
    .map(loadRecord)
    .filter((record) => opensCell(record) && record.scope === 'software' && record.kind !== 'peer-review');
  if (softwareOnly.length === 0) return; // проверять нечего: содержательного обзора ПО нет
  const basis = cassandra().basis['Р'];
  assert.match(basis, /ПО|программн/i, 'основание клетки обязано назвать обзор ПО');
  assert.match(basis, /не метод|не проверяет метод|конструкт/i,
    'основание обязано сказать, что проверено ПО, а не метод');
});

test('пока записей нет, публичные тексты говорят «рецензирования нет»', () => {
  if (recordFiles().length > 0) return;
  assert.equal(cassandra().matrix['Р'], false, 'клетка «Р» не может быть открыта без записи');
  assert.match(cassandra().basis['Р'], /внешнего рецензирования нет/i,
    'основание минуса должно прямо говорить об отсутствии рецензирования');
  assert.match(read(`${DIR}/README.md`), /НЕ открыта/,
    'README пакета обязан фиксировать текущий статус клетки');
  assert.match(read(`${DIR}/manuscript.md`), /Внешнего рецензирования[^.]*нет/i,
    'рукопись обязана раскрывать отсутствие рецензирования');
});

test('путь к 3–4 месту: открытие «Р» даёт 85 баллов и 3-е место', () => {
  const opened = {
    ...model,
    projects: model.projects.map((project) => (project.id === 'cassandra'
      ? { ...project, matrix: { ...project.matrix, 'Р': true } }
      : project)),
  };
  const rows = weightedRows(opened);
  assert.equal(rows.find((row) => row.id === 'cassandra').total, 85, 'ожидается 70 + 15 = 85');

  const order = [...rows].sort((a, b) => b.score - a.score || PROJECT_IDS.indexOf(a.id) - PROJECT_IDS.indexOf(b.id));
  const place = order.findIndex((row) => row.id === 'cassandra') + 1;
  assert.equal(place, 3, 'при открытой клетке «Р» Cassandra поднимается на 3-е место');
  assert.ok(cassandra().matrix['Р'] === false, 'реальная матрица не должна быть изменена тестом');
});
