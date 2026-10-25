// Генератор страницы indices-audit.html — приложения к статье «12 индексов
// риска: 5 можно перепроверить, 7 приходится верить».
//
// По образцу blog-build.js: только stdlib, никаких зависимостей, детерминированный
// вывод. Единственный вход — docs/articles/indices-audit-app-source.md; все числа
// страницы (итог, медиана, баллы, «5 из 12», полный цикл, обмены мест при ±5 п.п.)
// считаются из матрицы источника, а не вписаны в текст.
//
// CLI: node indices-audit-build.js            — печать сводки, файл не трогается
//      node indices-audit-build.js --write    — запись indices-audit.html
//      node indices-audit-build.js --root <d> — другой корень (тесты/перенос)
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.dirname(fileURLToPath(import.meta.url));
export const SOURCE = 'docs/articles/indices-audit-app-source.md';
export const OUTPUT = 'indices-audit.html';
export const SITE = 'https://cassindex.ru';

// Веса взвешенной шкалы: сумма 100.
export const WEIGHTS = { open: 25, repr: 25, cov: 20, hist: 15, indep: 15 };

// Риск публикации: continuous/day/week = 1, month = 0.75, year/half-year = 0.5,
// dashboard = 0 (ритм не объявлен). Ключи — значения колонки «Частота» источника.
export const FREQUENCY = {
  continuous: 1,
  day: 1,
  week: 1,
  month: 0.75,
  year: 0.5,
  halfyear: 0.5,
  dashboard: 0,
};

// Порядок колонок матрицы и развёртки.
export const CRITERIA = ['Д', 'Ф', 'С', 'Г', 'Н', 'В', 'Л', 'И', 'Ст', 'Р'];

// Слаги для якорей (#criterion-d, #cell-cassandra-st).
const CRITERIA_SLUGS = {
  Д: 'd', Ф: 'f', С: 's', Г: 'g', Н: 'n', В: 'v', Л: 'l', И: 'i', Ст: 'st', Р: 'r',
};

// 12 проектов в порядке статьи; порядок карточек источника задаёт слаг.
export const PROJECT_IDS = [
  'cassandra', 'acled', 'ucdp', 'gdelt', 'crisiswatch', 'warmonitor',
  'gpr', 'inform', 'gpi', 'fsi', 'ewp', 'bgri',
];

const PROJECT_LABELS = {
  open: 'Открытость',
  repr: 'Воспроизводимость',
  cov: 'Покрытие',
  hist: 'История',
  indep: 'Независимость',
};

// Блоки признаков для таблицы «Итог». Пары соседних по смыслу критериев:
// сумма подтверждений по блокам равна итогу матрицы.
const BLOCKS = [
  { key: 'data', label: 'Данные и лицензия', codes: ['Д', 'Л'] },
  { key: 'method', label: 'Метод и прослеживаемость', codes: ['Ф', 'С'] },
  { key: 'limits', label: 'Границы и неопределённость', codes: ['Г', 'Н'] },
  { key: 'upkeep', label: 'Версии и история', codes: ['В', 'И'] },
  { key: 'reach', label: 'Охват и проверка', codes: ['Ст', 'Р'] },
];

const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

const PAGE_TITLE = 'Аудит 12 индексов риска: приложение к статье — Cassandra Index';
const PAGE_DESCRIPTION = 'Матрица 12 индексов риска по 10 признакам проверяемости: развёртка всех 120 ячеек с основанием, взвешенная шкала, устойчивость к весам и покрытие 14 стран.';
const STATIC_CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; " +
  "font-src 'self'; base-uri 'self'; object-src 'none'";

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------- Разбор markdown-источника ----------

function fail(message) {
  throw new Error(`Источник ${SOURCE}: ${message}`);
}

function splitRow(line) {
  const inner = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return inner.split('|').map((cell) => cell.trim());
}

function isSeparator(row) {
  // Источник использует и `---`, и короткое `:-:`; обе формы — разделитель.
  return row.every((cell) => /^:?-+:?$/.test(cell));
}

function sectionsOf(markdown) {
  const sections = new Map();
  let current = null;
  for (const line of markdown.split('\n')) {
    const heading = /^##\s+(.+?)\s*$/.exec(line);
    if (heading) {
      current = { title: heading[1].trim(), lines: [] };
      sections.set(current.title, current);
      continue;
    }
    if (current) current.lines.push(line);
  }
  return sections;
}

function sectionOf(sections, title) {
  const section = sections.get(title);
  if (!section) fail(`не найден раздел «${title}»`);
  return section;
}

function tableOf(section, expectedHeader) {
  const rows = [];
  let started = false;
  for (const line of section.lines) {
    if (!line.trim().startsWith('|')) {
      if (started) break;
      continue;
    }
    started = true;
    rows.push(splitRow(line));
  }
  if (rows.length === 0) fail(`в разделе «${section.title}» нет таблицы`);

  const [header, ...body] = rows;
  const sameShape = header.length === expectedHeader.length
    && header.every((cell, index) => cell === expectedHeader[index]);
  if (!sameShape) {
    fail(`раздел «${section.title}»: ожидается шапка «${expectedHeader.join(' | ')}», получено «${header.join(' | ')}»`);
  }
  const data = body.filter((row) => !isSeparator(row));
  for (const row of data) {
    if (row.length !== expectedHeader.length) {
      fail(`раздел «${section.title}»: строка «${row.join(' | ')}» — ${row.length} клеток вместо ${expectedHeader.length}`);
    }
  }
  return data;
}

function bulletsOf(lines) {
  const fields = new Map();
  let key = null;
  let buffer = [];
  const flush = () => {
    if (key !== null) fields.set(key, buffer.join(' ').trim());
    key = null;
    buffer = [];
  };
  for (const raw of lines) {
    const line = raw.trim();
    const bullet = /^-\s+\*\*(.+?):\*\*\s*(.*)$/.exec(line);
    if (bullet) {
      flush();
      key = bullet[1].trim();
      buffer = [bullet[2]];
      continue;
    }
    if (key !== null && line !== '') buffer.push(line);
  }
  flush();
  return fields;
}

function projectBlocks(section) {
  const blocks = [];
  let current = null;
  for (const line of section.lines) {
    const heading = /^###\s+(.+?)\s*$/.exec(line);
    if (heading) {
      current = { name: heading[1].trim(), lines: [] };
      blocks.push(current);
      continue;
    }
    if (current) current.lines.push(line);
  }
  if (blocks.length === 0) fail('в разделе «Проекты» нет карточек «### Название»');
  return blocks;
}

