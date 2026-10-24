// quotes.js — форма и дословная проверка цитат источника (R01, R03i).
// Цитата — фрагмент текста источника, подпирающий конкретный критерий:
// { criterion, text }. Список живёт опциональным полем quotes у записи
// источника входа недели (calc/input/<неделя>.json); отсутствие поля — норма.
//
// Чистый модуль: без сети, без DOM, без диска недель. Нормализация при
// дословной проверке — из calc/classify.js (normalizeText/quoteFound), второго
// правила здесь нет: пилот Jev искал цитату тем же сравнением.
//
// Использование:
//   validateQuotes(sources, criteriaIds) -> errors[]   — форма (ворота входа)
//   verifyQuotes(sources, corpusDir, opts) -> {checked, ok, skipped, mismatched, errors}
//     — дословность: <corpusDir>/<id>.txt, нет файла → skipped, не найден текст → mismatched.

import { readFileSync } from 'node:fs';
import path from 'node:path';

import { quoteFound } from './classify.js';

// Лимиты публикации: 71 источник × несколько цитат уже даёт 1000+ строк
// sources.js; одна цитата — не больше абзаца.
export const QUOTE_MAX_LEN = 1200;
export const QUOTES_PER_SOURCE_MAX = 12;

// Легальный id источника — плоское имя файла корпуса (<id>.txt): без разделителей
// пути и прочих символов вне [A-Za-z0-9_-]. Реальные id входов недель ему следуют.
const SAFE_ID_RE = /^[A-Za-z0-9_-]+$/;

// Набор id критериев — массив или Set; всё остальное = пустой набор
// (цитату не к чему привязать).
function idSet(criteriaIds) {
  if (criteriaIds instanceof Set) return criteriaIds;
  return new Set(Array.isArray(criteriaIds) ? criteriaIds : []);
}

// Форма списка цитат записи источника: quotes — массив (если поле есть),
// каждый элемент { criterion, text }, criterion из набора 46, text непустой
// в лимите, цитат не больше QUOTES_PER_SOURCE_MAX. Пути ошибок — в стиле
// validateInputSources (sources[i].поле).
export function validateQuotes(sources, criteriaIds) {
  if (!Array.isArray(sources)) return ['sources: must be an array'];
  const ids = idSet(criteriaIds);
  const errors = [];
  sources.forEach((s, i) => {
    if (!s || typeof s !== 'object') return;
    if (s.quotes === undefined) return;
    const pfx = `sources[${i}].quotes`;
    if (!Array.isArray(s.quotes)) {
      errors.push(`${pfx}: array required`);
      return;
    }
    if (s.quotes.length > QUOTES_PER_SOURCE_MAX) {
      errors.push(`${pfx}: at most ${QUOTES_PER_SOURCE_MAX} quotes (found ${s.quotes.length})`);
    }
    s.quotes.forEach((q, k) => {
      const qpfx = `${pfx}[${k}]`;
      if (!q || typeof q !== 'object' || Array.isArray(q)) {
        errors.push(`${qpfx}: { criterion, text } required`);
        return;
      }
      if (typeof q.criterion !== 'string' || q.criterion === '' || !ids.has(q.criterion)) {
        errors.push(`${qpfx}.criterion: unknown criterion (${String(q.criterion)})`);
      }
      if (typeof q.text !== 'string' || q.text.trim() === '') {
        errors.push(`${qpfx}.text: non-empty string required`);
      } else if (q.text.length > QUOTE_MAX_LEN) {
        errors.push(`${qpfx}.text: too long (${q.text.length} > ${QUOTE_MAX_LEN})`);
      }
    });
  });
  return errors;
}

// Дословная проверка: для каждой цитаты читается корпус этого источника
// (<corpusDir>/<id>.txt); файл читается один раз на источник. Нет корпуса —
// цитата не принимается (skipped): «непроверяемая» иначе значит «по памяти».
// opts.readText — шов для тестов; по умолчанию readFileSync utf8.
export function verifyQuotes(sources, corpusDir, opts = {}) {
  const read = typeof opts.readText === 'function'
    ? opts.readText
    : (file) => readFileSync(file, 'utf8');
  const list = Array.isArray(sources) ? sources : [];
  const cache = new Map();
  const res = { checked: 0, ok: 0, skipped: 0, mismatched: 0, errors: [] };

  const corpusText = (id) => {
    if (cache.has(id)) return cache.get(id);
    let text = null;
    try {
      text = read(path.join(corpusDir, `${id}.txt`));
    } catch {
      text = null;
    }
    cache.set(id, text);
    return text;
  };

  list.forEach((s, i) => {
    if (!s || typeof s !== 'object' || !Array.isArray(s.quotes)) return;
    const id = typeof s.id === 'string' ? s.id : '';
    // id небезопасен — корпус по нему не читаем вообще: path traversal из записи
    // источника не должен дотянуться до файла вне corpusDir. Пустой и
    // нестроковой id сюда же: по ним читался бы <corpusDir>/.txt (каталог).
    if (!SAFE_ID_RE.test(id)) {
      res.skipped += s.quotes.length;
      res.errors.push(`sources[${i}].id: unsafe id`);
      return;
    }
    s.quotes.forEach((q, k) => {
      if (!q || typeof q !== 'object') return;
      // Отказ обязан называть источник и критерий (R03i.1) — даже когда id или
      // criterion в записи отсутствуют (форма проверяется отдельно).
      const criterion = typeof q.criterion === 'string' && q.criterion !== ''
        ? q.criterion
        : '<не указан>';
      const owner = id === '' ? `источник без id (sources[${i}])` : `источник ${id} (sources[${i}])`;
      const where = `${owner}, критерий ${criterion}`;
      const text = id === '' ? null : corpusText(id);
      if (text === null) {
        res.skipped++;
        res.errors.push(
          `${where}: корпус не найден — нет файла ${id || '<id>'}.txt в корпусе недели (quotes[${k}])`,
        );
        return;
      }
      res.checked++;
      // Пустую/нестроковую цитату includes() «нашла» бы всегда — отсекаем здесь,
      // даже если форма проверена отдельно (verifyQuotes можно звать без неё).
      if (typeof q.text !== 'string' || q.text.trim() === '') {
        res.mismatched++;
        res.errors.push(`${where}: пустая цитата — text обязан быть непустой строкой (quotes[${k}])`);
        return;
      }
      if (quoteFound(q.text, text)) res.ok++;
      else {
        res.mismatched++;
        res.errors.push(`${where}: цитата не найдена в корпусе дословно (quotes[${k}])`);
      }
    });
  });
  return res;
}
