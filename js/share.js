// js/share.js — share-карточка 1200×630 (История 21, R80): canvas → PNG → download,
// Web Share API с файловой шарой где поддерживается (Решение п.9).
// Чистые швы (cardLayout, cardColors, shareFileName) — без DOM/canvas, тестируются.
// Модуль сам биндится к [data-role="share-btn"] — app.js не правим.

import { t, date } from './i18n.js';
import * as risk from './risk.js';
import * as region from './region.js';
import * as data from './data.js';
import { formatDelta, deltaArrow } from './sections/hero.js';
import { resolveLang, parseWeekParam } from './ui.js';

export const CARD_W = 1200;
export const CARD_H = 630;

// Палитра карточки — HEX тех же токенов §14.4, что и у сайта (canvas не умеет var()).
const COLORS = {
  bg: '#0A0E12',
  text: '#E6EDF3',
  secondary: '#8B949E',
  muted: '#6B7280',
  accent: '#58A6FF',
  border: '#232B36',
  states: {
    calm: '#3FB950',
    tense: '#A8B06B',
    danger: '#D29922',
    very: '#D17F52',
    critical: '#F85149',
    extreme: '#A83A3A',
  },
};

export function cardColors() {
  return COLORS;
}

// Тон '--state-*'/'--text-secondary' → HEX из палитры карточки.
function resolveTone(tone) {
  if (!tone) return COLORS.secondary;
  if (tone.startsWith('--state-')) return COLORS.states[tone.slice(8)] ?? COLORS.secondary;
  if (tone === '--text-secondary') return COLORS.secondary;
  return COLORS.secondary;
}

// cardLayout(lang, snapshot, regionId) → упорядоченные элементы карточки (образец R80):
// CASSANDRA INDEX / «72 / 100 · VERY DANGEROUS» / «↑ +6 THIS WEEK» /
// «Your region: Europe · 74 / 100» (только регион, без города) / дата / дисклеймер.
// Нет глобального индекса → null (карточку не собираем). Без обратного отсчёта (§79).
export function cardLayout(lang, snapshot, regionId) {
  const g = snapshot?.global;
  if (!g) return null;
  const gStatus = risk.status(g.index);
  const items = [
    { kind: 'brand', text: t(lang, 'share.brand') },
    {
      kind: 'index',
      text: `${g.index} / 100`,
      status: gStatus ? t(lang, `status.${gStatus}`).toUpperCase() : '',
      tone: risk.tone(gStatus),
    },
    {
      kind: 'delta',
      text: `${deltaArrow(g.delta)} ${formatDelta(g.delta)} ${t(lang, 'hero.week.change').toUpperCase()}`,
      tone: risk.deltaTone(g.delta),
    },
  ];
  const rdata = regionId ? snapshot.regions?.[regionId] : null;
  if (rdata) {
    const reg = region.get(regionId);
    if (reg) items.push({ kind: 'region', text: t(lang, 'share.region', { name: reg.name[lang], index: rdata.index }) });
  }
  items.push({ kind: 'date', text: date(lang, snapshot.published) });
  items.push({ kind: 'disclaimer', text: t(lang, 'footer.disclaimer') });
  return items;
}

export function shareFileName(week) {
  return week ? `cassandra-index-${week}.png` : 'cassandra-index.png';
}

// ---------- Canvas-часть (только браузер) ----------

