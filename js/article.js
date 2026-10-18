// js/article.js — страница рубрики «Разбор недели» (articles.html, ADR 0037).
// Читает контейнер выпуска из снапшота (snapshot.article, загружен из
// data/<week>/article.js поверх week.js) и рендерит его клиентски. Чистые швы —
// validateArticle / articleRefs / лексический ворот / согласованность чисел /
// подмножество источников — без DOM, тестируются. Никакого innerHTML — только
// createElement + textContent. Числа индекса/дельты берутся из снапшота, а не из
// прозы (второго источника правды нет): ворота сверяют прозу со снапшотом.

import { t, date } from './i18n.js';
import * as data from './data.js';

// Лексический ворот (ADR 0006 + avoid-список PRD §11.5). Дублирует FORBIDDEN из
// article-build.js (там он CommonJS и на сборочный момент; здесь — сайтовый шов,
// тестируемый). Менять список — в обоих местах.
export const FORBIDDEN = [
  'прогноз', 'вероятн', 'предсказ', 'до войны', 'на грани', 'на пороге',
  'индекс эскалации', 'обратный отсчёт', 'дельта', 'триггер', 'baseline',
  'пайплайн', 'Brier', 'z-score', 'NLP-триггер', 'шаг к',
];

// ---------- Чистые швы ----------

// articleOf(snapshot) → контейнер выпуска | null (нет/битая форма).
export function articleOf(snapshot) {
  const a = snapshot && typeof snapshot === 'object' ? snapshot.article : null;
  if (!a || typeof a !== 'object' || Array.isArray(a)) return null;
  if (typeof a.title !== 'string' || a.title === '') return null;
  return a;
}

// validateArticle(article) → errors[] (контракт ADR 0037 §14). Пусто = валиден.
export function validateArticle(article) {
  const errors = [];
  if (!article || typeof article !== 'object' || Array.isArray(article)) {
    return ['article is not an object'];
  }
  if (typeof article.week !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(article.week)) {
    errors.push('week: required YYYY-MM-DD');
  }
  if (typeof article.title !== 'string' || article.title === '') errors.push('title: required');
  if (typeof article.dek !== 'string') errors.push('dek: required string');
  if (typeof article.disclaimer !== 'string') errors.push('disclaimer: required string');
  if (article.featured_region !== null && typeof article.featured_region !== 'string') {
    errors.push('featured_region: string|null');
  }
  if (!Array.isArray(article.blocks)) {
    errors.push('blocks: array required');
  } else {
    article.blocks.forEach((b, i) => {
      const e = blockErrors(b, `blocks[${i}]`);
      if (e) errors.push(e);
    });
  }
  const s = article.summary;
  if (!s || typeof s !== 'object' || !Number.isInteger(s.index) || !Number.isFinite(s.delta)) {
    errors.push('summary: { index: int, delta: number } required');
  }
  if (!Array.isArray(article.regionRows) || !article.regionRows.every(
    (r) => r && Number.isInteger(r.index) && Number.isFinite(r.delta),
  )) {
    errors.push('regionRows: array of { index, delta } required');
  }
  return errors;
}

function blockErrors(b, prefix) {
  if (!b || typeof b !== 'object') return `${prefix}: object`;
  if (b.t === 'h') {
    return typeof b.text === 'string' && (b.level === 2 || b.level === 3) ? null : `${prefix}: heading`;
  }
  if (b.t === 'p') return segErrors(b.seg, prefix);
  if (b.t === 'ul') {
    if (!Array.isArray(b.items) || !b.items.every((it) => segErrors(it.seg, prefix) === null)) {
      return `${prefix}: items[].seg`;
    }
    return null;
  }
  if (b.t === 'table') {
    const hd = Array.isArray(b.head) && b.head.every((c) => segErrors(c.seg, prefix) === null);
    const rw = Array.isArray(b.rows) && b.rows.every((r) => Array.isArray(r) && r.every((c) => segErrors(c.seg, prefix) === null));
    return hd && rw ? null : `${prefix}: table`;
  }
  if (b.t === 'hr') return null;
  return `${prefix}: unknown block type ${b.t}`;
}

function segErrors(seg, prefix) {
  if (!Array.isArray(seg) || !seg.every((s) => {
    if (!s || typeof s !== 'object') return false;
    if (s.t === 'text' || s.t === 'strong') return typeof s.v === 'string';
    if (s.t === 'link') return typeof s.v === 'string' && typeof s.ref === 'string';
    return false;
  })) {
    return `${prefix}: seg`;
  }
  return null;
}

