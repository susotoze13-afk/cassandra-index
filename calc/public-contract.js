// public-contract.js — машинный контракт публичного слоя (ADR 0062):
// справочники data/public/{regions,criteria,methodology}.json, понедельные
// файлы data/public/weeks/<date>.json и JSON Schema в data/public/schema/v1/.
// Чистые сборщики документов: ни диска, ни сети (reference.json и VERSION
// читаются один раз на импорте — это статические файлы репозитория).
//
// Граница раскрытия: ADR 0045 закрывал веса, CAP, k и пороги для UI. ADR 0062
// открывает их в машинном контракте (methodology.json), не меняя публичной
// страницы «Методология»: сайт по-прежнему показывает только шкалу, направление
// и названия критериев.
//
// Схемы — JSON Schema draft 2020-12. Одна неделя описана в week.schema.json;
// index.schema.json и latest.schema.json ссылаются на неё, а не дублируют.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { PARAMS } from './params.js';
import { DRIVER_IDS, DRIVER_NAMES } from './contributions.js';
import { KINDS } from './changelog-entries.js';
import { CRITERIA_LIST } from '../js/criteria.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const REFERENCE = JSON.parse(readFileSync(path.join(ROOT, 'data', 'regions', 'reference.json'), 'utf8'));
const VERSION = readFileSync(path.join(ROOT, 'VERSION'), 'utf8').trim();

export const PUBLIC_SCHEMA_VERSION = 1;
export const SITE = 'https://cassindex.ru';

export const SCHEMA_NAMES = {
  index: 'cassandra-index-public',
  week: 'cassandra-index-week',
  regions: 'cassandra-index-regions',
  criteria: 'cassandra-index-criteria',
  methodology: 'cassandra-index-methodology',
  changelog: 'cassandra-index-changelog',
  digestIndex: 'cassandra-index-digest-index',
  digestWeek: 'cassandra-index-digest',
  validation: 'cassandra-index-validation',
  forecastLedger: 'cassandra-index-forecast-ledger',
  countries: 'cassandra-index-countries',
};

// Лицензионный конверт данных (CC BY 4.0) — общий для всех файлов.
export const PUBLIC_LICENSE = {
  name: 'CC BY 4.0',
  url: 'https://creativecommons.org/licenses/by/4.0/legalcode',
  attribution: 'Cassandra Index — https://cassindex.ru, лицензия CC BY 4.0',
  note: 'Атрибуция обязательна: при переиспользовании укажите «Cassandra Index, версия, дата недели, https://cassindex.ru» и лицензию CC BY 4.0.',
  placeholder: false,
};

const DATE_RE = '^[0-9]{4}-[0-9]{2}-[0-9]{2}$';
// Период сверки: недельный — дата, месячный компаратор — 'YYYY-MM'.
const PERIOD_RE = '^[0-9]{4}-[0-9]{2}(-[0-9]{2})?$';
const STATE_IDS = PARAMS.states.map((s) => s.id);

function regionDoc(region) {
  const ac = region.adminCenter;
  return {
    id: region.id,
    name: { ru: region.name.ru, en: region.name.en },
    countries: Array.isArray(region.countries) ? [...region.countries] : [],
    admin_center: ac
      ? {
          city: { ru: ac.city.ru, en: ac.city.en },
          country: ac.country,
          iso3166_2: ac.iso3166_2,
          geonames_id: ac.geonamesId,
        }
      : null,
  };
}

// regionsDoc() — id, названия и состав обеих таксономий. Источник —
// data/regions/reference.json (единственный source of truth), порядок регионов
// канонический (совпадает с js/region.js и regionIdsFor в js/data.js).
export function regionsDoc() {
  const taxonomies = {};
  for (const version of ['1.0', '2.0']) {
    const block = REFERENCE.taxonomies[version];
    taxonomies[version] = (block && Array.isArray(block.regions) ? block.regions : []).map(regionDoc);
  }
  return {
    schema: SCHEMA_NAMES.regions,
    schema_version: PUBLIC_SCHEMA_VERSION,
    taxonomy_version: REFERENCE.taxonomy_version,
    taxonomy_v2_from: PARAMS.taxonomyV2From,
    current: REFERENCE.taxonomy_version,
    taxonomies,
  };
}

// criteriaDoc() — 46 критериев с драйвером, шкалой, направлением и
// двуязычными названием/описанием. Те же данные, что видит секция
// «Методология» (js/criteria.js), плюс названия драйверов модели.
export function criteriaDoc() {
  return {
    schema: SCHEMA_NAMES.criteria,
    schema_version: PUBLIC_SCHEMA_VERSION,
    methodology: PARAMS.methodology,
    criteria_count: CRITERIA_LIST.length,
    drivers: DRIVER_IDS.map((id) => ({ id, name: { ...DRIVER_NAMES[id] } })),
    criteria: CRITERIA_LIST.map((c) => ({
      id: c.id,
      driver: c.driver,
      scale: c.scale,
      dir: c.dir,
      name: { ru: c.name.ru, en: c.name.en },
      description: { ru: c.desc.ru, en: c.desc.en },
    })),
  };
}