function parseSourceField(raw) {
  const links = [...raw.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)]
    .map((match) => ({ text: match[1].trim(), url: match[2].trim() }));
  const checked = /проверено\s+(\d{4}-\d{2}-\d{2})/.exec(raw);
  const note = checked
    ? raw.slice(checked.index + checked[0].length).replace(/^[\s,;—–-]+/, '').trim()
    : '';
  return {
    links,
    checked: checked ? checked[1] : null,
    note,
  };
}

function countryCell(raw) {
  if (raw === 'страна' || raw === 'регион' || raw === 'нет') return { kind: raw, note: '' };
  const blocked = /^заблокировано:\s*(.+)$/.exec(raw);
  if (blocked) return { kind: 'blocked', note: blocked[1].trim() };
  const unverified = /^не проверено:\s*(.+)$/.exec(raw);
  if (unverified) return { kind: 'unverified', note: unverified[1].trim() };
  fail(`раздел «Страны»: неизвестное значение клетки «${raw}»`);
}

export function parseSource(markdown, { projectIds = PROJECT_IDS } = {}) {
  const sourceDate = /\*\*Дата среза:\*\*\s*(\d{4}-\d{2}-\d{2})/.exec(markdown);
  if (!sourceDate) fail('в шапке нет строки «**Дата среза:** YYYY-MM-DD»');

  const sections = sectionsOf(markdown);

  const criteria = tableOf(
    sectionOf(sections, 'Критерии'),
    ['Код', 'Признак', 'Что считается подтверждением'],
  ).map(([code, label, meaning]) => ({ code, label, meaning }));

  const blocks = projectBlocks(sectionOf(sections, 'Проекты'));
  if (blocks.length !== projectIds.length) {
    fail(`в разделе «Проекты» ${blocks.length} карточек вместо ${projectIds.length}`);
  }
  const projects = blocks.map((block, index) => {
    const fields = bulletsOf(block.lines);
    for (const required of ['Конструкт', 'Подтверждено', 'Не подтверждено', 'Источник']) {
      if (!fields.has(required)) fail(`карточка «${block.name}»: нет поля «${required}»`);
    }
    return {
      id: projectIds[index],
      name: block.name,
      construct: fields.get('Конструкт'),
      confirmed: fields.get('Подтверждено'),
      unconfirmed: fields.get('Не подтверждено'),
      source: parseSourceField(fields.get('Источник')),
      matrix: {},
      basis: {},
      frequency: null,
      attributes: null,
    };
  });
  const byName = new Map(projects.map((project) => [project.name, project]));

  const matrixHeader = ['Проект', ...CRITERIA];
  const seenMatrix = new Set();
  for (const [name, ...cells] of tableOf(sectionOf(sections, 'Матрица'), matrixHeader)) {
    const project = byName.get(name);
    if (!project) fail(`матрица: неизвестный проект «${name}»`);
    if (seenMatrix.has(name)) fail(`матрица, ${name}: строка повторяется`);
    seenMatrix.add(name);
    CRITERIA.forEach((code, index) => {
      const cell = cells[index];
      if (cell === '✔') project.matrix[code] = true;
      else if (cell === '—') project.matrix[code] = false;
      else fail(`матрица, ${name}/${code}: допустимы только «✔» и «—», получено «${cell}»`);
    });
  }

  for (const [name, code, basis] of tableOf(
    sectionOf(sections, 'Развёртка'),
    ['Проект', 'Критерий', 'Основание'],
  )) {
    const project = byName.get(name);
    if (!project) fail(`развёртка: неизвестный проект «${name}»`);
    if (!CRITERIA.includes(code)) fail(`развёртка, ${name}: неизвестный критерий «${code}»`);
    if (project.basis[code]) fail(`развёртка, ${name}/${code}: строка повторяется`);
    project.basis[code] = basis;
  }

  for (const [name, frequency] of tableOf(
    sectionOf(sections, 'Частота'),
    ['Проект', 'Частота', 'Источник'],
  ).map(([name, frequency]) => [name, frequency])) {
    const project = byName.get(name);
    if (!project) fail(`частота: неизвестный проект «${name}»`);
    if (project.frequency !== null) fail(`частота, ${name}: строка повторяется`);
    project.frequency = frequency;
  }

  const attributesHeader = ['Проект', 'Разрешение', 'С какого года', 'Лаг публикации', 'Где смотреть', 'Дата проверки'];
  for (const [name, resolution, since, lag, where, checked] of tableOf(
    sectionOf(sections, 'Атрибуты'),
    attributesHeader,
  )) {
    const project = byName.get(name);
    if (!project) fail(`атрибуты: неизвестный проект «${name}»`);
    if (project.attributes !== null) fail(`атрибуты, ${name}: строка повторяется`);
    project.attributes = { resolution, since, lag, where, checked };
  }

  const countrySection = sectionOf(sections, 'Страны');
  const countryChecked = /Дата проверки каждой клетки\s*[—–-]\s*(\d{4}-\d{2}-\d{2})/.exec(countrySection.lines.join('\n'));
  if (!countryChecked) fail('в разделе «Страны» нет строки «Дата проверки каждой клетки — YYYY-MM-DD»');
  const seenCountry = new Set();
  const countries = tableOf(countrySection, ['Страна', ...projectIds]).map(([name, ...cells]) => {
    if (seenCountry.has(name)) fail(`страны: строка «${name}» повторяется`);
    seenCountry.add(name);
    return {
      name,
      cells: cells.map(countryCell),
    };
  });

  const unverified = tableOf(
    sectionOf(sections, 'Не проверено'),
    ['Проект', 'Что проверяли', 'Адрес', 'Дата', 'Код или причина'],
  ).map(([project, what, address, date, reason]) => ({ project, what, address, date, reason }));

  const licenseSection = sectionOf(sections, 'Лицензия');
  const licenseText = licenseSection.lines
    .map((line) => line.trim())
    .filter((line) => line !== '' && !line.startsWith('|'))
    .join(' ');
  if (licenseText === '') fail('раздел «Лицензия» пуст');

  return {
    date: sourceDate[1],
    criteria,
    projects,
    countries: { checked: countryChecked[1], rows: countries },
    unverified,
    license: licenseText,
  };
}

function bit(project, code) {
  return project.matrix[code] ? 1 : 0;
}

function countIf(project, codes) {
  return codes.every((code) => project.matrix[code] === true);
}

