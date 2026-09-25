// linkcheck.js — проверка ссылок-источников по HTTP (чистый, ESM, ноль зависимостей).
// Шов прогона fix-source-links: classify/status → ok|broken, checkUrl с таймаутом
// (AbortController) и повторами на 429/5xx/таймауте, checkSources — последовательный
// обход списка { url, where }. Все вызовы fetch идут через fetchImpl извне —
// тесты гоняют модуль с поддельным fetch, без сети.

const DEFAULT_TIMEOUT_MS = 10000;   // таймаут одной попытки
const DEFAULT_RETRIES = 2;          // повторы сверх первой попытки
const DEFAULT_RETRY_DELAY_MS = 1000; // пауза между попытками

// 2xx/3xx → 'ok'; 403 → 'blocked' (D01: bot-доступ запрещён — Cloudflare
// JS-challenge, страница может быть жива, это не битая ссылка); 404/410 и
// прочее 4xx, 5xx и обрыв (null) → 'broken'.
export function classify(status) {
  if (typeof status === 'number' && status >= 200 && status < 400) return 'ok';
  if (status === 403) return 'blocked';
  return 'broken';
}

// 429 и 5xx — временные, повторяем; остальные статусы финальны.
function isRetryableStatus(status) {
  return status === 429 || status >= 500;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Одна попытка: fetch с AbortController. resolve(status) либо reject(ошибка).
function attemptOnce(fetchImpl, url, timeoutMs) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    fetchImpl(url, { signal: controller.signal })
      .then((res) => {
        clearTimeout(timer);
        resolve(res.status);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// checkUrl(url, { fetchImpl, timeoutMs, retries, retryDelayMs })
// → { url, status, ok, attempts }. status = null, если ответа не было
// (таймаут/обрыв) и попытки исчерпаны.
export async function checkUrl(url, opts = {}) {
  const {
    fetchImpl = fetch,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    retries = DEFAULT_RETRIES,
    retryDelayMs = DEFAULT_RETRY_DELAY_MS,
  } = opts;

  let status = null;
  let attempts = 0;
  while (attempts <= retries) {
    attempts += 1;
    try {
      status = await attemptOnce(fetchImpl, url, timeoutMs);
      if (!isRetryableStatus(status)) break;
    } catch {
      status = null; // таймаут (AbortError) или обрыв сети — временно
    }
    if (attempts > retries) break;
    if (retryDelayMs > 0) await sleep(retryDelayMs);
  }
  return { url, status, ok: classify(status) === 'ok', attempts };
}

// checkSources(items, opts) → { checked, ok, broken, blocked }; broken и blocked
// — [{url, status, where}]. items — { url, where }; проверка последовательная,
// чтобы не долбить сайты. blocked не считается битым для ворот пайплайна.
export async function checkSources(items, opts = {}) {
  const broken = [];
  const blocked = [];
  let ok = 0;
  for (const item of items) {
    const r = await checkUrl(item.url, opts);
    if (r.ok) ok += 1;
    else if (r.status === 403) blocked.push({ url: item.url, status: r.status, where: item.where });
    else broken.push({ url: item.url, status: r.status, where: item.where });
  }
  return { checked: items.length, ok, broken, blocked };
}