// methodologyDoc() — версия, веса, параметры агрегации, шкала состояний.
// ADR 0062: раскрытие для машинного потребителя; UI-граница ADR 0045 не
// меняется (страница «Методология» формулы и веса не показывает).
export function methodologyDoc() {
  return {
    schema: SCHEMA_NAMES.methodology,
    schema_version: PUBLIC_SCHEMA_VERSION,
    methodology: PARAMS.methodology,
    project_version: VERSION,
    criteria_count: CRITERIA_LIST.length,
    drivers_count: DRIVER_IDS.length,
    weights: { ...PARAMS.weights },
    parameters: {
      alpha: PARAMS.alpha,
      lambda: PARAMS.lambda,
      rho: PARAMS.rho,
      u_abs: PARAMS.U_abs,
      k: PARAMS.k,
      coverage_threshold: PARAMS.coverageThreshold,
      cap_count: PARAMS.capCount,
      d9_growth_limit: PARAMS.d9GrowthLimit,
      beta_up: PARAMS.betaUp,
      beta_down: PARAMS.betaDown,
      structural_break: { ...PARAMS.structuralBreak },
      confidence: { ...PARAMS.confidence },
      n0: PARAMS.n0,
      gamma: PARAMS.gamma,
      kappa: PARAMS.kappa,
      region_clamp: PARAMS.regionClamp,
      region_shock_delta: PARAMS.regionShockDelta,
      region_estruct_default: PARAMS.regionEstructDefault,
      data_coverage: {
        insufficient: PARAMS.dataCoverage.insufficient,
        reduced: PARAMS.dataCoverage.reduced,
        d1_d2_required: PARAMS.dataCoverage.d1d2Required,
      },
      sensitivity_threshold: PARAMS.sensitivityThreshold,
    },
    severity_values: [...PARAMS.severityValues],
    clusters: [...PARAMS.clusters],
    state_scale: PARAMS.states.map((s) => ({ id: s.id, min: s.min, max: s.max })),
    license: { ...PUBLIC_LICENSE },
    sources: {
      engine: 'calc/engine.js',
      params: 'calc/params.js',
      methodology_document: 'METHODOLOGY.md',
    },
  };
}

// weekDoc(week, extra) — понедельный файл для кеширования и embed. week —
// проекция datasetOf; extra.waterfall — водопад недели (или null).
export function weekDoc(week, extra = {}) {
  const out = {
    schema: SCHEMA_NAMES.week,
    schema_version: PUBLIC_SCHEMA_VERSION,
    site: SITE,
    license: { ...PUBLIC_LICENSE },
    week: {
      ...week,
      waterfall: extra.waterfall !== undefined ? extra.waterfall : (week.waterfall ?? null),
    },
  };
  return out;
}

// --- Страновой слой (ADR 0067) ---

// Строка страны в публичном файле: без name — имена отдаёт справочник
// (data/public/regions.json + data/geo/*), конверт файла их не дублирует.
const COUNTRY_ROW_NOTE = 'Страновой слой наследует sensitivity недели: чувствительность '
  + 'страновых индексов к исключению доменов/кластеров источников раскрывается '
  + 'числом недели, отдельной метрики по странам не считается.';

function countryRowOf(row) {
  return {
    index: row.index,
    delta: row.delta,
    background: row.background === true,
    region: row.region,
    signals: row.signals,
  };
}

// countriesDoc(week, snapshot) — файл data/public/countries/<неделя>.json для
// недель со страновым слоем; null без блока countries в снапшоте. Конверт — как
// у weekDoc (schema/schema_version/site/license) + week/methodology.
export function countriesDoc(week, snapshot) {
  const s = snapshot && typeof snapshot === 'object' ? snapshot : {};
  const c = s.countries;
  if (!c || typeof c !== 'object' || Array.isArray(c) || !c.rows
    || typeof c.rows !== 'object' || Array.isArray(c.rows)) {
    return null;
  }
  const rows = {};
  for (const [iso, row] of Object.entries(c.rows)) {
    rows[iso] = countryRowOf(row && typeof row === 'object' ? row : {});
  }
  return {
    schema: SCHEMA_NAMES.countries,
    schema_version: PUBLIC_SCHEMA_VERSION,
    site: SITE,
    license: { ...PUBLIC_LICENSE },
    week,
    methodology: typeof s.methodology === 'string' ? s.methodology : null,
    countries: { total: c.total, published: c.published, rows },
    sensitivity: typeof s.sensitivity === 'number' && Number.isFinite(s.sensitivity)
      ? s.sensitivity
      : null,
    note: COUNTRY_ROW_NOTE,
  };
}

// --- JSON Schema (draft 2020-12) ---

const nullable = (type) => ({ type: [type, 'null'] });