// articleRefs(article) → массив уникальных r55:id в порядке первого появления.
export function articleRefs(article) {
  const refs = [];
  const seen = new Set();
  for (const b of article?.blocks ?? []) {
    for (const seg of blockSegments(b)) {
      if (seg.t === 'link' && typeof seg.ref === 'string' && !seen.has(seg.ref)) {
        seen.add(seg.ref);
        refs.push(seg.ref);
      }
    }
  }
  return refs;
}

function blockSegments(b) {
  if (!b) return [];
  if (b.t === 'p') return b.seg ?? [];
  if (b.t === 'ul') return (b.items ?? []).flatMap((it) => it.seg ?? []);
  if (b.t === 'table') {
    return [...(b.head ?? []), ...(b.rows ?? []).flat()].flatMap((c) => c.seg ?? []);
  }
  return [];
}

// Скан текста (title/dek/blocks; disclaimer — штатное «не прогноз», не сканируется).
export function lexiconViolations(article) {
  const hay = [article?.title ?? '', article?.dek ?? '']
    .concat((article?.blocks ?? []).flatMap((b) => blockText(b)))
    .join('\n')
    .toLowerCase();
  return FORBIDDEN.filter((w) => hay.includes(w.toLowerCase()));
}

function blockText(b) {
  if (!b) return [];
  if (b.t === 'p') return [segsText(b.seg)];
  if (b.t === 'ul') return (b.items ?? []).map((it) => segsText(it.seg));
  if (b.t === 'h') return [b.text ?? ''];
  if (b.t === 'table') {
    return [...(b.head ?? []), ...(b.rows ?? []).flat()].map((c) => segsText(c.seg));
  }
  return [];
}
function segsText(seg) {
  return (seg ?? []).map((s) => s.v ?? '').join('');
}

// Согласованность чисел прозы со снапшотом (ADR 0037 §10б): global index/delta/покрытие
// и пары {index, delta} региональных строк обязаны совпасть со снапшотом.
export function checkArticleNumbers(article, snapshot) {
  const mismatches = [];
  if (!article?.summary || !snapshot?.global) return { ok: false, mismatches: ['no summary/global'] };
  const s = article.summary;
  if (s.index !== snapshot.global.index) mismatches.push(`index ${s.index} ≠ ${snapshot.global.index}`);
  if (s.delta !== snapshot.global.delta) mismatches.push(`delta ${s.delta} ≠ ${snapshot.global.delta}`);
  if (snapshot.coverageCriteria) {
    if (s.covered !== snapshot.coverageCriteria.covered || s.total !== snapshot.coverageCriteria.total) {
      mismatches.push(`coverage ${s.covered}/${s.total} ≠ ${snapshot.coverageCriteria.covered}/${snapshot.coverageCriteria.total}`);
    }
  }
  const regs = Object.values(snapshot.regions ?? {});
  for (const r of article.regionRows ?? []) {
    const found = regs.some((x) => x.index === r.index && x.delta === r.delta);
    if (!found) mismatches.push(`region ${r.index}/${r.delta} not in snapshot`);
  }
  return { ok: mismatches.length === 0, mismatches };
}

// Подмножество источников (ADR 0037 §10в): каждый r55:id прозы обязан быть в
// снапшоте недели.
export function checkArticleSources(article, snapshot) {
  const ids = new Set((snapshot?.sources ?? []).map((s) => s.id));
  const missing = articleRefs(article)
    .map((ref) => ref.replace(/^r55:/, ''))
    .filter((id) => !ids.has(id));
  return { ok: missing.length === 0, missing };
}

// auditArticle(article, snapshot) → сводка всех ворот.
export function auditArticle(article, snapshot) {
  return {
    contract: validateArticle(article),
    lexicon: lexiconViolations(article),
    numbers: checkArticleNumbers(article, snapshot),
    sources: checkArticleSources(article, snapshot),
  };
}

// ---------- DOM ----------

function resolveRef(ref, snapshot) {
  const id = (ref ?? '').replace(/^r55:/, '');
  const src = (snapshot?.sources ?? []).find((s) => s.id === id);
  return src || null;
}

function sourceLabel(src) {
  if (!src) return '';
  const t = src.title;
  if (t && typeof t === 'object') return t.ru || t.en || '';
  return typeof t === 'string' ? t : '';
}

function appendSegments(parent, segs, snapshot) {
  for (const s of segs ?? []) {
    if (s.t === 'strong') {
      const el = document.createElement('strong');
      el.textContent = s.v;
      parent.appendChild(el);
    } else if (s.t === 'link') {
      const src = resolveRef(s.ref, snapshot);
      if (src && typeof src.url === 'string') {
        const a = document.createElement('a');
        a.href = src.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = s.v;
        parent.appendChild(a);
      } else {
        parent.appendChild(document.createTextNode(s.v));
      }
    } else {
      parent.appendChild(document.createTextNode(s.v));
    }
  }
}

