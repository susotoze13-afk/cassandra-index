// validation-page.js — статическая страница публичной валидации (R01, R03.1,
// R09–R13, R23–R24, R27i). Полный HTML-документ в стиле digest-page.js:
// без скриптов, внешних ресурсов и JSON-LD, все подставляемые значения —
// через escapeHtml. Числа берутся только из validation.json и
// forecast-ledger.json: коэффициенты — 2 знака, доля — целые проценты,
// null и 'insufficient' — «—» с короткой причиной, а не ноль.

import { escapeHtml } from './digest.js';

export const VALIDATION_PAGE_FILE = 'validation.html';

const SITE = 'https://cassindex.ru';
const DASH = '—';
const METRICS_PERMALINK = 'data/public/validation.json';
const LEDGER_PERMALINK = 'data/public/forecast-ledger.json';
const FIXTURES = 'calc/backtest-fixtures/';

// Дословно тот же CSP, что STATIC_CSP в blog-build.js (пин — tests/validation-page.test.js).
const STATIC_CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; "
  + "font-src 'self'; base-uri 'self'; object-src 'none'";

const TITLE = 'Валидация и журнал прогнозов — Cassandra Index';
const DESCRIPTION = 'Сравнение недельного индекса Cassandra с GPR, ACLED и CrisisWatch: '
  + 'коэффициенты, расхождения, лаги и журнал прогнозов с попаданиями и промахами.';

// Даже при пустом validation.json якоря компараторов остаются на странице —
// читатель видит «данных нет», а не пропавший раздел.
const COMPARATOR_IDS = ['gpr', 'acled', 'crisiswatch'];
const COMPARATOR_TITLES = {
  gpr: 'Geopolitical Risk Index (GPR)',
  acled: 'ACLED — события политического насилия',
  crisiswatch: 'CrisisWatch (International Crisis Group)',
};

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

const CLUSTER_LABELS = {
  calm: 'спокойный',
  tense: 'напряжённый',
  danger: 'опасный',
  very: 'очень высокий',
  critical: 'критический',
  extreme: 'предельный',
  unknown: 'неизвестный',
};

const DIRECTION_LABELS = { down: 'снижение', flat: 'без изменения', up: 'рост' };
const OUTCOME_LABELS = { hit: 'попадание', miss: 'промах', pending: 'ожидает факта' };
const FIELD_LABELS = { cluster: 'кластер', direction: 'направление' };

function clusterLabel(id) {
  if (typeof id !== 'string' || id === '') return DASH;
  return CLUSTER_LABELS[id] || id;
}

function directionLabel(id) {
  if (typeof id !== 'string' || id === '') return DASH;
  return DIRECTION_LABELS[id] || id;
}

function outcomeLabel(id) {
  if (typeof id !== 'string' || id === '') return DASH;
  return OUTCOME_LABELS[id] || id;
}

function coef(v) {
  return isNum(v) ? v.toFixed(2) : DASH;
}

function percent(rate) {
  if (!isNum(rate)) return DASH;
  return `${Math.round(rate * 100)} %`;
}

function signed(v) {
  if (!isNum(v)) return DASH;
  const abs = Number.isInteger(v) ? String(Math.abs(v)) : Math.abs(v).toFixed(2);
  if (v > 0) return `+${abs}`;
  if (v < 0) return `-${abs}`;
  return '0';
}

function coefStatus(status) {
  if (status === 'ok') return 'выборка достаточная';
  if (status === 'preliminary') return 'предварительно';
  return 'не рассчитывается';
}

function directionStatus(status) {
  return status === 'insufficient' ? 'не рассчитывается' : 'описательно';
}

function nullReason(section, minPairs) {
  const n = section && isNum(section.n) ? section.n : 0;
  if (section && section.status === 'insufficient') {
    return `пар ${n} — меньше порога ${minPairs}`;
  }
  return 'коэффициент не определён (нулевая дисперсия)';
}

function verificationLabel(verified) {
  if (verified === true) return 'подтверждено git';
  if (verified === false) return 'нарушен порядок публикации';
  return 'история git недоступна';
}

