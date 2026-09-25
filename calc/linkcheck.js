// linkcheck.js — проверка ссылок-источников по HTTP (чистый, ESM, ноль зависимостей).
// Шов прогона fix-source-links: classify/status → ok|broken, checkUrl с таймаутом
// (AbortController) и повторами на 429/5xx/таймауте, checkSources — последовательный
// обход списка { url, where }. Все вызовы fetch идут через fetchImpl извне —
// тесты гоняют модуль с поддельным fetch, без сети.

const DEFAULT_TIMEOUT_MS = 10000;   // таймаут одной попытки
const DEFAULT_RETRIES = 2;          // повторы сверх первой попытки
const DEFAULT_RETRY_DELAY_MS = 1000; // пауза между попытками

// Браузерные заголовки (D02): дефолтный UA node-fetch получает 406/403 от живых
// серверов. Константа пробрасывается в fetchImpl третьим полем opts.
const REQUEST_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml',
};

// 2xx/3xx → 'ok'; 403 → 'blocked' (D01: bot-доступ запрещён — Cloudflare
// JS-challenge, страница может быть жива, это не битая ссылка); 401 →
// 'blocked' (Reuters site-wide: проверено 2026-09-25 — 401 на главной странице
// и на заведомо несуществующем URL даже с браузерным User-Agent → bot-защита,
// не битая страница); 406 → 'blocked' (D03: интермитентный бот-фильтр, те же
// URL через минуту отдают 202); 404/410 и прочее 4xx и 5xx → 'broken'; null
// (ответ не получен: DNS/таймаут/обрыв) → 'blocked' (D02: недоступность из
// среды проверки ≠ битая страница).
export function classify(status) {
  if (typeof status === 'number' && status >= 200 && status < 400) return 'ok';
  if (status === 401 || status === 403 || status === 406 || status === null) return 'blocked';
  return 'broken';
}

// 429, 406 и 5xx — временные, повторяем (D03: 406 — интермитентный
// бот-фильтр, тот же URL через минуту отдаёт 202); остальные статусы финальны.
function isRetryableStatus(status) {
  return status === 429 || status === 406 || status >= 500;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Одна попытка: fetch с AbortController. resolve(status) либо reject(ошибка).
function attemptOnce(fetchImpl, url, timeoutMs) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    fetchImpl(url, { signal: controller.signal, headers: REQUEST_HEADERS })
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

// checkSources(items, opts) → { checked, ok, broken, blocked }; элементы —
// {url, status, where, reason?} (reason: 'no-response' при status null).
// items — { url, where }; проверка последовательная, чтобы не долбить сайты.
// Ворота падают только по broken; blocked — предупреждение, не останавливает.
export async function checkSources(items, opts = {}) {
  const broken = [];
  const blocked = [];
  let ok = 0;
  for (const item of items) {
    const r = await checkUrl(item.url, opts);
    if (r.ok) ok += 1;
    else if (classify(r.status) === 'blocked') {
      blocked.push({
        url: item.url,
        status: r.status,
        where: item.where,
        ...(r.status === null ? { reason: 'no-response' } : {}),
      });
    } else broken.push({ url: item.url, status: r.status, where: item.where });
  }
  return { checked: items.length, ok, broken, blocked };
}
