// Дозбор №2: фиды/поисковые RSS, которые могут дать вторую независимую сторону
// по сюжетам недели 2026-11-01 (DPRK тест, риторика Пентагона, медэвакуация,
// интернет-шатдауны, дипломатические демарши, санкции, мобилизация).
import { writeFileSync } from 'node:fs';

const WINDOW = { from: '2026-10-26', to: '2026-11-01' };
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

const feeds = [
  // поисковые RSS (если живы — дают «вторую сторону» по сюжету)
  { id: 'srch-bing-korea', name: 'Bing News: DPRK test', region: 'east-asia', url: 'https://www.bing.com/news/search?q=north+korea+cluster+bomb+warhead+test&format=rss' },
  { id: 'srch-bing-pentagon', name: 'Bing News: Pentagon rhetoric', region: null, url: 'https://www.bing.com/news/search?q=pentagon+europeans+cool+rhetoric+russia&format=rss' },
  { id: 'srch-bing-medevac', name: 'Bing News: drone medevac', region: 'ukraine-moldova', url: 'https://www.bing.com/news/search?q=ukraine+drone+evacuate+wounded+soldiers&format=rss' },
  { id: 'srch-bing-shutdown', name: 'Bing News: internet shutdown', region: null, url: 'https://www.bing.com/news/search?q=internet+shutdown+exams+access+now&format=rss' },
  { id: 'srch-gn-korea', name: 'GN: DPRK test', region: 'east-asia', url: 'https://news.google.com/rss/search?q=north+korea+cluster+bomb+warhead+when:7d&hl=en-US&gl=US&ceid=US:en' },
  { id: 'srch-gn-pentagon', name: 'GN: Pentagon rhetoric', region: null, url: 'https://news.google.com/rss/search?q=pentagon+europe+rhetoric+russia+when:7d&hl=en-US&gl=US&ceid=US:en' },
  { id: 'srch-gn-medevac', name: 'GN: drone medevac', region: 'ukraine-moldova', url: 'https://news.google.com/rss/search?q=ukraine+drone+evacuation+wounded+when:7d&hl=en-US&gl=US&ceid=US:en' },
  { id: 'srch-gn-shutdown', name: 'GN: internet shutdown', region: null, url: 'https://news.google.com/rss/search?q=internet+shutdown+exam+when:7d&hl=en-US&gl=US&ceid=US:en' },
  { id: 'srch-ynet-korea', name: 'GN: DPRK weapons test', region: 'east-asia', url: 'https://news.google.com/rss/search?q=%22north+korea%22+%22weapon+system%22+when:7d&hl=en-US&gl=US&ceid=US:en' },

  // украинские/военные фиды (медэвакуация, логистика, фронт)
  { id: 'mil-kyivpost', name: 'Kyiv Post', region: 'ukraine-moldova', url: 'https://www.kyivpost.com/feed' },
  { id: 'mil-militarnyi', name: 'Militarnyi', region: 'ukraine-moldova', url: 'https://mil.in.ua/en/feed/' },
  { id: 'mil-defensepost', name: 'The Defense Post', region: null, url: 'https://thedefensepost.com/feed/' },
  { id: 'mil-pravda', name: 'Ukrainska Pravda', region: 'ukraine-moldova', url: 'https://www.pravda.com.ua/rss/' },
  { id: 'mil-armyrecognition', name: 'Army Recognition', region: null, url: 'https://armyrecognition.com/rss/news' },

  // восточная Азия / Корея
  { id: 'ea-koreatimes', name: 'Korea Times', region: 'east-asia', url: 'https://www.koreatimes.co.kr/www/rss/rss.xml' },
  { id: 'ea-koreaherald', name: 'Korea Herald', region: 'east-asia', url: 'https://www.koreaherald.com/common/rss_xml.php' },
  { id: 'ea-taipeitimes', name: 'Taipei Times', region: 'east-asia', url: 'https://www.taipeitimes.com/xml/index.rss' },
  { id: 'ea-38north2', name: '38 North (alt)', region: 'east-asia', url: 'https://www.38north.org/feed/atom/' },
  { id: 'ea-nkpost', name: 'NK Post', region: 'east-asia', url: 'https://www.nknews.org/feed/' },

  // Иран / Ближний Восток (NPT, Hormuz)
  { id: 'me-tehran-times', name: 'Tehran Times', region: 'middle-east', url: 'https://www.tehrantimes.com/rss' },
  { id: 'me-mehr', name: 'Mehr News', region: 'middle-east', url: 'https://en.mehrnews.com/rss' },
  { id: 'me-tasnim', name: 'Tasnim', region: 'middle-east', url: 'https://www.tasnimnews.com/en/rss/feed/0/8/0/last-news' },
  { id: 'me-iranpress', name: 'Iran Press', region: 'middle-east', url: 'https://iranpress.com/rss' },
  { id: 'me-mideast-eye', name: 'Middle East Eye', region: 'middle-east', url: 'https://www.middleeasteye.net/rss' },
  { id: 'me-arabnews2', name: 'Arab News (ME)', region: 'middle-east', url: 'https://www.arabnews.com/cat/2/rss.xml' },
  { id: 'me-thenational', name: 'The National', region: 'middle-east', url: 'https://www.thenationalnews.com/arc/outboundfeeds/rss/' },

  // Россия/Беларусь (мобилизация, кадровые меры, информсуверенитет)
  { id: 'ru-ria', name: 'RIA', region: 'russia-belarus', url: 'https://ria.ru/export/rss2/archive/index.xml' },
  { id: 'ru-iz', name: 'Izvestia', region: 'russia-belarus', url: 'https://iz.ru/xml/rss/all.xml' },
  { id: 'ru-kp', name: 'KP', region: 'russia-belarus', url: 'https://www.kp.ru/rss/allsections.xml' },
  { id: 'ru-lenta', name: 'Lenta', region: 'russia-belarus', url: 'https://lenta.ru/rss/news' },
  { id: 'ru-gazeta', name: 'Gazeta.ru', region: 'russia-belarus', url: 'https://www.gazeta.ru/export/rss/lenta.xml' },
  { id: 'ru-belta', name: 'BelTA', region: 'russia-belarus', url: 'https://www.belta.by/rss' },
  { id: 'ru-sb', name: 'SB.by', region: 'russia-belarus', url: 'https://www.sb.by/rss/' },
  { id: 'ru-currenttime', name: 'Current Time', region: 'russia-belarus', url: 'https://www.currenttime.tv/api/zrqiteqqi_1' },

  // Южная Азия / прочие (дипдемарши, санкции)
  { id: 'sa-hindustantimes', name: 'Hindustan Times', region: 'south-asia', url: 'https://www.hindustantimes.com/feeds/rss/world-news/rssfeed.xml' },
  { id: 'sa-indianexpress', name: 'Indian Express', region: 'south-asia', url: 'https://indianexpress.com/section/world/feed/' },
  { id: 'sa-thewire', name: 'The Wire', region: 'south-asia', url: 'https://thewire.in/rss' },
  { id: 'sa-dawn2', name: 'Dawn (world)', region: 'south-asia', url: 'https://www.dawn.com/feeds/world' },

  // Африка/Латинская Америка (санкции, демарши)
  { id: 'af-allafrica2', name: 'AllAfrica', region: 'africa', url: 'https://allafrica.com/tools/headlines/rdf/latest/headlines.rdf' },
  { id: 'af-radio-tamazuj', name: 'Radio Tamazuj', region: 'africa', url: 'https://www.radiotamazuj.org/en/feed' },
  { id: 'lat-folha', name: 'Folha (world)', region: 'north-america', url: 'https://feeds.folha.uol.com.br/mundo/rss.xml' },
  { id: 'lat-batimes', name: 'Buenos Aires Times', region: 'north-america', url: 'https://www.batimes.com.ar/feed' },

  // Сеть/цензура/шатдауны
  { id: 'net-engadget', name: 'Engadget', region: null, url: 'https://www.engadget.com/rss.xml' },
  { id: 'net-theregister', name: 'The Register', region: null, url: 'https://www.theregister.com/headlines.atom' },
  { id: 'net-arstechnica', name: 'Ars Technica', region: null, url: 'https://feeds.arstechnica.com/arstechnica/index' },
  { id: 'net-bleeping', name: 'BleepingComputer', region: null, url: 'https://www.bleepingcomputer.com/feed/' },
  { id: 'net-cyberscoop', name: 'CyberScoop', region: null, url: 'https://cyberscoop.com/feed/' },
  { id: 'net-recorded', name: 'Recorded Future News', region: null, url: 'https://therecord.media/feed' },

  // Госсектор/санкции/договоры
  { id: 'gov-state2', name: 'US State (all)', region: 'north-america', url: 'https://www.state.gov/rss-feed/all/feed/' },
  { id: 'gov-un', name: 'UN News (all)', region: null, url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml' },
  { id: 'gov-eu-commission', name: 'EU Commission', region: 'eu-north-europe', url: 'https://ec.europa.eu/commission/presscorner/api/rss?language=en' },
  { id: 'gov-eu-council', name: 'EU Council (alt)', region: 'eu-north-europe', url: 'https://www.consilium.europa.eu/en/rss/pressreleases.ashx' },
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
    if (!r.ok) return { stat: `${f.id}: HTTP ${r.status}`, kept: [] };
    xml = await r.text();
  } catch (e) {
    return { stat: `${f.id}: ERR ${String(e.message).slice(0, 50)}`, kept: [] };
  }
  const items = parseItems(xml);
  const kept = items.filter((it) => inWindow(it.date))
    .map((it) => ({ ...it, feed_id: f.id, feed_name: f.name, region: f.region }));
  return { stat: `${f.id}: ok ${kept.length}/${items.length}`, kept };
}

const results = [];
let idx = 0;
await Promise.all(Array.from({ length: 8 }, async () => {
  while (idx < feeds.length) results.push(await one(feeds[idx++]));
}));

const kept = results.flatMap((r) => r.kept);
const stat = results.map((r) => r.stat).sort();
writeFileSync('calc/input/drafts/extra-feeds2-2026-11-01.json', JSON.stringify({
  window: WINDOW, fetched_at: new Date().toISOString(), stats: stat, items: kept,
}, null, 1), 'utf8');
console.log(stat.join('\n'));
console.log('kept items:', kept.length);
