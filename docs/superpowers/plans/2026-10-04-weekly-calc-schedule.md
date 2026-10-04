# Weekly Index Recalc (cron) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Еженедельный автозапуск расчёта индекса Кассандры каждое воскресенье 08:00 МСК через GitHub Actions: по готовому входу — расчёт → тесты → сборка → автокоммит → пуш → деплой; входа/сидов нет — тихий зелёный skip.

**Architecture:** Новый workflow `.github/workflows/weekly-calc.yml` (cron + workflow_dispatch) оркестрирует шаги; механика новой недели (добавление даты в `RECALC_WEEKS` и `data/latest.js`) вынесена в чистый тестируемый модуль `calc/prepare-week.js`. `deploy.yml` получает триггер `workflow_dispatch:` для явного запуска после автопуша (push от `GITHUB_TOKEN` не триггерит другие workflow).

**Tech Stack:** GitHub Actions (bash-шаги), Node ≥ 18 stdlib (ESM), `node --test`.

**Spec:** `docs/superpowers/specs/2026-10-04-weekly-calc-schedule-design.md`

**ВАЖНО (правило репо):** этот план НЕ содержит шагов `git commit`/`git push` — по AGENTS.md коммит и пуш делает только оркестратор. Исполнитель оставляет изменения в рабочем дереве и сообщает оркестратору. Рабочее дерево сейчас содержит параллельную работу по неделе 2026-10-04 — НЕ трогать `calc/input/2026-10-04.json`, `data/2026-10-04/`, `.autopilot/`, `docs/governance.md`, `docs/articles/`.

---

### Task 1: `calc/prepare-week.js` — чистые швы (TDD)

**Files:**
- Create: `tests/prepare-week.test.js`
- Create: `calc/prepare-week.js`

- [ ] **Step 1: Написать падающий тест**

Создать `tests/prepare-week.test.js` целиком:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { addRecalcWeek, addLatestWeek } from '../calc/prepare-week.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// --- addRecalcWeek: синтетический источник ---
const CALC_SAMPLE = "const RECALC_WEEKS = ['2026-08-30', '2026-09-06'];\nconst PREV_WEEK = '2026-08-23';\n";

test('addRecalcWeek: добавляет дату в конец массива, не трогая остальной код', () => {
  const r = addRecalcWeek(CALC_SAMPLE, '2026-10-11');
  assert.equal(r.changed, true);
  assert.ok(r.src.includes("const RECALC_WEEKS = ['2026-08-30', '2026-09-06', '2026-10-11'];"));
  assert.ok(r.src.includes("const PREV_WEEK = '2026-08-23';"));
});

test('addRecalcWeek: повторный вызов идемпотентен', () => {
  const once = addRecalcWeek(CALC_SAMPLE, '2026-10-11');
  const twice = addRecalcWeek(once.src, '2026-10-11');
  assert.equal(twice.changed, false);
  assert.equal(twice.src, once.src);
});

test('addRecalcWeek: уже существующая неделя — без изменений', () => {
  const r = addRecalcWeek(CALC_SAMPLE, '2026-08-30');
  assert.equal(r.changed, false);
  assert.equal(r.src, CALC_SAMPLE);
});

test('addRecalcWeek: неверный формат недели — ошибка', () => {
  assert.throws(() => addRecalcWeek(CALC_SAMPLE, '11-10-2026'), /YYYY-MM-DD/);
  assert.throws(() => addRecalcWeek(CALC_SAMPLE, undefined), /YYYY-MM-DD/);
});

test('addRecalcWeek: в источнике нет RECALC_WEEKS — ошибка', () => {
  assert.throws(() => addRecalcWeek('const x = 1;\n', '2026-10-11'), /RECALC_WEEKS/);
});

// --- addLatestWeek: синтетический источник ---
const LATEST_SAMPLE = 'window.CI_WEEKS = ["2026-08-02","2026-08-09"];\nwindow.CI_LATEST = "2026-08-09";\n';

test('addLatestWeek: новейшая неделя попадает в CI_WEEKS и становится CI_LATEST', () => {
  const r = addLatestWeek(LATEST_SAMPLE, '2026-08-16');
  assert.equal(r.changed, true);
  assert.ok(r.src.includes('window.CI_WEEKS = ["2026-08-02","2026-08-09","2026-08-16"];'));
  assert.ok(r.src.includes('window.CI_LATEST = "2026-08-16";'));
});