const LICENSE_SCHEMA = {
  type: 'object',
  required: ['name', 'url', 'attribution', 'note', 'placeholder'],
  additionalProperties: false,
  properties: {
    name: { const: 'CC BY 4.0' },
    url: { const: 'https://creativecommons.org/licenses/by/4.0/legalcode' },
    attribution: { type: 'string', minLength: 1 },
    note: { type: 'string', minLength: 1 },
    placeholder: { const: false },
  },
};

const NAME_SCHEMA = {
  type: 'object',
  required: ['ru', 'en'],
  additionalProperties: false,
  properties: { ru: { type: 'string', minLength: 1 }, en: { type: 'string', minLength: 1 } },
};

const DRIVER_BREAKDOWN_SCHEMA = {
  type: 'object',
  description: 'Модельный драйвер Д1…Д9: вклад в опубликованный индекс и top-3 критерия.',
  required: [
    'id', 'name', 'score', 'confidence', 'weight', 'weight_effective',
    'covered', 'contribution_pp', 'top_criteria',
  ],
  additionalProperties: false,
  properties: {
    id: { enum: DRIVER_IDS },
    name: NAME_SCHEMA,
    score: nullable('number'),
    confidence: nullable('string'),
    weight: nullable('number'),
    weight_effective: nullable('number'),
    covered: {
      type: 'object',
      required: ['criteria', 'total'],
      additionalProperties: false,
      properties: { criteria: { type: 'integer', minimum: 0 }, total: { type: 'integer', minimum: 0 } },
    },
    contribution_pp: {
      type: 'number',
      description: 'Вклад драйвера в опубликованный индекс, п.п. Сумма по девяти драйверам равна index.',
    },
    top_criteria: {
      type: 'array',
      maxItems: 3,
      items: {
        type: 'object',
        required: ['id', 'name', 'dir', 'value', 'contribution', 'share'],
        additionalProperties: false,
        properties: {
          id: { type: 'string' },
          name: NAME_SCHEMA,
          dir: { enum: ['esc', 'deesc'] },
          value: { type: 'number', minimum: 0, maximum: 1 },
          contribution: { type: 'number' },
          share: { type: 'number', minimum: -1, maximum: 1 },
        },
      },
    },
  },
};

const STEP_SCHEMA = {
  type: 'object',
  required: ['driver', 'contribution_pp'],
  additionalProperties: false,
  properties: { driver: { enum: DRIVER_IDS }, contribution_pp: { type: 'number' } },
};

const WATERFALL_SCHEMA = {
  type: 'object',
  description: 'Водопад «прошлая неделя → вклады драйверов → эта неделя».',
  required: ['from', 'to', 'steps', 'residual_pp', 'residual_reason'],
  additionalProperties: false,
  properties: {
    from: {
      type: 'object',
      required: ['week', 'index'],
      additionalProperties: false,
      properties: { week: { type: 'string', pattern: DATE_RE }, index: { type: 'integer' } },
    },
    to: {
      type: 'object',
      required: ['week', 'index'],
      additionalProperties: false,
      properties: { week: { type: 'string', pattern: DATE_RE }, index: { type: 'integer' } },
    },
    steps: { type: 'array', minItems: 9, maxItems: 9, items: STEP_SCHEMA },
    residual_pp: {
      type: 'number',
      description: 'Механика модели (инерция, q-сжатие, лимит Д9) и округление — не вклад драйвера.',
    },
    residual_reason: { const: 'saturation-inertia-coverage-rounding' },
  },
};

const WHAT_WOULD_CHANGE_SCHEMA = {
  type: 'object',
  description: 'Контрфактика: сигнал одного критерия обнулён при прочих равных.',
  required: ['state', 'thresholds', 'criteria', 'method'],
  additionalProperties: false,
  properties: {
    state: nullable('string'),
    thresholds: {
      type: 'object',
      required: ['down', 'up'],
      additionalProperties: false,
      properties: {
        down: {
          type: ['object', 'null'],
          required: ['state', 'index', 'gap_pp'],
          additionalProperties: false,
          properties: {
            state: { type: 'string' }, index: { type: 'integer' }, gap_pp: { type: 'number' },
          },
        },
        up: {
          type: ['object', 'null'],
          required: ['state', 'index', 'gap_pp'],
          additionalProperties: false,
          properties: {
            state: { type: 'string' }, index: { type: 'integer' }, gap_pp: { type: 'number' },
          },
        },
      },
    },
    criteria: {
      type: 'array',
      maxItems: 3,
      items: {
        type: 'object',
        required: ['id', 'name', 'driver', 'dir', 'value', 'impact_pp', 'effect', 'crosses_state', 'breaks_driver'],
        additionalProperties: false,
        properties: {
          id: { type: 'string' },
          name: NAME_SCHEMA,
          driver: nullable('string'),
          dir: nullable('string'),
          value: { type: 'number', minimum: 0, maximum: 1 },
          impact_pp: { type: 'number' },
          effect: { enum: ['up', 'down'] },
          crosses_state: { type: 'boolean' },
          breaks_driver: { type: 'boolean' },
        },
      },
    },
    method: { const: 'criterion-zeroed' },
  },
};