function sourceParagraph(provenance, label) {
  if (!provenance || typeof provenance !== 'object') {
    return [`      <p class="doc-meta">${escapeHtml(label)}: провенанс не указан.</p>`];
  }
  const name = escapeHtml(provenance.name || label);
  const url = typeof provenance.url === 'string' ? escapeHtml(provenance.url) : '';
  const dataUrl = typeof provenance.data_url === 'string' ? escapeHtml(provenance.data_url) : '';
  const parts = [];
  if (url) parts.push(`<a href="${url}">${name}</a>`);
  else parts.push(name);
  if (dataUrl) parts.push(`данные: <a href="${dataUrl}">ссылка на ряд</a>`);
  if (typeof provenance.retrieved === 'string') {
    parts.push(`получено ${escapeHtml(provenance.retrieved)}`);
  }
  if (typeof provenance.as_of === 'string') {
    parts.push(`по состоянию на ${escapeHtml(provenance.as_of)}`);
  }
  const lines = [`      <p>Источник: ${parts.join('; ')}.</p>`];
  if (typeof provenance.license === 'string' && provenance.license) {
    lines.push(`      <p>Условия: ${escapeHtml(provenance.license)}.</p>`);
  }
  return lines;
}

function metricsTable(comparator, minPairs) {
  const rows = [
    ['Уровни', comparator.levels],
    ['Дельты', comparator.deltas],
  ];
  const lines = [
    '      <table class="doc-table">',
    '        <thead><tr><th>Ряд</th><th>n</th><th>Пирсон</th><th>Спирмен</th>'
      + '<th>p (перестановки)</th><th>Статус</th></tr></thead>',
    '        <tbody>',
  ];
  for (const [name, section] of rows) {
    const s = section || {};
    const n = isNum(s.n) ? String(s.n) : DASH;
    const reason = nullReason(s, minPairs);
    const r = isNum(s.pearson) ? coef(s.pearson) : `${DASH} <span class="doc-meta">${escapeHtml(reason)}</span>`;
    const rho = isNum(s.spearman) ? coef(s.spearman) : DASH;
    const p = isNum(s.p_permutation) ? s.p_permutation.toFixed(3) : DASH;
    lines.push(`          <tr><td>${escapeHtml(name)}</td><td>${n}</td><td>${r}</td>`
      + `<td>${rho}</td><td>${p}</td><td>${escapeHtml(coefStatus(s.status))}</td></tr>`);
  }
  lines.push('        </tbody>', '      </table>');
  return lines;
}

function directionParagraph(comparator) {
  const d = comparator.direction || {};
  if (d.status === 'insufficient' || !isNum(d.rate)) {
    return `      <p>Совпадение знаков первых разностей: ${DASH} — пар меньше двух, показатель не рассчитывается `
      + `(попаданий ${isNum(d.hits) ? d.hits : 0}, пар ${isNum(d.total) ? d.total : 0}, `
      + `пропущено ${isNum(d.skipped) ? d.skipped : 0}).</p>`;
  }
  return `      <p>Совпадение знаков первых разностей: <strong>${percent(d.rate)}</strong> `
    + `(${d.hits} из ${d.total}, пропущено ${d.skipped}). Статус: ${escapeHtml(directionStatus(d.status))}.</p>`;
}

function leadLagTable(comparator, minPairs) {
  const ll = comparator.lead_lag || {};
  const byLag = Array.isArray(ll.by_lag) ? ll.by_lag : [];
  const lines = [
    '      <h3>Лаг</h3>',
    '      <p class="doc-meta">Кросс-корреляция первых разностей при сдвигах −2…+2; '
      + 'положительный сдвиг означает, что внешний ряд опережает индекс.</p>',
  ];
  if (byLag.length === 0) {
    lines.push('      <p>Лаги не рассчитаны: пересечения нет.</p>');
    return lines;
  }
  lines.push(
    '      <table class="doc-table">',
    '        <thead><tr><th>Сдвиг</th><th>n</th><th>Пирсон</th></tr></thead>',
    '        <tbody>',
  );
  for (const entry of byLag) {
    const lag = isNum(entry.lag) ? String(entry.lag) : DASH;
    const n = isNum(entry.n) ? String(entry.n) : DASH;
    const reason = isNum(entry.n) && entry.n < minPairs ? 'пар меньше порога' : 'коэффициент не определён';
    const r = isNum(entry.pearson)
      ? coef(entry.pearson)
      : `${DASH} <span class="doc-meta">${escapeHtml(reason)}</span>`;
    lines.push(`          <tr><td>${lag}</td><td>${n}</td><td>${r}</td></tr>`);
  }
  lines.push('        </tbody>', '      </table>');
  if (isNum(ll.best_lag) && isNum(ll.best)) {
    lines.push(`      <p>Наибольший по модулю коэффициент — при сдвиге ${ll.best_lag} (${coef(ll.best)}). `
      + 'Статус: ' + escapeHtml(coefStatus(ll.status)) + '.</p>');
  } else {
    lines.push(`      <p>Наилучший сдвиг не рассчитывается: ${DASH} (пар меньше порога ${minPairs}).</p>`);
  }
  return lines;
}

