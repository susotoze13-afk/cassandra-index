// Секция «История и источники» (регистрируется как 'history'): выбор недели из
// доступных снапшотов (≥6), просмотр старого снапшота с пометкой и датами,
// раскрытие смены версии методологии (§8.5), демо-разборы «где ошиблись / где
// были правы / где неопределённость» (§8.4), список источников недели.
// Плюс футер: «Следующая публикация» — ближайший вторник 12:00 UTC, показанный
// в локальном времени через Intl (§9, R62.1).
// Чистые швы (nextPublication, publicationLabel, methodologyNote, DEMO_REVIEWS,
// reviewFor) — без DOM, тестируются.

import { t, date } from '../i18n.js';
import * as data from '../data.js';
import { isHistorical, historyBannerText } from './states.js';
import { signedDelta, arrowOf } from './trend.js';
import { statusLabel } from './regions.js';
import { deltaClass } from '../ui.js';

// Смена недели — оркестрация в app.js (владелец состояния и URL ?week=):
// секция только инициирует событие ci:weekchange {week}.

const LOCALES = { ru: 'ru-RU', en: 'en-US' };

// Ближайшая публикация — следующий вторник 12:00 UTC (§9). Возвращает момент
// времени; отображение в локальном времени — через publicationLabel.
export function nextPublication(from = new Date()) {
  const d = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate(), 12, 0, 0));
  const add = (2 - d.getUTCDay() + 7) % 7; // 2 = вторник
  if (add === 0 && from.getTime() >= d.getTime()) {
    d.setUTCDate(d.getUTCDate() + 7); // вторник после 12:00 UTC — следующая неделя
  } else {
    d.setUTCDate(d.getUTCDate() + add);
  }
  return d;
}