const WEEK_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://cassindex.ru/data/public/schema/v1/week.schema.json',
  title: 'Cassandra Index — неделя (публичная проекция)',
  type: 'object',
  required: [
    'schema', 'schema_version', 'site', 'license', 'week',
  ],
  additionalProperties: false,
  properties: {
    schema: { const: SCHEMA_NAMES.week },
    schema_version: { const: PUBLIC_SCHEMA_VERSION },
    site: { const: SITE },
    license: LICENSE_SCHEMA,
    week: { $ref: '#/$defs/week' },
  },
  $defs: {
    week: {
      type: 'object',
      required: [
        'week', 'published', 'through', 'methodology', 'regions_taxonomy', 'data_state',
        'index', 'delta', 'state', 'q', 'confidence', 'coverage_criteria', 'regions',
        'precursor', 'precursor_present', 'drivers', 'driver_breakdown', 'waterfall',
        'what_would_change', 'sources', 'trend',
      ],
      additionalProperties: false,
      properties: {
        week: { type: 'string', pattern: DATE_RE },
        published: nullable('string'),
        through: nullable('string'),
        methodology: nullable('string'),
        regions_taxonomy: { enum: ['1.0', '2.0'] },
        data_state: { enum: ['published', 'updating', 'delayed', 'insufficient', 'unavailable'] },
        index: nullable('integer'),
        delta: nullable('integer'),
        state: { type: ['string', 'null'], enum: [...STATE_IDS, null] },
        q: nullable('number'),
        confidence: { type: ['string', 'null'], enum: ['full', 'reduced', 'none', null] },
        coverage_criteria: {
          type: ['object', 'null'],
          required: ['covered', 'total'],
          additionalProperties: false,
          properties: { covered: { type: 'integer', minimum: 0 }, total: { type: 'integer', minimum: 1 } },
        },
        regions: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'index', 'delta', 'background'],
            additionalProperties: false,
            properties: {
              id: { type: 'string' },
              index: nullable('integer'),
              delta: nullable('integer'),
              background: { type: 'boolean' },
            },
          },
        },
        precursor: {
          type: ['object', 'null'],
          required: ['value'],
          additionalProperties: false,
          properties: {
            value: { type: 'integer', minimum: 0, maximum: 100 },
            signaling_subgroups: { type: 'integer', minimum: 0, maximum: 8 },
          },
        },
        precursor_present: { type: 'boolean' },
        drivers: {
          description: 'Редакционные драйверы недели (три сюжета), не модельные Д1…Д9.',
          type: 'array',
          items: {
            type: 'object',
            required: ['label', 'contribution'],
            additionalProperties: false,
            properties: {
              label: {
                type: 'object',
                required: ['ru', 'en'],
                additionalProperties: false,
                properties: { ru: nullable('string'), en: nullable('string') },
              },
              contribution: { type: ['string', 'null'], enum: ['high', 'medium', 'low', null] },
            },
          },
        },
        driver_breakdown: { type: 'array', items: DRIVER_BREAKDOWN_SCHEMA },
        waterfall: { ...WATERFALL_SCHEMA, type: ['object', 'null'] },
        what_would_change: { ...WHAT_WOULD_CHANGE_SCHEMA, type: ['object', 'null'] },
        sources: {
          type: 'object',
          required: ['count', 'clusters', 'state_affiliated'],
          additionalProperties: false,
          properties: {
            count: { type: 'integer', minimum: 0 },
            clusters: { type: 'integer', minimum: 0 },
            state_affiliated: { type: 'integer', minimum: 0 },
          },
        },
        trend: {
          type: 'array',
          items: {
            type: 'object',
            required: ['date', 'value'],
            additionalProperties: false,
            properties: {
              date: { type: 'string', pattern: DATE_RE },
              value: nullable('integer'),
              methodology: { type: 'string' },
            },
          },
        },
      },
    },
  },
};

function envelopeSchema(name, schemaName, extraProps) {
  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: `https://cassindex.ru/data/public/schema/v1/${name}.schema.json`,
    type: 'object',
    required: ['schema', 'schema_version', 'site', 'license', ...Object.keys(extraProps)],
    additionalProperties: false,
    properties: {
      schema: { const: schemaName },
      schema_version: { const: PUBLIC_SCHEMA_VERSION },
      site: { const: SITE },
      license: LICENSE_SCHEMA,
      ...extraProps,
    },
  };
}

const INDEX_SCHEMA = envelopeSchema('index', SCHEMA_NAMES.index, {
  weeks: { type: 'array', minItems: 1, items: { $ref: 'week.schema.json#/$defs/week' } },
});

// latest.json — тот же конверт public, поэтому schema-const один и тот же.
const LATEST_SCHEMA = envelopeSchema('latest', SCHEMA_NAMES.index, {
  week: { $ref: 'week.schema.json#/$defs/week' },
});

