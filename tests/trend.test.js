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
  trendSegments,
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

// R63: aria-label точки — «Дата: X, Индекс: Y, Состояние: Z» на языке интерфейса.
// Состояние — по шкале risk (72 → very → «очень опасно» / «very dangerous»).
test('pointAriaLabel: «Дата / Индекс / Состояние» RU и EN (R63)', () => {
  const p = { date: '2026-09-13', value: 72 };
  assert.equal(pointAriaLabel('ru', p), 'Дата: 13 сентября 2026, Индекс: 72, Состояние: очень опасно');
  assert.equal(pointAriaLabel('en', p), 'Date: 13 Sep, 2026, Index: 72, State: very dangerous');
});

// Неопубликованная неделя (value:null, таск 05): индекс подписан словами,
// состояние не выдумывается.
test('pointAriaLabel: value:null — «не опубликовано», без состояния', () => {
  const p = { date: '2026-09-13', value: null, methodology: '2.0' };
  const ru = pointAriaLabel('ru', p);
  assert.match(ru, /Дата: 13 сентября 2026/);
  assert.match(ru, /Индекс: не опубликовано/);
  const en = pointAriaLabel('en', p);
  assert.match(en, /Index: not published/);
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

// R28: разрыв серии при смене версии методологии между соседними точками.
// Формат данных точек — контракт таска 05: {date, value|null, methodology?}.
test('trendSegments: смена methodology между точками → два сегмента и одна метка разрыва', () => {
  const points = [
    { date: '2026-08-16', value: 66, methodology: '1.0' },
    { date: '2026-08-23', value: 67, methodology: '1.0' },
    { date: '2026-08-30', value: 64, methodology: '2.0' },
    { date: '2026-09-06', value: 62, methodology: '2.0' },
  ];
  const { segments, breaks } = trendSegments(points);
  assert.equal(segments.length, 2);
  assert.deepEqual(segments[0].map((p) => p.date), ['2026-08-16', '2026-08-23']);
  assert.deepEqual(segments[1].map((p) => p.date), ['2026-08-30', '2026-09-06']);
  assert.equal(breaks.length, 1);
  assert.equal(breaks[0].index, 2);
  assert.equal(breaks[0].reason, 'methodology');
  assert.equal(breaks[0].from, '1.0');
  assert.equal(breaks[0].to, '2.0');
});

// Неделя не опубликована (value:null, таск 05): серия рвётся, null-точки
// не попадают ни в один сегмент линии.
test('trendSegments: value:null рвёт серию даже без смены методологии', () => {
  const points = [
    { date: '2026-08-16', value: 66 },
    { date: '2026-08-23', value: 67 },
    { date: '2026-08-30', value: null, methodology: '2.0' },
    { date: '2026-09-06', value: null, methodology: '2.0' },
  ];
  const { segments, breaks } = trendSegments(points);
  assert.equal(segments.length, 1);
  assert.deepEqual(segments[0].map((p) => p.date), ['2026-08-16', '2026-08-23']);
  assert.equal(breaks.length, 1);
  assert.equal(breaks[0].reason, 'unpublished');
  assert.equal(breaks[0].index, 2);
});

// Без переломов — один сегмент, без меток (ручные демо-недели 08-02…08-23).
test('trendSegments: однородный ряд — один сегмент без разрывов', () => {
  const points = Array.from({ length: 12 }, (_, i) => ({
    date: `2026-0${Math.floor(i / 4) + 6}-${String(22 + (i % 4) * 7).padStart(2, '0')}`,
    value: 50 + i,
  }));
  const { segments, breaks } = trendSegments(points);
  assert.equal(segments.length, 1);
  assert.equal(segments[0].length, 12);
  assert.deepEqual(breaks, []);
});