function font(size, weight = 400) {
  return `${weight} ${size}px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
}

// drawCard(ctx, items, colors) — рисует layout на контексте CARD_W×CARD_H.
// Крупные контрастные элементы — читаема в маленьких превью (R80).
export function drawCard(ctx, items, colors = COLORS) {
  const W = CARD_W;
  const H = CARD_H;
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, W, H);

  const byKind = Object.fromEntries(items.map((i) => [i.kind, i]));
  const pad = 72;

  // Левая цветная полоса в тоне статуса — узнаваемость в превью.
  const tone = resolveTone(byKind.index?.tone);
  ctx.fillStyle = tone;
  ctx.fillRect(0, 0, 14, H);

  ctx.textBaseline = 'alphabetic';

  // Дата — справа сверху.
  if (byKind.date) {
    ctx.font = font(30);
    ctx.fillStyle = colors.muted;
    ctx.textAlign = 'right';
    ctx.fillText(byKind.date.text, W - pad, pad + 20);
  }

  // Бренд.
  ctx.textAlign = 'left';
  ctx.font = font(32, 700);
  ctx.fillStyle = colors.accent;
  const brandText = (byKind.brand?.text ?? '').split('').join(' ');
  ctx.fillText(brandText, pad, 140);

  // Индекс — доминирующий элемент.
  let y = 350;
  if (byKind.index) {
    ctx.font = font(170, 700);
    ctx.fillStyle = colors.text;
    ctx.fillText(byKind.index.text, pad, y);
  }

  // Статус — строкой ниже, в цвете состояния.
  y = 440;
  if (byKind.index?.status) {
    ctx.font = font(56, 700);
    ctx.fillStyle = tone;
    ctx.fillText(byKind.index.status, pad, y);
  }

  // Δ за неделю — в тоне направления.
  y = 512;
  if (byKind.delta) {
    ctx.font = font(44, 700);
    ctx.fillStyle = resolveTone(byKind.delta.tone);
    ctx.fillText(byKind.delta.text, pad, y);
  }

  // Региональная строка.
  y = 572;
  if (byKind.region) {
    ctx.font = font(34);
    ctx.fillStyle = colors.secondary;
    ctx.fillText(byKind.region.text, pad, y);
  }

  // Дисклеймер — снизу, мелко, но одной строкой.
  if (byKind.disclaimer) {
    ctx.font = font(22);
    ctx.fillStyle = colors.muted;
    ctx.fillText(byKind.disclaimer.text, pad, H - 32);
  }
}

// ---------- DOM-часть: генерация, скачивание, Web Share API ----------

function currentRegion() {
  try {
    const tz = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : null;
    return region.current() ?? region.detect(tz);
  } catch {
    return region.current();
  }
}

function announce(lang) {
  const live = document.querySelector('[data-role="a11y-live"]');
  if (live) live.textContent = t(lang, 'share.announce');
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// buildCard() → Promise<Blob> — canvas 1200×630 → PNG-блоб текущего снапшота.
export function buildCard() {
  const lang = resolveLang();
  const snapshot = data.week(parseWeekParam(location.search) ?? undefined);
  const items = cardLayout(lang, snapshot, currentRegion());
  if (!items) return Promise.resolve(null);
  const canvas = document.createElement('canvas');
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext('2d');
  drawCard(ctx, items, COLORS);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}

// shareSnapshot() — Web Share API с файловой шарой, где есть; иначе скачивание PNG.
export async function shareSnapshot() {
  const week = parseWeekParam(location.search) ?? data.latest();
  const filename = shareFileName(week);
  const blob = await buildCard();
  if (!blob) return false;
  const file = new File([blob], filename, { type: 'image/png' });
  const nav = typeof navigator !== 'undefined' ? navigator : null;
  if (nav?.canShare?.({ files: [file] }) && nav.share) {
    try {
      await nav.share({ files: [file], title: t(resolveLang(), 'share.brand') });
      announce(resolveLang());
      return true;
    } catch (err) {
      if (err && err.name === 'AbortError') return true; // пользователь отменил — не ошибка
      // иначе — фолбэк на скачивание ниже
    }
  }
  download(blob, filename);
  announce(resolveLang());
  return true;
}

// initShare() — биндит кнопку «Поделиться» (делегирование: кнопку пересоздаёт
// i18n-перерисовка, поэтому слушатель — на document). Гард на уровне модуля:
// повторный вызов и пересоздание кнопки второй слушатель не вешают.
let shareBound = false;

export function initShare() {
  if (typeof document === 'undefined' || shareBound) return;
  shareBound = true;
  document.addEventListener('click', (e) => {
    const btn = e.target.closest?.('[data-role="share-btn"]');
    if (btn) shareSnapshot();
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShare);
  } else {
    initShare();
  }
}