// ---------- Проверка источника ----------

export function validateSource(model, { projectIds = PROJECT_IDS } = {}) {
  const errors = [];
  const push = (message) => errors.push(message);
  if (!model || typeof model !== 'object') return ['модель источника пуста'];

  if (!/^\d{4}-\d{2}-\d{2}$/.test(model.date ?? '')) push('дата среза не в формате YYYY-MM-DD');

  const criteria = Array.isArray(model.criteria) ? model.criteria : [];
  if (criteria.length !== CRITERIA.length) {
    push(`критериев ${criteria.length}, а должно быть ${CRITERIA.length}`);
  }
  criteria.forEach((criterion, index) => {
    if (criterion.code !== CRITERIA[index]) {
      push(`критерий №${index + 1}: код «${criterion.code}» вместо «${CRITERIA[index]}»`);
    }
    if (!criterion.label) push(`критерий ${criterion.code}: пустой признак`);
    if (!criterion.meaning) push(`критерий ${criterion.code}: пустое описание подтверждения`);
  });

  const projects = Array.isArray(model.projects) ? model.projects : [];
  if (projects.length !== projectIds.length) {
    push(`проектов ${projects.length}, а должно быть ${projectIds.length}`);
  }
  const seen = new Set();
  const seenNames = new Set();
  for (const [index, project] of projects.entries()) {
    const expected = projectIds[index];
    if (project.id !== expected) push(`проект №${index + 1}: слаг «${project.id}» вместо «${expected}»`);
    if (seen.has(project.id)) push(`проект ${project.id}: слаг повторяется`);
    seen.add(project.id);
    if (!project.name) push(`проект ${project.id}: пустое название`);
    if (seenNames.has(project.name)) push(`проект ${project.name}: название повторяется`);
    seenNames.add(project.name);
    for (const field of ['construct', 'confirmed', 'unconfirmed']) {
      if (!project[field]) push(`${project.id}: пустое поле «${field}»`);
    }
    if (!project.source || project.source.links.length === 0) push(`${project.id}: нет ссылки на источник`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(project.source?.checked ?? '')) {
      push(`${project.id}: у источника нет даты «проверено»`);
    }
    for (const code of CRITERIA) {
      const value = project.matrix?.[code];
      if (typeof value !== 'boolean') {
        push(`${project.id}/${code}: в матрице не «✔» и не «—»`);
        continue;
      }
      const basis = project.basis?.[code];
      if (!basis) {
        push(`${project.id}/${code}: нет основания в развёртке`);
        continue;
      }
      const negative = /^—/.test(basis);
      if (value && negative) {
        push(`${project.id}/${code}: клетка подтверждена, а основание начинается с «—»`);
      }
      if (!value && !negative) {
        push(`${project.id}/${code}: клетка пуста, а основание не называет причину с «—»`);
      }
    }
    if (!Object.hasOwn(FREQUENCY, project.frequency)) {
      push(`${project.id}: частота «${project.frequency}» вне словаря`);
    }
    for (const field of ['resolution', 'since', 'lag', 'where', 'checked']) {
      if (!project.attributes?.[field]) push(`${project.id}: в атрибутах пустое поле «${field}»`);
    }
  }

  const countryRows = model.countries?.rows ?? [];
  if (countryRows.length === 0) push('таблица стран пуста');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(model.countries?.checked ?? '')) {
    push('у таблицы стран нет даты проверки');
  }
  for (const row of countryRows) {
    if (!row.name) push('в таблице стран пустое название');
    if (row.cells.length !== projectIds.length) {
      push(`страна «${row.name}»: ${row.cells.length} клеток вместо ${projectIds.length}`);
    }
    for (const cell of row.cells) {
      if (!['страна', 'регион', 'нет', 'unverified', 'blocked'].includes(cell.kind)) {
        push(`страна «${row.name}»: неизвестный тип клетки «${cell.kind}»`);
      }
      if ((cell.kind === 'unverified' || cell.kind === 'blocked') && !/\d{4}-\d{2}-\d{2}/.test(cell.note)) {
        push(`страна «${row.name}»: у «${cell.kind === 'blocked' ? 'заблокировано' : 'не проверено'}» нет причины с датой`);
      }
    }
  }

  if ((model.unverified?.length ?? 0) === 0) push('таблица «Не проверено» пуста');
  for (const row of model.unverified ?? []) {
    for (const field of ['project', 'what', 'address', 'date', 'reason']) {
      if (!row[field]) push(`«Не проверено»: пустое поле «${field}»`);
    }
  }

  const license = model.license ?? '';
  for (const required of ['CC BY 4.0', 'creativecommons.org/licenses/by/4.0', 'Cassandra Index']) {
    if (!license.includes(required)) push(`лицензия: нет «${required}»`);
  }

  return errors;
}

// ---------- Числа из матрицы ----------

export function weightedRows(model) {
  return model.projects.map((project) => {
    const parts = {
      open: (bit(project, 'Д') + bit(project, 'Л')) / 2,
      repr: (bit(project, 'Ф') + bit(project, 'С')) / 2,
      cov: 0.6 * bit(project, 'Ст') + 0.4 * (FREQUENCY[project.frequency] ?? 0),
      hist: bit(project, 'И'),
      indep: bit(project, 'Р'),
    };
    const score = WEIGHTS.open * parts.open
      + WEIGHTS.repr * parts.repr
      + WEIGHTS.cov * parts.cov
      + WEIGHTS.hist * parts.hist
      + WEIGHTS.indep * parts.indep;
    return {
      id: project.id,
      name: project.name,
      parts,
      frequency: project.frequency,
      score,
      total: Math.round(score),
    };
  });
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length === 0) return 0;
  if (sorted.length % 2 === 1) return sorted[middle];
  return (sorted[middle - 1] + sorted[middle]) / 2;
}

export function matrixStats(model) {
  const counts = model.projects.map((project) => CRITERIA.filter((code) => project.matrix[code]).length);
  const confirmedBy = (code) => model.projects.filter((project) => project.matrix[code]).length;

  return {
    total: counts.reduce((sum, value) => sum + value, 0),
    possible: model.projects.length * CRITERIA.length,
    median: median(counts),
    perCriterion: CRITERIA.map((code) => ({
      code,
      label: model.criteria.find((criterion) => criterion.code === code)?.label ?? '',
      confirmed: confirmedBy(code),
      possible: model.projects.length,
    })),
    byBlock: BLOCKS.map((block) => ({
      key: block.key,
      label: block.label,
      codes: block.codes,
      confirmed: block.codes.reduce((sum, code) => sum + confirmedBy(code), 0),
      possible: block.codes.length * model.projects.length,
    })),
    fullCycle: model.projects.filter((project) => countIf(project, ['Д', 'Ф', 'С', 'Г', 'Н'])).length,
    verifiable: model.projects.filter((project) => countIf(project, ['Д', 'Ф', 'С'])).length,
  };
}