function renderBlocks(host, article, snapshot) {
  for (const b of article.blocks) {
    if (b.t === 'h') {
      const el = document.createElement(b.level === 3 ? 'h3' : 'h2');
      el.textContent = b.text;
      host.appendChild(el);
    } else if (b.t === 'p') {
      const el = document.createElement('p');
      appendSegments(el, b.seg, snapshot);
      host.appendChild(el);
    } else if (b.t === 'ul') {
      const ul = document.createElement('ul');
      for (const it of b.items) {
        const li = document.createElement('li');
        appendSegments(li, it.seg, snapshot);
        ul.appendChild(li);
      }
      host.appendChild(ul);
    } else if (b.t === 'table') {
      const tbl = document.createElement('table');
      const thead = document.createElement('thead');
      const trh = document.createElement('tr');
      for (const c of b.head) {
        const th = document.createElement('th');
        th.scope = 'col';
        appendSegments(th, c.seg, snapshot);
        trh.appendChild(th);
      }
      thead.appendChild(trh);
      tbl.appendChild(thead);
      const tbody = document.createElement('tbody');
      for (const row of b.rows) {
        const tr = document.createElement('tr');
        for (const c of row) {
          const td = document.createElement('td');
          appendSegments(td, c.seg, snapshot);
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      tbl.appendChild(tbody);
      host.appendChild(tbl);
    } else if (b.t === 'hr') {
      host.appendChild(document.createElement('hr'));
    }
  }
}

function renderSources(host, article, snapshot, lang) {
  const refs = articleRefs(article);
  if (!refs.length) return;
  const wrap = document.createElement('section');
  wrap.className = 'article-sources';
  const h = document.createElement('h2');
  h.textContent = t(lang, 'article.sources.title');
  wrap.appendChild(h);
  const ol = document.createElement('ol');
  for (const ref of refs) {
    const src = resolveRef(ref, snapshot);
    const li = document.createElement('li');
    if (src && typeof src.url === 'string') {
      const a = document.createElement('a');
      a.href = src.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = sourceLabel(src) || src.url;
      li.appendChild(a);
    } else {
      li.textContent = ref;
    }
    ol.appendChild(li);
  }
  wrap.appendChild(ol);
  host.appendChild(wrap);
}

export function renderArticle(host, snapshot, article, lang) {
  host.textContent = '';
  const articleEl = document.createElement('article');
  articleEl.className = 'article';

  const title = document.createElement('h1');
  title.textContent = article.title;
  articleEl.appendChild(title);

  if (article.dek) {
    const dek = document.createElement('p');
    dek.className = 'article-dek';
    dek.textContent = article.dek;
    articleEl.appendChild(dek);
  }

  const meta = document.createElement('p');
  meta.className = 'article-meta';
  meta.textContent = `${t(lang, 'article.meta.through')} ${date(lang, snapshot.date ?? snapshot.published)} · ${t(lang, 'article.meta.methodology', { version: article.methodology ?? snapshot.methodology })}`;
  articleEl.appendChild(meta);

  if (article.disclaimer) {
    const disc = document.createElement('blockquote');
    disc.className = 'article-disclaimer';
    disc.textContent = article.disclaimer;
    articleEl.appendChild(disc);
  }

  const body = document.createElement('div');
  body.className = 'article-body';
  renderBlocks(body, article, snapshot);
  articleEl.appendChild(body);

  renderSources(articleEl, article, snapshot, lang);
  host.appendChild(articleEl);
}

function resolveArticleWeek() {
  let weeks = [];
  try {
    if (typeof window !== 'undefined' && Array.isArray(window.CI_ARTICLES)) {
      weeks = [...window.CI_ARTICLES].sort();
    }
  } catch { /* вне браузера */ }
  const q = (() => {
    try { return new URL(location.href).searchParams.get('week'); } catch { return null; }
  })();
  if (q && weeks.includes(q)) return q;
  return weeks[weeks.length - 1] ?? null;
}

export function init() {
  if (typeof document === 'undefined') return;
  const lang = 'ru';
  const host = document.querySelector('[data-role="article"]');
  if (!host) return;
  const week = resolveArticleWeek();
  const snapshot = data.week(week ?? undefined);
  const article = articleOf(snapshot);
  if (!article) {
    const p = document.createElement('p');
    p.className = 'article-empty';
    p.textContent = t(lang, 'article.empty');
    host.appendChild(p);
    return;
  }
  renderArticle(host, snapshot, article, lang);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
