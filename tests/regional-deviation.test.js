// regional-deviation.test.js — сторожи ADR 0069 (региональное отклонение по
// драйверам, методология 4.0): честный разброс опубликованной недели,
// сохранность ветки зеркалирования шока, отсутствие удалённых сущностей
// (n0/m/iWith/iWithout/hypotheticalIndex) в calc/, динамическая аудит-строка,
// граница публикации Δ_region (только calc/ и тесты).
// Ожидаемые значения — дисковые снапшоты и текстовые источники, не код под тестом.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadSnapshotPart } from '../calc/week-step.js';
import { PARAMS } from '../calc/params.js';
import { methodologyDoc } from '../calc/public-contract.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CHAIN = [
  '2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20',
  '2026-09-27', '2026-10-04', '2026-10-11', '2026-10-18', '2026-10-25',
  '2026-11-01',
];

// --- История 1 (R01): честный разброс опубликованной недели ---
// Бар ≥ 1.5 п.п. (бриф Q12a; прежний бар ≥ 4 п.п. отменён как недостижимый
// без искусственного усиления). Проверяется по диску после пересчёта 4.0.
// Форма распределения: минимум-maximum не должен прятать «слипание» всех
// регионов в полосе ±0.05 вокруг глобала — такой ряд проходит любой min–max
// бар, но честной дифференциации не несёт (сторож ADR 0069, ремонт по ревью:
// факт 11-01 — 10 регионов на ≥0.3 от глобала, 0 ровно на нём).
test('диск: 2026-11-01 — разброс региональных индексов ≥ 1.5 п.п. (ADR 0069)', () => {
  const regions = loadSnapshotPart('2026-11-01', 'regions').regions;
  const values = Object.values(regions).map((r) => r.index);
  const spread = Math.max(...values) - Math.min(...values);
  assert.ok(spread >= 1.5, `разброс ${spread} п.п. — меньше бара 1.5`);
});

test('диск: 2026-11-01 — форма распределения честная (не слипание вокруг глобала)', () => {
  const global = loadSnapshotPart('2026-11-01', 'global').global;
  const regions = loadSnapshotPart('2026-11-01', 'regions').regions;
  const covered = Object.values(regions).filter((r) => r.background === false);
  assert.equal(covered.length, 12, 'все 12 регионов недели покрыты');
  const far = covered.filter((r) => Math.abs(r.index - global.index) >= 0.3).length;
  const glued = covered.filter((r) => r.index === global.index).length;
  assert.ok(far >= 4, `регионов на ≥0.3 п.п. от глобала: ${far} — меньше 4, разброс слипается`);
  assert.ok(glued <= 3, `регионов ровно на глобале: ${glued} — слипание вокруг глобала`);
});

// --- История 18 (R11): ветка зеркалирования шока сохранена и «мёртва» ---
// kappa/regionShockDelta остаются в PARAMS; на реальной истории порог
// (+15 п.п. глобальной дельты) ни разу не достигнут — пин, чтобы ветку не
// удалили как неиспользуемую.
test('диск: на всех 10 неделях цепочки |Δ_global| < regionShockDelta — зеркало не срабатывало', () => {
  assert.equal(PARAMS.regionShockDelta, 15);
  assert.equal(typeof PARAMS.kappa, 'number');
  for (const week of CHAIN) {
    const g = loadSnapshotPart(week, 'global').global;
    assert.ok(Math.abs(g.delta) < PARAMS.regionShockDelta, `${week}: Δ ${g.delta} достиг порога шока`);
  }
});

// --- История 9 (R16): методология 4.0 на диске цепочки; демо-недели целы ---
test('диск: цепочка 08-30…11-01 несёт methodology 4.0 и signals у регионов; демо-недели прежние', () => {
  for (const week of CHAIN) {
    const g = loadSnapshotPart(week, 'global');
    assert.equal(g.methodology, '4.0', `${week}: methodology 4.0`);
    const regions = loadSnapshotPart(week, 'regions').regions;
    for (const r of Object.values(regions)) {
      assert.ok(Number.isInteger(r.signals) && r.signals >= 0, `${week}: signals целое ≥ 0`);
    }
  }
  for (const week of ['2026-08-02', '2026-08-09', '2026-08-16', '2026-08-23']) {
    const g = loadSnapshotPart(week, 'global');
    assert.equal(g.methodology, '1.0', `${week}: демо-неделя не тронута`);
    const regions = loadSnapshotPart(week, 'regions').regions;
    for (const r of Object.values(regions)) {
      assert.equal(r.signals, undefined, `${week}: демо-недели signals не несут`);
      assert.ok(Number.isInteger(r.index), `${week}: демо-индексы целые`);
    }
  }
});

