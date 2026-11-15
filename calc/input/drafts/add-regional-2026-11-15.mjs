import { readFileSync, writeFileSync } from 'node:fs';

const root = 'C:/Users/1/Projects/Cassandra Index';
const WINDOW = { from: '2026-11-09', to: '2026-11-15' };
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

const feeds = [
  ['rg-bnn', 'https://bnn-news.com/feed', 'baltic'],
  ['rg-nova-rs', 'https://nova.rs/feed/', 'balkans'],
  ['rg-kossev', 'https://kossev.info/feed/', 'balkans'],
  ['rg-kursiv', 'https://kz.kursiv.media/en/feed/', 'central-asia'],
  ['rg-timesca', 'https://timesca.com/feed/', 'central-asia'],
  ['rg-uznews', 'https://www.uznews.uz/rss', 'central-asia'],
  ['rg-akipress', 'https://akipress.com/rss/news.rss', 'central-asia'],
  ['rg-civilge', 'https://civil.ge/feed', 'south-caucasus'],
  ['rg-newsam', 'https://news.am/eng/rss/', 'south-caucasus'],
  ['rg-trend-az', 'https://en.trend.az/rss/', 'south-caucasus'],
  // вторая попытка по Балтии и Балканам
  ['rg-bnn-lv', 'https://bnn.lv/feed/', 'baltic'],
  ['rg-lsm', 'https://www.lsm.lv/rss/', 'baltic'],
  ['rg-err', 'https://www.err.ee/rss', 'baltic'],
  ['rg-sputnik-baltics', 'https://sputniknews.lv/rss', 'baltic'],
  ['rg-delfi-lv', 'https://rus.delfi.lv/rss.php', 'baltic'],
  ['rg-albanian-daily', 'https://albaniandailynews.com/rss', 'balkans'],
  ['rg-mia-mk', 'https://mia.mk/feed/', 'balkans'],
  ['rg-hrt', 'https://glashrvatske.hrt.hr/en/rss', 'balkans'],
  ['rg-b92', 'https://www.b92.net/rss/vesti', 'balkans'],
  ['rg-kabar', 'https://en.kabar.kg/rss/', 'central-asia'],
  ['rg-azattyq', 'https://rus.azattyq.org/api/zrqiteuuir', 'central-asia'],
  ['rg-tass_ca', 'https://tass.com/rss/v2.xml', 'central-asia'],
];

function strip(s) {
  return (s || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;|&#0?39;/g, "'").replace(/&#8217;/g, "'")
    .replace(/\s+/g, ' ').trim();
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
const inWindow = (s) => {
  const d = new Date(s);
  if (!s || Number.isNaN(d.getTime())) return false;
  const iso = d.toISOString().slice(0, 10);
  return iso >= WINDOW.from && iso <= WINDOW.to;
};

const kept = [];
for (const [id, url, region] of feeds) {
  try {
    const r = await fetch(url, {
      headers: { 'user-agent': UA, accept: 'application/rss+xml, application/xml, text/xml, */*' },
      signal: AbortSignal.timeout(12000), redirect: 'follow',
    });
    if (!r.ok) { console.log(`${id}: HTTP ${r.status}`); continue; }
    const xml = await r.text();
    const items = parseItems(xml).filter((i) => inWindow(i.date));
    console.log(`${id} (${region}): ${items.length}/${parseItems(xml).length} в окне`);
    for (const i of items) kept.push({ ...i, feed_id: id, region });
  } catch (e) { console.log(`${id}: ERR ${e.name}`); }
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
writeFileSync(path, JSON.stringify(cur, null, 1), 'utf8');
console.log('\nдобавлено', added, 'всего', cur.items.length);

// печать по регионам
for (const region of ['baltic', 'balkans', 'central-asia']) {
  const rows = kept.filter((k) => k.region === region).sort((a, b) => (a.date < b.date ? 1 : -1));
  console.log(`\n### ${region} (${rows.length})`);
  for (const r of rows) console.log(`- ${new Date(r.date).toISOString().slice(0, 10)} | ${r.feed_id} | ${strip(r.title).slice(0, 120)}`);
}