test('addLatestWeek: старая неделя встаёт по порядку, CI_LATEST не понижается', () => {
  const src = 'window.CI_WEEKS = ["2026-08-09"];\nwindow.CI_LATEST = "2026-08-09";\n';
  const r = addLatestWeek(src, '2026-08-02');
  assert.equal(r.changed, true);
  assert.ok(r.src.includes('window.CI_WEEKS = ["2026-08-02","2026-08-09"];'));
  assert.ok(r.src.includes('window.CI_LATEST = "2026-08-09";'));
});

test('addLatestWeek: уже учтённая неделя — без изменений', () => {
  const r = addLatestWeek(LATEST_SAMPLE, '2026-08-09');
  assert.equal(r.changed, false);
  assert.equal(r.src, LATEST_SAMPLE);
});

test('addLatestWeek: неверный формат недели — ошибка', () => {
  assert.throws(() => addLatestWeek(LATEST_SAMPLE, '20261011'), /YYYY-MM-DD/);
});

test('addLatestWeek: в источнике нет CI_WEEKS — ошибка', () => {
  assert.throws(() => addLatestWeek('// пусто\n', '2026-10-11'), /CI_WEEKS/);
});

// --- Реальные файлы репо: тест читает с диска, ничего не пишет ---
test('реальный calc/calc.js: неделя цепочки уже есть, новая добавляется', () => {
  const src = readFileSync(path.join(ROOT, 'calc', 'calc.js'), 'utf8');
  const existing = addRecalcWeek(src, '2026-08-30');
  assert.equal(existing.changed, false);
  assert.equal(existing.src, src);
  const added = addRecalcWeek(src, '2099-12-31');
  assert.equal(added.changed, true);
  assert.ok(added.src.includes("'2099-12-31'"));
  const again = addRecalcWeek(added.src, '2099-12-31');
  assert.equal(again.changed, false);
  assert.equal(again.src, added.src);
});

test('реальный data/latest.js: текущая latest без изменений, новая неделя добавляется', () => {
  const src = readFileSync(path.join(ROOT, 'data', 'latest.js'), 'utf8');
  const cur = src.match(/window\.CI_LATEST = "([0-9-]{10})"/)[1];
  const same = addLatestWeek(src, cur);
  assert.equal(same.changed, false);
  assert.equal(same.src, src);
  const added = addLatestWeek(src, '2099-12-31');
  assert.equal(added.changed, true);
  assert.ok(added.src.includes('window.CI_LATEST = "2099-12-31"'));
  const weeks = added.src.match(/window\.CI_WEEKS = (\[[^\]]*\])/)[1];
  assert.ok(weeks.includes('"2099-12-31"'));
});
```

- [ ] **Step 2: Запустить тест — убедиться, что он падает**

Run: `node --test tests/prepare-week.test.js`
Expected: FAIL — `Cannot find module ... calc/prepare-week.js` (или ERR_MODULE_NOT_FOUND).

- [ ] **Step 3: Написать минимальную реализацию**

Создать `calc/prepare-week.js` целиком:

```js
// calc/prepare-week.js — механика новой недели для еженедельного расчёта
// (weekly-calc.yml): добавление даты в RECALC_WEEKS (calc/calc.js) и в
// CI_WEEKS/CI_LATEST (data/latest.js). Чистые швы addRecalcWeek/addLatestWeek
// не трогают ФС и покрыты tests/prepare-week.test.js; CLI — тонкая обвязка
// в стиле calc.js:
//   node calc/prepare-week.js <неделя>          — только печать
//   node calc/prepare-week.js --write <неделя>  — запись файлов
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);
const WEEK_RE = /^\d{4}-\d{2}-\d{2}$/;

function assertWeek(week) {
  if (typeof week !== 'string' || !WEEK_RE.test(week)) {
    throw new Error(`неделя должна быть в формате YYYY-MM-DD, получено: ${week}`);
  }
}

