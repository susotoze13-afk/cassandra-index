// digest-send.js — доставка выпуска в Telegram (Bot API) и на email (HTTP-
// эндпоинт провайдера) + защита от повторной отправки через data/digest/sent.json.
//
// Правила, которые держит этот модуль:
//   - без флагов CLI работает как dry-run: печатает выпуск, ни одного запроса;
//   - --send отправляет только те каналы, чьи переменные окружения заданы;
//     частично заданный канал — ошибка до первого запроса (опечатка в имени
//     переменной не должна превращаться в «канал не настроен»);
//   - уже отправленная неделя пропускается без сети и без ненулевого кода;
//   - ошибка канала — код 1, sent.json не обновляется;
//   - ни одно значение секрета не попадает в вывод, файл или сообщение об
//     ошибке: только имена переменных окружения.
//
// Шов тестов — инъекция fetchImpl; сети в тестах нет. CLI-логика вынесена в
// runDigestSend(options) → Promise<exit code>, чтобы её можно было проверить
// без процесса и без настоящих запросов.

import {
  existsSync, readFileSync, writeFileSync, mkdirSync,
} from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { loadSnapshotFromDisk } from './public-export.js';
import { buildDigest } from './digest.js';
import { readLatestWeeks } from './prepare-week.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export const SENT_SCHEMA = 'cassandra-index-digest-sent';
export const SENT_SCHEMA_VERSION = 1;
export const SENT_FILE = 'sent.json';
export const SENT_DIR = 'data/digest';
export const CHANNELS = ['telegram', 'email'];

const TELEGRAM_API = 'https://api.telegram.org';
const REDACTED = '[скрыто]';
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Поля конфигурации канала и их переменные окружения — единственный источник
// имён: CLI читает env по этой таблице, сообщения об ошибке называют их же.
const REQUIRED = {
  telegram: [
    { field: 'token', env: 'TELEGRAM_BOT_TOKEN' },
    { field: 'chatId', env: 'TELEGRAM_CHAT_ID' },
  ],
  email: [
    { field: 'endpoint', env: 'DIGEST_EMAIL_ENDPOINT' },
    { field: 'token', env: 'DIGEST_EMAIL_TOKEN' },
    { field: 'from', env: 'DIGEST_EMAIL_FROM' },
    { field: 'to', env: 'DIGEST_EMAIL_TO' },
  ],
};

const present = (value) => typeof value === 'string' && value.trim() !== '';

function missingOf(channel, config) {
  const cfg = config && typeof config === 'object' ? config : {};
  return REQUIRED[channel].filter((r) => !present(cfg[r.field]));
}

function redact(message, secrets) {
  let out = String(message);
  for (const secret of secrets) {
    if (present(secret)) out = out.split(secret).join(REDACTED);
  }
  return out;
}