const REGIONS_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://cassindex.ru/data/public/schema/v1/regions.schema.json',
  type: 'object',
  required: ['schema', 'schema_version', 'taxonomy_version', 'taxonomy_v2_from', 'current', 'taxonomies'],
  additionalProperties: false,
  properties: {
    schema: { const: SCHEMA_NAMES.regions },
    schema_version: { const: PUBLIC_SCHEMA_VERSION },
    taxonomy_version: { enum: ['1.0', '2.0'] },
    taxonomy_v2_from: { type: 'string', pattern: DATE_RE },
    current: { enum: ['1.0', '2.0'] },
    taxonomies: {
      type: 'object',
      required: ['1.0', '2.0'],
      additionalProperties: false,
      properties: {
        '1.0': { type: 'array', items: { $ref: '#/$defs/region' } },
        '2.0': { type: 'array', items: { $ref: '#/$defs/region' } },
      },
    },
  },
  $defs: {
    region: {
      type: 'object',
      required: ['id', 'name', 'countries', 'admin_center'],
      additionalProperties: false,
      properties: {
        id: { type: 'string' },
        name: NAME_SCHEMA,
        countries: { type: 'array', items: { type: 'string', pattern: '^[A-Z]{2}$' } },
        admin_center: {
          type: ['object', 'null'],
          required: ['city', 'country', 'iso3166_2', 'geonames_id'],
          additionalProperties: false,
          properties: {
            city: NAME_SCHEMA,
            country: { type: 'string' },
            iso3166_2: { type: 'string' },
            geonames_id: { type: 'integer' },
          },
        },
      },
    },
  },
};

const CRITERIA_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://cassindex.ru/data/public/schema/v1/criteria.schema.json',
  type: 'object',
  required: ['schema', 'schema_version', 'methodology', 'criteria_count', 'drivers', 'criteria'],
  additionalProperties: false,
  properties: {
    schema: { const: SCHEMA_NAMES.criteria },
    schema_version: { const: PUBLIC_SCHEMA_VERSION },
    methodology: { type: 'string' },
    criteria_count: { const: 46 },
    drivers: {
      type: 'array',
      minItems: 9,
      maxItems: 9,
      items: {
        type: 'object',
        required: ['id', 'name'],
        additionalProperties: false,
        properties: { id: { enum: DRIVER_IDS }, name: NAME_SCHEMA },
      },
    },
    criteria: {
      type: 'array',
      minItems: 46,
      maxItems: 46,
      items: {
        type: 'object',
        required: ['id', 'driver', 'scale', 'dir', 'name', 'description'],
        additionalProperties: false,
        properties: {
          id: { type: 'string' },
          driver: { enum: DRIVER_IDS },
          scale: { enum: ['count', 'ordinal', 'binary'] },
          dir: { enum: ['esc', 'deesc'] },
          name: NAME_SCHEMA,
          description: NAME_SCHEMA,
        },
      },
    },
  },
};

const METHODOLOGY_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://cassindex.ru/data/public/schema/v1/methodology.schema.json',
  type: 'object',
  required: [
    'schema', 'schema_version', 'methodology', 'project_version', 'criteria_count',
    'drivers_count', 'weights', 'parameters', 'severity_values', 'clusters',
    'state_scale', 'license', 'sources',
  ],
  additionalProperties: false,
  properties: {
    schema: { const: SCHEMA_NAMES.methodology },
    schema_version: { const: PUBLIC_SCHEMA_VERSION },
    methodology: { type: 'string' },
    project_version: { type: 'string' },
    criteria_count: { const: 46 },
    drivers_count: { const: 9 },
    weights: {
      type: 'object',
      required: DRIVER_IDS,
      additionalProperties: false,
      properties: Object.fromEntries(DRIVER_IDS.map((id) => [id, { type: 'number', minimum: 0, maximum: 1 }])),
    },
    parameters: { type: 'object' },
    severity_values: { type: 'array', items: { type: 'number' } },
    clusters: { type: 'array', items: { type: 'string' } },
    state_scale: {
      type: 'array',
      minItems: 6,
      maxItems: 6,
      items: {
        type: 'object',
        required: ['id', 'min', 'max'],
        additionalProperties: false,
        properties: {
          id: { type: 'string' },
          min: { type: 'integer', minimum: 0, maximum: 100 },
          max: { type: 'integer', minimum: 0, maximum: 100 },
        },
      },
    },
    license: LICENSE_SCHEMA,
    sources: { type: 'object' },
  },
};