// calc/calc.js: вставляет week в конец RECALC_WEEKS, если там её нет.
export function addRecalcWeek(src, week) {
  assertWeek(week);
  const m = src.match(/const RECALC_WEEKS = \[([^\]]*)\]/);
  if (!m) throw new Error('RECALC_WEEKS не найден');
  const dates = m[1].match(/'\d{4}-\d{2}-\d{2}'/g) || [];
  if (dates.includes(`'${week}'`)) return { src, changed: false };
  const inner = m[1].trimEnd() + `, '${week}'`;
  return {
    src: src.replace(/const RECALC_WEEKS = \[[^\]]*\]/, `const RECALC_WEEKS = [${inner}]`),
    changed: true,
  };
}

// data/latest.js: дописывает week в CI_WEEKS (по возрастанию) и поднимает
// CI_LATEST, если week новее; старую неделю в CI_LATEST не понижает
// (защита при ручном workflow_dispatch для прошлой недели).
export function addLatestWeek(src, week) {
  assertWeek(week);
  const m = src.match(/window\.CI_WEEKS = \[([^\]]*)\]/);
  if (!m) throw new Error('CI_WEEKS не найден');
  let weeks;
  try {
    weeks = JSON.parse(`[${m[1]}]`);
  } catch (e) {
    throw new Error(`CI_WEEKS не парсится: ${e.message}`);
  }
  if (!Array.isArray(weeks)) throw new Error('CI_WEEKS не массив');
  if (!weeks.includes(week)) weeks.push(week);
  weeks.sort();
  const mL = src.match(/window\.CI_LATEST = "(\d{4}-\d{2}-\d{2})"/);
  if (!mL) throw new Error('CI_LATEST не найден');
  const latest = mL[1] > week ? mL[1] : week;
  let out = src.replace(/window\.CI_WEEKS = \[[^\]]*\]/, `window.CI_WEEKS = ${JSON.stringify(weeks)}`);
  out = out.replace(/window\.CI_LATEST = "\d{4}-\d{2}-\d{2}"/, `window.CI_LATEST = "${latest}"`);
  return { src: out, changed: out !== src };
}