function discrepanciesBlock(comparator) {
  const list = Array.isArray(comparator.discrepancies) ? comparator.discrepancies : [];
  const lines = ['      <h3>Расхождения</h3>'];
  if (list.length === 0) {
    lines.push('      <p>Расхождений с разными знаками изменений в пересечении нет.</p>');
    return lines;
  }
  lines.push(
    '      <p class="doc-meta">Периоды, где знаки первых разностей разошлись (обе дельты ненулевые).</p>',
    '      <table class="doc-table">',
    '        <thead><tr><th>Период</th><th>Δ индекса</th><th>Δ внешнего ряда</th></tr></thead>',
    '        <tbody>',
  );
  for (const d of list) {
    lines.push(`          <tr><td>${escapeHtml(d.period)}</td><td>${signed(d.index_delta)}</td>`
      + `<td>${signed(d.external_delta)}</td></tr>`);
  }
  lines.push('        </tbody>', '      </table>');
  return lines;
}

function comparatorSection(comparator, thresholds) {
  if (!comparator || typeof comparator !== 'object') return [];
  const id = comparator.id;
  const minPairs = thresholds && isNum(thresholds.min_pairs) ? thresholds.min_pairs : 6;
  const title = typeof comparator.title === 'string' && comparator.title ? comparator.title : id;
  const lines = [
    `    <section id="${escapeHtml(id)}" aria-labelledby="${escapeHtml(id)}-title">`,
    `      <h2 id="${escapeHtml(id)}-title">${escapeHtml(title)}</h2>`,
  ];
  const construct = comparator.construct && typeof comparator.construct.ru === 'string'
    ? comparator.construct.ru : '';
  if (construct) lines.push(`      <p>${escapeHtml(construct)}</p>`);
  const overlap = comparator.overlap || {};
  const periods = isNum(overlap.periods) ? overlap.periods : 0;
  lines.push(`      <p class="doc-meta">Пересечение: ${periods} периодов`
    + `${overlap.from ? `, ${escapeHtml(overlap.from)} — ${escapeHtml(overlap.to)}` : ''}; `
    + 'гранулярность: ' + escapeHtml(comparator.granularity === 'week' ? 'неделя' : 'месяц') + '.</p>');
  lines.push('      <div class="doc-source">');
  lines.push(...sourceParagraph(comparator.provenance, title));
  lines.push('      </div>');
  lines.push('      <h3>Метрики</h3>');
  const table = metricsTable(comparator, minPairs);
  lines.push(...table);
  lines.push(directionParagraph(comparator));
  lines.push(...leadLagTable(comparator, minPairs));
  lines.push(...discrepanciesBlock(comparator));
  if (typeof comparator.note === 'string' && comparator.note) {
    lines.push(`      <div class="doc-note"><p>${escapeHtml(comparator.note)}</p></div>`);
  }
  if (id === 'acled') {
    lines.push(
      '      <h3 id="acled-conflict-index">Почему сравнение идёт по данным о событиях, а не по Conflict Index</h3>',
      '      <p>Conflict Index — страновой композит, который ACLED публикует раз в полгода; '
        + 'машинного доступа к нему нет, а пересечения с восемью неделями методологии 3.0 '
        + '(с 30 августа по 18 октября 2026 года) не возникает. Поэтому сравнение идёт по '
        + 'помесячным данным ACLED о событиях политического насилия: число событий за месяц '
        + 'против среднего индекса по неделям этого месяца. Это разные конструкты — счёт '
        + 'произошедших событий и сводная оценка состояния риска, — и сходимость таких рядов '
        + 'не подтверждает правильность индекса.</p>',
    );
  }
  lines.push('    </section>');
  return lines;
}