// changelog.json — машинная история изменений (calc/changelog-entries.js).
// Лицензионного конверта и site в файле нет: это метаданные проекта.
const CHANGELOG_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://cassindex.ru/data/public/schema/v1/changelog.schema.json',
  title: 'Cassandra Index — история изменений публичного слоя',
  type: 'object',
  required: ['schema', 'schema_version', 'entries'],
  additionalProperties: false,
  properties: {
    schema: { const: SCHEMA_NAMES.changelog },
    schema_version: { const: PUBLIC_SCHEMA_VERSION },
    entries: { type: 'array', items: { $ref: '#/$defs/entry' } },
  },
  $defs: {
    entry: {
      type: 'object',
      required: ['date', 'version', 'kind', 'title', 'body'],
      additionalProperties: false,
      properties: {
        date: { type: 'string', pattern: DATE_RE },
        version: { type: 'string', minLength: 1 },
        kind: { enum: KINDS },
        title: { type: 'string', minLength: 1 },
        body: { type: 'string', minLength: 1 },
        link: { type: 'string', pattern: '^https?://\\S+$' },
      },
    },
  },
};

// digest/index.json — архив выпусков: только даты, без конверта.
const DIGEST_INDEX_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://cassindex.ru/data/public/schema/v1/digest-index.schema.json',
  title: 'Cassandra Index — индекс выпусков дайджеста',
  type: 'object',
  required: ['schema', 'schema_version', 'weeks'],
  additionalProperties: false,
  properties: {
    schema: { const: SCHEMA_NAMES.digestIndex },
    schema_version: { const: PUBLIC_SCHEMA_VERSION },
    weeks: { type: 'array', items: { type: 'string', pattern: DATE_RE } },
  },
};

// digest/<week>.json — готовый выпуск. week бывает null у служебного выпуска,
// поэтому тип — ['string', 'null'] (валидатор не знает anyOf).
const DIGEST_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://cassindex.ru/data/public/schema/v1/digest.schema.json',
  title: 'Cassandra Index — выпуск дайджеста',
  type: 'object',
  required: ['schema', 'schema_version', 'week', 'subject', 'text', 'html', 'telegram', 'meta'],
  additionalProperties: false,
  properties: {
    schema: { const: SCHEMA_NAMES.digestWeek },
    schema_version: { const: PUBLIC_SCHEMA_VERSION },
    week: { type: ['string', 'null'], pattern: DATE_RE },
    subject: { type: 'string', minLength: 1 },
    text: { type: 'string', minLength: 1 },
    html: { type: 'string', minLength: 1 },
    telegram: { type: 'string', minLength: 1 },
    meta: {
      type: 'object',
      required: ['items', 'regions', 'hasPrev'],
      additionalProperties: false,
      properties: {
        items: { type: 'integer', minimum: 0 },
        regions: { type: 'integer', minimum: 0 },
        hasPrev: { type: 'boolean' },
      },
    },
  },
};

// validation.json — внешняя сверка (ADR 0063). Конверт site+license есть.
const STATUS_ENUM = ['preliminary', 'descriptive', 'insufficient', 'ok'];