function orderOf(scores, projectIds = PROJECT_IDS) {
  return [...scores]
    .sort((a, b) => b.score - a.score || projectIds.indexOf(a.id) - projectIds.indexOf(b.id))
    .map((row) => row.id);
}

// Перестановка мест — это циклы: при повороте троих честнее «A: 1 → 3; C: 3 → 2;
// B: 2 → 1» (цепочка), чем три независимых «было → стало», читающихся как обмены
// пар. Раскладываем смещённые позиции на циклы и выдаём каждый цикл в порядке
// цепочки: пункт назначения одного — пункт отправления следующего.
export function moveCycles(baseline, order) {
  const moves = order
    .map((id, index) => ({ id, from: baseline.indexOf(id) + 1, to: index + 1 }))
    .filter((move) => move.from !== move.to);
  const byFrom = new Map(moves.map((move) => [move.from, move]));
  const seen = new Set();
  const cycles = [];
  for (const start of [...moves].sort((a, b) => a.from - b.from)) {
    if (seen.has(start.id)) continue;
    const chain = [];
    let move = start;
    while (move && !seen.has(move.id)) {
      seen.add(move.id);
      chain.push(move);
      move = byFrom.get(move.to);
    }
    cycles.push(chain);
  }
  return cycles;
}

export function sensitivityRows(model) {
  const baseline = orderOf(weightedRows(model));
  const rows = [];
  for (const key of Object.keys(WEIGHTS)) {
    for (const delta of [5, -5]) {
      const weights = { ...WEIGHTS };
      const factor = (100 - WEIGHTS[key] - delta) / (100 - WEIGHTS[key]);
      for (const other of Object.keys(weights)) {
        if (other !== key) weights[other] *= factor;
      }
      weights[key] += delta;

      const scores = weightedRows(model).map((row) => ({
        id: row.id,
        score: Object.keys(weights).reduce((sum, part) => sum + weights[part] * row.parts[part], 0),
      }));
      const order = orderOf(scores);
      const swaps = [];
      const seen = new Set();
      order.forEach((id, index) => {
        if (id === baseline[index]) return;
        const pair = [baseline[index], id].sort();
        const signature = pair.join('|');
        if (seen.has(signature)) return;
        seen.add(signature);
        swaps.push(pair);
      });
      rows.push({ key, delta, order, swaps });
    }
  }
  return rows;
}

// ---------- Рендер страницы ----------

function formatDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS_GENITIVE[month - 1]} ${year}`;
}

function formatDecimal(value) {
  return value.toFixed(2).replace('.', ',');
}

function formatRatio(value) {
  return String(value).replace('.', ',');
}

function inline(text) {
  return escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>');
}

// Голые URL в прозе (лицензия): ссылка + <wbr> после каждого «/», иначе один
// длинный токен вылезает за 320 px — обёртки таблиц здесь нет.
function paragraphWithLinks(text) {
  return escapeHtml(text).replace(/https?:\/\/[^\s<]+/g, (rawUrl) => {
    const url = trimUrlTail(rawUrl);
    const tail = rawUrl.slice(url.length);
    return `<a href="${url}">${url.replace(/\//g, '/<wbr>')}</a>${tail}`;
  });
}

// Адрес в прозе может стоять перед точкой, запятой или закрывающей скобкой:
// хвостовая пунктуация не входит ни в href, ни в текст ссылки. Закрывающую
// скобку режем, только если она непарная: «(bar)» в конце настоящего URL
// (https://example.com/foo_(bar)) — часть адреса, а не пунктуация.
function trimUrlTail(rawUrl) {
  const count = (text, ch) => text.split(ch).length - 1;
  let url = rawUrl;
  for (;;) {
    const last = url[url.length - 1] ?? '';
    if ('.,;:!?»'.includes(last)) {
      url = url.slice(0, -1);
    } else if (last === ')' && count(url, ')') > count(url, '(')) {
      url = url.slice(0, -1);
    } else if (last === ']' && count(url, ']') > count(url, '[')) {
      url = url.slice(0, -1);
    } else {
      return url;
    }
  }
}

function link(href, text) {
  return `<a href="${escapeHtml(href)}">${escapeHtml(text)}</a>`;
}

function cellText(project, code) {
  return project.matrix[code]
    ? '✔<span class="sr-only"> подтверждено</span>'
    : '—<span class="sr-only"> не подтверждено</span>';
}

function renderHead() {
  return [
    '<!doctype html>',
    '<html lang="ru">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <meta name="referrer" content="strict-origin-when-cross-origin">',
    '  <!-- CSP через meta: GitHub Pages не даёт заголовков. Страница статическая —',
    '       без скриптов, без внешних ресурсов и без JSON-LD. -->',
    `  <meta http-equiv="Content-Security-Policy" content="${STATIC_CSP}">`,
    `  <title>${escapeHtml(PAGE_TITLE)}</title>`,
    `  <meta name="description" content="${escapeHtml(PAGE_DESCRIPTION)}">`,
    `  <link rel="canonical" href="${SITE}/${OUTPUT}">`,
    '  <meta property="og:type" content="article">',
    '  <meta property="og:site_name" content="Cassandra Index">',
    `  <meta property="og:title" content="${escapeHtml(PAGE_TITLE)}">`,
    `  <meta property="og:description" content="${escapeHtml(PAGE_DESCRIPTION)}">`,
    `  <meta property="og:url" content="${SITE}/${OUTPUT}">`,
    '  <meta property="og:locale" content="ru_RU">',
    '  <meta name="robots" content="index,follow,max-image-preview:large">',
    '  <link rel="icon" type="image/svg+xml" href="icon.svg">',
    '  <link rel="stylesheet" href="css/styles.css">',
    '</head>',
    '<body class="doc-page">',
    '',
    '  <header class="site-header">',
    '    <div class="header-inner">',
    '      <a class="brand" href="index.html">Cassandra Index</a>',
    '      <nav class="site-nav" aria-label="Навигация страницы">',
    '        <a href="index.html">На главную</a>',
    '        <a href="how-to-read.html">Как читать индекс</a>',
    '        <a href="compare.html">Сравнение</a>',
    '      </nav>',
    '    </div>',
    '  </header>',
    '',
  ];
}

