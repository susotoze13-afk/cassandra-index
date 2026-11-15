// Добор кандидатов недели 2026-11-15 через Bing News RSS (Google News RSS в
// среде сбора недоступен). Запросы — по слепым критериям недели; результат —
// calc/input/drafts/bing-2026-11-15.json (окно 2026-11-09…2026-11-15).
import { writeFileSync } from 'node:fs';

const ROOT = 'C:/Users/1/Projects/Cassandra Index';
const OUT = ROOT + '/calc/input/drafts/bing-2026-11-15.json';
const FROM = '2026-11-09';
const TO = '2026-11-15';

// критерий → поисковые фразы
const QUERIES = {
  'D2.4': ['nuclear forces high alert', 'nuclear readiness raised', 'strategic forces combat readiness'],
  'D2.5': ['nuclear de-escalation', 'renounce nuclear rhetoric', 'nuclear arms control talks'],
  'D3.1': ['break diplomatic relations', 'expel diplomats embassy', 'close embassy recall ambassador'],
  'D5.4': ['ease censorship media', 'lift propaganda restrictions', 'media ban lifted'],
  'D6.1': ['martial law declared', 'mobilization decree', 'state of emergency military'],
  'D6.4': ['demobilization announced', 'martial law lifted', 'return evacuees'],
  'D9.1': ['military medics training', 'blood plasma stockpile army', 'field hospital deployed'],
  'D9.5': ['conscription law change', 'draft age changed', 'military service law'],
  'D9.6a': ['internet shutdown country', 'internet censorship law', 'GPS jamming flights'],
  'D9.6b': ['embassy evacuates families', 'diplomats evacuated', 'museum evacuation'],
  'D9.7': ['capital controls lifted', 'airspace reopened', 'statistics publication resumed'],
};

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

const decode = (s) => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d));

const strip = (s) => decode(s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')).replace(/<[^>]+>/g, '').trim();

const items = [];
const stats = [];

for (const [crit, phrases] of Object.entries(QUERIES)) {
  for (const q of phrases) {
    const url = 'https://www.bing.com/news/search?q=' + encodeURIComponent(q) + '&format=rss&setmkt=en-US';
    let xml;
    try {
      const r = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/rss+xml, application/xml' }, signal: AbortSignal.timeout(15000) });
      if (!r.ok) { stats.push(`${crit} ${q}: HTTP ${r.status}`); continue; }
      xml = await r.text();
    } catch (e) {
      stats.push(`${crit} ${q}: ERR ${e.message}`);
      continue;
    }
    const list = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
    let kept = 0;
    for (const raw of list) {
      const get = (tag) => {
        const m = raw.match(new RegExp('<' + tag + '>([\\s\\S]*?)<\\/' + tag + '>'));
        return m ? strip(m[1]) : '';
      };
      const pub = get('pubDate');
      const d = new Date(pub);
      const iso = Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
      if (!iso || iso < FROM || iso > TO) continue;
      const link = get('link');
      const m = link.match(/[?&]url=([^&]+)/);
      const real = m ? decodeURIComponent(m[1]) : link;
      const title = get('title');
      if (!title || !real) continue;
      items.push({ crit, query: q, title, link: real, date: iso, desc: get('description'), source: get('News:Source'), pub });
      kept++;
    }
    stats.push(`${crit} ${q}: ok ${kept}/${list.length}`);
  }
}

const seen = new Set();
const uniq = items.filter((i) => { const k = i.link.replace(/[?#].*$/, ''); if (seen.has(k)) return false; seen.add(k); return true; });
writeFileSync(OUT, JSON.stringify({ window: { from: FROM, to: TO }, fetched_at: new Date().toISOString(), stats, items: uniq }, null, 1) + '\n', 'utf8');
console.log(stats.join('\n'));
console.log(`items: ${uniq.length}`);