function missingComparatorSection(id) {
  const title = COMPARATOR_TITLES[id] || id;
  return [
    `    <section id="${escapeHtml(id)}" aria-labelledby="${escapeHtml(id)}-title">`,
    `      <h2 id="${escapeHtml(id)}-title">${escapeHtml(title)}</h2>`,
    '      <div class="doc-note"><p>Ряд не подключён: данных для сравнения нет. '
      + 'Это не ноль и не отсутствие связи — коэффициент не рассчитывался.</p></div>',
    '    </section>',
  ];
}

function comparatorsOverview(comparators) {
  const lines = [
    '    <table class="doc-table">',
    '      <thead><tr><th>Ряд</th><th>Пересечение</th><th>Уровни</th><th>Дельты</th>'
      + '<th>Направление</th><th>Лаг</th></tr></thead>',
    '      <tbody>',
  ];
  for (const c of comparators) {
    const overlap = c.overlap || {};
    const d = c.direction || {};
    const ll = c.lead_lag || {};
    const direction = d.status === 'insufficient' ? 'не рассчитывается' : percent(d.rate);
    const lag = isNum(ll.best_lag) ? `сдвиг ${ll.best_lag}` : 'не рассчитывается';
    const title = typeof c.title === 'string' ? c.title : c.id;
    lines.push(`        <tr><td><a href="#${escapeHtml(c.id)}">${escapeHtml(title)}</a></td>`
      + `<td>${isNum(overlap.periods) ? overlap.periods : 0}</td>`
      + `<td>${escapeHtml(coefStatus(c.levels && c.levels.status))}</td>`
      + `<td>${escapeHtml(coefStatus(c.deltas && c.deltas.status))}</td>`
      + `<td>${escapeHtml(direction)}</td><td>${escapeHtml(lag)}</td></tr>`);
  }
  lines.push('      </tbody>', '    </table>');
  if (comparators.length === 0) {
    lines.splice(2, lines.length - 2, '    <p>Компараторов нет: внешние ряды не подключены.</p>');
  }
  return lines;
}

function summarySection(validation) {
  const weeks = Array.isArray(validation.weeks) ? validation.weeks : [];
  const summary = validation.summary || {};
  const thresholds = validation.thresholds || {};
  const minPairs = isNum(thresholds.min_pairs) ? thresholds.min_pairs : 6;
  const preliminaryBelow = isNum(thresholds.preliminary_below) ? thresholds.preliminary_below : 20;
  const from = weeks.length ? weeks[0] : DASH;
  const to = weeks.length ? weeks[weeks.length - 1] : DASH;
  return [
    '    <section id="summary" aria-labelledby="summary-title">',
    '      <h2 id="summary-title">Сводка</h2>',
    '      <p class="doc-lede">Недельный индекс Cassandra сравнивается с тремя независимыми '
      + 'рядами: GPR, ACLED и CrisisWatch. Ниже — пересечение по периодам, коэффициенты, '
      + 'совпадение направления, лаги и расхождения. Всё пересобирается из офлайн-фикстур '
      + 'одной командой, поэтому числа на странице воспроизводимы.</p>',
    `      <p class="doc-meta">Методология: ${escapeHtml(validation.methodology || DASH)}; `
      + `недель в ряду: ${weeks.length} (${escapeHtml(from)} — ${escapeHtml(to)}); `
      + `компараторов: ${isNum(summary.comparators) ? summary.comparators : 0}; `
      + `с коэффициентами: ${isNum(summary.with_coefficients) ? summary.with_coefficients : 0}; `
      + `без коэффициентов: ${isNum(summary.insufficient) ? summary.insufficient : 0}.</p>`,
    `      <p class="doc-meta">Минимум пар для публикации коэффициента: ${minPairs}; `
      + `при ${minPairs}—${preliminaryBelow - 1} парах значение помечается «предварительно». `
      + 'Ниже порога коэффициент не рассчитывается: в таблице стоит «' + DASH + '» и причина.</p>',
    '    </section>',
  ];
}