function renderFooter() {
  return [
    '',
    '  <footer class="site-footer">',
    '    <p class="disclaimer">Cassandra Index — экспериментальная оценка риска на основе открытых данных. Это не официальный прогноз правительства или международной организации. Оценка может быть ошибочной.</p>',
    '    <nav class="footer-nav" aria-label="Сервисные ссылки">',
    '      <a href="index.html">На главную</a>',
    '      <a href="how-to-read.html">Как читать индекс</a>',
    '      <a href="compare.html">Сравнение</a>',
    '      <a href="privacy.html">Приватность</a>',
    '      <a href="about.html">Независимость и исправления</a>',
    '    </nav>',
    '  </footer>',
    '',
    '</body>',
    '</html>',
    '',
  ];
}

// colgroup нужен ради 320 px: table-layout: fixed делит ширину поровну, и
// текстовые колонки начинают рваться по буквам. Ширины — доля от 100 %.
function renderTable(caption, headCells, rows, { widths = null } = {}) {
  const head = headCells.map((cell) => `<th scope="col">${cell}</th>`).join('');
  return [
    '      <div class="article-table-wrap">',
    '        <table class="doc-table">',
    `          <caption class="sr-only">${escapeHtml(caption)}</caption>`,
    ...(widths ? [`          <colgroup>${widths.map((width) => `<col width="${width}">`).join('')}</colgroup>`] : []),
    `          <thead><tr>${head}</tr></thead>`,
    '          <tbody>',
    ...rows.map((row) => `            ${row}`),
    '          </tbody>',
    '        </table>',
    '      </div>',
  ];
}

function section(id, title, lines) {
  return [
    `    <section id="${id}" aria-labelledby="${id}-title">`,
    `      <h2 id="${id}-title">${escapeHtml(title)}</h2>`,
    ...lines,
    '    </section>',
    '',
  ];
}

