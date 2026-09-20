import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Тикет 12 / R63: неподдержанные формы import/export роняют `node build.js` громко,
// а не просачиваются в бандл и не ломают сайт на file:// молча.
// Формы: side-effect-импорт, множественный декларатор в export const, default-импорт
// без default-экспорта. Прогон — child_process во временном каталоге (копия build.js + js/).

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BUILD_JS = path.join(ROOT, 'build.js');

// BUNDLES в build.js жёстко требует js/app.js, js/share.js, js/i18n.js, js/ui.js —
// фикстуры дополняем заглушками остальных входов.
const ENTRY_STUBS = {
  'js/share.js': 'export const share = 1;\n',
  'js/i18n.js': 'export const i18n = 1;\n',
  'js/ui.js': 'export const ui = 1;\n',
};

// Собирает временный проект: files — {путь от корня: содержимое}; возвращает {code, output}.
function runBuild(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ci-build-'));
  fs.copyFileSync(BUILD_JS, path.join(dir, 'build.js'));
  for (const [rel, content] of Object.entries({ ...ENTRY_STUBS, ...files })) {
    const p = path.join(dir, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content);
  }
  try {
    const stdout = execFileSync(process.execPath, ['build.js'], { cwd: dir, encoding: 'utf8' });
    return { code: 0, output: stdout };
  } catch (err) {
    return { code: err.status, output: `${err.stdout || ''}${err.stderr || ''}` };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// Форма 1: side-effect-импорт `import './x.js'` — не матчится парсером, уходил в бандл дословно.
test('build: side-effect-импорт роняет сборку с именем модуля', () => {
  const r = runBuild({
    'js/app.js': "import './side.js';\nexport const y = 1;\n",
    'js/side.js': 'export const z = 1;\n',
  });
  assert.notEqual(r.code, 0, 'сборка должна упасть');
  assert.match(r.output, /side\.js/);
  assert.match(r.output, /import/i);
});

// Форма 2: `export const A = 1, B = 2` — экспортировался только A, B терялся молча.
test('build: множественный декларатор в export const роняет сборку', () => {
  const r = runBuild({
    'js/app.js': 'export const A = 1, B = 2;\n',
  });
  assert.notEqual(r.code, 0, 'сборка должна упасть');
  assert.match(r.output, /app\.js/);
  assert.match(r.output, /export/i);
});

// Форма 3: `import x from './m.js'` без default-экспорта — тихий undefined в бандле.
test('build: default-импорт без default-экспорта роняет сборку', () => {
  const r = runBuild({
    'js/app.js': "import x from './m.js';\nexport const y = x;\n",
    'js/m.js': 'export const z = 1;\n',
  });
  assert.notEqual(r.code, 0, 'сборка должна упасть');
  assert.match(r.output, /app\.js/);
  assert.match(r.output, /default/i);
});

// Контроль: реальная кодовая база собирается как раньше (временная копия js/, бандлы репозитория не трогаем).
test('build: реальные исходники собираются успешно', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ci-build-real-'));
  fs.copyFileSync(BUILD_JS, path.join(dir, 'build.js'));
  fs.cpSync(path.join(ROOT, 'js'), path.join(dir, 'js'), { recursive: true });
  let code = 0;
  let output = '';
  try {
    output = execFileSync(process.execPath, ['build.js'], { cwd: dir, encoding: 'utf8' });
  } catch (err) {
    code = err.status;
    output = `${err.stdout || ''}${err.stderr || ''}`;
  }
  assert.equal(code, 0, `сборка реальных исходников упала: ${output}`);
  assert.ok(fs.existsSync(path.join(dir, 'js', 'bundle.js')));
  assert.ok(fs.existsSync(path.join(dir, 'js', 'bundle-privacy.js')));
  fs.rmSync(dir, { recursive: true, force: true });
});