function entryOutcome(entry) {
  const outcome = entry.outcome || {};
  return `кластер: ${outcomeLabel(outcome.cluster)}; направление: ${outcomeLabel(outcome.direction)}`;
}

function entryTable(entries, kind) {
  const withVerification = kind === 'editor';
  const head = withVerification
    ? '<th>Неделя</th><th>Ожидание: кластер</th><th>Ожидание: направление</th>'
      + '<th>Факт: индекс</th><th>Факт: кластер</th><th>Факт: направление</th>'
      + '<th>Проверка git</th><th>Итог</th>'
    : '<th>Неделя</th><th>Ожидание: кластер</th><th>Ожидание: направление</th>'
      + '<th>Факт: индекс</th><th>Факт: кластер</th><th>Факт: направление</th><th>Итог</th>';
  const lines = [
    '      <table class="doc-table">',
    `        <thead><tr>${head}</tr></thead>`,
    '        <tbody>',
  ];
  for (const entry of entries) {
    const cells = [
      escapeHtml(entry.week || DASH),
      escapeHtml(clusterLabel(entry.expectedCluster)),
      escapeHtml(directionLabel(entry.expectedDirection)),
      isNum(entry.actualIndex) ? String(entry.actualIndex) : DASH,
      escapeHtml(clusterLabel(entry.actualCluster)),
      escapeHtml(directionLabel(entry.actualDirection)),
    ];
    if (withVerification) cells.push(escapeHtml(verificationLabel(entry.verified)));
    cells.push(escapeHtml(entryOutcome(entry)));
    lines.push(`          <tr>${cells.map((cell) => `<td>${cell}</td>`).join('')}</tr>`);
  }
  lines.push('        </tbody>', '      </table>');
  return lines;
}