export function renderPage(model) {
  const rows = weightedRows(model);
  const stats = matrixStats(model);
  const sensitivity = sensitivityRows(model);
  const sorted = [...rows].sort((a, b) => b.score - a.score || PROJECT_IDS.indexOf(a.id) - PROJECT_IDS.indexOf(b.id));
  const byId = new Map(model.projects.map((project) => [project.id, project]));
  const nameOf = (id) => byId.get(id)?.name ?? id;

  const verifiable = model.projects.filter((project) => countIf(project, ['Д', 'Ф', 'С']));
  const recomputable = model.projects.filter((project) => countIf(project, ['Д', 'Ф']) && !project.matrix['С']);
  const trustOnly = model.projects.filter((project) => !(countIf(project, ['Д', 'Ф'])));
  const fullCycle = model.projects.filter((project) => countIf(project, ['Д', 'Ф', 'С', 'Г', 'Н']));

  const baseline = orderOf(rows);
  const topStable = sensitivity.every((row) => row.order[0] === baseline[0]);
  const bottomStable = sensitivity.every((row) => row.order.slice(-2).join('|') === baseline.slice(-2).join('|'));
  const swapCount = sensitivity.reduce((sum, row) => sum + row.swaps.length, 0);

  const date = formatDate(model.date);
  const criteriaLabel = (code) => model.criteria.find((criterion) => criterion.code === code)?.label ?? '';

  const toc = [
    ['what', 'Что это'],
    ['criteria', 'Критерии'],
    ['matrix', 'Матрица'],
    ['result', 'Итог'],
    ['five', 'Кого можно перепроверить'],
    ['cards', 'Карточки'],
    ['cells', 'Развёртка 120 ячеек'],
    ['scale', 'Взвешенная шкала'],
    ['sensitivity', 'Устойчивость ±5 п.п.'],
    ['countries', 'Страны'],
    ['unverified', 'Что не удалось проверить'],
    ['reuse', 'Переиспользование'],
  ];

  const lines = [
    ...renderHead(),
    '  <main id="main">',
    '    <h1>Аудит 12 индексов риска: приложение к статье</h1>',
    '    <p class="doc-lede">Приложение к разбору «12 индексов риска: 5 можно перепроверить, 7 приходится верить». Здесь видна каждая из 120 ячеек: чем она подтверждена или почему пуста, как из матрицы получился балл проекта и что известно про 14 стран.</p>',
    `    <p class="doc-meta">Дата среза: ${date}. Правило: если число этой страницы и число статьи разошлись, правится приложение, а не статья.</p>`,
    `    <p class="doc-meta">Все числа ниже посчитаны из матрицы генератором <code>indices-audit-build.js</code>; в источнике страницы этих чисел нет.</p>`,
    '    <div class="doc-note">',
    '      <p><strong>Это не рейтинг.</strong> Ячейки неравны по весу, и профиль проекта информативнее суммы. «—» значит «не подтверждено публичным документом», а не «отсутствует»: аудит проверяет документацию проекта, а не его поведение и не верность его числа.</p>',
    '    </div>',
    '    <nav aria-label="Оглавление">',
    '      <h2>Оглавление</h2>',
    '      <ul class="doc-links">',
    ...toc.map(([id, title]) => `        <li><a href="#${id}">${escapeHtml(title)}</a></li>`),
    '      </ul>',
    '    </nav>',
    '',
  ];

  lines.push(...section('what', 'Что это', [
    '      <p>Аудит сравнивает 12 публичных индексов и баз риска по десяти бинарным признакам проверяемости: можно ли скачать данные, опубликованы ли формула и веса, назван ли источник у отдельной записи, опубликованы ли границы применимости и оценка неопределённости, есть ли версии и история, свободная ли лицензия, длиннее ли пяти лет ряд, есть ли страновой уровень и проходил ли метод внешнюю проверку.</p>',
    '      <p>Признак считается подтверждённым только публичным документом по ссылке из карточки проекта. Спорная клетка кодируется минусом. Аудит фиксирует, что опубликовано, а не насколько проект хорош.</p>',
    `      <p>Cassandra Index кодирован теми же правилами, что и остальные проекты: это самоаудит, конфликт интересов раскрыт в статье. Каждая из ${stats.possible} пар «проект × критерий» разобрана ${date}; проверок, которые не удалось довести до конца: ${model.unverified.length} — их адреса, даты и коды ответов в разделе «Что не удалось проверить».</p>`,
  ]));

  lines.push(...section('criteria', 'Критерии', [
    ...renderTable(
      'Десять признаков проверяемости и что считается подтверждением',
      ['Код', 'Признак', 'Что считается подтверждением'],
      model.criteria.map((criterion) => (
        `<tr id="criterion-${CRITERIA_SLUGS[criterion.code]}"><th scope="row">${escapeHtml(criterion.code)}</th><td>${inline(criterion.label)}</td><td>${inline(criterion.meaning)}</td></tr>`
      )),
      { widths: ['7%', '36%', '57%'] },
    ),
  ]));

  const matrixRows = model.projects.map((project) => {
    const cells = CRITERIA.map((code) => `<td>${cellText(project, code)}</td>`).join('');
    return `<tr id="matrix-${project.id}"><th scope="row"><a href="#project-${project.id}">${escapeHtml(project.name)}</a></th>${cells}</tr>`;
  });
  lines.push(...section('matrix', 'Матрица', [
    '      <p>Строки — 12 проектов в порядке статьи, колонки — 10 признаков. «✔» значит «подтверждено публичным документом», «—» — «не подтверждено публичным документом», а не «отсутствует». Колонки «Балл» и итога в шапке нет: это не рейтинг.</p>',
    ...renderTable(
      'Матрица подтверждения десяти признаков по двенадцати проектам',
      ['Проект', ...CRITERIA.map((code) => `<abbr title="${escapeHtml(criteriaLabel(code))}">${escapeHtml(code)}</abbr>`)],
      matrixRows,
      { widths: ['26%', ...Array(CRITERIA.length).fill('7.4%')] },
    ),
    '      <p class="doc-meta">Описание каждого признака — в разделе «Критерии»; основание каждой клетки — в «Развёртке 120 ячеек».</p>',
  ]));

  lines.push(...section('result', 'Итог', [
    '      <div class="doc-keyfigures">',
    '        <div class="doc-figure">',
    '          <span class="doc-figure-label">Подтверждено ячеек</span>',
    `          <strong class="doc-figure-value">${stats.total} из ${stats.possible}</strong>`,
    `          <span class="doc-figure-note">${Math.round((stats.total / stats.possible) * 100)} % матрицы</span>`,
    '        </div>',
    '        <div class="doc-figure">',
    '          <span class="doc-figure-label">Медиана</span>',
    `          <strong class="doc-figure-value">${formatRatio(stats.median)}</strong>`,
    '          <span class="doc-figure-note">подтверждённых признаков на проект</span>',
    '        </div>',
    '        <div class="doc-figure">',
    '          <span class="doc-figure-label">Проверить до записи</span>',
    `          <strong class="doc-figure-value">${stats.verifiable} из ${model.projects.length}</strong>`,
    '          <span class="doc-figure-note">признаки Д + Ф + С одновременно</span>',
    '        </div>',
    '        <div class="doc-figure">',
    '          <span class="doc-figure-label">Полный цикл</span>',
    `          <strong class="doc-figure-value">${stats.fullCycle}</strong>`,
    '          <span class="doc-figure-note">проект с Д + Ф + С + Г + Н</span>',
    '        </div>',
    '      </div>',
    `      <p>Итог матрицы — <strong>${stats.total} из ${stats.possible}</strong> подтверждённых клеток, медиана — <strong>${formatRatio(stats.median)}</strong> признака на проект. Это не рейтинг: сумма отвечает на вопрос «сколько признаков проверяемости подтверждено документом», а не «какой проект лучше».</p>`,
    `      <p>Полный цикл Д + Ф + С + Г + Н — ${stats.fullCycle} из ${model.projects.length}: ${escapeHtml(fullCycle.map((project) => project.name).join(', '))}.</p>`,
    ...renderTable(
      'Подтверждённые клетки по блокам признаков',
      ['Блок', 'Признаки', 'Подтверждено', 'Всего'],
      stats.byBlock.map((block) => (
        `<tr><th scope="row">${escapeHtml(block.label)}</th><td>${escapeHtml(block.codes.join(' + '))}</td><td>${block.confirmed}</td><td>${block.possible}</td></tr>`
      )),
      { widths: ['32%', '20%', '24%', '24%'] },
    ),
  ]));

  lines.push(...section('five', 'Кого можно перепроверить', [
    '      <p>Правило зафиксировано до подсчёта: «проверить до записи» значит, что данные открыты (Д), формула или веса опубликованы (Ф) и у отдельной записи назван источник (С).</p>',
    '      <ul>',
    `        <li><strong>Проверить до записи — ${verifiable.length} из ${model.projects.length}:</strong> ${escapeHtml(verifiable.map((project) => project.name).join(', '))}.</li>`,
    `        <li><strong>Пересчитать, но не проверить — ${recomputable.length}:</strong> ${escapeHtml(recomputable.map((project) => project.name).join(', '))} — данные и формула есть, прослеживаемости у записи нет (Д + Ф без С).</li>`,
    `        <li><strong>Принять на веру — ${trustOnly.length}:</strong> ${escapeHtml(trustOnly.map((project) => project.name).join(', '))} — нет опубликованной формулы либо открытых данных.</li>`,
    '      </ul>',
    `      <p>Название статьи сжимает это до «${verifiable.length} и ${model.projects.length - verifiable.length}»; здесь развёрнутая формулировка. Числа раздела считаются из матрицы: при изменении любой клетки они меняются вместе с ней.</p>`,
  ]));

  const cards = model.projects.flatMap((project) => {
    const attributes = project.attributes ?? {};
    return [
      `      <article id="project-${project.id}">`,
      `        <h3>${escapeHtml(project.name)}</h3>`,
      `        <p><strong>Конструкт:</strong> ${inline(project.construct)}</p>`,
      `        <p><strong>Подтверждено:</strong> ${inline(project.confirmed)}</p>`,
      `        <p><strong>Не подтверждено:</strong> ${inline(project.unconfirmed)}</p>`,
      `        <p><strong>Источник:</strong> ${project.source.links.map((item) => link(item.url, item.text)).join(', ')} — проверено ${escapeHtml(project.source.checked ?? '')}${project.source.note ? `. ${inline(project.source.note)}` : ''}</p>`,
      `        <p class="doc-meta">Разрешение: ${inline(attributes.resolution ?? '')}. Дата среза: ${date}. «—» в матрице значит «не подтверждено публичным документом», а не «отсутствует».</p>`,
      `        <p class="doc-meta"><a href="#matrix-${project.id}">Строка в матрице</a> · <a href="#scale-${project.id}">Строка в шкале</a> · <a href="#cell-${project.id}-${CRITERIA_SLUGS['Д']}">Первая клетка развёртки</a></p>`,
      '      </article>',
    ];
  });
  lines.push(...section('cards', 'Карточки', [
    '      <p>Двенадцать карточек в порядке статьи: конструкт, что подтверждено, что нет, источник с датой проверки. Формулировки нейтральны — карточка фиксирует, что опубликовано.</p>',
    ...cards,
  ]));

  const cellRows = model.projects.flatMap((project) => CRITERIA.map((code) => (
    `<tr id="cell-${project.id}-${CRITERIA_SLUGS[code]}">`
    + `<td><a href="#project-${project.id}">${escapeHtml(project.name)}</a></td>`
    + `<td><a href="#criterion-${CRITERIA_SLUGS[code]}">${escapeHtml(code)} — ${escapeHtml(criteriaLabel(code))}</a></td>`
    + `<td>${inline(project.basis[code] ?? '')}</td>`
    + '</tr>'
  )));
  lines.push(...section('cells', 'Развёртка 120 ячеек', [
    '      <p>Одна строка на каждую пару «проект × критерий»: у подтверждённой клетки — документ, страница или файл с датой проверки; у пустой — причина, по которой подтверждения нет. Статус берётся из матрицы, развёртка его не дублирует.</p>',
    ...renderTable(
      'Основание каждой из 120 ячеек матрицы',
      ['Проект', 'Критерий', 'Основание'],
      cellRows,
      { widths: ['22%', '22%', '56%'] },
    ),
  ]));

  const scaleRows = sorted.map((row) => (
    `<tr id="scale-${row.id}">`
    + `<th scope="row"><a href="#project-${row.id}">${escapeHtml(row.name)}</a></th>`
    + `<td>${formatDecimal(row.parts.open)}</td>`
    + `<td>${formatDecimal(row.parts.repr)}</td>`
    + `<td>${formatDecimal(row.parts.cov)}</td>`
    + `<td>${formatDecimal(row.parts.hist)}</td>`
    + `<td>${formatDecimal(row.parts.indep)}</td>`
    + `<td><strong>${row.total}</strong></td>`
    + '</tr>'
  ));
  lines.push(...section('scale', 'Взвешенная шкала', [
    '      <p>Балл проекта — взвешенная сумма пяти вкладов: <strong>25·открытость + 25·воспроизводимость + 20·покрытие + 15·история + 15·независимость</strong>. Открытость = (Д + Л) / 2, воспроизводимость = (Ф + С) / 2, покрытие = 0,6·Ст + 0,4·частота, история = И, независимость = Р. Итог округляется до целого.</p>',
    '      <p class="doc-meta">Частота: непрерывная, дневная и недельная — 1,00; месячная — 0,75; годовая и полугодовая — 0,50; дашборд без объявленного ритма — 0. Вклады в таблице — доли от 0 до 1, балл — уже взвешенный итог.</p>',
    ...renderTable(
      'Пять вкладов и взвешенный балл каждого проекта',
      ['Проект', 'Открытость', 'Воспроизводимость', 'Покрытие', 'История', 'Независимость', 'Балл'],
      scaleRows,
      { widths: ['24%', '13%', '16%', '12%', '12%', '12%', '11%'] },
    ),
  ]));

  const sensitivityRowsHtml = sensitivity.map((row) => {
    const cycles = moveCycles(baseline, row.order);
    const description = cycles.length === 0
      ? 'порядок не изменился'
      : cycles
        .map((chain) => chain.map((move) => `${escapeHtml(nameOf(move.id))}: ${move.from} → ${move.to}`).join('; '))
        .join('; ');
    return `<tr><th scope="row">${escapeHtml(PROJECT_LABELS[row.key])}</th><td>${row.delta > 0 ? '+' : '−'}5 п.п.</td><td>${description}</td></tr>`;
  });
  const edgesStable = topStable && bottomStable;
  const swapsSentence = swapCount === 0
    ? 'Обменов мест нет.'
    : `Обменов мест всего: ${swapCount}; ${edgesStable ? 'все они — в середине списка: верх и низ не двигались' : 'часть обменов затрагивает верх или низ списка'}.`;
  const firstNote = topStable
    ? `Первое место (${escapeHtml(nameOf(baseline[0]))}) и `
    : 'Первое место менялось; ';
  const lastNote = bottomStable
    ? `последние два (${escapeHtml(nameOf(baseline[baseline.length - 2]))}, ${escapeHtml(nameOf(baseline[baseline.length - 1]))}) не двигаются ни в одном из десяти сценариев.`
    : 'последние два места двигались.';
  lines.push(...section('sensitivity', 'Устойчивость ±5 п.п.', [
    '      <p>Проверка: один вес сдвигается на +5 или −5 процентных пункта, остальные четыре перенормируются пропорционально до суммы 100. Порядок считается по неокруглённому баллу, в таблице показывается округлённый итог.</p>',
    `      <p>${firstNote}${lastNote} ${swapsSentence}</p>`,
    ...renderTable(
      'Порядок проектов при сдвиге каждого веса на ±5 п.п.',
      ['Вес', 'Сдвиг', 'Что изменилось'],
      sensitivityRowsHtml,
      { widths: ['22%', '12%', '66%'] },
    ),
  ]));

  const countryHead = ['Страна', ...model.projects.map((project) => project.name), 'Дата проверки'];
  const countryRows = model.countries.rows.map((row, index) => {
    const cells = row.cells.map((cell) => {
      const text = cell.kind === 'unverified'
        ? `не проверено: ${cell.note}`
        : cell.kind === 'blocked'
          ? `заблокировано: ${cell.note}`
          : cell.kind;
      return `<td>${inline(text)}</td>`;
    }).join('');
    return `<tr id="country-${index + 1}"><th scope="row">${escapeHtml(row.name)}</th>${cells}<td>${escapeHtml(model.countries.checked)}</td></tr>`;
  });
  const attributeRows = model.projects.map((project) => (
    `<tr id="attribute-${project.id}"><th scope="row">${escapeHtml(project.name)}</th>`
    + `<td>${inline(project.attributes.resolution)}</td>`
    + `<td>${inline(project.attributes.since)}</td>`
    + `<td>${inline(project.attributes.lag)}</td>`
    + `<td>${inline(project.attributes.where)}</td>`
    + `<td>${escapeHtml(project.attributes.checked)}</td></tr>`
  ));
  lines.push(...section('countries', 'Страны', [
    '      <p>Как читать: <code>страна</code> — у проекта есть страновой ряд или оценка именно по этой стране, подтверждённые страницей, файлом или API проекта; <code>регион</code> — только региональная или ситуационная группировка; <code>нет</code> — странового уровня по этой стране проект не публикует; <code>заблокировано</code> — живой источник отвечает 403 или не отвечает из среды проверки (<code>blocked</code>, а не битая ссылка), поэтому клетка не подтверждена и не опровергнута. Отрицательный вывод из недоступности источника не делается.</p>',
    `      <p class="doc-meta">Дата проверки каждой клетки — ${escapeHtml(model.countries.checked)}. Строка Cassandra — «регион» по построению: 12 регионов таксономии v2, страна входит в регион через атрибуцию <code>regions[]</code>, страновых срезов нет.</p>`,
    ...renderTable(
      'Покрытие 14 стран двенадцатью проектами',
      countryHead,
      countryRows,
      { widths: ['12%', ...Array(model.projects.length).fill('6.5%'), '10%'] },
    ),
    '      <h3>Атрибуты проектов</h3>',
    `      <p>Разрешение, начало ряда, лаг публикации и адрес, по которому факт проверен. Для проектов, чьи живые страницы ${date} заблокированы (403/000), источником служит снимок Web Archive, а год начала ряда помечен как неустановленный, если документ его не называет.</p>`,
    ...renderTable(
      'Разрешение, начало ряда, лаг и адрес проверки по каждому проекту',
      ['Проект', 'Разрешение', 'С какого года', 'Лаг публикации', 'Где смотреть', 'Дата проверки'],
      attributeRows,
      { widths: ['14%', '21%', '16%', '14%', '25%', '10%'] },
    ),
  ]));

  const unverifiedRows = model.unverified.map((row) => (
    `<tr><th scope="row">${escapeHtml(row.project)}</th>`
    + `<td>${inline(row.what)}</td>`
    + `<td>${inline(row.address)}</td>`
    + `<td>${escapeHtml(row.date)}</td>`
    + `<td>${inline(row.reason)}</td></tr>`
  ));
  lines.push(...section('unverified', 'Что не удалось проверить', [
    '      <p>Строка в этом списке означает, что живая страница или артефакт остались непроверенными. Коды 403 и 000 — это <code>blocked</code> (bot-защита или сброс соединения из среды проверки), а не битая ссылка: клетки матрицы кодированы по документам, прочитанным через снимки Web Archive, и подтверждение берётся оттуда, а не из факта недоступности.</p>',
    ...renderTable(
      `Что именно не удалось проверить ${date} и почему`,
      ['Проект', 'Что проверяли', 'Адрес', 'Дата', 'Код или причина'],
      unverifiedRows,
      { widths: ['14%', '18%', '26%', '10%', '32%'] },
    ),
  ]));

  const legalcode = (model.license.match(/https?:\/\/[^\s)]+/g) ?? [])
    .map(trimUrlTail)
    .find((url) => url.startsWith('https://creativecommons.org/licenses/by/4.0/legalcode')) ?? null;
  lines.push(...section('reuse', 'Переиспользование', [
    `      <p>${paragraphWithLinks(model.license)}</p>`,
    ...(legalcode
      ? [`      <p>Текст лицензии: ${link(legalcode, 'Creative Commons Attribution 4.0 International (legalcode)')}.</p>`]
      : []),
    '      <p class="doc-meta">Атрибуция обязательна: «Cassandra Index — https://cassindex.ru, лицензия CC BY 4.0»; при переработке — отметка изменений и формула «based on Cassandra Index». Тексты, данные и товарные знаки цитируемых проектов остаются под их собственными условиями.</p>',
  ]));

  lines.push('  </main>');
  lines.push(...renderFooter());
  return lines.join('\n');
}

