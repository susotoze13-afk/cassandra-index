import { readFileSync } from 'node:fs';
const j = JSON.parse(readFileSync('calc/input/drafts/candidates-2026-11-01.json', 'utf8'));
const clean = (s) => (s || '').replace(/&#0?39;/g, "'").replace(/&apos;/g, "'").replace(/&amp;/g, '+').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
const feeds = process.argv.slice(2);
for (const f of feeds) {
  const hits = j.items.filter((i) => i.feed_id === f);
  console.log(`\n### ${f} (${hits.length})`);
  for (const h of hits) console.log(`- ${String(h.date).slice(0, 10)} | ${clean(h.title).slice(0, 145)}`);
}
