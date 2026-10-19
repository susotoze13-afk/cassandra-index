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
  };
}