function ledgerSection(ledger) {
  const entries = Array.isArray(ledger && ledger.entries) ? ledger.entries : [];
  const misses = Array.isArray(ledger && ledger.misses) ? ledger.misses : [];
  const summary = (ledger && ledger.summary) || {};
  const baseline = summary.baseline || {};
  const editor = summary.editor || {};
  const rule = (ledger && ledger.rule) || {};
  const deadband = rule.direction && isNum(rule.direction.deadband) ? rule.direction.deadband : 2;
  const baselineEntries = entries.filter((e) => e.kind === 'baseline');
  const editorEntries = entries.filter((e) => e.kind === 'editor');

  const lines = [
    '    <section id="ledger" aria-labelledby="ledger-title">',
    '      <h2 id="ledger-title">Журнал прогнозов</h2>',
    '      <p class="doc-lede">Журнал показывает, сбываются ли заявленные ожидания: '
      + 'ожидание, факт, попадание или промах. Промахи перечислены полностью и не спрятаны '
      + 'в раскрывающийся блок. Baseline — наивный benchmark, а не прогноз проекта; '
      + 'редакционные записи — отдельный блок.</p>',
    `      <p class="doc-meta">Правило baseline: ${escapeHtml(rule.baseline || 'ожидание = кластер прошлой опубликованной недели и направление flat')}. `
      + `Мёртвая зона направления: ±${deadband} пункта индекса. `
      + `Baseline: записей ${isNum(baseline.entries) ? baseline.entries : 0}, `
      + `кластер ${baseline.cluster ? `${baseline.cluster.hits}/${baseline.cluster.total}` : '0/0'}, `
      + `направление ${baseline.direction ? `${baseline.direction.hits}/${baseline.direction.total}` : '0/0'}. `
      + `Редакционные: записей ${isNum(editor.entries) ? editor.entries : 0}, `
      + `ожидают факта ${editor.pending ? editor.pending.cluster + editor.pending.direction : 0}. `
      + `Промахов всего: ${misses.length}.</p>`,
    '      <div class="ledger-block ledger-baseline">',
    '        <h3>Наивный benchmark (baseline)</h3>',
    '        <p>Это не прогноз проекта: правило механически повторяет кластер прошлой '
      + 'опубликованной недели и ожидает направление «без изменения». Оно восстановимо из '
      + 'опубликованных снапшотов, поэтому задним числом его нельзя подкрутить, но записью '
      + 'в git до публикации недели оно не является.</p>',
  ];
  if (baselineEntries.length === 0) {
    lines.push('        <p>Записей нет: для baseline нужны как минимум две опубликованные недели подряд.</p>');
  } else {
    lines.push('        <p class="doc-meta">Наивный benchmark по опубликованным неделям цепочки.</p>');
    lines.push(...entryTable(baselineEntries, 'baseline'));
  }
  lines.push(
    '      </div>',
    '      <div class="ledger-block ledger-editor">',
    '        <h3>Редакционные прогнозы</h3>',
    '        <p>Форвардные якоря редактора из <code>calc/input/anchors/forward-&lt;неделя&gt;.json</code>. '
      + 'Коммит добавления якоря должен быть не позже коммита добавления опубликованной недели — '
      + 'это проверяется по истории git; при недоступной истории так и сказано, а не выдаётся '
      + 'за подтверждение.</p>',
  );
  if (editorEntries.length === 0) {
    lines.push('        <p>Записей нет: редакционных форвардных якорей пока не добавлено. '
      + 'Baseline выше показан отдельно и прогнозом проекта не является.</p>');
  } else {
    lines.push(...entryTable(editorEntries, 'editor'));
  }
  lines.push(
    '      </div>',
    '      <div class="ledger-misses">',
    '        <h3>Промахи</h3>',
    '        <p>Промахи показаны наравне с попаданиями: каждая запись с несовпавшим '
      + 'ожиданием перечислена здесь.</p>',
  );
  if (misses.length === 0) {
    lines.push('        <p>Промахов нет.</p>');
  } else {
    lines.push(
      '        <table class="doc-table">',
      '          <thead><tr><th>Неделя</th><th>Тип записи</th><th>Поле</th>'
        + '<th>Ожидание</th><th>Факт</th></tr></thead>',
      '          <tbody>',
    );
    for (const miss of misses) {
      const expected = miss.field === 'cluster'
        ? clusterLabel(miss.expected) : directionLabel(miss.expected);
      const actual = miss.field === 'cluster'
        ? clusterLabel(miss.actual) : directionLabel(miss.actual);
      const kind = miss.kind === 'editor' ? 'редакционная' : 'baseline';
      lines.push(`            <tr><td>${escapeHtml(miss.week || DASH)}</td>`
        + `<td>${escapeHtml(kind)}</td><td>${escapeHtml(FIELD_LABELS[miss.field] || miss.field)}</td>`
        + `<td>${escapeHtml(expected)}</td><td>${escapeHtml(actual)}</td></tr>`);
    }
    lines.push('          </tbody>', '        </table>');
  }
  lines.push('      </div>', '    </section>');
  return lines;
}

function limitsSection() {
  return [
    '    <section id="limits" aria-labelledby="limits-title">',
    '      <h2 id="limits-title">Что это не доказывает</h2>',
    '      <p class="doc-lede">Сходимость с внешними рядами — проверка, а не доказательство '
      + 'правильности индекса. Ниже три причины, почему сравнение нельзя читать как оценку '
      + 'точности.</p>',
    '      <section id="limits-constructs" aria-labelledby="limits-constructs-title">',
    '        <h3 id="limits-constructs-title">Разные конструкты</h3>',
    '        <p>Индекс Cassandra — сводная оценка уровня и направления риска по девяти '
      + 'драйверам. GPR считает долю газетных публикаций о геополитических рисках, ACLED — '
      + 'число зафиксированных событий политического насилия, CrisisWatch — экспертные '
      + 'страновые оценки ухудшения ситуации. Ряды измеряют разное; совпадение или '
      + 'расхождение не говорит, какой из них «прав».</p>',
    '      </section>',
    '      <section id="limits-windows" aria-labelledby="limits-windows-title">',
    '        <h3 id="limits-windows-title">Разные окна</h3>',
    '        <p>Индекс недельный, GPR дневной и сводится к окну [W−6, W], ACLED и '
      + 'CrisisWatch месячные и сравниваются со средним индекса по неделям месяца. '
      + 'Полугодовой Conflict Index ACLED и страновые срезы в сравнение не входят: у них '
      + 'другая периодичность и другой уровень агрегации. К этому добавляется сдвиг '
      + 'публикации: внешний ряд за период становится известен позже, чем закрывается '
      + 'неделя индекса.</p>',
    '      </section>',
    '      <section id="limits-revisions" aria-labelledby="limits-revisions-title">',
    '        <h3 id="limits-revisions-title">Ревизии данных</h3>',
    '        <p>Внешние ряды пересматриваются задним числом: уточняются события, меняются '
      + 'страновые оценки, обновляются исторические значения GPR. Наши снапшоты недель не '
      + 'пересчитываются после публикации — это зафиксированная запись. Поэтому коэффициент, '
      + 'пересчитанный на новой версии внешнего ряда, может отличаться от опубликованного '
      + 'раньше, хотя индекс не менялся.</p>',
    '      </section>',
    '    </section>',
  ];
}