const VALIDATION_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://cassindex.ru/data/public/schema/v1/validation.schema.json',
  title: 'Cassandra Index — внешняя сверка ряда',
  type: 'object',
  required: [
    'schema', 'schema_version', 'site', 'license', 'methodology', 'weeks',
    'thresholds', 'comparators', 'summary',
  ],
  additionalProperties: false,
  properties: {
    schema: { const: SCHEMA_NAMES.validation },
    schema_version: { const: PUBLIC_SCHEMA_VERSION },
    site: { const: SITE },
    license: LICENSE_SCHEMA,
    methodology: { type: 'string', minLength: 1 },
    weeks: { type: 'array', items: { type: 'string', pattern: DATE_RE } },
    thresholds: {
      type: 'object',
      required: ['min_pairs', 'preliminary_below', 'lags'],
      additionalProperties: false,
      properties: {
        min_pairs: { type: 'integer', minimum: 0 },
        preliminary_below: { type: 'integer', minimum: 0 },
        lags: { type: 'array', items: { type: 'integer' } },
      },
    },
    comparators: { type: 'array', items: { $ref: '#/$defs/comparator' } },
    summary: {
      type: 'object',
      required: ['comparators', 'with_coefficients', 'insufficient'],
      additionalProperties: false,
      properties: {
        comparators: { type: 'integer', minimum: 0 },
        with_coefficients: { type: 'integer', minimum: 0 },
        insufficient: { type: 'integer', minimum: 0 },
      },
    },
  },
  $defs: {
    // Коэффициенты бывают null, когда пар меньше порога.
    correlation: {
      type: 'object',
      required: ['n', 'pearson', 'spearman', 'p_permutation', 'status'],
      additionalProperties: false,
      properties: {
        n: { type: 'integer', minimum: 0 },
        pearson: nullable('number'),
        spearman: nullable('number'),
        p_permutation: nullable('number'),
        status: { enum: STATUS_ENUM },
      },
    },
    comparator: {
      type: 'object',
      required: [
        'id', 'title', 'granularity', 'construct', 'provenance', 'overlap',
        'levels', 'deltas', 'direction', 'lead_lag', 'discrepancies', 'note',
      ],
      additionalProperties: false,
      properties: {
        id: { type: 'string', minLength: 1 },
        title: { type: 'string', minLength: 1 },
        granularity: { enum: ['week', 'month'] },
        construct: {
          type: 'object',
          required: ['ru'],
          additionalProperties: false,
          properties: { ru: { type: 'string', minLength: 1 } },
        },
        provenance: {
          type: 'object',
          required: ['name', 'url', 'data_url', 'retrieved', 'as_of', 'license'],
          additionalProperties: false,
          properties: {
            name: { type: 'string', minLength: 1 },
            url: { type: 'string', minLength: 1 },
            data_url: { type: 'string', minLength: 1 },
            // as_of бывает неполной датой ('2026-09'), поэтому без pattern.
            retrieved: { type: 'string', minLength: 1 },
            as_of: { type: 'string', minLength: 1 },
            license: { type: 'string', minLength: 1 },
          },
        },
        overlap: {
          type: 'object',
          required: ['periods', 'from', 'to'],
          additionalProperties: false,
          properties: {
            periods: { type: 'integer', minimum: 0 },
            // from/to бывают месячными ('2026-08') у месячных компараторов.
            from: { type: ['string', 'null'], pattern: PERIOD_RE },
            to: { type: ['string', 'null'], pattern: PERIOD_RE },
          },
        },
        levels: { $ref: '#/$defs/correlation' },
        deltas: { $ref: '#/$defs/correlation' },
        direction: {
          type: 'object',
          required: ['hits', 'total', 'skipped', 'rate', 'status'],
          additionalProperties: false,
          properties: {
            hits: { type: 'integer', minimum: 0 },
            total: { type: 'integer', minimum: 0 },
            skipped: { type: 'integer', minimum: 0 },
            rate: { type: ['number', 'null'], minimum: 0, maximum: 1 },
            status: { enum: STATUS_ENUM },
          },
        },
        lead_lag: {
          type: 'object',
          required: ['by_lag', 'best_lag', 'best', 'status'],
          additionalProperties: false,
          properties: {
            by_lag: {
              type: 'array',
              items: {
                type: 'object',
                required: ['lag', 'n', 'pearson'],
                additionalProperties: false,
                properties: {
                  lag: { type: 'integer' },
                  n: { type: 'integer', minimum: 0 },
                  pearson: nullable('number'),
                },
              },
            },
            best_lag: { type: ['integer', 'null'] },
            best: nullable('number'),
            status: { enum: STATUS_ENUM },
          },
        },
        discrepancies: {
          type: 'array',
          items: {
            type: 'object',
            required: ['period', 'index_delta', 'external_delta'],
            additionalProperties: false,
            properties: {
              period: { type: 'string', pattern: PERIOD_RE },
              index_delta: { type: 'number' },
              external_delta: { type: 'number' },
            },
          },
        },
        note: nullable('string'),
      },
    },
  },
};

