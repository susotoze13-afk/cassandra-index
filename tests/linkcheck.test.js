import test from 'node:test';
import assert from 'node:assert/strict';

import { classify, checkUrl, checkSources } from '../calc/linkcheck.js';

// Поддельный fetch: map url → ответ (число-статус) или функция, бросающая ошибку.
function fakeFetch(handler) {
  const calls = [];
  const impl = async (url, opts = {}) => {
    calls.push(url);
    return handler(url, opts);
  };
  impl.calls = calls;
  return impl;
}

function response(status) {
  return { status, ok: status >= 200 && status < 300 };
}

test('classify: 2xx/3xx → ok; 403 → blocked; прочее 4xx/5xx и обрыв → broken', () => {
  for (const s of [200, 204, 301, 302]) assert.equal(classify(s), 'ok', `status ${s}`);
  assert.equal(classify(403), 'blocked', 'bot-доступ запрещён — не битая ссылка');
  assert.equal(classify(406), 'blocked', 'интермитентный бот-фильтр — не битая ссылка');
  for (const s of [400, 401, 404, 410, 418, 500, 503]) {
    assert.equal(classify(s), 'broken', `status ${s}`);
  }
  assert.equal(classify(null), 'blocked', 'ответ не получен (DNS/таймаут) — не битая ссылка');
});

test('checkUrl: 200 → ok, одна попытка, полный результат', async () => {
  const fetchImpl = fakeFetch(async () => response(200));
  const r = await checkUrl('https://example.com/a', { fetchImpl, retryDelayMs: 0 });
  assert.deepEqual(r, { url: 'https://example.com/a', status: 200, ok: true, attempts: 1 });
  assert.equal(fetchImpl.calls.length, 1);
});

test('checkUrl: 404 → broken без повторов', async () => {
  const fetchImpl = fakeFetch(async () => response(404));
  const r = await checkUrl('https://example.com/missing', { fetchImpl, retryDelayMs: 0 });
  assert.deepEqual(r, { url: 'https://example.com/missing', status: 404, ok: false, attempts: 1 });
  assert.equal(fetchImpl.calls.length, 1, '404 не повторяется');
});

test('checkUrl: редирект 301 → ok', async () => {
  const fetchImpl = fakeFetch(async () => response(301));
  const r = await checkUrl('https://example.com/old', { fetchImpl, retryDelayMs: 0 });
  assert.equal(r.ok, true);
  assert.equal(r.status, 301);
});

test('checkUrl: 429 → повтор, затем успех; attempts = 2', async () => {
  let n = 0;
  const fetchImpl = fakeFetch(async () => (++n === 1 ? response(429) : response(200)));
  const r = await checkUrl('https://example.com/rate', { fetchImpl, retries: 2, retryDelayMs: 0 });
  assert.equal(r.ok, true);
  assert.equal(r.status, 200);
  assert.equal(r.attempts, 2);
  assert.equal(fetchImpl.calls.length, 2);
});

test('checkUrl: 500 не проходит → попытки исчерпаны (1 + retries), broken', async () => {
  const fetchImpl = fakeFetch(async () => response(500));
  const r = await checkUrl('https://example.com/err', { fetchImpl, retries: 2, retryDelayMs: 0 });
  assert.equal(r.ok, false);
  assert.equal(r.status, 500);
  assert.equal(r.attempts, 3);
  assert.equal(fetchImpl.calls.length, 3);
});

test('checkUrl: таймаут (AbortController) → повтор; исчерпание → status null', async () => {
  // fetch, который не отвечает, пока не придёт abort — имитация зависшего сервера.
  const hanging = (url, opts = {}) =>
    new Promise((_, reject) => {
      opts.signal?.addEventListener('abort', () => {
        reject(Object.assign(new Error('The operation was aborted'), { name: 'AbortError' }));
      });
    });
  const fetchImpl = fakeFetch(hanging);
  const r = await checkUrl('https://example.com/slow', {
    fetchImpl, retries: 1, timeoutMs: 20, retryDelayMs: 0,
  });
  assert.equal(r.ok, false);
  assert.equal(r.status, null);
  assert.equal(r.attempts, 2);
  assert.equal(fetchImpl.calls.length, 2);

  let n = 0;
  const fetchImpl2 = fakeFetch(async (url, opts = {}) => {
    n += 1;
    if (n === 1) return hanging(url, opts);
    return response(200);
  });
  const r2 = await checkUrl('https://example.com/slow2', {
    fetchImpl: fetchImpl2, retries: 1, timeoutMs: 20, retryDelayMs: 0,
  });
  assert.equal(r2.ok, true, 'после таймаута повтор может дать успех');
  assert.equal(r2.attempts, 2);
});

test('checkUrl: обрыв сети (fetch бросает) → повторяется, на исчерпании status null', async () => {
  let n = 0;
  const fetchImpl = fakeFetch(async () => {
    n += 1;
    if (n === 1) throw new TypeError('fetch failed');
    return response(200);
  });
  const r = await checkUrl('https://example.com/net', { fetchImpl, retries: 1, retryDelayMs: 0 });
  assert.equal(r.ok, true);
  assert.equal(r.attempts, 2);
});

