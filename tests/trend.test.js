import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  signedDelta,
  arrowOf,
  directionOf,
  pointAriaLabel,
  tooltipDate,
  summaryText,
  clampX,
} from '../js/sections/trend.js';

// §4.4 / История 13 — подпись «текущее / неделю назад / направление»: Δ со знаком.
test('signedDelta: +6 / -3 / 0', () => {
  assert.equal(signedDelta(6), '+6');
  assert.equal(signedDelta(-3), '-3');
  assert.equal(signedDelta(0), '0');
});

// Направление — стрелкой и словом: значения не только цветом (R24).
test('arrowOf и directionOf по знаку дельты', () => {
  assert.equal(arrowOf(6), '↑');
  assert.equal(arrowOf(-3), '↓');
  assert.equal(arrowOf(0), '→');
  assert.equal(directionOf(6), 'up');
  assert.equal(directionOf(-3), 'down');
  assert.equal(directionOf(0), 'flat');
});

// Каждая точка графика: aria-label «значение, дата» на языке интерфейса (§19.25 —
// данные дублируются в aria-label вместо aria-live).
test('pointAriaLabel: «значение, дата» RU и EN', () => {
  const p = { date: '2026-09-13', value: 72 };
  assert.equal(pointAriaLabel('ru', p), '72 из 100, 13 сентября 2026');
  assert.equal(pointAriaLabel('en', p), '72 of 100, 13 Sep, 2026');
});

// Tooltip точки: дата — длинным локальным форматом, совпадающим с aria-label
// точки (История 13 / R36: «13 сентября 2026 / 13 Sep, 2026», не короткий «13.09»).
test('tooltipDate: длинный локальный формат, как в aria-label точки', () => {
  const p = { date: '2026-09-13', value: 72 };
  assert.equal(tooltipDate('ru', p), '13 сентября 2026');
  assert.equal(tooltipDate('en', p), '13 Sep, 2026');
  assert.ok(pointAriaLabel('ru', p).includes(tooltipDate('ru', p)));
  assert.ok(pointAriaLabel('en', p).includes(tooltipDate('en', p)));
});


// Короткий нарративный summary: Δ за неделю и за всё окно, слово «пункт» со склонением.
// Ожидаемые строки разобраны вручную из образца ниже (первый 56, предпоследний 71, последний 72).
test('summaryText: RU с плюрализацией 1/2–4/5+', () => {
  const points = [
    { date: '2026-06-28', value: 56 },
    { date: '2026-09-06', value: 71 },
    { date: '2026-09-13', value: 72 },
  ];
  assert.equal(
    summaryText('ru', points),
    'За неделю индекс изменился на +1 пункт; за 12 недель — на +16 пунктов.'
  );
});

test('summaryText: EN 1 point / N points', () => {
  const points = [
    { date: '2026-06-28', value: 56 },
    { date: '2026-09-06', value: 71 },
    { date: '2026-09-13', value: 72 },
  ];
  assert.equal(
    summaryText('en', points),
    'Over the week the index changed by +1 point; over 12 weeks — by +16 points.'
  );
  // падение: отрицательные дельты со знаком «-»
  const falling = [
    { date: '2026-06-28', value: 72 },
    { date: '2026-09-06', value: 69 },
    { date: '2026-09-13', value: 66 },
  ];
  assert.equal(
    summaryText('ru', falling),
    'За неделю индекс изменился на -3 пункта; за 12 недель — на -6 пунктов.'
  );
  // <2 точек — summary невозможен, пустая строка без исключений
  assert.equal(summaryText('ru', [{ date: '2026-09-13', value: 72 }]), '');
  assert.equal(summaryText('ru', []), '');
});

// Tooltip не выходит за контейнер по X (История 13): позиция зажата с обеих сторон.
test('clampX: зажимает позицию tooltip внутри контейнера', () => {
  assert.equal(clampX(-20, 80, 320), 0);
  assert.equal(clampX(300, 80, 320), 240);
  assert.equal(clampX(120, 80, 320), 120);
  // tooltip шире контейнера — прижимаем к левому краю
  assert.equal(clampX(50, 400, 320), 0);
});
