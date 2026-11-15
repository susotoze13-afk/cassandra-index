// Сид global.js и trend.js новой недели (образец — коммит сидов 2026-11-08):
// global несёт числа прошлой недели (recalc.previous) и published новой недели;
// trend — 12 точек: прошлая серия без самой старой + место под текущую неделю.
import { readFileSync, writeFileSync } from 'node:fs';

const root = 'C:/Users/1/Projects/Cassandra Index';
const WEEK = '2026-11-15';
const PREV = '2026-11-08';

const header = (w) => `window.CI_DATA = window.CI_DATA || { snapshots: {}, latest: null };\n(function () {\n  var s = window.CI_DATA.snapshots["${w}"] = window.CI_DATA.snapshots["${w}"] || {};\n`;
const footer = '})();\n';
const j = (o) => JSON.stringify(o, null, 2);

// --- global.js ---
const prevGlobalSrc = readFileSync(root + '/data/' + PREV + '/global.js', 'utf8');
const idx = prevGlobalSrc.match(/s\.global = \{\s*"index": (\d+)/);
if (!idx) throw new Error('не нашёл индекс прошлой недели');
const prevIndex = Number(idx[1]);

const globalJs = header(WEEK) + [
  `  s.global = ${j({ index: prevIndex, delta: JSON.parse(prevGlobalSrc.match(/s\.global = (\{[\s\S]*?\});/)[1]).delta })};`,
  `  s.published = ${JSON.stringify(WEEK)};`,
  `  s.through = ${JSON.stringify(WEEK)};`,
  '  s.methodology = "4.0";',
  `  s.regions_taxonomy = ${JSON.stringify(prevGlobalSrc.match(/s\.regions_taxonomy = "([0-9.]+)"/)[1])};`,
  '  s.dataState = "published";',
  '  s.q = 1;',
  '  s.nullWeight = 0;',
].join('\n') + '\n' + footer;
writeFileSync(root + '/data/' + WEEK + '/global.js', globalJs, 'utf8');

// --- trend.js ---
const trendSrc = readFileSync(root + '/data/' + PREV + '/trend.js', 'utf8');
const arr = JSON.parse(trendSrc.match(/s\.trend = (\[[\s\S]*?\]);/)[1]);
if (arr.length !== 12) throw new Error('ожидалось 12 точек прошлой недели, получено ' + arr.length);
const next = arr.slice(1).concat([{ date: WEEK, value: prevIndex }]);
writeFileSync(root + '/data/' + WEEK + '/trend.js', header(WEEK) + `  s.trend = ${j(next)};\n` + footer, 'utf8');

console.log('global.js: предыдущий индекс', prevIndex, '| trend:', next.length, 'точек', next[0].date, '…', next[next.length - 1].date);
