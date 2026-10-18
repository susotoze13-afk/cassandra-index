// digest-send.test.js — доставка выпуска (R18, R19, R21, R22i, R17.1, R19.1):
// каналы с поддельным fetchImpl, защита от повторной отправки, CLI без сети.
// Значения «секретов» в тестах — очевидные заглушки, не настоящие токены.

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  readFileSync, existsSync, mkdtempSync, rmSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  sendTelegram, sendPreview, sendEmail, deliver, readSent, writeSent, runDigestSend,
} from '../calc/digest-send.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const WEEK = '2026-10-18';

const TELEGRAM = { token: 'TESTTELEGRAMTOKEN', chatId: '-1001234567890' };
const EMAIL = {
  endpoint: 'https://mail.example.test/send',
  token: 'TESTEMAILTOKEN',
  from: 'digest@example.test',
  to: 'first@example.test, second@example.test',
};

function recorder(status = 200) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    return { ok: status >= 200 && status < 300, status };
  };
  return { calls, impl };
}

function sink() {
  const chunks = [];
  return { chunks, write: (s) => { chunks.push(String(s)); return true; }, text: () => chunks.join('') };
}

const digest = {
  week: WEEK,
  subject: 'Cassandra Index, неделя 18 октября 2026 года',
  text: 'Текст выпуска',
  html: '<p>Текст выпуска</p>',
  telegram: '<b>Текст выпуска</b>',
  meta: { items: 5, regions: 3, hasPrev: true },
};

test('sendTelegram: POST на Bot API с chat_id и текстом', async () => {
  const { calls, impl } = recorder(200);
  const result = await sendTelegram(impl, TELEGRAM, digest.telegram);

  assert.deepEqual(result, { ok: true, status: 200 });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `https://api.telegram.org/bot${TELEGRAM.token}/sendMessage`);
  assert.equal(calls[0].init.method, 'POST');
  const body = JSON.parse(calls[0].init.body);
  assert.equal(body.chat_id, TELEGRAM.chatId);
  assert.equal(body.text, digest.telegram);
  assert.equal(body.parse_mode, 'HTML');
});

test('sendTelegram: без токена бросает с именем переменной, без утечки значения', async () => {
  const { calls, impl } = recorder(200);
  await assert.rejects(
    () => sendTelegram(impl, { chatId: '123' }, 'текст'),
    /TELEGRAM_BOT_TOKEN/,
  );
  assert.equal(calls.length, 0);
});

test('sendEmail: POST на эндпоинт, токен в заголовке, адреса списком', async () => {
  const { calls, impl } = recorder(202);
  const result = await sendEmail(impl, EMAIL, digest);

  assert.deepEqual(result, { ok: true, status: 202 });
  assert.equal(calls[0].url, EMAIL.endpoint);
  assert.equal(calls[0].init.method, 'POST');
  const headers = calls[0].init.headers;
  assert.equal(headers.Authorization, `Bearer ${EMAIL.token}`);
  const body = JSON.parse(calls[0].init.body);
  assert.equal(body.from, EMAIL.from);
  assert.deepEqual(body.to, ['first@example.test', 'second@example.test']);
  assert.equal(body.subject, digest.subject);
  assert.equal(body.html, digest.html);
});

test('sendEmail: без эндпоинта бросает с именем переменной', async () => {
  const { impl } = recorder(200);
  await assert.rejects(
    () => sendEmail(impl, { ...EMAIL, endpoint: '' }, digest),
    /DIGEST_EMAIL_ENDPOINT/,
  );
});

test('sendPreview: черновик в чат редактора, а не в канал', async () => {
  const { calls, impl } = recorder(200);
  const editor = {
    token: TELEGRAM.token,
    chatId: '555000111',
    approvalUrl: 'https://github.com/o/r/actions/runs/42',
  };
  const result = await sendPreview(impl, editor, digest);

  assert.deepEqual(result, { ok: true, status: 200 });
  assert.equal(calls.length, 1);
  const body = JSON.parse(calls[0].init.body);
  assert.equal(body.chat_id, editor.chatId);
  assert.match(body.text, /Черновик выпуска/);
  assert.match(body.text, /после одобрения/);
  assert.ok(body.text.includes(digest.telegram));
  assert.ok(body.text.includes(editor.approvalUrl));
  assert.match(body.text, /Одобрить в GitHub Actions/);
});

test('sendPreview: без чата редактора — имя переменной, без запроса', async () => {
  const { calls, impl } = recorder(200);
  await assert.rejects(
    () => sendPreview(impl, { token: TELEGRAM.token }, digest),
    /TELEGRAM_EDITOR_CHAT_ID/,
  );
  assert.equal(calls.length, 0);
});

test('deliver: оба канала отправлены', async () => {
  const { calls, impl } = recorder(200);
  const result = await deliver(digest, { telegram: TELEGRAM, email: EMAIL, sentWeeks: [] }, { fetchImpl: impl });

  assert.deepEqual(result, { sent: ['telegram', 'email'], skipped: [], errors: [] });
  assert.equal(calls.length, 2);
});