// ---------- Сборка и CLI ----------

function build(root) {
  const markdown = readFileSync(path.join(root, SOURCE), 'utf8');
  const model = parseSource(markdown);
  const errors = validateSource(model);
  if (errors.length > 0) {
    throw new Error(`Источник ${SOURCE} не прошёл проверку:\n- ${errors.join('\n- ')}`);
  }
  return { model, outputs: [{ file: OUTPUT, body: renderPage(model) }] };
}

export function buildOutputs(root = ROOT) {
  return build(root).outputs;
}

function parseArgs(argv) {
  let write = false;
  let root = ROOT;
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--write') write = true;
    else if (arg === '--root') {
      const value = argv[index + 1];
      if (!value) throw new Error('--root требует путь к каталогу');
      root = path.resolve(value);
      index += 1;
    } else if (arg.startsWith('--root=')) {
      root = path.resolve(arg.slice('--root='.length));
    } else {
      throw new Error(`Неизвестный аргумент: ${arg}`);
    }
  }
  return { write, root };
}

export function main(argv = process.argv.slice(2)) {
  const { write, root } = parseArgs(argv);
  const { model, outputs } = build(root);
  const stats = matrixStats(model);
  const rows = weightedRows(model);
  const totals = [...rows].sort((a, b) => b.score - a.score || PROJECT_IDS.indexOf(a.id) - PROJECT_IDS.indexOf(b.id))
    .map((row) => row.total);

  for (const output of outputs) {
    const file = path.join(root, output.file);
    const onDisk = existsSync(file) ? readFileSync(file, 'utf8') : null;
    const state = onDisk === output.body ? 'без изменений' : 'обновить';
    process.stdout.write(`${output.file}: ${state} (${output.body.length} байт)\n`);
    if (write && onDisk !== output.body) {
      mkdirSync(path.dirname(file), { recursive: true });
      writeFileSync(file, output.body);
    }
  }

  process.stdout.write(`источник: ${SOURCE}; дата среза: ${model.date}\n`);
  process.stdout.write(`подтверждено: ${stats.total} из ${stats.possible}; медиана: ${formatRatio(stats.median)}\n`);
  process.stdout.write(`проверить до записи: ${stats.verifiable} из ${model.projects.length}; полный цикл Д+Ф+С+Г+Н: ${stats.fullCycle}\n`);
  process.stdout.write(`баллы: ${totals.join(', ')}\n`);
}

const invoked = process.argv[1] ? path.resolve(process.argv[1]) : '';
const self = fileURLToPath(import.meta.url);
if (invoked && invoked.toLowerCase() === self.toLowerCase()) {
  main();
}
