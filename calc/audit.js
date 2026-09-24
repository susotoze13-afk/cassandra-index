import { createHash } from 'node:crypto';
import { appendFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const DEFAULT_LOG = fileURLToPath(new URL('../data/audit.jsonl', import.meta.url));
const GENESIS = 'GENESIS';
const TYPES = ['recalc', 'flash', 'methodology'];
const REQUIRED_FIELDS = [
  'snapshot_id',
  'version_before',
  'version_after',
  'changed_by',
  'changed_at',
  'reason',
  'parameters_changed',
  'recalculation_method',
  'diff',
  'approved_by',
];

function canonical(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  const keys = Object.keys(value).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
}

function sha256(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

function chainHash(record, prevHash) {
  return sha256(canonical(record) + prevHash);
}

function loadLines(logPath) {
  if (!existsSync(logPath)) return [];
  return readFileSync(logPath, 'utf8').split('\n').filter((line) => line.trim() !== '');
}

function parseRecord(line, index) {
  try {
    return JSON.parse(line);
  } catch {
    throw new Error(`audit: corrupt JSONL at line ${index}`);
  }
}

function validate(record) {
  if (record === null || typeof record !== 'object' || Array.isArray(record)) {
    throw new Error('audit: record must be an object');
  }
  if (!TYPES.includes(record.type)) {
    throw new Error(`audit: unknown type "${record.type}" (expected ${TYPES.join('|')})`);
  }
  for (const field of REQUIRED_FIELDS) {
    if (!(field in record) || record[field] === undefined) {
      throw new Error(`audit: missing required field "${field}"`);
    }
  }
  if (typeof record.snapshot_id !== 'string' || record.snapshot_id === '') {
    throw new Error('audit: snapshot_id must be a non-empty string');
  }
  if (record.type !== 'flash') {
    const diff = record.diff;
    const isDiffObject = diff !== null && typeof diff === 'object' && !Array.isArray(diff);
    if (!isDiffObject || Object.keys(diff).length === 0) {
      throw new Error('audit: diff must be a non-empty object {field: {from, to}}');
    }
  }
}

export function append(record, logPath = DEFAULT_LOG) {
  validate(record);

  const lines = loadLines(logPath);
  const prev = lines.length > 0 ? parseRecord(lines[lines.length - 1], lines.length - 1) : null;
  const seq = prev ? Number(prev.id.split('-')[1]) + 1 : 1;
  const prevHash = prev ? prev.hash : GENESIS;

  const { type, ...fields } = record;
  const stored = {
    ...fields,
    type,
    id: `${type}-${String(seq).padStart(4, '0')}`,
    created_by: record.changed_by,
    prev_hash: prevHash,
  };
  stored.hash = chainHash(stored, prevHash);

  appendFileSync(logPath, JSON.stringify(stored) + '\n', 'utf8');
  return { id: stored.id, hash: stored.hash };
}

export function verify(logPath = DEFAULT_LOG) {
  const lines = loadLines(logPath);
  let prevHash = GENESIS;
  for (let i = 0; i < lines.length; i += 1) {
    const record = parseRecord(lines[i], i);
    const { hash, ...body } = record;
    if (hash !== chainHash(body, prevHash)) {
      return { ok: false, brokenAt: i, count: lines.length };
    }
    prevHash = hash;
  }
  return { ok: true, brokenAt: null, count: lines.length };
}

export function read(logPath = DEFAULT_LOG) {
  return loadLines(logPath).map((line, i) => parseRecord(line, i));
}
