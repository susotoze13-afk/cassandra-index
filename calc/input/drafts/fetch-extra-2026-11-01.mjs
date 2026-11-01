// Дозбор источников для слепых критериев недели 2026-11-01.
// Только чтение сети и запись черновика в calc/input/drafts/. Пайплайн не трогает.
import { readFileSync, writeFileSync } from 'node:fs';

const WINDOW = { from: '2026-10-26', to: '2026-11-01' };
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

// Целевые фиды под слепые критерии. id начинается с тематического префикса:
// nuc (D2.3/D2.4), log (D1.2/D1.3), dip (D3.1), san (D4.1), inf (D5.3/D5.4/D9.6a),
// mob (D6.1/D6.4/D9.5), osint (D7.3/D7.4), med (D9.1), stock (D9.4)
const feeds = [
  // --- ядерная сфера (D2.3, D2.4) ---
  { id: 'nuc-38north', name: '38 North', region: 'east-asia', url: 'https://www.38north.org/feed/' },
  { id: 'nuc-nknews', name: 'NK News', region: 'east-asia', url: 'https://www.nknews.org/feed/' },
  { id: 'nuc-armscontrol', name: 'Arms Control Association', region: null, url: 'https://www.armscontrol.org/rss/news' },
  { id: 'nuc-bulletin', name: 'Bulletin of the Atomic Scientists', region: null, url: 'https://thebulletin.org/feed/' },
  { id: 'nuc-sipri', name: 'SIPRI', region: null, url: 'https://www.sipri.org/rss/news' },
  { id: 'nuc-iaea', name: 'IAEA', region: null, url: 'https://www.iaea.org/feeds/topstories' },
  { id: 'nuc-janes', name: 'Janes', region: null, url: 'https://www.janes.com/feeds/news' },
  { id: 'nuc-csis-missile', name: 'CSIS Missile Threat', region: null, url: 'https://missilethreat.csis.org/feed/' },
  { id: 'nuc-kcna', name: 'KCNA (via NK News)', region: 'east-asia', url: 'https://www.nknews.org/category/kcna/feed/' },

  // --- учения и военная логистика (D1.2, D1.3) ---
  { id: 'log-nato', name: 'NATO', region: null, url: 'https://www.nato.int/cps/en/natohq/news_rss.htm' },
  { id: 'log-defensenews', name: 'Defense News', region: null, url: 'https://www.defensenews.com/arc/outboundfeeds/rss/' },
  { id: 'log-breakingdefense', name: 'Breaking Defense', region: null, url: 'https://breakingdefense.com/feed/' },
  { id: 'log-militaryland', name: 'Militaryland', region: 'ukraine-moldova', url: 'https://militaryland.net/feed/' },
  { id: 'log-navalnews', name: 'Naval News', region: null, url: 'https://www.navalnews.com/feed/' },
  { id: 'log-armyinform', name: 'ArmyInform (UA)', region: 'ukraine-moldova', url: 'https://armyinform.com.ua/feed/' },
  { id: 'log-mil-ua', name: 'Міноборони України', region: 'ukraine-moldova', url: 'https://www.mil.gov.ua/rss/' },

  // --- дипломатические разрывы (D3.1) ---
  { id: 'dip-state', name: 'US State Dept', region: 'north-america', url: 'https://www.state.gov/rss-feed/press-releases/feed/' },
  { id: 'dip-eeas', name: 'EEAS', region: 'eu-north-europe', url: 'https://www.eeas.europa.eu/rss.xml' },

  // --- санкции (D4.1) ---
  { id: 'san-ofac', name: 'US Treasury OFAC', region: 'north-america', url: 'https://ofac.treasury.gov/rss' },
  { id: 'san-treasury', name: 'US Treasury press', region: 'north-america', url: 'https://home.treasury.gov/system/files/126/ofac.xml' },
  { id: 'san-consilium', name: 'EU Council', region: 'eu-north-europe', url: 'https://www.consilium.europa.eu/en/rss/' },
  { id: 'san-eu-sanctions', name: 'EU sanctions map', region: 'eu-north-europe', url: 'https://www.sanctionsmap.eu/api/v1/rss' },
  { id: 'san-gov-uk', name: 'UK FCDO', region: 'eu-north-europe', url: 'https://www.gov.uk/search/news-and-communications.atom?organisations%5B%5D=foreign-commonwealth-development-office' },

  // --- дезинформация и информсуверенитет (D5.3, D5.4, D9.6a) ---
  { id: 'inf-dfrlab', name: 'DFRLab', region: null, url: 'https://dfrlab.org/feed/' },
  { id: 'inf-isd', name: 'ISD', region: null, url: 'https://www.isdglobal.org/feed/' },
  { id: 'inf-euvsdisinfo', name: 'EUvsDisinfo', region: 'eu-north-europe', url: 'https://euvsdisinfo.eu/feed/' },
  { id: 'inf-netblocks', name: 'NetBlocks', region: null, url: 'https://netblocks.org/feed' },
  { id: 'inf-accessnow', name: 'Access Now', region: null, url: 'https://www.accessnow.org/feed/' },
  { id: 'inf-roskomsvoboda', name: 'Roskomsvoboda', region: 'russia-belarus', url: 'https://roskomsvoboda.org/feed/' },
  { id: 'inf-ooni', name: 'OONI', region: null, url: 'https://ooni.org/reports/index.xml' },
  { id: 'inf-cpj', name: 'CPJ', region: null, url: 'https://cpj.org/feed/' },

  // --- мобилизация / военное положение / кадровые меры (D6.1, D6.4, D9.5) ---
  { id: 'mob-ovdinfo', name: 'OVD-Info', region: 'russia-belarus', url: 'https://ovdinfo.org/rss.xml' },
  { id: 'mob-meduza', name: 'Meduza', region: 'russia-belarus', url: 'https://meduza.io/rss/en/all' },
  { id: 'mob-istories', name: 'iStories', region: 'russia-belarus', url: 'https://istories.media/rss/' },
  { id: 'mob-reform', name: 'Reform.news', region: 'russia-belarus', url: 'https://reform.news/feed' },
  { id: 'mob-rada', name: 'Верховна Рада', region: 'ukraine-moldova', url: 'https://www.rada.gov.ua/rss' },
  { id: 'mob-belarus', name: 'Zerkalo', region: 'russia-belarus', url: 'https://news.zerkalo.io/rss' },

  // --- новые фронты и выход третьих сторон (D7.3, D7.4) ---
  { id: 'osint-acled', name: 'ACLED', region: null, url: 'https://acleddata.com/feed/' },
  { id: 'osint-crisisgroup', name: 'Crisis Group', region: null, url: 'https://www.crisisgroup.org/rss' },
  { id: 'osint-isw', name: 'ISW', region: null, url: 'https://www.understandingwar.org/feeds/all' },
  { id: 'osint-twz', name: 'The War Zone', region: null, url: 'https://www.twz.com/feed' },
  { id: 'osint-longwar', name: 'Long War Journal', region: null, url: 'https://www.longwarjournal.org/feed' },
  { id: 'osint-bellingcat', name: 'Bellingcat', region: null, url: 'https://www.bellingcat.com/feed/' },

  // --- медицинская подготовка (D9.1) ---
  { id: 'med-who', name: 'WHO', region: null, url: 'https://www.who.int/rss-feeds/news-english.xml' },
  { id: 'med-icrc', name: 'ICRC', region: null, url: 'https://www.icrc.org/en/rss/news' },
  { id: 'med-msf', name: 'MSF', region: null, url: 'https://www.msf.org/rss' },

  // --- стратегическое накопление (D9.4) ---
  { id: 'stock-rosrezerv', name: 'Росрезерв', region: 'russia-belarus', url: 'https://rosreserv.gov.ru/rss' },
  { id: 'stock-iea', name: 'IEA', region: null, url: 'https://www.iea.org/rss/news' },
  { id: 'stock-eia', name: 'EIA', region: 'north-america', url: 'https://www.eia.gov/rss/todayinenergy.xml' },
];

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
    const r = await fetch(f.url, {
      headers: { 'user-agent': UA, accept: 'application/rss+xml, application/xml, text/xml, application/atom+xml, */*' },
      signal: AbortSignal.timeout(12000),
      redirect: 'follow',
    });
    if (!r.ok) return { stat: `${f.id}: HTTP ${r.status}`, kept: [], f };
    xml = await r.text();
  } catch (e) {
    return { stat: `${f.id}: ERR ${String(e.message).slice(0, 60)}`, kept: [], f };
  }
  const items = parseItems(xml);
  const kept = items.filter((it) => inWindow(it.date))
    .map((it) => ({ ...it, feed_id: f.id, feed_name: f.name, region: f.region }));
  return { stat: `${f.id}: ok ${kept.length}/${items.length}`, kept, f };
}

const results = [];
const POOL = 6;
let idx = 0;
await Promise.all(Array.from({ length: POOL }, async () => {
  while (idx < feeds.length) results.push(await one(feeds[idx++]));
}));

const kept = results.flatMap((r) => r.kept);
const stat = results.map((r) => r.stat).sort();

writeFileSync('calc/input/drafts/extra-feeds-2026-11-01.json', JSON.stringify({
  window: WINDOW,
  fetched_at: new Date().toISOString(),
  stats: stat,
  items: kept,
}, null, 1), 'utf8');

console.log(stat.join('\n'));
console.log('kept items:', kept.length);
