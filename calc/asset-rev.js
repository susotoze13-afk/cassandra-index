// calc/asset-rev.js — ревизия данных для cache-buster в data/latest.js.
//
// Зачем: GitHub Pages отдаёт статику с `Cache-Control: max-age=600`, а сайт
// подключает снапшоты недель обычными `<script src>` — после выката браузер до
// 10 минут держит старую копию `data/<неделя>/week.js`. Поэтому загрузчик
// `data/latest.js` дописывает к URL недели `?v=<ревизия>`, где ревизия —
// короткий хеш содержимого всех week.js. Тогда при обновлении latest.js
// (этот файл тоже кэшируется на те же 10 минут) все снапшоты приходят свежими
// и согласованными между собой, а не смесью старых и новых.
//
// Ревизия пересобирается при записи недели — `calc.js --write` (writeWeek) и
// потому же подхватывает пересчёт уже опубликованной недели, а не только
// публикацию новой. Чистые швы (revOfEntries/withAssetRev) покрыты
// tests/asset-rev.test.js; диск трогает только updateLatestRev.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { readLatestWeeks } from './prepare-week.js';

// Восемь hex-символов: достаточно для cache-buster, коротко для диффа.
export const ASSET_REV_RE = /window\.CI_ASSET_REV = "([0-9a-f]{8})"/;
const CI_LATEST_RE = /window\.CI_LATEST = "\d{4}-\d{2}-\d{2}";\n/;

// revOfEntries: [{week, content}] → 8 hex. Порядок входа не важен (сортировка
// по неделе): ревизия — свойство набора данных, а не порядка чтения.
export function revOfEntries(entries) {
  const list = Array.isArray(entries) ? entries : [];
  const sorted = [...list].sort((a, b) => (a.week < b.week ? -1 : a.week > b.week ? 1 : 0));
  const h = createHash('sha256');
  for (const e of sorted) {
    h.update(String(e.week));
    h.update('\u0000');
    h.update(String(e.content));
    h.update('\u0000');
  }
  return h.digest('hex').slice(0, 8);
}

// readWeekContents: содержимое data/<неделя>/week.js для перечисленных недель;
// отсутствующий файл пропускается (неделя объявлена, но ещё не посчитана).
export function readWeekContents(rootDir, weeks) {
  const list = Array.isArray(weeks) ? weeks : [];
  const out = [];
  for (const week of list) {
    const file = path.join(rootDir, 'data', week, 'week.js');
    if (!existsSync(file)) continue;
    out.push({ week, content: readFileSync(file, 'utf8') });
  }
  return out;
}

// computeRev — ревизия по текущему состоянию диска.
export function computeRev(rootDir, weeks) {
  return revOfEntries(readWeekContents(rootDir, weeks));
}

// readAssetRev: значение из исходника latest.js (null — поле не объявлено).
export function readAssetRev(src) {
  const m = String(src).match(ASSET_REV_RE);
  return m ? m[1] : null;
}

// withAssetRev: подставляет ревизию в исходник latest.js. Поле уже есть —
// заменяется значение; нет — строка добавляется сразу после CI_LATEST.
export function withAssetRev(src, rev) {
  const value = String(rev);
  if (!/^[0-9a-f]{8}$/.test(value)) {
    throw new Error(`ревизия должна быть 8 hex-символов, получено: ${value}`);
  }
  const text = String(src);
  if (ASSET_REV_RE.test(text)) {
    return text.replace(ASSET_REV_RE, `window.CI_ASSET_REV = "${value}"`);
  }
  const m = text.match(CI_LATEST_RE);
  if (!m) throw new Error('CI_LATEST не найден в data/latest.js');
  return text.replace(CI_LATEST_RE, `${m[0]}window.CI_ASSET_REV = "${value}";\n`);
}

// updateLatestRev: пересчитывает ревизию по CI_WEEKS из latest.js и пишет файл
// только при изменении. Возвращает {rev, changed}; missing latest.js — no-op.
export function updateLatestRev(rootDir) {
  const latestPath = path.join(rootDir, 'data', 'latest.js');
  if (!existsSync(latestPath)) return { rev: null, changed: false };
  const src = readFileSync(latestPath, 'utf8');
  const { weeks } = readLatestWeeks(src);
  const rev = computeRev(rootDir, weeks);
  const next = withAssetRev(src, rev);
  if (next === src) return { rev, changed: false };
  writeFileSync(latestPath, next, 'utf8');
  return { rev, changed: true };
}