// forecast-ledger.json — реестр прогнозов (ADR 0064). Конверт site+license есть.
const FORECAST_LEDGER_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://cassindex.ru/data/public/schema/v1/forecast-ledger.schema.json',
  title: 'Cassandra Index — реестр прогнозов и их проверки',
  type: 'object',
  required: ['schema', 'schema_version', 'site', 'license', 'rule', 'entries', 'summary', 'misses'],
  additionalProperties: false,
  properties: {
    schema: { const: SCHEMA_NAMES.forecastLedger },
    schema_version: { const: PUBLIC_SCHEMA_VERSION },
    site: { const: SITE },
    license: LICENSE_SCHEMA,
    rule: {
      type: 'object',
      required: ['cluster', 'direction', 'baseline'],
      additionalProperties: false,
      properties: {
        cluster: { type: 'string', minLength: 1 },
        direction: {
          type: 'object',
          required: ['deadband', 'values'],
          additionalProperties: false,
          properties: {
            deadband: { type: 'number', minimum: 0 },
            values: { type: 'array', items: { enum: ['down', 'flat', 'up'] } },
          },
        },
        baseline: { type: 'string', minLength: 1 },
      },
    },
    entries: { type: 'array', items: { $ref: '#/$defs/entry' } },
    summary: {
      type: 'object',
      required: ['baseline', 'editor'],
      additionalProperties: false,
      properties: {
        baseline: { $ref: '#/$defs/bucket' },
        editor: { $ref: '#/$defs/bucket' },
      },
    },
    misses: {
      type: 'array',
      items: {
        type: 'object',
        required: ['week', 'kind', 'field', 'expected', 'actual'],
        additionalProperties: false,
        properties: {
          week: { type: 'string', pattern: DATE_RE },
          kind: { enum: ['baseline', 'editor'] },
          field: { enum: ['cluster', 'direction'] },
          expected: nullable('string'),
          actual: nullable('string'),
        },
      },
    },
  },
  $defs: {
    // Ожидание до проверки и факт до публикации бывают null — это «pending».
    entry: {
      type: 'object',
      required: [
        'week', 'kind', 'committedAt', 'verified', 'expectedCluster', 'expectedDirection',
        'actualIndex', 'actualCluster', 'actualDelta', 'actualDirection', 'outcome',
      ],
      additionalProperties: false,
      properties: {
        week: { type: 'string', pattern: DATE_RE },
        kind: { enum: ['baseline', 'editor'] },
        committedAt: { type: 'string', minLength: 1 },
        verified: {
          type: ['boolean', 'null'],
          description: 'У baseline всегда true. У записи редактора: результат git-проверки иммутабельности. null с outcome.cluster "pending" и actualIndex null — неделя ещё не опубликована; иначе null — git-история недели недоступна, проверка не выполнена.',
        },
        expectedCluster: nullable('string'),
        expectedDirection: { type: ['string', 'null'], enum: ['down', 'flat', 'up', null] },
        actualIndex: nullable('integer'),
        actualCluster: nullable('string'),
        actualDelta: nullable('integer'),
        actualDirection: { type: ['string', 'null'], enum: ['down', 'flat', 'up', null] },
        outcome: {
          type: 'object',
          required: ['cluster', 'direction'],
          additionalProperties: false,
          properties: {
            cluster: { enum: ['hit', 'miss', 'pending'] },
            direction: { enum: ['hit', 'miss', 'pending'] },
          },
        },
      },
    },
    tally: {
      type: 'object',
      required: ['hits', 'total'],
      additionalProperties: false,
      properties: {
        hits: { type: 'integer', minimum: 0 },
        total: { type: 'integer', minimum: 0 },
      },
    },
    bucket: {
      type: 'object',
      required: ['entries', 'cluster', 'direction', 'pending'],
      additionalProperties: false,
      properties: {
        entries: { type: 'integer', minimum: 0 },
        cluster: { $ref: '#/$defs/tally' },
        direction: { $ref: '#/$defs/tally' },
        pending: {
          type: 'object',
          required: ['cluster', 'direction'],
          additionalProperties: false,
          properties: {
            cluster: { type: 'integer', minimum: 0 },
            direction: { type: 'integer', minimum: 0 },
          },
        },
      },
    },
  },
};

// countries.schema.json — страновой слой недели (ADR 0067). Конверт как у
// weekDoc (site+license). Ключи rows — динамические ISO2, поэтому без
// additionalProperties:false на rows; name в строке нет (см. COUNTRY_ROW_NOTE).
const COUNTRIES_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://cassindex.ru/data/public/schema/v1/countries.schema.json',
  title: 'Cassandra Index — страновой слой недели',
  type: 'object',
  required: [
    'schema', 'schema_version', 'site', 'license', 'week', 'methodology',
    'countries', 'sensitivity', 'note',
  ],
  additionalProperties: false,
  properties: {
    schema: { const: SCHEMA_NAMES.countries },
    schema_version: { const: PUBLIC_SCHEMA_VERSION },
    site: { const: SITE },
    license: LICENSE_SCHEMA,
    week: { type: 'string', pattern: DATE_RE },
    methodology: { type: ['string', 'null'] },
    countries: {
      type: 'object',
      required: ['total', 'published', 'rows'],
      additionalProperties: false,
      properties: {
        total: { type: 'integer', minimum: 1 },
        published: { type: 'integer', minimum: 0 },
        // Ключи — ISO2 стран версии недели; число и состав фиксирует
        // data/regions/reference.json, схеме — только форма строки.
        rows: {
          type: 'object',
          additionalProperties: {
            type: 'object',
            required: ['index', 'delta', 'background', 'region', 'signals'],
            additionalProperties: false,
            properties: {
              index: { type: 'integer', minimum: 0, maximum: 100 },
              delta: { type: 'number' },
              background: { type: 'boolean' },
              region: { type: 'string' },
              signals: { type: 'integer', minimum: 0 },
            },
          },
        },
      },
    },
    sensitivity: { type: ['number', 'null'] },
    note: { type: 'string', minLength: 1 },
  },
};

// schemaDocs() — карта «имя файла → объект схемы». Порядок фиксирован, чтобы
// запись была детерминированной.
export function schemaDocs() {
  return {
    'index.schema.json': INDEX_SCHEMA,
    'latest.schema.json': LATEST_SCHEMA,
    'week.schema.json': WEEK_SCHEMA,
    'regions.schema.json': REGIONS_SCHEMA,
    'criteria.schema.json': CRITERIA_SCHEMA,
    'methodology.schema.json': METHODOLOGY_SCHEMA,
    'changelog.schema.json': CHANGELOG_SCHEMA,
    'digest-index.schema.json': DIGEST_INDEX_SCHEMA,
    'digest.schema.json': DIGEST_SCHEMA,
    'validation.schema.json': VALIDATION_SCHEMA,
    'forecast-ledger.schema.json': FORECAST_LEDGER_SCHEMA,
    'countries.schema.json': COUNTRIES_SCHEMA,
  };
}
