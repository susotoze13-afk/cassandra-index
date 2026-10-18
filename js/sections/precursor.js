// js/sections/precursor.js — блок «Косвенные предвестники (Д9)» между hero и
// витриной доверия (§4.3.6 METHODOLOGY, ADR 0047): доля сигналов Д9 без потолка
// §4.3.5, число сигналящих подгрупп и честные оговорки — «не сравнимо с
// индексом» и «не подтверждено прямыми наблюдениями». Блок неинтерактивен и не
// попадает в тон риска: числа берутся из уже загруженного снапшота недели,
// ничего не пересчитывается. Неделя без поля precursor, неопубликованная неделя
// или битая форма поля — блока нет вовсе (R10). Чистый шов precursorFacts.

import { t } from '../i18n.js';
import { el } from '../ui.js';

// Число подгрупп Д9 (§4.3.8: иерархическая агрегация по восьми подгруппам);
// паритет с engine.D9_SUBGROUPS пинит tests/precursor-ui.test.js.
export const PRECURSOR_SUBGROUPS = 8;

// precursorFacts(snapshot) → { value, signaling, total } | null. null — если
// снапшота/глобального индекса нет, неделя не published (R11.1), поля нет или
// форма поля битая (R12.1): блок молчит, страница не падает. Стиль проверки —
// как validCoverage в js/sections/trust.js: отказ без исключений.
export function precursorFacts(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') return null;
  if (snapshot.dataState !== 'published') return null;
  if (snapshot.global == null) return null;

  const p = snapshot.precursor;
  if (!p || typeof p !== 'object' || Array.isArray(p)) return null;

  const ok =
    Number.isInteger(p.value) && p.value >= 0 && p.value <= 100 &&
    Number.isInteger(p.signalingSubgroups) &&
    p.signalingSubgroups >= 0 &&
    p.signalingSubgroups <= PRECURSOR_SUBGROUPS;
  if (!ok) return null;

  return {
    value: p.value,
    signaling: p.signalingSubgroups,
    total: PRECURSOR_SUBGROUPS,
  };
}

// Пометка «сигналов нет» — только когда нет ни значения, ни сигналящих
// подгрупп (R10): при signaling = 0 и ненулевом значении пометки нет.
export function showsNoSignals(facts) {
  if (!facts) return false;
  return facts.value === 0 && facts.signaling === 0;
}

export function render(appState) {
  if (typeof document === 'undefined') return;
  const host = document.querySelector('[data-section="precursor"]');
  if (!host) return;

  // Секция целиком скрыта, пока нет валидных фактов: пустой заголовок без
  // данных читался бы как сбой (R10).
  const section =
    typeof host.closest === 'function' ? host.closest('.precursor-section') : null;

  host.textContent = '';
  const facts = precursorFacts(appState?.snapshot);
  if (section) section.hidden = !facts;
  if (!facts) return;

  const lang = appState?.lang ?? 'ru';

  const row = el('div', 'precursor-row');
  row.appendChild(el('div', 'precursor-value', t(lang, 'precursor.value', { value: facts.value })));
  row.appendChild(el('p', 'precursor-note', t(lang, 'precursor.signals', { n: facts.signaling })));
  if (showsNoSignals(facts)) {
    row.appendChild(el('p', 'precursor-note', t(lang, 'precursor.none')));
  }
  row.appendChild(el('p', 'precursor-note', t(lang, 'precursor.note')));
  row.appendChild(el('p', 'precursor-note', t(lang, 'precursor.disclaimer')));

  host.appendChild(row);
}
