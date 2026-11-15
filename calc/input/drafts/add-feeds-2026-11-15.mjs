// Дополнительные ленты для недели 2026-11-15: кластеры, которых не хватало
// (B-state-media вне РФ/Турции, primary по киберу, A-mainstream по Ближнему Востоку).
import { readFileSync, writeFileSync } from 'node:fs';

const root = 'C:/Users/1/Projects/Cassandra Index';
const WINDOW = { from: '2026-11-09', to: '2026-11-15' };
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

const feeds = [
  { id: 'xt-globaltimes', name: 'Global Times', region: 'east-asia', url: 'https://www.globaltimes.cn/rss/outbrain.xml' },
  { id: 'xt-mee', name: 'Middle East Eye', region: 'middle-east', url: 'https://www.middleeasteye.net/rss' },
  { id: 'xt-amwaj', name: 'Amwaj.media', region: 'middle-east', url: 'https://amwaj.media/rss' },
  { id: 'xt-cisa', name: 'CISA Advisories', region: 'north-america', url: 'https://www.cisa.gov/news.xml' },
  { id: 'xt-unsc', name: 'UN News Peace & Security', region: null, url: 'https://news.un.org/feed/subscribe/en/news/topic/peace-and-security/feed.xml' },
];

function strip(s) {
  return (s || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
}
function tag(xml, name) {
  const m = xml.match(new RegExp('<' + name + '[^>]*>([\\s\\S]*?)</' + name + '>', 'i'));
  return m ? strip(m[1]) : '';
}
function parseItems(xml) {
  const out = [];
  const blocks = xml.split(/<item[\s>]/i).slice(1).map((b) => '<item ' + b);
  const entries = xml.split(/<entry[\s>]/i).slice(1).map((b) => '<entry ' + b);
  for (const raw of [...blocks, ...entries]) {
    const block = raw.split(/<\/item>|<\/entry>/i)[0];
    const title = tag(block, 'title');
    let link = tag(block, 'link');
    if (!link) {
      const m = block.match(/<link[^>]*href="([^"]+)"/i);
      if (m) link = m[1];
    }
    const date = tag(block, 'pubDate') || tag(block, 'updated') || tag(block, 'published') || tag(block, 'dc:date');
    const desc = tag(block, 'description') || tag(block, 'summary') || tag(block, 'content');
    if (title) out.push({ title, link, date, desc: desc.slice(0, 400) });
  }
  return out;
}
function inWindow(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return false;
  const iso = d.toISOString().slice(0, 10);
  return iso >= WINDOW.from && iso <= WINDOW.to;
}

const kept = [];
for (const f of feeds) {
  try {
    const r = await fetch(f.url, {
      headers: { 'user-agent': UA, accept: 'application/rss+xml, application/xml, text/xml, */*' },
      signal: AbortSignal.timeout(15000),
      redirect: 'follow',
    });
    if (!r.ok) { console.log(`${f.id}: HTTP ${r.status}`); continue; }
    const xml = await r.text();
    const items = parseItems(xml).filter((it) => inWindow(it.date));
    console.log(`${f.id}: kept ${items.length}`);
    for (const it of items) kept.push({ ...it, feed_id: f.id, feed_name: f.name, region: f.region });
  } catch (e) {
    console.log(`${f.id}: ERR ${e.message}`);
  }
}

const path = root + '/calc/input/drafts/candidates-2026-11-15.json';
const cur = JSON.parse(readFileSync(path, 'utf8'));
const seen = new Set(cur.items.map((i) => i.link));
let added = 0;
for (const it of kept) {
  if (!it.link || seen.has(it.link)) continue;
  seen.add(it.link);
  cur.items.push(it);
  added++;
}
cur.stats.push(...feeds.map((f) => `${f.id}: merged`));
writeFileSync(path, JSON.stringify(cur, null, 1), 'utf8');
console.log('added', added, 'total', cur.items.length);