function methodSection() {
  return [
    '    <section id="method" aria-labelledby="method-title">',
    '      <h2 id="method-title">Метод</h2>',
    '      <p>Команда <code>node calc/backtest.js --write</code> собирает '
      + '<code>data/public/validation.json</code>, <code>data/public/forecast-ledger.json</code> '
      + 'и эту страницу из офлайн-фикстур. Сеть не используется.</p>',
    `      <p>Фикстуры лежат в <code>${FIXTURES}</code>: <code>gpr.json</code> (дневной ряд), `
      + '<code>acled.json</code> и <code>crisiswatch.json</code> (месячные ряды) с провенансом '
      + 'в каждом файле; порядок обновления описан в <code>calc/backtest-fixtures/README.md</code>. '
      + 'Пересборка повторяется байт в байт: даты генерации в файлы не пишутся.</p>',
    '      <p>Метрики считаются собственными функциями: Пирсон, Спирмен со средними рангами, '
      + 'перестановочный тест на детерминированном генераторе (2000 итераций, фиксированный '
      + 'seed), согласие знаков первых разностей и кросс-корреляция при сдвигах −2…+2.</p>',
    '    </section>',
  ];
}

function sourcesSection(validation) {
  const comparators = Array.isArray(validation.comparators) ? validation.comparators : [];
  const lines = [
    '    <section id="sources" aria-labelledby="sources-title">',
    '      <h2 id="sources-title">Источники рядов</h2>',
    '      <ul>',
  ];
  for (const c of comparators) {
    const provenance = c.provenance || {};
    const name = escapeHtml(provenance.name || c.title || c.id);
    const url = typeof provenance.url === 'string' ? escapeHtml(provenance.url) : '';
    const dataUrl = typeof provenance.data_url === 'string' ? escapeHtml(provenance.data_url) : '';
    const bits = [];
    if (url) bits.push(`<a href="${url}">${name}</a>`);
    else bits.push(name);
    if (dataUrl) bits.push(`<a href="${dataUrl}">данные</a>`);
    if (typeof provenance.as_of === 'string') bits.push(`по состоянию на ${escapeHtml(provenance.as_of)}`);
    if (typeof provenance.license === 'string' && provenance.license) {
      bits.push(escapeHtml(provenance.license));
    }
    lines.push(`        <li>${bits.join('; ')}.</li>`);
  }
  lines.push(
    '      </ul>',
    `      <p class="doc-links">Машинные файлы: <a href="${METRICS_PERMALINK}">validation.json</a> `
      + `<a href="${LEDGER_PERMALINK}">forecast-ledger.json</a></p>`,
    '    </section>',
  );
  return lines;
}

