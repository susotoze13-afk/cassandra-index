#!/usr/bin/env node
// build.js — сборщик без зависимостей (только stdlib, node ≥ 18).
// Собирает ES-модули js/ в classic scripts, чтобы сайт работал с file://
// (Chrome блокирует ES-модули по CORS на file://, тикет 10):
//   js/bundle.js         — полный граф от js/app.js + js/share.js (index.html)
//   js/bundle-privacy.js — граф от js/i18n.js + js/ui.js (privacy.html)
// Импорты разрешаются в общий namespace (window.CI, ключ — путь модуля),
// порядок — топологический по графу зависимостей.
// Правка исходников js/ → пересборка: `node build.js`. Тесты идут против исходников.
// Данные (data/) не входят в бандл — грузятся своими script-тегами из HTML.

const fs = require('node:fs');
const path = require('node:path');

const JS_DIR = path.join(__dirname, 'js');

// Модули-входы: [выходной файл, список входов]
const BUNDLES = [
  ['js/bundle.js', ['js/app.js', 'js/share.js']],
  ['js/bundle-privacy.js', ['js/i18n.js', 'js/ui.js']],
];

const IMPORT_RE = /^import\s+(.+?)\s+from\s+['"](\.[^'"]+)['"];?\s*$/;
const NAMED_IMPORT_RE = /^\{([^}]+)\}$/;
const STAR_IMPORT_RE = /^\*\s+as\s+([A-Za-z_$][\w$]*)$/;
const DEFAULT_IMPORT_RE = /^([A-Za-z_$][\w$]*)$/;
const EXPORT_DECL_RE = /^export\s+(async\s+function|function|class|const|let|var)\s+([A-Za-z_$][\w$]*)/;
const EXPORT_LIST_RE = /^export\s*\{([^}]+)\};?$/;

// Есть ли запятая на нулевой глубине (вне скобок/строк) — признак нескольких деклараторов.
function hasTopLevelComma(src) {
  let depth = 0;
  let quote = null;
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (quote) {
      if (ch === quote && src[i - 1] !== '\\') quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '(' || ch === '[' || ch === '{') depth += 1;
    else if (ch === ')' || ch === ']' || ch === '}') depth -= 1;
    else if (ch === ',' && depth === 0) return true;
  }
  return false;
}