function main() {
  const args = process.argv.slice(2);
  const writeMode = args.includes('--write');
  const week = args.find((a) => !a.startsWith('--'));
  if (!week) {
    process.stdout.write('нужна неделя YYYY-MM-DD (node calc/prepare-week.js [--write] <неделя>)\n');
    process.exitCode = 1;
    return;
  }
  const calcPath = path.join(ROOT, 'calc', 'calc.js');
  const latestPath = path.join(ROOT, 'data', 'latest.js');
  try {
    // Оба пересчёта — до любой записи: битый вход не должен оставить
    // полузаписанный state (calc.js и latest.js меняются парой).
    const r1 = addRecalcWeek(readFileSync(calcPath, 'utf8'), week);
    const r2 = addLatestWeek(readFileSync(latestPath, 'utf8'), week);
    const out = [
      r1.changed ? `calc/calc.js: +${week} в RECALC_WEEKS` : 'calc/calc.js: неделя уже в RECALC_WEEKS',
      r2.changed ? `data/latest.js: ${week} учтена в CI_WEEKS/CI_LATEST` : 'data/latest.js: неделя уже учтена',
    ];
    if (writeMode) {
      if (r1.changed) writeFileSync(calcPath, r1.src, 'utf8');
      if (r2.changed) writeFileSync(latestPath, r2.src, 'utf8');
    } else {
      out.push('запись не выполнялась (без --write)');
    }
    process.stdout.write(out.join('\n') + '\n');
  } catch (e) {
    process.stdout.write(`ошибка: ${e && e.message ? e.message : e}\n`);
    process.exitCode = 1;
  }
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
```

- [ ] **Step 4: Запустить тест — убедиться, что зелёный**

Run: `node --test tests/prepare-week.test.js`
Expected: PASS, все 12 тестов (12 pass / 0 fail).

- [ ] **Step 5: Прогнать весь набор тестов**

Run: `node --test`
Expected: все файлы PASS (29 прежних файлов + новый = 30 файлов; число passed = прежнее + 12), 0 fail.

---

### Task 2: CLI `prepare-week.js` — ручная верификация (без записи)

**Files:**
- Verify: `calc/prepare-week.js` (CLI-ветка `main()`)

CLI покрыт тонкой обвязкой; проверяем вручную в режиме печати (он ничего не пишет).

- [ ] **Step 1: Запуск печати для будущей недели**

Run: `node calc/prepare-week.js 2026-10-11`
Expected (текущее состояние рабочего дерева):
```
calc/calc.js: +2026-10-11 в RECALC_WEEKS
data/latest.js: 2026-10-11 учтена в CI_WEEKS/CI_LATEST
запись не выполнялась (без --write)
```
(Если параллельная работа уже добавила эти даты — допустимы строки «неделя уже …»; важно: третья строка «запись не выполнялась» и код выхода 0.)

- [ ] **Step 2: Запуск без аргумента — ошибка**

Run: `node calc/prepare-week.js`
Expected: текст `нужна неделя YYYY-MM-DD (...)`, код выхода 1 (проверить: `$LASTEXITCODE` в PowerShell = 1).

- [ ] **Step 3: Убедиться, что файлы не изменились**

Run: `git diff --stat calc/calc.js data/latest.js`
Expected: вывод идентичен состоянию ДО Step 1 (режим печати не пишет; diff от параллельной работы по 10-04 остаётся прежним).

---

### Task 3: Workflow `.github/workflows/weekly-calc.yml`

**Files:**
- Create: `.github/workflows/weekly-calc.yml`

- [ ] **Step 1: Создать файл workflow целиком**

```yaml
name: Weekly index recalc

on:
  schedule:
    - cron: '0 5 * * 0' # воскресенье 05:00 UTC = 08:00 МСК (UTC+3, без летнего времени)
  workflow_dispatch:
    inputs:
      week:
        description: 'Неделя YYYY-MM-DD (пусто — воскресенье сейчас по МСК)'
        required: false
        type: string

permissions:
  contents: write # коммит и пуш в master
  actions: write # gh workflow run deploy.yml

concurrency:
  group: weekly-calc
  cancel-in-progress: false

jobs:
  recalc:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Определить целевую неделю
        id: week
        run: |
          WEEK="${{ inputs.week }}"
          if [ -z "$WEEK" ]; then
            WEEK=$(TZ=Europe/Moscow date +%F)
          fi
          if ! echo "$WEEK" | grep -Eq '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'; then
            echo "::error::Неверный формат недели: $WEEK (нужен YYYY-MM-DD)"
            exit 1
          fi
          echo "value=$WEEK" >> "$GITHUB_OUTPUT"
          echo "Целевая неделя: $WEEK"

      - name: Ворота пропуска (тихий skip)
        id: gate
        env:
          WEEK: ${{ steps.week.outputs.value }}
        run: |
          skip() { echo "::notice::$1"; echo "skip=true" >> "$GITHUB_OUTPUT"; exit 0; }
          if [ ! -f "calc/input/$WEEK.json" ]; then
            skip "Пропуск: нет входа calc/input/$WEEK.json"
          fi
          for f in drivers region-europe region-east-asia region-middle-east region-north-america region-south-asia region-africa; do
            if [ ! -f "data/$WEEK/$f.js" ]; then
              skip "Пропуск: нет редакционного сида data/$WEEK/$f.js"
            fi
          done
          if [ -f "data/$WEEK/global.js" ]; then
            skip "Пропуск: неделя $WEEK уже пересчитана"
          fi
          echo "skip=false" >> "$GITHUB_OUTPUT"

      - name: Механика недели (RECALC_WEEKS + latest.js)
        if: steps.gate.outputs.skip == 'false'
        env:
          WEEK: ${{ steps.week.outputs.value }}
        run: node calc/prepare-week.js --write "$WEEK"

      - name: Расчёт недели
        if: steps.gate.outputs.skip == 'false'
        env:
          WEEK: ${{ steps.week.outputs.value }}
        run: node calc/calc.js --write "$WEEK"

      - name: Тесты
        if: steps.gate.outputs.skip == 'false'
        run: node --test

      - name: Сборка бандлов
        if: steps.gate.outputs.skip == 'false'
        run: node build.js

      - name: Коммит и пуш в master
        if: steps.gate.outputs.skip == 'false'
        env:
          WEEK: ${{ steps.week.outputs.value }}
        run: |
          MSG=$(node -e "
            const fs = require('fs');
            const w = process.env.WEEK;
            const t = fs.readFileSync('data/' + w + '/global.js', 'utf8');
            const m = t.match(/s\.global = \{[^}]*\"index\":\s*(-?\d+)[^}]*\"delta\":\s*(-?\d+)/);
            console.log(m
              ? 'расчёт недели ' + w + ': index ' + m[1] + ' (delta ' + (Number(m[2]) >= 0 ? '+' : '') + m[2] + ')'
              : 'расчёт недели ' + w);
          ")
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add -A
          if git diff --cached --quiet; then
            echo "::notice::Нет изменений — коммит не требуется"
            exit 0
          fi
          git commit -m "$MSG"
          git push origin master

      - name: Запуск деплоя
        if: steps.gate.outputs.skip == 'false'
        env:
          GH_TOKEN: ${{ github.token }}
        run: gh workflow run deploy.yml
```

- [ ] **Step 2: Проверить синтаксис YAML (best effort)**

Run (PowerShell):
```powershell
python -c 'import yaml; yaml.safe_load(open(".github/workflows/weekly-calc.yml", encoding="utf-8")); print("YAML OK")'
```
Expected: `YAML OK`. Если PyYAML не установлен (`ModuleNotFoundError`) — зафиксировать пропуск, окончательная валидация произойдёт при workflow_dispatch после коммита (это нормально, не ставить пакеты).

- [ ] **Step 3: Самопроверка по чек-листу (прочитать файл и убедиться)**

- [ ] `cron: '0 5 * * 0'` — 05:00 UTC = 08:00 МСК, воскресенье.
- [ ] `permissions` содержит `contents: write` и `actions: write`.
- [ ] Ворота пропуска: вход → 7 сидов (drivers + 6 region) → global.js существует; каждая ветка пишет `skip=true` и `exit 0`.
- [ ] Все шаги после ворот имеют `if: steps.gate.outputs.skip == 'false'`.
- [ ] Порядок: prepare-week → calc --write → тесты → build → коммит/пуш → gh workflow run.
- [ ] Коммит-шаг: идентичность `github-actions[bot]`, защита от пустого коммита, без force-push.
- [ ] Нет `cancel-in-progress: true` у concurrency (расчёт нельзя убивать на середине).

---

### Task 4: `deploy.yml` — добавить `workflow_dispatch`

**Files:**
- Modify: `.github/workflows/deploy.yml:1-4` (блок `on:`)

- [ ] **Step 1: Добавить триггер**

Было:
```yaml
on:
  push:
    branches: [master]
```
Стало:
```yaml
on:
  push:
    branches: [master]
  workflow_dispatch:
```

(Пустой `workflow_dispatch:` — без inputs; деплой просто пересобирает текущий master.)

- [ ] **Step 2: Проверить синтаксис YAML**

Run (PowerShell):
```powershell
python -c 'import yaml; yaml.safe_load(open(".github/workflows/deploy.yml", encoding="utf-8")); print("YAML OK")'
```
Expected: `YAML OK` (или зафиксировать отсутствие PyYAML — см. Task 3 Step 2).

- [ ] **Step 3: Прочитать файл и убедиться, что push-триггер сохранён**

Run: `Get-Content .github/workflows/deploy.yml -TotalCount 6`
Expected: блок `on:` содержит и `push: branches: [master]`, и `workflow_dispatch:`; остальной файл не менялся.

---

### Task 5: Документация AGENTS.md

**Files:**
- Modify: `AGENTS.md` (секции «Команды», «Структура», «Публикация», «Тесты», «Подводные камни»)

**ВАЖНО:** AGENTS.md правится параллельно другими агентами — перед каждым edit перечитать текущее содержимое секции и, если текст изменился, адаптировать `oldString` к фактическому состоянию (не перезаписывать файл целиком).

- [ ] **Step 1: Строка в таблице «Команды»**

После строки `| Проверка ссылок источников | ... |` добавить:

```markdown
| Еженедельный автозапуск | GitHub Actions `.github/workflows/weekly-calc.yml`: cron вс 08:00 МСК + `workflow_dispatch [week]` — при готовых входе/сидах: `prepare-week` → `calc --write` → тесты → сборка → автокоммит → `deploy.yml`; иначе тихий skip |
```

- [ ] **Step 2: Пункт в секции «Публикация»**

После первого пункта («Выкат — GitHub Actions …») добавить:

```markdown
- Еженедельный автозапуск — `.github/workflows/weekly-calc.yml` (cron вс 08:00 МСК
  + workflow_dispatch): считает только подготовленную неделю (вход + редакционные
  сиды), иначе тихий skip; после зелёных тестов сам коммитит и пушит в master —
  ЕДИНСТВЕННОЕ исключение правила «коммит и пуш — только за оркестратором»;
  деплой запускается явно (`gh workflow run deploy.yml`), т.к. push от
  `GITHUB_TOKEN` не триггерит другие workflow.
```

- [ ] **Step 3: Строка в «Структура» (после `calc/calibrate.js`)**

```markdown
calc/prepare-week.js     механика новой недели для weekly-calc: чистые швы
                          addRecalcWeek/addLatestWeek (RECALC_WEEKS, CI_WEEKS/CI_LATEST)
                          + CLI [--write]; тесты tests/prepare-week.test.js
```

- [ ] **Step 4: Обновить число тест-файлов**

В «Структура» строку `tests/*.test.js           29 файлов, node --test` заменить на `30 файлов`.
В секции «Тесты» к перечислению добавить: `механика недели (addRecalcWeek/addLatestWeek, идемпотентность): tests/prepare-week.test.js`.
Числа `passed` в секции «Тесты» НЕ трогать — их обновит оркестратор после финального прогона (Task 6).

- [ ] **Step 5: Два подводных камня (секция «Подводные камни», в конец)**

```markdown
- weekly-calc.yml: skip — не ошибка (нет входа/сидов или неделя уже посчитана;
  причина — в логе шага «Ворота пропуска»); GitHub задерживает cron до ~30 мин;
  ретрай несостоявшегося прогона — workflow_dispatch с input `week`. Красный фейл
  (битая ссылка, упавшие тесты, отклонённый push) коммита не оставляет.
- Недельные списки при публикации по расписанию обновляет calc/prepare-week.js —
  вручную добавлять неделю в RECALC_WEEKS/CI_WEEKS не обязательно (идемпотентно:
  повторный запуск не дублирует дату).
```

- [ ] **Step 6: Проверить, что ничего не сломано**

Run: `Select-String -Path AGENTS.md -Pattern 'weekly-calc|prepare-week' | Measure-Object | Select-Object -ExpandProperty Count`
Expected: ≥ 6 совпадений (команды, публикация, структура ×2, тесты, подводные камни).

---

### Task 6: Финальная верификация и сдача оркестратору

**Files:** без изменений; только проверки.

- [ ] **Step 1: Полный прогон тестов**

Run: `node --test`
Expected: 30 файлов, 0 fail. Записать точное число passed (прежнее 272 + 12 новых = ожидаемо 284) — числа нужны оркестратору для обновления секции «Тесты» AGENTS.md.

- [ ] **Step 2: Убедиться, что `js/**` и бандлы не менялись**

Run: `git status --short js/`
Expected: пусто (план не правит `js/**`, `build.js` перезапускать локально не нужно — шаг сборки в workflow использует уже закоммиченные бандлы как есть).

- [ ] **Step 3: Сводка изменённых файлов**

Run: `git status --short`
Expected — новые файлы плана:
```
 M AGENTS.md
 M docs/superpowers/specs/2026-10-04-weekly-calc-schedule-design.md   (если spec ещё не закоммичен)
?? docs/superpowers/plans/2026-10-04-weekly-calc-schedule.md
?? calc/prepare-week.js
?? tests/prepare-week.test.js
?? .github/workflows/weekly-calc.yml
```
Плюс `M .github/workflows/deploy.yml`. Файлы параллельной работы по неделе 10-04 (`calc/input/2026-10-04.json`, `data/2026-10-04/`, `.autopilot/…`) не тронуты.

- [ ] **Step 4: Сдать оркестратору (БЕЗ коммита)**

Сообщить оркестратору: список изменённых файлов, число passed из Step 1, и что после коммита и пуша нужно:
1. обновить числа в секции «Тесты» AGENTS.md фактическим прогоном;
2. выполнить живую проверку: Actions → Weekly index recalc → Run workflow с `week=2026-10-04` (ожидание: зелёный skip «неделя уже пересчитана») — валидация ворот без риска для данных;
3. первую новую неделю (2026-10-11) подготовить как обычно (вход + сиды) и наблюдать за cron.