// «вторник, 09:05» / «Tuesday, 09:05» — локальный формат через Intl (R62.1).
// Собирается из formatToParts, чтобы не зависеть от суффиксов ICU.
export function publicationLabel(lang, d) {
  const locale = LOCALES[lang] ?? LOCALES.ru;
  const parts = new Intl.DateTimeFormat(locale, {
    weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(d);
  const get = (type) => (parts.find((p) => p.type === type) ?? {}).value ?? '';
  return `${get('weekday')}, ${get('hour')}:${get('minute')}`;
}

// §8.5: смена версии методологии между просматриваемой неделей и текущей
// раскрывается строкой; совпадающие или неизвестные версии — без строки.
export function methodologyNote(lang, viewed, current) {
  if (!viewed || !current || viewed === current) return '';
  return t(lang, 'history.methodology.note', { viewed, current });
}

// §8.4: демо-разборы недель — где ошиблись / где были правы / где неопределённость.
export const DEMO_REVIEWS = [
  {
    week: '2026-08-16',
    wrong: {
      ru: 'Неделя 16 августа: косвенные индикаторы подготовки сформировали ложный кластер — необычные госзакупки оказались плановыми сезонными закупками, а не сигналом подготовки. Вклад косвенных сигналов был ограничен потолком модели, поэтому индекс вырос меньше, чем предполагал первичный сигнал.',
      en: 'Week of 16 August: the shadow preparation indicators formed a false cluster — the unusual public procurements turned out to be routine seasonal purchases, not preparation signals. The shadow-signal ceiling limited their contribution, so the index rose less than the raw signal implied.',
    },
    right: {
      ru: 'Неделя 16 августа: рост индекса на +4 пункта корректно отразил подтверждённое наращивание военной логистики у театра — сигнал был независимо подтверждён спутниковыми снимками и двумя кластерами источников.',
      en: 'Week of 16 August: the +4 point rise correctly reflected confirmed military logistics build-up near the theatre — the signal was independently confirmed by satellite imagery and two distinct source clusters.',
    },
    uncertain: {
      ru: 'Неделя 16 августа: остаётся неопределённость вокруг транспортно-страховых сигналов: рост страховых надбавок частично идёт из аффилированных с одной из сторон кластеров, и независимого рыночного подтверждения недостаточно.',
      en: 'Week of 16 August: uncertainty remains around transport and insurance signals: the rise in insurance premiums comes partly from clusters affiliated with one of the parties, and independent market confirmation is insufficient.',
    },
  },
  {
    week: '2026-09-06',
    wrong: {
      ru: 'Неделя 6 сентября: мы недооценили скорость деэскалации — подписанная договорённость о прекращении огня снизила напряжение раньше, чем инерция индекса успела это отразить. Сдвиг был пойман только на следующей неделе.',
      en: 'Week of 6 September: we underestimated the speed of de-escalation — the signed ceasefire arrangement reduced tension faster than the index inertia could reflect it. The shift was only captured the following week.',
    },
    right: {
      ru: 'Неделя 6 сентября: пониженная уверенность по региону с неполным покрытием источников оказалась оправданной — поздняя верификация подтвердила, что часть региональных сигналов была шумом.',
      en: 'Week of 6 September: the lowered confidence for a region with incomplete source coverage proved justified — late verification confirmed that part of the regional signals was noise.',
    },
    uncertain: {
      ru: 'Неделя 6 сентября: неопределённость держится на закрытых переговорах — они принципиально не видны открытым источникам до публикации, поэтому индекс может запаздывать относительно реального снижения напряжения.',
      en: 'Week of 6 September: uncertainty comes from closed-door negotiations — they are inherently invisible to open sources until published, so the index may lag the actual easing of tension.',
    },
  },
];

export function reviewFor(week) {
  return DEMO_REVIEWS.find((r) => r.week === week) ?? null;
}

// ---------- DOM ----------

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function sourceItem(lang, s) {
  const title = s.title?.[lang] ?? s.title?.ru ?? '';
  return `<li class="source-row">
    <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>
    <span class="source-meta">${escapeHtml(s.domain)} · ${date(lang, s.date, true)}</span>
  </li>`;
}

function renderFooter(appState) {
  const host = document.querySelector('[data-role="footer-next"]');
  if (!host) return;
  host.textContent = t(appState.lang, 'footer.next', {
    when: publicationLabel(appState.lang, nextPublication()),
  });
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  renderFooter(appState);
  const host = document.querySelector('[data-section="history"]');
  if (!host) return;
  const lang = appState.lang;
  const weeks = data.listWeeks();
  const week = appState.week ?? data.latest();
  const snapshot = appState.snapshot;
  const latest = data.latest();
  const historical = isHistorical(week, latest);

  const options = weeks.map((w) => {
    const label = `${date(lang, w)}${w === latest ? ` — ${t(lang, 'history.week.current')}` : ''}`;
    return `<option value="${w}"${w === week ? ' selected' : ''}>${escapeHtml(label)}</option>`;
  }).join('');

  const note = methodologyNote(lang, snapshot?.methodology, data.week(latest)?.methodology);
  const review = reviewFor(week);
  const index = snapshot?.global?.index;
  const delta = snapshot?.global?.delta;

  host.innerHTML = `
    <div class="history-controls">
      <label class="history-label" for="history-week">${t(lang, 'history.week.label')}</label>
      <select id="history-week" class="history-select" data-role="history-select">
        ${options}
      </select>
    </div>
    ${historical && snapshot?.published ? `<p class="history-banner">${escapeHtml(historyBannerText(lang, snapshot))}</p>` : ''}
    <div class="history-meta">
      <span class="meta-item"><strong>${t(lang, 'meta.published')}</strong>: ${date(lang, snapshot?.published)}</span>
      <span class="meta-item"><strong>${t(lang, 'meta.through')}</strong>: ${date(lang, snapshot?.through)}</span>
      ${typeof index === 'number' ? `<span class="meta-item"><strong>${t(lang, 'history.index')}</strong>: ${index} ${t(lang, 'hero.index.of')}
        · ${escapeHtml(statusLabel(lang, index))}
        · <span class="delta ${deltaClass(delta) ?? ''}">${arrowOf(delta)} ${signedDelta(delta)}</span>
        ${t(lang, 'hero.week.change')}</span>` : ''}
      <span class="meta-item"><strong>${t(lang, 'history.methodology')}</strong>: ${escapeHtml(snapshot?.methodology ?? '—')}</span>
    </div>
    ${note ? `<p class="history-note">${escapeHtml(note)}</p>` : ''}
    ${review ? `
    <div class="history-review">
      <h3>${t(lang, 'history.review.title', { date: date(lang, review.week) })}</h3>
      <div class="review-grid">
        <section class="review-card" aria-label="${escapeHtml(t(lang, 'history.review.wrong'))}">
          <h4>${t(lang, 'history.review.wrong')}</h4>
          <p>${escapeHtml(review.wrong[lang])}</p>
        </section>
        <section class="review-card" aria-label="${escapeHtml(t(lang, 'history.review.right'))}">
          <h4>${t(lang, 'history.review.right')}</h4>
          <p>${escapeHtml(review.right[lang])}</p>
        </section>
        <section class="review-card" aria-label="${escapeHtml(t(lang, 'history.review.uncertain'))}">
          <h4>${t(lang, 'history.review.uncertain')}</h4>
          <p>${escapeHtml(review.uncertain[lang])}</p>
        </section>
      </div>
    </div>` : ''}
    ${Array.isArray(snapshot?.sources) && snapshot.sources.length ? `
    <div class="history-sources">
      <h3>${t(lang, 'history.sources.title')}</h3>
      <ul class="source-list">
        ${snapshot.sources.map((s) => sourceItem(lang, s)).join('')}
      </ul>
    </div>` : ''}`;

  host.querySelector('[data-role="history-select"]')
    ?.addEventListener('change', (e) => {
      document.dispatchEvent(new CustomEvent('ci:weekchange', { detail: { week: e.target.value } }));
    });
}
