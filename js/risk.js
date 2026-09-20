// Шкала §10 (PRD): 0–20 Calm … 97–100 Extreme threat.
// Единственное место, где живут пороги.
export const SCALE = [
  { max: 20, id: 'calm' },
  { max: 40, id: 'tense' },
  { max: 60, id: 'danger' },
  { max: 80, id: 'very' },
  { max: 96, id: 'critical' },
  { max: 100, id: 'extreme' },
];

const TONES = {
  calm: '--state-calm',
  tense: '--state-tense',
  danger: '--state-danger',
  very: '--state-very',
  critical: '--state-critical',
  extreme: '--state-extreme',
};

export function status(index) {
  if (typeof index !== 'number' || Number.isNaN(index) || index < 0 || index > 100) return null;
  return SCALE.find((s) => index <= s.max).id;
}

export function tone(statusId) {
  return TONES[statusId] ?? null;
}

// Цвет недельного изменения: рост → --state-very, снижение → --state-calm, ноль → --text-secondary.
export function deltaTone(change) {
  if (typeof change !== 'number' || Number.isNaN(change)) return null;
  if (change > 0) return '--state-very';
  if (change < 0) return '--state-calm';
  return '--text-secondary';
}
