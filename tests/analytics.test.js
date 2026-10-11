// Контракт модуля аналитики (js/analytics.js): согласие на cookie-less счётчик
// Cloudflare Web Analytics и загрузчик без DOM-побочек. Без сети.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CF_BEACON_TOKEN,
  CONSENT_KEY,
  consent,
  isConfigured,
  loadCounter,
  maybeInit,
  maybeShowBanner,
} from '../js/analytics.js';

function fakeStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    _map: map,
  };
}

function withLocalStorage(store, fn) {
  const prev = globalThis.localStorage;
  globalThis.localStorage = store;
  try {
    return fn();
  } finally {
    if (prev === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = prev;
  }
}

function withGlobals(globals, fn) {
  const prev = {};
  for (const [k, v] of Object.entries(globals)) {
    prev[k] = globalThis[k];
    globalThis[k] = v;
  }
  try {
    return fn();
  } finally {
    for (const k of Object.keys(globals)) {
      if (prev[k] === undefined) delete globalThis[k];
      else globalThis[k] = prev[k];
    }
  }
}

// Поддельный document: собирает вставленные <script> и позволяет проверить атрибуты.
function fakeDocument() {
  const scripts = [];
  const doc = {
    head: { appendChild: (el) => { scripts.push(el); } },
    createElement: () => ({
      _attrs: {},
      setAttribute(k, v) { this._attrs[k] = v; },
      getAttribute(k) { return this._attrs[k] ?? null; },
    }),
    querySelector: () => null,
  };
  return { doc, scripts };
}

test('константы: ключ согласия и настроенный beacon-токен', () => {
  assert.equal(CONSENT_KEY, 'cassandra.analytics.consent');
  assert.equal(consent.KEY, CONSENT_KEY);
  // Токен Cloudflare Web Analytics публичен (встроен в HTML страницы).
  assert.match(CF_BEACON_TOKEN, /^[0-9a-f]{32}$/);
  assert.equal(isConfigured(), true);
});

// ---------- Согласие (localStorage) ----------

test('consent: до ответа статус null, ничего не записано', () => {
  const store = fakeStorage();
  withLocalStorage(store, () => {
    assert.deepEqual(consent.status(), { status: null, at: null });
  });
  assert.equal(store._map.size, 0);
});

test('consent: grant/deny пишут статус + timestamp; отказ не истекает', () => {
  const store = fakeStorage();
  withLocalStorage(store, () => {
    consent.grant();
    let st = consent.status();
    assert.equal(st.status, 'granted');
    assert.ok(typeof st.at === 'string' && !Number.isNaN(Date.parse(st.at)));

    consent.deny();
    st = consent.status();
    assert.equal(st.status, 'denied');
    const raw = JSON.parse(store.getItem(consent.KEY));
    assert.equal(raw.status, 'denied');
    assert.equal(raw.v, 1);
  });
});

test('consent: битая запись трактуется как отсутствие согласия', () => {
  const store = fakeStorage();
  withLocalStorage(store, () => {
    store.setItem(consent.KEY, '{oops');
    assert.equal(consent.status().status, null);
    store.setItem(consent.KEY, JSON.stringify({ v: 1, status: 'maybe' }));
    assert.equal(consent.status().status, null);
  });
});

test('consent: хранилище недоступно — статус null, grant/deny не падают', () => {
  withGlobals({ localStorage: undefined }, () => {
    delete globalThis.localStorage;
    assert.equal(consent.status().status, null);
    assert.equal(consent.grant(), false);
    assert.equal(consent.deny(), false);
  });
});

// ---------- Загрузчик ----------

test('loadCounter: пустой/невалидный токен — no-op', () => {
  assert.equal(loadCounter(''), false);
  assert.equal(loadCounter(undefined), false);
  assert.equal(loadCounter(123), false);
});

test('loadCounter: вне браузера — no-op (нет window/document)', () => {
  withGlobals({ window: undefined, document: undefined }, () => {
    delete globalThis.window;
    delete globalThis.document;
    assert.equal(loadCounter('abc123'), false);
  });
});

test('loadCounter: в браузере вставляет beacon как module с data-cf-beacon и дедуплицируется', () => {
  const w = {};
  const { doc, scripts } = fakeDocument();
  withGlobals({ window: w, document: doc }, () => {
    assert.equal(loadCounter('abc123token'), true);
    assert.equal(scripts.length, 1);
    assert.equal(scripts[0].src, 'https://static.cloudflareinsights.com/beacon.min.js');
    assert.equal(scripts[0].type, 'module');
    assert.deepEqual(JSON.parse(scripts[0].getAttribute('data-cf-beacon')), { token: 'abc123token' });
    assert.equal(w.__ciCounterLoaded, true);
    // повторный вызов — no-op, второго тега нет
    assert.equal(loadCounter('abc123token'), false);
    assert.equal(scripts.length, 1);
  });
});

test('maybeInit: без выданного согласия — не грузит (даже при заданном токене)', () => {
  assert.equal(maybeInit(), false);
});

test('maybeShowBanner: вне браузера — null', () => {
  assert.equal(maybeShowBanner({ lang: 'ru', regionAnswered: true }), null);
});