test('deliver: повтор недели — skipped без единого запроса', async () => {
  const { calls, impl } = recorder(200);
  const result = await deliver(
    digest,
    { telegram: TELEGRAM, email: EMAIL, sentWeeks: [WEEK] },
    { fetchImpl: impl },
  );

  assert.equal(result.sent.length, 0);
  assert.deepEqual(result.skipped, ['telegram', 'email']);
  assert.deepEqual(result.errors, []);
  assert.equal(calls.length, 0);
});

test('deliver: ответ провайдера 5xx — ошибка канала, not sent', async () => {
  const { impl } = recorder(500);
  const result = await deliver(digest, { telegram: TELEGRAM, email: EMAIL, sentWeeks: [] }, { fetchImpl: impl });

  assert.equal(result.sent.length, 0);
  assert.equal(result.errors.length, 2);
  assert.equal(result.errors[0].channel, 'telegram');
  assert.match(result.errors[0].message, /500/);
});

test('deliver: нет секретов — имена переменных, ни одного запроса', async () => {
  const { calls, impl } = recorder(200);
  const result = await deliver(digest, { telegram: {}, email: {}, sentWeeks: [] }, { fetchImpl: impl });

  assert.equal(calls.length, 0);
  assert.equal(result.sent.length, 0);
  const message = result.errors.map((e) => e.message).join(' ');
  assert.match(message, /TELEGRAM_BOT_TOKEN/);
  assert.match(message, /DIGEST_EMAIL_ENDPOINT/);
});

