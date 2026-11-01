// Отбор релевантных кандидатов и группировка по темам для ручной разметки.
import { readFileSync, writeFileSync } from 'node:fs';

const src = JSON.parse(readFileSync('calc/input/drafts/candidates-2026-11-01.json', 'utf8'));

const THEMES = [
  ['combat', /\b(strike|strikes|shelling|airstrike|air strike|drone attack|drone|missile|bombard|killed|offensive|front line|frontline|incursion|clash|attack)\b/i],
  ['troops', /\b(troop|brigade|division|battalion|deploy|deployment|reinforce|column|convoy|mobiliz|reservist|garrison)\b/i],
  ['exercises', /\b(exercise|drill|war game|wargame|maneuver|manoeuvre|maneuvers)\b/i],
  ['nuclear', /\b(nuclear|atomic|warhead|ICBM|ballistic|hypersonic|START|New START|test launch|silo|enrichment|uranium|IAEA)\b/i],
  ['diplomacy', /\b(sanction|sanctions|ultimatum|expel|ambassador|embassy|talks|negotiat|summit|ceasefire|truce|deal|agreement|treaty|mediat|resolution|recogni)\b/i],
  ['economy', /\b(oil|brent|crude|gas price|gasoline|gold|bond|yield|market|stocks|index|ruble|currency|inflation|budget|defen[cs]e spending|tariff|export ban|grain|wheat|refinitiv|price cap|sanction)\b/i],
  ['rhetoric', /\b(warns|warning|threat|threatens|vow|promise|retaliat|escalat|doom|inevitab|ready to|prepared to|will respond|red line|propaganda)\b/i],
  ['homefront', /\b(martial law|mobilization|conscription|draft|evacuat|shelter|refugee|civil defen[cs]e|blackout|curfew|state of emergency)\b/i],
  ['thirdparty', /\b(tanker|shipping|vessel|pipeline|strait|hormuz|red sea|houthi|base|basing|troops to|weapons to|arms delivery|arms package|military aid)\b/i],
  ['cyber-info', /\b(cyber|hack|ransomware|malware|internet shutdown|blackout|disinformation|censor|jamming|GPS|spoofing|Starlink|social media ban)\b/i],
  ['precursor', /\b(reserve|stockpile|blood|hospital|beds|medical|draft law|airspace|insurance|war risk|flight cancel|rail|military logistics|ammunition|munitions|fuel reserve|export ban|capital control|default)\b/i],
];

const noise = /^(My |We |I |This is where|Want |Is it |Here are|What |Why |How to|Analysis: The politics|The \d|\d+% of workers)/;

const items = src.items
  .filter((i) => !noise.test(i.title))
  .map((i) => {
    const themes = THEMES.filter(([, re]) => re.test(i.title + ' ' + (i.desc || ''))).map(([t]) => t);
    return { ...i, themes, date: i.date || '' };
  })
  .filter((i) => i.themes.length > 0);

// дедуп по нормализованному заголовку
const seen = new Map();
const uniq = [];
for (const it of items) {
  const key = it.title.toLowerCase().replace(/[^a-zа-я0-9 ]/gi, '').split(' ').slice(0, 7).join(' ');
  if (seen.has(key)) { seen.get(key).dups.push(it.feed_id); continue; }
  it.dups = [];
  seen.set(key, it);
  uniq.push(it);
}

const order = ['combat', 'troops', 'exercises', 'nuclear', 'thirdparty', 'homefront', 'diplomacy', 'rhetoric', 'cyber-info', 'precursor', 'economy'];
const lines = [`# Кандидаты недели 2026-11-01 (окно 25.10–02.11) — ${uniq.length} после дедупа из ${src.items.length}\n`];
for (const t of order) {
  const group = uniq.filter((i) => i.themes.includes(t));
  lines.push(`\n## ${t} (${group.length})\n`);
  for (const i of group) {
    lines.push(`- ${String(i.date).slice(0, 16)} | ${i.feed_id} | ${i.title.replace(/\s+/g, ' ').slice(0, 170)}\n  ${i.link}`);
    if (i.desc) lines.push(`  > ${i.desc.replace(/\s+/g, ' ').slice(0, 220)}`);
  }
}
writeFileSync('calc/input/drafts/shortlist-2026-11-01.md', lines.join('\n'), 'utf8');
writeFileSync('calc/input/drafts/shortlist-2026-11-01.json', JSON.stringify(uniq, null, 1), 'utf8');
console.log('uniq', uniq.length);
for (const t of order) console.log(t, uniq.filter((i) => i.themes.includes(t)).length);