// renderValidationPage(validation, ledger) → полный HTML-документ.
// Порядок разделов фиксирован; отсутствующие поля дают «—» и объяснение,
// а не выдуманное число.
export function renderValidationPage(validation, ledger) {
  const v = validation && typeof validation === 'object' ? validation : {};
  const l = ledger && typeof ledger === 'object' ? ledger : {};
  const comparators = Array.isArray(v.comparators) ? v.comparators : [];
  const thresholds = v.thresholds || {};
  const byId = new Map(comparators.map((c) => [c.id, c]));
  const ordered = COMPARATOR_IDS.map((id) => ({ id, comparator: byId.get(id) || null }));
  for (const c of comparators) {
    if (!COMPARATOR_IDS.includes(c.id)) ordered.push({ id: c.id, comparator: c });
  }

  return [
    '<!doctype html>',
    '<html lang="ru">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <meta name="referrer" content="strict-origin-when-cross-origin">',
    '  <!-- CSP через meta: GitHub Pages не даёт заголовков. Страница статическая —',
    '       без скриптов, без внешних ресурсов и без JSON-LD. -->',
    `  <meta http-equiv="Content-Security-Policy" content="${STATIC_CSP}">`,
    `  <title>${escapeHtml(TITLE)}</title>`,
    `  <meta name="description" content="${escapeHtml(DESCRIPTION)}">`,
    `  <link rel="canonical" href="${SITE}/${VALIDATION_PAGE_FILE}">`,
    '  <meta property="og:type" content="article">',
    '  <meta property="og:site_name" content="Cassandra Index">',
    `  <meta property="og:title" content="${escapeHtml(TITLE)}">`,
    `  <meta property="og:description" content="${escapeHtml(DESCRIPTION)}">`,
    `  <meta property="og:url" content="${SITE}/${VALIDATION_PAGE_FILE}">`,
    '  <meta property="og:locale" content="ru_RU">',
    '  <link rel="icon" type="image/svg+xml" href="icon.svg">',
    '  <link rel="stylesheet" href="css/styles.css">',
    '</head>',
    '<body class="doc-page">',
    '',
    '  <header class="site-header">',
    '    <div class="header-inner">',
    '      <a class="brand" href="index.html">Cassandra Index</a>',
    '      <nav class="site-nav" aria-label="Навигация страницы">',
    '        <a href="index.html">На главную</a>',
    '        <a href="blog/">Блог</a>',
    '        <a href="how-to-read.html">Как читать индекс</a>',
    '        <a href="compare.html">Сравнение</a>',
    '        <a href="changelog.html">История изменений</a>',
    '      </nav>',
    '    </div>',
    '  </header>',
    '',
    '  <main id="main">',
    '    <h1>Валидация и журнал прогнозов</h1>',
    '    <p class="doc-lede">Страница показывает, сходится ли недельный индекс Cassandra '
      + 'с независимыми измерениями конфликтности: GPR, ACLED и CrisisWatch. Здесь же — '
      + 'журнал прогнозов с попаданиями и промахами и раздел о том, чего это сравнение '
      + 'не доказывает.</p>',
    `    <p class="doc-meta">Все числа — производная <a href="${METRICS_PERMALINK}">validation.json</a> `
      + `и <a href="${LEDGER_PERMALINK}">forecast-ledger.json</a>; руками файлы не правятся.</p>`,
    '',
    ...summarySection(v),
    '',
    '    <section id="comparators" aria-labelledby="comparators-title">',
    '      <h2 id="comparators-title">Компараторы</h2>',
    '      <p>Три независимых ряда и статус сравнения по каждому. Подробности — в разделах ниже.</p>',
    ...comparatorsOverview(comparators),
    '    </section>',
    '',
    ...ordered.flatMap(({ id, comparator }) => ['',
      ...(comparator ? comparatorSection(comparator, thresholds) : missingComparatorSection(id))]),
    '',
    ...limitsSection(),
    '',
    ...ledgerSection(l),
    '',
    ...methodSection(),
    '',
    ...sourcesSection(v),
    '  </main>',
    '',
    '  <footer class="site-footer">',
    '    <p class="disclaimer">Cassandra Index — экспериментальная оценка риска на основе '
      + 'открытых данных. Это не официальный прогноз правительства или международной '
      + 'организации. Оценка может быть ошибочной.</p>',
    '    <nav class="footer-nav" aria-label="Сервисные ссылки">',
    '      <a href="index.html">На главную</a>',
    '      <a href="blog/">Блог</a>',
    '      <a href="how-to-read.html">Как читать индекс</a>',
    '      <a href="compare.html">Сравнение</a>',
    '      <a href="changelog.html">История изменений</a>',
    `      <a href="${METRICS_PERMALINK}">Данные (JSON)</a>`,
    '      <a href="privacy.html">Приватность</a>',
    '    </nav>',
    '  </footer>',
    '',
    '</body>',
    '</html>',
    '',
  ].join('\n');
}
