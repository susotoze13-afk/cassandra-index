// CDP-замер загрузки страницы headless Chrome (ноль зависимостей, Node >= 22).
// Использование: node measure.mjs <url> [порт]
// Вывод: JSON-отчёт (requests, transferred, resources, DOMContentLoaded, Load,
// Finish, console errors/warnings). Профиль — временный, кэш холодный.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const url = process.argv[2];
const port = Number(process.argv[3] || 9333);
if (!url) { console.error('usage: node measure.mjs <url> [port]'); process.exit(2); }

const profile = mkdtempSync(path.join(tmpdir(), 'ci-baseline-'));
const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-extensions',
  '--disable-component-update',
  '--mute-audio',
  'about:blank',
], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill(); } catch {} });

async function browserWsUrl() {
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      return (await r.json()).webSocketDebuggerUrl;
    } catch { await new Promise((r) => setTimeout(r, 200)); }
  }
  throw new Error('CDP не поднялся');
}

const ws = new WebSocket(await browserWsUrl());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let msgId = 0;
const pending = new Map();
const events = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? rej(new Error(m.error.message)) : res(m.result);
  } else if (m.method) {
    events.push(m);
  }
};
function send(method, params = {}, sessionId = undefined) {
  const id = ++msgId;
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
}

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Network.enable', {}, sessionId);
await send('Page.enable', {}, sessionId);
await send('Runtime.enable', {}, sessionId);
await send('Log.enable', {}, sessionId);

let requests = 0;
let transferred = 0;
let failed = [];
const consoleIssues = [];
const loadFired = new Promise((res) => {
  const t = setTimeout(res, 30000);
  const iv = setInterval(() => {
    if (events.some((m) => m.method === 'Page.loadEventFired')) {
      clearTimeout(t); clearInterval(iv); res();
    }
  }, 50);
});

await send('Page.navigate', { url }, sessionId);
await loadFired;
await new Promise((r) => setTimeout(r, 2500)); // досадка сети: дать ресурсам догрузиться

for (const m of events) {
  if (m.method === 'Network.requestWillBeSent') requests++;
  if (m.method === 'Network.loadingFinished') transferred += m.params.encodedDataLength || 0;
  if (m.method === 'Network.loadingFailed') failed.push(m.params.errorText);
  if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) {
    consoleIssues.push({ kind: 'console.' + m.params.type, text: (m.params.args || []).map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 300) });
  }
  if (m.method === 'Log.entryAdded' && ['error', 'warning'].includes(m.params.entry.level)) {
    consoleIssues.push({ kind: 'log.' + m.params.entry.level + '/' + m.params.entry.source, text: m.params.entry.text.slice(0, 300) });
  }
}

const perf = await send('Runtime.evaluate', {
  expression: `JSON.stringify((() => {
    const nav = performance.getEntriesByType('navigation')[0] || {};
    const res = performance.getEntriesByType('resource');
    return {
      resources: res.length,
      resourceMaxEnd: res.reduce((m, r) => Math.max(m, r.responseEnd), 0),
      domContentLoaded: nav.domContentLoadedEventEnd ?? null,
      load: nav.loadEventEnd ?? null,
      navDuration: nav.duration ?? null,
    };
  })())`,
  returnByValue: true,
}, sessionId);

const p = JSON.parse(perf.result.value);
const report = {
  url,
  requests,
  transferredBytes: transferred,
  resources: p.resources,
  domContentLoadedMs: p.domContentLoaded,
  loadMs: p.load,
  finishMs: Math.max(p.navDuration || 0, p.resourceMaxEnd || 0),
  failedRequests: failed,
  consoleIssues,
};
console.log(JSON.stringify(report, null, 2));
ws.close();
chrome.kill();
await new Promise((r) => setTimeout(r, 1000));
try { rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 }); } catch {}
process.exit(0);
