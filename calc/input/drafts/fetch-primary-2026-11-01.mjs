import { writeFileSync } from 'node:fs';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';
const urls = [
  ['dod-releases', 'https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=945&max=30'],
  ['dod-contracts', 'https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=400&Site=945&max=30'],
  ['jp-mod', 'https://www.mod.go.jp/en/rss/index.xml'],
  ['uk-mod', 'https://www.gov.uk/government/organisations/ministry-of-defence.atom'],
  ['uk-defence-news', 'https://www.gov.uk/search/news-and-communications.atom?organisations%5B%5D=ministry-of-defence'],
  ['nato-news', 'https://www.nato.int/cps/en/natohq/rss.htm'],
  ['sipri-news', 'https://www.sipri.org/rss/news'],
  ['iaea-press', 'https://www.iaea.org/newscenter/pressreleases/rss'],
  ['whitehouse', 'https://www.whitehouse.gov/feed/'],
  ['eu-council-consilium', 'https://www.consilium.europa.eu/en/press/press-releases/rss/'],
  ['kremlin', 'http://en.kremlin.ru/events/president/news/feed'],
  ['mfa-ru', 'https://www.mid.ru/en/rss/'],
];
function strip(s) {
  return (s || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
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
    if (!link) { const m = block.match(/<link[^>]*href="([^"]+)"/i); if (m) link = m[1]; }
    const date = tag(block, 'pubDate') || tag(block, 'updated') || tag(block, 'published');
    if (title) out.push({ title, link, date });
  }
  return out;
}
const kept = [];
for (const [id, url] of urls) {
  try {
    const r = await fetch(url, { headers: { 'user-agent': UA, accept: '*/*' }, signal: AbortSignal.timeout(12000), redirect: 'follow' });
    if (!r.ok) { console.log(`${id}: HTTP ${r.status}`); continue; }
    const xml = await r.text();
    const items = parseItems(xml);
    const inw = items.filter((it) => {
      const d = new Date(it.date);
      if (Number.isNaN(d.getTime())) return false;
      const iso = d.toISOString().slice(0, 10);
      return iso >= '2026-10-26' && iso <= '2026-11-01';
    });
    console.log(`${id}: ok items=${items.length} inWindow=${inw.length}`);
    for (const it of inw) {
      console.log(`   ${(it.date || '').slice(5, 22)} | ${it.title.slice(0, 110)}`);
      console.log(`      ${it.link}`);
      kept.push({ ...it, feed_id: id, feed_name: id });
    }
  } catch (e) {
    console.log(`${id}: ERR ${String(e.message).slice(0, 50)}`);
  }
}
writeFileSync('calc/input/drafts/primary-feeds-2026-11-01.json', JSON.stringify(kept, null, 1), 'utf8');
console.log('kept', kept.length);
