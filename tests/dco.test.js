import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseTrailers, checkCommits } from '../tools/check-dco.js';

// Шов — чистые функции tools/check-dco.js (interfaces.md §4): разбор trailer-блока
// и решение «коммиты подписаны». Git и сеть не участвуют, форма сообщения взята
// из `git commit -s`: подпись — последний trailer-блок, отделённый пустой строкой.

const SIGNED = [
  'Правка расчёта недели',
  '',
  'Тело коммита с объяснением.',
  '',
  'Signed-off-by: Editor <editor@example.org>',
  '',
].join('\n');

const UNSIGNED = [
  'Правка без подписи',
  '',
  'Тело коммита.',
  '',
].join('\n');

test('parseTrailers: подписанный коммит отдаёт подписанта', () => {
  assert.deepEqual(parseTrailers(SIGNED), {
    signedOffBy: ['Editor <editor@example.org>'],
  });
});

test('parseTrailers: несколько trailers — все подписи и в порядке сообщения', () => {
  const message = [
    'Правка вдвоём',
    '',
    'Co-authored-by: Second Author <second@example.org>',
    'Signed-off-by: First Author <first@example.org>',
    'Reviewed-by: Reviewer <reviewer@example.org>',
    'Signed-off-by: Second Author <second@example.org>',
    '',
  ].join('\n');
  assert.deepEqual(parseTrailers(message), {
    signedOffBy: [
      'First Author <first@example.org>',
      'Second Author <second@example.org>',
    ],
  });
});

test('parseTrailers: подпись не в последнем абзаце не считается trailer-блоком', () => {
  const message = [
    'Signed-off-by: Editor <editor@example.org>',
    '',
    'Правка, где подпись осталась в теле и не является трейлером.',
    '',
  ].join('\n');
  assert.deepEqual(parseTrailers(message), { signedOffBy: [] });
});

test('checkCommits: подписанный коммит проходит', () => {
  const result = checkCommits([
    { sha: 'aaaa1111', parents: ['base0000'], subject: 'Правка', message: SIGNED },
  ]);
  assert.equal(result.ok, true);
  assert.deepEqual(result.offenders, []);
});

test('checkCommits: неподписанный коммит — нарушитель', () => {
  const result = checkCommits([
    { sha: 'aaaa1111', parents: ['base0000'], subject: 'Правка', message: SIGNED },
    { sha: 'bbbb2222', parents: ['aaaa1111'], subject: 'Правка без подписи', message: UNSIGNED },
  ]);
  assert.equal(result.ok, false);
  assert.equal(result.offenders.length, 1);
  assert.equal(result.offenders[0].sha, 'bbbb2222');
  assert.equal(result.offenders[0].reason, 'missing-signed-off-by');
});

test('checkCommits: merge-коммит без подписи не считается нарушением', () => {
  const result = checkCommits([
    {
      sha: 'cccc3333',
      parents: ['aaaa1111', 'bbbb2222'],
      subject: "Merge branch 'feature'",
      message: "Merge branch 'feature'\n",
    },
  ]);
  assert.equal(result.ok, true);
  assert.deepEqual(result.offenders, []);
});