// Читает модуль и возвращает { code, imports: [{spec, names|star|default}], exports: [names] }.
function parseModule(file) {
  const src = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const imports = [];
  const exports = [];
  const out = [];
  for (const line of src.split('\n')) {
    let m = line.match(IMPORT_RE);
    if (m) {
      imports.push({ spec: m[2], clause: m[1].trim(), line: line.trim() });
      continue;
    }
    if (/^\s*import\b/.test(line)) {
      throw new Error(`${file}: неподдержанная форма import: ${line.trim()}`);
    }
    m = line.match(EXPORT_DECL_RE);
    if (m) {
      if ((m[1] === 'const' || m[1] === 'let' || m[1] === 'var')
          && hasTopLevelComma(line.slice(m[0].length))) {
        throw new Error(`${file}: неподдержанная форма export (несколько деклараторов): ${line.trim()}`);
      }
      exports.push(m[2]);
      out.push(line.replace(/^export\s+/, ''));
      continue;
    }
    m = line.match(EXPORT_LIST_RE);
    if (m) {
      for (const part of m[1].split(',')) {
        const seg = part.trim();
        if (!seg) continue;
        const mm = seg.match(/^([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)$/);
        exports.push(mm ? { local: mm[1], exported: mm[2] } : { local: seg, exported: seg });
      }
      continue; // список не копируем в тело — экспортируем через exports.* в конце
    }
    if (/^\s*export\b/.test(line)) {
      throw new Error(`${file}: неподдержанная форма export: ${line.trim()}`);
    }
    out.push(line);
  }
  return { code: out.join('\n'), imports, exports };
}

// Разрешает спецификатор относительно файла-владельца → путь от корня проекта.
function resolveSpec(owner, spec) {
  const abs = path.normalize(path.join(path.dirname(owner), spec)).replace(/\\/g, '/');
  if (!fs.existsSync(path.join(__dirname, abs))) {
    throw new Error(`${owner}: не найден модуль '${spec}' (${abs})`);
  }
  return abs;
}

// Разбор import-клаузлы → { kind, imported: [...], local: [...] }.
// imported — имена в модуле-источнике (до as), local — имена в этом модуле.
function parseClause(owner, clause) {
  let m = clause.match(NAMED_IMPORT_RE);
  if (m) {
    const imported = [];
    const local = [];
    for (const s of m[1].split(',').map((x) => x.trim()).filter(Boolean)) {
      const mm = s.match(/^([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)$/);
      imported.push(mm ? mm[1] : s);
      local.push(mm ? mm[2] : s);
    }
    return { kind: 'named', imported, local };
  }
  m = clause.match(STAR_IMPORT_RE);
  if (m) return { kind: 'star', imported: [], local: [m[1]] };
  m = clause.match(DEFAULT_IMPORT_RE);
  if (m) return { kind: 'default', imported: ['default'], local: [m[1]] };
  throw new Error(`${owner}: неподдержанная форма import: ${clause}`);
}

// Разбор import-клаузлы → строки кода внутри фабрики модуля.
function importLines(owner, { spec, clause }) {
  const key = resolveSpec(owner, spec);
  const req = `__ci_require(${JSON.stringify(key)})`;
  const parsed = parseClause(owner, clause);
  if (parsed.kind === 'named') {
    const bindings = clause.match(NAMED_IMPORT_RE)[1].split(',').map((s) => s.trim()).filter(Boolean)
      .map((s) => {
        const mm = s.match(/^([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)$/);
        return mm ? `${mm[1]}: ${mm[2]}` : s;
      });
    return [`const { ${bindings.join(', ')} } = ${req};`];
  }
  if (parsed.kind === 'star') return [`const ${clause.match(STAR_IMPORT_RE)[1]} = ${req};`];
  return [`const ${parsed.local[0]} = ${req}.default;`];
}

// Проверяет каждый импорт графа: именованные имена и default существуют в экспортах источника.
function validateImports(modules) {
  const exportSets = new Map();
  for (const file of modules) {
    exportSets.set(file, new Set(
      parseModule(file).exports.map((e) => (typeof e === 'string' ? e : e.exported)),
    ));
  }
  for (const file of modules) {
    for (const imp of parseModule(file).imports) {
      const key = resolveSpec(file, imp.spec);
      const available = exportSets.get(key);
      const parsed = parseClause(file, imp.clause);
      if (parsed.kind === 'star') continue;
      if (parsed.kind === 'default') {
        if (!available.has('default')) {
          throw new Error(`${file}: ${imp.line} — у модуля '${key}' нет default-экспорта`);
        }
        continue;
      }
      for (const name of parsed.imported) {
        if (!available.has(name)) {
          throw new Error(`${file}: ${imp.line} — '${key}' не экспортирует '${name}'`);
        }
      }
    }
  }
}

// Топологическая сортировка (DFS post-order); цикл — ошибка.
function topoSort(entries) {
  const order = [];
  const state = new Map(); // file -> 'visiting' | 'done'
  function visit(file) {
    if (state.get(file) === 'done') return;
    if (state.get(file) === 'visiting') {
      throw new Error(`Циклический импорт: ${file}`);
    }
    state.set(file, 'visiting');
    for (const imp of parseModule(file).imports) {
      visit(resolveSpec(file, imp.spec));
    }
    state.set(file, 'done');
    order.push(file);
  }
  for (const e of entries) visit(e);
  return order;
}

function buildBundle(outFile, entries) {
  const modules = topoSort(entries);
  validateImports(modules);
  const parts = [];
  parts.push(`// ${outFile} — СГЕНЕРИРОВАН build.js, не править вручную.`);
  parts.push(`// Исходники: ${modules.join(', ')}. Пересборка: node build.js`);
  parts.push('(function () {');
  parts.push("'use strict';");
  parts.push('const modules = {};');
  parts.push('function __ci_require(name) {');
  parts.push('  const m = modules[name];');
  parts.push("  if (!m) throw new Error('CI module not found: ' + name);");
  parts.push('  return m.exports;');
  parts.push('}');
  parts.push('const factories = [];');
  for (const file of modules) {
    const { code, imports, exports: exps } = parseModule(file);
    const body = [
      ...imports.flatMap((imp) => importLines(file, imp)),
      code,
      ...exps.map((e) =>
        typeof e === 'string'
          ? `exports[${JSON.stringify(e)}] = ${e};`
          : `exports[${JSON.stringify(e.exported)}] = ${e.local};`),
      'return exports;',
    ].join('\n');
    parts.push(`factories.push([${JSON.stringify(file)}, function (exports) {\n${body}\n}]);`);
  }
  parts.push('for (const [name, factory] of factories) {');
  parts.push('  const exports = {};');
  parts.push('  modules[name] = { exports };');
  parts.push('  modules[name].exports = factory(exports) || exports;');
  parts.push('}');
  parts.push('window.CI = {};');
  parts.push('for (const name of Object.keys(modules)) window.CI[name] = modules[name].exports;');
  parts.push('})();');
  parts.push('');
  const out = parts.join('\n');
  const leftover = out.split('\n').find((l) => /^\s*(?:import|export)\s/.test(l));
  if (leftover) {
    throw new Error(`${outFile}: в бандле осталась необработанная строка: ${leftover.trim()}`);
  }
  const dest = path.join(__dirname, outFile);
  fs.writeFileSync(dest, out);
  console.log(`${outFile}: ${modules.length} модулей, ${out.length} байт`);
}

for (const [out, entries] of BUNDLES) {
  buildBundle(out, entries);
}