// --- История 3 (R03): удалённые сущности не возвращаются в calc/ ---
function sourcesOf(dir, extensions = ['.js']) {
  const out = [];
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const full = path.join(d, name);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (extensions.some((ext) => name.endsWith(ext))) out.push(full);
    }
  };
  walk(dir);
  return out;
}

const PUBLIC_TEXT_EXT = ['.json', '.csv', '.svg'];

test('calc/: n0, m = n/(n+n0), iWith, iWithout, hypotheticalIndex отсутствуют (ADR 0069)', () => {
  for (const file of sourcesOf(path.join(ROOT, 'calc'))) {
    const text = readFileSync(file, 'utf8');
    const base = path.basename(file);
    assert.ok(!/\biWith\b|\biWithout\b|\bhypotheticalIndex\b/.test(text), `${base}: iWith/iWithout/hypotheticalIndex`);
    // Без исключений: public-contract.js раскрывает параметры в methodologyDoc
    // (ADR 0062) — именно поэтому возврат n0 туда страж обязан ловить наравне
    // с остальными файлами calc/.
    assert.ok(!/\bn0\b/.test(text), `${base}: n0`);
    assert.ok(!/nReg\s*\/\s*\(\s*nReg\s*\+\s*n0\s*\)/.test(text), `${base}: m = n/(n+n0)`);
  }
});

// Негативный контроль к стражу выше: возврат n0 в раскрытие методологии
// (methodologyDoc — публикующий файл, ADR 0062) обязан ловиться. Тест читает
// вывод сборщика документа: появление ключа n0 (или слова в сериализации) —
// регресс ADR 0069, страж calc/ его поймает, здесь закрепляем источник.
test('public-contract: methodologyDoc не раскрывает n0 (ADR 0069)', () => {
  const doc = methodologyDoc();
  assert.ok(!Object.prototype.hasOwnProperty.call(doc, 'n0'), 'methodologyDoc: нет ключа n0');
  assert.ok(!/\bn0\b/.test(JSON.stringify(doc)), 'methodologyDoc: n0 нет в сериализации');
});

test('calc.js: recalculation_method аудита собирается динамически из PARAMS.methodology', () => {
  const text = readFileSync(path.join(ROOT, 'calc', 'calc.js'), 'utf8');
  assert.ok(text.includes('aggregateDrivers v${PARAMS.methodology}'), 'динамическая строка из PARAMS');
  assert.ok(!text.includes("'aggregateDrivers v3.0'"), 'литерал версии не закреплён');
});

// --- История 19 (R13): Δ_region — внутренняя величина, наружу не уходит ---
// Сторож обязан читать то, что реально лежит на диске: в `data/public/**` нет
// ни одного `.js` (47 json + 1 csv + 1 svg), поэтому прежний фильтр по `.js`
// давал пустой цикл и тест не мог упасть. Теперь сканируются `.json/.csv/.svg`
// публичного слоя и зеркало развёртки `data/analysis.js`; непустота набора
// проверяется отдельной строкой, чтобы сторож не выродился снова.
test('deltaRegion отсутствует в js/, data/public/** (.json/.csv/.svg) и data/analysis.js', () => {
  const publicFiles = sourcesOf(path.join(ROOT, 'data', 'public'), PUBLIC_TEXT_EXT);
  assert.ok(
    publicFiles.length >= 40,
    `просканировано ${publicFiles.length} файлов публичного слоя — ожидалось ≥ 40`,
  );
  const jsFiles = sourcesOf(path.join(ROOT, 'js'));
  assert.ok(jsFiles.length > 0, 'js/ просканирован');
  const analysis = path.join(ROOT, 'data', 'analysis.js');
  assert.ok(statSync(analysis).isFile(), 'data/analysis.js существует');
  for (const file of [...jsFiles, ...publicFiles, analysis]) {
    const text = readFileSync(file, 'utf8');
    assert.ok(!text.includes('deltaRegion'), `${path.relative(ROOT, file)}: deltaRegion наружу не публикуется`);
  }
});