function toList(value) {
  if (Array.isArray(value)) return value.filter(present);
  if (!present(value)) return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

// sendTelegram(fetchImpl, {token, chatId}, text) → {ok, status}.
export async function sendTelegram(fetchImpl, cfg, text) {
  const config = cfg || {};
  const missing = missingOf('telegram', config);
  if (missing.length) {
    throw new Error(`не задан${missing.length > 1 ? 'ы' : ''} ${missing.map((r) => r.env).join(', ')}`);
  }
  const url = `${TELEGRAM_API}/bot${config.token}/sendMessage`;
  const response = await fetchImpl(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: config.chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
  return { ok: response.ok === true, status: response.status };
}

// sendEmail(fetchImpl, {endpoint, token, from, to}, {subject, text, html})
// → {ok, status}. Токен — в заголовке, никогда в URL и в теле.
export async function sendEmail(fetchImpl, cfg, message) {
  const config = cfg || {};
  const missing = missingOf('email', config);
  if (missing.length) {
    throw new Error(`не задан${missing.length > 1 ? 'ы' : ''} ${missing.map((r) => r.env).join(', ')}`);
  }
  const payload = message || {};
  const response = await fetchImpl(config.endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${config.token}`,
    },
    body: JSON.stringify({
      from: config.from,
      to: toList(config.to),
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    }),
  });
  return { ok: response.ok === true, status: response.status };
}

// deliver(digest, cfg, {fetchImpl}) → {sent, skipped, errors}.
// cfg = {telegram: {...}, email: {...}, sentWeeks: [...]}.
export async function deliver(digest, cfg = {}, deps = {}) {
  const fetchImpl = deps.fetchImpl || globalThis.fetch;
  const week = digest && digest.week;
  if (!week) throw new Error('deliver: у выпуска нет недели');

  const alreadySent = Array.isArray(cfg.sentWeeks) ? cfg.sentWeeks : [];
  if (alreadySent.includes(week)) {
    return { sent: [], skipped: [...CHANNELS], errors: [] };
  }
  if (typeof fetchImpl !== 'function') {
    throw new Error('deliver: нет fetchImpl (нужен Node 18+ или инъекция)');
  }

  const errors = [];
  const channels = [];
  for (const channel of CHANNELS) {
    const missing = missingOf(channel, cfg[channel]);
    if (missing.length === 0) channels.push(channel);
    else if (missing.length < REQUIRED[channel].length) {
      errors.push({
        channel,
        message: `${channel}: не задан${missing.length > 1 ? 'ы' : ''} `
          + `${missing.map((r) => r.env).join(', ')}`,
      });
    }
  }
  if (channels.length === 0 && errors.length === 0) {
    errors.push({
      channel: 'all',
      message: `нет секретов дайджеста: ${CHANNELS
        .flatMap((channel) => REQUIRED[channel].map((r) => r.env)).join(', ')}`,
    });
  }
  if (errors.length) return { sent: [], skipped: [], errors };

  const secrets = CHANNELS.map((channel) => cfg[channel] && cfg[channel].token);
  const sent = [];
  for (const channel of channels) {
    try {
      const result = channel === 'telegram'
        ? await sendTelegram(fetchImpl, cfg.telegram, digest.telegram)
        : await sendEmail(fetchImpl, cfg.email, digest);
      if (result.ok) sent.push(channel);
      else errors.push({ channel, message: `${channel}: HTTP ${result.status}` });
    } catch (e) {
      errors.push({ channel, message: `${channel}: ${redact(e && e.message ? e.message : e, secrets)}` });
    }
  }
  return { sent, skipped: [], errors };
}

// readSent(dir) → недели, уже отправленные (по возрастанию).
export function readSent(dir) {
  const file = path.join(dir, SENT_FILE);
  if (!existsSync(file)) return [];
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const weeks = Array.isArray(data && data.weeks) ? data.weeks : [];
  return weeks.filter((week) => typeof week === 'string' && DATE_RE.test(week));
}

// writeSent(dir, week) → обновлённый список недель. Идемпотентно: повтор не
// дублирует дату.
export function writeSent(dir, week) {
  if (typeof week !== 'string' || !DATE_RE.test(week)) {
    throw new Error('writeSent: неделя должна быть датой YYYY-MM-DD');
  }
  const weeks = Array.from(new Set([...readSent(dir), week])).sort();
  mkdirSync(dir, { recursive: true });
  const body = {
    schema: SENT_SCHEMA,
    schema_version: SENT_SCHEMA_VERSION,
    weeks,
  };
  writeFileSync(path.join(dir, SENT_FILE), `${JSON.stringify(body, null, 2)}\n`, 'utf8');
  return weeks;
}

// --- CLI ---

function parseArgs(argv) {
  const out = { send: false, week: null, root: ROOT };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--send') out.send = true;
    else if (arg === '--week') {
      i += 1;
      if (!argv[i] || !DATE_RE.test(argv[i])) throw new Error('--week требует дату YYYY-MM-DD');
      out.week = argv[i];
    } else if (arg === '--root') {
      i += 1;
      if (!argv[i]) throw new Error('--root требует путь');
      out.root = path.resolve(argv[i]);
    } else throw new Error(`неизвестный аргумент: ${arg}`);
  }
  return out;
}

// runDigestSend(options) → Promise<код выхода>. options = {argv, env, root,
// sentDir, fetchImpl, stdout, stderr}; значения по умолчанию — процесс.
export async function runDigestSend(options = {}) {
  const root = options.root || ROOT;
  const env = options.env || process.env;
  const out = options.stdout || process.stdout;
  const err = options.stderr || process.stderr;
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  const sentDir = options.sentDir || path.join(root, ...SENT_DIR.split('/'));

  const args = parseArgs(options.argv || process.argv.slice(2));
  const latestSrc = readFileSync(path.join(root, 'data', 'latest.js'), 'utf8');
  const weeks = readLatestWeeks(latestSrc).weeks;
  const week = args.week || weeks[weeks.length - 1];
  if (!week) {
    err.write('digest-send: в data/latest.js нет ни одной недели\n');
    return 1;
  }

  const snapshot = loadSnapshotFromDisk(week, root);
  const at = weeks.indexOf(week);
  const prevWeek = at > 0 ? weeks[at - 1] : null;
  let prev = null;
  if (prevWeek) {
    try {
      prev = loadSnapshotFromDisk(prevWeek, root);
    } catch {
      prev = null; // прошлая неделя не читается — выпуск без дельты, не падение
    }
  }
  // Дельта через границу версий методологии не считается: прошлая неделя
  // другой версии — не база для этого ряда (Р02.1).
  if (prev && prev.methodology !== snapshot.methodology) prev = null;
  const digest = buildDigest(snapshot, {
    prev,
    site: present(env.DIGEST_SITE) ? env.DIGEST_SITE : undefined,
    chartUrl: present(env.DIGEST_CHART_URL) ? env.DIGEST_CHART_URL : undefined,
  });

  if (!args.send) {
    out.write(`${digest.subject}\n\n${digest.text}\n`);
    out.write('dry-run: ничего не отправлено (для отправки — --send)\n');
    return 0;
  }

  const already = readSent(sentDir);
  if (already.includes(week)) {
    out.write(`неделя ${week} уже отправлена (${SENT_DIR}/${SENT_FILE}) — пропуск\n`);
    return 0;
  }

  const cfg = {
    telegram: { token: env.TELEGRAM_BOT_TOKEN, chatId: env.TELEGRAM_CHAT_ID },
    email: {
      endpoint: env.DIGEST_EMAIL_ENDPOINT,
      token: env.DIGEST_EMAIL_TOKEN,
      from: env.DIGEST_EMAIL_FROM,
      to: env.DIGEST_EMAIL_TO,
    },
    sentWeeks: already,
  };
  const result = await deliver(digest, cfg, { fetchImpl });
  if (result.errors.length) {
    for (const error of result.errors) {
      err.write(`ошибка канала ${error.channel}: ${error.message}\n`);
    }
    err.write(`неделя ${week} не считается отправленной\n`);
    return 1;
  }
  writeSent(sentDir, week);
  out.write(`отправлено (${result.sent.join(', ')}): неделя ${week}; `
    + `записано в ${SENT_DIR}/${SENT_FILE}\n`);
  return 0;
}

const invokedDirectly = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  runDigestSend()
    .then((code) => { process.exitCode = code; })
    .catch((e) => {
      process.stderr.write(`digest-send: ${e && e.message ? e.message : e}\n`);
      process.exitCode = 1;
    });
}
