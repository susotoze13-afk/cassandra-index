// Сбор кандидатов-источников для недели 2026-11-01 (окно 2026-10-26…2026-11-01).
// Только чтение сети и запись черновика в calc/input/drafts/. Не влияет на пайплайн.
import { readFileSync, writeFileSync } from 'node:fs';

const WINDOW = { from: '2026-10-25', to: '2026-11-02' };
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

const feeds = JSON.parse(readFileSync('calc/input/discovery/feeds.json', 'utf8')).feeds;

const extraFeeds = [
  { id: 'xx-aa', name: 'Anadolu', region: null, url: 'https://www.aa.com.tr/en/rss/default?cat=world' },
  { id: 'xx-reuters-world', name: 'Reuters (via Google News)', region: null, url: 'https://news.google.com/rss/search?q=site:reuters.com+world&hl=en-US&gl=US&ceid=US:en' },
  { id: 'xx-ap', name: 'AP (via Google News)', region: null, url: 'https://news.google.com/rss/search?q=site:apnews.com&hl=en-US&gl=US&ceid=US:en' },
  { id: 'xx-isw', name: 'ISW (via Google News)', region: null, url: 'https://news.google.com/rss/search?q=site:understandingwar.org&hl=en-US&gl=US&ceid=US:en' },
  { id: 'xx-ukrinform', name: 'Ukrinform', region: 'ukraine-moldova', url: 'https://www.ukrinform.net/rss/block-lastnews' },
  { id: 'xx-kyivindep', name: 'Kyiv Independent', region: 'ukraine-moldova', url: 'https://kyivindependent.com/feed/' },
  { id: 'xx-moscowtimes', name: 'Moscow Times', region: 'russia-belarus', url: 'https://www.themoscowtimes.com/rss/news' },
  { id: 'xx-tass', name: 'TASS', region: 'russia-belarus', url: 'https://tass.com/rss/v2.xml' },
  { id: 'xx-iran-intl', name: 'Iran International', region: 'middle-east', url: 'https://www.iranintl.com/en/feed' },
  { id: 'xx-jpost', name: 'Jerusalem Post', region: 'middle-east', url: 'https://www.jpost.com/rss/rssfeedsfrontpage.aspx' },
  { id: 'xx-arabnews', name: 'Arab News', region: 'middle-east', url: 'https://www.arabnews.com/rss.xml' },
  { id: 'xx-cnn', name: 'CNN World', region: null, url: 'http://rss.cnn.com/rss/edition_world.rss' },
  { id: 'xx-wapo', name: 'Washington Post World', region: 'north-america', url: 'https://feeds.washingtonpost.com/rss/world' },
  { id: 'xx-politico', name: 'Politico EU', region: 'eu-north-europe', url: 'https://www.politico.eu/feed/' },
  { id: 'xx-euronews', name: 'Euronews', region: 'eu-north-europe', url: 'https://www.euronews.com/rss?level=theme&name=news' },
  { id: 'xx-dw', name: 'DW', region: 'eu-north-europe', url: 'https://rss.dw.com/rdf/rss-en-all' },
  { id: 'xx-straits', name: 'Straits Times', region: 'east-asia', url: 'https://www.straitstimes.com/news/world/rss.xml' },
  { id: 'xx-japantimes', name: 'Japan Times', region: 'east-asia', url: 'https://www.japantimes.co.jp/feed/' },
  { id: 'xx-scmp-asia', name: 'SCMP Asia', region: 'east-asia', url: 'https://www.scmp.com/rss/4/feed' },
  { id: 'xx-dawn', name: 'Dawn (Pakistan)', region: 'south-asia', url: 'https://www.dawn.com/feeds/home' },
  { id: 'xx-hindustan', name: 'Hindustan Times', region: 'south-asia', url: 'https://www.hindustantimes.com/feeds/rss/world-news/rssfeed.xml' },
  { id: 'xx-alarabiya', name: 'Al Arabiya', region: 'middle-east', url: 'https://english.alarabiya.net/tools/rss' },
  { id: 'xx-tass-en', name: 'BelTA EN', region: 'russia-belarus', url: 'https://eng.belta.by/rss' },
  { id: 'xx-unian', name: 'UNIAN', region: 'ukraine-moldova', url: 'https://www.unian.info/rss/' },
  { id: 'xx-reliefweb', name: 'ReliefWeb', region: null, url: 'https://reliefweb.int/updates/rss.xml' },
  { id: 'xx-un-news', name: 'UN News', region: null, url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml' },
  { id: 'xx-oilprice', name: 'OilPrice', region: null, url: 'https://oilprice.com/rss/main' },
  { id: 'xx-cnbc-markets', name: 'CNBC Markets', region: null, url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html' },
];

const queries = [
  'war escalation', 'nuclear weapons alert', 'military exercises', 'mobilization',
  'sanctions package', 'ceasefire talks', 'troop deployment', 'missile strikes',
  'oil price surge', 'gold record high', 'airspace closed', 'cyberattack critical infrastructure',
  'evacuation border', 'martial law', 'arms deliveries', 'internet shutdown',
];

const searchFeeds = queries.map((q) => ({
  id: 'q-' + q.replace(/\s+/g, '-'),
  name: 'GoogleNews: ' + q,
  region: null,
  url: 'https://news.google.com/rss/search?q=' + encodeURIComponent(q + ' when:7d') + '&hl=en-US&gl=US&ceid=US:en',
}));

const all = [...feeds, ...extraFeeds, ...searchFeeds];

function strip(s) {
  return (s || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
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

async function one(f) {
  let xml = '';
  try {
    const r = await fetch(f.url, { headers: { 'user-agent': UA, accept: 'application/rss+xml, application/xml, text/xml, */*' }, signal: AbortSignal.timeout(12000) });
    if (!r.ok) return { stat: `${f.id}: HTTP ${r.status}`, kept: [] };
    xml = await r.text();
  } catch (e) {
    return { stat: `${f.id}: ERR ${e.message}`, kept: [] };
  }
  const items = parseItems(xml);
  const kept = items.filter((it) => inWindow(it.date))
    .map((it) => ({ ...it, feed_id: f.id, feed_name: f.name, region: f.region }));
  return { stat: `${f.id}: ok ${kept.length}/${items.length}`, kept };
}

const results = [];
const POOL = 8;
let idx = 0;
await Promise.all(Array.from({ length: POOL }, async () => {
  while (idx < all.length) {
    const f = all[idx++];
    results.push(await one(f));
  }
}));

const kept = results.flatMap((r) => r.kept);
const stat = results.map((r) => r.stat).sort();

writeFileSync('calc/input/drafts/candidates-2026-11-01.json', JSON.stringify({
  window: WINDOW,
  fetched_at: new Date().toISOString(),
  stats: stat,
  items: kept,
}, null, 1), 'utf8');

console.log(stat.join('\n'));
console.log('kept items:', kept.length);
