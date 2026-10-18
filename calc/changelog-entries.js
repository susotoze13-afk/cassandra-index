// changelog-entries.js — курируемая история изменений публичного слоя.
// Не аудиторский журнал (data/audit.jsonl — внутренний, в выкат не идёт и
// говорит про пересчёты), а смысл изменений: методология, таксономия, схема,
// поля. В файле записи хранятся по возрастанию даты, отдаются по убыванию
// (sortedDesc); дат «сегодня» и timestamp здесь нет — только случившиеся даты.
//
// Запись: {date: 'YYYY-MM-DD', version: '3.0', kind: 'methodology'|'taxonomy'|
// 'schema'|'field'|'fix'|'product', title, body, link?}.
// version — версия методологии, в которой изменение действует.

export const KINDS = ['methodology', 'taxonomy', 'schema', 'field', 'fix', 'product'];

const REPO = 'https://github.com/susotoze13-afk/cassandra-index/blob/master';

export const CHANGELOG = [
  {
    date: '2026-10-11',
    version: '3.0',
    kind: 'methodology',
    title: 'Методология 3.0: рыночный стресс-критерий D4.6',
    body: 'В драйвер Д4 добавлен критерий D4.6 «стресс рынков» с порядковой шкалой '
      + '0 / 0,33 / 0,67 / 1. Цепочка недель 2026-08-30 … 2026-10-18 перевыпущена '
      + 'под версией 3.0, k = 1,95 подтверждён на якорях.',
    link: `${REPO}/docs/adr/0021-market-criterion-methodology-3.md`,
  },
  {
    date: '2026-10-18',
    version: '3.0',
    kind: 'taxonomy',
    title: 'Таксономия регионов 2.0: двенадцать регионов',
    body: 'Недели начиная с 2026-10-18 считаются набором 2.0 (двенадцать регионов); '
      + 'более ранние недели остаются набором 1.0 (шесть регионов). Версия таксономии '
      + 'версионируется отдельно от методологии: глобальный ряд не рвётся.',
    link: `${REPO}/docs/adr/0028-region-taxonomy-v2.md`,
  },
  {
    date: '2026-10-18',
    version: '3.0',
    kind: 'schema',
    title: 'Публичный экспорт данных, схема 1',
    body: 'Появились data/public/index.json, latest.json, cassandra-index.csv и trend.svg. '
      + 'Каждый файл несёт поле schema и schema_version; числа — производная от '
      + 'снапшотов недель, отдельного расчёта нет.',
  },
  {
    date: '2026-10-18',
    version: '3.0',
    kind: 'field',
    title: 'Поле precursor в снапшоте недели',
    body: 'Слой Д9 публикуется отдельным полем precursor {value, signaling_subgroups} и '
      + 'в индекс не входит. Поле forward-only: его отсутствие означает, что слой не '
      + 'публиковался, а не ноль сигналов.',
    link: `${REPO}/docs/adr/0047-precursor-risk-d9-forward-only.md`,
  },
  {
    date: '2026-10-18',
    version: '3.0',
    kind: 'field',
    title: 'Цитаты источников в поле quotes',
    body: 'Запись источника может нести quotes [{criterion, text}] — дословную цитату, '
      + 'привязанную к критерию. Дословность проверяется при записи недели, а не при '
      + 'чтении.',
    link: `${REPO}/docs/adr/0041-quotes-in-source-record.md`,
  },
  {
    date: '2026-10-18',
    version: '3.0',
    kind: 'field',
    title: 'Поле intersection во входе недели',
    body: 'Критерий с intersection: true считается покрытым, но не входит в скор '
      + 'драйвера: событие уже учтено другим критерием. Публичный снапшот и версия '
      + 'методологии от этого поля не меняются.',
    link: `${REPO}/docs/adr/0046-intersection-field-in-week-input.md`,
  },
];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// validateChangelog(list) → string[] — ошибки формы, пустой массив у валидного.
export function validateChangelog(list) {
  if (!Array.isArray(list)) return ['changelog: ожидается массив записей'];
  const errors = [];
  const seen = new Set();
  list.forEach((entry, i) => {
    const pfx = `changelog[${i}]`;
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      errors.push(`${pfx}: ожидается объект`);
      return;
    }
    if (typeof entry.date !== 'string' || !DATE_RE.test(entry.date)) {
      errors.push(`${pfx}.date: требуется YYYY-MM-DD`);
    }
    if (typeof entry.version !== 'string' || entry.version.trim() === '') {
      errors.push(`${pfx}.version: требуется непустая строка`);
    }
    if (!KINDS.includes(entry.kind)) {
      errors.push(`${pfx}.kind: одно из ${KINDS.join(', ')}`);
    }
    if (typeof entry.title !== 'string' || entry.title.trim() === '') {
      errors.push(`${pfx}.title: требуется непустая строка`);
    }
    if (typeof entry.body !== 'string' || entry.body.trim() === '') {
      errors.push(`${pfx}.body: требуется непустая строка`);
    }
    if (entry.link !== undefined) {
      if (typeof entry.link !== 'string' || !/^https?:\/\/\S+$/.test(entry.link)) {
        errors.push(`${pfx}.link: требуется http(s)-ссылка`);
      }
    }
    const key = `${entry.date}\u0000${entry.title}`;
    if (seen.has(key)) errors.push(`${pfx}: дубль записи (${entry.date}, ${entry.title})`);
    seen.add(key);
  });
  return errors;
}

// sortedDesc(list) → новый массив, новые записи первыми; исходный не мутирует.
export function sortedDesc(list) {
  return [...list].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
