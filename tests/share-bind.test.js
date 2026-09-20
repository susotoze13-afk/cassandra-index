import { test } from 'node:test';
import assert from 'node:assert/strict';

// Гард двойного биндинга initShare (таск 11): слушатель на document один;
// повторный вызов и «пересоздание» кнопки i18n-перерисовкой второй слушатель
// не вешают. Документ-стаб ставим до импорта: share.js биндится сам на загрузку.
const listeners = [];
const fakeBtn = { dataset: {} };

globalThis.document = {
  readyState: 'complete',
  addEventListener: (type, fn) => listeners.push({ type, fn }),
  querySelector: (sel) => (sel === '[data-role="share-btn"]' ? fakeBtn : null),
};

const share = await import('../js/share.js');

test('initShare: повторный вызов и пересоздание кнопки не дублируют слушатель', () => {
  share.initShare();              // повторный вызов после авторебинда при импорте
  delete fakeBtn.dataset.bound;   // имитация пересозданной кнопки (старый гард ломался здесь)
  share.initShare();
  const clicks = listeners.filter((l) => l.type === 'click');
  assert.equal(clicks.length, 1);
});
