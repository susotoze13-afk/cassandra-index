#!/usr/bin/env node
// Проверка Developer Certificate of Origin (DCO 1.1) по trailer-блокам коммитов.
//
// Шов: чистые `parseTrailers(message)` и `checkCommits(commits)`; CLI читает
// `git log` переданного диапазона и не знает ни про GitHub API, ни про PR.
// Merge-коммиты нарушением не считаются: их сообщение формирует git, а не автор.
//
// Использование: node tools/check-dco.js <base> <head>
// Код возврата: 0 — все коммиты подписаны, 1 — есть нарушения.

import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const TRAILER_RE = /^([A-Za-z0-9][A-Za-z0-9-]*):[ \t]*(.*)$/;
const RECORD_SEPARATOR = '\x1e';
const FIELD_SEPARATOR = '\x1f';

function normalizeNewlines(text) {
  return String(text ?? '').replace(/\r\n?/g, '\n');
}

// Trailer-блок — последний абзац сообщения, где каждая строка вида `Key: value`
// (так его видит `git interpret-trailers`). Подпись в теле коммита не считается.
export function parseTrailers(message) {
  const lines = normalizeNewlines(message).split('\n');
  let end = lines.length - 1;
  while (end >= 0 && lines[end].trim() === '') end -= 1;

  const trailers = [];
  for (let i = end; i >= 0; i -= 1) {
    const line = lines[i];
    if (line.trim() === '') break;
    const match = TRAILER_RE.exec(line);
    if (!match) break;
    trailers.unshift({ key: match[1].toLowerCase(), value: match[2].trim() });
  }

  return {
    signedOffBy: trailers
      .filter((trailer) => trailer.key === 'signed-off-by' && trailer.value !== '')
      .map((trailer) => trailer.value),
  };
}

function isMergeCommit(commit) {
  if (!commit) return false;
  if (commit.merge === true) return true;
  if (Array.isArray(commit.parents)) return commit.parents.filter(Boolean).length > 1;
  if (typeof commit.parents === 'string') {
    return commit.parents.trim().split(/\s+/).filter(Boolean).length > 1;
  }
  if (typeof commit.parentCount === 'number') return commit.parentCount > 1;
  return false;
}

function firstLine(text) {
  return normalizeNewlines(text).split('\n')[0].trim();
}

export function checkCommits(commits) {
  const offenders = [];
  for (const commit of commits ?? []) {
    if (isMergeCommit(commit)) continue;
    const { signedOffBy } = parseTrailers(commit.message ?? '');
    if (signedOffBy.length === 0) {
      offenders.push({
        sha: commit.sha ?? '',
        subject: commit.subject || firstLine(commit.message) || '(без темы)',
        reason: 'missing-signed-off-by',
      });
    }
  }
  return { ok: offenders.length === 0, offenders };
}

// Читает диапазон `git log base..head` и возвращает коммиты для checkCommits.
export function readCommits(base, head) {
  const format = ['%H', '%P', '%s', '%B'].join('%x1f') + '%x1e';
  const output = execFileSync('git', ['log', `--format=${format}`, `${base}..${head}`], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });

  return output
    .split(RECORD_SEPARATOR)
    .map((record) => record.replace(/^\n+/, ''))
    .filter((record) => record.trim() !== '')
    .map((record) => {
      const [sha, parents, subject, ...messageParts] = record.split(FIELD_SEPARATOR);
      return {
        sha,
        parents,
        subject,
        message: messageParts.join(FIELD_SEPARATOR),
      };
    });
}

function main(argv) {
  const [base, head] = argv;
  if (!base || !head) {
    console.error('Использование: node tools/check-dco.js <base> <head>');
    return 2;
  }

  let result;
  try {
    result = checkCommits(readCommits(base, head));
  } catch (error) {
    console.error(`Не удалось прочитать git log ${base}..${head}: ${error.message}`);
    return 2;
  }

  if (result.ok) {
    console.log(`DCO: все коммиты диапазона ${base}..${head} подписаны Signed-off-by.`);
    return 0;
  }

  console.error(`DCO: ${result.offenders.length} коммит(ов) без Signed-off-by:`);
  for (const offender of result.offenders) {
    console.error(`  - ${offender.sha} ${offender.subject}`);
  }
  console.error('Подпишите коммиты: git commit -s (или git rebase --signoff).');
  return 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = main(process.argv.slice(2));
}