test('checkUrl: запрос идёт с браузерными заголовками (User-Agent, Accept)', async () => {
  let seenHeaders;
  const fetchImpl = async (url, opts = {}) => {
    seenHeaders = opts.headers;
    return response(200);
  };
  await checkUrl('https://example.com/h', { fetchImpl, retryDelayMs: 0 });
  assert.ok(seenHeaders, 'fetchImpl получил headers');
  assert.match(seenHeaders['User-Agent'], /^Mozilla\/5\.0 /, 'браузерный User-Agent');
  assert.match(seenHeaders.Accept, /text\/html/, 'Accept с text/html');
  assert.ok(!seenHeaders.Accept.includes('application/json'));
});
test('checkUrl: 403 → ok=false, одна попытка, не повторяется', async () => {
  const fetchImpl = fakeFetch(async () => response(403));
  const r = await checkUrl('https://example.com/guarded', { fetchImpl, retryDelayMs: 0 });
  assert.equal(r.ok, false);
  assert.equal(r.status, 403);
  assert.equal(r.attempts, 1);
  assert.equal(fetchImpl.calls.length, 1, '403 финален, повторов нет');
});

test('checkSources: последовательная проверка и отчёт { checked, ok, broken, blocked }', async () => {
  const seen = [];
  const fetchImpl = async (url) => {
    seen.push(url);
    await new Promise((r) => setTimeout(r, 1));
    if (url.endsWith('/bad')) return response(404);
    if (url.endsWith('/guarded')) return response(403);
    return response(200);
  };
  const items = [
    { url: 'https://a.example/1', where: 'sources[0]' },
    { url: 'https://b.example/bad', where: 'drivers[2].sources[1]' },
    { url: 'https://c.example/guarded', where: 'sources[2]' },
    { url: 'https://d.example/4', where: 'sources[3]' },
  ];
  const report = await checkSources(items, { fetchImpl, retryDelayMs: 0 });
  assert.deepEqual(seen, items.map((i) => i.url), 'запросы строго по порядку items');
  assert.equal(report.checked, 4);
  assert.equal(report.ok, 2);
  assert.deepEqual(report.broken, [
    { url: 'https://b.example/bad', status: 404, where: 'drivers[2].sources[1]' },
  ]);
  assert.deepEqual(report.blocked, [
    { url: 'https://c.example/guarded', status: 403, where: 'sources[2]' },
  ]);
});


test('checkSources: blocked без ответа (DNS/обрыв) несёт reason: no-response', async () => {
  const fetchImpl = async (url) => {
    if (url.endsWith('/down')) throw new TypeError('getaddrinfo ENOTFOUND');
    return response(200);
  };
  const items = [
    { url: 'https://up.example/1', where: 'sources[0]' },
    { url: 'https://down.example/down', where: 'sources[1]' },
  ];
  const report = await checkSources(items, { fetchImpl, retries: 0, retryDelayMs: 0 });
  assert.equal(report.ok, 1);
  assert.equal(report.broken.length, 0, 'нет ответа — не битая ссылка');
  assert.deepEqual(report.blocked, [
    { url: 'https://down.example/down', status: null, where: 'sources[1]', reason: 'no-response' },
  ]);
});


test('checkUrl: 406 ретраится; повторный 406 после исчерпания → blocked', async () => {
  let n = 0;
  const fetchImpl = fakeFetch(async () => (++n <= 2 ? response(406) : response(202)));
  const r = await checkUrl('https://example.com/flap', { fetchImpl, retries: 2, retryDelayMs: 0 });
  assert.equal(r.ok, true, 'флап 406 закончился успехом 202');
  assert.equal(r.attempts, 3);

  const fetchImpl2 = fakeFetch(async () => response(406));
  const r2 = await checkUrl('https://example.com/flap2', { fetchImpl: fetchImpl2, retries: 2, retryDelayMs: 0 });
  assert.equal(r2.ok, false);
  assert.equal(r2.status, 406);
  assert.equal(r2.attempts, 3, '406 повторяется до исчерпания попыток');
});

test('checkUrl: 406 с retries:0 → blocked, одна попытка', async () => {
  const fetchImpl = fakeFetch(async () => response(406));
  const r = await checkUrl('https://example.com/once', { fetchImpl, retries: 0, retryDelayMs: 0 });
  assert.equal(r.ok, false);
  assert.equal(r.status, 406);
  assert.equal(r.attempts, 1);
  assert.equal(fetchImpl.calls.length, 1);
});

test('checkSources: финальный 406 → blocked, broken пуст', async () => {
  const fetchImpl = async () => response(406);
  const items = [{ url: 'https://flap.example/a', where: 'sources[0]' }];
  const report = await checkSources(items, { fetchImpl, retries: 1, retryDelayMs: 0 });
  assert.equal(report.broken.length, 0, '406 не битая ссылка');
  assert.deepEqual(report.blocked, [
    { url: 'https://flap.example/a', status: 406, where: 'sources[0]' },
  ]);
});