test('readSent / writeSent: файл помнит неделю, без дублей', () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    assert.deepEqual(readSent(tmp), []);
    writeSent(tmp, WEEK);
    writeSent(tmp, WEEK);
    writeSent(tmp, '2026-10-11');
    assert.deepEqual(readSent(tmp), ['2026-10-11', WEEK]);
    assert.ok(existsSync(path.join(tmp, 'sent.json')));
    const file = JSON.parse(readFileSync(path.join(tmp, 'sent.json'), 'utf8'));
    assert.deepEqual(file.weeks, ['2026-10-11', WEEK]);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

function cli(options) {
  const out = sink();
  const err = sink();
  return runDigestSend({ root: ROOT, stdout: out, stderr: err, ...options })
    .then((code) => ({ code, out: out.text(), err: err.text() }));
}

test('CLI dry-run: печатает выпуск, ничего не отправляет и не пишет sent.json', async () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    const { calls, impl } = recorder(200);
    const result = await cli({
      argv: ['--week', WEEK], env: {}, sentDir: tmp, fetchImpl: impl,
    });
    assert.equal(result.code, 0);
    assert.match(result.out, /18 октября 2026/);
    assert.match(result.out, /64 из 100/);
    assert.equal(calls.length, 0);
    assert.equal(existsSync(path.join(tmp, 'sent.json')), false);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('CLI --preview: черновик редактору, sent.json не создан', async () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    const { calls, impl } = recorder(200);
    const result = await cli({
      argv: ['--preview', '--week', WEEK],
      env: {
        TELEGRAM_BOT_TOKEN: TELEGRAM.token,
        TELEGRAM_EDITOR_CHAT_ID: '555000111',
      },
      sentDir: tmp,
      fetchImpl: impl,
    });
    assert.equal(result.code, 0);
    assert.equal(calls.length, 1);
    const body = JSON.parse(calls[0].init.body);
    assert.equal(body.chat_id, '555000111');
    assert.match(result.out, /одобрени/);
    assert.equal(existsSync(path.join(tmp, 'sent.json')), false);
    assert.doesNotMatch(`${result.out}${result.err}`, new RegExp(TELEGRAM.token));
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('CLI --preview без чата редактора: код 0, тихий пропуск без запроса', async () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    const { calls, impl } = recorder(200);
    const result = await cli({
      argv: ['--preview', '--week', WEEK],
      env: { TELEGRAM_BOT_TOKEN: TELEGRAM.token },
      sentDir: tmp,
      fetchImpl: impl,
    });
    assert.equal(result.code, 0);
    assert.equal(calls.length, 0);
    assert.match(result.out, /TELEGRAM_EDITOR_CHAT_ID/);
    assert.equal(existsSync(path.join(tmp, 'sent.json')), false);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('CLI --preview: ошибка HTTP — код 1, sent.json не тронут', async () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    const { impl } = recorder(403);
    const result = await cli({
      argv: ['--preview', '--week', WEEK],
      env: {
        TELEGRAM_BOT_TOKEN: TELEGRAM.token,
        TELEGRAM_EDITOR_CHAT_ID: '555000111',
      },
      sentDir: tmp,
      fetchImpl: impl,
    });
    assert.equal(result.code, 1);
    assert.match(result.err, /403/);
    assert.equal(existsSync(path.join(tmp, 'sent.json')), false);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('CLI --preview несовместим с --send/--reserve', async () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    const { calls, impl } = recorder(200);
    await assert.rejects(
      () => cli({
        argv: ['--preview', '--send', '--week', WEEK],
        env: {},
        sentDir: tmp,
        fetchImpl: impl,
      }),
      /несовместим/,
    );
    assert.equal(calls.length, 0);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('CLI --send без секретов: код 1, имя переменной, sent.json не создан', async () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    const { calls, impl } = recorder(200);
    const result = await cli({
      argv: ['--send', '--week', WEEK], env: {}, sentDir: tmp, fetchImpl: impl,
    });
    assert.equal(result.code, 1);
    assert.match(result.err, /TELEGRAM_BOT_TOKEN/);
    assert.equal(calls.length, 0);
    assert.equal(existsSync(path.join(tmp, 'sent.json')), false);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('CLI --send: успех пишет неделю, значения секретов не печатаются', async () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    const { calls, impl } = recorder(200);
    const env = {
      TELEGRAM_BOT_TOKEN: TELEGRAM.token,
      TELEGRAM_CHAT_ID: TELEGRAM.chatId,
      DIGEST_EMAIL_ENDPOINT: EMAIL.endpoint,
      DIGEST_EMAIL_TOKEN: EMAIL.token,
      DIGEST_EMAIL_FROM: EMAIL.from,
      DIGEST_EMAIL_TO: EMAIL.to,
    };
    const result = await cli({
      argv: ['--send', '--week', WEEK], env, sentDir: tmp, fetchImpl: impl,
    });
    assert.equal(result.code, 0);
    assert.equal(calls.length, 2);
    assert.deepEqual(readSent(tmp), [WEEK]);
    const printed = `${result.out}${result.err}`;
    assert.doesNotMatch(printed, new RegExp(TELEGRAM.token));
    assert.doesNotMatch(printed, new RegExp(EMAIL.token));
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('CLI --send: ошибка провайдера — код 1, sent.json не обновлён', async () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    const { impl } = recorder(500);
    const env = {
      TELEGRAM_BOT_TOKEN: TELEGRAM.token,
      TELEGRAM_CHAT_ID: TELEGRAM.chatId,
      DIGEST_EMAIL_ENDPOINT: EMAIL.endpoint,
      DIGEST_EMAIL_TOKEN: EMAIL.token,
      DIGEST_EMAIL_FROM: EMAIL.from,
      DIGEST_EMAIL_TO: EMAIL.to,
    };
    const result = await cli({
      argv: ['--send', '--week', WEEK], env, sentDir: tmp, fetchImpl: impl,
    });
    assert.equal(result.code, 1);
    assert.match(result.err, /telegram/);
    assert.equal(existsSync(path.join(tmp, 'sent.json')), false);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('CLI --send: повтор недели — код 0, skipped, без запросов', async () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ci-sent-'));
  try {
    writeSent(tmp, WEEK);
    const { calls, impl } = recorder(200);
    const env = {
      TELEGRAM_BOT_TOKEN: TELEGRAM.token,
      TELEGRAM_CHAT_ID: TELEGRAM.chatId,
    };
    const result = await cli({
      argv: ['--send', '--week', WEEK], env, sentDir: tmp, fetchImpl: impl,
    });
    assert.equal(result.code, 0);
    assert.equal(calls.length, 0);
    assert.match(result.out, /пропуск/i);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('weekly-digest.yml: понедельник, dispatch, превью, одобрение, отправка, SHA-пиннинг', () => {
  const workflow = readFileSync(
    path.join(ROOT, '.github', 'workflows', 'weekly-digest.yml'),
    'utf8',
  );

  assert.match(workflow, /cron: '[0-9*\/, -]+ \* \* 1'/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /node calc\/digest-export\.js --write/);
  // Превью редактору — до одобрения; отправка — в отдельном job с environment.
  assert.match(workflow, /node calc\/digest-send\.js --preview/);
  assert.match(workflow, /TELEGRAM_EDITOR_CHAT_ID/);
  assert.match(workflow, /needs: prepare/);
  assert.match(workflow, /environment:\s*\n\s*name: digest-approval/);
  assert.match(workflow, /node calc\/digest-send\.js --send/);
  assert.match(workflow, /data\/digest\/sent\.json/);
  assert.match(workflow, /github-actions\[bot\]/);
  // Все actions — по полному SHA, а секреты только именами.
  for (const line of workflow.split('\n')) {
    const uses = /^\s*-?\s*uses: (\S+)/.exec(line);
    if (uses) assert.match(uses[1], /@[0-9a-f]{40}$/, `actions без SHA-пиннинга: ${uses[1]}`);
  }
  assert.doesNotMatch(workflow, /secrets\.\w+\s*=\s*\S+/);
});

test('.env.example: только имена переменных дайджеста с пустыми значениями', () => {
  const lines = readFileSync(path.join(ROOT, '.env.example'), 'utf8')
    .split('\n')
    .filter((line) => line.trim() !== '');

  assert.deepEqual(lines, [
    'TELEGRAM_BOT_TOKEN=',
    'TELEGRAM_CHAT_ID=',
    'TELEGRAM_EDITOR_CHAT_ID=',
    'DIGEST_EMAIL_ENDPOINT=',
    'DIGEST_EMAIL_TOKEN=',
    'DIGEST_EMAIL_FROM=',
    'DIGEST_EMAIL_TO=',
  ]);
});
